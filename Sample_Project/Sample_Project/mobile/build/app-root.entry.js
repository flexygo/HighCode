import { r as registerInstance, j as h } from './index-e5ff2de3.js';
import './ionic-global-e5feb32d.js';
import { c as cordova, I as IonicNativePlugin, C as ConftokenProvider, W as Webapi, u as util } from './messages-cbb766b7.js';
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
import { m as menuController } from './index-dbdc5ddf.js';
import './overlays-e386d27e.js';
import './jquery-4ed57fb2.js';
import { n as nav } from './navigation-b90acdd2.js';

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MobileAccessibilityOriginal = /** @class */ (function (_super) {
    __extends(MobileAccessibilityOriginal, _super);
    function MobileAccessibilityOriginal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MobileAccessibilityOriginal.prototype.isScreenReaderRunning = function () { return cordova(this, "isScreenReaderRunning", {}, arguments); };
    MobileAccessibilityOriginal.prototype.isVoiceOverRunning = function () { return cordova(this, "isVoiceOverRunning", { "platforms": ["iOS"] }, arguments); };
    MobileAccessibilityOriginal.prototype.isTalkBackRunning = function () { return cordova(this, "isTalkBackRunning", { "platforms": ["Amazon Fire OS", "Android"] }, arguments); };
    MobileAccessibilityOriginal.prototype.isChromeVoxActive = function () { return cordova(this, "isChromeVoxActive", { "platforms": ["Amazon Fire OS", "Android"] }, arguments); };
    MobileAccessibilityOriginal.prototype.isBoldTextEnabled = function () { return cordova(this, "isBoldTextEnabled", { "platforms": ["iOS"] }, arguments); };
    MobileAccessibilityOriginal.prototype.isClosedCaptioningEnabled = function () { return cordova(this, "isClosedCaptioningEnabled", {}, arguments); };
    MobileAccessibilityOriginal.prototype.isDarkerSystemColorsEnabled = function () { return cordova(this, "isDarkerSystemColorsEnabled", { "platforms": ["iOS"] }, arguments); };
    MobileAccessibilityOriginal.prototype.isGrayscaleEnabled = function () { return cordova(this, "isGrayscaleEnabled", { "platforms": ["iOS"] }, arguments); };
    MobileAccessibilityOriginal.prototype.isGuidedAccessEnabled = function () { return cordova(this, "isGuidedAccessEnabled", { "platforms": ["iOS"] }, arguments); };
    MobileAccessibilityOriginal.prototype.isInvertColorsEnabled = function () { return cordova(this, "isInvertColorsEnabled", { "platforms": ["iOS"] }, arguments); };
    MobileAccessibilityOriginal.prototype.isMonoAudioEnabled = function () { return cordova(this, "isMonoAudioEnabled", { "platforms": ["iOS"] }, arguments); };
    MobileAccessibilityOriginal.prototype.isReduceMotionEnabled = function () { return cordova(this, "isReduceMotionEnabled", { "platforms": ["iOS"] }, arguments); };
    MobileAccessibilityOriginal.prototype.isReduceTransparencyEnabled = function () { return cordova(this, "isReduceTransparencyEnabled", { "platforms": ["iOS"] }, arguments); };
    MobileAccessibilityOriginal.prototype.isSpeakScreenEnabled = function () { return cordova(this, "isSpeakScreenEnabled", { "platforms": ["iOS"] }, arguments); };
    MobileAccessibilityOriginal.prototype.isSpeakSelectionEnabled = function () { return cordova(this, "isSpeakSelectionEnabled", { "platforms": ["iOS"] }, arguments); };
    MobileAccessibilityOriginal.prototype.isSwitchControlRunning = function () { return cordova(this, "isSwitchControlRunning", { "platforms": ["iOS"] }, arguments); };
    MobileAccessibilityOriginal.prototype.isTouchExplorationEnabled = function () { return cordova(this, "isTouchExplorationEnabled", { "platforms": ["Amazon Fire OS", "Android"] }, arguments); };
    MobileAccessibilityOriginal.prototype.getTextZoom = function () { return cordova(this, "getTextZoom", {}, arguments); };
    MobileAccessibilityOriginal.prototype.setTextZoom = function (textZoom) { return cordova(this, "setTextZoom", { "sync": true }, arguments); };
    MobileAccessibilityOriginal.prototype.updateTextZoom = function () { return cordova(this, "updateTextZoom", { "sync": true }, arguments); };
    MobileAccessibilityOriginal.prototype.usePreferredTextZoom = function (value) { return cordova(this, "usePreferredTextZoom", { "sync": true }, arguments); };
    MobileAccessibilityOriginal.prototype.postNotification = function (mobileAccessibilityNotification, value) { return cordova(this, "postNotification", { "platforms": ["iOS"] }, arguments); };
    MobileAccessibilityOriginal.prototype.speak = function (value, queueMode, properties) { return cordova(this, "speak", { "sync": true }, arguments); };
    MobileAccessibilityOriginal.prototype.stop = function () { return cordova(this, "stop", { "sync": true }, arguments); };
    MobileAccessibilityOriginal.pluginName = "MobileAccessibility";
    MobileAccessibilityOriginal.plugin = "phonegap-plugin-mobile-accessibility";
    MobileAccessibilityOriginal.pluginRef = "window.MobileAccessibility";
    MobileAccessibilityOriginal.repo = "https://github.com/phonegap/phonegap-mobile-accessibility";
    MobileAccessibilityOriginal.platforms = ["Android Fire OS", "Android", "iOS", "Windows"];
    return MobileAccessibilityOriginal;
}(IonicNativePlugin));
var MobileAccessibility = new MobileAccessibilityOriginal();

