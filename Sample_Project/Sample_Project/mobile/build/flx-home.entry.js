import { r as registerInstance, h } from './index-1ad46950.js';
import { C as ConftokenProvider, s as sql } from './messages-65fb7542.js';
import { j as jquery } from './jquery-4ed57fb2.js';
import { p as parser } from './parser-8823d4d2.js';

const flxHomeCss = "";

class FlxHome {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    componentWillLoad() {
        this.title = '';
        this.body = '';
        this.header = '';
        this.footer = '';
        this.loadData();
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
        });
    }
    loadData() {
        return ConftokenProvider.config().then(async (cnf) => {
            this.title = '';
            this.body = '';
            this.header = '';
            this.footer = '';
            if (cnf && cnf.homePage) {
                let page = cnf.homePage;
                if (page.SQLSentence) {
                    let sentence = page.SQLSentence;
                    sentence = sql.addOrderBy(sentence, page.SQLOrderBy);
                    sql.getTable(sentence).then(async (table) => {
                        if (table && table.rows && table.rows.length > 0) {
                            this.title = await parser.recursiveCompile(sql.getRow(table, 0), page.title, cnf, this);
                        }
                        this.body = await this.getRows(page, table, null, this, cnf);
                    });
                }
                else {
                    this.title = await parser.recursiveCompile(null, page.title, cnf, this);
                    if (page.header) {
                        this.header = await parser.recursiveCompile(null, page.header, cnf, this);
                    }
                    if (page.body) {
                        this.body = await parser.recursiveCompile(null, page.body, cnf, this);
                    }
                    if (page.footer) {
                        this.footer = await parser.recursiveCompile(null, page.footer, cnf, this);
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
}
FlxHome.style = flxHomeCss;

export { FlxHome as flx_home };
