/**
 * @namespace flexygo.api
 */
var flexygo;
(function (flexygo) {
    var api;
    (function (api) {
        /**
        * api for GenericKeyValueObject
        * @class GenericKeyValueObject
        * @constructor
        * @return {GenericKeyValueObject} .
        */
        class GenericKeyValueObject {
        }
        api.GenericKeyValueObject = GenericKeyValueObject;
        /**
        * api for ObjectRelationsSettings
        * @class ObjectRelationsSettings
        * @constructor
        * @return {ObjectRelationsSettings} .
        */
        class ObjectRelationsSettings {
        }
        api.ObjectRelationsSettings = ObjectRelationsSettings;
        /**
        * api for BasicProperty
        * @class BasicProperty
        * @constructor
        * @return {BasicProperty} .
        */
        class BasicProperty {
        }
        api.BasicProperty = BasicProperty;
        /**
        * api for BasicPropertyCollection
        * @class BasicPropertyCollection
        * @constructor
        * @return {BasicPropertyCollection} .
        */
        class BasicPropertyCollection {
        }
        api.BasicPropertyCollection = BasicPropertyCollection;
        /**
        * api for PropertyResize
        * @class PropertyResize
        * @constructor
        * @return {PropertyResize} .
        */
        class PropertyResize {
        }
        api.PropertyResize = PropertyResize;
        /**
        * api for BasicPropertyLoweredKey
        * @class BasicPropertyLoweredKey
        * @constructor
        * @return {BasicPropertyLoweredKey} .
        */
        class BasicPropertyLoweredKey {
        }
        api.BasicPropertyLoweredKey = BasicPropertyLoweredKey;
        /**
       * api for Dependency properties
       * @class DependencyProperties
       * @constructor
       * @return {DependencyProperties} .
       */
        class DependencyProperties {
        }
        api.DependencyProperties = DependencyProperties;
        /**
        * api for Dependency properties
        * @class DependencyPropertiesLoweredKey
        * @constructor
        * @return {DependencyPropertiesLoweredKey} .
        */
        class DependencyPropertiesLoweredKey {
        }
        api.DependencyPropertiesLoweredKey = DependencyPropertiesLoweredKey;
        /**
        * api for ObjectProperty
        * @class ObjectProperty
        * @constructor
        * @return {ObjectProperty} .
        */
        class ObjectProperty {
        }
        api.ObjectProperty = ObjectProperty;
        /**
        * api for ObjectPropertyLoweredKey
        * @class ObjectPropertyLoweredKey
        * @constructor
        * @return {ObjectPropertyLoweredKey} .
        */
        class ObjectPropertyLoweredKey {
        }
        api.ObjectPropertyLoweredKey = ObjectPropertyLoweredKey;
        /**
        * api for ObjectPropertyCollection
        * @class ObjectPropertyCollection
        * @constructor
        * @return {ObjectPropertyCollection} .
        */
        class ObjectPropertyCollection {
        }
        api.ObjectPropertyCollection = ObjectPropertyCollection;
        /**
        * api for SearchProperty
        * @class SearchProperty
        * @constructor
        * @return {SearchProperty} .
        */
        class SearchProperty {
        }
        api.SearchProperty = SearchProperty;
        /**
        * api for SearchSettings
        * @class SearchSettings
        * @constructor
        * @return {SearchSettings} .
        */
        class SearchSettings {
        }
        api.SearchSettings = SearchSettings;
        /**
    * api for SavedSearch
    * @class SavedSearch
    * @constructor
    * @return {SavedSearch} .
    */
        class SavedSearch {
        }
        api.SavedSearch = SavedSearch;
        /**
        
        * api for SavedSearchesCollection
        * @class SavedSearchesCollection
        * @constructor
        * @return {SavedSearchesCollection} .
        */
        class SavedSearchesCollection {
        }
        api.SavedSearchesCollection = SavedSearchesCollection;
        /**
        /**
        * api for PresetSettings
        * @class PresetSettings
        * @constructor
        * @return {PresetSettings} .
        */
        class PresetSettings {
        }
        api.PresetSettings = PresetSettings;
        /**
    
        /**
    * api for PresetSettingsCollection
    * @class PresetSettingsCollection
    * @constructor
    * @return {PresetSettingsCollection} .
    */
        class PresetSettingsCollection {
        }
        api.PresetSettingsCollection = PresetSettingsCollection;
        /**
        * api for SearchSettingsCollection
        * @class SearchSettingsCollection
        * @constructor
        * @return {SearchSettingsCollection} .
        */
        class SearchSettingsCollection {
        }
        api.SearchSettingsCollection = SearchSettingsCollection;
        /**
        * api for ObjectSearchPropertyType
        * @class ObjectSearchPropertyType
        * @constructor
        * @return {ObjectSearchPropertyType} .
        */
        class ObjectSearchPropertyType {
        }
        api.ObjectSearchPropertyType = ObjectSearchPropertyType;
        /**
        * api for ObjectSearchType
        * @class ObjectSearchType
        * @constructor
        * @return {ObjectSearchType} .
        */
        class ObjectSearchType {
        }
        api.ObjectSearchType = ObjectSearchType;
        /**
        * api for Toolbar
        * @class Toolbar
        * @constructor
        * @return {Toolbar} .
        */
        class Toolbar {
        }
        api.Toolbar = Toolbar;
        /**
        * api for ToolbarButton
        * @class ToolbarButton
        * @constructor
        * @return {ToolbarButton} .
        */
        class ToolbarButton {
            constructor() {
                this.BagOnly = false;
            }
        }
        api.ToolbarButton = ToolbarButton;
        /**
        * api for TemplateGroupCollection
        * @class TemplateGroupCollection
        * @constructor
        * @return {TemplateGroupCollection} .
        */
        class TemplateGroupCollection {
        }
        api.TemplateGroupCollection = TemplateGroupCollection;
        /**
        * api for TemplateGroup
        * @class TemplateGroup
        * @constructor
        * @return {TemplateGroup} .
        */
        class TemplateGroup {
        }
        api.TemplateGroup = TemplateGroup;
        /**
        * api for Template
        * @class Template
        * @constructor
        * @return {Template} .
        */
        class Template {
        }
        api.Template = Template;
        /**
        * api for ObjectViewProperty
        * @class ObjectViewProperty
        * @constructor
        * @return {ObjectViewProperty} .
        */
        class ObjectViewProperty {
        }
        api.ObjectViewProperty = ObjectViewProperty;
        /**
        * api for ObjectViewPropertyCollection
        * @class ObjectViewPropertyCollection
        * @constructor
        * @return {ObjectViewPropertyCollection} .
        */
        class ObjectViewPropertyCollection {
        }
        api.ObjectViewPropertyCollection = ObjectViewPropertyCollection;
        /**
        * api for ObjectView
        * @class ObjectView
        * @constructor
        * @return {ObjectView} .
        */
        class ObjectView {
        }
        api.ObjectView = ObjectView;
        /**
        * api for ObjectViewCollection
        * @class ObjectViewCollection
        * @constructor
        * @return {ObjectViewCollection} .
        */
        class ObjectViewCollection {
        }
        api.ObjectViewCollection = ObjectViewCollection;
    })(api = flexygo.api || (flexygo.api = {}));
})(flexygo || (flexygo = {}));
/**
 * @namespace flexygo.api.chart
 */
