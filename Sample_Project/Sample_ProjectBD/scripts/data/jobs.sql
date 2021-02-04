

BEGIN TRY

MERGE INTO [Jobs] AS Target
USING (VALUES
  (N'test_push',N'DefaultGroup',0,N'Test push actions log','2021-02-02T18:36:00',NULL,N'0 * * ? * *',1,N'SysNoticeSentences',N'sentenceid=''08806645-A5A7-481A-8F3B-66324F047EC0''',N'admin',N'BuildMailandNotifications',NULL,1)
) AS Source ([JobName],[JobGroup],[Enabled],[Descrip],[FirstExecutionDate],[LastExecutionDate],[TriggerExpression],[ExecuteInmediatlyAfterMisfire],[ObjectName],[ObjectWhere],[UserName],[ProcessName],[Params],[OriginId])
ON (Target.[JobName] = Source.[JobName])
WHEN MATCHED AND (
	NULLIF(Source.[JobGroup], Target.[JobGroup]) IS NOT NULL OR NULLIF(Target.[JobGroup], Source.[JobGroup]) IS NOT NULL OR 
	NULLIF(Source.[Enabled], Target.[Enabled]) IS NOT NULL OR NULLIF(Target.[Enabled], Source.[Enabled]) IS NOT NULL OR 
	NULLIF(Source.[Descrip], Target.[Descrip]) IS NOT NULL OR NULLIF(Target.[Descrip], Source.[Descrip]) IS NOT NULL OR 
	NULLIF(Source.[FirstExecutionDate], Target.[FirstExecutionDate]) IS NOT NULL OR NULLIF(Target.[FirstExecutionDate], Source.[FirstExecutionDate]) IS NOT NULL OR 
	NULLIF(Source.[LastExecutionDate], Target.[LastExecutionDate]) IS NOT NULL OR NULLIF(Target.[LastExecutionDate], Source.[LastExecutionDate]) IS NOT NULL OR 
	NULLIF(Source.[TriggerExpression], Target.[TriggerExpression]) IS NOT NULL OR NULLIF(Target.[TriggerExpression], Source.[TriggerExpression]) IS NOT NULL OR 
	NULLIF(Source.[ExecuteInmediatlyAfterMisfire], Target.[ExecuteInmediatlyAfterMisfire]) IS NOT NULL OR NULLIF(Target.[ExecuteInmediatlyAfterMisfire], Source.[ExecuteInmediatlyAfterMisfire]) IS NOT NULL OR 
	NULLIF(Source.[ObjectName], Target.[ObjectName]) IS NOT NULL OR NULLIF(Target.[ObjectName], Source.[ObjectName]) IS NOT NULL OR 
	NULLIF(Source.[ObjectWhere], Target.[ObjectWhere]) IS NOT NULL OR NULLIF(Target.[ObjectWhere], Source.[ObjectWhere]) IS NOT NULL OR 
	NULLIF(Source.[UserName], Target.[UserName]) IS NOT NULL OR NULLIF(Target.[UserName], Source.[UserName]) IS NOT NULL OR 
	NULLIF(Source.[ProcessName], Target.[ProcessName]) IS NOT NULL OR NULLIF(Target.[ProcessName], Source.[ProcessName]) IS NOT NULL OR 
	NULLIF(Source.[Params], Target.[Params]) IS NOT NULL OR NULLIF(Target.[Params], Source.[Params]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [JobGroup] = Source.[JobGroup], 
  [Enabled] = Source.[Enabled], 
  [Descrip] = Source.[Descrip], 
  [FirstExecutionDate] = Source.[FirstExecutionDate], 
  [LastExecutionDate] = Source.[LastExecutionDate], 
  [TriggerExpression] = Source.[TriggerExpression], 
  [ExecuteInmediatlyAfterMisfire] = Source.[ExecuteInmediatlyAfterMisfire], 
  [ObjectName] = Source.[ObjectName], 
  [ObjectWhere] = Source.[ObjectWhere], 
  [UserName] = Source.[UserName], 
  [ProcessName] = Source.[ProcessName], 
  [Params] = Source.[Params], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([JobName],[JobGroup],[Enabled],[Descrip],[FirstExecutionDate],[LastExecutionDate],[TriggerExpression],[ExecuteInmediatlyAfterMisfire],[ObjectName],[ObjectWhere],[UserName],[ProcessName],[Params],[OriginId])
 VALUES(Source.[JobName],Source.[JobGroup],Source.[Enabled],Source.[Descrip],Source.[FirstExecutionDate],Source.[LastExecutionDate],Source.[TriggerExpression],Source.[ExecuteInmediatlyAfterMisfire],Source.[ObjectName],Source.[ObjectWhere],Source.[UserName],Source.[ProcessName],Source.[Params],Source.[OriginId])
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





