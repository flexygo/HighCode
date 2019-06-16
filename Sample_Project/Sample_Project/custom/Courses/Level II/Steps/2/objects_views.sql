

BEGIN TRY

MERGE INTO [Objects_Views] AS Target
USING (VALUES
  (N'Dev_Client',N'Dev_ClientDefaultList',N'Dev_ClientDefaultList',N'DataConnectionString',N' SELECT [Client].[IdClient], [Client].[IdClient] as [Id], [Client].[Name] as [Name], [Client].[NIF] as [NIF], [Client].[Phone] as [Phone], [Client].[Mail] as [Mail], [Client].[Address] as [Address], [FlxCmb1].[Descrip] as [Type], [FlxCmb2].[Descrip] as [State], [Client].[Image] as [Image], [Client].[BlockReason] as [Block Reason], [Client].[BlockDate] as [Block Date], [FlxCmb3].[Name] as [Employee], [Client].[Mailing] as [Mailing], [Client].[LastModif] as [Last Modification] FROM [Client] 
  LEFT JOIN (SELECT IdType, Descrip FROM Client_Type ) [FlxCmb1] ON [FlxCmb1].[IdType]=[Client].[IdType] 
  LEFT JOIN (SELECT IdState, Descrip FROM Client_State ) [FlxCmb2] ON [FlxCmb2].[IdState]=[Client].[IdState] 
  LEFT JOIN (Select Name, IdEmployee, Image from Employee ) [FlxCmb3] ON [FlxCmb3].[IdEmployee]=[Client].[IdEmployee] 

',0,1,1,0,1,NULL,2)
) AS Source ([ObjectName],[ViewName],[Descrip],[ConnStringId],[SQLSentence],[NoFilter],[ShowAsGrid],[Active],[System],[IsDefault],[OrderBy],[OriginId])
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
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([ObjectName],[ViewName],[Descrip],[ConnStringId],[SQLSentence],[NoFilter],[ShowAsGrid],[Active],[System],[IsDefault],[OrderBy],[OriginId])
 VALUES(Source.[ObjectName],Source.[ViewName],Source.[Descrip],Source.[ConnStringId],Source.[SQLSentence],Source.[NoFilter],Source.[ShowAsGrid],Source.[Active],Source.[System],Source.[IsDefault],Source.[OrderBy],Source.[OriginId])
WHEN NOT MATCHED BY SOURCE AND TARGET.OriginId = 2 THEN 
 DELETE
;
END TRY
BEGIN CATCH
    DECLARE @ERRORNUMBER	INT,@ERRORMSG		VARCHAR(MAX),@ERRORSTATE		INT
    SELECT @ERRORNUMBER = 50000 + ERROR_NUMBER(),@ERRORMSG = ERROR_MESSAGE(), @ERRORSTATE = ERROR_STATE();
    THROW @ERRORNUMBER, @ERRORMSG, @ERRORSTATE
END CATCH
GO





