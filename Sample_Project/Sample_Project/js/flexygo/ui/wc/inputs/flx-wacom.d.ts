/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
* Library for the FlxWacomElement web component.
*
* @class FlxWacomElement
* @constructor
* @return {FlxWacomElement}
    */
    class FlxWacomElement extends HTMLElement {
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
        timeout: any;
        mode: string;
        readonly: boolean;
        myCM: any;
        control: JQuery;
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
        initWacom(): void;
        timedDetect(): void;
        onDetectRunning(itm: FlxWacomElement): void;
        restartSession(onRestartSession: any): void;
        showError(method: string, status: any): void;
        captureSignature(): void;
        checkRGBStructure(RGBColor: string): boolean;
        convertRGBToOLEColor(RGBColor: string): number;
        removeAccents(texto: string): string;
        /**
        * Trigger Dependencies.
        * @method triggerDependencies
        */
        triggerDependencies(): void;
    }
}
