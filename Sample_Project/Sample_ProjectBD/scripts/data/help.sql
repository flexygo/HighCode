

BEGIN TRY

MERGE INTO [Help] AS Target
USING (VALUES
  (N'highcode_dllchange',N'On Change Dll Process',N'<legend>sdaasd</legend>',N'current',N'sql-1',NULL,0,N'Other',NULL,1)
 ,(N'highcode_dllcollectionprocess',N'Dll Process in Collection Menu',N'<legend>sdaasd</legend>',N'current',N'object',NULL,0,N'Other',NULL,1)
 ,(N'highcode_dllcrud',N'CRUD DLL Process',N'<legend>sdaasd</legend>',N'current',N'code-1',NULL,0,N'Other',NULL,1)
 ,(N'highcode_dllobjectprocess',N'Dll Process in Object Menu',N'<legend>sdaasd</legend>',N'current',N'object',NULL,0,N'Other',NULL,1)
 ,(N'highcode_spcollectionprocess',N'Stored Procedures in Collection Menu',N'<legend>XML Stored Procedure</legend>
1. Create stored procedure in database. 
2. Add reference to flexygo stored procedure.
3. Config object to insert, update or delete with type Stored Procedure and select correct process.',N'current',N'sql-1',NULL,0,N'Other',NULL,1)
 ,(N'highcode_spcrud',N'XML CRUD Stored Procedure',N'<style>
  .myhelp li{margin-bottom:10px;}
</style>
<div class="container text-justify myhelp">
  <legend><i class="flx-icon icon-sql" /> XML Stored Procedure</legend>
  <div style="margin-bottom: 25px">
      <h3><i class="flx-icon icon-plus" /> Insert object using XML Stored Procedure</h3>
      <ol>
        <li>Code stored procedure in database.</li>
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
        <li>Code stored procedure in database.</li>
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
        <li>Code stored procedure in database.</li>
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
</div>',N'current',N'noicon',NULL,0,N'Other',NULL,1)
 ,(N'highcode_spobjectprocess',N'Stored Procedures in Object Menu',N'<legend>sdaasd</legend>',N'current',N'add-user-2',NULL,0,N'Other',NULL,1)
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





