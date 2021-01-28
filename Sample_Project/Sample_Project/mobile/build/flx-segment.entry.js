import { r as registerInstance, j as h, k as getElement } from './index-76f52202.js';
import { s as sql } from './messages-50a67881.js';
import { j as jquery } from './jquery-4ed57fb2.js';

const flxSegmentCss = "";

const FlxSegment = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.table = [];
    }
    componentWillLoad() {
        this.load();
    }
    sqlsentenceHandler() {
        this.load();
    }
    additionalHandler() {
        this.load();
    }
    filterlHandler() {
        this.load();
    }
    async refresh() {
        return this.load();
    }
    componentDidRender() {
        if (this.value != null) {
            jquery(this.me).find('ion-segment')[0].forceUpdate();
        }
    }
    async open() {
        jquery(this.me).find('ion-segment')[0].open();
    }
    load() {
        if (this.sqlsentence) {
            let sentence = sql.addWhere(this.sqlsentence, this.filter);
            sentence = sql.addWhere(sentence, this.additional);
            sentence = sql.addOrderBy(sentence, this.orderby);
            return sql.getTable(sentence).then((table) => {
                let arr = [];
                for (let i = 0; i < table.rows.length; i++) {
                    arr.push(sql.getRow(table, i));
                }
                this.table = arr;
            });
        }
    }
    valueChange(ev) {
        this.value = ev.currentTarget.value;
    }
    render() {
        return (h("ion-segment", { color: "dark", mode: "md", value: this.value, onIonChange: (ev) => { this.valueChange(ev); } }, this.table.map((row) => {
            return h("ion-segment-button", { layout: "icon-start", value: row[this.valuefield] }, ((typeof row['icon'] == 'undefined') ? null : h("ion-icon", { name: row['icon'] })), h("ion-label", { color: ((typeof row['color'] == 'undefined') ? null : row['color']) }, row[this.displayfield]));
        })));
    }
    get me() { return getElement(this); }
    static get watchers() { return {
        "sqlsentence": ["sqlsentenceHandler"],
        "additional": ["additionalHandler"],
        "filter": ["filterlHandler"]
    }; }
};
FlxSegment.style = flxSegmentCss;

export { FlxSegment as flx_segment };
