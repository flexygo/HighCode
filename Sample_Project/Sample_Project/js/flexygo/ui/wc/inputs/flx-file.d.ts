/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
* Library for the FlxFileWcElement web component.
*
* @class FlxFileWcElement
* @constructor
* @return {FlxFileWcElement}
*/
    class FlxFileWcElement extends HTMLElement {
        constructor();
        /**
        * Array of observed attributes.
        * @property observedAttributes {Array}
        */
        static readonly observedAttributes: string[];
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
        * Property Name
        * @property objectProperty {string}
        */
        property: string;
        /**
        * Property Options
        * @property options {any}
        */
        options: flexygo.api.ObjectProperty;
        /**
        * File Value
        * @property value {string}
        */
        value: string;
        /**
        * File Type
        * @property type {string}
        */
        type: string;
        /**
        * Control Mode
        * @property type {string}
        */
        mode: string;
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
        * Save file.
        * @method saveFile
        */
        saveFile(name: string, base64: string): void;
        /**
        * set options.
        * @method setOptions
        */
        setOptions(): void;
        /**
        * Set value.
        * @method SetValue
        */
        setValue(value: string): void;
        /**
        * Get value.
        * @method getValue
        */
        getValue(): string;
        /**
        * Trigger Dependencies.
        * @method triggerDependencies
        */
        triggerDependencies(): void;
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