(function (flexygo) {
    var api;
    (function (api) {
        var chart;
        (function (chart) {
            /**
            * api for GetHTMLParameters
            * @class GetHTMLParameters
            * @constructor
            * @return {GetHTMLParameters} .
            */
            class GetHTMLParameters {
            }
            chart.GetHTMLParameters = GetHTMLParameters;
            /**
            * api for GetHTMLResponse
            * @class GetHTMLResponse
            * @constructor
            * @return {GetHTMLResponse} .
            */
            class GetHTMLResponse {
            }
            chart.GetHTMLResponse = GetHTMLResponse;
            /**
        * api for GetSettingsParameters
        * @class GetSettingsParameters
        * @constructor
        * @return {GetSettingsParameters} .
        */
            class GetSettingsParameters {
            }
            chart.GetSettingsParameters = GetSettingsParameters;
            /**
        * api for GetSettingsResponse
        * @class GetSettingsResponse
        * @constructor
        * @return {GetSettingsResponse} .
        */
            class GetSettingsResponse {
            }
            chart.GetSettingsResponse = GetSettingsResponse;
        })(chart = api.chart || (api.chart = {}));
    })(api = flexygo.api || (flexygo.api = {}));
})(flexygo || (flexygo = {}));
/**
 * @namespace flexygo.api.easypie
 */
(function (flexygo) {
    var api;
    (function (api) {
        var easypie;
        (function (easypie) {
            /**
            * api for GetHTMLParameters
            * @class GetHTMLParameters
            * @constructor
            * @return {GetHTMLParameters} .
            */
            class GetHTMLParameters {
            }
            easypie.GetHTMLParameters = GetHTMLParameters;
            class GetHTMLResponse {
            }
            easypie.GetHTMLResponse = GetHTMLResponse;
        })(easypie = api.easypie || (api.easypie = {}));
    })(api = flexygo.api || (flexygo.api = {}));
})(flexygo || (flexygo = {}));
/**
 * @namespace flexygo.api.orgchart
 */
(function (flexygo) {
    var api;
    (function (api) {
        var orgchart;
        (function (orgchart) {
            /**
            * api for GetNodes
            * @class GetNodes
            * @constructor
            * @return {GetNodes} .
            */
            class GetParameters {
            }
            orgchart.GetParameters = GetParameters;
            class GetNodesResponse {
            }
            orgchart.GetNodesResponse = GetNodesResponse;
            class Node {
            }
            orgchart.Node = Node;
        })(orgchart = api.orgchart || (api.orgchart = {}));
    })(api = flexygo.api || (flexygo.api = {}));
})(flexygo || (flexygo = {}));
/**
 * @namespace flexygo.api.kanban
 */
(function (flexygo) {
    var api;
    (function (api) {
        var kanban;
        (function (kanban) {
            /**
            * api for getKanbanParams
            * @class getKanbanParams
            * @constructor
            * @return {getKanbanParams} .
            */
            class getKanbanParams {
            }
            kanban.getKanbanParams = getKanbanParams;
            /**
            * api for getKanbanColumnParams
            * @class getKanbanParams
            * @constructor
            * @return {getKanbanParams} .
            */
            class getKanbanColumnParams {
            }
            kanban.getKanbanColumnParams = getKanbanColumnParams;
            /**
            * api for getKanbanResponse
            * @class getKanbanResponse
            * @constructor
            * @return {getKanbanResponse} .
            */
            class getKanbanResponse {
            }
            kanban.getKanbanResponse = getKanbanResponse;
            /**
            * api for kanbanSettings
            * @class kanbanSettings
            * @constructor
            * @return {kanbanSettings} .
            */
            class kanbanSettings {
            }
            kanban.kanbanSettings = kanbanSettings;
            /**
            * api for kanbanSettingOrders
            * @class kanbanSettingOrders
            * @constructor
            * @return {kanbanSettingOrders} .
            */
            class kanbanSettingOrders {
            }
            kanban.kanbanSettingOrders = kanbanSettingOrders;
        })(kanban = api.kanban || (api.kanban = {}));
    })(api = flexygo.api || (flexygo.api = {}));
})(flexygo || (flexygo = {}));
/**
 * @namespace flexygo.api.timeline
 */
