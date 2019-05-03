

BEGIN TRY

MERGE INTO [Scheduler_Objects] AS Target
USING (VALUES
  (N'Calendario_acciones',N'Accion',N'Acciones_calendario',N'Date',N'EndDate',N'Hour',N'EndHour',N'Duration',N'CssClass',N'<p>
    <span class="{{TypeClass}}"></span>
	<img style="width:20px" src="{{imageEmp|url}}"/>    
    {{NameEmp}} 
</p>
<span>{{Comment|isnull:No Comment}}</span>',N'IdEmployee',N'CssClass',NULL,1)
 ,(N'Calendario_ventas',N'Venta',N'Calendario_ventas',N'Date',N'DateEnd',N'Ini_Hour',N'End_Hour',N'Duration',N'Color',N'<p>
	<img style="width:20px" src="{{image|url}}"/>    
    {{Name}} 
</p>
<span>{{Descrip|isnull:No Descrip}}</span>',N'IdClient',N'txtColor',NULL,1)
 ,(N'Scheduler',N'Employee_Holiday',N'Scheduler_Calendar',N'StartDate',N'EndDate',NULL,NULL,NULL,N'Color',N'<div class="ep-parent-container-start" style="margin:5px;">
  	<div class="ep-container-start">
         <img src="{{EmployeeImage|url}}" class="img-responsive {{EmployeeImage|isnull:hide}}" style="width: 30px;margin: 2px 10px 2px 0;"/>
      <h6>{{HolidayName}}</h6>
  </div>
 	<div class="ep-container-start">
        {{ValidatedText}}
  	</div>
</div>',N'Employee.IdEmployee',N'TextColor',N'AllDay',1)
) AS Source ([SchedulerName],[ObjectName],[ViewName],[StartDateField],[EndDateField],[StartTimeField],[EndTimeField],[DurationField],[ColorField],[DescripTemplate],[UserIdField],[TextColorField],[AllDayField],[OriginId])
ON (Target.[SchedulerName] = Source.[SchedulerName] AND Target.[ObjectName] = Source.[ObjectName])
WHEN MATCHED AND (
	NULLIF(Source.[ViewName], Target.[ViewName]) IS NOT NULL OR NULLIF(Target.[ViewName], Source.[ViewName]) IS NOT NULL OR 
	NULLIF(Source.[StartDateField], Target.[StartDateField]) IS NOT NULL OR NULLIF(Target.[StartDateField], Source.[StartDateField]) IS NOT NULL OR 
	NULLIF(Source.[EndDateField], Target.[EndDateField]) IS NOT NULL OR NULLIF(Target.[EndDateField], Source.[EndDateField]) IS NOT NULL OR 
	NULLIF(Source.[StartTimeField], Target.[StartTimeField]) IS NOT NULL OR NULLIF(Target.[StartTimeField], Source.[StartTimeField]) IS NOT NULL OR 
	NULLIF(Source.[EndTimeField], Target.[EndTimeField]) IS NOT NULL OR NULLIF(Target.[EndTimeField], Source.[EndTimeField]) IS NOT NULL OR 
	NULLIF(Source.[DurationField], Target.[DurationField]) IS NOT NULL OR NULLIF(Target.[DurationField], Source.[DurationField]) IS NOT NULL OR 
	NULLIF(Source.[ColorField], Target.[ColorField]) IS NOT NULL OR NULLIF(Target.[ColorField], Source.[ColorField]) IS NOT NULL OR 
	NULLIF(Source.[DescripTemplate], Target.[DescripTemplate]) IS NOT NULL OR NULLIF(Target.[DescripTemplate], Source.[DescripTemplate]) IS NOT NULL OR 
	NULLIF(Source.[UserIdField], Target.[UserIdField]) IS NOT NULL OR NULLIF(Target.[UserIdField], Source.[UserIdField]) IS NOT NULL OR 
	NULLIF(Source.[TextColorField], Target.[TextColorField]) IS NOT NULL OR NULLIF(Target.[TextColorField], Source.[TextColorField]) IS NOT NULL OR 
	NULLIF(Source.[AllDayField], Target.[AllDayField]) IS NOT NULL OR NULLIF(Target.[AllDayField], Source.[AllDayField]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [ViewName] = Source.[ViewName], 
  [StartDateField] = Source.[StartDateField], 
  [EndDateField] = Source.[EndDateField], 
  [StartTimeField] = Source.[StartTimeField], 
  [EndTimeField] = Source.[EndTimeField], 
  [DurationField] = Source.[DurationField], 
  [ColorField] = Source.[ColorField], 
  [DescripTemplate] = Source.[DescripTemplate], 
  [UserIdField] = Source.[UserIdField], 
  [TextColorField] = Source.[TextColorField], 
  [AllDayField] = Source.[AllDayField], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([SchedulerName],[ObjectName],[ViewName],[StartDateField],[EndDateField],[StartTimeField],[EndTimeField],[DurationField],[ColorField],[DescripTemplate],[UserIdField],[TextColorField],[AllDayField],[OriginId])
 VALUES(Source.[SchedulerName],Source.[ObjectName],Source.[ViewName],Source.[StartDateField],Source.[EndDateField],Source.[StartTimeField],Source.[EndTimeField],Source.[DurationField],Source.[ColorField],Source.[DescripTemplate],Source.[UserIdField],Source.[TextColorField],Source.[AllDayField],Source.[OriginId])
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





