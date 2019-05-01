

BEGIN TRY

MERGE INTO [Objects_Views_Properties] AS Target
USING (VALUES
  (N'Accion',N'AccionDefaultList',N'Accion',N'ActionId',N'Accion',0,N'Id',1)
 ,(N'Accion',N'AccionDefaultList',N'Accion',N'ActionState',N'Accion',1,N'Estado',1)
 ,(N'Accion',N'AccionDefaultList',N'Accion',N'ActionType',N'Accion',2,N'Tipo',1)
 ,(N'Accion',N'AccionDefaultList',N'Accion',N'Comment',N'Accion',7,N'Comentario',1)
 ,(N'Accion',N'AccionDefaultList',N'Accion',N'Date',N'Accion',5,N'Fecha',1)
 ,(N'Accion',N'AccionDefaultList',N'Accion',N'Duration',N'Accion',6,N'Duración',1)
 ,(N'Accion',N'AccionDefaultList',N'Accion',N'IdClient',N'Accion',3,N'Cliente',1)
 ,(N'Accion',N'AccionDefaultList',N'Accion',N'IdEmployee',N'Accion',4,N'Empleado',1)
 ,(N'Cliente',N'ClienteDefaultList',N'Cliente',N'IdClient',N'Cliente',0,N'Id',1)
 ,(N'Cliente',N'ClienteDefaultList',N'Cliente',N'IdType',N'Cliente',4,N'Type',1)
 ,(N'Cliente',N'ClienteDefaultList',N'Cliente',N'Mail',N'Cliente',3,N'Mail',1)
 ,(N'Cliente',N'ClienteDefaultList',N'Cliente',N'Name',N'Cliente',1,N'Name',1)
 ,(N'Cliente',N'ClienteDefaultList',N'Cliente',N'Phone',N'Cliente',2,N'Phone',1)
 ,(N'Contacto',N'ContactoDefaultList',N'Contacto',N'IdClient',N'Contacto',0,N'Client',1)
 ,(N'Contacto',N'ContactoDefaultList',N'Contacto',N'IdContact',N'Contacto',1,N'Contact',1)
 ,(N'Contacto',N'ContactoDefaultList',N'Contacto',N'Mail',N'Contacto',4,N'Mail',1)
 ,(N'Contacto',N'ContactoDefaultList',N'Contacto',N'Name',N'Contacto',2,N'Name',1)
 ,(N'Contacto',N'ContactoDefaultList',N'Contacto',N'Phone',N'Contacto',3,N'Phone',1)
 ,(N'Employee',N'EmployeeDefaultList',N'Employee',N'IdEmployee',N'Employee',0,N'Id. Employee',1)
 ,(N'Employee',N'EmployeeDefaultList',N'Employee',N'Image',N'Employee',3,N'Image',1)
 ,(N'Employee',N'EmployeeDefaultList',N'Employee',N'Name',N'Employee',1,N'Name',1)
 ,(N'Employee',N'EmployeeDefaultList',N'Employee',N'Tel',N'Employee',2,N'Tel',1)
 ,(N'Employee_Holiday',N'Employee_HolidayDefaultList',N'Employee_Holiday',N'EndDate',N'Employee_Holiday',5,N'End Date',1)
 ,(N'Employee_Holiday',N'Employee_HolidayDefaultList',N'Employee_Holiday',N'IdEmployee',N'Employee_Holiday',1,N'Employee',1)
 ,(N'Employee_Holiday',N'Employee_HolidayDefaultList',N'Employee_Holiday',N'IdHoliday',N'Employee_Holiday',0,N'IdHoliday_1',1)
 ,(N'Employee_Holiday',N'Employee_HolidayDefaultList',N'Employee_Holiday',N'Name',N'Employee_Holiday',2,N'Name',1)
 ,(N'Employee_Holiday',N'Employee_HolidayDefaultList',N'Employee_Holiday',N'Note',N'Employee_Holiday',3,N'Note',1)
 ,(N'Employee_Holiday',N'Employee_HolidayDefaultList',N'Employee_Holiday',N'StartDate',N'Employee_Holiday',4,N'Start Date',1)
 ,(N'Employee_Holiday',N'Employee_HolidayDefaultList',N'Employee_Holiday',N'Validated',N'Employee_Holiday',6,N'Validated',1)
 ,(N'Equipo',N'EquipoDefaultList',N'Equipo',N'Descrip',N'Equipo',1,N'Nombre del equipo',1)
 ,(N'Equipo',N'EquipoDefaultList',N'Equipo',N'IdTeam',N'Equipo',0,N'#',1)
 ,(N'Project',N'ProjectDefaultList',N'Project',N'IdProject',N'Project',0,N'IdProject_1',1)
 ,(N'Project',N'ProjectDefaultList',N'Project',N'IdTeam',N'Project',1,N'Team',1)
 ,(N'Project',N'ProjectDefaultList',N'Project',N'Logo',N'Project',3,N'Logo',1)
 ,(N'Project',N'ProjectDefaultList',N'Project',N'Name',N'Project',2,N'Name',1)
 ,(N'Task',N'TaskDefaultList',N'Task',N'CompletedHours',N'Task',9,N'Completed Hours',1)
 ,(N'Task',N'TaskDefaultList',N'Task',N'Description',N'Task',5,N'Description',1)
 ,(N'Task',N'TaskDefaultList',N'Task',N'EndDate',N'Task',7,N'End Date',1)
 ,(N'Task',N'TaskDefaultList',N'Task',N'EstimatedHours',N'Task',8,N'Estimated Hours',1)
 ,(N'Task',N'TaskDefaultList',N'Task',N'IdEmployee',N'Task',3,N'Employee',1)
 ,(N'Task',N'TaskDefaultList',N'Task',N'IdProject',N'Task',1,N'Project',1)
 ,(N'Task',N'TaskDefaultList',N'Task',N'IdState',N'Task',2,N'State',1)
 ,(N'Task',N'TaskDefaultList',N'Task',N'IdTask',N'Task',0,N'IdTask_1',1)
 ,(N'Task',N'TaskDefaultList',N'Task',N'Name',N'Task',4,N'Name',1)
 ,(N'Task',N'TaskDefaultList',N'Task',N'StartDate',N'Task',6,N'Start Date',1)
 ,(N'Venta',N'VentaDefaultList',N'Venta',N'Badge',N'Venta',4,N'Badge',1)
 ,(N'Venta',N'VentaDefaultList',N'Venta',N'Date',N'Venta',5,N'Date',1)
 ,(N'Venta',N'VentaDefaultList',N'Venta',N'Descrip',N'Venta',2,N'Description',1)
 ,(N'Venta',N'VentaDefaultList',N'Venta',N'EconomicAmount',N'Venta',3,N'Economic Amount',1)
 ,(N'Venta',N'VentaDefaultList',N'Venta',N'IdClient',N'Venta',1,N'Client',1)
 ,(N'Venta',N'VentaDefaultList',N'Venta',N'IdSale',N'Venta',0,N'Nº Sale',1)
) AS Source ([ObjectName],[ViewName],[ObjectPropertyName],[PropertyName],[ObjectPath],[Order],[Label],[OriginId])
ON (Target.[ObjectName] = Source.[ObjectName] AND Target.[ViewName] = Source.[ViewName] AND Target.[ObjectPropertyName] = Source.[ObjectPropertyName] AND Target.[PropertyName] = Source.[PropertyName])
WHEN MATCHED AND (
	NULLIF(Source.[ObjectPath], Target.[ObjectPath]) IS NOT NULL OR NULLIF(Target.[ObjectPath], Source.[ObjectPath]) IS NOT NULL OR 
	NULLIF(Source.[Order], Target.[Order]) IS NOT NULL OR NULLIF(Target.[Order], Source.[Order]) IS NOT NULL OR 
	NULLIF(Source.[Label], Target.[Label]) IS NOT NULL OR NULLIF(Target.[Label], Source.[Label]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [ObjectPath] = Source.[ObjectPath], 
  [Order] = Source.[Order], 
  [Label] = Source.[Label], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([ObjectName],[ViewName],[ObjectPropertyName],[PropertyName],[ObjectPath],[Order],[Label],[OriginId])
 VALUES(Source.[ObjectName],Source.[ViewName],Source.[ObjectPropertyName],Source.[PropertyName],Source.[ObjectPath],Source.[Order],Source.[Label],Source.[OriginId])
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





