

BEGIN TRY

MERGE INTO [Notices_Sentences] AS Target
USING (VALUES
  (N'08806645-a5a7-481a-8f3b-66324f047ec0',N'Test_PUSH',NULL,N'SELECT ''New changes in your tasks'' as Title
        , Descrip as Message
        , cast(getdate() as smallDatetime) as ReminderTime
		, cast(Dateadd(dd,1,getdate()) as smalldatetime) as ExpiryTime
        , ''push'' as MethodName
        , 0 as AllUsers
        , ''Object'' as TypeId
		, ''popup'' as TargetId
		, ''view'' as PageTypeId
		, ''Accion'' as ObjectName
		, ''(Actions.ActionId='' + CAST (ActionId as varchar) +'')'' as ObjectWhere
        , EmployeeId as CurrentReference
        , 1 as CausesSync
FROM Notices
Where [SENT] = 0',0,NULL,N'UPDATE Notices
SET [Sent] =1, SentDate = GETDATE()
WHERE [Sent] =0',NULL,N'DataConnectionString',N'test_push',1)
) AS Source ([SentenceId],[Decrip],[MailSentence],[NoticeSentence],[NoticeAllUsers],[NoticeUsersSentence],[UpdateNoticeSentence],[UpdateMailSentence],[ConnStringId],[JobName],[OriginId])
ON (Target.[SentenceId] = Source.[SentenceId])
WHEN MATCHED AND (
	NULLIF(Source.[Decrip], Target.[Decrip]) IS NOT NULL OR NULLIF(Target.[Decrip], Source.[Decrip]) IS NOT NULL OR 
	NULLIF(Source.[MailSentence], Target.[MailSentence]) IS NOT NULL OR NULLIF(Target.[MailSentence], Source.[MailSentence]) IS NOT NULL OR 
	NULLIF(Source.[NoticeSentence], Target.[NoticeSentence]) IS NOT NULL OR NULLIF(Target.[NoticeSentence], Source.[NoticeSentence]) IS NOT NULL OR 
	NULLIF(Source.[NoticeAllUsers], Target.[NoticeAllUsers]) IS NOT NULL OR NULLIF(Target.[NoticeAllUsers], Source.[NoticeAllUsers]) IS NOT NULL OR 
	NULLIF(Source.[NoticeUsersSentence], Target.[NoticeUsersSentence]) IS NOT NULL OR NULLIF(Target.[NoticeUsersSentence], Source.[NoticeUsersSentence]) IS NOT NULL OR 
	NULLIF(Source.[UpdateNoticeSentence], Target.[UpdateNoticeSentence]) IS NOT NULL OR NULLIF(Target.[UpdateNoticeSentence], Source.[UpdateNoticeSentence]) IS NOT NULL OR 
	NULLIF(Source.[UpdateMailSentence], Target.[UpdateMailSentence]) IS NOT NULL OR NULLIF(Target.[UpdateMailSentence], Source.[UpdateMailSentence]) IS NOT NULL OR 
	NULLIF(Source.[ConnStringId], Target.[ConnStringId]) IS NOT NULL OR NULLIF(Target.[ConnStringId], Source.[ConnStringId]) IS NOT NULL OR 
	NULLIF(Source.[JobName], Target.[JobName]) IS NOT NULL OR NULLIF(Target.[JobName], Source.[JobName]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [Decrip] = Source.[Decrip], 
  [MailSentence] = Source.[MailSentence], 
  [NoticeSentence] = Source.[NoticeSentence], 
  [NoticeAllUsers] = Source.[NoticeAllUsers], 
  [NoticeUsersSentence] = Source.[NoticeUsersSentence], 
  [UpdateNoticeSentence] = Source.[UpdateNoticeSentence], 
  [UpdateMailSentence] = Source.[UpdateMailSentence], 
  [ConnStringId] = Source.[ConnStringId], 
  [JobName] = Source.[JobName], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([SentenceId],[Decrip],[MailSentence],[NoticeSentence],[NoticeAllUsers],[NoticeUsersSentence],[UpdateNoticeSentence],[UpdateMailSentence],[ConnStringId],[JobName],[OriginId])
 VALUES(Source.[SentenceId],Source.[Decrip],Source.[MailSentence],Source.[NoticeSentence],Source.[NoticeAllUsers],Source.[NoticeUsersSentence],Source.[UpdateNoticeSentence],Source.[UpdateMailSentence],Source.[ConnStringId],Source.[JobName],Source.[OriginId])
WHEN NOT MATCHED BY SOURCE AND TARGET.OriginId = 1 THEN 
 DELETE
;
END TRY
BEGIN CATCH
    DECLARE @ERRORNUMBER	INT,@ERRORMSG		VARCHAR(MAX),@ERRORSTATE		INT
    SELECT @ERRORNUMBER = 50000 + ERROR_NUMBER(),@ERRORMSG = ERROR_MESSAGE(), @ERRORSTATE = ERROR_STATE();
    THROW @ERRORNUMBER, @ERRORMSG, @ERRORSTATE
END CATCH
GO





