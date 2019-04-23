declare namespace flexygo.ui.exports {
    /**
     * Create export list menu.
     * @function                       exportListMenu
    * @param {string} objectname  Object name.
    * @param {string} objectwhere  Object where.
    * @param {defaults} defaults  defaults
    * @param {JQuery} triggerElement  trigger element.
     * @returns                        This function return nothing.
     */
    function exportListMenu(objectname: string, objectwhere: string, defaults: string, triggerElement: JQuery): void;
    /**
     * Export all registers of flx-list respecting filters, order ...
     * @function                                           exportList
     * @param {string} format                              Format file.
     * @param {number} maxNumber                           Maximum number of registers.
     * @param {flexygo.ui.wc.FlxListElement} listToExport  flx-list to export.
     * @returns                                            This function return nothing.
     */
    function exportList(format: string, maxNumber: number, listToExport: flexygo.ui.wc.FlxListElement): void;
    /**
    * Generates print an report menu
    * @function                       printListMenu
    * @param {string} objectname  Object name.
    * @param {string} objectwhere  Object where.
    * @param {defaults} defaults  defaults
    * @param {JQuery} triggerElement  trigger element.
    * @returns                        This function return nothing.
    */
    function printListMenu(objectname: string, objectwhere: string, defaults: string, triggerElement: JQuery): void;
}
