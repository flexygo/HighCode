function initApp() {
    flexygo.storage.session.reset();
    flexygo.storage.local.load();
    $(window).unload(function () {
        if (flexygo.storage.local._saveTimer !== null) {
            clearTimeout(flexygo.storage.local._saveTimer);
            flexygo.storage.local.save();
        }
    });

}

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
        } else {
            flexygo.msg.generic(e.detailIdentity, null, e.masterIdentity, null, e.type);
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
});

function initPage() {

    var main = $('main#realMain');
    var footer = $('<flx-footermenu id="mainFooterMenu"></flx-footer>');
    main.after(footer);
    var sidepanel = $('<flx-sidepanel id="mainSidePanel"></flx-sidepanel>');
    footer.after(sidepanel);

    $('body').append('<flx-contextmenu id="flx-menu"></flx-contextmenu>')


    if (flexygo.debug.isDevelopMode()) {
        flexygo.debug.enableDevelopMode(true, false);
    }



    if (flexygo.utils.isAgentMobile() && !flexygo.utils.isSizeMobile()) {
        $('[name="viewport"]').attr('content', 'width=' + (parseInt(flexygo.utils.size.m.toString().replace('px', '')) - 5) + 'px')
    }

    if (flexygo.utils.isAgentMobile() && flexygo.utils.isSizeMobile()) {

        $(document).on('mousedown', function (ev) {

            if ($(ev.target).closest('#mainMenu, #mainNav, #buttonNav, #buttonMenu').length === 0 && !$(ev.target).is('#mainMenu, #mainNav, #buttonNav, #buttonMenu')) {

                if ($('#mainMenu').is(':visible')) {
                    flexygo.nav.toggleFlxnav($('#mainMenu'));
                } else if ($('#mainNav').is(':visible')) {
                    flexygo.nav.toggleFlxnav($('#mainNav'));
                }
            }

        });

    }

    var hist = getUrlObject();

    if (hist) {
        if (typeof hist.hideNavbar !== 'undefined' && hist.hideNavbar === true) {
            $('#mainNav').hide();
            $('#mainNav').attr('minimized', 'True');
            $('#miniButton i').removeClass('flipped');
        }

        if (typeof hist.hideMenuBar !== 'undefined' && hist.hideMenuBar === true) {
            $('#mainMenu').hide();
            $('#mainMenu').attr('minimized', 'True');
            $('header').hide();

        }
    }

    $('body').show(500, function () { loadPage(hist); });
    flexygo.utils.onlineCheck(60000);
}

function resizeMain() {

    var myHeight = '100%';

    if (!($('body.header-follows').length > 0 || $('body.header-overflow').length > 0)) {
        myHeight = parseInt($(window).height() - $('header:first').height()) + 'px';
    }

    $('#mainBlock').css('min-height', myHeight);


}

function loadPage(hist) {

    if (hist) {
        flexygo.history.go(hist);
    } else {
        flexygo.nav.goHome(true);
    }

    flexygo.localization.init();
    resizeMain();
}

function getUrlObject() {


    try {

        var b64 = $.trim(document.location.href);

        if (b64.endsWith('#')) {
            b64 = b64.substring(0, b64.length - 1);
        }
        if (b64.endsWith('/')) {
            b64 = b64.substring(0, b64.length - 1);
        }
        if (b64.endsWith('#')) {
            b64 = b64.substring(0, b64.length - 1);
        }

        var items = b64.split('/');
        b64 = items[items.length - 1];

        if (b64.toLowerCase().startsWith('index#')) {
            b64 = b64.substring(6);
            var hist = JSON.parse(flexygo.history.Base64.decode(b64));

            return hist;
        }


    } catch (e) { return null; }

    return null;

}


