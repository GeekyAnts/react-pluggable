import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createPluginStore, PluginProvider, RendererPlugin } from '../.';
import ClickMePlugin from './Plugins/ClickMePlugin';
import Test from './components/Test';

const pluginStore = createPluginStore();
pluginStore.install('RendererPlugin', new RendererPlugin());
pluginStore.install('ClickMePlugin', new ClickMePlugin());

const App = () => {
  pluginStore.addFunction('test', (a, b) => {
    console.log('working 1', a, b);
  });
  return (
    <PluginProvider pluginStore={pluginStore}>
      <Test></Test>
    </PluginProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
