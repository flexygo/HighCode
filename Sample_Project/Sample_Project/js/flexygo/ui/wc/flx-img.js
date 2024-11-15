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
                    this.length = 2;
                    /**
                   * Set if element has been connected to DOM
                   * @property connected {boolean}
                   */
                    this.connected = false;
                    this.addEventListener('error', () => {
                        const initials = this.alt.substring(0, this.length);
                        this.generateBackgroundImage(initials);
                    });
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    this.connected = true;
                    if (!($(this).attr('src'))) {
                        var initials = $(this).attr('alt').substring(0, this.length);
                        this.generateBackgroundImage(initials);
                    }
                    else if ($(this).attr('src').toString().toLowerCase().endsWith('.json')) {
                        let html = this.outerHTML.toString().toLowerCase();
                        html = html.replace('<img', '<flx-animation');
                        $(this).replaceWith(html);
                    }
                }
                generateBackgroundImage(initials) {
                    let background_color = this.getAttribute("backgroundcolor") || this.getAttribute("background_color");
                    if (!background_color)
                        background_color = flexygo.utils.randomColor(initials);
                    let text_color = this.getAttribute("color");
                    if (!text_color)
                        text_color = "#ffffff";
                    // Create a rectangular canvas which will become th image.
                    var canvas = document.createElement("canvas");
                    var context = canvas.getContext("2d");
                    canvas.width = canvas.height = 100;
                    // Draw the circle in the background using the randomColor.
                    context.fillStyle = background_color;
                    context.beginPath();
                    context.rect(0, 0, canvas.width, canvas.height);
                    context.fill();
                    context.font = (canvas.height / 2) + "px Arial";
                    context.fillStyle = text_color;
                    // Make the text's center overlap the image's center.
                    context.textAlign = "center";
                    context.textBaseline = "middle";
                    context.fillText(initials, canvas.width / 2, canvas.height / 2);
                    // Show the image to the world.
                    this.src = canvas.toDataURL();
                }
                /**
                * Fires when the attribute value of the element is changed.
                * @method attributeChangedCallback
                */
                attributeChangedCallback(attrName, oldVal, newVal) {
                }
            }
            /**
            * Array of observed attributes.
            * @property observedAttributes {Array}
            */
            FlxImgElement.observedAttributes = [];
            wc.FlxImgElement = FlxImgElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-img', flexygo.ui.wc.FlxImgElement, { extends: 'img' });
//# sourceMappingURL=flx-img.js.map