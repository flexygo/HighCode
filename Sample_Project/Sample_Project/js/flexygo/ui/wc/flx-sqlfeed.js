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
            * Library for the FlxSqlFeedElement web component.
            *
            * @class FlxSqlFeedElement
            * @constructor
            * @return {FlxSqlFeedElement}
            */
            class FlxSqlFeedElement extends HTMLElement {
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
               * Fires when element is attached to DOM
               * @method connectedCallback
               */
                connectedCallback() {
                    let element = $(this);
                    this.connected = true;
                    //Html.attr('tablename');
                    this.moduleName = element.attr("modulename");
                    if (this.moduleName) {
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
                    return ['modulename'];
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
                refresh() {
                    if ($(this).attr('manualInit') != 'true') {
                        this.init();
                    }
                }
                init() {
                    let me = $(this);
                    me.removeAttr('manualInit');
                    me.html('');
                    let params = {
                        ObjectName: me.attr('ObjectName'),
                        ObjectWhere: me.attr('ObjectWhere'),
                        ModuleName: this.moduleName,
                        PageName: flexygo.history.getPageName(me)
                    };
                    flexygo.ajax.post('~/api/SQLFeed', 'GetHTML', params, (response) => {
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
            wc.FlxSqlFeedElement = FlxSqlFeedElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-sqlfeed', flexygo.ui.wc.FlxSqlFeedElement);
//# sourceMappingURL=flx-sqlfeed.js.map