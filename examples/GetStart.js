import ShapeJson from 'ShapeJson'

const origin = {
  campaignName: 'test',
  name: 'wow',
  clicks: '123',
  start_date: '2018-02-14'
}

const schema = {
  campaignName: {
    to: 'campaign'
  },
  clicks: {
    type: ShapeJson.type.number
  },
  start_date: {
    to: 'date',
    type: ShapeJson.type.dateTime
  }
}

const option = {
  otherProperties: 'keep', // ['keep', 'ignore']
  error: 'ignore', // ['show', 'ignore']
  notFoundProperties: 'give-default', // ['give-default', 'show-error', 'ignore', 'give-undefined']
  keyDuplicate: 'keep-schema' // ['keep-schema', 'keep-origin', 'show-error']
}

console.log(ShapeJson.shape(origin, schema, option))
