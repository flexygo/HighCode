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
            * Library for the FlxSeparatorElement web component.
            *
            * @class FlxSeparatorElement
            * @constructor
            * @return {FlxSeparatorElement}
            */
            class FlxSeparatorElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                    * Set when component is attached to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                    this.property = null;
                    this.options = null;
                }
                /**
               * Fires when element is attached to DOM
               * @method connectedCallback
               */
                connectedCallback() {
                    let element = $(this);
                    var propName = element.attr('property');
                    if (propName && flexygo.utils.isBlank(this.options)) {
                        var parentCtl = element.closest('flx-edit,flx-list,flx-propertymanager,flx-view,flx-filter');
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
                    var Label = element.attr('Label');
                    if (Label && Label != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Label = Label;
                    }
                    var Style = element.attr('Style');
                    if (Style && Style != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Style = Style;
                        element.attr('Control-Style', this.options.Style);
                        element.attr('Style', '');
                    }
                    var Type = element.attr('Type');
                    if (Type && Type != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Type = Type;
                    }
                    var Class = element.attr('Class');
                    if (Class && Class != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.CssClass = Class;
                        element.attr('Control-Class', this.options.CssClass);
                        element.attr('Class', '');
                    }
                    var IconClass = element.attr('IconClass');
                    if (IconClass && IconClass != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IconClass = IconClass;
                    }
                    var ctlClass = element.attr('Control-Class');
                    if (ctlClass && ctlClass != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.CssClass = ctlClass;
                    }
                    var ctlStyle = element.attr('Control-Style');
                    if (ctlStyle && ctlStyle != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Style = ctlStyle;
                    }
                    var Hide = element.attr('Hide');
                    if (Hide && Hide != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Hide = Hide == 'true';
                    }
                    this.init();
                    this.connected = true;
                }
                /**
                * Array of observed attributes.
                * @property observedAttributes {Array}
                */
                static get observedAttributes() {
                    return ['property', 'label', 'style', 'type', 'class', 'iconclass', 'hide'];
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
                        var propName = newVal;
                        var parentCtl = element.closest('flx-edit, flx-list,flx-propertymanager');
                        if (parentCtl && parentCtl.length > 0) {
                            let wcParent = parentCtl[0];
                            this.options = jQuery.extend(true, {}, wcParent.properties[propName]);
                        }
                        this.property = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() == 'label' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Label = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() == 'style' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Style = newVal;
                        element.attr('Control-Style', this.options.Style);
                        element.attr('Style', '');
                        this.refresh();
                    }
                    //if (attrName.toLowerCase() == 'type' && newVal && newVal != '') {
                    //    if (!this.options) { this.options = new flexygo.api.ObjectProperty(); }
                    //    this.options.Type = newVal;
                    //    if (element.attr('Control-Style') !== this.options.Style) {
                    //        //element.attr('Type', this.options.Type);
                    //        element.attr('Type', '');
                    //        this.refresh();
                    //    }
                    //}
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
                    if (attrName.toLowerCase() == 'iconclass' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IconClass = newVal;
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
                init() {
                    this.refresh();
                }
                refresh() {
                    let me = $(this);
                    var iconsLeft;
                    let control = $('<legend />');
                    if (this.options && this.options.IconClass && this.options.IconClass != '') {
                        iconsLeft = $('<i class="' + this.options.IconClass + '" />');
                    }
                    if (iconsLeft) {
                        control.append(iconsLeft);
                    }
                    if ((this.options && this.options.Label && this.options.Label != '') && (typeof this.options.Type == 'undefined' || this.options.Type != 'place-holder')) {
                        control.append(this.options.Label);
                    }
                    if (this.options && this.options.HelpId && this.options.HelpId != '') {
                        let helpIcon = $('<span class="help-icon" > <i/></span>');
                        let helpTooltip = $('<flx-tooltip mode="popover" container="body" helpId="' + this.options.HelpId + '"></flx-tooltip>');
                        control.append(helpIcon);
                        helpIcon.append(helpTooltip);
                    }
                    if (this.options && this.options.Type && this.options.Type == 'place-holder') {
                        control.addClass("placeHolder");
                        control.append('<span class="spanPlaceHolder">' + this.options.Label + '</span>');
                    }
                    me.html(control);
                    this.setOptions();
                }
                setOptions() {
                    let me = $(this);
                    var control = me.find('legend');
                    if (this.options && this.options.Style) {
                        control.attr('style', this.options.Style);
                    }
                    if (this.options && this.options.CssClass) {
                        control.addClass(this.options.CssClass);
                    }
                    if (this.options && this.options.Hide) {
                        me.addClass("hideControl");
                    }
                }
                setValue(value) {
                }
                getValue() {
                    return null;
                }
                /**
                * Trigger Dependencies.
                * @method triggerDependencies
                */
                triggerDependencies() {
                }
            }
            wc.FlxSeparatorElement = FlxSeparatorElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-separator', flexygo.ui.wc.FlxSeparatorElement);
//# sourceMappingURL=flx-separator.js.map