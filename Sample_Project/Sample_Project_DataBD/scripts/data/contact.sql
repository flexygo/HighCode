

BEGIN TRY

SET IDENTITY_INSERT [Contact] ON

MERGE INTO [Contact] AS Target
USING (VALUES
  (1,1,N'Paula',N'+34 600 00 13',N'paula@flexygo.es',N'C/ Calle inventada',N'Valencia',N'Valencia',N'46000',N'ES',N'~/custom/images/paula_1.png')
 ,(1,2,N'Cristina',N'+34 600 00 15',N'cristina@flexygo.es',N'C/ Calle inventada ',N'Valencia',N'Valencia',N'46000',N'ES',N'~\custom\images\cris.png')
 ,(1,3,N'Sergio',N'+34 600 00 14',N'sergio@flexygo.es',N'C/ Calle inventada ',N'Valencia',N'Valencia',N'46000',N'ES',N'~/custom/images/sergio_1.png')
 ,(2,4,N'Beatriz',N'+34 600 00 10',N'beaM@imagination.es',N'Una calle de la tierra',N'Una ciudad del mundo',N'Una provincia de Francia',N'50500',N'FR',N'~\custom\images\beaM.png')
 ,(1,27,N'Alberto',N'620 620 620',N'alberto@flexygo.es',N'c/Calle del freeware, 13',N'Madrid',N'Madrid',N'41001',N'ES',N'~\custom\images\alberto.png')
 ,(4,28,N'Patricia',N'610 610 610',N'patricia@free.es',N'c/Calle del freeware 13',N'Madrid',N'Madrid',N'41001',N'ES',N'~\custom\images\patri.png')
 ,(4,29,N'Erika',N'610 000 001',N'erika@free.es',N'c/Calle del freeware 13',N'Madrid',N'Madrid',N'41001',N'ES',N'~\custom\images\erika.png')
 ,(1,32,N'Dani',N'696665544',N'dlutz@flexygo.es',N'C/ Primero de mayo 12',N'Valencia',N'Valencia',N'46017',N'ES',N'~/custom/images/DanielLutz2017 recorte.png')
) AS Source ([IdClient],[IdContact],[Name],[Phone],[Mail],[Address],[City],[Province],[Postcode],[IdCountry],[Image])
ON (Target.[IdContact] = Source.[IdContact])
WHEN MATCHED AND (
	NULLIF(Source.[IdClient], Target.[IdClient]) IS NOT NULL OR NULLIF(Target.[IdClient], Source.[IdClient]) IS NOT NULL OR 
	NULLIF(Source.[Name], Target.[Name]) IS NOT NULL OR NULLIF(Target.[Name], Source.[Name]) IS NOT NULL OR 
	NULLIF(Source.[Phone], Target.[Phone]) IS NOT NULL OR NULLIF(Target.[Phone], Source.[Phone]) IS NOT NULL OR 
	NULLIF(Source.[Mail], Target.[Mail]) IS NOT NULL OR NULLIF(Target.[Mail], Source.[Mail]) IS NOT NULL OR 
	NULLIF(Source.[Address], Target.[Address]) IS NOT NULL OR NULLIF(Target.[Address], Source.[Address]) IS NOT NULL OR 
	NULLIF(Source.[City], Target.[City]) IS NOT NULL OR NULLIF(Target.[City], Source.[City]) IS NOT NULL OR 
	NULLIF(Source.[Province], Target.[Province]) IS NOT NULL OR NULLIF(Target.[Province], Source.[Province]) IS NOT NULL OR 
	NULLIF(Source.[Postcode], Target.[Postcode]) IS NOT NULL OR NULLIF(Target.[Postcode], Source.[Postcode]) IS NOT NULL OR 
	NULLIF(Source.[IdCountry], Target.[IdCountry]) IS NOT NULL OR NULLIF(Target.[IdCountry], Source.[IdCountry]) IS NOT NULL OR 
	NULLIF(Source.[Image], Target.[Image]) IS NOT NULL OR NULLIF(Target.[Image], Source.[Image]) IS NOT NULL) THEN
 UPDATE SET
  [IdClient] = Source.[IdClient], 
  [Name] = Source.[Name], 
  [Phone] = Source.[Phone], 
  [Mail] = Source.[Mail], 
  [Address] = Source.[Address], 
  [City] = Source.[City], 
  [Province] = Source.[Province], 
  [Postcode] = Source.[Postcode], 
  [IdCountry] = Source.[IdCountry], 
  [Image] = Source.[Image]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([IdClient],[IdContact],[Name],[Phone],[Mail],[Address],[City],[Province],[Postcode],[IdCountry],[Image])
 VALUES(Source.[IdClient],Source.[IdContact],Source.[Name],Source.[Phone],Source.[Mail],Source.[Address],Source.[City],Source.[Province],Source.[Postcode],Source.[IdCountry],Source.[Image])
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

SET IDENTITY_INSERT [Contact] OFF
GO




