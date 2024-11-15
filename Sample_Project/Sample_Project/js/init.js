$(function () {
    $(document).on('ready', initPage);
    flexygo.events.on(this, 'page', 'loading', function (e) {
        NProgress.start();
    });
    flexygo.events.on(this, 'page', 'loaded', function (e) {
        NProgress.done();
    });
    flexygo.events.on(this, 'message', 'all', function (e) {
        if (e.type === 'exception') {
            flexygo.exceptions.httpShow(e.sender);
        }
        else {
            flexygo.msg.generic(e.detailIdentity, null, e.masterIdentity, null, e.type);
        }
    });
    flexygo.events.on(this, 'push', 'notify', function (e) {
        switch (e.masterIdentity) {
            case 'UpdateLocalStorage': {
                flexygo.storage.local.remove(e.sender.Key);
                flexygo.storage.local.add(e.sender.Key, JSON.parse(e.sender.Value));
                break;
            }
            case 'DeleteLocalStorage': {
                flexygo.storage.local.remove(e.sender.Key);
                break;
            }
            default: {
                break;
            }
        }
    });
    window.addEventListener("dragenter", function (e) {
        e.preventDefault();
    }, false);
    window.addEventListener("dragover", function (e) {
        e.preventDefault();
    });
    window.addEventListener("drop", function (e) {
        e.preventDefault();
    });
    window.addEventListener('resize', resizeMain);
    //bug uidialog modal jquery, ticket 3192
    // --https://stackoverflow.com/questions/33196044/maximum-call-stack-size-exceeded-in-dialog-open
    $.ui.dialog.prototype._createOverlay = function () {
        if (!this.options.modal) {
            return;
        }
        var isOpening = true;
        this._delay(function () {
            isOpening = false;
        });
        this.overlay = $("<div>")
            .addClass("ui-widget-overlay ui-front")
            .appendTo(this._appendTo());
        this.document.data("ui-dialog-overlays", (this.document.data("ui-dialog-overlays") || 0) + 1);
    };
});
/**
* Init App.
* @method initApp
*/
function initApp() {
    flexygo.storage.session.reset();
    flexygo.storage.local.load();
    $(window).unload(function () {
        if (flexygo.storage.local._saveTimer) {
            clearTimeout(flexygo.storage.local._saveTimer);
            flexygo.storage.local.save();
        }
    });
}
/**
* Init Page.
* @method initPage
*/
function initPage() {
    let main, footer, sidepanel, hist;
    main = $('main#realMain');
    footer = $('<flx-footermenu id="mainFooterMenu"></flx-footer>');
    sidepanel = $('<flx-sidepanel id="mainSidePanel"></flx-sidepanel>');
    main.after(footer);
    main.after(footer);
    footer.after(sidepanel);
    $('body').append('<flx-contextmenu id="flx-menu"></flx-contextmenu>');
    //Solucionado error en Ipad Chrome testeado en Ipad Pro 11 pulgadas
    if (flexygo.utils.isAgentMobile() && !flexygo.utils.isSizeMobile() && !navigator.userAgent.match(/(iPad)/)) {
        $('meta[name="viewport"]').attr('content', 'width=' + (parseInt(flexygo.utils.size.m.toString().replace('px', '')) - 5) + 'px');
    }
    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
        $('meta[name=viewport]').attr("content", $('meta[name=viewport]').attr("content") + ', maximum-scale=1, user-scalable=0');
    }
    if (flexygo.utils.isAgentMobile() && flexygo.utils.isSizeMobile()) {
        $(document).on('mousedown', function (ev) {
            if ($(ev.target).closest('#mainMenu, #mainNav, #buttonNav, #buttonMenu').length === 0 && !$(ev.target).is('#mainMenu, #mainNav, #buttonNav, #buttonMenu')) {
                if ($('#mainMenu').is(':visible')) {
                    flexygo.nav.toggleFlxnav($('#mainMenu'));
                }
                else if ($('#mainNav').is(':visible')) {
                    flexygo.nav.toggleFlxnav($('#mainNav'));
                }
            }
        });
    }
    if (flexygo.utils.isTactilModeActive()) {
        $('html').addClass("tactilMode");
    }
    $('#flx-goUpArrow')[0].title = flexygo.localization.translate('navigation.scrolltop');
    if (flexygo.utils.isSizeMobile()) {
        window.addEventListener('scroll', function (e) {
            if ($(window).scrollTop() > flexygo.utils.scroll.minheight && flexygo.utils.scroll.minheight >= 0) {
                $('#flx-goUpArrow').addClass("flx-showBottom");
            }
            else {
                $('#flx-goUpArrow').removeClass("flx-showBottom");
            }
        });
    }
    else {
        $('div#mainContent').scroll(function () {
            if ($('div#mainContent')[0].scrollTop > flexygo.utils.scroll.minheight && flexygo.utils.scroll.minheight >= 0) {
                $('#flx-goUpArrow').addClass("flx-showBottom");
            }
            else {
                $('#flx-goUpArrow').removeClass("flx-showBottom");
            }
        });
    }
    $('#flx-goUpArrow').click(function () {
        flexygo.utils.scrollTo(0);
    });
    let oldIcon, newIcon;
    if (flexygo.utils.isFullScreenActive()) {
        oldIcon = "icon-expand-4";
        newIcon = "icon-collapse";
    }
    else {
        oldIcon = "icon-collapse";
        newIcon = "icon-expand-4";
    }
    $('#mainMenu li[title="Toggle full screen"] i').removeClass(oldIcon);
    $('#mainMenu li[title="Toggle full screen"] i').addClass(newIcon);
    let param = flexygo.utils.querystring.getParamValue(document.location.href, 'u');
    if (param) {
        let dataObj = flexygo.history.Base64.decode(param);
        hist = JSON.parse(dataObj);
        window.history.replaceState(hist, null, flexygo.utils.resolveUrl('~/Index') + '#' + param);
    }
    else {
        hist = getUrlObject();
    }
    if (hist) {
        if (typeof hist.hideNavbar !== 'undefined' && hist.hideNavbar === true) {
            $('#mainNav').hide().attr('minimized', 'True');
            $('#miniButton i').removeClass('flipped');
        }
        if (typeof hist.hideMenuBar !== 'undefined' && hist.hideMenuBar === true) {
            $('#mainMenu').hide().attr('minimized', 'True');
            $('header').hide();
        }
    }
    $('body').show(500, function () { loadPage(hist); });
    flexygo.utils.onlineCheck(60000);
    flexygo.utils.maintenance.check();
    flexygo.events.on(this, 'process', 'executed', (ev) => {
        if (ev.masterIdentity == 'ToggleMaintenanceMode') {
            flexygo.utils.maintenance.set(ev.detailIdentity);
        }
        else if (ev.masterIdentity == 'RefreshScreenFromServer') {
            document.location.reload();
        }
    });
    initValidateTranslate();
    if (flexygo.debug && flexygo.debug.isDevelopMode && flexygo.debug.isDevelopMode()) {
        flexygo.debug.enableDevelopMode(true, false);
    }
    if (flexygo.context.currentUserLogin === 'admin' && flexygo.utils.TelemetryEnabled === '') {
        flexygo.nav.execProcess("IsRunningInVisualStudio", "", "", null, null, "current", false, $(this), ret => {
            if (!ret.Data.running_on_vs) {
                Lobibox.confirm({
                    title: flexygo.localization.translate('msg.noticetitle'),
                    msg: flexygo.localization.translate('msg.noticemsg'),
                    iconClass: 'flx-icon icon-information-3',
                    closeButton: false,
                    buttonsAlign: 'center',
                    buttons: {
                        accept: {
                            'class': 'lobibox-btn lobibox-btn-yes',
                            text: flexygo.localization.translate('msg.noticeaccept'),
                            closeOnClick: true
                        }
                    },
                    callback: (dlg, type, ev) => {
                        if (type == "accept") {
                            flexygo.nav.execProcess('SetTelemetry', '', '', null, [{ 'Key': 'Value', 'Value': 'true' }], 'current', false, $(this), null, false);
                        }
                    }
                });
            }
        }, false);
    }
    $(document).on('keydown', function (ev) {
        if (ev.ctrlKey && ev.key === 's') {
            ev.preventDefault();
        }
    });
}
/**
* Resize Main.
* @method resizeMain
*/
function resizeMain() {
    if (!flexygo.utils.isSizeMobile()) {
        $('#mainBlock').css('min-height', (!($('body.header-follows').length > 0 || $('body.header-overflow').length > 0)) ? $(window).height() - $('header:first').outerHeight() + 'px' : '100%');
    }
}
/**
* Load Page.
* @method loadPage
* @param {flexygo.nav.FlexygoHistory} hist History.
*/
function loadPage(hist) {
    if (hist) {
        flexygo.history.go(hist);
        if (hist.successMessage) {
            flexygo.msg.success(hist.successMessage);
        }
        if (hist.errorMessage) {
            flexygo.msg.error(hist.errorMessage);
        }
    }
    else {
        flexygo.nav.goHome(true);
    }
    flexygo.localization.init();
    resizeMain();
}
/**
* Get Url Object.
* @method getUrlObject
* @return {flexygo.nav.FlexygoHistory}
*/
function getUrlObject() {
    try {
        let b64, items;
        b64 = $.trim(document.location.href);
        if (b64.endsWith('#')) {
            b64 = b64.substring(0, b64.length - 1);
        }
        if (b64.endsWith('/')) {
            b64 = b64.substring(0, b64.length - 1);
        }
        if (b64.endsWith('#')) {
            b64 = b64.substring(0, b64.length - 1);
        }
        items = b64.split('/');
        b64 = items[items.length - 1];
        if (b64.toLowerCase().startsWith('index#')) {
            b64 = b64.substring(6);
            return JSON.parse(flexygo.history.Base64.decode(b64));
        }
        return null;
    }
    catch (e) {
        return null;
    }
}
function initValidateTranslate() {
    $.validator.messages = {
        required: flexygo.localization.translate('validateform.required'),
        remote: "Please fix this field.",
        email: "Please enter a valid email address.",
        url: "Please enter a valid URL.",
        date: "Please enter a valid date.",
        dateISO: "Please enter a valid date ( ISO ).",
        number: "Please enter a valid number.",
        digits: "Please enter only digits.",
        equalTo: "Please enter the same value again.",
        maxlength: $.validator.format("Please enter no more than {0} characters."),
        minlength: $.validator.format("Please enter at least {0} characters."),
        rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
        range: $.validator.format("Please enter a value between {0} and {1}."),
        max: $.validator.format("Please enter a value less than or equal to {0}."),
        min: $.validator.format("Please enter a value greater than or equal to {0}."),
        step: $.validator.format("Please enter a multiple of {0}.")
    };
}
//# sourceMappingURL=init.js.map