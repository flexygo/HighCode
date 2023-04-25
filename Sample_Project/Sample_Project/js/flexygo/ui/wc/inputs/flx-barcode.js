;
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
                        this.options.BarcodeReaders = BarcodeReaders;
                    }
                    this.init();
                    let Value = element.attr('Value');
                    if (Value && Value !== '') {
                        this.setValue(Value);
                    }
                    this.connected = true;
                }
                /**
               * Array of observed attributes.
               * @property observedAttributes {Array}
               */
                static get observedAttributes() {
                    return ['type', 'property', 'required', 'disabled', 'requiredmessage', 'mask', 'style', 'class', 'decimalplaces', 'minvalue', 'maxvalue', 'maxvaluemessage', 'minvaluemessage', 'regexp', 'regexptext', 'validatormessage', 'placeholder', 'iconclass', 'helpid', 'allownewfunction', 'allownewobject', 'hide', 'tag', 'barcodereaders'];
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
                        this.options.BarcodeReaders = newVal;
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
                    if (/iPad|iPhone|iPod/.test(navigator.platform)) {
                        flexygo.msg.warning(flexygo.localization.translate('flxBarcode.IOSerr'));
                        return;
                    }
                    let body = $('body');
                    if (body.find('.barcode-scanner').length > 0)
                        return;
                    let scannerUI = $(`<div id="barcode-${this.property}" class="barcode-scanner hidden"/>`);
                    let scannerBackdrop = $('<div class="barcode-backdrop hidden"/>');
                    let closeBtn = $('<span class="flx-icon icon-close-2 clickable"/>');
                    let scannerLine = $('<div class="scannerLine"/>');
                    body.append(scannerBackdrop);
                    body.append(scannerUI);
                    scannerUI.append('<canvas/>');
                    scannerUI.append(closeBtn);
                    scannerUI.append(scannerLine);
                    closeBtn.click(() => {
                        this.closeScanUI();
                    });
                    scannerBackdrop.click(() => {
                        this.closeScanUI();
                    });
                    this.initScanMode();
                }
                getOptions() {
                    let readers;
                    if (this.options && this.options.BarcodeReaders) {
                        readers = this.options.BarcodeReaders.split('|').map(element => {
                            return { format: element, config: {} };
                        });
                    }
                    else {
                        readers = [{ format: 'code_128_reader', config: {} },
                            { format: 'ean_reader', config: {} },
                            { format: 'ean_8_reader', config: {} },
                            { format: 'code_39_reader', config: {} },
                            { format: 'code_39_vin_reader', config: {} },
                            { format: 'codabar_reader', config: {} },
                            { format: 'upc_reader', config: {} },
                            { format: 'upc_e_reader', config: {} },
                            { format: 'i2of5_reader', config: {} },
                            { format: '2of5_reader', config: {} },
                            { format: 'code_93_reader', config: {} }
                        ];
                    }
                    let quaggaState = {
                        decoder: {
                            readers: readers
                        },
                        frequency: 10,
                        inputStream: {
                            constraints: {
                                aspectRatio: {
                                    min: 1,
                                    max: 100
                                },
                                facingMode: 'environment',
                                height: { min: 480 },
                                width: { min: 640 }
                            },
                            type: 'ImageStream',
                        },
                        lastResult: null,
                        locate: true,
                        locator: {
                            halfSample: true,
                            patchSize: 'medium'
                        },
                        numOfWorkers: 2
                    };
                    return quaggaState;
                }
                initScanMode() {
                    let fileInput = null;
                    Quagga.init(this.getOptions(), (err) => {
                        if (err) {
                            $('.barcode-scanner').remove();
                            $('.barcode-backdrop').remove();
                            flexygo.msg.warning(flexygo.localization.translate('flxBarcode.noCamera'));
                            return;
                        }
                        $('body').addClass('barcodeLock');
                        $('.barcode-backdrop').removeClass('hidden');
                        $(`#barcode-${this.property}`).removeClass('hidden');
                        Quagga.start();
                    });
                    let lastValue = "";
                    Quagga.offDetected();
                    Quagga.onDetected((result) => {
                        var code = result.codeResult.code;
                        if (code === lastValue) {
                            this.setValue(code);
                            this.closeScanUI();
                            $(this).find('input[type=text]').trigger('change');
                            this.waitToTab($(this));
                        }
                        else {
                            lastValue = code;
                        }
                    });
                }
                waitToTab(div) {
                    let flxEdit = $(this).closest('flx-edit');
                    var dependenciesLoad = setInterval(() => {
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
                    $('.barcode-scanner').remove();
                    $('.barcode-backdrop').remove();
                    $('body').removeClass('barcodeLock');
                    Quagga.stop();
                }
                initViewMode() {
                    let me = $(this);
                    let iconsLeft;
                    let iconsRight;
                    let control = $('<div>');
                    me.html(control);
                    let input = $('<label class="form-control input-view" />');
                    if (this.options && this.options.IconClass && this.options.IconClass !== '') {
                        iconsLeft = $('<span class="input-group-addon" ><i class="' + this.options.IconClass + '" /></span>');
                        control.append(iconsLeft);
                    }
                    control.append(input);
                    if (iconsRight) {
                        control.append(iconsRight);
                    }
                    if (iconsLeft || (iconsRight && iconsRight.length > 0)) {
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
                    let iconsRight = this.getIconButtons();
                    let control = $('<div>');
                    let input = $('<input type="text" class="form-control" />');
                    input.on('blur', (e) => { me.trigger('blur'); });
                    if (this.options && this.options.IconClass && this.options.IconClass !== '') {
                        iconsLeft = $('<span class="input-group-addon" ><i class="' + this.options.IconClass + '" /></span>');
                    }
                    if (iconsLeft) {
                        control.append(iconsLeft);
                    }
                    control.append(input);
                    if (iconsRight && iconsRight.length > 0) {
                        control.append(iconsRight);
                    }
                    if (iconsLeft || (iconsRight && iconsRight.length > 0)) {
                        control.addClass("input-group");
                    }
                    me.html(control);
                    this.setOptions();
                    $(this).find("input[type=file]").on("change", (e) => {
                        if (e.target.files && e.target.files.length) {
                            let options = this.getOptions();
                            let config = $.extend({}, options, { src: URL.createObjectURL(e.target.files[0]) });
                            Quagga.decodeSingle(config, (result) => {
                                if (result && result.codeResult && result.codeResult.code) {
                                    var code = result.codeResult.code;
                                    this.setValue(code);
                                    $(this).find('input[type=text]').trigger('change');
                                    this.waitToTab($(this));
                                }
                                else {
                                    flexygo.msg.warning(flexygo.localization.translate('flxBarcode.noCode'));
                                }
                            });
                        }
                    });
                }
                getIconButtons() {
                    let ret = $('<div class="input-group-btn" />');
                    let me = $(this);
                    let editCtl = me.closest('flx-edit, flx-list')[0];
                    let parseEdit = function (val, ctx, property) { return val; };
                    if (editCtl && editCtl.parseEditString) {
                        parseEdit = editCtl.parseEditString;
                    }
                    let scanIcon = $('<button class="btn btn-default" type="button"><i class="flx-icon icon-barcode-1" /></button>').on('click', (e) => {
                        this.initScanCodeUI();
                    });
                    scanIcon = $(`<label class="btn upload-btn">
                <i class="flx-icon icon-barcode-1"></i><input type="file" accept="image/*;capture=camera" capture class="hide" multiple/>
            </label>`);
                    ret.append(scanIcon);
                    if (ret.html() === '') {
                        return null;
                    }
                    else {
                        return ret;
                    }
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
                            flexygo.events.trigger(ev);
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
            wc.FlxBarcodeElement = FlxBarcodeElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-barcode', flexygo.ui.wc.FlxBarcodeElement);
//# sourceMappingURL=flx-barcode.js.map