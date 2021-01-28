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
            * Library for the FlxMailView
            *
            * @class FlxMailView
            * @constructor
            * @return {FlxMailView} .
            */
            class FlxMailView extends HTMLElement {
                constructor() {
                    //If a constructor is defined, is REQUIRED call the super constructor
                    super();
                    /**
                    * Set if element has been connected to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                    /**
                    * imap|database
                    * @property mode {string}
                    */
                    this.mode = 'imap';
                    this.viewtemplate = `
<div class="mail-viewer">
   
            <ul class="list-unstyled">
            <li class="messageid hidden">{{MessageId}}</li>
            <li class="from">{{FromName|isnull:{{FromAddress}}}}</li>
            <li><small class="date">{{MailDate|date:DD/MM/YYYY hh:mm}}</small></li>
            <li><span class="subject">{{Subject}}</span></li>
            </ul>
   
    <div style="display:flex;flex-wrap: wrap;" class="attachments"></div>
    <hr/>
   <iframe scrolling="no"></iframe>    
  </div>
  <div class="iframe hidden">
    {{BodyHTML}}
  </div>`;
                }
                /**
                * Array of observed attributes. REQUIRED
                * @property observedAttributes {Array}
                */
                static get observedAttributes() {
                    return ['mode', 'mailid', 'objectName', 'objectId'];
                }
                /**
                * Init the webcomponent. REQUIRED.
                * @method init
                */
                init() {
                    var me = $(this);
                    me.empty();
                    this.load();
                    flexygo.events.on(this, 'process', 'executed', (e) => {
                        if (e.sender.processName == "sysImapDeleteMail") {
                            $(e.context).closest('.ui-dialog').find('.ui-dialog-titlebar-close').click();
                        }
                    });
                }
                load() {
                    let me = this;
                    let params = { MessageId: this.messageid, Mode: this.mode };
                    if (this.mode == 'imap') {
                        flexygo.ajax.post('~/api/Mail', 'GetMail', params, (response) => {
                            if (response) {
                                if (!response.Mail) {
                                    let mailList = $(me).closest('body').find('flx-maillist');
                                    $(this).html(flexygo.localization.translate('flxmail.nomail'));
                                    flexygo.msg.alert(flexygo.localization.translate('flxmail.nomailalert'));
                                    $(me).closest('.ui-dialog').find('.ui-dialog-titlebar-close').click();
                                    mailList[0].refresh();
                                }
                                else {
                                    let defaultsToolbar = {};
                                    defaultsToolbar.MessageIds = this.messageid;
                                    defaultsToolbar.To = response.Mail.FromAddress;
                                    defaultsToolbar.Subject = response.Mail.Subject;
                                    defaultsToolbar.ToAll = response.Mail.MailTo;
                                    defaultsToolbar.CC = response.Mail.MailCC;
                                    defaultsToolbar.Mode = "imap";
                                    defaultsToolbar.ObjectName = this.objectName;
                                    defaultsToolbar.ObjectId = this.objectId;
                                    $(this).html('<div class="toolbar" ></div><div class="mailItem"></div>');
                                    this.toolbar = response.Toolbar;
                                    this.renderToolbar(JSON.stringify(defaultsToolbar));
                                    this.render(response.Mail);
                                }
                            }
                            else {
                                $(this).html(flexygo.localization.translate('flxmail.nomail'));
                            }
                            this.stopLoading();
                        }, (error) => { flexygo.exceptions.httpShow(error); this.stopLoading(); }, null, () => { this.startLoading(); });
                    }
                    else {
                        flexygo.ajax.post('~/api/Mail', 'GetMail', params, (response) => {
                            if (response) {
                                let defaultsToolbar = {};
                                defaultsToolbar.MessageIds = this.messageid;
                                defaultsToolbar.To = response.Mail.FromAddress;
                                defaultsToolbar.Subject = response.Mail.Subject;
                                defaultsToolbar.ToAll = response.Mail.MailTo;
                                defaultsToolbar.CC = response.Mail.MailCC;
                                defaultsToolbar.Mode = "bd";
                                defaultsToolbar.ObjectName = this.objectName;
                                defaultsToolbar.ObjectId = this.objectId;
                                $(this).html('<div class="toolbar" ></div><div class="mailItem"></div>');
                                this.toolbar = response.Toolbar;
                                this.renderToolbar(JSON.stringify(defaultsToolbar));
                                this.render(response.Mail);
                            }
                            else {
                                $(this).html('Mail not found');
                            }
                            this.stopLoading();
                        }, (error) => { flexygo.exceptions.httpShow(error); this.stopLoading(); }, null, () => { this.startLoading(); });
                    }
                }
                render(ret) {
                    let me = $(this);
                    ret.BodyText = flexygo.utils.parser.replaceAll(ret.BodyText, ',', '&#44;');
                    me.find('.mailItem').html(flexygo.utils.parser.recursiveCompile(ret, this.viewtemplate));
                    let frameContent = me.find('.iframe');
                    for (let i = 0; i < ret.Images.length; i++) {
                        let imgAtt = ret.Images[i];
                        let img = frameContent.find('[src="cid:' + imgAtt.AttachmentId + '"]');
                        img.attr('src', 'data:' + imgAtt.ContentType + ';base64,' + imgAtt.B64);
                    }
                    let attachments = me.find('.attachments');
                    for (let i = 0; i < ret.Attachments.length; i++) {
                        let att = ret.Attachments[i];
                        attachments.append('<div class="mail-viewer-attachment"><div> <i class="size-l fa ' + flexygo.utils.getFileIcon(att.ContentType.split('/')[1]) + '"/><small>' + att.SafeFileName + '</small></div><div><i onclick="flexygo.nav.execProcess(\'sysImapDownloadAttachment\', null, null,\'{\\\'MessageId\\\':\\\'' + this.messageid + '\\\',\\\'SafeFileName\\\':\\\'' + att.SafeFileName + '\\\',\\\'Mode\\\':\\\'' + this.mode + '\\\'}\', null, \'modal800x600\', false, $(this))" class="flx-icon icon-download-1 mail-viewer-download"></i></div>');
                    }
                    this.observe(me.find('iframe').contents().find("body"));
                    me.find('iframe').contents().find("body").html(me.find('.iframe').html());
                    me.find('.iframe').remove();
                }
                renderToolbar(defaults) {
                    if (defaults === '') {
                        defaults = null;
                    }
                    let arrBtn = flexygo.utils.sortObject(this.toolbar, 'PositionId', 'Order');
                    let toolbar = $(this).find('.toolbar');
                    toolbar.empty();
                    let btnGroup;
                    if (arrBtn.length > 0) {
                        let lastPosition = arrBtn[0].PositionId;
                        for (let i = 0; i < arrBtn.length; i++) {
                            let btn = arrBtn[i];
                            let type = btn.TypeId;
                            if (type) {
                                type = type.toLowerCase();
                            }
                            if (!btnGroup) {
                                btnGroup = $('<div class="btn-group" />');
                            }
                            if (btn.PositionId != lastPosition) {
                                toolbar.append(btnGroup);
                                btnGroup = $('<div class="btn-group" />');
                            }
                            if (type == 'separator' || type == 'placeholder') {
                                toolbar.append(btnGroup);
                                btnGroup = null;
                            }
                            else {
                                btnGroup.append((new flexygo.ui.wc.FlxModuleElement()).getButton(btn, null, null, defaults, null, null, null));
                            }
                            lastPosition = btn.PositionId;
                        }
                        if (btnGroup) {
                            toolbar.append(btnGroup);
                        }
                    }
                }
                observe(iframe) {
                    this.observer = new MutationObserver((mutations) => {
                        $(this).find('iframe').contents().find('body a').attr('target', 'blank');
                        $(this).find('iframe').contents().find("body img").on('load', (ev) => {
                            this.resizeIframe();
                            $(ev.currentTarget).off('load');
                        });
                        this.resizeIframe();
                        this.observer.disconnect();
                    });
                    this.observer.observe(iframe[0], { childList: true, characterData: true });
                }
                resizeIframe() {
                    $(this).find('iframe').height('');
                    $(this).find('iframe').height($(this).find('iframe').contents().find("body")[0].scrollHeight);
                }
                /**
                * Start loading.
                * @method startLoading
                */
                startLoading() {
                    if ($(this).parents('flx-module').length > 0) {
                        $(this).parents('flx-module')[0].startLoading();
                    }
                    else {
                        $(this).closest('.mailViewer').addClass('loading');
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
                    else {
                        $(this).closest('.mailViewer').removeClass('loading');
                    }
                }
                /**
                * Refresh de webcomponent. REQUIRED.
                * @method refresh
                */
                refresh(ret) {
                    if ($(this).attr('manualInit') != 'true') {
                        this.load();
                    }
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = $(this);
                    this.connected = true;
                    this.mode = element.attr("mode");
                    this.messageid = element.attr("MessageId");
                    this.objectName = element.attr("objectName");
                    this.objectId = element.attr("objectId");
                    if (element.attr('manualInit') != 'true') {
                        this.init();
                    }
                }
                /**
                * Fires when element is detached to DOM
                * @method disconnectedCallback
                */
                disconnectedCallback() {
                    flexygo.events.off(this, 'process', 'executed');
                }
                /**
                * Fires when the attribute value of the element is changed.
                * @method attributeChangedCallback
                */
                attributeChangedCallback(attrName, oldVal, newVal) {
                    let needInit = false;
                    if (attrName.toLowerCase() == 'MessageId' && newVal && newVal != '') {
                        this.messageid = newVal;
                        needInit = true;
                    }
                    else if (attrName.toLowerCase() == 'mode' && newVal && newVal != '') {
                        this.mode = newVal;
                        needInit = true;
                    }
                    else if (attrName.toLowerCase() == 'objectName' && newVal && newVal != '') {
                        this.objectName = newVal;
                        needInit = true;
                    }
                    else if (attrName.toLowerCase() == 'objectId' && newVal && newVal != '') {
                        this.objectId = newVal;
                        needInit = true;
                    }
                    if (this.connected && needInit) {
                        this.init();
                    }
                }
            }
            wc.FlxMailView = FlxMailView;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define("flx-mailview", flexygo.ui.wc.FlxMailView);
//# sourceMappingURL=flx-mailview.js.map