/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
  * Library for the flx-editgrid web component.
  *
  * @class FlxEditGridElement
  * @constructor
  * @return {FlxEditGridElement} .
  */
    class FlxEditGridElement extends HTMLElement {
        /**
       * Set when component is attached to DOM
       * @property connected {boolean}
       */
        connected: boolean;
        tbName: string;
        schema: flexygo.api.mastertables.MasterTableFieldsCollection;
        canDelete: boolean;
        canInsert: boolean;
        canUpdate: boolean;
        canPrint: boolean;
        sortColumnId: number;
        sortAsc: boolean;
        filter: string;
        data: any;
        refreshing: number;
        constructor();
        /**
       * Fires when element is attached to DOM
       * @method connectedCallback
       */
        connectedCallback(): void;
        /**
       * Array of observed attributes.
       * @property observedAttributes {Array}
       */
        static readonly observedAttributes: any[];
        /**
      * Fires when the attribute value of the element is changed.
      * @method attributeChangedCallback
      */
        attributeChangedCallback(attrName: any, oldVal: any, newVal: any): void;
        /**
        * loads a table and table schema.
        * @method load
        * @param {string} tbName
        */
        load(tbName: string): void;
        /**
       * loads a table schema.
       * @method loadSchema
       */
        loadSchema(): void;
        /**
        * loads  table data.
        * @method loadData
        */
        loadData(): void;
        loadRet(rsp: any): void;
        /**
       * Selects all elements
       * @method selectAll
       * @param {Element} elm
       */
        selectAll(elm: Element): void;
        /**
        * Selects a node
        * @method selectNone
        * @param {Element} elm
        */
        selectNone(elm: Element): void;
        /**
        * Cancel edit mode
        * @method cancelEdit
        * @param {Element} elm
        */
        cancelEdit(elm: Element): void;
        /**
        * Clears insert row
        * @method clearInsert
        * @param {Element} elm
        */
        clearInsert(elm: Element): void;
        /**
        * Edits an element
        * @method edit
        * @param {Element} elm
        */
        edit(elm: Element): void;
        /**
      * Inserts an element
      * @method edit
      * @param {Element} elm
      */
        insert(elm: Element): void;
        /**
        * Updates an element
        * @method update
        * @param {Element} elm
        */
        update(elm: Element, hideMsg?: boolean): void;
        /**
        * Deletes an element
        * @method delete
        * @param {Element} elm
        * @param {boolean} confirmed
        */
        delete(elm: Element, confirmed?: boolean): void;
        /**
       * Put all elements in edit mode
       * @method editAll
       */
        editAll(): void;
        /**
        * remove all elements from edit mode
        * @method editAll
        */
        uneditAll(): void;
        /**
       * Save all elements
       * @method saveAll
       */
        saveAll(): void;
        /**
        * Delete all elements
        * @method deleteAll
        */
        deleteAll(elm: HTMLElement): void;
        /**
       * Refresh webcomponent
       * @method refresh
       */
        refresh(): void;
        /**
     * Starts control rendering.
     * @method render
     */
        render(): void;
        /**
        * Gets editline content as Jquery.
        * @method getEditLine
        * @return {JQuery}
        */
        getEditLine(): JQuery;
        /**
       * Gets data from a given row.
       * @method getRow
       * @param {flexygo.api.mastertables.MasterTablePropertyCollection} dataRow
       * @param {number} index
       * @param {boolean} returnAlways
       */
        getRow(dataRow: flexygo.api.mastertables.MasterTablePropertyCollection, index: number, returnAlways?: boolean): JQuery;
        /**
        * Gets a control definition.
        * @method getControl
        * @param  def
        * @param  val
        */
        getControl(def: any, val?: any): JQuery;
        /**
        * Gets a text control based on value and property.
        * @method getText
        * @param  value
        * @param  prop
        */
        getText(value: any, prop: any): JQuery;
        private refreshColMenu(tbl);
        /**
      * Sort based on column in asc or desc mode.
      * @method sort
      * @param  {Element} columnItem
      * @param  {boolean} ascMode
      */
        sort(columnItem: Element, ascMode?: boolean): void;
    }
}
