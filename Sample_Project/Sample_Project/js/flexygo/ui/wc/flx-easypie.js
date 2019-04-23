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
        * Library for the flx-easypie web component.
        *
        * @class FlxEasyPieElement
        * @constructor
        * @return {FlxEasyPieElement} .
        */
            class FlxEasyPieElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                   * Setted when component is attached to DOM
                   * @property connected {boolean}
                   */
                    this.connected = false;
                    this.moduleName = null;
                    this.data = null;
                    this.value = null;
                    this.options = null;
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = $(this);
                    this.moduleName = element.attr("modulename");
                    this.value = element.attr('value');
                    this.connected = true;
                    if (this.moduleName || this.value) {
                        if (element.attr('manualInit') != 'true') {
                            this.init();
                        }
                    }
                }
                /**
               * Array of observed attributes.
               * @property observedAttributes {Array}
               */
                static get observedAttributes() {
                    return ['modulename', 'value'];
                }
                /**
                * Fires when the attribute value of the element is changed.
                * @method attributeChangedCallback
                */
                attributeChangedCallback(attrName, oldVal, newVal) {
                    if (!this.connected) {
                        return;
                    }
                    if (attrName.toLowerCase() == 'modulename' && newVal && newVal != '') {
                        this.moduleName = newVal;
                        if (this.moduleName) {
                            this.refresh();
                        }
                    }
                    if (attrName.toLowerCase() == 'value' && newVal && newVal != '') {
                        this.data = newVal;
                        if (this.data) {
                            this.refresh();
                        }
                    }
                }
                /**
               * Refresh de webcomponent.
               * @method refresh
               */
                refresh() {
                    if ($(this).attr('manualInit') != 'true') {
                        this.init();
                    }
                }
                /**
               * Init the webcomponent.
               * @method init
               */
                init() {
                    let me = $(this);
                    me.removeAttr('manualInit');
                    me.empty();
                    if (this.moduleName) {
                        let params = {
                            ObjectName: me.attr('ObjectName'),
                            ObjectWhere: me.attr('ObjectWhere'),
                            ModuleName: this.moduleName,
                            PageName: flexygo.history.getPageName(me)
                        };
                        flexygo.ajax.post('~/api/EasyPie', 'GetHTML', params, (response) => {
                            if (response) {
                                this.data = response.Data;
                                this.options = response.Options;
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
                    let me = $(this);
                    if (this.data) {
                        for (let i = 0; i < this.data.length; i++) {
                            let size = 'm';
                            if (this.data[i]['size']) {
                                size = this.data[i]['size'];
                            }
                            let div = $('<div class="flx-easypie"></div>').attr('size', size);
                            div.append(this.addEasyPie(this.data[i]['value'], this.data[i]['symbol'], this.data[i]['label'], size, this.data[i]['color'], this.data[i]['gradientColor'], this.options, this.data[i]));
                            me.append(div);
                        }
                    }
                    let parentModule = me.closest('flx-module');
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
                    me.append(this.addEasyPie(this.value, me.attr('symbol'), me.attr('label'), me.attr('size'), me.attr('color'), me.attr('gradientcolor'), this.options));
                }
                /**
               * Adds easy pie.
               * @method addEasyPie
               * @param {string} value
               * @param {string} pieSymbol
               * @param {string} label
               * @param {string} color
               * @param {string} gradientColor
               * @param {string} newOptions
               * @param {object} row
               * @return {JQuery}
               */
                addEasyPie(value, pieSymbol, label, size, color, gradientColor, newOptions, row) {
                    let newPie;
                    newPie = $('<div class="chart"><div class="percentage" data-percent="0"><span></span><sup></sup></div></div><div class="label"></div>');
                    if (row && row['click']) {
                        newPie.attr('onclick', row['click']);
                        newPie.addClass('clickable');
                    }
                    newPie.find('.percentage').attr('data-percent', value);
                    newPie.find('span').html(value);
                    newPie.find('sup').html(pieSymbol || '');
                    newPie.filter('.label').html(label || '');
                    let options = { barColor: '#2db7b0', lineCap: 'square', scaleColor: false, size: null, lineWidth: null };
                    if (newOptions && newOptions != '') {
                        var objNewOpt = JSON.parse(newOptions);
                        for (let key in objNewOpt) {
                            options[key] = objNewOpt[key];
                        }
                    }
                    if (row) {
                        let exceptColumns = ['symbol', 'label', 'size', 'color'];
                        for (let key in row) {
                            if (!exceptColumns.includes(key.toLowerCase()))
                                options[key] = row[key];
                        }
                    }
                    switch (size) {
                        case 'l':
                            options.size = 200;
                            options.lineWidth = 14;
                            break;
                        case 'xs':
                            options.size = 50;
                            options.lineWidth = 4;
                            break;
                        case 's':
                            options.size = 100;
                            options.lineWidth = 8;
                            break;
                        case 'm':
                        default:
                            options.size = 150;
                            options.lineWidth = 12;
                    }
                    if (color && color != '') {
                        if (!gradientColor) {
                            gradientColor = color;
                        }
                        options.barColor = function (percent) {
                            var ctx = this.renderer.getCtx();
                            var canvas = this.renderer.getCanvas();
                            var gradient = ctx.createLinearGradient(0, canvas.width, canvas.width * 1.15, 0);
                            gradient.addColorStop(0, gradientColor);
                            gradient.addColorStop(1, color);
                            return gradient;
                        };
                        newPie.find('sup').attr('style', 'color:' + (typeof (options.barColor) == 'function') ? color : options.barColor);
                        newPie.find('.label').attr('style', 'color:' + (typeof (options.barColor) == 'function') ? color : options.barColor);
                        newPie.find('span').attr('style', 'color:' + (typeof (options.barColor) == 'function') ? color : options.barColor);
                    }
                    newPie.find('.percentage').easyPieChart(options);
                    return newPie;
                }
                /**
               * Translates string.
               * @method addEasInfo
               * @param {string} str
               * @return {string}
               */
                translate(str) {
                    return flexygo.localization.translate(str);
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
            wc.FlxEasyPieElement = FlxEasyPieElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-easypie', flexygo.ui.wc.FlxEasyPieElement);
//# sourceMappingURL=flx-easypie.js.map