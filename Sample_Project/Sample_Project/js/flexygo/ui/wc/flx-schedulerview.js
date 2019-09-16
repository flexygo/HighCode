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
            class FlxSchedulerViewElement extends HTMLElement {
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
                        ctx.render('.schedulerView');
                    }
                }
                init() {
                    let ctx = this;
                    let me = $(this);
                    me.removeAttr('manualInit');
                    ctx.me.append('<div class="schedulerView" ></div>');
                    let parentModule = me.closest('flx-module');
                    let wcModule = parentModule[0];
                    if (parentModule && wcModule) {
                        wcModule.moduleLoaded(this);
                    }
                    ctx.render('.schedulerView');
                }
                render(selector) {
                    let ctx = this;
                    ctx.me.el = $(ctx).find(selector)[0];
                    ctx.me.current = moment().date(1);
                    ctx.me.current.locale(flexygo.profiles.langKey.toLowerCase().slice(0, 2));
                    ctx.changeEvents(ctx.additionalWhere); //Recoger eventos
                }
                changeEvents(additionalWhere) {
                    let ctx = this;
                    let me = $(this);
                    let datepicker = new Date(ctx.me.current);
                    let date = new Date(ctx.me.current.date(1));
                    let start = ctx.formatDate(date, '' + (date.getMonth() + 1), '01', date.getFullYear());
                    let end = '';
                    let dp1 = me.find('#datepicker');
                    dp1.datepicker("setDate", (datepicker.getMonth() + 1) + '/' + datepicker.getDate() + '/' + datepicker.getFullYear());
                    if (date.getMonth() + 1 == 12) {
                        end = ctx.formatDate(date, '01', '01', date.getFullYear() + 1);
                    }
                    else {
                        end = ctx.formatDate(date, '' + (date.getMonth() + 2), '01', date.getFullYear());
                    }
                    let paramsConfig = {
                        ModuleName: ctx.moduleName
                    };
                    flexygo.ajax.post('~/api/SchedulerView', 'GetSchedulerConfig', paramsConfig, (response) => {
                        if (response) {
                            ctx.me.conf = response;
                            let params = {
                                ObjName: me.attr('objectname'),
                                ObjectWhere: me.attr('objectwhere'),
                                ModuleName: ctx.moduleName,
                                Start: start,
                                End: end,
                                AdditionalWhere: additionalWhere,
                                SchedulerConfig: response
                            };
                            flexygo.ajax.post('~/api/SchedulerView', 'GetSchedulerViewConfig', params, (response) => {
                                if (response) {
                                    ctx.me.events = response;
                                    ctx.draw();
                                    var current = document.querySelector('.today');
                                    if (current) {
                                        window.setTimeout(function () {
                                            ctx.openDay(current);
                                        }, 500);
                                    }
                                }
                            });
                        }
                    });
                }
                draw() {
                    let ctx = this;
                    let me = $(this);
                    //Create Header
                    ctx.drawHeader();
                    //Draw Month
                    ctx.drawMonth();
                    //Draw Legend
                    //ctx.drawLegend();
                    //Datepicker
                    $('.h1-datepicker').append('<div class="col-6 col-m-12"><div id="datepicker" style="display:none;position:absolute;z-index: 2;" class="cute-calendar"></div></div>');
                    let dp1 = me.find('#datepicker');
                    $('.h1-datepicker').click(function () {
                        dp1.show();
                    });
                    dp1.datepicker({
                        onSelect: function (dateText, inst) {
                            dp1.hide();
                            var date = new Date(dateText);
                            ctx.me.current = moment(date);
                            ctx.me.current.locale(flexygo.profiles.langKey.toLowerCase().slice(0, 2));
                            ctx.changeEvents(ctx.additionalWhere);
                        }, firstDay: 1
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
                drawHeader() {
                    let ctx = this;
                    if (!ctx.me.header) {
                        //Create the header elements
                        ctx.me.header = ctx.createElement('div', 'header', '', '');
                        $(ctx.me.header).addClass('header');
                        ctx.me.datepicker = ctx.createElement('div', 'h1-datepicker', '', '');
                        ctx.me.title = ctx.createElement('h1', '', '', '');
                        var right = ctx.createElement('div', 'right', '', '');
                        $(right).click(function () {
                            ctx.nextMonth();
                        });
                        var left = ctx.createElement('div', 'left', '', '');
                        $(left).click(function () {
                            ctx.prevMonth();
                        });
                        //Append the Elements
                        $(ctx.me.datepicker).append(ctx.me.title);
                        $(ctx.me.header).append(ctx.me.datepicker);
                        $(ctx.me.header).append(right);
                        $(ctx.me.header).append(left);
                        $(ctx.me.el).append(ctx.me.header);
                    }
                    $(ctx.me.title).html(ctx.me.current.format('MMMM YYYY'));
                }
                drawMonth() {
                    let ctx = this;
                    let me = $(this);
                    ctx.me.events.forEach(function (ev) {
                        ev.date = moment(ev.Date);
                        ev.eventName = flexygo.utils.parser.recursiveCompile(ev.Row, ev.eventName);
                    });
                    if (ctx.me.month) {
                        ctx.me.oldMonth = ctx.me.month;
                        $(ctx.me.oldMonth).addClass('month out ' + (ctx.me.next ? 'next' : 'prev'));
                        $(ctx.me.oldMonth).on('webkitAnimationEnd', function () {
                            $(ctx.me.oldMonth).remove();
                            ctx.me.month = ctx.createElement('div', 'month', '', '');
                            ctx.backFill();
                            ctx.currentMonth();
                            ctx.fowardFill();
                            $(ctx.me.el).append(ctx.me.month);
                            window.setTimeout(function () {
                                $(ctx.me.month).addClass('month in ' + (ctx.me.next ? 'next' : 'prev'));
                                me.find('.month').not('.in').remove();
                            }, 16);
                        });
                    }
                    else {
                        ctx.me.month = ctx.createElement('div', 'month', '', '');
                        $(ctx.me.el).append(ctx.me.month);
                        ctx.backFill();
                        ctx.currentMonth();
                        ctx.fowardFill();
                        $(ctx.me.month).addClass('month new');
                    }
                }
                createElement(tagName, className, innerText, backgroundColor) {
                    var ele = document.createElement(tagName);
                    if (className) {
                        $(ele).addClass(className);
                    }
                    if (innerText) {
                        $(ele).text(innerText);
                    }
                    if (backgroundColor) {
                        $(ele).css("background-color", backgroundColor);
                    }
                    return ele;
                }
                backFill() {
                    let ctx = this;
                    var clone = ctx.me.current.clone();
                    var dayOfWeek = clone.day();
                    if (!dayOfWeek) {
                        dayOfWeek = 6;
                    }
                    clone.subtract('days', dayOfWeek + 1);
                    for (var i = dayOfWeek; i > 0; i--) {
                        ctx.drawDay(clone.add('days', 1));
                    }
                }
                getWeek(day) {
                    let ctx = this;
                    if (day.day() === 1) {
                        ctx.me.week = ctx.createElement('div', 'week', '', '');
                        $(ctx.me.month).append(ctx.me.week);
                    }
                }
                fowardFill() {
                    let ctx = this;
                    var clone = ctx.me.current.clone().add('months', 1).subtract('days', 1);
                    var dayOfWeek = clone.day();
                    if (dayOfWeek > 6) {
                        return;
                    }
                    for (var i = dayOfWeek; i <= 6; i++) {
                        ctx.drawDay(clone.add('days', 1));
                    }
                }
                currentMonth() {
                    let ctx = this;
                    var clone = ctx.me.current.clone();
                    while (clone.month() === ctx.me.current.month()) {
                        ctx.drawDay(clone);
                        clone.add('days', 1);
                    }
                }
                drawDay(day) {
                    let ctx = this;
                    ctx.getWeek(day);
                    //Outer Day
                    var outer = ctx.createElement('div', ctx.getDayClass(day), '', '');
                    //var outer = ctx.createElement('div', 'day', '');
                    $(outer).attr('currentdate', day.format('YYYYMMDD'));
                    if ($(outer).attr("class") != 'day other') {
                        $(outer).click(function () {
                            ctx.openDay(this);
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
                    else {
                        $(outer).click(function () {
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
                    //Day Name
                    var name = ctx.createElement('div', 'day-name', day.format('ddd'), '');
                    //Day Number
                    var number = ctx.createElement('div', 'day-number', day.format('DD'), '');
                    //Events
                    var events = ctx.createElement('div', 'day-events', '', '');
                    ctx.drawEvents(day, events);
                    $(outer).append(name);
                    $(outer).append(number);
                    $(outer).append(events);
                    $(ctx.me.week).append(outer);
                }
                drawEvents(day, element) {
                    let ctx = this;
                    if (day.month() === ctx.me.current.month()) {
                        var todaysEvents = ctx.me.events.reduce(function (memo, ev) {
                            if (ev.date.isSame(day, 'day')) {
                                memo.push(ev);
                            }
                            return memo;
                        }, []);
                        todaysEvents.forEach(function (ev) {
                            var evSpan = ctx.createElement('span', '', '', ev.color);
                            $(element).append(evSpan);
                        });
                    }
                }
                getDayClass(day) {
                    let ctx = this;
                    var classes;
                    classes = ['day'];
                    if (day.month() !== ctx.me.current.month()) {
                        classes.push('other');
                    }
                    else if (ctx.today.isSame(day, 'day')) {
                        classes.push('today');
                    }
                    return classes.join(' ');
                }
                openDay(el) {
                    let ctx = this;
                    var defaultDate = $(el).attr('currentdate');
                    var details, arrow;
                    var dayNumber = +$(el).find('.day-number').text();
                    var day = ctx.me.current.clone().date(dayNumber);
                    var currentOpened = $(document).find('.details')[0];
                    //Check to see if there is an open detais box on the current row
                    if (currentOpened && $(currentOpened).parent()[0] === $(el).parent()[0]) {
                        details = currentOpened;
                        arrow = $(document).find('.arrow')[0];
                    }
                    else {
                        //Close the open events on differnt week row
                        //currentOpened && currentOpened.parentNode.removeChild(currentOpened);
                        if (currentOpened) {
                            $(currentOpened).on('webkitAnimationEnd', function () {
                                $(currentOpened).remove();
                            });
                            $(currentOpened).on('oanimationend', function () {
                                $(currentOpened).remove();
                            });
                            $(currentOpened).on('msAnimationEnd', function () {
                                $(currentOpened).remove();
                            });
                            $(currentOpened).on('animationend', function () {
                                $(currentOpened).remove();
                            });
                            $(currentOpened).addClass('details out');
                        }
                        //Create the Details Container
                        details = ctx.createElement('div', 'details in', '', '');
                        //Create the arrow
                        arrow = ctx.createElement('div', 'arrow', '', '');
                        //Create the event wrapper
                        $(details).append(arrow);
                        $(el).parent().append(details);
                    }
                    var todaysEvents = ctx.me.events.reduce(function (memo, ev) {
                        if (ev.date.isSame(day, 'day')) {
                            memo.push(ev);
                        }
                        return memo;
                    }, []);
                    ctx.renderEvents(todaysEvents, details, defaultDate);
                    var arrowWidth = (50 * $(el).width() / 100) + 7;
                    $(arrow).css("left", $(el).offset().left - $(el).parent().offset().left + arrowWidth + 'px');
                }
                renderEvents(events, ele, defaultDate) {
                    let ctx = this;
                    //Remove any events in the current details element
                    var currentWrapper = ele.querySelector('.events');
                    var wrapper = ctx.createElement('div', 'events in' + (currentWrapper ? ' new' : ''), '', '');
                    var addNew = ctx.createElement('i', 'clickable padding-right-l addnew icon-15x flx-icon icon-add-icon txt-notify', '', '');
                    $(addNew).click(function () {
                        if (ctx.me.conf.length > 1) {
                            let myButtons = new Object();
                            let buttons = '';
                            for (var i = 0; i < ctx.me.conf.length; i++) {
                                myButtons[ctx.me.conf[i].ObjectName] = {
                                    ObjectName: ctx.me.conf[i].ObjectName,
                                    StartDateField: ctx.me.conf[i].StartDateField,
                                    Icon: ctx.me.conf[i].Icon,
                                    Target: ctx.me.conf[i].Target
                                };
                                if (ctx.me.conf[i].CanInsert) {
                                    buttons += '<a style="padding: 0.7em;margin-right: 3%;margin-bottom: 3%;" class="btn btn-default bg-outstanding modalButton"><i style="margin-right:4px;" class="' + ctx.me.conf[i].Icon + '"></i>' + ctx.me.conf[i].ObjectName + '</a>';
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
                                    let defaults = {};
                                    defaults[ctx.me.conf[0].StartDateField] = defaultDate.substring(0, 4) + '-' + defaultDate.substring(4, 6) + '-' + defaultDate.substring(6, 8);
                                    flexygo.nav.openPage('edit', object.ObjectName, null, JSON.stringify(defaults), object.Target, false, $(this));
                                    $('.sweet-modal-overlay').remove();
                                });
                            }
                        }
                        else {
                            if (ctx.me.conf[0].CanInsert) {
                                let defaults = {};
                                defaults[ctx.me.conf[0].StartDateField] = defaultDate.substring(0, 4) + '-' + defaultDate.substring(4, 6) + '-' + defaultDate.substring(6, 8);
                                flexygo.nav.openPage('edit', ctx.me.conf[0].ObjectName, null, JSON.stringify(defaults), ctx.me.conf[0].Target, false, $(this));
                            }
                        }
                    });
                    $(wrapper).append(addNew);
                    events.forEach(function (ev) {
                        var div = ctx.createElement('div', 'event', '', '');
                        var square = ctx.createElement('div', 'event-category ', '', ev.color);
                        var span = $('<span />').html(ev.eventName)[0];
                        if (ev.pageType == "edit" && ev.canEdit) {
                            $(div).click(function () {
                                flexygo.nav.openPage(ev.pageType, ev.calendar, ctx.getObjectWhere(ev.table, ev.key, ev.id), null, ev.target, false, $(this));
                            });
                        }
                        if (ev.pageType == "view" && ev.canView) {
                            $(div).click(function () {
                                flexygo.nav.openPage(ev.pageType, ev.calendar, ctx.getObjectWhere(ev.table, ev.key, ev.id), null, ev.target, false, $(this));
                            });
                        }
                        $(div).append(square);
                        $(div).append(span);
                        $(wrapper).append(div);
                    });
                    if (!events.length) {
                        var div = ctx.createElement('div', 'event empty', '', '');
                        var span = ctx.createElement('span', '', 'No Events', '');
                        $(div).append(span);
                        $(wrapper).append(div);
                    }
                    if (currentWrapper) {
                        $(currentWrapper).addClass('events out');
                        $(currentWrapper).on('webkitAnimationEnd', function () {
                            $(currentWrapper).remove();
                            $(ele).append(wrapper);
                        });
                        $(currentWrapper).on('oanimationend', function () {
                            $(currentWrapper).remove();
                            $(ele).append(wrapper);
                        });
                        $(currentWrapper).on('msAnimationEnd', function () {
                            $(currentWrapper).remove();
                            $(ele).append(wrapper);
                        });
                        $(currentWrapper).on('animationend', function () {
                            $(currentWrapper).remove();
                            $(ele).append(wrapper);
                        });
                    }
                    else {
                        $(ele).append(wrapper);
                    }
                }
                drawLegend() {
                    let ctx = this;
                    var legend = ctx.createElement('div', 'legend', '', '');
                    ctx.me.events.map(function (e) {
                        return e.calendar + '|' + e.color;
                    }).reduce(function (memo, e) {
                        if (memo.indexOf(e) === -1) {
                            memo.push(e);
                        }
                        return memo;
                    }, []).forEach(function (e) {
                        var parts = e.split('|');
                        var entry = ctx.createElement('span', 'entry', parts[0], '');
                        var evSpan = ctx.createElement('span', 'colorLegend', '', parts[1]);
                        $(entry).prepend(evSpan);
                        $(legend).append(entry);
                    });
                    $(ctx.me.el).append(legend);
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
                nextMonth() {
                    let ctx = this;
                    ctx.me.current.add('months', 1);
                    ctx.me.next = true;
                    ctx.changeEvents(ctx.additionalWhere);
                }
                prevMonth() {
                    let ctx = this;
                    ctx.me.current.subtract('months', 1);
                    ctx.me.next = false;
                    ctx.changeEvents(ctx.additionalWhere);
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
            wc.FlxSchedulerViewElement = FlxSchedulerViewElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-schedulerview', flexygo.ui.wc.FlxSchedulerViewElement);
//# sourceMappingURL=flx-schedulerview.js.map