import { r as registerInstance, j as h, k as getElement } from './index-86ac49ff.js';
import './ionic-global-0f98fe97.js';
import './webapi-79a1d3db.js';
import { s as sql } from './conftoken-7e3c18eb.js';
import { j as jquery } from './jquery-5df58adb.js';
import './utils-16079bfd.js';
import './helpers-719f4c54.js';
import './animation-10ea33c3.js';
import './index-7173f7a2.js';
import './ios.transition-95375ac9.js';
import './md.transition-6d74e584.js';
import './cubic-bezier-93f47170.js';
import './index-7fe827c3.js';
import './index-b40d441b.js';
import './hardware-back-button-aacf3d12.js';
import './index-50651ccc.js';
import './overlays-5302658e.js';

const flxSegmentCss = "";

const FlxSegment = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.disabled = false;
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
        return (h("ion-segment", { scrollable: "true", disabled: (this.disabled ? true : false), color: "dark", mode: "md", value: this.value, onIonChange: (ev) => { this.valueChange(ev); } }, this.table.map((row) => {
            return h("ion-segment-button", { disabled: (this.disabled ? true : false), layout: "icon-start", value: row[this.valuefield] }, ((typeof row['icon'] == 'undefined') ? null : h("ion-icon", { color: ((typeof row['colorIcon'] == 'undefined') ? null : row['colorIcon']), name: row['icon'] })), h("ion-label", { color: ((typeof row['color'] == 'undefined') ? null : row['color']) }, row[this.displayfield]));
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
