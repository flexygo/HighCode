import { r as registerInstance, k as h } from './index-d0d1673d.js';
import { c as cordova, I as IonicNativePlugin, n as nav, w as flxPush, C as ConftokenProvider, W as Webapi, u as util, k as flxSync } from './conftoken-2c86328f.js';
import { j as jquery } from './jquery-eec92bf9.js';
import { p as parser } from './parser-74bf7b6b.js';
import { m as menuController } from './index-07c2bb76.js';
import './process-es6-d973fab3.js';
import './utils-0a0c7da4.js';
import './animation-10ea33c3.js';
import './helpers-719f4c54.js';
import './ios.transition-62fdffc9.js';
import './index-06bb8825.js';
import './md.transition-f61d2286.js';
import './cubic-bezier-93f47170.js';
import './index-7fe827c3.js';
import './ionic-global-f9661584.js';
import './index-b40d441b.js';
import './overlays-177438ad.js';
import './hardware-back-button-aacf3d12.js';
import './_commonjsHelpers-148b4233.js';

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

const appRootCss = ".icon-inner .flx-icon,.icon-inner .fa{font-size:20px;margin:3px;color:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.54)}ion-fab-button[data-desc]{position:relative}ion-fab-button[data-desc]::after{position:absolute;content:attr(data-desc);z-index:1;bottom:4px;background-color:var(--ion-color-base);color:var(--ion-color-contrast);padding:9px;border-radius:8px;box-shadow:0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12)}ion-fab[horizontal=end] ion-fab-button[data-desc]::after{right:55px}ion-fab[horizontal=start] ion-fab-button[data-desc]::after{left:55px}ion-avatar{margin-right:3%}.square-container{padding:8px;overflow:auto}.square{width:calc(100% / 2);float:left;position:relative;min-height:185px}.square .content{width:calc(100% - 16px);max-width:252px;max-height:252px;height:calc(100% - 16px);margin:8px;padding-bottom:16px;color:var(--ion-color-outstanding-contrast);background-color:var(--ion-color-outstanding-shade);box-shadow:0 2px 5px rgba(0, 0, 0, 0.26);text-align:center;cursor:pointer;border-radius:10px}.square .content h6,.rectangle .content h6{font-weight:bold}.square:nth-child(odd) .content{float:right}.square .content:hover{background-color:var(--ion-color-outstanding)}.square .content:hover i{background-color:var(--ion-color-outstanding-light-shade)}.square .content i{color:var(--ion-color-outstanding-light-contrast);background-color:var(--ion-color-outstanding-light);border-radius:50%;display:inline-block;font-size:50px;line-height:75px;width:75px;height:75px}.stack{position:absolute;right:5px;top:10px}.hide,.hidden,.flx-hide,.flx-hidden{display:none}#loadingSpinnerModule{z-index:99;display:grid;place-items:center;height:100%;visibility:hidden}.scannerBox{border:2px solid #fff;box-shadow:0 0 0 100vmax rgba(0, 0, 0, 0.5);top:50%;left:50%;height:300px;position:absolute;transform:translate(-50%, -50%);width:300px}.scannerLine{border:1px solid #f00;top:50%;left:50%;height:1px;position:absolute;transform:translate(-50%, -50%);width:300px}.closeScanner{font-size:60px;color:#fff;top:20px;right:20px;position:absolute;z-index:1}.torchScannerButton{font-size:60px;color:#fff;bottom:20px;position:absolute;z-index:1;left:50%;transform:translate(-50%, -50%)}.scannerPrompt{position:absolute;color:#fff;bottom:10px;width:100%;text-align:center;z-index:1}#cameraUI ion-icon{position:absolute;font-size:40px;color:#fff;bottom:30px;z-index:1}#cameraUI ion-icon.close{font-size:60px;top:20px;right:20px}#cameraUI .bottomBar,#cameraResult .bottomBar{display:flex;justify-content:center}#cameraUI ion-icon.flash{left:30px}#cameraUI ion-icon.flip{right:30px}#cameraUI ion-icon.shoot{position:absolute;color:#000;border-radius:50%;height:50px;width:50px;display:flex;align-items:center;justify-content:center;background-color:#fff;padding:5px}#cameraUI div.shoot:hover{color:#d3d3d3;background-color:#959595}#cameraResult{height:100%;background:black}#cameraResult div.resultContainer{display:flex;align-items:center;height:100%}#cameraResult ion-icon{color:#ffffff;position:absolute;bottom:30px}#cameraResult ion-icon.accept{background-color:#20894f;font-size:70px;border-radius:50%}#cameraResult ion-icon.denie{font-size:50px;left:20px}ion-modal.accountsModal{--max-height:35%;--border-radius:6% 6% 0 0}ion-modal.accountsModal>div{position:absolute;bottom:0}ion-modal.accountsModal h2.accTitle{font-weight:bold;text-align:center}ion-modal.accountsModal ion-label{padding:5px 0}ion-modal.accountsModal ion-item[guid] ion-label>h2{font-weight:bold}ion-modal.accountsModal ion-item[guid] ion-label>span{font-size:small}ion-modal.accountsModal ion-item>ion-icon{font-size:24px;margin-right:10px}ion-modal.accountsModal ion-item[guid]>ion-icon[name=\"trash\"]{color:#cf4242}ion-modal.accountsModal ion-item:nth-child(even):not([lines=\"full\"]){--background:var(--ion-color-light)}ion-modal.accountsModal ion-item[guid] ion-avatar>ion-icon{position:absolute;left:15px}ion-fab[vertical=\"top\"]{margin-top:constant(safe-area-inset-top);margin-top:env(safe-area-inset-top)}ion-fab[vertical=\"bottom\"]{margin-bottom:constant(safe-area-inset-top);margin-bottom:env(safe-area-inset-top)}";

