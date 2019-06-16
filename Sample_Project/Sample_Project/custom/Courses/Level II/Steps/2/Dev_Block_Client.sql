CREATE PROCEDURE [dbo].[Dev_Block_Client](
	@IdClient AS INT,
	@BlockReason AS NVARCHAR(250)
)
AS
----------------------------------------------------------------------------------
--#NAME
--		Dev_Block_Client
--#CREATION
-- 		15/06/2019 - Admin Admin
--#CLASIFICATION
-- 		Courses/Level II
--#DESCRIPTION
-- 		Block client
--#PARAMETERS
-- 		@IdClient: Id Client
-- 		@BlockReason: Block Reason
--#OBSERVATIONS
-- 		
--#CHANGES
----------------------------------------------------------------------------------
BEGIN TRY

	BEGIN TRAN

      UPDATE Client 
      SET IdState = 2, 
      BlockReason = @BlockReason, 
      BlockDate = GETDATE() 
      WHERE IdClient = @IdClient
      
      SELECT 
    	'flexygo.nav.openPage("view", "Dev_Client", "(IdClient=' + CAST(@IdClient AS NVARCHAR) + ')", null, "current", false, null);' AS JSCode,
        'Client blocked ;)' AS SuccessMessage
    
	COMMIT TRAN
    
	RETURN 1
    
END TRY

BEGIN CATCH
	IF @@TRANCOUNT > 0 BEGIN
		ROLLBACK TRAN 
	END

	DECLARE @CatchError NVARCHAR(MAX)
	SET @CatchError=dbo.funPrintError(ERROR_MESSAGE(),ERROR_NUMBER(),ERROR_PROCEDURE(),@@PROCID ,ERROR_LINE())
	RAISERROR(@CatchError,12,1)
 
	RETURN 0

END CATCH