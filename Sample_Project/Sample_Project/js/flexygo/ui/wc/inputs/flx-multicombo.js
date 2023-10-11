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
            * Library for the FlxMultiComboElement web component.
            *
            * @class FlxMultiComboElement
            * @constructor
            * @return {FlxMultiComboElement}
            */
            class FlxMultiComboElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                    * Set when component is attached to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                    this.type = 'multicombo';
                    this.options = null;
                    this.mode = 'object';
                    this.property = null;
                    this.open = true;
                    this.page = 0;
                    this.mobileInput = null;
                    this.additionalWhere = null;
                    this.cnnString = null;
                    this.separator = "|";
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = $(this);
                    let propName = element.attr('property');
                    if (propName && flexygo.utils.isBlank(this.options)) {
                        let parentCtl = element.closest('flx-edit, flx-filter,flx-propertymanager, flx-view, flx-list');
                        if (parentCtl && parentCtl.length > 0) {
                            let wcParent = parentCtl[0];
                            if (parentCtl.is('flx-filter')) {
                                let objName = element.attr('object');
                                this.options = jQuery.extend(true, {}, wcParent.properties[objName + '-' + propName]);
                            }
                            else {
                                this.options = jQuery.extend(true, {}, wcParent.properties[propName]);
                            }
                            if (parentCtl && wcParent.mode) {
                                this.mode = wcParent.mode;
                            }
                        }
                        this.property = propName;
                    }
                    let ObjectName = element.attr('ObjectName');
                    if (ObjectName && ObjectName != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.ObjectName = ObjectName;
                    }
                    let ViewName = element.attr('ViewName');
                    if (ViewName && ViewName != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.ViewName = ViewName;
                    }
                    let SQLValueField = element.attr('SQLValueField');
                    if (SQLValueField && SQLValueField != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.SQLValueField = SQLValueField;
                    }
                    let SQLDisplayField = element.attr('SQLDisplayField');
                    if (SQLDisplayField && SQLDisplayField != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.SQLDisplayField = SQLDisplayField;
                    }
                    if (typeof element.attr('Required') != 'undefined') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IsRequired = true;
                    }
                    if (typeof element.attr('Disabled') != 'undefined') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Locked = true;
                    }
                    let RequiredMessage = element.attr('RequiredMessage');
                    if (RequiredMessage && RequiredMessage != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IsRequiredMessage = RequiredMessage;
                    }
                    let Style = element.attr('Style');
                    if (Style && Style != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Style = Style;
                        element.attr('Control-Style', this.options.Style);
                        element.attr('Style', '');
                    }
                    let Class = element.attr('Class');
                    if (Class && Class != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.CssClass = Class;
                        element.attr('Control-Class', this.options.CssClass);
                        element.attr('Class', '');
                    }
                    let PlaceHolder = element.attr('PlaceHolder');
                    if (PlaceHolder && PlaceHolder != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.PlaceHolder = PlaceHolder;
                    }
                    let IconClass = element.attr('IconClass');
                    if (IconClass && IconClass != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IconClass = IconClass;
                    }
                    let Template = element.find('Template');
                    if (Template.length > 0 && Template.html() != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Template = Template.html();
                        Template.remove();
                    }
                    let HelpId = element.attr('HelpId');
                    if (HelpId && HelpId != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.HelpId = HelpId;
                    }
                    let ctlClass = element.attr('Control-Class');
                    if (ctlClass && ctlClass != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.CssClass = ctlClass;
                    }
                    let ctlStyle = element.attr('Control-Style');
                    if (ctlStyle && ctlStyle != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Style = ctlStyle;
                    }
                    let additionalWhere = element.attr('additionalwhere');
                    if (additionalWhere && additionalWhere !== '') {
                        this.additionalWhere = additionalWhere;
                    }
                    let SQLFilter = element.attr('SQLFilter');
                    if (SQLFilter && SQLFilter !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.SQLFilter = SQLFilter;
                    }
                    let PageSize = element.attr('PageSize');
                    if (PageSize && PageSize !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.PageSize = Number(PageSize);
                    }
                    let cnnString = element.attr('CnnString');
                    if (cnnString && cnnString !== '') {
                        this.cnnString = cnnString;
                    }
                    this.separator = (this.options.Separator ? this.options.Separator : "|");
                    this.init();
                    let Value = element.attr('Value');
                    let Text = element.attr('Text');
                    if (Value && Value != '') {
                        //this.setValue(Value,Text);
                        this.setValue(Value, Text);
                    }
                    this.connected = true;
                }
                disconnectedCallback() {
                    let element = $(this);
                    element.empty();
                    if (this.options && this.options.Template) {
                        element.html('<template/>');
                        element.find('template').html(this.options.Template);
                    }
                }
                /**
                * Fires when the attribute value of the element is changed.
                * @method attributeChangedCallback
                */
                attributeChangedCallback(attrName, oldVal, newVal) {
                    let element = $(this);
                    if (!this.connected) {
                        return;
                    }
                    if (attrName.toLowerCase() == 'type' && newVal && newVal != '') {
                        this.type = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() == 'property' && newVal && newVal != '') {
                        let propName = newVal;
                        let parentCtl = element.closest('flx-edit, flx-filter,flx-propertymanager,flx-view,flx-list');
                        if (parentCtl && parentCtl.length > 0) {
                            let wcParent = parentCtl[0];
                            if (parentCtl.is('flx-filter')) {
                                let objName = element.attr('object');
                                this.options = jQuery.extend(true, {}, wcParent.properties[objName + '-' + propName]);
                            }
                            else {
                                this.options = jQuery.extend(true, {}, wcParent.properties[propName]);
                            }
                        }
                        this.property = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() == 'objectname' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.ObjectName = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() == 'viewname' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.ViewName = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() == 'sqlvaluefield' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.SQLValueField = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() == 'sqldisplayfield' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.SQLDisplayField = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() == 'required') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        if (typeof element.attr('required') != 'undefined') {
                            this.options.IsRequired = true;
                        }
                        else {
                            this.options.IsRequired = false;
                        }
                        element.find('div:not(.bootstrap-tagsinput)>input').prop('required', this.options.IsRequired);
                    }
                    if (attrName.toLowerCase() == 'disabled') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        if (typeof element.attr('disabled') != 'undefined') {
                            this.options.Locked = true;
                        }
                        else {
                            this.options.Locked = false;
                        }
                        element.find('input').prop('disabled', this.options.Locked);
                        if (this.options.Locked) {
                            if (!element.attr('disabled'))
                                element.attr('disabled', 'true');
                        }
                        else {
                            if (element.attr('disabled'))
                                element.attr('disabled', 'false');
                        }
                    }
                    if (attrName.toLowerCase() == 'requiredmessage' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IsRequiredMessage = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() == 'style' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Style = newVal;
                        if (element.attr('Control-Style') !== this.options.Style) {
                            element.attr('Control-Style', this.options.Style);
                            element.attr('Style', '');
                            this.refresh();
                        }
                    }
                    if (attrName.toLowerCase() == 'class' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.CssClass = newVal;
                        if (element.attr('Control-Class') !== this.options.CssClass) {
                            element.attr('Control-Class', this.options.CssClass);
                            element.attr('Class', '');
                            this.refresh();
                        }
                    }
                    if (attrName.toLowerCase() == 'placeholder' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.PlaceHolder = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() == 'iconclass' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.IconClass = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() == 'template' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.Template = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() == 'helpid' && newVal && newVal != '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.HelpId = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'additionalwhere' && newVal) {
                        this.additionalWhere = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'sqlfilter' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.SQLFilter = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'pagesize' && newVal && newVal !== '') {
                        if (!this.options) {
                            this.options = new flexygo.api.ObjectProperty();
                        }
                        this.options.PageSize = newVal;
                        this.refresh();
                    }
                    if (attrName.toLowerCase() === 'cnnstring' && newVal && newVal !== '') {
                        this.cnnString = newVal;
                        this.refresh();
                    }
                }
                refresh() {
                    let val = this.getValue();
                    let txt = $(this).attr('Text');
                    this.init();
                    if (val && val != "") {
                        this.setValue(val, txt);
                    }
                }
                init() {
                    if (this.options) {
                        let me = $(this);
                        let parentCtl = $(this).closest('flx-view');
                        let viewMode = parentCtl.length > 0;
                        let iconsLeft;
                        let iconsRight = this.getIconButtons();
                        let control = $('<div class="input-group" style="width:100%">');
                        let container = $('<input firstControl type="text" class="form-control" style="width: 100%" readonly />');
                        let inputli = $('<li class="search"></li>');
                        let input = $('<input type="search" class="search form-control" autocomplete="off" />');
                        let datalist = $('<ul style="display:none" class="comboOptions" />');
                        if (flexygo.utils.isSizeMobile() || flexygo.utils.isTactilModeActive()) {
                            datalist.addClass('mobile');
                            let mobileInputDiv = $('<div class="mobileinputdiv input-group"/>').appendTo(datalist);
                            this.mobileInput = $('<input type="text" class="form-control mobileinput" style="width: 100%" readonly />').appendTo(mobileInputDiv);
                            this.mobileInput.tagsinput({ freeInput: false, itemValue: 'value', itemText: 'text', separator: this.separator });
                            $(`<label class="cleared input-group-btn">
                         <label class="clickable margin-right-l">
                           <i title="${flexygo.localization.translate('sortmanager.clean')}" class="flx-icon icon-arrow-2 flx-icon icon-close-11" />
                         </label>
                        </label>`).appendTo(mobileInputDiv);
                            $(`<label class="closed input-group-btn">
                         <label class="btn">
                           <i title="${flexygo.localization.translate('msg.confirm')}" class="flx-icon icon-checked" />
                         </label>
                        </label>`).appendTo(mobileInputDiv);
                        }
                        this.input = input;
                        this.datalist = datalist;
                        this.container = container;
                        if (!viewMode) {
                            this.datalist.off('scroll.multicombo').on('scroll.multicombo', (e) => {
                                if (this.datalist[0].offsetHeight + this.datalist[0].scrollTop >= this.datalist[0].scrollHeight) {
                                    this.loadValues(this.page + 1, false, null, true);
                                }
                            });
                            input.on('focus', (e) => {
                                this.showOptions();
                            });
                            if (!this.mobileInput) {
                                input.on('blur', (e) => {
                                    this.hideOptions();
                                    //Quitamos la clase selected al hacer click fuera del multicombo
                                    let itm = this.datalist.children('.selected');
                                    itm.removeClass('selected');
                                    //Limpiamos el search
                                    $(e.target.closest('ul')).find('li input').val('');
                                    this.loadValues(0);
                                });
                            }
                            else {
                                this.datalist.find('label.closed').on('click', (e) => {
                                    this.hideOptions();
                                });
                            }
                            if (!flexygo.utils.isSizeMobile() || !flexygo.utils.isTactilModeActive()) {
                                $('#mainContent, main.pageContainer').on('scroll.multicombo', (e) => {
                                    this.hideOptions();
                                });
                            }
                            input.on('keydown', (e) => {
                                if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'Enter' && e.key !== 'Tab') {
                                    this.loadValues(0);
                                    this.showOptions();
                                }
                            });
                            input.on('keyup', (e) => {
                                if (e.key === 'ArrowDown') {
                                    if (this.open) {
                                        if (this.datalist.children('li').length > 0) {
                                            if (this.datalist.children('.selected').length == 0) {
                                                this.datalist.find('li').not('.search').first().addClass('selected');
                                            }
                                            else {
                                                let itm = this.datalist.children('.selected');
                                                let nxtItm = itm.next();
                                                if (nxtItm.length === 0) {
                                                    nxtItm = this.datalist.find('li').not('.search').first().addClass('selected');
                                                }
                                                itm.removeClass('selected');
                                                nxtItm.addClass('selected');
                                            }
                                        }
                                    }
                                    else {
                                        this.showOptions();
                                    }
                                    e.stopPropagation();
                                    e.preventDefault();
                                    return false;
                                }
                                if (e.key === 'ArrowUp') {
                                    if (this.open) {
                                        if (this.datalist.children('li').length > 0) {
                                            if (this.datalist.children('.selected').length == 0) {
                                                this.datalist.find('li').not('.search').last().addClass('selected');
                                            }
                                            else {
                                                let itm = this.datalist.children('.selected');
                                                let prevItm = itm.prev(':not(.search)');
                                                if (prevItm.length === 0) {
                                                    prevItm = this.datalist.find('li').not('.search').last().addClass('selected');
                                                }
                                                itm.removeClass('selected');
                                                prevItm.addClass('selected');
                                            }
                                        }
                                    }
                                    else {
                                        this.showOptions();
                                    }
                                    e.stopPropagation();
                                    e.preventDefault();
                                    return false;
                                }
                                if (e.key === 'Enter' || e.key === 'Tab') {
                                    if (!this.open)
                                        return false;
                                    let tags = this.getValue().split(this.separator);
                                    let listInput = this.datalist.find('li input');
                                    let selectedLi = this.datalist.find('li.selected');
                                    let listValues = this.datalist.find('li:not(.search)');
                                    if (selectedLi.length > 0) {
                                        selectedLi.trigger("mousedown");
                                    }
                                    //Si el input est� vac�o Y no hay valor seleccionado Y (hay m�s de un resulatado O el resultado que hay ya ha sido a�adido) debe filtrar
                                    if (listInput.val() === '' && selectedLi.length === 0 && (listValues.length > 1 || (listValues.length === 1 && tags.indexOf(listValues.attr('data-value')) !== -1))) {
                                        return;
                                    }
                                    //Si el valor ya ha sido a�adido se filtrar�
                                    if (tags.indexOf(selectedLi.attr('data-value')) !== -1) {
                                        return;
                                    }
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                    }
                                    //Si solo queda un valor (ya se ha comprobado previamente que es nuevo) limpiamos el input de b�squeda
                                    if (listValues.length == 1) {
                                        this.addValue(listValues.attr('data-value'), listValues.attr('data-text'));
                                        listInput.val('');
                                        this.loadValues(0);
                                        this.showOptions();
                                    }
                                    return;
                                }
                                this.loadValues(0);
                                this.showOptions();
                            }).off('change').on('change', (e) => {
                                me.attr('value', this.getValue());
                                e.stopPropagation();
                                e.preventDefault();
                            });
                            inputli.append(input);
                            this.datalist.append(inputli);
                        }
                        if (this.options.IconClass && this.options.IconClass != '') {
                            iconsLeft = $('<span class="input-group-addon" ><i class="' + this.options.IconClass + '" /></span>');
                        }
                        if (iconsLeft || iconsRight) {
                            control.addClass("input-group");
                        }
                        if (iconsLeft) {
                            control.append(iconsLeft);
                        }
                        control.append(container);
                        if (!viewMode && !this.options.Locked) {
                            $(`<label class="cleared input-group-btn">
                            <label class="clickable margin-0">
                            <i title="${flexygo.localization.translate('sortmanager.clean')}" class="flx-icon icon-arrow-2 flx-icon icon-close-11" />
                            </label>
                        </label>`).appendTo(control);
                        }
                        if (iconsRight) {
                            control.append(iconsRight);
                        }
                        control.append(datalist);
                        if (!viewMode && !this.options.Locked) {
                            control.find('label.cleared > label.clickable').on('click', (e) => {
                                let oldValue = this.getValue();
                                if (!$(this).attr('disabled')) {
                                    me.attr('value', '');
                                    me.attr('text', '');
                                    this.container.tagsinput('removeAll');
                                    if (this.mobileInput)
                                        this.mobileInput.tagsinput('removeAll');
                                    if (oldValue !== '')
                                        this.triggerDependencies();
                                    me.find('.bootstrap-tagsinput input').attr('placeholder', this.options.PlaceHolder);
                                }
                            });
                        }
                        me.html(control);
                        me.append(datalist);
                        this.setOptions();
                        //this.loadValues(0);
                        if (!viewMode) {
                            if (this.options && this.options.DropDownValues && this.options && this.options.DropDownValues.length > 0) {
                                this.addComboItems(this.options.DropDownValues);
                            }
                            else {
                                this.loadValues(0);
                            }
                        }
                        this.container.tagsinput({ freeInput: false, itemValue: 'value', itemText: 'text', separator: this.separator });
                        if (this.mobileInput) {
                            this.container.on('itemAdded', (event) => {
                                if (event.item) {
                                    this.mobileInput.tagsinput('add', { "value": event.item.value, "text": event.item.text });
                                }
                            });
                            this.container.on('itemRemoved', (event) => {
                                if (event.item) {
                                    this.mobileInput.tagsinput('remove', { "value": event.item.value, "text": event.item.text });
                                    if (this.container.tagsinput('items').length === 0) {
                                        me.find('.bootstrap-tagsinput input').attr('placeholder', this.options.PlaceHolder);
                                    }
                                }
                            });
                            this.mobileInput.on('itemRemoved', (event) => {
                                if (event.item) {
                                    this.container.tagsinput('remove', { "value": event.item.value, "text": event.item.text });
                                }
                            });
                        }
                        if (!viewMode) {
                            this.container.on('itemRemoved', (event) => {
                                if (event.item) {
                                    this.triggerDependencies();
                                    if (this.container.tagsinput('items').length === 0) {
                                        me.find('.bootstrap-tagsinput input').attr('placeholder', this.options.PlaceHolder);
                                    }
                                    me.attr('value', this.getValue());
                                    me.attr('text', this.getText());
                                }
                            });
                            me.find('.bootstrap-tagsinput').on('click', (e) => {
                                this.showOptions();
                                this.input.focus().select();
                            });
                            me.find('.bootstrap-tagsinput > input').on('keyup', (e) => {
                                this.showOptions();
                                this.input.focus().select();
                            });
                        }
                    }
                }
                showOptions() {
                    let me = $(this);
                    if (!this.datalist.is(':visible') && !this.input.prop('disabled')) {
                        if (!this.mobileInput) {
                            let ubicElement = me.find('.bootstrap-tagsinput');
                            let parent = me.find('.input-group');
                            parent.addClass('opened');
                            let winHeight;
                            let dialogTop;
                            let headerHeight;
                            //let padBottom: string = me.find('.input-group').first().css('padding-bottom');
                            if (!me.closest('div.ui-dialog').length) {
                                winHeight = $(window).height();
                                dialogTop = 0;
                                headerHeight = $('#mainMenu').height() + 7;
                            }
                            else {
                                winHeight = me.closest('div.ui-dialog').height();
                                dialogTop = me.closest('div.ui-dialog').offset().top;
                                headerHeight = $('div.ui-dialog-titlebar').height() + 7;
                            }
                            if (parseInt((ubicElement.offset().top - dialogTop + this.input.outerHeight() / 2 - headerHeight / 2).toFixed()) > parseInt((winHeight / 2).toFixed())) {
                                if (dialogTop == 0) {
                                    this.datalist.css({ position: 'fixed', 'margin-top': 5, top: 'auto', bottom: (winHeight - ubicElement.offset().top), width: parseInt((me.children('div').width()).toFixed()), 'max-height': parseInt((ubicElement.offset().top - headerHeight).toFixed()), 'box-shadow': '0 -6px 20px 4px rgba(0, 0, 0, 0.15), 0 -2px 10px 0px rgba(0, 0, 0, 0.20)' });
                                }
                                else {
                                    this.datalist.css({ position: 'fixed', 'margin-top': 5, top: 'auto', bottom: (winHeight - (ubicElement.offset().top - dialogTop - headerHeight - 10)), width: parseInt((me.children('div').width()).toFixed()), 'max-height': parseInt((ubicElement.offset().top - headerHeight).toFixed()), 'box-shadow': '0 -6px 20px 4px rgba(0, 0, 0, 0.15), 0 -2px 10px 0px rgba(0, 0, 0, 0.20)' });
                                }
                            }
                            else {
                                this.datalist.css({ position: 'fixed', 'margin-top': 5, bottom: 'auto', top: (ubicElement.offset().top + ubicElement.outerHeight() - $(window).scrollTop()), width: parseInt((me.children('div').width()).toFixed()), 'max-height': parseInt((winHeight - (ubicElement.offset().top - dialogTop) - 60).toFixed()), 'box-shadow': '0 6px 20px 4px rgba(0, 0, 0, 0.15), 0 2px 10px 0px rgba(0, 0, 0, 0.20)' });
                            }
                            this.datalist.slideDown(250);
                        }
                        else {
                            this.datalist.css({ position: 'fixed', 'margin-top': 5, top: 3, left: 5, width: "calc(100% - 10px)", 'max-height': (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) ? '48%' : (flexygo.utils.isTactilModeActive ? '50%' : '98%'), 'padding-top': 30 });
                            me.append('<div class="mobilebackground"/>');
                            this.datalist.fadeIn(250);
                            me.find('.mobileinputdiv .bootstrap-tagsinput input').hide();
                        }
                    }
                }
                hideOptions() {
                    let me = $(this);
                    if (this.datalist.is(':visible')) {
                        if (!this.mobileInput) {
                            let parent = me.find('.input-group');
                            parent.removeClass('opened');
                            this.datalist.slideUp(250);
                            //this.datalist.css({ position: "static" });
                        }
                        else {
                            this.datalist.fadeOut(250);
                            $(this).find('div.mobilebackground').remove();
                        }
                    }
                    //Quitas la clase selecionado de el elemento que acabas de agregar
                    this.datalist.find('.selected').removeClass('selected');
                }
                loadValues(page, fromvalue, value, append) {
                    let params;
                    let method;
                    this.page = page;
                    if (this.options.ViewName && this.options.ViewName != '') {
                        params = {
                            "ObjectName": this.options.ObjectName,
                            "ViewName": this.options.ViewName,
                            "DisplayField": this.options.SQLDisplayField,
                            "Value": this.input.val(),
                            "Page": page,
                            "PageSize": this.options.PageSize,
                            "AdditionalWhere": this.additionalWhere,
                            "SQLFilter": this.options.SQLFilter,
                            "CnnString": this.cnnString
                        };
                        method = 'GetComboDataView';
                    }
                    else if (this.options.SQLEditSentence || this.options.SQLSentence) {
                        if (fromvalue === true) {
                            params = {
                                Mode: this.mode,
                                ObjectName: this.options.ProcessName || this.options.ReportName || this.options.ObjectName,
                                PropertyName: this.options.Name,
                                CryptedSql: this.options.SQLEditSentence || this.options.SQLSentence,
                                CryptedFilter: this.options.SQLFilter,
                                Value: value,
                                Page: page,
                                //"PageSize": this.options.PageSize,                   
                                AdditionalWhere: this.additionalWhere
                            };
                            method = 'GetComboText';
                        }
                        else {
                            params = {
                                "Mode": this.mode,
                                "ObjectName": this.options.ProcessName || this.options.ReportName || this.options.ObjectName,
                                "PropertyName": this.options.Name,
                                "CryptedSql": this.options.SQLSentence,
                                "CryptedFilter": this.options.SQLFilter,
                                "Value": this.input.val(),
                                "Page": page,
                                "PageSize": this.options.PageSize,
                                "AdditionalWhere": this.additionalWhere
                            };
                            method = 'GetComboData';
                        }
                    }
                    flexygo.ajax.syncPost('~/api/Edit', method, params, (response) => {
                        if (response) {
                            this.addComboItems(response, append);
                        }
                    });
                }
                addComboItems(data, append) {
                    if (append) {
                        this.datalist.find('> div.load-more').remove();
                    }
                    else {
                        this.datalist.find('li:not(.search)').remove();
                        this.datalist.find('> div.load-more').remove();
                    }
                    if (data) {
                        for (let i = 0; i < data.length; i++) {
                            let elm;
                            if (this.options.Template && this.options.Template !== '') {
                                elm = this.getListItem(data[i][this.options.SQLValueField], data[i][this.options.SQLDisplayField], flexygo.utils.parser.recursiveCompile(data[i], this.options.Template, this));
                            }
                            else {
                                elm = this.getListItem(data[i][this.options.SQLValueField], data[i][this.options.SQLDisplayField], data[i][this.options.SQLDisplayField]);
                            }
                            //if (this.datalist.find('[data-value="' + elm.attr("data-value") + '"]').length == 0) {
                            this.datalist.append(elm);
                            //}
                        }
                        if (this.datalist.find(' > li').length >= (this.options.PageSize || flexygo.profiles.defaultDropDownRows) && data.length > 0) {
                            this.datalist.append(`<div class="load-more txt-muted clickable"><span>${flexygo.localization.translate('flxedit.loadmore')}</span><i class="fa fa-angle-down"></div>`);
                            $('.load-more').on('mousedown.load-more', (e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                if (this.datalist[0].offsetHeight <= this.datalist[0].scrollHeight) {
                                    this.loadValues(this.page + 1, false, null, true);
                                }
                            });
                        }
                    }
                }
                getListItem(value, text, template) {
                    let me = $(this);
                    if (!text && text != '0') {
                        text = value;
                    }
                    if (!template) {
                        template = text;
                    }
                    return $('<li/>').html(template).attr('data-value', value).attr('data-text', text).on('mousedown', (e) => {
                        this.addValue($(e.currentTarget).attr('data-value'), $(e.currentTarget).attr('data-text'));
                        if (!this.mobileInput) {
                            let ubicElement = me.find('.bootstrap-tagsinput');
                            let winHeight = $(window).height();
                            if ((ubicElement.offset().top + this.datalist.outerHeight()) > winHeight) {
                                this.datalist.css({ position: "fixed", top: "auto", bottom: (winHeight - ubicElement.offset().top + $(window).scrollTop() - 10) });
                            }
                            else {
                                this.datalist.css({ position: "fixed", bottom: "auto", top: (ubicElement.offset().top + ubicElement.outerHeight() - $(window).scrollTop()) });
                            }
                        }
                        e.stopPropagation();
                        e.preventDefault();
                        return false;
                    });
                }
                addValue(value, text) {
                    let me = $(this);
                    if (typeof text == 'undefined' || typeof text == null) {
                        text = value;
                    }
                    this.container.tagsinput('add', { "value": value, "text": text });
                    me.find('.bootstrap-tagsinput input').attr('placeholder', '');
                    me.attr('value', this.getValue());
                    me.attr('text', this.getText());
                    this.triggerDependencies();
                    if (flexygo.utils.isTactilModeActive()) {
                        me.find('.tag.label.label-info').attr('data-role', 'remove');
                    }
                }
                getIconButtons() {
                    let me = $(this);
                    let ret = $('<div class="input-group-btn" />');
                    let editCtl = me.closest('flx-edit, flx-list, flx-filter')[0];
                    if (this.options && (this.options.SearchCollection || this.options.SearchFunction) && !this.options.Locked) {
                        let icon1 = $('<button class="btn btn-default" type="button"><i class="flx-icon icon-search" /></button>').on('click', (e) => {
                            if (this.options.SearchFunction) {
                                flexygo.utils.execDynamicCode.call(this, editCtl.parseEditString(this.options.SearchFunction, editCtl, this));
                            }
                            if (this.options.SearchCollection && this.options.SearchCollection != '') {
                                flexygo.events.on(this, "entity", "selected", (e) => {
                                    flexygo.events.off(this, "entity", "selected");
                                    let entity = e.sender;
                                    let config = entity.getConfig();
                                    let value = ((flexygo.utils.isBlank(this.options.SearchReturnFields)) ? entity.data[config.KeyFields[0]].Value : entity.data[this.options.SearchReturnFields].Value).toString();
                                    this.loadValues(0, true, value);
                                    this.setValue(value);
                                    this.triggerDependencies();
                                    $(document).find('flx-search[objectname="' + this.options.SearchCollection + '"]').closest(".ui-dialog").remove();
                                });
                                flexygo.nav.openPage('search', editCtl.parseEditString(this.options.SearchCollection, editCtl, this), editCtl.parseEditString(this.options.SearchWhere, editCtl, this), null, 'modal');
                            }
                        });
                        ret.append(icon1);
                    }
                    if (this.options && this.options.ObjNameLink && this.options.ObjWhereLink) {
                        let icon1 = $('<button class="btn btn-default" type="button"><i class="flx-icon icon-link" /></button>').on('click', (e) => {
                            flexygo.nav.openPage('view', editCtl.parseEditString(this.options.ObjNameLink, editCtl, this), editCtl.parseEditString(this.options.ObjWhereLink, editCtl, this), null, this.options.TargetIdLink);
                        });
                        ret.append(icon1);
                    }
                    if (this.options && (this.options.AllowNewFunction || this.options.AllowNewObject) && !this.options.Locked) {
                        let icon1 = $('<button class="btn btn-default" type="button"><i class="fa fa-plus" /></button>').on('click', (e) => {
                            if (this.options.AllowNewFunction) {
                                flexygo.utils.execDynamicCode.call(this, editCtl.parseEditString(this.options.AllowNewFunction, editCtl, this));
                            }
                            else if (this.options.AllowNewObject && this.options.AllowNewObject != '') {
                                flexygo.nav.openPage('edit', editCtl.parseEditString(this.options.AllowNewObject, editCtl, this), null, editCtl.parseEditString(this.options.AllowNewDefaults, editCtl, this), 'modal');
                            }
                        });
                        ret.append(icon1);
                    }
                    //if (this.options && this.options.HelpId) {
                    //    let icon1 = $('<button class="btn btn-default" type="button"><i class="flx-icon icon-help-2" /></button>').on('click', (e: JQueryEventObject) => {
                    //        flexygo.nav.openHelpId(this.options.HelpId);
                    //    });
                    //    ret.append(icon1);
                    //}
                    if (ret.html() == '') {
                        return null;
                    }
                    else {
                        return ret;
                    }
                }
                setOptions() {
                    let me = $(this);
                    if (this.options && this.options.Name && this.options.Name != '') {
                        this.input.attr('name', this.options.Name);
                        $(this).find('div:not(.bootstrap-tagsinput)>input').attr('name', this.options.Name);
                    }
                    else {
                        this.input.attr('name', flexygo.utils.uniqueName());
                        $(this).find('div:not(.bootstrap-tagsinput)>input').attr('name', flexygo.utils.uniqueName());
                    }
                    if (this.options && this.options.Locked) {
                        $(this).find('input').prop('disabled', this.options.Locked);
                        this.options.Locked ? me.attr('disabled', 'true') : me.attr('disabled', 'false');
                    }
                    if (me.attr('tab') && me.attr('tab') != '') {
                        this.input.attr('tabindex', me.attr('tab'));
                    }
                    if (this.options.PlaceHolder) {
                        this.container.attr('PlaceHolder', this.options.PlaceHolder);
                    }
                    if (this.options.Style) {
                        me.children('div').attr('style', this.options.Style);
                    }
                    if (this.options.CssClass) {
                        me.children('div').addClass(this.options.CssClass);
                    }
                    if (this.options && this.options.IsRequired) {
                        $(this).find('div:not(.bootstrap-tagsinput)>input').prop('required', this.options.IsRequired);
                    }
                    if (this.options && this.options.IsRequiredMessage) {
                        this.input.attr('data-msg-required', this.options.IsRequiredMessage);
                    }
                    let parentCtl = $(this).closest('flx-edit, flx-filter,flx-propertymanager, flx-view, flx-list');
                    let hasFilterDependencies = false;
                    if (parentCtl && parentCtl.length > 0 && parentCtl.is('flx-filter')) {
                        let wcParent = parentCtl[0];
                        let properties = wcParent.settings[wcParent.active].Properties;
                        for (let key in properties) {
                            if (properties[key].DependingFilterProperties.length > 0 && properties[key].ObjectName == this.options.ObjectName && properties[key].PropertyName == this.property) {
                                hasFilterDependencies = true;
                                break;
                            }
                        }
                    }
                    const module = me.closest('flx-module')[0];
                    if ((this.options && this.options.CauseRefresh) || hasFilterDependencies || (module && module.moduleConfig && module.moduleConfig.PropsEventDependant && module.moduleConfig.PropsEventDependant.includes(this.property))) {
                        this.input.on('change', () => {
                            //$(document).trigger('refreshProperty', [this.input.closest('flx-edit'), this.options.Name]);
                            let ev = {
                                class: "property",
                                type: "changed",
                                sender: this,
                                masterIdentity: this.property
                            };
                            flexygo.events.trigger(ev, me);
                        });
                    }
                    //En el caso de que no esté en un modal y el input ya sea visible (por lo que tiene el tamaño correcto) se le añade un min-width
                    if (me.closest('div.ui-dialog').length === 0 && me.children('div')[0].offsetParent) {
                        me.children('ul').css('min-width', (me.children('div').width()).toFixed() + 'px');
                    }
                }
                changeSQLData(newSQL, newOptions) {
                    if (newSQL && newSQL != '') {
                        this.options.SQLSentence = newSQL;
                    }
                    this.loadValues(0);
                }
                setValue(value, text) {
                    let me = $(this);
                    this.container.tagsinput('removeAll');
                    if (flexygo.utils.isBlank(value)) {
                        this.loadValues(0);
                    }
                    else {
                        let txts = (text) ? text.split(this.separator) : null;
                        $.each(value.split(this.separator), (i, e) => {
                            this.container.tagsinput('add', {
                                'value': e, 'text': (txts && txts[i]) ? txts[i] : (this.datalist && this.datalist.find(`li[data-value="${e}"]`).attr('data-text')) ? this.datalist.find(`li[data-value="${e}"]`).attr('data-text') : e
                            });
                        });
                    }
                    let parentCtl = $(this).closest('flx-view');
                    if (parentCtl && parentCtl.length > 0) {
                        me.find('[data-role="remove"]').css('display', 'none');
                        me.closest('flx-multicombo').attr('disabled', 'true');
                    }
                    else {
                        if (flexygo.utils.isTactilModeActive()) {
                            me.find('.tag.label.label-info').attr('data-role', 'remove');
                        }
                    }
                    me.attr('value', this.getValue());
                    me.attr('text', this.getText());
                }
                getValue() {
                    let values = '';
                    let separator = this.separator;
                    let itms = this.container.tagsinput('items');
                    for (let i = 0; i < itms.length; i++) {
                        if (i != 0) {
                            values += separator;
                        }
                        values += itms[i].value;
                    }
                    return values;
                }
                getText() {
                    let text = '';
                    let separator = this.separator;
                    let itms = this.container.tagsinput('items');
                    for (let i = 0; i < itms.length; i++) {
                        if (i != 0) {
                            text += separator;
                        }
                        text += itms[i].text;
                    }
                    return text;
                }
                /**
                * Trigger Dependencies.
                * @method triggerDependencies
                */
                triggerDependencies() {
                    this.input.trigger('change');
                }
            }
            /**
          * Array of observed attributes.
          * @property observedAttributes {Array}
          */
            FlxMultiComboElement.observedAttributes = ['type', 'property', 'objectname', 'viewname', 'sqlvaluefield', 'sqldisplayfield', 'required', 'disabled', 'requiredmessage', 'style', 'class', 'placeholder', 'iconclass', 'template', 'helpid', 'additionalwhere', 'sqlfilter', 'pagesize', 'cnnstring'];
            wc.FlxMultiComboElement = FlxMultiComboElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-multicombo', flexygo.ui.wc.FlxMultiComboElement);
//# sourceMappingURL=flx-multicombo.js.map