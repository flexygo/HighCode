/**
 * @namespace flexygo.ui.wc
 */
var flexygo;
(function (flexygo) {
    var ui;
    (function (ui) {
        var wc;
        (function (wc) {
            class LoadNodesParams {
            }
            wc.LoadNodesParams = LoadNodesParams;
            class NavigationNode {
            }
            wc.NavigationNode = NavigationNode;
            //Definicion de la clase devuelta por el merodo toHierarchy del nestedsortable
            class HierarchicalNode {
            }
            wc.HierarchicalNode = HierarchicalNode;
            /**
            * Library for the FlxNodeManagerElement web component.
            *
            * @class FlxNodeManagerElement
            * @constructor
            * @return {FlxNodeManagerElement}
            */
            class FlxNodeManagerElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                   * Set when component is attached to DOM
                   * @property connected {boolean}
                   */
                    this.connected = false;
                    this.method = null;
                    this.deleteMethod = "deleteNode";
                    this.relocateMethod = "relocateNode";
                    this.refreshMetod = "refreshNodes";
                    this.rootNodeId = '';
                    this.openNodes = null;
                    this.scrollY = 0;
                    this.sortableList = null;
                    //Nota: para que el metodo toArray del nestedsortable devuelva valores correctamente, los elementos de la lista deben tener un id con _
                    this.template = '<li id="fgnsli_{{NodeId}}" strType="{{strType}}">'
                        + '<div>'
                        + '<i class="{{IconClass}} icon-margin-right" />'
                        + '<span>{{Title}}</span>'
                        + '<div class="btn-group pull-right btn-group-sm" role="group" >'
                        + '<button class="btn btn-default" data-toggle="collapse" data-action="add" data-target="#Node{{NodeId}}"><i class="flx-icon icon-plus"  /></button>'
                        + '<button class="btn btn-default" data-action="toggle"><i class="flx-icon icon-order-down-2"  /></button>'
                        + '<button class="btn btn-default" data-action="edit">'
                        + '<small><a href= "#" class="processType" data-toggle="collapse" data-target="#Node{{NodeId}}">{{strType}}</a></small>'
                        + '<i class="flx-icon icon-pencil" flx-fw="" />'
                        + '</button>'
                        + '<button class="btn btn-default" data-action="del"><i class="flx-icon icon-delete-2 txt-danger"  /></button>'
                        + '<button class="btn btn-default" data-action="security"><i class="flx-icon icon-lock-1"  /></button>'
                        + '</div>'
                        + '</div>'
                        + '<div class="row collapse editnode" id="Node{{NodeId}}" NodeId="{{NodeId}}">'
                        + '<div class="editnode"></div>'
                        + '</div>{{getChildNodes(json)}}'
                        + '</li>';
                }
                /**
               * Fires when element is attached to DOM
               * @method connectedCallback
               */
                connectedCallback() {
                    let element = $(this);
                    this.connected = true;
                    let initNode = element.attr("initNode");
                    if (initNode) {
                        this.method = "getNodesById";
                        this.methodParams = { ParentId: initNode, HideAutoSQLNodes: true };
                        this.initNode = initNode;
                    }
                    this.init();
                }
                init() {
                    this.loadNodes();
                }
                refreshNavBar() {
                    $(document).find("flx-nav").each((i, e) => {
                        let navbar = $(e)[0];
                        if (navbar) {
                            navbar.refresh();
                        }
                    });
                }
                refresh() {
                    this.loadNodes();
                }
                loadNodes() {
                    $(this).empty();
                    flexygo.ajax.post('~/api/Navigation', this.method, this.methodParams, (response) => {
                        let arrOrdered = this.sortNodes(flexygo.utils.lowerKeys(response, true), "order");
                        $(this).html('<div class="nodePnl"></div>');
                        this.loadNodesRet(arrOrdered);
                    });
                }
                setRootNode(ret) {
                    let rootnode = null;
                    $.each(ret, (i, e) => {
                        let thisnode = e;
                        if (e.parentnodeid == "") {
                            rootnode = e;
                        }
                        else {
                            $.each(ret, (i, ee) => {
                                if (ee.parentnodeid === thisnode.nodeid) {
                                    rootnode = thisnode;
                                    return false;
                                }
                            });
                        }
                        if (rootnode) {
                            ret.splice(i, 1);
                            e.childnodes = ret;
                            ret = [e];
                            return false;
                        }
                    });
                    return rootnode;
                }
                loadNodesRet(ret) {
                    let rootnode = null;
                    let me = $(this);
                    this.rootNodeId = '';
                    rootnode = this.setRootNode(ret);
                    if (rootnode) {
                        this.rootNodeId = rootnode.nodeid;
                    }
                    else {
                        this.rootNodeId = (ret && ret.length == 1) ? ret[0].nodeid : 'root';
                        rootnode = {
                            nodeid: this.rootNodeId,
                            parentnodeid: '',
                            childnodes: ret,
                            title: flexygo.localization.translate('nodemanager.title'),
                            order: 0,
                            strtype: '',
                        };
                    }
                    let cnt = flexygo.utils.parser.compile(rootnode, this.template, this);
                    let elem = $('<ul class="sortable" />').html(cnt).first();
                    me.find('.nodePnl').append(elem);
                    let btnroot = me.find("#fgnsli_" + this.rootNodeId).find('.btn-group').first();
                    btnroot.find('[data-action="del"]').first().hide();
                    btnroot.find('[data-action="edit"]').first().hide();
                    btnroot.find('[data-action="toggle"]').first().find("i").first().removeClass('icon-order-down-2').addClass('icon-order-up-2');
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
                            let nodes = this.sortableList.nestedSortable('toHierarchy', { expression: (/(.+)[_](.+)/) });
                            let nodeid = f.item.attr('id');
                            nodeid = nodeid.substring(nodeid.indexOf('_') + 1);
                            let params = this.findNode(nodes, nodeid);
                            if (params) {
                                flexygo.ajax.post('~/api/Navigation', this.relocateMethod, params, (response) => {
                                    this.refreshNavBar();
                                });
                            }
                        }
                    }).disableSelection();
                    me.find('.processType').on('click', (e) => {
                        this.showEdit($(e.target).closest('li').children('.editnode'), false);
                    });
                    me.find('[data-action="add"]').on('click', (e) => {
                        let parent = $(e.target).closest('li').children('.editnode');
                        this.showEdit(parent, true);
                    });
                    me.find('[data-action="toggle"]').on('click', (e) => {
                        let icon = $(e.currentTarget).find('i').first();
                        let opened = icon.hasClass('icon-order-up-2');
                        let content = $(e.currentTarget).closest('li').children('ul').first();
                        if (opened) {
                            content.hide();
                            icon.removeClass('icon-order-up-2').addClass('icon-order-down-2');
                        }
                        else {
                            content.show();
                            icon.removeClass('icon-order-down-2').addClass('icon-order-up-2');
                        }
                        this.saveNodesState();
                    });
                    me.find('[data-action="del"]').on('click', (e) => {
                        let node = $(e.currentTarget).closest('li').children('.editnode')[0].id;
                        Lobibox.confirm({
                            title: flexygo.localization.translate('nodemanager.deletenode'),
                            msg: flexygo.localization.translate('nodemanager.deletenodequestion'),
                            iconClass: '',
                            callback: (dlg, type, ev) => {
                                if (type == "yes") {
                                    this.deleteNode(node);
                                }
                            }
                        });
                    });
                    me.find('[data-action="security"]').on('click', (e) => {
                        let node = $(e.currentTarget).closest('li').children('.editnode')[0].id.replace("Node", "");
                        flexygo.nav.openPage('view', 'sysNavigationNode', 'NodeId=\'' + node + '\'', null, 'popup800x600', true, $(e.currentTarget), false);
                    });
                }
                showEdit(placeHolder, isNewNode) {
                    if (placeHolder.hasClass('in')) {
                        this.sortableList.sortable("enable");
                        placeHolder.empty();
                        //Clear edit module areyousure event handler
                        let btnClose = placeHolder.closest('.ui-dialog').find('.ui-dialog-titlebar-close');
                        if (btnClose.length > 0) {
                            let dlg = placeHolder.closest("main.pageContainer");
                            dlg.off("dialogbeforeclose");
                        }
                        return;
                    }
                    else {
                        this.sortableList.sortable("disable");
                        let editModuleName = 'sysmod-edit-generic';
                        let containerTemplate = '<div class="cntBody nopadding size-xs"></div><div class="cntBodyFooter"></div>';
                        let container = $('<flx-module class="nodeEdit"/>').html(containerTemplate).attr('modulename', editModuleName).attr('type', 'flx-edit').addClass('empty');
                        placeHolder.empty();
                        placeHolder.append(container);
                        let module = null;
                        let parent = placeHolder.attr('nodeid');
                        if (isNewNode === true) {
                            let objDef = {
                                parentNodeId: parent
                            };
                            let strobjDef = JSON.stringify(objDef);
                            module = $('<flx-edit />').attr('ObjectName', 'sysNavigationNode').attr('defaults', strobjDef).attr('modulename', editModuleName);
                            flexygo.events.on(this, "entity", "all", (e) => {
                                flexygo.events.off(this, "entity", "all");
                                if (e.type === "inserted") {
                                    this.saveNodesState();
                                    //Clear edit module areyousure event handler
                                    let btnClose = placeHolder.closest('.ui-dialog').find('.ui-dialog-titlebar-close');
                                    if (btnClose.length > 0) {
                                        let dlg = placeHolder.closest("main.pageContainer");
                                        dlg.off("dialogbeforeclose");
                                    }
                                    flexygo.ajax.post('~/api/Navigation', this.refreshMetod, null, (response) => {
                                        this.loadNodes();
                                        this.refreshNavBar();
                                    });
                                }
                            });
                        }
                        else {
                            module = $('<flx-edit />').attr('ObjectName', 'sysNavigationNode').attr('ObjectWhere', 'Nodeid=\'' + placeHolder.attr('nodeid') + '\'').attr('modulename', editModuleName);
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
                findNode(nodes, nodeid, parentid) {
                    let res = null;
                    $.each(nodes, (i, e) => {
                        if (e.id === nodeid) {
                            res = {
                                id: e.id,
                                parentid: parentid,
                                order: i
                            };
                            return false;
                        }
                        if (e.children) {
                            res = this.findNode(e.children, nodeid, e.id);
                            if (res) {
                                return false;
                            }
                        }
                    });
                    return res;
                }
                sortNodes(nodes, orderby) {
                    let ordered = flexygo.utils.sortObject(nodes, orderby);
                    $.each(nodes, (i, e) => {
                        let obj = e.childnodes;
                        if (!(Object.keys(obj).length === 0 && obj.constructor === Object)) {
                            e.childnodes = this.sortNodes(e.childnodes, orderby);
                        }
                    });
                    return ordered;
                }
                getChildNodes(json) {
                    let cnt = '';
                    let ret = json.childnodes;
                    if (Object.keys(ret).length > 0) {
                        for (let nKey in ret) {
                            cnt += flexygo.utils.parser.compile(ret[nKey], this.template, this);
                        }
                    }
                    let style = "";
                    if (json.nodeid !== this.rootNodeId) {
                        style = 'style="display:none"';
                    }
                    if (cnt != "") {
                        return '<ul data-navnode ' + style + '>' + cnt + "</ul>";
                    }
                    else {
                        return "<ul data-navnode ></ul>";
                    }
                }
                deleteNode(node) {
                    let params = { nodeId: node };
                    flexygo.ajax.post('~/api/Navigation', this.deleteMethod, params, (response) => {
                        $(this).find("#fgnsli_" + node.toLowerCase().replace("node", "")).remove();
                        this.refreshNavBar();
                    });
                }
                saveOpenNode(btn) {
                    let icon = btn.find('i').first();
                    let opened = icon.hasClass('icon-order-up-2');
                    if (opened) {
                        let parent = btn.closest("li");
                        this.openNodes.push(parent.attr("id"));
                        let ul = parent.children("ul [data-navnode]");
                        $.each(ul.children(), (i, e) => {
                            let childbtn = $(e).children().first().find('[data-action="toggle"]');
                            if (childbtn.length > 0) {
                                this.saveOpenNode(childbtn);
                            }
                        });
                    }
                }
                saveNodesState() {
                    this.openNodes = [];
                    let me = $(this);
                    let btn = me.find('.sortable').children("li").children().first().find('[data-action="toggle"]');
                    this.saveOpenNode(btn);
                    this.scrollY = me.find('.sortable').parent().scrollTop();
                }
                restoreNodesState() {
                    let me = $(this);
                    let list = me.find('.sortable');
                    if (this.openNodes) {
                        $.each(this.openNodes, (i, e) => {
                            let node = $("#" + e);
                            if (node) {
                                let btn = node.children().first().find('[data-action="toggle"]');
                                if (btn.find('i').first().hasClass('icon-order-down-2')) {
                                    btn.trigger("click");
                                }
                            }
                        });
                    }
                    this.openNodes = [];
                    list.parent().scrollTop(this.scrollY);
                }
            }
            wc.FlxNodeManagerElement = FlxNodeManagerElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define("flx-nodemanager", flexygo.ui.wc.FlxNodeManagerElement);
//# sourceMappingURL=flx-nodemanager.js.map