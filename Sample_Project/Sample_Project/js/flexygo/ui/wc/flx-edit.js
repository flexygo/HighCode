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
                    this.dependenciesLoaded = false;
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
                }
                /**
                * Array of observed attributes.
                * @property observedAttributes {Array}
                */
                static get observedAttributes() {
                    return ['modulename'];
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
                    flexygo.events.on(this, "property", "changed", this.onPropertyChanged);
                    //Remove handler on DOM element remove
                    $(this).on("destroy", () => {
                        flexygo.events.off(this, "property", "changed", this.onPropertyChanged);
                    });
                    let me = $(this);
                    me.removeAttr('manualInit');
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
                }
                /**
                * Refresh de webcomponent.
                * @method refresh
                */
                refresh() {
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
                        if (typeof histObj != 'undefined' && histObj.defaults && histObj.defaults != '') {
                            objDef = JSON.parse(flexygo.utils.parser.replaceAll(histObj.defaults, "'", '"'));
                        }
                        if (objDef == null) {
                            let wcMod = me.closest('flx-module')[0];
                            if (wcMod) {
                                objDef = wcMod.objectdefaults;
                            }
                        }
                    }
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
                                    parentModule.find('.cntBodyFooter .moduleButtons .saveButton').attr('tabIndex', this.getMaxTabindex(response.Properties));
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
                        let parentModule = me.closest('flx-module');
                        let wcModule = parentModule[0];
                        if (parentModule && wcModule) {
                            wcModule.moduleLoaded(this);
                        }
                    });
                }
                /**
                * Gets maximum tab index.
                * @method getMaxTabindex
                * @param {flexygo.api.ObjectPropertyCollection} props
                * @return {string}
                */
                getMaxTabindex(props) {
                    let posX = 0;
                    let posY = 0;
                    for (let key in props) {
                        if (props[key].PositionX > posX) {
                            posX = props[key].PositionX;
                        }
                        if (props[key].PositionY > posY) {
                            posY = props[key].PositionY;
                        }
                    }
                    return posY.toString() + posX.toString();
                }
                /**
              * Init the webcomponent in edit process parameter mode.
              * @method initProcessMode
              */
                initProcessMode() {
                    let me = $(this);
                    me.html('');
                    let objDef = null;
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
                                    wcModule.setButtons(response.Buttons, response.ObjectName, response.ObjectWhere, null, response.ProcessName);
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
                        }
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
                        ignore: '',
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
                                return this.checkDirtyEdit();
                            });
                        }
                    }
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
                                    flexygo.events.trigger(ev);
                                    dlg.dialog('destroy').remove();
                                }
                            }
                        });
                        return false; //cancel default close
                    }
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
                        targetid: targetid
                    };
                    let pageContainer = flexygo.targets.createContainer(histObj, true, null);
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
                        flexygo.ajax.post('~/api/Edit', 'processAllDependencies', params, (response) => {
                            if (response) {
                                for (let i = 0; i < response.length; i++) {
                                    let itm = response[i];
                                    let prop = me.find('[property="' + itm.PropertyName + '"]');
                                    let lblprop = me.find('[lblproperty="' + itm.PropertyName + '"]');
                                    if (prop.length > 0) {
                                        this.refreshProperty(itm, prop, lblprop, true);
                                    }
                                }
                            }
                            this.dependenciesLoaded = true;
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
                        let prop = me.find('[property=' + this.properties[key].Name + ']');
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
                            ctl.setValue(value, this.data[propName].Text);
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
                    str += '<form><div class="resizable-row grid-stack edit-form">';
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
                                            let helpIcon = $('<span class="help-icon"><i/></span><flx-tooltip mode="popover" container="body" helpId="' + this.properties[row.name].HelpId + '"></flx-tooltip>');
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
                                    if (this.properties[row.name].ControlType.indexOf('code') != -1 || this.properties[row.name].ControlType == 'multiline') {
                                        let lblHeight = 25;
                                        prop.css('height', 'calc(100% - ' + lblHeight + 'px)');
                                    }
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
                translate(str) {
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
                        cntl.options = itm.newCustomProperty;
                        cntl.options.ObjectName = IObjectName;
                        cntl.options.Name = IName;
                        cntl.options.PositionX = IPositionX;
                        cntl.options.PositionY = IPositionY;
                        cntl.options.DropDownValues = itm.newSqlItems;
                        prop.replaceWith(element);
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
                            let ctlClass = prop.attr('control-class');
                            if (typeof ctlClass != 'undefined') {
                                prop.attr('control-class', ctlClass.replace('hideControl', ''));
                                prop.find('.hideControl').removeClass('hideControl');
                            }
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
                        }
                        else {
                            prop.removeAttr('required');
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
                                let elm = me.find("[property=" + propertyName + "]");
                                if ((elm[0].tagName).toLowerCase() == 'flx-radio') {
                                    if (typeof elm.find("[name=" + propertyName + "]:first").attr("data-msg-sqlvalidator") !== typeof undefined) {
                                        this.validateSQLProperty(propertyName, Properties);
                                    }
                                }
                                else {
                                    if (typeof elm.find("[name=" + propertyName + "].form-control").attr("data-msg-sqlvalidator") !== typeof undefined) {
                                        this.validateSQLProperty(propertyName, Properties);
                                    }
                                }
                            }
                        }
                        if (itm.cascadeDependencies) {
                            prop[0].triggerDependencies();
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
                        let element = $(this).find("[property=" + propertyName + "]");
                        let prop;
                        if ((element[0].tagName).toLowerCase() == 'flx-radio') {
                            prop = element.find("[name=" + SQLValidatorparams.PropertyName + "]:first");
                        }
                        else {
                            prop = element.find("[name=" + SQLValidatorparams.PropertyName + "]");
                        }
                        // If the respone is [TRUE] then the validation is correct else is incorrect
                        if (response) {
                            prop.attr("sqlvalidator", 1);
                        }
                        else {
                            prop.attr("sqlvalidator", 0);
                        }
                        if (element.attr('type') == 'time' || element.attr('type') == 'date' || element.attr('type') == 'datetime-local') {
                            prop.valid();
                        }
                    });
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
                                let Properties = [];
                                for (let i = 0; i < props.length; i++) {
                                    let prop = $(props[i])[0];
                                    Properties.push({
                                        Key: prop.property,
                                        Value: prop.getValue()
                                    });
                                }
                                // If control have class [data-msg-sqlvalidator] validation is executed
                                let elm = me.find("[property=" + propertyName + "]");
                                if ((elm[0].tagName).toLowerCase() == 'flx-radio') {
                                    if (typeof elm.find("[name=" + propertyName + "]:first").attr("data-msg-sqlvalidator") !== typeof undefined) {
                                        this.validateSQLProperty(propertyName, Properties);
                                    }
                                }
                                else {
                                    if (typeof elm.find("[name=" + propertyName + "].form-control").attr("data-msg-sqlvalidator") !== typeof undefined) {
                                        this.validateSQLProperty(propertyName, Properties);
                                    }
                                }
                                let params = {
                                    ObjectName: this.objectname,
                                    ProcessName: this.processName,
                                    ReportName: this.reportName,
                                    PropertyName: propertyName,
                                    Properties: Properties
                                };
                                flexygo.ajax.post('~/api/Edit', 'ProcessDependencies', params, (response) => {
                                    if (response) {
                                        for (let i = 0; i < response.length; i++) {
                                            let itm = response[i];
                                            let prop = me.find('[property="' + itm.PropertyName + '"]');
                                            let lblprop = me.find('[lblproperty="' + itm.PropertyName + '"]');
                                            if (prop.length > 0) {
                                                this.refreshProperty(itm, prop, lblprop, false);
                                            }
                                        }
                                        this.restartPosition();
                                    }
                                });
                            }
                        }
                    }
                }
            }
            wc_1.FlxEditElement = FlxEditElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-edit', flexygo.ui.wc.FlxEditElement);
//# sourceMappingURL=flx-edit.js.map