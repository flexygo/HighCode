

BEGIN TRY

MERGE INTO [Steps] AS Target
USING (VALUES
 (N'Toma de contacto',1,N'',0)
 ,(N'SP 1ª practica',1,N'',1)
 ,(N'SP 2ª practica',1,N'',2)
 ,(N'SP 3ª practica',1,N'',3)
 ,(N'SP 4ª practica',1,N'',4)
 --,(N'SP 5ª practica',1,N'',5)
 ,(N'DLL 1ª practica',1,N'',5)
 ,(N'DLL 2ª practica',1,N'',6)
 ,(N'DLL 3ª practica',1,N'',7)
 ,(N'DLL 4ª practica',1,N'',8)
 ,(N'Offline 1ª practica',2,N'',1)
 ,(N'Offline 2ª practica',2,N'',2)
 ,(N'Offline 3ª practica',2,N'',3)
 ,(N'Offline 4ª practica',2,N'',4)
 ,(N'Offline 5ª practica',2,N'',5)
 ,(N'Offline 6ª practica',2,N'',6)
) AS Source ([StepId],[CourseId],[Descrip],[Order])
ON (Target.[StepId] = Source.[StepId] AND Target.[CourseId] = Source.[CourseId])
WHEN MATCHED AND (
	NULLIF(Source.[Descrip], Target.[Descrip]) IS NOT NULL OR NULLIF(Target.[Descrip], Source.[Descrip]) IS NOT NULL OR 
	NULLIF(Source.[Order], Target.[Order]) IS NOT NULL OR NULLIF(Target.[Order], Source.[Order]) IS NOT NULL) THEN
 UPDATE SET
  [Descrip] = Source.[Descrip], 
  [Order] = Source.[Order]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([StepId],[CourseId],[Descrip],[Order])
 VALUES(Source.[StepId],Source.[CourseId],Source.[Descrip],Source.[Order])
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





