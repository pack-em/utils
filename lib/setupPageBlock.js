// @ts-nocheck
const iOS = ['iPad', 'iPhone', 'iPod'].indexOf(navigator.platform) >= 0
const pageLeaveEventName = iOS ? 'pagehide' : 'beforeunload'

function pageLeaveStop(ev) {
  ev.preventDefault()
  ev.returnValue = '' // eslint-disable-line no-param-reassign
  return true
}

window.__BlockPageStates = {
  released: 'released',
  blocked:  'blocked',
}
window.__blockedPage = null
function pageChangeStop() {
  if (window.__blockedPage) {
    if (window.__blockedPage.state === window.__BlockPageStates.blocked) {
      window.history.pushState(null, null, window.__blockedPage.url)
      if(window.__blockedPage.onBack) window.__blockedPage.onBack()
    } else if (window.__blockedPage.state === window.__BlockPageStates.released) {
      window.__blockedPage = null
      setTimeout(() => {
        window.history.go(-1)
      }, 0)
    }
  }
}
window.addEventListener('popstate', pageChangeStop, true)

const setupPageBlock = (active, {avoidBack = true, onBack} = {}) => {
  if (active) {
    // blocking page leave/refresh event
    window[`on${pageLeaveEventName}`] = pageLeaveStop
    // blocking page change event
    if (avoidBack && (!window.__blockedPage || window.__blockedPage.state === window.__BlockPageStates.released)) {
      const pageUrl = document.location.pathname
      if (!window.__blockedPage) {
        window.history.pushState(null, null, pageUrl)
      } else {
        window.history.replaceState(null, null, pageUrl)
      }
      window.__blockedPage = { state: window.__BlockPageStates.blocked, url: pageUrl,  onBack}

    }
  } else
  if (!active) {
    window[`on${pageLeaveEventName}`] = null

    if (window.__blockedPage && window.__blockedPage.state === window.__BlockPageStates.blocked) {
      window.__blockedPage = { state: window.__BlockPageStates.released }
    }
  }
}

export default setupPageBlock;
