import { PluginStore } from '../PluginStore';

export interface IPlugin {
  getPluginName(): string;
  getDependencies(): string[];
  pluginStore: PluginStore;
  init(pluginStore: PluginStore): void;
  activate(): void;
  deactivate(): void;
}
