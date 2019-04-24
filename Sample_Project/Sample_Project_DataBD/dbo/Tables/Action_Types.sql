CREATE TABLE [dbo].[Action_Types] (
    [ActionType] NVARCHAR (5)   NOT NULL,
    [Descrip]    NVARCHAR (100) NOT NULL,
    [CssClass]   NVARCHAR (255) NOT NULL,
    CONSTRAINT [PK_Action_Types] PRIMARY KEY CLUSTERED ([ActionType] ASC)
);

