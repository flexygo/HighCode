import { r as registerInstance, k as h } from './index-3f6ae35e.js';
import { j as jquery } from './jquery-254bc370.js';
import { i as gps, z as storage, W as Webapi, C as ConftokenProvider, m as msg, u as util, k as flxSync, n as nav } from './conftoken-6a608b71.js';
import './_commonjsHelpers-2a12c1e6.js';
import './process-es6-cc264d03.js';
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

const flxLoginCss = "ion-content.loginpage{--ion-background-color:#333333;--ion-background-color-rgb:51,51,51;--ion-color-primary:#2db7b0;--ion-text-color:#dddddd;--ion-text-color-rgb:221,221,221;--ion-color-step-50:#3c3c3c;--ion-color-step-100:#444444;--ion-color-step-150:#4d4d4d;--ion-color-step-200:#555555;--ion-color-step-250:#5e5e5e;--ion-color-step-300:#666666;--ion-color-step-350:#6f6f6f;--ion-color-step-400:#777777;--ion-color-step-450:#808080;--ion-color-step-500:#888888;--ion-color-step-550:#919191;--ion-color-step-600:#999999;--ion-color-step-650:#a2a2a2;--ion-color-step-700:#aaaaaa;--ion-color-step-750:#b3b3b3;--ion-color-step-800:#bbbbbb;--ion-color-step-850:#c4c4c4;--ion-color-step-900:#cccccc;--ion-color-step-950:#d5d5d5}ion-toolbar.applist{--ion-background-color:#2db7b0;color:white}ion-grid{margin-top:env(safe-area-inset-top)}ion-spinner.urlSpinner{width:15px}label#URLError{color:red;float:right;position:absolute;bottom:0px;right:0px;font-size:0.8em}ion-icon.urlState[name=\"close-circle-outline\"]{color:red}ion-icon.urlState[name=\"checkmark-circle-outline\"]{color:#a2ff6c7c}ion-content>div.loginScreen{height:100%;display:flex;flex-direction:column;justify-content:center}ion-content.comesFromSleep>div.loginScreen .logItem{margin-bottom:56px}";

