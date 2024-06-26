import { r as registerInstance, k as h } from './index-d0d1673d.js';
import { C as ConftokenProvider, u as util, m as msg, n as nav, k as flxSync } from './conftoken-2c86328f.js';
import { j as jquery } from './jquery-eec92bf9.js';
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
import './index-07c2bb76.js';
import './hardware-back-button-aacf3d12.js';
import './overlays-177438ad.js';
import './_commonjsHelpers-148b4233.js';

const flxSyncCss = ".loading-content{overflow:auto}.rectangle{width:100%;float:left;position:relative;display:flex;justify-content:center}.rectangle>div{width:calc(100% - 16px);max-height:252px;height:calc(100% - 16px);margin:8px;padding-bottom:16px;color:var(--ion-color-outstanding-contrast);background-color:var(--ion-color-outstanding-shade);box-shadow:0 2px 5px rgb(0 0 0 / 26%);text-align:center;cursor:pointer;border-radius:10px;max-width:520px}.rectangle ion-icon,.square ion-icon{font-size:80px;margin-top:20px}.square #sendDataInfo ion-icon{color:#fdd235}.square #indexedDB ion-icon{color:#dfdedf}.rectangle h6{margin-top:0}ion-row.changeAccount{place-content:center;padding-top:5px}ion-row.changeAccount>a{cursor:pointer}";

