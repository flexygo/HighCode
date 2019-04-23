/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxSwitchElement web component.
    *
    * @class FlxSwitchElement
    * @constructor
    * @return {FlxSwitchElement}
    */
    class FlxSwitchElement extends HTMLElement {
        constructor();
        /**
        * Set when component is attached to DOM
        * @property connected {boolean}
        */
        connected: boolean;
        options: flexygo.api.ObjectProperty;
        property: string;
        value: any;
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
        attributeChangedCallback(attrName: any, oldVal: any, newVal: any): void;
        refresh(): void;
        init(): void;
        initEditMode(): void;
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
