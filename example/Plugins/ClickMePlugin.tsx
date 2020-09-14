// @ts-ignore
import React from 'react';
import { IPlugin } from '../../.';

class ClickMePlugin implements IPlugin {
  public pluginStore;

  init(pluginStore) {
    this.pluginStore = pluginStore;
  }

  activate() {
    this.pluginStore.addFunction('sendAlert', () => {
      alert('Testing');
    });

    this.pluginStore.executeFunction('RendererPlugin.add', 'top', () => (
      <h1>asdjkdas</h1>
    ));
  }
  deactivate() {
    this.pluginStore.removeFunction('sendAlert');
  }
}

export default ClickMePlugin;
