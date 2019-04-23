/**
 * @namespace flexygo.utils
 */
var flexygo;
(function (flexygo) {
    var utils;
    (function (utils) {
        /**
        * Creates a string function from a param array.
        * @method functionToString
        * @param {string} functionName - The function name.
        * @param {object[]} params - Params with its values.
        * @param {object[]} nonEvaluateParams - Context params with non explicit values.
        */
        function functionToString(functionName, params, nonEvaluateParams) {
            var ret = '';
            if (params) {
                for (let i = 0; i < params.length; i++) {
                    if (ret != '') {
                        ret += ',';
                    }
                    let paramValue = params[i];
                    if (typeof paramValue == 'undefined') {
                        paramValue = null;
                    }
                    ret += JSON.stringify(paramValue).replace(/'/g, "\\'").replace(/"/g, "'");
                }
            }
            if (nonEvaluateParams) {
                for (let i = 0; i < nonEvaluateParams.length; i++) {
                    if (ret != '') {
                        ret += ',';
                    }
                    let paramValue = nonEvaluateParams[i];
                    if (typeof paramValue == 'undefined') {
                        paramValue = null;
                    }
                    ret += paramValue;
                }
            }
            return functionName + '(' + ret + ')';
        }
        utils.functionToString = functionToString;
        function getModule(itm) {
            itm = $(itm);
            let module = itm.closest('flx-module');
            if (module.length > 0) {
                return module;
            }
            else if (itm.closest('flx-contextmenu').length > 0 && itm.closest('flx-contextmenu')[0].parent.closest('flx-module').length > 0) {
                return itm.closest('flx-contextmenu')[0].parent.closest('flx-module');
            }
            else {
                return null;
            }
        }
        utils.getModule = getModule;
        /**
        * Escape Javascript special chars
        * @method parseJavaString
        * @param {string} value - string to parse.
        * @return {string} parsed string
        */
        function parseJavaString(value) {
            return value.toString();
        }
        utils.parseJavaString = parseJavaString;
        /**
        * Returns a html string with loading style
        * @method loadingMsg
        * @return {string} HTML String
        */
        function loadingMsg() { return '<div ><button class="btn btn-lg bg-primary"><span class="flx-icon icon-refresh icon-spin"></span> Loading...</button></div>'; }
        utils.loadingMsg = loadingMsg;
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
                    if (recursive && (typeof obj[key] === "object") && (obj[key] !== null)) {
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
        utils.lowerKeys = lowerKeys;
        /**
        * Add text to clipboard.
        * @method copyClipboard
        * @param {JQuery} text - text to add to clipboard.
        * @return {boolean} True if works, false if not.
        */
        function copyClipboard(text) {
            // create hidden text element, if it doesn't already exist
            var origSelectionStart, origSelectionEnd;
            // must use a temporary form element for the selection and copy
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = "_hiddenCopyText_";
            document.body.appendChild(target);
            target.textContent = text;
            // select the content
            var currentFocus = document.activeElement;
            target.focus();
            target.setSelectionRange(0, target.value.length);
            // copy the selection
            var succeed;
            try {
                succeed = document.execCommand("copy");
                Lobibox.notify('default', { size: 'mini', msg: flexygo.localization.translate('msg.copied'), sound: false, width: 100, closable: false, delay: 1000 });
            }
            catch (e) {
                succeed = false;
            }
            // restore original focus
            if (currentFocus) {
                $(currentFocus).focus();
            }
            $(target).remove();
            return succeed;
        }
        utils.copyClipboard = copyClipboard;
        /**
        * Says if the screen is in mobile mode or note.
        * @method isSizeMobile
        * @return {boolean} True if screen is mobile size, false if not.
        */
        function isSizeMobile() {
            return ($(window).width() < flexygo.utils.size.m);
        }
        utils.isSizeMobile = isSizeMobile;
        /**
           * Says if the screen is in smartphone mode.
           * @method isSizeSmartphone
           * @return {boolean} True if screen is smartphone size, false if not.
           */
        function isSizeSmartphone() {
            return ($(window).width() <= flexygo.utils.size.s);
        }
        utils.isSizeSmartphone = isSizeSmartphone;
        /**
        * Says if the agent's navigator comes from a mobile.
        * @method isAgentMobile
        * @return {boolean} True if agent's navigator comes from a mobile, false if not.
        */
        function isAgentMobile() {
            var check = false;
            (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
                check = true; })(navigator.userAgent || navigator.vendor || window.opera);
            return check;
        }
        utils.isAgentMobile = isAgentMobile;
        /**
        * Transform object into key value pairs array.
        * @param {object} data - Object to transform.
        * @method dataToArray
        * @return {object[]} key value pais array.
        */
        function dataToArray(data) {
            var arr = [];
            var key;
            for (key in data) {
                var val;
                if (data[key] != null && typeof data[key].Value != 'undefined') {
                    val = data[key].Value;
                }
                else {
                    val = data[key];
                }
                arr.push({ key: key, value: val });
            }
            return arr;
        }
        utils.dataToArray = dataToArray;
        /**
        * Search index number of an specified item in array.
        * @param {object} arr - Array with all items
        * @param {object[]} itm - Item to find.
        * @method indexOfObject
        * @return {number} Item index if found, -1 if not.
        */
        function indexOfObject(arr, itm) {
            try {
                var esItem = true;
                for (var i = 0; i < arr.length; i++) {
                    esItem = true;
                    var key;
                    for (key in itm) {
                        if (itm[key] != arr[i][key]) {
                            esItem = false;
                        }
                    }
                    if (esItem) {
                        return i;
                    }
                }
                return -1;
            }
            catch (e) {
                return -1;
            }
        }
        utils.indexOfObject = indexOfObject;
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
        utils.sortObject = sortObject;
        var uniqueIdCounter = 0;
        /**
        * Generates an unique ID for this page.
        * @method uniqueId
        * @return {string} unique ID.
        */
        function uniqueId() {
            return 'myid-' + uniqueIdCounter++;
        }
        utils.uniqueId = uniqueId;
        var uniqueTabIndexCounter = 1;
        /**
        * Generates an unique tab index for this page.
        * @method uniqueId
        * @return {number} unique tab index.
        */
        function uniqueTabIndex() {
            return uniqueTabIndexCounter++;
        }
        utils.uniqueTabIndex = uniqueTabIndex;
        var uniqueNameCounter = 0;
        utils.animationTime = 500;
        utils.testMode = false;
        /**
        * Generates an unique name for this page.
        * @method uniqueId
        * @return {string} unique name.
        */
        function uniqueName() {
            return 'myname-' + uniqueNameCounter++;
        }
        utils.uniqueName = uniqueName;
        /**
            * Generates an unique id
            * @method uniqueUUId
            * @return {string} unique name.
            */
        function uniqueUUID() {
            return 'uuid-' + ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
        }
        utils.uniqueUUID = uniqueUUID;
        /**
        * resolve an url setting the right path.
        * @param {string} url - Url to resolve.
        * @method resolveUrl
        * @return {string} resolved url
        */
        function resolveUrl(url) {
            if (!url) {
                return null;
            }
            if (!flexygo.utils.webPath || flexygo.utils.webPath == '') {
                return encodeURI(url.replace('~', '.'));
            }
            else if (url.match("^~")) {
                return encodeURI(url.replace('~', flexygo.utils.webPath));
            }
            else {
                return encodeURI(url);
            }
        }
        utils.resolveUrl = resolveUrl;
        /**
        * Stop code execution
        * @param {number} milliseconds - number of milliseconds to stop.
        * @method sleep
        */
        function sleep(milliseconds) {
            var start = new Date().getTime();
            for (var i = 0; i < 1e7; i++) {
                if ((new Date().getTime() - start) > milliseconds) {
                    break;
                }
            }
        }
        utils.sleep = sleep;
        /**
        * Check if text is base64
        * @param {string} str - text base64.
        * @method isBase64
        */
        function isBase64(str) {
            try {
                return btoa(atob(str)) == str;
            }
            catch (err) {
                return false;
            }
        }
        utils.isBase64 = isBase64;
        var parentsCollection = new Array();
        var noParentsCollection = new Array();
        /**
        * says if two objects are parents.
        * @param {string} objectname1 - Object or collection.
        * @param {string} objectname2 - Object or collection two.
        * @method areParents
        * @return {object} true if objects are the same or parents, false if not
        */
        function areParents(objectname1, objectname2) {
            var areParents = false;
            if (!objectname1 || objectname1 == '' || !objectname2 || objectname2 == '') {
                return false;
            }
            if (objectname1.toLowerCase() == objectname2.toLowerCase()) {
                return true;
            }
            if ($.inArray(objectname1.toLowerCase() + '-' + objectname2.toLowerCase(), parentsCollection) != -1) {
                return true;
            }
            if ($.inArray(objectname2.toLowerCase() + '-' + objectname1.toLowerCase(), parentsCollection) != -1) {
                return true;
            }
            if ($.inArray(objectname1.toLowerCase() + '-' + objectname2.toLowerCase(), noParentsCollection) != -1) {
                return false;
            }
            if ($.inArray(objectname2.toLowerCase() + '-' + objectname1.toLowerCase(), noParentsCollection) != -1) {
                return false;
            }
            flexygo.ajax.syncPost('~/api/Sys', 'AreParents', { "ObjectName1": objectname1, "ObjectName2": objectname2 }, function (ret) {
                areParents = ret;
            });
            if (areParents) {
                parentsCollection.push(objectname1.toLowerCase() + '-' + objectname2.toLowerCase());
            }
            else {
                noParentsCollection.push(objectname1.toLowerCase() + '-' + objectname2.toLowerCase());
            }
            return areParents;
        }
        utils.areParents = areParents;
        function onlineCheck(interval) {
            setTimeout(function () {
                flexygo.ajax.post('~/api/Sys', 'IsConnectionAlive', null, (response) => {
                    if (response) {
                        if ($('#LineDown').length > 0) {
                            $('#LineDown').remove();
                        }
                        interval = 60000;
                    }
                }, (err) => {
                    if (err) {
                        if ($('#LineDown').length === 0) {
                            $('body').append('<div id="LineDown" class="fullscreen"><div><blink><i class="flx-icon icon-wifi icon-margin-right"></i>No connection</blink></div></div>');
                        }
                        interval = 5000;
                    }
                }, () => {
                    flexygo.utils.onlineCheck(interval);
                });
            }, interval);
        }
        utils.onlineCheck = onlineCheck;
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
        utils.execDynamicCode = execDynamicCode;
        /**
        * Evaluates if variable has defined value.
        * @param {any} value - Variable to evaluate
        * @method isBlank
        * @return {boolean}
        */
        function isBlank(value) {
            if (typeof value === 'undefined') {
                return true;
            }
            else if (value == null) {
                return true;
            }
            else if (value.toString().trim() === '') {
                return true;
            }
            else {
                return false;
            }
        }
        utils.isBlank = isBlank;
    })(utils = flexygo.utils || (flexygo.utils = {}));
})(flexygo || (flexygo = {}));
(function (flexygo) {
    var utils;
    (function (utils) {
        var querystring;
        (function (querystring) {
            function getParamValue(url, paramName) {
                var paramObj = getParamObject(url);
                if (paramObj) {
                    var found = false;
                    for (var i = 0; i < paramObj.length; i++) {
                        if (paramObj[i].key.toLowerCase() === paramName.toLowerCase()) {
                            return paramObj[i].value;
                        }
                    }
                }
                return null;
            }
            querystring.getParamValue = getParamValue;
            function setParamValue(url, paramName, paramValue) {
                var paramObj = getParamObject(url);
                if (!paramObj) {
                    return url + "?" + paramName + "=" + paramValue;
                }
                else {
                    var found = false;
                    for (let i = 0; i < paramObj.length; i++) {
                        if (paramObj[i].key.toLowerCase() === paramName.toLowerCase()) {
                            paramObj[i].value = paramValue;
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        paramObj.push({ "key": paramName, "value": paramValue });
                    }
                    var newUrl = '';
                    for (let i = 0; i < paramObj.length; i++) {
                        if (newUrl != '') {
                            newUrl += '&';
                        }
                        newUrl += paramObj[i].key + '=' + paramObj[i].value;
                    }
                    return getUrlString(url) + '?' + newUrl;
                }
            }
            querystring.setParamValue = setParamValue;
            function getParamString(url) {
                if (url.indexOf('?') == -1) {
                    return null;
                }
                else {
                    return url.substring(url.indexOf('?') + 1);
                }
            }
            querystring.getParamString = getParamString;
            function getUrlString(url) {
                if (url.indexOf('?') == -1) {
                    return url;
                }
                else {
                    return url.substring(0, url.indexOf('?'));
                }
            }
            querystring.getUrlString = getUrlString;
            function getParamObject(url) {
                let params = getParamString(url);
                if (!params) {
                    return null;
                }
                let paramsArr = params.split("&");
                let paramObj = new Array();
                for (var i = 0; i < paramsArr.length; i++) {
                    let key = paramsArr[i].substring(0, paramsArr[i].indexOf('='));
                    let value = paramsArr[i].substring(paramsArr[i].indexOf('=') + 1);
                    paramObj.push({ "key": key, "value": value });
                }
                return paramObj;
            }
            querystring.getParamObject = getParamObject;
        })(querystring = utils.querystring || (utils.querystring = {}));
    })(utils = flexygo.utils || (flexygo.utils = {}));
})(flexygo || (flexygo = {}));
// Create a jquery plugin that prints the given element.
jQuery.fn.print = function () {
    // NOTE: We are trimming the jQuery collection down to the
    // first element in the collection.
    if (this.size() > 1) {
        this.eq(0).print();
        return;
    }
    else if (!this.size()) {
        return;
    }
    // ASSERT: At this point, we know that the current jQuery
    // collection (as defined by THIS), contains only one
    // printable element.
    // Create a random name for the print frame.
    var strFrameName = ("printer-" + (new Date()).getTime());
    // Create an iFrame with the new name.
    var jFrame = $("<iframe name='" + strFrameName + "'>");
    jFrame
        .css("width", "1000px")
        .css("z-index", "100")
        .css("height", "800px")
        .css("position", "absolute")
        .css("left", "-9999px")
        .appendTo($("body:first"));
    // Get a FRAMES reference to the new frame.
    var objFrame = window.frames[strFrameName];
    // Get a reference to the DOM in the new frame.
    var objDoc = objFrame.document;
    // Grab all the style tags and copy to the new
    // document so that we capture look and feel of
    // the current document.
    // Create a temp document DIV to hold the style tags.
    var jStyleDiv = $("<div>").append($("style").clone()).append($("link").clone()).append('<link href="./css/skins/default/print.css" rel="stylesheet">');
    // Write the HTML for the document. In this, we will
    // write out the HTML of the current element.
    objDoc.open();
    objDoc.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">");
    objDoc.write("<html>");
    objDoc.write("<head>");
    objDoc.write("<title>");
    objDoc.write(document.title);
    objDoc.write("</title>");
    objDoc.write(jStyleDiv.html());
    //objDoc.write(SrcDiv.html());
    objDoc.write("</head>");
    objDoc.write("<body>");
    objDoc.write(this.html());
    objDoc.write("</body>");
    objDoc.write("</html>");
    objDoc.close();
    // Print the document.
    objFrame.focus();
    //gridstack CssRules
    let gsStyle = $('[data-gs-style-id]');
    gsStyle.each(function () {
        let itm = this;
        if (itm.sheet && itm.sheet.cssRules) {
            let doc = $(objDoc);
            for (let i = 0; i < itm.sheet.cssRules.length; i++) {
                doc.find('[data-gs-style-id="' + $(itm).attr('data-gs-style-id') + '"]').append(itm.sheet.cssRules[i].cssText);
            }
        }
    });
    setTimeout(function () {
        //clone canvas content
        let oldCnvs = $('canvas');
        let newCnvs = $(objDoc).find('canvas');
        for (let i = 0; i < newCnvs.length; i++) {
            $(newCnvs[i]).width($(newCnvs[i]).closest('div').width() * 0.88);
            $(newCnvs[i]).height($(newCnvs[i]).closest('div').height() * 0.88);
            $(newCnvs[i]).attr('width', $(newCnvs[i]).closest('div').width());
            $(newCnvs[i]).attr('height', $(newCnvs[i]).closest('div').height());
            var context = newCnvs[i].getContext('2d');
            context.drawImage(oldCnvs[i], 0, 0, $(newCnvs[i]).width(), $(newCnvs[i]).height());
        }
        setTimeout(function () { objFrame.print(); }, 1000);
    }, 2000);
    // Have the frame remove itself in about a minute so that
    // we don't build up too many of these frames.
    setTimeout(function () {
        jFrame.remove();
    }, (60 * 1000));
};
$(function () {
    $.fn.oldVal = $.fn.val;
    $.fn.val = function (value, text) {
        if (typeof value == 'undefined') {
            let wc = $(this)[0];
            if (wc && (typeof wc.getValue === "function")) {
                return wc.getValue();
            }
            else {
                return $(this).oldVal();
            }
        }
        else {
            let wc = $(this)[0];
            if (wc && (typeof wc.setValue === "function")) {
                return wc.setValue(value, text);
            }
            else {
                return $(this).oldVal(value);
            }
        }
    };
    $.fn.visible = function (value, duration) {
        if (value) {
            $(this).show(duration);
        }
        else {
            $(this).hide(duration);
        }
    };
    $.fn.oldShow = $.fn.show;
    $.fn.show = function () {
        let wcs = this;
        for (let i = 0; i < wcs.length; i++) {
            if (wcs[i] && (typeof wcs[i].show === "function")) {
                wcs[i].show();
            }
            else {
                $.fn.oldShow.apply($(wcs[i]), arguments);
            }
        }
        return this;
    };
});
//# sourceMappingURL=util.js.map