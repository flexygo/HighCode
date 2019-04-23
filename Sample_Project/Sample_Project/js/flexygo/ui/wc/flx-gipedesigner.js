var flexygo;
(function (flexygo) {
    var ui;
    (function (ui_1) {
        var wc;
        (function (wc) {
            var eStepResult;
            (function (eStepResult) {
                eStepResult[eStepResult["NoResult"] = 0] = "NoResult";
                eStepResult[eStepResult["OK"] = 1] = "OK";
                eStepResult[eStepResult["Error"] = 2] = "Error";
                eStepResult[eStepResult["Warning"] = 3] = "Warning";
            })(eStepResult || (eStepResult = {}));
            var eStepStatus;
            (function (eStepStatus) {
                eStepStatus[eStepStatus["Initiliazing"] = 0] = "Initiliazing";
                eStepStatus[eStepStatus["Running"] = 1] = "Running";
                eStepStatus[eStepStatus["Paused"] = 2] = "Paused";
                eStepStatus[eStepStatus["Finished"] = 3] = "Finished";
                eStepStatus[eStepStatus["Aborted"] = 4] = "Aborted";
                eStepStatus[eStepStatus["Waiting"] = 5] = "Waiting";
            })(eStepStatus || (eStepStatus = {}));
            class WorkflowNodeMarker {
            }
            wc.WorkflowNodeMarker = WorkflowNodeMarker;
            class GipeTemplateFilterConfig {
            }
            wc.GipeTemplateFilterConfig = GipeTemplateFilterConfig;
            class FlxGipeDesignerElement extends HTMLElement {
                constructor() {
                    //If a constructor is defined, is REQUIRED call the super constructor
                    super();
                    /**
                    * Set if element has been connected to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                    /**
                    * mxEditor opened dialog
                    * @property dialog {mxWindow}
                    */
                    this.dialog = null;
                    /**
                    * Properties dialog
                    * @property dialog {mxWindow}
                    */
                    this.propertiesDialog = null;
                    /**
                    * Debug dialog
                    * @property dialog {mxWindow}
                    */
                    this.debugDialog = null;
                    /**
                    * Current loaded workflow
                    * @property workflow {flexygo.api.gipe.GipeWorkflow}
                    */
                    this.workflow = null;
                    /**
                    * Current loaded workflow in debug mode
                    * @property workflow {flexygo.api.gipe.GipeWorkflow}
                    */
                    this.debugWorkflow = null;
                    /**
                    * Current execution Id
                    * @property currentExecutionId {number}
                    */
                    this.currentExecutionId = 0;
                    /**
                    * Last cell id painted as executed
                    * @property lastDebugGraphId {number}
                    */
                    this.lastDebugGraphId = null;
                    /**
                    * Last cell that triggered a popup event
                    * @property popupCell {number}
                    */
                    this.popupCell = null;
                    /**
                    * Filter configuration for templates dialog
                    * @property templateFilter {GipeTemplateFilterConfig}
                    */
                    this.templateFilter = null;
                    this.fixedPropertiesDialog = false;
                }
                /**
                * Array of observed attributes. REQUIRED
                * @property observedAttributes {Array}
                */
                static get observedAttributes() {
                    return ["objectname", "objectwhere"];
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    this.connected = true;
                    flexygo.events.on(this, "module", "resized", this.onModuleResize);
                    this.init();
                }
                /**
                * Fires when element is dettached to DOM
                * @method disconnectedCallback
                */
                disconnectedCallback() {
                    flexygo.events.off(this, "module", "resized", this.onModuleResize);
                    if (this.dialog) {
                        this.dialog.destroy();
                    }
                    if (this.propertiesDialog) {
                        this.propertiesDialog.destroy();
                    }
                    if (this.debugDialog) {
                        this.debugDialog.destroy();
                    }
                }
                /**
                * Fires when the attribute value of the element is changed.
                * @method attributeChangedCallback
                */
                attributeChangedCallback(attrName, oldVal, newVal) {
                    let needInit = false;
                    if (this.connected && needInit) {
                        this.init();
                    }
                    if (attrName.toLowerCase() === 'objectname' || attrName.toLowerCase() === 'objectwhere') {
                        if (this.hasAttribute('objectName') && this.hasAttribute('objectwhere')) {
                            if (this.getAttribute('objectName').length > 0 && this.getAttribute('objectWhere').length > 0) {
                                let entity = new flexygo.obj.Entity(this.getAttribute('objectName'), this.getAttribute('objectWhere'));
                                entity.read();
                                this.loadWorkflow(entity.data["WorkflowId"].Value, -1, false);
                            }
                        }
                    }
                }
                /**
                * Init the webcomponent. REQUIRED.
                * @method init
                */
                init() {
                    flexygo.events.on(this, "gipe", "debugstep", this.onDebugStepChanged);
                    //mxBasePath = '../js/plugins/mxgraph';
                    let editorconfig = `
                <mxEditor
	                defaultGroup="group" defaultEdge=""
	                forcedInserting="0"
	                swimlaneRequired="0">

	                <Array as="cycleAttributeValues">
		                <add value="#EEEEEE"/>
		            </Array>
	
	                <Array as="templates"></Array>

                    <mxDefaultKeyHandler as="keyHandler">
		               
	                </mxDefaultKeyHandler>
	
	                <ui>
		                <add as="graph" element="gipegraph"/>
	                </ui>
		
	                <mxGraph as="graph" alternateEdgeStyle="verticalEdge" dropEnabled="1">
		                <mxGraphModel as="model">
			                <root>
				                <Workflow label="" description="" id="0"/>
				                <Layer label="Default Layer">
					                <mxCell parent="0"/>
				                </Layer>
			                </root>
		                </mxGraphModel>
		                
                        <mxStylesheet as="stylesheet">
		                </mxStylesheet>
	                </mxGraph>
	
                </mxEditor>

            `;
                    let self = this;
                    let me = $(this);
                    this.workflowStack = [];
                    this.debugStack = [];
                    me.empty();
                    this.uuid = flexygo.utils.uniqueUUID();
                    if (!mxClient.isBrowserSupported()) {
                        mxUtils.error('Browser is not supported!', 200, false);
                        return;
                    }
                    let template = `
                <div id="${this.uuid}" class="gipecp">
                   <div class="gipetoolbar" id="gipetoolbar" />
                   <ol class="breadcrumb" />
                   <div class="gipecp graph" id="gipegraph" />
                </div>
            `;
                    me.html(template);
                    me.find('#gipegraph').droppable({
                        drop: (event, ui) => {
                            this.doDropTemplate(ui);
                        }
                    });
                    //Load base config from XML template
                    mxClient.language = null;
                    mxObjectCodec.allowEval = true;
                    let doc = mxUtils.parseXml(editorconfig).childNodes[0];
                    this.editor = new mxEditor(doc);
                    mxObjectCodec.allowEval = false;
                    // Snap to guides
                    mxGraphHandler.prototype.guidesEnabled = true;
                    mxConstants.GUIDE_COLOR = '#FF0000';
                    mxConstants.GUIDE_STROKEWIDTH = 1;
                    mxEdgeHandler.prototype.snapToTerminals = true;
                    //Rest of editor and graph configuration
                    this.initGraphStyles();
                    this.initEditorTemplates();
                    this.initEditorToolbar();
                    this.initEditorKeyHandler();
                    this.initEditorMouseHandler();
                    this.initEditorPopupMenu();
                    this.editor.defaultEdge = this.editor.templates["relation"];
                    this.editor.addAction("open", (editor, cell) => {
                        if (self.editor.isModified() === true) {
                            flexygo.msg.confirm(flexygo.localization.translate('flxgipe.confirmunsavedchanges'), (ret) => {
                                if (ret === true) {
                                    self.openLoadDialog();
                                }
                            });
                        }
                        else {
                            self.openLoadDialog();
                        }
                    });
                    this.editor.addAction("new", (editor, cell) => {
                        self.newWorkflow();
                    });
                    this.editor.addAction("templates", (editor, cell) => {
                        self.openTemplateDialog();
                    });
                    this.editor.addAction("save", (editor, cell) => {
                        self.openSaveDialog();
                    });
                    this.editor.addAction("generate", (editor, cell) => {
                        self.generateWorkflow();
                    });
                    this.editor.addAction("up", (editor, cell) => {
                        self.goUp(self.workflowStack.length - 1);
                    });
                    this.editor.addAction("down", (editor, cell) => {
                        self.goDown();
                    });
                    this.editor.addAction("run", (editor, cell) => {
                        self.runWorkflow();
                    });
                    this.editor.addAction("debug", (editor, cell) => {
                        self.startDebugWorkflow();
                    });
                    this.editor.addAction("showProperties", (editor, cell) => {
                        if ((this.fixedPropertiesDialog === false) && (this.propertiesDialog != null)) {
                            this.propertiesDialog.destroy();
                            return;
                        }
                        if (graph.getSelectionCells().length === 1) {
                            self.showCellProperties(graph.getSelectionCells()[0]);
                        }
                        else {
                            self.showCellProperties(null);
                        }
                    });
                    this.editor.addAction("properties", (editor, cell) => {
                        let btn = $(this).find('button[data-btn="properties"]');
                        if (this.fixedPropertiesDialog === true) {
                            this.fixedPropertiesDialog = false;
                            $(btn).removeClass("mxToolbarItemSelected").addClass("mxToolbarItem");
                            if (this.propertiesDialog) {
                                this.propertiesDialog.destroy();
                                this.destroyPropertiesDialog();
                            }
                        }
                        else {
                            this.fixedPropertiesDialog = true;
                            $(btn).removeClass("mxToolbarItem").addClass("mxToolbarItemSelected");
                            if (!this.propertiesDialog) {
                                this.openPropertiesDialog();
                                if (graph.getSelectionCells().length === 1) {
                                    self.showCellProperties(graph.getSelectionCells()[0]);
                                }
                                else {
                                    self.showCellProperties(null);
                                }
                            }
                        }
                    });
                    let graph = this.editor.graph;
                    //Avoid unconnected edges
                    graph.setAllowDanglingEdges(false);
                    graph.setDisconnectOnMove(false);
                    graph.convertValueToString = function (cell) {
                        return cell.getAttribute('label', '');
                    };
                    var cellLabelChanged = graph.cellLabelChanged;
                    graph.cellLabelChanged = function (cell, newValue, autoSize) {
                        if (mxUtils.isNode(cell.value)) {
                            // Clones the value for correct undo/redo
                            var elt = cell.value.cloneNode(true);
                            elt.setAttribute('label', newValue);
                            newValue = elt;
                        }
                        cellLabelChanged.apply(graph, [cell, newValue, autoSize]);
                    };
                    graph.getSelectionModel().addListener(mxEvent.CHANGE, function (sender, evt) {
                        self.updateToolbarStatus();
                        if (self.fixedPropertiesDialog === true) {
                            if (graph.getSelectionCells().length === 1) {
                                self.showCellProperties(graph.getSelectionCells()[0]);
                            }
                            else {
                                self.showCellProperties(null);
                            }
                        }
                    });
                    this.editor.graph.setHtmlLabels(true);
                    this.setGraphSize();
                    this.render();
                }
                initGraphStyles() {
                    //Graph styles
                    let style = null;
                    //Default vertex style
                    style = new Object();
                    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
                    style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
                    style[mxConstants.STYLE_STROKECOLOR] = '#98c75d';
                    style[mxConstants.STYLE_ROUNDED] = true;
                    style[mxConstants.STYLE_FILLCOLOR] = '#cce3ae';
                    style[mxConstants.STYLE_FONTCOLOR] = 'black';
                    style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
                    style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
                    style[mxConstants.STYLE_FONTSIZE] = '12';
                    style[mxConstants.STYLE_WHITE_SPACE] = 'wrap';
                    this.editor.graph.getStylesheet().putDefaultVertexStyle(style);
                    //Invalid vertex
                    style = new Object();
                    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
                    style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
                    style[mxConstants.STYLE_STROKECOLOR] = '#c75d62';
                    style[mxConstants.STYLE_FILLCOLOR] = '#db9699';
                    this.editor.graph.getStylesheet().putCellStyle("invalid-rectangle", style);
                    //Success vertex
                    style = new Object();
                    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
                    style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
                    style[mxConstants.STYLE_STROKECOLOR] = '#648b30';
                    style[mxConstants.STYLE_FILLCOLOR] = '#8cc048';
                    style[mxConstants.STYLE_STROKEWIDTH] = 4;
                    this.editor.graph.getStylesheet().putCellStyle("success-rectangle", style);
                    //Running rectangle
                    style = new Object();
                    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
                    style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
                    style[mxConstants.STYLE_STROKEWIDTH] = 4;
                    style[mxConstants.STYLE_STROKECOLOR] = '#ffa500';
                    style[mxConstants.STYLE_FILLCOLOR] = '#ffdb99';
                    this.editor.graph.getStylesheet().putCellStyle("running-rectangle", style);
                    //Error rectangle
                    style = new Object();
                    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
                    style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
                    style[mxConstants.STYLE_STROKEWIDTH] = 4;
                    style[mxConstants.STYLE_STROKECOLOR] = '#ff0f0f';
                    style[mxConstants.STYLE_FILLCOLOR] = '#ff4a4a';
                    this.editor.graph.getStylesheet().putCellStyle("error-rectangle", style);
                    // Default edge style
                    style = new Object();
                    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_CONNECTOR;
                    style[mxConstants.STYLE_STROKECOLOR] = '#6482B9';
                    style[mxConstants.STYLE_STROKEWIDTH] = 2;
                    style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
                    style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
                    style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
                    style[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_CLASSIC;
                    style[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_TOP;
                    style[mxConstants.STYLE_FONTSIZE] = '12';
                    style[mxConstants.STYLE_ENDSIZE] = 2;
                    style[mxConstants.STYLE_ENDFILL] = 1;
                    style[mxConstants.STYLE_ROUNDED] = 1;
                    this.editor.graph.getStylesheet().putDefaultEdgeStyle(style);
                    // Running edge style
                    style = new Object();
                    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_CONNECTOR;
                    style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
                    style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
                    style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
                    style[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_CLASSIC;
                    style[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_TOP;
                    style[mxConstants.STYLE_FONTSIZE] = '12';
                    style[mxConstants.STYLE_ENDSIZE] = 2;
                    style[mxConstants.STYLE_ENDFILL] = 1;
                    style[mxConstants.STYLE_ROUNDED] = 1;
                    style[mxConstants.STYLE_STROKEWIDTH] = 4;
                    style[mxConstants.STYLE_STROKECOLOR] = '#ffa500';
                    style[mxConstants.STYLE_FILLCOLOR] = '#ffdb99';
                    this.editor.graph.getStylesheet().putCellStyle("running-edge", style);
                    // Success edge style
                    style = new Object();
                    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_CONNECTOR;
                    style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
                    style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
                    style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
                    style[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_CLASSIC;
                    style[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_TOP;
                    style[mxConstants.STYLE_FONTSIZE] = '12';
                    style[mxConstants.STYLE_ENDSIZE] = 2;
                    style[mxConstants.STYLE_ENDFILL] = 1;
                    style[mxConstants.STYLE_ROUNDED] = 1;
                    style[mxConstants.STYLE_STROKECOLOR] = '#648b30';
                    style[mxConstants.STYLE_FILLCOLOR] = '#8cc048';
                    style[mxConstants.STYLE_STROKEWIDTH] = 2;
                    this.editor.graph.getStylesheet().putCellStyle("success-edge", style);
                    //Label style
                    style = new Object();
                    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
                    style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
                    style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
                    style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
                    style[mxConstants.STYLE_STROKECOLOR] = 'black';
                    style[mxConstants.STYLE_ROUNDED] = true;
                    style[mxConstants.STYLE_FILLCOLOR] = 'white';
                    this.editor.graph.getStylesheet().putCellStyle("label", style);
                    //Ellipse style
                    style = new Object();
                    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ELLIPSE;
                    style[mxConstants.STYLE_PERIMETER] = mxConstants.PERIMETER_ELLIPSE;
                    this.editor.graph.getStylesheet().putCellStyle("ellipse", style);
                    //invalid Ellipse style
                    style = new Object();
                    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ELLIPSE;
                    style[mxConstants.STYLE_PERIMETER] = mxConstants.PERIMETER_ELLIPSE;
                    style[mxConstants.STYLE_STROKECOLOR] = '#c75d62';
                    style[mxConstants.STYLE_FILLCOLOR] = '#db9699';
                    this.editor.graph.getStylesheet().putCellStyle("invalid-ellipse", style);
                    //Success Ellipse style
                    style = new Object();
                    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ELLIPSE;
                    style[mxConstants.STYLE_PERIMETER] = mxConstants.PERIMETER_ELLIPSE;
                    style[mxConstants.STYLE_STROKECOLOR] = '#648b30';
                    style[mxConstants.STYLE_FILLCOLOR] = '#8cc048';
                    style[mxConstants.STYLE_STROKEWIDTH] = 4;
                    this.editor.graph.getStylesheet().putCellStyle("success-ellipse", style);
                    //Error Ellipse style
                    style = new Object();
                    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ELLIPSE;
                    style[mxConstants.STYLE_PERIMETER] = mxConstants.PERIMETER_ELLIPSE;
                    style[mxConstants.STYLE_STROKECOLOR] = '#ff0f0f';
                    style[mxConstants.STYLE_FILLCOLOR] = '#ff4a4a';
                    style[mxConstants.STYLE_STROKEWIDTH] = 4;
                    this.editor.graph.getStylesheet().putCellStyle("error-ellipse", style);
                    //Running Ellipse style
                    style = new Object();
                    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ELLIPSE;
                    style[mxConstants.STYLE_PERIMETER] = mxConstants.PERIMETER_ELLIPSE;
                    style[mxConstants.STYLE_STROKEWIDTH] = 4;
                    style[mxConstants.STYLE_STROKECOLOR] = '#ffa500';
                    style[mxConstants.STYLE_FILLCOLOR] = '#ffdb99';
                    this.editor.graph.getStylesheet().putCellStyle("running-ellipse", style);
                    //Rhombus style
                    style = new Object();
                    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RHOMBUS;
                    style[mxConstants.STYLE_PERIMETER] = mxConstants.PERIMETER_RHOMBUS;
                    this.editor.graph.getStylesheet().putCellStyle("rhombus", style);
                    //Invalid Rhombus style
                    style = new Object();
                    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RHOMBUS;
                    style[mxConstants.STYLE_PERIMETER] = mxConstants.PERIMETER_RHOMBUS;
                    style[mxConstants.STYLE_STROKECOLOR] = '#c75d62';
                    style[mxConstants.STYLE_FILLCOLOR] = '#db9699';
                    this.editor.graph.getStylesheet().putCellStyle("invalid-rhombus", style);
                    //Running rhombus style
                    style = new Object();
                    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RHOMBUS;
                    style[mxConstants.STYLE_PERIMETER] = mxConstants.PERIMETER_RHOMBUS;
                    style[mxConstants.STYLE_STROKEWIDTH] = 4;
                    style[mxConstants.STYLE_STROKECOLOR] = '#ffa500';
                    style[mxConstants.STYLE_FILLCOLOR] = '#ffdb99';
                    this.editor.graph.getStylesheet().putCellStyle("running-rhombus", style);
                    //Success rhombus style
                    style = new Object();
                    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RHOMBUS;
                    style[mxConstants.STYLE_PERIMETER] = mxConstants.PERIMETER_RHOMBUS;
                    style[mxConstants.STYLE_STROKEWIDTH] = 4;
                    style[mxConstants.STYLE_STROKECOLOR] = '#648b30';
                    style[mxConstants.STYLE_FILLCOLOR] = '#8cc048';
                    this.editor.graph.getStylesheet().putCellStyle("success-rhombus", style);
                    //Error rhombus style
                    style = new Object();
                    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RHOMBUS;
                    style[mxConstants.STYLE_PERIMETER] = mxConstants.PERIMETER_RHOMBUS;
                    style[mxConstants.STYLE_STROKEWIDTH] = 4;
                    style[mxConstants.STYLE_STROKECOLOR] = '#ff0f0f';
                    style[mxConstants.STYLE_FILLCOLOR] = '#ff4a4a';
                    this.editor.graph.getStylesheet().putCellStyle("error-rhombus", style);
                    //Cloud style
                    style = new Object();
                    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_CLOUD;
                    style[mxConstants.STYLE_PERIMETER] = mxConstants.PERIMETER_RHOMBUS;
                    this.editor.graph.getStylesheet().putCellStyle("cloud", style);
                    //Invalid Cloud style
                    style = new Object();
                    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_CLOUD;
                    style[mxConstants.STYLE_PERIMETER] = mxConstants.PERIMETER_RHOMBUS;
                    style[mxConstants.STYLE_STROKECOLOR] = '#c75d62';
                    style[mxConstants.STYLE_FILLCOLOR] = '#db9699';
                    this.editor.graph.getStylesheet().putCellStyle("invalid-cloud", style);
                    //Running Cloud style
                    style = new Object();
                    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_CLOUD;
                    style[mxConstants.STYLE_PERIMETER] = mxConstants.PERIMETER_RHOMBUS;
                    style[mxConstants.STYLE_STROKEWIDTH] = 4;
                    style[mxConstants.STYLE_STROKECOLOR] = '#ffa500';
                    style[mxConstants.STYLE_FILLCOLOR] = '#ffdb99';
                    this.editor.graph.getStylesheet().putCellStyle("running-cloud", style);
                    //Success Cloud style
                    style = new Object();
                    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_CLOUD;
                    style[mxConstants.STYLE_PERIMETER] = mxConstants.PERIMETER_RHOMBUS;
                    style[mxConstants.STYLE_STROKEWIDTH] = 4;
                    style[mxConstants.STYLE_STROKECOLOR] = '#648b30';
                    style[mxConstants.STYLE_FILLCOLOR] = '#8cc048';
                    this.editor.graph.getStylesheet().putCellStyle("success-cloud", style);
                    //Error Cloud style
                    style = new Object();
                    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_CLOUD;
                    style[mxConstants.STYLE_PERIMETER] = mxConstants.PERIMETER_RHOMBUS;
                    style[mxConstants.STYLE_STROKEWIDTH] = 4;
                    style[mxConstants.STYLE_STROKECOLOR] = '#ff0f0f';
                    style[mxConstants.STYLE_FILLCOLOR] = '#ff4a4a';
                    this.editor.graph.getStylesheet().putCellStyle("error-cloud", style);
                    //Hexagon style
                    style = new Object();
                    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_HEXAGON;
                    style[mxConstants.STYLE_PERIMETER] = mxConstants.PERIMETER_HEXAGON;
                    style[mxConstants.STYLE_FONTCOLOR] = 'black';
                    style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'none';
                    this.editor.graph.getStylesheet().putCellStyle("hexagon", style);
                    //Invalid hexagon style
                    style = new Object();
                    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_HEXAGON;
                    style[mxConstants.STYLE_PERIMETER] = mxConstants.PERIMETER_HEXAGON;
                    style[mxConstants.STYLE_STROKECOLOR] = '#c75d62';
                    style[mxConstants.STYLE_FILLCOLOR] = '#db9699';
                    this.editor.graph.getStylesheet().putCellStyle("invalid-hexagon", style);
                    //Running hexagon style
                    style = new Object();
                    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_HEXAGON;
                    style[mxConstants.STYLE_PERIMETER] = mxConstants.PERIMETER_HEXAGON;
                    style[mxConstants.STYLE_STROKEWIDTH] = 4;
                    style[mxConstants.STYLE_STROKECOLOR] = '#ffa500';
                    style[mxConstants.STYLE_FILLCOLOR] = '#ffdb99';
                    this.editor.graph.getStylesheet().putCellStyle("running-hexagon", style);
                    //Succes hexagon
                    style = new Object();
                    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_HEXAGON;
                    style[mxConstants.STYLE_PERIMETER] = mxConstants.PERIMETER_HEXAGON;
                    style[mxConstants.STYLE_STROKECOLOR] = '#648b30';
                    style[mxConstants.STYLE_FILLCOLOR] = '#8cc048';
                    style[mxConstants.STYLE_STROKEWIDTH] = 4;
                    this.editor.graph.getStylesheet().putCellStyle("success-hexagon", style);
                    //Error hexagon
                    style = new Object();
                    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_HEXAGON;
                    style[mxConstants.STYLE_PERIMETER] = mxConstants.PERIMETER_HEXAGON;
                    style[mxConstants.STYLE_STROKECOLOR] = '#ff0f0f';
                    style[mxConstants.STYLE_FILLCOLOR] = '#ff4a4a';
                    style[mxConstants.STYLE_STROKEWIDTH] = 4;
                    this.editor.graph.getStylesheet().putCellStyle("error-hexagon", style);
                    //customized workflow
                    style = new Object();
                    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_HEXAGON;
                    style[mxConstants.STYLE_PERIMETER] = mxConstants.PERIMETER_HEXAGON;
                    style[mxConstants.STYLE_STROKECOLOR] = '#a462d6';
                    style[mxConstants.STYLE_FILLCOLOR] = '#c79fe6';
                    //style[mxConstants.STYLE_FONTCOLOR] = 'white';
                    this.editor.graph.getStylesheet().putCellStyle("customized-workflow", style);
                }
                initEditorTemplates() {
                    this.addEditorTemplate('process', '<Process label="' + flexygo.localization.translate('flxgipe.editortemplates.process') + '" description="" fgid="" ><mxCell style="invalid-rectangle" vertex="1" ><mxGeometry as="geometry" width="108" height="48" /></mxCell></Process>');
                    this.addEditorTemplate('object', '<Object label="' + flexygo.localization.translate('flxgipe.editortemplates.object') + '" description="" fgid=""><mxCell vertex="1" style="invalid-ellipse"><mxGeometry as="geometry" width="48" height="48" /></mxCell></Object>');
                    this.addEditorTemplate('decission', '<Decission label="' + flexygo.localization.translate('flxgipe.editortemplates.decission') + '" description="" fgid=""><mxCell vertex= "1" style="invalid-rhombus"><mxGeometry as="geometry" width="108" height="48" /></mxCell></Decission>');
                    this.addEditorTemplate('event', '<Event label="' + flexygo.localization.translate('flxgipe.editortemplates.event') + '" description="" fgid=""><mxCell vertex= "1" style="invalid-cloud"><mxGeometry as="geometry" width="108" height="48" /></mxCell></Event>');
                    this.addEditorTemplate('label', '<Label label="' + flexygo.localization.translate('flxgipe.editortemplates.label') + '" description=""><mxCell vertex= "1" style="label" connectable="0"><mxGeometry as="geometry" width="108" height="48" /></mxCell></Label>');
                    this.addEditorTemplate('group', '<Group label="" description="" ><mxCell vertex="1" style="group" connectable="0"/></Group>');
                    this.addEditorTemplate('relation', '<Relation label="" description=""><mxCell edge="1"><mxGeometry as="geometry" relative="1"/></mxCell></Relation>');
                    this.addEditorTemplate('workflow', '<Workflow label="' + flexygo.localization.translate('flxgipe.editortemplates.workflow') + '" description="" fgid=""><mxCell vertex="1" style="invalid-hexagon" connectable="1"><mxGeometry as="geometry" width="108" height="108"/></mxCell></Workflow>');
                }
                addEditorTemplate(name, xmlString) {
                    let doc = mxUtils.parseXml(xmlString);
                    let codec = new mxCodec(doc);
                    let template = codec.decodeCell(doc.documentElement);
                    this.editor.addTemplate(name, template);
                }
                initEditorPopupMenu() {
                    let self = this;
                    let graph = this.editor.graph;
                    // Installs context menu
                    graph.popupMenuHandler.factoryMethod = function (menu, cell, evt) {
                        self.popupCell = null;
                        if (self.currentExecutionId !== 0) {
                            return;
                        }
                        if (!cell) {
                            if (self.workflow !== null) {
                                menu.addItem(flexygo.localization.translate('flxgipe.popupmenu.workflowproperties'), null, function () { self.showWorkflowProperties(); }, null, "fa fa-gear");
                                menu.addSeparator();
                                cell = graph.getModel().cells[0];
                                menu.addItem(flexygo.localization.translate('flxgipe.popupmenu.view'), null, function () { self.viewCell(cell); }, null, "flx-icon icon-eye");
                                menu.addItem(flexygo.localization.translate('flxgipe.popupmenu.listparams'), null, function () { self.listParamsCell(cell); }, null, "flx-icon icon-bullet-list");
                            }
                            else {
                                return;
                            }
                        }
                        else {
                            let hasId = (cell.value.hasAttribute('fgid') && cell.value.getAttribute('fgid').length > 0);
                            menu.addItem(flexygo.localization.translate('flxgipe.popupmenu.properties'), null, function () { self.showCellProperties(cell); }, null, "fa fa-gear");
                            if (cell.value.localName.toLowerCase() === 'workflow') {
                                if (hasId) {
                                    menu.addItem(flexygo.localization.translate('flxgipe.popupmenu.enter'), null, function () { self.goDown(); }, null, "flx-icon icon-arrow-2");
                                    menu.addSeparator();
                                }
                            }
                            if (hasId) {
                                menu.addSeparator();
                                menu.addItem(flexygo.localization.translate('flxgipe.popupmenu.view'), null, function () { self.viewCell(cell); }, null, "flx-icon icon-eye");
                                if (cell.value.localName.toLowerCase() === 'workflow' || cell.value.localName.toLowerCase() === 'process' || cell.value.localName.toLowerCase() === 'decission') {
                                    menu.addItem(flexygo.localization.translate('flxgipe.popupmenu.listparams'), null, function () { self.listParamsCell(cell); }, null, "flx-icon icon-bullet-list");
                                }
                            }
                            else {
                                menu.addSeparator();
                                menu.addItem(flexygo.localization.translate('flxgipe.popupmenu.new'), null, function () { self.newCell(cell); }, null, "flx-icon icon-new");
                            }
                            //menu.addItem('Edit', null, function () { self.editCell(cell); }, null, "fa fa-gear");
                        }
                        //menu.addSeparator();
                        //var submenu1 = menu.addItem('Submenu 1', null, null);
                        //menu.addItem('Subitem 1', null, function () {
                        //    alert('Subitem 1');
                        //}, submenu1);
                    };
                }
                initEditorToolbar() {
                    var container = document.getElementById("gipetoolbar");
                    var toolbar = new mxDefaultToolbar(container, this.editor);
                    let btn = null;
                    btn = toolbar.addItem("", null, "new");
                    $(btn).append('<i class="flx-icon icon-new" />').attr("title", flexygo.localization.translate('flxgipe.editortoolbar.new'));
                    btn = toolbar.addItem("", null, "open");
                    $(btn).append('<i class="fa fa-folder-open" />').attr("title", flexygo.localization.translate('flxgipe.editortoolbar.open'));
                    btn = toolbar.addItem("", null, "save");
                    $(btn).append('<i class="fa fa-save" />').attr("title", flexygo.localization.translate('flxgipe.editortoolbar.save'));
                    btn = toolbar.addItem("", null, "generate");
                    $(btn).append('<i class="fa fa-arrow-circle-o-right" />').attr("title", flexygo.localization.translate('flxgipe.editortoolbar.generate'));
                    btn = toolbar.addItem("", null, "run");
                    $(btn).append('<i class="flx-icon icon-arrow-head-3" />').attr("title", flexygo.localization.translate('flxgipe.editortoolbar.run'));
                    btn = toolbar.addItem("", null, "debug");
                    $(btn).append('<i class="fa fa-play-circle" />').attr("title", flexygo.localization.translate('flxgipe.editortoolbar.debug'));
                    toolbar.addSeparator();
                    this.versionCombo = toolbar.addCombo();
                    $(this.versionCombo).on('click', (e) => {
                        let val = $(this.versionCombo).val();
                        if (val && val !== '') {
                            if (val != this.workflow.Version) {
                                this.loadWorkflow(this.workflow.WorkflowId, val, false);
                            }
                        }
                    });
                    toolbar.addSeparator();
                    btn = toolbar.addItem("", null, "up");
                    btn.setAttribute("data-action", "up");
                    $(btn).append('<i class="fa fa-expand" />').attr("title", flexygo.localization.translate('flxgipe.editortoolbar.up'));
                    btn = toolbar.addItem("", null, "down");
                    btn.setAttribute("data-action", "down");
                    $(btn).append('<i class="fa fa-compress" />').attr("title", flexygo.localization.translate('flxgipe.editortoolbar.down'));
                    toolbar.addSeparator();
                    btn = toolbar.addMode("", null, "select");
                    $(btn).append('<i class="fa fa-mouse-pointer" />').attr("title", flexygo.localization.translate('flxgipe.editortoolbar.select'));
                    btn = toolbar.addMode("", null, "pan");
                    $(btn).append('<i class="fa fa-hand-pointer-o" />').attr("title", flexygo.localization.translate('flxgipe.editortoolbar.pan'));
                    toolbar.addSeparator();
                    btn = toolbar.addItem("", null, "undo");
                    $(btn).append('<i class="fa fa-undo" />').attr("title", flexygo.localization.translate('flxgipe.editortoolbar.undo'));
                    btn = toolbar.addItem("", null, "redo");
                    $(btn).append('<i class="fa fa-repeat" />').attr("title", flexygo.localization.translate('flxgipe.editortoolbar.redo'));
                    toolbar.addSeparator();
                    btn = toolbar.addItem("", null, "cut");
                    $(btn).append('<i class="fa fa-cut" />').attr("title", flexygo.localization.translate('flxgipe.editortoolbar.cut'));
                    btn = toolbar.addItem("", null, "copy");
                    $(btn).append('<i class="fa fa-copy" />').attr("title", flexygo.localization.translate('flxgipe.editortoolbar.copy'));
                    btn = toolbar.addItem("", null, "paste");
                    $(btn).append('<i class="fa fa-paste" />').attr("title", flexygo.localization.translate('flxgipe.editortoolbar.paste'));
                    btn = toolbar.addItem("", null, "delete");
                    $(btn).append('<i class="fa fa-times-circle" />').attr("title", flexygo.localization.translate('flxgipe.editortoolbar.delete'));
                    toolbar.addSeparator();
                    btn = toolbar.addItem("", null, "group");
                    $(btn).append('<i class="fa fa fa-object-group" />').attr("title", flexygo.localization.translate('flxgipe.editortoolbar.group'));
                    btn = toolbar.addItem("", null, "ungroup");
                    $(btn).append('<i class="fa fa fa-object-ungroup" />').attr("title", flexygo.localization.translate('flxgipe.editortoolbar.ungroup'));
                    toolbar.addSeparator();
                    //var combo = toolbar.addActionCombo('More actions...');
                    //toolbar.addActionOption(combo, 'Paste', 'paste');
                    toolbar.addPrototype(flexygo.localization.translate('flxgipe.editortoolbar.label'), "js/plugins/mxgraph/images/text.gif", this.editor.templates["label"]);
                    toolbar.addPrototype(flexygo.localization.translate('flxgipe.editortoolbar.workflow'), "js/plugins/mxgraph/images/hexagon.gif", this.editor.templates["workflow"]);
                    toolbar.addPrototype(flexygo.localization.translate('flxgipe.editortoolbar.object'), "js/plugins/mxgraph/images/ellipse.gif", this.editor.templates["object"]);
                    toolbar.addPrototype(flexygo.localization.translate('flxgipe.editortoolbar.process'), "js/plugins/mxgraph/images/rectangle.gif", this.editor.templates["process"]);
                    toolbar.addPrototype(flexygo.localization.translate('flxgipe.editortoolbar.decission'), "js/plugins/mxgraph/images/rhombus.gif", this.editor.templates["decission"]);
                    toolbar.addPrototype(flexygo.localization.translate('flxgipe.editortoolbar.event'), "js/plugins/mxgraph/images/cloud.gif", this.editor.templates["event"]);
                    toolbar.addMode(flexygo.localization.translate('flxgipe.editortoolbar.connect'), "js/plugins/mxgraph/images/connect.gif", "connect");
                    toolbar.addSeparator();
                    btn = toolbar.addItem("", null, "fit");
                    $(btn).append('<i class="fa fa-square-o" />').attr("title", flexygo.localization.translate('flxgipe.editortoolbar.fit'));
                    btn = toolbar.addItem("", null, "zoomIn");
                    $(btn).append('<i class="fa fa-search-plus" />').attr("title", flexygo.localization.translate('flxgipe.editortoolbar.zoomin'));
                    btn = toolbar.addItem("", null, "zoomOut");
                    $(btn).append('<i class="fa fa-search-minus" />').attr("title", flexygo.localization.translate('flxgipe.editortoolbar.zoomout'));
                    btn = toolbar.addItem("", null, "actualSize");
                    $(btn).append('<i class="fa fa-search" />').attr("title", flexygo.localization.translate('flxgipe.editortoolbar.actualsize'));
                    toolbar.addSeparator();
                    btn = toolbar.addItem("", null, "templates");
                    $(btn).append('<i class="fa fa-tasks" />').attr("title", flexygo.localization.translate('flxgipe.editortoolbar.templates'));
                    btn = toolbar.addItem("", null, "properties");
                    $(btn).append('<i class="fa fa-gear" />').attr("title", flexygo.localization.translate('flxgipe.editortoolbar.properties'));
                    $(btn).attr("data-btn", "properties");
                }
                initEditorKeyHandler() {
                    //https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
                    this.editor.keyHandler.bindAction(8, "collapse"); //backspace
                    this.editor.keyHandler.bindAction(13, "expand"); //enter
                    this.editor.keyHandler.bindAction(33, "exitGroup");
                    this.editor.keyHandler.bindAction(34, "enterGroup");
                    this.editor.keyHandler.bindAction(35, "refresh"); //end
                    this.editor.keyHandler.bindAction(36, "home"); //home
                    this.editor.keyHandler.bindAction(37, "selectPrevious");
                    this.editor.keyHandler.bindAction(38, "selectParent");
                    this.editor.keyHandler.bindAction(40, "selectChild");
                    this.editor.keyHandler.bindAction(39, "selectNext");
                    this.editor.keyHandler.bindAction(46, "delete"); //delete
                    this.editor.keyHandler.bindAction(113, "edit");
                    this.editor.keyHandler.bindAction(107, "zoomIn"); //add
                    this.editor.keyHandler.bindAction(109, "zoomOut"); //substract
                    this.editor.keyHandler.bindAction(65, "selectAll", true); //Ctrl+A
                    this.editor.keyHandler.bindAction(90, "undo", true); //Ctrl+Z
                    this.editor.keyHandler.bindAction(89, "redo", true); //Ctrol+Y
                    this.editor.keyHandler.bindAction(88, "cut", true);
                    this.editor.keyHandler.bindAction(67, "copy", true);
                    this.editor.keyHandler.bindAction(86, "paste", true);
                    this.editor.keyHandler.bindAction(71, "group", true);
                    this.editor.keyHandler.bindAction(85, "ungroup", true);
                    this.editor.keyHandler.bindAction(115, "showProperties"); //f4
                    //this.editor.keyHandler.bindAction(123, "showProperties"); F12
                }
                initEditorMouseHandler() {
                    let editor = this.editor;
                    mxEvent.addMouseWheelListener((evt, up) => {
                        if (!mxEvent.isConsumed(evt)) {
                            let consume = false;
                            let elem = evt.srcElement;
                            while (elem) {
                                if (elem.hasAttribute("id")) {
                                    if (elem.getAttribute("id") === "gipegraph") {
                                        consume = true;
                                        elem = null;
                                    }
                                }
                                if (elem) {
                                    elem = elem.parentElement;
                                }
                            }
                            if (consume) {
                                if (up) {
                                    editor.execute('zoomIn');
                                }
                                else {
                                    editor.execute('zoomOut');
                                }
                                mxEvent.consume(evt);
                            }
                        }
                    });
                }
                doDropTemplate(ui) {
                    let type = parseInt(ui.draggable.attr("data-type"));
                    let id = ui.draggable.attr("data-id");
                    let descrip = ui.draggable.attr("data-descrip");
                    let style = null;
                    let value = null;
                    let w;
                    let h;
                    switch (type) {
                        case 1:
                            style = 'ellipse';
                            w = 48;
                            h = 48;
                            value = this.editor.templates["object"].value.cloneNode(true);
                            break;
                        case 2:
                            style = 'rounded';
                            w = 108;
                            h = 48;
                            value = this.editor.templates["process"].value.cloneNode(true);
                            break;
                        case 3:
                            style = 'rhombus';
                            w = 108;
                            h = 48;
                            value = this.editor.templates["decission"].value.cloneNode(true);
                            break;
                        case 4:
                            style = 'hexagon';
                            w = 108;
                            h = 108;
                            value = this.editor.templates["workflow"].value.cloneNode(true);
                            break;
                        case 5:
                            style = 'cloud';
                            w = 108;
                            h = 48;
                            value = this.editor.templates["event"].value.cloneNode(true);
                            break;
                        case 6:
                            style = 'label';
                            w = 108;
                            h = 48;
                            value = this.editor.templates["label"].value.cloneNode(true);
                            break;
                    }
                    if (type && style && id) {
                        let parent = this.editor.graph.getDefaultParent();
                        this.editor.graph.getModel().beginUpdate();
                        try {
                            let x = ui.position.left - $('#gipegraph').position().left;
                            if (x < 0)
                                x = 0;
                            let y = ui.position.top - $('#gipegraph').position().top;
                            if (y < 0)
                                y = 0;
                            value.setAttribute("fgid", id);
                            value.setAttribute("label", descrip);
                            let v = this.editor.graph.insertVertex(parent, null, value, x, y, w, h, style);
                        }
                        finally {
                            // Updates the display
                            this.editor.graph.getModel().endUpdate();
                        }
                    }
                }
                setGraphSize() {
                    let module = $(this).closest('flx-module');
                    let height = 0;
                    let toolbarHeight = module.find('#gipetoolbar').outerHeight();
                    if (toolbarHeight < 35) {
                        toolbarHeight = 35;
                    }
                    let graphMargin = ($('#gipegraph').outerHeight(true) - $('#gipegraph').outerHeight());
                    if (module.hasClass("fullscreen")) {
                        let moduleHeight = module.outerHeight();
                        height = moduleHeight - toolbarHeight - graphMargin;
                    }
                    else {
                        let doubleMargin = 2 * ($('#realMain').outerHeight(true) - $('#realMain').outerHeight());
                        let headerHeight = module.find('.cntHeader').outerHeight();
                        let contentHeight = $('#mainContent').height();
                        height = contentHeight - doubleMargin - headerHeight - toolbarHeight - graphMargin;
                    }
                    $(this).find("#gipegraph").height(height);
                }
                /**
                * Refresh the webcomponent. REQUIRED.
                * @method refresh
                */
                refresh() {
                    this.render();
                }
                /**
                * Opens upper workflow
                * @method goUp
                */
                goUp(level) {
                    let exec = () => {
                        while (this.workflowStack.length > level) {
                            this.workflow = this.workflowStack.pop();
                        }
                        this.loadWorkflow(this.workflow.WorkflowId, this.workflow.Version, false);
                    };
                    if (this.workflowStack && this.workflowStack.length > 0) {
                        if (this.editor.isModified() === true) {
                            flexygo.msg.confirm(flexygo.localization.translate('flxgipe.confirmunsavedchanges'), (ret) => {
                                if (ret === true) {
                                    exec();
                                }
                            });
                        }
                        else {
                            exec();
                        }
                    }
                }
                /**
                * Opens lower workflow
                * @method goDown
                */
                goDown() {
                    let selected = this.editor.graph.getSelectionCells();
                    if (selected && selected.length === 1) {
                        let cell = selected[0];
                        if (cell.value && cell.value.localName === 'Workflow') {
                            let wfid = cell.value.getAttribute('fgid');
                            if (this.editor.isModified() === true) {
                                flexygo.msg.confirm(flexygo.localization.translate('flxgipe.confirmunsavedchanges'), (ret) => {
                                    if (ret === true) {
                                        this.loadWorkflow(wfid, -1, true);
                                    }
                                });
                            }
                            else {
                                this.loadWorkflow(wfid, -1, true);
                            }
                        }
                    }
                }
                /**
                * Runs the current workflow
                * @method runWorkflow
                */
                runWorkflow() {
                    if (!this.workflow) {
                        flexygo.msg.error(flexygo.localization.translate('flxgipe.errornoworkflowselected'), null, flexygo.localization.translate('flxgipe.dialogruntitle'));
                        return;
                    }
                    //flexygo.nav.execProcess(this.workflow.WorkflowId, null, null, null, null, 'current', false, $(this));
                    flexygo.ajax.post('~/api/Gipe', 'runWorkflow', { workflowId: this.workflow.WorkflowId, version: this.workflow.Version }, (ret) => {
                    });
                }
                /**
               * Runs the current workflow in debug mode
               * @method startDebugWorkflow
               */
                startDebugWorkflow() {
                    if (!this.workflow) {
                        flexygo.msg.error(flexygo.localization.translate('flxgipe.errornoworkflowselected'), null, flexygo.localization.translate('flxgipe.dialogruntitle'));
                        return;
                    }
                    if (this.currentExecutionId !== 0) {
                        flexygo.msg.error(flexygo.localization.translate('flxgipe.errorallreadydebugging'), null, flexygo.localization.translate('flxgipe.dialogruntitle'));
                        return;
                    }
                    if (!this.debugDialog) {
                        this.openDebugDialog();
                    }
                    $(this.debugDialog.content).find('button[name="dbg-stepinto"]').prop('disabled', true);
                    $(this.debugDialog.content).find('button[name="dbg-stepover"]').prop('disabled', true);
                    flexygo.ajax.post('~/api/Gipe', 'debugWorkflow', { workflowId: this.workflow.WorkflowId, version: this.workflow.Version, executionId: this.currentExecutionId, stepOver: false }, (execId) => {
                        var tree = $('#gipe-debug-tree');
                        let mainNode = {
                            text: this.workflow.Descrip,
                            icon: "flx-icon flx-icon-share"
                        };
                        $.jstree.defaults.core.data = mainNode;
                        $(tree).jstree();
                        this.debugStack = [];
                        this.workflow.ExecutionId = execId;
                        this.debugWorkflow = this.workflow;
                        this.currentExecutionId = execId;
                        this.debugWorkflow.WorkflowData = this.editor.writeGraphModel(null);
                        this.debugStack.push(this.debugWorkflow);
                        this.updateToolbarStatus();
                        this.onDebugStepChanged();
                    });
                }
                /**
                * Open the workflow load dialog
                * @method openLoadDialog
                */
                openLoadDialog() {
                    let content = $('<div></div>');
                    let areaFilter = "";
                    let moduleFilter = "";
                    let workflowFilter = "";
                    let loadTemplate = `
                <div class="col-12" style="position:relative">
                    <label class="control-label ">${flexygo.localization.translate('flxgipe.labelarea')}</label>
                    <flx-dbcombo name="areaId" ObjectName="sysWorkflow" ViewName="areasView" SQLValueField="WorkflowAreaId" SQLDisplayField="Descrip" placeholder="${flexygo.localization.translate('flxgipe.workflowareaplaceholder')}"/>
                    <label class="control-label fgWindowLabel">${flexygo.localization.translate('flxgipe.labelmodule')}</label>
                    <flx-dbcombo name="moduleId" ObjectName="sysWorkflow" ViewName="modulesView" SQLValueField="WorkflowModuleId" SQLDisplayField="Descrip"  placeholder="${flexygo.localization.translate('flxgipe.workflowmoduleplaceholder')}"/>
                    <label class="control-label fgWindowLabel">${flexygo.localization.translate('flxgipe.labelname')}</label>
                    <flx-dbcombo name="workflowid" ObjectName="sysWorkflow" ViewName="defaultWorkflowView" SQLValueField="WorkflowId" SQLDisplayField="Descrip"  placeholder="${flexygo.localization.translate('flxgipe.workflownameplaceholder')}"/>
                    <label class="control-label fgWindowLabel">${flexygo.localization.translate('flxgipe.labelversion')}</label>
                    <flx-dbcombo name="version" ObjectName="sysWorkflow" ViewName="versionsView" SQLValueField="Version" SQLDisplayField="Descrip" additionalWhere ="1=0" placeholder="${flexygo.localization.translate('flxgipe.workflowversionplaceholder')}"/>
                </div>
                <div class="fgWindowToolbar">
                    <button class="btn btn-sm bg-info loadButton"><i class="flx-icon icon-load"></i>${flexygo.localization.translate('flxgipe.buttonload')}</button>
                    <button class="btn btn-sm bg-danger closeButton"><i class="flx-icon icon-remove"></i>${flexygo.localization.translate('flxgipe.buttoncancel')}</button>
                </div>
            `;
                    content.append(loadTemplate);
                    let cboArea = content.find('flx-dbcombo[name="areaId"]')[0];
                    let cboModule = content.find('flx-dbcombo[name="moduleId"]')[0];
                    let cboWorkflow = content.find('flx-dbcombo[name="workflowid"]')[0];
                    let cboVersion = content.find('flx-dbcombo[name="version"]')[0];
                    $(cboArea).on('change', (e) => {
                        let val = cboArea.getValue();
                        if (val && val.length > 0) {
                            areaFilter = "areaId='" + val + "'";
                        }
                        else {
                            areaFilter = "";
                        }
                        cboWorkflow.additionalWhere = this.concatWhere(areaFilter, moduleFilter);
                        cboWorkflow.setValue("");
                        cboWorkflow.refresh();
                    });
                    $(cboModule).on('change', (e) => {
                        let val = cboModule.getValue();
                        if (val && val.length > 0) {
                            moduleFilter = "moduleId='" + val + "'";
                        }
                        else {
                            moduleFilter = "";
                        }
                        cboWorkflow.additionalWhere = this.concatWhere(areaFilter, moduleFilter);
                        cboWorkflow.setValue("");
                        cboWorkflow.refresh();
                    });
                    $(cboWorkflow).on('change', (e) => {
                        let val = e.currentTarget.getValue();
                        if (val && val.length > 0) {
                            workflowFilter = "workflowId='" + val + "'";
                        }
                        else {
                            workflowFilter = "";
                        }
                        cboVersion.additionalWhere = workflowFilter;
                        cboVersion.refresh();
                        flexygo.ajax.post('~/api/Gipe', 'getActiveVersion', { workflowId: val }, (ret) => {
                            if (ret && ret.length > 0) {
                                cboVersion.setValue(ret);
                            }
                        });
                    });
                    let wnd = new mxWindow(flexygo.localization.translate('flxgipe.dialogloadtitle'), content[0], (window.outerWidth / 2) - 150, (window.outerHeight / 2) - 200, 300, 400, false, true, null, "fgWindow");
                    wnd.setMaximizable(false);
                    wnd.setScrollable(true);
                    wnd.setResizable(false);
                    wnd.setClosable(true);
                    wnd.setVisible(true);
                    content.find("button.loadButton").on("click", (e) => {
                        let id = cboWorkflow.getValue();
                        if (!id) {
                            flexygo.msg.error(flexygo.localization.translate('flxgipe.errornoworkflowselected'), null, flexygo.localization.translate('flxgipe.dialogloadtitle'));
                        }
                        else {
                            let ver = cboVersion.getValue();
                            if ((!ver) || (ver && ver.length === 0)) {
                                flexygo.msg.error(flexygo.localization.translate('flxgipe.errornoversionselected'), null, flexygo.localization.translate('flxgipe.dialogloadtitle'));
                            }
                            else {
                                this.workflowStack = [];
                                this.loadWorkflow(id, parseInt(ver));
                                wnd.destroy();
                            }
                        }
                    });
                    content.find("button.closeButton").on("click", (e) => {
                        wnd.destroy();
                    });
                    wnd.addListener(mxEvent.DESTROY, (sender, object) => {
                        this.destroyDialog();
                    });
                    this.showDialog(wnd);
                }
                /**
                * Sets a window as the current dialog
                * @method showDialog
                */
                showDialog(window) {
                    this.dialog = window;
                    this.updateToolbarStatus();
                }
                /**
               * Sets a window as the current properties dialog
               * @method showPropertiesDialog
               */
                showPropertiesDialog(window) {
                    this.propertiesDialog = window;
                    this.updateToolbarStatus();
                }
                /**
                * Sets a window as the current debug dialog
                * @method showDebugDialog
                */
                showDebugDialog(window) {
                    this.debugDialog = window;
                    this.updateToolbarStatus();
                }
                /**
                * Set nothing as the current dialog
                * @method destroyDialog
                */
                destroyDialog() {
                    this.dialog = null;
                    this.updateToolbarStatus();
                }
                /**
               * Set nothing as the current properties dialog
               * @method destroyPropertiesDialog
               */
                destroyPropertiesDialog() {
                    this.propertiesDialog = null;
                    this.updateToolbarStatus();
                }
                /**
                * Set nothing as the current debug dialog
                * @method destroyPropertiesDialog
                */
                destroyDebugDialog() {
                    this.debugDialog = null;
                    this.updateToolbarStatus();
                }
                /**
                 * Loads and display a saved workflow
                 * @method loadWorkflow
                 */
                loadWorkflow(id, version, pushCurrent) {
                    let params = {
                        workflowId: id,
                        version: version
                    };
                    flexygo.ajax.post('~/api/Gipe', 'loadWorkflow', params, (ret) => {
                        if (ret) {
                            if (pushCurrent === true) {
                                this.workflowStack.push(this.workflow);
                            }
                            this.workflow = ret;
                            this.render();
                        }
                    });
                }
                /**
                * Loads and display a saved workflow in debug mode
                * @method loadWorkflow
                */
                loadDebugWorkflow(id, version, newExecutionId, debugInfo) {
                    let stackIndex = -1;
                    this.debugStack.forEach((w, i) => {
                        if (w.ExecutionId === newExecutionId) {
                            stackIndex = i;
                            return false;
                        }
                    });
                    //Store current graphic
                    let currentIndex = -1;
                    this.debugStack.forEach((w, i) => {
                        if (w.ExecutionId === this.debugWorkflow.ExecutionId) {
                            currentIndex = i;
                            return false;
                        }
                    });
                    if (currentIndex === -1) {
                        flexygo.msg.error('Current workflow not found on debug stack');
                        return;
                    }
                    else {
                        //Save current graphic
                        this.debugStack[currentIndex].WorkflowData = this.editor.writeGraphModel(null);
                    }
                    if (stackIndex === -1) {
                        let params = {
                            workflowId: id,
                            version: version
                        };
                        flexygo.ajax.syncPost('~/api/Gipe', 'loadWorkflow', params, (ret) => {
                            this.debugWorkflow = ret;
                            this.debugWorkflow.ExecutionId = newExecutionId;
                            this.debugStack.push(this.debugWorkflow);
                        });
                    }
                    else {
                        this.debugWorkflow = this.debugStack[stackIndex];
                    }
                    this.render();
                    this.updateDebugInfo(debugInfo);
                }
                /**
               * Open the workflow save dialog
               * @method openSaveDialog
               */
                openSaveDialog() {
                    let content = $('<div></div>');
                    let current = (this.workflow) ? this.workflow : { WorkflowId: '', ModuleId: '', AreaId: '', Descrip: 'New workflow', Version: 1, WorkflowData: null, Active: true, Versions: [] };
                    let saveTemplate = `
                <div class="col-12" style="position:relative">
                    <label class="control-label fgWindowLabel">${flexygo.localization.translate('flxgipe.labelarea')}</label>
                    <flx-dbcombo name="dbc-areaid" value="${current.AreaId}" ObjectName="sysWorkflow" ViewName="areasView" SQLValueField="WorkflowAreaId" SQLDisplayField="Descrip" placeholder="${flexygo.localization.translate('flxgipe.workflowareaplaceholder')}"/>
                    <label class="control-label fgWindowLabel">${flexygo.localization.translate('flxgipe.labelmodule')}</label>
                    <flx-dbcombo name="dbc-moduleid" value="${current.ModuleId}" ObjectName="sysWorkflow" ViewName="modulesView" SQLValueField="WorkflowModuleId" SQLDisplayField="Descrip"  placeholder="${flexygo.localization.translate('flxgipe.workflowmoduleplaceholder')}"/>
                    <label class="control-label fgWindowLabel">${flexygo.localization.translate('flxgipe.labelname')}</label>
                    <flx-text name="dbc-wfid" value="${current.WorkflowId}" ${(current.WorkflowId.length > 0) ? 'disabled="true"' : ''}/>
                    <label class="control-label fgWindowLabel">${flexygo.localization.translate('flxgipe.labeldescrip')}</label>
                    <flx-text name="dbc-wfdescrip" value="${this.htmlEncode(current.Descrip)}" placeholder="${flexygo.localization.translate('flxgipe.workflownameplaceholder')}" />
                    <label class="control-label fgWindowLabel">${flexygo.localization.translate('flxgipe.labelactive')}</label>
                    <flx-check name="dbc-wfactive" ${(current.Active && current.Active === true) ? 'checked' : ''}></flx-check>
                </div>
                <div class="fgWindowToolbar">
                    <button class="btn btn-sm bg-info saveButton"><i class="flx-icon icon-save"></i>${flexygo.localization.translate('flxgipe.buttonsave')}</button>
                    <button class="btn btn-sm bg-danger closeButton"><i class="flx-icon icon-remove"></i>${flexygo.localization.translate('flxgipe.buttoncancel')}</button>
                </div>
            `;
                    content.append(saveTemplate);
                    let wnd = new mxWindow(flexygo.localization.translate('flxgipe.dialogsavetitle'), content[0], (window.outerWidth / 2) - 150, (window.outerHeight / 2) - 200, 300, 400, false, true, null, "fgWindow");
                    wnd.setMaximizable(false);
                    wnd.setScrollable(true);
                    wnd.setResizable(false);
                    wnd.setClosable(true);
                    wnd.setVisible(true);
                    content.find("button.saveButton").on("click", (e) => {
                        current.WorkflowId = content.find('[name="dbc-wfid"]')[0].getValue();
                        current.Descrip = content.find('[name="dbc-wfdescrip"]')[0].getValue();
                        current.ModuleId = content.find('[name="dbc-moduleid"]')[0].getValue();
                        current.AreaId = content.find('[name="dbc-areaid"]')[0].getValue();
                        current.Active = content.find('[name="dbc-wfactive"]')[0].getValue();
                        let wf = this.editor.graph.getModel().cells[0].value;
                        wf.setAttribute("fgid", current.WorkflowId);
                        wf.setAttribute("description", current.Descrip);
                        current.WorkflowData = this.editor.writeGraphModel(null);
                        flexygo.ajax.post('~/api/Gipe', 'saveWorkflow', current, (ret) => {
                            if (ret) {
                                flexygo.msg.success(flexygo.localization.translate('flxgipe.messages.workflowsaved'));
                                wnd.destroy();
                                this.workflow = ret;
                                this.render();
                            }
                        });
                    });
                    content.find("button.closeButton").on("click", (e) => {
                        wnd.destroy();
                    });
                    wnd.addListener(mxEvent.DESTROY, (sender, object) => {
                        this.destroyDialog();
                    });
                    this.showDialog(wnd);
                }
                /**
                * Clears the workflow and edit new workflow
                * @method newWorkflow
                */
                newWorkflow() {
                    this.workflow = null;
                    this.workflowStack = [];
                    this.debugStack = [];
                    this.render();
                }
                /**
                 * Generates the workflow
                 * @method generateWorkflow
                */
                generateWorkflow() {
                    if (!(this.workflow && this.workflow.WorkflowId && this.workflow.WorkflowId.length > 0)) {
                        flexygo.msg.error(flexygo.localization.translate('flxgipe.messages.savefirst'));
                        return;
                    }
                    flexygo.ajax.post('~/api/Gipe', 'generateWorkflow', { workflowId: this.workflow.WorkflowId, Version: this.workflow.Version }, (ret) => {
                        if (ret && ret === true) {
                            flexygo.msg.success(flexygo.localization.translate('flxgipe.messages.workflowgenerated'));
                        }
                    });
                }
                /**
                * Open the templates dialog
                * @method openTemplateDialog
                */
                openTemplateDialog() {
                    let filterContent = $('<tr></tr>');
                    let listContent = $('<div></div>');
                    this.templateFilter = {
                        name: '',
                        areaId: null,
                        originId: null,
                        objects: true,
                        processes: true,
                        decissions: true,
                        workflows: true,
                        events: true
                    };
                    let filterTemplae = `
                <div id="GipeTemplateDialogPanel" class="col-12">
                    <div class="templateFilterPanel" style="position:relative">
                        <flx-dbcombo id="gcp-tf-cbo-area" ObjectName="sysWorkflow" ViewName="areasView" SQLValueField="WorkflowAreaId" SQLDisplayField="Descrip" placeholder="${flexygo.localization.translate('flxgipe.workflowareaplaceholder')}"/>
                        <flx-dbcombo id="gcp-tf-cbo-origin" ObjectName="sysWorkflow" ViewName="originsView" SQLValueField="OriginId" SQLDisplayField="Descrip" placeholder="${flexygo.localization.translate('flxgipe.workfloworiginplaceholder')}"/>
                        <div class="col-12 templateFilterPanelButtons">
                            <button id="gcp-tf-btn-object" type="button" title="${flexygo.localization.translate('flxgipe.editortemplates.object')}" class="btn btn-lg active" aria-pressed="true" data-toggle="button">
                              <i class="flx-icon icon-object"></i>
                            </button>
                            <button id="gcp-tf-btn-process" type="button" title="${flexygo.localization.translate('flxgipe.editortemplates.process')}" class="btn btn-lg active" aria-pressed="true" data-toggle="button">
                              <i class="flx-icon icon-process"></i>
                            </button>
                            <button id="gcp-tf-btn-decission" type="button" title="${flexygo.localization.translate('flxgipe.editortemplates.decission')}" class="btn btn-lg active" aria-pressed="true" data-toggle="button">
                              <i class="flx-icon icon-expand"></i>
                            </button>
                            <button id="gcp-tf-btn-workflow" type="button" title="${flexygo.localization.translate('flxgipe.editortemplates.workflow')}" class="btn btn-lg active" aria-pressed="true" data-toggle="button">
                              <i class="flx-icon icon-flow-chart"></i>
                            </button>
                            <button id="gcp-tf-btn-event" type="button" title="${flexygo.localization.translate('flxgipe.editortemplates.event')}" class="btn btn-lg active" aria-pressed="true" data-toggle="button">
                              <i class="flx-icon icon-wifi"></i>
                            </button>
                            <button id="gcp-tf-btn-all" type="button" title="${flexygo.localization.translate('flxgipe.editortemplates.toggleall')}" class="btn btn-lg active" aria-pressed="true" data-toggle="button">
                              <i class="flx-icon icon-select"></i>
                            </button>
                        </div>
                        <flx-text id="gcp-tf-txt-name" class="searchInput" placeholder="${flexygo.localization.translate('flxgipe.searchtemplates')}" iconclass="flx-icon icon-search" />
                    </div>
                    
                </div>`;
                    let contentTemplate = `
                    <div style="clear:both">
                    </div>
                    <div id="GipeTemplateList">
                        <ul class="connectedSortable">
                        </ul>
                    </div>
            `;
                    filterContent.append(filterTemplae);
                    listContent.append(contentTemplate);
                    filterContent.find('#gcp-tf-cbo-area').off('change').on('change', (e) => {
                        let cbo = $(e.currentTarget);
                        this.templateFilter.areaId = (cbo.val() && cbo.val().length > 0) ? cbo.val() : null;
                        this.updateTemplateFilter();
                    });
                    filterContent.find('#gcp-tf-cbo-origin').off('change').on('change', (e) => {
                        let cbo = $(e.currentTarget);
                        this.templateFilter.originId = (cbo.val() && cbo.val().length > 0) ? parseInt(cbo.val()) : null;
                        this.updateTemplateFilter();
                    });
                    filterContent.find('#gcp-tf-txt-name').off('keyup').on('keyup', (e) => {
                        this.templateFilter.name = $(e.currentTarget).val();
                        this.updateTemplateFilter();
                    });
                    filterContent.find('#gcp-tf-btn-object').off('click').on('click', (e) => {
                        this.templateFilter.objects = !this.templateFilter.objects;
                        this.updateTemplateFilter();
                    });
                    filterContent.find('#gcp-tf-btn-process').off('click').on('click', (e) => {
                        this.templateFilter.processes = !this.templateFilter.processes;
                        this.updateTemplateFilter();
                    });
                    filterContent.find('#gcp-tf-btn-decission').off('click').on('click', (e) => {
                        this.templateFilter.decissions = !this.templateFilter.decissions;
                        this.updateTemplateFilter();
                    });
                    filterContent.find('#gcp-tf-btn-workflow').off('click').on('click', (e) => {
                        this.templateFilter.workflows = !this.templateFilter.workflows;
                        this.updateTemplateFilter();
                    });
                    filterContent.find('#gcp-tf-btn-event').off('click').on('click', (e) => {
                        this.templateFilter.events = !this.templateFilter.events;
                        this.updateTemplateFilter();
                    });
                    filterContent.find('#gcp-tf-btn-all').off('click').on('click', (e) => {
                        let setted = !($(e.currentTarget).attr('aria-pressed') === 'true');
                        if ($('#gcp-tf-btn-object').hasClass('active') !== setted)
                            $('#gcp-tf-btn-object').button('toggle');
                        if ($('#gcp-tf-btn-process').hasClass('active') !== setted)
                            $('#gcp-tf-btn-process').button('toggle');
                        if ($('#gcp-tf-btn-decission').hasClass('active') !== setted)
                            $('#gcp-tf-btn-decission').button('toggle');
                        if ($('#gcp-tf-btn-workflow').hasClass('active') !== setted)
                            $('#gcp-tf-btn-workflow').button('toggle');
                        if ($('#gcp-tf-btn-event').hasClass('active') !== setted)
                            $('#gcp-tf-btn-event').button('toggle');
                        this.templateFilter.objects = setted;
                        this.templateFilter.processes = setted;
                        this.templateFilter.decissions = setted;
                        this.templateFilter.workflows = setted;
                        this.templateFilter.events = setted;
                        this.updateTemplateFilter();
                    });
                    let wnd = new mxWindow(flexygo.localization.translate('flxgipe.dialogtemplatetitle'), listContent[0], (window.outerWidth / 2) - 150, (window.outerHeight / 2) - 200, 300, 400, false, true, null, "fgWindow");
                    let titleRow = $(wnd.title).parent();
                    titleRow.after(filterContent);
                    let list = listContent.find('#GipeTemplateList ul');
                    flexygo.ajax.post('~/api/Gipe', 'getTemplates', null, (ret) => {
                        ret.forEach((e) => {
                            list.append(`
                        <li data-type="${e.NodeType}" data-id="${e.NodeKey}" data-descrip="${e.NodeDescrip}" data-originid="${e.NodeOriginId}" data-areas="${e.NodeAreas}" class="templateItem nolist">
                            <div class="box-primary">
                                <div class="listDescrip">
                                    <i title="${e.NodeDescrip}" class="${e.NodeIcon} icon-lg"></i>
                                    <span class="modDesc">${e.NodeDescrip}</span>
                                </div>
                            </div>
                        </li>
                    `);
                        });
                        list.find('li').draggable({
                            appendTo: 'body',
                            containment: $('#gipegraph'),
                            helper: 'clone'
                        });
                    });
                    wnd.setMaximizable(false);
                    wnd.setScrollable(true);
                    wnd.setResizable(true);
                    wnd.setClosable(true);
                    wnd.setVisible(true);
                    wnd.addListener(mxEvent.DESTROY, (sender, object) => {
                        this.destroyDialog();
                    });
                    this.showDialog(wnd);
                }
                updateTemplateFilter() {
                    let content = $(document).find('#GipeTemplateList');
                    content.find('li[data-descrip]').hide();
                    let filter = this.templateFilter;
                    console.log("updateTemplateFilter", filter);
                    let filterTypes = '';
                    if (filter.objects === true)
                        filterTypes += '1';
                    if (filter.processes === true)
                        filterTypes += '2';
                    if (filter.decissions === true)
                        filterTypes += '3';
                    if (filter.workflows === true)
                        filterTypes += '4';
                    if (filter.events === true)
                        filterTypes += '5';
                    let filterName = (filter.name || '').toLowerCase();
                    let filterArea = (filter.areaId || '').toLowerCase();
                    let elems = content.find('li[data-descrip]').filter(function () {
                        let e = $(this);
                        let visible = true;
                        if (filterName.length > 0) {
                            visible = e.attr('data-descrip').toLowerCase().indexOf(filterName) !== -1;
                        }
                        if (visible === true) {
                            visible = filterTypes.indexOf(e.attr('data-type')) !== -1;
                            if (visible === true) {
                                if (filter.originId !== null) {
                                    visible = (parseInt(e.attr('data-originid')) === filter.originId);
                                }
                                if (visible === true) {
                                    if (filterArea.length > 0) {
                                        visible = (e.attr('data-areas').toLowerCase() == filterArea);
                                    }
                                }
                            }
                        }
                        return visible;
                    });
                    elems.show();
                }
                onModuleResize(e) {
                    let module = e.sender;
                    let mine = $(this).closest('flx-module')[0];
                    if (module.moduleName === mine.moduleName) {
                        this.setGraphSize();
                    }
                }
                /**
               * Open the workflow debug dialog
                * @method openDebugDialog
                */
                openDebugDialog() {
                    let content = $('<div></div>');
                    let debugTemplate = `
                <div class="gipetoolbar" id="gipedebugtoolbar">
                    <button name="dbg-stepinto"><i class="fa fa-step-forward" /></button>
                    <button name="dbg-stepover"><i class="fa fa-fast-forward" /></button>
                    <button name="dbg-stop"><i class="fa fa-stop" /></button>
                </div>
                <div class="col-12">
                    <div class="col-6">
                        <label class="control-label fgWindowLabel">${flexygo.localization.translate('flxgipe.labelstatus')}</label>
                        <flx-text id="gipedbg-status"/>
                    </div>                    
                    <div class="col-6">
                        <label class="control-label fgWindowLabel">${flexygo.localization.translate('flxgipe.labelresult')}</label>
                        <flx-text id="gipedbg-result"/>
                    </div>
                </div>
                <div class="col-12">
                    <div id="gipe-debug-tree" />
                </div>
            `;
                    content.append(debugTemplate);
                    let wnd = new mxWindow(flexygo.localization.translate('flxgipe.dialogdebugtitle'), content[0], (window.outerWidth / 2) - 150, (window.outerHeight / 2) - 200, 300, 400, false, true, null, "fgWindow");
                    wnd.setMaximizable(false);
                    wnd.setScrollable(true);
                    wnd.setResizable(true);
                    wnd.setClosable(true);
                    wnd.setVisible(true);
                    content.find('button[name="dbg-stepinto"]').on("click", (e) => {
                        if (this.currentExecutionId === 0) {
                            flexygo.msg.error(flexygo.localization.translate('flxgipe.errornocurrentexecution'));
                            return;
                        }
                        content.find('button[name="dbg-stepinto"]').prop('disabled', true);
                        content.find('button[name="dbg-stepover"]').prop('disabled', true);
                        //Execute one step
                        flexygo.ajax.post('~/api/Gipe', 'debugWorkflow', { workflowId: this.workflow.WorkflowId, version: this.workflow.Version, executionId: this.currentExecutionId, stepOver: false }, (ret) => {
                        });
                    });
                    content.find('button[name="dbg-stepover"]').on("click", (e) => {
                        if (this.currentExecutionId === 0) {
                            flexygo.msg.error(flexygo.localization.translate('flxgipe.errornocurrentexecution'));
                            return;
                        }
                        content.find('button[name="dbg-stepinto"]').prop('disabled', true);
                        content.find('button[name="dbg-stepover"]').prop('disabled', true);
                        //Execute one step
                        flexygo.ajax.post('~/api/Gipe', 'debugWorkflow', { workflowId: this.workflow.WorkflowId, version: this.workflow.Version, executionId: this.currentExecutionId, stepOver: true }, (ret) => {
                        });
                    });
                    content.find('button[name="dbg-stop"]').on("click", (e) => {
                        if (this.currentExecutionId !== 0) {
                            var postParams = {
                                execId: this.currentExecutionId,
                                stepId: 0
                            };
                            flexygo.ajax.post('~/api/Gipe', 'abortExecution', postParams, (ret) => { });
                            //this.lastDebugGraphId = 0;
                            //this.currentExecutionId = 0;
                            //this.updateToolbarStatus();
                        }
                    });
                    wnd.addListener(mxEvent.DESTROY, (sender, object) => {
                        this.destroyDebugDialog();
                        if (this.currentExecutionId !== 0) {
                            var postParams = {
                                execId: this.currentExecutionId,
                                stepId: 0
                            };
                            flexygo.ajax.post('~/api/Gipe', 'abortExecution', postParams, (ret) => { });
                            this.lastDebugGraphId = null;
                            this.currentExecutionId = 0;
                            this.debugStack = [];
                            this.updateToolbarStatus();
                        }
                        this.loadWorkflow(this.workflow.WorkflowId, this.workflow.Version, false);
                    });
                    this.showDebugDialog(wnd);
                }
                /**
                * Render HTML data.
                * @method render
                */
                render() {
                    let empty = `<mxGraphModel>
			            <root>
				            <Workflow label="" description="" id="0"/>
				            <Layer label="Default Layer">
					            <mxCell parent="0"/>
				            </Layer>
			            </root>
                    </mxGraphModel>
                `;
                    let node = null;
                    let error = "";
                    let current = null;
                    if (this.currentExecutionId === 0) {
                        current = this.workflow;
                    }
                    else {
                        current = this.debugWorkflow;
                    }
                    if (current && current !== null) {
                        node = mxUtils.parseXml(current.WorkflowData);
                        if (node.getElementsByTagName("parsererror").length > 0) {
                            error = node.getElementsByTagName("parsererror")[0].innerText;
                            node = mxUtils.parseXml(empty);
                        }
                    }
                    else {
                        node = mxUtils.parseXml(empty);
                    }
                    let doc = node.documentElement;
                    this.editor.readGraphModel(doc);
                    this.updateToolbarStatus();
                    this.updateModuleTitle();
                    this.updateBreadcrumb();
                    this.updateComboVersions();
                    if (error.length > 0) {
                        flexygo.msg.error(error);
                    }
                }
                /**
                * Updates toolbar status.
                * @method render
                */
                updateToolbarStatus() {
                    let canAny;
                    let canGoDown;
                    let canGoUp;
                    let selected = this.editor.graph.getSelectionCells();
                    canAny = !(this.dialog !== null);
                    if (canAny === true) {
                        canAny = (this.currentExecutionId === 0);
                    }
                    if (canAny) {
                        $(this).find('button.mxToolbarItem').prop('disabled', false);
                        if (selected.length === 0) {
                            canGoDown = false;
                        }
                        else if (selected.length > 1) {
                            canGoDown = false;
                        }
                        else {
                            let cell = selected[0];
                            if (cell.value && cell.value.localName === 'Workflow') {
                                canGoDown = true;
                            }
                            else {
                                canGoDown = false;
                            }
                        }
                        canGoUp = (this.workflowStack.length > 0);
                        let btnUp = $(this).find('button[data-action="up"]');
                        let btnDown = $(this).find('button[data-action="down"]');
                        btnUp.prop("disabled", !canGoUp);
                        btnDown.prop("disabled", !canGoDown);
                    }
                    else {
                        $(this).find('button.mxToolbarItem').prop('disabled', true);
                    }
                }
                openPropertiesDialog() {
                    let content = $('<div></div>');
                    let wnd = new mxWindow(flexygo.localization.translate('flxgipe.dialogpropertiestitle'), content[0], (window.outerWidth / 2) - 150, (window.outerHeight / 2) - 200, 500, 400, false, true, null, "fgWindow");
                    wnd.setMaximizable(false);
                    wnd.setScrollable(true);
                    wnd.setResizable(true);
                    wnd.setClosable(true);
                    wnd.setVisible(true);
                    wnd.addListener(mxEvent.DESTROY, (sender, object) => {
                        this.destroyPropertiesDialog();
                    });
                    this.showPropertiesDialog(wnd);
                }
                showCellProperties(cell) {
                    if (!this.propertiesDialog) {
                        this.openPropertiesDialog();
                    }
                    if (!cell) {
                        this.showWorkflowProperties();
                        return;
                    }
                    if (cell && cell.isEdge() === true) {
                        this.showRelationProperties(cell);
                        return;
                    }
                    let content = $(this.propertiesDialog.content);
                    content.empty();
                    let cboParams = null;
                    switch (cell.value.localName.toLowerCase()) {
                        case 'process':
                            cboParams = {
                                Label: flexygo.localization.translate("flxgipe.labelprocess"),
                                ObjectName: "sysWorkflow",
                                ViewName: "processesView",
                                SQLValueField: "ProcessName",
                                SQLDisplayField: "ProcessName"
                            };
                            break;
                        case 'object':
                            cboParams = {
                                Label: flexygo.localization.translate("flxgipe.labelobject"),
                                ObjectName: "sysWorkflow",
                                ViewName: "objectsView",
                                SQLValueField: "ObjectName",
                                SQLDisplayField: "ObjectName"
                            };
                            break;
                        case 'decission':
                            cboParams = {
                                Label: flexygo.localization.translate("flxgipe.labeldecission"),
                                ObjectName: "sysWorkflow",
                                ViewName: "decissionsView",
                                SQLValueField: "ProcessName",
                                SQLDisplayField: "ProcessName"
                            };
                            break;
                        case 'workflow':
                            cboParams = {
                                Label: flexygo.localization.translate("flxgipe.labelworkflow"),
                                ObjectName: "sysWorkflow",
                                ViewName: "workflowsView",
                                SQLValueField: "ProcessName",
                                SQLDisplayField: "ProcessName"
                            };
                            break;
                        case 'event':
                            cboParams = {
                                Label: flexygo.localization.translate("flxgipe.labelevent"),
                                ObjectName: "sysWorkflow",
                                ViewName: "eventsView",
                                SQLValueField: "NodeKey",
                                SQLDisplayField: "NodeDescrip"
                            };
                            break;
                        case 'label':
                            cboParams = {
                                Label: flexygo.localization.translate("flxgipe.labellabel"),
                                ObjectName: "sysWorkflow",
                                ViewName: "labelsView",
                                SQLValueField: "LabelName",
                                SQLDisplayField: "LabelDescrip",
                                backgroundColor: "",
                                textColor: "",
                                borderColor: "",
                            };
                            let style = cell.style;
                            if (style.indexOf(';') != -1) {
                                let styles = style.split(';');
                                for (let i = 0; i < styles.length; i++) {
                                    if (styles[i].indexOf('=') != -1) {
                                        let key = styles[i].split('=')[0];
                                        let value = styles[i].split('=')[1];
                                        switch (key) {
                                            case mxConstants.STYLE_FILLCOLOR:
                                                cboParams['backgroundColor'] = value;
                                                break;
                                            case mxConstants.STYLE_FONTCOLOR:
                                                cboParams['textColor'] = value;
                                                break;
                                            case mxConstants.STYLE_STROKECOLOR:
                                                cboParams['borderColor'] = value;
                                                break;
                                        }
                                    }
                                }
                            }
                            break;
                        default:
                            flexygo.msg.error('Invalid value');
                            return;
                    }
                    let propTemplate = `
                <div class="col-12">
                    <div class="col-6">
                         <label class="control-label fgWindowLabel">${flexygo.localization.translate('flxgipe.labelleft')}</label>
                         <flx-text name="x" type="number" value="${cell.geometry.x}"/>
                         <label class="control-label fgWindowLabel">${flexygo.localization.translate('flxgipe.labelwidth')}</label>
                         <flx-text name="w" type="number" value="${cell.geometry.width}"/>
                    </div>
                    <div class="col-6">
                         <label class="control-label fgWindowLabel">${flexygo.localization.translate('flxgipe.labeltop')}</label>
                         <flx-text name="y" type="number" value="${cell.geometry.y}"/>
                         <label class="control-label fgWindowLabel">${flexygo.localization.translate('flxgipe.labelheight')}</label>
                         <flx-text name="h" type="number" value="${cell.geometry.height}"/>
                    </div>
                </div>
                <div class="col-12" style="position:relative">
                    <label class="control-label fgWindowLabel">${flexygo.localization.translate('flxgipe.labellabel')}</label>
                    <flx-text name="l" value="${this.htmlEncode(cell.value.getAttribute('label'))}"/>
                     ${(cell.value.localName.toLowerCase() != 'label') ? `
                        <label class="control-label fgWindowLabel">${cboParams.Label}</label>
                        <flx-dbcombo name="fgid" ObjectName="${cboParams.ObjectName}" ViewName="${cboParams.ViewName}" SQLDisplayField="${cboParams.SQLDisplayField}" SQLValueField="${cboParams.SQLValueField}" value="${cell.value.getAttribute('fgid')}" />
                     ` : `
                     <div class="col-6">
                       <label class="control-label fgWindowLabel">${flexygo.localization.translate('flxgipe.labelbackgroundcolor')}</label>
                        <flx-text name="backgroundColor" type="text" value="${cboParams.backgroundColor}"/>
                     </div>
                     <div class="col-6">
                        <label class="control-label fgWindowLabel">${flexygo.localization.translate('flxgipe.labelbordercolor')}</label>
                        <flx-text name="borderColor" type="text" value="${cboParams.borderColor}"/>
                     </div>
                     <div class="col-6">
                        <label class="control-label fgWindowLabel">${flexygo.localization.translate('flxgipe.labeltextcolor')}</label>
                        <flx-text name="textColor" type="text" value="${cboParams.textColor}"/>
                     </div>
                     `}
                </div>
                <div class="fgWindowToolbar">
                    <button class="btn btn-sm bg-info saveButton"><i class="flx-icon icon-save"></i>${flexygo.localization.translate('flxgipe.buttonsave')}</button>
                    <button class="btn btn-sm bg-danger closeButton"><i class="flx-icon icon-remove"></i>${flexygo.localization.translate('flxgipe.buttoncancel')}</button>
                </div>
            `;
                    content.append(propTemplate);
                    content.find("button.closeButton").off("click").on("click", (e) => {
                        if (this.fixedPropertiesDialog === false) {
                            this.propertiesDialog.destroy();
                        }
                    });
                    content.find("button.saveButton").off("click").on("click", (e) => {
                        let xField = content.find('flx-text[name="x"]')[0];
                        let yField = content.find('flx-text[name="y"]')[0];
                        let wField = content.find('flx-text[name="w"]')[0];
                        let hField = content.find('flx-text[name="h"]')[0];
                        let textColor = content.find('flx-text[name="textColor"]')[0];
                        let borderColor = content.find('flx-text[name="borderColor"]')[0];
                        let backgroundColor = content.find('flx-text[name="backgroundColor"]')[0];
                        let lblField = content.find('flx-text[name="l"]')[0];
                        let idField = content.find('flx-dbcombo[name="fgid"]')[0];
                        // Supports undo for the changes on the underlying
                        // XML structure / XML node attribute changes.
                        let graph = this.editor.graph;
                        let model = graph.getModel();
                        let geo = cell.geometry;
                        let style = "";
                        var attrs = [];
                        var texts = [];
                        attrs.push('label');
                        attrs.push('description');
                        attrs.push('fgid');
                        let fgid = (idField ? idField.getValue() : null);
                        texts.push(lblField.getValue());
                        texts.push(cell.value.getAttribute('description'));
                        texts.push(fgid);
                        let okid = (fgid && fgid.length > 0);
                        switch (cell.value.localName.toLowerCase()) {
                            case 'process':
                                style = (okid) ? 'process' : 'invalid-process';
                                break;
                            case 'object':
                                style = (okid) ? 'ellipse' : 'invalid-ellipse';
                                break;
                            case 'decission':
                                style = (okid) ? 'rhombus' : 'invalid-rhombus';
                                break;
                            case 'workflow':
                                style = (okid) ? 'hexagon' : 'invalid-hexagon';
                                break;
                            case 'event':
                                style = (okid) ? 'cloud' : 'invalid-cloud';
                                break;
                            case 'label':
                                style = 'label';
                                if (textColor.getValue()) {
                                    style += ';' + mxConstants.STYLE_FONTCOLOR + '=' + textColor.getValue();
                                }
                                if (backgroundColor.getValue()) {
                                    style += ';' + mxConstants.STYLE_FILLCOLOR + '=' + backgroundColor.getValue();
                                }
                                if (borderColor.getValue()) {
                                    style += ';' + mxConstants.STYLE_STROKECOLOR + '=' + borderColor.getValue();
                                }
                                break;
                            default:
                                flexygo.msg.error('Invalid value');
                                return;
                        }
                        model.beginUpdate();
                        try {
                            if (geo != null) {
                                geo = geo.clone();
                                geo.x = parseFloat(xField.getValue());
                                geo.y = parseFloat(yField.getValue());
                                geo.width = parseFloat(wField.getValue());
                                geo.height = parseFloat(hField.getValue());
                                model.setGeometry(cell, geo);
                            }
                            // Applies the style
                            if (style.length > 0) {
                                model.setStyle(cell, style);
                            }
                            else {
                                model.setStyle(cell, null);
                            }
                            // Creates an undoable change for each
                            // attribute and executes it using the
                            // model, which will also make the change
                            // part of the current transaction
                            for (var i = 0; i < attrs.length; i++) {
                                var edit = new mxCellAttributeChange(cell, attrs[i], texts[i]);
                                model.execute(edit);
                            }
                            // Checks if the graph wants cells to 
                            // be automatically sized and updates
                            // the size as an undoable step if
                            // the feature is enabled
                            if (graph.isAutoSizeCell(cell)) {
                                graph.updateCellSize(cell);
                            }
                        }
                        finally {
                            model.endUpdate();
                        }
                        if (!this.fixedPropertiesDialog) {
                            this.propertiesDialog.destroy();
                        }
                    });
                }
                showRelationProperties(cell) {
                    if (!this.propertiesDialog) {
                        this.openPropertiesDialog();
                    }
                    let content = $(this.propertiesDialog.content);
                    content.empty();
                    if (typeof cell.value === "string") {
                        return;
                    }
                    let targetCell = cell.target;
                    let model = this.editor.graph.getModel();
                    let currentWorkflow = this.workflow;
                    let propTemplate = `
                
                <div class="col-12">
                    <label class="control-label fgWindowLabel">${flexygo.localization.translate('flxgipe.labellabel')}</label>
                    <flx-text name="l" value="${this.htmlEncode(cell.value.getAttribute('label'))}"/>
                </div>
				<div name="parameters" class="col-12">
                    <label class="control-label fgWindowLabel">${flexygo.localization.translate('flxgipe.labelrelations')}</label>
                </div>
                <div name="gipeprops" class="col-12">
                </div>
				<div class="fgWindowToolbar">
                    <button class="btn btn-sm bg-info saveButton"><i class="flx-icon icon-save"></i>${flexygo.localization.translate('flxgipe.buttonsave')}</button>
                    <button class="btn btn-sm bg-danger closeButton"><i class="flx-icon icon-remove"></i>${flexygo.localization.translate('flxgipe.buttoncancel')}</button>
                </div>
            `;
                    content.append(propTemplate);
                    content.find("button.closeButton").off("click").on("click", (e) => {
                        if (this.fixedPropertiesDialog === false) {
                            this.propertiesDialog.destroy();
                        }
                    });
                    content.find("button.saveButton").off("click").on("click", (e) => {
                        let lblField = content.find('flx-text[name="l"]')[0];
                        let graph = this.editor.graph;
                        let model = graph.getModel();
                        let value = this.editor.templates["relation"].value.cloneNode(true);
                        content.find('label[data-name="propname"]').each((i, e) => {
                            let lblProp = $(e);
                            let prop = lblProp.attr('data-prop');
                            let cboType = lblProp.parent().find(`select[data-name="parenttype"][data-prop="${prop}"]`);
                            let cboParent = lblProp.parent().find(`select[data-name="parentname"][data-prop="${prop}"]`);
                            let cboParam = lblProp.parent().find(`select[data-name="paramname"][data-prop="${prop}"]`);
                            let txtValue = cboType.parent().find(`input[data-name="txtvalue"][data-prop="${prop}"]`);
                            let type = cboType.val();
                            let parent = cboParent.val();
                            let param = cboParam.val();
                            let defaultvalue = txtValue.val();
                            if (type && type.length > 0) {
                                if (parent && parent.length > 0) {
                                    parent = `parent="${parent}"`;
                                }
                                else {
                                    parent = "";
                                }
                                if (param && param.length > 0) {
                                    param = `parentparam="${param}"`;
                                }
                                else {
                                    param = "";
                                }
                                if (defaultvalue && defaultvalue.length > 0) {
                                    parent = `parent="0"`;
                                    defaultvalue = `defaultvalue="${defaultvalue}"`;
                                }
                                else {
                                    defaultvalue = "";
                                }
                                let s = `<Parameter childparam="${prop}" type="${type}" ${parent} ${param} ${defaultvalue}></Parameter>`;
                                let r = mxUtils.parseXml(s);
                                value.appendChild(r.documentElement);
                            }
                        });
                        model.beginUpdate();
                        try {
                            cell.setValue(value);
                            // Creates an undoable change for each
                            // attribute and executes it using the
                            // model, which will also make the change
                            // part of the current transaction
                            var edit = new mxCellAttributeChange(cell, 'label', lblField.getValue());
                            model.execute(edit);
                        }
                        finally {
                            model.endUpdate();
                        }
                        if (!this.fixedPropertiesDialog) {
                            this.propertiesDialog.destroy();
                        }
                    });
                    flexygo.ajax.post('~/api/Gipe', 'getNodeRelations', { nodeType: targetCell.value.nodeName, nodeName: targetCell.value.getAttribute("fgid") }, (ret) => {
                        let parameters = cell.value.getElementsByTagName('Parameter');
                        let divProps = content.find('div[name="gipeprops"]');
                        ret.forEach((param) => {
                            let parentvalue = "";
                            let parentdescrip = "";
                            let typevalue = "";
                            let paramvalue = "";
                            let defaultvalue = "";
                            $.each(parameters, (i, n) => {
                                if (n.getAttribute('childparam').toLowerCase() === param.ParamName.toLowerCase()) {
                                    typevalue = n.getAttribute('type');
                                    if (n.hasAttribute('parent')) {
                                        parentvalue = model.getCell(n.getAttribute('parent')).id;
                                        if (typevalue && typevalue == 'workflow') {
                                            parentdescrip = currentWorkflow.WorkflowId;
                                        }
                                        else {
                                            parentdescrip = model.getCell(n.getAttribute('parent')).value.getAttribute('label');
                                        }
                                        paramvalue = n.getAttribute('parentparam');
                                    }
                                    defaultvalue = n.getAttribute('defaultvalue') || '';
                                }
                            });
                            let inputVisibleStr = (defaultvalue && defaultvalue.length > 0) ? '' : 'style="display:none"';
                            let selectVisibleStr = (inputVisibleStr && inputVisibleStr.length > 0) ? '' : 'style="display:none"';
                            let prop = param.ParamName;
                            let template = `
                        <div class="col-12">        
                            <label   class="col-3" data-name="propname" data-prop="${prop}">${param.ParamLabel}</label>
                            <select  class="col-3" data-name="parenttype" data-prop="${prop}"><option value=""/><option value="workflow">Workflow</option><option value="node">Node</option><option value="value">Default value</option><option value="context">Context</option></select>
                            <input  ${inputVisibleStr}  class="col-6" data-name="txtvalue" data-prop="${prop}"></input>
                            <select ${selectVisibleStr} class="col-3" data-name="parentname" data-prop="${prop}"></select>
                            <select ${selectVisibleStr} class="col-3" data-name="paramname"  data-prop="${prop}"></select>
                        </div>`;
                            let parsed = $(template);
                            if (typevalue !== '') {
                                parsed.find('select[data-name="parenttype"]').val(typevalue);
                            }
                            if (parentvalue !== '') {
                                parsed.find('select[data-name="parentname"]').append(`<option value="${parentvalue}" selected>${parentdescrip}</option>`);
                            }
                            if (paramvalue !== '') {
                                parsed.find('select[data-name="paramname"]').append(`<option value="${paramvalue}" selected>${paramvalue}</option>`);
                            }
                            if (defaultvalue !== '') {
                                parsed.find('input[data-name="txtvalue"]').val(defaultvalue);
                            }
                            divProps.append(parsed);
                        });
                        divProps.find('select[data-name="parenttype"]').off('change').on('change', (e) => {
                            let cboType = $(e.currentTarget);
                            let prop = cboType.attr('data-prop');
                            let cboParent = cboType.parent().find(`select[data-name="parentname"][data-prop="${prop}"]`);
                            let cboParam = cboType.parent().find(`select[data-name="paramname"][data-prop="${prop}"]`);
                            let txtValue = cboType.parent().find(`input[data-name="txtvalue"][data-prop="${prop}"]`);
                            txtValue.hide();
                            cboParent.find('option').remove();
                            cboParam.find('option').remove();
                            let nodes = `<option value=""></option>`;
                            switch (cboType.val()) {
                                case 'node':
                                    txtValue.hide();
                                    txtValue.val('');
                                    cboParent.show();
                                    cboParam.show();
                                    cboParent.prop('disabled', false);
                                    for (let key in model.cells) {
                                        let cell = model.cells[key];
                                        if (cell.isVertex() && cell.value.tagName.toLowerCase() != 'label') {
                                            nodes += `<option value="${cell.id}">${cell.value.getAttribute('label')}</option>`;
                                        }
                                    }
                                    cboParent.append(nodes);
                                    break;
                                case 'workflow':
                                    txtValue.hide();
                                    txtValue.val('');
                                    cboParent.show();
                                    cboParam.show();
                                    cboParent.prop('disabled', true);
                                    cboParent.append(`<option value="0" selected>${currentWorkflow.WorkflowId}</option>`);
                                    cboParam.html();
                                    flexygo.ajax.post('~/api/Gipe', 'getNodeRelations', { nodeType: 'workflow', nodeName: currentWorkflow.WorkflowId }, (ret) => {
                                        ret.forEach((param) => {
                                            nodes += `<option value="${param.ParamName}">${param.ParamLabel}</option>`;
                                        });
                                        cboParam.append(nodes);
                                    });
                                    break;
                                case 'context':
                                    txtValue.hide();
                                    txtValue.val('');
                                    cboParent.hide();
                                    cboParam.show();
                                    cboParent.prop('disabled', true);
                                    cboParam.html();
                                    for (let key in flexygo.context) {
                                        nodes += `<option value="key">${key}</option>`;
                                    }
                                    cboParam.append(nodes);
                                    break;
                                case 'value':
                                    txtValue.show();
                                    cboParent.hide();
                                    cboParent.val('');
                                    cboParam.hide();
                                    cboParam.html();
                                    txtValue.val('');
                            }
                        });
                        divProps.find('select[data-name="parentname"]').off('change').on('change', (e) => {
                            let cboParent = $(e.currentTarget);
                            let prop = cboParent.attr('data-prop');
                            let cboType = cboParent.parent().find(`select[data-name="parenttype"][data-prop="${prop}"]`);
                            let cboParam = cboParent.parent().find(`select[data-name="paramname"][data-prop="${prop}"]`);
                            cboParam.find('option').remove();
                            let nodes = `<option value=""></option>`;
                            switch (cboType.val()) {
                                case 'node':
                                    let cell = model.getCell(cboParent.val());
                                    flexygo.ajax.post('~/api/Gipe', 'getNodeRelations', { nodeType: cell.value.localName, nodeName: cell.value.getAttribute('fgid') }, (ret) => {
                                        ret.forEach((param) => {
                                            nodes += `<option value="${param.ParamName}">${param.ParamLabel}</option>`;
                                        });
                                        cboParam.append(nodes);
                                    });
                                    break;
                            }
                        });
                    });
                }
                viewCell(cell) {
                    switch (cell.value.localName.toLowerCase()) {
                        case 'process':
                        case 'decission':
                            flexygo.nav.openPage('view', 'sysProcess', "processName='" + cell.value.getAttribute('fgid') + "'", null, 'popup1024x678');
                            return;
                        case 'object':
                            flexygo.nav.openPage('view', 'sysObject', "objectName='" + cell.value.getAttribute('fgid') + "'", null, 'popup1024x678');
                            return;
                        case 'workflow':
                            flexygo.nav.openPage('view', 'sysWorkflow', "workflowId='" + cell.value.getAttribute('fgid') + "' AND Active=1", null, 'popup1024x678');
                            return;
                        case 'event':
                            break;
                        case 'label':
                            break;
                        default:
                            flexygo.msg.error('Invalid value');
                            return;
                    }
                }
                listParamsCell(cell) {
                    switch (cell.value.localName.toLowerCase()) {
                        case 'process':
                        case 'decission':
                        case 'workflow':
                            flexygo.nav.openPage('list', 'sysProcessParams', "Processes_Params.ProcessName='" + cell.value.getAttribute('fgid') + "'", '{"ProcessName":"' + cell.value.getAttribute('fgid') + '"}', 'popup1024x678');
                            return;
                        case 'event':
                        case 'object':
                        case 'label':
                            break;
                        default:
                            flexygo.msg.error('Invalid value');
                            return;
                    }
                }
                newCell(cell) {
                    flexygo.events.off(this, "entity", "inserted");
                    this.popupCell = cell;
                    let desc = null;
                    if (cell && cell.value && cell.value.attributes && cell.value.attributes.label && cell.value.attributes.label.value) {
                        desc = cell.value.attributes.label.value;
                    }
                    switch (cell.value.localName.toLowerCase()) {
                        case 'process':
                            flexygo.nav.openPage('edit', 'sysProcess', '', { ProcessDescrip: desc }, 'popup');
                            flexygo.events.on(this, "entity", "inserted", this.onEntityInserted);
                            return;
                        case 'object':
                            flexygo.nav.openPageName('syspage-generic-objectwizard', 'sysObject', '', null, 'popup', false);
                            flexygo.events.on(this, "entity", "inserted", this.onEntityInserted);
                            return;
                        case 'decission':
                            flexygo.nav.openPage('edit', 'sysProcess', "", { "typeId": "12", ProcessDescrip: desc }, 'popup1024x678');
                            flexygo.events.on(this, "entity", "inserted", this.onEntityInserted);
                            return;
                        case 'workflow':
                            flexygo.nav.openPage('edit', 'sysProcess', "", { "typeId": "11", ProcessDescrip: desc }, 'popup1024x678');
                            flexygo.events.on(this, "entity", "inserted", this.onEntityInserted);
                            return;
                        case 'event':
                            break;
                        case 'label':
                            break;
                        default:
                            flexygo.msg.error('Invalid value');
                            return;
                    }
                }
                onEntityInserted(e) {
                    flexygo.events.off(this, "entity", "inserted");
                    if (!this.popupCell) {
                        return;
                    }
                    let cell = this.popupCell;
                    let cellType = cell.value.localName.toLowerCase();
                    let cellId = cell.value.getAttribute('fgid').toLowerCase();
                    if (cellId && cellId.length > 0) {
                        return;
                    }
                    let entity = e.sender;
                    let newId = '';
                    let newLabel = '';
                    switch (entity.objectName.toLowerCase()) {
                        case 'sysobject':
                            switch (cellType) {
                                case 'object':
                                    newId = entity.data["ObjectName"].Value;
                                    newLabel = entity.data["Descrip"].Value;
                                    break;
                            }
                            break;
                        case 'sysprocess':
                            let typeId = parseInt(entity.data["TypeId"].Value);
                            switch (cellType) {
                                case 'process':
                                    if (typeId !== 11 && typeId !== 12) {
                                        newId = entity.data["ProcessName"].Value;
                                        newLabel = entity.data["ProcessDescrip"].Value;
                                    }
                                    break;
                                case 'decission':
                                    if (typeId === 12) {
                                        newId = entity.data["ProcessName"].Value;
                                        newLabel = entity.data["ProcessDescrip"].Value;
                                    }
                                    break;
                                case 'workflow':
                                    if (typeId === 11) {
                                        newId = entity.data["ProcessName"].Value;
                                        newLabel = entity.data["ProcessDescrip"].Value;
                                    }
                                    break;
                            }
                            break;
                    }
                    if (newId.length === 0) {
                        return;
                    }
                    let model = this.editor.graph.getModel();
                    model.beginUpdate();
                    try {
                        let edit = new mxCellAttributeChange(cell, 'fgid', newId);
                        model.execute(edit);
                        edit = new mxCellAttributeChange(cell, 'label', newLabel);
                        model.execute(edit);
                        let style = this.getStepStyle(cell, '');
                        if (style.length > 0) {
                            model.setStyle(cell, style);
                        }
                        else {
                            model.setStyle(cell, null);
                        }
                    }
                    finally {
                        model.endUpdate();
                    }
                    this.popupCell = null;
                }
                showWorkflowProperties() {
                    if (!this.workflow) {
                        return;
                    }
                    if (!this.propertiesDialog) {
                        this.openPropertiesDialog();
                    }
                    let content = $(this.propertiesDialog.content);
                    content.empty();
                    let current = this.workflow;
                    let graph = this.editor.graph;
                    let model = graph.getModel();
                    let cell = model.cells[0];
                    let propTemplate = `
                <div class="col-12" style="position:relative">
                    <label class="control-label fgWindowLabel">${flexygo.localization.translate('flxgipe.labelname')}</label>
                    <flx-text name="dbc-wfid" disabled="true" value="${current.WorkflowId}"></flx-text>
                    <label class="control-label fgWindowLabel">${flexygo.localization.translate('flxgipe.labeldescrip')}</label>
                    <flx-text name="dbc-descrip" value="${this.htmlEncode(current.Descrip)}" placeholder="${flexygo.localization.translate('flxgipe.workflownameplaceholder')}"></flx-text>
                    <label class="control-label fgWindowLabel">${flexygo.localization.translate('flxgipe.labelarea')}</label>
                    <flx-dbcombo name="dbc-areaid" value="${current.AreaId}" ObjectName="sysWorkflow" ViewName="areasView" SQLValueField="WorkflowAreaId" SQLDisplayField="Descrip" placeholder="${flexygo.localization.translate('flxgipe.workflowareaplaceholder')}"></flx-dbcombo>
                    <label class="control-label fgWindowLabel">${flexygo.localization.translate('flxgipe.labelmodule')}</label>
                    <flx-dbcombo name="dbc-moduleid" value="${current.ModuleId}" ObjectName="sysWorkflow" ViewName="modulesView" SQLValueField="WorkflowModuleId" SQLDisplayField="Descrip"  placeholder="${flexygo.localization.translate('flxgipe.workflowmoduleplaceholder')}"></flx-dbcombo>
                    <br/>
                    <label class="control-label fgWindowLabel">${flexygo.localization.translate('flxgipe.labelactive')}</label>
                    <flx-check name="dbc-active" ${(current.Active && current.Active === true) ? 'checked' : ''}></flx-check>
                </div>
                <div name="parameters" class="col-12">
                    <label class="control-label fgWindowLabel">${flexygo.localization.translate('flxgipe.labeloutputparams')}</label>
                </div>
                <div name="gipeprops" class="col-12">
                </div>
                <div class="fgWindowToolbar">
                    <button class="btn btn-sm bg-info saveButton"><i class="flx-icon icon-save"></i>${flexygo.localization.translate('flxgipe.buttonsave')}</button>
                    <button class="btn btn-sm bg-danger closeButton"><i class="flx-icon icon-remove"></i>${flexygo.localization.translate('flxgipe.buttoncancel')}</button>
                </div>
              
            `;
                    content.append(propTemplate);
                    content.find("button.closeButton").off("click").on("click", (e) => {
                        if (this.fixedPropertiesDialog === false) {
                            this.propertiesDialog.destroy();
                        }
                    });
                    content.find("button.saveButton").off("click").on("click", (e) => {
                        this.workflow.AreaId = content.find('flx-dbcombo[name="dbc-areaid"]')[0].getValue();
                        this.workflow.ModuleId = content.find('flx-dbcombo[name="dbc-moduleid"]')[0].getValue();
                        this.workflow.Descrip = content.find('flx-text[name="dbc-descrip"]')[0].getValue();
                        this.workflow.Active = content.find('flx-check[name="dbc-active"]')[0].getValue();
                        let oldCells = [];
                        for (let key in model.cells) {
                            let c = model.cells[key];
                            if (c.isEdge() == true && parseInt(c.target.id) === 0) {
                                oldCells.push(c);
                            }
                        }
                        let newValues = [];
                        content.find('label[data-name="propname"]').each((i, e) => {
                            let value = this.editor.templates["relation"].value.cloneNode(true);
                            let lblProp = $(e);
                            let prop = lblProp.attr('data-prop');
                            let cboType = lblProp.parent().find(`select[data-name="parenttype"][data-prop="${prop}"]`); //TYPE SIEMPRE NODE
                            let cboParent = lblProp.parent().find(`select[data-name="parentname"][data-prop="${prop}"]`); //NODO PADRE
                            let cboParam = lblProp.parent().find(`select[data-name="paramname"][data-prop="${prop}"]`);
                            let type = "node";
                            let iotype = cboType.val();
                            let parent = cboParent.val();
                            let param = cboParam.val();
                            if (type && type.length > 0 && parent && parent.length > 0 && param && param.length > 0) {
                                let s = `<Parameter childparam="${prop}" iotype="${iotype}" type="${type}" parent="${parent}" parentparam="${param}"></Parameter>`;
                                let r = mxUtils.parseXml(s);
                                value.appendChild(r.documentElement);
                                newValues.push(value);
                            }
                        });
                        model.beginUpdate();
                        try {
                            graph.removeCells(oldCells);
                            newValues.forEach((n) => {
                                let parent = graph.getModel().getCell(n.firstChild.attributes['parent'].value);
                                let newCell = this.editor.graph.insertEdge(cell, null, n, parent, cell);
                                newCell.setVisible(false);
                            });
                        }
                        finally {
                            model.endUpdate();
                        }
                        if (!this.fixedPropertiesDialog) {
                            this.propertiesDialog.destroy();
                        }
                    });
                    flexygo.ajax.post('~/api/Gipe', 'getNodeRelations', { nodeType: cell.value.nodeName, nodeName: cell.value.getAttribute("fgid") }, (ret) => {
                        let relations = graph.getEdges(cell);
                        let divProps = content.find('div[name="gipeprops"]');
                        ret.forEach((param) => {
                            let parentvalue = "";
                            let parentdescrip = "";
                            let typevalue = "";
                            let paramvalue = "";
                            $.each(relations, (i, n) => {
                                let np = n.value.childNodes[0];
                                if (np.getAttribute('childparam').toLowerCase() === param.ParamName.toLowerCase()) {
                                    typevalue = np.getAttribute('iotype');
                                    parentvalue = model.getCell(np.getAttribute('parent')).id;
                                    paramvalue = np.getAttribute('parentparam');
                                    parentdescrip = model.getCell(np.getAttribute('parent')).value.getAttribute('label');
                                }
                            });
                            let prop = param.ParamName;
                            let template = `
                        <div class="col-12">        
                            <label   class="col-3" data-name="propname" data-prop="${prop}">${param.ParamLabel}</label>
                            <select  class="col-3" data-name="parenttype" data-prop="${prop}"><option value=""/><option value="II">Input</option><option value="IO">Input/Output</option><option value="OO">Output</option></select>
                            <select  class="col-3" data-name="parentname" data-prop="${prop}"></select>
                            <select  class="col-3" data-name="paramname"  data-prop="${prop}"></select>
                        </div>`;
                            let parsed = $(template);
                            if (typevalue.length === 0) {
                                typevalue = param.ParamType;
                            }
                            let nodes = `<option value=""></option>`;
                            let cboParent = parsed.find(`select[data-name="parentname"][data-prop="${prop}"]`);
                            for (let key in model.cells) {
                                let cell = model.cells[key];
                                if (cell.isVertex()) {
                                    nodes += `<option value="${cell.id}">${cell.value.getAttribute('label')}</option>`;
                                }
                            }
                            cboParent.append(nodes);
                            if (typevalue !== '') {
                                parsed.find('select[data-name="parenttype"]').val(typevalue);
                            }
                            if (parentvalue !== '') {
                                parsed.find('select[data-name="parentname"]').append(`<option value="${parentvalue}" selected>${parentdescrip}</option>`);
                            }
                            if (paramvalue !== '') {
                                parsed.find('select[data-name="paramname"]').append(`<option value="${paramvalue}" selected>${paramvalue}</option>`);
                            }
                            divProps.append(parsed);
                        });
                        divProps.find('select[data-name="parenttype"]').off('change').on('change', (e) => {
                            let cboType = $(e.currentTarget);
                            let prop = cboType.attr('data-prop');
                            let cboParent = cboType.parent().find(`select[data-name="parentname"][data-prop="${prop}"]`);
                            let cboParam = cboType.parent().find(`select[data-name="paramname"][data-prop="${prop}"]`);
                            cboParam.find('option').remove();
                            cboParent.val('');
                            cboParam.val('');
                            switch (cboType.val()) {
                                case 'II':
                                    cboParent.prop('disabled', true);
                                    cboParam.prop('disabled', true);
                                    break;
                                default:
                                    cboParent.prop('disabled', false);
                                    cboParam.prop('disabled', false);
                                    cboParam.html();
                                    break;
                            }
                        });
                        divProps.find('select[data-name="parentname"]').off('change').on('change', (e) => {
                            let cboParent = $(e.currentTarget);
                            let prop = cboParent.attr('data-prop');
                            let cboType = cboParent.parent().find(`select[data-name="parenttype"][data-prop="${prop}"]`);
                            let cboParam = cboParent.parent().find(`select[data-name="paramname"][data-prop="${prop}"]`);
                            cboParam.find('option').remove();
                            let nodes = `<option value=""></option>`;
                            switch (cboType.val()) {
                                case 'II':
                                    break;
                                default:
                                    let cell = model.getCell(cboParent.val());
                                    if (!cell) {
                                        cboParam.append(nodes);
                                    }
                                    else {
                                        flexygo.ajax.post('~/api/Gipe', 'getNodeRelations', { nodeType: cell.value.localName, nodeName: cell.value.getAttribute('fgid') }, (ret) => {
                                            ret.forEach((param) => {
                                                nodes += `<option value="${param.ParamName}">${param.ParamLabel}</option>`;
                                            });
                                            cboParam.append(nodes);
                                        });
                                    }
                                    break;
                            }
                        });
                    });
                }
                updateModuleTitle() {
                    let module = $(this).closest('flx-module');
                    let title = this.moduleTitle;
                    if (this.workflow) {
                        title += ' (' + this.workflow.WorkflowId + ') - ' + this.workflow.Descrip + ' - (V' + this.workflow.Version + ')';
                    }
                    $(module).find('.cntTitle').text(title);
                }
                updateBreadcrumb() {
                    let self = this;
                    let bc = $(this).find('ol.breadcrumb');
                    bc.empty();
                    if (this.currentExecutionId === 0) {
                        this.workflowStack.forEach((wf, i) => {
                            let li = $(`
                    <li class="breadcrumb-item"><a>${wf.WorkflowId}</a></li>
                `);
                            li.on('click', (e) => {
                                self.goUp(i);
                            });
                            bc.append(li);
                        });
                        if (this.workflow && this.workflow.WorkflowId) {
                            bc.append(`
                        <li class="breadcrumb-item active"><a>${this.workflow.WorkflowId}</a></li>
                    `);
                        }
                    }
                    else {
                        this.debugStack.forEach((wf, i) => {
                            let li = $(`
                        <li class="breadcrumb-item" style="color:red"><a>${wf.WorkflowId}</a></li>
                    `);
                            li.on('click', (e) => {
                                let wf = this.debugStack[i];
                                self.loadDebugWorkflow(wf.WorkflowId, -1, wf.ExecutionId, null);
                            });
                            bc.append(li);
                        });
                    }
                }
                concatWhere(whereA, whereB) {
                    let where = "";
                    if (whereA && whereA.length > 0) {
                        where = whereA;
                    }
                    if (whereB && whereB.length > 0) {
                        if (whereA && whereA.length > 0) {
                            where += " AND " + whereB;
                        }
                        else {
                            where = whereB;
                        }
                    }
                    return where;
                }
                updateComboVersions() {
                    let cbo = $(this.versionCombo);
                    cbo.empty();
                    if (!this.workflow) {
                        cbo.append('<option value="">No versions</option>');
                    }
                    else {
                        this.workflow.Versions.forEach((v, i) => {
                            let isCurrent = (v.Version === this.workflow.Version);
                            cbo.append(`<option value="${v.Version}" ${(isCurrent) ? 'selected' : ''}  >V${v.Version} ${(v.Active) ? '(Active)' : ''}</option>`);
                        });
                    }
                }
                htmlEncode(value) {
                    return $('<div/>').text(value).html();
                }
                getStepStyle(cell, style) {
                    let sep = '';
                    if (style && style.length > 0) {
                        sep = '-';
                    }
                    switch (cell.value.localName.toLowerCase()) {
                        case 'process':
                            return style + sep + 'rectangle';
                        case 'object':
                            return style + sep + 'ellipse';
                        case 'decission':
                            return style + sep + 'rhombus';
                        case 'workflow':
                            return style + sep + 'hexagon';
                        case 'event':
                            return style + sep + 'cloud';
                        case 'relation':
                            return style + sep + 'edge';
                        case 'label':
                            return 'label';
                        default:
                            flexygo.msg.error('Invalid value');
                            return;
                    }
                }
                /**
                * Fires when an execution has finisehd a step
                * @method debugWorkflow
                */
                onDebugStepChanged() {
                    if (this.currentExecutionId === 0) {
                        return;
                    }
                    $(this.debugDialog.content).find('button[name="dbg-stepinto"]').prop('disabled', false);
                    $(this.debugDialog.content).find('button[name="dbg-stepover"]').prop('disabled', false);
                    flexygo.ajax.post('~/api/Gipe', 'getWorkflowExecutionStatus', { executionId: this.currentExecutionId }, (ret) => {
                        let execInfo = null;
                        if (ret && ret.Execution && ret.Execution.length > 0) {
                            ret.Execution.forEach((ex) => {
                                if (ex.ExecutionId == ret.NextWorkflow) {
                                    execInfo = ex;
                                    return false;
                                }
                            });
                            if (!execInfo) {
                                ret.Execution.forEach((ex) => {
                                    if (ex.ExecutionId == this.debugWorkflow.ExecutionId) {
                                        execInfo = ex;
                                        return false;
                                    }
                                });
                            }
                        }
                        if (execInfo.ExecutionId !== this.debugWorkflow.ExecutionId) {
                            this.loadDebugWorkflow(execInfo.WorkflowId, -1, execInfo.ExecutionId, ret);
                        }
                        else {
                            this.updateDebugInfo(ret);
                        }
                    });
                }
                addTreeNode(change, rootNode) {
                    if (change.ExecutionData && change.ExecutionData.length > 0) {
                        let model = null;
                        let itemLabel = "";
                        if (change.ExecutionId == this.debugWorkflow.ExecutionId) {
                            model = this.editor.graph.getModel();
                            let cell = model.getCell(change.GraphId);
                            itemLabel = cell.value.getAttribute('label');
                        }
                        else {
                            this.debugStack.forEach((wf, i) => {
                                if (wf.ExecutionId == change.ExecutionId) {
                                    let node = mxUtils.parseXml(this.debugStack[i].WorkflowData);
                                    let cell = $(node.documentElement).find(`[id="${change.GraphId}"]`);
                                    if (cell.length > 0) {
                                        itemLabel = cell[0].getAttribute('label');
                                    }
                                    return false;
                                }
                            });
                        }
                        let data = (new DOMParser()).parseFromString(change.ExecutionData, "text/xml").documentElement;
                        let itemNode = {
                            text: itemLabel,
                            icon: "fa fa-folder",
                            children: []
                        };
                        let resultNode = {
                            text: `<span>${flexygo.localization.translate('flxgipe.labelresult')}:</span><span style="color:black"><b>${change.ResultDescription}</b></span>`,
                            icon: "none",
                            children: []
                        };
                        itemNode.children.push(resultNode);
                        if (change.ResultId == eStepResult.Error) {
                            let errorNode = {
                                text: `<span>${flexygo.localization.translate('flxgipe.labelerrormessage')}:</span><span style="color:black"><b>${change.ErrorMessage}</b></span>`,
                                icon: "none",
                                children: []
                            };
                            resultNode.children.push(errorNode);
                        }
                        let statusNode = {
                            text: `<span>${flexygo.localization.translate('flxgipe.labelstatus')}:</span><span style="color:black"><b>${change.StatusDescription}</b></span>`,
                            icon: "none",
                            children: []
                        };
                        itemNode.children.push(statusNode);
                        let inNode = {
                            text: flexygo.localization.translate('flxgipe.treeinnode'),
                            icon: "flx-icon icon-document-export",
                            children: []
                        };
                        let inParams = data.getElementsByTagName('in')[0];
                        $.each(inParams.getElementsByTagName('param'), (i, e) => {
                            let paramNode = {
                                text: `<span>${e.getAttribute('name')}:</span><span style="color:black"><b>${e.getAttribute('value')}</b></span>`,
                                icon: 'none'
                            };
                            inNode.children.push(paramNode);
                        });
                        itemNode.children.push(inNode);
                        let outNode = {
                            text: flexygo.localization.translate('flxgipe.treeoutnode'),
                            icon: "flx-icon icon-document-import",
                            children: []
                        };
                        let outParams = data.getElementsByTagName('out')[0];
                        $.each(outParams.getElementsByTagName('param'), (i, e) => {
                            let paramNode = {
                                text: `<span>${e.getAttribute('name')}:</span><span style="color:black"><b>${e.getAttribute('value')}</b></span>`,
                                icon: 'none'
                            };
                            outNode.children.push(paramNode);
                        });
                        itemNode.children.push(outNode);
                        rootNode.children.push(itemNode);
                    }
                }
                updateDebugInfo(ret) {
                    if (!ret) {
                        return;
                    }
                    let graph = this.editor.graph;
                    let model = graph.getModel();
                    let lastWorkflowExecutionId = ret.LastWorkflow;
                    if (lastWorkflowExecutionId === 0) {
                        lastWorkflowExecutionId = this.currentExecutionId;
                    }
                    let execInfo = null;
                    if (ret && ret.Execution && ret.Execution.length > 0) {
                        ret.Execution.forEach((ex) => {
                            if (ex.ExecutionId == lastWorkflowExecutionId) {
                                execInfo = ex;
                                return false;
                            }
                        });
                        if (execInfo) {
                            let finishedSteps = [];
                            ret.Execution.forEach((ex) => {
                                if ((ex.ExecutionId !== execInfo.ExecutionId) && (ex.StatusId === eStepStatus.Finished)) {
                                    //Remove child finished workflows from stack
                                    this.debugStack.forEach((ds, i) => {
                                        if (ds.ExecutionId === ex.ExecutionId) {
                                            finishedSteps.push(ds);
                                        }
                                    });
                                }
                            });
                            if (finishedSteps.length !== 0) {
                                finishedSteps.forEach((fs) => {
                                    this.debugStack.splice(this.debugStack.indexOf(fs), 1);
                                });
                                this.updateBreadcrumb();
                            }
                        }
                    }
                    let txtStatus = $('#gipedbg-status')[0];
                    let txtResult = $('#gipedbg-result')[0];
                    if (execInfo) {
                        txtStatus.setValue(execInfo.StatusDescription);
                        txtResult.setValue(execInfo.ResultDescription);
                        if (execInfo.ResultId !== eStepResult.NoResult) {
                            $(this.debugDialog.content).find('button[name="dbg-stepinto"]').prop('disabled', true);
                            $(this.debugDialog.content).find('button[name="dbg-stepover"]').prop('disabled', true);
                        }
                    }
                    let rootNodes = [];
                    ret.Execution.forEach((exec) => {
                        let execNode = {
                            id: 'WF-' + exec.ExecutionId,
                            text: exec.WorkflowDescription,
                            icon: "flx-icon icon-share",
                            children: []
                        };
                        rootNodes.push(execNode);
                    });
                    if (ret.Nodes) {
                        model.beginUpdate();
                        try {
                            ret.Nodes.forEach((change) => {
                                if ((change.ExecutionId === execInfo.ExecutionId) && (change.ExecutionId === this.debugWorkflow.ExecutionId)) {
                                    let cell = model.getCell(change.GraphId);
                                    if (change.ResultId !== eStepResult.NoResult) {
                                        cell.edges.forEach((edge) => {
                                            if (edge.target.id === cell.id) {
                                                model.setStyle(edge, this.getStepStyle(edge, 'success'));
                                                let state = graph.view.getState(edge);
                                                state.shape.node.removeAttribute('class');
                                            }
                                        });
                                    }
                                    switch (change.ResultId) {
                                        case eStepResult.OK:
                                            model.setStyle(cell, this.getStepStyle(cell, 'success'));
                                            break;
                                        case eStepResult.Error:
                                            model.setStyle(cell, this.getStepStyle(cell, 'error'));
                                            break;
                                        default:
                                            model.setStyle(cell, this.getStepStyle(cell, ''));
                                            break;
                                    }
                                    let state = graph.view.getState(cell);
                                    state.shape.node.removeAttribute('class');
                                }
                                let rootNode = null;
                                rootNodes.forEach((n) => {
                                    if (n.id == 'WF-' + change.ExecutionId) {
                                        rootNode = n;
                                        return false;
                                    }
                                });
                                this.addTreeNode(change, rootNode);
                            });
                            let nextId = 0;
                            if (ret.NextWorkflow === execInfo.ExecutionId) {
                                if (ret.NextStep && ret.NextStep !== 0) {
                                    nextId = ret.NextStep;
                                }
                                else {
                                    if (execInfo.ResultId === 0) {
                                        nextId = execInfo.InitialGraphId;
                                    }
                                }
                            }
                            else if ((ret.NextWorkflow === 0) && (ret.NextStep === 0)) {
                                if (ret.LastWorkflow === this.debugWorkflow.ExecutionId) {
                                    nextId = ret.LastStep;
                                }
                            }
                            if (nextId !== 0) {
                                let next = model.getCell(nextId);
                                let state = graph.view.getState(next);
                                model.setStyle(next, this.getStepStyle(next, 'running'));
                                state.shape.node.setAttribute('class', 'flow');
                                next.edges.forEach((edge) => {
                                    if (edge.target.id === next.id) {
                                        let state = graph.view.getState(edge);
                                        model.setStyle(edge, this.getStepStyle(edge, 'running'));
                                        state.shape.node.setAttribute('class', 'flow');
                                    }
                                });
                                this.lastDebugGraphId = {
                                    executionId: execInfo.ExecutionId,
                                    graphId: nextId
                                };
                            }
                        }
                        finally {
                            model.endUpdate();
                        }
                    }
                    var tree = $('#gipe-debug-tree');
                    tree.jstree(true).settings.core.data = rootNodes;
                    tree.jstree(true).refresh();
                    if ((execInfo.StatusId == eStepStatus.Aborted || execInfo.StatusId == eStepStatus.Finished) && (execInfo.ExecutionId == this.currentExecutionId)) {
                        this.lastDebugGraphId = null;
                        this.currentExecutionId = 0;
                        this.updateToolbarStatus();
                    }
                }
            }
            wc.FlxGipeDesignerElement = FlxGipeDesignerElement;
        })(wc = ui_1.wc || (ui_1.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define("flx-gipedesigner", flexygo.ui.wc.FlxGipeDesignerElement);
//# sourceMappingURL=flx-gipedesigner.js.map