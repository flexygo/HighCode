/**
 * @namespace flexygo.api
 */
declare namespace flexygo.api {
    /**
    * api for GenericKeyValueObject
    * @class GenericKeyValueObject
    * @constructor
    * @return {GenericKeyValueObject} .
    */
    class GenericKeyValueObject {
        key: string;
        value: string;
    }
    /**
    * api for ObjectRelationsSettings
    * @class ObjectRelationsSettings
    * @constructor
    * @return {ObjectRelationsSettings} .
    */
    class ObjectRelationsSettings {
        ObjectName: string;
        ShowInMenu: boolean;
        ShowInAnalysis: boolean;
        ChildCollection: string;
        Defaults: string;
        Relation: string;
        OneToOne: boolean;
    }
    /**
    * api for BasicProperty
    * @class BasicProperty
    * @constructor
    * @return {BasicProperty} .
    */
    class BasicProperty {
        Name: string;
        Value: any;
        Text: string;
        Label: string;
        PositionX: number;
        PositionY: number;
        Width: number;
        Height: number;
        WebComponent: string;
        IconClass: string;
        DefaultValue: any;
    }
    /**
    * api for BasicPropertyCollection
    * @class BasicPropertyCollection
    * @constructor
    * @return {BasicPropertyCollection} .
    */
    class BasicPropertyCollection {
        [key: string]: flexygo.api.BasicProperty;
    }
    /**
    * api for PropertyResize
    * @class PropertyResize
    * @constructor
    * @return {PropertyResize} .
    */
    class PropertyResize {
        Name: string;
        PropertyName: string;
        PositionX: number;
        PositionY: number;
        Width: number;
        Height: number;
    }
    /**
    * api for BasicPropertyLoweredKey
    * @class BasicPropertyLoweredKey
    * @constructor
    * @return {BasicPropertyLoweredKey} .
    */
    class BasicPropertyLoweredKey {
        name: string;
        value: any;
        text: string;
        label: string;
        positionx: number;
        positiony: number;
        width: number;
        height: number;
        webcomponent: string;
        iconclass: string;
        defaultvalue: any;
    }
    /**
    * api for ObjectProperty
    * @class ObjectProperty
    * @constructor
    * @return {ObjectProperty} .
    */
    class ObjectProperty {
        ObjectName: string;
        Name: string;
        PositionX: number;
        PositionY: number;
        Width: number;
        Height: number;
        Hide: boolean;
        ClientReadOnly: boolean;
        FormDisplay: boolean;
        SearchTypes: string;
        DefaultSearchType: string;
        ControlType: string;
        Mask: string;
        SQLSentence: string;
        SQLEditSentence: string;
        SQLFilter: string;
        SQLValueField: string;
        SQLDisplayField: string;
        SQLTemplateId: string;
        WhereSentence: string;
        Label: string;
        OriginalLabel: string;
        DefaultValue: string;
        PersistDefaultValue: boolean;
        IgnoreDBDefaultValue: boolean;
        DetachedFromDB: boolean;
        SearchFunction: string;
        SearchCollection: string;
        SearchWhere: string;
        SearchReturnFields: string;
        SecurityObject: string;
        AllowNew: string;
        AllowNewObject: string;
        AllowNewFunction: string;
        AllowNewReturnFields: string;
        ObjNameLink: string;
        ObjWhereLink: string;
        TargetIdLink: string;
        Style: string;
        CssClass: string;
        LabelStyle: string;
        LabelCssClass: string;
        DecimalPlaces: number;
        RootPath: string;
        FormatString: string;
        DirectTemplate: string;
        Tag: string;
        HelpId: string;
        ConnStringId: string;
        IsRequired: boolean;
        IsRequiredMessage: string;
        MaxNumOfChars: number;
        MinValue: number;
        MinValueMessage: string;
        MaxValue: number;
        MaxValueMessage: string;
        RegExp: string;
        RegExpText: string;
        OnChangeJsFunction: string;
        OnChangeProcessName: string;
        PlaceHolder: string;
        WebComponent: string;
        IconClass: string;
        ToolbarName: string;
        Separator: string;
        AutoIncrement: boolean;
        AutoIncrementFunction: string;
        Locked: boolean;
        CauseRefresh: boolean;
        HasDefinition: boolean;
        ObjectPath?: string;
        Type?: string;
        AllowNull?: boolean;
        HTMLDropDownValues?: JQuery;
        DropDownValues?: flexygo.api.edit.KeyValuePair[];
        Multiple?: boolean;
        ViewName?: string;
        Template?: string;
        ProcessName?: string;
        ReportName?: string;
        PageSize?: number;
    }
    /**
    * api for ObjectPropertyLoweredKey
    * @class ObjectPropertyLoweredKey
    * @constructor
    * @return {ObjectPropertyLoweredKey} .
    */
    class ObjectPropertyLoweredKey {
        objectname: string;
        name: string;
        positionx: number;
        positiony: number;
        width: number;
        height: number;
        hide: boolean;
        clientreadonly: boolean;
        formdisplay: boolean;
        searchtypes: string;
        defaultsearchtype: string;
        controltype: string;
        mask: string;
        sqlsentence: string;
        sqleditsentence: string;
        sqlfilter: string;
        sqlvaluefield: string;
        sqldisplayfield: string;
        sqltemplateid: string;
        wheresentence: string;
        label: string;
        originallabel: string;
        defaultvalue: string;
        persistdefaultvalue: boolean;
        ignoredbdefaultvalue: boolean;
        detachedfromdb: boolean;
        searchfunction: string;
        searchcollection: string;
        searchwhere: string;
        searchreturnfields: string;
        securityobject: string;
        allownew: string;
        allownewobject: string;
        allownewfunction: string;
        allownewreturnfields: string;
        objnamelink: string;
        objwherelink: string;
        targetidlink: string;
        style: string;
        cssclass: string;
        labelstyle: string;
        labelcssclass: string;
        decimalplaces: number;
        rootpath: string;
        formatstring: string;
        directtemplate: string;
        tag: string;
        helpid: string;
        connstringid: string;
        isrequired: boolean;
        isrequiredmessage: string;
        minvalue: number;
        minvaluemessage: string;
        maxvalue: number;
        maxvaluemessage: string;
        regexp: string;
        regexptext: string;
        onchangejsfunction: string;
        onchangeprocessname: string;
        placeholder: string;
        webcomponent: string;
        iconclass: string;
        toolbarname: string;
        separator: string;
        autoincrement: boolean;
        autoincrementfunction: string;
        locked: boolean;
        causerefresh: boolean;
        hasdefinition: boolean;
        objectpath?: string;
        type?: string;
        allownull?: boolean;
        htmldropdownvalues?: JQuery;
        dropdownvalues?: flexygo.api.edit.KeyValuePair[];
        multiple?: boolean;
        viewname?: string;
        template?: string;
        processname?: string;
        reportname?: string;
        pagesize?: number;
    }
    /**
    * api for ObjectPropertyCollection
    * @class ObjectPropertyCollection
    * @constructor
    * @return {ObjectPropertyCollection} .
    */
    class ObjectPropertyCollection {
        [key: string]: flexygo.api.ObjectProperty;
    }
    /**
    * api for SearchProperty
    * @class SearchProperty
    * @constructor
    * @return {SearchProperty} .
    */
    class SearchProperty {
        ObjectName: string;
        PropertyName: string;
        Label: string;
        OriginalLabel: string;
        Order: number;
        PropertySearchType: string;
        WebComponent?: string;
        Size: number;
        Config?: flexygo.api.ObjectProperty;
        ObjectPath?: string;
        Type?: string;
    }
    /**
    * api for SearchSettings
    * @class SearchSettings
    * @constructor
    * @return {SearchSettings} .
    */
    class SearchSettings {
        SearchId: string;
        ObjectName: string;
        Name: string;
        Generic: boolean;
        IsDefault: boolean;
        Type: string;
        SQLSentence: string;
        Properties: Array<SearchProperty>;
    }
    /**
* api for SavedSearch
* @class SavedSearch
* @constructor
* @return {SavedSearch} .
*/
    class SavedSearch {
        SearchId: string;
        Name: string;
        Id: string;
        Values: Array<SearchProperty>;
        Generic: boolean;
    }
    /**
    
    * api for SavedSearchesCollection
    * @class SavedSearchesCollection
    * @constructor
    * @return {SavedSearchesCollection} .
    */
    class SavedSearchesCollection {
        [key: string]: flexygo.api.SavedSearch;
    }
    /**
    /**
    * api for PresetSettings
    * @class PresetSettings
    * @constructor
    * @return {PresetSettings} .
    */
    class PresetSettings {
        PresetName: string;
        ObjectName: string;
        Title: string;
        IconClass: string;
        IconName: string;
        TitleClass: string;
        Order: number;
    }
    /**

    /**
* api for PresetSettingsCollection
* @class PresetSettingsCollection
* @constructor
* @return {PresetSettingsCollection} .
*/
    class PresetSettingsCollection {
        [key: string]: flexygo.api.PresetSettings;
    }
    /**
    * api for SearchSettingsCollection
    * @class SearchSettingsCollection
    * @constructor
    * @return {SearchSettingsCollection} .
    */
    class SearchSettingsCollection {
        [key: string]: flexygo.api.SearchSettings;
    }
    /**
    * api for ObjectSearchPropertyType
    * @class ObjectSearchPropertyType
    * @constructor
    * @return {ObjectSearchPropertyType} .
    */
    class ObjectSearchPropertyType {
        PropertySearchType: string;
        Descrip: string;
        WebComponent: string;
        DefaultSize: number;
        IconName: string;
    }
    /**
    * api for ObjectSearchType
    * @class ObjectSearchType
    * @constructor
    * @return {ObjectSearchType} .
    */
    class ObjectSearchType {
        Type: string;
    }
    /**
    * api for Toolbar
    * @class Toolbar
    * @constructor
    * @return {Toolbar} .
    */
    class Toolbar {
        [name: string]: flexygo.api.ToolbarButton;
    }
    /**
    * api for ToolbarButton
    * @class ToolbarButton
    * @constructor
    * @return {ToolbarButton} .
    */
    class ToolbarButton {
        ButtonId: string;
        ParentButtonId?: string;
        Order: number;
        Text: string;
        ToolTip: string;
        TypeId: string;
        HideText: boolean;
        CssClass?: string;
        SQlSentence?: string;
        ProcessName?: string;
        TargetId?: string;
        ReportName?: string;
        HelpId?: string;
        Disabled: boolean;
        PositionId: string;
        IconClass: string;
        ImagePath?: string;
        ObjectName?: string;
        ObjectWhere?: string;
    }
    /**
    * api for TemplateGroupCollection
    * @class TemplateGroupCollection
    * @constructor
    * @return {TemplateGroupCollection} .
    */
    class TemplateGroupCollection {
        [key: string]: TemplateGroup;
    }
    /**
    * api for TemplateGroup
    * @class TemplateGroup
    * @constructor
    * @return {TemplateGroup} .
    */
    class TemplateGroup {
        GroupField: string;
        Order: number;
        Header: string;
        Footer: string;
    }
    /**
    * api for Template
    * @class Template
    * @constructor
    * @return {Template} .
    */
    class Template {
        Id: string;
        ObjectName: string;
        TemplateType: string;
        IsDefault: boolean;
        Description: string;
        DataViewName: string;
        IsDefaultGrid: boolean;
        Body: string;
        Header: string;
        Footer: string;
        Empty: string;
        ScriptText: string;
        CSSText: string;
        ModuleClass: string;
        WhereSentence: string;
        TableSQL: string;
        RemoveKeys: boolean;
        PageSize: number;
        TableData: any;
        Groups: TemplateGroupCollection;
        Data: {
            [name: string]: flexygo.api.BasicProperty;
        };
    }
    /**
    * api for ObjectViewProperty
    * @class ObjectViewProperty
    * @constructor
    * @return {ObjectViewProperty} .
    */
    class ObjectViewProperty {
        ObjectPropertyName: string;
        PropertyName: string;
        Label: string;
        ObjectPath: string;
        Order: number;
    }
    /**
    * api for ObjectViewPropertyCollection
    * @class ObjectViewPropertyCollection
    * @constructor
    * @return {ObjectViewPropertyCollection} .
    */
    class ObjectViewPropertyCollection {
        [key: string]: ObjectViewProperty;
    }
    /**
    * api for ObjectView
    * @class ObjectView
    * @constructor
    * @return {ObjectView} .
    */
    class ObjectView {
        Name: string;
        Order: number;
        Description: string;
        ConnStringId: string;
        DbSource: number;
        NoFilter: boolean;
        ShowAsGrid: boolean;
        Inactive: boolean;
        IsDefault: boolean;
        IsCollection: boolean;
        SQL: string;
        Properties: ObjectViewPropertyCollection;
    }
    /**
    * api for ObjectViewCollection
    * @class ObjectViewCollection
    * @constructor
    * @return {ObjectViewCollection} .
    */
    class ObjectViewCollection {
        [key: string]: flexygo.api.ObjectView;
    }
}
/**
 * @namespace flexygo.api.chart
 */
