// @ts-ignore
import React from 'react';
import { IPlugin, PluginStore, Event } from '../../src';

const namespace = 'ClickMe';

class ClickMePlugin implements IPlugin {
  public pluginStore: PluginStore;

  getPluginName() {
    return `${namespace}@1.0.0`;
  }
  getDependencies() {
    return ['Plugin1@2.3.0'];
  }

  init(pluginStore) {
    this.pluginStore = pluginStore;
  }

  activate() {
    this.pluginStore.addFunction(`${namespace}.sendAlert`, (msg: string) => {
      alert(msg);
    });

    this.pluginStore.executeFunction('Renderer.add', 'top', () => (
      <>
        <h1>asdjkdas</h1>
        <button
          onClick={() =>
            this.pluginStore.dispatchEvent(new Event(`${namespace}.hello`))
          }
        >
          Dispatch event
        </button>
      </>
    ));

    setTimeout(() => {
      this.pluginStore.executeFunction('Renderer.add', 'top', () => (
        <>
          <h1>Async text</h1>
          <button
            onClick={() =>
              this.pluginStore.dispatchEvent(new Event(`${namespace}.hello`))
            }
          >
            Async button
          </button>
        </>
      ));
    }, 5000);
  }
  deactivate() {
    this.pluginStore.removeFunction('ClickMe.sendAlert');
  }
}

export default ClickMePlugin;

type PluginStoreClickMe = {
  executeFunction(functionName: `ClickMe.add`, msg: string): void;
  executeFunction(functionName: 'ClickMe.remove', msg: string): void;
};

export { PluginStoreClickMe };
