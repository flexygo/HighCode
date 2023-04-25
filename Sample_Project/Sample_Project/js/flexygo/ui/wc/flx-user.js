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
                    ctx.empty();
                    let userdiv;
                    let imgSrc = '';
                    if (!(flexygo.profiles.avatar.toString().toLowerCase() == '~/img/avatars/avatar_blank.png')) {
                        imgSrc = flexygo.utils.resolveUrl(flexygo.profiles.avatar) + "?time=" + new Date().getTime();
                    }
                    if (flexygo.context.currentRoleId.toString().toLowerCase() == 'admins') {
                        let color;
                        switch (flexygo.context.currentOriginId) {
                            case '0':
                                color = 'txt-danger';
                                break;
                            case '1':
                                color = 'txt-warning';
                                break;
                            case '2':
                                color = 'txt-success';
                                break;
                            default:
                                color = 'txt-info';
                                break;
                        }
                        userdiv = $('<div class="profile-mini"><div><img class="img-responsive left hidden-s margin-right-s" is="flx-img" alt="' + flexygo.profiles.username.toUpperCase() + '" src="' + imgSrc + '" ><i title="Script & Download database" class="develop-only hover-outstanding clickable flx-icon icon-database icon-2x text-muted" onclick="event.stopPropagation();event.preventDefault();flexygo.nav.execProcess(\'ScriptDatabase\',\'sysObjects\',\'(offline = 0)\',\'null\',null,\'slideright\',false,$(this))" /></div><div><span class="develop-hidden">' + flexygo.profiles.username + '</span><p class="develop-hidden">' + flexygo.profiles.email + '</p><p class="develop-only ' + color + '" onclick="event.stopPropagation();event.preventDefault();flexygo.nav.execProcess(\'SetNewOrigin\',\'sysObjects\',null,null,null,\'modal640x480\',false,$(this))"><b style="font-size:1.5em">' + ((flexygo.context.currentOriginId || flexygo.context.currentOriginId == 0) ? flexygo.context.currentOriginId : '') + ' ' + (flexygo.context.currentOrigin ? flexygo.context.currentOrigin : '') + '</b> MODE</p></div></div>');
                    }
                    else {
                        userdiv = $('<div class="profile-mini"><div><img class="img-responsive" is="flx-img" alt="' + flexygo.profiles.username.toUpperCase() + '" src="' + imgSrc + '" ></div><div><span>' + flexygo.profiles.username + '</span><p>' + flexygo.profiles.email + '</p></div></div>');
                    }
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