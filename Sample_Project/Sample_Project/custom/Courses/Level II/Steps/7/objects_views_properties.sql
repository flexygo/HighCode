

BEGIN TRY

MERGE INTO [Objects_Views_Properties] AS Target
USING (VALUES
  (N'Dev_Client',N'Dev_ClientDefaultList',N'Dev_Client',N'Address',N'Dev_Client',5,N'Address',2)
 ,(N'Dev_Client',N'Dev_ClientDefaultList',N'Dev_Client',N'BlockDate',N'Dev_Client',10,N'Block Date',2)
 ,(N'Dev_Client',N'Dev_ClientDefaultList',N'Dev_Client',N'BlockReason',N'Dev_Client',9,N'Block Reason',2)
 ,(N'Dev_Client',N'Dev_ClientDefaultList',N'Dev_Client',N'IdClient',N'Dev_Client',0,N'Id',2)
 ,(N'Dev_Client',N'Dev_ClientDefaultList',N'Dev_Client',N'IdEmployee',N'Dev_Client',11,N'Employee',2)
 ,(N'Dev_Client',N'Dev_ClientDefaultList',N'Dev_Client',N'IdState',N'Dev_Client',7,N'State',2)
 ,(N'Dev_Client',N'Dev_ClientDefaultList',N'Dev_Client',N'IdType',N'Dev_Client',6,N'Type',2)
 ,(N'Dev_Client',N'Dev_ClientDefaultList',N'Dev_Client',N'Image',N'Dev_Client',8,N'Image',2)
 ,(N'Dev_Client',N'Dev_ClientDefaultList',N'Dev_Client',N'LastModif',N'Dev_Client',13,N'Last Modification',2)
 ,(N'Dev_Client',N'Dev_ClientDefaultList',N'Dev_Client',N'Mail',N'Dev_Client',4,N'Mail',2)
 ,(N'Dev_Client',N'Dev_ClientDefaultList',N'Dev_Client',N'Mailing',N'Dev_Client',12,N'Mailing',2)
 ,(N'Dev_Client',N'Dev_ClientDefaultList',N'Dev_Client',N'Name',N'Dev_Client',1,N'Name',2)
 ,(N'Dev_Client',N'Dev_ClientDefaultList',N'Dev_Client',N'NIF',N'Dev_Client',2,N'NIF',2)
 ,(N'Dev_Client',N'Dev_ClientDefaultList',N'Dev_Client',N'Phone',N'Dev_Client',3,N'Phone',2)
) AS Source ([ObjectName],[ViewName],[ObjectPropertyName],[PropertyName],[ObjectPath],[Order],[Label],[OriginId])
ON (Target.[ObjectName] = Source.[ObjectName] AND Target.[ViewName] = Source.[ViewName] AND Target.[ObjectPropertyName] = Source.[ObjectPropertyName] AND Target.[PropertyName] = Source.[PropertyName])
WHEN MATCHED AND (
	NULLIF(Source.[ObjectPath], Target.[ObjectPath]) IS NOT NULL OR NULLIF(Target.[ObjectPath], Source.[ObjectPath]) IS NOT NULL OR 
	NULLIF(Source.[Order], Target.[Order]) IS NOT NULL OR NULLIF(Target.[Order], Source.[Order]) IS NOT NULL OR 
	NULLIF(Source.[Label], Target.[Label]) IS NOT NULL OR NULLIF(Target.[Label], Source.[Label]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [ObjectPath] = Source.[ObjectPath], 
  [Order] = Source.[Order], 
  [Label] = Source.[Label], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([ObjectName],[ViewName],[ObjectPropertyName],[PropertyName],[ObjectPath],[Order],[Label],[OriginId])
 VALUES(Source.[ObjectName],Source.[ViewName],Source.[ObjectPropertyName],Source.[PropertyName],Source.[ObjectPath],Source.[Order],Source.[Label],Source.[OriginId])
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





