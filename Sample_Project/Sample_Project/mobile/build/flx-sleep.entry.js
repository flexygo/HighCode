import { r as registerInstance, k as h } from './index-3f6ae35e.js';
import { k as flxSync, z as storage, W as Webapi, u as util } from './conftoken-6a608b71.js';
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

const flxSleepCss = "ion-content.darkBackground{--ion-background-color:#333333;--ion-background-color-rgb:51,51,51;--ion-color-primary:#2db7b0;--ion-text-color:#dddddd;--ion-text-color-rgb:221,221,221;--ion-color-step-50:#3c3c3c;--ion-color-step-100:#444444;--ion-color-step-150:#4d4d4d;--ion-color-step-200:#555555;--ion-color-step-250:#5e5e5e;--ion-color-step-300:#666666;--ion-color-step-350:#6f6f6f;--ion-color-step-400:#777777;--ion-color-step-450:#808080;--ion-color-step-500:#888888;--ion-color-step-550:#919191;--ion-color-step-600:#999999;--ion-color-step-650:#a2a2a2;--ion-color-step-700:#aaaaaa;--ion-color-step-750:#b3b3b3;--ion-color-step-800:#bbbbbb;--ion-color-step-850:#c4c4c4;--ion-color-step-900:#cccccc;--ion-color-step-950:#d5d5d5}ion-content>div.loginScreen{display:flex;flex-direction:column;justify-content:center;height:100%}ion-content>div.loginScreen.hidden{display:none}ion-content>div.loginScreen p{font-size:25px;font-style:italic}";

const FlxSleep = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.advOpt = false;
    this.profileName = undefined;
    this.logo = './assets/img/logo.png';
  }
  async componentWillLoad() {
    flxSync.checkSendErrors();
    this.loadLogo();
  }
  async loadLogo() {
    const flexy_apps = await storage.get('flexyApp');
    const api_info = await (new Webapi()).getWebApiInfo(flexy_apps.sleepModeURL + '/WebApi');
    if (api_info && api_info.tags && ((!api_info.flxDataError) || (api_info.flxDataError && api_info.flxDataError.Message === 'An error has occurred.'))) {
      const logo_tag = api_info.tags.find((el) => {
        if (el.name === 'Logo')
          return el;
      });
      if (logo_tag === null || logo_tag === void 0 ? void 0 : logo_tag.description) {
        this.logo = logo_tag.description;
      }
    }
  }
  showAccounts(trigger_element) {
    const ion_content = trigger_element.closest('ion-content.sleepScreen');
    ion_content.classList.remove('darkBackground');
    ion_content.querySelector('.loginScreen').classList.add('hidden');
    ion_content.querySelector('flx-accountslist').classList.remove('hidden');
  }
  hideAccounts(trigger_element) {
    const ion_content = trigger_element.closest('ion-content.sleepScreen');
    ion_content.classList.add('darkBackground');
    ion_content.querySelector('.loginScreen').classList.remove('hidden');
    ion_content.querySelector('flx-accountslist').classList.add('hidden');
  }
  render() {
    return [
      h("ion-content", { class: "sleepScreen darkBackground" }, h("div", { class: "loginScreen" }, h("div", { class: "ion-text-center ion-padding-horizontal" }, h("ion-label", null, h("img", { alt: "Logo", style: { maxHeight: "80px" }, src: this.logo }))), h("p", { class: "ion-text-center", "size-md": "11", "size-lg": "6" }, util.translate('login.sleepMode', true)), h("div", { class: "ion-padding" }, h("ion-button", { size: "large", color: "outstanding", shape: "round", expand: "block", onClick: ev => { this.showAccounts(ev.srcElement); } }, util.translate('login.login', true)))), h("flx-accountslist", { show_all_accounts: true, is_admin: false /*Esto hace falta cambiarlo*/, back_function: ev => this.hideAccounts(ev.srcElement), class: "hidden" }))
    ];
  }
};
FlxSleep.style = flxSleepCss;

export { FlxSleep as flx_sleep };
