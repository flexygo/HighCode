import { r as registerInstance, k as h, m as forceUpdate, l as getElement } from './index-3f6ae35e.js';
import { j as jquery } from './jquery-254bc370.js';
import { u as util, s as sql } from './conftoken-6a608b71.js';
import './_commonjsHelpers-2a12c1e6.js';
import './process-es6-cc264d03.js';
import './utils-515e0805.js';
import './animation-160b6d8d.js';
import './helpers-0fb1c204.js';
import './ios.transition-9f5405f1.js';
import './index-7e5eab7f.js';
import './md.transition-d5eeb7f8.js';
import './cubic-bezier-ed243a9b.js';
import './index-d086042f.js';
import './ionic-global-7b33f09f.js';
import './index-cc97b114.js';
import './index-f393b124.js';
import './hardware-back-button-508e48cf.js';
import './overlays-71eb67ef.js';

const flxComboCss = "flx-combo{width:100%}flx-combo ion-select{width:100%;max-width:100%}";

const FlxCombo = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.rendering = false;
    this.pendingOpen = false;
    this.value = null;
    this.name = undefined;
    this.placeHolder = undefined;
    this.disabled = false;
    this.required = undefined;
    this.dataMsgRequired = undefined;
    this.min = undefined;
    this.max = undefined;
    this.dataMsgMin = undefined;
    this.dataMsgMax = undefined;
    this.class = undefined;
    this.valuefield = undefined;
    this.displayfield = undefined;
    this.sqlsentence = undefined;
    this.orderby = undefined;
    this.filter = undefined;
    this.additional = undefined;
    this.multiple = undefined;
    this.autorefresh = true;
    this.autoselect = undefined;
    this.prerenderValue = undefined;
    this.table = [];
  }
  componentWillLoad() {
    if (((typeof this.multiple != 'undefined')) && this.value && this.value.toString().startsWith('[')) {
      this.value = util.execDynamicCode(this.value);
    }
    else if ((!this.value || this.value === 0) && this.me.getAttribute('value')) {
      this.value = this.me.getAttribute('value');
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
    else if (itm2 || itm2 === 0) {
      return (itm1.toString() == itm2.toString());
    }
    else {
      return false;
    }
  }
  valueChange(ev) {
    this.value = ev.currentTarget.value;
    if (!this.me.getAttribute('avoid_dependencies')) {
      jquery(this.me).trigger('change');
    }
    else {
      this.me.removeAttribute('avoid_dependencies');
    }
    if (typeof this.value != 'undefined' && this.value != null) {
      jquery(this.me).closest('ion-item').addClass('item-has-value');
    }
    if (this.me.sqlValidatorFunction)
      this.me.sqlValidatorFunction();
  }
  render() {
    return (h("ion-select", { multiple: (!(typeof this.multiple == 'undefined')), disabled: (this.disabled ? true : false), compareWith: this.compare, value: (typeof this.prerenderValue != 'undefined' ? this.prerenderValue : this.value), onIonChange: (ev) => { this.valueChange(ev); } }, ((typeof this.multiple == 'undefined') ? h("ion-select-option", { value: "" }) : null), this.table.map((row, index) => {
      if (this.table.length - 1 === index) {
        if (!this.me.hasAttribute('multiple') && this.value != null)
          this.value += '';
        forceUpdate(jquery(this.me).find('ion-select')[0]);
      }
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
