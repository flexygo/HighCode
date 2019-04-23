/**
 * @namespace flexygo.ui.wc
 */
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
                    this.componentString = '';
                    this.moduleInitClass = null;
                    this.JSAfterLoad = null;
                    this.mode = null;
                    this.reportname = null;
                    this.processname = null;
                    this.emptyTop = false;
                    this.emptyTimer = null;
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
                    if (this.componentString && this.componentString.length > 0) {
                        let module = $('<' + this.componentString + ' />').attr('ObjectName', this.objectname).attr('ObjectWhere', this.objectwhere).attr('reportName', this.reportname).attr('processName', this.processname).attr('id', 'mod-' + this.moduleName).attr('modulename', this.moduleName);
                        if (this.ManualInit) {
                            module.attr('manualInit', 'true');
                        }
                        if (!module.attr('mode')) {
                            module.attr('mode', this.mode);
                        }
                        if (this.isClone) {
                            module.attr('isClone', "true");
                        }
                        me.find('.cntBody').append(module);
                        if (module.is('flx-list[mode=list]')) {
                            me.find('.cntBody').addClass("overflowx");
                        }
                        else {
                            me.find('.cntBody').removeClass("overflowx");
                        }
                    }
                    this.loadHeader();
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
                    if (this.JSAfterLoad && this.JSAfterLoad != '') {
                        jsAF = this.JSAfterLoad;
                    }
                    if ((me.attr('type').toLowerCase() == 'flx-moduletab') || (me.attr('type').toLowerCase() == 'flx-buttontab')) {
                        let tab = me.find('flx-moduletab:last')[0];
                        let cnf = tab.activeModule;
                        if (cnf.JSAfterLoad && cnf.JSAfterLoad != '') {
                            jsAF = cnf.JSAfterLoad;
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
                setButtons(buttons, objectname, objectwhere, reportname, processname) {
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
                            for (let i = 0; i < arrBtn.length; i++) {
                                let btn = arrBtn[i];
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
                                    btnGroup.append(this.getButton(btn, objectname, objectwhere, defString, reportname, null, processname));
                                }
                                lastPosition = btn.PositionId;
                            }
                            if (btnGroup) {
                                this.addGroup(lastPosition, btnGroup);
                            }
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
                        for (let key in buttons) {
                            let htmlBtn = me.find('[ButtonId="' + buttons[key].ButtonId + '"]');
                            if (htmlBtn.length > 0) {
                                this.refreshButton(htmlBtn, buttons[key], objectname, objectwhere, defString, reportname, null, processname);
                            }
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
                getButton(btn, objectname, objectwhere, objectdefaults, reportname, reportwhere, processname) {
                    let type = btn.TypeId;
                    if (type) {
                        type = type.toLowerCase();
                    }
                    let htmlBTN = $('<button class="btn btn-default" />');
                    htmlBTN.attr('ButtonId', btn.ButtonId);
                    if (!btn.HideText) {
                        htmlBTN.html('<span>' + btn.Text + '</span>');
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
                            htmlBTN.attr('onclick', flexygo.utils.functionToString('flexygo.nav.execProcess', [btn.ProcessName, objectname, objectwhere, objectdefaults, null, btn.TargetId, false], ['$(this)']));
                            htmlBTN.tooltip({ title: flexygo.localization.translate('flxmodule.settings'), placement: 'bottom' });
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
                    if (mod.find('flx-list').length > 0) {
                        let list = mod.find('flx-list')[0];
                        if (list.moduleButtons) {
                            if (selectionLength == 0) {
                                mod[0].refreshButtons(list.moduleButtons, list.objectname, list.processwhere);
                            }
                            else
                                mod[0].refreshButtons(list.moduleButtons, list.objectname, flexygo.selection.getFilterString(objectname));
                        }
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
                    flexygo.ajax.post('~/api/List', 'getBagPage', { ObjectName: objectName, ObjectWhere: currentFilter }, (response) => {
                        if (response.length > 0) {
                            flexygo.selection.appendArray(objectName, response);
                            module[0].refresh();
                        }
                    });
                }
                bagShowOnlySelected(objectName, objectWhere, module, button, cllbck) {
                    if (flexygo.selection.getArray(objectName).length > 0) {
                        let colWhere = flexygo.selection.getFilterString(objectName);
                        flexygo.nav.openPage('list', $(module).find('flx-list')[0].objectname, colWhere, null, 'modal', true);
                    }
                    else {
                        flexygo.msg.error('flxmodule.noItemsSelected');
                    }
                }
                deleteModule(objectName, objectWhere, module, button, cllbck) {
                    let resultCallback = (result) => {
                        if (result) {
                            let obj = new flexygo.obj.Entity(objectName, objectWhere);
                            if (obj.delete()) {
                                flexygo.msg.success(flexygo.localization.translate('flxmodule.deleted'));
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
                                if (cllbck) {
                                    cllbck();
                                }
                            }
                        }
                    };
                    flexygo.msg.confirm(flexygo.localization.translate('filtermanager.sure'), resultCallback);
                }
                saveModule(objectName, objectWhere, module, button) {
                    if (!button || !button.is(':disabled')) {
                        // check if edit grid
                        if ($(module)[0].componentString != 'flx-list mode="edit"') {
                            if (module.find('form').valid()) {
                                $('.saveButton').prop('disabled', true);
                                let props = module.find('[property]');
                                if (props.length > 0) {
                                    let obj = new flexygo.obj.Entity(objectName, objectWhere);
                                    obj.read();
                                    for (var i = 0; i < props.length; i++) {
                                        let prop = $(props[i])[0];
                                        obj.data[prop.property].Value = prop.getValue();
                                    }
                                    let ret;
                                    let eventName;
                                    if (!objectWhere || objectWhere == '') {
                                        ret = obj.insert();
                                        eventName = 'insert';
                                    }
                                    else {
                                        ret = obj.update();
                                        eventName = 'update';
                                    }
                                    $('.saveButton').prop('disabled', false);
                                    if (ret) {
                                        flexygo.msg.success(flexygo.localization.translate('flxmodule.saved'));
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
                                                editModule.attr('ObjectWhere', obj.objectWhere);
                                                editModule.attr('ObjectName', obj.objectName);
                                                editModule.attr('isClone', 'false');
                                                let editWc = editModule[0];
                                                editWc.refresh();
                                            }
                                        }
                                        //This is now controlled by Entity
                                        //$(document).trigger(eventName, [obj, editModule.edit]);
                                        var context = flexygo.history.get(module);
                                        if (context) {
                                            if (eventName == 'insert' && obj.objectName.toLowerCase() == context.objectname.toLowerCase()) {
                                                let params = {
                                                    StrType: context.pagetypeid,
                                                    ObjectName: obj.objectName,
                                                    ObjectWhere: obj.objectWhere
                                                };
                                                flexygo.ajax.post('~/api/Pages', 'getPageObjectDefaults', params, (response) => {
                                                    $(module).closest('.pageContainer').find('flx-module[init="false"]').each((i, e) => {
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
                                                    });
                                                });
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
                                flexygo.msg.warning(flexygo.localization.translate('flxmodule.requiredsaving') + module.find('form').validate().errorList[0].element.name);
                            }
                            return false;
                        }
                        else {
                            //edit grid
                            //run through all dirty forms an do a save row
                            let rowsToSave = $(module).find('flx-list[mode="edit"] tbody tr[objectname].form.dirty');
                            for (let i = 0; i < rowsToSave.length; i++) {
                                let row = $(rowsToSave[i]);
                                wc_1.saveRow(row.attr("objectname"), row.attr("objectwhere"), module.find('flx-list'), $(row).find('button.saveRowButton'), false);
                            }
                        }
                    }
                }
                saveReportParams(reportname, reportwhere, objectname, objectwhere, objectdefaults, module, button) {
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
                            flexygo.msg.warning(flexygo.localization.translate('flxmodule.requiredrunning'));
                        }
                    }
                }
                execProcessParams(processname, objectname, objectwhere, defaults, module, button) {
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
                            flexygo.msg.warning(flexygo.localization.translate('flxmodule.requiredreport'));
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
            }
            wc_1.FlxModuleElement = FlxModuleElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define("flx-module", flexygo.ui.wc.FlxModuleElement);
//# sourceMappingURL=flx-module.js.map