(function (flexygo) {
    var api;
    (function (api) {
        var timeline;
        (function (timeline) {
            /**
            * api for getTimelineParams
            * @class getTimelineParams
            * @constructor
            * @return {getTimelineParams} .
            */
            class getTimelineParams {
            }
            timeline.getTimelineParams = getTimelineParams;
            /**
            * api for getTimelineResponse
            * @class getTimelineResponse
            * @constructor
            * @return {getTimelineResponse} .
            */
            class getTimelineResponse {
            }
            timeline.getTimelineResponse = getTimelineResponse;
            /**
            * api for timelineSetting
            * @class timelineSetting
            * @constructor
            * @return {timelineSetting} .
            */
            class timelineSetting {
            }
            timeline.timelineSetting = timelineSetting;
            /**
           * api for timelineRanges
           * @class timelineRanges
           * @constructor
           * @return {timelineRanges} .
           */
            class timelineRanges {
            }
            timeline.timelineRanges = timelineRanges;
            /**
            * api for timelineEntityConfiguration
            * @class timelineEntityConfiguration
            * @constructor
            * @return {timelineEntityConfiguration} .
            */
            class timelineEntityConfiguration {
            }
            timeline.timelineEntityConfiguration = timelineEntityConfiguration;
            class visTimeline extends vis.Timeline {
            }
            timeline.visTimeline = visTimeline;
        })(timeline = api.timeline || (api.timeline = {}));
    })(api = flexygo.api || (flexygo.api = {}));
})(flexygo || (flexygo = {}));
/**
 * @namespace flexygo.api.edit
 */
(function (flexygo) {
    var api;
    (function (api) {
        var edit;
        (function (edit) {
            /**
            * api for KeyValuePair
            * @class KeyValuePair
            * @constructor
            * @return {KeyValuePair} .
            */
            class KeyValuePair {
            }
            edit.KeyValuePair = KeyValuePair;
            /**
            * api for DependencyAction
            * @class DependencyAction
            * @constructor
            * @return {DependencyAction} .
            */
            class DependencyAction {
            }
            edit.DependencyAction = DependencyAction;
            /**
            * api for DependencyHelper
            * @class DependencyHelper
            * @constructor
            * @return {DependencyHelper} .
            */
            class DependencyHelper {
            }
            edit.DependencyHelper = DependencyHelper;
            /**
            * api for saveDependenciesConfigParams
            * @class saveDependenciesConfigParams
            * @constructor
            * @return {saveDependenciesConfigParams} .
            */
            class saveDependenciesConfigParams {
            }
            edit.saveDependenciesConfigParams = saveDependenciesConfigParams;
            /**
            * api for ObjectRowDependency
            * @class ObjectRowDependency
            * @constructor
            * @return {ObjectRowDependency} .
            */
            class ObjectRowDependency {
            }
            edit.ObjectRowDependency = ObjectRowDependency;
            /**
            * api for processDependenciesParams
            * @class processDependenciesParams
            * @constructor
            * @return {processDependenciesParams} .
            */
            class processDependenciesParams {
            }
            edit.processDependenciesParams = processDependenciesParams;
            /**
           * api for processAllDependenciesParams
           * @class processAllDependenciesParams
           * @constructor
           * @return {processAllDependenciesParams} .
           */
            class processAllDependenciesParams {
            }
            edit.processAllDependenciesParams = processAllDependenciesParams;
            /**
           * api for processAllListDependenciesResponse
           * @class processAllListDependenciesResponse
           * @constructor
           * @return {processAllListDependenciesResponse} .
           */
            class processAllListDependenciesResponse {
            }
            edit.processAllListDependenciesResponse = processAllListDependenciesResponse;
            /**
           * api for getEditTemplateParams
           * @class getEditTemplateParams
           * @constructor
           * @return {getEditTemplateParams} .
           */
            class getEditTemplateParams {
            }
            edit.getEditTemplateParams = getEditTemplateParams;
            /**
           * api for getEditTemplateResponse
           * @class getEditTemplateResponse
           * @constructor
           * @return {getEditTemplateResponse} .
           */
            class getEditTemplateResponse {
            }
            edit.getEditTemplateResponse = getEditTemplateResponse;
            /**
           * api for getComboTextParams
           * @class getComboTextParams
           * @constructor
           * @return {getComboTextParams} .
           */
            class getComboTextParams {
            }
            edit.getComboTextParams = getComboTextParams;
            /**
        * api for getComboTextParamsByView
        * @class getComboTextParamsByView
        * @constructor
        * @return {getComboTextParamsByView} .
        */
            class getComboTextParamsByView {
            }
            edit.getComboTextParamsByView = getComboTextParamsByView;
            /**
           * api for getComboDataParams
           * @class getComboDataParams
           * @constructor
           * @return {getComboDataParams} .
           */
            class getComboDataParams {
            }
            edit.getComboDataParams = getComboDataParams;
            /**
           * api for getProcessParamsTemplateParams
           * @class getProcessParamsTemplateParams
           * @constructor
           * @return {getProcessParamsTemplateParams} .
           */
            class getProcessParamsTemplateParams {
            }
            edit.getProcessParamsTemplateParams = getProcessParamsTemplateParams;
            /**
           * api for getProcessParamsTemplateResponse
           * @class getProcessParamsTemplateResponse
           * @constructor
           * @return {getProcessParamsTemplateResponse} .
           */
            class getProcessParamsTemplateResponse {
            }
            edit.getProcessParamsTemplateResponse = getProcessParamsTemplateResponse;
            /**
           * api for getReportParamsTemplateParams
           * @class getReportParamsTemplateParams
           * @constructor
           * @return {getReportParamsTemplateParams} .
           */
            class getReportParamsTemplateParams {
            }
            edit.getReportParamsTemplateParams = getReportParamsTemplateParams;
            /**
           * api for getReportParamsTemplateResponse
           * @class getReportParamsTemplateResponse
           * @constructor
           * @return {getReportParamsTemplateResponse} .
           */
            class getReportParamsTemplateResponse {
            }
            edit.getReportParamsTemplateResponse = getReportParamsTemplateResponse;
            /**
           * api for getComboDataViewParams
           * @class getComboDataViewParams
           * @constructor
           * @return {getComboDataViewParams} .
           */
            class getComboDataViewParams {
            }
            edit.getComboDataViewParams = getComboDataViewParams;
            /**
           * api for getEditConfigParams
           * @class getEditConfigParams
           * @constructor
           * @return {getEditConfigParams} .
           */
            class getEditConfigParams {
            }
            edit.getEditConfigParams = getEditConfigParams;
            /**
           * api for getEditConfigResponse
           * @class getEditConfigResponse
           * @constructor
           * @return {getEditConfigResponse} .
           */
            class getEditConfigResponse {
            }
            edit.getEditConfigResponse = getEditConfigResponse;
            /**
           * api for getNewPropertiesParams
           * @class getNewPropertiesParams
           * @constructor
           * @return {getNewPropertiesParams} .
           */
            class getNewPropertiesParams {
            }
            edit.getNewPropertiesParams = getNewPropertiesParams;
            /**
           * api for addNewPropertiesParams
           * @class addNewPropertiesParams
           * @constructor
           * @return {addNewPropertiesParams} .
           */
            class addNewPropertiesParams {
            }
            edit.addNewPropertiesParams = addNewPropertiesParams;
            /**
           * api for addNewFieldParams
           * @class addNewFieldParams
           * @constructor
           * @return {addNewFieldParams} .
           */
            class addNewFieldParams {
            }
            edit.addNewFieldParams = addNewFieldParams;
            /**
            * api for addDetachedPropertyParams
            * @class addDetachedPropertyParams
            * @constructor
            * @return {addDetachedPropertyParams} .
            */
            class addDetachedPropertyParams {
            }
            edit.addDetachedPropertyParams = addDetachedPropertyParams;
            /**
           * api for InsertSeparatorParams
           * @class InsertSeparatorParams
           * @constructor
           * @return {InsertSeparatorParams} .
           */
            class InsertSeparatorParams {
            }
            edit.InsertSeparatorParams = InsertSeparatorParams;
            /**
           * api for InsertPlaceHolderParams
           * @class InsertPlaceHolderParams
           * @constructor
           * @return {InsertPlaceHolderParams} .
           */
            class InsertPlaceHolderParams {
            }
            edit.InsertPlaceHolderParams = InsertPlaceHolderParams;
        })(edit = api.edit || (api.edit = {}));
    })(api = flexygo.api || (flexygo.api = {}));
})(flexygo || (flexygo = {}));
/**
 * @namespace flexygo.api.entity
 */
