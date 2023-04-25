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
            * Library for the FlxRadioElement web component.
            *
            * @class FlxRadioElement
            * @constructor
            * @return {FlxRadioElement}
            */
            class FlxRadioElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                    * Set when component is attached to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                    this.property = null;
                    this.type = 'radio';
                    this.options = null;
                    this.value = null;
                    this.name = null;
                }
                ;
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
                    let ValidatorMessage = element.attr('ValidatorMessage');
                    if (ValidatorMessage && ValidatorMessage !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.ValidatorMessage = ValidatorMessage;
                    }
                    this.init();
                    let Value = element.attr('Value');
                    let Text = element.attr('Text');
                    if (Value && Value !== '') {
                        this.setValue(Value, Text);
                    }
                    this.connected = true;
                }
                /**
               * Array of observed attributes. REQUIRED
               * @property observedAttributes {Array}
               */
                static get observedAttributes() {
                    return ['type', 'property', 'required', 'disabled', 'multiple', 'separator', 'requiredmessage', 'style', 'class', 'iconclass', 'hide', 'validatormessage'];
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
                        let parentCtl = element.closest('flx-edit, flx-list,flx-propertymanager');
                        if (parentCtl && parentCtl.length > 0) {
                            let wcParent = parentCtl[0];
                            this.options = jQuery.extend(true, {}, wcParent.properties[propName]);
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
                    if (attrName.toLowerCase() === 'multiple') {
                        if (typeof element.attr('multiple') !== 'undefined') {
                            if (!this.options) {
                                this.options = new flexygo.api.ObjectProperty();
                            }
                            this.options.Multiple = true;
                        }
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'separator' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Separator = newVal;
                        this.refresh();
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
                        if (element.attr('Control-Class') !== this.options.Style) {
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
                    if (attrName.toLowerCase() === 'iconclass' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IconClass = newVal;
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
                    let txt = $(this).attr('Text');
                    this.init();
                    if (val && val != "") {
                        this.setValue(val, txt);
                    }
                }
                init() {
                    if (this.options) {
                        let control = $('<div>');
                        $(this).html(control);
                        this.setOptions();
                    }
                }
                setOptions() {
                    let me = $(this);
                    let control = me.find('div');
                    let label;
                    let input;
                    if (this.options && this.options.Name && this.options.Name !== '') {
                        this.name = this.options.Name;
                    }
                    else {
                        this.name = flexygo.utils.uniqueName();
                    }
                    let name = this.name;
                    if (this.options && this.options.DropDownValues) {
                        let checked = control.find('input:checked');
                        control.empty();
                        for (let i = 0; i < this.options.DropDownValues.length; i++) {
                            label = $('<label />');
                            if (this.options.Multiple) {
                                input = $('<input type="checkbox">');
                                name = this.options.DropDownValues[i][this.options.SQLDisplayField];
                            }
                            else {
                                input = $('<input type="radio">');
                            }
                            if (me.attr('tabindex') && me.attr('tabindex') !== '') {
                                input.attr('tabindex', me.attr('tabindex'));
                            }
                            input.attr('value', this.options.DropDownValues[i][this.options.SQLValueField]).attr('name', name);
                            label.append(input).append(this.options.DropDownValues[i][this.options.SQLDisplayField]);
                            control.append(label);
                        }
                        checked.map((i, e) => {
                            let checkInput = control.find('input[value="' + e.value + '"]')[0];
                            if (checkInput)
                                checkInput.checked = true;
                        });
                    }
                    else if (this.options.HTMLDropDownValues) {
                        for (let j = 0; j < this.options.HTMLDropDownValues.length; j++) {
                            let opt = $(this.options.HTMLDropDownValues[j]);
                            label = $('<label />');
                            if (this.options.Multiple) {
                                input = $('<input type="checkbox">');
                            }
                            else {
                                input = $('<input type="radio">');
                            }
                            input.attr('value', opt.val()).attr('name', this.name);
                            label.append(input).append(opt.text());
                            control.append(label);
                        }
                    }
                    if (typeof (input) !== 'undefined') {
                        input.on('blur', () => { me.trigger('blur'); });
                    }
                    const module = me.closest('flx-module')[0];
                    if ((this.options && (this.options.CauseRefresh && this.options.SQLValidator)) || (module && module.moduleConfig && module.moduleConfig.PropsEventDependant && module.moduleConfig.PropsEventDependant.includes(this.property))) {
                        control.find('input').off('change').on('change', () => {
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
                        control.find('input').prop('disabled', this.options.Locked);
                    }
                    if (me.attr('mode') && me.attr('mode').toLowerCase() === 'view') {
                        control.find('input').prop('disabled', true);
                    }
                    if (this.options.Style) {
                        me.children('div').attr('style', this.options.Style);
                    }
                    if (this.options.CssClass) {
                        me.children('div').addClass(this.options.CssClass);
                    }
                    if (this.options && this.options.IsRequired) {
                        control.find('input').prop('required', this.options.IsRequired);
                    }
                    if (this.options && this.options.IsRequiredMessage) {
                        control.find('input').attr('data-msg-required', this.options.IsRequiredMessage);
                    }
                    if (this.options && this.options.Hide) {
                        me.addClass("hideControl");
                    }
                    if (this.options && this.options.ValidatorMessage && this.options.ValidatorMessage !== '') {
                        control.find('input').attr('data-msg-sqlvalidator', this.options.ValidatorMessage);
                    }
                    control.find('input[type="radio"]').off('click').on('click', (e) => {
                        let inp = $(e.currentTarget);
                        if (inp.attr('lastvalue') === 'true') {
                            inp.prop('checked', false);
                        }
                        inp.closest('div').find('input').attr('lastvalue', 'false');
                        inp.attr('lastvalue', inp.prop('checked'));
                    });
                }
                changeSQLData(newSQL, newOptions) {
                    this.options.SQLSentence = newSQL;
                    this.options.SQLEditSentence = newSQL;
                    this.options.DropDownValues = newOptions;
                    this.setOptions();
                }
                setValue(value, text) {
                    let me = $(this);
                    let input;
                    let label;
                    //if (me.attr('mode') && me.attr('mode').toLowerCase() === 'view') {
                    //    this.setValueView(value);
                    //} else {
                    if (this.options.Multiple) {
                        if (!flexygo.utils.isBlank(value)) {
                            let opt = value.toString().split(this.options.Separator);
                            for (let i = 0; i < opt.length; i++) {
                                if (me.attr('mode') && me.attr('mode').toLowerCase() === 'view') {
                                    me.find('input[value="' + opt[i] + '"]').prop('checked', true).prop('disabled', true);
                                }
                                else {
                                    if (me.find('input[value="' + opt[i] + '"]').length === 0) {
                                        label = $('<label />');
                                        input = $('<input type="checkbox">');
                                        input.attr('value', opt[i]).attr('name', this.name);
                                        label.append(input).append(opt[i]);
                                        me.find('div').append(label);
                                    }
                                    me.find('input[value="' + opt[i] + '"]').prop('checked', true);
                                    me.attr('value', value);
                                }
                            }
                        }
                    }
                    else {
                        if (text === '' || text === null) {
                            text = value;
                        }
                        if (me.find('input[value="' + value + '"]').length === 0 && !flexygo.utils.isBlank(value)) {
                            label = $('<label />');
                            input = $('<input type="radio">');
                            input.attr('value', value).attr('name', this.name);
                            label.append(input).append(text);
                            me.find('div').append(label);
                            me.find('div').find('input[type="radio"]').off('click');
                            me.find('div').find('input[type="radio"]').on('click', (e) => {
                                let inp = $(e.currentTarget);
                                if (inp.attr('lastvalue') === 'true') {
                                    inp.prop('checked', false);
                                }
                                inp.closest('div').find('input').attr('lastvalue', 'false');
                                inp.attr('lastvalue', inp.prop('checked'));
                            });
                        }
                        me.find('input[value="' + value + '"]').prop('checked', true);
                        me.attr('value', value);
                    }
                    //}
                }
                setValueView(value) {
                    this.value = value;
                    let me = $(this);
                    let input = me.find('label');
                    input.html(value);
                }
                getValue() {
                    let me = $(this);
                    //if (me.attr('mode') && me.attr('mode').toLowerCase() === 'view') {
                    //    return this.value;
                    //}
                    let input = me.find('input:checked');
                    if (input.length === 0 || input.val() === '') {
                        return null;
                    }
                    else if (input.length === 1) {
                        return input.val();
                    }
                    else {
                        return input.map((i, e) => { return e.value; }).get().join(this.options.Separator);
                    }
                }
                /**
                * Trigger Dependencies.
                * @method triggerDependencies
                */
                triggerDependencies() {
                    let me;
                    let control;
                    let input;
                    me = $(this);
                    control = me.find('div');
                    input = control.find('input');
                    input.trigger('change');
                }
            }
            wc.FlxRadioElement = FlxRadioElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-radio', flexygo.ui.wc.FlxRadioElement);
//# sourceMappingURL=flx-radio.js.map