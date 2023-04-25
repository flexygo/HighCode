/**
 * @namespace flexygo.ui.wc
 */
//TODO_AL: temporal
/////////////////////////////////////////////////////////////PRUEBAS AL
var flexygo;
(function (flexygo) {
    var ui;
    (function (ui) {
        var wc;
        (function (wc) {
            /**
            * Library for the flx-DocumentManagerElement web component.
            *
            * @class FlxDependencyManagerElement
            * @constructor
            * @return {FlxDocumentManagerElement} .
            */
            class FlxDocumentManagerElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                    * Set when component is attached to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                    /**
                    * Default document category
                    * @property categoryId {string}
                    */
                    this.categoryId = null;
                    /**
                    * Additional document filter
                    * @property additionalWhere {string}
                    */
                    this.additionalWhere = null;
                    this.managerMode = 'flexygo';
                    this.type = 'edit';
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = $(this);
                    this.connected = true;
                    this.objectName = element.attr('ObjectName');
                    this.objectWhere = element.attr('ObjectWhere');
                    this.objectId = element.attr('ObjectId');
                    this.moduleName = element.attr('ModuleName');
                    this.managerMode = element.attr('mode');
                    if (element.attr('type')) {
                        this.type = element.attr('type');
                    }
                    if (element.attr('manualInit') != 'true') {
                        this.init();
                    }
                }
                /**
                * Fires when element is detached to DOM
                * @method disconnectedCallback
                */
                disconnectedCallback() {
                    //Remove event handler
                    flexygo.events.off(this, "entity", "all", this.onEntityUpdate);
                }
                /**
                * Monitor the list of observed attribute for changes.
                * @property observedAttributes
                */
                static get observedAttributes() {
                    return ['modulename', 'objectname', 'objectwhere', 'objectid', 'mode'];
                }
                /**
                * Fires when the attribute value of the element is changed.
                * @method attributeChangedCallback
                */
                attributeChangedCallback(attrName, oldVal, newVal) {
                    if (!this.connected) {
                        return;
                    }
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
                    else if (attrName.toLowerCase() == 'objectid' && newVal && newVal != '') {
                        this.objectId = newVal;
                        needInit = true;
                    }
                    else if (attrName.toLowerCase() == 'mode' && newVal && newVal != '') {
                        this.managerMode = newVal;
                        needInit = true;
                    }
                    if (needInit) {
                        this.init();
                    }
                }
                /**
                * Init the webcomponent.
                * @method init
                */
                init() {
                    //Capture events from entity modification
                    flexygo.events.on(this, "entity", "all", this.onEntityUpdate);
                    try {
                        let me = $(this);
                        me.removeAttr('manualInit');
                        $(this).closest('flx-module').find('.flx-noInitContent').remove();
                        var defString;
                        var defObject;
                        defString = flexygo.history.getDefaults(this.objectName, me);
                        defObject = JSON.parse(flexygo.utils.parser.replaceAll(defString, "'", '"'));
                        let wcModule = me.closest('flx-module')[0];
                        if (this.managerMode == 'flexygo') {
                            this.rObjectName = (this.objectName && this.objectId) ? this.objectName : (defObject && defObject.ObjectName) ? defObject.ObjectName : (wcModule.objectdefaults) ? wcModule.objectdefaults.ObjectName : '';
                            this.rObjectId = (this.objectName && this.objectId) ? this.objectId : (defObject && defObject.ObjectId) ? defObject.ObjectId : (wcModule.objectdefaults) ? wcModule.objectdefaults.ObjectId : '';
                            if (defObject && defObject.CategoryId) {
                                this.categoryId = defObject.CategoryId;
                            }
                            else if (wcModule.objectdefaults && wcModule.objectdefaults.CategoryId) {
                                this.categoryId = wcModule.objectdefaults.CategoryId;
                            }
                        }
                        else {
                            this.rObjectName = (this.objectName && this.objectId) ? this.objectName : (defObject && defObject.Tabla) ? defObject.Tabla : (wcModule.objectdefaults) ? wcModule.objectdefaults.Tabla : '';
                            this.rObjectId = (this.objectName && this.objectId) ? this.objectId : (defObject && defObject.IdDoc) ? defObject.IdDoc : (wcModule.objectdefaults) ? wcModule.objectdefaults.IdDoc : '';
                            if (defObject && defObject.IdClasificacion) {
                                this.categoryId = defObject.IdClasificacion;
                            }
                            else if (wcModule.objectdefaults && wcModule.objectdefaults.IdClasificacion) {
                                this.categoryId = wcModule.objectdefaults.IdClasificacion;
                            }
                        }
                        if (defObject && defObject.additionalWhere) {
                            this.additionalWhere = defObject.additionalWhere;
                        }
                        else if (wcModule.objectdefaults && wcModule.objectdefaults.additionalWhere) {
                            this.additionalWhere = wcModule.objectdefaults.additionalWhere;
                        }
                        this.getConfig();
                        this.getCategories();
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                /**
                * Refresh de webcomponent.
                * @method refresh
                */
                refresh() {
                    if ($(this).attr('manualInit') != 'true') {
                        try {
                            this.getConfig();
                            this.getCategories();
                        }
                        catch (ex) {
                            console.log(ex);
                        }
                    }
                }
                /**
                * Render HTML data.
                * @method render
                */
                render() {
                    try {
                        let me = $(this);
                        var rendered;
                        rendered = `<div class="dtc-main"><div class="dtc-btn-container ${this.type.toLowerCase() == "view" ? 'hidden' : ''}">
                                 <button type="button" method="opendialog" value="upload" class="btn btn-default bg-outstanding dtc-btn" data-original-title="" title="">
                                    <i class="flx-icon icon-upload" flx-fw="" ></i><span class="hidden-xs">  ` + flexygo.localization.translate('documentmanager.upload') + `</span>
                                </button>
                                <button type="button" method="opendialog" value="link" class="btn btn-default bg-primary dtc-btn" data-original-title="" title="">
                                    <i class="flx-icon icon-link" flx-fw="" ></i><span class="hidden-xs">  ` + flexygo.localization.translate('documentmanager.link') + `</span>
                                </button>
                                <div style="display:none" class="btn-group dtc-filter dtc-btn dtc-btn-filter" data-toggle="buttons">
                                            <label class="btn btn-default active">
                                                <i class="fa fa-hdd-o txt-outstanding" flx-fw=""></i>
                                                <input method="filter" value="disk" type="checkbox" checked autocomplete= "off">
                                            </label>
                                            <label class="btn btn-default active">
                                                <i class="fa fa-google txt-primary" flx- fw="" > </i>
                                                <input method="filter" value="drive" type="checkbox" checked autocomplete= "off">
                                            </label>
                                            <label class="btn btn-default active">
                                                <i class="fa fa-dropbox txt-info" flx-fw=""></i>
                                                <input method="filter" value="dropbox" type="checkbox" checked autocomplete= "off">
                                            </label>
                                </div>
                                <button type="button" method="opensettings" value="settings" class="btn btn-default dtc-btn dtc-btn-settings develop-only" data-original-title="" title="">
                                    <i class="flx-icon icon-settings" flx-fw="" ></i>
                                </button>
                                 <button type="button" method="downloadall" value="downloadall" class="btn btn-default dtc-btn dtc-btn-settings" data-original-title="" title="">
                                    <i class="flx-icon icon-download"  ></i>
                                </button>
                                <button type="button" method="sendselection" value="sendselection" class="btn btn-default dtc-btn dtc-btn-settings" data-original-title="" title="">
                                    <i class="flx-icon icon-email-1"  ></i>
                                </button>
                                <button type="button" method="filterdocs" value="filterdocs" class="btn btn-default dtc-btn dtc-btn-settings" data-original-title="" title="">
                                    <i class="flx-icon icon-filter"  ></i>
                                </button>
                            </div>
                            <div class="dtc-filter-container" style="display:none;">
                                <div class="search input-group">
                                    <input type="search" placeholder="` + flexygo.localization.translate('flxsearch.search') + `">
                                    <span class="input-group-addon bg-outstanding"><i class="flx-icon icon-search-1"></i></span>
                                </div>
                            </div>
                            <div class="dtc-pry-container">`;
                        if (this.type.toLowerCase() !== "view") {
                            rendered += `<span class="background-elements">
                                        <i class="flx-icon icon-upload-1"></i> ${flexygo.localization.translate('upload.info')}
                                    </span>
                                 `;
                        }
                        rendered += '</div></div>';
                        /* Temporal
        
                                         <button type="button" method="getDriveAccount" value="Eliminar" class="btn btn-default bg-primary dtc-btn" data-original-title="" title="">
                                            <span class="hidden-xs">  ' + 'getDriveAccount' + '</span>
                                        </button>
        
                        */
                        me.html(rendered);
                        if (this.dropboxFolderCreate || this.dropboxFileCreate || this.driveFolderCreate || this.driveFileCreate || this.diskFolderCreate || this.diskFileCreate) {
                            me.find('button[method="opendialog"][value="upload"]').tooltip({ title: flexygo.localization.translate('documentmanager.upload'), placement: 'bottom', trigger: 'hover' });
                        }
                        else {
                            me.find('button[method="opendialog"][value="upload"]').hide();
                        }
                        if (this.dropboxFolderLink || this.dropboxFileLink || this.driveFolderLink || this.driveFileLink || this.diskFolderLink || this.diskFileLink) {
                            me.find('button[method="opendialog"][value="link"]').tooltip({ title: flexygo.localization.translate('documentmanager.link'), placement: 'bottom', trigger: 'hover' });
                        }
                        else {
                            me.find('button[method="opendialog"][value="link"]').hide();
                        }
                        me.find('div.dtc-filter').tooltip({ title: flexygo.localization.translate('documentmanager.filter'), placement: 'bottom', trigger: 'hover' });
                        me.find('button[method="opensettings"][value="settings"]').tooltip({ title: flexygo.localization.translate('documentmanager.settings'), placement: 'bottom', trigger: 'hover' });
                        me.find('button[method="downloadall"][value="downloadall"]').tooltip({ title: flexygo.localization.translate('documentmanager.downloadall'), placement: 'bottom', trigger: 'hover' });
                        me.find('button[method="sendselection"][value="sendselection"]').tooltip({ title: flexygo.localization.translate('documentmanager.sendselection'), placement: 'bottom', trigger: 'hover' });
                        me.find('button[method="filterdocs"][value="filterdocs"]').tooltip({ title: flexygo.localization.translate('documentmanager.filterdocs'), placement: 'bottom', trigger: 'hover' });
                        if (!(this.type.toLocaleLowerCase() === 'view')) {
                            this.mainEvents();
                        }
                        this.getDocument();
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                /**
                * Render HTML document data.
                * @method renderDocument
                * @param {string} Document ID.
                * @param {string} Path.
                * @param {string} DownloadLink.
                * @param {string} Name.
                * @param {string} Origin.
                * @param {string} Icon Class.
                * @param {string} Creation date.
                * @param {string} Category.
                * @param {string} Category ID.
                * @param {string} Description.
                * @param {string} Document type.
                * @param {string} Document extension.
                */
                renderDocument(docGuid, path, downloadLink, name, origin, iconClass, creationDate, category, categoryId, description, documentType, extension, inProgress) {
                    try {
                        let me = $(this);
                        var date;
                        //var typeClass: string;
                        var rendered;
                        var permissionLink;
                        if (!description) {
                            description = '';
                        }
                        if (!category) {
                            let cats = $.grep(this.categories, function (a) { return a.categoryId == categoryId; });
                            if (cats.length > 0) {
                                category = cats[0].category;
                            }
                        }
                        if (!flexygo.utils.isBlank(extension)) {
                            extension = extension.toLowerCase();
                        }
                        // All Subcontainer buttons are rendered if managerMode is different to view
                        let subcontainerbuttons = `<div class="dtc-subcontainerbuttons">
                            <i method="edit" value="" class="flx-icon icon-pencil txt-primary dtc-hover dtc-transition dtc-i-btn" flx-fw=""></i>
                            <a class="dtc-a" href="` + flexygo.utils.resolveUrl(downloadLink) + `" download="` + name + extension + `">
                                <i method="download" value= "" class="flx-icon icon-download txt-primary dtc-hover dtc-transition dtc-i-btn" flx- fw="" > </i>
                            </a>
                            <i method="remove" value="` + docGuid + `" class="flx-icon icon-delete-2 txt-danger dtc-hover dtc-transition dtc-i-btn" flx- fw="" > </i>
                            <i method="link" value="` + docGuid + `" class="flx-icon icon-link txt-primary dtc-hover dtc-transition dtc-i-btn" flx- fw="" > </i>`;
                        if (extension == ".pdf" || extension == ".jpeg" || extension == ".jpg" || extension == ".pjp" || extension == ".svgz" || extension == ".tif" || extension == ".xbm" || extension == ".tiff" || extension == ".ico" ||
                            extension == ".gif" || extension == ".svg" || extension == ".jfif" || extension == ".webp" || extension == ".png" || extension == ".bmp" || extension == ".pjpeg" || extension == ".avif") {
                            subcontainerbuttons = subcontainerbuttons + `<i method="view" value= "` + flexygo.utils.resolveUrl(downloadLink) + `&mode=view" download= "` + name + extension + `" class="flx-icon icon-eye txt-primary dtc-hover dtc-transition dtc-i-btn" flx- fw="" > </i>
                    </div>`;
                        }
                        else {
                            subcontainerbuttons = subcontainerbuttons + `<i class="flx-icon icon-eye text-muted dtc-i-btn"></i></div>`;
                        }
                        if (this.type.toLowerCase() == "view") {
                            subcontainerbuttons = `<a class="dtc-a" href="` + flexygo.utils.resolveUrl(downloadLink) + `" download="` + name + extension + `">
                                <i method="download" value= "" class="flx-icon icon-download txt-primary dtc-hover dtc-transition dtc-i-btn" flx- fw="" > </i>
                            </a>`;
                            if (extension == ".pdf") {
                                subcontainerbuttons = subcontainerbuttons + `<i method= "view" value= "` + flexygo.utils.resolveUrl(downloadLink) + `&mode=view" download= "` + name + extension + `" class="flx-icon icon-eye txt-primary dtc-hover dtc-transition dtc-i-btn" flx- fw="" > </i>`;
                            }
                            else {
                                subcontainerbuttons = subcontainerbuttons + `<i class="flx-icon icon-eye text-muted dtc-i-btn"></i>`;
                            }
                        }
                        date = new Date(parseInt(creationDate.substr(6)));
                        rendered = `<div id="` + docGuid + `" documenttype="` + documentType + `" class="dtc-container dtc-transition">
                                <div class="dtc-subcontainer dtc-subcontainer1">
                                   <!--<a class="dtc-a" target="_blank" href="` + flexygo.utils.resolveUrl(path) + `">-->
                                        <flx-check class="selectDoc" property="Public" value="false" ></flx-check>
                                        <i method="preview" class="` + iconClass + ` dtc-icon" flx-fw=""></i> <!--dtc-hover dtc-transition-->
                                    <!--</a>-->
                                    <div class="dtc-containertext">
                                        <span class="size-l dtc-name" title="` + name + `">` + name + `</span>
                                        <span class="size-xs"><em><small>` + origin + `</small></em></span>
                                    </div>
                                </div>
                                <div class="dtc-subcontainer dtc-subcontainer2 hidden-xs">
                                    <i class="fa dtc-icontype" flx- fw="" > </i>
                                    <div class="dtc-containertext">
                                       <!-- <span class="size-m">` + docGuid + `<i method="copy" class="fa fa-copy dtc-iconcopy dtc-hover dtc-transition" flx-fw=""></i></span>-->
                                       <!-- <div class="dtc-subcontainer dtc-margin">-->
                                            <span class="dtc-category size-m" value="` + categoryId + `">` + category + `</span>` + (inProgress ? ' <strong class="uploadIncomplete txt-danger size-l">Upload Incomplete</strong>' : '') + `
                                            <span class="size-m">` + date.toLocaleString().slice(0, -3) + `</span>
                                       <!-- </div>-->
                                    </div>
                                </div>
                                <div class="dtc-subcontainer hidden-xs hidden-sm hidden-md">
                                     <span class="dtc-description size-m">` + description + `</span>
                                </div>` +
                            subcontainerbuttons + `
                            </div>`;
                        me.find('div.dtc-pry-container').prepend(rendered);
                        switch (documentType) {
                            case 'diskfile':
                                permissionLink = this.diskFileLink;
                                break;
                            case 'diskfolder':
                                permissionLink = this.diskFolderLink;
                                break;
                            case 'drivefile':
                                permissionLink = this.driveFileLink;
                                break;
                            case 'drivefolder':
                                permissionLink = this.driveFolderLink;
                                break;
                            case 'dropboxfile':
                                permissionLink = this.dropboxFileLink;
                                break;
                            case 'dropboxfolder':
                                permissionLink = this.dropboxFolderLink;
                                break;
                            default:
                                permissionLink = false;
                        }
                        if (!permissionLink) {
                            me.find('div#' + docGuid).find('i[method="link"]').removeClass('dtc-hover').addClass('dtc-disabled');
                        }
                        me.find('i[method="copy"]').tooltip({ title: flexygo.localization.translate('documentmanager.copy'), placement: 'bottom', trigger: 'hover' });
                        /* me.find('i[method="preview"]').tooltip({ title: flexygo.localization.translate('documentmanager.preview'), placement: 'bottom', trigger: 'hover' });*/
                        me.find('i[method="edit"]').tooltip({ title: flexygo.localization.translate('documentmanager.edit'), placement: 'bottom', trigger: 'hover' });
                        me.find('i[method="download"]').tooltip({ title: flexygo.localization.translate('documentmanager.download'), placement: 'bottom', trigger: 'hover' });
                        me.find('i[method="remove"]').tooltip({ title: flexygo.localization.translate('documentmanager.remove'), placement: 'bottom', trigger: 'hover' });
                        me.find('i[method="link"]').tooltip({ title: flexygo.localization.translate('documentmanager.link'), placement: 'bottom', trigger: 'hover' });
                        me.find('i[method="view"]').tooltip({ title: flexygo.localization.translate('documentmanager.view'), placement: 'bottom', trigger: 'hover' });
                        /* Temporal */
                        me.find('div#' + docGuid).find('i[method="link"]').removeClass('dtc-hover').addClass('dtc-disabled');
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                /**
                *Open dialog upload/link.
                * @method openDialog
                * @param {string} Dialog type.
                */
                openDialog(dialogType) {
                    try {
                        let me = $(this);
                        var renderedDiskbutton;
                        var renderedDriveButton;
                        var renderedDropboxButton;
                        var dialogWidth;
                        var diskFilePermission;
                        var driveFilePermission;
                        var dropboxFilePermission;
                        var accept = '';
                        if (this.extensions) {
                            if (this.extensionId != 'sysAll') {
                                accept = flexygo.utils.parser.replaceAll(this.extensions, '|', ',');
                                if (accept === ".*")
                                    accept = "";
                            }
                        }
                        if (dialogType === 'upload') {
                            renderedDiskbutton = `<div class="btn-group dtc-btn dtc-btn-group-disk">
                                               <label value="disk" type="file" class="btn btn-default btn-file dtc-btn-disk">
                                                    <i class="fa fa-file-o txt-outstanding" flx-fw=""></i><input method="` + dialogType + `" value="disk" type="file" accept="${accept}" multiple class="hide"/>
                                              </label>
                                              <label value="disk" type="directory" class="btn btn-default btn-file dtc-btn-disk">
                                                    <i class="fa fa-folder-o txt-outstanding" flx-fw=""></i><input method="` + dialogType + `" value="disk" type="file" webkitdirectory multiple class="hide"/>
                                              </label>
                                          </div>`;
                            if (this.diskFileCreate || this.diskFolderCreate) {
                                diskFilePermission = true;
                            }
                            else {
                                diskFilePermission = false;
                            }
                            if (this.driveFileCreate || this.driveFolderCreate) {
                                driveFilePermission = true;
                            }
                            else {
                                driveFilePermission = false;
                            }
                            if (this.dropboxFileCreate || this.dropboxFolderCreate) {
                                dropboxFilePermission = true;
                            }
                            else {
                                dropboxFilePermission = false;
                            }
                        }
                        else if (dialogType === 'link') {
                            renderedDiskbutton = `<button type="button" method="` + dialogType + `" value="disk" class="btn btn-default dtc-btn" data-original-title="" title="">
                                            <i class="fa fa-hdd-o txt-outstanding" flx-fw=""></i>
                                       </button>`;
                            if (this.diskFileLink || this.diskFolderLink) {
                                diskFilePermission = true;
                            }
                            else {
                                diskFilePermission = false;
                            }
                            if (this.driveFileLink || this.driveFolderLink) {
                                driveFilePermission = true;
                            }
                            else {
                                driveFilePermission = false;
                            }
                            if (this.dropboxFileLink || this.dropboxFolderLink) {
                                dropboxFilePermission = true;
                            }
                            else {
                                dropboxFilePermission = false;
                            }
                        }
                        renderedDriveButton = `<button type="button" method="` + dialogType + `" value="drive" class="btn btn-default dtc-btn" data-original-title="" title="">
                                            <i class="fa fa-google txt-primary" flx-fw=""></i>
                                        </button>`;
                        renderedDropboxButton = `<button type="button" method="` + dialogType + `" value="dropbox" class="btn btn-default dtc-btn" data-original-title="" title="">
                                            <i class="fa fa-dropbox txt-info" flx-fw=""></i>
                                          </button>`;
                        this.dialog = $(`<div class="flx-dlg-document">
                                    <i class="flx-icon icon-` + dialogType + ` icon-2x dtc-dlg-icon" flx-fw="" ></i>`
                            + renderedDiskbutton
                            + renderedDriveButton
                            + renderedDropboxButton
                            + '</div>');
                        if (dialogType === 'link') {
                            if (!diskFilePermission) {
                                this.dialog.find('button[value="disk"]').addClass('hidden');
                            }
                        }
                        else if (dialogType === 'upload') {
                            if (!this.diskFileCreate) {
                                this.dialog.find('label[value="disk"][type="file"]').addClass('hidden');
                            }
                            if (!this.diskFolderCreate) {
                                this.dialog.find('label[value="disk"][type="directory"]').addClass('hidden');
                            }
                            if (!diskFilePermission) {
                                this.dialog.find('div.dtc-btn-group-disk').addClass('hidden');
                            }
                        }
                        if (!driveFilePermission) {
                            this.dialog.find('button[value="drive"]').addClass('hidden');
                        }
                        if (!dropboxFilePermission) {
                            this.dialog.find('button[value="dropbox"]').addClass('hidden');
                        }
                        this.dialog.find('button[value="disk"]').tooltip({ title: flexygo.localization.translate('documentmanager.disk'), placement: 'top', trigger: 'hover' });
                        this.dialog.find('label[value="disk"][type="file"]').tooltip({ title: flexygo.localization.translate('documentmanager.diskfiles'), placement: 'top', trigger: 'hover' });
                        this.dialog.find('label[value="disk"][type="directory"]').tooltip({ title: flexygo.localization.translate('documentmanager.diskfolders'), placement: 'top', trigger: 'hover' });
                        this.dialog.find('button[value="drive"]').tooltip({ title: flexygo.localization.translate('documentmanager.drive'), placement: 'top', trigger: 'hover' });
                        this.dialog.find('button[value="dropbox"]').tooltip({ title: flexygo.localization.translate('documentmanager.dropbox'), placement: 'top', trigger: 'hover' });
                        this.dialog.find('i.dtc-dlg-switch-icon').tooltip({ title: flexygo.localization.translate('documentmanager.folderorfile'), placement: 'right', trigger: 'hover' });
                        if ($('body').width() < 400) {
                            dialogWidth = $('body').width();
                        }
                        else {
                            dialogWidth = 400;
                        }
                        this.dialog.dialog({
                            position: { my: 'center top', at: 'center top+70', of: $('body') },
                            width: dialogWidth,
                            height: 130,
                            dialogClass: 'flx-dialog-modal',
                            modal: true,
                            close: function () { $(this).dialog('destroy').remove(); }
                        }).dialogExtend({
                            closable: true,
                            maximizable: false,
                            minimizable: false,
                            collapsable: false,
                            dblclick: false,
                            modal: true,
                            resizable: false,
                            close: function () { $(this).remove(); }
                        });
                        this.dialogEvents();
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                /**
                * Main events.
                * @method mainEvents
                */
                mainEvents() {
                    try {
                        let me = $(this);
                        if (this.diskFileCreate) {
                            var dragDropZone = me.find('div.dtc-main');
                            dragDropZone.on('dragover', (ev) => {
                                if (ev.originalEvent && ev.originalEvent.dataTransfer) {
                                    ev.originalEvent.dataTransfer.dropEffect = 'copy';
                                }
                                dragDropZone.css('background-color', 'rgba(0,0,0,0.5)');
                                dragDropZone.find('.dtc-container, .dtc-btn-container button').css('background-color', 'rgba(0,0,0,0.5)');
                            }).on('dragleave', (ev) => {
                                dragDropZone.css('background-color', '');
                                dragDropZone.find('.dtc-container, .dtc-btn-container button').css('background-color', '');
                            }).on('drop', (ev) => {
                                ev.preventDefault();
                                dragDropZone.css('background-color', '');
                                dragDropZone.find('.dtc-container, .dtc-btn-container button').css('background-color', '');
                                let dEvent = ev.originalEvent;
                                this.filesPending = dEvent.dataTransfer.files.length;
                                this.filesTotal = this.filesPending;
                                for (var i = 0; i < dEvent.dataTransfer.files.length; i++) {
                                    let file = new flexygo.io.DocumentUpload(dEvent.dataTransfer.files[i], this.rObjectName, this.rObjectId, 'diskfile', 'upload', this, this.categoryId);
                                    file.startUpload();
                                }
                            });
                        }
                        me.find('input').off('change').on('change', (e) => {
                            var element;
                            var method;
                            var value;
                            element = $(e.currentTarget);
                            method = element.attr('method');
                            value = element.attr('value');
                            if (element.attr('type') === 'checkbox') {
                                if (method === 'filter') {
                                    if (element.prop('checked')) {
                                        me.find('div[documenttype*="' + value + '"]').removeClass('hide');
                                    }
                                    else
                                        me.find('div[documenttype*="' + value + '"]').addClass('hide');
                                }
                            }
                        });
                        me.find('.dtc-filter-container input').on('keyup.search & search', (e) => {
                            var element;
                            var value;
                            var docs = me.find('[documenttype]');
                            element = $(e.currentTarget);
                            value = element.val().toLowerCase();
                            for (var i = 0; i < docs.length; i++) {
                                let docName = $(docs[i]).find('.dtc-name').html().toLowerCase();
                                let docDesc = $(docs[i]).find('.dtc-description').html().toLowerCase();
                                let docCategory = $(docs[i]).find('.dtc-category').html().toLowerCase();
                                let docExt = $(docs[i]).find('.dtc-containertext small').html().toLowerCase();
                                if (docName.includes(value) || docDesc.includes(value) || docCategory.includes(value) || docExt.includes(value)) {
                                    $(docs[i]).removeClass('hide');
                                }
                                else {
                                    $(docs[i]).addClass('hide');
                                }
                            }
                        });
                        me.find('button').off('click').on('click', (e) => {
                            var element;
                            var method;
                            var value;
                            element = $(e.currentTarget);
                            method = $(element).attr('method');
                            value = $(element).attr('value');
                            if (method === 'opendialog') {
                                if (value === 'upload') {
                                    this.openDialog(value);
                                }
                                else if (value === 'link') {
                                    this.openDialog(value);
                                }
                            }
                            else if (method === 'opensettings') {
                                if (this.rObjectName) {
                                    flexygo.nav.openPage('edit', 'Documents_Object_Config', "ObjectName = '" + this.rObjectName + "'", null, 'modal900x580', false, $(this));
                                }
                            }
                            else if (method === 'getDriveAccount') {
                                var scope = 'https://www.googleapis.com/auth/drive.file';
                                var redirect_uri = 'http://localhost:63083/api/Document/getDriveAccount';
                                var response_type = 'code';
                                var client_id = '300930594896-aos8bnjfgtg9q8e2rhiauhr0sdji4c81.apps.googleusercontent.com';
                                var access_type = 'offline';
                                window.location.href = encodeURI('https://accounts.google.com/o/oauth2/v2/auth?scope=' + scope + '&redirect_uri=' + redirect_uri + '&response_type=' + response_type + '&client_id=' + client_id + '&access_type=' + access_type);
                            }
                            //ojo
                            if ($(this).find('div.dtc-container').length <= 0 && (method === 'downloadall')) {
                                flexygo.msg.warning('documentmanager.nodocuments');
                            }
                            else {
                                if (method === 'downloadall' && value === 'downloadall') {
                                    if (this.rObjectName && !flexygo.utils.isBlank(this.rObjectId)) {
                                        this.downloadAllDocuments(this.rObjectName, this.rObjectId);
                                    }
                                }
                                else if (method === 'sendselection' && value === 'sendselection') {
                                    if (this.rObjectName && !flexygo.utils.isBlank(this.rObjectId)) {
                                        this.sendSelectedDocuments(this.rObjectName, this.rObjectId);
                                    }
                                }
                                else if (method === 'filterdocs') {
                                    let filterCont = $(this).find('.dtc-filter-container');
                                    if (filterCont.is(':visible')) {
                                        filterCont.hide();
                                        $(filterCont).find('input').val("");
                                        $(filterCont).find('input').trigger('keyup');
                                    }
                                    else {
                                        filterCont.show();
                                    }
                                }
                            }
                        });
                        //Moved to onEntityUpdate
                        //$(document).off('insert.flxdocument').on('insert.flxdocument', function (ev: any, obj: any, form: any) {
                        //    if (obj.objectName == 'Document_Object') {
                        //        ctx.getDocument(obj.data.DocGuid.Value);
                        //    }
                        //        form.closest('.ui-dialog').remove();  
                        //});
                        //$(document).off('update.flxdocument').on('update.flxdocument', function (ev: any, obj: any, form: any) {
                        //    if (obj.objectName == 'Documents_Object_Config') {
                        //        ctx.refresh();
                        //    }
                        //    form.closest('.ui-dialog').remove();
                        //});
                        //dragDropZone.off('dragover').on('dragover', function (e: any) {
                        //    e.preventDefault();
                        //    e.stopPropagation();
                        //    //this.addClass('dtc-dragging');
                        //});
                        //dragDropZone.off('dragleave').on('dragleave', function (e: any) {
                        //    e.preventDefault();
                        //    e.stopPropagation();
                        //    //this.removeClass('dtc-dragging');
                        //});
                        //dragDropZone.off('drop').on('drop', function (e: any) {
                        //    var file: number
                        //    if (e.originalEvent) {
                        //        if (e.originalEvent.dataTransfer.files.length) {
                        //            e.preventDefault();
                        //            e.stopPropagation();
                        //            file = e.originalEvent.dataTransfer.files;
                        //            ctx.webControl.find('input[type="file"]').prop("files", file);
                        //        }
                        //    }
                        //    //this.removeClass('dtc-dragging');
                        //});
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                onEntityUpdate(e) {
                    try {
                        if (e.type === "inserted" || e.type === "updated") {
                            let obj = e.sender;
                            if (obj.objectName.toLowerCase() === 'document_object' || obj.objectName.toLowerCase() === 'documents_object_config') {
                                if (e.type === "inserted") {
                                    if (obj.objectName.toLowerCase() === 'document_object') {
                                        this.getDocument(obj.data.DocGuid.Value);
                                    }
                                }
                                else if (e.type === "updated") {
                                    if (obj.objectName.toLowerCase() === 'documents_object_config') {
                                        this.refresh();
                                    }
                                }
                                $(document).find('flx-edit[objectname="' + obj.objectName + '"]').closest('.ui-dialog').remove();
                            }
                        }
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                /**
                * Dialog events.
                * @method dialogEvents
                */
                dialogEvents() {
                    try {
                        let me = $(this);
                        this.dialog.find('input').off('change').on('change', (e) => {
                            var element;
                            var method;
                            var value;
                            var doctype;
                            element = $(e.currentTarget);
                            method = $(element).attr('method');
                            value = $(element).attr('value');
                            if ($(element).attr('type') === 'file') {
                                if (method === 'upload' && value === 'disk') {
                                    this.dialog.dialog('destroy').remove();
                                    if (this.diskFileCreate || this.diskFolderCreate) {
                                        if ($(element).prop('webkitdirectory')) {
                                            doctype = 'diskfolder';
                                        }
                                        else {
                                            doctype = 'diskfile';
                                        }
                                        if (element[0].files) {
                                            this.filesPending = element[0].files.length;
                                            this.filesTotal = this.filesPending;
                                            for (let i = 0; i < element[0].files.length; i++) {
                                                let fl = element[0].files[i];
                                                let file = new flexygo.io.DocumentUpload(fl, this.rObjectName, this.rObjectId, doctype, method, this, this.categoryId);
                                                file.startUpload();
                                            }
                                        }
                                    }
                                }
                            } //else if ($(element).attr('type') === 'checkbox') {
                            //    method = this.dialog.find('flx-switch').attr('method');
                            //    if ($(element).is(':checked')) {
                            //        ctx.dialog.find('i.dtc-dlg-switch-icon').removeClass('fa-folder-o').addClass('fa-file-o');
                            //        if (method === 'upload') {
                            //            if (ctx.diskFileCreate) {
                            //                ctx.dialog.find('input[value="disk"]').prop('webkitdirectory', false).removeClass('hidden').attr('doctype', 'diskfile');
                            //                ctx.dialog.find('label[value="disk"]').prop('disabled', false).removeClass('hidden').attr('doctype', '');
                            //            } else {
                            //                ctx.dialog.find('input[value="disk"], label[value="disk"]').addClass('hidden');
                            //            }
                            //            if (ctx.driveFileCreate)
                            //            {
                            //                ctx.dialog.find('button[value="drive"]').prop('disabled', false).removeClass('hidden').attr('doctype', 'drivefile');
                            //            } else {
                            //                ctx.dialog.find('button[value="drive"]').addClass('hidden');
                            //            }
                            //            if (ctx.dropboxFileCreate) {
                            //                ctx.dialog.find('button[value="dropbox"]').prop('disabled', false).removeClass('hidden').attr('doctype', 'dropboxfile');
                            //            } else {
                            //                ctx.dialog.find('button[value="dropbox"]').addClass('hidden');
                            //            }
                            //        } else if (method === 'link') {
                            //            if (ctx.diskFileLink) {
                            //                ctx.dialog.find('button[value="disk"]').prop('disabled', false).removeClass('hidden').attr('doctype', 'diskfile');
                            //            } else {
                            //                ctx.dialog.find('button[value="disk"]').addClass('hidden');
                            //            }
                            //            if (ctx.driveFileLink) {
                            //                ctx.dialog.find('button[value="drive"]').prop('disabled', false).removeClass('hidden').attr('doctype', 'drivefile');
                            //            } else {
                            //                ctx.dialog.find('button[value="drive"]').addClass('hidden');
                            //            }
                            //            if (ctx.dropboxFileLink) {
                            //                ctx.dialog.find('button[value="dropbox"]').prop('disabled', false).removeClass('hidden').attr('doctype', 'dropboxfile');
                            //            } else {
                            //                ctx.dialog.find('button[value="dropbox"]').addClass('hidden');
                            //            }
                            //        }
                            //    } else {
                            //        ctx.dialog.find('i.dtc-dlg-switch-icon').removeClass('fa-file-o').addClass('fa-folder-o');
                            //        if (method === 'upload') {
                            //            if (ctx.diskFolderCreate) {
                            //                ctx.dialog.find('input[value="disk"]').prop('webkitdirectory', true).removeClass('hidden').attr('doctype', 'diskfolder');
                            //                ctx.dialog.find('label[value="disk"]').prop('disabled', false).removeClass('hidden').attr('doctype', 'diskfolder');
                            //            } else {
                            //                ctx.dialog.find('input[value="disk"], label[value="disk"]').addClass('hidden');
                            //            }
                            //            if (ctx.driveFolderCreate) {
                            //                ctx.dialog.find('button[value="drive"]').prop('disabled', true).removeClass('hidden').attr('doctype','drivefolder');
                            //            } else {
                            //                ctx.dialog.find('button[value="drive"]').addClass('hidden');
                            //            }
                            //            if (ctx.dropboxFolderCreate) {
                            //                ctx.dialog.find('button[value="dropbox"]').prop('disabled', true).removeClass('hidden').attr('doctype', 'dropboxfolder');
                            //            } else {
                            //                ctx.dialog.find('button[value="dropbox"]').addClass('hidden');
                            //            }
                            //        } else if (method === 'link') {
                            //            if (ctx.diskFolderLink) {
                            //                ctx.dialog.find('button[value="disk"]').prop('disabled', true).removeClass('hidden').attr('doctype', 'diskfolder');
                            //            } else {
                            //                ctx.dialog.find('button[value="disk"]').addClass('hidden');
                            //            }
                            //            if (ctx.driveFolderLink) {
                            //                ctx.dialog.find('button[value="drive"]').prop('disabled', false).removeClass('hidden').attr('doctype', 'drivefolder');
                            //            } else {
                            //                ctx.dialog.find('button[value="drive"]').addClass('hidden');
                            //            }
                            //            if (ctx.dropboxFolderLink) {
                            //                ctx.dialog.find('button[value="dropbox"]').prop('disabled', false).removeClass('hidden').attr('doctype', 'dropboxfolder');
                            //            } else {
                            //                ctx.dialog.find('button[value="dropbox"]').addClass('hidden');
                            //            }
                            //        }
                            //    }
                            //}
                        });
                        this.dialog.find('button').off('click').on('click', (e) => {
                            var element;
                            var method;
                            var value;
                            var dropboxChooserOptions;
                            var defaults;
                            element = $(e.currentTarget);
                            method = $(element).attr('method');
                            value = $(element).attr('value');
                            dropboxChooserOptions = {
                                success: (files) => {
                                    for (var fl in files) {
                                        var name;
                                        var downloadLink;
                                        var doctype;
                                        if (files[fl].isDir) {
                                            name = files[fl].name + '.folder';
                                            doctype = 'dropboxfolder';
                                        }
                                        else {
                                            name = files[fl].name;
                                            doctype = 'dropboxfile';
                                        }
                                        if (files[fl].link.search('/?dl=0') === -1) {
                                            downloadLink = files[fl].link + '?dl=1';
                                        }
                                        else {
                                            downloadLink = files[fl].link.replace('?dl=0', '?dl=1');
                                        }
                                        this.setCloudDocument(null, name, doctype, files[fl].id, files[fl].link, downloadLink, method, false);
                                    }
                                },
                                cancel: function () { },
                                linkType: 'preview',
                                multiselect: true,
                                folderselect: false,
                                iframe: false,
                                extensions: [],
                            };
                            if (method === 'upload') {
                                if (value === 'disk') {
                                    if (this.diskFileCreate || this.diskFolderCreate) {
                                        //Without functionality
                                    }
                                }
                                else if (value === 'drive') {
                                    if (this.driveFileCreate || this.driveFolderCreate) {
                                        this.loadPicker(method);
                                    }
                                }
                                else if (value === 'dropbox') {
                                    if (this.dropboxFileCreate || this.dropboxFolderCreate) {
                                        if (Dropbox.isBrowserSupported()) {
                                            dropboxChooserOptions['extensions'] = ['.folder'];
                                            Dropbox.choose(dropboxChooserOptions);
                                        }
                                        else {
                                            flexygo.msg.warning('documentmanager.browsernotsupported');
                                        }
                                    }
                                }
                            }
                            else if (method === 'link') {
                                if (value === 'disk') {
                                    if (this.diskFileLink || this.diskFolderLink) {
                                        if (this.rObjectName && this.rObjectId) {
                                            if (this.managerMode == 'flexygo') {
                                                defaults = {
                                                    'ObjectName': this.rObjectName,
                                                    'ObjectId': this.rObjectId,
                                                };
                                                flexygo.nav.openPage('edit', 'Document_Object', null, JSON.stringify(defaults), 'modal600x385', false, $(this));
                                            }
                                            else {
                                                defaults = {
                                                    'Tabla': this.ERPObjectName,
                                                    'IdDoc': this.rObjectId,
                                                };
                                                flexygo.nav.openPage('edit', 'AHORA_Documento_Tabla', null, JSON.stringify(defaults), 'modal600x385', false, $(this));
                                            }
                                        }
                                    }
                                }
                                else if (value === 'drive') {
                                    if (this.driveFileLink || this.driveFolderLink) {
                                        this.loadPicker(method);
                                    }
                                }
                                else if (value === 'dropbox') {
                                    if (this.dropboxFileLink || this.dropboxFolderLink) {
                                        if (!this.dropboxFileLink) {
                                            dropboxChooserOptions['extensions'] = ['.folder'];
                                        }
                                        if (this.dropboxFolderLink) {
                                            dropboxChooserOptions['folderselect'] = true;
                                        }
                                        if (Dropbox.isBrowserSupported()) {
                                            Dropbox.choose(dropboxChooserOptions);
                                        }
                                        else {
                                            flexygo.msg.warning('documentmanager.browsernotsupported');
                                        }
                                    }
                                }
                            }
                            this.dialog.dialog('destroy').remove();
                        });
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                /**
                * Document events.
                * @method documentEvents
                */
                documentEvents() {
                    try {
                        let me = $(this);
                        me.find('i.dtc-i-btn').off('click').on('click', (e) => {
                            var element;
                            var method;
                            var value;
                            var Guid;
                            var filename;
                            var permissionLink;
                            var defaults;
                            element = $(e.currentTarget);
                            method = element.attr('method');
                            value = element.attr('value');
                            Guid = element.closest('div.dtc-container').attr('id');
                            filename = element.attr('download');
                            switch (method) {
                                case 'remove':
                                    flexygo.msg.confirm('documentmanager.msgremove', (result) => {
                                        if (result) {
                                            this.removeDocument(value);
                                        }
                                    });
                                    break;
                                case 'edit':
                                    this.editStartDocument(Guid);
                                    break;
                                case 'saveedit':
                                    this.editFinishDocument(Guid);
                                    break;
                                case 'return':
                                    this.editReturn(Guid);
                                    break;
                                case 'view':
                                    this.viewDocument(value, filename);
                                    break;
                            }
                        });
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                /**
                * View document.
                * @method viewDocument
                * @param {string } Content.
                */
                viewDocument(content, filename) {
                    let histObj = new flexygo.nav.FlexygoHistory();
                    histObj.targetid = 'popup';
                    let modal = flexygo.targets.createContainer(histObj, true, null, true, null);
                    if (!modal) {
                        return;
                    }
                    modal.empty();
                    modal.closest('.ui-dialog').find('.ui-dialog-title').html(filename);
                    modal.append('<embed style="height:100%;width:100%" src="' + content + '"></embed>');
                }
                /**
                * Remove document.
                * @method removeDocument
                * @param {string} Document ID.
                * @param {string} Object ID.
                */
                removeDocument(docGuid) {
                    try {
                        if ((this.rObjectId || this.rObjectId == 0)) {
                            let me = $(this);
                            var params;
                            params = {
                                'DocGuid': docGuid,
                                'ObjectName': this.rObjectName,
                                'ObjectId': this.rObjectId,
                            };
                            flexygo.ajax.post('~/api/DocumentManager', 'RemoveDocument', params, (response) => {
                                if (response && !response.documentError) {
                                    me.find('div#' + docGuid).remove();
                                    flexygo.msg.success('documentmanager.removed');
                                }
                                else {
                                    if (!response.permissionError) {
                                        flexygo.msg.error('documentmanager.errorremoving');
                                    }
                                    else {
                                        flexygo.msg.warning('documentmanager.permissionerror');
                                    }
                                }
                            }, null, () => { this.closeLoading(false); }, () => { this.showLoading(false); });
                        }
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                /**
                * Set document.
                * @method setDocument
                * @param {string} Result.
                * @param {string} Document name.
                * @param {string} Document type.
                * @param {string} Cloud ID.
                * @param {string} Cloud link.
                * @param {string}  action
                */
                setCloudDocument(base64, documentName, documentType, cloudId, cloudLink, downloadLink, action, multi) {
                    try {
                        if ((this.rObjectId || this.rObjectId == 0) && this.rObjectName) {
                            let me = $(this);
                            var params;
                            if (base64) {
                                base64 = base64.split(',')[1];
                            }
                            else {
                                base64 = null;
                            }
                            if ((documentType.toLowerCase() === "diskfile" || documentType.toLowerCase() === "diskfolder") && !base64) {
                                flexygo.msg.warning('documentmanager.documentempty');
                                return;
                            }
                            params = {
                                'ObjectName': this.rObjectName,
                                'ObjectId': this.rObjectId,
                                'DocumentName': documentName,
                                'DocumentType': documentType,
                                'Base64': base64,
                                'CloudId': cloudId,
                                'CloudLink': cloudLink,
                                'DownloadLink': downloadLink,
                                'DocAction': action,
                                'CategoryId': this.categoryId,
                            };
                            flexygo.ajax.post('~/api/DocumentManager', 'SetDocument', params, (response) => {
                                if (response && !response.documentError) {
                                    this.renderDocument(response.docGuid, response.path, response.downloadLink, response.name, response.origin, response.iconClass, response.creationDate, response.category, response.categoryId, response.description, response.documentType, response.extension, false);
                                    this.documentEvents();
                                    flexygo.msg.success('documentmanager.saved');
                                }
                                else {
                                    if (!response.permissionError) {
                                        flexygo.msg.error('documentmanager.errorsaving');
                                    }
                                    else {
                                        flexygo.msg.warning('documentmanager.permissionerror');
                                    }
                                }
                            }, null, () => { this.closeLoading(multi); }, () => { this.showLoading(multi); });
                        }
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                /**
              * Downloads all documents.
              * @method downloadAllDocuments
              * @param {string} objectName.
              * @param {string} objectId.
              */
                downloadAllDocuments(objectName, objectId) {
                    try {
                        var params;
                        params = {
                            'ObjectName': objectName,
                            'ObjectId': objectId,
                            'AdditionalWhere': this.additionalWhere,
                            'CategoryId': this.categoryId,
                        };
                        flexygo.ajax.post('~/api/DocumentManager', 'DownloadAllDocuments', params, (response) => {
                            if (response && !response.imageError) {
                                flexygo.utils.execDynamicCode(response.javacode);
                            }
                            else {
                                if (!response.permissionError) {
                                    flexygo.msg.error('imagemanager.errordownload');
                                }
                                else {
                                    flexygo.msg.warning('imagemanager.permissionerror');
                                }
                            }
                        });
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                /**
                * Send mail with selected documents
                * @method sendSelectedDocuments
                * @param {string} objectName.
                * @param {string} objectId.
                 */
                sendSelectedDocuments(objectName, objectId) {
                    try {
                        let me = $(this);
                        let selectedDocs = [];
                        let cb = $('.dtc-subcontainer1>flx-check[value="true"]');
                        for (var i = 0; i < cb.length; i++) {
                            selectedDocs.push(cb[i].closest('.dtc-container').getAttribute('id'));
                        }
                        if (selectedDocs.length > 0) {
                            flexygo.nav.execProcess('SendSelectedDocuments', '', '', '{\'ObjectName\':\'' + objectName + '\',\'ObjectId\':\'' + objectId + '\',\'Attachments\':\'' + selectedDocs + '\'}', null, 'popup', false, me, false);
                        }
                        else {
                            flexygo.msg.warning(flexygo.localization.translate('documentmanager.noselection'));
                        }
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                /**
                * Start editing.
                * @method editStartDocument
                * @param {string} Document ID.
                */
                editStartDocument(docGuid) {
                    try {
                        let me = $(this);
                        var doc;
                        var result;
                        var categoryRender;
                        var defaultCategory;
                        doc = me.find('div#' + docGuid);
                        result = this.categories;
                        categoryRender = '<select class="dtc-category size-l form-control" firstvalue="' + doc.find('span.dtc-category').attr('value') + '" firsttext="' + doc.find('span.dtc-category').text() + '">';
                        defaultCategory = doc.find('span.dtc-category').attr('value');
                        for (var cat in result) {
                            categoryRender += '<option value="' + result[cat].categoryId + '">' + result[cat].category + '</option>';
                        }
                        categoryRender += '</select>';
                        doc.find('i[method="edit"]').removeClass('icon-pencil txt-primary').addClass('txt-info icon-save-4').attr('method', 'saveedit').attr('title', flexygo.localization.translate('documentmanager.save')).tooltip('fixTitle');
                        doc.find('i[method="remove"]').removeClass('icon-delete-2 txt-danger').addClass('txt-primary icon-arrow-2 icon-flip-horizontal').attr('method', 'return').attr('title', flexygo.localization.translate('documentmanager.return')).tooltip('fixTitle');
                        doc.find('span.dtc-name').replaceWith('<input type="text" class="dtc-name form-control size-l" firstvalue="' + doc.find('span.dtc-name').text() + '" value="' + doc.find('span.dtc-name').text() + '">');
                        doc.find('span.dtc-category').replaceWith(categoryRender);
                        doc.find('select.dtc-category').val(defaultCategory);
                        doc.find('span.dtc-description').replaceWith('<textarea class="dtc-description form-control size-m" maxlength="250" rows="4" firstvalue="' + doc.find('span.dtc-description').text() + '">' + doc.find('span.dtc-description').text() + '</textarea>');
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                /**
               * End editing.
               * @method editFinishDocument
               * @param {string} Document ID.
               */
                editFinishDocument(docGuid) {
                    try {
                        if ((this.rObjectId || this.rObjectId == 0)) {
                            let me = $(this);
                            var doc;
                            var name;
                            var categoryId;
                            var category;
                            var description;
                            var params;
                            doc = me.find('div#' + docGuid);
                            name = doc.find('input.dtc-name').val();
                            categoryId = doc.find('select.dtc-category').val() || 0;
                            category = doc.find('select.dtc-category option[value="' + categoryId + '"]').text();
                            description = doc.find('textarea.dtc-description').val();
                            params = {
                                'DocGuid': docGuid,
                                'ObjectName': this.rObjectName,
                                'ObjectId': this.rObjectId,
                                'Name': name,
                                'Description': description,
                                'CategoryId': categoryId
                            };
                            flexygo.ajax.post('~/api/DocumentManager', 'UpdateDocument', params, (response) => {
                                if (response && !response.documentError) {
                                    flexygo.msg.success('documentmanager.saved');
                                }
                                else {
                                    name = doc.find('input.dtc-name').attr('firstvalue');
                                    categoryId = doc.find('select.dtc-category').attr('firstvalue');
                                    category = doc.find('select.dtc-category').attr('firsttext');
                                    description = doc.find('textarea.dtc-description').attr('firstvalue');
                                    if (!response.permissionError) {
                                        flexygo.msg.error('documentmanager.errorsaving');
                                    }
                                    else {
                                        flexygo.msg.warning('documentmanager.permissionerror');
                                    }
                                }
                            });
                            doc.find('i[method="saveedit"]').removeClass('txt-info icon-save-4').addClass('icon-pencil txt-primary').attr('method', 'edit').attr('title', flexygo.localization.translate('documentmanager.edit')).tooltip('fixTitle');
                            doc.find('i[method="return"]').removeClass('txt-primary icon-arrow-2 icon-flip-horizontal').addClass('icon-delete-2 txt-danger').attr('method', 'remove').attr('title', flexygo.localization.translate('documentmanager.remove')).tooltip('fixTitle');
                            doc.find('input.dtc-name').replaceWith('<span class="size-l dtc-name">' + name + '</span>');
                            doc.find('select.dtc-category').replaceWith('<span class="dtc-category size-m" value="' + categoryId + '">' + category + '</span>');
                            doc.find('textarea.dtc-description').replaceWith('<span class="dtc-description size-m">' + description + '</span>');
                        }
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                /**
                * Exit edit mode.
                * @method editReturn
                * @param {string} Document ID.
                */
                editReturn(docGuid) {
                    try {
                        let me = $(this);
                        var doc;
                        var name;
                        var categoryId;
                        var category;
                        var description;
                        doc = me.find('div#' + docGuid);
                        name = doc.find('input.dtc-name').attr('firstvalue');
                        categoryId = doc.find('select.dtc-category').attr('firstvalue');
                        category = doc.find('select.dtc-category').attr('firsttext');
                        description = doc.find('textarea.dtc-description').attr('firstvalue');
                        doc.find('i[method="saveedit"]').removeClass('txt-info icon-save-4').addClass('icon-pencil txt-primary').attr('method', 'edit').attr('title', flexygo.localization.translate('documentmanager.edit')).tooltip('fixTitle');
                        doc.find('i[method="return"]').removeClass('txt-primary icon-arrow-2 icon-flip-horizontal').addClass('icon-delete-2 txt-danger').attr('method', 'remove').attr('title', flexygo.localization.translate('documentmanager.remove')).tooltip('fixTitle');
                        doc.find('input.dtc-name').replaceWith('<span class="size-l dtc-name">' + name + '</span>');
                        doc.find('select.dtc-category').replaceWith('<span class="dtc-category size-m" value="' + categoryId + '">' + category + '</span>');
                        doc.find('textarea.dtc-description').replaceWith('<span class="dtc-description size-m">' + description + '</span>');
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                /**
                * Get documents.
                * @method getDocument
                * @param {string} Document ID (Opctional).
                */
                getDocument(docGuid) {
                    try {
                        if ((this.rObjectId || this.rObjectId == 0) && this.rObjectName) {
                            let me = $(this);
                            var params;
                            params = {
                                'ObjectId': this.rObjectId,
                                'ObjectName': this.rObjectName,
                                'DocGuid': docGuid,
                                'AdditionalWhere': this.additionalWhere,
                                'CategoryId': this.categoryId,
                            };
                            flexygo.ajax.post('~/api/DocumentManager', 'GetDocument', params, (response) => {
                                if (response[0] && !response[0].documentError) {
                                    for (var doc in response) {
                                        this.renderDocument(response[doc].docGuid, response[doc].path, response[doc].downloadLink, response[doc].name, response[doc].origin, response[doc].iconClass, response[doc].creationDate, response[doc].category, response[doc].categoryId, response[doc].description, response[doc].documentType, response[doc].extension, response[doc].inProgress);
                                    }
                                    this.documentEvents();
                                }
                                else {
                                    if (response[0] && response[0].permissionError) {
                                        flexygo.msg.warning('documentmanager.permissionerror');
                                    }
                                    else if (response.length == 0 && this.type == 'view') {
                                        me.html('<div class="box-info"><i class="flx-icon icon-information-2 icon-lg icon-margin-right"></i><span><strong>Info!</strong> ' + flexygo.localization.translate('flxlist.noentriesfound') + '</span></div>');
                                    }
                                }
                            });
                        }
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                /**
                * Get document categories.
                * @method getCategories
                */
                getCategories() {
                    try {
                        let me = $(this);
                        flexygo.ajax.post('~/api/DocumentManager', 'GetCategories', { "Mode": this.managerMode, 'ObjectName': this.rObjectName }, (response) => {
                            if (response) {
                                this.categories = response;
                            }
                        });
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                /**
                * Get configuration Documents_Object.
                * @method getConfig
                */
                getConfig() {
                    try {
                        if (this.rObjectName) {
                            let me = $(this);
                            var params;
                            params = {
                                'ObjectName': this.rObjectName
                            };
                            flexygo.ajax.post('~/api/DocumentManager', 'GetConfig', params, (response) => {
                                if (response) {
                                    this.dropboxFolderCreate = response.dropboxFolderCreate;
                                    this.dropboxFolderLink = response.dropboxFolderLink;
                                    this.dropboxFileCreate = response.dropboxFileCreate;
                                    this.dropboxFileLink = response.dropboxFileLink;
                                    this.driveFolderCreate = response.driveFolderCreate;
                                    this.driveFolderLink = response.driveFolderLink;
                                    this.driveFileCreate = response.driveFileCreate;
                                    this.driveFileLink = response.driveFileLink;
                                    this.diskFolderCreate = response.diskFolderCreate;
                                    this.diskFolderLink = response.diskFolderLink;
                                    this.diskFileCreate = response.diskFileCreate;
                                    this.diskFileLink = response.diskFileLink;
                                    this.ERPObjectName = response.ERPObjectName;
                                    this.extensionId = response.ExtensionId;
                                    this.extensions = response.Extensions;
                                    this.render();
                                }
                            });
                        }
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                /**
                * Load Picker (Use the Google API Loader script to load the google.picker script).
                * @method loadPicker
                * @param {string} Method.
                * @param {string} Document Type.
                */
                loadPicker(method) {
                    gapi.load('picker', { 'callback': () => { this.onPickerApiLoad(method); } });
                }
                /**
                * On Picker Api Load.
                * @method onPickerApiLoad
                * @param {string} Method.
                * @param {string} Document Type.
                */
                onPickerApiLoad(method) {
                    flexygo.ajax.post('~/api/DocumentManager', 'GetDriveToken', null, (response) => {
                        if (response) {
                            this.createPicker(method, response);
                        }
                    });
                }
                /**
                * Create Picker.
                * @method createPicker
                * @param {string} Method.
                * @param {string} Document Type.
                */
                createPicker(method, oauthToken) {
                    var picker;
                    var view;
                    var folders;
                    var viewFolder;
                    if (oauthToken) {
                        if (this.driveFolderLink) {
                            folders = true;
                        }
                        else {
                            folders = false;
                        }
                        if (this.driveFileLink) {
                            viewFolder = null;
                        }
                        else {
                            viewFolder = google.picker.ViewId.FOLDERS;
                        }
                        if (method === 'link') {
                            view = new google.picker.DocsView(viewFolder).setIncludeFolders(true).setSelectFolderEnabled(folders);
                        }
                        else if (method === 'upload') {
                            view = new google.picker.DocsUploadView().setIncludeFolders(true);
                        }
                        picker = new google.picker.PickerBuilder()
                            .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
                            .enableFeature(google.picker.Feature.SIMPLE_UPLOAD_ENABLED)
                            .enableFeature(google.picker.Feature.NAV_HIDDEN)
                            .setLocale(flexygo.profiles.langKey.substring(0, 2).toLowerCase())
                            .setAppId(flexygo.utils.GoogleAppId)
                            .setOAuthToken(oauthToken)
                            .setDeveloperKey(flexygo.utils.GoogleDeveloperKey)
                            .addView(view)
                            .setCallback((data) => { this.pickerCallback(data, method); })
                            .build();
                        picker.setVisible(true);
                    }
                }
                /**
                * Picker Callback.
                * @method pickerCallback
                * @param {any} data
                * @param {string} Method.
                * @param {string} Document Type.
                */
                pickerCallback(data, method) {
                    var name;
                    var mimeType;
                    var downloadLink;
                    var previewLink;
                    var doctype;
                    if (data.action == google.picker.Action.PICKED) {
                        for (var doc in data.docs) {
                            if (data.docs[doc].type === 'folder') {
                                name = data.docs[doc].name + '.folder';
                                doctype = 'drivefolder';
                                downloadLink = data.docs[doc].url; // no funciona 
                                previewLink = data.docs[doc].embedUrl;
                            }
                            else {
                                doctype = 'drivefile';
                                if (data.docs[doc].isNew) {
                                    name = data.docs[doc].name;
                                    downloadLink = data.docs[doc].downloadUrl;
                                    if (data.docs[doc].url.search('view') === -1) {
                                        previewLink = data.docs[doc].url; // + '/preview?usp=drive_web';
                                    }
                                    else {
                                        previewLink = data.docs[doc].url.replace('view', 'preview');
                                    }
                                }
                                else {
                                    if (data.docs[doc].type === 'document') {
                                        name = data.docs[doc].name + '.' + data.docs[doc].serviceId;
                                    }
                                    else {
                                        name = data.docs[doc].name;
                                    }
                                    downloadLink = data.docs[doc].url; // no funciona 
                                    previewLink = data.docs[doc].embedUrl;
                                }
                            }
                            this.setCloudDocument(null, name, doctype, data.docs[doc].id, previewLink, downloadLink, method, false);
                        }
                    }
                }
                /**
               * Show loading funcion before executing process
               * @method showLoading
               */
                showLoading(multi) {
                    if (!this.progressBar) {
                        let onShowF;
                        let pTitle = flexygo.localization.translate('process.executing');
                        if (!multi) {
                            onShowF = () => { this.progressTimer = setInterval(() => this.moveLoading(), 500); };
                        }
                        else {
                            pTitle += ' ' + (this.filesTotal - this.filesPending) + ' / ' + this.filesTotal;
                        }
                        this.progressBar = Lobibox.progress({
                            title: pTitle,
                            closeOnEsc: false,
                            closeButton: false,
                            onShow: onShowF
                        });
                    }
                }
                /**
                * Move loading funcion during process execution
                * @method moveLoading
                */
                moveLoading() {
                    if (this.progressBar) {
                        let actVal = this.progressBar.getProgress();
                        actVal = ((actVal + 1 >= 100) ? 0 : actVal + 1);
                        this.progressBar.setProgress(actVal);
                    }
                }
                /**
                * Close loading funcion after executing process
                * @method closeLoading
                */
                closeLoading(multi) {
                    if (multi) {
                        this.filesPending--;
                    }
                    if (!multi || this.filesPending <= 0) {
                        if (this.progressBar) {
                            clearInterval(this.progressTimer);
                            this.progressTimer = null;
                            this.progressBar.destroy();
                            this.progressBar = null;
                            this.filesPending = null;
                            this.filesTotal = null;
                        }
                    }
                    else {
                        if (this.progressBar) {
                            let actVal = 100 * (this.filesTotal - this.filesPending) / this.filesTotal;
                            this.progressBar.setTitle(flexygo.localization.translate('process.executing') + ' ' + (this.filesTotal - this.filesPending) + ' / ' + this.filesTotal);
                            this.progressBar.setProgress(actVal);
                        }
                    }
                }
            }
            wc.FlxDocumentManagerElement = FlxDocumentManagerElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
(function (flexygo) {
    var io;
    (function (io) {
        class DocumentUpload {
            constructor(file, objectname, objectid, type, action, manager, categoryId) {
                this.bufferSize = 2 * 1024 * 1024;
                this.currentPosition = 0;
                this.file = file;
                this.objectname = objectname;
                this.objectid = objectid;
                this.manager = manager;
                this.documentType = type;
                this.action = action;
                this.categoryId = categoryId;
            }
            startUpload() {
                this.reader = new FileReader();
                this.reader.onloadend = (event) => {
                    if (event.target.readyState !== 2) {
                        return;
                    }
                    if (this.file.size == 0) {
                        if (this.documentId != '' && this.documentId != null) {
                            this.removeDocument();
                        }
                        flexygo.msg.warning('documentmanager.documentempty');
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
                                this.appendToDocument(event.target.result, lastAppend);
                            }
                            else {
                                // Update upload progress
                                this.documentContainer.find('.dtc-inprogress').remove();
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
                return Math.floor((this.currentPosition / this.file.size) * 100);
            }
            upload_file() {
                var blob = this.file.slice(this.currentPosition, this.currentPosition + this.bufferSize);
                this.reader.readAsDataURL(blob);
            }
            appendToDocument(base64, lastAppend) {
                try {
                    let me = $(this);
                    var params;
                    if (base64) {
                        base64 = base64.split(',')[1];
                    }
                    else {
                        base64 = null;
                    }
                    params = {
                        'ObjectName': this.objectname,
                        'ObjectId': this.objectid,
                        'DocumentId': this.documentId,
                        'Base64': base64,
                        'LastAppend': lastAppend
                    };
                    flexygo.ajax.post('~/api/DocumentManager', 'AppendToDocument', params, (response) => {
                        if ($('body').find(this.documentContainer)) {
                            this.documentContainer.find('.dtc-progressbar').animate({ width: this.percentDone() + '%' }, 200);
                            this.documentContainer.find('.dtc-progresstext').html(this.percentDone() + '%');
                            this.currentPosition += this.bufferSize;
                            this.upload_file();
                        }
                        else {
                            this.removeDocument();
                        }
                    }, () => { this.removeDocument(); this.documentContainer.find('.dtc-progresstext').html('Error uploading document.'); });
                }
                catch (ex) {
                    console.log(ex);
                }
            }
            setDocument(base64, documentName, multipart) {
                try {
                    if ((this.objectid || this.objectid == '0') && this.objectname) {
                        let me = $(this);
                        var params;
                        if (base64) {
                            base64 = base64.split(',')[1];
                        }
                        else {
                            base64 = null;
                        }
                        if ((this.documentType.toLowerCase() === "diskfile" || this.documentType.toLowerCase() === "diskfolder") && !base64) {
                            flexygo.msg.warning('documentmanager.documentempty');
                            return;
                        }
                        params = {
                            'ObjectName': this.objectname,
                            'ObjectId': this.objectid,
                            'DocumentName': documentName,
                            'DocumentType': this.documentType,
                            'Base64': base64,
                            'CloudId': null,
                            'CloudLink': null,
                            'DownloadLink': null,
                            'DocAction': this.action,
                            'PartialUpload': multipart,
                            'CategoryId': this.categoryId,
                        };
                        flexygo.ajax.post('~/api/DocumentManager', 'SetDocument', params, (response) => {
                            if (multipart) {
                                this.documentId = response.docGuid;
                                this.manager.renderDocument(response.docGuid, response.path, response.downloadLink, response.name, response.origin, response.iconClass, response.creationDate, response.category, response.categoryId, response.description, response.documentType, response.extension, false);
                                this.manager.documentEvents();
                                this.documentContainer = $(this.manager).find('#' + response.docGuid);
                                this.documentContainer.append('<div class="dtc-inprogress"><div class="dtc-progressbar" style="width:' + this.percentDone() + '%"></div><div class="dtc-progresstext">' + this.percentDone() + '%</div></div>');
                                this.currentPosition += this.bufferSize;
                                this.upload_file();
                            }
                            else {
                                if (response && !response.documentError) {
                                    this.manager.renderDocument(response.docGuid, response.path, response.downloadLink, response.name, response.origin, response.iconClass, response.creationDate, response.category, response.categoryId, response.description, response.documentType, response.extension, false);
                                    this.manager.documentEvents();
                                    let ev = { class: "document", type: "uploaded", sender: this, masterIdentity: response.docGuid, detailIdentity: response };
                                    flexygo.events.trigger(ev);
                                    flexygo.msg.success('documentmanager.saved');
                                }
                                else {
                                    if (!response.permissionError) {
                                        flexygo.msg.error('documentmanager.errorsaving');
                                    }
                                    else {
                                        flexygo.msg.warning('documentmanager.permissionerror');
                                    }
                                }
                            }
                        });
                    }
                }
                catch (ex) {
                    console.log(ex);
                }
            }
            removeDocument() {
                try {
                    var params;
                    params = {
                        'DocGuid': this.documentId,
                        'ObjectName': this.objectname,
                        'ObjectId': this.objectid,
                    };
                    flexygo.ajax.post('~/api/DocumentManager', 'RemoveDocument', params, (response) => {
                        if (response.documentError) {
                            if (!response.permissionError) {
                                flexygo.msg.error('documentmanager.errorremoving');
                            }
                            else {
                                flexygo.msg.warning('documentmanager.permissionerror');
                            }
                        }
                    });
                }
                catch (ex) {
                    console.log(ex);
                }
            }
        }
        io.DocumentUpload = DocumentUpload;
    })(io = flexygo.io || (flexygo.io = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-documentmanager', flexygo.ui.wc.FlxDocumentManagerElement);
//# sourceMappingURL=flx-documentmanager.js.map