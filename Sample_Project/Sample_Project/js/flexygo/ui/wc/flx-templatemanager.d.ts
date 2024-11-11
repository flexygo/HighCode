/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxTemplateManager
    *
    * @class FlxTemplateManager
    * @constructor
    * @return {FlxTemplateManager} .
    */
    class FlxTemplateManagerElement extends HTMLElement {
        constructor();
        /**
        * Array of observed attributes. REQUIRED
        * @property observedAttributes {Array}
        */
        static readonly observedAttributes: string[];
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
        * Component Template
        * @property template { string }
        */
        template: string;
        /**
        * Component View Name
        * @property viewName { string }
        */
        viewName: string;
        /**
        * Component Properties
        * @property properties { any }
        */
        properties: any;
        /**
        * Component Option
        * @property option { string }
        */
        option: string;
        /**
        * Init the webcomponent. REQUIRED.
        * @method init
        */
        init(): void;
        /**
        * Refresh de webcomponent. REQUIRED.
        * @method refresh
        */
        refresh(): void;
        /**
        * Render HTML data.
        * @method render
        */
        render(): void;
        openManager(): void;
        getComboPlaceholder(allMatches: any): any;
        getComboOptions(placeholderTypes: string): string;
        getComboOptionsView(): string;
        openWizardView(viewName: string): void;
        /**
        * Fires when element is attached to DOM
        * @method connectedCallback
        */
        connectedCallback(): void;
        /**
        * Fires when the attribute value of the element is changed.
        * @method attributeChangedCallback
        */
        attributeChangedCallback(attrName: any, oldVal: any, newVal: any): void;
    }
}