const FlxSync = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.lastSync = '-';
    this.advOpt = false;
  }
  async componentWillLoad() {
    jquery('#loadingSpinnerModule').css('visibility', 'visible');
    this.refresh();
  }
  componentDidLoad() {
    jquery('#loadingSpinnerModule').css('visibility', 'hidden');
  }
  async refresh() {
    return ConftokenProvider.config().then((cnf) => {
      if (cnf && cnf.lastSync) {
        this.lastSync = moment(cnf.lastSync).locale(cnf.user.currentUserCultureId).format('L LT');
      }
    });
  }
  showSendDataInfo() {
    ConftokenProvider.config().then((cnf) => {
      let body = `
        <p><b>Time:</b> ${cnf.lastSend ? cnf.lastSend : util.translate("sendData.time")}</p>
        <p><b>Error:</b> ${cnf.lastSendError ? cnf.lastSendError : util.translate("sendData.error")}</p>
        <p><b>Ping:</b> ${cnf.lastSendPing ? cnf.lastSendPing : util.translate("sendData.ping")}${cnf.lastSendPing ? "ms" : ""}</p>
        <p><b>OS:</b> ${util.getOSVersion()}</p>
      `;
      if (cnf.lastSendLocation === 'Unable to get coords') {
        body += `<p><b>Location:</b> ${cnf.lastSendLocation}<p></p>`;
      }
      else if (cnf.lastSendLocation) {
        body += `<p><b>Location:</b> <a href="http://maps.google.com/maps?t=k&q=loc:${cnf.lastSendLocation}">${cnf.lastSendLocation}</a><p></p>`;
      }
      else {
        body += `<p><b>Location:</b> ${util.translate("sendData.location")}<p></p>`;
      }
      body += `<ion-button id="sendErrorLogs" onclick="flexygo.utils.sendErrorsLogs();">${util.translate('sendData.sendErrorLogs')}</ion-button>`;
      msg.confirm(util.translate('sendData.title'), body, null, false, () => {
        let button = jquery('ion-button#sendErrorLogs');
        button.attr('fill', 'outline');
        button.click(() => { util.sendErrorsLogs(); });
      });
    });
  }
  render() {
    return [
      h("ion-header", null, h("ion-toolbar", { color: "header", class: "ion-text-center" }, h("ion-buttons", { slot: "start" }, h("ion-button", { id: "home", color: "outstanding", onClick: () => nav.goHome() }, h("ion-icon", { slot: "icon-only", name: "home" }))), h("ion-buttons", { slot: "end" }, h("ion-button", { id: "exit", color: "outstanding", onClick: () => flxSync.logOff() }, h("ion-icon", { slot: "icon-only", name: "exit" }))), h("ion-title", null, h("span", null, "Sync")))),
      h("ion-content", { color: "light", class: "ion-padding" }, h("ion-grid", { fixed: true }, h("ion-row", null, h("ion-col", null, h("div", null, h("h5", null, h("ion-icon", { name: "timer" }), " ", util.translate('sync.last')), h("h2", null, this.lastSync))), h("ion-col", { size: "auto", style: { display: "flex", alignItems: 'center', justifyContent: 'flex-end' } }, h("div", { style: { display: 'flex', alignItems: 'center', alignSelf: 'flex-start', paddingTop: "10px" } }, h("ion-icon", { name: "build", style: { fontSize: "24px" } }), h("ion-toggle", { mode: "md", onIonChange: () => { this.advOpt = !this.advOpt; } })))), h("ion-row", null, h("ion-col", { size: "12" }, h("div", { class: "square-container", color: "outstanding" }, h("div", { class: "square" }, h("div", { id: "refresh", class: "content", onClick: () => flxSync.syncData() }, h("img", { src: "./assets/img/sync-data.png" }), h("h6", null, util.translate('sync.refresh')))), (this.lastSync !== '-' ?
        h("div", { class: "square" }, h("div", { id: "send", class: "content", onClick: () => flxSync.sendData() }, h("img", { src: "./assets/img/send-data.png" }), h("h6", null, util.translate('sync.send'))))
        : h("div", null))), (this.advOpt ?
        h("div", null, (this.lastSync !== '-' ?
          h("div", { class: "square-container", color: "outstanding" }, h("div", { class: "square" }, h("div", { id: "overwrite", class: "content", onClick: () => msg.confirm(util.translate('sync.confirmOverwrite'), util.translate('sync.confirmOverwriteText')).then(() => { flxSync.overwriteData(); }) }, h("img", { src: "./assets/img/overwrite-data.png" }), h("h6", null, util.translate('sync.overwrite')))), h("div", { class: "square" }, h("div", { id: "templates", class: "content", onClick: () => flxSync.syncTemplates() }, h("img", { src: "./assets/img/sync-templates.png" }), h("h6", null, util.translate('sync.templates')))))
          : h("div", null)), h("div", null, h("input", { id: "file-selector", onChange: (ev) => { flxSync.restoreBackup(ev); }, type: "file", style: { "display": "none" } }), h("div", { id: "result_block", class: "hidden" }, h("h3", null, "Content :"), h("div", { id: "result" })), h("div", { class: "square-container", color: "outstanding" }, (this.lastSync !== '-' ?
          h("div", { class: "square" }, h("div", { id: "backup", class: "content", onClick: () => flxSync.msgCreateBackup() }, h("img", { src: "./assets/img/sync-backup.png" }), h("h6", null, util.translate('sync.backup'))))
          : h("div", null)), h("div", { class: "square" }, h("div", { id: "restore", class: "content", onClick: () => msg.confirm(util.translate('sync.confirmOverwrite'), util.translate('sync.confirmOverwriteText')).then(() => { jquery('#file-selector').trigger('click'); }) }, h("img", { src: "./assets/img/sync-restore.png" }), h("h6", null, util.translate('sync.restore')))))), h("div", null, h("div", { class: "square-container", color: "outstanding" }, h("div", { class: "square" }, h("div", { id: "indexedDB", class: "content", onClick: () => nav._nav('indexeddb', 'forward') }, h("ion-icon", { name: "server-outline" }), h("h6", null, util.translate('indexedDB.title')))), h("div", { class: "square" }, h("div", { id: "sendDataInfo", class: "content", onClick: () => this.showSendDataInfo() }, h("ion-icon", { name: "information-circle-outline" }), h("h6", null, util.translate('sendData.title')))))))
        : h("div", null)))), h("ion-row", { class: "changeAccount" }, h("a", { onClick: () => flxSync.showAccountsModal() }, "Change account"))))
    ];
  }
};
FlxSync.style = flxSyncCss;

export { FlxSync as flx_sync };
