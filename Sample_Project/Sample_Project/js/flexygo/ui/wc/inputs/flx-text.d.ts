/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxTextElement web component.
    *
    * @class FlxTextElement
    * @constructor
    * @return {FlxTextElement}
    */
    class FlxTextElement extends HTMLElement {
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
        attributeChangedCallback(attrName: string, oldVal: any, newVal: any): void;
        refresh(): void;
        init(): void;
        initViewMode(): void;
        tactilModeAvailable: boolean;
        firefoxNav: boolean;
        initEditMode(): void;
        setUrlLink(): void;
        setPhoneNumber(): void;
        setMail(): void;
        getIconButtons(): JQuery;
        showCronGenerator(itm: any): void;
        showCoordGenerator(itm: any, tag: any): void;
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
