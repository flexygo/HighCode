import { r as registerInstance, j as h, k as getElement } from './index-e5ff2de3.js';
import { s as sql } from './messages-cbb766b7.js';
import { j as jquery } from './jquery-4ed57fb2.js';

const flxComboCss = "flx-combo{width:100%}flx-combo ion-select{width:100%;max-width:100%}";

const FlxCombo = class {
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
            jquery(this.me).find('ion-select')[0].forceUpdate();
        }
    }
    async open() {
        jquery(this.me).find('ion-select')[0].open();
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
    compare(itm1, itm2) {
        if (itm2 && typeof itm2 == 'object') {
            return itm2.includes(itm1);
        }
        else {
            return (itm1 == itm2);
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
        return (h("ion-select", { multiple: (!(typeof this.multiple == 'undefined')), disabled: (this.disabled ? true : false), compareWith: this.compare, value: this.value, onIonChange: (ev) => { this.valueChange(ev); } }, ((typeof this.multiple == 'undefined') ? h("ion-select-option", { value: "" }) : null), this.table.map((row) => {
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
