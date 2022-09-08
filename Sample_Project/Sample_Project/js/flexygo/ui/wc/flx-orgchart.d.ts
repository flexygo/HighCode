/**
 * @namespace flexygo.ui.wc
 */
declare var Treant: any;
declare namespace flexygo.ui.wc {
    /**
    * Library for the flx-easyinfo web component.
    *
    * @class FlxOrgChartlement
    * @constructor
    * @return {FlxOrgChartlement} .
    */
    class FlxOrgChartElement extends HTMLElement {
        constructor();
        objectname: string;
        objectwhere: string;
        data: any;
        tHeader: string;
        tBody: string;
        tFooter: string;
        moduleName: string;
        tree: any;
        options: any;
        chart: {
            connectors: {
                type: 'step';
            };
            node: {
                HTMLclass: 'orgchartnode';
            };
            hideRootNode: true;
            animateOnInit: true;
            animation: {
                nodeAnimation: "easeOutBounce";
                nodeSpeed: 1700;
                connectorsAnimation: "bounce";
                connectorsSpeed: 1700;
            };
        };
        stackChildren: boolean;
        /**
        * Fires when element is attached to DOM
        * @method connectedCallback
        */
        connectedCallback(): void;
        /**
       * Set when component is attached to DOM
       * @property connected {boolean}
       */
        connected: boolean;
        /**
       * Array of observed attributes.
       * @property observedAttributes {Array}
       */
        static readonly observedAttributes: string[];
        /**
        * Fires when the attribute value of the element is changed.
        * @method attributeChangedCallback
        */
        attributeChangedCallback(attrName: any, oldVal: any, newVal: any): void;
        /**
       * Refresh de webcomponent.
       * @method refresh
       */
        refresh(): void;
        /**
       * Init the webcomponent.
       * @method init
       */
        init(): void;
        /**
       * Render from module configuration.
       * @method render
       */
        render(): void;
        getChildren(id: any): Array<any>;
        /**
        * Translates string.
        * @method addEasInfo
        * @param {string} str
        * @return {string}
        */
        translate(str: string): string;
        /**
        * Start loading.
        * @method startLoading
        */
        startLoading(): void;
        /**
        * Stop loading.
        * @method stopLoading
        */
        stopLoading(): void;
        /**
       * Set initial zoom to view all content of orgchart.
       * @method setInitialZoom
       */
        setInitialZoom(): void;
        /**
       * Drag scroll.
       * @method dragScroll
       */
        dragScroll(): void;
    }
}
