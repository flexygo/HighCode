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
            * Library for the FlxSearchElement web component.
            *
            * @class FlxSearchElement
            * @constructor
            * @return {FlxSearchElement}
            */
            class FlxSearchElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                    * Set when component is attached to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                    //orderStr: string;
                    //orderOpenQuote: string;
                    //orderCloseQuote: string;
                    this.orderObj = null;
                    this.removeKeys = false;
                    this.activeFilter = null;
                    this.userDefinedGroups = false;
                    this.searcher = null;
                    this.filters = null;
                    this.buttons = null;
                    this.groups = null;
                    this.groupList = null;
                    this.viewId = null;
                    this.presetId = null;
                    this.presetText = null;
                    this.presetIcon = null;
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
                        this.moduleName = 'sysmod-objectsearch-generic';
                    }
                    if (this.moduleName) {
                        if (element.attr('manualInit') != 'true') {
                            this.init();
                        }
                    }
                }
                /**
                * Monitor the list of observed attribute for changes.
                * @property observedAttributes
                */
                static get observedAttributes() {
                    return ['modulename'];
                }
                attributeChangedCallback(attrName, oldVal, newVal) {
                    if (!this.connected) {
                        return;
                    }
                    if (this && attrName.toLowerCase() == 'modulename' && newVal && newVal != '') {
                        this.moduleName = newVal;
                        if (this.moduleName) {
                            this.init();
                        }
                    }
                }
                init() {
                    this.filterValues = null;
                    this.activeFilter = null;
                    this.pagesButtons = 3;
                    this.maxRows = 0;
                    this.maxPages = 0;
                    //this._setDefaultTemplate();
                    this.initGrid(true);
                }
                refresh() {
                    if ($(this).attr('manualInit') != 'true') {
                        this.viewId = null;
                        //this.templateId = null;
                        this.initGrid(false);
                    }
                }
                setFilter() {
                    if ($(this).attr('manualInit') != 'true') {
                        this.initGrid(false);
                    }
                }
                initGrid(initMode) {
                    let me = $(this);
                    me.removeAttr('manualInit');
                    $(this).closest('flx-module').find('.flx-noInitContent').remove();
                    this.page = 0;
                    let mode = me.attr('mode');
                    if (!mode || mode == '') {
                        mode = 'object';
                    }
                    //var loadRet = this.loadRet;
                    let params = {
                        ObjectName: me.attr('ObjectName'),
                        ObjectWhere: me.attr('ObjectWhere'),
                        ModuleName: this.moduleName,
                        PageName: flexygo.history.getPageName(me),
                        Page: this.page,
                        AdditionalWhere: '',
                        OrderInfo: this.orderObj,
                        Mode: mode,
                        SearchId: this.activeFilter,
                        FilterValues: this.filterValues
                    };
                    flexygo.ajax.post('~/api/List', 'GetSearch', params, (response) => {
                        if (response) {
                            if (response.Template) {
                                let template = response.Template;
                                this.fields = template.TableColumns;
                                this.data = template.TableData;
                                this.tHeader = template.Header;
                                this.tBody = template.Body;
                                this.tFooter = template.Footer;
                                this.tModuleClass = template.ModuleClass;
                                this.objectname = template.ObjectName;
                                this.cryptedSql = template.TableSQL;
                                this.removeKeys = template.RemoveKeys;
                                this.pageSize = template.PageSize;
                                this.groups = template.Groups;
                                this.viewId = template.DataViewName;
                            }
                            let parentModule = me.closest('flx-module');
                            let wcModule = parentModule[0];
                            if (this.tModuleClass && this.tModuleClass != '') {
                                parentModule.addClass(this.tModuleClass);
                            }
                            if (initMode && parentModule && wcModule) {
                                if (response.Buttons) {
                                    wcModule.setButtons(response.Buttons, response.ObjectName, response.ObjectWhere);
                                }
                                else {
                                    wcModule.setButtons(null, response.ObjectName, response.ObjectWhere);
                                }
                                wcModule.setObjectDescrip(response.Title);
                            }
                            if (response.RowButtons) {
                                this.buttons = response.RowButtons;
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
                            if (initMode && response.SearchSettings) {
                                this.loadFilters(response.SearchSettings);
                            }
                        }
                    }, null, () => { this.stopLoading(); }, () => { this.startLoading(); });
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
                render() {
                    let me = $(this);
                    let rendered = '';
                    this.checkPresetDisplay();
                    if (this.presetId) {
                        this.changePresetText();
                    }
                    if (this.data.length > 0) {
                        if (this.tHeader && this.tHeader != '') {
                            rendered += flexygo.utils.parser.recursiveCompile(this.data[0], this.tHeader, this);
                        }
                        if (this.tBody && this.tBody != '') {
                            let lastItem = null;
                            if (this.data.length > 0) {
                                rendered += flexygo.utils.parser.paintGroupHeader(this.data[0], this.groups, this);
                                for (let i = 0; i < this.data.length; i++) {
                                    let notExclude = false;
                                    if (this.filter && this.filter != '') {
                                        for (let key in this.data[i]) {
                                            if (String(this.data[i][key]).toLocaleLowerCase().indexOf(this.filter.toLocaleLowerCase()) != -1) {
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
                        if (this.tFooter && this.tFooter != '') {
                            rendered += flexygo.utils.parser.recursiveCompile(this.data[0], this.tFooter, this);
                        }
                    }
                    else {
                        rendered += '<div class="box-info"><i class="flx-icon icon-information-2 icon-lg icon-margin-right"></i><span><strong>Info!</strong> ' + flexygo.localization.translate('flxlist.noentriesfound') + '</span></div>';
                    }
                    me.html(rendered);
                    me.find('[data-sort]').on('click', (e) => {
                        this.sort(e.currentTarget, $(e.currentTarget).data('sort'));
                    });
                    if (this.sortColumn) {
                        if (this.sortAsc) {
                            me.find('[data-sort="' + this.sortColumn + '"]').addClass('sortAsc');
                        }
                        else {
                            me.find('[data-sort="' + this.sortColumn + '"]').addClass('sortDsc');
                        }
                    }
                    let parentModule = me.closest('flx-module');
                    let wcModule = parentModule[0];
                    if (parentModule && wcModule) {
                        wcModule.moduleLoaded(this);
                    }
                }
                /**
                * Sort based on an object .
                * @method sort
                * @param  {api.list.PropertyOrder[]} orderInfo
                */
                sortByObj(orderInfo, groupsInfo) {
                    this.sortColumn = null;
                    this.orderObj = orderInfo;
                    this.groups = groupsInfo;
                    this.refresh();
                }
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
                    //this.init();
                    this.refresh();
                }
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
                                    break;
                            }
                            pagerLocation.append(this.pager);
                        }
                    }
                    this.pager.empty();
                    this.pager.append(template);
                    this.pager.find('.activePage').html((this.page + 1).toString());
                    this.pager.find('.numPages').html(this.maxPages.toString());
                    this.pager.find('.numRows').html(this.maxRows.toString());
                    this.pager.find('.prevPage').on('click', () => { this.previousPage(); });
                    this.pager.find('.nextPage').on('click', () => { this.nextPage(); });
                    this.pager.find('.firstPage').on('click', () => { this.firstPage(); });
                    this.pager.find('.lastPage').on('click', () => { this.lastPage(); });
                    this.pager.attr('title', this.pager.find('.pageInfo').text());
                    this.refreshPager();
                    //aqui
                }
                setPreset(presetName, presetText, presetIcon) {
                    this.presetId = presetName;
                    this.presetText = presetText;
                    this.presetIcon = presetIcon;
                    this.initGrid(false);
                }
                changePresetText() {
                    let me = $(this);
                    let bt = me.closest('flx-module').find('[data-type="presets"] span:first');
                    if (bt) {
                        bt.html(this.presetText);
                    }
                    let bti = me.closest('flx-module').find('[data-type="presets"] i:first');
                    bti.attr('class', this.presetIcon);
                }
                checkPresetDisplay() {
                    if (typeof this.presets == 'undefined') {
                        $(this).closest('flx-module').find('[data-type="presets"]').remove();
                    }
                }
                loadCount() {
                    let params = {
                        ObjectName: this.objectname,
                        CryptedSql: this.cryptedSql,
                        Filter: this.filters,
                        ModuleName: this.moduleName,
                        PageName: flexygo.history.getPageName($(this)),
                    };
                    flexygo.ajax.post('~/api/List', 'GetCount', params, (response) => {
                        if (response) {
                            this.maxRows = response;
                            let numPages = 0;
                            if (this.pageSize == 0) {
                                numPages = this.maxRows;
                            }
                            else {
                                numPages = Math.floor(Number(this.maxRows / this.pageSize));
                                if ((this.maxRows % this.pageSize) > 0) {
                                    numPages++;
                                }
                            }
                            this.maxPages = numPages;
                            this.refreshPager();
                        }
                    });
                }
                nextPage() {
                    this.loadPage(this.page + 1);
                }
                previousPage() {
                    this.loadPage(this.page - 1);
                }
                firstPage() {
                    this.loadPage(0);
                }
                lastPage() {
                    this.loadPage(this.maxPages - 1);
                }
                loadPage(newPage) {
                    this.page = newPage;
                    let params = {
                        ObjectName: this.objectname,
                        CryptedSql: this.cryptedSql,
                        Page: this.page,
                        PageSize: this.pageSize,
                        RemoveKeys: this.removeKeys,
                        Filter: this.filters,
                        ModuleName: this.moduleName,
                        PageName: flexygo.history.getPageName($(this)),
                    };
                    flexygo.ajax.post('~/api/List', 'GetPageList', params, (response) => {
                        if (response) {
                            this.data = response;
                            this.render();
                            this.refreshPager();
                        }
                    }, null, () => { this.stopLoading(); }, () => { this.startLoading(); });
                }
                loadSearcher() {
                    let me = $(this);
                    if (this.hasSearcher) {
                        let template = '<flx-genericsearch gridid="' + this.moduleName + '"  class="moduleSearcher"></flx-genericsearch>';
                        this.searcher = $('<div class="listSearcher" />');
                        let searcherLocation = me.parents('flx-module').find('.cntBodyHeader');
                        searcherLocation.append(this.searcher);
                        this.searcher.empty();
                        this.searcher.append(template);
                    }
                }
                loadFilters(settings) {
                    this.searchSettings = settings;
                    let me = $(this);
                    let module = me.closest('flx-module');
                    let pane = module.find('.cntBodyHeader .filterPanel');
                    if (pane.length == 0) {
                        pane = $('<div class="filterPanel row" />');
                        module.find('.cntBodyHeader').append(pane);
                    }
                    let flt = $('<flx-filter></flx-filter>');
                    pane.append(flt);
                    let fClt = flt[0];
                    fClt.settings = settings;
                    fClt.key = this.objectname + '-' + this.moduleName;
                    fClt.grid = this;
                    fClt.init();
                }
                paintHeader(row) {
                    let thead = $('<thead />');
                    let tr = $('<tr class="rowHeader"/>');
                    if (this.buttons) {
                        tr.append('<th/>');
                    }
                    for (let key in row) {
                        if (key != '_objectname' && key != '_objectwhere' && key != '_guid' && key != '_ot') {
                            let td = $('<th />').html(key).attr('data-sort', key);
                            tr.append(td);
                        }
                    }
                    thead.append(tr);
                    return '<table><thead>' + thead.html() + '<thead><tbody>';
                }
                paintFooter(row) {
                    return '</tbody></table>';
                }
                paintBody(row) {
                    let me = $(this);
                    me.closest('.cntBody').addClass('nopadding');
                    let tbody = $('<tbody />');
                    let tr = $('<tr/>');
                    let defString = flexygo.history.getDefaults(row._objectname, me);
                    if (this.buttons && row._objectname && row._objectwhere) {
                        let td = $('<td/>');
                        let arrBtn = flexygo.utils.sortObject(this.buttons, 'PositionId', 'Order');
                        if (arrBtn.length > 0) {
                            let btnGroup = $('<div class="btn-group" />');
                            for (let i = 0; i < arrBtn.length; i++) {
                                btnGroup.append(this._getButton(arrBtn[i], row._objectname, row._objectwhere, defString));
                            }
                            td.append(btnGroup);
                        }
                        tr.append(td);
                    }
                    for (let key in row) {
                        if (key != '_objectname' && key != '_objectwhere' && key != '_guid' && key != '_ot') {
                            let title = $("<b/>").html(key);
                            let val = this.getValue(row[key]);
                            let td = $('<td/>').append(title).append(val);
                            tr.append(td);
                        }
                    }
                    tbody.append(tr);
                    return tbody.html();
                }
                translate(str) {
                    return flexygo.localization.translate(str);
                }
                refreshPager() {
                    this.pager.find('.activePage').html((this.page + 1).toString());
                    this.pager.find('.numRows').html(this.maxRows.toString());
                    this.pager.find('.numPages').html(this.maxPages.toString());
                    let iniBtn = this.page - Number(this.pagesButtons / 2);
                    if (iniBtn < 0) {
                        iniBtn = 0;
                    }
                    else if (iniBtn > (this.maxPages - this.pagesButtons)) {
                        iniBtn = this.maxPages - this.pagesButtons + 1;
                    }
                    let btns = this.pager.find('.pageButtons');
                    btns.html('');
                    for (let i = 0; i < this.pagesButtons && i < this.maxPages; i++) {
                        this._addBtns(btns, (iniBtn + i));
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
                    this.pager.attr('title', this.pager.find('.pageInfo').text());
                }
                _addBtns(btns, pageNum) {
                    let btn = $('<span class="pBtn">' + (pageNum + 1) + '</span>');
                    if (pageNum == this.page) {
                        btn.addClass('active');
                    }
                    btn.on('click', () => { this.loadPage(pageNum); });
                    btns.append(btn);
                }
                getValue(value) {
                    let type = typeof value;
                    type = type.toLowerCase();
                    if ((value && value.toString().indexOf('/Date(') != -1) || (value && typeof value.getMonth === 'function')) {
                        if (moment(value).format('HH:mm') != '00:00') {
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
                                return '<i class="flx-icon icon-checked-1"></i>';
                            }
                            else {
                                return '<i class="flx-icon icon-non-check-2 "></i>';
                            }
                        case 'date':
                            return moment(value).format('L');
                        case 'datetime':
                            return moment(value).format('L') + ' ' + moment(value).format('LTS');
                        default:
                            return value;
                    }
                }
                _getButton(btn, objectname, objectwhere, objectdefaults) {
                    let parentModule = $(this).closest('flx-module');
                    let wcModule = parentModule[0];
                    return wcModule.getButton(btn, objectname, objectwhere, objectdefaults);
                }
            }
            wc.FlxSearchElement = FlxSearchElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-search', flexygo.ui.wc.FlxSearchElement);
//# sourceMappingURL=flx-search.js.map