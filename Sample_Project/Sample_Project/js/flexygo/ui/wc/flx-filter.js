/**
 * @namespace flexygo.ui.wc
 */
var flexygo;
(function (flexygo) {
    var ui;
    (function (ui) {
        var wc;
        (function (wc_1) {
            function loadSavedSearches(objectname, module, btn) {
                var cntMenu = $('flx-contextmenu')[0];
                if (!cntMenu.hideMenu(btn)) {
                    //list: FlxList | FlxSearch;
                    let list = module.find('flx-list, flx-kanban, flx-timeline')[0];
                    if (!list) {
                        list = module.find('flx-search')[0];
                    }
                    let menuUl = $('<ul/>');
                    let wcFil = module.find('flx-filter')[0];
                    for (let key in list.savedSearches) {
                        let search = list.savedSearches[key];
                        let dv = search.Name.substring(0, parseFloat('25'));
                        if (search.Name.length > 25)
                            dv = dv + '...';
                        let nNode = $('<li><span class="left" title="' + search.Name + '">' + dv + '</span><span style="min-width:5px" class="right removesearch" class="txt-danger removesearch" title= "delete" >&nbsp;&nbsp; x </span><div style="clear: both;"></div></li>').attr('Id', key).attr('SearchId', search.SearchId).attr('Generic', search.Generic.toString());
                        if (search.Generic) {
                            if (flexygo.context.currentRoleId != 'admins') {
                                nNode.find('span.removesearch').remove();
                            }
                            menuUl.prepend(nNode);
                        }
                        else {
                            menuUl.append(nNode);
                        }
                        nNode.on('click', (e) => {
                            let SearchId = $(e.currentTarget).attr('SearchId');
                            let Id = $(e.currentTarget).attr('Id');
                            //establish search filter incase it is different from current one
                            wcFil.renderFilter(SearchId);
                            //establish saved filter values
                            wcFil.setSavedFilterValues(Id);
                        });
                        nNode.find('.removesearch').on('click', (e) => {
                            e.stopPropagation();
                            let resultCallback = (result) => {
                                if (result) {
                                    let Id = $(e.currentTarget).closest('li').attr('Id');
                                    if (wcFil.removeSearchValue(Id)) {
                                        delete list.savedSearches[Id];
                                        $(e.currentTarget).closest('li').remove();
                                    }
                                }
                            };
                            flexygo.msg.confirm(flexygo.localization.translate('flxlist.removecurrentfiltervalues'), resultCallback);
                        });
                    }
                    // append separator only if there are existing nodes
                    if (menuUl.children().length > 0) {
                        let nConfig = '<li class="separator"/>';
                        if ((menuUl.children().filter('[generic="true"]:last').index() + 1) < menuUl.children().length) {
                            menuUl.children().filter('[generic="true"]:last').after(nConfig);
                        }
                        menuUl.append(nConfig);
                    }
                    // Append add node
                    let nNode = $('<li><span><i class="flx-icon icon-save-2" /> ' + flexygo.localization.translate('flxlist.currentfiltervalues') + '</span></li>');
                    menuUl.append(nNode);
                    nNode.on('click', (e) => {
                        wcFil.saveSearchValue();
                    });
                    cntMenu.showMenu(menuUl, btn);
                }
            }
            wc_1.loadSavedSearches = loadSavedSearches;
            function loadFilter(objectname, module, btn) {
                var cntMenu = $('flx-contextmenu')[0];
                if (!cntMenu.hideMenu(btn)) {
                    let list = module.find('flx-list, flx-kanban, flx-timeline')[0];
                    if (!list) {
                        list = module.find('flx-search')[0];
                    }
                    let actives = flexygo.storage.local.get('activeFilters');
                    let menuUl = $('<ul/>');
                    let wc = module[0];
                    let wcFil = module.find('flx-filter')[0];
                    let filkey = wc.objectname + '-' + wc.moduleName;
                    for (let key in list.searchSettings) {
                        let fil = list.searchSettings[key];
                        let ico = (fil.Type.toLowerCase() === 'text') ? "icon-text" : "icon-filter-1";
                        let style = (actives && actives[filkey] && actives[filkey] === key) ? "txt-outstanding" : "";
                        let nNode = $('<li><span class="' + style + '"><i class="flx-icon ' + ico + '" /> ' + fil.Name + '</span></li>').attr('filterId', key);
                        menuUl.append(nNode);
                        nNode.on('click', (e) => {
                            let filId = $(e.currentTarget).attr('filterId');
                            wcFil.renderFilter(filId);
                        });
                    }
                    if (menuUl.children().length >= 0) {
                        let nNode = $('<li><span><i class="flx-icon icon-filter-remove" /> ' + flexygo.localization.translate('flxeditgrid.hide') + '</span></li>');
                        menuUl.append(nNode);
                        nNode.on('click', (e) => {
                            wcFil.renderFilter(null);
                        });
                    }
                    let nConfig = $('<li class="separator"></li><li class="btnConfig"><span><i class="flx-icon icon-admon" /> ' + flexygo.localization.translate('flxeditgrid.settings') + '</span></li>');
                    menuUl.append(nConfig);
                    nConfig.on('click', (e) => {
                        flexygo.debug.manageFilters(objectname, null, false, module);
                    });
                    cntMenu.showMenu(menuUl, btn);
                }
            }
            wc_1.loadFilter = loadFilter;
            function loadPresets(objectname, module, btn) {
                var cntMenu = $('flx-contextmenu')[0];
                if (!cntMenu.hideMenu(btn)) {
                    let list = module.find('flx-list, flx-kanban, flx-timeline')[0];
                    if (!list) {
                        list = module.find('flx-search')[0];
                    }
                    let menuUl = $('<ul/>');
                    for (let key in list.presets) {
                        let iconClass = '';
                        let titleClass = '';
                        let preset = list.presets[key];
                        if (preset.IconClass) {
                            iconClass = preset.IconClass;
                        }
                        if (preset.TitleClass) {
                            titleClass = preset.TitleClass;
                        }
                        let nNode = $('<li><span><i class="icon-margin-right ' + preset.IconName + ' ' + iconClass + '" /><span class="' + titleClass + '"> ' + preset.Title + '</span></span></li>').attr('presetName', key);
                        nNode.on('click', (e) => {
                            list.setPreset(key, preset.Title, preset.IconName + ' ' + iconClass);
                        });
                        menuUl.append(nNode);
                    }
                    if ((list.presets) && (Object.keys(list.presets).length > 0)) {
                        let nNode = $('<li><span><i class="icon-margin-right fa fa-search-plus " /><span class=""> ' + flexygo.localization.translate('flxfilter.showall') + '</span></span></li>').attr('presetName', null);
                        nNode.on('click', (e) => {
                            list.setPreset(null, null, null);
                        });
                        menuUl.append(nNode);
                        menuUl.append($('<li class="separator" > </li>'));
                    }
                    cntMenu.showMenu(menuUl, btn);
                }
            }
            wc_1.loadPresets = loadPresets;
            /**
           * Class for the FlxFilterInfo .
           *
           * @class FlxFilterInfo
           * @constructor
           * @return {FlxFilterInfo}
           */
            class FlxFilterInfo {
            }
            wc_1.FlxFilterInfo = FlxFilterInfo;
            /**
        * Class for the FlxFilterElement .
        *
        * @class FlxFilterElement
        * @constructor
        * @return {FlxFilterElement}
        */
            class FlxFilterElement extends HTMLElement {
                constructor() {
                    super();
                    this.key = null;
                    this.active = null;
                    this.settings = null;
                    this.grid = null;
                }
                /**
               * Initializes component.
               * @method init
               */
                init() {
                    let me = $(this);
                    let activeFilters = flexygo.storage.local.get('activeFilters');
                    if (activeFilters && this.key != null) {
                        if (typeof activeFilters[this.key] != 'undefined') {
                            this.renderFilter(activeFilters[this.key]);
                        }
                    }
                    if (this.settings) {
                        let module = me.closest('flx-module')[0];
                        if (module) {
                            let moduleName = module.moduleName;
                            if (module.componentString.includes('moduletab')) {
                                let list = $(module).find('flx-list, flx-kanban, flx-timeline')[0];
                                moduleName = list.moduleName;
                            }
                            let history = flexygo.history.get(me);
                            if (history && history.filtersValues && history.filtersValues[moduleName]) {
                                let state = history.filtersValues[moduleName];
                                this.active = state.activeFilter;
                                this.renderFilter(this.active, state.properties);
                            }
                        }
                    }
                }
                /**
               * Refresh to rerender filter.
               * @method refresh
               */
                refresh() {
                    //if (this.grid) {
                    //    this.grid.init();
                    //}
                    this.renderFilter(this.active);
                }
                /**
              * Render filter.
              * @method renderFilter
              */
                renderFilter(active, filterValues) {
                    let me = $(this);
                    this.saveActiveFilter(active);
                    this.active = active;
                    me.empty();
                    me.removeClass('active');
                    me.closest('flx-module').find('.filterButtons').remove();
                    let moduleWidth = 0;
                    moduleWidth = me.closest('flx-module').width() / me.closest('#mainContent').width() * 100;
                    if (active != null && this.settings[active]) {
                        this.setProperties(this.settings[active].Properties);
                        if (this.settings[active].Type.toLowerCase() === 'text') {
                            let placeholder = flexygo.localization.translate('flxfilter.searchplaceholder');
                            let value = "";
                            $.each(this.properties, (i, prop) => {
                                placeholder += prop.Label + ", ";
                            });
                            placeholder = placeholder.trim();
                            placeholder = placeholder.substring(0, placeholder.length - 1);
                            let txtVal = (filterValues && filterValues.length > 0) ? filterValues[0].value : '';
                            me.html('<div class="search col-12"><input type="search" class="form-control" placeholder="' + placeholder + '" value="' + txtVal + '"></input></div>');
                        }
                        else {
                            $.each(this.properties, (i, prop) => {
                                let propCtl = '';
                                let propValue = '';
                                let propText = '';
                                if (filterValues) {
                                    $.each(filterValues, (j, fil) => {
                                        if (prop.ObjectName === fil.objectname && prop.Name === fil.objectproperty) {
                                            propValue = fil.value;
                                            propText = fil.text;
                                            return false;
                                        }
                                    });
                                }
                                if (prop.Type.toLowerCase() == 'check') {
                                    propCtl += '<div class="item col-3 col-s-6 text-muted">';
                                    propCtl += '    <div data-tag="control" class="filter-control filter-check">';
                                    propCtl += '<label>' + prop.Label + '&nbsp; </label><' + prop.WebComponent + ' object="' + prop.ObjectName + '" path="' + prop.ObjectPath + '" property="' + prop.Name + '" filtertype="' + prop.Type + '" value="' + propValue + '" />';
                                    propCtl += '    </div>';
                                    propCtl += '</div>';
                                }
                                else {
                                    propCtl += '<div class="item ' + (moduleWidth <= 40 ? "col-12" : "col-3") + ' col-s-12 text-muted">';
                                    propCtl += '    <div data-tag="control" class="filter-control">';
                                    propCtl += '<' + prop.WebComponent + ' object="' + prop.ObjectName + '" path="' + prop.ObjectPath + '" property="' + prop.Name + '" filtertype="' + prop.Type + '" value="' + propValue + '" text="' + propText + '"/>';
                                    propCtl += '    </div>';
                                    propCtl += '</div>';
                                }
                                me.append(propCtl);
                            });
                            me.find("div[data-tag=control] input").prop('required', false);
                        }
                        if (me.length > 0) {
                            me.addClass('active');
                        }
                        me.on('keypress', (e) => {
                            if (e.which == 13) {
                                e.preventDefault();
                                this.applyFilters();
                            }
                        });
                        let btnApply = $('<button class="btn btn-default txt-success"><i class="flx-icon icon-search"></i></button>');
                        let btnClear = $('<button class="btn btn-default"><i class="flx-icon icon-clean"></i></button>');
                        let filterBtn = $('<div class="filterButtons btn-group"></div>');
                        let itm = me.closest('flx-module').find('.moduleToolbar');
                        itm.append(filterBtn);
                        filterBtn.append(btnApply).append(btnClear);
                        btnApply.on('click', () => { this.applyFilters(); });
                        btnClear.on('click', () => { this.clearFilters(); });
                    }
                }
                saveActiveFilter(active) {
                    let activeFilters = flexygo.storage.local.get('activeFilters');
                    if (activeFilters == null) {
                        activeFilters = new Object();
                    }
                    if (this.key != null) {
                        if (active == null) {
                            delete activeFilters[this.key];
                        }
                        else {
                            activeFilters[this.key] = active;
                        }
                        flexygo.storage.local.add('activeFilters', activeFilters);
                    }
                }
                setProperties(props) {
                    this.properties = {};
                    $.each(props, (i, e) => {
                        let prop = e.Config;
                        prop.WebComponent = e.WebComponent;
                        prop.Type = e.Type;
                        prop.ObjectName = e.ObjectName;
                        prop.ObjectPath = e.ObjectPath;
                        prop.PlaceHolder = e.Label;
                        prop.Locked = false;
                        prop.AllowNewFunction = "";
                        prop.AllowNewObject = "";
                        prop.AllowNewDefaults = "";
                        prop.ObjNameLink = "";
                        prop.SearchCollection = e.Config.SearchCollection;
                        prop.SearchFunction = e.Config.SearchFunction;
                        prop.SearchReturnFields = e.Config.SearchReturnFields;
                        this.properties[prop.ObjectName + '-' + prop.Name] = prop;
                    });
                }
                /**
               * Pushes filter values into filter object.
               * @method getfilterValues
               */
                getfilterValues() {
                    let me = $(this);
                    let ctls = me.find('[property]');
                    let filters = [];
                    let type = this.settings[this.active].Type.toLowerCase();
                    if (type == 'text') {
                        let val = me.find("input[type='search']").val();
                        let txt = me.find("input[type='search']").text();
                        if (!val || val.length === 0) {
                            this.clearFilters();
                            return;
                        }
                        $.each(this.settings[this.active].Properties, (i, e) => {
                            filters.push({
                                objectname: e.ObjectName,
                                objectproperty: e.PropertyName,
                                objectpath: e.ObjectName,
                                value: val,
                                text: txt,
                                filtertype: 'text'
                            });
                        });
                    }
                    else {
                        $.each(ctls, (i, e) => {
                            let ctl = $(e);
                            let txt = ctl.text();
                            var txts = Array();
                            if (ctl.is('flx-multicombo')) {
                                ctl.find(".tag").each(function (i, ob) {
                                    txts.push($(ob).text());
                                });
                                txt = txts.join("|");
                            }
                            let val = e.getValue();
                            if (typeof val != 'undefined' && val != null && val !== '' && val != '|') {
                                filters.push({
                                    objectname: ctl.attr('object'),
                                    objectproperty: ctl.attr('property'),
                                    objectpath: ctl.attr('path'),
                                    value: val,
                                    text: txt,
                                    filtertype: ctl.attr('filtertype').toLowerCase()
                                });
                            }
                        });
                    }
                    this.grid.filterValues = filters;
                }
                /**
                * Applies current filters.
                * @method applyFilters
                */
                applyFilters() {
                    this.getfilterValues();
                    this.grid.activeFilter = this.active;
                    this.grid.setFilter();
                    this.saveFilterValueHistory(this.active, this.grid.filterValues);
                    let ev = {
                        class: "module",
                        type: "filtered",
                        sender: $(this).closest('flx-module')[0],
                        masterIdentity: this.settings[this.active].ObjectName,
                        detailIdentity: this.active
                    };
                    flexygo.events.trigger(ev);
                }
                /**
               * Assignes current saved filter values to curren filter.
               * @method setSavedFilterValues
               * @param {string} Id - Filter id
               */
                setSavedFilterValues(Id) {
                    let objects = JSON.parse(this.grid.savedSearches[Id].Values);
                    let me = $(this);
                    this.clearFilters(true);
                    if (this.settings[this.active].Type.toLowerCase() == 'text') {
                        let ctl = me.find('input')[0];
                        ctl.value = objects[0].value;
                    }
                    else {
                        for (let key in objects) {
                            let ctl = me.find('[property=' + objects[key].objectproperty + ']')[0];
                            if (objects[key].filtertype == 'number-range' || objects[key].filtertype == 'date-range') {
                                let valMin = objects[key].value.split('|')[0];
                                let valMax = objects[key].value.split('|')[1];
                                ctl.setValue(valMin, valMax);
                            }
                            else {
                                ctl.setValue(objects[key].value, objects[key].text);
                            }
                        }
                    }
                    this.applyFilters();
                }
                /**
             * Saves user search values to DB.
             * @method saveSearchValue
                     */
                saveSearchValue() {
                    if (this.active) {
                        $.sweetModal({
                            title: flexygo.localization.translate('flxlist.savefilter'),
                            width: '33%',
                            content: `<div style="overflow: hidden;">
                              <div class="` + ((flexygo.context.currentRoleId != 'admins') ? `col-12` : `col-10`) + `">
                              <label>` + flexygo.localization.translate('flxlist.name') + `:</label>
                              <div>
                                <flx-text type="text"  id="name"/>
                              </div>
                            </div>
                            <div class="col-2 ` + ((flexygo.context.currentRoleId != 'admins') ? `hide` : ``) + `">
                              <label>` + flexygo.localization.translate('flxlist.generic') + `:</label>
                              <div>
                                <flx-check id="generic"/>
                              </div>
                            </div>
                            </div>`,
                            buttons: [
                                {
                                    label: flexygo.localization.translate('flxlist.save'),
                                    classes: 'bg-info',
                                    action: (sweetModal) => {
                                        this.getfilterValues();
                                        var obj = new flexygo.obj.Entity('sysUserSearchValue');
                                        obj.read();
                                        //Set Values
                                        obj.data['Name'].Value = sweetModal.$overlay.find('flx-text#name')[0].getValue();
                                        obj.data['Values'].Value = JSON.stringify(this.grid.filterValues);
                                        obj.data['SearchId'].Value = this.active;
                                        obj.data['Generic'].Value = (flexygo.context.currentRoleId != 'admins') ? false : sweetModal.$overlay.find('flx-check#generic')[0].getValue();
                                        if (obj.insert()) {
                                            let newsearch = ({
                                                Id: obj.data['Id'].Value,
                                                Name: obj.data['Name'].Value,
                                                SearchId: obj.data['SearchId'].Value,
                                                Values: obj.data['Values'].Value,
                                                Generic: obj.data['Generic'].Value
                                            });
                                            if (!this.grid.savedSearches) {
                                                this.grid.savedSearches = [];
                                            }
                                            this.grid.savedSearches[newsearch.Id] = newsearch;
                                        }
                                    }
                                }
                            ]
                        });
                    }
                    else {
                        flexygo.msg.alert(flexygo.localization.translate('flxlist.selectfilterfirst'));
                    }
                }
                /**
               * Parses edit string
               * @method parseEditString
               * @param {string} str
               * @return {string}
               */
                parseEditString(str) {
                    let me = $(this);
                    let props = me.find('[property]');
                    let obj = new Object();
                    for (let i = 0; i < props.length; i++) {
                        let prop = $(props[i])[0];
                        obj[prop.property] = prop.getValue();
                    }
                    return flexygo.utils.parser.compile(obj, str, this);
                }
                /**
           * Removes user search values from DB.
           * @method removeSearchValue
           * @param {string} id - Search Id
           */
                removeSearchValue(id) {
                    var obj = new flexygo.obj.Entity('sysUserSearchValue', 'Id=' + id);
                    if (obj.delete()) {
                        return true;
                    }
                    return false;
                }
                /**
               * Saves filter values to history.
               * @method saveFilterValueHistory
               * @param {string} active - active
               * @param { FlxFilterInfo[]} filtes - filter info
               */
                saveFilterValueHistory(active, filters) {
                    let me = $(this);
                    let module = me.closest('flx-module')[0];
                    let moduleName = module.moduleName;
                    if (module.componentString.includes('moduletab')) {
                        let list = $(module).find('flx-list, flx-kanban, flx-timeline')[0];
                        moduleName = list.moduleName;
                    }
                    let history = flexygo.history.get(me);
                    let page = (this.grid && this.grid.page) ? this.grid.page : 0;
                    if (!history.filtersValues) {
                        history.filtersValues = new flexygo.nav.ModuleFilterHistory();
                    }
                    let histElem = {
                        activeFilter: active,
                        activePage: page,
                        properties: filters
                    };
                    history.filtersValues[moduleName] = histElem;
                    flexygo.history.replace(history, me, false);
                    flexygo.history.historyLog.add('', history.description, history);
                }
                /**
             * Clears filter values.
             * @method clearFilters
             * @param {boolean} norefresh - disable automatic refreshing
             */
                clearFilters(norefresh = false) {
                    let me = $(this);
                    let ctls = me.find('[property]');
                    $.each(ctls, (i, ctl) => {
                        let wc = $(ctl)[0];
                        wc.setValue(null);
                    });
                    me.find("input[type='search']").val("");
                    this.grid.filterValues = null;
                    let ev = {
                        class: "module",
                        type: "filtered",
                        sender: me.closest('flx-module')[0],
                        masterIdentity: this.settings[this.active].ObjectName,
                        detailIdentity: this.active
                    };
                    flexygo.events.trigger(ev);
                    if (!norefresh) {
                        this.grid.refresh();
                        this.saveFilterValueHistory(this.active, null);
                    }
                }
            }
            wc_1.FlxFilterElement = FlxFilterElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-filter', flexygo.ui.wc.FlxFilterElement);
//# sourceMappingURL=flx-filter.js.map