import { r as registerInstance, k as h, m as getElement } from './index-8e5b11cb.js';
import { j as jquery } from './jquery-34624bb9.js';
import { s as sql } from './conftoken-89472368.js';
import './_commonjsHelpers-2a12c1e6.js';
import './process-es6-cc264d03.js';
import './utils-224de961.js';
import './animation-b4670628.js';
import './helpers-7ecb2fa5.js';
import './ios.transition-e14f38db.js';
import './index-c59a2c3f.js';
import './md.transition-8bd31aee.js';
import './cubic-bezier-ed243a9b.js';
import './index-d086042f.js';
import './ionic-global-6d118971.js';
import './index-cc97b114.js';
import './index-81d32235.js';
import './hardware-back-button-508e48cf.js';
import './overlays-cda44124.js';

const flxSegmentCss = "";

const FlxSegment = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.value = undefined;
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
