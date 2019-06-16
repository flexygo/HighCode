

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




