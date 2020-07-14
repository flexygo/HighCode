import { r as registerInstance, h, d as getElement } from './index-1ad46950.js';
import './ionic-global-d77af0d9.js';
import { C as ConftokenProvider, s as sql, u as util, m as msg } from './messages-65fb7542.js';
import './utils-30f0564d.js';
import './index-fb0d54fa.js';
import './helpers-d94a0dba.js';
import './animation-6c25f42e.js';
import './index-0cbc1957.js';
import './ios.transition-e8b1df9c.js';
import './md.transition-03140845.js';
import './cubic-bezier-92995175.js';
import './index-1da44cf3.js';
import './index-53f14fc6.js';
import './hardware-back-button-c2d005b0.js';
import './index-28dab2f8.js';
import './overlays-e769172f.js';
import { j as jquery } from './jquery-4ed57fb2.js';
import { n as nav } from './navigation-538e1aae.js';
import { p as parser } from './parser-8823d4d2.js';

const flxViewCss = "";

class FlxView {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.modal = false;
    }
    componentWillLoad() {
        this.object = (this.object) ? decodeURIComponent(this.object) : null;
        this.pageName = (this.pageName) ? decodeURIComponent(this.pageName) : null;
        this.filter = (this.filter) ? decodeURIComponent(this.filter) : null;
        this.defaults = (this.defaults) ? decodeURIComponent(this.defaults) : null;
        this.loadData();
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
        });
    }
    loadData() {
        return ConftokenProvider.config().then(async (cnf) => {
            let confObj = cnf.objectConfig[this.object];
            let page = parser.findTemplate(confObj, 'view', this.pageName);
            let sentence = page.SQLSentence;
            if (page.SQLSentence.toLowerCase().indexOf('where') >= 0) {
                sentence += ' and ' + this.filter;
            }
            else {
                sentence += ' WHERE ' + this.filter;
            }
            await sql.getTable(sentence).then(async (table) => {
                if (table && table.rows && table.rows.length > 0) {
                    this.title = await parser.recursiveCompile(sql.getRow(table, 0), page.title, cnf, this);
                }
                let def = null;
                if (this.defaults) {
                    def = util.parseJSON(this.defaults);
                }
                this.body = await this.getRows(confObj, page, table, def, this, cnf);
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
}
FlxView.style = flxViewCss;

export { FlxView as flx_view };
