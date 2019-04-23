/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxTextAreaElement web component.
    *
    * @class FlxTextAreaElement
    * @constructor
    * @return {FlxTextAreaElement}
    */
    class FlxTextAreaElement extends HTMLElement {
        constructor();
        /**
       * Set when component is attached to DOM
       * @property connected {boolean}
       */
        connected: boolean;
        options: flexygo.api.ObjectProperty;
        property: string;
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
        refresh(): void;
        init(): void;
        initViewMode(): void;
        initEditMode(): void;
        getIconButtons(): JQuery;
        setOptions(): void;
        setValue(value: any): void;
        setValueView(value: any): void;
        getValue(): any;
        /**
        * Trigger Dependencies.
        * @method triggerDependencies
        */
        triggerDependencies(): void;
    }
}
