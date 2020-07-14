/**
 * @namespace flexygo.utils.parser
 */
declare namespace flexygo.utils.parser {
    function recursiveCompile(json: any, template: string, contextFunctions?: any, lastTemplate?: string, AddTimeZone?: boolean): string;
    function compile(json: any, template: string, contextFunctions?: any, AddTimeZone?: boolean): string;
    function compileTemplate(tmp: any, dataTbl: any, ctx: any): string;
    function paintGroupHeader(item: any, groups: any, ctx: any): string;
    function paintGroupFooter(item: any, groups: any, ctx: any): string;
    function controlGroup(prev: any, item: any, groups: any, ctx: any): string;
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
    /**
    * Returns an escapep HTML string
    * @method escapeHtmlString
    * @param {string} str - String
    */
    function escapeHtmlString(str: string): string;
}
