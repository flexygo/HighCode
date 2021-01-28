import { r as registerInstance, j as h } from './index-76f52202.js';
import './ionic-global-693c5dc1.js';
import { C as ConftokenProvider, u as util, f as flxSync, m as msg } from './messages-50a67881.js';
import './jquery-4ed57fb2.js';
import './utils-67a6e57b.js';
import './index-023098c3.js';
import './helpers-d94a0dba.js';
import './animation-625503e5.js';
import './index-20a23da0.js';
import './ios.transition-267ba16c.js';
import './md.transition-15ebc2b8.js';
import './cubic-bezier-92995175.js';
import './index-1da44cf3.js';
import './index-53f14fc6.js';
import './hardware-back-button-c2d005b0.js';
import './index-725f2a8a.js';
import './overlays-39d86a31.js';
import { n as nav } from './navigation-c87efa5b.js';

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
