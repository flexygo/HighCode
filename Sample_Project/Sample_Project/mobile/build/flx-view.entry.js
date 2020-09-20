import { r as registerInstance, j as h, k as getElement } from './index-e5ff2de3.js';
import './ionic-global-e5feb32d.js';
import { u as util, C as ConftokenProvider, s as sql, m as msg } from './messages-cbb766b7.js';
import './utils-8c7561fa.js';
import './index-a78b1497.js';
import './helpers-d94a0dba.js';
import './animation-625503e5.js';
import './index-77ad4b44.js';
import './ios.transition-5093371a.js';
import './md.transition-42e45fee.js';
import './cubic-bezier-92995175.js';
import './index-1da44cf3.js';
import './index-53f14fc6.js';
import './hardware-back-button-c2d005b0.js';
import './index-dbdc5ddf.js';
import './overlays-e386d27e.js';
import { j as jquery } from './jquery-4ed57fb2.js';
import { n as nav } from './navigation-b90acdd2.js';
import { p as parser } from './parser-d662b563.js';

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
        jquery(window).off('popstate.view').on('popstate.view', () => {
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
                rendered += header;
            }
            if (page.body && page.body != '') {
                let body = page.body;
                body = await parser.recursiveCompile(row, body, cnf, ctx);
                if (defaults) {
                    body = await parser.recursiveCompile(defaults, body, cnf, ctx);
                }
                rendered += body;
            }
            if (page.footer && page.footer != '') {
                let footer = page.footer;
                footer = await parser.recursiveCompile(row, footer, cnf, ctx);
                if (defaults) {
                    footer = await parser.recursiveCompile(defaults, footer, cnf, ctx);
                }
                rendered += footer;
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
            h("ion-content", null, h("ion-refresher", { slot: "fixed", id: "refresher", onIonRefresh: (ev) => { this.refresh(ev); } }, h("ion-refresher-content", null)), h("div", { id: "mainBody", innerHTML: this.body }))
        ];
    }
    get me() { return getElement(this); }
};
FlxView.style = flxViewCss;

export { FlxView as flx_view };
