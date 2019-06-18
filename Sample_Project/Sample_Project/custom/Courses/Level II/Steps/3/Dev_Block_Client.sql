CREATE PROCEDURE [dbo].[Dev_Block_Client](
	@IdClient AS INT,
	@BlockReason AS NVARCHAR(250),
    @Redirect AS BIT
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
--		@Redirect: Redirect to object view
--#OBSERVATIONS
-- 		
--#CHANGES
----------------------------------------------------------------------------------
BEGIN TRY

	BEGIN TRAN

	  --Update client
      UPDATE Client 
      SET IdState = 2, 
      BlockReason = CASE WHEN @BlockReason IS NULL THEN 'Automatic message' ELSE @BlockReason END,
      BlockDate = GETDATE() 
      WHERE IdClient = @IdClient
      
	  --Redirect to object view and change success message
      SELECT 
    	CASE WHEN @Redirect = 1 THEN 'flexygo.nav.openPage("view", "Dev_Client", "(IdClient=' + CAST(@IdClient AS NVARCHAR) + ')", null, "current", false, null);' ELSE NULL END AS JSCode,
        'Client blocked ;)' AS SuccessMessage
    
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