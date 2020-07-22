CREATE PROCEDURE  [dbo].[flxoff_learning_v1]
@JSONVALUE nvarchar(max),
@JSONImages nvarchar(max) OUTPUT,
@JSONDocuments nvarchar(max) OUTPUT,
@CurrentReference nvarchar (100)
AS

----------------------------------------------------------------------------------
--#NAME
--		flxoff_learning_v1
--#CREATION
-- 		15/07/2020
--#CLASIFICATION
-- 		Sample_Project/Offline
--#DESCRIPTION
-- 		Used for client synchronization data
--#PARAMETERS
-- 		@JSONVALUE : Offline Objects properties	,
--		@JSONImages: Offline Objects images,
--		@JSONDocuments : Offline Objects documents
--		@CurrentReference : current reference of user
--#OBSERVATIONS
--
--#CHANGES
-- 		15/07/2020 - Daniel Lutz
----------------------------------------------------------------------------------
BEGIN
BEGIN TRAN
BEGIN TRY

SET @CurrentReference = case when @CurrentReference=0 then 1 else @CurrentReference end

--TABLA CLIENTES
DECLARE @Client TABLE (
	[IdClient] [int] NOT NULL PRIMARY KEY,
	[IdClientNew] [int] NULL,
	[Name] [varchar](50) NOT NULL,
	[NIF] [varchar](50) NULL,
	[Phone] [varchar](20) NULL,
	[Mail] [varchar](1000) NULL,
	[Address] [varchar](max) NULL,
	[City] [varchar](50) NULL,
	[Province] [varchar](50) NULL,
	[Postcode] [varchar](50) NULL,
	[IdCountry] [nvarchar](2) NULL,
	[IdType] [int] NULL,
	[IdState] [int] NULL,
	[Image] [varchar](1000) NULL,
	[BlockReason] [varchar](250) NULL,
	[BlockDate] [smalldatetime] NULL,
	[IdEmployee] [int] NULL,
	[Mailing] [bit] NULL,
	[LastModif] [smalldatetime] NULL,
	_isInserted bit NULL,
	_isUpdated bit NULL,
	_isDeleted bit NULL,
	_rowguid varchar(50)
)
INSERT INTO @Client (IdClient,IdClientNew, Name, Phone, Mail, Address, Province, Postcode, _isInserted, _isUpdated, _isDeleted, _rowguid)
SELECT IdClient,IdClient, Name, Phone, Mail, Address, Province, Postcode, _isInserted, _isUpdated, _isDeleted, _rowguid 
FROM OPENJSON(@JSONVALUE,'$.Client')
WITH ( 
	IdClient int '$.IdClient',
	Name nvarchar(50) '$.Name',
	Phone nvarchar(50) '$.Phone',
	Mail nvarchar(50) '$.Mail',
	Address nvarchar(max) '$.Address',
	Province nvarchar(50) '$.Province',
	Postcode nvarchar(50) '$.Postcode',
	_isInserted bit '$._isInserted',
	_isUpdated bit '$._isUpdated',
	_isDeleted bit '$._isDeleted',
	_rowguid VARCHAR(50) '$._rowguid')
	
--TABLA IMAGENES
IF NOT ISNULL(@JSONImages,'')='' BEGIN
Declare @flxImages table (ImageId nvarchar(max),ObjectName nvarchar(max),ObjectId nvarchar(max),ObjectGUID nvarchar(max),Name nvarchar(max),Descrip nvarchar(max),ImageClassId nvarchar(max),MainImage bit,OrderNumber int,Url nvarchar(max),B64 nvarchar(max),_isInserted bit,_isUpdated bit,_isDeleted bit)
Insert into @flxImages (ImageId,ObjectName,ObjectId,ObjectGUID,Name,Descrip,ImageClassId,MainImage,OrderNumber,Url,B64,_isInserted,_isUpdated,_isDeleted)
select ImageId,ObjectName,ObjectId,ObjectGUID,Name,Descrip,ImageClassId,MainImage,OrderNumber,Url,B64,_isInserted,_isUpdated,_isDeleted from 
OPENJSON(@JSONImages,'$.flxImages') 
WITH ( 
	ImageId nvarchar(max) '$.ImageId',
	ObjectName nvarchar(max) '$.ObjectName',
	ObjectId nvarchar(max) '$.ObjectId',
	ObjectGUID nvarchar(max) '$.ObjectGUID',
	Name nvarchar(max) '$.Name',
	Descrip nvarchar(max) '$.Descrip',
	ImageClassId nvarchar(max) '$.ImageClassId',
	MainImage bit '$.MainImage',
	OrderNumber int '$.OrderNumber',
	Url nvarchar(max) '$.Url',
	B64 nvarchar(max) '$.B64',
	_isInserted bit '$._isInserted',
	_isUpdated bit '$._isUpdated',
	_isDeleted bit '$._isDeleted')
END

