/**
 * @namespace flexygo.ui.wc
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var flexygo;
(function (flexygo) {
    var ui;
    (function (ui) {
        var wc;
        (function (wc_1) {
            /**
           * Library for the FlxModuleElement web component.
           *
           * @class FlxModuleElement
           * @constructor
           * @return {FlxModuleElement}
           */
            class FlxModuleElement extends HTMLElement {
                constructor() {
                    super();
                    this.uuid = null;
                    this.moduleConfig = null;
                    this.moduleName = null;
                    this.objectname = 'temp';
                    this.objectwhere = 'temp';
                    this.moduleTitle = '';
                    this.icon = '';
                    this.headerClass = 'bg-module';
                    this.moduleClass = '';
                    this.canCollapse = true;
                    this.canEnlarge = true;
                    this.canRefresh = true;
                    this.canConfig = true;
                    this.objectdefaults = null;
                    this.isClone = false;
                    this.ManualInit = false;
                    this.HTMLInit = null;
                    this.ModuleViewers = false;
                    this.componentString = '';
                    this.moduleInitClass = null;
                    this.JSAfterLoad = null;
                    this.mode = null;
                    this.reportname = null;
                    this.reportwhere = null;
                    this.processname = null;
                    this.emptyTop = false;
                    this.emptyTimer = null;
                    this.TemplateToolbarCollection = null;
                    this.newObjectWhere = null;
                    this.module = null;
                    this.ctxMenusValues = {};
                }
                /**
               * Fires when element is attached to DOM
               * @method connectedCallback
               */
                connectedCallback() {
                    this.uuid = flexygo.utils.uniqueUUID();
                    //Remove handler on element DOM remove
                    $(this).on("destroy", function () {
                        $(this).off("destroy");
                        flexygo.events.unRegisterModule(this);
                    });
                }
                /**
                * Init the webcomponent.
                * @method init
                */
                init() {
                    let me = $(this);
                    let def;
                    let histObj = flexygo.history.get(me);
                    if (typeof histObj != 'undefined' && histObj.defaults) {
                        if (typeof histObj.defaults == 'string') {
                            def = JSON.parse(flexygo.utils.parser.replaceAll(histObj.defaults, "'", '"'));
                        }
                        else {
                            def = histObj.defaults;
                        }
                    }
                    if (this.componentString && this.componentString.length > 0) {
                        this.module = $('<' + this.componentString + ' />').attr('ObjectName', this.objectname).attr('ObjectWhere', this.objectwhere).attr('reportName', this.reportname).attr('reportWhere', this.reportwhere).attr('processName', this.processname).attr('id', 'mod-' + this.moduleName).attr('modulename', this.moduleName);
                        if (this.ManualInit) {
                            this.module.attr('manualInit', 'true');
                            if (this.HTMLInit && this.HTMLInit.length > 0) {
                                me.find('.cntBody').append('<div class="flx-noInitContent">' + flexygo.utils.parser.recursiveCompile(def, this.HTMLInit, this) + '</div>');
                            }
                        }
                        if (!this.module.attr('mode')) {
                            this.module.attr('mode', this.mode);
                        }
                        if (this.isClone) {
                            this.module.attr('isClone', "true");
                        }
                        me.find('.cntBody').find('#' + this.module.attr("id")).remove();
                        me.find('.cntBody').append(this.module);
                        if (this.module.is('flx-list[mode=list]')) {
                            me.find('.cntBody').addClass("overflowx");
                        }
                        else {
                            me.find('.cntBody').removeClass("overflowx");
                        }
                    }
                    this.loadHeader();
                    //if(this.ModuleViewers){
                    //    flexygo.utils.checkObserverModule(this, 3000);
                    //}
                    flexygo.events.registerModule(this);
                }
                /**
                * Loads module header.
                * @method loadHeader
                */
                loadHeader() {
                    let me = $(this);
                    //Module tiitle & icon
                    me.find('.cntTitle').html(this.moduleTitle);
                    if (this.icon && this.icon != '') {
                        let moduleIcon = $('<i class="' + this.icon + '" />');
                        me.find('.cntIcon').html(moduleIcon[0].outerHTML);
                    }
                    if (this.headerClass && this.headerClass != '') {
                        me.find('.cntHeader').addClass(this.headerClass);
                    }
                    if (this.moduleInitClass) {
                        me.attr('Class', this.moduleInitClass);
                    }
                    else {
                        this.moduleInitClass = me.attr('Class');
                    }
                    if (this.moduleClass && this.moduleClass != '') {
                        me.addClass(this.moduleClass);
                    }
                    //Module Buttons configuration
                    me.find('.cntButtons').empty();
                    if (this.canConfig) {
                        var btnConfig = $('<b class="flx-icon icon-settings develop-only" />').on('click', () => {
                            this.openConfig();
                        });
                        me.find('.cntButtons').append(btnConfig);
                    }
                    if (this.canEnlarge) {
                        var btnFullScreen = $('<b class="flx-icon icon-resize" />').on('click', () => {
                            this.toggleFullScreen();
                        });
                        me.find('.cntButtons').append(btnFullScreen);
                        me.find('.cntHeader').on('dblclick', () => {
                            this.toggleFullScreen();
                        });
                    }
                    if (this.canCollapse) {
                        var btnCollapse = $('<b class="flx-icon icon-minus" />').on('click', () => {
                            this.toggle();
                        });
                        me.find('.cntButtons').append(btnCollapse);
                    }
                    if (this.canRefresh) {
                        var btnRefresh = $('<b class="flx-icon icon-sincronize" />').on('click', () => {
                            this.refresh();
                        });
                        me.find('.cntButtons').append(btnRefresh);
                    }
                    /*            if (this.canRefresh) {*/
                    var btnViewer = $(`<b id="flx-viewer-module" class="hidden"><div id="flx-flip-front"><i class="flx-icon icon-view icon-lg margin-0" clickable></i></div><div id="flx-flip-back"></div></b>`);
                    me.find('.cntButtons').append(btnViewer);
                    //}
                    me.find('div.cntBodyHeader div.ctnArrowHeader').off('click').on('click', () => {
                        if (this.emptyTop) {
                            me.find('div.cntHeader, div.cntBodyHeader').css({ 'bottom': '' });
                            me.find('div.cntBodyHeader div.ctnArrowHeader i').css({ 'transform': '' });
                            this.emptyTop = false;
                        }
                        else {
                            me.find('div.cntHeader, div.cntBodyHeader').css({ 'bottom': '46px' });
                            me.find('div.cntBodyHeader div.ctnArrowHeader i').css({ 'transform': 'rotate(90deg)' });
                            this.emptyTop = true;
                            clearTimeout(this.emptyTimer);
                            this.emptyTimer = setTimeout(() => {
                                if (this.emptyTop) {
                                    me.find('div.cntHeader, div.cntBodyHeader').css({ 'bottom': '' });
                                    me.find('div.cntBodyHeader div.ctnArrowHeader i').css({ 'transform': '' });
                                    this.emptyTop = false;
                                }
                            }, 5000);
                        }
                    });
                }
                /**
              * Refresh module.
              * @method refresh
              */
                refresh() {
                    let me = $(this);
                    me.find(".moduleToolbar > .btn-group > .tooltip").tooltip('hide');
                    me.find('*:not(flx-inputview,flx-input,flx-filter,flx-multicombo,flx-combo,flx-dbcombo)').filter((i, s) => {
                        return /^flx\-/i.test(s.nodeName);
                    }).each((i, e) => {
                        me.find('.cntButtons .pager').empty();
                        me.find('.cntBodyHeader .pager').empty();
                        me.find('.cntBodyFooter .pager').empty();
                        let wce = e;
                        if (typeof wce.refresh != 'undefined') {
                            wce.refresh();
                            if ((wce.tagName.toLowerCase() == 'flx-moduletab') || (wce.tagName.toLowerCase() == 'flx-buttontab')) {
                                return false;
                            }
                        }
                    });
                    //we need filter to reload after list
                    if (me.find('flx-filter').length > 0) {
                        let wc = me.find('flx-filter')[0];
                        wc.refresh();
                    }
                    let ev = {
                        class: "module",
                        type: "refreshed",
                        sender: this
                    };
                    flexygo.events.trigger(ev);
                }
                moduleLoaded(wc) {
                    //TODO_TS: wc es un WebControl
                    let me = $(this);
                    let jsAF = '';
                    if (this.JSAfterLoad) {
                        jsAF = this.JSAfterLoad;
                    }
                    if ((me.attr('type').toLowerCase() == 'flx-moduletab') || (me.attr('type').toLowerCase() == 'flx-buttontab')) {
                        let tab = me.find('flx-moduletab:last')[0];
                        let cnf = tab.activeModule;
                        if (cnf.JSAfterLoad) {
                            jsAF = cnf.JSAfterLoad;
                        }
                    }
                    if ((me.attr('type').toLowerCase() == 'flx-edit') && (jsAF == '')) {
                        let edit = me.find('flx-edit:last')[0];
                        if (edit.mode.toLowerCase() == 'process') {
                            if (edit.JSforParams) {
                                jsAF = edit.JSforParams;
                            }
                        }
                    }
                    if (jsAF != '') {
                        flexygo.utils.execDynamicCode.call(this, jsAF);
                    }
                    let ev = {
                        class: "module",
                        type: "loaded",
                        sender: this
                    };
                    flexygo.events.trigger(ev);
                }
                toggle() {
                    $(this).find('.icon-minus, .icon-plus').toggleClass("icon-minus icon-plus");
                    $(this).find('.cntBody, .cntBodyHeader, .cntFooterHeader').toggle();
                }
                setButtons(buttons, objectname, objectwhere, reportname, processname, reportwhere) {
                    let me = $(this);
                    if (me.find('.cntBodyHeader .moduleToolbar').length == 0) {
                        me.find('.cntBodyHeader').append('<div class="moduleToolbar btn-toolbar" />');
                    }
                    else {
                        me.find('.cntBodyHeader .moduleToolbar').empty();
                    }
                    if (me.find('.cntBodyHeader .moduleButtons').length == 0) {
                        me.find('.cntBodyHeader').append('<div class="moduleButtons btn-toolbar" />');
                    }
                    else {
                        me.find('.cntBodyHeader .moduleButtons').empty();
                    }
                    if (me.find('.cntBodyFooter .moduleButtons').length == 0) {
                        me.find('.cntBodyFooter').append('<div class="moduleButtons btn-toolbar" />');
                    }
                    else {
                        me.find('.cntBodyFooter .moduleButtons').empty();
                    }
                    var defString = flexygo.history.getDefaults(objectname, me);
                    if (this.objectdefaults) {
                        defString = JSON.stringify(this.objectdefaults);
                    }
                    if (buttons) {
                        let arrBtn = flexygo.utils.sortObject(buttons, 'PositionId', 'Order');
                        let btnGroup;
                        if (arrBtn.length > 0) {
                            let lastPosition = arrBtn[0].PositionId;
                            let arrChildBtn = [];
                            for (let i = 0; i < arrBtn.length; i++) {
                                let btn = arrBtn[i];
                                if (btn.ParentButtonId) {
                                    arrChildBtn.push(btn);
                                }
                                else {
                                    let type = btn.TypeId;
                                    if (type) {
                                        type = type.toLowerCase();
                                    }
                                    if (!btnGroup) {
                                        btnGroup = $('<div class="btn-group" />');
                                    }
                                    if (btn.PositionId != lastPosition) {
                                        this.addGroup(lastPosition, btnGroup);
                                        btnGroup = $('<div class="btn-group" />');
                                    }
                                    if (type == 'separator' || type == 'placeholder') {
                                        this.addGroup(lastPosition, btnGroup);
                                        btnGroup = null;
                                    }
                                    else {
                                        btnGroup.append(this.getButton(btn, objectname, objectwhere, defString, reportname, this.reportwhere, processname));
                                    }
                                    lastPosition = btn.PositionId;
                                }
                            }
                            if (btnGroup) {
                                this.addGroup(lastPosition, btnGroup);
                            }
                            if (arrChildBtn.length > 0) {
                                this.setChildButtons($(this), arrChildBtn, objectname, objectwhere, defString, reportname, this.reportwhere, processname);
                            }
                        }
                    }
                }
                setChildButtons(container, childBtns, objectname, objectwhere, defString, reportname, reportwhere, processname) {
                    let parentIds = [];
                    let newBtns = childBtns.reduce((groupedBtns, btn) => {
                        if (!groupedBtns[btn.ParentButtonId]) {
                            groupedBtns[btn.ParentButtonId] = [];
                            parentIds.push(btn.ParentButtonId);
                        }
                        groupedBtns[btn.ParentButtonId].push(btn);
                        return groupedBtns;
                    }, {});
                    //Combines the previous ctxMenuValues and the newBtns (for when toolbars are loaded on an flx-list or in the template and in the smae module toolbar)
                    this.ctxMenusValues = Object.assign({}, this.ctxMenusValues, newBtns);
                    parentIds.forEach(id => {
                        let btn = container.find(`[buttonid="${id}"]`);
                        let uniqueId = flexygo.utils.uniqueUUID();
                        btn.addClass('hasSubmenus clickable');
                        if (btn.attr('data-type') === 'text') {
                            btn.attr("id", uniqueId);
                            btn.append('<span class="caret"/>');
                            btn.attr('onclick', flexygo.utils.functionToString(`this.closest('flx-module').printToolbarContextMenu`, [uniqueId, id, objectname, objectwhere, defString, reportname, reportwhere, processname]));
                        }
                        else {
                            let showMenuBtn = $(`<button id="${uniqueId}" subButtonid="${id}" class="${(btn[0] ? btn[0].className : 'btn btn-default')}"><span class="caret"/></button>`);
                            showMenuBtn.attr('onclick', flexygo.utils.functionToString(`this.closest('flx-module').printToolbarContextMenu`, [uniqueId, id, objectname, objectwhere, defString, reportname, reportwhere, processname]));
                            showMenuBtn.attr('onfocus', `$(this).closest('span.submenuContainer').addClass('focused')`);
                            showMenuBtn.attr('onfocusout', `$(this).closest('span.submenuContainer').removeClass('focused')`);
                            btn.after(showMenuBtn);
                            $(this).find(`[buttonid="${id}"],[subButtonid="${id}"]`).wrapAll('<span class="submenuContainer"/>');
                        }
                    });
                }
                printToolbarContextMenu(id, btnId, objectname, objectwhere, defString, reportname, reportwhere, processname) {
                    let triggerElement = $('#' + id);
                    var cntMenu = $('flx-contextmenu')[0];
                    if (cntMenu.hideMenu(triggerElement))
                        return;
                    let childBtns = this.ctxMenusValues[btnId];
                    let menuUl = this.setMenuButtons(childBtns, btnId, objectname, objectwhere, defString, reportname, reportwhere, processname);
                    if (triggerElement[0].hasAttribute('tabindex')) {
                        menuUl.find('span[buttonid]').each((i, btn) => {
                            btn.setAttribute('tabindex', triggerElement.attr('tabindex'));
                            $(btn).on('keypress', (e) => {
                                if (e.key === "Enter") {
                                    $(btn).click();
                                }
                            });
                        });
                    }
                    cntMenu.showMenu(menuUl, triggerElement);
                    //A partir de aqu� cambiamos la posici�n del men� en caso de ser necesario
                    if (!triggerElement[0].hasAttribute('subbuttonid')) {
                        return;
                    }
                    let posElement = triggerElement.parent().find('[buttonid]');
                    cntMenu.menu.position({
                        my: "left top",
                        at: 'left bottom',
                        of: posElement,
                        collision: 'flip flip'
                    });
                }
                setMenuButtons(childBtns, parentId, objectname, objectwhere, defString, reportname, reportwhere, processname) {
                    var menuLi, button, menuUl = $('<ul/>');
                    childBtns.forEach(btn => {
                        menuLi = $('<li/>');
                        button = this.getButton(btn, objectname, objectwhere, defString, reportname, reportwhere, processname, true);
                        button.attr('parentId', parentId);
                        menuUl.append(menuLi.append(button));
                        let subMenuBtns = this.ctxMenusValues[btn.ButtonId];
                        if (subMenuBtns && subMenuBtns.length > 0) {
                            menuLi.find('> span').append('<span gotSubmenus/>');
                            let rightArrow = menuLi.find('span[gotSubmenus]');
                            if (btn.TypeId === 'Text') {
                                menuLi.click(ev => {
                                    this.showSubmenu(ev, subMenuBtns, btn.ButtonId, objectname, objectwhere, defString, reportname, reportwhere, processname);
                                });
                            }
                            else {
                                rightArrow.click(ev => {
                                    ev.stopPropagation();
                                    this.showSubmenu(ev, subMenuBtns, btn.ButtonId, objectname, objectwhere, defString, reportname, reportwhere, processname, $(ev.currentTarget).closest('li'));
                                });
                            }
                        }
                    });
                    return menuUl;
                }
                showSubmenu(ev, btns, parentId, objectname, objectwhere, defString, reportname, reportwhere, processname, trueElement) {
                    ev.stopPropagation();
                    var menu = $('<div submenu/>'), parent = (trueElement ? trueElement : $(ev.currentTarget));
                    let menuUl = this.setMenuButtons(btns, parentId, objectname, objectwhere, defString, reportname, reportwhere, processname);
                    menu.append(menuUl);
                    menuUl.find('li').addClass('isSubMenu');
                    let ctxMenu = $('body flx-contextmenu .flx-contextmenu');
                    let subMenu = ctxMenu.find(`[submenu]`);
                    if (subMenu.length > 0 && !parent.hasClass('isSubMenu')) {
                        subMenu.remove();
                    }
                    ctxMenu.append(menu);
                    $(this).find('[submenu]:visible').hide();
                    menu.show();
                    menu.position({
                        my: "left top",
                        at: 'right top',
                        of: parent,
                        collision: 'flip flip'
                    });
                }
                getTemplateToolbar(buttons, objectname, objectwhere, reportname, processname, reportwhere) {
                    let me = $(this);
                    var defString = flexygo.history.getDefaults(objectname, me);
                    if (this.objectdefaults) {
                        defString = JSON.stringify(this.objectdefaults);
                    }
                    if (buttons) {
                        let arrBtn = flexygo.utils.sortObject(buttons, 'PositionId', 'Order');
                        let toolbar = $('<div class="btn-toolbar" />');
                        let btnGroup = $('<div class="btn-group" />');
                        if (arrBtn.length > 0) {
                            let lastPosition = arrBtn[0].PositionId;
                            let arrChildBtn = [];
                            for (let i = 0; i < arrBtn.length; i++) {
                                let btn = arrBtn[i];
                                if (btn.ParentButtonId) {
                                    arrChildBtn.push(btn);
                                }
                                else {
                                    let type = btn.TypeId;
                                    if (type) {
                                        type = type.toLowerCase();
                                    }
                                    if (!btnGroup) {
                                        btnGroup = $('<div class="btn-group" />');
                                    }
                                    if (btn.PositionId != lastPosition) {
                                        toolbar.append(btnGroup);
                                        btnGroup = $('<div class="btn-group" />');
                                    }
                                    if (type == 'separator' || type == 'placeholder') {
                                        toolbar.append(btnGroup);
                                        btnGroup = null;
                                    }
                                    else {
                                        btnGroup.append(this.getButton(btn, objectname, objectwhere, defString, reportname, this.reportwhere, processname));
                                    }
                                    if (i === arrBtn.length - 1) {
                                        toolbar.append(btnGroup);
                                    }
                                    lastPosition = btn.PositionId;
                                }
                            }
                            this.setChildButtons(toolbar, arrChildBtn, objectname, objectwhere, defString, reportname, reportwhere, processname);
                            return toolbar.prop('outerHTML');
                        }
                    }
                }
                refreshButtons(buttons, objectname, objectwhere, reportname, processname) {
                    let me = $(this);
                    var defString = flexygo.history.getDefaults(objectname, me);
                    if (this.objectdefaults) {
                        defString = JSON.stringify(this.objectdefaults);
                    }
                    if (buttons) {
                        let arrChildBtn = [];
                        for (let key in buttons) {
                            if (buttons[key].ParentButtonId) {
                                arrChildBtn.push(buttons[key]);
                            }
                            else {
                                let htmlBtn = me.find('[ButtonId="' + buttons[key].ButtonId + '"]');
                                if (htmlBtn.length > 0) {
                                    this.refreshButton(htmlBtn, buttons[key], objectname, objectwhere, defString, reportname, null, processname);
                                }
                            }
                        }
                        if (arrChildBtn.length > 0) {
                            this.setChildButtons($(this), arrChildBtn, objectname, objectwhere, defString, reportname, this.reportwhere, processname);
                        }
                    }
                }
                addGroup(position, btnGroup) {
                    if (position) {
                        position = position.toLowerCase();
                    }
                    let me = $(this);
                    switch (position) {
                        case 'toolbar':
                            me.find('.cntBodyHeader .moduleToolbar').append(btnGroup);
                            break;
                        case 'top':
                            me.find('.cntBodyHeader .moduleButtons').append(btnGroup);
                            break;
                        case 'bottom':
                            me.find('.cntBodyFooter .moduleButtons').append(btnGroup);
                            break;
                    }
                }
                refreshButton(htmlBtn, btn, objectname, objectwhere, objectdefaults, reportname, reportwhere, processname) {
                    let newBtn = this.getButton(btn, objectname, objectwhere, objectdefaults, reportname, reportwhere, processname);
                    htmlBtn.replaceWith(newBtn);
                }
                getButton(btn, objectname, objectwhere, objectdefaults, reportname, reportwhere, processname, notABtn) {
                    let type = btn.TypeId;
                    if (type) {
                        type = type.toLowerCase();
                    }
                    let htmlBTN = $('<button class="btn btn-default" />');
                    if (notABtn) {
                        htmlBTN = $('<span/>');
                    }
                    htmlBTN.attr('ButtonId', btn.ButtonId);
                    if (!btn.HideText) {
                        //if (type == 'presets') {
                        //    htmlBTN.html('<span>' + $(this).attr('presetname') + '</span>');
                        //}
                        //else {
                        htmlBTN.html('<span>' + btn.Text + '</span>');
                        //}
                    }
                    if (btn.CssClass) {
                        htmlBTN.addClass(btn.CssClass);
                    }
                    //IconClass ImagePath
                    if (btn.IconClass && btn.IconClass != '') {
                        htmlBTN.prepend('<i class="' + btn.IconClass + '" flx-fw></i> ');
                    }
                    else if (btn.ImagePath && btn.ImagePath != '') {
                        htmlBTN.prepend('<img src="' + btn.ImagePath + '" alt="" /> ');
                    }
                    if (btn.ToolTip && btn.ToolTip != '') {
                        htmlBTN.attr('title', btn.ToolTip);
                    }
                    if (type && type != '') {
                        htmlBTN.attr('data-type', type);
                    }
                    //btn.TargetId
                    switch (type) {
                        case 'delete':
                            htmlBTN.attr('onclick', flexygo.utils.functionToString('flexygo.ui.wc.FlxModuleElement.prototype.deleteModule', [objectname, objectwhere], ['$(this).closest(\'flx-module\')', '$(this)']));
                            htmlBTN.tooltip({ title: flexygo.localization.translate('flxmodule.delete'), placement: 'bottom' });
                            break;
                        case 'save':
                            htmlBTN.addClass("saveButton");
                            htmlBTN.attr('onclick', flexygo.utils.functionToString('flexygo.ui.wc.FlxModuleElement.prototype.saveModule', [objectname, objectwhere], ['$(this).closest(\'flx-module\')', '$(this)']));
                            htmlBTN.tooltip({ title: flexygo.localization.translate('flxmodule.save'), placement: 'bottom' });
                            break;
                        case 'saveview':
                            htmlBTN.addClass("saveButton");
                            htmlBTN.attr('onclick', flexygo.utils.functionToString('flexygo.ui.wc.FlxModuleElement.prototype.saveModule', [objectname, objectwhere], ['$(`[buttonId="${$(this).attr("parentId")}"]`).closest(\'flx-module\')', '$(this)', '\'view\'', objectdefaults]));
                            htmlBTN.tooltip({ title: flexygo.localization.translate('flxmodule.save'), placement: 'bottom' });
                            break;
                        case 'saveandnew':
                            htmlBTN.addClass("saveButton");
                            htmlBTN.attr('onclick', flexygo.utils.functionToString('flexygo.ui.wc.FlxModuleElement.prototype.saveModule', [objectname, objectwhere], ['$(`[buttonId="${$(this).attr("parentId")}"]`).closest(\'flx-module\')', '$(this)', '\'edit\'', objectdefaults]));
                            htmlBTN.tooltip({ title: flexygo.localization.translate('flxmodule.save'), placement: 'bottom' });
                            break;
                        case 'saverow':
                            htmlBTN.addClass("saveRowButton");
                            htmlBTN.attr('onclick', flexygo.utils.functionToString('flexygo.ui.wc.saveRow', [objectname, objectwhere], ['$(this).closest(\'flx-list\')', '$(this)']));
                            htmlBTN.tooltip({ title: flexygo.localization.translate('flxmodule.save'), placement: 'bottom' });
                            break;
                        case 'new':
                            var objN = objectname;
                            if (btn.ObjectName) {
                                objN = btn.ObjectName;
                            }
                            htmlBTN.attr('onclick', flexygo.utils.functionToString('flexygo.nav.openPage', ['edit', objN, null, objectdefaults, btn.TargetId, false], ['$(this)']));
                            htmlBTN.tooltip({ title: flexygo.localization.translate('flxmodule.new'), placement: 'bottom' });
                            break;
                        case 'edit':
                            htmlBTN.attr('onclick', flexygo.utils.functionToString('flexygo.nav.openPage', ['edit', objectname, objectwhere, objectdefaults, btn.TargetId, false], ['$(this)']));
                            htmlBTN.tooltip({ title: flexygo.localization.translate('flxmodule.edit'), placement: 'bottom' });
                            break;
                        case 'view':
                            htmlBTN.attr('onclick', flexygo.utils.functionToString('flexygo.nav.openPage', ['view', objectname, objectwhere, objectdefaults, btn.TargetId, false], ['$(this)']));
                            htmlBTN.tooltip({ title: flexygo.localization.translate('flxmodule.view'), placement: 'bottom' });
                            break;
                        case 'print':
                            //htmlBTN.on('click', () => {
                            //    this.toImage();
                            //});
                            //htmlBTN.tooltip({ title: flexygo.localization.translate('flxmodule.print'), placement: 'bottom' });
                            //break;
                            htmlBTN.append('<span class="caret"></span>');
                            htmlBTN.attr('onclick', flexygo.utils.functionToString('flexygo.ui.exports.printListMenu', [objectname, objectwhere, objectdefaults], ['$(this)']));
                            htmlBTN.tooltip({ title: flexygo.localization.translate('flxmodule.print'), placement: 'top', trigger: 'hover' });
                            break;
                        case 'help':
                            htmlBTN.attr('onclick', flexygo.utils.functionToString('flexygo.nav.openHelpId', [btn.HelpId, btn.TargetId, false], ['$(this)']));
                            htmlBTN.tooltip({ title: flexygo.localization.translate('flxmodule.help'), placement: 'bottom' });
                            break;
                        case 'templates':
                            htmlBTN.append('<span class="caret"></span>');
                            htmlBTN.attr('onclick', flexygo.utils.functionToString('flexygo.ui.templates.templateList', [objectname], ['$(this).closest(\'flx-module\')', '$(this)']));
                            htmlBTN.tooltip({ title: flexygo.localization.translate('flxmodule.templates'), placement: 'top' });
                            break;
                        case 'objectmenu':
                            htmlBTN.append('<span class="caret"></span>');
                            htmlBTN.attr('onclick', flexygo.utils.functionToString('flexygo.nav.getObjectMenu', [objectname, objectwhere, objectdefaults], ['$(this)', null]));
                            break;
                        case 'process':
                            let retFunction = flexygo.utils.functionToString('flexygo.nav.execProcess', [btn.ProcessName, objectname, objectwhere, objectdefaults, null, btn.TargetId, false], ['$(this)']);
                            if (btn.BagOnly) {
                                retFunction = 'if(flexygo.selection.getArray(\'' + btn.BagObject + '\').length==0){flexygo.msg.error(\'flxmodule.noItemsSelected\');}else{' + retFunction + '}';
                            }
                            htmlBTN.attr('onclick', retFunction);
                            if (htmlBTN.attr('title'))
                                htmlBTN.tooltip({ title: htmlBTN.attr('title'), placement: 'bottom' });
                            break;
                        case 'report':
                            if (btn.ReportHasParams) {
                                htmlBTN.attr('onclick', flexygo.utils.functionToString('flexygo.nav.openReportsParams', [btn.ReportName, reportwhere, objectname, objectwhere, objectdefaults, btn.TargetId, false], ['$(this)']));
                            }
                            else {
                                htmlBTN.attr('onclick', flexygo.utils.functionToString('flexygo.nav.viewReport', [btn.ReportName, reportwhere, objectname, objectwhere, objectdefaults, null, btn.TargetId, false]));
                            }
                            if (htmlBTN.attr('title'))
                                htmlBTN.tooltip({ title: htmlBTN.attr('title'), placement: 'bottom' });
                            break;
                        case 'processmenu':
                            htmlBTN.append('<span class="caret"></span>');
                            htmlBTN.attr('onclick', flexygo.utils.functionToString('flexygo.nav.getObjectMenu', [objectname, objectwhere, objectdefaults], ['$(this)', null, "'processes'"]));
                            break;
                        case 'relations':
                            htmlBTN.append('<span class="caret"></span>');
                            htmlBTN.attr('onclick', flexygo.utils.functionToString('flexygo.nav.getObjectMenu', [objectname, objectwhere, objectdefaults], ['$(this)', null, "'relations'"]));
                            break;
                        case 'reportmenu':
                            htmlBTN.append('<span class="caret"></span>');
                            htmlBTN.attr('onclick', flexygo.utils.functionToString('flexygo.nav.getObjectMenu', [objectname, objectwhere, objectdefaults], ['$(this)', null, "'reports'"]));
                            break;
                        case 'runreport':
                            htmlBTN.addClass("saveReportButton");
                            htmlBTN.attr('onclick', flexygo.utils.functionToString('flexygo.ui.wc.FlxModuleElement.prototype.saveReportParams', [reportname, reportwhere, objectname, objectwhere, objectdefaults], ['$(this).closest(\'flx-module\')', '$(this)']));
                            break;
                        case 'runprocess':
                            htmlBTN.addClass("execProcessButton");
                            htmlBTN.attr('onclick', flexygo.utils.functionToString('flexygo.ui.wc.FlxModuleElement.prototype.execProcessParams', [processname, objectname, objectwhere, objectdefaults], ['$(this).closest(\'flx-module\')', '$(this)']));
                            break;
                        case 'back':
                            htmlBTN.on('click', () => {
                                window.history.back();
                            });
                            htmlBTN.tooltip({ title: flexygo.localization.translate('flxmodule.back'), placement: 'bottom' });
                            break;
                        case 'filter':
                            htmlBTN.append('<span class="caret"></span>');
                            htmlBTN.attr('onclick', flexygo.utils.functionToString('flexygo.ui.wc.loadFilter', [objectname], ['$(this).closest(\'flx-module\')', '$(this)']));
                            break;
                        case 'presets':
                            htmlBTN.append('<span class="caret"></span>');
                            htmlBTN.attr('onclick', flexygo.utils.functionToString('flexygo.ui.wc.loadPresets', [objectname], ['$(this).closest(\'flx-module\')', '$(this)']));
                            break;
                        case 'savedsearches':
                            htmlBTN.append('<span class="caret"></span>');
                            htmlBTN.attr('onclick', flexygo.utils.functionToString('flexygo.ui.wc.loadSavedSearches', [objectname], ['$(this).closest(\'flx-module\')', '$(this)']));
                            break;
                        case 'select':
                            htmlBTN.attr('onclick', flexygo.utils.functionToString('flexygo.ui.wc.FlxModuleElement.prototype.execSelectEntity', [objectname, objectwhere], ['$(this).closest(\'flx-module\')', '$(this)']));
                            break;
                        case 'bag':
                            htmlBTN.addClass('bagButton');
                            htmlBTN.attr('onclick', flexygo.utils.functionToString('flexygo.ui.wc.FlxModuleElement.prototype.toggleBag', [objectname, objectwhere], ['$(this)']));
                            break;
                        case 'clearrow':
                            htmlBTN.attr('onclick', 'flexygo.ui.wc.clearRow($(this).closest(\'flx-module\'),$(this));');
                            break;
                        case 'export':
                            htmlBTN.append('<span class="caret"></span>');
                            htmlBTN.attr('onclick', flexygo.utils.functionToString('flexygo.ui.exports.exportListMenu', [objectname, objectwhere, objectdefaults], ['$(this)']));
                            htmlBTN.tooltip({ title: flexygo.localization.translate('flxmodule.export'), placement: 'top', trigger: 'hover' });
                            break;
                        case 'sort':
                            htmlBTN.attr('onclick', flexygo.utils.functionToString('flexygo.ui.templates.showSortManager', [objectname], ['$(this).closest(\'flx-module\')', '$(this)']));
                            break;
                        case 'text':
                            if (htmlBTN.attr('title'))
                                htmlBTN.tooltip({ title: htmlBTN.attr('title'), placement: 'bottom' });
                            break;
                        default:
                            htmlBTN.attr('onclick', 'alert(\'Unknown function ' + type + '\');');
                            htmlBTN.tooltip({ title: flexygo.localization.translate('flxmodule.unknown'), placement: 'bottom' });
                            break;
                    }
                    return htmlBTN;
                }
                changeTemplate() {
                    console.warn('Method: changeTemplate');
                }
                closeWindow() {
                    $(this).parent().parent().parent().find('.ui-dialog-titlebar-close').click();
                }
                toggleFullScreen() {
                    let me = $(this);
                    me.toggleClass("fullscreen");
                    me.find('.icon-minus, .icon-plus').toggle();
                    me.find('.icon-resize, .icon-collapse').toggleClass('icon-resize icon-collapse');
                    if (this.module.is('flx-list') || this.module.is('flx-moduletab')) {
                        if (!this.module.is('flx-list[mode=list]')) {
                            $(this).find('.cntBody').toggleClass("overflowx");
                        }
                    }
                    let ev = {
                        class: "module",
                        type: "resized",
                        sender: this
                    };
                    flexygo.events.trigger(ev);
                }
                setObjectDescrip(objDescrip) {
                    let me = $(this);
                    if (this.moduleTitle.toLowerCase() == '{{objectdescrip}}') {
                        this.moduleTitle = objDescrip;
                        me.find('.cntTitle').html(this.moduleTitle);
                    }
                }
                toImage() {
                    let opt;
                    html2canvas($(this)[0], {
                        onrendered: (canvas) => {
                            var myImage = canvas.toDataURL("image/png");
                            var tWindow = window.open("", "print module");
                            $(tWindow.document.body).html("<img id='Image' src=" + myImage + " style='width:100%;'></img>").ready(() => {
                                tWindow.focus();
                                tWindow.print();
                                tWindow.close();
                            });
                        }
                    });
                }
                openConfig() {
                    flexygo.nav.openPage('edit', 'sysModule', "moduleName='" + this.moduleName + "'", null, 'popup', true);
                }
                toggleBag(objectname, objectwhere, itm) {
                    let obj = new flexygo.obj.Entity(objectname, objectwhere);
                    let bagField = obj.getConfig().UniqueIdentifier;
                    let eventType = 'check';
                    if (bagField) {
                        obj.read();
                        if (typeof obj.data[bagField] == 'undefined') {
                            let textError = flexygo.localization.translate('flxmodule.nofieldBagError').replace('{0}', bagField);
                            flexygo.msg.error(textError);
                        }
                        else {
                            if (flexygo.selection.toggle(objectname, obj.data[bagField].Value)) {
                                itm.addClass('active');
                                itm.closest('tr').addClass('selected');
                            }
                            else {
                                eventType = 'uncheck';
                                itm.removeClass('active');
                                itm.closest('tr').removeClass('selected');
                            }
                        }
                    }
                    else {
                        flexygo.msg.error('flxmodule.uniqueBagError');
                    }
                    let mod = itm.closest('flx-module');
                    let selectionLength = flexygo.selection.getArray(objectname).length;
                    let currentFilter;
                    if (mod.find('flx-list').length > 0) {
                        let list = mod.find('flx-list')[0];
                        if (list.moduleButtons) {
                            if (selectionLength == 0) {
                                currentFilter = list.processwhere;
                            }
                            else {
                                currentFilter = flexygo.selection.getFilterString(objectname);
                            }
                            mod[0].refreshButtons(list.moduleButtons, list.collectionname, currentFilter);
                        }
                        var ev = {
                            class: "entity",
                            type: eventType,
                            sender: this,
                            masterIdentity: list.collectionname,
                            detailIdentity: { moduleFilter: currentFilter, selectedItems: flexygo.selection.getArray(objectname) }
                        };
                        flexygo.events.trigger(ev);
                    }
                    if (selectionLength > 0) {
                        this.activeBagButtons(mod);
                        mod.find('.moduleToolbar [data-type="objectmenu"] .badge').html(selectionLength.toString());
                        mod.find('.moduleToolbar [data-type="objectmenu"] .caret').hide();
                    }
                    else {
                        mod.find('.moduleToolbar [data-type="objectmenu"] .badge').remove();
                        mod.find('.moduleToolbar [data-type="objectmenu"] .caret').show();
                    }
                }
                activeBagButtons(mod) {
                    if (mod.find('[data-type="objectmenu"] .badge').length === 0) {
                        let badgeSelect = $('<span class="badge badge-pill badge-warning"></span>');
                        mod.find('.moduleToolbar [data-type="objectmenu"]').append(badgeSelect);
                    }
                }
                bagSelectionNone(objectName, objectWhere, module, button, cllbck) {
                    flexygo.selection.clear(objectName);
                    module[0].refresh();
                }
                bagSelectionAll(objectName, objectWhere, module, button, cllbck) {
                    let currentFilter = module.find('flx-list')[0].processwhere;
                    flexygo.ajax.post('~/api/List', 'GetBagPage', { ObjectName: objectName, ObjectWhere: currentFilter }, (response) => {
                        if (response.length > 0) {
                            let newArray = flexygo.selection.getArray(objectName).concat(response);
                            flexygo.selection.appendArray(objectName, newArray);
                            module[0].refresh();
                        }
                    });
                }
                bagShowOnlySelected(objectName, objectWhere, module, button, cllbck) {
                    if (flexygo.selection.getArray(objectName).length > 0) {
                        let colWhere = flexygo.selection.getFilterString(objectName);
                        flexygo.nav.openPage('list', $(module).find('flx-list')[0].collectionname, colWhere, null, 'modal', true);
                    }
                    else {
                        flexygo.msg.error('flxmodule.noItemsSelected');
                    }
                }
                deleteModule(objectName, objectWhere, module, button, cllbck) {
                    let resultCallback = (result) => __awaiter(this, void 0, void 0, function* () {
                        if (result) {
                            this.deleteModuleResponse(objectName, objectWhere, module, button, cllbck);
                        }
                    });
                    flexygo.msg.confirm(flexygo.localization.translate('filtermanager.sure'), resultCallback);
                }
                deleteModuleResponse(objectName, objectWhere, module, button, cllbck, lastProcessName, lastAfterProcessName) {
                    return __awaiter(this, void 0, void 0, function* () {
                        let obj = new flexygo.obj.Entity(objectName, objectWhere);
                        obj.read();
                        if (obj.delete(lastProcessName, lastAfterProcessName)) {
                            if (obj.jsCode) {
                                if (obj.lastProcessName || obj.lastAfterProcessName) {
                                    var proc = new flexygo.obj.Entity('SysProcesses', `ProcessName='${(obj.lastProcessName || obj.lastAfterProcessName)}'`);
                                    proc.read();
                                    if (proc.data && proc.data.ConfirmText && proc.data.ConfirmText.Value) {
                                        let res = yield flexygo.msg.confirm(proc.data.ConfirmText.Value);
                                        if (!res)
                                            return;
                                    }
                                }
                                yield flexygo.utils.execAsyncFunction(obj.jsCode, ['sysObj', 'triggerElement'], [obj, button]).then((res) => {
                                    if (res === false)
                                        return;
                                    this.deleteModuleResponse(objectName, objectWhere, module, button, cllbck, obj.lastProcessName, obj.lastAfterProcessName);
                                }).catch((err) => {
                                    flexygo.msg.error(flexygo.utils.getErrorMessage(err));
                                });
                            }
                            else {
                                if (obj.warningMessage) {
                                    flexygo.msg.warning(obj.warningMessage);
                                }
                                else {
                                    if (obj.successMessage) {
                                        flexygo.msg.success(obj.successMessage);
                                    }
                                    else {
                                        flexygo.msg.success(flexygo.localization.translate('flxmodule.deleted'));
                                    }
                                }
                                let currentForm = $(button).closest('.ui-dialog');
                                if (currentForm.length > 0 && objectName == flexygo.history.get(button).objectname) {
                                    currentForm.remove();
                                }
                                else {
                                    if (!module) {
                                        module = $(button).closest('flx-module');
                                    }
                                    //module.find('flx-edit, flx-list, flx-view').data('controller').refresh();
                                    if (module) {
                                        var edit = module.find("flx-edit").first();
                                        if (edit.length > 0) {
                                            edit.attr("objectWhere", "");
                                        }
                                        let wcModule = module[0];
                                        if (wcModule) {
                                            wcModule.refresh();
                                        }
                                    }
                                }
                                if (cllbck) {
                                    cllbck();
                                }
                            }
                        }
                    });
                }
                saveModule(objectName, objectWhere, module, button, afterSaveGoTo = '', defaults = null, lastObj, lastProcessName, lastAfterProcessName) {
                    if (objectWhere.includes('&quot;')) {
                        objectWhere = objectWhere.replace(/&quot;/g, '"');
                    }
                    if (!button || !button.is(':disabled')) {
                        if (module.find('flx-edit').length > 0) {
                            let edit = module.find('flx-edit')[0];
                            if (edit.loadingDependencies > 0) {
                                edit.pendingSaveButton = button;
                                edit.addLock();
                                return;
                            }
                        }
                        //check if moduletab and editgrid
                        let isEditGridOnTab = false;
                        if ($(module)[0].componentString == 'flx-moduletab') {
                            if ($(module).find('.modulediv flx-list').length > 0 && $(module).find('.modulediv flx-list').attr('mode') == 'edit') {
                                isEditGridOnTab = true;
                            }
                        }
                        // check if edit grid
                        if ($(module)[0].componentString != 'flx-list mode="edit"' && !isEditGridOnTab) {
                            if ($(module)[0].componentString == 'flx-edit') {
                                let edit = module.find('flx-edit')[0];
                                edit.validateSQLProperties();
                            }
                            if (module.find('form').valid()) {
                                $('.saveButton').prop('disabled', true);
                                let props = module.find('[property]');
                                if (props.length > 0) {
                                    let obj;
                                    if (!lastObj) {
                                        obj = new flexygo.obj.Entity(objectName, objectWhere);
                                        obj.read();
                                        for (var i = 0; i < props.length; i++) {
                                            let prop = $(props[i])[0];
                                            obj.data[prop.property].Value = prop.getValue();
                                        }
                                    }
                                    else {
                                        obj = lastObj;
                                    }
                                    let ret;
                                    let eventName;
                                    if (!objectWhere || objectWhere == '') {
                                        ret = obj.insert(lastProcessName, lastAfterProcessName);
                                        eventName = 'insert';
                                    }
                                    else {
                                        ret = obj.update(lastProcessName, lastAfterProcessName);
                                        eventName = 'update';
                                    }
                                    $('.saveButton').prop('disabled', false);
                                    if (ret) {
                                        if (obj.jsCode) {
                                            let executeJS = () => __awaiter(this, void 0, void 0, function* () {
                                                if (obj.lastProcessName || obj.lastAfterProcessName) {
                                                    var proc = new flexygo.obj.Entity('SysProcesses', `ProcessName='${(obj.lastProcessName || obj.lastAfterProcessName)}'`);
                                                    proc.read();
                                                    if (proc.data && proc.data.ConfirmText && proc.data.ConfirmText.Value) {
                                                        let res = yield flexygo.msg.confirm(proc.data.ConfirmText.Value);
                                                        if (!res)
                                                            return;
                                                    }
                                                }
                                                if (!this.newObjectWhere && obj.objectWhere)
                                                    this.newObjectWhere = obj.objectWhere; //Sets the newObjectWhere to avoid loading a new incomplete edit
                                                flexygo.utils.execAsyncFunction(obj.jsCode, ['sysObj', 'triggerElement'], [obj, button]).then((res) => {
                                                    if (res === false)
                                                        return;
                                                    this.saveModule(objectName, objectWhere, module, button, afterSaveGoTo, defaults, obj, obj.lastProcessName, obj.lastAfterProcessName);
                                                }).catch((err) => {
                                                    flexygo.msg.error(flexygo.utils.getErrorMessage(err));
                                                });
                                            });
                                            executeJS();
                                            return true;
                                        }
                                        if (obj.warningMessage) {
                                            flexygo.msg.warning(obj.warningMessage);
                                        }
                                        else {
                                            if (obj.getConfig().ConfirmOkText) {
                                                if (obj.successMessage) {
                                                    flexygo.msg.success(obj.successMessage);
                                                }
                                                else {
                                                    flexygo.msg.success(flexygo.localization.translate('flxmodule.saved'));
                                                }
                                            }
                                        }
                                        let modBody = module.find('.cntBody');
                                        modBody.css('min-height', modBody.height() + 'px');
                                        let editModule = module.is('flx-edit') ? module : module.find('flx-edit');
                                        if (editModule.length > 0) {
                                            let modTab = editModule.closest('flx-moduletab');
                                            if (eventName == 'insert' && modTab.length > 0) {
                                                modTab.attr('ObjectWhere', obj.objectWhere);
                                                modTab.attr('ObjectName', obj.objectName);
                                                modTab.attr('isClone', 'false');
                                                let tabWc = modTab[0];
                                                tabWc.refresh();
                                            }
                                            else {
                                                editModule.attr('ObjectWhere', (this.newObjectWhere || obj.objectWhere));
                                                editModule.attr('ObjectName', obj.objectName);
                                                editModule.attr('isClone', 'false');
                                                let editWc = editModule[0];
                                                editWc.refresh();
                                            }
                                        }
                                        this.newObjectWhere = null;
                                        //This is now controlled by Entity
                                        //$(document).trigger(eventName, [obj, editModule.edit]);
                                        var context = flexygo.history.get(module);
                                        if (context) {
                                            if (obj.objectName.toLowerCase() == context.objectname.toLowerCase()) {
                                                let params = {
                                                    StrType: context.pagetypeid,
                                                    ObjectName: obj.objectName,
                                                    ObjectWhere: obj.objectWhere
                                                };
                                                flexygo.ajax.post('~/api/Page', 'GetPageObjectDefaults', params, (response) => {
                                                    $(module).closest('.pageContainer').find('flx-module').each((i, e) => {
                                                        if ($(e).is('[init="false"]')) {
                                                            let mod = $(e);
                                                            mod.removeAttr('init');
                                                            e.objectname = obj.objectName;
                                                            e.objectwhere = obj.objectWhere;
                                                            //Refresh defaults for dependant modules
                                                            if (response.Modules[e.moduleName]) {
                                                                e.objectdefaults = response.Modules[e.moduleName].ObjectDefaults;
                                                            }
                                                            e.init();
                                                            mod.show();
                                                        }
                                                        else if (e.moduleName != module.moduleName) {
                                                            if (response.Modules[e.moduleName]) {
                                                                e.objectdefaults = response.Modules[e.moduleName].ObjectDefaults;
                                                            }
                                                        }
                                                    });
                                                });
                                            }
                                        }
                                        if (!obj.warningMessage) {
                                            if (afterSaveGoTo === 'view') {
                                                flexygo.nav.openPage('view', objectName, obj.objectWhere, defaults, 'current', false, module);
                                            }
                                            else if (afterSaveGoTo === 'edit') {
                                                flexygo.nav.openPage('edit', objectName, '', defaults, 'current', false, module);
                                            }
                                        }
                                        return true;
                                    }
                                    else {
                                        button.animate({ backgroundColor: flexygo.colors.danger }, 700);
                                    }
                                }
                                else {
                                    flexygo.msg.success(flexygo.localization.translate('flxmodule.noprop'));
                                }
                            }
                            else {
                                let reqProps = [];
                                for (let i = 0; i < module.find('form').validate().errorList.length; i++) {
                                    let reqPoperty = module.find('form').validate().errorList[i].element.name;
                                    let reqLabel = module.find('label[lblproperty="' + reqPoperty + '"]').text();
                                    reqProps.push((reqLabel ? reqLabel.replace(':', '') : reqPoperty));
                                }
                                flexygo.msg.warning(flexygo.localization.translate('flxmodule.requiredsaving') + ' ' + reqProps.join(', '));
                            }
                            return false;
                        }
                        else {
                            //edit grid
                            //run through all dirty forms an do a save row
                            let rowsToSave = $(module).find('flx-list[mode="edit"] tbody tr[objectname].form.dirty, flx-list[mode="edit"] tfoot tr.rowInsert.dirty');
                            for (let i = 0; i < rowsToSave.length; i++) {
                                let row = $(rowsToSave[i]);
                                wc_1.saveRow(row.attr("objectname") || row.closest('flx-list')[0].objectname, row.attr("objectwhere"), module.find('flx-list'), $(row).find('button.saveRowButton'), false);
                            }
                        }
                    }
                }
                saveReportParams(reportname, reportwhere, objectname, objectwhere, objectdefaults, module, button) {
                    if ($(module)[0].componentString == 'flx-edit') {
                        let edit = module.find('flx-edit')[0];
                        edit.validateSQLProperties();
                    }
                    if (!button || !button.is(':disabled')) {
                        if (module.find('form').valid()) {
                            $('.saveReportButton').prop('disabled', true);
                            var props = module.find('[property]');
                            var params = new Array();
                            if (props.length > 0) {
                                for (let i = 0; i < props.length; i++) {
                                    let prop = $(props[i])[0];
                                    if (!prop.options || !prop.options.DetachedFromDB) {
                                        params.push({ 'key': prop.property, 'value': prop.getValue() });
                                    }
                                }
                                flexygo.nav.viewReport(reportname, reportwhere, objectname, objectwhere, objectdefaults, params, 'new', true);
                            }
                            else {
                                flexygo.msg.success(flexygo.localization.translate('flxmodule.noparams'));
                            }
                            $('.saveReportButton').prop('disabled', false);
                        }
                        else {
                            flexygo.msg.warning(flexygo.localization.translate('flxmodule.requiredreport'));
                        }
                    }
                }
                execProcessParams(processname, objectname, objectwhere, defaults, module, button) {
                    if ($(module)[0].componentString == 'flx-edit') {
                        let edit = module.find('flx-edit')[0];
                        edit.validateSQLProperties();
                    }
                    if (!button || !button.is(':disabled')) {
                        if (module.find('form').valid()) {
                            $('.execProcessButton').prop('disabled', true);
                            let props = module.find('[property]');
                            let params = new Array();
                            if (props.length > 0) {
                                for (var i = 0; i < props.length; i++) {
                                    let prop = $(props[i])[0];
                                    let edit = module.find('flx-edit:first')[0];
                                    if (!edit.data[prop.property].DetachedFromDB) {
                                        params.push({ 'key': prop.property, 'value': prop.getValue() });
                                    }
                                }
                                flexygo.nav.execProcess(processname, objectname, objectwhere, defaults, params, 'new', true, button);
                            }
                            else {
                                flexygo.msg.error(flexygo.localization.translate('flxmodule.noparams'));
                            }
                            $('.execProcessButton').prop('disabled', false);
                        }
                        else {
                            flexygo.msg.warning(flexygo.localization.translate('flxmodule.requiredrunning'));
                        }
                    }
                }
                execSelectEntity(objectname, objectwhere, module, button) {
                    let obj = new flexygo.obj.Entity(objectname, objectwhere);
                    obj.read();
                    let ev = {
                        class: "entity",
                        type: "selected",
                        sender: obj,
                        masterIdentity: objectname,
                        detailIdentity: objectwhere
                    };
                    flexygo.events.trigger(ev);
                }
                startLoading() {
                    $(this).find('.icon-sincronize').addClass('icon-spin txt-outstanding');
                    $(this).addClass('loading');
                    NProgress.start();
                }
                stopLoading() {
                    $(this).find('.icon-sincronize').removeClass('icon-spin txt-outstanding');
                    $(this).removeClass('loading');
                    NProgress.done();
                }
                /**
                * Checks if form is dirty.
                * @method checkDirtyEdit
                * @return {boolean}
                */
                checkDirtyEdit() {
                    let me = $(this);
                    let dlg = me.closest("main.pageContainer");
                    let form = me.find('form');
                    let dirtyForms = form.filter('.dirty');
                    if (dirtyForms.length != 0 && document.body.contains(this)) {
                        Lobibox.confirm({
                            title: flexygo.localization.translate('flxedit.areyousuretitle'),
                            msg: flexygo.localization.translate('flxedit.areyousuremsg'),
                            buttons: {
                                yes: {
                                    'class': 'lobibox-btn lobibox-btn-yes',
                                    text: flexygo.localization.translate('flxedit.areyousuremsgyes'),
                                    closeOnClick: true
                                },
                                no: {
                                    'class': 'lobibox-btn lobibox-btn-no',
                                    text: flexygo.localization.translate('flxedit.areyousuremsgno'),
                                    closeOnClick: true
                                }
                            },
                            iconClass: '',
                            callback: (dialog, type, ev) => {
                                if (type == "yes") {
                                    let ev = {
                                        class: "dialog",
                                        type: "closed",
                                        sender: dlg.data('context')
                                    };
                                    dlg.addClass("closing");
                                    flexygo.events.trigger(ev);
                                    dlg.dialog('close');
                                    //dlg.dialog('destroy').remove();
                                }
                            }
                        });
                        return false; //cancel default close
                    }
                }
            }
            wc_1.FlxModuleElement = FlxModuleElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define("flx-module", flexygo.ui.wc.FlxModuleElement);
//# sourceMappingURL=flx-module.js.map