/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    interface IPagerConfig {
        PagerId: string;
        Descrip: string;
        NumButtons: number;
        Template: string;
        Position: string;
    }
    /**
    * Library for the FlxSearchElement web component.
    *
    * @class FlxSearchElement
    * @constructor
    * @return {FlxSearchElement}
    */
    class FlxSearchElement extends HTMLElement {
        constructor();
        /**
        * Set when component is attached to DOM
        * @property connected {boolean}
        */
        connected: boolean;
        moduleName: string;
        page: number;
        orderObj: flexygo.api.list.PropertyOrder[];
        objectname: string;
        cryptedSql: string;
        removeKeys: boolean;
        pageSize: number;
        filter: string;
        maxRows: number;
        maxPages: number;
        sortColumn: string;
        pagesButtons: number;
        tHeader: string;
        tBody: string;
        tFooter: string;
        tModuleClass: string;
        fields: object;
        sortAsc: boolean;
        viewList: {
            [name: string]: string;
        };
        filterValues: flexygo.ui.wc.FlxFilterInfo[];
        activeFilter: string;
        userDefinedGroups: boolean;
        searchSettings: {
            [key: string]: flexygo.api.SearchSettings;
        };
        presets: {
            [key: string]: flexygo.api.PresetSettings;
        };
        pagerConfig: IPagerConfig;
        hasSearcher: boolean;
        searcher: JQuery;
        filters: string;
        data: any;
        buttons: flexygo.api.Toolbar;
        groups: flexygo.api.TemplateGroupCollection;
        groupList: flexygo.api.TemplateGroupCollection;
        viewId: string;
        pager: JQuery;
        presetId: string;
        presetText: string;
        presetIcon: string;
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
        attributeChangedCallback(attrName: string, oldVal: any, newVal: any): void;
        init(): void;
        refresh(): void;
        setFilter(): void;
        initGrid(initMode: boolean): void;
        startLoading(): void;
        stopLoading(): void;
        render(): void;
        /**
        * Sort based on an object .
        * @method sort
        * @param  {api.list.PropertyOrder[]} orderInfo
        */
        sortByObj(orderInfo: api.list.PropertyOrder[], groupsInfo: flexygo.api.TemplateGroupCollection): void;
        sort(columnItem: Element, property: string, ascMode?: boolean): void;
        loadPager(): void;
        setPreset(presetName: string, presetText: string, presetIcon: string): void;
        changePresetText(): void;
        checkPresetDisplay(): void;
        loadCount(): void;
        nextPage(): void;
        previousPage(): void;
        firstPage(): void;
        lastPage(): void;
        loadPage(newPage: number): void;
        loadSearcher(): void;
        loadFilters(settings: any): void;
        paintHeader(row: any): string;
        paintFooter(row: any): string;
        paintBody(row: any): string;
        translate(str: string): string;
        refreshPager(): void;
        _addBtns(btns: JQuery, pageNum: number): void;
        getValue(value: any): string;
        _getButton(btn: any, objectname: string, objectwhere: string, objectdefaults: any): JQuery;
    }
}
