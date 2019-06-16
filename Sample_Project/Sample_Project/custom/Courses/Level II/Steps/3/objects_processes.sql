

BEGIN TRY

MERGE INTO [Objects_Processes] AS Target
USING (VALUES
  (N'Dev_Client',N'Dev_Obj_Block_Client',N'7f216fa7-ee3b-4d5e-8e8d-68a827aeeb17',0,1,NULL,N'Condition State Active',N'IdState',N'1',NULL,0,2)
 ,(N'Dev_Client',N'Dev_Obj_Unblock_Client',N'42fa6a7c-b954-47ec-8ec7-a90793497ede',0,1,NULL,N'Condition State Blocked',N'IdState',N'2',NULL,0,2)
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
WHEN NOT MATCHED BY SOURCE AND TARGET.OriginId = 2 THEN 
 DELETE
;
END TRY
BEGIN CATCH
    DECLARE @ERRORNUMBER	INT,@ERRORMSG		VARCHAR(MAX),@ERRORSTATE		INT
    SELECT @ERRORNUMBER = 50000 + ERROR_NUMBER(),@ERRORMSG = ERROR_MESSAGE(), @ERRORSTATE = ERROR_STATE();
    THROW @ERRORNUMBER, @ERRORMSG, @ERRORSTATE
END CATCH
GO