--TABLA DOCUMENTOS
DECLARE @flxDocuments TABLE (DocGuid nvarchar(1000), ObjectName nvarchar(1000), ObjectId nvarchar(1000), ObjectGUID nvarchar(1000), [Name] nvarchar(1000), [Description] nvarchar(1000)
, CategoryId nvarchar(1000), DocURL nvarchar(max), B64  nvarchar(max), rowGUID nvarchar(1000),_isInserted bit,_isUpdated bit,_isDeleted bit)
IF LEN (@JSONDocuments)>0 BEGIN
INSERT INTO @flxDocuments (DocGuid, ObjectName, ObjectId, ObjectGUID, [Name], [Description], CategoryId, DocURL, B64, rowGUID,_isInserted ,_isUpdated ,_isDeleted )
SELECT DocGuid, ObjectName, ObjectId, ObjectGUID, [Name], [Description], CategoryId, DocURL, B64, cast(_rowguid as nvarchar(max)),_isInserted ,_isUpdated ,_isDeleted 
FROM OPENJSON(@JSONDocuments,'$.flxDocuments') 
WITH ( 
	DocGuid nvarchar(1000) '$.DocGuid',
	ObjectName nvarchar(1000) '$.ObjectName',
	ObjectId nvarchar(1000) '$.ObjectId',
	ObjectGUID nvarchar(1000)'$.ObjectGUID',
	[Name] nvarchar(1000) '$.Name',
	[Description] nvarchar(1000) '$.Description',	
	CreationDate nvarchar(1000) '$.CreationDate',	
	CategoryId nvarchar(1000) '$.CategoryId',
	DocURL nvarchar(max) '$.URL',
	B64 nvarchar(max) '$.B64',
	_isInserted bit '$._isInserted',
	_isUpdated bit '$._isUpdated',
	_isDeleted bit '$._isDeleted',
	_rowguid NVARCHAR(max) '$._rowguid')
END

------MTO CLIENTES
IF (SELECT count(1) FROM @Client) >0 BEGIN		
	/*
	--Borrado de clientes
	Delete C
	from Client C
	INNER JOIN @Client a on a.IdClient=c.IdClient
	WHERE a._isDeleted = 1
	*/

	/*Clientes Nuevos*/
	INSERT INTO Client (Name,  Phone, Mail, Address, Province, Postcode, IdType, IdState, IdEmployee, LastModif, ExternalCode)	
	SELECT Name, Phone, Mail, Address, Province, Postcode, 1,1,@CurrentReference,GETDATE(), _rowguid
	FROM @Client
	WHERE _isInserted=1 and _isDeleted=0

	/*Clientes modificados*/
	UPDATE b
	set b.Name = a.Name, Phone = a.Phone, Mail = a.Mail, Address = a.Address, Province = a.Province, Postcode = a.Postcode, LastModif = a.LastModif
	FROM @Client a
	inner join Client b ON b.IdClient=a.IdClient
	WHERE a._isUpdated=1 and a._isDeleted=0

	/*Actualización de campos clave en tablas cuando la clave es diferente en los dispositivos y servidor*/
	UPDATE a
	set a.IdClientNew=b.IdClient
	FROM @Client a
	inner join Client b ON b.ExternalCode=a._rowguid
	WHERE a._isInserted=1 and a._isDeleted=0

	IF (SELECT COUNT(1) FROM @flxImages) >0 BEGIN
		UPDATE I SET ObjectId=A.IdClientNew
		FROM @flxImages I 
		INNER JOIN @Client A ON I.ObjectId=A.IdClient AND I.Objectname='Offline_Cliente'
		WHERE A._isInserted=1		
	END

	IF (SELECT COUNT(1) FROM @flxDocuments)>0 BEGIN
		UPDATE I SET ObjectId=A.IdClientNew
		FROM @flxDocuments I 
		INNER JOIN @Client A ON I.ObjectId=A.IdClient AND I.Objectname='Offline_Cliente'
		WHERE A._isInserted=1		
	END

END
--Pasamos los documentos y las imágenes a los objetos online
IF (SELECT COUNT(1) FROM @flxImages) >0 BEGIN
	UPDATE @flxImages SET ObjectName='Cliente' WHERE Objectname='Offline_Cliente'		
	SET @JSONImages = JSON_MODIFY(@JSONImages, '$.flxImages',  (SELECT * FROM @flxImages FOR JSON PATH));
END
IF (SELECT COUNT(1) FROM @flxDocuments)>0 BEGIN
	UPDATE @flxDocuments SET ObjectName='Cliente' WHERE Objectname='Offline_Cliente'		
	SET @JSONDocuments = JSON_MODIFY(@JSONDocuments, '$.flxDocuments',  (SELECT * FROM @flxDocuments FOR JSON PATH));
END

COMMIT TRAN
RETURN -1
END TRY
BEGIN CATCH
	IF @@TRANCOUNT >0 BEGIN
		ROLLBACK TRAN 
	END
	print ERROR_MESSAGE()
	DECLARE @CatchError NVARCHAR(MAX)
	SET @CatchError=ERROR_MESSAGE()
	RAISERROR(@CatchError,12,1)
	RETURN 0

END CATCH

END

GO