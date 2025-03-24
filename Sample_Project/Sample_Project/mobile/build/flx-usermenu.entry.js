import { r as registerInstance, k as h } from './index-3f6ae35e.js';
import { k as flxSync, C as ConftokenProvider, u as util, m as msg } from './conftoken-6a608b71.js';
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

const flxUsermenuCss = "flx-usermenu .user-container{width:100%;margin:0px}flx-usermenu .user-header{height:100px;margin-bottom:120px;display:flex;flex-direction:column;justify-content:center;align-items:center;background-image:linear-gradient(to bottom right, var(--ion-color-primary), var(--ion-color-header))}flx-usermenu .profile{display:flex;flex-direction:column;align-items:center;margin-top:130px}flx-usermenu .avatarImg{width:80px;height:80px;border-radius:50%;margin-bottom:16px}flx-usermenu .complete-name{font-size:30px;font-weight:bold}flx-usermenu .options{display:flex;flex-direction:column;justify-content:center;align-items:center}flx-usermenu .option{padding-left:10%;padding-right:10%;box-shadow:0px 8px 15px rgba(0, 0, 0, 0.2);outline:none;border:none;border-radius:10px;width:80%;height:45px;margin-bottom:15px;background-color:var(--ion-color-header);color:var(--ion-color-tint);display:flex;justify-content:center;align-items:center}flx-usermenu .option>ion-icon{font-size:16px;margin-right:5px}";

const FlxUserMenu = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.advOpt = false;
    this.profileName = undefined;
    this.avatar = undefined;
    this.profile = undefined;
    this.sleep_mode = true;
  }
  componentWillLoad() {
    flxSync.checkSendErrors();
    this.getProfileInfo();
  }
  async getProfileInfo() {
    const conf_token = await ConftokenProvider.config();
    this.profile = conf_token.profile;
    if (this.profile.userName)
      this.profileName = this.profile.userName;
    else
      this.profileName = this.profile.name + " " + (this.profile.surname ? this.profile.surname : '');
    this.avatar = this.profile.avatar;
    this.sleep_mode = conf_token.generalConfig.sleepMode;
  }
  /*logOut() {
    util.hasChangesPending().then( async res =>{
      if (res) {
        await msg.confirm(util.translate('sync.hasChanges'), util.translate('sync.hasChangesSure'));  //If the user cancels it will throw an error and stop function execution
      }
      
      flxSync.logOff();
    });
  }*/
  render() {
    return [
      h("ion-header", null, h("ion-toolbar", { color: "header", class: "ion-text-center" }, h("ion-buttons", { slot: "start" }, h("ion-menu-button", { id: "home", color: "outstanding" }), h("ion-icon", { name: "alert-circle", color: "danger", class: "stack sendError flx-hide" })), h("ion-buttons", { slot: "end" }, h("ion-button", { id: "exit", color: "outstanding", onClick: () => { flxSync.logOff(); } }, h("ion-icon", { slot: "icon-only", name: "exit" }))), h("ion-title", null, h("span", null, util.translate('usermenu.title'))))),
      h("ion-content", { color: "light" }, h("div", { class: 'user-container' }, h("span", { class: 'user-header' }, h("div", { class: 'profile' }, h("img", { class: 'avatarImg', src: this.avatar }), h("div", { class: 'complete-name' }, this.profileName))), h("span", { class: 'options' }, h("button", { class: 'option', onClick: () => msg.changePassword(true) }, h("ion-icon", { name: "lock-closed" }), h("span", null, util.translate('usermenu.changePass'))), h("button", { class: this.sleep_mode ? 'hidden' : 'option', onClick: () => flxSync.showAccountsModal() }, h("ion-icon", { name: "people" }), h("span", null, util.translate('usermenu.changeAccount'))), h("button", { class: 'option', onClick: flxSync.logOff }, h("ion-icon", { name: "exit" }), h("span", null, this.sleep_mode ? util.translate('menu.trueLogout') : util.translate('menu.logout'))))))
    ];
  }
};
FlxUserMenu.style = flxUsermenuCss;

export { FlxUserMenu as flx_usermenu };
