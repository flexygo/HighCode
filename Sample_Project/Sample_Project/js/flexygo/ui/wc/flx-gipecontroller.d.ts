declare namespace flexygo.ui.wc {
    class FlxGipeControllerElement extends HTMLElement {
        constructor();
        /**
        * Array of observed attributes. REQUIRED
        * @property observedAttributes {Array}
        */
        static readonly observedAttributes: any[];
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
        * Init the webcomponent. REQUIRED.
        * @method init
        */
        init(): void;
        /**
        * Refresh the webcomponent. REQUIRED.
        * @method refresh
        */
        refresh(): void;
        /**
        * Render HTML data.
        * @method render
        */
        render(): void;
        /**
        * Fires when a GIPE class event is receibed
        * @method onEventReceibed
        */
        onEventReceived(e: flexygo.events.FlexygoEvent): void;
        /**
     * Shows the process params page an return its result
     * @method askParams
     */
        jsReturn(paramsEvent: flexygo.events.FlexygoEvent): void;
        /**
        * Shows the process params page an return its result
        * @method askParams
        */
        askParams(paramsEvent: flexygo.events.FlexygoEvent): void;
        /**
        * Shows the object search default page to ask for a entity
        * @method askParams
        */
        askEntity(paramsEvent: flexygo.events.FlexygoEvent): void;
        /**
       * Shows a dialog of yes/no response
       * @method askYesNo
       */
        askYesNo(paramsEvent: flexygo.events.FlexygoEvent): void;
    }
}
