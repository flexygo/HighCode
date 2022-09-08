/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    type navbuttonTypes = "home" | "openpage" | "openpagename" | "execprocess" | "openprocessparams" | "openreportsparams" | "viewreport" | "openhelpid" | "externalhome" | "externalopenpage" | "externalopenpagename";
    /**
    * Library for the FlxSampleWcElement
    *
    * @class FlxSampleWcElement
    * @constructor
    * @return {FlxSampleWcElement} .
    */
    class FlxNavButtonElement extends HTMLElement {
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
        * External App Name
        * @property appname {string}
        */
        appname: string;
        /**
       * Type
       * @property type {navbuttonTypes}
       */
        type: navbuttonTypes;
        /**
        * Object Name
        * @property objectname {string}
        */
        objectname: string;
        /**
        * Object Where
        * @property objectwhere {string}
        */
        objectwhere: string;
        /**
       * Object defaults
       * @property defaults {string}
       */
        defaults: string;
        /**
       *  target Id
       * @property targetid {string}
       */
        targetid: string;
        /**
       *Include navigation in history
       * @property excludehist {boolean}
       */
        excludehist: boolean;
        /**
       * Page name
       * @property pagename {string}
       */
        pagename: string;
        /**
       * Page type
       * @property pagetypeid  {string}
       */
        pagetypeid: string;
        /**
       * callback function
       * @property callback {function}
       */
        callback: any;
        /**
        * Process name
        * @property processname  {string}
        */
        processname: string;
        /**
        * processparams
        * @property processparams {string}
        */
        processparams: string;
        /**
        * Report Name
         * @property reportname {string}
        */
        reportname: string;
        /**
        * Report Where
        * @property reportwhere {string}
        */
        reportwhere: string;
        /**
        * Report Params
        * @property reportparams {string}
        */
        reportparams: any;
        /**
        * Help Id
        * @property helpid {string}
        */
        helpid: any;
        /**
        * Show Progress in process
        * @property showProgress {boolean}
        */
        showprogress: boolean;
        /**
        * Sets the preset of the compatible elemets
        * @property showProgress {boolean}
        */
        presets: string;
        /**
        * Disables the onclick event
        * @property disabled {boolean}
        */
        disabled: boolean;
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
        /**
        * Init the webcomponent.
        * @method init
        */
        init(): void;
        /**
        * Refresh de webcomponent.
        * @method refresh
        */
        refresh(): void;
        /**
        * Render HTML data.
        * @method render
        */
        render(): void;
        /**
        * Executes the designated nav function
        * @param ev Click/mouseDown jquery event
        * @param me Component in jquery type
        * @method execNavFunction
        */
        execNavFunction(ev: JQueryEventObject, me: any): void;
    }
}
