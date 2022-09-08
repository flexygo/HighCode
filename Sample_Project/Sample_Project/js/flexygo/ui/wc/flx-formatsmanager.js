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
            * Library for the FlxFormatsManager
            *
            * @class FlxFormatsManager
            * @constructor
            * @return {FlxFormatsManager} .
            */
            class FlxFormatsManagerElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                    * Set if element has been connected to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                    /**
                    * Component Target Item
                    * @property targetItem {JQuery}
                    */
                    this.targetItem = null;
                    /**
                    * Component Target Item
                    * @property targetItem {JQuery}
                    */
                    this.targetTextbox = null;
                    /**
                    * Component Field to format
                    * @property fieldToFormat {string}
                    */
                    this.fieldToFormat = null;
                    /**
                    * Component Formated Field
                    * @property formatedField {string}
                    */
                    this.formatedField = null;
                    /**
                    *Component Format Type
                    * @property formattype {string}
                    */
                    this.formatType = null;
                    /**
                    * Component Switch Options Number
                    * @property optionsSwitchNum {number}
                    */
                    this.optionsSwitchNum = 0;
                }
                /**
                * Array of observed attributes. REQUIRED
                * @property observedAttributes {Array}
                */
                static get observedAttributes() {
                    return ['ObjectName', 'ObjectWhere', 'ModuleName', 'asd'];
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
                    let me = $(this);
                    me.html(this.formComponents());
                    this.mainEvents();
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = $(this);
                    this.connected = true;
                    this.objectName = element.attr("ObjectName");
                    this.objectWhere = element.attr("ObjectWhere");
                    this.moduleName = element.attr("ModuleName");
                    this.init();
                }
                /**
                * Fires when the attribute value of the element is changed.
                * @method attributeChangedCallback
                */
                attributeChangedCallback(attrName, oldVal, newVal) {
                    let needInit = false;
                    if (attrName.toLowerCase() == 'modulename' && newVal && newVal != '') {
                        this.moduleName = newVal;
                        needInit = true;
                    }
                    else if (attrName.toLowerCase() == 'objectname' && newVal && newVal != '') {
                        this.objectName = newVal;
                        needInit = true;
                    }
                    else if (attrName.toLowerCase() == 'objectwhere' && newVal && newVal != '') {
                        this.objectWhere = newVal;
                        needInit = true;
                    }
                    if (this.connected && needInit) {
                        this.init();
                    }
                }
                /**
                * Inputs components.
                * @method formComponents
                */
                formComponents() {
                    let me = $(this);
                    let render = '';
                    me.closest('.pageContainer ').addClass('main-manager');
                    render += '<div class ="main-formats-manager padding-m">';
                    //legend
                    render += '<div><legend><i class="flx-icon icon-wizard-1"></i>' + flexygo.localization.translate('formatsmanager.formatassistant') + '</legend></div>';
                    //main div
                    render += '<div class="col-12">';
                    //Formats types
                    render += '<div class=" col-6 padding-m selectOptions"><label>' + flexygo.localization.translate('formatsmanager.formattype') + ':<i class="txt-danger">*</i></label>';
                    render += '<span><flx-combo class="size-m" name="formats"  PlaceHolder="' + flexygo.localization.translate('formatsmanager.selectformat') +
                        '" iconClass="flx-icon icon-bullet-list" required data-msg-required="' + flexygo.localization.translate('formatsmanager.validformat') + '">' +
                        `<option></option>
                <option value="bool">` + flexygo.localization.translate('formatsmanager.boolformat') + ` (bool)</option>
                <option value="decimal">` + flexygo.localization.translate('formatsmanager.decimal') + ` (decimal)</option>
                <option value="string">` + flexygo.localization.translate('formatsmanager.stringformat') + ` (string)</option>
                <option value="isnull">` + flexygo.localization.translate('formatsmanager.isnull') + ` (isnull)</option>
                <option value="switch">` + flexygo.localization.translate('formatsmanager.switchformat') + ` (switch)</option>
                <option value="date">` + flexygo.localization.translate('formatsmanager.isdate') + ` (date)</option>
                <option value="translate">` + flexygo.localization.translate('formatsmanager.translate') + ` (translate)</option>
                <option value="url">URL (url)</option>
                <option value="html">HTML (html)</option>
                <option value="js">JavaScript (js)</option>
                <option value="sql">SQL (sql)</option>
                <option value="qr">QR (qr)</option>
                </flx-combo></span></div>`;
                    //Field to format
                    render += '<div class=" col-6 padding-m" id="fieldContainer"><label>' + flexygo.localization.translate('formatsmanager.field') + ':<i class="txt-danger">*</i></label>';
                    render += '<span><flx-combo class="size-m" name="fields"  PlaceHolder="' + flexygo.localization.translate('formatsmanager.selectfield') +
                        '" iconClass="flx-icon icon-sql" required data-msg-required="' +
                        flexygo.localization.translate('formatsmanager.validfield') + '"></flx-combo></span></div> </div>';
                    //types controls
                    render += '<div class="options-cont col-12"></div>';
                    //save button
                    render += '<div class="save-cont padding-m col-12 "><button class="btn btn-default bg-info saveButton margin-left-l margin-bottom-l" title= "' + flexygo.localization.translate('combobuilder.save') + '" name="save-button"> <i class="flx-icon icon-save-2"> </i> <span>' + flexygo.localization.translate('combobuilder.save') + '</span> </button>';
                    render += '<button class="btn btn-default bg-danger closeButton margin-left-l margin-bottom-l" title= "' + flexygo.localization.translate('combobuilder.cancel') + '" name="cancel-button"> <i class="flx-icon icon-remove"> </i> <span>' + flexygo.localization.translate('combobuilder.cancel') + '</span> </button></div>';
                    return render;
                }
                /**
                * Main events
                * @method events
                */
                mainEvents() {
                    let me = $(this);
                    me.find('[name="fields"]').on('change', (e) => {
                        this.formatedField = '';
                        this.fieldToFormat = me.find('[name="fields"]').val();
                        this.getFormatField();
                    });
                    me.find('[name="formats"]').on('change', (e) => {
                        this.formatedField = '';
                        this.renderFormatsTypeControls(me.find('[name="formats"]').val());
                    });
                    me.find('[name="save-button"]').on('click', (e) => {
                        if (this.formatedField != null && this.formatedField != '' && this.fieldToFormat != null && this.fieldToFormat != '') {
                            let textArea = $(this.targetItem).find(this.targetTextbox)[0];
                            let positions = textArea.myCM.getCursor();
                            textArea.myCM.replaceRange(this.formatedField, positions, positions);
                            textArea.setValue(textArea.myCM.getValue());
                            //flexygo.msg.success(flexygo.localization.translate('formatsmanager.saved'));
                            flexygo.nav.closePage(me);
                        }
                        else {
                            flexygo.msg.warning(flexygo.localization.translate('formatsmanager.nosaved'));
                        }
                    });
                    me.find('[name="cancel-button"]').on('click', (e) => {
                        flexygo.nav.closePage(me);
                    });
                }
                /**
                * Get Object Data Fields
                * @method getDataFields
                */
                getDataFields(target) {
                    let aObjectName = $(target).find('[name="ObjectName"]').val();
                    let aObject = new flexygo.obj.Entity(aObjectName);
                    let aData = $(target).find('[name="ViewName"]').val().split(" ");
                    let html = '<option value=""></option>';
                    if (aData != '') {
                        let aViewName = aData[1];
                        let columsNames = aObject.getViewColumnsNames(aViewName);
                        for (let i = 0; i < columsNames.length; i++) {
                            let col = columsNames[i];
                            for (let prop in col) {
                                html += '<option value="' + col[prop] + '">' + col[prop] + '</option>';
                            }
                        }
                    }
                    else {
                        let rd = aObject.read();
                        let properties = aObject.data;
                        for (let prop in properties) {
                            html += '<option value="' + prop + '">' + prop + '</option>';
                        }
                    }
                    return html;
                }
                /**
                * Render controls
                * @method renderFormatsTypeControls
                */
                renderFormatsTypeControls(type) {
                    let me = $(this);
                    me.find('#fieldContainer').css('visibility', 'visible');
                    let html = '<div class="types-controls-cont">';
                    switch (type) {
                        case 'bool':
                            html += '<span class="col-6"><label>' + flexygo.localization.translate('formatsmanager.casetrue') + ':</label><flx-text id="casetrue" class="size-m" iconClass="flx-icon icon-accepted"></flx-text></span>';
                            html += '<span class="col-6"><label>' + flexygo.localization.translate('formatsmanager.casefalse') + ':</label><flx-text id="casefalse" class="size-m" iconClass="flx-icon icon-close-11"></flx-text></span>';
                            break;
                        case 'decimal':
                            html += '<span class="col-6"><label>' + flexygo.localization.translate('formatsmanager.numdecimals') + ':<i class="txt-danger">*</i></label></label><flx-text id="decimals" class="size-m" iconClass="fa fa-hashtag" required requiredmessage="required"></flx-text></span>';
                            break;
                        case 'isnull':
                            html += '<span class="col-6"><label>' + flexygo.localization.translate('formatsmanager.isnull') + ':<i class="txt-danger">*</i></label><flx-text id="isnull" class="size-m" iconClass="flx-icon icon-close-11" required  data-msg-required="' + flexygo.localization.translate('formatsmanager.requiredfield') + '"></flx-text></span>';
                            html += '<span class="col-6"><label>' + flexygo.localization.translate('formatsmanager.casenotnull') + ':</label><flx-text id="isnotnull" class="size-m" iconClass="flx-icon icon-accepted"></flx-text></span>';
                            break;
                        case 'string':
                            html += '<span class="col-6"><label>' + flexygo.localization.translate('formatsmanager.stringtype') + ':<i class="txt-danger">*</i></label></label>' +
                                '<flx-combo class="size-m" id="stringformat" PlaceHolder="' + flexygo.localization.translate('formatsmanager.stringtype') +
                                '" iconClass="flx-icon icon-quill" required data-msg-required="' + flexygo.localization.translate('formatsmanager.validstringformat') + '">' +
                                '<option value=""></option>' +
                                '<option value="upper">' + flexygo.localization.translate('formatsmanager.uppercase') +
                                '</option><option value="lower">' + flexygo.localization.translate('formatsmanager.lowercase') + '</option>' +
                                '<option value="numcharacters">' + flexygo.localization.translate('formatsmanager.characternumber') + '</option></span>';
                            break;
                        case 'switch':
                            html += '<span class="col-12 margin-bottom-l margin-top-m"><button class="btn btn-info margin-right-l" id="addOption" ><i class="fa fa-plus icon-margin-right"></i>' +
                                flexygo.localization.translate('formatsmanager.addoption') + '</button>';
                            html += '<button class="btn btn-warning " id="addElse" ><i class="fa fa-plus icon-margin-right"></i>' + flexygo.localization.translate('formatsmanager.addelse') + '</button></span>';
                            html += '<div class="OptionsCont"></div><div class="elseOptionCont"></div>';
                            this.formatType = 'switch';
                            break;
                        case 'date':
                            html += '<span class="col-6"><label>' + flexygo.localization.translate('formatsmanager.dateformat') + ':<i class="txt-danger">*</i></label></label>' +
                                '<flx-combo class="size-m" id="dateformat" PlaceHolder="' + flexygo.localization.translate('formatsmanager.selectdateformat') +
                                '" iconClass="flx-icon icon-vcalendar" required data-msg-required="' + flexygo.localization.translate('formatsmanager.validdateformat') + '">' +
                                `<option value=""></option>
                        <option value="W">2021-07-13T19:05:57+02:00</option>
                        <option value= "LT" >` + flexygo.localization.translate('formatsmanager.dateLT') + `</option>
                        <option value="LTS">` + flexygo.localization.translate('formatsmanager.dateLTS') + `</option > 
                        <option value="L">` + flexygo.localization.translate('formatsmanager.dateL') + `</option>
                        <option value="l">` + flexygo.localization.translate('formatsmanager.datel') + `</option>
                        <option value="LL">` + flexygo.localization.translate('formatsmanager.dateLL') + `</option>
                        <option value="ll">` + flexygo.localization.translate('formatsmanager.datell') + `</option>
                        <option value="LLL">` + flexygo.localization.translate('formatsmanager.dateLLL') + `</option>
                        <option value="lll">` + flexygo.localization.translate('formatsmanager.datelll') + `</option>
                        <option value="LLLL">` + flexygo.localization.translate('formatsmanager.dateLLLL') + ` 8:57</option>
                        <option value="llll">` + flexygo.localization.translate('formatsmanager.datellll') + ` 8:57</option></flx-combo></span>`;
                            break;
                        case 'translate':
                            this.fieldToFormat = 'none';
                            me.find('#fieldContainer').css('visibility', 'hidden');
                            html += '<span class="col-12"><label>' + flexygo.localization.translate('formatsmanager.translatesentence') + ':</label><flx-text id="translate" class="size-m" iconClass="flx-icon icon-text"></flx-text></span>';
                            break;
                        case 'url':
                            this.formatType = 'url';
                            this.getFormatField();
                            break;
                        case 'html':
                            this.formatType = 'html';
                            this.getFormatField();
                            break;
                        case 'sql':
                            this.formatType = 'sql';
                            this.getFormatField();
                            break;
                        case 'js':
                            this.formatType = 'js';
                            this.getFormatField();
                            break;
                        case 'qr':
                            html += '<span class="col-6"><label>Size:<i class="txt-danger">*</i></label></label><flx-text id="qrsize" class="size-m" iconClass="fa fa-hashtag"></flx-text></span>';
                            this.formatType = 'qr';
                            break;
                    }
                    html += '</div>';
                    me.find('.types-controls-cont').remove();
                    me.find('.options-cont').append(html);
                    this.typesEvents();
                }
                /**
                * Types Events
                * @method typesEvents
                */
                typesEvents() {
                    let me = $(this);
                    let result;
                    me.find('#casetrue').on('change', (e) => {
                        this.formatType = 'bool';
                        this.getFormatField();
                    });
                    me.find('#casefalse').on('change', (e) => {
                        this.formatType = 'bool';
                        this.getFormatField();
                    });
                    me.find('#decimals').on('change', (e) => {
                        this.formatType = 'decimal';
                        this.getFormatField();
                    });
                    me.find('#isnull').on('change', (e) => {
                        this.formatType = 'isnull';
                        this.getFormatField();
                    });
                    me.find('#isnotnull').on('change', (e) => {
                        this.formatType = 'isnull';
                        this.getFormatField();
                    });
                    me.find('#stringformat').on('change', (e) => {
                        this.formatType = 'string';
                        me.find('.nchrcont').remove();
                        this.getFormatField();
                    });
                    me.find('#dateformat').on('change', (e) => {
                        this.formatType = 'date';
                        this.getFormatField();
                    });
                    me.find('#translate').on('change', (e) => {
                        this.formatType = 'translate';
                        this.getFormatField();
                    });
                    me.find('#qrsize').on('change', (e) => {
                        this.formatType = 'qrsize';
                        this.getFormatField();
                    });
                    me.find('#addOption').on('click', (e) => {
                        this.optionsSwitchNum++;
                        let html = '';
                        html = '<div id="optionContainer' + this.optionsSwitchNum + '" class="col-12 margin-bottom-m options">';
                        html += '<span class="col-5"><label>' + flexygo.localization.translate('formatsmanager.option') + ':<i class="txt-danger">*</i></label></label><flx-text class="option" id="sOption' + this.optionsSwitchNum + '" class="size-m" iconClass="fa fa-hashtag"></flx-text></span>';
                        html += '<span class="col-5"><label>' + flexygo.localization.translate('formatsmanager.result') + ':<i class="txt-danger">*</i></label></label><flx-text class="result" id="sResult' + this.optionsSwitchNum + '" class="size-m" iconClass="fa fa-hashtag"></flx-text></span>';
                        html += '<span class="col-2"><button class="btn btn-danger delOption" id="deleteOption' + this.optionsSwitchNum + '"" ><i class="flx-icon icon-delete-2"></i></button></span>';
                        html += '</div>';
                        me.find('.OptionsCont').append(html);
                        this.switchEvents(this.optionsSwitchNum);
                    });
                    me.find('#addElse').on('click', (e) => {
                        this.optionsSwitchNum++;
                        let html = '';
                        html = '<div id="ElseContainer" class="col-12 margin-bottom-m">';
                        html += '<span class="col-10"><label>' + flexygo.localization.translate('formatsmanager.elseoption') + ':</label></label><flx-text class="" id="elseOption" class="size-m" iconClass="fa fa-hashtag"></flx-text></span>';
                        html += '<span class="col-2"><button class=" btn btn-danger delOption" id="deleteElse" ><i class="flx-icon icon-delete-2"></i></button></span>';
                        html += '</div>';
                        me.find('.elseOptionCont').append(html);
                        me.find('#addElse').css('visibility', 'hidden');
                        this.switchEvents(null);
                    });
                }
                /**
                * Switch Events
                * @method switchEvents
                */
                switchEvents(index) {
                    let me = $(this);
                    me.find('#sOption' + index).on('change', (e) => {
                        this.getFormatField();
                    });
                    me.find('#sResult' + index).on('change', (e) => {
                        this.getFormatField();
                    });
                    me.find('#deleteOption' + index).on('click', (e) => {
                        me.find('#deleteOption' + index).closest('#optionContainer' + index).remove();
                        this.getFormatField();
                    });
                    me.find('#elseOption').on('change', (e) => {
                        this.getFormatField();
                    });
                    me.find('#deleteElse').on('click', (e) => {
                        me.find('#addElse').css('visibility', 'visible');
                        me.find('#ElseContainer').remove();
                        this.getFormatField();
                    });
                }
                /**
                *
                * @method getFormatField
                */
                getFormatField() {
                    let me = $(this);
                    let field = this.fieldToFormat;
                    this.formatedField = '';
                    switch (this.formatType) {
                        case 'bool':
                            let tr = me.find('#casetrue').val();
                            let fl = me.find('#casefalse').val();
                            if (tr === null) {
                                tr = '';
                            }
                            if (fl === null) {
                                fl = '';
                            }
                            if (tr != '' || fl != '') {
                                this.formatedField = '{{' + field + '|bool:' + tr + ',' + fl + '}}';
                            }
                            break;
                        case 'decimal':
                            let decimals = me.find('#decimals').val();
                            this.formatedField = '{{' + field + '|decimal:' + decimals + '}}';
                            break;
                        case 'isnull':
                            let nll = me.find('#isnull').val();
                            let ntnll = me.find('#isnotnull').val();
                            if (nll === null) {
                                nll = '';
                            }
                            if (ntnll === null) {
                                ntnll = '';
                            }
                            if (nll != '' || ntnll != '') {
                                this.formatedField = '{{' + field + '|isnull:' + nll + ',' + ntnll + '}}';
                            }
                            break;
                        case 'string':
                            let selectedString = me.find('#stringformat').val();
                            if (selectedString === 'numcharacters') {
                                let html = '<span class="col-6 nchrcont"><label>' + flexygo.localization.translate('formatsmanager.characternumber') +
                                    ':<i class="txt-danger">*</i></label></label><flx-text id="nchars" class="size-m" iconClass="fa fa-hashtag"></flx-text></span>';
                                me.find('.types-controls-cont').append(html);
                                me.find('#nchars').on('change', (e) => {
                                    this.formatedField = '{{' + field + '|string:' + me.find('#nchars').val() + '}}';
                                    ;
                                });
                            }
                            else {
                                this.formatedField = '{{' + field + '|string:' + selectedString + '}}';
                                ;
                            }
                            break;
                        case 'date':
                            let selectedDate = me.find('#dateformat').val();
                            this.formatedField = '{{' + field + '|date:' + selectedDate + '}}';
                            ;
                            break;
                        case 'translate':
                            let sentence = me.find('#translate').val();
                            this.formatedField = '{{translate|' + sentence + '}}';
                            break;
                        case 'qrsize':
                            let qrsize = me.find('#qrsize').val();
                            this.formatedField = '{{' + field + '|qr:' + qrsize + '}}';
                            break;
                        case 'switch':
                            let optionsCont = me.find('.options');
                            let elseOption = me.find('#elseOption').val();
                            let options = '[';
                            optionsCont.each(function () {
                                let txt = new Array();
                                $(this).find('flx-text').each(function () {
                                    txt.push($(this).val());
                                });
                                if (txt[0] != null && txt[1] != null) {
                                    options += txt[0] + ':' + txt[1] + ',';
                                }
                            });
                            if (elseOption != null && elseOption != '' && options != '[') {
                                options += 'else:' + elseOption;
                            }
                            if (options.charAt(options.length - 1) === ',') {
                                options = options.substring(0, options.length - 1);
                            }
                            options += ']';
                            if (options != '[' && options != '[]') {
                                this.formatedField = '{{' + me.find('[name="fields"]').val() + '|switch:' + options + '}}';
                            }
                            break;
                        case 'html':
                            this.formatedField = '{{' + this.fieldToFormat + '|html}}';
                            break;
                        case 'sql':
                            this.formatedField = '{{' + this.fieldToFormat + '|sql}}';
                            break;
                        case 'js':
                            this.formatedField = '{{' + this.fieldToFormat + '|js}}';
                            break;
                        case 'url':
                            this.formatedField = '{{' + this.fieldToFormat + '|url}}';
                            break;
                    }
                }
                /**
                *
                * @method openWizard
                */
                openWizard(e) {
                    let histObj = new flexygo.nav.FlexygoHistory();
                    histObj.targetid = 'modal1024x480';
                    let modal = flexygo.targets.createContainer(histObj, true, null, true);
                    modal.empty();
                    modal.closest('.ui-dialog').find('.ui-dialog-title').html(flexygo.localization.translate('develop.modulemanager'));
                    modal.append('<flx-formatsmanager></flx-formatsmanager>');
                    let cb = modal.find('flx-formatsmanager')[0];
                    cb.targetItem = e.closest("flx-module");
                    cb.targetTextbox = e.closest("flx-code");
                    let html = this.getDataFields(cb.targetItem);
                    $(cb).find('[name="fields"] .form-control').append(html);
                }
            }
            wc.FlxFormatsManagerElement = FlxFormatsManagerElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define("flx-formatsmanager", flexygo.ui.wc.FlxFormatsManagerElement);
//# sourceMappingURL=flx-formatsmanager.js.map