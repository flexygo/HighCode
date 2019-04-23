interface JQueryStatic {
    jstree: any;
}
declare namespace flexygo.ui.wc {
    class mxConstants {
        static readonly ALIGN_CENTER: string;
        static readonly ALIGN_MIDDLE: string;
        static readonly ALIGN_TOP: string;
        static readonly ARROW_CLASSIC: string;
        static GUIDE_COLOR: string;
        static GUIDE_STROKEWIDTH: number;
        static readonly PERIMETER_ELLIPSE: string;
        static readonly PERIMETER_RECTANGLE: string;
        static readonly PERIMETER_RHOMBUS: string;
        static readonly PERIMETER_HEXAGON: string;
        static readonly PERIMETER_TRIANGLE: string;
        static readonly SHAPE_RECTANGLE: string;
        static readonly SHAPE_ELLIPSE: string;
        static readonly SHAPE_DOUBLE_ELLIPSE: string;
        static readonly SHAPE_RHOMBUS: string;
        static readonly SHAPE_LINE: string;
        static readonly SHAPE_IMAGE: string;
        static readonly SHAPE_ARROW: string;
        static readonly SHAPE_ARROW_CONNECTOR: string;
        static readonly SHAPE_LABEL: string;
        static readonly SHAPE_SWIMLANE: string;
        static readonly SHAPE_CONNECTOR: string;
        static readonly SHAPE_ACTOR: string;
        static readonly SHAPE_CLOUD: string;
        static readonly SHAPE_TRIANGLE: string;
        static readonly SHAPE_HEXAGON: string;
        static readonly STYLE_FONTCOLOR: string;
        static readonly STYLE_OPACITY: string;
        static readonly STYLE_SHAPE: string;
        static readonly STYLE_GRADIENTCOLOR: string;
        static readonly STYLE_GRADIENT_DIRECTION: string;
        static readonly STYLE_PERIMETER: string;
        static readonly STYLE_STROKECOLOR: string;
        static readonly STYLE_STROKEWIDTH: string;
        static readonly STYLE_ROUNDED: string;
        static readonly STYLE_FILLCOLOR: string;
        static readonly STYLE_ALIGN: string;
        static readonly STYLE_LABEL_BACKGROUNDCOLOR: string;
        static readonly STYLE_VERTICAL_ALIGN: string;
        static readonly STYLE_HORIZONTAL: string;
        static readonly STYLE_STARTSIZE: string;
        static readonly STYLE_FONTSIZE: string;
        static readonly STYLE_FONTSTYLE: string;
        static readonly STYLE_EDGE: string;
        static readonly STYLE_ENDARROW: string;
        static readonly STYLE_ENDSIZE: string;
        static readonly STYLE_ENDFILL: string;
        static readonly STYLE_WHITE_SPACE: string;
        static readonly STYLE_VERTICAL_LABEL_POSITION: string;
    }
    class mxStyle {
        [key: string]: any;
    }
    class mxRectangle {
        constructor(x: number, y: number, width: number, height: number);
    }
    class mxCellAttributeChange {
        constructor(cell: mxCell, attributeName: string, attributeValue: string);
    }
    class mxEvent {
        static readonly CLOSE: string;
        static readonly DESTROY: string;
        static readonly GESTURE: string;
        static readonly CELLS_RESIZED: string;
        static readonly CHANGE: string;
        static addMouseWheelListener(callback: (evt: WheelEvent, up: boolean) => void): void;
        static consume(evt: WheelEvent): void;
        static isConsumed(evt: WheelEvent): boolean;
        getProperty(prop: string): mxCell[];
    }
    class mxEdgeStyle {
        static readonly ElbowConnector: string;
    }
    class mxPerimeter {
        static readonly RectanglePerimeter: string;
        static readonly ellipsePerimeter: string;
    }
    class mxGraphModel {
        beginUpdate(): void;
        endUpdate(): void;
        cells: mxCell[];
        getCell(id: string | number): mxCell;
        setGeometry(cell: mxCell, geometry: mxGeometry): void;
        setStyle(cell: mxCell, style: string): void;
        execute(edit: mxCellAttributeChange): void;
    }
    class mxDefaultKeyHandler {
        bindAction(code: number, action: string, control?: boolean): void;
    }
    class mxShape {
        node: Element;
    }
    class mxCellState {
        shape: mxShape;
    }
    class mxGraphView {
        getState(cell: mxCell): mxCellState;
    }
    class mxGraph {
        popupMenuHandler: mxPopupMenuHandler;
        view: mxGraphView;
        getStylesheet(): mxStylesheet;
        getSelectionCells(): mxCell[];
        getModel(): mxGraphModel;
        getDefaultParent(): mxCell;
        insertVertex(parent: mxCell, id: number, value: string, x: number, y: number, width: number, height: number, style?: string, relative?: boolean): mxCell;
        insertEdge(parent: mxCell, id: number, value: any, source: mxCell, target: mxCell, style?: string): mxCell;
        addListener(name: string, callback: (sender: mxWindow, event: mxEvent) => void): any;
        isCellResizable(cell: mxCell): boolean;
        setHtmlLabels(value: boolean): void;
        labelChanged(cell: mxCell, value: string, evt: any): void;
        cellLabelChanged(cell: mxCell, newValue: any, autoSize: any): void;
        convertValueToString(value: any): string;
        getSelectionModel(): mxGraphSelectionModel;
        setAllowDanglingEdges(value: boolean): void;
        setDisconnectOnMove(value: boolean): void;
        isAutoSizeCell(cell: mxCell): boolean;
        updateCellSize(cell: mxCell, ignoreChildren?: boolean): mxCell;
        removeCells(cells: mxCell[], includeEdges?: boolean): void;
        getChildCells(parent: mxCell, vertices?: boolean, edges?: boolean): mxCell[];
        createEdge(parent: mxCell, id: number, value: any, source: mxCell, target: mxCell, style?: string): mxCell;
        getEdges(cell: mxCell, parent?: mxCell, incoming?: boolean, outgoing?: boolean, includeLoops?: boolean, recurse?: boolean): mxCell[];
    }
    class mxGraphSelectionModel {
        addListener(name: string, callback: (sender: mxWindow, event: mxEvent) => void): any;
    }
    class mxCodec {
        constructor(doc: Document);
        decodeCell(element: HTMLElement): mxCell;
    }
    class mxDefaultToolbar {
        constructor(container: HTMLElement, editor: mxEditor);
        addItem(title: string, icon: string, action: string, pressed?: string): HTMLElement;
        addMode(title: string, icon: string, mode: string, pressed?: string, func?: any): HTMLElement;
        addSeparator(icon?: string): void;
        addCombo(): HTMLElement;
        tionCombo(title: string): HTMLElement;
        addActionOption(combo: HTMLElement, title: string, action: string): void;
        addPrototype(title: string, icon: string, ptype: any, pressed?: string, insert?: any, toogle?: boolean): any;
    }
    class mxCell {
        id: string;
        value: any;
        geometry: mxGeometry;
        isEdge(): boolean;
        isVertex(): boolean;
        target?: mxCell;
        source?: mxCell;
        edges: mxCell[];
        setValue(value: any): void;
        clone(): mxCell;
        setVisible(visible: boolean): void;
    }
    class mxGeometry {
        x: number;
        y: number;
        width: number;
        height: number;
        clone(): mxGeometry;
    }
    class mxUtils {
        static parseXml(xmlString: string): Document;
        static error(message: string, width: number, close?: boolean, icon?: boolean): void;
        static clone<T>(obj: T, transients?: string[], shallow?: boolean): T;
        static isNode(cell: mxCell): boolean;
    }
    class mxWindow {
        constructor(title: string, content: HTMLElement, x: number, y: number, width: number, height?: number, minimizable?: boolean, movable?: boolean, replaceNode?: HTMLElement, style?: string);
        content: HTMLElement;
        title: HTMLElement;
        setMaximizable(value: boolean): void;
        setResizable(value: boolean): void;
        setScrollable(value: boolean): void;
        setVisible(value: boolean): void;
        setClosable(value: boolean): void;
        destroy(): void;
        addListener(name: string, callback: (sender: mxWindow, event: Event) => void): any;
    }
    class mxStylesheet {
        putCellStyle(name: string, style: mxStyle): void;
        putDefaultVertexStyle(style: mxStyle): void;
        putDefaultEdgeStyle(style: mxStyle): void;
    }
    class mxPopupMenuHandler {
        factoryMethod(menu: mxPopupMenu, cell: mxCell, evt: mxEvent): void;
    }
    class mxPopupMenu {
        addItem(title: string, image?: string, funct?: any, parent?: mxPopupMenu, iconCls?: string, enabled?: boolean, active?: boolean): mxPopupMenu;
        addSeparator(parent?: mxPopupMenu, force?: boolean): void;
    }
    class mxEditor {
        constructor(node: Node);
        templates: mxCell[];
        graph: mxGraph;
        keyHandler: mxDefaultKeyHandler;
        popupHandler: any;
        defaultEdge: mxCell;
        addAction(name: string, callback: (editor: mxEditor, cell: mxCell) => void): any;
        addTemplate(name: string, template: mxCell): void;
        execute(action: string): void;
        isModified(): boolean;
        readGraphModel(doc: Node): void;
        writeGraphModel(linefeed: string): any;
        setModified(modified: boolean): void;
    }
    class WorkflowNodeMarker {
        executionId: number;
        graphId: number;
    }
    class GipeTemplateFilterConfig {
        areaId: string;
        originId: number;
        objects: boolean;
        processes: boolean;
        decissions: boolean;
        workflows: boolean;
        events: boolean;
        name: string;
    }
    class FlxGipeDesignerElement extends HTMLElement {
        constructor();
        /**
        * Array of observed attributes. REQUIRED
        * @property observedAttributes {Array}
        */
        static readonly observedAttributes: string[];
        /**
        * Fires when element is attached to DOM
        * @method connectedCallback
        */
        connectedCallback(): void;
        /**
        * Fires when element is dettached to DOM
        * @method disconnectedCallback
        */
        disconnectedCallback(): void;
        /**
        * Fires when the attribute value of the element is changed.
        * @method attributeChangedCallback
        */
        attributeChangedCallback(attrName: string, oldVal: any, newVal: any): void;
        /**
        * Set if element has been connected to DOM
        * @property connected {boolean}
        */
        connected: boolean;
        /**
        * HTML tag identifier
        * @property uuid {string}
        */
        uuid: string;
        /**
        * mxEditor instance
        * @property editor {mxEditor}
        */
        editor: mxEditor;
        /**
        * mxEditor opened dialog
        * @property dialog {mxWindow}
        */
        dialog: mxWindow;
        /**
        * Properties dialog
        * @property dialog {mxWindow}
        */
        propertiesDialog: mxWindow;
        /**
        * Debug dialog
        * @property dialog {mxWindow}
        */
        debugDialog: mxWindow;
        /**
        * Current loaded workflow
        * @property workflow {flexygo.api.gipe.GipeWorkflow}
        */
        workflow: flexygo.api.gipe.GipeWorkflow;
        /**
        * Current loaded workflow in debug mode
        * @property workflow {flexygo.api.gipe.GipeWorkflow}
        */
        debugWorkflow: flexygo.api.gipe.GipeWorkflow;
        /**
        * Stack of loaded workflows
        * @property workflowStack {flexygo.api.gipe.GipeWorkflow[]}
        */
        workflowStack: flexygo.api.gipe.GipeWorkflow[];
        /**
        * Stack of loaded workflows in debug mode
        * @property debugStack {flexygo.api.gipe.GipeWorkflow[]}
        */
        debugStack: flexygo.api.gipe.GipeWorkflow[];
        /**
        * Current execution Id
        * @property currentExecutionId {number}
        */
        currentExecutionId: number;
        /**
        * Last cell id painted as executed
        * @property lastDebugGraphId {number}
        */
        lastDebugGraphId: WorkflowNodeMarker;
        /**
        * Last cell that triggered a popup event
        * @property popupCell {number}
        */
        popupCell: mxCell;
        /**
        * Filter configuration for templates dialog
        * @property templateFilter {GipeTemplateFilterConfig}
        */
        templateFilter: GipeTemplateFilterConfig;
        private versionCombo;
        private moduleTitle;
        private fixedPropertiesDialog;
        /**
        * Init the webcomponent. REQUIRED.
        * @method init
        */
        init(): void;
        private initGraphStyles();
        private initEditorTemplates();
        private addEditorTemplate(name, xmlString);
        private initEditorPopupMenu();
        private initEditorToolbar();
        private initEditorKeyHandler();
        private initEditorMouseHandler();
        private doDropTemplate(ui);
        private setGraphSize();
        /**
        * Refresh the webcomponent. REQUIRED.
        * @method refresh
        */
        refresh(): void;
        /**
        * Opens upper workflow
        * @method goUp
        */
        goUp(level: number): void;
        /**
        * Opens lower workflow
        * @method goDown
        */
        goDown(): void;
        /**
        * Runs the current workflow
        * @method runWorkflow
        */
        runWorkflow(): void;
        /**
       * Runs the current workflow in debug mode
       * @method startDebugWorkflow
       */
        startDebugWorkflow(): void;
        /**
        * Open the workflow load dialog
        * @method openLoadDialog
        */
        openLoadDialog(): void;
        /**
        * Sets a window as the current dialog
        * @method showDialog
        */
        showDialog(window: mxWindow): void;
        /**
       * Sets a window as the current properties dialog
       * @method showPropertiesDialog
       */
        showPropertiesDialog(window: mxWindow): void;
        /**
        * Sets a window as the current debug dialog
        * @method showDebugDialog
        */
        showDebugDialog(window: mxWindow): void;
        /**
        * Set nothing as the current dialog
        * @method destroyDialog
        */
        destroyDialog(): void;
        /**
       * Set nothing as the current properties dialog
       * @method destroyPropertiesDialog
       */
        destroyPropertiesDialog(): void;
        /**
        * Set nothing as the current debug dialog
        * @method destroyPropertiesDialog
        */
        destroyDebugDialog(): void;
        /**
         * Loads and display a saved workflow
         * @method loadWorkflow
         */
        loadWorkflow(id: string, version: number, pushCurrent?: boolean): void;
        /**
        * Loads and display a saved workflow in debug mode
        * @method loadWorkflow
        */
        loadDebugWorkflow(id: string, version: number, newExecutionId: number, debugInfo: flexygo.api.gipe.GipeDebugStatus): void;
        /**
       * Open the workflow save dialog
       * @method openSaveDialog
       */
        openSaveDialog(): void;
        /**
        * Clears the workflow and edit new workflow
        * @method newWorkflow
        */
        newWorkflow(): void;
        /**
         * Generates the workflow
         * @method generateWorkflow
        */
        generateWorkflow(): void;
        /**
        * Open the templates dialog
        * @method openTemplateDialog
        */
        openTemplateDialog(): void;
        private updateTemplateFilter();
        onModuleResize(e: flexygo.events.FlexygoEvent): void;
        /**
       * Open the workflow debug dialog
        * @method openDebugDialog
        */
        openDebugDialog(): void;
        /**
        * Render HTML data.
        * @method render
        */
        render(): void;
        /**
        * Updates toolbar status.
        * @method render
        */
        updateToolbarStatus(): void;
        private openPropertiesDialog();
        private showCellProperties(cell);
        private showRelationProperties(cell);
        private viewCell(cell);
        private listParamsCell(cell);
        private newCell(cell);
        private onEntityInserted(e);
        private showWorkflowProperties();
        private updateModuleTitle();
        private updateBreadcrumb();
        private concatWhere(whereA, whereB);
        private updateComboVersions();
        private htmlEncode(value);
        private getStepStyle(cell, style);
        /**
        * Fires when an execution has finisehd a step
        * @method debugWorkflow
        */
        onDebugStepChanged(): void;
        private addTreeNode(change, rootNode);
        updateDebugInfo(ret: flexygo.api.gipe.GipeDebugStatus): void;
    }
}
