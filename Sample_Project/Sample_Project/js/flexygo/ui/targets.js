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
            objectPage.targetid = 'current';
            objectPage.hideNavbar = true;
            objectPage.hideMenuBar = true;
            if (target.indexOf('new') == 0) {
                target = target.replace('new', '');
                if (target.length > 0 && target.indexOf('x') != -1) {
                    width = target.split('x')[0];
                    height = target.split('x')[1];
                    options = 'scrollbars=yes,status=yes,titlebar=yes,resizable=yes,height=' + height + ',width=' + width;
                }
                else {
                    objectPage.hideNavbar = false;
                    objectPage.hideMenuBar = false;
                }
            }
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
                pageContainer = $('#realMain');
                if (pageContainer.find("form.dirty:not(.skipDirty)").length > 0 && confirm(flexygo.localization.translate('flxedit.areyousuremsg')) == false) {
                    return null;
                }
                if (triggerElement && triggerElement.closest('.pageContainer').length > 0) {
                    histObj.opener = $(triggerElement).closest('.pageContainer').attr('id');
                }
                if (!excludeHist) {
                    flexygo.history.set(histObj);
                }
            }
            else if (histObj.targetid && histObj.targetid.indexOf('current') == 0) {
                if (triggerElement && triggerElement.closest('.pageContainer').length > 0) {
                    pageContainer = triggerElement.closest('.pageContainer');
                    if (pageContainer.find("form.dirty:not(.skipDirty)").length > 0 && confirm(flexygo.localization.translate('flxedit.areyousuremsg')) == false) {
                        return null;
                    }
                    histObj.opener = $(pageContainer).data('context').opener;
                    if (pageContainer.is($('#realMain'))) {
                        if (!excludeHist) {
                            flexygo.history.set(histObj);
                        }
                    }
                }
                else {
                    pageContainer = $('#realMain');
                    if (pageContainer.find("form.dirty:not(.skipDirty)").length > 0 && confirm(flexygo.localization.translate('flxedit.areyousuremsg')) == false) {
                        return null;
                    }
                    if (!excludeHist) {
                        flexygo.history.set(histObj);
                    }
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
            else if (histObj.targetid && histObj.targetid.indexOf('slide') == 0) {
                if (triggerElement && triggerElement.closest('.pageContainer').length > 0) {
                    histObj.opener = $(triggerElement).closest('.pageContainer').attr('id');
                }
                pageContainer = $('<main class="pageContainer" />');
                pageContainer.attr('id', flexygo.utils.uniqueUUID());
                let width, height, position, sizeNumber, effect, isPercent = false;
                let size = histObj.targetid.replace('slide', '');
                if (size.indexOf('right') != -1 || size.indexOf('left') != -1 || size.indexOf('top') != -1 || size.indexOf('bottom') != -1) {
                    if (size.indexOf('x') != -1) {
                        position = size.split("x")[0];
                        if (size.split("x")[1].indexOf('p') != -1 || size.split("x")[1].indexOf('%') != -1) {
                            isPercent = true;
                            sizeNumber = parseFloat(size.split("x")[1].replace('p', '').replace('%', ''));
                            sizeNumber = sizeNumber > 100 ? 100 : sizeNumber;
                        }
                        else {
                            sizeNumber = parseFloat(size.split("x")[1]);
                        }
                        switch (position) {
                            case 'right':
                            case 'left':
                                width = (isPercent ? ((sizeNumber * $(window).width()) / 100) : sizeNumber);
                                height = $(window).height();
                                break;
                            case 'top':
                            case 'bottom':
                                width = $(window).width();
                                height = (isPercent ? ((sizeNumber * $(window).height()) / 100) : sizeNumber);
                                break;
                            default:
                                width = (isPercent ? ((sizeNumber * $(window).width()) / 100) : sizeNumber);
                                height = $(window).height();
                        }
                    }
                    else {
                        position = size;
                        if (position == 'right' || position == 'left') {
                            width = $(window).innerWidth() / 3;
                            height = $(window).height();
                        }
                        else if (position == 'top' || position == 'bottom') {
                            width = $(window).width();
                            height = $(window).innerHeight() / 3;
                        }
                    }
                }
                else {
                    position = 'right';
                    width = $(window).innerWidth() / 3;
                    height = $(window).height();
                }
                let duration = 400;
                pageContainer.dialog({
                    position: { my: position, at: position, of: $('body') },
                    width: (position === 'right' || position === 'left' ? 0 : width),
                    height: (position === 'top' || position === 'bottom' ? 0 : height),
                    dialogClass: 'flx-dialog-modal flx-slide',
                    modal: true,
                    resizable: false,
                    draggable: false,
                    closeOnEscape: false,
                    close: function () {
                        let ev = {
                            class: "dialog",
                            type: "closed",
                            sender: $(this).data('context')
                        };
                        flexygo.events.trigger(ev);
                        $(this).dialog('destroy').remove();
                    },
                    beforeClose: function (event, ui) {
                        let widget = $(this).dialog("widget");
                        if (position == 'right') {
                            widget.animate({ left: "100%" }, duration);
                        }
                        else if (position == 'left') {
                            widget.animate({ width: '0px' });
                        }
                        else if (position == 'top') {
                            widget.animate({ top: "-50%" }, duration);
                        }
                        else if (position == 'bottom') {
                            widget.animate({ top: "100%" }, duration);
                        }
                    },
                    open: function () {
                        let widget = $(this).dialog("widget");
                        let diag = $(this);
                        widget.addClass('flx-slide-loading');
                        if (position == 'right') {
                            widget.animate({ left: ($(window).innerWidth() - width) + 'px', width: width + 'px' }, duration);
                            widget.addClass('flx-slideright');
                        }
                        else if (position == 'left') {
                            widget.animate({ width: width + 'px' }, duration);
                            widget.addClass('flx-slideleft');
                        }
                        else if (position == 'top') {
                            widget.animate({ height: height + 'px' }, duration);
                            pageContainer.animate({ height: height + 'px' }, duration);
                            widget.addClass('flx-slidetop');
                        }
                        else if (position == 'bottom') {
                            let titleBarHeight = $('body > div.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-front.flx-dialog-modal.flx-slide > div').height();
                            $('body').css('overflow', 'hidden');
                            widget.animate({ top: ($(window).innerHeight() - height), height: 'auto' }, duration);
                            pageContainer.css('height', height - titleBarHeight);
                            widget.addClass('flx-slidebottom');
                        }
                        setTimeout(function () { widget.addClass('flx-slide-fullLoaded'); widget.removeClass('flx-slide-loading'); }, duration + 100);
                        $(this).closest('div.ui-dialog').find('.ui-dialog-titlebar-close').off("click").on("click", (e) => {
                            let dirtyModules = $(this).find("form.dirty");
                            if (dirtyModules.length != 0) {
                                $(dirtyModules[0]).closest("flx-module")[0].checkDirtyEdit();
                            }
                            else {
                                diag.dialog('close');
                            }
                            e.preventDefault();
                        });
                        $('.ui-widget-overlay').bind('click', () => {
                            let dirtyModules = $(this).find("form.dirty");
                            if (dirtyModules.length != 0) {
                                $(dirtyModules[0]).closest("flx-module")[0].checkDirtyEdit();
                            }
                            else {
                                diag.dialog('close');
                            }
                        });
                    },
                    buttons: buttons
                }).dialogExtend({
                    closable: true,
                    maximizable: false,
                    minimizable: false,
                    collapsable: false,
                    dblclick: false,
                    modal: true,
                    maximize: false
                });
            }
            else {
                alert('target not implemented!');
                pageContainer = $('#realMain');
            }
            pageContainer.data('context', histObj);
            pageContainer.html(flexygo.utils.loadingMsg());
            $('flx-footermenu').empty();
            if (pageContainer.closest('.ui-dialog').length > 0 && !excludeMainframeBtn) {
                let onlyDevelop = '';
                if (histObj.targetid && histObj.targetid.indexOf('slide') == 0) {
                    onlyDevelop = 'develop-only';
                }
                let btn = $('<a class="flx-icon icon-select icon-margin-right ui-corner-all ui-state-default ' + onlyDevelop + '" href="#" title="Put in main frame" role="button"></a>');
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