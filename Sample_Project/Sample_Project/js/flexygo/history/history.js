/**
* Library to manage navigation history items.
*
* @class flexygo.history
*/
window.onpopstate = function (event) {
    if (event.state) {
        if (event.state.targetid == 'current' || event.state.targetid == 'main') {
            event.state.targetid = 'main';
            $('#realMain').data('context', event.state);
            flexygo.history.go(event.state);
        }
    }
    else {
        flexygo.nav.goHome(true);
    }
};
var flexygo;
(function (flexygo) {
    var history;
    (function (history) {
        class Base64 {
            static encode(e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = this._utf8_encode(e); while (f < e.length) {
                n = e.charCodeAt(f++);
                r = e.charCodeAt(f++);
                i = e.charCodeAt(f++);
                s = n >> 2;
                o = (n & 3) << 4 | r >> 4;
                u = (r & 15) << 2 | i >> 6;
                a = i & 63;
                if (isNaN(r)) {
                    u = a = 64;
                }
                else if (isNaN(i)) {
                    a = 64;
                }
                t = t + this.keyStr.charAt(s) + this.keyStr.charAt(o) + this.keyStr.charAt(u) + this.keyStr.charAt(a);
            } return t; }
            static decode(e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); while (f < e.length) {
                s = this.keyStr.indexOf(e.charAt(f++));
                o = this.keyStr.indexOf(e.charAt(f++));
                u = this.keyStr.indexOf(e.charAt(f++));
                a = this.keyStr.indexOf(e.charAt(f++));
                n = s << 2 | o >> 4;
                r = (o & 15) << 4 | u >> 2;
                i = (u & 3) << 6 | a;
                t = t + String.fromCharCode(n);
                if (u != 64) {
                    t = t + String.fromCharCode(r);
                }
                if (a != 64) {
                    t = t + String.fromCharCode(i);
                }
            } t = this._utf8_decode(t); return t; }
            static _utf8_encode(e) { e = e.replace(/\r\n/g, "\n"); var t = ""; for (var n = 0; n < e.length; n++) {
                var r = e.charCodeAt(n);
                if (r < 128) {
                    t += String.fromCharCode(r);
                }
                else if (r > 127 && r < 2048) {
                    t += String.fromCharCode(r >> 6 | 192);
                    t += String.fromCharCode(r & 63 | 128);
                }
                else {
                    t += String.fromCharCode(r >> 12 | 224);
                    t += String.fromCharCode(r >> 6 & 63 | 128);
                    t += String.fromCharCode(r & 63 | 128);
                }
            } return t; }
            static _utf8_decode(e) { var t = ""; var n = 0; var r = 0; var c1 = 0; var c2 = 0; var c3 = 0; while (n < e.length) {
                r = e.charCodeAt(n);
                if (r < 128) {
                    t += String.fromCharCode(r);
                    n++;
                }
                else if (r > 191 && r < 224) {
                    c2 = e.charCodeAt(n + 1);
                    t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                    n += 2;
                }
                else {
                    c2 = e.charCodeAt(n + 1);
                    c3 = e.charCodeAt(n + 2);
                    t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                    n += 3;
                }
            } return t; }
        }
        Base64.keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        history.Base64 = Base64;
        //if (typeof flexygo.history.historyLog == 'undefined') { flexygo.history.historyLog = new Object(); }
        function go(hist) {
            if (typeof hist.hideNavbar != 'undefined' && hist.hideNavbar) {
                $('#mainNav').hide();
                $('#mainNav').attr('minimized', 'True');
                $('#miniButton i').removeClass('flipped');
            }
            if (typeof hist.hideMenuBar != 'undefined' && hist.hideMenuBar) {
                $('#mainMenu').hide();
                $('#mainMenu').attr('minimized', 'True');
                $('header').hide();
            }
            $('#realMain').data('context', hist);
            switch (hist.navigateFun.toLowerCase()) {
                case 'openpage':
                    flexygo.nav.openPage(hist.pagetypeid, hist.objectname, hist.objectwhere, hist.defaults, hist.targetid, true, null, null, hist);
                    break;
                case 'openpagename':
                    flexygo.nav.openPageName(hist.pagename, hist.objectname, hist.objectwhere, hist.defaults, hist.targetid, true, null, null, hist);
                    break;
                case 'openhelpid':
                    flexygo.nav.openHelpId(hist.helpid, hist.targetid, true);
                    break;
                case 'openedittable':
                    flexygo.nav.openEditTable(hist.tablename, hist.targetid, hist.tabledescrip, true);
                    break;
                case 'openreportsparams':
                    flexygo.nav.openReportsParams(hist.reportname, hist.reportwhere, hist.objectname, hist.objectwhere, hist.defaults, hist.targetid, true);
                    break;
                case 'openprocessparams':
                    flexygo.nav.openProcessParams(hist.processname, hist.objectname, hist.objectwhere, hist.defaults, hist.targetid, true);
                    break;
            }
        }
        history.go = go;
        function get(targetId) {
            let parentContext;
            if ($(targetId).is('.pageContainer')) {
                parentContext = $(targetId);
            }
            else {
                parentContext = $(targetId).closest('.pageContainer');
            }
            return parentContext.data('context');
        }
        history.get = get;
        function getPageName(targetId) {
            let hist = flexygo.history.get(targetId);
            if (hist && typeof hist.pagename != 'undefined') {
                return hist.pagename;
            }
            else {
                return null;
            }
        }
        history.getPageName = getPageName;
        function refresh(targetId) {
            let hist = flexygo.history.get(targetId);
            flexygo.history.go(hist);
        }
        history.refresh = refresh;
        function set(histObj) {
            let url = null;
            if (flexygo.utils.deepLinking) {
                var dataObj = new Object();
                for (let key in histObj) {
                    if (histObj[key] != null && histObj[key] != '') {
                        if (key.toLowerCase() != 'target' && key.toLowerCase() != 'gridpagenumber' && key.toLowerCase() != 'gridpagesize' && key.toLowerCase() != 'icon' && key.toLowerCase() != 'descrip') {
                            dataObj[key] = histObj[key];
                        }
                    }
                }
                url = flexygo.utils.resolveUrl('~/Index') + '#' + flexygo.history.Base64.encode(JSON.stringify(dataObj));
            }
            window.history.pushState(histObj, null, url);
        }
        history.set = set;
        function replace(dataObj, targetId, excludeHist) {
            let url = null;
            if (flexygo.utils.deepLinking && targetId.closest('main').is('#realMain')) {
                url = flexygo.utils.resolveUrl('~/Index') + '#' + flexygo.history.Base64.encode(JSON.stringify(dataObj));
            }
            if (targetId.closest('main').is('#realMain')) {
                window.history.replaceState(dataObj, null, url);
            }
            if (targetId && targetId.length > 0) {
                $(targetId).closest('.pageContainer').data('context', dataObj);
            }
        }
        history.replace = replace;
        function getDefaults(objectname, item) {
            let histObj = flexygo.history.get(item);
            if (typeof histObj != 'undefined' && histObj.defaults && histObj.defaults != '') {
                if (flexygo.utils.areParents(histObj.objectname, objectname)) {
                    return histObj.defaults;
                }
            }
            return null;
        }
        history.getDefaults = getDefaults;
    })(history = flexygo.history || (flexygo.history = {}));
})(flexygo || (flexygo = {}));
(function (flexygo) {
    var history;
    (function (history) {
        var historyLog;
        (function (historyLog) {
            function add(icon, description, historyObj) {
                var list = flexygo.storage.local.get('historyLog');
                if (list == null) {
                    list = new Array();
                }
                if (!icon || icon == '') {
                    icon = 'flx-icon icon-document';
                }
                historyObj.icon = icon + ' icon-margin-right';
                historyObj.description = description;
                var indexInArray = flexygo.utils.indexOfObject(list, historyObj, ["filtersValues"]);
                if (indexInArray > -1) {
                    var newArr = new Array();
                    for (var i = 0; i < list.length; i++) {
                        if (i != indexInArray) {
                            newArr.push(list[i]);
                        }
                    }
                    list = newArr;
                }
                list.splice(0, 0, historyObj);
                list = list.slice(0, 50);
                flexygo.storage.local.add('historyLog', list);
            }
            historyLog.add = add;
            function show(triggerElement) {
                var list = flexygo.storage.local.get('historyLog');
                var ulList = triggerElement.closest('li').find('ul');
                if (ulList.length == 0) {
                    ulList = $('<ul/>');
                    triggerElement.closest('li').append(ulList);
                }
                ulList.empty();
                if (list != null) {
                    for (var i = 0; i < list.length && i < 10; i++) {
                        let itm = flexygo.history.historyLog.getItem(list[i]);
                        ulList.append(itm);
                    }
                    if (list.length >= 10) {
                        let itm = $('<li class="showMore"/>').append('<i>' + flexygo.localization.translate('history.showmore') + '</i></li>');
                        itm.on('click', function () { flexygo.history.historyLog.showAll(); });
                        ulList.append(itm);
                    }
                }
                if (ulList.html() == '') {
                    ulList.append('<li><i>' + flexygo.localization.translate('history.historyempty') + '</i></li>');
                }
                triggerElement.attr('class', 'item-opened active');
                ulList.slideDown(500);
            }
            historyLog.show = show;
            function showAll(triggerElement) {
                var list = flexygo.storage.local.get('historyLog');
                if (list != null) {
                    if (list.length > 0) {
                        let histObj = new flexygo.nav.FlexygoHistory();
                        histObj.targetid = 'modal640x480';
                        var container = flexygo.targets.createContainer(histObj, true, null, true);
                        var ulList = $('<ul class="dialog-menu nolist"/>');
                        for (var i = 0; i < list.length; i++) {
                            var itm = flexygo.history.historyLog.getItem(list[i]);
                            ulList.append(itm);
                        }
                        //container.html(ulList.html());
                        container.html("");
                        container.append(ulList);
                    }
                }
            }
            historyLog.showAll = showAll;
            function getItem(histItm) {
                var pageType = '';
                switch (histItm.pagetypeid) {
                    case 'list':
                        pageType = '<i class="flx-icon icon-list" title="list"></i>';
                        break;
                    case 'view':
                        pageType = '<i class="flx-icon icon-eye" title="view"></i>';
                        break;
                    case 'edit':
                        pageType = '<i class="flx-icon icon-pencil" title="edit"></i>';
                        break;
                }
                var ret = $('<li/>').append('<span><i class="' + histItm.icon + '" /> ' + histItm.description + '<small class="text-muted pull-right">' + pageType + '</small></span>');
                ret.on('click', function () {
                    flexygo.history.go(histItm);
                });
                return ret;
            }
            historyLog.getItem = getItem;
        })(historyLog = history.historyLog || (history.historyLog = {}));
    })(history = flexygo.history || (flexygo.history = {}));
})(flexygo || (flexygo = {}));
//# sourceMappingURL=history.js.map