﻿

BEGIN TRY

MERGE INTO [Timelines_Settings] AS Target
USING (VALUES
  (N'Timeline_Advanced',N'Advanced',N'Task',1,1,0,0,NULL,N'Left',N'Week',1,1,N'Name',N'StartDate',N'EndDate',NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'Advanced_Timeline',N'Name',N'StartDate',N'EndDate',NULL,N'Editable',NULL,N'Style',N'Type',N'<div class="ep-parent-container-start">
	<div class="ep-container-start">
      <span title="{{StateDescription}}" class="ep-flag ep-flag-{{IdState|switch:[1:red,2:yellow,3:green,4:blue,else:grey]}}"></span>
  		<h6>
          <i class="fa fa-tasks"></i> {{Name}}
      	</h6>
    </div>
  	<div class="ep-container-start">
      <span style="display: flex;align-items: center;">
         <img src="{{EmployeeImage|url}}" class="img-responsive {{EmployeeImage|isnull:hide}}" style="width: 40px;margin: 2px 10px 2px 0;"/> {{EmployeeName|isnull: Not Assigned}}
      </span>
      <span>
        <i class="flx-icon icon-ppt-2" style="font-size: 12px;margin-left: 20px;"></i> {{ProjectName}}
      </span>
  </div>
</div>',N'<flx-timeline-progressbar color="{{PercentageColor}}" percentage="{{Percentage}}"> 
   <i class="fa fa-clock-o"></i> {{CompletedHours}} / {{EstimatedHours}} h
</flx-timeline-progressbar>',NULL,NULL,NULL,NULL,60,1)
 ,(N'Timeline_AdvancedWithGroups',N'Advanced With Groups',N'Task',1,1,1,1,N'Unassigned Tasks',N'Left',N'Week',1,1,N'Name',N'StartDate',N'EndDate',N'IdEmployee',N'AdvancedGroups_Timeline',N'IdEmployee',N'Name',NULL,N'Style',N'<div class="row" style="display: flex;align-items: center; margin: 5px 15px;">
  <img class="img-responsive" style="width: 60px;margin-right: 10px;" src="{{Image|url}}" />
  <div class="ep-parent-container-start">
    <b style="font-size: 16px;">{{Name}}</b>
    <span>
          <i class="fa fa-group"></i> {{Team}}
    </span>
  </div>
</div>',N'AdvancedWithGroups_Timeline',N'Name',N'StartDate',N'EndDate',N'IdEmployee',N'Editable',NULL,N'Style',N'Type',N'<!--Task Template -->
<div class="ep-parent-container-start {{type|switch:[background:hide,NULL:]}}">
	<div class="ep-container-start">
      <span title="{{StateDescription}}" class="ep-flag ep-flag-{{IdState|switch:[1:red,2:yellow,3:green,4:blue,else:grey]}}"></span>
  		<h6>
          <i class="fa fa-tasks"></i> {{Name}}
      	</h6>
       <span>
        <i class="flx-icon icon-ppt-2" style="font-size: 12px;margin-left: 20px;"></i> {{ProjectName}}
      </span>
    </div>
</div>
<!--Holiday Template -->
<div class="ep-parent-container-start {{type|switch:[background:,NULL:hide]}}">
	<div class="ep-container-start">
  		<h6>
          <i class="fa fa-calendar-minus-o"></i> {{Name}}
      	</h6>
    </div>
 	<div class="ep-container-start">
        <small>{{IdState|switch:[0:Not Validated,1:Validated]}}</small>
  	</div>
</div>',N'<flx-timeline-progressbar color="{{PercentageColor}}" percentage="{{Percentage}}"> 
   <i class="fa fa-clock-o"></i> {{CompletedHours}} / {{EstimatedHours}} h
</flx-timeline-progressbar>',NULL,NULL,NULL,NULL,60,1)
 ,(N'Timeline_Basic',N'Basic',N'Task',0,1,0,0,NULL,N'Left',N'Week',1,1,N'Name',N'StartDate',N'EndDate',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'<div class="ep-parent-container-start">
	<div class="ep-container-start">
      <span title="{{IdState_flxtext}}" class="ep-flag ep-flag-{{IdState|switch:[1:red,2:yellow,3:green,4:blue,else:grey]}}"></span>
  		<h6>
          <i class="fa fa-tasks"></i> {{Name}}
      	</h6>
    </div>
  	<div class="ep-container-start">
      <span>
        <i class="fa fa-clock-o"></i> {{CompletedHours|isnull:0}} / {{EstimatedHours|isnull:0}} h
      </span>
      <span>
        <i class="flx-icon icon-ppt-2" style="font-size: 12px;margin-left: 20px;"></i> {{IdProject_flxtext}}
      </span>
      <span>
        <i class="flx-icon icon-man" style="font-size: 12px;margin-left: 20px;"></i> {{IdEmployee_flxtext|isnull: Not Assigned}}
      </span>
  </div>
</div>',NULL,NULL,NULL,NULL,NULL,60,1)
 ,(N'Timeline_BasicWithGroups',N'Basic With Groups',N'Task',0,1,1,1,N'Unassigned Tasks',N'Left',N'Week',1,1,N'Name',N'StartDate',N'EndDate',N'IdEmployee',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'<div class="ep-parent-container-start">
	<div class="ep-container-start">
      <span title="{{IdState_flxtext}}"  class="ep-flag ep-flag-{{IdState|switch:[1:red,2:yellow,3:green,4:blue,else:grey]}}"></span>
  		<h6>
          <i class="fa fa-tasks"></i> {{Name}}
      	</h6>
    </div>
  	<div class="ep-container-start">
      <span>
        <i class="fa fa-clock-o"></i> {{CompletedHours|isnull:0}} / {{EstimatedHours|isnull:0}} h
      </span>
      <span>
        <i class="flx-icon icon-ppt-2" style="font-size: 12px;margin-left: 20px;"></i> {{IdProject_flxtext}}
      </span>
  </div>
</div>',NULL,NULL,NULL,NULL,NULL,60,1)
) AS Source ([TimelineSettingName],[TimelineSettingDescrip],[ObjectName],[Advanced],[Editable],[WithGroups],[ShowItemsWithoutGroup],[TitleItemsWithoutGroup],[LayoutName],[DefaultRangeName],[ShowControls],[OnInsertOpenNewWithDefaults],[PropertyDescrip],[PropertyStartDate],[PropertyEndDate],[PropertyGroup],[GroupViewName],[GroupIdField],[GroupDescripField],[GroupClassNameField],[GroupStyleField],[GroupContentTemplate],[ItemViewName],[ItemDescripField],[ItemStartDateField],[ItemEndDateField],[ItemGroupField],[ItemEditableField],[ItemClassNameField],[ItemStyleField],[ItemTypeField],[ItemContentTemplate],[ItemVisibleFrameTemplate],[OnMovingFunction],[OnDropObjectOnItemFunction],[OnDeleteFunction],[CustomOptions],[DefaultTime],[OriginId])
ON (Target.[TimelineSettingName] = Source.[TimelineSettingName])
WHEN MATCHED AND (
	NULLIF(Source.[TimelineSettingDescrip], Target.[TimelineSettingDescrip]) IS NOT NULL OR NULLIF(Target.[TimelineSettingDescrip], Source.[TimelineSettingDescrip]) IS NOT NULL OR 
	NULLIF(Source.[ObjectName], Target.[ObjectName]) IS NOT NULL OR NULLIF(Target.[ObjectName], Source.[ObjectName]) IS NOT NULL OR 
	NULLIF(Source.[Advanced], Target.[Advanced]) IS NOT NULL OR NULLIF(Target.[Advanced], Source.[Advanced]) IS NOT NULL OR 
	NULLIF(Source.[Editable], Target.[Editable]) IS NOT NULL OR NULLIF(Target.[Editable], Source.[Editable]) IS NOT NULL OR 
	NULLIF(Source.[WithGroups], Target.[WithGroups]) IS NOT NULL OR NULLIF(Target.[WithGroups], Source.[WithGroups]) IS NOT NULL OR 
	NULLIF(Source.[ShowItemsWithoutGroup], Target.[ShowItemsWithoutGroup]) IS NOT NULL OR NULLIF(Target.[ShowItemsWithoutGroup], Source.[ShowItemsWithoutGroup]) IS NOT NULL OR 
	NULLIF(Source.[TitleItemsWithoutGroup], Target.[TitleItemsWithoutGroup]) IS NOT NULL OR NULLIF(Target.[TitleItemsWithoutGroup], Source.[TitleItemsWithoutGroup]) IS NOT NULL OR 
	NULLIF(Source.[LayoutName], Target.[LayoutName]) IS NOT NULL OR NULLIF(Target.[LayoutName], Source.[LayoutName]) IS NOT NULL OR 
	NULLIF(Source.[DefaultRangeName], Target.[DefaultRangeName]) IS NOT NULL OR NULLIF(Target.[DefaultRangeName], Source.[DefaultRangeName]) IS NOT NULL OR 
	NULLIF(Source.[ShowControls], Target.[ShowControls]) IS NOT NULL OR NULLIF(Target.[ShowControls], Source.[ShowControls]) IS NOT NULL OR 
	NULLIF(Source.[OnInsertOpenNewWithDefaults], Target.[OnInsertOpenNewWithDefaults]) IS NOT NULL OR NULLIF(Target.[OnInsertOpenNewWithDefaults], Source.[OnInsertOpenNewWithDefaults]) IS NOT NULL OR 
	NULLIF(Source.[PropertyDescrip], Target.[PropertyDescrip]) IS NOT NULL OR NULLIF(Target.[PropertyDescrip], Source.[PropertyDescrip]) IS NOT NULL OR 
	NULLIF(Source.[PropertyStartDate], Target.[PropertyStartDate]) IS NOT NULL OR NULLIF(Target.[PropertyStartDate], Source.[PropertyStartDate]) IS NOT NULL OR 
	NULLIF(Source.[PropertyEndDate], Target.[PropertyEndDate]) IS NOT NULL OR NULLIF(Target.[PropertyEndDate], Source.[PropertyEndDate]) IS NOT NULL OR 
	NULLIF(Source.[PropertyGroup], Target.[PropertyGroup]) IS NOT NULL OR NULLIF(Target.[PropertyGroup], Source.[PropertyGroup]) IS NOT NULL OR 
	NULLIF(Source.[GroupViewName], Target.[GroupViewName]) IS NOT NULL OR NULLIF(Target.[GroupViewName], Source.[GroupViewName]) IS NOT NULL OR 
	NULLIF(Source.[GroupIdField], Target.[GroupIdField]) IS NOT NULL OR NULLIF(Target.[GroupIdField], Source.[GroupIdField]) IS NOT NULL OR 
	NULLIF(Source.[GroupDescripField], Target.[GroupDescripField]) IS NOT NULL OR NULLIF(Target.[GroupDescripField], Source.[GroupDescripField]) IS NOT NULL OR 
	NULLIF(Source.[GroupClassNameField], Target.[GroupClassNameField]) IS NOT NULL OR NULLIF(Target.[GroupClassNameField], Source.[GroupClassNameField]) IS NOT NULL OR 
	NULLIF(Source.[GroupStyleField], Target.[GroupStyleField]) IS NOT NULL OR NULLIF(Target.[GroupStyleField], Source.[GroupStyleField]) IS NOT NULL OR 
	NULLIF(Source.[GroupContentTemplate], Target.[GroupContentTemplate]) IS NOT NULL OR NULLIF(Target.[GroupContentTemplate], Source.[GroupContentTemplate]) IS NOT NULL OR 
	NULLIF(Source.[ItemViewName], Target.[ItemViewName]) IS NOT NULL OR NULLIF(Target.[ItemViewName], Source.[ItemViewName]) IS NOT NULL OR 
	NULLIF(Source.[ItemDescripField], Target.[ItemDescripField]) IS NOT NULL OR NULLIF(Target.[ItemDescripField], Source.[ItemDescripField]) IS NOT NULL OR 
	NULLIF(Source.[ItemStartDateField], Target.[ItemStartDateField]) IS NOT NULL OR NULLIF(Target.[ItemStartDateField], Source.[ItemStartDateField]) IS NOT NULL OR 
	NULLIF(Source.[ItemEndDateField], Target.[ItemEndDateField]) IS NOT NULL OR NULLIF(Target.[ItemEndDateField], Source.[ItemEndDateField]) IS NOT NULL OR 
	NULLIF(Source.[ItemGroupField], Target.[ItemGroupField]) IS NOT NULL OR NULLIF(Target.[ItemGroupField], Source.[ItemGroupField]) IS NOT NULL OR 
	NULLIF(Source.[ItemEditableField], Target.[ItemEditableField]) IS NOT NULL OR NULLIF(Target.[ItemEditableField], Source.[ItemEditableField]) IS NOT NULL OR 
	NULLIF(Source.[ItemClassNameField], Target.[ItemClassNameField]) IS NOT NULL OR NULLIF(Target.[ItemClassNameField], Source.[ItemClassNameField]) IS NOT NULL OR 
	NULLIF(Source.[ItemStyleField], Target.[ItemStyleField]) IS NOT NULL OR NULLIF(Target.[ItemStyleField], Source.[ItemStyleField]) IS NOT NULL OR 
	NULLIF(Source.[ItemTypeField], Target.[ItemTypeField]) IS NOT NULL OR NULLIF(Target.[ItemTypeField], Source.[ItemTypeField]) IS NOT NULL OR 
	NULLIF(Source.[ItemContentTemplate], Target.[ItemContentTemplate]) IS NOT NULL OR NULLIF(Target.[ItemContentTemplate], Source.[ItemContentTemplate]) IS NOT NULL OR 
	NULLIF(Source.[ItemVisibleFrameTemplate], Target.[ItemVisibleFrameTemplate]) IS NOT NULL OR NULLIF(Target.[ItemVisibleFrameTemplate], Source.[ItemVisibleFrameTemplate]) IS NOT NULL OR 
	NULLIF(Source.[OnMovingFunction], Target.[OnMovingFunction]) IS NOT NULL OR NULLIF(Target.[OnMovingFunction], Source.[OnMovingFunction]) IS NOT NULL OR 
	NULLIF(Source.[OnDropObjectOnItemFunction], Target.[OnDropObjectOnItemFunction]) IS NOT NULL OR NULLIF(Target.[OnDropObjectOnItemFunction], Source.[OnDropObjectOnItemFunction]) IS NOT NULL OR 
	NULLIF(Source.[OnDeleteFunction], Target.[OnDeleteFunction]) IS NOT NULL OR NULLIF(Target.[OnDeleteFunction], Source.[OnDeleteFunction]) IS NOT NULL OR 
	NULLIF(Source.[CustomOptions], Target.[CustomOptions]) IS NOT NULL OR NULLIF(Target.[CustomOptions], Source.[CustomOptions]) IS NOT NULL OR 
	NULLIF(Source.[DefaultTime], Target.[DefaultTime]) IS NOT NULL OR NULLIF(Target.[DefaultTime], Source.[DefaultTime]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [TimelineSettingDescrip] = Source.[TimelineSettingDescrip], 
  [ObjectName] = Source.[ObjectName], 
  [Advanced] = Source.[Advanced], 
  [Editable] = Source.[Editable], 
  [WithGroups] = Source.[WithGroups], 
  [ShowItemsWithoutGroup] = Source.[ShowItemsWithoutGroup], 
  [TitleItemsWithoutGroup] = Source.[TitleItemsWithoutGroup], 
  [LayoutName] = Source.[LayoutName], 
  [DefaultRangeName] = Source.[DefaultRangeName], 
  [ShowControls] = Source.[ShowControls], 
  [OnInsertOpenNewWithDefaults] = Source.[OnInsertOpenNewWithDefaults], 
  [PropertyDescrip] = Source.[PropertyDescrip], 
  [PropertyStartDate] = Source.[PropertyStartDate], 
  [PropertyEndDate] = Source.[PropertyEndDate], 
  [PropertyGroup] = Source.[PropertyGroup], 
  [GroupViewName] = Source.[GroupViewName], 
  [GroupIdField] = Source.[GroupIdField], 
  [GroupDescripField] = Source.[GroupDescripField], 
  [GroupClassNameField] = Source.[GroupClassNameField], 
  [GroupStyleField] = Source.[GroupStyleField], 
  [GroupContentTemplate] = Source.[GroupContentTemplate], 
  [ItemViewName] = Source.[ItemViewName], 
  [ItemDescripField] = Source.[ItemDescripField], 
  [ItemStartDateField] = Source.[ItemStartDateField], 
  [ItemEndDateField] = Source.[ItemEndDateField], 
  [ItemGroupField] = Source.[ItemGroupField], 
  [ItemEditableField] = Source.[ItemEditableField], 
  [ItemClassNameField] = Source.[ItemClassNameField], 
  [ItemStyleField] = Source.[ItemStyleField], 
  [ItemTypeField] = Source.[ItemTypeField], 
  [ItemContentTemplate] = Source.[ItemContentTemplate], 
  [ItemVisibleFrameTemplate] = Source.[ItemVisibleFrameTemplate], 
  [OnMovingFunction] = Source.[OnMovingFunction], 
  [OnDropObjectOnItemFunction] = Source.[OnDropObjectOnItemFunction], 
  [OnDeleteFunction] = Source.[OnDeleteFunction], 
  [CustomOptions] = Source.[CustomOptions], 
  [DefaultTime] = Source.[DefaultTime], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([TimelineSettingName],[TimelineSettingDescrip],[ObjectName],[Advanced],[Editable],[WithGroups],[ShowItemsWithoutGroup],[TitleItemsWithoutGroup],[LayoutName],[DefaultRangeName],[ShowControls],[OnInsertOpenNewWithDefaults],[PropertyDescrip],[PropertyStartDate],[PropertyEndDate],[PropertyGroup],[GroupViewName],[GroupIdField],[GroupDescripField],[GroupClassNameField],[GroupStyleField],[GroupContentTemplate],[ItemViewName],[ItemDescripField],[ItemStartDateField],[ItemEndDateField],[ItemGroupField],[ItemEditableField],[ItemClassNameField],[ItemStyleField],[ItemTypeField],[ItemContentTemplate],[ItemVisibleFrameTemplate],[OnMovingFunction],[OnDropObjectOnItemFunction],[OnDeleteFunction],[CustomOptions],[DefaultTime],[OriginId])
 VALUES(Source.[TimelineSettingName],Source.[TimelineSettingDescrip],Source.[ObjectName],Source.[Advanced],Source.[Editable],Source.[WithGroups],Source.[ShowItemsWithoutGroup],Source.[TitleItemsWithoutGroup],Source.[LayoutName],Source.[DefaultRangeName],Source.[ShowControls],Source.[OnInsertOpenNewWithDefaults],Source.[PropertyDescrip],Source.[PropertyStartDate],Source.[PropertyEndDate],Source.[PropertyGroup],Source.[GroupViewName],Source.[GroupIdField],Source.[GroupDescripField],Source.[GroupClassNameField],Source.[GroupStyleField],Source.[GroupContentTemplate],Source.[ItemViewName],Source.[ItemDescripField],Source.[ItemStartDateField],Source.[ItemEndDateField],Source.[ItemGroupField],Source.[ItemEditableField],Source.[ItemClassNameField],Source.[ItemStyleField],Source.[ItemTypeField],Source.[ItemContentTemplate],Source.[ItemVisibleFrameTemplate],Source.[OnMovingFunction],Source.[OnDropObjectOnItemFunction],Source.[OnDeleteFunction],Source.[CustomOptions],Source.[DefaultTime],Source.[OriginId])
WHEN NOT MATCHED BY SOURCE AND TARGET.OriginId = 1 THEN 
 DELETE
;
END TRY
BEGIN CATCH
    DECLARE @ERRORNUMBER	INT,@ERRORMSG		VARCHAR(MAX),@ERRORSTATE		INT
    SELECT @ERRORNUMBER = 50000 + ERROR_NUMBER(),@ERRORMSG = ERROR_MESSAGE(), @ERRORSTATE = ERROR_STATE();
    THROW @ERRORNUMBER, @ERRORMSG, @ERRORSTATE
END CATCH
GO





