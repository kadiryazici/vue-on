import { RegisteredEvent } from '../types';

type EventType = RegisteredEvent<any>;
export function removeEvent(array: EventType[], id: EventType['id']) {
   const index = array.findIndex((event) => event.id === id);
   if (index < 0) return;
   array[index] = array[array.length - 1];
   array.pop();
}
