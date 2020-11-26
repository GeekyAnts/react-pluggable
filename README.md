# <img width="25px" src="https://github.com/react-pluggable/react-pluggable.github.io/blob/development/img/ReactPluggableLogoBlack.png" alt="React-pluggable Logo"> React Pluggable

React-pluggable is a NPM library that helps you develop your react application in a **feature-oriented** manner. It is loosely based on the concept of Service Providers of Laravel and aims on achieving the concept of **Open-closed** principle. Everything is developed in the form of small sections called plugins which can be installed to the application and everything inside it just starts working.

This gives us a few advantages:

- Features can be developed & tested in isolation (features can have an interface, provide or consume data & functions, interact with external APIs and more)
- A plugin can be added or removed by a single line (which is perfect for A/B testing)
- Ships with dependency management: Plugins can depend on other plugins and communicate with each other

You can find out more about it on their [official documentation](https://react-pluggable.github.io/).

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
