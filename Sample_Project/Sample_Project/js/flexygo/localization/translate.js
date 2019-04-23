/**
* Library for the flexygo.localization.
*
* @class flexygo.localization
*/
var flexygo;
(function (flexygo) {
    var localization;
    (function (localization) {
        /**
            * Translates java script strings to profile default language.
            * If no translation is found it will display fall back language en-gb
            * @method translate
            * @param {string} key - language variable string.
            * @return {string} - returns translated string
        */
        function translate(key) {
            var text = null;
            try {
                text = key.split('.').reduce((object, index) => object ? object[index] : null, flexygo.culture[flexygo.profiles.langKey.toLowerCase()]);
            }
            catch (ex) { }
            if (text == null) {
                try {
                    text = key.split('.').reduce((object, index) => object ? object[index] : null, flexygo.culture.engb);
                }
                catch (ex) { }
            }
            if (text == null) {
                text = key;
            }
            return text;
        }
        localization.translate = translate;
        /**
              * Initializes date plugin moment.locale with correct language.
              * @method init
              */
        function init() {
            if (navigator && navigator.language) {
                moment.locale(navigator.language);
            }
            else {
                moment.locale('es');
            }
        }
        localization.init = init;
    })(localization = flexygo.localization || (flexygo.localization = {}));
})(flexygo || (flexygo = {}));
//# sourceMappingURL=translate.js.map