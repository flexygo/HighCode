import { r as registerInstance, j as h, k as getElement } from './index-76f52202.js';
import './ionic-global-53d785f3.js';
import { u as util, C as ConftokenProvider, s as sql, m as msg } from './messages-1e55a1f4.js';
import { j as jquery } from './jquery-4ed57fb2.js';
import './utils-30827fbd.js';
import './index-38aae3ff.js';
import './helpers-742de4f9.js';
import './animation-a90ce8fc.js';
import './index-a6178d25.js';
import './ios.transition-bfe5eada.js';
import './md.transition-e49d1536.js';
import './cubic-bezier-89113939.js';
import './index-9b41fcc6.js';
import './index-86d5f3ab.js';
import './hardware-back-button-b3b61715.js';
import './index-c940ddb6.js';
import './overlays-3fb58ad8.js';
import { n as nav } from './navigation-8af3d3e3.js';
import { p as parser } from './parser-8fd0ea5d.js';

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
