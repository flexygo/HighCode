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
            * Library for the flx-img.
            *
            * @class FlxImgElement
            * @constructor
            * @return {FlxImgElement} .
            */
            class FlxImgElement extends HTMLImageElement {
                constructor() {
                    super();
                    /**
                   * Set if element has been connected to DOM
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
                    if (!($(this).attr('src'))) {
                        var length = 2;
                        var initials = $(this).attr('alt').substring(0, length);
                        this.generateBackgroundImage(initials);
                    }
                }
                generateBackgroundImage(initials) {
                    var randomColor = flexygo.utils.randomColor(initials);
                    // Create a rectangular canvas which will become th image.
                    var canvas = document.createElement("canvas");
                    var context = canvas.getContext("2d");
                    canvas.width = canvas.height = 100;
                    // Draw the circle in the background using the randomColor.
                    context.fillStyle = randomColor;
                    context.beginPath();
                    context.rect(0, 0, canvas.width, canvas.height);
                    context.fill();
                    context.font = (canvas.height / 2) + "px Arial";
                    context.fillStyle = "#ffffff";
                    // Make the text's center overlap the image's center.
                    context.textAlign = "center";
                    context.textBaseline = "middle";
                    context.fillText(initials, canvas.width / 2, canvas.height / 2);
                    // Show the image to the world.
                    this.src = canvas.toDataURL();
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
            }
            wc.FlxImgElement = FlxImgElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-img', flexygo.ui.wc.FlxImgElement, { extends: 'img' });
//# sourceMappingURL=flx-img.js.map