/**
 * @namespace flexygo.environment
 */
declare namespace flexygo.environment {
    /**
     * Opens a popup over an element with a defined object view
     * @method popupTemplate
     * @param {string} objectName - Object Name
     * @param {string} ObjectWhere - Object Where
     * @param {string} templateId - Template identifier
     * @param {JQuery} itm - Item to show the popup over
     * @param {Event} event - Event triggered
     * @param {string} placement - Placement of the popup
    */
    function popupTemplate(objectName: string, ObjectWhere: string, templateId: string, itm: JQuery, ev: Event, placement: string): void;
    /**
    * Sets the value of a skin variable
    * @method setSkinVar
    * @param {string} name - Name of the variable
    * @param {string} value - Value of the variable
    * @param {string} skinId - Skin id
   */
    function setSkinVar(name: string, value: string, skinId?: string): void;
    /**
    * Stores the values of the skin variables into database
    * @param {string} skinId - Id of the skin
    * @method saveSkinVars
   */
    function saveSkinVars(skinId?: string): void;
    /**
    * Resets the values of the skin variables into database
    * @method resetSkinVars
   */
    function resetSkinVars(): void;
    /**
    * Refreshses the css files of the application
    * @method resetSkinVars
   */
    function refreshCss(): void;
    /**
    * Returns a parsed HTML template for a given object and template type
    * @method getTemplateType
   * @param {string} objectName - Name of the object
   * @param {string} ObjectWhere - Object identifier
   * @param {string} templateType - Type of the template
   */
    function getTemplateType(objectName: string, ObjectWhere: string, templateType: string): string;
    /**
    * Returns a parsed HTML template for a given object and template
    * @method getTemplate
    * @param {string} objectName - Name of the object
    * @param {string} ObjectWhere - Object identifier
    * @param {string} templateId - Template identifier
    * @param {string} defaultString - Default string
   */
    function getTemplate(objectName: string, ObjectWhere: string, templateId: string, defaultString?: string, filter?: string): string;
    /**
    * Returns a parsed HTML template for a button
    * @method _getTemplateButton
    * @param {string} json - Data objectName of the object
    * @param {string} typeid - Button type
    * @param {string} IconClass - Button icon class
    * @param {string} Text - Button text
    * @param {string} TargetId - Button targetid
   */
    function _getTemplateButton(json: any, typeId: string, IconClass: string, Text: string, TargetId: string, buttonId?: string): string;
    /**
     * This function adjusts the visibility of a button based on the presence or absence of a license.
     * @method _setButtonVisibilityByLicense
     * @param {string} buttonId - The unique identifier of the button.
     * @param {string} modulelicense - The name of the module license.
     * @param {any} context - Whether the function is called within a template (json) or during an edit (ObjectName).
     * @param {boolean} inTemplate - A boolean value specifying whether the button is within a template
    */
    function _setButtonVisibilityByLicense(buttonId: string, modulelicense: string, context: any, inTemplate: boolean): any;
}
