 GO

 BEGIN TRAN

EXEC sp_MSforeachtable 'ALTER TABLE ? NOCHECK CONSTRAINT all'

EXEC sp_MSforeachtable 'ALTER TABLE ? DISABLE TRIGGER all'
 
--Application data
:r .\data\documents_objects_config.sql
:r .\data\help.sql
:r .\data\kanban_settings.sql
:r .\data\menus.sql
:r .\data\modules.sql
:r .\data\modules_events.sql
:r .\data\modules_types.sql
:r .\data\navigation_nodes.sql
:r .\data\objects.sql
:r .\data\objects_images_settings.sql
:r .\data\objects_objects.sql
:r .\data\objects_presets.sql
:r .\data\objects_processes.sql
:r .\data\objects_properties.sql
:r .\data\objects_properties_dependencies.sql
:r .\data\objects_properties_templates.sql
:r .\data\objects_search.sql
:r .\data\objects_search_properties.sql
:r .\data\objects_templates.sql
:r .\data\objects_views.sql
:r .\data\objects_views_properties.sql
:r .\data\pages.sql
:r .\data\pages_modules.sql
:r .\data\plugins.sql
:r .\data\processes.sql
:r .\data\processes_params.sql
:r .\data\scheduler.sql
:r .\data\scheduler_objects.sql
:r .\data\tests.sql

:r .\config.sql

IF (N'$(IsProduct)' = '1') BEGIN
       EXEC pNet_CreateOrUpdateDatabase $(OriginDatabaseName), N'$(CurrentDacVersion)'
END

EXEC sp_MSforeachtable 'ALTER TABLE ? ENABLE TRIGGER all'

EXEC sp_MSforeachtable 'ALTER TABLE ? WITH CHECK CHECK CONSTRAINT ALL'

COMMIT TRANSACTION