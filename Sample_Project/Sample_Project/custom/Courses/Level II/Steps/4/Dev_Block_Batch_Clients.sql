CREATE PROCEDURE [dbo].[Dev_Block_Batch_Clients](
	@BlockReason AS NVARCHAR(250),
	@sysCollectionSentence NVARCHAR(MAX)

)
AS
----------------------------------------------------------------------------------
--#NAME
--		Dev_Block_Batch_Clients
--#CREATION
-- 		15/06/2019 - Admin Admin
--#CLASIFICATION
-- 		Courses/Level II
--#DESCRIPTION
-- 		Block batch of client
--#PARAMETERS
-- 		@BlockReason: Block Reason
--		@sysCollectionSentence: Batch of client
--#OBSERVATIONS
-- 		
--#CHANGES
----------------------------------------------------------------------------------
BEGIN TRY

	BEGIN TRAN

	DECLARE @ClientsCollection TABLE (IdClient INT)
	
	INSERT INTO @ClientsCollection EXEC sp_executesql @sysCollectionSentence;

      UPDATE Client 
      SET IdState = 2, 
      BlockReason = @BlockReason,
      BlockDate = GETDATE()
	  FROM Client
	  INNER JOIN @ClientsCollection AS ClientsCollection ON Client.IdClient = ClientsCollection.IdClient
      
      SELECT
		'Clients blocked ;)' AS SuccessMessage
    
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