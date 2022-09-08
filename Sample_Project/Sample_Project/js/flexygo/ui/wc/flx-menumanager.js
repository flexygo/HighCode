/**
 * @namespace flexygo.ui.wc
 */
var flexygo;
(function (flexygo) {
    var ui;
    (function (ui) {
        var wc;
        (function (wc) {
            class LoadMenusParams {
            }
            wc.LoadMenusParams = LoadMenusParams;
            class NavigationMenu {
            }
            wc.NavigationMenu = NavigationMenu;
            //Definicion de la clase devuelta por el merodo toHierarchy del nestedsortable
            class HierarchicalMenu {
            }
            wc.HierarchicalMenu = HierarchicalMenu;
            /**
            * Library for the FlxMenuManagerElement web component.
            *
            * @class FlxMenuManagerElement
            * @constructor
            * @return {FlxMenuManagerElement}
            */
            class FlxMenuManagerElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                    * Set when component is attached to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                    this.method = null;
                    this.deleteMethod = "DeleteMenu";
                    this.relocateMethod = "RelocateMenu";
                    this.getMetod = "GetAppMenus";
                    this.openMenus = null;
                    this.scrollY = 0;
                    this.sortableList = null;
                    //Nota: para que el metodo toArray del nestedsortable devuelva valores correctamente, los elementos de la lista deben tener un id con _
                    this.template = `<li id="fgnsli_{{MenuId}}" strType="{{TypeId}}">
                <div>
                    <div>
                        <i class="flx-icon {{IconClass|isnull:icon-menu,{{IconClass}}}}"/>
                        <span>{{Title}} <small>({{strType}})</small></span>
                    </div>
                    <div class="btn-panel reduced">
                        <i class="flx-icon icon-plus {{strType}}" data-action="add" data-toggle="tooltip" title="${flexygo.localization.translate('menumanager.newsubmenu')}"/>
                        <i class="flx-icon icon-order-down-2 {{strType}}" data-action="toggle" data-toggle="tooltip" title="${flexygo.localization.translate('menumanager.submenus')}"/>
                        <i class="flx-icon icon-pencil" data-action="edit" data-toggle="tooltip" title="${flexygo.localization.translate('menumanager.edit')}"/>
                        <i class="flx-icon icon-delete-2" data-action="del" data-toggle="tooltip" title="${flexygo.localization.translate('menumanager.delete')}"/>
                        <i class="flx-icon icon-more" data-action="more" data-toggle="tooltip" title="${flexygo.localization.translate('menumanager.moreoptions')}"/>
                    </div>
                </div>
                <div class="row editMenu collapse" id="Menu{{MenuId}}" MenuId="{{MenuId}}"/>
                <!--{{getChildMenus(json)}}-->
            </li>`;
                    this.emptyTemplate = `<div class="empty-info">
            <span>${flexygo.localization.translate('menumanager.empty')}</span>
            <i class="flx-icon icon-arrow-3"></i>
         </div>`;
                }
                /**
               * Fires when element is attached to DOM
               * @method connectedCallback
               */
                connectedCallback() {
                    let element = $(this);
                    this.connected = true;
                    let AppName = element.attr("AppName");
                    if (AppName) {
                        this.method = this.getMetod;
                        this.methodParams = { AppName: AppName };
                        this.appName = AppName;
                    }
                    this.init();
                }
                /**
                * Init menu manager
                * @method init
                */
                init() {
                    this.loadMenus();
                }
                refresh() {
                    this.loadMenus();
                }
                loadMenus() {
                    $(this).find('[data-toggle="tooltip"]').tooltip('destroy');
                    $(this).empty();
                    flexygo.ajax.post('~/api/MenuManager', this.method, this.methodParams, (response) => {
                        let arrOrdered = this.sortMenus(flexygo.utils.lowerKeys(response, true), "order");
                        $(this).html('<div class="managerpanel"></div>');
                        this.loadMenusRet(arrOrdered);
                    });
                }
                renderNode(id, ret) {
                    let nodes = $('<ul class="sortable"></ul>');
                    for (let i = 0; i < ret.length; i++) {
                        if (id == ret[i].parentmenuid) {
                            let node;
                            node = $(flexygo.utils.parser.recursiveCompile(ret[i], this.template));
                            let childNodes = this.renderNode(ret[i].menuid, ret);
                            if (childNodes) {
                                node.append(childNodes);
                            }
                            nodes.append(node);
                        }
                    }
                    if (nodes.children().length > 0) {
                        return nodes;
                    }
                    else {
                        return null;
                    }
                }
                loadMenusRet(ret) {
                    let nodes = this.renderNode(null, ret);
                    let me = $(this);
                    let newbutton = `<div class="managerbuttons">
                                        <span><i class="flx-icon icon-clear"/>${flexygo.localization.translate('menumanager.menus')}</span>
                                        <div>
                                        <i data-action="refresh" class="flx-icon icon-refresh"  data-toggle="tooltip" title="${flexygo.localization.translate('menumanager.refresh')}"/>
                                        <i data-action="addnew" class="flx-icon icon-plus-1"  data-toggle="tooltip" title="${flexygo.localization.translate('menumanager.new')}"/>
                                        </div>
                                    </div>`;
                    me.find('.managerpanel').append(newbutton);
                    me.find('.managerpanel').append(nodes);
                    me.find('.managerpanel').append(this.emptyTemplate);
                    this.sortableList = me.find('.sortable');
                    this.sortableList.nestedSortable({
                        forcePlaceholderSize: true,
                        listType: 'ul',
                        handle: 'div',
                        helper: 'clone',
                        items: 'li',
                        opacity: .6,
                        placeholder: 'placeholder',
                        revert: 250,
                        tabSize: 25,
                        tolerance: 'pointer',
                        toleranceElement: '> div',
                        maxLevels: 0,
                        isTree: false,
                        expandOnHover: 700,
                        startCollapsed: false,
                        protectRoot: true,
                        relocate: (e, f) => {
                            //console.log('Relocated item', e, f);
                            //La expresion es necesaria para no truncar ids negativos
                            let Menus = this.sortableList.nestedSortable('toHierarchy', { expression: (/(.+)[_](.+)/) });
                            let Menuid = f.item.attr('id');
                            Menuid = Menuid.substring(Menuid.indexOf('_') + 1);
                            let params = this.findMenu(Menus, Menuid);
                            if (params) {
                                flexygo.ajax.post('~/api/MenuManager', this.relocateMethod, params, (response) => {
                                    //this.refreshNavBar();
                                });
                            }
                        }
                    }).disableSelection();
                    me.find('[data-action="edit"]').on('click', (e) => {
                        if ($(e.currentTarget).hasClass('active')) {
                            $(e.currentTarget).removeClass('active');
                        }
                        else {
                            $(e.currentTarget).addClass('active');
                            me.find('[data-action="add"]').removeClass('active');
                        }
                        this.showEdit($(e.target).closest('li').children('.editMenu'), false);
                    });
                    me.find('[data-action="refresh"]').on('click', (e) => {
                        this.loadMenus();
                    });
                    me.find('[data-action="addnew"]').on('click', (e) => {
                        let param = {
                            appname: this.appName
                        };
                        flexygo.ajax.post('~/api/MenuManager', 'AddNew', param, (response) => {
                            this.loadMenus();
                        });
                    });
                    me.find('[data-action="add"]').on('click', (e) => {
                        if ($(e.currentTarget).hasClass('active')) {
                            $(e.currentTarget).removeClass('active');
                        }
                        else {
                            $(e.currentTarget).addClass('active');
                            me.find('[data-action="edit"]').removeClass('active');
                        }
                        this.showEdit($(e.target).closest('li').children('.editMenu'), true);
                    });
                    me.find('[data-action="toggle"]').on('click', (e) => {
                        let icon = $(e.currentTarget);
                        let opened = icon.hasClass('icon-order-up-2');
                        let content = $(e.currentTarget).closest('li').children('ul').first();
                        if (opened) {
                            content.hide();
                            icon.removeClass('icon-order-up-2 active').addClass('icon-order-down-2');
                        }
                        else {
                            content.show();
                            icon.removeClass('icon-order-down-2').addClass('icon-order-up-2 active');
                        }
                        this.saveMenusState();
                    });
                    me.find('[data-action="del"]').on('click', (e) => {
                        let Menu = $(e.currentTarget).closest('li').children('.editMenu')[0].id;
                        Lobibox.confirm({
                            title: flexygo.localization.translate('menumanager.deleteMenu'),
                            msg: flexygo.localization.translate('menumanager.deleteMenuquestion'),
                            iconClass: '',
                            callback: (dlg, type, ev) => {
                                if (type == "yes") {
                                    this.deleteMenu(Menu);
                                }
                            }
                        });
                    });
                    let timeout;
                    me.find('[data-action="more"]').on('click', (e) => {
                        let subMenuButtons = $(e.currentTarget).closest('div').find('i.Text');
                        if ($(e.currentTarget).hasClass('active')) {
                            $(e.currentTarget).removeClass('active');
                            if (subMenuButtons.length > 0)
                                $(e.currentTarget).closest('.btn-panel').removeClass('show-all');
                            else
                                $(e.currentTarget).closest('.btn-panel').removeClass('show-half');
                            clearTimeout(timeout);
                        }
                        else {
                            $(e.currentTarget).addClass('active');
                            if (subMenuButtons.length > 0)
                                $(e.currentTarget).closest('.btn-panel').addClass('show-all');
                            else
                                $(e.currentTarget).closest('.btn-panel').addClass('show-half');
                            timeout = setTimeout(function () {
                                $(e.currentTarget).removeClass('active');
                                $(e.currentTarget).closest('.btn-panel').removeClass('show-all');
                            }, 8000);
                        }
                    });
                    $(this).find('[data-toggle="tooltip"]').tooltip({ container: 'body', trigger: 'hover', delay: { show: 600, hide: 0 } });
                }
                showEdit(placeHolder, isNewMenu) {
                    if (placeHolder.hasClass('in') && placeHolder.attr('isnewmenu') === isNewMenu.toString()) {
                        placeHolder.collapse('hide');
                        placeHolder.closest('li').find('> div:first-child').removeClass('active');
                        this.sortableList.sortable("enable");
                        placeHolder.empty();
                        placeHolder.removeAttr('isnewmenu');
                        //Clear edit module areyousure event handler
                        let btnClose = placeHolder.closest('.ui-dialog').find('.ui-dialog-titlebar-close');
                        if (btnClose.length > 0) {
                            let dlg = placeHolder.closest("main.pageContainer");
                            dlg.off("dialogbeforeclose");
                        }
                        return;
                    }
                    else {
                        placeHolder.closest('li').find('> div:first-child').addClass('active');
                        placeHolder.collapse('hide');
                        flexygo.events.off(placeHolder, 'module', 'loaded');
                        flexygo.events.on(placeHolder, 'module', 'loaded', (e) => {
                            if (e.context = placeHolder) {
                                setTimeout(() => {
                                    placeHolder.collapse('show');
                                }, 100); /*0*/
                                flexygo.events.off(placeHolder, 'module', 'loaded');
                            }
                        });
                        this.sortableList.sortable("disable");
                        let editModuleName = 'sysmod-edit-generic';
                        let containerTemplate = '<div class="cntBody nopadding size-xs"></div><div class="cntBodyFooter"></div>';
                        let container = $('<flx-module class="MenuEdit"/>').html(containerTemplate).attr('modulename', editModuleName).attr('type', 'flx-edit').addClass('empty');
                        placeHolder.attr('isnewmenu', isNewMenu.toString());
                        placeHolder.empty();
                        placeHolder.append(container);
                        let module = null;
                        let parent = placeHolder.attr('Menuid');
                        if (isNewMenu === true) {
                            let objDef = {
                                parentmenuid: parent,
                                appname: this.appName
                            };
                            let strobjDef = JSON.stringify(objDef);
                            module = $('<flx-edit />').attr('ObjectName', 'sysOfflineMenu').attr('defaults', strobjDef).attr('modulename', editModuleName);
                            flexygo.events.on(this, "entity", "all", (e) => {
                                flexygo.events.off(this, "entity", "all");
                                if (e.type === "inserted") {
                                    this.saveMenusState();
                                    //Clear edit module areyousure event handler
                                    let btnClose = placeHolder.closest('.ui-dialog').find('.ui-dialog-titlebar-close');
                                    if (btnClose.length > 0) {
                                        let dlg = placeHolder.closest("main.pageContainer");
                                        dlg.off("dialogbeforeclose");
                                    }
                                    flexygo.ajax.post('~/api/MenuManager', this.getMetod, null, (response) => {
                                        this.loadMenus();
                                        //this.refreshNavBar();
                                    });
                                }
                            });
                        }
                        else {
                            module = $('<flx-edit />').attr('ObjectName', 'sysOfflineMenu').attr('ObjectWhere', 'Menuid=\'' + placeHolder.attr('Menuid') + '\'').attr('modulename', editModuleName);
                        }
                        container.find('.cntBody').append(module);
                        let ctrl = container[0];
                        ctrl.moduleName = editModuleName;
                        ctrl.canCollapse = true;
                        ctrl.canEnlarge = true;
                        ctrl.canRefresh = true;
                        //ctrl.canClose = false;
                        ctrl.canConfig = false;
                        //ctrl.componentString = "flx-edit";
                        ctrl.init();
                    }
                }
                findMenu(Menus, Menuid, parentid) {
                    let res = null;
                    $.each(Menus, (i, e) => {
                        if (e.id === Menuid) {
                            res = {
                                id: e.id,
                                parentid: parentid,
                                order: i
                            };
                            return false;
                        }
                        if (e.children) {
                            res = this.findMenu(e.children, Menuid, e.id);
                            if (res) {
                                return false;
                            }
                        }
                    });
                    return res;
                }
                sortMenus(Menus, orderby) {
                    let ordered = flexygo.utils.sortObject(Menus, orderby);
                    //$.each(Menus, (i: number, e: NavigationMenu) => {
                    //    let obj: NavigationMenu[] = e.childMenus;
                    //    if (!(Object.keys(obj).length === 0 && obj.constructor === Object)) {
                    //        e.childMenus = this.sortMenus(e.childMenus, orderby);
                    //    }
                    //});
                    return ordered;
                }
                //getChildMenus(json: NavigationMenu): string {
                //    let cnt: string = '';
                //    let ret: NavigationMenu[] = json.childMenus;
                //    if (Object.keys(ret).length > 0) {
                //        for (let nKey in ret) {
                //            cnt += flexygo.utils.parser.compile(ret[nKey], this.template, this);
                //        }
                //    }
                //    let style: string = "";
                //    if (json.Menuid !== this.rootMenuId) {
                //        style = 'style="display:none"';
                //    }
                //    if (cnt != "") {
                //        return '<ul data-navMenu ' + style + '>' + cnt + "</ul>";
                //    } else {
                //        return "<ul data-navMenu ></ul>";
                //    }
                //}
                deleteMenu(Menu) {
                    let params = { MenuId: Menu.toLowerCase().replace("menu", "") };
                    flexygo.ajax.post('~/api/MenuManager', this.deleteMethod, params, (response) => {
                        $(this).find("#fgnsli_" + Menu.toLowerCase().replace("menu", "")).remove();
                    });
                }
                saveOpenMenu(btn) {
                    let icon = btn;
                    let opened = icon.hasClass('icon-order-up-2');
                    if (opened) {
                        let parent = btn.closest("li");
                        this.openMenus.push(parent.attr("id"));
                        let ul = parent.children("ul [data-navMenu]");
                        $.each(ul.children(), (i, e) => {
                            let childbtn = $(e).children().first().find('[data-action="toggle"]');
                            if (childbtn.length > 0) {
                                this.saveOpenMenu(childbtn);
                            }
                        });
                    }
                }
                saveMenusState() {
                    this.openMenus = [];
                    let me = $(this);
                    let btn = me.find('.sortable').children("li").children().first().find('[data-action="toggle"]');
                    this.saveOpenMenu(btn);
                    this.scrollY = me.find('.sortable').parent().scrollTop();
                }
                restoreMenusState() {
                    let me = $(this);
                    let list = me.find('.sortable');
                    if (this.openMenus) {
                        $.each(this.openMenus, (i, e) => {
                            let Menu = $("#" + e);
                            if (Menu) {
                                let btn = Menu.children().first().find('[data-action="toggle"]');
                                if (btn.find('i').first().hasClass('icon-order-down-2')) {
                                    btn.trigger("click");
                                }
                            }
                        });
                    }
                    this.openMenus = [];
                    list.parent().scrollTop(this.scrollY);
                }
            }
            wc.FlxMenuManagerElement = FlxMenuManagerElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define("flx-menumanager", flexygo.ui.wc.FlxMenuManagerElement);
//# sourceMappingURL=flx-menumanager.js.map