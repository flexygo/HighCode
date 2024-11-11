/**
 * @namespace flexygo.ui.wc
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var flexygo;
(function (flexygo) {
    var ui;
    (function (ui_1) {
        var wc;
        (function (wc) {
            /**
        * Library for the FlxChatGPTFieldsElement web component.
        *
        * @class FlxChatGPTFieldsElement
        * @constructor
        * @return {FlxChatGPTFieldsElement}
            */
            class FlxChatGPTFieldsElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                     * Boolean that controls whether or not the manual mode structure is checked
                     * @property checkSintaxis {boolean}
                     */
                    this.checkSintaxis = false;
                    this.previousOffset = { top: null, left: null, };
                    /**
                     * List of tables will be rendered
                     */
                    this.tables = [];
                    /**
                     * List of fields
                     */
                    this.tableFields = [];
                    /**
                     * List of type fields
                     */
                    this.typeFields = [];
                    /**
                     * List of fields pre-selected
                     */
                    this.selectedFields = [];
                    /**
                     * List of fields selected
                     */
                    this.fields = {};
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = this;
                    this.connected = true;
                    this.objectName = $(this).attr('ObjectName');
                    this.objectWhere = $(this).attr('ObjectWhere');
                    this.confModuleName = $(this).attr("ConfModuleName") ? $(this).attr("ConfModuleName") : "";
                    this.moduleName = $(this).attr('ModuleName');
                    this.paperScale = 1.0;
                    if (!this.checkVisibilityConfig()) {
                        return;
                    }
                    ;
                    flexygo.events.off(this, "module", "resized");
                    flexygo.events.off(this, "property", "changed");
                    flexygo.events.off(this, "module", "loaded");
                    flexygo.events.off(this, "module", "refreshed");
                    $(window).off('resize.tables').on('resize.tables', function () {
                        element.paperScale = 1;
                    });
                    flexygo.events.on(this, "module", "resized", function (e) {
                        this.refresh();
                    });
                    //flexygo.events.on(this, "module", "loaded", this.setObjects);
                    flexygo.events.on(this, "module", "refreshed", function (e) {
                        var _a, _b;
                        let me = this;
                        let moduleConf = this.confModule ? this.confModule : $($(this).closest('main')).find(`flx-module[modulename="${this.confModuleName}"]`).length > 0 ? $($(this).closest('main')).find(`flx-module[modulename="${this.confModuleName}"]`)[0] : undefined;
                        if (((_b = (_a = e === null || e === void 0 ? void 0 : e.sender) === null || _a === void 0 ? void 0 : _a.moduleName) === null || _b === void 0 ? void 0 : _b.toLowerCase()) == this.confModuleName && $(moduleConf).length > 0 && $(moduleConf)[0] === e.sender) {
                            flexygo.events.off(me, "property", "changed");
                        }
                    });
                    $("#mainContent").off('scroll.tables').on('scroll.tables', function () {
                        let initialX = element.initialDimentions["wrapper"]["properties"]["translateX"];
                        let initialY = element.initialDimentions["wrapper"]["properties"]["translateY"];
                        $(element).find(".wrapper").css("transform", `translate(${initialX + this.scrollLeft}px,${initialY + this.scrollTop}px)`);
                        element.adjustWrapper();
                    });
                    this.init();
                }
                /**
                * Fires when element is detached to DOM
                * @method disconnectedCallback
                */
                disconnectedCallback() {
                    flexygo.events.off(this, "module", "resized");
                    $(window).off('resize.tables');
                    $("#mainContent").off('scroll.tables');
                    flexygo.events.off(this, "property", "changed");
                    flexygo.events.off(this, "module", "loaded");
                    flexygo.events.off(this, "module", "refreshed");
                }
                /**
                * Monitor the list of observed attribute for changes.
                * @property observedAttributes
                */
                observedAttributes() {
                    return [];
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
                    return __awaiter(this, void 0, void 0, function* () {
                        try {
                            this.paperScale = 1.0;
                            $(this).removeAttr('manualInit');
                            $(this).closest('flx-module').find('.flx-noInitContent').remove();
                            $(this).closest("flx-module").removeClass("hidden");
                            yield this.getSavedTables();
                            this.render();
                            $(this).find('.tables-container').data("lastScale", this.paperScale);
                            let isFullScreen = $(this).closest("flx-module").hasClass("fullscreen");
                            if (isFullScreen) {
                                $(this).find('.scroller-paper').css({
                                    "height": "85vh",
                                    "width": "97vw"
                                });
                            }
                            $(this).find('.paper').css({
                                "height": $('#mainContent')[0].getBoundingClientRect().height * 3,
                                "width": $('#mainContent')[0].getBoundingClientRect().width * (this.tables.length / 2) > $(this).find('.scroller-paper').width() ? $('#mainContent')[0].getBoundingClientRect().width * (this.tables.length / 2) : $(this).find('.scroller-paper').width()
                            });
                            this.confModule = $(this).closest('main').find(`flx-module[modulename="${this.confModuleName}"]`);
                            //We hide the skeleton beffore adjusting the papersize so it gets properly calculated
                            const module = this.closest('flx-module');
                            if (module.skeleton) {
                                (_a = module.querySelector('.flxSkeleton')) === null || _a === void 0 ? void 0 : _a.remove();
                                (_b = module.querySelector('.cntBody')) === null || _b === void 0 ? void 0 : _b.classList.remove('displayingSkeleton');
                            }
                            this.renderTables();
                            this.adjustPaperSize();
                            this.getSelectedFields();
                            this.mainEvents();
                            this.updateDimentions();
                            this.centerOffset();
                            this.adjustWrapper();
                            this.adjustTablesPosition();
                            this.closest('flx-module').moduleLoaded(this);
                        }
                        catch (ex) {
                            console.log(ex);
                        }
                    });
                }
                /**
                * Refresh de webcomponent.
                * @method refresh
                */
                refresh() {
                    /*if ($(this).attr('manualInit') != 'true') {
                        this.init(true);
                    }*/
                    this.tables = [];
                    this.tableFields = [];
                    this.typeFields = [];
                    this.selectedFields = [];
                    this.fields = {};
                    if (this.checkVisibilityConfig()) {
                        this.init(true);
                    }
                    ;
                }
                checkVisibilityConfig() {
                    let entity = new flexygo.obj.Entity(this.objectName, this.objectWhere);
                    if (!entity.read()) {
                        return false;
                    }
                    if (!entity.data.CanAccessDB.Value) {
                        $(this).closest("flx-module").addClass("hidden");
                        return false;
                    }
                    return true;
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
                                    <div class="tables-container" scale="1" >
                                    </div>
                                    <div class="wrapper"></div>
                            </div>
                        </div>
                    </div>
                    <div class="tables-toolbar">
                        <span class="tables-buttons">
                            <b title="${flexygo.localization.translate('flxrelationship.zoomInButton')}" id="zoomInTables" class="flx-icon icon-zoom-1" ></b>
                            <b title="${flexygo.localization.translate('flxrelationship.zoomOutButton')}" id="zoomOutTables" class="flx-icon icon-zoomout" ></b>
                            <b title="${flexygo.localization.translate('flxchatgptfieldselector.addButton')}" id="addTables" class="flx-icon icon-plus-1"></b>
                            <b title="${flexygo.localization.translate('flxchatgptfieldselector.clearButton')}" id="clearTables" class="flx-icon icon-clean-1" ></b>
                            <b title="${flexygo.localization.translate('flxchatgptfieldselector.saveButton')}" id="saveTables" class="flx-icon icon-save" ></b>
                        </span>
                    </div>`;
                        me.html(rendered);
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                renderTables() {
                    let renderedTables = ``;
                    let i = 0;
                    this.tables.forEach(tableName => {
                        let fieldLines = ``;
                        let j = 0;
                        this.tableFields[i].forEach(fieldName => {
                            let isForeignKey = false;
                            let referencedField = "";
                            let isPrimaryKey = false;
                            if (fieldName.startsWith('$')) {
                                isPrimaryKey = true;
                                fieldName = fieldName.substr(1);
                            }
                            if (fieldName.indexOf('$$') !== -1) {
                                isPrimaryKey = true;
                                fieldName = fieldName.replace('$$', '$');
                            }
                            let count = 0;
                            for (let i = 0; i < fieldName.length; i++) {
                                if (fieldName.charAt(i) === '$') {
                                    count++;
                                }
                            }
                            while (count >= 1) {
                                let dollarPos = fieldName.indexOf('$');
                                isForeignKey = true;
                                referencedField += fieldName.substr(0, dollarPos) + "\n\t\t  ";
                                fieldName = fieldName.substr(dollarPos + 1);
                                count--;
                            }
                            // Comprobate if its in the saved select fields
                            let isSelected = this.selectedFields.indexOf(tableName + "." + fieldName) !== -1;
                            fieldLines += `<li PropertyName="${tableName + "." + fieldName}" ${isSelected ? 'class="selectedProperty"' : ''} ${`title="${fieldName + (isForeignKey ? "\nRelated to: " + referencedField : '')}"`}>
                                            
                                        <div class="chk">
                                            <span><input type="checkbox" ${isSelected ? 'checked' : ''}/></span>
                                        </div>    

                                        <div class="nameProperties">
                                            <span>${fieldName}</span>
                                        </div>

                                        <div class="typeProperties">
                                            <span>${this.typeFields[i][j]}
                                                ${isPrimaryKey ? '<i class="flx-icon icon-key-2"></i>' : ''}
                                                ${isForeignKey ? '<i class="flx-icon icon-arrow-31"></i>' : ''}
                                            </span>
                                        </div>
                                    </li>`;
                            j++;
                        });
                        renderedTables += `<div class="table parent-object" style="margin:0 4em 0 0;">
                                <div class="tableTab"></div>
                                <div class="tables-header" title="${tableName}">
                                    <span class="title">${tableName}</span>
                                </div>
                                    <div class="properties">
                                        <ul>
                                            ${fieldLines}
                                        </ul>
                                    </div>
                                </div>
                            </div>`;
                        i++;
                    });
                    $(this).find('.tables-container').html(renderedTables);
                    $(this).find('.table .tables-header').each((i, element) => {
                        let headerDims = element.getBoundingClientRect();
                        let titleDims = $(element).find('.title')[0].getBoundingClientRect();
                        if (headerDims.width < titleDims.width) {
                            $(element).css("justify-content", "start");
                            $(element).find('.title').css({ "width": "100%", "text-overflow": "ellipsis", "overflow": "hidden" });
                            $(element).attr("title", $(element).closest('.table').attr('objectname'));
                        }
                    });
                    $(this).find('.table .properties li').each((i, element) => {
                        let listItemDims = element.getBoundingClientRect();
                        let spanDims = $(element).find('span')[0].getBoundingClientRect();
                        if (listItemDims.width < spanDims.width) {
                            $(element).attr("title", $(element).attr('propertyname'));
                        }
                    });
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
                                    "selector": ".table li",
                                    "properties": {
                                        "font-size": flexygo.utils.parser.replaceAll($(this).find('.table li').css("font-size"), "px", ""),
                                        "padding": flexygo.utils.parser.replaceAll($(this).find('.table li').css("padding"), "px", "")
                                    }
                                },
                                "List": {
                                    "selector": ".table ul",
                                    "properties": {
                                        "padding": flexygo.utils.parser.replaceAll($(this).find('.table ul').css("padding"), "px", "")
                                    }
                                },
                                "TableTab": {
                                    "selector": ".table .tableTab",
                                    "properties": {
                                        "height": flexygo.utils.parser.replaceAll($(this).find('.table .tableTab').css("height"), "px", "")
                                    }
                                },
                                "Header": {
                                    "selector": ".table .tables-header",
                                    "properties": {
                                        "margin": flexygo.utils.parser.replaceAll($(this).find('.table .tables-header').css("margin"), "px", "")
                                    }
                                },
                                "Title": {
                                    "selector": ".table .title",
                                    "properties": {
                                        "font-size": flexygo.utils.parser.replaceAll($(this).find('.table .title').css("font-size"), "px", ""),
                                        "padding": flexygo.utils.parser.replaceAll($(this).find('.table .title').css("padding"), "px", "")
                                    }
                                }
                            },
                            "parent-object": {
                                "properties": {
                                    "margin": flexygo.utils.parser.replaceAll($(this).find('.table.parent-object').css("margin"), "px", ""),
                                    "height": $(this).find('.table.parent-object').height()
                                }
                            }
                        },
                        "paper": {
                            "properties": {
                                "width": flexygo.utils.parser.replaceAll($(this).find('.paper').css("width"), "px", ""),
                                "height": $(this).find('.paper').data('originalHeight')
                            }
                        },
                        "tables-container": {
                            "properties": {
                                "width": $(this).find('.tables-container').width(),
                                "height": $(this).find('.tables-container').height(),
                                "padding": flexygo.utils.parser.replaceAll($(this).find('.tables-container').css("padding"), "px", "")
                            }
                        },
                        "wrapper": {
                            "properties": {
                                "translateX": wrapperTranslateX,
                                "translateY": wrapperTranslateY,
                            }
                        },
                        "input": {
                            "properties": {
                                "width": $(this).find('input').width(),
                                "height": $(this).find('input').height()
                            }
                        }
                    };
                }
                /**
                * Main events.
                * @method mainEvents
                */
                mainEvents() {
                    let me = this;
                    //trigger hover event in list items(properties)
                    $(this).find('.properties ul').off('mouseenter.toogleHover').on('mouseenter.toogleHover', 'li', function () {
                        me.toogleOnHover(this, true);
                    });
                    //remove hover status in list items
                    $(this).find('.properties ul').off('mouseleave.toogleHover').on('mouseleave.toogleHover', 'li', function () {
                        me.toogleOnHover(this, false);
                    });
                    //Select Field
                    $(this).find('.properties ul').off('click.addTables').on('click.addTables', 'li', function () {
                        me.propertySelected(this, false);
                    });
                    //Add relateds field of a Field
                    $(this).find(('i.flx-icon.icon-arrow-31')).off('click.addTables').on('click.addTables', function () {
                        me.relatedSelected(this);
                    });
                    //Select/Deselect All Fields
                    $(this).find('.tables-header').on('dblclick', function () {
                        if ($(this).hasClass("allSelected")) {
                            $(this).removeClass("allSelected");
                            me.tableSelected($(this).closest('.table.parent-object'), false);
                        }
                        else {
                            $(this).addClass("allSelected");
                            me.tableSelected($(this).closest('.table.parent-object'), true);
                        }
                    });
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
                            me.resizePaper(e);
                        }
                        e.preventDefault();
                    });
                    $(this).find('.tables-buttons [id="zoomInTables"]').off('click.zoomButton').on('click.zoomButton', function (e) {
                        let zoomLevel = me.paperScale;
                        zoomLevel += 0.2;
                        zoomLevel = Math.min(Math.max(zoomLevel, 0.4), 3.0);
                        if (me.paperScale > 0.4 || me.paperScale < 3.0) {
                            me.paperScale = parseFloat(zoomLevel.toFixed(1));
                            me.resizePaper(e);
                        }
                    });
                    $(this).find('.tables-buttons [id="zoomOutTables"]').off('click.zoomOutButton').on('click.zoomOutButton', function (e) {
                        let zoomLevel = me.paperScale;
                        zoomLevel -= 0.2;
                        zoomLevel = Math.min(Math.max(zoomLevel, 0.4), 3.0);
                        if (me.paperScale > 0.4 || me.paperScale < 3.0) {
                            me.paperScale = parseFloat(zoomLevel.toFixed(1));
                            me.resizePaper(e);
                        }
                    });
                    $(this).find('.tables-buttons [id="addTables"]').off('click.addTables').on('click.addTables', function () {
                        me.getTables();
                    });
                    $(this).find('.tables-buttons [id="clearTables"]').off('click.clearTablesButton').on('click.clearTablesButton', function () {
                        return __awaiter(this, void 0, void 0, function* () {
                            yield me.clearTables();
                        });
                    });
                    $(this).find('.tables-buttons [id="saveTables"]').off('click.saveTablesButton').on('click.saveTablesButton', function () {
                        return __awaiter(this, void 0, void 0, function* () {
                            yield me.saveTables();
                        });
                    });
                    $(this).find(".paper").draggable({
                        drag: function (event, ui) {
                            if (me.previousOffset.left == null) {
                                me.previousOffset.left = ui.offset.left;
                                me.previousOffset.top = ui.offset.top;
                            }
                            else {
                                me.previousOffset.left = ui.offset.left;
                                me.previousOffset.top = ui.offset.top;
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
                propertySelected(selectedProperty, onlySelect) {
                    let chk = $(selectedProperty).find('input[type="checkbox"]');
                    if (onlySelect) {
                        $(selectedProperty).addClass('selectedProperty');
                        chk.prop('checked', true);
                    }
                    else {
                        $(selectedProperty).toggleClass('selectedProperty');
                        if ($(selectedProperty).hasClass('selectedProperty')) {
                            chk.prop('checked', true);
                        }
                        else {
                            chk.prop('checked', false);
                        }
                    }
                    this.getSelectedFields();
                }
                relatedSelected(selectedProperty) {
                    return __awaiter(this, void 0, void 0, function* () {
                        let titulo = $(selectedProperty).closest('li').attr('title');
                        this.propertySelected($(selectedProperty).closest('li'), true);
                        yield this.saveTables();
                        const lines = titulo.split('\n');
                        let names = new Set();
                        lines.forEach(line => {
                            let trimmedLine = line.trim();
                            if (trimmedLine.includes(':')) {
                                const parts = trimmedLine.split(':');
                                trimmedLine = parts[1].trim();
                            }
                            if (trimmedLine.includes('.')) {
                                const parts = trimmedLine.split('.');
                                names.add(parts[0] + ";" + parts[1] + "@int");
                            }
                        }); // We get the related fields set from the title
                        // Adding the tables
                        if (names.size > 0) {
                            this.addNewTables(names);
                        }
                    });
                }
                tableSelected(selectedTable, select) {
                    if (select) {
                        $(selectedTable).find('.properties ul').find('li').each(function () {
                            $(this).addClass('selectedProperty');
                            $(this).find('input[type="checkbox"]').prop('checked', true);
                        });
                    }
                    else {
                        $(selectedTable).find('.properties ul').find('li').each(function () {
                            $(this).removeClass('selectedProperty');
                            $(this).find('input[type="checkbox"]').prop('checked', false);
                        });
                    }
                    this.getSelectedFields();
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
                    let widthDiff = currentPaperDimentions.width - flexygo.utils.parser.replaceAll($(this).find(".tables-container").css("width"), "px", "");
                    let heightDiff = currentPaperDimentions.height - flexygo.utils.parser.replaceAll($(this).find(".tables-container").css("height"), "px", "");
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
                        conteinerHeight = this.initialDimentions["tables-container"]["properties"]['height'];
                    }
                    else {
                        conteinerHeight = $(this).find('.tables-container')[0].getBoundingClientRect().height;
                    }
                    if (scrollerHeight < conteinerHeight) {
                        $(this).find('.tables-container').css("top", 0);
                        let scrollerRects = $(this).find('.scroller-paper')[0].getBoundingClientRect();
                        let containerRects = $(this).find('.tables-container')[0].getBoundingClientRect();
                        let newTop = (-(containerRects.top) + scrollerRects.top) + 10;
                        $(this).find('.tables-container').css("top", newTop);
                        //The 3 refers to the maximum percentage of zoom
                        let maximumTablesHeight = (conteinerHeight * 3) + newTop;
                        if (scrollerHeight < maximumTablesHeight) {
                            let newHeight = scrollerHeight + Math.abs(conteinerHeight - maximumTablesHeight);
                            $(this).find('.paper').css('height', (newHeight + 300) + "px");
                        }
                        this.tablesPositioned = true;
                    }
                    else {
                        $(this).find('.tables-container').css("top", '');
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
                resizePaper(event) {
                    let currentScale = parseFloat($(this).find('.tables-container').attr("scale"));
                    if ((currentScale == 0.4 || currentScale == 3) && currentScale == this.paperScale)
                        return;
                    let $container = $(this).find('.tables-container');
                    $container.data("lastScale", currentScale);
                    // Scale all elements
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
                    this.scaleStyle('input', "height", this.initialDimentions["input"]["properties"]["height"]);
                    this.scaleStyle('input', "width", this.initialDimentions["input"]["properties"]["width"]);
                    // Update the scale attribute
                    $container.attr("scale", this.paperScale);
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
                toogleOnHover(element, onHover) {
                    if (onHover) {
                        let index = $(element).index();
                        let partSelected = element.closest('div').classList.value;
                        if (partSelected == 'typeProperties') {
                            $($(element).closest('.properties')).find('ul li').eq(index).addClass('active');
                        }
                        else {
                            $($(element).closest('.properties')).find('ul li').eq(index).addClass('active');
                        }
                    }
                    else {
                        let index = $(element).index();
                        let partSelected = element.closest('div').classList.value;
                        if (partSelected == 'typeProperties') {
                            $($(element).closest('.properties')).find('ul li').eq(index).removeClass('active');
                        }
                        else {
                            $($(element).closest('.properties')).find('ul li').eq(index).removeClass('active');
                        }
                    }
                }
                centerOffset(element = null) {
                    let context = element && element.tagName.toLowerCase() == 'flx-chagptfieldselector' ? $(element)[0] : this;
                    if (context) {
                        let container = $(context).find('.scroller-paper')[0];
                        container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
                        container.scrollTop = (container.scrollHeight - container.clientHeight) / 2;
                    }
                }
                clearTables() {
                    return __awaiter(this, void 0, void 0, function* () {
                        this.fields = {};
                        yield this.saveTables();
                    });
                }
                // Gets lis with the selectedProperty class
                getSelectedFields() {
                    let selectedFields = $(this).find('.table .properties ul .selectedProperty');
                    let allFields = {};
                    selectedFields.each(function () {
                        let propertyName = $(this).attr('propertyname');
                        if (propertyName) {
                            let parts = propertyName.split('.');
                            if (allFields.hasOwnProperty(parts[0])) {
                                allFields[parts[0]].push(parts[1]);
                            }
                            else {
                                allFields[parts[0]] = [parts[1]];
                            }
                        }
                    });
                    this.fields = allFields;
                }
                getTables() {
                    var loadingProcessPage = setInterval(() => {
                        if ($('[modulename="sysmod-edit-processparams"]').length > 0) {
                            let modal = $('[modulename="sysmod-edit-processparams"]').closest('.flx-dialog-modal');
                            let container = $(modal).find('main');
                            flexygo.utils.showLoadingEffect(0, container[0], null, null, true);
                            $(modal).find('.ui-dialog-title').html(`${flexygo.localization.translate('utils.loading')}...`);
                            clearInterval(loadingProcessPage);
                        }
                    }, 1);
                    flexygo.nav.execProcess("sysChatGPT_getTablesAndFields", this.objectName, this.objectWhere, null, null, "modal640x480", false, $(this), null, false, null, null);
                }
                // Stored Procedure to save the fields in the Datamodels table that are selected
                saveTables() {
                    return __awaiter(this, void 0, void 0, function* () {
                        let params = [];
                        params.push({ 'key': 'SettingId', 'value': this.confModule.find('[property="SettingId"]').val() }, { 'key': 'Json', 'value': JSON.stringify(this.fields) });
                        yield flexygo.nav.execProcess("sysChatGPT_saveTablesAndFields", this.objectName, this.objectWhere, null, params, "popup", false, $(this), (response) => {
                            flexygo.msg.success(flexygo.localization.translate('flxmodule.saved'));
                        }, false);
                        this.tables = [];
                        this.tableFields = [];
                        this.typeFields = [];
                        this.selectedFields = [];
                        this.fields = {};
                        yield this.getSavedTables();
                        this.getSelectedFields();
                        let mod = $(this).closest('flx-module')[0];
                        yield mod.refresh();
                        yield this.refresh();
                    });
                }
                // Gets the fields from the Datamodels tables. Used to obtain the tables when loading.
                getSavedTables() {
                    return __awaiter(this, void 0, void 0, function* () {
                        return new Promise((resolve, reject) => {
                            let SQLValidatorparams = {
                                objectWhere: this.objectWhere
                            };
                            // Call to the controller. Response: tableName;field1;field2;|tableName2;...;|...|...@tableName|fieldselected1;tableName2|fieldselected2...;...;
                            flexygo.ajax.syncPost('~/api/AI', 'GetSavedTables', SQLValidatorparams, (response) => {
                                let resp = response;
                                if (response !== "") {
                                    let all = resp.split("@"); //separate allFields from selectedFields: {tableName;field1;field2;|tableName2;...;|...|...} - {tableName|fieldselected1;tableName2|fieldselected2...|}
                                    let selectedfields = all[1].split(";"); //separate selected fields: {tableName|fieldselected1} - {tableName2|fieldselected2} - {...}}
                                    selectedfields.pop();
                                    let newTables = all[0].split("|"); // separate table and fields strings
                                    newTables.pop();
                                    let typefields = all[2].split("|");
                                    typefields.pop();
                                    // For each table and fields
                                    newTables.forEach((tables) => {
                                        let nameAndColumns = tables.split(";"); // separate table and fields {tableName} - {field1} - {field2} - ...
                                        nameAndColumns.pop();
                                        let names = [nameAndColumns.shift()]; //add the fields only the first
                                        this.tables.push(names[0]);
                                        let fields = [nameAndColumns];
                                        this.tableFields.push(...fields);
                                    });
                                    typefields.forEach((table) => {
                                        let types = table.split(";");
                                        types.pop();
                                        this.typeFields.push(...[types]);
                                    });
                                    this.selectedFields.push(...selectedfields); //add the selected fields
                                }
                                resolve(true);
                            }, (err) => { reject(err); });
                        });
                    });
                }
                // Given a array of tables, add them in the visualization 
                addNewTables(names) {
                    return __awaiter(this, void 0, void 0, function* () {
                        names.forEach((tables) => {
                            let typesAndTables = tables.split("@");
                            let nameAndColumns = typesAndTables[0].split(";");
                            let fieldTypes = typesAndTables[1].split(";");
                            let names = [nameAndColumns.shift()];
                            this.tables = Array.from(new Set([...this.tables, ...names]));
                            let fields = [nameAndColumns];
                            this.tableFields = Array.from(new Set([...this.tableFields, ...fields]));
                            let types = [fieldTypes];
                            this.typeFields = Array.from(new Set([...this.typeFields, ...types]));
                            let save = names[0] + "." + fields[0];
                            this.selectedFields.push(...[save]);
                        });
                        this.renderTables();
                        this.getSelectedFields();
                        yield this.saveTables();
                    });
                }
            }
            wc.FlxChatGPTFieldsElement = FlxChatGPTFieldsElement;
        })(wc = ui_1.wc || (ui_1.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-chatgptfieldselector', flexygo.ui.wc.FlxChatGPTFieldsElement);
//# sourceMappingURL=flx-chatgptfieldselector.js.map