import { r as registerInstance, h } from './index-1ad46950.js';
import './ionic-global-08321e45.js';
import { C as ConftokenProvider, b as ConftokenService, m as msg, u as util } from './messages-856fd5dd.js';
import './utils-ae5eb377.js';
import './index-9a467e52.js';
import './helpers-742de4f9.js';
import './animation-a90ce8fc.js';
import './index-59819519.js';
import './ios.transition-f27c75b3.js';
import './md.transition-0550681d.js';
import './cubic-bezier-89113939.js';
import './index-9b41fcc6.js';
import './index-86d5f3ab.js';
import './hardware-back-button-b3b61715.js';
import './index-626f3745.js';
import './overlays-af382aca.js';
import { j as jquery } from './jquery-4ed57fb2.js';
import { n as nav } from './navigation-94cce689.js';

const flxSyncCss = ".loading-content{overflow:auto}";

class FlxSync {
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
    sendData() {
        let cnf = new ConftokenService();
        this.popOverInfo(cnf).then(() => {
            cnf.sendDataStart().catch((err) => {
                msg.showError(err);
                jquery('ion-loading')[0].dismiss();
            });
        });
    }
    syncTemplates() {
        let cnf = new ConftokenService();
        cnf.getAppTemplates().catch((err) => {
            msg.showError(err);
        }).then(() => {
            msg.success('Templates updated');
        });
    }
    getAllData(forced) {
        let cnf = new ConftokenService();
        this.popOverInfo(cnf).then(() => {
            cnf.getAppConfiguration(forced).catch((err) => {
                msg.showError(err);
                jquery('ion-loading')[0].dismiss();
            });
        });
    }
    async popOverInfo(cnf) {
        let loading = document.createElement('ion-loading');
        loading.message = 'Please wait...';
        loading.backdropDismiss = false;
        loading.translucent = true;
        document.body.appendChild(loading);
        await loading.present();
        let s1 = cnf.onStatusChange.subscribe((itm) => {
            loading.message = itm.tableName + ' <b>' + itm.rows + '</b>';
            console.log(itm);
        });
        let s2 = cnf.onRowsReceivedChange.subscribe((itm) => {
            loading.message = itm.tableName + ' <b>' + itm.rows + '</b>';
            console.log(itm);
        });
        let s3 = cnf.onFinish.subscribe((syncRes) => {
            if (syncRes.success) {
                this.refresh();
                loading.dismiss().then(() => { loading = null; });
            }
            else {
                if (syncRes.error) {
                    msg.showError(syncRes.error);
                }
                else {
                    for (let key in syncRes.data) {
                        if (syncRes.data[key].state == 'error') {
                            msg.showError(syncRes.data[key].lastError);
                        }
                    }
                }
                loading.dismiss().then(() => { loading = null; });
            }
            s1.unsubscribe();
            s2.unsubscribe();
            s3.unsubscribe();
        });
        return loading.present();
    }
    render() {
        return [
            h("ion-header", null, h("ion-toolbar", { color: "header", class: "ion-text-center" }, h("ion-buttons", { slot: "start" }, h("ion-button", { color: "outstanding", onClick: () => { nav.goHome(); } }, h("ion-icon", { slot: "icon-only", name: "home" }))), h("ion-buttons", { slot: "end" }, h("ion-button", { color: "outstanding", onClick: () => { nav.goLogin(); } }, h("ion-icon", { slot: "icon-only", name: "exit" }))), h("ion-title", null, h("span", null, "Sync")))),
            h("ion-content", { color: "light", class: "ion-padding" }, h("ion-grid", { fixed: true }, h("ion-row", null, h("ion-col", { size: "12" }, h("h5", null, h("ion-icon", { name: "timer" }), " ", util.translate('sync.last')), h("h2", null, this.lastSync))), h("ion-row", null, h("ion-col", { size: "12" }, h("div", { class: "square-container", color: "outstanding" }, h("div", { class: "square" }, h("div", { class: "content", onClick: () => this.getAllData(false) }, h("img", { src: "./assets/img/sync-data.png" }), h("h6", null, util.translate('sync.refresh')))), h("div", { class: "square" }, h("div", { class: "content", onClick: () => this.sendData() }, h("img", { src: "./assets/img/send-data.png" }), h("h6", null, util.translate('sync.send'))))), (this.lastSync ?
                h("div", { class: "square-container", color: "outstanding" }, h("div", { class: "square" }, h("div", { class: "content", onClick: () => msg.confirm(util.translate('sync.confirmOverwrite'), util.translate('sync.confirmOverwriteText')).then(() => { this.getAllData(true); }) }, h("img", { src: "./assets/img/overwrite-data.png" }), h("h6", null, util.translate('sync.overwrite')))), h("div", { class: "square" }, h("div", { class: "content", onClick: () => this.syncTemplates() }, h("img", { src: "./assets/img/sync-templates.png" }), h("h6", null, util.translate('sync.templates')))))
                : h("div", null))))))
        ];
    }
}
FlxSync.style = flxSyncCss;

export { FlxSync as flx_sync };
