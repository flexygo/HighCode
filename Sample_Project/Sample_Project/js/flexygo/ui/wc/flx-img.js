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
                    this.colors = ['#EF9A9A',
                        '#F48FB1',
                        '#CE93D9',
                        '#694c9f',
                        '#4e5a9a',
                        '#32638a',
                        '#244b5d',
                        '#4a9ba7',
                        '#30635e',
                        '#2ea879',
                        '#679238',
                        '#a5b22e',
                        '#59819d',
                        '#bca047',
                        '#FFCC80',
                        '#FFAB91',
                        '#BDAAA4',
                        '#B1BEC5',
                        '#D32E2E',
                        '#C2175B',
                        '#7B1FA2',
                        '#5D35B1',
                        '#3948AB',
                        '#1D88E5',
                        '#009BE5',
                        '#00ACC1',
                        '#00897B',
                        '#43A046',
                        '#7CB342',
                        '#C0CA33',
                        '#FED935',
                        '#FFB300',
                        '#FB8C00',
                        '#F4501D',
                        '#6D4C41',
                        '#757575',
                        '#546E7A'];
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
                    let value = initials;
                    while (!$.isNumeric(value) || (this.colors.length <= value)) {
                        let currentIndex = 0;
                        value = value.toString().split('');
                        for (let i = 0; i < value.length; i++) {
                            if ($.isNumeric(value[i])) {
                                currentIndex += parseInt(value[i]);
                            }
                            else {
                                currentIndex += value[i].charCodeAt();
                            }
                        }
                        value = currentIndex;
                    }
                    var randomColor = this.colors[value];
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