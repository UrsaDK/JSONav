/**
 * This script is loaded only when Safari first loads Global.html for this
 * extension. It's used to .....
 */

(function (object, $, undefined) {

    object.init = function (jsonObject) {
        console.log(jsonObject);
    };

}( this.JSONav = this.JSONav || {} ));
