CREATE PROCEDURE [dbo].[pPers_LockClientBatch]
@IdState int, -- From flexyGO, default value (2 - locked)
@BlockReason varchar(250),
@BlockDate smalldatetime,
@sysCollectionSentence nvarchar(max)
AS
	
	BEGIN TRY

	begin tran	
		
			Declare @Clients Table (IdClient int)
			INSERT INTO @Clients EXEC sp_executesql @sysCollectionSentence;

			update C 
			set IdState=@IdState, BlockReason=@BlockReason, BlockDate=@BlockDate
			from Client C inner join @Clients Sel on C.IdClient=Sel.IdClient			


	COMMIT TRAN	
			
	RETURN -1
END TRY
BEGIN CATCH

	IF @@TRANCOUNT >0 BEGIN
		ROLLBACK TRAN 
	END

	declare @Error nvarchar(max) = 'The selected client could not be updated. ' + ERROR_MESSAGE()
	RAISERROR(@Error,12,1)
	RETURN 0
	
END CATCH