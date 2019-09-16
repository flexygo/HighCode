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
            * Library for the FlxNavElement web component.
            *
            * @class FlxAreaElement
            * @constructor
            * @return {FlxAreaElement}
            */
            class FlxAreaElementBreadCrumbItem {
            }
            wc.FlxAreaElementBreadCrumbItem = FlxAreaElementBreadCrumbItem;
            class FlxAreaElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                    * Set when component is attached to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                    this.method = null;
                    this.methodParams = null;
                    this.backNode = null;
                    this.initNode = null;
                    this.currentNode = null;
                    this.breadcrumArray = [];
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let navBar = $(this);
                    if (navBar.attr('manualInit') != 'true') {
                        this.init();
                    }
                }
                static get observedAttributes() {
                    return [];
                }
                /**
              * Fires when the attribute value of the element is changed.
              * @method attributeChangedCallback
              * @param {String} attrName. The attribute name
              * @param {String} oldVal. The old value
              * @param {String} newVal.the new value
              */
                attributeChangedCallback(attrName, oldVal, newVal) {
                    if (!this.connected) {
                        return;
                    }
                    this.init();
                }
                /**
                * Init the webcomponent.
                * @method init
                */
                init() {
                    $(this).removeAttr('manualInit');
                    this.uuid = flexygo.utils.uniqueUUID();
                    let navBar = $(this);
                    navBar.empty();
                    this.connected = true;
                    let initNode = navBar.attr('initNode');
                    navBar.attr('original-mode', navBar.attr('mode'));
                    this.method = 'GetAreaNode';
                    this.methodParams = { ParentId: initNode };
                    this.initNode = initNode;
                    this.loadNodes();
                }
                /**
                * Refresh de webcomponent.
                * @method refresh
                */
                refresh() {
                    if ($(this).attr('manualInit') != 'true') {
                        $(this).empty();
                        this.loadNodes();
                    }
                }
                /**
                * Does post to load Areas Nodes.
                * @method loadNodes
                */
                loadNodes() {
                    flexygo.ajax.post('~/api/Navigation', this.method, this.methodParams, (response) => {
                        let arrOrdered = flexygo.utils.sortObject(response, 'Order');
                        this.loadNodesRet(arrOrdered);
                    });
                }
                /**
                * loads Nodes with post result.
                * @method loadNodesRet
                * @param {Array} ret. an array with the nodes
                */
                loadNodesRet(ret) {
                    let me = $(this);
                    let cnt = '';
                    let parentNode = null;
                    ret.forEach((n) => {
                        if (n.NodeId.toLowerCase() !== this.initNode.toLowerCase()) {
                            cnt +=
                                `<li>
                            <span class="icon-cont">
                                <i class="${n.IconClass}"></i>
                            </span> 
                            <h3>${n.Title}</h3>
                            <div class="iconright" data-divein="${n.NodeId}" data-title="${n.Title}">
                                <i class="flx-icon icon-arrow-2"></i> 
                            </div>
                            <div class="iconback ${this.getNoShow(n, 'parent')}">
                                <i class="flx-icon icon-arrow-2 icon-flip-horizontal"></i>
                            </div>
                        </li>
                     `;
                        }
                        else {
                            this.backNode = n.ParentNodeId;
                            parentNode = n;
                        }
                    });
                    let headerTemplate = `${this.getBreadcrum(parentNode)}<div class="child-nodes" style="display:none"></div>`;
                    me.append(headerTemplate);
                    let elem = $('<ul/>').html(cnt).first();
                    let i = me.find('.child-nodes');
                    i.html(elem);
                    i.show('slide', {}, 500);
                    me.append(`<div id="${this.uuid}" style= "min-height:600px;"></div>`);
                    //me.append(`<div id="${this.uuid}"></div>`);
                    me.find('div.iconright').off('click').on('click', (e) => {
                        let nodeid = $(e.currentTarget).attr('data-divein');
                        let title = $(e.currentTarget).attr('data-title');
                        this.diveIn(nodeid, title);
                    });
                    me.find('div.iconback').off('click').on('click', (e) => {
                        this.goBack();
                    });
                    me.find('nav').find('li').off('click').on('click', (e) => {
                        let id = $(e.currentTarget).attr('data-id');
                        this.goNode(id);
                    });
                    let arrNodes = [];
                    let arrEdges = [];
                    this.currentNode = parentNode;
                    if (parentNode && parentNode.WebComponent && parentNode.WebComponent.length > 0) {
                        let data = JSON.parse(parentNode.WebComponent);
                        let datanodes = data.Nodes;
                        datanodes.forEach((n) => {
                            //console.log('node', n);
                            let title = flexygo.localization.translate(n.Title);
                            if (n.Icon && n.Icon.length > 0) {
                                arrNodes.push({
                                    id: n.Id,
                                    label: n.Label,
                                    shape: n.Shape,
                                    title: title,
                                    hidden: false,
                                    icon: {
                                        face: n.Face,
                                        color: n.Color,
                                        code: this.toUnicode(n.Icon)
                                    },
                                    x: n.PosX,
                                    y: n.PosY,
                                    fixed: true,
                                    infoSource: n.InfoSource,
                                    infoTarget: n.InfoTarget,
                                    expandable: n.Expandable,
                                    isObject: n.IsObject,
                                    isProcess: false,
                                    isExpanded: false
                                });
                            }
                            else {
                                arrNodes.push({
                                    id: n.Id,
                                    label: n.Label,
                                    shape: n.Shape,
                                    color: n.Color,
                                    title: title,
                                    hidden: false,
                                    x: n.PosX,
                                    y: n.PosY,
                                    fixed: true,
                                    infoSource: n.InfoSource,
                                    infoTarget: n.InfoTarget,
                                    expandable: n.Expandable,
                                    isObject: n.IsObject,
                                    isProcess: false,
                                    isExpanded: false
                                });
                            }
                        });
                        let dataedges = data.Edges;
                        dataedges.forEach((n) => {
                            //console.log('edge', n);
                            arrEdges.push({
                                from: n.NodeFrom,
                                to: n.NodeTo,
                                color: {
                                    color: n.Color,
                                },
                            });
                        });
                    }
                    this.nodes = new vis.DataSet(arrNodes);
                    this.edges = new vis.DataSet(arrEdges);
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
                            borderWidth: 2,
                            shadow: true
                        },
                        edges: {
                            smooth: {
                                enabled: true,
                                type: "diagonalCross",
                                forceDirection: "none",
                                roundness: 0
                            },
                            width: 2,
                            shadow: true
                        },
                        physics: {
                            repulsion: {
                                nodeDistance: 100
                            },
                            minVelocity: 0.75,
                            solver: "repulsion"
                        },
                        interaction: {
                            dragNodes: false // do not allow dragging nodes
                        }
                    };
                    let container = document.getElementById(this.uuid);
                    this.network = new vis.Network(container, data, options);
                    let self = this;
                    this.network.off('click');
                    this.network.off('oncontext');
                    this.network.on("click", (params) => {
                        self.onNodeClick(params);
                    });
                    this.network.on("oncontext", (params) => {
                        self.onNodeContext(params);
                    });
                    this.network.setSize($(container).width().toString(), $(container).height().toString());
                    this.network.fit();
                }
                onNodeContext(params) {
                    if (params.nodes && params.nodes.length === 1) {
                        let node = this.nodes.get(params.nodes[0]);
                        if (node.objectName && node.objectWhere && node.objectName.length > 0 && node.objectWhere.length > 0) {
                            let cord = {
                                left: params.event.clientX,
                                top: params.event.clientY
                            };
                            params.event.preventDefault();
                            flexygo.nav.getObjectMenu(node.objectName, node.objectWhere, null, $('#mainContent'), cord);
                        }
                    }
                }
                /**
                * Handles click on network graphics
                * @method onNodeClick
                * @param {any} parms. The event param
                */
                onNodeClick(params) {
                    if (params.nodes && params.nodes.length === 1) {
                        let node = this.nodes.get(params.nodes[0]);
                        if (node.expandable === true && node.infoSource && node.infoSource.length > 0 && node.infoTarget && node.infoTarget.length > 0) {
                            if (node.isExpanded === true) {
                                node.isExpanded = false;
                                let childs = this.network.getConnectedNodes(node.id);
                                for (let child of childs) {
                                    let childNode = this.nodes.get(child);
                                    if (childNode.isProcess === true) {
                                        childNode.hidden = true;
                                        this.nodes.update(childNode);
                                    }
                                }
                                this.nodes.update(node);
                            }
                            else {
                                let childs = this.network.getConnectedNodes(node.id, 'from');
                                let childNodes = [];
                                for (let child of childs) {
                                    let childNode = this.nodes.get(child);
                                    if (childNode.isProcess === true) {
                                        childNodes.push(childNode);
                                    }
                                }
                                if (childNodes.length > 0) {
                                    for (let childNode of childNodes) {
                                        childNode.hidden = false;
                                        this.nodes.update(childNode);
                                    }
                                    node.isExpanded = true;
                                    this.nodes.update(node);
                                }
                                else {
                                    let procparams = {
                                        areaId: this.currentNode.NodeId,
                                        source: node.infoSource,
                                        target: node.infoTarget
                                    };
                                    flexygo.ajax.post('~/api/Navigation', 'GetProcessesNodes', procparams, (response) => {
                                        //console.log(response);
                                        node.isExpanded = true;
                                        this.nodes.update(node);
                                        let maxId = 0;
                                        this.nodes.forEach((n) => {
                                            if (n.id > maxId) {
                                                maxId = parseInt(n.id);
                                            }
                                        });
                                        maxId += 1;
                                        let edgeColor = '';
                                        response.forEach((nn) => {
                                            if (edgeColor.length === 0) {
                                                edgeColor = nn.EdgeColor;
                                            }
                                            this.nodes.add([{
                                                    id: maxId,
                                                    label: this.setMultiline(nn.ProcessDescrip),
                                                    shape: 'icon',
                                                    hidden: false,
                                                    isObject: false,
                                                    isProcess: true,
                                                    objectName: nn.ObjectName,
                                                    objectWhere: nn.ObjectWhere,
                                                    icon: {
                                                        face: nn.IconFace,
                                                        color: nn.Color,
                                                        code: this.toUnicode(nn.Icon)
                                                    }
                                                }]);
                                            this.edges.add([{
                                                    from: node.id,
                                                    to: maxId,
                                                    color: {
                                                        color: edgeColor,
                                                    },
                                                }]);
                                            maxId += 1;
                                        });
                                        this.network.stabilize();
                                    });
                                }
                            }
                        }
                    }
                }
                setMultiline(s) {
                    let ret = '';
                    if (!s || s.length < 31) {
                        return s;
                    }
                    let length = 25;
                    while (s.length > 0) {
                        ret += s.substring(0, length);
                        s = s.substring(length);
                        let n = 0;
                        let end = false;
                        while (s.charAt(n) !== ' ') {
                            n++;
                            if (n > s.length) {
                                end = true;
                                break;
                            }
                        }
                        if (end === true) {
                            ret += s;
                            return ret;
                        }
                        ret += s.substring(0, n);
                        ret += '\n';
                        s = s.substring(n + 1);
                        ret += s.substring(0, length);
                        s = s.substring(length);
                    }
                    return ret;
                }
                /**
               * get Node icon
               * @method getIcon
               * @param {String} IconClass. The icon class
                * @param {String} IconPath. The icon path
               */
                getIcon(IconClass, IconPath) {
                    if (IconClass && IconClass != '') {
                        return '<i class="' + IconClass + '" flx-fw></i>';
                    }
                    else if (IconPath && IconPath != '') {
                        return '<img src="' + IconPath + '" alt="" />';
                    }
                    else {
                        return '';
                    }
                }
                /**
              * Gets current breadcrum
              * @method getBreadcrum
              *  @param  json. Json elements
              * @return {string}
              */
                getBreadcrum(json) {
                    let i = 0;
                    let itemtext = '';
                    if (this.breadcrumArray.length == 0) {
                        if (json) {
                            let item = {
                                id: json.NodeId,
                                title: json.Title
                            };
                            this.breadcrumArray.push(item);
                        }
                        else {
                            this.breadcrumArray.push({ id: '', title: 'Areas' });
                        }
                    }
                    for (i = 0; i < this.breadcrumArray.length; i++) {
                        itemtext += `<li data-id="${this.breadcrumArray[i].id}"><a>${this.breadcrumArray[i].title}</a></li>`;
                    }
                    return '<nav aria-label="breadcrumb"><ol class="breadcrumb" >' + itemtext + '</ol></nav>';
                }
                /**
               * Replace nodes with new parent id childs. Does not work with autogenerated nodes
               * @method diveIn
               * @param  {string} nodeId. The node id
               * @param {string} title. The node title
               */
                diveIn(nodeId, title) {
                    let me = $(this);
                    if (nodeId != '') {
                        this.breadcrumArray.push({ id: nodeId, title: title });
                        me.find('.child-nodes').hide('slide', {}, 500, () => {
                            if ($("li:animated").length === 0) {
                                me.attr('initNode', nodeId);
                                this.init();
                            }
                        });
                    }
                }
                /**
                * Goas back to original node
                * @method goBack
                * @param {String} nodeId. New parent node
           
                */
                goBack() {
                    let me = $(this);
                    if (this.backNode) {
                        this.breadcrumArray.pop();
                        me.find('.child-nodes').hide('slide', {}, 500, () => {
                            me.attr('initNode', this.backNode);
                            this.init();
                        });
                    }
                }
                /**
                * Goas back until node is reached
                * @method goBack
                * @param {String} nodeId. New parent node
           
                */
                goNode(nodeId) {
                    let me = $(this);
                    let last = this.breadcrumArray.pop();
                    while (last.id !== nodeId) {
                        last = this.breadcrumArray.pop();
                    }
                    this.breadcrumArray.push(last);
                    me.find('.child-nodes').hide('slide', {}, 500, () => {
                        me.attr('initNode', last.id);
                        this.init();
                    });
                }
                /**
              * Sees if node has childnodes an returns the noshow class
              * @method getNoShow
              * @param  json. Json elements
              * @param {string} mode. check for parent ,child or process mode
              */
                getNoShow(json, mode) {
                    if (mode == 'parent') {
                        if (json.ParentNodeId) {
                            return '';
                        }
                    }
                    if (mode == 'process') {
                        if (json.StrType !== 'text' && json.StrType !== 'group') {
                            return '';
                        }
                    }
                    else {
                        if (json.ChildNodes && Object.keys(json.ChildNodes).length > 0) {
                            return '';
                        }
                        // Ares do not have nodes
                        if (json.Params && json.Params.length > 0) {
                            return '';
                        }
                    }
                    return 'noshow';
                }
                toUnicode(name) {
                    let testI = document.createElement('i');
                    let char;
                    testI.className = name;
                    document.body.appendChild(testI);
                    char = window.getComputedStyle(testI, ':before').content.replace(/'|"/g, '');
                    testI.remove();
                    let code = char.charCodeAt(0);
                    try {
                        return JSON.parse('"\\u' + code.toString(16) + '"');
                    }
                    catch (e) {
                        return '';
                    }
                }
            }
            wc.FlxAreaElement = FlxAreaElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-area', flexygo.ui.wc.FlxAreaElement);
//# sourceMappingURL=flx-area.js.map