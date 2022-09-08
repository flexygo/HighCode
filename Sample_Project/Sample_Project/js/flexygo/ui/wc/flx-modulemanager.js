/**
 * @namespace flexygo.ui.wc
 */
var flexygo;
(function (flexygo) {
    var ui;
    (function (ui_1) {
        var wc;
        (function (wc_1) {
            /**
            * Library for the FlxModuleManagerElement web component.
            *
            * @class FlxModuleManagerElement
            * @constructor
            * @return {FlxModuleManagerElement}
            */
            class FlxModuleManagerElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                    * Set when component is attached to DOM
                    * @property connected {boolean}
                    */
                    this.connected = true;
                    this.pagename = null;
                    this.objectname = null;
                    this.layoutname = null;
                    this.modTemplate = null;
                    //Set in develop.ts
                    this.targetItem = null;
                }
                connectedCallback() {
                    let element = $(this);
                    this.connected = true;
                    this.pagename = element.attr('PageName');
                    this.objectname = element.attr('ObjectName');
                    //Capture events from module or page module updating
                    flexygo.events.on(this, "entity", "all", this.onModuleChanged);
                    this.init();
                }
                static get observedAttributes() {
                    return [];
                }
                disconnectedCallback() {
                    flexygo.events.off(this, "entity", "all", this.onModuleChanged);
                }
                attributeChangedCallback(attrName, oldVal, newVal) {
                }
                init() {
                    this.refresh();
                }
                onModuleChanged(e) {
                    if (e.type == "inserted" || e.type == "updated") {
                        let entity = e.sender;
                        let me = $(this);
                        if (entity.objectName.toLowerCase() === 'sysmodule' || entity.objectName.toLowerCase() === 'syspagemodule') {
                            if (entity.objectName.toLowerCase() == 'syspagemodule') {
                                let val = entity.data.RelationWhere.Value;
                                if (val == null || val == '') {
                                    me.find('li[data-id="' + entity.data.ModuleName.Value + '"]').find('.relationwhere').removeClass('selected');
                                }
                                else {
                                    me.find('li[data-id="' + entity.data.ModuleName.Value + '"]').find('.relationwhere').addClass('selected');
                                }
                            }
                            else if (entity.objectName.toLowerCase() == 'sysmodule') {
                                this.updateModule(entity);
                            }
                            //form.closest('.ui-dialog').remove();
                            $(document).find('flx-edit[objectname="' + entity.objectName + '"]').closest('.ui-dialog').remove();
                        }
                    }
                }
                refresh() {
                    let me = $(this);
                    let obj = new flexygo.obj.Entity('sysLayouts');
                    this.layouts = obj.getView();
                    let container = $('<div class="moduleManager" />');
                    me.html(container);
                    container.append('<div id="layoutList" class="col-12 nopadding"/>');
                    container.append('<div class="layoutPanelOutside col-8"><div id="layoutPanel"></div></div>');
                    container.append('<div id="modulePanel" class="col-4"><div class="searchPanel"><flx-text class="searchInput" placeholder="' + flexygo.localization.translate('modulemanager.searchmodules') + '" iconclass="flx-icon icon-search" allowNewObject="sysModule" /></div><div style="clear:both"></div><div id="moduleList"><ul class="connectedSortable"></ul></div></div>');
                    container.append('<div id="bottomToolbar"><button class="btn btn-default bg-info saveButton"><i class="flx-icon icon-save"></i> ' + flexygo.localization.translate('modulemanager.save') + '</button> <button class="btn btn-default bg-danger closeButton"><i class="flx-icon icon-remove"></i> ' + flexygo.localization.translate('modulemanager.cancel') + '</button></div>');
                    this.loadLayoutPanel();
                    this.loadNodes();
                    this.loadCurrentPage();
                    let btn = $('<button class="btn btn-default" type="button"><i class="flx-icon icon-open-in-new-window"></i></button>');
                    container.find('.searchInput .input-group-btn').prepend(btn);
                    btn.on('click', (e) => {
                        this.addTabModule();
                    });
                    me.find('.searchPanel flx-text').on('keyup', (e) => {
                        var allModules = me.find('#moduleList li[data-descrip]');
                        if ($(e.currentTarget).val() == null || $(e.currentTarget).val() == '') {
                            allModules.show();
                        }
                        else {
                            allModules.hide();
                            var filterValue = $(e.currentTarget).val().toLowerCase();
                            var fModules = allModules.filter(function () {
                                return $(this).attr('data-descrip').toLowerCase().indexOf(filterValue) > -1;
                            });
                            fModules.show();
                        }
                    });
                    me.find('#bottomToolbar .saveButton').on('click', (e) => {
                        this.saveModuleConfig();
                    });
                    me.find('#bottomToolbar .closeButton').on('click', (e) => {
                        $(e.currentTarget).closest('.ui-dialog').remove();
                    });
                    setTimeout('$("#layoutList").mCustomScrollbar({axis:"x", theme: "dark", autoHideScrollbar: true});$("#moduleList").mCustomScrollbar({autoHideScrollbar: true})', 500);
                    //Capture events from module or page module updating
                    //$(document).off('insert.module update.module');
                    //$(document).on('insert.module update.module', function (evName, entity, form) {
                    //    if (entity.objectName.toLowerCase() == 'syspagemodule') {
                    //        let val = entity.data.RelationWhere.Value;
                    //        if (val == null || val== '') {
                    //            ctx.webControl.find('li[data-id="'+entity.data.ModuleName.Value+'"]').find('.relationwhere').removeClass('selected');
                    //        }else{
                    //            ctx.webControl.find('li[data-id="' + entity.data.ModuleName.Value + '"]').find('.relationwhere').addClass('selected');
                    //        } 
                    //    } else if (entity.objectName.toLowerCase() == 'sysmodule') {
                    //        ctx.updateModule(entity, form);
                    //    }
                    //    form.closest('.ui-dialog').remove();
                    //})
                }
                addTabModule() {
                    let moduleContent = $('<form class="tabForm"/>');
                    moduleContent.append('<div><flx-text prop="Identifier" type="ident" required placeholder="' + flexygo.localization.translate('modulemanager.tabid') + '"></flx-text></div>');
                    moduleContent.append('<div><flx-text prop="Title" type="text" required placeholder="' + flexygo.localization.translate('modulemanager.tabtitle') + '"></flx-text></div>');
                    moduleContent.append('<div><flx-text prop="Descrip" type="text" required placeholder="' + flexygo.localization.translate('modulemanager.tabdescrip') + '"></flx-text></div>');
                    moduleContent.append('<div><flx-dbcombo class="item-float" prop="IconName" objectname="sysObject" required prop="pageIcon" placeholder="' + flexygo.localization.translate('modulemanager.selecttabicon') + '" viewname="iconsView"  PageSize="50" sqlvaluefield="IconName" sqldisplayfield="IconName" ><template><i class=" txt-outstanding {{CSSClass}} icon-2x icon-margin" title="{{IconName}}" style="widht: 20px"></i></template></flx-dbcombo></div>');
                    moduleContent.append('<div><flx-dbcombo prop="ClassId" objectname="sysModule" required viewname="sysModuleClasses" sqlvaluefield="ClassId" sqldisplayfield="Descrip" placeholder="' + flexygo.localization.translate('modulemanager.classification') + '"></flx-dbcombo></div>');
                    moduleContent.append('<div><flx-dbcombo prop="TabMode" objectname="sysModule" required viewname="sysTabModes" sqlvaluefield="TypeId" sqldisplayfield="Descrip" placeholder="' + flexygo.localization.translate('modulemanager.tabMode') + '"></flx-dbcombo></div>');
                    moduleContent.append('<button required class="SaveTabModule btn btn-default bg-info saveButton"><i class="flx-icon icon-save"></i> ' + flexygo.localization.translate('modulemanager.save') + '</button>');
                    Lobibox.window({
                        title: flexygo.localization.translate('modulemanager.addnewtabmodule'),
                        content: moduleContent
                    });
                    $('.tabForm').validate({
                        ignore: '',
                        unhighlight: (element, errorClass, validClass) => {
                            $(element).parent().addClass('has-success').removeClass('has-error');
                        },
                        highlight: (element, errorClass, validClass) => {
                            $(element).parent().removeClass('has-success').addClass('has-error');
                        },
                        errorPlacement: (error, element) => {
                            error.insertAfter($(element).parent()[0]);
                        },
                        errorClass: 'txt-danger'
                    });
                    $('.SaveTabModule').on('click', (event) => {
                        if ($('.tabForm').valid()) {
                            event.stopPropagation();
                            event.preventDefault();
                            let newTab = new flexygo.obj.Entity('sysModule');
                            newTab.read();
                            //TODO add button tab
                            //newTab.data.TypeId.Value = 'flx-moduletab';
                            newTab.data.TypeId.Value = $('.tabForm [prop="TabMode"]').val();
                            newTab.data.ModuleName.Value = $('.tabForm [prop="Identifier"]').val();
                            newTab.data.ClassId.Value = $('.tabForm [prop="ClassId"]').val();
                            newTab.data.Descrip.Value = $('.tabForm [prop="Descrip"]').val();
                            newTab.data.Title.Value = $('.tabForm [prop="Title"]').val();
                            newTab.data.IconName.Value = $('.tabForm [prop="IconName"]').val();
                            newTab.data.ContainerId.Value = 'default';
                            newTab.data.CollapsibleButton.Value = true;
                            newTab.data.FullscreenButton.Value = true;
                            newTab.data.RefreshButton.Value = true;
                            if (newTab.insert()) {
                                $(event.currentTarget).closest('.lobibox-window').find('.btn-close').click();
                                this.updateModule(newTab);
                            }
                        }
                    });
                }
                updateModule(module, form) {
                    let me = $(this);
                    let mod = me.find('li[data-id="' + module.data.ModuleName.Value + '"]');
                    let list = me.find('#moduleList ul:first');
                    if (mod.length == 0) {
                        let newMod = $(flexygo.utils.parser.compile(module.data, this.modTemplate, flexygo));
                        newMod.hide().find('.box-primary').addClass('new');
                        list.prepend(newMod);
                        this.setActionButtons(newMod);
                        if (newMod.is('.tabItem')) {
                            this.setSorting(newMod.find('.connectedSortable'));
                        }
                        newMod.show(500);
                    }
                }
                saveModuleConfig() {
                    let me = $(this);
                    let layoutPositons = me.find('.module-placeholder');
                    let pageModules = new Array();
                    //recalc tab order
                    let tabs = $('.moduleTab>ul');
                    tabs.each((i, e) => {
                        let listitems = $(e).children('li');
                        listitems.each((index, listel) => {
                            $(listel).attr('tabOrder', index);
                        });
                    });
                    for (let jL = 0; jL < layoutPositons.length; jL++) {
                        let modules = $(layoutPositons[jL]).find('.moduleItem');
                        let order = 0;
                        for (let i = 0; i < modules.length; i++) {
                            let myMod = $(modules[i]);
                            let tabName = null;
                            let tabOrder = null;
                            if (myMod.parent().closest('.tabItem').length > 0) {
                                tabName = myMod.parent().closest('.tabItem').attr('data-id');
                                tabOrder = myMod.attr('tabOrder');
                            }
                            pageModules.push({ ModuleName: myMod.attr('data-id'), LayoutPositionId: this.getModulePosition(myMod), RelationWhere: myMod.find('.relwhere').html(), Order: order, TabName: tabName, TabOrder: tabOrder });
                            order++;
                        }
                    }
                    let params = new flexygo.api.pages.savePageConfigParams();
                    params.PageName = this.pagename;
                    params.ObjectName = this.objectname || null;
                    params.LayoutName = this.layoutname;
                    params.Modules = pageModules;
                    flexygo.ajax.post('~/api/Page', 'SavePageConfig', params, (ret) => {
                        me.closest('.ui-dialog').remove();
                        let wc = $('#mainSidePanel')[0];
                        wc.hidePanels();
                        flexygo.history.refresh(this.targetItem);
                    });
                }
                loadCurrentPage() {
                    let me = $(this);
                    let params = {
                        pageName: this.pagename
                    };
                    flexygo.ajax.post('~/api/Page', 'GetModuleManagerModules', params, (ret) => {
                        me.find('#layoutList img[data-id="' + ret.LayoutName + '"]').click();
                        let arrOrdered = flexygo.utils.sortObject(ret.Modules, 'Order');
                        for (let key in arrOrdered) {
                            let mod = arrOrdered[key];
                            let item = me.find('#moduleList li[data-id="' + mod.ModuleName + '"]');
                            item.detach();
                            item.find('.box-primary').removeClass('box-primary').addClass('bg-primary');
                            item.find('.relwhere').html(mod.RelationWhere);
                            if (mod.Events && Object.keys(mod.Events).length > 0) {
                                item.find('.events').addClass('selected');
                            }
                            if (mod.RelationWhere && mod.RelationWhere != '') {
                                item.find('.relationwhere').addClass('selected');
                            }
                            if (mod.TabName != '') {
                                item.attr('tabOrder', mod.TabOrder);
                                me.find('[data-id="' + mod.TabName + '"]>div>.moduleTab>ul').append(item);
                            }
                            else {
                                me.find('.' + mod.LayoutPositionId + '>ul').append(item);
                            }
                        }
                        //Sort tab modules
                        let tabs = $('.moduleTab>ul');
                        tabs.each((i, e) => {
                            let mylist = $(e);
                            let listitems = mylist.children('li').get();
                            listitems.sort((a, b) => {
                                let compA = parseInt($(a).attr('tabOrder'));
                                let compB = parseInt($(b).attr('tabOrder'));
                                return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
                            });
                            $.each(listitems, (idx, itm) => {
                                mylist.append(itm);
                            });
                        });
                    });
                }
                loadLayoutPanel() {
                    let me = $(this);
                    let pageLayout = me.find('#layoutPanel');
                    let layoutList = me.find('#layoutList');
                    for (let i = 0; i < this.layouts.length; i++) {
                        layoutList.append(flexygo.utils.parser.compile(this.layouts[i], '<img src="{{utils.resolveUrl(ImagePath)}}" data-id="{{LayoutName}}" title="{{LayoutDescrip}}" />', flexygo));
                    }
                    layoutList.find('img').on('click', (e) => {
                        let img = $(e.currentTarget);
                        layoutList.find('img').removeClass('selected');
                        img.addClass('selected');
                        let newTemplate;
                        for (let i = 0; i < this.layouts.length; i++) {
                            if (this.layouts[i].LayoutName == img.attr('data-id')) {
                                newTemplate = $('<div/>').append(this.layouts[i].LayoutTemplate);
                                this.layoutname = this.layouts[i].LayoutName;
                                break;
                            }
                        }
                        newTemplate.find('.module-placeholder').append('<ul style="" class="connectedSortable" />');
                        let modules = me.find('.module-placeholder>ul>li');
                        for (let i = 0; i < modules.length; i++) {
                            let myMod = $(modules[i]);
                            let modulePosition = this.getModulePosition(myMod);
                            myMod.detach();
                            if (newTemplate.find('.' + modulePosition).length > 0) {
                                newTemplate.find('.' + modulePosition + ' ul:not(.connectedTab)').append(myMod);
                            }
                            else {
                                newTemplate.find('.TopPosition ul:not(.connectedTab)').append(myMod);
                            }
                        }
                        pageLayout.html(newTemplate.html());
                        pageLayout.append('<div style="clear:both"></div>');
                        this.setActionButtons(pageLayout.find('li'));
                        this.setSorting(me.find(".connectedSortable"));
                    });
                }
                loadNodes() {
                    let me = $(this);
                    let obj = new flexygo.obj.Entity('sysModules');
                    //TODO button Tab
                    this.modTemplate = '<li data-id="{{ModuleName}}" data-descrip="{{Descrip|string:lower}}" class="moduleItem nolist {{TypeId|switch:[flx-moduletab:tabItem,flx-buttontab:tabItem,else:null]}}">';
                    this.modTemplate += '<div class="box-primary">';
                    this.modTemplate += '<div class="buttonList">{{TypeId|switch:[flx-moduletab:<i title="Expand tab content" class="flx-icon icon-open-in-new-window tabButton"></i>,flx-buttontab:<i title="Expand tab content" class="flx-icon icon-open-in-new-window tabButton"></i>,else:null]}}';
                    this.modTemplate += '<i title="' + flexygo.localization.translate('modulemanager.security') + '" class="flx-icon icon-group-security security"></i>';
                    this.modTemplate += '<i title="' + flexygo.localization.translate('modulemanager.events') + '" class="flx-icon icon-wifi events"></i>';
                    this.modTemplate += '<i title="' + flexygo.localization.translate('modulemanager.changepagerelation') + '" class="flx-icon icon-project relationwhere"></i>';
                    this.modTemplate += '<i title="' + flexygo.localization.translate('modulemanager.configmodule') + '" class="flx-icon icon-settings configure"></i>';
                    this.modTemplate += '<i title="' + flexygo.localization.translate('modulemanager.removemodule') + '" class="flx-icon icon-remove remove"></i>';
                    this.modTemplate += '</div>';
                    this.modTemplate += '<div class="listDescrip"><i title="{{TypeDescrip}}" class="{{TypeIconClass}} icon-lg"></i> <span class="modDesc">{{Descrip}}</span><span class="hidden relwhere"></span></div>{{TypeId|switch:[flx-moduletab:<div class="moduleTab" ><ul class="connectedTab connectedSortable"></ul></div>,flx-buttontab:<div class="moduleTab" ><ul class="connectedTab connectedSortable"></ul></div>,else:null]}}';
                    this.modTemplate += '</li>';
                    this.modules = obj.getView('sysModuleExtended');
                    let list = me.find('#moduleList ul');
                    list.empty();
                    for (let i = 0; i < this.modules.length; i++) {
                        list.append(flexygo.utils.parser.compile(this.modules[i], this.modTemplate, flexygo));
                    }
                    this.setActionButtons(list.find('li'));
                    this.setSorting(me.find(".moduleTab>ul.connectedSortable"));
                }
                setSorting(itms) {
                    let me = $(this);
                    itms.sortable({
                        appendTo: "BODY",
                        zIndex: 999999,
                        helper: "clone",
                        connectWith: ".connectedSortable",
                        stop: (event, ui) => {
                            let itm = $(ui.item);
                            if (itm.closest('#layoutPanel').length > 0) {
                                itm.find('.box-primary,.box-warning').removeClass('box-primary').removeClass('box-warning').addClass('bg-primary');
                            }
                            else {
                                itm.find('.bg-primary').removeClass('bg-primary').addClass('box-warning');
                                if (itm.is('.tabItem')) {
                                    let items = itm.find('.moduleItem');
                                    items.each((i, e) => {
                                        let inItem = $(e);
                                        inItem.detach();
                                        me.find('#moduleList ul:first').prepend(inItem);
                                    });
                                }
                            }
                        },
                        start: (event, ui) => {
                            let itm = $(ui.item);
                            if (itm.is('.tabItem')) {
                                itm.find('.moduleTab').hide();
                                setTimeout(() => { $('.ui-sortable-helper').find('.moduleTab').hide(); }, 100);
                            }
                        }
                    }).disableSelection();
                }
                setActionButtons(items) {
                    let me = $(this);
                    items.find('.buttonList .remove').on('click', (e) => {
                        let itm = $(e.currentTarget).closest('li');
                        itm.hide();
                        itm.detach();
                        itm.find('.bg-primary').removeClass('bg-primary').addClass('box-warning');
                        me.find('#moduleList ul').prepend(itm);
                        if (itm.is('.tabItem')) {
                            let items = itm.find('.moduleItem');
                            items.each((i, el) => {
                                let inItem = $(el);
                                inItem.detach();
                                me.find('#moduleList ul:first').prepend(inItem);
                            });
                        }
                        itm.show(500);
                    });
                    items.find('.buttonList .configure').on('click', (e) => {
                        flexygo.nav.openPage('edit', 'sysModule', "Modules.moduleName='" + $(e.currentTarget).closest('li').attr('data-id') + "'", null, 'popup', true);
                    });
                    items.find('.buttonList .events').on('click', (e) => {
                        let modulename = $(e.currentTarget).closest('li').attr('data-id');
                        flexygo.nav.openPage('list', 'sysModuleEvents', "Modules_Events.moduleName='" + modulename + "'", '{\'ModuleName\':\'' + modulename + '\'}', 'popup', true);
                    });
                    items.find('.buttonList .security').on('click', (e) => {
                        flexygo.nav.openPageName('syspage-generic-modulesecurity', 'sysModule', "Modules.moduleName='" + $(e.currentTarget).closest('li').attr('data-id') + "'", 'null', 'popup', false, $(e.currentTarget));
                    });
                    items.find('.buttonList .relationwhere').on('click', (e) => {
                        // var myFilter = $(this).closest('li').find('.relwhere');
                        // flexygo.msg.prompt('Additional filter', 'This sentence add an aditional filter to the module only in this page', function (val) { myFilter.html(val); if(val==''){myFilter.closest('li[data-id]').find('.relationwhere').removeClass('selected')}else{myFilter.closest('li[data-id]').find('.relationwhere').addClass('selected')} }, 'Type an SQL Filter', myFilter.html(), 4);
                        flexygo.nav.openPage('edit', 'sysPageModule', "moduleName='" + $(e.currentTarget).closest('li').attr('data-id') + "' and PageName='" + this.pagename + "'", null, 'popup', true);
                    });
                    items.find('.buttonList>.tabButton').on('click', (e) => {
                        $(e.currentTarget).closest('li').find('div>.moduleTab:first').toggle(500);
                    });
                }
                getModulePosition(module) {
                    let classes = module.closest('.module-placeholder')[0].className.split(/\s+/);
                    for (let i = 0; i < classes.length; i++) {
                        if (classes[i].toLowerCase().indexOf('position') != -1) {
                            return classes[i];
                        }
                    }
                    return 'TopPosition';
                }
            }
            wc_1.FlxModuleManagerElement = FlxModuleManagerElement;
        })(wc = ui_1.wc || (ui_1.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-modulemanager', flexygo.ui.wc.FlxModuleManagerElement);
//# sourceMappingURL=flx-modulemanager.js.map