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
            * Library for the FlxDbComboElement web component.
            *
            * @class FlxDbComboElement
            * @constructor
            * @return {FlxDbComboElement}
            */
            class FlxDbComboElement extends HTMLElement {
                constructor() {
                    super();
                    this.property = null;
                    this.mode = 'object';
                    this.type = 'dbcombo';
                    this.options = null;
                    this.input = null;
                    this.mobileInput = null;
                    this.inputval = null;
                    this.datalist = null;
                    this.open = false;
                    this.value = null;
                    this.page = null;
                    /**
                   * Set when component is attached to DOM
                   * @property connected {boolean}
                   */
                    this.connected = false;
                    this.additionalWhere = null;
                    this.cnnString = null;
                    this.timer = null;
                    this.scrollTopPosition = null;
                }
                /**
               * Fires when element is attached to DOM
               * @method connectedCallback
               */
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
                            if (parentCtl && wcParent.mode) {
                                this.mode = wcParent.mode;
                            }
                        }
                        this.property = propName;
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
                    let AllowNewObject = element.attr('AllowNewObject');
                    if (AllowNewObject && AllowNewObject !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.AllowNewObject = AllowNewObject;
                    }
                    let AllowNewReturnFields = element.attr('AllowNewReturnFields');
                    if (AllowNewReturnFields && AllowNewReturnFields !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.AllowNewReturnFields = AllowNewReturnFields;
                    }
                    let AllowNewFunction = element.attr('AllowNewFunction');
                    if (AllowNewFunction && AllowNewFunction !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.AllowNewFunction = AllowNewFunction;
                    }
                    let AllowNewDefaults = element.attr('AllowNewDefaults');
                    if (AllowNewDefaults && AllowNewDefaults !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.AllowNewDefaults = AllowNewDefaults;
                    }
                    let ObjNameLink = element.attr('ObjNameLink');
                    if (ObjNameLink && ObjNameLink !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.ObjNameLink = ObjNameLink;
                    }
                    let ObjWhereLink = element.attr('ObjWhereLink');
                    if (ObjWhereLink && ObjWhereLink !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.ObjWhereLink = ObjWhereLink;
                    }
                    let ObjModeLink = element.attr('ObjModeLink');
                    if (ObjModeLink && ObjModeLink !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.ObjModeLink = ObjModeLink;
                    }
                    let PageNameLink = element.attr('PageNameLink');
                    if (PageNameLink && PageNameLink !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.PageNameLink = PageNameLink;
                    }
                    let TargetIdLink = element.attr('TargetIdLink');
                    if (TargetIdLink && TargetIdLink !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.TargetIdLink = TargetIdLink;
                    }
                    let SearchCollection = element.attr('SearchCollection');
                    if (SearchCollection && SearchCollection !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.SearchCollection = SearchCollection;
                    }
                    let SearchReturnFields = element.attr('SearchReturnFields');
                    if (SearchReturnFields && SearchReturnFields !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.SearchReturnFields = SearchReturnFields;
                    }
                    let SearchWhere = element.attr('SearchWhere');
                    if (SearchWhere && SearchWhere !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.SearchWhere = SearchWhere;
                    }
                    let SearchFunction = element.attr('SearchFunction');
                    if (SearchFunction && SearchFunction !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.SearchFunction = SearchFunction;
                    }
                    if (typeof element.attr('Required') !== 'undefined') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IsRequired = true;
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
                    let PlaceHolder = element.attr('PlaceHolder');
                    if (PlaceHolder && PlaceHolder !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.PlaceHolder = PlaceHolder;
                    }
                    let IconClass = element.attr('IconClass');
                    if (IconClass && IconClass !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IconClass = IconClass;
                    }
                    let Template = element.find('Template');
                    if (Template.length > 0 && Template.html() !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Template = Template.html();
                        Template.remove();
                    }
                    let Items = element.find('option');
                    if (Items.length > 0) {
                        let arr = [];
                        for (let opt = 0; opt < Items.length; opt++) {
                            let obj = {};
                            if ($(Items[opt]).attr('value')) {
                                obj[element.attr('SQLValueField')] = $(Items[opt]).attr('value');
                            }
                            obj[element.attr('SQLDisplayField')] = $(Items[opt]).html();
                            arr.push(obj);
                        }
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.DropDownValues = arr;
                        Items.remove();
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
                    let cnnString = element.attr('CnnString');
                    if (cnnString && cnnString !== '') {
                        this.cnnString = cnnString;
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
                    let ValidatorMessage = element.attr('ValidatorMessage');
                    if (ValidatorMessage && ValidatorMessage !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.ValidatorMessage = ValidatorMessage;
                    }
                    //let cnnstring = element.attr('cnnstring');
                    //if (cnnstring && cnnstring !== '') {
                    //  this.cnnstring = cnnstring;
                    //}
                    this.init();
                    let Value = element.attr('Value');
                    let Text = element.attr('Text');
                    if (Value && Value !== '') {
                        this.setValue(Value, Text);
                    }
                    this.connected = true;
                }
                disconnectedCallback() {
                    let element = $(this);
                    element.find('*').remove();
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
                    return ['type', 'property', 'objectname', 'viewname', 'sqlvaluefield', 'sqldisplayfield', 'required', 'disabled', 'requiredmessage', 'style', 'class', 'placeholder', 'iconclass', 'template', 'helpid', 'hide', 'additionalwhere', 'sqlfilter', 'pagesize', 'validatormessage', 'cnnstring'];
                }
                /**
               * Fires when the attribute value of the element is changed.
               * @method attributeChangedCallback
               */
                attributeChangedCallback(attrName, oldVal, newVal) {
                    if (!this.connected) {
                        return;
                    }
                    let element = $(this);
                    if (attrName.toLowerCase() === 'type' && newVal && newVal !== '') {
                        this.type = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'property' && newVal && newVal !== '') {
                        let propName = newVal;
                        let parentCtl = element.closest('flx-edit, flx-list,flx-propertymanager');
                        if (parentCtl && parentCtl.length > 0) {
                            let wcParent = parentCtl[0];
                            this.options = jQuery.extend(true, {}, wcParent.properties[propName]);
                        }
                        this.property = newVal;
                        this.refresh();
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
                    if (attrName.toLowerCase() === 'required') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        if (typeof element.attr('required') !== 'undefined') {
                            this.options.IsRequired = true;
                        }
                        else {
                            this.options.IsRequired = false;
                        }
                        element.find('input[type="text"]').prop('required', this.options.IsRequired);
                    }
                    if (attrName.toLowerCase() === 'disabled') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        if (typeof element.attr('disabled') !== 'undefined') {
                            this.options.Locked = true;
                            this.input.prop('disabled', this.options.Locked);
                            element.find('div.input-group-btn .flx-caret').hide();
                            element.find('div.input-group-btn .flxallownew').hide();
                            element.find('div.input-group-btn .flx-icon.icon-search').parent().hide();
                            if (element.find('div.input-group-btn .btn:visible').length == 0) {
                                if (!element.find('span.input-group-addon').length) {
                                    element.find('div').first().removeClass('input-group');
                                }
                                //else {
                                //    this.input.css({ 'border-top-right-radius': '3px', 'border-bottom-right-radius': '3px' });
                                //}
                            }
                        }
                        else {
                            this.options.Locked = false;
                            element.find('div.input-group-btn .flx-caret').show();
                            element.find('div.input-group-btn .flxallownew').show();
                            element.find('div.input-group-btn .flx-icon.icon-search').parent().show();
                            element.find('div').first().addClass('input-group');
                            this.input.css({ 'border-top-right-radius': '', 'border-bottom-right-radius': '' });
                        }
                        element.find('input').prop('disabled', this.options.Locked);
                    }
                    if (attrName.toLowerCase() === 'requiredmessage' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IsRequiredMessage = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'style' && newVal && newVal !== '') {
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
                            this.refresh();
                        }
                    }
                    if (attrName.toLowerCase() === 'placeholder' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.PlaceHolder = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'iconclass' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IconClass = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'template' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Template = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'helpid' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.HelpId = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'hide' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Hide = newVal;
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
                    if (attrName.toLowerCase() === 'cnnstring' && newVal && newVal !== '') {
                        this.cnnString = newVal;
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
                    if ($(this).attr('mode') && $(this).attr('mode').toLowerCase() === 'view') {
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
                        let icon1 = $('<button class="btn btn-default" type="button"><i class="flx-icon icon-link" /></button>').on('click', () => {
                            if (this.getValue()) {
                                let propObjNameLink = this.options.ObjNameLink;
                                let propObjWhereLink = this.options.ObjWhereLink;
                                if (editCtl) {
                                    if (propObjNameLink) {
                                        propObjNameLink = editCtl.parseEditString(this.options.ObjNameLink);
                                        if (propObjWhereLink) {
                                            propObjWhereLink = editCtl.parseEditString(this.options.ObjWhereLink);
                                        }
                                    }
                                    else {
                                        let obj = new Object();
                                        obj[this.options.SQLValueField] = this.getValue();
                                        obj[this.options.SQLDisplayField] = this.getText();
                                        if (propObjNameLink) {
                                            propObjNameLink = flexygo.utils.parser.compile(obj, propObjNameLink);
                                        }
                                        if (propObjWhereLink) {
                                            propObjWhereLink = flexygo.utils.parser.compile(obj, propObjWhereLink);
                                        }
                                    }
                                    if (this.options.ObjModeLink == 'Other') {
                                        flexygo.nav.openPageName(this.options.PageNameLink, propObjNameLink, propObjWhereLink, null, this.options.TargetIdLink, true);
                                    }
                                    else {
                                        flexygo.nav.openPage(this.options.ObjModeLink, propObjNameLink, propObjWhereLink, null, this.options.TargetIdLink);
                                    }
                                    //flexygo.nav.openPage('view', editCtl.parseEditString(this.options.ObjNameLink), editCtl.parseEditString(this.options.ObjWhereLink), null, this.options.TargetIdLink);
                                }
                                else {
                                    flexygo.msg.warning('flxedit.emptyproperty');
                                }
                            }
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
                    this.open = false;
                    if (this.options) {
                        //var lastHeight;
                        let iconsLeft;
                        let iconsRight = this.getIconButtons();
                        let control = $('<div class="input-group">');
                        let input = $('<input type="search" class="form-control" />');
                        let inputval = $('<input type="text" style="display:none" />');
                        if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream)
                            input.css('-webkit-appearance', 'none');
                        let datalist = $('<ul style="display:none" class="comboOptions" />');
                        if (flexygo.utils.isSizeMobile() || flexygo.utils.isTactilModeActive()) {
                            datalist.addClass('mobile');
                            let mobileInputDiv = $('<div class="mobileinputdiv input-group"/>').appendTo(datalist);
                            this.mobileInput = $('<input type="search" class="mobileinputdiv form-control mobileinput" autocomplete="off" />').appendTo(mobileInputDiv);
                            $(`<label class="mobileinputdiv input-group-btn">
                          <label class="mobileinputdiv btn">
                            <i title="${flexygo.localization.translate('msg.confirm')}" class="mobileinputdiv flx-icon icon-checked" />
                          </label>
                       </label>`).appendTo(mobileInputDiv);
                            this.mobileInput.off('keyup').on('keyup', (e) => {
                                var up = 38;
                                var down = 40;
                                var tab = 9;
                                if (e.keyCode != up && e.keyCode != down && e.keyCode != tab) {
                                    this.input.val(this.mobileInput.val());
                                    this.input.trigger('keyup');
                                }
                                if (e.key === 'Enter') {
                                    this.hideMobileInput();
                                }
                            }).off('search').on('search', (e) => {
                                this.input.val($(e.currentTarget).val());
                                this.input.trigger('search');
                            }).off('blur').on('blur', () => {
                                this.hideMobileInput();
                            });
                        }
                        this.input = input;
                        this.inputval = inputval;
                        this.datalist = datalist;
                        this.datalist.off('scroll.dbcombo').on('scroll.dbcombo', (e) => {
                            if (this.datalist[0].offsetHeight + this.datalist[0].scrollTop >= this.datalist[0].scrollHeight) {
                                this.loadValues(this.page + 1, false, false, null, true);
                            }
                        });
                        input.off('focus').on('click', (ev) => {
                            if (!this.open) {
                                this.showOptions();
                            }
                        }).off('blur').on('blur', () => {
                            if (this.open) {
                                var itms = this.datalist.children('.selected');
                                if (itms.length > 0 && itms.attr('data-value') != this.inputval.val()) {
                                    itms.trigger("mousedown");
                                }
                                this.hideOptions();
                            }
                        }).off('keydown').on('keydown', (e) => {
                            var up = 38;
                            var down = 40;
                            var enter = 13;
                            const tab = 9;
                            if (e.keyCode == down) {
                                if (this.open) {
                                    if (this.datalist.children('li').length > 0) {
                                        if (this.datalist.children('.selected').length == 0) {
                                            this.datalist.children('li:first').addClass('selected');
                                        }
                                        else {
                                            let itm = this.datalist.children('.selected');
                                            let nxtItm = itm.next();
                                            if (nxtItm.length === 0) {
                                                nxtItm = this.datalist.children('li:first');
                                            }
                                            itm.removeClass('selected');
                                            nxtItm.addClass('selected');
                                        }
                                    }
                                }
                                else {
                                    this.showOptions();
                                }
                                e.stopPropagation();
                                e.preventDefault();
                                return false;
                            }
                            else if (e.keyCode == up) {
                                if (this.open) {
                                    if (this.datalist.children('li').length > 0) {
                                        if (this.datalist.children('.selected').length == 0) {
                                            this.datalist.children('li:last').addClass('selected');
                                        }
                                        else {
                                            let itm = this.datalist.children('.selected');
                                            let prevItm = itm.prev();
                                            if (prevItm.length === 0) {
                                                prevItm = this.datalist.children('li:last');
                                            }
                                            itm.removeClass('selected');
                                            prevItm.addClass('selected');
                                        }
                                    }
                                }
                                else {
                                    this.showOptions();
                                }
                                e.stopPropagation();
                                e.preventDefault();
                                return false;
                            }
                            else if (e.keyCode == enter || e.keyCode == tab) {
                                if (this.open) {
                                    var itms = this.datalist.children('.selected');
                                    if (itms.length > 0 && itms.attr('data-value') != this.inputval.val()) {
                                        itms.trigger("mousedown");
                                    }
                                    this.hideOptions();
                                }
                            }
                        }).off('change').on('change', (e) => {
                            me.attr('value', this.getValue());
                            e.stopPropagation();
                            e.preventDefault();
                        });
                        if (!flexygo.utils.isSizeMobile() && !flexygo.utils.isTactilModeActive()) {
                            $('#mainContent, main.pageContainer').on('scroll.dbcombo', (e) => {
                                this.hideOptions();
                            });
                        }
                        /*$((<any>window), me.closest('div.ui-dialog')).resize(() => {
                            if (!flexygo.utils.isSizeMobile() && !flexygo.utils.isTactilModeActive()) {
                                this.hideOptions();
                            } else {
                               // this.datalist.css({ 'max-height': window.innerHeight - 5 })
                            }
                        })*/
                        input.on('keyup', (e) => {
                            var up = 38;
                            var down = 40;
                            var tab = 9;
                            var enter = 13;
                            if (e.keyCode != up && e.keyCode != down && e.keyCode != tab && e.keyCode != enter) {
                                if (this.timer) {
                                    clearTimeout(this.timer);
                                    this.timer = null;
                                }
                                this.timer = setTimeout(() => {
                                    $(e.currentTarget).attr('data-text', '');
                                    this.inputval.val('');
                                    this.loadValues(0, true);
                                }, 200);
                                this.showOptions();
                            }
                        });
                        input.on('search', (e) => {
                            if ($(e.currentTarget).val() === '') {
                                $(e.currentTarget).attr('data-text', '');
                                this.inputval.val('');
                                this.showOptions();
                                this.loadValues(0, false);
                                this.triggerDependencies();
                            }
                        });
                        if (this.options.IconClass && this.options.IconClass !== '') {
                            iconsLeft = $('<span class="input-group-addon" ><i class="' + this.options.IconClass + '" /></span>');
                        }
                        if (iconsLeft || iconsRight) {
                            control.addClass("input-group");
                        }
                        if (iconsLeft) {
                            control.append(iconsLeft);
                        }
                        control.append(input);
                        control.append(inputval);
                        if (iconsRight && iconsRight.length > 0) {
                            control.append(iconsRight);
                        }
                        //control.append(datalist);
                        me.html(control);
                        me.append(datalist);
                        this.setOptions();
                        if (this.options && this.options.DropDownValues && this.options.DropDownValues.length > 0) {
                            this.addComboItems(this.options.DropDownValues, false);
                        }
                        else {
                            this.loadValues(0, false);
                        }
                        // Envolver el componente flx-dbcombo en un div posicionado relativamente para que el menú se despliegue correctamente.
                        let parentAttr = me.parent().attr('data-tag');
                        let padIzq = me.find('.input-group').first().css('padding-left');
                        if (typeof parentAttr === typeof undefined || !parentAttr || parentAttr !== 'control') {
                            me.wrap("<div data-tag='control' class='fixdbcombo' style='position:relative'></div>");
                            this.datalist.css({ left: padIzq });
                        }
                    }
                }
                showOptions() {
                    let me = $(this);
                    if (!this.open && !this.input.prop('readonly')) {
                        if (!this.mobileInput) {
                            let winHeight;
                            let dialogTop;
                            let headerHeight;
                            let padBottom = me.find('.input-group').first().css('padding-bottom');
                            if (!me.closest('div.ui-dialog').length) {
                                winHeight = $(window).height();
                                dialogTop = 0;
                                headerHeight = $('#mainMenu').height() + 7;
                            }
                            else {
                                winHeight = me.closest('div.ui-dialog').height();
                                dialogTop = me.closest('div.ui-dialog').offset().top;
                                headerHeight = $('div.ui-dialog-titlebar').height() + 7;
                            }
                            if (parseInt((this.input.offset().top - dialogTop + this.input.outerHeight() / 2 - headerHeight / 2).toFixed()) > parseInt((winHeight / 2).toFixed())) {
                                this.datalist.css({ bottom: parseInt((this.input.outerHeight() + 1).toFixed()), width: parseInt((me.children('div').width()).toFixed()), 'max-height': parseInt((this.input.offset().top - dialogTop - headerHeight).toFixed()), 'box-shadow': '0 -6px 20px 4px rgba(0, 0, 0, 0.15), 0 -2px 10px 0px rgba(0, 0, 0, 0.20)' });
                                if (me.parent().hasClass("fixdbcombo"))
                                    this.datalist.css('margin-bottom', padBottom);
                            }
                            else {
                                this.datalist.css({ bottom: 'auto', width: parseInt((me.children('div').width()).toFixed()), 'max-height': parseInt((winHeight - (this.input.offset().top - dialogTop) - 60).toFixed()), 'box-shadow': '0 6px 20px 4px rgba(0, 0, 0, 0.15), 0 2px 10px 0px rgba(0, 0, 0, 0.20)' });
                                if (me.parent().hasClass("fixdbcombo"))
                                    this.datalist.css('transform', 'translateY(-' + padBottom + ')');
                            }
                            this.datalist.slideDown(250);
                        }
                        else {
                            const isIphone = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
                            this.scrollTopPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
                            this.datalist.css({ position: 'fixed', top: 3, left: 5, width: "calc(100% - 10px)", 'max-height': (isIphone) ? '48%' : (flexygo.utils.isTactilModeActive ? '50%' : '98%'), 'padding-top': 30, 'box-shadow': '0 -6px 20px 4px rgba(0, 0, 0, 0.15), 0 -2px 10px 0px rgba(0, 0, 0, 0.20)' });
                            if (isIphone)
                                $(document).scrollTop(-innerHeight);
                            this.mobileInput.val(this.input.val());
                            me.append('<div class="mobilebackground"/>');
                            this.datalist.fadeIn(250);
                            this.mobileInput.focus();
                        }
                        this.open = true;
                    }
                }
                hideOptions() {
                    if (this.open) {
                        this.open = false;
                        if (!this.mobileInput) {
                            this.datalist.slideUp(250);
                            if ($(this.input).is(':focus')) {
                                this.input.blur();
                            }
                        }
                        else {
                            this.datalist.fadeOut(250);
                            $(this).find('div.mobilebackground').remove();
                            if ($(this.mobileInput).is(':focus')) {
                                this.mobileInput.blur();
                            }
                        }
                        if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
                            window.scrollTo(0, this.scrollTopPosition);
                        }
                    }
                }
                hideMobileInput() {
                    if (this.open) {
                        var itms = this.datalist.children('.selected');
                        if (itms.length > 0 && itms.attr('data-value') != this.inputval.val()) {
                            itms.trigger("mousedown");
                        }
                        this.input.trigger('blur');
                        this.hideOptions();
                    }
                }
                loadValues(page, autoselect, fromvalue, value, append) {
                    let params;
                    let method = null;
                    this.page = page;
                    if (this.options.ViewName && this.options.ViewName !== '') {
                        params = {
                            ObjectName: this.options.ObjectName,
                            ViewName: this.options.ViewName,
                            DisplayField: this.options.SQLDisplayField,
                            Value: this.input.val(),
                            Page: page,
                            PageSize: this.options.PageSize,
                            AdditionalWhere: this.additionalWhere,
                            SQLFilter: this.options.SQLFilter,
                            CnnString: this.cnnString
                        };
                        method = 'GetComboDataView';
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
                            method = 'GetComboText';
                        }
                        else {
                            params = {
                                Mode: this.mode,
                                ObjectName: this.options.ProcessName || this.options.ReportName || this.options.ObjectName,
                                PropertyName: this.options.Name,
                                CryptedSql: this.options.SQLEditSentence || this.options.SQLSentence,
                                CryptedFilter: this.options.SQLFilter,
                                Value: this.input.val(),
                                Page: page,
                                //PageSize: this.options.PageSize,                 
                                AdditionalWhere: this.additionalWhere
                            };
                            method = 'GetComboData';
                        }
                    }
                    else {
                        let filterValue = ((fromvalue) ? value : this.input.val()).toLowerCase();
                        this.datalist.find("li").filter(function () {
                            $(this).toggle($(this).text().toLowerCase().indexOf(filterValue) > -1);
                        });
                    }
                    if (method) {
                        flexygo.ajax.syncPost('~/api/Edit', method, params, (response) => {
                            if (response) {
                                this.addComboItems(response, autoselect, append);
                            }
                        });
                    }
                }
                addComboItems(data, autoselect, append) {
                    if (!append) {
                        this.datalist.find('*').not('.mobileinputdiv').remove();
                    }
                    else {
                        this.datalist.find('> div.load-more').remove();
                    }
                    if (data) {
                        for (let i = 0; i < data.length; i++) {
                            let elm;
                            if (this.options.Template && this.options.Template !== '') {
                                elm = this.getListItem(data[i][this.options.SQLValueField], data[i][this.options.SQLDisplayField], flexygo.utils.parser.recursiveCompile(data[i], this.options.Template, this));
                            }
                            else {
                                elm = this.getListItem(data[i][this.options.SQLValueField], data[i][this.options.SQLDisplayField], data[i][this.options.SQLDisplayField]);
                            }
                            if (!flexygo.utils.isBlank(this.input.val()) && i == 0) {
                                elm.addClass("selected");
                            }
                            this.datalist.append(elm);
                        }
                        if (this.datalist.find(' > li').length >= (this.options.PageSize || flexygo.profiles.defaultDropDownRows) && data.length > 0) {
                            this.datalist.append(`<div class="load-more txt-muted clickable"><span>${flexygo.localization.translate('flxedit.loadmore')}</span><i class="fa fa-angle-down"></div>`);
                            $('.load-more').on('mousedown.load-more', (e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                if (this.datalist[0].offsetHeight <= this.datalist[0].scrollHeight) {
                                    this.loadValues(this.page + 1, false, false, null, true);
                                }
                            });
                        }
                    }
                    if (this.datalist.children('li').length == 1 && this.input.val().toString().toLowerCase() == this.datalist.children('li').text().toString().toLowerCase().trim() && autoselect) {
                        let itm = $(this.datalist.children('li')[0]);
                        this.setValue(itm.attr('data-value'), itm.attr('data-text'));
                        this.datalist.find('.selected').removeClass('selected');
                        itm.addClass('selected');
                        this.triggerDependencies();
                    }
                }
                getTextByValue(value) {
                    if (this.options.SQLValueField !== this.options.SQLDisplayField) {
                        if (!this.options.ViewName || this.options.ViewName === '') {
                            let params = {
                                Mode: this.mode,
                                ObjectName: this.options.ProcessName || this.options.ReportName || this.options.ObjectName,
                                PropertyName: this.options.Name,
                                CryptedSql: this.options.SQLEditSentence || this.options.SQLSentence,
                                CryptedFilter: this.options.SQLFilter,
                                Value: value,
                                Page: 0,
                                //PageSize: 1,                       
                                AdditionalWhere: this.additionalWhere,
                                SQLValueField: this.options.SQLValueField
                            };
                            flexygo.ajax.syncPost('~/api/Edit', 'GetComboText', params, (response) => {
                                if (response) {
                                    value = response[0][this.options.SQLDisplayField];
                                }
                            });
                        }
                        else {
                            let params = {
                                ObjectName: this.options.ObjectName,
                                ViewName: this.options.ViewName,
                                ValueField: this.options.SQLValueField,
                                Value: value
                            };
                            flexygo.ajax.syncPost('~/api/Edit', 'GetComboTextByView', params, (response) => {
                                if (response) {
                                    value = response[0][this.options.SQLDisplayField];
                                }
                            });
                        }
                    }
                    return value;
                }
                getListItem(value, text, template) {
                    if (value && value.toString().indexOf('/Date(') > -1) {
                        value = moment.utc(value).format('YYYY-MM-DD[T]HH:mm');
                    }
                    if (text && text.toString().indexOf('/Date(') > -1) {
                        text = moment.utc(text).format('YYYY-MM-DD[T]HH:mm');
                    }
                    if (template && template.toString().indexOf('/Date(') > -1) {
                        template = moment.utc(template).format('YYYY-MM-DD[T]HH:mm');
                    }
                    if (!text && text != '0') {
                        text = value;
                    }
                    if (!template) {
                        template = text;
                    }
                    return $('<li/>').html(template).attr('data-value', value).attr('data-text', text).on('mousedown', (e) => {
                        this.setValue($(e.currentTarget).attr('data-value'), $(e.currentTarget).attr('data-text'));
                        this.datalist.find('.selected').removeClass('selected');
                        $(e.currentTarget).addClass('selected');
                        this.triggerDependencies();
                    });
                }
                getIconButtons() {
                    let me = $(this);
                    let icon1;
                    let ret = $('<div class="input-group-btn" />');
                    let arrow = $('<button class="btn btn-default flx-caret" type="button" tabindex="-1"><span class="caret"></span></button>');
                    ret.append(arrow);
                    arrow.off('mousedown').on('mousedown', (ev) => {
                        if (this.open) {
                            this.hideOptions();
                        }
                        else {
                            this.input.focus();
                            this.showOptions();
                        }
                        ev.stopPropagation();
                        ev.preventDefault();
                        return false;
                    });
                    let editCtl = me.closest('flx-edit, flx-list')[0];
                    if (this.options && (this.options.SearchCollection || this.options.SearchFunction) && !this.options.Locked) {
                        icon1 = $('<button class="btn btn-default" type="button"><i class="flx-icon icon-search" /></button>').on('click', () => {
                            if (this.options.SearchFunction) {
                                let propSearchFunction = this.options.SearchFunction;
                                if (editCtl) {
                                    flexygo.utils.execDynamicCode.call(this, editCtl.parseEditString(this.options.SearchFunction, editCtl, this));
                                }
                                else {
                                    let obj = new Object();
                                    obj[this.options.SQLValueField] = this.getValue();
                                    obj[this.options.SQLDisplayField] = this.getText();
                                    if (propSearchFunction) {
                                        propSearchFunction = flexygo.utils.parser.compile(obj, propSearchFunction);
                                    }
                                    flexygo.utils.execDynamicCode.call(this, propSearchFunction);
                                }
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
                                    this.loadValues(0, false, true, value);
                                    this.setValue(value);
                                    this.triggerDependencies();
                                    $(document).find('flx-search[objectname="' + this.options.SearchCollection + '"]').closest(".ui-dialog").remove();
                                });
                                let PropSearchCollection = this.options.SearchCollection;
                                let PropSearchWhere = this.options.SearchWhere;
                                if (editCtl) {
                                    flexygo.nav.openPage('search', editCtl.parseEditString(this.options.SearchCollection, editCtl, this), editCtl.parseEditString(this.options.SearchWhere, editCtl, this), null, 'modal');
                                }
                                else {
                                    let obj = new Object();
                                    obj[this.options.SQLValueField] = this.getValue();
                                    obj[this.options.SQLDisplayField] = this.getText();
                                    if (PropSearchCollection) {
                                        PropSearchCollection = flexygo.utils.parser.compile(obj, PropSearchCollection);
                                    }
                                    if (PropSearchWhere) {
                                        PropSearchWhere = flexygo.utils.parser.compile(obj, PropSearchWhere);
                                    }
                                    flexygo.nav.openPage('search', PropSearchCollection, PropSearchWhere, null, 'modal');
                                }
                                let propSearchFunction = this.options.SearchFunction;
                                if (editCtl) {
                                    if (propSearchFunction) {
                                        propSearchFunction = editCtl.parseEditString(this.options.SearchFunction, editCtl, this);
                                    }
                                }
                                else {
                                    let obj = new Object();
                                    obj[this.options.SQLValueField] = this.getValue();
                                    obj[this.options.SQLDisplayField] = this.getText();
                                    if (propSearchFunction) {
                                        propSearchFunction = flexygo.utils.parser.compile(obj, propSearchFunction);
                                    }
                                }
                            }
                        });
                        ret.append(icon1);
                    }
                    if (this.options && this.options.ObjNameLink && this.options.ObjWhereLink) {
                        icon1 = $('<button class="btn btn-default" type="button"><i class="flx-icon icon-link" /></button>').on('click', () => {
                            if (this.getValue()) {
                                let propObjNameLink = this.options.ObjNameLink;
                                let propObjWhereLink = this.options.ObjWhereLink;
                                if (editCtl) {
                                    if (propObjNameLink) {
                                        propObjNameLink = editCtl.parseEditString(this.options.ObjNameLink, editCtl, this);
                                    }
                                    if (propObjWhereLink) {
                                        propObjWhereLink = editCtl.parseEditString(this.options.ObjWhereLink, editCtl, this);
                                    }
                                }
                                else {
                                    let obj = new Object();
                                    obj[this.options.SQLValueField] = this.getValue();
                                    obj[this.options.SQLDisplayField] = this.getText();
                                    if (propObjWhereLink) {
                                        propObjNameLink = flexygo.utils.parser.compile(obj, propObjNameLink);
                                    }
                                    if (propObjWhereLink) {
                                        propObjWhereLink = flexygo.utils.parser.compile(obj, propObjWhereLink);
                                    }
                                }
                                if (this.options.ObjModeLink == 'Other') {
                                    flexygo.nav.openPageName(this.options.PageNameLink, propObjNameLink, propObjWhereLink, null, this.options.TargetIdLink, true);
                                }
                                else {
                                    if (!this.options.ObjModeLink) {
                                        this.options.ObjModeLink = 'view';
                                    }
                                    if (!this.options.TargetIdLink) {
                                        this.options.TargetIdLink = 'popup';
                                    }
                                    flexygo.nav.openPage(this.options.ObjModeLink, propObjNameLink, propObjWhereLink, null, this.options.TargetIdLink);
                                }
                                //flexygo.nav.openPage('view', editCtl.parseEditString(this.options.ObjNameLink, editCtl, this), editCtl.parseEditString(this.options.ObjWhereLink, editCtl, this), null, this.options.TargetIdLink);
                            }
                            else {
                                flexygo.msg.warning('flxedit.emptyproperty');
                            }
                        });
                        ret.append(icon1);
                    }
                    if (this.options && (this.options.AllowNewFunction || this.options.AllowNewObject) && !this.options.Locked) {
                        icon1 = $('<button class="btn btn-default flxallownew" type="button"><i class="fa fa-plus" /></button>').on('click', () => {
                            if (this.options.AllowNewFunction) {
                                let propAllowNewFunction = this.options.AllowNewFunction;
                                if (editCtl) {
                                    if (propAllowNewFunction) {
                                        propAllowNewFunction = editCtl.parseEditString(this.options.AllowNewFunction, editCtl, this);
                                    }
                                }
                                else {
                                    let obj = new Object();
                                    obj[this.options.SQLValueField] = this.getValue();
                                    obj[this.options.SQLDisplayField] = this.getText();
                                    if (propAllowNewFunction) {
                                        propAllowNewFunction = flexygo.utils.parser.compile(obj, propAllowNewFunction);
                                    }
                                }
                                flexygo.utils.execDynamicCode.call(this, propAllowNewFunction);
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
                                            let config = entity.getConfig();
                                            value = entity.data[config.KeyFields[0]].Value;
                                        }
                                        this.loadValues(0, false, true, value);
                                        this.setValue(value);
                                        this.triggerDependencies();
                                        $(document).find('flx-edit[objectname="' + this.options.AllowNewObject + '"]').closest(".ui-dialog").remove();
                                    }
                                });
                                let propAllowNewObject = this.options.AllowNewObject;
                                let propAllowNewDefaults = this.options.AllowNewDefaults;
                                if (editCtl) {
                                    if (propAllowNewObject) {
                                        propAllowNewObject = editCtl.parseEditString(this.options.AllowNewObject, editCtl, this);
                                    }
                                    if (propAllowNewDefaults) {
                                        propAllowNewDefaults = editCtl.parseEditString(this.options.AllowNewDefaults, editCtl, this);
                                    }
                                }
                                else {
                                    let obj = new Object();
                                    obj[this.options.SQLValueField] = this.getValue();
                                    obj[this.options.SQLDisplayField] = this.getText();
                                    if (propAllowNewObject) {
                                        propAllowNewObject = flexygo.utils.parser.compile(obj, propAllowNewObject);
                                    }
                                    if (propAllowNewDefaults) {
                                        propAllowNewDefaults = flexygo.utils.parser.compile(obj, propAllowNewDefaults);
                                    }
                                }
                                flexygo.nav.openPage('edit', propAllowNewObject, null, propAllowNewDefaults, 'modal');
                            }
                        });
                        ret.append(icon1);
                    }
                    //if (this.options && this.options.HelpId) {
                    //    icon1 = $('<button class="btn btn-default" type="button"><i class="flx-icon icon-help-2" /></button>').on('click', () => {
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
                    if (this.options && this.options.Name && this.options.Name !== '') {
                        this.input.attr('name', this.options.Name);
                    }
                    else {
                        this.input.attr('name', flexygo.utils.uniqueName());
                    }
                    this.inputval.attr('name', this.input.attr('name'));
                    if (this.options && this.options.Locked) {
                        this.input.prop('disabled', this.options.Locked);
                        if (this.options.Locked) {
                            me.find('div.input-group-btn .flx-caret').hide();
                            if (me.find('div.input-group-btn .btn:visible').length == 0) {
                                if (!me.find('span.input-group-addon').length) {
                                    me.find('div').first().removeClass('input-group');
                                }
                                //else {
                                //    this.input.css({ 'border-top-right-radius': '3px', 'border-bottom-right-radius': '3px' });
                                //}
                            }
                        }
                        else {
                            me.find('div.input-group-btn .flx-caret').show();
                            me.find('div').first().addClass('input-group');
                            this.input.css({ 'border-top-right-radius': '', 'border-bottom-right-radius': '' });
                        }
                    }
                    if (me.attr('tab') && me.attr('tab') !== '') {
                        this.input.attr('tabindex', me.attr('tab'));
                    }
                    if (this.options.PlaceHolder) {
                        this.input.attr('PlaceHolder', this.options.PlaceHolder);
                    }
                    if (this.options.Style) {
                        me.children('div').attr('style', this.options.Style);
                    }
                    if (this.options.CssClass) {
                        me.children('div').addClass(this.options.CssClass);
                    }
                    if (this.options && this.options.IsRequired) {
                        this.inputval.prop('required', this.options.IsRequired);
                    }
                    if (this.options && this.options.IsRequiredMessage) {
                        this.inputval.attr('data-msg-required', this.options.IsRequiredMessage);
                    }
                    if (this.options && this.options.ValidatorMessage && this.options.ValidatorMessage !== '') {
                        this.input.attr('data-msg-sqlvalidator', this.options.ValidatorMessage);
                    }
                    const module = me.closest('flx-module')[0];
                    if ((this.options && (this.options.CauseRefresh || this.options.SQLValidator)) || (module && module.moduleConfig && module.moduleConfig.PropsEventDependant && module.moduleConfig.PropsEventDependant.includes(this.property))) {
                        this.inputval.on('change', () => {
                            //$(document).trigger('refreshProperty', [this.inputval.closest('flx-edit'), this.options.Name]);
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
                    this.input.attr('autocomplete', 'off');
                }
                changeSQLData(newSQL, newOptions) {
                    this.options.SQLSentence = newSQL;
                    this.options.SQLEditSentence = newSQL;
                    this.options.DropDownValues = newOptions;
                    if (this.options.SQLSentence || this.options.SQLEditSentence) {
                        this.loadValues(0, false);
                    }
                    else {
                        this.addComboItems(this.options.DropDownValues, false);
                    }
                }
                setValue(value, text, template) {
                    if (value && value.toString().indexOf('/Date(') > -1) {
                        value = moment.utc(value).format('YYYY-MM-DD[T]HH:mm');
                    }
                    let me = $(this);
                    if (me.attr('mode') && me.attr('mode').toLowerCase() === 'view') {
                        if (value !== 'null' && value !== null && !text && value !== '') {
                            text = this.getTextByValue(value);
                        }
                        this.setValueView(text);
                        me.attr('value', value);
                        me.attr('text', text);
                    }
                    else {
                        if (value !== 'null' && value !== null && value !== '') {
                            if (this.datalist && this.datalist.find('li[data-value="' + value + '"]').length === 0) {
                                if (!text) {
                                    text = this.getTextByValue(value);
                                }
                                let itm = this.getListItem(value, text, template);
                                this.datalist.append(itm);
                                this.datalist.find('.selected').removeClass('selected');
                                itm.addClass('selected');
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
                        if (this.input) {
                            this.input.val(text);
                        }
                        if (this.inputval) {
                            this.inputval.val(value);
                        }
                        me.attr('value', value);
                        me.attr('text', text);
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
                    if (!this.inputval) {
                        return null;
                    }
                    if (this.inputval.val() === '' || this.inputval.val().toLowerCase() === 'null') {
                        return null;
                    }
                    return this.inputval.val();
                }
                getText() {
                    return $(this).attr("Text");
                }
                /**
              * Trigger Dependencies.
              * @method triggerDependencies
              */
                triggerDependencies() {
                    this.inputval.trigger('change');
                }
                /**
              * Show.
              * @method show
              */
                show() {
                    $(this).css({ display: "", opacity: "" }).find("div:first").css({ display: "", opacity: "" });
                    return $(this);
                }
            }
            wc.FlxDbComboElement = FlxDbComboElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-dbcombo', flexygo.ui.wc.FlxDbComboElement);
//# sourceMappingURL=flx-dbcombo.js.map