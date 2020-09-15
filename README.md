# React-pluggable

React-pluggable is a library that helps you develop your react application on the plugin model.

## Installation

Use npm or yarn to install this to your application.

```bash
yarn add react-pluggable
```

## Usage

### Making a plugin

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

### Adding it to your app

##### App.tsx

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createPluginStore, PluginProvider } from 'react-pluggable';
import ClickMePlugin from './Plugins/ClickMePlugin';
import Test from './components/Test';

const pluginStore = createPluginStore();
pluginStore.install('ClickMePlugin', new ClickMePlugin());

const App = () => {
  return (
    <PluginProvider pluginStore={pluginStore}>
      <Test></Test>
    </PluginProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

### Using the plugin

##### Test.tsx

```tsx
import * as React from 'react';
import { usePluginStore } from 'react-pluggable';

const Test = (props: any) => {
  const pluginStore: any = usePluginStore();

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
    </>
  );
};

export default Test;
```

### Using the inbuilt renderer

Sometimes a plugin has a UI component associated with it. You can implement this functionality by simply building a plugin of your own or using the default plugin provided by the package.

You can add the inbuilt renderer plugin by importing and installing `RendererPlugin` provided in the package.

#### Importing the plugin

##### App.tsx

```tsx
import * as React from 'react';
import { usePluginStore } from 'react-pluggable';
```

##### Test.tsx

```tsx
import * as React from 'react';
import { usePluginStore } from 'react-pluggable';

const Test = (props: any) => {
  const pluginStore: any = usePluginStore();

  pluginStore.executeFunction('test', 1, 2);
  let Renderer = pluginStore.executeFunction(
    'RendererPlugin.getRendererComponent'
  );
  return (
    <>
      <Renderer placement={'top'} />
    </>
  );
};

export default Test;
```

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
