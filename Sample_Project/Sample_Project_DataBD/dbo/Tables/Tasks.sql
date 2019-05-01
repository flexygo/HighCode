CREATE TABLE [dbo].[Tasks]
(
	[IdTask] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_Tasks_IdTask] DEFAULT NEWID(), 
    [IdProject] UNIQUEIDENTIFIER NOT NULL,
	[IdEmployee] INT NULL, 
    [Name] NVARCHAR(100) NULL, 
    [Description] NVARCHAR(250) NULL, 
    [StartDate] DATETIME NOT NULL, 
    [EndDate] DATETIME NULL,
	[EstimatedHours] DECIMAL(18, 2) NULL, 
    [CompletedHours] DECIMAL(18, 2) NULL, 

    CONSTRAINT [PK_Tasks] PRIMARY KEY CLUSTERED ([IdTask] ASC),
	CONSTRAINT [FK_Tasks_IdProject_IdProject] FOREIGN KEY([IdProject]) REFERENCES [dbo].[Projects] ([IdProject]) ON UPDATE CASCADE ON DELETE NO ACTION,
 	CONSTRAINT [FK_Tasks_IdEmployee_IdEmployee] FOREIGN KEY([IdEmployee]) REFERENCES [dbo].[Employee] ([IdEmployee]) ON UPDATE CASCADE ON DELETE NO ACTION,


)
GO
-- =============================================
-- Author:		Alberto Criado Andrés
-- Create date: 30/04/2019
-- Description:	Timeline defaults values for Tasks
-- =============================================
CREATE TRIGGER [dbo].[Tasks_I]
   ON  [dbo].[Tasks]
   AFTER INSERT
AS 
BEGIN
	IF @@ROWCOUNT<>0 BEGIN

		UPDATE [T] 
		SET [Name] = CASE WHEN [T].[Name] IS NULL THEN  'This task is new and needs a description!' ELSE [T].[Name] END,
		 [EndDate] = CASE WHEN [T].[EndDate] IS NULL THEN DATEADD(DD,1,[T].[StartDate]) ELSE [T].[EndDate] END 

		FROM [Tasks] AS [T] 
		INNER JOIN [inserted] AS [I] ON [T].[IdTask] = [I].[IdTask]

	END        
END