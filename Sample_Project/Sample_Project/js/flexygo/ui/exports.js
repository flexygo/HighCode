var flexygo;
(function (flexygo) {
    var ui;
    (function (ui) {
        var exports;
        (function (exports) {
            /**
             * Create export list menu.
             * @function                       exportListMenu
            * @param {string} objectname  Object name.
            * @param {string} objectwhere  Object where.
            * @param {defaults} defaults  defaults
            * @param {JQuery} triggerElement  trigger element.
             * @returns                        This function return nothing.
             */
            function exportListMenu(objectname, objectwhere, defaults, triggerElement) {
                var cntMenu = $('flx-contextmenu')[0];
                if (!cntMenu.hideMenu(triggerElement)) {
                    let menuUl = $('<ul/>');
                    let collection = new flexygo.obj.Entity('Export_Formats');
                    let viewResult = collection.getView('Export_Formats_Menu');
                    let ExportLimit = flexygo.utils.ExportLimit;
                    if (viewResult.length > 0 && triggerElement.closest('flx-module').find('flx-list')[0]) {
                        for (let prop of viewResult) {
                            menuUl.append('<li method="export" format="' + prop['Format'] + '" maxnumber="' + ExportLimit + '" data-toggle="tooltip" data-placement="right" title="' + prop['Description'] + '"><span><i class="' + prop['CSSClass'] + '" style="margin-right: 6px;"/>' + prop['Format'].toUpperCase() + '</span></li>');
                        }
                    }
                    menuUl.find('li').off('click').on('click', function (event) {
                        let listModule = ($('flx-contextmenu')[0].parent.closest('flx-module').find('flx-list')[0]);
                        if ($(this).attr('method') === 'export' && listModule) {
                            if (listModule.maxRows <= ExportLimit) {
                                flexygo.ui.exports.exportList($(this).attr('format'), parseInt($(this).attr('maxnumber')), ($('flx-contextmenu')[0].parent.closest('flx-module').find('flx-list')[0]));
                            }
                            else {
                                flexygo.msg.warning(flexygo.localization.translate('_export.exportlimit'));
                            }
                        }
                    });
                    cntMenu.showMenu(menuUl, triggerElement);
                }
            }
            exports.exportListMenu = exportListMenu;
            /**
             * Export all registers of flx-list respecting filters, order ...
             * @function                                           exportList
             * @param {string} format                              Format file.
             * @param {number} maxNumber                           Maximum number of registers.
             * @param {flexygo.ui.wc.FlxListElement} listToExport  flx-list to export.
             * @returns                                            This function return nothing.
             */
            function exportList(format, maxNumber, listToExport) {
                try {
                    if (listToExport) {
                        let objDef;
                        //Add defaults to process
                        if (listToExport.defaults) {
                            if (typeof this.defaults == 'string') {
                                objDef = JSON.parse(this.defaults);
                            }
                            else {
                                objDef = this.defaults;
                            }
                        }
                        else {
                            let histObj = flexygo.history.get($(listToExport));
                            if (typeof histObj != 'undefined' && histObj.defaults) {
                                if (typeof histObj.defaults == 'string') {
                                    objDef = JSON.parse(flexygo.utils.parser.replaceAll(histObj.defaults, "'", '"'));
                                }
                                else {
                                    objDef = histObj.defaults;
                                }
                            }
                            if (objDef == null) {
                                let wcMod = $(listToExport).closest('flx-module')[0];
                                if (wcMod) {
                                    objDef = wcMod.objectdefaults;
                                }
                            }
                        }
                        let params;
                        let responseData;
                        let table;
                        let tr;
                        var progressBar;
                        var progressTimer;
                        progressBar = Lobibox.progress({
                            title: flexygo.localization.translate('_export.exportinglist'),
                            closeOnEsc: false,
                            closeButton: false,
                            onShow: () => { progressTimer = setInterval(() => progressBar.setProgress(((progressBar.getProgress() + 1 >= 100) ? 0 : progressBar.getProgress() + 1)), 50); },
                        });
                        format = (format) ? (format.toLowerCase() === 'xls' || format.toLowerCase() === 'csv' || format.toLowerCase() === 'tsv' || format.toLowerCase() === 'txt' || format.toLowerCase() === 'sql' || format.toLowerCase() === 'json' || format.toLowerCase() === 'xml' || format.toLowerCase() === 'excel' || format.toLowerCase() === 'doc' || format.toLowerCase() === 'pdf') ? format.toLowerCase() : 'excel' : 'excel';
                        params = {
                            ObjectName: $(listToExport).attr('ObjectName'),
                            ObjectWhere: $(listToExport).attr('ObjectWhere'),
                            ModuleName: listToExport.moduleName,
                            PageName: flexygo.history.getPageName($(listToExport)),
                            Page: 0,
                            AdditionalWhere: listToExport.additionalWhere,
                            OrderInfo: listToExport.orderObj,
                            Mode: listToExport.mode,
                            SearchId: listToExport.activeFilter,
                            FilterValues: listToExport.filterValues,
                            TemplateId: listToExport.templateId,
                            ViewId: listToExport.viewId,
                            PageSize: maxNumber,
                            PresetId: listToExport.presetId,
                            Defaults: flexygo.utils.dataToArray(objDef)
                        };
                        flexygo.ajax.post('~/api/List', 'GetList', params, (response) => {
                            if (response.Template.TableData) {
                                responseData = response.Template.TableData;
                                $('#exporttable').remove();
                                table = $('<table id="exporttable"/>').append('<thead/><tbody/>');
                                tr = $('<tr/>').appendTo(table.find('thead'));
                                for (let header in responseData[0]) {
                                    if (header.toLowerCase() !== '_objectname' && header.toLowerCase() !== '_objectwhere' && header.toLowerCase() !== '_guid' && header.toLowerCase() !== '_ot') {
                                        tr.append('<th>' + header + '</th>');
                                    }
                                }
                                for (let row of responseData) {
                                    tr = $('<tr/>').appendTo(table.find('tbody'));
                                    for (let cell in row) {
                                        if (cell.toLowerCase() !== '_objectname' && cell.toLowerCase() !== '_objectwhere' && cell.toLowerCase() !== '_guid' && cell.toLowerCase() !== '_ot') {
                                            tr.append('<td>' + ((row[cell] === null) ? (format === "pdf" || format === "excel" || format === "xls" || format === "doc") ? '' : null : (format !== "json" && row[cell].toString().startsWith('/Date(') && row[cell].toString().endsWith(')/')) ? moment.utc(row[cell]).locale(flexygo.profiles.culture).format('L') + ((moment.utc(row[cell]).locale(flexygo.profiles.culture).format('HH:mm:ss') !== "00:00:00") ? ' ' + moment.utc(row[cell]).locale(flexygo.profiles.culture).format('LTS') : '') : ((typeof row[cell] == 'number') ? row[cell].toString().replace('.', ',') : row[cell])) + '</td>');
                                        }
                                    }
                                }
                                $(document.body).append(table);
                                $('#exporttable').tableExport({ type: format, fileName: (listToExport.closest('flx-module') && listToExport.closest('flx-module').moduleTitle) ? listToExport.closest('flx-module').moduleTitle : 'Export List' });
                                $('#exporttable').remove();
                                progressBar.destroy();
                                clearInterval(progressTimer);
                                progressTimer = null;
                                flexygo.msg.success('_export.success');
                            }
                            else {
                                progressBar.destroy();
                                clearInterval(progressTimer);
                                progressTimer = null;
                                flexygo.msg.error('_export.error');
                            }
                        });
                    }
                    else {
                        flexygo.msg.error('_export.error');
                    }
                }
                catch (ex) {
                    progressBar.destroy();
                    clearInterval(progressTimer);
                    progressTimer = null;
                    flexygo.msg.error('_export.error');
                }
            }
            exports.exportList = exportList;
            /**
            * Generates print an report menu
            * @function                       printListMenu
            * @param {string} objectname  Object name.
            * @param {string} objectwhere  Object where.
            * @param {defaults} defaults  defaults
            * @param {JQuery} triggerElement  trigger element.
            * @returns                        This function return nothing.
            */
            function printListMenu(objectname, objectwhere, defaults, triggerElement) {
                var cntMenu = $('flx-contextmenu')[0];
                if (!cntMenu.hideMenu(triggerElement)) {
                    let menuUl;
                    var myObj = $(document).find('flx-nav')[0];
                    menuUl = $('<ul/>');
                    menuUl.append('<li method="print" value="page"><span><i class="flx-icon icon-print" style="margin-right: 6px;"/>' + flexygo.localization.translate('flxmodule.printpage') + '</span></li>');
                    menuUl.append('<li method="print" value="module"><span><i class="flx-icon icon-print" style="margin-right: 6px;"/>' + flexygo.localization.translate('flxmodule.printmodule') + '</span></li>');
                    if (objectname) {
                        let proc = new flexygo.obj.Entity(objectname, objectwhere).processes('', defaults);
                        if (proc.ReportLink && Object.keys(proc.ReportLink.ChildNodes).length > 0) {
                            if (defaults) {
                                for (let itm in proc.ReportLink.ChildNodes) {
                                    proc.ReportLink.ChildNodes[itm].ObjectDefaults = defaults;
                                }
                            }
                            menuUl.append('<li class="separator"></li>');
                            let itm = $('<li method="opensubmenu"><span class="item-closed"><i class="flx-icon icon-report" /><span> ' + flexygo.localization.translate('navigation.reports') + ' </span></li>');
                            menuUl.append(itm);
                            itm.append($(myObj.getChildNodes(flexygo.utils.lowerKeys(proc.ReportLink, true))));
                        }
                    }
                    menuUl.find('li').off('click').on('click', function (event) {
                        if ($(this).attr('method') === 'print') {
                            if ($(this).attr('value') === 'page') {
                                $('#realMain').print();
                            }
                            else if ($(this).attr('value') === 'module') {
                                $('flx-contextmenu')[0].parent.closest('flx-module').print();
                            }
                        }
                    });
                    cntMenu.showMenu(menuUl, triggerElement);
                }
            }
            exports.printListMenu = printListMenu;
        })(exports = ui.exports || (ui.exports = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
//# sourceMappingURL=exports.js.map