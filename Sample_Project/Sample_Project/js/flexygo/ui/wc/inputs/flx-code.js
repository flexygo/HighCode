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
            * Library for the FlxCodeElement web component.
            *
            * @class FlxCodeElement
            * @constructor
            * @return {FlxCodeElement}
            */
            class FlxCodeElement extends HTMLElement {
                constructor() {
                    super();
                    this.type = 'html';
                    this.options = null;
                    this.moduleName = null;
                    this.mode = 'htmlmixed';
                    this.readonly = false;
                    this.myCM = null; //TODO_TS: CodeMirror.EditorFromTextArea;
                    this.value = null;
                    /**
                   * Set when component is attached to DOM
                   * @property connected {boolean}
                   */
                    this.connected = false;
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
                    if (typeof element.attr('Required') != 'undefined') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IsRequired = true;
                    }
                    if (typeof element.attr('Disabled') != 'undefined') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Locked = true;
                    }
                    let RequiredMessage = element.attr('RequiredMessage');
                    if (RequiredMessage && RequiredMessage != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IsRequiredMessage = RequiredMessage;
                    }
                    let Class = element.attr('Theme');
                    if (Class && Class != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.CssClass = Class;
                    }
                    let PlaceHolder = element.attr('PlaceHolder');
                    if (PlaceHolder && PlaceHolder != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.PlaceHolder = PlaceHolder;
                    }
                    let IconClass = element.attr('IconClass');
                    if (IconClass && IconClass != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IconClass = IconClass;
                    }
                    let HelpId = element.attr('HelpId');
                    if (HelpId && HelpId != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.HelpId = HelpId;
                    }
                    let Hide = element.attr('Hide');
                    if (Hide && Hide != '') {
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
                    let val = element.html();
                    if (!this.connected) {
                        this.init();
                        this.connected = true;
                        let Value = element.attr('Value');
                        if (Value && Value != '') {
                            this.setValue(Value);
                        }
                        else if (val && val != '') {
                            this.setValue(val);
                        }
                    }
                }
                /**
                * Array of observed attributes.
                * @property observedAttributes {Array}
                */
                static get observedAttributes() {
                    return ['type', 'property', 'required', 'disabled', 'requiredmessage', 'theme', 'placeholder', 'iconclass', 'helpid', 'hide'];
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
                    if (attrName.toLowerCase() == 'type' && newVal && newVal != '') {
                        this.type = newVal;
                    }
                    if (attrName.toLowerCase() == 'property' && newVal && newVal != '') {
                        let propName = newVal;
                        let parentCtl = element.closest('flx-edit, flx-list,flx-propertymanager');
                        if (parentCtl && parentCtl.length > 0) {
                            let wcParent = parentCtl[0];
                            this.options = jQuery.extend(true, {}, wcParent.properties[propName]);
                        }
                        this.property = newVal;
                    }
                    if (attrName.toLowerCase() == 'required') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        if (typeof element.attr('required') != 'undefined') {
                            this.options.IsRequired = true;
                        }
                        else {
                            this.options.IsRequired = false;
                        }
                        element.find('textarea').prop('required', this.options.IsRequired);
                    }
                    if (attrName.toLowerCase() == 'disabled') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        if (typeof element.attr('disabled') != 'undefined') {
                            this.options.Locked = true;
                        }
                        else {
                            this.options.Locked = false;
                        }
                        element.find('textarea').prop('disabled', this.options.Locked);
                    }
                    if (attrName.toLowerCase() == 'requiredmessage' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IsRequiredMessage = newVal;
                    }
                    if (attrName.toLowerCase() == 'theme' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.CssClass = newVal;
                    }
                    if (attrName.toLowerCase() == 'placeholder' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.PlaceHolder = newVal;
                    }
                    if (attrName.toLowerCase() == 'iconclass' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IconClass = newVal;
                    }
                    if (attrName.toLowerCase() == 'helpid' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.HelpId = newVal;
                    }
                    if (attrName.toLowerCase() == 'hide' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Hide = newVal;
                    }
                    if (this.connected) {
                        this.refresh();
                    }
                }
                /**
                * Refresh de webcomponent.
                * @method refresh
                */
                refresh() {
                    let val = this.getValue();
                    this.init();
                    if (val && val != "") {
                        this.setValue(val);
                    }
                }
                init() {
                    if ($('script[ID="jshint"]').length == 0) {
                        $('head').append('<script ID="jshint" src="./js/plugins/codemirror/jshint.js"></script>');
                    }
                    let me = $(this);
                    if (me.attr('mode') && me.attr('mode').toLowerCase() == 'view') {
                        this.readonly = true; //'nocursor';
                    }
                    else {
                        this.readonly = false;
                    }
                    let txtArea = '<textarea id="txtHTML" style="min-height:100%;width:100%;"></textarea>';
                    let rnd = $(this.getWizardButton() + txtArea);
                    me.html(rnd);
                    this.setWizardSettings(this);
                    if (me.attr("onchange") && me.attr("onchange") != '') {
                        rnd.off('change');
                        rnd.on('change', () => { flexygo.utils.execDynamicCode.call(this, me.attr("onchange")); });
                    }
                    if (this.options && this.options.Locked) {
                        this.readonly = this.options.Locked;
                    }
                    if (this.options && this.options.PlaceHolder) {
                        me.attr('placeholder', this.options.PlaceHolder);
                    }
                    let theme = 'freeware';
                    if (this.options && this.options.CssClass && this.options.CssClass != '') {
                        theme = this.options.CssClass;
                    }
                    setTimeout(() => {
                        if (this.myCM) {
                            let textArea = this.myCM.getTextArea();
                            if (textArea.parentNode != null) {
                                this.myCM.toTextArea();
                            }
                        }
                        let options = {
                            mode: this.getMode(),
                            styleActiveLine: true,
                            matchBrackets: true,
                            readOnly: this.readonly,
                            lineNumbers: true,
                            placeholder: me.attr('placeholder'),
                            theme: theme,
                            scrollbarStyle: 'overlay',
                            highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: false },
                            extraKeys: {
                                "F11": (cm) => {
                                    let isFS = !cm.getOption("fullScreen");
                                    cm.setOption("fullScreen", isFS);
                                    me.attr('isFS', String(isFS));
                                },
                                "Esc": (cm) => {
                                    if (cm.getOption("fullScreen"))
                                        cm.setOption("fullScreen", false);
                                    me.attr('isFS', 'false');
                                }
                            }
                        };
                        if (options.mode == 'javascript') {
                            options['lint'] = true;
                            options['gutters'] = ["CodeMirror-lint-markers"];
                        }
                        this.myCM = CodeMirror.fromTextArea(me.find('textarea')[0], options);
                        let maxnumofchars = 0;
                        if (this.options && this.options.MaxNumOfChars && this.options.MaxNumOfChars > 0) {
                            maxnumofchars = this.options.MaxNumOfChars;
                        }
                        this.myCM.enforceMaxLength = function (cm, change) {
                            var maxLength = maxnumofchars;
                            if (maxLength && change.update) {
                                var str = change.text.join("\n");
                                var delta = str.length - (cm.indexFromPos(change.to) - cm.indexFromPos(change.from));
                                if (delta <= 0) {
                                    return true;
                                }
                                delta = cm.getValue().length + delta - maxLength;
                                if (delta > 0) {
                                    str = str.substr(0, str.length - delta);
                                    change.update(change.from, change.to, str.split("\n"));
                                }
                            }
                            return true;
                        };
                        this.myCM.setOption("maxLength", maxnumofchars);
                        this.myCM.on("beforeChange", this.myCM.enforceMaxLength);
                        this.myCM.on("blur", (cm, change) => { me.find('textarea').val(cm.getValue()); this.triggerDependencies(); });
                    }, 500);
                    this.setOptions();
                }
                setOptions() {
                    let me = $(this);
                    let input = me.find('textarea');
                    if (this.options && this.options.Name && this.options.Name != '') {
                        input.attr('name', this.options.Name);
                    }
                    else {
                        input.attr('name', flexygo.utils.uniqueName());
                    }
                    if (me.attr('tab') && me.attr('tab') != '') {
                        input.attr('tabindex', me.attr('tab'));
                    }
                    if (this.options && this.options.IsRequired) {
                        input.prop('required', this.options.IsRequired);
                    }
                    if (this.options && this.options.IsRequiredMessage) {
                        input.attr('data-msg-required', this.options.IsRequiredMessage);
                    }
                    if (this.options && this.options.CauseRefresh) {
                        input.on('change', () => {
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
                    if (this.options && this.options.Hide) {
                        me.addClass("hideControl");
                    }
                }
                getValue() {
                    return $(this).find('textarea').val();
                }
                setValue(value) {
                    $(this).find('textarea').val(value);
                    if (this.myCM) {
                        if (value == null) {
                            value = '';
                        }
                        this.myCM.getDoc().setValue(value);
                    }
                }
                setValueView(value) {
                    let me = $(this);
                    this.value = value;
                    let input = me.find('label');
                    input.html(flexygo.string.escapeHTML(value));
                }
                fullscreen(value) {
                    if (typeof value == 'undefined') {
                        value = true;
                    }
                    if (value) {
                        $('flx-code[isFS=true]').each((i, e) => {
                            e.myCM.setOption("fullScreen", false);
                            $(e).attr('isFS', 'false');
                        });
                    }
                    this.myCM.setOption("fullScreen", value);
                    $(this).attr('isFS', value);
                }
                getMode() {
                    let me = $(this);
                    let type = me.attr('type');
                    if (type) {
                        type = type.toLowerCase();
                    }
                    switch (type) {
                        case 'html':
                            return 'htmlmixed';
                        case 'js':
                            return 'javascript';
                        case 'css':
                            return 'css';
                        case 'sql':
                            return 'text/x-mssql';
                        default:
                            return null;
                    }
                }
                getWizardButton() {
                    if (this.options && this.options.SearchFunction) {
                        return '<button class="btn btn-assistant" type= "button" name="wizardBtn" title= "' + flexygo.localization.translate('viewmanager.openwizard') + '"><i class="flx-icon icon-wizard-1"></i></button>';
                    }
                    return '';
                }
                setWizardSettings(m) {
                    let wizardBtn = $(this).find('[name="wizardBtn"]');
                    if ($(this).closest("flx-module").attr('type') == 'flx-edit') {
                        wizardBtn.show();
                    }
                    else if ($(this).closest("flx-module").attr('type') == 'flx-view') {
                        wizardBtn.hide();
                    }
                    wizardBtn.on('click', function () {
                        flexygo.utils.execDynamicCode.call(m, m.options.SearchFunction);
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
                    input = me.find('textarea');
                    input.trigger('change');
                }
            }
            wc.FlxCodeElement = FlxCodeElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-code', flexygo.ui.wc.FlxCodeElement);
//# sourceMappingURL=flx-code.js.map