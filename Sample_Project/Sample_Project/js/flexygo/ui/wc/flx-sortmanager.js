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
                    this.list = module.find('flx-list')[0];
                    if (this.list.data.length > 0) {
                        this.fields = Object.keys(this.list.data[0]).sort();
                    }
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
                    this.list.sortByObj(orderInfo);
                    me.closest('.ui-dialog').find('.ui-dialog-titlebar-close').click();
                }
                apply() {
                    let me = $(this);
                    let orderInfo = new Array();
                    me.find('.used li').each((i, el) => {
                        let itm = $(el);
                        let ord = new flexygo.api.list.PropertyOrder;
                        ord.Asc = itm.is('.asc');
                        ord.ObjectName = this.list.objectname;
                        ord.PropertyName = itm.attr('property');
                        orderInfo.push(ord);
                    });
                    this.list.sortByObj(orderInfo);
                    me.closest('.ui-dialog').find('.ui-dialog-titlebar-close').click();
                }
                render() {
                    let me = $(this);
                    me.html(`
                <div class="col-6 padding-l" style="padding-bottom:0px">
                    <div class="box">
                        <span class="textLabel">Fields</span>
                        <div class="sortContainer">
                            <ul class="fields unused"></ul>
                        </div>
                    </div>
                </div>
                <div class="col-6 padding-l" style="padding-bottom:0px">
                    <div class="box">
                        <span class="textLabel">Sort</span>
                        <div class="sortContainer">
                            <ul class="fields used"></ul>
                        </div>
                    </div>
                </div>
            `);
                    let ul = me.find('.unused');
                    for (var i = 0; i < this.fields.length; i++) {
                        if (this.fields[i].toLowerCase() != '_objectname' && this.fields[i].toLowerCase() != '_objectwhere' && this.fields[i].toLowerCase() != '_ot' && this.fields[i].toLowerCase() != '_guid') {
                            ul.append('<li class="fieldSortItem asc" property="' + this.fields[i] + '"><i style="border-radius:50%" class="sortIcon fa fa-arrows" /> ' + this.fields[i] + '<i class="delbutton fa fa-close pull-right" style="display:none"/> </li>');
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
                        connectWith: ".fields",
                        appendTo: document.body,
                        helper: "clone",
                        start: (event, ui) => { this.sortStart(ui.item); },
                        stop: (event, ui) => { this.sortStop(ui.item); },
                    }).disableSelection();
                    if (this.list.orderObj && this.list.orderObj.length > 0) {
                        for (let i = 0; i < this.list.orderObj.length; i++) {
                            let col = this.list.orderObj[i];
                            let field = me.find('.unused [property]').filter(function () { return $(this).attr('property').toLowerCase() == col.PropertyName.toLowerCase(); });
                            if (field.length > 0) {
                                if (!col.Asc) {
                                    field.toggleClass('asc dsc');
                                }
                                me.find('.used').append(field);
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