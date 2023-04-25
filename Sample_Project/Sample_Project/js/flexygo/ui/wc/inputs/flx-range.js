/**
 * @namespace flexygo.ui.wc
 */
var flexygo;
(function (flexygo) {
    var ui;
    (function (ui) {
        var wc;
        (function (wc) {
            class FlxRangeMinMax {
            }
            /**
            * Library for the FlxRangeElement web component.
            *
            * @class FlxRangeElement
            * @constructor
            * @return {FlxRangeElement}
            */
            class FlxRangeElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                   * Set when component is attached to DOM
                   * @property connected {boolean}
                   */
                    this.connected = false;
                    this.options = null;
                    this.type = 'text';
                    this.property = null;
                    this.value = null;
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = $(this);
                    this.type = element.attr('type') || 'text';
                    element.removeAttr('type');
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
                        }
                        this.property = propName;
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
                    let Mask = element.attr('Mask');
                    if (Mask && Mask != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Mask = Mask;
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
                    let MinValue = element.attr('MinValue');
                    if (MinValue && MinValue != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.MinValue = MinValue;
                    }
                    let MaxValue = element.attr('MaxValue');
                    if (MaxValue && MaxValue != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.MaxValue = MaxValue;
                    }
                    let MaxValueMessage = element.attr('MaxValueMessage');
                    if (MaxValueMessage && MaxValueMessage != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.MaxValueMessage = MaxValueMessage;
                    }
                    let MinValueMessage = element.attr('MinValueMessage');
                    if (MinValueMessage && MinValueMessage != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.MinValueMessage = MinValueMessage;
                    }
                    let RegExp = element.attr('RegExp');
                    if (RegExp && RegExp != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.RegExp = RegExp;
                    }
                    let RegExpText = element.attr('RegExpText');
                    if (RegExpText && RegExpText != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.RegExpText = RegExpText;
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
                    let HelpId = element.attr('HelpId');
                    if (HelpId && HelpId != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.HelpId = HelpId;
                    }
                    let AllowNewFunction = element.attr('AllowNewFunction');
                    if (AllowNewFunction && AllowNewFunction != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.AllowNewFunction = AllowNewFunction;
                    }
                    let AllowNewObject = element.attr('AllowNewObject');
                    if (AllowNewObject && AllowNewObject != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.AllowNewObject = AllowNewObject;
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
                    this.init();
                    let Value = element.attr('Value');
                    if (Value && Value != '') {
                        if (Value.includes("|")) {
                            var res = Value.split("|");
                            this.setValue(res[0], res[1]);
                        }
                        else {
                            this.setValue(Value);
                        }
                    }
                    this.connected = true;
                }
                /**
               * Array of observed attributes.
               * @property observedAttributes {Array}
               */
                static get observedAttributes() {
                    return ['type', 'property', 'required', 'disabled', 'requiredmessage', 'mask', 'style', 'class', 'decimalplaces', 'minvalue', 'maxvalue', 'maxvaluemessage', 'minvaluemessage', 'regexp', 'regexptext', 'placeholder', 'iconclass', 'helpid', 'allownewfunction', 'allownewobject'];
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
                        element.find('input').prop('required', this.options.IsRequired);
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
                    if (attrName.toLowerCase() == 'mask' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Mask = newVal;
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
                    if (attrName.toLowerCase() == 'minvalue' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.MinValue = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() == 'maxvalue' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.MaxValue = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() == 'maxvaluemessage' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.MaxValueMessage = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() == 'minvaluemessage' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.MinValueMessage = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() == 'regexp' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.RegExp = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() == 'regexptext' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.RegExpText = newVal;
                        this.refresh();
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
                    if (attrName.toLowerCase() == 'helpid' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.HelpId = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() == 'allownewfunction' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.AllowNewFunction = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() == 'allownewobject' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.AllowNewObject = newVal;
                        this.refresh();
                    }
                }
                refresh() {
                    let val = this.getValue();
                    this.init();
                    if (val && val != "") {
                        this.setValue(val);
                    }
                }
                init() {
                    let me = $(this);
                    //let iconsRight = this.getIconButtons();
                    let control = $('<div>');
                    if (this.type == 'date' || this.type == 'datetime-local') {
                        if (this.type === 'datetime-local' && me.closest('flx-module')[0] && me.closest('flx-module')[0].getAttribute('moduleName') === 'LoginsAndLocations') {
                            control = $('<div style="width: 300px;">');
                        }
                        this.inputmin = $('<input type="text" onfocus="(this.type=\'' + this.type + '\')" class="form-control" />');
                        this.inputmax = $('<input type="text" onfocus="(this.type=\'' + this.type + '\')" class="form-control" />');
                    }
                    else {
                        this.inputmin = $('<input type="' + this.type + '" class="form-control" />');
                        this.inputmax = $('<input type="' + this.type + '" class="form-control" />');
                    }
                    control.append(this.inputmin);
                    control.append(this.inputmax);
                    control.find('input').on('change', ev => {
                        let input = ev.currentTarget;
                        input.setAttribute('value', input.value);
                    });
                    //if (iconsRight) {
                    //    control.append(iconsRight)
                    //    control.addClass("input-group");
                    //}
                    me.html(control);
                    this.setOptions();
                }
                //getIconButtons():JQuery {
                //    let me = $(this);
                //    let ret = $('<div class="input-group-btn" />');
                //    let editCtl = (<flexygo.ui.wc.FlxEditElement>me.closest('flx-edit, flx-list')[0]);
                //    let parseEdit = function (val, ctx) { return val };
                //    if (editCtl && editCtl.parseEditString) {
                //        parseEdit = editCtl.parseEditString;
                //    }
                //    if (this.options && (this.options.SearchCollection || this.options.SearchFunction)) {
                //        let icon1 = $('<button class="btn btn-default" type="button"><i class="flx-icon icon-search" /></button>').on('click', (e:JQueryEventObject) => {
                //            if (this.options.SearchFunction) {
                //                flexygo.utils.execDynamicCode.call(this, parseEdit(this.options.SearchFunction, editCtl));
                //            }
                //            if (this.options.SearchCollection && this.options.SearchCollection !== '') {
                //                flexygo.events.on(this, "entity", "selected", (e: flexygo.events.FlexygoEvent) => {
                //                    flexygo.events.off(this, "entity", "selected");
                //                    let entity = e.sender;
                //                    let config = entity.getConfig();
                //                    let value = entity.data[config.KeyFields[0]].Value;
                //                    if (this.options.SearchReturnFields && this.options.SearchReturnFields !== '') { value = entity.data[this.options.SearchReturnFields].Value; }
                //                    this.setValue(value);
                //                    this.triggerDependencies();
                //                    $(document).find('flx-search[objectname="' + this.options.SearchCollection + '"]').closest(".ui-dialog").remove();
                //                });
                //                flexygo.nav.openPage('search', parseEdit(this.options.SearchCollection, editCtl), parseEdit(this.options.SearchWhere, editCtl), null, 'modal');
                //            }
                //        });
                //        ret.append(icon1);
                //    }
                //    //if (this.options && this.options.ObjNameLink && this.options.ObjWhereLink) {
                //    //    let icon1 = $('<button class="btn btn-default" type="button"><i class="flx-icon icon-link" /></button>').on('click', (e: JQueryEventObject) => {
                //    //        flexygo.nav.openPage('view', parseEdit(this.options.ObjNameLink), parseEdit(this.options.ObjWhereLink), null, this.options.TargetIdLink)
                //    //    });
                //    //    ret.append(icon1);
                //    //}
                //    //if (this.options && (this.options.AllowNewFunction || this.options.AllowNewObject)) {
                //    //    let icon1 = $('<button class="btn btn-default" type="button"><i class="fa fa-plus" /></button>').on('click', (e: JQueryEventObject) => {
                //    //        if (this.options.AllowNewFunction) {
                //    //            flexygo.utils.execDynamicCode.call(this, parseEdit(this.options.AllowNewFunction));
                //    //        }
                //    //        if (this.options.AllowNewObject && this.options.AllowNewObject != '') {
                //    //            flexygo.nav.openPage('edit', parseEdit(this.options.AllowNewObject), null, null, 'modal')
                //    //        }
                //    //    });
                //    //    ret.append(icon1);
                //    //}
                //    //if (this.options && this.options.HelpId) {
                //    //    let icon1 = $('<button class="btn btn-default" type="button"><i class="flx-icon icon-help-2" /></button>').on('click', (e:JQueryEventObject) => {
                //    //        flexygo.nav.openHelpId(this.options.HelpId);
                //    //    });
                //    //    ret.append(icon1);
                //    //}
                //    if (ret.html() == '') { return null; }
                //    else {
                //        return ret;
                //    }
                //}
                setOptions() {
                    let me = $(this);
                    let input = me.find('input');
                    input.on('change.refreshvalue', () => {
                        me.attr('value', input.val());
                    });
                    if (this.options && this.options.Name && this.options.Name != '') {
                        input.attr('name', this.options.Name);
                    }
                    else {
                        input.attr('name', flexygo.utils.uniqueName());
                    }
                    if (me.attr('tab') && me.attr('tab') != '') {
                        input.attr('tabindex', me.attr('tab'));
                    }
                    if (this.options && this.options.Locked) {
                        input.prop('disabled', this.options.Locked);
                    }
                    if (this.options && this.options.PlaceHolder) {
                        this.inputmin.attr('PlaceHolder', this.options.PlaceHolder + ' min.');
                        this.inputmax.attr('PlaceHolder', this.options.PlaceHolder + ' max.');
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
                    }
                    const module = me.closest('flx-module')[0];
                    if ((this.options && this.options.CauseRefresh) || (module && module.moduleConfig && module.moduleConfig.PropsEventDependant && module.moduleConfig.PropsEventDependant.includes(this.property))) {
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
                    if (this.options && this.options.DecimalPlaces && this.options.DecimalPlaces.toString() != '' && this.options.DecimalPlaces > 0) {
                        let step = '0.';
                        for (let i = 1; i <= this.options.DecimalPlaces; i++) {
                            if (i == this.options.DecimalPlaces) {
                                step += '1';
                            }
                            else {
                                step += '0';
                            }
                        }
                        input.attr('step', step);
                        input.on('change', () => {
                            this.value = parseFloat(this.value).toFixed(this.options.DecimalPlaces);
                        });
                    }
                    if (this.options && this.options.MinValue && this.options.MinValue.toString() != '') {
                        input.attr('min', this.options.MinValue);
                    }
                    if (this.options && this.options.MaxValue && this.options.MaxValue.toString() != '') {
                        input.attr('max', this.options.MaxValue);
                    }
                    if (this.options && this.options.MinValueMessage && this.options.MinValueMessage != '') {
                        input.attr('data-msg-min', this.options.MinValueMessage);
                    }
                    if (this.options && this.options.MaxValueMessage && this.options.MaxValueMessage != '') {
                        input.attr('data-msg-max', this.options.MaxValueMessage);
                    }
                    if (this.options && this.options.RegExp && this.options.RegExp != '') {
                        input.attr('regex', this.options.RegExp);
                    }
                    if (this.options && this.options.RegExpText && this.options.RegExpText != '') {
                        input.attr('data-msg-regex', this.options.RegExpText);
                    }
                }
                setValue(valorMin, valorMax) {
                    if (valorMin == null || valorMin == '') {
                        this.inputmin.val('');
                    }
                    else if (this.type == 'date') {
                        this.inputmin.attr('type', this.type);
                        this.inputmin.val(moment(valorMin).format('YYYY-MM-DD'));
                    }
                    else if (this.type == 'datetime-local') {
                        this.inputmin.attr('type', this.type);
                        this.inputmin.val(moment(valorMin).format('YYYY-MM-DD hh:mm'));
                    }
                    else {
                        this.inputmin.val(valorMin);
                    }
                    if (valorMax == null || valorMax == '') {
                        this.inputmax.val('');
                    }
                    else if (this.type == 'date') {
                        this.inputmax.attr('type', this.type);
                        this.inputmax.val(moment(valorMax).format('YYYY-MM-DD'));
                    }
                    else if (this.type == 'datetime-local') {
                        this.inputmax.attr('type', this.type);
                        this.inputmax.val(moment(valorMax).format('YYYY-MM-DD hh:mm'));
                    }
                    else {
                        this.inputmax.val(valorMax);
                    }
                }
                getValue() {
                    let value = new FlxRangeMinMax();
                    value.min = null;
                    value.max = null;
                    if (this.inputmin.val() != '') {
                        if (this.type == 'date') {
                            value.min = moment(new Date(this.inputmin.val())).format('YYYY-MM-DD') + ' 00:00';
                        }
                        else {
                            value.min = this.inputmin.val();
                        }
                    }
                    if (this.inputmax.val() != '') {
                        if (this.type == 'date') {
                            value.max = moment(new Date(this.inputmax.val())).format('YYYY-MM-DD') + ' 00:00';
                        }
                        else {
                            value.max = this.inputmax.val();
                        }
                    }
                    if (value.min == null) {
                        value.min = '';
                    }
                    if (value.max == null) {
                        value.max = '';
                    }
                    return value.min + '|' + value.max;
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
            wc.FlxRangeElement = FlxRangeElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-range', flexygo.ui.wc.FlxRangeElement);
//# sourceMappingURL=flx-range.js.map