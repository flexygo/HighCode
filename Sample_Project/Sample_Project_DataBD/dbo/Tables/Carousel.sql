CREATE TABLE [dbo].[Carousel] (
	[ImageId] INT            NOT NULL,
	[Description]   NVARCHAR (50) NULL,
	[File]   NVARCHAR (250) NULL,
CONSTRAINT [PK_Carousel] PRIMARY KEY CLUSTERED ([ImageId] ASC)
)