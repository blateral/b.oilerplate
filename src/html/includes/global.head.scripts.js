/*!
loadCSS: load a CSS file asynchronously.
[c]2014 @scottjehl, Filament Group, Inc.
Licensed MIT
*/
function loadCSS(a,b,c,d){"use strict";var e=window.document.createElement("link"),f=b||window.document.getElementsByTagName("script")[0],g=window.document.styleSheets;return e.rel="stylesheet",e.href=a,e.media="only x",d&&(e.onload=d),f.parentNode.insertBefore(e,f),e.onloadcssdefined=function(a){for(var b,c=0;c<g.length;c++)g[c].href&&g[c].href===e.href&&(b=!0);b?a():setTimeout(function(){e.onloadcssdefined(a)})},e.onloadcssdefined(function(){e.media=c||"all"}),e}
loadCSS('css/main.min.css');