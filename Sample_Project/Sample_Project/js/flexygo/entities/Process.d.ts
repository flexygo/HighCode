/**
 * @namespace flexygo
 */
declare namespace flexygo {
    class Process {
        /**
        * Library to run object processes from JS
        *
        * @constructor
        * @param {string} processName - The process name
        * @param {string} objectName - The object name.
        * @param {string} objectWhere - Where condition.
        * @return {object} - Process object.
        */
        constructor(processName: string, objectName?: string, objectWhere?: string);
        objectName: string;
        objectWhere: string;
        processName: string;
        progressBar: any;
        progressTimer: any;
        module: flexygo.ui.wc.FlxModuleElement;
        config: flexygo.api.process.ProcessConfig;
        showProgress: boolean;
        /**
            * Read process info and sets it into config property.
            * @method read
            * @return {bool} - Exit or fail.
            */
        read(): boolean;
        /**
        * Execute the process.
        * @method run
        * @param {string} processparams - Values to invoke the process.
        * @param {function} [cllback] - function invoked after process executed. If null, success or error message.
        * @param {string} [targetid] - the target Id. For navigation objects.
        * @param {string} [excludeHist] - Exclude history regs. For navigation process.
        * @param {object} [triggerElement] - The item that launches de process (Usually the button).
        */
        run(processparams: string | {
            Key: string;
            Value: any;
        }[], cllback?: any, targetid?: string, excludeHist?: boolean, triggerElement?: JQuery): void;
        /**
        * Show loading funcion before executing process
        * @method showLoading
        */
        showLoading(): void;
        /**
        * Move loading funcion during process execution
        * @method moveLoading
        */
        moveLoading(): void;
        /**
        * Close loading funcion after executing process
        * @method showLoading
        */
        closeLoading(): void;
    }
}
