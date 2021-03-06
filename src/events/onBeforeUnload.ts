export type EBeforeUnload = RegisteredEvent<(event: BeforeUnloadEvent) => any>;

import { windowAdd, windowRemove } from '../helpers/listen';

import { RegisteredEvent } from '../types';
import { createEvent } from '../helpers/createEvent';
import { onBeforeUnmount } from 'vue';
import { removeEvent } from '../helpers/removeChild';

const registered = [] as EBeforeUnload[];
let isCreatedOnce = false;

/**
 *@description a handler for beforeunload events in browser.
 *@see https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event
 */
export function onBeforeUnload(handler: EBeforeUnload['handler']) {
   if (!isCreatedOnce) {
      windowAdd('beforeunload', beforeUnloadHandler);
      isCreatedOnce = true;
   }

   const event = createEvent<EBeforeUnload>(handler);
   registered.push(event);

   onBeforeUnmount(() => {
      removeEvent(registered, event.id);
      if (registered.length <= 0) {
         windowRemove('beforeunload', beforeUnloadHandler);
         isCreatedOnce = false;
      }
   });
}

function beforeUnloadHandler(nativeEvent: BeforeUnloadEvent) {
   for (const event of registered) {
      event.handler(nativeEvent);
   }
}
