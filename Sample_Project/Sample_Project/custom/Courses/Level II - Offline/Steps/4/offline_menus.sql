

BEGIN TRY

MERGE INTO [Offline_Menus] AS Target
USING (VALUES
  (N'5AEE8AFB-8B92-4621-A2C4-0E9AEF4B4DB7',N'LearningApp',NULL,0,N'Clientes',N'client',N'Clientes',N'object',NULL,NULL,N'list',NULL,N'Offline_Cliente',NULL,1,NULL,2)
 ,(N'34BA639C-5E39-4529-B669-10A230447D94',N'LearningApp',NULL,0,N'Acciones',N'task-manager-4',N'Acciones',N'object',NULL,NULL,N'list',NULL,N'Offline_Accion',NULL,1,NULL,2)
) AS Source ([MenuId],[AppName],[ParentMenuId],[Order],[Title],[IconName],[Descrip],[TypeId],[Url],[ProcessName],[PageTypeId],[PageName],[ObjectName],[ObjectWhere],[Enabled],[cssClass],[OriginID])
ON (Target.[MenuId] = Source.[MenuId])
WHEN MATCHED AND (
	NULLIF(Source.[AppName], Target.[AppName]) IS NOT NULL OR NULLIF(Target.[AppName], Source.[AppName]) IS NOT NULL OR 
	NULLIF(Source.[ParentMenuId], Target.[ParentMenuId]) IS NOT NULL OR NULLIF(Target.[ParentMenuId], Source.[ParentMenuId]) IS NOT NULL OR 
	NULLIF(Source.[Order], Target.[Order]) IS NOT NULL OR NULLIF(Target.[Order], Source.[Order]) IS NOT NULL OR 
	NULLIF(Source.[Title], Target.[Title]) IS NOT NULL OR NULLIF(Target.[Title], Source.[Title]) IS NOT NULL OR 
	NULLIF(Source.[IconName], Target.[IconName]) IS NOT NULL OR NULLIF(Target.[IconName], Source.[IconName]) IS NOT NULL OR 
	NULLIF(Source.[Descrip], Target.[Descrip]) IS NOT NULL OR NULLIF(Target.[Descrip], Source.[Descrip]) IS NOT NULL OR 
	NULLIF(Source.[TypeId], Target.[TypeId]) IS NOT NULL OR NULLIF(Target.[TypeId], Source.[TypeId]) IS NOT NULL OR 
	NULLIF(Source.[Url], Target.[Url]) IS NOT NULL OR NULLIF(Target.[Url], Source.[Url]) IS NOT NULL OR 
	NULLIF(Source.[ProcessName], Target.[ProcessName]) IS NOT NULL OR NULLIF(Target.[ProcessName], Source.[ProcessName]) IS NOT NULL OR 
	NULLIF(Source.[PageTypeId], Target.[PageTypeId]) IS NOT NULL OR NULLIF(Target.[PageTypeId], Source.[PageTypeId]) IS NOT NULL OR 
	NULLIF(Source.[PageName], Target.[PageName]) IS NOT NULL OR NULLIF(Target.[PageName], Source.[PageName]) IS NOT NULL OR 
	NULLIF(Source.[ObjectName], Target.[ObjectName]) IS NOT NULL OR NULLIF(Target.[ObjectName], Source.[ObjectName]) IS NOT NULL OR 
	NULLIF(Source.[ObjectWhere], Target.[ObjectWhere]) IS NOT NULL OR NULLIF(Target.[ObjectWhere], Source.[ObjectWhere]) IS NOT NULL OR 
	NULLIF(Source.[Enabled], Target.[Enabled]) IS NOT NULL OR NULLIF(Target.[Enabled], Source.[Enabled]) IS NOT NULL OR 
	NULLIF(Source.[cssClass], Target.[cssClass]) IS NOT NULL OR NULLIF(Target.[cssClass], Source.[cssClass]) IS NOT NULL OR 
	NULLIF(Source.[OriginID], Target.[OriginID]) IS NOT NULL OR NULLIF(Target.[OriginID], Source.[OriginID]) IS NOT NULL) THEN
 UPDATE SET
  [AppName] = Source.[AppName], 
  [ParentMenuId] = Source.[ParentMenuId], 
  [Order] = Source.[Order], 
  [Title] = Source.[Title], 
  [IconName] = Source.[IconName], 
  [Descrip] = Source.[Descrip], 
  [TypeId] = Source.[TypeId], 
  [Url] = Source.[Url], 
  [ProcessName] = Source.[ProcessName], 
  [PageTypeId] = Source.[PageTypeId], 
  [PageName] = Source.[PageName], 
  [ObjectName] = Source.[ObjectName], 
  [ObjectWhere] = Source.[ObjectWhere], 
  [Enabled] = Source.[Enabled], 
  [cssClass] = Source.[cssClass], 
  [OriginID] = Source.[OriginID]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([MenuId],[AppName],[ParentMenuId],[Order],[Title],[IconName],[Descrip],[TypeId],[Url],[ProcessName],[PageTypeId],[PageName],[ObjectName],[ObjectWhere],[Enabled],[cssClass],[OriginID])
 VALUES(Source.[MenuId],Source.[AppName],Source.[ParentMenuId],Source.[Order],Source.[Title],Source.[IconName],Source.[Descrip],Source.[TypeId],Source.[Url],Source.[ProcessName],Source.[PageTypeId],Source.[PageName],Source.[ObjectName],Source.[ObjectWhere],Source.[Enabled],Source.[cssClass],Source.[OriginID])
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





