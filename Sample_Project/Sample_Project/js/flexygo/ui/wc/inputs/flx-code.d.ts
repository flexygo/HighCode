declare var CodeMirror: any;
declare var JSHINT: any;
/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxCodeElement web component.
    *
    * @class FlxCodeElement
    * @constructor
    * @return {FlxCodeElement}
    */
    class FlxCodeElement extends HTMLElement {
        constructor();
        type: string;
        options: flexygo.api.ObjectProperty;
        property: string;
        moduleName: string;
        mode: string;
        readonly: any;
        myCM: any;
        value: string;
        /**
       * Set when component is attached to DOM
       * @property connected {boolean}
       */
        connected: boolean;
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
        init(): void;
        setOptions(): void;
        getValue(): string;
        setValue(value: string): void;
        setValueView(value: string): void;
        fullscreen(value: any): void;
        getMode(): string;
        getWizardButton(): string;
        setWizardSettings(m: any): void;
        /**
        * Trigger Dependencies.
        * @method triggerDependencies
        */
        triggerDependencies(): void;
    }
}
