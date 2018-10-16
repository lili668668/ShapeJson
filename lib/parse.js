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