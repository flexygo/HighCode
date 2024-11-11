declare var webkitSpeechRecognition: any;
declare var marked: any;
/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxAIElement
    *
    * @class FlxAIElement
    * @constructor
    * @return {FlxAIElement} .
    */
    class FlxAIElement extends HTMLElement {
        constructor();
        targetItem: JQuery;
        initTemplate: string;
        messageTemplate: string;
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
        * ChatGPT settings
        * @property settings {string}
        */
        settings: flexygo.api.ChatGPTSetting;
        /**
        * ChatGPT settings Id
        * @property settingId {string}
        */
        settingId: string;
        /**
        * ChatGPT messages
        * @property messages {string}
        */
        messages: any[];
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
        input: HTMLTextAreaElement;
        sendButton: JQuery;
        voiceButton: JQuery;
        recognition: any;
        /**
        * Render HTML data.
        * @method render
        */
        render(): void;
        getButtons(): void;
        /**
        * Send message to AI.
        * @method sendToAI
        * @param {String} message. Message to send to AI
        */
        sendToAI(message: string): void;
        writeMessage(role: any, avatar: any, srcavatar: any, author: any, time: any, message: any, enableReturn: any, positionClass: any, originalMessage?: any): void;
        parseToMarkdown(message: any): string;
        updateLastMessage(role: any, avatar: any, srcavatar: any, author: any, time: any, message: any, enableReturn: any, positionClass: any, originalMessage?: any): void;
        updateLastFunctionMessage(avatar: any, srcavatar: any, author: any, time: any, message: any, enableReturn: any, positionClass: any, originalMessage: any): void;
        setReturnButton(msgElement: JQuery, originalMessage: any): void;
        /**
        *
        * @method open
        */
        open(options: flexygo.api.ChatGPTOptions): void;
        open_from_toolbar(settingId: string, module: JQuery): void;
        close(e?: flexygo.events.FlexygoEvent): void;
        resizeInput(): void;
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
        /**
        * Fires when element is detached to DOM
        * @method disconnectedCallback
        */
        disconnectedCallback(): void;
    }
}
