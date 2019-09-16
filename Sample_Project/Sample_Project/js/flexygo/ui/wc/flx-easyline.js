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
            * Library for the FlxEasyline
            *
            * @class FlxEasyline
            * @constructor
            * @return {FlxEasyLine} .
            */
            class FlxEasyLine extends HTMLElement {
                constructor() {
                    //If a constructor is defined, is REQUIRED call the super constructor
                    super();
                    /**
                    * Set if element has been connected to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                    this.data = null;
                    this.label = null;
                    this.color = null;
                    this.value = null;
                    this.size = null;
                    this.symbol = null;
                    this.rounded = null;
                    this.hideValue = null;
                }
                /**
                * Array of observed attributes. REQUIRED
                * @property observedAttributes {Array}
                */
                static get observedAttributes() {
                    return ['ObjectName', 'ObjectWhere', 'ModuleName', 'label', 'value'];
                }
                /**
                * Init the webcomponent. REQUIRED.
                * @method init
                */
                init() {
                    this.render();
                }
                /**
                * Refresh de webcomponent. REQUIRED.
                * @method refresh
                */
                refresh() {
                    this.render();
                }
                /**
                * Render HTML data.
                * @method render
                */
                render() {
                    let me = $(this);
                    if (this.moduleName) {
                        let params = {
                            ObjectName: me.attr('ObjectName'),
                            ObjectWhere: me.attr('ObjectWhere'),
                            ModuleName: this.moduleName,
                            PageName: flexygo.history.getPageName(me)
                        };
                        flexygo.ajax.post('~/api/EasyLine', 'GetHTML', params, (response) => {
                            if (response) {
                                this.data = response.Data;
                                this.renderFromModule();
                            }
                        }, null, () => { this.stopLoading(); }, () => { this.startLoading(); });
                    }
                    else {
                        this.renderFromAttr();
                    }
                }
                /**
                * Render HTML data from module configuration.
                * @method renderFromModule
                */
                renderFromModule() {
                    if (this.data) {
                        let data = this.data;
                        for (let i = 0; i < this.data.length; i++) {
                            this.addEasyLine(data[i]["value"], data[i]["label"], data[i]["color"], data[i]["symbol"], data[i]["size"], data[i]["rounded"], data[i]["hideValue"]);
                        }
                    }
                    let parentModule = $(this).closest('flx-module');
                    let wcModule = parentModule[0];
                    if (parentModule && wcModule) {
                        wcModule.moduleLoaded(this);
                    }
                }
                /**
                * Render HTML data from attribute configuration.
                * @method renderFromAttr
                */
                renderFromAttr() {
                    let me = $(this);
                    me.empty();
                    this.addEasyLine(this.value, me.attr("label"), me.attr("color"), me.attr("symbol"), me.attr("size"), me.attr("rounded"), me.attr("hideValue"));
                }
                /**
                * Adds easy info.
                * @method addEasyLine
                * @param {string} value
                * @param {string} label
                * @param {string} color
                * @param {string} symbol
                * @param {string} size
                * @param {string} rounded
                * @param {string} hideValue
                */
                addEasyLine(value, label, color, symbol, size, rounded, hideValue) {
                    let me = $(this);
                    let selectedSize = size ? size.toLocaleLowerCase() : '';
                    let layoutOptions = {};
                    switch (selectedSize) {
                        case 'l':
                            layoutOptions.height = "auto";
                            layoutOptions.width = "150px";
                            layoutOptions.sizeClass = "size-l";
                            break;
                        case 'm':
                            layoutOptions.height = "15px";
                            layoutOptions.width = "75px";
                            layoutOptions.sizeClass = "size-m";
                            break;
                        case 's':
                            layoutOptions.height = "10px";
                            layoutOptions.width = "40px";
                            layoutOptions.sizeClass = "size-s";
                            break;
                        default:
                            layoutOptions.height = "auto";
                            layoutOptions.width = "auto";
                            layoutOptions.sizeClass = "";
                    }
                    let barColor = `background-color: ${color};`;
                    let labelClass = color ? 'label' : 'no-label';
                    let roundedClass = rounded ? 'rounded' : '';
                    let valueClass = hideValue ? 'no-value' : 'value';
                    let div = $(`<div class="flx-easyline ${layoutOptions.sizeClass}" style="width: ${layoutOptions.width}">
                            <h5 class="${labelClass}" >${label}</h5>
                            <div  class="hor-bar-bg ${roundedClass}" style="height: ${layoutOptions.height}">
                                <div prop="bar" style="${barColor}; height: ${layoutOptions.height}" class="hor-bar-fg ${roundedClass}">
                                    <div prop="value" class="${valueClass}">${value}</div>
                                </div>
                            </div>
                        </div>`);
                    me.append(div);
                    this.setValue(value, color, symbol);
                }
                setValue(value, color, symbol) {
                    if (!color) {
                        color = this.color;
                    }
                    if (!symbol) {
                        symbol = this.symbol;
                    }
                    let me = $(this);
                    let bar = me.find('.hor-bar-fg');
                    let hasSymbol = symbol ? symbol : '';
                    let width = (parseFloat(value) > 100 ? '100' : value);
                    bar.animate({
                        opacity: 1,
                        width: `${width}%`
                    }, {
                        duration: 1000,
                        easing: "swing",
                        step: (now, fx) => {
                            let percentage = this.formatValue(now);
                            me.find('.value').html(`${percentage}${hasSymbol}`);
                        },
                        complete: function () {
                            let valueDOM = me.find('.value');
                            valueDOM.html(`${value}${hasSymbol}`);
                            if (bar.width() < 50) {
                                valueDOM.css("padding-left", '120%');
                                valueDOM.css("color", color);
                            }
                            else {
                                valueDOM.css("padding-left", '');
                                valueDOM.css("color", '');
                            }
                        }
                    });
                }
                /**
                * Formats de value shown to user
                * @method formatValue
                */
                formatValue(value) {
                    let precision = 2;
                    if (value >= 1) {
                        precision = 3;
                    }
                    if (value >= 9) {
                        precision = 4;
                    }
                    let convertedValue = value.toPrecision(precision).toString();
                    return parseFloat(convertedValue);
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let me = $(this);
                    this.connected = true;
                    this.objectName = me.attr("ObjectName");
                    this.objectWhere = me.attr("ObjectWhere");
                    this.moduleName = me.attr("ModuleName");
                    this.label = me.attr('label');
                    this.color = me.attr('color');
                    this.size = me.attr('size');
                    this.symbol = me.attr('symbol');
                    this.value = me.attr('value');
                    this.rounded = me.attr('rounded');
                    this.hideValue = me.attr('hideValue');
                    this.init();
                }
                /**
                * Fires when the attribute value of the element is changed.
                * @method attributeChangedCallback
                */
                attributeChangedCallback(attrName, oldVal, newVal) {
                    let needInit = false;
                    if (attrName.toLowerCase() == 'modulename' && newVal && newVal != '') {
                        this.moduleName = newVal;
                        needInit = true;
                    }
                    else if (attrName.toLowerCase() == 'objectname' && newVal && newVal != '') {
                        this.objectName = newVal;
                        needInit = true;
                    }
                    else if (attrName.toLowerCase() == 'objectwhere' && newVal && newVal != '') {
                        this.objectWhere = newVal;
                        needInit = true;
                    }
                    else if (attrName.toLowerCase() == 'value' && newVal && newVal != '') {
                        this.value = newVal;
                        if (this.connected) {
                            this.setValue(newVal);
                        }
                    }
                    if (this.connected && needInit) {
                        this.init();
                    }
                }
                /**
               * Start loading.
               * @method startLoading
               */
                startLoading() {
                    if ($(this).parents('flx-module').length > 0) {
                        $(this).parents('flx-module')[0].startLoading();
                    }
                }
                /**
                * Stop loading.
                * @method stopLoading
                */
                stopLoading() {
                    if ($(this).parents('flx-module').length > 0) {
                        $(this).parents('flx-module')[0].stopLoading();
                    }
                }
            }
            wc.FlxEasyLine = FlxEasyLine;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define("flx-easyline", flexygo.ui.wc.FlxEasyLine);
//# sourceMappingURL=flx-easyline.js.map