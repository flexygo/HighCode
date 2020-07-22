

BEGIN TRY

MERGE INTO [Offline_Styles] AS Target
USING (VALUES
  (N'LearningApp',N'MyCSSGeneric',N'p a { text-decoration: none;}
p a {color:inherit;}
',1,0,'2020-07-20T00:00:00',2)
) AS Source ([AppName],[Name],[CSSCode],[Enabled],[Order],[LastChange],[OriginId])
ON (Target.[AppName] = Source.[AppName] AND Target.[Name] = Source.[Name])
WHEN MATCHED AND (
	NULLIF(Source.[CSSCode], Target.[CSSCode]) IS NOT NULL OR NULLIF(Target.[CSSCode], Source.[CSSCode]) IS NOT NULL OR 
	NULLIF(Source.[Enabled], Target.[Enabled]) IS NOT NULL OR NULLIF(Target.[Enabled], Source.[Enabled]) IS NOT NULL OR 
	NULLIF(Source.[Order], Target.[Order]) IS NOT NULL OR NULLIF(Target.[Order], Source.[Order]) IS NOT NULL OR 
	NULLIF(Source.[LastChange], Target.[LastChange]) IS NOT NULL OR NULLIF(Target.[LastChange], Source.[LastChange]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [CSSCode] = Source.[CSSCode], 
  [Enabled] = Source.[Enabled], 
  [Order] = Source.[Order], 
  [LastChange] = Source.[LastChange], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([AppName],[Name],[CSSCode],[Enabled],[Order],[LastChange],[OriginId])
 VALUES(Source.[AppName],Source.[Name],Source.[CSSCode],Source.[Enabled],Source.[Order],Source.[LastChange],Source.[OriginId])
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





