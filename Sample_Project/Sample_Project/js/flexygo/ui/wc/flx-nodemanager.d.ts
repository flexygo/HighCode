/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    class LoadNodesParams {
        ParentId: string;
        HideAutoSQLNodes: boolean;
    }
    class NavigationNode {
        nodeid: string;
        order: number;
        parentnodeid: string;
        title: string;
        childnodes: NavigationNode[];
        strtype: string;
    }
    class HierarchicalNode {
        id: string;
        children?: HierarchicalNode[];
        parentid: string;
        order: number;
    }
    /**
    * Library for the FlxMenuManagerElement web component.
    *
    * @class FlxNodeManagerElement
    * @constructor
    * @return {FlxNodeManagerElement}
    */
    class FlxNodeManagerElement extends HTMLElement {
        /**
       * Set when component is attached to DOM
       * @property connected {boolean}
       */
        connected: boolean;
        method: string;
        methodParams: LoadNodesParams;
        deleteMethod: string;
        relocateMethod: string;
        refreshMetod: string;
        initNode: string;
        rootNodeId: string;
        openNodes: string[];
        scrollY: number;
        sortableList: JQuery;
        constructor();
        /**
       * Fires when element is attached to DOM
       * @method connectedCallback
       */
        connectedCallback(): void;
        /**
        * Init menu manager
        * @method init
        */
        init(): void;
        template: string;
        refreshNavBar(): void;
        refresh(): void;
        loadNodes(): void;
        setRootNode(ret: NavigationNode[]): NavigationNode;
        loadNodesRet(ret: NavigationNode[]): void;
        showEdit(placeHolder: JQuery, isNewNode: boolean): void;
        findNode(nodes: HierarchicalNode[], nodeid: string, parentid?: string): HierarchicalNode;
        sortNodes(nodes: {}, orderby: string): NavigationNode[];
        getChildNodes(json: NavigationNode): string;
        deleteNode(node: string): void;
        saveOpenNode(btn: JQuery): void;
        saveNodesState(): void;
        restoreNodesState(): void;
    }
}
