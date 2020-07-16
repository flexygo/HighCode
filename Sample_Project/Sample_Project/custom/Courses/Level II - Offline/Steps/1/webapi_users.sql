

BEGIN TRY

MERGE INTO [WebAPI_Users] AS Target
USING (VALUES
  (N'1',1,2)
) AS Source ([UserId],[isAuthorized],[OriginId])
ON (Target.[UserId] = Source.[UserId])
WHEN MATCHED AND (
	NULLIF(Source.[isAuthorized], Target.[isAuthorized]) IS NOT NULL OR NULLIF(Target.[isAuthorized], Source.[isAuthorized]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [isAuthorized] = Source.[isAuthorized], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([UserId],[isAuthorized],[OriginId])
 VALUES(Source.[UserId],Source.[isAuthorized],Source.[OriginId])
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





