import { IPlugin, PluginStore, Event } from '../../src';
import { PluginStoreWithPlugins } from '../types';

export default class Plugin2 implements IPlugin {
  public pluginStore: PluginStore;

  getPluginName() {
    return 'Plugin2@3.1.0';
  }
  getDependencies() {
    return [];
  }

  init(pluginStore: PluginStoreWithPlugins) {
    this.pluginStore = pluginStore;
  }

  activate() {}
  deactivate() {}
}
