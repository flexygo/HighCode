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
            * Library for the FlxAIElement
            *
            * @class FlxAIElement
            * @constructor
            * @return {FlxAIElement} .
            */
            class FlxAIElement extends HTMLElement {
                constructor() {
                    //If a constructor is defined, is REQUIRED call the super constructor
                    super();
                    this.initTemplate = `
<div class="chat_window">
    <div class="top_menu">
        <div class="buttons">
            <div class="fa fa-close chat_ai_close"></div>
        </div>
        <div class="title">Chat</div>
    </div>
    <ul class="messages">
    </ul>
    <div class="bottom_wrapper">
        <div class="message_input_wrapper">
            <div class="textarea_container">
                <textarea class="message_input" tabindex="2" placeholder="Ask for something..."></textarea>
            </div>
            <button id="send_voice_message" class="send_message btn flx-icon icon-mic"></button>
            <button id="send_text_message" class="send_message btn flx-icon icon-order-right" disabled></button>
        </div>
        <div class="chat_tools btn-group"></div>
    </div>
</div>`;
                    this.messageTemplate = `
      <li class="message {{positionClass}}">
  <div class="avatar">
    <img is="flx-img" alt="{{avatar}}" src="{{srcavatar}}" class="chatter_thread_message_avatar img-circle">
    <div class="chat_ai_timestamp">{{time}}</div>
  </div>
  <div class="text_wrapper">
    <div class="chat_ai_author">
        <span>{{author}}</span>
        
    </div>
    <div class="chat_ai_text">{{message}}</div>
  </div>
</li>`;
                    /**
                    * Set if element has been connected to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                    /**
                    * ChatGPT messages
                    * @property messages {string}
                    */
                    this.messages = [];
                }
                /**
                * Init the webcomponent. REQUIRED.
                * @method init
                */
                init() {
                    this.render();
                    flexygo.ajax.post('~/api/AI', 'GetChatGPTSetting', { SettingId: this.settingId }, (response) => {
                        if (response && response.SettingId == this.settingId) {
                            this.settings = response;
                            this.getButtons();
                            let beginMessage = flexygo.utils.isBlank(this.settings.IntroMessage) ? flexygo.localization.translate('flxai.beginMessage') : this.settings.IntroMessage;
                            this.writeMessage("assistant", 'AI', './img/lowdy.png', 'Lowdy', moment().format('LT'), beginMessage, false, "left_message");
                        }
                        else {
                            $(this).closest('.ui-dialog').find('button.ui-dialog-titlebar-close').click();
                            flexygo.msg.error(flexygo.localization.translate('flxai.settingNotFound').replace("{0}", this.settingId));
                        }
                    }, (error) => {
                        let context = $('flx-ai');
                        if (context.length > 0) {
                            $('flx-ai').closest('.ui-dialog').find('button.ui-dialog-titlebar-close').click();
                        }
                        flexygo.exceptions.httpShow(error);
                    });
                }
                /**
                * Refresh de webcomponent. REQUIRED.
                * @method refresh
                */
                refresh() {
                    this.messages = [];
                    this.render();
                    this.getButtons();
                    let beginMessage = flexygo.utils.isBlank(this.settings.IntroMessage) ? flexygo.localization.translate('flxai.beginMessage') : this.settings.IntroMessage;
                    this.writeMessage("assistant", 'AI', './img/lowdy.png', 'Lowdy', moment().format('LT'), beginMessage, false, "left_message");
                }
                /**
                * Render HTML data.
                * @method render
                */
                render() {
                    let me = this;
                    $(this).empty();
                    $(this).html(this.initTemplate);
                    this.input = $(this).find('.message_input_wrapper .message_input')[0];
                    this.sendButton = $(this).find('#send_text_message');
                    this.voiceButton = $(this).find('#send_voice_message');
                    if ($(this).attr("typeId") == "chat") {
                        $(this).find('.chat_ai_close').off('click.closeAI').on('click.closeAI', () => {
                            me.close();
                        });
                        $(this).closest('.ui-dialog[role="dialog"]').off('click.close_chat_ai').on('click.close_chat_ai', (e) => {
                            if ($(e.target.closest('flx-ai')).length == 0 && !$(e.target).is('button.ui-dialog-titlebar-close')) {
                                me.close();
                            }
                        });
                    }
                    this.sendButton.off('click.send_message_AI').on('click.send_message_AI', (e) => {
                        if (!e.currentTarget.hasAttribute("disabled")) {
                            if (!flexygo.utils.isBlank(this.settings.BearerToken)) {
                                this.sendToAI(this.input.value);
                            }
                            else {
                                let btnLink = '<a class="btn fa fa-external-link" onclick="flexygo.nav.openHelpId(\'syshelp-OpenAI\',\'new\',false,$(this))" target="_blank"/a>';
                                flexygo.msg.alert(`<div><span>${flexygo.localization.translate('flxai.alertInfoMessage')}</span> ${btnLink}</div>`);
                            }
                        }
                    });
                    this.voiceButton.on('click', (e) => {
                        if (this.voiceButton.hasClass("listening")) {
                            this.recognition.stop();
                        }
                        else {
                            let speechOk = false;
                            try {
                                if (webkitSpeechRecognition) {
                                    speechOk = true;
                                }
                            }
                            catch (ex) {
                                speechOk = false;
                            }
                            if (speechOk) {
                                this.recognition = new webkitSpeechRecognition();
                                this.recognition.interimResults = true;
                                this.recognition.continuous = true;
                                this.recognition.start();
                                const pastInput = this.input.value;
                                this.recognition.onstart = () => {
                                    this.sendButton.prop("disabled", true);
                                    this.input.placeholder = flexygo.localization.translate('flxsearch.speak');
                                    this.voiceButton.addClass('listening');
                                };
                                this.recognition.onresult = (event) => {
                                    if (pastInput.trim().length > 0) {
                                        this.input.value = pastInput + ' ' + event.results[0][0].transcript;
                                    }
                                    else {
                                        this.input.value = event.results[0][0].transcript;
                                    }
                                    me.resizeInput();
                                    if (event.results[0].isFinal) {
                                        this.recognition.stop();
                                    }
                                };
                                this.recognition.onspeechend = () => {
                                    this.recognition.stop();
                                };
                                this.recognition.onend = () => {
                                    this.voiceButton.removeClass('listening');
                                    this.input.placeholder = "Ask for something...";
                                    this.input.focus();
                                    if (this.input.value.trim().length > 0) {
                                        this.sendButton.removeAttr("disabled");
                                    }
                                };
                            }
                            else {
                                $('#send_voice_button').remove();
                            }
                        }
                    });
                    $(this.input).keydown(function (event) {
                        if (event.keyCode === 13 && !event.shiftKey) {
                            event.preventDefault();
                            me.sendButton.click();
                        }
                    });
                    $(this.input).off('input').on('input', () => {
                        if (me.input.value && !me.sendButton.hasClass("waitingResponse")) {
                            me.sendButton.removeAttr("disabled");
                        }
                        else {
                            me.sendButton[0].setAttribute("disabled", "disabled");
                        }
                        me.resizeInput();
                    });
                }
                getButtons() {
                    try {
                        let me = this;
                        this.settings.PromptsBar.forEach((button) => {
                            let btn = $(`<button id="${button.ButtonId}" class="btn btn-default ${button.IconName}" tabindex="5" type="button" title="${button.Title}"/>`);
                            if (!flexygo.utils.isBlank(me.targetItem) && me.targetItem.length > 0) {
                                let value = $(me.targetItem).attr("property");
                                if (!flexygo.utils.isBlank(value)) {
                                    button.Prompt = button.Prompt.replace(/{{Value}}/g, `{{${value}}}`);
                                }
                            }
                            btn.off(`click.${button.ButtonId}`).on(`click.${button.ButtonId}`, () => { this.sendButton.removeAttr("disabled"); this.input.value = button.Prompt; this.sendButton.focus(); me.resizeInput(); });
                            $(this).find('.chat_tools').append(btn);
                        });
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                /**
                * Send message to AI.
                * @method sendToAI
                * @param {String} message. Message to send to AI
                */
                sendToAI(message) {
                    var _a;
                    let json = new Object();
                    let plainJson = new Object();
                    // Only if its not called from a toolbar
                    if (!flexygo.utils.isBlank(this.targetItem) && this.targetItem.length > 0 && $((_a = this.targetItem) === null || _a === void 0 ? void 0 : _a.context).is('button')) {
                        let module = this.targetItem.closest('flx-module')[0];
                        let properties = $(module).find('[property]');
                        properties.each(function () {
                            plainJson[$(this).attr('property')] = this.getValue();
                            if ($(this).is('flx-code')) {
                                let value = $(this).attr('type') == 'html' ? flexygo.string.escapeHTML(this.getValue()) : this.getValue();
                                json[$(this).attr('property')] = `<flx-code forcecodemirror="true" help mode="view" type="${$(this).attr('type')}" value="${value}"/>`;
                            }
                            else {
                                json[$(this).attr('property')] = this.getValue();
                            }
                        });
                    }
                    message = flexygo.utils.parseAIMessage(message);
                    let originalMessage = flexygo.utils.parser.recursiveCompile(plainJson, message);
                    message = flexygo.utils.parser.recursiveCompile(json, message);
                    this.writeMessage("user", flexygo.context.currentUserLogin.toUpperCase(), '', flexygo.context.currentUserFullName, moment().format('LT'), message, false, "right_message", originalMessage);
                    let contextMessages;
                    if (this.messages.length >= this.settings.MaxLevel) {
                        //Obtein de index of real messages and exclude funcion calls
                        let indexMessages = this.messages.map(function (message, index) {
                            if (message.tool_call_id == undefined) {
                                return index;
                            }
                        }).filter(index => index !== undefined);
                        indexMessages = indexMessages.slice(-this.settings.MaxLevel);
                        contextMessages = this.messages.slice(indexMessages[0]);
                    }
                    else {
                        contextMessages = this.messages;
                    }
                    let params = {
                        Chat: this.settings,
                        Messages: JSON.stringify(contextMessages)
                    };
                    this.writeMessage("assistant", 'AI', './img/lowdy.png', 'Lowdy', moment().format('LT'), '<i class="flx-icon icon-load icon-pulse"></i>', false, "left_message");
                    this.input.value = '';
                    this.input.style.height = "40px";
                    this.sendButton.addClass("waitingResponse");
                    this.sendButton[0].setAttribute("disabled", "disabled");
                    flexygo.ajax.post("~/api/AI", 'RequestChatGPT', params, (response) => {
                        if (response) {
                            let resp = JSON.parse(response);
                            if (resp.error) {
                                this.updateLastMessage("assistant", 'AI', './img/lowdy.png', 'Lowdy', moment().format('LT'), resp.error.message, false, "left_message");
                            }
                            else if (resp.choices && resp.choices[0]) {
                                if (resp.choices[0].message.content) {
                                    let originalMessage = resp.choices[0].message.content;
                                    let message = flexygo.utils.parseAIMessage(originalMessage);
                                    this.updateLastMessage("assistant", 'AI', './img/lowdy.png', 'Lowdy', moment().format('LT'), message, true, "left_message", originalMessage);
                                }
                                else {
                                    this.updateLastMessage("assistant", 'AI', './img/lowdy.png', 'Lowdy', moment().format('LT'), 'ERROR', false, "left_message");
                                }
                            }
                            else {
                                this.updateLastMessage("assistant", 'AI', './img/lowdy.png', 'Lowdy', moment().format('LT'), 'ERROR', false, "left_message");
                            }
                        }
                        this.sendButton.removeClass("waitingResponse");
                        if (this.input.value) {
                            this.sendButton.removeAttr("disabled");
                        }
                    });
                }
                writeMessage(role, avatar, srcavatar, author, time, message, enableReturn, positionClass, originalMessage = null) {
                    this.messages.push({ "role": role, "content": originalMessage ? originalMessage : message });
                    originalMessage = originalMessage ? originalMessage : message;
                    let msg = this.messageTemplate;
                    msg = flexygo.utils.parser.compile({ "avatar": avatar, "srcavatar": srcavatar, "author": author, time: time, "message": message, "positionClass": positionClass }, msg);
                    msg = $(msg);
                    $(this).find('.messages').append(msg);
                    $(this).find('.messages').scrollTop($(this).find('.message:last')[0].offsetTop);
                    msg.addClass('appeared');
                    setTimeout(() => {
                        $(this).find('.messages').scrollTop($(this).find('.message:last')[0].offsetTop);
                    }, 500);
                    if (enableReturn) {
                        this.setReturnButton(msg, originalMessage);
                    }
                }
                parseToMarkdown(message) {
                    if (typeof marked !== 'undefined') {
                        const codeBlocks = message.match(/<flx-code [\s\S]*?<\/flx-code>/g) || [];
                        let newMessage = message;
                        codeBlocks.forEach((codeBlock, index) => {
                            newMessage = message.replace(codeBlock, `__CODE_BLOCK_${index}__`);
                        });
                        newMessage = newMessage.replace(/<\/?p>/gi, '\n');
                        newMessage = newMessage.replace(/<br\s*\/?>/gi, '\n');
                        newMessage = newMessage.replace(/__CODE_BLOCK_(\d+)__/g, (match, index) => {
                            return codeBlocks[index];
                        });
                        return marked.parse(newMessage);
                    }
                    else {
                        return message;
                    }
                }
                updateLastMessage(role, avatar, srcavatar, author, time, message, enableReturn, positionClass, originalMessage = null) {
                    this.messages[this.messages.length - 1] = { "role": role, "content": originalMessage ? originalMessage : message };
                    originalMessage = originalMessage ? originalMessage : message;
                    let msg;
                    try {
                        msg = this.messageTemplate;
                        msg = flexygo.utils.parser.compile({ "avatar": avatar, "srcavatar": srcavatar, "author": author, time: time, "message": this.parseToMarkdown(message), "positionClass": positionClass }, msg);
                        msg = $(msg);
                        $(this).find('.messages .message:last').replaceWith(msg);
                    }
                    catch (_a) {
                        msg = this.messageTemplate;
                        msg = flexygo.utils.parser.compile({ "avatar": avatar, "srcavatar": srcavatar, "author": author, time: time, "message": "Error representing the information. Try again. If the problem persists, consider changing to a better model.", "positionClass": positionClass }, msg);
                        msg = $(msg);
                        $(this).find('.messages .message:last').replaceWith(msg);
                    }
                    msg.addClass('appeared');
                    setTimeout(() => { $(this).find('.messages').scrollTop($(this).find('.message:last')[0].offsetTop); }, 500);
                    if (enableReturn) {
                        this.setReturnButton(msg, originalMessage);
                    }
                }
                updateLastFunctionMessage(avatar, srcavatar, author, time, message, enableReturn, positionClass, originalMessage) {
                    let msg = this.messageTemplate;
                    msg = flexygo.utils.parser.compile({ "avatar": avatar, "srcavatar": srcavatar, "author": author, time: time, "message": message, "positionClass": positionClass }, msg);
                    msg = $(msg);
                    $(this).find('.messages .message:last').replaceWith(msg);
                    msg.addClass('appeared');
                    setTimeout(() => { $(this).find('.messages').scrollTop($(this).find('.message:last')[0].offsetTop); }, 500);
                    if (enableReturn) {
                        this.setReturnButton(msg, originalMessage);
                    }
                }
                setReturnButton(msgElement, originalMessage) {
                    var _a;
                    // Only if its not called from a toolbar
                    if (!flexygo.utils.isBlank(this.targetItem) && this.targetItem.length > 0 && $((_a = this.targetItem) === null || _a === void 0 ? void 0 : _a.context).is('button')) {
                        if (this.targetItem.is('flx-htmledit'))
                            originalMessage = flexygo.utils.parser.replaceAll(originalMessage, '\n', '<br/>');
                        if (msgElement.find('flx-code').length <= 0) {
                            msgElement.find('.chat_ai_author').append($('<button class="flx-icon icon-return-2 copy_response icon-zoom-115" type="button"/>'));
                            msgElement.find('.chat_ai_author .copy_response').on("click", () => {
                                if (this.targetItem.is('flx-code')) {
                                    this.targetItem[0].setValueWithHistory(originalMessage);
                                }
                                else {
                                    this.targetItem.val(originalMessage);
                                }
                                $(this).find('.chat_ai_close').click();
                            });
                        }
                    }
                }
                /**
                *
                * @method open
                */
                open(options) {
                    if (!flexygo.utils.isBlank(options.TargetItem) && options.TargetItem.length > 0 || !flexygo.utils.isBlank(options.SettingId)) {
                        let histObj = new flexygo.nav.FlexygoHistory();
                        histObj.targetid = 'slideright';
                        let modal = flexygo.targets.createContainer(histObj, true, null, true);
                        if (!modal) {
                            return;
                        }
                        modal.empty();
                        modal.closest('.ui-dialog').find('.ui-dialog-title').html('Lowdy');
                        let id = options.TargetItem ? options.TargetItem[0].options.ChatGPTSettingId : options.SettingId;
                        let vm = ($(`<flx-ai SettingId="${id}" mode="template"></flx-ai>`)[0]);
                        vm.targetItem = options.TargetItem;
                        modal.append(vm);
                    }
                }
                open_from_toolbar(settingId, module) {
                    let histObj = new flexygo.nav.FlexygoHistory();
                    histObj.targetid = 'slideright';
                    let modal = flexygo.targets.createContainer(histObj, true, null, true);
                    if (!modal) {
                        return;
                    }
                    modal.empty();
                    modal.closest('.ui-dialog').find('.ui-dialog-title').html('Lowdy');
                    let vm = ($(`<flx-ai SettingId="${settingId}" mode="template"></flx-ai>`)[0]);
                    vm.targetItem = module;
                    modal.append(vm);
                }
                close(e) {
                    flexygo.events.off(this, "dialog", "closing");
                    let closeButton = $(this).closest('.ui-dialog').find('button.ui-dialog-titlebar-close');
                    if (closeButton.length > 0) {
                        $(this).find('.chat_window').addClass('closing');
                        closeButton.trigger('click');
                    }
                }
                resizeInput() {
                    this.input.style.height = '40px';
                    let initialChatWindowHeight = $(this).find('.chat_window').height();
                    const numberOfLines = Math.ceil(this.input.scrollHeight / 24) - 1;
                    const newHeight = numberOfLines == 1 ? 40 : 40 + (numberOfLines * 24);
                    if ($(this.input).height() < newHeight) {
                        this.input.style.height = `${newHeight}px`;
                    }
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = $(this);
                    if (!flexygo.utils.isBlank($(this).attr("SettingId"))) {
                        this.settingId = $(this).attr("SettingId");
                    }
                    else {
                        let objectwhere = $(this).attr("objectwhere");
                        this.settingId = objectwhere ? objectwhere.split("=")[1].replaceAll("'", "") : null;
                    }
                    if (flexygo.utils.isBlank($(this).attr("typeId"))) {
                        $(this).attr("typeId", "chat");
                    }
                    this.connected = true;
                    if ($(this).attr("typeId") == "chat") {
                        flexygo.events.on(this, "dialog", "closing", this.close);
                    }
                    if ($(document.head).find('script[class="ai"]').length === 0) {
                        const script = document.createElement('script');
                        script.setAttribute('class', 'ai');
                        script.setAttribute('type', 'text/javascript');
                        script.innerHTML = `import('${flexygo.utils.resolveUrl('~/js/plugins/marked/marked.min.js')}').then((module) => {
                    $('flx-ai')[0].init();
                }).catch((error) => {
                    console.error('Error loading the module:', error);
                });`;
                        document.head.appendChild(script);
                    }
                    else {
                        this.init();
                    }
                }
                /**
                * Fires when the attribute value of the element is changed.
                * @method attributeChangedCallback
                */
                attributeChangedCallback(attrName, oldVal, newVal) {
                    let needInit = false;
                    if (attrName.toLowerCase() == 'settings' && newVal && newVal != '') {
                        this.settings = newVal;
                        needInit = true;
                    }
                    if (this.connected && needInit) {
                        this.init();
                    }
                }
                /**
                * Fires when element is detached to DOM
                * @method disconnectedCallback
                */
                disconnectedCallback() {
                    if (this.voiceButton.hasClass("listening")) {
                        this.recognition.stop();
                    }
                }
            }
            /**
            * Array of observed attributes. REQUIRED
            * @property observedAttributes {Array}
            */
            FlxAIElement.observedAttributes = ['settings'];
            wc.FlxAIElement = FlxAIElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define("flx-ai", flexygo.ui.wc.FlxAIElement);
//# sourceMappingURL=flx-ai.js.map