/**
 * @namespace flexygo.ui.wc
 */
declare var powerbi: any;
declare namespace flexygo.ui.wc {
    /**
    * Library for the flx-powerbi web component.
    *
    * @class FlxPowerBIElement
    * @constructor
    * @return {FlxPowerBIElement} .
    */
    class FlxPowerBIElement extends HTMLElement {
        constructor();
        /**
        * Fires when element is attached to DOM
        * @method connectedCallback
        */
        connectedCallback(): void;
        /**
       * Set when component is attached to DOM
       * @property connected {boolean}
       */
        connected: boolean;
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
        reportName: string;
        /**
       * Refresh de webcomponent.
       * @method refresh
       */
        refresh(): void;
        /**
       * Init the webcomponent.
       * @method init
       */
        init(): void;
        /**
        * Render report.
        * @method render
        */
        render(): void;
        loadReport(accessToken: any, embedUrl: any, embedReportId: any): void;
        /**
       * Start loading.
       * @method startLoading
       */
        startLoading(): void;
        /**
       * Stop loading.
       * @method stopLoading
       */
        stopLoading(): void;
    }
}
