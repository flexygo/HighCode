declare var webkitSpeechRecognition: any;
/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxVoiceSearchElement web component.
    *
    * @class FlxVoiceSearchElement
    * @constructor
    * @return {FlxVoiceSearchElement}
    */
    class FlxVoiceSearchElement extends HTMLElement {
        constructor();
        /**
        * Set when component is attached to DOM
        * @property connected {boolean}
        */
        connected: boolean;
        gridId: string;
        template: string;
        reordered: boolean;
        recognizing: boolean;
        timeout: number;
        recognition: any;
        /**
        * Fires when element is attached to DOM
        * @method connectedCallback
        */
        connectedCallback(): void;
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
        /**
         *
         Closes screen of search
         */
        closeSearch(): void;
        /**
        * Execute search based on user input
        * @method refresh
        */
        search(objectname?: string): void;
        private loadSearchOptions();
        private SearchOptionsMenu(ret);
        private updateCheck(item);
        private saveOrderOptions(OrderedObjects);
        private restartTimer();
        private clearTimer();
    }
}
