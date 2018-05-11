'use strict';

class Fixture {
  constructor(file, base_url = '/base/tests/fixtures') {
    this.uri = `${base_url}/${file}`
    this.textContent = this.fetch(this.uri.href);
  }

  get uri() {
    return this._uri;
  }

  set uri(url) {
    const a = document.createElement('a');
    a.href = url
    this._uri = {
      protocol: a.protocol,
      host: a.host,
      hostname: a.hostname,
      port: a.port,
      origin: a.origin,
      username: a.username,
      password: a.password,
      pathname: a.pathname,
      filename: a.pathname.split('/').pop(),
      extension: a.pathname.split('/').pop().split('.').pop(),
      search: a.search,
      hash: a.hash,
      href: a.href,
    }
  }

  get textContent() {
    return this._content;
  }

  set textContent(content) {
    this._content = content;
  }

  toString() {
    return this.textContent;
  }

  fetch(url) {
    let result;
    jQuery.ajax({
      async: false,
      cache: false,
      dataType: 'text',
      'url': url,
      success: (data, status, $xhr) => {
        result = $xhr.responseText;
      },
      error: ($xhr, status, err) => {
        throw new Error(`Failed to load fixture: ${url} ` +
          `(status: ${status}, message: ${err.message})`);
        }
      });
      return result;
    }
  }
