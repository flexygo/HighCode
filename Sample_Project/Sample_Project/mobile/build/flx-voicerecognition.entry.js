import { r as registerInstance, k as h, l as getElement } from './index-3f6ae35e.js';
import { C as ConftokenProvider, q as Capacitor, D as Diagnostic, n as nav } from './conftoken-6a608b71.js';
import './process-es6-cc264d03.js';
import './jquery-254bc370.js';
import './_commonjsHelpers-2a12c1e6.js';
import './utils-515e0805.js';
import './animation-160b6d8d.js';
import './helpers-0fb1c204.js';
import './ios.transition-9f5405f1.js';
import './index-7e5eab7f.js';
import './md.transition-d5eeb7f8.js';
import './cubic-bezier-ed243a9b.js';
import './index-d086042f.js';
import './ionic-global-7b33f09f.js';
import './index-cc97b114.js';
import './index-f393b124.js';
import './hardware-back-button-508e48cf.js';
import './overlays-71eb67ef.js';

const flxVoicerecognitionCss = "flx-voicerecognition .mic-container{top:50%;z-index:1000000}flx-voicerecognition .mic{position:relative;color:white;font-size:89px;background:#125d7e;display:flex;justify-content:center;align-items:center;border-radius:50%;width:130px;height:130px;z-index:2}flx-voicerecognition .ripple{position:absolute;top:0;left:0;width:100%;height:100%;border-radius:50%;background-color:#125d7e;opacity:0;animation:ripple 1.5s infinite;z-index:1}flx-voicerecognition .ripple:nth-child(2){animation-delay:0.5s}flx-voicerecognition .ripple:nth-child(3){animation-delay:1s}ion-modal:has(flx-voicerecognition) .modal-wrapper.sc-ion-modal-md{background:transparent}@keyframes ripple{0%{transform:scale(1);opacity:1}100%{transform:scale(3);opacity:0}}flx-voicerecognition .close-btn{position:fixed;top:83%;left:50%;background-color:#ff5d5d;border-radius:50%;display:flex;color:white;font-size:38px}flx-voicerecognition .close-btn:hover{background-color:#cd4c4c}flx-voicerecognition .close-btn ion-icon{padding:4px}flx-voicerecognition .mic-container,flx-voicerecognition .close-btn{position:fixed;left:50%;transform:translate(-50%, -50%)}flx-voicerecognition .mic.zoomInOut{animation:zoomInOut 0.7s ease}@keyframes zoomInOut{0%{transform:scale(1)}30%{transform:scale(1.2)}100%{transform:scale(1)}}";

const FlxVoiceRecognition = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.transcript = '';
    this.cut = false; //When cut is true it will indicate that the user has clicked the mic button, so we want to stop listening, but if we do so it will trigger the onresult event, and stop the mic button animation from showing
    this.settingid = undefined;
    this.defaults = undefined;
  }
  componentWillLoad() {
  }
  async componentDidLoad() {
    const conf_token = await ConftokenProvider.config();
    const speech_recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!speech_recognition) {
      console.error('Speech Recognition API not supported in this browser.');
      return;
    }
    //We check for mic permissions before initiating speech recognition, if does not have we ask for them, and if they do not accept we just open directly the ai
    if (Capacitor.getPlatform() !== 'web' && !await Diagnostic.isMicrophoneAuthorized()) {
      await Diagnostic.requestMicrophoneAuthorization();
      if (!await Diagnostic.isMicrophoneAuthorized()) {
        this.component.closest('ion-modal').dismiss();
        return;
      }
    }
    this.voice_recognition = new speech_recognition();
    this.voice_recognition.continuous = true;
    this.voice_recognition.interimResults = true;
    this.voice_recognition.lang = conf_token.user.currentUserCultureId;
    //This is the event that will be triggered whenever the api recognices something new, even if the user hasn't stopped talking
    this.voice_recognition.onresult = (event) => {
      //We filter the results so we just use the one with the biggest confidence
      let result, greatest_confidence = -1;
      for (let i = 0; i < event.results.length; i++) {
        const new_result = event.results[i];
        if (new_result[0].confidence > greatest_confidence) {
          result = new_result;
        }
      }
      //We set the trancsript with the result with biggest confidence so if voice recognition has been cut it will use that value
      this.transcript = result[0].transcript;
      if (this.cut)
        return;
      if (result.isFinal && (!window.cordova || cordova.platformId !== 'android')) {
        this.component.closest('ion-modal').dismiss();
        const is_first_message_by_mic = true;
        nav.goAI(this.settingid, result[0].transcript, this.defaults, is_first_message_by_mic);
      }
    };
    //If its an Android we will use the last value that has been received instead of looking if the result isFinal because in Android that does not work properly
    if (window.cordova && cordova.platformId === 'android') {
      this.voice_recognition.onend = () => {
        if (this.cut)
          return;
        this.component.closest('ion-modal').dismiss();
        const is_first_message_by_mic = true;
        nav.goAI(this.settingid, this.transcript, this.defaults, is_first_message_by_mic);
      };
    }
    this.voice_recognition.start();
  }
  stopRecognition() {
    var _a;
    this.cut = true; //We set cut to true to avoid from automatically opening the AI page
    (_a = this.voice_recognition) === null || _a === void 0 ? void 0 : _a.stop();
    this.component.closest('ion-modal').dismiss();
  }
  cutRecognition() {
    var _a;
    //We add the class with the ZoomInOut animation
    this.component.querySelector('.mic').classList.add('zoomInOut');
    //We stop voice recognition
    this.cut = true;
    (_a = this.voice_recognition) === null || _a === void 0 ? void 0 : _a.stop();
    setTimeout(() => {
      const is_first_message_by_mic = true;
      nav.goAI(this.settingid, this.transcript, this.defaults, is_first_message_by_mic);
      this.component.closest('ion-modal').dismiss();
    }, 700); //We close the modal after the animation of the mic button has ended
  }
  render() {
    return ([
      h("div", { class: "mic-container" }, h("div", { class: "mic", onClick: () => this.cutRecognition() }, h("ion-icon", { name: "mic", role: "img", class: "md hydrated", "aria-label": "mic" })), h("div", { class: "ripple" }), h("div", { class: "ripple" }), h("div", { class: "ripple" })),
      h("div", { class: "close-btn", onClick: () => { this.stopRecognition(); } }, h("ion-icon", { name: "close-outline" }))
    ]);
  }
  get component() { return getElement(this); }
};
FlxVoiceRecognition.style = flxVoicerecognitionCss;

export { FlxVoiceRecognition as flx_voicerecognition };
