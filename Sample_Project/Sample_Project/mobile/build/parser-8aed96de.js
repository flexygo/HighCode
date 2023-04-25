import './webapi-79a1d3db.js';
import { u as util, h as gps, k as msg } from './conftoken-7e3c18eb.js';
import { j as jquery } from './jquery-5df58adb.js';

var parser;
(function (parser) {
    var culture = 'es-es';
    async function recursiveCompile(json, template, conf, contextFunctions, lastTemplate, AddTimeZone = false) {
        let reg = /{{([^{}]+)}}/g;
        let hasMoreMatches = template.match(reg);
        culture = conf.user.currentUserCultureId;
        let retString = template;
        if (json) {
            retString = await parser.compile(json, retString, conf.resources, contextFunctions, AddTimeZone);
        }
        ;
        if (conf && conf.user) {
            retString = await parser.compile(conf.user, retString, conf.resources, contextFunctions, AddTimeZone);
        }
        ;
        if ((!lastTemplate || retString != lastTemplate) && hasMoreMatches != null) {
            retString = await parser.recursiveCompile(json, retString, conf, contextFunctions, retString, AddTimeZone);
        }
        return retString;
    }
    parser.recursiveCompile = recursiveCompile;
    async function compile(json, template, files, contextFunctions, AddTimeZone = false) {
        let reg = /{{([^{}]+)}}/g;
        let matches = template.match(reg);
        let retString = template;
        let defDateFormat = 'LL';
        if (matches != null) {
            json = lowerKeys(json);
            let contextVars = lowerKeys(this);
            for (let i = 0; i < matches.length; i++) {
                var skipReplace = false;
                let marker = matches[i];
                let rValue = '';
                let isFunction = false;
                if (marker.indexOf('(') != -1) {
                    try {
                        let fFunc = marker.substring(2, marker.length - 2).trim();
                        let fName = fFunc.substring(0, fFunc.indexOf('(')).trim();
                        if (contextFunctions && typeof contextFunctions[fName] === 'function' || typeof execDynamicCode.call(this, fName) === 'function') {
                            isFunction = true;
                        }
                    }
                    catch (e) {
                    }
                }
                if (isFunction) {
                    //Es una funcion javascript.
                    let fFunc = marker.substring(2, marker.length - 2).trim();
                    let fName = fFunc.substring(0, fFunc.indexOf('(')).trim();
                    let fParams = this.splitParams(fFunc.substring(fFunc.indexOf('(') + 1, fFunc.lastIndexOf(')')).trim());
                    for (let j = 0; j < fParams.length; j++) {
                        let jKey = fParams[j].toLowerCase().trim();
                        if ((jKey.startsWith("'") && jKey.endsWith("'")) || (jKey.startsWith('"') && jKey.endsWith('"'))) {
                            fParams[j] = jKey.slice(1, -1);
                        }
                        else if (jKey.startsWith("[") && jKey.endsWith("]")) {
                            fParams[j] = eval(jKey);
                        }
                        else if ((json && (typeof json[jKey] != 'undefined')) || (contextVars && (typeof contextVars[jKey] != 'undefined') && (contextVars[jKey] != null)) || jKey === 'json' || jKey === 'template' || jKey === 'contextfunctions') {
                            let value;
                            if (json && (typeof json[jKey] != 'undefined')) {
                                value = parser.getValue(json[jKey]);
                            }
                            else if (jKey === 'json') {
                                value = json;
                            }
                            else if (jKey === 'template') {
                                value = template;
                            }
                            else if (jKey === 'contextfunctions') {
                                value = contextFunctions;
                            }
                            else {
                                value = contextVars[jKey];
                            }
                            fParams[j] = value;
                        }
                    }
                    try {
                        if (contextFunctions && typeof contextFunctions[fName] != 'undefined') {
                            rValue = contextFunctions[fName].apply(contextFunctions, fParams);
                        }
                        else {
                            let found = false;
                            let fClass = fName.split('.');
                            switch (fClass.length) {
                                case 1:
                                    found = true;
                                    rValue = window[fClass[0]](...fParams);
                                    break;
                                case 2:
                                    found = true;
                                    rValue = window[fClass[0]][fClass[1]](...fParams);
                                    break;
                                case 3:
                                    found = true;
                                    rValue = window[fClass[0]][fClass[1]][fClass[2]](...fParams);
                                    break;
                                case 4:
                                    found = true;
                                    rValue = window[fClass[0]][fClass[1]][fClass[2]][fClass[3]](...fParams);
                                    break;
                                case 5:
                                    found = true;
                                    rValue = window[fClass[0]][fClass[1]][fClass[2]][fClass[3]][fClass[4]](...fParams);
                                    break;
                                case 6:
                                    found = true;
                                    rValue = window[fClass[0]][fClass[1]][fClass[2]][fClass[3]][fClass[4]][fClass[5]](...fParams);
                                    break;
                            }
                            if (!found) {
                                rValue = execDynamicCode.call(this, fName).apply(null, fParams);
                            }
                        }
                        if (rValue instanceof Promise) {
                            rValue = await Promise.resolve(rValue);
                        }
                    }
                    catch (ex) {
                        rValue = ex.message;
                    }
                }
                else if (marker.indexOf('|') != -1) {
                    //Lleva algún tipo de formato.
                    let auxMarker = marker.substring(2, marker.length - 2).trim();
                    let jKeyUp = auxMarker.split('|')[0];
                    let propFormat = auxMarker.split('|')[1];
                    let jKey = jKeyUp.toLowerCase();
                    if (propFormat.toLowerCase() == 'file') {
                        let found = false;
                        for (let i = 0; i < files.length; i++) {
                            if (files[i].FileName.toLowerCase() == jKeyUp.toLowerCase()) {
                                found = true;
                                rValue = 'data:' + files[i].MimeType + ';base64,' + files[i].B64;
                                break;
                            }
                        }
                        if (!found) {
                            rValue = jKeyUp;
                        }
                    }
                    else {
                        if ((json && typeof json[jKey] != 'undefined') || (contextVars && typeof contextVars[jKey] != 'undefined') || (contextFunctions && typeof contextFunctions[jKeyUp] != 'undefined') || (jKey == 'currentdatetime') || (jKey == 'currentdate') || (jKey == 'currenttime') || (jKey == 'currenttime') || (jKey == 'newguid')) {
                            if (jKey == 'currentdatetime' || jKey == 'currentdate' || jKey == 'currenttime') {
                                rValue = moment().toDate();
                            }
                            else if (jKey == 'newguid') {
                                rValue = util.GUID();
                            }
                            else if (json && typeof json[jKey] != 'undefined') {
                                rValue = parser.getValue(json[jKey], 'Value');
                            }
                            else if (contextVars && typeof contextVars[jKey] != 'undefined') {
                                rValue = contextVars[jKey];
                            }
                            else if (contextFunctions && typeof contextFunctions[jKeyUp] != 'undefined') {
                                rValue = contextFunctions[jKeyUp];
                            }
                            let typeF = propFormat.toLowerCase();
                            let strFormat = '';
                            if (typeF.indexOf(':') != -1) {
                                typeF = propFormat.substring(propFormat.indexOf(':'), 0).toLowerCase();
                                strFormat = propFormat.substring(propFormat.indexOf(':') + 1);
                            }
                            if (typeF == 'date') {
                                /*{{datevalue|date:LLL}*/
                                if (strFormat == '') {
                                    strFormat = defDateFormat;
                                }
                                if (strFormat == 'W') {
                                    if (AddTimeZone) {
                                        rValue = moment(rValue).locale(culture).format();
                                    }
                                    else {
                                        rValue = moment.utc(rValue).locale(culture).format();
                                    }
                                }
                                else {
                                    if (rValue && rValue != '' && moment.utc(rValue).isValid()) {
                                        if (AddTimeZone) {
                                            rValue = moment(rValue).locale(culture).format(strFormat);
                                        }
                                        else {
                                            rValue = moment.utc(rValue).locale(culture).format(strFormat);
                                        }
                                    }
                                    else {
                                        rValue = '';
                                    }
                                }
                            }
                            else if (typeF == 'fromnow') { /*{{datevalue|fromnow:LLL}*/
                                if (rValue && rValue != '' && moment.utc(rValue).isValid()) {
                                    if (AddTimeZone) {
                                        rValue = moment(rValue).locale(culture).fromNow();
                                    }
                                    else {
                                        rValue = moment(moment.utc(rValue).format().split('+')[0]).locale(culture).fromNow();
                                    }
                                }
                            }
                            else if (typeF == 'tonow') { /*{{datevalue|tonow:LLL}*/
                                if (rValue && rValue != '' && moment.utc(rValue).isValid()) {
                                    if (AddTimeZone) {
                                        rValue = moment(rValue).locale(culture).toNow();
                                    }
                                    else {
                                        rValue = moment(moment.utc(rValue).format().split('+')[0]).locale(culture).toNow();
                                    }
                                }
                            }
                            else if (typeF == 'decimal') { /*{{value|decimal:3}*/
                                if (rValue && rValue != '' && jquery.isNumeric(rValue)) {
                                    if (strFormat && strFormat != '') {
                                        if (culture == 'es-ES') {
                                            rValue = parseFloat(parseFloat(rValue).toFixed(strFormat)).toLocaleString('ca-ES', { minimumFractionDigits: strFormat });
                                        }
                                        else {
                                            rValue = parseFloat(parseFloat(rValue).toFixed(strFormat)).toLocaleString(culture, { minimumFractionDigits: strFormat });
                                        }
                                    }
                                    else {
                                        if (culture == 'es-ES') {
                                            rValue = parseFloat(rValue).toLocaleString('ca-ES');
                                        }
                                        else {
                                            rValue = parseFloat(rValue).toLocaleString(culture);
                                        }
                                    }
                                }
                            }
                            else if (typeF == 'switch') { /*{{value|switch:[true:icon-check,false:icon-noncheck,null:icon-cancel,else:]}*/
                                let found = false;
                                if (rValue == null) {
                                    rValue = 'null';
                                }
                                //Convert expresion into object
                                let valuesTemp = strFormat.toString().trim();
                                valuesTemp = valuesTemp.substring(1, valuesTemp.length - 1);
                                valuesTemp = valuesTemp.split(',');
                                let values = new Object();
                                for (let z = 0; z < valuesTemp.length; z++) {
                                    let arrKey = valuesTemp[z].split(':')[0].toString().trim();
                                    let arrValue = valuesTemp[z].split(':')[1].toString().trim();
                                    values[arrKey] = arrValue;
                                }
                                for (let switchvalue in values) {
                                    if (switchvalue.toLowerCase() == rValue.toString().toLowerCase()) {
                                        rValue = values[switchvalue];
                                        found = true;
                                        break;
                                    }
                                }
                                if (!found && typeof values['else'] != 'undefined') {
                                    rValue = values['else'];
                                    if (rValue == 'null') {
                                        rValue = '';
                                    }
                                }
                            }
                            else if (typeF == 'string') { /*{{str|string:lower}*/ /*{{str|string:upper}*/ /*{{str|string:255}*/
                                if (rValue && rValue != '') {
                                    if (strFormat.toLowerCase() == 'lower') {
                                        rValue = rValue.toLowerCase();
                                    }
                                    else if (strFormat.toLowerCase() == 'upper') {
                                        rValue = rValue.toUpperCase();
                                    }
                                    else if (jquery.isNumeric(strFormat) && (rValue.length > parseFloat(strFormat))) {
                                        rValue = rValue.substring(0, parseFloat(strFormat)) + '...';
                                    }
                                    rValue = parser.replaceAll(rValue, '\n', '<br>');
                                }
                                else {
                                    rValue = '';
                                }
                            }
                            else if (typeF == 'isnull') { /*{{str|isnull:value}*/
                                let arrFormat = strFormat.split(',');
                                if (rValue == null || rValue === '' || rValue == 'null') {
                                    rValue = arrFormat[0];
                                }
                                else if (arrFormat.length > 1) {
                                    rValue = strFormat.substring(strFormat.indexOf(',') + 1);
                                }
                            }
                            else if (typeF == 'bool') { /*{{value|bool:'true value','false 0 empty or null value'}*/
                                let arrFormat = strFormat.split(',');
                                if (typeof rValue == 'undefined' || rValue == null || !rValue || rValue == '' || rValue == '0' || rValue.toString().toLowerCase() == 'false' || rValue.toString().toLowerCase() == 'null') {
                                    if (arrFormat.length > 1) {
                                        rValue = arrFormat[1];
                                    }
                                    else {
                                        rValue = '';
                                    }
                                }
                                else {
                                    rValue = arrFormat[0];
                                }
                            }
                            else if (typeF == 'value') {
                                if (rValue == null) {
                                    rValue = '';
                                }
                            }
                            else if (typeF == 'html' || typeF == 'htmlattr') {
                                rValue = escapeHtmlString(rValue, typeF == 'htmlattr');
                            }
                            else if (typeF == 'js') {
                                rValue = escapeJsString(rValue);
                            }
                            else if (typeF == 'sql') {
                                rValue = escapeSqltring(rValue);
                            }
                        }
                        else {
                            skipReplace = true;
                        }
                    }
                }
                else {
                    //Es un marcador simple.
                    let jKeyUp = marker.substring(2, marker.length - 2).trim();
                    let jKey = jKeyUp.toLowerCase();
                    if ((json && typeof json[jKey.toLowerCase()] != 'undefined') || (contextVars && typeof contextVars[jKey.toLowerCase()] != 'undefined') || (contextFunctions && typeof contextFunctions[jKeyUp] != 'undefined') || (jKey == 'currentdatetime') || (jKey == 'currentdate') || (jKey == 'currentlocation') || (jKey == 'currentaltitude') || (jKey == 'currentlongitude') || (jKey == 'currentlatitude') || (jKey == 'currenttime') || (jKey == 'newguid')) {
                        if (jKey == 'currentdatetime') {
                            rValue = util.currentDateTime();
                        }
                        else if (jKey == 'currentdate') {
                            rValue = util.currentDate();
                        }
                        else if (jKey == 'currenttime') {
                            rValue = util.currentTime();
                        }
                        else if (jKey == 'newguid') {
                            rValue = util.GUID();
                        }
                        else if (jKey == 'currentlocation') {
                            try {
                                let pos = await gps.getCoords();
                                rValue = pos.coords.latitude + ', ' + pos.coords.longitude;
                            }
                            catch (err) {
                                msg.showError(util.translate('exceptions.gpsConnection'));
                            }
                        }
                        else if (jKey == 'currentaltitude') {
                            let pos = await gps.getCoords();
                            rValue = pos.coords.altitude;
                        }
                        else if (jKey == 'currentlongitude') {
                            let pos = await gps.getCoords();
                            rValue = pos.coords.longitude;
                        }
                        else if (jKey == 'currentlatitude') {
                            let pos = await gps.getCoords();
                            rValue = pos.coords.latitude;
                        }
                        else if (json && typeof json[jKey] != 'undefined' && json[jKey] != null) {
                            rValue = parser.getValue(json[jKey]);
                        }
                        else if (contextVars && typeof contextVars[jKey] != 'undefined') {
                            rValue = contextVars[jKey];
                        }
                        else if (contextFunctions && typeof contextFunctions[jKeyUp] != 'undefined') {
                            rValue = contextFunctions[jKeyUp];
                        }
                    }
                    else {
                        skipReplace = true;
                    }
                    if (typeof rValue == 'string' && rValue.indexOf('/Date') != -1) {
                        rValue = moment(rValue).locale(culture).format(defDateFormat);
                    }
                    else if (typeof rValue == 'object' && rValue != null && rValue.Hours) {
                        rValue = moment(rValue).utc().format('LTS');
                    }
                    if (rValue == null) {
                        rValue = '';
                    }
                }
                if (!skipReplace) {
                    retString = parser.replaceAll(retString, marker, rValue);
                }
            }
        }
        return retString;
    }
    parser.compile = compile;
    function findTemplate(obj, typeId, pageName) {
        if (obj) {
            for (let i = 0; i < obj.pages.length; i++) {
                if (pageName) {
                    if (obj.pages[i].pageName.toLowerCase() == pageName.toLowerCase()) {
                        if (!obj.pages[i].SQLSentence) {
                            obj.pages[i].SQLSentence = 'select * from ' + obj.tableName + ' where `' + obj.tableName + '`.`_isDeleted`=0';
                        }
                        return obj.pages[i];
                    }
                }
                else {
                    if (obj.pages[i].typeId.toLowerCase() == typeId.toLowerCase() && obj.pages[i].isDefault == true) {
                        if (!obj.pages[i].SQLSentence) {
                            obj.pages[i].SQLSentence = 'select * from ' + obj.tableName + ' where `' + obj.tableName + '`.`_isDeleted`=0';
                        }
                        return obj.pages[i];
                    }
                }
            }
        }
        return null;
    }
    parser.findTemplate = findTemplate;
    function getValue(val, prop) {
        if (val == null) {
            return null;
        }
        let type = typeof val;
        type = type.toLocaleLowerCase();
        if (type == 'object') {
            if (prop) {
                return val[prop];
            }
            else {
                return val.Text;
            }
        }
        else {
            return val;
        }
    }
    parser.getValue = getValue;
    function replaceAll(str, find, replace) {
        if (!str || find == replace) {
            return str;
        }
        const escapeRegExp = (string) => {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        };
        return str.toString().replace(new RegExp(escapeRegExp(find), 'ig'), replace);
    }
    parser.replaceAll = replaceAll;
    function formatDate(value) {
        return value;
    }
    parser.formatDate = formatDate;
    function formatNumber(value) {
        return value;
    }
    parser.formatNumber = formatNumber;
    function formatDecimal(value) {
        return value;
    }
    parser.formatDecimal = formatDecimal;
    /**
    * Returns an escaped JS string
    * @method escapeJsString
    * @param {string} str - String
*/
    function escapeJsString(str) {
        if (str) {
            str = replaceAll(str, '\\', '\\\\');
            str = replaceAll(str, '\'', '\\\'');
            str = replaceAll(str, "\"", '&quot;');
        }
        return str;
    }
    parser.escapeJsString = escapeJsString;
    /**
 * Returns an escaped SQL string
 * @method escapeSqlString
 * @param {string} str - String
 */
    function escapeSqltring(str) {
        if (str) {
            str = replaceAll(str, "'", "''");
        }
        return str;
    }
    parser.escapeSqltring = escapeSqltring;
    function splitParams(pStr) {
        let params = [];
        let newParam = '';
        let arrOpened = false;
        for (let i = 0; i < pStr.length; i++) {
            if (pStr[i] == ',' && !arrOpened) {
                params.push(newParam);
                newParam = '';
            }
            else {
                if (pStr[i] == '[') {
                    arrOpened = true;
                }
                if (pStr[i] == ']') {
                    arrOpened = false;
                }
                newParam += pStr[i];
            }
        }
        if (newParam) {
            params.push(newParam);
        }
        return params;
    }
    parser.splitParams = splitParams;
    /**
    * Returns an escapep HTML string
    * @method escapeHtmlString
    * @param {string} str - String
    * @param {boolean} attr - Determine if the line breaks are substituted
    */
    function escapeHtmlString(str, attr) {
        if (str) {
            str = replaceAll(str, '&', '&amp;');
            str = replaceAll(str, '<', '&lt;');
            str = replaceAll(str, '>', '&gt;');
            str = replaceAll(str, '"', '&quot');
            str = replaceAll(str, "'", '&#39;');
            str = replaceAll(str, ',', '&#44;');
            str = replaceAll(str, ':', '&#58;');
            str = replaceAll(str, '|', '&#124;');
            if (attr) {
                str = replaceAll(str, '\\', '\\\\');
                str = replaceAll(str, '\n', '');
                str = replaceAll(str, '\r', '');
                str = replaceAll(str, '&#39;', '\\\'');
            }
        }
        return str;
    }
    parser.escapeHtmlString = escapeHtmlString;
    /**
    * Transform object keys into lower case.
    * @param {object} obj - Object to transform.
    * @param {string} [recursive=false] - Set recursive mode on/off.
    * @method lowerKeys
    * @return {object} transformed object.
    */
    function lowerKeys(obj, recursive = false) {
        if (obj) {
            var key, keys = Object.keys(obj);
            var n = keys.length;
            var newobj = {};
            for (var i = 0; i < n; i++) {
                key = keys[i];
                if (recursive && (typeof obj[key] === "object") && (obj[key] !== null) && (key.toLowerCase() !== 'objectdefaults')) {
                    newobj[key.toLowerCase()] = lowerKeys(obj[key], recursive);
                }
                else {
                    newobj[key.toLowerCase()] = obj[key];
                }
            }
            return newobj;
        }
        else {
            return null;
        }
    }
    parser.lowerKeys = lowerKeys;
    /**
    * Evaluates JavaScript code and executes it.
    * @param {string} dynamicCode - Dynamic Code.
    * @method execDynamicCode
    * @return {any}
    */
    function execDynamicCode(dynamicCode) {
        return eval(dynamicCode);
        /*jQuery.globalEval*/
    }
    parser.execDynamicCode = execDynamicCode;
    /**
        * Sorts an object's array by specified properties.
        * @param {object} obj - Object to order.
        * @param {string} property - Order property
        * @param {string} [property2] - Second order property
        * @method sortObject
        * @return {any[]} Ordered object.
        */
    function sortObject(obj, property, property2) {
        var sortable = [];
        var key;
        for (key in obj) {
            sortable.push(obj[key]);
        }
        sortable.sort(function (a, b) {
            var o1 = a[property];
            var o2 = b[property];
            if (o1 < o2)
                return -1;
            if (o1 > o2)
                return 1;
            if (property2) {
                var p1 = a[property2];
                var p2 = b[property2];
                if (p1 < p2)
                    return -1;
                if (p1 > p2)
                    return 1;
            }
            return 0;
        });
        return sortable;
    }
    parser.sortObject = sortObject;
})(parser || (parser = {}));

export { parser as p };
