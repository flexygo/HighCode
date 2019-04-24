

BEGIN TRY

MERGE INTO [Kanban_Settings] AS Target
USING (VALUES
  (N'acciones_kanban_config',N'<h4><i class="fa fa-sun-o icon-margin-right"></i>Acciones</h4>',NULL,N'Equipo',N'acciones_kanban',N'Descrip',N'ActionState',NULL,NULL,N'Accion',N'Acciones_calendario',N'ActionId',N'ActionState',N'Comment',N'<div class="">
  <flx-navbutton type="openpage" pagetypeid="view" objectname="Accion" objectwhere="(Actions.ActionId={{ActionId}})" defaults="" targetid="popup" excludehist="false">
    <div class="clickable ellipsis size-m"> <i class="fa fa-sun-o icon-margin-right" alt="{{ActionId}}" style="color:{{CssClass}}"></i> <span><b>{{Comment}}</b></span></div>
  </flx-navbutton>
  <flx-navbutton type="openpage" pagetypeid="view" objectname="Client" objectwhere="(Client.IdClient={{IdClient}})" defaults="" targetid="popup" excludehist="false">
    <div class="clickable ellipsis size-m"><i class="flx-icon icon-man icon-margin-right"></i><a href="#">{{NameCli}}</a></div>
  </flx-navbutton>
</div>',N'pPers_ActionKanbanChangeColumn',NULL,N'4',NULL,N'Archive',N'archive',NULL,1)
) AS Source ([KanbanSettingsName],[BoardTitleTemplate],[BoardDescripTemplate],[BoardObjectName],[ColumnViewName],[ColumnDescripField],[ColumnIdField],[ColumnCssClassField],[ColumnIconIdField],[CardObjectName],[CardViewName],[CardIdField],[CardColumnIdField],[CardDescripField],[CardContentTemplate],[onChangeColumnProcess],[onCardClick],[EndBoxLastState],[EndBoxProcess],[EndBoxText],[EndBoxIconName],[EndBoxCssClass],[OriginId])
ON (Target.[KanbanSettingsName] = Source.[KanbanSettingsName])
WHEN MATCHED AND (
	NULLIF(Source.[BoardTitleTemplate], Target.[BoardTitleTemplate]) IS NOT NULL OR NULLIF(Target.[BoardTitleTemplate], Source.[BoardTitleTemplate]) IS NOT NULL OR 
	NULLIF(Source.[BoardDescripTemplate], Target.[BoardDescripTemplate]) IS NOT NULL OR NULLIF(Target.[BoardDescripTemplate], Source.[BoardDescripTemplate]) IS NOT NULL OR 
	NULLIF(Source.[BoardObjectName], Target.[BoardObjectName]) IS NOT NULL OR NULLIF(Target.[BoardObjectName], Source.[BoardObjectName]) IS NOT NULL OR 
	NULLIF(Source.[ColumnViewName], Target.[ColumnViewName]) IS NOT NULL OR NULLIF(Target.[ColumnViewName], Source.[ColumnViewName]) IS NOT NULL OR 
	NULLIF(Source.[ColumnDescripField], Target.[ColumnDescripField]) IS NOT NULL OR NULLIF(Target.[ColumnDescripField], Source.[ColumnDescripField]) IS NOT NULL OR 
	NULLIF(Source.[ColumnIdField], Target.[ColumnIdField]) IS NOT NULL OR NULLIF(Target.[ColumnIdField], Source.[ColumnIdField]) IS NOT NULL OR 
	NULLIF(Source.[ColumnCssClassField], Target.[ColumnCssClassField]) IS NOT NULL OR NULLIF(Target.[ColumnCssClassField], Source.[ColumnCssClassField]) IS NOT NULL OR 
	NULLIF(Source.[ColumnIconIdField], Target.[ColumnIconIdField]) IS NOT NULL OR NULLIF(Target.[ColumnIconIdField], Source.[ColumnIconIdField]) IS NOT NULL OR 
	NULLIF(Source.[CardObjectName], Target.[CardObjectName]) IS NOT NULL OR NULLIF(Target.[CardObjectName], Source.[CardObjectName]) IS NOT NULL OR 
	NULLIF(Source.[CardViewName], Target.[CardViewName]) IS NOT NULL OR NULLIF(Target.[CardViewName], Source.[CardViewName]) IS NOT NULL OR 
	NULLIF(Source.[CardIdField], Target.[CardIdField]) IS NOT NULL OR NULLIF(Target.[CardIdField], Source.[CardIdField]) IS NOT NULL OR 
	NULLIF(Source.[CardColumnIdField], Target.[CardColumnIdField]) IS NOT NULL OR NULLIF(Target.[CardColumnIdField], Source.[CardColumnIdField]) IS NOT NULL OR 
	NULLIF(Source.[CardDescripField], Target.[CardDescripField]) IS NOT NULL OR NULLIF(Target.[CardDescripField], Source.[CardDescripField]) IS NOT NULL OR 
	NULLIF(Source.[CardContentTemplate], Target.[CardContentTemplate]) IS NOT NULL OR NULLIF(Target.[CardContentTemplate], Source.[CardContentTemplate]) IS NOT NULL OR 
	NULLIF(Source.[onChangeColumnProcess], Target.[onChangeColumnProcess]) IS NOT NULL OR NULLIF(Target.[onChangeColumnProcess], Source.[onChangeColumnProcess]) IS NOT NULL OR 
	NULLIF(Source.[onCardClick], Target.[onCardClick]) IS NOT NULL OR NULLIF(Target.[onCardClick], Source.[onCardClick]) IS NOT NULL OR 
	NULLIF(Source.[EndBoxLastState], Target.[EndBoxLastState]) IS NOT NULL OR NULLIF(Target.[EndBoxLastState], Source.[EndBoxLastState]) IS NOT NULL OR 
	NULLIF(Source.[EndBoxProcess], Target.[EndBoxProcess]) IS NOT NULL OR NULLIF(Target.[EndBoxProcess], Source.[EndBoxProcess]) IS NOT NULL OR 
	NULLIF(Source.[EndBoxText], Target.[EndBoxText]) IS NOT NULL OR NULLIF(Target.[EndBoxText], Source.[EndBoxText]) IS NOT NULL OR 
	NULLIF(Source.[EndBoxIconName], Target.[EndBoxIconName]) IS NOT NULL OR NULLIF(Target.[EndBoxIconName], Source.[EndBoxIconName]) IS NOT NULL OR 
	NULLIF(Source.[EndBoxCssClass], Target.[EndBoxCssClass]) IS NOT NULL OR NULLIF(Target.[EndBoxCssClass], Source.[EndBoxCssClass]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [BoardTitleTemplate] = Source.[BoardTitleTemplate], 
  [BoardDescripTemplate] = Source.[BoardDescripTemplate], 
  [BoardObjectName] = Source.[BoardObjectName], 
  [ColumnViewName] = Source.[ColumnViewName], 
  [ColumnDescripField] = Source.[ColumnDescripField], 
  [ColumnIdField] = Source.[ColumnIdField], 
  [ColumnCssClassField] = Source.[ColumnCssClassField], 
  [ColumnIconIdField] = Source.[ColumnIconIdField], 
  [CardObjectName] = Source.[CardObjectName], 
  [CardViewName] = Source.[CardViewName], 
  [CardIdField] = Source.[CardIdField], 
  [CardColumnIdField] = Source.[CardColumnIdField], 
  [CardDescripField] = Source.[CardDescripField], 
  [CardContentTemplate] = Source.[CardContentTemplate], 
  [onChangeColumnProcess] = Source.[onChangeColumnProcess], 
  [onCardClick] = Source.[onCardClick], 
  [EndBoxLastState] = Source.[EndBoxLastState], 
  [EndBoxProcess] = Source.[EndBoxProcess], 
  [EndBoxText] = Source.[EndBoxText], 
  [EndBoxIconName] = Source.[EndBoxIconName], 
  [EndBoxCssClass] = Source.[EndBoxCssClass], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([KanbanSettingsName],[BoardTitleTemplate],[BoardDescripTemplate],[BoardObjectName],[ColumnViewName],[ColumnDescripField],[ColumnIdField],[ColumnCssClassField],[ColumnIconIdField],[CardObjectName],[CardViewName],[CardIdField],[CardColumnIdField],[CardDescripField],[CardContentTemplate],[onChangeColumnProcess],[onCardClick],[EndBoxLastState],[EndBoxProcess],[EndBoxText],[EndBoxIconName],[EndBoxCssClass],[OriginId])
 VALUES(Source.[KanbanSettingsName],Source.[BoardTitleTemplate],Source.[BoardDescripTemplate],Source.[BoardObjectName],Source.[ColumnViewName],Source.[ColumnDescripField],Source.[ColumnIdField],Source.[ColumnCssClassField],Source.[ColumnIconIdField],Source.[CardObjectName],Source.[CardViewName],Source.[CardIdField],Source.[CardColumnIdField],Source.[CardDescripField],Source.[CardContentTemplate],Source.[onChangeColumnProcess],Source.[onCardClick],Source.[EndBoxLastState],Source.[EndBoxProcess],Source.[EndBoxText],Source.[EndBoxIconName],Source.[EndBoxCssClass],Source.[OriginId])
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





