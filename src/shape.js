import * as Type from './type'
import * as Parse from './parse'
import * as Default from './default'

export default function (object, schema, option = {}) {
  const shapedObject = {}
  const objectKeys = Object.keys(object)
  const schemaKeys = Object.keys(schema)
  if (option.otherProperties === 'keep') {
    objectKeys
      .forEach(key => {
        if (!schemaKeys.includes(key)) shapedObject[key] = object[key]
      })
  }
  schemaKeys
    .forEach(key => {
      const to = schema[key].to || key
      const type = schema[key].type || Type.origin
      const isExist = objectKeys.includes(key)
      if (!isExist && option.notFoundProperties === 'ignore') return
      if (!isExist && option.notFoundProperties === 'show-error') throw new Error(`No property named ${key}`)
      if (!isExist && option.notFoundProperties === 'give-default') {
        if (typeof schema[key].customDefault === 'function') {
          shapedObject[to] = schema[key].customDefault()
          return
        }
        shapedObject[to] = Default[type]()
        return
      }
      if (!isExist) {
        shapedObject[to] = undefined
        return
      }
      const isDuplicate = Object.keys(shapedObject).includes(to)
      if (option.keyDuplicate === 'keep-origin' && isDuplicate) return
      if (option.keyDuplicate === 'show-error' && isDuplicate) throw new Error(`Key "${to}" is duplicate`)
      if (typeof schema[key].customParse === 'function') {
        shapedObject[to] = schema[key].customParse(object[key], option)
        return
      }
      shapedObject[to] = Parse[type](object[key], option)
    })
  return shapedObject
}
