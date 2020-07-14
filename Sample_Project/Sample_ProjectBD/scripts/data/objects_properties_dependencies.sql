

BEGIN TRY

MERGE INTO [Objects_Properties_Dependencies] AS Target
USING (VALUES
  (N'Accion',N'Date',N'EndDate',1,1,NULL,N'select convert(date,dateadd(minute,{{Duration}},convert(smalldatetime,convert(varchar(8),{{Date}},112)+'' ''+''{{Hour}}''))) as FechaFin',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1)
 ,(N'Accion',N'EndHour',N'Duration',1,1,NULL,N'select datediff(minute,convert(smalldatetime,convert(varchar(8),{{Date}},112)+'' ''+''{{Hour}}''),convert(smalldatetime,convert(varchar(8),{{EndDate}},112)+'' ''+''{{EndHour}}'')) as TiempoReal',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1)
 ,(N'Accion',N'Hour',N'Duration',1,1,NULL,N'select datediff(minute,convert(smalldatetime,convert(varchar(8),{{Date}},112)+'' ''+''{{Hour}}''),convert(smalldatetime,convert(varchar(8),{{EndDate}},112)+'' ''+''{{EndHour}}'')) as TiempoReal',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1)
 ,(N'Accion',N'Hour',N'EndDate',2,1,NULL,N'select convert(date,dateadd(minute,{{Duration}},convert(smalldatetime,convert(varchar(8),{{Date}},112)+'' ''+''{{Hour}}''))) as FechaFin',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1)
 ,(N'Cliente',N'IdState',N'BlockDate',3,1,NULL,N'select getdate()',NULL,NULL,NULL,NULL,NULL,NULL,N'2',NULL,NULL,NULL,N'2',NULL,NULL,NULL,NULL,NULL,0,1)
 ,(N'Cliente',N'IdState',N'BlockReason',2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'2',NULL,NULL,NULL,N'2',NULL,NULL,NULL,NULL,NULL,0,1)
 ,(N'Cliente',N'IdState',N'separator3',1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1)
 ,(N'Cliente',N'Mailing',N'Mail',1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,N'1',NULL,NULL,NULL,NULL,NULL,0,1)
 ,(N'Task',N'IdProject',N'IdTeam',1,1,NULL,N'SELECT TOP 1 IdTeam FROM Projects WHERE IdProject = ''{{IdProject}}''',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1)
) AS Source ([ObjectName],[PropertyName],[DependingPropertyName],[Order],[Active],[Descrip],[SQLValue],[SQLComboSentence],[SQLComboFilter],[SQLEnabled],[EnabledValues],[DisabledValues],[SQLVisible],[VisibleValues],[HiddenValues],[SQLClass],[SQLRequired],[RequiredValues],[NotRequiredValues],[PropertyValue],[CusPropName],[SQLCustomProperty],[ConnStringId],[Offline],[OriginId])
ON (Target.[ObjectName] = Source.[ObjectName] AND Target.[PropertyName] = Source.[PropertyName] AND Target.[DependingPropertyName] = Source.[DependingPropertyName])
WHEN MATCHED AND (
	NULLIF(Source.[Order], Target.[Order]) IS NOT NULL OR NULLIF(Target.[Order], Source.[Order]) IS NOT NULL OR 
	NULLIF(Source.[Active], Target.[Active]) IS NOT NULL OR NULLIF(Target.[Active], Source.[Active]) IS NOT NULL OR 
	NULLIF(Source.[Descrip], Target.[Descrip]) IS NOT NULL OR NULLIF(Target.[Descrip], Source.[Descrip]) IS NOT NULL OR 
	NULLIF(Source.[SQLValue], Target.[SQLValue]) IS NOT NULL OR NULLIF(Target.[SQLValue], Source.[SQLValue]) IS NOT NULL OR 
	NULLIF(Source.[SQLComboSentence], Target.[SQLComboSentence]) IS NOT NULL OR NULLIF(Target.[SQLComboSentence], Source.[SQLComboSentence]) IS NOT NULL OR 
	NULLIF(Source.[SQLComboFilter], Target.[SQLComboFilter]) IS NOT NULL OR NULLIF(Target.[SQLComboFilter], Source.[SQLComboFilter]) IS NOT NULL OR 
	NULLIF(Source.[SQLEnabled], Target.[SQLEnabled]) IS NOT NULL OR NULLIF(Target.[SQLEnabled], Source.[SQLEnabled]) IS NOT NULL OR 
	NULLIF(Source.[EnabledValues], Target.[EnabledValues]) IS NOT NULL OR NULLIF(Target.[EnabledValues], Source.[EnabledValues]) IS NOT NULL OR 
	NULLIF(Source.[DisabledValues], Target.[DisabledValues]) IS NOT NULL OR NULLIF(Target.[DisabledValues], Source.[DisabledValues]) IS NOT NULL OR 
	NULLIF(Source.[SQLVisible], Target.[SQLVisible]) IS NOT NULL OR NULLIF(Target.[SQLVisible], Source.[SQLVisible]) IS NOT NULL OR 
	NULLIF(Source.[VisibleValues], Target.[VisibleValues]) IS NOT NULL OR NULLIF(Target.[VisibleValues], Source.[VisibleValues]) IS NOT NULL OR 
	NULLIF(Source.[HiddenValues], Target.[HiddenValues]) IS NOT NULL OR NULLIF(Target.[HiddenValues], Source.[HiddenValues]) IS NOT NULL OR 
	NULLIF(Source.[SQLClass], Target.[SQLClass]) IS NOT NULL OR NULLIF(Target.[SQLClass], Source.[SQLClass]) IS NOT NULL OR 
	NULLIF(Source.[SQLRequired], Target.[SQLRequired]) IS NOT NULL OR NULLIF(Target.[SQLRequired], Source.[SQLRequired]) IS NOT NULL OR 
	NULLIF(Source.[RequiredValues], Target.[RequiredValues]) IS NOT NULL OR NULLIF(Target.[RequiredValues], Source.[RequiredValues]) IS NOT NULL OR 
	NULLIF(Source.[NotRequiredValues], Target.[NotRequiredValues]) IS NOT NULL OR NULLIF(Target.[NotRequiredValues], Source.[NotRequiredValues]) IS NOT NULL OR 
	NULLIF(Source.[PropertyValue], Target.[PropertyValue]) IS NOT NULL OR NULLIF(Target.[PropertyValue], Source.[PropertyValue]) IS NOT NULL OR 
	NULLIF(Source.[CusPropName], Target.[CusPropName]) IS NOT NULL OR NULLIF(Target.[CusPropName], Source.[CusPropName]) IS NOT NULL OR 
	NULLIF(Source.[SQLCustomProperty], Target.[SQLCustomProperty]) IS NOT NULL OR NULLIF(Target.[SQLCustomProperty], Source.[SQLCustomProperty]) IS NOT NULL OR 
	NULLIF(Source.[ConnStringId], Target.[ConnStringId]) IS NOT NULL OR NULLIF(Target.[ConnStringId], Source.[ConnStringId]) IS NOT NULL OR 
	NULLIF(Source.[Offline], Target.[Offline]) IS NOT NULL OR NULLIF(Target.[Offline], Source.[Offline]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [Order] = Source.[Order], 
  [Active] = Source.[Active], 
  [Descrip] = Source.[Descrip], 
  [SQLValue] = Source.[SQLValue], 
  [SQLComboSentence] = Source.[SQLComboSentence], 
  [SQLComboFilter] = Source.[SQLComboFilter], 
  [SQLEnabled] = Source.[SQLEnabled], 
  [EnabledValues] = Source.[EnabledValues], 
  [DisabledValues] = Source.[DisabledValues], 
  [SQLVisible] = Source.[SQLVisible], 
  [VisibleValues] = Source.[VisibleValues], 
  [HiddenValues] = Source.[HiddenValues], 
  [SQLClass] = Source.[SQLClass], 
  [SQLRequired] = Source.[SQLRequired], 
  [RequiredValues] = Source.[RequiredValues], 
  [NotRequiredValues] = Source.[NotRequiredValues], 
  [PropertyValue] = Source.[PropertyValue], 
  [CusPropName] = Source.[CusPropName], 
  [SQLCustomProperty] = Source.[SQLCustomProperty], 
  [ConnStringId] = Source.[ConnStringId], 
  [Offline] = Source.[Offline], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([ObjectName],[PropertyName],[DependingPropertyName],[Order],[Active],[Descrip],[SQLValue],[SQLComboSentence],[SQLComboFilter],[SQLEnabled],[EnabledValues],[DisabledValues],[SQLVisible],[VisibleValues],[HiddenValues],[SQLClass],[SQLRequired],[RequiredValues],[NotRequiredValues],[PropertyValue],[CusPropName],[SQLCustomProperty],[ConnStringId],[Offline],[OriginId])
 VALUES(Source.[ObjectName],Source.[PropertyName],Source.[DependingPropertyName],Source.[Order],Source.[Active],Source.[Descrip],Source.[SQLValue],Source.[SQLComboSentence],Source.[SQLComboFilter],Source.[SQLEnabled],Source.[EnabledValues],Source.[DisabledValues],Source.[SQLVisible],Source.[VisibleValues],Source.[HiddenValues],Source.[SQLClass],Source.[SQLRequired],Source.[RequiredValues],Source.[NotRequiredValues],Source.[PropertyValue],Source.[CusPropName],Source.[SQLCustomProperty],Source.[ConnStringId],Source.[Offline],Source.[OriginId])
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





