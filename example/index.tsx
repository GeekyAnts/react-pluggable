import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createPluginStore, PluginProvider, RendererPlugin } from '../src';
import ClickMePlugin from './Plugins/ClickMePlugin';
import Test from './components/Test';
import Plugin1 from './Plugins/Plugin1-v2.4.0';
import Plugin2 from './Plugins/Plugin2-v3.1.0';
import Plugin3 from './Plugins/Plugin3-v1.9.1';

const pluginStore = createPluginStore();
pluginStore.install(new RendererPlugin());
pluginStore.install(new Plugin3());
pluginStore.install(new Plugin2());
pluginStore.install(new Plugin1());
pluginStore.install(new ClickMePlugin());

pluginStore.addEventListener('ClickMe.hello', event => {
  console.log('Event received: ', event);
  event.stopPropagation();
});

pluginStore.addEventListener('ClickMe.hello', event => {
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
