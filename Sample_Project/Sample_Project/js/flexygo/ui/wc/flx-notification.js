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
            * Library for the FlxNotificationElement web component.
            *
            * @class FlxNotificationElement
            * @constructor
            * @return {FlxNotificationElement}
            */
            class FlxNotificationElement extends HTMLElement {
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
               * Fires when element is detached to DOM
               * @method disconnectedCallback
               */
                disconnectedCallback() {
                    //Remove event handler
                    flexygo.events.off(this, 'push', 'notify', function (e) {
                        if (e.masterIdentity == 'updateBadgeNotice' && typeof e.sender['pendingNotices'] != 'undefined') {
                            this.updateBadge(e.sender.pendingNotices, true);
                        }
                    });
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
                * Initialize Web Control
                * @method init
                */
                init() {
                    flexygo.events.on(this, 'push', 'notify', function (e) {
                        if (e.masterIdentity == 'updateBadgeNotice' && typeof e.sender['pendingNotices'] != 'undefined') {
                            this.updateBadge(e.sender.pendingNotices, true);
                        }
                    });
                    return this.refresh();
                }
                /**
                * Refreses Web Control
                * @method refresh
                */
                refresh() {
                    let ctx = $(this);
                    let notySpan = $('<span class="notify-dropdown"> <i class="flx-icon icon-bell-2 "></i> <b id="notifyBadge" class="badge  bounceIn animated"></b> </span>');
                    ctx.append(notySpan);
                    if (flexygo.utils.isSizeMobile()) {
                        notySpan.closest('li').on('click', () => {
                            flexygo.nav.openPageName('syspage-notify', 'sysNotices', '', null, 'current', false, null);
                        });
                    }
                    else {
                        let tooltip = $(`<flx-tooltip container="body" mode="popover" placement="bottom">
                                    <div class="notifypopover">
                                        <h4 class="text-center notificationsTitle"><i class="fa fa-bell-o icon-margin-right"></i>${flexygo.localization.translate('flxnotification.title')}</h4>
                                        <flx-list objectname="sysNotices" objectwhere="" modulename="sysmod-Notification-list"/>
                                        <div class="row">
                                            <div class="btn-group notifypopover-buttons">
                                                <button class="size-xs btn btn-default showAll" onclick="$(document).find('flx-notification')[0].showAll(this)">${flexygo.localization.translate('flxnotification.showAll')}</button>
                                                <button class="size-xs btn btn-default" onclick="$(document).find('flx-notification')[0].markAsRead(this,null)">${flexygo.localization.translate('flxnotification.allOk')}</button>
                                            </div>
                                        </div>
                                    </div>
                               </flx-tooltip>`);
                        ctx.prepend(tooltip);
                    }
                    return this.refreshBadge();
                }
                /**
               * Navigates to notify node specification
               * @method goToNotice
               */
                goToNotice(elm, noticeId) {
                    let params = {
                        NoticeId: noticeId
                    };
                    flexygo.ajax.post('~/api/Notify', 'GetNotice', params, (response) => {
                        if (response) {
                            let lfnav = new flexygo.ui.wc.FlxNavElement();
                            var itemClick = new Function(lfnav.getTreeNavigate(flexygo.utils.lowerKeys(response)));
                            itemClick.call(elm);
                        }
                    });
                }
                /**
                * Checks and refresh Notify Badge
                * @method refreshBadge
                */
                refreshBadge() {
                    if ($('#notifyBadge')) {
                        return new Promise((resolve, _) => {
                            flexygo.ajax.post('~/api/Notify', 'GetBadgeValue', null, 
                            //Success Function
                            (response) => {
                                this.updateBadge(response, false);
                                resolve();
                            }, 
                            //Error Function
                            err => {
                                flexygo.utils.modules.loadingErrorFunction(this.closest('flx-module'), err);
                                resolve();
                            });
                        });
                    }
                    return;
                }
                /**
                * Refereshes Notify Badge
                * @method updateBadge
                * @param {number} pendingNotices - Number of pending notices
                * @param {boolean} sound - Reproduces sound or not.
                */
                updateBadge(pendingNotices, sound) {
                    var currentNotices = $('#notifyBadge').html();
                    if (!currentNotices || currentNotices == '') {
                        currentNotices = '0';
                    }
                    if (pendingNotices > parseInt(currentNotices)) {
                        var snd = new Audio(flexygo.utils.resolveUrl('~/js/plugins/lobibox-master/sounds/sound1.ogg'));
                        if (!flexygo.utils.testMode && sound) {
                            snd.play();
                        }
                    }
                    if (pendingNotices == 0) {
                        $('#notifyBadge').html('');
                    }
                    else if (pendingNotices > 9) {
                        $('#notifyBadge').css({ padding: "2px" });
                        $('#notifyBadge').html("+9");
                    }
                    else {
                        $('#notifyBadge').css({ padding: "2px 6px" });
                        $('#notifyBadge').html(pendingNotices.toString());
                    }
                }
                /**
             * Marks a notification has been read
             * @method markAsRead
             */
                markAsRead(elm, noticeId) {
                    let ni = noticeId;
                    let params = {
                        NoticeId: noticeId
                    };
                    flexygo.ajax.post('~/api/Notify', 'SetNoticeIsRead', params, (response) => {
                        if (response) {
                            if (ni) {
                                $(elm).closest('.active').removeClass('active');
                            }
                            else {
                                $(elm).closest('.notifypopover').find('.active').removeClass('active');
                            }
                        }
                        this.refreshBadge();
                    });
                }
                showAll(elm) {
                    let popover = $(elm).closest('.popover');
                    if (elm && popover.length > 0) {
                        $(this).popover('hide');
                        flexygo.nav.openPageName('syspage-extended-notify', 'sysNotices', '', null, 'current', false, null);
                    }
                }
            }
            wc.FlxNotificationElement = FlxNotificationElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-notification', flexygo.ui.wc.FlxNotificationElement);
//# sourceMappingURL=flx-notification.js.map