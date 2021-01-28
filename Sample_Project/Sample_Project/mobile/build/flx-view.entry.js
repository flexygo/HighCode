import { r as registerInstance, j as h, k as getElement } from './index-76f52202.js';
import './ionic-global-693c5dc1.js';
import { u as util, C as ConftokenProvider, s as sql, m as msg } from './messages-50a67881.js';
import { j as jquery } from './jquery-4ed57fb2.js';
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
import { p as parser } from './parser-90867b5f.js';

const flxViewCss = "";

const FlxView = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.modal = false;
    }
    componentWillLoad() {
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
                this.loadData();
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
            let sentence = this.page.SQLSentence;
            if (this.page.SQLSentence.toLowerCase().indexOf('where') >= 0) {
                sentence += ' and ' + this.filter;
            }
            else {
                sentence += ' WHERE ' + this.filter;
            }
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
            h("ion-header", null, h("ion-toolbar", { color: "header", class: "ion-text-center" }, h("ion-buttons", { slot: "start" }, (this.modal ? null : h("ion-menu-button", { color: "outstanding" }))), h("ion-buttons", { slot: "end" }, h("ion-button", { color: "outstanding", onClick: () => { nav.goBack(this.me); } }, h("ion-icon", { slot: "icon-only", name: "arrow-undo-outline" }))), h("ion-title", null, h("span", { id: "menuTitle" }, this.title)))),
            h("ion-header", { innerHTML: this.header }),
            h("ion-content", null, h("ion-refresher", { slot: "fixed", id: "refresher", onIonRefresh: (ev) => { this.refresh(ev); } }, h("ion-refresher-content", null)), h("div", { id: "mainBody", innerHTML: this.body })),
            h("ion-footer", { innerHTML: this.footer })
        ];
    }
    get me() { return getElement(this); }
};
FlxView.style = flxViewCss;

export { FlxView as flx_view };
