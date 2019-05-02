

BEGIN TRY

MERGE INTO [Tasks] AS Target
USING (VALUES
  (N'286877C1-E0BD-4A15-8505-0F622CB58FCC',N'2A409EC1-43CF-4983-A915-AA6CA3E570C0',2,4,N'Global GAP integration with FlexyGO',NULL,'2019-05-06T08:00:00','2019-05-17T15:00:00',20.00,80.00)
 ,(N'437FBEA2-591E-4F5A-9D55-24C319A5BBE8',N'2A409EC1-43CF-4983-A915-AA6CA3E570C0',1,3,N'Resolve minor errors in the schedule',NULL,'2019-05-07T08:00:00','2019-05-07T18:00:00',0.00,0.00)
 ,(N'A72D2CD4-B0E6-4EE2-A11C-27B4BC10F0AF',N'2A409EC1-43CF-4983-A915-AA6CA3E570C0',1,2,N'Siri integration with  FlexyGO',NULL,'2019-05-09T08:00:00','2019-05-10T14:00:00',0.00,12.00)
 ,(N'64678DEB-DD8D-46DC-9F8B-28C5527A2B7D',N'C79F0707-02EB-4D4E-8ECF-0A60914E4430',1,1,N'Presentation with EPSA',NULL,'2019-05-09T08:00:00','2019-05-09T18:00:00',0.00,6.00)
 ,(N'A213D3EF-9FB4-4B4F-8578-35BEFF565A7D',N'A4865DD2-5D2C-4FCB-82FC-CE221EF3ACC7',1,NULL,N'Presentation with Resuinsa',NULL,'2019-05-10T08:00:00','2019-05-10T15:00:00',0.00,4.00)
 ,(N'E261962C-CFE1-4707-BAF0-3FF77FF2113B',N'68F62E5E-9E3F-4A1F-9F5B-E7C07424C5EE',3,1,N'Meeting with Freshtrategy',NULL,'2019-05-06T10:00:00','2019-05-06T20:00:00',6.00,6.00)
 ,(N'3830F973-5683-44D9-8AFF-4D8C36206A29',N'2A409EC1-43CF-4983-A915-AA6CA3E570C0',2,1,N'Prepare presentation for the next event',NULL,'2019-05-06T13:00:00','2019-05-09T04:00:00',3.00,25.00)
 ,(N'4994C566-0E22-437B-9728-713B12DCF2D4',N'2A409EC1-43CF-4983-A915-AA6CA3E570C0',4,2,N'Alexa integration with FlexyGO',NULL,'2019-05-07T08:00:00','2019-05-09T12:00:00',24.00,20.00)
 ,(N'D9839471-B1E7-4B4C-9B5A-74502A76F6B9',N'2A409EC1-43CF-4983-A915-AA6CA3E570C0',2,2,N'Google Assistant integration with FlexyGO',NULL,'2019-05-08T08:00:00','2019-05-09T18:00:00',8.00,16.00)
 ,(N'F451740F-FC66-4846-B387-98E87F4AA80A',N'2A409EC1-43CF-4983-A915-AA6CA3E570C0',2,0,N'Mailchimp integration with FlexyGO',NULL,'2019-05-06T08:00:00','2019-05-09T18:00:00',10.00,32.00)
 ,(N'019DA824-FF87-4056-BE8C-BE24E978D240',N'2A409EC1-43CF-4983-A915-AA6CA3E570C0',1,5,N'Develop Chatter',NULL,'2019-05-09T08:00:00','2019-05-16T18:00:00',0.00,70.00)
 ,(N'9C0EB3E6-AF58-49E2-86B0-E04365076A85',N'2A409EC1-43CF-4983-A915-AA6CA3E570C0',1,NULL,N'Freshdesk integration with FlexyGO',NULL,'2019-05-13T08:00:00','2019-05-16T18:00:00',0.00,30.00)
 ,(N'09CB3600-D5EC-4F64-9F14-E86452438A68',N'391001A1-9893-478A-B19D-9F6F120F9640',1,1,N'Meeting with Garrigues',NULL,'2019-05-07T08:00:00','2019-05-08T18:00:00',0.00,14.00)
 ,(N'4C37B3D2-90D7-4125-B9DB-EC977150ED6F',N'2A409EC1-43CF-4983-A915-AA6CA3E570C0',2,3,N'Slack integration with FlexyGO',NULL,'2019-05-06T08:00:00','2019-05-07T18:00:00',25.00,20.00)
 ,(N'8217F6B6-AFC6-41E8-ADD0-F1E812C64DBB',N'2A409EC1-43CF-4983-A915-AA6CA3E570C0',1,NULL,N'Generate FlexGO release',NULL,'2019-05-14T08:00:00','2019-05-14T18:00:00',0.00,6.00)
 ,(N'DEF7FDBC-E394-4617-ADD5-F431B99F05ED',N'2A409EC1-43CF-4983-A915-AA6CA3E570C0',3,5,N'Develop template builder',NULL,'2019-05-06T10:00:00','2019-05-09T18:00:00',34.00,32.00)
) AS Source ([IdTask],[IdProject],[IdState],[IdEmployee],[Name],[Description],[StartDate],[EndDate],[CompletedHours],[EstimatedHours])
ON (Target.[IdTask] = Source.[IdTask])
WHEN MATCHED AND (
	NULLIF(Source.[IdProject], Target.[IdProject]) IS NOT NULL OR NULLIF(Target.[IdProject], Source.[IdProject]) IS NOT NULL OR 
	NULLIF(Source.[IdState], Target.[IdState]) IS NOT NULL OR NULLIF(Target.[IdState], Source.[IdState]) IS NOT NULL OR 
	NULLIF(Source.[IdEmployee], Target.[IdEmployee]) IS NOT NULL OR NULLIF(Target.[IdEmployee], Source.[IdEmployee]) IS NOT NULL OR 
	NULLIF(Source.[Name], Target.[Name]) IS NOT NULL OR NULLIF(Target.[Name], Source.[Name]) IS NOT NULL OR 
	NULLIF(Source.[Description], Target.[Description]) IS NOT NULL OR NULLIF(Target.[Description], Source.[Description]) IS NOT NULL OR 
	NULLIF(Source.[StartDate], Target.[StartDate]) IS NOT NULL OR NULLIF(Target.[StartDate], Source.[StartDate]) IS NOT NULL OR 
	NULLIF(Source.[EndDate], Target.[EndDate]) IS NOT NULL OR NULLIF(Target.[EndDate], Source.[EndDate]) IS NOT NULL OR 
	NULLIF(Source.[CompletedHours], Target.[CompletedHours]) IS NOT NULL OR NULLIF(Target.[CompletedHours], Source.[CompletedHours]) IS NOT NULL OR 
	NULLIF(Source.[EstimatedHours], Target.[EstimatedHours]) IS NOT NULL OR NULLIF(Target.[EstimatedHours], Source.[EstimatedHours]) IS NOT NULL) THEN
 UPDATE SET
  [IdProject] = Source.[IdProject], 
  [IdState] = Source.[IdState], 
  [IdEmployee] = Source.[IdEmployee], 
  [Name] = Source.[Name], 
  [Description] = Source.[Description], 
  [StartDate] = Source.[StartDate], 
  [EndDate] = Source.[EndDate], 
  [CompletedHours] = Source.[CompletedHours], 
  [EstimatedHours] = Source.[EstimatedHours]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([IdTask],[IdProject],[IdState],[IdEmployee],[Name],[Description],[StartDate],[EndDate],[CompletedHours],[EstimatedHours])
 VALUES(Source.[IdTask],Source.[IdProject],Source.[IdState],Source.[IdEmployee],Source.[Name],Source.[Description],Source.[StartDate],Source.[EndDate],Source.[CompletedHours],Source.[EstimatedHours])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
END TRY
BEGIN CATCH
    DECLARE @ERRORNUMBER	INT,@ERRORMSG		VARCHAR(MAX),@ERRORSTATE		INT
    SELECT @ERRORNUMBER = 50000 + ERROR_NUMBER(),@ERRORMSG = ERROR_MESSAGE(), @ERRORSTATE = ERROR_STATE();
    THROW @ERRORNUMBER, @ERRORMSG, @ERRORSTATE
END CATCH
GO





