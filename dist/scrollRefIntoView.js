'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var scrollRefIntoView = function scrollRefIntoView(ref) {
  return ref.current && ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

exports.default = scrollRefIntoView;