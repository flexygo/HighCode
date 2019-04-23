/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the flx-easyinfo web component.
    *
    * @class FlxEasyInfoElement
    * @constructor
    * @return {FlxEasyInfoElement} .
    */
    class FlxEasyInfoElement extends HTMLElement {
        constructor();
        /**
        * Fires when element is attached to DOM
        * @method connectedCallback
        */
        connectedCallback(): void;
        /**
       * Set when component is attached to DOM
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
        * Adds easy info.
        * @method addEasInfo
        * @param {string} value
        * @param {string} label
        * @param {string} iconclass
        * @param {string} color
        * @param {string} click
        * @return {JQuery}
        */
        addEasInfo(value: string, easySymbol: string, label: string, iconclass: string, color: string, click?: string): JQuery;
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
