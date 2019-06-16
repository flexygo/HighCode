

BEGIN TRY

MERGE INTO [Pages_Modules] AS Target
USING (VALUES
  (N'29f7cdb0-2a09-45aa-9b47-2d38c7c9adde',N'Timeline_Basic',N'TopPosition',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1)
 ,(N'4DC8710D-D519-4300-953C-B6881728A3C1',N'ClientesdeEmpleado',N'TopPosition',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1)
 ,(N'4DC8710D-D519-4300-953C-B6881728A3C1',N'sysmod-view-generic',N'TopPosition',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1)
 ,(N'5194a99b-7ff4-47de-8e55-905df895e99b',N'Timeline_BasicWithGroups',N'TopPosition',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1)
 ,(N'55A3902E-271D-417B-8A6A-3048355CE117',N'sysmod-list-generic',N'TopPosition',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1)
 ,(N'61fe2a52-797e-4a42-80b4-b363fbdb023e',N'Scheduler_Month',N'TopPosition',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1)
 ,(N'62bf2c6e-16e2-4249-8920-d1774945488c',N'Scheduler_Calendar',N'TopPosition',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1)
 ,(N'6e53f498-7c99-4090-b365-3c26898c4391',N'Timeline_AdvancedWithGroups',N'TopPosition',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1)
 ,(N'7b4f1ea4-510c-4330-a5cd-859b97ba2149',N'Scheduler_Year',N'TopPosition',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1)
 ,(N'9BEA6F0E-4DF9-4667-9E36-D755BF3A84EB',N'ventas_list_filtrada',N'TopPosition',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1)
 ,(N'9BEA6F0E-4DF9-4667-9E36-D755BF3A84EB',N'Ventas_Totales',N'RightPosition',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1)
 ,(N'Acciones_calendario',N'calendario_acciones',N'TopPosition',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1)
 ,(N'acciones_kanban',N'acciones_kanban',N'TopPosition',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1)
 ,(N'B2F9A6DE-5B6D-40D3-8011-A8EED03A05A7',N'GenericViewNoHeader',N'TopPosition',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1)
 ,(N'DC383501-83BE-4821-BB15-7868697E71A6',N'Clients_Docs_CountDocuments',N'TopRightPosition',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1)
 ,(N'DC383501-83BE-4821-BB15-7868697E71A6',N'Contacts_Related',N'CenterLeftPosition',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1)
 ,(N'DC383501-83BE-4821-BB15-7868697E71A6',N'graficaVtasPorCliente',N'TopRightPosition',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1)
 ,(N'DC383501-83BE-4821-BB15-7868697E71A6',N'grafVtasxCliente',N'TopRightPosition',NULL,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1)
 ,(N'DC383501-83BE-4821-BB15-7868697E71A6',N'sysmod-relatedobjects-default',N'CenterRightPosition',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1)
 ,(N'DC383501-83BE-4821-BB15-7868697E71A6',N'sysmod-relatedprocesses-default',N'CenterRightPosition',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1)
 ,(N'DC383501-83BE-4821-BB15-7868697E71A6',N'sysmod-view-generic',N'TopPosition',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1)
 ,(N'E59F61C0-3F30-4AA3-9744-4ACE436A04C1',N'mimodulodeventas',N'TopPosition',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1)
 ,(N'fa6aadad-f081-488a-afad-fa0ebb9df91d',N'Timeline_Advanced',N'TopPosition',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1)
 ,(N'highcode_wc_carousel',N'highcode_carousel',N'TopPosition',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1)
 ,(N'Kanban_Board',N'Kanban_Board',N'TopPosition',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1)
 ,(N'Ventas_calendario',N'calendario_ventas',N'TopPosition',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1)
) AS Source ([PageName],[ModuleName],[LayoutPositionId],[RelationWhere],[Order],[SQlEnabled],[SQLEnabledDescrip],[Title],[IconName],[HeaderClass],[ModuleClass],[ConnStringID],[OriginId])
ON (Target.[PageName] = Source.[PageName] AND Target.[ModuleName] = Source.[ModuleName])
WHEN MATCHED AND (
	NULLIF(Source.[LayoutPositionId], Target.[LayoutPositionId]) IS NOT NULL OR NULLIF(Target.[LayoutPositionId], Source.[LayoutPositionId]) IS NOT NULL OR 
	NULLIF(Source.[RelationWhere], Target.[RelationWhere]) IS NOT NULL OR NULLIF(Target.[RelationWhere], Source.[RelationWhere]) IS NOT NULL OR 
	NULLIF(Source.[Order], Target.[Order]) IS NOT NULL OR NULLIF(Target.[Order], Source.[Order]) IS NOT NULL OR 
	NULLIF(Source.[SQlEnabled], Target.[SQlEnabled]) IS NOT NULL OR NULLIF(Target.[SQlEnabled], Source.[SQlEnabled]) IS NOT NULL OR 
	NULLIF(Source.[SQLEnabledDescrip], Target.[SQLEnabledDescrip]) IS NOT NULL OR NULLIF(Target.[SQLEnabledDescrip], Source.[SQLEnabledDescrip]) IS NOT NULL OR 
	NULLIF(Source.[Title], Target.[Title]) IS NOT NULL OR NULLIF(Target.[Title], Source.[Title]) IS NOT NULL OR 
	NULLIF(Source.[IconName], Target.[IconName]) IS NOT NULL OR NULLIF(Target.[IconName], Source.[IconName]) IS NOT NULL OR 
	NULLIF(Source.[HeaderClass], Target.[HeaderClass]) IS NOT NULL OR NULLIF(Target.[HeaderClass], Source.[HeaderClass]) IS NOT NULL OR 
	NULLIF(Source.[ModuleClass], Target.[ModuleClass]) IS NOT NULL OR NULLIF(Target.[ModuleClass], Source.[ModuleClass]) IS NOT NULL OR 
	NULLIF(Source.[ConnStringID], Target.[ConnStringID]) IS NOT NULL OR NULLIF(Target.[ConnStringID], Source.[ConnStringID]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [LayoutPositionId] = Source.[LayoutPositionId], 
  [RelationWhere] = Source.[RelationWhere], 
  [Order] = Source.[Order], 
  [SQlEnabled] = Source.[SQlEnabled], 
  [SQLEnabledDescrip] = Source.[SQLEnabledDescrip], 
  [Title] = Source.[Title], 
  [IconName] = Source.[IconName], 
  [HeaderClass] = Source.[HeaderClass], 
  [ModuleClass] = Source.[ModuleClass], 
  [ConnStringID] = Source.[ConnStringID], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([PageName],[ModuleName],[LayoutPositionId],[RelationWhere],[Order],[SQlEnabled],[SQLEnabledDescrip],[Title],[IconName],[HeaderClass],[ModuleClass],[ConnStringID],[OriginId])
 VALUES(Source.[PageName],Source.[ModuleName],Source.[LayoutPositionId],Source.[RelationWhere],Source.[Order],Source.[SQlEnabled],Source.[SQLEnabledDescrip],Source.[Title],Source.[IconName],Source.[HeaderClass],Source.[ModuleClass],Source.[ConnStringID],Source.[OriginId])
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





