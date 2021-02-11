# Contributing

We want to make contributing to this project as easy and transparent as possible and we are grateful for, any contributions made by the community. By contributing to React Pluggable, you agree to abide by the [code of conduct](https://github.com/GeekyAnts/react-pluggable/blob/master/CODE_OF_CONDUCT.md).

## Reporting Issues and Asking Questions

Before opening an issue, please search the [issue tracker](https://github.com/GeekyAnts/react-pluggable/issues) to make sure your issue hasn't already been reported.

### Bugs and Improvements

We use the issue tracker to keep track of bugs and improvements to React Pluggable itself, its examples, and the documentation. We encourage you to open issues to discuss improvements, architecture, theory, internal implementation, etc. If a topic has been discussed before, we will ask you to join the previous discussion.

## Development

Visit the [issue tracker](https://github.com/GeekyAnts/react-pluggable/issues) to find a list of open issues that need attention.

Fork, then clone the repo:

```sh
git clone https://github.com/GeekyAnts/react-pluggable.git
```

### Building

#### Building React Pluggable

```sh
yarn build
```

### Testing and Linting

To only run linting:

```sh
yarn lint
```

To only run tests:

```sh
yarn test
```

### Docs

Improvements to the documentation are always welcome. You can find them in the on [`react-pluggable.github.io`](https://github.com/react-pluggable/react-pluggable.github.io) repository. We use [Docusaurus](https://docusaurus.io/) to build our documentation website. The website is published automatically whenever the `master` branch is updated.

### Examples

React Pluggabel comes with a Todo App example to demonstrate various concepts and best practices.

When adding a new example, please adhere to the style and format of the existing examples, and try to reuse as much code as possible.

#### Testing the Examples

To test the official React Pluggabel examples, run the following:

Install dependencies using yarn

```sh
yarn
```

Then run the example using

```sh
yarn start
```

Not all examples have tests. If you see an example project without tests, you are very welcome to add them in a way consistent with the examples that have tests.

Please visit the [Examples page](https://react-pluggable.github.io/docs/hello-world-example) for information on running individual examples.

### Sending a Pull Request

For non-trivial changes, please open an issue with a proposal for a new feature or refactoring before starting on the work. We don't want you to waste your efforts on a pull request that we won't want to accept.

In general, the contribution workflow looks like this:

- Open a new issue in the [Issue tracker](https://github.com/GeekyAnts/react-pluggable/issues)
- Fork the repo.
- Create a new feature branch based off the `master` branch.
- Make sure all tests pass and there are no linting errors.
- Submit a pull request, referencing any issues it addresses.

Please try to keep your pull request focused in scope and avoid including unrelated commits.

After you have submitted your pull request, we'll try to get back to you as soon as possible. We may suggest some changes or improvements.

Thank you for contributing!
