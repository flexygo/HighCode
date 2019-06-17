

BEGIN TRY

MERGE INTO [Navigation_Nodes] AS Target
USING (VALUES
 (N'F9792A6C-1B31-47A8-A3FA-5AAF1EB0BA5F',N'25A4B4D5-44AE-4CF1-8733-568F00F31520',0,N'Level II Practices',N'noicon',N'Level II Practices',N'text',NULL,NULL,N'current',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,N'txt-warning',2)
 ,(N'091DECB4-9E40-4E06-8D1E-80E05A4EB454',N'F9792A6C-1B31-47A8-A3FA-5AAF1EB0BA5F',0,N'Clients',N'noicon',N'Clients',N'object',NULL,NULL,N'current',NULL,N'list',NULL,NULL,NULL,NULL,N'Dev_Clients',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,2)
 ,(N'52C4F672-C800-4BAD-A519-0DABA5A2B729',N'F9792A6C-1B31-47A8-A3FA-5AAF1EB0BA5F',0,N'Stored Procedures',N'noicon',N'Stored Procedures',N'text',NULL,NULL,N'current',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,2)
 ,(N'43791640-CF6F-4265-AAFF-4DEB34F93FCB',N'52C4F672-C800-4BAD-A519-0DABA5A2B729',0,N'Block Client',N'noicon',N'Block Client',N'process',NULL,NULL,N'modal640x480',N'Dev_SP_Block_Client',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,2)
 ,(N'98281B72-1080-4706-BC41-F6183FED94B1',N'52C4F672-C800-4BAD-A519-0DABA5A2B729',0,N'Unblock Client',N'noicon',N'Unblock Client',N'process',NULL,NULL,N'modal640x480',N'Dev_SP_Unblock_Client',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,2)
) AS Source ([NodeId],[ParentNodeId],[Order],[Title],[IconName],[Descrip],[TypeId],[Params],[Url],[TargetId],[ProcessName],[PageTypeId],[PageName],[ReportName],[HelpId],[ReportWhere],[ObjectName],[ObjectWhere],[Defaults],[SQLSentence],[SQLConStringId],[WebComponent],[TableName],[BadgeClass],[BadgeSQL],[BadgeConStringId],[BadgeRefresh],[Enabled],[cssClass],[OriginId])
ON (Target.[NodeId] = Source.[NodeId])
WHEN MATCHED AND (
	NULLIF(Source.[ParentNodeId], Target.[ParentNodeId]) IS NOT NULL OR NULLIF(Target.[ParentNodeId], Source.[ParentNodeId]) IS NOT NULL OR 
	NULLIF(Source.[Order], Target.[Order]) IS NOT NULL OR NULLIF(Target.[Order], Source.[Order]) IS NOT NULL OR 
	NULLIF(Source.[Title], Target.[Title]) IS NOT NULL OR NULLIF(Target.[Title], Source.[Title]) IS NOT NULL OR 
	NULLIF(Source.[IconName], Target.[IconName]) IS NOT NULL OR NULLIF(Target.[IconName], Source.[IconName]) IS NOT NULL OR 
	NULLIF(Source.[Descrip], Target.[Descrip]) IS NOT NULL OR NULLIF(Target.[Descrip], Source.[Descrip]) IS NOT NULL OR 
	NULLIF(Source.[TypeId], Target.[TypeId]) IS NOT NULL OR NULLIF(Target.[TypeId], Source.[TypeId]) IS NOT NULL OR 
	NULLIF(Source.[Params], Target.[Params]) IS NOT NULL OR NULLIF(Target.[Params], Source.[Params]) IS NOT NULL OR 
	NULLIF(Source.[Url], Target.[Url]) IS NOT NULL OR NULLIF(Target.[Url], Source.[Url]) IS NOT NULL OR 
	NULLIF(Source.[TargetId], Target.[TargetId]) IS NOT NULL OR NULLIF(Target.[TargetId], Source.[TargetId]) IS NOT NULL OR 
	NULLIF(Source.[ProcessName], Target.[ProcessName]) IS NOT NULL OR NULLIF(Target.[ProcessName], Source.[ProcessName]) IS NOT NULL OR 
	NULLIF(Source.[PageTypeId], Target.[PageTypeId]) IS NOT NULL OR NULLIF(Target.[PageTypeId], Source.[PageTypeId]) IS NOT NULL OR 
	NULLIF(Source.[PageName], Target.[PageName]) IS NOT NULL OR NULLIF(Target.[PageName], Source.[PageName]) IS NOT NULL OR 
	NULLIF(Source.[ReportName], Target.[ReportName]) IS NOT NULL OR NULLIF(Target.[ReportName], Source.[ReportName]) IS NOT NULL OR 
	NULLIF(Source.[HelpId], Target.[HelpId]) IS NOT NULL OR NULLIF(Target.[HelpId], Source.[HelpId]) IS NOT NULL OR 
	NULLIF(Source.[ReportWhere], Target.[ReportWhere]) IS NOT NULL OR NULLIF(Target.[ReportWhere], Source.[ReportWhere]) IS NOT NULL OR 
	NULLIF(Source.[ObjectName], Target.[ObjectName]) IS NOT NULL OR NULLIF(Target.[ObjectName], Source.[ObjectName]) IS NOT NULL OR 
	NULLIF(Source.[ObjectWhere], Target.[ObjectWhere]) IS NOT NULL OR NULLIF(Target.[ObjectWhere], Source.[ObjectWhere]) IS NOT NULL OR 
	NULLIF(Source.[Defaults], Target.[Defaults]) IS NOT NULL OR NULLIF(Target.[Defaults], Source.[Defaults]) IS NOT NULL OR 
	NULLIF(Source.[SQLSentence], Target.[SQLSentence]) IS NOT NULL OR NULLIF(Target.[SQLSentence], Source.[SQLSentence]) IS NOT NULL OR 
	NULLIF(Source.[SQLConStringId], Target.[SQLConStringId]) IS NOT NULL OR NULLIF(Target.[SQLConStringId], Source.[SQLConStringId]) IS NOT NULL OR 
	NULLIF(Source.[WebComponent], Target.[WebComponent]) IS NOT NULL OR NULLIF(Target.[WebComponent], Source.[WebComponent]) IS NOT NULL OR 
	NULLIF(Source.[TableName], Target.[TableName]) IS NOT NULL OR NULLIF(Target.[TableName], Source.[TableName]) IS NOT NULL OR 
	NULLIF(Source.[BadgeClass], Target.[BadgeClass]) IS NOT NULL OR NULLIF(Target.[BadgeClass], Source.[BadgeClass]) IS NOT NULL OR 
	NULLIF(Source.[BadgeSQL], Target.[BadgeSQL]) IS NOT NULL OR NULLIF(Target.[BadgeSQL], Source.[BadgeSQL]) IS NOT NULL OR 
	NULLIF(Source.[BadgeConStringId], Target.[BadgeConStringId]) IS NOT NULL OR NULLIF(Target.[BadgeConStringId], Source.[BadgeConStringId]) IS NOT NULL OR 
	NULLIF(Source.[BadgeRefresh], Target.[BadgeRefresh]) IS NOT NULL OR NULLIF(Target.[BadgeRefresh], Source.[BadgeRefresh]) IS NOT NULL OR 
	NULLIF(Source.[Enabled], Target.[Enabled]) IS NOT NULL OR NULLIF(Target.[Enabled], Source.[Enabled]) IS NOT NULL OR 
	NULLIF(Source.[cssClass], Target.[cssClass]) IS NOT NULL OR NULLIF(Target.[cssClass], Source.[cssClass]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [ParentNodeId] = Source.[ParentNodeId], 
  [Order] = Source.[Order], 
  [Title] = Source.[Title], 
  [IconName] = Source.[IconName], 
  [Descrip] = Source.[Descrip], 
  [TypeId] = Source.[TypeId], 
  [Params] = Source.[Params], 
  [Url] = Source.[Url], 
  [TargetId] = Source.[TargetId], 
  [ProcessName] = Source.[ProcessName], 
  [PageTypeId] = Source.[PageTypeId], 
  [PageName] = Source.[PageName], 
  [ReportName] = Source.[ReportName], 
  [HelpId] = Source.[HelpId], 
  [ReportWhere] = Source.[ReportWhere], 
  [ObjectName] = Source.[ObjectName], 
  [ObjectWhere] = Source.[ObjectWhere], 
  [Defaults] = Source.[Defaults], 
  [SQLSentence] = Source.[SQLSentence], 
  [SQLConStringId] = Source.[SQLConStringId], 
  [WebComponent] = Source.[WebComponent], 
  [TableName] = Source.[TableName], 
  [BadgeClass] = Source.[BadgeClass], 
  [BadgeSQL] = Source.[BadgeSQL], 
  [BadgeConStringId] = Source.[BadgeConStringId], 
  [BadgeRefresh] = Source.[BadgeRefresh], 
  [Enabled] = Source.[Enabled], 
  [cssClass] = Source.[cssClass], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([NodeId],[ParentNodeId],[Order],[Title],[IconName],[Descrip],[TypeId],[Params],[Url],[TargetId],[ProcessName],[PageTypeId],[PageName],[ReportName],[HelpId],[ReportWhere],[ObjectName],[ObjectWhere],[Defaults],[SQLSentence],[SQLConStringId],[WebComponent],[TableName],[BadgeClass],[BadgeSQL],[BadgeConStringId],[BadgeRefresh],[Enabled],[cssClass],[OriginId])
 VALUES(Source.[NodeId],Source.[ParentNodeId],Source.[Order],Source.[Title],Source.[IconName],Source.[Descrip],Source.[TypeId],Source.[Params],Source.[Url],Source.[TargetId],Source.[ProcessName],Source.[PageTypeId],Source.[PageName],Source.[ReportName],Source.[HelpId],Source.[ReportWhere],Source.[ObjectName],Source.[ObjectWhere],Source.[Defaults],Source.[SQLSentence],Source.[SQLConStringId],Source.[WebComponent],Source.[TableName],Source.[BadgeClass],Source.[BadgeSQL],Source.[BadgeConStringId],Source.[BadgeRefresh],Source.[Enabled],Source.[cssClass],Source.[OriginId])
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





