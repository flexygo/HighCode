/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxListElement web component.
    *
    * @class FlxListElement
    * @constructor
    * @return {FlxListElement}
    */
    class FlxListElement extends HTMLElement {
        constructor();
        /**
       * Set when component is attached to DOM
       * @property connected {boolean}
       */
        connected: boolean;
        mode: string;
        isFocused: boolean;
        objectname: string;
        childname: string;
        collectionname: string;
        objectwhere: string;
        processwhere: string;
        data: any;
        tHeader: string;
        tBody: string;
        tFooter: string;
        tCSSText: string;
        tScriptText: string;
        fields: object;
        currentRow: JQuery;
        prevRow: JQuery;
        isRowDirty: boolean;
        pager: JQuery;
        pagerConfig: flexygo.api.list.ModulePager;
        additionalWhere: string;
        cryptedSql: string;
        removeKeys: boolean;
        page: number;
        pageSize: number;
        pagesButtons: number;
        maxRows: number;
        maxPages: number;
        moduleName: string;
        groups: flexygo.api.TemplateGroupCollection;
        groupList: flexygo.api.TemplateGroupCollection;
        userDefinedGroups: boolean;
        sortColumn: string;
        sortAsc: boolean;
        orderObj: flexygo.api.list.PropertyOrder[];
        viewId: string;
        templateId: string;
        presetId: string;
        presetText: string;
        presetIcon: string;
        removePreset: string;
        templatetype: string;
        tEmpty: string;
        tModuleClass: string;
        templateList: {
            [name: string]: string;
        };
        viewList: {
            [name: string]: string;
        };
        defaults: any;
        canDelete: boolean;
        canInsert: boolean;
        canUpdate: boolean;
        filter: string;
        filters: string;
        filterValues: FlxFilterInfo[];
        activeFilter: string;
        buttons: flexygo.api.Toolbar;
        moduleButtons: flexygo.api.Toolbar;
        propArr: flexygo.api.ObjectProperty[];
        templateKey: string;
        hasSearcher: boolean;
        searcher: JQuery;
        searchSettings: {
            [key: string]: flexygo.api.SearchSettings;
        };
        savedSearches: {
            [key: string]: flexygo.api.SavedSearch;
        };
        properties: {
            [key: string]: flexygo.api.ObjectProperty;
        };
        refreshing: number;
        presets: {
            [key: string]: flexygo.api.PresetSettings;
        };
        TemplateToolbarCollection: any;
        currentViewers: {
            [name: string]: string;
        };
        /**
       * Fires when element is attached to DOM
       * @method connectedCallback
       */
        connectedCallback(): void;
        /**
        * Fires when element is dettached to DOM
        * @method connectedCallback
        */
        disconnectedCallback(): void;
        /**
       * Array of observed attributes.
       * @property observedAttributes {Array}
       */
        static readonly observedAttributes: string[];
        /**
        * Fires when the attribute value of the element is changed.
        * @method attributeChangedCallback
        */
        attributeChangedCallback(attrName: any, oldVal: any, newVal: any): void;
        /**
        * Refresh the webcomponent
        * @method refresh
        */
        refresh(): void;
        /**
       * Init the webcomponent.
       * @method init
       */
        init(): void;
        setDefaultOrder(): void;
        saveDefaultOrder(): void;
        setDefaultGroup(): void;
        saveDefaultGroup(): void;
        hasGroup(groupField: any): boolean;
        toggleGroup(groupField: any): void;
        addGroup(groupField: any): void;
        removeGroup(groupField: any): void;
        onEntityChanged(e: flexygo.events.FlexygoEvent): void;
        setPreset(presetName: string, presetText: string, presetIcon: string): void;
        changePresetText(): void;
        checkPresetDisplay(): void;
        setFilter(): void;
        /**
        * Init the grid.
        * @method initGrid
        * @param {boolean} refreshButtons
        * @param {boolean} refreshFilters
        * @param {number} newPage
        */
        initGrid(refreshButtons: boolean, refreshFilters: boolean, newPage?: number): void;
        /**
         * Sets the parent module to start loading mode.
         * @method startLoading
         */
        startLoading(): void;
        /**
        * Sets the parent module to stop loading mode.
        * @method stopLoading
        */
        stopLoading(): void;
        /**
        * Start info Template
        * @property startInfo {string}
        */
        startInfoTemplate(): string;
        /**
        * Set main events.
        * @method setStartInfoEvents
        */
        setStartInfoEvents(): void;
        hasProperties(): boolean;
        setRowEvents(): void;
        setRowEvent(el: any): void;
        /**
        * Starts control rendering.
        * @method render
        */
        render(): void;
        /**
        *Processes dependency loading
        * @method processLoadDependencies
        */
        processLoadDependencies(listRows?: JQuery): void;
        /**
     * Refreshes a property
     * @method refreshProperty
     * @param {flexygo.api.edit.DependencyAction} itm
     * @param {JQuery} prop
     * @param {boolean} loadDependency
     * @return {string}
     */
        refreshProperty(itm: flexygo.api.edit.DependencyAction, prop: JQuery, loadDependency: boolean): void;
        /**
        * Parses edit string
        * @method parseEditString
        * @param {string} str
        * @return {string}
        */
        parseEditString(str: string, ctx: flexygo.ui.wc.FlxEditElement | flexygo.ui.wc.FlxListElement, property: Element): string;
        /**
        * Captures property change event
        * @method onPropertyChanged
        * @param {flexygo.events.FlexygoEvent} e
        */
        onPropertyChanged(e: flexygo.events.FlexygoEvent): void;
        /**
        * Validate property
        * @method validateSQLProperty
        * @param {string} propertyName
        * @param {Properties}  flexygo.api.edit.KeyValuePair[]
        */
        validateSQLProperty(propertyName: string, Properties: flexygo.api.edit.KeyValuePair[]): void;
        addLock(): void;
        removeLock(): void;
        loadingDependencies: number;
        pendingSaveButton: JQuery;
        _resizeGridProps(): void;
        /**
        * Establish webcomponent settings
        * @method configure
        */
        configure(): void;
        /**
       * Sort based on an object .
       * @method sort
       * @param  {api.list.PropertyOrder[]} orderInfo
       */
        sortByObj(orderInfo: api.list.PropertyOrder[], groupsInfo: flexygo.api.TemplateGroupCollection): void;
        /**
        * Sort based on column in asc or desc mode.
        * @method sort
        * @param  {Element} columnItem
        * @param  {string} property
        * @param  {boolean} ascMode
        */
        sort(columnItem: Element, property: string, ascMode?: boolean): void;
        /**
        * loads pager.
        * @method loadPager
        */
        loadPager(): void;
        /**
        * Refreshes pager.
        * @method refreshPager
        */
        refreshPager(): void;
        private addButtons(btns, pageNum);
        /**
       * Moves to next page.
       * @method nextPage
       */
        nextPage(): void;
        /**
        * Moves to previous page.
        * @method previousPage
        */
        previousPage(): void;
        /**
        * Moves to first page.
        * @method firstPage
        */
        firstPage(): void;
        /**
       * Moves to last page.
       * @method lastPage
       */
        lastPage(): void;
        /**
        * Loads page given a page number.
        * @method lastPage
        * param {number} newPage
        */
        loadPage(newPage: number): void;
        /**
       * Save page into history.
       * @method savePageValueHistory
       */
        savePageValueHistory(): void;
        savePresetValueHistory(): void;
        /**
        * Load searcher
        * @method loadSearcher
        */
        loadSearcher(): void;
        /**
        * Load filters
        * @method loadFilters
        * @param  settings
        */
        loadFilters(settings: {
            [key: string]: flexygo.api.SearchSettings;
        }): void;
        /**
        * Paint header
        * @method paintHeader
        * @param {JQuery} row
        * @return {string}
        */
        paintHeader(row: JQuery): string;
        /**
      * Paint footer
      * @method paintFooter
      * @param {JQuery} row
      * @return {string}
      */
        paintFooter(row: string): string;
        /**
        * Paint Body
        * @method paintBody
        * @param {JQuery} row
        * @return {string}
        */
        paintBody(row: any): string;
        /**
       *Translates string
       * @method translate
       * @param {string} str
       * @return {string}
       */
        translate(str: string): string;
        _getButton(btn: flexygo.api.ToolbarButton, objectname: string, objectwhere: string, objectdefaults: string): JQuery;
        _getTemplateButton(json: any, typeId: string, IconClass: string, Text: string, TargetId: string): string;
        /**
        *Gets value from property
        * @method getValue
        * @param {any} value
        * @return {any}
        */
        getValue(value: any): any;
        /**
       *Loads list count
       * @method loadCount
       */
        loadCount(): void;
        /**
        * Gets module full Id using pagename objectname modulename
        * @method getModuleFullId
        * @return {string}
        */
        getModuleFullId(): string;
        setFocus(me: JQuery, listItem: flexygo.ui.wc.FlxListElement, e: JQueryEventObject): void;
    }
    function clearRow(list: JQuery, btn: JQuery): void;
    function saveRow(objectName: string, objectWhere: string, list: JQuery, btn: JQuery, msg?: boolean): void;
}
declare let ev: any;
