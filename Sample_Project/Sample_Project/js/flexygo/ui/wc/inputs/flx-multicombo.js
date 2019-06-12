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
            * Library for the FlxMultiComboElement web component.
            *
            * @class FlxMultiComboElement
            * @constructor
            * @return {FlxMultiComboElement}
            */
            class FlxMultiComboElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                    * Set when component is attached to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                    this.type = 'multicombo';
                    this.options = null;
                    this.mode = 'object';
                    this.property = null;
                    this.mobileInput = null;
                    this.additionalWhere = null;
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = $(this);
                    this.connected = true;
                    let propName = element.attr('property');
                    if (propName && flexygo.utils.isBlank(this.options)) {
                        let parentCtl = element.closest('flx-edit, flx-filter,flx-propertymanager');
                        if (parentCtl && parentCtl.length > 0) {
                            let wcParent = parentCtl[0];
                            if (parentCtl.is('flx-filter')) {
                                let objName = element.attr('object');
                                this.options = jQuery.extend(true, {}, wcParent.properties[objName + '-' + propName]);
                            }
                            else {
                                this.options = jQuery.extend(true, {}, wcParent.properties[propName]);
                            }
                            if (parentCtl && wcParent.mode) {
                                this.mode = wcParent.mode;
                            }
                        }
                        this.property = propName;
                    }
                    let ObjectName = element.attr('ObjectName');
                    if (ObjectName && ObjectName != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.ObjectName = ObjectName;
                    }
                    let ViewName = element.attr('ViewName');
                    if (ViewName && ViewName != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.ViewName = ViewName;
                    }
                    let SQLValueField = element.attr('SQLValueField');
                    if (SQLValueField && SQLValueField != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.SQLValueField = SQLValueField;
                    }
                    let SQLDisplayField = element.attr('SQLDisplayField');
                    if (SQLDisplayField && SQLDisplayField != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.SQLDisplayField = SQLDisplayField;
                    }
                    if (typeof element.attr('Required') != 'undefined') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IsRequired = true;
                    }
                    if (typeof element.attr('Disabled') != 'undefined') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Locked = true;
                    }
                    let RequiredMessage = element.attr('RequiredMessage');
                    if (RequiredMessage && RequiredMessage != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IsRequiredMessage = RequiredMessage;
                    }
                    let Style = element.attr('Style');
                    if (Style && Style != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Style = Style;
                        element.attr('Control-Style', this.options.Style);
                        element.attr('Style', '');
                    }
                    let Class = element.attr('Class');
                    if (Class && Class != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.CssClass = Class;
                        element.attr('Control-Class', this.options.CssClass);
                        element.attr('Class', '');
                    }
                    let PlaceHolder = element.attr('PlaceHolder');
                    if (PlaceHolder && PlaceHolder != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.PlaceHolder = PlaceHolder;
                    }
                    let IconClass = element.attr('IconClass');
                    if (IconClass && IconClass != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IconClass = IconClass;
                    }
                    let Template = element.find('Template');
                    if (Template.length > 0 && Template.html() != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Template = Template.html();
                        Template.remove();
                    }
                    let HelpId = element.attr('HelpId');
                    if (HelpId && HelpId != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.HelpId = HelpId;
                    }
                    let ctlClass = element.attr('Control-Class');
                    if (ctlClass && ctlClass != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.CssClass = ctlClass;
                    }
                    let ctlStyle = element.attr('Control-Style');
                    if (ctlStyle && ctlStyle != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Style = ctlStyle;
                    }
                    let additionalWhere = element.attr('additionalwhere');
                    if (additionalWhere && additionalWhere !== '') {
                        this.additionalWhere = additionalWhere;
                    }
                    let SQLFilter = element.attr('SQLFilter');
                    if (SQLFilter && SQLFilter !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.SQLFilter = SQLFilter;
                    }
                    let PageSize = element.attr('PageSize');
                    if (PageSize && PageSize !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.PageSize = Number(PageSize);
                    }
                    this.init();
                    let Value = element.attr('Value');
                    let Text = element.attr('Text');
                    if (Value && Value != '') {
                        //this.setValue(Value,Text);
                        this.setValue(Value, Text);
                    }
                }
                disconnectedCallback() {
                    let element = $(this);
                    element.empty();
                    if (this.options && this.options.Template) {
                        element.html('<template/>');
                        element.find('template').html(this.options.Template);
                    }
                }
                /**
              * Array of observed attributes.
              * @property observedAttributes {Array}
              */
                static get observedAttributes() {
                    return ['type', 'property', 'objectname', 'viewname', 'sqlvaluefield', 'sqldisplayfield', 'required', 'disabled', 'requiredmessage', 'style', 'class', 'placeholder', 'iconclass', 'template', 'helpid', 'additionalwhere', 'sqlfilter', 'pagesize'];
                }
                /**
                * Fires when the attribute value of the element is changed.
                * @method attributeChangedCallback
                */
                attributeChangedCallback(attrName, oldVal, newVal) {
                    let element = $(this);
                    if (!this.connected) {
                        return;
                    }
                    if (attrName.toLowerCase() == 'type' && newVal && newVal != '') {
                        this.type = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() == 'property' && newVal && newVal != '') {
                        let propName = newVal;
                        let parentCtl = element.closest('flx-edit, flx-filter,flx-propertymanager');
                        if (parentCtl && parentCtl.length > 0) {
                            let wcParent = parentCtl[0];
                            if (parentCtl.is('flx-filter')) {
                                let objName = element.attr('object');
                                this.options = jQuery.extend(true, {}, wcParent.properties[objName + '-' + propName]);
                            }
                            else {
                                this.options = jQuery.extend(true, {}, wcParent.properties[propName]);
                            }
                        }
                        this.property = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() == 'objectname' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.ObjectName = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() == 'viewname' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.ViewName = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() == 'sqlvaluefield' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.SQLValueField = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() == 'sqldisplayfield' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.SQLDisplayField = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() == 'required') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        if (typeof element.attr('required') != 'undefined') {
                            this.options.IsRequired = true;
                        }
                        else {
                            this.options.IsRequired = false;
                        }
                        element.find('div:not(.bootstrap-tagsinput)>input').prop('required', this.options.IsRequired);
                    }
                    if (attrName.toLowerCase() == 'disabled') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        if (typeof element.attr('disabled') != 'undefined') {
                            this.options.Locked = true;
                        }
                        else {
                            this.options.Locked = false;
                        }
                        element.find('input').prop('disabled', this.options.Locked);
                    }
                    if (attrName.toLowerCase() == 'requiredmessage' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IsRequiredMessage = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() == 'style' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Style = newVal;
                        if (element.attr('Control-Style') !== this.options.Style) {
                            element.attr('Control-Style', this.options.Style);
                            element.attr('Style', '');
                            this.refresh();
                        }
                    }
                    if (attrName.toLowerCase() == 'class' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.CssClass = newVal;
                        if (element.attr('Control-Class') !== this.options.CssClass) {
                            element.attr('Control-Class', this.options.CssClass);
                            element.attr('Class', '');
                            this.refresh();
                        }
                    }
                    if (attrName.toLowerCase() == 'placeholder' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.PlaceHolder = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() == 'iconclass' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IconClass = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() == 'template' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Template = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() == 'helpid' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.HelpId = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'additionalwhere' && newVal) {
                        this.additionalWhere = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'sqlfilter' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.SQLFilter = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'pagesize' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.PageSize = newVal;
                        this.refresh();
                    }
                }
                refresh() {
                    let val = this.getValue();
                    let txt = $(this).attr('Text');
                    this.init();
                    if (val && val != "") {
                        this.setValue(val, txt);
                    }
                }
                init() {
                    if (this.options) {
                        let me = $(this);
                        let iconsLeft;
                        let iconsRight = this.getIconButtons();
                        let control = $('<div class="input-group" style="width:100%">');
                        let container = $('<input firstControl type="text" class="form-control" style="width: 100%" readonly />');
                        let inputli = $('<li class="search"></li>');
                        let input = $('<input type="search" class="search form-control" autocomplete="off" />');
                        let datalist = $('<ul style="display:none" class="comboOptions" />');
                        if (flexygo.utils.isAgentMobile()) {
                            datalist.addClass('mobile');
                            let mobileInputDiv = $('<div class="mobileinputdiv input-group"/>').appendTo(datalist);
                            this.mobileInput = $('<input type="text" class="form-control mobileinput" style="width: 100%" readonly />').appendTo(mobileInputDiv);
                            this.mobileInput.tagsinput({ freeInput: false, itemValue: 'value', itemText: 'text', separator: '|' });
                            $(`<label class="closed input-group-btn">
                         <label class="btn">
                           <i class="flx-icon icon-close-1" />
                         </label>
                        </label>`).appendTo(mobileInputDiv);
                        }
                        this.input = input;
                        this.datalist = datalist;
                        this.container = container;
                        input.on('focus', (e) => {
                            this.showOptions();
                        });
                        if (!this.mobileInput) {
                            input.on('blur', (e) => {
                                this.hideOptions();
                            });
                        }
                        else {
                            this.datalist.find('label.closed').on('click', (e) => {
                                this.hideOptions();
                            });
                        }
                        $('#mainContent, main.pageContainer').on('scroll.multicombo', (e) => {
                            if (!navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                                this.hideOptions();
                            }
                        });
                        input.on('keyup search', (e) => {
                            this.showOptions();
                            this.datalist.find('li:not(.search)').remove();
                            this.loadValues(0);
                        });
                        inputli.append(input);
                        this.datalist.append(inputli);
                        if (this.options.IconClass && this.options.IconClass != '') {
                            iconsLeft = $('<span class="input-group-addon" ><i class="' + this.options.IconClass + '" /></span>');
                        }
                        if (iconsLeft || iconsRight) {
                            control.addClass("input-group");
                        }
                        if (iconsLeft) {
                            control.append(iconsLeft);
                        }
                        control.append(container);
                        if (iconsRight) {
                            control.append(iconsRight);
                        }
                        control.append(datalist);
                        me.html(control);
                        me.append(datalist);
                        this.setOptions();
                        //this.loadValues(0);
                        if (this.options && this.options.DropDownValues && this.options && this.options.DropDownValues.length > 0) {
                            this.addComboItems(this.options.DropDownValues);
                        }
                        else {
                            this.loadValues(0);
                        }
                        this.container.tagsinput({ freeInput: false, itemValue: 'value', itemText: 'text', separator: '|' });
                        if (this.mobileInput) {
                            this.container.on('itemAdded', (event) => {
                                if (event.item) {
                                    this.mobileInput.tagsinput('add', { "value": event.item.value, "text": event.item.text });
                                }
                            });
                            this.container.on('itemRemoved', (event) => {
                                if (event.item) {
                                    this.mobileInput.tagsinput('remove', { "value": event.item.value, "text": event.item.text });
                                }
                            });
                            this.mobileInput.on('itemRemoved', (event) => {
                                if (event.item) {
                                    this.container.tagsinput('remove', { "value": event.item.value, "text": event.item.text });
                                }
                            });
                        }
                        me.find('.bootstrap-tagsinput').first().on('click', (e) => {
                            this.showOptions();
                            this.input.focus();
                        });
                    }
                }
                showOptions() {
                    let me = $(this);
                    if (!this.datalist.is(':visible') && !this.input.prop('disabled')) {
                        if (!this.mobileInput) {
                            let ubicElement = me.find('.bootstrap-tagsinput');
                            let winHeight = $(window).height();
                            if ((ubicElement.offset().top + this.datalist.outerHeight()) > winHeight) {
                                this.datalist.css({ position: "fixed", top: "auto", bottom: (winHeight - ubicElement.offset().top + $(window).scrollTop() - 10) });
                            }
                            else {
                                this.datalist.css({ position: "fixed", bottom: "auto", top: (ubicElement.offset().top + ubicElement.outerHeight() - $(window).scrollTop()) });
                            }
                            this.datalist.slideDown(250);
                        }
                        else {
                            this.datalist.css({ position: 'fixed', top: 3, left: 5, width: "calc(100% - 10px)", 'max-height': window.innerHeight - 5, 'padding-top': 30 });
                            me.append('<div class="mobilebackground"/>');
                            this.datalist.fadeIn(250);
                        }
                    }
                }
                hideOptions() {
                    if (this.datalist.is(':visible')) {
                        if (!this.mobileInput) {
                            this.datalist.slideUp(250);
                            //this.datalist.css({ position: "static" });
                        }
                        else {
                            this.datalist.fadeOut(250);
                            $(this).find('div.mobilebackground').remove();
                        }
                    }
                }
                loadValues(page, fromvalue, value) {
                    let params;
                    let method;
                    this.page = page;
                    if (this.options.ViewName && this.options.ViewName != '') {
                        params = {
                            "ObjectName": this.options.ObjectName,
                            "ViewName": this.options.ViewName,
                            "DisplayField": this.options.SQLDisplayField,
                            "Value": this.input.val(),
                            "Page": page,
                            "PageSize": this.options.PageSize,
                            "AdditionalWhere": this.additionalWhere,
                            "SQLFilter": this.options.SQLFilter,
                            "CnnString": null
                        };
                        method = 'getComboDataView';
                    }
                    else if (this.options.SQLEditSentence || this.options.SQLSentence) {
                        if (fromvalue === true) {
                            params = {
                                Mode: this.mode,
                                ObjectName: this.options.ProcessName || this.options.ReportName || this.options.ObjectName,
                                PropertyName: this.options.Name,
                                CryptedSql: this.options.SQLEditSentence || this.options.SQLSentence,
                                CryptedFilter: this.options.SQLFilter,
                                Value: value,
                                Page: page,
                                //"PageSize": this.options.PageSize,                   
                                AdditionalWhere: this.additionalWhere
                            };
                            method = 'getComboText';
                        }
                        else {
                            params = {
                                "Mode": this.mode,
                                "ObjectName": this.options.ProcessName || this.options.ReportName || this.options.ObjectName,
                                "PropertyName": this.options.Name,
                                "CryptedSql": this.options.SQLSentence,
                                "CryptedFilter": this.options.SQLFilter,
                                "Value": this.input.val(),
                                "Page": page,
                                "PageSize": this.options.PageSize,
                                "AdditionalWhere": this.additionalWhere
                            };
                            method = 'getComboData';
                        }
                    }
                    flexygo.ajax.syncPost('~/api/Edit', method, params, (response) => {
                        if (response) {
                            this.addComboItems(response);
                        }
                    });
                }
                addComboItems(data) {
                    if (data) {
                        for (let i = 0; i < data.length; i++) {
                            let elm;
                            if (this.options.Template && this.options.Template !== '') {
                                elm = this.getListItem(data[i][this.options.SQLValueField], data[i][this.options.SQLDisplayField], flexygo.utils.parser.compile(data[i], this.options.Template, this));
                            }
                            else {
                                elm = this.getListItem(data[i][this.options.SQLValueField], data[i][this.options.SQLDisplayField], data[i][this.options.SQLDisplayField]);
                            }
                            if (this.datalist.find('[data-value="' + elm.attr("data-value") + '"]').length == 0 && this.datalist.find('[data-text="' + elm.attr("data-text") + '"]').length == 0) {
                                this.datalist.append(elm);
                            }
                        }
                    }
                }
                getListItem(value, text, template) {
                    let me = $(this);
                    if (!text && text != '0') {
                        text = value;
                    }
                    if (!template) {
                        template = text;
                    }
                    return $('<li/>').html(template).attr('data-value', value).attr('data-text', text).on('mousedown', (e) => {
                        this.addValue($(e.currentTarget).attr('data-value'), $(e.currentTarget).attr('data-text'));
                        if (!this.mobileInput) {
                            let ubicElement = me.find('.bootstrap-tagsinput');
                            let winHeight = $(window).height();
                            if ((ubicElement.offset().top + this.datalist.outerHeight()) > winHeight) {
                                this.datalist.css({ position: "fixed", top: "auto", bottom: (winHeight - ubicElement.offset().top + $(window).scrollTop() - 10) });
                            }
                            else {
                                this.datalist.css({ position: "fixed", bottom: "auto", top: (ubicElement.offset().top + ubicElement.outerHeight() - $(window).scrollTop()) });
                            }
                        }
                        e.stopPropagation();
                        e.preventDefault();
                        return false;
                    });
                }
                addValue(value, text) {
                    let me = $(this);
                    if (typeof text == 'undefined' || typeof text == null) {
                        text = value;
                    }
                    this.container.tagsinput('add', { "value": value, "text": text });
                    me.find('.bootstrap-tagsinput input').hide();
                }
                getIconButtons() {
                    let me = $(this);
                    let ret = $('<div class="input-group-btn" />');
                    let editCtl = me.closest('flx-edit, flx-list, flx-filter')[0];
                    if (this.options && (this.options.SearchCollection || this.options.SearchFunction)) {
                        let icon1 = $('<button class="btn btn-default" type="button"><i class="flx-icon icon-search" /></button>').on('click', (e) => {
                            if (this.options.SearchFunction) {
                                flexygo.utils.execDynamicCode.call(this, editCtl.parseEditString(this.options.SearchFunction));
                            }
                            if (this.options.SearchCollection && this.options.SearchCollection != '') {
                                flexygo.events.on(this, "entity", "selected", (e) => {
                                    flexygo.events.off(this, "entity", "selected");
                                    let entity = e.sender;
                                    let config = entity.getConfig();
                                    let value = ((flexygo.utils.isBlank(this.options.SearchReturnFields)) ? entity.data[config.KeyFields[0]].Value : entity.data[this.options.SearchReturnFields].Value).toString();
                                    this.loadValues(0, true, value);
                                    this.setValue(value);
                                    this.triggerDependencies();
                                    $(document).find('flx-search[objectname="' + this.options.SearchCollection + '"]').closest(".ui-dialog").remove();
                                });
                                flexygo.nav.openPage('search', editCtl.parseEditString(this.options.SearchCollection), editCtl.parseEditString(this.options.SearchWhere), null, 'modal');
                            }
                        });
                        ret.append(icon1);
                    }
                    if (this.options && this.options.ObjNameLink && this.options.ObjWhereLink) {
                        let icon1 = $('<button class="btn btn-default" type="button"><i class="flx-icon icon-link" /></button>').on('click', (e) => {
                            flexygo.nav.openPage('view', editCtl.parseEditString(this.options.ObjNameLink), editCtl.parseEditString(this.options.ObjWhereLink), null, this.options.TargetIdLink);
                        });
                        ret.append(icon1);
                    }
                    if (this.options && (this.options.AllowNewFunction || this.options.AllowNewObject) && !this.options.Locked) {
                        let icon1 = $('<button class="btn btn-default" type="button"><i class="fa fa-plus" /></button>').on('click', (e) => {
                            if (this.options.AllowNewFunction) {
                                flexygo.utils.execDynamicCode.call(this, editCtl.parseEditString(this.options.AllowNewFunction));
                            }
                            else if (this.options.AllowNewObject && this.options.AllowNewObject != '') {
                                flexygo.nav.openPage('edit', editCtl.parseEditString(this.options.AllowNewObject), null, null, 'modal');
                            }
                        });
                        ret.append(icon1);
                    }
                    //if (this.options && this.options.HelpId) {
                    //    let icon1 = $('<button class="btn btn-default" type="button"><i class="flx-icon icon-help-2" /></button>').on('click', (e: JQueryEventObject) => {
                    //        flexygo.nav.openHelpId(this.options.HelpId);
                    //    });
                    //    ret.append(icon1);
                    //}
                    if (ret.html() == '') {
                        return null;
                    }
                    else {
                        return ret;
                    }
                }
                setOptions() {
                    let me = $(this);
                    if (this.options && this.options.Name && this.options.Name != '') {
                        this.input.attr('name', this.options.Name);
                    }
                    else {
                        this.input.attr('name', flexygo.utils.uniqueName());
                    }
                    if (this.options && this.options.Locked) {
                        $(this).find('input').prop('disabled', this.options.Locked);
                    }
                    if (me.attr('tab') && me.attr('tab') != '') {
                        this.input.attr('tabindex', me.attr('tab'));
                    }
                    if (this.options.PlaceHolder) {
                        this.container.attr('PlaceHolder', this.options.PlaceHolder);
                    }
                    if (this.options.Style) {
                        me.children('div').attr('style', this.options.Style);
                    }
                    if (this.options.CssClass) {
                        me.children('div').addClass(this.options.CssClass);
                    }
                    if (this.options && this.options.IsRequired) {
                        $(this).find('div:not(.bootstrap-tagsinput)>input').prop('required', this.options.IsRequired);
                    }
                    if (this.options && this.options.IsRequiredMessage) {
                        this.input.attr('data-msg-required', this.options.IsRequiredMessage);
                    }
                    if (this.options && this.options.CauseRefresh) {
                        this.input.on('change', () => {
                            //$(document).trigger('refreshProperty', [this.input.closest('flx-edit'), this.options.Name]);
                            let ev = {
                                class: "property",
                                type: "changed",
                                sender: this,
                                masterIdentity: this.property
                            };
                            flexygo.events.trigger(ev);
                        });
                    }
                    me.children('ul').css('min-width', (me.children('div').width()).toFixed() + 'px');
                }
                changeSQLData(newSQL, newOptions) {
                    if (newSQL && newSQL != '') {
                        this.options.SQLSentence = newSQL;
                    }
                    this.datalist.find('li:not(.search)').remove();
                    this.loadValues(0);
                }
                setValue(value, text) {
                    if (value == null || value == '') {
                        this.container.tagsinput('removeAll');
                        this.input.empty();
                        this.datalist.find('li:not(.search)').remove();
                        this.loadValues(0);
                    }
                    else {
                        if (value !== 'null' && value !== null && value !== '') {
                            if (this.datalist && this.datalist.find('li[data-value="' + value + '"]').length === 0) {
                                if (!text) {
                                    text = value;
                                }
                            }
                            else {
                                if (!text) {
                                    text = this.datalist.find('li[data-value="' + value + '"]').attr("data-text");
                                }
                            }
                        }
                        if (typeof text == 'undefined') {
                            text = value;
                        }
                        let txts = text.split("|");
                        $.each(value.split("|"), (i, e) => {
                            this.container.tagsinput('add', { "value": e, "text": txts[i] });
                        });
                    }
                }
                getValue() {
                    let values = '';
                    let separator = this.options.Separator || '|';
                    let itms = this.container.tagsinput('items');
                    for (let i = 0; i < itms.length; i++) {
                        if (i != 0) {
                            values += separator;
                        }
                        values += itms[i].value;
                    }
                    return values;
                }
                /**
                * Trigger Dependencies.
                * @method triggerDependencies
                */
                triggerDependencies() {
                    this.input.trigger('change');
                }
            }
            wc.FlxMultiComboElement = FlxMultiComboElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-multicombo', flexygo.ui.wc.FlxMultiComboElement);
//# sourceMappingURL=flx-multicombo.js.map