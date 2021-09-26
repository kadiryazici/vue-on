export type EPasteEvent = RegisteredEvent<(event: ClipboardEvent) => any>;

import { documentAdd, documentRemove } from '../helpers/listen';

import { RegisteredEvent } from '../types';
import { createEvent } from '../helpers/createEvent';
import { onBeforeUnmount } from 'vue';
import { removeEvent } from '../helpers/removeChild';

const registered = [] as EPasteEvent[];
let isCreatedOnce = false;

/**
 *@description a handler for paste events in browser.
 *@see https://developer.mozilla.org/en-US/docs/Web/API/Document/paste_event
 */
export function onPaste(handler: EPasteEvent['handler']) {
   if (!isCreatedOnce) {
      documentAdd('paste', pasteHandler);
      isCreatedOnce = true;
   }

   const event = createEvent<EPasteEvent>(handler);
   registered.push(event);

   onBeforeUnmount(() => {
      removeEvent(registered, event.id);
      if (registered.length <= 0) {
         documentRemove('paste', pasteHandler);
         isCreatedOnce = false;
      }
   });
}

function pasteHandler(nativeEvent: ClipboardEvent) {
   for (const event of registered) {
      event.handler(nativeEvent);
   }
}
