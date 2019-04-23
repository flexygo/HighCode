/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
* Library for the FlxGenericSearchElement web component.
*
* @class FlxGenericSearchElement
* @constructor
* @return {FlxGenericSearchElement}
*/
    class FlxGenericSearchElement extends HTMLElement {
        /**
       * Set when component is attached to DOM
       * @property connected {boolean}
       */
        connected: boolean;
        gridId: string;
        constructor();
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
        attributeChangedCallback(attrName: any, oldVal: any, newVal: any): void;
        init(): void;
        refresh(): void;
        setId(gridId: string): void;
    }
}
