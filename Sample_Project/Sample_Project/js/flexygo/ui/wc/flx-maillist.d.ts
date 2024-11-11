/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxMailList
    *
    * @class FlxKanban
    * @constructor
    * @return {FlxMailList} .
    */
    class FlxMailList extends HTMLElement {
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
        uid: number;
        pageSize: number;
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
        * Current toolbar
        * @property toolbar {object}
        */
        toolbar: any;
        linkObj: string;
        linkKey: string;
        folder: string;
        noMailTemplate: string;
        noSettingsTemplate: string;
        template: string;
        structure: string;
        /**
        * Init the webcomponent. REQUIRED.
        * @method init
        */
        init(): void;
        load(sync: any): Promise<void>;
        loadMore(): void;
        loadConfig(): void;
        renderToolbar(defaults: any): void;
        folderClick(itm: any): void;
        settingsClick(itm: any): void;
        newFolderClick(itm: any): void;
        viewMail(mailID: any, subject: any): void;
        renderFolders(obj: any, parent: string): JQuery;
        getFilters(): flexygo.api.mail.MailFilters;
        selectAll(): void;
        selectNone(): void;
        refreshDefauts(): void;
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
        * Refresh de webcomponent. REQUIRED.
        * @method refresh
        */
        refresh(): Promise<void>;
        /**
        * Render HTML data.
        * @method render
        */
        render(ret: any, sync: any): JQuery;
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
