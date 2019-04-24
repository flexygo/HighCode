

BEGIN TRY

MERGE INTO [Sale_Product] AS Target
USING (VALUES
  (1,1)
 ,(2,2)
 ,(2,3)
 ,(3,4)
 ,(4,5)
 ,(5,2)
 ,(5,3)
 ,(6,5)
 ,(7,1)
 ,(8,5)
 ,(9,2)
 ,(9,3)
 ,(10,1)
 ,(11,5)
 ,(12,2)
 ,(13,4)
 ,(13,5)
 ,(14,1)
 ,(15,3)
 ,(16,3)
 ,(16,4)
 ,(17,2)
 ,(18,2)
 ,(19,1)
 ,(19,3)
 ,(19,4)
 ,(20,2)
 ,(20,3)
 ,(21,2)
 ,(22,2)
 ,(23,2)
 ,(24,1)
 ,(24,2)
 ,(24,3)
 ,(24,5)
) AS Source ([IdSale],[IdProduct])
ON (Target.[IdSale] = Source.[IdSale] AND Target.[IdProduct] = Source.[IdProduct])
WHEN NOT MATCHED BY TARGET THEN
 INSERT([IdSale],[IdProduct])
 VALUES(Source.[IdSale],Source.[IdProduct])
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





