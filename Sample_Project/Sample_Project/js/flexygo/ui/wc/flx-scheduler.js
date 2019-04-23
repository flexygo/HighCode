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
            * Library for the FlxScheduler web component.
            *
            * @class FlxScheduler
            * @constructor
            * @return {FlxScheduler}
            */
            class FlxScheduler extends HTMLElement {
                constructor() {
                    //If a constructor is defined, is REQUIRED call the super constructor
                    super();
                    this.objects = new Array();
                    this.checkObjects = new Array();
                    /**
                   * Set when component is attached to DOM
                   * @property connected {boolean}
                   */
                    this.connected = false;
                    this.moduleName = null;
                    this.n = 0;
                    this.additionalWhere = null;
                    this.dayClick = false;
                    this.events = new Array();
                    this.allDay = false;
                }
                /**
               * Array of observed attributes.
               * @property observedAttributes {Array}
               */
                static get observedAttributes() {
                    return ['ObjectName', 'ObjectWhere', 'ModuleName'];
                }
                /**
                * Refresh de webcomponent.
                * @method refresh
                */
                connectedCallback() {
                    let element = $(this);
                    this.connected = true;
                    this.objectName = element.attr("ObjectName");
                    this.objectWhere = element.attr("ObjectWhere");
                    this.moduleName = element.attr("ModuleName");
                    if (element.attr('manualInit') != 'true') {
                        this.init();
                    }
                }
                /**
                * Init the webcomponent.
                * @method init
                */
                init() {
                    let ctx = this;
                    let me = $(this);
                    let activeMode;
                    let SQLValueField;
                    let SQLDisplayField;
                    let SQLFilterField;
                    let directTemplate;
                    let objectName;
                    let viewName;
                    let maxTime;
                    let minTime;
                    let onClickEvent;
                    let tokenDefault;
                    let allDaySlot;
                    let slotDuration;
                    let pageType;
                    let target;
                    me.removeAttr('manualInit');
                    let parentModule = me.closest('flx-module');
                    let wcModule = parentModule[0];
                    if (parentModule && wcModule) {
                        wcModule.moduleLoaded(this);
                    }
                    let options = new Array();
                    let schedulerParams = {
                        ModuleName: ctx.moduleName
                    };
                    flexygo.ajax.post('~/api/Scheduler', 'getSchedulerTemplate', schedulerParams, (response) => {
                        if (response) {
                            activeMode = response.ActiveMode;
                            SQLValueField = response.SQLValueField;
                            SQLDisplayField = response.SQLDisplayField;
                            SQLFilterField = response.SQLFilterField;
                            directTemplate = response.DirectTemplate;
                            objectName = response.ObjectName;
                            viewName = response.ViewName;
                            maxTime = response.MaxTime;
                            minTime = response.MinTime;
                            onClickEvent = response.OnClickEvent;
                            tokenDefault = response.TokenDefault;
                            allDaySlot = response.AllDaySlot;
                            slotDuration = response.SlotDuration;
                            pageType = response.PageType;
                            target = response.Target;
                            if (response.MonthView == "True") {
                                options.push("month");
                            }
                            if (response.AgendaWeekView == "True") {
                                options.push("agendaWeek");
                            }
                            if (response.AgendaDayView == "True") {
                                options.push("agendaDay");
                            }
                            if (response.ListWeekView == "True") {
                                options.push("listWeek");
                            }
                            var objectParams = {
                                Scheduler: response.SchedulerName
                            };
                            //Distintos objetos
                            flexygo.ajax.post('~/api/Scheduler', 'GetSchedulerConfig', objectParams, (response) => {
                                if (response) {
                                    me.append('<div id="loading"></div><div id="calendar" style="margin:1%;"></div>');
                                    for (var i in response) {
                                        ctx.objects.push({
                                            SchedulerName: response[i].SchedulerName,
                                            ObjectName: response[i].ObjectName,
                                            StartDateField: response[i].StartDateField,
                                            EndDateField: response[i].EndDateField,
                                            EndTimeField: response[i].EndTimeField,
                                            StartTimeField: response[i].StartTimeField,
                                            DurationField: response[i].DurationField,
                                            ViewName: response[i].ViewName,
                                            ColorField: response[i].ColorField,
                                            DescripTemplate: response[i].DescripTemplate,
                                            key: response[i].key,
                                            table: response[i].table,
                                            Icon: response[i].Icon,
                                            UserIdField: response[i].UserIdField,
                                            Filter: "",
                                            TextColorField: response[i].TextColorField,
                                            TokenDefault: tokenDefault,
                                            CanInsert: response[i].CanInsert,
                                            CanView: response[i].CanView,
                                            CanEdit: response[i].CanEdit,
                                            AllDayField: response[i].AllDayField
                                        });
                                        ctx.checkObjects.push(response[i].ObjectName);
                                    }
                                    if (ctx.objects.length > 0) {
                                        ctx.render(options, activeMode, maxTime, minTime, onClickEvent, allDaySlot, slotDuration, pageType, target);
                                        //$('.fc-left').addClass('col-lg-5');
                                        //$('.fc-left').addClass('col-md-6');
                                        if (objectName != '') {
                                            $('#calendar').prepend('<div class="fc-toolbar fc-header-toolbar filter"><div class="a" style="text-align:left;" id="filters"><flx-multicombo class="combo" ObjectName="' + objectName + '" ViewName="' + viewName + '" IconClass="flx-icon icon-role" SQLValueField="' + SQLValueField + '" SQLDisplayField="' + SQLDisplayField + '" SQLFilter="' + SQLFilterField + '" filtertype="dbcombo"><template>' + directTemplate + '</template></flx-multicombo></div></div>');
                                            //$('.fc-left').append('<div id="filters"><flx-multicombo style="width:250px" ObjectName="' + objectName + '" ViewName="' + viewName + '" IconClass="flx-icon icon-role" SQLValueField="' + SQLValueField + '" SQLDisplayField="' + SQLDisplayField + '" filtertype="dbcombo"><template>' + directTemplate + '</template></flx-multicombo></div>');                    
                                            $('.fc-left').css("margin-left", "10px");
                                        }
                                        if (ctx.objects.length > 1) {
                                            $('.fc-left').append("<div style='margin-right: .75em;' class='fc-button'><div style='width: 140px;'><div class='panel panel-default objects' style='margin-bottom: 0px;background-color: #f5f5f5;'><div style='padding: 3.5px 10px;'><div><div class='fa fa-filter'></div><a data-toggle='collapse' href='#collapse1' style='color: #777;'>  " + flexygo.localization.translate('flxscheduler.objects') + "</a></div></div><div id='collapse1' class='panel-collapse collapse'></div></div></div></div>");
                                            for (var x = 0; x < ctx.objects.length; x++) {
                                                $('#collapse1').append("<div class='panel-footer'><i style='float:left;margin-top: 2px;margin-right: 5px;' class='" + ctx.objects[x].Icon + "'></i>" + ctx.objects[x].ObjectName + "<flx-check style='float:right;' id='" + ctx.objects[x].ObjectName + "' property='" + ctx.objects[x].ObjectName + "' checked></flx-check>");
                                            }
                                            $('#collapse1').on('show.bs.collapse', function () {
                                                $(".objects").css("position", "absolute");
                                                //$(".fc-left").addClass("margin-filter");
                                            });
                                            $('#collapse1').on('hide.bs.collapse', function () {
                                                $(".objects").css("position", "static");
                                                //$(".fc-left").removeClass("margin-filter");
                                            });
                                            $('#mainContent').on('scroll', function () {
                                                $("#collapse1").removeClass("in");
                                                $(".objects").css("position", "static");
                                            });
                                            //Cambiar por me.find
                                            $("flx-check input[type=checkbox]").click(function () {
                                                if (this.checked) {
                                                    ctx.checkObjects.push(this.parentElement.parentElement.id);
                                                }
                                                else {
                                                    for (var i in ctx.checkObjects) {
                                                        if (ctx.checkObjects[i] == this.parentElement.parentElement.id) {
                                                            ctx.checkObjects.splice(ctx.checkObjects.indexOf(ctx.checkObjects[i]), 1);
                                                        }
                                                    }
                                                }
                                                if (ctx.checkObjects.length != 0) {
                                                    ctx.checkPanelObjects(ctx.additionalWhere);
                                                }
                                                else {
                                                    var myCalendar = me.find('#calendar');
                                                    myCalendar.fullCalendar('removeEvents');
                                                }
                                            });
                                        }
                                    }
                                    else {
                                        me.append('<div class="box-danger"><i class="flx-icon icon-close icon-lg icon-margin-right"></i><span><strong>Error</strong> No scheduler objects configurations are found</span></div>');
                                    }
                                    $('flx-multicombo[viewname="' + viewName + '"]').find('div').on('change', function () {
                                        let filtros = this.closest('flx-multicombo').getValue();
                                        let where = '';
                                        for (var i in ctx.checkObjects) {
                                            ctx.objects[i].Filter = filtros.split('|').join('\',\'');
                                        }
                                        ctx.checkPanelObjects(ctx.additionalWhere);
                                    });
                                }
                            });
                        }
                    });
                }
                /**
                * Refresh de webcomponent.
                * @method refresh
                */
                refresh() {
                    if ($(this).attr('manualInit') != 'true') {
                        let ctx = this;
                        let me = $(this);
                        var myCalendar = me.find('#calendar');
                        myCalendar.fullCalendar('removeEvents');
                        ctx.checkPanelObjects(this.additionalWhere);
                    }
                }
                /**
                * Initialize Scheduler.
                * @method render
                */
                render(options, activeMode, maxTime, minTime, onClickEvent, allDaySlot, slotDuration, pageType, target) {
                    let ctx = this;
                    let me = $(this);
                    let right = '';
                    let navLinks = false;
                    flexygo.events.on(this, "dialog", "closed", (e) => {
                        for (var i = 0; i < ctx.objects.length; i++) {
                            if (e.sender.objectname.toLowerCase() === ctx.objects[i].ObjectName.toLowerCase()) {
                                ctx.checkPanelObjects(ctx.additionalWhere);
                            }
                        }
                    });
                    if (options.indexOf("agendaDay") > -1) {
                        navLinks = true;
                    }
                    for (var i in options) {
                        right += options[i] + ',';
                    }
                    right = right.substring(0, right.length - 1);
                    let myCalendar = me.find('#calendar');
                    if (minTime == '') {
                        minTime = '00:00:00';
                    }
                    else {
                        minTime += ':00';
                    }
                    if (maxTime == '') {
                        maxTime = '24:00:00';
                    }
                    else {
                        maxTime += ':00';
                    }
                    if (slotDuration == '') {
                        slotDuration = '00:30:00';
                    }
                    else {
                        slotDuration += ':00';
                    }
                    if (allDaySlot == "True") {
                        ctx.allDay = true;
                    }
                    //Calendario//
                    myCalendar.fullCalendar({
                        header: {
                            left: 'prev,next today',
                            center: 'title',
                            right: right
                        },
                        firstDay: 1,
                        locale: flexygo.profiles.langKey.toLowerCase().slice(0, 2),
                        allDaySlot: ctx.allDay,
                        defaultView: activeMode,
                        timeFormat: 'HH:mm',
                        minTime: minTime,
                        maxTime: maxTime,
                        navLinks: navLinks,
                        height: 'auto',
                        slotEventOverlap: false,
                        editable: true,
                        eventLimit: true,
                        slotDuration: slotDuration,
                        eventDrop: function (event, delta, revertFunc) {
                            let obj = new flexygo.obj.Entity(event.objectName, ctx.getObjectWhere(event.table, event.key, event.id));
                            obj.read();
                            if (event.startDate != '' && event.start != null) {
                                obj.data[event.startDate].Value = event.start.format();
                            }
                            if (event.endDate != '' && event.end != null) {
                                if (event.allDay && ctx.allDay) {
                                    var date = moment(event.end.format()).add('days', -1).format("YYYY-MM-DD");
                                    obj.data[event.endDate].Value = date + " 23:59:00";
                                }
                                else {
                                    obj.data[event.endDate].Value = event.end.format();
                                }
                            }
                            if (event.startTime != '' && event.start != null) {
                                if (event.allDay && ctx.allDay) {
                                    obj.data[event.startTime].Value = "00:00";
                                }
                                else {
                                    obj.data[event.startTime].Value = event.start.format().slice(11, 16);
                                }
                            }
                            if (event.endTime != '' && event.end != null) {
                                if (event.allDay && ctx.allDay) {
                                    obj.data[event.endTime].Value = "23:59";
                                }
                                else {
                                    obj.data[event.endTime].Value = event.end.format().slice(11, 16);
                                }
                            }
                            if (obj.update()) {
                                flexygo.msg.success('Saved');
                            }
                        },
                        eventResize: function (event, delta, revertFunc) {
                            let obj = new flexygo.obj.Entity(event.objectName, ctx.getObjectWhere(event.table, event.key, event.id));
                            obj.read();
                            if (event.endDate != '' && event.end != null) {
                                if (event.allDay && ctx.allDay) {
                                    var date = moment(event.end.format()).add('days', -1).format("YYYY-MM-DD");
                                    obj.data[event.endDate].Value = date + " 23:59:00";
                                }
                                else {
                                    obj.data[event.endDate].Value = event.end.format();
                                }
                            }
                            if (event.endTime != '' && event.end != null) {
                                if (event.allDay && ctx.allDay) {
                                    obj.data[event.endTime].Value = "23:59";
                                }
                                else {
                                    obj.data[event.endTime].Value = event.end.format().slice(11, 16);
                                }
                            }
                            if (event.duration != '') {
                                let start = new Date(event.start.format()).getTime();
                                let end = new Date(event.end.format()).getTime();
                                let diffMs = (end - start);
                                let diffMins = Math.round(diffMs / 60000);
                                obj.data[event.duration].Value = diffMins;
                            }
                            if (obj.update()) {
                                flexygo.msg.success('Saved');
                            }
                        },
                        eventClick: function (calEvent, jsEvent, view) {
                            if (onClickEvent == "True") {
                                if (pageType == "view" && calEvent.canView) {
                                    flexygo.nav.openPage(pageType, calEvent.objectName, ctx.getObjectWhere(calEvent.table, calEvent.key, calEvent.id), null, target, false, $(this));
                                }
                                if (pageType == "edit" && calEvent.canEdit) {
                                    flexygo.nav.openPage(pageType, calEvent.objectName, ctx.getObjectWhere(calEvent.table, calEvent.key, calEvent.id), null, target, false, $(this));
                                }
                            }
                        },
                        eventRender: function (event, element, view) {
                            let el = $(element);
                            switch (view.name) {
                                case 'month':
                                    element.find('span.fc-title').html(element.find('span.fc-title').text());
                                    el.addClass("test");
                                    el.tooltip({
                                        title: element.find('span.fc-title').text(),
                                        delay: { show: 1000 },
                                        placement: "top",
                                        trigger: 'hover'
                                    });
                                    break;
                                case 'agendaWeek':
                                    element.find('div.fc-content').find('.fc-title').html(element.find('div.fc-content').find('.fc-title').text());
                                    el.addClass("test");
                                    el.tooltip({
                                        title: element.find('div.fc-title').text(),
                                        delay: { show: 1000 },
                                        placement: "top",
                                        trigger: 'hover'
                                    });
                                    break;
                                case 'agendaDay':
                                    element.find('div.fc-content').find('.fc-title').html(element.find('div.fc-content').find('.fc-title').text());
                                    el.addClass("test");
                                    el.addClass("fc-day-size");
                                    el.tooltip({
                                        title: element.find('div.fc-title').text(),
                                        delay: { show: 1000 },
                                        placement: "top",
                                        trigger: 'hover'
                                    });
                                    break;
                                case 'listWeek':
                                    element.find('td.fc-list-item-title').html(element.find('td.fc-list-item-title').text());
                                    el.addClass("test");
                                    el.tooltip({
                                        title: element.find('td.fc-list-item-title').text(),
                                        delay: { show: 1000 },
                                        placement: "top",
                                        trigger: 'hover'
                                    });
                                    break;
                            }
                        },
                        dayClick: function (date, jsEvent, view) {
                            if (!ctx.dayClick) {
                                ctx.dayClick = true;
                                if (ctx.objects.length > 1) {
                                    let myButtons = new Object();
                                    let buttons = '';
                                    for (var i = 0; i < ctx.objects.length; i++) {
                                        myButtons[ctx.objects[i].ObjectName] = {
                                            'class': 'btn btn-default',
                                            text: ctx.objects[i].ObjectName,
                                            SchedulerName: ctx.objects[i].SchedulerName,
                                            ObjectName: ctx.objects[i].ObjectName,
                                            StartDateField: ctx.objects[i].StartDateField,
                                            EndDateField: ctx.objects[i].EndDateField,
                                            StartTimeField: ctx.objects[i].StartTimeField,
                                            EndTimeField: ctx.objects[i].EndTimeField,
                                            DurationField: ctx.objects[i].DurationField,
                                            closeOnClick: true,
                                            Icon: ctx.objects[i].Icon
                                        };
                                        if (ctx.objects[i].CanInsert) {
                                            buttons += '<a style="padding: 0.7em;margin-right: 3%;margin-bottom: 3%;" class="btn btn-default bg-outstanding modalButton"><i style="margin-right:4px;" class="' + ctx.objects[i].Icon + '"></i>' + ctx.objects[i].ObjectName + '</a>';
                                        }
                                    }
                                    if (buttons != '') {
                                        $.sweetModal({
                                            title: flexygo.localization.translate('flxscheduler.chooseobjects'),
                                            content: '<div>' + buttons + '</div>',
                                            theme: $.sweetModal.THEME_MIXED,
                                            width: '31%'
                                        });
                                        $(".modalButton").click(function () {
                                            let object = myButtons[this.text];
                                            ctx.openEvent(object.ObjectName, object.StartDateField, object.EndDateField, object.StartTimeField, object.EndTimeField, object.DurationField, date.utc(), date.format("HH:mm"));
                                            $('.sweet-modal-overlay').remove();
                                        });
                                    }
                                }
                                else {
                                    if (ctx.objects[0].CanInsert) {
                                        ctx.openEvent(ctx.objects[0].ObjectName, ctx.objects[0].StartDateField, ctx.objects[0].EndDateField, ctx.objects[0].StartTimeField, ctx.objects[0].EndTimeField, ctx.objects[0].DurationField, date.utc(), date.format("HH:mm"));
                                    }
                                }
                            }
                        }
                    });
                    ctx.checkPanelObjects(ctx.additionalWhere);
                    //Datepicker
                    $('.fc-center').append('<div class="col-6 col-m-12"><div id="datepicker" style="display:none;position:absolute;z-index: 4;" class="cute-calendar"></div></div>');
                    let dp1 = $('#datepicker');
                    $('.fc-center').click(function () {
                        dp1.show();
                    });
                    dp1.datepicker({
                        onSelect: function (dateText, inst) {
                            dp1.hide();
                            myCalendar.fullCalendar('gotoDate', dateText);
                            ctx.checkPanelObjects(ctx.additionalWhere);
                        }, firstDay: 1
                    });
                    //Events
                    $('.fc-prev-button').click(function () {
                        ctx.checkPanelObjects(ctx.additionalWhere);
                    });
                    $('.fc-next-button').click(function () {
                        ctx.checkPanelObjects(ctx.additionalWhere);
                    });
                    $('.fc-agendaWeek-button').click(function () {
                        ctx.checkPanelObjects(ctx.additionalWhere);
                    });
                    $('.fc-month-button').click(function () {
                        ctx.checkPanelObjects(ctx.additionalWhere);
                    });
                    $('.fc-listWeek-button').click(function () {
                        ctx.checkPanelObjects(ctx.additionalWhere);
                    });
                    $('.fc-agendaDay-button').click(function () {
                        ctx.checkPanelObjects(ctx.additionalWhere);
                    });
                    $('.fc-today-button').click(function () {
                        ctx.checkPanelObjects(ctx.additionalWhere);
                    });
                    $('#mainContent').on('scroll', function () {
                        dp1.hide();
                    });
                    $(document).mouseup(function (e) {
                        if (!dp1.is(e.target) && dp1.has(e.target).length === 0) {
                            dp1.hide();
                        }
                    });
                }
                /**
               * Check Objects.
               * @method checkPanelObjects
               */
                checkPanelObjects(additionalWhere) {
                    let ctx = this;
                    let me = $(this);
                    //Panel de objetos
                    /*Empieza a cargar*/
                    me.find('#loading').html(flexygo.utils.loadingMsg());
                    //me.find('.fc-view-container').css('display','none');
                    for (var x in ctx.checkObjects) {
                        for (var i = 0; i < ctx.objects.length; i++) {
                            if (ctx.checkObjects[x] == ctx.objects[i].ObjectName) {
                                ctx.changeEvents(ctx.objects[i].ObjectName, ctx.objects[i].ViewName, ctx.objects[i].ColorField, ctx.objects[i].StartDateField, ctx.objects[i].EndDateField, ctx.objects[i].StartTimeField, ctx.objects[i].EndTimeField, ctx.objects[i].DurationField, ctx.objects[i].DescripTemplate, ctx.objects[i].key, ctx.objects[i].table, ctx.objects[i].UserIdField, ctx.objects[i].Filter, ctx.objects[i].TextColorField, additionalWhere, ctx.objects[i].TokenDefault, ctx.objects[i].CanEdit, ctx.objects[i].CanView, ctx.objects[i].AllDayField);
                            }
                        }
                    }
                }
                /**
               * Open Event.
               * @method openEvent
               */
                openEvent(objectName, startDate, endDate, startTime, endTime, duration, date, time) {
                    let ctx = this;
                    let displayTimeEnd = new Date();
                    let hour = time.slice(0, 2);
                    let minutes = time.slice(3, 5);
                    displayTimeEnd.setHours(parseInt(hour));
                    displayTimeEnd.setMinutes(parseInt(minutes));
                    displayTimeEnd.setMinutes(displayTimeEnd.getMinutes() + 15);
                    let timeEnd = displayTimeEnd.toTimeString();
                    let defaults = {};
                    defaults[startDate] = date;
                    if (startTime) {
                        defaults[startTime] = time;
                    }
                    if (endDate) {
                        defaults[endDate] = date;
                    }
                    if (endTime) {
                        defaults[endTime] = timeEnd.slice(0, 5);
                    }
                    if (duration) {
                        defaults[duration] = '15';
                    }
                    flexygo.nav.openPage('edit', objectName, null, JSON.stringify(defaults), 'modal1024x768', false, $(this));
                    ctx.dayClick = false;
                }
                /**
               * Change Events.
               * @method changeEvents
               */
                changeEvents(objectName, viewName, color, startDate, endDate, startTime, endTime, duration, descripTemplate, key, table, userIdField, filter, textColor, additionalWhere, tokenDefault, canEdit, canView, allDayField) {
                    let ctx = this;
                    let me = $(this);
                    let myCalendar = me.find('#calendar');
                    myCalendar.fullCalendar('removeEvents');
                    let moment = myCalendar.fullCalendar('getDate');
                    let date = new Date(moment.format());
                    let dateStartWeek = ctx.getStartWeek(new Date(moment.format()));
                    let dateWeek = new Date(dateStartWeek.getTime() + (7 * 24 * 60 * 60 * 1000));
                    let dateDay = new Date(date.getTime() + (1 * 24 * 60 * 60 * 1000));
                    let view = myCalendar.fullCalendar('getView');
                    let inicio = '';
                    let fin = '';
                    let dp1 = $('#datepicker');
                    dp1.datepicker("setDate", (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
                    switch (view.name) {
                        case 'month':
                            inicio = ctx.formatDate(date, '' + (date.getMonth() + 1), '01', date.getFullYear());
                            if (date.getMonth() + 1 == 12) {
                                fin = ctx.formatDate(date, '01', '01', date.getFullYear() + 1);
                            }
                            else {
                                fin = ctx.formatDate(date, '' + (date.getMonth() + 2), '01', date.getFullYear());
                            }
                            break;
                        case 'agendaWeek':
                        case 'listWeek':
                            inicio = ctx.formatDate(dateStartWeek, '' + (dateStartWeek.getMonth() + 1), '' + (dateStartWeek.getDate()), dateStartWeek.getFullYear());
                            fin = ctx.formatDate(dateWeek, '' + (dateWeek.getMonth() + 1), '' + (dateWeek.getDate()), dateWeek.getFullYear());
                            break;
                        case 'agendaDay':
                            inicio = ctx.formatDate(date, '' + (date.getMonth() + 1), '' + (date.getDate()), date.getFullYear());
                            fin = ctx.formatDate(dateDay, '' + (dateDay.getMonth() + 1), '' + (dateDay.getDate()), dateDay.getFullYear());
                            break;
                    }
                    ctx.schedulerResult(objectName, viewName, inicio, fin, color, startDate, endDate, startTime, endTime, duration, descripTemplate, key, table, userIdField, filter, textColor, additionalWhere, tokenDefault, canEdit, canView, allDayField);
                }
                /**
               * Results.
               * @method schedulerResult
               */
                schedulerResult(objectName, viewName, inicio, fin, color, startDate, endDate, startTime, endTime, duration, descripTemplate, key, table, userIdField, filter, textColor, additionalWhere, tokenDefault, canEdit, canView, allDayField) {
                    let ctx = this;
                    let me = $(this);
                    let myCalendar = me.find('#calendar');
                    me.find('#loading').css('display', '');
                    let params = {
                        "ObjectName": objectName,
                        "ViewName": viewName,
                        "Inicio": inicio,
                        "Fin": fin,
                        "StartDate": startDate,
                        "EndDate": endDate,
                        "StartTime": startTime,
                        "EndTime": endTime,
                        "Duration": duration,
                        "DescripTemplate": descripTemplate,
                        "Keys": key,
                        "Color": color,
                        "UserIdField": userIdField,
                        "Filter": filter,
                        "TextColor": textColor,
                        "AdditionalWhere": additionalWhere,
                        "TokenDefault": tokenDefault,
                        "AllDayField": allDayField
                    };
                    flexygo.ajax.post('~/api/Scheduler', 'GetSchedulerResult', params, (response) => {
                        ctx.n = ctx.n + 1;
                        if (response) {
                            for (var i in response) {
                                let st = response[i].StartTime;
                                let et = response[i].EndTime;
                                if (st.length == 5) {
                                    st = st + ':00';
                                }
                                if (et.length == 5) {
                                    et = et + ':00';
                                }
                                let descrip = flexygo.utils.parser.recursiveCompile(response[i].Row, response[i].Descrip);
                                let newEvent = {
                                    id: response[i].Id,
                                    color: response[i].Color,
                                    textColor: response[i].TextColor,
                                    title: descrip,
                                    start: response[i].StartDate.slice(0, 10) + ' ' + st,
                                    end: response[i].EndDate.slice(0, 10) + ' ' + et,
                                    objectName: objectName,
                                    startDate: startDate,
                                    endDate: endDate,
                                    startTime: startTime,
                                    endTime: endTime,
                                    duration: duration,
                                    key: key,
                                    table: table,
                                    canEdit: canEdit,
                                    canView: canView,
                                    allDay: false
                                };
                                if (response[i].AllDayField && ctx.allDay) {
                                    newEvent.allDay = response[i].AllDayField;
                                    var date = moment(response[i].EndDate.slice(0, 10) + ' ' + et).add('days', 1).format("YYYY-MM-DD HH:MM:SS");
                                    newEvent.end = date;
                                }
                                ctx.events.push(newEvent);
                            }
                        }
                        if (ctx.n == ctx.checkObjects.length) {
                            for (var event in ctx.events) {
                                myCalendar.fullCalendar('renderEvent', ctx.events[event], 'stick');
                            }
                            me.find('.fc-view-container').css('display', '');
                            me.find('#loading').css('display', 'none');
                            ctx.n = 0;
                            ctx.events = [];
                        }
                    });
                }
                formatDate(date, month, day, year) {
                    if (month.length < 2)
                        month = '0' + month;
                    if (day.length < 2)
                        day = '0' + day;
                    return [year, month, day].join('');
                }
                getStartWeek(d) {
                    let day = d.getDay(), diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
                    return new Date(d.setDate(diff));
                }
                getObjectWhere(table, key, id) {
                    let where = "";
                    let last = 0;
                    for (var i = 0; i < key.length; i++) {
                        where += table + "." + key[i] + " = \'" + id[i] + "\'";
                        if (++last < key.length) {
                            where += " and ";
                        }
                    }
                    return where;
                }
                /**
            * Fires when element is detached to DOM
            * @method disconnectedCallback
            */
                disconnectedCallback() {
                    //Remove event handler
                    flexygo.events.off(this, "dialog", "closed");
                }
            }
            wc.FlxScheduler = FlxScheduler;
            class FlxSchedulerElement extends HTMLElement {
                /**
                * Fires when element is attached to DOM
                * @method attachedCallback
                */
                attachedCallback() {
                    let element = $(this);
                    let ctl = new FlxScheduler();
                    ctl.webControl = element;
                    ctl.objectName = element.attr("ObjectName");
                    ctl.objectWhere = element.attr("ObjectWhere");
                    ctl.moduleName = element.attr("ModuleName");
                    ctl.pageName = element.attr("PageName");
                    element.data("controller", ctl);
                    ctl.init();
                }
                /**
                * Fires when the attribute value of the element is changed.
                * @method attributeChangedCallback
                */
                attributeChangedCallback(attrName, oldVal, newVal) {
                    let element = $(this);
                    let ctl = element.data('controller');
                    let needInit = false;
                    if (ctl && attrName.toLowerCase() == 'modulename' && newVal && newVal != '') {
                        ctl.moduleName = newVal;
                        needInit = true;
                    }
                    else if (ctl && attrName.toLowerCase() == 'objectname' && newVal && newVal != '') {
                        ctl.objectName = newVal;
                        needInit = true;
                    }
                    else if (ctl && attrName.toLowerCase() == 'objectwhere' && newVal && newVal != '') {
                        ctl.objectWhere = newVal;
                        needInit = true;
                    }
                    else if (ctl && attrName.toLowerCase() == 'pagename' && newVal && newVal != '') {
                        ctl.pageName = newVal;
                        needInit = true;
                    }
                    if (needInit) {
                        ctl.init();
                    }
                }
            }
            wc.FlxSchedulerElement = FlxSchedulerElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define("flx-scheduler", flexygo.ui.wc.FlxScheduler);
//# sourceMappingURL=flx-scheduler.js.map