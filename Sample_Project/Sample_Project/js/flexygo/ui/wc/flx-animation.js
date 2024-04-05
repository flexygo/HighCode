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
            * Library for the flx-animation.
            *
            * @class FlxAnimationElement
            * @constructor
                * @return {FlxAnimationElement} .
            */
            class FlxAnimationElement extends HTMLElement {
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
                    lottie.loadAnimation({
                        container: this,
                        renderer: 'svg',
                        loop: true,
                        autoplay: true,
                        path: $(this).attr('src')
                    });
                }
            }
            /**
            * Array of observed attributes.
            * @property observedAttributes {Array}
            */
            FlxAnimationElement.observedAttributes = [];
            wc.FlxAnimationElement = FlxAnimationElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-animation', flexygo.ui.wc.FlxAnimationElement);
//# sourceMappingURL=flx-animation.js.map