declare namespace flexygo.nav {
    class FilterHistoryValue {
        activeFilter: string;
        activePage: number;
        properties: flexygo.ui.wc.FlxFilterInfo[];
    }
    class ModuleFilterHistory {
        [moduleName: string]: FilterHistoryValue;
    }
    class FlexygoHistory {
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
    function openPage(pagetypeid: string, objectname: string, objectwhere: string, defaults: any, targetid: string, excludeHist?: boolean, triggerElement?: JQuery, isClone?: boolean, previousHist?: flexygo.nav.FlexygoHistory): void;
    /**
    * Navigate to default page
    * @method goHome
    * @param {boolean} [excludeHist=false] - True to not store in history
     */
    function goHome(excludeHist?: boolean): void;
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
    function openPageName(pagename: string, objectname: string, objectwhere: string, defaults: string, targetid: string, excludeHist: boolean, triggerElement?: JQuery, isClone?: boolean, previousHist?: flexygo.nav.FlexygoHistory): void;
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
    function execProcess(processname: string, objectname: string, objectwhere: string, defaults: any, processparams: any, targetid: string, excludeHist: boolean, triggerElement: JQuery, callBack?: any, showProgress?: boolean): void;
    function openPageReturn(pageConf: flexygo.api.pages.Page, objectname: string, objectwhere: string, defaults: any, pageContainer: JQuery, reportname: string, processname?: string, isClone?: boolean, reportwhere?: string): void;
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
    function openProcessParams(processname: string, objectname: string, objectwhere: string, defaults: any, targetid: string, excludeHist: boolean, triggerElement?: JQuery): void;
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
    function openProcessParamsPage(pagename: string, processname: string, objectname: string, objectwhere: string, defaults: any, targetid: string, excludeHist: boolean, triggerElement?: JQuery): void;
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
    function openReportsParams(reportname: string, reportwhere: string, objectname: string, objectwhere: string, defaults: any, targetid: string, excludeHist: boolean, triggerElement?: JQuery): void;
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
    function openReportsParamsPage(pagename: string, reportname: string, reportwhere: string, objectname: string, objectwhere: string, defaults: any, targetid: string, excludeHist: boolean, triggerElement?: JQuery): void;
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
    function viewReport(reportname: string, reportwhere: string, objectname: string, objectwhere: string, defaults: any, params: any, targetid: string, excludeHist: boolean): void;
    /**
     * Opens an URL
     * @method openURL
     * @param {string} url - URL identifier
     * @param {string} params - parameters to add to the URL
     * @param {string} targetid - Target to open the window
    */
    function openURL(url: string, params: string, targetid?: string): Window;
    /**
    * Opens an edit table Page
    * @method openEditTable
    * @param {string} tablename - Name of the table
    * @param {string} targetid - Target to open the window
    * @param {string} tabledescrip - Description of the table
    * @param {boolean} excludeHist - True to not store in history
    * @param {JQuery} triggerElement - Relative element to open the page
   */
    function openEditTable(tablename: string, targetid: string, tabledescrip: string, excludeHist: boolean, triggerElement?: JQuery): void;
    /**
    * Opens a help page
    * @method openHelpId
    * @param {string} helpid - Identifier of the help page
    * @param {string} targetid - Target to open the window
    * @param {boolean} excludeHist - True to not store in history
    * @param {JQuery} triggerElement - Relative element to open the page
   */
    function openHelpId(helpid: string, targetid?: string, excludeHist?: boolean, triggerElement?: JQuery): void;
    /**
   * Gets help content
   * @method GetHelpContent
   * @param {string} helpid - Identifier of the help page
   * @returns {string} - Help content
  */
    function getHelpContent(helpid: string): string;
    /**
 * Attaches Object Menu to button
 * @method getObjectMenu
 * @param {string} objectname - objectName
 * @param {string} objectwhere - object where
 * @param {string} defaults - object defaults
 * @param {string} btn - button
*/
    function getObjectMenu(objectname: string, objectwhere: string, defaults: string, btn: JQuery, coord?: JQueryCoordinates, options?: string): void;
    function getRealTarget(elm: JQuery): JQuery;
    function getCurrentOpener(triggerElement: JQuery): string;
    /**
     * Close flexygo popup or modal page
     * @method closePage
     * @param {JQuery} elm - Element inside page to close
    */
    function closePage(elm: JQuery): void;
    /**
     * Close all flexygo popup or modal page
     * @method closeAllPages
    */
    function closeAllPages(): void;
    function toggleMobileMenu(): void;
    function toggleMobileNav(): void;
    function toggleNavBar(): void;
    function hideNavBar(): void;
    function toggleFlxnav(menuNav: JQuery): void;
}
