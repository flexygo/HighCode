/**
* Library to launch notifications on screen.
*
* @class flexygo.msg
*/
var flexygo;
(function (flexygo) {
    var msg;
    (function (msg_1) {
        /**
        * Launch an alert dialog. Stops execution until user accepts the msg.
        * @method alert
        * @param {string} str - The message to show.
        */
        function alert(str, callback = null) {
            Lobibox.alert("info", {
                msg: flexygo.localization.translate(str),
                iconSource: 'fontAwesome',
                sound: (!flexygo.utils.testMode),
                soundPath: flexygo.utils.resolveUrl('~/js/plugins/lobibox-master/sounds/'),
                callback: callback
            });
        }
        msg_1.alert = alert;
        /**
        * Launch confirm dialog. Stops execution until user accepts or cancel the dialog.
        * @method confirm
        * @param {string} msg - The message to show.
        * @param {LobiBoxConfirmCallback} callback - The callback function.
        */
        function confirm(msg, callback) {
            Lobibox.confirm({
                title: flexygo.localization.translate('msg.confirm'),
                msg: flexygo.localization.translate(msg),
                iconClass: 'fa fa-question-circle',
                buttons: {
                    yes: {
                        'class': 'lobibox-btn lobibox-btn-yes',
                        text: flexygo.localization.translate('flxedit.areyousuremsgyes'),
                        closeOnClick: true
                    },
                    no: {
                        'class': 'lobibox-btn lobibox-btn-no',
                        text: flexygo.localization.translate('flxedit.areyousuremsgno'),
                        closeOnClick: true
                    }
                },
                callback: (dlg, type, ev) => {
                    if (type == "yes") {
                        callback(true);
                    }
                    else {
                        callback(false);
                    }
                }
            });
        }
        msg_1.confirm = confirm;
        /**
       * Launch question dialog. Stops execution until user accepts or cancel the dialog.
       * @method confirm
       * @param {string} title - The title to show.
       * @param {string} msg - The message to show.
       * @param {LobiBoxQuestionCallback} callback - The callback function.
       */
        function question(title, msg, callback) {
            Lobibox.confirm({
                title: title,
                msg: msg,
                iconClass: 'fa fa-question-circle',
                buttons: {
                    yes: {
                        'class': 'lobibox-btn lobibox-btn-yes',
                        text: 'Yes',
                        closeOnClick: true
                    },
                    no: {
                        'class': 'lobibox-btn lobibox-btn-no',
                        text: 'No',
                        closeOnClick: true
                    }
                },
                callback: (dlg, type, ev) => {
                    if (type == "yes") {
                        callback("yes");
                    }
                    else {
                        callback("no");
                    }
                }
            });
        }
        msg_1.question = question;
        /**
        * Displays generic notification.
        * @method generic
        * @param {string} str - The message to show.
        * @param {JQuery} element - Related notification element. If null, displays generic notification.
        * @param {string} customTitle - Notification title.
        * @param {string} [position] - Dialog position.
        * @param {('error'|'info'|'success'|'warning')} type - Css styles type
        */
        function generic(str, element, customTitle, position, type) {
            str = flexygo.localization.translate(str);
            customTitle = flexygo.localization.translate(customTitle);
            if (element) {
                if (!position) {
                    position = "right middle";
                }
                $(element).notify(str, { className: type, position: position, clickToHide: true, autoHide: false });
            }
            else {
                if (!position) {
                    position = "bottom right";
                }
                Lobibox.notify(type, { msg: str, iconSource: 'fontAwesome', title: customTitle, position: position, sound: (!flexygo.utils.testMode), soundPath: flexygo.utils.resolveUrl('~/js/plugins/lobibox-master/sounds/') });
            }
        }
        msg_1.generic = generic;
        /**
        * Displays error notification.
        * @method error
        * @param {string} str - The message to show.
        * @param {JQuery} element - Related notification element. If null, displays generic notification.
        * @param {string} customTitle - Notification title.
        * @param {string} [position] - Dialog position.
        */
        function error(str, element, customTitle, position) {
            flexygo.msg.generic(str, element, customTitle, position, 'error');
        }
        msg_1.error = error;
        /**
        * Displays info notification.
        * @method info
        * @param {string} str - The message to show.
        * @param {JQuery} element - Related notification element. If null, displays generic notification.
        * @param {string} customTitle - Notification title.
        * @param {string} [position] - Dialog position.
        */
        function info(str, element, customTitle, position) {
            flexygo.msg.generic(str, element, customTitle, position, 'info');
        }
        msg_1.info = info;
        /**
        * Displays success notification.
        * @method success
        * @param {string} str - The message to show.
        * @param {JQuery} element - Related notification element. If null, displays generic notification.
        * @param {string} customTitle - Notification title.
        * @param {string} [position] - Dialog position.
        */
        function success(str, element, customTitle, position) {
            flexygo.msg.generic(str, element, customTitle, position, 'success');
        }
        msg_1.success = success;
        /**
        * Displays warning notification.
        * @method warning
        * @param {string} str - The message to show.
        * @param {JQuery} element - Related notification element. If null, displays generic notification.
        * @param {string} customTitle - Notification title.
        * @param {string} [position] - Dialog position.
        */
        function warning(str, element, customTitle, position) {
            flexygo.msg.generic(str, element, customTitle, position, 'warning');
        }
        msg_1.warning = warning;
        /**
        * Launch prompt dialog. Don't block process execution.
        * @method prompt
        * @param {string} title - Dialog title
        * @param {string} msg - The message to show.
        * @param {string} cllback - Callback function after dialog execution (only if Ok button clicked). Recives one string parameter with user input.
        * @param {string} [placeholder] - Input field placeholder text.
        * @param {string} [lines=1] - number of lines for multiline items.
        * @param {('error'|'info'|'success'|'warning')} [type=text] - Css styles type
        */
        function prompt(title, msg, cllback, placeholder, value, lines = 1, type = "text") {
            if (title) {
                title = flexygo.localization.translate(title);
            }
            if (placeholder) {
                placeholder = flexygo.localization.translate(placeholder);
            }
            if (msg) {
                msg = flexygo.localization.translate(msg);
            }
            var multiline = false;
            if (lines && lines > 1) {
                multiline = true;
            }
            else {
                lines = 1;
            }
            Lobibox.prompt(type, //Any input type will be valid
            {
                title: title,
                attrs: {
                    placeholder: placeholder
                },
                value: value,
                multiline: multiline,
                lines: lines,
                type: type,
                label: msg,
                required: false,
                errorMessage: flexygo.localization.translate(flexygo.localization.translate('msg.fieldrequired')),
                callback: function (lobibox, type) {
                    if (type === 'ok') {
                        cllback(lobibox.getValue());
                    }
                }
            });
        }
        msg_1.prompt = prompt;
    })(msg = flexygo.msg || (flexygo.msg = {}));
})(flexygo || (flexygo = {}));
//# sourceMappingURL=msg.js.map