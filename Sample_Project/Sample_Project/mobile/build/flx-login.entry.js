import { r as registerInstance, j as h } from './index-e5ff2de3.js';
import './ionic-global-e5feb32d.js';
import { W as Webapi, C as ConftokenProvider } from './messages-cbb766b7.js';
import './utils-8c7561fa.js';
import './index-a78b1497.js';
import './helpers-d94a0dba.js';
import './animation-625503e5.js';
import './index-77ad4b44.js';
import './ios.transition-5093371a.js';
import './md.transition-42e45fee.js';
import './cubic-bezier-92995175.js';
import './index-1da44cf3.js';
import './index-53f14fc6.js';
import './hardware-back-button-c2d005b0.js';
import './index-dbdc5ddf.js';
import './overlays-e386d27e.js';
import { j as jquery } from './jquery-4ed57fb2.js';
import { n as nav } from './navigation-b90acdd2.js';

const flxLoginCss = "ion-content.loginpage{--ion-background-color:#333333;--ion-background-color-rgb:51,51,51;--ion-color-primary:#2db7b0;--ion-text-color:#dddddd;--ion-text-color-rgb:221,221,221;--ion-color-step-50:#3c3c3c;--ion-color-step-100:#444444;--ion-color-step-150:#4d4d4d;--ion-color-step-200:#555555;--ion-color-step-250:#5e5e5e;--ion-color-step-300:#666666;--ion-color-step-350:#6f6f6f;--ion-color-step-400:#777777;--ion-color-step-450:#808080;--ion-color-step-500:#888888;--ion-color-step-550:#919191;--ion-color-step-600:#999999;--ion-color-step-650:#a2a2a2;--ion-color-step-700:#aaaaaa;--ion-color-step-750:#b3b3b3;--ion-color-step-800:#bbbbbb;--ion-color-step-850:#c4c4c4;--ion-color-step-900:#cccccc;--ion-color-step-950:#d5d5d5}";

const FlxLogin = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.url = '';
        this.user = '';
        this.pass = '';
    }
    componentWillLoad() {
        this.refresh();
    }
    async refresh() {
        let api = new Webapi();
        return api.disconnect().then((data) => {
            if (data) {
                this.url = data.url;
                this.user = '';
                this.pass = '';
            }
        });
    }
    login() {
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
        api.login(this.url, this.user, this.pass).then((_value) => {
            //Check apps.
            api.getCollection('sysOfflineApp').then((apps) => {
                loader.dismiss();
                if (apps.length == 0) {
                    this.loginError('No apps found');
                }
                else if (apps.length == 1) {
                    ConftokenProvider.setApp(apps[0]);
                    nav.goSync();
                }
                else {
                    this.loginError('TODO: Found more than one app.');
                }
            }).catch(error => {
                loader.dismiss();
                this.catchErr(error);
            });
        }).catch(error => {
            loader.dismiss();
            if (error.message = 'Failed to fetch') {
                error.message = 'Connection error, wrong URL or WebAPI is disabled.';
            }
            this.catchErr(error);
        });
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
            this.url = 'http://' + this.url;
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
    render() {
        return [
            h("ion-content", { class: "ion-padding loginpage" }, h("ion-grid", null, h("ion-row", { class: "ion-justify-content-center", "size-md": "12", "size-lg": "12", "size-xs": "12" }, h("ion-col", { class: "ion-align-self-center", "size-md": "11", "size-lg": "6" }, h("div", { class: "ion-text-center ion-padding-horizontal" }, h("ion-label", null, h("img", { alt: "Logo", style: { maxHeight: "80px" }, src: "./assets/img/logo.png" }))), h("div", { class: "ion-padding" }, h("ion-item", null, h("ion-input", { name: "url", type: "url", onChange: (event) => this.changeURL(event), value: this.url, placeholder: "app.company.com" }), h("ion-icon", { name: "globe", slot: "start", class: "ion-align-self-center" })), h("ion-item", null, h("ion-input", { name: "user", type: "text", onInput: (ev) => this.user = ev.target.value, value: this.user, placeholder: "Username" }), h("ion-icon", { name: "person", slot: "start", class: "ion-align-self-center" })), h("ion-item", null, h("ion-input", { name: "pass", type: "password", onInput: (ev) => this.pass = ev.target.value, value: this.pass, placeholder: "Password" }), h("ion-icon", { name: "lock-closed", slot: "start", class: "ion-align-self-center" }), h("ion-icon", { class: "iconPass", name: "eye", slot: "end", onClick: (ev) => { this.togglePasswordMode(jquery(ev.currentTarget)); } }))), h("div", { class: "ion-padding" }, h("ion-button", { size: "large", color: "outstanding", shape: "round", expand: "block", onClick: () => this.login() }, "Login"))))))
        ];
    }
};
FlxLogin.style = flxLoginCss;

export { FlxLogin as flx_login };