declare namespace flexygo.api.chart {
    /**
    * api for GetHTMLParameters
    * @class GetHTMLParameters
    * @constructor
    * @return {GetHTMLParameters} .
    */
    class GetHTMLParameters {
        ObjectName: string;
        ObjectWhere: string;
        ModuleName: string;
        PageName: string;
    }
    /**
    * api for GetHTMLResponse
    * @class GetHTMLResponse
    * @constructor
    * @return {GetHTMLResponse} .
    */
    class GetHTMLResponse {
        Values: string[];
        Buttons: flexygo.api.Toolbar;
        Options: string;
        Labels: string;
        Series: string;
        Value: string;
        Params: string;
        Title: string;
        ChartBackground: string;
        ChartBorder: string;
        ChartType: string;
        Settings: {
            [name: string]: string;
        };
    }
}
/**
 * @namespace flexygo.api.easypie
 */
declare namespace flexygo.api.easypie {
    /**
    * api for GetHTMLParameters
    * @class GetHTMLParameters
    * @constructor
    * @return {GetHTMLParameters} .
    */
    class GetHTMLParameters {
        ObjectName: string;
        ObjectWhere: string;
        ModuleName: string;
        PageName: string;
    }
    class GetHTMLResponse {
        Options: string;
        Data: Array<Object>;
        Buttons: flexygo.api.Toolbar;
    }
}
/**
 * @namespace flexygo.api.orgchart
 */
declare namespace flexygo.api.orgchart {
    /**
    * api for GetNodes
    * @class GetNodes
    * @constructor
    * @return {GetNodes} .
    */
    class GetParameters {
        ObjectName: string;
        ObjectWhere: string;
        ModuleName: string;
        PageName: string;
    }
    class GetNodesResponse {
        Options: string;
        Template: flexygo.api.Template;
        Buttons: flexygo.api.Toolbar;
    }
    class Node {
        parent: string;
        innerHTML: string;
        id: string;
        children: Array<any>;
        stackChildren: boolean;
        collapsable: boolean;
    }
}
/**
 * @namespace flexygo.api.kanban
 */
