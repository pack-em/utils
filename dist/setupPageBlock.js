'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// @ts-nocheck
var iOS = ['iPad', 'iPhone', 'iPod'].indexOf(navigator.platform) >= 0;
var pageLeaveEventName = iOS ? 'pagehide' : 'beforeunload';

function pageLeaveStop(ev) {
  ev.preventDefault();
  ev.returnValue = ''; // eslint-disable-line no-param-reassign
  return true;
}

window.__BlockPageStates = {
  released: 'released',
  blocked: 'blocked'
};
window.__blockedPage = null;
function pageChangeStop() {
  if (window.__blockedPage) {
    if (window.__blockedPage.state === window.__BlockPageStates.blocked) {
      window.history.pushState(null, null, window.__blockedPage.url);
      if (window.__blockedPage.onBack) window.__blockedPage.onBack();
    } else if (window.__blockedPage.state === window.__BlockPageStates.released) {
      window.__blockedPage = null;
      setTimeout(function () {
        window.history.go(-1);
      }, 0);
    }
  }
}
window.addEventListener('popstate', pageChangeStop, true);

/**
 * @param {boolean} active - Blocked when active is true
 * @param {{avoidBack: boolean, onBack: ()=>{}}} options - If avoidBack is in true intercepts browser's back navigation, pass a callback for onBack() to execute.
 */
var setupPageBlock = function setupPageBlock(active) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$avoidBack = _ref.avoidBack,
      avoidBack = _ref$avoidBack === undefined ? true : _ref$avoidBack,
      onBack = _ref.onBack;

  if (active) {
    // blocking page leave/refresh event
    window['on' + pageLeaveEventName] = pageLeaveStop;
    // blocking page change event
    if (avoidBack && (!window.__blockedPage || window.__blockedPage.state === window.__BlockPageStates.released)) {
      var pageUrl = document.location.pathname;
      if (!window.__blockedPage) {
        window.history.pushState(null, null, pageUrl);
      } else {
        window.history.replaceState(null, null, pageUrl);
      }
      window.__blockedPage = { state: window.__BlockPageStates.blocked, url: pageUrl, onBack: onBack };
    }
  } else if (!active) {
    window['on' + pageLeaveEventName] = null;

    if (window.__blockedPage && window.__blockedPage.state === window.__BlockPageStates.blocked) {
      window.__blockedPage = { state: window.__BlockPageStates.released };
    }
  }
};

exports.default = setupPageBlock;