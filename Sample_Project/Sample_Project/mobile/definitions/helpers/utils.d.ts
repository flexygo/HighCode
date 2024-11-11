declare namespace flexygo.utils {
  /**
      * Generates an unique id
      * @method GUID
      * @return {string} unique name.
      */
  function GUID(): string;
  function blobToBase64(blob: any): Promise<unknown>;
  function b64toBlob(b64Data: any, contentType?: string, sliceSize?: number): Blob;
  function urlToB64(url: any): Promise<unknown>;
  function b64ToTempFile(title: any, base64: any): Promise<import("@capacitor/filesystem").WriteFileResult>;
  function blobToTempFile(title: string, blob: Blob): Promise<string>;
  function urlToBlob(url: any): Promise<unknown>;
  function parseJSON(json: string): any;
  function getFirstRow(objectName: any): Promise<any>;
  function getPrimaryKeysFilter(obj: ObjectConfig, row: any): string;
  function currentDate(): string;
  function currentDateTime(): string;
  function currentTime(): string;
  function translate(key: string, deviceLanguage?: boolean): string;
  /**
  * Evaluates JavaScript code and executes it.
  * @param {string} dynamicCode - Dynamic Code.
  * @method execDynamicCode
  * @return {any}
  */
  function execDynamicCode(dynamicCode: string): any;
  function execAsyncFunction(jsFunction: string, paramNames?: string[], paramValues?: any[]): Promise<any>;
  var colors: string[];
  function hexToRgbA(hex: any, opacity: any): string;
  function getB64MIME(b64: any): string;
  function getMIMEtype(fileName: any): any;
  function createNotification(options: any): void;
  function createNotificationWithEvent(options: any, callBack: any): void;
  function openFile(uri: string, fileMIME: string): void;
  function downloadByUrlNavigator(url: any, fileName: any): void;
  function downloadByUrlPhone(url: any, fileName: any): Promise<unknown>;
  function downloadByB64Phone(data: any, fileName: any): Promise<unknown>;
  function downloadByB64Navigator(b64: any, fileName: any): void;
  /**
    Opciones posibles:
    message: STRING, //No soportado por ciertas apps (Facebook, Instagram)
    subject: STRING, //Para aplicaciones de email
    files: Array,    //Un array ocon los ficheros a compartir, locales o remotos
    url: STRING,     //URL a compartir
    chooserTitle: STRING, //Título del pop up
    appPackageName: STRING, //Id de la app con la que compartir (Sólo para Android)
    iPadCoordinates: STRING //Coordenadas para el mensaje. Formateado con x,y,width,height. ej: '0,0,0,0' (sólo para IOS)
  */
  function share(options: any): Promise<void>;
  function getNextSevenDates(): String[];
  function getPing(timeout?: number): Promise<number>;
  function getTableFields(tableName: string): Promise<string[]>;
  function getTableFieldsConfig(tableName: string): Promise<fieldConfig[]>;
  function sendErrorsLogs(): Promise<void>;
  function getOSVersion(): string;
  function hasChangesPending(): Promise<boolean>;
  function isSimilar(text1: string, text2: string, isUrl?: boolean): boolean;
  function showLoading(message?: string): Promise<HTMLIonLoadingElement>;
  function splitArray(array: any[], split_size?: number): any[];
}