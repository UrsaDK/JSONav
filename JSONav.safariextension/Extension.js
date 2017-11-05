/**
* This script is loaded only when Safari first loads Extension.html for this
* extension. It's used to set event listeners and other core tasks.
*/

'use strict';

class Extension {

  constructor(inject = {}) {
    if (typeof inject !== 'object') {
      throw `Unsupported inject value -- ${typeof inject}`
    }

    this._config = inject.config || new Map()
      .set('message.listenerId', 'document-content')
      .set('message.dispatchId', 'extension-content')
      .set('document.themeId', 'highlight-theme')
      .set('document.rawId', 'raw')
      .set('document.navId', 'nav');

    this._settings = inject.settings || new Map()
      .set('indent', 4)
      .set('theme', 'xcode')
      .set('target', '_top');

    this._safari = inject.safari || window.safari
    this._document = inject.document || window.document;

    this.safari.application.addEventListener('message', e => this.messageListener(e), false);
    this.safari.extension.settings.addEventListener('change', e => this.updateSetting(e), false);
  };

  get config() {
    return this._config;
  }

  get settings() {
    return this._settings;
  }

  get safari() {
    return this._safari;
  }

  get document() {
    if (this._cache === undefined) {
      this._cache = this._document.cloneNode(true);
      this._cache.getElementsByTagName("title")[0].remove();
      Array.from(this._cache.scripts).forEach((script) => {
        script.parentNode.removeChild(script);
      });
      Array.from(this._cache.getElementsByTagName('link')).forEach((style) => {
        if (style.href.length != 0) { style.href = style.href; }
      });
    }
    return this._cache;
  }

  messageListener(event) {
    if (event.name === this.config.get('message.listenerId')) {
      const result = this.updateDocument(event.message);
      event.target.page.dispatchMessage(this.config.get('message.dispatchId'), result);
      delete this._cache;
    }
  }

  updateSetting(event) {
    const value = Number(event.newValue) || String(event.newValue)
    this.settings.set(event.key, value);
  }

  updateDocument(navObject) {
    this.updateRawView(navObject);
    this.updateNavView(navObject);
    return new XMLSerializer().serializeToString(this.document);
  }

  updateRawView(navObject) {
    const element = this.document.getElementById(this.config.get('document.rawId'));
    element.innerHTML = JSON.stringify(navObject, null, this.settings.get('indent'));
    this.highlight(element);
    this.linkify(element);
  }

  updateNavView(navObject) {
    const element = this.document.getElementById(this.config.get('document.navId'));
  }

  highlight(element) {
    const style = this.document.getElementById(this.config.get('document.themeId'));
    style.href = `${this.safari.extension.baseURI}vendor/highlight.js/styles/${this.settings.get('theme')}.css`
    hljs.highlightBlock(element);
  }

  linkify(element) {
    linkifyElement(element, { target: { url: this.settings.get('target') }});
  }
}

if ((typeof safari !== 'undefined') && (typeof safari.application !== 'undefined')) {
  window.onload = new Extension();
}
