/**
 * This script is loaded only when Safari first loads Global.html for this
 * extension. It's used to .....
 */

(function (object, $, undefined) {

    var config = {
        rawId:    'raw',
        navId:    'nav',
        tabstops: 4,
        theme:    'default',
        target:   '_top',
    };

    object.init = function (jsonObject) {
        var rawDOM = document.getElementById(config.rawId),
            navDOM = document.getElementById(config.navId);

        // Populate JSON into an element
        rawDOM.innerHTML = JSON.stringify(jsonObject, null, config.tabstops);

        // Add highlights and linkify
        hljs.highlightBlock(rawDOM);
        linkifyElement(rawDOM, { target: { url: config.target } });
    };

}( this.JSONav = this.JSONav || {} ));
