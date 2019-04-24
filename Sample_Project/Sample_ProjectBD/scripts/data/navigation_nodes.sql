

BEGIN TRY

MERGE INTO [Navigation_Nodes] AS Target
USING (VALUES
  (N'A6DF8870-7E22-434E-8DD2-0045DA21A731',N'ECB6657F-B6D6-42E4-868B-92B6A35E83D8',0,N'Clientes',N'client',N'Clientes',N'object',NULL,NULL,N'current',NULL,N'list',NULL,NULL,NULL,NULL,N'Clientes',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'F7B87123-FE0F-4CB1-88C6-069FEB1342EA',N'297FDCE2-24CB-4044-8EF1-EE012DEF84B8',0,N'On Change DLL Process',N'exchange',N'On Change DLL Process',N'help',NULL,NULL,N'current',NULL,NULL,NULL,NULL,N'highcode_dllchange',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'6A677D7F-ADBB-4A4E-B32D-2152DC5C0322',N'8B3C69F7-1B15-4E9C-8AE6-8939AB3AD98E',0,N'Contacto',N'contactos',N'Nuevo Contacto',N'object',NULL,NULL,N'current',NULL,N'edit',NULL,NULL,NULL,NULL,N'Contacto',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'BE0380A9-2004-4E81-9DB7-26D9389812AF',N'297FDCE2-24CB-4044-8EF1-EE012DEF84B8',2,N'Collection Process DLL',N'object-relations',N'Collection Process DLL',N'help',NULL,NULL,N'current',NULL,NULL,NULL,NULL,N'highcode_dllcollectionprocess',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'485B6E7B-8CD2-40DF-801A-36BEBC86AD2A',N'40EA9B60-F359-4AC3-81E6-9A47EE7ABFB4',1,N'Actividad',N'bullet-list',N'Actividad',N'group',NULL,NULL,N'current',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'B720EE36-69B6-4BAD-91B8-4211238BB522',N'CBB37F92-FEE4-4240-ABF6-708F0905CBAF',1,N'Object Process SP',N'object',N'Object Process SP',N'help',NULL,NULL,N'current',NULL,NULL,NULL,NULL,N'highcode_spobjectprocess',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'39602511-BD6C-4018-BD45-549BD3FAAB9C',N'485B6E7B-8CD2-40DF-801A-36BEBC86AD2A',1,N'Acciones',N'accounting-operations',N'Gestión de acciones',N'group',NULL,NULL,N'current',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'A485FCFA-900E-4F51-9D9C-55395E54BC95',N'8B3C69F7-1B15-4E9C-8AE6-8939AB3AD98E',0,N'Cliente',N'client',N'Cliente',N'object',NULL,NULL,N'current',NULL,N'edit',NULL,NULL,NULL,NULL,N'Cliente',NULL,N'{"IdState":"2"}',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'2EC89500-659B-4BAB-97A1-5ACF69E32704',N'ECB6657F-B6D6-42E4-868B-92B6A35E83D8',0,N'Contactos',N'contacts2',N'Contactos',N'object',NULL,NULL,N'current',NULL,N'list',NULL,NULL,NULL,NULL,N'Contactos',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'92A1E571-EFD4-4B80-8987-64095E36570C',N'1DD2F673-183A-4486-990B-7601C0258B34',1,N'Calendario',N'calendar-month',N'Calendario de ventas',N'page',NULL,NULL,N'current',NULL,NULL,N'Ventas_calendario',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'2CEA3CEE-975B-4E2B-B385-67DE6E01F8A5',N'8B3C69F7-1B15-4E9C-8AE6-8939AB3AD98E',0,N'Venta',N'cart',N'Nuevo Venta',N'object',NULL,NULL,N'current',NULL,N'edit',NULL,NULL,NULL,NULL,N'Venta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'CBB37F92-FEE4-4240-ABF6-708F0905CBAF',N'CFB79697-E115-4D3B-ADC1-B79E9916C6B4',0,N'Stored Procedures',N'sql-1',N'Stored Procedures',N'text',NULL,NULL,N'current',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'1DD2F673-183A-4486-990B-7601C0258B34',N'485B6E7B-8CD2-40DF-801A-36BEBC86AD2A',0,N'Gestión de ventas',N'cart',N'Ventas',N'group',NULL,NULL,N'current',NULL,N'list',NULL,NULL,NULL,NULL,N'Ventas',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'D42673DA-0544-4E53-B179-7DD324F994C6',N'CBB37F92-FEE4-4240-ABF6-708F0905CBAF',2,N'Collection Process SP',N'object-relations',N'Collection Process SP',N'help',NULL,NULL,N'current',NULL,NULL,NULL,NULL,N'highcode_dllcollectionprocess',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'C9C45950-C7D9-4DEA-B18E-80777B6CC957',N'1DD2F673-183A-4486-990B-7601C0258B34',0,N'Ventas',N'fa-money',N'Ventas',N'object',NULL,NULL,N'current',NULL,N'list',NULL,NULL,NULL,NULL,N'Ventas',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'8B3C69F7-1B15-4E9C-8AE6-8939AB3AD98E',N'40EA9B60-F359-4AC3-81E6-9A47EE7ABFB4',0,N'Nuevo',N'fa-plus',N'Nuevo',N'group',NULL,NULL,N'current',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'ECB6657F-B6D6-42E4-868B-92B6A35E83D8',N'40EA9B60-F359-4AC3-81E6-9A47EE7ABFB4',2,N'Gestión de clientes',N'client',N'Gestión de clientes',N'group',NULL,NULL,N'current',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'1FACD9DE-CC7E-46EA-89A1-9608A06B1155',N'CBB37F92-FEE4-4240-ABF6-708F0905CBAF',0,N'XML Crud SP',N'sql-letters',N'XML Crud SP',N'help',NULL,NULL,N'current',NULL,NULL,NULL,NULL,N'highcode_spcrud',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'40EA9B60-F359-4AC3-81E6-9A47EE7ABFB4',N'25A4B4D5-44AE-4CF1-8733-568F00F31520',1,N'LowCode',N'html-editor',N'Demo',N'text',NULL,NULL,N'current',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'075BB445-8A7A-469B-B8AF-9ABFE619B30E',N'40EA9B60-F359-4AC3-81E6-9A47EE7ABFB4',3,N'Otros',N'object-group',N'Otros',N'group',NULL,NULL,N'current',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'DB31231E-69E8-424B-A162-9CEAC5758AA7',N'075BB445-8A7A-469B-B8AF-9ABFE619B30E',0,N'Empleados',N'employees',N'Empleados',N'object',NULL,NULL,N'current',NULL,N'list',NULL,NULL,NULL,NULL,N'Employees',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'3082FD78-E794-41B2-A7C0-B03130AD2033',N'39602511-BD6C-4018-BD45-549BD3FAAB9C',0,N'Kanban',N'noicon',N'Kanban',N'page',NULL,NULL,N'current',NULL,NULL,N'acciones_kanban',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'CFB79697-E115-4D3B-ADC1-B79E9916C6B4',N'25A4B4D5-44AE-4CF1-8733-568F00F31520',0,N'High Code',N'code-1',N'High Code',N'text',NULL,NULL,N'current',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'438DE8BE-0618-425A-B2E9-C0A5A1D7A332',N'39602511-BD6C-4018-BD45-549BD3FAAB9C',0,N'Calendario de acciones',N'calendar-check-o',N'Calendario',N'page',NULL,NULL,N'current',NULL,NULL,N'Acciones_calendario',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'7CF04E8D-3872-48C1-A3F0-C37A589A6318',N'39602511-BD6C-4018-BD45-549BD3FAAB9C',0,N'Acciones',N'accounting-operations',N'Acciones',N'object',NULL,NULL,N'current',NULL,N'list',NULL,NULL,NULL,NULL,N'Acciones',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'C7EA03FB-5E8B-494B-AAB9-C5C8532B5126',N'8B3C69F7-1B15-4E9C-8AE6-8939AB3AD98E',0,N'Acción',N'accounting-operations',N'Acción',N'object',NULL,NULL,N'current',NULL,N'edit',NULL,NULL,NULL,NULL,N'Accion',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'9E3AC16F-78A8-42B0-AD9F-DAC6257C88F7',N'CFB79697-E115-4D3B-ADC1-B79E9916C6B4',2,N'Javascript',N'javascript',N'Javascript',N'text',NULL,NULL,N'current',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'DD80308A-C0AC-490C-968A-DDBA4C65D6F8',N'ECB6657F-B6D6-42E4-868B-92B6A35E83D8',0,N'Flexygo',N'flx-facebook',N'Flexygo',N'object',NULL,NULL,N'current',NULL,N'view',NULL,NULL,NULL,NULL,N'Cliente',N'(Client.IdClient=1)',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'27EC9585-51D0-4DC0-8253-ED6D0CC7A666',N'297FDCE2-24CB-4044-8EF1-EE012DEF84B8',0,N'Object Process DLL',N'object',N'Object Process DLL',N'help',NULL,NULL,N'current',NULL,NULL,NULL,NULL,N'highcode_dllobjectprocess',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'297FDCE2-24CB-4044-8EF1-EE012DEF84B8',N'CFB79697-E115-4D3B-ADC1-B79E9916C6B4',1,N'Dlls',N'gears',N'Dlls Processes',N'text',NULL,NULL,N'current',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'66CD10A1-5401-496D-8040-F4296BA8FC17',N'297FDCE2-24CB-4044-8EF1-EE012DEF84B8',1,N'CRUD DLL',N'fa-code',N'CRUD DLL',N'help',NULL,NULL,N'current',NULL,NULL,NULL,NULL,N'highcode_dllcrud',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
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