(function (flexygo) {
    var api;
    (function (api) {
        var entity;
        (function (entity) {
            /**
           * api for ObjBasicConfig
           * @class ObjBasicConfig
           * @constructor
           * @return {ObjBasicConfig} .
           */
            class ObjBasicConfig {
            }
            entity.ObjBasicConfig = ObjBasicConfig;
            /**
           * api for GetProcessesResponse
           * @class GetProcessesResponse
           * @constructor
           * @return {GetProcessesResponse} .
           */
            class GetProcessesResponse {
            }
            entity.GetProcessesResponse = GetProcessesResponse;
            /**
            * api for GetConfigParams
            * @class GetConfigParams
            * @constructor
            * @return {GetConfigParams} .
            */
            class GetConfigParams {
            }
            entity.GetConfigParams = GetConfigParams;
        })(entity = api.entity || (api.entity = {}));
    })(api = flexygo.api || (flexygo.api = {}));
})(flexygo || (flexygo = {}));
(function (flexygo) {
    var api;
    (function (api) {
        var gipe;
        (function (gipe) {
            class GipeTemplateHelper {
            }
            gipe.GipeTemplateHelper = GipeTemplateHelper;
            class GipeWorkflowVersion {
            }
            gipe.GipeWorkflowVersion = GipeWorkflowVersion;
            class GipeWorkflow {
            }
            gipe.GipeWorkflow = GipeWorkflow;
            class loadWorkflowParams {
            }
            gipe.loadWorkflowParams = loadWorkflowParams;
            class GipeMessageAskParams {
            }
            gipe.GipeMessageAskParams = GipeMessageAskParams;
            class GipeMessageAskEntity {
            }
            gipe.GipeMessageAskEntity = GipeMessageAskEntity;
            class GipeMessageAskYesNo {
            }
            gipe.GipeMessageAskYesNo = GipeMessageAskYesNo;
            class GipeDebugExecution {
            }
            gipe.GipeDebugExecution = GipeDebugExecution;
            class GipeDebugStep {
            }
            gipe.GipeDebugStep = GipeDebugStep;
            class GipeDebugStatus {
            }
            gipe.GipeDebugStatus = GipeDebugStatus;
            class GipeParameterHelper {
            }
            gipe.GipeParameterHelper = GipeParameterHelper;
        })(gipe = api.gipe || (api.gipe = {}));
    })(api = flexygo.api || (flexygo.api = {}));
})(flexygo || (flexygo = {}));
(function (flexygo) {
    var api;
    (function (api) {
        var html;
        (function (html) {
            /**
            * api for GetHTMLParams
            * @class GetHTMLParams
            * @constructor
            * @return {GetHTMLParams} .
            */
            class GetHTMLParams {
            }
            html.GetHTMLParams = GetHTMLParams;
            /**
            * api for GetHTMLResponse
            * @class GetHTMLResponse
            * @constructor
            * @return {GetHTMLResponse} .
            */
            class GetHTMLResponse {
            }
            html.GetHTMLResponse = GetHTMLResponse;
        })(html = api.html || (api.html = {}));
    })(api = flexygo.api || (flexygo.api = {}));
})(flexygo || (flexygo = {}));
/**
 * @namespace flexygo.api.mail
 */
(function (flexygo) {
    var api;
    (function (api) {
        var mail;
        (function (mail) {
            /**
            * api for SearchSettings
            * @class SearchSettings
            * @constructor
            * @return {MailFilters} .
            */
            class MailFilters {
            }
            mail.MailFilters = MailFilters;
            /**
           * api for SearchSettings
           * @class SearchSettings
           * @constructor
           * @return {MailFolder} .
           */
            class MailFolder {
            }
            mail.MailFolder = MailFolder;
        })(mail = api.mail || (api.mail = {}));
    })(api = flexygo.api || (flexygo.api = {}));
})(flexygo || (flexygo = {}));
/**
 * @namespace flexygo.api.list
 */
