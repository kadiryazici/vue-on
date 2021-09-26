export type EHashChange = RegisteredEvent<(event: Event) => any>;

import { windowAdd, windowRemove } from '../helpers/listen';

import { RegisteredEvent } from '../types';
import { createID } from '../helpers/createID';
import { onBeforeUnmount } from '@vue/runtime-dom';
import { removeEvent } from '../helpers/removeChild';

const registered = [] as EHashChange[];
let isCreatedOnce = false;

/**
 *@description a handler for visibilitychange event in browser.
 *@see https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilitychange_event
 */
export function onVisibilityChange(handler: EHashChange['handler']) {
   if (!isCreatedOnce) {
      windowAdd('hashchange', hashChangeHandler);
      isCreatedOnce = true;
   }

   const event = { id: createID(), handler } as EHashChange;
   registered.push(event);

   onBeforeUnmount(() => {
      removeEvent(registered, event.id);
      if (registered.length <= 0) {
         windowRemove('hashchange', hashChangeHandler);
         isCreatedOnce = false;
      }
   });
}

function hashChangeHandler(nativeEvent: Event) {
   for (const event of registered) {
      event.handler(nativeEvent);
   }
}
