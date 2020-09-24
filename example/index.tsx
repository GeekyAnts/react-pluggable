import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createPluginStore, PluginProvider, RendererPlugin } from '../src';
import ClickMePlugin from './Plugins/ClickMePlugin';
import Test from './components/Test';

const pluginStore = createPluginStore();
pluginStore.install('RendererPlugin', new RendererPlugin());
pluginStore.install('ClickMePlugin', new ClickMePlugin());

pluginStore.addEventListener('ClickMePlugin.hello', event => {
  console.log('Event received: ', event);
  event.stopPropagation();
});

pluginStore.addEventListener('ClickMePlugin.hello', event => {
  console.log('Event received second time: ', event);
});

const App = () => {
  return (
    <PluginProvider pluginStore={pluginStore}>
      <Test></Test>
    </PluginProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
