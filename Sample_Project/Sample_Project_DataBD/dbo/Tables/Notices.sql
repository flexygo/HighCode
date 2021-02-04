CREATE TABLE [dbo].[Notices] (
    [NoticeId]    INT        IDENTITY(1,1)    NOT NULL,
	[NoticeDate] SMALLDATETIME NULL DEFAULT GETDATE(), 
    [Descrip]  NVARCHAR (255) NOT NULL,
    [EmployeeId] INT NULL, 
    [ActionId] INT NULL, 
    [Sent] BIT NOT NULL DEFAULT 0,         
    [SentDate] SMALLDATETIME NULL, 
    CONSTRAINT [PK_Notices] PRIMARY KEY CLUSTERED ([NoticeId] ASC)
);

