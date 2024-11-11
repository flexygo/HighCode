import { r as registerInstance, k as h, m as getElement } from './index-8e5b11cb.js';
import { s as sql, C as ConftokenProvider, m as msg, u as util } from './conftoken-89472368.js';
import { p as parser } from './parser-e9709966.js';
import { j as jquery } from './jquery-34624bb9.js';
import './process-es6-cc264d03.js';
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
import './_commonjsHelpers-2a12c1e6.js';

const flxSqllistCss = "flx-sqllist{}";

const FlxSqllist = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.currentPage = 0;
    this.filter = undefined;
    this.defaults = undefined;
    this.additional = undefined;
    this.pageElements = 20;
    this.sqlsentence = undefined;
    this.params = [];
    this.orderby = undefined;
    this.pagename = undefined;
    this.objectname = undefined;
    this.body = undefined;
    this.footer = undefined;
    this.header = undefined;
  }
  async refresh(ev) {
    return this.loadData().then(() => {
      if (ev && ev.target && ev.target.complete) {
        ev.target.complete();
      }
    });
  }
  async filterData(filter) {
    this.currentPage = 0;
    let infiniteScroll = ((jquery(this.me).find('ion-infinite-scroll').length > 0) ? jquery(this.me).find('ion-infinite-scroll')[0] : null);
    if (infiniteScroll) {
      infiniteScroll.disabled = false;
    }
    let sentence = sql.addWhere(this.sqlsentence, this.filter);
    sentence = sql.addWhere(sentence, this.additional);
    sentence = sql.addWhere(sentence, filter);
    sentence = sql.addOrderBy(sentence, this.orderby);
    this.currentSentence = sentence;
    sentence = sql.addPager(this.currentSentence, this.currentPage, this.pageElements);
    sql.getTable(sentence, this.params).then(async (table) => {
      this.body = await this.getRows(table, null, this, true);
    });
  }
  componentWillLoad() {
    this.load();
  }
  async load() {
    var _a, _b, _c;
    this.body = new Array();
    this.bodyTemplate = (_a = this.me.querySelector('.bodyTemplate')) === null || _a === void 0 ? void 0 : _a.innerHTML;
    this.header = (_b = this.me.querySelector('.headerTemplate')) === null || _b === void 0 ? void 0 : _b.innerHTML;
    this.footer = (_c = this.me.querySelector('.footerTemplate')) === null || _c === void 0 ? void 0 : _c.innerHTML;
    await this.loadPageSettings();
    this.loadData();
  }
  async loadPageSettings() {
    var _a;
    if (!this.pagename || !this.objectname)
      return;
    const conf_token = await ConftokenProvider.config();
    const object_config = conf_token.objectConfig[this.objectname] ? conf_token.objectConfig[this.objectname] : conf_token.objectConfig['Offline_' + this.objectname];
    if (!object_config) {
      msg.warning("An objectname was provided but no object with the same name was found");
      return;
    }
    const page_config = (_a = object_config === null || object_config === void 0 ? void 0 : object_config.pages) === null || _a === void 0 ? void 0 : _a.find(page => page.pageName.toLowerCase() === this.pagename.toLowerCase());
    if (!page_config) {
      msg.warning("An objectname and a pagename were provided but no page with the same name and object was found");
      return;
    }
    if (!this.sqlsentence)
      this.sqlsentence = page_config.SQLSentence;
    if (!this.bodyTemplate)
      this.bodyTemplate = page_config.body;
    if (!this.header)
      this.header = page_config.header;
    if (!this.footer)
      this.footer = page_config.footer;
  }
  async loadMore() {
    this.currentPage += 1;
    let sentence = sql.addPager(this.currentSentence, this.currentPage, this.pageElements);
    sql.getTable(sentence, this.params).then(async (table) => {
      let newItems = await this.getRows(table, null, this, false);
      this.body = this.body.concat(newItems);
    });
  }
  async loadData() {
    this.currentPage = 0;
    let infiniteScroll = ((jquery(this.me).find('ion-infinite-scroll').length > 0) ? jquery(this.me).find('ion-infinite-scroll')[0] : null);
    if (infiniteScroll) {
      infiniteScroll.disabled = false;
    }
    let sentence = sql.addWhere(this.sqlsentence, this.filter);
    sentence = sql.addWhere(sentence, this.additional);
    sentence = sql.addOrderBy(sentence, this.orderby);
    this.currentSentence = sentence;
    sentence = sql.addPager(this.currentSentence, this.currentPage, this.pageElements);
    return sql.getTable(sentence, this.params).then(async (table) => {
      this.body = await this.getRows(table, null, this, true);
    });
  }
  async getRows(table, defaults, ctx, first) {
    let cToken = await ConftokenProvider.config();
    let infiniteScroll = ((jquery(this.me).find('ion-infinite-scroll').length > 0) ? jquery(this.me).find('ion-infinite-scroll')[0] : null);
    let newItems = new Array();
    if (table && table.rows && table.rows.length > 0) {
      if (first && this.header) { //
        this.header = await parser.recursiveCompile(sql.getRow(table, 0), this.header, cToken, ctx);
      }
      if (this.bodyTemplate && this.bodyTemplate != '') {
        for (let i = 0; i < table.rows.length; i++) {
          let row = sql.getRow(table, i);
          newItems.push(this.getIonItemSliding(await parser.recursiveCompile(row, this.bodyTemplate, cToken, ctx)));
        }
      }
      if (first && this.footer) {
        this.footer = await parser.recursiveCompile(sql.getRow(table, 0), this.footer, cToken, this);
      }
    }
    else if (first) {
      let item;
      if (this.emptyTemplate && this.emptyTemplate != '') {
        item = this.getIonItemSliding(await parser.recursiveCompile(defaults, this.emptyTemplate, cToken, this));
      }
      else {
        item = this.getIonItem(util.translate('list.noresults'));
      }
      newItems.push(item);
    }
    if (infiniteScroll) {
      infiniteScroll.complete();
    }
    if (table && table.rows.length < this.pageElements) {
      if (infiniteScroll) {
        infiniteScroll.disabled = true;
      }
    }
    return newItems;
  }
  getIonItemSliding(innerHTML) {
    return h("ion-item-sliding", { innerHTML: innerHTML });
  }
  getIonItem(innerHTML) {
    return h("ion-item", { lines: "full", innerHTML: innerHTML });
  }
  render() {
    return [
      h("ion-header", { innerHTML: this.header }),
      h("ion-list", { id: "mainBody" }, this.body),
      h("ion-infinite-scroll", { threshold: "500px", onIonInfinite: () => { this.loadMore(); } }, h("ion-infinite-scroll-content", { loadingSpinner: "bubbles", loadingText: "Loading..." })),
      h("ion-footer", { innerHTML: this.footer })
    ];
  }
  get me() { return getElement(this); }
};
FlxSqllist.style = flxSqllistCss;

export { FlxSqllist as flx_sqllist };
