/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxFileBrowser
    *
    * @class FlxFileBrowser
    * @constructor
    * @return {FlxFileBrowserElement}
    */
    class FlxFileBrowserElement extends HTMLElement {
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
        * Current dir path
        * @property currentDirPath {string} The current dir
        */
        currentDirPath: string;
        /**
        * The list of checked entries
        * @property selectedEntries {string[]} The selected entries
        */
        selectedEntries: string[];
        /**
         * The total ammount of files selected for upload
         * @property filesTotal {number}
         */
        filesTotal: number;
        /**
         * The ammount of files still to upload
         * @property filesPending {number}
         */
        filesPending: number;
        /**
         * The new folder name
         * @property newFolderName {string}
         */
        newFolderName: string;
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
        /**
         * Renders the header part of the filebrowser
         * @method renderHeader
         * @returns {string} The header html
         */
        renderHeader(): string;
        /**
         * Renders the header part of the filebrowser
         * @method renderFooter
         * @returns {string} The footer html
         */
        renderFooter(): string;
        /**
        * Calls controller and execute action
        * @method getData
        * @param path {string} The path to use
        * @param actionType {string} The action to execute
        */
        getData(path: string, actionType: string): void;
        private flxTranslate;
        startFileUpload(files: any): void;
        disableEvents(): void;
        setupEvents(): void;
        isImage(file: any): boolean;
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
declare namespace flexygo.io {
    class FileUpload {
        file: any;
        fileSize: any;
        bufferSize: number;
        reader: FileReader;
        currentPosition: number;
        objectName: string;
        moduleName: string;
        objectWhere: string;
        documentType: string;
        action: string;
        documentId: string;
        manager: flexygo.ui.wc.FlxFileBrowserElement;
        documentContainer: JQuery;
        currentDirPath: string;
        constructor(file: any, type: string, action: string, manager: flexygo.ui.wc.FlxFileBrowserElement);
        startUpload(): void;
        percentDone(): number;
        upload_file(): void;
        appendToDocument(base64: string, documentName: string, lastAppend: boolean): void;
        setDocument(base64: string, documentName: string, multipart: boolean): void;
        removeDocument(): void;
    }
}
