import { PluginStore } from '../PluginStore';

export interface IPlugin {
  pluginStore: PluginStore;
  init(pluginStore: PluginStore): void;
  activate(): void;
  deactivate(): void;
}
