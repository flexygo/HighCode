/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    class SidePanelItem {
        button: JQuery;
        panel: JQuery;
    }
    /**
    * Library for the FlxSidePanelElement web component.
    *
    * @class FlxSidePanelElement
    * @constructor
    * @return {FlxSidePanelElement}
    */
    class FlxSidePanelElement extends HTMLElement {
        constructor();
        /**
        * Set when component is attached to DOM
        * @property connected {boolean}
        */
        connected: boolean;
        panels: {
            [key: string]: SidePanelItem;
        };
        lastTimer: number;
        /**
        * Fires when element is attached to DOM
        * @method connectedCallback
        */
        connectedCallback(): void;
        /**
        * Array of observed attributes.
        * @property observedAttributes {Array}
        */
        static readonly observedAttributes: any[];
        /**
        * Fires when element is attached to DOM
        * @method connectedCallback
        */
        attributeChangedCallback(attrName: any, oldVal: any, newVal: any): void;
        init(): void;
        clearPanels(): void;
        addPanel(title: string, icon: string, content: JQuery, debugOnly: boolean): void;
        togglePanel(itm: JQuery): void;
        removePanel(key: string): void;
        hidePanels(): void;
    }
}
