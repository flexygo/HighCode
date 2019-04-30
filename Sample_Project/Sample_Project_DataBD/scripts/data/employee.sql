

BEGIN TRY

MERGE INTO [Employee] AS Target
USING (VALUES
  (0,N'David Miralpeix',N'0999192257',N'admin@flexy.es',N'~/Custom/images/Employees/david.png',NULL,1)
 ,(1,N'Daniel Lutz',N'696665544',N'dlutz@ahora.es',N'~/Custom/images/Employees/dani.png',NULL,1)
 ,(2,N'Alberto Criado',N'620 620 620',N'alberto@flexygo.es',N'~/Custom/images/Employees/alberto.png',NULL,1)
 ,(3,N'Cristina Gomez',N'+34 600 00 15',N'cristina@flexygo.es',N'~/Custom/images/Employees/cristina.png',NULL,1)
 ,(4,N'Sergio Vera',N'+34 600 00 14',N'sergio@flexygo.es',N'~/Custom/images/Employees/sergio.png',NULL,1)
 ,(5,N'Carmen Martin',N'+34 600 00 10',N'carmen@flexygo.es',N'~/Custom/images/Employees/carmen.png',NULL,NULL)
) AS Source ([IdEmployee],[Name],[Tel],[Email],[Image],[Signature],[IdTeam])
ON (Target.[IdEmployee] = Source.[IdEmployee])
WHEN MATCHED AND (
	NULLIF(Source.[Name], Target.[Name]) IS NOT NULL OR NULLIF(Target.[Name], Source.[Name]) IS NOT NULL OR 
	NULLIF(Source.[Tel], Target.[Tel]) IS NOT NULL OR NULLIF(Target.[Tel], Source.[Tel]) IS NOT NULL OR 
	NULLIF(Source.[Email], Target.[Email]) IS NOT NULL OR NULLIF(Target.[Email], Source.[Email]) IS NOT NULL OR 
	NULLIF(Source.[Image], Target.[Image]) IS NOT NULL OR NULLIF(Target.[Image], Source.[Image]) IS NOT NULL OR 
	NULLIF(Source.[Signature], Target.[Signature]) IS NOT NULL OR NULLIF(Target.[Signature], Source.[Signature]) IS NOT NULL OR 
	NULLIF(Source.[IdTeam], Target.[IdTeam]) IS NOT NULL OR NULLIF(Target.[IdTeam], Source.[IdTeam]) IS NOT NULL) THEN
 UPDATE SET
  [Name] = Source.[Name], 
  [Tel] = Source.[Tel], 
  [Email] = Source.[Email], 
  [Image] = Source.[Image], 
  [Signature] = Source.[Signature], 
  [IdTeam] = Source.[IdTeam]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([IdEmployee],[Name],[Tel],[Email],[Image],[Signature],[IdTeam])
 VALUES(Source.[IdEmployee],Source.[Name],Source.[Tel],Source.[Email],Source.[Image],Source.[Signature],Source.[IdTeam])
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





