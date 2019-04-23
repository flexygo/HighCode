/**
 * @namespace flexygo.utils
 */
declare namespace flexygo.utils {
    /**
    * Creates a string function from a param array.
    * @method functionToString
    * @param {string} functionName - The function name.
    * @param {object[]} params - Params with its values.
    * @param {object[]} nonEvaluateParams - Context params with non explicit values.
    */
    function functionToString(functionName: string, params: any, nonEvaluateParams?: any): string;
    function getModule(itm: any): any;
    /**
    * Escape Javascript special chars
    * @method parseJavaString
    * @param {string} value - string to parse.
    * @return {string} parsed string
    */
    function parseJavaString(value: any): any;
    /**
    * Returns a html string with loading style
    * @method loadingMsg
    * @return {string} HTML String
    */
    function loadingMsg(): string;
    /**
    * Transform object keys into lower case.
    * @param {object} obj - Object to transform.
    * @param {string} [recursive=false] - Set recursive mode on/off.
    * @method lowerKeys
    * @return {object} transformed object.
    */
    function lowerKeys(obj: any, recursive?: boolean): object;
    /**
    * Add text to clipboard.
    * @method copyClipboard
    * @param {JQuery} text - text to add to clipboard.
    * @return {boolean} True if works, false if not.
    */
    function copyClipboard(text: string): boolean;
    /**
    * Says if the screen is in mobile mode or note.
    * @method isSizeMobile
    * @return {boolean} True if screen is mobile size, false if not.
    */
    function isSizeMobile(): boolean;
    /**
       * Says if the screen is in smartphone mode.
       * @method isSizeSmartphone
       * @return {boolean} True if screen is smartphone size, false if not.
       */
    function isSizeSmartphone(): boolean;
    /**
    * Says if the agent's navigator comes from a mobile.
    * @method isAgentMobile
    * @return {boolean} True if agent's navigator comes from a mobile, false if not.
    */
    function isAgentMobile(): boolean;
    /**
    * Transform object into key value pairs array.
    * @param {object} data - Object to transform.
    * @method dataToArray
    * @return {object[]} key value pais array.
    */
    function dataToArray(data: object): flexygo.api.GenericKeyValueObject[];
    /**
    * Search index number of an specified item in array.
    * @param {object} arr - Array with all items
    * @param {object[]} itm - Item to find.
    * @method indexOfObject
    * @return {number} Item index if found, -1 if not.
    */
    function indexOfObject(arr: any, itm: any): number;
    /**
    * Sorts an object's array by specified properties.
    * @param {object} obj - Object to order.
    * @param {string} property - Order property
    * @param {string} [property2] - Second order property
    * @method sortObject
    * @return {any[]} Ordered object.
    */
    function sortObject(obj: any, property: string, property2?: string): any[];
    /**
    * Generates an unique ID for this page.
    * @method uniqueId
    * @return {string} unique ID.
    */
    function uniqueId(): string;
    /**
    * Generates an unique tab index for this page.
    * @method uniqueId
    * @return {number} unique tab index.
    */
    function uniqueTabIndex(): number;
    var animationTime: number;
    var testMode: boolean;
    /**
    * Generates an unique name for this page.
    * @method uniqueId
    * @return {string} unique name.
    */
    function uniqueName(): string;
    /**
        * Generates an unique id
        * @method uniqueUUId
        * @return {string} unique name.
        */
    function uniqueUUID(): string;
    /**
    * resolve an url setting the right path.
    * @param {string} url - Url to resolve.
    * @method resolveUrl
    * @return {string} resolved url
    */
    function resolveUrl(url: any): string;
    /**
    * Stop code execution
    * @param {number} milliseconds - number of milliseconds to stop.
    * @method sleep
    */
    function sleep(milliseconds: any): void;
    /**
    * Check if text is base64
    * @param {string} str - text base64.
    * @method isBase64
    */
    function isBase64(str: string): boolean;
    /**
    * says if two objects are parents.
    * @param {string} objectname1 - Object or collection.
    * @param {string} objectname2 - Object or collection two.
    * @method areParents
    * @return {object} true if objects are the same or parents, false if not
    */
    function areParents(objectname1: string, objectname2: string): boolean;
    function onlineCheck(interval: any): void;
    /**
    * Evaluates JavaScript code and executes it.
    * @param {string} dynamicCode - Dynamic Code.
    * @method execDynamicCode
    * @return {any}
    */
    function execDynamicCode(dynamicCode: string): any;
    /**
    * Evaluates if variable has defined value.
    * @param {any} value - Variable to evaluate
    * @method isBlank
    * @return {boolean}
    */
    function isBlank(value: any): boolean;
}
declare namespace flexygo.utils.querystring {
    function getParamValue(url: string, paramName: string): string;
    function setParamValue(url: string, paramName: string, paramValue: string): string;
    function getParamString(url: string): string;
    function getUrlString(url: string): string;
    function getParamObject(url: string): [{
        key: string;
        value: string;
    }];
}
