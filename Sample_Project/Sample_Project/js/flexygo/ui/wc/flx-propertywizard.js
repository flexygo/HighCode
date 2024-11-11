/**
 * @namespace flexygo.ui.wc
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var flexygo;
(function (flexygo) {
    var ui;
    (function (ui) {
        var wc;
        (function (wc) {
            /**
            * Library for the FlxPropertyManagerElement web component.
            *
            * @class FlxPropertyManagerElement
            * @constructor
            * @return {FlxPropertyManagerElement}
            */
            class FlxPropertyWizardElement extends HTMLElement {
                constructor() {
                    super();
                    this.objectName = null;
                    this.processName = null;
                    this.reportName = null;
                    this.propertyName = null;
                    this.manualInit = false;
                    this.propertyManager = null;
                    this.is_dirty = false;
                    this.loaded = false;
                    this.mainConfig = [];
                }
                connectedCallback() {
                    this.objectName = this.getAttribute("objectname");
                    this.processName = this.getAttribute("processname");
                    this.reportName = this.getAttribute("reportname");
                    this.propertyName = this.getAttribute("propertyName");
                    this.propertyManager = this.closest('flx-objectmanager, main').querySelector('flx-propertymanager');
                    this.init();
                }
                attributeChangedCallback(attrName, _, newVal) {
                    return __awaiter(this, void 0, void 0, function* () {
                        let is_sure;
                        switch (attrName.toLowerCase()) {
                            case 'objectname':
                                if (this.objectName === newVal)
                                    return;
                                is_sure = yield this.checkIfSure(attrName, this.objectName);
                                if (!is_sure)
                                    return;
                                this.objectName = newVal;
                                this.refresh();
                                break;
                            case 'propertyname':
                                if (this.propertyName === newVal)
                                    return;
                                is_sure = yield this.checkIfSure(attrName, this.propertyName);
                                if (!is_sure)
                                    return;
                                this.propertyName = newVal;
                                this.refresh();
                                break;
                        }
                    });
                }
                //We here check if the form is dirty, in which case we ask the user if he wants to continue with the property being changed
                checkIfSure(attribute_name, current_value) {
                    return __awaiter(this, void 0, void 0, function* () {
                        let is_sure = true;
                        if (this.is_dirty) {
                            const is_sure_message = flexygo.localization.translate('flxpropertymanager.areYouSure').replace('@', this.propertyName);
                            is_sure = (yield flexygo.msg.confirm(is_sure_message)) ? true : false; //If the user closes the popup we understand is like saying no
                            if (!is_sure) {
                                this.setAttribute(attribute_name, current_value);
                                //We return the activeProperty class to the indicated property
                                this.propertyManager.querySelector(`.activeProperty`).classList.remove('activeProperty');
                                this.propertyManager.querySelector(`[property="${this.propertyName}"]`).closest('.grid-stack-item-content.ui-draggable-handle').classList.add('activeProperty');
                            }
                            else {
                                this.is_dirty = false;
                            }
                        }
                        return is_sure;
                    });
                }
                refresh() {
                    if (this.manualInit || !this.loaded) {
                        return;
                    }
                    //If it's refreshed and it does not get a property name we just show the empty text
                    if (!this.propertyName || !(this.objectName || this.processName || this.reportName)) {
                        this.querySelector('.emptyWizard').classList.remove('hidden');
                        this.querySelector('form').classList.add('hidden');
                        return;
                    }
                    //If it's refreshed and it contains the needed information we'll get it from the propertymanager
                    this.querySelector('.emptyWizard').classList.add('hidden');
                    this.querySelector('form').classList.remove('hidden');
                    //We set the inputs values
                    this.setBasicSettings();
                    //With the values already set we trigger dependencies so the only visible inputs are the needed ones
                    this.triggerDependencies();
                }
                setBasicSettings() {
                    const property_data = this.propertyManager.properties[this.propertyName];
                    const quick_settings = this.querySelectorAll('form > div [property]');
                    quick_settings.forEach((setting) => {
                        let property_name = setting.getAttribute('property');
                        try {
                            setting.setValue(property_data[property_name]);
                        }
                        catch (_a) { }
                    });
                    const control_settings = this.querySelectorAll('form > .controlSettings [property]');
                    this.setControlSettings(control_settings, property_data);
                }
                setControlSettings(control_settings, property_data) {
                    if (property_data.CustomPropName) {
                        this.querySelector('[property="TypeId"]').setValue('custom');
                        this.querySelector('[property="CustomPropName"]').setValue(property_data.CustomPropName);
                        return;
                    }
                    control_settings.forEach((setting) => {
                        let property_name = setting.getAttribute('property');
                        if (property_name === 'TypeId')
                            property_name = 'ControlType';
                        if (property_name === 'SQLSentence')
                            property_name = '_SQlSentence';
                        try {
                            setting.setValue(property_data[property_name]);
                        }
                        catch (_a) { }
                    });
                }
                init() {
                    return __awaiter(this, void 0, void 0, function* () {
                        this.style.height = '715px';
                        this.style.top = '80px';
                        this.innerHTML = `<div class="cntBody">
                <div class="emptyWizard txt-outstanding flex-column align-vertical-center flex-center text-center">
                    <span>` + flexygo.localization.translate('flxpropertymanager.quickStart')
                            + `</span>
                    <i class="flx-icon icon-arrow-3 icon-rotate-180"></i>
                </div>
                <form class="hidden">
                    <div class="col-12">
                        <legend><i class="fa fa-flash"></i>` + flexygo.localization.translate('flxpropertymanager.quickSettings')
                            + `</legend>
                    </div>

                    <div class="col-12">
                        <div class="col-6">
                            <label data-tag="label" class="required" lblproperty="Label" lbloriginal="Label" aria-required="true">
                                <span class="lbltext">` + flexygo.localization.translate('flxpropertymanager.label') + `</span>:<span class="help-icon" data-original-title="" title="">
                                    <i></i>
                                    <flx-tooltip mode="popover" container="body" helpid="sys-sysObjectProperty"></flx-tooltip>
                                </span>
                            </label>
                            <div data-tag="control">
                                <flx-text type="text" property="Label"></flx-text>
                            </div>
                        </div>
                        <div class="col-6">
                            <label data-tag="label" lblproperty="DefaultValue" lbloriginal="Default Value">
                                <span class="lbltext">` + flexygo.localization.translate('flxpropertymanager.default') + `</span>:
                                <span class="help-icon" data-original-title="" title=""><i></i>
                                    <flx-tooltip mode="popover" container="body" helpid="sys-sysObjectsProperties-defaultvalue"></flx-tooltip>
                                </span>
                            </label>
                            <div data-tag="control">
                                <flx-text type="text" property="DefaultValue"></flx-text>
                            </div>
                        </div>
                        <div class="col-6">
                            <label data-tag="label" lblproperty="CSSClass" lbloriginal="CSS Class">
                                <span class="lbltext">` + flexygo.localization.translate('flxpropertymanager.css') + `</span>:
                                <span class="help-icon" data-original-title="" title="">
                                    <i></i>
                                    <flx-tooltip mode="popover" container="body" helpid="sys-sysObjectProperty-cssclassstyle"></flx-tooltip>
                                </span>
                            </label>
                            <div data-tag="control">
                                <flx-text type="text" property="CssClass"></flx-text>
                            </div>
                        </div>
                        <div class="col-6">
                            <label data-tag="label" lblproperty="IconName" lbloriginal="Icon">
                                <span class="lbltext">` + flexygo.localization.translate('flxpropertymanager.icon') + `</span>:
                                <span class="help-icon" data-original-title="" title="">
                                    <i></i>
                                    <flx-tooltip mode="popover" container="body" helpid="sys-sysObject-Icons"></flx-tooltip>
                                </span>
                            </label>
                            <div data-tag="control">
                                <flx-dbcombo class="item-float" property="IconName" objectname="sysObject" viewname="iconsView" sqlvaluefield="IconName" sqldisplayfield="IconName"> 
                                        <template><i class=" txt-outstanding {{CSSClass}} icon-2x icon-margin" CSSClass="{{CSSClass}}" title="{{IconName}}" style="width: 20px"> </i></template>
                                </flx-dbcombo>
                            </div>
                        </div>
                    </div>

                    <div class="col-12">
                        <div class="col-4">
                            <label data-tag="label" class="required" lblproperty="Hide" lbloriginal="Hide" aria-required="true">
                                <span class="lbltext">` + flexygo.localization.translate('flxpropertymanager.hide') + `</span>:<span class="help-icon" data-original-title="" title="">
                                    <i></i>
                                    <flx-tooltip mode="popover" container="body" helpid="sys-sysObjectProperty-hide"></flx-tooltip>
                                </span>
                            </label>
                            <div data-tag="control">
                                <flx-switch property="Hide" value="false"></flx-switch>
                            </div>
                        </div>
                        <div class="col-4">
                            <label data-tag="label" class="required" lblproperty="IsRequired" lbloriginal="Is Required" aria-required="true">
                                <span class="lbltext">` + flexygo.localization.translate('flxpropertymanager.isrequired') + `</span>:
                                <span class="help-icon" data-original-title="" title="">
                                    <i></i>
                                    <flx-tooltip mode="popover" container="body" helpid="sys-sysObjectProperties-required"></flx-tooltip>
                                </span>
                            </label>
                            <div data-tag="control">
                                <flx-switch property="IsRequired" value="false"></flx-switch>
                            </div>
                        </div>
                        <div class="col-4">
                            <label data-tag="label" class="required" lblproperty="Locked" lbloriginal="Locked" aria-required="true">
                                <span class="lbltext">` + flexygo.localization.translate('flxpropertymanager.locked') + `</span>:
                                <span class="help-icon" data-original-title="" title="">
                                    <i></i>
                                    <flx-tooltip mode="popover" container="body" helpid="sys-sysObjectProperties-locked"></flx-tooltip>
                                </span>
                            </label>
                            <div data-tag="control">
                                <flx-switch property="Locked" value="false"></flx-switch>
                            </div>
                        </div>
                    </div>

                    <span class="controlSettings">
                        <div class="col-12">
                            <legend><i class="flx-icon icon-input-1"></i>` + flexygo.localization.translate('flxpropertymanager.settings') + `</legend>
                        </div>

                        <div class="col-12">
                            <div class="col-4">
                                <label data-tag="label" lblproperty="TypeId" lbloriginal="Type" aria-required="true">
                                    <span class="lbltext">` + flexygo.localization.translate('flxpropertymanager.type') + `</span>:
                                    <span class="help-icon" data-original-title="" title="">
                                        <i></i>
                                        <flx-tooltip mode="popover" container="body" helpid="sys-sysObjectProperty-type"></flx-tooltip>
                                    </span>
                                    <span class="status"></span>
                                </label>
                                <div data-tag="control">
                                    <flx-dbcombo required property="TypeId" ObjectName="sysObjectProperty" viewname="sysObjectPropertyTypes" sqlvaluefield="TypeId" sqldisplayfield="Descrip"></flx-dbcombo>
                                </div>
                            </div>
                            <div class="col-8 wizardControl depcustom">
                                <label data-tag="label" lblproperty="CustomPropName" lbloriginal="Inherit Settings">
                                    <span class="lbltext">` + flexygo.localization.translate('flxpropertymanager.customSettings') + `</span>:
                                    <span class="help-icon" data-original-title="" title="">
                                        <i></i>
                                        <flx-tooltip mode="popover" container="body" helpid="sys-sysObjectProperty-inheritsetting"></flx-tooltip>
                                    </span>
                                    <span class="status"></span>
                                </label>
                                <div data-tag="control">
                                    <flx-dbcombo required property="CustomPropName" ObjectName="sysObjectProperty" viewname="sysObjectsPropertiesTemplates" sqlvaluefield="CustomPropName" sqldisplayfield="Descrip" AllowNewObject="SysCustomProperty" ObjNameLink="SysCustomProperty" ObjWhereLink="CustomPropName='{{CustomPropName}}'" ObjModeLink="edit" TargetIdAllowNew="modal" TargetIdLink="popup"></flx-dbcombo>
                                </div>
                            </div>
                            <div class="col-4 wizardControl depcheck depcombo depdbcombo depmulticombo depcheck-multi depradio">
                                <label data-tag="SQLValueField" lblproperty="SQLValueField" lbloriginal="SQLValueField">
                                    <span class="lbltext">` + flexygo.localization.translate('flxpropertymanager.sqlValue') + `</span>:<span class="help-icon" data-original-title="" title="">
                                        <i></i>
                                        <flx-tooltip mode="popover" container="body" helpid="sys-sysCustomProperty-SQLValueField"></flx-tooltip>
                                    </span>
                                    <span class="status"></span>
                                </label>
                                <div data-tag="control">
                                    <flx-text required type="text" property="SQLValueField"></flx-text>
                                </div>
                            </div>
                            <div class="col-4 wizardControl depcheck depcombo depdbcombo depmulticombo depcheck-multi depradio">
                                <label data-tag="SQLDisplayField" lblproperty="SQLDisplayField" lbloriginal="SQLDisplayField">
                                    <span class="lbltext">` + flexygo.localization.translate('flxpropertymanager.sqlDisplay') + `</span>:<span class="help-icon" data-original-title="" title="">
                                        <i></i>
                                        <flx-tooltip mode="popover" container="body" helpid="sys-sysCustomProperty-DisplayField"></flx-tooltip>
                                    </span>
                                    <span class="status"></span>
                                </label>
                                <div data-tag="control">
                                    <flx-text required type="text" property="SQLDisplayField"></flx-text>
                                </div>
                            </div>
                            <div class="col-8 wizardControl depfilefile depfilebase64 depuploadbase64 depuploadfile depimagefile depimage">
                                <label data-tag="ExtensionId" lblproperty="ExtensionId" lbloriginal="Extension">
                                    <span class="lbltext">` + flexygo.localization.translate('flxpropertymanager.extension') + `</span>:<span class="help-icon" data-original-title="" title="">
                                        <i></i>
                                        <flx-tooltip mode="popover" container="body" helpid="sys-ExtensionProperty"></flx-tooltip>
                                    </span>
                                </label>
                                <div data-tag="control">
                                    <flx-dbcombo property="ExtensionId" ObjectName="sysObjectProperty" viewname="SysExtensions" sqlvaluefield="ExtensionId" sqldisplayfield="Descrip"></flx-dbcombo>
                                </div>
                            </div>
                            <div class="col-8 wizardControl depbarcode">
                                <label data-tag="BarcodeReaders" lblproperty="BarcodeReaders" lbloriginal="Barcode Readers">
                                    <span class="lbltext">` + flexygo.localization.translate('flxpropertymanager.barcode') + `</span>:<span class="help-icon" data-original-title="" title="">
                                        <i></i>
                                        <flx-tooltip mode="popover" container="body" helpid="23921b32-9979-456d-b388-68c876d4d053"></flx-tooltip>
                                    </span>
                                </label>
                                <div data-tag="control">
                                    <flx-multicombo property="BarcodeReaders" ObjectName="sysObjectProperty" viewname="sysBarcodeReaders" sqlvaluefield="ReaderId" sqldisplayfield="Descrip"></flx-multicombo>
                                </div>
                            </div>
                        </div>

                        <div class="col-12">
                            <div class="col-12 wizardControl depcheck depcombo depdbcombo depmulticombo depcheck-multi depradio">
                                <label data-tag="SQLSentence" lblproperty="SQLSentence" lbloriginal="SQLSentence">
                                    <span class="lbltext">` + flexygo.localization.translate('flxpropertymanager.sqlSentence') + `</span>:<span class="help-icon" data-original-title="" title="">
                                        <i></i>
                                        <flx-tooltip mode="popover" container="body" helpid="sys-sysCustomProperties-SQL"></flx-tooltip>
                                    </span>
                                    <span class="status"></span>
                                </label>
                                <div data-tag="control" style="height: 150px;">
                                    <flx-code required type="sql" property="SQLSentence" searchfunction="flexygo.ui.wc.FlxComboBuilderElement.prototype.openWizard(this);" ChatGPTSettingId="CodeHelper"></flx-code>
                                </div>
                            </div>
                        </div>

                        <div class="col-12">
                            <div class="col-8 wizardControl depcheck depcombo depdbcombo depmulticombo depcheck-multi depradio">
                                <label data-tag="ConnStringId" lblproperty="ConnStringId" lbloriginal="Connection String">
                                    <span class="lbltext">` + flexygo.localization.translate('flxpropertymanager.connectionString') + `</span>:
                                    <span class="help-icon" data-original-title="" title="">
                                        <i></i>
                                        <flx-tooltip mode="popover" container="body" helpid="sys-sysObject-connection"></flx-tooltip>
                                    </span>
                                    <span class="status"></span>
                                </label>
                                <div data-tag="control">
                                    <flx-dbcombo required property="ConnStringId" ObjectName="sysObjectProperty" viewname="sysConnectionStrings" sqlvaluefield="ConnStringId" sqldisplayfield="Descrip"></flx-dbcombo>
                                </div>
                            </div>
                        </div>

                        <div class="col-12">
                            <div class="col-4 wizardControl depimagefile depfilefile depuploadfile">
                                <label data-tag="RootPathType" lblproperty="RootPathType" lbloriginal="Root Path Type">
                                    <span class="lbltext">` + flexygo.localization.translate('flxpropertymanager.pathType') + `</span>:<span class="help-icon" data-original-title="" title="">
                                        <i></i>
                                        <flx-tooltip mode="popover" container="body" helpid="sys-sysObjectProperty-rootpathtype"></flx-tooltip>
                                    </span>
                                </label>
                                <div data-tag="control">
                                    <flx-dbcombo property="RootPathType" ObjectName="sysObjectProperty" viewname="sysRootPathTypes" sqlvaluefield="TypeId" sqldisplayfield="Description"></flx-dbcombo>
                                </div>
                            </div>
                            <div class="col-8 wizardControl depimagefile depjavacode depuploadfile depfilefile">
                                <label data-tag="RootPath" lblproperty="RootPath" lbloriginal="Root Path">
                                    <span class="lbltext">` + flexygo.localization.translate('flxpropertymanager.path') + `</span>:<span class="help-icon">
                                        <i></i>
                                        <flx-tooltip mode="popover" container="body" helpid="sys-sysObjectProperty-thepath"></flx-tooltip>
                                    </span>
                                </label>
                                <div data-tag="control">
                                    <flx-text type="text" property="RootPath"></flx-text>
                                </div>
                            </div>
                        </div>

                        <div class="col-12">
                            <div class="col-4 wizardControl depimagefile depimage">
                                <label data-tag="ImageCompressionType" lblproperty="ImageCompressionType" lbloriginal="Image Compression Type">
                                    <span class="lbltext">` + flexygo.localization.translate('flxpropertymanager.compression') + `</span>:<span class="help-icon" data-original-title="" title="">
                                        <i></i>
                                        <flx-tooltip mode="popover" container="body" helpid="8d842d0a-249b-443b-a80a-e9c240ff974e"></flx-tooltip>
                                    </span>
                                </label>
                                <div data-tag="control">
                                    <flx-dbcombo property="ImageCompressionType" ObjectName="sysObjectProperty" viewname="SysImageCompressionType" sqlvaluefield="TypeId" sqldisplayfield="Descrip"></flx-dbcombo>
                                </div>
                            </div>
                            <div class="col-4 wizardControl depimagefile depimage">
                                <label data-tag="ImageMaxWidth" lblproperty="Maximum Width" lbloriginal="Maximum Width">
                                    <span class="lbltext">` + flexygo.localization.translate('flxpropertymanager.width') + `</span>:<span class="help-icon">
                                        <i></i>
                                        <flx-tooltip mode="popover" container="body" helpid="3a053ff2-a7ae-4716-be80-b99b0623e99e"></flx-tooltip>
                                    </span>
                                </label>
                                <div data-tag="control">
                                    <flx-text type="text" property="ImageMaxWidth"></flx-text>
                                </div>
                            </div>
                            <div class="col-4 wizardControl depimagefile depimage">
                                <label data-tag="ImageMaxHeight" lblproperty="ImageMaxHeight" lbloriginal="Maximum Height">
                                    <span class="lbltext">` + flexygo.localization.translate('flxpropertymanager.height') + `</span>:<span class="help-icon">
                                        <i></i>
                                        <flx-tooltip mode="popover" container="body" helpid="dba9632c-a19d-4e73-9cb2-389e0a30b917"></flx-tooltip>
                                    </span>
                                </label>
                                <div data-tag="control">
                                    <flx-text type="text" property="ImageMaxHeight"></flx-text>
                                </div>
                            </div>
                        </div>

                        <div>
                            <span class="btn btn-default saveButton margin-top-m margin-left-m">
                                <i class="flx-icon icon-save-2" flx-fw=""></i>
                                <span>Save</span>
                            </span>
                        </div>
                    </span>
                </form>
            </div>`;
                        //Label IsRequired
                        const label_input = this.querySelector('[property="Label"]');
                        label_input.addEventListener('change', () => {
                            if (!label_input.getValue())
                                return;
                            this.quickSettingChange(label_input, 'Label');
                        });
                        //Default IsRequired
                        const default_input = this.querySelector('[property="DefaultValue"]');
                        default_input.addEventListener('change', () => {
                            this.quickSettingChange(default_input, 'DefaultValue');
                        });
                        //CSSClass IsRequired
                        const cssClass_input = this.querySelector('[property="CssClass"]');
                        cssClass_input.addEventListener('change', () => {
                            this.quickSettingChange(cssClass_input, 'CssClass');
                        });
                        //CSSClass IsRequired
                        const icon_input = $(this).find('[property="IconName"] div:not(.mobileinputdiv)');
                        icon_input.on('change', () => {
                            this.quickSettingChange(this.querySelector('[property="IconName"]'), 'IconName');
                        });
                        //OnChange Hide
                        const hide_check = this.querySelector('[property="Hide"]');
                        hide_check.addEventListener('change', () => {
                            this.quickSettingChange(hide_check, 'Hide', 'hideControl');
                        });
                        //OnChange IsRequired
                        const isRequired_check = this.querySelector('[property="IsRequired"]');
                        isRequired_check.addEventListener('change', () => {
                            this.quickSettingChange(isRequired_check, 'IsRequired', 'required');
                        });
                        //OnChange Locked
                        const locked_check = this.querySelector('[property="Locked"]');
                        locked_check.addEventListener('change', () => {
                            this.quickSettingChange(locked_check, 'Locked', 'locked');
                        });
                        //If any control from control settings gets its value changed, we set the form as dirty
                        this.querySelectorAll('.controlSettings [property]').forEach(property_input => {
                            //If it's a dbcombo we set the listener in its needed way
                            if (property_input.nodeName === 'FLX-DBCOMBO') {
                                $(this).find('.controlSettings flx-dbcombo[property] div:not(.mobileinputdiv)').on('change', () => {
                                    this.is_dirty = true;
                                });
                                return;
                            }
                            property_input.addEventListener('change', () => {
                                this.is_dirty = true;
                            });
                        });
                        //Save Button
                        this.querySelector('.saveButton').addEventListener('click', () => {
                            const control_settings_properties = this.querySelectorAll('.controlSettings .wizardControl:not(.hidden) [property], .controlSettings [property="TypeId"]');
                            //We check if any of the control settings is required, so if one of the required ones is empty we show a warning and stop the saving process
                            for (let i = 0; i < control_settings_properties.length; i++) {
                                const property = control_settings_properties[i];
                                const property_value = property.getValue();
                                if (property.hasAttribute('required') && (property_value == null || property_value === '')) {
                                    flexygo.msg.warning(flexygo.localization.translate('flxmodule.requiredsaving') + property.getAttribute('property'));
                                    return;
                                }
                            }
                            //We create the needed entity ProcessParam/ReportParam/ObjectProperty
                            let property_config;
                            if (this.propertyManager.mode == 'process') {
                                property_config = new flexygo.obj.Entity('sysProcessParam', `ProcessName='${this.processName}' and ParamName='${this.propertyName}'`);
                            }
                            else if (this.propertyManager.mode == 'report') {
                                property_config = new flexygo.obj.Entity('sysReportParam', `ReportName='${this.reportName}' and ParamName='${this.propertyName}'`);
                            }
                            else {
                                property_config = new flexygo.obj.Entity('sysObjectProperty', `objectName='${this.objectName}' and Propertyname='${this.propertyName}'`);
                            }
                            property_config.read();
                            //We change the properties values of the current control settings
                            control_settings_properties.forEach((setting) => {
                                let property_name = setting.getAttribute('property');
                                if (property_name === 'SQLSentence')
                                    property_name = 'SQlSentence';
                                property_config.data[property_name].Value = setting.getValue();
                            });
                            if (property_config.update()) {
                                //We refresh the property manager so the property gets shown with the new settings, and set it again as the active one
                                this.propertyManager.refresh().then(() => {
                                    this.propertyManager.querySelector(`[property="${this.propertyName}"]`).closest('.grid-stack-item-content.ui-draggable-handle').classList.add('activeProperty');
                                });
                                this.is_dirty = false;
                                //We update the values of the propertyManger so they're properly set when changing again to the updated property
                                this.querySelectorAll('[property]').forEach((setting) => {
                                    let property_name = setting.getAttribute('property');
                                    if (property_name === 'SQLSentence')
                                        property_name = '_SQlSentence';
                                    this.propertyManager.properties[this.propertyName][property_name] = setting.getValue();
                                });
                                flexygo.msg.success(flexygo.localization.translate('flxmodule.saved'));
                            }
                        });
                        //OnChange TypeId (Visibility dependencies)
                        $(this).find('[property="TypeId"] div:not(.mobileinputdiv)').on('change', () => {
                            this.triggerDependencies();
                        });
                        this.loaded = true;
                    });
                }
                quickSettingChange(input, type, class_name) {
                    const value = input === null || input === void 0 ? void 0 : input.getValue();
                    const is_boolean = typeof value === 'boolean';
                    const params = [
                        { 'key': 'ObjectName', 'value': this.objectName },
                        { 'key': 'ProcessName', 'value': this.processName },
                        { 'key': 'ReportName', 'value': this.reportName },
                        { 'key': 'PropertyName', 'value': this.propertyName },
                        { 'key': 'SettingName', 'value': type },
                        { 'key': 'StringValue', 'value': is_boolean ? null : value },
                        { 'key': 'BitValue', 'value': is_boolean ? value : null },
                        { 'key': 'IsBoolean', 'value': is_boolean }
                    ];
                    flexygo.nav.execProcess('updateQuickSettingDLL', '', '', null, params, 'current', false, $(this), () => {
                        //We change visually the input so the user sees it directly
                        if (is_boolean)
                            this.changeQuickSettingVisuallyBoolean(value, class_name);
                        else
                            this.changeQuickSettingVisuallyString(value, type);
                        //We update propertymanager properties values, so if the user comes back to this property they get the correct values
                        this.propertyManager.properties[this.propertyName][type] = value;
                    }, false);
                }
                changeQuickSettingVisuallyString(value, type, property_name) {
                    var _a;
                    switch (type) {
                        case 'Label':
                            const label_input = this.propertyManager.querySelector(`[lblproperty="${property_name ? property_name : this.propertyName}"] input`);
                            //If the label_input exists is just a common property, if not its a separator and we must change its value in a different way
                            if (label_input)
                                label_input.value = value;
                            else
                                this.propertyManager.querySelector(`[property="${property_name ? property_name : this.propertyName}"] legend`).textContent = value;
                            break;
                        case 'DefaultValue':
                            this.propertyManager.querySelector(`[property="${property_name ? property_name : this.propertyName}"]`).parentElement.querySelector('.propertymanager-default').textContent = value;
                            break;
                        case 'CssClass':
                            //We first remove the last classes that the property had set
                            const old_classes = (_a = this.propertyManager.properties[property_name ? property_name : this.propertyName].CssClass) === null || _a === void 0 ? void 0 : _a.split(' ');
                            if (old_classes) {
                                old_classes.forEach(cssClass => {
                                    if (cssClass)
                                        this.propertyManager.querySelector(`[property="${property_name ? property_name : this.propertyName}"] > div`).classList.remove(cssClass);
                                });
                            }
                            if (!value)
                                break;
                            //We set the new class/classes
                            const new_classes = value.split(' ');
                            new_classes.forEach(cssClass => {
                                if (cssClass)
                                    this.propertyManager.querySelector(`[property="${property_name ? property_name : this.propertyName}"] > div`).classList.add(cssClass);
                            });
                            break;
                        case 'IconName':
                            const data_div = this.querySelector(`[property="IconName"] [data-value="${value}"]`);
                            const cssClass = data_div ? data_div.firstChild.getAttribute('CSSClass') : null;
                            this.propertyManager.querySelector(`[property="${property_name ? property_name : this.propertyName}"]`).setAttribute('IconClass', cssClass);
                            break;
                    }
                }
                changeQuickSettingVisuallyBoolean(value, class_name) {
                    let property;
                    //If its the hide control we will get its exclusive way to show the input visuals
                    if (class_name === 'hideControl') {
                        property = this.propertyManager.querySelector(`[data-tag="control"] [property="${this.propertyName}"]`);
                        if (value) {
                            property.setAttribute('control-class', 'hideControl');
                            property.classList.add('hideControl');
                            property.options.Hide = true;
                        }
                        else {
                            property.setAttribute('control-class', '');
                            property.classList.remove('hideControl');
                            property.querySelector('div').classList.remove('hideControl');
                            property.options.Hide = false;
                        }
                        return;
                    }
                    //If its not the hide control we get the label and add a class that will show its respective icon
                    property = this.propertyManager.querySelector(`[lblproperty="${this.propertyName}"]`);
                    if (value) {
                        property.classList.add(class_name);
                    }
                    else {
                        property.classList.remove(class_name);
                    }
                }
                insertSpacer(type, above) {
                    let params = {
                        Mode: this.propertyManager.mode,
                        Name: (this.objectName || this.processName || this.reportName),
                        PropertyName: this.propertyName,
                        Above: above
                    };
                    flexygo.ajax.post('~/api/Edit', 'Insert' + type, params, (response) => { this.propertyManager.refresh(); return response; });
                }
                /**
                 * This function is in charge of hiding and showing the necessary inputs depending on the current type.
                 * Things to consider:
                 * - Every control input has a wizardControl to know that its one of those which will be affected by the visibility dependency
                 * - Every wizardControl will be assigned other classes like this depProperty_Type, being dep the prefix to identify them followed by the property type id
                 * - If a new property type is added, it would only be necessary to add its class (depProperty_Type) to its necessary inputs
                 * @param current_type It must be the key name of the property type
                 */
                triggerDependencies() {
                    const current_type = this.querySelector('[property="TypeId"]').getValue();
                    //We hide or show the necessary inputs
                    this.querySelectorAll(`.controlSettings .wizardControl.dep${current_type}`).forEach(control => control.classList.remove('hidden'));
                    this.querySelectorAll(`.controlSettings .wizardControl:not(.dep${current_type})`).forEach(control => control.classList.add('hidden'));
                    //We remove customcontrol value if the value is not set to custom
                    if (current_type !== 'custom') {
                        this.querySelector('[property="CustomPropName"]').setValue('');
                    }
                }
            }
            FlxPropertyWizardElement.observedAttributes = ['objectname', 'propertyname'];
            wc.FlxPropertyWizardElement = FlxPropertyWizardElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-propertywizard', flexygo.ui.wc.FlxPropertyWizardElement);
//# sourceMappingURL=flx-propertywizard.js.map