const appRootCss = ".icon-inner .flx-icon,.icon-inner .fa{font-size:20px;margin:3px;color:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.54)}ion-fab-button[data-desc]{position:relative}ion-fab-button[data-desc]::after{position:absolute;content:attr(data-desc);z-index:1;bottom:4px;background-color:var(--ion-color-base);color:var(--ion-color-contrast);padding:9px;border-radius:8px;box-shadow:0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12)}ion-fab[horizontal=end] ion-fab-button[data-desc]::after{right:55px}ion-fab[horizontal=start] ion-fab-button[data-desc]::after{left:55px}.square-container{padding:8px;overflow:auto}.square{width:calc(100% / 2);float:left;position:relative}.square .content{width:calc(100% - 16px);max-width:252px;max-height:252px;height:calc(100% - 16px);margin:8px;padding-bottom:16px;color:var(--ion-color-outstanding-contrast);background-color:var(--ion-color-outstanding-shade);box-shadow:0 2px 5px rgba(0, 0, 0, 0.26);text-align:center;cursor:pointer}.square .content h6{font-weight:bold}.square:nth-child(odd) .content{float:right}.square .content:hover{background-color:var(--ion-color-outstanding)}.square .content:hover i{background-color:var(--ion-color-outstanding-light-shade)}.square .content i{color:var(--ion-color-outstanding-light-contrast);background-color:var(--ion-color-outstanding-light);border-radius:50%;display:inline-block;font-size:50px;line-height:75px;width:75px;height:75px}";

