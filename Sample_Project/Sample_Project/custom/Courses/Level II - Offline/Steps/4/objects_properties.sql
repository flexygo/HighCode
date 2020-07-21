

BEGIN TRY

MERGE INTO [Objects_Properties] AS Target
USING (VALUES
  (N'Offline_Accion',N'ActionId',N'Id',0,0,3,1,1,0,1,N'number',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'popup',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'hashtag',NULL,N'|',1,NULL,0,N'RelativePath',NULL,NULL,NULL,NULL,1,2)
 ,(N'Offline_Accion',N'ActionState',N'Estado',2,0,5,1,0,0,1,N'dbcombo',0,NULL,NULL,N'select State, Descrip, CssClass from Action_States order by State',NULL,NULL,N'State',N'Descrip',N'Offline_Accion',N'action_states',N'select State, Descrip, CssClass from Action_States',N'Descrip',NULL,N'2',0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'popup',NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'<div class="{{CssClass}}"> {{Descrip}}</div>',NULL,NULL,N'DataConnectionString',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'bullet-list',NULL,N'|',0,NULL,0,N'RelativePath',NULL,NULL,NULL,NULL,1,2)
 ,(N'Offline_Accion',N'ActionType',N'Tipo',1,0,5,1,0,0,1,N'dbcombo',0,NULL,NULL,N'select ActionType, Descrip, CssClass from Action_Types order by Descrip',NULL,NULL,N'ActionType',N'Descrip',N'Offline_Accion',N'action_types',N'select ActionType, Descrip, CssClass from Action_Types',N'Descrip',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'popup',NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'<div><span class="{{CssClass}}"></span> {{Descrip}}</div>',NULL,NULL,N'DataConnectionString',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'bullet-list',NULL,N'|',0,NULL,0,N'RelativePath',NULL,NULL,NULL,NULL,1,2)
 ,(N'Offline_Accion',N'AprovalDoc',N'DNI',10,5,4,1,0,0,1,N'text',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'popup',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'vcard',NULL,N'|',0,NULL,0,N'RelativePath',NULL,NULL,NULL,NULL,1,2)
 ,(N'Offline_Accion',N'AprovalName',N'Firmante',10,0,5,1,0,0,1,N'text',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'popup',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'text',NULL,N'|',0,NULL,0,N'RelativePath',NULL,NULL,NULL,NULL,1,2)
 ,(N'Offline_Accion',N'Comment',N'Comentario',5,0,12,2,0,0,1,N'multiline',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'popup',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'text',NULL,N'|',0,NULL,0,N'RelativePath',NULL,NULL,NULL,NULL,1,2)
 ,(N'Offline_Accion',N'Date',N'Fecha',3,0,5,1,0,0,1,N'datetime',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'{{currentDateTime}}',0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'popup',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'calendar-day',NULL,N'|',0,NULL,0,N'RelativePath',NULL,NULL,NULL,NULL,1,2)
 ,(N'Offline_Accion',N'EndDate',N'Fin',4,0,5,1,0,0,1,N'datetime',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'{{currentDateTime}}',0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'popup',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'calendar-day',NULL,N'|',0,NULL,0,N'RelativePath',NULL,NULL,NULL,NULL,1,2)
 ,(N'Offline_Accion',N'IdClient',N'Cliente',7,0,12,1,0,0,1,N'dbcombo',0,N'Cliente_Offline',NULL,NULL,NULL,NULL,N'IdClient',N'Name',N'Offline_Cliente',NULL,N'Select IdClient, Name from Client',N'Name',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'popup',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'DataConnectionString',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'client',NULL,N'|',0,NULL,0,N'RelativePath',NULL,NULL,NULL,NULL,1,2)
 ,(N'Offline_Accion',N'IdEmployee',N'Empleado',8,0,8,1,0,0,1,N'dbcombo',0,N'ComboIdEmployee_Offline',NULL,NULL,NULL,NULL,N'IdEmployee',N'Name',N'Offline_Accion',N'Employee',NULL,NULL,NULL,N'{{currentReference}}',0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'popup',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'DataConnectionString',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'employees',NULL,N'|',0,NULL,0,N'RelativePath',NULL,NULL,NULL,NULL,1,2)
 ,(N'Offline_Accion',N'Location',N'Localización',10,9,3,1,0,0,1,N'text',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'popup',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'location-2',NULL,N'|',0,NULL,0,N'RelativePath',NULL,NULL,NULL,NULL,1,2)
 ,(N'Offline_Accion',N'Signature',N'Firma',11,0,12,3,0,0,1,N'whiteboard',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'popup',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'signature',NULL,N'|',0,NULL,0,N'RelativePath',NULL,NULL,NULL,NULL,1,2)
 ,(N'Offline_Cliente',N'Address',N'Dirección',2,0,12,1,0,0,1,N'text',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'popup',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'map-1',NULL,N'|',0,NULL,0,N'RelativePath',NULL,NULL,NULL,NULL,1,2)
 ,(N'Offline_Cliente',N'City',N'City',3,8,4,1,0,0,1,N'text',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'popup',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'|',0,NULL,0,N'RelativePath',NULL,NULL,NULL,NULL,1,2)
 ,(N'Offline_Cliente',N'IdClient',N'Código',0,0,4,1,0,0,1,N'number',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'popup',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'hashtag',NULL,N'|',1,NULL,0,N'RelativePath',NULL,NULL,NULL,NULL,1,2)
 ,(N'Offline_Cliente',N'Mail',N'Mail',1,4,5,1,0,0,1,N'email',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'popup',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'email-1',NULL,N'|',0,NULL,0,N'RelativePath',NULL,NULL,NULL,NULL,1,2)
 ,(N'Offline_Cliente',N'Name',N'Nombre',0,4,8,1,0,0,1,N'text',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'popup',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'text',NULL,N'|',0,NULL,0,N'RelativePath',NULL,NULL,NULL,NULL,1,2)
 ,(N'Offline_Cliente',N'Phone',N'Teléfono',1,0,4,1,0,0,1,N'phone',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'popup',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'flx-phone',NULL,N'|',0,NULL,0,N'RelativePath',NULL,NULL,NULL,NULL,1,2)
 ,(N'Offline_Cliente',N'Postcode',N'CP',3,0,4,1,0,0,1,N'text',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'popup',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'|',0,NULL,0,N'RelativePath',NULL,NULL,NULL,NULL,1,2)
 ,(N'Offline_Cliente',N'Province',N'Provincia',3,4,4,1,0,0,1,N'text',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'popup',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'|',0,NULL,0,N'RelativePath',NULL,NULL,NULL,NULL,1,2)
) AS Source ([ObjectName],[PropertyName],[Label],[PositionY],[PositionX],[Width],[Height],[Hide],[ClientReadOnly],[FormDisplay],[TypeId],[Locked],[CustomPropName],[Mask],[SQlSentence],[SQLEditSentence],[SQLFilter],[SQLValueField],[SQLDisplayField],[SQLObjectName],[SQLViewName],[SQLOfflineSentence],[SQLOfflineOrderBy],[WhereSentence],[DefaultValue],[PersistDefaultValue],[IgnoreDBDefaultValue],[DetachedFromDB],[SearchFunction],[SearchCollection],[SearchWhere],[SearchReturnFields],[SecurityObject],[AllowNew],[AllowNewFunction],[AllowNewReturnFields],[ObjNameLink],[ObjWhereLink],[TargetIdLink],[Style],[CSSClass],[LabelStyle],[LabelCSSClass],[DecimalPlaces],[RootPath],[FormatString],[DirectTemplate],[Tag],[HelpId],[ConnStringId],[IsRequired],[IsRequiredMessage],[minValue],[minValueMessage],[maxValue],[maxValueMessage],[RegExp],[RegExpText],[SQLValidator],[ValidatorMessage],[OnChangeJsFunction],[OnChangeProcessName],[PlaceHolder],[IconName],[ToolbarName],[Separator],[AutoIncrement],[AutoIncrementFunction],[CascadeDependencies],[RootPathType],[PageSize],[ImageCompressionType],[ImageMaxWidth],[ImageMaxHeight],[Offline],[OriginId])
ON (Target.[ObjectName] = Source.[ObjectName] AND Target.[PropertyName] = Source.[PropertyName])
WHEN MATCHED AND (
	NULLIF(Source.[Label], Target.[Label]) IS NOT NULL OR NULLIF(Target.[Label], Source.[Label]) IS NOT NULL OR 
	NULLIF(Source.[PositionY], Target.[PositionY]) IS NOT NULL OR NULLIF(Target.[PositionY], Source.[PositionY]) IS NOT NULL OR 
	NULLIF(Source.[PositionX], Target.[PositionX]) IS NOT NULL OR NULLIF(Target.[PositionX], Source.[PositionX]) IS NOT NULL OR 
	NULLIF(Source.[Width], Target.[Width]) IS NOT NULL OR NULLIF(Target.[Width], Source.[Width]) IS NOT NULL OR 
	NULLIF(Source.[Height], Target.[Height]) IS NOT NULL OR NULLIF(Target.[Height], Source.[Height]) IS NOT NULL OR 
	NULLIF(Source.[Hide], Target.[Hide]) IS NOT NULL OR NULLIF(Target.[Hide], Source.[Hide]) IS NOT NULL OR 
	NULLIF(Source.[ClientReadOnly], Target.[ClientReadOnly]) IS NOT NULL OR NULLIF(Target.[ClientReadOnly], Source.[ClientReadOnly]) IS NOT NULL OR 
	NULLIF(Source.[FormDisplay], Target.[FormDisplay]) IS NOT NULL OR NULLIF(Target.[FormDisplay], Source.[FormDisplay]) IS NOT NULL OR 
	NULLIF(Source.[TypeId], Target.[TypeId]) IS NOT NULL OR NULLIF(Target.[TypeId], Source.[TypeId]) IS NOT NULL OR 
	NULLIF(Source.[Locked], Target.[Locked]) IS NOT NULL OR NULLIF(Target.[Locked], Source.[Locked]) IS NOT NULL OR 
	NULLIF(Source.[CustomPropName], Target.[CustomPropName]) IS NOT NULL OR NULLIF(Target.[CustomPropName], Source.[CustomPropName]) IS NOT NULL OR 
	NULLIF(Source.[Mask], Target.[Mask]) IS NOT NULL OR NULLIF(Target.[Mask], Source.[Mask]) IS NOT NULL OR 
	NULLIF(Source.[SQlSentence], Target.[SQlSentence]) IS NOT NULL OR NULLIF(Target.[SQlSentence], Source.[SQlSentence]) IS NOT NULL OR 
	NULLIF(Source.[SQLEditSentence], Target.[SQLEditSentence]) IS NOT NULL OR NULLIF(Target.[SQLEditSentence], Source.[SQLEditSentence]) IS NOT NULL OR 
	NULLIF(Source.[SQLFilter], Target.[SQLFilter]) IS NOT NULL OR NULLIF(Target.[SQLFilter], Source.[SQLFilter]) IS NOT NULL OR 
	NULLIF(Source.[SQLValueField], Target.[SQLValueField]) IS NOT NULL OR NULLIF(Target.[SQLValueField], Source.[SQLValueField]) IS NOT NULL OR 
	NULLIF(Source.[SQLDisplayField], Target.[SQLDisplayField]) IS NOT NULL OR NULLIF(Target.[SQLDisplayField], Source.[SQLDisplayField]) IS NOT NULL OR 
	NULLIF(Source.[SQLObjectName], Target.[SQLObjectName]) IS NOT NULL OR NULLIF(Target.[SQLObjectName], Source.[SQLObjectName]) IS NOT NULL OR 
	NULLIF(Source.[SQLViewName], Target.[SQLViewName]) IS NOT NULL OR NULLIF(Target.[SQLViewName], Source.[SQLViewName]) IS NOT NULL OR 
	NULLIF(Source.[SQLOfflineSentence], Target.[SQLOfflineSentence]) IS NOT NULL OR NULLIF(Target.[SQLOfflineSentence], Source.[SQLOfflineSentence]) IS NOT NULL OR 
	NULLIF(Source.[SQLOfflineOrderBy], Target.[SQLOfflineOrderBy]) IS NOT NULL OR NULLIF(Target.[SQLOfflineOrderBy], Source.[SQLOfflineOrderBy]) IS NOT NULL OR 
	NULLIF(Source.[WhereSentence], Target.[WhereSentence]) IS NOT NULL OR NULLIF(Target.[WhereSentence], Source.[WhereSentence]) IS NOT NULL OR 
	NULLIF(Source.[DefaultValue], Target.[DefaultValue]) IS NOT NULL OR NULLIF(Target.[DefaultValue], Source.[DefaultValue]) IS NOT NULL OR 
	NULLIF(Source.[PersistDefaultValue], Target.[PersistDefaultValue]) IS NOT NULL OR NULLIF(Target.[PersistDefaultValue], Source.[PersistDefaultValue]) IS NOT NULL OR 
	NULLIF(Source.[IgnoreDBDefaultValue], Target.[IgnoreDBDefaultValue]) IS NOT NULL OR NULLIF(Target.[IgnoreDBDefaultValue], Source.[IgnoreDBDefaultValue]) IS NOT NULL OR 
	NULLIF(Source.[DetachedFromDB], Target.[DetachedFromDB]) IS NOT NULL OR NULLIF(Target.[DetachedFromDB], Source.[DetachedFromDB]) IS NOT NULL OR 
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
	NULLIF(Source.[SQLValidator], Target.[SQLValidator]) IS NOT NULL OR NULLIF(Target.[SQLValidator], Source.[SQLValidator]) IS NOT NULL OR 
	NULLIF(Source.[ValidatorMessage], Target.[ValidatorMessage]) IS NOT NULL OR NULLIF(Target.[ValidatorMessage], Source.[ValidatorMessage]) IS NOT NULL OR 
	NULLIF(Source.[OnChangeJsFunction], Target.[OnChangeJsFunction]) IS NOT NULL OR NULLIF(Target.[OnChangeJsFunction], Source.[OnChangeJsFunction]) IS NOT NULL OR 
	NULLIF(Source.[OnChangeProcessName], Target.[OnChangeProcessName]) IS NOT NULL OR NULLIF(Target.[OnChangeProcessName], Source.[OnChangeProcessName]) IS NOT NULL OR 
	NULLIF(Source.[PlaceHolder], Target.[PlaceHolder]) IS NOT NULL OR NULLIF(Target.[PlaceHolder], Source.[PlaceHolder]) IS NOT NULL OR 
	NULLIF(Source.[IconName], Target.[IconName]) IS NOT NULL OR NULLIF(Target.[IconName], Source.[IconName]) IS NOT NULL OR 
	NULLIF(Source.[ToolbarName], Target.[ToolbarName]) IS NOT NULL OR NULLIF(Target.[ToolbarName], Source.[ToolbarName]) IS NOT NULL OR 
	NULLIF(Source.[Separator], Target.[Separator]) IS NOT NULL OR NULLIF(Target.[Separator], Source.[Separator]) IS NOT NULL OR 
	NULLIF(Source.[AutoIncrement], Target.[AutoIncrement]) IS NOT NULL OR NULLIF(Target.[AutoIncrement], Source.[AutoIncrement]) IS NOT NULL OR 
	NULLIF(Source.[AutoIncrementFunction], Target.[AutoIncrementFunction]) IS NOT NULL OR NULLIF(Target.[AutoIncrementFunction], Source.[AutoIncrementFunction]) IS NOT NULL OR 
	NULLIF(Source.[CascadeDependencies], Target.[CascadeDependencies]) IS NOT NULL OR NULLIF(Target.[CascadeDependencies], Source.[CascadeDependencies]) IS NOT NULL OR 
	NULLIF(Source.[RootPathType], Target.[RootPathType]) IS NOT NULL OR NULLIF(Target.[RootPathType], Source.[RootPathType]) IS NOT NULL OR 
	NULLIF(Source.[PageSize], Target.[PageSize]) IS NOT NULL OR NULLIF(Target.[PageSize], Source.[PageSize]) IS NOT NULL OR 
	NULLIF(Source.[ImageCompressionType], Target.[ImageCompressionType]) IS NOT NULL OR NULLIF(Target.[ImageCompressionType], Source.[ImageCompressionType]) IS NOT NULL OR 
	NULLIF(Source.[ImageMaxWidth], Target.[ImageMaxWidth]) IS NOT NULL OR NULLIF(Target.[ImageMaxWidth], Source.[ImageMaxWidth]) IS NOT NULL OR 
	NULLIF(Source.[ImageMaxHeight], Target.[ImageMaxHeight]) IS NOT NULL OR NULLIF(Target.[ImageMaxHeight], Source.[ImageMaxHeight]) IS NOT NULL OR 
	NULLIF(Source.[Offline], Target.[Offline]) IS NOT NULL OR NULLIF(Target.[Offline], Source.[Offline]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [Label] = Source.[Label], 
  [PositionY] = Source.[PositionY], 
  [PositionX] = Source.[PositionX], 
  [Width] = Source.[Width], 
  [Height] = Source.[Height], 
  [Hide] = Source.[Hide], 
  [ClientReadOnly] = Source.[ClientReadOnly], 
  [FormDisplay] = Source.[FormDisplay], 
  [TypeId] = Source.[TypeId], 
  [Locked] = Source.[Locked], 
  [CustomPropName] = Source.[CustomPropName], 
  [Mask] = Source.[Mask], 
  [SQlSentence] = Source.[SQlSentence], 
  [SQLEditSentence] = Source.[SQLEditSentence], 
  [SQLFilter] = Source.[SQLFilter], 
  [SQLValueField] = Source.[SQLValueField], 
  [SQLDisplayField] = Source.[SQLDisplayField], 
  [SQLObjectName] = Source.[SQLObjectName], 
  [SQLViewName] = Source.[SQLViewName], 
  [SQLOfflineSentence] = Source.[SQLOfflineSentence], 
  [SQLOfflineOrderBy] = Source.[SQLOfflineOrderBy], 
  [WhereSentence] = Source.[WhereSentence], 
  [DefaultValue] = Source.[DefaultValue], 
  [PersistDefaultValue] = Source.[PersistDefaultValue], 
  [IgnoreDBDefaultValue] = Source.[IgnoreDBDefaultValue], 
  [DetachedFromDB] = Source.[DetachedFromDB], 
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
  [SQLValidator] = Source.[SQLValidator], 
  [ValidatorMessage] = Source.[ValidatorMessage], 
  [OnChangeJsFunction] = Source.[OnChangeJsFunction], 
  [OnChangeProcessName] = Source.[OnChangeProcessName], 
  [PlaceHolder] = Source.[PlaceHolder], 
  [IconName] = Source.[IconName], 
  [ToolbarName] = Source.[ToolbarName], 
  [Separator] = Source.[Separator], 
  [AutoIncrement] = Source.[AutoIncrement], 
  [AutoIncrementFunction] = Source.[AutoIncrementFunction], 
  [CascadeDependencies] = Source.[CascadeDependencies], 
  [RootPathType] = Source.[RootPathType], 
  [PageSize] = Source.[PageSize], 
  [ImageCompressionType] = Source.[ImageCompressionType], 
  [ImageMaxWidth] = Source.[ImageMaxWidth], 
  [ImageMaxHeight] = Source.[ImageMaxHeight], 
  [Offline] = Source.[Offline], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([ObjectName],[PropertyName],[Label],[PositionY],[PositionX],[Width],[Height],[Hide],[ClientReadOnly],[FormDisplay],[TypeId],[Locked],[CustomPropName],[Mask],[SQlSentence],[SQLEditSentence],[SQLFilter],[SQLValueField],[SQLDisplayField],[SQLObjectName],[SQLViewName],[SQLOfflineSentence],[SQLOfflineOrderBy],[WhereSentence],[DefaultValue],[PersistDefaultValue],[IgnoreDBDefaultValue],[DetachedFromDB],[SearchFunction],[SearchCollection],[SearchWhere],[SearchReturnFields],[SecurityObject],[AllowNew],[AllowNewFunction],[AllowNewReturnFields],[ObjNameLink],[ObjWhereLink],[TargetIdLink],[Style],[CSSClass],[LabelStyle],[LabelCSSClass],[DecimalPlaces],[RootPath],[FormatString],[DirectTemplate],[Tag],[HelpId],[ConnStringId],[IsRequired],[IsRequiredMessage],[minValue],[minValueMessage],[maxValue],[maxValueMessage],[RegExp],[RegExpText],[SQLValidator],[ValidatorMessage],[OnChangeJsFunction],[OnChangeProcessName],[PlaceHolder],[IconName],[ToolbarName],[Separator],[AutoIncrement],[AutoIncrementFunction],[CascadeDependencies],[RootPathType],[PageSize],[ImageCompressionType],[ImageMaxWidth],[ImageMaxHeight],[Offline],[OriginId])
 VALUES(Source.[ObjectName],Source.[PropertyName],Source.[Label],Source.[PositionY],Source.[PositionX],Source.[Width],Source.[Height],Source.[Hide],Source.[ClientReadOnly],Source.[FormDisplay],Source.[TypeId],Source.[Locked],Source.[CustomPropName],Source.[Mask],Source.[SQlSentence],Source.[SQLEditSentence],Source.[SQLFilter],Source.[SQLValueField],Source.[SQLDisplayField],Source.[SQLObjectName],Source.[SQLViewName],Source.[SQLOfflineSentence],Source.[SQLOfflineOrderBy],Source.[WhereSentence],Source.[DefaultValue],Source.[PersistDefaultValue],Source.[IgnoreDBDefaultValue],Source.[DetachedFromDB],Source.[SearchFunction],Source.[SearchCollection],Source.[SearchWhere],Source.[SearchReturnFields],Source.[SecurityObject],Source.[AllowNew],Source.[AllowNewFunction],Source.[AllowNewReturnFields],Source.[ObjNameLink],Source.[ObjWhereLink],Source.[TargetIdLink],Source.[Style],Source.[CSSClass],Source.[LabelStyle],Source.[LabelCSSClass],Source.[DecimalPlaces],Source.[RootPath],Source.[FormatString],Source.[DirectTemplate],Source.[Tag],Source.[HelpId],Source.[ConnStringId],Source.[IsRequired],Source.[IsRequiredMessage],Source.[minValue],Source.[minValueMessage],Source.[maxValue],Source.[maxValueMessage],Source.[RegExp],Source.[RegExpText],Source.[SQLValidator],Source.[ValidatorMessage],Source.[OnChangeJsFunction],Source.[OnChangeProcessName],Source.[PlaceHolder],Source.[IconName],Source.[ToolbarName],Source.[Separator],Source.[AutoIncrement],Source.[AutoIncrementFunction],Source.[CascadeDependencies],Source.[RootPathType],Source.[PageSize],Source.[ImageCompressionType],Source.[ImageMaxWidth],Source.[ImageMaxHeight],Source.[Offline],Source.[OriginId])
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





