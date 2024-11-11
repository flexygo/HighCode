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
                    /**
                    * Composer Attachment Template
                    * @property composerAttachmentTemplate {string}
                    */
                    /**
                    * Control Mode
                    * @property type {string}
                    */
                    this.mode = 'object';
                    this.uploadFileTemplate = (fileId, name, extension, base64) => `<div class="upload-file" upload-file-id="${fileId}">
                                                                                                                                    <div>
                                                                                                                                        <i class="size-l fa ${flexygo.utils.getFileIcon(extension)}"/>
                                                                                                                                        <small>${name}</small>
                                                                                                                                    </div>
                                                                                                                                    <div>
                                                                                                                                        <a href="${base64}" download="${name + extension}">
                                                                                                                                            <i class="flx-icon icon-download-1 upload-file-download"></i>
                                                                                                                                        </a>
                                                                                                                                        <i class="flx-icon icon-close-2 upload-file-delete"></i>
                                                                                                                                    </div>
                                                                                                                                 </div>`;
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
                            this.options = jQuery.extend(true, {}, parentCtl[0].properties[this.property]);
                            if (parentCtl[0].mode) {
                                this.mode = parentCtl[0].mode;
                            }
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
                observedAttributes() {
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
                * Fires when element is detached to DOM
                * @method disconnectedCallback
                */
                disconnectedCallback() {
                }
                /**
                * Init the webcomponent.
                * @method init
                */
                init() {
                    return this.getConfig();
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
                    let renderMode = $(this).attr("mode");
                    renderMode = flexygo.utils.isBlank(renderMode) ? "edit" : renderMode.toLowerCase();
                    rendered = `${(this.customCSS) ? `<style>${this.customCSS}</style>` : ``}
                        <div class="upload-container" style="${(this.options && this.options.Locked) ? 'cursor: no-drop' : ''}">
                            <div class="upload-drag-container">
                                <span class="txt-primary">
                                    <i class="flx-icon icon-upload-1"/> ${flexygo.localization.translate('upload.info')}
                                </span>
                                <div class="uploaded-flies">
                                </div>
                            </div>
                               
                             ${(this.options && this.options.Locked) ? '' : `<label class="btn upload-btn${renderMode == "preview" ? " disabled" : ""}">
                               <i class="fa fa-search"></i><input type="file" accept="${accept}" class="hide" multiple/>
                                   </label>`}
                        </div>
                        ${(this.customScript) ? `<script>` + this.customScript + `</script>` : ``}`;
                    $(this).html(rendered);
                    $(this).find('div.upload-container > *').css("pointer-events", "none");
                    if (renderMode !== 'preview') {
                        this.mainEvents();
                    }
                    let wcModule = this.closest('flx-module');
                    if (wcModule) {
                        wcModule.moduleLoaded(this);
                    }
                }
                /**
                * Main events.
                * @method mainEvents
                */
                mainEvents() {
                    let me = $(this);
                    me.removeAttr('manualInit');
                    $(this).closest('flx-module').find('.flx-noInitContent').remove();
                    let ctx = this;
                    if (this.options && this.options.Locked) {
                        return;
                    }
                    var dragDropZone;
                    dragDropZone = me.find('div.upload-container');
                    me.find('input[type = "file"]').off('input.upload').on('input.upload', (e) => {
                        try {
                            let promises = [];
                            me.find('div.upload-drag-container').addClass('upload-uploading');
                            me[0].paintUploadingFiles(me);
                            for (let it of e.currentTarget.files) {
                                let promise = documentReader(it, '').then((notuploaded) => {
                                    return notuploaded;
                                });
                                promises.push(promise);
                            }
                            Promise.all(promises).then((results) => {
                                const errorUploadFileCounter = results.reduce((acc, current) => {
                                    if (current === false) {
                                        return acc + 1;
                                    }
                                    return acc;
                                }, 0);
                                if (errorUploadFileCounter > 0) {
                                    flexygo.msg.warning(`${errorUploadFileCounter} files failed in uploading process`);
                                }
                                me[0].removeUploadingFiles($(this));
                                me.find('div.upload-drag-container').removeClass('upload-uploading');
                            }).catch((error) => {
                                me[0].removeUploadingFiles($(this));
                                me.find('div.upload-drag-container').removeClass('upload-uploading');
                                flexygo.msg.error(error);
                            });
                        }
                        catch (ex) { }
                    });
                    me.off('upload.upload').on('upload.upload', (event, fileId, type, moduleName, objectName, objectWhere, processName, property, path, name, extension, base64) => {
                        $(ctx.uploadFileTemplate(fileId, name, extension, base64)).appendTo(me.find('.upload-drag-container > .uploaded-flies')).find('.upload-file-delete').off('click.upload').on('click.upload', (e) => {
                            var _a, _b;
                            let fileElement = $(e.currentTarget).closest('.upload-file');
                            let fileId = fileElement.attr('upload-file-id');
                            let values;
                            values = JSON.parse(this.value);
                            values.splice(parseInt(fileId), 1);
                            this.value = JSON.stringify(values);
                            fileElement.remove();
                            const input = me.find('.upload-btn input[type="file"]')[0];
                            let uploadedFiles = (_a = me.find('.upload-btn input[type="file"]')[0]) === null || _a === void 0 ? void 0 : _a.files;
                            const dt = new DataTransfer();
                            for (let file of uploadedFiles) {
                                if (file.name != ((_b = fileElement.find('a')) === null || _b === void 0 ? void 0 : _b.attr('download'))) {
                                    dt.items.add(file);
                                }
                            }
                            input.files = dt.files;
                        });
                    });
                    dragDropZone.off('mouseenter.upload').on('mouseenter.upload', () => {
                        me.find('div.upload-container > *').css("pointer-events", "auto");
                    });
                    dragDropZone.off('mouseleave.upload').on('mouseleave.upload', () => {
                        me.find('div.upload-container > *').css("pointer-events", "none");
                    });
                    dragDropZone.off('dragover.upload').on('dragover.upload', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (e.originalEvent && e.originalEvent.dataTransfer) {
                            e.originalEvent.dataTransfer.dropEffect = 'copy';
                        }
                        me.find('div.upload-drag-container').addClass('upload-dragging');
                    });
                    dragDropZone.off('dragleave.upload').on('dragleave.upload', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (e.originalEvent && e.originalEvent.dataTransfer) {
                            e.originalEvent.dataTransfer.dropEffect = 'copy';
                        }
                        me.find('div.upload-drag-container').removeClass('upload-dragging');
                    });
                    dragDropZone.off('drop.upload').on('drop.upload', (e) => {
                        var file;
                        var items;
                        var item;
                        try {
                            if (e.originalEvent && e.originalEvent.dataTransfer) {
                                me.find('div.upload-drag-container').addClass('upload-uploading');
                                me[0].paintUploadingFiles(me);
                                e.originalEvent.dataTransfer.dropEffect = 'copy';
                                items = e.originalEvent.dataTransfer.items;
                                //array of async values (1 if was an upload error 0 if was uploaded)
                                let promises = [];
                                for (let it of items) {
                                    let item = it.webkitGetAsEntry();
                                    if (item) {
                                        let promise = traverseFileTree(item, null).then((notuploaded) => {
                                            return notuploaded;
                                        });
                                        promises.push(promise);
                                    }
                                }
                                //wait until all async values are resolved
                                Promise.all(promises)
                                    .then((results) => {
                                    const errorUploadFileCounter = results.reduce((total, notuploaded) => total + notuploaded, 0);
                                    if (errorUploadFileCounter > 0) {
                                        flexygo.msg.warning(`${errorUploadFileCounter} files failed in uploading process`);
                                    }
                                    me[0].removeUploadingFiles($(this));
                                    me.find('div.upload-drag-container').removeClass('upload-dragging');
                                    me.find('div.upload-drag-container').removeClass('upload-uploading');
                                })
                                    .catch((error) => {
                                    me[0].removeUploadingFiles($(this));
                                    me.find('div.upload-drag-container').removeClass('upload-uploading');
                                    flexygo.msg.error(error);
                                });
                            }
                            e.preventDefault();
                        }
                        catch (ex) {
                            me[0].removeUploadingFiles($(this));
                            me.find('div.upload-drag-container').removeClass('upload-uploading');
                        }
                    });
                    function traverseFileTree(item, path, errorUploadFileCounter = 0) {
                        return __awaiter(this, void 0, void 0, function* () {
                            try {
                                path = path || '';
                                if (item.isFile) {
                                    const file = yield new Promise((resolve, reject) => {
                                        item.file(resolve, reject);
                                    });
                                    const uploaded = yield documentReader(file, path);
                                    if (!uploaded) {
                                        return errorUploadFileCounter + 1;
                                    }
                                    else {
                                        return errorUploadFileCounter;
                                    }
                                }
                                else if (item.isDirectory) {
                                    let dirReader = item.createReader();
                                    let entries = yield new Promise((resolve, reject) => {
                                        dirReader.readEntries(resolve, reject);
                                    });
                                    for (const entry of entries) {
                                        errorUploadFileCounter = yield traverseFileTree(entry, path + item.name + "/", errorUploadFileCounter);
                                    }
                                    return errorUploadFileCounter;
                                }
                            }
                            catch (ex) {
                                return errorUploadFileCounter + 1;
                            }
                        });
                    }
                    /**
                     * documentReader
                     * @param file
                     * @param path
                     * @returns async value that determines whether or not the file has been uploaded
                     */
                    function documentReader(file, path) {
                        return __awaiter(this, void 0, void 0, function* () {
                            try {
                                var params;
                                var value;
                                var reader = new FileReader();
                                var name;
                                var extension;
                                name = file.name.substring(0, file.name.lastIndexOf("."));
                                extension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
                                //uploaded gets value asynchronously because a message can be made which determines whether the file was uploaded or not
                                let uploaded = new Promise((resolve) => {
                                    reader.onload = function (e) {
                                        let fileId;
                                        let uploaded = false;
                                        if (ctx.type === 'file') {
                                            ctx.rootPath = ctx.rootPath.replace('\\', '/');
                                            if (!ctx.rootPath.endsWith('/') && !path.startsWith('/')) {
                                                path = ctx.rootPath + '/' + path;
                                            }
                                            else {
                                                path = ctx.rootPath + path;
                                            }
                                            let objectName = null;
                                            let propertyName = null;
                                            let formValues = [];
                                            if (ctx.options) {
                                                let module = $(ctx).closest('flx-edit');
                                                if (module.length > 0) {
                                                    let props = module.find('[property]');
                                                    if (props.length > 0) {
                                                        for (var i = 0; i < props.length; i++) {
                                                            let prop = $(props[i])[0];
                                                            formValues.push({ "key": prop.property, "value": prop.getValue() });
                                                        }
                                                    }
                                                }
                                                objectName = ctx.options.ProcessName || ctx.options.ReportName || ctx.options.ObjectName;
                                                propertyName = ctx.options.Name;
                                            }
                                            params = {
                                                Base64: reader.result.split(',')[1],
                                                Name: file.name,
                                                Path: path,
                                                Mode: ctx.mode,
                                                ObjectName: objectName,
                                                PropertyName: propertyName,
                                                FormValues: formValues,
                                            };
                                            flexygo.ajax.post('~/api/Upload', 'Upload', params, (response) => {
                                                if (response && !response.uploadError) {
                                                    fileId = ctx.setValue({
                                                        type: ctx.type,
                                                        moduleName: ctx.moduleName,
                                                        objectName: ctx.objectName,
                                                        objectWhere: ctx.objectWhere,
                                                        processName: ctx.processName,
                                                        property: ctx.property,
                                                        path: response.path,
                                                        name: name,
                                                        extension: extension,
                                                        //base64: reader.result,
                                                    });
                                                    if (ctx.options && ctx.options.CauseRefresh) {
                                                        let ev = {
                                                            class: "property",
                                                            type: "changed",
                                                            sender: ctx,
                                                            masterIdentity: ctx.property
                                                        };
                                                        flexygo.events.trigger(ev, me);
                                                    }
                                                    uploaded = true;
                                                }
                                                else {
                                                    uploaded = false;
                                                }
                                                me.trigger('upload', [fileId - 1, ctx.type, ctx.moduleName, ctx.objectName, ctx.objectWhere, ctx.processName, ctx.property, response.path, name, extension, reader.result]);
                                                //return async value
                                                resolve(uploaded);
                                            });
                                        }
                                        else if (ctx.type === 'base64') {
                                            let extns = ctx.options.Extensions.toLowerCase().split("|");
                                            if (extns.indexOf(extension) > -1 || ctx.options.ExtensionId == 'sysAll') {
                                                fileId = ctx.setValue({
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
                                                me.trigger('upload', [fileId - 1, ctx.type, ctx.moduleName, ctx.objectName, ctx.objectWhere, ctx.processName, ctx.property, path, name, extension, reader.result]);
                                                //return async value
                                                resolve(true);
                                            }
                                            else {
                                                //return async value
                                                resolve(false);
                                            }
                                        }
                                    };
                                });
                                reader.readAsDataURL(file);
                                return uploaded;
                            }
                            catch (ex) {
                                return false;
                            }
                        });
                    }
                }
                paintUploadingFiles(input) {
                    let containerItem = input.parent();
                    containerItem.addClass("flx-relative");
                    let editForm = containerItem.find('form');
                    editForm.addClass('flx-opacity');
                    if (containerItem.find('#flx-dependency-loader').length == 0) {
                        containerItem.append('<div id="flx-dependency-loader"></div>');
                    }
                }
                removeUploadingFiles(input) {
                    let containerItem = input.parent();
                    containerItem.removeClass("flx-relative");
                    let editForm = containerItem.find('form');
                    editForm.removeClass('flx-opacity');
                    containerItem.find('#flx-dependency-loader').remove();
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
                            return;
                        }
                        else {
                            if (this.moduleName) {
                                return new Promise((resolve, _) => {
                                    defaults = {
                                        'ObjectName': this.objectName,
                                        'ObjectWhere': this.objectWhere,
                                        'ModuleName': this.moduleName,
                                        'PageName': flexygo.history.getPageName(me),
                                    };
                                    flexygo.ajax.post('~/api/Upload', 'GetConfig', defaults, 
                                    //Success Function
                                    (response) => {
                                        if (response) {
                                            this.customCSS = response.cssText;
                                            this.customScript = response.scriptText;
                                            this.rootPath = response.path;
                                            this.render();
                                        }
                                        resolve();
                                    }, 
                                    //Error Function
                                    err => {
                                        let wcModule = this.closest('flx-module');
                                        flexygo.utils.modules.loadingErrorFunction(wcModule, err);
                                        wcModule.moduleLoaded(this);
                                        resolve();
                                    });
                                });
                            }
                            else {
                                this.render();
                                return;
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
                        let values;
                        let position;
                        if (typeof value == 'string') {
                            this.value = value;
                        }
                        else if (value != null && value.toString() != '') {
                            values = JSON.parse((this.value) ? this.value : '[]');
                            position = values.push(value);
                            this.value = JSON.stringify(values);
                            return position;
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