

BEGIN TRY

MERGE INTO [Tests] AS Target
USING (VALUES
  (N'9bb83c6e-d508-4b08-b818-b555e90afb26',N'Unit Test',N'~/custom/dll/Sample_Project_UnitTest.dll',N'ExcludeClient',1)
) AS Source ([TestId],[Title],[Path],[ExcludeCategories],[OriginId])
ON (Target.[TestId] = Source.[TestId])
WHEN MATCHED AND (
	NULLIF(Source.[Title], Target.[Title]) IS NOT NULL OR NULLIF(Target.[Title], Source.[Title]) IS NOT NULL OR 
	NULLIF(Source.[Path], Target.[Path]) IS NOT NULL OR NULLIF(Target.[Path], Source.[Path]) IS NOT NULL OR 
	NULLIF(Source.[ExcludeCategories], Target.[ExcludeCategories]) IS NOT NULL OR NULLIF(Target.[ExcludeCategories], Source.[ExcludeCategories]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [Title] = Source.[Title], 
  [Path] = Source.[Path], 
  [ExcludeCategories] = Source.[ExcludeCategories], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([TestId],[Title],[Path],[ExcludeCategories],[OriginId])
 VALUES(Source.[TestId],Source.[Title],Source.[Path],Source.[ExcludeCategories],Source.[OriginId])
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





