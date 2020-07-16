

BEGIN TRY

MERGE INTO [Offline_Objects] AS Target
USING (VALUES
  (N'LearningApp',N'Offline_Cliente',500,1,0,1,1,NULL,2)
) AS Source ([AppName],[ObjectName],[BufferSize],[UpdateRelatedPrimaryKeys],[SyncImmediately],[SendData],[GetData],[TableName],[OriginId])
ON (Target.[AppName] = Source.[AppName] AND Target.[ObjectName] = Source.[ObjectName])
WHEN MATCHED AND (
	NULLIF(Source.[BufferSize], Target.[BufferSize]) IS NOT NULL OR NULLIF(Target.[BufferSize], Source.[BufferSize]) IS NOT NULL OR 
	NULLIF(Source.[UpdateRelatedPrimaryKeys], Target.[UpdateRelatedPrimaryKeys]) IS NOT NULL OR NULLIF(Target.[UpdateRelatedPrimaryKeys], Source.[UpdateRelatedPrimaryKeys]) IS NOT NULL OR 
	NULLIF(Source.[SyncImmediately], Target.[SyncImmediately]) IS NOT NULL OR NULLIF(Target.[SyncImmediately], Source.[SyncImmediately]) IS NOT NULL OR 
	NULLIF(Source.[SendData], Target.[SendData]) IS NOT NULL OR NULLIF(Target.[SendData], Source.[SendData]) IS NOT NULL OR 
	NULLIF(Source.[GetData], Target.[GetData]) IS NOT NULL OR NULLIF(Target.[GetData], Source.[GetData]) IS NOT NULL OR 
	NULLIF(Source.[TableName], Target.[TableName]) IS NOT NULL OR NULLIF(Target.[TableName], Source.[TableName]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [BufferSize] = Source.[BufferSize], 
  [UpdateRelatedPrimaryKeys] = Source.[UpdateRelatedPrimaryKeys], 
  [SyncImmediately] = Source.[SyncImmediately], 
  [SendData] = Source.[SendData], 
  [GetData] = Source.[GetData], 
  [TableName] = Source.[TableName], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([AppName],[ObjectName],[BufferSize],[UpdateRelatedPrimaryKeys],[SyncImmediately],[SendData],[GetData],[TableName],[OriginId])
 VALUES(Source.[AppName],Source.[ObjectName],Source.[BufferSize],Source.[UpdateRelatedPrimaryKeys],Source.[SyncImmediately],Source.[SendData],Source.[GetData],Source.[TableName],Source.[OriginId])
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





