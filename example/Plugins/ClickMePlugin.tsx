// @ts-ignore
import React from 'react';
import { IPlugin } from '../../.';

class ClickMePlugin implements IPlugin {
  public pluginStore;

  init(pluginStore) {
    console.log('Inside init');
    this.pluginStore = pluginStore;
  }

  getReactComponent(): React.Component {
    return <h1>asdjkdas</h1>;
  }

  activate() {
    this.pluginStore.addFunction('sendAlert', () => {
      alert('Testing');
    });

    this.pluginStore.executeFunction(
      'RendererPlugin.add',
      'top',
      this.getReactComponent()
    );
  }
  deactivate() {
    //
  }
}

export default ClickMePlugin;
