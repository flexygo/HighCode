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
            * @class FlxNavElement
            * @constructor
            * @return {FlxNavElement}
            */
            class FlxNavElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                    * Set when component is attached to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                    this.wcTemplate = null;
                    this.headerTemplate = null;
                    this.itemTemplate = null;
                    this.method = null;
                    this.methodParams = null;
                    this.hierarchical = false;
                    this.maxId = null;
                    this.initNode = null;
                    this.template = `
            <li typeid="{{type}}" title="{{Title}}" class="{{cssClass}} {{hasChildNodesLiClass(json)}}">
                <span class="{{hasChildNodesClass(json)}}" onClick="{{getTreeNavigate(json)}}">
                    {{getIcon(IconClass,IconPath)}}
                    <span>&nbsp;{{Title}}</span>
                </span>
                {{getChildNodes(json)}}
            </li>`;
                    this.separatorTemplate = `
            <li typeid="{{type}}" title="{{Title}}" class="separator {{cssClass}}"></li>`;
                    this.network = null;
                    this.nodes = null;
                    this.edges = null;
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
                    return ['mode', 'hierarchical'];
                }
                /**
              * Fires when the attribute value of the element is changed.
              * @method attributeChangedCallback
              * @param {String} attrName. The attribute name
              * @param {String} oldVal. The old value
              * @param {String} newVal.the new value
              */
                attributeChangedCallback(attrName, oldVal, newVal) {
                    if (oldVal === newVal) {
                        return;
                    }
                    if (attrName === 'mode') {
                        if (newVal && newVal.length > 0) {
                            this.mode = newVal.toLowerCase();
                        }
                        else {
                            this.mode = null;
                        }
                    }
                    if (attrName === 'hierarchical') {
                        if (newVal && newVal.length > 0) {
                            if (newVal.toLowerCase() === 'true') {
                                this.hierarchical = true;
                            }
                            else {
                                this.hierarchical = false;
                            }
                        }
                        else {
                            this.hierarchical = false;
                        }
                    }
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
                    let navBar = $(this);
                    navBar.removeAttr('manualInit');
                    navBar.empty();
                    this.connected = true;
                    let initNode = navBar.attr('initNode');
                    let headerTemplate = '<div class="flip-card" onclick="$(this).toggleClass(\'flip-card-reverse\');"> <div class="flip-card-flipper"><div class="flip-card-front "><div class="admin"><h3>{{Title}}</h3><span class="main-icon"> <i class="flx-icon {{IconClass}} icon-5x"></i></span></div><div class="more-info"><i class="flx-icon icon-arrow-head-2 "></i>' + flexygo.localization.translate('flxnav.moreinfo') + '</div></div><div class="flip-card-back"><div class="admin reverse"><div class="child-nodes admin-back"></div><div class="back"><i class="flx-icon icon-arrow-head-2 icon-rotate-180"></i>&nbsp;</div></div></div></div>';
                    let itemTemplate = '<li typeid="{{type}}" class="{{cssClass}}" onClick="{{getTreeNavigate(json)}}"><i class="{{hasChildNodesClass(json)}} icon-zoom" > {{getIcon(IconClass,IconPath)}}</i><span>{{Title}}</span></li>';
                    if (this.mode == 'box') {
                        headerTemplate = '<div class="box" onclick="$(this).toggleClass(\'selected\')"> <span class="icon-cont"><i class="{{IconClass}}"></i></span><h3>{{Title}}</h3><div class="noshow child-nodes"></div><a class="expand"><span class="plus"></span><span class="minus">-</span></a></div>';
                        itemTemplate = '<li typeid="{{type}}" class="{{cssClass}}" onClick="{{getTreeNavigate(json)}}">{{getIcon(IconClass,IconPath)}} &nbsp;{{Title}}</li>';
                    }
                    else if (this.mode == 'network') {
                        headerTemplate = '<div class="graphcontainer"></div>';
                        itemTemplate = ';';
                    }
                    else if (this.mode == 'mobile') {
                        itemTemplate = '<li typeid="{{type}}" class="{{cssClass}}" onClick="{{getTreeNavigate(json)}}">{{getIcon(IconClass,IconPath)}} &nbsp;{{Title}}</li>';
                    }
                    this.wcTemplate = '<li typeid="{{type}}" title="{{Title}}" class="{{cssClass}}"><span>{{WebComponent}}</span></li>';
                    if (!navBar.attr('original-mode')) {
                        navBar.attr('original-mode', this.mode);
                    }
                    if (this.mode == 'menu' && this.id == 'mainMenu' && flexygo.utils.isSizeMobile()) {
                        this.mode = 'nav';
                    }
                    //nav.cssClass = 'card-info'
                    //if (navBar.attr('Class')){nav.cssClass =navBar.attr('Class')}
                    this.headerTemplate = headerTemplate;
                    if (initNode) {
                        if (initNode == 'navBar') {
                            this.method = 'GetNavNodes';
                            $(window).off('resize.getNavNodes');
                            $(window).on('resize.getNavNodes', (ev) => { this.onNavResize(ev); });
                            this.methodParams = null;
                        }
                        else if (initNode == 'mainBar') {
                            this.method = 'GetMainNodes';
                            $(window).off('resize.getMainNodes');
                            $(window).on('resize.getMainNodes', (ev) => { this.onNavResize(ev); });
                            this.methodParams = null;
                        }
                        else {
                            this.method = 'GetNodesById';
                            this.methodParams = { ParentId: initNode, HideAutoSQLNodes: false };
                            if (((this.mode == 'panel')) || (this.mode === 'box') || (this.mode === 'mobile')) {
                                this.template = itemTemplate;
                            }
                        }
                        this.initNode = initNode;
                        this.loadNodes();
                    }
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
               * Does post to load Nodes.
               * @method loadNodes
               */
                loadNodes() {
                    flexygo.ajax.post('~/api/Navigation', this.method, this.methodParams, (response) => {
                        $(this).empty();
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
                    if (this.mode == 'network') {
                        this.loadNodesNetworkMode(ret);
                        return;
                    }
                    let me = $(this);
                    let cnt = '';
                    let firstEscape = false;
                    if (this.mode && ((this.mode === 'panel') || (this.mode === 'box') || (this.mode === 'mobile'))) {
                        firstEscape = true;
                    }
                    this.setAdditionalButtons(this.mode);
                    for (let nKey in ret) {
                        if ((!firstEscape || ret[nKey].NodeId != this.initNode.toLowerCase()) && (ret[nKey].Enabled)) {
                            if (ret[nKey].StrType == 'wc') {
                                cnt += flexygo.utils.parser.compile(ret[nKey], this.wcTemplate, this);
                            }
                            else if (ret[nKey].StrType == 'separator') {
                                cnt += flexygo.utils.parser.compile(flexygo.utils.lowerKeys(ret[nKey], true), this.separatorTemplate, this);
                            }
                            else {
                                cnt += flexygo.utils.parser.compile(flexygo.utils.lowerKeys(ret[nKey], true), this.template, this);
                            }
                        }
                    }
                    // Add node config
                    let cnftemplate = '<li StrType="{{StrType}}" title="{{Title}}" class="{{cssClass}}"><span onClick="flexygo.debug.manageNodes($(\'#realMain\'),\'' + this.initNode + '\')"> {{getIcon(IconClass,IconPath)}} <span>&nbsp;{{Title}}</span></span></li>';
                    let cnfNode = { StrType: "process", ProcessName: "LogOff", ChildNodes: "", IconClass: "flx-icon icon-admon", Title: "Node Settings", TargetId: "current", cssClass: "develop-only noText confignode", IconPath: "" };
                    cnt += flexygo.utils.parser.compile(cnfNode, cnftemplate, this);
                    let elem = $('<ul />').html(cnt).first();
                    let clkEvent = this.navItemClick;
                    elem.find('li>span').each((i, e) => {
                        /*let itm = $(this);
                        if (itm.is('[onClick]')) {
                            let handler = $(this).attr('onClick');
                   
                            itm.removeProp('onClick');
                            itm.removeAttr('onClick');
         
                            itm.on('mousedown', function () { clkEvent($(this), cntx.navBar,handler); })
                        } else {
                            itm.on('mousedown', function () { clkEvent($(this), cntx.navBar); })
                        }*/
                        $(e).on('mouseup', (ev) => {
                            clkEvent($(ev.currentTarget), me);
                            ev.stopPropagation();
                            ev.preventDefault();
                            ev.returnValue = false;
                            ev.cancelBubble = true;
                            return false;
                        });
                    });
                    if ((this.mode) && ((this.mode === 'panel') || (this.mode === 'box'))) {
                        let parentNode = null;
                        for (let nKey in ret) {
                            if (ret[nKey].NodeId == this.initNode.toLowerCase()) {
                                parentNode = ret[nKey];
                                break;
                            }
                        }
                        me.append(flexygo.utils.parser.compile(parentNode, this.headerTemplate, this));
                        let i = me.find('.child-nodes');
                        i.html(elem);
                    }
                    else {
                        me.append(elem);
                    }
                }
                /**
                * loads Nodes with in network mode post result.
                * @method loadNodesNetworkMode
                * @param {Array} ret. an array with the nodes
                */
                loadNodesNetworkMode(ret) {
                    let me = $(this);
                    let container = null;
                    if (this.children.length === 0) {
                        me.append(this.headerTemplate);
                    }
                    //Set child nodes in parent nodes
                    ret.forEach((parent) => {
                        ret.forEach((child) => {
                            if (child.ParentNodeId.toLowerCase() === parent.NodeId.toLowerCase()) {
                                if (typeof parent.ChildNodes.length === "undefined") {
                                    parent.ChildNodes = [];
                                }
                                parent.ChildNodes[child.NodeId] = child;
                                ret.splice(ret.indexOf(child));
                            }
                        });
                    });
                    this.nodes = new vis.DataSet([]);
                    this.edges = new vis.DataSet([]);
                    ret.forEach((e) => {
                        if (e.NodeId.toLowerCase() === this.initNode.toLowerCase()) {
                            let mainNode = this.addNode(e, null);
                            this.expandNode(mainNode, mainNode);
                        }
                    });
                    let layout = {};
                    if (this.hierarchical === true) {
                        layout = {
                            hierarchical: true
                        };
                    }
                    let data = {
                        nodes: this.nodes,
                        edges: this.edges
                    };
                    let options = {
                        autoResize: true,
                        layout: layout,
                        height: '100%',
                        width: '100%',
                        nodes: {
                            shape: 'circle',
                            size: 50,
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
                            enabled: true
                        }
                    };
                    container = me.find('div.graphcontainer');
                    this.network = new vis.Network(container[0], data, options);
                    this.network.on('click', this.nodeClick);
                }
                /**
                * Resizes the network graphic
                * @method resizeNetwork
                */
                resizeNetwork() {
                    let body = $(this).closest('flx-module');
                    this.network.setSize(body.width().toString(), body.height().toString());
                    this.network.fit();
                }
                /**
               * Adds a node in network mode
               * @method loadNodesNetworkMode
               * @param {flexygo.api.navigation.NavigationNode} nn. Navigation node to add
               * @param {FlxAreaNode} parent. Parent network node
               */
                addNode(nn, parent) {
                    let node = this.getNetworkNodeFromNavigationNode(nn);
                    this.nodes.update(node);
                    if (parent) {
                        let edge = {
                            from: parent.id,
                            to: node.id
                        };
                        this.edges.update(edge);
                    }
                    return node;
                }
                /**
                * Expands a node in network mode
                * @method loadNodesNetworkMode
                * @param {flexygo.api.navigation.NavigationNode} nn. Navigation node to add
                * @param {FlxAreaNode} parent. Parent network node
                */
                expandNode(child, parent) {
                    if (child.expanded === false) {
                        child.expanded = true;
                        this.nodes.update(child);
                        Object.keys(child.navnode.ChildNodes).forEach((nn) => {
                            this.addNode(child.navnode.ChildNodes[nn], parent);
                        });
                    }
                    //this.resizeNetwork();
                }
                nodeClick(params) {
                    //[this] in this function is Vis.Network
                    let ctx = params.event.target.closest('flx-nav');
                    if (params.nodes.length > 0) {
                        let nodeId = params.nodes[0];
                        let node = ctx.nodes.get(nodeId);
                        if (node.navnode.ChildNodes && Object.keys(node.navnode.ChildNodes).length > 0) {
                            ctx.expandNode(node, node);
                        }
                    }
                }
                /**
                * Creates a network node from a navigation node
                * @method getNetworkNodeFromNavigationNode
                * @param {flexygo.api.navigation.NavigationNode} nn. the navigation node
                */
                getNetworkNodeFromNavigationNode(nn) {
                    if (!this.maxId) {
                        this.maxId = 1;
                    }
                    let maxId = this.maxId;
                    let nodeIco = null;
                    let nodeShape = null;
                    if (nn.IconClass && nn.IconClass.length > 0) {
                        nodeShape = 'icon';
                        nodeIco = {
                            face: (nn.IconClass.toLowerCase().indexOf('flx-icon') > -1) ? 'Flexygo-icons' : 'FontAwesome',
                            color: flexygo.colors.outstanding,
                            code: this.toUnicode(nn.IconClass)
                        };
                    }
                    else {
                        nodeShape = 'circle';
                    }
                    let node = {
                        id: maxId,
                        label: nn.Title,
                        shape: nodeShape,
                        icon: nodeIco,
                        navnode: nn,
                        expanded: false
                    };
                    this.maxId += 1;
                    return node;
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
                * Gets HTML string with child nodes as ul an li elements.
                * @method getChildNodes
                * @param {JSON} json. json with the nodes
                * @return {String} Returns nodes built as HTML ul element string
                */
                getChildNodes(json) {
                    let cnt = '';
                    let ret = json.childnodes;
                    if (Object.keys(ret).length > 0) {
                        for (let nKey in ret) {
                            if (ret[nKey].enabled) {
                                if (ret[nKey].strtype == 'wc') {
                                    cnt += flexygo.utils.parser.compile(ret[nKey], this.wcTemplate, this);
                                }
                                else {
                                    if (ret[nKey].actiontype == 'separator' || ret[nKey].strtype == 'separator') {
                                        cnt += '<li class="separator"></li>';
                                    }
                                    else {
                                        cnt += flexygo.utils.parser.compile(ret[nKey], this.template, this);
                                    }
                                }
                            }
                        }
                    }
                    if (cnt != '') {
                        return '<ul>' + cnt + '</ul>';
                    }
                    else {
                        return '';
                    }
                }
                /**
                * set Additional Buttons
                * @method setAdditionalButtons
                * @param {String} mode. Navigator mode
                */
                setAdditionalButtons(mode) {
                    let header = $('body > header');
                    if (mode.toLowerCase() == 'nav' && header.find('#buttonMenu').length == 0 && $('flx-nav#mainMenu').length > 0) {
                        header.append('<span id="buttonMenu" onclick="flexygo.nav.toggleMobileMenu()" class="flx-icon icon-bullet-list-3"></span>');
                    }
                    if (mode.toLowerCase() == 'nav' && header.find('#buttonNav').length == 0 && $('flx-nav#mainNav').length > 0) {
                        header.append('<div id="miniButton"><i id="buttonMininNav" class="fa fa-indent flipped" onclick="flexygo.nav.toggleNavBar();" ></i></div>');
                        header.append('<span id="buttonNav" onclick="flexygo.nav.toggleMobileNav()" class="flx-icon icon-menu"></span>');
                    }
                }
                /**
               * Gets HTML string with child nodes with a tree display.
               * @method getTreeNavigate
               * @param {JSON} json. json with the nodes
               * @return {String} Returns nodes built as HTML tree
               */
                getTreeNavigate(json) {
                    let retFunction = '';
                    let objDef = null;
                    if (json.defaults && json.defaults !== '') {
                        objDef = json.defaults;
                        if (typeof objDef == 'object') {
                            for (let key in objDef) {
                                if (objDef != null && objDef[key].toString().indexOf('/Date(') != -1) {
                                    objDef[key] = moment(moment.utc(objDef[key]).toDate()).format('YYYY-MM-DDTHH:mm:ss');
                                }
                            }
                            objDef = JSON.stringify(objDef);
                        }
                    }
                    else if (json.objectdefaults) {
                        objDef = json.objectdefaults;
                        if (typeof objDef == 'object') {
                            for (let key in objDef) {
                                if (objDef != null && objDef[key].toString().indexOf('/Date(') != -1) {
                                    objDef[key] = moment(moment.utc(objDef[key]).toDate()).format('YYYY-MM-DDTHH:mm:ss');
                                }
                            }
                            objDef = JSON.stringify(objDef);
                        }
                    }
                    switch (json.strtype) {
                        case 'action':
                            switch (json.actiontype.toLowerCase()) {
                                case 'view':
                                    retFunction = flexygo.utils.functionToString('flexygo.nav.openPage', ['view', json.objectname, json.objectwhere, objDef, json.targetid], [false, '$(this)']);
                                    break;
                                case 'edit':
                                    retFunction = flexygo.utils.functionToString('flexygo.nav.openPage', ['edit', json.objectname, json.objectwhere, objDef, json.targetid], [false, '$(this)']);
                                    break;
                                case 'clone':
                                    retFunction = flexygo.utils.functionToString('flexygo.nav.openPage', ['edit', json.objectname, json.objectwhere, objDef, json.targetid, null, null, true], [false, '$(this)']);
                                    break;
                                //case 'grid'://ojo no se usa
                                //    retFunction = flexygo.utils.functionToString('flexygo.nav.openPage', ['list', json.objectname, json.objectwhere, null, json.targetid], [false, '$(this)']);
                                //    break;
                                case 'delete':
                                    retFunction = flexygo.utils.functionToString('flexygo.ui.wc.FlxModuleElement.prototype.deleteModule', [json.objectname, json.objectwhere], ['flexygo.utils.getModule(this)', '$(this)']);
                                    break;
                                case 'bagselectnone':
                                    retFunction = flexygo.utils.functionToString('flexygo.ui.wc.FlxModuleElement.prototype.bagSelectionNone', [json.objectname, json.objectwhere], ['flexygo.utils.getModule(this)', '$(this)']);
                                    break;
                                case 'bagselectall':
                                    retFunction = flexygo.utils.functionToString('flexygo.ui.wc.FlxModuleElement.prototype.bagSelectionAll', [json.objectname, json.objectwhere], ['flexygo.utils.getModule(this)', '$(this)']);
                                    break;
                                case 'bagshow':
                                    retFunction = flexygo.utils.functionToString('flexygo.ui.wc.FlxModuleElement.prototype.bagShowOnlySelected', [json.objectname, json.objectwhere], ['flexygo.utils.getModule(this)', '$(this)']);
                                    break;
                                default:
                                    retFunction = "flexygo.msg.alert( flexygo.localization.translate('flxnav.notimplemented'));";
                            }
                            break;
                        case 'group':
                            break;
                        case 'text':
                            break;
                        case 'object':
                            if (json.pagetypeid && json.pagetypeid != '') {
                                retFunction = flexygo.utils.functionToString('flexygo.nav.openPage', [json.pagetypeid, json.objectname, json.objectwhere, objDef, json.targetid], [false, '$(this)']);
                            }
                            else if (json.pagename && json.pagename != '') {
                                retFunction = flexygo.utils.functionToString('flexygo.nav.openPageName', [json.pagename, json.objectname, json.objectwhere, objDef, json.targetid], [false, '$(this)']);
                            }
                            else {
                                retFunction = "flexygo.msg.alert('Page not specified');";
                            }
                            break;
                        case 'process':
                            if (json.processname && json.processname != '') {
                                retFunction = flexygo.utils.functionToString('flexygo.nav.execProcess', [json.processname, json.objectname, json.objectwhere, objDef, null, json.targetid], [false, '$(this)']);
                                if (json.bagonly) {
                                    retFunction = 'if(flexygo.selection.getArray(\'' + json.bagobject + '\').length==0){flexygo.msg.error(\'flxmodule.noItemsSelected\');}else{' + retFunction + '}';
                                }
                            }
                            else {
                                flexygo.localization.translate('flxnav.notimplemented');
                                retFunction = "flexygo.msg.alert(flexygo.localization.translate('flxnav.pIdNotespecified'));";
                            }
                            break;
                        case 'report':
                            if (json.reportname && json.reportname != '') {
                                if (json.reporthasparams) {
                                    retFunction = flexygo.utils.functionToString('flexygo.nav.openReportsParams', [json.reportname, json.reportwhere, json.objectname, json.objectwhere, objDef, json.targetid], [false, '$(this)']);
                                }
                                else {
                                    retFunction = flexygo.utils.functionToString('flexygo.nav.viewReport', [json.reportname, json.reportwhere, json.objectname, json.objectwhere, objDef, null, json.targetid], [false, '$(this)']);
                                }
                            }
                            else {
                                retFunction = "flexygo.msg.alert(flexygo.localization.translate('flxnav.pIdNotespecified'));";
                            }
                            break;
                        case 'page':
                            if (json.pagename && json.pagename != '') {
                                retFunction = flexygo.utils.functionToString('flexygo.nav.openPageName', [json.pagename, json.objectname, json.objectwhere, objDef, json.targetid], [false, '$(this)']);
                            }
                            else {
                                retFunction = "flexygo.msg.alert(flexygo.localization.translate('flxnav.pIdNotespecified'));";
                            }
                            break;
                        case 'external_page':
                            if (json.url && json.url != '') {
                                retFunction = flexygo.utils.functionToString('flexygo.nav.openURL', [json.url, json.params, json.targetid], [false, '$(this)']);
                            }
                            else {
                                retFunction = "flexygo.msg.alert(flexygo.localization.translate('flxnav.urlnotespecified'));";
                            }
                            break;
                        case 'auto':
                            retFunction = "flexygo.msg.alert(flexygo.localization.translate('flxnav.autoSQlnovalidtype'));";
                            break;
                        case 'separator':
                            break;
                        case 'master_table':
                            if (json.objectname && json.objectname != '') {
                                if (json.pagename && json.pagename != '') {
                                    retFunction = flexygo.utils.functionToString('flexygo.nav.openPageName', [json.pagename, json.objectname, json.objectwhere, null, json.targetid], [false, '$(this)']);
                                }
                                else if (json.pagetypeid && json.pagetypeid != '') {
                                    retFunction = flexygo.utils.functionToString('flexygo.nav.openPage', [json.pagetypeid, json.objectname, json.objectwhere, null, json.targetid], [false, '$(this)']);
                                }
                                else {
                                    retFunction = flexygo.utils.functionToString('flexygo.nav.openPage', ['list', json.objectname, json.objectwhere, null, json.targetid], [false, '$(this)']);
                                }
                            }
                            else {
                                retFunction = flexygo.utils.functionToString('flexygo.nav.openEditTable', [json.tablename, json.targetid, json.descrip], [false, '$(this)']);
                            }
                            break;
                        case 'wc':
                            retFunction = "flexygo.msg.alert(flexygo.localization.translate('flxnav.webcomponentnotspecified'));";
                            break;
                        case 'help':
                            if (json.helpid && json.helpid != '') {
                                retFunction = flexygo.utils.functionToString('flexygo.nav.openHelpId', [json.helpid, json.targetid], [false, '$(this)']);
                            }
                            else {
                                retFunction = "flexygo.msg.alert('flxnav.helpidnotspecified');";
                            }
                            break;
                        default:
                            alert(json.strtype);
                    }
                    if (retFunction) {
                        retFunction = "if(!$(this).prop('cancelled')){" + retFunction + "}";
                    }
                    return retFunction;
                }
                /**
                * Sets class if parent tree node has childnodes.
                * @method hasChildNodesClass
                * @param {JSON} json. json with the nodes
                * @return {String} Returns class item-closed when no child nodes
                */
                hasChildNodesClass(json) {
                    if (Object.keys(json.childnodes).length > 0) {
                        return 'item-closed';
                    }
                    else {
                        return '';
                    }
                }
                /**
               * Sets class if parent tree node has childnodes.
               * @method hasChildNodesLiClass
               * @param {JSON} json. json with the nodes
               * @return {String} Returns class parent_li when no child nodes
               */
                hasChildNodesLiClass(json) {
                    if (Object.keys(json.childnodes).length > 0) {
                        return 'parent_li';
                    }
                    else {
                        return '';
                    }
                }
                /**
                * Changes class atribbutes when display is resized.
                * @method onNavResize
                */
                onNavResize(ev) {
                    let me = $(this);
                    if (flexygo.utils.isSizeMobile()) {
                        me.attr('mode', 'nav');
                        if ($(document.activeElement).closest('flx-voicesearch').length == 0) {
                            me.hide();
                        }
                    }
                    else {
                        me.attr('mode', me.attr('original-mode'));
                        if (!me.is('visible')) {
                            me.show();
                        }
                    }
                }
                /**
                * Sets click action depending on node type.
                * @method navItemClick
                * @param {Object} navItem. the nav item
                * @param {Objects} navBar. The nav bar
               */
                navItemClick(navItem, navBar) {
                    let cancelEvent = false;
                    let wcNavBar = navBar[0];
                    let navChild = navItem.parent().find('ul:first');
                    if (navChild.length > 0) {
                        if (navChild.is(':visible')) {
                            navItem.parent().find('ul').slideUp(flexygo.utils.animationTime);
                            navItem.parent().find('.item-opened').addClass("item-closed").removeClass("item-opened");
                            navChild.slideUp(flexygo.utils.animationTime);
                            navItem.addClass("item-closed").removeClass("item-opened");
                            cancelEvent = true;
                        }
                        else {
                            navBar.find('.item-opened').parent().each((i, e) => {
                                if (!$.contains($(e)[0], navItem[0])) {
                                    $(e).find('ul').slideUp(flexygo.utils.animationTime);
                                    $(e).find('.item-opened').addClass("item-closed").removeClass("item-opened");
                                }
                            });
                            navChild.slideDown(flexygo.utils.animationTime);
                            navItem.removeClass("item-closed").addClass("item-opened");
                        }
                    }
                    else {
                        if (!navItem.find('flx-voicesearch').length) {
                            wcNavBar.hideAfterClick();
                        }
                    }
                    navBar.find('.active').removeClass('active');
                    navItem.addClass('active');
                    navItem.prop('cancelled', cancelEvent);
                }
                /**
                 * Hides after click depending if movile or web environment.
                 * @hideAfterClick navItemClick
                */
                hideAfterClick() {
                    if (flexygo.utils.isSizeMobile()) {
                        if ($('#mainNav').is(':visible')) {
                            flexygo.nav.toggleMobileNav();
                        }
                        if ($('#mainMenu').is(':visible')) {
                            flexygo.nav.toggleMobileMenu();
                        }
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
            wc.FlxNavElement = FlxNavElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
$(document).on('click', function (event) {
    if (!flexygo.utils.isSizeMobile()) {
        if ($(event.target).parents('#mainMenu').length == 0) {
            $('#mainMenu').find('.item-opened').parent().find('ul').slideUp(flexygo.utils.animationTime);
            $('#mainMenu').find('.item-opened').addClass("item-closed").removeClass("item-opened");
        }
    }
    //Rubén: Código para controlar que el menú contextual antiguo se esconda solo.
    /*if ($(event.target).parents('.flx-menu').length == 0) {

        let btn = $(event.target);
        if (!$(event.target).is('button')) {
            btn = btn.closest('button');
        }

        if (!$('.flx-menu:visible').parent().is(btn)) {
            $('.flx-menu:not(.keepAlive):visible>ul').slideUp(flexygo.utils.animationTime, function () { $(this).closest('.flx-menu:not(.keepAlive)').remove(); });
        }


    }*/
});
window.customElements.define('flx-nav', flexygo.ui.wc.FlxNavElement);
//# sourceMappingURL=flx-nav.js.map