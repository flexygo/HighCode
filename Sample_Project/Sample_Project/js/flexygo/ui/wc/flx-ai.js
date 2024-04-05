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
            <textarea class="message_input" tabindex="2" placeholder="Ask for something..."></textarea>
            <button class="send_message btn flx-icon icon-order-right" disabled></button>
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
                    flexygo.ajax.post('~/api/AI', 'GetChatGPTSetting', { SettingId: $(this).attr("SettingId") }, (response) => {
                        if (response && response.SettingId == $(this).attr("SettingId")) {
                            this.settings = response;
                            this.render();
                        }
                        else {
                            $(this).closest('.ui-dialog').find('button.ui-dialog-titlebar-close').click();
                            flexygo.msg.error(flexygo.localization.translate('flxai.settingNotFound').replace("{0}", $(this).attr("SettingId")));
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
                    this.sendButton = $(this).find('.send_message');
                    $(this).find('.chat_ai_close').off('click.closeAI').on('click.closeAI', () => {
                        me.close();
                    });
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
                    $(this).closest('.ui-dialog[role="dialog"]').off('click.close_chat_ai').on('click.close_chat_ai', (e) => {
                        if ($(e.target.closest('flx-ai')).length == 0 && !$(e.target).is('button.ui-dialog-titlebar-close')) {
                            me.close();
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
                    });
                    this.getButtons();
                    this.writeMessage("assistant", 'AI', './img/lowdy.png', 'Lowdy', moment().format('LT'), flexygo.localization.translate('flxai.beginMessage'), false, "left_message");
                }
                getButtons() {
                    try {
                        let me = this;
                        this.settings.PromptsBar.forEach((button) => {
                            let btn = $(`<button id="${button.ButtonId}" class="btn btn-default ${button.IconName}" tabindex="5" type="button" title="${button.Title}"/>`);
                            button.Prompt = button.Prompt.replace(/{{Value}}/g, `{{${me.targetItem.attr("property")}}}`);
                            btn.off(`click.${button.ButtonId}`).on(`click.${button.ButtonId}`, () => { this.sendButton.removeAttr("disabled"); this.input.value = button.Prompt; this.sendButton.focus(); });
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
                    let json = new Object();
                    let plainJson = new Object();
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
                    let originalMessage = flexygo.utils.parser.recursiveCompile(plainJson, message);
                    message = flexygo.utils.parser.recursiveCompile(json, message);
                    this.writeMessage("user", flexygo.context.currentUserLogin.toUpperCase(), '', flexygo.context.currentUserFullName, moment().format('LT'), message, false, "right_message", originalMessage);
                    let contextMessages = this.messages.length >= this.settings.MaxLevel ? this.messages.slice(-this.settings.MaxLevel) : this.messages;
                    let params = {
                        ApiUrl: this.settings.ApiUrl,
                        Messages: JSON.stringify(contextMessages),
                        BearerToken: this.settings.BearerToken,
                        Model: this.settings.Model,
                        SystemPrompt: this.settings.SystemPrompt
                    };
                    this.writeMessage("assistant", 'AI', './img/lowdy.png', 'Lowdy', moment().format('LT'), '<i class="flx-icon icon-load icon-pulse"></i>', false, "left_message");
                    this.input.value = '';
                    this.sendButton.addClass("waitingResponse");
                    this.sendButton[0].setAttribute("disabled", "disabled");
                    flexygo.ajax.post("~/api/AI", 'RequestChatGPT', params, (response) => {
                        if (response) {
                            let resp = JSON.parse(response);
                            if (resp.error) {
                                this.updateLastMessage("assistant", 'AI', './img/lowdy.png', 'Lowdy', moment().format('LT'), resp.error.message, false, "left_message");
                            }
                            else if (resp.choices && resp.choices[0] && resp.choices[0].message.content) {
                                let originalResponse = resp.choices[0].message.content;
                                let response = this.parseMessage(originalResponse);
                                this.updateLastMessage("assistant", 'AI', './img/lowdy.png', 'Lowdy', moment().format('LT'), response, true, "left_message", originalResponse);
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
                updateLastMessage(role, avatar, srcavatar, author, time, message, enableReturn, positionClass, originalMessage = null) {
                    this.messages[this.messages.length - 1] = { "role": role, "content": originalMessage ? originalMessage : message };
                    originalMessage = originalMessage ? originalMessage : message;
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
                    if (this.targetItem.is('flx-htmledit'))
                        originalMessage = flexygo.utils.parser.replaceAll(originalMessage, '\n', '<br/>');
                    if (msgElement.find('flx-code').length > 0) {
                        flexygo.events.on(this, "codeProperty", "returnAction", this.returnCode);
                    }
                    else {
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
                returnCode(ev) {
                    flexygo.events.off(this, "codeProperty", "returnAction");
                    let message = $(ev.sender).closest('flx-code')[0].getValue();
                    if (this.targetItem.is('flx-code')) {
                        this.targetItem[0].setValueWithHistory(message);
                    }
                    else {
                        this.targetItem.val(message);
                    }
                    $(this).find('.chat_ai_close').click();
                }
                parseMessage(message) {
                    let codeBlocks = message.match(/```(\w+)?([\s\S]*?)```/g);
                    if (codeBlocks) {
                        codeBlocks.forEach((codeBlock) => {
                            let language = 'plaintext';
                            let content = codeBlock;
                            let matchLanguage = codeBlock.match(/```(\w+)/);
                            if (matchLanguage) {
                                language = matchLanguage[1];
                                content = codeBlock.replace(/```(\w+)/, ''); // Elimina el nombre del lenguaje
                            }
                            content = content.replace(/```/img, '').trim(); // Elimina las comillas de apertura
                            content = flexygo.string.escapeHTML(content);
                            content = content.replace(/\n/img, '&#10');
                            message = message.replace(codeBlock, `<flx-code forcecodemirror="true" returnEnabled="true" help mode="view" type="${language}" value="${content}"></flx-code>`);
                        });
                    }
                    else {
                        message = flexygo.string.escapeHTML(message);
                    }
                    message = `<p>${message}</p>`;
                    message = message.replace(/\n\n/img, '</p><p>');
                    message = message.replace(/\n/img, '<br>');
                    return message;
                }
                /**
                *
                * @method open
                */
                open(e) {
                    let histObj = new flexygo.nav.FlexygoHistory();
                    histObj.targetid = 'slideright';
                    let modal = flexygo.targets.createContainer(histObj, true, null, true);
                    if (!modal) {
                        return;
                    }
                    modal.empty();
                    modal.closest('.ui-dialog').find('.ui-dialog-title').html('Lowdy');
                    let vm = ($(`<flx-ai SettingId="${e[0].options.ChatGPTSettingId}" mode="template"></flx-ai>`)[0]);
                    vm.targetItem = e;
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
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = $(this);
                    this.connected = true;
                    flexygo.events.on(this, "dialog", "closing", this.close);
                    this.init();
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