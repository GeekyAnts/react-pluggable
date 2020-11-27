import { IPlugin, PluginStore, Event } from '../../src';

export default class Plugin1 implements IPlugin {
  public pluginStore: PluginStore;

  getPluginName() {
    return 'Plugin1@2.3.0';
  }
  getDependencies() {
    return ['Plugin2@3.0.0', 'Plugin3@1.9.0'];
  }

  init(pluginStore) {
    this.pluginStore = pluginStore;
  }

  activate() {}
  deactivate() {}
}
