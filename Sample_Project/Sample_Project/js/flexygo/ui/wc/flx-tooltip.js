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
            * Library for the FlxToolTipElement web component.
            *
            * @class FlxToolTipElement
            * @constructor
            * @return {FlxToolTipElement}
            */
            class FlxToolTipElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                   * Set when component is attached to DOM
                   * @property connected {boolean}
                   */
                    this.connected = false;
                    this.objectName = "";
                    this.objectWhere = "";
                    this.templateId = "";
                    this.container = "";
                    this.helpId = "";
                    this.desktopOnly = false;
                    this.opened = false;
                    this.elementid = "";
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let me = $(this);
                    this.connected = true;
                    this.objectName = me.attr("objectname");
                    this.objectWhere = me.attr("objectwhere");
                    this.templateId = me.attr("templateid");
                    this.placement = me.attr("placement");
                    this.container = me.attr("container");
                    this.helpId = me.attr("helpid");
                    this.mode = (me.attr("mode") || "");
                    if (this.mode.length == 0) {
                        this.mode = "tooltip";
                    }
                    if (me.attr("desktoponly") && me.attr("desktoponly").toLocaleLowerCase() == 'true') {
                        this.desktopOnly = true;
                    }
                    this.innerContent = me.html();
                    me.html("");
                    this.init();
                }
                /**
              * Fires when element is detached from DOM
              * @method disconnectedCallback
              */
                disconnectedCallback() {
                    if (this.opened === true) {
                        $('#' + this.pop.attr('aria-describedby')).remove();
                    }
                }
                /**
                * Monitor the list of observed attribute for changes.
                * @property observedAttributes
                */
                static get observedAttributes() {
                    return ["objectname", "objectwhere", "templateid", "placement", "container", "mode", "helpId"];
                }
                /**
                * Fires when the attribute value of the element is changed.
                * @method attributeChangedCallback
                */
                attributeChangedCallback(attrName, oldVal, newVal) {
                    if (!this.connected) {
                        return;
                    }
                    let isDirty = false;
                    switch (attrName) {
                        case "objectname":
                            if (this.objectName !== newVal) {
                                this.objectName = newVal;
                                isDirty = true;
                            }
                            break;
                        case "objectwhere":
                            if (this.objectWhere !== newVal) {
                                this.objectWhere = newVal;
                                isDirty = true;
                            }
                            break;
                        case "templateid":
                            if (this.templateId !== newVal) {
                                this.templateId = newVal;
                                isDirty = true;
                            }
                            break;
                        case "placement":
                            if (this.placement !== newVal) {
                                this.placement = newVal;
                                isDirty = true;
                            }
                            break;
                        case "container":
                            if (this.container !== newVal) {
                                this.container = newVal;
                                isDirty = true;
                            }
                            break;
                        case "mode":
                            if (this.mode !== newVal) {
                                this.mode = newVal;
                                isDirty = true;
                            }
                            break;
                        case "helpId":
                            if (this.helpId !== newVal) {
                                this.helpId = newVal;
                                isDirty = true;
                            }
                            break;
                    }
                    if (isDirty === true) {
                        this.refresh();
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
                    if (this.desktopOnly == true && flexygo.utils.isSizeMobile()) {
                        return;
                    }
                    let parent = $(this).parent();
                    let content = null;
                    let trigger = (this.mode === "tooltip") ? "hover" : "manual";
                    this.hasObjectTemplate = (this.objectName && this.objectName.length > 0 && this.objectWhere && this.objectWhere.length > 0 && this.templateId && this.templateId.length > 0);
                    let placement = (this.placement && this.placement.length > 0) ? this.placement : "auto";
                    let container = (this.container && this.container.length > 0) ? this.container : false;
                    this.pop = parent.popover({
                        title: null,
                        html: true,
                        placement: placement,
                        content: flexygo.utils.loadingMsg(),
                        trigger: trigger,
                        container: container
                    }).on('show.bs.popover', (e) => {
                        $('flx-tooltip').each((i, e) => {
                            if (e === this) {
                                //set content only first time
                                if (!content) {
                                    if (this.helpId) {
                                        content = flexygo.nav.getHelpContent(this.helpId);
                                    }
                                    else {
                                        if (this.hasObjectTemplate) {
                                            content = flexygo.environment.getTemplate(this.objectName, this.objectWhere, this.templateId);
                                        }
                                        else {
                                            content = this.innerContent;
                                        }
                                    }
                                }
                                if (content) {
                                    this.pop.attr('data-content', content);
                                }
                                else {
                                    e.pop.popover('hide');
                                }
                            }
                            else {
                                //Hide all other flx-tooltip
                                if (e.opened === true) {
                                    e.pop.popover('hide');
                                }
                            }
                        });
                    }).on('shown.bs.popover', (e) => {
                        this.elementid = $(e.target).attr('aria-describedby');
                        if (this.mode === "popover") {
                            $(document).on('click.flxtooltip.' + this.elementid, (e) => {
                                //Allow nested clicks on tooltip
                                let tt = $(e.target).closest('.popover');
                                if (tt.length > 0 && (tt.first().attr("id") == this.elementid)) {
                                    return;
                                }
                                else {
                                    $(document).off('click.flxtooltip.' + this.elementid);
                                    this.pop.popover('hide');
                                    this.opened = false;
                                }
                            });
                        }
                    }).on('hide.bs.popover', (e) => {
                        this.opened = false;
                    });
                    if (trigger === "hover") {
                        parent.on("mouseover.flxtooltip", () => {
                            if (this.opened === false) {
                                this.opened = true;
                                this.pop.popover('show');
                            }
                        });
                    }
                    else {
                        parent.on("click.flxtooltip", () => {
                            if (this.opened === false) {
                                this.opened = true;
                                this.pop.popover('show');
                            }
                        });
                    }
                }
            }
            wc.FlxToolTipElement = FlxToolTipElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-tooltip', flexygo.ui.wc.FlxToolTipElement);
//# sourceMappingURL=flx-tooltip.js.map