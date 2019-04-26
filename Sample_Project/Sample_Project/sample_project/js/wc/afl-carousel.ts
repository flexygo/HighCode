/**
 * @namespace ahoraflexy.ui.wc
 */

namespace ahoraflexy.ui.wc {
/**
* Library for the AflCarousel
*
* @class AflCarousel
* @constructor
* @return {aflCarousel} .
*/
    export class AflCarousel extends HTMLElement {

        constructor() {
            //If a constructor is defined, is REQUIRED call the super constructor
            super();
        }

        /**
        * Array of observed attributes. REQUIRED
        * @property observedAttributes {Array}
        */
        static get observedAttributes() {
            return ['ObjectName', 'ObjectWhere', 'ModuleName','asd'];
        }

        /**
        * Set if element has been connected to DOM
        * @property connected {boolean}
        */
        connected: boolean = false;


        /**
        * Database row Module ID
        * @property moduleName {string}
        */
        moduleName: string;

        /**
        * Component Object Name
        * @property objectName {string}
        */
        objectName: string;

        /**
        * Component Object Where
        * @property objectWhere {string}
        */
        objectWhere: string;


        /**
        * Init the webcomponent. REQUIRED.
        * @method init
        */
        init(): void {
			this.render();
        }

        /**
		* Render HTML data.
		* @method render
		*/
		render(): void {
			this.loadData()
		}

		 /**
		* Calls controller and load carousel
		* @method render
		*/
		loadData(): void {

			let me = $(this);

			let params = {
				ObjectName: me.attr('ObjectName'),
				ObjectWhere: me.attr('ObjectWhere'),
				ModuleName: this.moduleName
			};

			flexygo.ajax.post('~/api/Carousel', 'getData', params, (response) => {
				if (response) {
					debugger;
					let imgs = new Array();
					for (let i = 0; i < response.length; i++) {
						imgs.push({ src: flexygo.utils.resolveUrl(response[i].File) })
					}
					let carr = $('<div class="carrousel"><div>')
					me.html(carr);
					carr.jR3DCarousel({ slides: imgs });
				}
			});
		}

        /**
        * Fires when element is attached to DOM
        * @method connectedCallback
        */
        connectedCallback(): void {

            let element = $(this);
            this.connected = true;

            this.objectName = element.attr("ObjectName");
            this.objectWhere = element.attr("ObjectWhere");
            this.moduleName = element.attr("ModuleName");

            this.init();

        }

        /**
        * Fires when the attribute value of the element is changed.
        * @method attributeChangedCallback
        */
        attributeChangedCallback(attrName, oldVal, newVal): void {

            let needInit: boolean = false;

            if (attrName.toLowerCase() == 'modulename' && newVal && newVal != '') {
                this.moduleName = newVal;
                needInit = true;
            } else if (attrName.toLowerCase() == 'objectname' && newVal && newVal != '') {
                this.objectName = newVal;
                needInit = true;
            } else if (attrName.toLowerCase() == 'objectwhere' && newVal && newVal != '') {
                this.objectWhere = newVal;
                needInit = true;
            }

            if (this.connected && needInit) {
                this.init();
            }
        }
    }


}

window.customElements.define("afl-carousel", ahoraflexy.ui.wc.AflCarousel);
			  