"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isInView = function isInView(elementRef) {
  var rect = elementRef.current.getBoundingClientRect();
  return rect.top >= 0 && rect.bottom <= window.innerHeight;
};

exports.default = isInView;