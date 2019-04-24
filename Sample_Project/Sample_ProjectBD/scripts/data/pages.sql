

BEGIN TRY

MERGE INTO [Pages] AS Target
USING (VALUES
  (N'4DC8710D-D519-4300-953C-B6881728A3C1',N'view',N'Employee',NULL,N'default',N'view Employee',N'noicon',N'{{ObjectDescrip}}',NULL,NULL,0,NULL,0,1,0,NULL,1)
 ,(N'55A3902E-271D-417B-8A6A-3048355CE117',N'list',N'Cliente',NULL,N'default',N'list Cliente',N'noicon',N'{{ObjectDescrip}}',NULL,NULL,0,NULL,0,1,0,NULL,1)
 ,(N'9BEA6F0E-4DF9-4667-9E36-D755BF3A84EB',N'list',N'Venta',NULL,N'syslayout-14',N'list Venta',N'noicon',N'{{ObjectDescrip}}',NULL,N'function Capture_moduleReady(){
  
  let modList=' + convert(nvarchar(max),NCHAR(36)) + N'(''flx-module[modulename="ventas_list_filtrada"]'');
   flexygo.events.off(modList,''list'',''refresh'');
  flexygo.events.on(modList,''list'',''refresh'',function(e){ 
  alert(''hola'');
  });
  flexygo.events.off(modList,''module'',''filtered'');
  flexygo.events.on(modList,''module'',''filtered'',function(e){ 
  debugger;
    let listItm=' + convert(nvarchar(max),NCHAR(36)) + N'(e.sender).closest(''main'').find(''flx-module[modulename="Ventas_Totales"] flx-list'');
    let filItem=' + convert(nvarchar(max),NCHAR(36)) + N'(e.sender).find(''flx-list'');
    
    if(filItem.length>0 && listItm.length>0){
       
       filItem=filItem[0];
       listItm=listItm[0];
      
        listItm.activeFilter = filItem.activeFilter;
        listItm.filterValues = filItem.filterValues;
        listItm.refresh();
      
    }
    
  });
}',1,NULL,0,1,0,NULL,1)
 ,(N'Acciones_calendario',N'generic',NULL,NULL,N'default',N'Acciones calendario',N'calendar-check-o',N'Calendario de acciones',NULL,NULL,0,NULL,0,0,0,NULL,1)
 ,(N'acciones_kanban',N'generic',NULL,NULL,N'default',N'Acciones kanban',N'flag Uruguay',N'Kanban de acciones',NULL,NULL,0,NULL,0,0,0,NULL,1)
 ,(N'DC383501-83BE-4821-BB15-7868697E71A6',N'view',N'Cliente',NULL,N'syslayout-19',N'view Cliente',N'noicon',N'{{ObjectDescrip}}',NULL,NULL,0,NULL,0,1,0,NULL,1)
 ,(N'E59F61C0-3F30-4AA3-9744-4ACE436A04C1',N'list',N'Accion',NULL,N'default',N'list Accion',N'noicon',N'{{ObjectDescrip}}',NULL,NULL,0,NULL,0,1,0,NULL,1)
 ,(N'Ventas_calendario',N'generic',NULL,NULL,N'default',N'Ventas calendario',N'calendar-month',N'Calendario de ventas',NULL,NULL,0,NULL,0,0,0,NULL,1)
) AS Source ([PageName],[TypeId],[ObjectName],[InterfaceName],[LayoutName],[Name],[IconName],[Descrip],[UrlRewrite],[Script],[ScriptActive],[Style],[RefreshInterval],[Sytem],[Generic],[BodyCssClass],[OriginId])
ON (Target.[PageName] = Source.[PageName])
WHEN MATCHED AND (
	NULLIF(Source.[TypeId], Target.[TypeId]) IS NOT NULL OR NULLIF(Target.[TypeId], Source.[TypeId]) IS NOT NULL OR 
	NULLIF(Source.[ObjectName], Target.[ObjectName]) IS NOT NULL OR NULLIF(Target.[ObjectName], Source.[ObjectName]) IS NOT NULL OR 
	NULLIF(Source.[InterfaceName], Target.[InterfaceName]) IS NOT NULL OR NULLIF(Target.[InterfaceName], Source.[InterfaceName]) IS NOT NULL OR 
	NULLIF(Source.[LayoutName], Target.[LayoutName]) IS NOT NULL OR NULLIF(Target.[LayoutName], Source.[LayoutName]) IS NOT NULL OR 
	NULLIF(Source.[Name], Target.[Name]) IS NOT NULL OR NULLIF(Target.[Name], Source.[Name]) IS NOT NULL OR 
	NULLIF(Source.[IconName], Target.[IconName]) IS NOT NULL OR NULLIF(Target.[IconName], Source.[IconName]) IS NOT NULL OR 
	NULLIF(Source.[Descrip], Target.[Descrip]) IS NOT NULL OR NULLIF(Target.[Descrip], Source.[Descrip]) IS NOT NULL OR 
	NULLIF(Source.[UrlRewrite], Target.[UrlRewrite]) IS NOT NULL OR NULLIF(Target.[UrlRewrite], Source.[UrlRewrite]) IS NOT NULL OR 
	NULLIF(Source.[Script], Target.[Script]) IS NOT NULL OR NULLIF(Target.[Script], Source.[Script]) IS NOT NULL OR 
	NULLIF(Source.[ScriptActive], Target.[ScriptActive]) IS NOT NULL OR NULLIF(Target.[ScriptActive], Source.[ScriptActive]) IS NOT NULL OR 
	NULLIF(Source.[Style], Target.[Style]) IS NOT NULL OR NULLIF(Target.[Style], Source.[Style]) IS NOT NULL OR 
	NULLIF(Source.[RefreshInterval], Target.[RefreshInterval]) IS NOT NULL OR NULLIF(Target.[RefreshInterval], Source.[RefreshInterval]) IS NOT NULL OR 
	NULLIF(Source.[Sytem], Target.[Sytem]) IS NOT NULL OR NULLIF(Target.[Sytem], Source.[Sytem]) IS NOT NULL OR 
	NULLIF(Source.[Generic], Target.[Generic]) IS NOT NULL OR NULLIF(Target.[Generic], Source.[Generic]) IS NOT NULL OR 
	NULLIF(Source.[BodyCssClass], Target.[BodyCssClass]) IS NOT NULL OR NULLIF(Target.[BodyCssClass], Source.[BodyCssClass]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [TypeId] = Source.[TypeId], 
  [ObjectName] = Source.[ObjectName], 
  [InterfaceName] = Source.[InterfaceName], 
  [LayoutName] = Source.[LayoutName], 
  [Name] = Source.[Name], 
  [IconName] = Source.[IconName], 
  [Descrip] = Source.[Descrip], 
  [UrlRewrite] = Source.[UrlRewrite], 
  [Script] = Source.[Script], 
  [ScriptActive] = Source.[ScriptActive], 
  [Style] = Source.[Style], 
  [RefreshInterval] = Source.[RefreshInterval], 
  [Sytem] = Source.[Sytem], 
  [Generic] = Source.[Generic], 
  [BodyCssClass] = Source.[BodyCssClass], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([PageName],[TypeId],[ObjectName],[InterfaceName],[LayoutName],[Name],[IconName],[Descrip],[UrlRewrite],[Script],[ScriptActive],[Style],[RefreshInterval],[Sytem],[Generic],[BodyCssClass],[OriginId])
 VALUES(Source.[PageName],Source.[TypeId],Source.[ObjectName],Source.[InterfaceName],Source.[LayoutName],Source.[Name],Source.[IconName],Source.[Descrip],Source.[UrlRewrite],Source.[Script],Source.[ScriptActive],Source.[Style],Source.[RefreshInterval],Source.[Sytem],Source.[Generic],Source.[BodyCssClass],Source.[OriginId])
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





