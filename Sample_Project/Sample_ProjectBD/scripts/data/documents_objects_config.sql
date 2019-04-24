

BEGIN TRY

MERGE INTO [Documents_Objects_Config] AS Target
USING (VALUES
  (N'Cliente',N'IdClient',NULL,N'flexygo',N'~/custom/documents/',NULL,NULL,0,0,0,0,0,0,0,0,1,1,1,1,1)
) AS Source ([ObjectName],[ObjectPK],[ERPObjectName],[TypeId],[Path],[DefaultCategoryId],[CategoryFilter],[DropboxFolderCreate],[DropboxFolderLink],[DropboxFileCreate],[DropboxFileLink],[DriveFolderCreate],[DriveFolderLink],[DriveFileCreate],[DriveFileLink],[DiskFolderCreate],[DiskFolderLink],[DiskFileCreate],[DiskFileLink],[OriginId])
ON (Target.[ObjectName] = Source.[ObjectName] AND Target.[ObjectPK] = Source.[ObjectPK])
WHEN MATCHED AND (
	NULLIF(Source.[ERPObjectName], Target.[ERPObjectName]) IS NOT NULL OR NULLIF(Target.[ERPObjectName], Source.[ERPObjectName]) IS NOT NULL OR 
	NULLIF(Source.[TypeId], Target.[TypeId]) IS NOT NULL OR NULLIF(Target.[TypeId], Source.[TypeId]) IS NOT NULL OR 
	NULLIF(Source.[Path], Target.[Path]) IS NOT NULL OR NULLIF(Target.[Path], Source.[Path]) IS NOT NULL OR 
	NULLIF(Source.[DefaultCategoryId], Target.[DefaultCategoryId]) IS NOT NULL OR NULLIF(Target.[DefaultCategoryId], Source.[DefaultCategoryId]) IS NOT NULL OR 
	NULLIF(Source.[CategoryFilter], Target.[CategoryFilter]) IS NOT NULL OR NULLIF(Target.[CategoryFilter], Source.[CategoryFilter]) IS NOT NULL OR 
	NULLIF(Source.[DropboxFolderCreate], Target.[DropboxFolderCreate]) IS NOT NULL OR NULLIF(Target.[DropboxFolderCreate], Source.[DropboxFolderCreate]) IS NOT NULL OR 
	NULLIF(Source.[DropboxFolderLink], Target.[DropboxFolderLink]) IS NOT NULL OR NULLIF(Target.[DropboxFolderLink], Source.[DropboxFolderLink]) IS NOT NULL OR 
	NULLIF(Source.[DropboxFileCreate], Target.[DropboxFileCreate]) IS NOT NULL OR NULLIF(Target.[DropboxFileCreate], Source.[DropboxFileCreate]) IS NOT NULL OR 
	NULLIF(Source.[DropboxFileLink], Target.[DropboxFileLink]) IS NOT NULL OR NULLIF(Target.[DropboxFileLink], Source.[DropboxFileLink]) IS NOT NULL OR 
	NULLIF(Source.[DriveFolderCreate], Target.[DriveFolderCreate]) IS NOT NULL OR NULLIF(Target.[DriveFolderCreate], Source.[DriveFolderCreate]) IS NOT NULL OR 
	NULLIF(Source.[DriveFolderLink], Target.[DriveFolderLink]) IS NOT NULL OR NULLIF(Target.[DriveFolderLink], Source.[DriveFolderLink]) IS NOT NULL OR 
	NULLIF(Source.[DriveFileCreate], Target.[DriveFileCreate]) IS NOT NULL OR NULLIF(Target.[DriveFileCreate], Source.[DriveFileCreate]) IS NOT NULL OR 
	NULLIF(Source.[DriveFileLink], Target.[DriveFileLink]) IS NOT NULL OR NULLIF(Target.[DriveFileLink], Source.[DriveFileLink]) IS NOT NULL OR 
	NULLIF(Source.[DiskFolderCreate], Target.[DiskFolderCreate]) IS NOT NULL OR NULLIF(Target.[DiskFolderCreate], Source.[DiskFolderCreate]) IS NOT NULL OR 
	NULLIF(Source.[DiskFolderLink], Target.[DiskFolderLink]) IS NOT NULL OR NULLIF(Target.[DiskFolderLink], Source.[DiskFolderLink]) IS NOT NULL OR 
	NULLIF(Source.[DiskFileCreate], Target.[DiskFileCreate]) IS NOT NULL OR NULLIF(Target.[DiskFileCreate], Source.[DiskFileCreate]) IS NOT NULL OR 
	NULLIF(Source.[DiskFileLink], Target.[DiskFileLink]) IS NOT NULL OR NULLIF(Target.[DiskFileLink], Source.[DiskFileLink]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [ERPObjectName] = Source.[ERPObjectName], 
  [TypeId] = Source.[TypeId], 
  [Path] = Source.[Path], 
  [DefaultCategoryId] = Source.[DefaultCategoryId], 
  [CategoryFilter] = Source.[CategoryFilter], 
  [DropboxFolderCreate] = Source.[DropboxFolderCreate], 
  [DropboxFolderLink] = Source.[DropboxFolderLink], 
  [DropboxFileCreate] = Source.[DropboxFileCreate], 
  [DropboxFileLink] = Source.[DropboxFileLink], 
  [DriveFolderCreate] = Source.[DriveFolderCreate], 
  [DriveFolderLink] = Source.[DriveFolderLink], 
  [DriveFileCreate] = Source.[DriveFileCreate], 
  [DriveFileLink] = Source.[DriveFileLink], 
  [DiskFolderCreate] = Source.[DiskFolderCreate], 
  [DiskFolderLink] = Source.[DiskFolderLink], 
  [DiskFileCreate] = Source.[DiskFileCreate], 
  [DiskFileLink] = Source.[DiskFileLink], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([ObjectName],[ObjectPK],[ERPObjectName],[TypeId],[Path],[DefaultCategoryId],[CategoryFilter],[DropboxFolderCreate],[DropboxFolderLink],[DropboxFileCreate],[DropboxFileLink],[DriveFolderCreate],[DriveFolderLink],[DriveFileCreate],[DriveFileLink],[DiskFolderCreate],[DiskFolderLink],[DiskFileCreate],[DiskFileLink],[OriginId])
 VALUES(Source.[ObjectName],Source.[ObjectPK],Source.[ERPObjectName],Source.[TypeId],Source.[Path],Source.[DefaultCategoryId],Source.[CategoryFilter],Source.[DropboxFolderCreate],Source.[DropboxFolderLink],Source.[DropboxFileCreate],Source.[DropboxFileLink],Source.[DriveFolderCreate],Source.[DriveFolderLink],Source.[DriveFileCreate],Source.[DriveFileLink],Source.[DiskFolderCreate],Source.[DiskFolderLink],Source.[DiskFileCreate],Source.[DiskFileLink],Source.[OriginId])
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





