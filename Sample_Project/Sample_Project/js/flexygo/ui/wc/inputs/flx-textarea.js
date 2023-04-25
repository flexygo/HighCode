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
            * Library for the FlxTextAreaElement web component.
            *
            * @class FlxTextAreaElement
            * @constructor
            * @return {FlxTextAreaElement}
            */
            class FlxTextAreaElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                   * Set when component is attached to DOM
                   * @property connected {boolean}
                   */
                    this.connected = false;
                    this.options = null;
                    this.property = null;
                    this.value = null;
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
                    this.init();
                    let Value = element.attr('Value');
                    if (Value && Value !== '') {
                        this.setValue(Value);
                    }
                    this.connected = true;
                }
                /**
               * Array of observed attributes.
               * @property observedAttributes {Array}
               */
                static get observedAttributes() {
                    return ['property', 'required', 'disabled', 'requiredmessage', 'style', 'class', 'validatormessage', 'placeholder', 'iconclass', 'minvalue', 'maxvalue', 'maxvaluemessage', 'minvaluemessage', 'helpid', 'hide'];
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
                    if (attrName.toLowerCase() === 'property' && newVal && newVal !== '') {
                        let propName = newVal;
                        let parentCtl = element.closest('flx-edit, flx-list,flx-propertymanager');
                        if (parentCtl && parentCtl.length > 0) {
                            let wcParent = parentCtl[0];
                            this.options = jQuery.extend(true, {}, wcParent.properties[propName]);
                        }
                        this.property = newVal;
                        this.init();
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
                        element.find('textarea').prop('required', this.options.IsRequired);
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
                        element.find('textarea').prop('disabled', this.options.Locked);
                    }
                    if (attrName.toLowerCase() === 'requiredmessage' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IsRequiredMessage = newVal;
                        this.init();
                    }
                    if (attrName.toLowerCase() === 'style' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Style = newVal;
                        if (element.attr('Control-Style') !== this.options.Style) {
                            element.attr('Control-Style', this.options.Style);
                            element.attr('Style', '');
                            this.init();
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
                            this.init();
                        }
                    }
                    if (attrName.toLowerCase() === 'placeholder' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.PlaceHolder = newVal;
                        this.init();
                    }
                    if (attrName.toLowerCase() === 'iconclass' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IconClass = newVal;
                        this.init();
                    }
                    if ((attrName.toLowerCase() === 'minvalue') && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.MinValue = newVal;
                        this.init();
                    }
                    if ((attrName.toLowerCase() === 'maxvalue') && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.MaxValue = newVal;
                        this.init();
                    }
                    if (attrName.toLowerCase() === 'maxvaluemessage' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.MaxValueMessage = newVal;
                        this.init();
                    }
                    if (attrName.toLowerCase() === 'minvaluemessage' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.MinValueMessage = newVal;
                        this.init();
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
                    let val = this.getValue();
                    if (me.attr('mode') && me.attr('mode').toLowerCase() === 'view') {
                        this.initViewMode();
                    }
                    else {
                        this.initEditMode();
                    }
                    if (val && val !== "") {
                        this.setValue(val);
                    }
                    me.find('textarea').off('keydown.textAreaFullScreen').on('keydown.textAreaFullScreen', function (e) {
                        if (e.key == "F11" || e.key == "Escape") {
                            if (e.key == "F11" && !me.find('textarea').hasClass('fullScreenText')) {
                                e.preventDefault();
                                me.find('textarea').addClass("fullScreenText");
                            }
                            else if (me.find('textarea').hasClass('fullScreenText')) {
                                e.preventDefault();
                                me.find('textarea').removeClass("fullScreenText");
                            }
                        }
                    });
                }
                initViewMode() {
                    let me = $(this);
                    let iconsLeft;
                    let iconsRight;
                    let control = $('<div>');
                    me.html(control);
                    let input = $('<label class="form-control input-view" />');
                    control.append(input);
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
                    if (this.options && this.options.IconClass && this.options.IconClass !== '') {
                        iconsLeft = $('<span class="input-group-addon" ><i class="' + this.options.IconClass + '" /></span>');
                    }
                    let control = $('<div>');
                    let input;
                    if (this.options && this.options.MaxNumOfChars && this.options.MaxNumOfChars > 0) {
                        input = $('<textarea class="form-control" maxLength="' + this.options.MaxNumOfChars + '" ></textarea>');
                    }
                    else {
                        input = $('<textarea class="form-control"></textarea>');
                    }
                    input.on('blur', () => {
                        me.trigger('blur');
                    });
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
                    this.setOptions();
                }
                getIconButtons() {
                    let me = $(this);
                    let ret = $('<div class="input-group-btn" />');
                    let icon1;
                    let editCtl = me.closest('flx-edit, flx-list')[0];
                    let parseEdit = function (val, ctx, property) { return val; };
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
                                    $(document).find('flx-search[objectname="' + this.options.SearchCollection + '"]').closest(".ui-dialog").remove();
                                });
                                flexygo.nav.openPage('search', parseEdit(this.options.SearchCollection, editCtl, this), parseEdit(this.options.SearchWhere, editCtl, this), null, 'modal');
                            }
                        });
                        ret.append(icon1);
                    }
                    if (this.options && this.options.ObjNameLink && this.options.ObjWhereLink) {
                        icon1 = $('<button class="btn btn-default" type="button"><i class="flx-icon icon-link" /></button>').on('click', (e) => {
                            flexygo.nav.openPage('view', editCtl.parseEditString(this.options.ObjNameLink, editCtl, this), editCtl.parseEditString(this.options.ObjWhereLink, editCtl, this), null, this.options.TargetIdLink);
                        });
                        ret.append(icon1);
                    }
                    if (this.options && (this.options.AllowNewFunction || this.options.AllowNewObject) && !this.options.Locked) {
                        icon1 = $('<button class="btn btn-default" type="button"><i class="fa fa-plus" /></button>').on('click', (e) => {
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
                                            var config = e.sender.getConfig();
                                            value = entity.data[config.KeyFields[0]].Value;
                                        }
                                        this.setValue(value);
                                        this.triggerDependencies();
                                        flexygo.nav.closePage($(document).find('flx-edit[objectname="' + this.options.AllowNewObject + '"]'));
                                    }
                                });
                                flexygo.nav.openPage('edit', editCtl.parseEditString(this.options.AllowNewObject, editCtl, this), null, editCtl.parseEditString(this.options.AllowNewDefaults, editCtl, this), 'modal');
                            }
                        });
                        ret.append(icon1);
                    }
                    //if (this.options && this.options.HelpId) {
                    //    icon1 = $('<button class="btn btn-default" type="button"><i class="flx-icon icon-help-2" /></button>').on('click', (e:JQueryEventObject) => {
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
                    let input = me.find('textarea');
                    if (this.options && this.options.Name && this.options.Name !== '') {
                        input.attr('name', this.options.Name);
                    }
                    else {
                        input.attr('name', flexygo.utils.uniqueName());
                    }
                    if (me.attr('tab') && me.attr('tab') !== '') {
                        input.attr('tabindex', me.attr('tab'));
                    }
                    const module = me.closest('flx-module')[0];
                    if ((this.options && (this.options.CauseRefresh || this.options.SQLValidator != null)) || (module && module.moduleConfig && module.moduleConfig.PropsEventDependant && module.moduleConfig.PropsEventDependant.includes(this.property))) {
                        input.on('change', (e) => {
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
                    if (this.options && this.options.MinValue && this.options.MinValue.toString() !== '') {
                        input.attr('minlength', this.options.MinValue);
                    }
                    if (this.options && this.options.MaxValue && this.options.MaxValue.toString() !== '') {
                        input.attr('maxlength', this.options.MaxValue);
                    }
                    if (this.options && this.options.MinValueMessage && this.options.MinValueMessage !== '') {
                        input.attr('data-msg-minlength', this.options.MinValueMessage);
                    }
                    if (this.options && this.options.MaxValueMessage && this.options.MaxValueMessage !== '') {
                        input.attr('data-msg-maxlength', this.options.MaxValueMessage);
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
                        me.attr('Value', value);
                    }
                    else {
                        let input = me.find('textarea');
                        input.val(value);
                        me.attr('Value', value);
                    }
                }
                setValueView(value) {
                    this.value = value;
                    let input = $(this).find('label');
                    let regExp = /[&<>"'`=\/]/mi;
                    if (typeof value === 'string' && value !== null && regExp.test(value)) {
                        value = flexygo.string.escapeHTML(value);
                    }
                    input.html(value);
                }
                getValue() {
                    let me = $(this);
                    if (me.attr('mode') && me.attr('mode').toLowerCase() === 'view') {
                        return this.value;
                    }
                    let input = me.find('textarea');
                    if (input.val() === '') {
                        return null;
                    }
                    return flexygo.utils.parser.replaceAll(flexygo.utils.parser.replaceAll(input.val(), '\r', ''), '\n', '\r\n');
                }
                /**
                * Trigger Dependencies.
                * @method triggerDependencies
                */
                triggerDependencies() {
                    let me;
                    let input;
                    me = $(this);
                    input = me.find('textarea');
                    input.trigger('change');
                }
            }
            wc.FlxTextAreaElement = FlxTextAreaElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-textarea', flexygo.ui.wc.FlxTextAreaElement);
//# sourceMappingURL=flx-textarea.js.map