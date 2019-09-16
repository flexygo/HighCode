/**
 * @namespace flexygo.obj
 */
var flexygo;
(function (flexygo) {
    var obj;
    (function (obj) {
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
            constructor(objectName, objectWhere) {
                this.objectName = objectName;
                this.objectWhere = objectWhere;
            }
            /**
            * Init entity and recive the values.
            * @method read
            * @return {boolean} - Success or fail.
           */
            read() {
                var ctx = this;
                var ret = false;
                var params = { ObjectName: null, ObjectWhere: null };
                params.ObjectName = ctx.objectName;
                params.ObjectWhere = ctx.objectWhere;
                flexygo.ajax.syncPost('~/api/Entity', 'Read', params, function (response) {
                    for (var key in response.Properties) {
                        if (response.Properties[key].Value != null && response.Properties[key].Value.toString().indexOf('/Date(') != -1) {
                            response.Properties[key].Value = moment.utc(response.Properties[key].Value).toDate();
                        }
                    }
                    ctx.data = response.Properties;
                    ret = true;
                });
                return ret;
            }
            /**
             * Save a new item in the database.
             * @method insert
             * @return {boolean} - Success or fail.
            */
            insert() {
                var ctx = this;
                var ret = false;
                var params = { ObjectName: null, Properties: null };
                params.ObjectName = ctx.objectName;
                params.Properties = flexygo.utils.dataToArray(ctx.data);
                flexygo.ajax.syncPost('~/api/Entity', 'Insert', params, function (response) {
                    ctx.data = response.Properties;
                    ctx.objectWhere = response.ObjectWhere;
                    ctx.objectName = response.ObjectName;
                    ctx.warningMessage = response.WarningMessage;
                    ctx.jsCode = response.JSCode;
                    let ev = {
                        class: "entity",
                        type: "inserted",
                        sender: ctx,
                        masterIdentity: ctx.objectName,
                        detailIdentity: ctx.objectWhere
                    };
                    flexygo.events.trigger(ev);
                    ret = true;
                });
                return ret;
            }
            /**
             * Save changes in the database.
             * @method update
             * @return {boolean} - Success or fail.
            */
            update() {
                var ctx = this;
                var ret = false;
                var params = { ObjectName: null, ObjectWhere: null, Properties: null };
                params.ObjectName = ctx.objectName;
                params.ObjectWhere = ctx.objectWhere;
                params.Properties = flexygo.utils.dataToArray(ctx.data);
                flexygo.ajax.syncPost('~/api/Entity', 'Update', params, function (response) {
                    ctx.data = response.Properties;
                    ctx.objectWhere = response.ObjectWhere;
                    ctx.objectName = response.ObjectName;
                    ctx.warningMessage = response.WarningMessage;
                    ctx.jsCode = response.JSCode;
                    let ev = {
                        class: "entity",
                        type: "updated",
                        sender: ctx,
                        masterIdentity: ctx.objectName,
                        detailIdentity: ctx.objectWhere
                    };
                    flexygo.events.trigger(ev);
                    ret = true;
                });
                return ret;
            }
            /**
             * Delete current object.
             * @method delete
             * @return {boolean} - Success or fail.
            */
            delete() {
                var ctx = this;
                var ret = false;
                var params = { ObjectName: null, ObjectWhere: null, Properties: null };
                params.ObjectName = ctx.objectName;
                params.ObjectWhere = ctx.objectWhere;
                flexygo.ajax.syncPost('~/api/Entity', 'Delete', params, function (response) {
                    ctx.warningMessage = response.WarningMessage;
                    ctx.jsCode = response.JSCode;
                    ret = true;
                    let ev = {
                        class: "entity",
                        type: "deleted",
                        sender: ctx,
                        masterIdentity: params.ObjectName,
                        detailIdentity: params.ObjectWhere
                    };
                    flexygo.events.trigger(ev);
                });
                return ret;
            }
            /**
             * Get the processes related to current object.
             * @method processes
            * @param {string} options - leave empty for all processes. reports for only reports, processes for only processes and relations only for relations
             * @return {flexygo.api.entity.GetProcessesResponse} - Related processes
            */
            processes(options) {
                var ctx = this;
                var ret = false;
                var params = { ObjectName: null, ObjectWhere: null, Options: null };
                let proc = null;
                params.ObjectName = ctx.objectName;
                params.ObjectWhere = ctx.objectWhere;
                params.Options = options;
                flexygo.ajax.syncPost('~/api/Entity', 'GetProcesses', params, function (response) {
                    proc = response;
                });
                return proc;
            }
            /**
            * Get the system configuration related to current object.
            * @method getConfig
            * @return {object} - System configuration
            */
            getConfig() {
                let params = {
                    ObjectName: null
                };
                params.ObjectName = this.objectName;
                let config = null;
                flexygo.ajax.syncPost('~/api/Entity', 'GetConfig', params, (response) => {
                    config = response;
                });
                return config;
            }
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
            getView(viewName, page, pageSize, filter, orderBy, cllback, withDescrips) {
                var ctx = this;
                var params = { ObjectName: null, ObjectWhere: null, ViewName: null, Page: null, PageSize: null, Filter: null, OrderBy: null, WithDescrips: false };
                params.ObjectName = ctx.objectName;
                params.ObjectWhere = ctx.objectWhere || null;
                params.ViewName = viewName || null;
                params.Page = page || null;
                params.PageSize = pageSize || null;
                params.Filter = filter || null;
                params.OrderBy = orderBy || null;
                params.WithDescrips = withDescrips || false;
                if (cllback) {
                    flexygo.ajax.post('~/api/Entity', 'GetView', params, function (response) {
                        cllback(response);
                    });
                    return null;
                }
                else {
                    var ret = null;
                    flexygo.ajax.syncPost('~/api/Entity', 'GetView', params, function (response) {
                        ret = response;
                    });
                    return ret;
                }
            }
            /**
            * Get number of rows.
            * @method getViewCount
            * @param {string} viewName - Desired view name.
            * @param {string} [filter] - Additional sql where.
            * @param {string} [orderBy] - Order by condition.
            * @param {function} [cllback] - function to get the results, if null, get view will be syncronous and results will be returned on return param.
            * @return {number} - if no cllback param, results object
            */
            getViewCount(viewName, filter, cllback) {
                var ctx = this;
                var params = { ObjectName: null, ObjectWhere: null, ViewName: null, Filter: null };
                params.ObjectName = ctx.objectName;
                params.ObjectWhere = ctx.objectWhere;
                params.ViewName = viewName;
                params.Filter = filter;
                if (cllback) {
                    flexygo.ajax.post('~/api/Entity', 'GetViewCount', params, function (response) {
                        cllback(response);
                    });
                }
                else {
                    var ret = null;
                    flexygo.ajax.syncPost('~/api/Entity', 'GetViewCount', params, function (response) {
                        ret = response;
                    });
                    return ret;
                }
            }
            /**
            * Get view columns names.
            * @method getViewColumnsNames
            * @param {string} viewName - Desired view name.
            * @param {function} [cllback] - function to get the results, if null, get view will be syncronous and results will be returned on return param.
            * @return {object[]} - results object
            */
            getViewColumnsNames(viewName, cllback) {
                let ctx = this;
                let params = { ObjectName: null, ViewName: null };
                params.ObjectName = ctx.objectName;
                params.ViewName = viewName;
                if (cllback) {
                    flexygo.ajax.post('~/api/Entity', 'GetViewColumnsNames', params, function (response) {
                        cllback(response);
                    });
                }
                else {
                    var ret = null;
                    flexygo.ajax.syncPost('~/api/Entity', 'GetViewColumnsNames', params, function (response) {
                        ret = response;
                    });
                    return ret;
                }
            }
            /**
           * Get object template by type
           * @method getTemplateByType
           * @param {string} templateType - Desired template type.
           * @param {function} [cllback] - function to get the results, if null, get view will be syncronous and results will be returned on return param.
           * @return {flexygo.api.Template} - if no cllback param, results object
           */
            getTemplateByType(templateType, cllback) {
                var ctx = this;
                var params = { ObjectName: null, ObjectWhere: null, TemplateType: null };
                params.ObjectName = ctx.objectName;
                params.ObjectWhere = ctx.objectWhere;
                params.TemplateType = templateType;
                if (cllback) {
                    flexygo.ajax.post('~/api/Entity', 'GetTemplateByType', params, function (response) {
                        cllback(response);
                    });
                }
                else {
                    var ret = null;
                    flexygo.ajax.syncPost('~/api/Entity', 'GetTemplateByType', params, function (response) {
                        ret = response;
                    });
                    return ret;
                }
            }
            /**
            * Get object template by id
            * @method getTemplateByType
            * @param {string} getTemplateById - Desired template id.
            * @param {function} [cllback] - function to get the results, if null, get view will be syncronous and results will be returned on return param.
            * @param {string} [filter] - Additional where to filter the template.
            * @return {flexygo.api.Template} - if no cllback param, results object
            */
            getTemplateById(templateId, cllback, filter) {
                var ctx = this;
                var params = { ObjectName: null, ObjectWhere: null, TemplateId: null, Filter: filter };
                params.ObjectName = ctx.objectName;
                params.ObjectWhere = ctx.objectWhere;
                params.TemplateId = templateId;
                if (cllback) {
                    flexygo.ajax.post('~/api/Entity', 'GetTemplateById', params, function (response) {
                        cllback(response);
                    });
                }
                else {
                    var ret = null;
                    flexygo.ajax.syncPost('~/api/Entity', 'GetTemplateById', params, function (response) {
                        ret = response;
                    });
                    return ret;
                }
            }
            /**
            * Converts Data properties in KeyValuePair array.
            * @method toValuesArray
            * @return {string[]} - Data array
            */
            toValuesArray() {
                var ctx = this;
                var ret = new Array();
                for (var key in ctx.data) {
                    ret[key] = ctx.data[key].Value;
                }
                return ret;
            }
        }
        obj.Entity = Entity;
    })(obj = flexygo.obj || (flexygo.obj = {}));
})(flexygo || (flexygo = {}));
//# sourceMappingURL=Entity.js.map