import { Event } from './Event';
export class EventCallableRegsitry {
  registry: Map<string, Array<(event: Event) => {}>>;

  constructor() {
    this.registry = new Map();
  }

  addEventListener(name: string, callback: any) {
    let callbacks = this.registry.get(name);
    if (callbacks) {
      callbacks.push(callback);
    } else {
      this.registry.set(name, [callback]);
    }
  }

  removeEventListener(name: string, callback: any) {
    let callbacks = this.registry.get(name);
    if (callbacks) {
      const indexOf = callbacks.indexOf(callback);
      if (indexOf > -1) {
        callbacks.splice(indexOf, 1);
      }
    }
  }

  dispatchEvent(event: Event) {
    // @ts-ignore
    if (window['debug']) {
      console.log('DEBUG::', 'Event:', event.name);
    }
    let callbacks = this.registry.get(event.name);
    for (let i in callbacks) {
      callbacks[i as any](event);
      if (!event.propagate) break;
    }
  }
}
