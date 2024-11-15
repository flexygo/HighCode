/**
 * @namespace flexygo.ui.wc
 */
var flexygo;
(function (flexygo) {
    var ui;
    (function (ui) {
        var wc;
        (function (wc) {
            class ObjectTemplateDefault {
            }
            class ObjColData {
            }
            /**
            * Library for the FlxObjectManagerElement web component.
            *
            * @class FlxObjectManagerElement
            * @constructor
            * @return {FlxObjectManagerElement}
            */
            class FlxObjectManagerElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                    * Set when component is attached to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                    this.objectname = null;
                    this.collectionname = null;
                    this.offline = false;
                    this.appName = null;
                    this.wzButtons = null;
                    this.wzPanels = null;
                }
                connectedCallback() {
                    let element = $(this);
                    this.connected = true;
                    this.objectname = element.attr('ObjectName');
                    //Remove post calls
                    flexygo.events.off(this, "post", "executed", this.onViewChanged);
                    //Capture post calls
                    flexygo.events.on(this, "post", "executed", this.onViewChanged);
                    //Remove handler on DOM element remove
                    $(this).on("destroy", () => {
                        flexygo.events.off(this, "post", "executed", this.onViewChanged);
                    });
                    this.init();
                }
                observedAttributes() {
                    return [];
                }
                attributeChangedCallback(attrName, oldVal, newVal) {
                    if (!this.connected) {
                        return;
                    }
                }
                refresh() {
                    this.init();
                }
                onViewChanged(e) {
                    if (e.masterIdentity === 'saveView') {
                        $(this).find('[href="#tab4"]').click();
                    }
                }
                init() {
                    let me = $(this);
                    let defaults = (flexygo.history.get(me)) ? flexygo.history.get(me).defaults : null;
                    let objData;
                    if (defaults) {
                        this.offline = (defaults.offline) ? defaults.offline : false;
                        this.appName = (defaults.appName) ? defaults.appName : null;
                    }
                    if (!flexygo.utils.isBlank(this.objectname)) {
                        let obj = new flexygo.obj.Entity('sysObject', "Objects.ObjectName='" + this.objectname + "'");
                        objData = obj.getView('ObjColData', 0, 1, null, null, null)[0];
                        this.offline = objData.Offline;
                    }
                    let initHtml = '';
                    initHtml += '  <div id="bootstrap-wizard-1" class="col-sm-12 margin-top-m">';
                    initHtml += '      <ul class="wizardnodes">';
                    initHtml += '      </ul>';
                    initHtml += '      <div class="clearfix"></div>';
                    initHtml += '  </div>';
                    initHtml += '  <div class="tab-content">';
                    initHtml += '  </div>';
                    me.html(initHtml);
                    this.wzButtons = me.find('.wizardnodes');
                    this.wzPanels = me.find('.tab-content');
                    this.basicInformationPane();
                    this.objectPropertiesPane();
                    if (!this.offline) {
                        this.listSettingsPane();
                        this.filterSettingsPane();
                        this.listTemplateSettingsPane();
                        this.viewTemplateSettingsPane();
                        this.colPropertiesPane();
                    }
                    this.endPane();
                    if (flexygo.utils.isBlank(this.objectname)) {
                        $('[data-toggle="tab"]').on('click.disable', (ev) => {
                            ev.stopPropagation();
                            ev.preventDefault();
                        });
                    }
                    else {
                        me.find('[name="objectname"]').val(this.objectname);
                        me.find('.onlyNew').hide();
                        me.find('[name="collectionname"]')[0].setValue(objData.CollectionName);
                        this.collectionname = objData.CollectionName;
                        me.find('[name="objectdescrip"]')[0].setValue(objData.ObjectDescrip);
                        me.find('[name="collectiondescrip"]')[0].setValue(objData.CollectionDescrip);
                        me.find('[name="iconclass"]')[0].setValue(objData.ObjectIconName, objData.ObjectIconDescrip);
                        me.find('[name="coliconclass"]')[0].setValue(objData.CollectionIconName, objData.CollectionIconDescrip);
                        this.activeEditMode();
                    }
                    //Init validate options
                    $('#tab1 > form').validate({
                        unhighlight: (element, errorClass, validClass) => {
                            $(element).parent().addClass('has-success').removeClass('has-error');
                        },
                        highlight: (element, errorClass, validClass) => {
                            $(element).parent().removeClass('has-success').addClass('has-error');
                        },
                        errorPlacement: (error, element) => {
                            error.insertAfter($(element).parent()[0]);
                        },
                        errorClass: 'txt-danger'
                    });
                }
                basicInformationPane() {
                    let me = this;
                    let pnl = this.addPane('1', flexygo.localization.translate('objectmanager.basicinfo'));
                    let form = $('<form novalidate="novalidate"></form>');
                    pnl.append(form);
                    //Object form
                    let icn = '';
                    icn += '<flx-dbcombo onChange="$(\'#coliconclass\').val($(this).val());" class="size-l item-float" name="iconclass" id="iconclass" PlaceHolder="' + flexygo.localization.translate('objectmanager.selecticon') + '" PageSize="100" iconClass="flx-icon icon-image-26" ObjectName="sysObject" ViewName="iconsView" SQLValueField="IconName" SQLDisplayField="IconName"   required data-msg-required="' + flexygo.localization.translate('objectmanager.validicon') + '">';
                    icn += '  <template>';
                    icn += '<span class="txt-outstanding"> <i class="{{CSSClass}} icon-2x icon-margin" title="{{IconName}}" style="width: 20px"></i></span>';
                    //icn += '   <div class="icon-box">';
                    //icn += ' 	<div class="icon-margin">';
                    //icn += '	  <i class="{{CssClass}} icon-lg icon-zoom"></i>';
                    //icn += '	</div>';
                    //icn += '	<div> {{IconName}}</div>';
                    //icn += '  </div>';
                    icn += ' </template>';
                    icn += '</flx-dbcombo>';
                    let objName = $('<flx-text type="ident" name="objectname" iconClass="flx-icon icon-object" class="size-l ' + ((flexygo.utils.isBlank(this.objectname) && this.offline) ? 'offline-prefix' : '') + '" placeholder="' + flexygo.localization.translate('objectmanager.objectname') + '" required requiredmessage="' + flexygo.localization.translate('objectmanager.validobjectname') + '" ' + ((!flexygo.utils.isBlank(this.objectname) && this.offline) ? 'disabled' : '') + '> </flx-text>');
                    let objDescrip = $('<flx-text type="text" name="objectdescrip" iconClass="flx-icon icon-text" class="size-l" placeholder="' + flexygo.localization.translate('objectmanager.objectdescription') + '" required requiredmessage="' + flexygo.localization.translate('objectmanager.validobjectdescription') + '"> </flx-text>');
                    let objIconClass = $(icn);
                    let fila = $('<div class="row"><div class="col-sm-4"></div><div class="col-sm-4"></div><div class="col-sm-4 icombo"></div></div>');
                    fila.find('div:eq(0)').append(objName);
                    fila.find('div:eq(1)').append(objDescrip);
                    fila.find('div:eq(2)').append(objIconClass);
                    form.append(fila);
                    //Collection form
                    icn = '';
                    icn += '<flx-dbcombo class="size-l item-float" name="coliconclass" id="coliconclass" PlaceHolder="' + flexygo.localization.translate('objectmanager.selecticon') + '" PageSize="100" iconClass="flx-icon icon-image-26" ObjectName="sysObject" ViewName="iconsView" SQLValueField="IconName" SQLDisplayField="IconName"   required data-msg-required="' + flexygo.localization.translate('objectmanager.validicon') + '">';
                    icn += '  <template>';
                    icn += '<span class="txt-outstanding"> <i class="{{CSSClass}} icon-2x icon-margin" title="{{IconName}}" style="width: 20px"></i></span>';
                    //icn += '    <div class="icon-box">';
                    //icn += '	  <div class="icon-margin">';
                    //icn += '	    <i class="{{CssClass}} icon-lg icon-zoom"></i>';
                    //icn += '	  </div>';
                    //icn += '	  <div> {{IconName}}</div>';
                    //icn += '    </div>';
                    icn += '  </template>';
                    icn += '</flx-dbcombo>';
                    let colName = $('<flx-text type="ident" name="collectionname" iconClass="flx-icon icon-object" class="size-l ' + ((flexygo.utils.isBlank(this.objectname) && this.offline) ? 'offline-prefix' : '') + '" placeholder="' + flexygo.localization.translate('objectmanager.collectionname') + '" required requiredmessage="' + flexygo.localization.translate('objectmanager.validcollectionname') + '" ' + ((!flexygo.utils.isBlank(this.objectname) && this.offline) ? 'disabled' : '') + '> </flx-text>');
                    let colDescrip = $('<flx-text type="text" name="collectiondescrip" iconClass="flx-icon icon-text" class="size-l" placeholder="' + flexygo.localization.translate('objectmanager.collectiondescription') + '" required requiredmessage="' + flexygo.localization.translate('objectmanager.validocollectiondescription') + '"> </flx-text>');
                    let colIconClass = $(icn);
                    fila = $('<div class="row"><div class="col-sm-4"></div><div class="col-sm-4"></div><div class="col-sm-4 icombo"></div></div>');
                    fila.find('div:eq(0)').append(colName);
                    fila.find('div:eq(1)').append(colDescrip);
                    fila.find('div:eq(2)').append(colIconClass);
                    form.append(fila);
                    //Object source
                    fila = $('<div class="row onlyNew"><legend>' + flexygo.localization.translate('objectmanager.datasource') + '</legend></div>');
                    form.append(fila);
                    fila = $('<div class="row onlyNew">');
                    let btns = $('<div style="padding-bottom:10px;"><div class="btn-group datasource" role="origin" /></div>');
                    fila.append(btns);
                    btns = btns.find('.btn-group');
                    btns.append('<button type="button" class="btn activeTab" name="btn-table"><i class="flx-icon icon-listbox-2" />' + flexygo.localization.translate('objectmanager.fromtable') + '</button>');
                    btns.append('<button type="button" class="btn btn-default" name="btn-view"><i class="flx-icon icon-sql" /> ' + flexygo.localization.translate('objectmanager.fromview') + '</button>');
                    btns.append('<button type="button" class="btn btn-default" name="btn-newtable"><i class="flx-icon icon-sql" /> ' + flexygo.localization.translate('objectmanager.fromnewtable') + '</button>');
                    btns.append('<button type="button" class="btn btn-default" name="btn-datamodel"><i class="flx-icon icon-create_calendar" /> ' + flexygo.localization.translate('objectmanager.createdatamodel') + '</button>');
                    let combos = $('<div class="confValues"/>');
                    combos.append('<span><flx-dbcombo class="size-l" name="cnnstring" PlaceHolder="' + flexygo.localization.translate('objectmanager.selectcnnstring') + '" iconClass="flx-icon icon-sql" ObjectName="SysObject" ViewName="CnnStrings" SQLValueField="ConnStringid" SQLDisplayField="Descrip" required data-msg-required="' + flexygo.localization.translate('objectmanager.validselectcnnstring') + '"><template><span TypeId="{{DbTypeId}}">{{Descrip}}</span></template></flx-dbcombo></span>');
                    combos.append('<span><flx-dbcombo class="size-l" name="dbschema" id="dbschema" onChange="$(\'#tablename\').val(\'\');" PlaceHolder="' + flexygo.localization.translate('objectmanager.selectschema') + '" iconClass="flx-icon icon-sql" ObjectName="SysObject" SQLValueField="table_schema" SQLDisplayField="table_schema" required data-msg-required="' + flexygo.localization.translate('objectmanager.validschema') + '"/></span>');
                    combos.append('<span><flx-dbcombo class="size-l" name="tablename" id="tablename" PlaceHolder="' + flexygo.localization.translate('objectmanager.selecttable') + '" iconClass="flx-icon icon-sql" ObjectName="SysObject" SQLValueField="table_name" SQLDisplayField="table_name" data-msg-required="' + flexygo.localization.translate('objectmanager.validorigin') + '"></flx-dbcombo>');
                    combos.append('<span style="display:none"><flx-text type="ident" name="newtablename" iconClass="flx-icon icon-listbox-2" class="size-l" placeholder="' + flexygo.localization.translate('objectmanager.newtablename') + '" requiredmessage="' + flexygo.localization.translate('objectmanager.validnewtablename') + '"> </flx-text>');
                    combos.append('<span style="display:none"><flx-tag type="text" name="viewkeyfields" separator="|" iconClass="flx-icon icon-key" class="size-l" placeholder="' + flexygo.localization.translate('objectmanager.viewkeyfields') + '" requiredmessage="' + flexygo.localization.translate('objectmanager.validkeyfields') + '"> </flx-text><span>');
                    fila.append(combos);
                    form.append(fila);
                    form.find('.flx-icon.icon-image-26').on('click', (e) => {
                        let comboId = e.currentTarget.closest('flx-dbcombo').id;
                        flexygo.events.on(this, "entity", "selected", (e) => {
                            flexygo.events.off(this, "entity", "selected");
                            let entity = e.sender;
                            let config = entity.getConfig();
                            let value = entity.data[config.KeyFields[0]].Value;
                            value = entity.data["IconName"].Value;
                            let flxcombo;
                            flxcombo = form.find('#' + comboId)[0];
                            flxcombo.loadValues(0, false, true, value);
                            flxcombo.setValue(value);
                            flxcombo.triggerDependencies();
                            $(document).find('flx-search[objectname="sysicons"]').closest(".ui-dialog").remove();
                        });
                        flexygo.nav.openPage('search', 'sysicons', '', null, 'modal');
                        ;
                    });
                    pnl.closest('.tab-pane').find('h3').append('<button style="float:right" class="btn btn-default btn-info createObject">' + flexygo.localization.translate('objectmanager.savecontinue') + ' <i class="flx-icon icon-order-right-2" /></button>');
                    pnl.closest('.tab-pane').find('.createObject').on('click', (e) => {
                        //if ($('#tab1 > Form').valid()){
                        this.createObject();
                        //}
                    });
                    form.find('[name="cnnstring"]').on('change', (e) => {
                        let DbType = $(me).find('[name="cnnstring"] li.selected span').length > 0 ? $(me).find('[name="cnnstring"] li.selected span').attr("typeid").toLowerCase() : null;
                        DbType === 'sql' ? $(me).find('[name="dbschema"]').val('dbo') : $(me).find('[name="dbschema"]').val('');
                        $(me).find('[name="dbschema"]').attr('ViewName', "");
                        $(me).find('[name="dbschema"]').attr('CnnString', $(e.currentTarget).val());
                        $(me).find('[name="dbschema"]').attr('ViewName', me.GetViewNameByDbType('dbschema', ''));
                        $(me).find('[name="tablename"]').val('');
                        $(me).find('[name="tablename"]').attr('ViewName', "");
                        $(me).find('[name="tablename"]').attr('CnnString', $(e.currentTarget).val());
                        DbType === 'sql' && $(me).find('[name="dbschema"]').trigger("change");
                    });
                    form.find('[name="dbschema"]').on('change', (e) => {
                        var _a, _b;
                        $(me).find('[name="tablename"]').val('');
                        let DbType = (_b = (_a = $(this).find('[name="cnnstring"] li.selected span')) === null || _a === void 0 ? void 0 : _a.attr("typeId")) === null || _b === void 0 ? void 0 : _b.toLowerCase();
                        let columnSchema = DbType == 'sql' ? 'TABLE_SCHEMA' : 'OWNER';
                        $(me).find('[name="tablename"]').attr('additionalwhere', `${columnSchema} = '${$(e.currentTarget).val()}'`);
                        $(me).find('[name="tablename"]').attr('ViewName', me.GetViewNameByDbType('tablename', ''));
                    });
                    pnl.find('[role="origin"] button').on('click', (e) => {
                        $(me).find('[role="origin"] button.activeTab').removeClass('activeTab').addClass('btn-default');
                        let tab = $(e.currentTarget).attr('name').toLowerCase();
                        let tableNameElement = $(me).find('[name="tablename"]');
                        let viewKeyFieldsElement = $(me).find('[name="viewkeyfields"]');
                        let dbschemaElement = $(me).find('[name="dbschema"]');
                        let newTableNameElement = $(me).find('[name="newtablename"]');
                        switch (tab) {
                            case 'btn-table':
                                tableNameElement.closest('span').show();
                                newTableNameElement.closest('span').hide();
                                viewKeyFieldsElement.closest('span').hide();
                                dbschemaElement.attr('ViewName', me.GetViewNameByDbType('dbschema', tab));
                                tableNameElement.attr('ViewName', me.GetViewNameByDbType('tablename', tab));
                                tableNameElement.val("");
                                newTableNameElement.val("");
                                viewKeyFieldsElement.val("");
                                break;
                            case 'btn-view':
                                tableNameElement.closest('span').show();
                                newTableNameElement.closest('span').hide();
                                viewKeyFieldsElement.attr("Placeholder", flexygo.localization.translate('objectmanager.viewkeyfields'));
                                viewKeyFieldsElement.closest('span').show();
                                dbschemaElement.attr('ViewName', me.GetViewNameByDbType('dbschema', tab));
                                tableNameElement.attr('ViewName', me.GetViewNameByDbType('tablename', tab));
                                tableNameElement.val("");
                                newTableNameElement.val("");
                                viewKeyFieldsElement.val("");
                                break;
                            case 'btn-newtable':
                                tableNameElement.closest('span').hide();
                                newTableNameElement.closest('span').show();
                                viewKeyFieldsElement.attr("Placeholder", flexygo.localization.translate('objectmanager.tablekeyfields'));
                                viewKeyFieldsElement.closest('span').show();
                                tableNameElement.val("");
                                newTableNameElement.val("");
                                viewKeyFieldsElement.val("");
                                break;
                            case 'btn-datamodel':
                                flexygo.nav.openPageName('sys-page-datamodel', 'sysChatGPT_Settings', 'SettindId=\'DBHelper\'', null, 'sliderightx90%', false, $(this));
                                break;
                        }
                        $(e.currentTarget).addClass('activeTab');
                    });
                }
                GetViewNameByDbType(name, tab = "") {
                    var _a, _b, _c;
                    let DbType = (_b = (_a = $(this).find('[name="cnnstring"] li.selected span')) === null || _a === void 0 ? void 0 : _a.attr("typeId")) === null || _b === void 0 ? void 0 : _b.toLowerCase();
                    let ViewName = "";
                    if (name == 'dbschema') {
                        switch (DbType) {
                            case 'sql':
                                ViewName = "sys-DbSchemas";
                                break;
                            case 'oracle':
                                ViewName = "sys-DbSchemasOracle";
                                break;
                            default: break;
                        }
                        return ViewName;
                    }
                    let DbSchema = $(this).find('[name="dbschema"]')[0].getValue();
                    if (!tab) {
                        tab = (_c = $(this).find('.datasource.btn-group .activeTab')) === null || _c === void 0 ? void 0 : _c.attr('name').toLowerCase();
                    }
                    switch (tab) {
                        case 'btn-table':
                            switch (DbType) {
                                case 'sql':
                                    ViewName = "DataTables";
                                    break;
                                case 'oracle':
                                    ViewName = "DataTablesOracle";
                                    break;
                                default: break;
                            }
                            break;
                        case 'btn-view':
                            switch (DbType) {
                                case 'sql':
                                    ViewName = "DataViews";
                                    break;
                                case 'oracle':
                                    ViewName = "DataViewsOracle";
                                    break;
                                default: break;
                            }
                            break;
                        default:
                            break;
                    }
                    if (!flexygo.utils.isBlank(DbSchema)) {
                        return ViewName;
                    }
                    return '';
                }
                objectPropertiesPane() {
                    let pnl = this.addPane('2', flexygo.localization.translate('objectmanager.objectproperties'));
                    pnl.addClass('propertypanel');
                    pnl.closest('.tab-pane').find('h3').append('<button style="float:right" class="btn btn-info btnContinueList">' + flexygo.localization.translate('objectmanager.save') + ' <i class="flx-icon icon-order-right-2" /></button>');
                    pnl.closest('.tab-pane').find('.btnContinueList').on('click', (e) => {
                        $('[href="#tab3"]').click();
                    });
                }
                listSettingsPane() {
                    let pnl = this.addPane('3', flexygo.localization.translate('objectmanager.listsettings'));
                    pnl.addClass('listpanel');
                    pnl.find('.btnSaveList').on('click', (e) => {
                        flexygo.msg.alert('objectmanager.saved');
                        $('[href="#tab4"]').click();
                    });
                }
                filterSettingsPane() {
                    let pnl = this.addPane('4', flexygo.localization.translate('objectmanager.filtersettings'));
                    pnl.closest('.tab-pane').find('h3').append('<button style="float:right" class="btn btn-info btnContinueFilter">' + flexygo.localization.translate('objectmanager.continue') + ' <i class="flx-icon icon-order-right-2" /></button>');
                    pnl.addClass('filterpanel');
                    pnl.closest('.tab-pane').find('.btnContinueFilter').on('click', (e) => {
                        $('[href="#tab5"]').click();
                    });
                }
                listTemplateSettingsPane() {
                    let pnl = this.addPane('5', flexygo.localization.translate('objectmanager.listtemplatesettings'));
                    pnl.closest('.tab-pane').find('h3').append('<button style="float:right" class="btn btn-info btnContinueListTemplate">' + flexygo.localization.translate('objectmanager.continue') + '<i class="flx-icon icon-order-right-2" /></button>');
                    pnl.addClass('listtemplatepanel');
                    pnl.closest('.tab-pane').find('.btnContinueListTemplate').on('click', (e) => {
                        $('[href="#tab6"]').click();
                    });
                }
                viewTemplateSettingsPane() {
                    let pnl = this.addPane('6', flexygo.localization.translate('objectmanager.viewtemplatesettings'));
                    pnl.closest('.tab-pane').find('h3').append('<button style="float:right" class="btn btn-info btnContinueViewTemplate">' + flexygo.localization.translate('objectmanager.continue') + '<i class="flx-icon icon-order-right-2" /></button>');
                    pnl.addClass('viewtemplatepanel');
                    pnl.closest('.tab-pane').find('.btnContinueViewTemplate').on('click', (e) => {
                        $('[href="#tab7"]').click();
                    });
                }
                colPropertiesPane() {
                    let pnl = this.addPane('7', flexygo.localization.translate('objectmanager.colproperties'));
                    pnl.addClass('propertypanel');
                    pnl.closest('.tab-pane').find('h3').append('<button style="float:right" class="btn btn-info btnContinueList">' + flexygo.localization.translate('objectmanager.continue') + ' <i class="flx-icon icon-order-right-2" /></button>');
                    pnl.closest('.tab-pane').find('.btnContinueList').on('click', (e) => {
                        $('[href="#tab8"]').click();
                    });
                }
                endPane() {
                    let pnl = this.addPane('8', flexygo.localization.translate('objectmanager.end'));
                    pnl.append('<h2 class="text-center txt-outstanding"><strong>' + this.objectname + '</strong></h2>');
                    pnl.append('<h1 class="text-center txt-notify"><strong><i class="flx-icon icon-checked icon-lg"></i> ' + flexygo.localization.translate('objectmanager.objectcreated') + '</strong></h1>');
                    pnl.append('<h3 class="text-center">' + flexygo.localization.translate('objectmanager.selectoption') + '</strong></h3>');
                    let ul = $('<ul class="option-icons">');
                    ul.append($('<li><a href="#"><i class="flx-icon icon-listbox-2 icon-3x "/><br> ' + flexygo.localization.translate('objectmanager.listform') + '</a></li>').on('click', (e) => {
                        flexygo.nav.openPage('list', this.collectionname, null, null, 'popup', true, $(e.currentTarget));
                    }));
                    ul.append($('<li><a href="#"><i class="flx-icon icon-edit-in-new-window icon-3x "/><br> ' + flexygo.localization.translate('objectmanager.editform') + '</a></li>').on('click', (e) => {
                        flexygo.nav.openPage('edit', this.objectname, null, null, 'popup', true, $(e.currentTarget));
                    }));
                    ul.append($('<li><a href="#"><i class="flx-icon icon-settings icon-3x "/><br> ' + flexygo.localization.translate('objectmanager.objectconfig') + '</a></li>').on('click', (e) => {
                        flexygo.nav.openPage('edit', 'sysObject', flexygo.string.format("ObjectName='{0}'", this.objectname), null, 'popup', true, $(e.currentTarget));
                    }));
                    ul.append($('<li><a href="#"><i class="flx-icon icon-settings-2 icon-3x "/><br> ' + flexygo.localization.translate('objectmanager.collectionconfig') + '</a></li>').on('click', (e) => {
                        flexygo.nav.openPage('edit', 'sysObject', flexygo.string.format("ObjectName='{0}'", this.collectionname), null, 'popup', true, $(e.currentTarget));
                    }));
                    ul.append($('<li><a href="#"><i class="flx-icon icon-object-relations icon-3x "/><br> ' + flexygo.localization.translate('objectmanager.showrelations') + '</a></li>').on('click', (e) => {
                        let objectWhere = flexygo.string.format("[Objects_Objects].[ObjectName]='{0}' or [Objects_Objects].[ChildCollection]='{1}'", this.objectname, this.collectionname);
                        flexygo.nav.openPage('list', 'sysObjectRelations', objectWhere, JSON.stringify({ ChildCollection: this.collectionname }), 'popup', true, $(e.currentTarget));
                    }));
                    ul.append($('<li><a href="#"><i class="fa fa-image icon-3x "/><br> ' + flexygo.localization.translate('develop.imagemanager') + '</a></li>').on('click', (e) => {
                        let obj = new flexygo.obj.Entity(this.objectname);
                        let cnf = (obj.objectName) ? obj.getConfig() : null;
                        let defaults = {
                            'ObjectName': (cnf) ? cnf.ObjectName : '',
                            'KeyProperty': (cnf) ? (cnf.KeyFields.length === 1) ? cnf.KeyFields[0] : '' : '',
                        };
                        if (this.offline && cnf) {
                            defaults['ERPObjectName'] = cnf.ObjectName.replace('Offline_', '');
                        }
                        flexygo.nav.openPage('edit', 'sysObjectImageSetting', (cnf) ? "ObjectName = '" + cnf.ObjectName + "'" : null, defaults, 'modal900x500', false, $(this));
                    }));
                    ul.append($('<li><a href="#"><i class="flx-icon icon-document icon-3x "/><br> ' + flexygo.localization.translate('develop.documentmanager') + '</a></li>').on('click', (e) => {
                        let obj = new flexygo.obj.Entity(this.objectname);
                        let cnf = (obj.objectName) ? obj.getConfig() : null;
                        let defaults = {
                            'ObjectName': (cnf) ? cnf.ObjectName : '',
                            'ObjectPK': (cnf) ? (cnf.KeyFields.length === 1) ? cnf.KeyFields[0] : '' : '',
                        };
                        if (this.offline && cnf) {
                            defaults['ERPObjectName'] = cnf.ObjectName.replace('Offline_', '');
                        }
                        flexygo.nav.openPage('edit', 'Documents_Object_Config', (cnf) ? "ObjectName = '" + cnf.ObjectName + "'" : null, defaults, 'modal900x580', false, $(this));
                    }));
                    pnl.append(ul);
                }
                addPane(index, name) {
                    let btn = $('<li data-target="#step' + index + '" class=""><a href="#tab' + index + '" data-toggle="tab" aria-expanded="false" > <span class="step">' + index + '</span> <span class="title">' + name + '</span> </a></li>');
                    let pnl = $('<div class="tab-pane" id="tab' + index + '"><br /><h3><strong>Step ' + index + '</strong> - ' + name + '</h3><div class="content"></div></div>');
                    if (index == '1') {
                        btn.addClass('complete active');
                        pnl.addClass('active');
                    }
                    this.wzButtons.append(btn);
                    this.wzPanels.append(pnl);
                    return pnl.find('.content');
                }
                activeEditMode() {
                    let me = $(this);
                    me.find('.onlyNew').hide();
                    $('[data-toggle="tab"]').off('click.disable');
                    $('[href="#tab2"]').on('click', event => {
                        const step_components = `<flx-propertymanager ObjectName="${this.objectname}" class="col-8" ></flx-propertymanager>
                    <flx-propertywizard ObjectName="${this.objectname}" class="col-4"></flx-propertywizard>`;
                        this.querySelector('.propertypanel').innerHTML = step_components;
                    });
                    $('[href="#tab3"]').on('click', (e) => {
                        me.find('.listpanel').html('<flx-viewmanager ObjectName="' + this.objectname + '" ></flx-viewmanager>');
                    });
                    $('[href="#tab4"]').on('click', (e) => {
                        me.find('.filterpanel').html('<flx-filtermanager objectname="' + this.collectionname + '"></flx-filtermanager>');
                    });
                    $('[href="#tab5"]').on('click', (e) => {
                        if (this.existTemplate('list')) {
                            this.createEditForm(me.find('.listtemplatepanel'), 'sysObjectTemplate', 'Objects_Templates.ObjectName=\'' + this.objectname + '\' and Objects_Templates.IsDefault=1 and Objects_Templates.TypeId=\'list\'');
                        }
                        else {
                            this.createListTemplateSamplesForm(me.find('.listtemplatepanel'), 'sysTemplateSamples', "Objects_Templates_Samples.TypeId = 'list'", JSON.stringify({ object: this.objectname, viewname: '', option: 'listtemplatepanel' }));
                        }
                    });
                    $('[href="#tab6"]').on('click', (e) => {
                        if (this.existTemplate('view')) {
                            this.createEditForm(me.find('.viewtemplatepanel'), 'sysObjectTemplate', 'Objects_Templates.ObjectName=\'' + this.objectname + '\' and Objects_Templates.IsDefault=1 and Objects_Templates.TypeId=\'view\'');
                        }
                        else {
                            this.createListTemplateSamplesForm(me.find('.viewtemplatepanel'), 'sysTemplateSamples', "Objects_Templates_Samples.TypeId = 'view'", JSON.stringify({ object: this.objectname, viewname: '', option: 'viewtemplatepanel' }));
                        }
                    });
                    $('[href="#tab7"]').on('click', (e) => {
                        me.find('.propertypanel').html('<flx-propertymanager mode="list" ObjectName="' + this.collectionname + '" ></flx-propertymanager>');
                    });
                }
                createEditForm(placeHolder, ObjectName, ObjectWhere) {
                    let editModuleName = 'sysmod-edit-generic';
                    let containerTemplate = '<div class="cntBody nopadding size-xs"></div><div class="cntBodyFooter"></div>';
                    let container = $('<flx-module class="nodeEdit"/>').html(containerTemplate).attr('modulename', editModuleName).attr('type', 'flx-edit').addClass('empty');
                    placeHolder.empty();
                    placeHolder.append(container);
                    let module = $('<flx-edit />').attr('ObjectName', ObjectName).attr('ObjectWhere', ObjectWhere).attr('modulename', editModuleName);
                    container.find('.cntBody').append(module);
                    let ctrl = container[0];
                    ctrl.moduleName = editModuleName;
                    ctrl.init();
                }
                existTemplate(type) {
                    let obj = new flexygo.obj.Entity('sysObjectTemplates', 'Objects_Templates.ObjectName=\'' + this.objectname + '\' and Objects_Templates.IsDefault=1 and Objects_Templates.TypeId=\'' + type + '\'');
                    obj.read();
                    if (flexygo.utils.isBlank(obj.data['TemplateId'].Value)) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                createListTemplateSamplesForm(placeHolder, ObjectName, ObjectWhere, Defaults) {
                    let listModuleName = 'sysmod-list-templateSamples';
                    let searchModuleName = 'sysmod-search-templateSamples';
                    let containerTemplate = '<div class="cntBody nopadding"></div><div class="cntBodyFooter"></div>';
                    let searchContainerTemplate = '<div class="cntBody nopadding"></div>';
                    let container = $('<flx-module/>').html(containerTemplate).attr('modulename', listModuleName).attr('type', 'flx-list').attr('objectdefaults', Defaults).addClass('empty');
                    let searchContainer = $('<flx-module/>').html(searchContainerTemplate).attr('modulename', searchModuleName).attr('type', 'flx-genericsearch').addClass('empty margin-top-xl');
                    placeHolder.empty();
                    placeHolder.append(searchContainer);
                    placeHolder.append(container);
                    let module = $('<flx-list />').attr('ObjectName', ObjectName).attr('ObjectWhere', ObjectWhere).attr('modulename', listModuleName);
                    let searchModule = $('<flx-genericsearch />').attr('ObjectName', ObjectName).attr('gridid', 'sysmod-list-templateSamples').attr('modulename', searchModuleName);
                    container.find('.cntBody').append(module);
                    searchContainer.find('.cntBody').append(searchModule);
                    let ctrl = container[0];
                    ctrl.moduleName = listModuleName;
                    ctrl.objectdefaults = Defaults;
                    ctrl.init();
                    let searchCtrl = searchContainer[0];
                    searchCtrl.moduleName = searchModuleName;
                    searchCtrl.init();
                }
                validateRequired() {
                    let me = $(this);
                    if (me.find('[name="objectname"]')[0].getValue() == null || me.find('[name="objectname"]')[0].getValue() == '') {
                        flexygo.msg.error('Object Name required.');
                        return false;
                    }
                    if (me.find('[name="collectionname"]')[0].getValue() == null || me.find('[name="collectionname"]')[0].getValue() == '') {
                        flexygo.msg.error('Collection Name required.');
                        return false;
                    }
                    if (me.find('[name="collectiondescrip"]')[0].getValue() == null || me.find('[name="collectiondescrip"]')[0].getValue() == '') {
                        flexygo.msg.error('CollectionDescrip required.');
                        return false;
                    }
                    if (me.find('[name="iconclass"]')[0].getValue() == null || me.find('[name="iconclass"]')[0].getValue() == '') {
                        flexygo.msg.error('Object Icon Class required.');
                        return false;
                    }
                    if (me.find('[name="coliconclass"]')[0].getValue() == null || me.find('[name="coliconclass"]')[0].getValue() == '') {
                        flexygo.msg.error('Collection Icon Class required.');
                        return false;
                    }
                    if (!this.objectname) {
                        if (me.find('[name="cnnstring"]')[0].getValue() == null || me.find('[name="cnnstring"]')[0].getValue() == '') {
                            flexygo.msg.error('Connection String required.');
                            return false;
                        }
                    }
                    return true;
                }
                createObject() {
                    let me = $(this);
                    let method = 'updateObject';
                    let arr = [];
                    if (!this.validateRequired()) {
                        return;
                    }
                    arr.push({ key: 'ObjectName', value: me.find('[name="objectname"]')[0].getValue() });
                    arr.push({ key: 'CollectionName', value: me.find('[name="collectionname"]')[0].getValue() });
                    arr.push({ key: 'ObjectDescrip', value: me.find('[name="collectiondescrip"]')[0].getValue() });
                    arr.push({ key: 'CollectionDescrip', value: me.find('[name="collectiondescrip"]')[0].getValue() });
                    arr.push({ key: 'ObjectParsedDescrip', value: me.find('[name="objectdescrip"]')[0].getValue() });
                    arr.push({ key: 'ObjectIconName', value: me.find('[name="iconclass"]')[0].getValue() });
                    arr.push({ key: 'CollectionIconName', value: me.find('[name="coliconclass"]')[0].getValue() });
                    if (!this.objectname) {
                        method = 'createObject';
                        arr.push({ key: 'ConnectionStringId', value: me.find('[name="cnnstring"]')[0].getValue() });
                        arr.push({ key: 'Schema', value: me.find('[name="dbschema"]')[0].getValue() });
                        arr.push({ key: 'OriginName', value: me.find('[name="tablename"]')[0].getValue() });
                        arr.push({ key: 'NewOriginName', value: me.find('[name="newtablename"]')[0].getValue() });
                        arr.push({ key: 'ViewKeys', value: me.find('[name="viewkeyfields"]')[0].getValue() });
                        arr.push({ key: 'Offline', value: this.offline });
                        arr.push({ key: 'AppName', value: this.appName });
                    }
                    let params = new flexygo.api.sys.updateObjectParams();
                    params.StoredParams = arr;
                    flexygo.ajax.post('~/api/Sys', method, params, (response) => {
                        if (response && response[0]) {
                            this.objectname = response[0].objectname; //(<any>me).find('[name="objectname"]')[0].getValue();
                            this.collectionname = response[0].collectionname; //(<any>me).find('[name="collectionname"]')[0].getValue();
                            flexygo.msg.info('Object saved :)');
                            me.find('.onlyNew').hide();
                            this.activeEditMode();
                            me.find('[href="#tab2"]').click();
                            let obj = new flexygo.obj.Entity('sysObject', `objectName='${this.objectname}'`);
                            obj.read();
                            let ev = {
                                class: "entity",
                                type: "inserted",
                                sender: obj,
                                masterIdentity: obj.objectName,
                                detailIdentity: obj.objectWhere
                            };
                            flexygo.events.trigger(ev, me);
                        }
                    });
                }
            }
            wc.FlxObjectManagerElement = FlxObjectManagerElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-objectmanager', flexygo.ui.wc.FlxObjectManagerElement);
//# sourceMappingURL=flx-objectmanager.js.map