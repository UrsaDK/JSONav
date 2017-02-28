/**
 * This script is loaded only when Safari first loads Global.html for this
 * extension. It's used to .....
 */

(function (self, $, undefined) {

    var document,
        config = {
            rawId: 'raw',
            navId: 'nav',
            cssId: 'highlight-theme',
            indent: 4,
            theme: 'default',
            target: '_top',
        };

    self.init = function (jsonObject, userSettings, documentClone) {
        self.updateConfig(userSettings);
        document = documentClone;
        updateRawView(jsonObject);
        updateNavView(jsonObject);
    };

    self.updateConfig = function (newConfig) {
        Object.assign(config, newConfig);
    };

    function updateRawView(jsonObject) {
        var element = document.getElementById(config.rawId);
        element.innerHTML = JSON.stringify(jsonObject, null, config.indent);
        highlight(element);
        linkify(element);
    }

    function updateNavView(jsonObject) {
        var element = document.getElementById(config.navId);

    }

    function highlight(element) {
        hljs.highlightBlock(element);
        document.getElementById(config.cssId).href =
            './vendor/highlight.js/styles/' + config.theme + '.css'
    }

    function linkify(element) {
        linkifyElement(element, { target: { url: config.target } });
    }

}( this.JSONav = this.JSONav || {} ));
