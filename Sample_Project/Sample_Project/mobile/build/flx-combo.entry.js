import { r as registerInstance, j as h, k as getElement } from './index-86ac49ff.js';
import './ionic-global-0f98fe97.js';
import './webapi-79a1d3db.js';
import { u as util, s as sql } from './conftoken-7e3c18eb.js';
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

const flxComboCss = "flx-combo{width:100%}flx-combo ion-select{width:100%;max-width:100%}";

const FlxCombo = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.disabled = false;
        this.autorefresh = true;
        this.table = [];
        this.rendering = false;
        this.pendingOpen = false;
    }
    componentWillLoad() {
        if (((typeof this.multiple != 'undefined')) && this.value && this.value.toString().startsWith('[')) {
            this.value = util.execDynamicCode(this.value);
        }
        this.load(true);
    }
    sqlsentenceHandler() {
        if (this.autorefresh) {
            this.load(false);
        }
    }
    additionalHandler() {
        if (this.autorefresh) {
            this.load(false);
        }
    }
    filterlHandler() {
        if (this.autorefresh) {
            this.load(false);
        }
    }
    async refresh() {
        return this.load(true);
    }
    componentDidRender() {
        this.rendering = false;
        if (this.value != null) {
            jquery(this.me).find('ion-select')[0].forceUpdate();
        }
        if (this.pendingOpen == true) {
            this.pendingOpen = false;
            jquery(this.me).find('ion-select')[0].open();
        }
    }
    async open() {
        if (this.rendering == true) {
            this.pendingOpen = true;
        }
        else {
            jquery(this.me).find('ion-select')[0].open();
        }
    }
    load(firstTime) {
        if (this.sqlsentence) {
            const isNew = (window.location.href.toLowerCase().indexOf('/filter/') === -1 ? true : false);
            let sentence = sql.addWhere(this.sqlsentence, this.filter);
            sentence = sql.addWhere(sentence, this.additional);
            sentence = sql.addOrderBy(sentence, this.orderby);
            return sql.getTable(sentence).then((table) => {
                let arr = [];
                for (let i = 0; i < table.rows.length; i++) {
                    arr.push(sql.getRow(table, i));
                }
                let autoselectLower = (this.autoselect ? this.autoselect.toLowerCase() : null);
                if (table.rows.length === 1 && ((autoselectLower === "always") || (autoselectLower === "true" && isNew))) {
                    if (firstTime) {
                        const row = sql.getRow(table, 0);
                        this.prerenderValue = row[this.valuefield];
                    }
                }
                this.table = arr;
                this.rendering = true;
            });
        }
    }
    compare(itm1, itm2) {
        itm1 = ((typeof itm1 == 'undefined') ? '' : itm1);
        itm2 = ((typeof itm2 == 'undefined') ? '' : itm2);
        if (itm2 && typeof itm2 == 'object') {
            return itm2.includes(itm1);
        }
        else {
            return (itm1.toString() == itm2.toString());
        }
    }
    valueChange(ev) {
        this.value = ev.currentTarget.value;
        jquery(this.me).trigger('change');
        if (typeof this.value != 'undefined' && this.value != null) {
            jquery(this.me).closest('ion-item').addClass('item-has-value');
        }
    }
    render() {
        return (h("ion-select", { multiple: (!(typeof this.multiple == 'undefined')), disabled: (this.disabled ? true : false), compareWith: this.compare, value: (typeof this.prerenderValue != 'undefined' ? this.prerenderValue : this.value), onIonChange: (ev) => { this.valueChange(ev); } }, ((typeof this.multiple == 'undefined') ? h("ion-select-option", { value: "" }) : null), this.table.map((row) => {
            return h("ion-select-option", { value: row[this.valuefield] }, row[this.displayfield]);
        })));
    }
    get me() { return getElement(this); }
    static get watchers() { return {
        "sqlsentence": ["sqlsentenceHandler"],
        "additional": ["additionalHandler"],
        "filter": ["filterlHandler"]
    }; }
};
FlxCombo.style = flxComboCss;

export { FlxCombo as flx_combo };
