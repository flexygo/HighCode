/// <reference path ="../../../Scripts/typings/jqueryui/jqueryui.d.ts"/>
var flexygo;
(function (flexygo) {
    var targets;
    (function (targets) {
        /**
         * Opens a page in a new window
         * @method openNewWindow
         * @param {flexygo.nav.FlexygoHistory} objectPage - Page information
         * @param {string} target - additional target info
        */
        function openNewWindow(objectPage, target) {
            let width, height;
            let options;
            if (target.indexOf('new') == 0) {
                target = target.replace('new', '');
                if (target.length > 0 && target.indexOf('x') != -1) {
                    width = target.split('x')[0];
                    height = target.split('x')[1];
                    options = 'scrollbars=yes,status=yes,titlebar=yes,resizable=yes,height=' + height + ',width=' + width;
                }
            }
            objectPage.targetid = 'current';
            objectPage.hideNavbar = true;
            objectPage.hideMenuBar = true;
            let url = flexygo.utils.resolveUrl('~/Index') + '#' + flexygo.history.Base64.encode(JSON.stringify(objectPage));
            window.open(url, flexygo.utils.uniqueId(), options);
        }
        targets.openNewWindow = openNewWindow;
        /**
        * Opens a page in a new window
        * @method openNewWindow
        * @param {flexygo.nav.FlexygoHistory} objectPage - Page information
        * @param {string} target - additional target info
       */
        function openExternalNewWindow(url, authToken, objectPage) {
            let width, height;
            let options = 'scrollbars=yes,status=yes,titlebar=yes,resizable=yes';
            let target = objectPage.targetid;
            target = target.replace('new', '').replace('current', '').replace('main', '').replace('menu', '').replace('modal', '').replace('popup', '');
            if (target.length > 0 && target.indexOf('x') != -1) {
                width = target.split('x')[0];
                height = target.split('x')[1];
                if (width && height) {
                    options += ',height=' + height + ',width=' + width;
                }
            }
            objectPage.targetid = 'current';
            objectPage.hideNavbar = true;
            objectPage.hideMenuBar = true;
            if (!url.endsWith('/')) {
                url += '/';
            }
            url += 'Index?u' + flexygo.history.Base64.encode(JSON.stringify(objectPage)) + '&=access_token=' + authToken;
            window.open(url, flexygo.utils.uniqueId(), options);
        }
        targets.openExternalNewWindow = openExternalNewWindow;
        /**
         * Creates a pgae container
         * @method createContainer
         * @param {flexygo.nav.FlexygoHistory} histObj - Page information
         * @param {boolean} excludeHist - True to not save page in window history
         * @param {JQuery} triggerElement - Relative element to create the container
         * @param {boolean} excludeMainframeBtn - True to not create button frame
         * @param {JQueryUI.DialogButtonOptions[]} buttons - additional buttons to add to the container
       */
        function createContainer(histObj, excludeHist, triggerElement, excludeMainframeBtn, buttons) {
            let pageContainer = null;
            if (histObj.targetid && histObj.targetid.indexOf('popup') == 0) {
                if (triggerElement && triggerElement.closest('.pageContainer').length > 0) {
                    histObj.opener = $(triggerElement).closest('.pageContainer').attr('id');
                }
                pageContainer = $('<main class="pageContainer" />');
                pageContainer.attr('id', flexygo.utils.uniqueUUID());
                let relatedPosition = null;
                if ($('.flx-dialog').length > 0) {
                    relatedPosition = $('.flx-dialog').last();
                }
                else {
                    relatedPosition = $("#realMain");
                }
                let width, height;
                let size = histObj.targetid.replace('popup', '');
                width = ($(window).width()) * 0.9;
                height = ($(window).height()) * 0.9;
                if (size.length > 0 && size.indexOf('x') != -1) {
                    if (parseInt(size.split('x')[0]) < width) {
                        width = parseInt(size.split('x')[0]);
                    }
                    if (parseInt(size.split('x')[1]) < height) {
                        height = parseInt(size.split('x')[1]);
                    }
                }
                pageContainer.dialog({
                    position: { my: "left top", at: "left+5 top+5", of: relatedPosition },
                    width: width,
                    height: height,
                    dialogClass: 'flx-dialog',
                    close: function () {
                        let ev = {
                            class: "dialog",
                            type: "closed",
                            sender: $(this).data('context')
                        };
                        flexygo.events.trigger(ev);
                        $(this).dialog('destroy').remove();
                    },
                    buttons: buttons
                }).dialogExtend({
                    "closable": true,
                    "maximizable": true,
                    "minimizable": true,
                    "minimizeLocation": 'left',
                    "collapsable": false,
                    "dblclick": false,
                });
            }
            else if (histObj.targetid && histObj.targetid.indexOf('modal') == 0) {
                if (triggerElement && triggerElement.closest('.pageContainer').length > 0) {
                    histObj.opener = $(triggerElement).closest('.pageContainer').attr('id');
                }
                pageContainer = $('<main class="pageContainer" />');
                pageContainer.attr('id', flexygo.utils.uniqueUUID());
                let width, height;
                let size = histObj.targetid.replace('modal', '');
                if (size.length > 0 && size.indexOf('x') != -1) {
                    width = parseInt(size.split('x')[0]);
                    height = parseInt(size.split('x')[1]);
                }
                else {
                    width = ($(window).width()) * 0.9;
                    height = ($(window).height()) * 0.9;
                }
                pageContainer.dialog({
                    position: { my: "center center", at: "center middle", of: $('body') },
                    width: width,
                    height: height,
                    dialogClass: 'flx-dialog-modal',
                    modal: true,
                    close: function () {
                        let ev = {
                            class: "dialog",
                            type: "closed",
                            sender: $(this).data('context')
                        };
                        flexygo.events.trigger(ev);
                        $(this).dialog('destroy').remove();
                    },
                    buttons: buttons
                }).dialogExtend({
                    "closable": true,
                    "maximizable": true,
                    "minimizable": false,
                    "collapsable": false,
                    "dblclick": false,
                    "modal": true,
                });
            }
            else if (histObj.targetid && histObj.targetid.indexOf('menu') == 0) {
                if (triggerElement && triggerElement.closest('.pageContainer').length > 0) {
                    histObj.opener = $(triggerElement).closest('.pageContainer').attr('id');
                }
                pageContainer = $('<main class="pageContainer" />');
                pageContainer.attr('id', flexygo.utils.uniqueUUID());
                let width, height;
                let size = histObj.targetid.replace('menu', '');
                if (size.length > 0 && size.indexOf('x') != -1) {
                    width = parseInt(size.split('x')[0]);
                    height = parseInt(size.split('x')[1]);
                }
                else {
                    width = 400;
                    height = 500;
                }
                let position = { my: "center center", at: "center middle", of: $('body') };
                if (triggerElement) {
                    position = { my: "center top", at: "center bottom", of: triggerElement };
                }
                pageContainer.dialog({
                    position: position,
                    width: width,
                    height: height,
                    show: {
                        effect: "blind",
                        duration: 500,
                    },
                    draggable: false,
                    dialogClass: 'flx-dialog-menu',
                    modal: true,
                    close: function () { $(this).dialog('destroy').remove(); },
                    open: function () {
                        let diag = $(this);
                        $('.ui-widget-overlay').bind('click', function () {
                            diag.dialog('destroy').remove();
                        });
                    }
                }).dialogExtend({
                    "closable": false,
                    "maximizable": false,
                    "minimizable": false,
                    "collapsable": false,
                    "dblclick": false,
                    "modal": false,
                    "titlebar": 'none',
                });
            }
            else if (histObj.targetid && histObj.targetid.indexOf('main') == 0) {
                if (triggerElement && triggerElement.closest('.pageContainer').length > 0) {
                    histObj.opener = $(triggerElement).closest('.pageContainer').attr('id');
                }
                if (!excludeHist) {
                    flexygo.history.set(histObj);
                }
                pageContainer = $('#realMain');
            }
            else if (histObj.targetid && histObj.targetid.indexOf('current') == 0) {
                if (triggerElement && triggerElement.closest('.pageContainer').length > 0) {
                    pageContainer = triggerElement.closest('.pageContainer');
                    histObj.opener = $(pageContainer).data('context').opener;
                    if (pageContainer.is($('#realMain'))) {
                        if (!excludeHist) {
                            flexygo.history.set(histObj);
                        }
                    }
                }
                else {
                    if (!excludeHist) {
                        flexygo.history.set(histObj);
                    }
                    pageContainer = $('#realMain');
                }
            }
            else if (histObj.targetid && histObj.targetid.indexOf('opener') == 0) {
                let openerId = histObj.targetid.split("|")[1];
                if (openerId) {
                    pageContainer = $('#' + openerId);
                }
                else {
                    pageContainer = $('#realMain');
                }
            }
            else {
                alert('target not implemented!');
                pageContainer = $('#realMain');
            }
            pageContainer.data('context', histObj);
            pageContainer.html(flexygo.utils.loadingMsg());
            $('flx-footermenu').empty();
            if (pageContainer.closest('.ui-dialog').length > 0 && !excludeMainframeBtn) {
                let btn = $('<a class="flx-icon icon-select icon-margin-right ui-corner-all ui-state-default" href="#" title="Put in main frame" role="button"></a>');
                btn.on('click', function () {
                    let mainCnt = $(this).closest('.ui-dialog').find('.pageContainer').data('context');
                    mainCnt.targetid = 'main';
                    $('#realMain').data('context', mainCnt);
                    flexygo.history.set(mainCnt);
                    flexygo.history.go(mainCnt);
                    $(this).parent().find('.ui-dialog-titlebar-close').click();
                });
                let titlebar = pageContainer.closest('.ui-dialog').find('.ui-dialog-titlebar-buttonpane');
                if (titlebar.find('.icon-select').length == 0) {
                    titlebar.append(btn);
                }
            }
            return pageContainer;
        }
        targets.createContainer = createContainer;
        //export function openPopUp(objectpage, target): void {
        //    let diag: string = '<div id="dialog" title="Basic dialog"><p>This is the default dialog which is useful for displaying information. The dialog window can be moved, resized and closed with the  icon.</p></div>'
        //    let jdiag: JQuery = $(diag);
        //    jdiag.dialog();
        //}
    })(targets = flexygo.targets || (flexygo.targets = {}));
})(flexygo || (flexygo = {}));
//# sourceMappingURL=targets.js.map