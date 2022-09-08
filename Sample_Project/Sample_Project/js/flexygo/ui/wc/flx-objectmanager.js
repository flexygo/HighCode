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
                static get observedAttributes() {
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
                        this.displaySettingsPane();
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
                    let me = $(this);
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
                    let btns = $('<div style="padding-bottom:10px;"><div class="btn-group" role="origin" /></div>');
                    fila.append(btns);
                    btns = btns.find('.btn-group');
                    btns.append('<button type="button" class="btn btn-success" name="btn-table"><i class="flx-icon icon-listbox-2" />' + flexygo.localization.translate('objectmanager.fromtable') + '</button>');
                    btns.append('<button type="button" class="btn btn-default" name="btn-view"><i class="flx-icon icon-sql" /> ' + flexygo.localization.translate('objectmanager.fromview') + '</button>');
                    btns.append('<button type="button" class="btn btn-default" name="btn-newtable"><i class="flx-icon icon-sql" /> ' + flexygo.localization.translate('objectmanager.fromnewtable') + '</button>');
                    fila.append('<span><flx-dbcombo class="size-l" name="cnnstring" onChange="$(\'#tablename\').val(\'\');" PlaceHolder="' + flexygo.localization.translate('objectmanager.selectcnnstring') + '" iconClass="flx-icon icon-sql" ObjectName="SysObject" ViewName="CnnStrings" SQLValueField="ConnStringid" SQLDisplayField="Descrip" required data-msg-required="' + flexygo.localization.translate('objectmanager.validselectcnnstring') + '"></flx-dbcombo></span>');
                    fila.append('<span><flx-dbcombo class="size-l" name="tablename" id="tablename" PlaceHolder="' + flexygo.localization.translate('objectmanager.selecttable') + '" iconClass="flx-icon icon-sql" ObjectName="SysObject" ViewName="DataTables" SQLValueField="table_name" SQLDisplayField="table_name" data-msg-required="' + flexygo.localization.translate('objectmanager.validorigin') + '"></flx-dbcombo>');
                    fila.append('<span style="display:none"><flx-text type="ident" name="newtablename" iconClass="flx-icon icon-listbox-2" class="size-l" placeholder="' + flexygo.localization.translate('objectmanager.newtablename') + '" requiredmessage="' + flexygo.localization.translate('objectmanager.validnewtablename') + '"> </flx-text>');
                    fila.append('<span style="display:none"><flx-tag type="text" name="viewkeyfields" separator="|" iconClass="flx-icon icon-key" class="size-l" placeholder="' + flexygo.localization.translate('objectmanager.viewkeyfields') + '" requiredmessage="' + flexygo.localization.translate('objectmanager.validviewkeyfields') + '"> </flx-text><span>');
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
                        me.find('[name="tablename"]').attr('CnnString', $(e.currentTarget).val());
                    });
                    pnl.find('[role="origin"] button').on('click', (e) => {
                        me.find('[role="origin"] button.btn-success').removeClass('btn-success').addClass('btn-default');
                        switch ($(e.currentTarget).attr('name').toLowerCase()) {
                            case 'btn-table':
                                me.find('[name="tablename"]').parent().show();
                                me.find('[name="newtablename"]').parent().hide();
                                me.find('[name="viewkeyfields"]').parent().hide();
                                me.find('[name="tablename"]').attr('ViewName', 'DataTables');
                                me.find('[name="tablename"]').val("");
                                me.find('[name="newtablename"]').val("");
                                me.find('[name="viewkeyfields"]').val("");
                                break;
                            case 'btn-view':
                                me.find('[name="tablename"]').parent().show();
                                me.find('[name="newtablename"]').parent().hide();
                                me.find('[name="viewkeyfields"]').parent().show();
                                me.find('[name="tablename"]').attr('ViewName', 'DataViews');
                                me.find('[name="tablename"]').val("");
                                me.find('[name="newtablename"]').val("");
                                me.find('[name="viewkeyfields"]').val("");
                                break;
                            case 'btn-newtable':
                                me.find('[name="tablename"]').parent().hide();
                                me.find('[name="newtablename"]').parent().show();
                                me.find('[name="viewkeyfields"]').parent().show();
                                me.find('[name="tablename"]').val("");
                                me.find('[name="newtablename"]').val("");
                                me.find('[name="viewkeyfields"]').val("");
                                break;
                        }
                        $(e.currentTarget).addClass('btn-success');
                    });
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
                displaySettingsPane() {
                    let me = $(this);
                    let pnl = this.addPane('5', flexygo.localization.translate('objectmanager.displaysettings'));
                    pnl.closest('.tab-pane').find('h3').append('<button style="float:right" class="btn btn-info btnContinueEnd">' + flexygo.localization.translate('objectmanager.continue') + '<i class="flx-icon icon-order-right-2" /></button>');
                    pnl.closest('.tab-pane').find('.btnContinueEnd').on('click', (e) => {
                        $('[href="#tab6"]').click();
                    });
                    let btns = $('<div style="padding-bottom:10px;"><div class="btn-group" role="displayType" /></div>');
                    pnl.append(btns);
                    btns = btns.find('.btn-group');
                    btns.append('<button type="button" class="btn btn-success" name="btn-list"><i class="flx-icon icon-listbox-2" /> ' + flexygo.localization.translate('objectmanager.listtemplate') + '</button>');
                    btns.append('<button style="display:none" type="button" class="btn btn-default" name="btn-edit"><i class="flx-icon icon-edit-3" /> ' + flexygo.localization.translate('objectmanager.edittemplate') + '</button>');
                    btns.append('<button type="button" class="btn btn-default" name="btn-view"><i class="flx-icon icon-views" /> ' + flexygo.localization.translate('objectmanager.viewtemplate') + '</button>');
                    pnl.append('<div class="contentPane" />');
                    pnl.find('[role="displayType"] button').on('click', (e) => {
                        me.find('[role="displayType"] button.btn-success').removeClass('btn-success').addClass('btn-default');
                        let btn = $(e.currentTarget);
                        let defString = null;
                        switch (btn.attr('name').toLowerCase()) {
                            case 'btn-list':
                                defString = { Templateid: this.objectname + 'DefaultList', ObjectName: this.objectname, TypeId: 'list', Descrip: this.objectname + ' Default List', IsDefault: true };
                                this.createEditForm(pnl.find('.contentPane'), 'sysObjectTemplate', 'ObjectName=\'' + this.objectname + '\' and IsDefault=1 and TypeId=\'list\'', JSON.stringify(defString));
                                break;
                            case 'btn-edit':
                                defString = { Templateid: this.objectname + 'DefaultEdit', ObjectName: this.objectname, TypeId: 'edit', Descrip: this.objectname + ' Default Edit', IsDefault: true };
                                this.createEditForm(pnl.find('.contentPane'), 'sysObjectTemplate', 'ObjectName=\'' + this.objectname + '\' and IsDefault=1 and TypeId=\'edit\'', JSON.stringify(defString));
                                break;
                            case 'btn-view':
                                defString = { Templateid: this.objectname + 'DefaultView', ObjectName: this.objectname, TypeId: 'view', Descrip: this.objectname + ' Default View', IsDefault: true };
                                this.createEditForm(pnl.find('.contentPane'), 'sysObjectTemplate', 'ObjectName=\'' + this.objectname + '\' and IsDefault=1 and TypeId=\'view\'', JSON.stringify(defString));
                                break;
                        }
                        btn.addClass('btn-success');
                    });
                }
                colPropertiesPane() {
                    let pnl = this.addPane('6', flexygo.localization.translate('objectmanager.colproperties'));
                    pnl.addClass('propertypanel');
                    pnl.closest('.tab-pane').find('h3').append('<button style="float:right" class="btn btn-info btnContinueList">' + flexygo.localization.translate('objectmanager.continue') + ' <i class="flx-icon icon-order-right-2" /></button>');
                    pnl.closest('.tab-pane').find('.btnContinueList').on('click', (e) => {
                        $('[href="#tab7"]').click();
                    });
                }
                endPane() {
                    let pnl = this.addPane('7', flexygo.localization.translate('objectmanager.end'));
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
                    $('[href="#tab2"]').on('click', (e) => {
                        me.find('.propertypanel').html('<flx-propertymanager ObjectName="' + this.objectname + '" ></flx-propertymanager>');
                    });
                    $('[href="#tab3"]').on('click', (e) => {
                        me.find('.listpanel').html('<flx-viewmanager ObjectName="' + this.objectname + '" ></flx-viewmanager>');
                    });
                    $('[href="#tab4"]').on('click', (e) => {
                        me.find('.filterpanel').html('<flx-filtermanager objectname="' + this.collectionname + '"></flx-filtermanager>');
                    });
                    $('[href="#tab5"]').on('click', (e) => {
                        if (me.find('#tab5 flx-module').length == 0) {
                            me.find('[name="btn-list"]').click();
                        }
                    });
                    $('[href="#tab6"]').on('click', (e) => {
                        me.find('.propertypanel').html('<flx-propertymanager mode="list" ObjectName="' + this.collectionname + '" ></flx-propertymanager>');
                    });
                }
                createEditForm(placeHolder, ObjectName, ObjectWhere, Defaults) {
                    let editModuleName = 'sysmod-edit-generic';
                    let containerTemplate = '<div class="cntBody nopadding size-xs"></div><div class="cntBodyFooter"></div>';
                    let container = $('<flx-module class="nodeEdit"/>').html(containerTemplate).attr('modulename', editModuleName).attr('type', 'flx-edit').addClass('empty');
                    placeHolder.empty();
                    placeHolder.append(container);
                    let module = $('<flx-edit />').attr('ObjectName', ObjectName).attr('ObjectWhere', ObjectWhere).attr('Defaults', Defaults).attr('modulename', editModuleName);
                    container.find('.cntBody').append(module);
                    let ctrl = container[0];
                    ctrl.moduleName = editModuleName;
                    ctrl.canCollapse = true;
                    ctrl.canEnlarge = true;
                    ctrl.canRefresh = true;
                    //ctrl.canClose = false;
                    ctrl.canConfig = false;
                    ctrl.init();
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
                            flexygo.events.trigger(ev);
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