/**
 * @namespace flexygo.ui.wc
 */
var flexygo;
(function (flexygo) {
    var ui;
    (function (ui) {
        var wc;
        (function (wc_1) {
            /**
          * Library for the flx-editgrid web component.
          *
          * @class FlxEditGridElement
          * @constructor
          * @return {FlxEditGridElement} .
          */
            class FlxEditGridElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                   * Set when component is attached to DOM
                   * @property connected {boolean}
                   */
                    this.connected = false;
                    this.tbName = null;
                    this.canDelete = null;
                    this.canInsert = null;
                    this.canUpdate = null;
                    this.canPrint = null;
                    this.sortColumnId = null;
                    this.sortAsc = false;
                    this.filter = null;
                    this.data = null;
                    this.refreshing = null; //Set by FlxGenericSearchElement
                }
                /**
               * Fires when element is attached to DOM
               * @method connectedCallback
               */
                connectedCallback() {
                    let elem = $(this);
                    this.connected = true;
                    let tableName = elem.attr('tablename');
                    if (tableName && tableName != '') {
                        this.load(tableName);
                        elem.html(flexygo.utils.loadingMsg());
                    }
                    else {
                        elem.html('TableName is missing');
                    }
                }
                /**
               * Array of observed attributes.
               * @property observedAttributes {Array}
               */
                static get observedAttributes() {
                    return [];
                }
                /**
              * Fires when the attribute value of the element is changed.
              * @method attributeChangedCallback
              */
                attributeChangedCallback(attrName, oldVal, newVal) {
                    if (!this.connected) {
                        return;
                    }
                }
                /**
                * loads a table and table schema.
                * @method load
                * @param {string} tbName
                */
                load(tbName) {
                    this.tbName = tbName;
                    this.loadSchema();
                }
                /**
               * loads a table schema.
               * @method loadSchema
               */
                loadSchema() {
                    let params = {
                        tablename: this.tbName
                    };
                    flexygo.ajax.post('~/api/MasterTable', 'GetSettings', params, (response) => {
                        this.schema = response.TableFields;
                        this.canDelete = response.canDelete;
                        this.canInsert = response.canInsert;
                        this.canUpdate = response.canUpdate;
                        this.canPrint = response.canPrint;
                        this.loadData();
                    });
                }
                /**
                * loads  table data.
                * @method loadData
                */
                loadData() {
                    //let loadRet = this.loadRet;
                    flexygo.ajax.post('~/api/MasterTable', 'GetTableData', { "tablename": this.tbName }, (response) => {
                        this.loadRet(response);
                    });
                }
                loadRet(rsp) {
                    this.data = rsp;
                    this.refresh();
                }
                /**
               * Selects all elements
               * @method selectAll
               * @param {Element} elm
               */
                selectAll(elm) {
                    $(elm).closest('table').find('tr td:first-child input').prop('checked', true);
                    $(elm).closest('table').find('tr:not(.rowInsert):not(.rowHeader)').addClass('selected');
                    $('#mainFooterMenu')[0].show();
                    this.refreshColMenu($(elm).closest('table'));
                }
                /**
                * Selects a node
                * @method selectNone
                * @param {Element} elm
                */
                selectNone(elm) {
                    $(elm).closest('table').find('tr td:first-child input').prop('checked', false);
                    $(elm).closest('table').find('tr:not(.rowInsert):not(.rowHeader)').removeClass('selected');
                    $('#mainFooterMenu')[0].hide();
                }
                /**
                * Cancel edit mode
                * @method cancelEdit
                * @param {Element} elm
                */
                cancelEdit(elm) {
                    let row = $(elm).closest('tr');
                    row.removeClass('rowEdit');
                    row.find('td:not(:first-child) span').show();
                    row.find('td:not(:first-child) input').remove();
                    row.find('td:not(:first-child) select').remove();
                    this.refreshColMenu($(elm).closest('table'));
                }
                /**
                * Clears insert row
                * @method clearInsert
                * @param {Element} elm
                */
                clearInsert(elm) {
                    let row = $(elm).closest('tr');
                    let cells = row.find('td');
                    for (let i = 1; i < cells.length; i++) {
                        let ctl = $(cells[i]).find('input');
                        if (ctl.length > 0) {
                            if (ctl.attr('checkbox')) {
                                ctl.prop('checked', ctl.attr('default'));
                            }
                            else {
                                ctl.val(ctl.attr('default'));
                            }
                        }
                        else {
                            ctl = $(cells[i]).find('select');
                            ctl.val(ctl.attr('default'));
                        }
                    }
                    row.closest('table').find('.rowInsert input:first').focus();
                    this.refreshColMenu($(elm).closest('table'));
                }
                /**
                * Edits an element
                * @method edit
                * @param {Element} elm
                */
                edit(elm) {
                    let row = $(elm).closest('tr');
                    row.addClass('rowEdit');
                    row.find('td:not(:first-child) span').hide();
                    row.find('td:not(:first-child) input').remove();
                    row.find('td:not(:first-child) select').remove();
                    let cells = row.find('td');
                    for (let i = 1; i < cells.length; i++) {
                        let key = $(elm).closest('table').find('tr th:nth-child(' + (i + 1) + ')').attr('name');
                        let ctl = this.getControl(this.schema[key], $(cells[i]).attr('value'));
                        $(cells[i]).append(ctl);
                        if (i == cells.length - 1) {
                            ctl.on('keydown', (e) => {
                                let keyCode = e.keyCode || e.which;
                                if (keyCode == 9) {
                                    this.update(row.find('td i[class*="save"]')[0], true);
                                }
                            });
                        }
                    }
                    for (let key in this.schema) {
                        this.getControl(this.schema[key]);
                    }
                    this.refreshColMenu($(elm).closest('table'));
                }
                /**
              * Inserts an element
              * @method edit
              * @param {Element} elm
              */
                insert(elm) {
                    let me = $(this);
                    let row = $(elm).closest('tr');
                    let cells = row.find('td');
                    let props = new Array();
                    for (let i = 1; i < cells.length; i++) {
                        let ctl = $(cells[i]).find('input');
                        if (ctl.length == 0) {
                            ctl = $(cells[i]).find('select');
                        }
                        let key = $(elm).closest('table').find('tr th:nth-child(' + (i + 1) + ')').attr('name');
                        let newValue = ctl.val();
                        if (ctl.attr('type') == 'checkbox') {
                            newValue = ctl.prop('checked');
                        }
                        props.push({ key: key, value: newValue });
                    }
                    let params = {
                        tablename: this.tbName,
                        values: props
                    };
                    flexygo.ajax.post('~/api/MasterTable', 'Insert', params, (response) => {
                        let index = this.data.length;
                        this.data[index] = response;
                        let row = this.getRow(response, index);
                        row.hide();
                        me.find('.rowInsert').before(row);
                        row.show(1000);
                        this.clearInsert(elm);
                    });
                }
                /**
                * Updates an element
                * @method update
                * @param {Element} elm
                */
                update(elm, hideMsg) {
                    let row = $(elm).closest('tr');
                    let keys = row.data('keys');
                    let cells = row.find('td');
                    let props = new Array();
                    for (let i = 1; i < cells.length; i++) {
                        let ctl = $(cells[i]).find('input');
                        if (ctl.length == 0) {
                            ctl = $(cells[i]).find('select');
                        }
                        let key = $(elm).closest('table').find('tr th:nth-child(' + (i + 1) + ')').attr('name');
                        let originalValue = $(cells[i]).attr('value');
                        let newValue = ctl.val();
                        if (ctl.attr('type') == 'checkbox') {
                            newValue = ctl.prop('checked');
                        }
                        if (newValue != originalValue) {
                            props.push({ key: key, value: newValue });
                        }
                    }
                    if (props.length == 0) {
                        if (hideMsg) {
                            setTimeout(() => {
                                this.cancelEdit(elm);
                            }, 500);
                        }
                        else {
                            flexygo.msg.alert('No se ha realizado ningún cambio en la linea.');
                        }
                    }
                    else {
                        let params = {
                            tablename: this.tbName,
                            keys: keys,
                            values: props
                        };
                        flexygo.ajax.post('~/api/MasterTable', 'Update', params, (response) => {
                            let oldRow = $(elm).closest('tr');
                            let index = oldRow.data('index');
                            let row = this.getRow(response, index);
                            oldRow.animate({
                                backgroundColor: flexygo.colors.success,
                            }, 700, () => {
                                oldRow.animate({
                                    backgroundColor: "none",
                                }, 700, () => {
                                    oldRow.replaceWith(row);
                                    this.data[index] = response;
                                    this.refreshColMenu($(elm).closest('table'));
                                });
                            });
                        }, (error) => { flexygo.exceptions.httpShow(error, $(elm)); });
                    }
                }
                /**
                * Deletes an element
                * @method delete
                * @param {Element} elm
                * @param {boolean} confirmed
                */
                delete(elm, confirmed) {
                    let resultCallback = (result) => {
                        let keys = $(elm).closest('tr').data('keys');
                        let params = {
                            tablename: this.tbName,
                            keys: keys
                        };
                        flexygo.ajax.post('~/api/MasterTable', 'Delete', params, (response) => {
                            let tr = $(elm).closest('tr');
                            tr.hide(1000, () => {
                                let index = tr.data('index');
                                tr.data[index] = null;
                                tr.remove();
                                this.refreshColMenu($(elm).closest('table'));
                            });
                        });
                    };
                    if (confirmed) {
                        resultCallback.call(this, confirmed);
                    }
                    else {
                        flexygo.msg.confirm(flexygo.localization.translate('flxeditgrid.deleteconfirm'), resultCallback);
                    }
                    //if (confirmed || flexygo.msg.confirm(flexygo.localization.translate('editgrid.deleteconfirm'))) {
                    //    let ctx = this;
                    //    let keys = $(elm).closest('tr').data('keys');
                    //    flexygo.ajax.post('~/api/MasterTable', 'Delete', { "tablename": this.tbName, "keys": keys },
                    //    function (response) {
                    //        $(elm).closest('tr').hide(1000, function () {
                    //            let index = $(this).data('index');
                    //            this.data[index] = null;
                    //            $(this).remove();
                    //            this._refreshColMenu($(elm).closest('table'));
                    //        });
                    //    });
                    //}
                }
                /**
               * Put all elements in edit mode
               * @method editAll
               */
                editAll() {
                    $(this).find('table tr:not(.rowInsert) td:first-child input[type="checkbox"]:checked').each((i, e) => {
                        this.edit(e);
                    });
                }
                /**
                * remove all elements from edit mode
                * @method editAll
                */
                uneditAll() {
                    $(this).find('table tr.rowEdit td:first-child input[type="checkbox"]:checked').each((i, e) => {
                        this.cancelEdit(e);
                    });
                }
                /**
               * Save all elements
               * @method saveAll
               */
                saveAll() {
                    $(this).find('table tr.rowEdit td:first-child input[type="checkbox"]:checked').each((i, e) => {
                        this.update(e, true);
                    });
                }
                /**
                * Delete all elements
                * @method deleteAll
                */
                deleteAll(elm) {
                    let resultCallback = (result) => {
                        if (result) {
                            $(this).find('table tr:not(.rowInsert) td:first-child input[type="checkbox"]:checked').each((i, e) => {
                                this.delete(e, true);
                            });
                        }
                    };
                    flexygo.msg.confirm(flexygo.localization.translate('flxeditgrid.deleteconfirm'), resultCallback);
                    //if (flexygo.msg.confirm(flexygo.localization.translate('editgrid.deleteconfirm'))) {
                    //    let ctx = this;
                    //    me.find('table tr:not(.rowInsert) td:first-child input[type="checkbox"]:checked').each(function (index) { this.delete(this, true) });
                    //}
                }
                /**
               * Refresh webcomponent
               * @method refresh
               */
                refresh() {
                    let nGrid = $('<table data-role="table" class="ui-responsive"><thead/><tbody/><tfoot/></table>');
                    let row = $('<tr class="rowHeader" />');
                    let width = 20;
                    if (this.canUpdate) {
                        width += 20;
                    }
                    if (this.canDelete) {
                        width += 20;
                    }
                    let th = $('<th style="width:' + width + 'px;"/>');
                    let btn;
                    if (this.canInsert) {
                        btn = $('<i class="flx-icon icon-add" title="' + flexygo.localization.translate('flxeditgrid.addrow') + '" />');
                        btn.on('click', (e) => {
                            $(e.currentTarget).closest('table').find('.rowInsert input:first').focus();
                        });
                        th.append(btn);
                    }
                    row.append(th);
                    for (let key in this.schema) {
                        row.append($('<th/>').html(this.schema[key].ColumnDescrip).attr('name', key).on('click', (e) => {
                            this.sort(e.currentTarget);
                        }));
                    }
                    btn = $('<i class="flx-icon icon-bullet-list-2 right" title="' + flexygo.localization.translate('flxeditgrid.removeselection') + '" />');
                    btn.on('click', (e) => {
                        e.stopPropagation();
                        this.selectNone(this);
                    });
                    row.find('th:last').append(btn);
                    btn = $('<i class="flx-icon icon-bullet-list-1 right" title="' + flexygo.localization.translate('flxeditgrid.selectall') + '" />');
                    btn.on('click', (e) => {
                        e.stopPropagation();
                        this.selectAll(this);
                    });
                    row.find('th:last').append(btn);
                    nGrid.find('thead').append(row);
                    for (let i = 0; i < this.data.length; i++) {
                        if (this.data[i]) {
                            nGrid.find('tbody').append(this.getRow(this.data[i], i));
                        }
                    }
                    if (this.canInsert) {
                        nGrid.find('tfoot').append(this.getEditLine());
                    }
                    $(this).html(nGrid);
                }
                /**
             * Starts control rendering.
             * @method render
             */
                render() {
                    this.refresh();
                }
                /**
                * Gets editline content as Jquery.
                * @method getEditLine
                * @return {JQuery}
                */
                getEditLine() {
                    let row = $('<tr class="rowInsert" />');
                    let cellButtons = $('<td/>');
                    let btn;
                    btn = $('<i class="flx-icon icon-save" />');
                    btn.on('click', (e) => {
                        this.insert(e.currentTarget);
                    });
                    cellButtons.append(btn);
                    btn = $('<i class="flx-icon icon-clean-1" />');
                    btn.on('click', (e) => {
                        this.clearInsert(e.currentTarget);
                    });
                    cellButtons.append(btn);
                    row.append(cellButtons);
                    for (let key in this.schema) {
                        row.append($('<td/>').append(this.getControl(this.schema[key], this.schema[key].DefaultValue)));
                    }
                    let ctl = row.find('td:last-child').find('input');
                    if (ctl.length == 0) {
                        ctl = row.find('td:last-child').find('select');
                    }
                    ctl.on('keydown', (e) => {
                        let keyCode = e.keyCode || e.which;
                        if (keyCode == 9) {
                            this.insert(row.find('td i[class*="save"]')[0]);
                            e.preventDefault();
                        }
                    });
                    return row;
                }
                /**
               * Gets data from a given row.
               * @method getRow
               * @param {flexygo.api.mastertables.MasterTablePropertyCollection} dataRow
               * @param {number} index
               * @param {boolean} returnAlways
               */
                getRow(dataRow, index, returnAlways) {
                    let row = $('<tr/>');
                    row.data('index', index);
                    let cellButtons = $('<td>');
                    let btn = $('<input type="checkbox" />');
                    btn.on('click', (e) => {
                        $(e.currentTarget).parents('tr').toggleClass('selected');
                        this.refreshColMenu($(e.currentTarget).closest('table'));
                    });
                    cellButtons.append(btn);
                    if (this.canUpdate) {
                        btn = $('<i class="flx-icon icon-edit" />');
                        btn.on('click', (e) => {
                            this.edit(e.currentTarget);
                        });
                        cellButtons.append(btn);
                    }
                    if (this.canDelete) {
                        btn = $('<i class="flx-icon icon-trash" />');
                        btn.on('click', (e) => {
                            this.delete(e.currentTarget);
                        });
                        cellButtons.append(btn);
                    }
                    btn = $('<i class="flx-icon icon-save" />');
                    btn.on('click', (e) => {
                        this.update(e.currentTarget);
                    });
                    cellButtons.append(btn);
                    btn = $('<i class="flx-icon icon-remove" />');
                    btn.on('click', (e) => {
                        this.cancelEdit(e.currentTarget);
                    });
                    cellButtons.append(btn);
                    row.append(cellButtons);
                    let notExclude = true;
                    if (!returnAlways && this.filter && this.filter != '') {
                        notExclude = false;
                    }
                    let keys = new Array();
                    for (let key in this.schema) {
                        if (this.schema[key].IsKeyField) {
                            keys.push({ key: key, value: dataRow[key] });
                        }
                        if (this.filter && this.filter != '' && String(dataRow[key]).toLocaleLowerCase().indexOf(this.filter.toLocaleLowerCase()) != -1) {
                            notExclude = true;
                        }
                        let value = ((dataRow[key] == null) ? '' : dataRow[key]);
                        let text = this.getText(((dataRow[key] == null) ? '' : dataRow[key]), key);
                        let title = $("<b/>").html(this.schema[key].ColumnName);
                        row.append($('<td/>').attr('value', value).append(title).append(text));
                    }
                    row.data('keys', keys);
                    if (notExclude) {
                        return row;
                    }
                    else {
                        return null;
                    }
                }
                /**
                * Gets a control definition.
                * @method getControl
                * @param  def
                * @param  val
                */
                getControl(def, val) {
                    let key = def.ColumnName;
                    let desc = def.ColumnDescrip;
                    if (def.AutoIncrement) {
                        return $('<input type="text" readonly />').attr('placeholder', desc);
                    }
                    else {
                        if (def.ListValues.length > 0) {
                            let combo = $('<select  />').data('field', key);
                            combo.append($('<option />').val('').html(key));
                            let valueFiled = null;
                            let displayField = null;
                            if (def.ListValues.length > 0) {
                                valueFiled = Object.keys(def.ListValues[0])[0];
                                displayField = Object.keys(def.ListValues[0])[0];
                                if (Object.keys(def.ListValues[0]).length > 1) {
                                    displayField = Object.keys(def.ListValues[0])[1];
                                }
                            }
                            for (let i = 0; i < def.ListValues.length; i++) {
                                combo.append($('<option />').val(def.ListValues[i][valueFiled]).html(def.ListValues[i][displayField]));
                            }
                            if (val != null) {
                                combo.val(val);
                                combo.attr('default', val);
                            }
                            else {
                                combo.attr('default', '');
                            }
                            return combo;
                        }
                        else {
                            let input = $('<input />').data('field', key);
                            input.data('keyField', def.IsKeyField);
                            input.attr('placeholder', desc);
                            if (def.MaxLength && def.MaxLength != -1) {
                                input.attr('maxlength', def.MaxLength);
                            }
                            if (def.ReadOnly) {
                                input.prop('readonly', true);
                            }
                            switch (def.DataType.toLocaleLowerCase()) {
                                case 'system.int16':
                                case 'system.int32':
                                    input.attr('type', 'number');
                                    break;
                                case 'system.double':
                                    input.attr('type', 'number');
                                    input.attr('step', '0.01');
                                    break;
                                case 'system.boolean':
                                case 'system.byte':
                                    input.attr('type', 'checkbox');
                                    break;
                                case 'system.datetime':
                                    input.attr('type', 'date');
                                    break;
                                default:
                                    input.attr('type', 'text');
                                    break;
                            }
                            if (val != null) {
                                if (input.attr('type') == 'checkbox') {
                                    if (val && val != "false") {
                                        input.prop('checked', true);
                                        input.attr('default', 'true');
                                    }
                                }
                                else {
                                    input.val(val);
                                    input.attr('default', val);
                                }
                            }
                            else {
                                input.attr('default', '');
                            }
                            return input;
                        }
                    }
                }
                /**
                * Gets a text control based on value and property.
                * @method getText
                * @param  value
                * @param  prop
                */
                getText(value, prop) {
                    let def = this.schema[prop];
                    let text = $('<span>');
                    if (value != null) {
                        if (def.ListValues.length > 0 && Object.keys(def.ListValues[0]).length > 1) {
                            for (let i = 0; i < def.ListValues.length; i++) {
                                if (value == def.ListValues[i][Object.keys(def.ListValues[0])[0]]) {
                                    text.html(def.ListValues[i][Object.keys(def.ListValues[0])[1]]);
                                    break;
                                }
                            }
                            if (text.html() == '') {
                                text.html(value);
                            }
                        }
                        else {
                            switch (def.DataType.toLocaleLowerCase()) {
                                case 'system.int16':
                                case 'system.int32':
                                    text.html(flexygo.utils.parser.formatNumber(value));
                                    break;
                                case 'system.double':
                                    text.html(flexygo.utils.parser.formatDecimal(value));
                                    break;
                                case 'system.boolean':
                                case 'system.byte':
                                    if (value.toString() == 'true') {
                                        text.html('<i class="flx-icon icon-checked"></i>');
                                    }
                                    else {
                                        text.html('<i class="flx-icon icon-non-check-2"></i>');
                                    }
                                    break;
                                case 'system.datetime':
                                    text.html(flexygo.utils.parser.formatDate(value));
                                    break;
                                default:
                                    text.html(value);
                                    break;
                            }
                        }
                    }
                    return text;
                }
                refreshColMenu(tbl) {
                    let me = $(this);
                    //delete
                    if (me.find('table tr:not(.rowInsert) td:first-child input[type="checkbox"]:checked').length == 0) {
                        $('#mainFooterMenu i.icon-trash').parent().hide();
                    }
                    else {
                        $('#mainFooterMenu i.icon-trash').parent().show();
                    }
                    //save & unedit
                    if (me.find('table tr.rowEdit td:first-child input[type="checkbox"]:checked').length == 0) {
                        $('#mainFooterMenu i.icon-save').parent().hide();
                        $('#mainFooterMenu i.icon-remove').parent().hide();
                    }
                    else {
                        $('#mainFooterMenu i.icon-save').parent().show();
                        $('#mainFooterMenu i.icon-remove').parent().show();
                    }
                    //edit
                    if (me.find('table tr:not(.rowInsert):not(.rowEdit) td:first-child input[type="checkbox"]:checked').length == 0) {
                        $('#mainFooterMenu i.icon-edit').parent().hide();
                    }
                    else {
                        $('#mainFooterMenu i.icon-edit').parent().show();
                    }
                    if (!this.canUpdate) {
                        $('#mainFooterMenu i.icon-edit').parent().hide();
                        $('#mainFooterMenu i.icon-save').parent().hide();
                        $('#mainFooterMenu i.icon-remove').parent().hide();
                    }
                    if (!this.canDelete) {
                        $('#mainFooterMenu i.icon-trash').parent().hide();
                    }
                    let menu = $('#mainFooterMenu');
                    let wc = menu[0];
                    if (tbl && $(tbl).find('tr td:first-child input:checked').length == 0) {
                        if (menu.is(':visible')) {
                            wc.hide();
                        }
                    }
                    else {
                        if (menu.is(':hidden')) {
                            wc.show();
                        }
                    }
                }
                /**
              * Sort based on column in asc or desc mode.
              * @method sort
              * @param  {Element} columnItem
              * @param  {boolean} ascMode
              */
                sort(columnItem, ascMode) {
                    let me = $(this);
                    let columnId = me.find('thead tr.rowHeader th').index(columnItem);
                    if (ascMode) {
                        this.sortAsc = ascMode;
                    }
                    else {
                        if (this.sortColumnId == columnId) {
                            this.sortAsc = !this.sortAsc;
                        }
                        else {
                            this.sortAsc = true;
                        }
                    }
                    this.sortColumnId = columnId;
                    let rows = me.find('tbody tr:not(.rowHeader):not(.rowInsert)').get();
                    rows.sort((a, b) => {
                        let A = $(a).children('td').eq(this.sortColumnId).find('span').text().toUpperCase();
                        let B = $(b).children('td').eq(this.sortColumnId).find('span').text().toUpperCase();
                        if ($.isNumeric(A) && $.isNumeric(B)) {
                            A = parseFloat(A);
                            B = parseFloat(B);
                        }
                        if (A < B) {
                            return this.sortAsc ? -1 : 1;
                        }
                        if (A > B) {
                            return this.sortAsc ? 1 : -1;
                        }
                        return 0;
                    });
                    $.each(rows, (index, row) => {
                        me.find('table tbody').append(row);
                    });
                    me.find('table tbody').append(me.find('tbody tr.rowInsert').get());
                    me.find('.sortAsc, .sortDsc').removeClass('sortAsc').removeClass('sortDsc');
                    if (this.sortAsc) {
                        $(columnItem).addClass('sortAsc');
                    }
                    else {
                        $(columnItem).addClass('sortDsc');
                    }
                }
            }
            wc_1.FlxEditGridElement = FlxEditGridElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-editgrid', flexygo.ui.wc.FlxEditGridElement);
//# sourceMappingURL=flx-editgrid.js.map