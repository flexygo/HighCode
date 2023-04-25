import { r as registerInstance, j as h } from './index-86ac49ff.js';
import { b as storage, W as Webapi } from './webapi-79a1d3db.js';

const flxOnlineCss = "";

const FlxOnline = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.url = '';
    }
    componentWillLoad() {
        this.refresh();
        this.getUrl();
    }
    async getUrl() {
        if (this.externalUrl)
            this.url = atob(this.externalUrl);
        else {
            let site = await storage.get('flexyAuth');
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
