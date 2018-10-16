import { expect } from 'chai'
import shape from '../src/shape'
import * as Type from '../src/type'

describe('shape', () => {
  it('should run "Get Start" correctly', () => {
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
        type: Type.number
      },
      start_date: {
        to: 'date',
        type: Type.dateTime
      }
    }

    const option = {
      otherProperties: 'keep',
      error: 'ignore',
      notFoundProperties: 'give-default',
      keyDuplicate: 'keep-schema'
    }

    const newJSON = shape(origin, schema, option)
    expect(newJSON.campaign).to.equal('test')
    expect(newJSON.clicks).to.equal(123)
    expect(newJSON.date).to.equal(Date.parse('2018-02-14'))
    expect(newJSON.name).to.equal('wow')
    expect(Object.keys(newJSON)).to.eql(['name', 'campaign', 'clicks', 'date'])
  })

  it('should keep other properties if option.otherProperties === keep', () => {
    const origin = {
      name: 'test'
    }

    const schema = {}

    const option = {
      otherProperties: 'keep'
    }

    const newJSON = shape(origin, schema, option)
    expect(newJSON.name).to.equal('test')
    expect(Object.keys(newJSON)).to.eql(['name'])
  })

  it('should not keep other properties default', () => {
    const origin = {
      name: 'test',
      clicks: '123'
    }

    const schema = {
      clicks: {
        type: Type.number
      }
    }

    const newJSON = shape(origin, schema)
    expect(newJSON.clicks).to.equal(123)
    expect(Object.keys(newJSON)).to.eql(['clicks'])
  })

  it('should ignore the property when notFoundProperties === ignore and the property is not found', () => {
    const origin = {
      name: 'test'
    }

    const schema = {
      name: {},
      clicks: {
        type: Type.number
      }
    }

    const option = {
      notFoundProperties: 'ignore'
    }

    const newJSON = shape(origin, schema, option)
    expect(newJSON.name).to.equal('test')
    expect(Object.keys(newJSON)).to.eql(['name'])
  })

  it('should throw error when notFoundProperties === show-error and the property is not found', () => {
    const origin = {
      name: 'test'
    }

    const schema = {
      name: {},
      clicks: {
        type: Type.number
      }
    }

    const option = {
      notFoundProperties: 'show-error'
    }

    expect(() => { shape(origin, schema, option) }).to.throw(Error, 'No property named clicks')
  })

  it('should give default value to the property when notFoundProperties === give-default and the property is not found', () => {
    const origin = {
      name: 'test'
    }

    const schema = {
      name: {},
      clicks: {
        type: Type.number
      }
    }

    const option = {
      notFoundProperties: 'give-default'
    }

    const newJSON = shape(origin, schema, option)
    expect(newJSON.name).to.equal('test')
    expect(newJSON.clicks).to.equal(0)
    expect(Object.keys(newJSON)).to.eql(['name', 'clicks'])
  })

  it('should give default value to the property by custom function when notFoundProperties === give-default and the property is not found and customDefault is a function', () => {
    const origin = {
      name: 'test'
    }

    const schema = {
      name: {},
      clicks: {
        type: Type.number,
        customDefault: () => 1
      }
    }

    const option = {
      notFoundProperties: 'give-default'
    }

    const newJSON = shape(origin, schema, option)
    expect(newJSON.name).to.equal('test')
    expect(newJSON.clicks).to.equal(1)
    expect(Object.keys(newJSON)).to.eql(['name', 'clicks'])
  })

  it('should give undefined to the property by custom function when the property is not found default', () => {
    const origin = {
      name: 'test'
    }

    const schema = {
      name: {},
      clicks: {}
    }

    const newJSON = shape(origin, schema)
    expect(newJSON.name).to.equal('test')
    expect(newJSON.clicks).to.equal(undefined)
    expect(Object.keys(newJSON)).to.eql(['name', 'clicks'])
  })

  it('should keep origin value when option.keyDuplicate === keep-origin', () => {
    const origin = {
      campaignName: 'test',
      name: 'wow'
    }

    const schema = {
      campaignName: {
        to: 'name'
      }
    }

    const option = {
      otherProperties: 'keep',
      keyDuplicate: 'keep-origin'
    }

    const newJSON = shape(origin, schema, option)
    expect(newJSON.name).to.equal('wow')
    expect(Object.keys(newJSON)).to.eql(['name'])
  })

  it('should throw error when option.keyDuplicate === show-error', () => {
    const origin = {
      campaignName: 'test',
      name: 'wow'
    }

    const schema = {
      campaignName: {
        to: 'name'
      }
    }

    const option = {
      otherProperties: 'keep',
      keyDuplicate: 'show-error'
    }

    expect(() => { shape(origin, schema, option) }).to.throw(Error, 'Key "name" is duplicate')
  })

  it('should keep parsed value default', () => {
    const origin = {
      campaignName: 'test',
      name: 'wow'
    }

    const schema = {
      campaignName: {
        to: 'name'
      }
    }

    const option = {
      otherProperties: 'keep'
    }

    const newJSON = shape(origin, schema, option)
    expect(newJSON.name).to.equal('test')
    expect(Object.keys(newJSON)).to.eql(['name'])
  })

  it('should parse value by custom function when customParse is a function', () => {
    const origin = {
      campaignName: 'test'
    }

    const schema = {
      campaignName: {
        to: 'name',
        customParse: (value) => `${value}_wow`
      }
    }

    const newJSON = shape(origin, schema)
    expect(newJSON.name).to.equal('test_wow')
    expect(Object.keys(newJSON)).to.eql(['name'])
  })
})
