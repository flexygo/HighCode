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
            * Library for the flx-edit web component.
            *
            * @class FlxEditElement
            * @constructor
            * @return {FlxEditElement} .
            */
            class FlxEditElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                   * Set when component is attached to DOM
                   * @property connected {boolean}
                   */
                    this.connected = false;
                    this.moduleName = null;
                    this.objectname = null;
                    this.objectwhere = null;
                    this.processName = null;
                    this.reportName = null;
                    this.mode = null;
                    this.tHeader = null;
                    this.tBody = null;
                    this.tFooter = null;
                    this.templateId = null;
                    this.defaults = null;
                    this.JSforParams = null;
                    this.maxTabIndex = 0;
                    this.isClone = false;
                    this.dependenciesLoaded = false;
                    this.loadingDependencies = 0;
                    this.pendingSaveButton = null;
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    this.connected = true;
                    let element = $(this);
                    this.moduleName = element.attr("modulename");
                    this.reportName = element.attr("reportName");
                    this.processName = element.attr("processName");
                    let mode = 'edit';
                    if (this.reportName) {
                        mode = 'report';
                    }
                    if (this.processName) {
                        mode = 'process';
                    }
                    this.mode = mode;
                    this.defaults = element.attr("defaults");
                    if (this.moduleName) {
                        if (element.attr('manualInit') != 'true') {
                            this.init();
                        }
                    }
                }
                /**
                * Fires when element is dettached to DOM
                * @method connectedCallback
                */
                disconnectedCallback() {
                    flexygo.events.off(this, "property", "changed", this.onPropertyChanged);
                    for (let i = 0; i < $(this).find('flx-code[editor="monaco"]').length; i++) {
                        let monacoEditor = $(this).find('flx-code[editor="monaco"]')[i];
                        if (monacoEditor.monaco) {
                            monacoEditor.monaco.dispose();
                        }
                        flexygo.events.off(monacoEditor, 'property', 'resized');
                        flexygo.events.off(monacoEditor, 'module', 'resized');
                        flexygo.events.off(monacoEditor, 'dialog', 'resized');
                    }
                }
                /**
               * Fires when the attribute value of the element is changed.
               * @method attributeChangedCallback
               */
                attributeChangedCallback(attrName, oldVal, newVal) {
                    if (!this.connected) {
                        return;
                    }
                    if (attrName.toLowerCase() == 'modulename' && newVal && newVal != '') {
                        this.moduleName = newVal;
                        if (this.moduleName) {
                            this.refresh();
                        }
                    }
                }
                /**
                * Refresh de webcomponent.
                * @method init
                */
                init() {
                    this.dependenciesLoaded = false;
                    //Remove WebControl events
                    flexygo.events.off(this, "property", "changed", this.onPropertyChanged);
                    //Capture WebControl events
                    flexygo.events.on(this, "property", "changed", this.onPropertyChanged, true);
                    //Remove handler on DOM element remove
                    $(this).on("destroy", () => {
                        flexygo.events.off(this, "property", "changed", this.onPropertyChanged);
                    });
                    let me = $(this);
                    me.removeAttr('manualInit');
                    $(this).closest('flx-module').find('.flx-noInitContent').remove();
                    this.templateId = null;
                    switch (me.attr('Mode')) {
                        case 'process':
                            this.initProcessMode();
                            break;
                        case 'report':
                            this.initReportMode();
                            break;
                        default:
                            this.initEditMode();
                    }
                    $(this).off('keydown.tabcontrol').on('keydown.tabcontrol', (ev) => {
                        if (ev.key === 'Tab') {
                            var target = $(ev.target).closest("[Property]");
                            if (!target.is('flx-barcode') && !target.is('flx-code')) {
                                var index = parseInt($(ev.target).attr('tabindex'));
                                if (ev.shiftKey)
                                    index--;
                                else
                                    index++;
                                var dependenciesLoad = setInterval(() => {
                                    if (target.find('.item #flx-dependency-loader, .grid-stack-item #flx-dependency-loader').length === 0) {
                                        if (!target.find('> div').hasClass('has-error')) {
                                            let control = $(this).find("[tabindex=" + index + "]");
                                            if (control.closest('flx-text').attr('type') === "thousandSeparator") {
                                                control.select().click();
                                            }
                                            else if (control.closest('flx-multicombo').length === 0) {
                                                control.select().focus();
                                            }
                                            else {
                                                let searchControl = $(this).find(`[tabindex="${index}"][type="search"]`);
                                                if (searchControl.is(':visible'))
                                                    searchControl.focus();
                                                else
                                                    control.focus().click();
                                            }
                                        }
                                        clearInterval(dependenciesLoad);
                                    }
                                }, 200);
                            }
                        }
                    });
                }
                /**
                * Refresh de webcomponent.
                * @method refresh
                */
                refresh() {
                    for (let i = 0; i < $(this).find('flx-code[editor="monaco"]').length; i++) {
                        let monacoEditor = $(this).find('flx-code[editor="monaco"]')[i];
                        if (monacoEditor.monaco) {
                            monacoEditor.monaco.dispose();
                        }
                        flexygo.events.off(monacoEditor, 'property', 'resized');
                        flexygo.events.off(monacoEditor, 'module', 'resized');
                        flexygo.events.off(monacoEditor, 'dialog', 'resized');
                    }
                    if ($(this).attr('manualInit') != 'true') {
                        this.init();
                    }
                }
                /**
               * Init the webcomponent in edit mode.
               * @method initEditMode
               */
                initEditMode() {
                    let me;
                    let objDef;
                    let selector;
                    //let loadRet = this.loadRet;
                    me = $(this);
                    objDef = null;
                    me.html('');
                    if (this.defaults) {
                        if (typeof this.defaults == 'string') {
                            objDef = JSON.parse(this.defaults);
                        }
                        else {
                            objDef = this.defaults;
                        }
                    }
                    else {
                        let histObj = flexygo.history.get(me);
                        if (typeof histObj != 'undefined' && histObj.defaults) {
                            if (typeof histObj.defaults == 'string') {
                                objDef = JSON.parse(flexygo.utils.parser.replaceAll(histObj.defaults, "'", '"'));
                            }
                            else {
                                objDef = histObj.defaults;
                            }
                        }
                        if (objDef == null) {
                            let wcMod = me.closest('flx-module')[0];
                            if (wcMod) {
                                objDef = wcMod.objectdefaults;
                            }
                        }
                    }
                    this.isClone = (me.attr('isClone') === 'true');
                    let params = {
                        ObjectName: me.attr('ObjectName'),
                        ObjectWhere: me.attr('ObjectWhere'),
                        ModuleName: this.moduleName,
                        Defaults: flexygo.utils.dataToArray(objDef),
                        TemplateId: this.templateId,
                        Clone: (me.attr('isClone') === 'true')
                    };
                    flexygo.ajax.post('~/api/Edit', 'GetEditTemplate', params, (response) => {
                        if (response) {
                            let template = response.Template;
                            let parentModule = me.closest('flx-module');
                            let wcModule = parentModule[0];
                            if (parentModule && wcModule) {
                                if (response.Buttons) {
                                    wcModule.setButtons(response.Buttons, response.ObjectName, response.ObjectWhere);
                                    this.setMaxTabindex(response.Properties);
                                    let btns = parentModule.find('.cntBodyFooter .moduleButtons div.btn-group span.submenuContainer button, .cntBodyFooter .moduleButtons div.btn-group button');
                                    btns.each((i, btn) => {
                                        this.maxTabIndex++;
                                        $(btn).attr('tabIndex', this.maxTabIndex);
                                    });
                                }
                                else {
                                    wcModule.setButtons(null, response.ObjectName, response.ObjectWhere);
                                }
                                wcModule.setObjectDescrip(response.Title);
                            }
                            else {
                                return;
                            }
                            this.data = template.Data;
                            this.tHeader = template.Header;
                            this.tBody = template.Body;
                            this.tFooter = template.Footer;
                            this.properties = response.Properties;
                            this.objectname = response.ObjectName;
                            this.objectwhere = response.ObjectWhere;
                            this.templateId = response.Template.Id;
                            if (response.TemplateList) {
                                this.templateList = response.TemplateList;
                            }
                            this.render();
                            this.initValidate();
                        }
                        if (!me.closest('div.ui-dialog').length) {
                            selector = 'div#mainContent';
                        }
                        else {
                            selector = 'div.ui-dialog';
                        }
                        me.closest(selector).find('flx-module flx-edit').first().find('[property] select:enabled:visible, [property] input:enabled:visible, [property] textarea:enabled:visible').first().focus();
                        let parentModule = me.closest('flx-module');
                        let wcModule = parentModule[0];
                        if (parentModule && wcModule) {
                            wcModule.moduleLoaded(this);
                            if (wcModule.ModuleViewers && response.ObjectWhere !== '') {
                                this.currentViewers = response.CurrentViewers;
                                flexygo.utils.refreshModuleViewersInfo(wcModule, this.currentViewers);
                                flexygo.utils.checkObserverModule(wcModule, 20000);
                                flexygo.events.on(this, 'push', 'notify', function (e) {
                                    switch (e.masterIdentity) {
                                        case 'GetSetModuleViewers': {
                                            if ((wcModule.moduleName == '' ? null : wcModule.moduleName) == (e.sender.ModuleName == '' ? null : e.sender.ModuleName)
                                                && (wcModule.objectname == '' ? null : wcModule.objectname) == (e.sender.ObjectName == '' ? null : e.sender.ObjectName)
                                                && (wcModule.objectwhere == '' ? null : wcModule.objectwhere) == (e.sender.ObjectWhere == '' ? null : e.sender.ObjectWhere)) {
                                                flexygo.utils.refreshModuleViewersInfo(wcModule, e.sender.ActiveUsers);
                                            }
                                            break;
                                        }
                                        default: {
                                            break;
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
                /**
               * Init the webcomponent in edit report parameter mode.
               * @method initReportMode
               */
                initReportMode() {
                    let me = $(this);
                    let objDef;
                    let selector;
                    if (this.defaults) {
                        objDef = JSON.parse(this.defaults);
                    }
                    else {
                        let histObj = flexygo.history.get(me);
                        if (typeof histObj != 'undefined' && histObj.defaults && histObj.defaults != '') {
                            objDef = JSON.parse(flexygo.utils.parser.replaceAll(histObj.defaults, "'", '"'));
                        }
                    }
                    me.html('');
                    //let loadRet = this.loadRet;
                    let params = {
                        "ObjectName": me.attr('ObjectName'),
                        "ObjectWhere": me.attr('ObjectWhere'),
                        "ModuleName": this.moduleName,
                        "ReportName": me.attr('ReportName'),
                        "Defaults": flexygo.utils.dataToArray(objDef),
                    };
                    flexygo.ajax.post('~/api/Edit', 'GetReportParamsTemplate', params, (response) => {
                        if (response) {
                            if (me.closest('.ui-dialog').find('.ui-dialog-title').length > 0) {
                                if (me.closest('.ui-dialog').find('.ui-dialog-title').html() == '{{ReportDescrip}}') {
                                    me.closest('.ui-dialog').find('.ui-dialog-title').html(response.Title);
                                }
                            }
                            let template = response.Template;
                            let parentModule = me.closest('flx-module');
                            let wcModule = parentModule[0];
                            if (parentModule && wcModule) {
                                if (response.Buttons) {
                                    wcModule.setButtons(response.Buttons, response.ObjectName, response.ObjectWhere, response.ReportName, null);
                                    this.setMaxTabindex(response.Properties);
                                    let btns = $(wcModule).find('.cntBodyFooter .moduleButtons div.btn-group span.submenuContainer button, .cntBodyFooter .moduleButtons div.btn-group button');
                                    btns.each((i, btn) => {
                                        this.maxTabIndex++;
                                        $(btn).attr('tabIndex', this.maxTabIndex);
                                    });
                                }
                                else {
                                    wcModule.setButtons(null, response.ObjectName, response.ObjectWhere, response.ReportName, null);
                                }
                                wcModule.setObjectDescrip(response.Title);
                            }
                            this.data = response.Properties;
                            this.tHeader = template.Header;
                            this.tBody = template.Body;
                            this.tFooter = template.Footer;
                            this.properties = response.Properties;
                            this.render();
                            this.initValidate();
                        }
                        if (!me.closest('div.ui-dialog').length) {
                            selector = 'div#mainContent';
                        }
                        else {
                            selector = 'div.ui-dialog';
                        }
                        me.closest(selector).find('flx-module flx-edit').first().find('[property] select:enabled:visible, [property] input:enabled:visible, [property] textarea:enabled:visible').first().focus();
                        let parentModule = me.closest('flx-module');
                        let wcModule = parentModule[0];
                        if (parentModule && wcModule) {
                            wcModule.moduleLoaded(this);
                        }
                    });
                }
                /**
                * Gets maximum tab index.
                * @method setMaxTabindex
                * @param {flexygo.api.ObjectPropertyCollection} props
                */
                setMaxTabindex(props) {
                    if (this.maxTabIndex === 0) {
                        this.maxTabIndex = Object.keys(props).length + this.lastEditControlsCount();
                    }
                }
                /**
                * Gets last loaded edit controls number
                * @method lastEditControlsCount
                * @param {flexygo.api.ObjectPropertyCollection} props
                * @return {string}
                */
                lastEditControlsCount() {
                    $(this).addClass('flx-currentExaminedEdit');
                    let otherEdits = $(`flx-edit:not(.flx-currentExaminedEdit)[ControlsNumber]`);
                    let totalControls = 0;
                    if (otherEdits.length > 0) {
                        otherEdits.each((index, el) => {
                            let elementControls = parseInt(el.getAttribute('ControlsNumber'));
                            totalControls = elementControls > totalControls ? elementControls : totalControls;
                        });
                    }
                    $(this).removeClass('flx-currentExaminedEdit');
                    return totalControls;
                }
                /**
              * Init the webcomponent in edit process parameter mode.
              * @method initProcessMode
              */
                initProcessMode() {
                    let me = $(this);
                    me.html('');
                    let objDef = null;
                    let selector;
                    if (this.defaults) {
                        objDef = JSON.parse(this.defaults);
                    }
                    else {
                        let histObj = flexygo.history.get(me);
                        if (typeof histObj != 'undefined' && histObj.defaults && histObj.defaults != '') {
                            objDef = JSON.parse(flexygo.utils.parser.replaceAll(histObj.defaults, "'", '"'));
                        }
                    }
                    //let loadRet = this.loadRet;
                    let params = {
                        "ObjectName": me.attr('ObjectName'),
                        "ObjectWhere": me.attr('ObjectWhere'),
                        "ModuleName": this.moduleName,
                        "ProcessName": me.attr('ProcessName'),
                        "Defaults": flexygo.utils.dataToArray(objDef),
                    };
                    flexygo.ajax.post('~/api/Edit', 'GetProcessParamsTemplate', params, (response) => {
                        if (response) {
                            if (me.closest('.ui-dialog').find('.ui-dialog-title').length > 0) {
                                if (me.closest('.ui-dialog').find('.ui-dialog-title').html() == '{{ProcessDescrip}}') {
                                    me.closest('.ui-dialog').find('.ui-dialog-title').html(response.Title);
                                }
                            }
                            let template = response.Template;
                            let parentModule = me.closest('flx-module');
                            let wcModule = parentModule[0];
                            if (parentModule && wcModule) {
                                if (response.Buttons) {
                                    wcModule.setButtons(response.Buttons, response.ObjectName, response.ObjectWhere, null, response.ProcessName, undefined, flexygo.history.get(me).callback);
                                    this.setMaxTabindex(response.Properties);
                                    let btns = $(wcModule).find('.cntBodyFooter .moduleButtons div.btn-group span.submenuContainer button, .cntBodyFooter .moduleButtons div.btn-group button');
                                    btns.each((i, btn) => {
                                        this.maxTabIndex++;
                                        $(btn).attr('tabIndex', this.maxTabIndex);
                                    });
                                }
                                else {
                                    wcModule.setButtons(null, response.ObjectName, response.ObjectWhere, null, response.ProcessName);
                                }
                                wcModule.setObjectDescrip(response.Title);
                            }
                            this.data = response.Properties;
                            this.tHeader = template.Header;
                            this.tBody = template.Body;
                            this.tFooter = template.Footer;
                            this.properties = response.Properties;
                            this.JSforParams = response.JSforParams;
                            this.render();
                            this.initValidate();
                            if (response.RunButtonText) {
                                if (me.closest('flx-module').find("button[data-type='runprocess']")) {
                                    me.closest('flx-module').find("button[data-type='runprocess']").children('span').html(response.RunButtonText);
                                }
                            }
                            if (response.RunButtonIconName) {
                                if (me.closest('flx-module').find("button[data-type='runprocess'] i")) {
                                    me.closest('flx-module').find("button[data-type='runprocess']").children('i').removeClass().addClass(response.RunButtonIconName + ' margin-right-s');
                                }
                            }
                        }
                        if (!me.closest('div.ui-dialog').length) {
                            selector = 'div#mainContent';
                        }
                        else {
                            selector = 'div.ui-dialog';
                        }
                        me.closest(selector).find('flx-module flx-edit').first().find('[property] select:enabled:visible, [property] input:enabled:visible, [property] textarea:enabled:visible').first().focus();
                        let parentModule = me.closest('flx-module');
                        let wcModule = parentModule[0];
                        if (wcModule) {
                            wcModule.moduleLoaded(this);
                        }
                    });
                }
                /**
                * Starts control validation.
                * @method initValidate
                */
                initValidate() {
                    let me = $(this);
                    me.find('form').validate({
                        ignore: '.hidProps input, .hidProps select, .hidProps textarea, .hidProps [contenteditable]',
                        unhighlight: (element, errorClass, validClass) => {
                            $(element).parent().addClass('has-success').removeClass('has-error');
                        },
                        highlight: (element, errorClass, validClass) => {
                            $(element).parent().removeClass('has-success').addClass('has-error');
                        },
                        errorPlacement: (error, element) => {
                            if ($(element).closest('flx-radio').length > 0) {
                                error.css("display", 'block');
                                error.insertAfter($(element).parent().parent()[0]);
                            }
                            else {
                                error.insertAfter($(element).parent()[0]);
                            }
                        },
                        errorClass: 'txt-danger'
                    });
                }
                addLock() {
                    $(this).append('<div style="position:absolute;z-index:60;top:0px;bottom:0px;left:0px;right:0px;background-color:rgba(255,255,255,0.5);" class="lockDiv">&nbsp;</div>');
                    $(this).closest('.cntBody').css('position', 'relative');
                }
                removeLock() {
                    $(this).closest('.cntBody').css('position', '');
                    $(this).find('.lockDiv').remove();
                }
                /**
                * Starts control rendering.
                * @method render
                */
                render() {
                    let me = $(this);
                    let rendered = flexygo.utils.parser.recursiveCompile(this.data, this.tBody, this);
                    me.empty();
                    me.html(rendered);
                    me.append('<div style="clear:both"></div>');
                    if (!this.moduleName) {
                        let btn = $('<button class="btn btn-default bg-info saveButton"> <i class="flx-icon icon-save-2" > </i> <span>' + flexygo.localization.translate('flxedit.save') + '</span> </button>');
                        btn.on('click', (ev) => {
                            flexygo.ui.wc.FlxModuleElement.prototype.saveModule(this.objectname, this.objectwhere, $(this), null);
                        });
                        me.append(btn);
                    }
                    this.setFormValues();
                    let reduce = 0;
                    if (flexygo.utils.isSizeSmartphone()) {
                        reduce = 20;
                    }
                    let cellH = 62 - reduce;
                    let itm = me.closest('.size-xs,.size-s,.size-m,.size-l,.no-label');
                    if (itm.length > 0) {
                        if (itm.is('.size-xs')) {
                            cellH = 54 - reduce;
                        }
                        else if (itm.is('.size-s')) {
                            cellH = 62 - reduce;
                        }
                        else if (itm.is('.size-m')) {
                            cellH = 70 - reduce;
                        }
                        else if (itm.is('.size-l')) {
                            cellH = 86 - reduce;
                        }
                        if (itm.is('.no-label')) {
                            cellH -= 18;
                        }
                    }
                    this.processLoadDependencies();
                    let options = {
                        cellHeight: cellH,
                        verticalMargin: 0,
                        float: false,
                        disableDrag: true,
                        disableResize: true,
                        static_grid: true
                    };
                    var hideControls = me.find('.resizable-row').find('.hideControlGridStack [property]');
                    me.find('.resizable-row').gridstack(options);
                    if ($(me[0]).find('flx-code[editor="monaco"]').length > 0 && $(me[0]).find('flx-code[editor="monaco"]').is(":visible")) {
                        var ev = {
                            class: "property",
                            type: "resized",
                            masterIdentity: "flx-edit"
                        };
                        flexygo.events.trigger(ev, $(this));
                    }
                    //detach hideControls before gridstack in order to avoid field gaps
                    hideControls.each((index, elem) => { this.removeStack($(elem)); });
                    // me.find('.resizable-row').append(hideControls);
                    //only areyou sure if form uis edit form
                    if (!me.attr('Mode') || me.attr('Mode') == 'edit') {
                        me.find('form').areYouSure();
                        let btnClose = me.closest('.ui-dialog').find('.ui-dialog-titlebar-close');
                        if (btnClose.length > 0) {
                            //Manual implementation of areyousure on popup dialogs
                            let dlg = me.closest("main.pageContainer");
                            dlg.off("dialogbeforeclose").on("dialogbeforeclose", () => {
                                if (!dlg.hasClass("closing") && me.closest('flx-module').length > 0) {
                                    return me.closest('flx-module')[0].checkDirtyEdit();
                                }
                            });
                        }
                    }
                    this.setTabIndex();
                }
                /**
               * Establish webcomponent settings
               * @method configure
               */
                configure() {
                    let where;
                    if (this.mode == 'report' || this.mode == 'process' || this.templateId == 'generic') {
                        this.openConfig();
                    }
                    else {
                        if (this.templateId == '' || this.templateId == null) {
                            where = '';
                        }
                        else {
                            where = 'TemplateId=\'' + this.templateId + '\'';
                        }
                        flexygo.nav.openPage('edit', 'sysObjectTemplate', where, null, 'popup', true);
                    }
                }
                /**
                * Establish webcomponent settings when in process mode
                * @method configureProcess
                */
                configureProcess() {
                    let where;
                    if (this.mode == 'process') {
                        where = 'ProcessName=\'' + this.processName + '\'';
                        flexygo.nav.openPage('edit', 'sysProcess', where, null, 'popup', true);
                    }
                    else if (this.mode == 'report') {
                        where = 'ReportName=\'' + this.reportName + '\'';
                        flexygo.nav.openPage('edit', 'sysReport', where, null, 'popup', true);
                    }
                    else {
                        alert('Not implemented');
                    }
                }
                /**
                * Establish webcomponent settings when object process
                * @method configureObjectProcess
                */
                configureObjectProcess() {
                    let where;
                    if (this.mode == 'process') {
                        where = 'ProcessName=\'' + this.processName + '\' and ObjectName=\'' + $(this).attr('ObjectName') + '\'';
                        flexygo.nav.openPage('edit', 'sysObjectProcess', where, null, 'popup', true);
                    }
                    else {
                        alert('Not implemented');
                    }
                }
                /**
                * Opens configuration popup
                * @method openConfig
                */
                openConfig() {
                    let targetid = '';
                    if (flexygo.utils.isSizeMobile()) {
                        targetid = 'current';
                    }
                    else {
                        targetid = 'modal';
                    }
                    let histObj = {
                        targetid: targetid,
                        userid: flexygo.context.currentUserId
                    };
                    let pageContainer = flexygo.targets.createContainer(histObj, true, null);
                    if (!pageContainer) {
                        return;
                    }
                    pageContainer.closest('.ui-dialog').find('.flx-icon.icon-select').remove();
                    let control;
                    let descrip;
                    if (this.mode == 'report') {
                        control = '<flx-propertymanager ReportName="' + this.reportName + '" ></flx-propertymanager>';
                        descrip = this.reportName;
                    }
                    else if (this.mode == 'process') {
                        control = '<flx-propertymanager ProcessName="' + this.processName + '" ></flx-propertymanager>';
                        descrip = this.processName;
                    }
                    else {
                        control = '<flx-propertymanager ObjectName="' + this.objectname + '" ></flx-propertymanager>';
                        descrip = this.objectname;
                    }
                    let navString = '';
                    navString += '<div class="col-9 col-m-6 col-s-12">';
                    navString += '<flx-container type="emptyCnt">';
                    navString += '<span class="sectitle"><i class="f-icon icon-new-email"> </i>' + descrip + '</span>';
                    navString += '</flx-container>';
                    navString += '</div>';
                    navString += '<div class="col-12">';
                    navString += '<flx-container type="emptyCnt">';
                    navString += control;
                    navString += '</flx-container>';
                    navString += '</div>';
                    pageContainer.html(navString);
                    $(pageContainer).closest('.ui-dialog').find('.ui-dialog-titlebar-buttonpane button.ui-dialog-titlebar-close').on('click.configure', () => {
                        this.refresh();
                    });
                }
                /**
               *Processes dependency loading
               * @method processLoadDependencies
               */
                processLoadDependencies() {
                    // checkif edit still exists
                    if ($(document).find(this).length == 0) {
                        return;
                    }
                    let me = $(this);
                    let props = me.find('[property]');
                    if (props.length > 0) {
                        let Properties = new Array();
                        for (let i = 0; i < props.length; i++) {
                            let prop = $(props[i])[0];
                            Properties.push({ "Key": prop.property, "Value": prop.getValue() });
                            if (prop.property == null) {
                                return;
                            }
                        }
                        var isNew = false;
                        if (this.processName && this.processName != '') {
                            isNew = true;
                        }
                        else if (this.reportName && this.reportName != '') {
                            isNew = true;
                        }
                        else if (!me.attr('ObjectWhere')) {
                            isNew = true;
                        }
                        //Cambiamos porque en el clone se ejecutan las dependencias y cambia los valores del objeto origen
                        //} else if (me.attr('isClone') === 'true') {
                        //    isNew = true;
                        //}
                        let params = {
                            ObjectName: this.objectname,
                            ProcessName: this.processName,
                            ReportName: this.reportName,
                            IsNew: isNew,
                            IsView: false,
                            Properties: Properties
                        };
                        this.paintLoadingEdit();
                        flexygo.ajax.post('~/api/Edit', 'processAllDependencies', params, (response) => {
                            if (response) {
                                let orderStackExecution = false;
                                for (let i = 0; i < response.length; i++) {
                                    let itm = response[i];
                                    let prop = me.find('[property="' + itm.PropertyName + '"]');
                                    let lblprop = me.find('[lblproperty="' + itm.PropertyName + '"]');
                                    if (prop.length > 0) {
                                        this.refreshProperty(itm, prop, lblprop, true);
                                        if (itm.changeVisibility || itm.changeEnabled)
                                            orderStackExecution = true;
                                    }
                                }
                                if (flexygo.utils.isSizeSmartphone() && orderStackExecution) {
                                    this.orderStack();
                                }
                                if (orderStackExecution) {
                                    this.setTabIndex();
                                }
                            }
                            this.dependenciesLoaded = true;
                            this.removeLoadingEdit();
                            let selector = '';
                            if (!me.closest('div.ui-dialog').length) {
                                selector = 'div#mainContent';
                            }
                            else {
                                selector = 'div.ui-dialog';
                            }
                            me.closest(selector).find('flx-module flx-edit').first().find('[property] select:enabled:visible, [property] input:enabled:visible, [property] textarea:enabled:visible').first().focus();
                            me.find('form').removeClass('dirty');
                        });
                    }
                }
                /**
              *Sets layout x and y to starting position
              * @method restartPosition
              */
                restartPosition() {
                    let me = $(this);
                    for (let key in this.properties) {
                        let prop = me.find('[property="' + this.properties[key].Name + '"]');
                        prop.closest('[data-gs-y]').attr('data-gs-y', this.properties[key].PositionY);
                    }
                    let gd = me.find('.grid-stack').data('gridstack');
                    let nds = gd.grid.nodes;
                    for (let i = 0; i < nds.length; i++) {
                        nds[i].y = parseInt(nds[i].el.attr('data-gs-y'));
                    }
                    let wg = $('<div/>');
                    gd.addWidget(wg);
                    gd.removeWidget(wg);
                }
                /**
               *Sets Form property values
               * @method setFormValues
               */
                setFormValues() {
                    let me = $(this);
                    let controls = me.find('[property]');
                    //let objDef = null;
                    let obj;
                    if (this.isClone) {
                        obj = new flexygo.obj.Entity(this.objectname);
                        obj.read();
                    }
                    for (let i = 0; i < controls.length; i++) {
                        let propName = $(controls[i]).attr('property');
                        let ctl = $(controls[i])[0];
                        if (ctl && ctl.setValue) {
                            let value = this.data[propName].DefaultValue;
                            if (typeof this.data[propName].Value != 'undefined') {
                                value = this.data[propName].Value;
                            }
                            //if (objDef && typeof objDef[propName] != 'undefined') {
                            //    value = objDef[propName]
                            //}
                            if (obj && obj.data && obj.data[propName]) {
                                ctl.setValue((flexygo.utils.isBlank(value) ? obj.data[propName].Value : value), this.data[propName].Text);
                            }
                            else {
                                ctl.setValue((value), this.data[propName].Text);
                            }
                        }
                    }
                }
                /**
              *Gets value from property
              * @method getValue
              * @param {flexygo.api.BasicPropertyLoweredKey} row
              * @param {string} tag
              * @return {string}
              */
                getValue(row, tag) {
                    if (tag.toLowerCase() == 'control') {
                        let prop = this.properties[row.name];
                        return '<' + prop.WebComponent + ' property="' + row.name + '" />';
                    }
                    else {
                        let value = row[tag];
                        let type = typeof value;
                        type = type.toLowerCase();
                        switch (type) {
                            case 'undefined':
                                return '';
                            case 'boolean':
                                if (value) {
                                    return '<i class="flx-icon icon-checked-1"></i>';
                                }
                                else {
                                    return '<i class="flx-icon icon-non-check-2"></i>';
                                }
                            default:
                                return value;
                        }
                    }
                }
                /**
                *Paints properties with template string
                * @method paintProperties
                * @param {any} data
                * @param {string} template
                * @return {string}
                */
                paintProperties(data, template) {
                    let str = '';
                    let dataArray = $.map(data, (value, index) => {
                        return [value];
                    });
                    dataArray.sort((a, b) => {
                        if (a.PositionY < b.PositionY)
                            return -1;
                        if (a.PositionY > b.PositionY)
                            return 1;
                        if (a.PositionX < b.PositionX)
                            return -1;
                        if (a.PositionX > b.PositionX)
                            return 1;
                        return 0;
                    });
                    str += '<form onsubmit="return false"><div class="resizable-row grid-stack edit-form">';
                    for (let i = 0; i < dataArray.length; i++) {
                        let row = flexygo.utils.lowerKeys(dataArray[i]);
                        if (this.properties[row.name].FormDisplay) {
                            let item = $('<div class="grid-stack-item-content" />').html(template);
                            let container = $('<div class="grid-stack-item" />').append(item);
                            let props = item.find('[data-tag]');
                            /*if (previousRow && row.rownumber != previousRow.rownumber) {
                                 str += '</div><div class="row">'
                             }*/
                            /*manage labels */
                            for (let j = 0; j < props.length; j++) {
                                let prop = $(props[j]);
                                let tag = prop.data('tag').toLowerCase();
                                if (tag.toLowerCase() == 'label') {
                                    if (this.properties[row.name].ControlType != 'separator' && this.properties[row.name].ControlType != 'placeholder') {
                                        prop.prepend(this.getValue(row, tag));
                                        if (this.properties[row.name].IsRequired) {
                                            prop.addClass("required");
                                        }
                                        if (this.properties[row.name].LabelStyle != '') {
                                            prop.attr('style', this.properties[row.name].LabelStyle);
                                        }
                                        if (this.properties[row.name].LabelCssClass != '') {
                                            prop.addClass(this.properties[row.name].LabelCssClass);
                                        }
                                        if (this.properties[row.name].HelpId != '') {
                                            let helpIcon = $('<span class="help-icon"><i/><flx-tooltip mode="popover" container="body" helpId="' + this.properties[row.name].HelpId + '"></flx-tooltip></span>');
                                            prop.append(helpIcon);
                                        }
                                        prop.attr('lblproperty', row.name);
                                    }
                                    else {
                                        prop.empty();
                                    }
                                    if (this.properties[row.name].Hide) {
                                        prop.addClass("hideControl");
                                        container.addClass("hideControlGridStack").css("display", "none");
                                    }
                                }
                                else if (row[tag] || tag.toLowerCase() == 'control') {
                                    prop.prepend(this.getValue(row, tag));
                                }
                            }
                            container.attr('data-gs-x', row.positionx);
                            container.attr('data-gs-y', row.positiony);
                            container.attr('data-gs-width', row.width);
                            container.attr('data-gs-height', row.height);
                            //container.attr('data-gs-max-height', 3);
                            str += container[0].outerHTML;
                        }
                    }
                    str += '</div></form>';
                    return str;
                }
                /**
                * Parses edit string
                * @method parseEditString
                * @param {string} str
                * @return {string}
                */
                parseEditString(str, ctx, property) {
                    let me = $(ctx);
                    let props = me.find('[property]');
                    let obj = new Object();
                    for (let i = 0; i < props.length; i++) {
                        let prop = $(props[i])[0];
                        obj[prop.property] = prop.getValue();
                    }
                    return flexygo.utils.parser.compile(obj, str, this);
                }
                /**
               *Translates string
               * @method translate
               * @param {string} str
               * @return {string}
               */
                flxTranslate(str) {
                    return flexygo.localization.translate(str);
                }
                /**
              * Refreshes a property
              * @method refreshProperty
              * @param {flexygo.api.edit.DependencyAction} itm
              * @param {JQuery} prop
              * @param {JQuery} lblprop
              * @param {boolean} loadDependency
              * @return {string}
              */
                refreshProperty(itm, prop, lblprop, loadDependency) {
                    if (itm.changeCustomProperty) {
                        this.properties[itm.PropertyName] = itm.newCustomProperty;
                        let element = $(`<${itm.newCustomProperty.WebComponent}/>`);
                        let EType = element.attr("type");
                        let attrs = prop[0].attributes;
                        $.each(attrs, function () {
                            element.attr(this.name, this.value);
                        });
                        element.attr("type", EType);
                        let cntl = prop[0];
                        let IObjectName = cntl.options.ObjectName;
                        let IName = cntl.options.Name;
                        let IPositionX = cntl.options.PositionX;
                        let IPositionY = cntl.options.PositionY;
                        let IIconClass = cntl.options.IconClass;
                        cntl.options = itm.newCustomProperty;
                        cntl.options.ObjectName = IObjectName;
                        cntl.options.Name = IName;
                        cntl.options.PositionX = IPositionX;
                        cntl.options.PositionY = IPositionY;
                        cntl.options.DropDownValues = itm.newSqlItems;
                        cntl.options.IconClass = itm.newCustomProperty.IconClass;
                        if (prop[0].tagName.toLocaleLowerCase() == 'flx-code') {
                            let value = prop.val();
                            if (prop.attr("editor") == "monaco") {
                                let parentElement = prop[0].parentElement;
                                flexygo.events.off(prop[0], 'property', 'resized');
                                flexygo.events.off(prop[0], 'module', 'resized');
                                flexygo.events.off(prop[0], 'dialog', 'resized');
                                if (prop[0].monaco) {
                                    prop[0].monaco.dispose();
                                }
                                //create an observer to wait until the new element replace prop, for render the monaco de editor
                                const observer = new MutationObserver((mutationsList, observer) => {
                                    for (const mutation of mutationsList) {
                                        if (mutation.type === 'childList' && mutation.removedNodes.length > 0) {
                                            element[0].setCodeEditor();
                                            observer.disconnect();
                                            break;
                                        }
                                    }
                                });
                                observer.observe(parentElement, { childList: true });
                            }
                            prop.replaceWith(element);
                            element[0].setValue(value);
                        }
                        else {
                            prop.replaceWith(element);
                        }
                        prop = element;
                    }
                    if (itm.JSCode) {
                        let func = new Function("ObjectName", "ProcessName", "ReportName", "itm", "prop", itm.JSCode);
                        func.call(this, this.objectname, this.processName, this.reportName, itm, prop[0]);
                    }
                    if (itm.changeVisibility) {
                        if (itm.newVisibility) {
                            this.appendStack(prop);
                            prop.removeClass('hideControl');
                            lblprop.removeClass('hideControl');
                            if ($(prop[0]).is('flx-code[editor="monaco"]') && $(prop[0]).is(':visible')) {
                                prop[0].setCodeEditor();
                            }
                            let ctlClass = prop.attr('control-class');
                            if (typeof ctlClass != 'undefined') {
                                prop.attr('control-class', ctlClass.replace('hideControl', ''));
                                prop.find('.hideControl').removeClass('hideControl');
                                let cntl = prop[0];
                                cntl.options.CssClass = cntl.options.CssClass.replace("hideControl", "");
                            }
                            //added 10082021
                            prop.parent().find('.hideControl').removeClass('hideControl');
                        }
                        else {
                            prop.addClass('hideControl');
                            lblprop.addClass('hideControl');
                            this.removeStack(prop);
                        }
                    }
                    if (itm.changeSQL) {
                        let cntl = prop[0];
                        if (cntl.changeSQLData) {
                            if (!loadDependency) {
                                cntl.setValue(null);
                                if (itm.cascadeDependencies) {
                                    cntl.triggerDependencies();
                                }
                            }
                            cntl.changeSQLData(itm.newSQL, itm.newSqlItems);
                        }
                    }
                    if (itm.changeClass) {
                        prop.removeAttr('class').addClass(itm.newClass);
                    }
                    if (itm.changeEnabled) {
                        if (!itm.newEnabled) {
                            prop.attr('disabled', 1);
                        }
                        else {
                            prop.removeAttr('disabled');
                        }
                    }
                    if (itm.changeRequired) {
                        if (itm.newRequired) {
                            prop.attr('required', 1);
                            lblprop.addClass("required");
                        }
                        else {
                            prop.removeAttr('required');
                            lblprop.removeClass("required");
                        }
                    }
                    if (itm.changeValue) {
                        prop[0].setValue(itm.newValue);
                        let me = $(this);
                        let props = me.find('[property]');
                        let propertyName = prop.attr('property');
                        let wc = prop.closest('flx-edit');
                        if (wc.length > 0) {
                            if (props.length > 0) {
                                let Properties = [];
                                for (let i = 0; i < props.length; i++) {
                                    let prop = $(props[i])[0];
                                    Properties.push({
                                        Key: prop.property,
                                        Value: prop.getValue()
                                    });
                                }
                                // If control have class [data-msg-sqlvalidator] validation is executed
                                let elm = me.find('[property="' + propertyName + '"]');
                                if ((elm[0].tagName).toLowerCase() == 'flx-radio') {
                                    if (typeof elm.find('[name="' + propertyName + '"]:first').attr("data-msg-sqlvalidator") !== typeof undefined) {
                                        this.validateSQLProperty(propertyName, Properties);
                                    }
                                }
                                else {
                                    if (typeof elm.find('[name="' + propertyName + '"].form-control').attr("data-msg-sqlvalidator") !== typeof undefined) {
                                        this.validateSQLProperty(propertyName, Properties);
                                    }
                                }
                            }
                        }
                        if (itm.cascadeDependencies) {
                            prop[0].triggerDependencies();
                        }
                    }
                    if (itm.dependencyErrors.length > 0) {
                        let dependencyType = {
                            0: [flexygo.localization.translate('dependecymanager.valuedep'), 'flx-icon icon-tag'],
                            1: [flexygo.localization.translate('dependecymanager.classdep'), 'flx-icon icon-custom'],
                            2: [flexygo.localization.translate('dependecymanager.combodep'), 'flx-icon icon-listbox-2'],
                            3: [flexygo.localization.translate('dependecymanager.enabledep'), 'flx-icon icon-lock-1'],
                            4: [flexygo.localization.translate('dependecymanager.visibledep'), 'flx-icon icon-eye'],
                            5: [flexygo.localization.translate('dependecymanager.requireddep'), 'flx-icon icon-checked'],
                            6: [flexygo.localization.translate('dependecymanager.CustomProperty'), 'flx-icon icon-wizard-1']
                        };
                        let lblTriggerElement = $(this).find('[lblproperty="' + itm.TriggerPropertyName + '"]');
                        for (let i = 0; i < itm.dependencyErrors.length; i++) {
                            let depType = itm.dependencyErrors[i].Type;
                            let depLastExceptionMessage = itm.dependencyErrors[i].LastExceptionMessage;
                            let depSentence = itm.dependencyErrors[i].SqlSentence;
                            if (lblTriggerElement.find('.danger-icon').length == 0) {
                                let dangerIcon = $(`<span class="danger-icon blink develop-only"><i/><flx-tooltip mode="popover" container="body"></flx-tooltip></span>`);
                                lblTriggerElement.append(dangerIcon);
                            }
                            let flxtool = lblTriggerElement.find('.danger-icon flx-tooltip')[0];
                            let newContent = flxtool.innerContent;
                            let templateContent = $(`<div>${newContent}</div>`)[0];
                            if ($(templateContent).find(`#dep-${itm.PropertyName}-${itm.TriggerPropertyName}-${depType}`).length == 0) {
                                lblTriggerElement.removeAttr('data-content');
                                newContent += `<li id="dep-${itm.PropertyName}-${itm.TriggerPropertyName}-${depType}" class="nolist">
                                            <i title="${dependencyType[depType][0]}" class="${dependencyType[depType][1]} margin-right-s"/>
                                            <b>${itm.PropertyName} : </b>${depLastExceptionMessage}
                                            <button class="btn padding-xs margin-bottom-xs margin-top-xs margin-left-s size-xs clickable" onclick="flexygo.utils.showDependencyError(this, '35%',)">
                                                <i class="flx-icon icon-sql-letters icon-lg "/>
                                                <span class="flx-sentence hidden">${depSentence}</span>
                                            </button>
                                        </li>`;
                                flxtool.innerContent = newContent;
                                flxtool.refresh();
                            }
                        }
                    }
                }
                /**
             * Removes property from the gridstack control
             * @method removeStack
             * @param {JQuery} prop
             */
                removeStack(prop) {
                    let me = $(this);
                    prop = prop.closest('.grid-stack-item');
                    if (prop.length > 0) {
                        let secProp = prop.find('.item');
                        let dgW = prop.attr('data-w');
                        if (dgW == null || dgW == '') {
                            let hidGD = me.find('.grid-stack').find('.hidProps');
                            if (hidGD.length == 0) {
                                hidGD = $('<div class="hidProps" style="display:none"></div>');
                                me.find('.grid-stack').append(hidGD);
                            }
                            secProp.attr('data-x', prop.attr('data-gs-x'));
                            secProp.attr('data-y', prop.attr('data-gs-y'));
                            secProp.attr('data-w', prop.attr('data-gs-width'));
                            secProp.attr('data-h', prop.attr('data-gs-height'));
                            secProp.detach();
                            let codeEditor = secProp.find('[data-tag="control"]>flx-code[editor="monaco"]');
                            if (codeEditor.length > 0) {
                                flexygo.events.off(codeEditor[0], 'property', 'resized');
                                flexygo.events.off(codeEditor[0], 'module', 'resized');
                                flexygo.events.off(codeEditor[0], 'dialog', 'resized');
                                if (codeEditor[0].monaco) {
                                    codeEditor[0].monaco.dispose();
                                }
                            }
                            hidGD.append(secProp);
                            let gd = me.find('.grid-stack').data('gridstack');
                            gd.removeWidget(prop);
                        }
                    }
                }
                /**
                * Appends property from the gridstack control
                * @method appendStack
                * @param {JQuery} prop
                */
                appendStack(prop) {
                    let me = $(this);
                    prop = prop.closest('.item');
                    let dgW = prop.attr('data-w');
                    if (dgW && dgW != '') {
                        let gd = me.find('.grid-stack').data('gridstack');
                        prop.detach();
                        gd.addWidget($('<div/>').append(prop), prop.attr('data-x'), prop.attr('data-y'), prop.attr('data-w'), prop.attr('data-h'));
                        prop.attr('data-x', '');
                        prop.attr('data-y', '');
                        prop.attr('data-w', '');
                        prop.attr('data-h', '');
                    }
                }
                /**
                * Order the gridstack control
                * @method orderStack
                */
                orderStack() {
                    let me = $(this);
                    let props = me.find('.grid-stack-item');
                    let orderProps = [];
                    for (let i = 0; i < props.length; i++) {
                        let prop = $(props[i]);
                        orderProps.push({
                            Prop: prop,
                            PositionX: this.properties[prop.find('[property]').attr('property')].PositionX,
                            PositionY: this.properties[prop.find('[property]').attr('property')].PositionY
                        });
                    }
                    orderProps.sort((a, b) => {
                        if (a.PositionY < b.PositionY)
                            return -1;
                        if (a.PositionY > b.PositionY)
                            return 1;
                        if (a.PositionX < b.PositionX)
                            return -1;
                        if (a.PositionX > b.PositionX)
                            return 1;
                        return 0;
                    });
                    props.detach();
                    let prop_values = {};
                    props.find('[property]').each((_, el) => {
                        prop_values[el.property] = el.getValue();
                    });
                    for (let i = 0; i < orderProps.length; i++) {
                        me.find('.grid-stack').append(orderProps[i].Prop);
                        const prop = orderProps[i].Prop.find('[property]')[0];
                        prop.setValue(prop_values[prop.property]);
                    }
                }
                /**
               * Gets module full Id using pagename objectname modulename
               * @method getModuleFullId
               * @return {string}
               */
                getModuleFullId() {
                    let me = $(this);
                    let page = flexygo.history.get(me);
                    if (!page.objectname) {
                        page.objectname = '';
                    }
                    return page.pagename + '|' + page.objectname + '|' + this.moduleName;
                }
                /**
                * Validate property
                * @method validateSQLProperty
                * @param {string} propertyName
                * @param {Properties}  flexygo.api.edit.KeyValuePair[]
                */
                validateSQLProperty(propertyName, Properties) {
                    //Execute sql validation
                    let SQLValidatorparams = {
                        ObjectName: this.objectname,
                        ProcessName: this.processName,
                        ReportName: this.reportName,
                        PropertyName: propertyName,
                        Properties: Properties
                    };
                    flexygo.ajax.syncPost('~/api/Edit', 'ValidateProperty', SQLValidatorparams, (response) => {
                        //Change attribute value
                        //Select element depending type of control
                        let element = $(this).find('[property="' + propertyName + '"]');
                        let prop;
                        if ((element[0].tagName).toLowerCase() == 'flx-radio') {
                            prop = element.find('[name="' + SQLValidatorparams.PropertyName + '"]:first');
                        }
                        else {
                            prop = element.find('[name="' + SQLValidatorparams.PropertyName + '"]');
                        }
                        // If the respone is [TRUE] then the validation is correct else is incorrect
                        if (response) {
                            prop.attr("sqlvalidator", 1);
                        }
                        else {
                            prop.attr("sqlvalidator", 0);
                        }
                        if (element.attr('type') == 'time' || element.attr('type') == 'date' || element.attr('type') == 'datetime-local' || element[0].localName == 'flx-tag') {
                            if (!prop.valid()) {
                                $(prop).focus().select();
                            }
                        }
                        if (element.attr('type') == 'text' || element[0].localName == 'flx-tag' || element[0].localName == 'flx-barcode') {
                            if (!$(prop).valid()) {
                                $(prop).focus().select();
                            }
                        }
                    });
                }
                /**
                * Validate every property thas has an SQL validation configured
                * @method validateSQLProperties
                */
                validateSQLProperties() {
                    let me = $(this);
                    let props = me.find('[property]');
                    if (props.length > 0) {
                        let Properties = [];
                        let SQLPropertiesNames = [];
                        for (let i = 0; i < props.length; i++) {
                            let prop = $(props[i])[0];
                            Properties.push({
                                Key: prop.property,
                                Value: prop.getValue()
                            });
                            if (typeof $(prop).find('[name="' + prop.property + '"].form-control').attr("data-msg-sqlvalidator") !== typeof undefined) {
                                SQLPropertiesNames.push(prop.property);
                            }
                        }
                        for (let i = 0; i < SQLPropertiesNames.length; i++) {
                            this.validateSQLProperty(SQLPropertiesNames[i], Properties);
                        }
                    }
                }
                paintLoadingEdit() {
                    let containerItem = $(this).parent();
                    containerItem.addClass("flx-relative");
                    let editForm = containerItem.find('form');
                    editForm.addClass('flx-opacity');
                    if (containerItem.find('#flx-dependency-loader').length == 0) {
                        containerItem.append('<div id="flx-dependency-loader"></div>');
                    }
                }
                removeLoadingEdit() {
                    let containerItem = $(this).parent();
                    containerItem.removeClass("flx-relative");
                    let editForm = containerItem.find('form');
                    editForm.removeClass('flx-opacity');
                    containerItem.find('#flx-dependency-loader').remove();
                }
                paintLoadingProperty(e) {
                    let containerItem = $(e.sender).closest('.item');
                    containerItem.addClass('flx-relative flx-opacity');
                    if (containerItem.parent().find('#flx-dependency-loader').length == 0) {
                        containerItem.parent().append('<div id="flx-dependency-loader"></div>');
                    }
                    let dependingProp = e.sender.options.DependingProperties;
                    for (let i = 0; i < dependingProp.length; i++) {
                        let itemDepending = $(e.sender).closest('flx-edit').find(`[property="${dependingProp[i].DependantPropertyName}"]`).closest('.item');
                        if (itemDepending.parent().find('#flx-dependency-loader').length == 0) {
                            itemDepending.parent().append('<div id="flx-dependency-loader"></div>');
                            itemDepending.addClass('flx-relative flx-opacity');
                        }
                    }
                }
                removeLoadingProperty(e) {
                    if (e && e.sender && e.sender) {
                        let containerItem = $(e.sender).closest('.item');
                        containerItem.parent().find('#flx-dependency-loader').remove();
                        containerItem.removeClass('flx-relative flx-opacity');
                    }
                    if (e && e.sender && e.sender.options) {
                        let dependingProp = e.sender.options.DependingProperties;
                        for (let i = 0; i < dependingProp.length; i++) {
                            let itemDepending = $(e.sender).closest('flx-edit').find(`[property="${dependingProp[i].DependantPropertyName}"]`).closest('.item');
                            itemDepending.parent().find('#flx-dependency-loader').remove();
                            itemDepending.removeClass('flx-relative flx-opacity');
                        }
                    }
                }
                /**
              * Captures property change event
              * @method onPropertyChanged
              * @param {flexygo.events.FlexygoEvent} e
              */
                onPropertyChanged(e) {
                    if (this.dependenciesLoaded) {
                        let me = $(this);
                        let props = me.find('[property]');
                        let propertyName = e.masterIdentity;
                        let wc;
                        wc = $(e.sender);
                        if (me.find(wc).length > 0) {
                            if (props.length > 0) {
                                this.paintLoadingProperty(e);
                                let Properties = [];
                                for (let i = 0; i < props.length; i++) {
                                    let prop = $(props[i])[0];
                                    Properties.push({
                                        Key: prop.property,
                                        Value: prop.getValue()
                                    });
                                }
                                // If control have class [data-msg-sqlvalidator] validation is executed
                                let elm = me.find('[property="' + propertyName + '"]');
                                if ((elm[0].tagName).toLowerCase() == 'flx-radio') {
                                    if (typeof elm.find('[name="' + propertyName + '"]:first').attr("data-msg-sqlvalidator") !== typeof undefined) {
                                        this.validateSQLProperty(propertyName, Properties);
                                    }
                                }
                                else {
                                    if (typeof elm.find('[name="' + propertyName + '"].form-control').attr("data-msg-sqlvalidator") !== typeof undefined) {
                                        this.validateSQLProperty(propertyName, Properties);
                                    }
                                }
                                if (!this.properties[propertyName].ThrowDependenciesOnInvalid) {
                                    let prop;
                                    if ((elm[0].tagName).toLowerCase() == 'flx-radio') {
                                        prop = elm.find('[name="' + propertyName + '"]:first');
                                    }
                                    else {
                                        prop = elm.find('[name="' + propertyName + '"]');
                                    }
                                    if ((elm[0].tagName).toLowerCase() == 'flx-dbcombo') {
                                        if (elm.find('[name="' + propertyName + '"]').attr("sqlvalidator") == "0") {
                                            this.removeLoadingProperty(e);
                                            return;
                                        }
                                    }
                                    else {
                                        if (prop.length > 0) {
                                            if (!prop.valid()) {
                                                this.removeLoadingProperty(e);
                                                return;
                                            }
                                        }
                                    }
                                }
                                let params = {
                                    ObjectName: this.objectname,
                                    ProcessName: this.processName,
                                    ReportName: this.reportName,
                                    PropertyName: propertyName,
                                    Properties: Properties
                                };
                                this.loadingDependencies += 1;
                                flexygo.ajax.post('~/api/Edit', 'ProcessDependencies', params, (response) => {
                                    try {
                                        if (response) {
                                            let orderStackExecution = false;
                                            for (let i = 0; i < response.length; i++) {
                                                let itm = response[i];
                                                let prop = me.find('[property="' + itm.PropertyName + '"]');
                                                let lblprop = me.find('[lblproperty="' + itm.PropertyName + '"]');
                                                if (prop.length > 0) {
                                                    this.refreshProperty(itm, prop, lblprop, false);
                                                    if (itm.changeVisibility || itm.changeEnabled)
                                                        orderStackExecution = true;
                                                }
                                            }
                                            if (flexygo.utils.isSizeSmartphone() && orderStackExecution) {
                                                this.orderStack();
                                                me.find('form').validate();
                                                this.validateSQLProperties();
                                            }
                                            this.restartPosition();
                                            if (orderStackExecution) {
                                                this.setTabIndex();
                                            }
                                            this.loadingDependencies -= 1;
                                            if (this.pendingSaveButton && this.loadingDependencies <= 0) {
                                                this.pendingSaveButton.click();
                                                this.removeLock();
                                                this.pendingSaveButton = null;
                                            }
                                        }
                                        this.removeLoadingProperty(e);
                                    }
                                    catch (e) {
                                        flexygo.exceptions.httpShow(e);
                                        this.loadingDependencies -= 1;
                                        this.removeLoadingProperty(e);
                                        if (this.pendingSaveButton && this.loadingDependencies <= 0) {
                                            this.removeLock();
                                            this.pendingSaveButton = null;
                                        }
                                    }
                                    ;
                                }), (error) => {
                                    flexygo.exceptions.httpShow(error);
                                    this.loadingDependencies -= 1;
                                    this.removeLoadingProperty(e);
                                    if (this.pendingSaveButton && this.loadingDependencies <= 0) {
                                        this.removeLock();
                                        this.pendingSaveButton = null;
                                    }
                                };
                            }
                        }
                    }
                }
                /**
                * Set tab index to elements
                * @method setTabIndex
                */
                setTabIndex() {
                    let me = $(this);
                    let props = me.find('.grid-stack-item');
                    let orderControls = [];
                    for (let i = 0; i < props.length; i++) {
                        let prop = $(props[i]);
                        let elem = prop.find('[data-tag="control"]').children().not('flx-separator,.hideControl,[disabled="disabled"]');
                        if (elem.length > 0) {
                            orderControls.push({
                                Elem: elem,
                                PositionX: parseInt(prop.attr('data-gs-x')),
                                PositionY: parseInt(prop.attr('data-gs-y'))
                            });
                        }
                    }
                    orderControls.sort((a, b) => {
                        if (a.PositionY < b.PositionY)
                            return -1;
                        if (a.PositionY > b.PositionY)
                            return 1;
                        if (a.PositionX < b.PositionX)
                            return -1;
                        if (a.PositionX > b.PositionX)
                            return 1;
                        return 0;
                    });
                    me.attr('ControlsNumber', this.maxTabIndex);
                    if (orderControls.length > 0) {
                        let z = 1 + this.lastEditControlsCount();
                        for (let i = 0; i < orderControls.length; i++) {
                            switch (orderControls[i].Elem[0].tagName.toLowerCase()) {
                                case 'flx-textarea':
                                    orderControls[i].Elem.find('textarea').attr('tabindex', z);
                                    break;
                                case 'flx-dbcombo' || 'flx-multicombo':
                                    orderControls[i].Elem.find('input').first().attr('tabindex', z);
                                    break;
                                case 'flx-combo':
                                    orderControls[i].Elem.find('select').attr('tabindex', z);
                                    break;
                                default:
                                    orderControls[i].Elem.find('input').attr('tabindex', z);
                            }
                            z++;
                        }
                    }
                }
            }
            /**
            * Array of observed attributes.
            * @property observedAttributes {Array}
            */
            FlxEditElement.observedAttributes = ['modulename'];
            wc_1.FlxEditElement = FlxEditElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-edit', flexygo.ui.wc.FlxEditElement);
//# sourceMappingURL=flx-edit.js.map