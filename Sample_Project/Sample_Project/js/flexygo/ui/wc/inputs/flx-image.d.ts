/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
* Library for the FlxImageElement web component.
*
* @class FlxImageElement
* @constructor
* @return {FlxImageElement}
*/
    class FlxImageElement extends HTMLElement {
        constructor();
        /**
        * Set when component is attached to DOM
        * @property connected {boolean}
        */
        connected: boolean;
        property: string;
        options: flexygo.api.ObjectProperty;
        value: any;
        moduleName: string;
        TypeMode: string;
        fileName: string;
        name: string;
        /**
        * Control Mode
        * @property type {string}
        */
        mode: string;
        pageContainer: JQuery;
        control: JQuery;
        files: any;
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
        * Initializes component depending on init mode attribute.
        * @method init
        */
        init(): void;
        /**
       * Initializes in view mode.
       * @method initViewMode
       */
        initViewMode(): void;
        /**
       * Initializes in edit mode.
       * @method initEditMode
       */
        initEditMode(): void;
        setOptions(): void;
        refresh(): void;
        setValue(value: any, text?: string): void;
        addTime(val: string): string;
        setValueView(value: any): void;
        getValue(): any;
        setResult(result: any): void;
        openDialog(): void;
        getRoundedCanvas(sourceCanvas: any): HTMLCanvasElement;
        getFileName(url: any): string;
        getName(url: any, mode: any): string;
        isJSON(str: any): boolean;
        /**
        * Trigger Dependencies.
        * @method triggerDependencies
        */
        triggerDependencies(): void;
    }
}
