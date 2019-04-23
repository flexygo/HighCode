/**
* Library for the flexygo.localization.
*
* @class flexygo.localization
*/
declare namespace flexygo.localization {
    /**
        * Translates java script strings to profile default language.
        * If no translation is found it will display fall back language en-gb
        * @method translate
        * @param {string} key - language variable string.
        * @return {string} - returns translated string
    */
    function translate(key: string): string;
    /**
          * Initializes date plugin moment.locale with correct language.
          * @method init
          */
    function init(): void;
}
