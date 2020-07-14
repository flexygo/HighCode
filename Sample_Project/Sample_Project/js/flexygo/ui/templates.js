var flexygo;
(function (flexygo) {
    var ui;
    (function (ui) {
        var templates;
        (function (templates) {
            class ObjectTemplateCache {
            }
            templates.ObjectTemplateCache = ObjectTemplateCache;
            function templateList(objectname, module, btn) {
                let wc = module.find('flx-list,flx-view,flx-edit')[0];
                flexygo.ui.templates.showTemplateList(btn, wc);
            }
            templates.templateList = templateList;
            function showTemplateList(btn, ctx) {
                var cntMenu = $('flx-contextmenu')[0];
                if (!cntMenu.hideMenu(btn)) {
                    let menuUl = $('<ul/>');
                    for (let key in ctx.templateList) {
                        menuUl.append(flexygo.ui.templates.getListTemplateNode(ctx.templateList[key], key, true, ctx));
                    }
                    for (let key in ctx.viewList) {
                        menuUl.append(flexygo.ui.templates.getListTemplateNode(ctx.viewList[key], key, false, ctx));
                    }
                    //add New template Button
                    menuUl.append(flexygo.ui.templates.addNewTemplateNode(ctx.childname));
                    cntMenu.showMenu(menuUl, btn);
                }
            }
            templates.showTemplateList = showTemplateList;
            function getListTemplateNode(template, key, isTemplate, ctx) {
                let nNode = null;
                if (isTemplate) {
                    nNode = $('<li><span><i class="flx-icon icon-properties-relations" /> ' + template + '</span></li>').attr('templateId', key);
                    if (ctx.templateId == key) {
                        nNode.addClass('active');
                    }
                }
                else {
                    nNode = $('<li><span><i class="flx-icon icon-bullet-list" /> ' + template + '</span></li>').attr('templateId', key);
                    if (ctx.viewId == key && ctx.templateId == 'generic') {
                        nNode.addClass('active');
                    }
                }
                nNode.on('click', (e) => {
                    let template = { isTemplate: isTemplate, value: key };
                    flexygo.ui.templates.saveDefaultTemplate(ctx.getModuleFullId(), template);
                    ctx.init();
                });
                return nNode;
            }
            templates.getListTemplateNode = getListTemplateNode;
            function addNewTemplateNode(objectname) {
                let nNode = null;
                nNode = $('<li class="separator develop-only"></li><li class="develop-only"><span><i class="flx-icon icon-admon" />' + flexygo.localization.translate('templates.addnewtemplate') + '</span></li>');
                nNode.on('click', (e) => {
                    flexygo.nav.openPage('edit', 'sysObjectTemplate', '', { ObjectName: objectname }, 'popup', false);
                });
                return nNode;
            }
            templates.addNewTemplateNode = addNewTemplateNode;
            function setDefaultTemplate(ctx) {
                let activeTemplates = flexygo.storage.local.get('activeTemplates');
                if (activeTemplates && ctx.moduleName != null) {
                    let key = ctx.getModuleFullId();
                    if (typeof activeTemplates[key] != 'undefined') {
                        if (activeTemplates[key].isTemplate) {
                            ctx.templateId = activeTemplates[key].value;
                            ctx.viewId = '';
                            ctx.templateKey = 'tpl-' + activeTemplates[key].value;
                        }
                        else {
                            ctx.viewId = activeTemplates[key].value;
                            ctx.templateId = '';
                            ctx.templateKey = 'view-' + activeTemplates[key].value;
                        }
                    }
                }
            }
            templates.setDefaultTemplate = setDefaultTemplate;
            function saveDefaultTemplate(key, template) {
                if (template != null) {
                    let activeTemplates = flexygo.storage.local.get('activeTemplates');
                    if (activeTemplates == null) {
                        activeTemplates = new Object();
                    }
                    activeTemplates[key] = template;
                    flexygo.storage.local.add('activeTemplates', activeTemplates);
                }
            }
            templates.saveDefaultTemplate = saveDefaultTemplate;
            function showSortManager(objectname, module, btn) {
                let histObj = new flexygo.nav.FlexygoHistory();
                if (flexygo.utils.isSizeMobile()) {
                    histObj.targetid = 'modal';
                }
                else {
                    histObj.targetid = 'modal600x640';
                }
                let buttons = [
                    {
                        name: "apply",
                        text: flexygo.localization.translate('sortmanager.apply'),
                        class: "btn btn-default bg-success",
                        click: function () { $(this).closest('.ui-dialog').find('flx-sortmanager')[0].apply(); }
                    },
                    {
                        name: "delete",
                        text: flexygo.localization.translate('sortmanager.clean'),
                        class: "btn btn-default bg-danger",
                        click: function () { $(this).closest('.ui-dialog').find('flx-sortmanager')[0].clean(); }
                    }
                ];
                let modal = flexygo.targets.createContainer(histObj, true, null, true, buttons);
                modal.empty();
                modal.closest('.ui-dialog').find('.ui-dialog-title').html(flexygo.localization.translate('sortmanager.sort'));
                modal.closest('.ui-dialog').find('.ui-dialog-buttonset').attr("style", "float:left");
                modal.append('<flx-sortmanager></flx-filtermanager>');
                let manager = modal.find('flx-sortmanager')[0];
                manager.init(module);
            }
            templates.showSortManager = showSortManager;
            function iconCategoryFilter(e) {
                $(e).toggleClass('txt-info bg-warning');
                let selected = $(e).closest('.iconlist').find('.bg-warning');
                let modFilter = [];
                for (let i = 0; i < selected.length; i++) {
                    modFilter.push("'" + $(selected[i]).text() + "'");
                }
                var listMod = $('#mod-sysmod-list-icons')[0];
                if (modFilter.length == 0) {
                    listMod.additionalWhere = null;
                }
                else {
                    listMod.additionalWhere = 'Icons.Category in (' + modFilter.join(',') + ')';
                }
                listMod.refresh();
            }
            templates.iconCategoryFilter = iconCategoryFilter;
        })(templates = ui.templates || (ui.templates = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
//# sourceMappingURL=templates.js.map