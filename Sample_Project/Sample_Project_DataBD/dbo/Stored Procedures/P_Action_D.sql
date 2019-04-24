CREATE PROCEDURE [dbo].[P_Action_D]  

	@Values as XML OUTPUT,
	@ContextVars as XML,
	@RetValues as XML OUTPUT 	 
	
	AS 
	----------------------------------------------------------------------------------
--#NAME
--		P_Action_D
--#CREATION
-- 		24/04/2019
--#CLASIFICATION
-- 		Sample_Project/Actions
--#DESCRIPTION
-- 		Used for delete Action object through Flexygo Stored procedure
--#PARAMETERS
-- 		@Values : Object properties	,
--		@ContextVars: Flexygo context variables,
--		@RetValues : Flexygo process Helper (CloseParamWindow,JSCode,JSFile,LastException,Params,Refresh,Success,SuccesMessage,WarningMessage)
--#OBSERVATIONS
--
--#CHANGES
-- 		24/04/2019- Rubén Pardo
----------------------------------------------------------------------------------
BEGIN TRY

	

	declare @ActionState int=@Values.value('(/Row/Property[@Name=''ActionState'']/@Value)[1]', 'int' )  
	declare @ActionId int=@Values.value('(/Row/Property[@Name=''ActionId'']/@Value)[1]', 'int' )  

	if @ActionState = 2 BEGIN

		RAISERROR('<h3>Actions with state In Progress can''t be deleted</h3>',12,1)
		RETURN 0

	END ELSE BEGIN			 

		delete actions
		where ActionId=@ActionId
		
		 /* Process return values*/
		  SET @RetValues.modify('replace value of (/Property/@Success)[1] with 1')
		  SET @RetValues.modify('replace value of (/Property/@SuccessMessage)[1] with "All went fine"')

		/* Return 0 if error */
			RETURN 1

		END
END TRY 

BEGIN CATCH
	IF @@TRANCOUNT >0 BEGIN
		ROLLBACK TRAN 
	END

	SET @RetValues.modify('replace value of (/Property/@Success)[1] with 0')
	SET @RetValues.modify('replace value of (/Property/@SuccessMessage)[1] with "Something went wrong"')

	DECLARE @CatchError NVARCHAR(MAX)=ERROR_MESSAGE()
	RAISERROR(@CatchError,12,1)

	RETURN 0

END CATCH