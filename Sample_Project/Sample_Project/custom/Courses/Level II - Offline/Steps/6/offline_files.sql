

BEGIN TRY

MERGE INTO [Offline_Files] AS Target
USING (VALUES
  (N'portada_learningapp_1.jpg',N'LearningApp',N'~\custom\LearningApp\portada_learningapp_1.jpg','2020-07-22T13:22:00',1,2)
) AS Source ([FileName],[AppName],[FilePath],[FileDate],[Enabled],[OriginID])
ON (Target.[FileName] = Source.[FileName])
WHEN MATCHED AND (
	NULLIF(Source.[AppName], Target.[AppName]) IS NOT NULL OR NULLIF(Target.[AppName], Source.[AppName]) IS NOT NULL OR 
	NULLIF(Source.[FilePath], Target.[FilePath]) IS NOT NULL OR NULLIF(Target.[FilePath], Source.[FilePath]) IS NOT NULL OR 
	NULLIF(Source.[FileDate], Target.[FileDate]) IS NOT NULL OR NULLIF(Target.[FileDate], Source.[FileDate]) IS NOT NULL OR 
	NULLIF(Source.[Enabled], Target.[Enabled]) IS NOT NULL OR NULLIF(Target.[Enabled], Source.[Enabled]) IS NOT NULL OR 
	NULLIF(Source.[OriginID], Target.[OriginID]) IS NOT NULL OR NULLIF(Target.[OriginID], Source.[OriginID]) IS NOT NULL) THEN
 UPDATE SET
  [AppName] = Source.[AppName], 
  [FilePath] = Source.[FilePath], 
  [FileDate] = Source.[FileDate], 
  [Enabled] = Source.[Enabled], 
  [OriginID] = Source.[OriginID]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([FileName],[AppName],[FilePath],[FileDate],[Enabled],[OriginID])
 VALUES(Source.[FileName],Source.[AppName],Source.[FilePath],Source.[FileDate],Source.[Enabled],Source.[OriginID])
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





