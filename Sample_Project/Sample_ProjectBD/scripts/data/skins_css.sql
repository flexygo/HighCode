

BEGIN TRY

MERGE INTO [Skins_Css] AS Target
USING (VALUES
  (N'0FBA3D66-3256-4E8E-8447-D29D1539C55D',N'flexygo',N'~/custom/css/SampleProject.less',N'Sample Project',1,100,1,1)
) AS Source ([CssId],[SkinId],[CssPath],[Descrip],[InBundle],[Order],[OriginId],[Enabled])
ON (Target.[CssId] = Source.[CssId])
WHEN MATCHED AND (
	NULLIF(Source.[SkinId], Target.[SkinId]) IS NOT NULL OR NULLIF(Target.[SkinId], Source.[SkinId]) IS NOT NULL OR 
	NULLIF(Source.[CssPath], Target.[CssPath]) IS NOT NULL OR NULLIF(Target.[CssPath], Source.[CssPath]) IS NOT NULL OR 
	NULLIF(Source.[Descrip], Target.[Descrip]) IS NOT NULL OR NULLIF(Target.[Descrip], Source.[Descrip]) IS NOT NULL OR 
	NULLIF(Source.[InBundle], Target.[InBundle]) IS NOT NULL OR NULLIF(Target.[InBundle], Source.[InBundle]) IS NOT NULL OR 
	NULLIF(Source.[Order], Target.[Order]) IS NOT NULL OR NULLIF(Target.[Order], Source.[Order]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL OR 
	NULLIF(Source.[Enabled], Target.[Enabled]) IS NOT NULL OR NULLIF(Target.[Enabled], Source.[Enabled]) IS NOT NULL) THEN
 UPDATE SET
  [SkinId] = Source.[SkinId], 
  [CssPath] = Source.[CssPath], 
  [Descrip] = Source.[Descrip], 
  [InBundle] = Source.[InBundle], 
  [Order] = Source.[Order], 
  [OriginId] = Source.[OriginId], 
  [Enabled] = Source.[Enabled]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([CssId],[SkinId],[CssPath],[Descrip],[InBundle],[Order],[OriginId],[Enabled])
 VALUES(Source.[CssId],Source.[SkinId],Source.[CssPath],Source.[Descrip],Source.[InBundle],Source.[Order],Source.[OriginId],Source.[Enabled])
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





