var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
            * Library for the FlxBarcodeElement web component.
            *
            * @class FlxBarcodeElement
            * @constructor
            * @return {FlxBarcodeElement}
            */
            class FlxBarcodeElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                    * Set when component is attached to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                    this.type = 'text';
                    this.property = null;
                    this.options = null;
                    this.value = null;
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = $(this);
                    let isFilter = false;
                    let propName = element.attr('property');
                    if (propName && flexygo.utils.isBlank(this.options)) {
                        let parentCtl = element.closest('flx-edit,flx-list,flx-propertymanager,flx-view');
                        if (parentCtl && parentCtl.length > 0) {
                            let wcParent = parentCtl[0];
                            this.options = jQuery.extend(true, {}, wcParent.properties[propName]);
                        }
                        this.property = propName;
                    }
                    if (typeof element.attr('Required') !== 'undefined') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IsRequired = true;
                    }
                    if (typeof element.attr('Disabled') !== 'undefined') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Locked = true;
                    }
                    let RequiredMessage = element.attr('RequiredMessage');
                    if (RequiredMessage && RequiredMessage !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IsRequiredMessage = RequiredMessage;
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
                    let RegExp = element.attr('RegExp');
                    if (RegExp && RegExp !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.RegExp = RegExp;
                    }
                    let RegExpText = element.attr('RegExpText');
                    if (RegExpText && RegExpText !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.RegExpText = RegExpText;
                    }
                    let ValidatorMessage = element.attr('ValidatorMessage');
                    if (ValidatorMessage && ValidatorMessage !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.ValidatorMessage = ValidatorMessage;
                    }
                    let IconClass = element.attr('IconClass');
                    if (IconClass && IconClass !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IconClass = IconClass;
                    }
                    let HelpId = element.attr('HelpId');
                    if (HelpId && HelpId !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.HelpId = HelpId;
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
                    if (!isFilter && Hide && Hide !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Hide = Hide == 'true';
                    }
                    let BarcodeReaders = element.attr('BarcodeReaders');
                    if (BarcodeReaders && BarcodeReaders !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.BarcodeReaders = this.formatReaders(BarcodeReaders);
                    }
                    this.init();
                    let Value = element.attr('Value');
                    if (Value && Value !== '') {
                        this.setValue(Value);
                    }
                    this.connected = true;
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
                    if (attrName.toLowerCase() === 'property' && newVal && newVal !== '') {
                        let propName = newVal;
                        let parentCtl = element.closest('flx-edit, flx-filter, flx-list,flx-propertymanager');
                        if (parentCtl && parentCtl.length > 0) {
                            let wcParent = parentCtl[0];
                            if (parentCtl.is('flx-filter')) {
                                let objName = element.attr('object');
                                this.options = jQuery.extend(true, {}, wcParent.properties[objName + '-' + propName]);
                            }
                            else {
                                this.options = jQuery.extend(true, {}, wcParent.properties[propName]);
                            }
                        }
                        this.property = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'required') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        if (typeof element.attr('required') !== 'undefined') {
                            this.options.IsRequired = true;
                        }
                        else {
                            this.options.IsRequired = false;
                        }
                        element.find('input[type=text]').prop('required', this.options.IsRequired);
                    }
                    if (attrName.toLowerCase() === 'disabled') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        if (typeof element.attr('disabled') !== 'undefined') {
                            this.options.Locked = true;
                        }
                        else {
                            this.options.Locked = false;
                        }
                        element.find('input[type=text]').prop('disabled', this.options.Locked);
                    }
                    if (attrName.toLowerCase() === 'requiredmessage' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IsRequiredMessage = newVal;
                        this.refresh();
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
                            element.attr('Control-Class', this.options.CssClass);
                            element.attr('Class', this.options.CssClass);
                            this.refresh();
                        }
                    }
                    if (attrName.toLowerCase() === 'regexp' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.RegExp = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'regexptext' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.RegExpText = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'placeholder' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.PlaceHolder = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'iconclass' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IconClass = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'helpid' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.HelpId = newVal;
                        this.refresh();
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
                    if (attrName.toLowerCase() === 'barcodereaders' && newVal) {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.BarcodeReaders = this.formatReaders(newVal);
                    }
                }
                refresh() {
                    let val = this.getValue();
                    this.init();
                    if (val && val !== "") {
                        this.setValue(val);
                    }
                }
                init() {
                    let me = $(this);
                    if (me.attr('mode') && me.attr('mode').toLowerCase() === 'view') {
                        this.initViewMode();
                    }
                    else {
                        this.initEditMode();
                        $(this).find('input[type=text]').off('keydown.tabcontrol').on('keydown.tabcontrol', (ev) => {
                            if (ev.key === 'Tab' || ev.key === 'Enter') {
                                this.waitToTab($(this));
                                return;
                            }
                        });
                    }
                }
                initScanCodeUI() {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (document.querySelector('barcode-scanner'))
                            return;
                        //We search for possible device cameras
                        let cameras;
                        try {
                            cameras = yield Html5Qrcode.getCameras();
                        }
                        catch (err) {
                            console.log(err);
                        }
                        //We create and append the UI directly to the body
                        const is_mobile = flexygo.utils.isAgentMobile();
                        const scannerUI = this.getScannerUI(is_mobile, cameras);
                        const scanner_backdrop = $(`<div id="barcode-backdrop-${this.property}" class="barcode-backdrop"/>`);
                        const close_button = $(`<span id="barcode-scanner-close-${this.property}" class="barcode-scanner-close flx-icon icon-close-2 clickable ${is_mobile ? 'barcode-mobile' : ''}"/>`);
                        const body = $('body');
                        body.append(scanner_backdrop);
                        body.append(scannerUI);
                        body.append(close_button);
                        close_button.click(() => this.closeScanUI());
                        scanner_backdrop.click(() => this.closeScanUI());
                        //We declare functions inside the function to avoid passing file_scanner and camera_scanner variables
                        //We also declare them here so onScanSuccess is declared before being used
                        const readBarcodeFile = (file) => {
                            file_scanner.scanFile(file, true)
                                .then(onScanSuccess)
                                .catch(err => {
                                flexygo.msg.error(`Error scanning file. Reason: ${err}`);
                            });
                        };
                        const onScanSuccess = (decodedText) => {
                            if (camera_scanner)
                                camera_scanner.stop();
                            this.setValue(decodedText);
                            this.closeScanUI();
                            this.waitToTab($(this));
                        };
                        //Activate Barcode Camera scanner if the device've got cameras
                        let camera_scanner;
                        if (!!cameras) {
                            //On phones we just set the default camera as the environment one, and we will only allow switch between environment and user one with the switch button
                            //On pc we will set the first camera that we get as the main, and we will allow switching to any camera that is detected using the flx-combo
                            const camera_options = is_mobile ? { facingMode: "environment" } : { deviceId: { exact: cameras[0].id } };
                            camera_scanner = new Html5Qrcode(`barcode-scanner-${this.property}`);
                            camera_scanner.start(camera_options, { fps: 10, qrbox: 250 }, onScanSuccess);
                            //Camera Select input, when value is changed we just change the camera the plugin uses
                            const cameras_combo = document.querySelector(`#barcode-${this.property} flx-combo`);
                            let deactivating = false; //We use this variable to avoid user clicking multiple times the button and colapsing the scanner
                            cameras_combo.addEventListener('change', input => {
                                if (deactivating)
                                    return;
                                deactivating = true;
                                camera_scanner.stop().then(() => {
                                    deactivating = false;
                                    camera_scanner.start({ deviceId: { exact: input.currentTarget.getValue() } }, { fps: 10, qrbox: 250 }, onScanSuccess);
                                });
                            });
                            //Camera Switch button, when clicked we just alternate between environment and user camera
                            let facing_environment = true;
                            const switch_button = document.querySelector(`#barcode-${this.property} button`);
                            switch_button.addEventListener('click', () => {
                                facing_environment = !facing_environment;
                                camera_scanner.stop().then(() => {
                                    const facing_mode = facing_environment ? 'environment' : 'user';
                                    camera_scanner.start({ facingMode: facing_mode }, { fps: 10, qrbox: 250 }, onScanSuccess);
                                });
                            });
                        }
                        //Activate Barcode File scanner
                        const file_scanner = new Html5Qrcode(`barcode-file-${this.property}`);
                        const file_input = document.getElementById(`barcode-file-${this.property}`);
                        file_input.addEventListener('change', (event) => {
                            const files = event.target.files;
                            if (event.length !== 0) {
                                readBarcodeFile(files[0]);
                            }
                        });
                        //Drag and drop functionality
                        //On drag we just read the dragged file
                        const drop_zone = document.getElementById(`barcode-drop-${this.property}`);
                        drop_zone.addEventListener('drop', event => {
                            const files = event.dataTransfer.files;
                            if (files.length > 0) {
                                readBarcodeFile(files[0]);
                            }
                        });
                        //Drag enter and drag leave style changes
                        ['dragenter', 'dragover'].forEach(eventType => {
                            drop_zone.addEventListener(eventType, () => drop_zone.classList.add('dropping'));
                        });
                        ['dragleave', 'drop'].forEach(eventType => {
                            drop_zone.addEventListener(eventType, () => drop_zone.classList.remove('dropping'));
                        });
                    });
                }
                getScannerUI(is_mobile, cameras) {
                    const has_cameras = !!cameras;
                    let cameras_options;
                    if (has_cameras) {
                        cameras_options = cameras.map(camera => `<option value="${camera.id}">${camera.label}</option>`);
                    }
                    //The button that switches HIDDEN class of the two sections ONLY USED in MOBILE
                    const toggle_mobile_button = `<button class="barcode-switch" onclick="let divs = this.closest('.barcode-scanner').children; for (let i = 0; i < divs.length; i++) {divs[i].classList.toggle('hidden');}">`;
                    return `<span class="barcode-scanner ${is_mobile ? 'barcode-mobile' : ''}">
                <div id="barcode-${this.property}" class="barcode-scanner-reader ${has_cameras ? '' : 'hidden'}">
                    <h1 class="align-vertical-center">${flexygo.localization.translate('flxBarcode.scanCode')}</h1>
                    <div id="barcode-scanner-${this.property}" class="barcode-scanner-container"></div>
                    <span class="barcode-select-span align-vertical-center ${is_mobile ? 'hidden' : ''}">
                        <i class="fa fa-camera"></i>
                        <flx-combo>
                            ${cameras_options}
                        </flx-combo>
                    </span>
                    <span class="barcode-button-span centerFlex ${!is_mobile ? 'hidden' : ''}">
                        <button class="barcode-camera-switch">
                            <i class="flx-icon icon-photo-camera-8 icon-lg icon-fw margin-right-xs"></i>
                            ${flexygo.localization.translate('flxBarcode.switchCamera')}
                        </button>
                    </span>
                    ${is_mobile ? toggle_mobile_button + flexygo.localization.translate('flxBarcode.uploadImage') + '</button>' : ''}
                </div>
                <div class="barcode-scanner-file ${is_mobile && has_cameras ? 'hidden' : ''}">
                    <h1 class="align-vertical-center" >${flexygo.localization.translate('flxBarcode.uploadImage')}</h1>
                    <input id="barcode-file-${this.property}" class="hidden" type="file" id="qr-input-file" accept="image/*">
                    <span id="barcode-drop-${this.property}" class="barcode-dropzone centerFlex">
                        <i class="flx-icon icon-upload-1"></i>
                        ${flexygo.localization.translate('upload.info')}
                    </span>
                    <span class="barcode-button-span centerFlex">
                        <button class="barcode-upload" onclick="this.closest('.barcode-scanner-file').querySelector('#barcode-file-${this.property}').click()">
                            <i class="flx-icon icon-upload"></i>
                            ${flexygo.localization.translate('documentmanager.upload')}
                        </button>
                    </span>
                    ${is_mobile && has_cameras ? toggle_mobile_button + flexygo.localization.translate('flxBarcode.scanCode') + '</button>' : ''}
                </div>
            </span>`;
                }
                formatReaders(readers_string) {
                    return readers_string.split('|').map(reader_format => {
                        //If the format does not end with _reader it means that it's one of the new ones included in the new plugin so it does not require changes
                        if (!reader_format.endsWith('_reader')) {
                            return reader_format;
                        }
                        //Most of the new formats name change can just be substituted by this line, for those who don't is the following switch
                        reader_format = reader_format.replace('_reader', '').toUpperCase();
                        switch (reader_format) {
                            case 'CODE_39_VIN':
                                return 'CODE_39';
                            case 'I2OF5':
                            case '2OF5':
                                return 'ITF';
                            case 'EAN':
                                return 'EAN_13';
                            case 'UPC':
                                return 'UPC_A';
                            default:
                                return reader_format;
                        }
                    });
                }
                //After inserting we wait for dependencies to end, and we autotab to next input
                waitToTab(div) {
                    const flxEdit = $(this).closest('flx-edit');
                    const dependenciesLoad = setInterval(() => {
                        if (flxEdit.find('.item #flx-dependency-loader, .grid-stack-item #flx-dependency-loader').length === 0) {
                            if (!$(this).find('> div').hasClass('has-error')) {
                                this.tabToNext(div, flxEdit);
                            }
                            clearInterval(dependenciesLoad);
                        }
                    }, 200);
                }
                tabToNext(div, flxEdit) {
                    let posX, posY;
                    if (!div.hasClass('grid-stack-item')) {
                        div = div.closest('.grid-stack-item');
                    }
                    posX = div.attr('data-gs-x');
                    posY = div.attr('data-gs-y');
                    let items = flxEdit.find('.grid-stack-item');
                    let greaterPositions = items.map(index => {
                        let itemXPos = items[index].getAttribute('data-gs-x');
                        let itemYPos = items[index].getAttribute('data-gs-y');
                        if (itemYPos > posY || (itemYPos === posY && itemXPos > posX)) {
                            return { x: itemXPos, y: itemYPos };
                        }
                    }).sort(this.orderStackItems);
                    if (greaterPositions.length === 0) {
                        flxEdit.closest('flx-module').find('.cntBodyFooter  .saveButton').focus();
                        return;
                    }
                    let container = $(`[data-gs-x="${greaterPositions[0].x}"][data-gs-y="${greaterPositions[0].y}"]`);
                    let input = container.find(':not(flx-dbcombo > div, flx-dbcombo > ul > div) > input:not(.hiddden, [disabled], .onoffswitch-checkbox), flx-dbcombo:not([disabled]) :not( ul > div) > input[type="search"]:not(.hiddden, [disabled], .onoffswitch-checkbox), select:not(.hiddden), textarea:not(.hiddden, [disabled])');
                    if (input.length > 0) {
                        input.focus().select();
                    }
                    else {
                        this.tabToNext(container, flxEdit);
                    }
                }
                orderStackItems(a, b) {
                    if (a.y > b.y || (a.y === b.y && a.x > b.x)) {
                        return 1;
                    }
                    else {
                        return -1;
                    }
                }
                closeScanUI() {
                    document.getElementById(`barcode-${this.property}`).parentElement.remove();
                    document.getElementById(`barcode-backdrop-${this.property}`).remove();
                    document.getElementById(`barcode-scanner-close-${this.property}`).remove();
                }
                initViewMode() {
                    let me = $(this), iconsLeft;
                    let control = $('<div>');
                    me.html(control);
                    let input = $('<label class="form-control input-view" />');
                    if (this.options && this.options.IconClass && this.options.IconClass !== '') {
                        iconsLeft = $('<span class="input-group-addon" ><i class="' + this.options.IconClass + '" /></span>');
                        control.append(iconsLeft);
                    }
                    control.append(input);
                    if (iconsLeft) {
                        control.addClass("input-group");
                    }
                    if (this.options && this.options.Style) {
                        me.children('div').attr('style', this.options.Style);
                    }
                    if (this.options && this.options.CssClass) {
                        me.children('div').addClass(this.options.CssClass);
                    }
                    if (this.options && this.options.Hide) {
                        me.addClass("hideControl");
                    }
                }
                initEditMode() {
                    let me = $(this);
                    let iconsLeft;
                    let barcode_button = $(`<div class="input-group-btn">
                <button class="btn btn-default" type="button"><i class="flx-icon icon-barcode-1" /></button>
            </div>`).on('click', () => { this.initScanCodeUI(); });
                    let control = $('<div class="input-group"/>');
                    let input = $('<input type="text" class="form-control" />');
                    input.on('blur', () => { me.trigger('blur'); });
                    if (this.options && this.options.IconClass && this.options.IconClass !== '') {
                        iconsLeft = $(`<span class="input-group-addon" ><i class="${this.options.IconClass}'" /></span>`);
                        control.append(iconsLeft);
                        control.addClass("input-group");
                    }
                    control.append(input);
                    control.append(barcode_button);
                    me.html(control);
                    this.setOptions();
                }
                setOptions() {
                    let me = $(this);
                    let input = me.find('input[type=text]');
                    input.on('change.refreshvalue', (e) => {
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
                        me.attr('disabled', 'disabled');
                    }
                    if (this.options && this.options.PlaceHolder) {
                        input.attr('PlaceHolder', this.options.PlaceHolder);
                    }
                    if (this.options && this.options.Style) {
                        me.children('div').attr('style', this.options.Style);
                    }
                    if (this.options && this.options.CssClass) {
                        me.children('div').addClass(this.options.CssClass);
                    }
                    if (this.options && this.options.IsRequired) {
                        input.prop('required', this.options.IsRequired);
                    }
                    if (this.options && this.options.IsRequiredMessage) {
                        input.attr('data-msg-required', this.options.IsRequiredMessage);
                    }
                    const module = me.closest('flx-module')[0];
                    if ((this.options && (this.options.CauseRefresh || this.options.SQLValidator)) || (module && module.moduleConfig && module.moduleConfig.PropsEventDependant && module.moduleConfig.PropsEventDependant.includes(this.property))) {
                        input.on('change', (e) => {
                            if (this.options && this.options.ControlType == 'decimal' && this.getValue()) {
                                let oldValue = input[0].value;
                                input.val('');
                                input.val(parseFloat(oldValue));
                            }
                            let ev = {
                                class: "property",
                                type: "changed",
                                sender: this,
                                masterIdentity: this.property
                            };
                            flexygo.events.trigger(ev, me);
                            if ($(this).find('input[type=text].error').length > 0) {
                                $(this).find('> div').addClass('has-error');
                                $(this).find('> div > label').addClass('has-error txt-danger');
                            }
                        });
                    }
                    if (this.options && this.options.RegExp && this.options.RegExp !== '') {
                        input.attr('regex', this.options.RegExp);
                    }
                    if (this.options && this.options.RegExpText && this.options.RegExpText !== '') {
                        input.attr('data-msg-regex', this.options.RegExpText);
                    }
                    if (this.options && this.options.ValidatorMessage && this.options.ValidatorMessage !== '') {
                        input.attr('data-msg-sqlvalidator', this.options.ValidatorMessage);
                    }
                    if (this.options && this.options.Hide) {
                        me.addClass("hideControl");
                    }
                    input.attr('autocomplete', 'off');
                }
                setValue(value) {
                    let me = $(this);
                    if (me.attr('mode') && me.attr('mode').toLowerCase() === 'view') {
                        this.setValueView(value);
                        me.attr('value', value);
                    }
                    else {
                        let input = me.find('input[type=text]');
                        me.attr('value', value);
                        input.val(value);
                    }
                }
                setValueView(value) {
                    this.value = value;
                    let input = $(this).find('label');
                    let regExp = /[&<>"'`=\/]/mi;
                    if (value !== null && regExp.test(value)) {
                        value = flexygo.string.escapeHTML(value);
                    }
                    input.html(value);
                }
                getValue() {
                    let me = $(this);
                    if (me.attr('mode') && me.attr('mode').toLowerCase() === 'view') {
                        return this.value;
                    }
                    let input = me.find('input[type=text]');
                    if (input.val() === '') {
                        return null;
                    }
                    return input.val();
                }
                /**
                * Trigger Dependencies.
                * @method triggerDependencies
                */
                triggerDependencies() {
                    let me;
                    let input;
                    me = $(this);
                    input = me.find('input[type=text]');
                    input.trigger('change');
                }
            }
            /**
           * Array of observed attributes.
           * @property observedAttributes {Array}
           */
            FlxBarcodeElement.observedAttributes = ['type', 'property', 'required', 'disabled', 'requiredmessage', 'mask', 'style', 'class', 'decimalplaces', 'minvalue', 'maxvalue', 'maxvaluemessage', 'minvaluemessage', 'regexp', 'regexptext', 'validatormessage', 'placeholder', 'iconclass', 'helpid', 'allownewfunction', 'allownewobject', 'hide', 'tag', 'barcodereaders'];
            wc.FlxBarcodeElement = FlxBarcodeElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-barcode', flexygo.ui.wc.FlxBarcodeElement);
//# sourceMappingURL=flx-barcode.js.map