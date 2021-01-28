import { r as registerInstance, j as h, k as getElement } from './index-76f52202.js';
import { u as util, s as sql } from './messages-50a67881.js';
import { j as jquery } from './jquery-4ed57fb2.js';

const flxComboCss = "flx-combo{width:100%}flx-combo ion-select{width:100%;max-width:100%}";

const FlxCombo = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.autorefresh = true;
        this.table = [];
        this.rendering = false;
        this.pendingOpen = false;
    }
    componentWillLoad() {
        if (((typeof this.multiple != 'undefined')) && this.value && this.value.toString().startsWith('[')) {
            this.value = util.execDynamicCode(this.value);
        }
        this.load();
    }
    sqlsentenceHandler() {
        if (this.autorefresh) {
            this.load();
        }
    }
    additionalHandler() {
        if (this.autorefresh) {
            this.load();
        }
    }
    filterlHandler() {
        if (this.autorefresh) {
            this.load();
        }
    }
    async refresh() {
        return this.load();
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
