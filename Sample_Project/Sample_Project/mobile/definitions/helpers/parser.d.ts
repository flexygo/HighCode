declare namespace flexygo.parser {
    function recursiveCompile(json: any, template: string, conf: ConfToken, contextFunctions?: any, lastTemplate?: string, AddTimeZone?: boolean): Promise<string>;
    function compile(json: any, template: string, files: Array<fileResource>, contextFunctions?: any, AddTimeZone?: boolean): Promise<string>;
    function findTemplate(obj: ObjectConfig, typeId: string, pageName: string): PageConfig;
    function getValue(val: any, prop?: any): any;
    function replaceAll(str: any, find: any, replace: any): any;
    function formatDate(value: any): any;
    function formatNumber(value: any): any;
    function formatDecimal(value: any): any;
    /**
    * Returns an escaped JS string
    * @method escapeJsString
    * @param {string} str - String
*/
    function escapeJsString(str: string): string;
    /**
 * Returns an escaped SQL string
 * @method escapeSqlString
 * @param {string} str - String
 */
    function escapeSqltring(str: string): string;
    function splitParams(pStr: any): any[];
    /**
    * Returns an escapep HTML string
    * @method escapeHtmlString
    * @param {string} str - String
    * @param {boolean} attr - Determine if the line breaks are substituted
    */
    function escapeHtmlString(str: string, attr: boolean): string;
    /**
    * Transform object keys into lower case.
    * @param {object} obj - Object to transform.
    * @param {string} [recursive=false] - Set recursive mode on/off.
    * @method lowerKeys
    * @return {object} transformed object.
    */
    function lowerKeys(obj: any, recursive?: boolean): object;
    /**
    * Evaluates JavaScript code and executes it.
    * @param {string} dynamicCode - Dynamic Code.
    * @method execDynamicCode
    * @return {any}
    */
    function execDynamicCode(dynamicCode: string): any;
    /**
        * Sorts an object's array by specified properties.
        * @param {object} obj - Object to order.
        * @param {string} property - Order property
        * @param {string} [property2] - Second order property
        * @method sortObject
        * @return {any[]} Ordered object.
        */
    function sortObject(obj: any, property: string, property2?: string): any[];
}
