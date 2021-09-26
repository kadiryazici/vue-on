export type OnlineOrOffline = 'online' | 'offline';
export type OnlineOrOfflineEvent = RegisteredEvent<(kind: OnlineOrOffline, event: Event) => any>;

import { RegisteredEvent } from '../types';
import { createID } from '../helpers/createID';
import { onBeforeUnmount } from '@vue/runtime-dom';
import { removeEvent } from '../helpers/removeChild';

const registered = [] as OnlineOrOfflineEvent[];
let isCreatedOnce = false;

const add = window.addEventListener;
const remove = window.removeEventListener;

/**
 *@description a handler for online/offline events in browser.
 *@see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/Online_and_offline_events
 */
export function onConnectionStatusChange(kind: OnlineOrOffline, handler: OnlineOrOfflineEvent['handler']) {
   if (!isCreatedOnce) {
      add('online', onlineOfflineEventHandler);
      add('offline', onlineOfflineEventHandler);
      isCreatedOnce = true;
   }

   const event = { id: createID(), handler } as OnlineOrOfflineEvent;
   registered.push(event);
   onBeforeUnmount(() => {
      removeEvent(registered, event.id);
      if (registered.length <= 0) {
         remove('online', onlineOfflineEventHandler);
         remove('offline', onlineOfflineEventHandler);
         isCreatedOnce = false;
      }
   });
}

function onlineOfflineEventHandler(nativeEvent: Event) {
   const kind: OnlineOrOffline = navigator.onLine ? 'online' : 'offline';
   for (const event of registered) {
      event.handler(kind, nativeEvent);
   }
}
