

BEGIN TRY

MERGE INTO [Processes] AS Target
USING (VALUES
  (N'Cliente_lock',0,N'product',N'¿Confirma que desea bloquear el cliente?',N'Bloqueo de cliente',NULL,NULL,NULL,NULL,NULL,NULL,N'pPers_LockClient',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,N'DataConnectionString',N'modal640x480',NULL,1,1,0,0,1,0,NULL,NULL,0,NULL,1)
 ,(N'Cliente_nuevo_contacto',7,N'product',NULL,N'Nuevo contacto',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'edit',NULL,NULL,NULL,NULL,N'Contacto',NULL,N'{"IdClient":"{{IdClient}}"}',0,NULL,N'modal1024x768',NULL,0,1,0,0,0,0,NULL,NULL,0,NULL,1)
 ,(N'cliente_unlock',0,N'product',NULL,N'Desbloqueo de cliente',NULL,NULL,NULL,NULL,NULL,NULL,N'pPers_LockClient',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,N'DataConnectionString',N'modal640x480',NULL,1,1,0,0,1,0,NULL,NULL,0,NULL,1)
 ,(N'ConvertToNational',1,N'product',NULL,N'Convert Potencial Client to a National one',NULL,NULL,NULL,N'~/bin/Sample_Project_Processes.dll',N'Sample_Project_Processes.ClientObjectProcess',N'ConvertToNational',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'sysUser',NULL,NULL,0,NULL,N'current',NULL,1,1,0,0,1,1,NULL,NULL,0,NULL,1)
 ,(N'ConvertToNationalColl',1,N'product',NULL,N'Convert Potencial Clients to a National ones',NULL,NULL,NULL,N'~/bin/Sample_Project_Processes.dll',N'Sample_Project_Processes.ClientCollectionProcess',N'ConvertToNationalColl',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'sysUser',NULL,NULL,0,NULL,N'current',NULL,1,1,0,0,1,1,NULL,NULL,0,NULL,1)
 ,(N'DeleteClient',1,N'product',NULL,N'Delete client by using dll',NULL,NULL,NULL,N'~/bin/Sample_Project_Processes.dll',N'Sample_Project_Processes.ClientProcesses',N'DeleteClient',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'sysUser',NULL,NULL,0,NULL,N'current',NULL,1,0,0,0,0,0,NULL,NULL,0,NULL,1)
 ,(N'InsertClient',1,N'product',NULL,N'Insert client by using dll',NULL,NULL,NULL,N'~/bin/Sample_Project_Processes.dll',N'Sample_Project_Processes.ClientProcesses',N'InsertClient',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'sysUser',NULL,NULL,0,NULL,N'current',NULL,1,0,0,0,0,0,NULL,NULL,0,NULL,1)
 ,(N'nueva_venta',7,N'product',NULL,N'Nueva venta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'edit',NULL,NULL,NULL,NULL,N'Venta',NULL,N'{"IdClient":"{{IdClient}}"}',0,NULL,N'modal1024x768',NULL,0,1,0,0,0,0,NULL,NULL,0,NULL,1)
 ,(N'P_Action_D',0,N'product',NULL,N'Delete action using stored procedure',NULL,NULL,NULL,NULL,NULL,NULL,N'P_Action_D',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,N'DataConnectionString',N'modal640x480',NULL,1,0,0,0,1,0,NULL,NULL,0,NULL,1)
 ,(N'P_Action_I',0,N'product',NULL,N'Insert action using stored procedure',NULL,NULL,NULL,NULL,NULL,NULL,N'P_Action_I',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,N'DataConnectionString',N'modal640x480',NULL,1,0,0,0,1,0,NULL,NULL,0,NULL,1)
 ,(N'P_Action_U',0,N'product',NULL,N'Update action using stored procedure',NULL,NULL,NULL,NULL,NULL,NULL,N'P_Action_U',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,N'DataConnectionString',N'modal640x480',NULL,1,0,0,0,1,0,NULL,NULL,0,NULL,1)
 ,(N'pPers_ActionKanbanChangeColumn',0,N'product',NULL,N'Action kanban change column',NULL,NULL,NULL,NULL,NULL,NULL,N'pPers_ActionKanbanChangeColumn',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,N'DataConnectionString',N'modal640x480',NULL,1,1,0,0,1,0,NULL,NULL,0,NULL,1)
 ,(N'pPers_LockClientBatch',0,N'product',NULL,N'Lock a client selection.',NULL,NULL,NULL,NULL,NULL,NULL,N'pPers_LockClientBatch',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,N'DataConnectionString',N'modal640x480',NULL,1,1,0,0,1,1,NULL,NULL,0,NULL,1)
 ,(N'UpdateClient',1,N'product',NULL,N'Update client by using dll',NULL,NULL,NULL,N'~/bin/Sample_Project_Processes.dll',N'Sample_Project_Processes.ClientProcesses',N'UpdateClient',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'sysUser',NULL,NULL,0,NULL,N'current',NULL,1,0,0,0,0,0,NULL,NULL,0,NULL,1)
) AS Source ([ProcessName],[TypeId],[ClassId],[ConfirmText],[ProcessDescrip],[ParamsDescrip],[ReturnDescrip],[JSforParams],[File],[Class],[Method],[StoredName],[Code],[ExternalUrl],[PageTypeId],[PageName],[ReportName],[HelpId],[ReportWhere],[ObjectName],[ObjectWhere],[Defaults],[TimeOut],[ConnStringId],[TargetId],[ProcessFlowText],[Auditable],[Refresh],[IsTransacted],[AdminOnly],[ConfirmOkText],[CloseDialogOnOk],[RunButtonText],[LoadProcessName],[GipeParams],[Summary],[OriginId])
ON (Target.[ProcessName] = Source.[ProcessName])
WHEN MATCHED AND (
	NULLIF(Source.[TypeId], Target.[TypeId]) IS NOT NULL OR NULLIF(Target.[TypeId], Source.[TypeId]) IS NOT NULL OR 
	NULLIF(Source.[ClassId], Target.[ClassId]) IS NOT NULL OR NULLIF(Target.[ClassId], Source.[ClassId]) IS NOT NULL OR 
	NULLIF(Source.[ConfirmText], Target.[ConfirmText]) IS NOT NULL OR NULLIF(Target.[ConfirmText], Source.[ConfirmText]) IS NOT NULL OR 
	NULLIF(Source.[ProcessDescrip], Target.[ProcessDescrip]) IS NOT NULL OR NULLIF(Target.[ProcessDescrip], Source.[ProcessDescrip]) IS NOT NULL OR 
	NULLIF(Source.[ParamsDescrip], Target.[ParamsDescrip]) IS NOT NULL OR NULLIF(Target.[ParamsDescrip], Source.[ParamsDescrip]) IS NOT NULL OR 
	NULLIF(Source.[ReturnDescrip], Target.[ReturnDescrip]) IS NOT NULL OR NULLIF(Target.[ReturnDescrip], Source.[ReturnDescrip]) IS NOT NULL OR 
	NULLIF(Source.[JSforParams], Target.[JSforParams]) IS NOT NULL OR NULLIF(Target.[JSforParams], Source.[JSforParams]) IS NOT NULL OR 
	NULLIF(Source.[File], Target.[File]) IS NOT NULL OR NULLIF(Target.[File], Source.[File]) IS NOT NULL OR 
	NULLIF(Source.[Class], Target.[Class]) IS NOT NULL OR NULLIF(Target.[Class], Source.[Class]) IS NOT NULL OR 
	NULLIF(Source.[Method], Target.[Method]) IS NOT NULL OR NULLIF(Target.[Method], Source.[Method]) IS NOT NULL OR 
	NULLIF(Source.[StoredName], Target.[StoredName]) IS NOT NULL OR NULLIF(Target.[StoredName], Source.[StoredName]) IS NOT NULL OR 
	NULLIF(Source.[Code], Target.[Code]) IS NOT NULL OR NULLIF(Target.[Code], Source.[Code]) IS NOT NULL OR 
	NULLIF(Source.[ExternalUrl], Target.[ExternalUrl]) IS NOT NULL OR NULLIF(Target.[ExternalUrl], Source.[ExternalUrl]) IS NOT NULL OR 
	NULLIF(Source.[PageTypeId], Target.[PageTypeId]) IS NOT NULL OR NULLIF(Target.[PageTypeId], Source.[PageTypeId]) IS NOT NULL OR 
	NULLIF(Source.[PageName], Target.[PageName]) IS NOT NULL OR NULLIF(Target.[PageName], Source.[PageName]) IS NOT NULL OR 
	NULLIF(Source.[ReportName], Target.[ReportName]) IS NOT NULL OR NULLIF(Target.[ReportName], Source.[ReportName]) IS NOT NULL OR 
	NULLIF(Source.[HelpId], Target.[HelpId]) IS NOT NULL OR NULLIF(Target.[HelpId], Source.[HelpId]) IS NOT NULL OR 
	NULLIF(Source.[ReportWhere], Target.[ReportWhere]) IS NOT NULL OR NULLIF(Target.[ReportWhere], Source.[ReportWhere]) IS NOT NULL OR 
	NULLIF(Source.[ObjectName], Target.[ObjectName]) IS NOT NULL OR NULLIF(Target.[ObjectName], Source.[ObjectName]) IS NOT NULL OR 
	NULLIF(Source.[ObjectWhere], Target.[ObjectWhere]) IS NOT NULL OR NULLIF(Target.[ObjectWhere], Source.[ObjectWhere]) IS NOT NULL OR 
	NULLIF(Source.[Defaults], Target.[Defaults]) IS NOT NULL OR NULLIF(Target.[Defaults], Source.[Defaults]) IS NOT NULL OR 
	NULLIF(Source.[TimeOut], Target.[TimeOut]) IS NOT NULL OR NULLIF(Target.[TimeOut], Source.[TimeOut]) IS NOT NULL OR 
	NULLIF(Source.[ConnStringId], Target.[ConnStringId]) IS NOT NULL OR NULLIF(Target.[ConnStringId], Source.[ConnStringId]) IS NOT NULL OR 
	NULLIF(Source.[TargetId], Target.[TargetId]) IS NOT NULL OR NULLIF(Target.[TargetId], Source.[TargetId]) IS NOT NULL OR 
	NULLIF(Source.[ProcessFlowText], Target.[ProcessFlowText]) IS NOT NULL OR NULLIF(Target.[ProcessFlowText], Source.[ProcessFlowText]) IS NOT NULL OR 
	NULLIF(Source.[Auditable], Target.[Auditable]) IS NOT NULL OR NULLIF(Target.[Auditable], Source.[Auditable]) IS NOT NULL OR 
	NULLIF(Source.[Refresh], Target.[Refresh]) IS NOT NULL OR NULLIF(Target.[Refresh], Source.[Refresh]) IS NOT NULL OR 
	NULLIF(Source.[IsTransacted], Target.[IsTransacted]) IS NOT NULL OR NULLIF(Target.[IsTransacted], Source.[IsTransacted]) IS NOT NULL OR 
	NULLIF(Source.[AdminOnly], Target.[AdminOnly]) IS NOT NULL OR NULLIF(Target.[AdminOnly], Source.[AdminOnly]) IS NOT NULL OR 
	NULLIF(Source.[ConfirmOkText], Target.[ConfirmOkText]) IS NOT NULL OR NULLIF(Target.[ConfirmOkText], Source.[ConfirmOkText]) IS NOT NULL OR 
	NULLIF(Source.[CloseDialogOnOk], Target.[CloseDialogOnOk]) IS NOT NULL OR NULLIF(Target.[CloseDialogOnOk], Source.[CloseDialogOnOk]) IS NOT NULL OR 
	NULLIF(Source.[RunButtonText], Target.[RunButtonText]) IS NOT NULL OR NULLIF(Target.[RunButtonText], Source.[RunButtonText]) IS NOT NULL OR 
	NULLIF(Source.[LoadProcessName], Target.[LoadProcessName]) IS NOT NULL OR NULLIF(Target.[LoadProcessName], Source.[LoadProcessName]) IS NOT NULL OR 
	NULLIF(Source.[GipeParams], Target.[GipeParams]) IS NOT NULL OR NULLIF(Target.[GipeParams], Source.[GipeParams]) IS NOT NULL OR 
	NULLIF(Source.[Summary], Target.[Summary]) IS NOT NULL OR NULLIF(Target.[Summary], Source.[Summary]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [TypeId] = Source.[TypeId], 
  [ClassId] = Source.[ClassId], 
  [ConfirmText] = Source.[ConfirmText], 
  [ProcessDescrip] = Source.[ProcessDescrip], 
  [ParamsDescrip] = Source.[ParamsDescrip], 
  [ReturnDescrip] = Source.[ReturnDescrip], 
  [JSforParams] = Source.[JSforParams], 
  [File] = Source.[File], 
  [Class] = Source.[Class], 
  [Method] = Source.[Method], 
  [StoredName] = Source.[StoredName], 
  [Code] = Source.[Code], 
  [ExternalUrl] = Source.[ExternalUrl], 
  [PageTypeId] = Source.[PageTypeId], 
  [PageName] = Source.[PageName], 
  [ReportName] = Source.[ReportName], 
  [HelpId] = Source.[HelpId], 
  [ReportWhere] = Source.[ReportWhere], 
  [ObjectName] = Source.[ObjectName], 
  [ObjectWhere] = Source.[ObjectWhere], 
  [Defaults] = Source.[Defaults], 
  [TimeOut] = Source.[TimeOut], 
  [ConnStringId] = Source.[ConnStringId], 
  [TargetId] = Source.[TargetId], 
  [ProcessFlowText] = Source.[ProcessFlowText], 
  [Auditable] = Source.[Auditable], 
  [Refresh] = Source.[Refresh], 
  [IsTransacted] = Source.[IsTransacted], 
  [AdminOnly] = Source.[AdminOnly], 
  [ConfirmOkText] = Source.[ConfirmOkText], 
  [CloseDialogOnOk] = Source.[CloseDialogOnOk], 
  [RunButtonText] = Source.[RunButtonText], 
  [LoadProcessName] = Source.[LoadProcessName], 
  [GipeParams] = Source.[GipeParams], 
  [Summary] = Source.[Summary], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([ProcessName],[TypeId],[ClassId],[ConfirmText],[ProcessDescrip],[ParamsDescrip],[ReturnDescrip],[JSforParams],[File],[Class],[Method],[StoredName],[Code],[ExternalUrl],[PageTypeId],[PageName],[ReportName],[HelpId],[ReportWhere],[ObjectName],[ObjectWhere],[Defaults],[TimeOut],[ConnStringId],[TargetId],[ProcessFlowText],[Auditable],[Refresh],[IsTransacted],[AdminOnly],[ConfirmOkText],[CloseDialogOnOk],[RunButtonText],[LoadProcessName],[GipeParams],[Summary],[OriginId])
 VALUES(Source.[ProcessName],Source.[TypeId],Source.[ClassId],Source.[ConfirmText],Source.[ProcessDescrip],Source.[ParamsDescrip],Source.[ReturnDescrip],Source.[JSforParams],Source.[File],Source.[Class],Source.[Method],Source.[StoredName],Source.[Code],Source.[ExternalUrl],Source.[PageTypeId],Source.[PageName],Source.[ReportName],Source.[HelpId],Source.[ReportWhere],Source.[ObjectName],Source.[ObjectWhere],Source.[Defaults],Source.[TimeOut],Source.[ConnStringId],Source.[TargetId],Source.[ProcessFlowText],Source.[Auditable],Source.[Refresh],Source.[IsTransacted],Source.[AdminOnly],Source.[ConfirmOkText],Source.[CloseDialogOnOk],Source.[RunButtonText],Source.[LoadProcessName],Source.[GipeParams],Source.[Summary],Source.[OriginId])
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





