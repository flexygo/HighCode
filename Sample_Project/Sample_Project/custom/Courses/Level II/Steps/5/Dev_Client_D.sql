CREATE PROCEDURE [dbo].[Dev_Client_D]

    @Values as XML OUTPUT,
    @ContextVars as XML,
    @RetValues as XML OUTPUT

AS
----------------------------------------------------------------------------------
--#NAME
--		Dev_Client_D
--#CREATION
-- 		15/06/2019
--#CLASIFICATION
-- 		Courses/Level II
--#DESCRIPTION
-- 		Cliente object delete through Flexygo Stored procedure
--#PARAMETERS
-- 		@Values : Object properties	,
--		@ContextVars: Flexygo ciontext variables,
--		@RetValues : Flexygo process Helper (CloseParamWindow, JSCode, JSFile, LastException, Params, Refresh, Success, SuccesMessage, WarningMessage)
--#OBSERVATIONS
-- Values XML Sample
--	< Row rowId="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" ObjectName="My_ObjectName">
--		< Property Name="My_PropertyName" Value="My_PropertyValue" OldValue="My_PropertyOldValue" TableName="My_TableName" IsKey="True" />
--     ...
--	</Row>
--
-- ContextVars XML Sample		
--  < Row>
--		< Property Name="reference" Value="0" />
--		< Property Name="subReference" Value="0" />
--		< Property Name="currentRole" Value="Admins" />
--		< Property Name="currentRoleId" Value="admins" />
--		< Property Name="currentUserLogin" Value="admin" />
--		< Property Name="currentUserId" Value="1" />
--		< Property Name="currentUserFullName" Value="admin" />
--		< Property Name="currentUserCultureId" Value="en-gb" />
--		< Property Name="currentUserLang" Value="en" />
--		< Property Name="currentUserEmail" Value="info@ahora.es.com" />
--  </Row>
--
-- Return vars XML Sample		
--		<Property Success="False" SuccessMessage="" WarningMessage="" JSCode="" JSFile="" CloseParamWindow="False" refresh="False" />
--
--#CHANGES
-- 		15/06/2018- Admin Admin
----------------------------------------------------------------------------------
BEGIN TRY
	BEGIN TRAN
	
        --Declare field variables to load
        DECLARE @IdClient INT,
           @IdState INT
		
		--Get values
        SET @IdClient = @Values.value('(/Row/Property[@Name=''IdClient'']/@Value)[1]', 'INT')
        SET @IdState = @Values.value('(/Row/Property[@Name=''IdState'']/@Value)[1]', 'INT')
       
	   --Check state
		IF @IdState <> 2 
		BEGIN

			RAISERROR('<h3>Only can remove clients blocked</h3>',12,1)
			RETURN 0

		END 
	
		DELETE FROM Client WHERE IdClient = @IdClient
                               
        --Process return values
        SET @RetValues.modify('replace value of (/Property/@Success)[1] with 1')
        SET @RetValues.modify('replace value of (/Property/@SuccessMessage)[1] with "Client saved ;)"')

    COMMIT TRAN

	/* Return 0 if error */
	RETURN 1
    
END TRY 

BEGIN CATCH
	IF @@TRANCOUNT >0 BEGIN
    ROLLBACK TRAN
END

	DECLARE @CatchError NVARCHAR(MAX)
	SET @CatchError = ERROR_MESSAGE()
	RAISERROR(@CatchError,12,1)
 
	SET @RetValues.modify('replace value of (/Property/@Success)[1] with 0')
	SET @RetValues.modify('replace value of (/Property/@SuccessMessage)[1] with "Something went wrong"')
	
    RETURN 0

END CATCH