(function (flexygo) {
    var api;
    (function (api) {
        var list;
        (function (list) {
            /**
            * api for ModulePager
            * @class ModulePager
            * @constructor
            * @return {ModulePager} .
            */
            class ModulePager {
            }
            list.ModulePager = ModulePager;
            /**
            * api for PropertyOrder
            * @class PropertyOrder
            * @constructor
            * @return {PropertyOrder}
            */
            class PropertyOrder {
            }
            list.PropertyOrder = PropertyOrder;
            /**
            * api for getListParams
            * @class getListParams
            * @constructor
            * @return {getListParams} .
            */
            class getListParams {
            }
            list.getListParams = getListParams;
            /**
            * api for getListResponse
            * @class getListResponse
            * @constructor
            * @return {getListResponse} .
            */
            class getListResponse {
            }
            list.getListResponse = getListResponse;
            /**
            * api for getSearchParams
            * @class getSearchParams
            * @constructor
            * @return {getSearchParams} .
            */
            class getSearchParams {
            }
            list.getSearchParams = getSearchParams;
            /**
            * api for getSearchResponse
            * @class getSearchResponse
            * @constructor
            * @return {getSearchResponse} .
            */
            class getSearchResponse {
            }
            list.getSearchResponse = getSearchResponse;
            /**
            * api for getCountParams
            * @class getCountParams
            * @constructor
            * @return {getCountParams} .
            */
            class getCountParams {
            }
            list.getCountParams = getCountParams;
        })(list = api.list || (api.list = {}));
    })(api = flexygo.api || (flexygo.api = {}));
})(flexygo || (flexygo = {}));
/**
 * @namespace flexygo.api.maps
 */
(function (flexygo) {
    var api;
    (function (api) {
        var maps;
        (function (maps) {
            /**
            * api for GetHTMLParams
            * @class GetHTMLParams
            * @constructor
            * @return {GetHTMLParams} .
            */
            class GetHTMLParams {
            }
            maps.GetHTMLParams = GetHTMLParams;
            /**
            * api for GetHTMLResponse
            * @class GetHTMLResponse
            * @constructor
            * @return {GetHTMLResponse} .
            */
            class GetHTMLResponse {
            }
            maps.GetHTMLResponse = GetHTMLResponse;
        })(maps = api.maps || (api.maps = {}));
    })(api = flexygo.api || (flexygo.api = {}));
})(flexygo || (flexygo = {}));
/**
 * @namespace flexygo.api.mastertables
 */
(function (flexygo) {
    var api;
    (function (api) {
        var mastertables;
        (function (mastertables) {
            /**
        * api for GetHTMLResponse
        * @class GetHTMLResponse
        * @constructor
        * @return {MasterTablePropertyCollection} .
        */
            class MasterTablePropertyCollection {
            }
            mastertables.MasterTablePropertyCollection = MasterTablePropertyCollection;
            /**
            * api for insertParams
            * @class insertParams
            * @constructor
            * @return {insertParams} .
            */
            class insertParams {
            }
            mastertables.insertParams = insertParams;
            /**
            * api for updateParams
            * @class updateParams
            * @constructor
            * @return {updateParams} .
            */
            class updateParams {
            }
            mastertables.updateParams = updateParams;
            /**
            * api for deleteParams
            * @class deleteParams
            * @constructor
            * @return {deleteParams} .
            */
            class deleteParams {
            }
            mastertables.deleteParams = deleteParams;
            /**
            * api for getSettingsParams
            * @class getSettingsParams
            * @constructor
            * @return {getSettingsParams} .
            */
            class getSettingsParams {
            }
            mastertables.getSettingsParams = getSettingsParams;
            /**
            * api for getSettingsResponse
            * @class getSettingsResponse
            * @constructor
            * @return {getSettingsResponse} .
            */
            class getSettingsResponse {
            }
            mastertables.getSettingsResponse = getSettingsResponse;
            /**
            * api for MasterTableFieldsCollection
            * @class MasterTableFieldsCollection
            * @constructor
            * @return {MasterTableFieldsCollection} .
            */
            class MasterTableFieldsCollection {
            }
            mastertables.MasterTableFieldsCollection = MasterTableFieldsCollection;
            /**
            * api for MasterTableField
            * @class MasterTableField
            * @constructor
            * @return {MasterTableField} .
            */
            class MasterTableField {
            }
            mastertables.MasterTableField = MasterTableField;
        })(mastertables = api.mastertables || (api.mastertables = {}));
    })(api = flexygo.api || (flexygo.api = {}));
})(flexygo || (flexygo = {}));
/**
 * @namespace flexygo.api.navigation
 */
(function (flexygo) {
    var api;
    (function (api) {
        var navigation;
        (function (navigation) {
            /**
            * api for NavigationNode
            * @class NavigationNode
            * @constructor
            * @return {NavigationNode} .
            */
            class NavigationNode {
            }
            navigation.NavigationNode = NavigationNode;
            class GetNavNodesParams {
            }
            navigation.GetNavNodesParams = GetNavNodesParams;
            class GetMainNodesParams {
            }
            navigation.GetMainNodesParams = GetMainNodesParams;
            class getNodesByIdParams {
            }
            navigation.getNodesByIdParams = getNodesByIdParams;
            /**
            * api for LoweredNavigationNode
            * @class LoweredNavigationNode
            * @constructor
            * @return {NavigationNode} .
            */
            class LoweredNavigationNode {
            }
            navigation.LoweredNavigationNode = LoweredNavigationNode;
        })(navigation = api.navigation || (api.navigation = {}));
    })(api = flexygo.api || (flexygo.api = {}));
})(flexygo || (flexygo = {}));
/**
 * @namespace flexygo.api.objectrelations
 */
(function (flexygo) {
    var api;
    (function (api) {
        var objectrelations;
        (function (objectrelations) {
            /**
            * api for GetHTMLParams
            * @class GetHTMLParams
            * @constructor
            * @return {GetHTMLParams} .
            */
            class GetHTMLParams {
            }
            objectrelations.GetHTMLParams = GetHTMLParams;
            /**
            * api for GetHTMLResponse
            * @class GetHTMLResponse
            * @constructor
            * @return {GetHTMLResponse} .
            */
            class GetHTMLResponse {
            }
            objectrelations.GetHTMLResponse = GetHTMLResponse;
        })(objectrelations = api.objectrelations || (api.objectrelations = {}));
    })(api = flexygo.api || (flexygo.api = {}));
})(flexygo || (flexygo = {}));
/**
 * @namespace flexygo.api.process
 */
