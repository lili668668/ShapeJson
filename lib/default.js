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