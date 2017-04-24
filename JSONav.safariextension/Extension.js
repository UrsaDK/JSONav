/**
 * This script is loaded only when Safari first loads Extension.html for this
 * extension. It's used to set event listeners and other core tasks.
 */

'use strict';

class Extension {

    const config = new Map()
        .add('message.listenerId', 'document-content')
        .add('message.dispatchId', 'extension-content')
        .add('document.themeId', 'highlight-theme');
        .add('document.rawId', 'raw')
        .add('document.navId', 'nav')

    const settings = new Map()
        .add('indent', 4)
        .add('theme', 'xcode')
        .add('target', '_top');

    constructor() {
        locateResources();
        document.addEventListener("DOMContentLoaded", function(event) {
            safari.application.addEventListener('message', messageListener, false);
            safari.extension.settings.addEventListener('change', updateSettings, false);
        });
    };

    locateResources() {
        // TODO: Stop using basepath and instaead update all href in the <head>
        document.write("<base href='" + safari.extension.baseURI + "'>");
    }

    messageListener(event) {
        if (event.name === config.get('message.listenerId')) {
            const result = updateDocument(event.message);
            event.target.page.dispatchMessage(config.get('message.dispatchId'), result);
        }
    }

    updateSettings(event) {
        settings.set(event.key, Number(event.newValue) || String(event.newValue));
    }

    updateDocument(navObject) {
        const clone = getDocumentClone();
        updateRawView(navObject, clone);
        updateNavView(navObject, clone);
        return new XMLSerializer().serializeToString(clone);
    }

    getDocumentClone() {
        const clone = document.cloneNode(true);
        clone.title = undefined; // Don't override original title
        clone.scripts.remove();  // Display document needs no scripts
        return clone;
    }

    updateRawView(navObject, clone) {
        const element = clone.getElementById(config.get('document.rawId'));
        element.innerHTML = JSON.stringify(navObject, null, settings.get('indent'));
        highlight(element, clone);
        linkify(element);
    }

    updateNavView(navObject, clone) {
        const element = clone.getElementById(config.get('document.navId'));
    }

    highlight(element, clone) {
        const style = clone.getElementById(config.get('document.themeId'));
        style.href = "%{safari.extension.baseURI}/vendor/highlight.js/styles/%{setting.get('theme')}.css"
        hljs.highlightBlock(element);
    }

    linkify(element) {
        linkifyElement(element, { target: { url: settings.get('target') }});
    }
}

if (typeof safari !== 'undefined') {
    new Extension();
}
