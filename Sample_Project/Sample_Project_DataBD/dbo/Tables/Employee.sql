CREATE TABLE [dbo].[Employee] (
    [IdEmployee] INT            NOT NULL,
    [Name]       VARCHAR (50)   NOT NULL,
    [Tel]        VARCHAR (50)   NULL,
    [Email]      VARCHAR (50)   NULL,
    [Image]      NVARCHAR (MAX) NULL,
    [Signature]  NVARCHAR (MAX) NULL,
    [IdTeam]     INT            NULL,
    [SendNotices] BIT NULL DEFAULT 1, 
    CONSTRAINT [PK_Employee] PRIMARY KEY CLUSTERED ([IdEmployee] ASC),
    CONSTRAINT [FK_Employee_Team] FOREIGN KEY ([IdTeam]) REFERENCES [dbo].[Team] ([IdTeam])
);

