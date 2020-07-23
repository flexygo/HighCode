

BEGIN TRY

MERGE INTO [Action_Types] AS Target
USING (VALUES
  (N'EMAIL',N'Email',N'flx-icon icon-email')
 ,(N'ICALL',N'Incoming call',N'flx-icon icon-phone')
 ,(N'OCALL',N'Outgoing call',N'flx-icon icon-phone-2')
 ,(N'SALE',N'Sale',N'flx-icon icon-money')
 ,(N'OTHER',N'Other',N'flx-icon icon-accounting-operations')
) AS Source ([ActionType],[Descrip],[CssClass])
ON (Target.[ActionType] = Source.[ActionType])
WHEN MATCHED AND (
	NULLIF(Source.[Descrip], Target.[Descrip]) IS NOT NULL OR NULLIF(Target.[Descrip], Source.[Descrip]) IS NOT NULL OR 
	NULLIF(Source.[CssClass], Target.[CssClass]) IS NOT NULL OR NULLIF(Target.[CssClass], Source.[CssClass]) IS NOT NULL) THEN
 UPDATE SET
  [Descrip] = Source.[Descrip], 
  [CssClass] = Source.[CssClass]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([ActionType],[Descrip],[CssClass])
 VALUES(Source.[ActionType],Source.[Descrip],Source.[CssClass])
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





