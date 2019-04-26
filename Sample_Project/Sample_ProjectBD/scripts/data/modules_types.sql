

BEGIN TRY

MERGE INTO [Modules_Types] AS Target
USING (VALUES
  (N'afl-carousel',N'Carousel',N'fighter-jet',NULL,N'afl-carousel',0,1)
) AS Source ([TypeId],[Descrip],[IconName],[SettingsTable],[WebComponent],[UseCollection],[OriginId])
ON (Target.[TypeId] = Source.[TypeId])
WHEN MATCHED AND (
	NULLIF(Source.[Descrip], Target.[Descrip]) IS NOT NULL OR NULLIF(Target.[Descrip], Source.[Descrip]) IS NOT NULL OR 
	NULLIF(Source.[IconName], Target.[IconName]) IS NOT NULL OR NULLIF(Target.[IconName], Source.[IconName]) IS NOT NULL OR 
	NULLIF(Source.[SettingsTable], Target.[SettingsTable]) IS NOT NULL OR NULLIF(Target.[SettingsTable], Source.[SettingsTable]) IS NOT NULL OR 
	NULLIF(Source.[WebComponent], Target.[WebComponent]) IS NOT NULL OR NULLIF(Target.[WebComponent], Source.[WebComponent]) IS NOT NULL OR 
	NULLIF(Source.[UseCollection], Target.[UseCollection]) IS NOT NULL OR NULLIF(Target.[UseCollection], Source.[UseCollection]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [Descrip] = Source.[Descrip], 
  [IconName] = Source.[IconName], 
  [SettingsTable] = Source.[SettingsTable], 
  [WebComponent] = Source.[WebComponent], 
  [UseCollection] = Source.[UseCollection], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([TypeId],[Descrip],[IconName],[SettingsTable],[WebComponent],[UseCollection],[OriginId])
 VALUES(Source.[TypeId],Source.[Descrip],Source.[IconName],Source.[SettingsTable],Source.[WebComponent],Source.[UseCollection],Source.[OriginId])
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





