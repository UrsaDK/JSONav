/**
 * This script is loaded only when Safari first loads Global.html for this
 * extension. It's used to set event listeners and other core tasks.
 */

(function (self, $, undefined) {

    var config = {
        message: {
            listener: 'document-content',
            dispatch: 'extension-content'
        },
    };

    self.init = function () {
        document.write("<base href='" + safari.extension.baseURI + "'>");
        document.addEventListener("DOMContentLoaded", function(event) {
            safari.application.addEventListener('message', messageListener, false);
            safari.extension.settings.addEventListener('change', updateConfig, false);
        });
    };

    function messageListener(event) {
        if (event.name === config.message.listener) {
            var result = updateDocument(event.message);
            event.target.page.dispatchMessage(config.message.dispatch, result);
        }
    }

    function userSettings() {
        return {
            indent: Number(safari.extension.settings.indent) || String(safari.extension.settings.indent),
            theme: String(safari.extension.settings.theme),
            target: String(safari.extension.settings.target)
        };
    }

    function updateConfig() {
        JSONav.updateConfig(userSettings());
    }

    function updateDocument(jsonObject) {
        var clone = document.cloneNode(true);
        clone.title = '';
        clone.scripts.namedItem('global-js').remove();
        JSONav.init(jsonObject, userSettings(), clone);
        return new XMLSerializer().serializeToString(clone);
    }

}( this.Global = this.Global || {} ));

if (typeof safari !== 'undefined') {
    Global.init();
}
