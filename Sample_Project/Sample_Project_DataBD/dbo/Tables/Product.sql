CREATE TABLE [dbo].[Product] (
    [IdProduct]       INT          IDENTITY (1, 1) NOT NULL,
    [Descrip]         VARCHAR (50) NULL,
    [Product_Version] VARCHAR (10) NULL,
    CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED ([IdProduct] ASC)
);

