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
            * Library for the FlxChatterElement
            *
            * @class FlxChatterElement
            * @constructor
            * @return {FlxChatterElement} .
            */
            class FlxChatterElement extends HTMLElement {
                constructor() {
                    /*If a constructor is defined, is REQUIRED call the super constructor*/
                    super();
                    /**
                    * Set if element has been connected to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                    /**
                    * Composer Attachments
                    * @property composerAttachments {array}
                    */
                    this.composerAttachments = [];
                    /**
                    * Composer Messages
                    * @property messages {array}
                    */
                    /* DEVELOPING: DataSet
                    messages: flexygo.api.Chatter.messageData[] = [];
                    DEVELOPING END: DataSet */
                    /**
                    * Start info Template
                    * @property startInfo {string}
                    */
                    this.startInfoTemplate = () => `<div class="start_info txt-muted">
                                                        <span>
                                                            ${flexygo.localization.translate('chatter.startinfo')}
                                                        </span>
                                                        <i class="flx-icon icon-settings"/>
                                                     </div>`;
                    /**
                    * Chatter Template
                    * @property chatterTemplate {string}
                    */
                    this.chatterTemplate = () => `<div class="chatter">
                                                      <div class="DEVELOPING chatter_topbar">

                                                        <span style="MARGIN: 0 AUTO;COLOR: #858585;">BARRA SUPERIOR PARA MAS OPCIONES</span>

                                                      </div>
                                                      <div class="chatter_composer">
                                                        <div class="chatter_composer_container">
                                                          <img class="chatter_avatar img-circle hidden-sm hidden-xs" src="${flexygo.utils.resolveUrl(flexygo.profiles.avatar)}"/>
                                                          <div class="chatter_composer_section">
                                                            <div class="chatter_composer_input">
                                                              <textarea class="chatter_composer_textarea" tabindex="2" placeholder="${flexygo.localization.translate('chatter.composerplaceholder')}"></textarea>
                                                              <div class="chatter_composer_tools">
                                                                <img class="chatter_avatar_mini img-circle hidden-lg hidden-md" src="${flexygo.utils.resolveUrl(flexygo.profiles.avatar)}"/>
                                                                <button disabled class="hide btn fa fa-smile-o chatter_composer_button_emoji" data-toggle="popover" tabindex="4" type="button"/>
                                                                <button class="btn fa fa-paperclip chatter_composer_button_add_attachment" tabindex="5" type="button"/>
                                                                <button disabled class="btn btn-icon fa fa-paper-plane-o chatter_composer_button_send hidden-lg hidden-md" tabindex="3" type="button"/>
                                                                <button disabled class="hide btn fa fa-expand chatter_composer_button_full_composer" tabindex="6" type="button"/>
                                                              </div>
                                                              <div class="chatter_composer_attachments"/>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div class="chatter_composer_send">
                                                          <button disabled class="btn chatter_composer_button_send hidden-sm hidden-xs" tabindex="3" type="button">${flexygo.localization.translate('chatter.sendbutton')}</button>
                                                        </div>
                                                      </div>
                                                      <div class="chatter_thread"/>
                                                    </div>`;
                    /**
                    * Composer Attachment Template
                    * @property composerAttachmentTemplate {string}
                    */
                    this.composerAttachmentTemplate = (composerAttachmentData) => `<div class="chatter_composer_attachment" chatter-attachment-id="${composerAttachmentData.id}">
                                                                                                                                    <div>
                                                                                                                                        <i class="size-l fa ${flexygo.utils.getFileIcon(composerAttachmentData.name.split('.').pop())}"/>
                                                                                                                                        <small>${composerAttachmentData.name.split('.').slice(0, -1).join('.')}</small>
                                                                                                                                    </div>
                                                                                                                                    <div>
                                                                                                                                        <i class="flx-icon icon-close-2 chatter_composer_attachment_delete"></i>
                                                                                                                                    </div>
                                                                                                                                 </div>`;
                    /**
                    * Composer Message Template
                    * @property parentMessageTemplate {string}
                    */
                    this.parentMessageTemplate = (parentMessageData) => `<div class="chatter_composer_parent_message" chatter-parent-message-id="${parentMessageData.id}">
                                                                                                                    <div>
                                                                                                                        <small>
                                                                                                                            <strong class="txt-outstanding">${parentMessageData.author}</strong>
                                                                                                                            <p>${parentMessageData.content}</p>
                                                                                                                        </small>
                                                                                                                    </div>
                                                                                                                    <div>
                                                                                                                        <i class="chatter_composer_parent_message_delete size-l flx-icon icon-close-2"/>
                                                                                                                    </div>
                                                                                                                </div>`;
                    /**
                    * Separator Template
                    * @property separatorTemplate {string}
                    */
                    this.separatorTemplate = (date) => `<div class="chatter_thread_date_separator">
                                                                    <span class="chatter_thread_date">${moment(date).locale(flexygo.profiles.culture).format('LL')}</span>
                                                                </div>`;
                    /**
                    * Message Template
                    * @property messageTemplate {string}
                    * @property isNew {boolean}
                    */
                    this.messageTemplate = (messageData, isNew) => `<div class="chatter_thread_message ${(isNew) ? 'new_message' : ''}" chatter-message-id="${messageData.messageId}">
                                                                                                    <div class="chatter_thread_message_sidebar">
                                                                                                    <img src="${flexygo.utils.resolveUrl(messageData.avatar)}" class="chatter_thread_message_avatar img-circle"/>
                                                                                                    </div>
                                                                                                    <div class="chatter_thread_message_core">
                                                                                                        <p class="chatter_thread_message_info">
                                                                                                            <strong class="chatter_thread_author">${messageData.author}</strong><span class="chatter_thread_info_separator"/><small class="chatter_mail_timestamp" chatter-message-timestamp="${messageData.insertionDate}" title="${moment(messageData.insertionDate).locale(flexygo.profiles.culture).format('DD/MM/YYYY HH:mm:ss')}">${moment(messageData.insertionDate).locale(flexygo.profiles.culture).fromNow()}</small>
                                                                                                            <span class="chatter_thread_icons">
                                                                                                                ${(!messageData.parentMessage) ? '<i class="fa-lg chatter_thread_icon chatter_thread_message_reply  flx-icon icon-arrow-2"/>' : ''}
                                                                                                                <i disabled class="hide fa fa-lg chatter_thread_icon chatter_thread_message_favorite fa-star-o" chatter-message-favorite="false"/>
                                                                                                                ${(messageData.attachmentsCount) ? `<span class="chatter_thread_icon chatter_thread_message_attachments" chatter-message-documents-loaded="false"><i class="fa fa-lg fa-paperclip"/>${messageData.attachmentsCount}</span>` : ''}
                                                                                                            </span>
                                                                                                        </p>
                                                                                                        <div class="chatter_thread_message_content">
                                                                                                            <p>${messageData.content}</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    ${(!messageData.parentMessage) ? '<div class="chatter_thread_message_children" />' : ''}
                                                                                                </div>`;
                    /**
                    * Composer Attachment Template
                    * @property composerAttachmentTemplate {string}
                    */
                    this.messageDocumentTemplate = (document) => `<div class="chatter_message_document" chatter-message-document-id="${document.docGuid}">
                                                                                                                                    <div>
                                                                                                                                        <i class="size-l fa ${document.iconClass}"/>
                                                                                                                                        <small>${document.name}</small>
                                                                                                                                    </div>
                                                                                                                                    <div>
                                                                                                                                        <a href="${flexygo.utils.resolveUrl(document.downloadLink)}" download="${document.name + document.extension}">
                                                                                                                                            <i class="flx-icon icon-download-1 chatter_message_download"></i>
                                                                                                                                        </a>
                                                                                                                                    </div>
                                                                                                                                 </div>`;
                }
                /**
                * Array of observed attributes. REQUIRED
                * @property observedAttributes {Array}
                */
                static get observedAttributes() {
                    return ['ModuleName', 'ObjectName', 'ObjectWhere', 'objectId'];
                }
                /**
                * Init the webcomponent. REQUIRED.
                * @method init
                */
                init() {
                    try {
                        let me;
                        let defObject;
                        let wcModule;
                        me = $(this);
                        me.removeAttr('manualInit');
                        defObject = JSON.parse(flexygo.utils.parser.replaceAll(flexygo.history.getDefaults(this.objectName, me), "'", '"'));
                        wcModule = me.closest('flx-module')[0];
                        this.destinationObjectName = (this.objectName && this.objectId) ? this.objectName : (defObject) ? defObject.DestinationObjectName : (wcModule.objectdefaults) ? wcModule.objectdefaults.DestinationObjectName : '';
                        this.destinationObjectId = (this.objectName && this.objectId) ? this.objectId : (defObject) ? defObject.DestinationObjectId : (wcModule.objectdefaults) ? wcModule.objectdefaults.DestinationObjectId : '';
                        this.render();
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                /**
                * Refresh de webcomponent. REQUIRED.
                * @method refresh
                */
                refresh() {
                    if ($(this).attr('manualInit') != 'true') {
                        try {
                            this.removeExternalEvents();
                            this.init();
                        }
                        catch (ex) {
                            console.log(ex);
                        }
                    }
                }
                /**
                * Render HTML data.
                * @method render
                */
                render() {
                    try {
                        let me;
                        me = $(this);
                        if (this.destinationObjectName && this.destinationObjectId) {
                            me.html(this.chatterTemplate());
                            this.setMainEvents();
                            this.getMessages();
                        }
                        else {
                            me.html(this.startInfoTemplate());
                            this.setStartInfoEvents();
                        }
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                /**
                * Set main events.
                * @method setMainEvents
                */
                setStartInfoEvents() {
                    try {
                        let me = $(this);
                        me.find('.start_info i').off('click.chatter').on('click.chatter', function () {
                            me[0].configure();
                        });
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                /**
                * Set main events.
                * @method setMainEvents
                */
                setMainEvents() {
                    try {
                        let me = $(this);
                        /*Change height of textarea*/
                        let composerTextareaMinHeight = me.find('.chatter_composer_textarea').outerHeight() || 50;
                        let sillyTextArea = $('<textarea disabled>').css({
                            position: 'absolute',
                            opacity: 0,
                            height: 0,
                            borderTopWidth: 0,
                            borderBottomWidth: 0,
                            padding: 0,
                            top: -10000,
                        });
                        me.find('.chatter_composer_textarea').off('input.chatter focus.chatter change.chatter').on('input.chatter focus.chatter change.chatter', function () {
                            let composerTextareaHeightOffset = 0;
                            let textareaStyle = window.getComputedStyle(this, null);
                            let temporarySillyTextAreaHeight;
                            let temporarySillyTextArea = sillyTextArea.insertAfter(this);
                            temporarySillyTextArea.width($(this).width());
                            temporarySillyTextArea.val($(this).val());
                            temporarySillyTextAreaHeight = temporarySillyTextArea[0].scrollHeight;
                            temporarySillyTextArea.remove();
                            if (textareaStyle.boxSizing === 'border-box') {
                                let paddingHeight = parseFloat(textareaStyle.paddingTop) + parseFloat(textareaStyle.paddingBottom);
                                let borderHeight = parseFloat(textareaStyle.borderTopWidth) + parseFloat(textareaStyle.borderBottomWidth);
                                composerTextareaHeightOffset = borderHeight + paddingHeight;
                            }
                            $(this).css({ height: Math.max(temporarySillyTextAreaHeight + composerTextareaHeightOffset, composerTextareaMinHeight) });
                            if ($(this).val() != '') {
                                me.find('.chatter_composer_button_send ').prop('disabled', false);
                            }
                            else {
                                me.find('.chatter_composer_button_send ').prop('disabled', true);
                            }
                        });
                        /*Add attachment*/
                        me.find('.chatter_composer_button_add_attachment').off('click.chatter').on('click.chatter', function () {
                            $(document.createElement('input')).attr({ type: 'file', multiple: 'multiple' }).off('change.chatter').on('change.chatter', function (e) {
                                for (let file of e.currentTarget.files) {
                                    let reader = new FileReader();
                                    reader.onload = (e) => {
                                        let composerAttachmentData = { id: flexygo.utils.uniqueId(), name: file.name };
                                        me[0].composerAttachments.push({ id: composerAttachmentData.id, name: composerAttachmentData.name, base64: e.target.result.split(',')[1] });
                                        let attachment = $(me[0].composerAttachmentTemplate(composerAttachmentData)).prependTo(me.find('.chatter_composer_attachments'));
                                        setTimeout(function () {
                                            attachment.css({ opacity: 1, height: 36, padding: '0 10px', margin: '10px 0' });
                                        }, 25);
                                        attachment.find('.chatter_composer_attachment_delete').off('click.chatter').on('click.chatter', function () {
                                            me[0].composerAttachments.splice(me[0].composerAttachments.map((attachment) => attachment.id).indexOf(attachment.attr('chatter-attachment-id')), 1);
                                            attachment.css({ opacity: 0, height: 0, padding: 0, margin: 0 });
                                            setTimeout(() => {
                                                attachment.remove();
                                            }, 150);
                                        });
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }).click();
                        });
                        /*Add message*/
                        me.find('.chatter_composer_button_send').off('click.chatter').on('click.chatter', function () {
                            me[0].setMessage();
                        });
                        /*Update chatter_mail_timestamp*/
                        setInterval(() => {
                            me.find('.chatter_mail_timestamp').each(function () {
                                $(this).text(moment($(this).attr('chatter-message-timestamp')).locale(flexygo.profiles.culture).fromNow());
                            });
                        }, 60 * 1000);
                        /* DEVELOPING: SignalR
                        flexygo.events.off(this, 'push', 'inserted');
                        flexygo.events.on(this, 'push', 'inserted', (e) => {
                            debugger;
                            this.setMessageEvents($(this.messageTemplate(e.sender)).prependTo(me.find('.chatter_thread')));
                        });
                        DEVELOPING END: SignalR */
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                /**
                * Set message events.
                * @method setMessageEvents
                * @param {JQuery} message
                */
                setMessageEvents(message) {
                    try {
                        let me = $(this);
                        if (!message) {
                            message = me;
                        }
                        else {
                            setTimeout(() => {
                                message.removeClass('new_message');
                            }, 25);
                        }
                        /* DEVELOPING: Favorite message
                        //Change message to favorite
                        message.find('.chatter_thread_message_favorite').off('click.chatter').on('click.chatter', function (): void {
                            if ($(this).attr('chatter-message-favorite') == 'true') {
                                $(this).attr('chatter-message-favorite', 'false').removeClass('fa-star').addClass('fa-star-o');
                            } else {
                                $(this).attr('chatter-message-favorite', 'true').removeClass('fa-star-o').addClass('fa-star');
                            }
                        });
                        DEVELOPING END: Favorite message */
                        /*Add parent message*/
                        message.find('.chatter_thread_message_reply').off('click.chatter').on('click.chatter', function () {
                            let message = $(this).closest('.chatter_thread_message');
                            //let parendId: string = message.attr('chatter-message-id');
                            let parentMessage = me.find('.chatter_composer_parent_message');
                            if (!flexygo.utils.isInMainContent($(this).closest('.chatter').find('.chatter_composer')[0], 200)) {
                                $(this).closest('.chatter').find('.chatter_composer')[0].scrollIntoView({ block: "center", behavior: "smooth" });
                            }
                            if (parentMessage.attr('chatter-parent-message-id') != message.attr('chatter-message-id')) {
                                parentMessage.remove();
                                let parentMessageData = {
                                    id: message.attr('chatter-message-id'),
                                    author: message.find('.chatter_thread_author:first').text(),
                                    content: message.find('.chatter_thread_message_content:first').text()
                                };
                                parentMessage = $(me[0].parentMessageTemplate(parentMessageData)).prependTo(me.find('.chatter_composer_input'));
                                setTimeout(function () {
                                    parentMessage.css({ opacity: 1, height: 56, padding: 10, 'margin-bottom': 5 });
                                }, 0);
                                parentMessage.find('.chatter_composer_parent_message_delete').off('click.chatter').on('click.chatter', function () {
                                    parentMessage.css({ opacity: 0, height: 0, padding: 0, 'margin-bottom': 0 });
                                    setTimeout(() => {
                                        parentMessage.remove();
                                    }, 150);
                                });
                            }
                            $(this).closest('.chatter').find('textarea.chatter_composer_textarea')[0].focus({ preventScroll: true });
                        });
                        /*View related documents*/
                        message.find('.chatter_thread_message_attachments').off('click.chatter').on('click.chatter', function () {
                            if ($(this).attr('chatter-message-documents-loaded') === 'false') {
                                $(this).attr('chatter-message-documents-loaded', 'true');
                                let message = $(this).closest('.chatter_thread_message');
                                let params = {
                                    ObjectId: message.attr('chatter-message-id'),
                                    ObjectName: 'sysChatter',
                                };
                                flexygo.ajax.post('~/api/DocumentManager', 'GetDocument', params, (response) => {
                                    if (response) {
                                        let contenct = '';
                                        for (var doc of response) {
                                            contenct += me[0].messageDocumentTemplate(doc);
                                        }
                                        $('#mainContent, main.pageContainer').on('scroll.chatter', (e) => {
                                            $(this).popover('hide');
                                        });
                                        $(window, me.closest('div.ui-dialog')).on('resize.chatter', (e) => {
                                            $(this).popover('hide');
                                        });
                                        $(document).on('mouseup.chatter', (e) => {
                                            if ((!$(this).data("bs.popover").$tip.is(e.target) && $(this).data("bs.popover").$tip.has(e.target).length === 0) && (!$(this).is(e.target) && $(this).has(e.target).length === 0)) {
                                                $(this).popover('hide');
                                            }
                                        });
                                        flexygo.events.on(this, 'navbar', 'toggled', (e) => {
                                            $(this).popover('hide');
                                        });
                                        $(this).on('show.bs.popover', () => {
                                            $(this).attr('chatter-message-documents-visible', 'true');
                                        });
                                        $(this).on('hidden.bs.popover', () => {
                                            $(this).attr('chatter-message-documents-visible', 'false');
                                        });
                                        $(this).popover({
                                            container: 'body',
                                            content: contenct,
                                            html: true,
                                            placement: 'top',
                                            template: '<div class="popover flx-chatter chatter-popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
                                            trigger: 'manual',
                                        }).popover('show');
                                    }
                                });
                            }
                            else {
                                if (($(this).attr('chatter-message-documents-visible') === 'false')) {
                                    $(this).popover('show');
                                }
                                else {
                                    $(this).popover('hide');
                                }
                            }
                        });
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                /**
                * Get messages.
                * @method getMessages
                */
                getMessages() {
                    try {
                        let me = $(this);
                        let params;
                        params = {
                            'ObjectName': this.destinationObjectName,
                            'ObjectId': this.destinationObjectId,
                        };
                        flexygo.ajax.post('~/api/Chatter', 'GetMessages', params, (response) => {
                            response.forEach((message) => { me.find((!message.parentMessage) ? '.chatter_thread' : `[chatter-message-id="${message.parentMessage}"] .chatter_thread_message_children:first`).append(this.messageTemplate(message)); });
                            //me.find('.chatter_thread').append(this.separatorTemplate(new Date));
                            this.setMessageEvents();
                        });
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                /**
                * Set message.
                * @method setMessage
                */
                setMessage() {
                    try {
                        let me;
                        let params;
                        me = $(this);
                        params = {
                            DestinationObjectName: this.destinationObjectName,
                            DestinationObjectId: this.destinationObjectId,
                            DestinationParentMessage: me.find('.chatter_composer_parent_message').attr('chatter-parent-message-id'),
                            Content: me.find('textarea.chatter_composer_textarea').val().trim(),
                            Attachments: this.composerAttachments
                        };
                        flexygo.ajax.post('~/api/Chatter', 'SetMessage', params, (response) => {
                            //TODO:  create own prepend function for chatter
                            this.setMessageEvents($(this.messageTemplate(response, true)).prependTo(me.find((!response.parentMessage) ? '.chatter_thread' : `[chatter-message-id="${response.parentMessage}"] .chatter_thread_message_children:first`)));
                            if (!flexygo.utils.isInMainContent(me.find(`[chatter-message-id="${response.messageId}"]`)[0], 100)) {
                                $(this).find(`[chatter-message-id="${response.messageId}"]`)[0].scrollIntoView({ block: "center", behavior: "smooth" });
                            }
                        });
                        this.cleanComposer();
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                /**
                * Clean composer.
                * @method cleanComposer
                */
                cleanComposer() {
                    try {
                        $(this).find('textarea.chatter_composer_textarea').val('');
                        $(this).find('.chatter_composer_parent_message_delete').click();
                        $(this).find('.chatter_composer_attachment_delete').click();
                        $(this).find('.chatter_composer_button_send ').prop('disabled', true);
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                /**
                * Remove external events.
                * @method removeExternalEvents
                */
                removeExternalEvents() {
                    try {
                        flexygo.events.off(this, 'entity', 'all');
                        flexygo.events.off(this, 'dialog', 'closed');
                        flexygo.events.off(this, 'navbar', 'toggled');
                        $('#mainContent, main.pageContainer').off('scroll.chatter');
                        $(window, $(this).closest('div.ui-dialog')).off('resize.chatter');
                        $(document).off('mouseup.chatter');
                        $('.flx-chatter.chatter-popover').remove();
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                /**
                * Establish webcomponent settings
                * @method configure
                */
                configure() {
                    let me = $(this);
                    let pageContext = flexygo.history.get(me.closest('.pageContainer'));
                    let obj = new flexygo.obj.Entity(pageContext.objectname);
                    if (typeof (pageContext.objectname) != 'undefined') {
                        let cnf = (obj.objectName) ? obj.getConfig() : null;
                        let defaults = {
                            ObjectName: (cnf) ? cnf.ObjectName : '',
                            ObjectPK: (cnf) ? (cnf.KeyFields.length === 1) ? cnf.KeyFields[0] : '' : '',
                        };
                        flexygo.nav.openPage('edit', 'sysChatter_Config', (cnf) ? "ObjectName = '" + cnf.ObjectName + "'" : null, defaults, 'modal900x400', false, $(this));
                        flexygo.events.on(this, 'entity', 'all', (e) => {
                            if (this === e.context && e.sender.objectName === 'sysChatter_Config') {
                                flexygo.events.off(this, 'entity', 'all');
                                flexygo.events.off(this, 'dialog', 'closed');
                                new flexygo.Process('ReloadCache', null, null).run(null, () => { flexygo.history.go(pageContext); });
                                flexygo.nav.closePage($('flx-edit[objectname="sysChatter_Config"]'));
                            }
                        });
                        flexygo.events.on(this, 'dialog', 'closed', (e) => {
                            if (this === e.context && e.sender.objectname === 'sysChatter_Config') {
                                flexygo.events.off(this, 'entity', 'all');
                                flexygo.events.off(this, 'dialog', 'closed');
                            }
                        });
                    }
                    else {
                        flexygo.msg.warning(flexygo.localization.translate('develop.selectobject'));
                    }
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = $(this);
                    this.connected = true;
                    this.moduleName = element.attr('ModuleName');
                    this.objectName = element.attr('ObjectName');
                    this.objectWhere = element.attr('ObjectWhere');
                    this.objectId = element.attr('ObjectId');
                    if (element.attr('manualInit') != 'true') {
                        this.init();
                    }
                }
                /**
                * Fires when element is detached to DOM
                * @method disconnectedCallback
                */
                disconnectedCallback() {
                    this.removeExternalEvents();
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
                    else if (attrName.toLowerCase() == 'ObjectId' && newVal && newVal != '') {
                        this.objectId = newVal;
                        needInit = true;
                    }
                    if (this.connected && needInit) {
                        this.init();
                    }
                }
            }
            wc.FlxChatterElement = FlxChatterElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-chatter', flexygo.ui.wc.FlxChatterElement);
//# sourceMappingURL=flx-chatter.js.map