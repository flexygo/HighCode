CREATE TABLE [dbo].[Client_State] (
    [IdState] INT          IDENTITY (1, 1) NOT NULL,
    [Descrip] VARCHAR (50) NOT NULL,
    CONSTRAINT [PK_Client_State] PRIMARY KEY CLUSTERED ([IdState] ASC)
);

