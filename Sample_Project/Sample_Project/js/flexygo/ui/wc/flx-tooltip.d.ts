/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    type FlxToolTipMode = "tooltip" | "popover";
    /**
    * Library for the FlxToolTipElement web component.
    *
    * @class FlxToolTipElement
    * @constructor
    * @return {FlxToolTipElement}
    */
    class FlxToolTipElement extends HTMLElement {
        constructor();
        /**
       * Set when component is attached to DOM
       * @property connected {boolean}
       */
        connected: boolean;
        objectName: string;
        objectWhere: string;
        templateId: string;
        placement: string;
        container: string;
        helpId: string;
        mode: FlxToolTipMode;
        desktopOnly: boolean;
        opened: boolean;
        pop: JQuery;
        elementid: string;
        hasObjectTemplate: boolean;
        innerContent: string;
        /**
        * Fires when element is attached to DOM
        * @method connectedCallback
        */
        connectedCallback(): void;
        /**
      * Fires when element is detached from DOM
      * @method disconnectedCallback
      */
        disconnectedCallback(): void;
        /**
        * Monitor the list of observed attribute for changes.
        * @property observedAttributes
        */
        static readonly observedAttributes: string[];
        /**
        * Fires when the attribute value of the element is changed.
        * @method attributeChangedCallback
        */
        attributeChangedCallback(attrName: any, oldVal: any, newVal: any): void;
        /**
        * Initialize Web Control
        * @method init
        */
        init(): void;
        /**
        * Refreses Web Control
        * @method refresh
        */
        refresh(): void;
    }
}
