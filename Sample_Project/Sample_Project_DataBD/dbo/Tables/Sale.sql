CREATE TABLE [dbo].[Sale] (
    [IdSale]         INT            IDENTITY (1, 1) NOT NULL,
    [IdClient]       INT            NOT NULL,
    [Descrip]        VARCHAR (500)  NULL,
    [EconomicAmount] FLOAT (53)     NOT NULL,
    [Badge]          VARCHAR (15)   NOT NULL,
    [Date]           SMALLDATETIME  NOT NULL,
    [DateEnd]        SMALLDATETIME  NULL,
    [Signature]      NVARCHAR (MAX) NULL,
    CONSTRAINT [PK_Sale] PRIMARY KEY CLUSTERED ([IdSale] ASC),
    CONSTRAINT [FK_Client_Sale] FOREIGN KEY ([IdClient]) REFERENCES [dbo].[Client] ([IdClient]) ON DELETE CASCADE ON UPDATE CASCADE
);

