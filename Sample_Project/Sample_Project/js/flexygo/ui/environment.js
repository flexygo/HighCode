/**
 * @namespace flexygo.environment
 */
var flexygo;
(function (flexygo) {
    var environment;
    (function (environment) {
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
        function popupTemplate(objectName, ObjectWhere, templateId, itm, ev, placement) {
            itm = $(itm);
            if (!placement) {
                placement = 'bottom';
            }
            let eventName;
            let triggerEv;
            if (ev && ev.type) {
                eventName = ev.type;
                if (eventName.toLowerCase() == 'mouseover') {
                    triggerEv = 'hover';
                }
                else {
                    triggerEv = eventName;
                }
                itm.off(eventName).removeAttr('on' + eventName);
            }
            else {
                triggerEv = 'manual';
            }
            itm.popover({
                html: true,
                placement: placement,
                container: 'body',
                content: 'Loading...',
                title: '',
                trigger: triggerEv
            });
            itm.popover('show');
            var htmlContent = flexygo.environment.getTemplate(objectName, ObjectWhere, templateId);
            if (htmlContent == '') {
                itm.popover("destroy");
            }
            else {
                itm.data("bs.popover").options.content = htmlContent;
                itm.popover("show");
            }
        }
        environment.popupTemplate = popupTemplate;
        /**
        * Sets the value of a skin variable
        * @method setSkinVar
        * @param {string} name - Name of the variable
        * @param {string} value - Value of the variable
        * @param {string} skinId - Skin id
       */
        function setSkinVar(name, value, skinId) {
            value = value.replace('#', '');
            var params = new flexygo.api.sys.setSkinCacheVarsParams;
            params.VarValues = [{ key: name, value: value }];
            params.SkinId = skinId;
            flexygo.ajax.post('~/api/Sys', 'setSkinCacheVars', params, (response) => {
                if (response) {
                    flexygo.environment.refreshCss();
                }
            });
        }
        environment.setSkinVar = setSkinVar;
        /**
        * Stores the values of the skin variables into database
        * @param {string} skinId - Id of the skin
        * @method saveSkinVars
       */
        function saveSkinVars(skinId) {
            var params = {
                "SkinId": skinId
            };
            flexygo.ajax.post('~/api/Sys', 'saveSkinCacheVars', params, (response) => {
                if (response) {
                    flexygo.msg.success("Variables saved to Database");
                }
                else {
                    flexygo.msg.error("Could not save variables to Database");
                }
            });
        }
        environment.saveSkinVars = saveSkinVars;
        /**
        * Resets the values of the skin variables into database
        * @method resetSkinVars
       */
        function resetSkinVars() {
            flexygo.ajax.post('~/api/Sys', 'resetSkinCacheVars', null, (response) => {
                if (response) {
                    flexygo.environment.refreshCss();
                    flexygo.msg.success("Cache reseted");
                }
            });
        }
        environment.resetSkinVars = resetSkinVars;
        /**
        * Refreshses the css files of the application
        * @method resetSkinVars
       */
        function refreshCss() {
            let queryString = '?reload=' + new Date().getTime();
            $('link[rel="stylesheet"]').each((i, e) => {
                if (e.href.toLowerCase().indexOf('.less') != -1 || e.href.toLowerCase().indexOf('/bnd/css') != -1 || e.href.toLowerCase().indexOf('/bnd/plugins/css') != -1) {
                    e.href = e.href.replace(/\?.*|$/, queryString);
                }
            });
        }
        environment.refreshCss = refreshCss;
        /**
        * Returns a parsed HTML template for a given object and template type
        * @method getTemplateType
       * @param {string} objectName - Name of the object
       * @param {string} ObjectWhere - Object identifier
       * @param {string} templateType - Type of the template
       */
        function getTemplateType(objectName, ObjectWhere, templateType) {
            let ent = new flexygo.obj.Entity(objectName, ObjectWhere);
            //TODO_TS: Tipar el template
            let tmpObj = ent.getTemplateByType(templateType);
            let htmlContent = flexygo.utils.parser.compileTemplate(tmpObj.Template, tmpObj.TemplateData, document);
            return htmlContent;
        }
        environment.getTemplateType = getTemplateType;
        /**
        * Returns a parsed HTML template for a given object and template
        * @method getTemplate
        * @param {string} objectName - Name of the object
        * @param {string} ObjectWhere - Object identifier
        * @param {string} templateId - Template identifier
        * @param {string} defaultString - Default string
       */
        function getTemplate(objectName, ObjectWhere, templateId, defaultString, filter) {
            let ent = new flexygo.obj.Entity(objectName, ObjectWhere);
            //TODO_TS:Tipar el template
            let tmpObj = ent.getTemplateById(templateId, null, filter);
            let context;
            context = flexygo.environment;
            context.flexygo = flexygo;
            tmpObj.Template.defaults = new Object();
            if (defaultString && defaultString != '') {
                var def = defaultString.split('|');
                for (var i = 0; i < def.length; i++) {
                    var prop = def[i].split('=');
                    tmpObj.Template.defaults[prop[0]] = prop[1];
                }
                tmpObj.Template.defaults._objectdefaults = JSON.stringify(tmpObj.Template.defaults);
            }
            tmpObj.Template.defaults._ObjectName = objectName;
            tmpObj.Template.defaults._ObjectWhere = ObjectWhere;
            var htmlContent = flexygo.utils.parser.compileTemplate(tmpObj.Template, tmpObj.TemplateData, context);
            return htmlContent;
        }
        environment.getTemplate = getTemplate;
        /**
        * Returns a parsed HTML template for a button
        * @method _getTemplateButton
        * @param {string} json - Data objectName of the object
        * @param {string} typeid - Button type
        * @param {string} IconClass - Button icon class
        * @param {string} Text - Button text
        * @param {string} TargetId - Button targetid
       */
        function _getTemplateButton(json, typeId, IconClass, Text, TargetId, buttonId) {
            let btn = new flexygo.api.ToolbarButton();
            btn.TypeId = typeId;
            btn.IconClass = IconClass;
            btn.Text = Text;
            btn.TargetId = TargetId;
            if (!flexygo.utils.isBlank(buttonId) && typeId.toLowerCase() == "process") {
                btn.ButtonId = buttonId;
                try {
                    let toolbarButton = new flexygo.obj.Entity("sysButton", `ButtonId='${buttonId}'`);
                    toolbarButton.read();
                    btn.ProcessName = toolbarButton.data["ProcessName"].Text;
                    btn.ToolTip = toolbarButton.data["Text"].Text;
                }
                catch (e) {
                    console.log(e.Message);
                }
            }
            //var jBtn = flexygo.ui.wc.flxmodule()._getButton(btn, json._objectname, json._objectwhere, json._objectdefaults);
            var jBtn = flexygo.ui.wc.FlxModuleElement.prototype.getButton(btn, json._objectname, json._objectwhere, json._objectdefaults);
            return $('<div>').append(jBtn).html();
        }
        environment._getTemplateButton = _getTemplateButton;
        /**
         * This function adjusts the visibility of a button based on the presence or absence of a license.
         * @method _setButtonVisibilityByLicense
         * @param {string} buttonId - The unique identifier of the button.
         * @param {string} modulelicense - The name of the module license.
         * @param {any} context - Whether the function is called within a template (json) or during an edit (ObjectName).
         * @param {boolean} inTemplate - A boolean value specifying whether the button is within a template
        */
        function _setButtonVisibilityByLicense(buttonId, modulelicense, context, inTemplate) {
            if (inTemplate) {
                for (let licence of flexygo.context.modules) {
                    if (licence.toLowerCase() == modulelicense) {
                        return _getTemplateButton(context, 'Process', 'flx-icon icon-design', '', 'current', buttonId);
                    }
                }
                return '&#160;';
            }
            else {
                try {
                    let button = new flexygo.obj.Entity('sysButton', `ToolBars_Buttons.ButtonId='${buttonId}'`);
                    button.read();
                    let processName = button.data["ProcessName"].Value;
                    if (flexygo.context.modules.includes(modulelicense) && button.data["Disabled"].Value == true) {
                        button.data["Disabled"].Value = false;
                        button.update();
                    }
                    else if (button.data["Disabled"].Value == false && !flexygo.context.modules.includes(modulelicense)) {
                        button.data["Disabled"].Value = true;
                        button.update();
                    }
                    let logicMenu = new flexygo.obj.Entity('sysObjectProcess', `Objects_Processes.ObjectName='${context}' and Objects_Processes.ProcessName='${processName}'`);
                    logicMenu.read();
                    if (flexygo.context.modules.includes(modulelicense) && logicMenu.data["Active"].Value == false) {
                        logicMenu.data["Active"].Value = true;
                        logicMenu.update();
                    }
                    else if (logicMenu.data["Active"].Value == true && !flexygo.context.modules.includes(modulelicense)) {
                        logicMenu.data["Active"].Value = false;
                        logicMenu.update();
                    }
                }
                catch (ex) {
                    return;
                }
            }
        }
        environment._setButtonVisibilityByLicense = _setButtonVisibilityByLicense;
    })(environment = flexygo.environment || (flexygo.environment = {}));
})(flexygo || (flexygo = {}));
//# sourceMappingURL=environment.js.map