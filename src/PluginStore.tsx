import { Event } from './Event';
import { EventCallableRegsitry } from './EventCallableRegsitry';
import { IPlugin } from './interfaces/IPlugin';
import dependencyValid from './utils/dependencyValid';

export class PluginStore {
  private functionArray: Map<string, any>;
  private pluginMap: Map<string, IPlugin>;
  private _eventCallableRegistry: EventCallableRegsitry = new EventCallableRegsitry();

  constructor() {
    this.functionArray = new Map<string, any>();
    this.pluginMap = new Map<string, IPlugin>();
  }

  install(plugin: IPlugin) {
    const pluginNameAndVer = plugin.getPluginName();
    const [pluginName] = pluginNameAndVer.split('@');
    const pluginDependencies = plugin.getDependencies() || [];

    let installationErrors: string[] = [];
    pluginDependencies.forEach((dep: string) => {
      const [depName, depVersion] = dep.split('@');
      const installedNameAndVer = this.getInstalledPluginNameWithVersion(
        depName
      );
      const [installedName, installedVersion] = installedNameAndVer
        ? installedNameAndVer.split('@')
        : [null, ''];
      if (!installedNameAndVer) {
        installationErrors.push(
          `Error installing ${pluginNameAndVer}. Could not find dependency ${dep}.`
        );
      } else if (!dependencyValid(installedVersion, depVersion)) {
        installationErrors.push(
          `Error installing ${pluginNameAndVer}.\n${installedNameAndVer} doesn't satisfy the required dependency ${dep}.`
        );
      }
    });

    if (installationErrors.length === 0) {
      this.pluginMap.set(pluginName, plugin);
      plugin.init(this);
      plugin.activate();
    } else {
      installationErrors.forEach(err => {
        console.error(err);
      });
    }
  }

  getInstalledPluginNameWithVersion(name: string) {
    const plugin = this.pluginMap.get(name);
    if (!plugin) {
      return null;
    }

    return plugin.getPluginName();
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
