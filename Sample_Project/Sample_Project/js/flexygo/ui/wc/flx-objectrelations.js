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
            * Library for the FlxObjectRelationsElement web component.
            *
            * @class FlxObjectRelationsElement
            * @constructor
            * @return {FlxObjectRelationsElement}
            */
            class FlxObjectRelationsElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                   * Set when component is attached to DOM
                   * @property connected {boolean}
                   */
                    this.connected = false;
                    this.moduleName = null;
                    this.mode = null;
                }
                connectedCallback() {
                    var element = $(this);
                    this.connected = true;
                    this.moduleName = element.attr("modulename");
                    this.mode = element.attr("mode");
                    if (this.moduleName) {
                        if (element.attr('manualInit') != 'true') {
                            this.init();
                        }
                    }
                }
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
                    if (attrName.toLowerCase() == 'mode' && newVal && newVal != '') {
                        this.mode = newVal;
                        if (this.mode) {
                            this.refresh();
                        }
                    }
                }
                refresh() {
                    if ($(this).attr('manualInit') != 'true') {
                        return this.init();
                    }
                    return;
                }
                init() {
                    return new Promise((resolve, _) => __awaiter(this, void 0, void 0, function* () {
                        let me = $(this);
                        me.removeAttr('manualInit');
                        $(this).closest('flx-module').find('.flx-noInitContent').remove();
                        if (this.moduleName) {
                            let params = {
                                ObjectName: me.attr('ObjectName'),
                                ObjectWhere: me.attr('ObjectWhere'),
                                ModuleName: this.moduleName,
                                PageName: flexygo.history.getPageName(me),
                                Mode: this.mode
                            };
                            flexygo.ajax.post('~/api/ObjectsRelations', 'GetHTML', params, 
                            //Success Function
                            (response) => {
                                if (response) {
                                    me.empty();
                                    if (response.CssText)
                                        me.append('<style>' + response.CssText + '</style>');
                                    if (response.HtmlText)
                                        me.append(response.HtmlText);
                                    if (response.ScriptText)
                                        me.append('<script>' + response.ScriptText + '</script>');
                                    this.render();
                                }
                                var parentModule = me.closest('flx-module');
                                let wcModule = parentModule[0];
                                if (parentModule && wcModule) {
                                    wcModule.moduleLoaded(this);
                                }
                                resolve();
                            }, 
                            //Error Function
                            err => {
                                flexygo.utils.modules.loadingErrorFunction(this.closest('flx-module'), err);
                                resolve();
                            }, () => { this.stopLoading(); }, () => { this.startLoading(); });
                        }
                        else {
                            this.render();
                            resolve();
                        }
                    }));
                }
                render() {
                    $(this).html(this.data);
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
            FlxObjectRelationsElement.observedAttributes = ['modulename', 'mode'];
            wc.FlxObjectRelationsElement = FlxObjectRelationsElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-objectrelations', flexygo.ui.wc.FlxObjectRelationsElement);
//# sourceMappingURL=flx-objectrelations.js.map