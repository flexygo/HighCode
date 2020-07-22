

BEGIN TRY

MERGE INTO [WebAPI_Views] AS Target
USING (VALUES
  (N'Offline_Accion',N'action_states',1,2)
 ,(N'Offline_Accion',N'action_types',1,2)
 ,(N'Offline_Accion',N'Employee',1,2)
) AS Source ([ObjectName],[ViewName],[CanView],[OriginId])
ON (Target.[ObjectName] = Source.[ObjectName] AND Target.[ViewName] = Source.[ViewName])
WHEN MATCHED AND (
	NULLIF(Source.[CanView], Target.[CanView]) IS NOT NULL OR NULLIF(Target.[CanView], Source.[CanView]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [CanView] = Source.[CanView], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([ObjectName],[ViewName],[CanView],[OriginId])
 VALUES(Source.[ObjectName],Source.[ViewName],Source.[CanView],Source.[OriginId])
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





