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
            * Library for the FlxKanban
            *
            * @class FlxKanban
            * @constructor
            * @return {FlxKanban} .
            */
            class FlxKanban extends HTMLElement {
                constructor() {
                    //If a constructor is defined, is REQUIRED call the super constructor
                    super();
                    /**
                    * Set if element has been connected to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                    this.sorting = false;
                    this.sortingFrom = null;
                    this.additionalWhere = '';
                    this.filterValues = null;
                    this.activeFilter = null;
                    this.moduleButtons = null;
                }
                /**
                * Array of observed attributes. REQUIRED
                * @property observedAttributes {Array}
                */
                static get observedAttributes() {
                    return ['ObjectName', 'ObjectWhere', 'ModuleName', 'AdditionalWhere'];
                }
                /**
                * Init the webcomponent. REQUIRED.
                * @method init
                */
                init() {
                    let me = $(this);
                    me.removeAttr('manualInit');
                    flexygo.events.on(this, "dialog", "closed", this.onDialogClosed);
                    this.filterValues = null;
                    this.activeFilter = null;
                    let history = flexygo.history.get(me);
                    let module = me.closest('flx-module')[0];
                    if (history && history.filtersValues && history.filtersValues[module.moduleName]) {
                        let state = history.filtersValues[module.moduleName];
                        if (state.activeFilter) {
                            this.activeFilter = state.activeFilter;
                        }
                        if (state.properties) {
                            this.filterValues = state.properties;
                        }
                    }
                    this.loadKanban(true, true);
                }
                /**
                * Refresh de webcomponent. REQUIRED.
                * @method refresh
                */
                refresh() {
                    if ($(this).attr('manualInit') != 'true') {
                        this.loadKanban(false, false);
                    }
                }
                setFilter() {
                    if ($(this).attr('manualInit') != 'true') {
                        this.loadKanban(false, false);
                    }
                }
                /**
                * Render HTML data.
                * @method render
                */
                render() {
                    var me = $(this);
                    me.empty();
                    me.append('<div class="board-header"></div>');
                    if (this.boardTitle) {
                        me.find('.board-header').append($('<div class="board-title"></div>').html(this.boardTitle));
                    }
                    if (this.boardDescrip) {
                        me.find('.board-header').append($('<div class="board-descrip"></div>').html(this.boardDescrip));
                    }
                    if (this.config.EndBoxLastState) {
                        this.endbox = $('<div class="board-endbox"><div class="board-endbox-text"><i class="' + this.config.EndBoxIconName + '" /> ' + this.config.EndBoxText + '</div></div>');
                        if (this.config.EndBoxCssClass) {
                            this.endbox.addClass(this.config.EndBoxCssClass);
                        }
                        me.find('.board-header').append(this.endbox);
                    }
                    this.panel = $('<div class="kanban-panel"></div>');
                    me.append(this.panel);
                    for (let i = 0; i < this.columns.length; i++) {
                        let newCol = $('<div class="kanban-div"><div class="kanban-col"><span class="kanban-descrip"></span><ul class="kanban-container" ></ul><div class="kanban-new-card"><i class="flx-icon icon-plus "/> ' + flexygo.localization.translate('flxkanban.addCard') + '...</div></div></div>');
                        let colData = this.columns[i];
                        newCol.attr('column-id', String(colData[this.config.ColumnIdField]));
                        newCol.find('.kanban-descrip').html(colData[this.config.ColumnDescripField]);
                        if (this.config.ColumnIconIdField && colData[this.config.ColumnIconIdField]) {
                            let newIcon = $('<i />');
                            newIcon.addClass(colData[this.config.ColumnIconIdField]);
                            newCol.find('.kanban-descrip').prepend(newIcon);
                        }
                        if (this.config.ColumnCssClassField && colData[this.config.ColumnCssClassField]) {
                            newCol.find('.kanban-col').addClass(colData[this.config.ColumnCssClassField]);
                        }
                        else {
                            newCol.find('.kanban-col').addClass('default');
                        }
                        this.panel.append(newCol);
                    }
                    if (this.panel.find('.kanban-div').length > 0) {
                        var colWidth = Math.trunc(this.panel.find('.kanban-div:first').outerWidth(true)) + 10;
                        this.panel.css('width', (this.columns.length * colWidth));
                    }
                    for (let i = 0; i < this.cards.length; i++) {
                        var cardData = this.cards[i];
                        let col = this.panel.find('[column-id="' + String(cardData[this.config.CardColumnIdField]) + '"] ul.kanban-container');
                        let newCard = $('<li class="kanban-card"><div class="kanban-card-descrip"></div></li>');
                        let descrip = cardData[this.config.ColumnDescripField];
                        if (this.config.CardContentTemplate) {
                            descrip = flexygo.utils.parser.compile(cardData, this.config.CardContentTemplate);
                        }
                        newCard.find('.kanban-card-descrip').append(descrip);
                        newCard.attr('card-id', cardData[this.config.CardIdField]);
                        let cardOrder = this.getCardOrder(String(cardData[this.config.CardColumnIdField]), cardData[this.config.CardIdField]);
                        if (cardOrder) {
                            newCard.attr('original-order', cardOrder);
                        }
                        col.append(newCard);
                    }
                    this.panel.find('.kanban-container').each((i, el) => {
                        var itms = $(el).find('li.kanban-card');
                        if (itms.length > 0) {
                            itms.detach();
                            itms = itms.sort(function (a, b) {
                                var o1 = parseInt($(a).attr('original-order'));
                                var o2 = parseInt($(b).attr('original-order'));
                                if (o1 < o2)
                                    return -1;
                                if (o1 > o2)
                                    return 1;
                                var p1 = $(a).attr('card-id');
                                var p2 = $(b).attr('card-id');
                                if ($.isNumeric(p1) && $.isNumeric(p2)) {
                                    p1 = parseFloat(p1);
                                    p2 = parseFloat(p2);
                                }
                                if (p1 < p2)
                                    return -1;
                                if (p1 > p2)
                                    return 1;
                                return 0;
                            });
                            $(el).append(itms);
                        }
                    });
                    if (this.config.onCardClick) {
                        this.panel.find('.kanban-card-descrip').on('mouseup', (event) => { if (!this.sorting) {
                            this.descripClick($(event.currentTarget.closest('li.kanban-card')), this.config.onCardClick);
                        } });
                    }
                    this.panel.find('.kanban-new-card').on('mouseup', (event) => { this.newCardClick($(event.currentTarget).closest('[column-id]')); });
                    this.panel.find('ul>li.kanban-card').on('mousedown', (ev) => {
                        me.find('.board-endbox').show();
                        if (this.filterValues && this.filterValues.length > 0) {
                            var itms = $(this).find('.kanban-card');
                            itms.each((indx, el) => {
                                if (!$(el).is($(ev.currentTarget))) {
                                    $(el).addClass('locked');
                                }
                            });
                        }
                    }).on('mouseup', () => { $(this).find('.kanban-card').removeClass('locked'); });
                    me.find('ul.kanban-container, .board-endbox').sortable({
                        connectWith: ".kanban-container, .board-endbox",
                        start: (event, ui) => { this.sortStart(ui.item); },
                        stop: (event, ui) => { this.sortStop(ui.item); },
                        update: (event, ui) => { if (this.filterValues && this.filterValues.length > 0 && ui.item.closest('[column-id]').attr('column-id') == this.sortingFrom) {
                            this.panel.find('ul.kanban-container').sortable('cancel');
                        } },
                        cancel: ".locked",
                        items: "li.kanban-card:not(.locked)"
                    }).disableSelection();
                    if (this.endbox) {
                        this.endbox.hide();
                    }
                    let parentModule = me.closest('flx-module');
                    let wcModule = parentModule[0];
                    if (parentModule && wcModule) {
                        wcModule.moduleLoaded(this);
                    }
                }
                getCardOrder(columnId, cardId) {
                    if (this.boardOrder) {
                        for (let i = 0; i < this.boardOrder.length; i++) {
                            let itm = this.boardOrder[i];
                            if (itm.columnId == columnId && itm.cardId == cardId) {
                                return itm.order;
                            }
                        }
                    }
                    return 999999;
                }
                sortStart(item) {
                    this.sortingFrom = item.closest('[column-id]').attr('column-id');
                    this.sorting = true;
                }
                sortStop(item) {
                    let newState = item.closest('[column-id]').attr('column-id');
                    let oldState = this.sortingFrom;
                    let cardId = item.attr('card-id');
                    if (newState == 'null') {
                        newState = null;
                    }
                    if (oldState == 'null') {
                        oldState = null;
                    }
                    item.closest('flx-kanban').find('.board-endbox').hide();
                    if (item.closest('.board-endbox').length > 0) {
                        if (this.config.EndBoxProcess) {
                            flexygo.nav.execProcess(this.config.EndBoxProcess, this.config.CardObjectName, this.config.CardIdField + '=' + "'" + cardId + "'", '', null, 'modal600x600', true, item);
                        }
                        else {
                            let card = new flexygo.obj.Entity(this.config.CardObjectName, this.config.CardIdField + '=' + "'" + cardId + "'");
                            card.read();
                            card.data[this.config.CardColumnIdField].Value = this.config.EndBoxLastState;
                            card.update();
                            item.remove();
                        }
                    }
                    else {
                        if (newState != oldState) {
                            //Update Card Column
                            if (this.config.onChangeColumnProcess) {
                                let cardChange = new flexygo.Process(this.config.onChangeColumnProcess, this.config.CardObjectName, this.config.CardIdField + '=' + "'" + cardId + "'");
                                let params = new Array();
                                params.push({ Key: 'BoardId', Value: this.boardId });
                                params.push({ Key: 'CardId', Value: cardId });
                                params.push({ Key: 'OldColumnId', Value: oldState });
                                params.push({ Key: 'NewColumnId', Value: newState });
                                let cllback = (response) => {
                                    if (response) {
                                        if (response.LastException && response.LastException.Message) {
                                            flexygo.msg.error(response.LastException.Message);
                                        }
                                        else if (response.WarningMessage) {
                                            flexygo.msg.warning(response.WarningMessage);
                                        }
                                    }
                                };
                                cardChange.showProgress = false;
                                cardChange.run(params, cllback);
                            }
                            else {
                                let card = new flexygo.obj.Entity(this.config.CardObjectName, this.config.CardIdField + '=' + "'" + cardId + "'");
                                card.read();
                                card.data[this.config.CardColumnIdField].Value = newState;
                                card.update();
                            }
                        }
                    }
                    if (!this.filterValues || this.filterValues.length == 0) {
                        //Update Card Disposition
                        let boardSort = new flexygo.obj.Entity('sysKanbanOrder', 'KanbanSettingsName=\'' + this.config.KanbanSettingsName + '\' and BoardId=\'' + this.boardId + '\'');
                        boardSort.read();
                        boardSort.data.KanbanSettingsName.Value = this.config.KanbanSettingsName;
                        boardSort.data.BoardId.Value = this.boardId;
                        boardSort.data.JsonData.Value = this.getConfig();
                        boardSort.update();
                    }
                    this.sorting = false;
                    this.sortingFrom = null;
                    $(this).find('.kanban-card').removeClass('locked');
                    let ev = {
                        class: "module",
                        type: "changed",
                        sender: item,
                        masterIdentity: newState,
                        detailIdentity: oldState
                    };
                    flexygo.events.trigger(ev);
                }
                getConfig() {
                    var cards = [];
                    $(this).find('[column-id]').each((i, col) => {
                        let colId = $(col).attr('column-id');
                        let ord = 1;
                        $(col).find('[card-id]').each((i, card) => {
                            cards.push({ order: ord, columnId: colId, cardId: $(card).attr('card-id') });
                            ord++;
                        });
                    });
                    this.boardOrder = cards;
                    return JSON.stringify(cards);
                }
                descripClick(el, pageType) {
                    flexygo.nav.openPage(pageType, this.config.CardObjectName, this.config.CardIdField + "='" + el.attr('card-id') + "'", null, 'modal', true);
                }
                newCardClick(el) {
                    let newDef = jQuery.extend(true, {}, this.defaults);
                    if (el.attr('column-id') != 'null') {
                        newDef[this.config.CardColumnIdField] = el.attr('column-id');
                    }
                    flexygo.nav.openPage('edit', this.config.CardObjectName, null, JSON.stringify(newDef), 'modal', true);
                }
                onDialogClosed(e) {
                    if (e.sender.objectname == this.config.CardObjectName && !this.sorting) {
                        this.refresh();
                    }
                }
                loadKanban(refreshButtons, refreshFilters) {
                    var me = $(this);
                    me.empty();
                    let params = {
                        ObjectName: me.attr('ObjectName'),
                        ObjectWhere: me.attr('ObjectWhere'),
                        ModuleName: this.moduleName,
                        AdditionalWhere: this.additionalWhere,
                        searchId: this.activeFilter,
                        filterValues: this.filterValues
                    };
                    flexygo.ajax.post('~/api/Kanban', 'GetKanban', params, (response) => {
                        if (response) {
                            this.config = response.KanbanSettings;
                            this.columns = response.Columns;
                            this.cards = response.Cards;
                            this.defaults = response.Defaults;
                            this.boardTitle = response.Title;
                            this.boardDescrip = response.Descrip;
                            this.boardId = response.BoardId;
                            this.boardOrder = JSON.parse(response.BoardOrder);
                            let parentModule = me.closest('flx-module');
                            let wcModule = parentModule[0];
                            this.filterobjectname = response.FilterObjectName;
                            if (parentModule.length > 0) {
                                let parentModuleClass = wcModule.moduleClass;
                                if (wcModule.moduleInitClass && wcModule.moduleInitClass != '') {
                                    parentModule.attr('class', wcModule.moduleInitClass);
                                }
                                if (parentModuleClass && parentModuleClass != '') {
                                    parentModule.addClass(parentModuleClass);
                                }
                                if (parentModule && wcModule) {
                                    this.moduleButtons = response.Buttons;
                                    if (refreshButtons && response.Buttons) {
                                        wcModule.setButtons(response.Buttons, response.FilterObjectName, response.FilterObjectWhere);
                                    }
                                    wcModule.setObjectDescrip(response.Title);
                                }
                            }
                            this.savedSearches = response.SavedSearches;
                            this.searchSettings = response.SearchSettings;
                            if (refreshFilters && response.SearchSettings) {
                                this.loadFilters(response.SearchSettings);
                            }
                            this.render();
                        }
                    });
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
                        fClt.key = this.filterobjectname + '-' + this.moduleName;
                        fClt.grid = this;
                        fClt.init();
                    }
                }
                /**
               * Establish webcomponent settings
               * @method configure
               */
                configure() {
                    flexygo.nav.openPage('edit', 'sysKanban_Setting', "Kanban_Settings.KanbanSettingsName='" + this.config.KanbanSettingsName + "'", null, 'popup', true);
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
                    this.additionalWhere = element.attr("AdditionalWhere");
                    if (element.attr('manualInit') != 'true') {
                        this.init();
                    }
                }
                /**
                * Fires when element is detached to DOM
                * @method disconnectedCallback
                */
                disconnectedCallback() {
                    //Remove event handler
                    flexygo.events.off(this, "dialog", "closed", this.onDialogClosed);
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
                    else if (attrName.toLowerCase() == 'additionalwhere' && newVal && newVal != '') {
                        this.additionalWhere = newVal;
                        needInit = true;
                    }
                    if (this.connected && needInit) {
                        this.init();
                    }
                }
            }
            wc.FlxKanban = FlxKanban;
        })(wc = ui_1.wc || (ui_1.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define("flx-kanban", flexygo.ui.wc.FlxKanban);
//# sourceMappingURL=flx-kanban.js.map