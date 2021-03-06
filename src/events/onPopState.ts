export type EPopState = RegisteredEvent<(event: PopStateEvent) => any>;

import { windowAdd, windowRemove } from '../helpers/listen';

import { RegisteredEvent } from '../types';
import { createEvent } from '../helpers/createEvent';
import { onBeforeUnmount } from 'vue';
import { removeEvent } from '../helpers/removeChild';

const registered = [] as EPopState[];
let isCreatedOnce = false;

/**
 *@description a handler for popstate events in browser.
 *@see https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event
 */
export function onPopState(handler: EPopState['handler']) {
   if (!isCreatedOnce) {
      windowAdd('popstate', popStateHandler);
      isCreatedOnce = true;
   }

   const event = createEvent<EPopState>(handler);
   registered.push(event);

   onBeforeUnmount(() => {
      removeEvent(registered, event.id);
      if (registered.length <= 0) {
         windowRemove('popstate', popStateHandler);
         isCreatedOnce = false;
      }
   });
}

function popStateHandler(nativeEvent: PopStateEvent) {
   for (const event of registered) {
      event.handler(nativeEvent);
   }
}
