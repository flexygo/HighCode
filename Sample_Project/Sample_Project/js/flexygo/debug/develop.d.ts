/**
 * @namespace flexygo.debug
 */
declare namespace flexygo.debug {
    /**
    * Library with develop mode functions.
    *
    * @class flexygo.debug
    */
    /**
     * Toggle between develop and normal mode.
     * @method toggleDevelopMode
     * @param {bool} showAnimation - Sets if the animation must be shown.
     */
    function toggleDevelopMode(showAnimation: boolean): void;
    /**
     * enable or disable develop mode.
     * @method enableDevelopMode
     * @param {bool} enable - Sets enabled or disabled.
     * @param {bool} showAnimation - Sets if the animation must be shown.
     */
    function enableDevelopMode(enable: boolean, showAnimation: boolean): void;
    function showObject(mode: any): void;
    /**
     * Configure and returns sidebar config page panel.
     * @method getPagePanel
     * @return {object} - Page panel.
     */
    function getPagePanel(): JQuery;
    /**
     * Returns if develop mode is enabled.
     * @method isDevelopMode
     * @return {bool} - develop mode enabled
     */
    function isDevelopMode(): boolean;
    /**
     * Displays develop mode animation.
     * @method launchAnimation
     */
    function launchAnimation(): void;
    /**
     * Display a window with de dependency manager
     * @method manageDependencies
     * @param {string} ObjectName - The object name
     * @param {string} PropertyName - The property name.
     * @param {string} targetid - The new window target, default: modal1024x800.
     */
    function manageDependencies(ObjectName: string, PropertyName: string, targetid: string): void;
    /**
     * Display a window with de filter manager
     * @method manageFilters
     * @param {string} ObjectName - The object name
     * @param {string} targetid - The new window target, default: modal1024x800.
     * @param {boolean} generic - Specifies if the filter manager is for the main search
     * @param {any} parentModule - Specifies the module that launched managefilters
     */
    function manageFilters(ObjectName: string, targetid: string, generic: boolean, parentModule?: JQuery): void;
    /**
     * Display a window with de module manager of the current page.
     * @method manageModules
     * @param {object} targetItem - Item inside the page to configure.
     */
    function manageModules(targetItem: any): void;
    /**
     * Display a window with de node manager started with a specified node id.
     * @method manageNodes
     * @param {object} targetItem - Item inside the page to configure.
     * @param {string} NodeId - The initial node.
     */
    function manageNodes(targetItem: any, NodeId: any): void;
    /**
     * Private function that makes the develop animation.
     * @method _drawText
     * @param {object} itm - Panel to place text.
     * @param {string} txt - Texto for drawing.
     */
    function _drawText(itm: any, txt: any): void;
}
/**
* Library with diagnostics functions
*
* @class flexygo.debug.test
*/
declare namespace flexygo.debug.test {
    function show(): void;
    /**
     * Draw a window with testing options.
     * @method drawTest
     * @param {object} tests - List of test
     */
    function drawTest(tests: any): void;
    /**
     * Executes tests marked as "testPending" on the result panel.
     * @method executeTests
     * @param {HTMLItem} testPanel - HTML Panel to show test result
     */
    function executeTests(testPanel: JQuery): void;
    /**
     * Update test result on the result panel.
     * @method executeTestRes
     * @param {HTMLItem} testPanel - HTML Panel to show test result
     * @param {object} test - Test result.
     */
    function executeTestRes(testPanel: JQuery, test: JQuery): void;
}
