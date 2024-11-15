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
            * Library for the flx-dependencymanager web component.
            *
            * @class FlxDependencyManagerElement
            * @constructor
            * @return {FlxDependencyManagerElement} .
            */
            class FlxDependencyManagerElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                   * Set when component is attached to DOM
                   * @property connected {boolean}
                   */
                    this.connected = false;
                    this.template = null;
                    this.objectname = null;
                    this.filter = null;
                    this.searchId = null;
                    this.reportname = null;
                    this.processname = null;
                    this.propertyname = null;
                    this.constringItems = null;
                    this.cusControlsItems = null;
                    this.propItems = [];
                    this.mode = null;
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = $(this);
                    this.connected = true;
                    this.loadConnStrings();
                    this.loadCusControls();
                    this.filter = element.attr('IsFilter');
                    if (this.filter) {
                        this.template = this.getFilterTemplate();
                    }
                    else {
                        this.template = this.getTemplate();
                    }
                    this.objectname = element.attr('ObjectName');
                    this.reportname = element.attr("ReportName");
                    this.processname = element.attr("ProcessName");
                    this.propertyname = element.attr('PropertyName');
                    this.searchId = element.attr('SearchId');
                    let mode = 'object';
                    if (this.reportname) {
                        mode = 'report';
                    }
                    if (this.processname) {
                        mode = 'process';
                    }
                    this.mode = mode;
                    element.empty();
                    this.init();
                }
                /**
               * Fires when the attribute value of the element is changed.
               * @method attributeChangedCallback
               */
                attributeChangedCallback(attrName, oldVal, newVal) {
                    if (!this.connected) {
                        return false;
                    }
                    if (attrName.toLowerCase() == 'objectname' && newVal && newVal != '') {
                        this.objectname = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() == 'reportname' && newVal && newVal != '') {
                        this.reportname = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() == 'processname' && newVal && newVal != '') {
                        this.processname = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() == 'propertyname' && newVal && newVal != '') {
                        this.propertyname = newVal;
                        this.refresh();
                    }
                }
                /**
               * Init the webcomponent.
               * @method init
               */
                init() {
                    this.refresh();
                }
                /**
             * Refresh de webcomponent.
             * @method refresh
             */
                refresh() {
                    let me = $(this);
                    me.empty();
                    if (this.filter) {
                        this.loadFilterTabs();
                    }
                    else {
                        this.loadTabs();
                    }
                    this.loadProps();
                    me.find(".pnlProperties").sortable();
                }
                /**
              * RefrLoads connstrings for combo.
              * @method loadConnStrings
              */
                loadConnStrings() {
                    let obj = new flexygo.obj.Entity('sysObject');
                    this.constringItems = obj.getView('CnnStrings');
                }
                /**
              * RefrLoads CusControls for combo.
              * @method loadCusControls
              */
                loadCusControls() {
                    let obj = new flexygo.obj.Entity('SysCustomProperty');
                    this.cusControlsItems = obj.getView('SysCustomPropertyDefaultList');
                }
                /**
                * RefrLoads tabs.
                * @method loadTabs
                */
                loadTabs() {
                    let me = $(this);
                    let isCollection = false;
                    if (!flexygo.utils.isBlank(this.objectname)) {
                        let obj = new flexygo.obj.Entity('sysObject', `ObjectName='${this.objectname}'`);
                        obj.read();
                        isCollection = obj.data.Iscollection.Value;
                    }
                    me.append('<div class="pnl-container"><div><ul class="pnlNavigate nav nav-tabs" /></div><div class="pnlNavigate-actions"></div></div>');
                    me.find('.pnlNavigate').append('<li class="active small-width" data-link="order-controls"><a href="#"><i class="flx-icon icon-bullet-number-list"></i><span class="ellipsis">' + flexygo.localization.translate('dependecymanager.sort') + '</span></a></li>');
                    me.find('.pnlNavigate').append('<li class="small-width" data-link="value-controls"><a href="#"><i class="flx-icon icon-tag"></i><span class="ellipsis"> ' + flexygo.localization.translate('dependecymanager.valuedep') + '</span></a></li>');
                    me.find('.pnlNavigate').append('<li class="small-width" data-link="class-controls"><a href="#"><i class="flx-icon icon-custom"></i><span class="ellipsis"> ' + flexygo.localization.translate('dependecymanager.classdep') + '</span></a></li>');
                    me.find('.pnlNavigate').append('<li data-link="combo-controls"><a href="#"><i class="flx-icon icon-listbox-2"></i><span class="ellipsis"> ' + flexygo.localization.translate('dependecymanager.combodep') + '</span></a></li>');
                    me.find('.pnlNavigate').append('<li data-link="enabled-controls"><a href="#"><i class="flx-icon icon-lock-1"></i><span class="ellipsis"> ' + flexygo.localization.translate('dependecymanager.enabledep') + '</span></a></li>');
                    me.find('.pnlNavigate').append('<li class="small-width" data-link="visible-controls"><a href="#"><i class="flx-icon icon-eye"></i><span class="ellipsis"> ' + flexygo.localization.translate('dependecymanager.visibledep') + '</span></a></li>');
                    me.find('.pnlNavigate').append('<li class="small-width" data-link="required-controls"><a href="#"><i class="flx-icon icon-checked"></i><span class="ellipsis"> ' + flexygo.localization.translate('dependecymanager.requireddep') + '</span></a></li>');
                    if (!isCollection)
                        me.find('.pnlNavigate').append('<li class="small-width" data-link="label-controls"><a href="#"><i class="flx-icon icon-text-editor"></i><span class="ellipsis"> ' + flexygo.localization.translate('flxedit.label') + '</span></a></li>');
                    me.find('.pnlNavigate').append('<li data-link="customControl-controls"><a href="#"><i class="flx-icon icon-wizard-1"></i><span class="ellipsis"> ' + flexygo.localization.translate('dependecymanager.CustomProperty') + '</span></a></li>');
                    me.find('.pnlNavigate').append('<li data-link="cnnstrings-controls"><a href="#"><i class="flx-icon icon-database-configuration"></i><span class="ellipsis"> ' + flexygo.localization.translate('dependecymanager.connectionstrings') + '</span></a></li>');
                    me.find('.pnlNavigate-actions').append('<button id="relateddepbtn" class="btn btn-default bg-outstanding"><i class="flx-icon icon-properties-relations"></i> ' + flexygo.localization.translate('dependecymanager.relateddep') + '</button>');
                    me.find('.pnlNavigate-actions').append('<button id="savedepsbtn" class="btn btn-default bg-info"><i class="flx-icon icon-save"></i> ' + flexygo.localization.translate('dependecymanager.save') + '</button>');
                    //me.find('.pnlNavigate-actions').append('<li data-link="related-Dependency" class="margin-left-m"><button id="relateddepbtn" class="btn btn-default bg-outstanding"><i class="flx-icon icon-properties-relations"></i> ' + flexygo.localization.translate('dependecymanager.relateddep') + '</button></a></li>');
                    //me.find('.pnlNavigate-actions').append('<li data-link="save-Module" class="pull-right"><button id="savedepsbtn" class="btn btn-default bg-info"><i class="flx-icon icon-save"></i> ' + flexygo.localization.translate('dependecymanager.save') + '</button></a></li>');
                    me.find('.pnlNavigate>li>a').on('click', (ev) => {
                        ev.stopPropagation();
                        ev.preventDefault();
                        let itm = $(ev.currentTarget);
                        me.find('.pnlNavigate>li').removeClass('active');
                        itm.parent().addClass('active');
                        me.find('.ctl-panel').hide();
                        me.find('.' + itm.parent().attr('data-link')).show();
                        if (itm.parent().attr('data-link') == 'order-controls') {
                            me.find(".pnlProperties").sortable('enable');
                            me.find(".pnlProperties").disableSelection();
                        }
                        else {
                            me.find(".pnlProperties").sortable('disable');
                            me.find(".pnlProperties").enableSelection();
                        }
                    });
                    me.find('.pnl-container>.pnlNavigate-actions>button#savedepsbtn').on('click', (e) => {
                        this.save();
                    });
                    me.find('.pnl-container>.pnlNavigate-actions>button#relateddepbtn').on('click', (e) => {
                        switch (this.mode) {
                            case 'process':
                                flexygo.nav.openPageName('sys_process_param_related_dependencies', 'sysProcessParam', 'Processes_Params.ProcessName = \'' + this.processname + '\' And Processes_Params.ParamName = \'' + this.propertyname + '\'', '{\'ProcessName\':\'' + this.processname + '\',\'ParamName\':\'' + this.propertyname + '\'}', 'slide', false, $(this));
                                break;
                            case 'report':
                                flexygo.nav.openPageName('sys_report_param_related_dependencies', 'sysReportParam', 'Reports_Params.ReportName = \'' + this.reportname + '\' And Reports_Params.ParamName = \'' + this.propertyname + '\'', '{\'ReportName\':\'' + this.reportname + '\',\'ParamName\':\'' + this.propertyname + '\'}', 'slide', false, $(this));
                                break;
                            default:
                                flexygo.nav.openPageName('sys_property_related_dependencies', 'sysObjectProperty', 'Objects_Properties.ObjectName = \'' + this.objectname + '\' And Objects_Properties.PropertyName = \'' + this.propertyname + '\'', '{\'ObjectName\':\'' + this.objectname + '\',\'PropertyName\':\'' + this.propertyname + '\'}', 'slide', false, $(this));
                                break;
                        }
                    });
                }
                /**
               * RefrLoads tabs.
               * @method loadFilterTabs
               */
                loadFilterTabs() {
                    let me = $(this);
                    me.append('<div class="pnl-container"><div><ul class="pnlNavigate nav nav-tabs" /></div><div class="pnlNavigate-actions"></div></div>');
                    //me.append('<ul class="pnlNavigate nav nav-tabs" />');
                    me.find('.pnlNavigate').append('<li class="active" data-link="combo-controls"><a href="#"><i class="flx-icon icon-listbox-2"></i><span class="ellipsis"> ' + flexygo.localization.translate('dependecymanager.combodep') + '</span></a></li>');
                    me.find('.pnlNavigate').append('<li data-link="order-controls"><a href="#"><i class="flx-icon icon-bullet-number-list"></i><span class="ellipsis"> ' + flexygo.localization.translate('dependecymanager.sort') + '</span></a></li>');
                    me.find('.pnlNavigate-actions').append('<button id="relateddepbtn" class="btn btn-default bg-outstanding"><i class="flx-icon icon-properties-relations"></i> ' + flexygo.localization.translate('dependecymanager.relateddep') + '</button>');
                    me.find('.pnlNavigate-actions').append('<button id="savedepsbtn" class="btn btn-default bg-info"><i class="flx-icon icon-save"></i> ' + flexygo.localization.translate('dependecymanager.save') + '</button>');
                    me.find('.pnlNavigate>li>a').on('click', (ev) => {
                        ev.stopPropagation();
                        ev.preventDefault();
                        let itm = $(ev.currentTarget);
                        me.find('.pnlNavigate>li').removeClass('active');
                        itm.parent().addClass('active');
                        me.find('.ctl-panel').hide();
                        me.find('.' + itm.parent().attr('data-link')).show();
                        if (itm.parent().attr('data-link') == 'order-controls') {
                            me.find(".pnlProperties").sortable('enable');
                            me.find(".pnlProperties").disableSelection();
                        }
                        else {
                            me.find(".pnlProperties").sortable('disable');
                            me.find(".pnlProperties").enableSelection();
                        }
                    });
                    me.find('.pnl-container>.pnlNavigate-actions>button#savedepsbtn').on('click', (e) => {
                        this.save();
                        flexygo.nav.execProcess('ReloadQuietCache', '', '', null, null, 'current', false, $(this));
                    });
                    me.find('.pnl-container>.pnlNavigate-actions>button#relateddepbtn').on('click', (e) => {
                        flexygo.nav.openPageName('sys_filter_property_related_dependencies', 'sysGenericSearchProperty', `Objects_Search_Properties.ObjectName = '${this.objectname}' And Objects_Search_Properties.PropertyName = '${this.propertyname}' And Objects_Search_Properties.SearchId = '${this.searchId}'`, `{ 'ObjectName': '${this.objectname}', 'PropertyName': '${this.propertyname}', 'SearchId': '${this.searchId}'}`, 'slide', false, $(this));
                    });
                }
                /**
               * Saves dependencies.
               * @method save
               */
                save() {
                    let me = $(this);
                    let depItems = me.find('.pnlProperties li');
                    let depProps = new Array();
                    for (let i = 0; i < depItems.length; i++) {
                        let dep = $(depItems[i]);
                        let prop;
                        if (this.filter) {
                            prop = new flexygo.api.edit.DependencyFilterHelper();
                            prop.ObjectName = this.objectname;
                            prop.DependingObjectName = dep.attr('DependingObjectName');
                        }
                        else {
                            prop = new flexygo.api.edit.DependencyHelper();
                            switch (this.mode) {
                                case 'process':
                                    prop.ObjectName = this.processname;
                                    break;
                                case 'report':
                                    prop.ObjectName = this.reportname;
                                    break;
                                default:
                                    prop.ObjectName = this.objectname;
                                    break;
                            }
                        }
                        prop.PropertyName = this.propertyname;
                        prop.DependingPropertyName = dep.attr('DependingPropertyName');
                        prop.Order = i + 1;
                        let controls = dep.find('[property]');
                        for (let j = 0; j < controls.length; j++) {
                            let cntl = $(controls[j]);
                            prop[cntl.attr('property')] = cntl.val();
                        }
                        depProps.push(prop);
                    }
                    if (this.filter) {
                        let params = {
                            SearchId: this.searchId,
                            ObjectName: this.objectname,
                            ProcessName: this.processname,
                            ReportName: this.reportname,
                            PropertyName: this.propertyname,
                            Dependencies: depProps
                        };
                        flexygo.ajax.post('~/api/Edit', 'SaveFilterDependenciesConfig', params, (ret) => {
                            me.closest('.ui-dialog').remove();
                            flexygo.msg.success('Saved :)');
                        });
                    }
                    else {
                        let params = {
                            ObjectName: this.objectname,
                            ProcessName: this.processname,
                            ReportName: this.reportname,
                            PropertyName: this.propertyname,
                            Dependencies: depProps
                        };
                        flexygo.ajax.post('~/api/Edit', 'SaveDependenciesConfig', params, (ret) => {
                            me.closest('.ui-dialog').remove();
                            flexygo.msg.success('Saved :)');
                        });
                    }
                }
                loadProps() {
                    let me = $(this);
                    me.append('<ul class="pnlProperties" />');
                    let filterContainer = `<div class="search input-group" style="width:100%;">
                <input type="search" placeholder="${flexygo.localization.translate('flxsearch.search')}" style="width:100%;padding:6px;">
            </div>`;
                    if (this.filter) {
                        me.append('<div class="panel panel-default"><div class="panel-heading"><i class="fa fa-plus"></i> ' + flexygo.localization.translate('dependecymanager.addmorefilter') + '</div><div class="panel-body">' + filterContainer + '<ul class="unactiveProperties nav nav-pills padding-top-l" /></div></div>');
                    }
                    else {
                        me.append('<div class="panel panel-default"><div class="panel-heading"><i class="fa fa-plus"></i> ' + flexygo.localization.translate('dependecymanager.addmore') + '</div><div class="panel-body">' + filterContainer + '<ul class="unactiveProperties nav nav-pills" /></div></div>');
                    }
                    let obj;
                    if (this.filter) {
                        obj = new flexygo.obj.Entity('sysGenericSearchProperty', "Objects_Search_Properties.ObjectName='" + this.objectname + "' and Objects_Search_Properties.SearchId='" + this.searchId + "' and Objects_Search_Properties.PropertyName='" + this.propertyname + "'");
                    }
                    else {
                        switch (this.mode) {
                            case 'process':
                                obj = new flexygo.obj.Entity('sysProcessParam', "Processes_Params.ProcessName='" + this.processname + "' and Processes_Params.ParamName='" + this.propertyname + "'");
                                break;
                            case 'report':
                                obj = new flexygo.obj.Entity('sysReportParam', "Reports_Params.ReportName='" + this.reportname + "' and Reports_Params.ParamName='" + this.propertyname + "'");
                                break;
                            default:
                                obj = new flexygo.obj.Entity('sysObjectProperty', "Objects_Properties.ObjectName='" + this.objectname + "' and Objects_Properties.propertyName='" + this.propertyname + "'");
                                break;
                        }
                    }
                    let propItems = obj.getView('AllDependencies');
                    ;
                    this.propItems = propItems;
                    let pnl = me.find('.pnlProperties');
                    let unpnl = me.find('.unactiveProperties');
                    for (let i = 0; i < propItems.length; i++) {
                        if (propItems[i].HasValueDep == 1 || propItems[i].HasClassDep == 1 || propItems[i].HasComboDep == 1 || propItems[i].HasEnabledDep == 1 || propItems[i].HasVisibleDep == 1 || propItems[i].HasRequiredDep || propItems[i].HasCustomPropertyDep || propItems[i].HasConnStringId || propItems[i].HasLabelDep) {
                            pnl.append(flexygo.utils.parser.compile(propItems[i], this.template, flexygo));
                        }
                        else {
                            let prop = $(flexygo.utils.parser.compile(propItems[i], '<li class="active"><a href="#">{{DependingPropertyName}}</a></li>', flexygo));
                            prop.data('fulldata', propItems[i]);
                            unpnl.append(prop);
                        }
                    }
                    me.find('.unactiveProperties>li>a').on('click', (e) => {
                        this.unactivePropClick(e, me);
                    });
                    me.find('[property]').on('change', (e) => {
                        let dep = $(e.currentTarget).closest('li');
                        this.processDependency(dep);
                    });
                    me.find('.deleteDependencyButton').on('click', (e) => {
                        let dep = $(e.currentTarget).closest('li');
                        this.deleteDependency(dep);
                    });
                    me.find('input[type="search"]').on('keyup search', (e) => {
                        this.filterProperties($(e.currentTarget));
                    });
                    setTimeout(() => {
                        me.find('.pnlProperties li').each((i, e) => {
                            this.processDependency($(e));
                        });
                    }, 500);
                    me.find('i.showSQLEditor').on('click', (e) => {
                        this.showSQLEditor($(e.currentTarget).parent().find('flx-text'));
                    });
                }
                filterProperties(e, cnt = null) {
                    let me = (!cnt ? $(this) : $(cnt));
                    let value = $(e).val().toLowerCase();
                    ;
                    let props = me.find('.unactiveProperties li > a');
                    for (let i = 0; i < props.length; i++) {
                        let propName = $(props[i]).html().toLowerCase();
                        if (propName.includes(value)) {
                            $(props[i]).closest('li').removeClass('hide');
                        }
                        else {
                            $(props[i]).closest('li').addClass('hide');
                        }
                    }
                }
                unactivePropClick(e, me) {
                    e.stopPropagation();
                    e.preventDefault();
                    let itm = $(e.currentTarget);
                    let newProp = $(flexygo.utils.parser.compile(itm.parent().data('fulldata'), this.template, flexygo));
                    me.find('.pnlProperties').append(newProp);
                    itm.remove();
                    newProp.find('.ctl-panel').hide();
                    newProp.find('.' + me.find('.pnlNavigate>li.active').attr('data-link')).show();
                    newProp.find('[property]').on('change', (ee) => {
                        let dep = $(ee.currentTarget).closest('li');
                        this.processDependency(dep);
                    });
                    newProp.find('.deleteDependencyButton').on('click', (p) => {
                        let dep = $(p.currentTarget).closest('li');
                        this.deleteDependency(dep);
                    });
                    newProp.find('i.showSQLEditor').on('click', (e) => {
                        this.showSQLEditor($(e.currentTarget).parent().find('flx-text'));
                    });
                }
                processDependency(dep) {
                    //Show or hide dependency icons
                    dep.find('.HasValueDep').visible(dep.find('[property="SQLValue"]').val() != null);
                    dep.find('.HasClassDep').visible(dep.find('[property="SQLClass"]').val() != null);
                    dep.find('.HasComboDep').visible(dep.find('[property="SQLComboFilter"]').val() != null || dep.find('[property="SQLComboSentence"]').val() != null);
                    dep.find('.HasEnabledDep').visible(dep.find('[property="EnabledValues"]').val() != null || dep.find('[property="DisabledValues"]').val() != null || dep.find('[property="SQLEnabled"]').val() != null);
                    dep.find('.HasVisibleDep').visible(dep.find('[property="VisibleValues"]').val() != null || dep.find('[property="HiddenValues"]').val() != null || dep.find('[property="SQLVisible"]').val() != null);
                    dep.find('.HasRequiredDep').visible(dep.find('[property="RequiredValues"]').val() != null || dep.find('[property="NotRequiredValues"]').val() != null || dep.find('[property="SQLRequired"]').val() != null);
                    dep.find('.HasCustomPropertyDep').visible(dep.find('[property="SQLCustomProperty"]').val() != null || dep.find('[property="PropertyValue"]').val() != null || dep.find('[property="CusPropName"]').val() != null);
                    dep.find('.HasConnstringId').visible(dep.find('[property="ConnStringId"]').val() != null);
                    dep.find('.HasLabelDep').visible(dep.find('[property="SQLLabel"]').val() != null);
                    //dep.find('.HasConnstringDep').visible(dep.find('[property="ConnStringId"]').val() != null);
                    if (dep.find('[property="Active"]').val()) {
                        dep.find('.propName').removeClass('strike');
                    }
                    else {
                        dep.find('.propName').addClass('strike');
                    }
                    //Enabled or disabled Combo dep
                    dep.find('.combo-controls [property]').removeAttr('disabled');
                    dep.find('.combo-controls .showSQLEditor').show();
                    if (dep.find('[property="SQLComboFilter"]').val() != null) {
                        dep.find('[property="SQLComboSentence"]').attr('disabled', true);
                        dep.find('[property="SQLComboSentence"]').parent().parent().find('.showSQLEditor').hide();
                    }
                    else if (dep.find('[property="SQLComboSentence"]').val() != null) {
                        dep.find('[property="SQLComboFilter"]').attr('disabled', true);
                        dep.find('[property="SQLComboFilter"]').parent().parent().find('.showSQLEditor').hide();
                    }
                    //Enabled or disabled Enabled dep
                    dep.find('.enabled-controls [property]').removeAttr('disabled');
                    dep.find('.enabled-controls .showSQLEditor').show();
                    if (dep.find('[property="EnabledValues"]').val() != null) {
                        dep.find('[property="DisabledValues"]').attr('disabled', true);
                        dep.find('[property="SQLEnabled"]').attr('disabled', true);
                        dep.find('[property="SQLEnabled"]').parent().parent().find('.showSQLEditor').hide();
                    }
                    else if (dep.find('[property="DisabledValues"]').val() != null) {
                        dep.find('[property="EnabledValues"]').attr('disabled', true);
                        dep.find('[property="SQLEnabled"]').attr('disabled', true);
                        dep.find('[property="SQLEnabled"]').parent().parent().find('.showSQLEditor').hide();
                    }
                    else if (dep.find('[property="SQLEnabled"]').val() != null) {
                        dep.find('[property="EnabledValues"]').attr('disabled', true);
                        dep.find('[property="DisabledValues"]').attr('disabled', true);
                    }
                    //Enabled or disabled Visibled dep
                    dep.find('.visible-controls [property]').removeAttr('disabled');
                    dep.find('.visible-controls .showSQLEditor').show();
                    if (dep.find('[property="VisibleValues"]').val() != null) {
                        dep.find('[property="HiddenValues"]').attr('disabled', true);
                        dep.find('[property="SQLVisible"]').attr('disabled', true);
                        dep.find('[property="SQLVisible"]').parent().parent().find('.showSQLEditor').hide();
                    }
                    else if (dep.find('[property="HiddenValues"]').val() != null) {
                        dep.find('[property="VisibleValues"]').attr('disabled', true);
                        dep.find('[property="SQLVisible"]').attr('disabled', true);
                        dep.find('[property="SQLVisible"]').parent().parent().find('.showSQLEditor').hide();
                    }
                    else if (dep.find('[property="SQLVisible"]').val() != null) {
                        dep.find('[property="VisibleValues"]').attr('disabled', true);
                        dep.find('[property="HiddenValues"]').attr('disabled', true);
                    }
                    //Enabled or disabled Required dep
                    dep.find('.required-controls [property]').removeAttr('disabled');
                    dep.find('.required-controls .showSQLEditor').show();
                    if (dep.find('[property="RequiredValues"]').val() != null) {
                        dep.find('[property="NotRequiredValues"]').attr('disabled', true);
                        dep.find('[property="SQLRequired"]').attr('disabled', true);
                        dep.find('[property="SQLRequired"]').parent().parent().find('.showSQLEditor').hide();
                    }
                    else if (dep.find('[property="NotRequiredValues"]').val() != null) {
                        dep.find('[property="RequiredValues"]').attr('disabled', true);
                        dep.find('[property="SQLRequired"]').attr('disabled', true);
                        dep.find('[property="SQLRequired"]').parent().parent().find('.showSQLEditor').hide();
                    }
                    else if (dep.find('[property="SQLRequired"]').val() != null) {
                        dep.find('[property="RequiredValues"]').attr('disabled', true);
                        dep.find('[property="NotRequiredValues"]').attr('disabled', true);
                    }
                    //Enabled or disabled Custom Property dep
                    dep.find('.customControl-controls [property]').removeAttr('disabled');
                    dep.find('.customControl-controls .showSQLEditor').show();
                    if (dep.find('[property="SQLCustomProperty"]').val() != null) {
                        dep.find('[property="PropertyValue"]').attr('disabled', true);
                        dep.find('[property="CusPropName"]').attr('disabled', true);
                    }
                    else if (dep.find('[property="PropertyValue"]').val() != null) {
                        dep.find('[property="SQLCustomProperty"]').attr('disabled', true);
                        dep.find('[property="SQLCustomProperty"]').parent().parent().find('.showSQLEditor').hide();
                    }
                    else if (dep.find('[property="CusPropName"]').val() != null) {
                        dep.find('[property="SQLCustomProperty"]').attr('disabled', true);
                        dep.find('[property="SQLCustomProperty"]').parent().parent().find('.showSQLEditor').hide();
                    }
                }
                /**
                * Gets template.
                * @method getTemplate
                * @returns string
                */
                getTemplate() {
                    let sqlEditorIcon = 'flx-icon icon-html-editor clickable';
                    let template = '';
                    template += `<li DependingPropertyName="{{DependingPropertyName}}">`;
                    template += '<div class="row">';
                    template += '<div class="col-2 propName {{Active|Bool:,strike}}">';
                    template += '{{DependingPropertyName}}';
                    template += `  <i title="Connection string for dependencies" class="flx-icon icon-database-configuration HasConnStringId" style="{{HasConnStringId|Bool:, display: none;}}"></i>`;
                    template += `  <i title="Has Custom Control dependency" class="flx-icon icon-wizard-1 HasCustomPropertyDep" style="{{HasCustomPropertyDep|Bool:, display: none;}}"></i>`;
                    template += `  <i title="Has value dependency" class="flx-icon icon-tag HasValueDep" style="{{HasValueDep|Bool:, display: none;}}"></i>`;
                    template += `  <i title="Has Class dependency" class="flx-icon icon-custom HasClassDep" style="{{HasClassDep|Bool:, display: none;}}"></i>`;
                    template += '  <i title="Has Combo dependency" class="flx-icon icon-listbox-2 HasComboDep" style="{{HasComboDep|Bool:,display:none}}"></i>';
                    template += `  <i title="Has Enabled dependency" class="flx-icon icon-lock-1 HasEnabledDep" style="{{HasEnabledDep|Bool:, display: none;}}"></i>`;
                    template += `  <i title="Has Visibility dependency" class="flx-icon icon-eye HasVisibleDep" style="{{HasVisibleDep|Bool:, display: none;}}"></i>`;
                    template += `  <i title="Has Required dependency" class="flx-icon icon-checked HasRequiredDep" style="{{HasRequiredDep|Bool:, display: none;}}"></i>`;
                    template += `  <i title="Has Label dependency" class="flx-icon icon-text-editor HasLabelDep" style="{{HasLabelDep|Bool:, display: none;}}"></i>`;
                    template += '</div>';
                    template += '<div class="col-9">';
                    template += '<div class="cnnstrings-controls ctl-panel" style="display:none">';
                    template += '  <flx-combo type="text" property="ConnStringId" placeholder="' + flexygo.localization.translate('dependecymanager.connStringvalues') + '" value="{{ConnStringId}}">' + this.getConnStringItems() + '</flx-combo>';
                    template += '</div>';
                    template += '<div class="customControl-controls ctl-panel" style="display:none">';
                    template += '  <flx-tag separator= "|" class="col-3" property="PropertyValue" placeholder="' + flexygo.localization.translate('dependecymanager.valueApply') + '" value= "{{PropertyValue}}" > </flx-tag>';
                    template += '  <flx-combo type="text" title="' + flexygo.localization.translate('dependecymanager.CusPropertyName') + '" class="col-3" property="CusPropName" value="{{CusPropName}}">' + this.getCusControls() + '</flx-combo>';
                    template += '  <div class="col-6"><div><flx-text type="text" property="SQLCustomProperty" placeholder="' + flexygo.localization.translate('dependecymanager.SQLCustomProperty') + '" value="{{SQLCustomProperty}}" ></flx-text></div><i class="' + sqlEditorIcon + ' showSQLEditor margin-left-m"></i></div>';
                    template += '</div>';
                    template += '<div class="value-controls ctl-panel" style="display:none">';
                    template += '  <div><flx-text type="text" property="SQLValue" placeholder="' + flexygo.localization.translate('dependecymanager.sqlvalue') + '" value="{{SQLValue}}"></flx-text></div>';
                    template += '  <i class="' + sqlEditorIcon + ' showSQLEditor margin-left-m"></i>';
                    template += '</div>';
                    template += '<div class="class-controls ctl-panel" style="display:none">';
                    template += '  <div><flx-text type="text" property="SQLClass" placeholder="' + flexygo.localization.translate('dependecymanager.sqlclass') + '" value="{{SQLClass}}" ></flx-text></div>';
                    template += '  <i class="' + sqlEditorIcon + ' showSQLEditor margin-left-m"></i>';
                    template += '</div>';
                    template += '<div class="combo-controls ctl-panel" style="display:none">';
                    template += '  <div class="col-4"><div><flx-text type="text" property="SQLComboFilter" placeholder="' + flexygo.localization.translate('dependecymanager.sqlcombofilter') + '" value="{{SQLComboFilter}}" ></flx-text></div><i class="' + sqlEditorIcon + ' showSQLEditor margin-left-m"></i></div>';
                    template += '  <div class="col-8"><div><flx-text type="text" property="SQLComboSentence" placeholder="' + flexygo.localization.translate('dependecymanager.sqlcombosentence') + '" value="{{SQLComboSentence}}" ></flx-text></div><i class="' + sqlEditorIcon + ' showSQLEditor margin-left-m"></i></div>';
                    template += '</div>';
                    template += '<div class="enabled-controls ctl-panel" style="display:none">';
                    template += '  <flx-tag separator="|" class="col-3" property="EnabledValues" placeholder="' + flexygo.localization.translate('dependecymanager.enabledvalues') + '" value="{{EnabledValues}}" ></flx-tag>';
                    template += '  <flx-tag separator="|" class="col-3" property="DisabledValues" placeholder="' + flexygo.localization.translate('dependecymanager.disabledvalues') + '" value="{{DisabledValues}}" ></flx-tag>';
                    template += '  <div class="col-6"><div><flx-text type="text" property="SQLEnabled" placeholder="' + flexygo.localization.translate('dependecymanager.sqlenabledsentence') + '" value="{{SQLEnabled}}" ></flx-text></div><i class="' + sqlEditorIcon + ' showSQLEditor margin-left-m"></i></div>';
                    template += '</div>';
                    template += '<div class="visible-controls ctl-panel" style="display:none">';
                    template += '  <flx-tag separator="|" class="col-3" property="VisibleValues" placeholder="' + flexygo.localization.translate('dependecymanager.visiblevalues') + '" value="{{VisibleValues}}" ></flx-tag>';
                    template += '  <flx-tag separator="|" class="col-3" property="HiddenValues" placeholder="' + flexygo.localization.translate('dependecymanager.hiddenvalues') + '" value="{{HiddenValues}}" ></flx-tag>';
                    template += '  <div class="col-6"><div><flx-text type="text" property="SQLVisible" placeholder="' + flexygo.localization.translate('dependecymanager.visiblesentence') + '" value="{{SQLVisible}}" ></flx-text></div><i class="' + sqlEditorIcon + ' showSQLEditor margin-left-m"></i></div>';
                    template += '</div>';
                    template += '<div class="required-controls ctl-panel" style="display:none">';
                    template += '  <flx-tag separator="|" class="col-3" property="RequiredValues" placeholder="' + flexygo.localization.translate('dependecymanager.requiredvalues') + '" value="{{RequiredValues}}" ></flx-tag>';
                    template += '  <flx-tag separator="|" class="col-3" property="NotRequiredValues" placeholder="' + flexygo.localization.translate('dependecymanager.notrequiredvalues') + '" value="{{NotRequiredValues}}" ></flx-tag>';
                    template += '  <div class="col-6"><div><flx-text type="text" property="SQLRequired" placeholder="' + flexygo.localization.translate('dependecymanager.requiredsentence') + '" value="{{SQLRequired}}" ></flx-text></div><i class="' + sqlEditorIcon + ' showSQLEditor margin-left-m"></i></div>';
                    template += '</div>';
                    template += '<div class="order-controls ctl-panel">';
                    template += '   <flx-switch class="pull-left" property="Active" {{Active|Bool:checked}} ></flx-switch>';
                    template += '   <flx-text type="text" class="pull-left ctlDescrip" property="Descrip" placeholder="' + flexygo.localization.translate('dependecymanager.description') + '" value="{{sysDescrip}}" ></flx-text>';
                    template += '</div>';
                    template += '<div class="label-controls ctl-panel" style="display:none">';
                    template += '  <div><flx-text type="text" property="SQLLabel" placeholder="' + flexygo.localization.translate('dependecymanager.sqllabel') + '" value="{{SQLLabel}}"></flx-text></div>';
                    template += '  <i class="' + sqlEditorIcon + ' showSQLEditor margin-left-m"></i>';
                    template += '</div>';
                    template += '</div>';
                    template += '<div class="col-1 padding-top-s"><i class="flx-icon icon-close txt-danger right clickable deleteDependencyButton"/></div>';
                    template += '</div>';
                    template += ' </li>';
                    return template;
                }
                getFilterTemplate() {
                    let template = '';
                    template += `<li DependingPropertyName="{{DependingPropertyName}}" DependingObjectName={{DependingObjectName}}>`;
                    template += '<div class="row">';
                    template += '<div class="col-2 propName {{Active|Bool:,strike}}">';
                    template += '{{DependingPropertyName}}';
                    template += '  <i title="Has Combo dependency" class="flx-icon icon-listbox-2 HasComboDep" style="{{HasComboDep|Bool:,display:none}}"></i>';
                    template += '</div>';
                    template += '<div class="col-9">';
                    template += '<div class="combo-controls ctl-panel">';
                    template += '  <flx-text type="text" class="col-4" property="SQLComboFilter" placeholder="' + flexygo.localization.translate('dependecymanager.sqlcombofilter') + '" value="{{SQLComboFilter}}" ></flx-text>';
                    template += '  <flx-text type="text" class="col-8" property="SQLComboSentence" placeholder="' + flexygo.localization.translate('dependecymanager.sqlcombosentence') + '" value="{{SQLComboSentence}}" ></flx-text>';
                    template += '</div>';
                    template += '<div class="order-controls ctl-panel" style="display:none">';
                    template += '	<flx-switch class="pull-left" property="Active" {{Active|Bool:checked}} ></flx-switch>';
                    template += '  <flx-text type="text" class="pull-left ctlDescrip" property="Descrip" placeholder="' + flexygo.localization.translate('dependecymanager.description') + '" value="{{sysDescrip}}" ></flx-text>';
                    template += '</div>';
                    template += '</div>';
                    template += '<div class="col-1 padding-top-s"><i class="flx-icon icon-close txt-danger clickable deleteDependencyButton"/></div>';
                    template += '</div>';
                    template += ' </li>';
                    return template;
                }
                /**
              * Gets connection string items as string.
              * @method getConnStringItems
              * @returns string
              */
                getConnStringItems() {
                    let str = '<option value=""></option>';
                    for (let i = 0; i < this.constringItems.length; i++) {
                        str += '<option value="' + this.constringItems[i].ConnStringid + '">' + this.constringItems[i].ConnStringid + '</option >';
                    }
                    return str;
                }
                getCusControls() {
                    let str = '<option value=""></option>';
                    for (let i = 0; i < this.cusControlsItems.length; i++) {
                        str += '<option value="' + this.cusControlsItems[i].CustomPropName + '">' + this.cusControlsItems[i].CustomPropName + '</option >';
                    }
                    return str;
                }
                deleteDependency(dep) {
                    let me = $(this);
                    let unpnl = me.find('.unactiveProperties');
                    const found = this.propItems.find(element => element.DependingPropertyName == dep[0].attributes[0].textContent);
                    let prop = $(flexygo.utils.parser.compile(found, '<li class="active"><a href="#">{{DependingPropertyName}}</a></li>', flexygo));
                    prop.data('fulldata', found);
                    console.log(found);
                    for (const property in found) {
                        if (property !== 'ConnStringId' && property !== 'DependingPropertyName' && property !== 'ObjectName' && property !== 'ord') {
                            found[property] = null;
                        }
                    }
                    unpnl.append(prop);
                    //me.find('.unactiveProperties>li>a').off();
                    prop.find('a').on('click', (e) => {
                        this.unactivePropClick(e, me);
                    });
                    dep.remove();
                }
                showSQLEditor(e) {
                    let me = this;
                    let triggerElement = $(e);
                    let currentValue = $(triggerElement).attr('value') ? $(triggerElement).attr('value') : triggerElement[0].getValue();
                    let currentProp = triggerElement.closest('li').attr('dependingpropertyname');
                    let mainProp = triggerElement.closest('flx-dependencymanager').attr('propertyname');
                    let formProps = '', jFormProps = $('<ul/>');
                    let currentConn = '';
                    if (triggerElement.closest('li').find('[property="ConnStringId"]').length > 0) {
                        currentConn = triggerElement.closest('li').find('[property="ConnStringId"]')[0].getValue();
                    }
                    for (let i = 0; i < this.propItems.length; i++) {
                        $(jFormProps).append(`<li class="active clickable"><a>${this.propItems[i].DependingPropertyName}</a></li>`);
                    }
                    $(jFormProps).prepend(`<li class="active clickable"><a class="bg-warning">${mainProp}</a></li>`);
                    formProps = $(jFormProps).html();
                    let template = `<h6 class="row text-center margin-top-l margin-bottom-l">${currentProp} - ${triggerElement.attr('placeholder')}</h6><div class="row">
                <div class="search input-group" style="width:100%;">
                    <input type="search" placeholder="${flexygo.localization.translate('flxsearch.search')}" style="width:100%;padding:6px;">
                </div>
                <ul class="unactiveProperties nav nav-pills">${formProps}</ul>
            </div>
            <div class="row">
                <flx-edit><form>
                    <input type="hidden" property="ConnStringId" value="${flexygo.utils.isBlank(currentConn) ? 'DataConnectionString' : currentConn}"/>
                    <flx-code type="sql" editor="monaco" template="true" value="${flexygo.utils.isBlank(currentValue) ? '' : currentValue}" onchange="$(this).closest('form').addClass('dirty')"></flx-code></div>
                </form></flx-edit>
            </div>`;
                    $.sweetModal({
                        content: template,
                        blocking: true,
                        width: '70%',
                        height: '60%',
                        classes: ['flx-dependency-sqlEditor'],
                        theme: $('body[mode="dark"]').length > 0 ? $.sweetModal.THEME_DARK : '',
                        onOpen: function (cnt) {
                            $(cnt).off("click");
                            $(cnt).find('input[type="search"]').on('keyup search', (e) => {
                                me.filterProperties($(e.currentTarget), $(e.currentTarget).closest('.flx-dependency-sqlEditor'));
                            });
                            $(cnt).find('.sweet-modal-close-link').off("click").on("click", (e) => {
                                let container = $(e.currentTarget).closest('.flx-dependency-sqlEditor');
                                let overlay = $(container).closest('.sweet-modal-overlay');
                                let dirtyModules = $(container).find("form.dirty");
                                if (dirtyModules.length != 0) {
                                    Lobibox.confirm({
                                        title: flexygo.localization.translate('flxedit.areyousuretitle'),
                                        msg: flexygo.localization.translate('flxedit.areyousuremsg'),
                                        buttons: {
                                            yes: {
                                                'class': 'lobibox-btn lobibox-btn-yes',
                                                text: flexygo.localization.translate('flxedit.areyousuremsgyes'),
                                                closeOnClick: true
                                            },
                                            no: {
                                                'class': 'lobibox-btn lobibox-btn-no',
                                                text: flexygo.localization.translate('flxedit.areyousuremsgno'),
                                                closeOnClick: true
                                            }
                                        },
                                        iconClass: 'fa fa-question-circle',
                                        callback: (dialog, type, ev) => {
                                            if (type == "yes") {
                                                //$(overlay).addClass("animated fadeOut");
                                                //setTimeout(() => {
                                                $(overlay).remove();
                                                dialog.destroy();
                                                //}, 750);   
                                            }
                                        }
                                    });
                                }
                                else {
                                    //$(overlay).addClass("animated fadeOut");
                                    //setTimeout(() => {
                                    $(overlay).remove();
                                    //}, 750); 
                                }
                                e.preventDefault();
                            });
                            $(cnt).find('.unactiveProperties>li>a').on('click', (e) => {
                                let flxCode = $(cnt).find('flx-code')[0];
                                let currentPosition = flxCode.monaco.getPosition();
                                let newText = `{{${e.target.innerHTML}}}`;
                                flxCode.monaco.executeEdits("my-source", [{
                                        range: new monaco.Range(currentPosition.lineNumber, currentPosition.column, currentPosition.lineNumber, currentPosition.column),
                                        text: newText,
                                        forceMoveMarkers: true
                                    }]);
                                if (!flexygo.utils.isBlank(currentPosition.lineNumber) && !flexygo.utils.isBlank(currentPosition.column)) {
                                    let newPosition = {
                                        lineNumber: currentPosition.lineNumber,
                                        column: currentPosition.column + newText.length
                                    };
                                    flxCode.monaco.focus();
                                    flxCode.monaco.setPosition(newPosition);
                                    flxCode.monaco.revealPositionInCenter(newPosition);
                                }
                            });
                        },
                        buttons: [
                            {
                                label: flexygo.localization.translate('flxlist.save'),
                                classes: 'bg-outstanding',
                                action: (sweetModal) => {
                                    let flxCode = $(sweetModal.$overlay).find('flx-code')[0];
                                    let sqlSentence = flxCode.getValue();
                                    triggerElement[0].setValue(sqlSentence);
                                    //$(sweetModal.$overlay).addClass("animated fadeOut");
                                }
                            }
                        ]
                    });
                }
            }
            /**
            * Array of observed attributes.
            * @property observedAttributes {Array}
            */
            FlxDependencyManagerElement.observedAttributes = ['objectname', 'reportname', 'processname', 'propertyname'];
            wc.FlxDependencyManagerElement = FlxDependencyManagerElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-dependencymanager', flexygo.ui.wc.FlxDependencyManagerElement);
//# sourceMappingURL=flx-dependencymanager.js.map