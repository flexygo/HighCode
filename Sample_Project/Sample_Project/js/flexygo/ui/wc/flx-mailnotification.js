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
            * Library for the FlxMailNotificationElement web component.
            *
            * @class FlxMailNotificationElement
            * @constructor
            * @return {FlxMailNotificationElement}
            */
            class FlxMailNotificationElement extends HTMLElement {
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
                    flexygo.events.off(this, 'push', 'notify');
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
                    flexygo.events.on(this, 'push', 'notify', function (e) {
                        if (e.masterIdentity == 'updateMailNotice' && typeof e.sender['pendingMails'] != 'undefined') {
                            this.updateBadge(e.sender.pendingMails, true);
                            if ($('flx-maillist').length > 0) {
                                $('flx-maillist')[0].refresh();
                            }
                        }
                        else if (e.masterIdentity == 'finishMailSync') {
                            if ($('flx-maillist').length > 0) {
                                if (e.sender.success) {
                                    $('flx-maillist').find("[folderid='" + e.detailIdentity + "']").find("i").addClass('hide');
                                }
                                else {
                                    $('flx-maillist').find("[folderid='" + e.detailIdentity + "']").find("i").removeClass('flx-icon icon-sincronize-1 icon-spin txt-outstanding hide').addClass('flx-icon icon-error1 txt-danger');
                                }
                            }
                        }
                    });
                }
                /**
                * Refreses Web Control
                * @method refresh
                */
                refresh() {
                    let ctx = $(this);
                    let notySpan = $('<span class=""> <i class="flx-icon icon-email-1 "></i> <b id="notifyMails" class="badge  bounceIn animated"></b> </span>');
                    ctx.append(notySpan);
                    notySpan.on('click', () => {
                        flexygo.nav.openPageName('syspage-mailimaplist', '', '', null, 'current', false, $(this));
                    });
                    this.refreshBadge();
                }
                /**
                * Checks and refresh Notify Badge
                * @method refreshBadge
                */
                refreshBadge() {
                    if ($('#notifyBadge')) {
                        flexygo.ajax.post('~/api/Mail', 'GetMailBadgeValue', null, (response) => {
                            this.updateBadge(response, false);
                        });
                    }
                }
                /**
                * Refreshes Notify Badge
                * @method updateBadge
                * @param {number} pendingMails - Number of pending mails
                * @param {boolean} sound - Reproduces sound or not.
                */
                updateBadge(pendingMails, sound) {
                    var currentMails = $('#notifyMails').html();
                    if (!currentMails || currentMails == '') {
                        currentMails = '0';
                    }
                    if (pendingMails > parseInt(currentMails)) {
                        var snd = new Audio(flexygo.utils.resolveUrl('~/js/plugins/lobibox-master/sounds/sound1.ogg'));
                        if (!flexygo.utils.testMode) {
                            snd.play();
                        }
                    }
                    if (pendingMails == 0) {
                        $('#notifyMails').html('');
                    }
                    else {
                        $('#notifyMails').html(pendingMails.toString());
                    }
                }
            }
            wc.FlxMailNotificationElement = FlxMailNotificationElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-mailnotification', flexygo.ui.wc.FlxMailNotificationElement);
//# sourceMappingURL=flx-mailnotification.js.map