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
        * Library for the FlxHtmlEditElement web component.
        *
        * @class FlxHtmlEditElement
        * @constructor
        * @return {FlxHtmlEditElement}
        */
            class FlxHtmlEditElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                   * Set when component is attached to DOM
                   * @property connected {boolean}
                   */
                    this.connected = false;
                    this.type = 'html';
                    this.property = null;
                    this.options = null;
                    this.moduleName = null;
                    this.mode = 'htmlmixed';
                    this.readonly = false;
                    this.myCM = null; //TODO_TS
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
                        this.options.Hide = Hide == 'true';
                    }
                    let MaxNumOfChars = element.attr('MaxNumOfChars');
                    if (MaxNumOfChars && MaxNumOfChars !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.MaxNumOfChars = parseInt(MaxNumOfChars);
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
                    return ['type', 'property', 'required', 'disabled', 'requiredmessage', 'class', 'iconclass', 'helpid', 'hide'];
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
                    let val = this.getValue();
                    if (me.attr('mode') && me.attr('mode').toLowerCase() === 'view') {
                        this.initViewMode();
                    }
                    else {
                        this.initEditMode();
                    }
                    if (val && val !== "") {
                        this.setValue(val);
                    }
                }
                initViewMode() {
                    let me = $(this);
                    this.initEditMode();
                    me.find('.summernote').summernote('disable');
                    me.find('div.panel-heading.note-toolbar').css('display', 'none');
                    me.find('div.note-editable.panel-body').css('background-color', 'transparent');
                    me.find('div.note-dropzone').remove();
                }
                initEditMode() {
                    let me = $(this);
                    let txtArea = $('<textarea id="txtHTMLEdit" class="summernote" style="min-height:100%;width:100%;"></textarea>');
                    me.html(txtArea);
                    if (me.attr("onchange") && me.attr("onchange") !== '') {
                        txtArea.off('change');
                        txtArea.on('change', () => { flexygo.utils.execDynamicCode.call(this, me.attr("onchange")); });
                    }
                    if (this.options && this.options.Locked) {
                        this.readonly = this.options.Locked;
                    }
                    setTimeout(() => {
                        me.find(".summernote").summernote("code", me.find('textarea')[0].value);
                        if (this.options && this.options.CssClass && this.options.CssClass !== '') {
                            me.children('div').addClass(this.options.CssClass);
                        }
                    }, 500);
                    this.setOptions();
                }
                setOptions() {
                    let me = $(this);
                    let maxnumofchars = 0;
                    if (this.options && this.options.MaxNumOfChars && this.options.MaxNumOfChars > 0) {
                        maxnumofchars = this.options.MaxNumOfChars;
                    }
                    me.find('.summernote').summernote({
                        minHeight: 100,
                        maxHeight: null,
                        dialogsInBody: true,
                        callbacks: {
                            onKeydown: function (e) {
                                var t = e.currentTarget.innerText;
                                if (maxnumofchars != 0 && t.length >= maxnumofchars) {
                                    if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey)) {
                                        e.preventDefault();
                                    }
                                }
                            },
                            onKeyup: function (e) {
                                var t = e.currentTarget.innerText;
                                if (maxnumofchars != 0 && t.length >= maxnumofchars) {
                                    if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey)) {
                                        e.preventDefault();
                                    }
                                }
                            },
                            onPaste: function (e) {
                                var t = e.currentTarget.innerText;
                                var bufferText = ((e.originalEvent || e).clipboardData).getData('Text');
                                e.preventDefault();
                                var maxPaste = bufferText.length;
                                if (maxnumofchars != 0 && t.length + bufferText.length > maxnumofchars) {
                                    maxPaste = maxnumofchars - t.length;
                                }
                                if (maxPaste > 0) {
                                    document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
                                }
                            }
                        }
                    });
                    let input = me.find('textarea');
                    if (this.options && this.options.Name && this.options.Name !== '') {
                        input.attr('name', this.options.Name);
                    }
                    else {
                        input.attr('name', flexygo.utils.uniqueName());
                    }
                    if (this.options && this.options.IsRequired) {
                        input.prop('required', this.options.IsRequired);
                    }
                    if (this.options && this.options.IsRequiredMessage) {
                        input.attr('data-msg-required', this.options.IsRequiredMessage);
                    }
                    if (this.options && this.options.Hide) {
                        me.addClass("hideControl");
                    }
                    const module = me.closest('flx-module')[0];
                    if ((this.options && this.options.CauseRefresh) || (module && module.moduleConfig && module.moduleConfig.PropsEventDependant && module.moduleConfig.PropsEventDependant.includes(this.property))) {
                        me.find('.summernote').on('summernote.change', () => {
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
                    let pluginInput = me.find('.summernote');
                    if (pluginInput.summernote('codeview.isActivated')) {
                        pluginInput.summernote('codeview.deactivate');
                    }
                    if (pluginInput.summernote('isEmpty')) {
                        return '';
                    }
                    return me.find('textarea').val();
                }
                setValue(value) {
                    $(this).find('textarea').val(value);
                    $(this).find(".summernote").summernote("code", $(this).find('textarea')[0].value);
                    if (this.myCM) {
                        this.myCM.getDoc().setValue(value);
                    }
                }
                setValueView(value) {
                    this.value = value;
                    let input = $(this).find('label');
                    input.html(flexygo.string.escapeHTML(value));
                }
                fullscreen(value) {
                    if (typeof value === 'undefined') {
                        value = true;
                    }
                    if (value) {
                        $('flx-htmledit[isFS=true]').each((i, e) => {
                            e.myCM.setOption("fullScreen", false);
                            $(e).attr('isFS', 'false');
                        });
                    }
                    this.myCM.setOption("fullScreen", value);
                    $(this).attr('isFS', value);
                }
                /**
                * Trigger Dependencies.
                * @method triggerDependencies
                */
                triggerDependencies() {
                    let me;
                    let input;
                    me = $(this);
                    input = me.find('textarea');
                    input.trigger('change');
                }
            }
            wc.FlxHtmlEditElement = FlxHtmlEditElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-htmledit', flexygo.ui.wc.FlxHtmlEditElement);
//# sourceMappingURL=flx-htmledit.js.map