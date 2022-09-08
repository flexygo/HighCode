/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxModuleTabElement web component.
    *
    * @class FlxModuleTabElement
    * @constructor
    * @return {FlxModuleTabElement}
    */
    class FlxModuleTabElement extends HTMLElement {
        /**
       * Set when component is attached to DOM
       * @property connected {boolean}
       */
        connected: boolean;
        moduleName: string;
        pageName: string;
        mode: string;
        config: flexygo.api.pages.PageModule[];
        activeModule: flexygo.api.pages.PageModule;
        activeTitle: string;
        moduleInitClass: string;
        constructor();
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
        render(): void;
        showModule(modIndex: number): void;
        saveModulePresetHistory(module: api.pages.PageModule): void;
        translate(str: string): string;
        startLoading(): void;
        stopLoading(): void;
    }
}
