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
            * Library for the FlxUserElement web component.
            *
            * @class FlxUserElement
            * @constructor
            * @return {FlxUserElement}
            */
            class FlxUserElement extends HTMLElement {
                constructor() {
                    super();
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    this.init();
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
                    let ctx = $(this);
                    let userdiv = $('<div class="profile-mini"><div><img class="img-responsive" src="' + flexygo.utils.resolveUrl(flexygo.profiles.avatar) + "?time=" + new Date().getTime() + '" alt="profile"></div><div><span>' + flexygo.profiles.username + '</span><p>' + flexygo.profiles.email + '</p></div></div>');
                    ctx.append(userdiv);
                    if (flexygo.utils.isSizeMobile()) {
                        userdiv.closest('li').on('click', () => {
                            flexygo.nav.openPage('view', 'sysUser', '(aspnetUsers.Id=\'' + flexygo.profiles.userid + '\')', null, 'current', false, null);
                        });
                    }
                    else {
                        let tooltip = '<flx-tooltip container="body" mode="popover" placement="bottom"><div class="profilepopover"><flx-view objectname="sysUser" objectwhere="(aspnetUsers.Id=\'' + flexygo.profiles.userid + '\')" modulename="sysmod-view-generic"></flx-view></div></flx-tooltip>';
                        ctx.prepend(tooltip);
                    }
                }
            }
            wc.FlxUserElement = FlxUserElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-user', flexygo.ui.wc.FlxUserElement);
//# sourceMappingURL=flx-user.js.map