/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
* Library for the flx-easypie web component.
*
* @class FlxEasyPieElement
* @constructor
* @return {FlxEasyPieElement} .
*/
    class FlxEasyPieElement extends HTMLElement {
        constructor();
        /**
        * Fires when element is attached to DOM
        * @method connectedCallback
        */
        connectedCallback(): void;
        /**
       * Setted when component is attached to DOM
       * @property connected {boolean}
       */
        connected: boolean;
        /**
       * Array of observed attributes.
       * @property observedAttributes {Array}
       */
        static readonly observedAttributes: string[];
        /**
        * Fires when the attribute value of the element is changed.
        * @method attributeChangedCallback
        */
        attributeChangedCallback(attrName: any, oldVal: any, newVal: any): void;
        moduleName: string;
        data: Array<object>;
        value: string;
        options: string;
        /**
       * Refresh de webcomponent.
       * @method refresh
       */
        refresh(): void;
        /**
       * Init the webcomponent.
       * @method init
       */
        init(): void;
        /**
       * Render HTML data from module configuration.
       * @method renderFromModule
       */
        renderFromModule(): void;
        /**
        * Render HTML data from attribute configuration.
        * @method renderFromAttr
        */
        renderFromAttr(): void;
        /**
       * Adds easy pie.
       * @method addEasyPie
       * @param {string} value
       * @param {string} pieSymbol
       * @param {string} label
       * @param {string} color
       * @param {string} gradientColor
       * @param {string} newOptions
       * @param {object} row
       * @return {JQuery}
       */
        addEasyPie(value: string, pieSymbol: string, label: string, size: string, color: string, gradientColor: string, newOptions: string, row?: object): JQuery;
        /**
       * Translates string.
       * @method addEasInfo
       * @param {string} str
       * @return {string}
       */
        translate(str: string): string;
        /**
      * Start loading.
      * @method startLoading
      */
        startLoading(): void;
        /**
      * Stop loading.
      * @method stopLoading
      */
        stopLoading(): void;
    }
}
