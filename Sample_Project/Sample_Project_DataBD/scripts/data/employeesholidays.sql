

BEGIN TRY

MERGE INTO [EmployeesHolidays] AS Target
USING (VALUES
  (N'EAD3EF00-9E90-41D1-9685-4C4F2F732D2E',4,N'Visit to the doctor 👨🏻‍⚕️',NULL,'2019-04-29T08:00:00','2019-04-29T11:00:00',0)
 ,(N'41891DDF-951A-463B-AB3B-71BC65ED9347',5,N'Writing course 📖',NULL,'2019-05-03T09:00:00','2019-05-03T16:00:00',0)
 ,(N'04A34E3A-BFC7-47F9-BE73-91E67504E804',0,N'Birthday 🎂🎈',NULL,'2019-05-05T00:00:00','2019-05-06T00:00:00',0)
 ,(N'0F0D983E-1B2A-4BD8-93DC-9AC890D39B4C',0,N'Boat trip ⚓',NULL,'2019-04-29T08:00:00','2019-04-29T18:00:00',1)
 ,(N'5C9BC485-1ED6-480D-8655-ACD773BCECE5',2,N'Concert 🎻',NULL,'2019-05-04T11:45:00','2019-05-04T17:15:00',1)
 ,(N'A6026EE0-1539-4EE4-B678-B17672ABD288',3,N'Trip to Rome 💑',NULL,'2019-05-01T00:00:00','2019-05-03T00:00:00',1)
 ,(N'82C475DD-EBA0-4C51-BC93-B3E7858E4C44',2,N'Day in Alicante 🚴🏻‍♀️',NULL,'2019-04-29T00:00:00','2019-04-30T00:00:00',0)
 ,(N'8F825400-FB00-47B1-B021-CDA3698A14E4',7,N'Dance performance 💃🏻',NULL,'2019-05-02T12:00:00','2019-05-02T16:00:00',0)
 ,(N'8D830D36-1032-4CEA-9157-DA8C67618199',6,N'Paradise trip 🌈',NULL,'2019-05-01T08:30:00','2019-05-01T16:30:00',0)
) AS Source ([IdHoliday],[IdEmployee],[Name],[Note],[StartDate],[EndDate],[Validated])
ON (Target.[IdHoliday] = Source.[IdHoliday])
WHEN MATCHED AND (
	NULLIF(Source.[IdEmployee], Target.[IdEmployee]) IS NOT NULL OR NULLIF(Target.[IdEmployee], Source.[IdEmployee]) IS NOT NULL OR 
	NULLIF(Source.[Name], Target.[Name]) IS NOT NULL OR NULLIF(Target.[Name], Source.[Name]) IS NOT NULL OR 
	NULLIF(Source.[Note], Target.[Note]) IS NOT NULL OR NULLIF(Target.[Note], Source.[Note]) IS NOT NULL OR 
	NULLIF(Source.[StartDate], Target.[StartDate]) IS NOT NULL OR NULLIF(Target.[StartDate], Source.[StartDate]) IS NOT NULL OR 
	NULLIF(Source.[EndDate], Target.[EndDate]) IS NOT NULL OR NULLIF(Target.[EndDate], Source.[EndDate]) IS NOT NULL OR 
	NULLIF(Source.[Validated], Target.[Validated]) IS NOT NULL OR NULLIF(Target.[Validated], Source.[Validated]) IS NOT NULL) THEN
 UPDATE SET
  [IdEmployee] = Source.[IdEmployee], 
  [Name] = Source.[Name], 
  [Note] = Source.[Note], 
  [StartDate] = Source.[StartDate], 
  [EndDate] = Source.[EndDate], 
  [Validated] = Source.[Validated]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([IdHoliday],[IdEmployee],[Name],[Note],[StartDate],[EndDate],[Validated])
 VALUES(Source.[IdHoliday],Source.[IdEmployee],Source.[Name],Source.[Note],Source.[StartDate],Source.[EndDate],Source.[Validated])
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





