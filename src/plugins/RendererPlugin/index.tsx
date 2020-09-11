import { IPlugin } from '../../interfaces/IPlugin';
import { PluginStore } from '../../PluginStore';
import { Renderer } from './components/Renderer';

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

  getRendererComponent() {
    return Renderer;
  }

  getComponentsInPosition(position: string) {
    let componentArray = this.componentMap.get(position);
    if (!componentArray) return [];

    return componentArray;
  }

  activate() {
    this.pluginStore.addFunction(
      'RendererPlugin.add',
      this.addToComponentMap.bind(this)
    );

    this.pluginStore.addFunction(
      'RendererPlugin.getComponentsInPosition',
      this.getComponentsInPosition.bind(this)
    );

    this.pluginStore.addFunction(
      'RendererPlugin.getRendererComponent',
      this.getRendererComponent.bind(this)
    );
  }

  deactivate() {
    //
  }
}
