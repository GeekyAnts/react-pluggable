# <img width="25px" src="https://github.com/react-pluggable/react-pluggable.github.io/blob/development/img/ReactPluggableLogoBlack.png" alt="React-pluggable Logo"> React Pluggable

React Pluggable: A plugin system for JS & React apps

While React itself is a plugin system in a way, it focuses on the abstraction of the UI. It is inherently declarative which makes it intuitive for developers when building UI but it also makes extensibility hard. With the help of React Pluggable, we can think of our app as a set of features instead of a set of components. It provides a mixed approach to solve this problem. We at [GeekyAnts](https://geekyants.com/) have used React Pluggable for large & complex apps like [BuilderX](https://builderx.io/) to add independent and dependent features over time, and it has worked wonderfully for us.

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

const App = () => {
  return (
    <PluginProvider pluginStore={pluginStore}>
      <Test />
    </PluginProvider>
  );
};

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

Sometimes a plugin has a UI component associated with it. You can implement this functionality by simply building a plugin of your own or using the default plugin provided by the package.

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
