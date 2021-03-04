/**
 * @namespace flexygo
 */
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
        run(processparams, cllback, targetid, excludeHist = true, triggerElement) {
            var params = {
                "ProcessName": this.processName,
                "ObjectName": this.objectName,
                "ObjectWhere": this.objectWhere,
                "ProcessParams": processparams,
            };
            if (!cllback) {
                cllback = (response) => {
                    if (response) {
                        if (response.Refresh) {
                            if (triggerElement) {
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
                        }
                        if (response.JSCode) {
                            var func = new Function('processname', 'objectname', 'objectwhere', 'targetid', 'excludeHist', 'triggerElement', response.JSCode);
                            let el = this;
                            if (triggerElement && triggerElement[0]) {
                                el = triggerElement[0];
                            }
                            func.call(triggerElement[0], this.processName, this.objectName, this.objectWhere, targetid, excludeHist, triggerElement);
                        }
                        if (response.LastException && response.LastException.Message) {
                            flexygo.msg.error(response.LastException.Message);
                        }
                        else if (response.WarningMessage) {
                            flexygo.msg.warning(response.WarningMessage);
                        }
                        else if (response.SuccessMessage) {
                            flexygo.msg.success(response.SuccessMessage);
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
                };
            }
            flexygo.ajax.post('~/api/Process', 'execProcessByName', params, cllback, null, () => { this.closeLoading(); }, () => { this.showLoading(); });
        }
        /**
        * Show loading funcion before executing process
        * @method showLoading
        */
        showLoading() {
            var includedTypes = [0, 1, 5, 6];
            if (this.showProgress && this.config && includedTypes.includes(this.config.TypeId)) {
                this.progressBar = Lobibox.progress({
                    title: flexygo.localization.translate('process.executing'),
                    closeOnEsc: false,
                    closeButton: false,
                    onShow: () => { this.progressTimer = setInterval(() => this.moveLoading(), 500); }
                });
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
        closeLoading() {
            if (this.progressBar) {
                clearInterval(this.progressTimer);
                this.progressTimer = null;
                this.progressBar.destroy();
                this.progressBar = null;
            }
        }
    }
    flexygo.Process = Process;
})(flexygo || (flexygo = {}));
//# sourceMappingURL=Process.js.map