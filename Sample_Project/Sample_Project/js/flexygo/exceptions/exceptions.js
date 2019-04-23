/**
* Library to manage system exceptions.
*
* @class flexygo.exceptions
*/
var flexygo;
(function (flexygo) {
    var exceptions;
    (function (exceptions) {
        /**
        * Launches a notification with catched exception info.
        * @method httpShow
        * @param {string} httpExc - Object with de catched exception.
        * @return {JQuery} [element] - Related element dialog.
        */
        function httpShow(httpExc, element) {
            var msg;
            var tit;
            lastError = null;
            let msgtype;
            if (httpExc.responseJSON) {
                lastError = httpExc.responseJSON;
                msg = httpExc.responseJSON.message;
                if (!element && (httpExc.responseJSON.stackTrace != '' || httpExc.responseJSON.innermessage != '')) {
                    msg = '<span onclick="flexygo.exceptions.showFullError();" >' + msg + '<br/><u>More info</u></span>';
                }
                tit = httpExc.responseJSON.title;
                msgtype = httpExc.responseJSON.msgtype;
            }
            if (!msg) {
                msg = httpExc.responseText;
            }
            if (typeof msgtype == 'undefined') {
                Lobibox.window({
                    title: "Critical Error",
                    content: msg
                });
            }
            switch (msgtype) {
                case 1:
                    flexygo.msg.warning(msg, element, tit, 'center top');
                    break;
                case 2:
                    flexygo.msg.info(msg, element, tit, 'right top');
                    break;
                default:
                    flexygo.msg.error(msg, element, tit);
                    break;
            }
        }
        exceptions.httpShow = httpShow;
        /**
        * Open a dialog with full exception info.
        * @method showFullError
        */
        function showFullError() {
            Lobibox.window({
                title: lastError.title,
                content: '<b>Description:</b><br/>' + lastError.title + '<br/>' + lastError.message + '<br/><br/><b>Inner exception:</b><br/><code>' + lastError.innermessage + '</code><br/><br/><b>Stack Trace:</b><br/><code>' + lastError.stackTrace + '</code>'
            });
        }
        exceptions.showFullError = showFullError;
    })(exceptions = flexygo.exceptions || (flexygo.exceptions = {}));
})(flexygo || (flexygo = {}));
//# sourceMappingURL=exceptions.js.map