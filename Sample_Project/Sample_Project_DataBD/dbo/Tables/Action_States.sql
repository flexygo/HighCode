CREATE TABLE [dbo].[Action_States] (
    [State]    INT            NOT NULL,
    [Descrip]  NVARCHAR (255) NOT NULL,
    [CssClass] NVARCHAR (255) NOT NULL,
    CONSTRAINT [PK_Action_States] PRIMARY KEY CLUSTERED ([State] ASC)
);