declare namespace flexygo.api.kanban {
    /**
    * api for getKanbanParams
    * @class getKanbanParams
    * @constructor
    * @return {getKanbanParams} .
    */
    class getKanbanParams {
        ObjectName: string;
        ObjectWhere: string;
        ModuleName: string;
        searchId: string;
        filterValues: flexygo.ui.wc.FlxFilterInfo[];
    }
    /**
    * api for getKanbanResponse
    * @class getKanbanResponse
    * @constructor
    * @return {getKanbanResponse} .
    */
    class getKanbanResponse {
        KanbanSettings: kanbanSettings;
        Columns: {}[];
        Cards: {}[];
        Defaults: {};
        Title: string;
        Descrip: string;
        BoardId: string;
        BoardOrder: string;
        Buttons: flexygo.api.Toolbar;
        FilterObjectName: string;
        FilterObjectWhere: string;
        SavedSearches: SavedSearchesCollection;
        SearchSettings: SearchSettingsCollection;
    }
    /**
    * api for kanbanSettings
    * @class kanbanSettings
    * @constructor
    * @return {kanbanSettings} .
    */
    class kanbanSettings {
        KanbanSettingsName: string;
        BoardTitleTemplate: string;
        BoardDescripTemplate: string;
        BoardObjectName: string;
        ColumnViewName: string;
        ColumnDescripField: string;
        ColumnIdField: string;
        ColumnCssClassField: string;
        ColumnIconIdField: string;
        CardObjectName: string;
        CardViewName: string;
        CardIdField: string;
        CardColumnIdField: string;
        CardDescripField: string;
        CardContentTemplate: string;
        onChangeColumnProcess: string;
        onCardClick: string;
        EndBoxLastState: string;
        EndBoxProcess: string;
        EndBoxText: string;
        EndBoxIconName: string;
        EndBoxCssClass: string;
    }
}
/**
 * @namespace flexygo.api.timeline
 */
declare namespace flexygo.api.timeline {
    /**
    * api for getTimelineParams
    * @class getTimelineParams
    * @constructor
    * @return {getTimelineParams} .
    */
    class getTimelineParams {
        ModuleName: string;
        searchId: string;
        filterValues: flexygo.ui.wc.FlxFilterInfo[];
    }
    /**
    * api for getTimelineResponse
    * @class getTimelineResponse
    * @constructor
    * @return {getTimelineResponse} .
    */
    class getTimelineResponse {
        TimelineSetting: timelineSetting;
        Groups: {}[];
        Items: {}[];
        Defaults: {};
        Toolbar: flexygo.api.Toolbar;
        FilterObjectWhere: string;
        SearchSettings: SearchSettingsCollection;
        SavedSearches: SavedSearchesCollection;
    }
    /**
    * api for timelineSetting
    * @class timelineSetting
    * @constructor
    * @return {timelineSetting} .
    */
    class timelineSetting {
        TimelineSettingName: string;
        TimelineSettingDescrip: string;
        EntityConfiguration: timelineEntityConfiguration;
        Advanced: boolean;
        Editable: boolean;
        WithGroups: boolean;
        ShowItemsWithoutGroup: boolean;
        TitleItemsWithoutGroup: string;
        LayoutName: 'Top' | 'Right' | 'Bottom' | 'Left';
        DefaultRangeName: 'Hour' | 'Day' | 'Week' | 'Month' | 'Year';
        ShowControls: boolean;
        OnInsertOpenNewWithDefaults: boolean;
        PropertyDescrip: string;
        PropertyStartDate: string;
        CanEditPropertyStartDate: boolean;
        PropertyEndDate: string;
        CanEditPropertyEndDate: boolean;
        PropertyGroup: string;
        CanEditPropertyGroup: boolean;
        GroupViewName: string;
        GroupIdField: string;
        GroupDescripField: string;
        GroupClassNameField: string;
        GroupStyleField: string;
        GroupContentTemplate: string;
        ItemViewName: string;
        ItemDescripField: string;
        ItemStartDateField: string;
        ItemEndDateField: string;
        ItemGroupField: string;
        ItemEditableField: string;
        ItemClassNameField: string;
        ItemStyleField: string;
        ItemTypeField: string;
        ItemContentTemplate: string;
        ItemVisibleFrameTemplate: string;
        OnMovingFunction: string;
        OnDropObjectOnItemFunction: string;
        CustomOptions: string;
    }
    /**
   * api for timelineRanges
   * @class timelineRanges
   * @constructor
   * @return {timelineRanges} .
   */
    class timelineRanges {
        Hour: number;
        Day: number;
        Week: number;
        Month: number;
        Year: number;
    }
    /**
    * api for timelineEntityConfiguration
    * @class timelineEntityConfiguration
    * @constructor
    * @return {timelineEntityConfiguration} .
    */
    class timelineEntityConfiguration {
        ObjectName: string;
        CollectionName: string;
        TableName: string;
        ObjectKeys: Array<string>;
        CanInsert: boolean;
        CanUpdate: boolean;
        CanDelete: boolean;
    }
    /**
    * api for visDataItem
    * @interface visDataItem
    * @return {visDataItem} .
    */
    interface visDataItem extends vis.DataItem {
        withOutGroup: boolean;
        data: {};
    }
    /**
    * api for visTimelineItem
    * @interface visTimelineItem
    * @return {visTimelineItem} .
    */
    interface visTimelineItem extends vis.TimelineItem {
        withOutGroup: boolean;
        data: {};
    }
    /**
    * api for visDataGroup
    * @interface visDataGroup
    * @return {visDataGroup} .
    */
    interface visDataGroup extends vis.DataGroup {
        data: {};
    }
    /**
    * api for visTimelineOptions
    * @interface visTimelineOptions
    * @return {visTimelineOptions} .
    */
    interface visTimelineOptions extends vis.TimelineOptions {
        onDropObjectOnItem?: (objectData: object, item: vis.TimelineItem, callback: (item: vis.TimelineItem) => void) => void;
    }
    /**
    * api for visTimelineItemWithoutGroupHTMLElement
    * @interface visTimelineItemWithoutGroupHTMLElement
    * @return {visTimelineItemWithoutGroupHTMLElement} .
    */
    interface visTimelineItemWithoutGroupHTMLElement extends HTMLElement {
        visItemData: flexygo.api.timeline.visTimelineItem | flexygo.api.timeline.visDataItem;
    }
    class visTimeline extends vis.Timeline {
        itemsData: {
            /**
            * Remove an object by pointer or by id
            * @param { string | number | Object | Array.<string | number>} id Object or id, or an array with
            *                                              objects or ids to be removed
            * @param { string } [senderId] Optional sender id
            * @return { Array.<string | number>} removedIds
            */
            remove(id: string | number | Object | Array<string | number>, senderId?: string): Array<string | number>;
        };
        itemSet: {
            options: vis.TimelineOptions;
        };
        dom: {
            root: HTMLElement;
        };
    }
}
/**
 * @namespace flexygo.api.edit
 */
