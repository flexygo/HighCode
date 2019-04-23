/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxRadioElement web component.
    *
    * @class FlxRadioElement
    * @constructor
    * @return {FlxRadioElement}
    */
    class FlxRadioElement extends HTMLElement {
        constructor();
        /**
        * Set when component is attached to DOM
        * @property connected {boolean}
        */
        connected: boolean;
        property: string;
        type: string;
        options: flexygo.api.ObjectProperty;
        value: any;
        name: string;
        /**
        * Fires when element is attached to DOM
        * @method connectedCallback
        */
        connectedCallback(): void;
        /**
       * Array of observed attributes. REQUIRED
       * @property observedAttributes {Array}
       */
        static readonly observedAttributes: string[];
        /**
       * Fires when the attribute value of the element is changed.
       * @method attributeChangedCallback
       */
        attributeChangedCallback(attrName: any, oldVal: any, newVal: any): void;
        refresh(): void;
        init(): void;
        setOptions(): void;
        setValue(value: any, text?: string): void;
        setValueView(value: any): void;
        getValue(): any;
        /**
        * Trigger Dependencies.
        * @method triggerDependencies
        */
        triggerDependencies(): void;
    }
}
