/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxCheckElement web component.
    *
    * @class FlxCheckElement
    * @constructor
    * @return {FlxCheckElement}
    */
    class FlxCheckElement extends HTMLElement {
        constructor();
        /**
        * Set when component is attached to DOM
        * @property connected {boolean}
        */
        connected: boolean;
        options: flexygo.api.ObjectProperty;
        property: string;
        moduleName: string;
        value: string;
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
        * Refresh de webcomponent.
        * @method refresh
        */
        refresh(): void;
        /**
        * Init the webcomponent.
        * @method init
        */
        init(): void;
        initEditMode(): void;
        setOptions(): void;
        setValue(value: any): void;
        getValue(): string;
        /**
        * Trigger Dependencies.
        * @method triggerDependencies
        */
        triggerDependencies(): void;
    }
}
