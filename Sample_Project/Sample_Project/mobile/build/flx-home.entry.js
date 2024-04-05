import { r as registerInstance, k as h } from './index-d0d1673d.js';
import { k as flxSync, W as Webapi, C as ConftokenProvider, i as gps, t as tracking, x as storage, v as ConftokenService, n as nav, m as msg, u as util, s as sql } from './conftoken-2c86328f.js';
import { p as parser } from './parser-74bf7b6b.js';
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

const flxHomeCss = "#menuIonTitle{position:absolute;left:0;right:0;margin-left:auto;margin-right:auto;top:0;height:100%}";

const FlxHome = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.body = undefined;
    this.footer = undefined;
    this.header = undefined;
    this.title = undefined;
  }
  componentDidLoad() {
    jquery('#loadingSpinnerModule').css('visibility', 'hidden');
    flxSync.checkSendErrors();
    this.createLogsTable();
    if (window.cordova)
      this.activateTracking(); //Checks if location is required to be tracked
    this.checkSyncNeed(); //Checks if user needs to sync and if so it will start syncing
  }
  async activateTracking() {
    let auth = await (new Webapi()).getAuth();
    ConftokenProvider.config().then((token) => {
      if (auth.b64 && token && token.tracking && token.tracking.active)
        gps.showActivationMsg(true, true);
      else
        tracking.clean();
    });
  }
  checkSyncNeed() {
    storage.get('needsToSync').then(val => {
      if (val === true)
        (new ConftokenService).showResyncModal();
    });
  }
  async componentWillLoad() {
    if (!await this.didUserSync())
      nav.goSync();
    let data = await ConftokenProvider.config();
    if (data && data.profile && data.profile.mustChangePsw) {
      msg.changePassword(!data.profile.mustChangePsw);
    }
    jquery('#loadingSpinnerModule').css('visibility', 'visible');
    this.title = '';
    this.body = '';
    this.header = '';
    this.footer = '';
    this.loadData().then(() => {
      if (this.page && this.page.JSAfterLoad) {
        util.execDynamicCode(this.page.JSAfterLoad);
      }
    });
    jquery(window).off('popstate.home').on('popstate.home', () => {
      if (document.location.href.toLowerCase().indexOf('/home') > 0) {
        this.loadData();
      }
    });
  }
  async refresh(ev) {
    return this.loadData().then(() => {
      if (ev)
        ev.target.complete();
      if (this.page && this.page.JSAfterLoad) {
        util.execDynamicCode(this.page.JSAfterLoad);
      }
    });
  }
  loadData() {
    return ConftokenProvider.config().then(async (cnf) => {
      this.title = '';
      this.body = '';
      this.header = '';
      this.footer = '';
      if (cnf && cnf.homePage) {
        this.page = cnf.homePage;
        if (this.page.SQLSentence) {
          let sentence = this.page.SQLSentence;
          sentence = sql.addOrderBy(sentence, this.page.SQLOrderBy);
          sql.getTable(sentence).then(async (table) => {
            if (table && table.rows && table.rows.length > 0) {
              this.title = await parser.recursiveCompile(sql.getRow(table, 0), this.page.title, cnf, this);
            }
            this.body = await this.getRows(this.page, table, null, this, cnf);
          });
        }
        else {
          this.title = await parser.recursiveCompile(null, this.page.title, cnf, this);
          if (this.page.header) {
            this.header = await parser.recursiveCompile(null, this.page.header, cnf, this);
          }
          if (this.page.body) {
            this.body = await parser.recursiveCompile(null, this.page.body, cnf, this);
          }
          if (this.page.footer) {
            this.footer = await parser.recursiveCompile(null, this.page.footer, cnf, this);
          }
        }
      }
    });
  }
  async getRows(page, table, defaults, ctx, cnf) {
    let rendered = '';
    if (table && table.rows && table.rows.length > 0) {
      if (page.header && page.header != '') {
        this.header = await parser.recursiveCompile(sql.getRow(table, 0), page.header, cnf, ctx);
      }
      if (page.body && page.body != '') {
        for (let i = 0; i < table.rows.length; i++) {
          rendered += await parser.recursiveCompile(sql.getRow(table, i), page.body, cnf, ctx);
        }
      }
      if (page.footer && page.footer != '') {
        this.footer = await parser.recursiveCompile(sql.getRow(table, 0), page.footer, cnf, this);
      }
    }
    else {
      if (page.empty && page.empty != '') {
        rendered = await parser.recursiveCompile(defaults, page.empty, cnf, this);
      }
      else {
        rendered = 'No data found';
      }
    }
    return rendered;
  }
  async didUserSync() {
    const token = await ConftokenProvider.config();
    if (token && token.lastSync)
      return true;
    return false;
  }
  async createLogsTable() {
    let creationScript = `CREATE TABLE IF NOT EXISTS ErrorsLogs (
      LogId int PRIMARY KEY,
      Message string,
      PageType string,
      PageObject string,
      PageName string,
      _insertDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;
    try {
      await sql.execSQL(creationScript);
    }
    catch (err) {
      console.log(err);
    }
  }
  render() {
    return [
      h("ion-header", null, h("ion-toolbar", { color: "header", class: "ion-text-center" }, h("ion-buttons", { slot: "start" }, h("ion-menu-button", { color: "outstanding" }), h("ion-icon", { name: "alert-circle", color: "danger", class: "stack sendError flx-hide" })), h("ion-title", { id: "menuIonTitle" }, h("span", { id: "menuTitle" }, this.title)))),
      h("ion-header", { innerHTML: this.header }),
      h("ion-content", null, h("ion-refresher", { slot: "fixed", id: "refresher", onIonRefresh: (ev) => { this.refresh(ev); } }, h("ion-refresher-content", null)), h("div", { id: "mainBody", innerHTML: this.body })),
      h("ion-footer", { innerHTML: this.footer })
    ];
  }
};
FlxHome.style = flxHomeCss;

export { FlxHome as flx_home };
