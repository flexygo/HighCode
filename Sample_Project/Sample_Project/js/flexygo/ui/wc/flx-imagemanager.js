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
                    return ['modulename', 'objectname', 'objectwhere', 'objectid', 'singleimage', 'empty'];
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
                        var defString;
                        var defObject;
                        defString = flexygo.history.getDefaults(this.objectName, me);
                        defObject = JSON.parse(flexygo.utils.parser.replaceAll(defString, "'", '"'));
                        let wcModule = me.closest('flx-module')[0];
                        this.rObjectName = (this.objectName && this.objectId) ? this.objectName : (defObject) ? defObject.ObjectName : (wcModule.objectdefaults) ? wcModule.objectdefaults.ObjectName : '';
                        this.rObjectId = (this.objectName && this.objectId) ? this.objectId : (defObject) ? defObject.ObjectId : (wcModule.objectdefaults) ? wcModule.objectdefaults.ObjectId : '';
                        this.render();
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
                        var rendered;
                        rendered = `<div class="im-btn-container">
                                <label method="upload" value="" type="" class="btn btn-default bg-outstanding btn-file im-btn">
                                    <i class="flx-icon icon-upload-1" flx-fw=""></i><span class="hidden-xs">  ` + flexygo.localization.translate('imagemanager.upload') + `</span><input method="upload" value="" type="file" multiple class="hide" accept="image/*" />
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
                                
                            </div>
                            <div class="im-pry-container im-wall im-transition">
                           </div>`;
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
                */
                renderImage(imageId, name, descrip, classId, classDescrip, mainImage, orderNumber, path) {
                    try {
                        let me = $(this);
                        var rendered;
                        var iconSize;
                        var iconEdit;
                        iconSize = (me.find('div.im-pry-container').width() > 250) ? 'icon-3x' : 'icon-2x';
                        iconEdit = (this.singleImage && mainImage) ? 'fa fa-image' : 'flx-icon icon-pencil';
                        rendered = `<div imageId="` + imageId + `" order="` + orderNumber + `" class="im-item im-transition">
                                <div method="" class="im-data im-transition">
                                    <div method="mainimage" value="` + mainImage + `" class="ignore-drag im-mainimage im-transition">
                                        <i class="flx-icon icon-star im-item-corner-icon im-transition" flx-fw=""></i>
                                        <div class="im-item-corner im-transition"></div>
                                    </div>
                                    <div method="removeimage" class="ignore-drag im-removeimage im-transition">
                                        <i class="flx-icon flx-icon icon-document-remove" flx-fw=""></i>
                                    </div>
                                    <div class="im-data-container im-data-descrip im-transition">
                                        <span class="im-name im-data-item im-data-name im-transition size-l">` + name.toUpperCase() + `</span>
                                        <hr class="im-transition">
                                        <span class="im-descrip im-data-item im-transition size-xs"><small>` + classDescrip.toUpperCase() + `</small></span>
                                    </div>
                                    <div  method="preview" class="ignore-drag im-data-container im-data-container-action im-data-preview im-transition" data-src="` + flexygo.utils.resolveUrl(path) + `" data-sub-html="<h3>` + name.toUpperCase() + `</h3><p>` + descrip + `</p>" >
                                        <img style="display:none;" src="` + flexygo.utils.resolveUrl(path) + `" />
                                        <i class="flx-icon icon-eye ` + iconSize + ` im-transition im-data-icon im-data-item" flx-fw=""></i>
                                    </div>
                                    <div  method="edit" class="ignore-drag im-data-container im-data-container-action im-data-edit im-transition">
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
                                this.wall.fixSize({
                                    height: me.find('div.im-pry-container').width() / 1.34,
                                    width: me.find('div.im-pry-container').width() / 1.34,
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
                        var dragDropZone;
                        this.wall = new Freewall(me.find('div.im-wall'));
                        this.wall.reset({
                            selector: '.im-item',
                            draggable: !this.singleImage && !flexygo.utils.isAgentMobile(),
                            animate: true,
                            cellW: () => { if (this.singleImage) {
                                return me.find('div.im-pry-container').width() / 1.35;
                            }
                            else {
                                return 250;
                            } },
                            cellH: () => { if (this.singleImage) {
                                return me.find('div.im-pry-container').width() / 1.35;
                            }
                            else {
                                return 250;
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
                                    flexygo.nav.openPage('edit', 'sysObjectImageSetting', "ObjectName = '" + this.rObjectName + "'", null, 'modal900x500', false, me);
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
                                };
                                flexygo.ajax.post('~/api/ImageManager', 'GetImages', params, (response) => {
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
                            if (method === 'mainimage') {
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
                            };
                            flexygo.ajax.post('~/api/ImageManager', 'SetImage', params, (response) => {
                                if (response && !response.imageError) {
                                    this.renderImage(response.imageId, response.name, response.descrip, response.classId, response.classDescrip, response.mainImage, response.orderNumber, response.path);
                                    flexygo.msg.success('imagemanager.uploaded');
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
                            };
                            flexygo.ajax.post('~/api/ImageManager', 'GetImages', params, (response) => {
                                if (response[0] && !response[0].imageError) {
                                    for (let image of response) {
                                        this.renderImage(image.imageId, image.name, image.descrip, image.classId, image.classDescrip, image.mainImage, image.orderNumber, image.path);
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
                        flexygo.ajax.post('~/api/ImageManager', 'UpdateImage', params, (response) => {
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
                        flexygo.ajax.post('~/api/ImageManager', 'RemoveImage', params, (response) => {
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
                        };
                        flexygo.ajax.post('~/api/ImageManager', 'RemoveAllImages', params, (response) => {
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
                        let me = $(this);
                        var params;
                        params = {
                            'ObjectName': objectName,
                            'ObjectId': objectId,
                        };
                        flexygo.ajax.post('~/api/ImageManager', 'DownloadAllImages', params, (response) => {
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
                            this.setImage(file.name, reader.result);
                        };
                        reader.readAsDataURL(file);
                    }
                    catch (ex) {
                        console.log(ex);
                    }
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
                            //showThumbByDefault: false,
                            preload: 2
                        });
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
            }
            wc.FlxImageManagerElement = FlxImageManagerElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-imagemanager', flexygo.ui.wc.FlxImageManagerElement);
//# sourceMappingURL=flx-imagemanager.js.map