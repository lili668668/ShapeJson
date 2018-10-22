(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Shape = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.origin = origin;
exports.string = string;
exports.number = number;
exports.dateTime = dateTime;
exports.boolean = boolean;
exports.object = object;
exports.array = array;
exports.func = func;
function origin() {
  return undefined;
}

function string() {
  return '';
}

function number() {
  return 0;
}

function dateTime() {
  return new Date();
}

function boolean() {
  return false;
}

function object() {
  return {};
}

function array() {
  return [];
}

function func() {
  return function () {};
}

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.type = exports.shape = undefined;

var _shape = require('./shape');

Object.defineProperty(exports, 'shape', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_shape).default;
  }
});

var _type2 = require('./type');

var _type = _interopRequireWildcard(_type2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.type = _type;

},{"./shape":4,"./type":5}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.origin = origin;
exports.string = string;
exports.number = number;
exports.dateTime = dateTime;
exports.boolean = boolean;
exports.object = object;
exports.array = array;
exports.func = func;
function origin(value) {
  return value;
}

function string(value) {
  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') return JSON.stringify(value);
  return '' + value;
}

function number(value) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var parsed = parseInt(value, 10);
  if (isNaN(parsed)) {
    if (option.error === 'ignore') return 0;
    throw new TypeError(value + ' can\'t be parsed to number');
  }
  return parsed;
}

function dateTime(value) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var parsed = Date.parse(value);
  if (isNaN(parsed)) {
    if (option.error === 'ignore') return new Date();
    throw new TypeError(value + ' can\'t be parsed to date');
  }
  return parsed;
}

function boolean(value) {
  return Boolean(value);
}

function object(value) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && !Array.isArray(value) || option.error === 'ignore') return Object.assign({}, value);
  throw new TypeError(value + ' can\'t be parsed to object');
}

function array(value) {
  return [].concat(value);
}

function func(value) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (typeof value === 'function') return value;
  if (option.error === 'ignore') return function () {
    return value;
  };
  throw new TypeError(value + ' can\'t be parsed to function');
}

},{}],4:[function(require,module,exports){
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

},{"./default":1,"./parse":3,"./type":5}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var origin = exports.origin = 'origin';
var string = exports.string = 'string';
var number = exports.number = 'number';
var dateTime = exports.dateTime = 'dateTime';
var boolean = exports.boolean = 'boolean';
var object = exports.object = 'object';
var array = exports.array = 'array';
var func = exports.func = 'func';

},{}]},{},[2])(2)
});
