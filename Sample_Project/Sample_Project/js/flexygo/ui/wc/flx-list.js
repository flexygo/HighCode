/**
 * @namespace flexygo.ui.wc
 */
var flexygo;
(function (flexygo) {
    var ui;
    (function (ui) {
        var wc;
        (function (wc_1) {
            /**
            * Library for the FlxListElement web component.
            *
            * @class FlxListElement
            * @constructor
            * @return {FlxListElement}
            */
            class FlxListElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                   * Set when component is attached to DOM
                   * @property connected {boolean}
                   */
                    this.connected = false;
                    this.mode = null;
                    this.objectname = null;
                    this.childname = null;
                    this.objectwhere = null;
                    this.processwhere = null;
                    this.data = null;
                    this.tHeader = null;
                    this.tBody = null;
                    this.tFooter = null;
                    this.tCSSText = null;
                    this.tScriptText = null;
                    this.pager = null;
                    this.pagerConfig = null;
                    this.additionalWhere = '';
                    this.cryptedSql = null;
                    this.removeKeys = false;
                    this.page = 0;
                    this.pageSize = null;
                    this.pagesButtons = 3;
                    this.maxRows = 0;
                    this.maxPages = 0;
                    this.moduleName = null;
                    this.groups = null;
                    this.sortColumn = null;
                    this.sortAsc = false;
                    //orderStr: string = null;
                    //orderOpenQuote: string = null;
                    //orderCloseQuote: string = null;
                    this.orderObj = null;
                    this.viewId = null;
                    this.templateId = null;
                    this.presetId = null;
                    this.presetText = null;
                    this.presetIcon = null;
                    //flx-genericsearch:
                    this.filter = null;
                    //flx-filter
                    this.filters = null;
                    this.filterValues = null;
                    this.activeFilter = null;
                    this.buttons = null;
                    this.moduleButtons = null;
                    this.propArr = null;
                    this.templateKey = '';
                    this.searcher = null;
                    this.refreshing = null; //Set by FlxGenericSearchElement
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = $(this);
                    this.connected = true;
                    if (element.attr("modulename") && element.attr("modulename") != '') {
                        this.moduleName = element.attr("modulename");
                    }
                    else {
                        this.moduleName = 'sysmod-list-generic';
                    }
                    if (element.attr("templateid") && element.attr("templateid") != '') {
                        this.templateId = element.attr("templateid");
                    }
                    if (this.moduleName) {
                        if (element.attr('manualInit') != 'true') {
                            this.init();
                        }
                    }
                }
                /**
                * Fires when element is dettached to DOM
                * @method connectedCallback
                */
                disconnectedCallback() {
                    flexygo.events.off(this, "entity", "all", this.onEntityChanged);
                    flexygo.events.off(this, "property", "changed", this.onPropertyChanged);
                }
                /**
               * Array of observed attributes.
               * @property observedAttributes {Array}
               */
                static get observedAttributes() {
                    return ['modulename', 'objectname', 'objectwhere'];
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
                    if (this && attrName.toLowerCase() == 'modulename' && newVal && newVal != '') {
                        this.moduleName = newVal;
                        if (this.moduleName) {
                            isDirty = true;
                        }
                    }
                    if (this && attrName.toLowerCase() == 'objectname' && newVal && newVal != '') {
                        this.objectname = newVal;
                        if (this.objectname) {
                            isDirty = true;
                        }
                    }
                    if (this && attrName.toLowerCase() == 'objectwhere' && newVal && newVal != '') {
                        this.objectwhere = newVal;
                        if (this.objectwhere) {
                            isDirty = true;
                        }
                    }
                    if (this.connected === true && (isDirty === true)) {
                        this.init();
                    }
                }
                /**
                * Refresh the webcomponent
                * @method refresh
                */
                refresh() {
                    if ($(this).attr('manualInit') != 'true') {
                        this.initGrid(false, true);
                    }
                }
                /**
               * Init the webcomponent.
               * @method init
               */
                init() {
                    $(this).removeAttr('manualInit');
                    //Remove events from entity modification
                    flexygo.events.off(this, "entity", "all", this.onEntityChanged);
                    //Capture events from entity modification
                    flexygo.events.on(this, "entity", "all", this.onEntityChanged);
                    //Remove WebControl events
                    flexygo.events.off(this, "property", "changed", this.onPropertyChanged);
                    //Capture WebControl events
                    flexygo.events.on(this, "property", "changed", this.onPropertyChanged);
                    //Remove handler on DOM element remove
                    $(this).on("destroy", () => {
                        flexygo.events.off(this, "entity", "all", this.onEntityChanged);
                        flexygo.events.off(this, "property", "changed", this.onPropertyChanged);
                    });
                    let me = $(this);
                    let module = me.closest('flx-module')[0];
                    let history = flexygo.history.get(me);
                    let page = 0;
                    this.filterValues = null;
                    this.activeFilter = null;
                    this.orderObj = null;
                    if (history && history.filtersValues && history.filtersValues[module.moduleName]) {
                        let state = history.filtersValues[module.moduleName];
                        if (state.activeFilter) {
                            this.activeFilter = state.activeFilter;
                        }
                        if (state.properties) {
                            this.filterValues = state.properties;
                        }
                        if (state.activePage) {
                            page = state.activePage;
                        }
                    }
                    flexygo.ui.templates.setDefaultTemplate(this);
                    this.setDefaultOrder();
                    this.initGrid(true, true, page);
                }
                setDefaultOrder() {
                    let activeTemplatesOrder = flexygo.storage.local.get('activeTemplatesOrder');
                    if (activeTemplatesOrder) {
                        let key = this.getModuleFullId() + '|' + this.templateKey;
                        if (typeof activeTemplatesOrder[key] != 'undefined') {
                            this.orderObj = activeTemplatesOrder[key];
                        }
                        else {
                            this.orderObj = null;
                        }
                    }
                }
                saveDefaultOrder() {
                    let activeTemplatesOrder = flexygo.storage.local.get('activeTemplatesOrder');
                    let key = this.getModuleFullId() + '|' + this.templateKey;
                    if (activeTemplatesOrder == null) {
                        activeTemplatesOrder = new Object();
                    }
                    activeTemplatesOrder[key] = this.orderObj;
                    flexygo.storage.local.add('activeTemplatesOrder', activeTemplatesOrder);
                }
                onEntityChanged(e) {
                    //Filter event types
                    if (e.type === "inserted" && $(this).attr("mode") != "edit" || e.type === "updated" && $(this).attr("mode") != "edit" || e.type === "deleted") {
                        //Only same object as WebControl
                        if (this.objectname && flexygo.utils.areParents(e.masterIdentity.toLowerCase(), this.objectname.toLowerCase())) {
                            this.refresh();
                        }
                    }
                }
                setPreset(presetName, presetText, presetIcon) {
                    this.presetId = presetName;
                    this.presetText = presetText;
                    this.presetIcon = presetIcon;
                    this.initGrid(false, false);
                    let ev = {
                        class: "module",
                        type: "filtered",
                        sender: $(this).closest('flx-module')[0],
                        masterIdentity: (this.presetId) ? this.presets[this.presetId].ObjectName : this.objectname,
                        detailIdentity: this.presetId
                    };
                    flexygo.events.trigger(ev);
                }
                changePresetText() {
                    let me = $(this);
                    let bt = me.closest('flx-module').find('[data-type="presets"] span:first');
                    if (bt) {
                        bt.html(this.presetText + ' ');
                    }
                    let bti = me.closest('flx-module').find('[data-type="presets"] i:first');
                    bti.attr('class', this.presetIcon);
                }
                checkPresetDisplay() {
                    if (typeof this.presets == 'undefined') {
                        $(this).closest('flx-module').find('[data-type="presets"]').remove();
                    }
                }
                setFilter() {
                    this.initGrid(false, false);
                }
                /**
                * Init the grid.
                * @method initGrid
                * @param {boolean} refreshButtons
                * @param {boolean} refreshFilters
                * @param {number} newPage
                */
                initGrid(refreshButtons, refreshFilters, newPage) {
                    let me = $(this);
                    if (newPage) {
                        this.page = newPage;
                    }
                    else {
                        this.page = 0;
                    }
                    this.mode = me.attr('mode');
                    if (!this.mode || this.mode === '') {
                        this.mode = 'list';
                    }
                    let params = {
                        ObjectName: me.attr('ObjectName'),
                        ObjectWhere: me.attr('ObjectWhere'),
                        ModuleName: this.moduleName,
                        PageName: flexygo.history.getPageName(me),
                        page: this.page,
                        additionalWhere: this.additionalWhere,
                        orderInfo: this.orderObj,
                        mode: this.mode,
                        searchId: this.activeFilter,
                        filterValues: this.filterValues,
                        TemplateId: this.templateId,
                        ViewId: this.viewId,
                        PresetId: this.presetId
                    };
                    flexygo.ajax.post('~/api/List', 'getList', params, (response) => {
                        if (response) {
                            if (response.Template) {
                                let template = response.Template;
                                this.templateId = template.Id;
                                this.templatetype = template.TemplateType;
                                this.data = template.TableData;
                                this.tHeader = template.Header;
                                this.tBody = template.Body;
                                this.tFooter = template.Footer;
                                this.tEmpty = template.Empty;
                                this.tScriptText = template.ScriptText;
                                this.tCSSText = template.CSSText;
                                this.tModuleClass = template.ModuleClass;
                                this.objectname = template.ObjectName;
                                this.childname = response.ChildObjectName;
                                this.cryptedSql = template.TableSQL;
                                this.removeKeys = template.RemoveKeys;
                                this.pageSize = template.PageSize;
                                this.groups = template.Groups;
                                this.viewId = template.DataViewName;
                            }
                            this.processwhere = response.ObjectWhere;
                            this.properties = response.Properties;
                            for (let key in this.properties) {
                                this.properties[key].PlaceHolder = this.properties[key].Label;
                                if (this.mode == 'edit') {
                                    this.properties[key].ObjNameLink = '';
                                }
                            }
                            this.propArr = flexygo.utils.sortObject(this.properties, 'PositionY', 'PositionX');
                            let parentModule = me.closest('flx-module');
                            let wcModule = parentModule[0];
                            if (parentModule.length > 0) {
                                let parentModuleClass = wcModule.moduleClass;
                                if (wcModule.moduleInitClass && wcModule.moduleInitClass != '') {
                                    parentModule.attr('class', wcModule.moduleInitClass);
                                }
                                if (parentModuleClass && parentModuleClass != '') {
                                    parentModule.addClass(parentModuleClass);
                                }
                                if (this.tModuleClass && this.tModuleClass !== '') {
                                    parentModule.addClass(this.tModuleClass);
                                }
                                if (parentModule && wcModule) {
                                    if (refreshButtons) {
                                        if (response.Buttons) {
                                            this.moduleButtons = response.Buttons;
                                            let colWhere = this.processwhere;
                                            if (flexygo.selection.getArray(this.childname).length > 0) {
                                                colWhere = flexygo.selection.getFilterString(this.childname);
                                            }
                                            wcModule.setButtons(response.Buttons, response.ObjectName, colWhere);
                                        }
                                        wcModule.setObjectDescrip(response.Title);
                                    }
                                    else {
                                        if (response.Buttons) {
                                            this.moduleButtons = response.Buttons;
                                            let colWhere = this.processwhere;
                                            if (flexygo.selection.getArray(this.childname).length > 0) {
                                                colWhere = flexygo.selection.getFilterString(this.childname);
                                            }
                                            wcModule.refreshButtons(response.Buttons, response.ObjectName, colWhere);
                                        }
                                    }
                                }
                            }
                            if (response.RowButtons) {
                                this.buttons = response.RowButtons;
                            }
                            if (response.TemplateList) {
                                this.templateList = response.TemplateList;
                            }
                            if (response.ViewList) {
                                this.viewList = response.ViewList;
                            }
                            if (response.Pager) {
                                this.pagerConfig = response.Pager;
                            }
                            if (response.Presets) {
                                this.presets = response.Presets;
                            }
                            this.hasSearcher = response.Searcher;
                            this.render();
                            this.loadSearcher();
                            this.loadPager();
                            this.loadCount();
                            this.savedSearches = response.SavedSearches;
                            this.searchSettings = response.SearchSettings;
                            if (refreshFilters && response.SearchSettings) {
                                this.loadFilters(response.SearchSettings);
                            }
                        }
                    }, null, () => {
                        this.stopLoading();
                    }, () => {
                        this.startLoading();
                    });
                }
                /**
                 * Sets the parent module to start loading mode.
                 * @method startLoading
                 */
                startLoading() {
                    if ($(this).parents('flx-module').length > 0) {
                        $(this).parents('flx-module')[0].startLoading();
                    }
                }
                /**
                * Sets the parent module to stop loading mode.
                * @method stopLoading
                */
                stopLoading() {
                    if ($(this).parents('flx-module').length > 0) {
                        $(this).parents('flx-module')[0].stopLoading();
                    }
                }
                /**
                * Starts control rendering.
                * @method render
                */
                render() {
                    let me = $(this);
                    let rendered = '';
                    let defString = flexygo.history.getDefaults(this.objectname, me);
                    let wcMod = me.closest('flx-module')[0];
                    let def = null;
                    if (wcMod) {
                        def = wcMod.objectdefaults;
                    }
                    if (!def && defString && defString != '') {
                        def = JSON.parse(flexygo.utils.parser.replaceAll(defString, "'", '"'));
                    }
                    this.checkPresetDisplay();
                    if (this.presetId) {
                        this.changePresetText();
                    }
                    if (this.data.length > 0 || this.mode === 'edit') {
                        if (this.tHeader && this.tHeader !== '') {
                            let render = flexygo.utils.parser.recursiveCompile(this.data[0], this.tHeader, this);
                            render = flexygo.utils.parser.recursiveCompile(def, render, this);
                            rendered += render;
                        }
                        if (this.tBody && this.tBody !== '') {
                            let lastItem = null;
                            if (this.data.length > 0) {
                                rendered += flexygo.utils.parser.paintGroupHeader(this.data[0], this.groups, this);
                                for (let i = 0; i < this.data.length; i++) {
                                    let notExclude = false;
                                    if (this.filter && this.filter !== '') {
                                        for (let key in this.data[i]) {
                                            if (String(this.data[i][key]).toLocaleLowerCase().indexOf(this.filter.toLocaleLowerCase()) !== -1) {
                                                notExclude = true;
                                                break;
                                            }
                                        }
                                    }
                                    else {
                                        notExclude = true;
                                    }
                                    if (notExclude) {
                                        rendered += flexygo.utils.parser.controlGroup(lastItem, this.data[i], this.groups, this);
                                        rendered += flexygo.utils.parser.recursiveCompile(this.data[i], this.tBody, this);
                                        lastItem = this.data[i];
                                    }
                                }
                                rendered += flexygo.utils.parser.paintGroupFooter(this.data[this.data.length - 1], this.groups, this);
                            }
                        }
                        if (this.tFooter && this.tFooter !== '') {
                            let render = flexygo.utils.parser.recursiveCompile(this.data[0], this.tFooter, this);
                            render = flexygo.utils.parser.recursiveCompile(def, render, this);
                            rendered += render;
                        }
                    }
                    else {
                        if (this.tEmpty) {
                            rendered += flexygo.utils.parser.recursiveCompile(def, this.tEmpty, this);
                        }
                        else {
                            rendered += '<div class="box-info"><i class="flx-icon icon-information-2 icon-lg icon-margin-right"></i><span><strong>Info!</strong> ' + flexygo.localization.translate('flxlist.noentriesfound') + '</span></div>';
                        }
                    }
                    if (this.tCSSText && this.tCSSText !== '') {
                        let render = flexygo.utils.parser.recursiveCompile(this.data[0], this.tCSSText, this);
                        render = flexygo.utils.parser.recursiveCompile(def, render, this);
                        rendered += '<style>' + render + '</style>';
                    }
                    if (this.tScriptText && this.tScriptText !== '') {
                        let render = flexygo.utils.parser.recursiveCompile(this.data[0], this.tScriptText, this);
                        render = flexygo.utils.parser.recursiveCompile(def, render, this);
                        rendered += '<script>' + render + '</script>';
                    }
                    me.html(rendered);
                    me.find('[data-sort]').on('click', (e) => {
                        let field = $(e.currentTarget).data('sort');
                        this.sort(e.currentTarget, field);
                    });
                    if (this.orderObj) {
                        for (var i = 0; i < this.orderObj.length; i++) {
                            if (this.orderObj[i].Asc) {
                                me.find('[data-sort="' + this.orderObj[i].PropertyName.toLowerCase() + '"]').addClass('sortAsc');
                            }
                            else {
                                me.find('[data-sort="' + this.orderObj[i].PropertyName.toLowerCase() + '"]').addClass('sortDsc');
                            }
                        }
                    }
                    let parentModule = me.closest('flx-module');
                    let wcModule = parentModule[0];
                    if (parentModule && wcModule) {
                        wcModule.moduleLoaded(this);
                    }
                    //comprobación bolsa
                    if (this.childname) {
                        let obj = new flexygo.obj.Entity(this.childname);
                        let bagField = obj.getConfig().UniqueIdentifier;
                        let buttons = me.find('button.bagButton');
                        if (bagField) {
                            if (this.data.length > 0) {
                                for (let i = 0; i < buttons.length; i++) {
                                    let bagValue = this.data[i]['_guid'];
                                    if (flexygo.utils.isBlank(bagValue)) {
                                        bagValue = this.data[i][bagField];
                                        if (flexygo.utils.isBlank(bagValue)) {
                                            let textError = flexygo.localization.translate('flxmodule.nofieldBagError').replace('{0}', bagField);
                                            flexygo.msg.warning(textError);
                                            buttons.hide();
                                            break;
                                        }
                                    }
                                    if (flexygo.selection.contains(this.childname, bagValue)) {
                                        $(buttons[i]).addClass('active');
                                        $(buttons[i]).closest('tr').addClass('selected');
                                    }
                                }
                            }
                            let mod = me.closest('flx-module');
                            let selectionLength = flexygo.selection.getArray(this.childname).length;
                            if (selectionLength > 0) {
                                mod[0].activeBagButtons(mod);
                                mod.find('.moduleToolbar [data-type="objectmenu"] .badge').html(selectionLength.toString());
                                mod.find('.moduleToolbar [data-type="objectmenu"] .caret').hide();
                            }
                            else {
                                mod.find('.moduleToolbar [data-type="objectmenu"] .badge').remove();
                                mod.find('.moduleToolbar [data-type="objectmenu"] .caret').show();
                            }
                        }
                        else {
                            buttons.hide();
                        }
                    }
                    if (this.mode == 'edit') {
                        if (this.propArr.length > 1) {
                            me.find('tbody tr td:last-child [property],tfoot tr td:last-child [property]').off('blur').on('blur', (e) => {
                                $(e.currentTarget).closest('tr').find('.saveRowButton').click();
                            });
                        }
                        me.find('tbody tr, tfoot tr').each((i, e) => {
                            $(e).attr('id', flexygo.utils.uniqueId()).addClass('form');
                            $(e).areYouSure();
                            $(e).validate({
                                ignore: '',
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
                        });
                        this.processLoadDependencies();
                    }
                    let tbl = me.find('table.flxRszTbl');
                    if (tbl.length == 1) {
                        tbl.colResizable({
                            resizeMode: 'overflow', disabledColumns: [0], liveDrag: 1, onResize: (ev) => {
                                this._resizeGridProps();
                            },
                            onDrag: (ev) => {
                                let tbl = $(ev.currentTarget);
                                let cols = tbl.find('thead > tr > th');
                                for (var i = 0; i < cols.length; i++) {
                                    tbl.find('tbody > tr > td:nth-child(' + (i + 1) + ')').css('max-width', $(cols[i]).width() + 'px');
                                }
                            }
                        });
                    }
                }
                /**
                *Processes dependency loading
                * @method processLoadDependencies
                */
                processLoadDependencies(listRows) {
                    let me = $(this);
                    if ($('body').find(this).length == 0) {
                        return;
                    }
                    let rows = listRows || me.find('tr:not(.rowHeader)');
                    let paramsArray = [];
                    for (let j = 0; j < rows.length; j++) {
                        let props = $(rows[j]).find('[property]');
                        let Properties = null;
                        if (props.length > 0) {
                            Properties = [];
                            for (let i = 0; i < props.length; i++) {
                                let prop = $(props[i])[0];
                                Properties.push({
                                    Key: prop.property,
                                    Value: prop.getValue()
                                });
                            }
                        }
                        let params = {
                            "RowId": $(rows[j]).attr('id'),
                            "ObjectName": this.objectname,
                            "IsNew": $(rows[j]).is('.rowInsert'),
                            "Properties": Properties
                        };
                        paramsArray.push(params);
                    }
                    if (paramsArray.length > 0) {
                        flexygo.ajax.post('~/api/Edit', 'processAllListDependencies', paramsArray, (response) => {
                            if (response) {
                                for (let j = 0; j < Object.keys(response).length; j++) {
                                    let rowKey = Object.keys(response)[j];
                                    let rowItem = response[rowKey];
                                    for (let i = 0; i < rowItem.length; i++) {
                                        let itm = rowItem[i];
                                        let prop = me.find('#' + rowKey + ' [property="' + itm.PropertyName + '"]');
                                        if (prop.length > 0) {
                                            this.refreshProperty(itm, prop, true);
                                        }
                                    }
                                }
                            }
                        });
                    }
                }
                /**
             * Refreshes a property
             * @method refreshProperty
             * @param {flexygo.api.edit.DependencyAction} itm
             * @param {JQuery} prop
             * @param {boolean} loadDependency
             * @return {string}
             */
                refreshProperty(itm, prop, loadDependency) {
                    let cntl = prop[0];
                    if (itm.changeSQL) {
                        if (cntl.changeSQLData) {
                            if (!loadDependency) {
                                cntl.setValue(null);
                                if (itm.cascadeDependencies) {
                                    cntl.triggerDependencies();
                                }
                            }
                            cntl.changeSQLData(itm.newSQL, itm.newSqlItems);
                        }
                    }
                    if (itm.changeClass) {
                        prop.removeAttr('class').addClass(itm.newClass);
                    }
                    if (itm.changeEnabled) {
                        if (!itm.newEnabled) {
                            prop.attr('disabled', 1);
                        }
                        else {
                            prop.removeAttr('disabled');
                        }
                    }
                    if (itm.changeRequired) {
                        if (itm.newRequired) {
                            prop.attr('required', 1);
                        }
                        else {
                            prop.removeAttr('required');
                        }
                    }
                    if (itm.changeValue) {
                        cntl.setValue(itm.newValue);
                        if (itm.cascadeDependencies) {
                            cntl.triggerDependencies();
                        }
                    }
                    if (itm.changeVisibility) {
                        if (itm.newVisibility) {
                            prop.removeClass('hideControl');
                            let ctlClass = prop.attr('control-class');
                            if (typeof ctlClass != 'undefined') {
                                prop.attr('control-class', ctlClass.replace('hideControl', ''));
                                prop.find('.hideControl').removeClass('hideControl');
                            }
                        }
                        else {
                            prop.addClass('hideControl');
                        }
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
                * Captures property change event
                * @method onPropertyChanged
                * @param {flexygo.events.FlexygoEvent} e
                */
                onPropertyChanged(e) {
                    let wc;
                    wc = $(e.sender);
                    let me = $(this);
                    let props = wc.closest('tr').find('[property]');
                    let propertyName = e.masterIdentity;
                    if (me.find(wc).length > 0) {
                        if (props.length > 0) {
                            let Properties = [];
                            for (let i = 0; i < props.length; i++) {
                                let prop = $(props[i])[0];
                                Properties.push({
                                    Key: prop.property,
                                    Value: prop.getValue()
                                });
                            }
                            let params = {
                                "ObjectName": this.objectname,
                                "ProcessName": null,
                                "ReportName": null,
                                "PropertyName": propertyName,
                                "Properties": Properties
                            };
                            flexygo.ajax.post('~/api/Edit', 'processDependencies', params, (response) => {
                                if (response) {
                                    for (let i = 0; i < response.length; i++) {
                                        let itm = response[i];
                                        let prop = props.filter('[property="' + itm.PropertyName + '"]');
                                        if (prop.length > 0) {
                                            this.refreshProperty(itm, prop, false);
                                        }
                                    }
                                }
                            });
                        }
                    }
                }
                _resizeGridProps() {
                    let me = $(this);
                    let items = me.find('thead > tr > th[data-sort]');
                    let myProps = new Object();
                    for (let i = 0; i < items.length; i++) {
                        myProps[$(items[i]).attr('data-sort')] = $(items[i]).width();
                    }
                    let page = flexygo.history.get(me);
                    let ident = page.pagename + '-' + this.moduleName;
                    let gridSizes = flexygo.storage.local.get('gridSizes');
                    if (gridSizes == null) {
                        gridSizes = new Object();
                    }
                    gridSizes[ident] = myProps;
                    flexygo.storage.local.add('gridSizes', gridSizes);
                }
                /**
                * Establish webcomponent settings
                * @method configure
                */
                configure() {
                    let where;
                    if (this.templatetype == 'htmlmodule') {
                        flexygo.msg.warning(flexygo.localization.translate('flxlist.warning'));
                        flexygo.nav.openPage('edit', 'sysModule', "ModuleName='" + this.moduleName + "'", null, 'popup', true);
                    }
                    else {
                        if (this.templateId == '' || this.templateId == null) {
                            where = '';
                        }
                        else {
                            where = 'TemplateId=\'' + this.templateId + '\'';
                        }
                        if (this.templateId == 'generic') {
                            if (this.mode == "edit") {
                                flexygo.nav.openPageName('syspage-generic-editgridsettings', 'sysObject', 'ObjectName=\'' + this.objectname + '\'', 'null', 'popup', false, $(this));
                            }
                            else {
                                flexygo.nav.openPageName('syspage-generic-gridsettings', 'sysObjectView', 'ObjectName=\'' + this.childname + '\' and ViewName=\'' + this.viewId + '\'', 'null', 'popup', false, $(this));
                            }
                        }
                        else {
                            flexygo.nav.openPage('edit', 'sysObjectTemplate', where, null, 'popup', true);
                        }
                    }
                }
                /**
               * Sort based on an object .
               * @method sort
               * @param  {api.list.PropertyOrder[]} orderInfo
               */
                sortByObj(orderInfo) {
                    this.sortColumn = null;
                    this.orderObj = orderInfo;
                    this.saveDefaultOrder();
                    this.refresh();
                }
                /**
                * Sort based on column in asc or desc mode.
                * @method sort
                * @param  {Element} columnItem
                * @param  {string} property
                * @param  {boolean} ascMode
                */
                sort(columnItem, property, ascMode) {
                    if (ascMode) {
                        this.sortAsc = ascMode;
                    }
                    else {
                        if (this.sortColumn == property) {
                            this.sortAsc = !this.sortAsc;
                        }
                        else {
                            this.sortAsc = true;
                        }
                    }
                    this.sortColumn = property;
                    let orderProp = {
                        ObjectName: this.objectname,
                        PropertyName: property,
                        Asc: this.sortAsc
                    };
                    //this.orderStr = this.orderOpenQuote + property + this.orderCloseQuote + ((this.sortAsc) ? ' asc' : ' desc');
                    this.orderObj = [orderProp];
                    this.saveDefaultOrder();
                    this.refresh();
                }
                /**
                * loads pager.
                * @method loadPager
                */
                loadPager() {
                    let me = $(this);
                    if (this.pagerConfig) {
                        if (flexygo.utils.isSizeMobile()) {
                            this.pagesButtons = 5;
                        }
                        else {
                            this.pagesButtons = this.pagerConfig.NumButtons;
                        }
                    }
                    let template = '<span class="firstPage"></span><span class="prevPage"></span><span class="pageButtons"></span><span class="nextPage"></span><span class="lastPage"></span><span class="pageInfo"><span class="activePage"></span>/<span class="numPages"></span>(<span class="numRows"></span>)</span>';
                    if (this.pagerConfig && this.pagerConfig.Template && this.pagerConfig.Template != '') {
                        template = this.pagerConfig.Template;
                    }
                    if ((typeof this.pager == 'undefined' || this.pager == null)) {
                        let pagerExist = me.closest('flx-module').find('.pager:first');
                        if (pagerExist.length > 0) {
                            this.pager = pagerExist;
                        }
                        else {
                            this.pager = $('<div class="pager" />');
                            if (this.pagerConfig) {
                                let pagerLocation;
                                switch (this.pagerConfig.Position.toLowerCase()) {
                                    case 'moduleheader':
                                        pagerLocation = me.parents('flx-module').find('.cntButtons');
                                        break;
                                    case 'listheader':
                                        pagerLocation = me.parents('flx-module').find('.cntBodyHeader');
                                        break;
                                    case 'listfooter':
                                        pagerLocation = me.parents('flx-module').find('.cntBodyFooter');
                                        this.pager.addClass('onlyPageInfo');
                                        break;
                                    case 'listboth':
                                        pagerLocation = me.parents('flx-module').find('.cntBodyHeader, .cntBodyFooter');
                                        break;
                                }
                                this.pager = this.pager.appendTo(pagerLocation);
                            }
                        }
                    }
                    this.pager.empty();
                    this.pager.append(template);
                    this.pager.find('.activePage').html(String(this.page + 1));
                    this.pager.find('.numPages').html(String(this.maxPages));
                    this.pager.find('.numRows').html(String(this.maxRows));
                    this.pager.find('.prevPage').on('click', () => {
                        this.previousPage();
                    });
                    this.pager.find('.nextPage').on('click', () => {
                        this.nextPage();
                    });
                    this.pager.find('.firstPage').on('click', () => {
                        this.firstPage();
                    });
                    this.pager.find('.lastPage').on('click', () => {
                        this.lastPage();
                    });
                    this.pager.attr('title', this.pager.find('.pageInfo').first().text());
                    this.refreshPager();
                    //aqui
                }
                /**
                * Refreshes pager.
                * @method refreshPager
                */
                refreshPager() {
                    this.pager.find('.activePage').html(String(this.page + 1));
                    this.pager.find('.numRows').html(String(this.maxRows));
                    this.pager.find('.numPages').html(String(this.maxPages));
                    let iniBtn = Number((this.page - this.pagesButtons / 2).toFixed());
                    if (iniBtn < 0) {
                        iniBtn = 0;
                    }
                    else if (iniBtn > (this.maxPages - this.pagesButtons)) {
                        iniBtn = this.maxPages - this.pagesButtons + 1;
                    }
                    let btns = this.pager.find('.pageButtons');
                    btns.html('');
                    for (let i = 0; i < this.pagesButtons && i < this.maxPages; i++) {
                        this.addButtons(btns, (iniBtn + i));
                    }
                    if (this.page == 0) {
                        this.pager.find('.prevPage').hide();
                        this.pager.find('.firstPage').hide();
                    }
                    else {
                        this.pager.find('.prevPage').show();
                        this.pager.find('.firstPage').show();
                    }
                    if ((this.data.length < this.pageSize) || (this.maxPages == (this.page))) {
                        this.pager.find('.nextPage').hide();
                        this.pager.find('.lastPage').hide();
                    }
                    else {
                        this.pager.find('.nextPage').show();
                        this.pager.find('.lastPage').show();
                    }
                    this.pager.attr('title', this.pager.find('.pageInfo').first().text());
                }
                addButtons(btns, pageNum) {
                    let btn = $('<span class="pBtn">' + (pageNum + 1) + '</span>');
                    if (pageNum == this.page) {
                        btn.addClass('active');
                    }
                    btn.on('click', () => {
                        this.loadPage(pageNum);
                    });
                    btns.append(btn);
                }
                /**
               * Moves to next page.
               * @method nextPage
               */
                nextPage() {
                    this.loadPage(this.page + 1);
                }
                /**
                * Moves to previous page.
                * @method previousPage
                */
                previousPage() {
                    this.loadPage(this.page - 1);
                }
                /**
                * Moves to first page.
                * @method firstPage
                */
                firstPage() {
                    this.loadPage(0);
                }
                /**
               * Moves to last page.
               * @method lastPage
               */
                lastPage() {
                    this.loadPage(this.maxPages - 1);
                }
                /**
                * Loads page given a page number.
                * @method lastPage
                * param {number} newPage
                */
                loadPage(newPage) {
                    let selector;
                    let params;
                    this.page = newPage;
                    params = {
                        "ObjectName": this.objectname,
                        "cryptedSql": this.cryptedSql,
                        "page": this.page,
                        "pagesize": this.pageSize,
                        "RemoveKeys": this.removeKeys,
                        "filter": this.filters
                    };
                    flexygo.ajax.post('~/api/List', 'getPageList', params, (response) => {
                        if (response) {
                            this.data = response;
                            this.render();
                            this.refreshPager();
                            if (!$(this).closest('div.ui-dialog').length) {
                                selector = 'div#mainContent';
                            }
                            else {
                                selector = 'main.pageContainer';
                            }
                            $(selector).animate({ scrollTop: 0 }, 300);
                        }
                    }, null, () => {
                        this.stopLoading();
                    }, () => {
                        this.startLoading();
                    });
                    this.savePageValueHistory();
                }
                /**
               * Save page into history.
               * @method savePageValueHistory
               */
                savePageValueHistory() {
                    let me = $(this);
                    let module = me.closest('flx-module')[0];
                    let history = flexygo.history.get(me);
                    let page = this.page;
                    if (!history) {
                        history = new flexygo.nav.FlexygoHistory();
                    }
                    if (!history.filtersValues) {
                        history.filtersValues = new flexygo.nav.ModuleFilterHistory();
                    }
                    if (!history.filtersValues[module.moduleName]) {
                        history.filtersValues[module.moduleName] = new flexygo.nav.FilterHistoryValue();
                    }
                    // if (!history.filtersValues[module.moduleName].activePage) {
                    history.filtersValues[module.moduleName].activePage = page;
                    // }
                    flexygo.history.replace(history, me, false);
                }
                /**
                * Load searcher
                * @method loadSearcher
                */
                loadSearcher() {
                    let me = $(this);
                    if (this.hasSearcher === true) {
                        let template = '<flx-genericsearch gridid="' + this.moduleName + '"  class="moduleSearcher"></flx-genericsearch>';
                        this.searcher = $('<div class="listSearcher" />');
                        let searcherLocation = me.parents('flx-module').find('.cntBodyHeader');
                        searcherLocation.append(this.searcher);
                        this.searcher.empty();
                        this.searcher.append(template);
                    }
                }
                /**
                * Load filters
                * @method loadFilters
                * @param  settings
                */
                loadFilters(settings) {
                    let me = $(this);
                    if (settings) {
                        this.searchSettings = settings;
                    }
                    let module = me.closest('flx-module');
                    let pane = module.find('.cntBodyHeader .filterPanel');
                    if (pane.length == 0 && this.moduleButtons && Object.keys(this.moduleButtons).length > 0) {
                        pane = $('<div class="filterPanel" />');
                        module.find('.cntBodyHeader').append(pane);
                    }
                    let flt = $('<flx-filter></flx-filter>');
                    pane.html(flt);
                    let fClt = flt[0];
                    if (fClt) {
                        fClt.settings = settings;
                        fClt.key = this.objectname + '-' + this.moduleName;
                        fClt.grid = this;
                        fClt.init();
                    }
                }
                /**
                * Paint header
                * @method paintHeader
                * @param {JQuery} row
                * @return {string}
                */
                paintHeader(row) {
                    let me = $(this);
                    let thead = $('<thead />');
                    let tr = $('<tr class="rowHeader"/>');
                    let page = flexygo.history.get(me);
                    let ident = page.pagename + '-' + this.moduleName;
                    let gridSizes = flexygo.storage.local.get('gridSizes');
                    if (this.buttons && Object.keys(this.buttons).length > 2) {
                        tr.append('<th style="width:200px" />');
                    }
                    else {
                        tr.append('<th style="width:75px" />');
                    }
                    if (this.mode == 'edit') {
                        for (let i = 0; i < this.propArr.length; i++) {
                            if (this.propArr[i].WebComponent) {
                                let key = this.propArr[i].Name.toLowerCase();
                                let width = this.propArr[i].Width;
                                if (gridSizes && gridSizes[ident] && gridSizes[ident][key]) {
                                    width = gridSizes[ident][key];
                                }
                                let td = $('<th />').html(this.propArr[i].Label).attr('data-sort', key).css('width', width + 'px');
                                tr.append(td);
                                if (this.propArr[i].Hide) {
                                    td.hide();
                                }
                            }
                        }
                    }
                    else {
                        for (let key in row) {
                            if (key != '_objectname' && key != '_objectwhere' && key != '_guid' && key != '_ot') {
                                let td = $('<th />').html(key).attr('data-sort', key);
                                if (gridSizes && gridSizes[ident] && gridSizes[ident][key]) {
                                    td.css('width', gridSizes[ident][key] + 'px');
                                }
                                tr.append(td);
                            }
                        }
                    }
                    thead.html(tr);
                    return '<table class="flxRszTbl" ><thead>' + thead.html() + '</thead><tbody>';
                }
                /**
              * Paint footer
              * @method paintFooter
              * @param {JQuery} row
              * @return {string}
              */
                paintFooter(row) {
                    let me = $(this);
                    let tfoot = $('<tfoot />');
                    if (this.mode == 'edit') {
                        let tr = $('<tr class="rowInsert"/>');
                        let td = $('<td/>');
                        let defString = flexygo.history.getDefaults(this.objectname, me);
                        let btnSave = { ButtonId: "-111", Disabled: false, HideText: true, IconClass: "flx-icon icon-save-2", Order: 1, PositionId: "Toolbar", Text: "Save", ToolTip: "Save", TypeId: "SaveRow" };
                        let btnClear = { ButtonId: "-112", Disabled: false, HideText: true, IconClass: "flx-icon  icon-clean", Order: 2, PositionId: "Toolbar", Text: "Clear", ToolTip: "Clear", TypeId: "ClearRow" };
                        let btnGroup = $('<div class="btn-group" />');
                        btnGroup.append(this._getButton(btnSave, this.childname, '', defString));
                        btnGroup.append(this._getButton(btnClear, this.childname, '', defString));
                        td.html(btnGroup);
                        tr.append(td);
                        let wcModule = me.closest('flx-module')[0];
                        let def = null;
                        if (wcModule) {
                            def = wcModule.objectdefaults;
                        }
                        if (!def && defString && defString != '') {
                            def = JSON.parse(flexygo.utils.parser.replaceAll(defString, "'", '"'));
                        }
                        var ent = new flexygo.obj.Entity(this.objectname);
                        ent.read();
                        for (let i = 0; i < this.propArr.length; i++) {
                            if (this.propArr[i].WebComponent) {
                                td = $('<td/>');
                                let input = $('<' + this.propArr[i].WebComponent + ' property="' + this.propArr[i].Name + '" tab="' + flexygo.utils.uniqueTabIndex() + '" />');
                                if (ent && typeof ent.data[this.propArr[i].Name] !== 'undefined') {
                                    input.attr('Value', ent.data[this.propArr[i].Name].Value);
                                    td.attr('def-value', ent.data[this.propArr[i].Name].Value);
                                }
                                if (def && typeof def[this.propArr[i].Name] !== 'undefined') {
                                    let defVal = def[this.propArr[i].Name];
                                    if (defVal != null && defVal.toString().indexOf('/Date(') != -1) {
                                        defVal = moment.utc(defVal).toDate();
                                    }
                                    input.attr('Value', defVal);
                                    td.attr('def-value', defVal);
                                }
                                td.html(input);
                                tr.append(td);
                                if (this.propArr[i].Hide) {
                                    td.hide();
                                }
                            }
                        }
                        tfoot.html(tr);
                    }
                    return '</tbody><tfoot>' + tfoot.html() + '</tfoot></table>';
                }
                /**
                * Paint Body
                * @method paintBody
                * @param {JQuery} row
                * @return {string}
                */
                paintBody(row) {
                    let me = $(this);
                    me.closest('.cntBody').addClass('nopadding');
                    let tbody = $('<tbody />');
                    let tr = $('<tr/>');
                    let notExclude = false;
                    let defString = flexygo.history.getDefaults(row._objectname, me);
                    let page = flexygo.history.get(me);
                    let ident = page.pagename + '-' + this.moduleName;
                    let gridSizes = flexygo.storage.local.get('gridSizes');
                    if (this.mode == 'edit') {
                        tr.attr('objectname', row._objectname);
                        tr.attr('objectwhere', row._objectwhere);
                        if (!this.buttons) {
                            this.buttons = {};
                        }
                        //ok es un boton que no esta guardado en bd
                        this.buttons.editButton = { ButtonId: "-111", Disabled: false, HideText: true, IconClass: "flx-icon icon-save-2", Order: -1, PositionId: "Toolbar", Text: "Save", ToolTip: "Save", TypeId: "SaveRow" };
                    }
                    if (this.buttons && row._objectname && row._objectwhere) {
                        let td = $('<td/>');
                        let arrBtn = flexygo.utils.sortObject(this.buttons, 'PositionId', 'Order');
                        if (arrBtn.length > 0) {
                            let btnGroup = $('<div class="btn-group" />');
                            //btnGroup.css('width', (25 * arrBtn.length)+'px')
                            for (let i = 0; i < arrBtn.length; i++) {
                                btnGroup.append(this._getButton(arrBtn[i], row._objectname, row._objectwhere, defString));
                            }
                            td.html(btnGroup);
                        }
                        tr.append(td);
                    }
                    else {
                        tr.append('<td/>');
                    }
                    if (this.mode == 'edit') {
                        for (let i = 0; i < this.propArr.length; i++) {
                            if (this.propArr[i].WebComponent) {
                                let td = $('<td/>');
                                let key = this.propArr[i].Name.toLowerCase();
                                let val = this.getValue(row[key]);
                                if (val == null || val == 'null') {
                                    val = '';
                                }
                                let input = $('<' + this.propArr[i].WebComponent + ' property="' + this.propArr[i].Name + '" tab="' + flexygo.utils.uniqueTabIndex() + '"  />');
                                if (this.propArr[i].WebComponent.startsWith('flx-check') || this.propArr[i].WebComponent == 'flx-switch') {
                                    if (row[key] == true || row[key] == 'true') {
                                        input.attr('checked', 'checked');
                                        input.attr('value', 'true');
                                    }
                                    else if (row[key] == false || row[key] == 'false') {
                                        input.attr('value', 'false');
                                    }
                                    else {
                                        input.attr('value', '');
                                    }
                                }
                                else {
                                    if (input.attr('type') === 'date' && val != '') {
                                        val = moment.utc(row[key]).format('YYYY-MM-DD');
                                    }
                                    else if (input.attr('type') === 'datetime-local' && val != '') {
                                        val = moment.utc(row[key]).format('YYYY-MM-DD[T]HH:mm');
                                    }
                                    else if (input.attr('type') === 'time' && val != '') {
                                        if (moment.utc(row[key], 'HH:mm').isValid()) {
                                            val = moment.utc(row[key], 'HH:mm').format('HH:mm');
                                        }
                                        else {
                                            val = moment.utc(row[key]).format('HH:mm');
                                        }
                                    }
                                    input.attr('Value', val);
                                }
                                if (row[key + '_flxtext']) {
                                    input.attr('text', row[key + '_flxtext']);
                                }
                                td.html(input);
                                tr.append(td);
                                if (this.propArr[i].Hide) {
                                    td.hide();
                                }
                            }
                        }
                    }
                    else {
                        for (let key in row) {
                            if (key != '_objectname' && key != '_objectwhere' && key != '_guid' && key != '_ot') {
                                let td = $('<td/>');
                                let val = this.getValue(row[key]);
                                if (gridSizes && gridSizes[ident] && gridSizes[ident][key]) {
                                    td.css('max-width', gridSizes[ident][key] + 'px');
                                }
                                if (typeof val == 'number') {
                                    val = val.toLocaleString();
                                }
                                let title = $("<b/>").html(key);
                                td.html(title).append(val);
                                tr.append(td);
                            }
                        }
                    }
                    tbody.html(tr);
                    return tbody.html();
                }
                /**
               *Translates string
               * @method translate
               * @param {string} str
               * @return {string}
               */
                translate(str) {
                    return flexygo.localization.translate(str);
                }
                _getButton(btn, objectname, objectwhere, objectdefaults) {
                    return flexygo.ui.wc.FlxModuleElement.prototype.getButton(btn, objectname, objectwhere, objectdefaults);
                }
                _getTemplateButton(json, typeId, IconClass, Text, TargetId) {
                    let me = $(this);
                    let defString = flexygo.history.getDefaults(json._objectname, me);
                    json._objectdefaults = defString;
                    return flexygo.environment._getTemplateButton(json, typeId, IconClass, Text, TargetId);
                }
                /**
                *Gets value from property
                * @method getValue
                * @param {any} value
                * @return {any}
                */
                getValue(value) {
                    let type = typeof value;
                    type = type.toLowerCase();
                    if ((value && value.toString().indexOf('/Date(') != -1) || (value && typeof value.getMonth === 'function')) {
                        if (moment(value).utc().format('HH:mm') != '00:00') {
                            type = 'datetime';
                        }
                        else {
                            type = 'date';
                        }
                    }
                    switch (type) {
                        case 'undefined':
                            return '';
                        case 'boolean':
                            if (value) {
                                return '<i class="flx-icon icon-check-2"></i>';
                            }
                            else {
                                return '<i class="flx-icon icon-non-check-2 "></i>';
                            }
                        case 'date':
                            return moment(value).utc().format('L');
                        case 'datetime':
                            return moment(value).utc().format('L') + ' ' + moment(value).utc().format('LTS');
                        default:
                            return value;
                    }
                }
                /**
               *Loads list count
               * @method loadCount
               */
                loadCount() {
                    let params = {
                        ObjectName: this.objectname,
                        cryptedSql: this.cryptedSql,
                        filter: this.filters
                    };
                    flexygo.ajax.post('~/api/List', 'getCount', params, (response) => {
                        if (response) {
                            this.maxRows = response;
                            let numPages = 0;
                            if (this.pageSize == 0) {
                                numPages = this.maxRows;
                            }
                            else {
                                numPages = Math.floor(this.maxRows / this.pageSize);
                                if ((this.maxRows % this.pageSize) > 0) {
                                    numPages++;
                                }
                            }
                            this.maxPages = numPages;
                            this.refreshPager();
                        }
                    });
                }
                /**
                * Gets module full Id using pagename objectname modulename
                * @method getModuleFullId
                * @return {string}
                */
                getModuleFullId() {
                    let page = flexygo.history.get($(this));
                    //Webcomponent list from menu buttons do not have a page
                    if (!page) {
                        return ' | |' + this.moduleName;
                    }
                    if (!page.objectname) {
                        page.objectname = '';
                    }
                    return page.pagename + '|' + page.objectname + '|' + this.moduleName;
                }
            } //class
            wc_1.FlxListElement = FlxListElement;
            function clearRow(list, btn) {
                let cells = list.find('tfoot > tr > td');
                cells.each((i, e) => {
                    let cell = $(e);
                    let ctl = cell.find('[property]')[0];
                    if (ctl) {
                        let val = cell.attr('def-value') || null;
                        let text = cell.attr('def-text') || null;
                        ctl.setValue(val, text);
                    }
                });
                let flxlist = (list.is('flx-list')) ? list : list.find('flx-list');
                flxlist[0].processLoadDependencies(list.find('tfoot > tr'));
                list.find('.rowInsert').validate().resetForm();
                list.find('tfoot > tr > td  input:enabled:visible:first').focus();
            }
            wc_1.clearRow = clearRow;
            function saveRow(objectName, objectWhere, list, btn, msg = true) {
                let tr = btn.closest('tr');
                if (tr.valid()) {
                    if (objectName) {
                        let tr = btn.closest('tr');
                        let props = tr.find('[property]');
                        if (props.length > 0) {
                            let obj = new flexygo.obj.Entity(objectName, objectWhere);
                            obj.read();
                            for (let i = 0; i < props.length; i++) {
                                let prop = $(props[i])[0];
                                obj.data[prop.property].Value = prop.getValue();
                            }
                            let ret;
                            //This is now controlled by Entity
                            //let eventName;
                            if (!objectWhere || objectWhere == '') {
                                ret = obj.insert();
                                //eventName = 'insert';
                            }
                            else {
                                ret = obj.update();
                                //eventName = 'update';
                            }
                            if (ret) {
                                if (msg) {
                                    flexygo.msg.success('Saved :)');
                                }
                                tr.removeClass('dirty');
                                if (objectWhere && objectWhere != '') {
                                    for (let i = 0; i < props.length; i++) {
                                        let prop = $(props[i])[0];
                                        prop.setValue(obj.data[prop.property].Value);
                                    }
                                    tr.animate({ backgroundColor: flexygo.colors.success }, 700, () => {
                                        //Refresh control inside module.
                                        tr.animate({ backgroundColor: "none" }, 700, function () { $(this).css("background-color", ""); });
                                        //$(document).trigger(eventName, [obj, list]);
                                    });
                                }
                                else {
                                    let row = flexygo.utils.lowerKeys(obj.toValuesArray());
                                    row._objectname = obj.objectName;
                                    row._objectwhere = obj.objectWhere;
                                    let wcList = list[0];
                                    let newTr = $(wcList.paintBody(row));
                                    newTr.hide();
                                    list.find('tbody').append(newTr);
                                    newTr.show(250);
                                    newTr.attr('id', flexygo.utils.uniqueId()).addClass('form');
                                    newTr.validate({
                                        ignore: '',
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
                                    flexygo.ui.wc.clearRow(list, btn);
                                    /*To process the dependencies of this row*/
                                    tr = newTr;
                                }
                                list[0].processLoadDependencies(tr);
                            }
                            else {
                                tr.animate({ backgroundColor: flexygo.colors.danger }, 700);
                            }
                        }
                        else {
                            flexygo.msg.success('Row without properties.');
                        }
                    }
                    else {
                        flexygo.msg.success('Can\'t find object name');
                    }
                }
                else {
                    flexygo.msg.warning('Complete all required fields before saving.' + ' like :' + tr.validate().errorList[0].element.name);
                }
            }
            wc_1.saveRow = saveRow;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-list', flexygo.ui.wc.FlxListElement);
//# sourceMappingURL=flx-list.js.map