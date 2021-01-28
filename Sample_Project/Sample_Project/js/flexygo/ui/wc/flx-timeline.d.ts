/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxTimelineElement
    *
    * @class FlxTimelineElement
    * @constructor
    * @return {FlxTimelineElement} .
    */
    class FlxTimelineElement extends HTMLElement {
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
        /**
       * Component Filter Where
       * @property filterWhere {string}
       */
        filterWhere: string;
        /**
        * WC Parent Module
        * @property wcParentModule {flexygo.ui.wc.FlxModuleElement}
        */
        wcParentModule: flexygo.ui.wc.FlxModuleElement;
        /**
        * Timeline Setting
        * @property timelineSetting {flexygo.api.timeline.timelineSetting}
        */
        timelineSetting: flexygo.api.timeline.timelineSetting;
        /**
        * Defaults
        * @property defaults {{}}
        */
        defaults: {};
        /**
         * Toolbar
         * @property toolbar {flexygo.api.Toolbar}
         */
        toolbar: flexygo.api.Toolbar;
        /**
        * Search Settings
        * @property searchSettings {{[key: string]: flexygo.api.SearchSettings}}
        */
        searchSettings: {
            [key: string]: flexygo.api.SearchSettings;
        };
        /**
         * Saved Searches
         * @property savedSearches {{[key: string]: flexygo.api.SavedSearch}}
         */
        savedSearches: {
            [key: string]: flexygo.api.SavedSearch;
        };
        /**
        * Filter Values
        * @property filterValues {FlxFilterInfo[]}
        */
        filterValues: FlxFilterInfo[];
        /**
        * Active Filter
        * @property activeFilter {string}
        */
        activeFilter: string;
        /**
        * Vis Timeline
        * @property visTimeline {flexygo.api.timeline.visTimeline}
        */
        visTimeline: flexygo.api.timeline.visTimeline;
        /**
        * Vis Timeline
        * @property timelineranges {flexygo.api.timeline.timelineRanges}
        */
        timelineRanges: flexygo.api.timeline.timelineRanges;
        /**
        * Init the webcomponent. REQUIRED.
        * @method init
        */
        init(): void;
        /**
        * Refresh of webcomponent. REQUIRED.
        * @method refresh
        */
        refresh(): void;
        /**
        * Set filter of webcomponent. REQUIRED.
        * @method refresh
        */
        setFilter(): void;
        /**
        * Render HTML data.
        * @method render
        */
        render(): void;
        /**
        * Set Structure Events.
        * @method setStructureEvents
        */
        setStructureEvents(): void;
        /**
        * Init Vis Timeline.
        * @method initVisTimeline
        * @param {vis.DataItemCollectionType} visItems Items Data.
        * @param {vis.DataGroupCollectionType} visGroups Groups Data.
        * @param {vis.TimelineOptions} visOptions Options Data.
        */
        initVisTimeline(visItems: vis.DataItemCollectionType, visGroups: vis.DataGroupCollectionType, visOptions?: vis.TimelineOptions): void;
        /**
        * Init Vis Timeline.
        * @method setItemsWithoutGroups
        * @param {vis.DataItemCollectionType} visItems Items Data.
        * @param {vis.DataGroupCollectionType} visGroups Groups Data.
        * @param {vis.TimelineOptions} visOptions Options Data.
        */
        setItemsWithoutGroups(visItems: {}[]): void;
        /**
        * Get Timeline.
        * @method getTimeline
        */
        getTimeline(): void;
        /**
        * Build Vis Options.
        * @method buildVisOptions
        * @param {object} visTimelineOptions.
        */
        buildVisOptions(): flexygo.api.timeline.visTimelineOptions;
        /**
        * Build Vis Item.
        * @method buildVisItem
        * @param {object} data Data item.
        */
        buildVisItem(data: {}, isNew?: boolean): flexygo.api.timeline.visTimelineItem | flexygo.api.timeline.visDataItem;
        /**
        * Build Vis Group.
        * @method buildVisGroup
        * @param {object} data Data group.
        */
        buildVisGroup(data: {}, order: any): flexygo.api.timeline.visDataGroup;
        /**
        * Object Actions.
        * @method objectActions
        * @param {flexygo.api.timeline.visTimelineItem} object item object.
        * @param {string} action action.
        */
        objectActions(object: flexygo.api.timeline.visTimelineItem, action: ('insert' | 'update' | 'edit' | 'delete')): Promise<flexygo.api.timeline.visTimelineItem>;
        /**
        * Open Object Edit.
        * @method openObjectEdit
        * @param {flexygo.api.timeline.visTimelineItem} object item object.
        * @param {flexygo.obj.Entity} objectEntity object Entity.
        */
        openObjectEdit(object: flexygo.api.timeline.visTimelineItem, objectEntity: flexygo.obj.Entity): Promise<flexygo.api.timeline.visTimelineItem>;
        /**
        * Get Object Where.
        * @method getObjectWhere
        * @param {Array} id id object.
        */
        getObjectWhere(id: Array<{
            key: string;
            value: any;
        }>): string;
        /**
        * Has id structure.
        * @method hasIdStructure
        * @param {string} id id object.
        */
        hasIdStructure(id: string): boolean;
        /**
        * Has id structure.
        * @method hasIdStructure
        * @param {string} json JSON String
        */
        isJson(json: string): boolean;
        /**
        * Check Editable Property.
        * @method checkEditableProperty
        * @param {string} valueJson JSON String
        */
        checkEditableProperty(valueJson: string): boolean;
        /**
        * Load filters
        * @method loadFilters
        */
        loadFilters(): void;
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
    /**
    * Library for the FlxTimelineProgressBar
    *
    * @class FlxTimelineProgressBar
    * @constructor
    * @return {FlxTimelineProgressBar} .
    */
    class FlxTimelineProgressBar extends HTMLElement {
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
        * Component Color
        * @property color {string}
        */
        color: string;
        /**
        * Component Percentage
        * @property percentage {string}
        */
        percentage: string;
        /**
        * Component Template
        * @property template {string}
        */
        template: string;
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
    }
}
