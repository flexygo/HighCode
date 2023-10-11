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
        * Library for the FlxWacomElement web component.
        *
        * @class FlxWacomElement
        * @constructor
        * @return {FlxWacomElement}
            */
            class FlxWacomElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                   * Set when component is attached to DOM
                   * @property connected {boolean}
                   */
                    this.connected = false;
                    this.type = 'wacom';
                    this.property = null;
                    this.options = null;
                    this.moduleName = null;
                    this.timeout = null;
                    this.mode = 'wacom';
                    this.readonly = false;
                    this.myCM = null; //TODO_TS
                    this.control = null;
                    this.value = null;
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = $(this);
                    this.type = element.attr('type') || 'html';
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
                    let Class = element.attr('Class');
                    if (Class && Class !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.CssClass = Class;
                        element.attr('Control-Class', this.options.CssClass);
                        element.attr('Class', '');
                    }
                    let PlaceHolder = element.attr('PlaceHolder');
                    if (PlaceHolder && PlaceHolder !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.PlaceHolder = PlaceHolder;
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
                    if (Hide && Hide !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Hide = (Hide == 'true') ? true : false;
                    }
                    this.init();
                    let Value = element.attr('Value');
                    if (Value && Value !== '') {
                        this.setValue(Value);
                    }
                    this.connected = true;
                }
                attributeChangedCallback(attrName, oldVal, newVal) {
                    let element = $(this);
                    if (!this.connected) {
                        return;
                    }
                    if (this.connected) {
                        if (attrName.toLowerCase() === 'type' && newVal && newVal !== '') {
                            this.type = newVal;
                            this.refresh();
                            //if (this.moduleName) { this.init(); }
                        }
                        if (attrName.toLowerCase() === 'property' && newVal && newVal !== '') {
                            let propName = newVal;
                            let parentCtl = element.closest('flx-edit, flx-list,flx-propertymanager');
                            if (parentCtl && parentCtl.length > 0) {
                                let wcParent = parentCtl[0];
                                this.options = jQuery.extend(true, {}, wcParent.properties[propName]);
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
                            element.find('textarea').prop('required', this.options.IsRequired);
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
                            element.find('textarea, input, button').prop('disabled', this.options.Locked);
                            if (this.options.Locked) {
                                element.find('.note-editable').attr('contenteditable', 'false');
                            }
                            else {
                                element.find('.note-editable').attr('contenteditable', 'true');
                            }
                            this.refresh();
                        }
                        if (attrName.toLowerCase() === 'requiredmessage' && newVal && newVal !== '') {
                            if (!this.options) {
                                this.options = new flexygo.api.ObjectProperty();
                            }
                            this.options.IsRequiredMessage = newVal;
                            this.refresh();
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
                            this.init();
                        }
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
                    let script;
                    if ($('.wacomApiFunctions').length == 0) {
                        //append first plugin file
                        script = document.createElement("script");
                        script.type = "text/javascript";
                        script.classList.add("wacomApiFunctions");
                        script.src = "./js/plugins/wacomSignature/wgssSigCaptX.js";
                        document.body.appendChild(script);
                        //append second plugin file
                        script = document.createElement("script");
                        script.type = "text/javascript";
                        script.classList.add("wacomApiFunctions");
                        script.src = "./js/plugins/wacomSignature/SigCaptX-Globals.js";
                        document.body.appendChild(script);
                    }
                    if (me.attr('mode') && me.attr('mode').toLowerCase() === 'view') {
                        this.initViewMode();
                    }
                    else {
                        this.initEditMode();
                    }
                }
                initViewMode() {
                    let me = $(this);
                    this.initEditMode();
                    me.parent('div[data-tag="control"]').attr('style', 'height:inherit;');
                    me.find('i').remove();
                    me.find('div.ctl-container').removeClass().addClass('cpr-view-container');
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
                }
                initEditMode() {
                    let me = $(this);
                    let input;
                    let img;
                    let icon;
                    me.parent('div[data-tag="control"]').attr('style', 'height:94%;');
                    this.control = $('<div class="ctl-container ctl-cpr-transition ctl-hover">');
                    input = $('<input src=""  type="hidden"/>');
                    icon = $('<i class="flx-icon icon-pencil ctl-icon ctl-cpr-transition" ></i> ');
                    img = $('<img src="" class="img-responsive ctl-image ctl-cpr-transition"/>');
                    this.control.append(input);
                    this.control.append(icon);
                    this.control.append(img);
                    me.html(this.control);
                    me.off('click').on('click', () => {
                        this.initWacom();
                    });
                    if (this.options && this.options.Locked) {
                        this.readonly = this.options.Locked;
                    }
                    if (this.options && this.options.PlaceHolder) {
                        me.attr('placeholder', this.options.PlaceHolder);
                    }
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
                            let ev = {
                                class: "property",
                                type: "changed",
                                sender: this,
                                masterIdentity: this.property
                            };
                            flexygo.events.trigger(ev, me);
                        });
                    }
                }
                getValue() {
                    let me = $(this);
                    return me.find('input').val();
                }
                setValue(value) {
                    $(this).find('input').val(value);
                    if (value) {
                        $(this).find("img").attr("src", value);
                    }
                    $(this).attr('value', value);
                }
                setValueView(value) {
                    this.value = value;
                    let input = $(this).find('input');
                    input.html(flexygo.string.escapeHTML(value));
                    $(this).attr('value', value);
                }
                initWacom() {
                    let property = this.property;
                    let itm = $(this);
                    let inputControlToSave;
                    let imgControlToSave;
                    let img = new Image;
                    inputControlToSave = itm.find('input');
                    imgControlToSave = itm.find('img');
                    inputControlToSave = itm.find('input');
                    imgControlToSave = itm.find('img');
                    wgssSignatureSDK = new WacomGSS_SignatureSDK(() => { this.onDetectRunning(itm[0]); }, SERVICEPORT);
                    this.timeout = setTimeout(this.timedDetect, 1500);
                }
                timedDetect() {
                    if (!wgssSignatureSDK.running) {
                        flexygo.msg.error(flexygo.localization.translate('flxWacom.serviceNotDetected'));
                    }
                }
                onDetectRunning(itm) {
                    clearTimeout(itm.timeout);
                    itm.captureSignature();
                }
                restartSession(onRestartSession) {
                    wgssSignatureSDK = new WacomGSS_SignatureSDK(onRestartSession, SERVICEPORT);
                }
                showError(method, status) {
                    let message = "";
                    switch (status) {
                        case 100:
                            message = flexygo.localization.translate('flxWacom.error100');
                            break;
                        case 101:
                            message = flexygo.localization.translate('flxWacom.error101');
                            break;
                        case 103:
                            message = flexygo.localization.translate('flxWacom.error100');
                            break;
                        case 200:
                            message = flexygo.localization.translate('flxWacom.error200');
                            break;
                        default:
                            switch (method) {
                                case "onGetSigText":
                                    message = `${flexygo.localization.translate('flxWacom.sigDataError')}, error ${status}`;
                                    break;
                                case "onGetAdditionalData":
                                    message = `${flexygo.localization.translate('flxWacom.additionalDataError')}, error ${status}`;
                                    break;
                                case "onRenderBitmap":
                                    message = `${flexygo.localization.translate('flxWacom.renderBitmapError')}, error ${status}`;
                                    break;
                                case "onPutExtraData":
                                    message = `${flexygo.localization.translate('flxWacom.extraDataError')}, error ${status}`;
                                    break;
                                case "onDynCaptCapture":
                                    message = `${flexygo.localization.translate('flxWacom.sigCtrlCaptureError')}, error ${status}`;
                                    break;
                                case "onSigCtlPutLicence":
                                case "onSigCtlConstructor":
                                    message = `${flexygo.localization.translate('flxWacom.sigCtrlConstructorError')}, error ${status}`;
                                    break;
                                case "onDynCaptConstructor":
                                    message = `${flexygo.localization.translate('flxWacom.DynCaptureError')}, error ${status}`;
                                    break;
                            }
                    }
                    flexygo.msg.error(`${method}(): ${message}`, null, flexygo.localization.translate('flxWacom.titleError'));
                }
                captureSignature() {
                    let sigObj;
                    let itm = $(this)[0];
                    let property = this.property;
                    let sigCtl;
                    let dynCapt;
                    let inputControlToSave = $(this).find('input');
                    let imgControlToSave = $(this).find('img');
                    let jsonTag = null;
                    if (itm.options && !flexygo.utils.isBlank(itm.options.Tag)) {
                        try {
                            jsonTag = JSON.parse(itm.options.Tag);
                        }
                        catch (ex) {
                            flexygo.msg.warning(`error parsing Tag of ${property} to JSON`);
                        }
                    }
                    function onGetSigText(sigObjV, data, status) {
                        if (wgssSignatureSDK.ResponseStatus.OK == status) {
                            if (jsonTag && jsonTag.biometric) {
                                let biometricField = $(itm).closest("flx-edit").find(`[property = ${jsonTag.biometric}]`);
                                biometricField[0] ? biometricField.val(data) : null;
                            }
                            var vData = wgssSignatureSDK.Variant;
                            vData.type = wgssSignatureSDK.VariantType.VARIANT_BASE64;
                            vData.base64 = data;
                            //sigObjV.PutSigData(vData, onPutSigData);
                        }
                        else {
                            itm.showError("onGetSigText", status);
                        }
                    }
                    function onGetAdditionalData(sigObjV, additionalData, status) {
                        if (wgssSignatureSDK.ResponseStatus.OK == status) {
                            sigObjV.GetSigText(onGetSigText);
                        }
                        else {
                            itm.showError("onGetAdditionalData", status);
                        }
                    }
                    function onRenderBitmap(sigObjV, bmpObj, status) {
                        if (wgssSignatureSDK.ResponseStatus.OK == status) {
                            if (bmpObj.isBase64) {
                                inputControlToSave.attr("value", bmpObj.image.src);
                                imgControlToSave.attr("src", bmpObj.image.src);
                            }
                            sigObjV.GetAdditionalData(wgssSignatureSDK.CaptData.CaptMachineOS, onGetAdditionalData);
                            inputControlToSave.trigger('change');
                            imgControlToSave.trigger('change');
                        }
                        else {
                            itm.showError("onRenderBitmap", status);
                        }
                    }
                    function onPutExtraData(sigObjV, status) {
                        if (wgssSignatureSDK.ResponseStatus.OK == status) {
                            var flags = wgssSignatureSDK.RBFlags.RenderOutputPicture |
                                wgssSignatureSDK.RBFlags.RenderColor24BPP;
                            let inkColor = jsonTag &&
                                jsonTag.style &&
                                jsonTag.style.inkColor &&
                                itm.checkRGBStructure(jsonTag.style.inkColor) ? itm.convertRGBToOLEColor(jsonTag.style.inkColor) : 0x00000000;
                            let bgColor = jsonTag &&
                                jsonTag.style &&
                                jsonTag.style.backgroundColor &&
                                itm.checkRGBStructure(jsonTag.style.backgroundColor) ? itm.convertRGBToOLEColor(jsonTag.style.backgroundColor) : 0x00FFFFFF;
                            sigObjV.RenderBitmap("bmp", ($(itm)[0].offsetWidth) - 20, ($(itm)[0].offsetHeight) - 20, 0.7, inkColor, bgColor, flags, 0, 0, onRenderBitmap);
                            sigObj = sigObjV;
                        }
                        else {
                            itm.showError("onPutExtraData", status);
                        }
                    }
                    function onDynCaptCapture(dynCaptV, sigObjV, status) {
                        if (wgssSignatureSDK.ResponseStatus.OK == status) {
                            sigObjV.PutExtraData("extra key", "extra value", onPutExtraData);
                        }
                        /* else if (1 == status) {
                             //User cancel capture
                         }*/
                        else if (status != 1) {
                            itm.showError("onDynCaptCapture", status);
                        }
                    }
                    function onSigCtlPutLicence(sigCtlV, status) {
                        if (wgssSignatureSDK.ResponseStatus.OK == status) {
                            let who = jsonTag && jsonTag.nameText ? jsonTag.nameText : " ";
                            let why = jsonTag && jsonTag.titleText ? jsonTag.titleText : " ";
                            if (jsonTag && jsonTag.titleProperty) {
                                let titleField = $(itm).closest("flx-edit").find(`[property = ${jsonTag.titleProperty}]`);
                                if (titleField[0]) {
                                    why = titleField.val();
                                }
                            }
                            if (jsonTag && jsonTag.nameProperty) {
                                let nameField = $(itm).closest("flx-edit").find(`[property = ${jsonTag.nameProperty}]`);
                                if (nameField[0]) {
                                    who = nameField.val();
                                }
                            }
                            dynCapt.Capture(sigCtlV, itm.removeAccents(who), itm.removeAccents(why), null, null, onDynCaptCapture);
                        }
                        else {
                            itm.showError("onSigCtlPutLicence", status);
                        }
                    }
                    function onSigCtlConstructor(sigCtlV, status) {
                        if (wgssSignatureSDK.ResponseStatus.OK == status) {
                            sigCtlV.PutLicence(LICENCEKEY, onSigCtlPutLicence);
                        }
                        else {
                            itm.showError("onSigCtlConstructor", status);
                        }
                    }
                    function onDynCaptConstructor(dynCaptV, status) {
                        if (wgssSignatureSDK.ResponseStatus.OK == status) {
                            sigCtl = new wgssSignatureSDK.SigCtl(onSigCtlConstructor);
                        }
                        else {
                            itm.showError("onDynCaptConstructor", status);
                            if (wgssSignatureSDK.ResponseStatus.INVALID_SESSION == status) {
                                this.restartSession(this.captureSignature);
                            }
                        }
                    }
                    dynCapt = new wgssSignatureSDK.DynamicCapture(onDynCaptConstructor);
                }
                checkRGBStructure(RGBColor) {
                    let regex = /^\(\d+,\d+,\d+\)$/;
                    return regex.test(RGBColor);
                }
                convertRGBToOLEColor(RGBColor) {
                    let parsedString = RGBColor.replace("(", "").replace(")", "");
                    let red = parseInt(parsedString.split(",")[0]);
                    let green = parseInt(parsedString.split(",")[1]);
                    let blue = parseInt(parsedString.split(",")[2]);
                    const validatedRed = Math.max(0, Math.min(255, red));
                    const validatedGreen = Math.max(0, Math.min(255, green));
                    const validatedBlue = Math.max(0, Math.min(255, blue));
                    const oleColor = (validatedBlue << 16) + (validatedGreen << 8) + validatedRed;
                    return oleColor;
                }
                removeAccents(texto) {
                    const mapaAcentos = {
                        á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u',
                        Á: 'A', É: 'E', Í: 'I', Ó: 'O', Ú: 'U',
                        ñ: 'n', Ñ: 'N',
                        ü: 'u', Ü: 'U'
                    };
                    if (flexygo.utils.isBlank(texto)) {
                        return " ";
                    }
                    return texto.replace(/[áéíóúÁÉÍÓÚñÑüÜ]/g, function (match) {
                        return mapaAcentos[match];
                    });
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
            /**
           * Array of observed attributes. REQUIRED
           * @property observedAttributes {Array}
           */
            FlxWacomElement.observedAttributes = ['type', 'property', 'required', 'disabled', 'requiredmessage', 'class', 'placeholder', 'iconclass', 'helpid', 'hide'];
            wc.FlxWacomElement = FlxWacomElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-wacom', flexygo.ui.wc.FlxWacomElement);
//# sourceMappingURL=flx-wacom.js.map