

BEGIN TRY

MERGE INTO [WebAPI_Processes] AS Target
USING (VALUES
  (N'GetAppConfig',1,2)
 ,(N'GetAPPFileResource',1,2)
 ,(N'RegisterToken',1,2)
 ,(N'SyncData',1,2)
 ,(N'sysOfflineSendTable',1,2)
) AS Source ([ProcessName],[CanView],[OriginId])
ON (Target.[ProcessName] = Source.[ProcessName])
WHEN MATCHED AND (
	NULLIF(Source.[CanView], Target.[CanView]) IS NOT NULL OR NULLIF(Target.[CanView], Source.[CanView]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [CanView] = Source.[CanView], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([ProcessName],[CanView],[OriginId])
 VALUES(Source.[ProcessName],Source.[CanView],Source.[OriginId])
WHEN NOT MATCHED BY SOURCE AND TARGET.OriginId = 2 THEN 
 DELETE
;
END TRY
BEGIN CATCH
    DECLARE @ERRORNUMBER	INT,@ERRORMSG		VARCHAR(MAX),@ERRORSTATE		INT
    SELECT @ERRORNUMBER = 50000 + ERROR_NUMBER(),@ERRORMSG = ERROR_MESSAGE(), @ERRORSTATE = ERROR_STATE();
    THROW @ERRORNUMBER, @ERRORMSG, @ERRORSTATE
END CATCH
GO





