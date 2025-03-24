declare var Html5Qrcode: {
    new (elementId: string): any;
    getCameras: Function;
};
/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxBarcodeElement web component.
    *
    * @class FlxBarcodeElement
    * @constructor
    * @return {FlxBarcodeElement}
    */
    class FlxBarcodeElement extends HTMLElement {
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
        initScanCodeUI(): Promise<void>;
        getScannerUI(is_mobile: boolean, cameras: any): string;
        formatReaders(readers_string: any): any;
        waitToTab(div: any): void;
        tabToNext(div: any, flxEdit: any): void;
        orderStackItems(a: any, b: any): 1 | -1;
        closeScanUI(): void;
        initViewMode(): void;
        initEditMode(): void;
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
