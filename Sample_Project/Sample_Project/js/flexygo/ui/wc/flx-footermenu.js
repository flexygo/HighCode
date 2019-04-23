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
           * Library for the FlxFooterMenuElement web component.
           *
           * @class FlxFooterMenuElement
           * @constructor
           * @return {FlxFooterMenuElement} .
           */
            class FlxFooterMenuElement extends HTMLElement {
                constructor() {
                    super();
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
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
                }
                /**
                * Init the webcomponent.
                * @method init
                */
                init() {
                    flexygo.events.on(this, "page", "loaded", () => {
                        this.hide();
                        flexygo.events.off(this, "page", "loaded");
                    });
                }
                show() {
                    $(this).slideDown(500);
                }
                hide() {
                    $(this).slideUp(500);
                }
                addItem(icon, text, fnc) {
                    let item = $('<div class="item"/>');
                    if (icon) {
                        item.append('<i class="' + icon + '"></i>');
                    }
                    if (text) {
                        item.append('<span>' + text + '</span>');
                        item.attr('title', text);
                    }
                    if (fnc) {
                        item.on('click', fnc);
                    }
                    $(this).append(item);
                }
                clear() {
                    $(this).empty();
                }
            }
            wc.FlxFooterMenuElement = FlxFooterMenuElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-footermenu', flexygo.ui.wc.FlxFooterMenuElement);
//# sourceMappingURL=flx-footermenu.js.map