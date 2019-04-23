/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
* Library for the FlxTagElement web component.
*
* @class FlxTagElement
* @constructor
* @return {FlxTagElement}
*/
    class FlxTagElement extends HTMLElement {
        constructor();
        /**
        * Set when component is attached to DOM
        * @property connected {boolean}
        */
        connected: boolean;
        type: string;
        options: flexygo.api.ObjectProperty;
        dropOptions: string[];
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
        appendValue(value: any): string;
        setOptions(): void;
        setValue(value: any): void;
        setValueView(value: any): void;
        getValue(): any;
        getOptions(strs: any): (q: any, cb: any) => void;
        /**
        * Trigger Dependencies.
        * @method triggerDependencies
        */
        triggerDependencies(): void;
    }
}
