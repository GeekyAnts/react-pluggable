import { IPlugin } from './interfaces/IPlugin';

export class PluginStore {
  private functionArray: Map<string, any>;

  constructor() {
    this.functionArray = new Map<string, any>();
  }

  install(plugin: IPlugin) {
    plugin.init(this);
    plugin.activate();
  }

  addFunction(key: string, fn: any) {
    this.functionArray.set(key, fn);
  }

  executeFunction(key: string, ...args: any) {
    let fn = this.functionArray.get(key);
    fn(...args);
  }
}
