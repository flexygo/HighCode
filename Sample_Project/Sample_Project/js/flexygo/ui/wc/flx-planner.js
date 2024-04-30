/**
 * @namespace flexygo.ui.wc
 */
var flexygo;
(function (flexygo) {
    var ui;
    (function (ui_1) {
        var wc;
        (function (wc) {
            /**
            * Library for the FlxPlanner
            *
            * @class FlxPlanner
            * @constructor
            * @return {FlxPlanner} .
            */
            class FlxPlanner extends HTMLElement {
                //currentIndex: number = 0;
                constructor() {
                    super();
                    this.connected = false;
                    this.groupsFilter = '';
                    this.draggablesFilter = '';
                    this.additionalWhere = '';
                    this.pendingCards = new Array();
                    this.columns = new Array();
                    this.draggablesIsRender = false;
                    this.isRendered = false;
                    this.isLoading = false;
                    this.timeModes = {
                        MONTH: 'month',
                        WEEK: 'week'
                    };
                }
                static get observedAttributes() {
                    return ['ObjectName', 'ObjectWhere', 'ModuleName'];
                }
                connectedCallback() {
                    let element = $(this);
                    this.connected = true;
                    this.objectName = element.attr("ObjectName");
                    this.objectWhere = element.attr("ObjectWhere");
                    this.moduleName = element.attr("ModuleName");
                    this.currentModeId = element.attr("plannerInitMode");
                    this.plannerInitDate = element.attr("plannerInitDate");
                    this.defaults = element.attr("defaults");
                    this.init();
                }
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
                    else if (attrName.toLowerCase() == 'plannerInitMode' && newVal && newVal != '') {
                        this.currentModeId = newVal;
                        needInit = true;
                        //} else if (attrName.toLowerCase() == 'plannerInitDate' && newVal && newVal != '') {
                        //    this.plannerInitDate = newVal
                        //    needInit = true
                    }
                    if (this.connected && needInit) {
                        this.init();
                    }
                }
                init() {
                    try {
                        let me = $(this);
                        me.closest("flx-module").css("z-index", 0);
                        flexygo.utils.showLoadingEffect(10000000000, me.closest('flx-module'));
                        if (!this.plannerInitDate) {
                            this.plannerInitDate = moment().format('YYYY-MM-DD');
                        }
                        this.wcParentModule = me.closest('flx-module')[0];
                        if (this.defaults) {
                            if (typeof this.defaults == 'string') {
                                this.objDef = JSON.parse(this.defaults);
                            }
                            else {
                                this.objDef = this.defaults;
                            }
                        }
                        else {
                            let histObj = flexygo.history.get(me);
                            if (typeof histObj != 'undefined' && histObj.defaults) {
                                if (typeof histObj.defaults == 'string') {
                                    this.objDef = JSON.parse(flexygo.utils.parser.replaceAll(histObj.defaults, "'", '"'));
                                }
                                else {
                                    this.objDef = histObj.defaults;
                                }
                            }
                            if (this.objDef == null) {
                                if (this.wcParentModule) {
                                    this.objDef = this.wcParentModule.objectdefaults;
                                }
                            }
                        }
                        this.getPlannerConfig();
                    }
                    catch (ex) {
                        console.error('FlexyGo Planner', ex);
                    }
                }
                refresh() {
                    this.init();
                }
                getPlannerConfig() {
                    let params = {
                        ObjectName: $(this).attr('ObjectName'),
                        ObjectWhere: $(this).attr('ObjectWhere'),
                        ModuleName: this.moduleName,
                        Defaults: flexygo.utils.dataToArray(this.objDef),
                        PageName: flexygo.history.getPageName($(this)),
                        PlannerInitDate: moment(this.plannerInitDate).format('YYYY-MM-DD'),
                        PlannerInitMode: this.currentModeId,
                        TimeMode: this.currentTimemode,
                        AdditionalWhere: this.additionalWhere,
                        GroupsFilter: this.groupsFilter,
                        DraggablesFilter: this.draggablesFilter,
                        FilterValues: this.filterValues,
                        SearchId: this.activeFilter,
                    };
                    flexygo.ajax.post('~/api/Planner', 'GetPlanner', params, (response) => {
                        if (response) {
                            this.plannerId = response.PlannerId;
                            if (response.ErrorMessage) {
                                let html = `<div class="" id="pln-error-cont">
                                        <span class="pln-error-msg">${response.ErrorMessage}</span>
                                        <div class="pln-error-conf">
                                            <i class="flx-icon icon-settings3 pln-error-conf-icon"></i>
                                            <span class="pln-error-conf-txt">${flexygo.localization.translate('flxplanner.noconf')}</span>
                                        </div>
                                    </div>`;
                                $(this).html(html);
                                $(this).find('.pln-error-conf').on('click', (e) => {
                                    this.configure();
                                });
                            }
                            else {
                                this.objectName = response.PlannerObject;
                                this.objectWhere = response.PlannerWhere;
                                this.PlannerName = response.PlannerName;
                                this.MonthView = response.MonthView;
                                this.plannerModesSettings = response.PlannerModes;
                                this.plannerTitle = response.PlannerTitle;
                                this.currentModeId = response.PlannerInitMode;
                                this.plannerInitDate = moment(response.PlannerInitDate).format('YYYY-MM-DD');
                                this.currentTimemode = response.TimeMode;
                                this.dateStart = moment(response.StartDate).toDate();
                                this.dateEnd = moment(response.EndDate).toDate();
                                this.plannerSettings = response;
                                this.lastLoaded = response.PageSize;
                                this.pageSize = response.PageSize;
                                this.collectionName = response.CollectionName;
                                this.toolbar = response.Toolbar;
                                this.searchSettings = response.SearchSettings;
                                this.firstColumnInfo = flexygo.utils.isBlank(response.ItemGroups) ? [] : response.ItemGroups;
                                this.cardList = response.Items;
                                this.pendingCards = response.Items.Items;
                                this.currentModeSettings = this.plannerModesSettings.find((element) => element['ModeId'] === this.currentModeId);
                                this.wcParentModule.setButtons(this.toolbar, this.objectName, this.objectWhere);
                                this.loadFilters();
                                this.draggablesIsRender = false;
                                this.isRendered = false;
                                this.render();
                            }
                        }
                    }, null, () => { flexygo.utils.removeLoadingEffect(this.closest('flx-module')); });
                }
                render() {
                    this.drawBoard();
                    this.drawRows();
                    this.mainEvents();
                }
                setFilter() {
                    this.init();
                }
                drawBoard() {
                    let me = $(this);
                    let title = '<h3>' + this.plannerTitle + '</h3>';
                    let filters = '';
                    if (!flexygo.utils.isBlank(this.objDef)) {
                        this.currentModeSettings.ModeTitleTemplate = flexygo.utils.parser.recursiveCompile(this.objDef, this.currentModeSettings.ModeTitleTemplate);
                    }
                    let html = `
            <div id="planner-title">
                ${this.currentModeSettings.ModeTitleTemplate}
                </div>
            <section id="planner-main-container">
                <aside id="planner-withoutgroup" class="folded hidden">
                    <div id="planner-withoutgroup-title"><h4>${flexygo.localization.translate('flxplanner.draggables')}</h4></div>
                    <div id="planner-items-container"></div>
                    <div id="planner-withoutgroup-fold"><i class="flx-icon icon-arrow-head-5"></i></div>
                </aside>
                <div class="" id="planner-main" modeid="${this.currentModeId}">
                    <div class="pln-header-btns">
                        <div class="pln-time-btns">${this.drawTimeModeButtons()}</div>
                        <div class="pln-mode-btns">${this.drawModesButtons()}</div>
                    </div>
                    <div class="pln-table">${this.drawTable()}</div>
                </div>
            </section>`;
                    this.componentHTML = html;
                    $(this).html(this.componentHTML);
                }
                drawModesButtons() {
                    let modeBtns = '';
                    this.plannerModesSettings.forEach((element) => {
                        modeBtns += `<button class="pln-mode-btn ${element.ModeId == this.currentModeId ? "current" : ""}" modeid="${element.ModeId}">${element.ModeName}</button>`;
                    });
                    modeBtns += `<button class="develop-only pln-config" id="config-btn"><i class="flx-icon icon-settings-2"></i></button>`;
                    return modeBtns;
                }
                drawTimeModeButtons() {
                    let buttons = '';
                    buttons = `<button class="pln-btn-schedule clickable" id="btn-back"><i class="flx-icon icon-previous-1"></i></button>
                            <button class="pln-btn-schedule clickable" id="btn-today">${flexygo.localization.translate('flxplanner.today')}</button>
                            <button class="pln-btn-schedule clickable" id="btn-foward"><i class="flx-icon icon-next-1"></i></button>    
`;
                    if (this.plannerSettings.MonthView) {
                        buttons += `<button class="pln-btn-viewmode clickable ${this.currentTimemode === this.timeModes.WEEK ? "current" : ""}" timemodeid="week">${flexygo.localization.translate('flxplanner.week')}</button>
                           <button class="pln-btn-viewmode clickable ${this.currentTimemode === this.timeModes.MONTH ? "current" : ""}" timemodeid="month">${flexygo.localization.translate('flxplanner.month')}</button>`;
                    }
                    return buttons;
                }
                drawTable() {
                    this.columns = new Array();
                    for (let c = moment(this.dateStart); c.diff(this.dateEnd, 'days') <= 0; c.add(1, 'days')) {
                        this.columns.push(moment(c).toDate());
                    }
                    let showInput = navigator.userAgent.indexOf("Chrome") !== -1 ? true : false;
                    let firstCell = `<th class="pln-empty-cell">
                                <div class="pln-month-cont">
                                    <span class="pln-month ${showInput && this.currentTimemode === this.timeModes.MONTH ? "hidden" : ""}"> ${moment(this.dateStart).format('MMMM').toLocaleUpperCase()}</span> &nbsp;
                                    <span class="pln-month ${showInput ? "hidden" : ""}"> ${moment(this.dateStart).format('YYYY').toLocaleUpperCase()}</span>
                                    <input class="${showInput && this.currentTimemode === this.timeModes.MONTH ? "" : "hidden"}" type="month" value="${moment(this.dateStart).format('YYYY').toLocaleUpperCase()}-${moment(this.dateStart).format('MM').toLocaleUpperCase()}"/>
                                    <input class="${showInput && this.currentTimemode === this.timeModes.WEEK ? "" : "hidden"}" type="week" value="${moment(this.dateStart).format('YYYY').toLocaleUpperCase()}-W${moment(this.dateStart).format('WW')}"/>
                                </div></th>`;
                    let cells = '';
                    this.columns.forEach((element) => {
                        let tooltip = "";
                        if (!flexygo.utils.isBlank(this.currentModeSettings.DayMenuTemplate)) {
                            let dayMenuTemplate = flexygo.utils.parser.recursiveCompile({ PlannerDate: moment(element).format('YYYY-MM-DD') }, this.currentModeSettings.DayMenuTemplate);
                            if (!flexygo.utils.isBlank(this.objDef)) {
                                dayMenuTemplate = flexygo.utils.parser.recursiveCompile(this.objDef, dayMenuTemplate);
                            }
                            tooltip = `<span class="pln-btn-menu">
                        <i class="flx-icon icon-more clickable"></i>
                        <flx-tooltip mode="popover" container="body">${dayMenuTemplate}</flx-tooltip>
                    </span>`;
                        }
                        cells += `<th class="pln-date ${moment(element).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD') ? "currentDay" : ""}" datecolumn="${moment(element).format('YYYY-MM-DD')}">
                                <div>
                                    <span class="pln-date-day">${moment(element).format('ddd').replace('.', '')}</span>
                                    <span class="pln-date-day-number">${moment(element).format('D').replace('.', '')}</span>
                                    ${tooltip}
                                </div>
                          </th>`;
                    });
                    let firstRow = `<tr>${firstCell}${cells}</tr>`;
                    let table = `
            <table>
                <thead>
                    <!--<tr class="pln-month-info">
                        <th colspan="100%">
                            <span class="pln-month"> ${moment(this.dateStart).format('MMMM').toLocaleUpperCase()}</span> &nbsp;
                            <span class="pln-month"> ${moment(this.dateStart).format('YYYY').toLocaleUpperCase()}</span>
                        </th>
                    </tr>-->
                    ${firstRow}
                </thead>
                <tbody></tbody>
            </table>`;
                    return table;
                }
                drawRows() {
                    let rows = '';
                    this.isLoading = true;
                    let toLoadRows = this.pageSize;
                    if (this.lastLoaded > this.firstColumnInfo.length) {
                        toLoadRows = this.firstColumnInfo.length - (this.lastLoaded - toLoadRows);
                        this.lastLoaded = this.firstColumnInfo.length;
                        this.isRendered = true;
                    }
                    if (this.lastLoaded <= this.firstColumnInfo.length) {
                        for (let i = this.lastLoaded - toLoadRows; i < this.lastLoaded; i++) {
                            let e = this.firstColumnInfo[i];
                            let descrip = flexygo.utils.parser.recursiveCompile(e, this.currentModeSettings.FirstColTemplate);
                            descrip = flexygo.utils.parser.recursiveCompile({ PlannerMode: this.currentTimemode }, descrip);
                            if (!flexygo.utils.isBlank(this.objDef)) {
                                descrip = flexygo.utils.parser.recursiveCompile(this.objDef, descrip);
                            }
                            rows += `<tr> <th class="pln-cell pln-group-cell" rowidfield="${this.currentModeSettings.FirstColId}" rowidvalue="${e[this.currentModeSettings.FirstColId]}" firstcolumn >
                                    <!--<span class="pln-btn-menu clickable"><i class="flx-icon icon-more icon-rotate-90"></i></span>-->
                                    ${descrip}
                                </th>`;
                            this.columns.forEach((element) => {
                                let tooltip = "";
                                if (!flexygo.utils.isBlank(this.currentModeSettings.CellMenuTemplate)) {
                                    let cellMenuTemplate = flexygo.utils.parser.recursiveCompile({ PlannerDate: moment(element).format('YYYY-MM-DD'), GroupId: e[this.currentModeSettings.FirstColId] }, this.currentModeSettings.CellMenuTemplate);
                                    if (!flexygo.utils.isBlank(this.objDef)) {
                                        cellMenuTemplate = flexygo.utils.parser.recursiveCompile(this.objDef, cellMenuTemplate);
                                    }
                                    tooltip = `<span class="pln-btn-menu">
                                <i class="flx-icon icon-more clickable"></i>
                                <flx-tooltip mode="popover" container="body">${cellMenuTemplate}</flx-tooltip>
                            </span>`;
                                }
                                rows += `<th class="pln-cell pln-date-cell ${moment(element).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD') ? "currentDay" : ""}" datecolumn="${moment(element).format('YYYY-MM-DD')}" rowidfield="${this.currentModeSettings.FirstColId}" rowidvalue="${e[this.currentModeSettings.FirstColId]}">
                                        ${tooltip}
                                    </th>`;
                            });
                            rows += `</tr>`;
                        }
                        this.lastLoaded += this.pageSize;
                        $(this).find('tbody').append($(rows));
                    }
                    let cardsConfig = this.currentModeSettings.CardsMode;
                    cardsConfig.forEach((cardConfig) => {
                        let cards = this.pendingCards.filter((card) => card._cardconfigid == cardConfig.ModeCardId);
                        this.draggablesIsRender = false;
                        cards.forEach((card) => {
                            let date = moment(card[cardConfig.CardDateField.toLocaleLowerCase()]).format('YYYY-MM-DD');
                            let rowIdField = cardConfig.CardRowId;
                            let rowId = card[rowIdField];
                            let customClass = !flexygo.utils.isBlank(cardConfig.CardClassNameField) ? (!flexygo.utils.isBlank(card[cardConfig.CardClassNameField]) ? card[cardConfig.CardClassNameField] : '') : '';
                            let customStyle = !flexygo.utils.isBlank(cardConfig.CardStyleField) ? (!flexygo.utils.isBlank(card[cardConfig.CardStyleField]) ? card[cardConfig.CardStyleField] : '') : '';
                            let cell = $(this).find(`[datecolumn="${date}"][rowidfield="${rowIdField}"][rowidvalue="${rowId}"]`);
                            if (cell.length > 0) {
                                let descrip = flexygo.utils.parser.recursiveCompile(card, cardConfig.CardTemplate);
                                descrip = flexygo.utils.parser.recursiveCompile({ PlannerMode: this.currentTimemode }, descrip);
                                if (!flexygo.utils.isBlank(this.objDef)) {
                                    descrip = flexygo.utils.parser.recursiveCompile(this.objDef, descrip);
                                }
                                if ((cell.find('.pln-card')[0] && cell.find('.pln-card')[0].plannerCardData.priority == cardConfig.Order.toString()) || $(cell).find('.pln-card').length == 0) {
                                    let cardTemplate;
                                    if (cardConfig.Editable) {
                                        cardTemplate = $(`<div class="pln-card pln-sortable ${customClass}" style="${customStyle}">
                                        <span class="pln-card-edit clickable"><i class="flx-icon icon-pencil txt-notify icon-zoom-115"></i></span>
                                        <span class="pln-card-delete clickable"><i class="fa fa-close txt-danger icon-zoom-115"></i></span>
                                        ${descrip}
                                    </div>`)[0];
                                    }
                                    else {
                                        cardTemplate = $(`<div class="pln-card ${customClass}" style="${customStyle}">
                                        ${descrip}
                                    </div>`)[0];
                                    }
                                    this.setCardData(cardTemplate, card, cardConfig);
                                    cell.append(cardTemplate);
                                }
                                this.pendingCards = this.pendingCards.filter(item => item !== card);
                            }
                        });
                        if (!this.draggablesIsRender) {
                            let draggablecards = this.cardList.ItemsDraggable.filter((card) => card._cardconfigid == cardConfig.ModeCardId);
                            if (draggablecards.length > 0) {
                                $(this).find("aside").removeClass("hidden");
                                let container = $(this).find('#planner-withoutgroup #planner-items-container');
                                container.append(`<div class="pln-draggable-item-container" id="pln-draggable-${cardConfig.ModeCardId}"><span class="pln-draggable-item-title">${cardConfig.DraggableTitle}</span></div>`);
                                draggablecards.forEach((card) => {
                                    let dragableContainer = $(`#pln-draggable-${cardConfig.ModeCardId}`);
                                    let descrip = flexygo.utils.parser.recursiveCompile(card, cardConfig.DraggableTemplate);
                                    if (!flexygo.utils.isBlank(this.objDef)) {
                                        descrip = flexygo.utils.parser.recursiveCompile(this.objDef, descrip);
                                    }
                                    let cardTemplate = $(`<div class="pln-card pln-card-draggable clickable" draggableidfield="${cardConfig.DraggableObjectId}" draggableidvalue="${card[cardConfig.DraggableObjectId]}" draggableobjectname="${cardConfig.DraggableCollection}">${descrip}</div>`)[0];
                                    this.setCardData(cardTemplate, card, cardConfig, true);
                                    dragableContainer.append(cardTemplate);
                                });
                            }
                            this.draggablesIsRender = true;
                        }
                    });
                }
                mainEvents() {
                    let me = $(this);
                    this.timeButtonsEvents();
                    this.modesButtonsEvents();
                    if (!this.isRendered) {
                        me.find(".pln-table").off('scroll').on('scroll', (ev) => {
                            if ($(ev.currentTarget).scrollTop() + $(ev.currentTarget).innerHeight() >= $(ev.currentTarget)[0].scrollHeight) {
                                if (!this.isLoading) {
                                    flexygo.utils.showLoadingEffect(10000000000, me.closest('flx-module'));
                                    setTimeout(() => { this.drawRows(); this.mainEvents(); }, 500);
                                }
                            }
                        });
                    }
                    else {
                        me.find(".pln-table").off('scroll');
                    }
                    this.isLoading = false;
                    me.find('button#config-btn').on('click', (e) => {
                        this.configureMode();
                    });
                    me.find('#planner-withoutgroup-fold').off('click').on('click', () => {
                        let itemsWithoutGroup = me.find('#planner-withoutgroup');
                        (itemsWithoutGroup.hasClass('folded')) ? itemsWithoutGroup.removeClass('folded') : itemsWithoutGroup.addClass('folded');
                    });
                    me.find('.pln-date-cell[datecolumn]').off('dblclick').on('dblclick', (e) => {
                        let me = this;
                        let cell = $(e.currentTarget);
                        let modeStg = me.currentModeSettings.CardsMode.filter((card) => card.Editable);
                        if (modeStg.length > 1) {
                            let myButtons = new Object();
                            let buttons = '';
                            modeStg.forEach((mode) => {
                                myButtons[mode.CardColName] = {
                                    ObjectName: mode.CardColName,
                                    Descrip: mode.CardEntityConfiguration.Descrip,
                                    GroupField: mode.CardRowId,
                                    DateField: mode.CardDateField.toLocaleLowerCase(),
                                    IconClass: mode.CardEntityConfiguration.Icon
                                };
                                buttons += `<button class="btn btn-default bg-outstanding margin-s planner-objects-action" objectName="${mode.CardColName}">
                                        <i class="${myButtons[mode.CardColName].IconClass}"></i>
                                        ${myButtons[mode.CardColName].Descrip}
                                    </button>`;
                            });
                            $.sweetModal({
                                title: flexygo.localization.translate('flxplanner.chooseobject'),
                                content: '<div>' + buttons + '</div>',
                                width: '35%'
                            });
                            $(".planner-objects-action").click(function (e) {
                                let object = myButtons[$(e.currentTarget).attr('objectName')];
                                me.openEvent(object.ObjectName, object.GroupField, object.DateField, cell.attr("rowidvalue"), cell.attr("datecolumn"));
                                $('.sweet-modal-overlay').remove();
                            });
                        }
                        else if (modeStg.length == 1) {
                            me.openEvent(modeStg[0].CardColName, modeStg[0].CardRowId, modeStg[0].CardDateField.toLocaleLowerCase(), cell.attr("rowidvalue"), cell.attr("datecolumn"));
                        }
                    });
                    me.find('.pln-card .pln-card-delete i').off('click').on('click', (e) => {
                        this.objectActions($(e.currentTarget).closest(".pln-card")[0], "delete");
                    });
                    me.find('.pln-card .pln-card-edit i').off('click').on('click', (e) => {
                        this.objectActions($(e.currentTarget).closest(".pln-card")[0], "edit");
                    });
                    me.find('.pln-cell.pln-date-cell:not(.pln-cell-sortable)').sortable({
                        connectWith: ".pln-cell.pln-date-cell",
                        items: "> .pln-card.pln-sortable",
                        start: function (event, ui) {
                            ui.placeholder.html(ui.item.html());
                        },
                        update: (event, ui) => {
                            if (flexygo.utils.isBlank(ui.sender)) {
                                this.objectActions(ui.item[0], "update");
                            }
                        }
                    }).disableSelection();
                    me.find('.pln-cell.pln-date-cell:not(.pln-cell-sortable)').addClass("pln-cell-sortable");
                    me.find('#planner-items-container:not(.pln-container-sortable)').sortable({
                        connectWith: ".pln-cell.pln-date-cell",
                        items: ".pln-draggable-item-container > .pln-card",
                        start: function (event, ui) {
                            ui.placeholder.html(ui.item.html());
                        },
                        update: (event, ui) => {
                            if (flexygo.utils.isBlank(ui.sender)) {
                                this.objectActions(ui.item[0], "insert");
                            }
                        }
                    }).disableSelection();
                    me.find('#planner-items-container:not(.pln-container-sortable)').addClass("pln-container-sortable");
                    this.dragScroll();
                    flexygo.utils.removeLoadingEffect(me.closest('flx-module'));
                }
                timeButtonsEvents() {
                    let me = $(this);
                    me.find(".pln-time-btns .pln-btn-schedule").off('click').on('click', (e) => {
                        let type = $(e.currentTarget).attr("id");
                        switch (type) {
                            case "btn-back":
                                if (this.currentTimemode === this.timeModes.WEEK) {
                                    this.plannerInitDate = moment(this.plannerInitDate).subtract(7, 'days').toDate().toString();
                                }
                                else if (this.currentTimemode === this.timeModes.MONTH) {
                                    this.plannerInitDate = moment(this.plannerInitDate).subtract(1, 'month').toString();
                                }
                                break;
                            case "btn-foward":
                                if (this.currentTimemode === this.timeModes.WEEK) {
                                    this.plannerInitDate = moment(this.plannerInitDate).add(7, 'days').toDate().toString();
                                }
                                else if (this.currentTimemode === this.timeModes.MONTH) {
                                    this.plannerInitDate = moment(this.plannerInitDate).add(1, 'month').toDate().toString();
                                }
                                break;
                            default:
                                this.plannerInitDate = moment().toDate().toString();
                        }
                        this.init();
                    });
                    me.find(".pln-time-btns .pln-btn-viewmode").off('click').on('click', (e) => {
                        let type = $(e.currentTarget).attr("timemodeid");
                        switch (type) {
                            case "week":
                                this.currentTimemode = this.timeModes.WEEK;
                                break;
                            case "month":
                                this.currentTimemode = this.timeModes.MONTH;
                                break;
                        }
                        this.init();
                    });
                    me.find('thead .pln-month-cont input').off('change').on('change', (e) => {
                        let newDate = $(e.currentTarget).val();
                        if (!flexygo.utils.isBlank(newDate)) {
                            if (this.currentTimemode === this.timeModes.WEEK) {
                                let year = newDate.split('-')[0];
                                let week = (newDate.split('-')[1]).replace('W', '');
                                this.plannerInitDate = moment().year(year).week(week).day("Monday").format("YYYY-MM-DD");
                            }
                            else if (this.currentTimemode === this.timeModes.MONTH) {
                                this.plannerInitDate = moment(newDate).format("YYYY-MM-DD");
                            }
                            this.init();
                        }
                    });
                }
                modesButtonsEvents() {
                    let me = $(this);
                    this.plannerModesSettings.forEach((mode) => {
                        me.find(`button[modeid=${mode.ModeId}]`).off('click').on('click', (e) => {
                            this.currentModeId = mode.ModeId;
                            this.init();
                        });
                    });
                }
                openEvent(objectName, GroupField, DateField, GroupId, DateInfo) {
                    let defaults = {
                        [GroupField]: GroupId,
                        [DateField]: DateInfo
                    };
                    flexygo.nav.openPage('edit', objectName, null, JSON.stringify(defaults), 'modal1024x768', false, $(this));
                }
                showContextMenu(template, e) {
                    let plannerContext = $("flx-contextmenu");
                    let plannerContext0 = plannerContext[0];
                    plannerContext0.createMenu($(e));
                    plannerContext0.menu.html(`<div class="pln-context-menu">${template}</div>`);
                    plannerContext.show();
                }
                setCardData(card, cardData, cardConfig, isnew = false) {
                    let id = new Array;
                    card.plannerCardData = {
                        id: null,
                        modeCardId: cardConfig.ModeCardId,
                        objectName: cardConfig.CardColName,
                        groupField: cardConfig.CardRowId,
                        groupId: cardData[cardConfig.CardRowId],
                        dateField: cardConfig.CardDateField.toLocaleLowerCase(),
                        priority: cardConfig.Order,
                        idField: cardConfig.CardId,
                        onAddFunction: cardConfig.OnAddFunction,
                        onMoveFunction: cardConfig.OnMoveFunction,
                        onDeleteFunction: cardConfig.OnDeleteFunction,
                        entityConfiguration: null,
                        data: cardData
                    };
                    if (isnew) {
                        cardConfig.DraggableEntityConfiguration.ObjectKeys.forEach((key) => id.push({
                            [key.toLocaleLowerCase()]: cardData[key.toLocaleLowerCase()]
                        }));
                        card.plannerCardData.entityConfiguration = cardConfig.DraggableEntityConfiguration;
                    }
                    else {
                        cardConfig.CardEntityConfiguration.ObjectKeys.forEach((key) => id.push({ [key.toLocaleLowerCase()]: cardData[key.toLocaleLowerCase()] }));
                        card.plannerCardData.entityConfiguration = cardConfig.CardEntityConfiguration;
                    }
                    card.plannerCardData.id = JSON.stringify(id);
                }
                objectActions(e, mode) {
                    let card = e;
                    let cellContainer = $(e).closest('th');
                    let groupId = cellContainer.attr("rowidvalue");
                    let dateInfo = cellContainer.attr("datecolumn");
                    let obj = new flexygo.obj.Entity(card.plannerCardData.entityConfiguration.ObjectName, (flexygo.utils.isJSON(card.plannerCardData.id.toString())) ? this.getObjectWhere(card) : null);
                    switch (mode) {
                        case "insert":
                            let onAddFunction = card.plannerCardData.onAddFunction;
                            obj.read();
                            if (flexygo.utils.isBlank(onAddFunction)) {
                                flexygo.msg.warning(flexygo.localization.translate('flxplanner.addempty'));
                            }
                            else {
                                flexygo.utils.execAsyncFunction(onAddFunction, ['entity', 'groupId', 'plannerDate', 'triggerElement'], [obj, groupId, dateInfo, $(card)])
                                    .then((newData) => {
                                    if (newData) {
                                        this.setCardData(card, newData, this.currentModeSettings.CardsMode.find((element) => element['ModeCardId'] === card.plannerCardData.modeCardId));
                                        this.highlightItem(card, flexygo.colors.success);
                                    }
                                    this.refreshDraggrableGroup(card.plannerCardData.modeCardId);
                                    this.refreshCell(this.currentModeId, groupId, dateInfo);
                                }).catch((err) => {
                                    flexygo.msg.error(flexygo.utils.getErrorMessage(err));
                                });
                            }
                            break;
                        case "update":
                            if (!$(card).hasClass("pln-carg-draggable")) {
                                obj.read();
                                let onMoveFunction = card.plannerCardData.onMoveFunction;
                                if (flexygo.utils.isBlank(onMoveFunction)) {
                                    obj.data[card.plannerCardData.groupField].Value = groupId;
                                    obj.data[card.plannerCardData.dateField].Value = dateInfo;
                                    if (obj.update()) {
                                        this.highlightItem(card, flexygo.colors.success);
                                    }
                                }
                                else {
                                    flexygo.utils.execAsyncFunction(onMoveFunction, ['entity', 'groupId', 'plannerDate', 'triggerElement'], [obj, groupId, dateInfo, $(card)])
                                        .then((newData) => {
                                        if (newData) {
                                            this.setCardData(card, newData, this.currentModeSettings.CardsMode.find((element) => element['ModeCardId'] === card.plannerCardData.modeCardId));
                                            this.highlightItem(card, flexygo.colors.success);
                                        }
                                    }).catch((err) => {
                                        flexygo.msg.error(flexygo.utils.getErrorMessage(err));
                                    });
                                }
                            }
                            this.refreshCell(this.currentModeId, groupId, dateInfo);
                            break;
                        case "delete":
                            flexygo.msg.confirm(flexygo.localization.translate('flxplanner.remove'), (result) => {
                                if (result) {
                                    obj.read();
                                    let onDeleteFunction = card.plannerCardData.onDeleteFunction;
                                    if (flexygo.utils.isBlank(onDeleteFunction)) {
                                        if (obj.delete()) {
                                            if (obj.warningMessage) {
                                                flexygo.msg.warning(obj.warningMessage);
                                            }
                                            else {
                                                if (obj.successMessage) {
                                                    flexygo.msg.success(obj.successMessage);
                                                }
                                                else {
                                                    flexygo.msg.success(flexygo.localization.translate('flxmodule.deleted'));
                                                }
                                            }
                                            $(card).fadeOut('slow', function () { $(card).remove(); });
                                        }
                                    }
                                    else {
                                        flexygo.utils.execAsyncFunction(onDeleteFunction, ['entity', 'groupId', 'plannerDate', 'triggerElement'], [obj, groupId, dateInfo, $(card)])
                                            .then((e) => {
                                            if (e) {
                                                $(card).fadeOut('slow', function () { $(card).remove(); });
                                            }
                                        }).catch((err) => {
                                            flexygo.msg.error(flexygo.utils.getErrorMessage(err));
                                        });
                                    }
                                    this.refreshCell(this.currentModeId, groupId, dateInfo);
                                }
                            });
                            break;
                        case 'edit':
                            obj.read();
                            flexygo.nav.openPage('edit', obj.objectName, obj.objectWhere, null, 'popup', false, $(this));
                            break;
                    }
                }
                dragScroll() {
                    const eleX = $(this).find('.pln-table');
                    const eleY = eleX;
                    let pos = { top: 0, left: 0, x: 0, y: 0 };
                    const mouseDownHandler = function (e) {
                        if ($(e.target).closest('.pln-card').length === 0 && !$(e.target).hasClass('.pln-card')) {
                            eleX.css({ cursor: 'grabbing', userSelect: 'none' });
                            pos = {
                                left: eleX.scrollLeft(),
                                top: eleY.scrollTop(),
                                x: e.clientX,
                                y: e.clientY,
                            };
                            $(document).on('mousemove', mouseMoveHandler);
                            $(document).on('mouseup', mouseUpHandler);
                        }
                    };
                    const mouseMoveHandler = function (e) {
                        const dx = e.clientX - pos.x;
                        const dy = e.clientY - pos.y;
                        eleY.scrollTop(pos.top - dy);
                        eleX.scrollLeft(pos.left - dx);
                    };
                    const mouseUpHandler = function () {
                        eleX.css({ cursor: 'grab' });
                        eleX.css('user-select', '');
                        $(document).off('mousemove', mouseMoveHandler);
                        $(document).off('mouseup', mouseUpHandler);
                    };
                    eleX.on('mousedown', mouseDownHandler);
                }
                getObjectWhere(card) {
                    let where = ``;
                    let id = JSON.parse(card.plannerCardData.id);
                    id.forEach((value, index) => {
                        where += `[${card.plannerCardData.entityConfiguration.TableName}].[${Object.keys(value)[0]}] = '${value[Object.keys(value)[0]]}'${(index < (id.length - 1)) ? ` AND ` : ``}`;
                    });
                    return where;
                }
                highlightItem(e, newBg) {
                    let olbBg = $(e).css("background-color");
                    $(e).animate({ 'background-color': newBg }, 200).delay(200).animate({ 'background-color': olbBg }, 200);
                }
                configureMode() {
                    flexygo.nav.openPage('edit', 'sysPlannerMode', "PlannerModesObjects.PlannerModeId='" + this.currentModeId + "'", null, 'popup', true);
                }
                configure() {
                    flexygo.nav.openPage('edit', 'sysPlanner', "Planners.PlannerId='" + this.plannerId + "'", null, 'popup', true);
                }
                loadFilters() {
                    if (this.searchSettings) {
                        let pane = $(this.wcParentModule).find('.cntBodyHeader .filterPanel');
                        let filter = $('<flx-filter></flx-filter>');
                        let wcFilter = filter[0];
                        if (pane.length == 0 && this.toolbar && Object.keys(this.toolbar).length > 0) {
                            pane = $('<div class="filterPanel"/>');
                            $(this.wcParentModule).find('.cntBodyHeader').append(pane);
                        }
                        pane.html(filter);
                        if (wcFilter) {
                            wcFilter.settings = this.searchSettings;
                            wcFilter.key = this.objectName + '-' + this.moduleName;
                            wcFilter.grid = this;
                            wcFilter.init();
                        }
                    }
                }
                refreshDraggrableGroup(mode) {
                    let groupsContainer = $(`#pln-draggable-${mode}`);
                    groupsContainer.empty();
                    let cardConfig = (this.currentModeSettings.CardsMode.filter((cardC) => cardC.ModeCardId == mode))[0];
                    let draggablecards = this.cardList.ItemsDraggable.filter((card) => card._cardconfigid == cardConfig.ModeCardId);
                    if (draggablecards.length > 0) {
                        $(this).find("aside").removeClass("hidden");
                        groupsContainer.append(`<span class="pln-draggable-item-title">${cardConfig.DraggableTitle}</span>`);
                        draggablecards.forEach((card) => {
                            let descrip = flexygo.utils.parser.recursiveCompile(card, cardConfig.DraggableTemplate);
                            if (!flexygo.utils.isBlank(this.objDef)) {
                                descrip = flexygo.utils.parser.recursiveCompile(this.objDef, descrip);
                            }
                            let cardTemplate = $(`<div class="pln-card pln-card-draggable clickable" draggableidfield="${cardConfig.DraggableObjectId}" draggableidvalue="${card[cardConfig.DraggableObjectId]}" draggableobjectname="${cardConfig.DraggableCollection}">${descrip}</div>`)[0];
                            this.setCardData(cardTemplate, card, cardConfig, true);
                            groupsContainer.append(cardTemplate);
                        });
                    }
                }
                refreshCell(modeId, rowIdField, dateColumn) {
                    let cards;
                    let params = {
                        PlannerModeId: modeId,
                        CellDay: dateColumn,
                        CellRowId: rowIdField
                    };
                    flexygo.ajax.post('~/api/Planner', 'GetCellCards', params, (response) => {
                        if (response) {
                            let cell = $(`.pln-cell.pln-date-cell[datecolumn="${dateColumn}"][rowidvalue="${rowIdField}"]`);
                            if (cell.length > 0) {
                                cell.children('.pln-card').remove();
                                cards = response.Items;
                                if (cards.length > 0) {
                                    let cardsConfig = this.currentModeSettings.CardsMode;
                                    cardsConfig.forEach((cardConfig) => {
                                        let currentCard = cards.filter((card) => card._cardconfigid == cardConfig.ModeCardId)[0];
                                        if (currentCard) {
                                            let customClass = !flexygo.utils.isBlank(cardConfig.CardClassNameField) ? (!flexygo.utils.isBlank(currentCard[cardConfig.CardClassNameField]) ? currentCard[cardConfig.CardClassNameField] : '') : '';
                                            let customStyle = !flexygo.utils.isBlank(cardConfig.CardStyleField) ? (!flexygo.utils.isBlank(currentCard[cardConfig.CardStyleField]) ? currentCard[cardConfig.CardStyleField] : '') : '';
                                            let descrip = flexygo.utils.parser.recursiveCompile(currentCard, cardConfig.CardTemplate);
                                            descrip = flexygo.utils.parser.recursiveCompile({ PlannerMode: this.currentTimemode }, descrip);
                                            if (!flexygo.utils.isBlank(this.objDef)) {
                                                descrip = flexygo.utils.parser.recursiveCompile(this.objDef, descrip);
                                            }
                                            if ((cell.find('.pln-card')[0] && cell.find('.pln-card')[0].plannerCardData.priority == cardConfig.Order.toString()) || $(cell).find('.pln-card').length == 0) {
                                                let cardTemplate;
                                                if (cardConfig.Editable) {
                                                    cardTemplate = $(`<div class="pln-card pln-sortable ${customClass}" style="${customStyle}">
                                        <span class="pln-card-edit clickable"><i class="flx-icon icon-pencil txt-notify icon-zoom-115"></i></span>
                                        <span class="pln-card-delete clickable"><i class="fa fa-close txt-danger icon-zoom-115"></i></span>
                                        ${descrip}
                                    </div>`)[0];
                                                }
                                                else {
                                                    cardTemplate = $(`<div class="pln-card ${customClass}" style="${customStyle}">
                                        ${descrip}
                                    </div>`)[0];
                                                }
                                                this.setCardData(cardTemplate, currentCard, cardConfig);
                                                cell.append(cardTemplate);
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    });
                }
            }
            wc.FlxPlanner = FlxPlanner;
        })(wc = ui_1.wc || (ui_1.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define("flx-planner", flexygo.ui.wc.FlxPlanner);
//# sourceMappingURL=flx-planner.js.map