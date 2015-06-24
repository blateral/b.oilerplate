/**
 * A little template parser
 * http://mir.aculo.us/2011/03/09/little-helpers-a-tweet-sized-javascript-templating-engine/
 *
 * Usage:
 * var template = require('./modules/Template');
 * template.render("Hello {who}!", { who: "JavaScript" });
 */
module.exports = (function(){
    'use strict';

    function render(s, d) {
        for(var p in d) {
            s=s.replace(new RegExp('{'+p+'}','g'), d[p]);
            return s;
        }
    }

    return {
        render: render
    };

})();
