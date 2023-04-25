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
        * Library for the FlxImageElement web component.
        *
        * @class FlxImageElement
        * @constructor
        * @return {FlxImageElement}
        */
            class FlxImageElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                    * Set when component is attached to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                    this.property = null;
                    this.options = null;
                    this.value = null;
                    this.moduleName = null;
                    this.TypeMode = null;
                    this.fileName = null;
                    this.name = null;
                    /**
                    * Control Mode
                    * @property type {string}
                    */
                    this.mode = 'object';
                    this.pageContainer = null;
                    this.control = null;
                    this.files = null; //TODO_TS
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = $(this);
                    let typeMode = element.attr('type') || element.attr('typemode') || 'embeded';
                    if (typeMode && typeMode !== '') {
                        this.TypeMode = typeMode;
                    }
                    let propName = element.attr('property');
                    if (propName && flexygo.utils.isBlank(this.options)) {
                        let parentCtl = element.closest('flx-edit,flx-list,flx-propertymanager,flx-view,flx-filter');
                        if (parentCtl && parentCtl.length > 0) {
                            let wcParent = parentCtl[0];
                            if (parentCtl.is('flx-filter')) {
                                let objName = element.attr('object');
                                this.options = jQuery.extend(true, {}, wcParent.properties[objName + '-' + propName]);
                            }
                            else {
                                this.options = jQuery.extend(true, {}, wcParent.properties[propName]);
                            }
                            if (wcParent && wcParent.mode) {
                                this.mode = wcParent.mode;
                            }
                        }
                        this.property = propName;
                    }
                    if (typeof element.attr('Required') !== 'undefined') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IsRequired = true;
                    }
                    let RequiredMessage = element.attr('RequiredMessage');
                    if (RequiredMessage && RequiredMessage !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IsRequiredMessage = RequiredMessage;
                    }
                    if (typeof element.attr('Locked') !== 'undefined' || typeof element.attr('Disabled') !== 'undefined') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Locked = true;
                    }
                    let Style = element.attr('Style');
                    if (Style && Style !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Style = Style;
                        element.attr('Control-Style', this.options.Style);
                        element.attr('Style', '');
                    }
                    let Class = element.attr('Class');
                    if (Class && Class !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.CssClass = Class;
                        element.attr('Control-Class', this.options.CssClass);
                        element.attr('Class', '');
                    }
                    let ctlClass = element.attr('Control-Class');
                    if (ctlClass && ctlClass !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.CssClass = ctlClass;
                    }
                    let ctlStyle = element.attr('Control-Style');
                    if (ctlStyle && ctlStyle !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Style = ctlStyle;
                    }
                    let Hide = element.attr('Hide');
                    if (Hide && Hide !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Hide = Hide == 'true';
                    }
                    let defaultValue = element.attr('defaultvalue');
                    if (defaultValue && defaultValue !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.DefaultValue = defaultValue;
                    }
                    let rootPath = element.attr('rootpath');
                    if (rootPath && rootPath !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.RootPath = rootPath;
                    }
                    let Tag = element.attr('Tag');
                    if (Tag && Tag !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Tag = Tag;
                    }
                    let ImageCompressionType = element.attr('ImageCompression');
                    if (ImageCompressionType && ImageCompressionType !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.ImageCompressionType = parseInt(ImageCompressionType);
                    }
                    this.init();
                    this.connected = true;
                    //let Value = element.attr('value');
                    //if (Value && Value !== '') {
                    //    this.setValue(Value);
                    //}
                }
                /**
               * Array of observed attributes.
               * @property observedAttributes {Array}
               */
                static get observedAttributes() {
                    return ['type', 'typemode', 'modulename', 'property', 'required', 'locked', 'disabled', 'style', 'class', 'hide', 'tag'];
                }
                /**
               * Fires when the attribute value of the element is changed.
               * @method attributeChangedCallback
               */
                attributeChangedCallback(attrName, oldVal, newVal) {
                    let element = $(this);
                    if (!this.connected) {
                        return;
                    }
                    if (attrName.toLowerCase() === 'type' || attrName.toLowerCase() === 'typemode' && newVal && newVal !== '') {
                        this.TypeMode = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'modulename' && newVal && newVal !== '') {
                        this.moduleName = newVal;
                        if (this.moduleName) {
                            this.refresh();
                        }
                        this.init();
                    }
                    if (attrName.toLowerCase() === 'property' && newVal && newVal !== '') {
                        let propName = newVal;
                        let parentCtl = element.closest('flx-edit, flx-list,flx-propertymanager');
                        if (parentCtl && parentCtl.length > 0) {
                            let wcParent = parentCtl[0];
                            this.options = jQuery.extend(true, {}, wcParent.properties[propName]);
                        }
                        this.property = newVal;
                        this.init();
                    }
                    if (attrName.toLowerCase() === 'required') {
                        if (typeof element.attr('required') !== 'undefined') {
                            if (!this.options) {
                                this.options = new flexygo.api.ObjectProperty();
                            }
                            this.options.IsRequired = true;
                        }
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'locked' || attrName.toLowerCase() === 'disabled') {
                        if (typeof element.attr('locked') !== 'undefined' || typeof element.attr('disabled') !== 'undefined') {
                            if (!this.options) {
                                this.options = new flexygo.api.ObjectProperty();
                            }
                            this.options.Locked = true;
                        }
                        this.init();
                    }
                    if (attrName.toLowerCase() === 'style' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Style = newVal;
                        if (element.attr('Control-Style') !== this.options.Style) {
                            element.attr('Control-Style', this.options.Style);
                            element.attr('Style', '');
                            this.refresh();
                        }
                    }
                    if (attrName.toLowerCase() === 'class' && element.attr('Control-Class') !== newVal && newVal != oldVal) {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.CssClass = newVal;
                        if (element.attr('Control-Class') !== this.options.CssClass) {
                            if (newVal != '') {
                                element.attr('Control-Class', this.options.CssClass);
                                element.attr('Class', this.options.CssClass);
                            }
                            //element.attr('Class', '');
                            this.refresh();
                        }
                    }
                    if (attrName.toLowerCase() === 'hide' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Hide = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'tag' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Tag = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'imagecompression' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.ImageCompressionType = newVal;
                        this.refresh();
                    }
                }
                /**
                * Initializes component depending on init mode attribute.
                * @method init
                */
                init() {
                    let me = $(this);
                    if (me.attr('mode') && me.attr('mode').toLowerCase() === 'view') {
                        this.initViewMode();
                    }
                    else {
                        this.initEditMode();
                    }
                }
                /**
               * Initializes in view mode.
               * @method initViewMode
               */
                initViewMode() {
                    let me = $(this);
                    let img = $('<img class="img-responsive" style="max-height:100%"/>');
                    let container = $('<div class="cpr-view-container">');
                    container.html(img);
                    me.html(container);
                    me.parent('div[data-tag="control"]').attr('style', 'height:inherit;');
                    me.off();
                    if (this.options && this.options.Style) {
                        me.children('div.cpr-view-container img.img-responsive').attr('style', this.options.Style);
                    }
                    if (this.options && this.options.CssClass) {
                        me.children('div').addClass(this.options.CssClass);
                    }
                    if (this.options && this.options.Hide) {
                        me.addClass("hideControl");
                    }
                    let Value = me.attr('value');
                    if (Value && Value !== '') {
                        this.setValue(Value, me.attr('text'));
                    }
                    this.setValue(this.getValue());
                }
                /**
               * Initializes in edit mode.
               * @method initEditMode
               */
                initEditMode() {
                    let me = $(this);
                    let input;
                    let img;
                    let icon;
                    if (me.attr('typemode') && me.attr('typemode') !== '') {
                        this.TypeMode = me.attr('typemode').toLowerCase();
                    }
                    if (me.attr('defaultvalue') && me.attr('defaultvalue') !== '') {
                        this.options.DefaultValue = me.attr('defaultvalue');
                    }
                    if (me.attr('rootpath') && me.attr('rootpath') !== '') {
                        this.options.RootPath = me.attr('rootpath');
                    }
                    me.parent('div[data-tag="control"]').attr('style', 'height:94%;');
                    this.control = $('<div class="ctl-container ctl-cpr-transition ctl-hover">');
                    input = $('<input type="hidden"/>');
                    icon = $('<i class="flx-icon icon-pencil ctl-icon ctl-cpr-transition" flx-fw=""></i> ');
                    img = $('<img src="" class="img-responsive ctl-image ctl-cpr-transition"/>');
                    this.control.append(input);
                    this.control.append(icon);
                    this.control.append(img);
                    me.html(this.control);
                    let Value = me.attr('value');
                    if (Value && Value !== '') {
                        this.setValue(Value, me.attr('text'));
                    }
                    me.off('click').on('click', () => {
                        this.openDialog();
                    });
                    this.setOptions();
                }
                setOptions() {
                    let me = $(this);
                    let input = me.find('input');
                    let img = me.find('img');
                    input.on('change.refreshvalue', () => {
                        me.attr('value', input.val());
                    });
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
                        me.off();
                        me.find('div.ctl-container').removeClass('ctl-hover').addClass('ctl-container-locked');
                        img.addClass('ctl-image-locked');
                    }
                    if (this.options && this.options.ClientReadOnly) {
                        me.find('i').removeClass('icon-pencil').addClass('icon-eye');
                    }
                    if (this.options && this.options.Style) {
                        me.find('img').attr('style', this.options.Style);
                    }
                    if (this.options && this.options.CssClass) {
                        me.children('div').addClass(this.options.CssClass);
                    }
                    if (this.options && this.options.Hide) {
                        me.addClass("hideControl");
                    }
                    if (this.options && this.options.IsRequired) {
                        input.prop('required', true);
                    }
                    const module = me.closest('flx-module')[0];
                    if ((this.options && this.options.CauseRefresh) || (module && module.moduleConfig && module.moduleConfig.PropsEventDependant && module.moduleConfig.PropsEventDependant.includes(this.property))) {
                        input.on('change', (e) => {
                            //$(document).trigger('refreshProperty', [input.closest('flx-edit'), this.options.Name]);
                            let ev = {
                                class: "property",
                                type: "changed",
                                sender: this,
                                masterIdentity: this.property
                            };
                            flexygo.events.trigger(ev);
                        });
                    }
                }
                refresh() {
                    try {
                        let val = this.getValue();
                        this.init();
                        if (val) {
                            this.setValue(val);
                        }
                    }
                    catch (e) {
                        console.log(e.message);
                    }
                }
                setValue(value, text) {
                    let me = $(this);
                    if (this.TypeMode === 'base64') {
                        if (value && value.toString().indexOf('data:') != 0) {
                            value = 'data:image/png;base64,' + value;
                        }
                    }
                    if (!text) {
                        text = value;
                    }
                    if (me.attr('mode') && me.attr('mode').toLowerCase() === 'view') {
                        this.setValueView(value);
                    }
                    else {
                        try {
                            let input = me.find('input');
                            let img = me.find('img');
                            let base64Matcher = new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$");
                            if (!value) {
                                if (this.options.DefaultValue) {
                                    text = flexygo.utils.resolveUrl(this.addTime(this.options.DefaultValue));
                                    value = this.options.DefaultValue;
                                }
                                img.attr('src', text);
                                me.attr('value', value).attr('text', text);
                                input.val(value);
                            }
                            else {
                                let test = value.split(',')[1];
                                if (flexygo.utils.isBase64(test)) {
                                    img.attr('src', value);
                                    input.val(value);
                                    me.attr('value', value);
                                }
                                else {
                                    text = flexygo.utils.resolveUrl(this.addTime(text));
                                    img.attr('src', text);
                                    me.attr('value', value).attr('text', text);
                                    input.val(value);
                                }
                            }
                        }
                        catch (e) {
                            console.log(e.message);
                        }
                    }
                }
                addTime(val) {
                    return flexygo.utils.querystring.setParamValue(val, 'time', new Date().getTime().toString());
                }
                setValueView(value) {
                    let me = $(this);
                    this.value = value;
                    me.find('div.cpr-view-container  img.img-responsive').attr('src', flexygo.utils.resolveUrl(value));
                }
                getValue() {
                    let me = $(this);
                    if (me.attr('mode') && me.attr('mode').toLowerCase() === 'view') {
                        return (this.value) ? this.value : me.attr('value');
                    }
                    try {
                        let input = me.find('input');
                        if (!input.val()) {
                            return null;
                        }
                        else {
                            return input.val();
                        }
                    }
                    catch (e) {
                        console.log(e.message);
                    }
                }
                setResult(result) {
                    try {
                        let me = $(this);
                        if (this.TypeMode === 'file') {
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
                                Mode: this.mode,
                                ObjectName: this.options.ProcessName || this.options.ReportName || this.options.ObjectName,
                                PropertyName: this.options.Name,
                                FileName: this.fileName,
                                Base64: result.split(',')[1],
                                CurrentValue: me.attr('value'),
                                FormValues: formValues,
                                Name: this.name
                            };
                            if ($(this).parents('flx-list').length > 0) {
                                flexygo.ajax.syncPost('~/api/Image', 'SaveFile', params, (ret) => {
                                    if (ret.Value != 'errorrootpath')
                                        this.setValue(ret.Value, ret.Text);
                                    else {
                                        flexygo.msg.error('image.errorrootpath');
                                    }
                                });
                            }
                            else {
                                flexygo.ajax.post('~/api/Image', 'SaveFile', params, (ret) => {
                                    if (ret.Value != 'errorrootpath')
                                        this.setValue(ret.Value, ret.Text);
                                    else {
                                        flexygo.msg.error('image.errorrootpath');
                                    }
                                });
                            }
                            if (!this.fileName) {
                                flexygo.msg.warning('image.errorfilename');
                            }
                        }
                        else if (this.TypeMode === 'base64') {
                            let extns = this.options.Extensions.toLowerCase().split("|");
                            let fileExtension = this.name.substring(this.name.lastIndexOf(".")).toLowerCase();
                            if (extns.indexOf(fileExtension) > -1 || this.options.ExtensionId == 'sysAll') {
                                this.setValue(result);
                            }
                            else {
                                flexygo.msg.error('image.extension');
                            }
                        }
                    }
                    catch (err) {
                        console.log(err.message);
                    }
                }
                openDialog() {
                    let me = $(this);
                    let eValue;
                    let imageElement;
                    let image;
                    let rounded;
                    let accept = '';
                    if ((this.options && this.options.RegExp) || (this.options && this.options.Extensions)) {
                        if (this.options.RegExp) {
                            accept = this.options.RegExp;
                        }
                        else if (this.options.Extensions) {
                            if (this.options.ExtensionId != 'sysAll') {
                                accept = flexygo.utils.parser.replaceAll(this.options.Extensions, '|', ',');
                            }
                        }
                    }
                    image = me.find('img').attr("src");
                    if (this.TypeMode === 'file') {
                        this.name = this.getName(me.attr('value'), this.TypeMode);
                        this.fileName = this.getFileName(me.attr('value'));
                    }
                    else {
                        if (me.attr('value')) {
                            this.name = "." + me.attr('value').substring(me.attr('value').indexOf("/") + 1, me.attr('value').indexOf(";"));
                        }
                    }
                    rounded = false;
                    this.pageContainer = $(`<div class="flx-cpr-image container cnt-Body pageContainerImage">
                                    <div class="padding-l cpr-subcontainer ctl-cpr-transition">
                                                <div class="panel panel-default panel-wizard col-md-12 cpr-panel">
                                                    <div class="panel-heading cpr-heading">
                                                        <div class="btn-group cpr-btn-group" data-toggle="buttons">
                                                            <label class="btn btn-default cpr-btn cpr-defaultActive active cpr-setDragModeCrop cpr-setDragMode" data-original-title="" title="">
                                                                <input type="radio" class="cpr-defaultCheck" name="setDragMode" value="crop" checked>
                                                                <i class="fa fa-crop" flx-fw=""></i>
                                                            </label>
                                                            <label class="btn btn-default cpr-btn cpr-setDragModeMove cpr-setDragMode" data-original-title="" title="">
                                                               <input type="radio" class="" name="setDragMode" value="move">
                                                               <i class="fa fa-arrows" flx-fw=""></i>
                                                            </label>
                                                        </div>
                                                        <div class="btn-group cpr-btn-group crp-zoom">
                                                            <button type="button" method="zoom" value="0.1" class="btn btn-default cpr-btn" data-original-title="" title="">
                                                                <i class="fa fa-search-plus" flx-fw=""></i>
                                                            </button>
                                                            <button type="button" method="zoom" value="-0.1" class="btn btn-default cpr-btn" data-original-title="" title="">
                                                                <i class="fa fa-search-minus" flx-fw=""></i>
                                                            </button>
                                                        </div>
                                                        <div class="btn-group cpr-btn-group crp-rotate">
                                                            <button type="button" method="rotate" value="-45" class="btn btn-default cpr-btn" data-original-title="" title="">
                                                                <i class="fa fa-rotate-left" flx-fw=""></i>
                                                            </button>
                                                            <button type="button" method="rotate" value="45" class="btn btn-default cpr-btn" data-original-title="" title="">
                                                                <i class="fa fa-rotate-right" flx-fw=""></i>
                                                            </button>
                                                        </div>
                                                        <div class="btn-group cpr-btn-group crp-scale">
                                                            <button type="button" method="scaleX" value="-1" class="btn btn-default cpr-btn" data-original-title="" title="">
                                                                <i class="fa fa-arrows-h" flx-fw=""></i>
                                                            </button>
                                                            <button type="button" method="scaleY" value="-1" class="btn btn-default cpr-btn" data-original-title="" title="">
                                                                <i class="fa fa-arrows-v" flx-fw=""></i>
                                                            </button>
                                                        </div>
                                                        <div class="btn-group cpr-btn-group  cpr-setAspectRatio" data-toggle="buttons">
                                                            <label class="btn btn-default cpr-btn cpr-defaultActive active" data-original-title="" title="">
                                                               <input type="radio" class="cpr-defaultCheck" name="setAspectRatio" value="NaN" checked>
                                                               ` + flexygo.localization.translate('image.free') + `
                                                            </label>
                                                            <label class="btn btn-default cpr-btn" data-original-title="" title="">
                                                                <input type="radio" class="" name="setAspectRatio" value="1.7777777777777777">
                                                                16:9
                                                            </label>
                                                            <label class="btn btn-default cpr-btn" data-original-title="" title="">
                                                                <input type="radio" class="" name="setAspectRatio" value="1.3333333333333333">
                                                                4:3
                                                            </label>
                                                            <label class="btn btn-default cpr-btn" data-original-title="" title="">
                                                                <input type="radio" class="" name="setAspectRatio" value="0.6666666666666666">
                                                                2:3
                                                            </label>
                                                            <label class="btn btn-default cpr-btn" data-original-title="" title="">
                                                                <input type="radio" class="" name="setAspectRatio" value="1">
                                                                <i class="flx-icon icon-non-check" flx-fw=""></i>
                                                            </label>
                                                            <label class="btn btn-default cpr-btn" data-original-title="" title="">
                                                                <input type="radio" class="" name="setAspectRatio" value="rounded">
                                                                <i class="flx-icon icon-circle-1" flx-fw=""></i>
                                                            </label>
                                                       </div>
                                                       <button type="button" method="reset" value="" class="btn btn-default cpr-btn" data-original-title="" title="">
                                                                <i class="fa fa-refresh" flx-fw=""></i>
                                                       </button>
                                                       <button id="download" type="button" method="download" value="" class="btn btn-default cpr-btn" data-original-title="" title="">
                                                                <i class="flx-icon icon-download" flx-fw=""></i>
                                                       </button>
                                                    </div>
                                                    <div class="panel-body cpr-cropper">
                                                            <span class="cpr-span">` + flexygo.localization.translate('image.infotostart') + `</span>
                                                            <img class="img-responsive" src="` + image + `">
                                                    </div>
                                                </div>
                                                <label class="btn btn-default btn-file bg-outstanding cpr-btn-browse">`
                        + flexygo.localization.translate('image.browsebutton') + `<input type="file" class="hide" accept="${accept}"/>
                                                </label>
                                                <button type="button" method="save" value="" class="btn btn-default bg-info cpr-btn-save" data-original-title="" title="">
                                                    <i class="flx-icon icon-save-2" flx-fw=""></i> ` + flexygo.localization.translate('image.savebutton') +
                        `</button>
                                                <button type="button" method="remove" value="" class="btn btn-default bg-danger cpr-btn-remove" data-original-title="" title="">
                                                    <i class="flx-icon icon-delete-2" flx-fw=""></i> ` + flexygo.localization.translate('image.removebutton') +
                        `</button>
                                         </div>
                                    </div>`);
                    if (this.options.ObjectName === 'sysObjectImage') {
                        this.pageContainer.find('label.cpr-btn-browse').hide();
                        this.pageContainer.find('button[method="save"]').addClass('cpr-btn-save-imagemanager');
                        this.pageContainer.find('button[method="remove"]').hide();
                    }
                    if (!this.options.ClientReadOnly) {
                        this.pageContainer.find('label.cpr-setDragModeCrop').tooltip({ title: flexygo.localization.translate('image.cropbutton'), placement: 'right', trigger: 'hover' });
                        this.pageContainer.find('label.cpr-setDragModeMove').tooltip({ title: flexygo.localization.translate('image.movebutton'), placement: 'right', trigger: 'hover' });
                        this.pageContainer.find('div.crp-zoom').tooltip({ title: flexygo.localization.translate('image.zoombutton'), placement: 'right', trigger: 'hover' });
                        this.pageContainer.find('div.crp-rotate').tooltip({ title: flexygo.localization.translate('image.rotatebutton'), placement: 'right', trigger: 'hover' });
                        this.pageContainer.find('div.crp-scale').tooltip({ title: flexygo.localization.translate('image.scalebutton'), placement: 'right', trigger: 'hover' });
                        this.pageContainer.find('div.cpr-setAspectRatio').tooltip({ title: flexygo.localization.translate('image.aspectratiobutton'), placement: 'right', trigger: 'hover' });
                        this.pageContainer.find('button[method="reset"]').tooltip({ title: flexygo.localization.translate('image.resetbutton'), placement: 'left', trigger: 'hover' });
                        this.pageContainer.find('label.cpr-btn-browse').tooltip({ title: flexygo.localization.translate('image.browsebuttontooltip'), placement: 'top', trigger: 'hover' });
                        this.pageContainer.find('button[method="save"]').tooltip({ title: flexygo.localization.translate('image.savebutton'), placement: 'top', trigger: 'hover' });
                        this.pageContainer.find('button[method="remove"]').tooltip({ title: flexygo.localization.translate('image.removebutton'), placement: 'top', trigger: 'hover' });
                        this.pageContainer.find('button[method="download"]').tooltip({ title: flexygo.localization.translate('image.downloadbutton'), placement: 'left', trigger: 'hover' });
                    }
                    else {
                        this.pageContainer.find('.cpr-span').hide();
                        this.pageContainer.find('.btn').prop("disabled", true).addClass('disabled');
                        this.pageContainer.find('input').prop("disabled", true).addClass('disabled');
                    }
                    imageElement = this.pageContainer.find('img');
                    let dialogWidth;
                    let dialogHeight;
                    if ($('body').width() < 850) {
                        dialogWidth = $('body').width();
                    }
                    else {
                        dialogWidth = 900;
                    }
                    if ($('body').height() < 830) {
                        dialogHeight = $('body').height();
                    }
                    else {
                        if (this.options.ObjectName === 'sysObjectImage') {
                            dialogHeight = 780;
                        }
                        else {
                            dialogHeight = 830;
                        }
                    }
                    this.pageContainer.dialog({
                        position: { my: "center top", at: "center top+70", of: $('body') },
                        width: dialogWidth,
                        height: dialogHeight,
                        dialogClass: 'flx-dialog-modal',
                        modal: true,
                        close: (e) => { $(e.target).dialog('destroy').remove(); }
                    }).dialogExtend({
                        "closable": true,
                        "maximizable": false,
                        "minimizable": false,
                        "collapsable": false,
                        "dblclick": false,
                        "modal": true,
                        "close": (e) => { $(e.target).remove(); }
                    });
                    if (!this.options.ClientReadOnly && image) {
                        let options = null;
                        if (this.isJSON(this.options.Tag) && JSON.parse(this.options.Tag).options) {
                            options = JSON.parse(this.options.Tag).options;
                        }
                        imageElement.cropper(options);
                    }
                    this.pageContainer.parent().on('click', () => {
                        event.stopPropagation();
                    });
                    $('.ui-widget-overlay.ui-front').on('click', () => {
                        event.stopPropagation();
                    });
                    this.pageContainer.find('button').on('click', (e) => {
                        let element = $(e.currentTarget);
                        let method = element.attr('method');
                        let value = element.attr('value');
                        if (method === 'download') {
                            var link = document.createElement('a');
                            link.href = image;
                            link.download = this.options.Name;
                            link.click();
                        }
                        if (method === 'remove') {
                            if (this.options.ObjectName != 'sysObjectImage') {
                                this.setValue(value);
                                this.pageContainer.dialog('destroy').remove();
                            }
                        }
                        else if (method === 'save') {
                            let options = {};
                            let compression;
                            if (this.isJSON(this.options.Tag) && JSON.parse(this.options.Tag).getCroppedCanvas) {
                                options = JSON.parse(this.options.Tag).getCroppedCanvas;
                            }
                            if (this.options.ImageMaxWidth) {
                                options.maxWidth = this.options.ImageMaxWidth;
                            }
                            if (this.options.ImageMaxHeight) {
                                options.maxHeight = this.options.ImageMaxHeight;
                            }
                            let croppedCanvas = imageElement.cropper('getCroppedCanvas', options);
                            if (rounded) {
                                croppedCanvas = this.getRoundedCanvas(croppedCanvas);
                            }
                            if (imageElement[0].src.includes('.png') || imageElement[0].src.includes('image/png')) {
                                if (this.options.ImageCompressionType && this.options.ImageCompressionType > 0) {
                                    switch (this.options.ImageCompressionType) {
                                        //Low
                                        case 1:
                                            compression = 192;
                                            break;
                                        //Medium
                                        case 2:
                                            compression = 128;
                                            break;
                                        //High
                                        case 3:
                                            compression = 64;
                                            break;
                                    }
                                    let optionsgRgb = {
                                        colors: compression
                                    };
                                    let rgbQuant = new RgbQuant(optionsgRgb);
                                    rgbQuant.sample(croppedCanvas);
                                    let img = rgbQuant.reduce(croppedCanvas);
                                    let canvas = croppedCanvas;
                                    let uint = new Uint8ClampedArray(img.buffer);
                                    let imageData = new ImageData(uint, croppedCanvas.width, croppedCanvas.height);
                                    let ctx = croppedCanvas.getContext('2d');
                                    ctx.putImageData(imageData, 0, 0);
                                    canvas.getContext('2d').drawImage(croppedCanvas, 0, 0, canvas.width, canvas.height);
                                    this.setResult(canvas.toDataURL('image/png'));
                                }
                                else {
                                    this.setResult(croppedCanvas.toDataURL());
                                }
                            }
                            else {
                                if (this.options.ImageCompressionType && this.options.ImageCompressionType > 0) {
                                    switch (this.options.ImageCompressionType) {
                                        //Low
                                        case 1:
                                            compression = 0.75;
                                            break;
                                        //Medium
                                        case 2:
                                            compression = 0.50;
                                            break;
                                        //High
                                        case 3:
                                            compression = 0.25;
                                            break;
                                    }
                                    this.setResult(croppedCanvas.toDataURL('image/jpeg', compression));
                                }
                                else {
                                    this.setResult(croppedCanvas.toDataURL());
                                }
                            }
                            this.pageContainer.dialog('destroy').remove();
                        }
                        else {
                            if (method === 'scaleX' && eValue.scaleX === -1 || method === 'scaleY' && eValue.scaleY === -1) {
                                value = '1';
                            }
                            imageElement.cropper(method, value);
                        }
                    });
                    this.pageContainer.find('input').on('change', (e) => {
                        let element = $(e.currentTarget);
                        if (element.attr('type') === 'file') {
                            if (element[0].files && element[0].files[0]) {
                                if (this.options.ObjectName != 'sysObjectImage') {
                                    this.name = element[0].files[0].name;
                                    let reader = new FileReader();
                                    reader.onload = (e) => {
                                        let options = null;
                                        if (this.isJSON(this.options.Tag) && JSON.parse(this.options.Tag).options) {
                                            options = JSON.parse(this.options.Tag).options;
                                        }
                                        imageElement.cropper('destroy').attr('src', e.target.result).cropper(options);
                                    };
                                    reader.readAsDataURL(element[0].files[0]);
                                    if (this.TypeMode === 'file') {
                                        this.fileName = this.getFileName(element[0].files[0].name);
                                    }
                                    this.pageContainer.find('label.active').removeClass('active');
                                    this.pageContainer.find('input:checked').prop("checked", false);
                                    this.pageContainer.find('label.cpr-defaultActive').addClass('active');
                                    this.pageContainer.find('input.cpr-defaultCheck').prop("checked", true);
                                    rounded = false;
                                }
                            }
                        }
                        else {
                            let method = element.attr('name');
                            let value = element.attr('value');
                            if (method === 'setAspectRatio' && value === 'rounded') {
                                rounded = true;
                                value = '1';
                                $(".cropper-view-box,.cropper-face").css("border-radius", "50%");
                            }
                            else if (method === 'setAspectRatio') {
                                rounded = false;
                                $(".cropper-view-box,.cropper-face").css("border-radius", "0");
                            }
                            imageElement.cropper(method, value);
                        }
                    });
                    this.pageContainer.find('div.cpr-cropper').on('dblclick', (e) => {
                        let inputChecked = this.pageContainer.find('input[name="setDragMode"]:checked');
                        let inputNotChecked = this.pageContainer.find('input[name="setDragMode"]:not(:checked)');
                        let labelActive = this.pageContainer.find('label.cpr-setDragMode.active');
                        let labelNotActive = this.pageContainer.find('label.cpr-setDragMode:not(.active)');
                        labelActive.removeClass('active');
                        inputChecked.prop("checked", false);
                        labelNotActive.addClass('active');
                        inputNotChecked.prop("checked", true);
                    });
                    this.pageContainer.on('dragover', (e) => {
                        if (this.options.ObjectName != 'sysObjectImage') {
                            e.preventDefault();
                            e.stopPropagation();
                            this.pageContainer.find('div.cpr-subcontainer').addClass('cpr-dragging');
                        }
                    });
                    this.pageContainer.on('dragleave', (e) => {
                        if (this.options.ObjectName != 'sysObjectImage') {
                            e.preventDefault();
                            e.stopPropagation();
                            this.pageContainer.find('div.cpr-subcontainer').removeClass('cpr-dragging');
                        }
                    });
                    this.pageContainer.on('drop', (e) => {
                        if (this.options.ObjectName != 'sysObjectImage') {
                            if (e.originalEvent.dataTransfer) {
                                if (e.originalEvent.dataTransfer.files.length) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    let file = e.originalEvent.dataTransfer.files;
                                    let imageType = /image.*/;
                                    if (file[0].type.match(imageType)) {
                                        this.pageContainer.find('input[type="file"]').prop("files", file);
                                        if (e.originalEvent.dataTransfer.files.length !== 1) {
                                            flexygo.msg.warning('image.errorfilenumber');
                                        }
                                        else {
                                            this.pageContainer.find('input[type="file"]').trigger('change');
                                        }
                                    }
                                    else {
                                        flexygo.msg.error('image.errorfiletype');
                                    }
                                }
                            }
                            this.pageContainer.find('div.cpr-subcontainer').removeClass('cpr-dragging');
                        }
                    });
                    if (this.options.ClientReadOnly) {
                        this.pageContainer.off().find('*').off();
                    }
                    this.pageContainer.find('img').on('error', (e) => {
                        $(e.currentTarget).hide();
                    });
                }
                getRoundedCanvas(sourceCanvas) {
                    let canvas = document.createElement('canvas');
                    let context = canvas.getContext('2d');
                    let width = sourceCanvas.width;
                    let height = sourceCanvas.height;
                    canvas.width = width;
                    canvas.height = height;
                    context.beginPath();
                    context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI);
                    context.strokeStyle = 'rgba(0,0,0,0)';
                    context.stroke();
                    context.clip();
                    context.drawImage(sourceCanvas, 0, 0, width, height);
                    return canvas;
                }
                getFileName(url) {
                    if (url) {
                        let index = url.lastIndexOf("\\") + 1;
                        let filenameWithExtension = url.substr(index);
                        let filename = filenameWithExtension.split(".")[0];
                        return filename;
                    }
                    else {
                        return url;
                    }
                }
                getName(url, mode) {
                    if (url) {
                        let index = url.lastIndexOf("\\") + 1;
                        let filenameWithExtension = url.substr(index);
                        let filename;
                        if (mode === 'file') {
                            filename = filenameWithExtension;
                        }
                        else {
                            filename = filenameWithExtension.split("?")[0];
                        }
                        return filename;
                    }
                    else {
                        return url;
                    }
                }
                isJSON(str) {
                    if (typeof (str) !== 'string') {
                        return false;
                    }
                    try {
                        JSON.parse(str);
                        return true;
                    }
                    catch (e) {
                        return false;
                    }
                }
                /**
                * Trigger Dependencies.
                * @method triggerDependencies
                */
                triggerDependencies() {
                    let me;
                    let input;
                    me = $(this);
                    input = me.find('input');
                    input.trigger('change');
                }
            }
            wc.FlxImageElement = FlxImageElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-image', flexygo.ui.wc.FlxImageElement);
//# sourceMappingURL=flx-image.js.map