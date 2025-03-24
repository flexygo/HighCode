import { r as registerInstance, k as h } from './index-3f6ae35e.js';
import { z as storage, A as AccountInfo, h as cam, m as msg, u as util, C as ConftokenProvider, s as sql, n as nav } from './conftoken-6a608b71.js';
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

const flxAccountslistCss = "flx-accountslist ion-icon[name=\"trash\"]{color:#cf4242}flx-accountslist ion-item:nth-child(even):not([lines=\"full\"]){--background:var(--ion-color-light)}flx-accountslist h2.accTitle{font-weight:bold;text-align:center}";

const FlxAccountsList = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.is_admin = true;
    this.show_all_accounts = false;
    this.back_function = undefined;
    this.accounts = [];
  }
  async componentWillLoad() {
    this.accounts = [];
    await this.loadAccounts();
  }
  async loadAccounts() {
    this.accounts_info = await storage.get('flexyApp');
    for (let key in this.accounts_info) {
      if (key !== 'currentApp' && key !== 'lastLoggedOutApp' && this.accounts_info[key].app && (key !== this.accounts_info.currentApp || this.show_all_accounts)) {
        const account_info = this.accounts_info[key];
        let account = new AccountInfo();
        account.sendError = false;
        account.bbdd_GUID = key;
        account.appName = account_info.app.AppName;
        account.userNameSpan = [h("span", { style: { visibility: 'hidden' } }, "-")];
        if (!account_info.confToken) {
          account.avatar = cam.getDefaultImage();
        }
        else {
          const confToken = account_info.confToken;
          account.avatar = confToken.profile && confToken.profile.avatar ? confToken.profile.avatar : cam.getDefaultImage();
          if (confToken.user && confToken.user.currentUserFullName) {
            account.userNameSpan.push(h("span", null, confToken.user.currentUserFullName));
            if (confToken.lastSendError) {
              account.sendError = true;
            }
          }
          else {
            account.sendError = true;
          }
        }
        this.accounts.push(account);
      }
    }
  }
  removeAccount(GUID) {
    msg.confirm(util.translate('usermenu.confirmAccountRemoval'), util.translate('usermenu.confirmAccountRemovalText')).then(() => {
      ConftokenProvider.removeApp(GUID);
      this.accounts = this.accounts.filter(item => item.bbdd_GUID !== GUID);
    });
  }
  async selectAccount(GUID) {
    var _a;
    //If the app the user is trying to change is configured to require password, wwe show a modal and unless he types the password we do not allow to change account
    if ((_a = this.accounts_info[GUID].app) === null || _a === void 0 ? void 0 : _a.AskForPasswordOnAccountChange) {
      const right_password = await this.askForPassword(this.accounts_info[GUID].auth);
      if (!right_password)
        return;
    }
    await ConftokenProvider.changeCurrentApp(GUID);
    await sql.setActiveDB(GUID);
    await nav._nav('/home', 'root');
    window.location.reload();
  }
  addAccount(element) {
    ConftokenProvider.changeLastLoggedOutApp(null);
    nav.goLogin(true);
    const modal_element = element.closest('ion-modal');
    if (modal_element)
      modal_element.dismiss();
  }
  askForPassword(auth_token) {
    return new Promise((resolve, _) => {
      //We get the password from the b64 of the auth
      const true_password = atob(auth_token.b64).replace(auth_token.user + ':', '');
      let password_modal = document.createElement('ion-alert');
      password_modal.header = util.translate('login.enterPassword');
      password_modal.inputs = [
        {
          placeholder: util.translate('login.password'),
          name: 'password',
          type: 'password',
        }
      ];
      password_modal.buttons = [
        //Cancel Button
        {
          text: util.translate('msg.cancel'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            resolve(false);
          }
        },
        //Login Button
        {
          text: util.translate('login.login'),
          handler: (inputs_values) => {
            if (inputs_values.password === true_password) {
              resolve(true);
              return true;
            }
            msg.danger(util.translate('login.invalidPsw'));
            return false;
          }
        }
      ];
      document.body.appendChild(password_modal);
      password_modal.present();
    });
  }
  render() {
    return (h("ion-content", null, h("ion-list", null, h("ion-item", { lines: "full" }, h("ion-buttons", { slot: "start" }, h("ion-button", { color: "outstanding", style: { visibility: 'hidden' } }, h("ion-icon", { slot: "icon-only", name: "arrow-undo-outline" }))), h("ion-label", null, h("h2", { class: "accTitle" }, util.translate('usermenu.accounts'))), h("ion-buttons", { slot: "end", style: this.back_function ? null : { visibility: 'hidden' } }, h("ion-button", { color: "outstanding", onClick: this.back_function }, h("ion-icon", { slot: "icon-only", name: "arrow-undo-outline" })))), this.accounts.map(account => {
      return (h("ion-item", { lines: "none", button: true, detail: "false", onClick: () => this.selectAccount(account.bbdd_GUID) }, h("ion-avatar", { slot: "start" }, h("ion-img", { src: account.avatar }), account.sendError ? '<ion-icon name="alert-circle" color="danger" class="stack">' : null), h("ion-label", null, h("h2", null, account.appName), account.userNameSpan), this.is_admin === true ? h("ion-icon", { name: "trash", onClick: ev => { ev.stopPropagation(); this.removeAccount(account.bbdd_GUID); } }) : null));
    }), h("ion-item", { id: "AddApp", lines: "none", button: true, detail: "false", "detail-icon": "add", onClick: ev => this.addAccount(ev.srcElement) }, h("ion-label", null, h("h2", null, util.translate('usermenu.addAccount'))), h("ion-icon", { name: "add" })))));
  }
};
FlxAccountsList.style = flxAccountslistCss;

export { FlxAccountsList as flx_accountslist };
