/**
 * @namespace flexygo.ui.wc
 */
var flexygo;
(function (flexygo) {
    var ui;
    (function (ui) {
        var wc;
        (function (wc) {
            /**
        * Library for the FlxFileWcElement web component.
        *
        * @class FlxFileWcElement
        * @constructor
        * @return {FlxFileWcElement}
        */
            class FlxFileWcElement extends HTMLElement {
                constructor() {
                    //If a constructor is defined, is call the super constructor
                    super();
                    /**
                    * Property Options
                    * @property options {any}
                    */
                    this.options = null;
                    /**
                    * Control Mode
                    * @property type {string}
                    */
                    this.mode = 'object';
                }
                /**
                * Array of observed attributes.
                * @property observedAttributes {Array}
                */
                static get observedAttributes() {
                    return ['ObjectName', 'ObjectWhere', 'ModuleName', 'RootPath', 'Path', 'Property', 'Type', 'Mode', 'disabled'];
                }
                /**
                * Init the webcomponent.
                * @method init
                */
                init() {
                    this.render();
                }
                /**
                * Refresh de webcomponent.
                * @method refresh
                */
                refresh() {
                    let val = this.getValue();
                    this.init();
                    if (val) {
                        this.setValue(val);
                    }
                }
                /**
                * Render HTML data.
                * @method render
                */
                render() {
                    let me = $(this);
                    var rendered;
                    if (this.mode !== 'view') {
                        rendered = `<div class="input-group">
                                <input type="text" class="form-control f-text" readonly placeholder="Upload File">
                                <label class="input-group-btn">
                                    <label class="btn f-btn">
                                       <i class="fa fa-search"></i><input type="file" class="hide"/>
                                    </label>
                                </label>
                            </div>`;
                    }
                    else {
                        rendered = `<div>
                                <label class="form-control input-view"></label>
                            </div>`;
                    }
                    me.html(rendered);
                    if (this.mode !== 'view') {
                        this.mainEvents();
                    }
                    this.setOptions();
                }
                /**
                * Main events.
                * @method mainEvents
                */
                mainEvents() {
                    try {
                        $(this).find('input[type="file"]').off('change').on('change', function (e) {
                            let me = this.closest('flx-file');
                            let element = $(e.currentTarget);
                            if (element[0].files && element[0].files[0]) {
                                let reader = new FileReader();
                                reader.onload = (e) => {
                                    me.saveFile(element[0].files[0].name, e.target.result.split(',')[1]);
                                    element.val('');
                                };
                                reader.readAsDataURL(element[0].files[0]);
                            }
                        });
                    }
                    catch (ex) {
                        flexygo.msg.error('file.errorsaving');
                    }
                }
                /**
                * Save file.
                * @method saveFile
                */
                saveFile(name, base64) {
                    if (this.type === 'file') {
                        let formValues = [];
                        let module = $(this).closest('flx-edit');
                        if (module.length > 0) {
                            let props = module.find('[property]');
                            if (props.length > 0) {
                                for (var i = 0; i < props.length; i++) {
                                    let prop = $(props[i])[0];
                                    formValues.push({ "key": prop.property, "value": prop.getValue() });
                                }
                            }
                        }
                        let params = {
                            'Mode': this.mode,
                            'ObjectName': this.options.ProcessName || this.options.ReportName || this.options.ObjectName,
                            'PropertyName': this.options.Name,
                            'Base64': base64,
                            'Name': name,
                            'FormValues': formValues
                        };
                        flexygo.ajax.post('~/api/File', 'SaveFile', params, (response) => {
                            if (response && !response.fileError) {
                                this.setValue(response.path);
                                if (this.options && this.options.CauseRefresh) {
                                    let ev = {
                                        class: "property",
                                        type: "changed",
                                        sender: this,
                                        masterIdentity: this.property
                                    };
                                    flexygo.events.trigger(ev);
                                }
                                flexygo.msg.success('file.saved');
                            }
                            else {
                                flexygo.msg.error('file.errorsaving');
                            }
                        });
                    }
                    else if (this.type === 'base64') {
                        let extns = this.options.Extensions.toLowerCase().split("|");
                        let fileExtension = name.substring(name.lastIndexOf(".")).toLowerCase();
                        if (extns.indexOf(fileExtension) > -1 || this.options.ExtensionId == 'sysAll') {
                            this.setValue(base64);
                            flexygo.msg.success('file.saved');
                        }
                        else {
                            flexygo.msg.error('file.extension');
                        }
                    }
                }
                /**
                * set options.
                * @method setOptions
                */
                setOptions() {
                    let me = $(this);
                    let input = me.find('input[type="file"]');
                    if (this.options && this.options.Name && this.options.Name !== '') {
                        input.attr('name', this.options.Name);
                    }
                    else {
                        input.attr('name', flexygo.utils.uniqueName());
                    }
                    if (me.attr('tab') && me.attr('tab') !== '') {
                        input.attr('tabindex', me.attr('tab'));
                    }
                    if (this.options && this.options.Locked) {
                        input.prop('disabled', this.options.Locked);
                        input.closest('label.btn').addClass('disabled');
                        me.find('input[type="text"]').removeClass('f-text');
                        input.off();
                    }
                    if (this.options && this.options.ClientReadOnly) {
                        input.prop('disabled', this.options.ClientReadOnly);
                        input.closest('label.btn').addClass('disabled');
                        input.off();
                    }
                    if (this.options && this.options.Style) {
                        input.closest('label.btn').attr('style', this.options.Style);
                    }
                    if (this.options && this.options.CssClass) {
                        input.closest('label.btn').addClass(this.options.CssClass);
                    }
                    if (this.options && this.options.Hide) {
                        me.addClass("hideControl");
                    }
                    if (this.options && this.options.IsRequired) {
                        me.find('input[type="text"]').prop('required', true);
                    }
                    if (this.options && this.options.IconClass) {
                        me.find('div').first().prepend('<span class="input-group-addon" > <i class="' + this.options.IconClass + '"></i></span>');
                        if (this.mode === 'view') {
                            me.find('div').first().addClass('input-group');
                        }
                    }
                    if ((this.options && this.options.RegExp) || (this.options && this.options.Extensions)) {
                        if (this.options.RegExp) {
                            input.attr('accept', this.options.RegExp);
                        }
                        else if (this.options.Extensions) {
                            if (this.options.ExtensionId != 'sysAll') {
                                input.attr('accept', flexygo.utils.parser.replaceAll(this.options.Extensions, '|', ','));
                            }
                        }
                    }
                }
                /**
                * Set value.
                * @method SetValue
                */
                setValue(value) {
                    this.value = value;
                    let text;
                    let fileName;
                    if (this.mode !== 'view') {
                        text = $(this).find('input[type="text"]');
                    }
                    else {
                        text = $(this).find('label');
                    }
                    if (this.type === 'file') {
                        if (this.value) {
                            fileName = this.value.substr(this.value.lastIndexOf("/") + 1);
                            if (!fileName) {
                                fileName = this.value;
                            }
                            if (this.mode !== 'view') {
                                text.val(fileName);
                            }
                            else {
                                text.html(fileName);
                            }
                        }
                    }
                    else if (this.type === 'base64') {
                        if (this.value) {
                            if (this.mode !== 'view') {
                                text.val(flexygo.localization.translate('file.resultbase64'));
                            }
                            else {
                                text.html(flexygo.localization.translate('file.resultbase64'));
                            }
                        }
                    }
                }
                /**
                * Get value.
                * @method getValue
                */
                getValue() {
                    return this.value;
                }
                /**
                * Trigger Dependencies.
                * @method triggerDependencies
                */
                triggerDependencies() {
                    let me;
                    let input;
                    me = $(this);
                    input = me.find('input[type="file"]');
                    input.trigger('change');
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = $(this);
                    this.objectName = element.attr("ObjectName");
                    this.objectWhere = element.attr("ObjectWhere");
                    this.moduleName = element.attr("ModuleName");
                    this.property = element.attr('Property');
                    this.type = element.attr('Type');
                    this.mode = element.attr('Mode');
                    if (this.property && flexygo.utils.isBlank(this.options)) {
                        let parentCtl = element.closest('flx-edit,flx-list,flx-propertymanager,flx-view,flx-filter');
                        if (parentCtl && parentCtl.length > 0) {
                            let wcParent = parentCtl[0];
                            if (parentCtl.is('flx-filter')) {
                                let objName = element.attr('object');
                                this.options = jQuery.extend(true, {}, wcParent.properties[objName + '-' + this.property]);
                            }
                            else {
                                this.options = jQuery.extend(true, {}, wcParent.properties[this.property]);
                            }
                            if (wcParent.mode) {
                                this.mode = wcParent.mode;
                            }
                        }
                    }
                    this.init();
                }
                /**
                * Fires when the attribute value of the element is changed.
                * @method attributeChangedCallback
                */
                attributeChangedCallback(attrName, oldVal, newVal) {
                    let needInit = false;
                    let element = $(this);
                    if (attrName.toLowerCase() == 'modulename' && newVal && newVal != '') {
                        this.moduleName = newVal;
                        needInit = true;
                    }
                    else if (attrName.toLowerCase() == 'objectname' && newVal && newVal != '') {
                        this.objectName = newVal;
                        needInit = true;
                    }
                    else if (attrName.toLowerCase() == 'objectwhere' && newVal && newVal != '') {
                        this.objectWhere = newVal;
                        needInit = true;
                    }
                    else if (attrName.toLowerCase() === 'type' && newVal && newVal !== '') {
                        this.type = newVal;
                        needInit = false;
                    }
                    else if (attrName.toLowerCase() === 'mode' && newVal && newVal !== '') {
                        this.mode = newVal;
                        needInit = true;
                    }
                    else if (attrName.toLowerCase() === 'disabled') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        if (typeof element.attr('disabled') !== 'undefined') {
                            this.options.Locked = true;
                            let input = element.find('input');
                            input.prop('disabled', this.options.Locked);
                            input.closest('label.btn').addClass('disabled');
                            input.find('input').find('input[type="text"]').removeClass('f-text');
                            input.off();
                        }
                        else {
                            this.options.Locked = false;
                            needInit = true;
                        }
                    }
                    if (needInit) {
                        this.init();
                    }
                }
            }
            wc.FlxFileWcElement = FlxFileWcElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define("flx-file", flexygo.ui.wc.FlxFileWcElement);
//# sourceMappingURL=flx-file.js.map