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
            * Library for the FlxTextElement web component.
            *
            * @class FlxTextElement
            * @constructor
            * @return {FlxTextElement}
            */
            class FlxTextElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                    * Set when component is attached to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                    this.type = 'text';
                    this.property = null;
                    this.options = null;
                    this.value = null;
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = $(this);
                    this.connected = true;
                    let isFilter = false;
                    this.type = element.attr('type') || 'text';
                    /*Comment remove type cause gridstack fires this two times and element types in mobile forms was always text
                    so keyboard was qwerty
                    */
                    //element.removeAttr('type');
                    let propName = element.attr('property');
                    if (propName && flexygo.utils.isBlank(this.options)) {
                        let parentCtl = element.closest('flx-edit,flx-list,flx-propertymanager,flx-view,flx-filter');
                        if (parentCtl && parentCtl.length > 0) {
                            let wcParent = parentCtl[0];
                            if (parentCtl.is('flx-filter')) {
                                let objName = element.attr('object');
                                this.options = jQuery.extend(true, {}, wcParent.properties[objName + '-' + propName]);
                                isFilter = true;
                                Object.defineProperty(this.options, 'Hide', { enumerable: true, configurable: false, writable: false, value: false });
                            }
                            else {
                                this.options = jQuery.extend(true, {}, wcParent.properties[propName]);
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
                    let Mask = element.attr('Mask');
                    if (Mask && Mask !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Mask = Mask;
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
                    let DecimalPlaces = element.attr('DecimalPlaces');
                    if (DecimalPlaces && DecimalPlaces !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.DecimalPlaces = parseInt(DecimalPlaces);
                    }
                    let MaxNumOfChars = element.attr('MaxNumOfChars');
                    if (MaxNumOfChars && MaxNumOfChars !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.MaxNumOfChars = parseInt(MaxNumOfChars);
                    }
                    let MinValue = element.attr('MinValue');
                    if (MinValue && MinValue !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.MinValue = MinValue;
                    }
                    let MaxValue = element.attr('MaxValue');
                    if (MaxValue && MaxValue !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.MaxValue = MaxValue;
                    }
                    let MaxValueMessage = element.attr('MaxValueMessage');
                    if (MaxValueMessage && MaxValueMessage !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.MaxValueMessage = MaxValueMessage;
                    }
                    let MinValueMessage = element.attr('MinValueMessage');
                    if (MinValueMessage && MinValueMessage !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.MinValueMessage = MinValueMessage;
                    }
                    let RegExp = element.attr('RegExp');
                    if (RegExp && RegExp !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.RegExp = RegExp;
                    }
                    let RegExpText = element.attr('RegExpText');
                    if (RegExpText && RegExpText !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.RegExpText = RegExpText;
                    }
                    let ValidatorMessage = element.attr('ValidatorMessage');
                    if (ValidatorMessage && ValidatorMessage !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.ValidatorMessage = ValidatorMessage;
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
                    let HelpId = element.attr('HelpId');
                    if (HelpId && HelpId !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.HelpId = HelpId;
                    }
                    let AllowNewFunction = element.attr('AllowNewFunction');
                    if (AllowNewFunction && AllowNewFunction !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.AllowNewFunction = AllowNewFunction;
                    }
                    let AllowNewObject = element.attr('AllowNewObject');
                    if (AllowNewObject && AllowNewObject !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.AllowNewObject = AllowNewObject;
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
                    if (!isFilter && Hide && Hide !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Hide = Hide == 'true';
                    }
                    let Tag = element.attr('Tag');
                    if (Tag && Tag !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Tag = Tag;
                    }
                    this.init();
                    let Value = element.attr('Value');
                    if (Value && Value !== '') {
                        this.setValue(Value);
                    }
                }
                /**
               * Array of observed attributes.
               * @property observedAttributes {Array}
               */
                static get observedAttributes() {
                    return ['type', 'property', 'required', 'disabled', 'requiredmessage', 'mask', 'style', 'class', 'decimalplaces', 'minvalue', 'maxvalue', 'maxvaluemessage', 'minvaluemessage', 'regexp', 'regexptext', 'validatormessage', 'placeholder', 'iconclass', 'helpid', 'allownewfunction', 'allownewobject', 'hide', 'tag'];
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
                    if (attrName.toLowerCase() === 'type' && newVal && newVal !== '') {
                        this.type = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'property' && newVal && newVal !== '') {
                        let propName = newVal;
                        let parentCtl = element.closest('flx-edit, flx-filter, flx-list,flx-propertymanager');
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
                        element.find('input').prop('required', this.options.IsRequired);
                    }
                    if (attrName.toLowerCase() === 'disabled') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        if (typeof element.attr('disabled') !== 'undefined') {
                            this.options.Locked = true;
                        }
                        else {
                            this.options.Locked = false;
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
                    if (attrName.toLowerCase() === 'mask' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Mask = newVal;
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
                    if (attrName.toLowerCase() === 'class' && newVal && newVal !== '') {
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
                    if (attrName.toLowerCase() === 'decimalplaces' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.DecimalPlaces = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'minvalue' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.MinValue = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'maxvalue' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.MaxValue = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'maxvaluemessage' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.MaxValueMessage = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'minvaluemessage' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.MinValueMessage = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'regexp' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.RegExp = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'regexptext' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.RegExpText = newVal;
                        this.refresh();
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
                    if (attrName.toLowerCase() === 'helpid' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.HelpId = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'allownewfunction' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.AllowNewFunction = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'allownewobject' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.AllowNewObject = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'hide' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Hide = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'tag' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Tag = newVal;
                        this.refresh();
                    }
                }
                refresh() {
                    let val = this.getValue();
                    this.init();
                    if (val && val !== "") {
                        this.setValue(val);
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
                            flexygo.nav.openPage('view', editCtl.parseEditString(this.options.ObjNameLink), editCtl.parseEditString(this.options.ObjWhereLink), null, this.options.TargetIdLink);
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
                    if (this.type.toLowerCase() === 'url') {
                        this.setUrlLink();
                        if (this.options && !this.options.PlaceHolder) {
                            this.options.PlaceHolder = 'http://...';
                        }
                    }
                    if (iconsRight) {
                        control.append(iconsRight);
                    }
                    if (iconsLeft || (iconsRight && iconsRight.length > 0)) {
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
                    let iconsLeft;
                    let iconsRight = this.getIconButtons();
                    let control = $('<div>');
                    let input;
                    if (this.type === 'date' && this.options.PlaceHolder !== '') {
                        input = $('<input type="text" onfocus="(this.type=\'date\')" class="form-control" />');
                    }
                    else if (this.type === 'cron' || this.type === 'ident' || this.type === 'map') {
                        input = $('<input type="text" class="form-control" />');
                    }
                    else if (this.options && this.options.MaxNumOfChars && this.options.MaxNumOfChars > 0) {
                        input = $('<input type="' + this.type + '" class="form-control"  maxLength="' + this.options.MaxNumOfChars + '"/>');
                    }
                    else {
                        input = $('<input type="' + this.type + '" class="form-control" />');
                    }
                    input.on('blur', (e) => { me.trigger('blur'); });
                    if (this.type === 'ident') {
                        input.on('keyup', function (evt) {
                            this.value = this.value.replace(/á/g, 'a');
                            this.value = this.value.replace(/é/g, 'e');
                            this.value = this.value.replace(/í/g, 'i');
                            this.value = this.value.replace(/ó/g, 'o');
                            this.value = this.value.replace(/ú/g, 'u');
                            this.value = this.value.replace(/ñ/g, 'n');
                            this.value = this.value.replace(/ç/g, 'c');
                            this.value = this.value.replace(/Á/g, 'A');
                            this.value = this.value.replace(/É/g, 'E');
                            this.value = this.value.replace(/Í/g, 'I');
                            this.value = this.value.replace(/Ó/g, 'O');
                            this.value = this.value.replace(/Ú/g, 'U');
                            this.value = this.value.replace(/Ñ/g, 'N');
                            this.value = this.value.replace(/Ç/g, 'C');
                            this.value = this.value.replace(/ /g, '_');
                            this.value = this.value.replace(/[^a-zA-Z0-9_\\-]/g, '');
                        });
                    }
                    if (this.options && this.options.IconClass && this.options.IconClass !== '') {
                        iconsLeft = $('<span class="input-group-addon" ><i class="' + this.options.IconClass + '" /></span>');
                    }
                    if (iconsLeft) {
                        control.append(iconsLeft);
                    }
                    control.append(input);
                    if (iconsRight && iconsRight.length > 0) {
                        control.append(iconsRight);
                    }
                    if (iconsLeft || (iconsRight && iconsRight.length > 0)) {
                        control.addClass("input-group");
                    }
                    me.html(control);
                    if (this.type.toLowerCase() === 'url') {
                        this.setUrlLink();
                        if (this.options && !this.options.PlaceHolder) {
                            this.options.PlaceHolder = 'http://...';
                        }
                    }
                    this.setOptions();
                }
                setUrlLink() {
                    let me;
                    let control;
                    let btnURLlink;
                    me = $(this);
                    control = me.find('div').addClass('input-group');
                    btnURLlink = $('<button class="btn btn-default" type="button"><i class="fa fa-external-link" /></button>').appendTo($('<div class="input-group-btn"/>').appendTo(control));
                    btnURLlink.off('click').on('click', () => {
                        window.open(this.getValue());
                    });
                }
                getIconButtons() {
                    let ret = $('<div class="input-group-btn" />');
                    let me = $(this);
                    let icon1;
                    let editCtl = me.closest('flx-edit, flx-list')[0];
                    let parseEdit = function (val, ctx, property) { return val; };
                    if (editCtl && editCtl.parseEditString) {
                        parseEdit = editCtl.parseEditString;
                    }
                    if (this.options && (this.options.SearchCollection || this.options.SearchFunction) && !this.options.Locked) {
                        icon1 = $('<button class="btn btn-default" type="button"><i class="flx-icon icon-search" /></button>').on('click', (e) => {
                            if (this.options.SearchFunction) {
                                flexygo.utils.execDynamicCode.call(this, parseEdit(this.options.SearchFunction, editCtl, this));
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
                                    $(document).find('flx-search[objectname="' + this.options.SearchCollection + '"]').closest(".ui-dialog").remove();
                                });
                                flexygo.nav.openPage('search', parseEdit(this.options.SearchCollection, editCtl, this), parseEdit(this.options.SearchWhere, editCtl, this), null, 'modal');
                            }
                        });
                        ret.append(icon1);
                    }
                    if (this.options && this.options.ObjNameLink && this.options.ObjWhereLink) {
                        icon1 = $('<button class="btn btn-default" type="button"><i class="flx-icon icon-link" /></button>').on('click', (e) => {
                            flexygo.nav.openPage('view', parseEdit(this.options.ObjNameLink, editCtl, this), parseEdit(this.options.ObjWhereLink, editCtl, this), null, this.options.TargetIdLink);
                        });
                        ret.append(icon1);
                    }
                    if (this.options && (this.options.AllowNewFunction || this.options.AllowNewObject) && !this.options.Locked) {
                        icon1 = $('<button class="btn btn-default" type="button"><i class="fa fa-plus" /></button>').on('click', (e) => {
                            if (this.options.AllowNewFunction) {
                                flexygo.utils.execDynamicCode.call(this, parseEdit(this.options.AllowNewFunction, editCtl, this));
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
                                            var config = e.sender.getConfig();
                                            value = entity.data[config.KeyFields[0]].Value;
                                        }
                                        this.setValue(value);
                                        this.triggerDependencies();
                                        flexygo.nav.closePage($(document).find('flx-edit[objectname="' + this.options.AllowNewObject + '"]'));
                                    }
                                });
                                flexygo.nav.openPage('edit', parseEdit(this.options.AllowNewObject, editCtl, this), null, null, 'modal');
                            }
                        });
                        ret.append(icon1);
                    }
                    if (this.type == 'cron') {
                        icon1 = $('<button class="btn btn-default" type="button"><i class="flx-icon icon-timer" /></button>').on('click', (e) => {
                            this.showCronGenerator($(e.currentTarget));
                        });
                        ret.append(icon1);
                    }
                    else if (this.type == 'map') {
                        var Tag = "";
                        if (this.options && this.options.Tag != "") {
                            Tag = this.options.Tag;
                        }
                        icon1 = $('<button class="btn btn-default" type="button"><i class="flx-icon icon-map-pointer " /></button>').on('click', (e) => {
                            this.showCoordGenerator($(e.currentTarget), Tag);
                        });
                        ret.append(icon1);
                    }
                    if (ret.html() === '') {
                        return null;
                    }
                    else {
                        return ret;
                    }
                }
                showCronGenerator(itm) {
                    let input = $(this).find('input');
                    itm.popover('show');
                    var htmlContent = '<div class="cronExpression inline" onclick="" ></div><div class="icon-margin-left btn-group"><button class="acpt btn btn-default" onclick=""><i class="flx-icon icon-checked"></i></button><button class="cncl btn btn-default" onclick=""><i class="flx-icon icon-remove"></i></button></div>';
                    itm.data("bs.popover").options.content = htmlContent;
                    itm.data("bs.popover").options.html = true;
                    itm.popover("show");
                    itm.parent().find('.popover-content').on('click', function (ev) { ev.stopPropagation(); ev.preventDefault(); });
                    itm.parent().find('.cronExpression').jqCron({
                        enabled_minute: true,
                        multiple_dom: true, multiple_month: true, multiple_mins: true,
                        multiple_dow: true, multiple_time_hours: true, multiple_time_minutes: true,
                        default_period: 'week', no_reset_button: true,
                        lang: 'en'
                    });
                    itm.parent().find('button.cncl').on('click', function (ev) {
                        itm.popover("destroy");
                        ev.stopPropagation();
                        ev.preventDefault();
                    });
                    itm.parent().find('button.acpt').on('click', function (ev) {
                        input.val(itm.parent().find('.cronExpression').data('jqCron').getCron());
                        itm.popover("destroy");
                        ev.stopPropagation();
                        ev.preventDefault();
                    });
                }
                showCoordGenerator(itm, tag) {
                    let input = $(this).find('input');
                    let histObj = new flexygo.nav.FlexygoHistory();
                    histObj.targetid = 'modal1024x800';
                    let modal = flexygo.targets.createContainer(histObj, true, null, true);
                    modal.empty();
                    modal.closest('.ui-dialog').find('.ui-dialog-title').html(flexygo.localization.translate('text.map'));
                    modal.addClass('nopadding');
                    let marker = input.val();
                    let lat = "";
                    let lng = "";
                    var latField = '';
                    var lngField = '';
                    if (tag != '' && marker != '') {
                        var tagArr = tag.split("|");
                        latField = tagArr[0];
                        lngField = tagArr[1];
                        if ((latField != '' && lngField != '') && (lat == '' && lng == '')) {
                            lat = $('flx-text[property =  "' + latField + '"]').val();
                            lng = $('flx-text[property =  "' + lngField + '"]').val().replace(" ", "");
                            modal.append('<input class="srch"  style="width:94.5%;" type="text" placeholder="Search adress"/><button class="srch btn btn-default" type="button" > <i class="flx-icon icon-search " /></button><button class="acpt btn btn-default" type="button" ><i class="flx-icon icon-save-2"/></button><flx-map cluster="false" mode="coord" zoom="3" width="auto" height="96%"><marker lat="' + lat + '" lng="' + lng + '"></marker></flx-map>');
                        }
                    }
                    else if (marker != "") {
                        marker = marker.split(",");
                        lat = marker[0];
                        lng = marker[1].replace(" ", "");
                        modal.append('<input class="srch"  style="width:94.5%;" type="text" placeholder="Search adress"/><button class="srch btn btn-default" type="button" > <i class="flx-icon icon-search " /></button><button class="acpt btn btn-default" type="button" ><i class="flx-icon icon-save-2"/></button><flx-map cluster="false" mode="coord" zoom="3" width="auto" height="96%"><marker lat="' + lat + '" lng="' + lng + '"></marker></flx-map>');
                    }
                    else {
                        modal.append('<input class="srch"  style="width:94.5%;" type="text" placeholder="Search adress"/><button class="srch btn btn-default" type="button" > <i class="flx-icon icon-search" /></button><button class="acpt btn btn-default" type="button" > <i class="flx-icon icon-save-2"/></button><flx-map cluster="false" mode="coord" zoom="3" width="auto" height="96%"></flx-map>');
                    }
                    modal.find('button.acpt').on('click', (ev) => {
                        var coordinate = '';
                        var lat = '';
                        var lng = '';
                        var latField = '';
                        var lngField = '';
                        var mapbt = modal.find('flx-map')[0];
                        if (mapbt.lat != null || mapbt.lng != null) {
                            coordinate = mapbt.lat + ', ' + mapbt.lng;
                        }
                        else if ($(mapbt).attr("lat") != null || $(mapbt).attr("lng") != null) {
                            coordinate = $(mapbt).attr("lat") + ', ' + $(mapbt).attr("lng");
                        }
                        if (tag != '' && coordinate != '') {
                            var coordinateArr = coordinate.split(",");
                            lat = coordinateArr[0];
                            lng = coordinateArr[1].replace(" ", "");
                            var tagArr = tag.split("|");
                            latField = tagArr[0];
                            lngField = tagArr[1];
                        }
                        input.val(coordinate);
                        if ((latField != '' && lngField != '') && (lat != '' && lng != '')) {
                            $('flx-text[property =  "' + latField + '"]').val(lat);
                            $('flx-text[property =  "' + lngField + '"]').val(lng);
                        }
                        modal.closest('.ui-dialog').find('.ui-dialog-titlebar-close').click();
                        this.triggerDependencies();
                    });
                    modal.find('input.srch').on('keydown', function (ev) {
                        if (ev.keyCode === 13) {
                            var address = $(this).parent().find('input.srch').val();
                            if (address != '') {
                                $('flx-map').remove();
                                modal.append('<flx-map cluster="false" mode="coord" zoom="3" width="auto" height="96%"><marker address="' + address + '"></marker></flx-map>');
                            }
                        }
                    });
                    modal.find('button.srch').on('click', function (ev) {
                        var address = $(this).parent().find('input.srch').val();
                        if (address != '') {
                            $('flx-map').remove();
                            modal.append('<flx-map cluster="false" mode="coord" zoom="3" width="auto" height="96%"><marker address="' + address + '"></marker></flx-map>');
                        }
                    });
                }
                setOptions() {
                    let me = $(this);
                    let input = me.find('input');
                    input.on('change.refreshvalue', (e) => {
                        me.attr('value', input.val());
                    });
                    if (this.options && this.options.Name && this.options.Name !== '') {
                        input.attr('name', this.options.Name);
                    }
                    else {
                        input.attr('name', flexygo.utils.uniqueName());
                    }
                    if (me.attr('tab') && me.attr('tab') !== '') {
                        input.attr('tabindex', me.attr('tab'));
                    }
                    if (this.options && this.options.Locked) {
                        input.prop('disabled', this.options.Locked);
                    }
                    if (this.options && this.options.PlaceHolder) {
                        input.attr('PlaceHolder', this.options.PlaceHolder);
                    }
                    if (this.options && this.options.Style) {
                        me.children('div').attr('style', this.options.Style);
                    }
                    if (this.options && this.options.CssClass) {
                        me.children('div').addClass(this.options.CssClass);
                    }
                    if (this.options && this.options.IsRequired) {
                        input.prop('required', this.options.IsRequired);
                    }
                    if (this.options && this.options.IsRequiredMessage) {
                        input.attr('data-msg-required', this.options.IsRequiredMessage);
                    }
                    if (this.options && this.options.Mask) {
                        input.mask(this.options.Mask);
                        input.on('paste', function () {
                            $(this).val('');
                        });
                    }
                    if (this.options && (this.options.CauseRefresh || this.options.SQLValidator != null)) {
                        if (this.type === 'time' || this.type === 'date' || this.type === 'datetime-local') {
                            input.on('focus', (e) => {
                                me.attr('old', this.getValue());
                            });
                            input.on('blur', (e) => {
                                if (this.getValue() != me.attr('old')) {
                                    let ev = {
                                        class: "property",
                                        type: "changed",
                                        sender: this,
                                        masterIdentity: this.property
                                    };
                                    if (this.type === 'date') {
                                        if (this.getValue() == null || (this.getValue().getFullYear() >= 1900 && this.getValue().getFullYear() <= 2079)) {
                                            flexygo.events.trigger(ev);
                                        }
                                    }
                                    else {
                                        flexygo.events.trigger(ev);
                                    }
                                }
                            });
                        }
                        else {
                            input.on('change', (e) => {
                                let ev = {
                                    class: "property",
                                    type: "changed",
                                    sender: this,
                                    masterIdentity: this.property
                                };
                                flexygo.events.trigger(ev);
                            });
                        }
                    }
                    if (this.options && this.options.DecimalPlaces && this.options.DecimalPlaces.toString() !== '' && (this.options.DecimalPlaces > 0)) {
                        let step = '0.';
                        for (let i = 1; i <= this.options.DecimalPlaces; i++) {
                            if (i === this.options.DecimalPlaces) {
                                step += '1';
                            }
                            else {
                                step += '0';
                            }
                        }
                        input.attr('step', step);
                        input.on('change', (e) => { if ($.isNumeric(this.getValue())) {
                            this.setValue(parseFloat(this.getValue()).toFixed(this.options.DecimalPlaces));
                        } });
                    }
                    if (this.options && this.options.MinValue && this.options.MinValue.toString() !== '') {
                        input.attr('min', this.options.MinValue);
                    }
                    if (this.options && this.options.MaxValue && this.options.MaxValue.toString() !== '') {
                        input.attr('max', this.options.MaxValue);
                    }
                    if (this.options && this.options.MinValueMessage && this.options.MinValueMessage !== '') {
                        input.attr('data-msg-min', this.options.MinValueMessage);
                    }
                    if (this.options && this.options.MaxValueMessage && this.options.MaxValueMessage !== '') {
                        input.attr('data-msg-max', this.options.MaxValueMessage);
                    }
                    if (this.options && this.options.RegExp && this.options.RegExp !== '') {
                        input.attr('regex', this.options.RegExp);
                    }
                    if (this.options && this.options.RegExpText && this.options.RegExpText !== '') {
                        input.attr('data-msg-regex', this.options.RegExpText);
                    }
                    if (this.options && this.options.ValidatorMessage && this.options.ValidatorMessage !== '') {
                        input.attr('data-msg-sqlvalidator', this.options.ValidatorMessage);
                    }
                    if (this.options && this.options.Hide) {
                        me.addClass("hideControl");
                    }
                    input.attr('autocomplete', 'off');
                }
                setValue(value) {
                    let me = $(this);
                    if (me.attr('mode') && me.attr('mode').toLowerCase() === 'view') {
                        this.setValueView(value);
                        me.attr('value', value);
                    }
                    else {
                        let input = me.find('input');
                        if (this.type === 'date' && !(value === null)) {
                            input.attr('type', 'date');
                            value = moment.utc(value).format('YYYY-MM-DD');
                        }
                        else if (this.type === 'datetime-local' && !(value === null)) {
                            input.attr('type', 'datetime-local');
                            value = moment.utc(value).format('YYYY-MM-DD[T]HH:mm');
                        }
                        if (this.type === 'time' && !(value === null)) {
                            input.attr('type', 'time');
                            if (typeof value == 'object') {
                                value = moment.utc(value).format('HH:mm:ss');
                            }
                        }
                        if (this.type === 'number' && $.isNumeric(value) && this.options && this.options.DecimalPlaces && this.options.DecimalPlaces.toString() !== '' && (this.options.DecimalPlaces > 0)) {
                            value = parseFloat(value).toFixed(this.options.DecimalPlaces);
                        }
                        me.attr('value', value);
                        input.val(value);
                    }
                }
                setValueView(value) {
                    this.value = value;
                    let input = $(this).find('label');
                    if (this.type === 'number' && $.isNumeric(value) && this.options && this.options.DecimalPlaces && this.options.DecimalPlaces.toString() !== '' && (this.options.DecimalPlaces > 0) && value !== null) {
                        value = parseFloat(value).toFixed(this.options.DecimalPlaces);
                    }
                    else if (this.type === 'date' && value !== null) {
                        value = moment.utc(value).locale(flexygo.profiles.culture).format('L');
                    }
                    else if (this.type === 'datetime-local' && value !== null) {
                        value = moment.utc(value).locale(flexygo.profiles.culture).format('L LT');
                    }
                    input.html(value);
                }
                getValue() {
                    let me = $(this);
                    if (me.attr('mode') && me.attr('mode').toLowerCase() === 'view') {
                        return this.value;
                    }
                    let input = me.find('input');
                    if (input.val() === '') {
                        return null;
                    }
                    if (this.type === 'date') {
                        var utcDate = moment.utc(input.val());
                        var date = new Date(Date.UTC(utcDate.year(), utcDate.month(), utcDate.date(), utcDate.hours(), utcDate.minutes(), utcDate.seconds(), utcDate.milliseconds()));
                        return date;
                    }
                    else {
                        return input.val();
                    }
                }
                /**
                * Trigger Dependencies.
                * @method triggerDependencies
                */
                triggerDependencies() {
                    let me;
                    let input;
                    me = $(this);
                    input = me.find('input');
                    input.trigger('change');
                }
            }
            wc.FlxTextElement = FlxTextElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-text', flexygo.ui.wc.FlxTextElement);
//# sourceMappingURL=flx-text.js.map