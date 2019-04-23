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
            * Library for the flx-accordion.
            *
            * @class FlxAccordionElement
            * @constructor
            * @return {FlxAccordionElement} .
            */
            class FlxAccordionElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                   * Set when component is attached to DOM
                   * @property connected {boolean}
                   */
                    this.connected = false;
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
                * Fires when the attribute value of the element is changed.
                * @method attributeChangedCallback
                */
                attributeChangedCallback(attrName, oldVal, newVal) {
                    if (!this.connected) {
                        return;
                    }
                }
                /**
               * Init the webcomponent. .
               * @method init
               */
                init() {
                }
                /**
              * Clears the HTML.
              * @method clear
              */
                clear() {
                    $(this).html('<ul/>');
                }
                /**
               * Adds title and  content
               * @method add
               * @param {string} title - The title.
               * @param {any} content - The content.
               */
                add(title, content) {
                    let me = $(this);
                    if (me.html().length === 0) {
                        this.clear();
                    }
                    let itm = $('<li class="item-closed"><span class="clickable">' + title + '</span><div style="display:none"></div></li>');
                    me.children('ul').append(itm);
                    itm.find('span').first().on('click', (e) => {
                        this.toggle($(e.currentTarget));
                    });
                    let container = itm.find('div');
                    if (Array.isArray(content)) {
                        for (let i = 0; i < content.length; i++) {
                            container.append(content[i]);
                        }
                    }
                    else {
                        container.append(content);
                    }
                    return container;
                }
                /**
               * toggle through items
               * @method toggle
               * @param {JQuery} itm - The itm.
               */
                toggle(itm) {
                    itm.parent().toggleClass('item-opened').toggleClass('item-closed');
                    itm.parent().children('div').toggle(300);
                }
            }
            wc.FlxAccordionElement = FlxAccordionElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-accordion', flexygo.ui.wc.FlxAccordionElement);
//# sourceMappingURL=flx-accordion.js.map