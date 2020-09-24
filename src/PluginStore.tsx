import { EventCallableRegsitry } from './EventCallableRegsitry';
import { IPlugin } from './interfaces/IPlugin';
import { Event } from './Event';

export class PluginStore {
  private functionArray: Map<string, any>;
  private pluginMap: Map<string, IPlugin>;
  private _eventCallableRegistry: EventCallableRegsitry = new EventCallableRegsitry();

  constructor() {
    this.functionArray = new Map<string, any>();
    this.pluginMap = new Map<string, IPlugin>();
  }

  install(key: string, plugin: IPlugin) {
    this.pluginMap.set(key, plugin);
    plugin.init(this);
    plugin.activate();
  }

  addFunction(key: string, fn: any) {
    this.functionArray.set(key, fn);
  }

  executeFunction(key: string, ...args: any): any {
    let fn = this.functionArray.get(key);
    if (fn) {
      return fn(...args);
    }
    console.error('No function added for the key ' + key + '.');
  }

  removeFunction(key: string): void {
    this.functionArray.delete(key);
  }

  uninstall(key: string) {
    let plugin = this.pluginMap.get(key);

    if (plugin) {
      plugin.deactivate();
      this.pluginMap.delete(key);
    }
  }

  addEventListener(name: string, callback: (event: Event) => void) {
    this._eventCallableRegistry.addEventListener(name, callback);
  }
  removeEventListener(name: string, callback: (event: Event) => void) {
    this._eventCallableRegistry.removeEventListener(name, callback);
  }
  dispatchEvent(event: Event) {
    this._eventCallableRegistry.dispatchEvent(event);
  }
}
