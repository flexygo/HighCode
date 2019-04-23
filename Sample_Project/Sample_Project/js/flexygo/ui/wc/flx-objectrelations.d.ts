/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxObjectRelationsElement web component.
    *
    * @class FlxObjectRelationsElement
    * @constructor
    * @return {FlxObjectRelationsElement}
    */
    class FlxObjectRelationsElement extends HTMLElement {
        constructor();
        /**
       * Set when component is attached to DOM
       * @property connected {boolean}
       */
        connected: boolean;
        moduleName: string;
        mode: string;
        data: any;
        connectedCallback(): void;
        static readonly observedAttributes: string[];
        attributeChangedCallback(attrName: any, oldVal: any, newVal: any): void;
        refresh(): void;
        init(): void;
        render(): void;
        translate(str: string): string;
        startLoading(): void;
        stopLoading(): void;
    }
}
