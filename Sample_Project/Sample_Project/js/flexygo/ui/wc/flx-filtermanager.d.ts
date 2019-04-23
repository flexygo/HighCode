/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
  * Library for the flx-filterManagerElement web component.
  *
  * @class FlxFilterManagerElement
  * @constructor
  * @return {FlxFilterManagerElement} .
  */
    class FlxFilterManagerElement extends HTMLElement {
        tree: JQuery;
        objcmb: JQuery;
        cmb: JQuery;
        typecmb: JQuery;
        fields: JQuery;
        choosebar: JQuery;
        generic: boolean;
        parentModule: any;
        objectname: string;
        allSaved: boolean;
        newValue: number;
        value: string;
        type: string;
        filtertypes: Array<flexygo.api.ObjectSearchType>;
        types: Array<flexygo.api.ObjectSearchPropertyType>;
        active: string;
        genericFilter: flexygo.api.SearchSettings;
        constructor();
        /**
        * Fires when element is attached to DOM
        * @method connectedCallback
        */
        connectedCallback(): void;
        /**
        * Init the webcomponent.
        * @method init
        */
        init(): void;
        resto: number;
        /**
        * Refresh de webcomponent.
        * @method refresh
        */
        refresh(): void;
        /**
       * Gets filters from controller
       * @method getFilters
       */
        getFilters(): void;
        /**
        * Add a new filter
        * @method newFilter
        */
        newFilter(): void;
        /**
        * Apply new created filter
        * @method applyNewFilter
        * @param {string} name - The filter name.
        */
        applyNewFilter(name: string): void;
        /**
        * Delete the filter
        * @method deleteFilter
        */
        deleteFilter(): void;
        /**
       * Edit a filter
       * @method editFilter
       */
        editFilter(): void;
        /**
        * Save a filter
        * @method saveFilter
        */
        saveFilter(): void;
        /**
        * Loads a filter
        * @method loadFilter
        * @param {flexygo.api.SearchSettings} filter - The filter search settings.
        */
        loadFilter(filter: flexygo.api.SearchSettings): void;
        /**
       * Loads an object
       * @method loadObj
       * @param {string} objectName - The object name.
       * @param {JQuery} elem - The filter manager layout.
       * @param {boolean} first - first time I entered.
       */
        loadObj(objectName: string, elem: JQuery, first: boolean): void;
        /**
        * Append fields
        * @method appendFields
        */
        appendFields(): void;
        private createField(fld);
        private findPath(obj);
    }
}
