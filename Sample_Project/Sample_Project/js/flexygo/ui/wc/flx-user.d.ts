/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxUserElement web component.
    *
    * @class FlxUserElement
    * @constructor
    * @return {FlxUserElement}
    */
    class FlxUserElement extends HTMLElement {
        constructor();
        /**
        * Fires when element is attached to DOM
        * @method connectedCallback
        */
        connectedCallback(): void;
        /**
        * Monitor the list of observed attribute for changes.
        * @property observedAttributes
        */
        static readonly observedAttributes: string[];
        /**
        * Fires when the attribute value of the element is changed.
        * @method attributeChangedCallback
        */
        attributeChangedCallback(attrName: any, oldVal: any, newVal: any): void;
        /**
        * Initialize Web Control
        * @method init
        */
        init(): void;
        /**
        * Refreses Web Control
        * @method refresh
        */
        refresh(): void;
    }
}
