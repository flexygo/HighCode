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
            * Library for the FlxHtmlElement web component.
            *
            * @class FlxHtmlElement
            * @constructor
            * @return {FlxHtmlElement}
            */
            class FlxHtmlElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                   * Set when component is attached to DOM
                   * @property connected {boolean}
                   */
                    this.connected = false;
                    this.moduleName = null;
                    this.moduleButtons = null;
                }
                /**
               * Fires when element is attached to DOM
               * @method connectedCallback
               */
                connectedCallback() {
                    var element = $(this);
                    this.connected = true;
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
                    $(this).closest('flx-module').find('.flx-noInitContent').remove();
                    me.html('');
                    let def;
                    let histObj = flexygo.history.get(me);
                    if (typeof histObj != 'undefined' && histObj.defaults) {
                        if (typeof histObj.defaults == 'string') {
                            def = JSON.parse(flexygo.utils.parser.replaceAll(histObj.defaults, "'", '"'));
                        }
                        else {
                            def = histObj.defaults;
                        }
                    }
                    let params = {
                        ObjectName: me.attr('ObjectName'),
                        ObjectWhere: me.attr('ObjectWhere'),
                        ModuleName: this.moduleName,
                        PageName: flexygo.history.getPageName(me),
                        Defaults: flexygo.utils.dataToArray(def)
                    };
                    flexygo.ajax.post('~/api/Html', 'GetHTML', params, (response) => {
                        let parentModule = me.closest('flx-module');
                        let wcModule = parentModule[0];
                        if (response) {
                            let HtmlHeader = '';
                            let HtmlText = '';
                            let HtmlFooter = '';
                            me.empty();
                            if (response.CssText)
                                me.append('<style>' + response.CssText + '</style>');
                            if (response.HtmlHeader)
                                HtmlHeader = flexygo.utils.parser.recursiveCompile(def, response.HtmlHeader, this);
                            if (response.HtmlText)
                                HtmlText = flexygo.utils.parser.recursiveCompile(def, response.HtmlText, this);
                            if (response.HtmlFooter)
                                HtmlFooter = flexygo.utils.parser.recursiveCompile(def, response.HtmlFooter, this);
                            me.append(HtmlHeader + HtmlText + HtmlFooter);
                            if (response.ScriptText)
                                me.append('<script>' + response.ScriptText + '</script>');
                            if (response.Buttons) {
                                this.moduleButtons = response.Buttons;
                                wcModule.setButtons(response.Buttons, null, null);
                            }
                            else {
                                wcModule.setButtons(null, null, null);
                            }
                        }
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
            wc.FlxHtmlElement = FlxHtmlElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-html', flexygo.ui.wc.FlxHtmlElement);
//# sourceMappingURL=flx-html.js.map