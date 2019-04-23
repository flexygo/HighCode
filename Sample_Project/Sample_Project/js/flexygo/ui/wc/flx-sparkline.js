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
            * Library for the FlxSparkLineElement web component.
            *
            * @class FlxSparkLineElement
            * @constructor
            * @return {FlxSparkLineElement}
            */
            class FlxSparkLineElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                    * Set when component is attached to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                    this.moduleName = null;
                    this.options = null;
                    this.data = null;
                }
                /**
               * Fires when element is attached to DOM
               * @method connectedCallback
               */
                connectedCallback() {
                    let element = $(this);
                    this.connected = true;
                    //Html.attr('tablename');
                    this.moduleName = element.attr("modulename");
                    if (element.attr('values')) {
                        this.data = JSON.parse(element.attr('values'));
                    }
                    if (this.moduleName || this.data) {
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
                    return ['modulename', 'values'];
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
                    if (attrName.toLowerCase() == 'values' && newVal && newVal != '') {
                        this.data = newVal;
                        if (this.data) {
                            this.refresh();
                        }
                    }
                }
                refresh() {
                    if ($(this).attr('manualInit') != 'true') {
                        this.init();
                    }
                }
                init() {
                    let me = $(this);
                    me.removeAttr('manualInit');
                    me.html('');
                    if (this.moduleName) {
                        let params = {
                            ObjectName: me.attr('ObjectName'),
                            ObjectWhere: me.attr('ObjectWhere'),
                            ModuleName: this.moduleName,
                            PageName: flexygo.history.getPageName(me)
                        };
                        flexygo.ajax.post('~/api/SparkLine', 'GetHTML', params, (response) => {
                            if (response) {
                                this.data = response.Values;
                                this.options = response.Options;
                                this.render();
                            }
                        }, null, () => { this.stopLoading(); }, () => { this.startLoading(); });
                    }
                    else {
                        this.render();
                    }
                }
                render() {
                    let me = $(this);
                    let options = { barColor: '#2db7b0', lineColor: '#2db7b0', performanceColor: '#898686', rangeColors: ['#e0e0e0', '#c6c6c6', '#a9a9a9'] };
                    let size = me.attr('size') || '';
                    options.type = me.attr('type') || 'line';
                    if (this.options && this.options != '') {
                        let newOptions = JSON.parse(this.options);
                        for (let key in newOptions) {
                            options[key] = newOptions[key];
                        }
                    }
                    switch (size) {
                        case 'l':
                            options.height = "100px";
                            options.width = "150px";
                            options.barWidth = 14;
                            options.barSpacing = 4;
                            break;
                        case 'm':
                            options.height = "50px";
                            options.width = "75px";
                            options.barWidth = 8;
                            options.barSpacing = 2;
                            break;
                        case 's':
                            options.height = "20px";
                            options.width = "40px";
                            break;
                        default:
                            options.height = "auto";
                            options.Width = "auto";
                    }
                    if (me.attr('color') && me.attr('color') != '') {
                        options.barColor = me.attr('Color');
                        options.lineColor = me.attr('Color');
                    }
                    me.sparkline(this.data, options);
                    let parentModule = me.closest('flx-module');
                    let wcModule = parentModule[0];
                    if (parentModule && wcModule) {
                        wcModule.moduleLoaded(this);
                    }
                }
                translate(str) {
                    return flexygo.localization.translate(str);
                }
                startLoading() {
                    if ($(this).parents('flx-module').length > 0) {
                        $(this).parents('flx-module')[0].startLoading();
                    }
                }
                stopLoading() {
                    if ($(this).parents('flx-module').length > 0) {
                        $(this).parents('flx-module')[0].stopLoading();
                    }
                }
            }
            wc.FlxSparkLineElement = FlxSparkLineElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-sparkline', flexygo.ui.wc.FlxSparkLineElement);
//# sourceMappingURL=flx-sparkline.js.map