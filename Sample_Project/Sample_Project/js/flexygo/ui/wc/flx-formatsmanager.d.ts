/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxFormatsManager
    *
    * @class FlxFormatsManager
    * @constructor
    * @return {FlxFormatsManager} .
    */
    class FlxFormatsManagerElement extends HTMLElement {
        constructor();
        offline: boolean;
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
        * Component Target Item
        * @property targetItem {JQuery}
        */
        targetTextbox: string;
        /**
        * Component Field to format
        * @property fieldToFormat {string}
        */
        fieldToFormat: string;
        /**
        * Component Formated Field
        * @property formatedField {string}
        */
        formatedField: string;
        /**
        *Component Format Type
        * @property formattype {string}
        */
        formatType: string;
        /**
        * Component Switch Options Number
        * @property optionsSwitchNum {number}
        */
        optionsSwitchNum: number;
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
        * Render HTML data.
        * @method render
        */
        render(): void;
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
        * Inputs components.
        * @method formComponents
        */
        formComponents(): string;
        /**
        * Main events
        * @method events
        */
        mainEvents(): void;
        /**
        * Get Object Data Fields
        * @method getDataFields
        */
        getDataFields(target: any, offline?: boolean): string;
        /**
        * Render controls
        * @method renderFormatsTypeControls
        */
        renderFormatsTypeControls(type: string): void;
        /**
        * Types Events
        * @method typesEvents
        */
        typesEvents(): void;
        /**
        * Switch Events
        * @method switchEvents
        */
        switchEvents(index: any): void;
        /**
        *
        * @method getFormatField
        */
        getFormatField(): void;
        /**
        *
        * @method openWizard
        */
        openWizard(e: any, offline?: boolean): void;
    }
}
