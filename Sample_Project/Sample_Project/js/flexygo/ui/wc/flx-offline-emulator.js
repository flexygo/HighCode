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
            * Library for the FlxOfflineEmulator
            *
            * @class FlxOfflineEmulator
            * @constructor
                * @return {FlxOfflineEmulator} .
            */
            class FlxOfflineEmulator extends HTMLElement {
                constructor() {
                    //If a constructor is defined, is REQUIRED call the super constructor
                    super();
                    /**
                    * Set if element has been connected to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                    /**
                    * Ionic Mode
                    * @property ionicMode {string}
                    */
                    this.ionicMode = 'md';
                    /**
                    * Iframe Loaded
                    * @property iframeLoaded {boolean}
                    */
                    this.iframeLoaded = false;
                }
                /**
                * Array of observed attributes. REQUIRED
                * @property observedAttributes {Array}
                */
                static get observedAttributes() {
                    return ['ModuleName', 'url', 'mode'];
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
                    this.ionicWindow.postMessage({ action: 'reload' }, '*');
                }
                /**
                * Refresh pages from linked app.
                * @method refresh
                */
                refreshpages() {
                    this.ionicWindow.postMessage({ action: 'syncTemplates' }, '*');
                }
                /**
                * Render HTML data.
                * @method render
                */
                render() {
                    if (this.url) {
                        $(this).html([
                            this.renderModeToggle(),
                            this.renderDevice(),
                            this.renderHelpOptions(),
                        ].join(''));
                        this.setMainEvents();
                    }
                    else {
                        flexygo.msg.warning("The emulator needs the url attribute");
                    }
                }
                /**
                * Render Mode Toggle.
                * @method render
                */
                renderModeToggle() {
                    return (`<div class="mode-toggle" active-mode="${this.ionicMode}">
                    <div class="toggle-group">
                        ${[{ mode: 'ios', icon: 'fa fa-apple' }, { mode: 'md', icon: 'fa fa-android' }].map(platform => (`<button
                                ${(platform.mode === this.ionicMode) ? 'class= "rippled"' : ''}
                                data-toggle="tooltip" 
                                title="${flexygo.localization.translate('offlineemulator.' + platform.mode)}"
                                mode="${platform.mode}">
                                    <i class="${platform.icon}"/>
                            </button>`)).join('')}
                    </div>
                  </div>`);
                }
                /**
                * Render Device.
                * @method render
                */
                renderDevice() {
                    return (`<div class="device" mode="${this.ionicMode}">
                    <figure>
                      <svg class="device__md-bar" viewBox="0 0 1384.3 40.3">
                        <path class="st0" d="M1343 5l18.8 32.3c.8 1.3 2.7 1.3 3.5 0L1384 5c.8-1.3-.2-3-1.7-3h-37.6c-1.5 0-2.5 1.7-1.7 3z"/>
                        <circle class="st0" cx="1299" cy="20.2" r="20"/>
                        <path class="st0" d="M1213 1.2h30c2.2 0 4 1.8 4 4v30c0 2.2-1.8 4-4 4h-30c-2.2 0-4-1.8-4-4v-30c0-2.3 1.8-4 4-4zM16 4.2h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H16c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
                      </svg>
                      <svg class="device__ios-notch" viewBox="0 0 219 31">
                        <path d="M0 1V0h219v1a5 5 0 0 0-5 5v3c0 12.15-9.85 22-22 22H27C14.85 31 5 21.15 5 9V6a5 5 0 0 0-5-5z" fill-rule="evenodd"/>
                      </svg>
                      <iframe
                        loading="lazy"
                        importance="low"
                        src="${this.buildUrl()}"/>
                    </figure>
                  </div>`);
                }
                /**
                * Render Device.
                * @method render
                */
                renderHelpOptions() {
                    return (`<div class="help-options">
                   <i data-action="refreshpages" class="flx-icon icon-refresh" data-toggle="tooltip" data-placement="bottom" title="Refresh"/>
                   <i data-action="externalemulator" class="flx-icon icon-new-link" data-toggle="tooltip" data-placement="bottom" title="External emulator"/>
                  </div>`);
                }
                /**
                * Set Main Events.
                * @method setMainEvents
                */
                setMainEvents() {
                    $(this).find('.device>figure>iframe').off('load.offline-emulator').on('load.offline-emulator', (e) => {
                        this.iframeLoaded = true;
                        this.ionicWindow = e.currentTarget.contentWindow;
                    });
                    $(this).find('.mode-toggle>.toggle-group>button').off('click.offline-emulator').on('click.offline-emulator', (e) => {
                        if (this.ionicMode !== e.currentTarget.getAttribute("mode")) {
                            this.setAttribute('mode', e.currentTarget.getAttribute("mode"));
                            setTimeout(() => {
                                $(this).find('.mode-toggle>.toggle-group>button').removeClass('rippled').filter(`[mode="${e.currentTarget.getAttribute("mode")}"]`).addClass('rippled');
                            }, 500);
                        }
                    }).hover((e) => {
                        if (e.currentTarget.getAttribute("mode") !== this.ionicMode) {
                            $(this).find('.mode-toggle>.toggle-group').addClass('chage-mode');
                        }
                    }, (e) => {
                        $(this).find('.mode-toggle>.toggle-group').removeClass('chage-mode');
                    });
                    $(this).find('.help-options>[data-action]').off('click.offline-emulator').on('click.offline-emulator', (e) => {
                        switch ($(e.currentTarget).attr('data-action')) {
                            case 'refreshpages':
                                this.refreshpages();
                                break;
                            case 'externalemulator':
                                window.open(this.buildUrl());
                                break;
                        }
                    });
                    $(this).find('[data-toggle="tooltip"]').tooltip({ container: 'body', trigger: 'hover', delay: { show: 600, hide: 0 } });
                }
                /**
                * Change Url.
                * @method changeUrl
                */
                changeUrl() {
                    $(this).find('.device>figure>iframe').attr('src', this.buildUrl());
                }
                /**
                * Change Mode.
                * @method changeMode
                */
                changeMode() {
                    $(this).find('.mode-toggle').attr("active-mode", this.ionicMode);
                    $(this).find('.device').attr("mode", this.ionicMode);
                    $(this).find('.device>figure>iframe').attr('src', this.buildUrl());
                    $(this).find('.mode-toggle>.toggle-group').removeClass('chage-mode');
                }
                /**
                * Build Url.
                * @method buildUrl
                */
                buildUrl() {
                    return `${this.url}?ionic:mode=${this.ionicMode}`;
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = $(this);
                    this.connected = true;
                    this.moduleName = element.attr("modulename");
                    this.url = element.attr("url");
                    element.attr("mode", this.ionicMode);
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
                    else if (attrName.toLowerCase() == 'url' && newVal && newVal != '') {
                        this.url = newVal;
                        if (this.connected) {
                            this.changeUrl();
                        }
                    }
                    else if (attrName.toLowerCase() == 'mode' && newVal && newVal != '') {
                        this.ionicMode = newVal;
                        if (this.connected) {
                            this.changeMode();
                        }
                    }
                    if (this.connected && needInit) {
                        this.init();
                    }
                }
            }
            wc.FlxOfflineEmulator = FlxOfflineEmulator;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define("flx-offline-emulator", flexygo.ui.wc.FlxOfflineEmulator);
//# sourceMappingURL=flx-offline-emulator.js.map