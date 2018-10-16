# shape_json

[![NPM version][npm-image]][npm-url]

## Introduction

A tool to help for shaping properties of json object to the type and name you want.

## Install

```shell
$ yarn add shape_json
```

```js
const shape_json = require('@ballfish/shape_json')
```

## Usage

```js
const origin = {
  campaignName: 'test',
  adsetName: 'owo',
  name: 'wow',
  clicks: '123'
}

const schema = {
  campaignName: {
    to: 'campaign'
  },
  adsetName: {},
  clicks: {
    to: 'cc',
    type: shape_json.type.number
  }
}

const option = {
  otherProperties: 'keep',
  error: 'ignore',
  notFoundProperties: 'give-default',
  keyDuplicate: 'keep-schema'
}

console.log(shape_json.shape(origin, schema, option))

/**
 * {
 *  name: 'wow',
 *  campaign: 'test',
 *  adsetName: 'owo',
 *  cc: 123
 * }
 */
```

[npm-image]: https://img.shields.io/npm/v/@ballfish/shape_json.svg
[npm-url]: https://npmjs.org/package/@ballfish/shape_json
