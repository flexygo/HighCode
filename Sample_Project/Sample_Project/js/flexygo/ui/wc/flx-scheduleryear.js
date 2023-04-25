//TOSDO_TS
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
           * Library for the FlxSchedulerViewElement web component.
           *
           * @class FlxSchedulerViewElement
           * @constructor
           * @return {FlxSchedulerViewElement}
           */
            class FlxSchedulerYearElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                   * Set when component is attached to DOM
                   * @property connected {boolean}
                   */
                    this.connected = false;
                    this.moduleName = null;
                    this.options = null;
                    this.me = $(this);
                    this.today = moment();
                    this.additionalWhere = null;
                }
                /**
               * Fires when element is attached to DOM
               * @method connectedCallback
               */
                connectedCallback() {
                    let element = $(this);
                    this.connected = true;
                    this.moduleName = element.attr("modulename");
                    this.data = element.attr('value');
                    if (element.attr('manualInit') != 'true') {
                        this.init();
                    }
                }
                /**
              * Array of observed attributes.
              * @property observedAttributes {Array}
              */
                static get observedAttributes() {
                    return ['modulename', 'value'];
                }
                /**
               * Fires when the attribute value of the element is changed.
               * @method attributeChangedCallback
               */
                attributeChangedCallback(attrName, oldVal, newVal) {
                    if (!this.connected) {
                        return;
                    }
                    if (attrName.toLowerCase() == 'modulename' && newVal && newVal != '') {
                        this.moduleName = newVal;
                        if (this.moduleName) {
                            this.refresh();
                        }
                    }
                    if (attrName.toLowerCase() == 'value' && newVal && newVal != '') {
                        this.data = newVal;
                        if (this.data) {
                            this.refresh();
                        }
                    }
                }
                refresh() {
                    if ($(this).attr('manualInit') != 'true') {
                        let ctx = this;
                        let me = $(this);
                        me.find('.calendar').remove();
                        me.find('flx-multicombo').remove();
                        ctx.me.filter = null;
                        ctx.init();
                    }
                }
                init() {
                    let ctx = this;
                    let me = $(this);
                    me.removeAttr('manualInit');
                    $(this).closest('flx-module').find('.flx-noInitContent').remove();
                    let parentModule = me.closest('flx-module');
                    let wcModule = parentModule[0];
                    if (parentModule && wcModule) {
                        wcModule.moduleLoaded(this);
                    }
                    var thisYear = (new Date()).getFullYear();
                    var start = new Date("1/1/" + thisYear);
                    ctx.me.current = moment(start.valueOf());
                    ctx.me.empty();
                    ctx.me.append('<div class="calendar"></div>');
                    ctx.render();
                }
                render() {
                    let ctx = this;
                    let me = $(this);
                    //$('.calendar').calendar();
                    me.find('.calendar').calendar({
                        // shows calendar headers
                        showHeaders: true,
                        // start year
                        startYear: ctx.me.current.year(),
                        // max/min year
                        maxYear: null,
                        maxDay: null,
                        maxMonth: null,
                        maxDayMessage: 'You can not choose day from future',
                        minYear: null,
                        minDay: null,
                        minMonth: null,
                        minDayMessage: 'You can not choose day from past',
                        // Bootstrap version
                        boostrapVersion: 4,
                        // for custom layout
                        cols: 12,
                        colsSm: 12,
                        colsMd: 12,
                        colsLg: 12,
                        colsXl: 12,
                        l10n: {
                            jan: flexygo.localization.translate('flxscheduleryear.january'),
                            feb: flexygo.localization.translate('flxscheduleryear.february'),
                            mar: flexygo.localization.translate('flxscheduleryear.march'),
                            apr: flexygo.localization.translate('flxscheduleryear.april'),
                            may: flexygo.localization.translate('flxscheduleryear.may'),
                            jun: flexygo.localization.translate('flxscheduleryear.june'),
                            jul: flexygo.localization.translate('flxscheduleryear.july'),
                            aug: flexygo.localization.translate('flxscheduleryear.august'),
                            sep: flexygo.localization.translate('flxscheduleryear.september'),
                            oct: flexygo.localization.translate('flxscheduleryear.october'),
                            nov: flexygo.localization.translate('flxscheduleryear.november'),
                            dec: flexygo.localization.translate('flxscheduleryear.december'),
                            mn: flexygo.localization.translate('flxscheduleryear.mn'),
                            tu: flexygo.localization.translate('flxscheduleryear.tu'),
                            we: flexygo.localization.translate('flxscheduleryear.we'),
                            th: flexygo.localization.translate('flxscheduleryear.th'),
                            fr: flexygo.localization.translate('flxscheduleryear.fr'),
                            sa: flexygo.localization.translate('flxscheduleryear.sa'),
                            su: flexygo.localization.translate('flxscheduleryear.su')
                        },
                        // max days to choose
                        maxDaysToChoose: false,
                        maxDaysToChooseMessage: 'Maximum days to choose is: ',
                        // classic or rangepicker
                        mode: 'classic',
                        // adds class to day on click
                        addUniqueClassOnClick: false,
                    });
                    me.find('.calendar').on('jqyc.changeYearToPrevious', function (event) {
                        ctx.me.current.add(-1, 'y');
                        ctx.changeEvents(ctx.additionalWhere, ctx.me.filter);
                    });
                    me.find('.calendar').on('jqyc.changeYearToNext', function (event) {
                        ctx.me.current.add(1, 'y');
                        ctx.changeEvents(ctx.additionalWhere, ctx.me.filter);
                    });
                    //me.find('.jqyc-not-empty-td').css('padding', '5px');
                    //Combo
                    let params = {
                        ModuleName: ctx.moduleName
                    };
                    flexygo.ajax.post('~/api/SchedulerYear', 'GetSchedulerCombo', params, (response) => {
                        if (response) {
                            if (response.ObjectName) {
                                me.prepend('<div class="fc-toolbar fc-header-toolbar filter"><div class="a" style="text-align:left;" id="filters"><flx-multicombo class="combo padding-m" ObjectName="' + response.ObjectName + '" ViewName="' + response.ViewName + '" IconClass="flx-icon icon-role" SQLValueField="' + response.SQLValueField + '" SQLDisplayField="' + response.SQLDisplayField + '" SQLFilter="' + response.SQLFilterField + '" filtertype="dbcombo"><template>' + response.DirectTemplate + '</template></flx-multicombo></div></div>');
                            }
                            me.find('flx-multicombo[viewname="' + response.ViewName + '"]').find('div').on('change', function () {
                                $('.calendar').find('tr *').removeAttr("style").removeClass("bg-outstanding txt-danger").popover('destroy');
                                $('.calendar').find('td *').css('width', '26px');
                                let filtros = this.closest('flx-multicombo').getValue();
                                if (filtros) {
                                    ctx.me.filter = filtros.split('|').join('\',\'');
                                    ctx.changeEvents(ctx.additionalWhere, ctx.me.filter);
                                }
                            });
                        }
                    });
                    ctx.changeEvents(ctx.additionalWhere, ctx.me.filter);
                }
                changeEvents(additionalWhere, filter) {
                    let ctx = this;
                    let me = $(this);
                    let date = new Date(ctx.me.current);
                    var start = ctx.formatDate(date, '01', '01', date.getFullYear());
                    var end = ctx.formatDate(date, '01', '01', date.getFullYear() + 1);
                    let paramsHolidays = {
                        ModuleName: ctx.moduleName,
                        Start: start,
                        End: end
                    };
                    flexygo.ajax.post('~/api/SchedulerYear', 'GetSchedulerHolidays', paramsHolidays, (response) => {
                        if (response) {
                            ctx.me.holidays = response;
                            ctx.me.holidays.forEach(function (ev) {
                                ev.date = moment(ev.Date);
                            });
                            let params = {
                                ObjName: me.attr('objectname'),
                                ObjectWhere: me.attr('objectwhere'),
                                ModuleName: ctx.moduleName,
                                Start: start,
                                End: end,
                                AdditionalWhere: additionalWhere,
                                Filter: filter
                            };
                            flexygo.ajax.post('~/api/SchedulerYear', 'GetSchedulerYearConfig', params, (response) => {
                                if (response) {
                                    ctx.me.events = response;
                                    ctx.me.events.forEach(function (ev) {
                                        ev.date = moment(ev.Date);
                                        ev.eventName = flexygo.utils.parser.recursiveCompile(ev.Row, ev.eventName);
                                    });
                                    ctx.currentYear();
                                }
                            });
                        }
                    });
                }
                currentYear() {
                    let ctx = this;
                    var clone = ctx.me.current.clone();
                    while (clone.year() === ctx.me.current.year()) {
                        ctx.drawEvents(clone);
                        clone.add('days', 1);
                    }
                }
                drawEvents(day) {
                    let ctx = this;
                    let eventColor = '';
                    let colores = 1;
                    let me = $(this);
                    if (day.year() === ctx.me.current.year()) {
                        var todaysEvents = ctx.me.events.reduce(function (memo, ev) {
                            if (ev.date.isSame(day, 'day') && ev.date.isSame(day, 'month')) {
                                memo.push(ev);
                            }
                            return memo;
                        }, []);
                        var todaysHolidays = ctx.me.holidays.reduce(function (memo, ev) {
                            if (ev.date.isSame(day, 'day') && ev.date.isSame(day, 'month')) {
                                memo.push(ev);
                            }
                            return memo;
                        }, []);
                        if (todaysHolidays.length != 0) {
                            todaysHolidays.forEach(function (ev) {
                                var month = ev.date.month() + 1;
                                var date = ev.date.date();
                                me.find('td[data-month="' + month + '"][data-day-of-month="' + date + '"]').addClass('txt-danger');
                                me.find('td[data-month="' + month + '"][data-day-of-month="' + date + '"]').css('font-weight', 'bold');
                            });
                        }
                        if (todaysEvents.length != 0) {
                            var content = document.createElement('div');
                            $(content).addClass('details');
                            todaysEvents.forEach(function (ev) {
                                var month = ev.date.month() + 1;
                                var date = ev.date.date();
                                if (eventColor != '' && eventColor != ev.color) {
                                    colores++;
                                }
                                if (colores > 1) {
                                    me.find('td[data-month="' + month + '"][data-day-of-month="' + date + '"]').find("div").css('background-color', '');
                                    me.find('td[data-month="' + month + '"][data-day-of-month="' + date + '"]').find("div").css('border-radius', '60%');
                                    me.find('td[data-month="' + month + '"][data-day-of-month="' + date + '"]').find("div").addClass('bg-outstanding');
                                    me.find('td[data-month="' + month + '"][data-day-of-month="' + date + '"]').css('font-weight', 'normal');
                                }
                                else {
                                    me.find('td[data-month="' + month + '"][data-day-of-month="' + date + '"]').find("div").css('background', ev.color);
                                    me.find('td[data-month="' + month + '"][data-day-of-month="' + date + '"]').find("div").css('border-radius', '60%');
                                    me.find('td[data-month="' + month + '"][data-day-of-month="' + date + '"]').css('font-weight', 'normal');
                                }
                                me.find('td[data-month="' + month + '"][data-day-of-month="' + date + '"]').css('color', 'color: #FFF');
                                var div = document.createElement('div');
                                $(div).addClass('event');
                                var square = document.createElement('div');
                                $(square).addClass('event-category').css('background', ev.color);
                                var span = $('<span />').html(' ' + ev.eventName);
                                if (ev.pageType == "edit" && ev.canEdit) {
                                    $(div).click(function () {
                                        flexygo.nav.openPage(ev.pageType, ev.calendar, ctx.getObjectWhere(ev.table, ev.key, ev.id), null, ev.target, false, $(this));
                                    });
                                }
                                else if (ev.pageType == "view" && ev.canView) {
                                    $(div).click(function () {
                                        flexygo.nav.openPage(ev.pageType, ev.calendar, ctx.getObjectWhere(ev.table, ev.key, ev.id), null, ev.target, false, $(this));
                                    });
                                }
                                else if (ev.pageType == "generic") {
                                    $(div).click(function () {
                                        var func = new Function('objectname', 'objectwhere', 'calEvent', 'jsEvent', 'view', ev.OnClickJS);
                                        func.call(this, ev.calendar, ctx.getObjectWhere(ev.table, ev.key, ev.id), ev);
                                    });
                                }
                                eventColor = ev.color;
                                $(div).append(square);
                                $(div).append(span);
                                $(content).append(div);
                            });
                            var month = day.month() + 1;
                            var date = day.date();
                            me.find('td[data-month="' + month + '"][data-day-of-month="' + date + '"]').popover({
                                placement: 'auto top',
                                html: true,
                                trigger: 'manual',
                                content: content,
                                container: '.calendar'
                            }).on("mouseenter touchstart", function () {
                                var _this2 = this;
                                $(this).popover("show");
                                $(this).siblings(".popover").on("mouseleave", function () {
                                    $(_this2).popover('hide');
                                });
                            }).on("mouseleave", function () {
                                var _this2 = this;
                                var some_function = function () {
                                    setTimeout(function () {
                                        if (!$(".popover:hover").length) {
                                            $(_this2).popover("hide");
                                        }
                                        else {
                                            some_function();
                                        }
                                    }, 10);
                                };
                                some_function();
                            });
                            me.find('.jqyc').on('touchmove', function () {
                                me.find('.popover').remove();
                            });
                        }
                        var monthDay = day.month() + 1;
                        var dateDay = day.date();
                        me.find('td[data-month="' + monthDay + '"][data-day-of-month="' + dateDay + '"]').attr('currentdate', day.format('YYYYMMDD'));
                        me.find('td[data-month="' + monthDay + '"][data-day-of-month="' + dateDay + '"]').children().addClass('clickable');
                        me.find('td[data-month="' + monthDay + '"][data-day-of-month="' + dateDay + '"]').on("click", function () {
                            let ev = {
                                class: "module",
                                type: "selected",
                                sender: ctx,
                                masterIdentity: $(this).attr('currentdate'),
                                detailIdentity: null
                            };
                            flexygo.events.trigger(ev);
                        });
                    }
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
                formatDate(date, month, day, year) {
                    if (month.length < 2)
                        month = '0' + month;
                    if (day.length < 2)
                        day = '0' + day;
                    return [year, month, day].join('');
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
            wc.FlxSchedulerYearElement = FlxSchedulerYearElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-scheduleryear', flexygo.ui.wc.FlxSchedulerYearElement);
//# sourceMappingURL=flx-scheduleryear.js.map