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
       * Library for the FlxGenericSearchElement web component.
       *
       * @class FlxGenericSearchElement
       * @constructor
       * @return {FlxGenericSearchElement}
       */
            class FlxGenericSearchElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                   * Set when component is attached to DOM
                   * @property connected {boolean}
                   */
                    this.connected = false;
                    this.gridId = null;
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = $(this);
                    this.connected = true;
                    this.gridId = element.attr('gridId');
                    if (element.attr('manualInit') != 'true') {
                        this.init();
                    }
                }
                /**
                * Array of observed attributes.
                * @property observedAttributes {Array}
                */
                static get observedAttributes() {
                    return ['params'];
                }
                /**
                * Fires when the attribute value of the element is changed.
                * @method attributeChangedCallback
                */
                attributeChangedCallback(attrName, oldVal, newVal) {
                    if (!this.connected) {
                        return;
                    }
                    if (attrName.toLowerCase() == 'params' && newVal && newVal != '') {
                        this.gridId = newVal;
                        if (this.gridId) {
                            this.refresh();
                        }
                    }
                }
                init() {
                    let me = $(this);
                    me.removeAttr('manualInit');
                    if (!this.gridId) {
                        me.html('<div class="search input-group"><input type="search" placeholder="No relation defined"><span class="input-group-addon bg-danger"><i class="flx-icon icon-stop"></i></span></div>');
                        return;
                    }
                    me.html('<div class="search input-group"><input type="search" placeholder="' + flexygo.localization.translate('flxsearch.search') + '"><span class="input-group-addon bg-outstanding"><i class="flx-icon icon-search-1"></i></span></div>');
                    me.closest('.cntBody').addClass('nopadding');
                    me.find('input').on('keyup.search', (e) => {
                        let modsIds = this.gridId.split('|');
                        for (let i = 0; i < modsIds.length; i++) {
                            let ct = $('flx-list[modulename="' + modsIds[i] + '"], flx-editgrid[id="' + modsIds[i] + '"]')[0];
                            if (typeof ct != 'undefined') {
                                ct.filter = $(e.currentTarget).parent().find('input').val();
                                if (ct.refreshing) {
                                    clearTimeout(ct.refreshing);
                                }
                                ct.refreshing = setTimeout('var crl=$(\'flx-list[modulename="' + modsIds[i] + '"], flx-editgrid[id="' + modsIds[i] + '"]\')[0];crl.render();crl.refreshing=null;', 100);
                            }
                        }
                    });
                    let parentModule = me.closest('flx-module');
                    let wcModule = parentModule[0];
                    if (parentModule && wcModule) {
                        wcModule.moduleLoaded(this);
                    }
                }
                refresh() {
                    if ($(this).attr('manualInit') != 'true') {
                        this.init();
                    }
                }
                setId(gridId) {
                    this.gridId = gridId;
                    this.refresh();
                }
            }
            wc.FlxGenericSearchElement = FlxGenericSearchElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-genericsearch', flexygo.ui.wc.FlxGenericSearchElement);
//# sourceMappingURL=flx-genericsearch.js.map