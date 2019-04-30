

BEGIN TRY

MERGE INTO [Help] AS Target
USING (VALUES
  (N'highcode_dllchange',N'On Change Dll Process',N'<style>
  .myhelp li{margin-bottom:10px;}
</style>
<div class="container text-justify myhelp padding-xl bg-white" style="box-shadow: 3px 3px 10px -5px rgba(0,0,0,0.75);">
  <legend style="font-size:2em"><i class="fa fa-exchange" /> On Change Dll Process</legend>
  <div style="margin-top:10px;margin-bottom: 15px">
      <h3><i class="flx-icon icon-plus" /> Add dll process into a object property.</h3>
      <ol>
        <li>Code vb.net function in dll.
          <a target="_blank" href="https://github.com/flexygo/HighCode/blob/master/Sample_Project/Sample_Project_Processes/SaleOnChangeProcess.vb">
            <i><i class="flx-icon icon-eye"/> view sample</i>
          </a></li>
        <li>Add it to flexygo dll processes repository at <b>Admin Work Area</b> > <b>Logic and Rules</b> > <b>Server Dll</b>. 
          <flx-navbutton type="openpage" pagetypeid="edit" objectname="sysProcess" objectwhere="(ProcessName=''LoadProcess'')" defaults="{''TypeId'':1}" targetid="modal" excludehist="true">
            <a class="clickable"><i><i class="flx-icon icon-eye"/> view sample</i></a>
          </flx-navbutton>
        </li>      
        <li>Set <b>On Change Process</b> field in property settings and select correct process.
          <flx-navbutton type="openpage" pagetypeid="edit" objectname="sysObjectProperty" objectwhere="Objects_Properties.ObjectName=''Venta'' and Objects_Properties.PropertyName=''DateEnd''" targetid="modal" excludehist="true">
            <a class="clickable"><i><i class="flx-icon icon-eye"></i> view sample</i></a>
          </flx-navbutton>
        </li>
          <li>You can also set <b>Load Process</b> field in object settings and select correct process.
          <flx-navbutton type="openpage" pagetypeid="edit" objectname="sysObject" objectwhere="Objects.ObjectName=''Venta''" targetid="modal" excludehist="true">
            <a class="clickable"><i><i class="flx-icon icon-eye"></i> view sample</i></a>
          </flx-navbutton>
        </li>
      </ol>
  </div>
  <div style="text-align:center">
  <flx-navbutton type="openpage" pagetypeid="edit" objectname="Venta" targetid="modal" excludehist="true">
    <button style="width:150px" class="btn bg-outstanding"><i class="fa fa-play-circle"/> Test</button>
   </flx-navbutton> 
  </div>
</div>',N'current',N'sql-1',NULL,0,N'Other',NULL,1)
 ,(N'highcode_dllcollectionprocess',N'Dll Process in Collection Menu',N'<style>
  .myhelp li{margin-bottom:10px;}
</style>
<div class="container text-justify myhelp padding-xl bg-white" style="box-shadow: 3px 3px 10px -5px rgba(0,0,0,0.75);">
  <legend style="font-size:2em"><i class="flx-icon icon-object-relations" /> Collection DLL Process</legend>
  <div style="margin-top:10px;margin-bottom: 15px">
      <h3><i class="flx-icon icon-plus" /> Add dll process into list menu.</h3>
      <ol>
        <li>Set <b>Unique Identifier Field</b> in object configuration to allow collection process. 
          <flx-navbutton type="openpage" pagetypeid="edit" objectname="sysObject" objectwhere="(ObjectName=''Cliente'')" targetid="modal" excludehist="true">
            <a class="clickable"><i><i class="flx-icon icon-eye"/> view sample</i></a>
          </flx-navbutton>
        </li>
        <li>Code vb.net function in dll.
          <a target="_blank" href="https://github.com/flexygo/HighCode/blob/master/Sample_Project/Sample_Project_Processes/ClientCollectionProcess.vb">
            <i><i class="flx-icon icon-eye"/> view sample</i>
          </a>
        </li>
        <li>Add it to flexygo stored procedure repository at <b>Admin Work Area</b> > <b>Logic and Rules</b> > <b>Sever Dll</b>. 
          <flx-navbutton type="openpage" pagetypeid="edit" objectname="sysProcess" objectwhere="(ProcessName=''ConvertToNationalColl'')" defaults="{''TypeId'':1}" targetid="modal" excludehist="true">
            <a class="clickable"><i><i class="flx-icon icon-eye"/> view sample</i></a>
          </flx-navbutton>
        </li>
        <li>If stored has parameters insert it automatically using <b>Generate parameters</b> menu.</li>
        <li>Add relation to object in <b>Admin Work Area</b> &gt; <b>Object management</b> &gt; <b>Logic</b>.
          <flx-navbutton type="openpage" pagetypeid="edit" objectname="sysObjectProcess" objectwhere="Objects_Processes.ObjectName=''Clientes'' and Objects_Processes.ProcessName=''ConvertToNationalColl''" targetid="modal" excludehist="true">
            <a class="clickable"><i><i class="flx-icon icon-eye"></i> view sample</i></a>
          </flx-navbutton>
        </li>
      </ol>
  </div>
  <div style="text-align:center">
  <flx-navbutton type="openpage" pagetypeid="list" objectname="Clientes" targetid="modal" excludehist="true">
    <button style="width:150px" class="btn bg-outstanding"><i class="fa fa-play-circle"/> Test</button>
   </flx-navbutton> 
  </div>
</div>',N'current',N'object',NULL,0,N'Other',NULL,1)
 ,(N'highcode_dllcrud',N'CRUD DLL Process',N'<style>
  .myhelp li{margin-bottom:10px;}
</style>
<div class="container text-justify myhelp padding-xl bg-white" style="box-shadow: 3px 3px 10px -5px rgba(0,0,0,0.75);">
  <legend style="font-size:2em"><i class="fa fa-code" /> CRUD DLL Process</legend>
  <div style="margin-top:10px;margin-bottom: 15px">
      <h3><i class="flx-icon icon-plus" /> Insert object using DLL Process.</h3>
      <ol>
        <li>Code vb.net function in dll.
          <a target="_blank" href="https://github.com/flexygo/HighCode/blob/master/Sample_Project/Sample_Project_Processes/ClientProcesses.vb">
            <i><i class="flx-icon icon-eye"/> view sample</i>
          </a></li>
        <li>Add it to flexygo server dll repository at <b>Admin Work Area</b> > <b>Logic and Rules</b> > <b>Server DLL</b>. 
          <flx-navbutton type="openpage" pagetypeid="edit" objectname="sysProcess" objectwhere="(ProcessName=''InsertClient'')" defaults="{''TypeId'':1}" targetid="modal" excludehist="true">
            <a class="clickable"><i><i class="flx-icon icon-eye"/> view sample</i></a>
          </flx-navbutton>
        </li>
        <li>Set <b>Insert Type</b> field in Object settings to <b>Dll Process</b> and select correct process.
          <flx-navbutton type="openpage" pagetypeid="edit" objectname="sysObject" objectwhere="Objects.ObjectName=''Cliente''" targetid="modal" excludehist="true">
            <a class="clickable"><i><i class="flx-icon icon-eye"/> view sample</i></a>
          </flx-navbutton>
        </li>
      </ol>
  </div>
  <div style="margin-bottom: 25px">
      <h3><i class="flx-icon icon-update" /> Update object by using Dll Process</h3>
      <ol>
        <li>Code vb.net function in dll.
          <a target="_blank" href="https://github.com/flexygo/HighCode/blob/master/Sample_Project/Sample_Project_Processes/ClientProcesses.vb">
            <i><i class="flx-icon icon-eye"/> view sample</i>
          </a>
          </li>
      <li>Add it to flexygo server dll repository at <b>Admin Work Area</b> > <b>Logic and Rules</b> > <b>Server DLL</b>. 
          <flx-navbutton type="openpage" pagetypeid="edit" objectname="sysProcess" objectwhere="(ProcessName=''UpdateClient'')" defaults="{''TypeId'':1}" targetid="modal" excludehist="true">
            <a class="clickable"><i><i class="flx-icon icon-eye"/> view sample</i></a>
          </flx-navbutton>
        </li>
        <li>Set <b>Update Type</b> field in Object settings to <b>Dll Process</b> and select correct process.
          <flx-navbutton type="openpage" pagetypeid="edit" objectname="sysObject" objectwhere="Objects.ObjectName=''Cliente''" targetid="modal" excludehist="true">
            <a class="clickable"><i><i class="flx-icon icon-eye"/> view sample</i></a>
          </flx-navbutton>     
        </li>
      </ol>
  </div>
  <div style="margin-bottom: 25px">
      <h3><i class="fa fa-close" /> Delete object by using Dll Process</h3>
      <ol>
        <li>Code vb.net function in dll.
          <a target="_blank" href="https://github.com/flexygo/HighCode/blob/master/Sample_Project/Sample_Project_Processes/ClientProcesses.vb">
            <i><i class="flx-icon icon-eye"/> view sample</i>
          </a>
          </li>
        <li>Add it to flexygo server dll repository at <b>Admin Work Area</b> > <b>Logic and Rules</b> > <b>Server DLL</b>. 
          <flx-navbutton type="openpage" pagetypeid="edit" objectname="sysProcess" objectwhere="(ProcessName=''DeleteClient'')" defaults="{''TypeId'':1}" targetid="modal" excludehist="true">
            <a class="clickable"><i><i class="flx-icon icon-eye"/> view sample</i></a>
          </flx-navbutton>        
        </li>
        <li>Set <b>Delete Type</b> field in Object settings to <b>Dll Process</b> and select correct process.
          <flx-navbutton type="openpage" pagetypeid="edit" objectname="sysObject" objectwhere="Objects.ObjectName=''Cliente''" targetid="modal" excludehist="true">
            <a class="clickable"><i><i class="flx-icon icon-eye"/> view sample</i></a>
          </flx-navbutton>     
        </li>
      </ol>
  </div>
  <div style="text-align:center">
  <flx-navbutton type="openpage" pagetypeid="list" objectname="Clientes" targetid="modal" excludehist="true">
    <button style="width:150px" class="btn bg-outstanding"><i class="fa fa-play-circle"/> Test</button>
   </flx-navbutton> 
  </div>
</div>',N'current',N'code-1',NULL,0,N'Other',NULL,1)
 ,(N'highcode_dllobjectprocess',N'Dll Process in Object Menu',N'<style>
  .myhelp li{margin-bottom:10px;}
</style>
<div class="container text-justify myhelp padding-xl bg-white" style="box-shadow: 3px 3px 10px -5px rgba(0,0,0,0.75);">
  <legend style="font-size:2em"><i class="flx-icon icon-object" /> Object Dll Process</legend>
  <div style="margin-top:10px;margin-bottom: 15px">
      <h3><i class="flx-icon icon-plus" /> Add dll process into object menu.</h3>
      <ol>
        <li>Code vb.net function in dll.
          <a target="_blank" href="https://github.com/flexygo/HighCode/blob/master/Sample_Project/Sample_Project_Processes/ClientObjectProcess.vb">
            <i><i class="flx-icon icon-eye"/> view sample</i>
          </a></li>
        <li>Add it to flexygo dll processes repository at <b>Admin Work Area</b> > <b>Logic and Rules</b> > <b>Server Dll</b>. 
          <flx-navbutton type="openpage" pagetypeid="edit" objectname="sysProcess" objectwhere="(ProcessName=''ConvertToNational'')" defaults="{''TypeId'':1}" targetid="modal" excludehist="true">
            <a class="clickable"><i><i class="flx-icon icon-eye"/> view sample</i></a>
          </flx-navbutton>
        </li>
        <li>If function has parameters insert it automatically using <b>Generate parameters</b> menu.</li>
        <li>Add relation to object in <b>Admin Work Area</b> &gt; <b>Object management</b> &gt; <b>Logic</b>.
          <flx-navbutton type="openpage" pagetypeid="edit" objectname="sysObjectProcess" objectwhere="Objects_Processes.ObjectName=''Cliente'' and Objects_Processes.ProcessName=''ConvertToNational''" targetid="modal" excludehist="true">
            <a class="clickable"><i><i class="flx-icon icon-eye"></i> view sample</i></a>
          </flx-navbutton>
        </li>
      </ol>
  </div>
  <div style="text-align:center">
  <flx-navbutton type="openpage" pagetypeid="list" objectname="Clientes" targetid="modal" excludehist="true">
    <button style="width:150px" class="btn bg-outstanding"><i class="fa fa-play-circle"/> Test</button>
   </flx-navbutton> 
  </div>
</div>',N'current',N'object',NULL,0,N'Other',NULL,1)
 ,(N'highcode_jshtmltools',N'HTML Tools',N'<style>
  .myhelp li{margin-bottom:10px;}
</style>
<div class="container text-justify myhelp padding-xl bg-white" style="box-shadow: 3px 3px 10px -5px rgba(0,0,0,0.75);">
  <div style="margin-top:10px;margin-bottom: 15px">
  <legend style="font-size:2em"><i class="fa fa-html5" /> HTML Editor</legend>
  <h3><i class="flx-icon icon-help-2" /> How to access to HTML editor and load JS examples</h3>
      <ol>
        <li>Go to <b>Admin Work Area</b> > <b>Other tools</b> > <flx-navbutton type="openpagename" pagename="syspage-generic-htmleditor" targetid="current" excludehist="false"><a class="clickable"><b>HTML Editor</b></a></flx-navbutton> .</li>
        <li>Select desired example in top right combo.</li>
        <li>Click on folder icon to load code.</li>
      </ol>
  </div>
  <legend style="font-size:2em"><i class="flx-icon icon-sql" /> Examples: </legend>
  <div style="margin-top:10px;margin-bottom: 15px">
      <h3><i class="flx-icon icon-add-objects-2" /> JS CRUD (Entity Insert, Update, Delete)</h3>
      <span>In this example you can see how to insert, update or delete a flexygo entity object using javascript methods.</span>
  </div>
  <div style="margin-top:10px;margin-bottom: 15px">
      <h3><i class="flx-icon icon-bullet-list-3" /> View data and paint rows.</h3>
      <span>In this example you can see how to get data from flexygo''s dataviews using javascript methods.</span>
  </div>
  <div style="margin-top:10px;margin-bottom: 15px">
      <h3><i class="flx-icon icon-report-filters" /> Filtering list module</h3>
      <span>In this example you can see how apply SQL filters to flexygo''s list module using javascript methods.</span>
  </div>
</div>',N'current',N'noicon',NULL,0,N'Other',NULL,1)
 ,(N'highcode_jsnestedmodules',N'JS Nested Filter',N'<style>
  .myhelp li{margin-bottom:10px;}
</style>
<div class="container text-justify myhelp padding-xl bg-white" style="box-shadow: 3px 3px 10px -5px rgba(0,0,0,0.75);">
  <legend style="font-size:2em"><i class="flx-icon icon-javascript" /> Collection Stored Procedure</legend>
  <div style="margin-top:10px;margin-bottom: 15px">
      <h3><i class="flx-icon icon-javascript-2" /> Interacting with modules using typescript file.</h3>
      <ol>
        <li>Code your typescript file and include into your project.
          <a target="_blank" href="https://github.com/flexygo/HighCode/blob/master/Sample_Project/Sample_Project/sample_project/js/nested_modules.ts">
            <i><i class="flx-icon icon-eye"/> view sample</i>
          </a>
        </li>
        <li>Add it to flexygo plugin repository at <b>Admin Work Area</b> > <b>Environmnet</b> > <b>Plugins</b>. 
          <flx-navbutton type="openpage" pagetypeid="edit" objectname="sysPlugin" objectwhere="(PluginId=''E3B3EF34-9104-4287-ACF4-AC6DE6F6721E'')" defaults="{''TypeId'':0}" targetid="modal" excludehist="true">
            <a class="clickable"><i><i class="flx-icon icon-eye"/> view sample</i></a>
          </flx-navbutton>
        </li>
        <li>Configure your module to invoke your js funcion in <b>JS AfterLoad</b> field
        <flx-navbutton type="openpage" pagetypeid="edit" objectname="sysModule" objectwhere="(ModuleName=''ventas_list_filtrada'')" targetid="modal" excludehist="true">
            <a class="clickable"><i><i class="flx-icon icon-eye"/> view sample</i></a>
          </flx-navbutton>
        </li>
      </ol>
  </div>
  <div style="text-align:center">
  <flx-navbutton type="openpage" pagetypeid="list" objectname="Ventas" targetid="modal" excludehist="true">
    <button style="width:150px" class="btn bg-outstanding"><i class="fa fa-play-circle"/> Test</button>
   </flx-navbutton> 
  </div>
</div>',N'current',N'add-user-2',NULL,0,N'Other',NULL,1)
 ,(N'highcode_spcollectionprocess',N'Stored Procedures in Collection Menu',N'<style>
  .myhelp li{margin-bottom:10px;}
</style>
<div class="container text-justify myhelp padding-xl bg-white" style="box-shadow: 3px 3px 10px -5px rgba(0,0,0,0.75);">
  <legend style="font-size:2em"><i class="flx-icon icon-sql" /> Collection Stored Procedure</legend>
  <div style="margin-top:10px;margin-bottom: 15px">
      <h3><i class="flx-icon icon-plus" /> Add stored procedure process into list menu.</h3>
      <ol>
        <li>Set <b>Unique Identifier Field</b> in object configuration to allow collection process. 
          <flx-navbutton type="openpage" pagetypeid="edit" objectname="sysObject" objectwhere="(ObjectName=''Cliente'')" targetid="modal" excludehist="true">
            <a class="clickable"><i><i class="flx-icon icon-eye"/> view sample</i></a>
          </flx-navbutton>
        </li>
        <li>Code stored procedure in database. <br/>
          Append a param with name <b>@sysCollectionSentence</b> and type <b>nvarchar(max)</b> to recive an sql with selected items.
          <a target="_blank" href="https://github.com/flexygo/HighCode/blob/master/Sample_Project/Sample_Project_DataBD/dbo/Stored%20Procedures/pPers_LockClientBatch.sql">
            <i><i class="flx-icon icon-eye"/> view sample</i>
          </a>
        </li>
        <li>Add it to flexygo stored procedure repository at <b>Admin Work Area</b> > <b>Logic and Rules</b> > <b>DB Stored Procedures</b>. 
          <flx-navbutton type="openpage" pagetypeid="edit" objectname="sysProcess" objectwhere="(ProcessName=''pPers_LockClientBatch'')" defaults="{''TypeId'':0}" targetid="modal" excludehist="true">
            <a class="clickable"><i><i class="flx-icon icon-eye"/> view sample</i></a>
          </flx-navbutton>
        </li>
        <li>If stored has parameters insert it automatically using <b>Generate parameters</b> menu.</li>
        <li>Add relation to object in <b>Admin Work Area</b> &gt; <b>Object management</b> &gt; <b>Logic</b>.
          <flx-navbutton type="openpage" pagetypeid="edit" objectname="sysObjectProcess" objectwhere="Objects_Processes.ObjectName=''Clientes'' and Objects_Processes.ProcessName=''pPers_LockClientBatch''" targetid="modal" excludehist="true">
            <a class="clickable"><i><i class="flx-icon icon-eye"></i> view sample</i></a>
          </flx-navbutton>
        </li>
      </ol>
  </div>
  <div style="text-align:center">
  <flx-navbutton type="openpage" pagetypeid="list" objectname="Clientes" targetid="modal" excludehist="true">
    <button style="width:150px" class="btn bg-outstanding"><i class="fa fa-play-circle"/> Test</button>
   </flx-navbutton> 
  </div>
</div>',N'current',N'sql-1',NULL,0,N'Other',NULL,1)
 ,(N'highcode_spcrud',N'XML CRUD Stored Procedure',N'<style>
  .myhelp li{margin-bottom:10px;}
</style>
<div class="container text-justify myhelp padding-xl bg-white" style="box-shadow: 3px 3px 10px -5px rgba(0,0,0,0.75);">
  <legend style="font-size:2em"><i class="flx-icon icon-sql" /> XML Stored Procedure</legend>
  <div style="margin-top:10px;margin-bottom: 15px">
      <h3><i class="flx-icon icon-plus" /> Insert object using XML Stored Procedure.</h3>
      <ol>
        <li>Code stored procedure in database.
          <a target="_blank" href="https://github.com/flexygo/HighCode/blob/master/Sample_Project/Sample_Project_DataBD/dbo/Stored%20Procedures/P_Action_I.sql">
            <i><i class="flx-icon icon-eye"/> view sample</i>
          </a></li>
        <li>Add it to flexygo stored procedure repository at <b>Admin Work Area</b> > <b>Logic and Rules</b> > <b>DB Stored Procedures</b>. 
          <flx-navbutton type="openpage" pagetypeid="edit" objectname="sysProcess" objectwhere="(ProcessName=''P_Action_I'')" defaults="{''TypeId'':0}" targetid="modal" excludehist="true">
            <a class="clickable"><i><i class="flx-icon icon-eye"/> view sample</i></a>
          </flx-navbutton>
        </li>
        <li>Set <b>Insert Type</b> field in Object settings to <b>Stored Procedure</b> and select correct process.
          <flx-navbutton type="openpage" pagetypeid="edit" objectname="sysObject" objectwhere="Objects.ObjectName=''Accion''" targetid="modal" excludehist="true">
            <a class="clickable"><i><i class="flx-icon icon-eye"/> view sample</i></a>
          </flx-navbutton>
        </li>
      </ol>
  </div>
  <div style="margin-bottom: 25px">
      <h3><i class="flx-icon icon-update" /> Update object using XML Stored Procedure</h3>
      <ol>
        <li>Code stored procedure in database.
          <a target="_blank" href="https://github.com/flexygo/HighCode/blob/master/Sample_Project/Sample_Project_DataBD/dbo/Stored%20Procedures/P_Action_U.sql">
            <i><i class="flx-icon icon-eye"/> view sample</i>
          </a>
          </li>
        <li>Add it to flexygo stored procedure repository at <b>Admin Work Area</b> > <b>Logic and Rules</b> > <b>DB Stored Procedures</b>. 
          <flx-navbutton type="openpage" pagetypeid="edit" objectname="sysProcess" objectwhere="(ProcessName=''P_Action_U'')" defaults="{''TypeId'':0}" targetid="modal" excludehist="true">
            <a class="clickable"><i><i class="flx-icon icon-eye"/> view sample</i></a>
          </flx-navbutton>
        </li>
        <li>Set <b>Update Type</b> field in Object settings to <b>Stored Procedure</b> and select correct process.
          <flx-navbutton type="openpage" pagetypeid="edit" objectname="sysObject" objectwhere="Objects.ObjectName=''Accion''" targetid="modal" excludehist="true">
            <a class="clickable"><i><i class="flx-icon icon-eye"/> view sample</i></a>
          </flx-navbutton>     
        </li>
      </ol>
  </div>
  <div style="margin-bottom: 25px">
      <h3><i class="fa fa-close" /> Delete object using XML Stored Procedure</h3>
      <ol>
        <li>Code stored procedure in database.
          <a target="_blank" href="https://github.com/flexygo/HighCode/blob/master/Sample_Project/Sample_Project_DataBD/dbo/Stored%20Procedures/P_Action_D.sql">
            <i><i class="flx-icon icon-eye"/> view sample</i>
          </a>
          </li>
        <li>Add it to flexygo stored procedure repository at <b>Admin Work Area</b> > <b>Logic and Rules</b> > <b>DB Stored Procedures</b>. 
          <flx-navbutton type="openpage" pagetypeid="edit" objectname="sysProcess" objectwhere="(ProcessName=''P_Action_D'')" defaults="{''TypeId'':0}" targetid="modal" excludehist="true">
            <a class="clickable"><i><i class="flx-icon icon-eye"/> view sample</i></a>
          </flx-navbutton>        
        </li>
        <li>Set <b>Delete Type</b> field in Object settings to <b>Stored Procedure</b> and select correct process.
          <flx-navbutton type="openpage" pagetypeid="edit" objectname="sysObject" objectwhere="Objects.ObjectName=''Accion''" targetid="modal" excludehist="true">
            <a class="clickable"><i><i class="flx-icon icon-eye"/> view sample</i></a>
          </flx-navbutton>     
        </li>
      </ol>
  </div>
  <div style="text-align:center">
  <flx-navbutton type="openpage" pagetypeid="list" objectname="Acciones" targetid="modal" excludehist="true">
    <button style="width:150px" class="btn bg-outstanding"><i class="fa fa-play-circle"/> Test</button>
   </flx-navbutton> 
  </div>
</div>',N'current',N'noicon',NULL,0,N'Other',NULL,1)
 ,(N'highcode_spobjectprocess',N'Stored Procedures in Object Menu',N'<style>
  .myhelp li{margin-bottom:10px;}
</style>
<div class="container text-justify myhelp padding-xl bg-white" style="box-shadow: 3px 3px 10px -5px rgba(0,0,0,0.75);">
  <legend style="font-size:2em"><i class="flx-icon icon-sql" /> Object Stored Procedure</legend>
  <div style="margin-top:10px;margin-bottom: 15px">
      <h3><i class="flx-icon icon-plus" /> Add stored procedure process into object menu.</h3>
      <ol>
        <li>Code stored procedure in database.
          <a target="_blank" href="https://github.com/flexygo/HighCode/blob/master/Sample_Project/Sample_Project_DataBD/dbo/Stored%20Procedures/pPers_LockClient.sql">
            <i><i class="flx-icon icon-eye"/> view sample</i>
          </a></li>
        <li>Add it to flexygo stored procedure repository at <b>Admin Work Area</b> > <b>Logic and Rules</b> > <b>DB Stored Procedures</b>. 
          <flx-navbutton type="openpage" pagetypeid="edit" objectname="sysProcess" objectwhere="(ProcessName=''Cliente_lock'')" defaults="{''TypeId'':0}" targetid="modal" excludehist="true">
            <a class="clickable"><i><i class="flx-icon icon-eye"/> view sample</i></a>
          </flx-navbutton>
        </li>
        <li>If stored has parameters insert it automatically using <b>Generate parameters</b> menu.</li>
        <li>Add relation to object in <b>Admin Work Area</b> &gt; <b>Object management</b> &gt; <b>Logic</b>.
          <flx-navbutton type="openpage" pagetypeid="edit" objectname="sysObjectProcess" objectwhere="Objects_Processes.ObjectName=''Cliente'' and Objects_Processes.ProcessName=''Cliente_lock''" targetid="modal" excludehist="true">
            <a class="clickable"><i><i class="flx-icon icon-eye"></i> view sample</i></a>
          </flx-navbutton>
        </li>
      </ol>
  </div>
  <div style="text-align:center">
  <flx-navbutton type="openpage" pagetypeid="list" objectname="Clientes" targetid="modal" excludehist="true">
    <button style="width:150px" class="btn bg-outstanding"><i class="fa fa-play-circle"/> Test</button>
   </flx-navbutton> 
  </div>
</div>',N'current',N'add-user-2',NULL,0,N'Other',NULL,1)
 ,(N'highcode_Testing',N'Testing',N'<style>
  .myhelp li{margin-bottom:10px;}
</style>
<div class="container text-justify myhelp padding-xl bg-white" style="box-shadow: 3px 3px 10px -5px rgba(0,0,0,0.75);">
  <div style="margin-top:10px;margin-bottom: 15px">
  <legend style="font-size:2em"><i class="flx-icon icon-task-manager-2" /> How to create a test in flexygo</legend>
      <ol>
        <li>Code your vb.net <b>UnitTest</b>.
            <a target="_blank" href="https://github.com/flexygo/HighCode/blob/master/Sample_Project/Sample_Project_UnitTest/UnitTest.vb">
            <i><i class="flx-icon icon-eye"/> view sample</i>
          </a>
        </li>
        <li>Code your vb.net <b>InterfaceTest</b>.
          <a target="_blank" href="https://github.com/flexygo/HighCode/blob/master/Sample_Project/Sample_Project_InterfaceTest/InterfaceTest.vb">
            <i><i class="flx-icon icon-eye"/> view sample</i>
          </a>
        </li>
        <li>Add <b>Unit Test dll</b> to flexygo tests repository.
          <flx-navbutton type="openpage" pagetypeid="edit" objectname="sysTest" objectwhere="(TestId=''9bb83c6e-d508-4b08-b818-b555e90afb26'')" targetid="modal" excludehist="true">
            <a class="clickable"><i><i class="flx-icon icon-eye"/> view sample</i></a>
          </flx-navbutton>
        </li>
        <li>Add <b>Interface Test dll</b> to flexygo tests repository.
          <flx-navbutton type="openpage" pagetypeid="edit" objectname="sysTest" objectwhere="(TestId=''c7a077c8-23a3-4d4d-a033-98807b75f2f3'')" targetid="modal" excludehist="true">
            <a class="clickable"><i><i class="flx-icon icon-eye"/> view sample</i></a>
          </flx-navbutton>
        </li>       
      </ol>
  </div>
  <div style="text-align:center">
    <a class="clickable" onclick="flexygo.nav.execProcess(''sys-showtest'','''','''',null,null,''current'',false,' + convert(nvarchar(max),NCHAR(36)) + N'(this))">
    <button style="width:150px" class="btn bg-outstanding"><i class="fa fa-play-circle"/> Test</button>
   </a>
  </div>
</div>',N'current',N'noicon',NULL,0,N'Other',NULL,1)
 ,(N'highcode_webcomponent',N'Web Component',N'<style>
  .myhelp li{margin-bottom:10px;}
</style>
<div class="container text-justify myhelp padding-xl bg-white" style="box-shadow: 3px 3px 10px -5px rgba(0,0,0,0.75);">
  <div style="margin-top:10px;margin-bottom: 15px">
  <legend style="font-size:2em"><i class="fa fa-gg" /> How to create a module with custom webcomponent in flexygo</legend>
      <ol>
        <li>Code your typescript file.
          <a target="_blank" href="https://github.com/flexygo/HighCode/blob/master/Sample_Project/Sample_Project/sample_project/js/wc/afl-carousel.ts">
            <i><i class="flx-icon icon-eye"/> view sample</i>
          </a>
        </li>
        <li>Code your server controller file.
          <a target="_blank" href="https://github.com/flexygo/HighCode/blob/master/Sample_Project/Sample_Project/sample_project/controllers/CarouselController.vb">
            <i><i class="flx-icon icon-eye"/> view sample</i>
          </a>
        </li>
        <li>Add typescript file to flexygo plugin repository.<b>Reference must be to JS file.</b>
          <flx-navbutton type="openpage" pagetypeid="edit" objectname="sysPlugin" objectwhere="(PluginId=''e34924d8-6faf-4443-b05f-47e8c61fe6d3'')" targetid="modal" excludehist="true">
            <a class="clickable"><i><i class="flx-icon icon-eye"/> view sample</i></a>
          </flx-navbutton>
        </li>
        <li>If you need external plugin, add it to flexygo plugin repository.
          <flx-navbutton type="openpage" pagetypeid="edit" objectname="sysPlugin" objectwhere="(PluginId=''275E3863-8312-46EE-9106-90EACB012673'')" targetid="modal" excludehist="true">
            <a class="clickable"><i><i class="flx-icon icon-eye"/> view sample</i></a>
          </flx-navbutton>
        </li>
        <li>Add new module definition to flexygo module types repository.
            <a class="clickable" onclick="flexygo.nav.openEditTable(''Modules_Types'',''modal'',''Modules Types'',true,' + convert(nvarchar(max),NCHAR(36)) + N'(this))"><i><i class="flx-icon icon-eye"/> view sample</i></a>
        </li>
      </ol>
  </div>
  <div style="text-align:center">
  <flx-navbutton type="openpagename" pagename="highcode_wc_carousel" targetid="modal" excludehist="true">
    <button style="width:150px" class="btn bg-outstanding"><i class="fa fa-play-circle"/> Test</button>
   </flx-navbutton> 
  </div>
</div>',N'current',N'noicon',NULL,0,N'Other',NULL,1)
) AS Source ([HelpId],[Title],[HTMLText],[TargetId],[IconName],[ExternalUrl],[Order],[Category],[Tag],[OriginId])
ON (Target.[HelpId] = Source.[HelpId])
WHEN MATCHED AND (
	NULLIF(Source.[Title], Target.[Title]) IS NOT NULL OR NULLIF(Target.[Title], Source.[Title]) IS NOT NULL OR 
	NULLIF(Source.[HTMLText], Target.[HTMLText]) IS NOT NULL OR NULLIF(Target.[HTMLText], Source.[HTMLText]) IS NOT NULL OR 
	NULLIF(Source.[TargetId], Target.[TargetId]) IS NOT NULL OR NULLIF(Target.[TargetId], Source.[TargetId]) IS NOT NULL OR 
	NULLIF(Source.[IconName], Target.[IconName]) IS NOT NULL OR NULLIF(Target.[IconName], Source.[IconName]) IS NOT NULL OR 
	NULLIF(Source.[ExternalUrl], Target.[ExternalUrl]) IS NOT NULL OR NULLIF(Target.[ExternalUrl], Source.[ExternalUrl]) IS NOT NULL OR 
	NULLIF(Source.[Order], Target.[Order]) IS NOT NULL OR NULLIF(Target.[Order], Source.[Order]) IS NOT NULL OR 
	NULLIF(Source.[Category], Target.[Category]) IS NOT NULL OR NULLIF(Target.[Category], Source.[Category]) IS NOT NULL OR 
	NULLIF(Source.[Tag], Target.[Tag]) IS NOT NULL OR NULLIF(Target.[Tag], Source.[Tag]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [Title] = Source.[Title], 
  [HTMLText] = Source.[HTMLText], 
  [TargetId] = Source.[TargetId], 
  [IconName] = Source.[IconName], 
  [ExternalUrl] = Source.[ExternalUrl], 
  [Order] = Source.[Order], 
  [Category] = Source.[Category], 
  [Tag] = Source.[Tag], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([HelpId],[Title],[HTMLText],[TargetId],[IconName],[ExternalUrl],[Order],[Category],[Tag],[OriginId])
 VALUES(Source.[HelpId],Source.[Title],Source.[HTMLText],Source.[TargetId],Source.[IconName],Source.[ExternalUrl],Source.[Order],Source.[Category],Source.[Tag],Source.[OriginId])
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





