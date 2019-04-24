

BEGIN TRY

MERGE INTO [Objects_Presets] AS Target
USING (VALUES
  (N'ClientesActivos',N'Cliente',N'Clientes activos',N'(Client.IdState=1)',N'fa-unlock',NULL,NULL,0,1)
 ,(N'ClientesBloqueados',N'Cliente',N'Clientes bloqueados',N'(Client.IdState=2)',N'fa-lock',NULL,NULL,0,1)
) AS Source ([PresetName],[ObjectName],[Title],[Filter],[IconName],[IconClass],[TitleClass],[Order],[Originid])
ON (Target.[PresetName] = Source.[PresetName])
WHEN MATCHED AND (
	NULLIF(Source.[ObjectName], Target.[ObjectName]) IS NOT NULL OR NULLIF(Target.[ObjectName], Source.[ObjectName]) IS NOT NULL OR 
	NULLIF(Source.[Title], Target.[Title]) IS NOT NULL OR NULLIF(Target.[Title], Source.[Title]) IS NOT NULL OR 
	NULLIF(Source.[Filter], Target.[Filter]) IS NOT NULL OR NULLIF(Target.[Filter], Source.[Filter]) IS NOT NULL OR 
	NULLIF(Source.[IconName], Target.[IconName]) IS NOT NULL OR NULLIF(Target.[IconName], Source.[IconName]) IS NOT NULL OR 
	NULLIF(Source.[IconClass], Target.[IconClass]) IS NOT NULL OR NULLIF(Target.[IconClass], Source.[IconClass]) IS NOT NULL OR 
	NULLIF(Source.[TitleClass], Target.[TitleClass]) IS NOT NULL OR NULLIF(Target.[TitleClass], Source.[TitleClass]) IS NOT NULL OR 
	NULLIF(Source.[Order], Target.[Order]) IS NOT NULL OR NULLIF(Target.[Order], Source.[Order]) IS NOT NULL OR 
	NULLIF(Source.[Originid], Target.[Originid]) IS NOT NULL OR NULLIF(Target.[Originid], Source.[Originid]) IS NOT NULL) THEN
 UPDATE SET
  [ObjectName] = Source.[ObjectName], 
  [Title] = Source.[Title], 
  [Filter] = Source.[Filter], 
  [IconName] = Source.[IconName], 
  [IconClass] = Source.[IconClass], 
  [TitleClass] = Source.[TitleClass], 
  [Order] = Source.[Order], 
  [Originid] = Source.[Originid]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([PresetName],[ObjectName],[Title],[Filter],[IconName],[IconClass],[TitleClass],[Order],[Originid])
 VALUES(Source.[PresetName],Source.[ObjectName],Source.[Title],Source.[Filter],Source.[IconName],Source.[IconClass],Source.[TitleClass],Source.[Order],Source.[Originid])
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





