export type EBeforeUnload = RegisteredEvent<(event: BeforeUnloadEvent) => any>;

import { windowAdd, windowRemove } from '../helpers/listen';

import { RegisteredEvent } from '../types';
import { createID } from '../helpers/createID';
import { onBeforeUnmount } from '@vue/runtime-dom';
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

   const event = { id: createID(), handler } as EBeforeUnload;
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
