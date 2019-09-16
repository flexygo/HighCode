/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxEasyline
    *
    * @class FlxEasyline
    * @constructor
    * @return {FlxEasyLine} .
    */
    class FlxEasyLine extends HTMLElement {
        constructor();
        /**
        * Array of observed attributes. REQUIRED
        * @property observedAttributes {Array}
        */
        static readonly observedAttributes: string[];
        /**
        * Set if element has been connected to DOM
        * @property connected {boolean}
        */
        connected: boolean;
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
        data: Array<object>;
        label: string;
        color: string;
        value: string;
        size: string;
        symbol: string;
        rounded: string;
        hideValue: string;
        /**
        * Init the webcomponent. REQUIRED.
        * @method init
        */
        init(): void;
        /**
        * Refresh de webcomponent. REQUIRED.
        * @method refresh
        */
        refresh(): void;
        /**
        * Render HTML data.
        * @method render
        */
        render(): void;
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
        * @method addEasyLine
        * @param {string} value
        * @param {string} label
        * @param {string} color
        * @param {string} symbol
        * @param {string} size
        * @param {string} rounded
        * @param {string} hideValue
        */
        addEasyLine(value: string, label: string, color: string, symbol: string, size: string, rounded: string, hideValue: string): void;
        setValue(value: string, color?: string, symbol?: string): void;
        /**
        * Formats de value shown to user
        * @method formatValue
        */
        formatValue(value: number): number;
        /**
        * Fires when element is attached to DOM
        * @method connectedCallback
        */
        connectedCallback(): void;
        /**
        * Fires when the attribute value of the element is changed.
        * @method attributeChangedCallback
        */
        attributeChangedCallback(attrName: any, oldVal: any, newVal: any): void;
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
