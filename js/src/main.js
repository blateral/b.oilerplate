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

function loadTpl(url) {
    var _data = "";

    $.ajax({
        async: false,
        url: url,
        success: function(data) {
            _data = data;
        }
    });

    return _data;
}

/****************************************
    jQuery: Dom ready
/****************************************/
$(document).ready(function(){
});