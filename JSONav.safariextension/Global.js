/**
 * This script is loaded only when Safari first loads Global.html for this
 * extension. It's used to set event listeners and other core tasks.
 */

(function (object, undefined) {

    var config = {
        message: {
            listener: 'document-json-content',
            dispatch: 'extension-json-view'
        },
    };

    var testJson = {
        empty:      null,
        positive:   true,
        negative:   false,
        nil:        0,
        integer:    1,
        neg_int:    -1,
        float:      2.33,
        empty_str:  '',
        string:     'a simple string',
        long_str:   'this is a long string which spans multiple lines \n in fact, the second line is so long that it often gets wrapped by the browser and is used to test line-wrapping capabilities of the formatter',
        url:        'http://www.example.com/path/file.ext?query=true#hash',
        rel_url:    '/path/file.ext?query#hash',
        email:      'user@example.com',
        empty_arr:  [],
        array:      ['one', '2', 3, 4.01],
        empty_hash: {},
        level_1:    {
            item1:      'first item in a folder',
            item2:      'second item in a folder',
            level_2:    {
                item1:      'first item in a sub-folder',
                item2:      'second item in a sub-folder',
                item3:      'this is a long string which spans multiple lines \n in fact, the second line is so long that it often gets wrapped by the browser and is used to test line-wrapping capabilities of the formatter',
            },
        },
    };

    object.init = function () {
        document.write("<base href='" + safari.extension.baseURI + "'>");
        document.addEventListener("DOMContentLoaded", function(event) {
            safari.application.addEventListener('message', messageListener, false);
        });
    };

    object.test = function () {
        document.addEventListener("DOMContentLoaded", function(event) {
            updateDocument(testJson);
        });
    };

    function messageListener(event) {
        if (event.name === config.message.listener) {
            var result = updateDocument(event.message);
            event.target.page.dispatchMessage(config.message.dispatch, result);
        }
    }

    function updateDocument(jsonObject) {
        JSONav.init(jsonObject);
        var newDocument = document.cloneNode(true);
        newDocument.scripts.namedItem('global-js').remove();
        return new XMLSerializer().serializeToString(newDocument);
    }

}( this.Global = this.Global || {} ));

if (typeof safari !== "undefined") {
    Global.init();
} else {
    Global.test();
}
