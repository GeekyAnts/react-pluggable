import { IPlugin } from '../../interfaces/IPlugin';
import { PluginStore } from '../../PluginStore';
import { Renderer } from './components/Renderer';
import ComponentAddedEvent from './events/ComponentAddedEvent';

export class RendererPlugin implements IPlugin {
  public pluginStore: PluginStore = new PluginStore();
  private componentMap = new Map<string, Array<React.Component>>();

  getPluginName() {
    return 'Renderer@1.0.0';
  }
  getDependencies() {
    return [];
  }

  init(pluginStore: PluginStore) {
    this.pluginStore = pluginStore;
  }

  addToComponentMap(position: string, component: React.Component) {
    let array = this.componentMap.get(position);
    if (!array) {
      array = [component];
    } else {
      array.push(component);
    }
    this.componentMap.set(position, array);
    this.pluginStore.dispatchEvent(
      new ComponentAddedEvent('Renderer.componentAdded', position)
    );
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
      'Renderer.add',
      this.addToComponentMap.bind(this)
    );

    this.pluginStore.addFunction(
      'Renderer.getComponentsInPosition',
      this.getComponentsInPosition.bind(this)
    );

    this.pluginStore.addFunction(
      'Renderer.getRendererComponent',
      this.getRendererComponent.bind(this)
    );
  }

  deactivate() {
    this.pluginStore.removeFunction('Renderer.add');

    this.pluginStore.removeFunction('Renderer.getComponentsInPosition');

    this.pluginStore.removeFunction('Renderer.getRendererComponent');
  }
}

export type PluginStoreRenderer = {
  executeFunction(
    functionName: 'Renderer.getComponentsInPosition',
    position: string
  ): Array<React.Component>;
};
