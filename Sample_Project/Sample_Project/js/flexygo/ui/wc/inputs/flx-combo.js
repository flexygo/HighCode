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
            * Library for the FlxComboElement web component.
            *
            * @class FlxComboElement
            * @constructor
            * @return {FlxComboElement}
            */
            class FlxComboElement extends HTMLElement {
                constructor() {
                    super();
                    this.property = null;
                    this.value = null;
                    this.mode = 'object';
                    this.type = 'combo';
                    this.options = null;
                    /**
                   * Set when component is attached to DOM
                   * @property connected {boolean}
                   */
                    this.connected = false;
                    this.cnnString = null;
                    this.additionalWhere = null;
                }
                connectedCallback() {
                    let element = $(this);
                    let propName = element.attr('property');
                    if (propName && flexygo.utils.isBlank(this.options)) {
                        let parentCtl = element.closest('flx-edit,flx-list,flx-propertymanager,flx-view,flx-filter');
                        if (parentCtl && parentCtl.length > 0) {
                            let wcParent = parentCtl[0];
                            if (parentCtl.is('flx-filter')) {
                                let objName = element.attr('object');
                                this.options = jQuery.extend(true, {}, wcParent.properties[objName + '-' + propName]);
                            }
                            else {
                                this.options = jQuery.extend(true, {}, wcParent.properties[propName]);
                            }
                            if (wcParent && wcParent.mode) {
                                this.mode = wcParent.mode;
                            }
                        }
                        this.property = propName;
                    }
                    if (typeof element.attr('Required') !== 'undefined') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IsRequired = true;
                    }
                    if (typeof element.attr('Multiple') !== 'undefined') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Multiple = true;
                    }
                    let Separator = element.attr('Separator');
                    if (Separator && Separator !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Separator = Separator;
                    }
                    else {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Separator = ';';
                    }
                    if (typeof element.attr('Disabled') !== 'undefined') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Locked = true;
                    }
                    let RequiredMessage = element.attr('RequiredMessage');
                    if (RequiredMessage && RequiredMessage !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IsRequiredMessage = RequiredMessage;
                    }
                    let Style = element.attr('Style');
                    if (Style && Style !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Style = Style;
                        element.attr('Control-Style', this.options.Style);
                        element.attr('Style', '');
                    }
                    let Class = element.attr('Class');
                    if (Class && Class !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.CssClass = Class;
                        element.attr('Control-Class', this.options.CssClass);
                        element.attr('Class', '');
                    }
                    let IconClass = element.attr('IconClass');
                    if (IconClass && IconClass !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IconClass = IconClass;
                    }
                    let Options = element.find('option');
                    if (Options.length > 0) {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.HTMLDropDownValues = Options;
                        Options.remove();
                    }
                    let HelpId = element.attr('HelpId');
                    if (HelpId && HelpId !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.HelpId = HelpId;
                    }
                    let ctlClass = element.attr('Control-Class');
                    if (ctlClass && ctlClass !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.CssClass = ctlClass;
                    }
                    let ctlStyle = element.attr('Control-Style');
                    if (ctlStyle && ctlStyle !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Style = ctlStyle;
                    }
                    let Hide = element.attr('Hide');
                    if (Hide && Hide !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Hide = Hide == 'true';
                    }
                    let ObjectName = element.attr('ObjectName');
                    if (ObjectName && ObjectName !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.ObjectName = ObjectName;
                    }
                    let ViewName = element.attr('ViewName');
                    if (ViewName && ViewName !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.ViewName = ViewName;
                    }
                    let SQLValueField = element.attr('SQLValueField');
                    if (SQLValueField && SQLValueField !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.SQLValueField = SQLValueField;
                    }
                    let SQLDisplayField = element.attr('SQLDisplayField');
                    if (SQLDisplayField && SQLDisplayField !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.SQLDisplayField = SQLDisplayField;
                    }
                    let PageSize = element.attr('PageSize');
                    if (PageSize && PageSize !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.PageSize = Number(PageSize);
                    }
                    let cnnString = element.attr('CnnString');
                    if (cnnString && cnnString !== '') {
                        this.cnnString = cnnString;
                    }
                    let additionalWhere = element.attr('additionalwhere');
                    if (additionalWhere && additionalWhere !== '') {
                        this.additionalWhere = additionalWhere;
                    }
                    let ValidatorMessage = element.attr('ValidatorMessage');
                    if (ValidatorMessage && ValidatorMessage !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.ValidatorMessage = ValidatorMessage;
                    }
                    this.init();
                    let Value = element.attr('Value');
                    if (Value && Value !== '') {
                        this.setValue(Value);
                    }
                    this.connected = true;
                }
                static get observedAttributes() {
                    return ['property', 'required', 'disabled', 'multiple', 'separator', 'requiredmessage', 'style', 'class', 'iconclass', 'helpid', 'hide', 'objectname', 'viewname', 'sqlvaluefield', 'sqldisplayfield', 'pagesize', 'additionalwhere', 'validatormessage', 'cnnstring'];
                }
                attributeChangedCallback(attrName, oldVal, newVal) {
                    let element = $(this);
                    let isDirty = false;
                    if (!this.connected) {
                        return;
                    }
                    if (attrName.toLowerCase() === 'property' && newVal && newVal !== '') {
                        let propName = newVal;
                        let parentCtl = element.closest('flx-edit, flx-list,flx-propertymanager');
                        if (parentCtl && parentCtl.length > 0) {
                            let wcParent = parentCtl[0];
                            this.options = jQuery.extend(true, {}, wcParent.properties[propName]);
                        }
                        this.property = newVal;
                        isDirty = true;
                    }
                    if (attrName.toLowerCase() === 'required') {
                        if (typeof element.attr('required') !== 'undefined') {
                            if (!this.options) {
                                this.options = new flexygo.api.ObjectProperty();
                            }
                            this.options.IsRequired = true;
                        }
                        else {
                            this.options.IsRequired = false;
                        }
                        element.find('select').prop('required', this.options.IsRequired);
                    }
                    if (attrName.toLowerCase() === 'disabled') {
                        if (typeof element.attr('disabled') !== 'undefined') {
                            if (!this.options) {
                                this.options = new flexygo.api.ObjectProperty();
                            }
                            this.options.Locked = true;
                        }
                        else {
                            this.options.Locked = false;
                        }
                        element.find('select').prop('disabled', this.options.Locked);
                        isDirty = true;
                    }
                    if (attrName.toLowerCase() === 'multiple') {
                        if (typeof element.attr('multiple') !== 'undefined') {
                            if (!this.options) {
                                this.options = new flexygo.api.ObjectProperty();
                            }
                            this.options.Multiple = true;
                        }
                        isDirty = true;
                    }
                    if (attrName.toLowerCase() === 'separator' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Separator = newVal;
                        isDirty = true;
                    }
                    if (attrName.toLowerCase() === 'requiredmessage' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IsRequiredMessage = newVal;
                        isDirty = true;
                    }
                    if (attrName.toLowerCase() === 'style' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Style = newVal;
                        if (element.attr('Control-Style') !== this.options.Style) {
                            element.attr('Control-Style', this.options.Style);
                            element.attr('Style', '');
                            isDirty = true;
                        }
                    }
                    if (attrName.toLowerCase() === 'class' && element.attr('Control-Class') !== newVal && newVal != oldVal) {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.CssClass = newVal;
                        if (element.attr('Control-Class') !== this.options.CssClass) {
                            if (newVal != '') {
                                element.attr('Control-Class', this.options.CssClass);
                                element.attr('Class', this.options.CssClass);
                            }
                            //element.attr('Class', '');
                            isDirty = true;
                        }
                    }
                    if (attrName.toLowerCase() === 'iconclass' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IconClass = newVal;
                        isDirty = true;
                    }
                    if (attrName.toLowerCase() === 'helpid' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.HelpId = newVal;
                        isDirty = true;
                    }
                    if (attrName.toLowerCase() === 'hide' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Hide = (newVal == 'true') ? true : false;
                        isDirty = true;
                    }
                    if (attrName.toLowerCase() === 'objectname' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.ObjectName = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'viewname' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.ViewName = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'sqlvaluefield' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.SQLValueField = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'sqldisplayfield' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.SQLDisplayField = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'pagesize' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.PageSize = Number(newVal);
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'additionalwhere' && newVal) {
                        this.additionalWhere = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'cnnstring' && newVal) {
                        this.cnnString = newVal;
                        this.refresh();
                    }
                    if (isDirty) {
                        this.refresh();
                    }
                }
                refresh() {
                    let val = this.getValue();
                    let txt = this.getText();
                    this.init();
                    if (val && val !== "") {
                        this.setValue(val, txt);
                    }
                }
                init() {
                    let me = $(this);
                    if (me.attr('mode') && me.attr('mode').toLowerCase() === 'view') {
                        this.initViewMode();
                    }
                    else {
                        this.initEditMode();
                    }
                }
                initViewMode() {
                    let me = $(this);
                    let iconsLeft;
                    let iconsRight;
                    if (this.options && this.options.ObjNameLink && this.options.ObjWhereLink) {
                        let editCtl = me.closest('flx-view')[0];
                        iconsRight = $('<div class="input-group-btn" />');
                        let icon1 = $('<button class="btn btn-default" type="button"><i class="flx-icon icon-link" /></button>').on('click', (e) => {
                            if (this.options.ObjModeLink == 'Other') {
                                flexygo.nav.openPageName(this.options.PageNameLink, editCtl.parseEditString(this.options.ObjNameLink), editCtl.parseEditString(this.options.ObjWhereLink), null, this.options.TargetIdLink, true);
                            }
                            else {
                                flexygo.nav.openPage(this.options.ObjModeLink, editCtl.parseEditString(this.options.ObjNameLink), editCtl.parseEditString(this.options.ObjWhereLink), null, this.options.TargetIdLink);
                            }
                            //flexygo.nav.openPage('view', editCtl.parseEditString(this.options.ObjNameLink), editCtl.parseEditString(this.options.ObjWhereLink), null, this.options.TargetIdLink);
                        });
                        iconsRight.append(icon1);
                    }
                    let control = $('<div>');
                    me.html(control);
                    let input = $('<label class="form-control input-view" />');
                    if (this.options && this.options.IconClass && this.options.IconClass !== '') {
                        iconsLeft = $('<span class="input-group-addon" ><i class="' + this.options.IconClass + '" /></span>');
                        control.append(iconsLeft);
                    }
                    control.append(input);
                    if (iconsRight) {
                        control.append(iconsRight);
                    }
                    if (iconsLeft || iconsRight) {
                        control.addClass("input-group");
                    }
                    if (this.options && this.options.Style) {
                        me.children('div').attr('style', this.options.Style);
                    }
                    if (this.options && this.options.CssClass) {
                        me.children('div').addClass(this.options.CssClass);
                    }
                    if (this.options && this.options.Hide) {
                        me.addClass("hideControl");
                    }
                }
                initEditMode() {
                    let me = $(this);
                    if (this.options) {
                        let iconsLeft;
                        let iconsRight = this.getIconButtons();
                        let control = $('<div>');
                        let input = $('<select class="form-control" />');
                        input.on('blur', () => { me.trigger('blur'); });
                        if (this.options.IconClass && this.options.IconClass !== '') {
                            iconsLeft = $('<span class="input-group-addon" ><i class="' + this.options.IconClass + '" /></span>');
                        }
                        if (iconsLeft) {
                            control.append(iconsLeft);
                        }
                        control.append(input);
                        if (iconsRight) {
                            control.append(iconsRight);
                        }
                        if (iconsLeft || iconsRight) {
                            control.addClass("input-group");
                        }
                        me.html(control);
                        this.setOptions();
                    }
                }
                getIconButtons() {
                    let me = $(this);
                    let ret = $('<div class="input-group-btn" />');
                    let editCtl = me.closest('flx-edit, flx-list')[0];
                    let icon1;
                    if (this.options && (this.options.SearchCollection || this.options.SearchFunction) && !this.options.Locked) {
                        icon1 = $('<button class="btn btn-default" type="button"><i class="flx-icon icon-search" /></button>').on('click', (e) => {
                            if (this.options.SearchFunction) {
                                flexygo.utils.execDynamicCode.call(this, editCtl.parseEditString(this.options.SearchFunction, editCtl, this));
                            }
                            if (this.options.SearchCollection && this.options.SearchCollection !== '') {
                                flexygo.events.on(this, "entity", "selected", (e) => {
                                    flexygo.events.off(this, "entity", "selected");
                                    let entity = e.sender;
                                    let config = entity.getConfig();
                                    let value = entity.data[config.KeyFields[0]].Value;
                                    if (this.options.SearchReturnFields && this.options.SearchReturnFields !== '') {
                                        value = entity.data[this.options.SearchReturnFields].Value;
                                    }
                                    this.setValue(value);
                                    this.triggerDependencies();
                                    let params = {
                                        Mode: this.mode,
                                        ObjectName: this.options.ProcessName || this.options.ReportName || this.options.ObjectName,
                                        PropertyName: this.options.Name,
                                        CryptedSql: this.options.SQLSentence,
                                        CryptedFilter: this.options.SQLFilter,
                                        Value: value,
                                        Page: 0,
                                        AdditionalWhere: null,
                                        SQLValueField: this.options.SQLValueField
                                    };
                                    let method = 'GetComboText';
                                    let input = me.find('select');
                                    $(document).find('flx-search[objectname="' + this.options.SearchCollection + '"]').closest(".ui-dialog").remove();
                                    flexygo.ajax.syncPost('~/api/Edit', method, params, (response) => {
                                        if (response) {
                                            let data = response;
                                            for (let i = 0; i < data.length; i++) {
                                                let value = data[i][this.options.SQLValueField];
                                                let text = data[i][this.options.SQLDisplayField];
                                                if (typeof text === 'undefined' || text === null) {
                                                    text = value;
                                                }
                                                if (typeof value === 'undefined' || value === null) {
                                                    value = text;
                                                }
                                                input.append($('<option/>').text(text).val(value));
                                                this.setValue(value, text);
                                                this.triggerDependencies();
                                            }
                                        }
                                    });
                                });
                                flexygo.nav.openPage('search', editCtl.parseEditString(this.options.SearchCollection, editCtl, this), editCtl.parseEditString(this.options.SearchWhere, editCtl, this), null, 'modal');
                            }
                        });
                        ret.append(icon1);
                    }
                    if (this.options && this.options.ObjNameLink && this.options.ObjWhereLink) {
                        icon1 = $('<button class="btn btn-default" type="button"><i class="flx-icon icon-link" /></button>').on('click', (e) => {
                            if (this.options.ObjModeLink == 'Other') {
                                flexygo.nav.openPageName(this.options.PageNameLink, editCtl.parseEditString(this.options.ObjNameLink, editCtl, this), editCtl.parseEditString(this.options.ObjWhereLink, editCtl, this), null, this.options.TargetIdLink, true);
                            }
                            else {
                                flexygo.nav.openPage(this.options.ObjModeLink, editCtl.parseEditString(this.options.ObjNameLink, editCtl, this), editCtl.parseEditString(this.options.ObjWhereLink, editCtl, this), null, this.options.TargetIdLink);
                            }
                            //flexygo.nav.openPage('view', editCtl.parseEditString(this.options.ObjNameLink, editCtl, this), editCtl.parseEditString(this.options.ObjWhereLink, editCtl, this), null, this.options.TargetIdLink);
                        });
                        ret.append(icon1);
                    }
                    if (this.options && (this.options.AllowNewFunction || this.options.AllowNewObject) && !this.options.Locked) {
                        icon1 = $('<button class="btn btn-default" type="button"><i class="fa fa-plus " /></button>').on('click', (e) => {
                            if (this.options.AllowNewFunction) {
                                flexygo.utils.execDynamicCode.call(this, editCtl.parseEditString(this.options.AllowNewFunction, editCtl, this));
                            }
                            else if (this.options.AllowNewObject && this.options.AllowNewObject !== '') {
                                flexygo.events.on(this, "entity", "inserted", (e) => {
                                    if (this.options.AllowNewObject === e.masterIdentity) {
                                        flexygo.events.off(this, "entity", "inserted");
                                        let entity = e.sender;
                                        let value;
                                        if (this.options.AllowNewReturnFields && this.options.AllowNewReturnFields != '') {
                                            value = entity.data[this.options.AllowNewReturnFields].Value;
                                        }
                                        else {
                                            let config = e.sender.getConfig();
                                            value = entity.data[config.KeyFields[0]].Value;
                                        }
                                        let params = {
                                            "Mode": this.mode,
                                            "ObjectName": this.options.ProcessName || this.options.ReportName || this.options.ObjectName,
                                            "PropertyName": this.options.Name,
                                            "CryptedSql": this.options.SQLSentence,
                                            "CryptedFilter": this.options.SQLFilter,
                                            "Value": value,
                                            "Page": 0,
                                            "AdditionalWhere": null,
                                            "SQLValueField": this.options.SQLValueField
                                        };
                                        let method = 'GetComboText';
                                        let input = me.find('select');
                                        $(document).find('flx-edit[objectname="' + this.options.AllowNewObject + '"]').closest(".ui-dialog").remove();
                                        flexygo.ajax.syncPost('~/api/Edit', method, params, (response) => {
                                            if (response) {
                                                let data = response;
                                                for (let i = 0; i < data.length; i++) {
                                                    let value = data[i][this.options.SQLValueField];
                                                    let text = data[i][this.options.SQLDisplayField];
                                                    if (typeof text === 'undefined' || text === null) {
                                                        text = value;
                                                    }
                                                    if (typeof value === 'undefined' || value === null) {
                                                        value = text;
                                                    }
                                                    input.append($('<option/>').text(text).val(value));
                                                    this.setValue(value, text);
                                                    this.triggerDependencies();
                                                }
                                            }
                                        });
                                    }
                                });
                                flexygo.nav.openPage('edit', editCtl.parseEditString(this.options.AllowNewObject, editCtl, this), null, editCtl.parseEditString(this.options.AllowNewDefaults, editCtl, this), 'modal');
                            }
                        });
                        ret.append(icon1);
                    }
                    //if (this.options && this.options.HelpId) {
                    //    icon1 = $('<button class="btn btn-default" type="button"><i class="flx-icon icon-help-2" /></button>').on('click', (e) => {
                    //        flexygo.nav.openHelpId(this.options.HelpId);
                    //    });
                    //    ret.append(icon1);
                    //}
                    if (ret.html() === '') {
                        return null;
                    }
                    else {
                        return ret;
                    }
                }
                setOptions() {
                    let me = $(this);
                    let input = me.find('select');
                    let text, value;
                    if (this.options && this.options.Multiple && this.options.Multiple == true) {
                        input.prop('multiple', true);
                    }
                    if (me.attr('tab') && me.attr('tab') !== '') {
                        input.attr('tabindex', me.attr('tab'));
                    }
                    if (this.options && this.options.DropDownValues) {
                        input.append('<option/>');
                        for (let i = 0; i < this.options.DropDownValues.length; i++) {
                            value = this.options.DropDownValues[i][this.options.SQLValueField];
                            text = this.options.DropDownValues[i][this.options.SQLDisplayField];
                            if (typeof text === 'undefined' || text === null) {
                                text = value;
                            }
                            if (typeof value === 'undefined' || value === null) {
                                value = text;
                            }
                            input.append($('<option/>').text(text).val(value));
                        }
                    }
                    else if (this.options.HTMLDropDownValues) {
                        for (let j = 0; j < this.options.HTMLDropDownValues.length; j++) {
                            value = $(this.options.HTMLDropDownValues[j]).val();
                            text = $(this.options.HTMLDropDownValues[j]).text();
                            if (typeof text === 'undefined' || text === null) {
                                text = value;
                            }
                            if (typeof value === 'undefined' || value === null) {
                                value = text;
                            }
                            input.append($('<option/>').text(text).val(value));
                        }
                    }
                    else if (this.options.ViewName && this.options.ViewName !== '') {
                        let params;
                        let method = null;
                        params = {
                            ObjectName: this.options.ObjectName,
                            ViewName: this.options.ViewName,
                            DisplayField: this.options.SQLDisplayField,
                            Value: this.getValue(),
                            Page: 0,
                            PageSize: this.options.PageSize,
                            AdditionalWhere: this.additionalWhere,
                            SQLFilter: null,
                            CnnString: this.cnnString
                        };
                        method = 'GetComboDataView';
                        flexygo.ajax.syncPost('~/api/Edit', method, params, (response) => {
                            if (response) {
                                input.append($('<option/>').text(null).val(null));
                                for (let i = 0; i < response.length; i++) {
                                    let elm;
                                    value = response[i][this.options.SQLValueField];
                                    text = response[i][this.options.SQLDisplayField];
                                    if (typeof text === 'undefined' || text === null) {
                                        text = value;
                                    }
                                    if (typeof value === 'undefined' || value === null) {
                                        value = text;
                                    }
                                    input.append($('<option/>').text(text).val(value));
                                }
                            }
                        });
                    }
                    if (this.options && this.options.Name && this.options.Name !== '') {
                        input.attr('name', this.options.Name);
                    }
                    else {
                        input.attr('name', flexygo.utils.uniqueName());
                    }
                    if (this.options && this.options.Locked) {
                        input.prop('disabled', this.options.Locked);
                    }
                    if (this.options.Style) {
                        me.children('div').attr('style', this.options.Style);
                    }
                    if (this.options.CssClass) {
                        me.children('div').addClass(this.options.CssClass);
                    }
                    if (this.options && this.options.IsRequired) {
                        input.prop('required', this.options.IsRequired);
                    }
                    if (this.options && this.options.IsRequiredMessage) {
                        input.attr('data-msg-required', this.options.IsRequiredMessage);
                    }
                    if (this.options && this.options.ValidatorMessage && this.options.ValidatorMessage !== '') {
                        input.attr('data-msg-sqlvalidator', this.options.ValidatorMessage);
                    }
                    const module = me.closest('flx-module')[0];
                    if ((this.options && (this.options.CauseRefresh || this.options.SQLValidator)) || (module && module.moduleConfig && module.moduleConfig.PropsEventDependant && module.moduleConfig.PropsEventDependant.includes(this.property))) {
                        input.on('change', () => {
                            //$(document).trigger('refreshProperty', [input.closest('flx-edit'), this.options.Name]);
                            let ev = {
                                class: "property",
                                type: "changed",
                                sender: this,
                                masterIdentity: this.property
                            };
                            flexygo.events.trigger(ev);
                        });
                    }
                    if (this.options && this.options.Hide) {
                        me.addClass("hideControl");
                    }
                    if (this.options && this.options.Multiple) {
                        input.find('option').off('mousedown').on('mousedown', (e) => {
                            let $self = $(e.currentTarget);
                            $self.closest('select').focus();
                            if ($self.prop("selected"))
                                $self.prop("selected", false);
                            else
                                $self.prop("selected", true);
                            return false;
                        });
                    }
                    input.on('change.combo', (e) => {
                        me.attr('Value', $(e.currentTarget).val());
                    });
                }
                changeSQLData(newSQL, newOptions) {
                    let me = $(this);
                    let input = me.find('select');
                    this.options.DropDownValues = newOptions;
                    if (this.options && this.options.DropDownValues) {
                        let value = this.getValue();
                        input.empty();
                        input.append('<option/>');
                        for (let i = 0; i < this.options.DropDownValues.length; i++) {
                            let value = this.options.DropDownValues[i][this.options.SQLValueField];
                            let text = this.options.DropDownValues[i][this.options.SQLDisplayField];
                            if (typeof text === 'undefined' || text === null) {
                                text = value;
                            }
                            if (typeof value === 'undefined' || value === null) {
                                value = text;
                            }
                            input.append($('<option/>').text(text).val(value));
                        }
                        this.setValue(value);
                    }
                    else {
                        input.empty();
                    }
                    if (this.options && this.options.Multiple) {
                        input.find('option').off('mousedown').on('mousedown', (e) => {
                            let $self = $(e.currentTarget);
                            $self.closest('select').focus();
                            if ($self.prop("selected"))
                                $self.prop("selected", false);
                            else
                                $self.prop("selected", true);
                            return false;
                        });
                    }
                }
                setValue(value, text) {
                    let me = $(this);
                    if (me.attr('mode') && me.attr('mode').toLowerCase() === 'view') {
                        this.setValueView(value);
                        me.attr('value', value);
                    }
                    else {
                        let input = me.find('select');
                        if (value === null) {
                            input.find('option').prop('selected', false);
                        }
                        if (this.options && this.options.Multiple) {
                            let opt = value.split(this.options.Separator);
                            for (let i = 0; i < opt.length; i++) {
                                if (input.find('option[value="' + opt[i] + '"]').length === 0) {
                                    input.append($('<option/>').text(opt[i]).val(opt[i]));
                                }
                            }
                            input.val(opt);
                        }
                        else {
                            if (value != null && input.find('option[value="' + value + '"]').length === 0) {
                                input.append($('<option/>').text(text).val(value));
                            }
                            input.val(value);
                            me.attr('Value', value);
                        }
                        if (this.options && this.options.Multiple) {
                            input.find('option').off('mousedown').on('mousedown', (e) => {
                                let $self = $(e.currentTarget);
                                $self.closest('select').focus();
                                if ($self.prop("selected"))
                                    $self.prop("selected", false);
                                else
                                    $self.prop("selected", true);
                                return false;
                            });
                        }
                    }
                }
                setValueView(value) {
                    this.value = value;
                    $(this).find('label').text(value);
                }
                getValue() {
                    let me = $(this);
                    if (me.attr('mode') && me.attr('mode').toLowerCase() === 'view') {
                        return this.value;
                    }
                    let input = me.find('select');
                    if (input.val() === '') {
                        return null;
                    }
                    if (this.options && this.options.Multiple) {
                        return input.val().join(this.options.Separator);
                    }
                    else {
                        return input.val();
                    }
                }
                getText() {
                    return $(this).find('select option:selected').text();
                }
                /**
                * Trigger Dependencies.
                * @method triggerDependencies
                */
                triggerDependencies() {
                    let me;
                    let input;
                    me = $(this);
                    input = me.find('select');
                    input.trigger('change');
                }
            }
            wc.FlxComboElement = FlxComboElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-combo', flexygo.ui.wc.FlxComboElement);
//# sourceMappingURL=flx-combo.js.map