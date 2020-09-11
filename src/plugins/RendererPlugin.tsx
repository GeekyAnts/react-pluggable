import { IPlugin } from '../interfaces/IPlugin';
import { PluginStore } from '../PluginStore';

export class RendererPlugin implements IPlugin {
  public pluginStore: PluginStore = new PluginStore();
  private componentMap: Map<string, Array<any>> = new Map<string, Array<any>>();

  init(pluginStore: PluginStore) {
    this.pluginStore = pluginStore;
  }

  addToComponentMap(position: string, component: React.Component) {
    let array = this.componentMap.get(position);
    if (!array) {
      array = [component];
    }
    this.componentMap.set(position, array);
  }

  activate() {
    this.pluginStore.addFunction(
      'RendererPlugin.add',
      this.addToComponentMap.bind(this)
    );
  }

  deactivate() {
    //
  }
}
