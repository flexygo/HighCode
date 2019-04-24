

BEGIN TRY

SET IDENTITY_INSERT [Product] ON

MERGE INTO [Product] AS Target
USING (VALUES
  (1,N'SGA',N'1.1.100')
 ,(2,N'CRM',N'1.4.100')
 ,(3,N'ERP',N'2.1.800')
 ,(4,N'Framework',N'1.1.300')
 ,(5,N'BPM',N'2.1.100')
) AS Source ([IdProduct],[Descrip],[Product_Version])
ON (Target.[IdProduct] = Source.[IdProduct])
WHEN MATCHED AND (
	NULLIF(Source.[Descrip], Target.[Descrip]) IS NOT NULL OR NULLIF(Target.[Descrip], Source.[Descrip]) IS NOT NULL OR 
	NULLIF(Source.[Product_Version], Target.[Product_Version]) IS NOT NULL OR NULLIF(Target.[Product_Version], Source.[Product_Version]) IS NOT NULL) THEN
 UPDATE SET
  [Descrip] = Source.[Descrip], 
  [Product_Version] = Source.[Product_Version]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([IdProduct],[Descrip],[Product_Version])
 VALUES(Source.[IdProduct],Source.[Descrip],Source.[Product_Version])
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

SET IDENTITY_INSERT [Product] OFF
GO




