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
            * Library for the FlxUploadElement web component.
            *
            * @class FlxUploadElement
            * @constructor
            * @return {FlxUploadElement}
            */
            class FlxUploadElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                    * Set when element is attached to DOM
                    * @property webControl {JQuery}
                    */
                    this.connected = false;
                    /**
                    * Upload Value
                    * @property value {string}
                    */
                    this.value = null;
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = $(this);
                    this.connected = true;
                    this.objectName = element.attr("ObjectName");
                    this.objectWhere = element.attr("ObjectWhere");
                    this.moduleName = element.attr("ModuleName");
                    this.processName = element.attr("ProcessName");
                    this.property = element.attr("Property");
                    this.type = element.attr("Type");
                    this.rootPath = element.attr("RootPath") || element.attr("Path");
                    if (this.property) {
                        let parentCtl = element.closest('flx-edit,flx-list,flx-propertymanager,flx-view,flx-filter');
                        if (parentCtl && parentCtl.length > 0) {
                            parentCtl = parentCtl.data('controller');
                            this.options = jQuery.extend(true, {}, parentCtl.properties[this.property]);
                        }
                    }
                    if (element.attr('manualInit') != 'true') {
                        this.init();
                    }
                }
                /**
                * Monitor the list of observed attribute for changes.
                * @property observedAttributes
                */
                static get observedAttributes() {
                    return ['modulename', 'objectname', 'objectwhere', 'processname', 'property', 'type', 'rootpath', 'path'];
                }
                /**
                * Fires when the attribute value of the element is changed.
                * @method attributeChangedCallback
                */
                attributeChangedCallback(attrName, oldVal, newVal) {
                    if (!this.connected) {
                        return;
                    }
                    if (this.connected === true) {
                        let needInit = false;
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
                        else if (attrName.toLowerCase() === 'processname' && newVal && newVal !== '') {
                            this.processName = newVal;
                            needInit = true;
                        }
                        else if (attrName.toLowerCase() === 'property' && newVal && newVal !== '') {
                            this.property = newVal;
                            needInit = true;
                        }
                        else if (attrName.toLowerCase() === 'type' && newVal && newVal !== '') {
                            this.type = newVal;
                            needInit = false;
                        }
                        else if ((attrName.toLowerCase() === 'rootpath' || attrName.toLowerCase() === 'path') && newVal && newVal !== '') {
                            this.rootPath = newVal;
                            needInit = false;
                        }
                        if (needInit) {
                            this.init();
                        }
                    }
                }
                /**
                * Init the webcomponent.
                * @method init
                */
                init() {
                    this.getConfig();
                }
                /**
                * Refresh de webcomponent.
                * @method refresh
                */
                refresh() {
                }
                /**
                * Render HTML data.
                * @method render
                */
                render() {
                    var rendered;
                    rendered = ((this.customCSS) ? `<style>` + this.customCSS + `</style>` : ``) + `
                        <div class="upload-container">
                            <div class="upload-drag-container">
                                <i class="flx-icon icon-upload-1 upload-transition txt-primary icon-4x" flx-fw=""></i>
                            </div>
                        </div>
                        ` + ((this.customScript) ? `<script>` + this.customScript + `</script>` : ``);
                    $(this).html(rendered);
                    $(this).find('div.upload-container').tooltip({ title: flexygo.localization.translate('upload.info'), placement: 'top', trigger: 'hover' });
                    this.mainEvents();
                }
                /**
                * Main events.
                * @method mainEvents
                */
                mainEvents() {
                    let me = $(this);
                    me.removeAttr('manualInit');
                    let ctx = this;
                    var dragDropZone;
                    dragDropZone = me.find('div.upload-container');
                    dragDropZone.off('dragover').on('dragover', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        me.find('div.upload-drag-container').addClass('upload-dragging');
                    });
                    dragDropZone.off('dragleave').on('dragleave', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        me.find('div.upload-drag-container').removeClass('upload-dragging');
                    });
                    dragDropZone.off('drop').on('drop', (e) => {
                        var file;
                        var items;
                        var item;
                        if (e.originalEvent) {
                            items = e.originalEvent.dataTransfer.items;
                            for (let it of items) {
                                item = it.webkitGetAsEntry();
                                if (item) {
                                    traverseFileTree(item, null);
                                }
                            }
                        }
                        e.preventDefault();
                        e.stopPropagation();
                        me.find('div.upload-drag-container').removeClass('upload-dragging');
                    });
                    function traverseFileTree(item, path) {
                        try {
                            path = path || '';
                            if (item.isFile) {
                                item.file(function (file) {
                                    documentReader(file, path);
                                });
                            }
                            else if (item.isDirectory) {
                                var dirReader = item.createReader();
                                dirReader.readEntries(function (entries) {
                                    for (let en of entries) {
                                        traverseFileTree(en, path + item.name + "/");
                                    }
                                });
                            }
                        }
                        catch (ex) {
                            flexygo.msg.error('upload.error');
                        }
                    }
                    function documentReader(file, path) {
                        try {
                            var params;
                            var value;
                            var reader = new FileReader();
                            var name;
                            var extension;
                            name = file.name.substring(0, file.name.lastIndexOf("."));
                            extension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
                            reader.onload = function (e) {
                                if (ctx.type === 'file') {
                                    ctx.rootPath = ctx.rootPath.replace('\\', '/');
                                    if (!ctx.rootPath.endsWith('/') && !path.startsWith('/')) {
                                        path = ctx.rootPath + '/' + path;
                                    }
                                    else {
                                        path = ctx.rootPath + path;
                                    }
                                    params = {
                                        Base64: reader.result.split(',')[1],
                                        Name: file.name,
                                        Path: path,
                                    };
                                    flexygo.ajax.post('~/api/Upload', 'Upload', params, (response) => {
                                        if (response && !response.uploadError) {
                                            flexygo.msg.success('upload.uploaded');
                                            $(document).trigger('upload', [ctx.type, ctx.moduleName, ctx.objectName, ctx.objectWhere, ctx.processName, ctx.property, response.path, name, extension, reader.result]);
                                            ctx.setValue({
                                                type: ctx.type,
                                                moduleName: ctx.moduleName,
                                                objectName: ctx.objectName,
                                                objectWhere: ctx.objectWhere,
                                                processName: ctx.processName,
                                                property: ctx.property,
                                                path: response.path,
                                                name: name,
                                                extension: extension,
                                                base64: reader.result,
                                            });
                                        }
                                        else {
                                            flexygo.msg.error('upload.error');
                                        }
                                    });
                                }
                                else if (ctx.type === 'base64') {
                                    flexygo.msg.success('upload.uploaded');
                                    $(document).trigger('upload', [ctx.type, ctx.moduleName, ctx.objectName, ctx.objectWhere, ctx.processName, ctx.property, path, name, extension, reader.result]);
                                    ctx.setValue({
                                        type: ctx.type,
                                        moduleName: ctx.moduleName,
                                        objectName: ctx.objectName,
                                        objectWhere: ctx.objectWhere,
                                        processName: ctx.processName,
                                        property: ctx.property,
                                        path: path,
                                        name: name,
                                        extension: extension,
                                        base64: reader.result,
                                    });
                                }
                            };
                            reader.readAsDataURL(file);
                        }
                        catch (ex) {
                            flexygo.msg.error('upload.error');
                        }
                    }
                }
                /**
                * Get configuration.
                * @method getConfig
                */
                getConfig() {
                    try {
                        let me = $(this);
                        var defaults;
                        if (this.options) {
                            this.customCSS = this.options.Style;
                            //this.customScript = this.options.;
                            this.rootPath = this.options.RootPath;
                            this.objectName = this.options.ObjectName;
                            this.processName = this.options.ProcessName;
                            this.render();
                        }
                        else {
                            if (this.moduleName) {
                                defaults = {
                                    'ObjectName': this.objectName,
                                    'ObjectWhere': this.objectWhere,
                                    'ModuleName': this.moduleName,
                                    'PageName': flexygo.history.getPageName(me),
                                };
                                flexygo.ajax.post('~/api/Upload', 'GetConfig', defaults, (response) => {
                                    if (response) {
                                        this.customCSS = response.cssText;
                                        this.customScript = response.scriptText;
                                        this.rootPath = response.path;
                                        this.render();
                                    }
                                });
                            }
                            else {
                                this.render();
                            }
                        }
                    }
                    catch (ex) {
                        flexygo.msg.error('upload.error');
                    }
                }
                /**
                * Get value.
                * @method setValue
                */
                setValue(value) {
                    try {
                        var values;
                        if (value != null && value.toString() != '') {
                            values = JSON.parse((this.value) ? this.value : '[]');
                            values.push(value);
                            this.value = JSON.stringify(values);
                        }
                    }
                    catch (ex) {
                        flexygo.msg.error('upload.error');
                    }
                }
                /**
                * Get value.
                * @method getValue
                */
                getValue() {
                    try {
                        return this.value;
                    }
                    catch (ex) {
                        flexygo.msg.error('upload.error');
                    }
                }
            }
            wc.FlxUploadElement = FlxUploadElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define("flx-upload", flexygo.ui.wc.FlxUploadElement);
//# sourceMappingURL=flx-upload.js.map