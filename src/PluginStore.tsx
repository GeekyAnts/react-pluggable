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
    if (fn) {
      return fn(...args);
    }
    console.error('No function added for the key ' + key + '.');
  }

  removeFunction(key: string): any {
    this.functionArray.delete(key);
  }

  uninstall(key: string) {
    let plugin = this.pluginMap.get(key);

    if (plugin) {
      plugin.deactivate();
      this.pluginMap.delete(key);
    }
  }
}
