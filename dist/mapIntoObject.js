"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Map into object an array of object elements which have an id property.

var mapIntoObject = function mapIntoObject(arr) {
  return arr.reduce(function (object, element) {
    return object[element.id] = element;
  }, {});
};

exports.default = mapIntoObject;