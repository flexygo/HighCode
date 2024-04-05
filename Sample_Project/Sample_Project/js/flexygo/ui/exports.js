var flexygo;
(function (flexygo) {
    var ui;
    (function (ui) {
        var exports;
        (function (exports) {
            /**
             * Create export list menu.
             * @function exportListMenu
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
                        const module = $('flx-contextmenu')[0].parent.closest('flx-module')[0];
                        const list_module = module.querySelector('flx-list');
                        if (this.getAttribute('method') !== 'export' || !list_module)
                            return;
                        if (this.getAttribute('format') === 'xls') {
                            showExcelExportModal(objectname, objectwhere, module.moduleName, list_module.templateId, list_module);
                        }
                        else {
                            if (list_module.maxRows <= ExportLimit) {
                                flexygo.ui.exports.exportList($(this).attr('format'), parseInt($(this).attr('maxnumber')), list_module);
                                return;
                            }
                            flexygo.msg.warning(flexygo.localization.translate('_export.exportlimit'));
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
                        const objDef = getDefaults(listToExport);
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
            function showExcelExportModal(objectname, objectwhere, modal_name, template_id, list_element) {
                let histObj = new flexygo.nav.FlexygoHistory();
                histObj.targetid = 'sliderightx60%';
                let modal = flexygo.targets.createContainer(histObj, true, null, true, null);
                if (!modal) {
                    return;
                }
                modal.empty();
                modal.closest('.ui-dialog').find('.ui-dialog-title').html(flexygo.localization.translate('sortmanager.sort'));
                modal.closest('.ui-dialog').find('.ui-dialog-buttonset').attr("style", "float:left");
                modal.append(`<div id="excelExport" modalName="${modal_name}" template_id="${template_id}"></div>`);
                initExcelExport(objectname, objectwhere, modal_name, template_id, list_element);
            }
            exports.showExcelExportModal = showExcelExportModal;
            /**
             * Open an excel export modal that shows every possible printable column
             * @function                                           exportExcelList
             * @param {string} modal_name                          Modal name
             * @param {number} template_id                         Template id
             * @param {flexygo.ui.wc.FlxListElement} list_element  flx-list to export.
             * @returns                                            This function return nothing.
             */
            function initExcelExport(objectname, objectwhere, modal_name, template_id, list_element) {
                let export_modal = $(`#excelExport[modalName="${modal_name}"][template_id="${template_id}"]`);
                let fields_div = $('<div class="exportFields"></div>');
                const fields = list_element.fields;
                for (let key in fields) {
                    fields_div.append(`<div class="clickable" key="${key}">${fields[key]}</div>`);
                }
                fields_div.find('[key]').on('click', field => {
                    const current_field = field.currentTarget;
                    current_field.classList.toggle('inactive');
                });
                export_modal.append(`<h2>${flexygo.localization.translate('excelExport.title')}:</h2>`);
                export_modal.append(fields_div);
                const buttons_row = $(`<span></span>`);
                const export_button = $(`<button class="btn exportExcel"><i class="flx-icon icon-excel margin-right-s"></i><span>${flexygo.localization.translate('excelExport.generate')}</span></button>`);
                const selector_button = $(`<button class="btn deselectall">${flexygo.localization.translate('excelExport.deselectall')}</button>`); //Translate
                export_button.on('click', () => {
                    generateExcelExport(objectname, objectwhere, modal_name, template_id, list_element.additionalWhere, export_button[0]);
                });
                selector_button.on('click', () => {
                    const deselect = selector_button.hasClass('deselectall');
                    const export_fields = fields_div.find('> div');
                    if (deselect) {
                        export_fields.addClass('inactive');
                        selector_button.removeClass('deselectall').addClass('selectall');
                        selector_button.text(flexygo.localization.translate('excelExport.selectall'));
                    }
                    else {
                        export_fields.removeClass('inactive');
                        selector_button.removeClass('selectall').addClass('deselectall');
                        selector_button.text(flexygo.localization.translate('excelExport.deselectall'));
                    }
                });
                buttons_row.append(export_button);
                buttons_row.append(selector_button);
                export_modal.append(buttons_row);
            }
            function generateExcelExport(objectname, objectwhere, module_name, template_id, additional_where, triggerElement) {
                const dialog_div = triggerElement.closest('.ui-dialog');
                const field_divs = dialog_div.querySelectorAll('[key].inactive');
                let inactive_fields = [];
                field_divs.forEach(field_div => {
                    const key = field_div.getAttribute('key');
                    inactive_fields.push(key);
                });
                let params = {
                    ObjectName: objectname,
                    ObjectWhere: objectwhere,
                    ModuleName: module_name,
                    TemplateId: template_id,
                    AdditionalWhere: additional_where,
                    InactiveFields: inactive_fields
                };
                flexygo.ajax.syncPost('~/api/Report', 'GetExcelExport', params, (ret) => {
                    if (ret.Success) {
                        var func = new Function(ret.Link);
                        func.call(ret.Link);
                        dialog_div.querySelector('.ui-dialog-titlebar-close').click();
                        flexygo.msg.success(flexygo.localization.translate('excelExport.generated'));
                    }
                });
            }
            function getDefaults(listToExport) {
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
                return objDef;
            }
        })(exports = ui.exports || (ui.exports = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
//# sourceMappingURL=exports.js.map