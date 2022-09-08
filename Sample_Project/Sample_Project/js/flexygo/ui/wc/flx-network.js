/**
 * @namespace flexygo.ui.wc
 */
var flexygo;
(function (flexygo) {
    var ui;
    (function (ui) {
        var wc;
        (function (wc) {
            /**
            * Library for the FlxNetworkElement web component.
            *
            * @class FlxNetworkElement
            * @constructor
            * @return {FlxNetworkElement}
            */
            class FlxNetworkElement extends HTMLElement {
                constructor() {
                    //If a constructor is defined, call the super constructor
                    super();
                    /**
                    * Set if element has been connected to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                }
                /**
                * Array of observed attributes.
                * @property observedAttributes {Array}
                */
                static get observedAttributes() {
                    return ['ObjectName', 'ObjectWhere'];
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = $(this);
                    this.connected = true;
                    this.objectName = element.attr("ObjectName");
                    this.objectWhere = element.attr("ObjectWhere");
                    this.moduleName = element.attr("ModuleName");
                    flexygo.events.on(this, "module", "resized", this.onModuleResize);
                    if (element.attr('manualInit') != 'true') {
                        this.init();
                    }
                }
                /**
                * Fires when element is dettached to DOM
                * @method disconnectedCallback
                */
                disconnectedCallback() {
                    flexygo.events.off(this, "module", "resized", this.onModuleResize);
                }
                /**
                * Fires when the attribute value of the element is changed.
                * @method attributeChangedCallback
                */
                attributeChangedCallback(attrName, oldVal, newVal) {
                    let needInit = false;
                    if (attrName.toLowerCase() == 'objectname' && newVal && newVal != '') {
                        this.objectName = newVal;
                        needInit = true;
                    }
                    else if (attrName.toLowerCase() == 'objectwhere' && newVal && newVal != '') {
                        this.objectWhere = newVal;
                        needInit = true;
                    }
                    if (this.connected && needInit) {
                        this.init();
                    }
                }
                /**
                * Init the webcomponent.
                * @method init
                */
                init() {
                    let me = $(this);
                    me.empty();
                    this.uuid = flexygo.utils.uniqueUUID();
                    let div = $('<div id="' + this.uuid + '" style="min-height:300px;border:none;background-color:#ffffff;"></div>');
                    me.append(div);
                    let module = $(this).closest('flx-module');
                    this.initialHeight = module.height();
                    this.render();
                }
                /**
                * Refresh de webcomponent.
                * @method refresh
                */
                refresh() {
                    this.render();
                }
                /**
                * Render HTML data.
                * @method render
                */
                render() {
                    let me = $(this);
                    let params = {
                        ObjectName: this.objectName,
                        ObjectWhere: this.objectWhere,
                        ModuleName: me.attr("modulename"),
                        Details: false,
                        ParentId: 0,
                        MaxId: 0
                    };
                    //console.log(params);
                    flexygo.ajax.post('~/api/Network', 'GetData', params, (response) => {
                        if (response) {
                            let respnodes = [];
                            let respedges = [];
                            this.maxId = 0;
                            $.each(response.Nodes, (i, e) => {
                                if (e.id > this.maxId) {
                                    this.maxId = e.id;
                                }
                                respnodes.push({
                                    id: e.id,
                                    label: e.label,
                                    shape: 'icon',
                                    icon: {
                                        face: 'Flexygo-icons',
                                        color: flexygo.colors.outstanding,
                                        code: this.toUnicode(e.objecticon)
                                    },
                                    objectname: e.objectname,
                                    objectwhere: e.objectwhere,
                                    objectchildname: e.objectchildname,
                                    objectdefaults: e.objectdefaults,
                                    objectdetails: false,
                                    objectexpanded: e.id === 1
                                });
                            });
                            $.each(response.Edges, (i, e) => {
                                respedges.push({
                                    from: e.from,
                                    to: e.to
                                });
                            });
                            this.nodes = new vis.DataSet(respnodes);
                            this.edges = new vis.DataSet(respedges);
                            let container = document.getElementById(this.uuid);
                            let data = {
                                nodes: this.nodes,
                                edges: this.edges
                            };
                            let options = {
                                autoResize: true,
                                height: '100%',
                                width: '100%',
                                nodes: {
                                    shape: 'box',
                                    color: flexygo.colors.outstanding,
                                    borderWidth: 2,
                                    shadow: true
                                },
                                edges: {
                                    width: 2,
                                    color: flexygo.colors.outstanding,
                                    shadow: true
                                },
                                physics: {
                                    maxVelocity: 25,
                                    minVelocity: 1
                                }
                            };
                            this.network = new vis.Network(container, data, options);
                            this.network.on("click", this.nodeClick);
                            this.network.on("oncontext", this.nodeContext);
                            let body = $(this).closest('flx-module');
                            this.network.setSize(body.width().toString(), body.height().toString());
                            this.network.fit();
                        }
                    });
                }
                nodeClick(params) {
                    //[this] in this function is Vis.Network
                    let ctx = params.event.target.closest('flx-network');
                    if (params.nodes.length > 0) {
                        let me = $(ctx);
                        let nodeId = params.nodes[0];
                        let node = ctx.nodes.get(nodeId);
                        if (node.objectexpanded && node.objectexpanded === true) {
                            return;
                        }
                        node.objectexpanded = true;
                        ctx.nodes.update(node);
                        let details = node.objectdetails;
                        let param = null;
                        if (details === false) {
                            let parent = null;
                            ctx.edges.forEach((item, id) => {
                                if (item.to == node.id) {
                                    parent = ctx.nodes.get(item.from);
                                }
                            });
                            param = {
                                ObjectName: node.objectname,
                                ObjectWhere: node.objectwhere,
                                ModuleName: me.attr("modulename"),
                                Details: true,
                                ParentId: nodeId,
                                MaxId: ctx.maxId,
                                ParentObjectName: (parent) ? parent.objectname : null,
                                ParentObjectWhere: (parent) ? parent.objectwhere : null
                            };
                        }
                        else {
                            param = {
                                ObjectName: node.objectname,
                                ObjectWhere: node.objectwhere,
                                ModuleName: me.attr("modulename"),
                                Details: false,
                                ParentId: nodeId,
                                MaxId: ctx.maxId
                            };
                        }
                        //console.log(param);
                        flexygo.ajax.post('~/api/Network', 'GetData', param, (response) => {
                            if (response) {
                                if (details === false) {
                                    $.each(response.Nodes, (i, e) => {
                                        if (e.id > ctx.maxId) {
                                            ctx.maxId = e.id;
                                        }
                                        ctx.nodes.add([{
                                                id: e.id,
                                                label: e.label,
                                                shape: 'box',
                                                margin: 10,
                                                objectname: e.objectname,
                                                objectwhere: e.objectwhere,
                                                objectdefaults: e.objectdefaults,
                                                objectchildname: e.objectchildname,
                                                objectdetails: true,
                                                objectexpanded: false
                                            }]);
                                    });
                                    $.each(response.Edges, (i, e) => {
                                        ctx.edges.add([{
                                                from: e.from,
                                                to: e.to
                                            }]);
                                    });
                                }
                                else {
                                    let newNodeId = 0;
                                    $.each(response.Nodes, (i, e) => {
                                        if (i === 0) {
                                            newNodeId = e.id;
                                        }
                                        else {
                                            if (e.id > ctx.maxId) {
                                                ctx.maxId = e.id;
                                            }
                                            ctx.nodes.add([{
                                                    id: e.id,
                                                    label: e.label,
                                                    shape: 'icon',
                                                    icon: {
                                                        face: 'Flexygo-icons',
                                                        color: flexygo.colors.outstanding,
                                                        code: ctx.toUnicode(e.objecticon)
                                                    },
                                                    objectname: e.objectname,
                                                    objectwhere: e.objectwhere,
                                                    objectdefaults: e.objectdefaults,
                                                    objectchildname: e.objectchildname,
                                                    objectdetails: false,
                                                    objectexpanded: false
                                                }]);
                                        }
                                    });
                                    $.each(response.Edges, (i, e) => {
                                        ctx.edges.add([{
                                                from: nodeId,
                                                to: e.to
                                            }]);
                                    });
                                }
                                let body = $(ctx).closest('flx-module');
                                ctx.network.setSize(body.width().toString(), body.height().toString());
                                ctx.network.fit();
                            }
                        });
                    }
                }
                onModuleResize(e) {
                    let module = e.sender;
                    if (module.moduleName == this.moduleName) {
                        let body = $(this).closest('flx-module');
                        let height;
                        if ($(module).hasClass("fullscreen")) {
                            height = body.height();
                        }
                        else {
                            height = this.initialHeight;
                        }
                        this.network.setSize(body.width().toString(), height.toString());
                        this.network.fit();
                    }
                }
                nodeContext(params) {
                    //[this] in this function is Vis.Network
                    if (params.nodes.length === 0) {
                        return false;
                    }
                    let ctx = params.event.target.closest('flx-network');
                    let me = $(ctx);
                    let nodeId = params.nodes[0];
                    let node = ctx.nodes.get(nodeId);
                    let cord = {
                        left: params.event.clientX,
                        top: params.event.clientY
                    };
                    if (node.objectdetails === true) {
                        params.event.preventDefault();
                        //console.log(params.event);
                        flexygo.nav.getObjectMenu(node.objectname, node.objectwhere, null, me, cord);
                    }
                    else {
                        let parent = null;
                        ctx.edges.forEach((item, id) => {
                            if (item.to == node.id) {
                                parent = ctx.nodes.get(item.from);
                            }
                        });
                        params.event.preventDefault();
                        if (me.find('.flx-menu').length > 0) {
                            me.find('.flx-menu>ul').slideUp(500, () => { me.find('.flx-menu').remove(); });
                        }
                        let menu = $('<div class="flx-menu item-opened"></div>');
                        let menuUl = $('<ul/>');
                        if (!parent) {
                            let proc = new flexygo.obj.Entity(node.objectname, node.objectwhere).processes('');
                            if (proc.ObjectLink && Object.keys(proc.ObjectLink.ChildNodes).length > 0) {
                                let nNode = $('<li><span class="item-closed"><i class="flx-icon icon-properties-relations-1" /><span> ' + flexygo.localization.translate('flxmodule.new') + '</span></span><ul></ul></li>');
                                menuUl.append(nNode);
                                let nodeUl = nNode.children('ul');
                                $.each(proc.ObjectLink.ChildNodes, (i, e) => {
                                    let childNode = $('<li><span><i class="' + e.IconClass + '" /><span> ' + e.Descrip + '</span></span></li>');
                                    nodeUl.append(childNode);
                                    childNode.on('click', (ev) => {
                                        ctx.onNewNode(node, null, e);
                                    });
                                });
                            }
                        }
                        else {
                            let nNode = $('<li><span class="item-opened"><i class="flx-icon icon-properties-relations-1" /><span> ' + flexygo.localization.translate('flxmodule.new') + '</span></span></li>');
                            menuUl.append(nNode);
                            nNode.on('click', (e) => {
                                ctx.onNewNode(node, parent, null);
                            });
                        }
                        menu.append(menuUl);
                        me.append(menu);
                        menu.find('span.item-closed').on('click', (event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            let myObj = $(document).find('flx-nav')[0];
                            myObj.navItemClick($(event.currentTarget), menu);
                        });
                        menuUl.css({ position: "fixed", left: cord.left, top: cord.top });
                        menuUl.slideDown(500);
                    }
                }
                onNewNode(node, parent, navnode) {
                    if (parent) {
                        let obj = new flexygo.obj.Entity(parent.objectname, parent.objectwhere);
                        obj.read();
                        let defaults = JSON.parse(flexygo.utils.parser.compile(obj.data, node.objectdefaults));
                        flexygo.nav.openPage('edit', node.objectchildname, '', defaults, 'modal1024x768');
                    }
                    else {
                        let obj = new flexygo.obj.Entity(navnode.ObjectName, '');
                        let cfg = obj.getConfig();
                        let strdefaults = JSON.stringify(navnode.ObjectDefaults);
                        flexygo.nav.openPage('edit', (cfg.DefaultChild) ? cfg.DefaultChild : cfg.ObjectName, '', strdefaults, 'modal1024x768');
                    }
                }
                toUnicode(name) {
                    let testI = document.createElement('i');
                    let char;
                    testI.className = name;
                    document.body.appendChild(testI);
                    char = window.getComputedStyle(testI, ':before').content.replace(/'|"/g, '');
                    testI.remove();
                    let code = char.charCodeAt(0);
                    return JSON.parse('"\\u' + code.toString(16) + '"');
                }
            }
            wc.FlxNetworkElement = FlxNetworkElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define("flx-network", flexygo.ui.wc.FlxNetworkElement);
//# sourceMappingURL=flx-network.js.map