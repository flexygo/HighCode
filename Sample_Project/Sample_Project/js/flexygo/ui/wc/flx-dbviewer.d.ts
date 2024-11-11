/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxAIElement
    *
    * @class FlxAIElement
    * @constructor
    * @return {FlxAIElement} .
    */
    class FlxDbViewerElement extends HTMLElement {
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
        editor: any;
        connectionCombo: flexygo.ui.wc.FlxDbComboElement;
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
        setMainEvents(): void;
        missingConnection(): boolean;
        setSchemaSQL(value: string): void;
        getTestData(connection: string): void;
        handlePreviewButton(e: flexygo.events.FlexygoEvent): void;
        generateObjects(connection: string, tables: string[]): Promise<void>;
        apiObjectCreationCall(params: any, table: any): Promise<string>;
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
        * Fires when element is detached to DOM
        * @method disconnectedCallback
        */
        disconnectedCallback(): void;
    }
}
