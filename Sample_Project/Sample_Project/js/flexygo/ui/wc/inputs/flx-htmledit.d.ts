/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
* Library for the FlxHtmlEditElement web component.
*
* @class FlxHtmlEditElement
* @constructor
* @return {FlxHtmlEditElement}
*/
    class FlxHtmlEditElement extends HTMLElement {
        constructor();
        /**
       * Set when component is attached to DOM
       * @property connected {boolean}
       */
        connected: boolean;
        type: string;
        property: string;
        options: flexygo.api.ObjectProperty;
        moduleName: string;
        mode: string;
        readonly: boolean;
        myCM: any;
        value: any;
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
        attributeChangedCallback(attrName: string, oldVal: any, newVal: any): void;
        refresh(): void;
        init(): void;
        initViewMode(): void;
        initEditMode(): void;
        setOptions(): void;
        getValue(): any;
        setValue(value: any): void;
        setValueView(value: any): void;
        fullscreen(value: any): void;
        /**
        * Trigger Dependencies.
        * @method triggerDependencies
        */
        triggerDependencies(): void;
    }
}
