/**
 * @namespace flexygo.ui.wc
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
                        return this.init();
                    }
                }
                init() {
                    return new Promise((resolve, _) => __awaiter(this, void 0, void 0, function* () {
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
                        flexygo.ajax.post('~/api/Html', 'GetHTML', params, 
                        //Success Function
                        (response) => {
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
                            if (parentModule && wcModule) {
                                let modName = this.moduleName;
                                if (!flexygo.utils.isBlank(flexygo.debug)) {
                                    flexygo.events.off(wcModule, 'push', 'updated');
                                    flexygo.events.on(wcModule, 'push', 'updated', function (e) {
                                        if ($(wcModule).closest('html').length > 0) {
                                            switch (e.masterIdentity) {
                                                case 'sysObjectTemplate': {
                                                    if (modName == e.sender) {
                                                        flexygo.events.off(wcModule, 'push', 'updated');
                                                        wcModule.refresh();
                                                    }
                                                    break;
                                                }
                                                default: {
                                                    break;
                                                }
                                            }
                                        }
                                        else {
                                            flexygo.events.off(wcModule, 'push', 'updated');
                                        }
                                    });
                                }
                            }
                            resolve();
                        }, 
                        //Error Function
                        err => {
                            flexygo.utils.modules.loadingErrorFunction(this.closest('flx-module'), err);
                            resolve();
                        }, 
                        //Complete Function
                        () => { this.stopLoading(); }, 
                        //Before Function
                        () => { this.startLoading(); });
                    }));
                }
                flxTranslate(str) {
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
            /**
           * Array of observed attributes.
           * @property observedAttributes {Array}
           */
            FlxHtmlElement.observedAttributes = ['modulename'];
            wc.FlxHtmlElement = FlxHtmlElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-html', flexygo.ui.wc.FlxHtmlElement);
//# sourceMappingURL=flx-html.js.map