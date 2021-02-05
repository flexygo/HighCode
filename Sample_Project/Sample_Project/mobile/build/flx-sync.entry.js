import { r as registerInstance, j as h } from './index-76f52202.js';
import './ionic-global-53d785f3.js';
import { C as ConftokenProvider, u as util, f as flxSync, m as msg } from './messages-1e55a1f4.js';
import './jquery-4ed57fb2.js';
import './utils-30827fbd.js';
import './index-38aae3ff.js';
import './helpers-742de4f9.js';
import './animation-a90ce8fc.js';
import './index-a6178d25.js';
import './ios.transition-bfe5eada.js';
import './md.transition-e49d1536.js';
import './cubic-bezier-89113939.js';
import './index-9b41fcc6.js';
import './index-86d5f3ab.js';
import './hardware-back-button-b3b61715.js';
import './index-c940ddb6.js';
import './overlays-3fb58ad8.js';
import { n as nav } from './navigation-8af3d3e3.js';

const flxSyncCss = ".loading-content{overflow:auto}";

const FlxSync = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.lastSync = '-';
    }
    componentWillLoad() {
        this.refresh();
    }
    async refresh() {
        return ConftokenProvider.config().then((cnf) => {
            if (cnf && cnf.lastSync) {
                this.lastSync = moment(cnf.lastSync).locale(cnf.user.currentUserCultureId).format('L LT');
            }
        });
    }
    render() {
        return [
            h("ion-header", null, h("ion-toolbar", { color: "header", class: "ion-text-center" }, h("ion-buttons", { slot: "start" }, h("ion-button", { color: "outstanding", onClick: () => { nav.goHome(); } }, h("ion-icon", { slot: "icon-only", name: "home" }))), h("ion-buttons", { slot: "end" }, h("ion-button", { color: "outstanding", onClick: () => { nav.goLogin(); } }, h("ion-icon", { slot: "icon-only", name: "exit" }))), h("ion-title", null, h("span", null, "Sync")))),
            h("ion-content", { color: "light", class: "ion-padding" }, h("ion-grid", { fixed: true }, h("ion-row", null, h("ion-col", { size: "12" }, h("h5", null, h("ion-icon", { name: "timer" }), " ", util.translate('sync.last')), h("h2", null, this.lastSync))), h("ion-row", null, h("ion-col", { size: "12" }, h("div", { class: "square-container", color: "outstanding" }, h("div", { class: "square" }, h("div", { class: "content", onClick: () => flxSync.syncData() }, h("img", { src: "./assets/img/sync-data.png" }), h("h6", null, util.translate('sync.refresh')))), h("div", { class: "square" }, h("div", { class: "content", onClick: () => flxSync.sendData() }, h("img", { src: "./assets/img/send-data.png" }), h("h6", null, util.translate('sync.send'))))), (this.lastSync ?
                h("div", { class: "square-container", color: "outstanding" }, h("div", { class: "square" }, h("div", { class: "content", onClick: () => msg.confirm(util.translate('sync.confirmOverwrite'), util.translate('sync.confirmOverwriteText')).then(() => { flxSync.overwriteData(); }) }, h("img", { src: "./assets/img/overwrite-data.png" }), h("h6", null, util.translate('sync.overwrite')))), h("div", { class: "square" }, h("div", { class: "content", onClick: () => flxSync.syncTemplates() }, h("img", { src: "./assets/img/sync-templates.png" }), h("h6", null, util.translate('sync.templates')))))
                : h("div", null))))))
        ];
    }
};
FlxSync.style = flxSyncCss;

export { FlxSync as flx_sync };
