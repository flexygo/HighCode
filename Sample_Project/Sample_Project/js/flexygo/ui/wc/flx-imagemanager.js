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
        * Library for the FlxImageManagerElement web component.
        *
        * @class FlxImageManagerElement
        * @constructor
        * @return {FlxImageManagerElement}
        */
            class FlxImageManagerElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                    * Default image class
                    * @property imageClassId {string}
                    */
                    this.imageClassId = null;
                    /**
                    * Additional image filter
                    * @property additionalWhere {string}
                    */
                    this.additionalWhere = null;
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
                    this.singleImage = element.attr('SingleImage');
                    this.empty = element.attr('Empty');
                    this.mode = element.attr('mode') || '';
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
                    flexygo.events.off(this, "entity", "updated", this.onEntityUpdate);
                }
                /**
                * Monitor the list of observed attribute for changes.
                * @property observedAttributes
                */
                static get observedAttributes() {
                    return ['modulename', 'objectname', 'objectwhere', 'objectid', 'singleimage', 'empty', 'mode'];
                }
                /**
                * Fires when the attribute value of the element is changed.
                * @method attributeChangedCallback
                */
                attributeChangedCallback(attrName, oldVal, newVal) {
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
                        else if (attrName.toLowerCase() == 'objectid' && newVal && newVal != '') {
                            this.objectId = newVal;
                            needInit = true;
                        }
                        else if (attrName.toLowerCase() == 'singleimage' && newVal && newVal != '') {
                            this.singleImage = newVal;
                            needInit = true;
                        }
                        else if (attrName.toLowerCase() == 'empty' && newVal && newVal != '') {
                            this.empty = newVal;
                            needInit = true;
                        }
                        else if (attrName.toLowerCase() == 'mode' && newVal && newVal != '') {
                            this.mode = newVal;
                            needInit = true;
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
                    //Capture events from entity modification
                    flexygo.events.on(this, "entity", "updated", this.onEntityUpdate);
                    try {
                        let me = $(this);
                        me.removeAttr('manualInit');
                        $(this).closest('flx-module').find('.flx-noInitContent').remove();
                        var defString;
                        var defObject;
                        defString = flexygo.history.getDefaults(this.objectName, me);
                        defObject = JSON.parse(flexygo.utils.parser.replaceAll(defString, "'", '"'));
                        let wcModule = me.closest('flx-module')[0];
                        this.rObjectName = (this.objectName && this.objectId) ? this.objectName : (defObject && defObject.ObjectName) ? defObject.ObjectName : (wcModule.objectdefaults) ? wcModule.objectdefaults.ObjectName : '';
                        this.rObjectId = (this.objectName && this.objectId) ? this.objectId : (defObject && defObject.ObjectId) ? defObject.ObjectId : (wcModule.objectdefaults) ? wcModule.objectdefaults.ObjectId : '';
                        if (defObject && defObject.additionalWhere) {
                            this.additionalWhere = defObject.additionalWhere;
                        }
                        else if (wcModule.objectdefaults && wcModule.objectdefaults.additionalWhere) {
                            this.additionalWhere = wcModule.objectdefaults.additionalWhere;
                        }
                        if (defObject && defObject.ImageClassId) {
                            this.imageClassId = defObject.ImageClassId;
                        }
                        else if (wcModule.objectdefaults && wcModule.objectdefaults.ImageClassId) {
                            this.imageClassId = wcModule.objectdefaults.ImageClassId;
                        }
                        if ($(me).closest('.flx-slide.flx-slide-loading').length == 0) {
                            this.render();
                        }
                        else {
                            var loadSlideModal = setInterval(() => {
                                if ($(me).closest('.flx-slide.flx-slide-fullLoaded').length > 0) {
                                    this.render();
                                    clearInterval(loadSlideModal);
                                }
                            }, 200);
                        }
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
                            this.render();
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
                        var rendered = '';
                        if (!(this.mode.toLowerCase() == "view")) {
                            rendered = `<div class="im-btn-container">
                                <label method="upload" value="" type="" class="btn btn-default bg-outstanding btn-file im-btn">
                                    <i class="flx-icon icon-upload-1" flx-fw=""></i><span class="hidden-xs">   ${flexygo.localization.translate('imagemanager.upload')}</span><input method="upload" value="" type="file" multiple class="hide" accept="image/*" />
                                </label>
                                <button type="button" method="downloadall" value="downloadall" class="btn btn-default im-btn im-btn im-btn-settings " data-original-title="" title="">
                                    <i class="flx-icon icon-download"  ></i>
                                </button>
                                <button type="button" method="deleteall" value="deleteall" class="btn btn-default im-btn im-btn im-btn-settings" data-original-title="" title="">
                                    <i class="flx-icon icon-close txt-danger"  ></i>
                                </button>
                                <button type="button" method="opensettings" value="settings" class="btn btn-default im-btn im-btn-settings develop-only" data-original-title="" title="">
                                    <i class="flx-icon icon-settings" flx-fw="" ></i>
                                </button>
                                
                            </div>`;
                        }
                        rendered += `<div class="im-pry-container im-wall im-transition im-background-container">`;
                        if (!(this.mode.toLowerCase() == "view")) {
                            rendered += `<span class="background-elements">
                                    <i class="flx-icon icon-upload-1"></i> ${flexygo.localization.translate('upload.info')}
                             </span>`;
                        }
                        rendered += `</div>`;
                        me.html(rendered);
                        me.find('label[method="upload"]').tooltip({ title: flexygo.localization.translate('imagemanager.upload'), placement: 'bottom', trigger: 'hover' });
                        me.find('button[method="downloadall"]').tooltip({ title: flexygo.localization.translate('imagemanager.downloadall'), placement: 'bottom', trigger: 'hover' });
                        me.find('button[method="deleteall"]').tooltip({ title: flexygo.localization.translate('imagemanager.deleteall'), placement: 'bottom', trigger: 'hover' });
                        me.find('button[method="opensettings"][value="settings"]').tooltip({ title: flexygo.localization.translate('imagemanager.settings'), placement: 'bottom', trigger: 'hover' });
                        if (this.singleImage) {
                            me.find('div.im-btn-container').hide();
                            me.find('div.im-pry-container').css({ 'min-height': me.find('div.im-pry-container').width() + 20 + 'px' }).css({ 'max-height': me.find('div.im-pry-container').width() + 20 + 'px' }).addClass('im-pry-container-single');
                        }
                        this.mainEvents();
                        this.getImage();
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                /**
                * Render HTML image data.
                * @method renderImage
                * @param {string} Image Id.
                * @param {string} Name.
                * @param {string} Description.
                * @param {number} Classification Id.
                * @param {string} Classification Description.
                * @param {boolean} Main Image.
                * @param {number} Order Number.
                * @param {string} Path.
                * @param {number} faceEncoding Number.
                * @param {string} lastError String.
                */
                renderImage(imageId, name, descrip, classId, classDescrip, mainImage, orderNumber, path, faceEncoding = 1, lastError = '') {
                    try {
                        let me = $(this);
                        var rendered;
                        var iconSize;
                        var iconEdit;
                        var iconFaceEncoding;
                        var error = 'Cant find any face on this picture yet';
                        if (me.attr('mode')) {
                            iconFaceEncoding = '';
                            if (faceEncoding == 0) {
                                if (lastError.length > 0) {
                                    error = lastError;
                                }
                                iconFaceEncoding = '<div title="' + error + '" class="padding-left-s padding-top-s"><i class="flx-icon icon-warning txt-danger"> </i></div>';
                            }
                        }
                        else {
                            iconFaceEncoding = '';
                        }
                        iconSize = (me.find('div.im-pry-container').width() > 250) ? 'icon-3x' : 'icon-2x';
                        iconEdit = (this.singleImage && mainImage) ? 'fa fa-image' : 'flx-icon icon-pencil';
                        rendered = `<div imageId="` + imageId + `" order="` + orderNumber + `" class="im-item im-transition" style="${this.mode.toLowerCase() == "view" ? 'cursor: initial' : ''}">
                                <div method="" class="im-data im-transition">
                                    <div method="mainimage" value="` + (mainImage ? mainImage : '') + `" class="ignore-drag im-mainimage im-transition ${this.mode.toLowerCase() == "recognition" ? 'hidden' : ''}">
                                        <i class="flx-icon icon-star im-item-corner-icon im-transition" flx-fw=""></i>
                                        <div class="im-item-corner im-transition"></div>
                                    </div>
                                    <div method="removeimage" class="ignore-drag im-removeimage im-transition ${this.mode.toLowerCase() == "view" ? 'hidden' : ''}">
                                        <i class="flx-icon flx-icon icon-document-remove" flx-fw=""></i>
                                        
                                    </div>
                                                ${iconFaceEncoding}
                                    <div class="im-data-container im-data-descrip im-transition">
                                        <span class="im-name im-data-item im-data-name im-transition size-l">` + name.toUpperCase() + `</span>
                                        <hr class="im-transition">
                                        <span class="im-descrip im-data-item im-transition size-xs"><small>` + (classDescrip ? classDescrip.toUpperCase() : '') + `</small></span>
                                    </div>
                                    <div  method="preview" class="ignore-drag im-data-container im-data-container-action im-data-preview im-transition"
                                    ${this.mode.toLowerCase() == "view" || this.mode.toLowerCase() == "recognition" ? 'style="margin: 15px calc(25%)"' : ''}
                                     data-src="` + flexygo.utils.resolveUrl(path) + `" data-sub-html="<h3>` + name.toUpperCase() + `</h3><p>` + (descrip ? descrip : '') + `</p>" >
                                        <img style="display:none;" src="` + flexygo.utils.resolveUrl(path) + `" />
                                        <i class="flx-icon icon-eye ` + iconSize + ` im-transition im-data-icon im-data-item" flx-fw=""></i>
                                    </div>
                                    <div  method="edit" class="ignore-drag im-data-container im-data-container-action im-data-edit im-transition ${this.mode.toLowerCase() == "view" || this.mode.toLowerCase() == "recognition" ? 'hidden' : ''}">
                                        <i class="` + iconEdit + ` ` + iconSize + ` im-transition im-data-icon im-data-item" flx-fw=""></i>
                                    </div>
                                </div>
                                <div class="im-image im-transition" style="background-image: url(\'` + flexygo.utils.resolveUrl(path) + `\');"></div>
                            </div>`;
                        this.wall.appendBlock(rendered);
                        if (mainImage) {
                            me.find('div[imageid="' + imageId + '"]').find('div.im-data div.im-mainimage').addClass('im-mi-mainimage').find('div.im-item-corner').addClass('im-mi-item-corner');
                        }
                        if (this.singleImage) {
                            if (!mainImage) {
                                me.find('div[imageid="' + imageId + '"]').hide();
                            }
                            else {
                                me.find('div[imageid="' + imageId + '"]').find('div[method = "removeimage"]').hide();
                                me.find('div[imageid="' + imageId + '"]').find('div[method = "mainimage"]').hide();
                                me.find('div[imageid="' + imageId + '"]').find('div.im-data-descrip').addClass('im-data-descrip-single');
                                me.find('div[imageid="' + imageId + '"]').addClass('im-item-single');
                                this.wall.fixPos({
                                    top: 0,
                                    left: 0,
                                    block: me.find('div[imageid="' + imageId + '"]')
                                });
                                let size = me.find('div.im-pry-container').width() / 1.34;
                                this.wall.fixSize({
                                    height: size,
                                    width: size,
                                    block: me.find('div[imageid="' + imageId + '"]'),
                                });
                                this.wall.refresh();
                            }
                        }
                        this.imageEvents();
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
                        if (!(this.mode.toLowerCase() == "view")) {
                            var dragDropZone = me.find('div.im-pry-container');
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
                                for (var i = 0; i < dEvent.dataTransfer.files.length; i++) {
                                    this.imagesPreRender = [];
                                    this.imagesLength = dEvent.dataTransfer.files.length;
                                    this.imageReader(dEvent.dataTransfer.files[i]);
                                }
                            });
                        }
                        this.wall = new Freewall(me.find('div.im-wall'));
                        this.wall.reset({
                            selector: '.im-item',
                            draggable: !this.singleImage && !flexygo.utils.isAgentMobile() && this.mode.toLowerCase() != "view",
                            animate: true,
                            cellW: () => { if (this.singleImage) {
                                return me.find('div.im-pry-container').width() / 1.35;
                            }
                            else {
                                if (this.mode == 'view') {
                                    return 175;
                                }
                                else {
                                    return 250;
                                }
                            } },
                            cellH: () => { if (this.singleImage) {
                                return me.find('div.im-pry-container').width() / 1.35;
                            }
                            else {
                                if (this.mode == 'view') {
                                    return 175;
                                }
                                else {
                                    return 250;
                                }
                            } },
                            delay: 50,
                            fixSize: 0,
                            gutterX: 10,
                            gutterY: 10,
                            cacheSize: true,
                            keepOrder: true,
                            rightToLeft: false,
                            bottomToTop: false,
                            onResize: () => {
                                if (this.singleImage) {
                                    this.wall.fixSize({
                                        height: me.find('div.im-pry-container').width() / 1.34,
                                        width: me.find('div.im-pry-container').width() / 1.34,
                                        block: me.find('div.im-item'),
                                    });
                                    me.find('div.im-pry-container').css({ 'min-height': me.find('div.im-pry-container').width() + 20 + 'px' }).css({ 'max-height': me.find('div.im-pry-container').width() + 20 + 'px' });
                                }
                                this.wall.refresh();
                            },
                            onBlockDrop: function () {
                                setTimeout(() => {
                                    this.closest('flx-imagemanager').orderImage(this);
                                }, 700);
                            },
                        });
                        this.wall.fitWidth();
                        this.wall.sortBy(function (a, b) {
                            return a.attributes.getNamedItem('order').value - b.attributes.getNamedItem('order').value;
                        });
                        me.find('input').off('change').on('change', (e) => {
                            var element;
                            var method;
                            var value;
                            element = $(e.currentTarget);
                            method = $(element).attr('method');
                            if ($(element).attr('type') === 'file' && method === 'upload') {
                                if (element[0].files) {
                                    for (let fl of element[0].files) {
                                        this.imagesPreRender = [];
                                        this.imagesLength = element[0].files.length;
                                        this.imageReader(fl);
                                    }
                                    $(element).val('');
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
                            if (method === 'opensettings' && value === 'settings') {
                                if (this.rObjectName) {
                                    if (this.mode == 'recognition') {
                                        flexygo.nav.openPage('edit', 'sysObjectImageRecognitionSetting', "ObjectName = '" + this.rObjectName + "'", null, 'modal900x500', false, me);
                                    }
                                    else {
                                        flexygo.nav.openPage('edit', 'sysObjectImageSetting', "ObjectName = '" + this.rObjectName + "'", null, 'modal900x500', false, me);
                                    }
                                }
                            }
                            if ($(this).find('div[imageid]').length <= 0 && (method === 'downloadall' || method === 'deleteall')) {
                                flexygo.msg.warning('imagemanager.noimages');
                            }
                            else {
                                if (method === 'downloadall' && value === 'downloadall') {
                                    if (this.rObjectName && !flexygo.utils.isBlank(this.rObjectId)) {
                                        this.downloadAllImages(this.rObjectName, this.rObjectId);
                                    }
                                }
                                if (method === 'deleteall' && value === 'deleteall') {
                                    if (this.rObjectName && !flexygo.utils.isBlank(this.rObjectId)) {
                                        flexygo.msg.confirm('imagemanager.msgremoveall', (result) => { if (result) {
                                            this.removeAllImages(this.rObjectName, this.rObjectId);
                                        } });
                                    }
                                }
                            }
                        });
                        if (this.singleImage) {
                            $(document).off('dialogclosed.imagemanager').on('dialogclosed.imagemanager', (ev, hist) => {
                                if (hist.objectname === 'sysObjectImages') {
                                    this.refresh();
                                }
                            });
                        }
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                onEntityUpdate(e) {
                    let obj = e.sender;
                    let me = $(this);
                    if (obj.objectName === 'sysObjectImage' || obj.objectName === "sysObjectImageSetting") {
                        if (obj.objectName === 'sysObjectImage') {
                            let params;
                            me.find('div[imageid="' + obj.data.ImageId.Value + '"]').find('img').attr('src', flexygo.utils.resolveUrl(flexygo.utils.querystring.setParamValue(obj.data.Path.Text, 'time', new Date().getTime().toString())));
                            me.find('div[imageid="' + obj.data.ImageId.Value + '"]').find('div.im-image').css('background-image', 'url(' + flexygo.utils.resolveUrl(flexygo.utils.querystring.setParamValue(obj.data.Path.Text, 'time', new Date().getTime().toString())) + ')');
                            me.find('div[imageid="' + obj.data.ImageId.Value + '"]').find('div[method= "preview"]').attr('data-sub-html', '<h3>' + obj.data.Name.Value.toUpperCase() + '</h3><p>' + obj.data.Descrip.Value + '</p>');
                            me.find('div[imageid="' + obj.data.ImageId.Value + '"]').find('div[method= "preview"]').attr('data-src', flexygo.utils.resolveUrl(flexygo.utils.querystring.setParamValue(obj.data.Path.Text, 'time', new Date().getTime().toString())));
                            me.find('div[imageid="' + obj.data.ImageId.Value + '"]').find('span.im-name').text(obj.data.Name.Value.toUpperCase());
                            me.find('div[imageid="' + obj.data.ImageId.Value + '"]').find('span.im-descrip').text(obj.data.ImageClassId.Text.toUpperCase());
                            if (!flexygo.utils.isBlank(this.rObjectId) && this.rObjectName) {
                                params = {
                                    'ObjectId': this.rObjectId,
                                    'ObjectName': this.rObjectName,
                                    'AdditionalWhere': this.additionalWhere,
                                    'ImageClassId': this.imageClassId,
                                };
                                let url = '~/api/ImageManager';
                                if (this.mode == 'recognition') {
                                    url = '~/api/ImageRecognitionManager';
                                }
                                flexygo.ajax.post(url, 'GetImages', params, (response) => {
                                    if (response[0] && !response[0].imageError) {
                                        for (let image of response) {
                                            me.find('div[imageid="' + image.imageId + '"]').attr('order', image.orderNumber);
                                            me.find('div[imageid="' + image.imageId + '"]').find('div[method= "mainimage"]').attr('value', image.mainImage);
                                            if (image.mainImage) {
                                                me.find('div[imageid="' + image.imageId + '"]').find('div.im-data div.im-mainimage').addClass('im-mi-mainimage').find('div.im-item-corner').addClass('im-mi-item-corner');
                                            }
                                            else {
                                                me.find('div[imageid="' + image.imageId + '"]').find('div.im-data div.im-mainimage').removeClass('im-mi-mainimage').find('div.im-item-corner').removeClass('im-mi-item-corner');
                                            }
                                            this.wall.sortBy(function (a, b) {
                                                return a.attributes.getNamedItem('order').value - b.attributes.getNamedItem('order').value;
                                            });
                                        }
                                    }
                                    else {
                                        if (response[0].permissionError) {
                                            flexygo.msg.warning('imagemanager.permissionerror');
                                        }
                                    }
                                });
                            }
                            this.setGallery();
                        }
                        $(document).find('flx-edit[objectname="' + obj.objectName + '"]').closest('.ui-dialog').remove();
                    }
                }
                /**
                * Image events.
                * @method imageEvents
                */
                imageEvents() {
                    try {
                        let me = $(this);
                        me.find('div.im-item').find('div').off('click').on('click', (e) => {
                            var element;
                            var method;
                            var value;
                            var imageId;
                            var defaults;
                            element = $(e.currentTarget);
                            method = element.attr('method');
                            value = element.attr('value');
                            imageId = element.closest('div.im-item').attr('imageId');
                            if (method === 'mainimage' && !(this.mode.toLowerCase() === 'view')) {
                                this.updateImage(imageId, value.toLocaleLowerCase() !== 'true', parseInt(element.closest('div.im-item').attr('order')), this.rObjectName);
                            }
                            else if (method === 'removeimage') {
                                flexygo.msg.confirm('imagemanager.msgremove', (result) => { if (result) {
                                    this.removeImage(imageId, this.rObjectName);
                                } });
                            }
                            else if (method === 'edit') {
                                var imgConf = new flexygo.obj.Entity('sysObjectImageSetting', 'ObjectName = \'' + this.rObjectName + '\'');
                                imgConf.read();
                                var mode = imgConf.data['TypeId'].Value;
                                if (!this.singleImage) {
                                    if (mode == 'flexygo') {
                                        flexygo.nav.openPage('edit', 'sysObjectImage', "ImageId = '" + imageId + "'", null, 'modal1000x570', false, $(this));
                                    }
                                    else {
                                        flexygo.nav.openPage('edit', 'AHORA_Imagen', "IdDoc = '" + imageId + "'", null, 'modal1000x570', false, $(this));
                                    }
                                }
                                else {
                                    if (!flexygo.utils.isBlank(this.rObjectId) && this.rObjectName) {
                                        if (mode == 'flexygo') {
                                            defaults = {
                                                'ObjectName': this.rObjectName,
                                                'ObjectId': this.rObjectId,
                                            };
                                            flexygo.nav.openPage('list', 'sysObjectImages', "Objects_Images.ObjectId = '" + this.rObjectId + "' And Objects_Images.ObjectName = '" + this.rObjectName + "'", JSON.stringify(defaults), 'modal' + ($(window).width() - 30) + 'x' + ($(window).height() - 50), false, $(this));
                                        }
                                        else {
                                            var objectERP = imgConf.data['ERPObjectName'].Value;
                                            defaults = {
                                                'Objeto': objectERP,
                                                'IdDocObjeto': this.rObjectId,
                                            };
                                            flexygo.nav.openPage('list', 'AHORA_Imagenes', "Objetos_Imagenes.IdDocObjeto = '" + this.rObjectId + "' And Objetos_Imagenes.Objeto = '" + objectERP + "'", JSON.stringify(defaults), 'modal' + ($(window).width() - 30) + 'x' + ($(window).height() - 50), false, $(this));
                                        }
                                    }
                                }
                            }
                        });
                        this.setGallery();
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                /**
                * set image.
                * @method setImage
                * @param {string} Name.
                * @param {string} Base64.
                */
                setImage(name, base64) {
                    try {
                        if (!flexygo.utils.isBlank(this.rObjectId) && this.rObjectName) {
                            let me = $(this);
                            var params;
                            if (base64) {
                                base64 = base64.split(',')[1];
                            }
                            else {
                                base64 = null;
                            }
                            if (!base64) {
                                flexygo.msg.warning('imagemanager.imageepmty');
                                return;
                            }
                            params = {
                                'ObjectName': this.rObjectName,
                                'ObjectId': this.rObjectId,
                                'Name': name,
                                'Base64': base64,
                                'ImageClassId': this.imageClassId,
                            };
                            let url = '~/api/ImageManager';
                            if (this.mode == 'recognition') {
                                url = '~/api/ImageRecognitionManager';
                            }
                            flexygo.ajax.post(url, 'SetImage', params, (response) => {
                                if (response && !response.imageError) {
                                    this.imagesPreRender.push(response);
                                    if (this.imagesLength === this.imagesPreRender.length) {
                                        for (let file of this.imagesPreRender) {
                                            this.renderImage(file.imageId, file.name, file.descrip, file.classId, file.classDescrip, file.mainImage, file.orderNumber, file.path, file.haveFaceEncoding, file.lastError);
                                            flexygo.msg.success('imagemanager.uploaded');
                                        }
                                    }
                                }
                                else {
                                    if (!response.permissionError) {
                                        flexygo.msg.error('imagemanager.erroruploading');
                                    }
                                    else {
                                        flexygo.msg.warning('imagemanager.permissionerror');
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
                * Get image.
                * @method getImage
                * @param {string} Image ID (Opctional).
                */
                getImage(imageId) {
                    try {
                        if (!flexygo.utils.isBlank(this.rObjectId) && this.rObjectName) {
                            let me = $(this);
                            var params;
                            params = {
                                'ObjectId': this.rObjectId,
                                'ObjectName': this.rObjectName,
                                'ImageId': imageId,
                                'AdditionalWhere': this.additionalWhere,
                                'ImageClassId': this.imageClassId,
                            };
                            let url = '~/api/ImageManager';
                            if (this.mode == 'recognition') {
                                url = '~/api/ImageRecognitionManager';
                            }
                            flexygo.ajax.post(url, 'GetImages', params, (response) => {
                                if (response[0] && !response[0].imageError) {
                                    for (let image of response) {
                                        this.renderImage(image.imageId, image.name, image.descrip, image.classId, image.classDescrip, image.mainImage, image.orderNumber, image.path, image.haveFaceEncoding, image.lastError);
                                    }
                                }
                                else {
                                    if (response[0] && response[0].permissionError) {
                                        flexygo.msg.warning('imagemanager.permissionerror');
                                    }
                                    else if (response.length === 0 && this.singleImage) {
                                        me.find('div.im-pry-container').append('<div class="im-empty im-transition">' + this.empty + '</div><i class="flx-icon icon-upload-1 im-empty-icon im-transition" flx-fw="">');
                                        me.find('div.im-pry-container').addClass('im-pry-container-empty');
                                        me.find('div.im-pry-container').find('div.im-empty').off('click').on('click', (e) => {
                                            if (!flexygo.utils.isBlank(this.rObjectId) && this.rObjectName) {
                                                let defaults;
                                                defaults = {
                                                    'ObjectName': this.rObjectName,
                                                    'ObjectId': this.rObjectId,
                                                };
                                                flexygo.nav.openPage('list', 'sysObjectImages', "Objects_Images.ObjectId = '" + this.rObjectId + "' And Objects_Images.ObjectName = '" + this.rObjectName + "'", JSON.stringify(defaults), 'modal' + ($(window).width() - 30) + 'x' + ($(window).height() - 50), false, me);
                                            }
                                        });
                                    }
                                    else if (response.length === 0 && this.mode == 'view') {
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
                * Update image.
                * @method getImage
                * @param {string} Image ID.
                * @param {boolean} Main Image.
                * @param {number} orderNumber.
                */
                updateImage(imageId, mainImage, orderNumber, objectName) {
                    try {
                        let me = $(this);
                        var params;
                        params = {
                            'ImageId': imageId,
                            'MainImage': mainImage,
                            'OrderNumber': orderNumber,
                            'ObjectName': objectName,
                        };
                        let url = '~/api/ImageManager';
                        if (this.mode == 'recognition') {
                            url = '~/api/ImageRecognitionManager';
                        }
                        flexygo.ajax.post(url, 'UpdateImage', params, (response) => {
                            if (response && !response.imageError) {
                                me.find('div.im-item div.im-data div.im-mainimage').attr('value', 'false').removeClass('im-mi-mainimage').find('div.im-item-corner').removeClass('im-mi-item-corner');
                                me.find('div[imageid="' + response.imageId + '"]').find('div.im-data div.im-mainimage').attr('value', 'true').addClass('im-mi-mainimage').find('div.im-item-corner').addClass('im-mi-item-corner');
                                flexygo.msg.success('imagemanager.updated');
                            }
                            else {
                                if (!response.permissionError) {
                                    flexygo.msg.error('imagemanager.errorupdating');
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
                * Order image.
                * @method orderImage
                * @param {any} Image(Optional).
                */
                orderImage(image) {
                    try {
                        let me = $(this);
                        var order = [];
                        for (let item of me.find('div.im-item').toArray()) {
                            let newItem = {
                                imageId: item.attributes.getNamedItem('imageid').value,
                                top: item.offsetTop,
                                left: item.offsetLeft,
                            };
                            order.push(newItem);
                        }
                        order.sort(function (a, b) {
                            if (a.top === b.top) {
                                return a.left - b.left;
                            }
                            else {
                                return a.top - b.top;
                            }
                        });
                        order.forEach((item, index) => {
                            me.find('div[imageid="' + item.imageId + '"]').attr('order', index);
                            if (image) {
                                if (image.attributes.getNamedItem('imageid').value === item.imageId) {
                                    this.updateImage(image.attributes.getNamedItem('imageid').value, image.childNodes[1].children[0].attributes.getNamedItem('value').value === 'true', parseInt(image.attributes.getNamedItem('order').value), this.rObjectName);
                                }
                            }
                        });
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                /**
                * Remove image.
                * @method removeImage
                * @param {string} Image ID.
                */
                removeImage(imageId, objectName) {
                    try {
                        let me = $(this);
                        var params;
                        params = {
                            'ImageId': imageId,
                            'ObjectName': objectName,
                        };
                        let url = '~/api/ImageManager';
                        if (this.mode == 'recognition') {
                            url = '~/api/ImageRecognitionManager';
                        }
                        flexygo.ajax.post(url, 'RemoveImage', params, (response) => {
                            if (response && !response.imageError) {
                                me.find('div[imageid="' + imageId + '"]').remove();
                                this.wall.fitWidth();
                                //this.refresh();
                                flexygo.msg.success('imagemanager.removed');
                                this.setGallery();
                                if (response.imageId.length != 0) {
                                    me.find('div.im-item div.im-data div.im-mainimage').attr('value', 'false').removeClass('im-mi-mainimage').find('div.im-item-corner').removeClass('im-mi-item-corner');
                                    me.find('div[imageid="' + response.imageId + '"]').find('div.im-data div.im-mainimage').attr('value', 'true').addClass('im-mi-mainimage').find('div.im-item-corner').addClass('im-mi-item-corner');
                                }
                                this.orderImage();
                            }
                            else {
                                if (!response.permissionError) {
                                    flexygo.msg.error('imagemanager.errorremoving');
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
                * Remove all images.
                * @method removeAllImages
                * @param {string} objectName.
                * @param {string} objectId.
                */
                removeAllImages(objectName, objectId) {
                    try {
                        let me = $(this);
                        var params;
                        params = {
                            'ObjectName': objectName,
                            'ObjectId': objectId,
                            'AdditionalWhere': this.additionalWhere,
                            'ImageClassId': this.imageClassId,
                        };
                        let url = '~/api/ImageManager';
                        if (this.mode == 'recognition') {
                            url = '~/api/ImageRecognitionManager';
                        }
                        flexygo.ajax.post(url, 'RemoveAllImages', params, (response) => {
                            if (response && !response.imageError) {
                                me.find('div[class="im-pry-container"]').empty();
                                this.wall.fitWidth();
                                this.refresh();
                                flexygo.msg.success('imagemanager.removedall');
                                this.setGallery();
                                //if (response.imageId.length != 0) {
                                //    me.find('div.im-item div.im-data div.im-mainimage').attr('value', 'false').removeClass('im-mi-mainimage').find('div.im-item-corner').removeClass('im-mi-item-corner');
                                //    me.find('div[imageid="' + response.imageId + '"]').find('div.im-data div.im-mainimage').attr('value', 'true').addClass('im-mi-mainimage').find('div.im-item-corner').addClass('im-mi-item-corner');
                                //}
                                //this.orderImage();
                            }
                            else {
                                if (!response.permissionError) {
                                    flexygo.msg.error('imagemanager.errorremoving');
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
                * Downloads all images.
                * @method downloadAllImages
                * @param {string} objectName.
                * @param {string} objectId.
                */
                downloadAllImages(objectName, objectId) {
                    try {
                        var params;
                        params = {
                            'ObjectName': objectName,
                            'ObjectId': objectId,
                            'AdditionalWhere': this.additionalWhere,
                            'ImageClassId': this.imageClassId,
                        };
                        let url = '~/api/ImageManager';
                        if (this.mode == 'recognition') {
                            url = '~/api/ImageRecognitionManager';
                        }
                        flexygo.ajax.post(url, 'DownloadAllImages', params, (response) => {
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
              * Image reader.
              * @method imageReader
              * @param {File} File.
              */
                imageReader(file) {
                    try {
                        let me = $(this);
                        var reader;
                        reader = new FileReader();
                        reader.onload = (e) => {
                            var tempImage = new Image();
                            tempImage.onload = (ev) => {
                                let imgWidth, imgHeight;
                                imgWidth = tempImage.naturalWidth;
                                imgHeight = tempImage.naturalHeight;
                                var imgConf = new flexygo.obj.Entity('sysObjectImageSetting', 'ObjectName = \'' + this.rObjectName + '\'');
                                imgConf.read();
                                let cnfHeight, cnfWidth, ratio;
                                cnfWidth = (imgConf.data['MaxWidth'].Value ? imgConf.data['MaxWidth'].Value : imgWidth);
                                cnfHeight = (imgConf.data['MaxHeight'].Value ? imgConf.data['MaxHeight'].Value : imgHeight);
                                ratio = Math.min(cnfWidth / imgWidth, cnfHeight / imgHeight);
                                ratio = (ratio > 1 ? 1 : ratio);
                                var canvas = document.createElement('canvas');
                                canvas.width = imgWidth * ratio;
                                canvas.height = imgHeight * ratio;
                                let ctx = canvas.getContext('2d');
                                ctx.drawImage(tempImage, 0, 0, canvas.width, canvas.height);
                                let cnfCompression = this.setCompression(imgConf.data['Compression'].Value, file.type, canvas, ctx);
                                this.setImage(file.name, canvas.toDataURL(file.type, cnfCompression));
                            };
                            tempImage.src = reader.result;
                        };
                        reader.readAsDataURL(file);
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                setCompression(compression, fileType, canvas, ctx) {
                    if (!compression || compression === 0)
                        return null;
                    if (fileType === 'image/png') {
                        let optionsgRgb = {};
                        switch (compression) {
                            //Low
                            case 1:
                                optionsgRgb.colors = 192;
                                break;
                            //Medium
                            case 2:
                                optionsgRgb.colors = 128;
                                break;
                            //High
                            case 3:
                                optionsgRgb.colors = 64;
                                break;
                        }
                        let rgbQuant = new RgbQuant(optionsgRgb);
                        rgbQuant.sample(canvas);
                        let img = rgbQuant.reduce(canvas);
                        let uint = new Uint8ClampedArray(img.buffer);
                        let imageData = new ImageData(uint, canvas.width, canvas.height);
                        ctx.putImageData(imageData, 0, 0);
                        canvas.getContext('2d').drawImage(canvas, 0, 0, canvas.width, canvas.height);
                    }
                    else {
                        switch (compression) {
                            //Low
                            case 1:
                                return 0.75;
                            //Medium
                            case 2:
                                return 0.50;
                            //High
                            case 3:
                                return 0.25;
                        }
                    }
                    return null;
                }
                /**
               * Get image classification.
               * @method getClassification
               */
                getClassification() {
                    try {
                        let me = $(this);
                        flexygo.ajax.post('~/api/ImageManager', 'GetClassification', null, (response) => {
                            if (response) {
                                this.classification = response;
                            }
                        });
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                /**
               * Set gallery.
               * @method setGallery
               */
                setGallery() {
                    try {
                        let me = $(this);
                        if (me.find('.im-wall').data('lightGallery')) {
                            me.find('.im-wall').data('lightGallery').destroy(true);
                        }
                        me.find('.im-wall').lightGallery({
                            selector: 'div[method="preview"]',
                            thumbnail: true,
                            animateThumb: true,
                            share: false,
                            rotate: true,
                            rotateLeft: false,
                            //showThumbByDefault: false,
                            preload: 2
                        });
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                /**
                * Find faces in picture and try yo recognice it with known faces.
                * @method showFaces
                * @param {string} file.
                * @param {string} objectname.
                * @param {number} tolerance.
                * @param {string} filterids.
                * @param {boolean} isb64.
                * @param {Jquery} e.
                */
                showFaces(file, objectname, tolerance, filterids, isb64, e) {
                    let processName = 'FindFaces';
                    if (isb64) {
                        processName = 'FindFacesB64';
                    }
                    let p = new flexygo.Process(processName);
                    let params = [];
                    params.push({ Key: 'File', Value: file });
                    params.push({ Key: 'ObjectName', Value: objectname });
                    params.push({ Key: 'Tolerance', Value: tolerance });
                    params.push({ Key: 'FilterIds', Value: filterids });
                    p.run(params, (r) => {
                        let histObj = new flexygo.nav.FlexygoHistory();
                        histObj.targetid = 'popup';
                        let modal = flexygo.targets.createContainer(histObj, true, e);
                        if (!modal) {
                            return;
                        }
                        modal.empty();
                        modal.closest('.ui-dialog').find('.ui-dialog-title').html(r.Data.Faces.length + ' faces found.');
                        let canvas = $('<canvas></canvas>')[0];
                        let context = canvas.getContext('2d');
                        var img = new Image;
                        img.onload = function () {
                            canvas.width = img.width;
                            canvas.height = img.height;
                            context.drawImage(img, 0, 0);
                            let colorIndex = 0;
                            r.Data.Faces.forEach(function (face) {
                                if (colorIndex >= flexygo.utils.colors.length) {
                                    colorIndex = 0;
                                }
                                context.strokeStyle = flexygo.utils.hexToRgbA(flexygo.utils.colors[colorIndex], '1');
                                context.lineWidth = 3;
                                context.strokeRect(face.Left, face.Top, face.Right - face.Left, face.Bottom - face.Top);
                                context.fillStyle = flexygo.utils.hexToRgbA(flexygo.utils.colors[colorIndex], '0.6');
                                context.fillRect(face.Left, face.Top, face.Right - face.Left, face.Bottom - face.Top);
                                let faceItm = $('<div style="float:left;margin-right:10px;"/>');
                                faceItm.css('border', 'solid 2px ' + flexygo.utils.hexToRgbA(flexygo.utils.colors[colorIndex], '1'));
                                faceItm.css('background-color', flexygo.utils.hexToRgbA(flexygo.utils.colors[colorIndex], '0.6'));
                                faceItm.data(face);
                                if (face.MostPosibleObject) {
                                    faceItm.html(face.MostPosibleObject.ObjectName + ' ' + face.MostPosibleObject.ObjectId + '<br/> Dist: ' + face.MostPosibleObject.Distance);
                                }
                                else {
                                    faceItm.html('Unknown');
                                }
                                modal.append(faceItm);
                                colorIndex += 1;
                            });
                            let imgH = $('<img style="width:100%;margin-top:10px"/>');
                            imgH.attr('src', canvas.toDataURL());
                            modal.append(imgH);
                        };
                        img.src = flexygo.utils.resolveUrl(file);
                    });
                }
            }
            wc.FlxImageManagerElement = FlxImageManagerElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-imagemanager', flexygo.ui.wc.FlxImageManagerElement);
//# sourceMappingURL=flx-imagemanager.js.map