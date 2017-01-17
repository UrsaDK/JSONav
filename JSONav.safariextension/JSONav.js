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
    };

    object.init = function (jsonObject) {
        console.log(jsonObject);

        var rawDOM = document.getElementById(config.rawId),
            navDOM = document.getElementById(config.navId);

        rawDOM.innerHTML = JSON.stringify(jsonObject, null, config.tabstops);

        hljs.highlightBlock(rawDOM);
    };

}( this.JSONav = this.JSONav || {} ));
