//FlxFileBrowserElement
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
            * Library for the FlxFileBrowser
            *
            * @class FlxFileBrowser
            * @constructor
            * @return {FlxFileBrowserElement}
            */
            class FlxFileBrowserElement extends HTMLElement {
                constructor() {
                    //If a constructor is defined, is REQUIRED call the super constructor
                    super();
                    /**
                    * Set if element has been connected to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                    /**
                    * Current dir path
                    * @property currentDirPath {string} The current dir
                    */
                    this.currentDirPath = "/";
                }
                /**
                * Array of observed attributes. REQUIRED
                * @property observedAttributes {Array}
                */
                static get observedAttributes() {
                    return ['ObjectName', 'ObjectWhere', 'ModuleName', 'asd'];
                }
                /**
                * Init the webcomponent. REQUIRED.
                * @method init
                */
                init() {
                    this.render();
                }
                /**
                * Refresh de webcomponent. REQUIRED.
                * @method refresh
                */
                refresh() {
                    this.render();
                }
                /**
                * Render HTML data.
                * @method render
                */
                render() {
                    //$(this).html('Hola flexygo');
                    this.getData(this.currentDirPath, "list");
                }
                /**
                 * Renders the header part of the filebrowser
                 * @method renderHeader
                 * @returns {string} The header html
                 */
                renderHeader() {
                    return `<div class="row fb-header">
                    <div class="fb-download-overlay hidden"></div>
                        <div class="row padding-top-0">
                            <div class="col-1 col-l-1 col-m-1">
                                <button type="button" class="btn _clickable btn-default bg-outstanding fb-up">
                                    <i class="fa fa-level-up" flx-fw=""></i><span class="hidden-xs"> ${this.translate("goback")}</span>
                                </button>
                            </div>
                            <div class="col-11 col-l-11 col-m-11 text-center">

                                <button type="button" class="btn btn-default bg-outstanding fb-upload">
                                    <i class="flx-icon icon-upload" flx-fw=""></i><span class="hidden-xs"> ${this.translate("uploadfiles")} </span>
                                </button>
                            <input class="fb-input-upload hide" method="upload" value="disk" type="file" multiple>
                                <button type="button" method="opendialog" value="upload" class="btn btn-default bg-outstanding fb-add">
                                    <i class="flx-icon icon-folder-add"></i><span class="hidden-xs"> ${this.translate("addfolder")}
                                    </span>
                                </button>
                                <button type="button" class="btn btn-default bg-outstanding fb-download" disabled>
                                    <i class="flx-icon icon-download"></i><span class="hidden-xs"> ${this.translate("download")}
                                    </span>
                                </button>
                                
                                <button type="button" class="btn btn-default bg-outstanding fb-delete" disabled>
                                    <i class="flx-icon icon-delete-2"></i><span class="hidden-xs"> ${this.translate("delete")}
                                    </span>
                                </button>
                                
                                
                            </div>
                        </div>

                        <div class="row fb-path-info" >
                            <div class="col-12 col-l-12 col-m-12 text-center">
                                <span> ${this.translate('currentfolder')}: ${this.currentDirPath} </span>

                            </div>
                        </div>
                    </div>`;
                }
                /**
                 * Renders the header part of the filebrowser
                 * @method renderFooter
                 * @returns {string} The footer html
                 */
                renderFooter() {
                    let itemsSelectedTranslation = this.translate('itemsselected');
                    return `<div class="fb-footer"><span class="fb-info-selected">0 ${itemsSelectedTranslation}</span></div>`;
                }
                /**
                * Calls controller and execute action
                * @method getData
                * @param path {string} The path to use
                * @param actionType {string} The action to execute
                */
                getData(path, actionType) {
                    let me = $(this);
                    let rendered = `<div class="flx-filebrowser" style="height: 100%">`;
                    //rendered += `<a href="https://docs.google.com/viewer/viewer?url=http://localhost:63083/custom/documents/BBDD_Access_IVO.docx">Test </a>
                    //    <a href="https://docs.google.com/viewer/viewer?url=https://calibre-ebook.com/downloads/demos/demo.docx"> Test2</a>
                    //`
                    let params = {
                        ObjectName: me.attr('ObjectName'),
                        ObjectWhere: me.attr('ObjectWhere'),
                        ModuleName: this.moduleName,
                        Path: path,
                        ActionType: actionType,
                        SelectedEntries: this.selectedEntries,
                        NewFolderName: this.newFolderName
                    };
                    flexygo.ajax.post('~/api/FileBrowser', 'getData', params, (response) => {
                        if (response) {
                            rendered += this.renderHeader();
                            if (response.length == 0) {
                                rendered += `<div class="dir-entry dir-empty">
                                            <div class="dir-icon">
                                                <i class="transition-all dir flx-icon icon-folder icon-5x"></i>
                                            </div>
                                            <div class="dir-name">${this.translate('emptyfolder')}</div>
                                        </div>`;
                            }
                            else {
                                response
                                    .sort((a, b) => a.Type - b.Type)
                                    .forEach(value => {
                                    if (value.Type == 0) {
                                        let dirpath = this.currentDirPath + value.Name;
                                        rendered += `
                                        <div class="dir-entry animated fadeIn">
                                            <div class="dir-icon">
                                                <i data-path="${dirpath}"
                                                    class="clickable transition-all dir flx-icon icon-folder icon-5x">
                                                </i>
                                            </div>
                                            <div class="dir-name">${value.Name}</div>
                                            <div class="fb-check"></div>
                                        </div>`;
                                    }
                                    else {
                                        let filepath = this.currentDirPath + value.Name;
                                        if (this.isImage(value.Name)) {
                                            rendered += `
                                            <div class="dir-entry animated fadeIn">
                                                <div class="dir-img shadow clickable transition-all image"><img data-path="${filepath}"
                                                    src="${value.Url.split("/").splice(1).join("/")}"></div>
                                                <div class="dir-name">${value.Name.toLowerCase()}</div>
                                                <div class="fb-check"></div>
                                            </div>`;
                                        }
                                        else {
                                            rendered += `
                                    <div class="dir-entry animated fadeIn ${value.Name == 'flx-download.zip' ? 'hidden' : ''}">
                                        <div class="dir-icon"><a href="${value.Url.split("/").splice(1).join("/")}"><i data-path="${filepath}" class="clickable file transition-all ${flexygo.utils.getFileIcon(value.Name.split(".").pop())} icon-4x"></i></a>
                                        </div>
                                        <div class="dir-name">${value.Name}</div>
                                        <div class="fb-check"></div>
                                    </div>`;
                                        }
                                    }
                                });
                            }
                            rendered += `</div>`; // Cerramos
                            rendered += this.renderFooter();
                            //rendered += `${this.renderFooter()}`
                            me.html(rendered);
                            this.setupEvents();
                        }
                    });
                }
                translate(str) {
                    return flexygo.localization.translate(`flxfilebrowser.${str}`);
                }
                startFileUpload(files) {
                    let filesInDir = [];
                    let found = [];
                    this.filesPending = files.length;
                    this.filesTotal = this.filesPending;
                    // Get all filenames in dir 
                    $(".clickable.file", this).each((i, element) => {
                        let filenameParts = $(element).data("path").split("/");
                        filesInDir.push(filenameParts[filenameParts.length - 1]);
                    });
                    $("img", this).each((i, element) => {
                        let filenameParts = $(element).data("path").split("/");
                        filesInDir.push(filenameParts[filenameParts.length - 1]);
                    });
                    // Check if any file to upload exists in dir
                    for (let i = 0; i < files.length; i++) {
                        let filename = files[i].name;
                        if (filesInDir.indexOf(filename) != -1) {
                            found.push(filename);
                        }
                    }
                    // If we found existing files
                    if (found.length > 0) {
                        let msg = `
                        <div>${this.translate('existingfiles')}</div>
                        <div>${this.translate('overwritefiles')}</div>`;
                        flexygo.msg.confirm(msg, shouldProceed => {
                            if (shouldProceed) {
                                this.disableEvents();
                                for (let i = 0; i < files.length; i++) {
                                    let fileUpload = new flexygo.io.FileUpload(files[i], "diskfile", "upload", this);
                                    fileUpload.startUpload();
                                }
                            }
                        });
                    }
                    else {
                        this.disableEvents();
                        for (let i = 0; i < files.length; i++) {
                            let fileUpload = new flexygo.io.FileUpload(files[i], "diskfile", "upload", this);
                            fileUpload.startUpload();
                        }
                    }
                }
                disableEvents() {
                    let me = $(this);
                    $(".fb-download-overlay", me).toggleClass("hidden");
                    $(".clickable", me).css("opacity", "0.3");
                    $(".fb-delete", me).prop("disabled", true);
                    $(".fb-download", me).prop("disabled", true);
                    $(".fb-upload", me).prop("disabled", true);
                    $(".fb-add", me).prop("disabled", true);
                    $(".fb-up", me).prop("disabled", true);
                }
                setupEvents() {
                    let me = $(this);
                    // On dir entry click    
                    $(".clickable.dir", me).on("click", e => {
                        let t = $(e.target);
                        let dirpath = t.data("path");
                        this.currentDirPath = dirpath + "/";
                        this.getData(dirpath, "list");
                    });
                    // On image entry click
                    $(".clickable.image", me).on("click", e => {
                        let t = $(e.target);
                        let src = t.prop("src");
                        let imageContainer = $(`<div class=""><img class="img-responsive" src="${src}"></div>`);
                        // Create dialog with the preview
                        imageContainer.dialog({
                            position: { my: "center top", at: "center top+70", of: $('body') },
                            width: "auto",
                            height: "auto",
                            modal: true,
                            open: (e) => {
                                if ($(window).width() < 600) {
                                    $(this).parent().css("max-width", "100%");
                                }
                                else {
                                    $(this).parent().css("max-width", "auto");
                                }
                            },
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
                    });
                    // On dir entry delete
                    $(".fb-delete", me).on("click", e => {
                        let msg = `<div>${this.translate('saving')} (${this.selectedEntries.length}) ${this.translate('items')}</div>
                           <div>${this.translate('sure')}</div>`;
                        flexygo.msg.confirm(msg, shouldDelete => {
                            if (shouldDelete) {
                                this.getData(this.currentDirPath, "remove");
                            }
                        });
                    });
                    // On download
                    $(".fb-download", me).on("click", e => {
                        this.disableEvents();
                        let downloadButton = $(".fb-download", me);
                        downloadButton.fadeOut("fast", e => {
                            downloadButton.html(`<i class='dir flx-icon icon-sincronize icon-spin'></i><span class='hidden-xs'> ${this.translate("processingdownload")}</span>`);
                            downloadButton.fadeIn("slow");
                        });
                        this.getData(this.currentDirPath, "download");
                    });
                    // On upload btn click we force event on upload input 
                    $(".fb-upload", me).on("click", e => {
                        $(".fb-input-upload", me).click();
                    });
                    // On upload input change
                    $(".fb-input-upload", me).on("change", e => {
                        let files = $(".fb-input-upload", me).prop("files");
                        this.startFileUpload(files);
                    });
                    $(".fb-up", me).on("click", e => {
                        this.currentDirPath = this.currentDirPath.split("/").slice(0, -2).join("/") + "/";
                        this.getData(this.currentDirPath, "list");
                    });
                    $(".fb-add", me).on("click", e => {
                        flexygo.msg.prompt("New folder", "Name of new folder", (input) => {
                            this.newFolderName = input;
                            if (!flexygo.utils.isBlank(this.newFolderName)) {
                                this.getData(this.currentDirPath, "add");
                            }
                        }, "Name of new folder", "");
                    });
                    $(".fb-check", me).on("click", e => {
                        $(e.target).toggleClass("fb-check-selected");
                        this.selectedEntries = $.makeArray($(".fb-check-selected", me).map(function () {
                            let parent = $(this).parent();
                            let path = $("[data-path]", parent).data("path");
                            return path;
                        }));
                        let itemsSelectedTranslation = this.translate('itemsselected');
                        $(".fb-info-selected", me).html(`${this.selectedEntries.length} ${itemsSelectedTranslation}`);
                        if (this.selectedEntries.length > 0) {
                            $(".fb-delete", me).prop("disabled", false);
                            $(".fb-download", me).prop("disabled", false);
                        }
                        else {
                            $(".fb-delete", me).prop("disabled", true);
                            $(".fb-download", me).prop("disabled", true);
                        }
                    });
                    let dragDropZone = $(".flx-filebrowser", me);
                    dragDropZone.on('dragover', (e) => {
                        dragDropZone.css('background-color', 'rgba(0,0,0,0.1)');
                    }).on('dragleave', (e) => {
                        dragDropZone.css('background-color', '');
                    }).on('drop', (e) => {
                        e.preventDefault();
                        dragDropZone.css('background-color', '');
                        let dragEvent = e.originalEvent;
                        let files = dragEvent.dataTransfer.files;
                        if (files.length > 0) {
                            this.startFileUpload(files);
                        }
                    });
                    // If the file flx-download.zip exists download it
                    let downloadFile = $('[data-path*="flx-download.zip"]', me).parent();
                    if (downloadFile.prop("href")) {
                        location.href = downloadFile.prop("href");
                    }
                    if (this.currentDirPath == "/") {
                        $(".fb-up", me).prop("disabled", true);
                    }
                    else {
                        $(".fb-up", me).prop("disabled", false);
                    }
                }
                isImage(file) {
                    let ext = file.split(".").pop().toLowerCase();
                    switch (ext) {
                        case "png":
                        case "jpg":
                        case "jpeg":
                        case "gif":
                            return true;
                        default:
                            return false;
                    }
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
                    this.init();
                }
                /**
                * Fires when the attribute value of the element is changed.
                * @method attributeChangedCallback
                */
                attributeChangedCallback(attrName, oldVal, newVal) {
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
                    if (this.connected && needInit) {
                        this.init();
                    }
                }
            }
            wc.FlxFileBrowserElement = FlxFileBrowserElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
(function (flexygo) {
    var io;
    (function (io) {
        class FileUpload {
            constructor(file, type, action, manager) {
                this.bufferSize = 2 * 1024 * 1024;
                this.currentPosition = 0;
                this.file = file;
                this.objectName = manager.objectName;
                this.objectWhere = manager.objectWhere;
                this.moduleName = manager.moduleName;
                this.manager = manager;
                this.documentType = type;
                this.action = action;
                this.currentDirPath = manager.currentDirPath;
            }
            startUpload() {
                this.reader = new FileReader();
                this.reader.onloadend = (event) => {
                    if (event.target.readyState !== 2) {
                        return;
                    }
                    if (this.file.size == 0) {
                        if (this.documentId != '') {
                            this.removeDocument();
                        }
                        // TODO: Notify errors
                        return;
                    }
                    if (this.file.size > this.bufferSize) {
                        //El envio es multipart
                        if (this.currentPosition == 0) {
                            this.setDocument(event.target.result, this.file.name, true);
                        }
                        else {
                            if (this.currentPosition < this.file.size) {
                                // Update upload progress
                                let lastAppend = !(this.currentPosition + this.bufferSize < this.file.size);
                                this.appendToDocument(event.target.result, this.file.name, lastAppend);
                            }
                            else {
                                // Update upload progress
                                //console.log("this.manager.filesPending", this.manager.filesPending)
                                if (this.manager.filesPending == 0) {
                                    this.manager.getData(this.manager.currentDirPath, "list");
                                    flexygo.msg.success('flxfilebrowser.saved');
                                }
                            }
                        }
                    }
                    else {
                        //El envio es completo
                        this.setDocument(event.target.result, this.file.name, false);
                    }
                };
                this.upload_file();
            }
            percentDone() {
                let percent = Math.floor((this.currentPosition / this.file.size) * 100);
                if (percent >= 100) {
                    this.manager.filesPending--;
                }
                return percent > 100 ? 100 : percent;
            }
            upload_file() {
                let blob = this.file.slice(this.currentPosition, this.currentPosition + this.bufferSize);
                this.reader.readAsDataURL(blob);
            }
            appendToDocument(base64, documentName, lastAppend) {
                try {
                    let me = $(this);
                    let params;
                    if (base64) {
                        base64 = base64.split(',')[1];
                    }
                    else {
                        base64 = null;
                    }
                    params = {
                        'ObjectName': this.objectName,
                        'ObjectWhere': this.objectWhere,
                        'ModuleName': this.moduleName,
                        'DocumentId': this.documentId,
                        'DocumentName': documentName,
                        'Base64': base64,
                        'LastAppend': lastAppend,
                        'CurrentPath': this.currentDirPath
                    };
                    flexygo.ajax.post('~/api/FileBrowser', 'AppendToDocument', params, (response) => {
                        this.currentPosition += this.bufferSize;
                        this.upload_file();
                        $(this.manager).find(`.fb-progress[data-progress="${documentName}"]`).html(`
                            <flx-timeline-progressbar percentage="${this.percentDone()}"></flx-timeline-progressbar>`);
                    }, () => {
                        this.removeDocument();
                    });
                }
                catch (ex) {
                    console.log(ex);
                }
            }
            setDocument(base64, documentName, multipart) {
                try {
                    let me = $(this);
                    let params;
                    if (base64) {
                        base64 = base64.split(',')[1];
                    }
                    else {
                        base64 = null;
                    }
                    if ((this.documentType.toLowerCase() === "diskfile" || this.documentType.toLowerCase() === "diskfolder") && !base64) {
                        flexygo.msg.warning('flxfilebrowser.documentempty');
                        return;
                    }
                    params = {
                        'ObjectName': this.objectName,
                        'ObjectWhere': this.objectWhere,
                        'ModuleName': this.moduleName,
                        'ObjectId': null,
                        'DocumentName': documentName,
                        'DocumentType': this.documentType,
                        'Base64': base64,
                        'CloudId': null,
                        'CloudLink': null,
                        'DownloadLink': null,
                        'DocAction': this.action,
                        'PartialUpload': multipart,
                        'CurrentPath': this.currentDirPath
                    };
                    this.manager.getElementsByClassName("fb-footer")[0].scrollIntoView({ block: 'end', behavior: 'smooth' });
                    flexygo.ajax.post('~/api/FileBrowser', 'SetDocument', params, (response) => {
                        if (multipart) {
                            let insertionPoint = $(this.manager).find(".dir-entry").last();
                            insertionPoint.after(`
                                    <div class="dir-entry animated bounceIn">
                                        <div class="dir-icon dir-upload"></div>
										<div class="fb-progress" data-progress="${documentName}"><flx-timeline-progressbar _color="#0b5ba1" percentage="${this.percentDone()}"></flx-timeline-progressbar></div>
                                        <div class="dir-name">${documentName}</div>
                                    </div>`);
                            this.currentPosition += this.bufferSize;
                            this.upload_file();
                        }
                        else {
                            if (response && !response.documentError) {
                                let insertionPoint = $(this.manager).find(".dir-entry").last();
                                insertionPoint.after(`
                                    <div class="dir-entry animated bounceIn">
                                        <div class="dir-icon dir-upload"></div>
										<div class="fb-progress" data-progress="${documentName}"><flx-timeline-progressbar _color="#0b5ba1" percentage="100"></flx-timeline-progressbar></div>
                                        <div class="dir-name">${documentName}</div>
                                    </div>`);
                                //console.log("this.manager.filesPending", this.manager.filesPending)
                                this.manager.filesPending--;
                                if (this.manager.filesPending == 0) {
                                    this.manager.getData(this.manager.currentDirPath, "list");
                                    flexygo.msg.success('flxfilebrowser.saved');
                                }
                            }
                            else {
                                if (!response.permissionError) {
                                    flexygo.msg.error('flxfilebrowser.errorsaving');
                                }
                                else {
                                    flexygo.msg.warning('flxfilebrowser.permissionerror');
                                }
                            }
                        }
                    });
                    //}
                }
                catch (ex) {
                    console.log(ex);
                }
            }
            removeDocument() {
                try {
                    let params;
                    params = {
                        'ObjectName': this.objectName,
                        'ObjectWhere': this.objectWhere,
                        'ModuleName': this.moduleName
                    };
                    flexygo.ajax.post('~/api/FileBrowser', 'RemoveDocument', params, (response) => {
                        if (response.documentError) {
                            if (!response.permissionError) {
                                flexygo.msg.error('flxfilebrowser.errorremoving');
                            }
                            else {
                                flexygo.msg.warning('flxfilebrowser.permissionerror');
                            }
                        }
                    });
                }
                catch (ex) {
                    console.log(ex);
                }
            }
        }
        io.FileUpload = FileUpload;
    })(io = flexygo.io || (flexygo.io = {}));
})(flexygo || (flexygo = {}));
window.customElements.define("flx-filebrowser", flexygo.ui.wc.FlxFileBrowserElement);
//# sourceMappingURL=flx-filebrowser.js.map