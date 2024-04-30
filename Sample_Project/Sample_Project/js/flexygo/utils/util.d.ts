/**
 * @namespace flexygo.utils
 */
declare namespace flexygo.utils {
    /**
     * Shows a QR with the specified text,
     * @method showQR
     * @param {string} text - The text to include in QR, by default current location page.
     */
    function showQR(text: string): void;
    function generateQR(text: string, size?: number): string;
    /**
    * Check if two objects are equivalent
    * @method ObjectsAreEquivalent
    * @param {object} a - Object a to compare.
    * @param {object} b - Object b to compare.
    */
    function objectsAreEquivalent(a: any, b: any): boolean;
    /**
    * Creates a string function from a param array.
    * @method functionToString
    * @param {string} functionName - The function name.
    * @param {object[]} params - Params with its values.
    * @param {object[]} nonEvaluateParams - Context params with non explicit values.
    */
    function functionToString(functionName: string, params: any, nonEvaluateParams?: any): string;
    function getModule(itm: any): any;
    /**
    * Escape Javascript special chars
    * @method parseJavaString
    * @param {string} value - string to parse.
    * @return {string} parsed string
    */
    function parseJavaString(value: any): any;
    /**
    * Returns a html string with loading style
    * @method loadingMsg
    * @return {string} HTML String
    */
    function loadingMsg(): string;
    /**
    * Transform object keys into lower case.
    * @param {object} obj - Object to transform.
    * @param {string} [recursive=false] - Set recursive mode on/off.
    * @method lowerKeys
    * @return {object} transformed object.
    */
    function lowerKeys(obj: any, recursive?: boolean): object;
    /**
    * Add text to clipboard.
    * @method copyClipboard
    * @param {JQuery} text - text to add to clipboard.
    * @return {boolean} True if works, false if not.
    */
    function copyClipboard(text: string): boolean;
    /**
    * Says if the screen is in mobile mode or note.
    * @method isSizeMobile
    * @return {boolean} True if screen is mobile size, false if not.
    */
    function isSizeMobile(): boolean;
    /**
       * Says if the screen is in smartphone mode.
       * @method isSizeSmartphone
       * @return {boolean} True if screen is smartphone size, false if not.
       */
    function isSizeSmartphone(): boolean;
    /**
    * Says if the screen is in tactil mode.
    * @method isTactilModeActive
    * @return {boolean} True if tactil mode is active, false if not.
    */
    function isTactilModeActive(): boolean;
    /**
    * Toggles tactil mode.
    * @method toggleTactilMode
    */
    function toggleTactilMode(): void;
    /**
    * Says if the screen is in full screen mode.
    * @method isFullScreenActive
    * @return {boolean} True if full screen is active, false if not.
    */
    function isFullScreenActive(): boolean;
    /**
    * Toggles full screen.
    * @method toggleFullScreen
    */
    function toggleFullScreen(): void;
    /**
    * Says if the agent's navigator comes from a mobile.
    * @method isAgentMobile
    * @return {boolean} True if agent's navigator comes from a mobile, false if not.
    */
    function isAgentMobile(): boolean;
    /**
   * Says if the agent's navigator comes from Electron.
   * @method isAgentElectron
   * @return {boolean} True if agent's navigator comes from Electron, false if not.
   */
    function isAgentElectron(): boolean;
    /**
    * Transform object into key value pairs array.
    * @param {object} data - Object to transform.
    * @method dataToArray
    * @return {object[]} key value pais array.
    */
    function dataToArray(data: object): flexygo.api.GenericKeyValueObject[];
    /**
    * Search index number of an specified item in array.
    * @param {object} arr - Array with all items
    * @param {object[]} itm - Item to find.
    * @method indexOfObject
    * @return {number} Item index if found, -1 if not.
    */
    function indexOfObject(arr: any, itm: any, excludes?: any): number;
    /**
    * Sorts an object's array by specified properties.
    * @param {object} obj - Object to order.
    * @param {string} property - Order property
    * @param {string} [property2] - Second order property
    * @method sortObject
    * @return {any[]} Ordered object.
    */
    function sortObject(obj: any, property: string, property2?: string): any[];
    /**
    * Generates an unique ID for this page.
    * @method uniqueId
    * @return {string} unique ID.
    */
    function uniqueId(): string;
    /**
    * Generates an unique tab index for this page.
    * @method uniqueId
    * @return {number} unique tab index.
    */
    function uniqueTabIndex(): number;
    var animationTime: number;
    var testMode: boolean;
    /**
    * Generates an unique name for this page.
    * @method uniqueId
    * @return {string} unique name.
    */
    function uniqueName(): string;
    /**
        * Generates an unique id
        * @method uniqueUUId
        * @return {string} unique name.
        */
    function uniqueUUID(): string;
    /**
    * resolve an url setting the right path.
    * @param {string} url - Url to resolve.
    * @method resolveUrl
    * @return {string} resolved url
    */
    function resolveUrl(url: any): string;
    /**
    * Stop code execution
    * @param {number} milliseconds - number of milliseconds to stop.
    * @method sleep
    */
    function sleep(milliseconds: any): void;
    /**
    * A promise to wait until the time ends
    * @param {number} milliseconds - number of milliseconds to stop.
    * @method asyncSleep
    */
    function asyncSleep(milliseconds: any): Promise<any>;
    /**
    * Check if text is base64
    * @param {string} str - text base64.
    * @method isBase64
    */
    function isBase64(str: string): boolean;
    /**
    * says if two objects are parents.
    * @param {string} objectname1 - Object or collection.
    * @param {string} objectname2 - Object or collection two.
    * @method areParents
    * @return {object} true if objects are the same or parents, false if not
    */
    function areParents(objectname1: string, objectname2: string): boolean;
    function onlineCheck(interval: any): void;
    function refreshModuleViewersInfo(module: flexygo.ui.wc.FlxModuleElement, listUsers: any): void;
    function checkObserverModule(module: flexygo.ui.wc.FlxModuleElement, interval: any, removeElement?: boolean): void;
    /**
    * Evaluates JavaScript code and executes it.
    * @param {string} dynamicCode - Dynamic Code.
    * @method execDynamicCode
    * @return {any}
    */
    function execDynamicCode(dynamicCode: string): any;
    /**
    * Evaluates JavaScript code and executes it.
    * @param {string} dynamicCode - Dynamic Code.
    * @method execAsyncDynamicCode
    * @return {Promise<any>}
    */
    function execAsyncDynamicCode(dynamicCode: string): Promise<any>;
    /**
    * Evaluates JavaScript code and executes it.
    * @param {string} dynamicCode - Dynamic Code.
    * @method execAsyncDynamicCode
    * @return {Promise<any>}
    */
    function execAsyncFunction(jsFunction: string, paramNames?: string[], paramValues?: any[]): Promise<any>;
    /**
    * Evaluates if variable has defined value.
    * @param {any} value - Variable to evaluate
    * @method isBlank
    * @return {boolean}
    */
    function isBlank(value: any): boolean;
    /**
      * Document viewer Events
      * @method documentViewerEvents
      * @param {flexygo.ui.wc.FlxModuleElement} documentModuleElement - Document Module Element.
      */
    function documentViewerEvents(documentModuleElement: flexygo.ui.wc.FlxModuleElement): void;
    /**
    * Evaluates if element is in main content.
    * @param {Element} element - Element to evaluate
    * @param {number} margin - Respect margin
    * @method isInMainContent
    * @return {boolean}
    */
    function isInMainContent(element: HTMLElement, margin?: number): boolean;
    /**
    * Check if is a valid JSON string.
    * @method isEmptyAttribute
    * @returns {boolean} True if it's a valid JSON string, false if it's not
    */
    function isJSON(string: string): boolean;
    /**
    * Get file icon.
    * @method getFileIcon
    */
    function getFileIcon(extension: string): string;
    var colors: string[];
    function hexToRgbA(hex: any, opacity: any): string;
    /**
    * Scrolls to the desired height
    * @method scrollTo
    * @param {string} scrollHeight Height where us desired to scroll
    */
    function scrollTo(scrollHeight: number): any;
    /**
    * Launch dark/light mode effect.
    * @method isEmptyAttribute
    * @param {boolean} dark Attribute Name.
    */
    function skinModeEffect(dark: boolean): any;
    function getErrorMessage(err: any): string;
    function showDependencyError(elm: any, width: number): void;
    /**
    * Generate random color based on a text seed.
    * @method randomColor
    * @param {text} seed Any string to get always same color.
    * @return {string} Color in
    */
    function randomColor(seed: string): string;
    function formatFileSize(size: number): string;
    function totalFileWeight(itm: any): void;
    function formRelatedDep_Childs(mode: string, ObjectName: string, PropertyName: string, e: any): void;
    var colors: Array<string>;
    /**
* Extract the tables using in a query for monaco-editor.
* @method extractTables
* @param {text} sentence query.
* @return {Array} table array
*/
    function extractTables(sentence: string, ConnStringId: string, subqueries: Map<string, string>): any[];
    function checkRegexWithWorker(regex: RegExp, content: string): Promise<unknown>;
    function wizardSetStep(e: any): void;
    const showLoading: (element?: any, text?: any, position?: any) => void;
    const showLoadingEffect: (time?: number, element?: any, text?: string, position?: any, noTimer?: boolean) => void;
    const removeLoadingEffect: (element?: any) => void;
    function getObjectName(collection_name: string): any;
    function saveFilterValueHistory(history: flexygo.nav.FlexygoHistory, moduleName: string, activeFilter: string, filters: flexygo.ui.wc.FlxFilterInfo[]): void;
}
declare namespace flexygo.utils.querystring {
    function getParamValue(url: string, paramName: string): string;
    function setParamValue(url: string, paramName: string, paramValue: string): string;
    function getParamString(url: string): string;
    function getUrlString(url: string): string;
    function getParamObject(url: string): [{
        key: string;
        value: string;
    }];
}
declare function printText(text: any): void;
declare namespace flexygo.mail {
    /**
    * Filters mail list Module with folder Name.
    * @method changeFolder
    * @param {string} folderId - new folder id.
    */
    function changeFolder(folderId: string, object: boolean): void;
    function viewLoaded(e: any, messageId: string): void;
    function openMail(messageId: string, objectName: string, objectId: string, mail: any): void;
    /**
    * Open search dinamically from dbcombo
    * @method parseJavaString
    * @param {string} property - name dbcombo property.
    * @param {HTMLElement} me - search property.
    */
    function openSearch(property: any, me: any): void;
}
/**
 * @namespace flexygo.utils.offline
 */
