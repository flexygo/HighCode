BEGIN TRY

MERGE INTO [employee] AS Target
USING (VALUES
  (0,N'Daniel Lutz',N'+34 600 00 17',N'daniel@flexygo.es',N'~/Custom/images/Employees/dani.png',NULL,1,0)
 ,(1,N'David Miralpeix',N'+34 600 00 11',N'david@flexygo.es',N'~/Custom/images/Employees/david.png',NULL,1,0)
 ,(2,N'Rubén Pardo',N'+34 600 00 12',N'ruben@flexygo.es',N'~/Custom/images/Employees/ruben.png',NULL,1,0)
 ,(3,N'Sergio Vera',N'+34 600 00 13',N'sergio@flexygo.es',N'~/Custom/images/Employees/sergio.png',NULL,1,0)
 ,(4,N'Aitor Torres',N'+34 600 00 14',N'aitor@flexygo.es',N'~/Custom/images/Employees/Aitor.png',NULL,1,0)
 ,(5,N'Cristina Gomez',N'+34 600 00 15',N'cristina@flexygo.es',N'~/Custom/images/Employees/cristina.png',NULL,1,0)
 ,(6,N'Carmen Martin',N'+34 600 00 16',N'carmen@flexygo.es',N'~/Custom/images/Employees/carmen.png',NULL,NULL,0)
 ,(7,N'Alberto Criado',N'+34 600 00 10',N'alberto@flexygo.es',N'~/Custom/images/Employees/alberto.png',NULL,1,0)
) AS Source ([IdEmployee],[Name],[Tel],[Email],[Image],[Signature],[IdTeam],[SendNotices])
ON (Target.[IdEmployee] = Source.[IdEmployee])
WHEN MATCHED AND (
	NULLIF(Source.[Name], Target.[Name]) IS NOT NULL OR NULLIF(Target.[Name], Source.[Name]) IS NOT NULL OR 
	NULLIF(Source.[Tel], Target.[Tel]) IS NOT NULL OR NULLIF(Target.[Tel], Source.[Tel]) IS NOT NULL OR 
	NULLIF(Source.[Email], Target.[Email]) IS NOT NULL OR NULLIF(Target.[Email], Source.[Email]) IS NOT NULL OR 
	NULLIF(Source.[Image], Target.[Image]) IS NOT NULL OR NULLIF(Target.[Image], Source.[Image]) IS NOT NULL OR 
	NULLIF(Source.[Signature], Target.[Signature]) IS NOT NULL OR NULLIF(Target.[Signature], Source.[Signature]) IS NOT NULL OR 
	NULLIF(Source.[IdTeam], Target.[IdTeam]) IS NOT NULL OR NULLIF(Target.[IdTeam], Source.[IdTeam]) IS NOT NULL OR 
	NULLIF(Source.[SendNotices], Target.[SendNotices]) IS NOT NULL OR NULLIF(Target.[SendNotices], Source.[SendNotices]) IS NOT NULL) THEN
 UPDATE SET
  [Name] = Source.[Name], 
  [Tel] = Source.[Tel], 
  [Email] = Source.[Email], 
  [Image] = Source.[Image], 
  [Signature] = Source.[Signature], 
  [IdTeam] = Source.[IdTeam], 
  [SendNotices] = Source.[SendNotices]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([IdEmployee],[Name],[Tel],[Email],[Image],[Signature],[IdTeam],[SendNotices])
 VALUES(Source.[IdEmployee],Source.[Name],Source.[Tel],Source.[Email],Source.[Image],Source.[Signature],Source.[IdTeam],Source.[SendNotices])
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
