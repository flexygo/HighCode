/**
 * @namespace flexygo.utils
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var flexygo;
(function (flexygo) {
    var utils;
    (function (utils) {
        /**
         * Shows a QR with the specified text,
         * @method showQR
         * @param {string} text - The text to include in QR, by default current location page.
         */
        function showQR(text) {
            if (typeof text == 'undefined' || text == '') {
                text = document.location.href;
            }
            let elm = $('<div id="lastQR" style="width:400px;height:400px;margin: 0 auto;" />');
            Lobibox.window({ title: 'QR Code', content: elm });
            let qrcode = new QRCode($('#lastQR')[0], { width: 400, height: 400 });
            qrcode.makeCode(text);
        }
        utils.showQR = showQR;
        function generateQR(text, size = 400) {
            let elm = $('<div style="width:' + size + 'px;height:' + size + 'px;margin: 0 auto;" />');
            let qrcode = new QRCode(elm[0], { width: size, height: size });
            qrcode.makeCode(text);
            return elm.find('canvas')[0].toDataURL();
        }
        utils.generateQR = generateQR;
        /**
        * Check if two objects are equivalent
        * @method ObjectsAreEquivalent
        * @param {object} a - Object a to compare.
        * @param {object} b - Object b to compare.
        */
        function objectsAreEquivalent(a, b) {
            // Create arrays of property names
            var aProps = Object.getOwnPropertyNames(a);
            var bProps = Object.getOwnPropertyNames(b);
            // If number of properties is different,
            // objects are not equivalent
            if (aProps.length != bProps.length) {
                return false;
            }
            for (var i = 0; i < aProps.length; i++) {
                var propName = aProps[i];
                // If values of same property are not equal,
                // objects are not equivalent
                if (a[propName] !== b[propName]) {
                    return false;
                }
            }
            // If we made it this far, objects
            // are considered equivalent
            return true;
        }
        utils.objectsAreEquivalent = objectsAreEquivalent;
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
                    if (typeof paramValue == 'string' && !paramValue.startsWith("{") && !paramValue.endsWith("}")) {
                        ret += "'" + paramValue.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, "&quot;").replace(/\r?\n|\r/g, " ") + "'";
                    }
                    else {
                        ret += JSON.stringify(paramValue).replace(/'/g, "\\'").replace(/"/g, "'");
                    }
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
        function loadingMsg() { return '<div ><button class="btn btn-lg bg-primary"><span class="flx-icon icon-refresh icon-spin-reverse"></span> Loading...</button></div>'; }
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
        * Says if the screen is in tactil mode.
        * @method isTactilModeActive
        * @return {boolean} True if tactil mode is active, false if not.
        */
        function isTactilModeActive() {
            return (flexygo.storage.local.get("tactilMode") ? true : false);
        }
        utils.isTactilModeActive = isTactilModeActive;
        /**
        * Toggles tactil mode.
        * @method toggleTactilMode
        */
        function toggleTactilMode() {
            if (isTactilModeActive()) {
                $('html').removeClass("tactilMode");
                flexygo.storage.local.add("tactilMode", false);
                flexygo.msg.success("Tactil Mode Desactivated");
            }
            else {
                $('html').addClass("tactilMode");
                flexygo.storage.local.add("tactilMode", true);
                flexygo.msg.success("Tactil Mode Activated");
            }
            flexygo.storage.local.save();
            window.location.reload();
            $('flx-nav#mainMenu > ul > li[title="Tools"] > ul').slideToggle();
        }
        utils.toggleTactilMode = toggleTactilMode;
        /**
        * Says if the screen is in full screen mode.
        * @method isFullScreenActive
        * @return {boolean} True if full screen is active, false if not.
        */
        function isFullScreenActive() {
            return window.innerHeight == screen.height;
        }
        utils.isFullScreenActive = isFullScreenActive;
        /**
        * Toggles full screen.
        * @method toggleFullScreen
        */
        function toggleFullScreen() {
            let oldIcon, newIcon;
            if (isFullScreenActive()) {
                document.exitFullscreen();
                oldIcon = "icon-collapse";
                newIcon = "icon-expand-4";
            }
            else {
                $('html')[0].requestFullscreen();
                oldIcon = "icon-expand-4";
                newIcon = "icon-collapse";
            }
            $('#mainMenu li[title="Toggle full screen"] i').removeClass(oldIcon);
            $('#mainMenu li[title="Toggle full screen"] i').addClass(newIcon);
        }
        utils.toggleFullScreen = toggleFullScreen;
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
       * Says if the agent's navigator comes from Electron.
       * @method isAgentElectron
       * @return {boolean} True if agent's navigator comes from Electron, false if not.
       */
        function isAgentElectron() {
            return (navigator.userAgent && (/electron+/gim).test(navigator.userAgent));
        }
        utils.isAgentElectron = isAgentElectron;
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
        function indexOfObject(arr, itm, excludes) {
            try {
                if (excludes == undefined)
                    excludes = [];
                var esItem = true;
                for (var i = 0; i < arr.length; i++) {
                    esItem = true;
                    var key;
                    for (key in itm) {
                        if (itm[key] != arr[i][key]) {
                            if (excludes.indexOf(key) == -1)
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
        * A promise to wait until the time ends
        * @param {number} milliseconds - number of milliseconds to stop.
        * @method asyncSleep
        */
        function asyncSleep(milliseconds) {
            return new Promise(resolve => setTimeout(resolve, milliseconds));
        }
        utils.asyncSleep = asyncSleep;
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
                        flexygo.utils.maintenance.set(response.maintenanceMode);
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
        function refreshModuleViewersInfo(module, listUsers) {
            if ($('body').find(module).length > 0) {
                let userName = flexygo.context.currentUserLogin;
                let items = 0;
                let viewerTemplate = $('<div class="tooltip flx-info-viewers" role="tooltip"><div class="tooltip-inner"></div></div>');
                let tooltiptitle = $(`<div><small class="txt-muted txt-uppercase">${flexygo.localization.translate('flxmodule.currentlyViewing')}</small><br></div>`);
                for (let us in listUsers) {
                    if (us !== userName) {
                        tooltiptitle.append('<small>' + listUsers[us] + '</small><br>');
                        items++;
                    }
                }
                $('body').find(module).find("#flx-viewer-module #flx-flip-back").html(items.toString());
                $('body').find(module).find("#flx-viewer-module").attr("data-original-title", $(tooltiptitle)[0].outerHTML);
                $('body').find(module).find("#flx-viewer-module").tooltip({ template: $(viewerTemplate)[0].outerHTML, html: true, title: $('body').find(module).find("#flx-viewer-module").attr("data-original-title"), placement: 'bottom' });
                if (items > 0) {
                    $('body').find(module).find("#flx-viewer-module").removeClass("hidden");
                }
                else {
                    $('body').find(module).find("#flx-viewer-module").addClass("hidden");
                }
            }
        }
        utils.refreshModuleViewersInfo = refreshModuleViewersInfo;
        ;
        function checkObserverModule(module, interval, removeElement = false) {
            let userId = flexygo.context.currentUserId;
            setTimeout(function () {
                if ($('body').find(module).length > 0) {
                    if ($('body').find(module)[0].ModuleViewers) {
                        var params = { UserId: null, ModuleName: null, ObjectName: null, ObjectWhere: null, RemoveElement: null };
                        if ($('body').find(module).length == 0) {
                            removeElement = true;
                        }
                        params.UserId = userId;
                        params.ModuleName = module.moduleName;
                        params.ObjectName = module.objectname;
                        params.ObjectWhere = module.objectwhere;
                        params.RemoveElement = removeElement;
                        flexygo.ajax.post('~/api/Page', 'IsObserverModule', params, (response) => {
                            if (response) {
                                refreshModuleViewersInfo(module, response);
                            }
                        }, (err) => {
                            console.log(err);
                        }, () => {
                            if ($('body').find(module).length > 0) {
                                if ($('body').find(module)[0].ModuleViewers) {
                                    flexygo.utils.checkObserverModule(module, interval);
                                }
                            }
                        });
                    }
                }
                //else {
                //    flexygo.utils.checkObserverModule(module, interval, true);
                //}
            }, interval);
        }
        utils.checkObserverModule = checkObserverModule;
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
        * Evaluates JavaScript code and executes it.
        * @param {string} dynamicCode - Dynamic Code.
        * @method execAsyncDynamicCode
        * @return {Promise<any>}
        */
        function execAsyncDynamicCode(dynamicCode) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield eval(dynamicCode);
            });
        }
        utils.execAsyncDynamicCode = execAsyncDynamicCode;
        /**
        * Evaluates JavaScript code and executes it.
        * @param {string} dynamicCode - Dynamic Code.
        * @method execAsyncDynamicCode
        * @return {Promise<any>}
        */
        function execAsyncFunction(jsFunction, paramNames = [], paramValues = []) {
            return __awaiter(this, void 0, void 0, function* () {
                let res, context;
                context = paramValues[paramNames.indexOf('triggerElement')];
                context = context ? context[0] : window;
                context.customFunction = new Function(...paramNames, jsFunction);
                res = yield context.customFunction.call(context, ...paramValues);
                context.customFunction = null;
                return res;
            });
        }
        utils.execAsyncFunction = execAsyncFunction;
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
        /**
          * Document viewer Events
          * @method documentViewerEvents
          * @param {flexygo.ui.wc.FlxModuleElement} documentModuleElement - Document Module Element.
          */
        function documentViewerEvents(documentModuleElement) {
            $(documentModuleElement).find('div.flx-documentmanager > div').off('click.documentdata').on('click.documentdata', function () {
                let documentDataModule = $(documentModuleElement).closest('main.pageContainer').find('#mod-sysmod-view-document');
                documentDataModule.attr('objectwhere', "Documents.DocGuid = '" + $(this).attr('id') + "'");
                $(documentModuleElement).find('div.flx-documentmanager > div.active').removeClass('active');
                $(this).addClass('active');
                documentDataModule[0].refresh();
            });
        }
        utils.documentViewerEvents = documentViewerEvents;
        /**
        * Evaluates if element is in main content.
        * @param {Element} element - Element to evaluate
        * @param {number} margin - Respect margin
        * @method isInMainContent
        * @return {boolean}
        */
        function isInMainContent(element, margin) {
            const mainContent = $(element).closest('main')[0];
            if (!margin) {
                margin = 0;
            }
            const scroll = mainContent.scrollTop; //|| mainContent.offsetTop
            const boundsTop = (element.getBoundingClientRect().top - mainContent.offsetTop) + scroll;
            const viewport = {
                top: scroll + margin,
                bottom: (scroll + mainContent.offsetHeight) - margin,
            };
            const bounds = {
                top: boundsTop,
                bottom: boundsTop + element.clientHeight,
            };
            return (bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom)
                || (bounds.top <= viewport.bottom && bounds.top >= viewport.top);
        }
        utils.isInMainContent = isInMainContent;
        /**
        * Check if is a valid JSON string.
        * @method isEmptyAttribute
        * @returns {boolean} True if it's a valid JSON string, false if it's not
        */
        function isJSON(string) {
            try {
                JSON.parse(string);
            }
            catch (e) {
                return false;
            }
            return true;
        }
        utils.isJSON = isJSON;
        /**
        * Get file icon.
        * @method getFileIcon
        */
        function getFileIcon(extension) {
            switch (extension.replace('.', '').toLowerCase()) {
                case 'txt': {
                    return 'fa fa-file-text-o';
                }
                case 'pdf': {
                    return 'fa fa-file-pdf-o';
                }
                case 'doc':
                case 'docx': {
                    return 'fa fa-file-word-o';
                }
                case 'xls':
                case 'xlsx':
                case 'csv': {
                    return 'fa fa-file-excel-o';
                }
                case 'ppt':
                case 'pptx': {
                    return 'fa fa-file-powerpoint-o';
                }
                case 'gif':
                case 'jpg':
                case 'jpeg':
                case 'png':
                case 'bmp':
                case 'tif': {
                    return 'fa fa-file-image-o';
                }
                case 'zip':
                case 'zipx':
                case 'rar':
                case 'tar':
                case 'gz':
                case 'dmg':
                case 'iso': {
                    return 'fa fa-file-archive-o';
                }
                case 'wav':
                case 'mp3':
                case 'fla':
                case 'ra':
                case 'rma':
                case 'aif':
                case 'aiff':
                case 'aa':
                case 'aac':
                case 'aax':
                case 'ac3':
                case 'au':
                case 'ogg':
                case 'avr':
                case '3ga':
                case 'flac':
                case 'mid':
                case 'midi':
                case 'm4a':
                case 'mp4a':
                case 'amz':
                case 'mka':
                case 'asx':
                case 'pcm':
                case 'm3u':
                case 'wma':
                case 'xwma': {
                    return 'fa fa-file-sound-o';
                }
                case 'avi':
                case 'mpg':
                case 'mp4':
                case 'mkv':
                case 'mov':
                case 'wmv':
                case 'vp6':
                case '264':
                case 'vid':
                case 'rv':
                case 'webm':
                case 'swf':
                case 'h264':
                case 'flv':
                case 'mk3d':
                case 'gifv':
                case 'oggv':
                case '3gp':
                case 'm4v':
                case 'movie':
                case 'divx': {
                    return 'fa fa-file-video-o';
                }
                case 'css':
                case 'js':
                case 'git':
                case 'py':
                case 'cpp':
                case 'h':
                case 'ini':
                case 'config':
                case 'exe':
                case 'dll':
                case 'bat':
                case 'pl':
                case 'scr':
                case 'msi':
                case 'app':
                case 'deb':
                case 'apk':
                case 'jar':
                case 'vb':
                case 'prg':
                case 'sh':
                case 'html':
                case 'htm':
                case 'xhtml':
                case 'jhtml':
                case 'php':
                case 'php3':
                case 'php4':
                case 'php5':
                case 'phtml':
                case 'asp':
                case 'aspx':
                case 'cfm': {
                    return 'fa fa-file-code-o';
                }
                default: {
                    return 'fa fa-file-o';
                }
            }
        }
        utils.getFileIcon = getFileIcon;
        utils.colors = [
            "#63b598", "#ce7d78", "#ea9e70", "#a48a9e", "#c6e1e8", "#648177", "#0d5ac1",
            "#f205e6", "#1c0365", "#14a9ad", "#4ca2f9", "#a4e43f", "#d298e2", "#6119d0",
            "#d2737d", "#c0a43c", "#f2510e", "#651be6", "#79806e", "#61da5e", "#cd2f00",
            "#9348af", "#01ac53", "#c5a4fb", "#996635", "#b11573", "#4bb473", "#75d89e",
            "#2f3f94", "#2f7b99", "#da967d", "#34891f", "#b0d87b", "#ca4751", "#7e50a8",
            "#c4d647", "#e0eeb8", "#11dec1", "#289812", "#566ca0", "#ffdbe1", "#2f1179",
            "#935b6d", "#916988", "#513d98", "#aead3a", "#9e6d71", "#4b5bdc", "#0cd36d",
            "#250662", "#cb5bea", "#228916", "#ac3e1b", "#df514a", "#539397", "#880977",
            "#f697c1", "#ba96ce", "#679c9d", "#c6c42c", "#5d2c52", "#48b41b", "#e1cf3b",
            "#5be4f0", "#57c4d8", "#a4d17a", "#225b8", "#be608b", "#96b00c", "#088baf",
            "#f158bf", "#e145ba", "#ee91e3", "#05d371", "#5426e0", "#4834d0", "#802234",
            "#6749e8", "#0971f0", "#8fb413", "#b2b4f0", "#c3c89d", "#c9a941", "#41d158",
            "#fb21a3", "#51aed9", "#5bb32d", "#807fb", "#21538e", "#89d534", "#d36647",
            "#7fb411", "#0023b8", "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3",
            "#79352c", "#521250", "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec",
            "#1bb699", "#6b2e5f", "#64820f", "#1c271", "#21538e", "#89d534", "#d36647",
            "#7fb411", "#0023b8", "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3",
            "#79352c", "#521250", "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec",
            "#1bb699", "#6b2e5f", "#64820f", "#1c271", "#9cb64a", "#996c48", "#9ab9b7",
            "#06e052", "#e3a481", "#0eb621", "#fc458e", "#b2db15", "#aa226d", "#792ed8",
            "#73872a", "#520d3a", "#cefcb8", "#a5b3d9", "#7d1d85", "#c4fd57", "#f1ae16",
            "#8fe22a", "#ef6e3c", "#243eeb", "#1dc18", "#dd93fd", "#3f8473", "#e7dbce",
            "#421f79", "#7a3d93", "#635f6d", "#93f2d7", "#9b5c2a", "#15b9ee", "#0f5997",
            "#409188", "#911e20", "#1350ce", "#10e5b1", "#fff4d7", "#cb2582", "#ce00be",
            "#32d5d6", "#17232", "#608572", "#c79bc2", "#00f87c", "#77772a", "#6995ba",
            "#fc6b57", "#f07815", "#8fd883", "#060e27", "#96e591", "#21d52e", "#d00043",
            "#b47162", "#1ec227", "#4f0f6f", "#1d1d58", "#947002", "#bde052", "#e08c56",
            "#28fcfd", "#bb09b", "#36486a", "#d02e29", "#1ae6db", "#3e464c", "#a84a8f",
            "#911e7e", "#3f16d9", "#0f525f", "#ac7c0a", "#b4c086", "#c9d730", "#30cc49",
            "#3d6751", "#fb4c03", "#640fc1", "#62c03e", "#d3493a", "#88aa0b", "#406df9",
            "#615af0", "#4be47", "#2a3434", "#4a543f", "#79bca0", "#a8b8d4", "#00efd4",
            "#7ad236", "#7260d8", "#1deaa7", "#06f43a", "#823c59", "#e3d94c", "#dc1c06",
            "#f53b2a", "#b46238", "#2dfff6", "#a82b89", "#1a8011", "#436a9f", "#1a806a",
            "#4cf09d", "#c188a2", "#67eb4b", "#b308d3", "#fc7e41", "#af3101", "#ff065",
            "#71b1f4", "#a2f8a5", "#e23dd0", "#d3486d", "#00f7f9", "#474893", "#3cec35",
            "#1c65cb", "#5d1d0c", "#2d7d2a", "#ff3420", "#5cdd87", "#a259a4", "#e4ac44",
            "#1bede6", "#8798a4", "#d7790f", "#b2c24f", "#de73c2", "#d70a9c", "#25b67",
            "#88e9b8", "#c2b0e2", "#86e98f", "#ae90e2", "#1a806b", "#436a9e", "#0ec0ff",
            "#f812b3", "#b17fc9", "#8d6c2f", "#d3277a", "#2ca1ae", "#9685eb", "#8a96c6",
            "#dba2e6", "#76fc1b", "#608fa4", "#20f6ba", "#07d7f6", "#dce77a", "#77ecca"
        ];
        function hexToRgbA(hex, opacity) {
            var c;
            if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
                c = hex.substring(1).split('');
                if (c.length == 3) {
                    c = [c[0], c[0], c[1], c[1], c[2], c[2]];
                }
                c = '0x' + c.join('');
                return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + opacity + ')';
            }
            throw new Error('Bad Hex');
        }
        utils.hexToRgbA = hexToRgbA;
        /**
        * Scrolls to the desired height
        * @method scrollTo
        * @param {string} scrollHeight Height where us desired to scroll
        */
        function scrollTo(scrollHeight) {
            if (flexygo.utils.isSizeMobile()) {
                $(window).scrollTop(scrollHeight);
            }
            else {
                var mainContent = document.getElementById('mainContent');
                mainContent.scrollTop = scrollHeight;
            }
        }
        utils.scrollTo = scrollTo;
        /**
        * Launch dark/light mode effect.
        * @method isEmptyAttribute
        * @param {boolean} dark Attribute Name.
        */
        function skinModeEffect(dark) {
            let txt = 'skin.lightmode';
            let iconMode = 'fa fa-sun-o';
            if (dark) {
                txt = 'skin.darkmode';
                iconMode = 'fa fa-moon-o';
            }
            $("body").click();
            let anim = '';
            anim += `<div id="SkinModeBackground" class="${(dark ? 'dark' : '')}">`;
            anim += `<i id="SkinModeIcon" class="${iconMode}"></i>`;
            anim += `<div id="SkinModeText" style="width: 500px;">${flexygo.localization.translate(txt)}</div>`;
            anim += '<div class="loader"><div class="loader-wrapper"><span></span><span></span><span></span><span></span><span></span></div></div>';
            anim += '</div>';
            $('body').append(anim);
            $('#SkinModeText').textillate({
                autoStart: false,
                in: {
                    delayScale: 2, delay: 40, effect: 'flipInY'
                }
            });
            $('#SkinModeBackground').show('fold', null, 500, function () {
                $('#SkinModeText').textillate('start');
                $('#SkinModeIcon').show('fade', null, 1500);
            });
        }
        utils.skinModeEffect = skinModeEffect;
        function getErrorMessage(err) {
            let text = '';
            if (err.error && err.error.Message) {
                text = err.error.Message;
            }
            else if (err.sql) {
                text = err.message;
            }
            else if (err.message) {
                text = err.message;
            }
            else if (err.Message) {
                text = err.Message;
            }
            else if (typeof err == 'string') {
                text = err;
            }
            else {
                text = JSON.stringify(err);
            }
            return text;
        }
        utils.getErrorMessage = getErrorMessage;
        function showDependencyError(elm, width) {
            $('body').click();
            let sentence = $(elm).find('.flx-sentence');
            $('.sweet-modal-overlay').remove();
            $.sweetModal({
                width: width,
                classes: ['flxdependency-modal-sentence'],
                content: `<div class="row margin-top-m">
                        <pre><b><i title="Copy" class="flx-icon icon-copy-file icon-lg clickable pull-right"></i></b><code>${sentence.html()}</code></pre>
                    </div>`,
                onOpen: function (sweetModal) {
                    $(sweetModal).find("i").on('click', (ev) => {
                        flexygo.utils.copyClipboard($(ev.target).closest('.row').find('code')[0].innerHTML);
                    });
                }
            });
        }
        utils.showDependencyError = showDependencyError;
        /**
        * Generate random color based on a text seed.
        * @method randomColor
        * @param {text} seed Any string to get always same color.
        * @return {string} Color in
        */
        function randomColor(seed) {
            let value = seed;
            while (!$.isNumeric(value) || (flexygo.utils.colors.length <= value)) {
                let currentIndex = 0;
                value = value.toString().split('');
                for (let i = 0; i < value.length; i++) {
                    if ($.isNumeric(value[i])) {
                        currentIndex += parseInt(value[i]);
                    }
                    else {
                        currentIndex += value[i].charCodeAt();
                    }
                }
                value = currentIndex;
            }
            return flexygo.utils.colors[value];
        }
        utils.randomColor = randomColor;
        function formatFileSize(size) {
            const units = ["B", "KB", "MB", "GB", "TB"];
            let currentSize = size;
            let index = 0;
            while (currentSize >= 1024 && index < units.length - 1) {
                currentSize /= 1024;
                index += 1;
            }
            return `${Number(currentSize.toFixed(2))} ${units[index]}`;
        }
        utils.formatFileSize = formatFileSize;
        function totalFileWeight(itm) {
            let files = $(itm[0]).find('flx-list .flxboxCard');
            let totalFileSize = Array.from(files).reduce((sum, file) => {
                let fileSize = Number(file.getAttribute('filesize'));
                if (!flexygo.utils.isBlank(flexygo.utils.MaxSizeAttachment)) {
                    let iconWarning = $(file).find('.icon-attention-2');
                    let maxSizeAttachment = parseFloat(flexygo.utils.MaxSizeAttachment);
                    if ((fileSize / (1024 * 1024)) > maxSizeAttachment) {
                        $(iconWarning[0]).html(`<flx-tooltip mode="popover"><span>${flexygo.localization.translate('mail.fileSize')}.</span> <br><span><strong>${flexygo.localization.translate('mail.maxSize')}</strong>: ${flexygo.utils.MaxSizeAttachment}MB</span></flx-tooltip>`);
                        $(iconWarning[0]).removeClass('hidden');
                    }
                }
                return sum + fileSize;
            }, 0);
            let totalWeightElement = $($(itm[0]).find('#totalWeight')[0]);
            let htmlContent = `Total: ${flexygo.utils.formatFileSize(totalFileSize)}`;
            if (!flexygo.utils.isBlank(flexygo.utils.MaxSizeMail)) {
                let MaxSizeMail = parseFloat(flexygo.utils.MaxSizeMail);
                if ((totalFileSize / (1024 * 1024)) > MaxSizeMail) {
                    htmlContent += `<i class="flx-icon icon-attention-2 clickable txt-warning" style="margin-left: 4px;"><flx-tooltip mode="popover"><span>${flexygo.localization.translate('mail.mailSize')}.</span> <br><span><strong>${flexygo.localization.translate('mail.maxSize')}</strong>: ${flexygo.utils.MaxSizeMail}MB</span></flx-tooltip></i>`;
                }
            }
            totalWeightElement.html(htmlContent);
        }
        utils.totalFileWeight = totalFileWeight;
        function formRelatedDep_Childs(mode, ObjectName, PropertyName, e) {
            if ($(e).closest('.parent_li').find('.tree_childs').length == 0) {
                let template = '';
                switch (mode) {
                    case 'process':
                        template = flexygo.environment.getTemplate('sysProcessParamDependency', '', 'sys_form_param_related_dependencies', '', `Processes_Params_Dependencies.ProcessName='${ObjectName}' AND Processes_Params_Dependencies.ParamName='${PropertyName}'`);
                        break;
                    case 'report':
                        template = flexygo.environment.getTemplate('sysReportParamDependency', '', 'sys_form_report_related_dependencies', '', `Reports_Params_Dependencies.ReportName='${ObjectName}' AND Reports_Params_Dependencies.ParamName='${PropertyName}'`);
                        break;
                    default:
                        template = flexygo.environment.getTemplate('sysObjectPropertyDependency', '', 'sys_form_related_dependencies', '', `Objects_Properties_Dependencies.ObjectName='${ObjectName}' AND Objects_Properties_Dependencies.PropertyName='${PropertyName}'`);
                }
                let tChilds = $(template).find('.tree_childs');
                tChilds.css('display', 'none');
                $(e).closest('.parent_li').append(tChilds);
            }
            $(e).closest('.parent_li').find('.tree_childs').slideToggle(250); //.toggleClass('hide');
        }
        utils.formRelatedDep_Childs = formRelatedDep_Childs;
        utils.colors = ['#EF9A9A',
            '#F48FB1',
            '#CE93D9',
            '#694c9f',
            '#4e5a9a',
            '#32638a',
            '#244b5d',
            '#4a9ba7',
            '#30635e',
            '#2ea879',
            '#679238',
            '#a5b22e',
            '#59819d',
            '#bca047',
            '#FFCC80',
            '#FFAB91',
            '#BDAAA4',
            '#B1BEC5',
            '#D32E2E',
            '#C2175B',
            '#7B1FA2',
            '#5D35B1',
            '#3948AB',
            '#1D88E5',
            '#009BE5',
            '#00ACC1',
            '#00897B',
            '#43A046',
            '#7CB342',
            '#C0CA33',
            '#FED935',
            '#FFB300',
            '#FB8C00',
            '#F4501D',
            '#6D4C41',
            '#757575',
            '#546E7A'];
        /**
    * Extract the tables using in a query for monaco-editor.
    * @method extractTables
    * @param {text} sentence query.
    * @return {Array} table array
    */
        function extractTables(sentence, ConnStringId, subqueries) {
            let fullTables = [];
            let keywords = monacoVars.keywords.sql;
            let words = sentence.toUpperCase().split(/\s+/); // Divide la consulta en palabras
            let listSubqueries = [];
            let index = 0;
            while (index < words.length) {
                if (words[index] === "FROM" || words[index] === "JOIN" || words[index] === "APPLY") {
                    let currentWords = words.slice(index + 1, words.length);
                    //search the index of first keyword after FROM or JOIN to cut the string to extract only the tables part
                    let firstIndex = currentWords.findIndex(palabra => keywords.includes(palabra) && palabra !== 'AS');
                    let tablePart = firstIndex != -1 ? currentWords.slice(0, firstIndex).join(' ') : currentWords.join(' ');
                    //Remove the "[" and "]" to prevent the table not being found
                    tablePart = tablePart.replace(/[\[\]]/g, "");
                    let parts;
                    let tableData;
                    if (words[index] === "FROM" && tablePart && tablePart.includes(',')) {
                        const tables = tablePart.split(',').map(tabla => tabla.trim());
                        fullTables.push(...tables.map(table => {
                            //removing the Data Connection of the string
                            parts = table.replace(/\{~(.*?)~\}\.dbo\./gim, "").split(" ");
                            if (/^#SUBQUERY_\d+#$/i.exec(parts[0])) {
                                if (subqueries.has(`[${parts[0].toLowerCase()}]`)) {
                                    let subquery = { Name: parts[0], TableAlias: parts.length == 2 ? parts[1] : parts.length == 3 ? parts[2] : "", DataConnection: ConnStringId, Query: subqueries.get(`[${parts[0].toLowerCase()}]`), Columns: [] };
                                    listSubqueries.push(subquery);
                                }
                            }
                            else {
                                tableData =
                                    {
                                        Name: parts[0],
                                        TableAlias: parts.length == 2 ? parts[1] : parts.length == 3 ? parts[2] : "",
                                        DataConnection: table.match(/\{~(.*?)~\}/g) ? table.match(/\{~(.*?)~\}/g)[0].replace(/\{~|~\}/g, '') : ConnStringId
                                    };
                            }
                            return tableData;
                        }));
                    }
                    else if ((words[index] === "JOIN" || words[index] === "APPLY" || words[index] === "FROM") && tablePart && !tablePart.includes(',')) {
                        //removing the Data Connection of the string
                        parts = tablePart.replace(/\{~(.*?)~\}\.dbo\./gim, "").split(" ");
                        if (/^#SUBQUERY_\d+#$/i.exec(parts[0])) {
                            if (subqueries.has(`[${parts[0].toLowerCase()}]`)) {
                                let subquery = { Name: parts[0], TableAlias: parts.length == 2 ? parts[1] : parts.length == 3 ? parts[2] : "", DataConnection: ConnStringId, Query: subqueries.get(`[${parts[0].toLowerCase()}]`), Columns: [] };
                                listSubqueries.push(subquery);
                            }
                        }
                        else {
                            tableData = {
                                Name: parts[0],
                                TableAlias: parts.length == 2 ? parts[1] : parts.length == 3 ? parts[2] : "",
                                DataConnection: tablePart.match(/\{~(.*?)~\}/g) ? tablePart.match(/\{~(.*?)~\}/g)[0].replace(/\{~|~\}/g, '') : ConnStringId
                            };
                            fullTables.push(tableData);
                        }
                    }
                }
                index++;
            }
            if (listSubqueries.length > 0) {
                flexygo.ajax.syncPost('~/api/Sys', "getSubqueriesColumns", { subqueries: JSON.stringify(listSubqueries), connStringId: ConnStringId }, (response) => {
                    if (response) {
                        fullTables = [...fullTables, ...response];
                    }
                });
            }
            return fullTables;
        }
        utils.extractTables = extractTables;
        function checkRegexWithWorker(regex, content) {
            return new Promise((resolve, reject) => {
                //create the temp file and fill it with the code
                const workerBlob = new Blob([`
            onmessage = function(e) {
                var regex = e.data.regexString;
                var inputString = e.data.inputString;
                try {
                    var result = regex.test(inputString);
                    postMessage(result);
                } catch (error) {
                    postMessage(false); // En caso de error, devolver false
                }
            };
            `], { type: 'application/javascript' });
                const workerBlobURL = URL.createObjectURL(workerBlob);
                const worker = new Worker(workerBlobURL);
                worker.onmessage = function (e) {
                    const result = e.data;
                    //Release the Blob URL and terminate the worker after using it
                    URL.revokeObjectURL(workerBlobURL);
                    worker.terminate();
                    resolve(result);
                };
                //when crash/error
                worker.onerror = function (error) {
                    console.log(error);
                    //Release the Blob URL and terminate the worker after using it
                    URL.revokeObjectURL(workerBlobURL);
                    worker.terminate();
                    resolve(false);
                };
                setTimeout(() => {
                    URL.revokeObjectURL(workerBlobURL);
                    worker.terminate();
                    resolve(false);
                }, 250);
                //send parameters to worker
                worker.postMessage({
                    regexString: regex,
                    inputString: content,
                });
            });
        }
        utils.checkRegexWithWorker = checkRegexWithWorker;
        function wizardSetStep(e) {
            let def;
            let pageDef = flexygo.history.get($(e).closest('main')).defaults;
            if (pageDef) {
                if (typeof pageDef == 'string') {
                    def = JSON.parse(pageDef);
                }
                else {
                    def = pageDef;
                }
                if (def) {
                    if (def["step"] !== null && def["step"] !== undefined && def["step"] !== "") {
                        var initDate = Date.now();
                        var wizardInterval = setInterval(function () {
                            var wizardSteps = $(`flx-objectmanager .wizardnodes [href="#tab${def["step"]}"]`);
                            if (wizardSteps.length > 0) {
                                wizardSteps.click();
                                clearInterval(wizardInterval);
                            }
                            else {
                                var nowDate = Date.now();
                                if (nowDate - initDate > 10000) {
                                    clearInterval(wizardInterval);
                                }
                            }
                        }, 100);
                    }
                }
            }
        }
        utils.wizardSetStep = wizardSetStep;
        utils.showLoading = (element, text, position) => {
            var _a;
            let zIndex;
            if (isBlank(element)) {
                element = $('#mainContent');
            }
            //If there's already a loading shown on the same element we just don't show this one to avoid overlapping
            if ($(element).find('> .flx-loading-effect').length)
                return;
            if (((_a = element[0]) === null || _a === void 0 ? void 0 : _a.id) !== 'mainContent') {
                $(element).css('position', 'relative');
                zIndex = getZIndexElement(element);
            }
            let template = `
            <section ${zIndex ? `style="z-index: ${parseInt(zIndex) + 1};"` : ""}class="flx-loading-effect fadeIn animated${position ? " " + position : ""}">
                <span class="flx-loader-effect"></span>
                <div class="flx-loader-text">${text ? text : flexygo.localization.translate('utils.loading')}...</div>
            </section>`;
            $(element).append(template);
        };
        utils.showLoadingEffect = (time = 5000, element = null, text, position, noTimer = false) => {
            utils.showLoading(element, text, position);
            if (!noTimer) {
                setTimeout(function () {
                    flexygo.utils.removeLoadingEffect(element);
                }, time);
            }
        };
        utils.removeLoadingEffect = (element = null) => {
            if (isBlank(element)) {
                element = $('#mainContent');
            }
            const loading_element = $(element).find('> .flx-loading-effect');
            loading_element.addClass('fadeOut');
            loading_element.fadeOut("slow", function () {
                $(this).remove();
                if ($(element)[0].id != 'mainContent') {
                    $(element).css('position', '');
                }
            });
        };
        function getZIndexElement(elm) {
            let zindex;
            if (elm != undefined && $(elm)[0] !== $(document)[0]) {
                zindex = parseInt(getComputedStyle($(elm)[0]).getPropertyValue('z-index'));
                if (isNaN(zindex)) {
                    return getZIndexElement($(elm).parent()[0]);
                }
                return zindex;
            }
            else {
                if (isNaN(zindex)) {
                    return 0;
                }
                else {
                    return zindex;
                }
            }
        }
        function getObjectName(collection_name) {
            let obj = new flexygo.obj.Entity('sysObject', `ObjectName='${collection_name}'`);
            obj.read();
            return obj.data.ObjectChildName.Value;
        }
        utils.getObjectName = getObjectName;
        function saveFilterValueHistory(history, moduleName, activeFilter, filters) {
            let page = 0;
            if (!history.filtersValues) {
                history.filtersValues = new flexygo.nav.ModuleFilterHistory();
            }
            let histElem = {
                activeFilter: activeFilter,
                activePage: page,
                properties: filters
            };
            history.filtersValues[moduleName] = histElem;
            flexygo.history.historyLog.add('', history.description, history);
        }
        utils.saveFilterValueHistory = saveFilterValueHistory;
        function openEditWizard(mode, identifier) {
            let flxedit = $("<flx-edit/>");
            let flxeditwc = flxedit[0];
            flxeditwc.mode = "process";
            switch (mode) {
                case 'report':
                    flxeditwc.reportName = identifier;
                    break;
                case 'process':
                    flxeditwc.processName = identifier;
                    break;
                default:
                    flxeditwc.objectname = identifier;
            }
            flxeditwc.openConfig();
            var loadCloseBtn = setInterval(() => {
                if ($($('.ui-dialog')[$('.ui-dialog').length - 1]).find('.ui-dialog-titlebar-buttonpane button.ui-dialog-titlebar-close').length > 0) {
                    clearInterval(loadCloseBtn);
                    $($('.ui-dialog')[$('.ui-dialog').length - 1]).find('.ui-dialog-titlebar-buttonpane button.ui-dialog-titlebar-close').off("click").on('click.configure', (e) => {
                        $(e.target).closest('.ui-dialog').find('main.pageContainer').dialog("close");
                    });
                }
            }, 200);
        }
        utils.openEditWizard = openEditWizard;
        function switchBundleOptimization(e) {
            let check = $(e)[0];
            let checkVal = check.getValue();
            utils.changeSettingValue("BundleOptimization", checkVal.toString().toLowerCase());
            reloadCacheAndRefresh();
        }
        utils.switchBundleOptimization = switchBundleOptimization;
        function reloadCacheAndRefresh(delay = false) {
            flexygo.nav.execProcessObj({ processname: "ReloadQuietCache", objectname: "", objectwhere: "", targetid: "current", showProgress: false, excludeHist: true });
            if (delay) {
                setTimeout(() => { utils.showLoading(null, null, null); setTimeout(() => { location.reload(); }, 750); }, 600);
            }
            else {
                utils.showLoading(null, null, null);
                setTimeout(() => { location.reload(); }, 750);
            }
        }
        utils.reloadCacheAndRefresh = reloadCacheAndRefresh;
        function changeSettingValue(settingName, settingValue) {
            let obj = new flexygo.obj.Entity("sysSetting", `Settings.SettingName='${settingName}'`);
            obj.read();
            obj.data["SettingValue"].Value = settingValue;
            obj.update();
        }
        utils.changeSettingValue = changeSettingValue;
        function getSettingValue(settingName) {
            let obj = new flexygo.obj.Entity("sysSetting", `Settings.SettingName='${settingName}'`);
            obj.read();
            return isBlank(obj.data["SettingValue"].Value) ? "" : obj.data["SettingValue"].Value;
        }
        utils.getSettingValue = getSettingValue;
        /**
         * Calculates the remaining space on both sides of a given HTML Element
         * @param element - The element of which we want to knwo it's left and right space
         */
        function calculateSidesSpace(element) {
            const coordinates = element.getBoundingClientRect();
            const right_position = coordinates.x + coordinates.width;
            const right_space = window.innerWidth - right_position;
            const left_space = coordinates.x;
            return { right: right_space, left: left_space };
        }
        utils.calculateSidesSpace = calculateSidesSpace;
        function parseAIMessage(message) {
            let codeBlocks = message.match(/```(\w+)?([\s\S]*?)```/g);
            if (codeBlocks) {
                codeBlocks.forEach((codeBlock) => {
                    let language = 'plaintext';
                    let content = codeBlock;
                    let matchLanguage = codeBlock.match(/```(\w+)/);
                    if (matchLanguage) {
                        language = matchLanguage[1];
                        content = codeBlock.replace(/```(\w+)/, ''); // Elimina el nombre del lenguaje
                    }
                    content = content.replace(/```/img, '').trim(); // Elimina las comillas de apertura
                    if (language === 'chart') {
                        content = content.replace(/\n/img, '');
                        message = content;
                    }
                    else {
                        content = flexygo.string.escapeHTML(content);
                        content = content.replace(/\n/img, '&#10');
                        message = message.replace(codeBlock, `<flx-code forcecodemirror="true" returnEnabled="true" help mode="view" type="${language}" value="${content}"></flx-code>`);
                        message = `<p>${message}</p>`;
                    }
                });
            }
            else {
                message = flexygo.string.escapeHTML(message);
            }
            message = message.replace(/\n\n/img, '</p><p>');
            message = message.replace(/\n/img, '<br>');
            return message;
        }
        utils.parseAIMessage = parseAIMessage;
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
//Temporal hook to jQuery.data function while old web component syntax (.data('controller')) is rewrited to new web component syntax (HTMLElment descendant)
(function ($) {
    var olddata = $.fn.data;
    $.fn.data = function (key, value) {
        var getController = false;
        if (key && key === "controller") {
            if (arguments && arguments.length && arguments.length === 1) { //
                getController = true;
            }
        }
        var res = olddata.apply(this, arguments);
        if (!res) {
            if (getController === true) {
                //By convention, old elements has class name flxXXXXPrototype, and new elements flxXXXXXElement
                //In the latter case, return the element itself
                if (this.length > 0) {
                    let className = this[0].constructor.name.toLowerCase();
                    if (className.startsWith("flx") && className.endsWith("element")) {
                        console.warn('Warning: data("controller") is deprecated for ' + this.prop("tagName"));
                        res = this[0];
                    }
                }
            }
        }
        return res;
    };
})(jQuery);
function printText(text) {
    // Create a random name for the print frame.
    var strFrameName = ("printer-" + (new Date()).getTime());
    // Create an iFrame with the new name.
    var jFrame = $("<iframe name='" + strFrameName + "'>");
    jFrame.css("width", "1000px")
        .css("z-index", "100")
        .css("height", "800px")
        .css("position", "absolute")
        .css("left", "-9999px")
        .appendTo($("body:first"));
    // Get a FRAMES reference to the new frame.
    var objFrame = window.frames[strFrameName];
    // Get a reference to the DOM in the new frame.
    var objDoc = objFrame.document;
    // Write the HTML for the document. In this, we will
    // write out the HTML of the current element.
    objDoc.open();
    objDoc.write(text);
    objDoc.close();
    // Print the document.
    objFrame.focus();
    setTimeout(function () { objFrame.print(); }, 1000);
    // Have the frame remove itself in about a minute so that
    // we don't build up too many of these frames.
    setTimeout(function () {
        jFrame.remove();
    }, (60 * 1000));
}
// Create a jquery plugin that prints the given element.
jQuery.fn.print = function (title) {
    flexygo.utils.showLoading(null, flexygo.localization.translate('flxmodule.printing'));
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
        //.css("width", width + "px")
        //1000 so grid wont be displayed as lists
        .css("width", "1000px")
        .css("z-index", "100")
        .css("height", "800px")
        .css("position", "absolute")
        .css("left", "-9999px")
        // .css("top", "0px")
        // .css("left", "0px")
        .appendTo($("body:first"));
    // Get a FRAMES reference to the new frame.
    var objFrame = window.frames[strFrameName];
    // Get a reference to the DOM in the new frame.
    var objDoc = objFrame.document;
    // Grab all the style tags and copy to the new
    // document so that we capture look and feel of
    // the current document.
    // Create a temp document DIV to hold the style tags.
    var jStyleDiv = $("<div>")
        .append($("style").clone())
        .append($("link").clone())
        .append($("script").clone())
        .append('<link href="./css/skins/default/print.css" rel="stylesheet">');
    //We clone the print data and modify there the flx- that are not charts so they manualInit to avoid filters and other possible effects to not be applied
    let cloned_main = this.clone();
    cloned_main.find('*').filter(function () {
        const tag_name = this.tagName.toLowerCase();
        const needs_manualInit = tag_name.indexOf('flx-') === 0 && tag_name.indexOf('flx-chart') !== 0 && tag_name.indexOf('flx-easypie') !== 0 && tag_name.indexOf('flx-sparkline') !== 0;
        return needs_manualInit;
    }).attr('ManualInit', true);
    // Write the HTML for the document. In this, we will
    // write out the HTML of the current element.
    objDoc.open();
    objDoc.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">");
    objDoc.write("<html>");
    objDoc.write("<head>");
    objDoc.write("<title>");
    if (title)
        objDoc.write(title);
    else
        objDoc.write(document.title);
    objDoc.write("</title>");
    objDoc.write(jStyleDiv.html());
    //objDoc.write(SrcDiv.html());
    objDoc.write("</head>");
    objDoc.write("<body>");
    objDoc.write(cloned_main.html());
    objDoc.write("</body>");
    objDoc.write("</html>");
    objDoc.close();
    //Establecer valores para los edit
    const print_edits = $(objDoc).find('flx-module[type="flx-edit"]');
    print_edits.each((_, current_module) => {
        const current_module_name = current_module.getAttribute('modulename');
        const form_controls = $(`[modulename ="${current_module_name}"] [property]:visible`);
        form_controls.each((_, control) => {
            const property_name = control.getAttribute('property');
            const print_property = current_module.querySelectorAll(`[property ="${property_name}"] input`);
            print_property.forEach((input) => {
                input.value = control.getValue();
            });
        });
    });
    /*$(objDoc).find('flx-edit flx-text,flx-check,flx-dbcombo,flx-combo,flx-switch').each(function () {
        
        switch ($(this).prop("tagName").toLowerCase()) {
            case 'flx-dbcombo':
                $(this).find('input').attr('value', $(this).attr('text'));
                break;
            case 'flx-combo':
                $(this).find('select option[value="' + $(this).attr('value') + '"]').attr('selected','selected');
                break;
            case 'flx-check':
            case 'flx-switch':
                if ($(this).attr('value') == "true") {
                    $(this).find('input').attr('checked', 'checked');
                }
                break;
            default:
                $(this).find('input').attr('value', $(this).attr('value'));
        }
        
    });*/
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
        setEditsValues(objDoc);
        objFrame.print();
        flexygo.utils.removeLoadingEffect();
    }, 5500);
    // Have the frame remove itself in about a minute so that
    // we don't build up too many of these frames.
    setTimeout(function () {
        jFrame.remove();
    }, (60 * 1000));
};
function setEditsValues(objDoc) {
    //We loop through all edits that are gonna get printed
    const print_edits = $(objDoc).find('flx-edit');
    print_edits.each((_, current_print_edit) => {
        //We look for all the edit in the current page visible controls so we can use its values
        const current_module_name = current_print_edit.getAttribute('modulename');
        const form_controls = $(`flx-edit[modulename="${current_module_name}"] [property]:visible`);
        form_controls.each((_, control) => {
            const property_name = control.getAttribute('property');
            const print_property = current_print_edit.querySelector(`[property ="${property_name}"]`);
            const value = control.getText ? control.getText() : control.getValue();
            //We set the value on the control depending on its type
            switch (print_property.nodeName) {
                case 'FLX-SWITCH':
                    print_property.setValue(value);
                    break;
                case 'FLX-CHECK':
                    print_property.querySelector('input').checked = value;
                    break;
                case 'FLX-COMBO':
                    //We substitute the flx-combo so we can set its value without executing its corresponding SQL
                    let new_input = $('<input class="form-control"/>');
                    new_input.val(value);
                    $(print_property).children().replaceWith(new_input);
                    break;
                default:
                    $(print_property).find('input').val(value);
                    break;
            }
        });
    });
}
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
(function (flexygo) {
    var mail;
    (function (mail_1) {
        /**
        * Filters mail list Module with folder Name.
        * @method changeFolder
        * @param {string} folderId - new folder id.
        */
        function changeFolder(folderId, object) {
            let listMod;
            //Find list module using id
            if (object) {
                listMod = $('#mod-sysmod-mails-object')[0];
            }
            else {
                listMod = $('#mod-sysmod-mails')[0];
            }
            //If input  has value apply to additionalWhere
            if (folderId == '') {
                listMod.additionalWhere = null;
            }
            else {
                listMod.additionalWhere = 'Mails_Objects.FolderId = \'' + folderId + '\'';
            }
            //Refresh list module
            listMod.refresh();
        }
        mail_1.changeFolder = changeFolder;
        function viewLoaded(e, messageId) {
            $(e).find('iframe').contents().find("body").html($(e).find('.iframe').html());
            $(e).find('.iframe').remove();
            $(e).find('.attachments').html(flexygo.environment.getTemplate('sysMailsAttachments', 'Mails_Attachments.MessageId=\'' + messageId + '\'', 'SymailAttachmentList', null));
        }
        mail_1.viewLoaded = viewLoaded;
        function openMail(messageId, objectName, objectId, mail) {
            let itm = $('<flx-mailview></flx-mailview>');
            itm.attr('messageid', messageId);
            itm.attr('mode', 'bd');
            itm.attr('objectName', objectName);
            itm.attr('objectId', objectId);
            let cont = flexygo.targets.createContainer({ targetid: 'popup1280x1024', userid: flexygo.context.currentUserId }, false, $(this));
            if (!cont) {
                return;
            }
            cont.addClass('mailViewer');
            cont.html(itm);
            $(mail).parent().addClass('seen');
        }
        mail_1.openMail = openMail;
        /**
        * Open search dinamically from dbcombo
        * @method parseJavaString
        * @param {string} property - name dbcombo property.
        * @param {HTMLElement} me - search property.
        */
        function openSearch(property, me) {
            let combo = $(me).closest('flx-edit').find('flx-dbcombo[property=' + property + ']');
            let object = combo[0].getValue();
            let configObj;
            let comboObj;
            let config;
            let collection;
            let key;
            if (object) {
                //Get entity
                configObj = new flexygo.obj.Entity('Mail_Object_Config', 'Mails_Objects_Config.ObjectName = \'' + object + '\'');
                comboObj = new flexygo.obj.Entity(object);
                //Get collection name from object
                config = comboObj.getConfig();
                collection = config.ParentName;
                //Get key name from mail object config
                configObj.read();
                key = configObj.data["KeyProperty"].Value;
                flexygo.events.on(this, "entity", "selected", (e) => {
                    flexygo.events.off(this, "entity", "selected");
                    //Coger del objeto mail_object_config coger el campo para la key
                    let entity = e.sender;
                    let value = entity.data[key].Value;
                    $(me).val(value);
                    $(document).find('flx-search[objectname="' + collection + '"]').closest(".ui-dialog").remove();
                });
                flexygo.nav.openPage('search', collection, null, null, 'modal');
            }
        }
        mail_1.openSearch = openSearch;
    })(mail = flexygo.mail || (flexygo.mail = {}));
})(flexygo || (flexygo = {}));
/**
 * @namespace flexygo.utils.offline
 */
(function (flexygo) {
    var utils;
    (function (utils) {
        var offline;
        (function (offline) {
            /**
           * Init Offline Module.
           * @method initOfflineModule
           * @param {Element} moduleElement HTML Element.
           * @param {boolean} withHorizontalScroll With Horizontal Scroll.
           * @param {number} visibleElements Visible Elements.
           * @param {number} respectSpace Respect Space.
           *  @param {string} scrollContainerSelector Scroll Container Selector.
           */
            function initOfflineModule(moduleElement, withHorizontalScroll = false, visibleElements, respectSpace = 5, scrollContainerSelector = '.offline-container-items.horizontal') {
                $(moduleElement).find('[data-toggle="tooltip"]').tooltip({ container: 'body', trigger: 'hover', delay: { show: 600, hide: 0 } });
                if (withHorizontalScroll) {
                    let temporalScrollValue = null;
                    $(moduleElement).find(scrollContainerSelector).off('mousewheel.offline').on('mousewheel.offline', function (e, delta) {
                        temporalScrollValue = ((temporalScrollValue === null) ? this.scrollLeft : temporalScrollValue) - delta * (this.offsetWidth / visibleElements + respectSpace);
                        if (temporalScrollValue > (this.scrollWidth - this.clientWidth)) {
                            temporalScrollValue = this.scrollWidth - this.clientWidth;
                        }
                        else if (temporalScrollValue < 0) {
                            temporalScrollValue = 0;
                        }
                        this.scrollLeft = temporalScrollValue;
                        e.preventDefault();
                    });
                    //Necessary for: "CSS: scroll-behavior: smooth"
                    let checkScrollEnd = null;
                    $(moduleElement).find(scrollContainerSelector).off('scroll.offline').on('scroll.offline', function () {
                        if (checkScrollEnd !== null) {
                            clearTimeout(checkScrollEnd);
                        }
                        checkScrollEnd = setTimeout(function () {
                            temporalScrollValue = null;
                        }, 150);
                    });
                }
            }
            offline.initOfflineModule = initOfflineModule;
            /**
            * Show Related Info.
            * @method showRelatedInfo
            * @param {Element} triggerElement HTML Element.
            */
            function showRelatedInfo(triggerElement) {
                let jButton = $(triggerElement);
                let jObject = jButton.closest('[objectname]');
                let appName = jObject.attr('appname');
                let objectName = jObject.attr('objectname');
                let selectors = {
                    'flx-list#mod-sysofflineApp_Pages': `AppName = '${appName}' AND ObjectName = '${objectName}'`,
                    'flx-list#mod-sysofflineApp_Toolbars': '',
                    'flx-list#mod-sysofflineApp_views': `Offline = 1 AND ObjectName = '${objectName}'`,
                    'flx-list#mod-sysofflineApp_Processes': ''
                };
                //Remove and add individuality active class because use a standard template (.box) each object
                if (jObject.hasClass('active')) {
                    jObject.removeClass('active');
                    //jButton.closest('[pagename="offline_App_View"]').find(Object.keys(selectors).join(", ")).attr({ objectwhere: '1=0', 'related-objectname': null }).each((index: number, elem: flexygo.ui.wc.FlxListElement): void => { elem.refresh(); });
                    (jButton.closest('[pagename="offline_App_View"]').find('[modulename="sysofflineTabs"]').get(0)).refresh();
                }
                else {
                    jButton.closest('[pagename="offline_App_View"]');
                    jObject.addClass('active');
                    jObject.closest('flx-list').find(`.offline-container > div > [objectname].active:not([objectname="${objectName}"])`).removeClass('active').find('.buttons > .active').removeClass('active');
                    jButton.closest('[pagename="offline_App_View"]').find(Object.keys(selectors).join(", ")).attr({ 'related-objectname': objectName }).each((index, elem) => { $(elem).attr({ objectwhere: selectors[`flx-list#${elem.id}`] }); });
                }
            }
            offline.showRelatedInfo = showRelatedInfo;
            /**
            * Init Tabs Control.
            * @method initTabsControl
            * @param {Element} tabSection HTML Element.
            */
            function initTabsControl(tabSection) {
                let respetSpace = '10px';
                let barWidth = '100%';
                let jTabSection = $(tabSection);
                let jTabs = jTabSection.find('> nav > span:not(.separator)');
                let tabNumber = jTabs.length;
                let jTabsContent = jTabSection.find('> div.offline-tabs-container > div.offline-tab-content');
                //TODO: PERFECT ALIGNMENT (More than 2 tabs) If tab is not first or last, 'respetSpace' equal (respetSpace / 2) for '--offline-tab-bar-poistion
                if (jTabs.hasClass('active')) {
                    jTabSection[0].style.setProperty('--offline-tab-bar-width', `calc(${barWidth} / ${tabNumber} - ${respetSpace})`);
                    jTabSection[0].style.setProperty('--offline-tab-bar-poistion', `calc((${barWidth} / ${tabNumber} + ${respetSpace}) * ${jTabs.index(jTabs.filter('.active'))})`);
                    jTabsContent.css('transform', `translateX(calc(100% * ${jTabs.index(jTabs.filter('.active'))}))`);
                }
                jTabs.off('click.offlinetabs').on('click.offlinetabs', (e) => {
                    if (!$(e.currentTarget).hasClass('active')) {
                        jTabs.filter('.active').removeClass('active');
                        $(e.currentTarget).addClass('active');
                        jTabSection[0].style.setProperty('--offline-tab-bar-width', `calc(${barWidth} / ${tabNumber} - ${respetSpace})`);
                        jTabSection[0].style.setProperty('--offline-tab-bar-poistion', `calc((${barWidth} / ${tabNumber} + ${respetSpace}) * ${jTabs.index(jTabs.filter('.active'))})`);
                        jTabsContent.css('transform', `translateX(calc(100% * ${jTabs.index(jTabs.filter('.active'))}))`);
                        setTimeout(() => {
                            jTabs.removeClass('rippled').filter(`.active`).addClass('rippled');
                        }, 500);
                    }
                });
                /***********non-standardizable***********/
                flexygo.events.off(tabSection, 'module', 'loaded');
                flexygo.events.on(tabSection, 'module', 'loaded', function (ev) {
                    let modules = {
                        'sysofflineApp_Pages': 3,
                        'sysofflineApp_Toolbars': 1,
                        'sysofflineApp_views': 2,
                        'sysofflineApp_Processes': 2
                    };
                    if ($(ev.sender).attr('modulename') in modules) {
                        initOfflineModule(ev.sender, true, modules[$(ev.sender).attr('modulename')]);
                    }
                });
                /***********non-standardizable***********/
            }
            offline.initTabsControl = initTabsControl;
            /**
            * Get Attribute In Empty Template.
            * @method getAttributeInEmptyTemplate
            * @param {Element} element HTML Element.
            * @param {string} attributeName Attribute Name.
            * @returns {any} Atribute Value
            */
            function getAttributeInEmptyTemplate(element, attributeName) {
                return $(element).attr(attributeName);
            }
            offline.getAttributeInEmptyTemplate = getAttributeInEmptyTemplate;
            /**
            * Is Empty Attribute.
            * @method isEmptyAttribute
            * @param {Element} element HTML Element.
            * @param {string} attributeName Attribute Name.
            * @param {string} is is Value.
            * @param {string} notIs notIs Value.
            * @returns {any} Value of "is" or "notIs"
            */
            function isEmptyAttribute(element, attributeName, is, notIs) {
                if (flexygo.utils.isBlank($(element).attr(attributeName))) {
                    return is;
                }
                else {
                    return notIs;
                }
            }
            offline.isEmptyAttribute = isEmptyAttribute;
        })(offline = utils.offline || (utils.offline = {}));
    })(utils = flexygo.utils || (flexygo.utils = {}));
})(flexygo || (flexygo = {}));
(function (flexygo) {
    var utils;
    (function (utils) {
        var maintenance;
        (function (maintenance) {
            function isActive() {
                if (flexygo.utils.maintenanceMode) {
                    return true;
                }
                else {
                    return false;
                }
            }
            maintenance.isActive = isActive;
            function set(maintenanceDate) {
                flexygo.utils.maintenanceMode = (maintenanceDate ? maintenanceDate : null);
                check();
            }
            maintenance.set = set;
            function check() {
                if (isActive()) {
                    if ((moment.utc(flexygo.utils.maintenanceMode).local() < moment())) {
                        enable();
                    }
                    else {
                        setAdvice();
                        setTimeout(() => { check(); }, 10000);
                    }
                }
                else {
                    disable();
                }
            }
            maintenance.check = check;
            function enable() {
                if ($('#maintenanceAdvice').length > 0) {
                    $('#maintenanceAdvice').remove();
                }
                if ($('#maintenanceMode').length === 0) {
                    if (flexygo.profiles.username.toLocaleLowerCase() == 'admin') {
                        $('body > header #mainLogo').prepend(`<div id="maintenanceMode" onclick="event.stopPropagation();event.preventDefault();flexygo.nav.execProcess('DisableMaintenanceMode','','',null,null,'modal600x600',false,$(this),false);" class="fullbackground" style="font-size:1em;height:100%">
                                <div>
                                        <i class="flx-icon icon-settings icon-spin"></i><b>${flexygo.localization.translate('maintenance.logoMini')}</b>
                                        
                                </div>
                            </div>`);
                    }
                    else {
                        $('body').append(`<div id="maintenanceMode" class="fullscreen fullbackground">
                                <div>
                                        <i style="animation-duration:6s" class="flx-icon icon-settings icon-spin icon-5x"></i>
                                        <div><b>${flexygo.localization.translate('maintenance.title')}</b></div>
                                    <h1>${flexygo.localization.translate('maintenance.subtitle')}</h1>
                                </div>
                            </div>`);
                    }
                }
            }
            maintenance.enable = enable;
            function disable() {
                if ($('#maintenanceMode').length > 0) {
                    $('#maintenanceMode').remove();
                }
                if ($('#maintenanceAdvice').length > 0) {
                    $('#maintenanceAdvice').remove();
                }
            }
            maintenance.disable = disable;
            function setAdvice() {
                if ($('#maintenanceMode').length > 0) {
                    $('#maintenanceMode').remove();
                }
                if ($('#mainMenu > ul > li#maintenanceAdvice').length === 0) {
                    $('#mainMenu > ul').prepend(`<li id="maintenanceAdvice" title="${flexygo.localization.translate('maintenance.time')} ${moment.utc(flexygo.utils.maintenanceMode).local().locale(flexygo.profiles.culture).fromNow()}" class="right noText blink">
                <span><span><i class="fa fa-info-circle txt-danger"></i></span></span>
            </li>`);
                }
                $('#maintenanceAdvice').attr('title', flexygo.localization.translate('maintenance.time') + ' ' + moment.utc(flexygo.utils.maintenanceMode).local().locale(flexygo.profiles.culture).fromNow());
            }
            maintenance.setAdvice = setAdvice;
        })(maintenance = utils.maintenance || (utils.maintenance = {}));
    })(utils = flexygo.utils || (flexygo.utils = {}));
})(flexygo || (flexygo = {}));
(function (flexygo) {
    var utils;
    (function (utils) {
        var geTablesChangeTemplate;
        (function (geTablesChangeTemplate) {
            let is_showing_changes = false;
            function showChanges(button) {
                if (is_showing_changes)
                    return;
                is_showing_changes = true;
                const module = button.closest('#realMain').querySelector('flx-module[modulename="sysMod_GetTablesChanges"]');
                const list = module.querySelector('flx-list');
                const filter_date = list.querySelector('input').value + ":00";
                if (filter_date !== ':00') {
                    list.defaults = `{"FilterDate": "${filter_date}"}`;
                    module.objectdefaults = `{"FilterDate": "${filter_date}"}`;
                    list.refresh();
                }
                else {
                    flexygo.msg.warning(flexygo.localization.translate('getTableChangesPage.needsADate'));
                    is_showing_changes = false;
                }
            }
            geTablesChangeTemplate.showChanges = showChanges;
            function executeLoadedModuleFunctions() {
                let realMain = document.getElementById('realMain');
                let list = document.getElementById('mod-sysMod_GetTablesChanges');
                $(list).find('[value="true"]').click();
                //We change the is_showing_changes variable here so it will be changed just when module is loaded
                is_showing_changes = false;
                if (list.querySelector('td'))
                    realMain.querySelector('button.pressableBtn.warning').classList.remove('disabled');
            }
            geTablesChangeTemplate.executeLoadedModuleFunctions = executeLoadedModuleFunctions;
            let is_generating_script = false;
            function generateScript(button) {
                if (is_generating_script)
                    return;
                if (button.classList.contains('disabled')) {
                    flexygo.msg.warning(flexygo.localization.translate('getTableChangesPage.needsFiltering'));
                    return;
                }
                is_generating_script = true;
                let tables = '';
                const realMain = button.closest('#realMain');
                const flxList = realMain.querySelector('flx-list');
                flxList.querySelectorAll('input:checked').forEach(el => {
                    tables += el.getAttribute('tablename') + "|";
                });
                if (tables) {
                    flexygo.utils.showLoading(null, flexygo.localization.translate('getTableChangesPage.loading'));
                    const date = JSON.parse(flxList.defaults).FilterDate;
                    flexygo.nav.execProcess('GetTableChanges', null, null, null, [{ 'key': 'date', 'value': date }, { 'key': 'tables_string', 'value': tables }], 'current', true, $(button), res => {
                        //We add the script into the flx-code component
                        let script = "EXEC sp_MSforeachtable 'ALTER TABLE ? NOCHECK CONSTRAINT all'\nEXEC sp_MSforeachtable 'ALTER TABLE ? DISABLE TRIGGER all'\n";
                        script += res.Data.scripts.join('\n');
                        script += "EXEC sp_MSforeachtable 'ALTER TABLE ? ENABLE TRIGGER all'\nEXEC sp_MSforeachtable 'ALTER TABLE ? WITH CHECK CHECK CONSTRAINT ALL'\n";
                        realMain.querySelector('flx-code').setValue(script);
                        realMain.querySelector('button.pressableBtn.outstanding').classList.remove('disabled');
                        is_generating_script = false;
                        flexygo.utils.removeLoadingEffect();
                    }, false, null, (err) => {
                        is_generating_script = false;
                        flexygo.utils.removeLoadingEffect();
                        throw err;
                    });
                }
                else {
                    flexygo.msg.warning(flexygo.localization.translate('getTableChangesPage.selectATable'));
                    is_generating_script = false;
                }
            }
            geTablesChangeTemplate.generateScript = generateScript;
            let is_copying_script = false;
            function copyScriptToClipboard(button) {
                if (is_copying_script)
                    return;
                if (button.classList.contains('disabled')) {
                    flexygo.msg.warning(flexygo.localization.translate('getTableChangesPage.needsGenerating'));
                    return;
                }
                //We copy the script into the clipboard
                is_copying_script = true;
                const flxModule = button.closest('flx-module');
                const flxCode_value = flxModule.querySelector('flx-code').getValue();
                navigator.clipboard.writeText(flxCode_value);
                //We show a tooltip showing that the script has been copied
                const tooltip = $(button).find('.copiedTooltip');
                tooltip.fadeIn(400);
                setTimeout(() => {
                    tooltip.fadeOut(300);
                }, 1100);
                is_copying_script = false;
            }
            geTablesChangeTemplate.copyScriptToClipboard = copyScriptToClipboard;
        })(geTablesChangeTemplate = utils.geTablesChangeTemplate || (utils.geTablesChangeTemplate = {}));
    })(utils = flexygo.utils || (flexygo.utils = {}));
})(flexygo || (flexygo = {}));
(function (flexygo) {
    var utils;
    (function (utils) {
        var modules;
        (function (modules) {
            function loadingErrorFunction(module, error) {
                flexygo.exceptions.httpShow(error);
                if (module === null || module === void 0 ? void 0 : module.skeleton) {
                    const skeleton_component = module.querySelector('.flxSkeleton');
                    if (skeleton_component) {
                        skeleton_component.remove();
                    }
                    module.querySelector('.cntBody').classList.remove('displayingSkeleton');
                }
            }
            modules.loadingErrorFunction = loadingErrorFunction;
            function groupButtonActive(e, groupName) {
                return (e.hasGroup(groupName) ? 'bg-outstanding' : 'btn-outstanding');
            }
            modules.groupButtonActive = groupButtonActive;
            function removeSkeleton(module) {
                var _a, _b;
                if (module.skeleton) {
                    //If there's a scroll saved we restore it
                    if (module.skeleton_scroll) {
                        let module_container = module.closest('#mainContent');
                        if (!module_container)
                            module_container = module.closest('main');
                        module_container.scrollTop = module.skeleton_scroll;
                    }
                    (_a = module.querySelector('.flxSkeleton')) === null || _a === void 0 ? void 0 : _a.remove();
                    (_b = module.querySelector('.cntBody')) === null || _b === void 0 ? void 0 : _b.classList.remove('displayingSkeleton');
                }
            }
            modules.removeSkeleton = removeSkeleton;
            function openEditTemplate(module) {
                if ($(module).find('[property="TemplateId"]').length > 0) {
                    let templateId = $(module).find('[property="TemplateId"]')[0].getValue();
                    if (!flexygo.utils.isBlank(templateId)) {
                        let where = `TemplateId='${templateId}'`;
                        flexygo.nav.openPage('edit', 'sysObjectTemplate', where, null, 'new', false);
                        let dialogs = $('main.ui-dialog-content');
                        dialogs.dialog('close');
                    }
                }
            }
            modules.openEditTemplate = openEditTemplate;
            function getActiveModuleType(module) {
                //If the module is not a tab module we just return its WebComponent
                if (module.moduleConfig.WebComponent !== 'flx-moduletab')
                    return module.moduleConfig.WebComponent;
                //If its is we search for its active module and get its tagName
                return searchLastChildTypeFromTab(module.module[0]);
            }
            modules.getActiveModuleType = getActiveModuleType;
            function searchLastChildTypeFromTab(current_tab) {
                while (true) {
                    //If its a not initialized tab
                    if (!(current_tab === null || current_tab === void 0 ? void 0 : current_tab.activeModule))
                        return 'flx-moduletab';
                    //If the tab active name is not another tab we return that modules type
                    if (!current_tab.activeModule.WebComponent.startsWith('flx-moduletab'))
                        return current_tab.activeModule.WebComponent;
                    //If the tab child is other tab we set this as the current_tab and continue searching for the active child type
                    current_tab = current_tab.querySelector(`flx-moduletab[modulename="${current_tab.activeModule.ModuleName}"]`);
                }
            }
        })(modules = utils.modules || (utils.modules = {}));
    })(utils = flexygo.utils || (flexygo.utils = {}));
})(flexygo || (flexygo = {}));
(function (flexygo) {
    var utils;
    (function (utils) {
        var toolbar;
        (function (toolbar) {
            function sortButtons(e) {
                let paramOrder = [], params = [];
                let containers = $(e).find(".flx-toolbar-buttons-sortable-container");
                let sortId = flexygo.utils.uniqueUUID();
                $(e).attr("sort-id", sortId);
                $(containers).sortable({
                    connectWith: `[sort-id="${sortId}"] .flx-toolbar-buttons-sortable-container`,
                    stop: function (evt, ui) {
                        if ($(e).find("#flx-toolbar-buttons-remove.toRemove").length == 0) {
                            let element = ui.item;
                            let container = $(element).closest('.flx-toolbar-buttons-sortable-container');
                            let positionId = $(container).attr("positionid");
                            let buttons = container.find("li");
                            paramOrder = [], params = [];
                            for (var i = 0; i < buttons.length; i++) {
                                paramOrder.push({ 'ButtonId': $(buttons[i]).attr("buttonid"), 'PositionId': positionId, 'ButtonOrder': i });
                            }
                            params.push({ 'key': 'UserId', 'value': flexygo.context.currentReference }, { 'key': 'OrderedToolBarsButtons', 'value': JSON.stringify(paramOrder) });
                            flexygo.nav.execProcess("pNet_SaveToolBarsButtonsOrder", "", "", null, params, "popup", false, $(this), false, false);
                        }
                        else {
                            $(e).find("#flx-toolbar-buttons-remove").removeClass("toRemove");
                        }
                    }
                });
                $(containers).disableSelection();
                $(e).find("#flx-toolbar-buttons-remove").droppable({
                    accept: `[sort-id="${sortId}"] .flx-toolbar-buttons-sortable-container > li`,
                    activeClass: "flx-toolbar-buttons-remove-highlight",
                    hoverClass: "flx-toolbar-buttons-remove-hover",
                    drop: function (event, ui) {
                        let element = ui.draggable;
                        $(this).addClass("toRemove");
                        flexygo.ui.wc.FlxModuleElement.prototype.deleteModule('sysButton', `ButtonId='${$(element).attr("buttonid")}'`, $(this).closest('flx-module'), $(this));
                    },
                });
            }
            toolbar.sortButtons = sortButtons;
        })(toolbar = utils.toolbar || (utils.toolbar = {}));
    })(utils = flexygo.utils || (flexygo.utils = {}));
})(flexygo || (flexygo = {}));
(function (flexygo) {
    var utils;
    (function (utils) {
        var processes;
        (function (processes) {
            function objectToKeyValue(object) {
                return Object.entries(object).map(([key, value]) => ({ key, value }));
            }
            processes.objectToKeyValue = objectToKeyValue;
        })(processes = utils.processes || (utils.processes = {}));
    })(utils = flexygo.utils || (flexygo.utils = {}));
})(flexygo || (flexygo = {}));
(function (flexygo) {
    var utils;
    (function (utils) {
        var scriptjob;
        (function (scriptjob) {
            function sort(e) {
                let containers = $(e).closest('.flx-scriptjobs-sortable').find(".flx-scriptjobs-sortable-container");
                if ($(e).val()) {
                    let paramOrder = [], params = [];
                    let sortId = flexygo.utils.uniqueUUID();
                    $(e).attr("sort-id", sortId);
                    $(containers).sortable({
                        //connectWith: `[sort-id="${sortId}"] .flx-scriptjobs-sortable-container`,
                        tolerance: "pointer",
                        start: function (event, ui) {
                            var height = ui.item.outerHeight();
                            var width = ui.item.outerWidth() - 20;
                            ui.placeholder.height(height);
                            ui.placeholder.width(width);
                        },
                        stop: function (evt, ui) {
                            let element = ui.item;
                            let container = $(element).closest('.flx-scriptjobs-sortable-container');
                            let scripts = container.find("div[scriptid]");
                            paramOrder = [], params = [];
                            for (var i = 0; i < scripts.length; i++) {
                                paramOrder.push({ 'ScriptId': $(scripts[i]).attr("scriptid"), 'ButtonOrder': i });
                            }
                            params.push({ 'key': 'UserId', 'value': flexygo.context.currentReference }, { 'key': 'OrderedScripts', 'value': JSON.stringify(paramOrder) });
                            flexygo.nav.execProcess("pNet_SaveScriptJobsOrder", "", "", null, params, "popup", false, $(this), false, false);
                        }
                    });
                    $(containers).disableSelection();
                }
                else {
                    $(containers).sortable("destroy");
                }
            }
            scriptjob.sort = sort;
        })(scriptjob = utils.scriptjob || (utils.scriptjob = {}));
    })(utils = flexygo.utils || (flexygo.utils = {}));
})(flexygo || (flexygo = {}));
//# sourceMappingURL=util.js.map