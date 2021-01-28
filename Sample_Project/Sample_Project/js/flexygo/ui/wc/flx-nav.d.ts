/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    type FlxNavMode = 'nav' | 'menu' | 'panel' | 'box' | 'network' | 'mobile';
    interface FlxNavNode extends vis.Node {
        navnode: flexygo.api.navigation.NavigationNode;
        expanded: boolean;
    }
    /**
    * Library for the FlxNavElement web component.
    *
    * @class FlxNavElement
    * @constructor
    * @return {FlxNavElement}
    */
    class FlxNavElement extends HTMLElement {
        constructor();
        /**
        * Set when component is attached to DOM
        * @property connected {boolean}
        */
        connected: boolean;
        wcTemplate: string;
        headerTemplate: string;
        itemTemplate: string;
        method: 'GetNavNodes' | 'GetMainNodes' | 'GetNodesById';
        methodParams: flexygo.api.navigation.getNodesByIdParams | flexygo.api.navigation.GetMainNodesParams | flexygo.api.navigation.GetNavNodesParams;
        mode: FlxNavMode;
        hierarchical: boolean;
        maxId: number;
        initNode: string;
        template: string;
        separatorTemplate: string;
        network: vis.Network;
        nodes: vis.DataSet<vis.Node>;
        edges: vis.DataSet<vis.Edge>;
        /**
        * Fires when element is attached to DOM
        * @method connectedCallback
        */
        connectedCallback(): void;
        static readonly observedAttributes: string[];
        /**
      * Fires when the attribute value of the element is changed.
      * @method attributeChangedCallback
      * @param {String} attrName. The attribute name
      * @param {String} oldVal. The old value
      * @param {String} newVal.the new value
      */
        attributeChangedCallback(attrName: string, oldVal: string, newVal: string): void;
        /**
        * Init the webcomponent.
        * @method init
        */
        init(): void;
        /**
        * Refresh de webcomponent.
        * @method refresh
        */
        refresh(): void;
        /**
       * Does post to load Nodes.
       * @method loadNodes
       */
        loadNodes(): void;
        /**
        * loads Nodes with post result.
        * @method loadNodesRet
        * @param {Array} ret. an array with the nodes
        */
        loadNodesRet(ret: flexygo.api.navigation.NavigationNode[]): void;
        /**
        * loads Nodes with in network mode post result.
        * @method loadNodesNetworkMode
        * @param {Array} ret. an array with the nodes
        */
        loadNodesNetworkMode(ret: flexygo.api.navigation.NavigationNode[]): void;
        /**
        * Resizes the network graphic
        * @method resizeNetwork
        */
        resizeNetwork(): void;
        /**
       * Adds a node in network mode
       * @method loadNodesNetworkMode
       * @param {flexygo.api.navigation.NavigationNode} nn. Navigation node to add
       * @param {FlxAreaNode} parent. Parent network node
       */
        addNode(nn: flexygo.api.navigation.NavigationNode, parent: FlxNavNode): FlxNavNode;
        /**
        * Expands a node in network mode
        * @method loadNodesNetworkMode
        * @param {flexygo.api.navigation.NavigationNode} nn. Navigation node to add
        * @param {FlxAreaNode} parent. Parent network node
        */
        expandNode(child: FlxNavNode, parent: FlxNavNode): void;
        nodeClick(params: any): void;
        /**
        * Creates a network node from a navigation node
        * @method getNetworkNodeFromNavigationNode
        * @param {flexygo.api.navigation.NavigationNode} nn. the navigation node
        */
        getNetworkNodeFromNavigationNode(nn: flexygo.api.navigation.NavigationNode): FlxNavNode;
        /**
       * get Node icon
       * @method getIcon
       * @param {String} IconClass. The icon class
        * @param {String} IconPath. The icon path
       */
        getIcon(IconClass: string, IconPath: string): string;
        /**
        * Gets HTML string with child nodes as ul an li elements.
        * @method getChildNodes
        * @param {JSON} json. json with the nodes
        * @return {String} Returns nodes built as HTML ul element string
        */
        getChildNodes(json: flexygo.api.navigation.LoweredNavigationNode): string;
        /**
        * set Additional Buttons
        * @method setAdditionalButtons
        * @param {String} mode. Navigator mode
        */
        setAdditionalButtons(mode: string): void;
        /**
       * Gets HTML string with child nodes with a tree display.
       * @method getTreeNavigate
       * @param {JSON} json. json with the nodes
       * @return {String} Returns nodes built as HTML tree
       */
        getTreeNavigate(json: flexygo.api.navigation.LoweredNavigationNode): string;
        /**
        * Sets class if parent tree node has childnodes.
        * @method hasChildNodesClass
        * @param {JSON} json. json with the nodes
        * @return {String} Returns class item-closed when no child nodes
        */
        hasChildNodesClass(json: flexygo.api.navigation.LoweredNavigationNode): string;
        /**
       * Sets class if parent tree node has childnodes.
       * @method hasChildNodesLiClass
       * @param {JSON} json. json with the nodes
       * @return {String} Returns class parent_li when no child nodes
       */
        hasChildNodesLiClass(json: flexygo.api.navigation.LoweredNavigationNode): string;
        /**
        * Changes class atribbutes when display is resized.
        * @method onNavResize
        */
        onNavResize(ev: JQueryEventObject): void;
        /**
        * Sets click action depending on node type.
        * @method navItemClick
        * @param {Object} navItem. the nav item
        * @param {Objects} navBar. The nav bar
       */
        navItemClick(navItem: JQuery, navBar: JQuery): void;
        /**
         * Hides after click depending if movile or web environment.
         * @hideAfterClick navItemClick
        */
        hideAfterClick(): void;
        private toUnicode(name);
    }
}
