"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function toTitleCase(str) {
  return str.replace(/\w{2,}/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

exports.default = toTitleCase;