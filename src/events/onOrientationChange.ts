export type EDeviceOrientation = RegisteredEvent<(event: DeviceOrientationEvent) => any>;

import { windowAdd, windowRemove } from '../helpers/listen';

import { RegisteredEvent } from '../types';
import { createID } from '../helpers/createID';
import { onBeforeUnmount } from '@vue/runtime-dom';
import { removeEvent } from '../helpers/removeChild';

const registered = [] as EDeviceOrientation[];
let isCreatedOnce = false;

/**
 *@description a handler for orientation events in browser.
 *@see https://developer.mozilla.org/en-US/docs/Web/API/Window/deviceorientation_event
 */
export function onOrientationChange(handler: EDeviceOrientation['handler']) {
   if (!isCreatedOnce) {
      windowAdd('deviceorientation', deviceOrientationChangeHandler);
      isCreatedOnce = true;
   }

   const event = { id: createID(), handler } as EDeviceOrientation;
   registered.push(event);

   onBeforeUnmount(() => {
      removeEvent(registered, event.id);
      if (registered.length <= 0) {
         windowRemove('deviceorientation', deviceOrientationChangeHandler);
         isCreatedOnce = false;
      }
   });
}

function deviceOrientationChangeHandler(nativeEvent: DeviceOrientationEvent) {
   for (const event of registered) {
      event.handler(nativeEvent);
   }
}
