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
    (function (ui) {
        var wc;
        (function (wc) {
            /**
            * Library for the FlxRssElement web component.
            *
            * @class FlxRssElement
            * @constructor
            * @return {FlxRssElement}
            */
            class FlxRssElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                   * Set when component is attached to DOM
                   * @property connected {boolean}
                   */
                    this.connected = false;
                    this.moduleName = null;
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    this.connected = true;
                    this.moduleName = $(this).attr("modulename");
                    if (this.moduleName) {
                        if ($(this).attr('manualInit') != 'true') {
                            this.init();
                        }
                    }
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
                /**
               * Refresh de webcomponent.
               * @method refresh
               */
                refresh() {
                    if ($(this).attr('manualInit') != 'true') {
                        return this.init();
                    }
                    return;
                }
                /**
                * Init the webcomponent.
                * @method init
                */
                init() {
                    return __awaiter(this, void 0, void 0, function* () {
                        let me = $(this);
                        let module = $(this).closest('flx-module');
                        me.removeAttr('manualInit');
                        module.find('.flx-noInitContent').remove();
                        me.html('');
                        me.css("display", "block");
                        me.css('height', '130px');
                        //We show the loading spinner
                        if (module.length)
                            flexygo.utils.showLoadingEffect(0, module[0], null, "top", true);
                        let params = {
                            ObjectName: me.attr('ObjectName'),
                            ObjectWhere: me.attr('ObjectWhere'),
                            "ModuleName": this.moduleName,
                            "PageName": flexygo.history.getPageName(me)
                        };
                        if (this.getAttribute('mode') === 'GetVersionInfo') {
                            yield this.initVersionInfo(module, params);
                        }
                        else {
                            yield this.initRSS(module, params);
                        }
                        //We remove the display and height styles and hide the loading spinner even if there's an error
                        me.css("display", "initial");
                        me.css('height', 'inherit');
                        if (module.length)
                            flexygo.utils.removeLoadingEffect(module[0]);
                    });
                }
                initVersionInfo(module, params) {
                    return __awaiter(this, void 0, void 0, function* () {
                        //We check for version info
                        const has_version_info = yield this.setProductVersionInfo(params, module);
                        //If there's version info we render normally the component
                        if (has_version_info) {
                            this.render();
                            this.setMainEvents();
                        }
                        return;
                    });
                }
                setProductVersionInfo(params, module) {
                    return __awaiter(this, void 0, void 0, function* () {
                        //If no product info has already been loaded we search for it
                        if (!this.productsVersionInfo) {
                            try {
                                let response = yield flexygo.ajax.promisePost('~/api/Rss', 'GetVersionInfo', params, false, false);
                                //If a response is received we properly set the productsVersionInfo on the HTMLElement
                                if (response) {
                                    response.Products.forEach((product) => {
                                        product.Versions = JSON.parse(product.Versions);
                                    });
                                    this.productsVersionInfo = response.Products;
                                }
                                //If its contained inside a flx-module, we execute its moduleLoaded function
                                if (module.length) {
                                    module[0].moduleLoaded(this);
                                }
                            }
                            catch (err) {
                                flexygo.utils.modules.loadingErrorFunction(this.closest('flx-module'), err);
                            }
                        }
                        return this.productsVersionInfo ? true : false;
                    });
                }
                initRSS(module, params) {
                    return __awaiter(this, void 0, void 0, function* () {
                        try {
                            let response = yield flexygo.ajax.promisePost('~/api/Rss', 'GetHTML', params, false, false);
                            if (response)
                                $(this).html(response.Html);
                            //If its contained inside a flx-module, we execute its moduleLoaded function
                            if (module.length) {
                                module[0].moduleLoaded(this);
                            }
                        }
                        catch (err) {
                            flexygo.utils.modules.loadingErrorFunction(this.closest('flx-module'), err);
                        }
                        return;
                    });
                }
                render() {
                    let ulTabs = $('<ul class="nav nav-tabs"></ul>');
                    let tabTemplate = `<li class="flip-card flx-product-tab {{Id | switch:[Flexygo:active, else: ]}}" id="{{Id}}">
                                    <a class="product-header">
                                        <img class="flx-product-img {{IconUrl|isnull:hidden,}}" src="{{IconUrl}}"/>
                                        <span class="tabTitle">{{Id}}</span>
                                    </a>
                              </li>`;
                    let contents = $('<div/>');
                    let productInfoTemplate = `<div id="{{id}}" class="productInfo {{Id | switch:[Flexygo:active, else: ]}}">
                                            <div class="versions content">{{renderVersions({{productIndex}})}}</div>
                                       </div>`;
                    this.productsVersionInfo.forEach((product, productIndex) => {
                        ulTabs.append(flexygo.utils.parser.compile(product, tabTemplate));
                        let currentContent = $(flexygo.utils.parser.recursiveCompile({ productIndex: productIndex, id: product.Id }, productInfoTemplate, this));
                        contents.append(currentContent);
                    });
                    $(this).append(ulTabs);
                    contents.find('.version:has(empty) .collapsible').addClass("noContent");
                    contents.find('.version:has(empty) .collapsible .flx-icon').addClass("txt-muted");
                    contents.find('.version:has(empty)').attr("title", flexygo.localization.translate("flxrss.noreleasenotes"));
                    $(this).append(contents.html());
                }
                renderVersions(productIndex) {
                    let me = this;
                    if (this.productsVersionInfo[productIndex].Versions == null) {
                        return `<div class="box-info"><i class="flx-icon icon-information-2 icon-lg icon-margin-right"></i><span><strong>Info!</strong> ${flexygo.localization.translate('flxrss.notfound')}</span></div>`;
                    }
                    let versionTemplate = `<div class="version">
                                        <div id="{{numVersion}}" class="collapsible collapsed">
                                            <span class="flx-icon icon-arrow-head-1"></span>
                                            <span class="collapsible-text">{{numVersion}}</span>
                                            <span class="collapsible-date txt-warning size-xs">{{published}}</span>
                                        </div>
                                        <div id="{{numVersion}}" class="content" style="margin: 0 0 10px 10px;">
                                        {{renderReleaseNotes({{productIndex}},{{versionIndex}})}}
                                        </div>
                                  </div>`;
                    let versions = $('<div class="versionList"/>');
                    this.productsVersionInfo[productIndex].Versions.forEach((version, index) => {
                        let published = new Date(version.published).toLocaleDateString('ES-es', {
                            year: "2-digit",
                            month: "2-digit",
                            day: "2-digit"
                        });
                        versions.append(flexygo.utils.parser.recursiveCompile({ numVersion: version.version, productIndex: productIndex, versionIndex: index, published: published }, versionTemplate));
                    });
                    return versions.html();
                }
                renderReleaseNotes(productIndex, versionIndex) {
                    try {
                        let releaseNotesContent = this.productsVersionInfo[productIndex].Versions[versionIndex].releaseNotes;
                        if (flexygo.utils.isBlank(releaseNotesContent)) {
                            return "<empty></empty>";
                        }
                        let notesParts = releaseNotesContent.split("\n\n");
                        let mappedNotes = notesParts.reduce((acc, topic) => {
                            //separating topic and content by :
                            let topicFind = /\b(\w+)\s*:/.exec(topic);
                            let [key, value] = [topicFind[1].toLowerCase(), topic.substring(topicFind.index + topicFind[0].length).trim()];
                            //extract the last word of key (features,fixes,depricated)
                            key = /\b(\w+)\s*$/.exec(key.toLowerCase())[0];
                            //convert content into lines
                            value = value.trim();
                            acc[key] = value.split("\n");
                            return acc;
                        }, {});
                        let topics = $("<div/>");
                        let topicTemplate = `<div class="topic">
                                        <div id="{{topic}}" class="collapsible collapsed">
                                            <span class="flx-icon icon-arrow-head-1"></span>
                                            <span class="margin-left-s margin-right-s{{IconClass}}"></span>
                                            <span class="collapsible-text">{{topicTranslation}}</span>
                                        </div>
                                        <div id="{{topic}}" class="content" >
                                            {{content}}
                                        </div>
                                  </div>`;
                        for (let topic of Object.keys(mappedNotes)) {
                            let translation = flexygo.localization.translate(`flxrss.${topic}`);
                            let content = $("<ul/>");
                            mappedNotes[topic].forEach((line) => {
                                content.append(`<li>${line}</li>`);
                            });
                            let IconClass = topic === 'features' ? ' flx-icon icon-star' : topic === 'deprecated' ? ' flx-icon icon-skull' : topic === 'fixes' ? ' fa fa-bug' : '';
                            topics.append(flexygo.utils.parser.compile({ topic: topic, topicTranslation: translation, content: content[0].outerHTML, IconClass: IconClass }, topicTemplate));
                        }
                        return topics.html();
                    }
                    catch (ex) {
                        return flexygo.utils.parser.compile({ value: this.productsVersionInfo[productIndex].Versions[versionIndex].releaseNotes }, "{{value|string}}");
                    }
                }
                setMainEvents() {
                    let me = this;
                    $(this).find('.collapsible:not(.noContent)').off('click.collapsible').on('click.collapsible', function (e) {
                        $(this).attr('collapsed', 'expanded');
                        //avoid innecesary calls
                        if ($(this).attr('transitioning') != 'true') {
                            if ($(this).hasClass('collapsed')) {
                                $(this).attr('transitioning', 'true');
                                $(this).switchClass('collapsed', 'expanded');
                                $(this).find('span').addClass('txt-outstanding');
                            }
                            else {
                                $(this).attr('transitioning', 'true');
                                $(this).switchClass('expanded', 'collapsed');
                                $(this).find('span').removeClass('txt-outstanding');
                            }
                            $(this).next().toggle(200, function () {
                                //find the collapsible of the content expanded/collapsed
                                $(this).closest('.version').find(`.collapsible[id="${$(this).attr('id')}"]`).removeAttr('transitioning');
                                this.scrollIntoView({ behavior: "smooth" });
                            });
                        }
                    });
                    $(this).find('.flx-product-tab').off('click.selectTab').on('click.selectTab', function (e) {
                        if (!$(this).hasClass('active')) {
                            $(this).siblings('.flx-product-tab.active').removeClass('active');
                            $(this).addClass('active');
                            $(me).find('.productInfo.active').removeClass('active');
                            $(me).find(`.productInfo[id="${$(this).attr('id')}"]`).addClass('active');
                        }
                    });
                }
            }
            /**
                * Array of observed attributes.
                * @property observedAttributes {Array}
                */
            FlxRssElement.observedAttributes = ['modulename'];
            wc.FlxRssElement = FlxRssElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-rss', flexygo.ui.wc.FlxRssElement);
//# sourceMappingURL=flx-rss.js.map