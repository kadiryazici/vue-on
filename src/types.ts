export interface RegisteredEvent<T extends (...args: any) => any> {
   id: string;
   handler: T;
}