declare namespace flexygo.api.edit {
    /**
    * api for KeyValuePair
    * @class KeyValuePair
    * @constructor
    * @return {KeyValuePair} .
    */
    class KeyValuePair {
        Key: string;
        Value: any;
    }
    /**
    * api for DependencyAction
    * @class DependencyAction
    * @constructor
    * @return {DependencyAction} .
    */
    class DependencyAction {
        PropertyName: string;
        changeSQL: boolean;
        newSQL: string;
        newSqlItems: string;
        changeValue: boolean;
        newValue: string;
        changeEnabled: boolean;
        newEnabled: boolean;
        changeVisibility: boolean;
        newVisibility: boolean;
        changeClass: boolean;
        newClass: string;
        changeRequired: boolean;
        newRequired: boolean;
        cascadeDependencies: boolean;
    }
    /**
    * api for DependencyHelper
    * @class DependencyHelper
    * @constructor
    * @return {DependencyHelper} .
    */
    class DependencyHelper {
        ObjectName: string;
        PropertyName: string;
        DependingPropertyName: string;
        Order: number;
        Active: boolean;
        Descrip: string;
        SQLValue: string;
        SQLComboSentence: string;
        SQLComboFilter: string;
        SQLEnabled: string;
        EnabledValues: string;
        DisabledValues: string;
        SQLVisible: string;
        VisibleValues: string;
        HiddenValues: string;
        SQLClass: string;
        SQLRequired: string;
        RequiredValues: string;
        NotRequiredValues: string;
    }
    /**
    * api for saveDependenciesConfigParams
    * @class saveDependenciesConfigParams
    * @constructor
    * @return {saveDependenciesConfigParams} .
    */
    class saveDependenciesConfigParams {
        ObjectName: string;
        ProcessName: string;
        ReportName: string;
        PropertyName: string;
        Dependencies: flexygo.api.edit.DependencyHelper[];
    }
    /**
    * api for ObjectRowDependency
    * @class ObjectRowDependency
    * @constructor
    * @return {ObjectRowDependency} .
    */
    class ObjectRowDependency {
        RowId: string;
        ObjectName: string;
        IsNew: boolean;
        Properties: KeyValuePair[];
    }
    /**
    * api for processDependenciesParams
    * @class processDependenciesParams
    * @constructor
    * @return {processDependenciesParams} .
    */
    class processDependenciesParams {
        ObjectName: string;
        ProcessName: string;
        ReportName: string;
        PropertyName: string;
        Properties: KeyValuePair[];
    }
    /**
   * api for processAllDependenciesParams
   * @class processAllDependenciesParams
   * @constructor
   * @return {processAllDependenciesParams} .
   */
    class processAllDependenciesParams {
        ObjectName: string;
        ProcessName?: string;
        ReportName?: string;
        IsNew: boolean;
        IsView: boolean;
        Properties: KeyValuePair[];
    }
    /**
   * api for processAllListDependenciesResponse
   * @class processAllListDependenciesResponse
   * @constructor
   * @return {processAllListDependenciesResponse} .
   */
    class processAllListDependenciesResponse {
        [RowId: string]: DependencyAction;
    }
    /**
   * api for getEditTemplateParams
   * @class getEditTemplateParams
   * @constructor
   * @return {getEditTemplateParams} .
   */
    class getEditTemplateParams {
        ObjectName: string;
        ObjectWhere: string;
        ModuleName: string;
        Defaults: flexygo.api.GenericKeyValueObject[];
        TemplateId: string;
        Clone: boolean;
    }
    /**
   * api for getEditTemplateResponse
   * @class getEditTemplateResponse
   * @constructor
   * @return {getEditTemplateResponse} .
   */
    class getEditTemplateResponse {
        Template: flexygo.api.Template;
        TemplateList: {
            [name: string]: string;
        };
        Properties: ObjectPropertyCollection;
        Buttons: flexygo.api.Toolbar;
        ObjectName: string;
        ObjectWhere: string;
        Title: string;
    }
    /**
   * api for getComboTextParams
   * @class getComboTextParams
   * @constructor
   * @return {getComboTextParams} .
   */
    class getComboTextParams {
        Mode: string;
        ObjectName: string;
        PropertyName: string;
        CryptedSql: string;
        CryptedFilter: string;
        Value: string;
        Page: number;
        AdditionalWhere: string;
    }
    /**
   * api for getComboDataParams
   * @class getComboDataParams
   * @constructor
   * @return {getComboDataParams} .
   */
    class getComboDataParams {
        Mode: string;
        ObjectName: string;
        PropertyName: string;
        CryptedSql: string;
        CryptedFilter: string;
        Value: string;
        Page: number;
        AdditionalWhere: string;
    }
    /**
   * api for getProcessParamsTemplateParams
   * @class getProcessParamsTemplateParams
   * @constructor
   * @return {getProcessParamsTemplateParams} .
   */
    class getProcessParamsTemplateParams {
        ObjectName: string;
        ObjectWhere: string;
        ModuleName: string;
        ProcessName: string;
        Defaults: flexygo.api.GenericKeyValueObject[];
    }
    /**
   * api for getProcessParamsTemplateResponse
   * @class getProcessParamsTemplateResponse
   * @constructor
   * @return {getProcessParamsTemplateResponse} .
   */
    class getProcessParamsTemplateResponse {
        ProcessName: string;
        Template: flexygo.api.Template;
        Properties: flexygo.api.ObjectPropertyCollection;
        Buttons: flexygo.api.Toolbar;
        ObjectName: string;
        ObjectWhere: string;
        Title: string;
        RunButtonText: string;
    }
    /**
   * api for getReportParamsTemplateParams
   * @class getReportParamsTemplateParams
   * @constructor
   * @return {getReportParamsTemplateParams} .
   */
    class getReportParamsTemplateParams {
        ObjectName: string;
        ObjectWhere: string;
        ModuleName: string;
        ReportName: string;
        Defaults: flexygo.api.GenericKeyValueObject[];
    }
    /**
   * api for getReportParamsTemplateResponse
   * @class getReportParamsTemplateResponse
   * @constructor
   * @return {getReportParamsTemplateResponse} .
   */
    class getReportParamsTemplateResponse {
        ReportName: string;
        Template: flexygo.api.Template;
        Properties: flexygo.api.ObjectPropertyCollection;
        Buttons: flexygo.api.Toolbar;
        ObjectName: string;
        ObjectWhere: string;
        Title: string;
    }
    /**
   * api for getComboDataViewParams
   * @class getComboDataViewParams
   * @constructor
   * @return {getComboDataViewParams} .
   */
    class getComboDataViewParams {
        ObjectName: string;
        ViewName: string;
        DisplayField: string;
        Value: string;
        Page: number;
        PageSize: number;
        AdditionalWhere: string;
        SQLFilter: string;
        CnnString: string;
    }
    /**
   * api for getEditConfigParams
   * @class getEditConfigParams
   * @constructor
   * @return {getEditConfigParams} .
   */
    class getEditConfigParams {
        ObjectName: string;
    }
    /**
   * api for getEditConfigResponse
   * @class getEditConfigResponse
   * @constructor
   * @return {getEditConfigResponse} .
   */
    class getEditConfigResponse {
        Template: flexygo.api.Template;
        Properties: flexygo.api.ObjectPropertyCollection;
    }
    /**
   * api for getNewPropertiesParams
   * @class getNewPropertiesParams
   * @constructor
   * @return {getNewPropertiesParams} .
   */
    class getNewPropertiesParams {
        ObjectName: string;
    }
    /**
   * api for addNewPropertiesParams
   * @class addNewPropertiesParams
   * @constructor
   * @return {addNewPropertiesParams} .
   */
    class addNewPropertiesParams {
        ObjectName: string;
        Properties: string[];
    }
    /**
   * api for addNewFieldParams
   * @class addNewFieldParams
   * @constructor
   * @return {addNewFieldParams} .
   */
    class addNewFieldParams {
        ObjectName: string;
        FieldName: string;
        FieldType: string;
        TableName: string;
    }
    /**
    * api for addDetachedPropertyParams
    * @class addDetachedPropertyParams
    * @constructor
    * @return {addDetachedPropertyParams} .
    */
    class addDetachedPropertyParams {
        ObjectName: string;
        PropertyName: string;
        PropertyLabel: string;
    }
    /**
   * api for InsertSeparatorParams
   * @class InsertSeparatorParams
   * @constructor
   * @return {InsertSeparatorParams} .
   */
    class InsertSeparatorParams {
        Mode: string;
        Name: string;
        PropertyName: string;
        Above: number;
    }
    /**
   * api for InsertPlaceHolderParams
   * @class InsertPlaceHolderParams
   * @constructor
   * @return {InsertPlaceHolderParams} .
   */
    class InsertPlaceHolderParams {
        Mode: string;
        Name: string;
        PropertyName: string;
        Above: number;
    }
}
/**
 * @namespace flexygo.api.entity
 */
