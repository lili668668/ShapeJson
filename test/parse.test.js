import { expect } from 'chai'
import * as Parse from '../src/parse'

describe('type', () => {
  it('should throw error if parse fail default', () => {
    const string = 'test'
    const array = [ 1, 2, 3 ]
    expect(() => { Parse.number(string) }).to.throw(TypeError, 'test can\'t be parsed to number')
    expect(() => { Parse.dateTime(string) }).to.throw(TypeError, 'test can\'t be parsed to date')
    expect(() => { Parse.object(string) }).to.throw(TypeError, 'test can\'t be parsed to object')
    expect(() => { Parse.object(array) }).to.throw(TypeError, '1,2,3 can\'t be parsed to object')
    expect(() => { Parse.func(string) }).to.throw(TypeError, 'test can\'t be parsed to function')
  })

  it('should ignore fail if option.error === ignore', () => {
    const string = 'test'
    const object = { tmp: 1 }
    const option = { error: 'ignore' }
    const func = () => {}
    expect(Parse.origin(string, option)).to.equal('test')
    expect(Parse.string(string, option)).to.equal('test')
    expect(Parse.string(object, option)).to.equal('{"tmp":1}')
    expect(Parse.number(string, option)).to.equal(0)
    expect(Parse.dateTime(string, option)).to.be.ok
    expect(Parse.boolean(string, option)).to.equal(true)
    expect(Parse.object(string, option)).to.eql({'0': 't', '1': 'e', '2': 's', '3': 't'})
    expect(Parse.array(string, option)).to.eql(['test'])
    expect(Parse.func(func, option)).to.eql(func)
    expect(Parse.func(string, option)()).to.eql('test')
  })
})