(function (flexygo) {
    var api;
    (function (api) {
        var process;
        (function (process) {
            /**
            * api for getProcessInfoByNameParams
            * @class getProcessInfoByNameParams
            * @constructor
            * @return {getProcessInfoByNameParams} .
            */
            class getProcessInfoByNameParams {
            }
            process.getProcessInfoByNameParams = getProcessInfoByNameParams;
            var ProcessType;
            (function (ProcessType) {
                ProcessType[ProcessType["Standard"] = -1] = "Standard";
                ProcessType[ProcessType["StoredProcedure"] = 0] = "StoredProcedure";
                ProcessType[ProcessType["Dllprocess"] = 1] = "Dllprocess";
                ProcessType[ProcessType["Redirect"] = 2] = "Redirect";
                ProcessType[ProcessType["JavaScript"] = 3] = "JavaScript";
                ProcessType[ProcessType["WebService"] = 4] = "WebService";
                ProcessType[ProcessType["VBEmbedded"] = 5] = "VBEmbedded";
                ProcessType[ProcessType["CSharpEmbedded"] = 6] = "CSharpEmbedded";
                ProcessType[ProcessType["ObjectLink"] = 7] = "ObjectLink";
                ProcessType[ProcessType["PageLink"] = 8] = "PageLink";
                ProcessType[ProcessType["ReportLink"] = 9] = "ReportLink";
                ProcessType[ProcessType["HelpLink"] = 10] = "HelpLink";
            })(ProcessType = process.ProcessType || (process.ProcessType = {}));
            /**
            * api for ProcessParam
            * @class ProcessParam
            * @constructor
            * @return {ProcessParam} .
            */
            class ProcessParam {
            }
            process.ProcessParam = ProcessParam;
            /**
            * api for ProcessConfig
            * @class ProcessConfig
            * @constructor
            * @return {ProcessConfig} .
            */
            class ProcessConfig {
            }
            process.ProcessConfig = ProcessConfig;
        })(process = api.process || (api.process = {}));
    })(api = flexygo.api || (flexygo.api = {}));
})(flexygo || (flexygo = {}));
/**
 * @namespace flexygo.api.rss
 */
(function (flexygo) {
    var api;
    (function (api) {
        var rss;
        (function (rss) {
            /**
            * api for GetHTMLParams
            * @class GetHTMLParams
            * @constructor
            * @return {GetHTMLParams} .
            */
            class GetHTMLParams {
            }
            rss.GetHTMLParams = GetHTMLParams;
            /**
            * api for GetHTMLResponse
            * @class GetHTMLResponse
            * @constructor
            * @return {GetHTMLResponse} .
            */
            class GetHTMLResponse {
            }
            rss.GetHTMLResponse = GetHTMLResponse;
        })(rss = api.rss || (api.rss = {}));
    })(api = flexygo.api || (flexygo.api = {}));
})(flexygo || (flexygo = {}));
/**
 * @namespace flexygo.api.security
 */
(function (flexygo) {
    var api;
    (function (api) {
        var security;
        (function (security) {
            /**
            * api for SetSecurityParams
            * @class SetSecurityParams
            * @constructor
            * @return {SetSecurityParams} .
            */
            class SetSecurityParams {
            }
            security.SetSecurityParams = SetSecurityParams;
            /**
            * api for getObjectKeyParams
            * @class getObjectKeyParams
            * @constructor
            * @return {getObjectKeyParams} .
            */
            class getObjectKeyParams {
            }
            security.getObjectKeyParams = getObjectKeyParams;
        })(security = api.security || (api.security = {}));
    })(api = flexygo.api || (flexygo.api = {}));
})(flexygo || (flexygo = {}));
/**
 * @namespace flexygo.api.sparkline
 */
(function (flexygo) {
    var api;
    (function (api) {
        var sparkline;
        (function (sparkline) {
            /**
            * api for GetHTMLParams
            * @class GetHTMLParams
            * @constructor
            * @return {GetHTMLParams} .
            */
            class GetHTMLParams {
            }
            sparkline.GetHTMLParams = GetHTMLParams;
            /**
            * api for GetHTMLResponse
            * @class GetHTMLResponse
            * @constructor
            * @return {GetHTMLResponse} .
            */
            class GetHTMLResponse {
            }
            sparkline.GetHTMLResponse = GetHTMLResponse;
        })(sparkline = api.sparkline || (api.sparkline = {}));
    })(api = flexygo.api || (flexygo.api = {}));
})(flexygo || (flexygo = {}));
/**
 * @namespace flexygo.api.sqlfeed
 */
(function (flexygo) {
    var api;
    (function (api) {
        var sqlfeed;
        (function (sqlfeed) {
            /**
            * api for GetHTMLParams
            * @class GetHTMLParams
            * @constructor
            * @return {GetHTMLParams} .
            */
            class GetHTMLParams {
            }
            sqlfeed.GetHTMLParams = GetHTMLParams;
            /**
            * api for GetHTMLResponse
            * @class GetHTMLResponse
            * @constructor
            * @return {GetHTMLResponse} .
            */
            class GetHTMLResponse {
            }
            sqlfeed.GetHTMLResponse = GetHTMLResponse;
        })(sqlfeed = api.sqlfeed || (api.sqlfeed = {}));
    })(api = flexygo.api || (flexygo.api = {}));
})(flexygo || (flexygo = {}));
/**
 * @namespace flexygo.api.sys
 */
