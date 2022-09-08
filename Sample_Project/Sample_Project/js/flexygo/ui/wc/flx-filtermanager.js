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
          * Library for the flx-filterManagerElement web component.
          *
          * @class FlxFilterManagerElement
          * @constructor
          * @return {FlxFilterManagerElement} .
          */
            class FlxFilterManagerElement extends HTMLElement {
                constructor() {
                    super();
                    this.tree = null;
                    this.objcmb = null;
                    this.cmb = null;
                    this.typecmb = null;
                    this.fields = null;
                    this.choosebar = null;
                    this.generic = false;
                    this.allSaved = true;
                    this.newValue = 0;
                    this.active = '';
                    this.resto = 0;
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = $(this);
                    this.objectname = element.attr('ObjectName');
                    this.active = element.attr("active");
                    this.generic = false;
                    let attr = element.attr('generic');
                    if (attr && attr === 'true') {
                        this.generic = true;
                    }
                    this.init();
                }
                /**
                * Init the webcomponent.
                * @method init
                */
                init() {
                    this.refresh();
                }
                /**
                * Refresh de webcomponent.
                * @method refresh
                */
                refresh() {
                    let me = $(this);
                    me.append('<span class="label">' + flexygo.localization.translate('filtermanager.objectname') + ':</span>');
                    me.append('<flx-dbcombo objectname="sysObject" viewname="sysOnlineCollections" sqlvaluefield="ObjectName" sqldisplayfield="Descrip"></flx-dbcombo>');
                    me.append('<span class="label">' + flexygo.localization.translate('filtermanager.choosefilter') + ':</span>');
                    //me.append('<div name="choosebar" class="row input-group"> <span class="input-group-addon clickable newFilter" > <i class="flx-icon icon-plus" /></span><span class="input-group-addon clickable editFilter"><i class="flx-icon icon-report-filters" /> </span><select class="filterCmb form-control"></select> <span class="input-group-addon clickable deleteFilter" > <i class="flx-icon icon-trash" /></span></div> ');
                    me.append('<div name="choosebar" class="row input-group"> <span class="input-group-addon clickable newFilter" > <i class="flx-icon icon-plus" /></span><span class="input-group-addon clickable editFilter"><i class="flx-icon icon-report-filters" /> </span><select class="filterCmb form-control"></select></div> ');
                    me.append('<span class="label">' + flexygo.localization.translate('filtermanager.filtertype') + ':</span>');
                    me.append('<select class="typefilterCmb form-control"></select><br/>');
                    me.append('<div class="col-5 box"><span class="label">' + flexygo.localization.translate('filtermanager.properties') + ':</span><br/><ul class="objtree list-group"></ul></div>');
                    me.append('<div class="col-7 box fieldsFilter"><span class="label">' + flexygo.localization.translate('filtermanager.fields') + ':</span><br/><ul class="filterFields list-group"></ul></div>');
                    if (me.closest('flx-objectmanager .tab-pane').length > 0) {
                        me.append('<div class="col-12 box"><button name="filtersave" class="btn btn-default bg-success"><i class="flx-icon icon-save" /> ' + flexygo.localization.translate('filtermanager.save') + '</button></div>');
                        me.find("button[name='filtersave']").on('click', () => { this.saveFilter(); });
                    }
                    else {
                        me.closest('.ui-dialog').find("button[name='save']").on("click", () => { this.saveFilter(); });
                        me.closest('.ui-dialog').find("button[name='delete']").on("click", () => { this.deleteFilter(); });
                    }
                    //me.append('<div class="col-12 box"><button name="filtersave" class="btn btn-default bg-success"><i class="flx-icon icon-save" /> ' + flexygo.localization.translate('filtermanager.save') + '</button></div>');
                    //me.find("button[name='filtersave']").on('click', () => { this.saveFilter(); });
                    me.find('.newFilter').on('click', () => { this.newFilter(); });
                    me.find('.editFilter').on('click', () => { this.editFilter(); });
                    this.objcmb = me.find('flx-dbcombo');
                    this.typecmb = me.find('.typefilterCmb');
                    this.tree = me.find('.objtree');
                    this.cmb = me.find('.filterCmb');
                    this.fields = me.find('.filterFields');
                    this.choosebar = me.find("[name='choosebar']");
                    if (this.generic === false) {
                        //Scripts buscadores objeto
                        this.objcmb.hide();
                        this.objcmb.prev().hide();
                        this.typecmb.show();
                        this.typecmb.prev().show();
                        this.choosebar.show();
                        this.choosebar.prev().show();
                        this.loadObj(this.objectname, this.tree, true);
                        this.objcmb.off('change');
                        this.cmb.focus();
                    }
                    else {
                        //Scripts buscador principal
                        this.objcmb.show();
                        this.objcmb.prev().show();
                        this.typecmb.hide();
                        this.typecmb.prev().hide();
                        this.choosebar.hide();
                        this.choosebar.prev().hide();
                        this.objcmb.focus();
                        this.objcmb.off('change').on('change', () => {
                            let value = this.objcmb.val();
                            if (this.objectname != value) {
                                this.objectname = value;
                                let params = {
                                    ObjectName: value,
                                    Generic: (this.generic),
                                    NonGeneric: (!this.generic)
                                };
                                flexygo.ajax.post('~/api/Sys', 'getFilters', params, (response) => {
                                    this.loadObj(this.objectname, this.tree, true);
                                    let found = false;
                                    if (response.Filters && Object.keys(response.Filters).length > 0) {
                                        $.each(response.Filters, (i, e) => {
                                            if (e.Generic === true) {
                                                this.loadFilter(e);
                                                found = true;
                                                return false;
                                            }
                                        });
                                    }
                                    if (!found) {
                                        this.applyNewFilter(this.objectname + ' generic search');
                                    }
                                });
                            }
                        });
                    }
                    this.getFilters();
                }
                /**
               * Gets filters from controller
               * @method getFilters
               */
                getFilters() {
                    let params = {
                        ObjectName: this.objectname,
                        Generic: (this.generic),
                        NonGeneric: (!this.generic)
                    };
                    flexygo.ajax.post('~/api/Sys', 'getFilters', params, (response) => {
                        this.filtertypes = response.Types;
                        this.types = response.FilterTypes;
                        $.each(this.filtertypes, (i, e) => {
                            let opt = $('<option/>').html(e.Type).attr('value', e.Type);
                            this.typecmb.append(opt);
                        });
                        this.type = this.typecmb.val();
                        if (response.Filters) {
                            $.each(response.Filters, (i, e) => {
                                let opt = $('<option/>');
                                opt.html(e.Name);
                                opt.attr('value', e.SearchId);
                                opt.data('extvalue', e);
                                if (this.active && this.active.length > 0) {
                                    if (this.active.toLowerCase() === e.SearchId.toLowerCase()) {
                                        opt.prop('selected', true);
                                    }
                                }
                                this.cmb.append(opt);
                            });
                        }
                        let previous;
                        this.cmb.on('focus', () => {
                            previous = this.value;
                        }).change(() => {
                            if (this.allSaved || confirm(flexygo.localization.translate("filtermanager.unsaved"))) {
                                var sel = this.cmb.find('option:selected').data('extvalue');
                                this.showProperties();
                                this.loadFilter(sel);
                                this.hideProperties();
                                previous = this.value;
                                this.allSaved = true;
                                this.active = this.value;
                            }
                            else {
                                this.value = previous;
                            }
                        });
                        this.typecmb.change(() => {
                            let value = this.typecmb.val();
                            this.type = value;
                            switch (value) {
                                case 'Text':
                                    this.fields.find('select').hide();
                                    break;
                                case 'Properties':
                                    this.fields.find('select').show();
                                    break;
                            }
                        });
                        let wcCombo = this.objcmb[0];
                        wcCombo.setValue(this.objectname);
                        if (this.generic === true) {
                            this.typecmb.val("Text");
                            this.typecmb.trigger("change");
                        }
                        this.loadFilter(this.cmb.find('option:selected').data('extvalue'));
                    });
                }
                /**
                 * Hides the properties already selected
                 * @method hideProperties
                 * */
                hideProperties() {
                    let me = $(this);
                    me.find("ul.filterFields.list-group.ui-sortable").children("li").each((i, li) => {
                        me.find(".objtree").find(".prop-filter").each((i, e) => {
                            if ($(e).attr("Property") == $(li).attr("Property") && $(e).attr("ObjectName") == $(li).attr("ObjectName")) {
                                $(e).addClass("hidden");
                                return false;
                            }
                        });
                    });
                }
                /**
                 * Show the hidden properties
                 * @method showProperties
                 * */
                showProperties() {
                    $(this).find(".objtree").find(".prop-filter.hidden").each((i, e) => {
                        $(e).removeClass("hidden");
                    });
                }
                /**
                * Add a new filter
                * @method newFilter
                */
                newFilter() {
                    if (this.allSaved || confirm(flexygo.localization.translate('filtermanager.unsaved'))) {
                        flexygo.msg.prompt('New filter', "Enter new filter's title", (res) => {
                            this.applyNewFilter(res);
                        }, 'new title', '');
                    }
                }
                /**
                * Apply new created filter
                * @method applyNewFilter
                * @param {string} name - The filter name.
                */
                applyNewFilter(name) {
                    if (name != '') {
                        let newVal = 'newValue' + this.newValue;
                        this.newValue++;
                        let opt = $('<option/>').html(name).val(newVal);
                        this.cmb.append(opt);
                        this.fields.empty();
                        this.cmb.val(newVal).trigger("change");
                    }
                }
                /**
                * Delete the filter
                * @method deleteFilter
                */
                deleteFilter() {
                    let success = false;
                    flexygo.msg.confirm('filtermanager.sure', (result) => {
                        if (result) {
                            if (this.cmb.is(':visible') == true && this.cmb.find('option:selected').data('extvalue')) {
                                let id = this.cmb.find('option:selected').data('extvalue').SearchId;
                                if (id.toLowerCase().indexOf('newval') === -1) {
                                    let ent = new flexygo.obj.Entity('sysGenericSearch', "Objects_Search.SearchId='" + id + "'");
                                    if (ent.delete()) {
                                        success = true;
                                    }
                                }
                            }
                            else {
                                //generic search
                                if (this.cmb.is(':visible') == false) {
                                    let objname = this.objcmb.val();
                                    if (objname) {
                                        let ent = new flexygo.obj.Entity('sysGenericSearch', "Objects_Search.ObjectName='" + objname + "' and Objects_Search.Generic<>0");
                                        if (ent.delete()) {
                                            success = true;
                                        }
                                    }
                                }
                                else {
                                    success = true;
                                }
                            }
                            if (success) {
                                this.cmb.find('option:selected').remove();
                                flexygo.msg.success('Deleted :)', null, null);
                                if (this.cmb.find('option:selected').length > 0) {
                                    this.loadFilter(this.cmb.find('option:selected').data('extvalue'));
                                }
                                else {
                                    this.fields.empty();
                                }
                                if (this.parentModule) {
                                    let wcModule = this.parentModule[0];
                                    wcModule.refresh();
                                }
                            }
                        }
                    });
                }
                /**
               * Edit a filter
               * @method editFilter
               */
                editFilter() {
                    flexygo.msg.prompt('Edit filter', "Enter new filter's title", (res) => {
                        if (res != '') {
                            this.cmb.find('option:selected').text(res);
                        }
                    }, 'edit title', this.cmb.find('option:selected').text());
                }
                /**
                * Save a filter
                * @method saveFilter
                */
                saveFilter() {
                    this.allSaved = true;
                    let itms = this.fields.find('li');
                    if (this.generic === false && this.cmb.find('option:selected').length == 0) {
                        flexygo.msg.error(flexygo.localization.translate('filtermanager.errornofilter'), null, null);
                    }
                    else if (itms.length == 0) {
                        flexygo.msg.error(flexygo.localization.translate('filtermanager.errornofields'), null, null);
                    }
                    else {
                        let fils = new Array();
                        let configs = new Array();
                        $.each(itms, (i, e) => {
                            let li = $(e);
                            let ctl = li.data('extvalue');
                            let fil = {
                                ObjectName: ctl.ObjectName,
                                PropertyName: ctl.PropertyName,
                                ObjectPath: ctl.ObjectPath,
                                Size: ctl.Size,
                                Order: i,
                                Label: li.find('input').val(),
                                OriginalLabel: li.find('input').val(),
                                PropertySearchType: li.find('select').val(),
                                Config: null
                            };
                            configs.push(ctl.Config);
                            fils.push(fil);
                        });
                        let searchid = null;
                        let filtername = null;
                        if (this.generic === true) {
                            if (this.genericFilter) {
                                searchid = this.genericFilter.SearchId;
                                filtername = this.genericFilter.Name;
                            }
                            else {
                                searchid = this.cmb.val();
                                filtername = this.cmb.find('option:selected').text();
                            }
                        }
                        else {
                            searchid = this.cmb.val();
                            filtername = this.cmb.find('option:selected').text();
                        }
                        let params = {
                            SearchId: searchid,
                            FilterName: filtername,
                            ObjectName: this.objectname,
                            Type: this.type,
                            Properties: fils,
                            Generic: this.generic
                        };
                        flexygo.ajax.post('~/api/Sys', 'saveFilter', params, (response) => {
                            this.cmb.find('option:selected').val(response);
                            params.Properties = fils;
                            $.each(params.Properties, (i, prop) => {
                                prop.Config = configs[i];
                            });
                            this.cmb.find('option:selected').data('extvalue', params);
                            flexygo.msg.success('Saved :)', null, null);
                            if (this.parentModule) {
                                let wcModule = this.parentModule[0];
                                wcModule.refresh();
                            }
                        });
                    }
                }
                /**
                * Loads a filter
                * @method loadFilter
                * @param {flexygo.api.SearchSettings} filter - The filter search settings.
                */
                loadFilter(filter) {
                    if (this.generic === true) {
                        this.genericFilter = filter;
                    }
                    this.fields.empty();
                    if (filter) {
                        $.each(filter.Properties, (i, e) => {
                            this.fields.append(this.createField(e));
                        });
                        this.fields.sortable({
                            update: (event, ui) => { this.allSaved = false; }
                        });
                        this.typecmb.val(filter.Type).trigger("change");
                        this.hideProperties();
                    }
                }
                /**
               * Loads an object
               * @method loadObj
               * @param {string} objectName - The object name.
               * @param {JQuery} elem - The filter manager layout.
               * @param {boolean} first - first time I entered.
               */
                loadObj(objectName, elem, first) {
                    elem.html("");
                    if (objectName) {
                        let params = {
                            ObjectName: objectName
                        };
                        flexygo.ajax.post('~/api/Sys', 'getRelatedObjetsAndProps', params, (response) => {
                            if (first) {
                                let bitm = $('<li class="list-group-item"></li>');
                                let btn = $('<button class="btn btn-default bg-info"><i class="flx-icon icon-plus" /> ' + flexygo.localization.translate('filtermanager.add') + '</button>');
                                bitm.append(btn);
                                btn.on('click', () => { this.appendFields(); });
                                elem.append(bitm);
                            }
                            for (let key in response.RelatedObjects) {
                                let prop = $('');
                                if (response.RelatedObjects[key].ShowInAnalysis == true) {
                                    prop = $('<li class="list-group-item objectFolder"></li>');
                                    prop.html('<span><i class="flx-icon icon-folder" /> ' + key + '<span>');
                                    prop.data('extvalue', response.RelatedObjects[key]);
                                    prop.addClass('obj-filter');
                                    prop.find('span').on('click', (e) => {
                                        let el = $(e.currentTarget).closest('li');
                                        el.find('i:first').toggleClass('icon-folder').toggleClass('icon-folder-2');
                                        if (el.find('ul').length > 0) {
                                            el.find('ul:first').toggle();
                                        }
                                        else {
                                            let itm = $('<ul class="list-group" />');
                                            this.loadObj(el.data('extvalue').ChildCollection, itm, false);
                                            el.append(itm);
                                        }
                                    });
                                }
                                elem.append(prop);
                            }
                            let itm = $('<li class="list-group-item"></li>');
                            for (let key in response.Properties) {
                                if (response.Properties[key].ControlType != 'separator' && response.Properties[key].ControlType != 'placeholder') {
                                    let obj = $('<div />');
                                    obj.html('<label><input type="checkbox" /> ' + response.Properties[key].OriginalLabel + '</label>');
                                    obj.data('extvalue', response.Properties[key]);
                                    obj.addClass('prop-filter');
                                    obj.attr("ObjectName", response.Properties[key].ObjectName);
                                    obj.attr("Property", response.Properties[key].Name);
                                    itm.append(obj);
                                }
                            }
                            itm.on('click', (ev) => {
                                ev.stopPropagation();
                            });
                            elem.append(itm);
                            //repeat add button at the end
                            let bitm = $('<li class="list-group-item"></li>');
                            let btn = $('<button class="btn btn-default bg-info"><i class="flx-icon icon-plus" /> ' + flexygo.localization.translate('filtermanager.add') + '</button>');
                            bitm.append(btn);
                            btn.on('click', () => { this.appendFields(); });
                            elem.append(bitm);
                            this.hideProperties();
                        });
                    }
                }
                /**
                * Append fields
                * @method appendFields
                */
                appendFields() {
                    let inp = this.tree.find('input:checked');
                    $.each(inp, (i, e) => {
                        let div = $(e).closest('div');
                        let prop = div.data('extvalue');
                        let fld = {
                            ObjectName: prop.ObjectName,
                            PropertyName: prop.Name,
                            Label: prop.Label,
                            OriginalLabel: prop.OriginalLabel,
                            Order: this.fields.find('.filterField').length,
                            PropertySearchType: prop.DefaultSearchType,
                            Type: prop.DefaultSearchType,
                            Config: prop,
                            ObjectPath: this.findPath(div),
                            Size: 2,
                        };
                        let fil = this.createField(fld);
                        fil.hide();
                        this.fields.append(fil);
                        div.addClass("hidden");
                    });
                    this.fields.find('li:not(:visible)').show('250');
                    if (inp.length > 0) {
                        this.allSaved = false;
                    }
                    this.fields.sortable({
                        update: (event, ui) => { this.allSaved = false; }
                    });
                    inp.prop('checked', false);
                }
                createField(fld) {
                    let itm = $('<li class="list-group-item filterField" />');
                    itm.data('extvalue', fld);
                    itm.attr("ObjectName", fld.ObjectName);
                    itm.attr("Property", fld.PropertyName);
                    itm.html('<input class="form-control" type="text" value="' + fld.OriginalLabel + '" />');
                    let cmd = $(' <select class="form-control" />');
                    $.each(this.types, (i, e) => {
                        let tmp = false;
                        let tyCmd = fld.Config.SearchTypes.split('|');
                        $.each(tyCmd, (j, ee) => {
                            if (ee.toLowerCase() === e.PropertySearchType.toLowerCase()) {
                                tmp = true;
                                return false;
                            }
                        });
                        if (tmp) {
                            let opt = $('<option/>').html(e.Descrip).attr('value', e.PropertySearchType);
                            cmd.append(opt);
                        }
                    });
                    cmd.val(fld.Type);
                    if (this.type === 'Text') {
                        cmd.hide();
                    }
                    itm.append(cmd);
                    itm.append(' <span class="comment">(' + flexygo.utils.parser.replaceAll(fld.ObjectPath, '|', ' > ') + ') <i class="flx-icon icon-trash clickable size-l" /></span>');
                    itm.find('.icon-trash').on('click', (e) => {
                        this.allSaved = false;
                        let li = $(e.currentTarget).closest('li');
                        li.hide(250, () => { li.remove(); });
                        $(this).find(".objtree").find(".prop-filter.hidden").each((i, e) => {
                            if ($(e).attr("Property") == $(li).attr("Property") && $(e).attr("ObjectName") == $(li).attr("ObjectName")) {
                                $(e).removeClass("hidden");
                                return false;
                            }
                        });
                    });
                    return itm;
                }
                findPath(obj) {
                    let pathArr = new Array();
                    let parents = obj.parents('li.objectFolder');
                    $.each(parents, (i, e) => {
                        pathArr.unshift($(e).data('extvalue').ObjectName);
                    });
                    pathArr.push(obj.data('extvalue').ObjectName);
                    return pathArr.join('|');
                }
            }
            wc.FlxFilterManagerElement = FlxFilterManagerElement;
        })(wc = ui_1.wc || (ui_1.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-filtermanager', flexygo.ui.wc.FlxFilterManagerElement);
//# sourceMappingURL=flx-filtermanager.js.map