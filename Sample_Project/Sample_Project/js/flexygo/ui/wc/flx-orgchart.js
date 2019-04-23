var flexygo;
(function (flexygo) {
    var ui;
    (function (ui) {
        var wc;
        (function (wc) {
            /**
            * Library for the flx-easyinfo web component.
            *
            * @class FlxOrgChartlement
            * @constructor
            * @return {FlxOrgChartlement} .
            */
            class FlxOrgChartElement extends HTMLElement {
                constructor() {
                    super();
                    this.objectname = null;
                    this.objectwhere = null;
                    this.data = null;
                    this.tHeader = null;
                    this.tBody = null;
                    this.tFooter = null;
                    this.moduleName = null;
                    this.tree = null;
                    this.options = null;
                    this.stackChildren = true;
                    /**
                   * Set when component is attached to DOM
                   * @property connected {boolean}
                   */
                    this.connected = false;
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = $(this);
                    this.moduleName = element.attr("modulename");
                    this.connected = true;
                    if (this.moduleName) {
                        if (element.attr('manualInit') != 'true') {
                            this.init();
                        }
                    }
                }
                /**
               * Array of observed attributes.
               * @property observedAttributes {Array}
               */
                static get observedAttributes() {
                    return ['modulename', 'objectname', 'objectwhere'];
                }
                /**
                * Fires when the attribute value of the element is changed.
                * @method attributeChangedCallback
                */
                attributeChangedCallback(attrName, oldVal, newVal) {
                    let isDirty = false;
                    if (!this.connected) {
                        return;
                    }
                    if (attrName.toLowerCase() == 'modulename' && newVal && newVal != '') {
                        this.moduleName = newVal;
                        if (this.moduleName) {
                            isDirty = true;
                        }
                    }
                    if (this && attrName.toLowerCase() == 'objectname' && newVal && newVal != '') {
                        this.objectname = newVal;
                        if (this.objectname) {
                            isDirty = true;
                        }
                    }
                    if (this && attrName.toLowerCase() == 'objectwhere' && newVal && newVal != '') {
                        this.objectwhere = newVal;
                        if (this.objectwhere) {
                            isDirty = true;
                        }
                    }
                    if (this.connected === true && (isDirty === true)) {
                        this.refresh();
                    }
                }
                /**
               * Refresh de webcomponent.
               * @method refresh
               */
                refresh() {
                    if ($(this).attr('manualInit') != 'true') {
                        this.init();
                    }
                }
                /**
               * Init the webcomponent.
               * @method init
               */
                init() {
                    let me = $(this);
                    me.removeAttr('manualInit');
                    me.empty();
                    this.options = { chart: { connectors: { type: 'step' }, node: { HTMLclass: 'orgchartnode' }, hideRootNode: true, animteOnInit: true } };
                    if (this.moduleName) {
                        let params = {
                            ObjectName: this.objectname,
                            ObjectWhere: this.objectwhere,
                            ModuleName: this.moduleName,
                            PageName: flexygo.history.getPageName(me)
                        };
                        flexygo.ajax.post('~/api/OrgChart', 'GetNodes', params, (response) => {
                            if (response) {
                                this.tHeader = response.Template.Header;
                                this.tFooter = response.Template.Footer;
                                this.tBody = response.Template.Body;
                                this.data = response.Template.TableData;
                                if (!flexygo.utils.isBlank(response.Options)) {
                                    this.options = response.Options;
                                }
                                this.render();
                            }
                            else {
                                this.stopLoading();
                            }
                        }, (error) => { flexygo.exceptions.httpShow(error); this.stopLoading(); }, null, () => { this.startLoading(); });
                    }
                }
                /**
               * Render from module configuration.
               * @method render
               */
                render() {
                    let me = $(this);
                    let parentModule = me.closest('flx-module');
                    let wcModule = parentModule[0];
                    let rendered = '';
                    if (this.data.length > 0) {
                        if (this.tHeader && this.tHeader !== '') {
                            let render = flexygo.utils.parser.recursiveCompile(this.data[0], this.tHeader, this);
                            rendered += render;
                        }
                        let uniqueId = flexygo.utils.uniqueId();
                        rendered += '<div class="flx-orgchart" id="' + uniqueId + '"></div>';
                        if (this.tFooter && this.tFooter !== '') {
                            let render = flexygo.utils.parser.recursiveCompile(this.data[0], this.tFooter, this);
                            rendered += render;
                        }
                        me.html(rendered);
                        let initialNode = new flexygo.api.orgchart.Node();
                        initialNode.children = new Array();
                        if (this.tBody && this.tBody !== '') {
                            for (let i = 0; i < this.data.length; i++) {
                                if (flexygo.utils.isBlank(this.data[i].Parent)) {
                                    let node = new flexygo.api.orgchart.Node();
                                    node.id = this.data[i].Id;
                                    node.innerHTML = flexygo.utils.parser.recursiveCompile(this.data[i], this.tBody, this);
                                    node.children = this.getChildren(this.data[i].Id);
                                    node.stackChildren = this.stackChildren;
                                    initialNode.children.push(node);
                                }
                            }
                        }
                        this.options.chart.container = "#" + uniqueId;
                        this.options.chart.callback = {
                            onTreeLoaded: () => { this.stopLoading(); }
                        };
                        this.options.nodeStructure = initialNode;
                        this.tree = new Treant(this.options);
                    }
                    if (parentModule && wcModule) {
                        wcModule.moduleLoaded(this);
                    }
                }
                getChildren(id) {
                    let children = new Array();
                    for (let i = 0; i < this.data.length; i++) {
                        if (this.data[i].Parent == id) {
                            let node = new flexygo.api.orgchart.Node();
                            node.id = this.data[i].Id;
                            node.innerHTML = flexygo.utils.parser.recursiveCompile(this.data[i], this.tBody, this);
                            node.children = this.getChildren(this.data[i].Id);
                            node.stackChildren = this.stackChildren;
                            node.collapsable = true;
                            children.push(node);
                        }
                    }
                    if (children.length > 0) {
                        return children;
                    }
                    else {
                        return null;
                    }
                }
                /**
                * Translates string.
                * @method addEasInfo
                * @param {string} str
                * @return {string}
                */
                translate(str) {
                    return flexygo.localization.translate(str);
                }
                /**
                * Start loading.
                * @method startLoading
                */
                startLoading() {
                    if ($(this).parents('flx-module').length > 0) {
                        $(this).parents('flx-module')[0].startLoading();
                    }
                }
                /**
                * Stop loading.
                * @method stopLoading
                */
                stopLoading() {
                    if ($(this).parents('flx-module').length > 0) {
                        $(this).parents('flx-module')[0].stopLoading();
                    }
                }
            }
            wc.FlxOrgChartElement = FlxOrgChartElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-orgchart', flexygo.ui.wc.FlxOrgChartElement);
//# sourceMappingURL=flx-orgchart.js.map