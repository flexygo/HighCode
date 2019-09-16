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
                    //If a constructor is defined, is REQUIRED call the super constructor
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
                    /* DEVELOPING: Documents
                    composerAttachments: flexygo.api.Chatter.composerAttachmentData[] = [];
                    DEVELOPING END: Documents */
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
                                                                <button class="DEVELOPING btn fa fa-smile-o chatter_composer_button_emoji" data-toggle="popover" tabindex="4" type="button"/>
                                                                <button class="DEVELOPING btn fa fa-paperclip chatter_composer_button_add_attachment" tabindex="5" type="button"/>
                                                                <button class="btn btn-icon fa fa-paper-plane-o chatter_composer_button_send hidden-lg hidden-md" tabindex="3" type="button"/>
                                                                <button class="DEVELOPING btn fa fa-expand chatter_composer_button_full_composer" tabindex="6" type="button"/>
                                                              </div>
                                                              <div class="chatter_composer_attachments"/>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div class="chatter_composer_send">
                                                          <button class="btn chatter_composer_button_send hidden-sm hidden-xs" tabindex="3" type="button">${flexygo.localization.translate('chatter.sendbutton')}</button>
                                                        </div>
                                                      </div>
                                                      <div class="chatter_thread"/>
                                                    </div>`;
                    /**
                    * Composer Attachment Template
                    * @property composerAttachmentTemplate {string}
                    */
                    /* DEVELOPING: Documents
                    composerAttachmentTemplate: Function = (composerAttachmentData: flexygo.api.Chatter.composerAttachmentData): string => `<div class="chatter_composer_attachment" chatter-attachment-id="${composerAttachmentData.id}">
                                                                                                                                                <div>
                                                                                                                                                    <i class="size-l fa ${this.getAttachmentIcon(composerAttachmentData.name.split('.').pop())}"/>
                                                                                                                                                    <small>${composerAttachmentData.name.split('.').slice(0, -1).join('.')}</small>
                                                                                                                                                </div>
                                                                                                                                                <div>
                                                                                                                                                    <i class="txt-danger flx-icon icon-close-1 chatter_composer_attachment_delete"></i>
                                                                                                                                                </div>
                                                                                                                                             </div>`;
                    DEVELOPING END: Documents */
                    /**
                    * Composer Message Template
                    * @property parentMessageTemplate {string}
                    */
                    /* DEVELOPING: Nested messages
                    parentMessageTemplate: Function = (parentMessageData: flexygo.api.Chatter.parentMessageData): string => `<div class="chatter_composer_parent_message" chatter-parent-message-id="${parentMessageData.id}">
                                                                                                                                <div>
                                                                                                                                    <small>
                                                                                                                                        <strong class="txt-outstanding">${parentMessageData.author}</strong>
                                                                                                                                        <p>${parentMessageData.content}</p>
                                                                                                                                    </small>
                                                                                                                                </div>
                                                                                                                                <div>
                                                                                                                                    <i class="chatter_composer_parent_message_delete size-l txt-danger flx-icon icon-close-1"/>
                                                                                                                                </div>
                                                                                                                            </div>`;
                    DEVELOPING END: Nested messages */
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
                    */
                    this.messageTemplate = (messageData) => `<div class="chatter_thread_message" chatter-message-id="${messageData.messageId}">
                                                                                                    <div class="chatter_thread_message_sidebar">
                                                                                                    <img src="${flexygo.utils.resolveUrl(messageData.avatar)}" class="chatter_thread_message_avatar img-circle"/>
                                                                                                    </div>
                                                                                                    <div class="chatter_thread_message_core">
                                                                                                        <p class="chatter_thread_message_info">
                                                                                                            <strong class="chatter_thread_author">${messageData.author}</strong><span class="chatter_thread_info_separator"/><small class="chatter_mail_timestamp" chatter-message-timestamp="${messageData.insertionDate}" title="${moment(messageData.insertionDate).locale(flexygo.profiles.culture).format('DD/MM/YYYY HH:mm:ss')}">${moment(messageData.insertionDate).locale(flexygo.profiles.culture).fromNow()}</small>
                                                                                                            <span class="chatter_thread_icons">
                                                                                                                <i title="${'Responder'}" class="DEVELOPING fa fa-lg chatter_thread_icon chatter_thread_message_reply fa-reply"/>
                                                                                                                <i title="${'Marcar como "Favorito"'}" class="DEVELOPING fa fa-lg chatter_thread_icon chatter_thread_message_favorite fa-star-o" chatter-message-favorite="false"/>
                                                                                                                <i title="${'Adjuntos'}" class="DEVELOPING fa fa-lg chatter_thread_icon chatter_thread_message_attachments fa-paperclip hide"/>
                                                                                                            </span>
                                                                                                        </p>
                                                                                                        <div class="chatter_thread_message_content">
                                                                                                            <p>${messageData.content}</p>
                                                                                                        </div>
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
                        //Change height of textarea
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
                        });
                        /* DEVELOPING: Documents
                        //Add attachment
                        me.find('.chatter_composer_button_add_attachment').off('click.chatter').on('click.chatter', function (): void {
                            $(document.createElement('input')).attr({ type: 'file', multiple: 'multiple' }).off('change.chatter').on('change.chatter', function (e: JQueryEventObject): void {
                                for (let file of (<any>e.currentTarget).files) {
                                    let reader: FileReader = new FileReader();
                                    reader.onload = (e: any) => {
                                        let composerAttachmentData: flexygo.api.Chatter.composerAttachmentData = { id: flexygo.utils.uniqueId(), name: file.name };
                                        (<FlxChatterElement>me[0]).composerAttachments.push({ id: composerAttachmentData.id, name: composerAttachmentData.name, base64: e.target.result.split(',')[1] })
                                        let attachment: JQuery = $((<FlxChatterElement>me[0]).composerAttachmentTemplate(composerAttachmentData)).prependTo(me.find('.chatter_composer_attachments'));
        
                                        setTimeout(function (): void {
                                            attachment.css({ opacity: 1, height: 36, padding: '0 10px', margin: '10px 0' });
                                        }, 20);
        
                                        attachment.find('.chatter_composer_attachment_delete').off('click.chatter').on('click.chatter', function (): void {
                                            (<FlxChatterElement>me[0]).composerAttachments.splice((<FlxChatterElement>me[0]).composerAttachments.map((attachment: flexygo.api.Chatter.composerAttachmentData) => attachment.id).indexOf(attachment.attr('chatter-attachment-id')), 1);
                                            attachment.css({ opacity: 0, height: 0, padding: 0, margin: 0 });
                                            setTimeout((): void => {
                                                attachment.remove();
                                            }, 150);
        
                                        });
                                    }
                                    reader.readAsDataURL(file);
                                }
                            }).click();
                        });
                        DEVELOPING END: Documents */
                        //Add message
                        me.find('.chatter_composer_button_send').off('click.chatter').on('click.chatter', function () {
                            me[0].setMessage();
                        });
                        //Update chatter_mail_timestamp
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
                        /* DEVELOPING: Nested messages
                        //Add parent message
                        message.find('.chatter_thread_message_reply').off('click.chatter').on('click.chatter', function (): void {
                            let message: JQuery = $(this).closest('.chatter_thread_message');
                            let parendId: string = message.attr('chatter-message-id');
                            let parentMessage: JQuery = me.find('.chatter_composer_parent_message');
                            if (parentMessage.attr('chatter-parent-message-id') != message.attr('chatter-message-id')) {
                                parentMessage.remove();
                                let parentMessageData: flexygo.api.Chatter.parentMessageData = {
                                    id: message.attr('chatter-message-id'),
                                    author: message.find('.chatter_thread_author').text(),
                                    content: message.find('.chatter_thread_message_content').text()
                                }
                                parentMessage = $((<FlxChatterElement>me[0]).parentMessageTemplate(parentMessageData)).prependTo(me.find('.chatter_composer_input'));
        
                                setTimeout(function (): void {
                                    parentMessage.css({ opacity: 1, height: 56, padding: 10, 'margin-bottom': 5 });
                                }, 0);
        
                                parentMessage.find('.chatter_composer_parent_message_delete').off('click.chatter').on('click.chatter', function (): void {
                                    parentMessage.css({ opacity: 0, height: 0, padding: 0, 'margin-bottom': 0 });
                                    setTimeout((): void => {
                                        parentMessage.remove();
                                    }, 150);
        
                                });
                            }
                        });
                        DEVELOPING END: Nested messages */
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
                            response.forEach((message) => { me.find('.chatter_thread').append(this.messageTemplate(message)); });
                            //me.find('.chatter_thread').append(this.separatorTemplate(new Date));
                        });
                        //this.setMessageEvents();
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
                            'DestinationObjectName': this.destinationObjectName,
                            'DestinationObjectId': this.destinationObjectId,
                            //'DestinationParentMessage': me.find('.chatter_composer_parent_message').attr('chatter-parent-message-id'),
                            'Content': $('textarea.chatter_composer_textarea').val(),
                        };
                        flexygo.ajax.post('~/api/Chatter', 'SetMessage', params, (response) => {
                            // debugger
                            //TODO:  create own prepend function for chatter
                            this.setMessageEvents($(this.messageTemplate(response)).prependTo(me.find('.chatter_thread')));
                        });
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                /**
                * Get attachment icon.
                * @method getAttachmentIcon
                */
                /* DEVELOPING: Documents
                getAttachmentIcon(extension: string): string {
                    switch (extension) {
                        case 'txt': {
                            return 'fa-file-text-o';
                        }
                        case 'pdf': {
                            return 'fa-file-pdf-o';
                        }
                        case 'doc':
                        case 'docx': {
                            return 'fa-file-word-o';
                        }
                        case 'xls':
                        case 'xlsx': {
                            return 'fa-file-excel-o';
                        }
                        case 'ppt':
                        case 'pptx': {
                            return 'fa-file-powerpoint-o';
                        }
                        case 'gif':
                        case 'jpg':
                        case 'jpeg':
                        case 'png':
                        case 'bmp':
                        case 'tif': {
                            return 'fa-file-image-o';
                        }
                        case 'zip':
                        case 'zipx':
                        case 'rar':
                        case 'tar':
                        case 'gz':
                        case 'dmg':
                        case 'iso': {
                            return 'fa-file-archive-o';
                        }
                        case 'wav':
                        case 'mp3':
                        case 'fla':
                        case 'flac':
                        case 'ra':
                        case 'rma':
                        case 'aif':
                        case 'aiff':
                        case 'aa':
                        case 'aac':
                        case 'aax':
                        case 'ac3':
                        case 'au':
                        case 'ogg':
                        case 'avr':
                        case '3ga':
                        case 'flac':
                        case 'mid':
                        case 'midi':
                        case 'm4a':
                        case 'mp4a':
                        case 'amz':
                        case 'mka':
                        case 'asx':
                        case 'pcm':
                        case 'm3u':
                        case 'wma':
                        case 'xwma': {
                            return 'fa-file-sound-o';
                        }
                        case 'avi':
                        case 'mpg':
                        case 'mp4':
                        case 'mkv':
                        case 'mov':
                        case 'wmv':
                        case 'vp6':
                        case '264':
                        case 'vid':
                        case 'rv':
                        case 'webm':
                        case 'swf':
                        case 'h264':
                        case 'flv':
                        case 'mk3d':
                        case 'gifv':
                        case 'oggv':
                        case '3gp':
                        case 'm4v':
                        case 'movie':
                        case 'divx': {
                            return 'a-file-video-o';
                        }
                        case 'css':
                        case 'js':
                        case 'py':
                        case 'git':
                        case 'py':
                        case 'cpp':
                        case 'h':
                        case 'ini':
                        case 'config':
                        case 'exe':
                        case 'jar':
                        case 'dll':
                        case 'bat':
                        case 'pl':
                        case 'scr':
                        case 'msi':
                        case 'app':
                        case 'deb':
                        case 'apk':
                        case 'jar':
                        case 'vb':
                        case 'prg':
                        case 'sh':
                        case 'html':
                        case 'htm':
                        case 'xhtml':
                        case 'jhtml':
                        case 'php':
                        case 'php3':
                        case 'php4':
                        case 'php5':
                        case 'phtml':
                        case 'asp':
                        case 'aspx':
                        case 'cfm': {
                            return 'fa-file-code-o';
                        }
                        default: {
                            return 'fa-file-o';
                        }
                    }
                }
                DEVELOPING END: Documents */
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
                    flexygo.events.off(this, 'entity', 'all');
                    flexygo.events.off(this, 'dialog', 'closed');
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