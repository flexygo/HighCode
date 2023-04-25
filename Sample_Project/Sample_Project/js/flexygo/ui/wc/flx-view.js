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
            * Library for the FlxViewElement web component.
            *
            * @class FlxViewElement
            * @constructor
            * @return {FlxViewElement}
            */
            class FlxViewElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                   * Set when component is attached to DOM
                   * @property connected {boolean}
                   */
                    this.connected = false;
                    this.moduleName = null;
                    this.objectname = null;
                    this.templateKey = '';
                    this.templateId = null;
                    this.viewId = null;
                    this.tHeader = null;
                    this.tBody = null;
                    this.tFooter = null;
                    this.tEmpty = null;
                    this.tCSSText = null;
                    this.tScriptText = null;
                    this.TemplateToolbarCollection = null;
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    this.connected = true;
                    let element = $(this);
                    this.moduleName = element.attr("modulename");
                    if (this.moduleName) {
                        if (element.attr('manualInit') != 'true') {
                            this.init();
                        }
                    }
                }
                /**
                * Array of observed attributes.
                * @property observedAttributes {Array}
                */
                static get observedAttributes() {
                    return ['modulename'];
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
                }
                refresh() {
                    if ($(this).attr('manualInit') != 'true') {
                        this.templateId = null;
                        this.init();
                    }
                }
                init() {
                    let me = $(this);
                    me.removeAttr('manualInit');
                    $(this).closest('flx-module').find('.flx-noInitContent').remove();
                    me.html('');
                    flexygo.ui.templates.setDefaultTemplate(this);
                    //let loadRet = this.loadRet;
                    let params = {
                        ObjectName: me.attr('ObjectName'),
                        ObjectWhere: me.attr('ObjectWhere'),
                        ModuleName: this.moduleName,
                        PageName: flexygo.history.getPageName(me),
                        TemplateId: this.templateId
                    };
                    flexygo.ajax.post('~/api/View', 'GetViewTemplate', params, (response) => {
                        if (response) {
                            this.data = response.Template.Data;
                            this.objectname = response.Template.ObjectName;
                            this.properties = response.Properties;
                            this.tHeader = response.Template.Header;
                            this.tBody = response.Template.Body;
                            this.tFooter = response.Template.Footer;
                            this.tEmpty = response.Template.Empty;
                            this.tScriptText = response.Template.ScriptText;
                            this.tCSSText = response.Template.CSSText;
                            this.templateId = response.Template.Id;
                            this.isNew = response.IsNew;
                            this.TemplateToolbarCollection = response.TemplateToolbarCollection;
                            if (response.TemplateList) {
                                this.templateList = response.TemplateList;
                            }
                            this.render();
                            let parentModule = me.closest('flx-module');
                            let wcModule = parentModule[0];
                            if (parentModule && wcModule) {
                                if (response.Buttons) {
                                    wcModule.setButtons(response.Buttons, response.ObjectName, response.ObjectWhere);
                                }
                                else {
                                    wcModule.setButtons(null, response.ObjectName, response.ObjectWhere);
                                }
                                wcModule.setObjectDescrip(response.Title);
                                if (wcModule.ModuleViewers) {
                                    this.currentViewers = response.CurrentViewers;
                                    flexygo.utils.refreshModuleViewersInfo(wcModule, this.currentViewers);
                                    flexygo.utils.checkObserverModule(wcModule, 20000);
                                    flexygo.events.on(this, 'push', 'notify', function (e) {
                                        switch (e.masterIdentity) {
                                            case 'GetSetModuleViewers': {
                                                if ((wcModule.moduleName == '' ? null : wcModule.moduleName) == (e.sender.ModuleName == '' ? null : e.sender.ModuleName)
                                                    && (wcModule.objectname == '' ? null : wcModule.objectname) == (e.sender.ObjectName == '' ? null : e.sender.ObjectName)
                                                    && (wcModule.objectwhere == '' ? null : wcModule.objectwhere) == (e.sender.ObjectWhere == '' ? null : e.sender.ObjectWhere)) {
                                                    flexygo.utils.refreshModuleViewersInfo(wcModule, e.sender.ActiveUsers);
                                                }
                                                break;
                                            }
                                            default: {
                                                break;
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    });
                }
                render() {
                    let me = $(this);
                    let rendered;
                    let defString = flexygo.history.getDefaults(this.objectname, me);
                    let wcMod = me.closest('flx-module')[0];
                    let def = null;
                    if (wcMod) {
                        def = wcMod.objectdefaults;
                    }
                    if (!def && defString && defString != '') {
                        def = JSON.parse(flexygo.utils.parser.replaceAll(defString, "'", '"'));
                    }
                    if (this.isNew) {
                        rendered = flexygo.utils.parser.recursiveCompile(def, this.tEmpty, this);
                    }
                    else {
                        rendered = flexygo.utils.parser.recursiveCompile(def, flexygo.utils.parser.recursiveCompile(this.data, this.tHeader, this), this);
                        rendered += flexygo.utils.parser.recursiveCompile(def, flexygo.utils.parser.recursiveCompile(this.data, this.tBody, this), this);
                        rendered += flexygo.utils.parser.recursiveCompile(def, flexygo.utils.parser.recursiveCompile(this.data, this.tFooter, this), this);
                    }
                    if (this.tCSSText && this.tCSSText !== '') {
                        let render = flexygo.utils.parser.recursiveCompile(def, flexygo.utils.parser.recursiveCompile(this.data, this.tCSSText, this), this);
                        rendered += '<style>' + render + '</style>';
                    }
                    if (this.tScriptText && this.tScriptText !== '') {
                        let render = flexygo.utils.parser.recursiveCompile(def, flexygo.utils.parser.recursiveCompile(this.data, this.tScriptText, this), this);
                        rendered += '<script>' + render + '</script>';
                    }
                    if (this.objectname === "sysOfflineApp") {
                        rendered += `<div id="monete" class="clickable" onclick="flexygo.nav.openHelpId('syshelp-AppOflineAccess','current',false,$(this))">${flexygo.localization.translate('develop.help').toUpperCase()} 🙊</div>`;
                    }
                    me.html(rendered);
                    me.append('<div style="clear:both"></div>');
                    this.setFormValues();
                    let reduce = 0;
                    if (flexygo.utils.isSizeSmartphone()) {
                        reduce = 20;
                    }
                    let cellH = 62 - reduce;
                    let itm = me.closest('.size-xs,.size-s,.size-m,.size-l');
                    if (itm.length > 0) {
                        if (itm.is('.size-xs')) {
                            cellH = 54 - reduce;
                        }
                        else if (itm.is('.size-s')) {
                            cellH = 62 - reduce;
                        }
                        else if (itm.is('.size-m')) {
                            cellH = 70 - reduce;
                        }
                        else if (itm.is('.size-l')) {
                            cellH = 86 - reduce;
                        }
                    }
                    let options = {
                        cellHeight: cellH,
                        verticalMargin: 0,
                        float: false,
                        disableDrag: true,
                        disableResize: true,
                        static_grid: true
                    };
                    this.processLoadDependencies();
                    var hideControls = me.find('.resizable-row').find('.hideControlGridStack [property]');
                    me.find('.resizable-row').gridstack(options);
                    //detach hideControls before gridstack in order to avoid field gaps
                    hideControls.each((index, elem) => { this.removeStack($(elem)); });
                    let parentModule = me.closest('flx-module');
                    let wcModule = parentModule[0];
                    if (parentModule && wcModule) {
                        wcModule.moduleLoaded(this);
                    }
                }
                processLoadDependencies() {
                    // checkif edit still exists
                    if ($(document).find(this).length == 0) {
                        return;
                    }
                    let me = $(this);
                    let props = $(this).find('[property]');
                    if (props.length > 0) {
                        let Properties = new Array();
                        for (let i = 0; i < props.length; i++) {
                            let prop = $(props[i])[0];
                            if (this.data[prop.property].Value != null && this.data[prop.property].Value.toString().indexOf('/Date(') != -1) {
                                Properties.push({
                                    Key: prop.property,
                                    Value: moment(this.data[prop.property].Value).toDate()
                                });
                            }
                            else {
                                Properties.push({
                                    Key: prop.property,
                                    Value: this.data[prop.property].Value
                                });
                            }
                            if (prop.property == null) {
                                return;
                            }
                        }
                        let params = {
                            ObjectName: (this.objectname ? this.objectname : me.attr('ObjectName')),
                            IsNew: false,
                            IsView: true,
                            Properties: Properties
                        };
                        flexygo.ajax.post('~/api/Edit', 'processAllDependencies', params, (response) => {
                            if (response) {
                                for (let i = 0; i < response.length; i++) {
                                    let itm = response[i];
                                    let prop = me.find('[property="' + itm.PropertyName + '"]');
                                    let lblprop = me.find('[lblproperty="' + itm.PropertyName + '"]');
                                    if (prop.length > 0) {
                                        this.refreshProperty(itm, prop, lblprop, true);
                                    }
                                }
                            }
                        });
                    }
                }
                refreshProperty(itm, prop, lblprop, loadDependency) {
                    let me = $(this);
                    let wc = prop[0];
                    if (itm.changeClass) {
                        prop.removeAttr('class').addClass(itm.newClass);
                    }
                    if (itm.changeValue) {
                        wc.setValue(itm.newValue);
                        if (itm.cascadeDependencies) {
                            wc.triggerDependencies();
                        }
                    }
                    if (itm.changeVisibility) {
                        if (itm.newVisibility) {
                            this.appendStack(prop);
                            prop.removeClass('hideControl');
                            lblprop.removeClass('hideControl');
                            let ctlClass = prop.attr('control-class');
                            if (typeof ctlClass != 'undefined') {
                                prop.attr('control-class', ctlClass.replace('hideControl', ''));
                                prop.find('.hideControl').removeClass('hideControl');
                            }
                        }
                        else {
                            //prop.addClass('hideControl');
                            //lblprop.addClass('hideControl');
                            me.find('.grid-stack').data('gridstack').removeWidget(prop.closest('.grid-stack-item'));
                        }
                    }
                }
                /**
            * Removes property from the gridstack control
            * @method removeStack
            * @param {JQuery} prop
            */
                removeStack(prop) {
                    let me = $(this);
                    prop = prop.closest('.grid-stack-item');
                    if (prop.length > 0) {
                        let secProp = prop.find('.item');
                        let dgW = prop.attr('data-w');
                        if (dgW == null || dgW == '') {
                            let hidGD = me.find('.grid-stack').find('.hidProps');
                            if (hidGD.length == 0) {
                                hidGD = $('<div class="hidProps" style="display:none"></div>');
                                me.find('.grid-stack').append(hidGD);
                            }
                            secProp.attr('data-x', prop.attr('data-gs-x'));
                            secProp.attr('data-y', prop.attr('data-gs-y'));
                            secProp.attr('data-w', prop.attr('data-gs-width'));
                            secProp.attr('data-h', prop.attr('data-gs-height'));
                            secProp.detach();
                            hidGD.append(secProp);
                            let gd = me.find('.grid-stack').data('gridstack');
                            gd.removeWidget(prop);
                        }
                    }
                }
                /**
                * Appends property from the gridstack control
                * @method appendStack
                * @param {JQuery} prop
                */
                appendStack(prop) {
                    let me = $(this);
                    prop = prop.closest('.item');
                    let dgW = prop.attr('data-w');
                    if (dgW && dgW != '') {
                        let gd = me.find('.grid-stack').data('gridstack');
                        prop.detach();
                        gd.addWidget($('<div/>').append(prop), prop.attr('data-x'), prop.attr('data-y'), prop.attr('data-w'), prop.attr('data-h'));
                        prop.attr('data-x', '');
                        prop.attr('data-y', '');
                        prop.attr('data-w', '');
                        prop.attr('data-h', '');
                    }
                }
                setFormValues() {
                    let controls = $(this).find('[property]');
                    for (let i = 0; i < controls.length; i++) {
                        let propName = $(controls[i]).attr('property');
                        let ctl = $(controls[i])[0];
                        if (ctl && ctl.setValue) {
                            if (this.data[propName].WebComponent == 'flx-dbcombo' || this.data[propName].WebComponent.includes('flx-radio')) {
                                ctl.setValue(this.data[propName].Value, this.data[propName].Text);
                            }
                            else if ($(ctl).attr('type') && ($(ctl).attr('type').toLowerCase() === 'datetime-local' || $(ctl).attr('type').toLowerCase() === 'date' || $(ctl).attr('type').toLowerCase() === 'number')) {
                                ctl.setValue(this.data[propName].Value);
                            }
                            else if ($(ctl).attr('type') && ($(ctl).attr('type').toLowerCase() === 'password')) {
                                ctl.setValue(this.data[propName].Text.replace(/./g, "*"));
                            }
                            else {
                                ctl.setValue(this.data[propName].Text);
                            }
                        }
                    }
                }
                getValue(row, tag) {
                    if (tag.toLowerCase() == 'control') {
                        return '<' + row.webcomponent + ' mode="view" property="' + row.name + '" />';
                    }
                    else {
                        let value = row[tag];
                        let type = typeof value;
                        type = type.toLowerCase();
                        switch (type) {
                            case 'undefined':
                                return '';
                            case 'boolean':
                                if (value) {
                                    return '<i class="flx-icon icon-checked-1"></i>';
                                }
                                else {
                                    return '<i class="flx-icon icon-non-check-2"></i>';
                                }
                            default:
                                return value;
                        }
                    }
                }
                configure() {
                    let where;
                    if (this.templateId == '' || this.templateId == null) {
                        where = '';
                    }
                    else {
                        where = 'TemplateId=\'' + this.templateId + '\'';
                    }
                    flexygo.nav.openPage('edit', 'sysObjectTemplate', where, null, 'popup', true);
                }
                paintProperties(data, template) {
                    let str = '';
                    let dataArray = $.map(data, (value, index) => {
                        return [value];
                    });
                    dataArray = dataArray.sort((a, b) => {
                        if (a.PositionY < b.PositionY)
                            return -1;
                        if (a.PositionY > b.PositionY)
                            return 1;
                        if (a.PositionX < b.PositionX)
                            return -1;
                        if (a.PositionX > b.PositionX)
                            return 1;
                        return 0;
                    });
                    str += '<form><div class="resizable-row grid-stack edit-form">';
                    for (let i = 0; i < dataArray.length; i++) {
                        let row = flexygo.utils.lowerKeys(dataArray[i]);
                        if (this.properties[row.name].FormDisplay == true) {
                            let item = $('<div class="grid-stack-item-content" />').html(template);
                            let container = $('<div class="grid-stack-item" />').append(item);
                            let props = item.find('[data-tag]');
                            /*if (previousRow && row.rownumber != previousRow.rownumber) {
                                 str += '</div><div class="row">'
                             }*/
                            /*manage labels */
                            for (let j = 0; j < props.length; j++) {
                                let prop = $(props[j]);
                                let tag = prop.data('tag').toLowerCase();
                                if (tag.toLowerCase() == 'label') {
                                    if (this.properties[row.name].ControlType != 'separator' && this.properties[row.name].ControlType != 'placeholder') {
                                        prop.prepend(this.getValue(row, tag));
                                        if (this.properties[row.name].IsRequired) {
                                            prop.addClass("required");
                                        }
                                        if (this.properties[row.name].LabelStyle != '') {
                                            prop.attr('style', this.properties[row.name].LabelStyle);
                                        }
                                        if (this.properties[row.name].LabelCssClass != '') {
                                            prop.addClass(this.properties[row.name].LabelCssClass);
                                        }
                                        prop.attr('lblproperty', row.name);
                                    }
                                    else {
                                        prop.empty();
                                    }
                                    if (this.properties[row.name].Hide && this.properties[row.name].Hide == true) {
                                        prop.addClass("hideControl");
                                        container.addClass("hideControlGridStack").css("display", "none");
                                    }
                                }
                                else if (tag.toLowerCase() == 'property-toolbar') {
                                    prop.attr('data-propertyName', row.name);
                                }
                                else if (row[tag] || tag.toLowerCase() == 'control') {
                                    prop.prepend(this.getValue(row, tag));
                                    if (this.properties[row.name].ControlType.indexOf('code') != -1 || this.properties[row.name].ControlType == 'multiline') {
                                        let lblHeight = 25;
                                        prop.css('height', 'calc(100% - ' + lblHeight + 'px)');
                                    }
                                }
                            }
                            container.attr('data-gs-x', row.positionx);
                            container.attr('data-gs-y', row.positiony);
                            container.attr('data-gs-width', row.width);
                            container.attr('data-gs-height', row.height);
                            //container.attr('data-gs-max-height', 3);
                            str += container[0].outerHTML;
                        }
                    }
                    str += '</div></form>';
                    return str;
                }
                parseEditString(str) {
                    let props = $(this).find('[property]');
                    let obj = new Object();
                    for (let i = 0; i < props.length; i++) {
                        let prop = $(props[i])[0];
                        obj[prop.property] = this.data[prop.property].Value;
                    }
                    return flexygo.utils.parser.compile(obj, str, this);
                }
                translate(str) {
                    return flexygo.localization.translate(str);
                }
                getModuleFullId() {
                    let page = flexygo.history.get($(this));
                    if (!page) {
                        return this.moduleName;
                    }
                    if (!page.objectname) {
                        page.objectname = '';
                    }
                    return page.pagename + '|' + page.objectname + '|' + this.moduleName;
                }
            }
            wc_1.FlxViewElement = FlxViewElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-view', flexygo.ui.wc.FlxViewElement);
//# sourceMappingURL=flx-view.js.map