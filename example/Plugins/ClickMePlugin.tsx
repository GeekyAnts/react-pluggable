import { IPlugin } from '../../.';

class ClickMePlugin implements IPlugin {
  private pluginStore;

  init(pluginStore) {
    console.log('Inside init');
    this.pluginStore = pluginStore;
  }
  activate() {
    console.log('Inside activate', this.pluginStore);

    this.pluginStore.addFunction('sendAlert', () => {
      alert('Testing');
    });
  }
  deactivate() {
    //
  }
}

export default ClickMePlugin;
