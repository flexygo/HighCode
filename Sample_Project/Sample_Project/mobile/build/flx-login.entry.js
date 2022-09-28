import { r as registerInstance, j as h } from './index-86ac49ff.js';
import './ionic-global-0f98fe97.js';
import { W as Webapi } from './webapi-7959a2b6.js';
import { h as gps, C as ConftokenProvider, n as nav, i as flxSync, u as util } from './conftoken-84c3ec5c.js';
import { j as jquery } from './jquery-ad132f97.js';
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

const flxLoginCss = "ion-content.loginpage{--ion-background-color:#333333;--ion-background-color-rgb:51,51,51;--ion-color-primary:#2db7b0;--ion-text-color:#dddddd;--ion-text-color-rgb:221,221,221;--ion-color-step-50:#3c3c3c;--ion-color-step-100:#444444;--ion-color-step-150:#4d4d4d;--ion-color-step-200:#555555;--ion-color-step-250:#5e5e5e;--ion-color-step-300:#666666;--ion-color-step-350:#6f6f6f;--ion-color-step-400:#777777;--ion-color-step-450:#808080;--ion-color-step-500:#888888;--ion-color-step-550:#919191;--ion-color-step-600:#999999;--ion-color-step-650:#a2a2a2;--ion-color-step-700:#aaaaaa;--ion-color-step-750:#b3b3b3;--ion-color-step-800:#bbbbbb;--ion-color-step-850:#c4c4c4;--ion-color-step-900:#cccccc;--ion-color-step-950:#d5d5d5}ion-toolbar.applist{--ion-background-color:#2db7b0;color:white}ion-grid{margin-top:env(safe-area-inset-top)}";