(function (flexygo) {
    var api;
    (function (api) {
        var sys;
        (function (sys) {
            /**
            * api for setSkinCacheVarsParams
            * @class setSkinCacheVarsParams
            * @constructor
            * @return {setSkinCacheVarsParams} .
            */
            class setSkinCacheVarsParams {
            }
            sys.setSkinCacheVarsParams = setSkinCacheVarsParams;
            /**
            * api for UserSearchSettings
            * @class UserSearchSettings
            * @constructor
            * @return {UserSearchSettings} .
            */
            class UserSearchSettings {
            }
            sys.UserSearchSettings = UserSearchSettings;
            /**
            * api for getUserSearchSettingsResponse
            * @class getUserSearchSettingsResponse
            * @constructor
            * @return {getUserSearchSettingsResponse} .
            */
            class getUserSearchSettingsResponse {
            }
            sys.getUserSearchSettingsResponse = getUserSearchSettingsResponse;
            /**
            * api for SearchCriteria
            * @class SearchCriteria
            * @constructor
            * @return {SearchCriteria} .
            */
            class SearchCriteria {
            }
            sys.SearchCriteria = SearchCriteria;
            /**
            * api for searchObjectsParams
            * @class searchObjectsParams
            * @constructor
            * @return {searchObjectsParams} .
            */
            class searchObjectsParams {
            }
            sys.searchObjectsParams = searchObjectsParams;
            /**
            * api for searchObjectsResponse
            * @class searchObjectsResponse
            * @constructor
            * @return {searchObjectsResponse} .
            */
            class searchObjectsResponse {
            }
            sys.searchObjectsResponse = searchObjectsResponse;
            /**
            * api for saveUserSearchSettingsCheckParams
            * @class saveUserSearchSettingsCheckParams
            * @constructor
            * @return {saveUserSearchSettingsCheckParams} .
            */
            class saveUserSearchSettingsCheckParams {
            }
            sys.saveUserSearchSettingsCheckParams = saveUserSearchSettingsCheckParams;
            /**
            * api for GetFiltersParams
            * @class GetFiltersParams
            * @constructor
            * @return {GetFiltersParams} .
            */
            class GetFiltersParams {
            }
            sys.GetFiltersParams = GetFiltersParams;
            /**
            * api for GetFiltersResponse
            * @class GetFiltersResponse
            * @constructor
            * @return {GetFiltersResponse} .
            */
            class GetFiltersResponse {
            }
            sys.GetFiltersResponse = GetFiltersResponse;
            /**
            * api for GetRelatedObjetsAndPropsParams
            * @class GetRelatedObjetsAndPropsParams
            * @constructor
            * @return {GetRelatedObjetsAndPropsParams} .
            */
            class GetRelatedObjetsAndPropsParams {
            }
            sys.GetRelatedObjetsAndPropsParams = GetRelatedObjetsAndPropsParams;
            /**
            * api for GetRelatedObjetsAndPropsResponse
            * @class GetRelatedObjetsAndPropsResponse
            * @constructor
            * @return {GetRelatedObjetsAndPropsResponse} .
            */
            class GetRelatedObjetsAndPropsResponse {
            }
            sys.GetRelatedObjetsAndPropsResponse = GetRelatedObjetsAndPropsResponse;
            /**
           * api for SaveFilterParams
           * @class SaveFilterParams
           * @constructor
           * @return {SaveFilterParams} .
           */
            class SaveFilterParams {
            }
            sys.SaveFilterParams = SaveFilterParams;
            /**
           * api for GetVersionParams
           * @class GetVersionParams
           * @constructor
           * @return {GetVersionParams} .
           */
            class GetVersionParams {
            }
            sys.GetVersionParams = GetVersionParams;
            /**
           * api for GetVersionResponse
           * @class GetVersionResponse
           * @constructor
           * @return {GetVersionResponse} .
           */
            class GetVersionResponse {
            }
            sys.GetVersionResponse = GetVersionResponse;
            /**
           * api for TestNewVersionParams
           * @class TestNewVersionParams
           * @constructor
           * @return {TestNewVersionParams} .
           */
            class TestNewVersionParams {
            }
            sys.TestNewVersionParams = TestNewVersionParams;
            /**
           * api for UpdateNewVersionParams
           * @class UpdateNewVersionParams
           * @constructor
           * @return {UpdateNewVersionParams} .
           */
            class UpdateNewVersionParams {
            }
            sys.UpdateNewVersionParams = UpdateNewVersionParams;
            var eAutoUpdaterState;
            (function (eAutoUpdaterState) {
                eAutoUpdaterState[eAutoUpdaterState["eStateIdle"] = 0] = "eStateIdle";
                eAutoUpdaterState[eAutoUpdaterState["eStateWorking"] = 1] = "eStateWorking";
                eAutoUpdaterState[eAutoUpdaterState["eStateFinishedOk"] = 2] = "eStateFinishedOk";
                eAutoUpdaterState[eAutoUpdaterState["eStateFinishedError"] = 3] = "eStateFinishedError";
                eAutoUpdaterState[eAutoUpdaterState["eStateWaitingForResponse"] = 4] = "eStateWaitingForResponse";
                eAutoUpdaterState[eAutoUpdaterState["eStateServiceRestarted"] = 5] = "eStateServiceRestarted";
            })(eAutoUpdaterState = sys.eAutoUpdaterState || (sys.eAutoUpdaterState = {}));
            var eAutoUpdaterStatus;
            (function (eAutoUpdaterStatus) {
                eAutoUpdaterStatus[eAutoUpdaterStatus["eStatusUpdatingService"] = 0] = "eStatusUpdatingService";
                eAutoUpdaterStatus[eAutoUpdaterStatus["eStatusCheckingPackages"] = 1] = "eStatusCheckingPackages";
                eAutoUpdaterStatus[eAutoUpdaterStatus["eStatusDownloadingVersion"] = 2] = "eStatusDownloadingVersion";
                eAutoUpdaterStatus[eAutoUpdaterStatus["eStatusUpdateDatabase"] = 3] = "eStatusUpdateDatabase";
                eAutoUpdaterStatus[eAutoUpdaterStatus["eStatusUpdateIIS"] = 4] = "eStatusUpdateIIS";
                eAutoUpdaterStatus[eAutoUpdaterStatus["eStatusFinished"] = 5] = "eStatusFinished";
            })(eAutoUpdaterStatus = sys.eAutoUpdaterStatus || (sys.eAutoUpdaterStatus = {}));
            /**
           * api for checkUpdateProgressResponse
           * @class checkUpdateProgressResponse
           * @constructor
           * @return {checkUpdateProgressResponse} .
           */
            class checkUpdateProgressResponse {
            }
            sys.checkUpdateProgressResponse = checkUpdateProgressResponse;
            /**
           * api for VersionInfo
           * @class VersionInfo
           * @constructor
           * @return {VersionInfo} .
           */
            class VersionInfo {
            }
            sys.VersionInfo = VersionInfo;
            /**
           * api for VersionReviewChange
           * @class VersionReviewChange
           * @constructor
           * @return {VersionReviewChange} .
           */
            class VersionReviewChange {
            }
            sys.VersionReviewChange = VersionReviewChange;
            /**
           * api for getInstalledVersionsResponse
           * @class getInstalledVersionsResponse
           * @constructor
           * @return {getInstalledVersionsResponse} .
           */
            class getInstalledVersionsResponse {
            }
            sys.getInstalledVersionsResponse = getInstalledVersionsResponse;
            /**
           * api for setActiveVersionParams
           * @class setActiveVersionParams
           * @constructor
           * @return {setActiveVersionParams} .
           */
            class setActiveVersionParams {
            }
            sys.setActiveVersionParams = setActiveVersionParams;
            /**
           * api for validateViewParams
           * @class validateViewParams
           * @constructor
           * @return {validateViewParams} .
           */
            class validateViewParams {
            }
            sys.validateViewParams = validateViewParams;
            /**
           * api for saveViewParams
           * @class saveViewParams
           * @constructor
           * @return {saveViewParams} .
           */
            class saveViewParams {
            }
            sys.saveViewParams = saveViewParams;
            /**
            * api for getViewParams
            * @class getViewParams
            * @constructor
            * @return {getViewParams} .
            */
            class getViewParams {
            }
            sys.getViewParams = getViewParams;
            /**
            * api for updateObjectParams
            * @class updateObjectParams
            * @constructor
            * @return {updateObjectParams} .
            */
            class updateObjectParams {
            }
            sys.updateObjectParams = updateObjectParams;
        })(sys = api.sys || (api.sys = {}));
    })(api = flexygo.api || (flexygo.api = {}));
})(flexygo || (flexygo = {}));
/**
 * @namespace flexygo.api.view
 */
