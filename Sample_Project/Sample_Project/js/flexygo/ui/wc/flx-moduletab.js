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
            * Library for the FlxModuleTabElement web component.
            *
            * @class FlxModuleTabElement
            * @constructor
            * @return {FlxModuleTabElement}
            */
            class FlxModuleTabElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                   * Set when component is attached to DOM
                   * @property connected {boolean}
                   */
                    this.connected = false;
                    this.moduleName = null;
                    this.pageName = null;
                    this.mode = 'default';
                    this.config = null;
                    this.activeModule = null;
                    this.activeTitle = '';
                    this.moduleInitClass = null;
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = $(this);
                    this.connected = true;
                    let tabMode = element.attr('mode');
                    if (tabMode && tabMode !== '') {
                        this.mode = tabMode;
                    }
                    this.moduleName = element.attr("modulename");
                    if (this.moduleName) {
                        if (element.attr('manualInit') != 'true') {
                            this.init();
                        }
                    }
                }
                /**
               * Array of observed attributes.
               * @property observedAttributes {Array}
               */
                static get observedAttributes() {
                    return ['modulename', 'mode'];
                }
                /**
               * Fires when the attribute value of the element is changed.
               * @method attributeChangedCallback
               */
                attributeChangedCallback(attrName, oldVal, newVal) {
                    let isDirty = false;
                    if (!this.connected) {
                        return;
                    }
                    if (attrName.toLowerCase() == 'mode' && newVal && newVal != '') {
                        this.mode = newVal;
                        if (this.mode) {
                            isDirty = true;
                        }
                    }
                    if (attrName.toLowerCase() == 'modulename' && newVal && newVal != '') {
                        this.moduleName = newVal;
                        if (this.moduleName) {
                            isDirty = true;
                        }
                    }
                    if (isDirty) {
                        this.refresh();
                    }
                }
                refresh() {
                    if ($(this).attr('manualInit') != 'true') {
                        this.init();
                    }
                }
                init() {
                    let me = $(this);
                    me.removeAttr('manualInit');
                    $(this).closest('flx-module').find('.flx-noInitContent').remove();
                    me.html('');
                    let params = {
                        ObjectName: me.attr('ObjectName'),
                        ObjectWhere: me.attr('ObjectWhere'),
                        ModuleName: this.moduleName
                        //PageName: flexygo.history.getPageName(me)
                    };
                    this.pageName = flexygo.history.getPageName(me);
                    flexygo.ajax.post('~/api/Page', 'GetPageTabModules', params, (response) => {
                        if (response) {
                            me.empty();
                            this.config = flexygo.utils.sortObject(response, 'TabOrder');
                            this.render();
                        }
                    }, null, () => { this.stopLoading(); }, () => { this.startLoading(); });
                }
                render() {
                    let me = $(this);
                    let rendered = '';
                    let module;
                    let tabActiveMod = null;
                    /*remove default paddding from body*/
                    me.closest('.cntBody').addClass("tabPadding");
                    /*Create list elements*/
                    let tabclass = 'nav nav-tabs';
                    if (this.mode == 'default') {
                        /* Change class for mobile default tab */
                        if (flexygo.utils.isSizeMobile()) {
                            tabclass = 'list-piped';
                            /* add tab pills if more than one level*/
                        }
                        else if (me.parents('flx-moduletab').length > 0) {
                            tabclass = 'nav nav-pills';
                            //tabclass = 'tabbutton';
                        }
                    }
                    else {
                        tabclass = 'buttontab';
                    }
                    //check if empty
                    if (this.config.length == 0) {
                        rendered += ' <ul class="' + tabclass + '"><li class="active"><a data-toggle="tab" href="#hr1"> <i class="flx-icon icon-danger icon-margin-right"></i>' + flexygo.localization.translate('moduletab.emptytabs') + '</a></li></ul>';
                        rendered += '<div class="row empty-tab clear-both"><i class="flx-icon icon-information-2 icon-lg icon-margin-right"></i><span><strong>Info!</strong> ' + flexygo.localization.translate('moduletab.nocontent') + '</span></div>';
                        me.html(rendered);
                    }
                    else {
                        //Get active module for tabs from local storage
                        let tabName = this.pageName + '-' + this.moduleName;
                        let tabs = flexygo.storage.local.get('activeTabs');
                        if (tabs != null) {
                            tabActiveMod = tabs[tabName];
                        }
                        if (typeof tabActiveMod != 'undefined' && tabActiveMod != null) {
                            let activeTabExists = false;
                            for (let i = 0; i < this.config.length; i++) {
                                if (tabActiveMod == this.config[i].ModuleName && this.config[i].InitHidden == false) {
                                    activeTabExists = true;
                                }
                            }
                            if (!activeTabExists) {
                                tabActiveMod = null;
                            }
                        }
                        /*Build default active module*/
                        let activeModId;
                        for (let i = 0; i < this.config.length; i++) {
                            let mod = this.config[i];
                            if (((typeof tabActiveMod == 'undefined' || tabActiveMod == null) && i == 0) || tabActiveMod == mod.ModuleName) {
                                let componentString = mod.WebComponent;
                                if (mod.Params) {
                                    componentString += ' ' + mod.Params;
                                }
                                activeModId = i;
                                module = $('<' + componentString + ' />').attr('ObjectName', me.attr('ObjectName')).attr('ObjectWhere', me.attr('ObjectWhere')).attr('isClone', me.attr('isClone')).attr('id', 'mod-' + mod.ModuleName).attr('modulename', mod.ModuleName);
                                this.activeModule = mod;
                                this.activeTitle = mod.Title;
                            }
                        }
                        me.empty();
                        if (tabclass == 'buttontab') {
                            let holder = $('<div class="tab-button-holder"/ >');
                            let btn = $('<button class="tab-button" ><i class="' + this.activeModule.IconClass + '"></i><span class="bttext">' + this.activeTitle + '</span><span class="caret"></span></button>');
                            holder.append(btn);
                            me.append(holder);
                            btn.on('click', () => {
                                var cntMenu = $('flx-contextmenu')[0];
                                if (!cntMenu.hideMenu(btn)) {
                                    let menuUl = $('<ul class="flx-contextmenu"/>');
                                    for (let i = 0; i < this.config.length; i++) {
                                        let mod = this.config[i];
                                        let iconClass = mod.IconClass;
                                        let tabtext = mod.Title;
                                        let activeStr = '';
                                        if (i == activeModId) {
                                            activeStr = 'active';
                                        }
                                        /*add list element*/
                                        let iconmargin = '';
                                        if (iconClass.length > 0) {
                                            iconmargin = ' icon-margin-right';
                                        }
                                        let nNode = $('<li data-modname="' + mod.ModuleName + '" class="' + activeStr + '" title= "' + tabtext + '"  > <span><i class="' + iconClass + iconmargin + '" > </i><span>&nbsp;' + tabtext + '</span> </span></li>');
                                        nNode.on('click', () => {
                                            this.showModule(i);
                                            $(this).find('button span.bttext').html(this.activeTitle);
                                            $(this).find('button i').attr('class', this.activeModule.IconClass);
                                        });
                                        menuUl.append(nNode);
                                    }
                                    cntMenu.showMenu(menuUl, btn);
                                }
                            });
                        }
                        else {
                            rendered += ' <ul class="' + tabclass + '">';
                            // run throught tab modules
                            for (let i = 0; i < this.config.length; i++) {
                                let mod = this.config[i];
                                let iconClass = mod.IconClass;
                                let tabtext = mod.Title;
                                let activeStr = '';
                                if (i == activeModId) {
                                    activeStr = 'active';
                                }
                                let headerClass = mod.HeaderClass;
                                /*add list element*/
                                let iconmargin = '';
                                if (iconClass.length > 0) {
                                    iconmargin = ' icon-margin-right';
                                }
                                if (mod.InitHidden) {
                                    rendered += '<li data-modname="' + mod.ModuleName + '" init="false" class="hidden ' + activeStr + '">';
                                }
                                else {
                                    rendered += '<li data-modname="' + mod.ModuleName + '"  class="' + activeStr + '">';
                                }
                                rendered += '<a class="' + headerClass + '" data-toggle="tab" href="#hr1" data-module-index="' + i + '" > <i class="' + iconClass + iconmargin + '"></i><span class="tabTitle">' + tabtext + '</span><b data-modname="' + mod.ModuleName + '" class="clickable flx-icon icon-margin-left icon-settings develop-only text-muted"></b></a></li>';
                            }
                            rendered += '</ul>';
                        }
                        rendered += '<div class="modulediv"></div>';
                        me.append(rendered);
                    }
                    this.saveModulePresetHistory(this.activeModule);
                    /*Add module to body*/
                    module.is("flx-list[mode=list]") ? me.find(".modulediv").addClass("overflowx") : me.find(".modulediv").removeClass("overflowx");
                    let cont = me.children('.modulediv');
                    me.parents('flx-module').each((i, e) => {
                        e.objectdefaults = this.activeModule.ObjectDefaults;
                    });
                    cont.append(module);
                    this.moduleInitClass = cont.attr('class');
                    cont.addClass(this.activeModule.ModuleClass);
                    me.find('[data-module-index]').on('click', (ev) => {
                        this.showModule(parseInt($(ev.currentTarget).attr('data-module-index')));
                    });
                    me.find('b.icon-settings').on('click', (ev) => {
                        ev.stopPropagation();
                        ev.preventDefault();
                        flexygo.nav.openPage('edit', 'sysModule', "moduleName='" + $(ev.currentTarget).attr('data-modname') + "'", null, 'popup', true);
                    });
                }
                showModule(modIndex) {
                    /*Render given module in body*/
                    let me = $(this);
                    let mod = this.config[modIndex];
                    this.activeModule = mod;
                    this.activeTitle = mod.Title;
                    let componentString = mod.WebComponent;
                    if (mod.Params) {
                        componentString += ' ' + mod.Params;
                    }
                    /*let hist = flexygo.history.get(me);
                    hist.filtersValues = null;
                    flexygo.history.replace(hist, me);*/
                    /*save preset configuration of the new module if its not set*/
                    this.saveModulePresetHistory(mod);
                    me.parents('flx-module').find('.cntButtons .pager').remove();
                    me.parents('flx-module').find('.cntBodyHeader, .cntBodyFooter').find('*').not('.ctnArrowHeader,.ctnArrowHeader > *').remove();
                    $.each(me.parents('flx-module'), (i, e) => {
                        e.objectdefaults = mod.ObjectDefaults;
                    });
                    let module = $('<' + componentString + ' />').attr('ObjectName', me.attr('ObjectName')).attr('ObjectWhere', me.attr('ObjectWhere')).attr('id', 'mod-' + mod.ModuleName).attr('modulename', mod.ModuleName);
                    /*remove previous module*/
                    me.children('.modulediv').empty();
                    me.children('.modulediv').append(module);
                    me.children('.modulediv').removeClass().addClass(this.moduleInitClass).addClass(this.activeModule.ModuleClass);
                    if (module.is('flx-list[mode=list]')) {
                        me.find('.modulediv').addClass("overflowx");
                    }
                    else {
                        me.find('.modulediv').removeClass("overflowx");
                    }
                    /*save active tab for next time*/
                    let tabName = this.pageName + '-' + this.moduleName;
                    let tabs = flexygo.storage.local.get('activeTabs');
                    if (tabs == null) {
                        tabs = {};
                    }
                    tabs[tabName] = mod.ModuleName;
                    flexygo.storage.local.add('activeTabs', tabs);
                }
                saveModulePresetHistory(module) {
                    let me = $(this);
                    let history = flexygo.history.get(me);
                    if (!history) {
                        history = new flexygo.nav.FlexygoHistory();
                    }
                    if (!history.presetsValues) {
                        history.presetsValues = new flexygo.nav.ModulePresetHistory();
                    }
                    if (!history.presetsValues[module.ModuleName]) {
                        history.presetsValues[module.ModuleName] = new flexygo.nav.PresetHistoryValue();
                        history.presetsValues[module.ModuleName].presetId = module.PresetName;
                        history.presetsValues[module.ModuleName].presetText = module.PresetText;
                        history.presetsValues[module.ModuleName].presetIcon = module.PresetIcon;
                    }
                    flexygo.history.replace(history, me, false);
                }
                translate(str) {
                    return flexygo.localization.translate(str);
                }
                startLoading() {
                    if ($(this).parents('flx-module').length > 0) {
                        $(this).parents('flx-module')[0].startLoading();
                    }
                }
                stopLoading() {
                    if ($(this).parents('flx-module').length > 0) {
                        $(this).parents('flx-module')[0].stopLoading();
                    }
                }
            }
            wc.FlxModuleTabElement = FlxModuleTabElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-moduletab', flexygo.ui.wc.FlxModuleTabElement);
//# sourceMappingURL=flx-moduletab.js.map