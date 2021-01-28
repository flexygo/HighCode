import { r as registerInstance, j as h } from './index-76f52202.js';
import { u as util, C as ConftokenProvider, s as sql } from './messages-50a67881.js';
import { j as jquery } from './jquery-4ed57fb2.js';
import { p as parser } from './parser-90867b5f.js';

const flxHomeCss = "";

const FlxHome = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    componentWillLoad() {
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
    render() {
        return [
            h("ion-header", null, h("ion-toolbar", { color: "header", class: "ion-text-center" }, h("ion-buttons", { slot: "start" }, h("ion-menu-button", { color: "outstanding" })), h("ion-title", null, h("span", { id: "menuTitle" }, this.title)))),
            h("ion-content", null, h("ion-refresher", { slot: "fixed", id: "refresher", onIonRefresh: (ev) => { this.refresh(ev); } }, h("ion-refresher-content", null)), h("div", { id: "mainHeader", innerHTML: this.header }), h("div", { id: "mainBody", innerHTML: this.body }), h("div", { id: "mainHeader", innerHTML: this.footer }))
        ];
    }
};
FlxHome.style = flxHomeCss;

export { FlxHome as flx_home };
