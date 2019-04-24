

BEGIN TRY

MERGE INTO [Action_States] AS Target
USING (VALUES
  (0,N'Backlog',N'txt-primary')
 ,(1,N'To do',N'txt-outstanding')
 ,(2,N'In progress',N'txt-info')
 ,(3,N'Finish',N'txt-success')
 ,(4,N'Archived',N'txt-tools')
) AS Source ([State],[Descrip],[CssClass])
ON (Target.[State] = Source.[State])
WHEN MATCHED AND (
	NULLIF(Source.[Descrip], Target.[Descrip]) IS NOT NULL OR NULLIF(Target.[Descrip], Source.[Descrip]) IS NOT NULL OR 
	NULLIF(Source.[CssClass], Target.[CssClass]) IS NOT NULL OR NULLIF(Target.[CssClass], Source.[CssClass]) IS NOT NULL) THEN
 UPDATE SET
  [Descrip] = Source.[Descrip], 
  [CssClass] = Source.[CssClass]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([State],[Descrip],[CssClass])
 VALUES(Source.[State],Source.[Descrip],Source.[CssClass])
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





