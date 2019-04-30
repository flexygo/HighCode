CREATE TABLE [dbo].[EmployeesHolidays]
(
	[IdHoliday] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_EmployeesHolidays_IdHoliday] DEFAULT NEWID(), 
	[IdEmployee] INT NOT NULL, 
    [Name] NVARCHAR(100) NOT NULL, 
    [Note] NVARCHAR(250) NULL, 
    [StartDate] DATETIME NOT NULL, 
    [EndDate] DATETIME NOT NULL,
    [Validated] BIT NOT NULL CONSTRAINT [DF_EmployeesHolidays_Validated] DEFAULT 0, 

    CONSTRAINT [PK_EmployeesHolidays] PRIMARY KEY CLUSTERED ([IdHoliday] ASC),
 	CONSTRAINT [FK_EmployeesHolidays_IdEmployee_IdEmployee] FOREIGN KEY([IdEmployee]) REFERENCES [dbo].[Employee] ([IdEmployee]) ON UPDATE CASCADE ON DELETE NO ACTION,
)