const FlxLogin = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.url = '';
    this.user = '';
    this.pass = '';
    this.logo = './assets/img/logo.png';
    this.sameUrlAndUser = false;
    this.oldUrl = '';
    this.oldUser = '';
    this.comes_from_sleep = false;
    this.apps = undefined;
    this.modal = undefined;
  }
  componentWillLoad() {
    this.refresh();
    if (window.cordova && cordova.platformId === 'android') {
      gps.showActivationMsg(null, false);
    }
    storage.get('flexyApp').then((apps) => {
      if (apps.sleepModeURL)
        this.comes_from_sleep = true;
    });
  }
  componentDidLoad() {
    jquery('#passInput').on('keyup', (e) => {
      if (e.key === 'Enter' || e.keycode === 13) {
        this.login();
      }
    });
  }
  async refresh() {
    let api = new Webapi();
    let auth = await api.getAuth();
    let config = await ConftokenProvider.config();
    let urlConfig = (config ? config.urlConfig : null);
    if (auth) {
      this.url = auth.url;
      this.oldUrl = auth.url;
      this.oldUser = auth.user;
    }
    if (urlConfig) {
      this.url = (urlConfig.url ? urlConfig.url : this.url);
      this.user = (urlConfig.user ? urlConfig.user : this.oldUser);
    }
  }
  async login() {
    if (!this.url) {
      msg.showError(util.translate('login.blankUrl', true), false);
      jquery('[name=url]').addClass('danger').focus();
      return;
    }
    if (!this.user) {
      msg.showError(util.translate('login.blankUsr', true), false);
      jquery('[name=user]').focus();
      return;
    }
    if (!this.pass) {
      msg.showError(util.translate('login.blankPsw', true), false);
      jquery('[name=pass]').focus();
      return;
    }
    let loader = this.loadingStart();
    let api = new Webapi();
    this.logUser(api, loader, true);
  }
  logUser(api, loader, firstTime) {
    let GUID = util.GUID();
    api.login(this.url, this.user, this.pass, GUID).then((_value) => {
      //Check apps.
      api.getCollection('sysOfflineApp').then((apps) => {
        apps = apps.filter(app => app.Active);
        loader.dismiss();
        if (apps.length == 0) {
          msg.showError('No apps found', false);
        }
        else if (apps.length == 1) {
          ConftokenProvider.setApp(apps[0], this.url, this.user, GUID, _value).then(async (data) => {
            this.afterAppIsSet(data);
          });
        }
        else {
          this.apps = apps;
          this.appsList(apps, GUID, _value);
        }
      }).catch(error => {
        loader.dismiss();
        this.catchErr(error);
      });
    }).catch(async (error) => {
      await ConftokenProvider.removeApp(GUID);
      if (firstTime && error.error !== 'invalid_grant') {
        this.toggleHttpExtension();
        this.logUser(api, loader, false);
      }
      else {
        if (error.error !== 'invalid_grant') {
          this.toggleHttpExtension();
        }
        loader.dismiss();
        if (error.message === 'Failed to fetch') {
          error.message = util.translate('login.connectionErr', true);
        }
        else if (error.error === 'invalid_grant') {
          error.message = util.translate('login.invalidPsw', true);
        }
        console.log(error);
        this.catchErr(error);
      }
    });
  }
  toggleHttpExtension() {
    if (this.url.startsWith('https'))
      this.url = this.url.replace('https', 'http');
    else
      this.url = this.url.replace('http', 'https');
  }
  catchErr(error) {
    let message = 'Unknown login error';
    if (error) {
      if (typeof error == 'string') {
        message = error;
      }
      else if (error.error && error.error.error_description) {
        message = error.error.error_description;
      }
      else if (error.message) {
        message = error.message;
      }
    }
    msg.showError(message);
  }
  loadingStart() {
    let loading = document.createElement('ion-loading');
    loading.message = 'Loading';
    document.body.appendChild(loading);
    loading.present();
    return loading;
  }
  async changeURL(event) {
    let ionItem = jquery(event.target).closest('ion-item');
    let ionSpinner = ionItem.find('ion-spinner');
    let url_state_icon = ionItem.find('ion-icon.urlState');
    ionSpinner.removeClass('hidden');
    url_state_icon.addClass('hidden');
    this.url = event.target.value;
    this.url = this.url.trim();
    if (!this.url.startsWith('http')) {
      this.url = 'https://' + this.url;
    }
    if (this.url.endsWith('/')) {
      this.url = this.url.substring(0, this.url.length - 1);
    }
    let api = new Webapi();
    let info = await api.getWebApiInfo(this.url + '/WebApi');
    ionSpinner.addClass('hidden');
    if (info && ((!info.flxDataError) || (info.flxDataError && info.flxDataError.Message === 'An error has occurred.'))) {
      ionItem.find('#URLError').addClass('hidden');
      url_state_icon.attr('name', 'checkmark-circle-outline');
      url_state_icon.removeClass('hidden');
      let newLogo = false;
      if (info.tags) {
        let logoTag = info.tags.find((el) => {
          if (el.name === 'Logo')
            return el;
        });
        if (logoTag && logoTag.description) {
          this.logo = logoTag.description;
          newLogo = true;
        }
      }
      if (!newLogo) {
        this.logo = './assets/img/logo.png';
      }
    }
    else {
      ionItem.find('#URLError').removeClass('hidden');
      url_state_icon.attr('name', 'close-circle-outline');
      url_state_icon.removeClass('hidden');
    }
  }
  togglePasswordMode(itm) {
    let input = itm.closest('ion-item').find('[name="pass"]');
    let icon = itm.closest('ion-item').find('.iconPass');
    if (input.is('[type="password"]')) {
      input.attr('type', 'text');
      icon.attr('name', 'eye-off');
    }
    else {
      input.attr('type', 'password');
      icon.attr('name', 'eye');
    }
  }
  appsList(apps, GUID, authToken) {
    let html = `
    <span>
      <ion-header fullscreen>
        <ion-toolbar class='applist'>
          <ion-title>${util.translate('login.appsListTitle')}</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="loginpage"> 
        <ion-list>     
    `;
    for (var i = 0; i < apps.length; i++) {
      html += `
          <ion-item id="${i}">
            <ion-label>
              <h2><i class="flx-icon icon-${apps[i].IconName}"></i> ${apps[i].AppName}</h2>
              <p>${apps[i].Descrip ? apps[i].Descrip : ''}</p>
            </ion-label>
          </ion-item>
      `;
    }
    html += `
        </ion-list>
      </ion-content>
    </span>
    `;
    let content = jquery(html);
    content.find('ion-item[id]').on('click', el => {
      this.navToSelectedApp(el.currentTarget.id, GUID, authToken);
    });
    this.modal = document.createElement('ion-modal');
    this.modal.component = content[0];
    document.body.appendChild(this.modal);
    this.modal.present();
  }
  async navToSelectedApp(appName, GUID, authToken) {
    this.closeAppSelector();
    ConftokenProvider.setApp(this.apps[appName], this.url, this.user, GUID, authToken).then(async (data) => {
      this.afterAppIsSet(data);
    });
  }
  async afterAppIsSet(data) {
    if (data.new) {
      let redirect = "flexygo.nav._nav('/home','root').then(() => { document.location.reload(); });";
      flxSync.syncData(false, redirect);
    }
    else {
      await ConftokenProvider.changeCurrentApp(data.GUID);
      await nav._nav('/home', 'root');
      document.location.reload();
    }
  }
  async closeAppSelector() {
    this.modal.dismiss();
  }
  render() {
    return [
      h("ion-header", { class: this.comes_from_sleep ? 'ion-no-border' : 'hidden' }, h("ion-toolbar", { color: "header", class: "ion-text-center" }, h("ion-buttons", { slot: "end" }, h("ion-button", { color: "outstanding", onClick: () => { nav._nav('sleep', 'root'); } }, h("ion-icon", { slot: "icon-only", name: "arrow-undo-outline" }))))),
      h("ion-content", { class: (this.comes_from_sleep ? "comesFromSleep" : "") + " ion-padding loginpage" }, h("div", { class: "loginScreen" }, h("div", { class: "ion-text-center ion-padding-horizontal" }, h("ion-label", null, h("img", { alt: "Logo", style: { maxHeight: "80px" }, src: this.logo }))), h("div", { class: "ion-padding" }, h("ion-item", null, h("ion-input", { name: "url", type: "url", onChange: (event) => this.changeURL(event), value: this.url, placeholder: "app.company.com" }), h("ion-spinner", { class: "urlSpinner hidden" }), h("ion-icon", { class: "urlState" }), h("label", { id: "URLError", class: "error hidden" }, util.translate('login.wrongtURL', true)), h("ion-icon", { name: "globe", slot: "start", class: "ion-align-self-center" })), h("ion-item", null, h("ion-input", { name: "user", type: "text", onInput: (ev) => this.user = ev.target.value, value: this.user, placeholder: util.translate('login.username', true) }), h("ion-icon", { name: "person", slot: "start", class: "ion-align-self-center" })), h("ion-item", { class: "logItem" }, h("ion-input", { id: "passInput", name: "pass", type: "password", onInput: (ev) => this.pass = ev.target.value, onIonFocus: (ev) => { ev.target.querySelector('input').select(); }, clearOnEdit: "false", value: this.pass, placeholder: util.translate('login.password', true) }), h("ion-icon", { name: "lock-closed", slot: "start", class: "ion-align-self-center" }), h("ion-icon", { class: "iconPass", name: "eye", slot: "end", onClick: (ev) => { this.togglePasswordMode(jquery(ev.currentTarget)); } }))), h("div", { class: "ion-padding" }, h("ion-button", { size: "large", color: "outstanding", shape: "round", expand: "block", onClick: () => this.login() }, util.translate('login.login', true)))))
    ];
  }
};
FlxLogin.style = flxLoginCss;

export { FlxLogin as flx_login };
