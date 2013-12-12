/****************************************
    Functions & Helper
/****************************************/
(function() {
    var noop = function noop() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = window.console || {};

    while (length--) {
        // Only stub undefined methods.
        console[methods[length]] = console[methods[length]] || noop;
    }
}());

/**
 * A little template parser
 * http://mir.aculo.us/2011/03/09/little-helpers-a-tweet-sized-javascript-templating-engine/
 * Usage: template("Hello {who}!", { who: "JavaScript" });
 */
function template(s, d) {
    for(var p in d)
       s=s.replace(new RegExp('{'+p+'}','g'), d[p]);
     return s;
}

/****************************************
    jQuery: Dom ready
/****************************************/
$(document).ready(function(){

    // Tell that we have javascript running
    $('html').removeClass('no-js');

});
