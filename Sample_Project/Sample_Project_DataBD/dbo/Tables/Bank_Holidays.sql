CREATE TABLE [dbo].[Bank_Holidays]
(
	[IdHoliday] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_Bank_Holidays_IdHoliday] DEFAULT NEWID(), 
    [Name] NVARCHAR(100) NOT NULL, 
    [Date] DATETIME NOT NULL, 
    CONSTRAINT [PK_Bank_Holidays] PRIMARY KEY CLUSTERED ([IdHoliday] ASC),
)
