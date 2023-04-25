declare namespace Quagga {
    function init(obj: object, fnc: Function): void;
    function stop(): void;
    function onProcessed(fnc: Function): void;
    function offDetected(): void;
    function onDetected(fnc: Function): void;
    function start(): void;
    function decodeSingle(config: any, fnc: Function): void;
}
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
        initScanCodeUI(): void;
        getOptions(): {
            decoder: {
                readers: any;
            };
            frequency: number;
            inputStream: {
                constraints: {
                    aspectRatio: {
                        min: number;
                        max: number;
                    };
                    facingMode: string;
                    height: {
                        min: number;
                    };
                    width: {
                        min: number;
                    };
                };
                type: string;
            };
            lastResult: any;
            locate: boolean;
            locator: {
                halfSample: boolean;
                patchSize: string;
            };
            numOfWorkers: number;
        };
        initScanMode(): void;
        waitToTab(div: any): void;
        tabToNext(div: any, flxEdit: any): void;
        orderStackItems(a: any, b: any): 1 | -1;
        closeScanUI(): void;
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
