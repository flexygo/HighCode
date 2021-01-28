/// <reference path="../../../Scripts/typings/jqueryui/jqueryui.d.ts" />
declare namespace flexygo.targets {
    /**
     * Opens a page in a new window
     * @method openNewWindow
     * @param {flexygo.nav.FlexygoHistory} objectPage - Page information
     * @param {string} target - additional target info
    */
    function openNewWindow(objectPage: flexygo.nav.FlexygoHistory, target: string): void;
    /**
    * Opens a page in a new window
    * @method openNewWindow
    * @param {flexygo.nav.FlexygoHistory} objectPage - Page information
    * @param {string} target - additional target info
   */
    function openExternalNewWindow(url: string, authToken: string, objectPage: flexygo.nav.FlexygoHistory): void;
    /**
     * Creates a pgae container
     * @method createContainer
     * @param {flexygo.nav.FlexygoHistory} histObj - Page information
     * @param {boolean} excludeHist - True to not save page in window history
     * @param {JQuery} triggerElement - Relative element to create the container
     * @param {boolean} excludeMainframeBtn - True to not create button frame
     * @param {JQueryUI.DialogButtonOptions[]} buttons - additional buttons to add to the container
   */
    function createContainer(histObj: flexygo.nav.FlexygoHistory, excludeHist: boolean, triggerElement: JQuery, excludeMainframeBtn?: boolean, buttons?: JQueryUI.DialogButtonOptions[]): JQuery;
}
