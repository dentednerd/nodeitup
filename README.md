# NodeItUp

A [Node](https://nodejs.org/en/) app to automatically create a new Node project.

## Features

- initialises [Git](https://git-scm.com/) and creates an initial commit
- uses [Husky](https://typicode.github.io/husky/#/) for pre-commit hooks
- uses [ESLint](https://eslint.org/) for linting

## Options

- your choice of testing package: either [Mocha](https://mochajs.org/) with [Chai](https://www.chaijs.com/), or [Jest](https://jestjs.io/)
- optionally creates a [Github](https://github.com/) repo and pushes the initial commit (requires [gh](https://github.com/cli/cli))
- optionally opens the project in [Visual Studio Code](https://code.visualstudio.com/) upon completion (requires Visual Studio Code)

## Installation

```sh
$ git clone https://github.com/dentednerd/nodeitup.git
$ cd ./nodeitup
$ npm install
$ sudo npm link
```

## Usage

```sh
$ nodeitup
```
