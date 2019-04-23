/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the flx-accordion.
    *
    * @class FlxAccordionElement
    * @constructor
    * @return {FlxAccordionElement} .
    */
    class FlxAccordionElement extends HTMLElement {
        /**
       * Set when component is attached to DOM
       * @property connected {boolean}
       */
        connected: boolean;
        constructor();
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
        * Fires when the attribute value of the element is changed.
        * @method attributeChangedCallback
        */
        attributeChangedCallback(attrName: any, oldVal: any, newVal: any): void;
        /**
       * Init the webcomponent. .
       * @method init
       */
        init(): void;
        /**
      * Clears the HTML.
      * @method clear
      */
        clear(): void;
        /**
       * Adds title and  content
       * @method add
       * @param {string} title - The title.
       * @param {any} content - The content.
       */
        add(title: string, content: any): JQuery;
        /**
       * toggle through items
       * @method toggle
       * @param {JQuery} itm - The itm.
       */
        toggle(itm: JQuery): void;
    }
}
