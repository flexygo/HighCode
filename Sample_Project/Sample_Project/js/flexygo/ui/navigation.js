var flexygo;
(function (flexygo) {
    var nav;
    (function (nav) {
        class FilterHistoryValue {
        }
        nav.FilterHistoryValue = FilterHistoryValue;
        class ModuleFilterHistory {
        }
        nav.ModuleFilterHistory = ModuleFilterHistory;
        class PresetHistoryValue {
        }
        nav.PresetHistoryValue = PresetHistoryValue;
        class ModulePresetHistory {
        }
        nav.ModulePresetHistory = ModulePresetHistory;
        class FlexygoHistory {
        }
        nav.FlexygoHistory = FlexygoHistory;
        /**
         * Opens the default object page
         * @method openPage
         * @param {string} pagetypeid - Type of the page
         * @param {string} objectname - Name of the collection or entity
         * @param {string} objectwhere - Where of the collection or entity
         * @param {string} defaults - Defaults to be added to the page
         * @param {string} targetid - Target to open the window
         * @param {boolean} excludeHist - True to not store in history
         * @param {JQuery} triggerElement - Relative element to open the page
         * @param {boolean} isClone -
         * @param {flexygo.nav.FlexygoHistory} previousHist - Previous page history
        */
        function openPage(pagetypeid, objectname, objectwhere, defaults, targetid, excludeHist, triggerElement, isClone, previousHist, presets) {
            if (typeof event != 'undefined') {
                event.preventDefault();
            }
            if (flexygo.utils.isTactilModeActive()) {
                flexygo.utils.scrollTo(0);
            }
            let isModal = targetid.indexOf('modal') === 0;
            let isSlide = targetid.indexOf('slide') === 0;
            if ((flexygo.utils.isSizeMobile() && (!isModal && !isSlide)) || (flexygo.utils.isSizeSmartphone() && isSlide)) {
                targetid = "current";
            }
            else if (flexygo.utils.isSizeMobile() && isModal) {
                targetid = "modal";
            }
            if (typeof defaults == 'object') {
                defaults = JSON.stringify(defaults);
            }
            if (!isClone) {
                isClone = false;
            }
            if (triggerElement) {
                triggerElement = getRealTarget(triggerElement);
            }
            if (targetid == 'opener') {
                targetid = getCurrentOpener(triggerElement);
            }
            var histObj = {
                targetid: targetid,
                navigateFun: 'openpage',
                objectname: objectname,
                objectwhere: objectwhere,
                defaults: defaults,
                pagetypeid: pagetypeid,
                filtersValues: (previousHist && previousHist.filtersValues) ? previousHist.filtersValues : null,
                presetsValues: (previousHist && previousHist.presetsValues) ? previousHist.presetsValues : null,
                userid: flexygo.context.currentUserId
            };
            if (targetid && targetid.indexOf('new') == 0) {
                flexygo.targets.openNewWindow(histObj, targetid);
            }
            else {
                if (objectwhere == 'NOWHERE') {
                    flexygo.msg.error("Can't find object where.");
                    return;
                }
                let ev = {
                    class: "page",
                    type: "loading",
                    sender: histObj,
                    masterIdentity: objectname,
                    detailIdentity: objectwhere
                };
                flexygo.events.trigger(ev);
                objectwhere ? objectwhere = objectwhere.replaceAll("&quot;", "\"") : null;
                flexygo.ajax.post('~/api/Page', 'GetPageByObject', { "StrType": pagetypeid, "ObjectName": objectname, "ObjectWhere": objectwhere, "IsClone": isClone }, (ret) => {
                    histObj.pagename = ret.PageName;
                    var pageContainer = flexygo.targets.createContainer(histObj, excludeHist, triggerElement);
                    if (!pageContainer) {
                        NProgress.done();
                        return;
                    }
                    var editObj = flexygo.history.get(pageContainer);
                    if (editObj.targetid.indexOf('main') == 0 || (editObj.targetid.indexOf('current') == 0 && pageContainer.is('#realMain'))) {
                        editObj.pagename = ret.PageName;
                        flexygo.history.replace(editObj, pageContainer);
                    }
                    ret.pageHistory = histObj;
                    openPageReturn(ret, objectname, objectwhere, defaults, pageContainer, null, null, isClone, null, presets);
                    if (!excludeHist) {
                        if (pagetypeid != 'edit' || (objectwhere && objectwhere != '')) {
                            flexygo.history.historyLog.add(ret.IconCssClass, ret.Descrip, ret.pageHistory);
                        }
                    }
                    if (pageContainer.is('#realMain') && ret.PageWindowDescrip != null) {
                        document.title = ret.PageWindowDescrip;
                    }
                }, (error) => {
                    flexygo.exceptions.httpShow(error);
                    let ev = {
                        class: "page",
                        type: "loaded",
                        sender: histObj,
                        masterIdentity: objectname,
                        detailIdentity: objectwhere
                    };
                    flexygo.events.trigger(ev);
                });
            }
        }
        nav.openPage = openPage;
        /**
        * Navigate to default page
        * @method goHome
        * @param {boolean} [excludeHist=false] - True to not store in history
         */
        function goHome(excludeHist = false) {
            if (flexygo.profiles.startuppage && flexygo.profiles.startuppage != '') {
                flexygo.nav.openPageName(flexygo.profiles.startuppage, null, null, null, 'current', excludeHist, null);
            }
        }
        nav.goHome = goHome;
        /**
         * Opens a page by its name
         * @method openPageName
         * @param {string} pagename - Identifier of the page
         * @param {string} objectname - Name of the collection or entity
         * @param {string} objectwhere - Where of the collection or entity
         * @param {string} defaults - Defaults to be added to the page
         * @param {string} targetid - Target to open the window
         * @param {boolean} excludeHist - True to not store in history
         * @param {JQuery} triggerElement - Relative element to open the page
         * @param {boolean} isClone -
        * @param {flexygo.nav.FlexygoHistory} previousHist - Previous page history
        */
        function openPageName(pagename, objectname, objectwhere, defaults, targetid, excludeHist, triggerElement, isClone, previousHist, presets) {
            if (typeof event != 'undefined') {
                event.preventDefault();
            }
            if (flexygo.utils.isTactilModeActive()) {
                flexygo.utils.scrollTo(0);
            }
            if (flexygo.utils.isSizeMobile() && targetid.indexOf('modal') != 0) {
                targetid = "current";
            }
            else if (flexygo.utils.isSizeMobile() && targetid.indexOf('modal') == 0) {
                targetid = "modal";
            }
            if (triggerElement) {
                triggerElement = getRealTarget(triggerElement);
            }
            if (targetid == 'opener') {
                targetid = getCurrentOpener(triggerElement);
            }
            var histObj = {
                navigateFun: 'openpagename',
                targetid: targetid,
                objectname: objectname,
                objectwhere: objectwhere,
                defaults: defaults,
                pagename: pagename,
                filtersValues: (previousHist && previousHist.filtersValues) ? previousHist.filtersValues : null,
                presetsValues: (previousHist && previousHist.presetsValues) ? previousHist.presetsValues : null,
                userid: flexygo.context.currentUserId
            };
            if (targetid && targetid.indexOf('new') == 0) {
                flexygo.targets.openNewWindow(histObj, targetid);
            }
            else {
                if (objectwhere == 'NOWHERE') {
                    flexygo.msg.error("Can't find object where.");
                    return;
                }
                let ev = {
                    class: "page",
                    type: "loading",
                    sender: histObj,
                    masterIdentity: objectname,
                    detailIdentity: objectwhere
                };
                flexygo.events.trigger(ev);
                flexygo.ajax.post('~/api/Page', 'GetPageByName', { "PageName": pagename, "ObjectName": objectname, "ObjectWhere": objectwhere }, (ret) => {
                    if (!histObj.pagetypeid) {
                        histObj.pagetypeid = ret.StrType;
                    }
                    var pageContainer = flexygo.targets.createContainer(histObj, excludeHist, triggerElement);
                    if (!pageContainer) {
                        NProgress.done();
                        return;
                    }
                    ret.pageHistory = histObj;
                    openPageReturn(ret, objectname, objectwhere, defaults, pageContainer, null, null, isClone, null, presets);
                    if (!excludeHist) {
                        flexygo.history.historyLog.add(ret.IconCssClass, ret.Descrip, ret.pageHistory);
                    }
                    if (pageContainer.is('#realMain')) {
                        document.title = ret.PageWindowDescrip;
                    }
                }, (error) => {
                    flexygo.exceptions.httpShow(error);
                    let ev = {
                        class: "page",
                        type: "loaded",
                        sender: histObj,
                        masterIdentity: objectname,
                        detailIdentity: objectwhere
                    };
                    flexygo.events.trigger(ev);
                });
            }
        }
        nav.openPageName = openPageName;
        /**
        * Executes a process, opening its param page if required
        * @method execProcess
        * @param {string} processname - Identifier of the process
        * @param {string} objectname - Name of the collection or entity
        * @param {string} objectwhere - Where of the collection or entity
        * @param {string} defaults - Defaults to be added to the process
        * @param {any} processparams - Array of process parameters
        * @param {string} targetid - Target to open the window
        * @param {boolean} excludeHist - True to not store in history
        * @param {JQuery} triggerElement - Relative element to open the page
        * @param {function} callBack - callback to be called after execute
        * @param {boolean} showprogress - false to hide progress indicator
       */
        function execProcess(processname, objectname, objectwhere, defaults, processparams, targetid, excludeHist, triggerElement, callBack, showProgress, originalProcess, errorCallback, eventData) {
            if (typeof event != 'undefined') {
                event.preventDefault();
            }
            if (objectwhere === null || objectwhere === void 0 ? void 0 : objectwhere.includes('&quot;')) {
                objectwhere = objectwhere.replace(/&quot;/g, '"');
            }
            var proc = new flexygo.Process(processname, objectname, objectwhere);
            proc.read();
            let target;
            if (typeof (showProgress) == typeof (true)) {
                proc.showProgress = showProgress;
            }
            if (originalProcess) {
                proc.progressBar = originalProcess.progressBar;
            }
            if (triggerElement) {
                triggerElement = getRealTarget(triggerElement);
                proc.module = triggerElement.closest('flx-module')[0];
            }
            //if target has been passed use that one if not use process target
            if (targetid == null) {
                target = proc.config.TargetId;
            }
            else {
                target = targetid;
            }
            //If process is not a workflow, and has params and params have not be passed use openprocessparams window
            if ((!proc.config.IsWorkflow) && proc.config.HasParams && processparams == null) {
                if (!flexygo.utils.isSizeMobile) {
                    excludeHist = true;
                }
                flexygo.nav.openProcessParams(processname, objectname, objectwhere, defaults, target, excludeHist, triggerElement);
            }
            else {
                if (!processparams && defaults) {
                    let jsonDefaults = typeof defaults === 'object' ? defaults : JSON.parse(flexygo.utils.parser.replaceAll(defaults, "'", '"'));
                    let paramsDefaults = [];
                    for (let key in jsonDefaults) {
                        let jsonValue = {};
                        jsonValue["Key"] = key;
                        jsonValue["Value"] = jsonDefaults[key];
                        paramsDefaults.push(jsonValue);
                    }
                    processparams = paramsDefaults;
                }
                if (typeof proc.config.ConfirmText != 'undefined' && proc.config.ConfirmText && proc.config.ConfirmText != '') {
                    let resultCallback = (result) => {
                        if (result) {
                            proc.run(processparams, callBack, target, excludeHist, triggerElement, null, errorCallback, eventData);
                        }
                    };
                    flexygo.msg.confirm(proc.config.ConfirmText, resultCallback);
                }
                else {
                    proc.run(processparams, callBack, target, excludeHist, triggerElement, null, errorCallback, eventData);
                }
            }
        }
        nav.execProcess = execProcess;
        function openPageReturn(pageConf, objectname, objectwhere, defaults, pageContainer, reportname, processname, isClone, reportwhere, presets) {
            pageContainer.html(flexygo.utils.loadingMsg());
            //Hide menu when page is loaded.
            if (!flexygo.utils.isSizeMobile()) {
                $('#mainMenu').find('.item-opened').parent().find('ul').slideUp(flexygo.utils.animationTime);
                $('#mainMenu').find('.item-opened').addClass("item-closed").removeClass("item-opened");
            }
            if (pageConf) {
                var bodyClass = '';
                if (pageConf.BodyCssClass) {
                    bodyClass = pageConf.BodyCssClass;
                }
                if (flexygo.debug && flexygo.debug.isDevelopMode && flexygo.debug.isDevelopMode()) {
                    bodyClass += ' develop';
                }
                if (pageContainer.is('#realMain')) {
                    $('body').attr('class', bodyClass);
                    resizeMain();
                }
                pageContainer.attr('pageName', pageConf.PageName);
                pageContainer.attr('layoutname', pageConf.LayoutName);
                //else {
                //    pageContainer.attr('class', 'pageContainer ' + bodyClass);
                //}
                if (pageConf.Descrip.includes("{{ReportName") && !flexygo.utils.isBlank(reportname)) {
                    pageConf.Descrip = reportname;
                }
                pageContainer.closest('.flx-dialog,.flx-dialog-modal').find("span.ui-dialog-title").text(pageConf.Descrip);
                pageContainer.html(pageConf.LayoutTemplate);
                // Add page script 
                if (pageConf.Script && pageConf.Script != '') {
                    pageContainer.append('<script name="custom-script">' + pageConf.Script + '</script>');
                }
                // Add page Styles
                if (pageConf.Style && pageConf.Style != '') {
                    pageContainer.append('<style name="custom-style">' + pageConf.Style + '</style>');
                }
                var modules = flexygo.utils.sortObject(pageConf.Modules, 'Order');
                flexygo.utils.isBlank(presets) && (presets = undefined);
                let parsedPresets = flexygo.utils.isJSON(flexygo.utils.parser.replaceAll(presets, "'", '"')) ? JSON.parse(flexygo.utils.parser.replaceAll(presets, "'", '"')) : presets;
                let presetHistoryValue = new PresetHistoryValue();
                if (parsedPresets != null) {
                    pageConf.pageHistory.presetsValues = new flexygo.nav.ModulePresetHistory();
                }
                if (typeof parsedPresets == 'object') {
                    for (const key in parsedPresets) {
                        presetHistoryValue = new PresetHistoryValue();
                        presetHistoryValue.presetId = parsedPresets[key];
                        pageConf.pageHistory.presetsValues[key] = presetHistoryValue;
                    }
                }
                else if (typeof parsedPresets == 'string') {
                    presetHistoryValue.presetId = parsedPresets;
                    pageConf.pageHistory.presetsValues['*'] = presetHistoryValue;
                }
                let def;
                if (defaults) {
                    if (typeof defaults == 'string') {
                        def = JSON.parse(flexygo.utils.parser.replaceAll(defaults, "'", '"'));
                    }
                    else {
                        def = defaults;
                    }
                }
                for (let i = 0; i < modules.length; i++) {
                    let mod = modules[i];
                    if (mod['Active'] !== false) {
                        var cont = pageContainer.find('.' + mod.LayoutPositionId);
                        if (cont.length == 0) {
                            cont = pageContainer;
                        }
                        let container = $('<flx-module></flx-module>');
                        container.html(mod.ContainerTemplate).attr('modulename', mod.ModuleName).attr('type', mod.WebComponent.split(' ')[0]).addClass(mod.ContainerClass);
                        if (mod.PresetName && presets == undefined) {
                            container.html(mod.ContainerTemplate).attr('presetname', mod.PresetName).attr('presettext', mod.PresetText).attr('preseticon', mod.PresetIcon).attr('removepreset', mod.RemovePreset);
                        }
                        if (flexygo.utils.isSizeMobile() && modules.length == 1) {
                            container.find('.cntHeader').hide();
                        }
                        cont.append(container);
                        var componentString = mod.WebComponent;
                        if (mod.Params) {
                            componentString += ' ' + flexygo.utils.parser.compile(def, mod.Params);
                        }
                        /*var mode = 'edit';
                        if (reportname) { mode= 'report'; }
                        if (proccid) { mode= 'process'; }*/
                        //console.log("openpageret", mod.ModuleName, mod.ObjectDefaults);
                        let ctrl = container[0];
                        ctrl.componentString = componentString;
                        ctrl.isClone = isClone;
                        ctrl.objectname = objectname;
                        ctrl.objectwhere = objectwhere;
                        //ctrl.mode = mode;
                        ctrl.reportname = reportname;
                        ctrl.reportwhere = reportwhere;
                        ctrl.processname = processname;
                        ctrl.moduleName = mod.ModuleName;
                        ctrl.moduleTitle = mod.Title;
                        ctrl.icon = mod.IconClass;
                        if (mod.HeaderClass && mod.HeaderClass != '') {
                            ctrl.headerClass = mod.HeaderClass;
                        }
                        if (mod.ModuleClass && mod.ModuleClass != '') {
                            ctrl.moduleClass = mod.ModuleClass;
                        }
                        ctrl.canCollapse = mod.CanCollapse;
                        ctrl.canEnlarge = mod.CanEnlarge;
                        ctrl.canRefresh = mod.CanRefresh;
                        //ctrl.canClose = true;
                        ctrl.canConfig = true;
                        ctrl.JSAfterLoad = mod.JSAfterLoad;
                        ctrl.objectdefaults = mod.ObjectDefaults;
                        if (ctrl.objectdefaults) {
                            for (let key in ctrl.objectdefaults) {
                                if (ctrl.objectdefaults[key] != null && ctrl.objectdefaults[key].toString().indexOf('/Date(') != -1) {
                                    ctrl.objectdefaults[key] = moment(moment.utc(ctrl.objectdefaults[key]).toDate()).format('YYYY-MM-DDTHH:mm:ss');
                                }
                            }
                        }
                        ctrl.moduleConfig = mod;
                        ctrl.ManualInit = mod.ManualInit;
                        ctrl.HTMLInit = mod.HTMLInit;
                        ctrl.ModuleViewers = mod.ModuleViewers;
                        if (mod.InitHidden) {
                            container.attr('init', 'false').hide();
                        }
                        else {
                            ctrl.init();
                        }
                    }
                }
                let ev = {
                    class: "page",
                    type: "loaded",
                    sender: pageConf,
                    masterIdentity: pageConf.PageName
                };
                flexygo.events.trigger(ev);
            }
        }
        nav.openPageReturn = openPageReturn;
        /**
       * Opens the parameter process page
       * @method openProcessParams
       * @param {string} processname - Process Identifier
       * @param {string} objectname - Name of the collection or entity
       * @param {string} objectwhere - Where of the collection or entity
       * @param {string} defaults - Defaults to be added to the process
       * @param {string} targetid - Target to open the window
       * @param {boolean} excludeHist - True to not store in history
       * @param {JQuery} triggerElement - Relative element to open the page
      */
        function openProcessParams(processname, objectname, objectwhere, defaults, targetid, excludeHist, triggerElement, pagename = 'syspage-processparams-default') {
            //process param page is currenty syspage-processparams-default
            flexygo.nav.openProcessParamsPage(pagename, processname, objectname, objectwhere, defaults, targetid, excludeHist, triggerElement);
        }
        nav.openProcessParams = openProcessParams;
        /**
         * Opens the parameter process page
         * @method openProcessParamsPage
         * @param {string} pagename - Desired page name
         * @param {string} processname - Process Identifier
         * @param {string} objectname - Name of the collection or entity
         * @param {string} objectwhere - Where of the collection or entity
         * @param {string} defaults - Defaults to be added to the process
         * @param {string} targetid - Target to open the window
         * @param {boolean} excludeHist - True to not store in history
         * @param {JQuery} triggerElement - Relative element to open the page
        */
        function openProcessParamsPage(pagename, processname, objectname, objectwhere, defaults, targetid, excludeHist, triggerElement) {
            if (typeof event != 'undefined') {
                event.preventDefault();
            }
            if (flexygo.utils.isSizeMobile() && targetid.indexOf('modal') != 0) {
                targetid = "current";
            }
            else if (flexygo.utils.isSizeMobile() && targetid.indexOf('modal') == 0) {
                targetid = "modal";
            }
            if (triggerElement) {
                triggerElement = getRealTarget(triggerElement);
            }
            if (targetid == 'opener') {
                targetid = getCurrentOpener(triggerElement);
            }
            var histObj = {
                pagename: pagename,
                navigateFun: 'openProcessParams',
                targetid: targetid,
                objectname: objectname,
                objectwhere: objectwhere,
                defaults: defaults,
                processname: processname,
                userid: flexygo.context.currentUserId
            };
            if (targetid && targetid.indexOf('new') == 0) {
                flexygo.targets.openNewWindow(histObj, targetid);
            }
            else {
                var pageContainer = flexygo.targets.createContainer(histObj, excludeHist, triggerElement);
                if (!pageContainer) {
                    NProgress.done();
                    return;
                }
                if (triggerElement && !triggerElement.closest('.pageContainer').is(pageContainer)) {
                    pageContainer.data('opener', triggerElement.closest('.pageContainer'));
                }
                flexygo.ajax.post('~/api/Page', 'GetPageByName', { "PageName": pagename }, (ret) => {
                    ret.pageHistory = histObj;
                    openPageReturn(ret, objectname, objectwhere, defaults, pageContainer, null, processname);
                });
            }
        }
        nav.openProcessParamsPage = openProcessParamsPage;
        /**
        * Opens the parameter report page
        * @method openReportsParams
        * @param {string} report - Identifier of the report
        * @param {string} reportwhere - Filter of the report
        * @param {string} objectname - Name of the collection or entity
        * @param {string} objectwhere - Where of the collection or entity
        * @param {string} defaults - Defaults to be added to the process
        * @param {string} targetid - Target to open the window
        * @param {boolean} excludeHist - True to not store in history
        * @param {JQuery} triggerElement - Relative element to open the page
       */
        function openReportsParams(reportname, reportwhere, objectname, objectwhere, defaults, targetid, excludeHist, triggerElement) {
            let reportConfig = new flexygo.obj.Entity('sysReport', 'Reports.ReportName=\'' + reportname + '\'');
            let objData = reportConfig.getView('vNet_Reports', 0, 1, null, null, null)[0];
            if (objData.numParameters > 0) {
                //report params page is currenty syspage-reportparams-default
                flexygo.nav.openReportsParamsPage('syspage-reportparams-default', reportname, reportwhere, objectname, objectwhere, defaults, targetid, excludeHist, triggerElement);
            }
            else {
                viewReport(reportname, reportwhere, objectname, objectwhere, defaults, null, targetid, excludeHist, true);
            }
        }
        nav.openReportsParams = openReportsParams;
        /**
         * Opens the parameter report page
         * @method openReportsParamsPage
         * @param {string} pagename - Desired page name
         * @param {string} report - Identifier of the report
         * @param {string} reportwhere - Filter of the report
         * @param {string} objectname - Name of the collection or entity
         * @param {string} objectwhere - Where of the collection or entity
         * @param {string} defaults - Defaults to be added to the process
         * @param {string} targetid - Target to open the window
         * @param {boolean} excludeHist - True to not store in history
         * @param {JQuery} triggerElement - Relative element to open the page
        */
        function openReportsParamsPage(pagename, reportname, reportwhere, objectname, objectwhere, defaults, targetid, excludeHist, triggerElement) {
            if (typeof event != 'undefined') {
                event.preventDefault();
            }
            if (flexygo.utils.isSizeMobile() && targetid.indexOf('modal') != 0) {
                targetid = "current";
            }
            else if (flexygo.utils.isSizeMobile() && targetid.indexOf('modal') == 0) {
                targetid = "modal";
            }
            if (triggerElement) {
                triggerElement = getRealTarget(triggerElement);
            }
            if (targetid == 'opener') {
                targetid = getCurrentOpener(triggerElement);
            }
            var histObj = {
                navigateFun: 'openReportsParams',
                targetid: targetid,
                objectname: objectname,
                objectwhere: objectwhere,
                defaults: defaults,
                reportname: reportname,
                reportwhere: reportwhere,
                userid: flexygo.context.currentUserId
            };
            if (targetid && targetid.indexOf('new') == 0) {
                flexygo.targets.openNewWindow(histObj, targetid);
            }
            else {
                var pageContainer = flexygo.targets.createContainer(histObj, excludeHist, triggerElement);
                if (!pageContainer) {
                    NProgress.done();
                    return;
                }
                flexygo.ajax.post('~/api/Page', 'GetPageByName', { "PageName": pagename }, (ret) => {
                    ret.pageHistory = histObj;
                    openPageReturn(ret, objectname, objectwhere, defaults, pageContainer, reportname, null, null, reportwhere);
                });
            }
        }
        nav.openReportsParamsPage = openReportsParamsPage;
        /**
         * Opens the report page
         * @method viewReport
         * @param {string} reportname - Identifier of the report
         * @param {string} reportwhere - filter of the report
         * @param {string} objectname - Name of the collection or entity
         * @param {string} objectwhere - Where of the collection or entity
         * @param {string} defaults - Defaults to be added to the process
         * @param {any} params - Array of key/value pararameters
         * @param {string} targetid - Target to open the window
         * @param {boolean} excludeHist - True to not store in history
         * @param {JQuery} triggerElement - Relative element to open the page
        */
        function viewReport(reportname, reportwhere, objectname, objectwhere, defaults, params, targetid, excludeHist, hasParams = false) {
            if (typeof event != 'undefined') {
                event.preventDefault();
            }
            let reportConfig;
            flexygo.ajax.post('~/api/Report', 'GetReportConfig', { "ReportName": reportname, "ObjectName": objectname, "ObjectWhere": objectwhere }, (reportConfig) => {
                if (reportConfig.MaxRows && reportConfig.CurrentRows && reportConfig.CurrentRows > reportConfig.MaxRows) {
                    flexygo.msg.warning(flexygo.localization.translate('navigation.reportmaxrows').replace('{0}', reportConfig.CurrentRows).replace('{1}', reportConfig.MaxRows));
                    return;
                }
                let paramsJSON = {}, filter;
                if (params) {
                    for (let i = 0; i < params.length; i++) {
                        paramsJSON[params[i].key] = params[i].value;
                    }
                }
                //html report
                if (reportConfig.TypeId == 'html') {
                    flexygo.utils.showLoading(null, flexygo.localization.translate('htmlreport.generate'));
                    flexygo.utils.asyncSleep(0).then(() => {
                        let templateId = reportConfig.TemplateId;
                        filter = flexygo.utils.parser.compile(paramsJSON, (reportConfig.AdditionalWhere == null ? "" : reportConfig.AdditionalWhere));
                        let descrip = reportConfig.ReportDescrip;
                        flexygo.nav.openPrintPage(objectname, objectwhere, templateId, targetid, filter, descrip);
                    });
                }
                else if (reportConfig.TypeId == 'excel') {
                    filter = flexygo.utils.parser.compile(paramsJSON, (reportConfig.AdditionalWhere == null ? "" : reportConfig.AdditionalWhere));
                    flexygo.ajax.syncPost('~/api/Report', 'GetReportExcel', { "ObjectName": objectname, "ObjectWhere": objectwhere, "ReportName": reportname, "AdditionalWhere": filter }, (ret) => {
                        if (ret.Success) {
                            var func = new Function(ret.Link);
                            func.call(ret.Link);
                        }
                    });
                }
                else {
                    //crystal report
                    var callParams;
                    callParams = 'ObjectName=' + objectname + '&ObjectWhere=' + objectwhere + '&ReportName=' + reportname;
                    //came from param form
                    if (params)
                        callParams += '&Params=' + JSON.stringify(params);
                    //defaults for the params
                    if (defaults && defaults != 'null')
                        callParams += '&Defaults=' + JSON.stringify(defaults);
                    //if has params even hide
                    if (hasParams)
                        callParams += '&HasParams=' + hasParams;
                    //report definition has a report where
                    if (reportwhere)
                        callParams += '&Filter=' + reportwhere;
                    //put it all into one encoded id
                    callParams = 'id=' + flexygo.history.Base64.encode(callParams);
                    flexygo.nav.openURL('~/forms/Reports.aspx', callParams);
                }
            });
        }
        nav.viewReport = viewReport;
        /**
         * Opens an URL
         * @method openURL
         * @param {string} url - URL identifier
         * @param {string} params - parameters to add to the URL
         * @param {string} targetid - Target to open the window
        */
        function openURL(url, params, targetid) {
            if (typeof event != 'undefined') {
                event.preventDefault();
            }
            var n = Math.floor((Math.random() * 4) + 1);
            url = flexygo.utils.resolveUrl(url);
            if (typeof params == 'object') {
                for (let i = 0; i < params.length; i++) {
                    url += (i == 0 ? '?' : '&') + params[i].key + '=' + encodeURIComponent(params[i].value);
                }
            }
            else {
                if (params && params != '') {
                    if (params.indexOf('?')) {
                        url += '?' + params;
                    }
                    else {
                        url += '&' + params;
                    }
                }
            }
            if (flexygo.utils.isAgentMobile() || flexygo.utils.isAgentElectron()) {
                return window.open(url);
            }
            else {
                let p = window.open('');
                if (!p) {
                    flexygo.msg.warning('navigation.popupwarning');
                }
                else {
                    p.document.write('<htm><body style="background:url(' + flexygo.utils.resolveUrl('~/img/loading' + n + '.gif') + ') no-repeat;background-size:cover"></body></html>');
                    p.document.location.href = url;
                    return p;
                }
            }
        }
        nav.openURL = openURL;
        /**
        * Opens an edit table Page
        * @method openEditTable
        * @param {string} tablename - Name of the table
        * @param {string} targetid - Target to open the window
        * @param {string} tabledescrip - Description of the table
        * @param {boolean} excludeHist - True to not store in history
        * @param {JQuery} triggerElement - Relative element to open the page
       */
        function openEditTable(tablename, targetid, tabledescrip, excludeHist, triggerElement) {
            //Hide menu when page loaded
            if (!flexygo.utils.isSizeMobile()) {
                $('#mainMenu').find('.item-opened').parent().find('ul').slideUp(flexygo.utils.animationTime);
                $('#mainMenu').find('.item-opened').addClass("item-closed").removeClass("item-opened");
            }
            if (typeof event != 'undefined') {
                event.preventDefault();
            }
            if (flexygo.utils.isSizeMobile() && targetid.indexOf('modal') != 0) {
                targetid = "current";
            }
            else if (flexygo.utils.isSizeMobile() && targetid.indexOf('modal') == 0) {
                targetid = "modal";
            }
            if (triggerElement) {
                triggerElement = getRealTarget(triggerElement);
            }
            if (targetid == 'opener') {
                targetid = getCurrentOpener(triggerElement);
            }
            var histObj = {
                tablename: tablename,
                targetid: targetid,
                navigateFun: 'openedittable',
                tabledescrip: tabledescrip,
                userid: flexygo.context.currentUserId
            };
            if (targetid && targetid.indexOf('new') == 0) {
                flexygo.targets.openNewWindow(histObj, targetid);
            }
            else {
                var pageContainer = flexygo.targets.createContainer(histObj, excludeHist, triggerElement);
                if (!pageContainer) {
                    NProgress.done();
                    return;
                }
                var navString = '';
                navString += '<div class="col-9 col-m-6 col-s-12">';
                navString += '<flx-container type="emptyCnt">';
                navString += '<span class="sectitle"><i class="f-icon icon-new-email"> </i>' + tabledescrip + '</span>';
                navString += '</flx-container>';
                navString += '</div>';
                navString += '<div class="col-3 col-m-6 col-s-12">';
                navString += '<flx-container type="emptyCnt">';
                navString += '<flx-genericsearch gridId="master1" ></flx-editgrid>';
                navString += '</flx-container>';
                navString += '</div>';
                navString += '<div class="col-12">';
                navString += '<flx-container type="emptyCnt">';
                navString += '<flx-editgrid id="master1" tablename="' + tablename + '"></flx-editgrid>';
                navString += '</flx-container>';
                navString += '</div>';
                pageContainer.html(navString);
                let mCtl = $('#mainFooterMenu')[0];
                mCtl.init();
                mCtl.hide();
                mCtl.clear();
                let wcMaster = $('#master1')[0];
                mCtl.addItem('flx-icon icon-trash', 'Borrar todo', () => { wcMaster.deleteAll(); });
                mCtl.addItem('flx-icon icon-edit', 'Editar', () => { wcMaster.editAll(); });
                mCtl.addItem('flx-icon icon-remove', 'Deshacer Edición', () => { wcMaster.uneditAll(); });
                mCtl.addItem('flx-icon icon-save', 'Guardar todo', () => { wcMaster.saveAll(); });
                flexygo.history.historyLog.add('flx-icon icon-properties-settings', tablename, histObj);
                if (pageContainer.is('#realMain')) {
                    document.title = tablename;
                }
            }
        }
        nav.openEditTable = openEditTable;
        /**
        * Opens a help page
        * @method openHelpId
        * @param {string} helpid - Identifier of the help page
        * @param {string} targetid - Target to open the window
        * @param {boolean} excludeHist - True to not store in history
        * @param {JQuery} triggerElement - Relative element to open the page
       */
        function openHelpId(helpid, targetid, excludeHist, triggerElement) {
            //Hide menu when page loaded
            if (!flexygo.utils.isSizeMobile()) {
                $('#mainMenu').find('.item-opened').parent().find('ul').slideUp(flexygo.utils.animationTime);
                $('#mainMenu').find('.item-opened').addClass("item-closed").removeClass("item-opened");
            }
            if (typeof event != 'undefined') {
                event.preventDefault();
            }
            if (flexygo.utils.isSizeMobile() && targetid.indexOf('modal') != 0) {
                targetid = "current";
            }
            else if (flexygo.utils.isSizeMobile() && targetid.indexOf('modal') == 0) {
                targetid = "modal";
            }
            if (triggerElement) {
                triggerElement = getRealTarget(triggerElement);
            }
            if (targetid == 'opener') {
                targetid = getCurrentOpener(triggerElement);
            }
            var histObj = {
                targetid: targetid,
                navigateFun: 'openhelpid',
                helpid: helpid,
                userid: flexygo.context.currentUserId
            };
            if (targetid && targetid.indexOf('new') == 0) {
                flexygo.targets.openNewWindow(histObj, targetid);
            }
            else {
                var pageContainer = flexygo.targets.createContainer(histObj, excludeHist, triggerElement);
                if (!pageContainer) {
                    NProgress.done();
                    return;
                }
                flexygo.ajax.post('~/api/Page', 'GetHelpById', { "HelpId": helpid }, (ret) => {
                    if (ret) {
                        ret.pageHistory = histObj;
                        flexygo.history.historyLog.add('flx-icon icon-help-2', ret.Title, histObj);
                        if (pageContainer.is('#realMain')) {
                            document.title = ret.Title;
                        }
                        let define = window['define'];
                        window['define'] = undefined;
                        pageContainer.html(ret.HTMLText);
                        pageContainer.prepend('<div class="develop-only help-button help-fixed"><button class="btn btn-default" onclick="flexygo.nav.openPage(\'edit\',\'sysHelp\',\'(HelpId=\\\'' + helpid + '\\\')\',null,\'current\',false,$(this))"><i class="flx-icon icon-pencil"></i> </button></div>');
                        window['define'] = define;
                        //$(document).trigger('helpLoaded', [helpid, pageContainer]);
                        var ev = {
                            class: "page",
                            type: "loaded",
                            sender: ret,
                            masterIdentity: helpid
                        };
                        flexygo.events.trigger(ev);
                    }
                });
            }
        }
        nav.openHelpId = openHelpId;
        /**
        * Opens a print page
        * @method openPrintPage
        * @param {string} objectName - Object Name
        * @param {string} objectWhere - Object Where
        * @param {string} templateId - TemplateId
        * @param {string} filter - Object or collection filter
        * @param {string} targetid - Target to open the window
       */
        function openPrintPage(objectName, objectWhere, templateId, targetid, filter, descrip) {
            //Hide menu when page loaded
            if (!flexygo.utils.isSizeMobile()) {
                $('#mainMenu').find('.item-opened').parent().find('ul').slideUp(flexygo.utils.animationTime);
                $('#mainMenu').find('.item-opened').addClass("item-closed").removeClass("item-opened");
            }
            ////no estoy usando el targetId
            //var height = ($(window).height()) * 0.95;
            //var width = (height * 0.707).toFixed(0);
            //var targetid = "modal" + width + "x" + height;
            //if (flexygo.utils.isSizeMobile() && targetid.indexOf('modal') != 0) { targetid = "current"; }
            //else if (flexygo.utils.isSizeMobile() && targetid.indexOf('modal') == 0) { targetid = "modal"; }
            //var histObj = {
            //    targetid: targetid
            //}
            //var pageContainer = flexygo.targets.createContainer(histObj, true, null);
            var htmlText = '<div class="htmlreport">' + flexygo.environment.getTemplate(objectName, objectWhere, templateId, null, filter) + '</div>';
            //var repbody = '<div class="htmlreport"><div class="header">'
            //    repbody +='<button class="btn bg-info" onclick="$(this).closest(\'.htmlreport\').find(\'.report\').print()"><i class="flx-icon icon-print icon-margin-right clickable"></i>Print</button>'
            //   /* repbody +='<button class="btn bg-info" onclick= "$(this).closest(\'.htmlreport\').find(\'.report\').print()" > <i class="flx-icon icon-settings-2 icon-margin-right clickable" > </i>Settings</button> */
            //    repbody +='</div><div class="report" ></div > </div>'
            //    pageContainer.html(repbody);
            //    pageContainer.find('.report').html(htmlText);
            $(htmlText).print(descrip);
        }
        nav.openPrintPage = openPrintPage;
        /**
       * Gets help content
       * @method GetHelpContent
       * @param {string} helpid - Identifier of the help page
       * @returns {string} - Help content
      */
        function getHelpContent(helpid) {
            let retHtml = '';
            if (helpid) {
                flexygo.ajax.syncPost('~/api/Page', 'GetHelpById', { "HelpId": helpid }, (ret) => {
                    if (ret) {
                        retHtml = ret.HTMLText;
                    }
                });
            }
            return retHtml;
        }
        nav.getHelpContent = getHelpContent;
        /**
     * Attaches Object Menu to button
     * @method getObjectMenu
     * @param {string} objectname - objectName
     * @param {string} objectwhere - object where
     * @param {string} defaults - object defaults
     * @param {string} btn - button
    */
        function getObjectMenu(objectname, objectwhere, defaults, btn, coord, options) {
            var cntMenu = $('flx-contextmenu')[0];
            if (!cntMenu.hideMenu(btn)) {
                let defPage, defMenu;
                if (btn) {
                    let histObj = flexygo.history.get(btn);
                    if (typeof histObj != 'undefined' && histObj.defaults) {
                        if (typeof histObj.defaults == 'string') {
                            defPage = JSON.parse(flexygo.utils.parser.replaceAll(histObj.defaults, "'", '"'));
                        }
                        else {
                            defPage = histObj.defaults;
                        }
                    }
                }
                if (defaults) {
                    if (typeof defaults == 'string') {
                        defMenu = JSON.parse(flexygo.utils.parser.replaceAll(defaults, "'", '"'));
                    }
                    else {
                        defMenu = defaults;
                    }
                }
                if (defPage) {
                    Object.assign(defPage, defMenu);
                    defaults = JSON.stringify(defPage);
                }
                else if (defMenu) {
                    defaults = JSON.stringify(defMenu);
                }
                let proc = new flexygo.obj.Entity(objectname, objectwhere).processes(options, defaults);
                //Clear not Show in Menu items
                if (proc.ObjectLink && Object.keys(proc.ObjectLink.ChildNodes).length > 0) {
                    for (let key in proc.ObjectLink.ChildNodes) {
                        if (!proc.ObjectLink.ChildNodes[key].ShowInMenu) {
                            delete proc.ObjectLink.ChildNodes[key];
                        }
                    }
                }
                if (defaults) {
                    //Set defaults to action nodes.
                    if (proc.ActionNode && Object.keys(proc.ActionNode.ChildNodes).length > 0) {
                        for (let itm in proc.ActionNode.ChildNodes) {
                            proc.ActionNode.ChildNodes[itm].ObjectDefaults = defaults;
                        }
                    }
                    //Set defaults to process nodes.
                    if (proc.ProcessLink && Object.keys(proc.ProcessLink.ChildNodes).length > 0) {
                        for (let itm in proc.ProcessLink.ChildNodes) {
                            proc.ProcessLink.ChildNodes[itm].ObjectDefaults = defaults;
                        }
                    }
                    //Set defaults to report nodes.
                    if (proc.ReportLink && Object.keys(proc.ReportLink.ChildNodes).length > 0) {
                        for (let itm in proc.ReportLink.ChildNodes) {
                            proc.ReportLink.ChildNodes[itm].ObjectDefaults = defaults;
                        }
                    }
                }
                cntMenu.showObjectMenu(proc, btn, coord);
            }
        }
        nav.getObjectMenu = getObjectMenu;
        function getRealTarget(elm) {
            if (elm.closest('flx-contextmenu').length > 0) {
                elm = elm.closest('flx-contextmenu')[0].parent;
            }
            return elm;
        }
        nav.getRealTarget = getRealTarget;
        function getCurrentOpener(triggerElement) {
            let opener = '';
            if (triggerElement && triggerElement.closest('.pageContainer').length > 0) {
                let context = triggerElement.closest('.pageContainer').data('context');
                if (context && context.opener) {
                    return 'opener|' + context.opener;
                }
            }
            return 'main';
        }
        nav.getCurrentOpener = getCurrentOpener;
        /**
         * Close flexygo popup or modal page
         * @method closePage
         * @param {JQuery} elm - Element inside page to close
        */
        function closePage(elm) {
            if (!elm.is) {
                elm = $(elm);
            }
            if (elm.is('.ui-dialog')) {
                elm.remove();
            }
            else {
                elm.closest(".ui-dialog").remove();
            }
        }
        nav.closePage = closePage;
        /**
         * Close all flexygo popup or modal page
         * @method closeAllPages
        */
        function closeAllPages() {
            $('.ui-dialog').remove();
        }
        nav.closeAllPages = closeAllPages;
        //MOBILE NAV BAR UTILS
        function toggleMobileMenu() {
            flexygo.nav.toggleFlxnav($('#mainMenu'));
            $('#mainMenu').attr('mode', 'nav');
            if ($('#mainNav').is(':visible')) {
                flexygo.nav.toggleFlxnav($('#mainNav'));
            }
        }
        nav.toggleMobileMenu = toggleMobileMenu;
        function toggleMobileNav() {
            flexygo.nav.toggleFlxnav($('#mainNav'));
            if ($('#mainMenu').is(':visible')) {
                flexygo.nav.toggleFlxnav($('#mainMenu'));
            }
        }
        nav.toggleMobileNav = toggleMobileNav;
        function toggleNavBar() {
            $('#miniButton i').toggleClass('flipped');
            flexygo.nav.toggleFlxnav($('#mainNav'));
        }
        nav.toggleNavBar = toggleNavBar;
        function hideNavBar() {
            let menuNav = $('#mainNav');
            if (menuNav.is(':visible')) {
                $('#miniButton i').toggleClass('flipped');
                flexygo.nav.toggleFlxnav(menuNav);
            }
        }
        nav.hideNavBar = hideNavBar;
        function toggleFlxnav(menuNav) {
            let isOpen;
            if (menuNav.is(':visible')) {
                menuNav.attr('minimized', 'True');
                isOpen = false;
            }
            else {
                menuNav.attr('minimized', 'false');
                isOpen = true;
            }
            menuNav.animate({
                'min-width': 'toggle',
                'width': 'toggle',
            }, 250);
            let ev = {
                class: "navbar",
                type: "toggled",
                sender: { isOpen: isOpen },
            };
            flexygo.events.trigger(ev);
        }
        nav.toggleFlxnav = toggleFlxnav;
    })(nav = flexygo.nav || (flexygo.nav = {}));
})(flexygo || (flexygo = {}));
(function (flexygo) {
    var nav;
    (function (nav) {
        var external;
        (function (external) {
            /**
            * Navigate to default page
            * @method goHome
            * @param {string} appname - External app project name
            * @param {string} targetid - Target to open the window
            */
            function goHome(appname, targetid) {
                if (typeof event != 'undefined') {
                    event.preventDefault();
                }
                var histObj = {
                    targetid: targetid,
                    userid: flexygo.context.currentUserId
                };
                externalTarget(appname, histObj);
            }
            external.goHome = goHome;
            /**
             * Opens the default object page
             * @method openPage
             * @param {string} appname - External app project name
             * @param {string} pagetypeid - Type of the page
             * @param {string} objectname - Name of the collection or entity
             * @param {string} objectwhere - Where of the collection or entity
             * @param {string} defaults - Defaults to be added to the page
             * @param {string} targetid - Target to open the window
             * @param {JQuery} triggerElement - Relative element to open the page
            */
            function openPage(appname, pagetypeid, objectname, objectwhere, defaults, targetid, triggerElement) {
                if (typeof event != 'undefined') {
                    event.preventDefault();
                }
                var histObj = {
                    targetid: targetid,
                    navigateFun: 'openpage',
                    objectname: objectname,
                    objectwhere: objectwhere,
                    defaults: defaults,
                    pagetypeid: pagetypeid,
                    userid: flexygo.context.currentUserId
                };
                externalTarget(appname, histObj);
            }
            external.openPage = openPage;
            /**
             * Opens a page by its name
             * @method openPageName
             * @param {string} pagename - Identifier of the page
             * @param {string} appname - External app project name
             * @param {string} objectname - Name of the collection or entity
             * @param {string} objectwhere - Where of the collection or entity
             * @param {string} defaults - Defaults to be added to the page
             * @param {string} targetid - Target to open the window
             * @param {JQuery} triggerElement - Relative element to open the page
            */
            function openPageName(appname, pagename, objectname, objectwhere, defaults, targetid, triggerElement) {
                if (typeof event != 'undefined') {
                    event.preventDefault();
                }
                var histObj = {
                    navigateFun: 'openpagename',
                    targetid: targetid,
                    objectname: objectname,
                    objectwhere: objectwhere,
                    defaults: defaults,
                    pagename: pagename,
                    userid: flexygo.context.currentUserId
                };
                externalTarget(appname, histObj);
            }
            external.openPageName = openPageName;
            function externalTarget(appname, objectPage) {
                flexygo.ajax.post('~/api/Page', 'GetExternalAuth', { "AppName": appname }, (ret) => {
                    let url = ret.Url;
                    if (ret && ret.length > 0 && ret[0].AccessToken) {
                        flexygo.targets.openExternalNewWindow(url, ret.AccessToken, objectPage);
                    }
                    else {
                        if (!url.endsWith('/')) {
                            url += '/';
                        }
                        url += 'Account/Authorize?AppName=' + ret.ProjectName + '&Id=' + flexygo.context.currentUserId;
                        window.open(url, flexygo.utils.uniqueId(), 'scrollbars=no,status=yes,titlebar=no,resizable=no,width=800,height=600');
                        flexygo.events.on(this, 'process', 'info', (e) => {
                            if (e.masterIdentity == 'authorizedPage' && e.sender.AppName == appname) {
                                flexygo.events.off(this, 'process', 'info');
                                flexygo.targets.openExternalNewWindow(url, e.sender.AccessToken, objectPage);
                            }
                        });
                    }
                });
            }
            external.externalTarget = externalTarget;
        })(external = nav.external || (nav.external = {}));
    })(nav = flexygo.nav || (flexygo.nav = {}));
})(flexygo || (flexygo = {}));
//# sourceMappingURL=navigation.js.map