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

const flxListCss = "";

const FlxList = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.pageElements = 20;
        this.currentPage = 0;
        this.searchValue = '';
        this.modal = false;
    }
    watchFilter() {
        this.body = new Array();
        this.filterData();
    }
    watchOrderby() {
        this.body = new Array();
        this.filterData();
    }
    componentWillLoad() {
        this.load().then(() => {
            if (this.page && this.page.JSAfterLoad) {
                util.execDynamicCode(this.page.JSAfterLoad);
            }
        });
        jquery(window).off('popstate.list').on('popstate.list', async () => {
            if (document.location.href.toLowerCase().indexOf('/list/') > 0 && document.location.href.toLowerCase().indexOf('/' + this.object.toLowerCase() + '/') > 0) {
                this.refresh(null);
            }
        });
    }
    async load() {
        this.object = (this.object) ? decodeURIComponent(this.object) : null;
        this.pageName = (this.pageName) ? decodeURIComponent(this.pageName) : null;
        this.filter = (this.filter) ? decodeURIComponent(this.filter) : null;
        this.defaults = (this.defaults) ? decodeURIComponent(this.defaults) : null;
        this.body = new Array();
        this.footer = '';
        this.header = '';
        this.title = '';
        this.currentPage = 0;
        await this.loadData(true);
    }
    filterData(filter) {
        return ConftokenProvider.config().then(async (conf) => {
            this.currentPage = 0;
            let infiniteScroll = ((jquery(this.me).find('ion-infinite-scroll').length > 0) ? jquery(this.me).find('ion-infinite-scroll')[0] : null);
            if (infiniteScroll) {
                infiniteScroll.disabled = false;
            }
            let sentence = sql.addWhere(this.page.SQLSentence, this.filter);
            this.currentParams = [];
            if (this.page && this.page.ShowSearchBar && this.page.SQLSearchFilter && this.searchValue) {
                for (let i = 0; i < this.page.SQLSearchFilter.match(/(@findstring)/gmi).length; i++) {
                    this.currentParams.push(this.searchValue);
                }
                sentence = sql.addWhere(sentence, this.page.SQLSearchFilter.replace(/(@findstring)/gmi, '?'));
            }
            if (this.additional) {
                sentence = sql.addWhere(sentence, this.additional);
            }
            else if (this.page.AdditionalWhere) {
                sentence = sql.addWhere(sentence, this.page.AdditionalWhere);
            }
            sentence = sql.addWhere(sentence, filter);
            if (this.orderby) {
                sentence = sql.addOrderBy(sentence, this.orderby);
            }
            else if (this.page.SQLOrderBy) {
                sentence = sql.addOrderBy(sentence, this.page.SQLOrderBy);
            }
            this.currentSentence = sentence;
            sentence = sql.addPager(this.currentSentence, this.currentPage, this.pageElements);
            sql.getTable(sentence, this.currentParams).then(async (table) => {
                this.body = await this.getRows(this.confObj, this.page, table, null, this, false, conf);
            });
        });
    }
    async refresh(ev) {
        this.body = new Array();
        this.loadData(false).then(() => {
            if (ev && ev.target && ev.target.complete) {
                ev.target.complete();
            }
        });
    }
    async loadMore() {
        try {
            let conf = await ConftokenProvider.config();
            this.currentPage += 1;
            let sentence = sql.addPager(this.currentSentence, this.currentPage, this.pageElements);
            sql.getTable(sentence, this.currentParams).then(async (table) => {
                let newItems = await this.getRows(this.confObj, this.page, table, null, this, false, conf);
                this.body = this.body.concat(newItems);
            });
        }
        catch (e) {
            msg.showError(e);
        }
        ;
    }
    async loadData(first) {
        try {
            let infiniteScroll = ((jquery(this.me).find('ion-infinite-scroll').length > 0) ? jquery(this.me).find('ion-infinite-scroll')[0] : null);
            if (infiniteScroll) {
                infiniteScroll.disabled = false;
            }
            this.page = null;
            let confT = await ConftokenProvider.config();
            this.confObj = confT.objectConfig[this.object];
            let page = parser.findTemplate(this.confObj, 'list', this.pageName);
            if (!page) {
                let item;
                if (this.pageName) {
                    item = this.getIonItem('Can\'t find page ' + this.object);
                }
                else {
                    item = this.getIonItem('Can\'t find any page for object ' + this.object);
                }
                this.body = [item];
                return;
            }
            this.title = page.title;
            let sentence = sql.addWhere(page.SQLSentence, this.filter);
            this.currentParams = [];
            if (page && page.ShowSearchBar && page.SQLSearchFilter && this.searchValue) {
                for (let i = 0; i < page.SQLSearchFilter.match(/(@findstring)/gmi).length; i++) {
                    this.currentParams.push(this.searchValue);
                }
                sentence = sql.addWhere(sentence, page.SQLSearchFilter.replace(/(@findstring)/gmi, '?'));
            }
            if (this.additional) {
                sentence = sql.addWhere(sentence, this.additional);
            }
            else if (page.AdditionalWhere) {
                sentence = sql.addWhere(sentence, page.AdditionalWhere);
            }
            for (let i = 0; i < page.groups.length; i++) {
                sentence = sql.addOrderBy(sentence, page.groups[i].field + ' ' + page.groups[i].type);
            }
            if (this.orderby) {
                sentence = sql.addOrderBy(sentence, this.orderby);
            }
            else if (page.SQLOrderBy) {
                sentence = sql.addOrderBy(sentence, page.SQLOrderBy);
            }
            this.currentSentence = sentence;
            //Load more elements if currentPage is more than one to allow scroll item in back button
            sentence = sql.addPager(this.currentSentence, 0, (this.pageElements * (this.currentPage + 1)));
            await sql.getTable(sentence, this.currentParams).then(async (table) => {
                if (table && table.rows && table.rows.length > 0) {
                    this.title = await parser.recursiveCompile(sql.getRow(table, 0), page.title, confT, this);
                }
                this.page = page;
                let def = null;
                if (this.defaults) {
                    def = util.parseJSON(this.defaults);
                }
                this.body = await this.getRows(this.confObj, this.page, table, def, this, first, confT);
            });
        }
        catch (e) {
            msg.showError(e);
        }
        ;
    }
    async getRows(confObj, page, table, defaults, ctx, first, cnf) {
        let infiniteScroll = ((jquery(this.me).find('ion-infinite-scroll').length > 0) ? jquery(this.me).find('ion-infinite-scroll')[0] : null);
        let newItems = new Array();
        if (table && table.rows && table.rows.length > 0) {
            if (first && page.header && page.header != '') {
                this.header = await parser.recursiveCompile(sql.getRow(table, 0), page.header, cnf, ctx);
                if (defaults) {
                    this.header = await parser.recursiveCompile(defaults, this.header, cnf, ctx);
                }
            }
            if (page.body && page.body != '') {
                let lastItem = null;
                for (let i = 0; i < table.rows.length; i++) {
                    let rendered = '';
                    let row = sql.getRow(table, i);
                    row['objIdent'] = util.getPrimaryKeysFilter(confObj, row);
                    /*Add render groups*/
                    if (!lastItem) {
                        let arr = await this.paintGroupHeader(row, page.groups, cnf, ctx);
                        if (arr.length > 0) {
                            newItems = newItems.concat(arr);
                        }
                    }
                    let arr = await this.controlGroup(lastItem, row, page.groups, cnf, ctx);
                    if (arr.length) {
                        newItems = newItems.concat(arr);
                    }
                    rendered = await parser.recursiveCompile(row, page.body, cnf, ctx);
                    rendered = await parser.recursiveCompile(defaults, rendered, cnf, ctx);
                    lastItem = row;
                    /*add render with groups*/
                    newItems.push(this.getIonItemSliding(rendered));
                }
                if (lastItem) {
                    let arr = await this.paintGroupFooter(sql.getRow(table, table.rows.length - 1), page.groups, cnf, ctx);
                    if (arr.length) {
                        newItems = newItems.concat(arr);
                    }
                }
            }
            if (first && page.footer && page.footer != '') {
                this.footer = await parser.recursiveCompile(sql.getRow(table, 0), page.footer, cnf, ctx);
                if (defaults) {
                    this.footer = await parser.recursiveCompile(defaults, this.footer, cnf, ctx);
                }
            }
        }
        else if (first) {
            if (first && page.header && page.header != '') {
                this.header = await parser.recursiveCompile(defaults, page.header, cnf, ctx);
            }
            let item;
            if (page.empty && page.empty != '') {
                item = this.getIonItem(await parser.recursiveCompile(defaults, page.empty, cnf, ctx));
            }
            else {
                item = this.getIonItem(util.translate('list.noresults'));
            }
            newItems.push(item);
            if (first && page.footer && page.footer != '') {
                this.footer = await parser.recursiveCompile(defaults, page.footer, cnf, ctx);
            }
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
    async paintGroupHeader(item, groups, cnf, ctx) {
        let arr = new Array();
        for (let i = 0; i < groups.length; i++) {
            let key = groups[i].field;
            if (typeof item[key] != 'undefined' && groups[i].header) {
                arr.push(this.getIonItemGroup(await parser.recursiveCompile(item, groups[i].header, cnf, ctx)));
            }
        }
        return arr;
    }
    async paintGroupFooter(item, groups, cnf, ctx) {
        let arr = new Array();
        for (let i = groups.length - 1; i >= 0; i--) {
            let key = groups[i].field;
            if (typeof item[key] != 'undefined' && groups[i].footer) {
                arr.push(this.getIonItemGroup(await parser.recursiveCompile(item, groups[i].footer, cnf, ctx)));
            }
        }
        return arr;
    }
    async controlGroup(prev, item, groups, cnf, ctx) {
        let arr = new Array();
        let lvl = -1;
        //Finding deep level.
        for (let i = 0; i < groups.length; i++) {
            let key = groups[i].field;
            if (typeof item[key] != 'undefined' && prev != null && typeof prev[key] != 'undefined') {
                if (prev[key] != item[key]) {
                    lvl = i;
                    break;
                }
            }
        }
        if (lvl > -1) {
            //Append footer templates from inside to found deep level.
            for (let i = groups.length - 1; i >= lvl; i--) {
                if (groups[i].footer) {
                    arr.push(this.getIonItemGroup(await parser.recursiveCompile(item, groups[i].footer, cnf, ctx)));
                }
            }
            //Append header templates from deep level to last header.
            for (let i = lvl; i < groups.length; i++) {
                if (groups[i].header) {
                    arr.push(this.getIonItemGroup(await parser.recursiveCompile(item, groups[i].header, cnf, ctx)));
                }
            }
        }
        return arr;
    }
    async onSearchChange(ev, value) {
        if (value) {
            this.searchValue = '%' + value + '%';
        }
        else {
            this.searchValue = '';
        }
        this.currentPage = 0;
        this.refresh(ev);
    }
    getIonItemSliding(innerHTML) {
        return h("ion-item-sliding", { innerHTML: innerHTML });
    }
    getIonItem(innerHTML) {
        return h("ion-item", { innerHTML: innerHTML });
    }
    getIonItemGroup(innerHTML) {
        return h("ion-item-group", { innerHTML: innerHTML });
    }
    render() {
        return [
            h("ion-header", null, h("ion-toolbar", { color: "header", class: "ion-text-center" }, h("ion-buttons", { slot: "start" }, (this.modal ? null : h("ion-menu-button", { color: "outstanding" }))), h("ion-buttons", { slot: "end" }, h("ion-button", { color: "outstanding", onClick: () => { nav.goBack(this.me); } }, h("ion-icon", { slot: "icon-only", name: "arrow-undo-outline" }))), h("ion-title", null, h("span", { id: "menuTitle" }, this.title)))),
            h("ion-header", null, ((this.page && this.page.ShowSearchBar && this.page.SQLSearchFilter)
                ? h("ion-searchbar", { "cancel-button-text": util.translate('msg.cancel'), placeholder: util.translate('list.search'), mode: "ios", debounce: 1000, value: this.searchValue.replace(/^\%+|\%+$/g, ''), onIonClear: (ev) => { this.onSearchChange(ev, ''); }, onIonChange: (ev) => { this.onSearchChange(ev, ev.currentTarget.value); }, animated: true, "show-cancel-button": "focus" })
                : '')),
            h("ion-header", { innerHTML: this.header }),
            h("ion-content", null, h("ion-refresher", { slot: "fixed", id: "refresher", onIonRefresh: (ev) => { this.currentPage = 0; this.refresh(ev); } }, h("ion-refresher-content", { "pulling-icon": "chevron-down-circle-outline", refreshingSpinner: "bubbles" })), h("ion-list", { class: "mainBody" }, this.body), h("ion-infinite-scroll", { threshold: "500px", onIonInfinite: () => { this.loadMore(); } }, h("ion-infinite-scroll-content", { loadingSpinner: "bubbles", loadingText: "Loading..." }))),
            h("ion-footer", { innerHTML: this.footer })
        ];
    }
    get me() { return getElement(this); }
    static get watchers() { return {
        "additional": ["watchFilter"],
        "orderby": ["watchOrderby"]
    }; }
};
FlxList.style = flxListCss;

export { FlxList as flx_list };
