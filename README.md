# React-pluggable

React-pluggable is a library that helps you develop your react application on the plugin model.

## Installation

Use npm or yarn to install this to your application.

```bash
npm install react-pluggable

yarn add react-pluggable
```

## Usage

### Making a plugin

##### ShowAlertPlugin.tsx

```tsx
import React from 'react';
import { IPlugin, PluginStore } from 'react-pluggable';

class ShowAlertPlugin implements IPlugin {
  public pluginStore: any;

  getPluginName(): string {
    return 'ShowAlert';
  }

  getDependencies(): string[] {
    return [];
  }

  init(pluginStore: PluginStore): void {
    this.pluginStore = pluginStore;
  }

  activate(): void {
    this.pluginStore.addFunction('sendAlert', () => {
      alert('Hello from the ShowAlert Plugin');
    });
  }

  deactivate(): void {
    this.pluginStore.removeFunction('sendAlert');
  }
}

export default ShowAlertPlugin;
```

### Adding it to your app

##### App.tsx

```jsx
import React from 'react';
import './App.css';
import { createPluginStore, PluginProvider } from 'react-pluggable';
import ShowAlertPlugin from './plugins/ShowAlertPlugin';
import Test from './components/Test';

const pluginStore = createPluginStore();
pluginStore.install(new ShowAlertPlugin());

function App() {
  return (
    <PluginProvider pluginStore={pluginStore}>
      <Test />
    </PluginProvider>
  );
}

export default App;
```

### Using the plugin

##### Test.tsx

```jsx
import * as React from 'react';
import { usePluginStore } from 'react-pluggable';

const Test = () => {
  const pluginStore = usePluginStore();

  return (
    <>
      <button
        onClick={() => {
          pluginStore.executeFunction('sendAlert');
        }}
      >
        Show Alert
      </button>
    </>
  );
};

export default Test;
```

### Using the inbuilt renderer

Sometimes a plugin has an UI component associated with it. You can implement this functionality by simply building a plugin of your own or using the default plugin provided by the package.

##### SharePlugin.tsx

```tsx
import React from 'react';
import { IPlugin, PluginStore } from 'react-pluggable';

class SharePlugin implements IPlugin {
  public pluginStore: any;

  getPluginName(): string {
    return 'Share plugin';
  }

  getDependencies(): string[] {
    return [];
  }

  init(pluginStore: PluginStore): void {
    this.pluginStore = pluginStore;
  }

  activate(): void {
    this.pluginStore.executeFunction('RendererPlugin.add', 'top', () => (
      <button>Share</button>
    ));
  }

  deactivate(): void {
    //
  }
}

export default SharePlugin;
```

You can add the inbuilt renderer plugin by importing and installing `RendererPlugin` provided in the package.

#### Importing the plugin

##### App.tsx

```tsx
import * as React from 'react';
import { usePluginStore } from 'react-pluggable';
import {
  createPluginStore,
  PluginProvider,
  RendererPlugin,
} from 'react-pluggable';
import SharePlugin from './plugins/SharePlugin';
import Test from './components/Test';

const pluginStore = createPluginStore();
pluginStore.install(new RendererPlugin());
pluginStore.install(new SharePlugin());

function App() {
  return (
    <PluginProvider pluginStore={pluginStore}>
      <Test />
    </PluginProvider>
  );
}

export default App;
```

##### Test.tsx

```tsx
import * as React from 'react';
import { usePluginStore } from 'react-pluggable';

const Test = (props: any) => {
  const pluginStore: any = usePluginStore();

  let Renderer = pluginStore.executeFunction(
    'RendererPlugin.getRendererComponent'
  );

  return (
    <>
      <h1>I am header</h1>
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
