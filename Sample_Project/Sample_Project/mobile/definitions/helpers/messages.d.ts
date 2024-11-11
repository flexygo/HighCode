declare namespace flexygo.msg {
    function showError(err: any, auditable?: boolean): Promise<void>;
    function danger(msg: string, moreInfo?: object): Promise<void>;
    function warning(msg: string, moreInfo?: object): Promise<void>;
    function success(msg: string, moreInfo?: object): Promise<void>;
    function generic(msg: string, type: string, duration: number, moreInfo?: object): Promise<void>;
    function confirm(header: string, message: string, cssClass?: string, showCancelButton?: boolean, afterAlertPresent?: Function): Promise<unknown>;
    function changePassword(cancellable: any): HTMLIonAlertElement;
    function prompt(header: string, message?: string, default_value?: string, showCancelButton?: boolean, afterAlertPresent?: Function): Promise<unknown>;
    function prompts(header: string, inputs: AlertInput[], showCancelButton?: boolean, afterAlertPresent?: Function): Promise<unknown>;
}
