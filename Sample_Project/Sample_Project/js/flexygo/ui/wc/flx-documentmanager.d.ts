/**
 * @namespace flexygo.ui.wc
 */
declare namespace Dropbox {
    function choose(options: any): any;
    function isBrowserSupported(): any;
}
declare var gapi: any;
declare var google: any;
interface Window {
    gapi: any;
}
declare namespace flexygo.ui.wc {
    /**
    * Library for the flx-DocumentManagerElement web component.
    *
    * @class FlxDependencyManagerElement
    * @constructor
    * @return {FlxDocumentManagerElement} .
    */
    class FlxDocumentManagerElement extends HTMLElement {
        /**
        * Set when component is attached to DOM
        * @property connected {boolean}
        */
        connected: boolean;
        /**
        * Pointer to HTML element.
        * @property dialog {JQuery}
        */
        dialog: JQuery;
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
        * Component Object Id
        * @property objectId {string}
        */
        objectId: string;
        /**
        * Component Object Where
        * @property objectWhere {string}
        */
        objectWhere: string;
        /**
        * Config dropboxFolderCreate
        * @property dropboxFolderCreate {boolean}
        */
        dropboxFolderCreate: boolean;
        /**
        * Config dropboxFolderLink
        * @property dropboxFolderLink {boolean}
        */
        dropboxFolderLink: boolean;
        /**
        * Config dropboxFileCreate
        * @property dropboxFileCreate {boolean}
        */
        dropboxFileCreate: boolean;
        /**
        * Config dropboxFileLink
        * @property dropboxFileLink {boolean}
        */
        dropboxFileLink: boolean;
        /**
        * Config driveFolderCreate
        * @property driveFolderCreate {boolean}
        */
        driveFolderCreate: boolean;
        /**
        * Config driveFolderLink
        * @property driveFolderLink {boolean}
        */
        driveFolderLink: boolean;
        /**
        * Config driveFileCreate
        * @property driveFileCreate {boolean}
        */
        driveFileCreate: boolean;
        /**
        * Config driveFileLink
        * @property driveFileLink {boolean}
        */
        driveFileLink: boolean;
        /**
        * Config diskFolderCreate
        * @property diskFolderCreate {boolean}
        */
        diskFolderCreate: boolean;
        /**
        * Config diskFolderLink
        * @property diskFolderLink {boolean}
        */
        diskFolderLink: boolean;
        /**
        * Config diskFileCreate
        * @property diskFileCreate {boolean}
        */
        diskFileCreate: boolean;
        /**
        * Config diskFileLink
        * @property diskFileLink {boolean}
        */
        diskFileLink: boolean;
        /**
        * Document categories
        * @property categories {object}
        */
        categories: object;
        /**
        * Related object name
        * @property rObjectName {string}
        */
        rObjectName: string;
        /**
        * Related object to ERP
        * @property ERPObjectName {string}
        */
        ERPObjectName: string;
        /**
        * Config extensionId
        * @property extensionId {string}
        */
        extensionId: string;
        /**
        * Config extensions
        * @property extensions {string}
        */
        extensions: string;
        /**
        * Related object id
        * @property rObjectId {string}
        */
        rObjectId: any;
        /**
        * Default document category
        * @property categoryId {string}
        */
        categoryId: any;
        /**
        * Additional document filter
        * @property additionalWhere {string}
        */
        additionalWhere: any;
        managerMode: string;
        type: string;
        constructor();
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
        * Init the webcomponent.
        * @method init
        */
        init(): void;
        /**
        * Refresh de webcomponent.
        * @method refresh
        */
        refresh(): void;
        /**
        * Render HTML data.
        * @method render
        */
        render(): void;
        /**
        * Render HTML document data.
        * @method renderDocument
        * @param {string} Document ID.
        * @param {string} Path.
        * @param {string} DownloadLink.
        * @param {string} Name.
        * @param {string} Origin.
        * @param {string} Icon Class.
        * @param {string} Creation date.
        * @param {string} Category.
        * @param {string} Category ID.
        * @param {string} Description.
        * @param {string} Document type.
        * @param {string} Document extension.
        */
        renderDocument(docGuid: string, path: string, downloadLink: string, name: string, origin: string, iconClass: string, creationDate: string, category: string, categoryId: string, description: string, documentType: string, extension: string, inProgress: boolean): void;
        /**
        *Open dialog upload/link.
        * @method openDialog
        * @param {string} Dialog type.
        */
        openDialog(dialogType: string): void;
        filesTotal: number;
        filesPending: number;
        /**
        * Main events.
        * @method mainEvents
        */
        mainEvents(): void;
        onEntityUpdate(e: flexygo.events.FlexygoEvent): void;
        /**
        * Dialog events.
        * @method dialogEvents
        */
        dialogEvents(): void;
        /**
        * Document events.
        * @method documentEvents
        */
        documentEvents(): void;
        /**
        * View document.
        * @method viewDocument
        * @param {string } Content.
        */
        viewDocument(content: string, filename: string): void;
        /**
        * Remove document.
        * @method removeDocument
        * @param {string} Document ID.
        * @param {string} Object ID.
        */
        removeDocument(docGuid: string): void;
        /**
        * Set document.
        * @method setDocument
        * @param {string} Result.
        * @param {string} Document name.
        * @param {string} Document type.
        * @param {string} Cloud ID.
        * @param {string} Cloud link.
        * @param {string}  action
        */
        setCloudDocument(base64: string, documentName: string, documentType: string, cloudId: string, cloudLink: string, downloadLink: string, action: string, multi: boolean): void;
        /**
      * Downloads all documents.
      * @method downloadAllDocuments
      * @param {string} objectName.
      * @param {string} objectId.
      */
        downloadAllDocuments(objectName: string, objectId: string): void;
        /**
        * Send mail with selected documents
        * @method sendSelectedDocuments
        * @param {string} objectName.
        * @param {string} objectId.
         */
        sendSelectedDocuments(objectName: string, objectId: string): void;
        /**
        * Start editing.
        * @method editStartDocument
        * @param {string} Document ID.
        */
        editStartDocument(docGuid: string): void;
        /**
       * End editing.
       * @method editFinishDocument
       * @param {string} Document ID.
       */
        editFinishDocument(docGuid: string): void;
        /**
        * Exit edit mode.
        * @method editReturn
        * @param {string} Document ID.
        */
        editReturn(docGuid: string): void;
        /**
        * Get documents.
        * @method getDocument
        * @param {string} Document ID (Opctional).
        */
        getDocument(docGuid?: string): void;
        /**
        * Get document categories.
        * @method getCategories
        */
        getCategories(): void;
        /**
        * Get configuration Documents_Object.
        * @method getConfig
        */
        getConfig(): void;
        /**
        * Load Picker (Use the Google API Loader script to load the google.picker script).
        * @method loadPicker
        * @param {string} Method.
        * @param {string} Document Type.
        */
        loadPicker(method: string): void;
        /**
        * On Picker Api Load.
        * @method onPickerApiLoad
        * @param {string} Method.
        * @param {string} Document Type.
        */
        onPickerApiLoad(method: string): void;
        /**
        * Create Picker.
        * @method createPicker
        * @param {string} Method.
        * @param {string} Document Type.
        */
        createPicker(method: string, oauthToken: JSON): void;
        /**
        * Picker Callback.
        * @method pickerCallback
        * @param {any} data
        * @param {string} Method.
        * @param {string} Document Type.
        */
        pickerCallback(data: any, method: string): void;
        progressBar: any;
        progressTimer: any;
        /**
       * Show loading funcion before executing process
       * @method showLoading
       */
        showLoading(multi: boolean): void;
        /**
        * Move loading funcion during process execution
        * @method moveLoading
        */
        moveLoading(): void;
        /**
        * Close loading funcion after executing process
        * @method closeLoading
        */
        closeLoading(multi: boolean): void;
    }
}
declare namespace flexygo.io {
    class DocumentUpload {
        file: any;
        fileSize: any;
        bufferSize: number;
        reader: FileReader;
        currentPosition: number;
        objectname: string;
        objectid: string;
        documentType: string;
        action: string;
        documentId: string;
        manager: flexygo.ui.wc.FlxDocumentManagerElement;
        documentContainer: JQuery;
        categoryId: any;
        constructor(file: any, objectname: string, objectid: string, type: string, action: string, manager: flexygo.ui.wc.FlxDocumentManagerElement, categoryId: any);
        startUpload(): void;
        percentDone(): number;
        upload_file(): void;
        appendToDocument(base64: string, lastAppend: boolean): void;
        setDocument(base64: string, documentName: string, multipart: boolean): void;
        removeDocument(): void;
    }
}