declare namespace flexygo.api.entity {
    type ObjUpdateType = "trigger" | "standard" | "stored" | "dll";
    /**
   * api for ObjBasicConfig
   * @class ObjBasicConfig
   * @constructor
   * @return {ObjBasicConfig} .
   */
    class ObjBasicConfig {
        Active: boolean;
        AdditionalOn: boolean;
        Auditable: boolean;
        CanClone: boolean;
        CanDelete: boolean;
        CanInsert: boolean;
        CanPrint: boolean;
        CanUpdate: boolean;
        CanView: boolean;
        Configuration: boolean;
        ConnStringId: string;
        DefaultChild: string;
        DefaultPageSize: number;
        DefaultTransactionOn: boolean;
        DeleteFlowText: string;
        DeleteProcessName: string;
        DeleteType: ObjUpdateType;
        Description: string;
        HelpId: string;
        IconClass: string;
        IconName: string;
        IgnoreDBRequired: boolean;
        ImagePath: string;
        InsertFlowText: string;
        InsertProcessName: string;
        InsertType: ObjUpdateType;
        IsCollection: boolean;
        LoadProcessName: string;
        NavigateNodeId: string;
        ObjectName: string;
        OrderBy: string;
        OverrideObjectName: string;
        OverrideObjectWhere: string;
        ParentName: string;
        ParsedDescription: string;
        SQL: string;
        ShowInDefaultMenu: boolean;
        TableName: string;
        UniqueIdentifier: string;
        UpdateFlowText: string;
        UpdateType: ObjUpdateType;
        UpdateProcessName: string;
        KeyFields: string[];
    }
    /**
   * api for GetProcessesResponse
   * @class GetProcessesResponse
   * @constructor
   * @return {GetProcessesResponse} .
   */
    class GetProcessesResponse {
        ActionNode: flexygo.api.navigation.NavigationNode;
        ObjectLink: flexygo.api.navigation.NavigationNode;
        ReportLink: flexygo.api.navigation.NavigationNode;
        ProcessLink: flexygo.api.navigation.NavigationNode;
    }
    /**
    * api for GetConfigParams
    * @class GetConfigParams
    * @constructor
    * @return {GetConfigParams} .
    */
    class GetConfigParams {
        ObjectName: string;
    }
}
declare namespace flexygo.api.gipe {
    class GipeTemplateHelper {
        NodeType: number;
        NodeKey: string;
        NodeDescrip: string;
        NodeOriginId: number;
        NodeAreas: string;
        NodeIcon: string;
    }
    class GipeWorkflowVersion {
        Version: number;
        Active: boolean;
    }
    class GipeWorkflow {
        WorkflowId: string;
        Version: number;
        ModuleId: string;
        AreaId: string;
        Descrip: string;
        WorkflowData: string;
        Active: boolean;
        Versions: GipeWorkflowVersion[];
        ExecutionId?: number;
    }
    class loadWorkflowParams {
        workflowId: string;
        version: number;
    }
    class GipeMessageAskParams {
        processName: string;
        objectName: string;
        objectWhere: string;
        targetId: string;
    }
    class GipeMessageAskEntity {
        objectName: string;
    }
    class GipeMessageAskYesNo {
        title: string;
        message: string;
    }
    class GipeDebugExecution {
        WorkflowId: string;
        ExecutionId: number;
        InitialGraphId: number;
        ResultId: number;
        StatusId: number;
        ResultDescription: string;
        StatusDescription: string;
        WorkflowDescription: string;
    }
    class GipeDebugStep {
        GraphId: number;
        ResultId: number;
        ExecutionId: number;
        MasterExecutionId: number;
        ResultDescription: string;
        StatusDescription: string;
        ExecutionData: string;
        ErrorMessage: string;
    }
    class GipeDebugStatus {
        Execution: GipeDebugExecution[];
        Nodes: GipeDebugStep[];
        NextStep: number;
        NextWorkflow: number;
        LastWorkflow: number;
        LastStep: number;
    }
    class GipeParameterHelper {
        ParamName: string;
        ParamType: "II" | "IO" | "OO";
        ParamLabel: string;
    }
}
declare namespace flexygo.api.html {
    /**
    * api for GetHTMLParams
    * @class GetHTMLParams
    * @constructor
    * @return {GetHTMLParams} .
    */
    class GetHTMLParams {
        ObjectName: string;
        ObjectWhere: string;
        ModuleName: string;
        PageName: string;
    }
    /**
    * api for GetHTMLResponse
    * @class GetHTMLResponse
    * @constructor
    * @return {GetHTMLResponse} .
    */
    class GetHTMLResponse {
        HtmlHeader: string;
        HtmlText: string;
        HtmlFooter: string;
        CssText: string;
        ScriptText: string;
        Buttons: flexygo.api.Toolbar;
    }
}
/**
 * @namespace flexygo.api.list
 */
declare namespace flexygo.api.list {
    /**
    * api for ModulePager
    * @class ModulePager
    * @constructor
    * @return {ModulePager} .
    */
    class ModulePager {
        PagerId: string;
        Descrip: string;
        NumButtons: number;
        Template: string;
        Position: string;
    }
    /**
    * api for PropertyOrder
    * @class PropertyOrder
    * @constructor
    * @return {PropertyOrder}
    */
    class PropertyOrder {
        ObjectName: string;
        PropertyName: string;
        Asc: boolean;
    }
    /**
    * api for getListParams
    * @class getListParams
    * @constructor
    * @return {getListParams} .
    */
    class getListParams {
        ObjectName: string;
        ObjectWhere: string;
        ModuleName: string;
        PageName: string;
        page: number;
        additionalWhere: string;
        orderInfo: PropertyOrder[];
        mode: string;
        searchId: string;
        filterValues: flexygo.ui.wc.FlxFilterInfo[];
        TemplateId: string;
        ViewId: string;
        PageSize?: number;
        PresetId?: string;
    }
    /**
    * api for getListResponse
    * @class getListResponse
    * @constructor
    * @return {getListResponse} .
    */
    class getListResponse {
        Template: flexygo.api.Template;
        TemplateList: {
            [name: string]: string;
        };
        ViewList: {
            [name: string]: string;
        };
        Pager: ModulePager;
        Buttons: flexygo.api.Toolbar;
        SavedSearches: SavedSearchesCollection;
        SearchSettings: SearchSettingsCollection;
        RowButtons: flexygo.api.Toolbar;
        ObjectName: string;
        ChildObjectName: string;
        ObjectWhere: string;
        Title: string;
        Searcher: boolean;
        Properties: flexygo.api.ObjectPropertyCollection;
        Presets: flexygo.api.PresetSettingsCollection;
    }
    /**
    * api for getSearchParams
    * @class getSearchParams
    * @constructor
    * @return {getSearchParams} .
    */
    class getSearchParams {
        ObjectName: string;
        ObjectWhere: string;
        ModuleName: string;
        PageName: string;
        page: number;
        orderInfo: flexygo.api.list.PropertyOrder[];
        additionalWhere: string;
        mode: string;
        searchId: string;
        filterValues: flexygo.ui.wc.FlxFilterInfo[];
    }
    /**
    * api for getSearchResponse
    * @class getSearchResponse
    * @constructor
    * @return {getSearchResponse} .
    */
    class getSearchResponse {
        Template: flexygo.api.Template;
        TemplateList: {
            [name: string]: string;
        };
        ViewList: {
            [name: string]: string;
        };
        Pager: ModulePager;
        Buttons: flexygo.api.Toolbar;
        SearchSettings: SearchSettingsCollection;
        RowButtons: flexygo.api.Toolbar;
        ObjectName: string;
        ChildObjectName: string;
        ObjectWhere: string;
        Title: string;
        Searcher: boolean;
        Properties: flexygo.api.ObjectPropertyCollection;
        Presets: flexygo.api.PresetSettingsCollection;
    }
    /**
    * api for getCountParams
    * @class getCountParams
    * @constructor
    * @return {getCountParams} .
    */
    class getCountParams {
        ObjectName: string;
        cryptedSql: string;
        filter: string;
    }
}
/**
 * @namespace flexygo.api.maps
 */
declare namespace flexygo.api.maps {
    /**
    * api for GetHTMLParams
    * @class GetHTMLParams
    * @constructor
    * @return {GetHTMLParams} .
    */
    class GetHTMLParams {
        ObjectName: string;
        ObjectWhere: string;
        ModuleName: string;
        PageName: string;
    }
    /**
    * api for GetHTMLResponse
    * @class GetHTMLResponse
    * @constructor
    * @return {GetHTMLResponse} .
    */
    class GetHTMLResponse {
        Markers: any;
        Options: string;
        Buttons: flexygo.api.Toolbar;
    }
}
/**
 * @namespace flexygo.api.mastertables
 */
