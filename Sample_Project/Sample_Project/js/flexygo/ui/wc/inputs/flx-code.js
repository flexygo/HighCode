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
                    this.editor = 'codemirror';
                    this.intellisense = "online";
                    this.libraryLoaded = false;
                    this.readonly = false;
                    this.inTemplate = false;
                    this.help = false;
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
                    if ((typeof monaco) != 'undefined') {
                        this.editor = 'monaco';
                    }
                    let mode = element.attr('mode');
                    if (!flexygo.utils.isBlank(mode)) {
                        this.renderMode = mode.toLowerCase();
                    }
                    else {
                        this.renderMode = "edit";
                    }
                    this.type = element.attr('type') || 'html';
                    if (($(this).attr('forcecodemirror') || '').toLowerCase() == 'true' || this.renderMode == "preview") {
                        this.editor = 'codemirror';
                    }
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
                    else {
                        //help context
                        if ($(this.closest('.flxhelp')).length > 0) {
                            this.editor = "codemirror";
                            this.help = true;
                        }
                    }
                    this.inTemplate = element.attr("template") ? true : false;
                    this.width = element.attr("width");
                    element.removeAttr("width");
                    this.height = element.attr("height") ? element.attr("height") : "300px";
                    element.removeAttr("height");
                    element.attr('editor', this.editor);
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
                    const SearchFunction = element.attr('SearchFunction');
                    if (SearchFunction) {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.SearchFunction = SearchFunction;
                    }
                    const ChatGPTSettingId = element.attr('ChatGPTSettingId');
                    if (ChatGPTSettingId) {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.ChatGPTSettingId = ChatGPTSettingId;
                    }
                    let val = element.html();
                    this.help = $(element)[0].hasAttribute('help');
                    if (!this.connected) {
                        if (this.editor == 'codemirror') {
                            this.initCodeMirror();
                        }
                        else {
                            this.initMonaco();
                        }
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
                static setTypeScriptLibraries(libraries) {
                    this.typeScriptLibraries = libraries;
                }
                static setOfflineLibraries(libraries) {
                    this.offlineLibraries = libraries;
                }
                static setHtmlStyles(styles) {
                    this.htmlStyles = styles;
                }
                static getTypeScriptLibraries() {
                    return this.typeScriptLibraries;
                }
                static getOfflineLibraries() {
                    return this.offlineLibraries;
                }
                static getHtmlStyles() {
                    return this.htmlStyles;
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
                    if (oldVal == newVal) {
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
                        if (this.editor == 'codemirror') {
                            element.find('textarea').prop('required', this.options.IsRequired);
                        }
                        else {
                            element.find('input').prop('required', this.options.IsRequired);
                        }
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
                    if (this.editor == 'codemirror') {
                        this.initCodeMirror();
                    }
                    else {
                        if (this.monaco) {
                            this.monaco.dispose();
                        }
                        this.initMonaco();
                    }
                    if (val && val != "") {
                        this.setValue(val);
                    }
                }
                initMonaco() {
                    var _a;
                    let me = $(this);
                    if (me.attr('mode') && me.attr('mode').toLowerCase() == 'view') {
                        this.readonly = true; //'nocursor';
                    }
                    else {
                        this.readonly = false;
                        if (this.type == 'sql' && ((_a = $(document.head).find('script[ID="sqlFormat"]')) === null || _a === void 0 ? void 0 : _a.length) == 0) {
                            $(document.head).append(`<script id="sqlFormat" defer src="${flexygo.utils.resolveUrl('~/js/plugins/sql-formatter/sql-formatter.min.js')}"/>`);
                            if (me.closest('flx-edit').length > 0) {
                                if (!flexygo.utils.isBlank(me.closest('flx-edit').attr("objectname")) && !flexygo.utils.isBlank(me.closest('flx-edit').attr("objectwhere"))) {
                                    let context = new flexygo.obj.Entity(me.closest('flx-edit').attr("objectname"), me.closest('flx-edit').attr("objectwhere"));
                                    context.read();
                                    me.attr('ConnStringId', context.data["ConnStringId"] ? context.data["ConnStringId"].Value : context.getConfig()["ConnStringId"]);
                                }
                            }
                        }
                    }
                    if (this.height) {
                        $(this).css("height", this.height);
                    }
                    if (this.width) {
                        $(this).css("width", this.width);
                    }
                    if (this.options && this.options.Tag) {
                        try {
                            let intellisenseConfig = JSON.parse(this.options.Tag);
                            if (typeof (intellisenseConfig.intellisense) == 'boolean' && intellisenseConfig.intellisense == false) {
                                this.intellisense = "none";
                            }
                            else if (!flexygo.utils.isBlank(intellisenseConfig.intellisense)) {
                                this.intellisense = intellisenseConfig.intellisense.toLowerCase();
                            }
                            this.intellisense = this.intellisense == "online" || this.intellisense == "offline" ? this.intellisense : "none";
                        }
                        catch (ex) {
                            console.log("Error: " + ex.message);
                        }
                    }
                    let container = `<div class="superContainer"><div class="monacoContainer"></div></div>`;
                    let placeholder = '<div class="monaco-placeholder"></div>';
                    let rnd = $(`<input class="hidden"></input><div class="wizardButtons">${this.getWizardButton()}</div>` + placeholder + container);
                    me.html(rnd);
                    this.setButtonsSettings(this);
                    if (this.options && this.options.Locked) {
                        this.readonly = this.options.Locked;
                    }
                    if (this.options && this.options.PlaceHolder) {
                        me.attr('placeholder', this.options.PlaceHolder);
                        if (this.inTemplate) {
                            $(me).find('.superContainer').css('margin-top', "-19px");
                        }
                    }
                    this.setOptions();
                    this.setCodeEditor();
                }
                setCodeEditor() {
                    var _a;
                    let me = this;
                    this.monaco ? this.monaco.dispose() : null;
                    //get the languageId if me.type is an language alias
                    let language = monaco.languages.getEncodedLanguageId(me.type) != 0 ? me.type : (_a = monaco.languages.getLanguages().find(lang => lang.aliases && lang.aliases.includes(me.type))) === null || _a === void 0 ? void 0 : _a.id;
                    this.monaco = monaco.editor.create($(me).find('.monacoContainer')[0], {
                        value: flexygo.utils.isBlank(me.value) ? '' : me.value,
                        language: language,
                        theme: $(document.body).attr("mode") == 'dark' ? 'vs-dark' : 'vs',
                        readOnly: this.readonly,
                        minimap: {
                            enabled: false
                        },
                        automaticLayout: true
                    });
                    const options = { childList: true, subtree: true };
                    const observer = new MutationObserver((mutationsList, observer) => {
                        for (const mutation of mutationsList) {
                            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                                mutation.addedNodes.forEach((value) => {
                                    if ($(value).hasClass('view-line')) {
                                        me.adjustPlaceHolder($(value));
                                    }
                                });
                                observer.disconnect();
                                break;
                            }
                        }
                    });
                    observer.observe($(me).find('.monacoContainer')[0], options);
                    this.monaco.onDidLayoutChange((e) => {
                        me.adjustPlaceHolder($(this).find('.view-line'));
                    });
                    this.monaco.onDidFocusEditorWidget(() => {
                        let librariesCount = Object.keys(monaco.languages.typescript.javascriptDefaults.getExtraLibs()).length;
                        if (me.type == 'js') {
                            if (me.intellisense == "online") {
                                if (!this.libraryLoaded) {
                                    let libraries = flexygo.ui.wc.FlxCodeElement.getTypeScriptLibraries();
                                    monaco.languages.typescript.javascriptDefaults.setExtraLibs(libraries);
                                    this.libraryLoaded = true;
                                }
                            }
                            else if (me.intellisense == "offline") {
                                if (!this.libraryLoaded) {
                                    let libraries = flexygo.ui.wc.FlxCodeElement.getOfflineLibraries();
                                    monaco.languages.typescript.javascriptDefaults.setExtraLibs(libraries);
                                    this.libraryLoaded = true;
                                }
                            }
                            else if (librariesCount !== 0) {
                                monaco.languages.typescript.javascriptDefaults.setExtraLibs(null);
                            }
                        }
                        if (!flexygo.utils.isBlank($(me).attr("placeholder")) && !me.readonly) {
                            $(me).find('.monaco-placeholder').addClass('focused');
                        }
                    });
                    $(this).off('mousedown.flxcode').on('mousedown.flxcode', (e) => {
                        if (e.button === 2) {
                            $(me).addClass("openingContextMenu");
                        }
                    });
                    this.monaco.onDidBlurEditorWidget(() => {
                        if (!$(me).hasClass("openingContextMenu")) {
                            let oldValue = me.value;
                            let newValue = me.monaco.getValue();
                            if (!flexygo.utils.isBlank($(me).attr("placeholder")) && !me.readonly) {
                                $(me).find('.monaco-placeholder').removeClass('focused');
                            }
                            if (oldValue != newValue) {
                                $(me).find('input').val(newValue);
                                me.value = newValue;
                                me.triggerDependencies();
                            }
                        }
                    });
                    this.monaco.onContextMenu(() => {
                        $(me).removeClass("openingContextMenu");
                    });
                    $(this).find('.superContainer')[0].style.backgroundColor = this.monaco._themeService._theme.getColor("editor.background")._toString;
                    if (!flexygo.utils.isBlank($(this).attr("placeholder"))) {
                        $($(this).find('.monaco-placeholder')[0]).html(`<span style="font-family:${this.monaco.getOption(monaco.editor.EditorOption.fontInfo).fontFamily}">${$(this).attr("placeholder")}</span>`);
                        if (flexygo.utils.isBlank(me.monaco.getValue())) {
                            $(me).find('.monaco-placeholder').removeClass('focused');
                        }
                        else {
                            $(me).find('.monaco-placeholder').addClass('focused');
                        }
                    }
                    if (this.readonly) {
                        let message = this.options && this.options.Locked && $(this).attr('mode') !== 'view' ? flexygo.localization.translate('flxcode.propertyLocked') : flexygo.localization.translate('flxcode.readonlyMode');
                        $(this).tooltip({ title: message, trigger: 'manual', delay: { show: 0, hide: 5000 } });
                        this.monaco.onDidAttemptReadOnlyEdit((e) => {
                            let messageController = me.monaco.getContribution('editor.contrib.messageController');
                            messageController.showMessage('', me.monaco.getPosition());
                            if ($(this).next('div.tooltip:visible').length == 0) {
                                $(this).tooltip('show');
                                setTimeout(function () {
                                    $(me).tooltip('hide');
                                }, 1000);
                            }
                        });
                    }
                    $(me).find('input').val(me.monaco.getValue());
                    if (this.type == 'sql') {
                        this.monaco.addAction({
                            id: "format_sql",
                            label: "Format Document",
                            keybindings: [
                                monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyF,
                                // chord
                                //monaco.KeyMod.chord(
                                //    monaco.KeyMod.Shift | monaco.KeyCode.Escape,
                                //    monaco.KeyCode.F11
                                //),
                            ],
                            precondition: '!editorReadonly && !inCompositeEditor',
                            contextMenuGroupId: "1_modification",
                            contextMenuOrder: 1.2,
                            run: function () {
                                let sqlFormatter = require('js/plugins/sql-formatter/sql-formatter.js');
                                let newText = sqlFormatter.format(me.monaco.getValue(), { language: 'transactsql', keywordCase: 'upper' });
                                me.monaco.executeEdits(null, [{ text: newText, range: me.monaco.getModel().getFullModelRange() }]);
                            },
                        });
                        var contextKey = this.monaco.createContextKey('contentSelected', false);
                        this.monaco.onContextMenu(function () {
                            let condition = !flexygo.utils.isBlank(me.monaco.getModel().getValueInRange(me.monaco.getSelection())) ? true : false;
                            contextKey.set(condition);
                        });
                        this.monaco.addAction({
                            id: "format_selection_sql",
                            label: "Format Selection",
                            keybindings: [
                                // chord
                                monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK, monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyF),
                            ],
                            precondition: 'contentSelected && !editorReadonly',
                            contextMenuGroupId: "1_modification",
                            contextMenuOrder: 1.3,
                            run: function () {
                                let sqlFormatter = require('js/plugins/sql-formatter/sql-formatter.js');
                                me.monaco.getSelections().forEach((e) => {
                                    let text = me.monaco.getModel().getValueInRange(e);
                                    try {
                                        text = sqlFormatter.format(text, { language: 'transactsql', keywordCase: 'upper' });
                                    }
                                    catch (ex) { }
                                    me.monaco.getModel().pushEditOperations([], [
                                        {
                                            range: e,
                                            text: text,
                                            forceMoveMarkers: true
                                        }
                                    ], null);
                                });
                            },
                        });
                    }
                    this.monaco.addAction({
                        id: "fullscreen_action",
                        label: "Flexygo: Toggle fullscreen",
                        keybindings: [
                            monaco.KeyCode.F11,
                            // chord
                            //monaco.KeyMod.chord(
                            //    monaco.KeyMod.Shift | monaco.KeyCode.Escape,
                            //    monaco.KeyCode.F11
                            //),
                        ],
                        contextMenuGroupId: "navigation",
                        contextMenuOrder: 1.5,
                        run: function () {
                            me.fullscreen();
                        },
                    });
                    this.monaco.addAction({
                        id: 'custom-esc',
                        label: 'Close',
                        keybindings: [monaco.KeyCode.Escape],
                        precondition: '!suggestWidgetVisible && !markersNavigationVisible && !findWidgetVisible',
                        run: function () {
                            let inFullscreen = $('flx-code.fullscreen');
                            if (inFullscreen.length > 0) {
                                $(inFullscreen[0]).removeClass("fullscreen");
                                inFullscreen[0].monaco.layout();
                            }
                        }
                    });
                }
                adjustPlaceHolder(node) {
                    if (this.options && this.options.PlaceHolder && (node === null || node === void 0 ? void 0 : node.length) > 0) {
                        let placeholder = $(this).find('.monaco-placeholder');
                        let placeholderHidden = placeholder.hasClass('focused');
                        if (placeholderHidden) {
                            $(this).find('.monaco-placeholder').removeClass('focused');
                        }
                        let nodeRects = node[0].getBoundingClientRect();
                        placeholder.css({ "width": nodeRects.width, "height": nodeRects.height });
                        placeholder.offset({ "top": nodeRects.top, "left": nodeRects.left });
                        if (placeholderHidden) {
                            placeholder.addClass('focused');
                        }
                    }
                }
                initCodeMirror() {
                    var _a;
                    let me = $(this);
                    if (me.attr('mode') && me.attr('mode').toLowerCase() == 'view' || this.help) {
                        this.readonly = true; //'nocursor';
                    }
                    else {
                        this.readonly = false;
                    }
                    let txtArea = '<textarea style="min-height:100%;width:100%;"></textarea>';
                    let rnd;
                    if (!this.help) {
                        me.html($(this.getWizardButton() + txtArea));
                    }
                    else if (((_a = $(this).attr('returnEnabled')) === null || _a === void 0 ? void 0 : _a.toLowerCase()) == "true") {
                        me.append(this.getHeadBar()).append($(txtArea));
                    }
                    else {
                        me.html($(txtArea));
                    }
                    !this.help ? this.setButtonsSettings(this) : null;
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
                        this.myCM.on("blur", (cm) => {
                            let oldValue = cm.getTextArea().value;
                            let newValue = cm.getValue();
                            me.find('textarea').val(newValue);
                            if (oldValue != newValue) {
                                this.triggerDependencies();
                            }
                        });
                    }, 500);
                    this.setOptions();
                }
                setOptions() {
                    let me = $(this);
                    let input = this.editor == 'monaco' ? me.find('input') : me.find('textarea');
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
                    const module = me.closest('flx-module')[0];
                    if ((this.options && this.options.CauseRefresh) || (module && module.moduleConfig && module.moduleConfig.PropsEventDependant && module.moduleConfig.PropsEventDependant.includes(this.property))) {
                        input.on('change', () => {
                            //$(document).trigger('refreshProperty', [input.closest('flx-edit'), this.options.Name]);
                            let ev = {
                                class: "property",
                                type: "changed",
                                sender: this,
                                masterIdentity: this.property
                            };
                            flexygo.events.trigger(ev, me);
                        });
                    }
                    if (this.options && this.options.Hide) {
                        me.addClass("hideControl");
                    }
                }
                getValue() {
                    if (this.editor == 'monaco') {
                        if (this.monaco) {
                            return this.monaco.getValue();
                        }
                        return this.value ? this.value : '';
                    }
                    else {
                        return $(this).find('textarea').val();
                    }
                }
                setValue(value) {
                    if (!flexygo.utils.isBlank(value)) {
                        value = String(value);
                    }
                    if (this.editor == 'monaco') {
                        if (this.monaco) {
                            $(this).find('input').val(value);
                            if (this.monaco) {
                                if (value == null) {
                                    value = '';
                                }
                                this.monaco.setValue(value);
                            }
                        }
                        this.value = value;
                    }
                    else {
                        $(this).find('textarea').val(value);
                        if (this.myCM) {
                            if (value == null) {
                                value = '';
                            }
                            this.myCM.getDoc().setValue(value);
                        }
                    }
                }
                setValueWithHistory(value) {
                    if (!flexygo.utils.isBlank(value)) {
                        value = String(value);
                    }
                    if (this.editor == 'monaco' && this.monaco) {
                        this.monaco.executeEdits(null, [{ text: value, range: this.monaco.getModel().getFullModelRange() }]);
                        this.value = value;
                    }
                    else {
                        this.setValue(value);
                    }
                }
                setValueView(value) {
                    let me = $(this);
                    this.value = value;
                    let input = me.find('label');
                    input.html(flexygo.string.escapeHTML(value));
                }
                fullscreen(value) {
                    if (this.editor == 'monaco') {
                        $(this).toggleClass("fullscreen");
                        this.monaco.layout();
                    }
                    else {
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
                }
                getMode() {
                    let me = $(this);
                    let type = me.attr('type');
                    if (type) {
                        type = type.toLowerCase();
                    }
                    //this modes can be query in CodeMirror.mimeModes
                    switch (type) {
                        case 'html':
                            return 'htmlmixed';
                        case 'js':
                            return 'javascript';
                        case 'css':
                            return 'css';
                        case 'sql':
                            return 'text/x-mssql';
                        case 'csharp':
                            return 'text/x-csharp';
                        case 'plaintext':
                            return 'text/plain';
                        case 'json':
                            return 'application/json';
                        default:
                            return null;
                    }
                }
                getWizardButton() {
                    var _a, _b, _c;
                    let temButtons = '';
                    if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.SearchFunction) {
                        temButtons = `<button class="btn btn-assistant" type= "button" name="wizardBtn" title= "${flexygo.localization.translate('viewmanager.openwizard')}"><i class="flx-icon icon-wizard-1"></i></button>`;
                    }
                    if ((_b = this.options) === null || _b === void 0 ? void 0 : _b.AllowNewFunction) {
                        temButtons += `<button class="btn btn-assistant" type= "button" name="helpButton" title= "${flexygo.localization.translate('templates.openiconlist')}"><i class="flx-icon icon-images"></i></button>`;
                    }
                    if ((_c = this.options) === null || _c === void 0 ? void 0 : _c.ChatGPTSettingId) {
                        temButtons += '<button class="btn btn-assistant" type= "button" name="AIButton" title="Lowdy"><i class="flx-icon icon-roboto-logo"></i></button>';
                    }
                    return temButtons;
                }
                getHeadBar() {
                    var _a;
                    let headBar;
                    let me = this;
                    if ($(this).closest('flx-ai').length > 0) {
                        let aiElement = $(this).closest('flx-ai')[0];
                        headBar = $(`<div class="flx-headBar" >
                                <span class="headBar-language">${this.type}</span>
                                <button class="${aiElement.targetItem !== undefined && $((_a = aiElement.targetItem) === null || _a === void 0 ? void 0 : _a.context).is("button") ? "flx-icon icon-return-2" : "flx-icon icon-copy"} copy_response icon-zoom-115 headbar-button" type="button"></button>
                            </div>`);
                        $(headBar).find('.headbar-button').off('click.headBarAction').on('click.headBarAction', function () {
                            var _a;
                            if (aiElement.targetItem !== undefined && $((_a = aiElement.targetItem) === null || _a === void 0 ? void 0 : _a.context).is("button")) {
                                if (aiElement.targetItem.is('flx-code')) {
                                    aiElement.targetItem[0].setValueWithHistory(me.getValue());
                                }
                                else {
                                    aiElement.targetItem.val(me.getValue());
                                }
                                $(aiElement).find('.chat_ai_close').click();
                            }
                            else {
                                flexygo.utils.copyClipboard(me.getValue());
                            }
                        });
                    }
                    return headBar;
                }
                triggerReturnEvent(context) {
                    var ev = {
                        class: "codeProperty",
                        type: "returnAction",
                        sender: context
                    };
                    flexygo.events.trigger(ev);
                }
                setButtonsSettings(m) {
                    let wizardBtn = $(this).find('[name="wizardBtn"]');
                    let helpButton = $(this).find('[name="helpButton"]');
                    let AIButton = $(this).find('[name="AIButton"]');
                    if ($(this).closest("flx-module").attr('type') == 'flx-edit') {
                        wizardBtn.show();
                        helpButton.show();
                        AIButton.show();
                    }
                    else if ($(this).closest("flx-module").attr('type') == 'flx-view') {
                        wizardBtn.hide();
                        helpButton.hide();
                        AIButton.hide();
                    }
                    wizardBtn.on('click', function () {
                        flexygo.utils.execDynamicCode.call(m, m.options.SearchFunction);
                    });
                    helpButton.on('click', function () {
                        flexygo.utils.execDynamicCode.call(m, m.options.AllowNewFunction);
                    });
                    AIButton.on('click', function () {
                        let options = {
                            TargetItem: $(this).closest('flx-code')
                        };
                        flexygo.ui.wc.FlxAIElement.prototype.open(options);
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
                    input = this.editor == 'monaco' ? me.find('input') : me.find('textarea');
                    input.trigger('change');
                }
            }
            /**
            * Array of observed attributes.
            * @property observedAttributes {Array}
            */
            FlxCodeElement.observedAttributes = ['type', 'property', 'required', 'disabled', 'requiredmessage', 'theme', 'placeholder', 'iconclass', 'helpid', 'hide'];
            wc.FlxCodeElement = FlxCodeElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-code', flexygo.ui.wc.FlxCodeElement);
//# sourceMappingURL=flx-code.js.map