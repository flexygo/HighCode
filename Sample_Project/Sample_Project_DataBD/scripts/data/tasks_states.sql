

BEGIN TRY

SET IDENTITY_INSERT [Tasks_States] ON

MERGE INTO [Tasks_States] AS Target
USING (VALUES
  (1,N'To Do')
 ,(2,N'In Progress')
 ,(3,N'Done')
 ,(4,N'Archived')
) AS Source ([IdState],[Description])
ON (Target.[IdState] = Source.[IdState])
WHEN MATCHED AND (
	NULLIF(Source.[Description], Target.[Description]) IS NOT NULL OR NULLIF(Target.[Description], Source.[Description]) IS NOT NULL) THEN
 UPDATE SET
  [Description] = Source.[Description]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([IdState],[Description])
 VALUES(Source.[IdState],Source.[Description])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
END TRY
BEGIN CATCH
    DECLARE @ERRORNUMBER	INT,@ERRORMSG		VARCHAR(MAX),@ERRORSTATE		INT
    SELECT @ERRORNUMBER = 50000 + ERROR_NUMBER(),@ERRORMSG = ERROR_MESSAGE(), @ERRORSTATE = ERROR_STATE();
    THROW @ERRORNUMBER, @ERRORMSG, @ERRORSTATE
END CATCH
GO

SET IDENTITY_INSERT [Tasks_States] OFF
GO