declare namespace flexygo.utils.offline {
    /**
   * Init Offline Module.
   * @method initOfflineModule
   * @param {Element} moduleElement HTML Element.
   * @param {boolean} withHorizontalScroll With Horizontal Scroll.
   * @param {number} visibleElements Visible Elements.
   * @param {number} respectSpace Respect Space.
   *  @param {string} scrollContainerSelector Scroll Container Selector.
   */
    function initOfflineModule(moduleElement: Element, withHorizontalScroll: boolean, visibleElements: number, respectSpace?: number, scrollContainerSelector?: string): void;
    /**
    * Show Related Info.
    * @method showRelatedInfo
    * @param {Element} triggerElement HTML Element.
    */
    function showRelatedInfo(triggerElement: Element): void;
    /**
    * Init Tabs Control.
    * @method initTabsControl
    * @param {Element} tabSection HTML Element.
    */
    function initTabsControl(tabSection: Element): void;
    /**
    * Get Attribute In Empty Template.
    * @method getAttributeInEmptyTemplate
    * @param {Element} element HTML Element.
    * @param {string} attributeName Attribute Name.
    * @returns {any} Atribute Value
    */
    function getAttributeInEmptyTemplate(element: Element, attributeName: string): string;
    /**
    * Is Empty Attribute.
    * @method isEmptyAttribute
    * @param {Element} element HTML Element.
    * @param {string} attributeName Attribute Name.
    * @param {string} is is Value.
    * @param {string} notIs notIs Value.
    * @returns {any} Value of "is" or "notIs"
    */
    function isEmptyAttribute(element: Element, attributeName: string, is: string, notIs: string): any;
}
declare namespace flexygo.utils.maintenance {
    function isActive(): boolean;
    function set(maintenanceDate: any): void;
    function check(): void;
    function enable(): void;
    function disable(): void;
    function setAdvice(): void;
}
