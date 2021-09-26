export type OnlineOrOffline = 'online' | 'offline';
export type EOnlineOrOffline = RegisteredEvent<(kind: OnlineOrOffline, event: Event) => any>;

import { windowAdd, windowRemove } from '../helpers/listen';

import { RegisteredEvent } from '../types';
import { createEvent } from '../helpers/createEvent';
import { onBeforeUnmount } from 'vue';
import { removeEvent } from '../helpers/removeChild';

const registered = [] as EOnlineOrOffline[];
let isCreatedOnce = false;

/**
 *@description a handler for orientation events in browser.
 *@see https://developer.mozilla.org/en-US/docs/Web/API/Window/deviceorientation_event
 */
export function onConnectionStatusChange(handler: EOnlineOrOffline['handler']) {
   if (!isCreatedOnce) {
      windowAdd('online', onlineOfflineEventHandler);
      windowAdd('offline', onlineOfflineEventHandler);
      isCreatedOnce = true;
   }

   const event = createEvent<EOnlineOrOffline>(handler);
   registered.push(event);

   onBeforeUnmount(() => {
      removeEvent(registered, event.id);
      if (registered.length <= 0) {
         windowRemove('online', onlineOfflineEventHandler);
         windowRemove('offline', onlineOfflineEventHandler);
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