declare namespace flexygo.api.mastertables {
    /**
* api for GetHTMLResponse
* @class GetHTMLResponse
* @constructor
* @return {MasterTablePropertyCollection} .
*/
    class MasterTablePropertyCollection {
        [key: string]: any;
    }
    /**
    * api for insertParams
    * @class insertParams
    * @constructor
    * @return {insertParams} .
    */
    class insertParams {
        tablename: string;
        values: flexygo.api.GenericKeyValueObject[];
    }
    /**
    * api for updateParams
    * @class updateParams
    * @constructor
    * @return {updateParams} .
    */
    class updateParams {
        tablename: string;
        values: flexygo.api.GenericKeyValueObject[];
        keys: flexygo.api.GenericKeyValueObject[];
    }
    /**
    * api for deleteParams
    * @class deleteParams
    * @constructor
    * @return {deleteParams} .
    */
    class deleteParams {
        tablename: string;
        keys: flexygo.api.GenericKeyValueObject[];
    }
    /**
    * api for getSettingsParams
    * @class getSettingsParams
    * @constructor
    * @return {getSettingsParams} .
    */
    class getSettingsParams {
        tablename: string;
    }
    /**
    * api for getSettingsResponse
    * @class getSettingsResponse
    * @constructor
    * @return {getSettingsResponse} .
    */
    class getSettingsResponse {
        TableFields: MasterTableFieldsCollection;
        canInsert: boolean;
        canUpdate: boolean;
        canDelete: boolean;
        canPrint: boolean;
    }
    /**
    * api for MasterTableFieldsCollection
    * @class MasterTableFieldsCollection
    * @constructor
    * @return {MasterTableFieldsCollection} .
    */
    class MasterTableFieldsCollection {
        [key: string]: MasterTableField;
    }
    /**
    * api for MasterTableField
    * @class MasterTableField
    * @constructor
    * @return {MasterTableField} .
    */
    class MasterTableField {
        IsKeyField: boolean;
        ColumnName: string;
        ColumnDescrip: string;
        AutoIncrement: boolean;
        DataType: string;
        DefaultValue: any;
        MaxLength: number;
        ReadOnly: boolean;
        ListValues: any;
    }
}
/**
 * @namespace flexygo.api.navigation
 */
declare namespace flexygo.api.navigation {
    type NodeType = "action" | "group" | "text" | "object" | "process" | "report" | "page" | "external_page" | "auto" | "master_table" | "wc" | "help" | "separator";
    /**
    * api for NavigationNode
    * @class NavigationNode
    * @constructor
    * @return {NavigationNode} .
    */
    class NavigationNode {
        NodeId: string;
        Order: number;
        ParentNodeId: string;
        ChildNodes: {
            [name: string]: flexygo.api.navigation.NavigationNode;
        };
        Title: string;
        IconClass: string;
        IconPath: string;
        Descrip: string;
        Refresh: string;
        Type: NodeType;
        Params: string;
        Url: string;
        TargetId: string;
        ProcessName: string;
        ProcessHasParams: boolean;
        PageTypeId: string;
        PageName: string;
        ReportName: string;
        ReportHasParams: boolean;
        ReportWhere: string;
        HelpId: string;
        ObjectName: string;
        ObjectWhere: string;
        ObjectDefaults: string | {
            [name: string]: string;
        };
        SQLSentence: string;
        SQLConStringId: string;
        TableName: string;
        WebComponent: string;
        BadgeClass: string;
        BadgeSQL: string;
        BadgeConStringId: string;
        BadgeRefresh: number;
        cssClass: string;
        ShowInMenu: boolean;
        ShowInAnalysis: boolean;
        NodeLevel: number;
        ActionType: string;
        StrType: string;
        Defaults: string;
        Enabled: boolean;
        ReportModes: string | {
            [name: string]: string;
        };
    }
    class GetNavNodesParams {
    }
    class GetMainNodesParams {
    }
    class getNodesByIdParams {
        ParentId: string;
        HideAutoSQLNodes: boolean;
    }
    /**
    * api for LoweredNavigationNode
    * @class LoweredNavigationNode
    * @constructor
    * @return {NavigationNode} .
    */
    class LoweredNavigationNode {
        nodeid: string;
        order: number;
        parentnodeid: string;
        bagonly: string;
        bagobject: string;
        childnodes: {
            [name: string]: flexygo.api.navigation.LoweredNavigationNode;
        };
        title: string;
        iconclass: string;
        iconpath: string;
        descrip: string;
        refresh: string;
        type: NodeType;
        params: string;
        url: string;
        targetid: string;
        processname: string;
        processhasparams: boolean;
        pagetypeid: string;
        pagename: string;
        reportname: string;
        reporthasparams: boolean;
        reportwhere: string;
        helpid: string;
        objectname: string;
        objectwhere: string;
        objectdefaults: string | {
            [name: string]: string;
        };
        sqlsentence: string;
        sqlconstringid: string;
        tablename: string;
        webcomponent: string;
        badgeclass: string;
        badgesql: string;
        badgeconstringid: string;
        badgerefresh: number;
        cssclass: string;
        showinmenu: boolean;
        showinanalysis: boolean;
        nodelevel: number;
        actiontype: string;
        strtype: string;
        defaults: string;
    }
}
/**
 * @namespace flexygo.api.objectrelations
 */
declare namespace flexygo.api.objectrelations {
    /**
    * api for GetHTMLParams
    * @class GetHTMLParams
    * @constructor
    * @return {GetHTMLParams} .
    */
    class GetHTMLParams {
        ObjectName: string;
        ObjectWhere: string;
        ModuleName: string;
        PageName: string;
        Mode: string;
    }
    /**
    * api for GetHTMLResponse
    * @class GetHTMLResponse
    * @constructor
    * @return {GetHTMLResponse} .
    */
    class GetHTMLResponse {
        HtmlText: string;
        CssText: string;
        ScriptText: string;
        Buttons: flexygo.api.Toolbar;
    }
}
/**
 * @namespace flexygo.api.process
 */
declare namespace flexygo.api.process {
    /**
    * api for getProcessInfoByNameParams
    * @class getProcessInfoByNameParams
    * @constructor
    * @return {getProcessInfoByNameParams} .
    */
    class getProcessInfoByNameParams {
        ProcessName: string;
    }
    enum ProcessType {
        Standard = -1,
        StoredProcedure = 0,
        Dllprocess = 1,
        Redirect = 2,
        JavaScript = 3,
        WebService = 4,
        VBEmbedded = 5,
        CSharpEmbedded = 6,
        ObjectLink = 7,
        PageLink = 8,
        ReportLink = 9,
        HelpLink = 10,
    }
    /**
    * api for ProcessParam
    * @class ProcessParam
    * @constructor
    * @return {ProcessParam} .
    */
    class ProcessParam {
        ProcessName: string;
    }
    /**
    * api for ProcessConfig
    * @class ProcessConfig
    * @constructor
    * @return {ProcessConfig} .
    */
    class ProcessConfig {
        ProcessName: string;
        TypeId: ProcessType;
        ConfirmText: string;
        JSforParams: string;
        File: string;
        ClassName: string;
        MethodName: string;
        StoredName: string;
        Code: string;
        TimeOut: number;
        ConnStringId: string;
        ExternalUrl: string;
        Defaults: string;
        PageTypeId: string;
        PageObjectName: string;
        PageObjectWhere: string;
        PageName: string;
        HelpId: string;
        ReportName: string;
        ReportWhere: string;
        Params: {
            [name: string]: flexygo.api.process.ProcessParam;
        };
        TargetId: string;
        ProcessFlowText: string;
        Auditable: boolean;
        AdminOnly: boolean;
        HasParams: boolean;
        ConfirmOkText: boolean;
        CloseDialogOnOk: boolean;
        IsWorkflow: boolean;
    }
}
/**
 * @namespace flexygo.api.rss
 */
