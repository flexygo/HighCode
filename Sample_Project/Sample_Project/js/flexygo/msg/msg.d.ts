/**
* Library to launch notifications on screen.
*
* @class flexygo.msg
*/
declare namespace flexygo.msg {
    /**
    * Launch an alert dialog. Stops execution until user accepts the msg.
    * @method alert
    * @param {string} str - The message to show.
    */
    function alert(str: string, callback?: LobiBoxConfirmCallback): void;
    interface LobiBoxConfirmCallback {
        (result: boolean): void;
    }
    interface LobiBoxQuestionCallback {
        (result: "yes" | "no"): void;
    }
    /**
    * Launch confirm dialog. Stops execution until user accepts or cancel the dialog.
    * @method confirm
    * @param {string} msg - The message to show.
    * @param {LobiBoxConfirmCallback} callback - The callback function.
    */
    function confirm(msg: string, callback: LobiBoxConfirmCallback): void;
    /**
   * Launch question dialog. Stops execution until user accepts or cancel the dialog.
   * @method confirm
   * @param {string} title - The title to show.
   * @param {string} msg - The message to show.
   * @param {LobiBoxQuestionCallback} callback - The callback function.
   */
    function question(title: string, msg: string, callback: LobiBoxQuestionCallback): void;
    /**
    * Displays generic notification.
    * @method generic
    * @param {string} str - The message to show.
    * @param {JQuery} element - Related notification element. If null, displays generic notification.
    * @param {string} customTitle - Notification title.
    * @param {string} [position] - Dialog position.
    * @param {('error'|'info'|'success'|'warning')} type - Css styles type
    */
    function generic(str: string, element?: JQuery, customTitle?: string, position?: string, type?: string): void;
    /**
    * Displays error notification.
    * @method error
    * @param {string} str - The message to show.
    * @param {JQuery} element - Related notification element. If null, displays generic notification.
    * @param {string} customTitle - Notification title.
    * @param {string} [position] - Dialog position.
    */
    function error(str: string, element?: JQuery, customTitle?: string, position?: string): void;
    /**
    * Displays info notification.
    * @method info
    * @param {string} str - The message to show.
    * @param {JQuery} element - Related notification element. If null, displays generic notification.
    * @param {string} customTitle - Notification title.
    * @param {string} [position] - Dialog position.
    */
    function info(str: string, element?: JQuery, customTitle?: string, position?: string): void;
    /**
    * Displays success notification.
    * @method success
    * @param {string} str - The message to show.
    * @param {JQuery} element - Related notification element. If null, displays generic notification.
    * @param {string} customTitle - Notification title.
    * @param {string} [position] - Dialog position.
    */
    function success(str: string, element?: JQuery, customTitle?: string, position?: string): void;
    /**
    * Displays warning notification.
    * @method warning
    * @param {string} str - The message to show.
    * @param {JQuery} element - Related notification element. If null, displays generic notification.
    * @param {string} customTitle - Notification title.
    * @param {string} [position] - Dialog position.
    */
    function warning(str: string, element?: JQuery, customTitle?: string, position?: string): void;
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
    function prompt(title: string, msg: string, cllback: any, placeholder: string, value: string, lines?: number, type?: string): void;
}
