import { r as registerInstance, j as h } from './index-86ac49ff.js';
import './ionic-global-0f98fe97.js';
import { i as flxSync, C as ConftokenProvider, u as util, m as msg } from './conftoken-38d23b50.js';
import './jquery-5df58adb.js';
import './utils-16079bfd.js';
import './helpers-719f4c54.js';
import './animation-10ea33c3.js';
import './index-7173f7a2.js';
import './ios.transition-95375ac9.js';
import './md.transition-6d74e584.js';
import './cubic-bezier-93f47170.js';
import './index-7fe827c3.js';
import './index-b40d441b.js';
import './hardware-back-button-aacf3d12.js';
import './index-50651ccc.js';
import './overlays-5302658e.js';

const flxUsermenuCss = "flx-usermenu .user-container{width:100%;margin:0px}flx-usermenu .user-header{height:100px;margin-bottom:120px;display:flex;flex-direction:column;justify-content:center;align-items:center;background-image:linear-gradient(to bottom right, var(--ion-color-primary), var(--ion-color-header))}flx-usermenu .profile{display:flex;flex-direction:column;align-items:center;margin-top:130px}flx-usermenu .avatarImg{width:80px;height:80px;border-radius:50%;margin-bottom:16px}flx-usermenu .complete-name{font-size:30px;font-weight:bold}flx-usermenu .options{display:flex;flex-direction:column;justify-content:center;align-items:center}flx-usermenu .option{padding-left:10%;padding-right:10%;box-shadow:0px 8px 15px rgba(0, 0, 0, 0.2);outline:none;border:none;border-radius:10px;width:80%;height:45px;margin-bottom:15px;background-color:var(--ion-color-header);color:var(--ion-color-tint);display:flex;justify-content:center;align-items:center}flx-usermenu .option>ion-icon{font-size:16px;margin-right:5px}";

const FlxUserMenu = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.advOpt = false;
    }
    componentWillLoad() {
        flxSync.checkSendErrors();
        this.getProfileInfo();
    }
    async getProfileInfo() {
        this.profile = (await ConftokenProvider.config()).profile;
        if (this.profile.userName)
            this.profileName = this.profile.userName;
        else
            this.profileName = this.profile.name + " " + (this.profile.surname ? this.profile.surname : '');
        this.avatar = this.profile.avatar;
    }
    render() {
        return [
            h("ion-header", null, h("ion-toolbar", { color: "header", class: "ion-text-center" }, h("ion-buttons", { slot: "start" }, h("ion-menu-button", { id: "home", color: "outstanding" }), h("ion-icon", { name: "alert-circle", color: "danger", class: "stack sendError flx-hide" })), h("ion-buttons", { slot: "end" }, h("ion-button", { id: "exit", color: "outstanding", onClick: () => { flxSync.logOff(); } }, h("ion-icon", { slot: "icon-only", name: "exit" }))), h("ion-title", null, h("span", null, util.translate('usermenu.title'))))),
            h("ion-content", { color: "light" }, h("div", { class: 'user-container' }, h("span", { class: 'user-header' }, h("div", { class: 'profile' }, h("img", { class: 'avatarImg', src: this.avatar }), h("div", { class: 'complete-name' }, this.profileName))), h("span", { class: 'options' }, h("button", { class: 'option', onClick: () => msg.changePassword(true) }, h("ion-icon", { name: "lock-closed" }), h("span", null, util.translate('usermenu.changePass'))), h("button", { class: 'option', onClick: () => flxSync.showAccountsModal() }, h("ion-icon", { name: "people" }), h("span", null, util.translate('usermenu.changeAccount'))), h("button", { class: 'option', onClick: () => flxSync.logOff() }, h("ion-icon", { name: "exit" }), h("span", null, util.translate('menu.logout'))))))
        ];
    }
};
FlxUserMenu.style = flxUsermenuCss;

export { FlxUserMenu as flx_usermenu };