const FlxLogin = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.url = '';
        this.user = '';
        this.pass = '';
        this.sameUrlAndUser = false;
        this.oldUrl = '';
        this.oldUser = '';
    }
    componentWillLoad() {
        this.refresh();
        if (window.cordova && cordova.platformId === 'android') {
            gps.showActivationMsg(null, false);
        }
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
        if (auth) {
            this.url = auth.url;
            this.oldUrl = auth.url;
            this.oldUser = auth.user;
        }
    }
    async login() {
        if (!this.url) {
            this.loginError('Url can\' be blank');
            jquery('[name=url]').addClass('danger').focus();
            return;
        }
        if (!this.user) {
            this.loginError('User can\' be blank');
            jquery('[name=user]').focus();
            return;
        }
        if (!this.pass) {
            this.loginError('Password can\' be blank');
            jquery('[name=pass]').focus();
            return;
        }
        let loader = this.loadingStart();
        let api = new Webapi();
        this.logUser(api, loader, true);
    }
    logUser(api, loader, firstTime) {
        if (!firstTime) {
            this.toggleHttpExtension();
        }
        api.login(this.url, this.user, this.pass).then((_value) => {
            //Check apps.
            api.getCollection('sysOfflineApp').then((apps) => {
                loader.dismiss();
                if (apps.length == 0) {
                    this.loginError('No apps found');
                }
                else if (apps.length == 1) {
                    ConftokenProvider.setApp(apps[0], (this.oldUrl === this.url && this.oldUser === this.user)).then((sameApp) => {
                        nav.goHome();
                        if (!sameApp) {
                            let redirect;
                            if (window.cordova) {
                                redirect = "document.location.href='./home'";
                            }
                            else {
                                redirect = "document.location.href='./index.html#/home'";
                            }
                            flxSync.syncData(false, redirect);
                        }
                    });
                }
                else {
                    this.apps = apps;
                    this.appsList(apps);
                }
            }).catch(error => {
                loader.dismiss();
                this.catchErr(error);
            });
        }).catch(error => {
            if (firstTime) {
                this.logUser(api, loader, false);
            }
            else {
                this.toggleHttpExtension();
                loader.dismiss();
                if (error.message = 'Failed to fetch') {
                    error.message = 'Connection error, wrong URL or WebAPI is disabled.';
                }
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
        let msg = 'Unknown login error';
        if (error) {
            if (typeof error == 'string') {
                msg = error;
            }
            else if (error.error && error.error.error_description) {
                msg = error.error.error_description;
            }
            else if (error.message) {
                msg = error.message;
            }
        }
        this.loginError(msg);
    }
    loginError(msg) {
        let toast = document.createElement('ion-toast');
        toast.message = msg;
        toast.duration = 3000;
        toast.color = 'danger';
        document.body.appendChild(toast);
        return toast.present();
    }
    loadingStart() {
        let loading = document.createElement('ion-loading');
        loading.message = 'Loading';
        document.body.appendChild(loading);
        loading.present();
        return loading;
    }
    changeURL(event) {
        this.url = event.target.value;
        this.url = this.url.trim();
        if (!this.url.startsWith('http')) {
            this.url = 'https://' + this.url;
        }
        if (this.url.endsWith('/')) {
            this.url = this.url.substring(0, this.url.length - 1);
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
    appsList(apps) {
        const modalContent = document.createElement('modal-content');
        let html;
        html = `
      <ion-header fullscreen>
        <ion-toolbar class='applist'>
          <ion-title>` + util.translate('login.appsListTitle') + `</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="loginpage"> 
        <ion-list>     
    `;
        for (var i = 0; i < apps.length; i++) {
            html += `
          <ion-item>
            <ion-label id=` + i + ` onclick="$('flx-login')[0].navToSelectedApp(this.id);">
              <h2><i class="flx-icon icon-` + apps[i].IconName + `"></i> ` + apps[i].AppName + `</h2>
              <p>` + apps[i].Descrip + `</p>
            </ion-label>
          </ion-item>
      `;
        }
        html += `
        </ion-list>
      </ion-content>
    `;
        modalContent.innerHTML = html;
        const modal = document.createElement('ion-modal');
        modal.component = modalContent;
        document.body.appendChild(modal);
        modal.present();
        this.modal = modal;
    }
    async navToSelectedApp(appName) {
        this.closeAppSelector();
        await ConftokenProvider.setApp(this.apps[appName], (this.oldUrl === this.url && this.oldUser === this.user)).then((sameApp) => {
            nav.goHome();
            if (!sameApp) {
                let redirect;
                if (window.cordova) {
                    redirect = "document.location.href='./home'";
                }
                else {
                    redirect = "document.location.href='./index.html#/home'";
                }
                flxSync.syncData(false, redirect);
            }
        });
    }
    async closeAppSelector() {
        this.modal.dismiss();
    }
    render() {
        return [
            h("ion-content", { class: "ion-padding loginpage" }, h("ion-grid", null, h("ion-row", { class: "ion-justify-content-center", "size-md": "12", "size-lg": "12", "size-xs": "12" }, h("ion-col", { class: "ion-align-self-center", "size-md": "11", "size-lg": "6" }, h("div", { class: "ion-text-center ion-padding-horizontal" }, h("ion-label", null, h("img", { alt: "Logo", style: { maxHeight: "80px" }, src: "./assets/img/logo.png" }))), h("div", { class: "ion-padding" }, h("ion-item", null, h("ion-input", { name: "url", type: "url", onChange: (event) => this.changeURL(event), value: this.url, placeholder: "app.company.com" }), h("ion-icon", { name: "globe", slot: "start", class: "ion-align-self-center" })), h("ion-item", null, h("ion-input", { name: "user", type: "text", onInput: (ev) => this.user = ev.target.value, value: this.user, placeholder: "Username" }), h("ion-icon", { name: "person", slot: "start", class: "ion-align-self-center" })), h("ion-item", null, h("ion-input", { id: "passInput", name: "pass", type: "password", onInput: (ev) => this.pass = ev.target.value, value: this.pass, placeholder: "Password" }), h("ion-icon", { name: "lock-closed", slot: "start", class: "ion-align-self-center" }), h("ion-icon", { class: "iconPass", name: "eye", slot: "end", onClick: (ev) => { this.togglePasswordMode(jquery(ev.currentTarget)); } }))), h("div", { class: "ion-padding" }, h("ion-button", { size: "large", color: "outstanding", shape: "round", expand: "block", onClick: () => this.login() }, "Login"))))))
        ];
    }
};
FlxLogin.style = flxLoginCss;

export { FlxLogin as flx_login };
