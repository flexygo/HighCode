CREATE TABLE [dbo].[Tasks]
(
	[IdTask] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_Tasks_IdTask] DEFAULT NEWID(), 
    [IdProject] UNIQUEIDENTIFIER NOT NULL,
	[IdEmployee] INT NOT NULL, 
    [Name] NVARCHAR(100) NOT NULL, 
    [Description] NVARCHAR(250) NULL, 
    [StartDate] DATETIME NOT NULL, 
    [EndDate] DATETIME NOT NULL,
	[EstimatedHours] DECIMAL(18, 2) NULL, 
    [CompletedHours] DECIMAL(18, 2) NULL, 

    CONSTRAINT [PK_Tasks] PRIMARY KEY CLUSTERED ([IdTask] ASC),
	CONSTRAINT [FK_Tasks_IdProject_IdProject] FOREIGN KEY([IdProject]) REFERENCES [dbo].[Projects] ([IdProject]) ON UPDATE CASCADE ON DELETE NO ACTION,
 	CONSTRAINT [FK_Tasks_IdEmployee_IdEmployee] FOREIGN KEY([IdEmployee]) REFERENCES [dbo].[Employee] ([IdEmployee]) ON UPDATE CASCADE ON DELETE NO ACTION,


)