/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxChatterElement
    *
    * @class FlxChatterElement
    * @constructor
    * @return {FlxChatterElement} .
    */
    class FlxChatterElement extends HTMLElement {
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
        * Database row Module ID
        * @property moduleName {string}
        */
        moduleName: string;
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
        * Component object Id
        * @property objectId {string}
        */
        objectId: string;
        /**
        * Destination Object Id
        * @property destinationObjectId {string}
        */
        destinationObjectId: string;
        /**
        * Destination Object Name
        * @property destinationObjectName {string}
        */
        destinationObjectName: string;
        /**
        * Composer Attachments
        * @property composerAttachments {array}
        */
        composerAttachments: flexygo.api.Chatter.composerAttachmentData[];
        /**
        * Mentions Data
        * @property mentionsData {array}
        */
        mentionsData: flexygo.api.Chatter.mentionsData[];
        /**
        * Default Settings
        * @property defaultSettings {string}
        */
        defaultSettings: object;
        /**
        * Composer Messages
        * @property messages {array}
        */
        /**
        * Start info Template
        * @property startInfo {string}
        */
        startInfoTemplate: Function;
        /**
        * Chatter Template
        * @property chatterTemplate {string}
        */
        chatterTemplate: Function;
        /**
        * Composer Attachment Template
        * @property composerAttachmentTemplate {string}
        */
        composerAttachmentTemplate: Function;
        /**
        * Composer Message Template
        * @property parentMessageTemplate {string}
        */
        parentMessageTemplate: Function;
        /**
        * Separator Template
        * @property separatorTemplate {string}
        */
        separatorTemplate: Function;
        /**
        * Message Template
        * @property messageTemplate {string}
        * @property isNew {boolean}
        */
        messageTemplate: Function;
        /**
        * Composer Attachment Template
        * @property composerAttachmentTemplate {string}
        */
        messageDocumentTemplate: Function;
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
        render(): Promise<void>;
        /**
        * Set main events.
        * @method setMainEvents
        */
        setStartInfoEvents(): void;
        /**
        * Set main events.
        * @method setMainEvents
        */
        setMainEvents(): void;
        /**
        * Set message events.
        * @method setMessageEvents
        * @param {JQuery} message
        */
        setMessageEvents(message?: JQuery): void;
        /**
        * Get messages.
        * @method getMessages
        */
        getMessages(): Promise<void>;
        /**
        * Set mentions.
        * @method setMentions
        */
        setMentions(): void;
        /**
        * Set message.
        * @method setMessage
        */
        setMessage(): void;
        /**
        * Update message.
        * @method updateMessage
        */
        updateMessage(id: any, parent: any): void;
        /**
        * Delete message.
        * @method deleteMessage
        */
        deleteMessage(IdMessage: any, parentId: any): void;
        /**
        * Clean composer.
        * @method cleanComposer
        */
        cleanComposer(): void;
        /**
        * Remove external events.
        * @method removeExternalEvents
        */
        removeExternalEvents(): void;
        /**
        * Establish webcomponent settings
        * @method configure
        */
        configure(): void;
        /**
        * Fires when element is attached to DOM
        * @method connectedCallback
        */
        connectedCallback(): void;
        /**
        * Fires when element is detached to DOM
        * @method disconnectedCallback
        */
        disconnectedCallback(): void;
        /**
        * Fires when the attribute value of the element is changed.
        * @method attributeChangedCallback
        */
        attributeChangedCallback(attrName: any, oldVal: any, newVal: any): void;
    }
}
