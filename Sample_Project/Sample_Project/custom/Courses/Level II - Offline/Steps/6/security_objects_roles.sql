

BEGIN TRY

MERGE INTO [Security_Objects_Roles] AS Target
USING (VALUES
  (N'Offline_Accion',N'users',1,N'(actions.IdEmployee=''{{currentReference}}'')',1,N'(actions.IdEmployee=''{{currentReference}}'')',1,NULL,1,NULL,1,NULL,1,2)
) AS Source ([ObjectName],[RoleId],[CanView],[ViewFilter],[CanViewCollection],[ViewFilterCollection],[CanInsert],[InsertFilter],[CanEdit],[EditFilter],[CanDelete],[DeleteFilter],[CanPrint],[OriginId])
ON (Target.[ObjectName] = Source.[ObjectName] AND Target.[RoleId] = Source.[RoleId])
WHEN MATCHED AND (
	NULLIF(Source.[CanView], Target.[CanView]) IS NOT NULL OR NULLIF(Target.[CanView], Source.[CanView]) IS NOT NULL OR 
	NULLIF(Source.[ViewFilter], Target.[ViewFilter]) IS NOT NULL OR NULLIF(Target.[ViewFilter], Source.[ViewFilter]) IS NOT NULL OR 
	NULLIF(Source.[CanViewCollection], Target.[CanViewCollection]) IS NOT NULL OR NULLIF(Target.[CanViewCollection], Source.[CanViewCollection]) IS NOT NULL OR 
	NULLIF(Source.[ViewFilterCollection], Target.[ViewFilterCollection]) IS NOT NULL OR NULLIF(Target.[ViewFilterCollection], Source.[ViewFilterCollection]) IS NOT NULL OR 
	NULLIF(Source.[CanInsert], Target.[CanInsert]) IS NOT NULL OR NULLIF(Target.[CanInsert], Source.[CanInsert]) IS NOT NULL OR 
	NULLIF(Source.[InsertFilter], Target.[InsertFilter]) IS NOT NULL OR NULLIF(Target.[InsertFilter], Source.[InsertFilter]) IS NOT NULL OR 
	NULLIF(Source.[CanEdit], Target.[CanEdit]) IS NOT NULL OR NULLIF(Target.[CanEdit], Source.[CanEdit]) IS NOT NULL OR 
	NULLIF(Source.[EditFilter], Target.[EditFilter]) IS NOT NULL OR NULLIF(Target.[EditFilter], Source.[EditFilter]) IS NOT NULL OR 
	NULLIF(Source.[CanDelete], Target.[CanDelete]) IS NOT NULL OR NULLIF(Target.[CanDelete], Source.[CanDelete]) IS NOT NULL OR 
	NULLIF(Source.[DeleteFilter], Target.[DeleteFilter]) IS NOT NULL OR NULLIF(Target.[DeleteFilter], Source.[DeleteFilter]) IS NOT NULL OR 
	NULLIF(Source.[CanPrint], Target.[CanPrint]) IS NOT NULL OR NULLIF(Target.[CanPrint], Source.[CanPrint]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [CanView] = Source.[CanView], 
  [ViewFilter] = Source.[ViewFilter], 
  [CanViewCollection] = Source.[CanViewCollection], 
  [ViewFilterCollection] = Source.[ViewFilterCollection], 
  [CanInsert] = Source.[CanInsert], 
  [InsertFilter] = Source.[InsertFilter], 
  [CanEdit] = Source.[CanEdit], 
  [EditFilter] = Source.[EditFilter], 
  [CanDelete] = Source.[CanDelete], 
  [DeleteFilter] = Source.[DeleteFilter], 
  [CanPrint] = Source.[CanPrint], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([ObjectName],[RoleId],[CanView],[ViewFilter],[CanViewCollection],[ViewFilterCollection],[CanInsert],[InsertFilter],[CanEdit],[EditFilter],[CanDelete],[DeleteFilter],[CanPrint],[OriginId])
 VALUES(Source.[ObjectName],Source.[RoleId],Source.[CanView],Source.[ViewFilter],Source.[CanViewCollection],Source.[ViewFilterCollection],Source.[CanInsert],Source.[InsertFilter],Source.[CanEdit],Source.[EditFilter],Source.[CanDelete],Source.[DeleteFilter],Source.[CanPrint],Source.[OriginId])
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





