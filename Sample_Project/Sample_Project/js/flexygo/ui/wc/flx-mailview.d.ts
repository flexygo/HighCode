/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxMailView
    *
    * @class FlxMailView
    * @constructor
    * @return {FlxMailView} .
    */
    class FlxMailView extends HTMLElement {
        constructor();
        /**
        * Array of observed attributes. REQUIRED
        * @property observedAttributes {Array}
        */
        static readonly observedAttributes: string[];
        /**
        * Set if element has been connected to DOM
        * @property connected {boolean}
        */
        connected: boolean;
        /**
        * imap|database
        * @property mode {string}
        */
        mode: string;
        /**
        * Message to show in module
        * @property mode {string}
        */
        messageid: string;
        /**
        * Message to show in module
        * @property mode {string}
        */
        objectName: string;
        /**
        * Message to show in module
        * @property mode {string}
        */
        objectId: string;
        toolbar: any;
        viewtemplate: string;
        /**
        * Init the webcomponent. REQUIRED.
        * @method init
        */
        init(): void;
        load(): void;
        render(ret: any): void;
        renderToolbar(defaults: any): void;
        observer: MutationObserver;
        observe(iframe: JQuery): void;
        resizeIframe(): void;
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
        /**
        * Refresh de webcomponent. REQUIRED.
        * @method refresh
        */
        refresh(ret: any): void;
        /**
        * Fires when element is attached to DOM
        * @method connectedCallback
        */
        connectedCallback(): void;
        /**
        * Fires when element is detached to DOM
        * @method disconnectedCallback
        */
        disconnectedCallback(): void;
        /**
        * Fires when the attribute value of the element is changed.
        * @method attributeChangedCallback
        */
        attributeChangedCallback(attrName: any, oldVal: any, newVal: any): void;
    }
}
