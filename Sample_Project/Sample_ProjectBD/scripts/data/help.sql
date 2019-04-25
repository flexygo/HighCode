

BEGIN TRY

MERGE INTO [Help] AS Target
USING (VALUES
  (N'highcode_dllchange',N'On Change Dll Process',N'<legend>sdaasd</legend>',N'current',N'sql-1',NULL,0,N'Other',NULL,1)
 ,(N'highcode_dllcollectionprocess',N'Dll Process in Collection Menu',N'<style>
  .myhelp li{margin-bottom:10px;}
</style>
<div class="container text-justify myhelp padding-xl bg-white" style="box-shadow: 3px 3px 10px -5px rgba(0,0,0,0.75);">
  <legend style="font-size:2em"><i class="flx-icon icon-sql" /> Collection DLL Process</legend>
  <div style="margin-top:10px;margin-bottom: 15px">
      <h3><i class="flx-icon icon-plus" /> Add stored procedure process into list menu..</h3>
      <ol>
        <li>Set <b>Unique Identifier Field</b> in object configuration to allow collection process. 
          <flx-navbutton type="openpage" pagetypeid="edit" objectname="sysObject" objectwhere="(ObjectName=''Cliente'')" targetid="modal" excludehist="true">
            <a class="clickable"><i><i class="flx-icon icon-eye"/> view sample</i></a>
          </flx-navbutton>
        </li>
        <li>Code stored procedure in database.
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
</div>',N'current',N'object',NULL,0,N'Other',NULL,1)
 ,(N'highcode_dllcrud',N'CRUD DLL Process',N'<legend>sdaasd</legend>',N'current',N'code-1',NULL,0,N'Other',NULL,1)
 ,(N'highcode_dllobjectprocess',N'Dll Process in Object Menu',N'<legend>sdaasd</legend>',N'current',N'object',NULL,0,N'Other',NULL,1)
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
      <h3><i class="flx-icon icon-plus" /> Insert object using XML Stored Procedure</h3>
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
      <h3><i class="flx-icon icon-plus" /> Add stored procedure process into object menu..</h3>
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





