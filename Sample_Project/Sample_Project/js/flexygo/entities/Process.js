/**
 * @namespace flexygo
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var flexygo;
(function (flexygo) {
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
        constructor(processName, objectName, objectWhere) {
            this.objectName = null;
            this.objectWhere = null;
            this.processName = null;
            this.module = null;
            this.config = null;
            this.showProgress = true;
            this.moreProcesses = false;
            this.processName = processName;
            this.objectName = objectName;
            this.objectWhere = objectWhere;
        }
        ;
        /**
            * Read process info and sets it into config property.
            * @method read
            * @return {bool} - Exit or fail.
            */
        read() {
            let ret = false;
            let params = {
                ProcessName: this.processName
            };
            flexygo.ajax.syncPost('~/api/Process', 'getProcessInfoByName', params, (response) => {
                this.config = response;
                ret = true;
            });
            return ret;
        }
        /**
        * Execute the process.
        * @method run
        * @param {string} processparams - Values to invoke the process.
        * @param {function} [cllback] - function invoked after process executed. If null, success or error message.
        * @param {string} [targetid] - the target Id. For navigation objects.
        * @param {string} [excludeHist] - Exclude history regs. For navigation process.
        * @param {object} [triggerElement] - The item that launches de process (Usually the button).
        */
        run(processparams, cllback, targetid, excludeHist = true, triggerElement, lastProcessName, errorCallback, eventData) {
            var params = {
                "ProcessName": this.processName,
                "ObjectName": this.objectName,
                "ObjectWhere": this.objectWhere,
                "ProcessParams": processparams,
                "LastProcessName": lastProcessName
            };
            if (!cllback) {
                cllback = (response) => __awaiter(this, void 0, void 0, function* () {
                    if (response) {
                        this.moreProcesses = response.MoreProcesses;
                        if (response.Refresh && triggerElement) {
                            let cnt = triggerElement.closest('.pageContainer');
                            let parent = cnt.data('opener');
                            let modCol = null;
                            if (parent) {
                                modCol = parent;
                            }
                            else {
                                modCol = cnt;
                            }
                            modCol.find('flx-module').each((i, e) => {
                                let mod = $(e);
                                let wc = mod[0];
                                if (wc.refresh) {
                                    wc.refresh();
                                }
                            });
                        }
                        let res = true;
                        if (response.JSCode) {
                            let el = this;
                            if (triggerElement && triggerElement[0]) {
                                el = triggerElement[0];
                            }
                            let objTrick = Object; //This is declared only to avoid outdated ts errors
                            let funcParams = { processname: this.processName, objectname: this.objectName, objectwhere: this.objectWhere, targetid: targetid, excludeHist: excludeHist, triggerElement: triggerElement, currentProcess: this, eventData: eventData };
                            res = yield flexygo.utils.execAsyncFunction(response.JSCode, objTrick.keys(funcParams), objTrick.values(funcParams)).catch((err) => {
                                flexygo.msg.error(flexygo.utils.getErrorMessage(err));
                                throw err;
                            });
                        }
                        if (response.LastProcessName && res !== false) {
                            this.run(processparams, cllback, targetid, excludeHist, triggerElement, response.LastProcessName);
                        }
                        else {
                            this.closeLoading(true, this.showProgress);
                        }
                        if (!response.MoreProcesses) {
                            if (response.LastException && response.LastException.Message) {
                                flexygo.msg.error(response.LastException.Message);
                            }
                            else if (response.WarningMessage) {
                                flexygo.msg.warning(response.WarningMessage);
                            }
                            else if (response.SuccessMessage) {
                                flexygo.msg.success(response.SuccessMessage);
                            }
                            this.closeLoading(true, this.showProgress);
                        }
                        if (response.CloseParamWindow && response.Success && this.module) {
                            this.module.closeWindow();
                        }
                        if (response.ClearSelectionBag && response.Success) {
                            let ent = new flexygo.obj.Entity(this.objectName);
                            flexygo.selection.clear(ent.getConfig().ObjectName);
                        }
                        let ev = {
                            class: "process",
                            type: "executed",
                            sender: this,
                            masterIdentity: this.processName
                        };
                        flexygo.events.trigger(ev);
                    }
                });
            }
            flexygo.ajax.post('~/api/Process', 'execProcessByName', params, cllback, errorCallback, () => { this.closeLoading(true, this.showProgress); }, () => { this.showLoading(); });
        }
        /**
        * Show loading funcion before executing process
        * @method showLoading
        */
        showLoading() {
            var includedTypes = [0, 1, 5, 6];
            var title;
            if (this.config && this.config.LoadingMessage) {
                title = this.config.LoadingMessage;
            }
            else {
                title = flexygo.localization.translate('process.executing');
            }
            if (this.showProgress && this.config && includedTypes.includes(this.config.TypeId)) {
                flexygo.utils.showLoading(null, title);
            }
        }
        /**
        * Move loading funcion during process execution
        * @method moveLoading
        */
        moveLoading() {
            if (this.progressBar) {
                let actVal = this.progressBar.getProgress();
                actVal = ((actVal + 1 >= 100) ? 0 : actVal + 1);
                this.progressBar.setProgress(actVal);
            }
        }
        /**
        * Close loading funcion after executing process
        * @method showLoading
        */
        closeLoading(lastProcess = false, showProgress = true) {
            if (lastProcess && showProgress) {
                flexygo.utils.removeLoadingEffect();
            }
        }
    }
    flexygo.Process = Process;
})(flexygo || (flexygo = {}));
//# sourceMappingURL=Process.js.map