/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    function loadSavedSearches(objectname: string, module: JQuery, btn: JQuery): void;
    function loadFilter(objectname: string, module: JQuery, btn: JQuery): void;
    function loadPresets(objectname: string, module: JQuery, btn: JQuery): void;
    type FlxFilterType = "text" | "filter";
    /**
   * Class for the FlxFilterInfo .
   *
   * @class FlxFilterInfo
   * @constructor
   * @return {FlxFilterInfo}
   */
    class FlxFilterInfo {
        objectname: string;
        objectproperty: string;
        objectpath: string;
        value: string;
        text: string;
        filtertype: FlxFilterType;
    }
    /**
* Class for the FlxFilterElement .
*
* @class FlxFilterElement
* @constructor
* @return {FlxFilterElement}
*/
    class FlxFilterElement extends HTMLElement {
        key: string;
        active: string;
        settings: any;
        properties: {
            [key: string]: flexygo.api.ObjectProperty;
        };
        grid: any;
        constructor();
        /**
       * Initializes component.
       * @method init
       */
        init(): void;
        /**
       * Refresh to rerender filter.
       * @method refresh
       */
        refresh(): void;
        /**
      * Render filter.
      * @method renderFilter
      */
        renderFilter(active: string, filterValues?: FlxFilterInfo[]): void;
        private saveActiveFilter(active);
        private setProperties(props);
        /**
       * Pushes filter values into filter object.
       * @method getfilterValues
       */
        getfilterValues(): void;
        /**
        * Applies current filters.
        * @method applyFilters
        */
        applyFilters(): void;
        /**
       * Assignes current saved filter values to curren filter.
       * @method setSavedFilterValues
       * @param {string} Id - Filter id
       */
        setSavedFilterValues(Id: string): void;
        /**
     * Saves user search values to DB.
     * @method saveSearchValue
             */
        saveSearchValue(): void;
        /**
       * Parses edit string
       * @method parseEditString
       * @param {string} str
       * @return {string}
       */
        parseEditString(str: string): string;
        /**
   * Removes user search values from DB.
   * @method removeSearchValue
   * @param {string} id - Search Id
   */
        removeSearchValue(id: string): boolean;
        /**
       * Saves filter values to history.
       * @method saveFilterValueHistory
       * @param {string} active - active
       * @param { FlxFilterInfo[]} filtes - filter info
       */
        private saveFilterValueHistory(active, filters);
        /**
     * Clears filter values.
     * @method clearFilters
     * @param {boolean} norefresh - disable automatic refreshing
     */
        clearFilters(norefresh?: boolean): void;
    }
}