(function (flexygo) {
    var api;
    (function (api) {
        var view;
        (function (view) {
            /**
            * api for getViewTemplateParams
            * @class getViewTemplateParams
            * @constructor
            * @return {getViewTemplateParams} .
            */
            class getViewTemplateParams {
            }
            view.getViewTemplateParams = getViewTemplateParams;
            /**
            * api for getViewTemplateResponse
            * @class getViewTemplateResponse
            * @constructor
            * @return {getViewTemplateResponse} .
            */
            class getViewTemplateResponse {
            }
            view.getViewTemplateResponse = getViewTemplateResponse;
        })(view = api.view || (api.view = {}));
    })(api = flexygo.api || (flexygo.api = {}));
})(flexygo || (flexygo = {}));
/**
 * @namespace flexygo.api.pages
 */
(function (flexygo) {
    var api;
    (function (api) {
        var pages;
        (function (pages) {
            /**
            * api for ModuleEvent
            * @class ModuleEvent
            * @constructor
            * @return {ModuleEvent} .
            */
            class ModuleEvent {
            }
            pages.ModuleEvent = ModuleEvent;
            /**
            * api for PageModule
            * @class PageModule
            * @constructor
            * @return {PageModule} .
            */
            class PageModule {
            }
            pages.PageModule = PageModule;
            /**
            * api for PageModuleConfig
            * @class PageModuleConfig
            * @constructor
            * @return {PageModuleConfig} .
            */
            class PageModuleConfig {
            }
            pages.PageModuleConfig = PageModuleConfig;
            /**
            * api for Page
            * @class Page
            * @constructor
            * @return {Page} .
            */
            class Page {
            }
            pages.Page = Page;
            /**
            * api for getPageByNameParams
            * @class getPageByNameParams
            * @constructor
            * @return {getPageByNameParams} .
            */
            class getPageByNameParams {
            }
            pages.getPageByNameParams = getPageByNameParams;
            /**
            * api for GetPageTabModulesParams
            * @class GetPageTabModulesParams
            * @constructor
            * @return {GetPageTabModulesParams} .
            */
            class GetPageTabModulesParams {
            }
            pages.GetPageTabModulesParams = GetPageTabModulesParams;
            /**
            * api for PageModuleCollection
            * @class PageModuleCollection
            * @constructor
            * @return {PageModuleCollection} .
            */
            class PageModuleCollection {
            }
            pages.PageModuleCollection = PageModuleCollection;
            /**
            * api for savePageConfigParams
            * @class savePageConfigParams
            * @constructor
            * @return {savePageConfigParams} .
            */
            class savePageConfigParams {
            }
            pages.savePageConfigParams = savePageConfigParams;
        })(pages = api.pages || (api.pages = {}));
    })(api = flexygo.api || (flexygo.api = {}));
})(flexygo || (flexygo = {}));
/**
 * @namespace flexygo.api.Network
 */
(function (flexygo) {
    var api;
    (function (api) {
        var Network;
        (function (Network) {
            /**
            * api for GetDataParams
            * @class GetDataParams
            * @constructor
            * @return {GetDataParams} .
            */
            class GetDataParams {
            }
            Network.GetDataParams = GetDataParams;
            /**
            * api for GetDataResponse
            * @class GetDataResponse
            * @constructor
            * @return {GetDataResponse} .
            */
            class GetDataResponse {
            }
            Network.GetDataResponse = GetDataResponse;
        })(Network = api.Network || (api.Network = {}));
    })(api = flexygo.api || (flexygo.api = {}));
})(flexygo || (flexygo = {}));
/**
 * @namespace flexygo.api.Notify
 */
(function (flexygo) {
    var api;
    (function (api) {
        var Notify;
        (function (Notify) {
            /**
            * api for NotifyParams
            * @class NotifyParams
            * @constructor
            * @return {NotifyParams} .
            */
            class NotifyParams {
            }
            Notify.NotifyParams = NotifyParams;
        })(Notify = api.Notify || (api.Notify = {}));
    })(api = flexygo.api || (flexygo.api = {}));
})(flexygo || (flexygo = {}));
//# sourceMappingURL=api.js.map