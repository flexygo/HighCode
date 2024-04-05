/**
 * @namespace flexygo.ui.wc
 */
declare var LeaderLine: any;
declare namespace flexygo.ui.wc {
    /**
* Library for the FlxRelationshipElement web component.
*
* @class FlxRelationshipElement
* @constructor
* @return {FlxRelationshipElement}
    */
    class FlxRelationshipElement extends HTMLElement {
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
        * Relationships formed
        * @property relations {{}}
        */
        relations: {};
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
        * Thickness of the relationship line
        * @property paperScale {number}
        */
        relationlineSize: number;
        /**
        * Parent object name
        * @property parentObjectName {string}
        */
        parentObjectName: string;
        parentKeyProperties: string[];
        /**
        * Child object name
        * @property childObjectName {string}
        */
        childObjectName: string;
        /**
        * Boolean that control if the relationship field could be modified by the assistant
        * @property childObjectName {string}
        */
        manageInputValue: boolean;
        /**
        * Name of the module that contains de configuration for the relationship viewer
        * @property confModuleName {string}
        */
        confModuleName: string;
        /**
        * Property name of the input that will be filled with the relationship beetween objects
        * @property childObjectName {string}
        */
        inputPropertyName: string;
        /**
        * Another property name of a input that will be filled with the relationship
        * @property secundaryInputPropertyName {string}
        */
        secundaryInputPropertyName: string;
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
        renderTables(table?: string): void;
        renderProperties(ObjectName: string, selector: string): string;
        setObjects(e: flexygo.events.FlexygoEvent): void;
        onPropertyConfChange(e: flexygo.events.FlexygoEvent): void;
        updateDimentions(): void;
        clearRelations(refresh?: boolean): void;
        /**
        * Main events.
        * @method mainEvents
        */
        mainEvents(): void;
        propertySelected(selectedProperty: JQuery): void;
        addRelation(parentProperty: JQuery, childProperty: JQuery, refresh: boolean): void;
        setRelations(): void;
        suggestRelations(): void;
        removeRelation(relationKey: string, refresh: boolean): void;
        discardRelation(event: JQueryEventObject): void;
        setNewRelationValue(): void;
        adjustRelationLines(): void;
        adjustPaperSize(): void;
        adjustTablesPosition(): void;
        adjustWrapper(): void;
        resizePaper(): void;
        getAnchorNodes(firstPropertyName: any, secondPropertyName: any): {
            start: {};
            end: {};
        };
        scaleStyle(element: string, property: string, initialValue: any, currentScale?: any): void;
        showContextMenu(relationKey: string, event: JQueryEventObject): void;
        toogleOnHover(element: JQuery, onHover: boolean): void;
        centerOffset(element?: HTMLElement): void;
    }
}
