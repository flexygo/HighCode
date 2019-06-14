CREATE TABLE [dbo].[Courses] (
    [CourseId]  INT            IDENTITY (1, 1) NOT NULL,
    [Course]      NVARCHAR (250)   NOT NULL,
    CONSTRAINT [PK_Courses] PRIMARY KEY CLUSTERED ([CourseId] ASC)
);
