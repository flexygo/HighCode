/**
* Library to manage system exceptions.
*
* @class flexygo.exceptions
*/
declare namespace flexygo.exceptions {
    /**
    * Launches a notification with catched exception info.
    * @method httpShow
    * @param {string} httpExc - Object with de catched exception.
    * @return {JQuery} [element] - Related element dialog.
    */
    function httpShow(httpExc: any, element?: JQuery): void;
    /**
    * Open a dialog with full exception info.
    * @method showFullError
    */
    function showFullError(): void;
}
