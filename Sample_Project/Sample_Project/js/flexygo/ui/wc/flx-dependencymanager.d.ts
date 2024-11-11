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
        filter: string;
        searchId: string;
        reportname: string;
        processname: string;
        propertyname: string;
        constringItems: any;
        cusControlsItems: any;
        propItems: any[];
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
        private loadConnStrings;
        /**
      * RefrLoads CusControls for combo.
      * @method loadCusControls
      */
        private loadCusControls;
        /**
        * RefrLoads tabs.
        * @method loadTabs
        */
        private loadTabs;
        /**
       * RefrLoads tabs.
       * @method loadFilterTabs
       */
        private loadFilterTabs;
        /**
       * Saves dependencies.
       * @method save
       */
        save(): void;
        private loadProps;
        filterProperties(e: JQuery, cnt?: any): void;
        private unactivePropClick;
        private processDependency;
        /**
        * Gets template.
        * @method getTemplate
        * @returns string
        */
        getTemplate(): string;
        getFilterTemplate(): string;
        /**
      * Gets connection string items as string.
      * @method getConnStringItems
      * @returns string
      */
        getConnStringItems(): string;
        getCusControls(): string;
        deleteDependency(dep: any): void;
        showSQLEditor(e: any): void;
    }
}
