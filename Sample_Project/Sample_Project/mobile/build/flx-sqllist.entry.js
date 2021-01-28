import { r as registerInstance, j as h, k as getElement } from './index-76f52202.js';
import { s as sql, C as ConftokenProvider, u as util } from './messages-50a67881.js';
import { j as jquery } from './jquery-4ed57fb2.js';
import { p as parser } from './parser-90867b5f.js';

const flxSqllistCss = "flx-sqllist{}";

const FlxSqllist = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.currentPage = 0;
        this.pageElements = 20;
        this.params = [];
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
    load() {
        this.bodyTemplate = jquery(this.me).find('.bodyTemplate').text();
        this.body = new Array();
        this.footer = '';
        this.header = '';
        this.loadData();
    }
    async loadMore() {
        this.currentPage += 1;
        let sentence = sql.addPager(this.currentSentence, this.currentPage, this.pageElements);
        sql.getTable(sentence, this.currentParams).then(async (table) => {
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
            if (first && this.headerTemplate && this.headerTemplate != '') {
                this.header = await parser.recursiveCompile(sql.getRow(table, 0), this.headerTemplate, cToken, ctx);
            }
            if (this.bodyTemplate && this.bodyTemplate != '') {
                for (let i = 0; i < table.rows.length; i++) {
                    let row = sql.getRow(table, i);
                    newItems.push(this.getIonItemSliding(await parser.recursiveCompile(row, this.bodyTemplate, cToken, ctx)));
                }
            }
            if (first && this.footerTemplate && this.footerTemplate != '') {
                this.footer = await parser.recursiveCompile(sql.getRow(table, 0), this.footerTemplate, cToken, this);
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
