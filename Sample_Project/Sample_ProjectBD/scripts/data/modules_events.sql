

BEGIN TRY

MERGE INTO [Modules_Events] AS Target
USING (VALUES
  (N'63adca47-a48b-4a7d-b2fb-54ce109129fb',N'Clients_Docs_CountDocuments',N'dialog',N'closed',N'refresh',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1)
) AS Source ([ModuleEventId],[ModuleName],[EventClass],[EventType],[EventAction],[ProcessName],[ObjectFilter],[PropertyFilter],[ProcessFilter],[ModuleFilter],[PageFilter],[MethodFilter],[OriginId])
ON (Target.[ModuleEventId] = Source.[ModuleEventId])
WHEN MATCHED AND (
	NULLIF(Source.[ModuleName], Target.[ModuleName]) IS NOT NULL OR NULLIF(Target.[ModuleName], Source.[ModuleName]) IS NOT NULL OR 
	NULLIF(Source.[EventClass], Target.[EventClass]) IS NOT NULL OR NULLIF(Target.[EventClass], Source.[EventClass]) IS NOT NULL OR 
	NULLIF(Source.[EventType], Target.[EventType]) IS NOT NULL OR NULLIF(Target.[EventType], Source.[EventType]) IS NOT NULL OR 
	NULLIF(Source.[EventAction], Target.[EventAction]) IS NOT NULL OR NULLIF(Target.[EventAction], Source.[EventAction]) IS NOT NULL OR 
	NULLIF(Source.[ProcessName], Target.[ProcessName]) IS NOT NULL OR NULLIF(Target.[ProcessName], Source.[ProcessName]) IS NOT NULL OR 
	NULLIF(Source.[ObjectFilter], Target.[ObjectFilter]) IS NOT NULL OR NULLIF(Target.[ObjectFilter], Source.[ObjectFilter]) IS NOT NULL OR 
	NULLIF(Source.[PropertyFilter], Target.[PropertyFilter]) IS NOT NULL OR NULLIF(Target.[PropertyFilter], Source.[PropertyFilter]) IS NOT NULL OR 
	NULLIF(Source.[ProcessFilter], Target.[ProcessFilter]) IS NOT NULL OR NULLIF(Target.[ProcessFilter], Source.[ProcessFilter]) IS NOT NULL OR 
	NULLIF(Source.[ModuleFilter], Target.[ModuleFilter]) IS NOT NULL OR NULLIF(Target.[ModuleFilter], Source.[ModuleFilter]) IS NOT NULL OR 
	NULLIF(Source.[PageFilter], Target.[PageFilter]) IS NOT NULL OR NULLIF(Target.[PageFilter], Source.[PageFilter]) IS NOT NULL OR 
	NULLIF(Source.[MethodFilter], Target.[MethodFilter]) IS NOT NULL OR NULLIF(Target.[MethodFilter], Source.[MethodFilter]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [ModuleName] = Source.[ModuleName], 
  [EventClass] = Source.[EventClass], 
  [EventType] = Source.[EventType], 
  [EventAction] = Source.[EventAction], 
  [ProcessName] = Source.[ProcessName], 
  [ObjectFilter] = Source.[ObjectFilter], 
  [PropertyFilter] = Source.[PropertyFilter], 
  [ProcessFilter] = Source.[ProcessFilter], 
  [ModuleFilter] = Source.[ModuleFilter], 
  [PageFilter] = Source.[PageFilter], 
  [MethodFilter] = Source.[MethodFilter], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([ModuleEventId],[ModuleName],[EventClass],[EventType],[EventAction],[ProcessName],[ObjectFilter],[PropertyFilter],[ProcessFilter],[ModuleFilter],[PageFilter],[MethodFilter],[OriginId])
 VALUES(Source.[ModuleEventId],Source.[ModuleName],Source.[EventClass],Source.[EventType],Source.[EventAction],Source.[ProcessName],Source.[ObjectFilter],Source.[PropertyFilter],Source.[ProcessFilter],Source.[ModuleFilter],Source.[PageFilter],Source.[MethodFilter],Source.[OriginId])
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





