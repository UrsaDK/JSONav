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

  constructor(inject = {}) {
    if (typeof inject !== 'object') {
      throw `Unsupported constructor object of type ${typeof inject}`
    }

    this._config = inject.config || new Map()
    .set('message.listenerId', 'extension-content')
    .set('message.dispatchId', 'document-content')
    .set('valid.protocols', new Set(['file:', 'http:', 'https:']));

    this._safari = inject.safari || window.safari
    this._document = inject.document || window.document;

    const content = this.document.body.textContent;
    if (content && this.isExpectedContent() && this.setNavObject(content)) {
      this.safari.self.addEventListener('message', e => this.messageListener(e), false);
      this.safari.self.tab.dispatchMessage(this.config.get('message.dispatchId'), this.navObject);
    }
  }

  get config() {
    return this._config;
  }

  get safari() {
    return this._safari;
  }

  get document() {
    return this._document;
  }

  messageListener(event) {
    if (event.name === this.config.get('message.listenerId')) {
      this.updateDocument(event.message);
    }
  }

  updateDocument(documentString) {
    this.document.write(documentString);
  }

  isExpectedContent() {
    return this.isValidProtocol() && (this.isValidContentType() || this.isValidPathname());
  }

  isValidProtocol() {
    return this.config.get('valid.protocols').has(this.document.location.protocol);
  }

  isValidContentType() {
    return this.document.contentType.endsWith('json');
  }

  isValidPathname() {
    return this.document.location.pathname.endsWith('.json');
  }

  setNavObject(string) {
    try {
      this.navObject = JSON.parse(string);
    } catch (e) {
      return false;
    }

    return true;
  }
}

// Run only in the top most window
if ((typeof safari !== 'undefined') && (window === window.top)) {
  window.onload = new JSONav();
}
