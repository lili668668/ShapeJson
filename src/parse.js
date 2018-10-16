export function origin (value) {
  return value
}

export function string (value) {
  if (typeof value === 'object') return JSON.stringify(value)
  return `${value}`
}

export function number (value, option = {}) {
  const parsed = parseInt(value, 10)
  if (isNaN(parsed)) {
    if (option.error === 'ignore') return 0
    throw new TypeError(`${value} can't be parsed to number`)
  }
  return parsed
}

export function dateTime (value, option = {}) {
  const parsed = Date.parse(value)
  if (isNaN(parsed)) {
    if (option.error === 'ignore') return new Date()
    throw new TypeError(`${value} can't be parsed to date`)
  }
  return parsed
}

export function boolean (value) {
  return Boolean(value)
}

export function object (value, option = {}) {
  if ((typeof value === 'object' && !Array.isArray(value)) || option.error === 'ignore') return Object.assign({}, value)
  throw new TypeError(`${value} can't be parsed to object`)
}

export function array (value) {
  return [].concat(value)
}

export function func (value, option = {}) {
  if (typeof value === 'function') return value
  if (option.error === 'ignore') return () => { return value }
  throw new TypeError(`${value} can't be parsed to function`)
}
