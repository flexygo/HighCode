

BEGIN TRY

MERGE INTO [Processes_Params] AS Target
USING (VALUES
  (N'Dev_SP_Block_Client',N'BlockReason',0,N'string',NULL,NULL,NULL,N'Block Reason',N'IO',0,1,12,1,N'text',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'0',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'DataConnectionString',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'|',0,N'RelativePath',2)
 ,(N'Dev_SP_Block_Client',N'IdClient',0,N'integer',NULL,NULL,NULL,N'Client',N'IO',0,0,12,1,N'dbcombo',0,NULL,NULL,N'SELECT IdClient, [Name] FROM Client WHERE IdState <> 2',NULL,N'IdClient',N'Name',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'0',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'DataConnectionString',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'|',0,N'RelativePath',2)
 ,(N'Dev_SP_Block_Client',N'Redirect',1,N'boolean',NULL,NULL,N'1',N'Redirect',N'IO',0,2,12,1,N'check',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'0',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'DataConnectionString',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'|',0,N'RelativePath',2)
 ,(N'Dev_SP_Obj_Block_Client',N'IdClient',1,N'integer',NULL,NULL,N'{{IdClient}}',N'IdClient',N'IO',0,0,4,1,N'number',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'0',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'DataConnectionString',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'|',0,N'RelativePath',2)
 ,(N'Dev_SP_Obj_Unblock_Client',N'IdClient',1,N'integer',NULL,NULL,N'{{IdClient}}',N'IdClient',N'IO',0,0,4,1,N'number',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'0',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'DataConnectionString',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'|',0,N'RelativePath',2)
 ,(N'Dev_SP_Unblock_Client',N'IdClient',0,N'integer',NULL,NULL,NULL,N'Client',N'IO',0,0,12,1,N'dbcombo',0,NULL,NULL,N'SELECT IdClient, [Name] FROM Client WHERE IdState = 2',NULL,N'IdClient',N'Name',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'0',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'DataConnectionString',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'|',0,N'RelativePath',2)
 ,(N'Dev_SP_Unblock_Client',N'Redirect',1,N'boolean',NULL,NULL,N'1',N'Redirect',N'IO',0,1,12,1,N'check',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'0',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'DataConnectionString',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'|',0,N'RelativePath',2)
) AS Source ([ProcessName],[ParamName],[Hide],[ParamTypeId],[TableName],[ObjectName],[DefaultValue],[Label],[IOTypeId],[PositionX],[PositionY],[Width],[Height],[TypeId],[Locked],[CustomPropName],[Mask],[SQlSentence],[SQLFilter],[SQLValueField],[SQLDisplayField],[WhereSentence],[DetachedFromProcess],[SearchFunction],[SearchCollection],[SearchWhere],[SearchReturnFields],[SecurityObject],[AllowNew],[AllowNewFunction],[AllowNewReturnFields],[ObjNameLink],[ObjWhereLink],[TargetIdLink],[Style],[CSSClass],[LabelStyle],[LabelCSSClass],[DecimalPlaces],[RootPath],[FormatString],[DirectTemplate],[Tag],[HelpId],[ConnStringId],[IsRequired],[IsRequiredMessage],[minValue],[minValueMessage],[maxValue],[maxValueMessage],[RegExp],[RegExpText],[OnChangeJsFunction],[OnChangeProcessName],[PlaceHolder],[IconName],[ToolbarName],[Separator],[CascadeDependencies],[RootPathType],[OriginId])
ON (Target.[ProcessName] = Source.[ProcessName] AND Target.[ParamName] = Source.[ParamName])
WHEN MATCHED AND (
	NULLIF(Source.[Hide], Target.[Hide]) IS NOT NULL OR NULLIF(Target.[Hide], Source.[Hide]) IS NOT NULL OR 
	NULLIF(Source.[ParamTypeId], Target.[ParamTypeId]) IS NOT NULL OR NULLIF(Target.[ParamTypeId], Source.[ParamTypeId]) IS NOT NULL OR 
	NULLIF(Source.[TableName], Target.[TableName]) IS NOT NULL OR NULLIF(Target.[TableName], Source.[TableName]) IS NOT NULL OR 
	NULLIF(Source.[ObjectName], Target.[ObjectName]) IS NOT NULL OR NULLIF(Target.[ObjectName], Source.[ObjectName]) IS NOT NULL OR 
	NULLIF(Source.[DefaultValue], Target.[DefaultValue]) IS NOT NULL OR NULLIF(Target.[DefaultValue], Source.[DefaultValue]) IS NOT NULL OR 
	NULLIF(Source.[Label], Target.[Label]) IS NOT NULL OR NULLIF(Target.[Label], Source.[Label]) IS NOT NULL OR 
	NULLIF(Source.[IOTypeId], Target.[IOTypeId]) IS NOT NULL OR NULLIF(Target.[IOTypeId], Source.[IOTypeId]) IS NOT NULL OR 
	NULLIF(Source.[PositionX], Target.[PositionX]) IS NOT NULL OR NULLIF(Target.[PositionX], Source.[PositionX]) IS NOT NULL OR 
	NULLIF(Source.[PositionY], Target.[PositionY]) IS NOT NULL OR NULLIF(Target.[PositionY], Source.[PositionY]) IS NOT NULL OR 
	NULLIF(Source.[Width], Target.[Width]) IS NOT NULL OR NULLIF(Target.[Width], Source.[Width]) IS NOT NULL OR 
	NULLIF(Source.[Height], Target.[Height]) IS NOT NULL OR NULLIF(Target.[Height], Source.[Height]) IS NOT NULL OR 
	NULLIF(Source.[TypeId], Target.[TypeId]) IS NOT NULL OR NULLIF(Target.[TypeId], Source.[TypeId]) IS NOT NULL OR 
	NULLIF(Source.[Locked], Target.[Locked]) IS NOT NULL OR NULLIF(Target.[Locked], Source.[Locked]) IS NOT NULL OR 
	NULLIF(Source.[CustomPropName], Target.[CustomPropName]) IS NOT NULL OR NULLIF(Target.[CustomPropName], Source.[CustomPropName]) IS NOT NULL OR 
	NULLIF(Source.[Mask], Target.[Mask]) IS NOT NULL OR NULLIF(Target.[Mask], Source.[Mask]) IS NOT NULL OR 
	NULLIF(Source.[SQlSentence], Target.[SQlSentence]) IS NOT NULL OR NULLIF(Target.[SQlSentence], Source.[SQlSentence]) IS NOT NULL OR 
	NULLIF(Source.[SQLFilter], Target.[SQLFilter]) IS NOT NULL OR NULLIF(Target.[SQLFilter], Source.[SQLFilter]) IS NOT NULL OR 
	NULLIF(Source.[SQLValueField], Target.[SQLValueField]) IS NOT NULL OR NULLIF(Target.[SQLValueField], Source.[SQLValueField]) IS NOT NULL OR 
	NULLIF(Source.[SQLDisplayField], Target.[SQLDisplayField]) IS NOT NULL OR NULLIF(Target.[SQLDisplayField], Source.[SQLDisplayField]) IS NOT NULL OR 
	NULLIF(Source.[WhereSentence], Target.[WhereSentence]) IS NOT NULL OR NULLIF(Target.[WhereSentence], Source.[WhereSentence]) IS NOT NULL OR 
	NULLIF(Source.[DetachedFromProcess], Target.[DetachedFromProcess]) IS NOT NULL OR NULLIF(Target.[DetachedFromProcess], Source.[DetachedFromProcess]) IS NOT NULL OR 
	NULLIF(Source.[SearchFunction], Target.[SearchFunction]) IS NOT NULL OR NULLIF(Target.[SearchFunction], Source.[SearchFunction]) IS NOT NULL OR 
	NULLIF(Source.[SearchCollection], Target.[SearchCollection]) IS NOT NULL OR NULLIF(Target.[SearchCollection], Source.[SearchCollection]) IS NOT NULL OR 
	NULLIF(Source.[SearchWhere], Target.[SearchWhere]) IS NOT NULL OR NULLIF(Target.[SearchWhere], Source.[SearchWhere]) IS NOT NULL OR 
	NULLIF(Source.[SearchReturnFields], Target.[SearchReturnFields]) IS NOT NULL OR NULLIF(Target.[SearchReturnFields], Source.[SearchReturnFields]) IS NOT NULL OR 
	NULLIF(Source.[SecurityObject], Target.[SecurityObject]) IS NOT NULL OR NULLIF(Target.[SecurityObject], Source.[SecurityObject]) IS NOT NULL OR 
	NULLIF(Source.[AllowNew], Target.[AllowNew]) IS NOT NULL OR NULLIF(Target.[AllowNew], Source.[AllowNew]) IS NOT NULL OR 
	NULLIF(Source.[AllowNewFunction], Target.[AllowNewFunction]) IS NOT NULL OR NULLIF(Target.[AllowNewFunction], Source.[AllowNewFunction]) IS NOT NULL OR 
	NULLIF(Source.[AllowNewReturnFields], Target.[AllowNewReturnFields]) IS NOT NULL OR NULLIF(Target.[AllowNewReturnFields], Source.[AllowNewReturnFields]) IS NOT NULL OR 
	NULLIF(Source.[ObjNameLink], Target.[ObjNameLink]) IS NOT NULL OR NULLIF(Target.[ObjNameLink], Source.[ObjNameLink]) IS NOT NULL OR 
	NULLIF(Source.[ObjWhereLink], Target.[ObjWhereLink]) IS NOT NULL OR NULLIF(Target.[ObjWhereLink], Source.[ObjWhereLink]) IS NOT NULL OR 
	NULLIF(Source.[TargetIdLink], Target.[TargetIdLink]) IS NOT NULL OR NULLIF(Target.[TargetIdLink], Source.[TargetIdLink]) IS NOT NULL OR 
	NULLIF(Source.[Style], Target.[Style]) IS NOT NULL OR NULLIF(Target.[Style], Source.[Style]) IS NOT NULL OR 
	NULLIF(Source.[CSSClass], Target.[CSSClass]) IS NOT NULL OR NULLIF(Target.[CSSClass], Source.[CSSClass]) IS NOT NULL OR 
	NULLIF(Source.[LabelStyle], Target.[LabelStyle]) IS NOT NULL OR NULLIF(Target.[LabelStyle], Source.[LabelStyle]) IS NOT NULL OR 
	NULLIF(Source.[LabelCSSClass], Target.[LabelCSSClass]) IS NOT NULL OR NULLIF(Target.[LabelCSSClass], Source.[LabelCSSClass]) IS NOT NULL OR 
	NULLIF(Source.[DecimalPlaces], Target.[DecimalPlaces]) IS NOT NULL OR NULLIF(Target.[DecimalPlaces], Source.[DecimalPlaces]) IS NOT NULL OR 
	NULLIF(Source.[RootPath], Target.[RootPath]) IS NOT NULL OR NULLIF(Target.[RootPath], Source.[RootPath]) IS NOT NULL OR 
	NULLIF(Source.[FormatString], Target.[FormatString]) IS NOT NULL OR NULLIF(Target.[FormatString], Source.[FormatString]) IS NOT NULL OR 
	NULLIF(Source.[DirectTemplate], Target.[DirectTemplate]) IS NOT NULL OR NULLIF(Target.[DirectTemplate], Source.[DirectTemplate]) IS NOT NULL OR 
	NULLIF(Source.[Tag], Target.[Tag]) IS NOT NULL OR NULLIF(Target.[Tag], Source.[Tag]) IS NOT NULL OR 
	NULLIF(Source.[HelpId], Target.[HelpId]) IS NOT NULL OR NULLIF(Target.[HelpId], Source.[HelpId]) IS NOT NULL OR 
	NULLIF(Source.[ConnStringId], Target.[ConnStringId]) IS NOT NULL OR NULLIF(Target.[ConnStringId], Source.[ConnStringId]) IS NOT NULL OR 
	NULLIF(Source.[IsRequired], Target.[IsRequired]) IS NOT NULL OR NULLIF(Target.[IsRequired], Source.[IsRequired]) IS NOT NULL OR 
	NULLIF(Source.[IsRequiredMessage], Target.[IsRequiredMessage]) IS NOT NULL OR NULLIF(Target.[IsRequiredMessage], Source.[IsRequiredMessage]) IS NOT NULL OR 
	NULLIF(Source.[minValue], Target.[minValue]) IS NOT NULL OR NULLIF(Target.[minValue], Source.[minValue]) IS NOT NULL OR 
	NULLIF(Source.[minValueMessage], Target.[minValueMessage]) IS NOT NULL OR NULLIF(Target.[minValueMessage], Source.[minValueMessage]) IS NOT NULL OR 
	NULLIF(Source.[maxValue], Target.[maxValue]) IS NOT NULL OR NULLIF(Target.[maxValue], Source.[maxValue]) IS NOT NULL OR 
	NULLIF(Source.[maxValueMessage], Target.[maxValueMessage]) IS NOT NULL OR NULLIF(Target.[maxValueMessage], Source.[maxValueMessage]) IS NOT NULL OR 
	NULLIF(Source.[RegExp], Target.[RegExp]) IS NOT NULL OR NULLIF(Target.[RegExp], Source.[RegExp]) IS NOT NULL OR 
	NULLIF(Source.[RegExpText], Target.[RegExpText]) IS NOT NULL OR NULLIF(Target.[RegExpText], Source.[RegExpText]) IS NOT NULL OR 
	NULLIF(Source.[OnChangeJsFunction], Target.[OnChangeJsFunction]) IS NOT NULL OR NULLIF(Target.[OnChangeJsFunction], Source.[OnChangeJsFunction]) IS NOT NULL OR 
	NULLIF(Source.[OnChangeProcessName], Target.[OnChangeProcessName]) IS NOT NULL OR NULLIF(Target.[OnChangeProcessName], Source.[OnChangeProcessName]) IS NOT NULL OR 
	NULLIF(Source.[PlaceHolder], Target.[PlaceHolder]) IS NOT NULL OR NULLIF(Target.[PlaceHolder], Source.[PlaceHolder]) IS NOT NULL OR 
	NULLIF(Source.[IconName], Target.[IconName]) IS NOT NULL OR NULLIF(Target.[IconName], Source.[IconName]) IS NOT NULL OR 
	NULLIF(Source.[ToolbarName], Target.[ToolbarName]) IS NOT NULL OR NULLIF(Target.[ToolbarName], Source.[ToolbarName]) IS NOT NULL OR 
	NULLIF(Source.[Separator], Target.[Separator]) IS NOT NULL OR NULLIF(Target.[Separator], Source.[Separator]) IS NOT NULL OR 
	NULLIF(Source.[CascadeDependencies], Target.[CascadeDependencies]) IS NOT NULL OR NULLIF(Target.[CascadeDependencies], Source.[CascadeDependencies]) IS NOT NULL OR 
	NULLIF(Source.[RootPathType], Target.[RootPathType]) IS NOT NULL OR NULLIF(Target.[RootPathType], Source.[RootPathType]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [Hide] = Source.[Hide], 
  [ParamTypeId] = Source.[ParamTypeId], 
  [TableName] = Source.[TableName], 
  [ObjectName] = Source.[ObjectName], 
  [DefaultValue] = Source.[DefaultValue], 
  [Label] = Source.[Label], 
  [IOTypeId] = Source.[IOTypeId], 
  [PositionX] = Source.[PositionX], 
  [PositionY] = Source.[PositionY], 
  [Width] = Source.[Width], 
  [Height] = Source.[Height], 
  [TypeId] = Source.[TypeId], 
  [Locked] = Source.[Locked], 
  [CustomPropName] = Source.[CustomPropName], 
  [Mask] = Source.[Mask], 
  [SQlSentence] = Source.[SQlSentence], 
  [SQLFilter] = Source.[SQLFilter], 
  [SQLValueField] = Source.[SQLValueField], 
  [SQLDisplayField] = Source.[SQLDisplayField], 
  [WhereSentence] = Source.[WhereSentence], 
  [DetachedFromProcess] = Source.[DetachedFromProcess], 
  [SearchFunction] = Source.[SearchFunction], 
  [SearchCollection] = Source.[SearchCollection], 
  [SearchWhere] = Source.[SearchWhere], 
  [SearchReturnFields] = Source.[SearchReturnFields], 
  [SecurityObject] = Source.[SecurityObject], 
  [AllowNew] = Source.[AllowNew], 
  [AllowNewFunction] = Source.[AllowNewFunction], 
  [AllowNewReturnFields] = Source.[AllowNewReturnFields], 
  [ObjNameLink] = Source.[ObjNameLink], 
  [ObjWhereLink] = Source.[ObjWhereLink], 
  [TargetIdLink] = Source.[TargetIdLink], 
  [Style] = Source.[Style], 
  [CSSClass] = Source.[CSSClass], 
  [LabelStyle] = Source.[LabelStyle], 
  [LabelCSSClass] = Source.[LabelCSSClass], 
  [DecimalPlaces] = Source.[DecimalPlaces], 
  [RootPath] = Source.[RootPath], 
  [FormatString] = Source.[FormatString], 
  [DirectTemplate] = Source.[DirectTemplate], 
  [Tag] = Source.[Tag], 
  [HelpId] = Source.[HelpId], 
  [ConnStringId] = Source.[ConnStringId], 
  [IsRequired] = Source.[IsRequired], 
  [IsRequiredMessage] = Source.[IsRequiredMessage], 
  [minValue] = Source.[minValue], 
  [minValueMessage] = Source.[minValueMessage], 
  [maxValue] = Source.[maxValue], 
  [maxValueMessage] = Source.[maxValueMessage], 
  [RegExp] = Source.[RegExp], 
  [RegExpText] = Source.[RegExpText], 
  [OnChangeJsFunction] = Source.[OnChangeJsFunction], 
  [OnChangeProcessName] = Source.[OnChangeProcessName], 
  [PlaceHolder] = Source.[PlaceHolder], 
  [IconName] = Source.[IconName], 
  [ToolbarName] = Source.[ToolbarName], 
  [Separator] = Source.[Separator], 
  [CascadeDependencies] = Source.[CascadeDependencies], 
  [RootPathType] = Source.[RootPathType], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([ProcessName],[ParamName],[Hide],[ParamTypeId],[TableName],[ObjectName],[DefaultValue],[Label],[IOTypeId],[PositionX],[PositionY],[Width],[Height],[TypeId],[Locked],[CustomPropName],[Mask],[SQlSentence],[SQLFilter],[SQLValueField],[SQLDisplayField],[WhereSentence],[DetachedFromProcess],[SearchFunction],[SearchCollection],[SearchWhere],[SearchReturnFields],[SecurityObject],[AllowNew],[AllowNewFunction],[AllowNewReturnFields],[ObjNameLink],[ObjWhereLink],[TargetIdLink],[Style],[CSSClass],[LabelStyle],[LabelCSSClass],[DecimalPlaces],[RootPath],[FormatString],[DirectTemplate],[Tag],[HelpId],[ConnStringId],[IsRequired],[IsRequiredMessage],[minValue],[minValueMessage],[maxValue],[maxValueMessage],[RegExp],[RegExpText],[OnChangeJsFunction],[OnChangeProcessName],[PlaceHolder],[IconName],[ToolbarName],[Separator],[CascadeDependencies],[RootPathType],[OriginId])
 VALUES(Source.[ProcessName],Source.[ParamName],Source.[Hide],Source.[ParamTypeId],Source.[TableName],Source.[ObjectName],Source.[DefaultValue],Source.[Label],Source.[IOTypeId],Source.[PositionX],Source.[PositionY],Source.[Width],Source.[Height],Source.[TypeId],Source.[Locked],Source.[CustomPropName],Source.[Mask],Source.[SQlSentence],Source.[SQLFilter],Source.[SQLValueField],Source.[SQLDisplayField],Source.[WhereSentence],Source.[DetachedFromProcess],Source.[SearchFunction],Source.[SearchCollection],Source.[SearchWhere],Source.[SearchReturnFields],Source.[SecurityObject],Source.[AllowNew],Source.[AllowNewFunction],Source.[AllowNewReturnFields],Source.[ObjNameLink],Source.[ObjWhereLink],Source.[TargetIdLink],Source.[Style],Source.[CSSClass],Source.[LabelStyle],Source.[LabelCSSClass],Source.[DecimalPlaces],Source.[RootPath],Source.[FormatString],Source.[DirectTemplate],Source.[Tag],Source.[HelpId],Source.[ConnStringId],Source.[IsRequired],Source.[IsRequiredMessage],Source.[minValue],Source.[minValueMessage],Source.[maxValue],Source.[maxValueMessage],Source.[RegExp],Source.[RegExpText],Source.[OnChangeJsFunction],Source.[OnChangeProcessName],Source.[PlaceHolder],Source.[IconName],Source.[ToolbarName],Source.[Separator],Source.[CascadeDependencies],Source.[RootPathType],Source.[OriginId])
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





