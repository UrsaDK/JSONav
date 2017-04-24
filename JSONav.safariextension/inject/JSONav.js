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

'use strict';

class JSONav {

    const config = new Map()
        .add('message.listenerId', 'extension-content')
        .add('message.dispatchId', 'document-content')
        .add('valid.protocols', Set(['file:', 'http:', 'https:']));

    let navObject = null;

    constructor() {
        const content = document.body.textContent;

        if (content && isExpectedContent() && setNavObject(content)) {
            safari.self.addEventListener('message', messageListener, false);
            safari.self.tab.dispatchMessage(config.get('message.dispatchId'), navObject);
        }
    }

    messageListener(event) {
        if (event.name === config.get('message.listenerId')) {
            updateDocument(event.message);
        }
    }

    updateDocument(documentString) {
        document.write(documentString);
    }

    isExpectedContent() {
        return isValidProtocol() && (isValidContentType() || isValidPathname());
    }

    isValidProtocol() {
        return config.get('valid.protocols').has(document.location.protocol);
    }

    isValidContentType() {
        return document.contentType.endsWith('json');
    }

    isValidPathname() {
        return document.location.pathname.endsWith('.json');
    }

    setNavObject(string) {
        try {
            navObject = JSON.parse(string);
        } catch (e) {
            return false;
        }

        return true;
    }
}

// Run only in the top most window
if ((typeof safari !== 'undefined') && (window === window.top)) {
    new JSONav();
}
