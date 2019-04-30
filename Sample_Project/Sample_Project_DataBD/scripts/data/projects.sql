

BEGIN TRY

MERGE INTO [Projects] AS Target
USING (VALUES
  (N'C79F0707-02EB-4D4E-8ECF-0A60914E4430',1,N'EPSA',N'~/Custom/Projects/EPSA.png')
 ,(N'391001A1-9893-478A-B19D-9F6F120F9640',1,N'Garrigues',N'~/Custom/Projects/Garrigues.png')
 ,(N'2A409EC1-43CF-4983-A915-AA6CA3E570C0',1,N'FlexyGO',N'~/Custom/Projects/Flexygo.png')
 ,(N'A4865DD2-5D2C-4FCB-82FC-CE221EF3ACC7',1,N'Resuinsa',N'~/Custom/Projects/Resuinsa.png')
 ,(N'68F62E5E-9E3F-4A1F-9F5B-E7C07424C5EE',1,N'Freshtrategy',N'~/Custom/Projects/Freshtrategy.png')
) AS Source ([IdProject],[IdTeam],[Name],[Logo])
ON (Target.[IdProject] = Source.[IdProject])
WHEN MATCHED AND (
	NULLIF(Source.[IdTeam], Target.[IdTeam]) IS NOT NULL OR NULLIF(Target.[IdTeam], Source.[IdTeam]) IS NOT NULL OR 
	NULLIF(Source.[Name], Target.[Name]) IS NOT NULL OR NULLIF(Target.[Name], Source.[Name]) IS NOT NULL OR 
	NULLIF(Source.[Logo], Target.[Logo]) IS NOT NULL OR NULLIF(Target.[Logo], Source.[Logo]) IS NOT NULL) THEN
 UPDATE SET
  [IdTeam] = Source.[IdTeam], 
  [Name] = Source.[Name], 
  [Logo] = Source.[Logo]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([IdProject],[IdTeam],[Name],[Logo])
 VALUES(Source.[IdProject],Source.[IdTeam],Source.[Name],Source.[Logo])
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





