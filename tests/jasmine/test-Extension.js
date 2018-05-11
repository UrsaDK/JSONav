'use strict';

define(['highlight', 'linkify', 'linkify-element', 'Extension'], () => {
  describe('Extension', () => {
    let globalPage;
    let extension;

    beforeAll(() => {
      jasmine.addMatchers(Matchers);
      globalPage = new Fixture('Extension.html', '/base/JSONav.safariextension');
    });

    describe('loaded in Safari', () => {
      it('should not throw an exception', () => {
        window.safari = Mock.safari();
        extension = () => { new Extension(); }
        expect(extension).not.toThrow();
      });
    });

    describe('with invalid constructor argument', () => {
      it('should throw an exception', () => {
        extension = () => { new Extension('string'); }
        expect(extension).toThrow();
      });
    });

    describe('on its own', () => {
      beforeEach(() => {
        extension = new Extension({
          safari: Mock.safari(),
          document: Mock.document(globalPage)
        });
      });

      it('should have a valid config', () => {
        expect(extension.config).toBeMapWithKeys([
          'message.listenerId',
          'message.dispatchId',
          'document.themeId',
          'document.rawId',
          'document.navId'
        ]);
      });

      it('should have valid settings', () => {
        expect(extension.settings).toBeMapWithKeys([
          'indent',
          'theme',
          'target',
        ]);
      });

      it('should setup message listener', () => {
        expect(extension.safari.application.addEventListener).toHaveBeenCalled();
      });

      it('should setup change listener', () => {
        expect(extension.safari.extension.settings.addEventListener).toHaveBeenCalled();
      });

      it('should return a modified clone of the document', () => {
        expect(extension.document).not.toBe(extension._document);
        expect(extension.document).not.toEqual(extension._document);
      });

      it('should return a modified clone without a title', () => {
        expect(extension.document.title).toBeFalsy();
      });

      it('should return a modified clone without scripts', () => {
        expect(extension.document.scripts.length).toBe(0);
      });

      it('should update the document clone given a valid JSON object', () => {
        const navObject = JSON.parse('{"one": 1, "two": 2, "three": 3}');
        extension.updateDocument(navObject);

        const el = extension.document.getElementById(extension.config.get('document.rawId'));
        const expected = JSON.stringify(navObject, null, extension.settings.get('indent'));
        expect(el.textContent).toBe(expected);
      });

      // TODO: 'should exit grasfully given anything other then a JSON object'

      it('should ignore not listened-to events', () => {
        const event = Mock.event({
          name: `not-${extension.config.get('message.listenerId')}`,
          message: 'message-body',
        });
        extension.messageListener(event);
        expect(event.target.page.dispatchMessage).not.toHaveBeenCalled();
      });
    });

    describe('with a valid JSON object in the message', () => {
      let fixture;
      let event;

      beforeAll(() => {
        fixture = new Fixture('valid.json');
      });

      beforeEach(() => {
        extension = new Extension({
          safari: Mock.safari(),
          document: Mock.document(globalPage)
        });
        event = Mock.event({
          name: extension.config.get('message.listenerId'),
          message: JSON.parse(fixture.textContent),
        });
        extension.messageListener(event);
      });

      it('should dispatch expected message', () => {
        expect(event.target.page.dispatchMessage).toHaveBeenCalled();
      });

      it('should delete internal cache', () => {
        expect(extension._cache).toBeUndefined();
      });
    });

    describe('with a new change event', () => {
      beforeEach(() => {
        extension = new Extension({
          safari: Mock.safari(),
          document: Mock.document(globalPage)
        });
      });

      it('a number should remain to be a Number', () => {
        const newValue = 2;
        const event = Mock.event({
          key: 'indent',
          newValue: newValue,
        });
        extension.updateSetting(event);
        expect(typeof extension.settings.get('indent')).toEqual('number');
        expect(extension.settings.get('indent')).toEqual(newValue);
      });

      it('a string should remain to be a String', () => {
        const newValue = 'new-indent-value'
        const event = Mock.event({
          key: 'indent',
          newValue: newValue,
        });
        extension.updateSetting(event);
        expect(typeof extension.settings.get('indent')).toEqual('string');
        expect(extension.settings.get('indent')).toEqual(newValue);
      });
    });

  });
});
