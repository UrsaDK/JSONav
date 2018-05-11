'use strict';

class Mock {
  static safari() {
    return {
      application: {
        addEventListener: jasmine.createSpy('safari.application.addEventListener'),
      },

      extension: {
        settings: {
          addEventListener: jasmine.createSpy('safari.extension.settings.addEventListener'),
        },
        baseURI: '/base/JSONav.safariextension/',
      },

      self: {
        addEventListener: jasmine.createSpy('safari.self.addEventListener'),
        tab: {
          dispatchMessage: jasmine.createSpy('safari.self.tab.dispatchMessage'),
        },
      },
    };
  }

  static event(config) {
    return Object.assign(config, {
      target: {
        page: {
          dispatchMessage: jasmine.createSpy('event.target.page.dispatchMessage')
        },
      },
    });
  }

  static document(fixture, contentType = null) {
    const defaultContentTypes = {
      txt:  'text/plain',
      html: 'text/html',
      json: 'application/json',
    };

    const parser = new DOMParser();
    const mock = parser.parseFromString(fixture.textContent, 'text/html');

    Object.defineProperty(mock, 'contentType', {
      value: contentType || defaultContentTypes[fixture.uri.extension],
    });
    ['documentURI', 'URL'].forEach((property) => {
      Object.defineProperty(mock, property, {
        value: fixture.uri.href,
      });
    });

    return new Proxy(mock, {
      get: (target, property) => {
        if (property === 'location') {
          return {
            protocol: fixture.uri.protocol,
            host: fixture.uri.host,
            hostname: fixture.uri.hostname,
            port: fixture.uri.port,
            origin: fixture.uri.origin,
            pathname: fixture.uri.pathname,
            search: fixture.uri.search,
            hash: fixture.uri.hash,
            href: fixture.uri.href,
          };
        }
        else if (['write', 'cloneNode'].includes(property)) {
          return (...args) => eval(`target.${property}(args)`);
        } else {
          return target[property];
        }
      }
    });
  }
}
