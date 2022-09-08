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
            * Library for the FlxCheckElement web component.
            *
            * @class FlxCheckElement
            * @constructor
            * @return {FlxCheckElement}
            */
            class FlxCheckElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                    * Set when component is attached to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                    this.options = null;
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = $(this);
                    let isFilter = false;
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
                    if (typeof element.attr('Disabled') != 'undefined') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Locked = true;
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
                    if (!isFilter && Hide && Hide != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        if (Hide == 'true') {
                            this.options.Hide = true;
                        }
                        else {
                            this.options.Hide = false;
                        }
                    }
                    let AllowNull = element.attr('allowNull');
                    if (AllowNull || AllowNull == '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.AllowNull = true;
                    }
                    //check mobile not working cause gridstack fires init two times and lose the value.
                    //let check = element.find('input').prop('checked');          
                    this.init();
                    /*if (check && check !== '') {
                        this.setValue(check);
                    }*/
                    if ((!this.options || !this.options.AllowNull) && typeof element.attr('checked') != 'undefined') {
                        this.setValue(true);
                    }
                    else {
                        if (this.options && this.options.AllowNull) {
                            let val = element.attr('Value');
                            if (val) {
                                if (val.toLowerCase() == 'true' || val.toLowerCase() == 'checked' || val == '1') {
                                    this.setValue(true);
                                }
                                else if (val.toLowerCase() == 'false' || val == '0') {
                                    this.setValue(false);
                                }
                            }
                        }
                        else {
                            let val = element.attr('Value');
                            if (val) {
                                if (val.toLowerCase() == 'true' || val.toLowerCase() == 'checked' || val == '1') {
                                    element.attr('checked', 'checked');
                                    this.setValue(true);
                                }
                                else if (val.toLowerCase() == 'false' || val == '0') {
                                    this.setValue(false);
                                }
                            }
                        }
                    }
                    this.connected = true;
                }
                /**
                * Array of observed attributes.
                * @property observedAttributes {Array}
                */
                static get observedAttributes() {
                    return ['modulename', 'property', 'disabled', 'style', 'class', 'hide', 'allownull'];
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
                    if (attrName.toLowerCase() == 'modulename' && newVal && newVal != '') {
                        this.moduleName = newVal;
                        if (this.moduleName) {
                            this.refresh();
                        }
                        this.init();
                    }
                    if (attrName.toLowerCase() == 'property' && newVal && newVal != '') {
                        let propName = newVal;
                        let parentCtl = element.closest('flx-edit, flx-list,flx-filter,flx-propertymanager');
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
                        this.init();
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
                    if (attrName.toLowerCase() == 'style' && newVal && newVal != '') {
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
                    if (attrName.toLowerCase() == 'class' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.CssClass = newVal;
                        if (element.attr('Control-Class') !== this.options.CssClass) {
                            element.attr('Control-Class', this.options.CssClass);
                            element.attr('Class', '');
                            this.init();
                        }
                    }
                    if (attrName.toLowerCase() == 'hide' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Hide = newVal;
                        this.init();
                    }
                    if (attrName.toLowerCase() == 'allownull' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.AllowNull = newVal;
                        this.init();
                    }
                    if (attrName.toLowerCase() == 'value' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.setValue(newVal);
                    }
                }
                /**
                * Refresh de webcomponent.
                * @method refresh
                */
                refresh() {
                    let val = this.getValue();
                    this.init();
                    if (val && val != "") {
                        this.setValue(val);
                    }
                }
                /**
                * Init the webcomponent.
                * @method init
                */
                init() {
                    //if (me.attr('mode') && me.attr('mode').toLowerCase() == 'view') {
                    //    this.initViewMode();
                    //} else {
                    this.initEditMode();
                    //}
                }
                //initViewMode(): void {
                //    let me = $(this);
                //    let iconsLeft;
                //    let iconsRight;
                //    if (this.options && this.options.ObjNameLink && this.options.ObjWhereLink) {
                //        let editCtl = (<flexygo.ui.wc.FlxViewElement>me.closest('flx-view')[0]);
                //        iconsRight = $('<div class="input-group-btn" />');
                //        let icon1 = $('<button class="btn btn-default" type="button"><i class="flx-icon icon-link" /></button>').on('click', () => {
                //            flexygo.nav.openPage('view', editCtl.parseEditString(this.options.ObjNameLink), editCtl.parseEditString(this.options.ObjWhereLink), null, this.options.TargetIdLink);
                //        });
                //        iconsRight.append(icon1);
                //    }
                //    let control = $('<div class="view-mode">');
                //    me.html(control);
                //    let input = $('<label class="form-control input-view input-view-mode" />');
                //    if (this.options && this.options.IconClass && this.options.IconClass != '') {
                //        iconsLeft = $('<span class="input-group-addon" ><i class="' + this.options.IconClass + '" /></span>');
                //        control.append(iconsLeft);
                //    }
                //    control.append(input);
                //    if (iconsRight) {
                //        control.append(iconsRight);
                //    }
                //    if (iconsLeft || iconsRight ) {
                //        control.addClass("input-group");
                //    }
                //    if (this.options && this.options.Style) {
                //        me.children('div').attr('style', this.options.Style);
                //    }
                //    if (this.options && this.options.CssClass) {
                //        me.children('div').addClass(this.options.CssClass);
                //    }
                //    if (this.options && this.options.Hide) {
                //        me.addClass("hideControl")
                //    }
                //}
                initEditMode() {
                    let me = $(this);
                    let id = flexygo.utils.uniqueId();
                    me.html('<div><input type="checkbox" id="' + id + '"  /><label for="' + id + '"></label></div>');
                    this.setOptions();
                    me.find('div:first').on('click', () => {
                        me.trigger('focusin');
                        me.find('input').focus();
                    });
                }
                setOptions() {
                    let me = $(this);
                    let input = me.find('input');
                    input.on('blur', () => {
                        me.trigger('blur');
                    });
                    if (this.options && this.options.AllowNull) {
                        this.setValue(null);
                    }
                    if (!(me.attr('mode') && me.attr('mode').toLowerCase() === 'view')) {
                        input.on('change.refreshvalue', () => {
                            //three state Check
                            if (this.options && this.options.AllowNull) {
                                switch (input.data('checked')) {
                                    // unchecked, going indeterminate
                                    case 0:
                                        //input.data('checked', 1);
                                        //input.prop('indeterminate', true);
                                        me.attr('value', null);
                                        this.setValue(null);
                                        break;
                                    // indeterminate, going checked
                                    case 1:
                                        //input.data('checked', 2);
                                        //input.prop('indeterminate', false);
                                        //input.prop('checked', true);
                                        me.attr('value', 'true');
                                        this.setValue(true);
                                        break;
                                    // checked, going unchecked
                                    default:
                                        //input.data('checked', 0);
                                        //input.prop('indeterminate', false);
                                        //input.prop('checked', false);
                                        me.attr('value', 'false');
                                        this.setValue(false);
                                }
                            }
                            else {
                                if (input.prop('checked')) {
                                    me.attr('checked', 'true');
                                    me.attr('value', 'true');
                                }
                                else {
                                    me.attr('value', 'false');
                                    me.removeAttr('checked');
                                }
                            }
                        });
                    }
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
                    if (me.attr('mode') && me.attr('mode').toLowerCase() === 'view') {
                        input.prop('disabled', true);
                    }
                    if (this.options && this.options.Style) {
                        me.children('div').attr('style', this.options.Style);
                    }
                    if (this.options && this.options.CssClass) {
                        me.children('div').addClass(this.options.CssClass);
                    }
                    if (this.options && this.options.CauseRefresh) {
                        input.on('change', () => {
                            //$(document).trigger('refreshProperty', [input.closest('flx-edit'), ctx.options.Name]);
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
                }
                setValue(value) {
                    let me = $(this);
                    //if (me.attr('mode') && me.attr('mode').toLowerCase() == 'view') {
                    //    this.setValueView(value);
                    //} else {
                    let input = me.find('input');
                    if (this.options && this.options.AllowNull) {
                        switch (value) {
                            case true:
                            case 'true':
                            case 'True':
                            case '1':
                                input.data('checked', 2);
                                input.prop('indeterminate', false);
                                input.prop('checked', true);
                                break;
                            case false:
                            case 'false':
                            case 'False':
                            case '0':
                                input.data('checked', 0);
                                input.prop('indeterminate', false);
                                input.prop('checked', false);
                                break;
                            default:
                                input.data('checked', 1);
                                input.prop('indeterminate', true);
                        }
                    }
                    else {
                        if (value == 'true' || value == 'True' || value == '1') {
                            value = true;
                        }
                        else if (value == 'false' || value == 'False' || value == '0') {
                            value = false;
                        }
                        input.prop('checked', value);
                        me.attr('value', value);
                    }
                    //}
                }
                //setValueView(value: string): void {
                //    this.value = value;
                //    let input = $(this).find('label');
                //    if (value == null) {
                //        input.html('');
                //    } else if (value.toString().toLowerCase() == 'true' || value.toString() == '1') {
                //        input.html('<i class="flx-icon icon-checked-1 icon-15x"></i>');
                //    } else {
                //        input.html('');
                //    }
                //}
                getValue() {
                    let me = $(this);
                    if (me.attr('mode') && me.attr('mode').toLowerCase() === 'view') {
                        return this.value;
                    }
                    let input = me.find('input');
                    if (this.options && this.options.AllowNull && input.prop('indeterminate') == true) {
                        return null;
                    }
                    else {
                        return input.prop('checked');
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
            wc.FlxCheckElement = FlxCheckElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-check', flexygo.ui.wc.FlxCheckElement);
//# sourceMappingURL=flx-check.js.map