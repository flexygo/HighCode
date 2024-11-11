import { r as registerInstance, k as h, m as getElement } from './index-8e5b11cb.js';
import { W as Webapi, n as nav } from './conftoken-89472368.js';
import './process-es6-cc264d03.js';
import './jquery-34624bb9.js';
import './_commonjsHelpers-2a12c1e6.js';
import './utils-224de961.js';
import './animation-b4670628.js';
import './helpers-7ecb2fa5.js';
import './ios.transition-e14f38db.js';
import './index-c59a2c3f.js';
import './md.transition-8bd31aee.js';
import './cubic-bezier-ed243a9b.js';
import './index-d086042f.js';
import './ionic-global-6d118971.js';
import './index-cc97b114.js';
import './index-81d32235.js';
import './hardware-back-button-508e48cf.js';
import './overlays-cda44124.js';

const flxOnlineCss = "";

const FlxOnline = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.url = '';
    this.navigateFun = undefined;
    this.objectName = undefined;
    this.objectWhere = undefined;
    this.pageName = undefined;
    this.pageTypeId = undefined;
    this.defaults = undefined;
    this.excludehist = undefined;
    this.filtersValues = undefined;
    this.externalUrl = undefined;
    this.report = undefined;
  }
  componentWillLoad() {
    this.refresh();
    this.getUrl();
  }
  async getUrl() {
    if (this.externalUrl)
      this.url = atob(this.externalUrl);
    else {
      let site = await (new Webapi).getAuth();
      this.url = site.url;
      if (this.report)
        this.url = this.url + '/forms/Reports?id=' + this.report;
      else {
        const url = new URL(this.getCurrentUrlClean());
        const url_parameters = new URLSearchParams(url.search);
        let parameters = { targetid: 'current' };
        if (url_parameters.has('defaults'))
          parameters['defaults'] = url_parameters.get('defaults');
        if (url_parameters.has('objectName'))
          parameters['objectname'] = url_parameters.get('objectName');
        if (url_parameters.has('objectWhere'))
          parameters['objectwhere'] = url_parameters.get('objectWhere');
        if (url_parameters.has('pageName'))
          parameters['pagename'] = url_parameters.get('pageName');
        if (url_parameters.has('pageTypeId'))
          parameters['pagetypeid'] = url_parameters.get('pageTypeId');
        if (url_parameters.has('navigateFun'))
          parameters['navigateFun'] = url_parameters.get('navigateFun');
        if (url_parameters.has('filtersValues'))
          parameters['filtersValues'] = url_parameters.get('filtersValues');
        if (url_parameters.has('excludehist'))
          parameters['excludehist'] = url_parameters.get('excludehist');
        if (url_parameters.has('hideMenuBar'))
          parameters['hideMenuBar'] = url_parameters.get('hideMenuBar');
        let api = new Webapi();
        let token = await api.connect();
        if (JSON.stringify(parameters) != JSON.stringify({}))
          this.url = this.url + '/?u=' + btoa(JSON.stringify(parameters)) + '&access_token=' + token.bearerToken;
        else
          this.url = this.url + '/?access_token=' + token.bearerToken;
      }
    }
  }
  getCurrentUrlClean() {
    let url = window.location.href;
    if (url.includes('/#/')) {
      url = url.replace('/#/', '/');
    }
    if (url.includes('/rnd/')) {
      const rnd_position = url.lastIndexOf('/rnd/');
      url = url.substring(0, rnd_position);
    }
    return url;
  }
  async refresh() {
    this.externalUrl = (this.externalUrl) ? decodeURIComponent(this.externalUrl) : null;
    if (!this.externalUrl) {
      this.report = (this.report) ? decodeURIComponent(this.report) : null;
      if (!this.report) {
        this.navigateFun = (this.navigateFun) ? decodeURIComponent(this.navigateFun) : null;
        this.pageTypeId = (this.pageTypeId) ? decodeURIComponent(this.pageTypeId) : null;
        this.objectName = (this.objectName) ? decodeURIComponent(this.objectName) : null;
        this.objectWhere = (this.objectWhere) ? decodeURIComponent(this.objectWhere) : null;
        this.pageName = (this.pageName) ? decodeURIComponent(this.pageName) : null;
        this.defaults = (this.defaults) ? decodeURIComponent(this.defaults) : null;
        this.filtersValues = (this.filtersValues) ? decodeURIComponent(this.filtersValues) : null;
        this.excludehist = (this.excludehist) ? decodeURIComponent(this.excludehist) : null;
      }
    }
  }
  render() {
    return [
      h("ion-header", null, h("ion-toolbar", { color: "header", class: "ion-text-center" }, h("ion-buttons", { slot: "start" }, h("ion-menu-button", { color: "outstanding" }), h("ion-icon", { name: "alert-circle", color: "danger", class: "stack sendError flx-hide" })), h("ion-title", null, h("span", null, "Online")), h("ion-buttons", { slot: "end" }, h("ion-button", { color: "outstanding", onClick: () => { nav.goBack(this.me); } }, h("ion-icon", { slot: "icon-only", name: "arrow-undo-outline" }))))),
      h("ion-content", { color: "light" }, h("iframe", { height: "100%", width: "100%", src: this.url }))
    ];
  }
  get me() { return getElement(this); }
};
FlxOnline.style = flxOnlineCss;

export { FlxOnline as flx_online };
