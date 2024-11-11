/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
* Library for the FlxChatGPTFieldsElement web component.
*
* @class FlxChatGPTFieldsElement
* @constructor
* @return {FlxChatGPTFieldsElement}
    */
    class FlxChatGPTFieldsElement extends HTMLElement {
        constructor();
        /**
        * Set when element is attached to DOM
        * @property connected {boolean}
        */
        connected: boolean;
        /**
        * Database row Module ID
        * @property moduleName {string}
        */
        moduleName: string;
        /**
        * Configuration module element
        * @property confModule {JQuery}
        */
        confModule: JQuery;
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
        * Initial dimensions of the elements
        * @property initialDimentions {{}}
        */
        initialDimentions: {};
        /**
        * Current Scale of elements
        * @property paperScale {number}
        */
        paperScale: number;
        /**
        * Name of the module that contains de configuration for the tables viewer
        * @property confModuleName {string}
        */
        confModuleName: string;
        /**
         * Boolean that controls whether or not the manual mode structure is checked
         * @property checkSintaxis {boolean}
         */
        checkSintaxis: boolean;
        tablesPositioned: boolean;
        previousOffset: {
            top: any;
            left: any;
        };
        /**
         * List of tables will be rendered
         */
        tables: string[];
        /**
         * List of fields
         */
        tableFields: string[][];
        /**
         * List of type fields
         */
        typeFields: string[][];
        /**
         * List of fields pre-selected
         */
        selectedFields: string[];
        /**
         * List of fields selected
         */
        fields: {};
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
        * Monitor the list of observed attribute for changes.
        * @property observedAttributes
        */
        observedAttributes(): string[];
        /**
        * Fires when the attribute value of the element is changed.
        * @method attributeChangedCallback
        */
        attributeChangedCallback(attrName: any, oldVal: any, newVal: any): void;
        /**
        * Init the webcomponent.
        * @method init
        */
        init(refresh?: boolean): Promise<void>;
        /**
        * Refresh de webcomponent.
        * @method refresh
        */
        refresh(): void;
        checkVisibilityConfig(): boolean;
        /**
         * Render HTML data.
         * @method render
         */
        render(): void;
        renderTables(): void;
        updateDimentions(): void;
        /**
        * Main events.
        * @method mainEvents
        */
        mainEvents(): void;
        propertySelected(selectedProperty: JQuery, onlySelect: boolean): void;
        relatedSelected(selectedProperty: JQuery): Promise<void>;
        tableSelected(selectedTable: JQuery, select: boolean): void;
        adjustPaperSize(): void;
        adjustTablesPosition(): void;
        adjustWrapper(): void;
        resizePaper(event: any): void;
        scaleStyle(element: string, property: string, initialValue: any, currentScale?: any): void;
        toogleOnHover(element: JQuery, onHover: boolean): void;
        centerOffset(element?: HTMLElement): void;
        clearTables(): Promise<void>;
        getSelectedFields(): void;
        getTables(): void;
        saveTables(): Promise<void>;
        getSavedTables(): Promise<unknown>;
        addNewTables(names: any): Promise<void>;
    }
}
