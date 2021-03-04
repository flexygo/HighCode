

BEGIN TRY

MERGE INTO [Offline_Pages] AS Target
USING (VALUES
  (N'LearningApp',N'homepage',NULL,N'generic',N'Home Page',N'<div class="ion-padding-vertical">
  <div class="square-container">
    <div class="square">
      <div class="content" onclick="flexygo.nav.goList(''Offline_Cliente'',''Offline_Cliente_List'');">
        <i class="flx-icon icon-client"></i><h6>{{translate|Clientes}} {{flexygo.sql.getCount(''Client'')}}</h6>
      </div>
    </div>
    <div class="square" >
      <div class="content" onclick="flexygo.nav.goList(''Offline_Accion'',''Offline_Accion_List'');">
        <i class="flx-icon icon-accounting-operations"></i><h6>{{translate|Tareas}} {{flexygo.sql.getCount(''Actions'')}}</h6>
      </div>
    </div>    
  </div>
</div>',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,2)
 ,(N'LearningApp',N'Offline_Accion_List',N'Offline_Accion',N'list',N'Tareas',N'<ion-item detail lines="full" onclick="flexygo.nav.goView(''Offline_Accion'',''Offline_Accion_View'',''{{objIdent|JS}}'')"> 
  <ion-label>
    <ion-text >{{comment|isnull:Sin descripción}}</ion-text >
    <ion-text color="medium"><h3><i class="flx-icon icon-man-4 icon-margin-right" ></i>{{Name}}</h3></ion-text>    
    <ion-text color="medium"><h5 ><i class="flx-icon icon-calendar-day icon-margin-right " ></i>{{Date|date:DD/MM/YYYY}}</h5></ion-text>
  </ion-label>
  <ion-chip color="{{ActionState|switch:[0:warning, 1:danger, 2:warning, 3:success, 4:success]}}" class="icon-margin-right">
    <i class="flx-icon {{ActionType|switch:[ICALL:icon-call11,OCALL:icon-phone-2,EMAIL:icon-email1,SALE:icon-dollar,else:icon-accounting-operations]}}"></i>            
  </ion-chip>
</ion-item>',N'<ion-segment value="InProgress">
  <ion-segment-button value="InProgress" onclick="' + convert(nvarchar(max),NCHAR(36)) + N'(''flx-list:first'').attr(''additional'',''(Actions.ActionState =2)'')">
    <ion-label>Activas</ion-label>
  </ion-segment-button>
  <ion-segment-button value="ToDo"  onclick="' + convert(nvarchar(max),NCHAR(36)) + N'(''flx-list:first'').attr(''additional'',''(Actions.ActionState =1)'')">
    <ion-label>A realizar</ion-label>
  </ion-segment-button>
  <ion-segment-button  value="Finish" onclick="' + convert(nvarchar(max),NCHAR(36)) + N'(''flx-list:first'').attr(''additional'',''(Actions.ActionState =3)'')">
    <ion-label>Finalizadas</ion-label>
  </ion-segment-button>
</ion-segment>',N'<ion-fab vertical="bottom" horizontal="end" slot="fixed">
  <ion-fab-button onclick="flexygo.nav.goInsert(''Offline_Accion'')">
    <ion-icon name="add"></ion-icon>
  </ion-fab-button>
</ion-fab>',NULL,N'Select Actions.* 
,c.Name, c.Phone, c.Mail, c.Address, c.Province, c.PostCode
,s.CssClass, s.Descrip as State
from Actions
INNER JOIN Client c on c.IdClient=Actions.IdClient
INNER JOIN Action_States s on s.State=Actions.ActionState
WHERE Actions.ActionState in (1,2,3)  and Actions._IsDeleted=0',N'(Actions.ActionState =2)',N'Actions.ActionState DESC, Actions.Date ASC',N'comment like @findstring or c.Name like @findstring',1,1,NULL,2)
 ,(N'LearningApp',N'Offline_Accion_List_All',N'Offline_Accion',N'list',N'Tareas',N'<ion-item detail lines="full" onclick="flexygo.nav.goView(''Offline_Accion'',''Offline_Accion_View'',''{{objIdent|JS}}'')"> 
  <ion-label>
    <ion-text >{{comment|isnull:Sin descripción}}</ion-text >
    <ion-text color="medium"><h3><i class="flx-icon icon-man-4 icon-margin-right" ></i>{{Name}}</h3></ion-text>    
    <ion-text color="medium"><h5 ><i class="flx-icon icon-calendar-day icon-margin-right " ></i>{{Date|date:DD/MM/YYYY}}</h5></ion-text>
  </ion-label>
  <ion-chip color="{{ActionState|switch:[0:warning, 1:danger, 2:warning, 3:success, 4:success]}}" class="icon-margin-right">
    <i class="flx-icon {{ActionType|switch:[ICALL:icon-call11,OCALL:icon-phone-2,EMAIL:icon-email1,SALE:icon-dollar,else:icon-accounting-operations]}}"></i>            
  </ion-chip>
</ion-item>
',NULL,N'<ion-fab vertical="bottom" horizontal="end" slot="fixed">
  <ion-fab-button onclick="flexygo.nav.goInsert(''Offline_Accion'')">
    <ion-icon name="add"></ion-icon>
  </ion-fab-button>
</ion-fab>
',NULL,N'Select Actions.* 
,c.Name, c.Phone, c.Mail, c.Address, c.Province, c.PostCode
,s.CssClass, s.Descrip as State
from Actions
INNER JOIN Client c on c.IdClient=Actions.IdClient
INNER JOIN Action_States s on s.State=Actions.ActionState
',NULL,N'Actions.ActionState DESC, Actions.Date ASC',N'comment like @findstring or c.Name like @findstring',0,1,NULL,2)
 ,(N'LearningApp',N'Offline_Accion_Print',N'Offline_Accion',N'view',N'Parte de trabajo',N'<div>
    <table>
      <tr>
        <td style="width:23%"><b><large>Nº: {{ActionId}}</large></b></td>
        <td class="alnright">Fecha: <b>{{Date|date:LL}}</b></td>
      </tr>
      <tr>
        <td colspan="2">Le atendió: {{Employee}}</td>
      </tr>
      <tr>
        <td colspan="2">Cliente: <b> {{Name}} </b><br>
          NIF:<b> {{NIF|isnull:sin especificar}} </b><br>
          Teléfono:<b> {{Phone|isnull:sin especificar}} </b><br>
		  Mail:<b> {{Mail|isnull:sin especificar}} </b><br>
          Dirección: <b> {{Address|isnull:sin especificar}}, {{Province}}, {{PostCode}} </b>
      	</td>
      </tr>
      <tr>
        <td colspan="2">
          <h3 >Detalle</h3>
          <hr>
        </td>
      </tr>
      <tr>
        <td colspan="2"><c> {{Comment|isnull:No presenta descripción}} </c></td>
      </tr>
      <td colspan="2"><br><b>Firmado:</b> {{AprovalName|isnull:Sin firmar}} <br>
        NIF: {{AprovalDoc|isnull:Sin documento}} <br><br><br>
        <img src=" {{Signature}} " width="200" />
      </td>
    </table>
    </div>',N'<style>
  table, th, td {width:98%; border:1px solid black; border-collapse:collapse; padding:10px;} .hidden{display:none;} .alnright { text-align: right; }
</style>',N'<ion-fab vertical="bottom" horizontal="end" slot="fixed" >
  <ion-fab-button color="primary" >
    <ion-icon name="ellipsis-vertical"></ion-icon>
  </ion-fab-button>
  <ion-fab-list side="top">
    <ion-fab-button color="dark" data-desc="Imprimir PDF" onclick="LearningApp.Tareas.Imprimir({{ActionId}},' + convert(nvarchar(max),NCHAR(36)) + N'(this))">
      <ion-icon color="white" class="flx-icon icon-pdf-1"></ion-icon>
    </ion-fab-button>
    <ion-fab-button color="dark" data-desc="Enviar"   onclick="LearningApp.Tareas.Enviar(''{{ActionId}}'',''{{Mail}}'',' + convert(nvarchar(max),NCHAR(36)) + N'(this))">
      <ion-icon color="white" name="mail"></ion-icon>
    </ion-fab-button >
  </ion-fab-list>
</ion-fab>',NULL,N'Select Actions.* 
,c.Name, c.Phone, c.Mail, c.Address, c.Province, c.PostCode,''123456H'' as NIF
,s.CssClass, s.Descrip as State, t.Descrip as Type
,e.Name as Employee
from Actions
INNER JOIN Client c on c.IdClient=Actions.IdClient
INNER JOIN Action_States s on s.State=Actions.ActionState
left join Action_Types t on t.ActionType=Actions.ActionType
left join Employee e on e.IdEmployee=Actions.IdEmployee
',NULL,NULL,NULL,0,0,NULL,2)
 ,(N'LearningApp',N'Offline_Accion_View',N'Offline_Accion',N'view',N'Tarea',N'  <ion-item lines="none" color="{{ActionState|switch:[0:warning, 1:danger, 2:warning, 3:success, 4:success]}}">
    <ion-chip slot="start">
      <ion-label color="light"><i class="flx-icon {{ActionType|switch:[ICALL:icon-call11,OCALL:icon-phone-2,EMAIL:icon-email1,SALE:icon-dollar,else:icon-accounting-operations]}}"></i> </ion-label>
    </ion-chip>

    <ion-label >
      <p>Cód: {{ActionId}}</p>
      <p>{{Date|date:LL}}</p>
      <p>{{State}}</p>
    </ion-label>
  </ion-item>

  <ion-list>
    
    <ion-item lines="none">
      <ion-label>{{Comment}}</ion-label>
    </ion-item>
    
    <ion-item detail lines="none" button color="dark" onclick="flexygo.nav.goView(''Offline_Cliente'',''Offline_Cliente_View'',''Client.IdClient=\''{{IdClient}}\'''')">
      <ion-label color="light"> <i class="flx-icon icon-man-4 icon-margin-right"></i>{{Name}}</ion-label>
    </ion-item>
    
    <ion-item lines="full">
      <ion-label><a href="tel:{{phone|isnull:Sin teléfono}}"><i class="flx-icon icon-phone icon-margin-right" name="call"></i>{{phone|isnull:Sin teléfono}}</a></ion-label>
    </ion-item>
     <ion-item lines="full">
       <ion-label  color=""><a href="mailto:{{mail}}"><i class="flx-icon icon-email-1 icon-margin-right"></i>{{mail|isnull:No disponible}}</a></ion-label>
    </ion-item>

    <ion-item no-lines lines="none">
      <ion-label color=""><a href="https://maps.google.com/?q= {{address}} {{province}} {{PostCode}}"><i class="flx-icon icon-pin2 icon-margin-right"></i><small>{{address}} {{province}} {{PostCode}}</small></a></ion-label>
    </ion-item>

    <ion-item-divider color="dark">
      <ion-label>
        Más datos
      </ion-label>
    </ion-item-divider>
    
    <ion-item {{ActionState|switch:[3:hidden, 4:hidden, else:]}} lines="full" button onclick="LearningApp.Tareas.FinalizarYLocalizar ({{ActionId}},' + convert(nvarchar(max),NCHAR(36)) + N'(this))">
      <ion-label color="danger"><i class="flx-icon icon-accepted icon-margin-right"></i>{{translate|Finalizar}}</ion-label>
    </ion-item>
    <ion-item lines="full" >
      <ion-label color="{{Signature|isnull:danger,success}}"><i class="flx-icon icon-sign1 icon-margin-right"></i>{{Signature|isnull:{{translate|Sin firmar}},{{AprovalName|isnull:Firmado sin nombre}}}}</ion-label>      
    </ion-item>
    
    <ion-item lines="full" button onClick="flexygo.nav.goGallery(''Offline_Accion'',''{{ActionId}}'')">
      <ion-label><i class="flx-icon icon-flx-image icon-margin-right"></i> {{translate|Imágenes}}</ion-label>
      <ion-badge slot="end" color="">{{flexygo.sql.getCount(''flxImages'', ''ObjectId=? AND ObjectName=?'',[''{{ActionId}}'',''Offline_Accion''])}}</ion-badge>
    </ion-item>
    <ion-item lines="full" button onClick="flexygo.nav.goDocuments(''Offline_Accion'',''{{ActionId}}'')">
      <ion-label><i class="fa fa-file-text-o icon-margin-right"></i> {{translate|Documentos}}</ion-label>
      <ion-badge slot="end" color="">{{flexygo.sql.getCount(''flxDocuments'', ''ObjectId=? AND ObjectName=?'',[''{{ActionId}}'',''Offline_Accion''])}}</ion-badge>
    </ion-item> 
    <ion-item lines="full" >
      <ion-label color="{{ScanCode|isnull:danger,success}}"><i class="flx-icon icon-barcode-2 icon-margin-right"></i>{{ScanCode|isnull:{{translate|Sin referencia}}}}</ion-label>      
    </ion-item>
  </ion-list>',NULL,N'<ion-fab vertical="bottom" horizontal="end" slot="fixed">
  <ion-fab-button color="primary" >
    <ion-icon name="ellipsis-vertical"></ion-icon>
  </ion-fab-button>
  <ion-fab-list side="top">
    <ion-fab-button color="dark" onclick="flexygo.nav.goEdit(''Offline_Accion'',null,''{{objIdent|JS}}'')" data-desc="{{translate|Editar}}">
      <ion-icon color="white" name="create-outline"></ion-icon>
    </ion-fab-button>
    <ion-fab-button color="danger" onclick="LearningApp.Tareas.BorrarTarea(''{{ActionId}}'',' + convert(nvarchar(max),NCHAR(36)) + N'(this))" data-desc="{{translate|Borrar tarea}}">
      <ion-icon color="" name="close-circle-outline"></ion-icon>
    </ion-fab-button>
    <ion-fab-button color="dark" onclick="flexygo.nav.goView(''Offline_Accion'',''Offline_Accion_Print'',''{{objIdent|JS}}'')" data-desc="{{translate|Imprimir}}">
      <ion-icon color="white" name="print"></ion-icon>
    </ion-fab-button>
    <ion-fab-button color="dark" onclick="LearningApp.Tareas.ScanCode({{ActionId}},' + convert(nvarchar(max),NCHAR(36)) + N'(this))" data-desc="{{translate|Scan code}}">
      <ion-icon color="white" class="flx-icon icon-barcode-2"></ion-icon>
    </ion-fab-button>
  </ion-fab-list>
</ion-fab>',NULL,N'Select Actions.* 
,c.Name, c.Phone, c.Mail, c.Address, c.Province, c.PostCode
,s.CssClass, s.Descrip as State
from Actions
INNER JOIN Client c on c.IdClient=Actions.IdClient
INNER JOIN Action_States s on s.State=Actions.ActionState
WHERE Actions.ActionState in (1,2,3)
',NULL,NULL,NULL,1,0,NULL,2)
 ,(N'LearningApp',N'Offline_Cliente_Edit',N'Offline_Cliente',N'edit',N'Editar Cliente',N'{{getProperties(json)}}',NULL,N'<ion-fab vertical="bottom" horizontal="end" slot="fixed">
 <ion-fab-button onclick="flexygo.forms.save(this,event).then(() => {flexygo.nav.transferView(''Offline_Cliente'',''Offline_Cliente_View'',''Client.IdClient=\''''+' + convert(nvarchar(max),NCHAR(36)) + N'(this).closest(''flx-edit'').find(''[property=IdClient]'').val()+''\'''')}).catch(err => {flexygo.msg.showError(err)});">
   <i class="flx-icon icon-save-21"></i>
 </ion-fab-button>
</ion-fab>',NULL,NULL,NULL,NULL,NULL,1,0,NULL,2)
 ,(N'LearningApp',N'Offline_Cliente_List',N'Offline_Cliente',N'list',N'Clientes',N'
<ion-item lines="full" onclick="flexygo.nav.goView(''Offline_Cliente'',''Offline_Cliente_View'',''{{objIdent|JS}}'')">
  <ion-chip color="dark">
    <i class="flx-icon icon-client" ></i>
  </ion-chip>
  <ion-label class="icon-margin-left">
    <h2>{{Name}}</h2>
    <h3><i class="ion-color-medium flx-icon icon-phone icon-margin-right" ></i>{{phone|isnull:{{translate|Sin teléfono}}}}</h3>
  </ion-label>
</ion-item>',NULL,N'<ion-fab vertical="bottom" horizontal="end" slot="fixed">
  <ion-fab-button onclick="flexygo.nav.goInsert(''Offline_Cliente'')">
    <ion-icon name="add"></ion-icon>
  </ion-fab-button>
</ion-fab>',N'<ion-item lines="none" onclick="flexygo.nav.goInsert(''Offline_Cliente'')">
  <ion-chip color="danger" >
		<i class="flx-icon icon-client" ></i>
	</ion-chip>
  <ion-label color="danger">{{translate|No hay clientes}}</ion-label> 
</ion-item>',NULL,NULL,N'Name',N'(Name like @FindString)',1,1,NULL,2)
 ,(N'LearningApp',N'Offline_Cliente_View',N'Offline_Cliente',N'view',N'Cliente',N'
<ion-card>
  <ion-grid>
    <ion-row>
      <ion-col size="3">
        <ion-chip color="dark" >
        	<i class="flx-icon icon-client icon-lg" ></i>
      	</ion-chip>
      </ion-col>
      <ion-col size="9">
        <ion-list>
          <h5>{{Name|string:upper}}</h5>
          <p><i class="flx-icon icon-phone-5 icon-margin-right"></i><a href="tel:{{Phone}}">{{Phone|isnull:{{translate|Sin teléfono}}}}</a></p>
          <p><i class="flx-icon icon-email1 icon-margin-right"></i><a href="mailto:{{Mail}}">{{Mail|isnull:{{translate|Sin e-mail}}}}</a></p>
          <p><i class="flx-icon icon-location icon-margin-right"></i>{{Province|isnull:{{translate|Sin provincia}}}}</p>
          <p><i class="flx-icon icon-location-2 icon-margin-right"></i><a href="https://maps.google.com/maps?q={{Address}}+{{Province}}">{{Address|isnull:{{translate|Sin dirección}}}}</a></p>          
         </ion-list>
      </ion-col>
    </ion-row>
  </ion-grid>
</ion-card>
<ion-list>
  <ion-item-divider color="dark">
    <ion-label>
      Tareas
    </ion-label>
  </ion-item-divider>
  <ion-item lines="full" button onClick="flexygo.nav.goList(''Offline_Accion'',''Offline_Accion_List_All'',''Actions.IdClient={{IdClient}} AND (Actions.ActionState = 1 or Actions.ActionState=2)'')">
    <ion-label color="danger"> <i class="flx-icon icon-document3 icon-margin-right"></i>Pendientes</ion-label>
    <ion-badge slot="end" color="danger">{{flexygo.sql.getCount(''Actions'', ''Actions.IdClient=? AND (Actions.ActionState = 1 OR Actions.ActionState=2)'',[''{{IdClient}}''])}}</ion-badge>
  </ion-item>

  <ion-item lines="full" button onClick="flexygo.nav.goList(''Offline_Accion'',''Offline_Accion_List_All'',''Actions.IdClient={{IdClient}} AND (Actions.ActionState = 3)'')">
    <ion-label color="success"><i class="flx-icon icon-document3 icon-margin-right"></i>Finalizadas</ion-label>
    <ion-badge slot="end" color="success">{{flexygo.sql.getCount(''Actions'', ''Actions.IdClient=? AND (Actions.ActionState = 3)'',[''{{IdClient}}''])}}</ion-badge>
  </ion-item>
</ion-list>',NULL,N'<ion-fab vertical="bottom" horizontal="end" slot="fixed" >
  <ion-fab-button color="primary" >
    <ion-icon name="ellipsis-vertical"></ion-icon>
  </ion-fab-button>
  <ion-fab-list side="top">
    <ion-fab-button  onclick="flexygo.nav.goInsert(''Offline_Accion'',null,''{IdClient:\''{{IdClient}}\''}'')" data-desc="{{translate|Nueva tarea}}">
      <ion-icon class="flx-icon icon-document3"></ion-icon>
    </ion-fab-button>
    <ion-fab-button  onclick="flexygo.nav.goEdit(''Offline_Cliente'',null,''{{objIdent|JS}}'')" data-desc="{{translate|Editar cliente}}">
      <ion-icon name="create-outline"></ion-icon>
    </ion-fab-button>
  </ion-fab-list>
</ion-fab>',NULL,NULL,NULL,NULL,NULL,1,0,NULL,2)
) AS Source ([AppName],[PageName],[ObjectName],[TypeId],[Title],[Body],[Header],[Footer],[Empty],[SQLSentence],[SQLAdditionalWhere],[SQLOrderBy],[SQLSearchFilter],[IsDefault],[ShowSearchBar],[JSAfterLoad],[OriginId])
ON (Target.[AppName] = Source.[AppName] AND Target.[PageName] = Source.[PageName])
WHEN MATCHED AND (
	NULLIF(Source.[ObjectName], Target.[ObjectName]) IS NOT NULL OR NULLIF(Target.[ObjectName], Source.[ObjectName]) IS NOT NULL OR 
	NULLIF(Source.[TypeId], Target.[TypeId]) IS NOT NULL OR NULLIF(Target.[TypeId], Source.[TypeId]) IS NOT NULL OR 
	NULLIF(Source.[Title], Target.[Title]) IS NOT NULL OR NULLIF(Target.[Title], Source.[Title]) IS NOT NULL OR 
	NULLIF(Source.[Body], Target.[Body]) IS NOT NULL OR NULLIF(Target.[Body], Source.[Body]) IS NOT NULL OR 
	NULLIF(Source.[Header], Target.[Header]) IS NOT NULL OR NULLIF(Target.[Header], Source.[Header]) IS NOT NULL OR 
	NULLIF(Source.[Footer], Target.[Footer]) IS NOT NULL OR NULLIF(Target.[Footer], Source.[Footer]) IS NOT NULL OR 
	NULLIF(Source.[Empty], Target.[Empty]) IS NOT NULL OR NULLIF(Target.[Empty], Source.[Empty]) IS NOT NULL OR 
	NULLIF(Source.[SQLSentence], Target.[SQLSentence]) IS NOT NULL OR NULLIF(Target.[SQLSentence], Source.[SQLSentence]) IS NOT NULL OR 
	NULLIF(Source.[SQLAdditionalWhere], Target.[SQLAdditionalWhere]) IS NOT NULL OR NULLIF(Target.[SQLAdditionalWhere], Source.[SQLAdditionalWhere]) IS NOT NULL OR 
	NULLIF(Source.[SQLOrderBy], Target.[SQLOrderBy]) IS NOT NULL OR NULLIF(Target.[SQLOrderBy], Source.[SQLOrderBy]) IS NOT NULL OR 
	NULLIF(Source.[SQLSearchFilter], Target.[SQLSearchFilter]) IS NOT NULL OR NULLIF(Target.[SQLSearchFilter], Source.[SQLSearchFilter]) IS NOT NULL OR 
	NULLIF(Source.[IsDefault], Target.[IsDefault]) IS NOT NULL OR NULLIF(Target.[IsDefault], Source.[IsDefault]) IS NOT NULL OR 
	NULLIF(Source.[ShowSearchBar], Target.[ShowSearchBar]) IS NOT NULL OR NULLIF(Target.[ShowSearchBar], Source.[ShowSearchBar]) IS NOT NULL OR 
	NULLIF(Source.[JSAfterLoad], Target.[JSAfterLoad]) IS NOT NULL OR NULLIF(Target.[JSAfterLoad], Source.[JSAfterLoad]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [ObjectName] = Source.[ObjectName], 
  [TypeId] = Source.[TypeId], 
  [Title] = Source.[Title], 
  [Body] = Source.[Body], 
  [Header] = Source.[Header], 
  [Footer] = Source.[Footer], 
  [Empty] = Source.[Empty], 
  [SQLSentence] = Source.[SQLSentence], 
  [SQLAdditionalWhere] = Source.[SQLAdditionalWhere], 
  [SQLOrderBy] = Source.[SQLOrderBy], 
  [SQLSearchFilter] = Source.[SQLSearchFilter], 
  [IsDefault] = Source.[IsDefault], 
  [ShowSearchBar] = Source.[ShowSearchBar], 
  [JSAfterLoad] = Source.[JSAfterLoad], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([AppName],[PageName],[ObjectName],[TypeId],[Title],[Body],[Header],[Footer],[Empty],[SQLSentence],[SQLAdditionalWhere],[SQLOrderBy],[SQLSearchFilter],[IsDefault],[ShowSearchBar],[JSAfterLoad],[OriginId])
 VALUES(Source.[AppName],Source.[PageName],Source.[ObjectName],Source.[TypeId],Source.[Title],Source.[Body],Source.[Header],Source.[Footer],Source.[Empty],Source.[SQLSentence],Source.[SQLAdditionalWhere],Source.[SQLOrderBy],Source.[SQLSearchFilter],Source.[IsDefault],Source.[ShowSearchBar],Source.[JSAfterLoad],Source.[OriginId])
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





