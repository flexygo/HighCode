CREATE PROCEDURE [dbo].[Dev_Client_U]

    @Values as XML OUTPUT,
    @ContextVars as XML,
    @RetValues as XML OUTPUT

AS
----------------------------------------------------------------------------------
--#NAME
--		Dev_Client_U
--#CREATION
-- 		15/06/2019
--#CLASIFICATION
-- 		Courses/Level II
--#DESCRIPTION
-- 		Cliente object update through Flexygo Stored procedure
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
		   @Name VARCHAR(50), 
           @NIF VARCHAR(50),
           @Phone VARCHAR(20),
           @Mail VARCHAR(1000),
           @Address VARCHAR(MAX),
           @IdType INT,
           @IdState INT,
		   @OldIdState INT,
           @Image VARCHAR(1000),
           @BlockReason VARCHAR(250),
           @BlockDate SMALLDATETIME,
           @IdEmployee INT,
           @Mailing BIT,
           @LastModif SMALLDATETIME,
		   @CurrentUserLogin NVARCHAR(50)
		--Get values
        SET @IdClient = @Values.value('(/Row/Property[@Name=''IdClient'']/@Value)[1]', 'INT')
        SET @Name = @Values.value('(/Row/Property[@Name=''Name'']/@Value)[1]', 'VARCHAR(50)')
        SET @NIF = @Values.value('(/Row/Property[@Name=''NIF'']/@Value)[1]', 'VARCHAR(50)')
        SET @Phone = @Values.value('(/Row/Property[@Name=''Phone'']/@Value)[1]', 'VARCHAR(20)')
        SET @Mail = @Values.value('(/Row/Property[@Name=''Mail'']/@Value)[1]', 'VARCHAR(1000)')
        SET @Address = @Values.value('(/Row/Property[@Name=''Address'']/@Value)[1]', 'VARCHAR(MAX)')
        SET @IdType = @Values.value('(/Row/Property[@Name=''IdType'']/@Value)[1]', 'INT')
        SET @IdState = @Values.value('(/Row/Property[@Name=''IdState'']/@Value)[1]', 'INT')
        SET @OldIdState = @Values.value('(/Row/Property[@Name=''IdState'']/@OldValue)[1]', 'INT')
        SET @Image = @Values.value('(/Row/Property[@Name=''Image'']/@Value)[1]', 'VARCHAR(1000)')
        SET @BlockReason = @Values.value('(/Row/Property[@Name=''BlockReason'']/@Value)[1]', 'VARCHAR(250)')
        SET @BlockDate = @Values.value('(/Row/Property[@Name=''BlockDate'']/@Value)[1]', 'SMALLDATETIME')
        SET @IdEmployee = @Values.value('(/Row/Property[@Name=''IdEmployee'']/@Value)[1]', 'INT')
        SET @Mailing = @Values.value('(/Row/Property[@Name=''Mailing'']/@Value)[1]', 'BIT')
        SET @LastModif = @Values.value('(/Row/Property[@Name=''LastModif'']/@Value)[1]', 'SMALLDATETIME')

        SET @CurrentUserLogin = @ContextVars.value('(/Row/Property[@Name=''currentUserLogin'']/@Value)[1]', 'NVARCHAR(50)')

        --Perform process (Insert fields into different tables)
		--Update client
		UPDATE Client SET
                [Name] = @Name
                ,NIF = @NIF
                ,Phone = @Phone
                ,Mail = @Mail
                ,[Address] = @Address
                ,IdType = @IdType
                ,IdState = @IdState
                ,[Image] = @Image
                ,BlockReason = @BlockReason
                ,BlockDate = @BlockDate
                ,IdEmployee = @IdEmployee
                ,Mailing = @Mailing
                ,LastModif = @LastModif
				WHERE IdClient = @IdClient
		--Check state to insert action
	    IF @IdState = 2 AND @OldIdState <> 2 
		BEGIN

            INSERT INTO Actions
                ([Date]
                ,EndDate
                ,ActionType
                ,Comment
                ,ActionState
                ,UserName
                ,IdClient
                ,IdEmployee)
            VALUES
                (GETDATE(),
                DATEADD(DAY, 1, GETDATE()),
                'EMAIL',
                'Communicate to the customer that is blocked',
                1,
                @CurrentUserLogin,
                @IdClient,
                @IdEmployee)

        END
	
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