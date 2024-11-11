import { r as registerInstance, k as h, m as getElement } from './index-8e5b11cb.js';
import { k as flxSync, u as util, C as ConftokenProvider, s as sql, m as msg, n as nav } from './conftoken-89472368.js';
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

const flxViewCss = "";

const FlxView = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.object = undefined;
    this.pageName = undefined;
    this.filter = undefined;
    this.defaults = undefined;
    this.modal = false;
    this.body = undefined;
    this.header = undefined;
    this.footer = undefined;
    this.title = undefined;
  }
  componentDidLoad() {
    jquery('#loadingSpinnerModule').css('visibility', 'hidden');
    flxSync.checkSendErrors();
  }
  componentWillLoad() {
    jquery('#loadingSpinnerModule').css('visibility', 'visible');
    this.object = (this.object) ? decodeURIComponent(this.object) : null;
    this.pageName = (this.pageName) ? decodeURIComponent(this.pageName) : null;
    this.filter = (this.filter) ? decodeURIComponent(this.filter) : null;
    this.defaults = (this.defaults) ? decodeURIComponent(this.defaults) : null;
    this.loadData().then(() => {
      if (this.page && this.page.JSAfterLoad) {
        util.execDynamicCode(this.page.JSAfterLoad);
      }
    });
    jquery(window).off('popstate.view.' + this.pageName).on('popstate.view.' + this.pageName, () => {
      if (document.location.href.toLowerCase().indexOf('/view/') > 0) {
        this.loadData().then(() => {
          if (this.page && this.page.JSAfterLoad) {
            util.execDynamicCode(this.page.JSAfterLoad);
          }
        });
      }
    });
  }
  async refresh(ev) {
    this.loadData().then(() => {
      if (ev) {
        ev.target.complete();
      }
      if (this.page && this.page.JSAfterLoad) {
        util.execDynamicCode(this.page.JSAfterLoad);
      }
    });
  }
  loadData() {
    return ConftokenProvider.config().then(async (cnf) => {
      let confObj = cnf.objectConfig[this.object];
      this.page = parser.findTemplate(confObj, 'view', this.pageName);
      let sentence = sql.addWhere(this.page.SQLSentence, this.filter);
      await sql.getTable(sentence).then(async (table) => {
        if (table && table.rows && table.rows.length > 0) {
          this.title = await parser.recursiveCompile(sql.getRow(table, 0), this.page.title, cnf, this);
        }
        let def = null;
        if (this.defaults) {
          def = util.parseJSON(this.defaults);
        }
        this.body = await this.getRows(confObj, this.page, table, def, this, cnf);
      });
    }).catch(e => {
      msg.showError(e);
    });
  }
  async getRows(confObj, page, table, defaults, ctx, cnf) {
    let rendered = '';
    if (table && table.rows && table.rows.length > 0) {
      let row = sql.getRow(table, 0);
      row['objIdent'] = util.getPrimaryKeysFilter(confObj, row);
      if (page.header && page.header != '') {
        let header = page.header;
        header = await parser.recursiveCompile(row, header, cnf, ctx);
        if (defaults) {
          header = await parser.recursiveCompile(defaults, header, cnf, ctx);
        }
        this.header = header;
      }
      if (page.body && page.body != '') {
        let body = page.body;
        body = await parser.recursiveCompile(row, body, cnf, ctx);
        if (defaults) {
          body = await parser.recursiveCompile(defaults, body, cnf, ctx);
        }
        rendered = body;
      }
      if (page.footer && page.footer != '') {
        let footer = page.footer;
        footer = await parser.recursiveCompile(row, footer, cnf, ctx);
        if (defaults) {
          footer = await parser.recursiveCompile(defaults, footer, cnf, ctx);
        }
        this.footer = footer;
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
  render() {
    return [
      h("ion-header", null, h("ion-toolbar", { color: "header", class: "ion-text-center" }, h("ion-buttons", { slot: "start" }, (this.modal ? null : h("ion-menu-button", { color: "outstanding" })), (this.modal ? null : h("ion-icon", { name: "alert-circle", color: "danger", class: "stack sendError flx-hide" }))), h("ion-buttons", { slot: "end" }, h("ion-button", { color: "outstanding", onClick: () => { nav.goBack(this.me); } }, h("ion-icon", { slot: "icon-only", name: "arrow-undo-outline" }))), h("ion-title", null, h("span", { id: "menuTitle" }, this.title)))),
      h("ion-header", { innerHTML: this.header }),
      h("ion-content", null, h("ion-refresher", { slot: "fixed", id: "refresher", onIonRefresh: (ev) => { this.refresh(ev); } }, h("ion-refresher-content", null)), h("div", { id: "mainBody", innerHTML: this.body })),
      h("ion-footer", { innerHTML: this.footer })
    ];
  }
  get me() { return getElement(this); }
};
FlxView.style = flxViewCss;

export { FlxView as flx_view };
