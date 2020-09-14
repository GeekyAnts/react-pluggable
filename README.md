# React-pluggable

React-pluggable is a library that helps you develop your react application on the plugin model.

## Installation

Use npm or yarn to install this to your application.

```bash
yarn add react-pluggable
```

## Usage

#### App.tsx

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  createPluginStore,
  PluginProvider,
  RendererPlugin,
} from 'react-pluggable';
import ClickMePlugin from './Plugins/ClickMePlugin';
import Test from './components/Test';

const pluginStore = createPluginStore();
pluginStore.install('RendererPlugin', new RendererPlugin());
pluginStore.install('ClickMePlugin', new ClickMePlugin());

const App = () => {
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
```

##### ClickMePlugin.tsx

```tsx
import React from 'react';
import { IPlugin } from 'react-pluggable';

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
      <h1>This is an element from the plugin</h1>
    ));
  }

  deactivate() {
    //
  }
}

export default ClickMePlugin;
```

##### Test.tsx

```tsx
import * as React from 'react';
import { usePluginStore } from '../../.';

const Test = (props: any) => {
  const pluginStore: any = usePluginStore();

  pluginStore.executeFunction('test', 1, 2);
  let Renderer = pluginStore.executeFunction(
    'RendererPlugin.getRendererComponent'
  );
  return (
    <>
      <h1>Working</h1>{' '}
      <button
        onClick={() => {
          pluginStore.executeFunction('sendAlert');
        }}
      >
        Send Alert
      </button>
      <Renderer placement={'top'} />
    </>
  );
};

export default Test;
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
