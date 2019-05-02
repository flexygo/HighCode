

BEGIN TRY

MERGE INTO [Scheduler] AS Target
USING (VALUES
  (N'Calendario_acciones',N'agendaDay',1,1,1,1,N'IdEmployee',N'Name',NULL,N'<p>
	<img style="width:20px" src="{{image|url}}"/>    
    {{Name}} 
</p>

',N'Employee',N'Vista_calendario',N'08:00',N'18:00',1,0,N'00:15',N'currentReference',N'edit',N'modal640x480',NULL,NULL,NULL,1)
 ,(N'Calendario_ventas',N'agendaDay',1,1,1,1,N'IdClient',N'Name',NULL,N'<p>
	<img style="width:20px" src="{{image|url}}"/>    
    {{Name}} 
</p>

',N'Cliente',N'Cliente_calendar',N'08:00',N'18:00',1,0,N'00:15',NULL,N'edit',N'modal640x480',NULL,NULL,NULL,1)
 ,(N'Scheduler',N'agendaWeek',0,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL,N'currentUserId',N'edit',N'modal1024x768',NULL,NULL,NULL,1)
) AS Source ([SchedulerName],[ActiveMode],[MonthView],[AgendaWeekView],[AgendaDayView],[ListWeekView],[SQLValueField],[SQLDisplayField],[SQLFilterField],[DirectTemplate],[ObjectName],[ViewName],[MinTime],[MaxTime],[OnClickEvent],[AllDaySlot],[SlotDuration],[TokenDefault],[EventPageTypeId],[EventTargetId],[HolidaysObjectName],[HolidaysViewName],[DateHolidayField],[OriginId])
ON (Target.[SchedulerName] = Source.[SchedulerName])
WHEN MATCHED AND (
	NULLIF(Source.[ActiveMode], Target.[ActiveMode]) IS NOT NULL OR NULLIF(Target.[ActiveMode], Source.[ActiveMode]) IS NOT NULL OR 
	NULLIF(Source.[MonthView], Target.[MonthView]) IS NOT NULL OR NULLIF(Target.[MonthView], Source.[MonthView]) IS NOT NULL OR 
	NULLIF(Source.[AgendaWeekView], Target.[AgendaWeekView]) IS NOT NULL OR NULLIF(Target.[AgendaWeekView], Source.[AgendaWeekView]) IS NOT NULL OR 
	NULLIF(Source.[AgendaDayView], Target.[AgendaDayView]) IS NOT NULL OR NULLIF(Target.[AgendaDayView], Source.[AgendaDayView]) IS NOT NULL OR 
	NULLIF(Source.[ListWeekView], Target.[ListWeekView]) IS NOT NULL OR NULLIF(Target.[ListWeekView], Source.[ListWeekView]) IS NOT NULL OR 
	NULLIF(Source.[SQLValueField], Target.[SQLValueField]) IS NOT NULL OR NULLIF(Target.[SQLValueField], Source.[SQLValueField]) IS NOT NULL OR 
	NULLIF(Source.[SQLDisplayField], Target.[SQLDisplayField]) IS NOT NULL OR NULLIF(Target.[SQLDisplayField], Source.[SQLDisplayField]) IS NOT NULL OR 
	NULLIF(Source.[SQLFilterField], Target.[SQLFilterField]) IS NOT NULL OR NULLIF(Target.[SQLFilterField], Source.[SQLFilterField]) IS NOT NULL OR 
	NULLIF(Source.[DirectTemplate], Target.[DirectTemplate]) IS NOT NULL OR NULLIF(Target.[DirectTemplate], Source.[DirectTemplate]) IS NOT NULL OR 
	NULLIF(Source.[ObjectName], Target.[ObjectName]) IS NOT NULL OR NULLIF(Target.[ObjectName], Source.[ObjectName]) IS NOT NULL OR 
	NULLIF(Source.[ViewName], Target.[ViewName]) IS NOT NULL OR NULLIF(Target.[ViewName], Source.[ViewName]) IS NOT NULL OR 
	NULLIF(Source.[MinTime], Target.[MinTime]) IS NOT NULL OR NULLIF(Target.[MinTime], Source.[MinTime]) IS NOT NULL OR 
	NULLIF(Source.[MaxTime], Target.[MaxTime]) IS NOT NULL OR NULLIF(Target.[MaxTime], Source.[MaxTime]) IS NOT NULL OR 
	NULLIF(Source.[OnClickEvent], Target.[OnClickEvent]) IS NOT NULL OR NULLIF(Target.[OnClickEvent], Source.[OnClickEvent]) IS NOT NULL OR 
	NULLIF(Source.[AllDaySlot], Target.[AllDaySlot]) IS NOT NULL OR NULLIF(Target.[AllDaySlot], Source.[AllDaySlot]) IS NOT NULL OR 
	NULLIF(Source.[SlotDuration], Target.[SlotDuration]) IS NOT NULL OR NULLIF(Target.[SlotDuration], Source.[SlotDuration]) IS NOT NULL OR 
	NULLIF(Source.[TokenDefault], Target.[TokenDefault]) IS NOT NULL OR NULLIF(Target.[TokenDefault], Source.[TokenDefault]) IS NOT NULL OR 
	NULLIF(Source.[EventPageTypeId], Target.[EventPageTypeId]) IS NOT NULL OR NULLIF(Target.[EventPageTypeId], Source.[EventPageTypeId]) IS NOT NULL OR 
	NULLIF(Source.[EventTargetId], Target.[EventTargetId]) IS NOT NULL OR NULLIF(Target.[EventTargetId], Source.[EventTargetId]) IS NOT NULL OR 
	NULLIF(Source.[HolidaysObjectName], Target.[HolidaysObjectName]) IS NOT NULL OR NULLIF(Target.[HolidaysObjectName], Source.[HolidaysObjectName]) IS NOT NULL OR 
	NULLIF(Source.[HolidaysViewName], Target.[HolidaysViewName]) IS NOT NULL OR NULLIF(Target.[HolidaysViewName], Source.[HolidaysViewName]) IS NOT NULL OR 
	NULLIF(Source.[DateHolidayField], Target.[DateHolidayField]) IS NOT NULL OR NULLIF(Target.[DateHolidayField], Source.[DateHolidayField]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [ActiveMode] = Source.[ActiveMode], 
  [MonthView] = Source.[MonthView], 
  [AgendaWeekView] = Source.[AgendaWeekView], 
  [AgendaDayView] = Source.[AgendaDayView], 
  [ListWeekView] = Source.[ListWeekView], 
  [SQLValueField] = Source.[SQLValueField], 
  [SQLDisplayField] = Source.[SQLDisplayField], 
  [SQLFilterField] = Source.[SQLFilterField], 
  [DirectTemplate] = Source.[DirectTemplate], 
  [ObjectName] = Source.[ObjectName], 
  [ViewName] = Source.[ViewName], 
  [MinTime] = Source.[MinTime], 
  [MaxTime] = Source.[MaxTime], 
  [OnClickEvent] = Source.[OnClickEvent], 
  [AllDaySlot] = Source.[AllDaySlot], 
  [SlotDuration] = Source.[SlotDuration], 
  [TokenDefault] = Source.[TokenDefault], 
  [EventPageTypeId] = Source.[EventPageTypeId], 
  [EventTargetId] = Source.[EventTargetId], 
  [HolidaysObjectName] = Source.[HolidaysObjectName], 
  [HolidaysViewName] = Source.[HolidaysViewName], 
  [DateHolidayField] = Source.[DateHolidayField], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([SchedulerName],[ActiveMode],[MonthView],[AgendaWeekView],[AgendaDayView],[ListWeekView],[SQLValueField],[SQLDisplayField],[SQLFilterField],[DirectTemplate],[ObjectName],[ViewName],[MinTime],[MaxTime],[OnClickEvent],[AllDaySlot],[SlotDuration],[TokenDefault],[EventPageTypeId],[EventTargetId],[HolidaysObjectName],[HolidaysViewName],[DateHolidayField],[OriginId])
 VALUES(Source.[SchedulerName],Source.[ActiveMode],Source.[MonthView],Source.[AgendaWeekView],Source.[AgendaDayView],Source.[ListWeekView],Source.[SQLValueField],Source.[SQLDisplayField],Source.[SQLFilterField],Source.[DirectTemplate],Source.[ObjectName],Source.[ViewName],Source.[MinTime],Source.[MaxTime],Source.[OnClickEvent],Source.[AllDaySlot],Source.[SlotDuration],Source.[TokenDefault],Source.[EventPageTypeId],Source.[EventTargetId],Source.[HolidaysObjectName],Source.[HolidaysViewName],Source.[DateHolidayField],Source.[OriginId])
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





