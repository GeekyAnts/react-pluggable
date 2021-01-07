# <img width="25px" src="https://github.com/react-pluggable/react-pluggable.github.io/blob/development/img/ReactPluggableLogoBlack.png" alt="React-pluggable Logo"> React Pluggable

### 1) Introduction

[React Pluggable](https://react-pluggable.github.io/?utm_source=React%20Pluggable&utm_medium=GitHub&utm_campaign=README): A plugin system for JS & React apps

While React itself is a plugin system in a way, it focuses on the abstraction of the UI. It is inherently declarative which makes it intuitive for developers when building UI. With the help of React Pluggable, we can think of our app as a **set of features** instead of a **set of components**. It provides a mixed approach to solve this problem.

We at [GeekyAnts](https://geekyants.com/?utm_source=React%20Pluggable&utm_medium=GitHub&utm_campaign=README) have used React Pluggable for large & complex apps like [BuilderX](https://builderx.io/?utm_source=React%20Pluggable&utm_medium=GitHub&utm_campaign=README) to add independent and dependent features over time, and it has worked wonderfully for us. Find out more on our [official documentation](https://react-pluggable.github.io/?utm_source=React%20Pluggable&utm_medium=GitHub&utm_campaign=README).

### 2) Motivation

In React, we think of everything as components. If we want to add a new feature, we make a new component and add it to our app. Every time we have to enable/disable a feature, we have to add/remove that component from the entire app and this becomes cumbersome when working on a complex app where there are lots of features contributed by different developers.

We are a huge fan of [Laravel](https://laravel.com/) and love how Service Provider works in it. Motivated by how we register any service for the entire app from one place, we built a plugin system that has all your features and can be enabled/disabled with a single line of code.

React Pluggable simplifies the problem in 3 simple steps:

1. To add a new feature in your app, you write it's logic and install it in the plugin store.
2. You can use that feature anywhere in the app by calling that feature using PluginStore rather than importing that feature directly.
3. If you do not want a particular plugin in your app, you can uninstall it from your plugin store or just comment out the installation.

### 3) Features

- **Open-closed Principle**

The O in SOLID stands for Open-closed principle which means that entities should be **open for extension** but **closed for modification**. With React Pluggable, we can add plugins and extend a system without modifying existing files and features.

- **Imperative APIs for Extensibility**

React is inherently declarative which makes it intuitive for developers when building UI but it also makes extensibility hard.

- **Thinking Features over Components**

React abstracts components very well but a feature may have more than just components. React Pluggable pushes you to a **feature mindset** instead of a **component mindset**.

### 4) Installation

Use npm or yarn to install this to your application:

```
npm install react-pluggable
yarn add react-pluggable
```

### 5) Usage

- **Making a plugin**

_ShowAlertPlugin.tsx_

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

export default ShowAlertPlugin;`
```

- **Adding it to your app**

_App.tsx_

```tsx
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

- **Using the plugin**

_Test.tsx_

```tsx
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

- **Using the inbuilt renderer**

Sometimes a plugin has a UI component associated with it. You can implement this functionality by simply building a plugin of your own or using the default plugin provided by the package.

_SharePlugin.tsx_

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

You can add the inbuilt renderer plugin by importing and installing `RendererPlugin` provided in the package.

- **Importing the plugin**

_App.tsx_

```tsx
import \* as React from 'react';
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

_Test.tsx_

```tsx
import \* as React from 'react';
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

### 6) Examples

Here are some examples of React Pluggable:

- [**Hello World**](https://react-pluggable.github.io/docs/hello-world-example?utm_source=React%20Pluggable&utm_medium=GitHub&utm_campaign=README)
- [**Renderer Example**](https://react-pluggable.github.io/docs/renderer-example?utm_source=React%20Pluggable&utm_medium=GitHub&utm_campaign=README)
- [**Event Example**](https://react-pluggable.github.io/docs/event-example?utm_source=React%20Pluggable&utm_medium=GitHub&utm_campaign=README)
- [**Typing Example**](https://react-pluggable.github.io/docs/typing-example?utm_source=React%20Pluggable&utm_medium=GitHub&utm_campaign=README)
- [**Todo App**](https://react-pluggable.github.io/docs/todo-example?utm_source=React%20Pluggable&utm_medium=GitHub&utm_campaign=README)

### 7) Tech Stack

Javascript & React.

### 8) Naming Conventions

Although the naming of plugins, functions, or events is not an enforced rule, we recommend a few conventions to standardize things.

1. **Plugin Name**: Let's consider a plugin which provides authentication, named as **Auth**.
2. **Class Name**: The name of the class will be your plugin name **suffixed with 'Plugin'** i.e. **AuthPlugin**.
3. **getPluginName:** When returning the name of the plugin, we add <**plugin_name**> with **@**, followed by the **version**. ex : **Auth@1.0.0** (<plugin_name>@).
4. **Adding functions**: While functions can be added to pluginStore with any name, to ensure uniqueness across plugins, we recommend the format `<plugin_name>.<function_name>`. Ex : **Auth.authenticate**.
5. **Events:** Events can be added and dispatched from pluginStore using any name. To show which event belongs to which plugin, we recommend the format `<plugin_name>.<event_name>` Ex: **Auth.checking**.

**Example :**

AuthPlugin.tsx

```tsx
import React from 'react';
import { IPlugin, PluginStore } from 'react-pluggable';

class AuthPlugin implements IPlugin {
  getPluginName(): string {
    return 'Auth@1.0.0'; //line 2
  }

  getDependencies(): string[] {
    return [];
  }

  public pluginStore: any;

  init(pluginStore: PluginStore): void {
    this.pluginStore = pluginStore;
  }

  authenticate = (credentials: object) => {
    // checks the credentials and returns username if matches.
    return { name: 'username' };
  };

  activate(): void {
    this.pluginStore.addFunction(
      'Auth.authenticate', //line 3
      (credentials: object) => this.authenticate(credentials)
    );
  }

  deactivate(): void {
    this.pluginStore.removeFunction('Auth.authenticate'); //line 4
  }
}

export default AuthPlugin;
```

We have seen in the class AuthPlugin that the name of the plugin is used several times. An alternate way is to define a variable that stores the name of the plugin and use that variable in the class wherever we want the plugin name.

AuthPlugin

```tsx
import React from 'react';
import { IPlugin, PluginStore } from 'react-pluggable';

class AuthPlugin implements IPlugin {
  private namespace = 'Auth';

  getPluginName(): string {
    return `${this.namespace}@1.0.0`; //line 2
  }

  getDependencies(): string[] {
    return [];
  }

  public pluginStore: any;

  init(pluginStore: PluginStore): void {
    this.pluginStore = pluginStore;
  }

  authenticate = (credentials: object) => {
    // checks the credentials and returns username if matches.
    return { name: 'username' };
  };

  activate(): void {
    this.pluginStore.addFunction(
      `${this.namespace}.authenticate`, //line 3
      (credentials: object) => this.authenticate(credentials)
    );
  }

  deactivate(): void {
    this.pluginStore.removeFunction(`${this.namespace}.authenticate`); //line 4
  }
}

export default AuthPlugin;
```

### 9) Contributors

- [Aditya Jamuar](https://twitter.com/GeekJamuar)
- [Himanshu Satija](https://twitter.com/HimanshuSatija_)
- [Sanket Sahu](https://twitter.com/sanketsahu)
- [Amar Somani](https://twitter.com/amar_somani)

### 10) How to Contribute

Thank you for your interest in contributing to React Pluggable! Pull requests are welcome. Head over to [Contribution Guidelines](https://github.com/GeekyAnts/react-pluggable/blob/master/CONTRIBUTING.md) and learn how you can be a part of a wonderful, growing community.

For major changes, please open an issue first to discuss changes and update tests as appropriate.

### 11) License

Licensed under the MIT License, Copyright © 2020 GeekyAnts. See [LICENSE](https://github.com/GeekyAnts/react-pluggable/blob/master/LICENSE) for more information.
