/**
 * @namespace flexygo.ui.wc
 */
var flexygo;
(function (flexygo) {
    var ui;
    (function (ui) {
        var wc;
        (function (wc) {
            class SidePanelItem {
            }
            wc.SidePanelItem = SidePanelItem;
            /**
            * Library for the FlxSidePanelElement web component.
            *
            * @class FlxSidePanelElement
            * @constructor
            * @return {FlxSidePanelElement}
            */
            class FlxSidePanelElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                    * Set when component is attached to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                    this.lastTimer = null;
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    this.connected = true;
                    this.init();
                }
                /**
                * Array of observed attributes.
                * @property observedAttributes {Array}
                */
                static get observedAttributes() {
                    return [];
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                attributeChangedCallback(attrName, oldVal, newVal) {
                    if (!this.connected) {
                        return;
                    }
                }
                init() {
                    this.clearPanels();
                    this.panels = {};
                }
                clearPanels() {
                    let me = $(this);
                    me.html('<div class="side-items hidden-m"></div><div class="side-panels hidden-m"></div>');
                    me.find('.side-panels').on('mouseout', (e) => {
                        this.lastTimer = setTimeout(() => {
                            let lastActive = me.find('.active');
                            lastActive.removeClass('active');
                            lastActive.each((i, el) => {
                                this.panels[$(el).attr('name')].panel.hide('blind', { direction: 'left' }, 500);
                            });
                        }, 1000);
                    }).on('mouseover', (e) => {
                        if (this.lastTimer) {
                            clearTimeout(this.lastTimer);
                            this.lastTimer = null;
                        }
                    });
                }
                addPanel(title, icon, content, debugOnly) {
                    let me = $(this);
                    let debugClass = '';
                    if (debugOnly) {
                        debugClass = 'develop-only';
                    }
                    let button = $('<span class="' + debugClass + '"><i class="' + icon + '" ></i> ' + title + '</span>').attr('name', title);
                    let panel = $('<div class="' + debugClass + '" style="display:none" />').append(content);
                    button.on('click', (e) => {
                        this.togglePanel($(e.currentTarget));
                    });
                    me.find('.side-items').append(button);
                    me.find('.side-panels').append(panel);
                    this.panels[title] = ({ "button": button, "panel": panel });
                }
                togglePanel(itm) {
                    let me = $(this);
                    let lastActive = me.find('.active');
                    let wasActive = itm.is('.active');
                    let isAnyActive = lastActive.length;
                    if (isAnyActive && !wasActive) {
                        lastActive.removeClass('active');
                        lastActive.each((i, e) => {
                            this.panels[$(e).attr('name')].panel.hide();
                        });
                        itm.addClass('active');
                        this.panels[itm.attr('name')].panel.show();
                    }
                    else {
                        lastActive.removeClass('active');
                        lastActive.each((i, e) => {
                            this.panels[$(e).attr('name')].panel.hide('blind', { direction: 'left' }, 500);
                        });
                        if (!wasActive) {
                            itm.addClass('active');
                            this.panels[itm.attr('name')].panel.show('blind', { direction: 'left' }, 500);
                        }
                    }
                }
                removePanel(key) {
                    this.panels[key].panel.remove();
                    this.panels[key].button.remove();
                }
                hidePanels() {
                    for (let key in this.panels) {
                        this.panels[key].panel.hide();
                    }
                }
            }
            wc.FlxSidePanelElement = FlxSidePanelElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-sidepanel', flexygo.ui.wc.FlxSidePanelElement);
//# sourceMappingURL=flx-sidepanel.js.map