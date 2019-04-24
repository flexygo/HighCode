CREATE PROCEDURE [dbo].[pPers_ActionKanbanChangeColumn]

@BoardId int,
@CardId int, 
@OldColumnId int,
@NewColumnId int

AS
	
	BEGIN TRY

	if exists (select 1 where 1 = 0 ) begin
		RAISERROR( 'Selected client is already blocked.',12,1)
	end

	begin tran	
		
			-- Update action
			update Actions set ActionState = @NewColumnId where ActionId= @CardId 
			-- log
			insert into temp_borrar (field1,field2,field3,field4)
			values (@BoardId,@CardId , @OldColumnId,@NewColumnId)	

	COMMIT TRAN			
	select 'alert (''hola'');' as JAVASCRIPT
	RETURN 1
END TRY
BEGIN CATCH

	IF @@TRANCOUNT >0 BEGIN
		ROLLBACK TRAN 
	END

	print 'The selected client could not be updated. ' + ERROR_MESSAGE()
	RETURN 0
	
END CATCH
