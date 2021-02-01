﻿

BEGIN TRY

MERGE INTO [Navigation_Nodes] AS Target
USING (VALUES
  (N'A6DF8870-7E22-434E-8DD2-0045DA21A731',N'ECB6657F-B6D6-42E4-868B-92B6A35E83D8',0,N'Clientes',N'client',N'Clientes',N'object',NULL,NULL,N'current',NULL,N'list',NULL,NULL,NULL,NULL,N'Clientes',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'2DDB88C7-CBF3-4135-94EF-016DF852F44F',N'2FC10074-D90C-4E67-89B2-F26EB148026A',1,N'Scheduler',N'calendar-month',N'Scheduler',N'help',NULL,NULL,N'current',NULL,NULL,NULL,NULL,N'syshelp-scheduler',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'AA933471-AD54-4168-A0E2-032168345111',N'2D3CE8EC-CA7D-4EDC-BC59-E52723FD015E',0,N'Board',N'noicon',N'Board',N'page',NULL,NULL,N'current',NULL,NULL,N'Kanban_Board',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'F7B87123-FE0F-4CB1-88C6-069FEB1342EA',N'297FDCE2-24CB-4044-8EF1-EE012DEF84B8',1,N'On Change DLL Process',N'exchange',N'On Change DLL Process',N'help',NULL,NULL,N'current',NULL,NULL,NULL,NULL,N'highcode_dllchange',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'9554B50D-ABF2-4F34-A973-0DE9C1FFAFCE',N'40EA9B60-F359-4AC3-81E6-9A47EE7ABFB4',1,N'Examples',N'noicon',N'Examples',N'text',NULL,NULL,N'current',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'6A677D7F-ADBB-4A4E-B32D-2152DC5C0322',N'8B3C69F7-1B15-4E9C-8AE6-8939AB3AD98E',0,N'Contacto',N'contactos',N'Nuevo Contacto',N'object',NULL,NULL,N'current',NULL,N'edit',NULL,NULL,NULL,NULL,N'Contacto',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'CFAD1AA9-4916-4B6C-85FB-25C2FB8D8D68',N'B9C8D6C9-3F7B-4867-BC9E-4893064E8CCD',1,N'Demo Scheduler',N'noicon',N'Demo Scheduler',N'text',NULL,NULL,N'current',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'D35DFA56-95B4-4505-83FE-264D008617F8',N'2DDB88C7-CBF3-4135-94EF-016DF852F44F',0,N'Month',N'noicon',N'Month',N'page',NULL,NULL,N'current',NULL,NULL,N'61fe2a52-797e-4a42-80b4-b363fbdb023e',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'BE0380A9-2004-4E81-9DB7-26D9389812AF',N'297FDCE2-24CB-4044-8EF1-EE012DEF84B8',2,N'Collection Process DLL',N'object-relations',N'Collection Process DLL',N'help',NULL,NULL,N'current',NULL,NULL,NULL,NULL,N'highcode_dllcollectionprocess',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'306BF840-121D-4361-918A-2C8AFC499536',N'9E3AC16F-78A8-42B0-AD9F-DAC6257C88F7',0,N'HTML Editor',N'html5',N'HTML Editor',N'help',NULL,NULL,N'current',NULL,NULL,NULL,NULL,N'highcode_jshtmltools',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'4EEB0FD1-5BFA-4288-83E5-32A4C399C2C9',N'CFAD1AA9-4916-4B6C-85FB-25C2FB8D8D68',0,N'Demo Calendar',N'noicon',N'Demo Calendar',N'page',NULL,NULL,N'current',NULL,NULL,N'e452b005-f6fb-4fd8-9d42-94b621ed2bb3',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'485B6E7B-8CD2-40DF-801A-36BEBC86AD2A',N'9554B50D-ABF2-4F34-A973-0DE9C1FFAFCE',1,N'Actividad',N'bullet-list',N'Actividad',N'group',NULL,NULL,N'current',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'9039E975-D70E-4E05-93F8-40642AB4D13E',N'03B7F63E-1B97-45B2-8BBC-B319D2418804',3,N'Advanced With Groups',N'noicon',N'Advanced With Groups',N'page',NULL,NULL,N'current',NULL,NULL,N'6e53f498-7c99-4090-b365-3c26898c4391',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'B720EE36-69B6-4BAD-91B8-4211238BB522',N'CBB37F92-FEE4-4240-ABF6-708F0905CBAF',1,N'Object Process SP',N'object',N'Object Process SP',N'help',NULL,NULL,N'current',NULL,NULL,NULL,NULL,N'highcode_spobjectprocess',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'A5E2F24A-D0C6-4B7F-8253-4362D306E83A',N'B9C8D6C9-3F7B-4867-BC9E-4893064E8CCD',0,N'Demo Timeline',N'noicon',N'Demo Timeline',N'page',NULL,NULL,N'current',NULL,NULL,N'7548fe53-2ea9-4fd1-86a7-4b39a7221376',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'AD5555E3-8DBA-4B4F-B9E3-455A44D1B9BC',N'B49EC601-95A8-440A-8A9D-93CB2D833E7B',0,N'LearningApp',N'app',N'LearningApp',N'auto',NULL,NULL,N'current',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'SELECT  Offline_Apps.Title ,Icons.CSSClass as IconClass,Icons.ImagePath  ,Offline_Apps.Descrip,''object'' as TypeId,''current'' as TargetId ,''view'' as pageTypeId,''sysOfflineApp'' as ObjectName ,''AppName="'' + AppName + ''"'' as ObjectWhere , ''ConfConnString'' as SQLConStringId FROM Offline_Apps inner join Icons on Offline_Apps.IconName =Icons.IconName   order by Title',N'ConfConnectionString',NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'B9C8D6C9-3F7B-4867-BC9E-4893064E8CCD',N'2FC10074-D90C-4E67-89B2-F26EB148026A',3,N'Demo',N'noicon',N'Demo',N'text',NULL,NULL,N'current',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'9E2EF680-6D34-489E-BA35-48BFC88591EB',N'10E6132D-E715-4606-BFF3-76EEBD0D7403',0,N'Steps',N'noicon',N'Steps',N'auto',NULL,NULL,N'current',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'select StepId as Title,''fa fa-play-circle'' as IconClass,StepId as Descrip, ''object'' as  TypeId, ''view'' as  PageTypeId , ''Course_Step'' as ObjectName, ''Steps.StepId = '''''' + StepId + '''''' and Steps.CourseId = '''''' + convert(nvarchar,CourseId) + '' '''''' as ObjectWhere,''current'' as TargetId,StepId  from Steps where CourseId=''{{CourseId}}'' Order by [Order]',N'DataConnectionString',NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'39602511-BD6C-4018-BD45-549BD3FAAB9C',N'485B6E7B-8CD2-40DF-801A-36BEBC86AD2A',1,N'Acciones',N'accounting-operations',N'Gestión de acciones',N'group',NULL,NULL,N'current',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'A485FCFA-900E-4F51-9D9C-55395E54BC95',N'8B3C69F7-1B15-4E9C-8AE6-8939AB3AD98E',0,N'Cliente',N'client',N'Cliente',N'object',NULL,NULL,N'current',NULL,N'edit',NULL,NULL,NULL,NULL,N'Cliente',NULL,N'{"IdState":"2"}',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'2EC89500-659B-4BAB-97A1-5ACF69E32704',N'ECB6657F-B6D6-42E4-868B-92B6A35E83D8',0,N'Contactos',N'contacts2',N'Contactos',N'object',NULL,NULL,N'current',NULL,N'list',NULL,NULL,NULL,NULL,N'Contactos',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'92A1E571-EFD4-4B80-8987-64095E36570C',N'1DD2F673-183A-4486-990B-7601C0258B34',1,N'Calendario',N'calendar-month',N'Calendario de ventas',N'page',NULL,NULL,N'current',NULL,NULL,N'Ventas_calendario',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'2CEA3CEE-975B-4E2B-B385-67DE6E01F8A5',N'8B3C69F7-1B15-4E9C-8AE6-8939AB3AD98E',0,N'Venta',N'cart',N'Nuevo Venta',N'object',NULL,NULL,N'current',NULL,N'edit',NULL,NULL,NULL,NULL,N'Venta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'CBB37F92-FEE4-4240-ABF6-708F0905CBAF',N'CFB79697-E115-4D3B-ADC1-B79E9916C6B4',0,N'Stored Procedures',N'sql-1',N'Stored Procedures',N'text',NULL,NULL,N'current',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'1DD2F673-183A-4486-990B-7601C0258B34',N'485B6E7B-8CD2-40DF-801A-36BEBC86AD2A',0,N'Gestión de ventas',N'cart',N'Ventas',N'group',NULL,NULL,N'current',NULL,N'list',NULL,NULL,NULL,NULL,N'Ventas',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'10E6132D-E715-4606-BFF3-76EEBD0D7403',N'502A285C-C7BE-421F-A29E-D9BB9209CB86',0,N'Courses',N'noicon',N'Courses',N'auto',NULL,NULL,N'current',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'select Course as Title,''fa fa-book'' as IconClass, Course as Descrip, ''text'' as TypeId, ''current'' as TargetId, Course,CourseId from Courses Order by CourseId',N'DataConnectionString',NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'CD887EA8-571F-40C2-BDC4-794E7436DE62',N'B9C8D6C9-3F7B-4867-BC9E-4893064E8CCD',2,N'Demo Kanban',N'noicon',N'Demo Kanban',N'page',NULL,NULL,N'current',NULL,NULL,N'4df83bb0-717e-4504-8323-c7509c9b387b',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'D42673DA-0544-4E53-B179-7DD324F994C6',N'CBB37F92-FEE4-4240-ABF6-708F0905CBAF',2,N'Collection Process SP',N'object-relations',N'Collection Process SP',N'help',NULL,NULL,N'current',NULL,NULL,NULL,NULL,N'highcode_spcollectionprocess',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'C9C45950-C7D9-4DEA-B18E-80777B6CC957',N'1DD2F673-183A-4486-990B-7601C0258B34',0,N'Ventas',N'fa-money',N'Ventas',N'object',NULL,NULL,N'current',NULL,N'list',NULL,NULL,NULL,NULL,N'Ventas',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'8B3C69F7-1B15-4E9C-8AE6-8939AB3AD98E',N'9554B50D-ABF2-4F34-A973-0DE9C1FFAFCE',0,N'Nuevo',N'fa-plus',N'Nuevo',N'group',NULL,NULL,N'current',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'03EFF280-426A-4596-8E7C-8BEC1AEB1F8D',N'2DDB88C7-CBF3-4135-94EF-016DF852F44F',0,N'Year',N'noicon',N'Year',N'page',NULL,NULL,N'current',NULL,NULL,N'7b4f1ea4-510c-4330-a5cd-859b97ba2149',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'DA1098C7-5A67-43DD-9A0F-9237AA75C45F',N'CFB79697-E115-4D3B-ADC1-B79E9916C6B4',3,N'Cron Jobs',N'timer',N'Cron Jobs',N'object',NULL,NULL,N'current',NULL,N'list',NULL,NULL,NULL,NULL,N'sysJobs',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'ECB6657F-B6D6-42E4-868B-92B6A35E83D8',N'9554B50D-ABF2-4F34-A973-0DE9C1FFAFCE',2,N'Gestión de clientes',N'client',N'Gestión de clientes',N'group',NULL,NULL,N'current',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'B49EC601-95A8-440A-8A9D-93CB2D833E7B',N'25A4B4D5-44AE-4CF1-8733-568F00F31520',3,N'Offline help',N'flx-mobile',N'Offline help',N'text',NULL,NULL,N'current',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'ConfConnectionString',NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'B260B8DE-2B0F-462A-BB8B-94890EABC1BE',N'CFAD1AA9-4916-4B6C-85FB-25C2FB8D8D68',0,N'Demo Month',N'noicon',N'Demo Month',N'page',NULL,NULL,N'current',NULL,NULL,N'69e5872d-c55b-4c6e-a2f8-c61542dd4d68',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'02AB9E91-D11C-46BA-95EA-95A32FA4BDCF',N'B49EC601-95A8-440A-8A9D-93CB2D833E7B',0,N'Help Apps',N'help-2',N'Help Apps',N'auto',NULL,NULL,N'current',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'SELECT  help.title as Title,Icons.CSSClass as IconClass,Icons.ImagePath  ,help.title as Descrip,''help'' as TypeId,help.TargetID as TargetId , Help.HelpId as HelpId FROM Help inner join Icons on Help.IconName =Icons.IconName WHERE Help.Category=''Tool'' and (Help.Tag=''Offline App'' or HelpId = ''syshelp-push'')  ORDER BY Help.Title',N'ConfConnectionString',NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'1FACD9DE-CC7E-46EA-89A1-9608A06B1155',N'CBB37F92-FEE4-4240-ABF6-708F0905CBAF',0,N'XML Crud SP',N'sql-letters',N'XML Crud SP',N'help',NULL,NULL,N'current',NULL,NULL,NULL,NULL,N'highcode_spcrud',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'F3F1979F-DC08-4775-81D2-96966D88856B',N'CFB79697-E115-4D3B-ADC1-B79E9916C6B4',5,N'Web Component',N'gg',N'Web Component',N'help',NULL,NULL,N'current',NULL,NULL,NULL,NULL,N'highcode_webcomponent',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'40EA9B60-F359-4AC3-81E6-9A47EE7ABFB4',N'25A4B4D5-44AE-4CF1-8733-568F00F31520',4,N'LowCode',N'html-editor',N'Demo',N'text',NULL,NULL,N'current',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'261B8832-3C51-49A3-B53C-9AA37FB488AD',N'CFAD1AA9-4916-4B6C-85FB-25C2FB8D8D68',0,N'Demo Year',N'noicon',N'Demo Year',N'page',NULL,NULL,N'current',NULL,NULL,N'4dbe3f1e-5dad-4042-9a07-7acecc0766e5',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'075BB445-8A7A-469B-B8AF-9ABFE619B30E',N'9554B50D-ABF2-4F34-A973-0DE9C1FFAFCE',3,N'Otros',N'object-group',N'Otros',N'group',NULL,NULL,N'current',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'DB31231E-69E8-424B-A162-9CEAC5758AA7',N'075BB445-8A7A-469B-B8AF-9ABFE619B30E',0,N'Empleados',N'employees',N'Empleados',N'object',NULL,NULL,N'current',NULL,N'list',NULL,NULL,NULL,NULL,N'Employees',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'2DF4AC7E-AF4B-4E98-9693-9DABF1A20487',N'03B7F63E-1B97-45B2-8BBC-B319D2418804',2,N'Advanced',N'noicon',N'Advanced',N'page',NULL,NULL,N'current',NULL,NULL,N'fa6aadad-f081-488a-afad-fa0ebb9df91d',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'3082FD78-E794-41B2-A7C0-B03130AD2033',N'39602511-BD6C-4018-BD45-549BD3FAAB9C',0,N'Kanban',N'blackboard1',N'Kanban',N'page',NULL,NULL,N'current',NULL,NULL,N'acciones_kanban',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'03B7F63E-1B97-45B2-8BBC-B319D2418804',N'2FC10074-D90C-4E67-89B2-F26EB148026A',0,N'Timeline',N'list-alt',N'Timeline',N'help',NULL,NULL,N'current',NULL,NULL,NULL,NULL,N'syshelp-timeline-module',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'CFB79697-E115-4D3B-ADC1-B79E9916C6B4',N'25A4B4D5-44AE-4CF1-8733-568F00F31520',2,N'Develop help',N'code-1',N'Develop help',N'text',NULL,NULL,N'current',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'438DE8BE-0618-425A-B2E9-C0A5A1D7A332',N'39602511-BD6C-4018-BD45-549BD3FAAB9C',0,N'Calendario de acciones',N'calendar-check-o',N'Calendario',N'page',NULL,NULL,N'current',NULL,NULL,N'Acciones_calendario',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'7CF04E8D-3872-48C1-A3F0-C37A589A6318',N'39602511-BD6C-4018-BD45-549BD3FAAB9C',0,N'Acciones',N'accounting-operations',N'Acciones',N'object',NULL,NULL,N'current',NULL,N'list',NULL,NULL,NULL,NULL,N'Acciones',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'48CC905D-B2C9-4964-B707-C3BCA659F5BE',N'CFB79697-E115-4D3B-ADC1-B79E9916C6B4',4,N'Web Api',N'connectdevelop',N'Web Api',N'help',NULL,NULL,N'current',NULL,NULL,NULL,NULL,N'syshelp-webapi',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'C7EA03FB-5E8B-494B-AAB9-C5C8532B5126',N'8B3C69F7-1B15-4E9C-8AE6-8939AB3AD98E',0,N'Acción',N'accounting-operations',N'Acción',N'object',NULL,NULL,N'current',NULL,N'edit',NULL,NULL,NULL,NULL,N'Accion',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'97BD28D8-52DB-4462-9F33-D000E7303101',N'9E3AC16F-78A8-42B0-AD9F-DAC6257C88F7',0,N'Nested Modules',N'properties-relations',N'Nested Modules',N'help',NULL,NULL,N'current',NULL,NULL,NULL,NULL,N'highcode_jsnestedmodules',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'4B2CAC2B-3F04-495B-AB03-D3E05493E2CD',N'2DDB88C7-CBF3-4135-94EF-016DF852F44F',0,N'Calendar',N'noicon',N'Calendar',N'page',NULL,NULL,N'current',NULL,NULL,N'62bf2c6e-16e2-4249-8920-d1774945488c',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'502A285C-C7BE-421F-A29E-D9BB9209CB86',N'25A4B4D5-44AE-4CF1-8733-568F00F31520',1,N'Courses',N'book',N'Courses',N'text',NULL,NULL,N'current',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'9E3AC16F-78A8-42B0-AD9F-DAC6257C88F7',N'CFB79697-E115-4D3B-ADC1-B79E9916C6B4',2,N'Javascript',N'javascript',N'Javascript',N'text',NULL,NULL,N'current',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'024183C9-23C6-4700-92F1-DDAFA853C0CB',N'03B7F63E-1B97-45B2-8BBC-B319D2418804',1,N'Basic With Groups',N'noicon',N'Basic With Groups',N'page',NULL,NULL,N'current',NULL,NULL,N'5194a99b-7ff4-47de-8e55-905df895e99b',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'DD80308A-C0AC-490C-968A-DDBA4C65D6F8',N'ECB6657F-B6D6-42E4-868B-92B6A35E83D8',0,N'Flexygo',N'flx-facebook',N'Flexygo',N'object',NULL,NULL,N'current',NULL,N'view',NULL,NULL,NULL,NULL,N'Cliente',N'(Client.IdClient=1)',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'5E491234-7E77-4567-9776-E4F22C388AC1',N'CFB79697-E115-4D3B-ADC1-B79E9916C6B4',6,N'Testing',N'task-manager-2',N'Testing',N'help',NULL,NULL,N'current',NULL,NULL,NULL,NULL,N'highcode_Testing',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'2D3CE8EC-CA7D-4EDC-BC59-E52723FD015E',N'2FC10074-D90C-4E67-89B2-F26EB148026A',2,N'Kanban',N'columns',N'Kanban',N'help',NULL,NULL,N'current',NULL,NULL,NULL,NULL,N'syshep-kanban',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'5FA07E1B-3A5C-4C6C-88AF-EC1F8F3A9F3A',N'03B7F63E-1B97-45B2-8BBC-B319D2418804',0,N'Basic',N'noicon',N'Basic',N'page',NULL,NULL,N'current',NULL,NULL,N'29f7cdb0-2a09-45aa-9b47-2d38c7c9adde',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'27EC9585-51D0-4DC0-8253-ED6D0CC7A666',N'297FDCE2-24CB-4044-8EF1-EE012DEF84B8',3,N'Object Process DLL',N'object',N'Object Process DLL',N'help',NULL,NULL,N'current',NULL,NULL,NULL,NULL,N'highcode_dllobjectprocess',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'297FDCE2-24CB-4044-8EF1-EE012DEF84B8',N'CFB79697-E115-4D3B-ADC1-B79E9916C6B4',1,N'Dlls',N'gears',N'Dlls Processes',N'text',NULL,NULL,N'current',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'2FC10074-D90C-4E67-89B2-F26EB148026A',N'40EA9B60-F359-4AC3-81E6-9A47EE7ABFB4',0,N'Modules',N'modules',N'Modules',N'help',NULL,NULL,N'current',NULL,NULL,NULL,NULL,N'syshelp-modules',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
 ,(N'66CD10A1-5401-496D-8040-F4296BA8FC17',N'297FDCE2-24CB-4044-8EF1-EE012DEF84B8',0,N'CRUD DLL',N'fa-code',N'CRUD DLL',N'help',NULL,NULL,N'current',NULL,NULL,NULL,NULL,N'highcode_dllcrud',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,NULL,1)
) AS Source ([NodeId],[ParentNodeId],[Order],[Title],[IconName],[Descrip],[TypeId],[Params],[Url],[TargetId],[ProcessName],[PageTypeId],[PageName],[ReportName],[HelpId],[ReportWhere],[ObjectName],[ObjectWhere],[Defaults],[SQLSentence],[SQLConStringId],[WebComponent],[TableName],[BadgeClass],[BadgeSQL],[BadgeConStringId],[BadgeRefresh],[Enabled],[cssClass],[OriginId])
ON (Target.[NodeId] = Source.[NodeId])
WHEN MATCHED AND (
	NULLIF(Source.[ParentNodeId], Target.[ParentNodeId]) IS NOT NULL OR NULLIF(Target.[ParentNodeId], Source.[ParentNodeId]) IS NOT NULL OR 
	NULLIF(Source.[Order], Target.[Order]) IS NOT NULL OR NULLIF(Target.[Order], Source.[Order]) IS NOT NULL OR 
	NULLIF(Source.[Title], Target.[Title]) IS NOT NULL OR NULLIF(Target.[Title], Source.[Title]) IS NOT NULL OR 
	NULLIF(Source.[IconName], Target.[IconName]) IS NOT NULL OR NULLIF(Target.[IconName], Source.[IconName]) IS NOT NULL OR 
	NULLIF(Source.[Descrip], Target.[Descrip]) IS NOT NULL OR NULLIF(Target.[Descrip], Source.[Descrip]) IS NOT NULL OR 
	NULLIF(Source.[TypeId], Target.[TypeId]) IS NOT NULL OR NULLIF(Target.[TypeId], Source.[TypeId]) IS NOT NULL OR 
	NULLIF(Source.[Params], Target.[Params]) IS NOT NULL OR NULLIF(Target.[Params], Source.[Params]) IS NOT NULL OR 
	NULLIF(Source.[Url], Target.[Url]) IS NOT NULL OR NULLIF(Target.[Url], Source.[Url]) IS NOT NULL OR 
	NULLIF(Source.[TargetId], Target.[TargetId]) IS NOT NULL OR NULLIF(Target.[TargetId], Source.[TargetId]) IS NOT NULL OR 
	NULLIF(Source.[ProcessName], Target.[ProcessName]) IS NOT NULL OR NULLIF(Target.[ProcessName], Source.[ProcessName]) IS NOT NULL OR 
	NULLIF(Source.[PageTypeId], Target.[PageTypeId]) IS NOT NULL OR NULLIF(Target.[PageTypeId], Source.[PageTypeId]) IS NOT NULL OR 
	NULLIF(Source.[PageName], Target.[PageName]) IS NOT NULL OR NULLIF(Target.[PageName], Source.[PageName]) IS NOT NULL OR 
	NULLIF(Source.[ReportName], Target.[ReportName]) IS NOT NULL OR NULLIF(Target.[ReportName], Source.[ReportName]) IS NOT NULL OR 
	NULLIF(Source.[HelpId], Target.[HelpId]) IS NOT NULL OR NULLIF(Target.[HelpId], Source.[HelpId]) IS NOT NULL OR 
	NULLIF(Source.[ReportWhere], Target.[ReportWhere]) IS NOT NULL OR NULLIF(Target.[ReportWhere], Source.[ReportWhere]) IS NOT NULL OR 
	NULLIF(Source.[ObjectName], Target.[ObjectName]) IS NOT NULL OR NULLIF(Target.[ObjectName], Source.[ObjectName]) IS NOT NULL OR 
	NULLIF(Source.[ObjectWhere], Target.[ObjectWhere]) IS NOT NULL OR NULLIF(Target.[ObjectWhere], Source.[ObjectWhere]) IS NOT NULL OR 
	NULLIF(Source.[Defaults], Target.[Defaults]) IS NOT NULL OR NULLIF(Target.[Defaults], Source.[Defaults]) IS NOT NULL OR 
	NULLIF(Source.[SQLSentence], Target.[SQLSentence]) IS NOT NULL OR NULLIF(Target.[SQLSentence], Source.[SQLSentence]) IS NOT NULL OR 
	NULLIF(Source.[SQLConStringId], Target.[SQLConStringId]) IS NOT NULL OR NULLIF(Target.[SQLConStringId], Source.[SQLConStringId]) IS NOT NULL OR 
	NULLIF(Source.[WebComponent], Target.[WebComponent]) IS NOT NULL OR NULLIF(Target.[WebComponent], Source.[WebComponent]) IS NOT NULL OR 
	NULLIF(Source.[TableName], Target.[TableName]) IS NOT NULL OR NULLIF(Target.[TableName], Source.[TableName]) IS NOT NULL OR 
	NULLIF(Source.[BadgeClass], Target.[BadgeClass]) IS NOT NULL OR NULLIF(Target.[BadgeClass], Source.[BadgeClass]) IS NOT NULL OR 
	NULLIF(Source.[BadgeSQL], Target.[BadgeSQL]) IS NOT NULL OR NULLIF(Target.[BadgeSQL], Source.[BadgeSQL]) IS NOT NULL OR 
	NULLIF(Source.[BadgeConStringId], Target.[BadgeConStringId]) IS NOT NULL OR NULLIF(Target.[BadgeConStringId], Source.[BadgeConStringId]) IS NOT NULL OR 
	NULLIF(Source.[BadgeRefresh], Target.[BadgeRefresh]) IS NOT NULL OR NULLIF(Target.[BadgeRefresh], Source.[BadgeRefresh]) IS NOT NULL OR 
	NULLIF(Source.[Enabled], Target.[Enabled]) IS NOT NULL OR NULLIF(Target.[Enabled], Source.[Enabled]) IS NOT NULL OR 
	NULLIF(Source.[cssClass], Target.[cssClass]) IS NOT NULL OR NULLIF(Target.[cssClass], Source.[cssClass]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [ParentNodeId] = Source.[ParentNodeId], 
  [Order] = Source.[Order], 
  [Title] = Source.[Title], 
  [IconName] = Source.[IconName], 
  [Descrip] = Source.[Descrip], 
  [TypeId] = Source.[TypeId], 
  [Params] = Source.[Params], 
  [Url] = Source.[Url], 
  [TargetId] = Source.[TargetId], 
  [ProcessName] = Source.[ProcessName], 
  [PageTypeId] = Source.[PageTypeId], 
  [PageName] = Source.[PageName], 
  [ReportName] = Source.[ReportName], 
  [HelpId] = Source.[HelpId], 
  [ReportWhere] = Source.[ReportWhere], 
  [ObjectName] = Source.[ObjectName], 
  [ObjectWhere] = Source.[ObjectWhere], 
  [Defaults] = Source.[Defaults], 
  [SQLSentence] = Source.[SQLSentence], 
  [SQLConStringId] = Source.[SQLConStringId], 
  [WebComponent] = Source.[WebComponent], 
  [TableName] = Source.[TableName], 
  [BadgeClass] = Source.[BadgeClass], 
  [BadgeSQL] = Source.[BadgeSQL], 
  [BadgeConStringId] = Source.[BadgeConStringId], 
  [BadgeRefresh] = Source.[BadgeRefresh], 
  [Enabled] = Source.[Enabled], 
  [cssClass] = Source.[cssClass], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([NodeId],[ParentNodeId],[Order],[Title],[IconName],[Descrip],[TypeId],[Params],[Url],[TargetId],[ProcessName],[PageTypeId],[PageName],[ReportName],[HelpId],[ReportWhere],[ObjectName],[ObjectWhere],[Defaults],[SQLSentence],[SQLConStringId],[WebComponent],[TableName],[BadgeClass],[BadgeSQL],[BadgeConStringId],[BadgeRefresh],[Enabled],[cssClass],[OriginId])
 VALUES(Source.[NodeId],Source.[ParentNodeId],Source.[Order],Source.[Title],Source.[IconName],Source.[Descrip],Source.[TypeId],Source.[Params],Source.[Url],Source.[TargetId],Source.[ProcessName],Source.[PageTypeId],Source.[PageName],Source.[ReportName],Source.[HelpId],Source.[ReportWhere],Source.[ObjectName],Source.[ObjectWhere],Source.[Defaults],Source.[SQLSentence],Source.[SQLConStringId],Source.[WebComponent],Source.[TableName],Source.[BadgeClass],Source.[BadgeSQL],Source.[BadgeConStringId],Source.[BadgeRefresh],Source.[Enabled],Source.[cssClass],Source.[OriginId])
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





