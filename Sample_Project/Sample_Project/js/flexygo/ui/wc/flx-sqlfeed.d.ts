/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxSqlFeedElement web component.
    *
    * @class FlxSqlFeedElement
    * @constructor
    * @return {FlxSqlFeedElement}
    */
    class FlxSqlFeedElement extends HTMLElement {
        constructor();
        /**
        * Set when component is attached to DOM
        * @property connected {boolean}
        */
        connected: boolean;
        moduleName: string;
        /**
       * Fires when element is attached to DOM
       * @method connectedCallback
       */
        connectedCallback(): void;
        /**
       * Array of observed attributes.
       * @property observedAttributes {Array}
       */
        static readonly observedAttributes: string[];
        /**
       * Fires when the attribute value of the element is changed.
       * @method attributeChangedCallback
       */
        attributeChangedCallback(attrName: string, oldVal: any, newVal: any): void;
        refresh(): void;
        init(): void;
        translate(str: string): string;
        startLoading(): void;
        stopLoading(): void;
    }
}
