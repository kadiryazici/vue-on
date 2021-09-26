export type EVisibilityChange = RegisteredEvent<(state: VisibilityState, event: Event) => any>;

import { documentAdd, documentRemove } from '../helpers/listen';

import { RegisteredEvent } from '../types';
import { createEvent } from '../helpers/createEvent';
import { onBeforeUnmount } from 'vue';
import { removeEvent } from '../helpers/removeChild';

const registered = [] as EVisibilityChange[];
let isCreatedOnce = false;

/**
 *@description a handler for visibilitychange event in browser.
 *@see https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilitychange_event
 */
export function onVisibilityChange(handler: EVisibilityChange['handler']) {
   if (!isCreatedOnce) {
      documentAdd('visibilitychange', visibilityChangeHandler);
      isCreatedOnce = true;
   }

   const event = createEvent<EVisibilityChange>(handler);
   registered.push(event);

   onBeforeUnmount(() => {
      removeEvent(registered, event.id);
      if (registered.length <= 0) {
         documentRemove('visibilitychange', visibilityChangeHandler);
         isCreatedOnce = false;
      }
   });
}

function visibilityChangeHandler(nativeEvent: Event) {
   for (const event of registered) {
      event.handler(document.visibilityState, nativeEvent);
   }
}
