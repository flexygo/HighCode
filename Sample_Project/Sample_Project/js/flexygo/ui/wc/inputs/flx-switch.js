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
            * Library for the FlxSwitchElement web component.
            *
            * @class FlxSwitchElement
            * @constructor
            * @return {FlxSwitchElement}
            */
            class FlxSwitchElement extends HTMLElement {
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
                    this.moduleName = null;
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
                    if (typeof element.attr('Disabled') !== 'undefined') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Locked = true;
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
                    if (typeof element.attr('checked') !== 'undefined') {
                        this.setValue(true);
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
                    this.connected = true;
                }
                /**
               * Array of observed attributes.
               * @property observedAttributes {Array}
               */
                static get observedAttributes() {
                    return ['modulename', 'property', 'disabled', 'style', 'class', 'hide'];
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
                    if (attrName.toLowerCase() === 'modulename' && newVal && newVal !== '') {
                        this.moduleName = newVal;
                        if (this.moduleName) {
                            this.refresh();
                        }
                        this.init();
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
                    if (attrName.toLowerCase() === 'hide' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Hide = newVal;
                        this.init();
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
                    //if (me.attr('mode') && me.attr('mode').toLowerCase() === 'view') {
                    //    this.initViewMode();
                    //} else {
                    this.initEditMode();
                    // }
                }
                //initViewMode():void {
                //    let me = $(this);
                //    let iconsLeft;
                //    let iconsRight;
                //    if (this.options && this.options.ObjNameLink && this.options.ObjWhereLink) {
                //        let editCtl = (<flexygo.ui.wc.FlxViewElement>me.closest('flx-view')[0]);
                //        iconsRight = $('<div class="input-group-btn" />');
                //        let icon1 = $('<button class="btn btn-default" type="button"><i class="flx-icon icon-link" /></button>').on('click', (e) => {
                //            flexygo.nav.openPage('view', editCtl.parseEditString(this.options.ObjNameLink), editCtl.parseEditString(this.options.ObjWhereLink), null, this.options.TargetIdLink);
                //        });
                //        iconsRight.append(icon1);
                //    }
                //    let control = $('<div class="view-mode">');
                //    me.html(control);
                //    let input = $('<label class="form-control input-view input-view-mode" />');
                //    if (this.options && this.options.IconClass && this.options.IconClass !== '') {
                //        iconsLeft = $('<span class="input-group-addon" ><i class="' + this.options.IconClass + '" /></span>');
                //        control.append(iconsLeft)
                //    }
                //    control.append(input)
                //    if (iconsRight)  {
                //        control.append(iconsRight);
                //    }
                //    if (iconsLeft || iconsRight) {
                //        control.addClass("input-group");
                //    }
                //    if (this.options && this.options.Style) {
                //        me.children('div').attr('style', this.options.Style);
                //    }
                //    if (this.options && this.options.CssClass) {
                //        me.children('div').addClass(this.options.CssClass);
                //    }
                //    if (this.options && this.options.Hide) {
                //        me.addClass("hideControl");
                //    }
                //}
                initEditMode() {
                    let me = $(this);
                    let id = flexygo.utils.uniqueId();
                    let htmlCtl = '';
                    htmlCtl += '<div>';
                    htmlCtl += '<div class="onoffswitch">';
                    htmlCtl += '    <input type="checkbox" style="display:none" name="onoffswitch" class="onoffswitch-checkbox" id="' + id + '">';
                    htmlCtl += '    <label class="onoffswitch-label" for="' + id + '">';
                    htmlCtl += '        <span class="onoffswitch-inner"></span>';
                    htmlCtl += '        <span class="onoffswitch-switch"></span>';
                    htmlCtl += '    </label>';
                    htmlCtl += '</div>';
                    htmlCtl += '</div>';
                    me.html(htmlCtl);
                    this.setOptions();
                    me.find('label:first').on('click', () => {
                        me.trigger('focusin');
                        me.trigger('focusout');
                    });
                }
                setOptions() {
                    let me = $(this);
                    let input = me.find('input');
                    input.on('blur', (e) => { me.trigger('blur'); });
                    if (!(me.attr('mode') && me.attr('mode').toLowerCase() === 'view')) {
                        input.on('change.refreshvalue', (e) => {
                            if (input.prop('checked')) {
                                me.attr('checked', 'true');
                                me.attr('value', 'true');
                            }
                            else {
                                me.removeAttr('checked');
                                me.attr('value', 'false');
                            }
                        });
                    }
                    if (this.options && this.options.Name && this.options.Name !== '') {
                        input.attr('name', this.options.Name);
                    }
                    else {
                        input.attr('name', flexygo.utils.uniqueName());
                    }
                    if (this.options && this.options.CauseRefresh) {
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
                    if (me.attr('mode') && me.attr('mode').toLowerCase() === 'view') {
                        input.prop('disabled', true);
                    }
                    if (me.attr('tab') && me.attr('tab') !== '') {
                        input.attr('tabindex', me.attr('tab'));
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
                setValue(value) {
                    let me = $(this);
                    //if (me.attr('mode') && me.attr('mode').toLowerCase() === 'view') {
                    //    this.setValueView(value);
                    //} else {
                    let input = me.find('input');
                    if (value == 'true' || value == 'True' || value == '1') {
                        value = true;
                    }
                    else if (value == 'false' || value == 'False' || value == '0') {
                        value = false;
                    }
                    input.prop('checked', value);
                    me.attr('value', value);
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
                    return input.prop('checked');
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
            wc.FlxSwitchElement = FlxSwitchElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-switch', flexygo.ui.wc.FlxSwitchElement);
//# sourceMappingURL=flx-switch.js.map