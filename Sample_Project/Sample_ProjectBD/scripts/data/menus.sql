

BEGIN TRY

MERGE INTO [Menus] AS Target
USING (VALUES
  (N'06538bbd-995b-46f7-8cd8-aed3cdf27f22',N'Desbloquear cliente',NULL,N'unlock-1',1)
 ,(N'3d766532-4458-4376-a9c9-fb1497fb8345',N'Nuevo contacto',NULL,N'contactos',1)
 ,(N'6ba6af55-ec08-466c-92c5-b532df341eba',N'Nueva venta',NULL,N'cart',1)
 ,(N'de5a2347-abb8-441f-8fca-4f26a5189360',N'Bloquear cliente',NULL,N'blocked',1)
) AS Source ([MenuId],[Descrip],[ParentId],[IconName],[OriginId])
ON (Target.[MenuId] = Source.[MenuId])
WHEN MATCHED AND (
	NULLIF(Source.[Descrip], Target.[Descrip]) IS NOT NULL OR NULLIF(Target.[Descrip], Source.[Descrip]) IS NOT NULL OR 
	NULLIF(Source.[ParentId], Target.[ParentId]) IS NOT NULL OR NULLIF(Target.[ParentId], Source.[ParentId]) IS NOT NULL OR 
	NULLIF(Source.[IconName], Target.[IconName]) IS NOT NULL OR NULLIF(Target.[IconName], Source.[IconName]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [Descrip] = Source.[Descrip], 
  [ParentId] = Source.[ParentId], 
  [IconName] = Source.[IconName], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([MenuId],[Descrip],[ParentId],[IconName],[OriginId])
 VALUES(Source.[MenuId],Source.[Descrip],Source.[ParentId],Source.[IconName],Source.[OriginId])
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





