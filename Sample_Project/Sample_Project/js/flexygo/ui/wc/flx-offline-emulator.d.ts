/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxOfflineEmulator
    *
    * @class FlxOfflineEmulator
    * @constructor
        * @return {FlxOfflineEmulator} .
    */
    class FlxOfflineEmulator extends HTMLElement {
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
        * Database row Module ID
        * @property moduleName {string}
        */
        moduleName: string;
        /**
        * Emulator URL
        * @property url {string}
        */
        url: string;
        /**
        * Ionic Mode
        * @property ionicMode {string}
        */
        ionicMode: string;
        /**
        * Ionic Window
        * @property ionicWindow {Window}
        */
        ionicWindow: Window;
        /**
        * Iframe Loaded
        * @property iframeLoaded {boolean}
        */
        iframeLoaded: boolean;
        /**
        * Init the webcomponent. REQUIRED.
        * @method init
        */
        init(): void;
        /**
        * Refresh de webcomponent. REQUIRED.
        * @method refresh
        */
        refresh(): void;
        /**
        * Refresh pages from linked app.
        * @method refresh
        */
        refreshpages(): void;
        /**
        * Render HTML data.
        * @method render
        */
        render(): void;
        /**
        * Render Mode Toggle.
        * @method render
        */
        renderModeToggle(): string;
        /**
        * Render Device.
        * @method render
        */
        renderDevice(): string;
        /**
        * Render Device.
        * @method render
        */
        renderHelpOptions(): string;
        /**
        * Set Main Events.
        * @method setMainEvents
        */
        setMainEvents(): void;
        /**
        * Change Url.
        * @method changeUrl
        */
        changeUrl(): void;
        /**
        * Change Mode.
        * @method changeMode
        */
        changeMode(): void;
        /**
        * Build Url.
        * @method buildUrl
        */
        buildUrl(): string;
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
    }
}
