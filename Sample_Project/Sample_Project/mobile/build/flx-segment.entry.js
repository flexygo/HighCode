import { r as registerInstance, k as h, m as getElement } from './index-d0d1673d.js';
import { j as jquery } from './jquery-eec92bf9.js';
import { s as sql } from './conftoken-2c86328f.js';
import './_commonjsHelpers-148b4233.js';
import './process-es6-d973fab3.js';
import './utils-0a0c7da4.js';
import './animation-10ea33c3.js';
import './helpers-719f4c54.js';
import './ios.transition-62fdffc9.js';
import './index-06bb8825.js';
import './md.transition-f61d2286.js';
import './cubic-bezier-93f47170.js';
import './index-7fe827c3.js';
import './ionic-global-f9661584.js';
import './index-b40d441b.js';
import './index-07c2bb76.js';
import './hardware-back-button-aacf3d12.js';
import './overlays-177438ad.js';

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
