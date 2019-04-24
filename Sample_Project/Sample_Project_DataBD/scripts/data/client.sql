

BEGIN TRY

SET IDENTITY_INSERT [Client] ON

MERGE INTO [Client] AS Target
USING (VALUES
  (1,N'FlexyGO',N'01977542W',N'+34 600 00 00',N'info@flexygo.es',N'C/ Ceramistes, 19',N'Alboraia',N'Valencia',N'46120',N'ES',1,2,N'~/custom/images/Client/trunmp1.png',N'xdftddxgddxg','2019-03-14T00:00:00',0,0,'2019-02-13T12:33:00')
 ,(2,N'Imagination',NULL,N'+33 700 00 01',N'info@imagination.es',N'30 Rue de la Libertév',N'Carcassonne',N'Carcassonne',N'11000',N'FR',3,1,N'~/custom/images/Client/punchout.png',NULL,NULL,0,0,'2019-02-12T15:59:00')
 ,(4,N'Ahora Freeware',N'05664709Q',N'+34 601 601 601',N'info@freeware.es',N'Calle Amatista',N'Getafe',N'Madrid',N'28905',N'ES',1,2,N'~/custom/images/Client/punchout_1.png',N'xq si fafaf','2019-02-13T00:00:00',0,0,'2019-04-23T10:29:00')
 ,(5,N'LETRA PEQUEÑA SL',N'A0000000',N'669 001 001',N'info@LetraP.com',N'Paseo de la Habana 9-11',N'MADRID',N'MADRID',N'47092',N'ES',1,1,N'~/custom/images/Client/Daniel-Lutz-(2017 recorte).png',NULL,NULL,0,NULL,NULL)
 ,(6,N'RESOL GRUPO',N'A000000',N'972 000 000',N'resol@resol.es',N'Ctra. Alcañiz',N'teruel',N'TERUEL',N'44003',N'ES',1,1,N'~/custom/images/Client/punchout_2.png',N'1','2019-02-13T00:00:00',1,0,'2019-02-13T17:45:00')
 ,(7,N'CATMAR NAUTICS SL',N'A00000000',N'972 600 600',N'catmar@catmarsn.es',N'Port Balis Local place 3',N'SANT ANDREU DE LLAVANERES',N'BARCELONA',N'08392',N'ES',1,1,N'~/custom/images/Client/cacum.png',NULL,NULL,0,NULL,NULL)
 ,(8,N'FIHOCA',N'AXXXXXX',N'932 222 222',N'fihoca@fihoca.com',N'Carrer de la Diputació, 237 ',N'BARCELONA',N'BARCELONA',N'00011',N'ES',1,1,N'~/custom/images/Client/punchout_3.png',NULL,NULL,0,NULL,NULL)
 ,(9,N'EspacioDeInformatica',N'A0000000',N'902 000 111',N'espacio@info.es',N'C/San Francisco, 21 - 1ª Planta -Local C',N'TALAVERA DE LA REINA',N'TOLEDO',N'45600',N'ES',1,1,N'~/custom/images/Client/punchout_4.png',NULL,NULL,0,NULL,NULL)
 ,(10,N'DOMHE',N'A000000',N'965 50 50 50',N'domhe@info.es',N'C/San Salvador, 34',N'MURO DE ALCOY',N'ALICANTE',N'03830',N'ES',1,1,N'~/custom/images/Client/vidal.png',NULL,NULL,0,0,NULL)
 ,(12,N'Servicios EUSEBIO, SL',N'A000000',N'+34 618 300 600',N'eusebiorg@construcciones.es',N'La Malata, 78',N'FERROL',N'A CORUÑA',N'15315',N'ES',1,1,N'~/custom/images/Client/Daniel-Lutz2.png',NULL,NULL,0,NULL,NULL)
) AS Source ([IdClient],[Name],[NIF],[Phone],[Mail],[Address],[City],[Province],[Postcode],[IdCountry],[IdType],[IdState],[Image],[BlockReason],[BlockDate],[IdEmployee],[Mailing],[LastModif])
ON (Target.[IdClient] = Source.[IdClient])
WHEN MATCHED AND (
	NULLIF(Source.[Name], Target.[Name]) IS NOT NULL OR NULLIF(Target.[Name], Source.[Name]) IS NOT NULL OR 
	NULLIF(Source.[NIF], Target.[NIF]) IS NOT NULL OR NULLIF(Target.[NIF], Source.[NIF]) IS NOT NULL OR 
	NULLIF(Source.[Phone], Target.[Phone]) IS NOT NULL OR NULLIF(Target.[Phone], Source.[Phone]) IS NOT NULL OR 
	NULLIF(Source.[Mail], Target.[Mail]) IS NOT NULL OR NULLIF(Target.[Mail], Source.[Mail]) IS NOT NULL OR 
	NULLIF(Source.[Address], Target.[Address]) IS NOT NULL OR NULLIF(Target.[Address], Source.[Address]) IS NOT NULL OR 
	NULLIF(Source.[City], Target.[City]) IS NOT NULL OR NULLIF(Target.[City], Source.[City]) IS NOT NULL OR 
	NULLIF(Source.[Province], Target.[Province]) IS NOT NULL OR NULLIF(Target.[Province], Source.[Province]) IS NOT NULL OR 
	NULLIF(Source.[Postcode], Target.[Postcode]) IS NOT NULL OR NULLIF(Target.[Postcode], Source.[Postcode]) IS NOT NULL OR 
	NULLIF(Source.[IdCountry], Target.[IdCountry]) IS NOT NULL OR NULLIF(Target.[IdCountry], Source.[IdCountry]) IS NOT NULL OR 
	NULLIF(Source.[IdType], Target.[IdType]) IS NOT NULL OR NULLIF(Target.[IdType], Source.[IdType]) IS NOT NULL OR 
	NULLIF(Source.[IdState], Target.[IdState]) IS NOT NULL OR NULLIF(Target.[IdState], Source.[IdState]) IS NOT NULL OR 
	NULLIF(Source.[Image], Target.[Image]) IS NOT NULL OR NULLIF(Target.[Image], Source.[Image]) IS NOT NULL OR 
	NULLIF(Source.[BlockReason], Target.[BlockReason]) IS NOT NULL OR NULLIF(Target.[BlockReason], Source.[BlockReason]) IS NOT NULL OR 
	NULLIF(Source.[BlockDate], Target.[BlockDate]) IS NOT NULL OR NULLIF(Target.[BlockDate], Source.[BlockDate]) IS NOT NULL OR 
	NULLIF(Source.[IdEmployee], Target.[IdEmployee]) IS NOT NULL OR NULLIF(Target.[IdEmployee], Source.[IdEmployee]) IS NOT NULL OR 
	NULLIF(Source.[Mailing], Target.[Mailing]) IS NOT NULL OR NULLIF(Target.[Mailing], Source.[Mailing]) IS NOT NULL OR 
	NULLIF(Source.[LastModif], Target.[LastModif]) IS NOT NULL OR NULLIF(Target.[LastModif], Source.[LastModif]) IS NOT NULL) THEN
 UPDATE SET
  [Name] = Source.[Name], 
  [NIF] = Source.[NIF], 
  [Phone] = Source.[Phone], 
  [Mail] = Source.[Mail], 
  [Address] = Source.[Address], 
  [City] = Source.[City], 
  [Province] = Source.[Province], 
  [Postcode] = Source.[Postcode], 
  [IdCountry] = Source.[IdCountry], 
  [IdType] = Source.[IdType], 
  [IdState] = Source.[IdState], 
  [Image] = Source.[Image], 
  [BlockReason] = Source.[BlockReason], 
  [BlockDate] = Source.[BlockDate], 
  [IdEmployee] = Source.[IdEmployee], 
  [Mailing] = Source.[Mailing], 
  [LastModif] = Source.[LastModif]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([IdClient],[Name],[NIF],[Phone],[Mail],[Address],[City],[Province],[Postcode],[IdCountry],[IdType],[IdState],[Image],[BlockReason],[BlockDate],[IdEmployee],[Mailing],[LastModif])
 VALUES(Source.[IdClient],Source.[Name],Source.[NIF],Source.[Phone],Source.[Mail],Source.[Address],Source.[City],Source.[Province],Source.[Postcode],Source.[IdCountry],Source.[IdType],Source.[IdState],Source.[Image],Source.[BlockReason],Source.[BlockDate],Source.[IdEmployee],Source.[Mailing],Source.[LastModif])
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

SET IDENTITY_INSERT [Client] OFF
GO




