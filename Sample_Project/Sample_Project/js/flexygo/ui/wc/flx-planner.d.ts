/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxPlanner
    *
    * @class FlxPlanner
    * @constructor
    * @return {FlxPlanner} .
    */
    class FlxPlanner extends HTMLElement {
        connected: boolean;
        moduleName: string;
        objectName: string;
        objectWhere: string;
        collectionName: string;
        /**
       * WC Parent Module
       * @property wcParentModule {flexygo.ui.wc.FlxModuleElement}
       */
        wcParentModule: flexygo.ui.wc.FlxModuleElement;
        /**
        * Toolbar
        * @property toolbar {flexygo.api.Toolbar}
        */
        toolbar: flexygo.api.Toolbar;
        /**
        * Active Filter
        * @property activeFilter {string}
        */
        activeFilter: string;
        /**
        * Filter Values
        * @property filterValues {FlxFilterInfo[]}
        */
        filterValues: FlxFilterInfo[];
        /**
        * Search Settings
        * @property searchSettings {{[key: string]: flexygo.api.SearchSettings}}
        */
        searchSettings: {
            [key: string]: flexygo.api.SearchSettings;
        };
        /**
        * Defaults
        * @property defaults {{}}
        */
        defaults: {};
        objDef: object;
        groupsFilter: string;
        draggablesFilter: string;
        additionalWhere: string;
        plannerId: string;
        plannerObject: string;
        plannerTitle: string;
        PlannerName: string;
        MonthView: boolean;
        currentModeId: string;
        plannerInitDate: string;
        currentTimemode: string;
        plannerSettings: flexygo.api.Planner.PlannerConfig;
        plannerModesSettings: flexygo.api.Planner.PlannerModesConfig[];
        currentModeSettings: flexygo.api.Planner.PlannerModesConfig;
        cardList: flexygo.api.Planner.cardsResponse;
        pendingCards: any[];
        columns: any[];
        currentDraggableCard: string;
        draggablesIsRender: boolean;
        isRendered: boolean;
        isLoading: boolean;
        firstColumnInfo: [];
        dateStart: Date;
        dateEnd: Date;
        timeModes: {
            MONTH: string;
            WEEK: string;
        };
        componentHTML: string;
        lastLoaded: number;
        pageSize: number;
        constructor();
        static get observedAttributes(): string[];
        connectedCallback(): void;
        attributeChangedCallback(attrName: any, oldVal: any, newVal: any): void;
        init(): void;
        refresh(): void;
        getPlannerConfig(): void;
        render(): void;
        setFilter(): void;
        drawBoard(): void;
        drawModesButtons(): string;
        drawTimeModeButtons(): string;
        drawTable(): string;
        drawRows(): void;
        mainEvents(): void;
        timeButtonsEvents(): void;
        modesButtonsEvents(): void;
        openEvent(objectName: string, GroupField: string, DateField: string, GroupId: string, DateInfo: string): void;
        showContextMenu(template: any, e: any): void;
        setCardData(card: any, cardData: any, cardConfig: flexygo.api.Planner.PlannerCardsConfig, isnew?: boolean): void;
        objectActions(e: flexygo.api.Planner.PlannerCard, mode: string): void;
        dragScroll(): void;
        getObjectWhere(card: flexygo.api.Planner.PlannerCard): string;
        highlightItem(e: any, newBg: any): void;
        configureMode(): void;
        configure(): void;
        loadFilters(): void;
        refreshDraggrableGroup(mode: string): void;
        refreshCell(modeId: any, rowIdField: any, dateColumn: any): void;
    }
}
