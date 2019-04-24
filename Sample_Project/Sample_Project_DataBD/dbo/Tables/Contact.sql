CREATE TABLE [dbo].[Contact] (
    [IdClient]  INT            NOT NULL,
    [IdContact] INT            IDENTITY (1, 1) NOT NULL,
    [Name]      VARCHAR (50)   NOT NULL,
    [Phone]     VARCHAR (20)   NULL,
    [Mail]      VARCHAR (1000) NULL,
    [Address]   VARCHAR (MAX)  NULL,
    [City]      VARCHAR (50)   NULL,
    [Province]  VARCHAR (50)   NULL,
    [Postcode]  VARCHAR (50)   NULL,
    [IdCountry] NVARCHAR (2)   NULL,
    [Image]     VARCHAR (1000) NULL,
    CONSTRAINT [PK_Contact] PRIMARY KEY CLUSTERED ([IdContact] ASC),
    CONSTRAINT [FK_Contact_Client] FOREIGN KEY ([IdClient]) REFERENCES [dbo].[Client] ([IdClient]) ON DELETE CASCADE ON UPDATE CASCADE
);

