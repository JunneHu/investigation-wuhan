
function isFullscreenEnabled() {
  return document.fullscreenEnabled
  || document.mozFullScreenEnabled
  || document.webkitFullscreenEnabled
  || document.msFullscreenEnabled
  || false;
}

function isFullscreen() {
  const fullEle = document.fullscreenElement
  || document.msFullscreenElement
  || document.mozFullScreenElement
  || document.webkitFullscreenElement;

  if (isFullscreenEnabled() && fullEle) {
    return !!fullEle;
  }

  const explorer = window.navigator.userAgent.toLowerCase();
  if (explorer.indexOf('chrome') > 0) { // webkit
    return document.body.scrollHeight === window.screen.height
      && document.body.scrollWidth === window.screen.width;
  }

  // IE 9+  fireFox
  return window.outerHeight === window.screen.height
    && window.outerWidth === window.screen.width;
}


export {
  isFullscreen
};
