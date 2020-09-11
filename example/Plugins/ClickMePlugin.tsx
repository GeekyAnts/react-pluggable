// @ts-ignore
import React from 'react';
import { IPlugin } from '../../.';

class ClickMePlugin implements IPlugin {
  public pluginStore;

  init(pluginStore) {
    console.log('Inside init');
    this.pluginStore = pluginStore;
  }
  activate() {
    this.pluginStore.addFunction('sendAlert', () => {
      alert('Testing');
    });

    this.pluginStore.executeFunction(
      'RendererPlugin.add',
      'top',
      <h1>asjdf</h1>
    );
  }
  deactivate() {
    //
  }
}

export default ClickMePlugin;
