/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxSeparatorElement web component.
    *
    * @class FlxSeparatorElement
    * @constructor
    * @return {FlxSeparatorElement}
    */
    class FlxSeparatorElement extends HTMLElement {
        constructor();
        /**
        * Set when component is attached to DOM
        * @property connected {boolean}
        */
        connected: boolean;
        property: string;
        options: flexygo.api.ObjectProperty;
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
        init(): void;
        refresh(): void;
        setOptions(): void;
        setValue(value: any): void;
        getValue(): any;
        /**
        * Trigger Dependencies.
        * @method triggerDependencies
        */
        triggerDependencies(): void;
    }
}
