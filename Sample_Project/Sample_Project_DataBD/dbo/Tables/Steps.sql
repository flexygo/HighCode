CREATE TABLE [dbo].[Steps] (
    [StepId]    NVARCHAR (100)  NOT NULL,
	[CourseId]  INT             NOT NULL,
    [Descrip]   NVARCHAR (MAX)  NOT NULL,
    [Order]     INT NOT NULL,
    CONSTRAINT [PK_Steps] PRIMARY KEY CLUSTERED ([StepId] ASC,[CourseId] ASC),
    CONSTRAINT [FK_Steps_Courses] FOREIGN KEY ([CourseId]) REFERENCES [dbo].[Courses] ([CourseId]) ON DELETE CASCADE ON UPDATE CASCADE
);