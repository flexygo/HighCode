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
            * Library for the FlxTemplateManager
            *
            * @class FlxTemplateManager
            * @constructor
            * @return {FlxTemplateManager} .
            */
            class FlxTemplateManagerElement extends HTMLElement {
                constructor() {
                    //If a constructor is defined, is REQUIRED call the super constructor
                    super();
                    /**
                    * Set if element has been connected to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                }
                /**
                * Init the webcomponent. REQUIRED.
                * @method init
                */
                init() {
                    this.render();
                }
                /**
                * Refresh de webcomponent. REQUIRED.
                * @method refresh
                */
                refresh() {
                    this.render();
                }
                /**
                * Render HTML data.
                * @method render
                */
                render() {
                    flexygo.utils.showLoading();
                    this.openManager();
                    flexygo.utils.removeLoadingEffect();
                }
                openManager() {
                    const me = $(this);
                    let typeId = "";
                    let header = "";
                    let body = "";
                    let footer = "";
                    let empty = "";
                    let img = "";
                    let managerHtml = '';
                    //Get sample template
                    var obj = new flexygo.obj.Entity('sysTemplateSample', 'Objects_Templates_Samples.SampleId=\'' + this.template + '\'');
                    obj.read();
                    typeId = obj.data['TypeId'].Value;
                    header = obj.data['Header'].Value || '';
                    body = obj.data['Body'].Value || '';
                    footer = obj.data['Footer'].Value || '';
                    empty = obj.data['Empty'].Value;
                    img = obj.data['Img'].Value;
                    //Get the placeholders, join them and remove the repeated ones
                    let reg = /{{placeholder\|([^{}]+)}}/gi;
                    let headerMatches = header.match(reg) || [];
                    let bodyMatches = body.match(reg) || [];
                    let footerMatches = footer.match(reg) || [];
                    let allMatches = [...headerMatches, ...bodyMatches, ...footerMatches];
                    if (allMatches) {
                        allMatches = [...new Set(allMatches)];
                    }
                    managerHtml += '  <div class="col-12 margin-l">';
                    managerHtml += '        <div><img src="' + flexygo.utils.resolveUrl(img) + '" class="img-responsive imgSample"/></div>';
                    managerHtml += '        <div class="title margin-top-xl"><span>1. ' + flexygo.localization.translate('flxtemplatemanager.titleView') + ' </span><i class= "flx-icon icon-arrow-3 icon-rotate-90 margin-left-m"> </i></div>';
                    managerHtml += '        <div class="item margin-m">';
                    managerHtml += '       <flx-dbcombo';
                    managerHtml += '           name="ViewName"';
                    managerHtml += '           ObjectName="sysObjectView"';
                    managerHtml += '           ViewName="sysTemplateManager_Views"';
                    managerHtml += '           SQLValueField="ViewName"';
                    managerHtml += '           SQLDisplayField="Descrip"';
                    managerHtml += '           placeholder="' + flexygo.localization.translate('flxtemplatemanager.placeholderView') + '"';
                    managerHtml += '           iconclass="flx-icon icon-sql"';
                    managerHtml += '           additionalwhere="objectName=\'' + this.objectName + '\'"';
                    managerHtml += '           value="' + this.viewName + '"';
                    managerHtml += '       ></flx-dbcombo>';
                    managerHtml += '        </div>';
                    managerHtml += '  </div>';
                    managerHtml += '  <div class="col-12 margin-l">';
                    managerHtml += '    <div class="title"><span>2. ' + flexygo.localization.translate('flxtemplatemanager.titleManager') + ' </span><i class= "flx-icon icon-arrow-3 icon-rotate-90 margin-left-m"> </i></div>';
                    managerHtml += '    <div class="col-12 comboPlaceholder">';
                    managerHtml += '  </div>';
                    managerHtml += '<button class="btn bg-outstanding clickable right margin-m" name="save">';
                    managerHtml += '    <i class="flx-icon icon-save-2"></i>';
                    managerHtml += '    <span>' + flexygo.localization.translate('flxtemplatemanager.saveManager') + '</span>';
                    managerHtml += '</button>';
                    managerHtml += '</div>';
                    me.append(managerHtml);
                    this.getComboPlaceholder(allMatches);
                    me.find('flx-dbcombo[name="ViewName"]').find('.input-group-btn').append('<button name="flxlink" class="btn btn-default" type="button"> <i class="flx-icon icon-link"></i></button>');
                    me.find('flx-dbcombo[name="ViewName"]').find('.input-group-btn').append('<button name="flxallownew" class="btn btn-default" type="button"> <i class="fa fa-plus"></i></button>');
                    me.find('flx-dbcombo[name="ViewName"]').on("change", (e) => {
                        flexygo.utils.showLoading();
                        this.viewName = $(e.currentTarget).val();
                        this.getComboPlaceholder(allMatches);
                        flexygo.utils.removeLoadingEffect();
                    });
                    me.find('flx-dbcombo[name="ViewName"]').find('button[name="flxlink"]').on("click", (e) => {
                        if (!flexygo.utils.isBlank(this.viewName)) {
                            this.openWizardView(this.viewName);
                        }
                        else {
                            flexygo.msg.warning(flexygo.localization.translate('flxtemplatemanager.noView'));
                        }
                    });
                    me.find('flx-dbcombo[name="ViewName"]').find('button[name="flxallownew"]').on("click", (e) => {
                        flexygo.msg.prompt(flexygo.localization.translate('viewmanager.viewwizard'), flexygo.localization.translate('flxtemplatemanager.newView'), (viewName) => {
                            if (viewName) {
                                this.openWizardView(viewName);
                            }
                        }, '', '');
                        $(document).find('.lobibox-prompt input').on('keyup', function (evt) {
                            this.value = this.value.replace(/á/g, 'a');
                            this.value = this.value.replace(/é/g, 'e');
                            this.value = this.value.replace(/í/g, 'i');
                            this.value = this.value.replace(/ó/g, 'o');
                            this.value = this.value.replace(/ú/g, 'u');
                            this.value = this.value.replace(/ñ/g, 'n');
                            this.value = this.value.replace(/ç/g, 'c');
                            this.value = this.value.replace(/Á/g, 'A');
                            this.value = this.value.replace(/É/g, 'E');
                            this.value = this.value.replace(/Í/g, 'I');
                            this.value = this.value.replace(/Ó/g, 'O');
                            this.value = this.value.replace(/Ú/g, 'U');
                            this.value = this.value.replace(/Ñ/g, 'N');
                            this.value = this.value.replace(/Ç/g, 'C');
                            this.value = this.value.replace(/ /g, '_');
                            this.value = this.value.replace(/[^a-zA-Z0-9_\\-]/g, '');
                        });
                    });
                    me.find('button[name="save"]').on("click", (e) => {
                        flexygo.msg.confirm(flexygo.localization.translate('flxtemplatemanager.confirmSaveManager'), (result) => {
                            if (result) {
                                let matchValue;
                                for (let i = 0; i < allMatches.length; i++) {
                                    matchValue = me.find('flx-dbcombo[name="' + allMatches[i] + '"]').val();
                                    if (!flexygo.utils.isBlank(matchValue)) {
                                        //1st we replace the placeholder markers that are inside another marker for example {{{{placeholder|Text}}|bool}} and then the normal markers
                                        header = flexygo.utils.parser.replaceAll(header, '{{' + allMatches[i], '{{' + matchValue);
                                        header = flexygo.utils.parser.replaceAll(header, allMatches[i], '{{' + matchValue + '}}');
                                        body = flexygo.utils.parser.replaceAll(body, '{{' + allMatches[i], '{{' + matchValue);
                                        body = flexygo.utils.parser.replaceAll(body, allMatches[i], '{{' + matchValue + '}}');
                                        footer = flexygo.utils.parser.replaceAll(footer, '{{' + allMatches[i], '{{' + matchValue);
                                        footer = flexygo.utils.parser.replaceAll(footer, allMatches[i], '{{' + matchValue + '}}');
                                    }
                                }
                                if (this.option === 'listtemplatepanel' || this.option === 'viewtemplatepanel') {
                                    let type = typeId.charAt(0).toUpperCase() + typeId.slice(1);
                                    let obj = new flexygo.obj.Entity('sysObjectTemplate', "Objects_Templates.TemplateId = '" + this.objectName + "Default" + type + "'");
                                    obj.read();
                                    //Set Values
                                    if (flexygo.utils.isBlank(obj.data['TemplateId'].Value)) {
                                        obj.data['TemplateId'].Value = this.objectName + 'Default' + type;
                                        obj.data['ObjectName'].Value = this.objectName;
                                        obj.data['TypeId'].Value = typeId;
                                        obj.data['Descrip'].Value = this.objectName + ' Default ' + type;
                                        obj.data['IsDefault'].Value = true;
                                        obj.data['ViewName'].Value = this.viewName;
                                        obj.data['Header'].Value = header;
                                        obj.data['Body'].Value = body;
                                        obj.data['Footer'].Value = footer;
                                        obj.data['Empty'].Value = empty;
                                        if (obj.insert()) {
                                            let idtab = $(e.currentTarget).closest('.tab-pane').attr('id');
                                            $(e.currentTarget).closest('flx-objectmanager').find('[href="#' + idtab + '"]').click();
                                            flexygo.msg.success(flexygo.localization.translate('flxtemplatemanager.successTemplate'));
                                        }
                                        else {
                                            flexygo.msg.success(flexygo.localization.translate('flxtemplatemanager.errorTemplate'));
                                        }
                                    }
                                    else {
                                        flexygo.msg.warning(flexygo.localization.translate('flxtemplatemanager.existsTemplate') + ': Default' + type);
                                    }
                                }
                                else {
                                    let ev = {
                                        class: "entity",
                                        type: "selected",
                                        sender: { TypeId: typeId, Header: header, Body: body, Footer: footer, Empty: empty, ViewName: this.viewName },
                                    };
                                    flexygo.events.trigger(ev);
                                    me.closest('.ui-dialog').find('.ui-dialog-titlebar-close').click();
                                }
                            }
                        });
                    });
                }
                getComboPlaceholder(allMatches) {
                    let placeholderHtml = '';
                    if (flexygo.utils.isBlank(this.viewName)) {
                        for (let i = 0; i < allMatches.length; i++) {
                            placeholderHtml += '<div class="col-6">';
                            placeholderHtml += '    <div class="margin-top-xl">';
                            placeholderHtml += '        <span>' + allMatches[i].substring(2, allMatches[i].length - 2).trim().split('|')[1] + '</span>';
                            placeholderHtml += '        <flx-dbcombo';
                            placeholderHtml += '            name="' + allMatches[i] + '"';
                            placeholderHtml += '            pagesize="1000000"';
                            placeholderHtml += '            placeholder="' + flexygo.localization.translate('flxtemplatemanager.placeholderManager') + '">';
                            placeholderHtml += this.getComboOptions(allMatches[i].substring(2, allMatches[i].length - 2).trim().split('|')[2]);
                            placeholderHtml += '        </flx-dbcombo>';
                            placeholderHtml += '    </div>';
                            placeholderHtml += '</div>';
                        }
                    }
                    else {
                        let comboOptions = this.getComboOptionsView();
                        for (let i = 0; i < allMatches.length; i++) {
                            placeholderHtml += '<div class="col-6">';
                            placeholderHtml += '    <div class="margin-top-xl">';
                            placeholderHtml += '        <span>' + allMatches[i].substring(2, allMatches[i].length - 2).trim().split('|')[1] + '</span>';
                            placeholderHtml += '        <flx-dbcombo';
                            placeholderHtml += '            name="' + allMatches[i] + '"';
                            placeholderHtml += '            pagesize="1000000"';
                            placeholderHtml += '            placeholder="' + flexygo.localization.translate('flxtemplatemanager.placeholderManager') + '">';
                            placeholderHtml += comboOptions;
                            placeholderHtml += '        </flx-dbcombo>';
                            placeholderHtml += '    </div>';
                            placeholderHtml += '</div>';
                        }
                    }
                    $(this).find('.comboPlaceholder').html(placeholderHtml);
                }
                getComboOptions(placeholderTypes) {
                    let options = "";
                    if (flexygo.utils.isBlank(this.properties)) {
                        let aObject = new flexygo.obj.Entity('sysObjectProperty');
                        this.properties = aObject.getView('sysObjectPropertyListTypes', 0, 1000000, "Objects_Properties.ObjectName='" + this.objectName + "'");
                    }
                    if (this.properties) {
                        if (placeholderTypes === undefined || placeholderTypes.toLowerCase().includes('all')) {
                            for (var i = 0; i < this.properties.length; i++) {
                                options += '<option value="' + this.properties[i].PropertyName + '">' + this.properties[i].PropertyName + '</option>';
                            }
                        }
                        else {
                            for (var i = 0; i < this.properties.length; i++) {
                                if (placeholderTypes.toLowerCase().includes(this.properties[i].TypeId.toLowerCase())) {
                                    options += '<option value="' + this.properties[i].PropertyName + '">' + this.properties[i].PropertyName + '</option>';
                                }
                            }
                        }
                        return options;
                    }
                    return options;
                }
                getComboOptionsView() {
                    let options = "";
                    let aObject = new flexygo.obj.Entity(this.objectName);
                    let columsNames = aObject.getViewColumnsNames(this.viewName);
                    for (let i = 0; i < columsNames.length; i++) {
                        let col = columsNames[i];
                        for (let prop in col) {
                            options += '<option value="' + col[prop] + '">' + col[prop] + '</option>';
                        }
                    }
                    return options;
                }
                openWizardView(viewName) {
                    if (!flexygo.utils.isBlank(this.objectName)) {
                        let histObj = new flexygo.nav.FlexygoHistory();
                        histObj.targetid = 'modal1024x550';
                        let modal = flexygo.targets.createContainer(histObj, true, null, true);
                        if (!modal) {
                            return;
                        }
                        modal.empty();
                        modal.closest('.ui-dialog').find('.ui-dialog-title').html(flexygo.localization.translate('viewmanager.viewwizard'));
                        modal.append('<flx-viewmanager mode="templateManager" objectname="' + this.objectName + '"  viewname="' + viewName + '"></flx-viewmanager>');
                        let vm = modal.find('flx-viewmanager')[0];
                        vm.targetItem = $(this);
                    }
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = $(this);
                    this.connected = true;
                    this.objectName = element.attr("objectname");
                    this.template = element.attr("template");
                    this.viewName = element.attr("viewname");
                    this.option = element.attr("option");
                    this.init();
                }
                /**
                * Fires when the attribute value of the element is changed.
                * @method attributeChangedCallback
                */
                attributeChangedCallback(attrName, oldVal, newVal) {
                    let needInit = false;
                    if (attrName.toLowerCase() == 'objectname' && newVal && newVal != '') {
                        this.objectName = newVal;
                        this.properties = null;
                        needInit = true;
                    }
                    else if (attrName.toLowerCase() == 'template' && newVal && newVal != '') {
                        this.template = newVal;
                        needInit = true;
                    }
                    else if (attrName.toLowerCase() == 'viewname' && newVal && newVal != '') {
                        this.viewName = newVal;
                        needInit = true;
                    }
                    else if (attrName.toLowerCase() == 'option' && newVal && newVal != '') {
                        this.option = newVal;
                        needInit = true;
                    }
                    if (this.connected && needInit) {
                        this.init();
                    }
                }
            }
            /**
            * Array of observed attributes. REQUIRED
            * @property observedAttributes {Array}
            */
            FlxTemplateManagerElement.observedAttributes = ['ObjectName', 'Template', 'ViewName'];
            wc.FlxTemplateManagerElement = FlxTemplateManagerElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define("flx-templatemanager", flexygo.ui.wc.FlxTemplateManagerElement);
//# sourceMappingURL=flx-templatemanager.js.map