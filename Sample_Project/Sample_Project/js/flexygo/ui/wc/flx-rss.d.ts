/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxRssElement web component.
    *
    * @class FlxRssElement
    * @constructor
    * @return {FlxRssElement}
    */
    class FlxRssElement extends HTMLElement {
        constructor();
        /**
       * Set when component is attached to DOM
       * @property connected {boolean}
       */
        connected: boolean;
        productsVersionInfo: flexygo.api.rss.ProductVersionInfo[];
        /**
            * Array of observed attributes.
            * @property observedAttributes {Array}
            */
        static readonly observedAttributes: string[];
        /**
        * Fires when element is attached to DOM
        * @method connectedCallback
        */
        connectedCallback(): void;
        /**
       * Fires when the attribute value of the element is changed.
       * @method attributeChangedCallback
       */
        attributeChangedCallback(attrName: any, oldVal: any, newVal: any): void;
        moduleName: string;
        /**
       * Refresh de webcomponent.
       * @method refresh
       */
        refresh(): Promise<void>;
        /**
        * Init the webcomponent.
        * @method init
        */
        init(): Promise<void>;
        initVersionInfo(module: any, params: any): Promise<void>;
        setProductVersionInfo(params: any, module: any): Promise<boolean>;
        initRSS(module: any, params: any): Promise<void>;
        render(): void;
        renderVersions(productIndex: any): string;
        renderReleaseNotes(productIndex: any, versionIndex: any): string;
        setMainEvents(): void;
    }
}
