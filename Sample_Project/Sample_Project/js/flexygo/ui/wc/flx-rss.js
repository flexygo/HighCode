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
                        this.init();
                    }
                }
                /**
                * Init the webcomponent.
                * @method init
                */
                init() {
                    let me = $(this);
                    me.removeAttr('manualInit');
                    $(this).closest('flx-module').find('.flx-noInitContent').remove();
                    me.html('');
                    me.css("display", "block");
                    me.css('height', '130px');
                    let params = {
                        ObjectName: me.attr('ObjectName'),
                        ObjectWhere: me.attr('ObjectWhere'),
                        "ModuleName": this.moduleName,
                        "PageName": flexygo.history.getPageName(me)
                    };
                    if (this.productsVersionInfo == undefined) {
                        flexygo.ajax.post('~/api/Rss', 'GetVersionInfo', params, (response) => {
                            if (response) {
                                response.Products.forEach((product) => {
                                    product.Versions = JSON.parse(product.Versions);
                                });
                                this.productsVersionInfo = response.Products;
                                this.render();
                                this.setMainEvents();
                                flexygo.utils.removeLoadingEffect(me.closest('flx-module')[0]);
                            }
                        }, null, () => {
                            me.css("display", "initial");
                            me.css('height', 'inherit');
                            flexygo.utils.removeLoadingEffect(me.closest('flx-module')[0]);
                        }, () => {
                            flexygo.utils.showLoadingEffect(0, me.closest('flx-module')[0], null, "top", true);
                        });
                    }
                    else {
                        flexygo.utils.showLoadingEffect(0, me.closest('flx-module')[0], null, "top", true);
                        this.render();
                        this.setMainEvents();
                        flexygo.utils.removeLoadingEffect(me.closest('flx-module')[0]);
                    }
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
                        let notesParts = this.productsVersionInfo[productIndex].Versions[versionIndex].releaseNotes.split("\n\n");
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
                    $(this).find('.collapsible').off('click.collapsible').on('click.collapsible', function (e) {
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