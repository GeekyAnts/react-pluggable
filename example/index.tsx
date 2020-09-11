import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createPluginStore, PluginProvider, RendererPlugin } from '../.';
import ClickMePlugin from './Plugins/ClickMePlugin';
import Test from './components/Test';

const App = () => {
  const pluginStore = createPluginStore();
  pluginStore.install(new RendererPlugin());
  pluginStore.install(new ClickMePlugin());

  pluginStore.addFunction('test', (a, b) => {
    console.log('working', a, b);
  });
  return (
    <PluginProvider pluginStore={pluginStore}>
      <Test></Test>
    </PluginProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
