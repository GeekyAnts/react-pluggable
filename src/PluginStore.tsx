import { IPlugin } from './interfaces/IPlugin';

export class PluginStore {
  private functionArray: Map<string, any>;
  private pluginMap: Map<string, IPlugin>;

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
    return fn(...args);
  }
}
