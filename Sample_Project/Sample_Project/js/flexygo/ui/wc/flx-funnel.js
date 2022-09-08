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
            * Library for the FlxFunnel
            *
            * @class FlxFunnel
            * @constructor
            * @return {FlxFunnel} .
            */
            class FlxFunnelElement extends HTMLElement {
                constructor() {
                    //If a constructor is defined, is REQUIRED call the super constructor
                    super();
                    this.defaultOptions = null;
                    this.data = null;
                    /**
                    * Set if element has been connected to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                }
                /**
                * Array of observed attributes. REQUIRED
                * @property observedAttributes {Array}
                */
                static get observedAttributes() {
                    return ['ObjectName', 'ObjectWhere', 'additionalwhere', ''];
                }
                /**
                * Init the webcomponent. REQUIRED.
                * @method init
                */
                init() {
                    let me = $(this);
                    me.removeAttr('manualInit');
                    $(this).closest('flx-module').find('.flx-noInitContent').remove();
                    me.append('<div id="funnel"></div>');
                    let params = {
                        ObjectName: me.attr('ObjectName'),
                        ObjectWhere: me.attr('ObjectWhere'),
                        ModuleName: me.attr('ModuleName'),
                        AdditionalWhere: this.AdditionalWhere,
                        PageName: flexygo.history.getPageName(me)
                    };
                    flexygo.ajax.post('~/api/Funnel', 'GetHTML', params, (response) => {
                        if (response) {
                            this.data = response.Data;
                            this.defaultOptions = response.Options;
                            this.render();
                        }
                    });
                }
                /**
                * Refresh de webcomponent. REQUIRED.
                * @method refresh
                */
                refresh() {
                    if ($(this).attr('manualInit') != 'true') {
                        let chart = new D3Funnel('#funnel');
                        chart["container"] = $(this).find('#funnel')[0];
                        chart.destroy();
                        $(this).find('#funnel')[0].remove();
                        this.init();
                    }
                }
                /**
                * Render HTML data.
                * @method render
                */
                render() {
                    let chart = new D3Funnel('#funnel');
                    chart["container"] = $(this).find('#funnel')[0];
                    let me = this;
                    let defaultOptions = { bottomWidth: 1 / 3, bottomPinch: 1, inverted: false, animate: 0, curveEnabled: true, curveHeight: 20, totalCount: null, dynamicHeight: true, dynamicSlope: false, barOverlay: false, fillType: 'solid', minHeight: 25, highlight: false, labelEnabled: true, fontFamily: null, fontSize: '14px', fill: '#fff', labelFormat: '{l}\n{f}', tooltipEnabled: false, tooltipFormat: '{l}\n{f}' };
                    if (me.defaultOptions && me.defaultOptions != '') {
                        let newOptions = JSON.parse(me.defaultOptions);
                        for (let key in newOptions) {
                            defaultOptions[key] = newOptions[key];
                        }
                    }
                    let options = {
                        chart: {
                            bottomWidth: defaultOptions.bottomWidth,
                            bottomPinch: defaultOptions.bottomPinch,
                            inverted: defaultOptions.inverted,
                            animate: defaultOptions.animate,
                            curve: {
                                enabled: defaultOptions.curveEnabled,
                                height: defaultOptions.curveHeight
                            },
                            totalCount: defaultOptions.totalCount
                        },
                        block: {
                            dynamicHeight: defaultOptions.dynamicHeight,
                            dynamicSlope: defaultOptions.dynamicSlope,
                            barOverlay: defaultOptions.barOverlay,
                            fill: {
                                type: defaultOptions.fillType
                            },
                            minHeight: defaultOptions.minHeight,
                            highlight: defaultOptions.highlight
                        },
                        label: {
                            enabled: defaultOptions.labelEnabled,
                            fontFamily: defaultOptions.fontFamily,
                            fontSize: defaultOptions.fontSize,
                            fill: defaultOptions.fill,
                            format: defaultOptions.labelFormat
                        },
                        tooltip: {
                            enabled: defaultOptions.tooltipEnabled,
                            format: defaultOptions.tooltipFormat
                        }
                    };
                    // Reverse data for inversion
                    if (options.chart.inverted) {
                        me.data = me.data.reverse();
                    }
                    try {
                        if (me.data.length == 0) {
                            me.data = [
                                { label: flexygo.localization.translate('flxfunnel.data'), value: 0 },
                                { label: flexygo.localization.translate('flxfunnel.data'), value: 0 },
                                { label: flexygo.localization.translate('flxfunnel.data'), value: 0 },
                            ];
                        }
                        chart.draw(me.data, options);
                        //$(this).find('#funnel svg').removeAttr("width");
                        //$(this).find('#funnel svg').removeAttr("height");
                        //$(this).find('#funnel svg')[0].setAttribute("viewBox", "0 0 455 425");
                    }
                    catch (ex) {
                        flexygo.msg.error(ex);
                    }
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = $(this);
                    this.connected = true;
                    this.objectName = element.attr("ObjectName");
                    this.objectWhere = element.attr("ObjectWhere");
                    this.moduleName = element.attr("ModuleName");
                    this.AdditionalWhere = element.attr("additionalwhere");
                    if (element.attr('manualInit') != 'true') {
                        this.init();
                    }
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
                    else if (attrName.toLowerCase() == 'additionalwhere' && newVal && newVal != '') {
                        this.AdditionalWhere = newVal;
                        needInit = true;
                    }
                    if (this.connected && needInit) {
                        this.init();
                    }
                }
            }
            wc.FlxFunnelElement = FlxFunnelElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define("flx-funnel", flexygo.ui.wc.FlxFunnelElement);
//# sourceMappingURL=flx-funnel.js.map