import { IPlugin, PluginStore, Event } from '../../src';

export default class Plugin3 implements IPlugin {
  public pluginStore: PluginStore;

  getPluginName() {
    return 'Plugin3@1.9.0';
  }
  getDependencies() {
    return [];
  }

  init(pluginStore) {
    this.pluginStore = pluginStore;
  }

  activate() {}
  deactivate() {}
}
