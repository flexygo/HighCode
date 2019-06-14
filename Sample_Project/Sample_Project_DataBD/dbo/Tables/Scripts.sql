CREATE TABLE [dbo].[Scripts] (
    [ScriptId]  INT IDENTITY(1,1)  NOT NULL,
	[StepId]    NVARCHAR (100)  NOT NULL,
	[CourseId]  INT             NOT NULL,
    [Script]   NVARCHAR (MAX)  NOT NULL,
    [Order]     INT NOT NULL,
    CONSTRAINT [PK_Scripts] PRIMARY KEY CLUSTERED ([ScriptId] ASC, [StepId] ASC,[CourseId] ASC),
    CONSTRAINT [FK_Scripts_Steps] FOREIGN KEY ([StepId],[CourseId]) REFERENCES [dbo].[Steps] ([StepId],[CourseId]) ON DELETE CASCADE ON UPDATE CASCADE
);