const AppRoot = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.menuItems = new Array();
    }
    async handleHardwareBackbutton(_e) {
        nav.closeModal();
    }
    componentWillLoad() {
        MobileAccessibility.setTextZoom(100);
        this.loadMenus();
    }
    refresh() {
        return this.loadMenus();
    }
    loadMenus() {
        return ConftokenProvider.config().then((conf) => {
            if (conf && conf.menuConfig)
                this.menuItems = conf.menuConfig;
        });
    }
    controllMenu(ev) {
        menuController.close();
        let page = ev.detail.to;
        page.toLowerCase();
        let api = new Webapi();
        if (!page.startsWith('/login')) {
            api.getAuth().then((auth) => {
                if (!auth || !auth.b64) {
                    nav.goLogin();
                }
                else {
                    ConftokenProvider.currentApp().then((app) => {
                        if (!app) {
                            nav.goLogin();
                        }
                        else {
                            if (!page.startsWith('/sync')) {
                                ConftokenProvider.config().then((config) => {
                                    if (!config) {
                                        nav.goSync();
                                    }
                                });
                            }
                        }
                    });
                }
            });
        }
        if (page.startsWith('/login') || page.startsWith('/sync')) {
            menuController.enable(false);
        }
        else {
            menuController.enable(true);
        }
    }
    menuClick(menuItem) {
        nav._goMenu(menuItem);
    }
    render() {
        return ([
            h("ion-app", null, h("ion-menu", { "content-id": "menu-content" }, h("ion-header", null, h("ion-toolbar", { color: "header" }, h("ion-title", null, util.translate('menu.menu')))), h("ion-content", null, h("ion-list", null, h("ion-item", { onClick: () => nav.goHome() }, h("ion-label", null, util.translate('menu.home')), h("ion-icon", { name: "home" })), this.menuItems.map((item) => h("ion-item", { onClick: () => this.menuClick(item) }, h("ion-label", null, item.title), h("div", { class: "icon-inner" }, h("i", { class: item.iconClass })))), h("ion-item", { onClick: () => nav.goSync() }, h("ion-label", null, util.translate('menu.sync')), h("ion-icon", { name: "repeat" })), h("ion-item", { onClick: () => nav.goLogin() }, h("ion-label", null, util.translate('menu.logout')), h("ion-icon", { name: "exit" }))))), h("ion-content", { id: "menu-content" }, h("ion-router", { useHash: true, onIonRouteWillChange: ev => this.controllMenu(ev) }, h("ion-route", { url: "/", component: "flx-home" }), h("ion-route", { url: "/home", component: "flx-home" }), h("ion-route", { url: "/login", component: "flx-login" }), h("ion-route", { url: "/sync", component: "flx-sync" }), h("ion-route", { url: "/list/:object", component: "flx-list" }), h("ion-route", { url: "/list/:object/page/:pageName/", component: "flx-list" }), h("ion-route", { url: "/list/:object/page/:pageName/filter/:filter/", component: "flx-list" }), h("ion-route", { url: "/list/:object/page/:pageName/defaults/:defaults", component: "flx-list" }), h("ion-route", { url: "/list/:object/page/:pageName/filter/:filter/defaults/:defaults", component: "flx-list" }), h("ion-route", { url: "/list/:object/filter/:filter", component: "flx-list" }), h("ion-route", { url: "/list/:object/filter/:filter/defaults/:defaults", component: "flx-list" }), h("ion-route", { url: "/list/:object/defaults/:defaults", component: "flx-list" }), h("ion-route", { url: "/view/:object", component: "flx-view" }), h("ion-route", { url: "/view/:object/page/:pageName/", component: "flx-view" }), h("ion-route", { url: "/view/:object/page/:pageName/filter/:filter/", component: "flx-view" }), h("ion-route", { url: "/view/:object/page/:pageName/defaults/:defaults", component: "flx-view" }), h("ion-route", { url: "/view/:object/page/:pageName/filter/:filter/defaults/:defaults", component: "flx-view" }), h("ion-route", { url: "/view/:object/filter/:filter", component: "flx-view" }), h("ion-route", { url: "/view/:object/filter/:filter/defaults/:defaults", component: "flx-view" }), h("ion-route", { url: "/view/:object/defaults/:defaults", component: "flx-view" }), h("ion-route", { url: "/edit/:object", component: "flx-edit" }), h("ion-route", { url: "/edit/:object/page/:pageName/", component: "flx-edit" }), h("ion-route", { url: "/edit/:object/page/:pageName/filter/:filter/", component: "flx-edit" }), h("ion-route", { url: "/edit/:object/page/:pageName/defaults/:defaults", component: "flx-edit" }), h("ion-route", { url: "/edit/:object/page/:pageName/filter/:filter/defaults/:defaults", component: "flx-edit" }), h("ion-route", { url: "/edit/:object/filter/:filter", component: "flx-edit" }), h("ion-route", { url: "/edit/:object/filter/:filter/defaults/:defaults", component: "flx-edit" }), h("ion-route", { url: "/edit/:object/defaults/:defaults", component: "flx-edit" }), h("ion-route", { url: "/gallery/", component: "flx-imagemanager" }), h("ion-route", { url: "/gallery/:object/:objectid", component: "flx-imagemanager" }), h("ion-route", { url: "/documents/", component: "flx-imagemanager" }), h("ion-route", { url: "/documents/:object/:objectid", component: "flx-documentmanager" })), h("ion-nav", null)))
        ]);
    }
};
AppRoot.style = appRootCss;

export { AppRoot as app_root };
