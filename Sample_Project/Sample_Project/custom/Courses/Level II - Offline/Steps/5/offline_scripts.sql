

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
* Finaliza una tarea.
* @method Finalizar
* @param {number} IdTarea - Identificador de tarea/acción.
* @param {number} e - El elemento html.
* @return {bit} - true or false.
*/

LearningApp.Tareas.Finalizar = function (IdTarea, e){
  return flexygo.sql.execSQL(''update actions set actionstate=3, _isupdated=1 where actionid=?'', [IdTarea]).then(() => {
    e.closest(''flx-view'')[0].refresh();    
  }).catch((err) => {
    flexygo.msg.showError(err);
  });
};

/**
* Finaliza una tarea, comprobando que si es una venta, ésta esté firmada.
* @method FinalizarYComprobar
* @param {number} IdTarea - Identificador de tarea/acción.
* @param {number} e - El elemento html.
* @return {bit} - true or false.
*/
LearningApp.Tareas.FinalizarYComprobar = async function (IdTarea,e){
  debugger; 
  var  count = await  flexygo.sql.getCount(''actions'', ''actionType=? AND signature is null and actionid=?'',[''SALE'',IdTarea]) ;
  if(count==0){ 
    flexygo.sql.execSQL(''update actions set actionstate=3, _isupdated=1 where actionid=?'', [IdTarea]).then(() => {
    e.closest(''flx-view'')[0].refresh();    
  }).catch((err) => {
    flexygo.msg.showError(err);
  });    
  }else{
      flexygo.msg.showError("Debe firmar antes la tarea.");
  }  
};

/**
* Finaliza una tarea, guardando la localización.
* @method FinalizarYComprobar
* @param {number} IdTarea - Identificador de tarea/acción.
* @param {number} e - El elemento html.
* @return {bit} - true or false.
*/
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

/**
* Elimina una tarea.
* @method BorrarTarea
* @IdTarea {number} param1 - Número de tarea
* @e {object} param2 - Elemento
*/
LearningApp.Tareas.BorrarTarea = async function (IdTarea, e){ 
  return flexygo.msg.confirm("Atención","¿Confirma que desea borrar la tarea?").then(async()=>{
    var sql = "delete from Actions where ActionId=?";
    var sqlU = "update Actions set _isdeleted=1 where ActionId=?";    
    var count = await flexygo.sql.getCount(''Actions'', ''actionState>2 AND ActionId=?'',[IdTarea]);  
    if (count==0) {
      var isnew = await flexygo.sql.getValue(''select _isinserted from Actions where ActionId=?'', [IdTarea]);
      if(isnew!==1){sql=sqlU;} 
      flexygo.sql.execSQL(sql,[IdTarea]).then(() => {      
        flexygo.msg.success("La tarea se ha borrado con éxito");
        flexygo.nav.goList(''Offline_Accion'',null,null);
      }).catch((err) => {
        flexygo.msg.showError(err);
      });
    } 
    else {
      flexygo.msg.warning("El estado de la tarea impide borrarla.");
    }
  });  
};',1,0,'2020-07-24T00:00:00',2)
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





