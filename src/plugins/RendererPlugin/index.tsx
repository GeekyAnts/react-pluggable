import { IPlugin } from '../../interfaces/IPlugin';
import { PluginStore } from '../../PluginStore';
import { Renderer } from './components/Renderer';
import ComponentUpdatedEvent from './events/ComponentUpdatedEvent';
import randomString from './randomString';

export class RendererPlugin implements IPlugin {
  public pluginStore: PluginStore = new PluginStore();
  private componentMap = new Map<
    string,
    Array<{
      component: React.ComponentClass;
      key?: string;
    }>
  >();

  getPluginName() {
    return 'Renderer@1.0.0';
  }
  getDependencies() {
    return [];
  }

  init(pluginStore: PluginStore) {
    this.pluginStore = pluginStore;
  }

  addToComponentMap(
    position: string,
    component: React.ComponentClass,
    key?: string
  ) {
    let array = this.componentMap.get(position);
    let componentKey = key ? key : randomString(8);
    if (!array) {
      array = [{ component, key: componentKey }];
    } else {
      array.push({ component, key: componentKey });
    }
    this.componentMap.set(position, array);
    this.pluginStore.dispatchEvent(
      new ComponentUpdatedEvent('Renderer.componentUpdated', position)
    );
  }

  removeFromComponentMap(position: string, component: React.ComponentClass) {
    let array = this.componentMap.get(position);
    if (array) {
      array.splice(
        array.findIndex(item => item.component === component),
        1
      );
    }
    this.pluginStore.dispatchEvent(
      new ComponentUpdatedEvent('Renderer.componentUpdated', position)
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

    this.pluginStore.addFunction(
      'Renderer.remove',
      this.removeFromComponentMap.bind(this)
    );
  }

  deactivate() {
    this.pluginStore.removeFunction('Renderer.add');

    this.pluginStore.removeFunction('Renderer.getComponentsInPosition');

    this.pluginStore.removeFunction('Renderer.getRendererComponent');

    this.pluginStore.removeFunction('Renderer.remove');
  }
}

export type PluginStoreRenderer = {
  executeFunction(
    functionName: 'Renderer.getComponentsInPosition',
    position: string
  ): Array<React.Component>;
};
