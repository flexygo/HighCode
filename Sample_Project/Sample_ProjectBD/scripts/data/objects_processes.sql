

BEGIN TRY

MERGE INTO [Objects_Processes] AS Target
USING (VALUES
  (N'Cliente',N'Cliente_lock',N'de5a2347-abb8-441f-8fca-4f26a5189360',0,1,NULL,N'Solo aparecerá si el cliente tiene estado = 1',N'IdState',N'1',NULL,0,1)
 ,(N'Cliente',N'Cliente_nuevo_contacto',N'3d766532-4458-4376-a9c9-fb1497fb8345',0,1,NULL,NULL,NULL,NULL,NULL,0,1)
 ,(N'Cliente',N'cliente_unlock',N'06538bbd-995b-46f7-8cd8-aed3cdf27f22',0,1,NULL,N'Solo si está bloqueado',N'IdState',N'2',N'1',0,1)
 ,(N'Cliente',N'nueva_venta',N'6ba6af55-ec08-466c-92c5-b532df341eba',0,1,NULL,NULL,NULL,NULL,NULL,0,1)
 ,(N'Clientes',N'pPers_LockClientBatch',N'de5a2347-abb8-441f-8fca-4f26a5189360',0,1,NULL,NULL,NULL,NULL,NULL,1,1)
) AS Source ([ObjectName],[ProcessName],[MenuId],[Order],[Active],[SQLEnabled],[SQLEnabledDescrip],[EnabledProperty],[EnabledValues],[DisabledValues],[BagOnly],[OriginId])
ON (Target.[ObjectName] = Source.[ObjectName] AND Target.[ProcessName] = Source.[ProcessName])
WHEN MATCHED AND (
	NULLIF(Source.[MenuId], Target.[MenuId]) IS NOT NULL OR NULLIF(Target.[MenuId], Source.[MenuId]) IS NOT NULL OR 
	NULLIF(Source.[Order], Target.[Order]) IS NOT NULL OR NULLIF(Target.[Order], Source.[Order]) IS NOT NULL OR 
	NULLIF(Source.[Active], Target.[Active]) IS NOT NULL OR NULLIF(Target.[Active], Source.[Active]) IS NOT NULL OR 
	NULLIF(Source.[SQLEnabled], Target.[SQLEnabled]) IS NOT NULL OR NULLIF(Target.[SQLEnabled], Source.[SQLEnabled]) IS NOT NULL OR 
	NULLIF(Source.[SQLEnabledDescrip], Target.[SQLEnabledDescrip]) IS NOT NULL OR NULLIF(Target.[SQLEnabledDescrip], Source.[SQLEnabledDescrip]) IS NOT NULL OR 
	NULLIF(Source.[EnabledProperty], Target.[EnabledProperty]) IS NOT NULL OR NULLIF(Target.[EnabledProperty], Source.[EnabledProperty]) IS NOT NULL OR 
	NULLIF(Source.[EnabledValues], Target.[EnabledValues]) IS NOT NULL OR NULLIF(Target.[EnabledValues], Source.[EnabledValues]) IS NOT NULL OR 
	NULLIF(Source.[DisabledValues], Target.[DisabledValues]) IS NOT NULL OR NULLIF(Target.[DisabledValues], Source.[DisabledValues]) IS NOT NULL OR 
	NULLIF(Source.[BagOnly], Target.[BagOnly]) IS NOT NULL OR NULLIF(Target.[BagOnly], Source.[BagOnly]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [MenuId] = Source.[MenuId], 
  [Order] = Source.[Order], 
  [Active] = Source.[Active], 
  [SQLEnabled] = Source.[SQLEnabled], 
  [SQLEnabledDescrip] = Source.[SQLEnabledDescrip], 
  [EnabledProperty] = Source.[EnabledProperty], 
  [EnabledValues] = Source.[EnabledValues], 
  [DisabledValues] = Source.[DisabledValues], 
  [BagOnly] = Source.[BagOnly], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([ObjectName],[ProcessName],[MenuId],[Order],[Active],[SQLEnabled],[SQLEnabledDescrip],[EnabledProperty],[EnabledValues],[DisabledValues],[BagOnly],[OriginId])
 VALUES(Source.[ObjectName],Source.[ProcessName],Source.[MenuId],Source.[Order],Source.[Active],Source.[SQLEnabled],Source.[SQLEnabledDescrip],Source.[EnabledProperty],Source.[EnabledValues],Source.[DisabledValues],Source.[BagOnly],Source.[OriginId])
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





