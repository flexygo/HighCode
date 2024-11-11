/**
 * @namespace flexygo.ui.wc
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var flexygo;
(function (flexygo) {
    var ui;
    (function (ui) {
        var wc;
        (function (wc) {
            /**
            * Library for the FlxAIElement
            *
            * @class FlxAIElement
            * @constructor
            * @return {FlxAIElement} .
            */
            class FlxDbViewerElement extends HTMLElement {
                constructor() {
                    //If a constructor is defined, is REQUIRED call the super constructor
                    super();
                    /**
                    * Set if element has been connected to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                }
                /**
                * Init the webcomponent. REQUIRED.
                * @method init
                */
                init() {
                    let eventClass = "DbViewer";
                    let eventType = "Preview";
                    flexygo.events.off(this, eventClass, eventType);
                    flexygo.events.on(this, eventClass, eventType, this.handlePreviewButton);
                    let me = $(this);
                    me.append(`<flx-dbcombo class="size-m" name="cnnstring" PlaceHolder="${flexygo.localization.translate('objectmanager.selectcnnstring')}" ObjectName="SysObject" ViewName="CnnStrings" SQLValueField="ConnStringid" SQLDisplayField="Descrip" required data-msg-required="${flexygo.localization.translate('objectmanager.validselectcnnstring')}"><template><span TypeId="{{DbTypeId}}">{{Descrip}}</span></template></flx-dbcombo>`);
                    this.connectionCombo = me.find('[name="cnnstring"]')[0];
                    me.append("<erd-editor></erd-editor>");
                    this.editor = me.find('erd-editor')[0];
                    this.editor.setPresetTheme({ appearance: $(document.body).attr("mode") ? $(document.body).attr("mode") : "light" });
                    let schema = JSON.parse(this.editor.value);
                    schema.settings.database = 2; //MSSQL
                    schema.settings.show = 292; //columns of table to see "columname" and "datatype"
                    this.editor.value = JSON.stringify(schema);
                    this.render();
                    this.setMainEvents();
                }
                /**
                * Refresh de webcomponent. REQUIRED.
                * @method refresh
                */
                refresh() {
                    this.init();
                }
                /**
                * Render HTML data.
                * @method render
                */
                render() {
                    let toolbarTemplate = `<div class="scriptButton">
                                      <button id="directExec" disabled>Execute Script</button>
                                        <button id="options" disabled>
                                            <span class="caret"></span>
                                        </button>
                                   </div>`;
                    $(this.editor.shadowRoot).find('.root').append(toolbarTemplate);
                    let noPreviewLayout = $(`<div class="noPreviewLayout"><h1>No Preview</h1></div>`);
                    $(this.editor.shadowRoot).find('.root').append(noPreviewLayout);
                }
                setMainEvents() {
                    let me = this;
                    let button = $($(this.editor.shadowRoot).find('.root .scriptButton button#directExec'));
                    button.off('click').on('click', function () {
                        if (!me.missingConnection()) {
                            let json = JSON.parse(me.editor.value);
                            let tableNames = Object.keys(json.collections.tableEntities).map((key) => json.collections.tableEntities[key].name).join("|");
                            let processparams = [{ "key": "ConnStringId", "value": me.connectionCombo.getValue() },
                                { "key": "Script", "value": me.editor.getSchemaSQL() },
                                { "key": "TableNames", "value": tableNames }];
                            flexygo.nav.execProcess('CreateDataModel', '', '', null, processparams, 'sliderightx50%', false, null);
                        }
                    });
                    button = $($(this.editor.shadowRoot).find('.root .scriptButton button#options'));
                    button.off('click').on('click', function (e) {
                        $(this).addClass("selected");
                        let contextMenu = $('flx-contextmenu')[0];
                        let menu = $(`<ul>
                                <li><span class="btn1">With Test Data</span></li>
                                <li><span class="btn2">Without Test Data</span></li>
                                <li><span class="btn3">Generate Objects</span></li>
                            </ul>`);
                        menu.find('span.btn1').on("click", function () {
                            if (!me.missingConnection()) {
                                flexygo.utils.showLoading(null, "Generating Test Data");
                                me.getTestData(me.connectionCombo.getValue());
                            }
                            let contextMenu = $('flx-contextmenu')[0];
                            contextMenu.destroy();
                        });
                        menu.find('span.btn2').on("click", function () {
                            $($(me.editor.shadowRoot).find('.root .scriptButton button#directExec')).trigger("click");
                            let contextMenu = $('flx-contextmenu')[0];
                            contextMenu.destroy();
                        });
                        // When you open the 'Generate Objects' option
                        menu.find('span.btn3').on("click", function () {
                            let json = JSON.parse(me.editor.value);
                            let tableNames = Object.keys(json.collections.tableEntities).map((key) => json.collections.tableEntities[key].name).join("|");
                            let tables = tableNames.split("|");
                            // Need the tables in the preview
                            if (tables[0].length == 0) {
                                flexygo.msg.warning("You need to generate the datamodel.");
                                contextMenu = $('flx-contextmenu')[0];
                                contextMenu.destroy();
                            }
                            // Need the connection strings
                            else if (me.missingConnection()) {
                                contextMenu = $('flx-contextmenu')[0];
                                contextMenu.destroy();
                            }
                            else {
                                let tablesTitle = $(`<h4 class="table-menu">Which tables?</h4>`);
                                let tablesList = $(`<ul class="table-menu">`);
                                tables.forEach((table) => {
                                    tablesList.append(`<li><span><input type="checkbox">${table}</span></li>`);
                                });
                                let buttons = $(`<div class="table-menu-buttons">
                                            <button class="table-menu-buttons ok-button" disabled>Accept</button>
                                            <button class="table-menu-buttons cancel-button">Cancel</button>
                                        </div>`);
                                // Selecting the tables we want
                                let lastSelectedIndex = null;
                                tablesList.find('li').on("click", function (e) {
                                    let currentIndex = $(this).index();
                                    if (e.shiftKey && lastSelectedIndex !== null) {
                                        let start = Math.min(lastSelectedIndex, currentIndex);
                                        let end = Math.max(lastSelectedIndex, currentIndex);
                                        tablesList.find('li').slice(start, end + 1).each(function () {
                                            $(this).addClass("selected");
                                            $(this).find('input[type="checkbox"]').prop('checked', true);
                                        });
                                    }
                                    else {
                                        if ($(this).hasClass("selected")) {
                                            $(this).removeClass("selected");
                                            $(this).find('input[type="checkbox"]').prop('checked', false);
                                        }
                                        else {
                                            $(this).addClass("selected");
                                            $(this).find('input[type="checkbox"]').prop('checked', true);
                                        }
                                        lastSelectedIndex = currentIndex;
                                    }
                                    if ($('ul.table-menu li.selected').length == 0) {
                                        $('button.table-menu-buttons.ok-button').prop('disabled', true);
                                    }
                                    else {
                                        $('button.table-menu-buttons.ok-button').removeAttr('disabled');
                                    }
                                });
                                // Execute the generateObject
                                buttons.find('button').on("click", function (e) {
                                    if ($(this).hasClass("ok-button")) {
                                        let tablesToCreate = [];
                                        $('ul.table-menu li.selected').each(function () {
                                            tablesToCreate.push($(this).text());
                                        });
                                        me.generateObjects(me.connectionCombo.getValue(), tablesToCreate);
                                    }
                                    contextMenu = $('flx-contextmenu')[0];
                                    contextMenu.destroy();
                                });
                                contextMenu.createMenu(null).append(tablesTitle).append(tablesList).append(buttons);
                                contextMenu.show({ top: e.clientY - (46 + 43.8 * tables.length + 66), left: e.clientX });
                            }
                        });
                        contextMenu.createMenu(null).append(menu);
                        contextMenu.show({ top: e.clientY - 75, left: e.clientX });
                    });
                    button.blur(function (e) {
                        $(this).removeClass("selected");
                        if (e.relatedTarget) {
                            let contextMenu = $('flx-contextmenu')[0];
                            contextMenu.destroy();
                        }
                    });
                    $(this.editor).blur(() => {
                        $(me.editor.shadowRoot).find('.context-menu-content').remove();
                    });
                }
                missingConnection() {
                    if (flexygo.utils.isBlank(this.connectionCombo.getValue())) {
                        flexygo.msg.warning("You need to select a connection chain.");
                        $(this.connectionCombo).find('.input-group').css("border", "1px solid var(--danger-color)");
                        const removeBorder = () => {
                            $(this.connectionCombo).find('.input-group').css("border", "none");
                            this.connectionCombo.inputval.off("change", removeBorder);
                        };
                        this.connectionCombo.inputval.off("change").on("change", removeBorder);
                        return true;
                    }
                    return false;
                }
                setSchemaSQL(value) {
                    let schema = JSON.parse(this.editor.value);
                    if (schema.settings.canvasType != 'ERD') {
                        schema.settings.canvasType = 'ERD';
                        this.editor.value = JSON.stringify(schema);
                    }
                    value = flexygo.utils.isBlank(value) ? "" : value;
                    value = value.replace(/[\[\]]/g, '');
                    if (flexygo.utils.isBlank(value)) {
                        $(this.editor.shadowRoot).find('.root .noPreviewLayout').css("display", "flex");
                        $($(this.editor.shadowRoot).find('.root .scriptButton button')).attr("disabled", "disabled");
                        this.editor.clear();
                    }
                    else {
                        $(this.editor.shadowRoot).find('.root .noPreviewLayout').css("display", "none");
                        $($(this.editor.shadowRoot).find('.root .scriptButton button')).removeAttr("disabled");
                        this.editor.setSchemaSQL(value);
                    }
                }
                getTestData(connection) {
                    let me = this;
                    let chatgpt = $(this).closest("main").find("flx-ai");
                    if (chatgpt.length > 0) {
                        let settings = JSON.parse(JSON.stringify(chatgpt[0].settings));
                        settings.SystemPrompt = "Generate 5 INSERTS for each table. Use fictional and suitable data for each type of column. DO NOT CREATE, INSERT!!!";
                        let messages = [{
                                "role": "user",
                                "content": this.editor.getSchemaSQL()
                            }];
                        settings.ImplementedTools = "generateTestData";
                        let params = {
                            Chat: settings,
                            Messages: JSON.stringify(messages)
                        };
                        flexygo.ajax.post("~/api/AI", 'RequestChatGPT', params, (response) => {
                            if (response) {
                                let resp = JSON.parse(response);
                                if (resp.error) {
                                    flexygo.msg.warning(resp.error.message, null, "It was not possible to generate test data");
                                }
                                else if (resp.choices && resp.choices[0] && resp.choices[0].message.content) {
                                    let json = JSON.parse(me.editor.value);
                                    let tableNames = Object.keys(json.collections.tableEntities).map((key) => json.collections.tableEntities[key].name).join("|");
                                    flexygo.utils.removeLoadingEffect(null);
                                    flexygo.nav.openProcessParams('CreateDataModel', '', '', { 'connection': connection, 'script': me.editor.getSchemaSQL(), 'inserts': resp.choices[0].message.content, 'tables': tableNames }, 'sliderightx50%', false);
                                }
                                else {
                                    flexygo.msg.warning("It was not possible to generate test data");
                                }
                            }
                        });
                    }
                }
                handlePreviewButton(e) {
                    let code = $(e.sender).closest('.chat_ai_text').find('flx-code').attr('value');
                    this.setSchemaSQL(code);
                }
                generateObjects(connection, tables) {
                    var _a;
                    return __awaiter(this, void 0, void 0, function* () {
                        let me = this;
                        let chatgpt = $(this).closest("main").find("flx-ai");
                        flexygo.utils.showLoading(null, "Generating Objects");
                        if (chatgpt.length > 0) {
                            let settings = JSON.parse(JSON.stringify(chatgpt[0].settings));
                            settings.CanCallProcesses = "true";
                            settings.ToolsCategory = "process";
                            settings.SystemPrompt = "Create objects for database tables. YOU DO NOT NEED THE VIEW KEYS";
                            settings.ImplementedTools = "createObject";
                            settings.ConnectionString = connection;
                            let results = "";
                            let objectNames = [];
                            for (const table of tables) {
                                let messages = [{
                                        "role": "user",
                                        "content": "Create the object for the database table '" + table + "' with the dafault values",
                                    }];
                                let params = {
                                    Chat: settings,
                                    Messages: JSON.stringify(messages)
                                };
                                let result = yield me.apiObjectCreationCall(params, table);
                                results += result;
                                objectNames.push(result.split(' ')[2]); // The object name will always be in the 2nd position
                            }
                            ;
                            let objectWhere = "ObjectName=''";
                            objectNames.forEach((objName) => {
                                objectWhere += ` OR ObjectName='${objName}'`;
                            });
                            (_a = $('#mainNav')[0]) === null || _a === void 0 ? void 0 : _a.refresh();
                            flexygo.utils.removeLoadingEffect();
                            flexygo.msg.alert(results, () => {
                                flexygo.nav.openPage("list", "sysObjects", objectWhere, null, "popup");
                            }, "Summary");
                        }
                    });
                }
                apiObjectCreationCall(params, table) {
                    return new Promise((resolve, reject) => {
                        flexygo.ajax.post("~/api/AI", 'RequestChatGPT', params, (response) => {
                            if (response) {
                                let resp = JSON.parse(response);
                                if (resp.error) {
                                    reject(`<hr><p><strong>${table}</strong>: ${resp.error.message}</p>`);
                                }
                                else if (resp.choices && resp.choices[0] && resp.choices[0].message.content) {
                                    resolve(`<hr><p><strong>${table}</strong>: ${resp.choices[0].message.content}</p>`);
                                }
                                else {
                                    reject(`<hr><p><strong>${table}</strong>: ERROR: Empty or malformed response</p>`);
                                }
                            }
                            else {
                                reject(`<hr><p><strong>${table}</strong>: ERROR: No response from server</p>`);
                            }
                        }, () => { reject(); });
                    }).catch(() => { return `<hr><p><strong>${table}</strong>: <strong style="color: red;">Critical error</strong></p>`; });
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    this.connected = true;
                    let script = `
            <script class="dbviewer">
                import('../../../js/plugins/erd-editor/erd-editor.js').then((module) => {
                    $('flx-dbviewer')[0].init();
                    $('flx-dbviewer').closest("flx-module")[0].moduleLoaded();
                }).catch((error) => {
                    console.error('Error al cargar el módulo:', error);
                });
            </script>
            `;
                    if ($(document.head).find('script[class="dbviewer"]').length == 0) {
                        $(document.head).append(script);
                    }
                    else {
                        this.init();
                        this.closest("flx-module").moduleLoaded();
                    }
                }
                /**
                * Fires when the attribute value of the element is changed.
                * @method attributeChangedCallback
                */
                attributeChangedCallback(attrName, oldVal, newVal) {
                    let needInit = false;
                    //if (attrName.toLowerCase() == 'settings' && newVal && newVal != '') {
                    //    this.settings = newVal;
                    //    needInit = true;
                    //}
                    if (this.connected && needInit) {
                        this.init();
                    }
                }
                /**
                * Fires when element is detached to DOM
                * @method disconnectedCallback
                */
                disconnectedCallback() {
                    let contextMenu = $('flx-contextmenu')[0];
                    contextMenu.destroy();
                }
            }
            /**
            * Array of observed attributes. REQUIRED
            * @property observedAttributes {Array}
            */
            FlxDbViewerElement.observedAttributes = ['settings'];
            wc.FlxDbViewerElement = FlxDbViewerElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define("flx-dbviewer", flexygo.ui.wc.FlxDbViewerElement);
//# sourceMappingURL=flx-dbviewer.js.map