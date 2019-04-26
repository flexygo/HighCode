

BEGIN TRY

MERGE INTO [Carousel] AS Target
USING (VALUES
  (1,N'Landscape 1',N'~/custom/carousel/1.jpg')
 ,(2,N'Landscape 2',N'~/custom/carousel/2.jpg')
 ,(3,N'Landscape 3',N'~/custom/carousel/3.jpg')
 ,(4,N'Landscape 4',N'~/custom/carousel/4.jpg')
 ,(5,N'Landscape 5',N'~/custom/carousel/5.jpg')
) AS Source ([ImageId],[Description],[File])
ON (Target.[ImageId] = Source.[ImageId])
WHEN MATCHED AND (
	NULLIF(Source.[Description], Target.[Description]) IS NOT NULL OR NULLIF(Target.[Description], Source.[Description]) IS NOT NULL OR 
	NULLIF(Source.[File], Target.[File]) IS NOT NULL OR NULLIF(Target.[File], Source.[File]) IS NOT NULL) THEN
 UPDATE SET
  [Description] = Source.[Description], 
  [File] = Source.[File]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([ImageId],[Description],[File])
 VALUES(Source.[ImageId],Source.[Description],Source.[File])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
END TRY
BEGIN CATCH
    DECLARE @ERRORNUMBER	INT,@ERRORMSG		VARCHAR(MAX),@ERRORSTATE		INT
    SELECT @ERRORNUMBER = 50000 + ERROR_NUMBER(),@ERRORMSG = ERROR_MESSAGE(), @ERRORSTATE = ERROR_STATE();
    THROW @ERRORNUMBER, @ERRORMSG, @ERRORSTATE
END CATCH
GO





