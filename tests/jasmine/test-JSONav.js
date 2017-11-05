'use strict';

define(['JSONav'], () => {
  describe('JSONav', () => {
    let fixture;
    let jsonav;

    beforeAll(() => {
      jasmine.addMatchers(Matchers);
    });

    describe('with invalid constructor argument', () => {
      it('should throw an exception', () => {
        jsonav = () => { new JSONav('string'); }
        expect(jsonav).toThrow();
      });
    });

    describe('with unsupported document', () => {
      beforeEach(() => {
        fixture = new Fixture('simple.html');
        jsonav = new JSONav({
          safari: Mock.safari(),
          document: Mock.document(fixture)
        });
      });

      it('should have a valid config', () => {
        expect(jsonav.config).toBeMapWithKeys([
          'message.listenerId',
          'message.dispatchId',
          'valid.protocols'
        ]);
      });

      it('should support valid protocols', () => {
        expect(jsonav.config.get('valid.protocols')).toBeSetWithValues([
          'file:',
          'http:',
          'https:'
        ]);
      });

      it('should not setup extension listener', () => {
        expect(jsonav.safari.self.addEventListener).not.toHaveBeenCalled();
      });

      it('should not execute document dispatcher', () => {
        expect(jsonav.safari.self.tab.dispatchMessage).not.toHaveBeenCalled();
      });

      it('should update the document given a string', () => {
        const string = 'JSONav.updateDocument(): test-body';
        jsonav.updateDocument(string);
        expect(jsonav.document.body.innerHTML).toBe(string);
      });

      it('should ignore not listened-to events', () => {
        const event = {
          name: `not-${jsonav.config.get('message.listenerId')}`,
          message: 'JSONav.messageListener(): test-event-message',
        };
        jsonav.messageListener(event);
        expect(jsonav.document.body.innerHTML).not.toBe(event.message);
      });

      it('should update the document from a listened-to event', () => {
        const event = {
          name: jsonav.config.get('message.listenerId'),
          message: 'JSONav.messageListener(): test-event-message',
        };
        jsonav.messageListener(event);
        expect(jsonav.document.body.innerHTML).toBe(event.message);
      });
    });

    describe('with valid JSON', () => {
      describe('served from *.json as application/json,', () => {
        beforeAll(() => {
          fixture = new Fixture('valid.json');
        });

        beforeEach(() => {
          jsonav = new JSONav({
            safari: Mock.safari(),
            document: Mock.document(fixture, 'application/json')
          });
        });

        it('should setup extension listener', () => {
          expect(jsonav.safari.self.addEventListener).toHaveBeenCalled();
        });

        it('should execute document dispatcher', () => {
          expect(jsonav.safari.self.tab.dispatchMessage).toHaveBeenCalled();
        });
      });

      describe('served from *.json as text/plain,', () => {
        beforeAll(() => {
          fixture = new Fixture('valid.json');
        });

        beforeEach(() => {
          jsonav = new JSONav({
            safari: Mock.safari(),
            document: Mock.document(fixture, 'text/plain')
          });
        });

        it('should setup extension listener', () => {
          expect(jsonav.safari.self.addEventListener).toHaveBeenCalled();
        });

        it('should execute document dispatcher', () => {
          expect(jsonav.safari.self.tab.dispatchMessage).toHaveBeenCalled();
        });
      });

      describe('served from *.txt as application/json,', () => {
        beforeAll(() => {
          fixture = new Fixture('valid.json');
          fixture.uri = fixture.uri.href.slice(0, -4) + 'txt'
        });

        beforeEach(() => {
          jsonav = new JSONav({
            safari: Mock.safari(),
            document: Mock.document(fixture, 'application/json')
          });
        });

        it('should setup extension listener', () => {
          expect(jsonav.safari.self.addEventListener).toHaveBeenCalled();
        });

        it('should execute document dispatcher', () => {
          expect(jsonav.safari.self.tab.dispatchMessage).toHaveBeenCalled();
        });
      });

      describe('served from *.txt as text/plain,', () => {
        beforeAll(() => {
          fixture = new Fixture('valid.json');
          fixture.uri = fixture.uri.href.slice(0, -4) + 'txt'
        });

        beforeEach(() => {
          jsonav = new JSONav({
            safari: Mock.safari(),
            document: Mock.document(fixture, 'text/plain')
          });
        });

        it('should setup extension listener', () => {
          expect(jsonav.safari.self.addEventListener).not.toHaveBeenCalled();
        });

        it('should execute document dispatcher', () => {
          expect(jsonav.safari.self.tab.dispatchMessage).not.toHaveBeenCalled();
        });
      });
    });

    describe('with invalid JSON', () => {
      describe('served from *.json as application/json,', () => {
        beforeAll(() => {
          fixture = new Fixture('invalid.json');
        });

        beforeEach(() => {
          jsonav = new JSONav({
            safari: Mock.safari(),
            document: Mock.document(fixture, 'application/json')
          });
        });

        it('should setup extension listener', () => {
          expect(jsonav.safari.self.addEventListener).not.toHaveBeenCalled();
        });

        it('should execute document dispatcher', () => {
          expect(jsonav.safari.self.tab.dispatchMessage).not.toHaveBeenCalled();
        });
      });

      describe('served from *.json as text/plain,', () => {
        beforeAll(() => {
          fixture = new Fixture('invalid.json');
        });

        beforeEach(() => {
          jsonav = new JSONav({
            safari: Mock.safari(),
            document: Mock.document(fixture, 'text/plain')
          });
        });

        it('should setup extension listener', () => {
          expect(jsonav.safari.self.addEventListener).not.toHaveBeenCalled();
        });

        it('should execute document dispatcher', () => {
          expect(jsonav.safari.self.tab.dispatchMessage).not.toHaveBeenCalled();
        });
      });

      describe('served from *.txt as application/json,', () => {
        beforeAll(() => {
          fixture = new Fixture('invalid.json');
          fixture.uri = fixture.uri.href.slice(0, -4) + 'txt'
        });

        beforeEach(() => {
          jsonav = new JSONav({
            safari: Mock.safari(),
            document: Mock.document(fixture, 'application/json')
          });
        });

        it('should setup extension listener', () => {
          expect(jsonav.safari.self.addEventListener).not.toHaveBeenCalled();
        });

        it('should execute document dispatcher', () => {
          expect(jsonav.safari.self.tab.dispatchMessage).not.toHaveBeenCalled();
        });
      });

      describe('served from *.txt as text/plain,', () => {
        beforeAll(() => {
          fixture = new Fixture('invalid.json');
          fixture.uri = fixture.uri.href.slice(0, -4) + 'txt'
        });

        beforeEach(() => {
          jsonav = new JSONav({
            safari: Mock.safari(),
            document: Mock.document(fixture, 'text/plain')
          });
        });

        it('should setup extension listener', () => {
          expect(jsonav.safari.self.addEventListener).not.toHaveBeenCalled();
        });

        it('should execute document dispatcher', () => {
          expect(jsonav.safari.self.tab.dispatchMessage).not.toHaveBeenCalled();
        });
      });
    });
  });
});
