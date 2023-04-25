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
        * Library for the FlxTagElement web component.
        *
        * @class FlxTagElement
        * @constructor
        * @return {FlxTagElement}
        */
            class FlxTagElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                    * Set when component is attached to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                    this.type = 'text';
                    this.options = null;
                    this.dropOptions = null;
                    this.property = null;
                    this.value = null;
                    this.isDefaultValue = true;
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
                        if (!this.options.Separator) {
                            this.options.Separator = ';';
                        }
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
                    let Options = element.find('option');
                    if (Options.length > 0) {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.dropOptions = [];
                        for (let i = 0; i < Options.length; i++) {
                            let text = $(Options[i]).text();
                            let value = $(Options[i]).val();
                            if (typeof text === 'undefined' || text === null) {
                                text = value;
                            }
                            this.dropOptions.push(text);
                        }
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
                    this.init();
                    let Value = element.attr('Value');
                    if (Value && Value !== '') {
                        this.setValue(Value);
                    }
                    this.isDefaultValue = false;
                    this.connected = true;
                }
                /**
              * Array of observed attributes.
              * @property observedAttributes {Array}
              */
                static get observedAttributes() {
                    return ['type', 'property', 'required', 'separator', 'disabled', 'requiredmessage', 'style', 'class', 'placeholder', 'iconclass', 'hide', 'regexp', 'regexptext'];
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
                        element.find('div:not(.bootstrap-tagsinput)>input').prop('required', this.options.IsRequired);
                    }
                    if (attrName.toLowerCase() === 'separator' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Separator = newVal;
                        this.refresh();
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
                    if (attrName.toLowerCase() === 'hide' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Hide = newVal;
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
                    let iconsLeft;
                    let iconsRight = this.getIconButtons();
                    let control = $('<div>');
                    let input = $('<input firstControl type="' + this.type + '" class="form-control" />');
                    if (this.options && this.options.IconClass && this.options.IconClass !== '') {
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
                    input.on('itemAdded', (event) => {
                        if (this.options.RegExp && event.item) {
                            let regExp = new RegExp(this.options.RegExp);
                            if (!regExp.test(event.item)) {
                                let values = input.tagsinput()[0].$container.find('> span');
                                values.filter((i) => {
                                    return $(values[i]).text() === event.item;
                                }).removeClass('label-info').addClass('label-danger');
                            }
                            //$(input).valid();
                        }
                        const module = me.closest('flx-module')[0];
                        if (this.options.SQLValidator || (module && module.moduleConfig && module.moduleConfig.PropsEventDependant && module.moduleConfig.PropsEventDependant.includes(this.property))) {
                            let ev = {
                                class: "property",
                                type: "changed",
                                sender: this,
                                masterIdentity: this.property
                            };
                            flexygo.events.trigger(ev);
                        }
                    });
                    me.html(control);
                    this.setOptions();
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
                                    this.setValue(this.appendValue(value));
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
                            flexygo.nav.openPage('view', parseEdit(this.options.ObjNameLink, editCtl, this), editCtl.parseEditString(this.options.ObjWhereLink, editCtl, this), null, this.options.TargetIdLink);
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
                                        $(document).find('flx-edit[objectname="' + this.options.AllowNewObject + '"]').closest(".ui-dialog").remove();
                                    }
                                });
                                flexygo.nav.openPage('edit', parseEdit(this.options.AllowNewObject, editCtl, this), null, null, 'modal');
                            }
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
                appendValue(value) {
                    let oldValue = this.getValue();
                    if (oldValue && oldValue !== '') {
                        return oldValue + this.options.Separator + value;
                    }
                    else {
                        return value;
                    }
                }
                setOptions() {
                    let me = $(this);
                    let input = me.find('input');
                    input.on('change.refreshvalue', (e) => {
                        me.attr('value', input.tagsinput('items').join(this.options.Separator));
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
                    const module = me.closest('flx-module')[0];
                    if ((this.options && this.options.CauseRefresh) || (module && module.moduleConfig && module.moduleConfig.PropsEventDependant && module.moduleConfig.PropsEventDependant.includes(this.property))) {
                        input.on('change', () => {
                            //$(document).trigger('refreshProperty', [input.closest('flx-edit'), this.options.Name]);
                            if (this.isDefaultValue)
                                return;
                            let ev = {
                                class: "property",
                                type: "changed",
                                sender: this,
                                masterIdentity: this.property
                            };
                            flexygo.events.trigger(ev);
                        });
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
                    if (this.options && this.options.Hide) {
                        me.addClass("hideControl");
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
                    if (this.options && this.options.DropDownValues) {
                        this.dropOptions = [];
                        for (let i = 0; i < this.options.DropDownValues.length; i++) {
                            let text = this.options.DropDownValues[i].Value;
                            let value = this.options.DropDownValues[i].Key;
                            if (typeof text === 'undefined' || text === null) {
                                text = value;
                            }
                            this.dropOptions.push(text);
                        }
                    }
                    if (this.dropOptions) {
                        input.tagsinput({
                            delimiter: this.options.Separator, confirmKeys: [13],
                            typeaheadjs: {
                                source: this.getOptions(this.dropOptions)
                            },
                            freeInput: false
                        });
                    }
                    else {
                        input.tagsinput({
                            delimiter: this.options.Separator, confirmKeys: [13]
                        });
                    }
                }
                setValue(value) {
                    let me = $(this);
                    if (me.attr('mode') && me.attr('mode').toLowerCase() === 'view') {
                        this.setValueView(value);
                    }
                    else {
                        let input = me.find('[firstControl]');
                        input.tagsinput('removeAll');
                        input.tagsinput('add', value);
                        me.attr('value', value);
                    }
                }
                setValueView(value) {
                    let me = $(this);
                    let input = me.find('label');
                    this.value = value;
                    if (this.options && this.options.Separator && this.options.Separator != '') {
                        value = value.split(this.options.Separator);
                        input.html('<span>' + value.join('</span> <span>') + '</span>');
                        input.find('span').addClass('tag label label-info');
                    }
                    else {
                        input.html(value);
                    }
                }
                getValue() {
                    let me = $(this);
                    if (me.attr('mode') && me.attr('mode').toLowerCase() === 'view') {
                        return this.value;
                    }
                    else {
                        let input = me.find('[firstControl]');
                        if (input.val() === '') {
                            return null;
                        }
                        let arr = input.tagsinput('items');
                        if (arr && arr.constructor === Array) {
                            return arr.join(this.options.Separator);
                        }
                        else {
                            return null;
                        }
                    }
                }
                getSeparator() {
                    return this.options.Separator;
                }
                getOptions(strs) {
                    return function findMatches(q, cb) {
                        let matches, substringRegex;
                        matches = [];
                        let substrRegex = new RegExp(q, 'i');
                        $.each(strs, (i, str) => {
                            if (substrRegex.test(str)) {
                                matches.push(str);
                            }
                        });
                        cb(matches);
                    };
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
            wc.FlxTagElement = FlxTagElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-tag', flexygo.ui.wc.FlxTagElement);
//# sourceMappingURL=flx-tag.js.map