declare namespace flexygo.api.rss {
    /**
    * api for GetHTMLParams
    * @class GetHTMLParams
    * @constructor
    * @return {GetHTMLParams} .
    */
    class GetHTMLParams {
        ObjectName: string;
        ObjectWhere: string;
        ModuleName: string;
        PageName: string;
    }
    /**
    * api for GetHTMLResponse
    * @class GetHTMLResponse
    * @constructor
    * @return {GetHTMLResponse} .
    */
    class GetHTMLResponse {
        Html: string;
        Buttons: flexygo.api.Toolbar;
    }
}
/**
 * @namespace flexygo.api.security
 */
declare namespace flexygo.api.security {
    /**
    * api for SetSecurityParams
    * @class SetSecurityParams
    * @constructor
    * @return {SetSecurityParams} .
    */
    class SetSecurityParams {
        SecurityType: string;
        SecurityKey: string;
        SecurityKey2: string;
        SecurityItem: string;
        SecurityItemValue: string;
        SecurityId: string;
    }
    /**
    * api for getObjectKeyParams
    * @class getObjectKeyParams
    * @constructor
    * @return {getObjectKeyParams} .
    */
    class getObjectKeyParams {
        SecurityType: string;
        SecurityKey: string;
        SecurityKey2: string;
    }
}
/**
 * @namespace flexygo.api.sparkline
 */
declare namespace flexygo.api.sparkline {
    /**
    * api for GetHTMLParams
    * @class GetHTMLParams
    * @constructor
    * @return {GetHTMLParams} .
    */
    class GetHTMLParams {
        ObjectName: string;
        ObjectWhere: string;
        ModuleName: string;
        PageName: string;
    }
    /**
    * api for GetHTMLResponse
    * @class GetHTMLResponse
    * @constructor
    * @return {GetHTMLResponse} .
    */
    class GetHTMLResponse {
        Values: any;
        Options: string;
        Buttons: flexygo.api.Toolbar;
    }
}
/**
 * @namespace flexygo.api.sqlfeed
 */
declare namespace flexygo.api.sqlfeed {
    /**
    * api for GetHTMLParams
    * @class GetHTMLParams
    * @constructor
    * @return {GetHTMLParams} .
    */
    class GetHTMLParams {
        ObjectName: string;
        ObjectWhere: string;
        ModuleName: string;
        PageName: string;
    }
    /**
    * api for GetHTMLResponse
    * @class GetHTMLResponse
    * @constructor
    * @return {GetHTMLResponse} .
    */
    class GetHTMLResponse {
        Html: string;
        Buttons: flexygo.api.Toolbar;
    }
}
/**
 * @namespace flexygo.api.sys
 */
declare namespace flexygo.api.sys {
    /**
    * api for setSkinCacheVarsParams
    * @class setSkinCacheVarsParams
    * @constructor
    * @return {setSkinCacheVarsParams} .
    */
    class setSkinCacheVarsParams {
        VarValues: [flexygo.api.GenericKeyValueObject];
    }
    /**
    * api for UserSearchSettings
    * @class UserSearchSettings
    * @constructor
    * @return {UserSearchSettings} .
    */
    class UserSearchSettings {
        SearchId: string;
        ObjectName: string;
        Descrip: string;
        IconClass: string;
        Order: number;
        Active: boolean;
    }
    /**
    * api for getUserSearchSettingsResponse
    * @class getUserSearchSettingsResponse
    * @constructor
    * @return {getUserSearchSettingsResponse} .
    */
    class getUserSearchSettingsResponse {
        [name: string]: UserSearchSettings;
    }
    /**
    * api for SearchCriteria
    * @class SearchCriteria
    * @constructor
    * @return {SearchCriteria} .
    */
    class SearchCriteria {
        SearchId: string;
        ObjectName: string;
        CollectionName: string;
        Descrip: string;
        IconClass: string;
        Count: number;
        Filter: string;
        active: boolean;
        Order: number;
    }
    /**
    * api for searchObjectsParams
    * @class searchObjectsParams
    * @constructor
    * @return {searchObjectsParams} .
    */
    class searchObjectsParams {
        FindString: string;
        EnableCount: boolean;
        ObjectName: string;
    }
    /**
    * api for searchObjectsResponse
    * @class searchObjectsResponse
    * @constructor
    * @return {searchObjectsResponse} .
    */
    class searchObjectsResponse {
        [name: string]: SearchCriteria;
    }
    /**
    * api for saveUserSearchSettingsCheckParams
    * @class saveUserSearchSettingsCheckParams
    * @constructor
    * @return {saveUserSearchSettingsCheckParams} .
    */
    class saveUserSearchSettingsCheckParams {
        SearchId: string;
        Checked: boolean;
    }
    /**
    * api for GetFiltersParams
    * @class GetFiltersParams
    * @constructor
    * @return {GetFiltersParams} .
    */
    class GetFiltersParams {
        ObjectName: string;
        Generic: boolean;
        NonGeneric: boolean;
    }
    /**
    * api for GetFiltersResponse
    * @class GetFiltersResponse
    * @constructor
    * @return {GetFiltersResponse} .
    */
    class GetFiltersResponse {
        Filters: SearchSettingsCollection;
        Types: Array<flexygo.api.ObjectSearchType>;
        FilterTypes: Array<flexygo.api.ObjectSearchPropertyType>;
    }
    /**
    * api for GetRelatedObjetsAndPropsParams
    * @class GetRelatedObjetsAndPropsParams
    * @constructor
    * @return {GetRelatedObjetsAndPropsParams} .
    */
    class GetRelatedObjetsAndPropsParams {
        ObjectName: string;
    }
    /**
    * api for GetRelatedObjetsAndPropsResponse
    * @class GetRelatedObjetsAndPropsResponse
    * @constructor
    * @return {GetRelatedObjetsAndPropsResponse} .
    */
    class GetRelatedObjetsAndPropsResponse {
        Properties: ObjectPropertyCollection;
        RelatedObjects: {
            [name: string]: flexygo.api.ObjectRelationsSettings;
        };
    }
    /**
   * api for SaveFilterParams
   * @class SaveFilterParams
   * @constructor
   * @return {SaveFilterParams} .
   */
    class SaveFilterParams {
        SearchId: string;
        FilterName: string;
        ObjectName: string;
        Type: string;
        Generic: boolean;
        Properties: Array<flexygo.api.SearchProperty>;
    }
    /**
   * api for GetVersionParams
   * @class GetVersionParams
   * @constructor
   * @return {GetVersionParams} .
   */
    class GetVersionParams {
        Force: boolean;
    }
    /**
   * api for GetVersionResponse
   * @class GetVersionResponse
   * @constructor
   * @return {GetVersionResponse} .
   */
    class GetVersionResponse {
        CurrentVersion: string;
        LastVersion: string;
        IsUpdated: boolean;
        ErrorMessage: string;
    }
    /**
   * api for TestNewVersionParams
   * @class TestNewVersionParams
   * @constructor
   * @return {TestNewVersionParams} .
   */
    class TestNewVersionParams {
        Version: string;
    }
    /**
   * api for UpdateNewVersionParams
   * @class UpdateNewVersionParams
   * @constructor
   * @return {UpdateNewVersionParams} .
   */
    class UpdateNewVersionParams {
        Version: string;
        Force: boolean;
    }
    enum eAutoUpdaterState {
        eStateIdle = 0,
        eStateWorking = 1,
        eStateFinishedOk = 2,
        eStateFinishedError = 3,
        eStateWaitingForResponse = 4,
        eStateServiceRestarted = 5,
    }
    enum eAutoUpdaterStatus {
        eStatusUpdatingService = 0,
        eStatusCheckingPackages = 1,
        eStatusDownloadingVersion = 2,
        eStatusUpdateDatabase = 3,
        eStatusUpdateIIS = 4,
        eStatusFinished = 5,
    }
    /**
   * api for checkUpdateProgressResponse
   * @class checkUpdateProgressResponse
   * @constructor
   * @return {checkUpdateProgressResponse} .
   */
    class checkUpdateProgressResponse {
        CurrentStatus: eAutoUpdaterStatus;
        CurrentState: eAutoUpdaterState;
        ErrorMessage: string;
        Progress: number;
        StatusText: string;
    }
    /**
   * api for VersionInfo
   * @class VersionInfo
   * @constructor
   * @return {VersionInfo} .
   */
    class VersionInfo {
        VersionNumber: string;
        VirtualPath: string;
        DatabaseName: string;
        IsCurrent: boolean;
        IsUpdate: boolean;
        IsOld: boolean;
        IsNew: boolean;
        ReleaseNotes: string;
    }
    /**
   * api for VersionReviewChange
   * @class VersionReviewChange
   * @constructor
   * @return {VersionReviewChange} .
   */
    class VersionReviewChange {
        ActionId: number;
        DifId: string;
        FieldName: string;
        ManualValue: string;
        NewValue: string;
        OldValue: string;
        Revised: boolean;
        RowKey: string;
        TableName: string;
        UserValue: string;
    }
    /**
   * api for getInstalledVersionsResponse
   * @class getInstalledVersionsResponse
   * @constructor
   * @return {getInstalledVersionsResponse} .
   */
    class getInstalledVersionsResponse {
        current: GetVersionResponse;
        versions: VersionInfo[];
        pendingReviewChanges: VersionReviewChange[];
    }
    /**
   * api for setActiveVersionParams
   * @class setActiveVersionParams
   * @constructor
   * @return {setActiveVersionParams} .
   */
    class setActiveVersionParams {
        version: string;
        force: boolean;
    }
    /**
   * api for validateViewParams
   * @class validateViewParams
   * @constructor
   * @return {validateViewParams} .
   */
    class validateViewParams {
        ObjectName: string;
        SQL: string;
    }
    /**
   * api for saveViewParams
   * @class saveViewParams
   * @constructor
   * @return {saveViewParams} .
   */
    class saveViewParams {
        ObjectName: string;
        ViewName: string;
        Properties: flexygo.api.SearchProperty[];
        SQL: string;
    }
    /**
    * api for getViewParams
    * @class getViewParams
    * @constructor
    * @return {getViewParams} .
    */
    class getViewParams {
        ObjectName: string;
        ViewName: string;
    }
    /**
    * api for updateObjectParams
    * @class updateObjectParams
    * @constructor
    * @return {updateObjectParams} .
    */
    class updateObjectParams {
        StoredParams: GenericKeyValueObject[];
    }
}
/**
 * @namespace flexygo.api.view
 */
