/**
 * @namespace flexygo.ui.wc
 */
var flexygo;
(function (flexygo) {
    var ui;
    (function (ui_1) {
        var wc;
        (function (wc) {
            class KeyValue {
            }
            /**
            * Library for the FlxVoiceSearchElement web component.
            *
            * @class FlxVoiceSearchElement
            * @constructor
            * @return {FlxVoiceSearchElement}
            */
            class FlxVoiceSearchElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                    * Set when component is attached to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                    this.gridId = '';
                    this.template = '<li SearchId="{{SearchId}}" ObjectName="{{ObjectName}}"  ><div><input class="chk" type="checkbox" {{Active|bool:checked}}><i class="{{IconClass}} icon-margin-right icon-margin-left"></i><span>{{Descrip}}</span><i class="flx-icon icon-search icon-margin-left pull-right clickable txt-outstanding"></i></div></li>';
                    this.reordered = false;
                    this.recognizing = false;
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    this.connected = true;
                    this.gridId = $(this).attr('gridId');
                    this.refresh();
                }
                /**
                * Monitor the list of observed attribute for changes.
                * @property observedAttributes
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
                * Initialize Web Control
                * @method init
                */
                init() {
                    this.refresh();
                }
                /**
                * Refreses Web Control
                * @method refresh
                */
                refresh() {
                    var me = $(this);
                    me.empty();
                    var ctl = $('<div class="search input-group"><span class="main-search-btn"><i class="flx-icon icon-search"></i></span><div class="input-group search hidden"><span class="input-group-addon cnf"  id="main-search-voice-btn"><i class="flx-icon icon-help-1 size-s"></i></span><span class="input-group-addon cnf" ><span  id="main-search-cnf-btn"><i class="flx-icon icon-order-down"></i></span></span><input type="search" class="form-control voice" placeholder="' + flexygo.localization.translate('flxsearch.search') + '" ></input></div></div>');
                    //var ctl = $('<div class="search input-group"><span class="main-search-btn"><i class="flx-icon icon-search"></i></span><div class=""><input type="' + flexygo.localization.translate('flxsearch.search') + '" class="form-control voice" placeholder="Search..." ></input><span class="input-group-addon cnf"  id="main-search-voice-btn"><i class="flx-icon icon-help-1 size-s"></i></span><span class="input-group-addon cnf" ><span  id="main-search-cnf-btn"><i class="flx-icon icon-order-down"></i></span></span></div></div>');
                    ctl.find('.main-search-btn').on('click', () => {
                        this.search();
                    });
                    ctl.find('input').on('keypress', (e) => {
                        if (e.which == 13) {
                            this.search();
                            return false;
                        }
                    });
                    me.append(ctl);
                    this.loadSearchOptions();
                    let speechOk = false;
                    try {
                        if (webkitSpeechRecognition) {
                            speechOk = true;
                        }
                    }
                    catch (ex) {
                        speechOk = false;
                    }
                    if (speechOk) {
                        this.recognition = new webkitSpeechRecognition();
                        this.recognition.continuous = true;
                        this.recognition.onstart = () => {
                            me.find('input').attr('placeholder', flexygo.localization.translate('flxsearch.speak'));
                            this.recognizing = true;
                            this.restartTimer();
                        };
                        this.recognition.onend = () => {
                            this.recognizing = false;
                            this.clearTimer();
                            me.find('input').attr('placeholder', flexygo.localization.translate('flxsearch.search'));
                        };
                        this.recognition.onresult = (event) => {
                            this.clearTimer();
                            var finalTranscript = '';
                            for (var i = event.resultIndex; i < event.results.length; ++i) {
                                if (event.results[i].isFinal) {
                                    finalTranscript += event.results[i][0].transcript;
                                }
                            }
                            me.find('input').val(finalTranscript);
                            this.search();
                            this.restartTimer();
                        };
                        $('#main-search-voice-btn').on('click', () => {
                            if (this.recognizing) {
                                this.recognition.stop();
                                return;
                            }
                            me.find('input').val('');
                            this.recognition.start();
                        });
                    }
                    else {
                        $('#main-search-voice-btn').remove();
                    }
                }
                /**
                * Execute search based on user input
                * @method refresh
                */
                search(objectname = '') {
                    $(this).find('.notifyjs-wrapper').remove();
                    let inp = $(this).find('input');
                    if (inp.val() == '') {
                        flexygo.msg.error(flexygo.localization.translate('flxsearch.pleasewrite'), inp, null, 'bottom middle');
                    }
                    else {
                        $('#realMain').html('<div class="module-placeholder TopPosition" />');
                        flexygo.ui.search(inp.val(), $('#realMain').find('.module-placeholder'), objectname);
                        if (flexygo.utils.isSizeMobile()) {
                            $('#mainMenu').hide();
                        }
                    }
                }
                loadSearchOptions() {
                    flexygo.ajax.post('~/api/Sys', 'getUserSearchSettings', null, (response) => {
                        let arrOrdered = flexygo.utils.sortObject(response, 'Order');
                        this.SearchOptionsMenu(arrOrdered);
                    });
                }
                SearchOptionsMenu(ret) {
                    let me = $(this);
                    let cnt = '<flx-tooltip placement="bottom" container="body" mode="popover"><ul class="search-options sortable text-muted">';
                    $.each(ret, (i, e) => {
                        cnt += flexygo.utils.parser.compile(e, this.template, this);
                    });
                    cnt += '</ul><div id="main-search-settings" class="clickable develop-only txt-outstanding"><i class="flx-icon icon-admon" title="Search settings"></i></div></flx-tooltip>';
                    let sbtn = me.find('#main-search-cnf-btn');
                    sbtn.find("flx-tooltip").remove();
                    sbtn.append(cnt);
                    let tooltip = sbtn.find("flx-tooltip")[0];
                    if (tooltip && tooltip.pop) {
                        tooltip.pop.on("hidden.bs.popover", (e) => {
                            if (this.reordered) {
                                this.reordered = false;
                                me.find('#main-search-cnf-btn').popover("destroy");
                                setTimeout(() => {
                                    this.loadSearchOptions();
                                }, 500);
                            }
                        }).on('shown.bs.popover', () => {
                            $('.search-options.sortable').nestedSortable({
                                forcePlaceholderSize: true,
                                listType: 'ul',
                                handle: 'div',
                                helper: 'clone',
                                items: 'li',
                                opacity: .6,
                                placeholder: 'placeholder',
                                revert: 250,
                                tabSize: 25,
                                tolerance: 'pointer',
                                toleranceElement: '> div',
                                maxLevels: 0,
                                isTree: false,
                                expandOnHover: 700,
                                startCollapsed: false,
                                update: (e, ui) => {
                                    let arr = [];
                                    ui.item.parent().find('li').each((idx, el) => {
                                        arr.push({ key: $(el).attr('SearchId'), value: idx });
                                    });
                                    this.saveOrderOptions(arr);
                                },
                            }).disableSelection();
                            //set direct search
                            $('.search-options.sortable').find('.icon-search').on('click', (e) => {
                                let objectName = $(e.target).closest('li').attr('ObjectName');
                                this.search(objectName);
                                me.find('#main-search-cnf-btn').click();
                            });
                            //capture check event
                            $('.search-options.sortable').find('.chk').on('click', (e) => {
                                let itm = $(e.target);
                                this.updateCheck(itm);
                            });
                            //Capture settings event
                            $('#main-search-settings').on('click', () => {
                                tooltip.pop.popover("hide");
                                flexygo.debug.manageFilters('', '', true);
                            });
                        });
                    }
                }
                updateCheck(item) {
                    let params = {
                        SearchId: item.closest('li').attr('SearchId'),
                        Checked: item.prop('checked')
                    };
                    flexygo.ajax.post('~/api/Sys', 'saveUserSearchSettingsCheck', params, (response) => {
                        this.reordered = response;
                    });
                }
                saveOrderOptions(OrderedObjects) {
                    flexygo.ajax.post('~/api/Sys', 'saveUserSearchSettingsOrder', OrderedObjects, (response) => {
                        this.reordered = response;
                    });
                }
                restartTimer() {
                    this.timeout = setTimeout(() => {
                        this.recognition.stop();
                    }, 6000);
                }
                clearTimer() {
                    clearTimeout(this.timeout);
                }
            }
            wc.FlxVoiceSearchElement = FlxVoiceSearchElement;
        })(wc = ui_1.wc || (ui_1.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-voicesearch', flexygo.ui.wc.FlxVoiceSearchElement);
//# sourceMappingURL=flx-voicesearch.js.map