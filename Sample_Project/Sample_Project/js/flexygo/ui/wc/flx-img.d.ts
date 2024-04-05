/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the flx-img.
    *
    * @class FlxImgElement
    * @constructor
    * @return {FlxImgElement} .
    */
    class FlxImgElement extends HTMLImageElement {
        length: number;
        constructor();
        /**
       * Set if element has been connected to DOM
       * @property connected {boolean}
       */
        connected: boolean;
        /**
        * Fires when element is attached to DOM
        * @method connectedCallback
        */
        connectedCallback(): void;
        generateBackgroundImage(initials: any): void;
        /**
        * Array of observed attributes.
        * @property observedAttributes {Array}
        */
        static readonly observedAttributes: any[];
        /**
        * Fires when the attribute value of the element is changed.
        * @method attributeChangedCallback
        */
        attributeChangedCallback(attrName: any, oldVal: any, newVal: any): void;
    }
}
