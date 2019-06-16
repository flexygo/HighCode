CREATE PROCEDURE [dbo].[Dev_Unblock_Client](
	@IdClient AS INT
)
AS
----------------------------------------------------------------------------------
--#NAME
--		Dev_Unblock_Client
--#CREATION
-- 		15/06/2019 - Admin Admin
--#CLASIFICATION
-- 		Courses/Level II
--#DESCRIPTION
-- 		Block client
--#PARAMETERS
-- 		@IdClient: Id Client
--#OBSERVATIONS
-- 		
--#CHANGES
----------------------------------------------------------------------------------
BEGIN TRY

	BEGIN TRAN

      UPDATE Client 
      SET IdState = 1, 
      BlockReason = NULL, 
      BlockDate = NULL 
      WHERE IdClient = @IdClient
      
      SELECT 
    	'flexygo.nav.openPage("view", "Dev_Client", "(IdClient=' + CAST(@IdClient AS NVARCHAR) + ')", null, "current", false, null);' AS JSCode,
        'Client Unblocked ;)' AS SuccessMessage
        
	COMMIT TRAN
    
	RETURN 1
    
END TRY

BEGIN CATCH
	IF @@TRANCOUNT > 0 BEGIN
		ROLLBACK TRAN 
	END

	DECLARE @CatchError NVARCHAR(MAX)
	SET @CatchError = ERROR_MESSAGE()
	RAISERROR(@CatchError,12,1)
 
	RETURN 0

END CATCH