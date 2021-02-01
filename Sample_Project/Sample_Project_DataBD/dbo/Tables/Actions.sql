CREATE TABLE [dbo].[Actions] (
    [ActionId]    INT            IDENTITY (1, 1) NOT NULL,
    [Date]        SMALLDATETIME  NOT NULL,
    [Hour]        TIME (7)       NULL,
    [EndDate]     SMALLDATETIME  NULL,
    [EndHour]     TIME (7)       NULL,
    [Duration]    INT            NULL,
    [ActionType]  NVARCHAR (5)   NOT NULL,
    [Comment]     NVARCHAR (MAX) NOT NULL,
    [ActionState] INT            NOT NULL,
    [UserName]    NVARCHAR (256) NOT NULL,
    [IdClient]    INT            NULL,
    [IdEmployee]  INT            NULL,
    [Location] NVARCHAR(256) NULL, 
    [Signature] NVARCHAR(MAX) NULL, 
    [AprovalName] NVARCHAR(50) NULL, 
    [AprovalDoc] NVARCHAR(50) NULL, 
    [ExternalCode] VARCHAR(50) NULL, 
    CONSTRAINT [PK_Actions] PRIMARY KEY CLUSTERED ([ActionId] ASC),
    CONSTRAINT [FK_Actions_Action_States] FOREIGN KEY ([ActionState]) REFERENCES [dbo].[Action_States] ([State]),
    CONSTRAINT [FK_Actions_Action_Types] FOREIGN KEY ([ActionType]) REFERENCES [dbo].[Action_Types] ([ActionType]),
    CONSTRAINT [FK_Actions_Client] FOREIGN KEY ([IdClient]) REFERENCES [dbo].[Client] ([IdClient]) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT [FK_Actions_Employee] FOREIGN KEY ([IdEmployee]) REFERENCES [dbo].[Employee] ([IdEmployee])
);

GO
CREATE TRIGGER [dbo].[Actions_ITrig]
ON [dbo].[Actions] 
FOR INSERT
AS
IF EXISTS(SELECT 1 FROM inserted) BEGIN

/**************************************************************************************************************************
	Notify new actions
***************************************************************************************************************************/
	INSERT INTO Notices (Descrip, EmployeId, ActionId)
	SELECT 'New task (' + cast(i.ActionId as varchar) + '): ' + i.Comment,i.IdEmployee, i.ActionId
	FROM inserted i
	inner join Employee e on e.IdEmployee=i.IdEmployee
	WHERE e.SendNotices = 1
END

go

CREATE TRIGGER [dbo].[Actions_UTrig]
ON [dbo].[Actions] 
FOR UPDATE
AS
IF EXISTS(SELECT 1 FROM inserted) BEGIN

/**************************************************************************************************************************
	Notify updated actions
***************************************************************************************************************************/
	INSERT INTO Notices (Descrip, EmployeId, ActionId)
	SELECT 
	'Updated Task (' + cast(i.ActionId as varchar) + '): ' + i.Comment,i.IdEmployee, i.ActionId
	FROM inserted i
	inner join deleted d on d.ActionId=i.ActionId
	inner join Employee e on e.IdEmployee=i.IdEmployee
	WHERE e.SendNotices = 1 and i.IdEmployee=d.IdEmployee AND
	( i.ActionState<>d.ActionState	
	OR i.Comment<>d.Comment
	)

/**************************************************************************************************************************
	Notify unnasigned actions
***************************************************************************************************************************/
	INSERT INTO Notices (Descrip, EmployeId, ActionId)
	SELECT 
	'They have taken you off the task (' + cast(i.ActionId as varchar) + '): ' + i.Comment,d.IdEmployee, i.ActionId
	FROM inserted i
	inner join deleted d on d.ActionId=i.ActionId
	inner join Employee e on e.IdEmployee=i.IdEmployee
	WHERE e.SendNotices = 1 and (
	i.IdEmployee<>d.IdEmployee
	)
/**************************************************************************************************************************
	Notify assigned actions
***************************************************************************************************************************/
	INSERT INTO Notices (Descrip, EmployeId, ActionId)
	SELECT 
	'You have been assigned to the task (' + cast(i.ActionId as varchar) + '): ' + i.Comment,i.IdEmployee, i.ActionId
	FROM inserted i
	inner join deleted d on d.ActionId=i.ActionId
	inner join Employee e on e.IdEmployee=i.IdEmployee
	WHERE e.SendNotices = 1 and (
	i.IdEmployee<>d.IdEmployee
	)

END

go


CREATE TRIGGER [dbo].[Actions_DTrig]
ON [dbo].[Actions] 
FOR DELETE
AS
IF EXISTS(SELECT 1 FROM deleted) BEGIN

/**************************************************************************************************************************
	Notify deleted actions
***************************************************************************************************************************/
	INSERT INTO Notices (Descrip, EmployeId, ActionId)
	SELECT 	'Task ' +	'(' + cast(d.ActionId as varchar) + ') has been deleted. Descrip: ' + d.Comment, d.IdEmployee, d.ActionId
	FROM deleted d 
	inner join Employee e on e.IdEmployee=d.IdEmployee
	WHERE e.SendNotices = 1
END

GO