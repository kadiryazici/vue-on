import { RegisteredEvent } from '../types';
import { createID } from './createID';

export const createEvent = <T extends RegisteredEvent<(...params: any[]) => any>>(handler: T['handler']) => {
   return { id: createID(), handler } as T;
};
