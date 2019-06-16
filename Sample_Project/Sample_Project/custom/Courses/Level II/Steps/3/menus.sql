

BEGIN TRY

MERGE INTO [Menus] AS Target
USING (VALUES
  (N'42fa6a7c-b954-47ec-8ec7-a90793497ede',N'Unblock',NULL,N'fa-unlock',2)
 ,(N'7f216fa7-ee3b-4d5e-8e8d-68a827aeeb17',N'Block',NULL,N'fa-lock',2)
) AS Source ([MenuId],[Descrip],[ParentId],[IconName],[OriginId])
ON (Target.[MenuId] = Source.[MenuId])
WHEN MATCHED AND (
	NULLIF(Source.[Descrip], Target.[Descrip]) IS NOT NULL OR NULLIF(Target.[Descrip], Source.[Descrip]) IS NOT NULL OR 
	NULLIF(Source.[ParentId], Target.[ParentId]) IS NOT NULL OR NULLIF(Target.[ParentId], Source.[ParentId]) IS NOT NULL OR 
	NULLIF(Source.[IconName], Target.[IconName]) IS NOT NULL OR NULLIF(Target.[IconName], Source.[IconName]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [Descrip] = Source.[Descrip], 
  [ParentId] = Source.[ParentId], 
  [IconName] = Source.[IconName], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([MenuId],[Descrip],[ParentId],[IconName],[OriginId])
 VALUES(Source.[MenuId],Source.[Descrip],Source.[ParentId],Source.[IconName],Source.[OriginId])
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





