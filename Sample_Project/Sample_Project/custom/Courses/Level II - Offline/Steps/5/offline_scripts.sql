

BEGIN TRY

MERGE INTO [Offline_Scripts] AS Target
USING (VALUES
  (N'LearningApp',N'Tareas',N'
/**
* @namespace LearningApp
*/
var LearningApp=LearningApp || {};

/**
* @class LearningApp.Tareas
*/
LearningApp.Tareas = LearningApp.Tareas || {};

/**
* Says hello world And returns the sum of two parameters.
* @method myFunction
* @param {number} param1 - The first param for the sum.
* @param {number} param2 - The second param for the sum.
* @return {number} - The sum of two params.
*/
LearningApp.Tareas.Finalizar = async function (IdTarea,e){
  var  count = await  flexygo.sql.getCount(''actions'', ''signature is null and actionid=?'',[IdTarea]) ;
  if(count==0){ 
    flexygo.sql.execSQL(''update actions set actionstate=3, _isupdated=1 where actionid=?'', [IdTarea]).then(() => {
    e.closest(''flx-view'')[0].refresh();    
  }).catch((err) => {
    flexygo.msg.showError(err);
  });    
  }else{
      flexygo.msg.showError("Debe firmar antes la tarea");
  }  
};

LearningApp.Tareas.FinalizarSinComprobar = function (IdTarea, e){
  return flexygo.sql.execSQL(''update actions set actionstate=3, _isupdated=1 where actionid=?'', [IdTarea]).then(() => {
    e.closest(''flx-view'')[0].refresh();    
  }).catch((err) => {
    flexygo.msg.showError(err);
  });
};

LearningApp.Tareas.FinalizarYLocalizar = async function (IdTarea, e){ 
  var latlong="";
  var location = await flexygo.gps.getCoords(1000,10);
  latlong = latlong.concat(location.coords.latitude, ",", location.coords.longitude);
  return flexygo.sql.execSQL(''update actions set actionstate=3, location=?, _isupdated=1 where actionid=?'', [latlong,IdTarea]).then(() => {
    e.closest(''flx-view'')[0].refresh();    
  }).catch((err) => {
    flexygo.msg.showError(err);
  });
};

',1,0,'2020-07-22T00:00:00',2)
) AS Source ([AppName],[Name],[JSScript],[Enabled],[Order],[LastChange],[OriginId])
ON (Target.[AppName] = Source.[AppName] AND Target.[Name] = Source.[Name])
WHEN MATCHED AND (
	NULLIF(Source.[JSScript], Target.[JSScript]) IS NOT NULL OR NULLIF(Target.[JSScript], Source.[JSScript]) IS NOT NULL OR 
	NULLIF(Source.[Enabled], Target.[Enabled]) IS NOT NULL OR NULLIF(Target.[Enabled], Source.[Enabled]) IS NOT NULL OR 
	NULLIF(Source.[Order], Target.[Order]) IS NOT NULL OR NULLIF(Target.[Order], Source.[Order]) IS NOT NULL OR 
	NULLIF(Source.[LastChange], Target.[LastChange]) IS NOT NULL OR NULLIF(Target.[LastChange], Source.[LastChange]) IS NOT NULL OR 
	NULLIF(Source.[OriginId], Target.[OriginId]) IS NOT NULL OR NULLIF(Target.[OriginId], Source.[OriginId]) IS NOT NULL) THEN
 UPDATE SET
  [JSScript] = Source.[JSScript], 
  [Enabled] = Source.[Enabled], 
  [Order] = Source.[Order], 
  [LastChange] = Source.[LastChange], 
  [OriginId] = Source.[OriginId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([AppName],[Name],[JSScript],[Enabled],[Order],[LastChange],[OriginId])
 VALUES(Source.[AppName],Source.[Name],Source.[JSScript],Source.[Enabled],Source.[Order],Source.[LastChange],Source.[OriginId])
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





