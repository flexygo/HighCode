

BEGIN TRY

MERGE INTO [Objects_Views] AS Target
USING (VALUES
  (N'Accion',N'AccionDefaultList',N'AccionDefaultList',N'DataConnectionString',N' SELECT [Actions].[ActionId], [Actions].[ActionId] as [Id], [FlxCmb1].[Descrip] as [Estado], [FlxCmb2].[Descrip] as [Tipo], [FlxCmb3].[Name] as [Cliente], [FlxCmb4].[Name] as [Empleado], [Actions].[Date] as [Fecha], [Actions].[Duration] as [Duración], [Actions].[Comment] as [Comentario] FROM [Actions] 
  LEFT JOIN (select State, Descrip, CssClass from Action_States ) [FlxCmb1] ON [FlxCmb1].[State]=[Actions].[ActionState] 
  LEFT JOIN (select ActionType, Descrip, CssClass from Action_Types ) [FlxCmb2] ON [FlxCmb2].[ActionType]=[Actions].[ActionType] 
  LEFT JOIN (select IdClient, Name, IdType, IdState from Client) [FlxCmb3] ON [FlxCmb3].[IdClient]=[Actions].[IdClient] 
  LEFT JOIN (Select Name, IdEmployee, Image from Employee ) [FlxCmb4] ON [FlxCmb4].[IdEmployee]=[Actions].[IdEmployee] 

',0,1,1,0,1,NULL,0,NULL,NULL,1)
 ,(N'Accion',N'Acciones_calendario',N'Acciones calendario',N'DataConnectionString',N'select ActionId, Date, Hour, EndDate, EndHour,Duration
,Comment, t.Descrip as Type, t.CssClass as TypeClass
, IdClient, NameCli, ImageCli, IdEmployee, NameEmp, ImageEmp, emp.IdTeam
,s.CssClass, ActionState
from Actions
left join Action_States s on s.State=actions.ActionState
left join Action_Types t on t.ActionType=actions.ActionType
outer apply (select name as NameEmp, image as ImageEmp, IdTeam from Employee where IdEmployee=actions.IdEmployee) emp
outer apply (select name as NameCli, image as ImageCli from Client where IdClient=actions.IdClient) Cli',0,0,1,0,0,NULL,0,NULL,NULL,1)
 ,(N'Bank_holiday',N'Bank_holiday',N'Bank holiday',N'DataConnectionString',N' SELECT IdHoliday, Name, Date FROM Bank_Holidays
',0,0,1,0,0,NULL,0,NULL,NULL,1)
 ,(N'Bank_holiday',N'Bank_holidayDefaultList',N'Bank_holidayDefaultList',N'DataConnectionString',N' SELECT [Bank_Holidays].[IdHoliday], [Bank_Holidays].[IdHoliday] as [IdHoliday_1], [Bank_Holidays].[Name] as [Name], [Bank_Holidays].[Date] as [Date] FROM [Bank_Holidays] 

',0,1,1,0,1,NULL,0,NULL,NULL,1)
 ,(N'Cliente',N'Cliente_calendar',N'Cliente calendario',N'DataConnectionString',N'Select IdClient, Name, image from client',0,0,1,0,0,NULL,0,NULL,NULL,1)
 ,(N'Cliente',N'cliente_resumen_ventas',N'Resumen de ventas de clientes',N'DataConnectionString',N'SELECT  Client.Name, COUNT(sale_product.idsale) as NºProducts, Sale.Descrip as Descrip,
        Concat(Sale.EconomicAmount, '' '', CONVERT(VARCHAR, Sale.Badge))  as Amount, Sale.Date
FROM Client
inner join Sale on Sale.IdClient = Client.IdClient
inner join sale_product on sale_product.idsale = Sale.IdSale
GROUP BY client.name, sale_product.IdSale, Sale.EconomicAmount, Sale.badge,Sale.date, Sale.Descrip
ORDER BY Sale.Date DESC',0,0,1,0,0,NULL,0,NULL,NULL,1)
 ,(N'Cliente',N'ClienteDefaultList',N'ClienteDefaultList',N'DataConnectionString',N' SELECT [Client].[IdClient], [Client].[IdClient] as [Id], [Client].[Name] as [Name], [Client].[Phone] as [Phone], [Client].[Mail] as [Mail], [FlxCmb1].[Descrip] as [Type] FROM [Client] 
  LEFT JOIN (select IdType, Descrip from Client_Type ) [FlxCmb1] ON [FlxCmb1].[IdType]=[Client].[IdType] 

',0,1,1,0,1,NULL,0,NULL,NULL,1)
 ,(N'Contacto',N'Contact_ExtendProperties',N'Vista estándar de contacto',N'DataConnectionString',N'select Contact.IdClient, Contact.IdContact, Contact.Name, Contact.Phone, Contact.Mail
, Contact.Address, Contact.City, Contact.Province, Contact.Postcode, Contact.IdCountry, Contact.Image
,Client.Name Cliente, case when client.BlockDate is null then 0 else 1 end as Locked
, Countries.Name Pais, Countries.Flag
from Contact
inner join Client on client.IdClient = Contact.IdClient
left join Countries on Countries.IsoName = Contact.IdCountry
',0,0,1,0,0,N'Name',0,NULL,NULL,1)
 ,(N'Contacto',N'ContactoDefaultList',N'ContactoDefaultList',N'DataConnectionString',N' SELECT [Contact].[IdContact], [Contact].[IdClient] as [Client], [Contact].[IdContact] as [Contact], [Contact].[Name] as [Name], [Contact].[Phone] as [Phone], [Contact].[Mail] as [Mail] FROM [Contact] 

',0,1,1,0,1,NULL,0,NULL,NULL,1)
 ,(N'Contacto',N'Contacts_ExtendProperties',N'Vista estándar de contacto',N'DataConnectionString',N'select Contact.IdClient, Contact.IdContact, Contact.Name, Contact.Phone, Contact.Mail
, Contact.Address, Contact.City, Contact.Province, Contact.Postcode, Contact.IdCountry, Contact.Image
,Client.Name, case when client.BlockDate is null then 0 else 1 end as Locked
, Countries.Name, Countries.Flag
from Contact
inner join Client on client.IdClient = Contact.IdClient
left join Countries on Countries.IsoName = Contact.IdCountry',0,0,1,0,0,N'Contact.Name',0,NULL,NULL,1)
 ,(N'Course',N'CursoDefaultList',N'CursoDefaultList',N'DataConnectionString',N' SELECT [Courses].[CourseId], [Courses].[CourseId] as [CourseId_1], [Courses].[Course] as [Course] FROM [Courses] 

',0,1,1,0,1,NULL,0,NULL,NULL,1)
 ,(N'Course_Step',N'Course_StepDefaultList',N'Course_StepDefaultList',N'DataConnectionString',N' SELECT [Steps].[StepId], [Steps].[CourseId], [Steps].[StepId] as [Step], [FlxCmb1].[Course] as [Course], [Steps].[Order] as [Order] FROM [Steps] 
  LEFT JOIN (Select CourseId,Course From Courses ) [FlxCmb1] ON [FlxCmb1].[CourseId]=[Steps].[CourseId] 

',0,1,1,0,1,NULL,0,NULL,NULL,1)
 ,(N'Employee',N'EmployeeDefaultList',N'EmployeeDefaultList',N'DataConnectionString',N' SELECT [Employee].[IdEmployee], [Employee].[IdEmployee] as [Id. Employee], [Employee].[Name] as [Name], [Employee].[Tel] as [Tel], [Employee].[Image] as [Image] FROM [Employee] 

',0,1,1,0,1,NULL,0,NULL,NULL,1)
 ,(N'Employee',N'Scheduler_Filter',N'Scheduler Filter',N'DataConnectionString',N'SELECT
IdEmployee,
Name,
Image
FROM Employee',0,0,1,0,0,NULL,0,NULL,NULL,1)
 ,(N'Employee',N'Vista_calendario',N'Vista calendario de empleado',N'DataConnectionString',N'select IdEmployee, Name, Image from Employee',0,0,1,0,0,NULL,0,NULL,NULL,1)
 ,(N'Employee_Holiday',N'Employee_HolidayDefaultList',N'Employee_HolidayDefaultList',N'DataConnectionString',N' SELECT [EmployeesHolidays].[IdHoliday], [EmployeesHolidays].[IdHoliday] as [IdHoliday_1], [FlxCmb1].[Name] as [Employee], [EmployeesHolidays].[Name] as [Name], [EmployeesHolidays].[Note] as [Note], [EmployeesHolidays].[StartDate] as [Start Date], [EmployeesHolidays].[EndDate] as [End Date], [EmployeesHolidays].[Validated] as [Validated] FROM [EmployeesHolidays] 
  LEFT JOIN (Select Name, IdEmployee, Image from Employee ) [FlxCmb1] ON [FlxCmb1].[IdEmployee]=[EmployeesHolidays].[IdEmployee] 

',0,1,1,0,1,NULL,0,NULL,NULL,1)
 ,(N'Employee_Holiday',N'Scheduler_Calendar',N'Scheduler_Calendar',N'DataConnectionString',N'SELECT 
EmployeesHolidays.IdHoliday,
EmployeesHolidays.Name as HolidayName,
EmployeesHolidays.StartDate,
EmployeesHolidays.EndDate,
EmployeesHolidays.Validated,
CHOOSE(EmployeesHolidays.Validated + 1, ''rgba(240, 128, 128, 0.9)'', ''rgba(144, 238, 144, 0.9)'') AS Color,
Employee.IdEmployee,
Employee.Name AS EmployeeName,
Employee.Image AS EmployeeImage,
CHOOSE(EmployeesHolidays.Validated + 1, ''Not Validated'', ''Validated'') AS ValidatedText,
''#3c3c46'' AS TextColor,
CASE WHEN CONVERT(VARCHAR(8),EmployeesHolidays.EndDate,105) > CONVERT(VARCHAR(8),EmployeesHolidays.StartDate,105) THEN ''true'' ELSE ''false'' END AS AllDay
 FROM EmployeesHolidays 
 LEFT JOIN Employee ON EmployeesHolidays.IdEmployee = Employee.IdEmployee',0,0,1,0,0,NULL,0,NULL,NULL,1)
 ,(N'Equipo',N'acciones_kanban',N'Acciones kanban',N'DataConnectionString',N'select state as ActionState, Descrip,CssClass from Action_States where state <4',1,0,1,0,0,NULL,0,NULL,NULL,1)
 ,(N'Equipo',N'EquipoDefaultList',N'EquipoDefaultList',N'DataConnectionString',N' SELECT [Team].[IdTeam], [Team].[IdTeam] as [#], [Team].[Descrip] as [Nombre del equipo] FROM [Team] 

',0,1,1,0,1,NULL,0,NULL,NULL,1)
 ,(N'Equipo',N'Kanban_States',N'Kanban States',N'DataConnectionString',N' Select IdState, Description from Tasks_States WHERE IdState <> 4',1,0,1,0,0,NULL,0,NULL,NULL,1)
 ,(N'Project',N'ProjectDefaultList',N'ProjectDefaultList',N'DataConnectionString',N' SELECT [Projects].[IdProject], [Projects].[IdProject] as [IdProject_1], [FlxCmb1].[Descrip] as [Team], [Projects].[Name] as [Name], [Projects].[Logo] as [Logo] FROM [Projects] 
  LEFT JOIN (SELECT [IdTeam], [Descrip] FROM [Team]) [FlxCmb1] ON [FlxCmb1].[IdTeam]=[Projects].[IdTeam] 

',0,1,1,0,1,NULL,0,NULL,NULL,1)
 ,(N'Task',N'Advanced_Timeline',N'Advanced (Timeline)',N'DataConnectionString',N'SELECT 
	Tasks.IdTask,
	Tasks.Name,
	Tasks.StartDate,
	Tasks.EndDate,
	Tasks.CompletedHours,
	Tasks.EstimatedHours,
	CASE WHEN ISNULL(Tasks.EstimatedHours, 0) <> 0 THEN CAST(ROUND(ISNULL(Tasks.CompletedHours, 0) * 100.0 / ISNULL(Tasks.EstimatedHours, 0), 1) AS INT) ELSE 0 END AS Percentage,
	IIF(CASE WHEN ISNULL(Tasks.EstimatedHours, 0) <> 0 THEN CAST(ROUND(ISNULL(Tasks.CompletedHours, 0) * 100.0 / ISNULL(Tasks.EstimatedHours, 0), 1) AS INT) ELSE 0 END > 100, ''lightcoral'', '''') AS PercentageColor,
	Projects.Name AS ProjectName,
	Projects.Logo AS ProjectLogo,
	Tasks_States.IdState,
	Tasks_States.Description AS StateDescription,
	Employee.IdEmployee,
	Employee.Name AS EmployeeName,
	Employee.Image AS EmployeeImage,
	NULL AS Type,
	IIF(Tasks_States.IdState in (3, 4), ''false'', ''true'') AS Editable,
	IIF(Employee.IdEmployee = {{currentReference}}, ''background-color: rgba(119, 136, 153, 0.9);;border-color: rgba(119, 136, 153, 0.9);;'', '''') AS Style
FROM Tasks
LEFT JOIN Projects ON Tasks.IdProject = Projects.IdProject
LEFT JOIN Tasks_States ON Tasks.IdState = Tasks_States.IdState
LEFT JOIN  Employee ON Tasks.IdEmployee = Employee.IdEmployee',0,0,1,0,0,NULL,0,NULL,NULL,1)
 ,(N'Task',N'AdvancedGroups_Timeline',N'Advanced Groups (Timeline)',N'DataConnectionString',N'SELECT 
Employee.IdEmployee,
Employee.Name,
Employee.Image,
Team.Descrip AS Team,
IIF(Employee.IdEmployee = {{currentReference}}, ''background: linear-gradient(315deg,lightslategray 15px,transparent 0%);'', '''') AS Style
FROM Employee
LEFT JOIN Team ON Employee.IdTeam = Team.IdTeam',1,0,1,0,0,NULL,0,NULL,NULL,1)
 ,(N'Task',N'AdvancedWithGroups_Timeline',N'Advanced With Groups (Timeline)',N'DataConnectionString',N'SELECT * 
FROM (
  SELECT 
      Tasks.IdTask,
      Tasks.Name,
      Tasks.StartDate,
      Tasks.EndDate,
      Tasks.CompletedHours,
      Tasks.EstimatedHours,
      CASE WHEN ISNULL(Tasks.EstimatedHours, 0) <> 0 THEN CAST(ROUND(ISNULL(Tasks.CompletedHours, 0) * 100.0 / ISNULL(Tasks.EstimatedHours, 0), 1) AS INT) ELSE 0 END AS Percentage,
      IIF(CASE WHEN ISNULL(Tasks.EstimatedHours, 0) <> 0 THEN CAST(ROUND(ISNULL(Tasks.CompletedHours, 0) * 100.0 / ISNULL(Tasks.EstimatedHours, 0), 1) AS INT) ELSE 0 END > 100, ''lightcoral'', '''') AS PercentageColor,
      Projects.Name AS ProjectName,
      Projects.Logo AS ProjectLogo,
      Tasks_States.IdState,
      Tasks_States.Description AS StateDescription,
      Employee.IdEmployee,
      Employee.Name AS EmployeeName,
      Employee.Image AS EmployeeImage,
      NULL AS Type,
      IIF(Tasks_States.IdState in (3, 4), ''false'', ''true'') AS Editable,
      IIF(Employee.IdEmployee = {{currentReference}}, ''background-color: rgba(119, 136, 153, 0.9);;border-color: rgba(119, 136, 153, 0.9);;'', '''') AS Style
  FROM Tasks
  LEFT JOIN Projects ON Tasks.IdProject = Projects.IdProject
  LEFT JOIN Tasks_States ON Tasks.IdState = Tasks_States.IdState
  LEFT JOIN  Employee ON Tasks.IdEmployee = Employee.IdEmployee
  UNION
  SELECT 
      EmployeesHolidays.IdHoliday,
      EmployeesHolidays.Name,
      EmployeesHolidays.StartDate,
      EmployeesHolidays.EndDate,
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      EmployeesHolidays.Validated,
      NULL,
      EmployeesHolidays.IdEmployee,
      NULL,
      NULL,
      ''background'' AS Type,
      NULL,
      CHOOSE(EmployeesHolidays.Validated + 1, ''background-color: rgba(240, 128, 128, 0.3);border-color: rgba(240, 128, 128, 0.3);'', ''background-color: rgba(144, 238, 144, 0.3);border-color: rgba(144, 238, 144, 0.3);'') AS Style
   FROM EmployeesHolidays
) AS Tasks ',1,0,1,0,0,NULL,0,NULL,NULL,1)
 ,(N'Task',N'Kanban',N'Kanban',N'DataConnectionString',N'SELECT 
	Tasks.IdTask,
	Tasks.Name,
	Tasks.StartDate,
	Tasks.EndDate,
	Tasks.CompletedHours,
	Tasks.EstimatedHours,
	CASE WHEN ISNULL(Tasks.EstimatedHours, 0) <> 0 THEN CAST(ROUND(ISNULL(Tasks.CompletedHours, 0) * 100.0 / ISNULL(Tasks.EstimatedHours, 0), 1) AS INT) ELSE 0 END AS Percentage,
	IIF(CASE WHEN ISNULL(Tasks.EstimatedHours, 0) <> 0 THEN CAST(ROUND(ISNULL(Tasks.CompletedHours, 0) * 100.0 / ISNULL(Tasks.EstimatedHours, 0), 1) AS INT) ELSE 0 END > 100, ''lightcoral'', '''') AS PercentageColor,
	Projects.Name AS ProjectName,
	Projects.Logo AS ProjectLogo,
	Tasks_States.IdState,
	Tasks_States.Description AS StateDescription,
	Employee.IdEmployee,
	Employee.Name AS EmployeeName,
	Employee.Image AS EmployeeImage
FROM Tasks
LEFT JOIN Projects ON Tasks.IdProject = Projects.IdProject
LEFT JOIN Tasks_States ON Tasks.IdState = Tasks_States.IdState
LEFT JOIN  Employee ON Tasks.IdEmployee = Employee.IdEmployee',0,0,1,0,0,NULL,0,NULL,NULL,1)
 ,(N'Task',N'TaskDefaultList',N'TaskDefaultList',N'DataConnectionString',N' SELECT [Tasks].[IdTask], [Tasks].[IdTask] as [IdTask_1], [FlxCmb1].[Name] as [Project], [FlxCmb2].[Description] as [State], [FlxCmb3].[Name] as [Employee], [Tasks].[Name] as [Name], [Tasks].[Description] as [Description], [Tasks].[StartDate] as [Start Date], [Tasks].[EndDate] as [End Date], [Tasks].[EstimatedHours] as [Estimated Hours], [Tasks].[CompletedHours] as [Completed Hours] FROM [Tasks] 
  LEFT JOIN (SELECT [IdProject], [Name] FROM [Projects]) [FlxCmb1] ON [FlxCmb1].[IdProject]=[Tasks].[IdProject] 
  LEFT JOIN (SELECT [IdState], [Description] FROM [Tasks_States]) [FlxCmb2] ON [FlxCmb2].[IdState]=[Tasks].[IdState] 
  LEFT JOIN (Select Name, IdEmployee, Image from Employee ) [FlxCmb3] ON [FlxCmb3].[IdEmployee]=[Tasks].[IdEmployee] 

',0,1,1,0,1,NULL,0,NULL,NULL,1)
 ,(N'Venta',N'Calendario_ventas',N'Calendario de ventas',N'DataConnectionString',N'SELECT IdSale
      ,sale.IdClient
      ,Descrip
      ,EconomicAmount
      ,Badge
      , Date
	  ,DateEnd
      ,convert (varchar(5), date, 108) Ini_Hour
      ,convert (varchar(5), dateend, 108) End_Hour
	  ,DATEDIFF (minute,date,dateend) Duration
      ,''#5889ce'' as Color
      ,''White'' as txtColor
	  ,ClientData.Name
	  ,ClientData.Image
  FROM Sale
  outer apply (select Name, Image from Client where IdClient=sale.IdClient) ClientData',0,0,1,0,0,NULL,0,NULL,NULL,1)
 ,(N'Venta',N'Total_de_ventas',N'Total de ventas',N'DataConnectionString',N'select round (SUM (economicAmount),2) As Total
from sale',0,0,1,0,0,NULL,0,NULL,NULL,1)
 ,(N'Venta',N'VentaDefaultList',N'VentaDefaultList',N'DataConnectionString',N' SELECT [Sale].[IdSale], [Sale].[IdSale] as [Nº Sale], [FlxCmb1].[Name] as [Client], [Sale].[Descrip] as [Description], [Sale].[EconomicAmount] as [Economic Amount], [Sale].[Badge] as [Badge], [Sale].[Date] as [Date] FROM [Sale] 
  LEFT JOIN (select IdClient, Name, IdType, IdState from Client) [FlxCmb1] ON [FlxCmb1].[IdClient]=[Sale].[IdClient] 

',0,1,1,0,1,NULL,0,NULL,NULL,1)
 ,(N'Venta',N'vista_generica_ventas',N'Vista genérica de ventas',N'DataConnectionString',N'select Sale.IdSale, sale.IdClient, sale.Descrip, sale.EconomicAmount, sale.Badge, sale.Date, sale.DateEnd, client.Name as ClientName
from Sale
inner join Client on client.IdClient = sale.IdClient',0,0,1,0,0,NULL,0,NULL,NULL,1)
) AS Source ([ObjectName],[ViewName],[Descrip],[ConnStringId],[SQLSentence],[NoFilter],[ShowAsGrid],[Active],[System],[IsDefault],[OrderBy],[Offline],[PrimaryKeys],[IndexFields],[OriginId])
ON (Target.[ObjectName] = Source.[ObjectName] AND Target.[ViewName] = Source.[ViewName])
WHEN MATCHED AND (
	NULLIF(Source.[Descrip], Target.[Descrip]) IS NOT NULL OR NULLIF(Target.[Descrip], Source.[Descrip]) IS NOT NULL OR 
	NULLIF(Source.[ConnStringId], Target.[ConnStringId]) IS NOT NULL OR NULLIF(Target.[ConnStringId], Source.[ConnStringId]) IS NOT NULL OR 
	NULLIF(Source.[SQLSentence], Target.[SQLSentence]) IS NOT NULL OR NULLIF(Target.[SQLSentence], Source.[SQLSentence]) IS NOT NULL OR 
	NULLIF(Source.[NoFilter], Target.[NoFilter]) IS NOT NULL OR NULLIF(Target.[NoFilter], Source.[NoFilter]) IS NOT NULL OR 
	NULLIF(Source.[ShowAsGrid], Target.[ShowAsGrid]) IS NOT NULL OR NULLIF(Target.[ShowAsGrid], Source.[ShowAsGrid]) IS NOT NULL OR 
	NULLIF(Source.[Active], Target.[Active]) IS NOT NULL OR NULLIF(Target.[Active], Source.[Active]) IS NOT NULL OR 
	NULLIF(Source.[System], Target.[System]) IS NOT NULL OR NULLIF(Target.[System], Source.[System]) IS NOT NULL OR 
	NULLIF(Source.[IsDefault], Target.[IsDefault]) IS NOT NULL OR NULLIF(Target.[IsDefault], Source.[IsDefault]) IS NOT NULL OR 
	NULLIF(Source.[OrderBy], Target.[OrderBy]) IS NOT NULL OR NULLIF(Target.[OrderBy], Source.[OrderBy]) IS NOT NULL OR 
	NULLIF(Source.[Offline], Target.[Offline]) IS NOT NULL OR NULLIF(Target.[Offline], Source.[Offline]) IS NOT NULL OR 
	NULLIF(Source.[PrimaryKeys], Target.[PrimaryKeys]) IS NOT NULL OR NULLIF(Target.[PrimaryKeys], Source.[PrimaryKeys]) IS NOT NULL OR 
	NULLIF(Source.[IndexFields], Target.[IndexFields]) IS NOT NULL OR NULLIF(Target.[IndexFields], Source.[IndexFields]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [Descrip] = Source.[Descrip], 
  [ConnStringId] = Source.[ConnStringId], 
  [SQLSentence] = Source.[SQLSentence], 
  [NoFilter] = Source.[NoFilter], 
  [ShowAsGrid] = Source.[ShowAsGrid], 
  [Active] = Source.[Active], 
  [System] = Source.[System], 
  [IsDefault] = Source.[IsDefault], 
  [OrderBy] = Source.[OrderBy], 
  [Offline] = Source.[Offline], 
  [PrimaryKeys] = Source.[PrimaryKeys], 
  [IndexFields] = Source.[IndexFields], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([ObjectName],[ViewName],[Descrip],[ConnStringId],[SQLSentence],[NoFilter],[ShowAsGrid],[Active],[System],[IsDefault],[OrderBy],[Offline],[PrimaryKeys],[IndexFields],[OriginId])
 VALUES(Source.[ObjectName],Source.[ViewName],Source.[Descrip],Source.[ConnStringId],Source.[SQLSentence],Source.[NoFilter],Source.[ShowAsGrid],Source.[Active],Source.[System],Source.[IsDefault],Source.[OrderBy],Source.[Offline],Source.[PrimaryKeys],Source.[IndexFields],Source.[OriginId])
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





