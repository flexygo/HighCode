/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxInputViewElement web component.
    *
    * @class FlxInputViewElement
    * @constructor
    * @return {FlxInputViewElement}
    */
    class FlxInputViewElement extends HTMLElement {
        constructor();
        /**
            * Set when component is attached to DOM
            * @property connected {boolean}
            */
        connected: boolean;
        type: string;
        property: string;
        options: flexygo.api.ObjectProperty;
        value: any;
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
        /**
   * Init the webcomponent.
   * @method init
   */
        init(): void;
        refresh(): void;
        getIconButtons(): JQuery;
        setOptions(): void;
        setValue(value: any, text?: string): void;
        getValue(): any;
    }
}
