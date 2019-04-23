/**
* Class for post and syncpost
* @class flexygo.ajax
*/
var flexygo;
(function (flexygo) {
    var ajax;
    (function (ajax) {
        /**
         * Method to call AJAX functions.
         * @method post
         * @param {string} url - The url of the service.
         * @param {string} method - POST or GET.
         * @param {string} params - Params sent to service.
         * @param {string} successFunction - Callback function to successfully state.
         * @param {string} errorFunction - Callback function to error state.
         * @param {string} completeFunction - function to run when ajax call has finished with or without error.
         * @param {string} beforeFunction - function to run before ajax call.
         */
        function post(url, method, params, successFunction, errorFunction, completeFunction, beforeFunction) {
            if (!successFunction) {
                successFunction = function (response) {
                    flexygo.msg.alert(response);
                };
            }
            if (!errorFunction) {
                errorFunction = function (error) {
                    flexygo.exceptions.httpShow(error);
                };
            }
            url = flexygo.utils.resolveUrl(url);
            if (beforeFunction) {
                beforeFunction();
            }
            $.ajax({
                type: 'POST',
                url: url + '/' + method,
                dataType: 'json',
                data: params ? JSON.stringify(params) : null,
                contentType: 'application/json; charset=utf-8',
                success: successFunction,
                error: errorFunction,
                complete: completeFunction,
            });
            var ev = {
                class: "post",
                type: "executed",
                sender: this,
                masterIdentity: method,
                detailIdentity: JSON.stringify(params)
            };
            flexygo.events.trigger(ev);
        }
        ajax.post = post;
        /**
         * Method to call AJAX sync functions.
         * @method syncPost
         * @param {string} url - The url of the service.
         * @param {string} method - POST or GET.
         * @param {string} params - Params sent to service.
         * @param {string} successFunction - Callback function to successfully state.
         * @param {string} errorFunction - Callback function to error state.
         * @param {string} completeFunction - function to run when ajax call has finished with or without error.
         * @param {string} beforeFunction - function to run before ajax call.
         */
        function syncPost(url, method, params, successFunction, errorFunction, completeFunction, beforeFunction) {
            if (!successFunction) {
                successFunction = function (response) { flexygo.msg.alert(response); };
            }
            if (!errorFunction) {
                errorFunction = function (error) { flexygo.exceptions.httpShow(error); };
            }
            url = flexygo.utils.resolveUrl(url);
            $.ajax({
                type: 'POST',
                url: url + '/' + method,
                dataType: 'json',
                async: false,
                data: params ? JSON.stringify(params) : null,
                contentType: 'application/json; charset=utf-8',
                success: successFunction,
                error: errorFunction,
                complete: completeFunction,
                beforeSend: beforeFunction
            });
        }
        ajax.syncPost = syncPost;
    })(ajax = flexygo.ajax || (flexygo.ajax = {}));
})(flexygo || (flexygo = {}));
//# sourceMappingURL=ajax.js.map