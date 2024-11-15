/**
 * @namespace flexygo.ui.wc
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
            * Library for the FlxMenuManagerElement web component.
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
                    this.deleteMethod = "DeleteNode";
                    this.relocateMethod = "RelocateNode";
                    this.rootNodeId = '';
                    this.openNodes = null;
                    this.scrollY = 0;
                    this.sortableList = null;
                    //Nota: para que el metodo toArray del nestedsortable devuelva valores correctamente, los elementos de la lista deben tener un id con _
                    this.template = `<li id="fgnsli_{{NodeId}}" strType="{{strType}}">
            <div>
                <div>
                    <i class="flx-icon {{IconClass|isnull:icon-menu,{{IconClass}}}}"/>
                    <span>{{Title}} <small>({{strType}})</small></span>
                </div>
                <div class="btn-panel">
                        <i class="flx-icon icon-plus" data-action="add"/>
                        <i class="flx-icon icon-order-down-2 {{ContainsChilds|bool:,txt-muted}}" data-action="toggle"/>
                        <i class="flx-icon icon-pencil" data-action="edit"/>
                    <i class="flx-icon icon-delete-2" data-action="del"/>
                    <i class="flx-icon icon-lock-1" data-action="security"/>
                </div>
            </div>
            <div class="row collapse editnode" id="Node{{NodeId}}" NodeId="{{NodeId}}"/>
            {{getChildNodes(json)}}
        </li>`;
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
                        this.method = "GetNodesById";
                        this.methodParams = { ParentId: initNode, HideAutoSQLNodes: true };
                        this.initNode = initNode;
                    }
                    this.init();
                }
                /**
                * Init menu manager
                * @method init
                */
                init() {
                    return this.loadNodes();
                }
                refresh() {
                    this.openNodes = null;
                    return this.loadNodes();
                }
                loadNodes() {
                    return new Promise((resolve, _) => __awaiter(this, void 0, void 0, function* () {
                        $(this).empty();
                        flexygo.ajax.post('~/api/Navigation', this.method, this.methodParams, 
                        //Success Function
                        (response) => {
                            let arrOrdered = this.sortNodes(flexygo.utils.lowerKeys(response, true), "order");
                            $(this).html('<div class="managerpanel"></div>');
                            this.loadNodesRet(arrOrdered);
                            this.restoreNodesState();
                            resolve();
                        }, 
                        //Error Function
                        err => {
                            flexygo.utils.modules.loadingErrorFunction(this.closest('flx-module'), err);
                            resolve();
                        });
                    }));
                }
                setRootNode(nodes) {
                    let rootNode = null;
                    $.each(nodes, (index, currentNode) => {
                        if (currentNode.parentnodeid == "") {
                            rootNode = currentNode;
                        }
                        else {
                            $.each(nodes, (_, potentialChildNode) => {
                                if (potentialChildNode.parentnodeid === currentNode.nodeid) {
                                    rootNode = currentNode;
                                    return false; // Break out of the inner loop
                                }
                            });
                        }
                        if (rootNode) {
                            nodes.splice(index, 1);
                            currentNode.childnodes = nodes;
                            nodes = [currentNode];
                            return false; // Break out of the outer loop
                        }
                    });
                    return rootNode;
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
                    rootnode.containsChilds = rootnode.childnodes.length > 0 ? true : false;
                    let cnt = flexygo.utils.parser.recursiveCompile(rootnode, this.template, this);
                    let elem = $('<ul class="sortable" />').html(cnt).first();
                    me.find('.managerpanel').append(elem);
                    let btnroot = me.find("#fgnsli_" + this.rootNodeId).find('.btn-panel').first();
                    btnroot.find('[data-action="del"]').first().hide();
                    btnroot.find('[data-action="edit"]').first().hide();
                    btnroot.find('[data-action="toggle"]').first().removeClass('icon-order-down-2').addClass('icon-order-up-2');
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
                                    var ev = {
                                        class: "entity",
                                        type: "updated",
                                        sender: this,
                                        masterIdentity: "sysNavigationNode",
                                        detailIdentity: nodeid
                                    };
                                    flexygo.events.trigger(ev);
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
                        this.showEdit($(e.target).closest('li').children('.editnode'), false);
                    });
                    me.find('[data-action="add"]').on('click', (e) => {
                        if ($(e.currentTarget).hasClass('active')) {
                            $(e.currentTarget).removeClass('active');
                        }
                        else {
                            $(e.currentTarget).addClass('active');
                            me.find('[data-action="edit"]').removeClass('active');
                        }
                        this.showEdit($(e.target).closest('li').children('.editnode'), true);
                    });
                    me.find('[data-action="toggle"]').on('click', (e) => {
                        if (e.currentTarget.classList.contains('txt-muted'))
                            return;
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
                        flexygo.nav.openPage('view', 'sysNavigationNode', 'NodeId=\'' + node + '\'', null, 'modal800x600', true, $(e.currentTarget), false);
                    });
                }
                showEdit(placeHolder, isNewNode) {
                    if (placeHolder.hasClass('in') && placeHolder.attr('isnewnode') === isNewNode.toString()) {
                        placeHolder.collapse('hide');
                        placeHolder.closest('li').find('> div:first-child').removeClass('active');
                        this.sortableList.sortable("enable");
                        placeHolder.empty();
                        placeHolder.removeAttr('isnewnode');
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
                        let container = $('<flx-module class="nodeEdit"/>').html(containerTemplate).attr('modulename', editModuleName).attr('type', 'flx-edit').addClass('empty');
                        placeHolder.attr('isnewnode', isNewNode.toString());
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
                                if (e.masterIdentity == "sysNavigationNode" && !flexygo.utils.isBlank(e.detailIdentity)) {
                                    flexygo.events.off(this, "entity", "all");
                                    if (e.type === "inserted") {
                                        this.loadNodes();
                                    }
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
                    let child_nodes = json.childnodes;
                    if (Object.keys(child_nodes).length > 0) {
                        let child_node;
                        for (let nKey in child_nodes) {
                            child_node = child_nodes[nKey];
                            child_node.containsChilds = child_node.childnodes.length > 0 ? true : false;
                            cnt += flexygo.utils.parser.recursiveCompile(child_node, this.template, this);
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
                        var ev = {
                            class: "entity",
                            type: "deleted",
                            sender: this,
                            masterIdentity: "sysNavigationNode",
                            detailIdentity: node.substring(4)
                        };
                        flexygo.events.trigger(ev);
                    });
                }
                saveOpenNode(btn) {
                    let icon = btn;
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
                                if (btn.hasClass('icon-order-down-2')) {
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