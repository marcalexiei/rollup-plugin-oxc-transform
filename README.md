# rollup-plugin-oxc-transform

[![CI](https://github.com/marcalexiei/rollup-plugin-oxc-transform/actions/workflows/CI.yml/badge.svg)](https://github.com/marcalexiei/rollup-plugin-oxc-transform/actions/workflows/CI.yml)
[![Code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io)
[![npm version](https://img.shields.io/npm/v/rollup-plugin-oxc-transform.svg?style=flat-square)](https://www.npmjs.com/package/rollup-plugin-oxc-transform)
[![issues](https://img.shields.io/github/issues/marcalexiei/rollup-plugin-oxc-transform.svg)](https://github.com/marcalexiei/rollup-plugin-oxc-transform/issues)

🍣 A Rollup plugin to transpile TypeScript/JavaScript with oxc-transformer.

> [!WARNING]
> Work in progress

> [!TIP]
> If you need to generate declarations consider to use [unplugin-isolated-decl](https://github.com/unplugin/unplugin-isolated-decl)

## Install

```shell
npm i --save-dev rollup oxc-transform oxc-resolve rollup-plugin-oxc-transform
```

```shell
yarn add --dev rollup oxc-transform oxc-resolve rollup-plugin-oxc-transform
```

```shell
pnpm add --save-dev rollup oxc-transform oxc-resolve rollup-plugin-oxc-transform
```

## Usage

```js
// rollup.config.js
import { defineConfig } from 'rollup';
import { oxcTransform } from 'rollup-plugin-oxc-transform';

export default defineConfig({
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'esm',
  },
  plugins: [
    oxcTransform(/* options */),

    // other plugins...
  ],
});
```

## Options

> [!TIP]
> Typescript declaration files are included in the plugin release,
> so you can rely on autocomplete features when providing plugin configuration

### `include`

- Type: `FilterPattern`
- Default: `/\.[mc]?[jt]sx?$/`

Which files are processed by the plugin

### `exclude`

- Type: `FilterPattern`
- Default: `/node_modules/`

Which files are excluded from plugin processing

### `resolveOptions`

- Type: `ResolveOptions`
- Default: `undefined`

Options passed to [`oxc-resolver`](https://oxc.rs/docs/guide/usage/resolver.html).
By default the plugin will provide the following options:

- `conditionNames` `['node', 'import']`
- `extensions` `['.ts', '.tsx', '.mjs', '.js', '.cjs', '.jsx']`

> [!NOTE]
> They can be both customized by passing your own property via `resolveOptions`

### `transformOptions`

- Type: `Omit<TransformOptions, 'typescript'>`;
- Default: `undefined`

All options accept by [`oxc-transform`](https://oxc.rs/docs/guide/usage/transformer.html) excluding `typescript` property.

> [!WARNING]
> If you need to generate declarations consider to use [unplugin-isolated-decl](https://github.com/unplugin/unplugin-isolated-decl)

## Meta

[CONTRIBUTING](/CONTRIBUTING.md)

[LICENSE (MIT)](/LICENSE)

## Thanks

This plugin is based on [@rollup/plugin-swc](https://github.com/rollup/plugins/tree/master/packages/swc#readme)
