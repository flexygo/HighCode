

BEGIN TRY

MERGE INTO [Offline_Pages] AS Target
USING (VALUES
  (N'LearningApp',N'homepage',NULL,N'generic',N'Home Page',N'<h1>Welcome to Learning app</h1>',NULL,NULL,NULL,NULL,NULL,NULL,1,0,2)
) AS Source ([AppName],[PageName],[ObjectName],[TypeId],[Title],[Body],[Header],[Footer],[Empty],[SQLSentence],[SQLOrderBy],[SQLSearchFilter],[IsDefault],[ShowSearchBar],[OriginId])
ON (Target.[AppName] = Source.[AppName] AND Target.[PageName] = Source.[PageName])
WHEN MATCHED AND (
	NULLIF(Source.[ObjectName], Target.[ObjectName]) IS NOT NULL OR NULLIF(Target.[ObjectName], Source.[ObjectName]) IS NOT NULL OR 
	NULLIF(Source.[TypeId], Target.[TypeId]) IS NOT NULL OR NULLIF(Target.[TypeId], Source.[TypeId]) IS NOT NULL OR 
	NULLIF(Source.[Title], Target.[Title]) IS NOT NULL OR NULLIF(Target.[Title], Source.[Title]) IS NOT NULL OR 
	NULLIF(Source.[Body], Target.[Body]) IS NOT NULL OR NULLIF(Target.[Body], Source.[Body]) IS NOT NULL OR 
	NULLIF(Source.[Header], Target.[Header]) IS NOT NULL OR NULLIF(Target.[Header], Source.[Header]) IS NOT NULL OR 
	NULLIF(Source.[Footer], Target.[Footer]) IS NOT NULL OR NULLIF(Target.[Footer], Source.[Footer]) IS NOT NULL OR 
	NULLIF(Source.[Empty], Target.[Empty]) IS NOT NULL OR NULLIF(Target.[Empty], Source.[Empty]) IS NOT NULL OR 
	NULLIF(Source.[SQLSentence], Target.[SQLSentence]) IS NOT NULL OR NULLIF(Target.[SQLSentence], Source.[SQLSentence]) IS NOT NULL OR 
	NULLIF(Source.[SQLOrderBy], Target.[SQLOrderBy]) IS NOT NULL OR NULLIF(Target.[SQLOrderBy], Source.[SQLOrderBy]) IS NOT NULL OR 
	NULLIF(Source.[SQLSearchFilter], Target.[SQLSearchFilter]) IS NOT NULL OR NULLIF(Target.[SQLSearchFilter], Source.[SQLSearchFilter]) IS NOT NULL OR 
	NULLIF(Source.[IsDefault], Target.[IsDefault]) IS NOT NULL OR NULLIF(Target.[IsDefault], Source.[IsDefault]) IS NOT NULL OR 
	NULLIF(Source.[ShowSearchBar], Target.[ShowSearchBar]) IS NOT NULL OR NULLIF(Target.[ShowSearchBar], Source.[ShowSearchBar]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [ObjectName] = Source.[ObjectName], 
  [TypeId] = Source.[TypeId], 
  [Title] = Source.[Title], 
  [Body] = Source.[Body], 
  [Header] = Source.[Header], 
  [Footer] = Source.[Footer], 
  [Empty] = Source.[Empty], 
  [SQLSentence] = Source.[SQLSentence], 
  [SQLOrderBy] = Source.[SQLOrderBy], 
  [SQLSearchFilter] = Source.[SQLSearchFilter], 
  [IsDefault] = Source.[IsDefault], 
  [ShowSearchBar] = Source.[ShowSearchBar], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([AppName],[PageName],[ObjectName],[TypeId],[Title],[Body],[Header],[Footer],[Empty],[SQLSentence],[SQLOrderBy],[SQLSearchFilter],[IsDefault],[ShowSearchBar],[OriginId])
 VALUES(Source.[AppName],Source.[PageName],Source.[ObjectName],Source.[TypeId],Source.[Title],Source.[Body],Source.[Header],Source.[Footer],Source.[Empty],Source.[SQLSentence],Source.[SQLOrderBy],Source.[SQLSearchFilter],Source.[IsDefault],Source.[ShowSearchBar],Source.[OriginId])

;
END TRY
BEGIN CATCH
    DECLARE @ERRORNUMBER	INT,@ERRORMSG		VARCHAR(MAX),@ERRORSTATE		INT
    SELECT @ERRORNUMBER = 50000 + ERROR_NUMBER(),@ERRORMSG = ERROR_MESSAGE(), @ERRORSTATE = ERROR_STATE();
    THROW @ERRORNUMBER, @ERRORMSG, @ERRORSTATE
END CATCH
GO





