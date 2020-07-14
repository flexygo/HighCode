/**
 * @namespace flexygo.string
 */
var flexygo;
(function (flexygo) {
    var string;
    (function (string) {
        /**
        * Converts the value of objects to strings based on the formats specified and inserts them into another string.
        * @method format
        * @param {string} Main string to format.
        * @param {string[]} Items to include in main string .
        * @return {string} formated sting.
        */
        function format(...strings) {
            var str = arguments[0];
            for (var i = 0; i < arguments.length - 1; i++) {
                var reg = new RegExp("\\{" + i + "\\}", "gm");
                str = str.replace(reg, arguments[i + 1]);
            }
            return str;
        }
        string.format = format;
        /**
        * Determines whether the end of this string instance matches the specified string.
        * @method format
        * @param str {string} The main string to compare.
        * @param suffix {string} The suffix to compare to the main string at the end of this instance.
        * @return {boolean} true if value matches the end of this instance; otherwise, false.
        */
        function endsWith(str, suffix) {
            return (str.substr(str.length - suffix.length) === suffix);
        }
        string.endsWith = endsWith;
        /**
        * Determines whether the beginning of this string instance matches the specified string.
        * @method format
        * @param str {string} The main string to compare.
        * @param prefix {string} The prefix to compare to the main string at the beginning of this instance.
        * @return {boolean} true if value matches the beginning of this instance; otherwise, false.
        */
        function startsWith(str, prefix) {
            return (str.substr(0, prefix.length) === prefix);
        }
        string.startsWith = startsWith;
        /**
        * Escape HTML special chars to pain an HTML code like a usual text.
        * @method escapeHTML
        * @param str {string} HTML text code.
        * @return {boolean} Escaped text.
        */
        function escapeHTML(str) {
            var entityMap = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;',
                '/': '&#x2F;',
                '`': '&#x60;',
                '=': '&#x3D;'
            };
            return str.replace(/[&<>"'`=\/]/g, function (s) {
                return entityMap[s];
            });
        }
        string.escapeHTML = escapeHTML;
        /**
        * Remove HTML tags from a string to get only text value.
        * @method HTMLtoText
        * @param str {string} HTML text code.
        * @return {string} Inner text.
        */
        function HTMLtoText(value) {
            let text = $('<div></div>').html(value).text();
            return text;
        }
        string.HTMLtoText = HTMLtoText;
    })(string = flexygo.string || (flexygo.string = {}));
})(flexygo || (flexygo = {}));
//# sourceMappingURL=string.js.map