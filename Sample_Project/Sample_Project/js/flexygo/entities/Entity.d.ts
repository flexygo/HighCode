/**
 * @namespace flexygo.obj
 */
declare namespace flexygo.obj {
    /**
    * Library to access entity objects and collections from JS.
    *
    * @class Entity
    * @constructor
    * @param {string} objectName - The object name.
    * @param {string} [objectWhere] - Where condition (only if object isn't new).
    * @return {object} - Entity object.
    */
    class Entity {
        constructor(objectName: string, objectWhere?: string);
        objectName: string;
        objectWhere: string;
        data: flexygo.api.BasicPropertyCollection;
        warningMessage: string;
        jsCode: string;
        /**
        * Init entity and recive the values.
        * @method read
        * @return {boolean} - Success or fail.
       */
        read(): boolean;
        /**
         * Save a new item in the database.
         * @method insert
         * @return {boolean} - Success or fail.
        */
        insert(): boolean;
        /**
         * Save changes in the database.
         * @method update
         * @return {boolean} - Success or fail.
        */
        update(): boolean;
        /**
         * Delete current object.
         * @method delete
         * @return {boolean} - Success or fail.
        */
        delete(): boolean;
        /**
         * Get the processes related to current object.
         * @method processes
        * @param {string} options - leave empty for all processes. reports for only reports, processes for only processes and relations only for relations
         * @return {flexygo.api.entity.GetProcessesResponse} - Related processes
        */
        processes(options?: string): flexygo.api.entity.GetProcessesResponse;
        /**
        * Get the system configuration related to current object.
        * @method getConfig
        * @return {object} - System configuration
        */
        getConfig(): flexygo.api.entity.ObjBasicConfig;
        /**
        * Get the system configuration related to current object.
        * @method getView
        * @param {string} viewName - Desired view name.
        * @param {number} [page=0] - Page number.
        * @param {number} [pageSize=5000] - Number of page elements.
        * @param {string} [filter] - Additional sql where.
        * @param {string} [orderBy] - Order by condition.
        * @param {function} [cllback] - function to get the results, if null, get view will be syncronous and results will be returned on return param.
        * @return {object[]} - if no cllback param, results object
        */
        getView(viewName?: string, page?: number, pageSize?: number, filter?: string, orderBy?: string, cllback?: any, withDescrips?: boolean): object[];
        /**
        * Get number of rows.
        * @method getViewCount
        * @param {string} viewName - Desired view name.
        * @param {string} [filter] - Additional sql where.
        * @param {string} [orderBy] - Order by condition.
        * @param {function} [cllback] - function to get the results, if null, get view will be syncronous and results will be returned on return param.
        * @return {number} - if no cllback param, results object
        */
        getViewCount(viewName: string, filter?: string, cllback?: any): number;
        /**
        * Get view columns names.
        * @method getViewColumnsNames
        * @param {string} viewName - Desired view name.
        * @param {function} [cllback] - function to get the results, if null, get view will be syncronous and results will be returned on return param.
        * @return {object[]} - results object
        */
        getViewColumnsNames(viewName: string, cllback?: any): object[];
        /**
       * Get object template by type
       * @method getTemplateByType
       * @param {string} templateType - Desired template type.
       * @param {function} [cllback] - function to get the results, if null, get view will be syncronous and results will be returned on return param.
       * @return {flexygo.api.Template} - if no cllback param, results object
       */
        getTemplateByType(templateType: string, cllback?: any): flexygo.api.Template;
        /**
        * Get object template by id
        * @method getTemplateByType
        * @param {string} getTemplateById - Desired template id.
        * @param {function} [cllback] - function to get the results, if null, get view will be syncronous and results will be returned on return param.
        * @param {string} [filter] - Additional where to filter the template.
        * @return {flexygo.api.Template} - if no cllback param, results object
        */
        getTemplateById(templateId: string, cllback?: any, filter?: any): flexygo.api.Template;
        /**
        * Converts Data properties in KeyValuePair array.
        * @method toValuesArray
        * @return {string[]} - Data array
        */
        toValuesArray(): string[];
    }
}
