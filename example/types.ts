import { PluginStore } from '../src';
import { PluginStoreClickMe } from './Plugins/ClickMePlugin';

export type PluginStoreWithPlugins = PluginStore & PluginStoreClickMe;
