/**
 * @namespace flexygo.ui.wc
 */
declare var Freewall: any;
declare namespace flexygo.ui.wc {
    /**
* Library for the FlxImageManagerElement web component.
*
* @class FlxImageManagerElement
* @constructor
* @return {FlxImageManagerElement}
*/
    class FlxImageManagerElement extends HTMLElement {
        constructor();
        /**
        * Set when element is attached to DOM
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
        * Component Object Id
        * @property objectId {string}
        */
        objectId: string;
        /**
        * Single Image
        * @property singleImage {string}
        */
        singleImage: string;
        /**
        * empty
        * @property empty {string}
        */
        empty: string;
        /**
        * Image classification
        * @property classification {object}
        */
        classification: object;
        /**
        * Related object name
        * @property rObjectName {string}
        */
        rObjectName: string;
        /**
        * Related object id
        * @property rObjectId {string}
        */
        rObjectId: string;
        /**
        * Wall JQuery
        * @property wall {JQuery}
        */
        wall: JQuery;
        /**
        * Visualization mode
        * @property mode {string}
        */
        mode: string;
        /**
        * Images Length
        * @property imagesLength {number}
        */
        imagesLength: number;
        /**
        * Images for render
        * @property imagesPreRender {any[]}
        */
        imagesPreRender: any[];
        /**
        * Default image class
        * @property imageClassId {string}
        */
        imageClassId: any;
        /**
        * Additional image filter
        * @property additionalWhere {string}
        */
        additionalWhere: any;
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
        * Render HTML image data.
        * @method renderImage
        * @param {string} Image Id.
        * @param {string} Name.
        * @param {string} Description.
        * @param {number} Classification Id.
        * @param {string} Classification Description.
        * @param {boolean} Main Image.
        * @param {number} Order Number.
        * @param {string} Path.
        * @param {number} faceEncoding Number.
        * @param {string} lastError String.
        */
        renderImage(imageId: string, name: string, descrip: string, classId: string, classDescrip: string, mainImage: boolean, orderNumber: number, path: string, faceEncoding?: number, lastError?: string): void;
        /**
        * Main events.
        * @method mainEvents
        */
        mainEvents(): void;
        onEntityUpdate(e: flexygo.events.FlexygoEvent): void;
        /**
        * Image events.
        * @method imageEvents
        */
        imageEvents(): void;
        /**
        * set image.
        * @method setImage
        * @param {string} Name.
        * @param {string} Base64.
        */
        setImage(name: string, base64: string): void;
        /**
        * Get image.
        * @method getImage
        * @param {string} Image ID (Opctional).
        */
        getImage(imageId?: string): void;
        /**
        * Update image.
        * @method getImage
        * @param {string} Image ID.
        * @param {boolean} Main Image.
        * @param {number} orderNumber.
        */
        updateImage(imageId: string, mainImage: boolean, orderNumber: number, objectName: string): void;
        /**
        * Order image.
        * @method orderImage
        * @param {any} Image(Optional).
        */
        orderImage(image?: any): void;
        /**
        * Remove image.
        * @method removeImage
        * @param {string} Image ID.
        */
        removeImage(imageId: string, objectName: string): void;
        /**
        * Remove all images.
        * @method removeAllImages
        * @param {string} objectName.
        * @param {string} objectId.
        */
        removeAllImages(objectName: string, objectId: string): void;
        /**
        * Downloads all images.
        * @method downloadAllImages
        * @param {string} objectName.
        * @param {string} objectId.
        */
        downloadAllImages(objectName: string, objectId: string): void;
        /**
      * Image reader.
      * @method imageReader
      * @param {File} File.
      */
        imageReader(file: any): void;
        setCompression(compression: number, fileType: string, canvas?: any, ctx?: any): number;
        /**
       * Get image classification.
       * @method getClassification
       */
        getClassification(): void;
        /**
       * Set gallery.
       * @method setGallery
       */
        setGallery(): void;
        /**
        * Find faces in picture and try yo recognice it with known faces.
        * @method showFaces
        * @param {string} file.
        * @param {string} objectname.
        * @param {number} tolerance.
        * @param {string} filterids.
        * @param {boolean} isb64.
        * @param {Jquery} e.
        */
        showFaces(file: any, objectname: any, tolerance: any, filterids: any, isb64: any, e: any): void;
    }
}
