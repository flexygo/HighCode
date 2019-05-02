

BEGIN TRY

MERGE INTO [EmployeesHolidays] AS Target
USING (VALUES
  (N'04A34E3A-BFC7-47F9-BE73-91E67504E804',0,N'Birthday 🎂🎈',NULL,'2019-05-10T00:00:00','2019-05-11T00:00:00',0)
 ,(N'A6026EE0-1539-4EE4-B678-B17672ABD288',3,N'Trip to Rome 💑',NULL,'2019-05-08T00:00:00','2019-05-11T00:00:00',1)
 ,(N'82C475DD-EBA0-4C51-BC93-B3E7858E4C44',2,N'Day in Alicante 🚴🏻‍♀️',NULL,'2019-05-06T00:00:00','2019-05-07T00:00:00',0)
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





