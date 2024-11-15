/**
 * @namespace flexygo.ui.wc
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
    var ui;
    (function (ui) {
        var wc;
        (function (wc) {
            /**
            * Library for the FlxPropertyManagerElement web component.
            *
            * @class FlxPropertyManagerElement
            * @constructor
            * @return {FlxPropertyManagerElement}
            */
            class FlxPropertyManagerElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                    * Set when component is attached to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                    this.objectname = null;
                    this.reportName = null;
                    this.processName = null;
                    this.mode = null;
                    this.propertyWizard = null;
                    this.data = null;
                    this.tHeader = null;
                    this.tBody = null;
                    this.tFooter = null;
                }
                connectedCallback() {
                    let element = $(this);
                    this.connected = true;
                    this.objectname = element.attr("objectname");
                    this.reportName = element.attr("reportName");
                    this.processName = element.attr("processName");
                    this.propertyWizard = this.closest('flx-objectmanager, main').querySelector('flx-propertywizard');
                    let mode = 'edit';
                    if (element.attr("mode") && element.attr("mode") != '') {
                        mode = element.attr("mode");
                    }
                    else if (this.reportName) {
                        mode = 'report';
                    }
                    else if (this.processName) {
                        mode = 'process';
                    }
                    this.mode = mode;
                    element.attr("mode", mode);
                    //Remove entity events
                    flexygo.events.off(this, "entity", "all", this.onPropertyChanged);
                    //Capture entity events
                    flexygo.events.on(this, "entity", "all", this.onPropertyChanged, true);
                    //Remove handler on DOM element remove
                    $(this).on("destroy", () => {
                        flexygo.events.off(this, "entity", "all", this.onPropertyChanged);
                    });
                    this.refresh();
                }
                observedAttributes() {
                    return ['objectname', 'reportname', 'processname'];
                }
                attributeChangedCallback(attrName, oldVal, newVal) {
                    if (!this.connected) {
                        return;
                    }
                    if (attrName.toLowerCase() == 'objectname' && newVal && newVal != '') {
                        this.objectname = newVal;
                        this.refresh();
                    }
                    else if (attrName.toLowerCase() == 'reportname' && newVal && newVal != '') {
                        this.reportName = newVal;
                        this.refresh();
                    }
                    else if (attrName.toLowerCase() == 'processname' && newVal && newVal != '') {
                        this.processName = newVal;
                        this.refresh();
                    }
                }
                refresh() {
                    switch (this.mode) {
                        case 'process':
                            return this.initProcessMode();
                        case 'report':
                            return this.initReportMode();
                        default:
                            return this.initEditMode();
                    }
                }
                onPropertyChanged(e) {
                    if (this.mode == 'process' || this.mode == 'report') {
                        if (e.type === "inserted" || e.type === "updated") {
                            this.refresh();
                        }
                    }
                }
                initEditMode() {
                    return new Promise((resolve, _) => __awaiter(this, void 0, void 0, function* () {
                        let me = $(this);
                        me.html('');
                        let params = {
                            ObjectName: me.attr('ObjectName')
                        };
                        flexygo.ajax.post('~/api/Edit', 'GetEditConfig', params, 
                        //Success Function
                        (response) => {
                            if (response) {
                                this.setProperties(response, "sysObjectProperty", "ObjectName='" + this.objectname + "' and PropertyName='{{name}}'");
                            }
                            resolve();
                        }, 
                        //Error Function
                        err => {
                            flexygo.utils.modules.loadingErrorFunction(this.closest('flx-module'), err);
                            resolve();
                        });
                    }));
                }
                initProcessMode() {
                    return new Promise((resolve, _) => __awaiter(this, void 0, void 0, function* () {
                        let me = $(this);
                        me.html('');
                        let params = {
                            ProcessName: me.attr('ProcessName')
                        };
                        flexygo.ajax.post('~/api/Edit', 'GetProcessParamsConfig', params, 
                        //Success Function
                        (response) => {
                            if (response) {
                                this.setProperties(response, "sysProcessParam", "ProcessName='" + me.attr('ProcessName') + "' and ParamName='{{name}}'");
                            }
                            resolve();
                        }, 
                        //Error Function
                        err => {
                            flexygo.utils.modules.loadingErrorFunction(this.closest('flx-module'), err);
                            resolve();
                        });
                    }));
                }
                initReportMode() {
                    return new Promise((resolve, _) => __awaiter(this, void 0, void 0, function* () {
                        let me = $(this);
                        me.html('');
                        let params = {
                            ReportName: me.attr('ReportName')
                        };
                        flexygo.ajax.post('~/api/Edit', 'GetReportParamsConfig', params, 
                        //Success Function
                        (response) => {
                            if (response) {
                                this.setProperties(response, "sysReportParam", "ReportName='" + me.attr('ReportName') + "' and ParamName='{{name}}'");
                            }
                            resolve();
                        }, 
                        //Error Function
                        err => {
                            flexygo.utils.modules.loadingErrorFunction(this.closest('flx-module'), err);
                            resolve();
                        });
                    }));
                }
                setProperties(response, objectname, objectwhere) {
                    let template = response.Template;
                    this.data = response.Properties;
                    this.tHeader = template.Header;
                    this.tBody = template.Body;
                    this.tFooter = template.Footer;
                    this.properties = response.Properties;
                    this.propArr = flexygo.utils.sortObject(this.properties, 'PositionY', 'PositionX');
                    this.render();
                    const label_inputs = $(this).find('.lblEdit');
                    label_inputs.on('click', e => e.stopPropagation());
                    label_inputs.on('change', e => {
                        let input = e.currentTarget;
                        const new_value = input.value;
                        if (new_value) {
                            const current_property = input.closest('[lblproperty]').getAttribute('lblproperty');
                            this.updateQuickSettingString(current_property, new_value, 'Label');
                        }
                    });
                }
                updateQuickSettingString(current_property, new_value, setting_name) {
                    const params = [
                        { 'key': 'ObjectName', 'value': this.objectname },
                        { 'key': 'ProcessName', 'value': this.processName },
                        { 'key': 'ReportName', 'value': this.reportName },
                        { 'key': 'PropertyName', 'value': current_property },
                        { 'key': 'SettingName', 'value': setting_name },
                        { 'key': 'StringValue', 'value': new_value },
                        { 'key': 'BitValue', 'value': null },
                        { 'key': 'IsBoolean', 'value': false }
                    ];
                    flexygo.nav.execProcess('updateQuickSettingDLL', '', '', null, params, 'current', false, $(this), () => {
                        if (!new_value)
                            return;
                        this.properties[current_property][setting_name] = new_value;
                        //If the wizard is opened with the same property that is getting updated we should update the label there too
                        const current_wizard_property = this.propertyWizard.getAttribute('propertyname');
                        if (current_wizard_property === current_property) {
                            this.propertyWizard.querySelector('[property="Label"] input').value = new_value; //We update the input inside the flx-text to avoid triggering the onchange event
                        }
                    }, false);
                }
                render() {
                    let me = $(this);
                    let rendered = '';
                    if (this.mode == 'list') {
                        rendered = '<div class="propHeader bg-module"><div style="float:left">' + flexygo.localization.translate('flxpropertymanager.addfields') + '</div></div><div class="cntBody nopadding flx-list">';
                        rendered += flexygo.utils.parser.compile(this.properties, this.tHeader, this);
                        rendered += flexygo.utils.parser.compile(this.properties, this.tBody, this);
                        rendered += flexygo.utils.parser.compile(this.properties, this.tFooter, this);
                        rendered += '</div>';
                        me.empty();
                        me.html(rendered);
                        me.find('table').colResizable({
                            resizeMode: 'overflow',
                            liveDrag: 1,
                            disabledColumns: [0],
                            onResize: (ev) => {
                                this._resizeGridProps();
                            }
                        });
                        let btnOrder = $(' <div class="btn-group sortProps"><button type="button" class="btnResize btn btn-primary"><i class="fa fa-arrows-h" /></button><button type="button" class="btnSort btn btn-default"><i class="fa fa-arrows" /></button></div> ');
                        me.find('.propHeader').append(btnOrder);
                        btnOrder.find('button').on('click', (e) => {
                            this.toogleSortMode(btnOrder);
                        });
                        let btnCloneDependencies = $('<button type="button" class="cloneDependencies btn btn-default txt-tools margin-right-s"><i class="fa fa-clone margin-right-s"></i>' + flexygo.localization.translate('nodemanager.cloneDependencies') + '</button>');
                        me.find('.propHeader').append(btnCloneDependencies);
                        btnCloneDependencies.on('click', () => {
                            const colName = this.objectname;
                            var obj = new flexygo.obj.Entity(colName);
                            obj.read();
                            const objName = obj.getConfig().ObjectName;
                            flexygo.nav.execProcess('pNet_CloneDependencies_ObjectToCollection', colName, '', `{'ObjName': '${objName}', 'ColName': '${colName}'}`, null, 'modal640x480', true, me);
                        });
                    }
                    else {
                        rendered = flexygo.utils.parser.compile(this.properties, this.tBody, this);
                        me.empty();
                        me.html(rendered);
                        me.keydown(function (event) {
                            if (event.key === 'Alt') {
                                me.find('.lblName').removeClass('hidden');
                            }
                        });
                        me.keyup(function (event) {
                            if (event.key === 'Alt') {
                                me.find('.lblName').addClass('hidden');
                            }
                        });
                        me.append('<div style="clear:both"></div>');
                        let cellH = 70;
                        let itm = me.closest('.size-xs,.size-s,.size-m,.size-l');
                        if (itm.length > 0) {
                            if (itm.is('.size-xs')) {
                                cellH = 54;
                            }
                            else if (itm.is('.size-s')) {
                                cellH = 62;
                            }
                            else if (itm.is('.size-l')) {
                                cellH = 86;
                            }
                        }
                        let options = {
                            cellHeight: cellH,
                            verticalMargin: 0,
                            float: false,
                            disableDrag: true,
                            disableResize: true
                        };
                        me.find('.resizable-row').gridstack(options);
                    }
                    this.refreshConfigMode();
                    this.addConfigToolbar();
                }
                toogleSortMode(btns) {
                    let me = $(this);
                    let tbl = me.find('table');
                    let btnResize = btns.find('.btnResize');
                    let btnSort = btns.find('.btnSort');
                    tbl.find('th:not(:first)').addClass('accept');
                    tbl.css('min-width', '');
                    if (btnResize.is('.btn-primary')) {
                        tbl.colResizable({ disable: true });
                        tbl.dragtable({
                            dragaccept: '.accept', persistState: () => {
                                this._resizeGridProps();
                            }
                        });
                        btnResize.removeClass('btn-primary');
                        btnResize.addClass('btn-default');
                        btnSort.removeClass('btn-default');
                        btnSort.addClass('btn-primary');
                    }
                    else {
                        me.find('table').colResizable({
                            resizeMode: 'overflow',
                            liveDrag: 1,
                            disabledColumns: [0],
                            onResize: (ev) => {
                                this._resizeGridProps();
                            }
                        });
                        tbl.dragtable('destroy');
                        btnSort.removeClass('btn-primary');
                        btnSort.addClass('btn-default');
                        btnResize.removeClass('btn-default');
                        btnResize.addClass('btn-primary');
                    }
                }
                _resizeGridProps() {
                    let me = $(this);
                    let items = me.find('thead > tr > th[data-sort]');
                    let myProps = new Array();
                    for (let i = 0; i < items.length; i++) {
                        let myProp = new flexygo.api.PropertyResize();
                        myProp.PositionX = i;
                        myProp.PositionY = 0;
                        myProp.Width = $(items[i]).width();
                        myProp.Height = 0;
                        myProp.PropertyName = $(items[i]).attr('data-sort');
                        myProp.Name = this.objectname;
                        myProps.push(myProp);
                    }
                    flexygo.ajax.syncPost('~/api/Edit', 'ResizeProperties', { "Mode": 'edit', "Properties": myProps }, () => { });
                }
                addConfigToolbar() {
                    let me = $(this);
                    var ObjectName = me.attr('ObjectName');
                    let btnInfo = $(`<i class="flx-icon icon-information-3 icon-2x left clickable flx-property-legend"></i>`);
                    let btnProp = $('<button class="addProps btn btn-default txt-tools"><i class="flx-icon icon-add"></i> ' + flexygo.localization.translate('nodemanager.addfields') + '</button>');
                    let btnRelatedDep = $('<button class="relatedDep btn btn-outstanding margin-right-s"><i class="flx-icon icon-properties-relations"></i> ' + flexygo.localization.translate('nodemanager.relationshipOfDependencies') + '</button>');
                    let popoverInfo = btnInfo.popover({
                        html: true,
                        placement: 'right',
                        content: flexygo.utils.loadingMsg(),
                        title: null
                    }).on('show.bs.popover', (r) => {
                        let template = `<div class="row flx-property-manager-container">
                    <div class="right">
                        <span class="size-xs clickable" title="close" onclick="$(this).closest(\'flx-propertymanager\').find(\'.flx-property-legend\').click();">
                        <i class="flx-icon icon-remove"></i></span>
                    </div><br>
                    <ul class="list-unstyled">
                        <li class="row-line"><div><span class="txt-danger icon-margin-right">*</span></div> ${flexygo.localization.translate('flxedit.required')}</li>
                        <li class="row-line"><div><i class="flx-icon icon-blocked-2 icon-margin-right"></i></div> ${flexygo.localization.translate('flxedit.locked')}</li>
                        <li class="row-line"><div><i class="fa fa-unlink margin-left-s icon-margin-right"></i></div> ${flexygo.localization.translate('flxedit.detachedproperty')}</li>
                        <li class="row-line"><div><span class="strike icon-margin-right">${flexygo.localization.translate('flxedit.propertyname')}</span></div> ${flexygo.localization.translate('flxedit.notdisplayform')}</li>
                        <li class="row-line"><div><i class="flx-icon icon-pin margin-left-s icon-margin-right"></i></div> ${flexygo.localization.translate('flxedit.persistdefaultvalue')}</li>
                        <li class="row-line"><div><i class="flx-icon icon-process margin-left-s icon-margin-right"></i></div> ${flexygo.localization.translate('flxedit.withchangeprocess')}</li>
                        <li class="row-line"><div><i class="flx-icon icon-object-relations-1 icon-margin-right"></i></div> ${flexygo.localization.translate('flxedit.hasdependingproperties')}</li>
                        <li class="row-line"><div><i class="flx-icon icon-right-arrow icon-margin-right"></i></div> ${flexygo.localization.translate('flxedit.hasdependencies')}</li>
                    </ul>
                    <b>${flexygo.localization.translate('flxedit.tips')}:</b>
                    <p>-${flexygo.localization.translate('flxedit.ctrclick')}</p>
                </div>`;
                        popoverInfo.attr('data-content', template);
                    });
                    btnRelatedDep.on('click', (e) => {
                        switch (this.mode) {
                            case 'process':
                                flexygo.nav.openPageName('sys_form_param_related_dependencies', this.objectname, '', JSON.stringify({ 'processname': this.processName }), 'sliderightx80%', true, $(e.currentTarget));
                                break;
                            case 'report':
                                flexygo.nav.openPageName('sys_form_report_related_dependencies', this.objectname, '', JSON.stringify({ 'reportname': this.reportName }), 'sliderightx80%', true, $(e.currentTarget));
                                break;
                            default:
                                flexygo.nav.openPageName('sys_form_property_related_dependencies', this.objectname, '', JSON.stringify({ 'objectname': this.objectname }), 'sliderightx80%', true, $(e.currentTarget));
                        }
                    });
                    if (this.mode == 'process') {
                        btnProp.on('click', (e) => {
                            flexygo.nav.openPage('edit', 'sysProcessParam', null, JSON.stringify({ ProcessName: this.processName }), 'popup', true, $(e.currentTarget));
                        });
                    }
                    else if (this.mode == 'report') {
                        btnProp.on('click', (e) => {
                            flexygo.nav.openPage('edit', 'sysReportParam', null, JSON.stringify({ ReportName: this.reportName }), 'popup', true, $(e.currentTarget));
                        });
                    }
                    else {
                        let popover = btnProp.popover({
                            html: true,
                            placement: 'bottom',
                            content: flexygo.utils.loadingMsg(),
                            title: null,
                        }).on('show.bs.popover', () => {
                            let params = {
                                ObjectName: me.attr('ObjectName')
                            };
                            flexygo.ajax.syncPost('~/api/Edit', 'GetNewProperties', params, (ret) => {
                                let contenAppend = '<div style="float:right"><span class="size-xs clickable" title="close" onclick="$(this).closest(\'flx-propertymanager\').find(\'.addProps\').click();"><i class="flx-icon icon-remove"></i></span></div>';
                                if (ret.length > 0) {
                                    let botonera = '<legend>' + flexygo.localization.translate('flxedit.addproperties') + '</legend><div class="pop-buttons" >';
                                    botonera += '<div class="btn-group">';
                                    botonera += '<button class="btn btn-default" title="' + flexygo.localization.translate('flxedit.selectall') + '" onclick="$(this).closest(\'.popover-content\').find(\'.chk\').prop(\'checked\',true);"><i class="flx-icon icon-check-2" ></i></button>';
                                    botonera += '<button class="btn btn-default" title="' + flexygo.localization.translate('flxedit.selectnone') + '" onclick="$(this).closest(\'.popover-content\').find(\'.chk\').prop(\'checked\',false);"><i class="flx-icon icon-non-check-2" ></i></button>';
                                    botonera += '</div>';
                                    botonera += '<div class="btn-group" style="float:right" >';
                                    botonera += '<button class="btn btn-default" title="' + flexygo.localization.translate('flxsearch.search') + '" onclick="let a=$(this).closest(\'.popover-content\').find(\'.props-filter-container\'); if (a.is(\':visible\')){$(a).find(\'input\').val(\'\');$(a).find(\'input\').trigger(\'keyup\')} a.slideToggle();"><i class="flx-icon icon-filter"></i></button>';
                                    botonera += '<button class="btn btn-default" title="' + flexygo.localization.translate('flxedit.addfields') + '" onclick="$(this).closest(\'flx-propertymanager\')[0].addProperties($(this).closest(\'.popover-content\').find(\'.chk:checked\'));$(this).closest(\'flx-module\').find(\'.addProps\').click();"><i class="flx-icon icon-plus"></i></button>';
                                    botonera += '</div>';
                                    botonera += '</div>';
                                    let textChk = '';
                                    let filterContainer = `<div class="props-filter-container padding-top-m" style="display:none;">
                                <div class="search input-group" style="width:100%;">
                                    <input type="search" placeholder="${flexygo.localization.translate('flxsearch.search')}" style="width:100%;"
                                           onkeyup="$(this).closest(\'flx-propertymanager\')[0].filterProperties(this);" onsearch="$(this).closest(\'flx-propertymanager\')[0].filterProperties(this);">
                                </div></div>`;
                                    textChk += filterContainer + '<div class="propertyList"><ul class="list-unstyled row">';
                                    let i = 0;
                                    while (i < ret.length) {
                                        textChk += '<li class="col-4"><label title="' + ret[i] + '"><input class="chk" type="checkbox" value="' + ret[i] + '"><div>' + ret[i] + '</div></label></li>';
                                        i++;
                                    }
                                    textChk += '</ul></div>';
                                    contenAppend += botonera + textChk;
                                }
                                let contentDetached = '<div class="size-s"><legend>' + flexygo.localization.translate('flxedit.adddetachedproperty') + '</legend>';
                                contentDetached += '<div class="row size-s">';
                                contentDetached += '<div class="col-5" > ';
                                contentDetached += '<flx-text type="ident" property="detachedPropertyName" PlaceHolder="' + flexygo.localization.translate('flxedit.propertyname') + '" ></flx-text>';
                                contentDetached += '</div>';
                                contentDetached += '<div class="col-5">';
                                contentDetached += '<flx-text type="ident" property="detachedPropertyLabel" PlaceHolder="' + flexygo.localization.translate('flxedit.propertylabel') + '" ></flx-text>';
                                contentDetached += '</div>';
                                contentDetached += '<div class="col-2">';
                                contentDetached += '<button title="' + flexygo.localization.translate('flxedit.createfields') + '" class="btn btn-default" onclick="$(this).closest(\'flx-propertymanager\')[0].addDetachedProperty($(this).closest(\'.popover-content\').find(\'[property=detachedPropertyName]\').val(),$(this).closest(\'.popover-content\').find(\'[property=detachedPropertyLabel]\').val());$(this).closest(\'flx-module\').find(\'.addProps\').click();"><i class="flx-icon icon-plus" /></button>';
                                contentDetached += '</div>';
                                contentDetached += '</div></div>';
                                let contentCreate = '<div class="size-s"><legend>' + flexygo.localization.translate('flxedit.createfields') + '</legend>';
                                contentCreate += '<div class="row size-s">';
                                contentCreate += '<div class="col-4" > ';
                                contentCreate += '<flx-text type="ident" property="fieldName" PlaceHolder="' + flexygo.localization.translate('flxedit.enterfieldname') + '" ></flx-text>';
                                contentCreate += '</div>';
                                contentCreate += '<div class="col-3">';
                                contentCreate += '<flx-combo property="fieldType">';
                                contentCreate += '<option value="">' + flexygo.localization.translate('flxedit.selecttype') + '</option>';
                                contentCreate += '<option value="1">Text 50</option>';
                                contentCreate += '<option value="2">Text 100</option>';
                                contentCreate += '<option value="3">Text 250</option>';
                                contentCreate += '<option value="4">Text 1000</option>';
                                contentCreate += '<option value="5">Text Max</option>';
                                contentCreate += '<option value="6">Integer</option>';
                                contentCreate += '<option value="7">Decimal 2</option>';
                                contentCreate += '<option value="8">Decimal 4</option>';
                                contentCreate += '<option value="9">Boolean</option>';
                                contentCreate += '<option value="10">Date</option>';
                                contentCreate += '<option value="11">DateTime</option>';
                                contentCreate += '</flx-combo>';
                                contentCreate += '</div>';
                                contentCreate += '<div class="col-4">';
                                contentCreate += ' <flx-dbcombo property="fieldTable" additionalWhere="(objects.objectname=\'' + ObjectName + '\')" PlaceHolder="' + flexygo.localization.translate('flxedit.selecttable') + '" ObjectName="sysObject" ViewName="NetAdditionalTables" SQLValueField="tablename" SQLDisplayField="tablename" SQLFilter="vNetAdditionalTables.tablename like @findstring" required data-msg-required="' + flexygo.localization.translate('objectmanager.validicon') + '"> </flx-dbcombo>';
                                contentCreate += '</div>';
                                contentCreate += '<div class="col-1">';
                                contentCreate += '<button title="' + flexygo.localization.translate('flxedit.createfields') + '" class="btn btn-default" onclick="$(this).closest(\'flx-propertymanager\')[0].addFields($(this).closest(\'.popover-content\').find(\'[property=fieldName]\').val(),$(this).closest(\'.popover-content\').find(\'[property=fieldType]\').val(),$(this).closest(\'.popover-content\').find(\'[property=fieldTable]\').val());$(this).closest(\'flx-module\').find(\'.addProps\').click();"><i class="flx-icon icon-plus" /></button>';
                                contentCreate += '</div>';
                                contentCreate += '</div></div>';
                                popover.attr('data-content', contenAppend + contentDetached + contentCreate);
                            });
                        });
                    }
                    let dest = me.find('.propHeader');
                    if (dest.length == 0) {
                        me.find('.addProps').remove();
                        me.find('.relatedDep').remove();
                        if (me.attr("mode") == 'edit') {
                            me.prepend(btnInfo);
                        }
                        me.prepend(btnRelatedDep);
                        me.prepend(btnProp);
                    }
                    else {
                        dest.find('.addProps').remove();
                        dest.find('.relatedDep').remove();
                        if (me.attr("mode") == 'edit') {
                            dest.prepend(btnInfo);
                        }
                        dest.append(btnRelatedDep);
                        dest.append(btnProp);
                    }
                }
                addFields(fieldName, fieldType, fieldTable) {
                    let me = $(this);
                    if (!fieldName || fieldName == '') {
                        flexygo.msg.warning('flxedit.enterfieldname');
                        return;
                    }
                    else if (fieldName.toLowerCase() === "json") {
                        flexygo.msg.warning(`${fieldName} ${flexygo.localization.translate('flxedit.reserveword')}`);
                        return;
                    }
                    else if (!fieldType || fieldType == '') {
                        flexygo.msg.warning('flxedit.selecttype');
                        return;
                    }
                    else if (!fieldTable || fieldTable == '') {
                        flexygo.msg.warning('flxedit.selecttable');
                        return;
                    }
                    let params = {
                        ObjectName: me.attr('ObjectName'),
                        FieldName: fieldName,
                        FieldType: fieldType,
                        TableName: fieldTable
                    };
                    flexygo.ajax.syncPost('~/api/Edit', 'AddNewFields', params, (ret) => {
                        this.refresh();
                    });
                }
                addDetachedProperty(propertyName, propertyLabel) {
                    let me = $(this);
                    if (!propertyName || propertyName == '') {
                        flexygo.msg.warning('flxedit.propertyname');
                        return;
                    }
                    else if (!propertyLabel || propertyLabel == '') {
                        flexygo.msg.warning('flxedit.propertylabel');
                        return;
                    }
                    let params = {
                        ObjectName: me.attr('ObjectName'),
                        PropertyName: propertyName,
                        PropertyLabel: propertyLabel
                    };
                    flexygo.ajax.syncPost('~/api/Edit', 'AddNewDetachedProperty', params, (ret) => {
                        this.refresh();
                    });
                }
                addProperties(checks) {
                    let me = $(this);
                    if (checks.length == 0) {
                        flexygo.msg.warning('flxedit.createwarning');
                        return;
                    }
                    let props = new Array();
                    checks.each((i, e) => {
                        props.push($(e).val());
                    });
                    let params = {
                        ObjectName: me.attr('ObjectName'),
                        Properties: props
                    };
                    flexygo.ajax.syncPost('~/api/Edit', 'AddNewProperties', params, (ret) => {
                        this.refresh();
                    });
                }
                filterProperties(e) {
                    let me = $(this);
                    let value = $(e).val().toLowerCase();
                    ;
                    let props = me.find('.propertyList input');
                    for (let i = 0; i < props.length; i++) {
                        let propName = $(props[i]).val().toLowerCase();
                        if (propName.includes(value)) {
                            $(props[i]).closest('li').removeClass('hide');
                        }
                        else {
                            $(props[i]).closest('li').addClass('hide');
                        }
                    }
                }
                refreshConfigMode() {
                    let me = $(this);
                    if (this.mode != 'list') {
                        let stack = me.find('.grid-stack').data('gridstack');
                        stack.movable('.' + stack.opts._class + ' .grid-stack-item', true);
                        stack.resizable('.' + stack.opts._class + ' .grid-stack-item', true);
                        me.closest('flx-module').find('.config-btn').show();
                        me.find('.grid-stack').on('change.config', (event, items) => {
                            if (!flexygo.utils.isBlank(items)) {
                                let myProps = new Array();
                                for (let i = 0; i < items.length; i++) {
                                    let myProp = new flexygo.api.PropertyResize();
                                    myProp.PositionX = items[i].x;
                                    myProp.PositionY = items[i].y;
                                    myProp.Width = items[i].width;
                                    myProp.Height = items[i].height;
                                    myProp.PropertyName = items[i].el.find('[property]').attr('property');
                                    if (this.mode == 'edit') {
                                        myProp.Name = this.objectname;
                                    }
                                    else if (this.mode == 'process') {
                                        myProp.Name = this.processName;
                                    }
                                    else if (this.mode == 'report') {
                                        myProp.Name = this.reportName;
                                    }
                                    myProps.push(myProp);
                                }
                                let params = { "Mode": this.mode, "Properties": myProps };
                                flexygo.ajax.syncPost('~/api/Edit', 'ResizeProperties', params, () => { });
                            }
                        });
                    }
                    let props = me.find('[data-tag=property-toolbar]');
                    for (let i = 0; i < props.length; i++) {
                        let prop = $(props[i]);
                        prop.append(this.getExtendedTools(this.properties[prop.attr('data-propertyName')]));
                    }
                    props.show();
                }
                getValue(row, tag) {
                    if (tag.toLowerCase() == 'control') {
                        let prop = this.properties[row.name];
                        let defVal = (row.defaultvalue !== null ? `<span title="${flexygo.localization.translate('flxedit.defaultvalue')}" class="propertymanager-default txt-muted">${(row.persistdefaultvalue ? `<i title="${flexygo.localization.translate('flxedit.persistdefaultvalue')}" class="flx-icon icon-pin margin-right-s"/>` : '')}${row.defaultvalue}</span>` : '');
                        return `<${prop.WebComponent} mode="preview" disabled property="${row.name}"/>${defVal}`;
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
                paintProperties(data, template) {
                    let str = '';
                    let propeerties_settings = $.map(data, (value, _) => {
                        return [value];
                    });
                    propeerties_settings.sort((a, b) => {
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
                    let configText = '';
                    if (propeerties_settings.length == 0) {
                        configText = '<div style="float:left">' + flexygo.localization.translate('flxpropertymanager.click') + '</div>';
                    }
                    str += '<div class="propHeader bg-module">' + configText + '</div><div class="cntBody"><form><div class="resizable-row grid-stack edit-form">';
                    for (let i = 0; i < propeerties_settings.length; i++) {
                        let row = flexygo.utils.lowerKeys(propeerties_settings[i]);
                        try {
                            if (this.properties[row.name].HasDefinition) {
                                //On clicking while mantaining control the advance settings will open, if the user is not pressing control quick settings will show up
                                const wizard_onclick = this.getWizardOnClickEvent(row.name);
                                let item = $(`<div class="grid-stack-item-content propertyItem" onclick="${wizard_onclick}"/>`).html(template);
                                let container = $('<div class="grid-stack-item" />').append(item);
                                let props = item.find('[data-tag]');
                                /*manage labels */
                                for (let j = 0; j < props.length; j++) {
                                    let prop = $(props[j]);
                                    let tag = prop.data('tag').toLowerCase();
                                    if (tag.toLowerCase() == 'label') {
                                        if (this.properties[row.name].ControlType != 'separator' && this.properties[row.name].ControlType != 'placeholder') {
                                            var inp = $(`<input type="text" class="lblEdit ${(this.properties[row.name].FormDisplay ? '' : 'strike')}" autocomplete="off" />`);
                                            var lblName = $(`<small class="hidden lblName ${(this.properties[row.name].FormDisplay ? '' : 'strike')}">${row.name}</small>`);
                                            var status = $('<span class="status" />');
                                            var depStatus = $('<span class="depStatus margin-left-s" />');
                                            var detachedProp = $(`<i title="${flexygo.localization.translate('flxedit.detachedproperty')}" class="detachedProp fa fa-unlink margin-left-s" />`);
                                            prop.html(inp);
                                            prop.append(lblName);
                                            prop.append(status);
                                            prop.append(depStatus);
                                            if (this.properties[row.name].DetachedFromDB) {
                                                prop.prepend(detachedProp);
                                            }
                                            inp.attr('value', this.getValue(row, tag));
                                            if (this.properties[row.name].IsRequired) {
                                                prop.addClass("required");
                                            }
                                            if (this.properties[row.name].Locked) {
                                                prop.addClass("locked");
                                            }
                                            let listDependencies = $('<div class="flxListDependencies"/>');
                                            if (this.properties[row.name].HasDependencies) {
                                                let listProps = this.properties[row.name].DependingProperties;
                                                listDependencies.append(`<small><b>${flexygo.localization.translate('flxedit.throwto')}</b></small><ul id="listDependencies"/>`);
                                                for (let i = 0; i < listProps.length; i++) {
                                                    if (listDependencies.find(`li:contains('${this.properties[row.name].DependingProperties[i].DependantPropertyName}')`).length == 0) {
                                                        listDependencies.find('ul').append('<li>' + this.properties[row.name].DependingProperties[i].DependantPropertyName + '</li>');
                                                    }
                                                }
                                                prop.find(".depStatus").append(`<span><i title="${flexygo.localization.translate('flxedit.hasdependencies')}" class="flx-icon icon-right-arrow" clickable></i><flx-tooltip mode="popover" container="body">${listDependencies[0].outerHTML}</flx-tooltip></span>`);
                                            }
                                            let listDependencies2 = $('<div class="flxListDependencies"/>');
                                            if (this.properties[row.name].HasDependingProperties) {
                                                let listProps2 = this.properties[row.name].DependingFrom;
                                                listDependencies2.append(`<small><b>${flexygo.localization.translate('flxedit.affectedby')}</b></small><ul id="listDepending"/>`);
                                                for (let i = 0; i < listProps2.length; i++) {
                                                    if (listDependencies2.find(`li:contains('${this.properties[row.name].DependingFrom[i].DependantPropertyName}')`).length == 0) {
                                                        listDependencies2.find('ul').append('<li>' + this.properties[row.name].DependingFrom[i].DependantPropertyName + '</li>');
                                                    }
                                                }
                                                prop.find(".depStatus").append(`<span><i title="${flexygo.localization.translate('flxedit.hasdependingproperties')}" class="flx-icon icon-object-relations-1 margin-left-s clickable"></i><flx-tooltip mode="popover" container="body">${listDependencies2[0].outerHTML}</flx-tooltip></span>`);
                                            }
                                            if (this.properties[row.name].OnChangeProcessName) {
                                                prop.find(".depStatus").append(`<span><i title="${flexygo.localization.translate('flxedit.withchangeprocess')}" class="flx-icon icon-process margin-left-s"></i></span>`);
                                            }
                                            if (this.properties[row.name].LabelStyle != '') {
                                                prop.attr('style', this.properties[row.name].LabelStyle);
                                            }
                                            if (this.properties[row.name].LabelCssClass != '') {
                                                prop.addClass(this.properties[row.name].LabelCssClass);
                                            }
                                            prop.attr('lblproperty', row.name);
                                        }
                                        else {
                                            prop.empty();
                                        }
                                    }
                                    else if (tag.toLowerCase() == 'property-toolbar') {
                                        prop.attr('data-propertyName', row.name);
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
                        catch (ex) {
                            flexygo.msg.error(flexygo.localization.translate('flxpropertymanager.hasdefinition') + ' ' + row.name);
                            return flexygo.localization.translate('flxpropertymanager.hasdefinition') + ' ' + row.name;
                        }
                    }
                    str += '</div></form></div>';
                    return str;
                }
                getWizardOnClickEvent(propertyName) {
                    let wizard_onclick = 'if(event.ctrlKey) {';
                    //Here we add the openPage when ctr is pressed depending on the manager type
                    if (this.mode == 'process') {
                        wizard_onclick += "flexygo.nav.openPage('edit', 'sysProcessParam', `ProcessName = '" + this.processName + "' and ParamName = '" + propertyName;
                    }
                    else if (this.mode == 'report') {
                        wizard_onclick += "flexygo.nav.openPage('edit', 'sysReportParam', `ReportName = '" + this.reportName + "' and ParamName = '" + propertyName;
                    }
                    else {
                        wizard_onclick += "flexygo.nav.openPage('edit', 'sysObjectProperty', `ObjectName = '" + this.objectname + "' and Propertyname = '" + propertyName;
                    }
                    wizard_onclick += "'`, null, 'popup', false, $(this));} else {";
                    //We check if every quick setting has been properly updated, and if needed we will update its values
                    wizard_onclick += "const property_manager = this.closest('flx-propertymanager');";
                    wizard_onclick += `const property_wizard = property_manager.propertyWizard;`;
                    wizard_onclick += 'if (property_wizard.propertyName) {';
                    wizard_onclick += `const label_value = property_wizard.querySelector('[property=&quot;Label&quot;]').getValue();`;
                    wizard_onclick += `if (property_manager.properties[property_wizard.propertyName]?.Label !== label_value && label_value) {`;
                    wizard_onclick += `property_manager.updateQuickSettingString(property_wizard.propertyName, label_value, 'Label');`;
                    wizard_onclick += `property_wizard.changeQuickSettingVisuallyString(label_value, 'Label', property_wizard.propertyName);}`;
                    wizard_onclick += `const default_value = property_wizard.querySelector('[property=&quot;DefaultValue&quot;]').getValue();`;
                    wizard_onclick += `if (property_manager.properties[property_wizard.propertyName]?.DefaultValue !== default_value) {`;
                    wizard_onclick += `property_manager.updateQuickSettingString(property_wizard.propertyName, default_value, 'DefaultValue');`;
                    wizard_onclick += `property_wizard.changeQuickSettingVisuallyString(default_value, 'DefaultValue', property_wizard.propertyName);}`;
                    wizard_onclick += `const css_value = property_wizard.querySelector('[property=&quot;CssClass&quot;]').getValue();`;
                    wizard_onclick += `if (property_manager.properties[property_wizard.propertyName]?.CssClass !== css_value) {`;
                    wizard_onclick += `property_manager.updateQuickSettingString(property_wizard.propertyName, css_value, 'CssClass');`;
                    wizard_onclick += `property_wizard.changeQuickSettingVisuallyString(css_value, 'CSSClass', property_wizard.propertyName);}}`;
                    //We set the current clicked property activeProperty class and remove it from the older active one, also we change the PropertyName attribute from the object wizard
                    wizard_onclick += "property_manager.querySelector('.activeProperty')?.classList.remove('activeProperty');";
                    wizard_onclick += "this.classList.add('activeProperty'); property_manager.setAttribute('propertyName','" + propertyName + "');";
                    wizard_onclick += "property_wizard.setAttribute('propertyName','" + propertyName + "')}";
                    return wizard_onclick;
                }
                paintHeader() {
                    let thead = $('<thead />');
                    let tr = $('<tr class="rowHeader"/>');
                    let td = $('<th style="width:100px"/>');
                    tr.append(td);
                    for (let i = 0; i < this.propArr.length; i++) {
                        if (this.propArr[i].WebComponent) {
                            let key = this.propArr[i].Name.toLowerCase();
                            td = $('<th />').html(this.propArr[i].Label).attr('data-sort', key).css('width', this.propArr[i].Width + 'px');
                            tr.append(td);
                        }
                    }
                    thead.html(tr);
                    return '<table><thead>' + thead.html() + '</thead><tbody>';
                }
                paintFooter() {
                    let tfoot = $('<tfoot />');
                    let tr = $('<tr class="rowInsert"/>');
                    let td = $('<td/>');
                    let btnSave = { ButtonId: "-111", Disabled: false, HideText: true, IconClass: "flx-icon icon-save-2", Order: 1, PositionId: "Toolbar", Text: "Save", ToolTip: "Save", TypeId: "SaveRow" };
                    let btnClear = { ButtonId: "-112", Disabled: false, HideText: true, IconClass: "flx-icon  icon-clean", Order: 2, PositionId: "Toolbar", Text: "Clear", ToolTip: "Clear", TypeId: "ClearRow" };
                    let btnGroup = $('<div class="btn-group" />');
                    btnGroup.append(this._getButton(btnSave));
                    btnGroup.append(this._getButton(btnClear));
                    td.html(btnGroup);
                    tr.append(td);
                    for (let i = 0; i < this.propArr.length; i++) {
                        if (this.propArr[i].WebComponent) {
                            td = $('<td/>');
                            let input = `<${this.propArr[i].WebComponent} mode="preview" disabled property="${this.propArr[i].Name}"/>`;
                            td.html(input);
                            tr.append(td);
                        }
                    }
                    tfoot.html(tr);
                    return '</tbody><tfoot>' + tfoot.html() + '</tfoot></table>';
                }
                paintBody() {
                    let tbody = $('<tbody />');
                    let tr = $('<tr/>');
                    let td = $('<td/>');
                    tr.append(td);
                    for (let i = 0; i < this.propArr.length; i++) {
                        if (this.propArr[i].WebComponent) {
                            td = $('<td data-tag="property-toolbar"/>').attr('data-propertyName', this.propArr[i].Name);
                            tr.append(td);
                        }
                    }
                    tbody.html(tr);
                    return tbody.html();
                }
                _getButton(btn) {
                    let htmlBTN = $('<button class="btn btn-default" />');
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
                    else if (btn.IconPath && btn.IconPath != '') {
                        htmlBTN.prepend('<img src="' + btn.IconPath + '" alt="" /> ');
                    }
                    if (btn.Tooltip && btn.Tooltip != '') {
                        htmlBTN.attr('title', btn.Tooltip);
                    }
                    return htmlBTN;
                }
                insertSeparator(PropertyName, Above) {
                    let me = this;
                    let params = {
                        Mode: this.mode,
                        Name: (this.objectname || this.processName || this.reportName),
                        PropertyName: PropertyName,
                        Above: Above,
                    };
                    flexygo.ajax.post('~/api/Edit', 'InsertSeparator', params, (response) => { me.refresh(); return response; });
                }
                insertPlaceHolder(PropertyName, Above) {
                    let me = this;
                    let params = {
                        Mode: this.mode,
                        Name: (this.objectname || this.processName || this.reportName),
                        PropertyName: PropertyName,
                        Above: Above,
                    };
                    flexygo.ajax.post('~/api/Edit', 'InsertPlaceHolder', params, (response) => { me.refresh(); return response; });
                }
                getExtendedTools(row) {
                    let me = $(this);
                    let helpId = "";
                    helpId = this.properties[row.Name].HelpId;
                    let btnGroup = $('<div class="btn-group btn-group-xs" />');
                    let btnHelp = $('<span class="btn btn-default" /> ');
                    let helpIcon = $('<i class="flx-icon icon-information-2 " />');
                    if (helpId) {
                        helpIcon = $('<i class="flx-icon icon-information-2 txt-notify" />');
                    }
                    let btnEdit = $('<span class="btn btn-default" /> ');
                    let editIcon = $('<i class="flx-icon icon-settings-2" />');
                    let btnDelete = $('<span class="btn btn-default txt-danger" /> ');
                    let deleteIcon = $('<i class="flx-icon icon-delete-2" />');
                    let btnMenu = $('<span class="btn btn-default" /> ');
                    let menuIcon = $('<i class="flx-icon icon-bullet-list-3" />');
                    let menuCaret = $('<span class="caret" />');
                    let objName;
                    let objWhere;
                    switch (this.mode) {
                        case 'process':
                            objName = 'sysProcessParam';
                            objWhere = 'ProcessName=\'' + this.processName + '\' and ParamName=\'' + row.Name + '\'';
                            break;
                        case 'report':
                            objName = 'sysReportParam';
                            objWhere = 'ReportName=\'' + this.reportName + '\' and ParamName=\'' + row.Name + '\'';
                            break;
                        default:
                            objName = 'sysObjectProperty';
                            objWhere = 'objectName=\'' + me.attr('ObjectName') + '\' and Propertyname=\'' + row.Name + '\'';
                    }
                    btnHelp.on('click', (ev) => {
                        ev.preventDefault();
                        ev.stopPropagation();
                        if (helpId) {
                            flexygo.nav.openHelpId(helpId, 'popup', false, $(this));
                        }
                        else {
                            flexygo.nav.openPage('edit', 'sysHelp', '', null, 'modal', false, $(this));
                            flexygo.events.on(ev.currentTarget, "entity", "inserted", (e) => {
                                flexygo.events.off(e.context, "entity", "inserted");
                                let entity = e.sender;
                                var obj = new flexygo.obj.Entity(objName, objWhere);
                                obj.read();
                                obj.data.HelpId.Value = entity.data.HelpId.Value;
                                if (obj.update()) {
                                    $(e.context).find('.icon-information-2').addClass("txt-notify");
                                    helpId = entity.data.HelpId.Value;
                                }
                            });
                        }
                    });
                    btnHelp.append(helpIcon);
                    btnGroup.append(btnHelp);
                    btnEdit.on('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        flexygo.nav.openPage('edit', objName, objWhere, null, 'popup', false, $(this));
                    });
                    btnEdit.append(editIcon);
                    btnGroup.append(btnEdit);
                    btnGroup.append(btnDelete);
                    btnDelete.on('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        flexygo.ui.wc.FlxModuleElement.prototype.deleteModule(objName, objWhere, $(this), $(e.currentTarget), () => {
                            var _a;
                            //If the property wizard has the property which has been deleted we remove the propertyname attribute so it does show the "Click on any property" div
                            const current_wizard_property = (_a = this.propertyWizard.getAttribute('propertyname')) === null || _a === void 0 ? void 0 : _a.toLowerCase();
                            const current_delete_property = e.currentTarget.closest('.item').querySelector('[property]').getAttribute('property').toLowerCase();
                            if (current_wizard_property === current_delete_property) {
                                this.propertyWizard.removeAttribute('propertyname');
                            }
                            this.refresh();
                        });
                    });
                    btnDelete.append(deleteIcon);
                    if (this.mode != "list") {
                        btnGroup.append(btnMenu);
                        let btMenuId = flexygo.utils.uniqueId();
                        let btnDiv = $('<div class="keepAlive propertyMenu size-s" style="display:none" />');
                        btnDiv.attr('id', btMenuId);
                        btnGroup.append(btnDiv);
                        btnMenu.on('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            let menuContainer = $(e.currentTarget).parent().find('.propertyMenu');
                            if (menuContainer.children().length == 0) {
                                menuContainer.append(this.getExtendedToolsMenu(row));
                                //hide icon selector for flx-code properties
                                if (menuContainer.closest('.item').find('flx-code').length > 0) {
                                    $(menuContainer.find('ul').find('li')[2]).addClass("hidden");
                                }
                            }
                            if ($('#' + btMenuId).is(':visible')) {
                                $('#' + btMenuId).slideUp(250);
                            }
                            else {
                                const more_btn_position_data = btnGroup[0].getBoundingClientRect();
                                btnDiv.css({
                                    position: "fixed",
                                    top: more_btn_position_data.top + more_btn_position_data.height,
                                    left: more_btn_position_data.left
                                });
                                const current_modal = $('#' + btMenuId);
                                current_modal.slideDown(250);
                                //We add an on click to the document so if the user clicks out of the modal it gets closed, and if triggered it also gets closed
                                document.addEventListener('click', function handler(event) {
                                    const isClickInside = current_modal[0].contains(event.target);
                                    if (!isClickInside) {
                                        current_modal.slideUp(250);
                                        document.removeEventListener('click', handler);
                                    }
                                });
                            }
                        });
                        btnMenu.append(menuIcon);
                        btnMenu.append(menuCaret);
                    }
                    return btnGroup;
                }
                getExtendedToolsMenu(row, btMenuId) {
                    let btnUl = $('<div/>');
                    /* Insert Separator buttons*/
                    let btnIsertSep = $('<span class="addsep"><i class="flx-icon icon-upload icon-margin" ></i> <span>' + flexygo.localization.translate('flxpropertymanager.addseparatora') + '</span></span>')
                        .on('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.insertSeparator(row.Name, 0);
                        $(e.currentTarget).closest('.propertyMenu').slideUp(250);
                    });
                    btnUl.append(btnIsertSep);
                    let btnIsertSep2 = $('<span class="addsep"><i class="flx-icon icon-download icon-margin" ></i> <span>' + flexygo.localization.translate('flxpropertymanager.addseparatorb') + '</span></span>')
                        .on('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.insertSeparator(row.Name, 1);
                        $(e.currentTarget).closest('.propertyMenu').slideUp(250);
                    });
                    btnUl.append(btnIsertSep2);
                    let btnIsertSep3 = $('<span class="addsep"><i class="flx-icon icon-non-check-2 icon-margin" ></i> <span>' + flexygo.localization.translate('flxpropertymanager.addplaceholder') + '</span></span>')
                        .on('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.insertPlaceHolder(row.Name, 0);
                        $(e.currentTarget).closest('.propertyMenu').slideUp(250);
                    });
                    btnUl.append(btnIsertSep3);
                    return btnUl;
                }
                parseEditString(str) {
                    let me = $(this);
                    let props = me.find('[property]');
                    let obj = new Object();
                    for (let i = 0; i < props.length; i++) {
                        let prop = $(props[i])[0];
                        obj[prop.property] = prop.getValue();
                    }
                    return flexygo.utils.parser.compile(obj, str, this);
                }
                flxTranslate(str) {
                    return flexygo.localization.translate(str);
                }
            }
            wc.FlxPropertyManagerElement = FlxPropertyManagerElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-propertymanager', flexygo.ui.wc.FlxPropertyManagerElement);
//# sourceMappingURL=flx-propertymanager.js.map