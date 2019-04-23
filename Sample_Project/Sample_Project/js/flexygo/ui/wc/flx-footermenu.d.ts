/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
   * Library for the FlxFooterMenuElement web component.
   *
   * @class FlxFooterMenuElement
   * @constructor
   * @return {FlxFooterMenuElement} .
   */
    class FlxFooterMenuElement extends HTMLElement {
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
        * Init the webcomponent.
        * @method init
        */
        init(): void;
        show(): void;
        hide(): void;
        addItem(icon: string, text: string, fnc: any): void;
        clear(): void;
    }
}
