

BEGIN TRY

MERGE INTO [Offline_Styles] AS Target
USING (VALUES
  (N'LearningApp',N'MyCSSGeneric',N':root {
    --ion-color-header: #323f4b;
    --ion-color-outstanding-light: #323f4b;
    --ion-color-outstanding-light-shade: #edd5b4;
    --ion-color-outstanding-light-hover: #f87d7c;
    --ion-color-outstanding-light-hover-shade: #f3c69d;
    --ion-color-outstanding: #edd5b4;
    --ion-color-outstanding-rgb: 248, 125, 124;
    --ion-color-outstanding-shade: #57529291;
    --ion-color-outstanding-tint: #f87d7c;  
    --ion-color-outstanding-contrast: #ffffff;
    --ion-color-outstanding-contrast-rgb: 255,255,255;

  --ion-color-primary: #3d94fe;
  --ion-color-primary-rgb: 61,148,254;

 }


flx-home #mainBody{background-image: url("{{portada_learningapp.jpg|file}}"); height:100%;background-size:cover;background-position:center; }

.square .content {
  opacity: 90%;
  padding: 10px;
  color: black;
  background-color: bisque;
}

.square .content i {
    color: var(--ion-color-outstanding-light-contrast);
    background-color: #323f4b;
    border-radius: 50%;
    display: inline-block;
    font-size: 50px;
    line-height: 75px;
    width: 75px;
    height: 75px;
}


.square .content:hover {
    background-color: var(--ion-color-outstanding-light);
    color:var(--ion-color-outstanding-contrast);
}

.square .content:hover i {
    color:var(--ion-color-outstanding-light);
}
p a { text-decoration: none;}
p a {color:inherit;}
',1,0,'2020-07-22T00:00:00',2)
) AS Source ([AppName],[Name],[CSSCode],[Enabled],[Order],[LastChange],[OriginId])
ON (Target.[AppName] = Source.[AppName] AND Target.[Name] = Source.[Name])
WHEN MATCHED AND (
	NULLIF(Source.[CSSCode], Target.[CSSCode]) IS NOT NULL OR NULLIF(Target.[CSSCode], Source.[CSSCode]) IS NOT NULL OR 
	NULLIF(Source.[Enabled], Target.[Enabled]) IS NOT NULL OR NULLIF(Target.[Enabled], Source.[Enabled]) IS NOT NULL OR 
	NULLIF(Source.[Order], Target.[Order]) IS NOT NULL OR NULLIF(Target.[Order], Source.[Order]) IS NOT NULL OR 
	NULLIF(Source.[LastChange], Target.[LastChange]) IS NOT NULL OR NULLIF(Target.[LastChange], Source.[LastChange]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [CSSCode] = Source.[CSSCode], 
  [Enabled] = Source.[Enabled], 
  [Order] = Source.[Order], 
  [LastChange] = Source.[LastChange], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([AppName],[Name],[CSSCode],[Enabled],[Order],[LastChange],[OriginId])
 VALUES(Source.[AppName],Source.[Name],Source.[CSSCode],Source.[Enabled],Source.[Order],Source.[LastChange],Source.[OriginId])
WHEN NOT MATCHED BY SOURCE AND TARGET.OriginId = 2 THEN 
 DELETE
;
END TRY
BEGIN CATCH
    DECLARE @ERRORNUMBER	INT,@ERRORMSG		VARCHAR(MAX),@ERRORSTATE		INT
    SELECT @ERRORNUMBER = 50000 + ERROR_NUMBER(),@ERRORMSG = ERROR_MESSAGE(), @ERRORSTATE = ERROR_STATE();
    THROW @ERRORNUMBER, @ERRORMSG, @ERRORSTATE
END CATCH
GO





