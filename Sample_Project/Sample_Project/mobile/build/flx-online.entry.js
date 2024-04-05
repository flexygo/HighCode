import { r as registerInstance, k as h } from './index-d0d1673d.js';
import { W as Webapi } from './conftoken-2c86328f.js';
import './process-es6-d973fab3.js';
import './jquery-eec92bf9.js';
import './_commonjsHelpers-148b4233.js';
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
import './index-07c2bb76.js';
import './hardware-back-button-aacf3d12.js';
import './overlays-177438ad.js';

const flxOnlineCss = "";

const FlxOnline = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.url = '';
    this.navigateFun = undefined;
    this.pageTypeId = undefined;
    this.objectName = undefined;
    this.objectWhere = undefined;
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
        let parameters = { targetid: 'current' };
        if (this.defaults)
          parameters['defaults'] = this.defaults;
        if (this.objectName)
          parameters['objectname'] = this.objectName;
        if (this.objectWhere)
          parameters['objectwhere'] = this.objectWhere;
        if (this.pageTypeId)
          parameters['pagetypeid'] = this.pageTypeId;
        if (this.navigateFun)
          parameters['navigateFun'] = this.navigateFun;
        if (this.filtersValues)
          parameters['filtersValues'] = this.filtersValues;
        if (this.excludehist)
          parameters['excludehist'] = this.excludehist;
        let api = new Webapi();
        let token = await api.connect();
        if (JSON.stringify(parameters) != JSON.stringify({}))
          this.url = this.url + '/?u=' + btoa(JSON.stringify(parameters)) + '&access_token=' + token.bearerToken;
        else
          this.url = this.url + '/?access_token=' + token.bearerToken;
      }
    }
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
        this.defaults = (this.defaults) ? decodeURIComponent(this.defaults) : null;
        this.filtersValues = (this.filtersValues) ? decodeURIComponent(this.filtersValues) : null;
        this.excludehist = (this.excludehist) ? decodeURIComponent(this.excludehist) : null;
      }
    }
  }
  render() {
    return [
      h("ion-header", null, h("ion-toolbar", { color: "header", class: "ion-text-center" }, h("ion-buttons", { slot: "start" }, h("ion-menu-button", { color: "outstanding" }), h("ion-icon", { name: "alert-circle", color: "danger", class: "stack sendError flx-hide" })), h("ion-title", null, h("span", null, "Online")))),
      h("ion-content", { color: "light" }, h("iframe", { height: "100%", width: "100%", src: this.url }))
    ];
  }
};
FlxOnline.style = flxOnlineCss;

export { FlxOnline as flx_online };
