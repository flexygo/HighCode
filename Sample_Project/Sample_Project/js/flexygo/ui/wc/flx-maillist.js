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
            * Library for the FlxKanban
            *
            * @class FlxKanban
            * @constructor
            * @return {FlxMailList} .
            */
            class FlxMailList extends HTMLElement {
                constructor() {
                    //If a constructor is defined, is REQUIRED call the super constructor
                    super();
                    /**
                    * Set if element has been connected to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                    this.page = 0;
                    this.pageSize = 50;
                    this.noMailTemplate = `
<div class="nomail">
  <div class="nomail-data"></div>
  <div class="nomail-text">` + flexygo.localization.translate('flxmail.nomails') + `</div>
</div>`;
                    this.noSettingsTemplate = `
<div class="nosettings">
  <div class="nosettings-data"></div>
  <div class="nosettings-text clickable">` + flexygo.localization.translate('flxmail.nosettings') + `</div></div>`;
                    this.template = `
<div messageId="{{MessageId}}" class="row row-line box-mail {{seen|bool:seen}} pull-right">
  <div class="box-mail-bagbutton">
    <button class="btn btn-default bagButton" title="Bag" data-type="bag"><i class="flx-icon icon-non-check-2"></i> </button>
  </div>
  <div class="box-mail-data clickable">
    <div class="col-10 col-l-9 col-m-8 col-s-5"><span class="from">{{FromName|isnull:{{FromAddress}}}}</span><span class="mailto">{{MailTo}}</span>&nbsp;</div>
    <div class="col-2 col-l-3 col-m-4 col-s-5 text-right"><span class="icons"><i class="{{IsForward|bool:flx-icon icon-email-send ,hidden}} txt-notify" title="Forward"></i><i class="{{IsReply|bool:flx-icon icon-email-send icon-flip-horizontal,hidden}} txt-outstanding" title="Reply"></i> <i class="{{HasAttachments|bool:flx-icon icon-clip,hidden}}" title="attachments"></i> <i class="{{IsLink|bool:flx-icon icon-link,hidden}}" title="Link"></i></span></div>
    <div class="col-10 col-l-10 col-m-10 col-s-5"><span class="subject">{{Subject}}&nbsp;</span></div>
    <div class="col-2 col-l-2 col-m-2 col-s-5 text-right"><span class="date">{{MailDate|date:LLLL}}</span></div>
    <div class="col-12"><span class="message">{{BodyText}}&nbsp;</span></div>
  </div>
</div>`;
                    this.structure = `
<div class="toolbar mailToolbar"></div>
<div class="col-2 mailFilters">
<h3><i class="flx-icon icon-funnel-1 icon-margin-right"></i>Filters</h3>
<flx-text name="MailAddress" placeholder="` + flexygo.localization.translate('flxmail.address') + `"></flx-text>
<flx-text name="Subject" placeholder="` + flexygo.localization.translate('flxmail.subject') + `"></flx-text>
<flx-text name="Body" placeholder="` + flexygo.localization.translate('flxmail.body') + `"></flx-text>
<flx-text name="MailDateMin" type="date" placeholder="` + flexygo.localization.translate('flxmail.mindate') + `"></flx-text>
<flx-text name="MailDateMax" type="date" placeholder="` + flexygo.localization.translate('flxmail.maxdate') + `"></flx-text>
<div><flx-check name="Seen" class="size-s" label="only unseen"></flx-check><label class="control-label" >` + flexygo.localization.translate('flxmail.unseen') + `</label><button class="btn btn-outstanding searchbtn pull-right"><i class="flx-icon icon-search icon-margin-right"></i>Search</btn></div>
<hr/>  
<h3><i class="flx-icon icon-folder icon-margin-right"></i>` + flexygo.localization.translate('flxmail.folders') + `<span class="pull-right nosettings clickable"><i class="flx-icon icon-email-settings icon-margin-right"></i></span></h3>
<div class="mailFolders"></div>
</div>
<div class="col-10">
    <div class="mailList"></div>
    <div class="row row-line box-mail pull-right seen loadMoreRow" style="display:none">
       <div class="box-mail-data ">
        <div class="col-12"><div class="loadMore clickable"><i class="flx-icon icon-reload icon-margin-right"></i>` + flexygo.localization.translate('flxmail.loadmore') + `</div></div>
      </div>
    </div>
</div>`;
                }
                /**
                * Array of observed attributes. REQUIRED
                * @property observedAttributes {Array}
                */
                static get observedAttributes() {
                    return ['ObjectName', 'ObjectWhere', 'ModuleName'];
                }
                /**
                * Init the webcomponent. REQUIRED.
                * @method init
                */
                init() {
                    var me = $(this);
                    me.removeAttr('manualInit');
                    me.empty();
                    me.append(this.structure);
                    me.find('.searchbtn').on('click', () => { this.page = 0; this.load(); });
                    me.find('.loadMore').on('click', (ev) => {
                        $(ev.currentTarget).parent().find('i').addClass('icon-spin');
                        this.startLoading();
                        this.loadMore();
                    });
                    flexygo.nav.hideNavBar();
                    this.loadConfig();
                }
                load() {
                    let Filters = this.getFilters();
                    flexygo.ajax.post('~/api/Mail', 'GetMailHeaders', Filters, (response) => {
                        let mails = this.render(response);
                        let mailItems = $(this).find('.mailList');
                        if (mails && mails.children().length > 0) {
                            if (this.page == 0) {
                                mailItems.html(mails.children());
                            }
                            else {
                                mailItems.append(mails.children());
                            }
                        }
                        else if (this.page == 0) {
                            mailItems.html(this.noMailTemplate);
                        }
                        this.stopLoading();
                    }, (error) => { flexygo.exceptions.httpShow(error); this.stopLoading(); }, null, () => { this.startLoading(); });
                }
                loadMore() {
                    this.page += 1;
                    this.load();
                }
                loadConfig() {
                    let me = $(this);
                    let params = new Object();
                    params.ModuleName = this.moduleName;
                    params.PageName = flexygo.history.getPageName(me);
                    params.ObjectName = this.objectName;
                    params.ObjectWhere = this.objectWhere;
                    flexygo.ajax.post('~/api/Mail', 'GetMailConfig', params, (response) => {
                        if (response) {
                            if (response.ShowSettingsOption) {
                                let mailItems = $(this).find('.mailList');
                                mailItems.html(this.noSettingsTemplate);
                                $(this).find('.nosettings').on('click', (evt) => { this.settingsClick($(evt.currentTarget)); });
                            }
                            else {
                                response.Folders.sort(function (a, b) { return b.IsInbox - a.IsInbox; });
                                this.linkObj = response.ObjectName;
                                this.linkKey = response.ObjectId;
                                this.toolbar = response.Toolbar;
                                this.renderToolbar(JSON.stringify({ ObjectName: this.linkObj, ObjectId: this.linkKey }));
                                me.find('[name="MailAddress"]').val(response.EmailFilter);
                                this.load();
                                $(this).find('.mailFolders').html(this.renderFolders(response.Folders, null));
                                $(this).find('[isinbox="true"]:first').addClass('selected');
                                $(this).find('[folderid]').on('click', (evt) => { this.folderClick($(evt.currentTarget)); });
                                $(this).find('.nosettings').on('click', (evt) => { this.settingsClick($(evt.currentTarget)); });
                            }
                        }
                    });
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
                folderClick(itm) {
                    $(this).find('[folderid]').removeClass('selected');
                    itm.addClass('selected');
                    this.load();
                }
                settingsClick(itm) {
                    flexygo.nav.execProcess("SetUserMailAccount", "sysUser", null, null, null, "modal800x600", true, itm);
                }
                viewMail(mailID, subject) {
                    let itm = $('<flx-mailview></flx-mailview>');
                    itm.attr('messageid', mailID);
                    itm.attr('mode', 'imap');
                    itm.attr('ObjectName', this.linkObj);
                    itm.attr('ObjectId', this.linkKey);
                    let cont = flexygo.targets.createContainer({ targetid: 'popup1280x1024' }, false, $(this));
                    cont.closest('.ui-dialog').find('.ui-dialog-title').html(subject);
                    cont.addClass('mailViewer');
                    cont.html(itm);
                }
                renderFolders(obj, parent) {
                    let ul;
                    if (parent) {
                        ul = $('<div class="collapse" id="' + flexygo.utils.parser.replaceAll(parent, ' ', '') + '" aria-expanded="true" ><div class="childNodes"></div></div>');
                    }
                    else {
                        ul = $('<div />');
                    }
                    for (let i = 0; i < obj.length; i++) {
                        let li;
                        if (obj[i].CanSelect) {
                            li = $('<div><a class="collapsed" data-toggle="collapse" data-target="#' + flexygo.utils.parser.replaceAll(obj[i].Name, ' ', '') + '" aria-expanded="false"><i class="flx-icon ' + (obj[i].Folders ? obj[i].Folders.length > 0 ? 'tree-icon-toggle' : '' : '') + '"></i></a><span class="clickable" isinbox="' + obj[i].IsInbox + '" folderid="' + obj[i].ImapName + '">' + obj[i].Name + '</span></div>');
                        }
                        else {
                            li = $('<div><a class="collapsed" data-toggle="collapse" data-target="#' + flexygo.utils.parser.replaceAll(obj[i].Name, ' ', '') + '" aria-expanded="false"><i class="flx-icon ' + (obj[i].Folders ? obj[i].Folders.length > 0 ? 'tree-icon-toggle' : '' : '') + '"></i></a><span>' + obj[i].Name + '</span></div>');
                        }
                        if (obj[i].Folders) {
                            if (obj[i].Folders.length > 0) {
                                li.append(this.renderFolders(obj[i].Folders, obj[i].Name));
                            }
                            else {
                                li.addClass('nochildren');
                            }
                        }
                        else {
                            li.addClass('nochildren');
                        }
                        if (parent) {
                            ul.find('.childNodes').append(li);
                        }
                        else {
                            ul.append(li);
                        }
                    }
                    return ul;
                }
                getFilters() {
                    let me = $(this);
                    let ret = new flexygo.api.mail.MailFilters();
                    ret.Page = this.page;
                    ret.PageSize = this.pageSize;
                    ret.Folder = 'inbox';
                    ret.Seen = ((me.find('[name="Seen"]').val() == false) ? 'true' : 'false');
                    ret.MailAddress = me.find('[name="MailAddress"]').val();
                    ret.Subject = me.find('[name="Subject"]').val();
                    ret.Body = me.find('[name="Body"]').val();
                    ret.MailDateMin = me.find('[name="MailDateMin"]').val();
                    ret.MailDateMax = me.find('[name="MailDateMax"]').val();
                    let selectedFolder = me.find('[folderid].selected');
                    if (selectedFolder.length > 0) {
                        ret.Folder = selectedFolder.attr('folderid');
                    }
                    return ret;
                }
                selectAll() {
                    let itms = $(this).find('.mailList [messageId]');
                    itms.find('.box-mail-bagbutton i').removeClass('icon-non-check-2').addClass('icon-checked-1');
                    itms.addClass('selected');
                    this.refreshDefauts();
                }
                selectNone() {
                    let itms = $(this).find('.mailList [messageId]');
                    itms.find('.box-mail-bagbutton i').addClass('icon-non-check-2').removeClass('icon-checked-1');
                    itms.removeClass('selected');
                    this.refreshDefauts();
                }
                refreshDefauts() {
                    let msgs = $(this).find('.mailList [messageId].selected');
                    let msgsIds = new Array();
                    if (msgs.length > 0) {
                        msgs.each((i, itm) => { msgsIds.push($(itm).attr('messageId')); });
                        this.renderToolbar(JSON.stringify({ ObjectName: this.linkObj, ObjectId: this.linkKey, MessageIds: msgsIds.join('|') }));
                    }
                    else {
                        this.renderToolbar(JSON.stringify({ ObjectName: this.linkObj, ObjectId: this.linkKey }));
                    }
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
                * Render HTML data.
                * @method render
                */
                render(ret) {
                    if (ret) {
                        let mailItems = $('<div></div>');
                        for (var i = 0; i < ret.length; i++) {
                            mailItems.append(flexygo.utils.parser.recursiveCompile(ret[i], this.template, null, null, true));
                        }
                        //Se muestra el bot�n o se oculta y se quita la animaci�n
                        let loadMore = $(this).find('.loadMoreRow');
                        if (ret.length < this.pageSize) {
                            loadMore.hide();
                        }
                        else {
                            loadMore.find('.icon-spin').removeClass('icon-spin');
                            loadMore.show();
                        }
                        if ($(this).find('[folderid].selected').attr('isinbox') == 'true') {
                            mailItems.find('.mailto').addClass('hidden');
                        }
                        else {
                            mailItems.find('.from').addClass('hidden');
                        }
                        mailItems.find('.box-mail-bagbutton').on('click', (ev) => {
                            $(ev.currentTarget).find('i').toggleClass('icon-checked-1 icon-non-check-2');
                            $(ev.currentTarget).closest('[messageId]').toggleClass('selected');
                            this.refreshDefauts();
                        });
                        mailItems.find('.box-mail-data').on('click', (ev) => {
                            if (ev.target.className == 'flx-icon icon-link') {
                                flexygo.nav.openPageName('syspage-list-maillinks', 'sysMails_Object', 'MessageId = \'' + $(ev.currentTarget).closest('[messageId]').attr('messageId') + '\' ', null, 'new', false, $(this));
                            }
                            else {
                                $(ev.currentTarget).parent().addClass('seen');
                                this.viewMail($(ev.currentTarget).closest('[messageId]').attr('messageId'), $(ev.currentTarget).closest('[messageId]').find('.subject').text());
                            }
                        });
                        return mailItems;
                    }
                    else {
                        return null;
                    }
                }
                /**
               * Establish webcomponent settings
               * @method configure
               */
                configure() {
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = $(this);
                    this.connected = true;
                    this.objectName = element.attr("ObjectName");
                    this.objectWhere = element.attr("ObjectWhere");
                    this.moduleName = element.attr("ModuleName");
                    if (element.attr('manualInit') != 'true') {
                        this.init();
                    }
                }
                /**
                * Fires when element is detached to DOM
                * @method disconnectedCallback
                */
                disconnectedCallback() {
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
                    else if (attrName.toLowerCase() == 'objectname' && newVal && newVal != '') {
                        this.objectName = newVal;
                        needInit = true;
                    }
                    else if (attrName.toLowerCase() == 'objectwhere' && newVal && newVal != '') {
                        this.objectWhere = newVal;
                        needInit = true;
                    }
                    if (this.connected && needInit) {
                        this.init();
                    }
                }
            }
            wc.FlxMailList = FlxMailList;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define("flx-maillist", flexygo.ui.wc.FlxMailList);
//# sourceMappingURL=flx-maillist.js.map