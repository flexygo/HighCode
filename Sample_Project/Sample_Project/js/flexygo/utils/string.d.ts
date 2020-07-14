/**
 * @namespace flexygo.string
 */
declare namespace flexygo.string {
    /**
    * Converts the value of objects to strings based on the formats specified and inserts them into another string.
    * @method format
    * @param {string} Main string to format.
    * @param {string[]} Items to include in main string .
    * @return {string} formated sting.
    */
    function format(...strings: string[]): string;
    /**
    * Determines whether the end of this string instance matches the specified string.
    * @method format
    * @param str {string} The main string to compare.
    * @param suffix {string} The suffix to compare to the main string at the end of this instance.
    * @return {boolean} true if value matches the end of this instance; otherwise, false.
    */
    function endsWith(str: string, suffix: string): boolean;
    /**
    * Determines whether the beginning of this string instance matches the specified string.
    * @method format
    * @param str {string} The main string to compare.
    * @param prefix {string} The prefix to compare to the main string at the beginning of this instance.
    * @return {boolean} true if value matches the beginning of this instance; otherwise, false.
    */
    function startsWith(str: string, prefix: string): boolean;
    /**
    * Escape HTML special chars to pain an HTML code like a usual text.
    * @method escapeHTML
    * @param str {string} HTML text code.
    * @return {boolean} Escaped text.
    */
    function escapeHTML(str: string): string;
    /**
    * Remove HTML tags from a string to get only text value.
    * @method HTMLtoText
    * @param str {string} HTML text code.
    * @return {string} Inner text.
    */
    function HTMLtoText(value: any): string;
}
