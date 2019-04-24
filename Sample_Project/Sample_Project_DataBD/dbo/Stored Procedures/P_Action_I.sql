CREATE PROCEDURE [dbo].[P_Action_I]  

	@Values as XML OUTPUT,
	@ContextVars as XML,
	@RetValues as XML OUTPUT 	 

	AS 
	----------------------------------------------------------------------------------
--#NAME
--		P_Action_I
--#CREATION
-- 		24/04/2019
--#CLASIFICATION
-- 		Sample_Project/Actions
--#DESCRIPTION
-- 		Used for insert Action object through Flexygo Stored procedure
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

	
	--Declare field variables to load
	declare @ActionId int
	declare @Date smalldatetime=@Values.value('(/Row/Property[@Name=''Date'']/@Value)[1]', 'smalldatetime' )  
	declare @Hour time(7)=@Values.value('(/Row/Property[@Name=''Hour'']/@Value)[1]', 'time(7)' )  
	declare @EndDate smalldatetime=@Values.value('(/Row/Property[@Name=''EndDate'']/@Value)[1]', 'smalldatetime' )  
	declare @EndHour time(7)=@Values.value('(/Row/Property[@Name=''EndHour'']/@Value)[1]', 'time(7)' )  
	declare @Duration int=@Values.value('(/Row/Property[@Name=''Duration'']/@Value)[1]', 'int' )  
	declare @ActionType nvarchar(5)=@Values.value('(/Row/Property[@Name=''ActionType'']/@Value)[1]', 'nvarchar(5)' )  
	declare @Comment nvarchar(max)=@Values.value('(/Row/Property[@Name=''Comment'']/@Value)[1]', 'nvarchar(max)' )  
	declare @ActionState int=@Values.value('(/Row/Property[@Name=''ActionState'']/@Value)[1]', 'int' )  
	declare @UserName nvarchar(256)=@Values.value('(/Row/Property[@Name=''UserName'']/@Value)[1]', 'nvarchar(256)' )  
	declare @IdClient int=@Values.value('(/Row/Property[@Name=''IdClient'']/@Value)[1]', 'int' )  
	declare @IdEmployee int=@Values.value('(/Row/Property[@Name=''IdEmployee'']/@Value)[1]', 'int' )  

	if @EndDate < @Date BEGIN

		RAISERROR('<h3>EndDate is lower than Date</h3>',12,1)
		RETURN 0

	END ELSE BEGIN			 

		/* perform process (insert fields into different tables) */
		 INSERT INTO Actions ([Date], [Hour], [EndDate], [EndHour], [Duration], [ActionType], [Comment], [ActionState], [UserName], [IdClient], [IdEmployee])
		 SELECT @Date,@Hour,@EndDate,@EndHour,@Duration,@ActionType,@Comment,@ActionState,@UserName,@IdClient,@IdEmployee

		 SELECT @ActionId=MAX(ActionId) from Actions

		  /* change Keys */
		  -- When Property has Value replacing Value
		  --SET @Values.modify('replace value of (/Row/Property[@Name=''TesId'']/@Value)[1] with "sysNavigationNode"')
		  -- When Property has not Value inserting Value
		  -- SET @Values.modify('insert attribute Value {sql:variable("@TesId")} into (/Row/Property[@Name=''TesId'' and empty(@Value)])[1]')

		  SET @Values.modify('insert attribute Value {sql:variable("@ActionId")} into (/Row/Property[@Name=''ActionId'' and empty(@Value)])[1]')

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