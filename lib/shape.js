'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (object, schema) {
  var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var shapedObject = {};
  var objectKeys = Object.keys(object);
  var schemaKeys = Object.keys(schema);
  if (option.otherProperties === 'keep') {
    objectKeys.forEach(function (key) {
      if (!schemaKeys.includes(key)) shapedObject[key] = object[key];
    });
  }
  schemaKeys.forEach(function (key) {
    var to = schema[key].to || key;
    var type = schema[key].type || Type.origin;
    var isExist = objectKeys.includes(key);
    var isDuplicate = Object.keys(shapedObject).includes(to);
    if (!isExist && option.notFoundProperties === 'ignore') return;
    if (!isExist && option.notFoundProperties === 'show-error') throw new Error('No property named ' + key);
    if (!isExist && option.notFoundProperties === 'give-default') {
      if (typeof schema[key].customDefault === 'function') {
        shapedObject[to] = schema[key].customDefault();
        return;
      }
      shapedObject[to] = Default[type]();
      return;
    }
    if (!isExist) {
      shapedObject[to] = undefined;
      return;
    }
    if (option.keyDuplicate === 'keep-origin' && isDuplicate) return;
    if (option.keyDuplicate === 'show-error' && isDuplicate) throw new Error('Key "' + to + '" is duplicate');
    if (typeof schema[key].customParse === 'function') {
      shapedObject[to] = schema[key].customParse(object[key], option);
      return;
    }
    shapedObject[to] = Parse[type](object[key], option);
  });
  return shapedObject;
};

var _type = require('./type');

var Type = _interopRequireWildcard(_type);

var _parse = require('./parse');

var Parse = _interopRequireWildcard(_parse);

var _default = require('./default');

var Default = _interopRequireWildcard(_default);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = exports['default'];