/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxUploadElement web component.
    *
    * @class FlxUploadElement
    * @constructor
    * @return {FlxUploadElement}
    */
    class FlxUploadElement extends HTMLElement {
        constructor();
        /**
        * Set when element is attached to DOM
        * @property webControl {JQuery}
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
        * Component Process Where
        * @property processWhere {string}
        */
        processName: string;
        /**
        * Property Name
        * @property objectProperty {string}
        */
        property: string;
        /**
        * Custom CSS
        * @property customCSS {string}
        */
        customCSS: string;
        /**
        * Custom Script
        * @property customScript {string}
        */
        customScript: string;
        /**
        * Root Path
        * @property rootPath {string}
        */
        rootPath: string;
        /**
        * Property Options
        * @property options {any}
        */
        options: flexygo.api.ObjectProperty;
        /**
        * Upload Value
        * @property value {string}
        */
        value: string;
        /**
        * Upload Type
        * @property type {JSON}
        */
        type: string;
        /**
        * Composer Attachment Template
        * @property composerAttachmentTemplate {string}
        */
        /**
        * Control Mode
        * @property type {string}
        */
        mode: string;
        uploadFileTemplate: Function;
        /**
        * Fires when element is attached to DOM
        * @method connectedCallback
        */
        connectedCallback(): void;
        /**
        * Monitor the list of observed attribute for changes.
        * @property observedAttributes
        */
        static readonly observedAttributes: string[];
        /**
        * Fires when the attribute value of the element is changed.
        * @method attributeChangedCallback
        */
        attributeChangedCallback(attrName: any, oldVal: any, newVal: any): void;
        /**
        * Fires when element is detached to DOM
        * @method disconnectedCallback
        */
        disconnectedCallback(): void;
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
        * Main events.
        * @method mainEvents
        */
        mainEvents(): void;
        /**
        * Get configuration.
        * @method getConfig
        */
        getConfig(): void;
        /**
        * Get value.
        * @method setValue
        */
        setValue(value: object): number;
        /**
        * Get value.
        * @method getValue
        */
        getValue(): string;
    }
}
