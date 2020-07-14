/**
* Library to manage selection buttons in local storage
*
* @class flexygo.storage.local
*/
declare namespace flexygo.selection {
    function getArray(object: string): Array<any>;
    function setArray(object: string, selArr: Array<any>): boolean;
    function add(object: string, value: any): boolean;
    function appendArray(object: string, selArr: Array<any>): boolean;
    function remove(object: string, value: any): boolean;
    function clear(object: string): void;
    function contains(object: string, value: any): boolean;
    function toggle(object: string, value: any): boolean;
    function getFilterString(object: string): any;
}
/**
* Library to call local storage functions.
*
* @class flexygo.storage.local
*/
declare namespace flexygo.storage.local {
    var _saveTimer: number;
    /**
     * Method to add an element to local Storage.
     * @method add
     * @param {string} key - Element key.
     * @param {string} value - element value.
     */
    function add(key: string, value: any): void;
    /**
 * Method to remove an element from Session Storage.
 * @method remove
 * @param {string} key - Element key.
 * @param {string} value - element value.
 */
    function remove(key: string): void;
    /**
     * Method to get an element from Session Storage.
     * @method get
     * @param {string} key - Element key.
     * @param {string} value - element value.
     * @return {object} - Object from local storage.
     */
    function get(key: string): any;
    /**
     * Method to clear all elements from Session Storage.
     * @method clear
     */
    function clear(): void;
    /**
     * Method to load local Storage from DataBase.
     * @method load
     */
    function load(): void;
    /**
     * Method to save local Storage to DataBase.
     * @method save
     * @param {string} key - The url of the service.
     * @param {string} value - POST or GET.
     * @return {Boolean} - If was saved correctly.
     */
    function save(): void;
}
/**
* Library to call local storage session functions.
*
* @class flexygo.storage.session
* @constructor
*/
declare namespace flexygo.storage.session {
    /**
     * Method to add an element to Session Storage.
     * @method add
     * @param {string} key - Element key.
     * @param {string} value - element value.
     */
    function add(key: string, value: any): void;
    /**
     * Method to remove an element from Session Storage.
     * @method remove
     * @param {string} key - Element key.
     * @param {string} value - element value.
     */
    function remove(key: string): void;
    /**
     * Method to clear Session Storage.
     * @method clear
     */
    function clear(): void;
    /**
     * Method to remove a series of elements from Session Storage.
     * Used on Applicaiton Init.
     * @method reset
     * @param {string} key - Element key.
     * @param {string} value - element value.
     */
    function reset(): void;
    /**
     * Method to get an element from Session Storage.
     * @method get
     * @param {string} key - Element key.
     * @param {string} value - element value.
     * @return {object} - Object from session storage.
     */
    function get(key: string): any;
}
/**
* Library to call local storage cache functions.
*
* @class flexygo.storage.cache
* @constructor
*/
declare namespace flexygo.storage.cache {
    class cacheResponse {
        filters: any;
        response: any;
        expiredDate: any;
    }
    /**
     * Method to add an element to Session Storage.
     * @method add
     * @param {string} key - Element key.
     * @param {string} filters - filters value.
     * @param {string} value - element value.
     */
    function add(key: string, filters: any, value: any, minutesToExpire: number): void;
    /**
     * Method to remove an element from Session Storage.
     * @method remove
     * @param {string} key - Element key.
     * @param {string} filters - filters value.
     */
    function remove(key: string, filters: any): void;
    /**
     * Method to clear Session Storage.
     * @method clear
    * @param {string} key - Element key.
     */
    function clear(key: string): void;
    /**
     * Method to get an element from Session Storage.
     * @method get
     * @param {string} key - Element key.
     * @param {string} filters - filters value.
     */
    function get(key: string, filters: any): cacheResponse;
}
