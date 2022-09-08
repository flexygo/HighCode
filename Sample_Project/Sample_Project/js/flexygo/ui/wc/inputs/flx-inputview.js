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
            * Library for the FlxInputViewElement web component.
            *
            * @class FlxInputViewElement
            * @constructor
            * @return {FlxInputViewElement}
            */
            class FlxInputViewElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                        * Set when component is attached to DOM
                        * @property connected {boolean}
                        */
                    this.connected = false;
                    this.type = null;
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
                    this.type = element.attr('type') || 'text';
                    let propName = element.attr('property');
                    if (propName && flexygo.utils.isBlank(this.options)) {
                        let parentCtl = element.closest('flx-view');
                        if (parentCtl && parentCtl.length > 0) {
                            let wcParent = parentCtl[0];
                            this.options = jQuery.extend(true, {}, wcParent.properties[propName]);
                        }
                        this.property = propName;
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
                    let DecimalPlaces = element.attr('DecimalPlaces');
                    if (DecimalPlaces && DecimalPlaces != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.DecimalPlaces = parseInt(DecimalPlaces);
                    }
                    let IconClass = element.attr('IconClass');
                    if (IconClass && IconClass != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IconClass = IconClass;
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
                    let Hide = element.attr('Hide');
                    if (Hide && Hide != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Hide = Hide == 'true';
                    }
                    this.init();
                    let Value = element.attr('Value');
                    if (Value && Value != '') {
                        this.setValue(Value);
                    }
                    this.connected = true;
                }
                /**
               * Array of observed attributes.
               * @property observedAttributes {Array}
               */
                static get observedAttributes() {
                    return ['property', 'style', 'class', 'decimalplaces', 'iconclass', 'helpid', 'hide'];
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
                    if (attrName.toLowerCase() == 'property' && newVal && newVal != '') {
                        let propName = newVal;
                        let parentCtl = element.closest('flx-view');
                        if (parentCtl && parentCtl.length > 0) {
                            let wcParent = parentCtl[0];
                            this.options = jQuery.extend(true, {}, wcParent.properties[propName]);
                        }
                        this.property = newVal;
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
                    if (attrName.toLowerCase() == 'decimalplaces' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.DecimalPlaces = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() == 'iconclass' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IconClass = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() == 'helpid' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.HelpId = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() == 'hide' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Hide = newVal;
                        this.refresh();
                    }
                }
                /**
           * Init the webcomponent.
           * @method init
           */
                init() {
                    this.refresh();
                }
                refresh() {
                    let me = $(this);
                    if (this.options.ControlType) {
                        me.attr('type', this.options.ControlType.toLowerCase());
                    }
                    let iconsLeft;
                    let iconsRight = this.getIconButtons();
                    let control = $('<div>');
                    let input = $('<label class="form-control input-view" />');
                    if (this.options.ControlType.toLowerCase() == 'separator') {
                        input = $('<legend/>');
                        if (this.options && this.options.IconClass && this.options.IconClass != '') {
                            input.append($('<i class="' + this.options.IconClass + '" />'));
                        }
                        input.append(this.options.Label);
                    }
                    if (this.options.ControlType.toLowerCase() == 'image') {
                        input = $('<img class="img-responsive"/>');
                        if (this.options && this.options.CssClass && this.options.CssClass != '') {
                            input.addClass(this.options.CssClass);
                        }
                    }
                    if (this.options && this.options.IconClass && this.options.IconClass != '' && this.options.ControlType.toLowerCase() != 'separator') {
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
                getIconButtons() {
                    let me = $(this);
                    let ret = $('<div class="input-group-btn" />');
                    let editCtl = me.closest('flx-view')[0];
                    if (this.options && this.options.ObjNameLink && this.options.ObjWhereLink) {
                        let icon1 = $('<button class="btn btn-default" type="button"><i class="flx-icon icon-link" /></button>').on('click', () => {
                            flexygo.nav.openPage('view', editCtl.parseEditString(this.options.ObjNameLink), editCtl.parseEditString(this.options.ObjWhereLink), null, this.options.TargetIdLink);
                        });
                        ret.append(icon1);
                    }
                    if (ret.html() == '') {
                        return null;
                    }
                    else {
                        return ret;
                    }
                }
                setOptions() {
                    let me = $(this);
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
                setValue(value, text) {
                    let me = $(this);
                    this.value = value;
                    let input = me.find('label');
                    if (this.options.ControlType) {
                        switch (this.options.ControlType.toLowerCase()) {
                            case 'check':
                            case 'switch':
                                if (text == 'True') {
                                    input.html('<i class="flx-icon icon-checked-1"></i>');
                                }
                                break;
                            case 'image':
                                input = me.find('img');
                                input.attr('src', text);
                                break;
                            default:
                                input.html(text);
                        }
                    }
                    else {
                        input.html(text);
                    }
                }
                getValue() {
                    if (this.options.ControlType == 'date') {
                        return new Date(this.value + ' 00:00');
                    }
                    else {
                        return this.value;
                    }
                }
            }
            wc.FlxInputViewElement = FlxInputViewElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-inputview', flexygo.ui.wc.FlxInputViewElement);
//# sourceMappingURL=flx-inputview.js.map