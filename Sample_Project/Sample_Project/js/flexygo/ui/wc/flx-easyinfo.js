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
            * Library for the flx-easyinfo web component.
            *
            * @class FlxEasyInfoElement
            * @constructor
            * @return {FlxEasyInfoElement} .
            */
            class FlxEasyInfoElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                   * Set when component is attached to DOM
                   * @property connected {boolean}
                   */
                    this.connected = false;
                    this.moduleName = null;
                    this.data = null;
                    this.value = null;
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
                    $(this).closest('flx-module').find('.flx-noInitContent').remove();
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
                            let div = $('<div class="flx-easyinfo"></div>').attr('size', size);
                            div.append(this.addEasInfo(this.data[i]['value'], this.data[i]['symbol'], this.data[i]['label'], this.data[i]['iconclass'], this.data[i]['color'], this.data[i]['click']));
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
                    me.append(this.addEasInfo(this.value, me.attr('symbol'), me.attr('label'), me.attr('iconclass'), me.attr('color')));
                }
                /**
                * Adds easy info.
                * @method addEasInfo
                * @param {string} value
                * @param {string} label
                * @param {string} iconclass
                * @param {string} color
                * @param {string} click
                * @return {JQuery}
                */
                addEasInfo(value, easySymbol, label, iconclass, color, click) {
                    let newInfo;
                    newInfo = $('<h5><i class=""></i><span></span><label></label></h5>');
                    if (click) {
                        newInfo.attr('onclick', click);
                        newInfo.attr('class', 'clickable');
                    }
                    //newInfo.prepend(label || '');
                    newInfo.find('span').append(value);
                    newInfo.find('span').append(easySymbol || '');
                    newInfo.find('label').append(label || '');
                    if (iconclass && iconclass != '') {
                        newInfo.find('i').attr('class', iconclass);
                    }
                    if (color && color != '') {
                        newInfo.find('span').attr('style', 'color:' + color);
                    }
                    if (color && color != '') {
                        newInfo.find('i').attr('style', 'color:' + color);
                    }
                    return newInfo;
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
            wc.FlxEasyInfoElement = FlxEasyInfoElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-easyinfo', flexygo.ui.wc.FlxEasyInfoElement);
//# sourceMappingURL=flx-easyinfo.js.map