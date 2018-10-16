# ShapeJson

[!][NPM version][npm-image]][npm-url]

## Introduction

A tool to help for shaping properties of json object to the type and name you want.

## Install

```shell
$ yarn add ShapeJson
```

```js
const ShapeJson = require('ShapeJson')
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
    type: ShapeJson.type.number
  }
}

const option = {
  otherProperties: 'keep',
  error: 'ignore',
  notFoundProperties: 'give-default',
  keyDuplicate: 'keep-schema'
}

console.log(ShapeJson.shape(origin, schema, option))

/**
 * {
 *  name: 'wow',
 *  campaign: 'test',
 *  adsetName: 'owo',
 *  cc: 123
 * }
 */
```