declare namespace flexygo.api.view {
    /**
    * api for getViewTemplateParams
    * @class getViewTemplateParams
    * @constructor
    * @return {getViewTemplateParams} .
    */
    class getViewTemplateParams {
        ObjectName: string;
        ObjectWhere: string;
        ModuleName: string;
        PageName: string;
        TemplateId: string;
    }
    /**
    * api for getViewTemplateResponse
    * @class getViewTemplateResponse
    * @constructor
    * @return {getViewTemplateResponse} .
    */
    class getViewTemplateResponse {
        Template: flexygo.api.Template;
        TemplateList: {
            [name: string]: string;
        };
        Buttons: flexygo.api.Toolbar;
        ObjectName: string;
        ObjectWhere: string;
        IsNew: boolean;
        Title: string;
        Properties: ObjectPropertyCollection;
    }
}
/**
 * @namespace flexygo.api.pages
 */
declare namespace flexygo.api.pages {
    type PageType = "view" | "edit" | "list" | "edit_table" | "generic" | "process_params" | "report_params" | "search";
    /**
    * api for ModuleEvent
    * @class ModuleEvent
    * @constructor
    * @return {ModuleEvent} .
    */
    class ModuleEvent {
        PageName: string;
        ModuleName: string;
        ModuleEventId: string;
        EventClass: flexygo.events.EventClass;
        EventType: flexygo.events.EventType;
        EventAction: flexygo.events.EventAction;
        ProcessName: string;
        ObjectFilter: string;
        PropertyFilter: string;
        ProcessFilter: string;
        ModuleFilter: string;
        PageFilter: string;
        MethodFilter: string;
    }
    /**
    * api for PageModule
    * @class PageModule
    * @constructor
    * @return {PageModule} .
    */
    class PageModule {
        PageName: string;
        ModuleName: string;
        LayoutPositionId: string;
        RelationWhere: string;
        ContainerTemplate: string;
        WebComponent: string;
        ContainerClass: string;
        Title: string;
        CanCollapse: boolean;
        CanEnlarge: boolean;
        CanRefresh: boolean;
        IconName: string;
        IconClass: string;
        IconImage: string;
        Params: string;
        Order: number;
        HeaderClass: string;
        ModuleClass: string;
        JSAfterLoad: string;
        TabName: string;
        SQLEnabled: string;
        TabShortDescrip: string;
        TabIconClass: string;
        TabOrder: string;
        ShowWhenNew: boolean;
        InitHidden: boolean;
        ManualInit: boolean;
        ModuleObjectName: string;
        Events: {
            [name: string]: ModuleEvent;
        };
        ObjectDefaults: {
            [name: string]: any;
        };
    }
    /**
    * api for PageModuleConfig
    * @class PageModuleConfig
    * @constructor
    * @return {PageModuleConfig} .
    */
    class PageModuleConfig {
        ModuleName: string;
        LayoutPositionId: string;
        RelationWhere: string;
        Order: number;
        TabName: string;
        TabOrder: string;
    }
    /**
    * api for Page
    * @class Page
    * @constructor
    * @return {Page} .
    */
    class Page {
        PageName: string;
        Type: PageType;
        ObjectName: string;
        InterfaceName: string;
        LayoutName: string;
        Name: string;
        IconCssClass: string;
        IconName: string;
        Descrip: string;
        OriginalDescrip: string;
        UrlRewrite: string;
        Script: string;
        ScriptActive: boolean;
        Style: string;
        Generic: boolean;
        RefreshInterval: number;
        LayoutTemplate: string;
        BodyCssClass: string;
        Modules: {
            [name: string]: PageModule;
        };
        StrType: string;
        pageHistory?: flexygo.nav.FlexygoHistory;
    }
    /**
    * api for getPageByNameParams
    * @class getPageByNameParams
    * @constructor
    * @return {getPageByNameParams} .
    */
    class getPageByNameParams {
        pageName: string;
    }
    /**
    * api for GetPageTabModulesParams
    * @class GetPageTabModulesParams
    * @constructor
    * @return {GetPageTabModulesParams} .
    */
    class GetPageTabModulesParams {
        ObjectName: string;
        ObjectWhere: string;
        ModuleName: string;
    }
    /**
    * api for PageModuleCollection
    * @class PageModuleCollection
    * @constructor
    * @return {PageModuleCollection} .
    */
    class PageModuleCollection {
        [name: string]: flexygo.api.pages.PageModule;
    }
    /**
    * api for savePageConfigParams
    * @class savePageConfigParams
    * @constructor
    * @return {savePageConfigParams} .
    */
    class savePageConfigParams {
        PageName: string;
        LayoutName: string;
        ObjectName: string;
        Modules: PageModuleConfig[];
    }
}
/**
 * @namespace flexygo.api.Network
 */
declare namespace flexygo.api.Network {
    /**
    * api for GetDataParams
    * @class GetDataParams
    * @constructor
    * @return {GetDataParams} .
    */
    class GetDataParams {
        ObjectName: string;
        ObjectWhere: string;
        ModuleName: string;
        Details: boolean;
        ParentId: vis.IdType;
        MaxId: vis.IdType;
        ParentObjectName?: string;
        ParentObjectWhere?: string;
    }
    /**
    * api for GetDataResponse
    * @class GetDataResponse
    * @constructor
    * @return {GetDataResponse} .
    */
    class GetDataResponse {
        Nodes: vis.Node[];
        Edges: vis.Edge[];
    }
}
/**
 * @namespace flexygo.api.Notify
 */
declare namespace flexygo.api.Notify {
    /**
    * api for NotifyParams
    * @class NotifyParams
    * @constructor
    * @return {NotifyParams} .
    */
    class NotifyParams {
        NoticeId: string;
    }
}
