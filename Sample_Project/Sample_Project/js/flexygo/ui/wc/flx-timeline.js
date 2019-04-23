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
            * Library for the FlxTimelineElement
            *
            * @class FlxTimelineElement
            * @constructor
            * @return {FlxTimelineElement} .
            */
            class FlxTimelineElement extends HTMLElement {
                constructor() {
                    //If a constructor is defined, is REQUIRED call the super constructor
                    super();
                    /**
                    * Vis Timeline
                    * @property timelineranges {flexygo.api.timeline.timelineRanges}
                    */
                    this.timelineRanges = { Hour: 1800000, Day: 43200000, Week: 345600000, Month: 1296000000, Year: 15811200000 };
                }
                /**
                * Array of observed attributes. REQUIRED
                * @property observedAttributes {Array}
                */
                static get observedAttributes() {
                    return ['ModuleName'];
                }
                /**
                * Init the webcomponent. REQUIRED.
                * @method init
                */
                init() {
                    try {
                        let me = $(this);
                        me.removeAttr('manualInit');
                        this.filterValues = null;
                        this.activeFilter = null;
                        this.wcParentModule = me.closest('flx-module')[0];
                        if (!this.wcParentModule) {
                            flexygo.msg.error('flx-timeline has to be inside a flx-module');
                            throw 'flx-timeline has to be inside a flx-module';
                        }
                        let history = flexygo.history.get(me);
                        if (history && history.filtersValues && history.filtersValues[this.wcParentModule.moduleName]) {
                            let filterHistoryValue = history.filtersValues[this.wcParentModule.moduleName];
                            if (filterHistoryValue.activeFilter) {
                                this.activeFilter = filterHistoryValue.activeFilter;
                            }
                            if (filterHistoryValue.properties) {
                                this.filterValues = filterHistoryValue.properties;
                            }
                        }
                        this.getTimeline();
                    }
                    catch (ex) {
                        console.error('FlexyGo Timeline', ex);
                    }
                }
                /**
                * Refresh of webcomponent. REQUIRED.
                * @method refresh
                */
                refresh() {
                    if ($(this).attr('manualInit') != 'true') {
                        //TODO: Modificar
                        this.init();
                    }
                }
                /**
                * Set filter of webcomponent. REQUIRED.
                * @method refresh
                */
                setFilter() {
                    if ($(this).attr('manualInit') != 'true') {
                        //TODO: Modificar pedir los items a el controller
                        this.getTimeline();
                    }
                }
                /**
                * Render HTML data.
                * @method render
                */
                render() {
                    try {
                        let itemsWithoutGroup = `<aside id="items_without_group" class="folded">
                                                        <div>
                                                            <h4>${this.timelineSetting.TitleItemsWithoutGroup}</h4>
                                                        </div>
                                                        <div id="items-container"></div>
                                                        <div class="fold"> 
                                                            <i class="flx-icon icon-arrow-head-5"/> 
                                                        </div>
                                                    </aside>`;
                        let controls = `<div id="controls">
                                            <div>                            
                                                <button type="button" method="navigation" value="0.9"><i class="fa fa-angle-left"/></button>
                                                <button type="button" method="today">${flexygo.localization.translate('flxtimeline.today')}</button>
                                                <button type="button" method="navigation" value="-0.9" value="0.9"><i class="fa fa-angle-right"/></button>                           
                                            </div>
                                            <div>
                                                <button type="button" method="changeRange" range="Hour" value="${this.timelineRanges.Hour}">${flexygo.localization.translate('flxtimeline.hour')}</button>
                                                <button type="button" method="changeRange" range="Day" value="${this.timelineRanges.Day}">${flexygo.localization.translate('flxtimeline.day')}</button>
                                                <button type="button" method="changeRange" range="Week" value="${this.timelineRanges.Week}">${flexygo.localization.translate('flxtimeline.week')}</button>
                                                <button type="button" method="changeRange" range="Month" value="${this.timelineRanges.Month}">${flexygo.localization.translate('flxtimeline.month')}</button>
                                                <button type="button" method="changeRange" range="Year" value="${this.timelineRanges.Year}">${flexygo.localization.translate('flxtimeline.year')}</button>
                                            </div>
                                        </div>`;
                        $(this).html(`<section id="timeline_container" ShowControls="${this.timelineSetting.ShowControls}" layout=" ${(this.timelineSetting.WithGroups && this.timelineSetting.Editable && this.timelineSetting.ShowItemsWithoutGroup && this.timelineSetting.LayoutName) ? this.timelineSetting.LayoutName : ''}">
                               ${(this.timelineSetting.WithGroups && this.timelineSetting.Editable && this.timelineSetting.ShowItemsWithoutGroup) ? itemsWithoutGroup : ''}
                                <div id="vis">
                                ${(this.timelineSetting.ShowControls) ? controls : ''}                               
                                </div>
                            </section>`);
                        if (!flexygo.utils.isBlank(this.timelineSetting.DefaultRangeName)) {
                            $(this).find(`#controls > div > button[range="${this.timelineSetting.DefaultRangeName}"]`).addClass('active');
                        }
                        this.setStructureEvents();
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                /**
                * Set Structure Events.
                * @method setStructureEvents
                */
                setStructureEvents() {
                    let removeActiveRangeEvent = (e) => {
                        $(this).find('#controls > div > button.active').removeClass('active');
                    };
                    let flagEventMousewheel = false;
                    if (this.timelineSetting.WithGroups && this.timelineSetting.Editable && this.timelineSetting.ShowItemsWithoutGroup) {
                        $(this).find('#items_without_group > div.fold').off('click.timeline').on('click.timeline', () => {
                            let itemsWithoutGroup = $(this).find('#items_without_group');
                            (itemsWithoutGroup.hasClass('folded')) ? itemsWithoutGroup.removeClass('folded') : itemsWithoutGroup.addClass('folded');
                        });
                    }
                    $(document).off('keydown.timeline keyup.timeline').on({
                        'keydown.timeline': (e) => {
                            if (e.shiftKey && e.keyCode === 71 && !this.visTimeline.itemSet.options.multiselectPerGroup) {
                                this.visTimeline.setOptions({ multiselectPerGroup: true });
                            }
                            if (e.ctrlKey && !flagEventMousewheel) {
                                flagEventMousewheel = true;
                                this.visTimeline.on('mousewheel', removeActiveRangeEvent);
                            }
                        },
                        'keyup.timeline': (e) => {
                            if ((e.keyCode === 16 || e.keyCode === 71) && this.visTimeline.itemSet.options.multiselectPerGroup) {
                                this.visTimeline.setOptions({ multiselectPerGroup: false });
                            }
                            if (e.keyCode === 17 && flagEventMousewheel) {
                                flagEventMousewheel = false;
                                this.visTimeline.off('mousewheel', removeActiveRangeEvent);
                            }
                        }
                    });
                    if (this.timelineSetting.ShowControls) {
                        $(this).find('#controls > div > button').off('click.timeline').on('click.timeline', (e) => {
                            let element = $(e.currentTarget);
                            let method = element.attr('method');
                            let value = parseFloat(element.attr('value'));
                            let range = this.visTimeline.getWindow();
                            switch (method) {
                                case 'navigation':
                                    let intervalArrows = range.end.getTime() - range.start.getTime();
                                    this.visTimeline.setWindow(range.start.valueOf() - intervalArrows * value, range.end.valueOf() - intervalArrows * value);
                                    break;
                                case 'today':
                                    this.visTimeline.moveTo(moment().format());
                                    break;
                                case 'changeRange':
                                    let interval = moment((range.start.getTime() + range.end.getTime()) / 2).format();
                                    this.visTimeline.setWindow(moment(interval).subtract(value, 'millisecond'), moment(interval).add(value, 'millisecond'));
                                    $(this).find('#controls > div > button.active').removeClass('active');
                                    element.addClass('active');
                                    break;
                            }
                        });
                        $(this).find('#controls > div:nth-child(1)').tooltip({ title: flexygo.localization.translate('flxtimeline.navigation'), placement: 'right', trigger: 'hover' });
                        $(this).find('#controls > div:nth-child(2)').tooltip({ title: flexygo.localization.translate('flxtimeline.range'), placement: 'right', trigger: 'hover' });
                    }
                }
                /**
                * Init Vis Timeline.
                * @method initVisTimeline
                * @param {vis.DataItemCollectionType} visItems Items Data.
                * @param {vis.DataGroupCollectionType} visGroups Groups Data.
                * @param {vis.TimelineOptions} visOptions Options Data.
                */
                initVisTimeline(visItems, visGroups, visOptions = {}) {
                    this.visTimeline = new vis.Timeline($(this).find('#timeline_container > #vis')[0], visItems, visGroups, visOptions);
                }
                /**
                * Init Vis Timeline.
                * @method setItemsWithoutGroups
                * @param {vis.DataItemCollectionType } visItems Items Data.
                * @param {vis.DataGroupCollectionType } visGroups Groups Data.
                * @param {vis.TimelineOptions } visOptions Options Data.
                */
                setItemsWithoutGroups(visItems) {
                    if (visItems.length === 0) {
                        $(this).find('#timeline_container > #items_without_group > #items-container').append(`<span>${flexygo.localization.translate('flxtimeline.withoutRegisters')}</span>`);
                    }
                    else {
                        for (const item of visItems) {
                            let visItemData = this.buildVisItem(item);
                            $((`<div class="item ${!flexygo.utils.isBlank(visItemData.className) ? visItemData.className : ''}" ${!flexygo.utils.isBlank(visItemData.style) ? `style="${visItemData.style}"` : ''} draggable= "true"> 
                                                                                        ${(this.timelineSetting.ItemContentTemplate) ? flexygo.utils.parser.recursiveCompile(item, this.timelineSetting.ItemContentTemplate) : item[(this.timelineSetting.Advanced) ? this.timelineSetting.ItemDescripField : this.timelineSetting.PropertyDescrip]} 
                                                                                     </div>`)).appendTo($(this).find('#timeline_container > #items_without_group > #items-container'))[0].visItemData = visItemData;
                        }
                        $(this).find('#timeline_container > #items_without_group > #items-container > .item').off('dragstart.timeline').on('dragstart.timeline', (event) => {
                            event.originalEvent.dataTransfer.effectAllowed = 'move';
                            event.originalEvent.dataTransfer.setData("text", JSON.stringify(event.currentTarget.visItemData));
                        });
                    }
                }
                /**
                * Get Timeline.
                * @method getTimeline
                */
                getTimeline() {
                    let params = {
                        ModuleName: this.moduleName,
                        searchId: this.activeFilter,
                        filterValues: this.filterValues
                    };
                    flexygo.ajax.post('~/api/Timeline', 'GetTimeline', params, (response) => {
                        if (response) {
                            let visItems = new vis.DataSet(), visGroups = new vis.DataSet(), visOptions;
                            this.timelineSetting = response.TimelineSetting;
                            this.defaults = (response.Defaults) ? response.Defaults : {};
                            this.toolbar = response.Toolbar;
                            this.searchSettings = response.SearchSettings;
                            this.savedSearches = response.SavedSearches;
                            this.render();
                            this.wcParentModule.setButtons(this.toolbar, this.timelineSetting.EntityConfiguration.CollectionName, response.FilterObjectWhere);
                            this.loadFilters();
                            /*TODO: Merge the content of visOptions with this.timelineSetting.CustomOptions*/
                            visOptions = {
                                /*align: 'auto',*/
                                /*autoResize: true,*/
                                /*clickToUse: false,*/
                                /*configure: false,*/
                                /*dataAttributes: false,*/
                                editable: (this.timelineSetting.Editable) ? { add: this.timelineSetting.EntityConfiguration.CanInsert, remove: this.timelineSetting.EntityConfiguration.CanDelete, updateGroup: this.timelineSetting.EntityConfiguration.CanUpdate && this.timelineSetting.CanEditPropertyGroup, updateTime: this.timelineSetting.EntityConfiguration.CanUpdate && (this.timelineSetting.CanEditPropertyStartDate || this.timelineSetting.CanEditPropertyEndDate), overrideItems: false } : this.timelineSetting.Editable,
                                end: moment().add(this.timelineRanges[this.timelineSetting.DefaultRangeName], 'millisecond').format(),
                                /*format: none,*/
                                /*groupEditable: { add: false, remove: false, order: false },*/
                                /*groupOrder: 'order', (Ordered In The SQL Query)*/
                                /*groupOrderSwap: none,*/
                                /*groupTemplate: none,*/
                                height: (this.timelineSetting.ShowControls) ? 'calc(100% - 42px)' : '100%',
                                /*hiddenDates: none,*/
                                /*horizontalScroll: false,*/
                                /*itemsAlwaysDraggable: {item: false, range: false},*/
                                locale: flexygo.context.currentUserLang,
                                /*locales: none*/
                                /*moment: vis.moment,*/
                                /*margin: {axis: 20, item: { horizontal: 10, vertical: 10}},*/
                                max: moment().add('years', 25).format(),
                                /*maxHeight: none*/
                                /*maxMinorChars: 7,*/
                                min: moment().add('years', -25).format(),
                                /*minHeight: none,*/
                                /*moveable: true,*/
                                multiselect: true,
                                /*multiselectPerGroup: false, (Modified On The Fly)*/
                                onAdd: (item, callback) => {
                                    this.objectActions(item, (item.withOutGroup) ? 'update' : 'insert').then((data) => { if (data) {
                                        $(this).find(`#timeline_container > #items_without_group > #items-container > .item`).filter((index, element) => element.visItemData.id === data.id).remove();
                                    } callback(data); }, function (error) { callback(null); console.error('FlexyGo Timeline', error); });
                                },
                                /*onAddGroup: none,*/
                                /*onDropObjectOnItem: none, (Used Bellow)*/
                                /*onInitialDrawComplete: none,*/
                                onMove: (item, callback) => {
                                    this.objectActions(item, 'update').then(function (data) { callback(data); }, function (error) { callback(null); console.error('FlexyGo Timeline', error); });
                                },
                                /*onMoveGroup: none,*/
                                /*onMoving: none, (Used Bellow)*/
                                onRemove: (item, callback) => {
                                    this.objectActions(item, 'delete').then(function (data) { callback(data); }, function (error) { callback(null); console.error('FlexyGo Timeline', error); });
                                },
                                /*onRemoveGroup: 'none',*/
                                onUpdate: (item, callback) => {
                                    if (item.editable === undefined || (item.editable && typeof (item.editable) === 'boolean') || (item.editable && typeof (item.editable) === 'object' && (item.editable.updateGroup || item.editable.updateTime || item.editable.remove))) {
                                        this.objectActions(item, 'edit').then(function (data) { callback(data); }, function (error) { callback(null); console.error('FlexyGo Timeline', error); });
                                    }
                                },
                                /*order: none*/
                                orientation: { axis: 'top', item: 'top' },
                                /*rollingMode: { follow: false, offset: 0.5 },*/
                                /*rtl: false,*/
                                /*selectable: true,*/
                                /*showCurrentTime: true,*/
                                /*showMajorLabels: true,*/
                                /*showMinorLabels: true,*/
                                /*showTooltips: true,*/
                                /*stack: true,*/
                                /*stackSubgroups: true,*/
                                /*snap: function,*/
                                start: moment().subtract(this.timelineRanges[this.timelineSetting.DefaultRangeName], 'millisecond').format(),
                                /*template: none,*/
                                /*visibleFrameTemplate: none, (Used Bellow)*/
                                /*timeAxis: { scale: none, step: 1 },*/
                                /*type: none,*/
                                /*tooltip: { followMouse: false, overflowMethod: 'flip' },*/
                                tooltipOnItemUpdateTime: {
                                    template: (item) => {
                                        return `<span class="vis-onUpdateTime-tooltip-left"><i class="fa fa-hourglass-1"> ${moment(item.start).format('MM/DD/YYYY hh:mm')}</i></span>${(item.end) ? `<span class="vis-onUpdateTime-tooltip-right"><i class="fa fa-hourglass-end"> ${moment(item.end).format('MM/DD/YYYY hh:mm')} </i></span>` : ''}`;
                                    }
                                },
                                verticalScroll: true,
                                /*width: '100%',*/
                                /*zoomable: true,*/
                                zoomKey: 'ctrlKey',
                                zoomMax: 157680000000,
                                zoomMin: 60000,
                            };
                            if (this.timelineSetting.Advanced && !flexygo.utils.isBlank(this.timelineSetting.OnDropObjectOnItemFunction)) {
                                visOptions.onDropObjectOnItem = (objectData, item, callback) => {
                                    new Function('objectData', 'item', `return new Promise((resolve, reject) => { try {${this.timelineSetting.OnDropObjectOnItemFunction}} catch (ex) { reject(ex); } });`).call(this, objectData, item).then(function (data) { callback(data); }, function (error) { callback(item); console.error('FlexyGo Timeline', 'OnDropObjectOnItemFunction', error); });
                                };
                            }
                            if (this.timelineSetting.Advanced && !flexygo.utils.isBlank(this.timelineSetting.OnMovingFunction)) {
                                visOptions.onMoving = (item, callback) => {
                                    new Function('item', `return new Promise((resolve, reject) => { try {${this.timelineSetting.OnMovingFunction}} catch (ex) { reject(ex); } });`).call(this, item).then(function (data) { callback(data); }, function (error) { callback(item); console.error('FlexyGo Timeline', 'onMovingFunction', error); });
                                };
                            }
                            if (this.timelineSetting.Advanced && !flexygo.utils.isBlank(this.timelineSetting.ItemVisibleFrameTemplate)) {
                                visOptions.visibleFrameTemplate = (item, element) => {
                                    return flexygo.utils.parser.recursiveCompile(item.data, this.timelineSetting.ItemVisibleFrameTemplate);
                                };
                            }
                            for (const item of response.Items.filter(item => !(this.timelineSetting.WithGroups && flexygo.utils.isBlank(item[(this.timelineSetting.Advanced) ? this.timelineSetting.ItemGroupField : this.timelineSetting.PropertyGroup])))) {
                                visItems.add(this.buildVisItem(item));
                            }
                            if (this.timelineSetting.WithGroups) {
                                for (const group of response.Groups) {
                                    visGroups.add(this.buildVisGroup(group));
                                }
                            }
                            else {
                                visGroups = null;
                            }
                            if (this.timelineSetting.WithGroups && this.timelineSetting.Editable && this.timelineSetting.ShowItemsWithoutGroup) {
                                this.setItemsWithoutGroups(response.Items.filter(item => flexygo.utils.isBlank(item[(this.timelineSetting.Advanced) ? this.timelineSetting.ItemGroupField : this.timelineSetting.PropertyGroup])));
                            }
                            this.initVisTimeline(visItems, visGroups, visOptions);
                        }
                    });
                }
                /**
                * Build Vis Item.
                * @method buildVisItem
                * @param {object} data Data item.
                */
                buildVisItem(data) {
                    if (data) {
                        let id = new Array;
                        this.timelineSetting.EntityConfiguration.ObjectKeys.forEach((key) => id.push({ [key]: data[key] }));
                        return {
                            id: JSON.stringify(id),
                            group: data[(this.timelineSetting.Advanced) ? this.timelineSetting.ItemGroupField : this.timelineSetting.PropertyGroup],
                            content: (this.timelineSetting.ItemContentTemplate) ? flexygo.utils.parser.recursiveCompile(data, this.timelineSetting.ItemContentTemplate) : (data[(this.timelineSetting.Advanced) ? this.timelineSetting.ItemDescripField : this.timelineSetting.PropertyDescrip]) ? data[(this.timelineSetting.Advanced) ? this.timelineSetting.ItemDescripField : this.timelineSetting.PropertyDescrip] : flexygo.localization.translate('flxtimeline.withoutDescription'),
                            start: moment(data[(this.timelineSetting.Advanced) ? this.timelineSetting.ItemStartDateField : this.timelineSetting.PropertyStartDate]).toDate(),
                            end: (data[(this.timelineSetting.Advanced) ? this.timelineSetting.ItemEndDateField : this.timelineSetting.PropertyEndDate]) ? moment(data[(this.timelineSetting.Advanced) ? this.timelineSetting.ItemEndDateField : this.timelineSetting.PropertyEndDate]).toDate() : null,
                            title: data[(this.timelineSetting.Advanced) ? this.timelineSetting.ItemDescripField : this.timelineSetting.PropertyDescrip],
                            withOutGroup: (data[(this.timelineSetting.Advanced) ? this.timelineSetting.ItemGroupField : this.timelineSetting.PropertyGroup]) ? false : true,
                            editable: (this.timelineSetting.Advanced && this.timelineSetting.Editable && this.checkEditableProperty(data[this.timelineSetting.ItemEditableField])) ? JSON.parse(data[this.timelineSetting.ItemEditableField]) : undefined,
                            className: (this.timelineSetting.Advanced) ? data[this.timelineSetting.ItemClassNameField] : null,
                            style: (this.timelineSetting.Advanced) ? data[this.timelineSetting.ItemStyleField] : null,
                            type: (this.timelineSetting.Advanced) ? data[this.timelineSetting.ItemTypeField] : null,
                            data: data,
                        };
                    }
                    else {
                        return null;
                    }
                }
                /**
                * Build Vis Group.
                * @method buildVisGroup
                * @param {object} data Data group.
                */
                buildVisGroup(data) {
                    return (data) ? {
                        id: data[this.timelineSetting.GroupIdField] || data[this.timelineSetting.PropertyGroup],
                        content: (this.timelineSetting.GroupContentTemplate) ? flexygo.utils.parser.recursiveCompile(data, this.timelineSetting.GroupContentTemplate) : data[this.timelineSetting.GroupDescripField] || data[this.timelineSetting.PropertyGroup],
                        //title: data[this.timelineSetting.GroupDescripField] || data[this.timelineSetting.PropertyGroup],
                        className: (this.timelineSetting.Advanced) ? data[this.timelineSetting.GroupClassNameField] : null,
                        style: (this.timelineSetting.Advanced) ? data[this.timelineSetting.GroupStyleField] : null,
                        data: data,
                    } : null;
                }
                /**
                * Object Actions.
                * @method objectActions
                * @param {flexygo.api.timeline.visTimelineItem} object item object.
                * @param {string} action action.
                */
                objectActions(object, action) {
                    return new Promise((resolve, reject) => {
                        try {
                            let objectEntity = new flexygo.obj.Entity(this.timelineSetting.EntityConfiguration.ObjectName, (this.hasIdStructure(object.id.toString())) ? this.getObjectWhere(JSON.parse(object.id.toString())) : null);
                            switch (action) {
                                case 'insert':
                                case 'edit':
                                case 'update':
                                    if ((action === 'insert' && this.timelineSetting.OnInsertOpenNewWithDefaults) || action === 'edit') {
                                        this.openObjectEdit(object, objectEntity).then(function (data) { resolve(data); }, function (error) { throw error; });
                                    }
                                    else {
                                        if (objectEntity.read()) {
                                            $.extend(true, objectEntity.data, { [this.timelineSetting.PropertyGroup]: this.timelineSetting.WithGroups && this.timelineSetting.PropertyGroup ? { Value: object.group } : undefined, [this.timelineSetting.PropertyStartDate]: { Value: object.start }, [this.timelineSetting.PropertyEndDate]: this.timelineSetting.PropertyEndDate ? { Value: object.end } : undefined });
                                            resolve(((action === 'insert') ? objectEntity.insert() : objectEntity.update()) ? this.buildVisItem(objectEntity.getView((this.timelineSetting.Advanced) ? this.timelineSetting.ItemViewName : null)[0]) : null);
                                        }
                                        else {
                                            resolve(null);
                                        }
                                    }
                                    break;
                                case 'delete':
                                    resolve((objectEntity.delete()) ? object : null);
                                    break;
                                default:
                                    resolve(null);
                                    break;
                            }
                        }
                        catch (ex) {
                            reject(ex);
                        }
                    });
                }
                /**
                * Open Object Edit.
                * @method openObjectEdit
                * @param {flexygo.api.timeline.visTimelineItem} object item object.
                * @param {flexygo.obj.Entity} objectEntity object Entity.
                */
                openObjectEdit(object, objectEntity) {
                    return new Promise((resolve, reject) => {
                        try {
                            flexygo.nav.openPage('edit', objectEntity.objectName, objectEntity.objectWhere, JSON.stringify(Object.assign(this.defaults, { [this.timelineSetting.PropertyStartDate]: object.start, [this.timelineSetting.PropertyEndDate]: this.timelineSetting.PropertyEndDate ? object.end : undefined, [this.timelineSetting.PropertyGroup]: this.timelineSetting.WithGroups && this.timelineSetting.PropertyGroup ? object.group : undefined })), 'modal');
                            flexygo.events.on(this, 'entity', 'all', (e) => {
                                if (this === e.context && e.sender.objectName === objectEntity.objectName) {
                                    flexygo.events.off(this, 'entity', 'all');
                                    flexygo.events.off(this, 'dialog', 'closed');
                                    if (e.type === 'deleted') {
                                        resolve(null);
                                        this.visTimeline.itemsData.remove(object.id);
                                    }
                                    else {
                                        resolve(this.buildVisItem(e.sender.getView((this.timelineSetting.Advanced) ? this.timelineSetting.ItemViewName : null)[0]));
                                    }
                                    flexygo.nav.closePage($('flx-edit[objectname="' + objectEntity.objectName + '"]'));
                                }
                            });
                            flexygo.events.on(this, 'dialog', 'closed', (e) => {
                                if (this === e.context && e.sender.objectname === objectEntity.objectName) {
                                    flexygo.events.off(this, 'entity', 'all');
                                    flexygo.events.off(this, 'dialog', 'closed');
                                    resolve(null);
                                }
                            });
                        }
                        catch (ex) {
                            reject(ex);
                        }
                    });
                }
                /**
                * Get Object Where.
                * @method getObjectWhere
                * @param {Array} id id object.
                */
                getObjectWhere(id) {
                    let where = ``;
                    id.forEach((value, index) => {
                        where += `[${this.timelineSetting.EntityConfiguration.TableName}].[${Object.keys(value)[0]}] = '${value[Object.keys(value)[0]]}'${(index < (id.length - 1)) ? ` AND ` : ``}`;
                    });
                    return where;
                }
                /**
                * Has id structure.
                * @method hasIdStructure
                * @param {string} id id object.
                */
                hasIdStructure(id) {
                    try {
                        if (isNaN(JSON.parse(id))) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    catch (e) {
                        return false;
                    }
                }
                /**
                * Has id structure.
                * @method hasIdStructure
                * @param {string} json JSON String
                */
                isJson(json) {
                    try {
                        JSON.parse(json);
                    }
                    catch (e) {
                        return false;
                    }
                    return true;
                }
                /**
                * Check Editable Property.
                * @method checkEditableProperty
                * @param {string} valueJson JSON String
                */
                checkEditableProperty(valueJson) {
                    let value;
                    if (this.isJson(valueJson)) {
                        value = JSON.parse(valueJson);
                        if (typeof (value) === 'boolean') {
                            return true;
                        }
                        else if (typeof (value) === 'object') {
                            for (const key of ['updateGroup', 'updateTime', 'remove']) {
                                if (key in value) {
                                    return true;
                                }
                            }
                            return false;
                        }
                        else {
                            return false;
                        }
                    }
                    return false;
                }
                /**
                * Load filters
                * @method loadFilters
                */
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
                            wcFilter.key = this.timelineSetting.EntityConfiguration.ObjectName + '-' + this.moduleName;
                            wcFilter.grid = this;
                            wcFilter.init();
                        }
                    }
                }
                /**
               * Establish webcomponent settings
               * @method configure
               */
                configure() {
                    flexygo.nav.openPage('edit', 'sysTimeline_Setting', `[Timelines_Settings].[TimelineSettingName]='${this.timelineSetting.TimelineSettingName}'`, null, 'popup', true);
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = $(this);
                    this.connected = true;
                    this.moduleName = element.attr('ModuleName');
                    if (element.attr('manualInit') != 'true') {
                        this.init();
                    }
                }
                /**
                * Fires when element is detached to DOM
                * @method disconnectedCallback
                */
                disconnectedCallback() {
                    flexygo.events.off(this, 'entity', 'all');
                    flexygo.events.off(this, 'dialog', 'closed');
                    $(document).off('keydown.timeline keyup.timeline');
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
                    if (this.connected && needInit) {
                        this.init();
                    }
                }
            }
            wc.FlxTimelineElement = FlxTimelineElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-timeline', flexygo.ui.wc.FlxTimelineElement);
//# sourceMappingURL=flx-timeline.js.map