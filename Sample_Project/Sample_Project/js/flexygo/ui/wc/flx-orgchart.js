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
                    this.AdditionalWhere = null;
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
                    if (this && attrName.toLowerCase() == 'additionalwhere' && newVal && newVal != '') {
                        this.AdditionalWhere = newVal;
                        if (this.AdditionalWhere) {
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
                        return this.init();
                    }
                    return;
                }
                /**
               * Init the webcomponent.
               * @method init
               */
                init() {
                    return new Promise((resolve, _) => __awaiter(this, void 0, void 0, function* () {
                        let me = $(this);
                        me.removeAttr('manualInit');
                        $(this).closest('flx-module').find('.flx-noInitContent').remove();
                        me.empty();
                        this.options = { chart: { connectors: { type: 'step' }, node: { HTMLclass: 'orgchartnode' }, hideRootNode: true, animteOnInit: true } };
                        if (this.moduleName) {
                            let def;
                            let histObj = flexygo.history.get(me);
                            if (typeof histObj != 'undefined' && histObj.defaults) {
                                if (typeof histObj.defaults == 'string') {
                                    def = JSON.parse(flexygo.utils.parser.replaceAll(histObj.defaults, "'", '"'));
                                }
                                else {
                                    def = histObj.defaults;
                                }
                            }
                            let params = {
                                ObjectName: me.attr('ObjectName'),
                                ObjectWhere: me.attr('ObjectWhere'),
                                ModuleName: me.attr('ModuleName'),
                                PageName: flexygo.history.getPageName(me),
                                Defaults: flexygo.utils.dataToArray(def),
                                AdditionalWhere: this.AdditionalWhere,
                            };
                            flexygo.ajax.post('~/api/OrgChart', 'GetNodes', params, 
                            //Success Function
                            (response) => {
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
                                resolve();
                            }, 
                            //Error Function
                            err => {
                                flexygo.utils.modules.loadingErrorFunction(this.closest('flx-module'), err);
                                this.stopLoading();
                                resolve();
                            }, null, 
                            //Before Function
                            () => { this.startLoading(); });
                        }
                        else {
                            resolve();
                        }
                    }));
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
                    flexygo.utils.modules.removeSkeleton(wcModule); //We remove the skeleton so the chart gets properly rendered
                    if (this.data.length > 0) {
                        if (this.tHeader && this.tHeader !== '') {
                            let render = flexygo.utils.parser.recursiveCompile(this.data[0], this.tHeader, this);
                            rendered += render;
                        }
                        let uniqueId = flexygo.utils.uniqueId();
                        rendered += `<div class="zoomElements">
                                <i class="flx-icon icon-zoomout  icon-zoom-115 zoom-ic minusZoom"></i>
                                <input class="sliderZoom"  min="0.1" max= "2" value= "1" step= "0.05"  type= "range"></input>
                                <i class="flx-icon icon-zoom-1 icon-zoom-115 zoom-ic plusZoom" ></i>
                                <i class="flx-icon icon-focus icon-zoom-115 zoom-ic fitZoom"></i>
                            </div>
                            <div class="flx-orgchart margintoporgchart" id="` + uniqueId + `"></div>`;
                        if (this.tFooter && this.tFooter !== '') {
                            let render = flexygo.utils.parser.recursiveCompile(this.data[0], this.tFooter, this);
                            rendered += render;
                        }
                        me.html(rendered);
                        //zoom
                        let slider = me.find(".sliderZoom");
                        slider.on("change", function () {
                            me.find(".flx-orgchart").css({ "zoom": $(this).val() });
                        });
                        me.find(".plusZoom").on("click", function () {
                            slider.val(parseFloat(slider.val()) + parseFloat(slider.attr('step')));
                            slider.change();
                        });
                        me.find(".minusZoom").on("click", function () {
                            slider.val(parseFloat(slider.val()) - parseFloat(slider.attr('step')));
                            slider.change();
                        });
                        me.find(".fitZoom").on("click", function () {
                            if (parseFloat(me.find("svg").attr("width")) != 0) {
                                slider.val($('.cntBody').width() / parseFloat(me.find("svg").attr("width")));
                                slider.change();
                            }
                        });
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
                            onTreeLoaded: () => { this.stopLoading(); this.setInitialZoom(); this.dragScroll(); }
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
                flxTranslate(str) {
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
                /**
               * Set initial zoom to view all content of orgchart.
               * @method setInitialZoom
               */
                setInitialZoom() {
                    let me = $(this);
                    if (parseFloat(me.find("svg").attr("width")) != 0) {
                        let initialZoom = $('.cntBody').width() / parseFloat(me.find("svg").attr("width"));
                        me.find(".sliderZoom").val(initialZoom);
                        me.find(".sliderZoom").change();
                    }
                }
                /**
               * Drag scroll.
               * @method dragScroll
               */
                dragScroll() {
                    const eleX = $(document).find('flx-orgchart .flx-orgchart')[0];
                    const eleY = $(document).find('#mainContent')[0];
                    let pos = { top: 0, left: 0, x: 0, y: 0 };
                    const mouseDownHandler = function (e) {
                        eleX.style.cursor = 'grabbing';
                        eleX.style.userSelect = 'none';
                        pos = {
                            left: eleX.scrollLeft,
                            top: eleY.scrollTop,
                            // Get the current mouse position
                            x: e.clientX,
                            y: e.clientY,
                        };
                        document.addEventListener('mousemove', mouseMoveHandler);
                        document.addEventListener('mouseup', mouseUpHandler);
                    };
                    const mouseMoveHandler = function (e) {
                        // How far the mouse has been moved
                        const dx = e.clientX - pos.x;
                        const dy = e.clientY - pos.y;
                        // Scroll the element
                        eleY.scrollTop = pos.top - dy;
                        eleX.scrollLeft = pos.left - dx;
                    };
                    const mouseUpHandler = function () {
                        eleX.style.cursor = 'grab';
                        eleX.style.removeProperty('user-select');
                        document.removeEventListener('mousemove', mouseMoveHandler);
                        document.removeEventListener('mouseup', mouseUpHandler);
                    };
                    eleX.addEventListener('mousedown', mouseDownHandler);
                }
            }
            /**
           * Array of observed attributes.
           * @property observedAttributes {Array}
           */
            FlxOrgChartElement.observedAttributes = ['modulename', 'objectname', 'objectwhere', 'additionalwhere'];
            wc.FlxOrgChartElement = FlxOrgChartElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-orgchart', flexygo.ui.wc.FlxOrgChartElement);
//# sourceMappingURL=flx-orgchart.js.map