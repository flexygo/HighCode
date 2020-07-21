

BEGIN TRY

MERGE INTO [WebAPI_Objects] AS Target
USING (VALUES
  (N'Offline_Accion',1,1,0,0,0,0,2)
 ,(N'Offline_Cliente',1,1,0,0,0,0,2)
 ,(N'sysOfflineApp',1,1,0,0,0,0,2)
) AS Source ([ObjectName],[CanView],[CanViewCollection],[CanInsert],[CanEdit],[CanDelete],[CanPrint],[OriginId])
ON (Target.[ObjectName] = Source.[ObjectName])
WHEN MATCHED AND (
	NULLIF(Source.[CanView], Target.[CanView]) IS NOT NULL OR NULLIF(Target.[CanView], Source.[CanView]) IS NOT NULL OR 
	NULLIF(Source.[CanViewCollection], Target.[CanViewCollection]) IS NOT NULL OR NULLIF(Target.[CanViewCollection], Source.[CanViewCollection]) IS NOT NULL OR 
	NULLIF(Source.[CanInsert], Target.[CanInsert]) IS NOT NULL OR NULLIF(Target.[CanInsert], Source.[CanInsert]) IS NOT NULL OR 
	NULLIF(Source.[CanEdit], Target.[CanEdit]) IS NOT NULL OR NULLIF(Target.[CanEdit], Source.[CanEdit]) IS NOT NULL OR 
	NULLIF(Source.[CanDelete], Target.[CanDelete]) IS NOT NULL OR NULLIF(Target.[CanDelete], Source.[CanDelete]) IS NOT NULL OR 
	NULLIF(Source.[CanPrint], Target.[CanPrint]) IS NOT NULL OR NULLIF(Target.[CanPrint], Source.[CanPrint]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [CanView] = Source.[CanView], 
  [CanViewCollection] = Source.[CanViewCollection], 
  [CanInsert] = Source.[CanInsert], 
  [CanEdit] = Source.[CanEdit], 
  [CanDelete] = Source.[CanDelete], 
  [CanPrint] = Source.[CanPrint], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([ObjectName],[CanView],[CanViewCollection],[CanInsert],[CanEdit],[CanDelete],[CanPrint],[OriginId])
 VALUES(Source.[ObjectName],Source.[CanView],Source.[CanViewCollection],Source.[CanInsert],Source.[CanEdit],Source.[CanDelete],Source.[CanPrint],Source.[OriginId])
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





