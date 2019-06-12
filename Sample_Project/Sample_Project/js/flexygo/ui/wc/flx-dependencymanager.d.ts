/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the flx-dependencymanager web component.
    *
    * @class FlxDependencyManagerElement
    * @constructor
    * @return {FlxDependencyManagerElement} .
    */
    class FlxDependencyManagerElement extends HTMLElement {
        /**
       * Set when component is attached to DOM
       * @property connected {boolean}
       */
        connected: boolean;
        template: string;
        objectname: string;
        reportname: string;
        processname: string;
        propertyname: string;
        constringItems: any;
        mode: string;
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
        attributeChangedCallback(attrName: any, oldVal: any, newVal: any): boolean;
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
      * RefrLoads connstrings for combo.
      * @method loadConnStrings
      */
        private loadConnStrings();
        /**
        * RefrLoads tabs.
        * @method loadTabs
        */
        private loadTabs();
        /**
       * Saves dependencies.
       * @method save
       */
        save(): void;
        private loadProps();
        private processDependency(dep);
        /**
        * Gets template.
        * @method getTemplate
        * @returns string
        */
        getTemplate(): string;
        /**
      * Gets connection string items as string.
      * @method getConnStringItems
      * @returns string
      */
        getConnStringItems(): string;
    }
}
