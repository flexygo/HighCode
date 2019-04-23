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
            * Library for the FlxRssElement web component.
            *
            * @class FlxRssElement
            * @constructor
            * @return {FlxRssElement}
            */
            class FlxRssElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                   * Set when component is attached to DOM
                   * @property connected {boolean}
                   */
                    this.connected = false;
                    this.moduleName = null;
                }
                /**
                    * Array of observed attributes.
                    * @property observedAttributes {Array}
                    */
                static get observedAttributes() {
                    return ['modulename'];
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    this.connected = true;
                    this.moduleName = $(this).attr("modulename");
                    if (this.moduleName) {
                        if ($(this).attr('manualInit') != 'true') {
                            this.init();
                        }
                    }
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
                    me.html('');
                    let params = {
                        ObjectName: me.attr('ObjectName'),
                        ObjectWhere: me.attr('ObjectWhere'),
                        "ModuleName": this.moduleName,
                        "PageName": flexygo.history.getPageName(me)
                    };
                    flexygo.ajax.post('~/api/Rss', 'GetHTML', params, (response) => {
                        if (response) {
                            me.html(response.Html);
                        }
                        let parentModule = me.closest('flx-module');
                        let wcModule = parentModule[0];
                        if (parentModule && wcModule) {
                            wcModule.moduleLoaded(this);
                        }
                    }, null, () => { this.stopLoading(); }, () => { this.startLoading(); });
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
            wc.FlxRssElement = FlxRssElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-rss', flexygo.ui.wc.FlxRssElement);
//# sourceMappingURL=flx-rss.js.map