

BEGIN TRY

MERGE INTO [Objects_Templates] AS Target
USING (VALUES
  (N'Client_View',N'Cliente',N'view',N'Cliente view pequeñp',N'<div class="content">
<div class="col-12 profile">
  <div class="row">
    <div class="col-3">
      <img class="img-responsive padding-right-m" src="{{Image|url}}" alt="Client">
      
    </div>
    <div class="col-9">
      <h1 class="{{IdState|switch:[2:txt-danger,else:txt-outstanding]}}">{{Name}}  <i class="{{IdState|switch:[2:fa fa-lock,else:]}} padding-right-m"></i></h1> 
      <ul class="list-unstyled">
        <li><i class="flx-icon icon-briefcase icon-margin-right txt-outstanding" ></i><span class="txt-color-darken">{{idType}}</span></li>
       	<li><i class="flx-icon icon-phone txt-outstanding"></i>&nbsp;&nbsp;<span class="txt-color-darken">{{Phone}}</span></li>
        <li><i class="flx-icon icon-email-2 txt-outstanding"></i>&nbsp;&nbsp;<a href="mailto:{{mail}}">{{Mail}}</a></li>
        <li><i class="flx-icon icon-map-point icon-margin-right txt-outstanding" ></i><span class="text-muted">{{Address}}</span></li>
        <li><i class="fa fa-map-o icon-margin-right txt-outstanding"></i><span class="txt-color-darken">{{postcode}}, {{City}} <b>- {{Province}}</b></span></li>
        <li><i class="flag-icon flag-icon-{{IdCountry|string:lower}} icon-margin-right txt-outstanding"></i><span class="txt-color-darken"><b>{{IdCountry}}</b></span></li>
      </ul>
     
    </div>
  </div>
</div>
</div>',NULL,NULL,NULL,NULL,NULL,NULL,0,1)
 ,(N'cliente_resumen_ventas',N'Cliente',N'generic',N'Cliente resumen ventas',N'<div class="col-12">
  <div class="col-4"><span class="txt-outstanding">{{Name}}</span></div>
  <div class="col-5"><span class="txt-muted">{{Descrip}}</span></div>
  <div class="col-3"><span class="txt-warning">{{Amount}}</span></div>
</div>',N'cliente_resumen_ventas',NULL,N'<legend class="txt-outstanding"> <i class="fa fa-opencart"></i>Sale Summary</legend>',N'<legend class="txt-outstanding"> </legend> ',N'<div><span class="txt-outstanding">No results</span></div>',NULL,0,1)
 ,(N'ClienteDefaultList',N'Cliente',N'list',N'Fichas de clientes',N'<div class="col-6 col-l-6 col-m-12 padding-l">
	
    	<div class="col-1 col-l-1 col-m-1 col-s-1">
          	<img class="img-responsive" src="{{image|url}}" title="{{Name}}"/>
          	<flx-tooltip mode="tooltip" objectname="Cliente" objectwhere="Client.IdClient={{IdClient}}" templateid="cliente_resumen_ventas"></flx-tooltip>
			<!--<flx-tooltip mode="tooltip" objectname="Cliente" objectwhere="Client.IdClient={{IdClient}}" templateid="TemplateSaleResume_Filtered"></flx-tooltip>
			-->
      	</div>	
    
      	<div class="col-10 col-l-10 col-m-10 col-s-10">
    	    <h4>
              	<a href="#" onclick="flexygo.nav.openPage(''view'',''Cliente'',''(IdClient={{IdClient}})'',null,''current'',false,' + convert(nvarchar(max),NCHAR(36)) + N'(this))">
                	<span class="{{IdState|switch:[2:txt-danger,else:txt-outstanding]}}">{{Name}}</span> 
              	</a>
            	<small>( <i class="flx-icon icon-phone icon-margin-right" title="phone"></i>{{phone}})</small>
           	</h4>
      		<small class="">{{Address}}</small>
 			<small><b><i class="">{{City}} - {{Province}}</i></b></small>
    	</div>
  
    	<div class="col-1 col-l-1 col-m-1 col-s-1">
          <div class="btn-group">{{objectmenu}}</div>
      	</div>
 
</div>',NULL,NULL,NULL,NULL,NULL,NULL,1,1)
 ,(N'Client-map',N'Cliente',N'list',N'Mapa de cliente',N'<marker address="{{address}},{{postcode}} {{city}}, {{province}}" title="{{Name}}"><small class="btn-group">{{editButton}}{{viewButton}}</small></marker>
',NULL,NULL,N'<flx-map width="auto" height="600" cluster="true" color="retro"> ',N'</flx-map>',NULL,NULL,0,1)
 ,(N'ContactoDefaultList',N'Contacto',N'list',N'Contacto Default List',N'<div class="col-4 col-l-4 col-m-12 mod-expand">
  
  <div class="row">
    <div class="col-2 col-m-2 col-s-2">
    	<img src="{{image|url}}" class="img-responsive" />
    </div>
    <div class="col-8 col-m-8 col-s-8">
      <ul class="list-unstyled">
        <h4><a href="#" onclick="flexygo.nav.openPage(''view'',''Contacto'',''(IdContact={{IdContact}})'',null,''current'',false,' + convert(nvarchar(max),NCHAR(36)) + N'(this))"><span class="txt-outstanding">{{Name}}</span> </a></h4>
        <li>
          	<small> 
              <a href="#" onclick="flexygo.nav.openPage(''view'',''Cliente'',''(IdClient={{IdClient}})'',null,''current'',false,' + convert(nvarchar(max),NCHAR(36)) + N'(this))">
                <i class="flx-icon icon-client icon-margin-right" title="Mail">
                </i>{{Cliente}}
              </a>
          	</small>
        </li>
        <li><small><i class="flx-icon icon-email icon-margin-right" title="Mail"></i>{{mail}}</small></li>
        <li><small><i class="flx-icon icon-phone icon-margin-right" title="Phone"></i>{{Phone}}</small></li>        
      </ul>
    </div>	
	<div class="col-2 col-m-2 col-s-2">{{objectmenu}}</div>
  </div>
</div>',N'Contact_ExtendProperties',NULL,N'<legend class="padding-left-m">Contact List</legend>',NULL,N'<legend class="padding-left-m">No hay contactos para este cliente</legend>',NULL,1,1)
 ,(N'EquipoDefaultList',N'Equipo',N'list',N'Equipo Default List',N'<div class="col-6 col-l-6 col-m-12 padding-l">
	
    	<div class="col-1 col-l-1 col-m-1 col-s-1">
          	<img class="img-responsive" src="{{image|url}}" title="{{Descrip}}"/>          	
			<!--<flx-tooltip mode="tooltip" objectname="Cliente" objectwhere="Client.IdClient={{IdClient}}" templateid="TemplateSaleResume_Filtered"></flx-tooltip>
			-->
      	</div>	
    
      	<div class="col-10 col-l-10 col-m-10 col-s-10">
          	<small class="">{{IdTeam}}</small>
    	    <h4>
              	<a href="#" onclick="flexygo.nav.openPage(''view'',''Equipo'',''(IdTeam={{IdTeam}})'',null,''current'',false,' + convert(nvarchar(max),NCHAR(36)) + N'(this))">
                	<span class="txt-outstanding}}">{{Descrip}}</span> 
              	</a>
           	</h4>
    	</div>
  
    	<div class="col-1 col-l-1 col-m-1 col-s-1">
          <div class="btn-group">{{objectmenu}}</div>
      	</div>
 
</div>',NULL,NULL,NULL,NULL,NULL,NULL,1,1)
 ,(N'lista_ventas_template',N'Venta',N'list',N'lista ventas template',N'<div class="col-12 col-l-12 col-m-12 col-s-12 nopadding mod-expand">  
  <flx-navbutton type="openpage" pagetypeid="edit" objectname="Venta" objectwhere="(Sale.IdSale=''{{IdSale}}'')" defaults="" targetid="current" excludehist="false">  
     <div class="row row-line clickable txt-outstanding">
        <div class="col-5 col-l-5  col-m-12 col-s-12 size-s">
            <div class="ellipsis" title="{{Descrip}}"><i class="flx-icon icon-text-editor icon-margin-right"></i><strong>{{Descrip}} </strong>
          		<small>{{Descrip}}</small>
            </div>
        </div>
      <div class="col-4 col-l-4 col-m-12 col-s-12 ">
            <div class="ellipsis" title="{{ClientName}}"><i class="flx-icon icon-client icon-margin-right "></i>{{ClientName|isnull:sin cliente}}</div>
      </div>
      <div class="col-1 col-l-1 col-m-12 col-s-12 ">
            <div class="ellipsis" title="{{EconomicAmount}}"><i class="fa fa-dollar icon-margin-right "></i><small>{{EconomicAmount}}</small></div>
      </div>
      <div class="col-2 col-l-2 col-m-12 col-s-12 ">
            <div class="ellipsis" title="{{Badge}}"><i class="flx-icon icon-wallet icon-margin-right "></i><small>{{Badge}}</small></div>
      </div>
    </div>
  </flx-navbutton>
</div>',N'vista_generica_ventas',NULL,N'
<div class="col-12 col-l-12 hidden-m hidden-s nopadding mod-expand">  
  <div class="row nopadding">
    <div class="col-5 col-l-5 nopadding text-center bg-primary opacity-70">Descripción<br/></div>
    <div class="col-4 col-l-4  nopadding text-center bg-outstanding">Cliente<br/></div>
    <div class="col-1 col-l-1 nopadding text-center bg-outstanding opacity-70">Precio<br/></div>
    <div class="col-2 col-l-2 nopadding text-center bg-outstanding ">Moneda<br/></div>
  </div>
</div>
',NULL,NULL,NULL,0,1)
 ,(N'ListEmpleados',N'Employee',N'list',N'Lista empleados',N'<div class="col-4 col-l-4 col-m-12 mod-expand">
  <div class="row">
    <div class="col-2 col-m-2 col-s-3 text-center" title={{IdEmployee}}>
    	<img src="{{Image|url}}" class="img-responsive" title="{{Name}}"/>  
    </div>
    <div class="col-8 col-m-8 col-s-9">
        <h4 class="clickable">
          <flx-navbutton type="openpage" pagetypeid="view" objectname="Employee" objectwhere="(IdEmployee={{IdEmployee}})" defaults="" targetid="current" excludehist="false">
      		<span class="txt-outstanding">{{Name}}</span>
		  </flx-navbutton>
        </h4>   
      <ul class="list-unstyled {{IdEstado|switch:[-1:text-muted, else:txt-outstanding]}}">
        <li><i class="flx-icon icon-email icon-margin-right" title="Email"></i><a class="text-muted" href="mailto:{{Email|isnull:#}}">{{Email|isnull:Sin correo}}</a></li>
        <li><i class="flx-icon icon-phone icon-margin-right" title="Phone"></i><a class="text-muted" href="tel:{{Tel|isnull:#}}">{{Tel|isnull:Sin teléfono}}</a></li>
      </ul>
    </div>	
	<div class="col-2 col-m-2 col-s-0">{{objectmenu}}</div>
  </div>
</div>',NULL,NULL,NULL,NULL,NULL,NULL,1,1)
 ,(N'venta_totales',N'Venta',N'generic',N'venta totales',N'<div class="col-12 col-l-12 col-m-12 col-s-12 nopadding mod-expand">  
  <div class="ellipsis" title="{{Total}}"><span>TOTAL</span><h1><strong>{{Total}} </strong></h1>
    <flx-easyinfo  color="red"  iconclass="flx-icon icon-lock" size="l"  value="{{Total}}"  label="TOTAL"  symbol="€"> </flx-easyinfo>
  </div>
</div>',N'Total_de_ventas',NULL,NULL,NULL,NULL,NULL,0,1)
 ,(N'ventas_lista_template',N'Venta',N'generic',N'ventas lista template',N'<div class="col-12 col-l-12 col-m-12 col-s-12 nopadding mod-expand">  
  <flx-navbutton type="openpage" pagetypeid="edit" objectname="Venta" objectwhere="(Sale.IdSale=''{{IdSale}}'')" defaults="" targetid="current" excludehist="false">  
     <div class="row row-line clickable txt-outstanding">
        <div class="col-5 col-l-5  col-m-12 col-s-12 size-s">
            <div class="ellipsis" title="{{Descrip}}"><i class="flx-icon icon-text-editor icon-margin-right"></i><strong>{{Descrip}} </strong>
          		<small>{{Descrip}}</small>
            </div>
        </div>
      <div class="col-4 col-l-4 col-m-12 col-s-12 ">
            <div class="ellipsis" title="{{ClientName}}"><i class="flx-icon icon-client icon-margin-right "></i>{{ClientName|isnull:sin cliente}}</div>
      </div>
      <div class="col-1 col-l-1 col-m-12 col-s-12 ">
            <div class="ellipsis" title="{{EconomicAmount}}"><i class="fa fa-dollar icon-margin-right "></i><small>{{EconomicAmount}}</small></div>
      </div>
      <div class="col-2 col-l-2 col-m-12 col-s-12 ">
            <div class="ellipsis" title="{{Badge}}"><i class="flx-icon icon-wallet icon-margin-right "></i><small>{{Badge}}</small></div>
      </div>
    </div>
  </flx-navbutton>
</div>',N'VentaDefaultList',NULL,N'<script>
function Capture_moduleReady(){
  debugger;
  
  let modList=' + convert(nvarchar(max),NCHAR(36)) + N'(''flx-module[modulename="sysmod-list-generic"]'');
  
  flexygo.events.off(modList,''module'',''filtered'');
  flexygo.events.on(modList,''module'',''filtered'',function(e){ 
    
    debugger;
    
    let listItm=' + convert(nvarchar(max),NCHAR(36)) + N'(e.sender).closest(''main'').find(''flx-module[modulename="Ventas_Totales"] flx-list'');
    let filItem=' + convert(nvarchar(max),NCHAR(36)) + N'(e.sender).find(''flx-list'');
    
    if(filItem.length>0 &amp;&amp; listItm.length>0){
       
       filItem=filItem[0];
       listItm=listItm[0];
      
        listItm.activeFilter = filItem.activeFilter;
        listItm.filterValues = filItem.filterValues;
        listItm.refresh();
      
    }
    
  });
}
  
</script>',NULL,NULL,NULL,0,1)
) AS Source ([TemplateId],[ObjectName],[TypeId],[Descrip],[Body],[ViewName],[WhereSentence],[Header],[Footer],[Empty],[ModuleClass],[IsDefault],[OriginId])
ON (Target.[TemplateId] = Source.[TemplateId])
WHEN MATCHED AND (
	NULLIF(Source.[ObjectName], Target.[ObjectName]) IS NOT NULL OR NULLIF(Target.[ObjectName], Source.[ObjectName]) IS NOT NULL OR 
	NULLIF(Source.[TypeId], Target.[TypeId]) IS NOT NULL OR NULLIF(Target.[TypeId], Source.[TypeId]) IS NOT NULL OR 
	NULLIF(Source.[Descrip], Target.[Descrip]) IS NOT NULL OR NULLIF(Target.[Descrip], Source.[Descrip]) IS NOT NULL OR 
	NULLIF(Source.[Body], Target.[Body]) IS NOT NULL OR NULLIF(Target.[Body], Source.[Body]) IS NOT NULL OR 
	NULLIF(Source.[ViewName], Target.[ViewName]) IS NOT NULL OR NULLIF(Target.[ViewName], Source.[ViewName]) IS NOT NULL OR 
	NULLIF(Source.[WhereSentence], Target.[WhereSentence]) IS NOT NULL OR NULLIF(Target.[WhereSentence], Source.[WhereSentence]) IS NOT NULL OR 
	NULLIF(Source.[Header], Target.[Header]) IS NOT NULL OR NULLIF(Target.[Header], Source.[Header]) IS NOT NULL OR 
	NULLIF(Source.[Footer], Target.[Footer]) IS NOT NULL OR NULLIF(Target.[Footer], Source.[Footer]) IS NOT NULL OR 
	NULLIF(Source.[Empty], Target.[Empty]) IS NOT NULL OR NULLIF(Target.[Empty], Source.[Empty]) IS NOT NULL OR 
	NULLIF(Source.[ModuleClass], Target.[ModuleClass]) IS NOT NULL OR NULLIF(Target.[ModuleClass], Source.[ModuleClass]) IS NOT NULL OR 
	NULLIF(Source.[IsDefault], Target.[IsDefault]) IS NOT NULL OR NULLIF(Target.[IsDefault], Source.[IsDefault]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [ObjectName] = Source.[ObjectName], 
  [TypeId] = Source.[TypeId], 
  [Descrip] = Source.[Descrip], 
  [Body] = Source.[Body], 
  [ViewName] = Source.[ViewName], 
  [WhereSentence] = Source.[WhereSentence], 
  [Header] = Source.[Header], 
  [Footer] = Source.[Footer], 
  [Empty] = Source.[Empty], 
  [ModuleClass] = Source.[ModuleClass], 
  [IsDefault] = Source.[IsDefault], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([TemplateId],[ObjectName],[TypeId],[Descrip],[Body],[ViewName],[WhereSentence],[Header],[Footer],[Empty],[ModuleClass],[IsDefault],[OriginId])
 VALUES(Source.[TemplateId],Source.[ObjectName],Source.[TypeId],Source.[Descrip],Source.[Body],Source.[ViewName],Source.[WhereSentence],Source.[Header],Source.[Footer],Source.[Empty],Source.[ModuleClass],Source.[IsDefault],Source.[OriginId])
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





