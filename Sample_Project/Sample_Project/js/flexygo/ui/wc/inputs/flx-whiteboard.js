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
        * Library for the FlxWhiteBoardElement web component.
        *
        * @class FlxWhiteBoardElement
        * @constructor
        * @return {FlxWhiteBoardElement}
        */
            class FlxWhiteBoardElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                   * Set when component is attached to DOM
                   * @property connected {boolean}
                   */
                    this.connected = false;
                    this.type = 'whiteboard';
                    this.property = null;
                    this.options = null;
                    this.moduleName = null;
                    this.mode = 'whiteboard';
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
                /**
               * Array of observed attributes. REQUIRED
               * @property observedAttributes {Array}
               */
                static get observedAttributes() {
                    return ['type', 'property', 'required', 'disabled', 'requiredmessage', 'class', 'placeholder', 'iconclass', 'helpid', 'hide'];
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
                        this.initWhiteBoard();
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
                    if (this.options && this.options.CauseRefresh) {
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
                initWhiteBoard() {
                    let property = this.property;
                    let whiteBoardCanvas;
                    let whiteBoardContext;
                    let inputControlToSave;
                    let imgControlToSave;
                    let pizarraTransparent = false;
                    let lineColor;
                    let lineWeight;
                    let img = new Image;
                    let imgLength;
                    let position;
                    lineColor = "rgb(105, 105, 105)";
                    lineWeight = 0.5;
                    inputControlToSave = $("flx-whiteboard[property='" + property + "']").find('input');
                    imgControlToSave = $("flx-whiteboard[property='" + property + "']").find('img');
                    let pizarraHtml = `<div id="WBContainer" style="z-index:999999;width:100%;height:100%;position:fixed;margin:0px;padding:0px;top:0px;left:0px;background-color:white;text-align:center;">
               <canvas id="WBcanvas"></canvas>               
                   <nav class="WBButtonsContainer">
                  <a class="WBColorButtons Colours clickable"></a>
                   <a class="WBColorButtons Colours clickable"></a>
                    <a class="WBColorButtons Colours clickable"></a>
                    <input id="WBWeight" class="WBColorButtons" type="range" min="0.5" max="15" value="0.5" step="0.1" name="weight" >
                   <a id="WBControlButton" class="WBColorButtons clickable" ></a>
                  </nav>
                   <!-- <i id="WBUpload"  tooltip="Subir Imagen" class="WBActionButtons"><input id="subirImagen" type="file" name="files[]" accept="image/*"></i>-->
                  <i id="WBSave" tooltip="Guardar"   class="WBActionButtons"></i>
                    <i id="WBDelete" tooltip="Borrar" class="WBActionButtons"></i>               
                <i id="WBClose" tooltip="Cerrar" class="WBActionButtons"></i>
               </div>`;
                    $('#WBContainer').remove();
                    $('body').append(pizarraHtml);
                    whiteBoardCanvas = $("#WBcanvas")[0];
                    whiteBoardCanvas.width = $('#WBContainer').width() - 2;
                    whiteBoardCanvas.height = $('#WBContainer').height() - 48;
                    whiteBoardContext = whiteBoardCanvas.getContext("2d");
                    if (whiteBoardCanvas.width > whiteBoardCanvas.height) {
                        position = true;
                    }
                    else {
                        position = false;
                    }
                    whiteBoardContext.fillStyle = 'white';
                    whiteBoardContext.fillRect(0, 0, whiteBoardCanvas.width, whiteBoardCanvas.height);
                    imgLength = imgControlToSave.attr("src").length;
                    if (imgLength > 0) {
                        img.src = imgControlToSave.attr("src");
                        if (img.width > img.height) {
                            whiteBoardContext.drawImage(img, 0, whiteBoardCanvas.height / 2 - whiteBoardCanvas.width * img.height / img.width / 2, whiteBoardCanvas.width, whiteBoardCanvas.width * img.height / img.width);
                        }
                        else {
                            whiteBoardContext.drawImage(img, whiteBoardCanvas.width / 2 - whiteBoardCanvas.height * img.width / img.height / 2, 0, whiteBoardCanvas.height * img.width / img.height, whiteBoardCanvas.height);
                        }
                    }
                    inputControlToSave = $("flx-whiteboard[property='" + property + "']").find('input');
                    imgControlToSave = $("flx-whiteboard[property='" + property + "']").find('img');
                    whiteBoardContext.strokeStyle = lineColor;
                    whiteBoardContext.lineWidth = lineWeight;
                    whiteBoardContext.shadowBlur = 0.4;
                    whiteBoardContext.shadowColor = lineColor;
                    whiteBoardContext.lineJoin = whiteBoardContext.lineCap = "round";
                    let entra;
                    let lastX;
                    let lastY;
                    $(whiteBoardCanvas).on('mousedown', (e) => {
                        entra = 0;
                        whiteBoardContext.beginPath();
                        whiteBoardContext.moveTo(e.clientX - $(whiteBoardCanvas).offset().left, e.clientY - $(whiteBoardCanvas).offset().top);
                        $(whiteBoardCanvas).on('mousemove', (e) => {
                            e.preventDefault();
                            if (e.originalEvent.targetTouches && e.originalEvent.targetTouches[0].pageX) {
                                lastX = e.originalEvent.targetTouches[0].pageX - $(whiteBoardCanvas).offset().left;
                                lastY = e.originalEvent.targetTouches[0].pageY - $(whiteBoardCanvas).offset().top;
                            }
                            else {
                                lastX = e.clientX - $(whiteBoardCanvas).offset().left;
                                lastY = e.clientY - $(whiteBoardCanvas).offset().top;
                            }
                            whiteBoardContext.lineTo(lastX, lastY);
                            whiteBoardContext.stroke();
                            if (entra < 200)
                                entra++;
                        });
                        $(whiteBoardCanvas).on('touchmove', (e) => {
                            e.preventDefault();
                            if (e.originalEvent.targetTouches && e.originalEvent.targetTouches[0].pageX) {
                                lastX = e.originalEvent.targetTouches[0].pageX - $(whiteBoardCanvas).offset().left;
                                lastY = e.originalEvent.targetTouches[0].pageY - $(whiteBoardCanvas).offset().top;
                            }
                            else {
                                lastX = e.clientX - $(whiteBoardCanvas).offset().left;
                                lastY = e.clientY - $(whiteBoardCanvas).offset().top;
                            }
                            whiteBoardContext.lineTo(lastX, lastY);
                            whiteBoardContext.stroke();
                            if (entra < 200)
                                entra++;
                        });
                    });
                    $(whiteBoardCanvas).on('mouseup', function (ev) {
                        $(whiteBoardCanvas).off('mousemove');
                        $(whiteBoardCanvas).off('touchmove');
                        if (entra < 2) {
                            //whiteBoardContext.fillRect(lastX,lastY,4,4); // fill in the pixel at (10,10)
                            whiteBoardContext.beginPath();
                            whiteBoardContext.arc(lastX, lastY, 3, 0, 2 * Math.PI, true);
                            whiteBoardContext.fill();
                        }
                        lastX = 0;
                        lastY = 0;
                    });
                    $(whiteBoardCanvas).on('touchstart', (e) => {
                        entra = 0;
                        whiteBoardContext.beginPath();
                        whiteBoardContext.moveTo(e.clientX - $(whiteBoardCanvas).offset().left, e.clientY - $(whiteBoardCanvas).offset().top);
                        $(whiteBoardCanvas).on('mousemove', function (ev) {
                            ev.preventDefault();
                            if (ev.originalEvent.targetTouches && ev.originalEvent.targetTouches[0].pageX) {
                                lastX = ev.originalEvent.targetTouches[0].pageX - $(whiteBoardCanvas).offset().left;
                                lastY = ev.originalEvent.targetTouches[0].pageY - $(whiteBoardCanvas).offset().top;
                            }
                            else {
                                lastX = ev.clientX - $(whiteBoardCanvas).offset().left;
                                lastY = ev.clientY - $(whiteBoardCanvas).offset().top;
                            }
                            whiteBoardContext.lineTo(lastX, lastY);
                            whiteBoardContext.stroke();
                            if (entra < 200)
                                entra++;
                        });
                        $(whiteBoardCanvas).on('touchmove', function (ev) {
                            ev.preventDefault();
                            if (ev.originalEvent.targetTouches && ev.originalEvent.targetTouches[0].pageX) {
                                lastX = ev.originalEvent.targetTouches[0].pageX - $(whiteBoardCanvas).offset().left;
                                lastY = ev.originalEvent.targetTouches[0].pageY - $(whiteBoardCanvas).offset().top;
                            }
                            else {
                                lastX = ev.clientX - $(whiteBoardCanvas).offset().left;
                                lastY = ev.clientY - $(whiteBoardCanvas).offset().top;
                            }
                            whiteBoardContext.lineTo(lastX, lastY);
                            whiteBoardContext.stroke();
                            if (entra < 200)
                                entra++;
                        });
                    });
                    $(whiteBoardCanvas).on('touchend', function (ev) {
                        $(whiteBoardCanvas).off('mousemove');
                        $(whiteBoardCanvas).off('touchmove');
                        if (entra < 2) {
                            //whiteBoardContext.fillRect(lastX,lastY,4,4); // fill in the pixel at (10,10)
                            whiteBoardContext.beginPath();
                            whiteBoardContext.arc(lastX, lastY, 3, 0, 2 * Math.PI, true);
                            whiteBoardContext.fill();
                        }
                        lastX = 0;
                        lastY = 0;
                    });
                    $(whiteBoardCanvas).on('mouseout', function (ev) {
                        $(whiteBoardCanvas).off('mousemove');
                        $(whiteBoardCanvas).off('touchmove');
                        if (entra < 2) {
                            //whiteBoardContext.fillRect(lastX,lastY,4,4); // fill in the pixel at (10,10)
                            whiteBoardContext.beginPath();
                            whiteBoardContext.arc(lastX, lastY, 3, 0, 2 * Math.PI, true);
                            whiteBoardContext.fill();
                        }
                        lastX = 0;
                        lastY = 0;
                    });
                    $("#WBSave").on('click', (e) => {
                        let data = whiteBoardCanvas.toDataURL();
                        let emptyWhiteBoard = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB34AAAGeCAYAAAB7K6A9AAAgAElEQVR4Xu3ZwQkAMAwDsXb/oV3oFgfKBEbOz3fbjiNAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBrMA1/Ga7E5wAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJfwPDrEQgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIBAXMPzGCxSfAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEChl8/QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgbiA4TdeoPgECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAw/PoBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIxAUMv/ECxSdAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgIDh1w8QIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAgLmD4jRcoPgECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAy/foAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJxAcNvvEDxCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgYPj1AwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEIgLGH7jBYpPgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABw68fIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQFzA8BsvUHwCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgYfv0AAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE4gKG33iB4hMgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQMDw6wcIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECAQFzD8xgsUnwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAoZfP0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIG4gOE3XqD4BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQMPz6AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECMQFDL/xAsUnQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQICA4dcPECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAIC5g+I0XKD4BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQMv36AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECcQHDb7xA8QkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIGD49QMECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBCICxh+4wWKT4AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAcOvHyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBcwPAbL1B8AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIGH79AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBOICht94geITIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEDA8OsHCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgEBcw/MYLFJ8AAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQKGXz9AgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBuIDhN16g+AQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEDD8+gECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAjEBQy/8QLFJ0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAgOHXDxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCAuYPiNFyg+AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEDL9+gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAnEBw2+8QPEJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBg+PUDBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQiAsYfuMFik+AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAHDrx8gQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBAXMDwGy9QfAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBh+/QABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTiAobfeIHiEyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAwPDrBwgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIBAXMPzGCxSfAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEChl8/QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgbiA4TdeoPgECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAw/PoBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIxAUMv/ECxSdAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgIDh1w8QIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAgLmD4jRcoPgECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAy/foAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJxAcNvvEDxCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgYPj1AwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEIgLGH7jBYpPgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABw68fIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQFzA8BsvUHwCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgYfv0AAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE4gKG33iB4hMgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQMDw6wcIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECAQFzD8xgsUnwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAoZfP0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIG4gOE3XqD4BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQMPz6AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECMQFDL/xAsUnQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQICA4dcPECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAIC5g+I0XKD4BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQMv36AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECcQHDb7xA8QkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIGD49QMECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBCICxh+4wWKT4AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAcOvHyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBcwPAbL1B8AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIGH79AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBOICht94geITIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEDA8OsHCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgEBcw/MYLFJ8AAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQKGXz9AgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBuIDhN16g+AQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEDD8+gECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAjEBQy/8QLFJ0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAgOHXDxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCAuYPiNFyg+AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEDL9+gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAnEBw2+8QPEJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBg+PUDBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQiAsYfuMFik+AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAHDrx8gQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBAXMDwGy9QfAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBh+/QABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTiAobfeIHiEyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAwPDrBwgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIBAXMPzGCxSfAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEChl8/QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgbiA4TdeoPgECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAw/PoBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIxAUMv/ECxSdAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgIDh1w8QIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAgLmD4jRcoPgECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAy/foAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJxAcNvvEDxCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgYPj1AwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEIgLGH7jBYpPgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABw68fIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQFzA8BsvUHwCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgYfv0AAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE4gKG33iB4hMgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQMDw6wcIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECAQFzD8xgsUnwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAoZfP0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIG4gOE3XqD4BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQMPz6AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECMQFDL/xAsUnQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQICA4dcPECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAIC5g+I0XKD4BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQMv36AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECcQHDb7xA8QkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIGD49QMECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBCICxh+4wWKT4AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAcOvHyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBcwPAbL1B8AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIGH79AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBOICht94geITIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEDA8OsHCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgEBcw/MYLFJ8AAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQKGXz9AgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBuIDhN16g+AQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEDD8+gECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAjEBQy/8QLFJ0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAgOHXDxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCAuYPiNFyg+AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEDL9+gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAnEBw2+8QPEJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBg+PUDBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQiAsYfuMFik+AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAHDrx8gQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBAXMDwGy9QfAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBh+/QABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTiAobfeIHiEyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAwPDrBwgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIBAXMPzGCxSfAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEChl8/QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgbiA4TdeoPgECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAw/PoBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIxAUMv/ECxSdAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgIDh1w8QIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAgLmD4jRcoPgECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAy/foAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJxAcNvvEDxCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgYPj1AwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEIgLGH7jBYpPgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABw68fIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQFzA8BsvUHwCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgYfv0AAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE4gKG33iB4hMgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQMDw6wcIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECAQFzD8xgsUnwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAoZfP0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIG4gOE3XqD4BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQMPz6AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECMQFDL/xAsUnQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQICA4dcPECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAIC5g+I0XKD4BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQMv36AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECcQHDb7xA8QkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIGD49QMECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBCICxh+4wWKT4AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAcOvHyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBcwPAbL1B8AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIGH79AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBOICht94geITIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEDA8OsHCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgEBcw/MYLFJ8AAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQKGXz9AgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBuIDhN16g+AQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEDD8+gECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAjEBQy/8QLFJ0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAgOHXDxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCAuYPiNFyg+AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEDL9+gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAnEBw2+8QPEJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBg+PUDBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQiAsYfuMFik+AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAHDrx8gQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBAXMDwGy9QfAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBh+/QABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTiAobfeIHiEyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAwPDrBwgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIBAXMPzGCxSfAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEChl8/QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgbiA4TdeoPgECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAw/PoBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIxAUMv/ECxSdAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgIDh1w8QIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAgLmD4jRcoPgECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAy/foAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJxAcNvvEDxCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgYPj1AwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEIgLGH7jBYpPgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABw68fIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQFzA8BsvUHwCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgYfv0AAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE4gKG33iB4hMgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQMDw6wcIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECAQFzD8xgsUnwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAoZfP0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIG4gOE3XqD4BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQMPz6AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECMQFDL/xAsUnQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQICA4dcPECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAIC5g+I0XKD4BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQMv36AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECcQHDb7xA8QkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIGD49QMECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBCICxh+4wWKT4AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAcOvHyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBcwPAbL1B8AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIGH79AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBOICht94geITIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEDA8OsHCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgEBcw/MYLFJ8AAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQKGXz9AgAABAgQIECBAgAABAgQIECBAgAABAgQIEICWywkAABnWSURBVCBAgACBuIDhN16g+AQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEDD8+gECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAjEBQy/8QLFJ0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAgOHXDxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCAuYPiNFyg+AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEDL9+gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAnEBw2+8QPEJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBg+PUDBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQiAsYfuMFik+AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAHDrx8gQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBAXMDwGy9QfAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBh+/QABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTiAobfeIHiEyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAwPDrBwgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIBAXMPzGCxSfAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEChl8/QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgbiA4TdeoPgECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAw/PoBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIxAUMv/ECxSdAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgIDh1w8QIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAgLmD4jRcoPgECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAy/foAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJxAcNvvEDxCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgYPj1AwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEIgLGH7jBYpPgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABw68fIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQFzA8BsvUHwCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgYfv0AAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE4gKG33iB4hMgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQMDw6wcIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECAQFzD8xgsUnwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAoZfP0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIG4gOE3XqD4BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQMPz6AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECMQFDL/xAsUnQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQICA4dcPECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAIC5g+I0XKD4BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQMv36AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECcQHDb7xA8QkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIGD49QMECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBCICxh+4wWKT4AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAcOvHyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBcwPAbL1B8AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIGH79AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBOICht94geITIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEDA8OsHCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgEBcw/MYLFJ8AAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQKGXz9AgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBuIDhN16g+AQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEDD8+gECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAjEBQy/8QLFJ0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAgOHXDxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCAuYPiNFyg+AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEDL9+gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAnEBw2+8QPEJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBg+PUDBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQiAsYfuMFik+AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAHDrx8gQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBAXMDwGy9QfAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBh+/QABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTiAobfeIHiEyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAwPDrBwgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIBAXMPzGCxSfAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEChl8/QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgbiA4TdeoPgECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAw/PoBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIxAUMv/ECxSdAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgIDh1w8QIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAgLmD4jRcoPgECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAy/foAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJxAcNvvEDxCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgYPj1AwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEIgLGH7jBYpPgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABw68fIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQFzA8BsvUHwCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgYfv0AAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE4gKG33iB4hMgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQMDw6wcIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECAQFzD8xgsUnwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAoZfP0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIG4gOE3XqD4BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQMPz6AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECMQFDL/xAsUnQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQICA4dcPECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAIC5g+I0XKD4BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQMv36AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECcQHDb7xA8QkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIGD49QMECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBCICxh+4wWKT4AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAcOvHyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBcwPAbL1B8AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIGH79AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBOICht94geITIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEDA8OsHCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgEBcw/MYLFJ8AAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQKGXz9AgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBuIDhN16g+AQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEDD8+gECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAjEBQy/8QLFJ0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAgOHXDxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCAuYPiNFyg+AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEDL9+gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAnEBw2+8QPEJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBg+PUDBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQiAsYfuMFik+AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAHDrx8gQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBAXMDwGy9QfAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBh+/QABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTiAobfeIHiEyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAwPDrBwgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIBAXMPzGCxSfAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEChl8/QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgbiA4TdeoPgECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAw/PoBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIxAUMv/ECxSdAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgIDh1w8QIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAgLmD4jRcoPgECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAy/foAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJxAcNvvEDxCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgYPj1AwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEIgLGH7jBYpPgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABw68fIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQFzA8BsvUHwCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgYfv0AAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE4gKG33iB4hMgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQMDw6wcIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECAQFzD8xgsUnwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAoZfP0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIG4gOE3XqD4BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQMPz6AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECMQFDL/xAsUnQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQICA4dcPECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAIC5g+I0XKD4BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQMv36AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECcQHDb7xA8QkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIGD49QMECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBCICxh+4wWKT4AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAcOvHyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBcwPAbL1B8AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIGH79AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBOICht94geITIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEDA8OsHCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgEBcw/MYLFJ8AAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQKGXz9AgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBuIDhN16g+AQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEDD8+gECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAjEBQy/8QLFJ0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAgOHXDxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCAuYPiNFyg+AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEDL9+gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAnEBw2+8QPEJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBg+PUDBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQiAsYfuMFik+AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAHDrx8gQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBAXMDwGy9QfAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBh+/QABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTiAobfeIHiEyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAwPDrBwgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIBAXMPzGCxSfAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEChl8/QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgbiA4TdeoPgECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAw/PoBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIxAUMv/ECxSdAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgIDh1w8QIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAgLmD4jRcoPgECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAy/foAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJxAcNvvEDxCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgYPj1AwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEIgLGH7jBYpPgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABw68fIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQFzA8BsvUHwCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgYfv0AAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE4gKG33iB4hMgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQMDw6wcIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECAQFzD8xgsUnwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAoZfP0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIG4gOE3XqD4BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQMPz6AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECMQFDL/xAsUnQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQICA4dcPECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAIC5g+I0XKD4BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQMv36AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECcQHDb7xA8QkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIGD49QMECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBCICxh+4wWKT4AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgQf+WnOBMp2FLAAAAABJRU5ErkJggg==";
                        if (data == emptyWhiteBoard) {
                            data = "";
                        }
                        if (imgControlToSave) {
                            imgControlToSave.attr('src', data);
                        }
                        if (inputControlToSave) {
                            inputControlToSave.val(data);
                        }
                        inputControlToSave.trigger('change');
                        imgControlToSave.trigger('change');
                        $('#WBContainer').remove();
                    });
                    $("#WBClose").on('click', (e) => {
                        $('#WBContainer').remove();
                    });
                    $("#WBDelete").on('click', (e) => {
                        whiteBoardContext.clearRect(0, 0, whiteBoardCanvas.width, whiteBoardCanvas.height);
                        whiteBoardContext.fillStyle = 'white';
                        whiteBoardContext.fillRect(0, 0, whiteBoardCanvas.width, whiteBoardCanvas.height);
                        if (whiteBoardCanvas.width > whiteBoardCanvas.height) {
                            position = true;
                        }
                        else {
                            position = false;
                        }
                    });
                    $(window).off('resize').on('resize', () => {
                        if (whiteBoardCanvas) {
                            let w = $('#WBContainer').width() - 2;
                            let h = $('#WBContainer').height() - 48;
                            let temp_cnvs = document.createElement('canvas');
                            let temp_cntx = temp_cnvs.getContext('2d');
                            temp_cnvs.width = w;
                            temp_cnvs.height = h;
                            temp_cntx.fillStyle = 'white';
                            temp_cntx.fillRect(0, 0, w, h);
                            if (position) {
                                temp_cntx.drawImage(whiteBoardCanvas, 0, h / 2 - w * whiteBoardCanvas.height / whiteBoardCanvas.width / 2, w, w * whiteBoardCanvas.height / whiteBoardCanvas.width);
                            }
                            else {
                                temp_cntx.drawImage(whiteBoardCanvas, w / 2 - h * whiteBoardCanvas.width / whiteBoardCanvas.height / 2, 0, h * whiteBoardCanvas.width / whiteBoardCanvas.height, h);
                            }
                            whiteBoardCanvas.width = w;
                            whiteBoardCanvas.height = h;
                            whiteBoardContext.drawImage(temp_cnvs, 0, 0);
                            whiteBoardContext.strokeStyle = lineColor;
                            whiteBoardContext.lineWidth = lineWeight;
                            whiteBoardContext.shadowBlur = 0.4;
                            whiteBoardContext.shadowColor = lineColor;
                            whiteBoardContext.lineJoin = whiteBoardContext.lineCap = 'round';
                        }
                    });
                    $(".Colours").click(function (a) {
                        lineColor = $(this).css("background-Color");
                        let x = $("#WBControlButton").css("background-color");
                        $(this).css("background-color", x);
                        $("#WBControlButton").css("background-color", lineColor);
                        whiteBoardContext.strokeStyle = lineColor;
                        whiteBoardContext.shadowColor = lineColor;
                    });
                    $('#WBControlButton').on(function (a) {
                        lineColor = $(a).css("background-Color");
                        let x = $("#WBControlButton").css("background-color");
                        $(a).css("background-color", x);
                        $("#WBControlButton").css("background-color", lineColor);
                        whiteBoardContext.strokeStyle = lineColor;
                        whiteBoardContext.shadowColor = lineColor;
                    });
                    $('#WBWeight').on('change', () => {
                        lineWeight = $("#WBWeight").val();
                        whiteBoardContext.lineWidth = lineWeight;
                    });
                    $('#subirImagen').on('change', (e) => {
                        let element = $(e.currentTarget);
                        if (element.attr('type') === 'file') {
                            if (element[0].files && element[0].files[0]) {
                                let reader = new FileReader();
                                //  reader.onloadend = function () {
                                reader.onload = (e) => {
                                    whiteBoardContext.clearRect(0, 0, whiteBoardCanvas.width, whiteBoardCanvas.height);
                                    whiteBoardContext.fillStyle = 'white';
                                    whiteBoardContext.fillRect(0, 0, whiteBoardCanvas.width, whiteBoardCanvas.height);
                                    if (whiteBoardCanvas.width > whiteBoardCanvas.height) {
                                        position = true;
                                    }
                                    else {
                                        position = false;
                                    }
                                    //setTimeout(() => { 
                                    img.src = reader.result;
                                    //img.src = e.target.result;
                                    if (img.width > img.height) {
                                        whiteBoardContext.drawImage(img, 0, whiteBoardCanvas.height / 2 - whiteBoardCanvas.width * img.height / img.width / 2, whiteBoardCanvas.width, whiteBoardCanvas.width * img.height / img.width);
                                    }
                                    else {
                                        whiteBoardContext.drawImage(img, whiteBoardCanvas.width / 2 - whiteBoardCanvas.height * img.width / img.height / 2, 0, whiteBoardCanvas.height * img.width / img.height, whiteBoardCanvas.height);
                                    }
                                    //  }, 500);
                                };
                                if (element[0].files[0]) {
                                    reader.readAsDataURL(element[0].files[0]);
                                }
                                element.value = "";
                            }
                        }
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
            wc.FlxWhiteBoardElement = FlxWhiteBoardElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-whiteboard', flexygo.ui.wc.FlxWhiteBoardElement);
//# sourceMappingURL=flx-whiteboard.js.map