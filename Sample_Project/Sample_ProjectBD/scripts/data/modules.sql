

BEGIN TRY

MERGE INTO [Modules] AS Target
USING (VALUES
  (N'acciones_kanban',N'flx-kanban',N'project',N'Equipo',N'IdTeam=1',N'Acciones kanban',N'Acciones kanban',N'default',1,1,1,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'columns',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,N'acciones_kanban_config',NULL,NULL,1)
 ,(N'calendario_acciones',N'flx-scheduler',N'project',N'sysScheduler',NULL,N'Calendario de Acciones',N'Calendario de acciones',N'default',1,1,1,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'calendar-month',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,N'Calendario_acciones',NULL,NULL,NULL,NULL,1)
 ,(N'calendario_ventas',N'flx-scheduler',N'project',N'sysScheduler',NULL,N'Calendario de ventas',N'Calendario de ventas',N'default',1,1,1,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'calendar-month',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,N'Calendario_ventas',NULL,NULL,NULL,NULL,1)
 ,(N'ClientesdeEmpleado',N'flx-objectlist',N'project',N'Clientes',N'Client.IdEmployee={{IdEmployee}}',N'Clientes de empleado',N'Sus clientes',N'none',1,1,1,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'noicon',NULL,NULL,NULL,NULL,NULL,N'ClienteDefaultList',NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,1)
 ,(N'Clients_Docs_CountDocuments',N'flx-sqllist',N'project',N'Cliente',NULL,N'Imágenes y documentos',N'Imágenes y documentos',N'none',1,1,1,0,N'select count(ImageId) as value, ''flx-icon icon-images-2'' as iconclass,''m'' as size, '''' as symbol,''Images'' as label, ''#ee9e1f'' as color, '''' as class,''sysObjectImages'' as CollectionName,
''Objects_Images.ObjectId=\''''{{IdClient}}\'''' and Objects_Images.ObjectName = \''''Cliente\'''''' as myWhere, ''{\''''ObjectId\'''':{{IdClient}},\''''ObjectName\'''':\''''Cliente\''''}'' as defaults  
from Objects_Images 
where objectname=''Cliente'' and ObjectId=''{{IdClient}}''

UNION

select count(DocGuid) as value, ''flx-icon icon-document'' as iconclass,''m'' as size, '''' as symbol,''Documents'' as label, ''#ee9e1f'' as color, '''' as class,''Documents_Object'' as CollectionName,
''Documents_Objects.ObjectId = \''''{{IdClient}}\'''' And Documents_Objects.ObjectName = \''''Cliente\'''''' as myWhere, ''{\''''ObjectId\'''':{{IdClient}},\''''ObjectName\'''':\''''Cliente\''''}'' as defaults  
from Documents_objects 
where objectname=''Cliente'' and ObjectId= ''{{IdClient}}''',N'<div class=""><ul class="col-12 easy-list easy-right">',N'
 <li class="easy-info"><span onclick="flexygo.nav.openPage(''list'',''{{CollectionName}}'',''{{myWhere}}'',''{{defaults}}'',''popup1024x678'',false,' + convert(nvarchar(max),NCHAR(36)) + N'(this))"><flx-easyinfo  class="{{class}}" color="{{color}}"  iconclass="{{iconclass}}" size="{{size}}"  value="{{value}}"  label="{{label}}"  symbol="{{symbol}}"></flx-easyinfo></span></li>

 
',N'</ul></div>',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'document',NULL,NULL,N'ConfConnectionString',NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,1)
 ,(N'Contacts_Related',N'flx-objectlist',N'project',N'Contactos',N'Contact.IdClient = {{IdClient}}',N'Contactos',N'Contactos',N'default',1,1,1,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'contacts2',NULL,NULL,NULL,N'systb-list',NULL,N'ContactoDefaultList',NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,1)
 ,(N'graficaVentas',N'flx-easypie',N'project',NULL,NULL,N'Gráfica de ventas',N'Gráfica de ventas',N'none',1,1,1,0,N'select ''<b>'' + Product.descrip + ''</b>'' as label, convert(int,sum(EconomicAmount) * 100.0 / (select sum(EconomicAmount)  from Sale) )as value,
case	
	when (select sum(EconomicAmount) * 100.0 / (select sum(EconomicAmount) from Sale)) BETWEEN 0 and 10 then ''#ff9191''
	when (select sum(EconomicAmount) * 100.0 / (select sum(EconomicAmount) from Sale)) BETWEEN 10 and 20 then ''#ffc27d''
	when (select sum(EconomicAmount) * 100.0 / (select sum(EconomicAmount) from Sale)) BETWEEN 20 and 50 then ''silver''
	when (select sum(EconomicAmount) * 100.0 / (select sum(EconomicAmount) from Sale)) BETWEEN 50 and 100 then ''#2db7b0''
end as Color , 2000 as animate
from Sale
inner join Sale_Product on Sale.IdSale = Sale_Product.IdSale
inner join Product on Sale_Product.IdProduct=Product.IdProduct
group by product.descrip
order by 1
',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'instagram',NULL,NULL,N'DataConnectionString',NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,1)
 ,(N'graficaVtasPorCliente',N'flx-easypie',N'project',NULL,NULL,N'Gráfica de ventas por cliente',N'Ventas',N'none',1,1,1,0,N'select ''<b>'' + Product.descrip + ''</b>'' as label, convert(int,sum(EconomicAmount) * 100.0 / (select sum(EconomicAmount)  from Sale) )as value,
case	
	when (select sum(EconomicAmount) * 100.0 / (select sum(EconomicAmount) from Sale)) BETWEEN 0 and 10 then ''#ff9191''
	when (select sum(EconomicAmount) * 100.0 / (select sum(EconomicAmount) from Sale)) BETWEEN 10 and 20 then ''#ffc27d''
	when (select sum(EconomicAmount) * 100.0 / (select sum(EconomicAmount) from Sale)) BETWEEN 20 and 50 then ''silver''
	when (select sum(EconomicAmount) * 100.0 / (select sum(EconomicAmount) from Sale)) BETWEEN 50 and 100 then ''#2db7b0''
end as Color , 2000 as animate
from Sale
inner join Sale_Product on Sale.IdSale = Sale_Product.IdSale
inner join Product on Sale_Product.IdProduct=Product.IdProduct
where Sale.IdClient = {{IdClient}}
group by product.descrip
order by 1
',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'instagram',NULL,NULL,N'DataConnectionString',NULL,NULL,NULL,NULL,N'hidden-s',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,1)
 ,(N'grafVtasxCliente',N'flx-chart',N'project',N'Cliente',N'Client.IdClient={{IdClient}}',N'Ventas grafico columnas',N'Ventas por año',N'none',1,1,1,0,N'SELECT client.name as Descrip, sum(sale.EconomicAmount) as Amount, LEFT(datename(MONTH, sale.date),3) as Month, YEAR(sale.date) as Year 
FROM sale 
INNER JOIN client on sale.idclient=client.IdClient GROUP BY client.name, sale.date  ',NULL,NULL,NULL,NULL,NULL,NULL,N'line',N'syscs-default-legendandlabels',N'Year',N'Month',N'Amount',NULL,NULL,NULL,NULL,N'noicon',NULL,NULL,N'DataConnectionString',NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,1)
 ,(N'mapa_de_clientes',N'flx-objectlist',N'project',N'Clientes',N'Client.IdEmployee={{currentReference}}',N'Mapa de clientes',N'Mapa de clientes',N'empty',1,1,1,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'noicon',NULL,NULL,NULL,N'systb-edit',NULL,N'Client-map',NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,1)
 ,(N'mimodulodeventas',N'flx-objectlist',N'project',N'{{ObjectName}}',N'{{ObjectWhere}}',N'mi Generic List de ventas',N'{{ObjectDescrip}}',N'default',1,1,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'sysobjecticon',N'syspager-listheader',100,NULL,N'systb-list',N'systb-row',NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,1)
 ,(N'misClientes',N'flx-objectlist',N'project',N'Clientes',N'Client.IdEmployee={{currentReference}}',N'Mis clientes',N'Mis Clientes',N'none',1,1,1,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'clients',NULL,NULL,NULL,NULL,NULL,N'ClienteDefaultList',NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,1)
 ,(N'ventas_list_filtrada',N'flx-objectlist',N'project',N'Ventas',N'{{ObjectWhere}}',N'lista de ventas con filtro',N'{{ObjectDescrip}}',N'default',1,1,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'dollar',N'syspager-listheader',100,NULL,N'systb-list',N'systb-row',NULL,NULL,NULL,N'Capture_moduleReady()',0,0,0,NULL,NULL,NULL,NULL,NULL,1)
 ,(N'Ventas_Totales',N'flx-objectlist',N'project',N'Ventas',NULL,N'Total de ventas',N'Total de ventas',N'none',1,1,1,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'noicon',NULL,NULL,NULL,NULL,NULL,N'venta_totales',NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,1)
) AS Source ([ModuleName],[TypeId],[ClassId],[ObjectName],[ObjectFilter],[Descrip],[Title],[ContainerId],[CollapsibleButton],[FullscreenButton],[RefreshButton],[SearchButton],[SQlSentence],[Header],[HTMLText],[Footer],[Empty],[CssText],[ScriptText],[ChartTypeId],[ChartSettingName],[Series],[Labels],[Value],[Params],[JsonOptions],[Path],[TransFormFilePath],[IconName],[PagerId],[PageSize],[ConnStringID],[ToolbarName],[GridbarName],[TemplateId],[HeaderClass],[ModuleClass],[JSAfterLoad],[Searcher],[ShowWhenNew],[ManualInit],[SchedulerName],[TimelineSettingName],[KanbanSettingsName],[ChartBackground],[ChartBorder],[OriginId])
ON (Target.[ModuleName] = Source.[ModuleName])
WHEN MATCHED AND (
	NULLIF(Source.[TypeId], Target.[TypeId]) IS NOT NULL OR NULLIF(Target.[TypeId], Source.[TypeId]) IS NOT NULL OR 
	NULLIF(Source.[ClassId], Target.[ClassId]) IS NOT NULL OR NULLIF(Target.[ClassId], Source.[ClassId]) IS NOT NULL OR 
	NULLIF(Source.[ObjectName], Target.[ObjectName]) IS NOT NULL OR NULLIF(Target.[ObjectName], Source.[ObjectName]) IS NOT NULL OR 
	NULLIF(Source.[ObjectFilter], Target.[ObjectFilter]) IS NOT NULL OR NULLIF(Target.[ObjectFilter], Source.[ObjectFilter]) IS NOT NULL OR 
	NULLIF(Source.[Descrip], Target.[Descrip]) IS NOT NULL OR NULLIF(Target.[Descrip], Source.[Descrip]) IS NOT NULL OR 
	NULLIF(Source.[Title], Target.[Title]) IS NOT NULL OR NULLIF(Target.[Title], Source.[Title]) IS NOT NULL OR 
	NULLIF(Source.[ContainerId], Target.[ContainerId]) IS NOT NULL OR NULLIF(Target.[ContainerId], Source.[ContainerId]) IS NOT NULL OR 
	NULLIF(Source.[CollapsibleButton], Target.[CollapsibleButton]) IS NOT NULL OR NULLIF(Target.[CollapsibleButton], Source.[CollapsibleButton]) IS NOT NULL OR 
	NULLIF(Source.[FullscreenButton], Target.[FullscreenButton]) IS NOT NULL OR NULLIF(Target.[FullscreenButton], Source.[FullscreenButton]) IS NOT NULL OR 
	NULLIF(Source.[RefreshButton], Target.[RefreshButton]) IS NOT NULL OR NULLIF(Target.[RefreshButton], Source.[RefreshButton]) IS NOT NULL OR 
	NULLIF(Source.[SearchButton], Target.[SearchButton]) IS NOT NULL OR NULLIF(Target.[SearchButton], Source.[SearchButton]) IS NOT NULL OR 
	NULLIF(Source.[SQlSentence], Target.[SQlSentence]) IS NOT NULL OR NULLIF(Target.[SQlSentence], Source.[SQlSentence]) IS NOT NULL OR 
	NULLIF(Source.[Header], Target.[Header]) IS NOT NULL OR NULLIF(Target.[Header], Source.[Header]) IS NOT NULL OR 
	NULLIF(Source.[HTMLText], Target.[HTMLText]) IS NOT NULL OR NULLIF(Target.[HTMLText], Source.[HTMLText]) IS NOT NULL OR 
	NULLIF(Source.[Footer], Target.[Footer]) IS NOT NULL OR NULLIF(Target.[Footer], Source.[Footer]) IS NOT NULL OR 
	NULLIF(Source.[Empty], Target.[Empty]) IS NOT NULL OR NULLIF(Target.[Empty], Source.[Empty]) IS NOT NULL OR 
	NULLIF(Source.[CssText], Target.[CssText]) IS NOT NULL OR NULLIF(Target.[CssText], Source.[CssText]) IS NOT NULL OR 
	NULLIF(Source.[ScriptText], Target.[ScriptText]) IS NOT NULL OR NULLIF(Target.[ScriptText], Source.[ScriptText]) IS NOT NULL OR 
	NULLIF(Source.[ChartTypeId], Target.[ChartTypeId]) IS NOT NULL OR NULLIF(Target.[ChartTypeId], Source.[ChartTypeId]) IS NOT NULL OR 
	NULLIF(Source.[ChartSettingName], Target.[ChartSettingName]) IS NOT NULL OR NULLIF(Target.[ChartSettingName], Source.[ChartSettingName]) IS NOT NULL OR 
	NULLIF(Source.[Series], Target.[Series]) IS NOT NULL OR NULLIF(Target.[Series], Source.[Series]) IS NOT NULL OR 
	NULLIF(Source.[Labels], Target.[Labels]) IS NOT NULL OR NULLIF(Target.[Labels], Source.[Labels]) IS NOT NULL OR 
	NULLIF(Source.[Value], Target.[Value]) IS NOT NULL OR NULLIF(Target.[Value], Source.[Value]) IS NOT NULL OR 
	NULLIF(Source.[Params], Target.[Params]) IS NOT NULL OR NULLIF(Target.[Params], Source.[Params]) IS NOT NULL OR 
	NULLIF(Source.[JsonOptions], Target.[JsonOptions]) IS NOT NULL OR NULLIF(Target.[JsonOptions], Source.[JsonOptions]) IS NOT NULL OR 
	NULLIF(Source.[Path], Target.[Path]) IS NOT NULL OR NULLIF(Target.[Path], Source.[Path]) IS NOT NULL OR 
	NULLIF(Source.[TransFormFilePath], Target.[TransFormFilePath]) IS NOT NULL OR NULLIF(Target.[TransFormFilePath], Source.[TransFormFilePath]) IS NOT NULL OR 
	NULLIF(Source.[IconName], Target.[IconName]) IS NOT NULL OR NULLIF(Target.[IconName], Source.[IconName]) IS NOT NULL OR 
	NULLIF(Source.[PagerId], Target.[PagerId]) IS NOT NULL OR NULLIF(Target.[PagerId], Source.[PagerId]) IS NOT NULL OR 
	NULLIF(Source.[PageSize], Target.[PageSize]) IS NOT NULL OR NULLIF(Target.[PageSize], Source.[PageSize]) IS NOT NULL OR 
	NULLIF(Source.[ConnStringID], Target.[ConnStringID]) IS NOT NULL OR NULLIF(Target.[ConnStringID], Source.[ConnStringID]) IS NOT NULL OR 
	NULLIF(Source.[ToolbarName], Target.[ToolbarName]) IS NOT NULL OR NULLIF(Target.[ToolbarName], Source.[ToolbarName]) IS NOT NULL OR 
	NULLIF(Source.[GridbarName], Target.[GridbarName]) IS NOT NULL OR NULLIF(Target.[GridbarName], Source.[GridbarName]) IS NOT NULL OR 
	NULLIF(Source.[TemplateId], Target.[TemplateId]) IS NOT NULL OR NULLIF(Target.[TemplateId], Source.[TemplateId]) IS NOT NULL OR 
	NULLIF(Source.[HeaderClass], Target.[HeaderClass]) IS NOT NULL OR NULLIF(Target.[HeaderClass], Source.[HeaderClass]) IS NOT NULL OR 
	NULLIF(Source.[ModuleClass], Target.[ModuleClass]) IS NOT NULL OR NULLIF(Target.[ModuleClass], Source.[ModuleClass]) IS NOT NULL OR 
	NULLIF(Source.[JSAfterLoad], Target.[JSAfterLoad]) IS NOT NULL OR NULLIF(Target.[JSAfterLoad], Source.[JSAfterLoad]) IS NOT NULL OR 
	NULLIF(Source.[Searcher], Target.[Searcher]) IS NOT NULL OR NULLIF(Target.[Searcher], Source.[Searcher]) IS NOT NULL OR 
	NULLIF(Source.[ShowWhenNew], Target.[ShowWhenNew]) IS NOT NULL OR NULLIF(Target.[ShowWhenNew], Source.[ShowWhenNew]) IS NOT NULL OR 
	NULLIF(Source.[ManualInit], Target.[ManualInit]) IS NOT NULL OR NULLIF(Target.[ManualInit], Source.[ManualInit]) IS NOT NULL OR 
	NULLIF(Source.[SchedulerName], Target.[SchedulerName]) IS NOT NULL OR NULLIF(Target.[SchedulerName], Source.[SchedulerName]) IS NOT NULL OR 
	NULLIF(Source.[TimelineSettingName], Target.[TimelineSettingName]) IS NOT NULL OR NULLIF(Target.[TimelineSettingName], Source.[TimelineSettingName]) IS NOT NULL OR 
	NULLIF(Source.[KanbanSettingsName], Target.[KanbanSettingsName]) IS NOT NULL OR NULLIF(Target.[KanbanSettingsName], Source.[KanbanSettingsName]) IS NOT NULL OR 
	NULLIF(Source.[ChartBackground], Target.[ChartBackground]) IS NOT NULL OR NULLIF(Target.[ChartBackground], Source.[ChartBackground]) IS NOT NULL OR 
	NULLIF(Source.[ChartBorder], Target.[ChartBorder]) IS NOT NULL OR NULLIF(Target.[ChartBorder], Source.[ChartBorder]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [TypeId] = Source.[TypeId], 
  [ClassId] = Source.[ClassId], 
  [ObjectName] = Source.[ObjectName], 
  [ObjectFilter] = Source.[ObjectFilter], 
  [Descrip] = Source.[Descrip], 
  [Title] = Source.[Title], 
  [ContainerId] = Source.[ContainerId], 
  [CollapsibleButton] = Source.[CollapsibleButton], 
  [FullscreenButton] = Source.[FullscreenButton], 
  [RefreshButton] = Source.[RefreshButton], 
  [SearchButton] = Source.[SearchButton], 
  [SQlSentence] = Source.[SQlSentence], 
  [Header] = Source.[Header], 
  [HTMLText] = Source.[HTMLText], 
  [Footer] = Source.[Footer], 
  [Empty] = Source.[Empty], 
  [CssText] = Source.[CssText], 
  [ScriptText] = Source.[ScriptText], 
  [ChartTypeId] = Source.[ChartTypeId], 
  [ChartSettingName] = Source.[ChartSettingName], 
  [Series] = Source.[Series], 
  [Labels] = Source.[Labels], 
  [Value] = Source.[Value], 
  [Params] = Source.[Params], 
  [JsonOptions] = Source.[JsonOptions], 
  [Path] = Source.[Path], 
  [TransFormFilePath] = Source.[TransFormFilePath], 
  [IconName] = Source.[IconName], 
  [PagerId] = Source.[PagerId], 
  [PageSize] = Source.[PageSize], 
  [ConnStringID] = Source.[ConnStringID], 
  [ToolbarName] = Source.[ToolbarName], 
  [GridbarName] = Source.[GridbarName], 
  [TemplateId] = Source.[TemplateId], 
  [HeaderClass] = Source.[HeaderClass], 
  [ModuleClass] = Source.[ModuleClass], 
  [JSAfterLoad] = Source.[JSAfterLoad], 
  [Searcher] = Source.[Searcher], 
  [ShowWhenNew] = Source.[ShowWhenNew], 
  [ManualInit] = Source.[ManualInit], 
  [SchedulerName] = Source.[SchedulerName], 
  [TimelineSettingName] = Source.[TimelineSettingName], 
  [KanbanSettingsName] = Source.[KanbanSettingsName], 
  [ChartBackground] = Source.[ChartBackground], 
  [ChartBorder] = Source.[ChartBorder], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([ModuleName],[TypeId],[ClassId],[ObjectName],[ObjectFilter],[Descrip],[Title],[ContainerId],[CollapsibleButton],[FullscreenButton],[RefreshButton],[SearchButton],[SQlSentence],[Header],[HTMLText],[Footer],[Empty],[CssText],[ScriptText],[ChartTypeId],[ChartSettingName],[Series],[Labels],[Value],[Params],[JsonOptions],[Path],[TransFormFilePath],[IconName],[PagerId],[PageSize],[ConnStringID],[ToolbarName],[GridbarName],[TemplateId],[HeaderClass],[ModuleClass],[JSAfterLoad],[Searcher],[ShowWhenNew],[ManualInit],[SchedulerName],[TimelineSettingName],[KanbanSettingsName],[ChartBackground],[ChartBorder],[OriginId])
 VALUES(Source.[ModuleName],Source.[TypeId],Source.[ClassId],Source.[ObjectName],Source.[ObjectFilter],Source.[Descrip],Source.[Title],Source.[ContainerId],Source.[CollapsibleButton],Source.[FullscreenButton],Source.[RefreshButton],Source.[SearchButton],Source.[SQlSentence],Source.[Header],Source.[HTMLText],Source.[Footer],Source.[Empty],Source.[CssText],Source.[ScriptText],Source.[ChartTypeId],Source.[ChartSettingName],Source.[Series],Source.[Labels],Source.[Value],Source.[Params],Source.[JsonOptions],Source.[Path],Source.[TransFormFilePath],Source.[IconName],Source.[PagerId],Source.[PageSize],Source.[ConnStringID],Source.[ToolbarName],Source.[GridbarName],Source.[TemplateId],Source.[HeaderClass],Source.[ModuleClass],Source.[JSAfterLoad],Source.[Searcher],Source.[ShowWhenNew],Source.[ManualInit],Source.[SchedulerName],Source.[TimelineSettingName],Source.[KanbanSettingsName],Source.[ChartBackground],Source.[ChartBorder],Source.[OriginId])
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





