

BEGIN TRY

MERGE INTO [Objects_Objects] AS Target
USING (VALUES
  (N'Equipo',N'Acciones',N'IdTeam in (select IdTeam from Employee e inner join Actions a on a.IdEmployee=e.IdEmployee)',NULL,1,1,0,0,0,1)
 ,(N'Contacto',N'Clientes',N'IdClient=IdClient',N'IdClient=IdClient',1,1,0,0,0,1)
 ,(N'Employee',N'Clientes',N'IdEmployee=IdEmployee',N'IdEmployee=IdEmployee',1,1,0,0,0,1)
 ,(N'Cliente',N'Contactos',N'IdClient=IdClient',N'IdClient=IdClient',1,1,0,0,0,1)
 ,(N'Cliente',N'Documents_Object',N'IdClient=ObjectId|''Cliente''=ObjectName',N'IdClient=ObjectId|''Cliente''=ObjectName',1,0,0,0,1,1)
 ,(N'Equipo',N'Employees',N'IdTeam=IdTeam',N'IdTeam=IdTeam',1,1,0,0,0,1)
 ,(N'Equipo',N'Projects',N'IdTeam=Idteam',N'IdTeam=Idteam',1,1,0,0,0,1)
 ,(N'Cliente',N'sysObjectImages',N'IdClient=ObjectId|''Cliente''=ObjectName',N'IdClient=ObjectId|''Cliente''=ObjectName',1,0,0,0,1,1)
 ,(N'Equipo',N'Tasks',N'IdTeam=Idteam',N'IdTeam=Idteam',1,1,0,0,0,1)
 ,(N'Project',N'Tasks',N'IdProject=IdProject',N'IdProject=IdProject',1,1,0,0,0,1)
 ,(N'Cliente',N'Ventas',N'IdClient=IdClient',N'IdClient=IdClient',1,1,0,0,0,1)
) AS Source ([ObjectName],[ChildCollection],[ObjectRelation],[ObjectDefaults],[ShowInMenu],[ShowInAnalysis],[OneToOneRelation],[Order],[RemoveOnDelete],[OriginId])
ON (Target.[ChildCollection] = Source.[ChildCollection] AND Target.[ObjectName] = Source.[ObjectName])
WHEN MATCHED AND (
	NULLIF(Source.[ObjectRelation], Target.[ObjectRelation]) IS NOT NULL OR NULLIF(Target.[ObjectRelation], Source.[ObjectRelation]) IS NOT NULL OR 
	NULLIF(Source.[ObjectDefaults], Target.[ObjectDefaults]) IS NOT NULL OR NULLIF(Target.[ObjectDefaults], Source.[ObjectDefaults]) IS NOT NULL OR 
	NULLIF(Source.[ShowInMenu], Target.[ShowInMenu]) IS NOT NULL OR NULLIF(Target.[ShowInMenu], Source.[ShowInMenu]) IS NOT NULL OR 
	NULLIF(Source.[ShowInAnalysis], Target.[ShowInAnalysis]) IS NOT NULL OR NULLIF(Target.[ShowInAnalysis], Source.[ShowInAnalysis]) IS NOT NULL OR 
	NULLIF(Source.[OneToOneRelation], Target.[OneToOneRelation]) IS NOT NULL OR NULLIF(Target.[OneToOneRelation], Source.[OneToOneRelation]) IS NOT NULL OR 
	NULLIF(Source.[Order], Target.[Order]) IS NOT NULL OR NULLIF(Target.[Order], Source.[Order]) IS NOT NULL OR 
	NULLIF(Source.[RemoveOnDelete], Target.[RemoveOnDelete]) IS NOT NULL OR NULLIF(Target.[RemoveOnDelete], Source.[RemoveOnDelete]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [ObjectRelation] = Source.[ObjectRelation], 
  [ObjectDefaults] = Source.[ObjectDefaults], 
  [ShowInMenu] = Source.[ShowInMenu], 
  [ShowInAnalysis] = Source.[ShowInAnalysis], 
  [OneToOneRelation] = Source.[OneToOneRelation], 
  [Order] = Source.[Order], 
  [RemoveOnDelete] = Source.[RemoveOnDelete], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([ObjectName],[ChildCollection],[ObjectRelation],[ObjectDefaults],[ShowInMenu],[ShowInAnalysis],[OneToOneRelation],[Order],[RemoveOnDelete],[OriginId])
 VALUES(Source.[ObjectName],Source.[ChildCollection],Source.[ObjectRelation],Source.[ObjectDefaults],Source.[ShowInMenu],Source.[ShowInAnalysis],Source.[OneToOneRelation],Source.[Order],Source.[RemoveOnDelete],Source.[OriginId])
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





