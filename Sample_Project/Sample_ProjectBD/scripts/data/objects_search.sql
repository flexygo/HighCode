

BEGIN TRY

MERGE INTO [Objects_Search] AS Target
USING (VALUES
  (N'B600884B-AF33-4C7F-8236-12D09451F164',N'Ventas',N'texto2',0,0,N'Text',3,NULL,N'( EXISTS (
 SELECT * FROM Sale FlxTblFilter 
 LEFT JOIN (select IdClient, Name, IdType, IdState from Client) FlxCmb1 ON [FlxCmb1].[IdClient]=[Sale].[IdClient] 

 WHERE ( CONVERT(varchar,[Sale].[IdSale]) Like {~@Param1|16|200|FindString~} 
 or  [FlxCmb1].[Name]  LIKE {~@Param2|16|200|FindString~} 
 or  [Sale].[Descrip]  LIKE {~@Param3|0|502|FindString~} 
)
 AND  [Sale].[IdSale] = [FlxTblFilter].[IdSale] 

))
',1)
 ,(N'CC8C394D-0D80-403F-9368-1C08EF2A6251',N'Clientes',N'Texto',0,0,N'Text',1,NULL,N'( EXISTS (
 SELECT * FROM Client FlxTblFilter 

 WHERE ( [Client].[Name]  LIKE {~@Param1|0|52|FindString~} 
 or  [Client].[NIF]  LIKE {~@Param2|0|52|FindString~} 
 or  [Client].[Province]  LIKE {~@Param3|0|52|FindString~} 
 or  [Client].[Phone]  LIKE {~@Param4|0|22|FindString~} 
)
 AND  [Client].[IdClient] = [FlxTblFilter].[IdClient] 

))
',1)
 ,(N'0D41D2E2-FEA5-4F0E-AFC9-2E649A5D1137',N'Tasks',N'Task Filter',0,0,N'Properties',1,NULL,NULL,1)
 ,(N'59577C25-7C50-4465-8BAC-7931343373BA',N'Ventas',N'Ventas',0,0,N'Properties',1,NULL,NULL,1)
 ,(N'999F6B65-6665-411E-B633-91ECFB1B8519',N'Ventas',N'Texto',0,0,N'Text',2,NULL,N'( EXISTS (
 SELECT * FROM Sale FlxTblFilter 
 LEFT JOIN (select IdClient, Name, IdType, IdState from Client) FlxCmb1 ON [FlxCmb1].[IdClient]=[Sale].[IdClient] 

 WHERE ( [FlxCmb1].[Name]  LIKE {~@Param1|16|200|FindString~} 
 or  [Sale].[Descrip]  LIKE {~@Param2|0|502|FindString~} 
)
 AND  [Sale].[IdSale] = [FlxTblFilter].[IdSale] 

))
',1)
 ,(N'A6A0D563-77F9-41F1-9763-B2E2A7B31FDB',N'Clientes',N'Propiedades',0,0,N'Properties',2,NULL,NULL,1)
 ,(N'7B4FA7C3-22CC-44E4-84D5-ED1A3AEDFFF9',N'Acciones',N'Propiedades',0,0,N'Properties',1,NULL,NULL,1)
) AS Source ([SearchId],[ObjectName],[Name],[Generic],[IsDefault],[Type],[Order],[UserId],[SQLSentence],[OriginId])
ON (Target.[SearchId] = Source.[SearchId])
WHEN MATCHED AND (
	NULLIF(Source.[ObjectName], Target.[ObjectName]) IS NOT NULL OR NULLIF(Target.[ObjectName], Source.[ObjectName]) IS NOT NULL OR 
	NULLIF(Source.[Name], Target.[Name]) IS NOT NULL OR NULLIF(Target.[Name], Source.[Name]) IS NOT NULL OR 
	NULLIF(Source.[Generic], Target.[Generic]) IS NOT NULL OR NULLIF(Target.[Generic], Source.[Generic]) IS NOT NULL OR 
	NULLIF(Source.[IsDefault], Target.[IsDefault]) IS NOT NULL OR NULLIF(Target.[IsDefault], Source.[IsDefault]) IS NOT NULL OR 
	NULLIF(Source.[Type], Target.[Type]) IS NOT NULL OR NULLIF(Target.[Type], Source.[Type]) IS NOT NULL OR 
	NULLIF(Source.[Order], Target.[Order]) IS NOT NULL OR NULLIF(Target.[Order], Source.[Order]) IS NOT NULL OR 
	NULLIF(Source.[UserId], Target.[UserId]) IS NOT NULL OR NULLIF(Target.[UserId], Source.[UserId]) IS NOT NULL OR 
	NULLIF(Source.[SQLSentence], Target.[SQLSentence]) IS NOT NULL OR NULLIF(Target.[SQLSentence], Source.[SQLSentence]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [ObjectName] = Source.[ObjectName], 
  [Name] = Source.[Name], 
  [Generic] = Source.[Generic], 
  [IsDefault] = Source.[IsDefault], 
  [Type] = Source.[Type], 
  [Order] = Source.[Order], 
  [UserId] = Source.[UserId], 
  [SQLSentence] = Source.[SQLSentence], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([SearchId],[ObjectName],[Name],[Generic],[IsDefault],[Type],[Order],[UserId],[SQLSentence],[OriginId])
 VALUES(Source.[SearchId],Source.[ObjectName],Source.[Name],Source.[Generic],Source.[IsDefault],Source.[Type],Source.[Order],Source.[UserId],Source.[SQLSentence],Source.[OriginId])
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





