

BEGIN TRY

MERGE INTO [Offline_Apps] AS Target
USING (VALUES
  (N'LearningApp',N'Learning app',N'Learning app',N'app',NULL,NULL,NULL,1,2)
) AS Source ([AppName],[Title],[Descrip],[IconName],[APKUrl],[APKWebService],[SyncDataProcessName],[Active],[OriginId])
ON (Target.[AppName] = Source.[AppName])
WHEN MATCHED AND (
	NULLIF(Source.[Title], Target.[Title]) IS NOT NULL OR NULLIF(Target.[Title], Source.[Title]) IS NOT NULL OR 
	NULLIF(Source.[Descrip], Target.[Descrip]) IS NOT NULL OR NULLIF(Target.[Descrip], Source.[Descrip]) IS NOT NULL OR 
	NULLIF(Source.[IconName], Target.[IconName]) IS NOT NULL OR NULLIF(Target.[IconName], Source.[IconName]) IS NOT NULL OR 
	NULLIF(Source.[APKUrl], Target.[APKUrl]) IS NOT NULL OR NULLIF(Target.[APKUrl], Source.[APKUrl]) IS NOT NULL OR 
	NULLIF(Source.[APKWebService], Target.[APKWebService]) IS NOT NULL OR NULLIF(Target.[APKWebService], Source.[APKWebService]) IS NOT NULL OR 
	NULLIF(Source.[SyncDataProcessName], Target.[SyncDataProcessName]) IS NOT NULL OR NULLIF(Target.[SyncDataProcessName], Source.[SyncDataProcessName]) IS NOT NULL OR 
	NULLIF(Source.[Active], Target.[Active]) IS NOT NULL OR NULLIF(Target.[Active], Source.[Active]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [Title] = Source.[Title], 
  [Descrip] = Source.[Descrip], 
  [IconName] = Source.[IconName], 
  [APKUrl] = Source.[APKUrl], 
  [APKWebService] = Source.[APKWebService], 
  [SyncDataProcessName] = Source.[SyncDataProcessName], 
  [Active] = Source.[Active], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([AppName],[Title],[Descrip],[IconName],[APKUrl],[APKWebService],[SyncDataProcessName],[Active],[OriginId])
 VALUES(Source.[AppName],Source.[Title],Source.[Descrip],Source.[IconName],Source.[APKUrl],Source.[APKWebService],Source.[SyncDataProcessName],Source.[Active],Source.[OriginId])
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





