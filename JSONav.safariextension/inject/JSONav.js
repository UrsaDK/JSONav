/**
 * Injected scripts are loaded each time an extension-accessible webpage is
 * loaded, so you should keep them lightweight. If your script requires large
 * blocks of code or data, you should move them to the global HTML page.
 *
 * Scripts are injected into the top-level page and any children with HTML
 * sources, such as iframes. Do not assume that there is only one instance of
 * your script per browser tab.
 *
 * https://developer.apple.com/library/content/documentation/Tools/Conceptual/SafariExtensionGuide/InjectingScripts/InjectingScripts.html
 */

(function(self, $, undefined) {

    var object = null,
        config = {
            message: {
                listener: 'extension-content',
                dispatch: 'document-content'
            }
        };

    self.init = function () {
        var content = document.body.textContent;

        if (content && expectedContent() && setJsonObject(content)) {
            safari.self.addEventListener('message', messageListener, false);
            safari.self.tab.dispatchMessage(config.message.dispatch, object);
        }
    };

    function messageListener(event) {
        if (event.name === config.message.listener) {
            updateDocument(event.message);
        }
    }

    function updateDocument(documentString) {
        document.write(documentString);
    }

    function expectedContent() {
        if (document.location.protocol.match(/^(file|http|https):$/) &&
            (document.contentType.match(/.*\/(.*\+)?json$/) ||
                document.location.pathname.match(/.*\.json$/))) {

            return true;
        }
        return false;
    }

    function setJsonObject(string) {
        try {
            object = JSON.parse(string);
        } catch (e) {
            return false;
        }

        return true;
    }

}( this.JSONav = this.JSONav || {} ));

// Run only in the top most window
if ((typeof safari !== 'undefined') && (window === window.top)) {
    JSONav.init();
}
