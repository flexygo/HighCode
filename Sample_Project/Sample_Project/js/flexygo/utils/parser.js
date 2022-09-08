/**
 * @namespace flexygo.utils.parser
 */
var flexygo;
(function (flexygo) {
    var utils;
    (function (utils) {
        var parser;
        (function (parser) {
            function recursiveCompile(json, template, contextFunctions, lastTemplate, AddTimeZone = false) {
                let reg = /{{([^{}]+)}}/g;
                let hasMoreMatches = template.match(reg);
                let retString = flexygo.utils.parser.compile(json, template, contextFunctions, AddTimeZone);
                if ((!lastTemplate || retString != lastTemplate) && hasMoreMatches != null) {
                    retString = flexygo.utils.parser.recursiveCompile(json, retString, contextFunctions, retString, AddTimeZone);
                }
                return retString;
            }
            parser.recursiveCompile = recursiveCompile;
            function compile(json, template, contextFunctions, AddTimeZone = false) {
                let reg = /{{([^{}]+)}}/g;
                let matches = template.match(reg);
                let retString = template;
                let defDateFormat = 'LL';
                if (matches != null) {
                    json = flexygo.utils.lowerKeys(json);
                    let contextVars = flexygo.utils.lowerKeys(flexygo.context);
                    for (let i = 0; i < matches.length; i++) {
                        var skipReplace = false;
                        let marker = matches[i];
                        let rValue = '';
                        let isFunction = false;
                        if (marker.indexOf('(') != -1) {
                            try {
                                let fFunc = marker.substring(2, marker.length - 2).trim();
                                let fName = fFunc.substring(0, fFunc.indexOf('(')).trim();
                                if (contextFunctions && typeof contextFunctions[fName] === 'function' || typeof flexygo.utils.execDynamicCode.call(this, fName) === 'function') {
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
                            let fParams = fFunc.substring(fFunc.indexOf('(') + 1, fFunc.lastIndexOf(')')).trim().split(',');
                            for (let j = 0; j < fParams.length; j++) {
                                let jKey = fParams[j].toLowerCase().trim();
                                if ((jKey.startsWith("'") && jKey.endsWith("'")) || (jKey.startsWith('"') && jKey.endsWith('"'))) {
                                    fParams[j] = jKey.slice(1, -1);
                                }
                                else if ((json && (typeof json[jKey] != 'undefined') && (json[jKey] != null)) || (contextVars && (typeof contextVars[jKey] != 'undefined') && (contextVars[jKey] != null)) || jKey === 'json' || jKey === 'template' || jKey === 'contextfunctions' || jKey === 'this') {
                                    let value;
                                    if (json && (typeof json[jKey] != 'undefined') && (json[jKey] != null)) {
                                        value = flexygo.utils.parser.getValue(json[jKey]);
                                    }
                                    else if (jKey === 'json') {
                                        value = json;
                                    }
                                    else if (jKey === 'template') {
                                        value = template;
                                    }
                                    else if (jKey === 'contextfunctions' || jKey === 'this') {
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
                                    rValue = flexygo.utils.execDynamicCode.call(this, fName).apply(null, fParams);
                                }
                            }
                            catch (ex) {
                                rValue = ex.message;
                            }
                        }
                        else if (marker.indexOf('|') != -1) {
                            //Lleva algún tipo de formato.
                            let auxMarker = marker.substring(2, marker.length - 2).trim();
                            let jKey;
                            let jKeyUp;
                            let propFormat;
                            if (auxMarker.toLowerCase().startsWith("flxpath") && auxMarker.split('|').length >= 3) {
                                jKeyUp = auxMarker.split('|').slice(0, 3).join('|').trim();
                                propFormat = auxMarker.split('|').slice(3).join('|').trim();
                            }
                            else {
                                jKeyUp = auxMarker.split('|')[0].trim();
                                propFormat = auxMarker.split('|')[1].trim();
                            }
                            jKey = jKeyUp.toLowerCase();
                            if ((json && typeof json[jKey] != 'undefined') || (contextVars && typeof contextVars[jKey] != 'undefined') || (contextFunctions && typeof contextFunctions[jKeyUp] != 'undefined') || (jKey == 'currentdatetime') || (jKey == 'currentdate')) {
                                if (jKey == 'currentdatetime') {
                                    rValue = moment().format('YYYYMMDD HHmmss');
                                }
                                else if (jKey == 'currentdate') {
                                    rValue = moment().format('YYYYMMDD');
                                }
                                else if (json && typeof json[jKey] != 'undefined') {
                                    rValue = flexygo.utils.parser.getValue(json[jKey], 'Value');
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
                                    typeF = propFormat.substring(propFormat.indexOf(':'), 0).toLowerCase().trim();
                                    strFormat = propFormat.substring(propFormat.indexOf(':') + 1).trim();
                                }
                                if (typeF == 'date') {
                                    if (strFormat == '') {
                                        strFormat = defDateFormat;
                                    }
                                    if (strFormat == 'W') {
                                        if (AddTimeZone) {
                                            rValue = moment(rValue).locale(flexygo.profiles.culture).format();
                                        }
                                        else {
                                            rValue = moment.utc(rValue).locale(flexygo.profiles.culture).format();
                                        }
                                    }
                                    else {
                                        if (rValue && rValue != '' && moment.utc(rValue).isValid()) {
                                            if (AddTimeZone) {
                                                rValue = moment(rValue).locale(flexygo.profiles.culture).format(strFormat);
                                            }
                                            else {
                                                rValue = moment.utc(rValue).locale(flexygo.profiles.culture).format(strFormat);
                                            }
                                        }
                                        else {
                                            rValue = '';
                                        }
                                    }
                                }
                                else if (typeF == 'fromnow') {
                                    if (rValue && rValue != '' && moment.utc(rValue).isValid()) {
                                        if (AddTimeZone) {
                                            rValue = moment(rValue).locale(flexygo.profiles.culture).fromNow();
                                        }
                                        else {
                                            rValue = moment(moment.utc(rValue).format().split('+')[0]).locale(flexygo.profiles.culture).fromNow();
                                        }
                                    }
                                }
                                else if (typeF == 'tonow') {
                                    if (rValue && rValue != '' && moment.utc(rValue).isValid()) {
                                        if (AddTimeZone) {
                                            rValue = moment(rValue).locale(flexygo.profiles.culture).toNow();
                                        }
                                        else {
                                            rValue = moment(moment.utc(rValue).format().split('+')[0]).locale(flexygo.profiles.culture).toNow();
                                        }
                                    }
                                }
                                else if (typeF == 'decimal') {
                                    if (rValue && rValue != '' && $.isNumeric(rValue)) {
                                        if (strFormat && strFormat != '') {
                                            if (flexygo.profiles.culture.toLowerCase() == 'es-es') {
                                                rValue = parseFloat(parseFloat(rValue).toFixed(strFormat)).toLocaleString('ca-ES', { minimumFractionDigits: strFormat });
                                            }
                                            else {
                                                rValue = parseFloat(parseFloat(rValue).toFixed(strFormat)).toLocaleString(flexygo.profiles.culture, { minimumFractionDigits: strFormat });
                                            }
                                        }
                                        else {
                                            if (flexygo.profiles.culture.toLowerCase() == 'es-es') {
                                                rValue = parseFloat(rValue).toLocaleString('ca-ES');
                                            }
                                            else {
                                                rValue = parseFloat(rValue).toLocaleString(flexygo.profiles.culture);
                                            }
                                        }
                                    }
                                }
                                else if (typeF == 'url') {
                                    if (rValue && rValue != '') {
                                        rValue = flexygo.utils.resolveUrl(rValue);
                                    }
                                }
                                else if (typeF == 'switch') {
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
                                else if (typeF == 'string') {
                                    if (rValue && rValue != '') {
                                        rValue = flexygo.string.HTMLtoText(rValue);
                                        if (strFormat.toLowerCase() == 'lower') {
                                            rValue = rValue.toLowerCase();
                                        }
                                        else if (strFormat.toLowerCase() == 'upper') {
                                            rValue = rValue.toUpperCase();
                                        }
                                        else if ($.isNumeric(strFormat) && (rValue.length > parseFloat(strFormat))) {
                                            rValue = rValue.substring(0, parseFloat(strFormat)) + '...';
                                        }
                                        rValue = flexygo.utils.parser.replaceAll(rValue, '\n', '<br>');
                                    }
                                    else {
                                        rValue = '';
                                    }
                                }
                                else if (typeF == 'isnull') {
                                    let arrFormat = strFormat.split(',');
                                    if (rValue == null || rValue === '' || rValue == 'null') {
                                        rValue = arrFormat[0];
                                    }
                                    else if (arrFormat.length > 1) {
                                        rValue = strFormat.substring(strFormat.indexOf(',') + 1);
                                    }
                                }
                                else if (typeF == 'bool') {
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
                                else if (typeF == 'html') {
                                    rValue = escapeHtmlString(rValue);
                                }
                                else if (typeF == 'js') {
                                    rValue = escapeJsString(rValue);
                                }
                                else if (typeF == 'sql') {
                                    rValue = escapeSqltring(rValue);
                                }
                                else if (typeF == 'qr') {
                                    if (strFormat && !isNaN(strFormat) && !isNaN(parseFloat(strFormat))) {
                                        rValue = flexygo.utils.generateQR(rValue, parseFloat(strFormat));
                                    }
                                    else {
                                        rValue = flexygo.utils.generateQR(rValue);
                                    }
                                }
                            }
                            else if (jKey == 'toolbar') {
                                let module = $(contextFunctions).closest('flx-module')[0];
                                if (contextFunctions.TemplateToolbarCollection && contextFunctions.TemplateToolbarCollection[propFormat]) {
                                    rValue = module.getTemplateToolbar(contextFunctions.TemplateToolbarCollection[propFormat].Toolbar, json._objectname, json._objectwhere);
                                }
                            }
                            else {
                                skipReplace = true;
                            }
                        }
                        else {
                            //Es un marcador simple.
                            let jKeyUp = marker.substring(2, marker.length - 2).trim();
                            let jKey = jKeyUp.toLowerCase();
                            if ((json && typeof json[jKey.toLowerCase()] != 'undefined') || (contextVars && typeof contextVars[jKey.toLowerCase()] != 'undefined') || (contextFunctions && typeof contextFunctions[jKeyUp] != 'undefined') || (jKey == 'currentdatetime') || (jKey == 'currentdate')) {
                                if (jKey == 'currentdatetime') {
                                    rValue = moment().format('YYYYMMDD HHmmss');
                                }
                                else if (jKey == 'currentdate') {
                                    rValue = moment().format('YYYYMMDD');
                                }
                                else if (json && typeof json[jKey] != 'undefined' && json[jKey] != null) {
                                    rValue = flexygo.utils.parser.getValue(json[jKey]);
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
                                rValue = moment(rValue).locale(flexygo.profiles.culture).format(defDateFormat);
                            }
                            else if (typeof rValue == 'object' && rValue != null && rValue.Hours) {
                                rValue = moment(rValue).utc().format('LTS');
                            }
                            if (rValue == null) {
                                rValue = '';
                            }
                        }
                        if (!skipReplace) {
                            retString = flexygo.utils.parser.replaceAll(retString, marker, rValue);
                        }
                    }
                }
                return retString;
            }
            parser.compile = compile;
            function compileTemplate(tmp, dataTbl, ctx) {
                let rendered = '';
                if (dataTbl && dataTbl.length > 0) {
                    if (tmp.Header && tmp.Header != '') {
                        dataTbl[0]._objectdefaults = tmp.defaults._objectdefaults;
                        rendered += flexygo.utils.parser.recursiveCompile(dataTbl[0], tmp.Header, ctx);
                    }
                    if (tmp.Body && tmp.Body != '') {
                        let lastItem = null;
                        if (dataTbl.length > 0) {
                            rendered += flexygo.utils.parser.paintGroupHeader(dataTbl[0], tmp.Groups, ctx);
                            for (let i = 0; i < dataTbl.length; i++) {
                                dataTbl[i]._objectdefaults = tmp.defaults._objectdefaults;
                                rendered += flexygo.utils.parser.controlGroup(lastItem, dataTbl[i], tmp.Groups, ctx);
                                rendered += flexygo.utils.parser.recursiveCompile(dataTbl[i], tmp.Body, ctx);
                                lastItem = dataTbl[i];
                            }
                            rendered += flexygo.utils.parser.paintGroupFooter(dataTbl[dataTbl.length - 1], tmp.Groups, ctx);
                        }
                    }
                    if (tmp.Footer && tmp.Footer != '') {
                        dataTbl[0]._objectdefaults = tmp.defaults._objectdefaults;
                        rendered += flexygo.utils.parser.recursiveCompile(dataTbl[0], tmp.Footer, ctx);
                    }
                }
                else {
                    if (tmp.Empty && tmp.Empty != '') {
                        rendered += flexygo.utils.parser.recursiveCompile(tmp.defaults, tmp.Empty, ctx);
                    }
                }
                return rendered;
            }
            parser.compileTemplate = compileTemplate;
            function paintGroupHeader(item, groups, ctx) {
                let str = '';
                let arrGroups = flexygo.utils.sortObject(groups, 'Order');
                for (let i = 0; i < arrGroups.length; i++) {
                    let key = arrGroups[i].GroupField;
                    if (typeof item[key] != 'undefined') {
                        str += flexygo.utils.parser.recursiveCompile(item, arrGroups[i]['Header'], ctx);
                    }
                }
                return str;
            }
            parser.paintGroupHeader = paintGroupHeader;
            function paintGroupFooter(item, groups, ctx) {
                let str = '';
                let arrGroups = flexygo.utils.sortObject(groups, 'Order');
                for (let i = arrGroups.length - 1; i >= 0; i--) {
                    let key = arrGroups[i].GroupField;
                    if (typeof item[key] != 'undefined') {
                        str += flexygo.utils.parser.recursiveCompile(item, arrGroups[i]['Footer'], ctx);
                    }
                }
                return str;
            }
            parser.paintGroupFooter = paintGroupFooter;
            function controlGroup(prev, item, groups, ctx) {
                let str = '';
                let arrGroups = flexygo.utils.sortObject(groups, 'Order');
                let lvl = -1;
                //Finding deep level.
                for (let i = 0; i < arrGroups.length; i++) {
                    let key = arrGroups[i].GroupField;
                    if (typeof item[key] != 'undefined' && prev != null && typeof prev[key] != 'undefined') {
                        if (prev[key] != item[key]) {
                            lvl = i;
                            break;
                        }
                    }
                }
                if (lvl > -1) {
                    //Append footer templates from inside to found deep level.
                    for (let i = arrGroups.length - 1; i >= lvl; i--) {
                        str += flexygo.utils.parser.recursiveCompile(prev, arrGroups[i]['Footer'], ctx);
                    }
                    //Append header templates from deep level to last header.
                    for (let i = lvl; i < arrGroups.length; i++) {
                        str += flexygo.utils.parser.recursiveCompile(item, arrGroups[i]['Header'], ctx);
                    }
                }
                return str;
            }
            parser.controlGroup = controlGroup;
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
                let escapeRegExp = function (str) {
                    let callee = arguments.callee;
                    if (!callee.sRE) {
                        let specials = [
                            '/', '.', '*', '+', '?', '|',
                            '(', ')', '[', ']', '{', '}', '\\'
                        ];
                        callee.sRE = new RegExp('(\\' + specials.join('|\\') + ')', 'gim');
                    }
                    return str.replace(callee.sRE, '\\$1');
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
            /**
            * Returns an escapep HTML string
            * @method escapeHtmlString
            * @param {string} str - String
            */
            function escapeHtmlString(str) {
                if (str) {
                    str = replaceAll(str, '&', '&amp;');
                    str = replaceAll(str, '<', '&lt;');
                    str = replaceAll(str, '>', '&gt;');
                    str = replaceAll(str, '"', '&quot');
                    str = replaceAll(str, "'", '&#39;');
                    str = replaceAll(str, ',', '&#44;');
                    str = replaceAll(str, ':', '&#58;');
                    str = replaceAll(str, '|', '&#124;');
                }
                return str;
            }
            parser.escapeHtmlString = escapeHtmlString;
        })(parser = utils.parser || (utils.parser = {}));
    })(utils = flexygo.utils || (flexygo.utils = {}));
})(flexygo || (flexygo = {}));
//# sourceMappingURL=parser.js.map