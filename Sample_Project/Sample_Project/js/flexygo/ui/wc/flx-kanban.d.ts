/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxKanban
    *
    * @class FlxKanban
    * @constructor
    * @return {FlxKanban} .
    */
    class FlxKanban extends HTMLElement {
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
        config: flexygo.api.kanban.kanbanSettings;
        columns: {}[];
        cards: {}[];
        defaults: {};
        boardId: string;
        boardOrder: {
            columnId: string;
            order: number;
            cardId: string;
        }[];
        sorting: boolean;
        sortingFrom: string;
        panel: JQuery;
        endbox: JQuery;
        boardTitle: string;
        boardDescrip: string;
        searchSettings: {
            [key: string]: flexygo.api.SearchSettings;
        };
        savedSearches: {
            [key: string]: flexygo.api.SavedSearch;
        };
        filterobjectname: string;
        additionalWhere: string;
        filterValues: FlxFilterInfo[];
        activeFilter: string;
        moduleButtons: flexygo.api.Toolbar;
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
        setFilter(): void;
        /**
        * Render HTML data.
        * @method render
        */
        render(): void;
        getCardOrder(columnId: string, cardId: string): number;
        sortStart(item: JQuery): void;
        sortStop(item: JQuery): void;
        getConfig(): string;
        descripClick(el: JQuery, pageType: any): void;
        newCardClick(el: JQuery): void;
        onDialogClosed(e: flexygo.events.FlexygoEvent): void;
        loadKanban(refreshButtons: boolean, refreshFilters: boolean): void;
        /**
       * Load filters
       * @method loadFilters
       * @param  settings
       */
        loadFilters(settings: {
            [key: string]: flexygo.api.SearchSettings;
        }): void;
        /**
       * Establish webcomponent settings
       * @method configure
       */
        configure(): void;
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
        * Fires when the attribute value of the element is changed.
        * @method attributeChangedCallback
        */
        attributeChangedCallback(attrName: any, oldVal: any, newVal: any): void;
    }
}
