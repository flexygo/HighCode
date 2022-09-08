/**
 * @namespace flexygo.ui.wc
 */
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
                    //Remove entity events
                    flexygo.events.on(this, "entity", "all", this.onPropertyChanged);
                    //Capture entity events
                    flexygo.events.on(this, "entity", "all", this.onPropertyChanged);
                    //Remove handler on DOM element remove
                    $(this).on("destroy", () => {
                        flexygo.events.off(this, "entity", "all", this.onPropertyChanged);
                    });
                    this.refresh();
                }
                static get observedAttributes() {
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
                            this.initProcessMode();
                            break;
                        case 'report':
                            this.initReportMode();
                            break;
                        default:
                            this.initEditMode();
                    }
                    //if (this.mode == 'process' || this.mode == 'report') {
                    //    flexygo.events.off(ctx, "entity", "all", onPropertyUpdate);
                    //    flexygo.events.on(ctx, "entity", "all", onPropertyUpdate);
                    //    $(document).off('insert.property update.property');
                    //    $(document).on('insert.property update.property', function (evName, entity, form) {
                    //        this.refresh();
                    //    });
                    //}
                }
                onPropertyChanged(e) {
                    if (this.mode == 'process' || this.mode == 'report') {
                        if (e.type === "inserted" || e.type === "updated") {
                            this.refresh();
                        }
                    }
                }
                initEditMode() {
                    let me = $(this);
                    me.html('');
                    let params = {
                        ObjectName: me.attr('ObjectName')
                        //ObjectWhere: null,
                        //ModuleName: 'sysmod-edit-generic',
                        //Defaults: null
                    };
                    flexygo.ajax.post('~/api/Edit', 'GetEditConfig', params, (response) => {
                        if (response) {
                            let template = response.Template;
                            this.tHeader = template.Header;
                            this.tBody = template.Body;
                            this.tFooter = template.Footer;
                            this.properties = response.Properties;
                            this.propArr = flexygo.utils.sortObject(this.properties, 'PositionY', 'PositionX');
                            this.render();
                            $(this).find('.lblEdit').on('change', (e) => {
                                let inp = $(e.currentTarget);
                                if (inp.val() && inp.val() != '') {
                                    var obj = new flexygo.obj.Entity('sysObjectProperty', "ObjectName='" + this.objectname + "' and PropertyName='" + inp.closest('[lblproperty]').attr('lblproperty') + "'");
                                    obj.read();
                                    obj.data.Label = inp.val();
                                    obj.update();
                                }
                            });
                        }
                    });
                }
                initProcessMode() {
                    let me = $(this);
                    me.html('');
                    let params = {
                        ObjectName: null,
                        ObjectWhere: null,
                        ModuleName: 'sysmod-edit-processparams',
                        ProcessName: me.attr('ProcessName'),
                        Defaults: null
                    };
                    flexygo.ajax.post('~/api/Edit', 'GetProcessParamsTemplate', params, (response) => {
                        if (response) {
                            let template = response.Template;
                            this.data = response.Properties;
                            this.tHeader = template.Header;
                            this.tBody = template.Body;
                            this.tFooter = template.Footer;
                            this.properties = response.Properties;
                            for (let key in this.properties) {
                                this.properties[key].ClientReadOnly = true;
                            }
                            this.propArr = flexygo.utils.sortObject(this.properties, 'PositionY', 'PositionX');
                            this.render();
                            $(this).find('.lblEdit').on('change', (e) => {
                                let inp = $(e.currentTarget);
                                if (inp.val() && inp.val() != '') {
                                    var obj = new flexygo.obj.Entity('sysProcessParam', "ProcessName='" + me.attr('ProcessName') + "' and ParamName='" + inp.closest('[lblproperty]').attr('lblproperty') + "'");
                                    obj.read();
                                    obj.data.Label = inp.val();
                                    obj.update();
                                }
                            });
                        }
                    });
                }
                initReportMode() {
                    let me = $(this);
                    me.html('');
                    let params = {
                        ObjectName: null,
                        ObjectWhere: null,
                        ModuleName: 'sysmod-edit-reportparams',
                        ReportName: me.attr('ReportName'),
                        Defaults: null
                    };
                    flexygo.ajax.post('~/api/Edit', 'GetReportParamsTemplate', params, (response) => {
                        if (response) {
                            let template = response.Template;
                            this.data = response.Properties;
                            this.tHeader = template.Header;
                            this.tBody = template.Body;
                            this.tFooter = template.Footer;
                            this.properties = response.Properties;
                            this.propArr = flexygo.utils.sortObject(this.properties, 'PositionY', 'PositionX');
                            this.render();
                            $(this).find('.lblEdit').on('change', (e) => {
                                let inp = $(e.currentTarget);
                                if (inp.val() && inp.val() != '') {
                                    var obj = new flexygo.obj.Entity('sysReportParam', "ReportName='" + me.attr('ReportName') + "' and ParamName='" + inp.closest('[lblproperty]').attr('lblproperty') + "'");
                                    obj.read();
                                    obj.data.Label = inp.val();
                                    obj.update();
                                }
                            });
                        }
                    });
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
                    }
                    else {
                        rendered = flexygo.utils.parser.compile(this.properties, this.tBody, this);
                        me.empty();
                        me.html(rendered);
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
                    let btnProp = $('<button class="addProps btn btn-default txt-tools"><i class="flx-icon icon-add"></i> ' + flexygo.localization.translate('nodemanager.addfields') + '</button>');
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
                                    botonera += '<button class="btn btn-default" title="' + flexygo.localization.translate('flxedit.addfields') + '" onclick="$(this).closest(\'flx-propertymanager\')[0].addProperties($(this).closest(\'.popover-content\').find(\'.chk:checked\'));$(this).closest(\'flx-module\').find(\'.addProps\').click();"><i class="flx-icon icon-plus"></i></button>';
                                    botonera += '</div>';
                                    botonera += '</div>';
                                    let textChk = '';
                                    textChk += '<div class="propertyList"><ul class="list-unstyled row">';
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
                                contentCreate += ' <flx-dbcombo property="fieldTable" additionalWhere="(objects.objectname=\'' + ObjectName + '\')" PlaceHolder="' + flexygo.localization.translate('flxedit.selecttable') + '" ObjectName="sysObject" ViewName="NetAdditionalTables" SQLValueField="tablename" SQLDisplayField="tablename" required data-msg-required="' + flexygo.localization.translate('objectmanager.validicon') + '"> </flx-dbcombo>';
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
                        me.prepend(btnProp);
                    }
                    else {
                        dest.find('.addProps').remove();
                        dest.append(btnProp);
                    }
                }
                addFields(fieldName, fieldType, fieldTable) {
                    let me = $(this);
                    if (!fieldName || fieldName == '') {
                        flexygo.msg.warning('flxedit.enterfieldname');
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
                refreshConfigMode() {
                    let me = $(this);
                    if (this.mode != 'list') {
                        let stack = me.find('.grid-stack').data('gridstack');
                        stack.movable('.' + stack.opts._class + ' .grid-stack-item', true);
                        stack.resizable('.' + stack.opts._class + ' .grid-stack-item', true);
                        me.closest('flx-module').find('.config-btn').show();
                        me.find('.grid-stack').on('change.config', (event, items) => {
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
                        return '<' + prop.WebComponent + ' disabled property="' + row.name + '" />';
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
                    let configText = '';
                    if (dataArray.length == 0) {
                        configText = '<div style="float:left">' + flexygo.localization.translate('flxpropertymanager.click') + '</div>';
                    }
                    str += '<div class="propHeader bg-module">' + configText + '</div><div class="cntBody"><form><div class="resizable-row grid-stack edit-form">';
                    for (let i = 0; i < dataArray.length; i++) {
                        let row = flexygo.utils.lowerKeys(dataArray[i]);
                        try {
                            if (this.properties[row.name].HasDefinition) {
                                let item = $('<div class="grid-stack-item-content" />').html(template);
                                let container = $('<div class="grid-stack-item" />').append(item);
                                let props = item.find('[data-tag]');
                                /*manage labels */
                                for (let j = 0; j < props.length; j++) {
                                    let prop = $(props[j]);
                                    let tag = prop.data('tag').toLowerCase();
                                    if (tag.toLowerCase() == 'label') {
                                        if (this.properties[row.name].ControlType != 'separator' && this.properties[row.name].ControlType != 'placeholder') {
                                            var inp = $('<input type="text" class="lblEdit" autocomplete="off" />');
                                            var status = $('<span class="status" />');
                                            var depStatus = $('<span class="depStatus margin-left-s" />');
                                            prop.html(inp);
                                            prop.append(status);
                                            prop.append(depStatus);
                                            inp.attr('value', this.getValue(row, tag));
                                            if (this.properties[row.name].IsRequired) {
                                                prop.addClass("required");
                                            }
                                            if (this.properties[row.name].Locked) {
                                                prop.addClass("locked");
                                            }
                                            if (this.properties[row.name].HasDependencies) {
                                                prop.find(".depStatus").append('<i title="' + flexygo.localization.translate('flxedit.hasdependencies') + '" class="flx-icon icon-right-arrow"></i>');
                                            }
                                            if (this.properties[row.name].HasDependingProperties) {
                                                prop.find(".depStatus").append('<ii title="' + flexygo.localization.translate('flxedit.hasdependingproperties') + '" class="flx-icon icon-object-relations-1 margin-left-s"></i>');
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
                        catch (ex) {
                            flexygo.msg.error(flexygo.localization.translate('flxpropertymanager.hasdefinition') + ' ' + row.name);
                            return flexygo.localization.translate('flxpropertymanager.hasdefinition') + ' ' + row.name;
                        }
                    }
                    str += '</div></form></div>';
                    return str;
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
                            let input = '<' + this.propArr[i].WebComponent + ' property="' + this.propArr[i].Name + '"  />';
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
                    let params = {
                        Mode: this.mode,
                        Name: (this.objectname || this.processName || this.reportName),
                        PropertyName: PropertyName,
                        Above: Above,
                    };
                    flexygo.ajax.post('~/api/Edit', 'InsertSeparator', params, (response) => { return response; });
                }
                insertPlaceHolder(PropertyName, Above) {
                    let params = {
                        Mode: this.mode,
                        Name: (this.objectname || this.processName || this.reportName),
                        PropertyName: PropertyName,
                        Above: Above,
                    };
                    flexygo.ajax.post('~/api/Edit', 'InsertPlaceHolder', params, (response) => { return response; });
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
                    btnEdit.on('click', () => {
                        flexygo.nav.openPage('edit', objName, objWhere, null, 'popup', false, $(this));
                    });
                    btnEdit.append(editIcon);
                    btnGroup.append(btnEdit);
                    btnGroup.append(btnDelete);
                    btnDelete.on('click', (e) => {
                        flexygo.ui.wc.FlxModuleElement.prototype.deleteModule(objName, objWhere, $(this), $(e.currentTarget), () => {
                            this.refresh();
                        });
                    });
                    btnDelete.append(deleteIcon);
                    btnGroup.append(btnMenu);
                    let btMenuId = flexygo.utils.uniqueId();
                    let btnDiv = $('<div class="keepAlive propertyMenu size-s" style="display:none" />');
                    btnDiv.attr('id', btMenuId);
                    btnGroup.append(btnDiv);
                    btnMenu.on('click', (e) => {
                        let menuContainer = $(e.currentTarget).parent().find('.propertyMenu');
                        if (menuContainer.children().length == 0) {
                            menuContainer.append(this.getExtendedToolsMenu(row));
                        }
                        this.loadExtendedMenu(row, btMenuId);
                        if ($('#' + btMenuId).is(':visible')) {
                            $('#' + btMenuId).slideUp(250);
                        }
                        else {
                            let MenuTop;
                            let MenuLeft;
                            let MenuShadow;
                            if (parseInt((btnGroup.offset().left).toFixed()) > parseInt(($(window).width() / 2).toFixed())) {
                                MenuLeft = parseInt((btnGroup.offset().left).toFixed()) - 196;
                            }
                            else {
                                MenuLeft = parseInt((btnGroup.offset().left).toFixed());
                            }
                            if (parseInt((btnGroup.offset().top - btnGroup.outerHeight() / 2).toFixed()) > parseInt(($(window).height() / 2).toFixed())) {
                                MenuTop = btnGroup.offset().top - 375;
                                MenuShadow = '0 -6px 20px 4px rgba(0, 0, 0, 0.15), 0 -2px 10px 0px rgba(0, 0, 0, 0.20)';
                            }
                            else {
                                MenuTop = parseInt((btnGroup.offset().top + btnGroup.outerHeight()).toFixed());
                                MenuShadow = '0 6px 20px 4px rgba(0, 0, 0, 0.15), 0 2px 10px 0px rgba(0, 0, 0, 0.20)';
                            }
                            btnDiv.css({ position: "fixed", top: MenuTop, left: MenuLeft, 'box-shadow': MenuShadow });
                            $('#' + btMenuId).slideDown(250);
                        }
                    });
                    btnMenu.append(menuIcon);
                    btnMenu.append(menuCaret);
                    return btnGroup;
                }
                loadExtendedMenu(row, btMenuId) {
                    let me = $(this);
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
                    let obj = new flexygo.obj.Entity(objName, objWhere);
                    obj.read();
                    $('#' + btMenuId + ' [name=Label]').val(obj.data.Label.Value);
                    $('#' + btMenuId + ' [name=CSSClass]').val(obj.data.CSSClass.Value);
                    //$('#' + btMenuId + ' [name=Style]').val(obj.data.Style.Value);
                    $('#' + btMenuId + ' [name=IconName]').val(obj.data.IconName.Value);
                    //$('#' + btMenuId + ' [name=TypeId]').val(obj.data.TypeId.Value);
                    $('#' + btMenuId + ' [name=Locked]').val(obj.data.Locked.Value);
                    $('#' + btMenuId + ' [name=IsRequired]').val(obj.data.IsRequired.Value);
                    $('#' + btMenuId + ' [name=Hide]').val(obj.data.Hide.Value);
                }
                getExtendedToolsMenu(row, btMenuId) {
                    let me = $(this);
                    let btnUl = $('<ul style="display: block;" />');
                    /* Insert editable controls */
                    btnUl.append('<li><flx-text type="text" name="Label" placeholder="' + flexygo.localization.translate('flxpropertymanager.label') + '" iconclass="flx-icon icon-text" ></flx-text></li>');
                    btnUl.append('<li><flx-text type="text" name="CSSClass" placeholder="' + flexygo.localization.translate('flxpropertymanager.classname') + '" iconclass="flx-icon icon-custom" ></flx-text></li>');
                    //  btnUl.append('<li><flx-text type="text" name="Style" placeholder="' + flexygo.localization.translate('flxpropertymanager.style') + '" iconclass="flx-icon icon-brush" ></flx-text></li>');
                    btnUl.append('<li><flx-dbcombo class="item-float" name = "IconName" placeholder = "' + flexygo.localization.translate('flxpropertymanager.classname') + '" iconclass = "flx-icon icon-image" objectname = "sysObject" viewname = "iconsView" sqlvaluefield = "IconName" sqldisplayfield = "IconName" > <template><i class=" txt-outstanding {{CSSClass}} icon-2x icon-margin" title="{{IconName}}" style="width: 20px"> </i></template ></flx-dbcombo><li>');
                    //btnUl.append('<li><flx-dbcombo name="IconName" placeholder="' + flexygo.localization.translate('flxpropertymanager.selecticon') + '" iconclass="flx-icon icon-image" objectname="sysObject" viewname="iconsView" PageSize="100" sqlvaluefield="IconName" sqldisplayfield="IconName" > <template><span class="txt-outstanding"><i class="{{CSSClass}} icon-margin-right"></i>{{IconName}}</span></template></flx-dbcombo></li>');
                    //btnUl.append('<li><flx-dbcombo name="TypeId" placeholder="' + flexygo.localization.translate('flxpropertymanager.selectcontroltype') + '" iconclass="fa fa-gear" objectname="sysObject" viewname="ControlTypes" sqlvaluefield="TypeId" sqldisplayfield="Descrip" ></flx-dbcombo></li>');
                    btnUl.append('<li class="separator"></li>');
                    btnUl.append('<li><span ><label ><i class="flx-icon icon-lock-1" ></i> ' + flexygo.localization.translate('flxpropertymanager.locked') + '</label><flx-check name="Locked" class="pull-right"></flx-check></span></li>');
                    btnUl.append('<li><span ><label ><i class="flx-icon icon-key-2" ></i> ' + flexygo.localization.translate('flxpropertymanager.required') + '</label><flx-check name="IsRequired" class="pull-right"></flx-check></span></li>');
                    btnUl.append('<li><span><label><i class="flx-icon icon-eye" ></i> ' + flexygo.localization.translate('flxpropertymanager.hidden') + '</label><flx-check name="Hide" class="pull-right"></flx-check></span></li>');
                    btnUl.append('<li class="separator"></li>');
                    /* Insert Separator buttons*/
                    let ProccLi = $('<li class="" />');
                    btnUl.append(ProccLi);
                    let btnIsertSep = $('<span class="addsep"><i class="flx-icon icon-upload" ></i> <span>' + flexygo.localization.translate('flxpropertymanager.addseparatora') + '</span></span>')
                        .on('click', (e) => {
                        this.insertSeparator(row.Name, 0);
                        $(e.currentTarget).closest('.propertyMenu').slideUp(250);
                        this.refresh();
                    });
                    ProccLi.append(btnIsertSep);
                    let btnIsertSep2 = $('<span class="addsep"><i class="flx-icon icon-download" ></i> <span>' + flexygo.localization.translate('flxpropertymanager.addseparatorb') + '</span></span>')
                        .on('click', (e) => {
                        this.insertSeparator(row.Name, 1);
                        $(e.currentTarget).closest('.propertyMenu').slideUp(250);
                        this.refresh();
                    });
                    ProccLi.append(btnIsertSep2);
                    let btnIsertSep3 = $('<span class="addsep"><i class="flx-icon icon-non-check-2" ></i> <span>' + flexygo.localization.translate('flxpropertymanager.addplaceholder') + '</span></span>')
                        .on('click', (e) => {
                        this.insertPlaceHolder(row.Name, 1);
                        $(e.currentTarget).closest('.propertyMenu').slideUp(250);
                        this.refresh();
                    });
                    ProccLi.append(btnIsertSep3);
                    btnUl.append('<li class="separator"></li>');
                    let btnLi = $('<li class="menuPadding" />');
                    btnUl.append(btnLi);
                    let btnGrp = $('<div class="form-actions" />');
                    btnLi.append(btnGrp);
                    /* Insert save and Cancel Buttons */
                    let btnSave = $('<span class="btn btn-default bg-info "><i class="flx-icon icon-save icon-margin" ></i> ' + flexygo.localization.translate('flxedit.save') + '</span>')
                        .on('click', (e) => {
                        let elem = $(e.currentTarget);
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
                        let obj = new flexygo.obj.Entity(objName, objWhere);
                        obj.read();
                        obj.data.Label.Value = elem.closest('.propertyMenu').find('[name=Label]').val();
                        obj.data.CSSClass.Value = elem.closest('.propertyMenu').find('[name=CSSClass]').val();
                        //obj.data.Style.Value = elem.closest('.propertyMenu').find('[name=Style]').val()
                        obj.data.IconName.Value = elem.closest('.propertyMenu').find('[name=IconName]').val();
                        //obj.data.TypeId.Value = elem.closest('.propertyMenu').find('[name=TypeId]').val()
                        obj.data.Locked.Value = elem.closest('.propertyMenu').find('[name=Locked]').val();
                        obj.data.IsRequired.Value = elem.closest('.propertyMenu').find('[name=IsRequired]').val();
                        obj.data.Hide.Value = elem.closest('.propertyMenu').find('[name=Hide]').val();
                        if (obj.update()) {
                            elem.closest('.propertyMenu').slideUp(250);
                            this.refresh();
                        }
                    });
                    let btnClose = $('<span class="btn btn-default"><i class="flx-icon icon-close icon-margin" ></i> ' + flexygo.localization.translate('flxedit.close') + '</span>')
                        .on('click', (e) => {
                        $(e.currentTarget).closest('.propertyMenu').slideUp(250);
                    });
                    btnGrp.append(btnSave);
                    btnGrp.append("&nbsp;");
                    btnGrp.append(btnClose);
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
                translate(str) {
                    return flexygo.localization.translate(str);
                }
            }
            wc.FlxPropertyManagerElement = FlxPropertyManagerElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-propertymanager', flexygo.ui.wc.FlxPropertyManagerElement);
//# sourceMappingURL=flx-propertymanager.js.map