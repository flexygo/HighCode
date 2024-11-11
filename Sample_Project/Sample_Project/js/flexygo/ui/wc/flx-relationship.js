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
        * Library for the FlxRelationshipElement web component.
        *
        * @class FlxRelationshipElement
        * @constructor
        * @return {FlxRelationshipElement}
            */
            class FlxRelationshipElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                     * Boolean that controls whether or not the manual mode structure is checked
                     * @property checkSintaxis {boolean}
                     */
                    this.checkSintaxis = false;
                    this.previousOffset = { top: null, left: null, };
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = this;
                    if ($(document.head).find('script[id="leader-line"]').length == 0) {
                        $(document.head).append(`<script ID="leader-line" defer src="${flexygo.utils.resolveUrl('~/js/plugins/LeaderLine/leader-line.min.js')}"/>`);
                    }
                    this.connected = true;
                    this.objectName = $(this).attr('ObjectName');
                    this.objectWhere = $(this).attr('ObjectWhere');
                    this.inputPropertyName = $(this).attr("InputPropertyName") ? $(this).attr("InputPropertyName") : "";
                    this.secundaryInputPropertyName = $(this).attr("secundaryInputPropertyName") ? $(this).attr("secundaryInputPropertyName") : "";
                    this.confModuleName = $(this).attr("ConfModuleName") ? $(this).attr("ConfModuleName") : "";
                    this.moduleName = $(this).attr('ModuleName');
                    this.relations = {};
                    this.paperScale = 1.0;
                    this.relationlineSize = 4;
                    flexygo.events.off(this, "module", "resized");
                    flexygo.events.off(this, "property", "changed");
                    flexygo.events.off(this, "module", "loaded");
                    flexygo.events.off(this, "module", "refreshed");
                    $(window).off('resize.relationship').on('resize.relationship', function () {
                        element.paperScale = 1;
                        element.resizePaper();
                    });
                    flexygo.events.on(this, "module", "resized", function (e) {
                        element.paperScale = 1;
                        element.resizePaper();
                    });
                    flexygo.events.on(this, "module", "loaded", this.setObjects);
                    $("#mainContent").off('scroll.relationship').on('scroll.relationship', function () {
                        let initialX = element.initialDimentions["wrapper"]["properties"]["translateX"];
                        let initialY = element.initialDimentions["wrapper"]["properties"]["translateY"];
                        $(element).find(".wrapper").css("transform", `translate(${initialX + this.scrollLeft}px,${initialY + this.scrollTop}px)`);
                        element.adjustRelationLines();
                        element.adjustWrapper();
                    });
                    if ($(this).attr('manualInit') != 'true') {
                        this.init();
                    }
                }
                /**
                * Fires when element is detached to DOM
                * @method disconnectedCallback
                */
                disconnectedCallback() {
                    var _a, _b;
                    flexygo.events.off(this, "module", "resized");
                    $(window).off('resize.relationship');
                    $("#mainContent").off('scroll.relationship');
                    (_b = (_a = $(this.confModule)) === null || _a === void 0 ? void 0 : _a.find(`[property="${this.inputPropertyName}"]`)) === null || _b === void 0 ? void 0 : _b.removeAttr("disabled");
                    flexygo.events.off(this, "property", "changed");
                    flexygo.events.off(this, "module", "loaded");
                    flexygo.events.off(this, "module", "refreshed");
                    this.clearRelations();
                }
                /**
                * Monitor the list of observed attribute for changes.
                * @property observedAttributes
                */
                observedAttributes() {
                    return [];
                    /* return ['modulename', 'objectname', 'objectwhere', 'objectid', 'singleimage', 'empty', 'mode'];*/
                }
                /**
                * Fires when the attribute value of the element is changed.
                * @method attributeChangedCallback
                */
                attributeChangedCallback(attrName, oldVal, newVal) {
                }
                /**
                * Init the webcomponent.
                * @method init
                */
                init(refresh = false) {
                    var _a, _b;
                    try {
                        this.paperScale = 1.0;
                        this.parentKeyProperties = [];
                        $(this).removeAttr('manualInit');
                        $(this).closest('flx-module').find('.flx-noInitContent').remove();
                        this.render();
                        $(this).find('.relationship-container').data("lastScale", this.paperScale);
                        $(this).find('.paper').css({
                            "height": $('#mainContent')[0].getBoundingClientRect().height * 3,
                            "width": $('#mainContent')[0].getBoundingClientRect().width * 2
                        });
                        $(this).find('.paper').data('originalHeight', $('#mainContent')[0].getBoundingClientRect().height * 3);
                        if (!flexygo.utils.isBlank(this.confModuleName) && $(this).closest('main').find(`flx-module[modulename="${this.confModuleName}"]`).length > 0) {
                            this.confModule = $(this).closest('main').find(`flx-module[modulename="${this.confModuleName}"]`);
                            this.parentObjectName = this.confModule.find('[property="ObjectName"]').val();
                            this.childObjectName = this.confModule.find('[property="ChildCollection"]').val();
                            this.manageInputValue = !this.confModule.find('[property="manual"]').val();
                            if (refresh) {
                                if (!this.manageInputValue) {
                                    this.checkSintaxis = !this.confModule.find('[property="manual"]').val();
                                    (_a = $(this.confModule).find(`[property="${this.inputPropertyName}"]`)) === null || _a === void 0 ? void 0 : _a.removeAttr("disabled");
                                }
                                else {
                                    this.checkSintaxis = true;
                                    (_b = $(this.confModule).find(`[property="${this.inputPropertyName}"]`)) === null || _b === void 0 ? void 0 : _b.attr("disabled", "disabled");
                                }
                            }
                            $(this).attr("focusable", `${this.manageInputValue}`);
                        }
                        if (!flexygo.utils.isBlank(this.parentObjectName) || !flexygo.utils.isBlank(this.childObjectName)) {
                            this.renderTables();
                            this.adjustPaperSize();
                            this.mainEvents();
                            this.centerOffset();
                            this.adjustTablesPosition();
                            this.adjustWrapper();
                            if (this.confModule) {
                                this.setRelations();
                                this.adjustRelationLines();
                            }
                            this.updateDimentions();
                        }
                        else {
                            this.centerOffset();
                            this.updateDimentions();
                        }
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                /**
                * Refresh de webcomponent.
                * @method refresh
                */
                refresh() {
                    if ($(this).attr('manualInit') != 'true') {
                        this.clearRelations();
                        this.init(true);
                        this.adjustWrapper();
                        this.adjustRelationLines();
                        this.closest('flx-module').moduleLoaded();
                    }
                }
                /**
                * Render HTML data.
                * @method render
                */
                render() {
                    try {
                        let me = $(this);
                        let rendered = '';
                        rendered = `<div class="scroller-paper">
                                <div class="paper">
                                    <div class="relationship-container" scale="1" >
                                    </div>
                                    <div class="wrapper"></div>
                            </div>
                        </div>
                    </div>
                    <div class="relationship-toolbar">
                        <span class="relationship-buttons">
                            <b title="${flexygo.localization.translate('flxrelationship.zoomInButton')}" id="zoomRelationship" class="flx-icon icon-zoom-1" ></b>
                            <b title="${flexygo.localization.translate('flxrelationship.zoomOutButton')}" id="zoomOutRelationship" class="flx-icon icon-zoomout" ></b>
                            <b title="${flexygo.localization.translate('flxrelationship.suggestionsButton')}" id="relationshipSuggestions" class="flx-icon icon-idea2"></b>
                            <b title="${flexygo.localization.translate('flxrelationship.clearButton')}" id="clearRelationships" class="flx-icon icon-clean-1" ></b>
                        </span>
                    </div>`;
                        me.html(rendered);
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                renderTables(table = 'both') {
                    let renderedTables = ``;
                    if (!flexygo.utils.isBlank(this.parentObjectName)) {
                        if (table == 'parent-object' || table == 'both') {
                            $(this).find('.relationship-container>.parent-object').remove();
                            renderedTables += `<div class="table parent-object" ObjectName="${this.parentObjectName}" style="margin:0 3em 0 0;">
                                    <div class="tableTab"></div>
                                    <div class="relationship-header no-select">
                                        <span class="title">${this.parentObjectName}</span>
                                    </div>
                                    <div class="properties">
                                        ${this.renderProperties(this.parentObjectName, "parent-object")}
                                    </div>
                                </div>`;
                        }
                        else {
                            let parentObject = $(this).find('.parent-object');
                            renderedTables += parentObject.length > 0 ? parentObject[0].outerHTML : "";
                        }
                    }
                    else if (flexygo.utils.isBlank(this.parentObjectName) && $(this).find('.parent-object').length > 0) {
                        $(this).find('.relationship-container>.parent-object').remove();
                    }
                    if (!flexygo.utils.isBlank(this.childObjectName)) {
                        if (table == 'child-object' || table == 'both') {
                            $(this).find('.relationship-container>.child-object').remove();
                            renderedTables += `<div class="table child-object" ObjectName="${this.childObjectName}" style="margin: 0 0 0 3em;">
                                    <div class="tableTab"></div>
                                    <div class="relationship-header no-select">
                                        <span class="title">${this.childObjectName}</span>
                                    </div>
                                    <div class="properties">
                                        ${this.renderProperties(this.childObjectName, "child-object")}
                                    </div>
                                </div>`;
                        }
                        else {
                            let childObject = $(this).find('.child-object');
                            renderedTables += childObject.length > 0 ? childObject[0].outerHTML : "";
                        }
                    }
                    else if (flexygo.utils.isBlank(this.childObjectName) && $(this).find('.child-object').length > 0) {
                        $(this).find('.relationship-container>.child-object').remove();
                    }
                    $(this).find('.relationship-container').html(renderedTables);
                }
                renderProperties(ObjectName, selector) {
                    let container = $(`<div></div>`);
                    let rowTemplate = `<div class="tableRow" PropertyName="{{propertyName}}">
                                <div id="keyIcon" class="flx-icon icon-key-2 tableRowCol tableRowIcon"></div>
                                <div class="tableRowCol" data-type="columnName" title="{{propertyName}}">
                                    <span>{{propertyName}}</span>
                                </div>
                                <div class="tableRowCol" data-type="columnDataType" title="{{dataType}}">
                                    <span>{{dataType}}</span>
                                </div>
                                <div id="closeIcon" class="fa fa-close tableRowCol tableRowIcon"></div>
                            </div>`;
                    flexygo.ajax.syncPost('~/api/Edit', 'GetEditConfig', { ObjectName: ObjectName }, (response) => {
                        if (response) {
                            for (let property of Object.keys(response.Properties)) {
                                let clearType = response.Properties[property].DataType.split('.');
                                let dataType = clearType[clearType.length - 1].replace(/\d/g, '');
                                let row = flexygo.utils.parser.compile({ "propertyName": property, "dataType": dataType }, rowTemplate);
                                container.append(row);
                                if (response.Properties[property].Key) {
                                    container.find(`[PropertyName="${property}"] .tableRowIcon#keyIcon`).addClass("pkKey");
                                }
                                if (selector == "parent-object" && response.Properties[property].Key) {
                                    this.parentKeyProperties.push(property);
                                }
                            }
                        }
                    });
                    return container.html();
                }
                setObjects(e) {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                    let moduleConf = this.confModule ? this.confModule : $($(this).closest('main')).find(`flx-module[modulename="${this.confModuleName}"]`).length > 0 ? $($(this).closest('main')).find(`flx-module[modulename="${this.confModuleName}"]`)[0] : undefined;
                    if (((_b = (_a = e === null || e === void 0 ? void 0 : e.sender) === null || _a === void 0 ? void 0 : _a.moduleName) === null || _b === void 0 ? void 0 : _b.toLowerCase()) == this.confModuleName && $(moduleConf).length > 0 && $(moduleConf)[0] === e.sender) {
                        this.parentObjectName = $(e.sender).find('[property="ObjectName"]').val();
                        this.childObjectName = $(e.sender).find('[property="ChildCollection"]').val();
                        this.parentKeyProperties = [];
                        this.manageInputValue = !$(e.sender).find('[property="manual"]').val();
                        this.checkSintaxis = false;
                        if (!this.manageInputValue) {
                            (_c = $(this.confModule).find(`[property="${this.inputPropertyName}"]`)) === null || _c === void 0 ? void 0 : _c.removeAttr("disabled");
                        }
                        else {
                            (_d = $(this.confModule).find(`[property="${this.inputPropertyName}"]`)) === null || _d === void 0 ? void 0 : _d.attr("disabled", "disabled");
                        }
                        $(this).attr("focusable", `${this.manageInputValue}`);
                        this.confModule = $(e.sender);
                        this.renderTables();
                        //We hide the skeleton beffore adjusting the papersize so it gets properly calculated
                        const module = this.closest('flx-module');
                        flexygo.utils.modules.removeSkeleton(module);
                        this.adjustPaperSize();
                        this.mainEvents();
                        if (this.initialDimentions) {
                            this.initialDimentions["relationship-container"]["properties"]["height"] = $(this).find('.relationship-container')[0].getBoundingClientRect().height;
                        }
                        this.adjustTablesPosition();
                        this.adjustWrapper();
                        this.setRelations();
                        if (this.confModule && flexygo.utils.isBlank((_e = this.confModule.find(`[property="${this.secundaryInputPropertyName}"]`)) === null || _e === void 0 ? void 0 : _e.val())) {
                            let relationshipValue = (_g = (_f = this.confModule) === null || _f === void 0 ? void 0 : _f.find(`[property="${this.inputPropertyName}"]`)) === null || _g === void 0 ? void 0 : _g.val();
                            (_j = (_h = this.confModule) === null || _h === void 0 ? void 0 : _h.find(`[property="${this.secundaryInputPropertyName}"]`)) === null || _j === void 0 ? void 0 : _j.val(relationshipValue);
                        }
                        if (this.paperScale != 1) {
                            this.paperScale = 1;
                            this.resizePaper();
                        }
                        else {
                            this.adjustRelationLines();
                        }
                        this.updateDimentions();
                        flexygo.events.on(this, "property", "changed", this.onPropertyConfChange);
                    }
                }
                onPropertyConfChange(e) {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
                    if ((e === null || e === void 0 ? void 0 : e.sender) && $(e.sender).closest('flx-module')[0] === $(this.confModule)[0]) {
                        if (((_a = e === null || e === void 0 ? void 0 : e.masterIdentity) === null || _a === void 0 ? void 0 : _a.toLowerCase()) == 'objectname') {
                            let value = $(e.sender).val() ? $(e.sender).val() : "";
                            if (value.toLowerCase() != this.parentObjectName) {
                                this.parentObjectName = value;
                                (_c = (_b = this.confModule) === null || _b === void 0 ? void 0 : _b.find(`[property="${this.inputPropertyName}"]`)) === null || _c === void 0 ? void 0 : _c.val(null);
                                (_e = (_d = this.confModule) === null || _d === void 0 ? void 0 : _d.find(`[property="${this.secundaryInputPropertyName}"]`)) === null || _e === void 0 ? void 0 : _e.val(null);
                                this.parentKeyProperties = [];
                                this.clearRelations();
                                this.renderTables('parent-object');
                                this.adjustPaperSize();
                                this.mainEvents();
                                if (this.initialDimentions) {
                                    this.initialDimentions["relationship-container"]["properties"]["height"] = $(this).find('.relationship-container')[0].getBoundingClientRect().height;
                                }
                                if (this.paperScale == 1) {
                                    this.adjustTablesPosition();
                                    this.adjustWrapper();
                                    this.updateDimentions();
                                }
                                else {
                                    this.paperScale = 1;
                                    this.resizePaper();
                                }
                                this.suggestRelations();
                            }
                        }
                        else if (((_f = e === null || e === void 0 ? void 0 : e.masterIdentity) === null || _f === void 0 ? void 0 : _f.toLowerCase()) == 'childcollection') {
                            let value = $(e.sender).val() ? $(e.sender).val() : "";
                            if (value.toLowerCase() != this.childObjectName) {
                                this.childObjectName = value;
                                (_h = (_g = this.confModule) === null || _g === void 0 ? void 0 : _g.find(`[property="${this.inputPropertyName}"]`)) === null || _h === void 0 ? void 0 : _h.val(null);
                                (_k = (_j = this.confModule) === null || _j === void 0 ? void 0 : _j.find(`[property="${this.secundaryInputPropertyName}"]`)) === null || _k === void 0 ? void 0 : _k.val(null);
                                this.clearRelations();
                                this.renderTables('child-object');
                                this.adjustPaperSize();
                                this.mainEvents();
                                if (this.initialDimentions) {
                                    this.initialDimentions["relationship-container"]["properties"]["height"] = $(this).find('.relationship-container')[0].getBoundingClientRect().height;
                                }
                                if (this.paperScale == 1) {
                                    this.adjustTablesPosition();
                                    this.adjustWrapper();
                                    this.updateDimentions();
                                }
                                else {
                                    this.paperScale = 1;
                                    this.resizePaper();
                                }
                                this.suggestRelations();
                            }
                        }
                        else if (((_l = e === null || e === void 0 ? void 0 : e.masterIdentity) === null || _l === void 0 ? void 0 : _l.toLowerCase()) == 'manual') {
                            this.manageInputValue = !$(e.sender).val();
                            if (this.manageInputValue) {
                                (_m = $(this.confModule).find(`[property="${this.inputPropertyName}"]`)) === null || _m === void 0 ? void 0 : _m.attr("disabled", "disabled");
                            }
                            else {
                                (_o = $(this.confModule).find(`[property="${this.inputPropertyName}"]`)) === null || _o === void 0 ? void 0 : _o.removeAttr("disabled");
                            }
                            $(this).attr("focusable", `${this.manageInputValue}`);
                            this.mainEvents();
                            if (!this.manageInputValue) {
                                this.checkSintaxis = true;
                            }
                        }
                        else if (((_p = e === null || e === void 0 ? void 0 : e.masterIdentity) === null || _p === void 0 ? void 0 : _p.toLowerCase()) == this.inputPropertyName.toLowerCase() && this.manageInputValue == false) {
                            this.setRelations();
                        }
                        else if (((_q = e === null || e === void 0 ? void 0 : e.masterIdentity) === null || _q === void 0 ? void 0 : _q.toLowerCase()) == 'advanced') {
                            this.checkSintaxis = !$(e.sender).val();
                        }
                    }
                }
                updateDimentions() {
                    let wrapperTransform = /\(([^)]+)\)/g.exec($(this).find('.wrapper').css('transform'));
                    let wrapperTranslateValues = wrapperTransform ? wrapperTransform[1].split(',') : null;
                    let wrapperTranslateX = 0;
                    let wrapperTranslateY = 0;
                    if (wrapperTranslateValues && wrapperTranslateValues.length > 5) {
                        wrapperTranslateX = parseInt(wrapperTranslateValues[4]);
                        wrapperTranslateY = parseInt(wrapperTranslateValues[5]);
                    }
                    else if (this.initialDimentions && this.initialDimentions["wrapper"] && this.initialDimentions["wrapper"]["properties"]) {
                        wrapperTranslateX = this.initialDimentions["wrapper"]["properties"]["translateX"];
                        wrapperTranslateY = this.initialDimentions["wrapper"]["properties"]["translateY"];
                    }
                    this.initialDimentions = {
                        "table": {
                            "properties": { "width": flexygo.utils.parser.replaceAll($(this).find('.table').css("width"), "px", "") },
                            "elementData": {
                                "ListItem": {
                                    "selector": ".table .tableRow",
                                    "properties": {
                                        "font-size": flexygo.utils.parser.replaceAll($(this).find('.table .tableRow').css("font-size"), "px", ""),
                                        "padding": flexygo.utils.parser.replaceAll($(this).find('.table .tableRow').css("padding"), "px", ""),
                                        "height": flexygo.utils.parser.replaceAll($(this).find('.table .tableRow').css("height"), "px", "")
                                    }
                                },
                                "Icons": {
                                    "selector": ".table .tableRow .tableRowIcon",
                                    "properties": {
                                        "font-size": flexygo.utils.parser.replaceAll($(this).find('.table .tableRow .tableRowIcon').css("font-size"), "px", "")
                                    }
                                },
                                "TableTab": {
                                    "selector": ".table .tableTab",
                                    "properties": {
                                        "height": flexygo.utils.parser.replaceAll($(this).find('.table .tableTab').css("height"), "px", "")
                                    }
                                },
                                "Header": {
                                    "selector": ".table .relationship-header",
                                    "properties": {
                                        "margin": flexygo.utils.parser.replaceAll($(this).find('.table .relationship-header').css("margin"), "px", "")
                                    }
                                },
                                "Title": {
                                    "selector": ".table .title",
                                    "properties": {
                                        "font-size": flexygo.utils.parser.replaceAll($(this).find('.table .title').css("font-size"), "px", ""),
                                        "padding": flexygo.utils.parser.replaceAll($(this).find('.table .title').css("padding"), "px", "")
                                    }
                                },
                                "Table": {
                                    "selector": ".table",
                                    "properties": {
                                        "padding-bottom": flexygo.utils.parser.replaceAll($(this).find('.table').css("padding-bottom"), "px", "")
                                    }
                                }
                            },
                            "parent-object": {
                                "properties": {
                                    "margin": flexygo.utils.parser.replaceAll($(this).find('.table.parent-object').css("margin"), "px", ""),
                                    "height": $(this).find('.table.parent-object').height()
                                }
                            },
                            "child-object": {
                                "properties": {
                                    "margin": flexygo.utils.parser.replaceAll($(this).find('.table.child-object').css("margin"), "px", ""),
                                    "height": $(this).find('.table.child-object').height()
                                }
                            }
                        },
                        "paper": {
                            "properties": {
                                "width": flexygo.utils.parser.replaceAll($(this).find('.paper').css("width"), "px", ""),
                                "height": $(this).find('.paper').data('originalHeight')
                            }
                        },
                        "relationship-container": {
                            "properties": {
                                "width": $(this).find('.relationship-container').width(),
                                "height": $(this).find('.relationship-container').height(),
                                "padding": flexygo.utils.parser.replaceAll($(this).find('.relationship-container').css("padding"), "px", "")
                            }
                        },
                        "wrapper": {
                            "properties": {
                                "translateX": wrapperTranslateX,
                                "translateY": wrapperTranslateY,
                            }
                        }
                    };
                }
                clearRelations(refresh = false) {
                    var _a, _b;
                    let removedKeys = [];
                    flexygo.utils.showLoadingEffect(10000, $(this));
                    try {
                        for (let key of Object.keys(this.relations)) {
                            removedKeys.push(key.replace(/[^.]+\.([^-.]+)-[^-.]+\.([^-.]+)/, '$1=$2'));
                            this.removeRelation(key, false);
                        }
                        if (refresh) {
                            this.setNewRelationValue();
                            let secundaryInput = (_a = this.confModule) === null || _a === void 0 ? void 0 : _a.find(`[property="${this.secundaryInputPropertyName}"]`);
                            let currentSecundaryInputValues = (_b = secundaryInput === null || secundaryInput === void 0 ? void 0 : secundaryInput.val()) === null || _b === void 0 ? void 0 : _b.split("|");
                            let filteredArray = [];
                            for (let key of currentSecundaryInputValues) {
                                if (!removedKeys.includes(key)) {
                                    filteredArray.push(key);
                                }
                            }
                            currentSecundaryInputValues = filteredArray;
                            secundaryInput === null || secundaryInput === void 0 ? void 0 : secundaryInput.val(currentSecundaryInputValues === null || currentSecundaryInputValues === void 0 ? void 0 : currentSecundaryInputValues.join("|"));
                        }
                        $(this).find(`.properties .tableRow #closeIcon`).removeClass("relationship").removeAttr("title");
                    }
                    catch (ex) { }
                    finally {
                        flexygo.utils.removeLoadingEffect($(this));
                    }
                }
                /**
                * Main events.
                * @method mainEvents
                */
                mainEvents() {
                    let me = this;
                    //table draggable
                    $(this).find('.table').draggable({
                        cancel: ".tableRow", stack: ".table",
                        drag: me.adjustRelationLines,
                        scroll: false
                    });
                    if (this.manageInputValue == true) {
                        //Add Relation
                        $(this).find('.properties .tableRow').off('click.addRelation').on('click.addRelation', function () {
                            me.propertySelected(this);
                        });
                        //ShowContextMenu
                        $(this).find('.properties .tableRow #closeIcon').off("click.removeRelation").on("click.removeRelation", function (e) {
                            e.stopPropagation();
                            let PropertyName = $(this).closest(".tableRow").attr('PropertyName');
                            let ObjectName = $(this).closest('.table').attr('ObjectName');
                            flexygo.utils.showLoadingEffect(10000, $(me));
                            try {
                                for (let key of Object.keys(me.relations)) {
                                    let properties = key.split("-");
                                    if (properties[0] == `${ObjectName}.${PropertyName}` || properties[1] == `${ObjectName}.${PropertyName}`) {
                                        let tablename = properties[0].split(".")[0];
                                        let propertyname = properties[0].split(".")[1];
                                        $(me).find(`.table[objectname="${tablename}"] .properties .tableRow[propertyname="${propertyname}"] #closeIcon`).removeClass("relationship").removeAttr("title");
                                        tablename = properties[1].split(".")[0];
                                        propertyname = properties[1].split(".")[1];
                                        $(me).find(`.table[objectname="${tablename}"] .properties .tableRow[propertyname="${propertyname}"] #closeIcon`).removeClass("relationship").removeAttr("title");
                                        me.removeRelation(key, me.manageInputValue);
                                    }
                                }
                            }
                            catch (ex) { }
                            finally {
                                flexygo.utils.removeLoadingEffect($(me));
                            }
                        });
                        //Discard add relation
                        $(this).find('.paper').off('click.clearRelationsView').on('click.clearRelationsView', function (e) {
                            me.discardRelation(e);
                        });
                        $(this).find('.relationship-buttons [id="relationshipSuggestions"]').on('click.suggestRelations', function () { me.suggestRelations(); });
                    }
                    else {
                        $(this).find('.properties .tableRow').off('click.addRelation');
                        $(this).find('.properties .tableRow #closeIcon').off("click.removeRelation");
                        $(this).find('.paper').off('click.clearRelationsView');
                    }
                    //ZoomIn ZoomOut
                    $(this).find('.paper').off('mousewheel.paperZoom').on("mousewheel.paperZoom", function (e) {
                        let zoomLevel = me.paperScale;
                        let delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
                        if (delta > 0) {
                            zoomLevel += 0.2;
                        }
                        else {
                            zoomLevel -= 0.2;
                        }
                        zoomLevel = Math.min(Math.max(zoomLevel, 0.4), 3.0);
                        if (me.paperScale > 0.4 || me.paperScale < 3.0) {
                            me.paperScale = parseFloat(zoomLevel.toFixed(1));
                            me.resizePaper();
                        }
                        e.preventDefault();
                    });
                    $(this).find('.relationship-buttons [id="zoomRelationship"]').off('click.zoomButton').on('click.zoomButton', function (e) {
                        let zoomLevel = me.paperScale;
                        zoomLevel += 0.2;
                        zoomLevel = Math.min(Math.max(zoomLevel, 0.4), 3.0);
                        if (me.paperScale > 0.4 || me.paperScale < 3.0) {
                            me.paperScale = parseFloat(zoomLevel.toFixed(1));
                            me.resizePaper();
                        }
                    });
                    $(this).find('.relationship-buttons [id="zoomOutRelationship"]').off('click.zoomOutButton').on('click.zoomOutButton', function (e) {
                        let zoomLevel = me.paperScale;
                        zoomLevel -= 0.2;
                        zoomLevel = Math.min(Math.max(zoomLevel, 0.4), 3.0);
                        if (me.paperScale > 0.4 || me.paperScale < 3.0) {
                            me.paperScale = parseFloat(zoomLevel.toFixed(1));
                            me.resizePaper();
                        }
                    });
                    $(this).find('.relationship-buttons [id="clearRelationships"]').off('click.clearRelationsButton').on('click.clearRelationsButton', function () {
                        me.clearRelations(true);
                    });
                    $(this).find(".paper").draggable({
                        drag: function (event, ui) {
                            let paper = ui.helper;
                            let scrollerPaper = paper.closest('.scroller-paper');
                            if (me.previousOffset.left == null) {
                                me.previousOffset.left = ui.offset.left;
                                me.previousOffset.top = ui.offset.top;
                            }
                            else {
                                //limit the drag range to the limits of the scroller-paper
                                if (me.previousOffset.left < ui.offset.left && (paper[0].getBoundingClientRect().left >= scrollerPaper[0].getBoundingClientRect().left))
                                    return false;
                                if (me.previousOffset.left > ui.offset.left && paper[0].getBoundingClientRect().right <= scrollerPaper[0].getBoundingClientRect().right)
                                    return false;
                                if (me.previousOffset.top < ui.offset.top && paper[0].getBoundingClientRect().top >= scrollerPaper[0].getBoundingClientRect().top)
                                    return false;
                                if (me.previousOffset.top > ui.offset.top && paper[0].getBoundingClientRect().bottom <= scrollerPaper[0].getBoundingClientRect().bottom)
                                    return false;
                                me.previousOffset.left = ui.offset.left;
                                me.previousOffset.top = ui.offset.top;
                                me.adjustRelationLines();
                                //trigger the same drag to the wrapper
                                let parts = $(me).find(".paper").css("inset").split(" ");
                                let left = parseInt(parts[0]) * -1 + "px";
                                let right = parseInt(parts[3]) * -1 + "px";
                                let top = parts[1];
                                let bottom = parts[2];
                                let transformedValue = left + " " + top + " " + bottom + " " + right;
                                $(me).find(".wrapper").css("inset", transformedValue);
                                me.adjustWrapper();
                            }
                        }, scroll: false
                    });
                }
                propertySelected(selectedProperty) {
                    let selectedProperties = $(this).find('.properties .tableRow.selectedProperty');
                    let tableClass = $(selectedProperty).closest('.table')[0].classList[1];
                    let propertyName = $(selectedProperty).attr("propertyname");
                    if (selectedProperties.length > 0) {
                        let parentProperty = null;
                        let childProperty = null;
                        if ($(selectedProperties[0]).closest('.table')[0].classList.contains('parent-object')) {
                            parentProperty = selectedProperties[0];
                            childProperty = selectedProperty;
                        }
                        else {
                            parentProperty = selectedProperty;
                            childProperty = selectedProperties[0];
                        }
                        flexygo.utils.showLoadingEffect(10000, $(this));
                        try {
                            this.addRelation(parentProperty, childProperty, this.manageInputValue);
                        }
                        catch (ex) { }
                        finally {
                            flexygo.utils.removeLoadingEffect($(this));
                        }
                        $(selectedProperties).removeClass('selectedProperty');
                    }
                    else {
                        $(this).find(`.${tableClass} .tableRow[propertyname="${propertyName}"]`).addClass('selectedProperty');
                    }
                }
                addRelation(parentProperty, childProperty, refresh) {
                    let parentTable = parentProperty.closest('.table');
                    let childTable = childProperty.closest('.table');
                    let parentObjectName = $(parentTable).attr('ObjectName');
                    let childObjectName = $(childTable).attr('ObjectName');
                    let parentPropertyName = $(parentProperty).attr('Propertyname');
                    let childPropertyName = $(childProperty).attr('Propertyname');
                    let key = `${parentObjectName}.${parentPropertyName}-${childObjectName}.${childPropertyName}`;
                    let alreadyRelated = false;
                    let sameObject = parentObjectName === childObjectName;
                    for (let existingKey in this.relations) {
                        let [existingParentKey, existingChildKey] = existingKey.split("-");
                        if (existingParentKey === `${parentObjectName}.${parentPropertyName}` || existingChildKey === `${childObjectName}.${childPropertyName}`) {
                            alreadyRelated = true;
                            break;
                        }
                    }
                    if (!alreadyRelated && !sameObject) {
                        let nodes = this.getAnchorNodes(parentPropertyName, childPropertyName);
                        let line = new LeaderLine(nodes['start']['node'], nodes['end']['node'], { color: 'rgb(177, 177, 177)', startPlug: 'behind', endPlug: 'behind', startSocketGravity: '0', startSocket: nodes['start']['socket'], endSocket: nodes['end']['socket'], size: this.relationlineSize * this.paperScale });
                        this.relations[key] = line;
                        $(document.body).find('> .leader-line').attr("id", key);
                        let leaderLineElement = $(document.body).find(`> .leader-line[id="${key}"]`)[0];
                        $(this).find('.wrapper')[0].appendChild(leaderLineElement);
                        if (refresh) {
                            this.setNewRelationValue();
                        }
                        $(parentProperty).find('#closeIcon').addClass("relationship").attr("title", "Remove Relation");
                        $(childProperty).find('#closeIcon').addClass("relationship").attr("title", "Remove Relation");
                    }
                }
                setRelations() {
                    var _a, _b, _c, _d, _e, _f, _g;
                    flexygo.utils.showLoadingEffect(10000, $(this));
                    try {
                        this.clearRelations();
                        let invalidSyntax = false;
                        let invalidProperties = false;
                        let relationArray = (_c = (_b = (_a = this.confModule) === null || _a === void 0 ? void 0 : _a.find(`[property=${this.inputPropertyName}]`)) === null || _b === void 0 ? void 0 : _b.val()) === null || _c === void 0 ? void 0 : _c.split("|");
                        let newRelationString = "";
                        if (relationArray) {
                            const regex = /([a-zA-Z0-9_]+)=([a-zA-Z0-9_]+)/;
                            //anonymous function to optimize the use of Jquery
                            const findElement = (selector) => $(this).find(selector);
                            for (let relation of relationArray) {
                                if (regex.exec(relation)) {
                                    let properties = relation.split('=');
                                    let parentProperty = findElement(`.parent-object .properties .tableRow[propertyname="${properties[0]}"]`);
                                    let childProperty = findElement(`.child-object .properties .tableRow[propertyname="${properties[1]}"]`);
                                    if (parentProperty.length > 0 && childProperty.length > 0) {
                                        this.addRelation(parentProperty, childProperty, false);
                                        newRelationString += relation + "|";
                                    }
                                    else {
                                        invalidProperties = true;
                                    }
                                }
                                else {
                                    invalidSyntax = true;
                                }
                            }
                            if (invalidSyntax && this.checkSintaxis) {
                                flexygo.msg.warning(flexygo.localization.translate('flxrelationship.invalidSintaxis'), null);
                                (_e = (_d = this.confModule) === null || _d === void 0 ? void 0 : _d.find('[property="ObjectRelation"]')) === null || _e === void 0 ? void 0 : _e.val(newRelationString.replace(/(\|)$/, ''));
                            }
                            else if (invalidProperties && this.checkSintaxis) {
                                flexygo.msg.warning(flexygo.localization.translate('flxrelationship.invalidProperties'), null);
                                (_g = (_f = this.confModule) === null || _f === void 0 ? void 0 : _f.find('[property="ObjectRelation"]')) === null || _g === void 0 ? void 0 : _g.val(newRelationString.replace(/(\|)$/, ''));
                            }
                        }
                    }
                    catch (ex) {
                    }
                    finally {
                        flexygo.utils.removeLoadingEffect($(this));
                    }
                }
                suggestRelations() {
                    flexygo.utils.showLoadingEffect(10000, $(this));
                    try {
                        for (let key of this.parentKeyProperties) {
                            let childProperty = $(this).find(`.table.child-object .tableRow[PropertyName="${key}"]`);
                            if (childProperty.length > 0) {
                                let parentProperty = $(this).find(`.table.parent-object .tableRow[PropertyName="${key}"]`);
                                this.addRelation(parentProperty, childProperty, true);
                            }
                        }
                    }
                    catch (ex) { }
                    finally {
                        flexygo.utils.removeLoadingEffect($(this));
                    }
                }
                removeRelation(relationKey, refresh) {
                    var _a, _b, _c, _d;
                    let me = this;
                    let line = $(this).find(`.leader-line[id="${relationKey}"]`)[0];
                    if (line) {
                        $(document.body)[0].appendChild(line);
                        this.relations[relationKey].remove();
                    }
                    else {
                        let bodyLine = $(document.body).find(`> .leader-line[id="${relationKey}"]`);
                        if (bodyLine.length > 0) {
                            bodyLine.remove();
                        }
                    }
                    delete this.relations[relationKey];
                    $(this).find('#customContextMenu').addClass('hidden');
                    if (refresh) {
                        this.setNewRelationValue();
                        let removedRelation = relationKey.replace(/[^.]+\.([^-.]+)-[^-.]+\.([^-.]+)/, '$1=$2');
                        let defaults = (_b = (_a = this.confModule) === null || _a === void 0 ? void 0 : _a.find(`[property="${this.secundaryInputPropertyName}"]`)) === null || _b === void 0 ? void 0 : _b.val().split("|");
                        for (let relationIndex in defaults) {
                            if (defaults[relationIndex] == removedRelation) {
                                delete defaults[relationIndex];
                            }
                        }
                        let newInputValue = defaults.join("|");
                        (_d = (_c = this.confModule) === null || _c === void 0 ? void 0 : _c.find(`[property="${this.secundaryInputPropertyName}"]`)) === null || _d === void 0 ? void 0 : _d.val(newInputValue);
                    }
                }
                discardRelation(event) {
                    if (!$(event.target).is('.tableRow') && !$(event.target).is('span') && !$(event.target).is('.tableRowCol')) {
                        let selectedProperties = $(this).find('.properties .tableRow.selectedProperty');
                        if (selectedProperties.length > 0) {
                            $(selectedProperties).removeClass('selectedProperty');
                        }
                        $(this).find('#customContextMenu').addClass('hidden');
                    }
                }
                setNewRelationValue() {
                    var _a, _b, _c, _d, _e, _f;
                    let result = "";
                    let keys = Object.keys(this.relations);
                    let newKeys = [];
                    keys.forEach((key, index) => {
                        //removing the table/object name and replace - to =
                        newKeys.push(key.replace(/[^.]+\.([^-.]+)-[^-.]+\.([^-.]+)/, '$1=$2'));
                    });
                    result = newKeys.join("|");
                    (_b = (_a = this.confModule) === null || _a === void 0 ? void 0 : _a.find(`[property="${this.inputPropertyName}"]`)) === null || _b === void 0 ? void 0 : _b.val(result);
                    let lastRelation = result.split("|");
                    let currentSecundaryValue = (_d = (_c = this.confModule) === null || _c === void 0 ? void 0 : _c.find(`[property="${this.secundaryInputPropertyName}"]`)) === null || _d === void 0 ? void 0 : _d.val();
                    let secundaryInputValue = "";
                    if (flexygo.utils.isBlank(currentSecundaryValue)) {
                        secundaryInputValue = lastRelation[lastRelation.length - 1];
                    }
                    else {
                        secundaryInputValue = currentSecundaryValue + "|" + lastRelation[lastRelation.length - 1];
                    }
                    (_f = (_e = this.confModule) === null || _e === void 0 ? void 0 : _e.find(`[property="${this.secundaryInputPropertyName}"]`)) === null || _f === void 0 ? void 0 : _f.val(secundaryInputValue);
                }
                adjustRelationLines() {
                    let me = $(this).closest('flx-relationship')[0];
                    for (let key in me.relations) {
                        let line = me.relations[key];
                        let nodes = me.getAnchorNodes($(line.start).closest('.tableRow').attr("PropertyName"), $(line.end).closest('.tableRow').attr("PropertyName"));
                        line.setOptions({ size: me.relationlineSize * me.paperScale });
                        line.setOptions({ start: nodes['start']['node'], startSocket: nodes['start']['socket'] });
                        line.setOptions({ end: nodes['end']['node'], endSocket: nodes['end']['socket'] });
                        $('.leader-line').css("z-index", $(me).zIndex());
                        line.position();
                    }
                }
                adjustPaperSize() {
                    let currentPaperDimentions = { "width": 0, "height": 0 };
                    if (this.initialDimentions) {
                        currentPaperDimentions.width = parseFloat(this.initialDimentions["paper"]["properties"]["width"]);
                        currentPaperDimentions.height = parseFloat(this.initialDimentions["paper"]["properties"]["height"]);
                    }
                    else {
                        currentPaperDimentions.width = $(this).find('.paper')[0].getBoundingClientRect().width;
                        currentPaperDimentions.height = $(this).find('.paper')[0].getBoundingClientRect().height;
                    }
                    let widthDiff = currentPaperDimentions.width - flexygo.utils.parser.replaceAll($(this).find(".relationship-container").css("width"), "px", "");
                    let heightDiff = currentPaperDimentions.height - flexygo.utils.parser.replaceAll($(this).find(".relationship-container").css("height"), "px", "");
                    if (widthDiff < 400) {
                        let increaseSize = 400;
                        if (widthDiff < 0) {
                            increaseSize -= widthDiff;
                        }
                        $(this).find(".paper").css("height", currentPaperDimentions.width + increaseSize);
                    }
                    if (heightDiff < 400) {
                        let increaseSize = 400;
                        if (heightDiff < 0) {
                            increaseSize -= heightDiff;
                        }
                        $(this).find(".paper").css("height", currentPaperDimentions.height + increaseSize);
                    }
                }
                adjustTablesPosition() {
                    let conteinerHeight = 0;
                    let scrollerHeight = $(this).find('.scroller-paper')[0].getBoundingClientRect().height;
                    if (this.initialDimentions) {
                        conteinerHeight = this.initialDimentions["relationship-container"]["properties"]['height'];
                    }
                    else {
                        conteinerHeight = $(this).find('.relationship-container')[0].getBoundingClientRect().height;
                    }
                    if (scrollerHeight < conteinerHeight) {
                        this.centerOffset();
                        $(this).find('.relationship-container').css("top", 0);
                        let scrollerRects = $(this).find('.scroller-paper')[0].getBoundingClientRect();
                        let containerRects = $(this).find('.relationship-container')[0].getBoundingClientRect();
                        let newTop = (-(containerRects.top) + scrollerRects.top) + 10;
                        $(this).find('.relationship-container').css("top", newTop);
                        //The 3 refers to the maximum percentage of zoom
                        let maximumTablesHeight = (conteinerHeight * 3) + newTop;
                        if (scrollerHeight < maximumTablesHeight) {
                            let newHeight = scrollerHeight + Math.abs(conteinerHeight - maximumTablesHeight);
                            $(this).find('.paper').css('height', (newHeight + 300) + "px");
                        }
                        this.tablesPositioned = true;
                    }
                    else {
                        $(this).find('.relationship-container').css("top", '');
                        this.centerOffset();
                        this.tablesPositioned = false;
                    }
                }
                adjustWrapper() {
                    let wrapper = $(this).find('.wrapper');
                    wrapper.css({ "inset": "", "transform": "" });
                    let translateX = `${wrapper[0].getBoundingClientRect().left + pageXOffset}`;
                    let translateY = `${wrapper[0].getBoundingClientRect().top + pageYOffset}`;
                    if (this.initialDimentions && this.tablesPositioned) {
                        this.initialDimentions["wrapper"]["properties"]["translateX"] = -translateX;
                        this.initialDimentions["wrapper"]["properties"]["translateY"] = -translateY;
                    }
                    wrapper.css("transform", `translate(-${translateX}px,-${translateY}px)`);
                }
                resizePaper() {
                    let currentScale = parseFloat($(this).find('.relationship-container').attr("scale"));
                    if ((currentScale == 0.4 || currentScale == 3) && currentScale == this.paperScale)
                        return;
                    $(this).find('.relationship-container').data("lastScale", currentScale);
                    for (let key in this.initialDimentions["table"]["elementData"]) {
                        let element = this.initialDimentions["table"]["elementData"][key];
                        for (let property in element.properties) {
                            let value = element.properties[property];
                            this.scaleStyle(element.selector, property, value);
                        }
                    }
                    this.scaleStyle('.table', "width", this.initialDimentions["table"]["properties"]["width"]);
                    this.scaleStyle('.table.parent-object', 'top', flexygo.utils.parser.replaceAll($(this).find('.table.parent-object').css("top"), "px", ""), currentScale);
                    this.scaleStyle('.table.parent-object', 'left', flexygo.utils.parser.replaceAll($(this).find('.table.parent-object').css("left"), "px", ""), currentScale);
                    this.scaleStyle('.table.parent-object', 'min-height', this.initialDimentions["table"]["parent-object"]["properties"]["height"]);
                    this.scaleStyle('.table.child-object', 'top', flexygo.utils.parser.replaceAll($(this).find('.table.child-object').css("top"), "px", ""), currentScale);
                    this.scaleStyle('.table.child-object', 'left', flexygo.utils.parser.replaceAll($(this).find('.table.child-object').css("left"), "px", ""), currentScale);
                    this.scaleStyle('.table.child-object', 'min-height', this.initialDimentions["table"]["child-object"]["properties"]["height"]);
                    this.scaleStyle('.table.parent-object', 'margin', this.initialDimentions["table"]["parent-object"]["properties"]["margin"]);
                    this.scaleStyle('.table.child-object', 'margin', this.initialDimentions["table"]["child-object"]["properties"]["margin"]);
                    $(this).find('.relationship-container').attr("scale", this.paperScale);
                    $(this).find(".paper").css("inset", "");
                    this.centerOffset();
                    this.adjustTablesPosition();
                    this.adjustWrapper();
                    this.adjustRelationLines();
                }
                getAnchorNodes(firstPropertyName, secondPropertyName) {
                    let parentCoords = $(this).find('.parent-object')[0].getBoundingClientRect();
                    let nodes = { 'start': {}, 'end': {} };
                    let childCoords = $(this).find('.child-object')[0].getBoundingClientRect();
                    let halfWidth = parentCoords.width / 2;
                    if (childCoords.left >= parentCoords.left + halfWidth) {
                        nodes['start']['node'] = $(this).find('.parent-object').find(`.properties .tableRow[PropertyName="${firstPropertyName}"] .tableRowIcon#closeIcon`)[0];
                        nodes['start']['socket'] = 'right';
                        nodes['end']['node'] = $(this).find('.child-object').find(`.properties .tableRow[PropertyName="${secondPropertyName}"] .tableRowIcon#keyIcon`)[0];
                        nodes['end']['socket'] = 'left';
                    }
                    else if (childCoords.left <= parentCoords.left + halfWidth && Math.trunc(childCoords.right) > Math.trunc(parentCoords.left)) {
                        nodes['start']['node'] = $(this).find('.parent-object').find(`.properties .tableRow[PropertyName="${firstPropertyName}"] .tableRowIcon#keyIcon`)[0];
                        nodes['start']['socket'] = 'left';
                        nodes['end']['node'] = $(this).find('.child-object').find(`.properties .tableRow[PropertyName="${secondPropertyName}"] .tableRowIcon#keyIcon`)[0];
                        nodes['end']['socket'] = 'left';
                    }
                    else {
                        nodes['start']['node'] = $(this).find('.parent-object').find(`.properties .tableRow[PropertyName="${firstPropertyName}"] .tableRowIcon#keyIcon`)[0];
                        nodes['start']['socket'] = 'left';
                        nodes['end']['node'] = $(this).find('.child-object').find(`.properties .tableRow[PropertyName="${firstPropertyName}"] .tableRowIcon#closeIcon`)[0];
                        nodes['end']['socket'] = 'right';
                    }
                    return nodes;
                }
                scaleStyle(element, property, initialValue, currentScale = null) {
                    let result = "";
                    initialValue = initialValue ? initialValue : 0;
                    for (let currentVal of initialValue.toString().split(" ")) {
                        let scaledValue = currentScale ? (currentVal / currentScale) * this.paperScale : currentVal * this.paperScale;
                        result += scaledValue + "px ";
                    }
                    $(this).find(element).css(property, result);
                }
                showContextMenu(relationKey, event) {
                    let existingRelation = false;
                    for (let key in this.relations) {
                        if (key.includes(relationKey)) {
                            existingRelation = true;
                            break;
                        }
                    }
                    if (existingRelation) {
                        let customContextMenu = $(this).find("#customContextMenu");
                        customContextMenu.css({
                            top: event.clientY + "px",
                            left: event.clientX + "px",
                        });
                        customContextMenu.removeClass("hidden");
                    }
                }
                centerOffset(element = null) {
                    let context = element && element.tagName.toLowerCase() == 'flx-relationship' ? $(element)[0] : this;
                    if (context) {
                        let container = $(context).find('.scroller-paper')[0];
                        container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
                        container.scrollTop = (container.scrollHeight - container.clientHeight) / 2;
                    }
                }
            }
            wc.FlxRelationshipElement = FlxRelationshipElement;
        })(wc = ui_1.wc || (ui_1.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-relationship', flexygo.ui.wc.FlxRelationshipElement);
//# sourceMappingURL=flx-relationship.js.map