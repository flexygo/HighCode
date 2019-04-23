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
                static get observedAttributes() {
                    return ['modulename', 'mode'];
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
                        this.init();
                    }
                }
                init() {
                    let me = $(this);
                    me.removeAttr('manualInit');
                    if (this.moduleName) {
                        let params = {
                            ObjectName: me.attr('ObjectName'),
                            ObjectWhere: me.attr('ObjectWhere'),
                            ModuleName: this.moduleName,
                            PageName: flexygo.history.getPageName(me),
                            Mode: this.mode
                        };
                        flexygo.ajax.post('~/api/ObjectsRelations', 'GetHTML', params, (response) => {
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
                        }, null, () => { this.stopLoading(); }, () => { this.startLoading(); });
                    }
                    else {
                        this.render();
                    }
                }
                render() {
                    $(this).html(this.data);
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
            wc.FlxObjectRelationsElement = FlxObjectRelationsElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-objectrelations', flexygo.ui.wc.FlxObjectRelationsElement);
//# sourceMappingURL=flx-objectrelations.js.map