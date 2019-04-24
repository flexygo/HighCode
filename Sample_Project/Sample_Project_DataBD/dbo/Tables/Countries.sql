CREATE TABLE [dbo].[Countries] (
    [IsoCode] NVARCHAR (2)    NOT NULL,
    [Iso3]    NVARCHAR (3)    NOT NULL,
    [Name]    NVARCHAR (50)   NOT NULL,
    [IsoName] NVARCHAR (50)   NOT NULL,
    [Flag]    NVARCHAR (1009) NOT NULL,
    CONSTRAINT [PK_Countries] PRIMARY KEY CLUSTERED ([IsoCode] ASC)
);

