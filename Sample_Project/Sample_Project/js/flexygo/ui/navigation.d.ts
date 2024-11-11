declare namespace flexygo.nav {
    export class FilterHistoryValue {
        activeFilter: string;
        activePage: number;
        properties: flexygo.ui.wc.FlxFilterInfo[];
    }
    export class ModuleFilterHistory {
        [moduleName: string]: FilterHistoryValue;
    }
    export class PresetHistoryValue {
        presetId: string;
        presetName: string;
        presetText: string;
        presetIcon: string;
        removePreset: boolean;
    }
    export class ModulePresetHistory {
        [moduleName: string]: PresetHistoryValue;
    }
    export class FlexygoHistory {
        targetid: string;
        navigateFun?: string;
        opener?: string;
        objectname?: string;
        objectwhere?: string;
        defaults?: any;
        pagetypeid?: string;
        pagename?: string;
        hideNavbar?: boolean;
        hideMenuBar?: boolean;
        helpid?: string;
        tablename?: string;
        tabledescrip?: string;
        processname?: string;
        reportname?: string;
        reportwhere?: string;
        icon?: string;
        description?: string;
        filtersValues?: ModuleFilterHistory;
        presetsValues?: ModulePresetHistory;
        successMessage?: string;
        errorMessage?: string;
        userid?: string;
        callback?: string;
        print?: boolean;
    }
    /**
     * Opens the default object page
     * @method openPage
     * @param {string} pagetypeid - Type of the page
     * @param {string} objectname - Name of the collection or entity
     * @param {string} objectwhere - Where of the collection or entity
     * @param {string} defaults - Defaults to be added to the page
     * @param {string} targetid - Target to open the window
     * @param {boolean} excludeHist - True to not store in history
     * @param {JQuery} triggerElement - Relative element to open the page
     * @param {boolean} isClone -
     * @param {flexygo.nav.FlexygoHistory} previousHist - Previous page history
    */
    export function openPage(pagetypeid: string, objectname: string, objectwhere: string, defaults: any, targetid: string, excludeHist?: boolean, triggerElement?: JQuery, isClone?: boolean, previousHist?: flexygo.nav.FlexygoHistory, presets?: string): void;
    /**
    * Navigate to default page
    * @method goHome
    * @param {boolean} [excludeHist=false] - True to not store in history
     */
    export function goHome(excludeHist?: boolean): void;
    /**
     * Opens a page by its name
     * @method openPageName
     * @param {string} pagename - Identifier of the page
     * @param {string} objectname - Name of the collection or entity
     * @param {string} objectwhere - Where of the collection or entity
     * @param {string} defaults - Defaults to be added to the page
     * @param {string} targetid - Target to open the window
     * @param {boolean} excludeHist - True to not store in history
     * @param {JQuery} triggerElement - Relative element to open the page
     * @param {boolean} isClone -
    * @param {flexygo.nav.FlexygoHistory} previousHist - Previous page history
    */
    export function openPageName(pagename: string, objectname: string, objectwhere: string, defaults: string, targetid: string, excludeHist: boolean, triggerElement?: JQuery, isClone?: boolean, previousHist?: flexygo.nav.FlexygoHistory, presets?: string): void;
    class ExecProcessParams {
        processname: string;
        objectname: string;
        objectwhere: string;
        defaults?: any;
        processparams?: any;
        targetid: string;
        excludeHist: boolean;
        triggerElement?: JQuery;
        callBack?: any;
        showProgress?: boolean;
        originalProcess?: flexygo.Process;
        errorCallback?: any;
        eventData?: any;
    }
    export function execProcessObj(execProcessParams: ExecProcessParams): void;
    /**
    * Executes a process, opening its param page if required
    * @method execProcess
    * @param {string} processname - Identifier of the process
    * @param {string} objectname - Name of the collection or entity
    * @param {string} objectwhere - Where of the collection or entity
    * @param {string} defaults - Defaults to be added to the process
    * @param {any} processparams - Array of process parameters
    * @param {string} targetid - Target to open the window
    * @param {boolean} excludeHist - True to not store in history
    * @param {JQuery} triggerElement - Relative element to open the page
    * @param {function} callBack - callback to be called after execute
    * @param {boolean} showprogress - false to hide progress indicator
   */
    export function execProcess(processname: string, objectname: string, objectwhere: string, defaults: any, processparams: any, targetid: string, excludeHist: boolean, triggerElement: JQuery, callBack?: any, showProgress?: boolean, originalProcess?: flexygo.Process, errorCallback?: any, eventData?: any): void;
    export function openPageReturn(pageConf: flexygo.api.pages.Page, objectname: string, objectwhere: string, defaults: any, pageContainer: JQuery, reportname: string, processname?: string, isClone?: boolean, reportwhere?: string, presets?: string): void;
    /**
   * Opens the parameter process page
   * @method openProcessParams
   * @param {string} processname - Process Identifier
   * @param {string} objectname - Name of the collection or entity
   * @param {string} objectwhere - Where of the collection or entity
   * @param {string} defaults - Defaults to be added to the process
   * @param {string} targetid - Target to open the window
   * @param {boolean} excludeHist - True to not store in history
   * @param {JQuery} triggerElement - Relative element to open the page
  */
    export function openProcessParams(processname: string, objectname: string, objectwhere: string, defaults: any, targetid: string, excludeHist: boolean, triggerElement?: JQuery, pagename?: string, callBack?: any): void;
    /**
     * Opens the parameter process page
     * @method openProcessParamsPage
     * @param {string} pagename - Desired page name
     * @param {string} processname - Process Identifier
     * @param {string} objectname - Name of the collection or entity
     * @param {string} objectwhere - Where of the collection or entity
     * @param {string} defaults - Defaults to be added to the process
     * @param {string} targetid - Target to open the window
     * @param {boolean} excludeHist - True to not store in history
     * @param {JQuery} triggerElement - Relative element to open the page
    */
    export function openProcessParamsPage(pagename: string, processname: string, objectname: string, objectwhere: string, defaults: any, targetid: string, excludeHist: boolean, triggerElement?: JQuery, callBack?: any): void;
    /**
    * Opens the parameter report page
    * @method openReportsParams
    * @param {string} report - Identifier of the report
    * @param {string} reportwhere - Filter of the report
    * @param {string} objectname - Name of the collection or entity
    * @param {string} objectwhere - Where of the collection or entity
    * @param {string} defaults - Defaults to be added to the process
    * @param {string} targetid - Target to open the window
    * @param {boolean} excludeHist - True to not store in history
    * @param {JQuery} triggerElement - Relative element to open the page
   */
    export function openReportsParams(reportname: string, reportwhere: string, objectname: string, objectwhere: string, defaults: any, targetid: string, excludeHist: boolean, triggerElement?: JQuery, print?: boolean): void;
    /**
     * Opens the parameter report page
     * @method openReportsParamsPage
     * @param {string} pagename - Desired page name
     * @param {string} report - Identifier of the report
     * @param {string} reportwhere - Filter of the report
     * @param {string} objectname - Name of the collection or entity
     * @param {string} objectwhere - Where of the collection or entity
     * @param {string} defaults - Defaults to be added to the process
     * @param {string} targetid - Target to open the window
     * @param {boolean} excludeHist - True to not store in history
     * @param {JQuery} triggerElement - Relative element to open the page
    */
    export function openReportsParamsPage(pagename: string, reportname: string, reportwhere: string, objectname: string, objectwhere: string, defaults: any, targetid: string, excludeHist: boolean, triggerElement?: JQuery, print?: boolean): void;
    /**
     * Opens the report page
     * @method viewReport
     * @param {string} reportname - Identifier of the report
     * @param {string} reportwhere - filter of the report
     * @param {string} objectname - Name of the collection or entity
     * @param {string} objectwhere - Where of the collection or entity
     * @param {string} defaults - Defaults to be added to the process
     * @param {any} params - Array of key/value pararameters
     * @param {string} targetid - Target to open the window
     * @param {boolean} excludeHist - True to not store in history
     * @param {JQuery} triggerElement - Relative element to open the page
    */
    export function viewReport(reportname: string, reportwhere: string, objectname: string, objectwhere: string, defaults: any, params: any, targetid: string, excludeHist: boolean, hasParams?: boolean, print?: boolean): void;
    /**
     * Opens an URL
     * @method openURL
     * @param {string} url - URL identifier
     * @param {string} params - parameters to add to the URL
     * @param {string} targetid - Target to open the window
    */
    export function openURL(url: string, params: string | {
        key: string;
        value: string;
    }[], targetid?: string): Window;
    /**
    * Opens an edit table Page
    * @method openEditTable
    * @param {string} tablename - Name of the table
    * @param {string} targetid - Target to open the window
    * @param {string} tabledescrip - Description of the table
    * @param {boolean} excludeHist - True to not store in history
    * @param {JQuery} triggerElement - Relative element to open the page
   */
    export function openEditTable(tablename: string, targetid: string, tabledescrip: string, excludeHist: boolean, triggerElement?: JQuery): void;
    /**
    * Opens a help page
    * @method openHelpId
    * @param {string} helpid - Identifier of the help page
    * @param {string} targetid - Target to open the window
    * @param {boolean} excludeHist - True to not store in history
    * @param {JQuery} triggerElement - Relative element to open the page
   */
    export function openHelpId(helpid: string, targetid?: string, excludeHist?: boolean, triggerElement?: JQuery): void;
    /**
    * Opens a print page
    * @method openPrintPage
    * @param {string} objectName - Object Name
    * @param {string} objectWhere - Object Where
    * @param {string} templateId - TemplateId
    * @param {string} filter - Object or collection filter
    * @param {string} targetid - Target to open the window
   */
    export function openPrintPage(objectName: string, objectWhere: string, templateId: string, targetid: string, filter?: string, descrip?: boolean): void;
    /**
   * Gets help content
   * @method GetHelpContent
   * @param {string} helpid - Identifier of the help page
   * @returns {string} - Help content
  */
    export function getHelpContent(helpid: string): string;
    /**
 * Attaches Object Menu to button
 * @method getObjectMenu
 * @param {string} objectname - objectName
 * @param {string} objectwhere - object where
 * @param {string} defaults - object defaults
 * @param {string} btn - button
*/
    export function getObjectMenu(objectname: string, objectwhere: string, defaults: string, btn: JQuery, coord?: JQueryCoordinates, options?: string): void;
    export function getRealTarget(elm: JQuery): JQuery;
    export function getCurrentOpener(triggerElement: JQuery): string;
    /**
     * Close flexygo popup or modal page
     * @method closePage
     * @param {JQuery} elm - Element inside page to close
    */
    export function closePage(elm: JQuery): void;
    /**
     * Close all flexygo popup or modal page
     * @method closeAllPages
    */
    export function closeAllPages(): void;
    export function toggleMobileMenu(): void;
    export function toggleMobileNav(): void;
    export function toggleNavBar(): void;
    export function hideNavBar(): void;
    export function toggleFlxnav(menuNav: JQuery): void;
    export {};
}
declare namespace flexygo.nav.external {
    /**
    * Navigate to default page
    * @method goHome
    * @param {string} appname - External app project name
    * @param {string} targetid - Target to open the window
    */
    function goHome(appname: string, targetid: string): void;
    /**
     * Opens the default object page
     * @method openPage
     * @param {string} appname - External app project name
     * @param {string} pagetypeid - Type of the page
     * @param {string} objectname - Name of the collection or entity
     * @param {string} objectwhere - Where of the collection or entity
     * @param {string} defaults - Defaults to be added to the page
     * @param {string} targetid - Target to open the window
     * @param {JQuery} triggerElement - Relative element to open the page
    */
    function openPage(appname: string, pagetypeid: string, objectname: string, objectwhere: string, defaults: any, targetid: string, triggerElement?: JQuery): void;
    /**
     * Opens a page by its name
     * @method openPageName
     * @param {string} pagename - Identifier of the page
     * @param {string} appname - External app project name
     * @param {string} objectname - Name of the collection or entity
     * @param {string} objectwhere - Where of the collection or entity
     * @param {string} defaults - Defaults to be added to the page
     * @param {string} targetid - Target to open the window
     * @param {JQuery} triggerElement - Relative element to open the page
    */
    function openPageName(appname: string, pagename: string, objectname: string, objectwhere: string, defaults: string, targetid: string, triggerElement?: JQuery): void;
    function externalTarget(appname: string, objectPage: FlexygoHistory): void;
}
