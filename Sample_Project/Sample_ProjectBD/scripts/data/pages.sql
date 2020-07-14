﻿

BEGIN TRY

MERGE INTO [Pages] AS Target
USING (VALUES
  (N'29f7cdb0-2a09-45aa-9b47-2d38c7c9adde',N'generic',NULL,NULL,N'default',N'Timeline_Basic',N'noicon',N'Timeline (Basic)',NULL,NULL,0,NULL,0,0,0,NULL,0,1)
 ,(N'4dbe3f1e-5dad-4042-9a07-7acecc0766e5',N'generic',NULL,NULL,N'default',N'Demo Year',N'noicon',N'Demo Year',NULL,NULL,0,NULL,0,0,0,NULL,0,1)
 ,(N'4DC8710D-D519-4300-953C-B6881728A3C1',N'view',N'Employee',NULL,N'default',N'view Employee',N'noicon',N'{{ObjectDescrip}}',NULL,NULL,0,NULL,0,1,0,NULL,0,1)
 ,(N'4df83bb0-717e-4504-8323-c7509c9b387b',N'generic',NULL,NULL,N'default',N'Demo Kanban',N'noicon',N'Demo Kanban',NULL,NULL,0,NULL,0,0,0,NULL,0,1)
 ,(N'5194a99b-7ff4-47de-8e55-905df895e99b',N'generic',NULL,NULL,N'default',N'Timeline_BasicWithGroups',N'noicon',N'Timeline (Basic With Groups)',NULL,NULL,0,NULL,0,0,0,NULL,0,1)
 ,(N'55A3902E-271D-417B-8A6A-3048355CE117',N'list',N'Cliente',NULL,N'default',N'list Cliente',N'noicon',N'{{ObjectDescrip}}',NULL,NULL,0,NULL,0,1,0,NULL,0,1)
 ,(N'61fe2a52-797e-4a42-80b4-b363fbdb023e',N'generic',NULL,NULL,N'default',N'Scheduler_Month',N'calendar-month',N'Scheduler (Month)',NULL,NULL,0,NULL,0,0,0,NULL,0,1)
 ,(N'62bf2c6e-16e2-4249-8920-d1774945488c',N'generic',NULL,NULL,N'default',N'Scheduler_Calendar',N'calendar-month',N'Scheduler (Calendar)',NULL,NULL,0,NULL,0,0,0,NULL,0,1)
 ,(N'69e5872d-c55b-4c6e-a2f8-c61542dd4d68',N'generic',NULL,NULL,N'default',N'Demo Month',N'noicon',N'Demo Month',NULL,NULL,0,NULL,0,0,0,NULL,0,1)
 ,(N'6e53f498-7c99-4090-b365-3c26898c4391',N'generic',NULL,NULL,N'default',N'Timeline_AdvancedBasicWithGroups',N'noicon',N'Timeline (Advanced Basic With Groups)',NULL,NULL,0,NULL,0,0,0,NULL,0,1)
 ,(N'7548fe53-2ea9-4fd1-86a7-4b39a7221376',N'generic',NULL,NULL,N'default',N'Demo Timeline',N'noicon',N'Demo Timeline',NULL,NULL,0,NULL,0,0,0,NULL,0,1)
 ,(N'7b4f1ea4-510c-4330-a5cd-859b97ba2149',N'generic',NULL,NULL,N'default',N'Scheduler_Year',N'calendar-month',N'Scheduler (Year)',NULL,NULL,0,NULL,0,0,0,NULL,0,1)
 ,(N'9BEA6F0E-4DF9-4667-9E36-D755BF3A84EB',N'list',N'Venta',NULL,N'syslayout-1',N'list Venta',N'noicon',N'{{ObjectDescrip}}',NULL,N'function Capture_moduleReady(){
  
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
}',1,NULL,0,1,0,NULL,0,1)
 ,(N'Acciones_calendario',N'generic',NULL,NULL,N'default',N'Acciones calendario',N'calendar-check-o',N'Calendario de acciones',NULL,NULL,0,NULL,0,0,0,NULL,0,1)
 ,(N'acciones_kanban',N'generic',NULL,NULL,N'default',N'Acciones kanban',N'flag Uruguay',N'Kanban de acciones',NULL,NULL,0,NULL,0,0,0,NULL,0,1)
 ,(N'B2F9A6DE-5B6D-40D3-8011-A8EED03A05A7',N'view',N'Course_Step',NULL,N'default',N'view Course_Step',N'noicon',N'{{ObjectDescrip}}',NULL,NULL,0,NULL,0,1,0,NULL,0,1)
 ,(N'DC383501-83BE-4821-BB15-7868697E71A6',N'view',N'Cliente',NULL,N'syslayout-19',N'view Cliente',N'noicon',N'{{ObjectDescrip}}',NULL,NULL,0,NULL,0,1,0,NULL,0,1)
 ,(N'e452b005-f6fb-4fd8-9d42-94b621ed2bb3',N'generic',NULL,NULL,N'default',N'Demo Calendar',N'noicon',N'Demo Calendar',NULL,NULL,0,NULL,0,0,0,NULL,0,1)
 ,(N'E59F61C0-3F30-4AA3-9744-4ACE436A04C1',N'list',N'Accion',NULL,N'default',N'list Accion',N'noicon',N'{{ObjectDescrip}}',NULL,NULL,0,NULL,0,1,0,NULL,0,1)
 ,(N'fa6aadad-f081-488a-afad-fa0ebb9df91d',N'generic',NULL,NULL,N'default',N'Timeline_Advanced',N'noicon',N'Timeline (Advanced)',NULL,NULL,0,NULL,0,0,0,NULL,0,1)
 ,(N'highcode_wc_carousel',N'generic',NULL,NULL,N'default',N'Carousel Sample',N'noicon',N'Carousel Sample',NULL,NULL,0,NULL,0,0,0,NULL,0,1)
 ,(N'Kanban_Board',N'generic',NULL,NULL,N'default',N'Kanban (Board)',N'noicon',N'Kanban (Board)',NULL,NULL,0,NULL,0,0,0,NULL,0,1)
 ,(N'Ventas_calendario',N'generic',NULL,NULL,N'default',N'Ventas calendario',N'calendar-month',N'Calendario de ventas',NULL,NULL,0,NULL,0,0,0,NULL,0,1)
) AS Source ([PageName],[TypeId],[ObjectName],[InterfaceName],[LayoutName],[Name],[IconName],[Descrip],[UrlRewrite],[Script],[ScriptActive],[Style],[RefreshInterval],[Sytem],[Generic],[BodyCssClass],[Offline],[OriginId])
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
	NULLIF(Source.[Offline], Target.[Offline]) IS NOT NULL OR NULLIF(Target.[Offline], Source.[Offline]) IS NOT NULL OR 
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
  [Offline] = Source.[Offline], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([PageName],[TypeId],[ObjectName],[InterfaceName],[LayoutName],[Name],[IconName],[Descrip],[UrlRewrite],[Script],[ScriptActive],[Style],[RefreshInterval],[Sytem],[Generic],[BodyCssClass],[Offline],[OriginId])
 VALUES(Source.[PageName],Source.[TypeId],Source.[ObjectName],Source.[InterfaceName],Source.[LayoutName],Source.[Name],Source.[IconName],Source.[Descrip],Source.[UrlRewrite],Source.[Script],Source.[ScriptActive],Source.[Style],Source.[RefreshInterval],Source.[Sytem],Source.[Generic],Source.[BodyCssClass],Source.[Offline],Source.[OriginId])
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





