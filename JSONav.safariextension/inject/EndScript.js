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

// Run only in the top most window
if (window === window.top) {

    (function(object, undefined) {

        var jsonObject = null,
            config = {
                message: {
                    listener: 'extension-json-view',
                    dispatch: 'document-json-content'
                }
            };

        object.init = function () {
            var content = document.body.textContent;

            if (content && setJsonObject(content)) {
                safari.self.addEventListener('message', messageListener, false);
                safari.self.tab.dispatchMessage(config.message.dispatch, jsonObject);
            }
        };

        function messageListener(event) {
            if (event.name === config.message.listener) {
                updateDocument(event.message);
            }
        }

        function updateDocument(documentString) {
            document.open('text/html', 'replace');
            document.write(documentString);
            document.close();
        }

        function setJsonObject(string) {
            if (!(document.contentType.match(/.*\/(.*\+)?json$/) ||
                document.location.pathname.match(/.*\.json$/) ||
                document.location.protocol.match(/^https?:$/))) {
                return false;
            }

            try {
                jsonObject = JSON.parse(string);
            } catch (e) {
                return false;
            }

            return true;
        }

    }( this.EndScript = this.EndScript || {} ));

    // Initialise EndScript object
    EndScript.init();
}
