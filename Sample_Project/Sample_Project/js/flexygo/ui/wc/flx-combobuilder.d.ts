/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxCombobuilder
    *
    * @class FlxCombobuilder
    * @constructor
    * @return {FlxCombobuilder} .
    */
    class FlxComboBuilderElement extends HTMLElement {
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
        * Component Object Name
        * @property objectName {string}
        */
        objectName: string;
        /**
        * Component Object Where
        * @property objectWhere {string}
        */
        objectWhere: string;
        /**
        * Component Target Item
        * @property targetItem {JQuery}
        */
        targetItem: JQuery;
        /**
        * name of the property to fill in
        * @property sqlProperty {string}
        */
        sqlProperty: string;
        /**
        * Init the webcomponent. REQUIRED.
        * @method init
        */
        openQuote: string;
        closeQuote: string;
        init(): void;
        /**
        * Refresh de webcomponent. REQUIRED.
        * @method refresh
        */
        refresh(): void;
        /**
        * Render HTML data.
        * @method render
        */
        render(): void;
        setViewNameByDbType(): void;
        /**
        * Sets the html form structure
        * @method formComponents
        */
        formComponents(): string;
        /**
         * Enable combo fields text
         * @method enableComboFields
         */
        enableComboFields(): void;
        /**
        * SQL sentence with combos data
        * @method SQLSentence
        */
        SQLSentence(): string;
        /**
       * Fill SQL sentence with combos data
       * @method fillSQLTextField
       */
        fillSQLTextField(sql: any): void;
        /**
       *
       * @method openWizard
       */
        openWizard(e: any): void;
        /**
       *
       * @method validateRequired
       */
        validateRequired(...args: any[]): boolean;
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
