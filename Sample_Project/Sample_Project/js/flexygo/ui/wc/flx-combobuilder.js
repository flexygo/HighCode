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
            * Library for the FlxCombobuilder
            *
            * @class FlxCombobuilder
            * @constructor
            * @return {FlxCombobuilder} .
            */
            class FlxComboBuilderElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                    * Set if element has been connected to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                    /**
                    * Component Target Item
                    * @property targetItem {JQuery}
                    */
                    this.targetItem = null;
                    /**
                    * name of the property to fill in
                    * @property sqlProperty {string}
                    */
                    this.sqlProperty = null;
                    /**
                    * Init the webcomponent. REQUIRED.
                    * @method init
                    */
                    this.openQuote = "[";
                    this.closeQuote = "]";
                }
                init() {
                    this.render();
                }
                /**
                * Refresh de webcomponent. REQUIRED.
                * @method refresh
                */
                refresh() {
                    this.render();
                }
                /**
                * Render HTML data.
                * @method render
                */
                render() {
                    let me = $(this);
                    me.html(this.formComponents());
                    let connstring = me.find('[name="cnnstring"]');
                    let tableName = me.find('[name="tablename"]');
                    let valueField = me.find('[name="valuefield"]');
                    let displayField = me.find('[name="displayfield"]');
                    let additionalFields = me.find('[name="additionalfields"]');
                    let orderField = me.find('[name="orderfield"]');
                    let orderSwitch = me.find('[name="order-switch"]');
                    let originSwitch = me.find('[name="origin-switch"]');
                    let sqlSentence = me.find('[name ="sql-sentence"]');
                    this.enableComboFields();
                    tableName.attr('disabled', 'true');
                    connstring.on('change', (e) => {
                        tableName.val('');
                        this.enableComboFields();
                        if (connstring.val() != null) {
                            tableName.removeAttr('disabled');
                        }
                        else {
                            tableName.attr('disabled', 'true');
                        }
                        tableName.attr('ViewName', '');
                        valueField.attr('ViewName', '');
                        displayField.attr('ViewName', '');
                        orderField.attr('ViewName', '');
                        additionalFields.attr('ViewName', '');
                        tableName.attr('CnnString', $(e.currentTarget).val());
                        valueField.attr('CnnString', $(e.currentTarget).val());
                        displayField.attr('CnnString', $(e.currentTarget).val());
                        orderField.attr('CnnString', $(e.currentTarget).val());
                        additionalFields.attr('CnnString', $(e.currentTarget).val());
                        this.setViewNameByDbType();
                    });
                    originSwitch.on('change', (e) => {
                        tableName.val('');
                        this.enableComboFields();
                        this.setViewNameByDbType();
                    });
                    tableName.on('change', (e) => {
                        this.enableComboFields();
                        valueField.attr('AdditionalWhere', 'TABLE_NAME =\'' + $(e.currentTarget).val() + '\'');
                        displayField.attr('AdditionalWhere', 'TABLE_NAME =\'' + $(e.currentTarget).val() + '\'');
                        orderField.attr('AdditionalWhere', 'TABLE_NAME =\'' + $(e.currentTarget).val() + '\'');
                        additionalFields.attr('AdditionalWhere', 'TABLE_NAME =\'' + $(e.currentTarget).val() + '\'');
                    });
                    valueField.on('change', (e) => {
                        this.fillSQLTextField(this.SQLSentence());
                        if (valueField.val() != null && displayField.val() != null) {
                            additionalFields.attr('AdditionalWhere', 'TABLE_NAME =\'' + tableName.val() + '\' AND COLUMN_NAME  <> \'' + valueField.val() + '\' AND COLUMN_NAME  <> \'' + displayField.val() + '\'');
                        }
                    });
                    displayField.on('change', (e) => {
                        this.fillSQLTextField(this.SQLSentence());
                        if (valueField.val() != null && displayField.val() != null) {
                            additionalFields.attr('AdditionalWhere', 'TABLE_NAME =\'' + tableName.val() + '\' AND COLUMN_NAME  <> \'' + valueField.val() + '\' AND COLUMN_NAME <> \'' + displayField.val() + '\'');
                        }
                    });
                    additionalFields.on('change', (e) => {
                        this.fillSQLTextField(this.SQLSentence());
                    });
                    orderField.on('change', (e) => {
                        this.fillSQLTextField(this.SQLSentence());
                    });
                    orderSwitch.on('change', (e) => {
                        this.fillSQLTextField(this.SQLSentence());
                    });
                    me.find('[name="save-button"]').on('click', (e) => {
                        if (this.validateRequired(valueField, displayField, orderField)) {
                            $(this.targetItem).find('[property="SQLValueField"]').val(valueField.val());
                            $(this.targetItem).find('[property="SQLDisplayField"]').val(displayField.val());
                            $(this.targetItem).find('[property="ConnStringId"]').val(connstring.val());
                            $(this.targetItem).find(`[property="${this.sqlProperty}"]`).val(sqlSentence.val());
                            flexygo.msg.success(flexygo.localization.translate('combobuilder.saved'));
                            flexygo.nav.closePage(me);
                        }
                    });
                    me.find('[name="cancel-button"]').on('click', (e) => {
                        flexygo.nav.closePage(me);
                    });
                }
                setViewNameByDbType() {
                    let tableName = $(this).find('[name="tablename"]');
                    let valueField = $(this).find('[name="valuefield"]');
                    let displayField = $(this).find('[name="displayfield"]');
                    let additionalFields = $(this).find('[name="additionalfields"]');
                    let orderField = $(this).find('[name="orderfield"]');
                    let DbType = $(this).find('[name="cnnstring"] li.selected span').attr('typeid');
                    let origin = $(this).find('[name="origin-switch"]').val();
                    switch (DbType) {
                        case 'SQL':
                            if (origin === false) {
                                tableName.attr('ViewName', 'DataTables');
                            }
                            else {
                                tableName.attr('ViewName', 'DataViews');
                            }
                            valueField.attr('ViewName', 'nameColsTable');
                            displayField.attr('ViewName', 'nameColsTable');
                            additionalFields.attr('ViewName', 'nameColsTable');
                            orderField.attr('ViewName', 'nameColsTable');
                            this.openQuote = "[";
                            this.closeQuote = "]";
                            break;
                        case 'ORACLE':
                            if (origin === false) {
                                tableName.attr('ViewName', 'DataTablesOracle');
                            }
                            else {
                                tableName.attr('ViewName', 'DataViewsOracle');
                            }
                            valueField.attr('ViewName', 'nameColsTableOracle');
                            displayField.attr('ViewName', 'nameColsTableOracle');
                            additionalFields.attr('ViewName', 'nameColsTableOracle');
                            orderField.attr('ViewName', 'nameColsTableOracle');
                            this.openQuote = "\"";
                            this.closeQuote = "\"";
                            break;
                        default:
                            tableName.attr('ViewName', '');
                            valueField.attr('ViewName', '');
                            displayField.attr('ViewName', '');
                            additionalFields.attr('ViewName', '');
                            orderField.attr('ViewName', '');
                            break;
                    }
                }
                /**
                * Sets the html form structure
                * @method formComponents
                */
                formComponents() {
                    let render = '';
                    let me = $(this);
                    render += '<div class ="main-combo-builder">';
                    //cap
                    render += '<div><legend><i class="flx-icon icon-wizard-1"></i>' + flexygo.localization.translate('combobuilder.comboassistant') + '</legend></div>';
                    //main div
                    render += '<div>';
                    //LEFT 
                    render += '<div class="col-6 col-m-12 col-s-12 padding-m">';
                    //conn string
                    render += '<div class="padding-m"><label>' + flexygo.localization.translate('combobuilder.cnnstring') + ':<i class="txt-danger">*</i></label>';
                    render += '<span><flx-dbcombo class="size-m" name="cnnstring"  PlaceHolder="' + flexygo.localization.translate('combobuilder.selectcnnstring') + '" iconClass="flx-icon icon-sql" ObjectName="SysObject" ViewName="CnnStrings" SQLValueField="ConnStringid" SQLDisplayField="Descrip" required data-msg-required="' + flexygo.localization.translate('combobuilder.validselectcnnstring') + '"><template><span TypeId="{{DbTypeId}}">{{Descrip}}</span></template></flx-dbcombo></span></div>';
                    //origin
                    render += '<div class="padding-m" style="margin-bottom: -0.8em;"><label>' + flexygo.localization.translate('combobuilder.origin') + ':<i class="txt-danger">*</i></label>';
                    render += '<div class="switch-elements">';
                    render += '<div class="switch-cont"><label style="margin-right:1em" >' + flexygo.localization.translate('combobuilder.fromtable') + '</label> <flx-switch name="origin-switch"></flx-switch><label style="margin-left:1em">' + flexygo.localization.translate('combobuilder.fromview') + '</label></div>';
                    render += '<span class="switch-cbox"><flx-dbcombo  class="size-m" name="tablename" id="tablename"  PlaceHolder="' + flexygo.localization.translate('combobuilder.selecttable') + '" iconClass="flx-icon icon-sql" ObjectName="SysObject" SQLValueField="table_name" SQLDisplayField="table_name" required data-msg-required="' + flexygo.localization.translate('combobuilder.validorigin') + '"></flx-dbcombo></span>';
                    render += '</div></div>';
                    //sql
                    render += '<div class="padding-m" id="sql-cont" ><label>' + flexygo.localization.translate('combobuilder.sqlsentence') + ':</label>';
                    render += '<flx-code type= "sql" property= "SQlSentence" required= "required" disabled name="sql-sentence"> </flx-code></div>';
                    //LEFT  end
                    render += '</div>';
                    //RIGHT
                    render += '<div class="col-6 col-m-12 col-s-12 padding-m">';
                    //value field
                    render += '<div class="padding-m"><label>' + flexygo.localization.translate('combobuilder.valuefield') + ':<i class="txt-danger">*</i></label>';
                    render += '<span><flx-dbcombo class="size-m"   name="valuefield" PlaceHolder="' + flexygo.localization.translate('combobuilder.selectvaluefield') + '" iconClass="flx-icon icon-bullet-list-1" ObjectName="sysObject" SQLValueField="COLUMN_NAME" SQLDisplayField="COLUMN_NAME" required data-msg-required="' + flexygo.localization.translate('combobuilder.validvaluefield') + '"></flx-dbcombo></span></div>';
                    //display field
                    render += '<div class="padding-m"><label>' + flexygo.localization.translate('combobuilder.displayfield') + ':<i class="txt-danger">*</i></label>';
                    render += '<span><flx-dbcombo class="size-m" name="displayfield" PlaceHolder="' + flexygo.localization.translate('combobuilder.selectdisplayfield') + '" iconClass="flx-icon icon-bullet-list-1" ObjectName="sysObject" SQLValueField="COLUMN_NAME" SQLDisplayField="COLUMN_NAME" required data-msg-required="' + flexygo.localization.translate('combobuilder.validdisplayfield') + '"></flx-dbcombo></span></div>';
                    //multicombo addtionals
                    render += '<div class="padding-m"><label>' + flexygo.localization.translate('combobuilder.additionalfield') + ':</label>';
                    render += '<flx-multicombo class="size-m" name= "additionalfields"  PlaceHolder="' + flexygo.localization.translate('combobuilder.selectadditionalfield') + '" iconclass="flx-icon icon-icons" ObjectName="sysObject" SQLValueField="COLUMN_NAME" SQLDisplayField="COLUMN_NAME"></flx-multicombo></div>';
                    //order field
                    render += '<div class="padding-m"><label>' + flexygo.localization.translate('combobuilder.orderfield') + ':<i class="txt-danger">*</i></label>';
                    render += '<div class="switch-elements"><span class="switch-cbox"><flx-dbcombo class="size-m"  name="orderfield" PlaceHolder="' + flexygo.localization.translate('combobuilder.selectorderfield') + '" iconClass="flx-icon icon-bullet-list-1" ObjectName="sysObject" SQLValueField="COLUMN_NAME" SQLDisplayField="COLUMN_NAME" required data-msg-required="' + flexygo.localization.translate('combobuilder.validorderfield') + '"></flx-dbcombo></span>';
                    render += '<div class="switch-cont" id="order-labels"><label class="margin-right-s";">ASC</label><flx-switch name="order-switch"></flx-switch><label>DESC</label></div></div></div>';
                    //RIGHT  end
                    render += '</div>';
                    //end main
                    render += '</div>';
                    //save button
                    render += '<div class="save-cont padding-m"><button class="btn btn-default bg-info saveButton margin-left-l margin-bottom-l" title= "Save" name="save-button"> <i class="flx-icon icon-save-2" flx- fw="" > </i> <span>' + flexygo.localization.translate('combobuilder.save') + '</span> </button>';
                    render += '<button class="btn btn-default bg-danger closeButton margin-left-l margin-bottom-l" title= "Cancel" name="cancel-button"> <i class="flx-icon icon-remove" flx- fw="" > </i> <span>' + flexygo.localization.translate('combobuilder.cancel') + '</span> </button></div>';
                    render += '</div>';
                    return render;
                }
                /**
                 * Enable combo fields text
                 * @method enableComboFields
                 */
                enableComboFields() {
                    let me = $(this);
                    let tableName = me.find('[name="tablename"]');
                    let valueField = me.find('[name="valuefield"]');
                    let displayField = me.find('[name="displayfield"]');
                    let additionalFields = me.find('[name="additionalfields"]');
                    let orderField = me.find('[name="orderfield"]');
                    if (tableName.val() != null) {
                        valueField.removeAttr('disabled');
                        displayField.removeAttr('disabled');
                        additionalFields.removeAttr('disabled');
                        orderField.removeAttr('disabled');
                    }
                    else {
                        valueField.attr('disabled', 'true');
                        displayField.attr('disabled', 'true');
                        additionalFields.attr('disabled', 'true');
                        orderField.attr('disabled', 'true');
                    }
                    valueField.val('');
                    displayField.val('');
                    additionalFields.val('');
                    orderField.val('');
                    me.find('[name ="sql-sentence"]').val('');
                }
                /**
                * SQL sentence with combos data
                * @method SQLSentence
                */
                SQLSentence() {
                    let me = $(this);
                    let valueField = me.find('[name="valuefield"]').val();
                    let displayField = me.find('[name="displayfield"]').val();
                    let tableName = me.find('[name="tablename"]').val();
                    let additionalFields = me.find('[name="additionalfields"]').val();
                    let orderField = me.find('[name="orderfield"]').val();
                    let orderSwitch = me.find('[name="order-switch"]').val();
                    valueField = !flexygo.utils.isBlank(valueField) ? `${this.openQuote}${valueField}${this.closeQuote}` : null;
                    displayField = !flexygo.utils.isBlank(displayField) ? `${this.openQuote}${displayField}${this.closeQuote}` : null;
                    tableName = !flexygo.utils.isBlank(tableName) ? `${this.openQuote}${tableName}${this.closeQuote}` : null;
                    orderField = !flexygo.utils.isBlank(orderField) ? `${this.openQuote}${orderField}${this.closeQuote}` : null;
                    let sql = 'SELECT ';
                    sql += valueField;
                    if (valueField != displayField && displayField != null) {
                        sql += ', ' + displayField;
                    }
                    if (!flexygo.utils.isBlank(additionalFields)) {
                        additionalFields = additionalFields.split("|").map((field) => { return `${this.openQuote}${field}${this.closeQuote}`; }).join(", ");
                        sql += ', ' + additionalFields;
                    }
                    sql += ' \nFROM ' + tableName;
                    if (!flexygo.utils.isBlank(orderField)) {
                        sql += ' \nORDER BY ' + orderField;
                        if (orderSwitch) {
                            sql += ' DESC';
                        }
                        else {
                            sql += ' ASC';
                        }
                    }
                    return sql;
                }
                /**
               * Fill SQL sentence with combos data
               * @method fillSQLTextField
               */
                fillSQLTextField(sql) {
                    let me = $(this);
                    let valueField = me.find('[name="valuefield"]').val();
                    let displayField = me.find('[name="displayfield"]').val();
                    let tableName = me.find('[name="tablename"]').val();
                    let sqlSentence = me.find('[name ="sql-sentence"]');
                    if (tableName != null && valueField != null && displayField != null) {
                        sqlSentence.val(sql);
                    }
                }
                /**
               *
               * @method openWizard
               */
                openWizard(e) {
                    var _a;
                    let module = (_a = e.closest("flx-module")) !== null && _a !== void 0 ? _a : e.closest("flx-container");
                    let histObj = new flexygo.nav.FlexygoHistory();
                    histObj.targetid = 'modal1024x550';
                    let modal = flexygo.targets.createContainer(histObj, true, null, true);
                    if (!modal) {
                        return;
                    }
                    modal.empty();
                    modal.closest('.ui-dialog').find('.ui-dialog-title').html(flexygo.localization.translate('develop.modulemanager'));
                    modal.append('<flx-combobuilder></flx-combobuilder>');
                    let cb = modal.find('flx-combobuilder')[0];
                    cb.targetItem = module;
                    cb.sqlProperty = e.property;
                }
                /**
               *
               * @method validateRequired
               */
                validateRequired(...args) {
                    for (let i = 0; i < args.length; i++) {
                        if (args[i].val() == null || args[i].val() == '') {
                            flexygo.msg.error(args[i].attr('data-msg-required'));
                            return false;
                        }
                    }
                    return true;
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = $(this);
                    this.connected = true;
                    this.objectName = element.attr("ObjectName");
                    this.objectWhere = element.attr("ObjectWhere");
                    this.moduleName = element.attr("ModuleName");
                    this.init();
                }
                /**
                * Fires when the attribute value of the element is changed.
                * @method attributeChangedCallback
                */
                attributeChangedCallback(attrName, oldVal, newVal) {
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
                    if (this.connected && needInit) {
                        this.init();
                    }
                }
            }
            /**
            * Array of observed attributes. REQUIRED
            * @property observedAttributes {Array}
            */
            FlxComboBuilderElement.observedAttributes = ['ObjectName', 'ObjectWhere', 'ModuleName'];
            wc.FlxComboBuilderElement = FlxComboBuilderElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define("flx-combobuilder", flexygo.ui.wc.FlxComboBuilderElement);
//# sourceMappingURL=flx-combobuilder.js.map