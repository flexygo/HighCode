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
                tit = httpExc.responseJSON.title;
                if (!element && (httpExc.responseJSON.stackTrace != '' || httpExc.responseJSON.innermessage != '' || httpExc.responseJSON.message != '')) {
                    msg = '<span onclick="flexygo.exceptions.showFullError();" >' + msg + '<br/><u>More info</u></span>';
                    tit = '<span onclick="flexygo.exceptions.showFullError();" >' + tit + '</span>';
                }
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
            let content = '';
            if (lastError.title) {
                content += '<b>Description:</b><br/>' + lastError.title;
            }
            if (lastError.message) {
                content += '<br/>' + lastError.message;
            }
            if (lastError.innermessage) {
                content += '<br/><br/><b>More info:</b><br/>' + lastError.innermessage;
            }
            if (lastError.stackTrace) {
                content += '<br/><br/><b>Stack Trace:</b><br/><code>' + lastError.stackTrace + '</code>';
            }
            Lobibox.window({
                title: lastError.title,
                content: content
            });
        }
        exceptions.showFullError = showFullError;
    })(exceptions = flexygo.exceptions || (flexygo.exceptions = {}));
})(flexygo || (flexygo = {}));
//# sourceMappingURL=exceptions.js.map