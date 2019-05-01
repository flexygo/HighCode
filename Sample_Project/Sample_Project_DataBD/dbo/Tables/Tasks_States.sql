CREATE TABLE [dbo].[Tasks_States]
(
	[IdState] INT  IDENTITY (1, 1) NOT NULL,
    [Description] VARCHAR (50) NOT NULL,
    CONSTRAINT [PK_Tasks_States] PRIMARY KEY CLUSTERED ([IdState] ASC)
)
