

BEGIN TRY

MERGE INTO [Objects_Search_Properties] AS Target
USING (VALUES
  (N'B600884B-AF33-4C7F-8236-12D09451F164',N'Venta',N'Descrip',N'Venta',2,2,N'Description',N'text',1)
 ,(N'B600884B-AF33-4C7F-8236-12D09451F164',N'Venta',N'IdClient',N'Venta',2,1,N'Client',N'dbcombo',1)
 ,(N'B600884B-AF33-4C7F-8236-12D09451F164',N'Venta',N'IdSale',N'Venta',2,0,N'Nº Sale',N'number-range',1)
 ,(N'CC8C394D-0D80-403F-9368-1C08EF2A6251',N'Cliente',N'Name',N'Cliente',2,0,N'Name',N'text',1)
 ,(N'CC8C394D-0D80-403F-9368-1C08EF2A6251',N'Cliente',N'NIF',N'Cliente',2,1,N'NIF',N'text',1)
 ,(N'CC8C394D-0D80-403F-9368-1C08EF2A6251',N'Cliente',N'Phone',N'Cliente',2,3,N'Phone',N'text',1)
 ,(N'CC8C394D-0D80-403F-9368-1C08EF2A6251',N'Cliente',N'Province',N'Cliente',2,2,N'Province',N'text',1)
 ,(N'0D41D2E2-FEA5-4F0E-AFC9-2E649A5D1137',N'Task',N'IdEmployee',N'Task',2,1,N'Employee',N'dbcombo',1)
 ,(N'0D41D2E2-FEA5-4F0E-AFC9-2E649A5D1137',N'Task',N'IdProject',N'Task',2,0,N'Project',N'dbcombo',1)
 ,(N'0D41D2E2-FEA5-4F0E-AFC9-2E649A5D1137',N'Task',N'Name',N'Task',2,2,N'Name',N'text',1)
 ,(N'59577C25-7C50-4465-8BAC-7931343373BA',N'Venta',N'Date',N'Venta',2,2,N'Date',N'date-range',1)
 ,(N'59577C25-7C50-4465-8BAC-7931343373BA',N'Venta',N'Descrip',N'Venta',2,1,N'Description',N'text',1)
 ,(N'59577C25-7C50-4465-8BAC-7931343373BA',N'Venta',N'IdClient',N'Venta',2,0,N'Client',N'dbcombo',1)
 ,(N'999F6B65-6665-411E-B633-91ECFB1B8519',N'Venta',N'Descrip',N'Venta',2,1,N'Description',N'text',1)
 ,(N'999F6B65-6665-411E-B633-91ECFB1B8519',N'Venta',N'IdClient',N'Venta',2,0,N'Client',N'dbcombo',1)
 ,(N'A6A0D563-77F9-41F1-9763-B2E2A7B31FDB',N'Cliente',N'City',N'Cliente',2,2,N'City',N'text',1)
 ,(N'A6A0D563-77F9-41F1-9763-B2E2A7B31FDB',N'Cliente',N'IdEmployee',N'Cliente',2,4,N'Employee',N'dbcombo',1)
 ,(N'A6A0D563-77F9-41F1-9763-B2E2A7B31FDB',N'Cliente',N'Name',N'Cliente',2,0,N'Name',N'text',1)
 ,(N'A6A0D563-77F9-41F1-9763-B2E2A7B31FDB',N'Cliente',N'NIF',N'Cliente',2,1,N'NIF',N'text',1)
 ,(N'A6A0D563-77F9-41F1-9763-B2E2A7B31FDB',N'Cliente',N'Province',N'Cliente',2,3,N'Province',N'text',1)
 ,(N'7B4FA7C3-22CC-44E4-84D5-ED1A3AEDFFF9',N'Accion',N'ActionId',N'Accion',2,0,N'Id',N'number-range',1)
 ,(N'7B4FA7C3-22CC-44E4-84D5-ED1A3AEDFFF9',N'Accion',N'ActionState',N'Accion',2,3,N'Estado',N'dbcombo',1)
 ,(N'7B4FA7C3-22CC-44E4-84D5-ED1A3AEDFFF9',N'Accion',N'ActionType',N'Accion',2,2,N'Tipo',N'dbcombo',1)
 ,(N'7B4FA7C3-22CC-44E4-84D5-ED1A3AEDFFF9',N'Accion',N'Date',N'Accion',2,1,N'Fecha',N'date-range',1)
 ,(N'7B4FA7C3-22CC-44E4-84D5-ED1A3AEDFFF9',N'Accion',N'IdClient',N'Accion',2,4,N'Cliente',N'dbcombo',1)
 ,(N'7B4FA7C3-22CC-44E4-84D5-ED1A3AEDFFF9',N'Accion',N'IdEmployee',N'Accion',2,5,N'Empleado',N'dbcombo',1)
) AS Source ([SearchId],[ObjectName],[PropertyName],[ObjectPath],[Size],[Order],[Label],[PropertySearchType],[OriginId])
ON (Target.[SearchId] = Source.[SearchId] AND Target.[ObjectName] = Source.[ObjectName] AND Target.[PropertyName] = Source.[PropertyName])
WHEN MATCHED AND (
	NULLIF(Source.[ObjectPath], Target.[ObjectPath]) IS NOT NULL OR NULLIF(Target.[ObjectPath], Source.[ObjectPath]) IS NOT NULL OR 
	NULLIF(Source.[Size], Target.[Size]) IS NOT NULL OR NULLIF(Target.[Size], Source.[Size]) IS NOT NULL OR 
	NULLIF(Source.[Order], Target.[Order]) IS NOT NULL OR NULLIF(Target.[Order], Source.[Order]) IS NOT NULL OR 
	NULLIF(Source.[Label], Target.[Label]) IS NOT NULL OR NULLIF(Target.[Label], Source.[Label]) IS NOT NULL OR 
	NULLIF(Source.[PropertySearchType], Target.[PropertySearchType]) IS NOT NULL OR NULLIF(Target.[PropertySearchType], Source.[PropertySearchType]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [ObjectPath] = Source.[ObjectPath], 
  [Size] = Source.[Size], 
  [Order] = Source.[Order], 
  [Label] = Source.[Label], 
  [PropertySearchType] = Source.[PropertySearchType], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([SearchId],[ObjectName],[PropertyName],[ObjectPath],[Size],[Order],[Label],[PropertySearchType],[OriginId])
 VALUES(Source.[SearchId],Source.[ObjectName],Source.[PropertyName],Source.[ObjectPath],Source.[Size],Source.[Order],Source.[Label],Source.[PropertySearchType],Source.[OriginId])
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





