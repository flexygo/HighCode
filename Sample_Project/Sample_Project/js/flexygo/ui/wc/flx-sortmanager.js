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
          * Library for the flx-sortManagerElement web component.
          *
          * @class FlxSortManagerElement
          * @constructor
          * @return {FlxSortManagerElement} .
          */
            class FlxSortManagerElement extends HTMLElement {
                constructor() {
                    super();
                    this.sorting = false;
                    this.sortingFrom = null;
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                }
                /**
                * Init the webcomponent.
                * @method init
                */
                init(module) {
                    this.module = module;
                    this.list = module.find('flx-list, flx-search')[0];
                    //if (this.list.data.length > 0) {
                    //    this.fields = Object.keys(this.list.data[0]).sort();
                    //}
                    this.render();
                }
                /**
                * Refresh de webcomponent.
                * @method refresh
                */
                refresh() {
                    this.render();
                }
                clean() {
                    let me = $(this);
                    let orderInfo = new Array();
                    this.list.sortByObj(orderInfo, new flexygo.api.TemplateGroupCollection());
                    me.closest('.ui-dialog').find('.ui-dialog-titlebar-close').click();
                }
                apply() {
                    let me = $(this);
                    let orderInfo = new Array();
                    me.find('.fields.used li').each((i, el) => {
                        let itm = $(el);
                        let ord = new flexygo.api.list.PropertyOrder;
                        ord.Asc = itm.is('.asc');
                        ord.ObjectName = this.list.objectname;
                        ord.PropertyName = itm.attr('property');
                        orderInfo.push(ord);
                    });
                    let groupsInfo = new flexygo.api.TemplateGroupCollection();
                    me.find('.groups.used li').each((i, el) => {
                        let itm = $(el);
                        let ord = new flexygo.api.TemplateGroup;
                        ord.OrderMode = (itm.is('.asc') ? 'Asc' : 'Desc');
                        ord.GroupField = itm.attr('property');
                        ord.Order = i;
                        groupsInfo[ord.GroupField] = ord;
                    });
                    this.list.sortByObj(orderInfo, groupsInfo);
                    me.closest('.ui-dialog').find('.ui-dialog-titlebar-close').click();
                }
                render() {
                    let me = $(this);
                    me.html(`
                <div class="flex-container">
                  <div class="tabPanel">
                    <ul class="nav nav-tabs">
                      <li class="nav-item active sort">
                        <a class="nav-link" href="#">${flexygo.localization.translate('sortmanager.sort')}</a>
                      </li>
                      <li class="nav-item group">
                        <a class="nav-link" href="#">${flexygo.localization.translate('sortmanager.groups')}</a>
                      </li>
                    </ul>
                  </div>
                  <div class="fieldPanel">
                    <div class="sortData">
                        <div class="fieldspanel col-6 padding-l" style="padding-bottom:0px">
                            <div class="box">
                                <span class="textLabel">${flexygo.localization.translate('sortmanager.fields')}</span>
                                <div class="sortContainer">
                                    <ul class="fields unused"></ul>
                                </div>
                            </div>
                        </div>
                        <div class="fieldspanel col-6 padding-l" style="padding-bottom:0px">
                            <div class="box">
                                <span class="textLabel">${flexygo.localization.translate('sortmanager.sort')}</span>
                                <div class="sortContainer">
                                    <ul class="fields used"></ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="groupData" style="display:none">
                        <div class="fieldspanel col-6 padding-l" style="padding-bottom:0px">
                            <div class="box">
                                <span class="textLabel">${flexygo.localization.translate('sortmanager.groups')}</span>
                                <div class="sortContainer">
                                    <ul class="groups unused"></ul>
                                </div>
                            </div>
                        </div>
                        <div class="fieldspanel col-6 padding-l" style="padding-bottom:0px">
                            <div class="box">
                                <span class="textLabel">${flexygo.localization.translate('sortmanager.applied')}</span>
                                <div class="sortContainer">
                                    <ul class="groups used"></ul>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
            `);
                    me.find('.nav-item').on('click', (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        let btn = $(e.currentTarget);
                        btn.closest('.nav-tabs').find('.active').removeClass('active');
                        btn.addClass('active');
                        if (btn.is('.sort')) {
                            btn.closest('flx-sortmanager').find('.groupData').hide();
                            btn.closest('flx-sortmanager').find('.sortData').show();
                        }
                        else {
                            btn.closest('flx-sortmanager').find('.sortData').hide();
                            btn.closest('flx-sortmanager').find('.groupData').show();
                        }
                    });
                    let ul = me.find('.fields.unused');
                    for (let key in this.list.fields) {
                        if (key.toLowerCase() != '_objectname' && key.toLowerCase() != '_objectwhere' && key.toLowerCase() != '_ot' && key.toLowerCase() != '_guid') {
                            ul.append('<li class="fieldSortItem asc" property="' + key + '"><i style="border-radius:50%" class="sortIcon fa fa-arrows" /> ' + this.list.fields[key] + '<i class="delbutton fa fa-close pull-right" style="display:none"/> </li>');
                        }
                    }
                    if (!this.list.userDefinedGroups || !this.list.groupList || Object.keys(this.list.groupList).length == 0) {
                        me.find('.tabPanel').hide();
                    }
                    else {
                        let ulOrder = me.find('.groups.unused');
                        for (let key in this.list.groupList) {
                            ulOrder.append('<li class="fieldSortItem asc" property="' + key + '"><i style="border-radius:50%" class="sortIcon fa fa-arrows" /> ' + (this.list.groupList[key].Label ? this.list.groupList[key].Label : key) + '<i class="delbutton fa fa-close pull-right" style="display:none"/> </li>');
                        }
                    }
                    me.find('.fieldSortItem').on('click', (ev) => {
                        let itm = $(ev.currentTarget);
                        if (itm.closest('ul').is('.unused')) {
                            itm.find('i.sortIcon').removeClass('fa fa-arrows');
                            itm.find('i.fa-close').show();
                            me.find('.used').append(itm);
                        }
                        else {
                            itm.toggleClass('asc dsc');
                        }
                    });
                    me.find('.delbutton').on('click', (ev) => {
                        let itm = $(ev.currentTarget).closest('li[property]');
                        itm.find('i.fa-close').hide();
                        itm.find('i.sortIcon').addClass('fa fa-arrows');
                        itm.detach();
                        me.find('.unused').append(itm);
                        ev.stopPropagation();
                        ev.preventDefault();
                    });
                    me.find('.fields').sortable({
                        zIndex: 999999,
                        connectWith: ".fields",
                        appendTo: document.body,
                        helper: "clone",
                        start: (event, ui) => { this.sortStart(ui.item); },
                        stop: (event, ui) => { this.sortStop(ui.item); },
                    }).disableSelection();
                    me.find('.groups').sortable({
                        zIndex: 999999,
                        connectWith: ".groups",
                        appendTo: document.body,
                        helper: "clone",
                        start: (event, ui) => { this.sortStart(ui.item); },
                        stop: (event, ui) => { this.sortStop(ui.item); },
                    }).disableSelection();
                    if (this.list.orderObj && this.list.orderObj.length > 0) {
                        for (let i = 0; i < this.list.orderObj.length; i++) {
                            let col = this.list.orderObj[i];
                            let field = me.find('.fields.unused [property]').filter(function () { return $(this).attr('property').toLowerCase() == col.PropertyName.toLowerCase(); });
                            if (field.length > 0) {
                                if (!col.Asc) {
                                    field.toggleClass('asc dsc');
                                }
                                me.find('.fields.used').append(field);
                            }
                        }
                    }
                    if (this.list.userDefinedGroups && this.list.groups && Object.keys(this.list.groups).length > 0) {
                        for (let key in this.list.groups) {
                            let col = this.list.groups[key];
                            let field = me.find('.groups.unused [property]').filter(function () { return $(this).attr('property').toLowerCase() == col.GroupField.toLowerCase(); });
                            if (field.length > 0) {
                                if (col.OrderMode.toString().toLocaleLowerCase() == 'desc') {
                                    field.toggleClass('asc dsc');
                                }
                                me.find('.groups.used').append(field);
                            }
                        }
                    }
                }
                sortStart(item) {
                    this.sortingFrom = item.closest('ul');
                    this.sorting = true;
                }
                sortStop(item) {
                    let col = item.closest('ul');
                    if (!col.is(this.sortingFrom)) {
                        if (col.is('.used')) {
                            item.find('i.sortIcon').removeClass('fa fa-arrows');
                            item.find('i.fa-close').show();
                        }
                        else {
                            item.find('i.sortIcon').addClass('fa fa-arrows');
                            item.find('i.fa-close').hide();
                        }
                    }
                    this.sortingFrom = null;
                    this.sorting = false;
                }
            }
            wc.FlxSortManagerElement = FlxSortManagerElement;
        })(wc = ui_1.wc || (ui_1.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-sortmanager', flexygo.ui.wc.FlxSortManagerElement);
//# sourceMappingURL=flx-sortmanager.js.map