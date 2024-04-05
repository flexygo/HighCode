import { r as registerInstance, k as h, m as getElement } from './index-d0d1673d.js';
import { s as sql, u as util, n as nav } from './conftoken-2c86328f.js';
import { j as jquery } from './jquery-eec92bf9.js';
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
import './_commonjsHelpers-148b4233.js';

const flxIndexeddbCss = "flx-indexeddb .shadow{box-shadow:rgba(0, 0, 0, 0.24) 0px 3px 8px}flx-indexeddb .bottom-border{border-bottom:1px solid #6e7c7f}flx-indexeddb .grid{display:grid}flx-indexeddb #SQLSentence{--padding-bottom:15px;--padding-top:15px;border-bottom:1px solid rgb(140, 138, 163);display:flex;align-items:center}flx-indexeddb #SQLSentence span{color:#35a4f5;font-weight:bold;padding-left:10px;margin-right:5px}flx-indexeddb #SQLSentence>div{width:100%}flx-indexeddb #showTables{cursor:pointer}flx-indexeddb #showTables:hover{color:rgb(74, 138, 221)}ion-modal.accountsModal.indexedDBModal{--max-height:90%}flx-indexeddb #ResultContainer{max-height:85vh;width:100%;padding:10px}flx-indexeddb #DataContainer{background:white;padding-bottom:10px;border-radius:10px}flx-indexeddb #ResultTable,flx-indexeddb #ErrorElement{background:white;border-radius:10px}flx-indexeddb #ResultTable{overflow:auto;border-radius:10px;max-height:75vh;padding:0 10px 10px 10px}flx-indexeddb #Properties{overflow-x:hidden;overflow-y:scroll}flx-indexeddb .grid{padding:10px 10px 0 10px}flx-indexeddb .grid div{padding:10px;text-overflow:clip;max-height:200px;border-right:1px solid #6e7c7f;overflow-y:auto;user-select:text}flx-indexeddb .grid div.darken{background:rgb(226 229 247 / 46%)}flx-indexeddb #ErrorElement{border-radius:10px;color:red;padding:10px}flx-indexeddb #ErrorElement ion-icon{color:red;margin:10px}flx-indexeddb .txtLighten{color:rgb(0 0 0 / 52%)}ion-modal.accountsModal ion-item:not([lines=\"full\"]).bgWhite{--background:white}ion-modal.accountsModal ion-item:not([lines=\"full\"]).bgGray{--background:var(--ion-color-light)}";

