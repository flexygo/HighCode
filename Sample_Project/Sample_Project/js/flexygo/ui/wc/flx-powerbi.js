var flexygo;
(function (flexygo) {
    var ui;
    (function (ui) {
        var wc;
        (function (wc) {
            /**
            * Library for the flx-powerbi web component.
            *
            * @class FlxPowerBIElement
            * @constructor
            * @return {FlxPowerBIElement} .
            */
            class FlxPowerBIElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                   * Set when component is attached to DOM
                   * @property connected {boolean}
                   */
                    this.connected = false;
                    this.reportName = null;
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = $(this);
                    this.reportName = element.attr("reportname");
                    this.connected = true;
                    this.init();
                }
                /**
               * Array of observed attributes.
               * @property observedAttributes {Array}
               */
                static get observedAttributes() {
                    return ['reportname'];
                }
                /**
                * Fires when the attribute value of the element is changed.
                * @method attributeChangedCallback
                */
                attributeChangedCallback(attrName, oldVal, newVal) {
                    if (!this.connected) {
                        return;
                    }
                    if (attrName.toLowerCase() == 'reportname' && newVal && newVal != '') {
                        this.reportName = newVal;
                        if (this.reportName) {
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
                    if ($('script[ID="jspowerbi"]').length == 0) {
                        $('head').append('<script ID="jspowerbi" src="./js/plugins/powerbi/powerbi.min.js"></script>');
                    }
                    let me = $(this);
                    me.removeAttr('manualInit');
                    me.empty();
                    this.render();
                }
                /**
                * Render report.
                * @method render
                */
                render() {
                    let me = $(this);
                    me.append($('<div class="powerbi"></div>'));
                    this.startLoading();
                    let p = new flexygo.Process('GetPowerBISettings', '');
                    let params = new Array();
                    params.push({ Key: 'ReportName', Value: this.reportName });
                    p.run(params, (ret) => {
                        this.loadReport(ret.Data.Token, ret.Data.Url, ret.Data.Id);
                        this.stopLoading();
                    });
                }
                loadReport(accessToken, embedUrl, embedReportId) {
                    // Read embed application token from textbox
                    let me = $(this);
                    // Get models. models contains enums that can be used.
                    let models = window['powerbi-client'].models;
                    // Read embed type from radio
                    let tokenType = models.TokenType.Embed;
                    // We give All permissions to demonstrate switching between View and Edit mode and saving report.
                    let permissions = models.Permissions.All;
                    let config = {
                        type: 'report',
                        tokenType: tokenType == '0' ? models.TokenType.Aad : models.TokenType.Embed,
                        accessToken: accessToken,
                        embedUrl: embedUrl,
                        id: embedReportId,
                        permissions: permissions,
                        settings: {
                            filterPaneEnabled: true,
                            navContentPaneEnabled: true
                        }
                    };
                    // Get a reference to the embedded report HTML element
                    var embedContainer = me.find('.powerbi')[0];
                    // Embed the report and display it within the div container.
                    powerbi.embed(embedContainer, config);
                }
                /**
               * Start loading.
               * @method startLoading
               */
                startLoading() {
                    if ($(this).parents('flx-module').length > 0) {
                        $(this).parents('flx-module')[0].startLoading();
                    }
                }
                /**
               * Stop loading.
               * @method stopLoading
               */
                stopLoading() {
                    if ($(this).parents('flx-module').length > 0) {
                        $(this).parents('flx-module')[0].stopLoading();
                    }
                }
            }
            wc.FlxPowerBIElement = FlxPowerBIElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-powerbi', flexygo.ui.wc.FlxPowerBIElement);
//# sourceMappingURL=flx-powerbi.js.map