const AppRoot = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.menuItems = new Array();
    this.profileName = undefined;
    this.avatar = undefined;
    this.profile = undefined;
    this.menuChilds = new Array();
    this.custom_menus = [];
  }
  async handleHardwareBackbutton(_e) {
    nav.closeModal();
  }
  componentWillLoad() {
    MobileAccessibility.setTextZoom(100);
    flxPush.config();
    this.getProfileInfo();
    this.loadMenus();
    this.loadMenusHTML();
  }
  refresh() {
    return this.loadMenus();
  }
  loadMenus() {
    return ConftokenProvider.config().then((conf) => {
      if (conf && conf.menuConfig) {
        this.menuItems = conf.menuConfig;
        this.menuChilds = this.menuItems.filter(item => item.parentId != null);
      }
    });
  }
  controllMenu(ev) {
    menuController.close();
    let page = ev.detail.to;
    page.toLowerCase();
    let api = new Webapi();
    this.navToFirstMenu(page, api);
    if (page.startsWith('/login') || page.startsWith('/sync')) {
      menuController.enable(false);
    }
    else {
      menuController.enable(true);
    }
  }
  async navToFirstMenu(page, api) {
    if (page.startsWith('/login'))
      return;
    let app = await ConftokenProvider.currentApp();
    let auth = await api.getAuth();
    if (!auth || !auth.b64 || !app) {
      nav.goLogin();
      return;
    }
    if (!page.startsWith('/sync')) {
      let config = await ConftokenProvider.config();
      if (!config) {
        nav.goSync();
      }
    }
  }
  async loadMenusHTML() {
    let conf_token = await ConftokenProvider.config();
    let menu_items_promises = this.menuItems.map(async (item) => {
      if (!item.parentId) {
        if (item.typeId !== 'text')
          return this.getIonItem(item, conf_token);
        else
          return this.getItemGroup(item, conf_token);
      }
      else
        this.menuChilds.push(item);
    });
    let menus = await Promise.all(menu_items_promises);
    this.custom_menus = menus;
  }
  async getIonItem(item, conf_token) {
    return h("ion-item", { onClick: () => this.menuClick(item) }, h("ion-label", null, await parser.recursiveCompile(null, item.title, conf_token, this)), h("div", { class: "icon-inner" }, h("i", { class: item.iconClass })));
  }
  async getItemGroup(item, conf_token) {
    return h("span", null, h("ion-item", { onClick: () => { jquery(`#${item.id}`).toggle(250); } }, h("ion-label", null, await parser.recursiveCompile(null, item.title, conf_token, this)), h("div", { class: "icon-inner" }, h("i", { class: item.iconClass }))), h("ion-item-group", { id: item.id, class: "hidden ion-padding-start" }, await Promise.all([...(new Set(this.menuChilds))] //esto corrige los duplicados que el filter genera
      .filter((child) => child.parentId === item.id)
      .map((element) => {
      if (element.typeId !== 'text')
        return this.getIonItem(element, conf_token);
      else
        return this.getItemGroup(element, conf_token);
    }))));
  }
  async menuClick(menuItem) {
    if (menuItem.typeId === 'jsCode') {
      eval(menuItem.jsCode);
      return;
    }
    if (menuItem.objectWhere) {
      const token = await ConftokenProvider.config();
      menuItem.objectWhere = await parser.recursiveCompile(null, menuItem.objectWhere, token);
    }
    nav._goMenu(menuItem);
  }
  async getProfileInfo() {
    const token = await ConftokenProvider.config();
    if (token.profile && Object.keys(token.profile).length) {
      this.profile = token.profile;
      if (this.profile.userName)
        this.profileName = this.profile.userName;
      else
        this.profileName = this.profile.name + " " + (this.profile.surname ? this.profile.surname : '');
      this.avatar = this.profile.avatar;
    }
  }
  render() {
    return ([
      h("ion-app", null, h("ion-menu", { "content-id": "menu-content", swipeGesture: !!window.cordova }, h("ion-header", null, h("ion-toolbar", { color: "header" }, h("ion-title", null, util.translate('menu.menu')))), h("ion-content", null, h("ion-list", null, this.profile ?
        h("ion-item", { onClick: () => nav._nav('usermenu', 'root') }, h("ion-avatar", null, h("img", { src: this.avatar })), h("ion-label", null, this.profileName))
        :
          h("div", null), h("ion-item", { onClick: () => nav.goHome() }, h("ion-label", null, util.translate('menu.home')), h("ion-icon", { name: "home" })), this.custom_menus, h("ion-item", { onClick: () => { jquery('#syncMenu').toggle(250); jquery('#syncMenu').removeClass('hidden'); } }, h("ion-label", null, util.translate('menu.sync'), h("ion-icon", { name: "alert-circle", color: "danger", class: "stack sendError flx-hide" })), h("ion-icon", { name: "wifi" })), h("ion-item-group", { id: "syncMenu", class: "hidden ion-padding-start" }, h("ion-item", { onClick: () => flxSync.syncData() }, h("ion-label", null, util.translate('sync.refresh')), h("ion-icon", { name: "cloud-download" })), h("ion-item", { onClick: () => { flxSync.sendData(); nav.goHome(); } }, h("ion-label", null, util.translate('sync.send'), h("ion-icon", { name: "alert-circle", color: "danger", class: "stack sendError flx-hide" })), h("ion-icon", { name: "repeat" })), h("ion-item", { onClick: () => nav.goSync() }, h("ion-label", null, util.translate('menu.syncMore')), h("ion-icon", { name: "ellipsis-horizontal-outline" }))), !this.profile ?
        h("ion-item", { onClick: () => flxSync.logOff() }, h("ion-label", null, util.translate('menu.logout')), h("ion-icon", { name: "exit" }))
        :
          h("div", null)))), h("ion-content", { id: "menu-content" }, h("ion-router", { useHash: true, onIonRouteWillChange: ev => this.controllMenu(ev) }, h("ion-route", { url: "/", component: "flx-home" }), h("ion-route", { url: "/home", component: "flx-home" }), h("ion-route", { url: "/login", component: "flx-login" }), h("ion-route", { url: "/sync", component: "flx-sync" }), h("ion-route", { url: "/usermenu", component: "flx-usermenu" }), h("ion-route", { url: "/list/:object", component: "flx-list" }), h("ion-route", { url: "/list/:object/page/:pageName/", component: "flx-list" }), h("ion-route", { url: "/list/:object/page/:pageName/filter/:filter/", component: "flx-list" }), h("ion-route", { url: "/list/:object/page/:pageName/defaults/:defaults", component: "flx-list" }), h("ion-route", { url: "/list/:object/page/:pageName/filter/:filter/defaults/:defaults", component: "flx-list" }), h("ion-route", { url: "/list/:object/filter/:filter", component: "flx-list" }), h("ion-route", { url: "/list/:object/filter/:filter/defaults/:defaults", component: "flx-list" }), h("ion-route", { url: "/list/:object/defaults/:defaults", component: "flx-list" }), h("ion-route", { url: "/online/", component: "flx-online" }), h("ion-route", { url: "/online/externalUrl/:externalUrl", component: "flx-online" }), h("ion-route", { url: "/online/report/:report", component: "flx-online" }), h("ion-route", { url: "/online/navigateFun/:navigateFun/objectName/:objectName/pageTypeId/:pageTypeId", component: "flx-online" }), h("ion-route", { url: "/online/filterValues/:filterValues/navigateFun/:navigateFun/objectName/:objectName/pageTypeId/:pageTypeId", component: "flx-online" }), h("ion-route", { url: "/online/navigateFun/:navigateFun/objectName/:objectName/objectWhere/:objectWhere/pageTypeId/:pageTypeId", component: "flx-online" }), h("ion-route", { url: "/online/defaults/:defaults/navigateFun/:navigateFun/objectName/:objectName/pageTypeId/:pageTypeId", component: "flx-online" }), h("ion-route", { url: "/online/filterValues/:filterValues/navigateFun/:navigateFun/objectName/:objectName/objectWhere/:objectWhere/pageTypeId/:pageTypeId", component: "flx-online" }), h("ion-route", { url: "/online/defaults/:defaults/filterValues/:filterValues/navigateFun/:navigateFun/objectName/:objectName/pageTypeId/:pageTypeId", component: "flx-online" }), h("ion-route", { url: "/online/defaults/:defaults/navigateFun/:navigateFun/objectName/:objectName/objectWhere/:objectWhere/pageTypeId/:pageTypeId", component: "flx-online" }), h("ion-route", { url: "/online/defaults/:defaults/filterValues/:filterValues/navigateFun/:navigateFun/objectName/:objectName/objectWhere/:objectWhere/pageTypeId/:pageTypeId", component: "flx-online" }), h("ion-route", { url: "/view/:object", component: "flx-view" }), h("ion-route", { url: "/view/:object/page/:pageName/", component: "flx-view" }), h("ion-route", { url: "/view/:object/page/:pageName/filter/:filter/", component: "flx-view" }), h("ion-route", { url: "/view/:object/page/:pageName/defaults/:defaults", component: "flx-view" }), h("ion-route", { url: "/view/:object/page/:pageName/filter/:filter/defaults/:defaults", component: "flx-view" }), h("ion-route", { url: "/view/:object/filter/:filter", component: "flx-view" }), h("ion-route", { url: "/view/:object/filter/:filter/defaults/:defaults", component: "flx-view" }), h("ion-route", { url: "/view/:object/defaults/:defaults", component: "flx-view" }), h("ion-route", { url: "/edit/:object", component: "flx-edit" }), h("ion-route", { url: "/edit/:object/page/:pageName/", component: "flx-edit" }), h("ion-route", { url: "/edit/:object/page/:pageName/filter/:filter/", component: "flx-edit" }), h("ion-route", { url: "/edit/:object/page/:pageName/defaults/:defaults", component: "flx-edit" }), h("ion-route", { url: "/edit/:object/page/:pageName/filter/:filter/defaults/:defaults", component: "flx-edit" }), h("ion-route", { url: "/edit/:object/filter/:filter", component: "flx-edit" }), h("ion-route", { url: "/edit/:object/filter/:filter/defaults/:defaults", component: "flx-edit" }), h("ion-route", { url: "/edit/:object/defaults/:defaults", component: "flx-edit" }), h("ion-route", { url: "/gallery/", component: "flx-imagemanager" }), h("ion-route", { url: "/gallery/:object/:objectid", component: "flx-imagemanager" }), h("ion-route", { url: "/gallery/:object/:objectid/defaults/:defaults", component: "flx-imagemanager" }), h("ion-route", { url: "/documents/", component: "flx-imagemanager" }), h("ion-route", { url: "/documents/:object/:objectid", component: "flx-documentmanager" }), h("ion-route", { url: "/documents/:object/:objectid/defaults/:defaults", component: "flx-documentmanager" }), h("ion-route", { url: "/indexeddb", component: "flx-indexeddb" })), h("ion-nav", { "swipe-gesture": "false" }), h("div", { id: 'loadingSpinnerModule' }, h("ion-spinner", null))))
    ]);
  }
};
AppRoot.style = appRootCss;

export { AppRoot as app_root };
