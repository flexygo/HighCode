CREATE TABLE [dbo].[Team] (
    [IdTeam]  INT            NOT NULL,
    [Descrip] VARCHAR (50)   NOT NULL,
    [Image]   NVARCHAR (MAX) NULL,
    CONSTRAINT [PK_Team] PRIMARY KEY CLUSTERED ([IdTeam] ASC)
);

