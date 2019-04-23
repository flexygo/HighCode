/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxNetworkElement web component.
    *
    * @class FlxNetworkElement
    * @constructor
    * @return {FlxNetworkElement}
    */
    class FlxNetworkElement extends HTMLElement {
        constructor();
        /**
        * Array of observed attributes.
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
        attributeChangedCallback(attrName: any, oldVal: any, newVal: any): void;
        /**
        * Set if element has been connected to DOM
        * @property connected {boolean}
        */
        connected: boolean;
        /**
        * Component Object Name
        * @property objectName {string}
        */
        objectName: string;
        /**
        * Component Object Where
        * @property objectWhere {string}
        */
        objectWhere: string;
        /**
        * Component Module name
        * @property moduleName {string}
        */
        moduleName: string;
        /**
        * HTML tag identifier
        * @property uuid {string}
        */
        uuid: string;
        /**
        * Maximum node id
        * @property maxId {number}
        */
        maxId: vis.IdType;
        /**
        * vis.js network object
        * @property network {vis.Network}
        */
        network: vis.Network;
        /**
        * vis.js dataset nodes object
        * @property nodes {vis.DataSet}
        */
        nodes: vis.DataSet<vis.Node>;
        /**
        * vis.js dataset nodes object
        * @property nodes {vis.DataSet}
        */
        edges: vis.DataSet<vis.Edge>;
        /**
        * Initial module height
        * @property initialHeight {number}
        */
        private initialHeight;
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
        * Render HTML data.
        * @method render
        */
        render(): void;
        nodeClick(params: any): void;
        onModuleResize(e: flexygo.events.FlexygoEvent): void;
        nodeContext(params: any): boolean;
        private onNewNode(node, parent, navnode);
        private toUnicode(name);
    }
}
