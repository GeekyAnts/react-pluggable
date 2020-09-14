import { PluginStore } from '../PluginStore';

export interface IPlugin {
  init(pluginStore: PluginStore): void;
  activate(): void;
  deactivate(): void;
}
