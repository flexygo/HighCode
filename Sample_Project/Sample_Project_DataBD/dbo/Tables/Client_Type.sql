CREATE TABLE [dbo].[Client_Type] (
    [IdType]  INT           IDENTITY (1, 1) NOT NULL,
    [Descrip] VARCHAR (150) NULL,
    CONSTRAINT [PK_Client_Type] PRIMARY KEY CLUSTERED ([IdType] ASC)
);

