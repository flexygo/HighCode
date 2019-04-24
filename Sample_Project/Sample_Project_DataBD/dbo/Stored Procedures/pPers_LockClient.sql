CREATE PROCEDURE [dbo].[pPers_LockClient]

@IdClient int,
@IdState int, -- From flexyGO, default value (2 - locked)
@BlockReason varchar(250),
@BlockDate smalldatetime

AS
	
	BEGIN TRY

	if exists (select * from Client where IdClient = @IdClient and IdState = @IdState ) begin
		RAISERROR( 'Selected client is already blocked.',12,1)
	end

	begin tran	
		
			-- Update Client
			UPDATE Client SET IdState = @IdState, blockReason = @BlockReason, blockDate = @BlockDate				
			WHERE IdClient = @IdClient
					
	COMMIT TRAN			
	RETURN -1
END TRY
BEGIN CATCH

	IF @@TRANCOUNT >0 BEGIN
		ROLLBACK TRAN 
	END

	print 'The selected client could not be updated. ' + ERROR_MESSAGE()
	RETURN 0
	
END CATCH