const FlxIndexedDB = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.currentSentence = 0;
    this.sentences = [];
  }
  async componentWillLoad() {
    jquery('#loadingSpinnerModule').css('visibility', 'visible');
    this.refresh();
  }
  componentDidLoad() {
    jquery('#loadingSpinnerModule').css('visibility', 'hidden');
    this.sqlInput = document.getElementById('SQLSentence');
    this.dataContainer = jquery('#DataContainer');
    this.errorElement = jquery('#ErrorElement');
    this.errorLabel = jquery('#ErrorElement ion-label');
  }
  async refresh() {
  }
  executeSentence() {
    let sentence = this.sqlInput.value;
    this.sentences.push(sentence);
    sql.execSQL(sentence).then((res) => {
      this.showData(res);
    }).catch(err => {
      this.showError(err.message);
    });
    this.currentSentence = this.sentences.length;
    setTimeout(() => {
      jquery(this.sqlInput).find('textarea')[0].value = '';
      this.sqlInput.setAttribute('rows', 1);
    }, 50);
  }
  showData(data) {
    this.errorElement.addClass('hidden');
    this.dataContainer[0].innerHTML = '';
    if (data.rows && data.rows.length) {
      let rows = sql.getRows(data);
      this.createResultTable(rows);
    }
    else {
      this.createEmptyResultTable();
    }
    this.dataContainer.removeClass('hidden');
  }
  async createEmptyResultTable() {
    let columns = await sql.getQueryColumns(this.sentences[this.sentences.length - 1]);
    let properties = '';
    columns.forEach(column => { properties += `<div title="${column}" bottom-border">${column}</div>`; });
    this.dataContainer.append(`<div id="Properties" class="grid" style="overflow: auto; grid-template-columns: repeat(${columns.length}, 150px);">${properties}</div>`);
  }
  createResultTable(rows) {
    let keys = Object.keys(rows[0]);
    //Adding Column Names Row
    let properties = '', cssClass = 'darken';
    keys.forEach(el => { properties += `<div title="${el}" class="${cssClass} bottom-border">${el}</div>`; });
    this.dataContainer.append(`<div id="Properties" class="grid" style="grid-template-columns: repeat(${keys.length}, 150px);">${properties}</div>`);
    //Adding Values Names Rows
    let containers = '';
    rows.forEach(el => {
      cssClass = cssClass === 'darken' ? '' : 'darken';
      keys.forEach(key => {
        containers += `<div title="${el[key]}" class="${(el[key] === null || el[key] === undefined) ? cssClass + ' txtLighten' : cssClass}">${el[key]}</div>`;
      });
    });
    this.dataContainer.append(`<div id="ResultTable" class="grid" style="grid-template-columns: repeat(${keys.length}, 150px);">${containers}</div>`);
    //Make Properties Names and Values always have the same horizontal scroll
    var props = this.dataContainer.find('#Properties');
    var values = this.dataContainer.find('#ResultTable');
    props.scroll(function () { values.prop("scrollLeft", this.scrollLeft); });
    values.scroll(function () { props.prop("scrollLeft", this.scrollLeft); });
  }
  showError(message) {
    this.dataContainer.addClass('hidden');
    this.errorLabel.text(message);
    this.errorElement.removeClass('hidden');
  }
  remindSentence(isUp) {
    this.currentSentence = isUp ? this.currentSentence - 1 : this.currentSentence + 1;
    if (this.currentSentence < 0)
      this.currentSentence = 0;
    let val = this.sentences[this.currentSentence];
    if (val) {
      this.sqlInput.value = val;
    }
    else if (this.currentSentence >= this.sentences.length) {
      this.sqlInput.value = '';
      this.currentSentence = this.sentences.length;
    }
  }
  async showAllTables() {
    let contentStr = `<ion-content>
      <ion-list>
        <ion-item lines="full">
          <ion-label>
            <h2 class="accTitle">${util.translate('indexedDB.tables')}</h2>
          </ion-label>
        </ion-item>
        <ion-searchbar></ion-searchbar>
    `;
    let tables = await sql.getRows(await sql.execSQL(`SELECT name FROM sqlite_schema WHERE type='table' ORDER BY name`));
    tables.forEach(table => {
      contentStr += `<ion-item tableName=${table.name} lines="none" button detail="false"">
        <ion-label>
          <h2>${table.name}</h2>
        </ion-label>
      </ion-item>`;
    });
    contentStr += `</ion-list></ion-content>`;
    let content = jquery(contentStr);
    content.find('ion-item').on('click', ev => {
      ev.stopPropagation();
      this.sqlInput.value = 'SELECT * FROM ' + ev.currentTarget.getAttribute('tableName');
      this.executeSentence();
      this.tablesModal.dismiss();
    });
    content.find('ion-searchbar').on('ionChange', ev => {
      let inputVal = ev.currentTarget.value;
      let list = jquery(ev.currentTarget).closest('ion-list');
      let added_items = 0;
      let items = list.find('[tableName]');
      if (inputVal) {
        for (let i = 0; i < items.length; i++) {
          let item = jquery(items[i]);
          let tableN = item.attr("tableName").toLowerCase();
          if (!tableN.includes(inputVal.toLowerCase())) {
            item.hide();
          }
          else {
            item.removeClass('bgGray');
            item.removeClass('bgWhite');
            item.addClass(added_items % 2 === 1 ? 'bgGray' : 'bgWhite');
            item.show();
            added_items++;
          }
        }
      }
      else {
        items.removeClass('bgGray');
        items.removeClass('bgWhite');
        items.show();
      }
    });
    this.tablesModal = document.createElement('ion-modal');
    this.tablesModal.component = content[0];
    this.tablesModal.showBackdrop = false;
    this.tablesModal.mode = 'ios';
    this.tablesModal.swipeToClose = true;
    this.tablesModal.showBackdrop = true;
    this.tablesModal.cssClass = "accountsModal indexedDBModal";
    document.body.appendChild(this.tablesModal);
    this.tablesModal.present();
    setTimeout(() => { jquery(this.tablesModal).find('ion-searchbar input').focus(); }, 1000);
  }
  changeInputSize(input) {
    const rows_number = input.value.split('\n').length;
    this.sqlInput.setAttribute('rows', rows_number);
  }
  onkeyPressEvent(ev) {
    if (ev.key === "Enter" && !ev.shiftKey) {
      this.executeSentence();
    }
  }
  onKeyDownEvent(ev) {
    const cursor_position = ev.target.selectionStart;
    const rows = ev.target.value.split('\n');
    const first_row_length = rows[0].length;
    const rows_length = ev.target.value.replace(rows[rows.length - 1], '').length;
    if (ev.code === "ArrowUp" && cursor_position <= first_row_length)
      this.remindSentence(true);
    else if (ev.code === "ArrowDown" && cursor_position >= rows_length)
      this.remindSentence(false);
    this.changeInputSize(ev.target);
  }
  render() {
    return [
      h("ion-header", null, h("ion-toolbar", { color: "header", class: "ion-text-center" }, h("ion-buttons", { slot: "start" }, h("ion-button", { id: "home", color: "outstanding", onClick: () => nav.goHome() }, h("ion-icon", { slot: "icon-only", name: "home" }))), h("ion-buttons", { slot: "end" }, h("ion-button", { color: "outstanding", onClick: () => { nav.goBack(this.me); } }, h("ion-icon", { slot: "icon-only", name: "arrow-undo-outline" }))), h("ion-title", null, h("span", null, "Sync")))),
      h("ion-content", { color: "light" }, h("ion-item", null, h("ion-textarea", { id: "SQLSentence", class: "shadow", placeholder: util.translate('indexedDB.sentence'), onKeyPress: ev => { this.onkeyPressEvent(ev); }, onKeyDown: ev => { this.onKeyDownEvent(ev); }, onInput: ev => { this.changeInputSize(ev.target); }, rows: "1" }, h("span", null, ">")), h("ion-icon", { name: "grid-outline", id: "showTables", title: util.translate('indexedDB.tables'), slot: "end", onClick: () => { this.showAllTables(); } })), h("div", { id: "ResultContainer" }, h("div", { id: "DataContainer", class: "shadow hidden" }), h("ion-item", { id: "ErrorElement", class: "shadow hidden ion-text-wrap", lines: "none" }, h("ion-icon", { name: "alert-circle-outline", slot: "start" }), h("ion-label", null))))
    ];
  }
  get me() { return getElement(this); }
};
FlxIndexedDB.style = flxIndexeddbCss;

export { FlxIndexedDB as flx_indexeddb };
