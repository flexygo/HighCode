/**
 * @namespace ahoraflexy.ui.wc
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ahoraflexy;
(function (ahoraflexy) {
    var ui;
    (function (ui) {
        var wc;
        (function (wc) {
            /**
            * Library for the AflCarousel
            *
            * @class AflCarousel
            * @constructor
            * @return {aflCarousel} .
            */
            var AflCarousel = (function (_super) {
                __extends(AflCarousel, _super);
                function AflCarousel() {
                    var _this = 
                    //If a constructor is defined, is REQUIRED call the super constructor
                    _super.call(this) || this;
                    /**
                    * Set if element has been connected to DOM
                    * @property connected {boolean}
                    */
                    _this.connected = false;
                    return _this;
                }
                Object.defineProperty(AflCarousel, "observedAttributes", {
                    /**
                    * Array of observed attributes. REQUIRED
                    * @property observedAttributes {Array}
                    */
                    get: function () {
                        return ['ObjectName', 'ObjectWhere', 'ModuleName', 'asd'];
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                * Init the webcomponent. REQUIRED.
                * @method init
                */
                AflCarousel.prototype.init = function () {
                    this.render();
                };
                /**
                * Render HTML data.
                * @method render
                */
                AflCarousel.prototype.render = function () {
                    this.loadData();
                };
                /**
               * Calls controller and load carousel
               * @method render
               */
                AflCarousel.prototype.loadData = function () {
                    var me = $(this);
                    var params = {
                        ObjectName: me.attr('ObjectName'),
                        ObjectWhere: me.attr('ObjectWhere'),
                        ModuleName: this.moduleName
                    };
                    flexygo.ajax.post('~/api/Carousel', 'getData', params, function (response) {
                        if (response) {
                            debugger;
                            var imgs = new Array();
                            for (var i = 0; i < response.length; i++) {
                                imgs.push({ src: flexygo.utils.resolveUrl(response[i].File) });
                            }
                            var carr = $('<div class="carrousel"><div>');
                            me.html(carr);
                            carr.jR3DCarousel({ slides: imgs });
                        }
                    });
                };
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                AflCarousel.prototype.connectedCallback = function () {
                    var element = $(this);
                    this.connected = true;
                    this.objectName = element.attr("ObjectName");
                    this.objectWhere = element.attr("ObjectWhere");
                    this.moduleName = element.attr("ModuleName");
                    this.init();
                };
                /**
                * Fires when the attribute value of the element is changed.
                * @method attributeChangedCallback
                */
                AflCarousel.prototype.attributeChangedCallback = function (attrName, oldVal, newVal) {
                    var needInit = false;
                    if (attrName.toLowerCase() == 'modulename' && newVal && newVal != '') {
                        this.moduleName = newVal;
                        needInit = true;
                    }
                    else if (attrName.toLowerCase() == 'objectname' && newVal && newVal != '') {
                        this.objectName = newVal;
                        needInit = true;
                    }
                    else if (attrName.toLowerCase() == 'objectwhere' && newVal && newVal != '') {
                        this.objectWhere = newVal;
                        needInit = true;
                    }
                    if (this.connected && needInit) {
                        this.init();
                    }
                };
                return AflCarousel;
            }(HTMLElement));
            wc.AflCarousel = AflCarousel;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = ahoraflexy.ui || (ahoraflexy.ui = {}));
})(ahoraflexy || (ahoraflexy = {}));
window.customElements.define("afl-carousel", ahoraflexy.ui.wc.AflCarousel);
//# sourceMappingURL=afl-carousel.js.map