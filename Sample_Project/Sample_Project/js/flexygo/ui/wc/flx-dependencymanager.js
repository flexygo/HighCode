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
                    this.reportname = null;
                    this.processname = null;
                    this.propertyname = null;
                    this.mode = null;
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = $(this);
                    this.connected = true;
                    this.template = this.getTemplate();
                    this.objectname = element.attr('ObjectName');
                    this.reportname = element.attr("ReportName");
                    this.processname = element.attr("ProcessName");
                    this.propertyname = element.attr('PropertyName');
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
                * Array of observed attributes.
                * @property observedAttributes {Array}
                */
                static get observedAttributes() {
                    return ['objectname', 'reportname', 'processname', 'propertyname'];
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
                    this.loadTabs();
                    this.loadProps();
                    me.find(".pnlProperties").sortable();
                }
                /**
                * RefrLoads tabs.
                * @method loadTabs
                */
                loadTabs() {
                    let me = $(this);
                    me.append('<ul class="pnlNavigate nav nav-tabs" />');
                    me.find('.pnlNavigate').append('<li class="active" data-link="order-controls"><a href="#"><i class="flx-icon icon-bullet-number-list"></i> ' + flexygo.localization.translate('dependecymanager.sort') + '</a></li>');
                    me.find('.pnlNavigate').append('<li data-link="value-controls"><a href="#"><i class="flx-icon icon-tag"></i> ' + flexygo.localization.translate('dependecymanager.valuedep') + '</a></li>');
                    me.find('.pnlNavigate').append('<li data-link="class-controls"><a href="#"><i class="flx-icon icon-custom"></i> ' + flexygo.localization.translate('dependecymanager.classdep') + '</a></li>');
                    me.find('.pnlNavigate').append('<li data-link="combo-controls"><a href="#"><i class="flx-icon icon-listbox-2"></i> ' + flexygo.localization.translate('dependecymanager.combodep') + '</a></li>');
                    me.find('.pnlNavigate').append('<li data-link="enabled-controls"><a href="#"><i class="flx-icon icon-lock-1"></i> ' + flexygo.localization.translate('dependecymanager.enabledep') + '</a></li>');
                    me.find('.pnlNavigate').append('<li data-link="visible-controls"><a href="#"><i class="flx-icon icon-eye"></i> ' + flexygo.localization.translate('dependecymanager.visibledep') + '</a></li>');
                    me.find('.pnlNavigate').append('<li data-link="required-controls"><a href="#"><i class="flx-icon icon-checked"></i> ' + flexygo.localization.translate('dependecymanager.requireddep') + '</a></li>');
                    me.find('.pnlNavigate').append('<li data-link="save-Module" class="pull-right"><button class="btn btn-default bg-info"><i class="flx-icon icon-save"></i> ' + flexygo.localization.translate('dependecymanager.save') + '</button></a></li>');
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
                    me.find('.pnlNavigate>li>button').on('click', (e) => {
                        this.save();
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
                        let prop = new flexygo.api.edit.DependencyHelper();
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
                    let params = {
                        ObjectName: this.objectname,
                        ProcessName: this.processname,
                        ReportName: this.reportname,
                        PropertyName: this.propertyname,
                        Dependencies: depProps
                    };
                    flexygo.ajax.post('~/api/Edit', 'saveDependenciesConfig', params, (ret) => {
                        me.closest('.ui-dialog').remove();
                        flexygo.msg.success('Saved :)');
                    });
                }
                loadProps() {
                    let me = $(this);
                    me.append('<ul class="pnlProperties" />');
                    me.append('<div class="panel panel-default"><div class="panel-heading"><i class="fa fa-plus"></i> ' + flexygo.localization.translate('dependecymanager.addmore') + '</div><div class="panel-body"><ul class="unactiveProperties nav nav-pills" /></div></div>');
                    let obj;
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
                    let propItems = obj.getView('AllDependencies');
                    let pnl = me.find('.pnlProperties');
                    let unpnl = me.find('.unactiveProperties');
                    for (let i = 0; i < propItems.length; i++) {
                        if (propItems[i].HasValueDep == 1 || propItems[i].HasClassDep == 1 || propItems[i].HasComboDep == 1 || propItems[i].HasEnabledDep == 1 || propItems[i].HasVisibleDep == 1 || propItems[i].HasRequiredDep) {
                            pnl.append(flexygo.utils.parser.compile(propItems[i], this.template, flexygo));
                        }
                        else {
                            let prop = $(flexygo.utils.parser.compile(propItems[i], '<li class="active"><a href="#">{{DependingPropertyName}}</a></li>', flexygo));
                            prop.data('fulldata', propItems[i]);
                            unpnl.append(prop);
                        }
                    }
                    me.find('.unactiveProperties>li>a').on('click', (e) => {
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
                    });
                    me.find('[property]').on('change', (e) => {
                        let dep = $(e.currentTarget).closest('li');
                        this.processDependency(dep);
                    });
                    setTimeout(() => {
                        me.find('.pnlProperties li').each((i, e) => {
                            this.processDependency($(e));
                        });
                    }, 500);
                }
                processDependency(dep) {
                    //Show or hide dependency icons
                    dep.find('.HasValueDep').visible(dep.find('[property="SQLValue"]').val() != null);
                    dep.find('.HasClassDep').visible(dep.find('[property="SQLClass"]').val() != null);
                    dep.find('.HasComboDep').visible(dep.find('[property="SQLComboFilter"]').val() != null || dep.find('[property="SQLComboSentence"]').val() != null);
                    dep.find('.HasEnabledDep').visible(dep.find('[property="EnabledValues"]').val() != null || dep.find('[property="DisabledValues"]').val() != null || dep.find('[property="SQLEnabled"]').val() != null);
                    dep.find('.HasVisibleDep').visible(dep.find('[property="VisibleValues"]').val() != null || dep.find('[property="HiddenValues"]').val() != null || dep.find('[property="SQLVisible"]').val() != null);
                    dep.find('.HasRequiredDep').visible(dep.find('[property="RequiredValues"]').val() != null || dep.find('[property="NotRequiredValues"]').val() != null || dep.find('[property="SQLRequired"]').val() != null);
                    if (dep.find('[property="Active"]').val()) {
                        dep.find('.propName').removeClass('strike');
                    }
                    else {
                        dep.find('.propName').addClass('strike');
                    }
                    //Enabled or disabled Combo dep
                    dep.find('.combo-controls [property]').removeAttr('disabled');
                    if (dep.find('[property="SQLComboFilter"]').val() != null) {
                        dep.find('[property="SQLComboSentence"]').attr('disabled', true);
                    }
                    else if (dep.find('[property="SQLComboSentence"]').val() != null) {
                        dep.find('[property="SQLComboFilter"]').attr('disabled', true);
                    }
                    //Enabled or disabled Enabled dep
                    dep.find('.enabled-controls [property]').removeAttr('disabled');
                    if (dep.find('[property="EnabledValues"]').val() != null) {
                        dep.find('[property="DisabledValues"]').attr('disabled', true);
                        dep.find('[property="SQLEnabled"]').attr('disabled', true);
                    }
                    else if (dep.find('[property="DisabledValues"]').val() != null) {
                        dep.find('[property="EnabledValues"]').attr('disabled', true);
                        dep.find('[property="SQLEnabled"]').attr('disabled', true);
                    }
                    else if (dep.find('[property="SQLEnabled"]').val() != null) {
                        dep.find('[property="EnabledValues"]').attr('disabled', true);
                        dep.find('[property="DisabledValues"]').attr('disabled', true);
                    }
                    //Enabled or disabled Visibled dep
                    dep.find('.visible-controls [property]').removeAttr('disabled');
                    if (dep.find('[property="VisibleValues"]').val() != null) {
                        dep.find('[property="HiddenValues"]').attr('disabled', true);
                        dep.find('[property="SQLVisible"]').attr('disabled', true);
                    }
                    else if (dep.find('[property="HiddenValues"]').val() != null) {
                        dep.find('[property="VisibleValues"]').attr('disabled', true);
                        dep.find('[property="SQLVisible"]').attr('disabled', true);
                    }
                    else if (dep.find('[property="SQLVisible"]').val() != null) {
                        dep.find('[property="VisibleValues"]').attr('disabled', true);
                        dep.find('[property="HiddenValues"]').attr('disabled', true);
                    }
                    //Enabled or disabled Required dep
                    dep.find('.required-controls [property]').removeAttr('disabled');
                    if (dep.find('[property="RequiredValues"]').val() != null) {
                        dep.find('[property="NotRequiredValues"]').attr('disabled', true);
                        dep.find('[property="SQLRequired"]').attr('disabled', true);
                    }
                    else if (dep.find('[property="NotRequiredValues"]').val() != null) {
                        dep.find('[property="RequiredValues"]').attr('disabled', true);
                        dep.find('[property="SQLRequired"]').attr('disabled', true);
                    }
                    else if (dep.find('[property="SQLRequired"]').val() != null) {
                        dep.find('[property="RequiredValues"]').attr('disabled', true);
                        dep.find('[property="NotRequiredValues"]').attr('disabled', true);
                    }
                }
                /**
                * Gets template.
                * @method getTemplate
                * @returns string
                */
                getTemplate() {
                    let template = '';
                    template += '<li DependingPropertyName="{{DependingPropertyName}}">';
                    template += '<div class="row">';
                    template += '<div class="col-2 propName {{Active|Bool:,strike}}">';
                    template += '{{DependingPropertyName}}';
                    template += '  <i title="Has value dependency" class="flx-icon icon-tag HasValueDep" style="{{HasValueDep|Bool:,display:none}}"></i>';
                    template += '  <i title="Has Class dependency" class="flx-icon icon-custom HasClassDep" style="{{HasClassDep|Bool:,display:none}}"></i>';
                    template += '  <i title="Has Combo dependency" class="flx-icon icon-listbox-2 HasComboDep" style="{{HasComboDep|Bool:,display:none}}"></i>';
                    template += '  <i title="Has Enabled dependency" class="flx-icon icon-lock-1 HasEnabledDep" style="{{HasEnabledDep|Bool:,display:none}}"></i>';
                    template += '  <i title="Has Visibility dependency" class="flx-icon icon-eye HasVisibleDep" style="{{HasVisibleDep|Bool:,display:none}}"></i>';
                    template += '  <i title="Has Required dependency" class="flx-icon icon-checked HasRequiredDep" style="{{HasRequiredDep|Bool:,display:none}}"></i>';
                    template += '</div>';
                    template += '<div class="col-10">';
                    template += '<div class="value-controls ctl-panel" style="display:none">';
                    template += '  <flx-text type="text" property="SQLValue" placeholder="' + flexygo.localization.translate('dependecymanager.sqlvalue') + '" value="{{SQLValue}}"></flx-text>';
                    template += '</div>';
                    template += '<div class="class-controls ctl-panel" style="display:none">';
                    template += '  <flx-text type="text" property="SQLClass" placeholder="' + flexygo.localization.translate('dependecymanager.sqlclass') + '" value="{{SQLClass}}" ></flx-text>';
                    template += '</div>';
                    template += '<div class="combo-controls ctl-panel" style="display:none">';
                    template += '  <flx-text type="text" class="col-4" property="SQLComboFilter" placeholder="' + flexygo.localization.translate('dependecymanager.sqlcombofilter') + '" value="{{SQLComboFilter}}" ></flx-text>';
                    template += '  <flx-text type="text" class="col-8" property="SQLComboSentence" placeholder="' + flexygo.localization.translate('dependecymanager.sqlcombosentence') + '" value="{{SQLComboSentence}}" ></flx-text>';
                    template += '</div>';
                    template += '<div class="enabled-controls ctl-panel" style="display:none">';
                    template += '  <flx-tag separator="|" class="col-3" property="EnabledValues" placeholder="' + flexygo.localization.translate('dependecymanager.enabledvalues') + '" value="{{EnabledValues}}" ></flx-tag>';
                    template += '  <flx-tag separator="|" class="col-3" property="DisabledValues" placeholder="' + flexygo.localization.translate('dependecymanager.disabledvalues') + '" value="{{DisabledValues}}" ></flx-tag>';
                    template += '  <flx-text type="text" class="col-6" property="SQLEnabled" placeholder="' + flexygo.localization.translate('dependecymanager.sqlenabledsentence') + '" value="{{SQLEnabled}}" ></flx-text>';
                    template += '</div>';
                    template += '<div class="visible-controls ctl-panel" style="display:none">';
                    template += '  <flx-tag separator="|" class="col-3" property="VisibleValues" placeholder="' + flexygo.localization.translate('dependecymanager.visiblevalues') + '" value="{{VisibleValues}}" ></flx-tag>';
                    template += '  <flx-tag separator="|" class="col-3" property="HiddenValues" placeholder="' + flexygo.localization.translate('dependecymanager.hiddenvalues') + '" value="{{HiddenValues}}" ></flx-tag>';
                    template += '  <flx-text type="text" class="col-6" property="SQLVisible" placeholder="' + flexygo.localization.translate('dependecymanager.visiblesentence') + '" value="{{SQLVisible}}" ></flx-text>';
                    template += '</div>';
                    template += '<div class="required-controls ctl-panel" style="display:none">';
                    template += '  <flx-tag separator="|" class="col-3" property="RequiredValues" placeholder="' + flexygo.localization.translate('dependecymanager.requiredvalues') + '" value="{{RequiredValues}}" ></flx-tag>';
                    template += '  <flx-tag separator="|" class="col-3" property="NotRequiredValues" placeholder="' + flexygo.localization.translate('dependecymanager.notrequiredvalues') + '" value="{{NotRequiredValues}}" ></flx-tag>';
                    template += '  <flx-text type="text" class="col-6" property="SQLRequired" placeholder="' + flexygo.localization.translate('dependecymanager.requiredsentence') + '" value="{{SQLRequired}}" ></flx-text>';
                    template += '</div>';
                    template += '<div class="order-controls ctl-panel">';
                    template += '	<flx-switch class="pull-left" property="Active" {{Active|Bool:checked}} ></flx-switch>';
                    template += '  <flx-text type="text" class="pull-left ctlDescrip" property="Descrip" placeholder="' + flexygo.localization.translate('dependecymanager.description') + '" value="{{Descrip}}" ></flx-text>';
                    template += '</div>';
                    template += '</div>';
                    template += '</div>';
                    template += ' </li>';
                    return template;
                }
            }
            wc.FlxDependencyManagerElement = FlxDependencyManagerElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-dependencymanager', flexygo.ui.wc.FlxDependencyManagerElement);
//# sourceMappingURL=flx-dependencymanager.js.map