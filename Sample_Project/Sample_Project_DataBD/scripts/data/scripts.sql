

BEGIN TRY

SET IDENTITY_INSERT [Scripts] ON

MERGE INTO [Scripts] AS Target
USING (VALUES
  (0,N'Toma de contacto',1,N'~/custom/Courses/Level II/Steps/1/navigation_nodes.sql',0,'ConfConnectionString')
 ,(1,N'Toma de contacto',1,N'~/custom/Courses/Level II/Steps/1/objects.sql',0,'ConfConnectionString')
 ,(2,N'Toma de contacto',1,N'~/custom/Courses/Level II/Steps/1/objects_properties.sql',0,'ConfConnectionString')
 ,(3,N'Toma de contacto',1,N'~/custom/Courses/Level II/Steps/1/objects_templates.sql',0,'ConfConnectionString')
 ,(4,N'Toma de contacto',1,N'~/custom/Courses/Level II/Steps/1/objects_views.sql',0,'ConfConnectionString')
 ,(5,N'Toma de contacto',1,N'~/custom/Courses/Level II/Steps/1/objects_views_properties.sql',0,'ConfConnectionString')



 ,(6,N'SP 1ª practica',1,N'~/custom/Courses/Level II/Steps/Utils/Check_Dev_Block_Client.sql',1,'DataConnectionString')
 ,(7,N'SP 1ª practica',1,N'~/custom/Courses/Level II/Steps/Utils/Check_Dev_Unblock_Client.sql',1,'DataConnectionString')
 ,(8,N'SP 1ª practica',1,N'~/custom/Courses/Level II/Steps/2/Dev_Block_Client.sql',0,'DataConnectionString')
 ,(9,N'SP 1ª practica',1,N'~/custom/Courses/Level II/Steps/2/Dev_Unblock_Client.sql',0,'DataConnectionString')
 
 ,(10,N'SP 1ª practica',1,N'~/custom/Courses/Level II/Steps/2/navigation_nodes.sql',0,'ConfConnectionString')
 ,(11,N'SP 1ª practica',1,N'~/custom/Courses/Level II/Steps/2/objects.sql',0,'ConfConnectionString')
 ,(12,N'SP 1ª practica',1,N'~/custom/Courses/Level II/Steps/2/objects_properties.sql',0,'ConfConnectionString')
 ,(13,N'SP 1ª practica',1,N'~/custom/Courses/Level II/Steps/2/objects_templates.sql',0,'ConfConnectionString')
 ,(14,N'SP 1ª practica',1,N'~/custom/Courses/Level II/Steps/2/objects_views.sql',0,'ConfConnectionString')
 ,(15,N'SP 1ª practica',1,N'~/custom/Courses/Level II/Steps/2/objects_views_properties.sql',0,'ConfConnectionString')
 ,(16,N'SP 1ª practica',1,N'~/custom/Courses/Level II/Steps/2/processes.sql',0,'ConfConnectionString')
 ,(17,N'SP 1ª practica',1,N'~/custom/Courses/Level II/Steps/2/processes_params.sql',0,'ConfConnectionString')


 
 ,(18,N'SP 2ª practica',1,N'~/custom/Courses/Level II/Steps/3/Dev_Block_Client.sql',1,'DataConnectionString')
 ,(19,N'SP 2ª practica',1,N'~/custom/Courses/Level II/Steps/3/Dev_Unblock_Client.sql',1,'DataConnectionString')
 
 ,(20,N'SP 2ª practica',1,N'~/custom/Courses/Level II/Steps/3/menus.sql',0,'ConfConnectionString')
 ,(21,N'SP 2ª practica',1,N'~/custom/Courses/Level II/Steps/3/navigation_nodes.sql',0,'ConfConnectionString')
 ,(22,N'SP 2ª practica',1,N'~/custom/Courses/Level II/Steps/3/objects.sql',0,'ConfConnectionString')
 ,(23,N'SP 2ª practica',1,N'~/custom/Courses/Level II/Steps/3/objects_processes.sql',0,'ConfConnectionString')
 ,(24,N'SP 2ª practica',1,N'~/custom/Courses/Level II/Steps/3/objects_properties.sql',0,'ConfConnectionString')
 ,(25,N'SP 2ª practica',1,N'~/custom/Courses/Level II/Steps/3/objects_templates.sql',0,'ConfConnectionString')
 ,(26,N'SP 2ª practica',1,N'~/custom/Courses/Level II/Steps/3/objects_views.sql',0,'ConfConnectionString')
 ,(27,N'SP 2ª practica',1,N'~/custom/Courses/Level II/Steps/3/objects_views_properties.sql',0,'ConfConnectionString')
 ,(28,N'SP 2ª practica',1,N'~/custom/Courses/Level II/Steps/3/processes.sql',0,'ConfConnectionString')
 ,(29,N'SP 2ª practica',1,N'~/custom/Courses/Level II/Steps/3/processes_params.sql',0,'ConfConnectionString')


 
 ,(30,N'SP 3ª practica',1,N'~/custom/Courses/Level II/Steps/Utils/Check_Dev_Block_Batch_Clients.sql',1,'DataConnectionString')
 ,(31,N'SP 3ª practica',1,N'~/custom/Courses/Level II/Steps/4/Dev_Block_Batch_Clients.sql',1,'DataConnectionString')
 
 ,(32,N'SP 3ª practica',1,N'~/custom/Courses/Level II/Steps/4/menus.sql',0,'ConfConnectionString')
 ,(33,N'SP 3ª practica',1,N'~/custom/Courses/Level II/Steps/4/navigation_nodes.sql',0,'ConfConnectionString')
 ,(34,N'SP 3ª practica',1,N'~/custom/Courses/Level II/Steps/4/objects.sql',0,'ConfConnectionString')
 ,(35,N'SP 3ª practica',1,N'~/custom/Courses/Level II/Steps/4/objects_processes.sql',0,'ConfConnectionString')
 ,(36,N'SP 3ª practica',1,N'~/custom/Courses/Level II/Steps/4/objects_properties.sql',0,'ConfConnectionString')
 ,(37,N'SP 3ª practica',1,N'~/custom/Courses/Level II/Steps/4/objects_templates.sql',0,'ConfConnectionString')
 ,(38,N'SP 3ª practica',1,N'~/custom/Courses/Level II/Steps/4/objects_views.sql',0,'ConfConnectionString')
 ,(39,N'SP 3ª practica',1,N'~/custom/Courses/Level II/Steps/4/objects_views_properties.sql',0,'ConfConnectionString')
 ,(40,N'SP 3ª practica',1,N'~/custom/Courses/Level II/Steps/4/processes.sql',0,'ConfConnectionString')
 ,(41,N'SP 3ª practica',1,N'~/custom/Courses/Level II/Steps/4/processes_params.sql',0,'ConfConnectionString')



 ,(42,N'SP 4ª practica',1,N'~/custom/Courses/Level II/Steps/Utils/Check_Dev_Client_I.sql',1,'DataConnectionString')
 ,(43,N'SP 4ª practica',1,N'~/custom/Courses/Level II/Steps/Utils/Check_Dev_Client_U.sql',1,'DataConnectionString')
 ,(44,N'SP 4ª practica',1,N'~/custom/Courses/Level II/Steps/Utils/Check_Dev_Client_D.sql',1,'DataConnectionString')
 ,(45,N'SP 4ª practica',1,N'~/custom/Courses/Level II/Steps/5/Dev_Client_I.sql',1,'DataConnectionString')
 ,(46,N'SP 4ª practica',1,N'~/custom/Courses/Level II/Steps/5/Dev_Client_U.sql',1,'DataConnectionString')
 ,(47,N'SP 4ª practica',1,N'~/custom/Courses/Level II/Steps/5/Dev_Client_D.sql',1,'DataConnectionString')
 
 ,(48,N'SP 4ª practica',1,N'~/custom/Courses/Level II/Steps/5/menus.sql',0,'ConfConnectionString')
 ,(49,N'SP 4ª practica',1,N'~/custom/Courses/Level II/Steps/5/navigation_nodes.sql',0,'ConfConnectionString')
 ,(50,N'SP 4ª practica',1,N'~/custom/Courses/Level II/Steps/5/objects.sql',0,'ConfConnectionString')
 ,(51,N'SP 4ª practica',1,N'~/custom/Courses/Level II/Steps/5/objects_processes.sql',0,'ConfConnectionString')
 ,(52,N'SP 4ª practica',1,N'~/custom/Courses/Level II/Steps/5/objects_properties.sql',0,'ConfConnectionString')
 ,(53,N'SP 4ª practica',1,N'~/custom/Courses/Level II/Steps/5/objects_templates.sql',0,'ConfConnectionString')
 ,(54,N'SP 4ª practica',1,N'~/custom/Courses/Level II/Steps/5/objects_views.sql',0,'ConfConnectionString')
 ,(55,N'SP 4ª practica',1,N'~/custom/Courses/Level II/Steps/5/objects_views_properties.sql',0,'ConfConnectionString')
 ,(56,N'SP 4ª practica',1,N'~/custom/Courses/Level II/Steps/5/processes.sql',0,'ConfConnectionString')
 ,(57,N'SP 4ª practica',1,N'~/custom/Courses/Level II/Steps/5/processes_params.sql',0,'ConfConnectionString')


 ,(58,N'DLL 1ª practica',1,N'~/custom/Courses/Level II/Steps/6/menus.sql',0,'ConfConnectionString')
 ,(59,N'DLL 1ª practica',1,N'~/custom/Courses/Level II/Steps/6/navigation_nodes.sql',0,'ConfConnectionString')
 ,(60,N'DLL 1ª practica',1,N'~/custom/Courses/Level II/Steps/6/objects.sql',0,'ConfConnectionString')
 ,(61,N'DLL 1ª practica',1,N'~/custom/Courses/Level II/Steps/6/objects_processes.sql',0,'ConfConnectionString')
 ,(62,N'DLL 1ª practica',1,N'~/custom/Courses/Level II/Steps/6/objects_properties.sql',0,'ConfConnectionString')
 ,(63,N'DLL 1ª practica',1,N'~/custom/Courses/Level II/Steps/6/objects_templates.sql',0,'ConfConnectionString')
 ,(64,N'DLL 1ª practica',1,N'~/custom/Courses/Level II/Steps/6/objects_views.sql',0,'ConfConnectionString')
 ,(65,N'DLL 1ª practica',1,N'~/custom/Courses/Level II/Steps/6/objects_views_properties.sql',0,'ConfConnectionString')
 ,(66,N'DLL 1ª practica',1,N'~/custom/Courses/Level II/Steps/6/processes.sql',0,'ConfConnectionString')
 ,(67,N'DLL 1ª practica',1,N'~/custom/Courses/Level II/Steps/6/processes_params.sql',0,'ConfConnectionString')


 ,(68,N'DLL 2ª practica',1,N'~/custom/Courses/Level II/Steps/7/menus.sql',0,'ConfConnectionString')
 ,(69,N'DLL 2ª practica',1,N'~/custom/Courses/Level II/Steps/7/navigation_nodes.sql',0,'ConfConnectionString')
 ,(70,N'DLL 2ª practica',1,N'~/custom/Courses/Level II/Steps/7/objects.sql',0,'ConfConnectionString')
 ,(71,N'DLL 2ª practica',1,N'~/custom/Courses/Level II/Steps/7/objects_processes.sql',0,'ConfConnectionString')
 ,(72,N'DLL 2ª practica',1,N'~/custom/Courses/Level II/Steps/7/objects_properties.sql',0,'ConfConnectionString')
 ,(73,N'DLL 2ª practica',1,N'~/custom/Courses/Level II/Steps/7/objects_templates.sql',0,'ConfConnectionString')
 ,(74,N'DLL 2ª practica',1,N'~/custom/Courses/Level II/Steps/7/objects_views.sql',0,'ConfConnectionString')
 ,(75,N'DLL 2ª practica',1,N'~/custom/Courses/Level II/Steps/7/objects_views_properties.sql',0,'ConfConnectionString')
 ,(76,N'DLL 2ª practica',1,N'~/custom/Courses/Level II/Steps/7/processes.sql',0,'ConfConnectionString')
 ,(77,N'DLL 2ª practica',1,N'~/custom/Courses/Level II/Steps/7/processes_params.sql',0,'ConfConnectionString')



 ,(78,N'DLL 3ª practica',1,N'~/custom/Courses/Level II/Steps/8/menus.sql',0,'ConfConnectionString')
 ,(79,N'DLL 3ª practica',1,N'~/custom/Courses/Level II/Steps/8/navigation_nodes.sql',0,'ConfConnectionString')
 ,(80,N'DLL 3ª practica',1,N'~/custom/Courses/Level II/Steps/8/objects.sql',0,'ConfConnectionString')
 ,(81,N'DLL 3ª practica',1,N'~/custom/Courses/Level II/Steps/8/objects_processes.sql',0,'ConfConnectionString')
 ,(82,N'DLL 3ª practica',1,N'~/custom/Courses/Level II/Steps/8/objects_properties.sql',0,'ConfConnectionString')
 ,(83,N'DLL 3ª practica',1,N'~/custom/Courses/Level II/Steps/8/objects_templates.sql',0,'ConfConnectionString')
 ,(84,N'DLL 3ª practica',1,N'~/custom/Courses/Level II/Steps/8/objects_views.sql',0,'ConfConnectionString')
 ,(85,N'DLL 3ª practica',1,N'~/custom/Courses/Level II/Steps/8/objects_views_properties.sql',0,'ConfConnectionString')
 ,(86,N'DLL 3ª practica',1,N'~/custom/Courses/Level II/Steps/8/processes.sql',0,'ConfConnectionString')
 ,(87,N'DLL 3ª practica',1,N'~/custom/Courses/Level II/Steps/8/processes_params.sql',0,'ConfConnectionString')



 ,(88,N'DLL 4ª practica',1,N'~/custom/Courses/Level II/Steps/9/menus.sql',0,'ConfConnectionString')
 ,(89,N'DLL 4ª practica',1,N'~/custom/Courses/Level II/Steps/9/navigation_nodes.sql',0,'ConfConnectionString')
 ,(90,N'DLL 4ª practica',1,N'~/custom/Courses/Level II/Steps/9/objects.sql',0,'ConfConnectionString')
 ,(91,N'DLL 4ª practica',1,N'~/custom/Courses/Level II/Steps/9/objects_processes.sql',0,'ConfConnectionString')
 ,(92,N'DLL 4ª practica',1,N'~/custom/Courses/Level II/Steps/9/objects_properties.sql',0,'ConfConnectionString')
 ,(93,N'DLL 4ª practica',1,N'~/custom/Courses/Level II/Steps/9/objects_templates.sql',0,'ConfConnectionString')
 ,(94,N'DLL 4ª practica',1,N'~/custom/Courses/Level II/Steps/9/objects_views.sql',0,'ConfConnectionString')
 ,(95,N'DLL 4ª practica',1,N'~/custom/Courses/Level II/Steps/9/objects_views_properties.sql',0,'ConfConnectionString')
 ,(96,N'DLL 4ª practica',1,N'~/custom/Courses/Level II/Steps/9/processes.sql',0,'ConfConnectionString')
 ,(97,N'DLL 4ª practica',1,N'~/custom/Courses/Level II/Steps/9/processes_params.sql',0,'ConfConnectionString')

 ,(98,N'Offline 1ª practica',2,N'~/custom/Courses/Level II - Offline/Steps/1/offline_apps.sql',1,N'ConfConnectionString')
 ,(99,N'Offline 1ª practica',2,N'~/custom/Courses/Level II - Offline/Steps/1/offline_pages.sql',1,N'ConfConnectionString')
 ,(100,N'Offline 1ª practica',2,N'~/custom/Courses/Level II - Offline/Steps/1/webapi_objects.sql',1,N'ConfConnectionString')
 ,(101,N'Offline 1ª practica',2,N'~/custom/Courses/Level II - Offline/Steps/1/webapi_processes.sql',1,N'ConfConnectionString')
 ,(102,N'Offline 1ª practica',2,N'~/custom/Courses/Level II - Offline/Steps/1/webapi_users.sql',1,N'ConfConnectionString')

 ,(103,N'Offline 2ª practica',2,N'~/custom/Courses/Level II - Offline/Steps/2/offline_apps.sql',1,N'ConfConnectionString')
 ,(104,N'Offline 2ª practica',2,N'~/custom/Courses/Level II - Offline/Steps/2/objects_properties.sql',1,N'ConfConnectionString')
 ,(105,N'Offline 2ª practica',2,N'~/custom/Courses/Level II - Offline/Steps/2/objects.sql',1,N'ConfConnectionString')
 ,(106,N'Offline 2ª practica',2,N'~/custom/Courses/Level II - Offline/Steps/2/offline_objects.sql',1,N'ConfConnectionString')
 ,(107,N'Offline 2ª practica',2,N'~/custom/Courses/Level II - Offline/Steps/2/offline_pages.sql',1,N'ConfConnectionString')
 
 ,(108,N'Offline 3ª practica',2,N'~/custom/Courses/Level II - Offline/Steps/3/offline_apps.sql',1,N'ConfConnectionString')
 ,(109,N'Offline 3ª practica',2,N'~/custom/Courses/Level II - Offline/Steps/3/offline_menus.sql',1,N'ConfConnectionString')
 ,(110,N'Offline 3ª practica',2,N'~/custom/Courses/Level II - Offline/Steps/3/offline_objects.sql',1,N'ConfConnectionString')
 ,(112,N'Offline 3ª practica',2,N'~/custom/Courses/Level II - Offline/Steps/3/offline_pages.sql',1,N'ConfConnectionString')
 ,(113,N'Offline 3ª practica',2,N'~/custom/Courses/Level II - Offline/Steps/3/offline_styles.sql',1,N'ConfConnectionString')

 ,(114,N'Offline 4ª practica',2,N'~/custom/Courses/Level II - Offline/Steps/2/documents_objects_config.sql',0,N'ConfConnectionString')
 ,(115,N'Offline 4ª practica',2,N'~/custom/Courses/Level II - Offline/Steps/2/objects.sql',0,N'ConfConnectionString')
 ,(116,N'Offline 4ª practica',2,N'~/custom/Courses/Level II - Offline/Steps/2/objects_images_settings.sql',0,N'ConfConnectionString')
 ,(117,N'Offline 4ª practica',2,N'~/custom/Courses/Level II - Offline/Steps/2/objects_objects.sql',0,N'ConfConnectionString')
 ,(118,N'Offline 4ª practica',2,N'~/custom/Courses/Level II - Offline/Steps/2/objects_properties.sql',0,N'ConfConnectionString')
 ,(119,N'Offline 4ª practica',2,N'~/custom/Courses/Level II - Offline/Steps/2/objects_properties_templates.sql',0,N'ConfConnectionString')
 ,(120,N'Offline 4ª practica',2,N'~/custom/Courses/Level II - Offline/Steps/2/objects_views.sql',0,N'ConfConnectionString')
 ,(121,N'Offline 4ª practica',2,N'~/custom/Courses/Level II - Offline/Steps/2/offline_apps.sql',0,N'ConfConnectionString')
 ,(122,N'Offline 4ª practica',2,N'~/custom/Courses/Level II - Offline/Steps/2/offline_menus.sql',0,N'ConfConnectionString')
 ,(123,N'Offline 4ª practica',2,N'~/custom/Courses/Level II - Offline/Steps/2/offline_objects.sql',0,N'ConfConnectionString')
 ,(124,N'Offline 4ª practica',2,N'~/custom/Courses/Level II - Offline/Steps/2/offline_pages.sql',0,N'ConfConnectionString')
 ,(125,N'Offline 4ª practica',2,N'~/custom/Courses/Level II - Offline/Steps/2/offline_styles.sql',0,N'ConfConnectionString')
 ,(126,N'Offline 4ª practica',2,N'~/custom/Courses/Level II - Offline/Steps/2/webapi_objects.sql',0,N'ConfConnectionString')
 ,(127,N'Offline 4ª practica',2,N'~/custom/Courses/Level II - Offline/Steps/2/webapi_processes.sql',0,N'ConfConnectionString')
 ,(128,N'Offline 4ª practica',2,N'~/custom/Courses/Level II - Offline/Steps/2/webapi_users.sql',0,N'ConfConnectionString')
 ,(129,N'Offline 4ª practica',2,N'~/custom/Courses/Level II - Offline/Steps/2/webapi_views.sql',0,N'ConfConnectionString')



) AS Source ([ScriptId],[StepId],[CourseId],[Script],[Inherit],[ConnStringId])
ON (Target.[ScriptId] = Source.[ScriptId] AND Target.[StepId] = Source.[StepId] AND Target.[CourseId] = Source.[CourseId])
WHEN MATCHED AND (
	NULLIF(Source.[Script], Target.[Script]) IS NOT NULL OR NULLIF(Target.[Script], Source.[Script]) IS NOT NULL OR 
	NULLIF(Source.[Inherit], Target.[Inherit]) IS NOT NULL OR NULLIF(Target.[Inherit], Source.[Inherit]) IS NOT NULL OR
	NULLIF(Source.[ConnStringId], Target.[ConnStringId]) IS NOT NULL OR NULLIF(Target.[ConnStringId], Source.[ConnStringId]) IS NOT NULL) THEN
 UPDATE SET
  [Script] = Source.[Script], 
  [Inherit] = Source.[Inherit],
  [ConnStringId] = Source.[ConnStringId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([ScriptId],[StepId],[CourseId],[Script],[Inherit],[ConnStringId])
 VALUES(Source.[ScriptId],Source.[StepId],Source.[CourseId],Source.[Script],Source.[Inherit],Source.[ConnStringId])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
END TRY
BEGIN CATCH
    DECLARE @ERRORNUMBER	INT,@ERRORMSG		VARCHAR(MAX),@ERRORSTATE		INT
    SELECT @ERRORNUMBER = 50000 + ERROR_NUMBER(),@ERRORMSG = ERROR_MESSAGE(), @ERRORSTATE = ERROR_STATE();
    THROW @ERRORNUMBER, @ERRORMSG, @ERRORSTATE
END CATCH
GO

SET IDENTITY_INSERT [Scripts] OFF
GO




