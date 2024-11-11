import { r as registerInstance, k as h, m as getElement } from './index-8e5b11cb.js';
import { s as sql, u as util } from './conftoken-89472368.js';
import { j as jquery } from './jquery-34624bb9.js';
import { p as parser } from './parser-e9709966.js';
import { m as modalController } from './overlays-cda44124.js';
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
import './_commonjsHelpers-2a12c1e6.js';

const flxMulticomboCss = "flx-multicombo{width:100%}flx-multicombo ion-input{width:calc(100% - 60px);max-width:calc(100% - 60px);float:left;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}flx-multicombo[clearbutton=\"false\"] ion-input{width:100%;max-width:100%;float:left}flx-multicombo ion-button{width:30px;float:right}flx-multicombo ion-button.ios{--padding-start:0px;--padding-end:0px}flx-multicombo ion-modal.multicombo ion-grid{border-bottom:1px solid #dedede;padding:5px 0 5px 0}flx-multicombo ion-modal.multicombo ion-col{padding:0}flx-multicombo ion-modal.multicombo ion-col[size=\"1\"]{display:flex;flex-direction:column;justify-content:center}flx-multicombo ion-input.multicombo{display:inline-block;margin:10px 0}flx-multicombo ion-input.multicombo input{display:none !important}flx-multicombo ion-input.multicombo>div{display:inline-flex;background:#d44388;margin:3px 3px 0 0;padding:2px;border-radius:5px;color:white;font-size:14px}flx-multicombo div.multiValues{position:fixed;padding-top:18px;overflow:auto;-ms-overflow-style:none;scrollbar-width:none;}flx-multicombo div.multiValues::-webkit-scrollbar{display:none}flx-multicombo div.multiValue{display:inline-flex;background:#398cbd;margin:3px 3px 0 0;padding:2px;border-radius:5px;color:white;font-size:14px;margin-bottom:5px}flx-sqllist ion-item.multiSelected ion-icon.flxCheckIcon{color:#007c11}";

const FlxMulticombo = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.value = undefined;
    this.valueArr = [];
    this.text = undefined;
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
    this.objectname = undefined;
    this.sqlsentence = undefined;
    this.sqlfilter = undefined;
    this.orderby = undefined;
    this.filter = undefined;
    this.additional = undefined;
    this.clearbutton = true;
    this.tablename = undefined;
    this.autoselect = undefined;
    this.separator = undefined;
    this.table = [];
  }
  componentWillLoad() {
    this.load();
  }
  sqlsentenceHandler() {
    this.load();
  }
  sqlfilterHandler() {
    this.load();
  }
  additionalHandler() {
    this.load();
  }
  filterlHandler() {
    this.load();
  }
  async open() {
    this.showItems();
  }
  async refresh() {
    return this.load();
  }
  valueHandler() {
    if (!this.me.getAttribute('avoid_dependencies')) {
      jquery(this.me).trigger('change');
    }
    else {
      this.me.removeAttribute('avoid_dependencies');
    }
    if (this.me.sqlValidatorFunction)
      this.me.sqlValidatorFunction();
  }
  load() {
    if (this.sqlsentence) {
      let onClickFunction = `
                $(this).toggleClass('multiSelected');

                let icon = $(this).find('ion-icon.flxCheckIcon');
                if (icon.attr('name') === 'square-outline') icon.attr('name', 'checkbox-outline');
                else icon.attr('name', 'square-outline');
            `;
      if (jquery(this.me).find('.comboTemplate').length > 0) {
        this.template = `<ion-item lines="full" onClick="${onClickFunction}" value="{{${this.valuefield}|JS}}" text="{{${this.displayfield}|HTMLATTR}}">${jquery('<div>' + jquery(this.me).find('.comboTemplate').html() + '</div>').html()}<ion-icon class="flxCheckIcon" name="square-outline"></ion-icon></ion-item>`;
      }
      else {
        this.template = `<ion-item lines="full" onClick="${onClickFunction}" value="{{${this.valuefield}|JS}}" text="{{${this.displayfield}|HTMLATTR}}"><ion-label>{{${this.displayfield}}}</ion-label><ion-icon class="flxCheckIcon" name="square-outline"></ion-icon></ion-item>`;
      }
      let sentence = sql.addWhere(this.sqlsentence, this.filter);
      sentence = sql.addWhere(sentence, this.additional);
      if (this.value != null && this.value != "") {
        if (this.tablename != null) {
          sentence = sql.addWhere(sentence, `\`${this.tablename}\`.\`${this.valuefield}\` IN (`);
        }
        else {
          sentence = sql.addWhere(sentence, `\`${this.valuefield}\`  IN (`);
        }
        let valuesArr = this.value.split(this.separator);
        for (let i = 0; i < valuesArr.length; i++) {
          sentence += "'" + valuesArr[i] + "'" + (i < valuesArr.length - 1 ? ', ' : '');
        }
        sentence += ')';
        sql.getTable(sentence).then((tbl) => {
          const input = jquery(this.me).find('ion-input');
          let divValues = '';
          for (let i = 0; i < tbl.rows.length; i++) {
            divValues += `<div class="multiValue">${sql.getRow(tbl, i)[this.displayfield]}</div>`;
          }
          if (divValues) {
            divValues = `<div class="multiValues" style="width:${input.width()}px;">${divValues}</div>`;
          }
          else {
            divValues = '<div>' + this.value;
          }
          input.find('div.multiValues').remove();
          input.prepend(divValues + '</div>');
        });
      }
    }
  }
  async showItems() {
    let component = `
            <ion-fab vertical="top" horizontal="end" slot="fixed">
                <ion-fab-button color="dark" class="close"">
                    <ion-icon name="close"></ion-icon>
                </ion-fab-button>
            </ion-fab>
            <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                <ion-fab-button color="dark" class="save">
                    <ion-icon name="checkmark-outline"></ion-icon>
                </ion-fab-button>
            </ion-fab>
            <ion-content class="placeholder">
                <ion-header>
                    <ion-searchbar cancel-button-text="${util.translate('msg.cancel')}" placeholder="${util.translate('list.search')}" mode="ios" autoselect="off" animated="true" ></ion-searchbar>
                </ion-header>
            </ion-content>
        `;
    const modal = await modalController.create({
      component: 'ion-content'
    });
    let loadingSpinner = jquery('#loadingSpinnerModule');
    loadingSpinner.css('visibility', 'visible');
    modal.style.top = 'var(--ion-safe-area-top)';
    await modal.present();
    jquery(modal).find('.ion-page').html(component);
    let list = document.createElement('flx-sqllist');
    let sentence = sql.addWhere(this.sqlsentence, this.filter);
    sentence = sql.addWhere(sentence, this.additional);
    list.setAttribute("sqlsentence", sentence);
    if (this.orderby) {
      list.setAttribute("orderby", this.orderby);
    }
    jquery(list).append(jquery('<script class="bodyTemplate" type="text/template"></script>').text(this.template));
    jquery(modal).find('.ion-page .placeholder').append(list);
    let mBar = jquery(modal).find('ion-searchbar');
    mBar.off('ionChange').on('ionChange', (ev) => {
      if (mBar.val()) {
        if (this.sqlfilter) {
          list.params = [];
          list.additional = parser.replaceAll(this.sqlfilter, '@findstringstarts', `'${mBar.val()}%'`);
          list.additional = parser.replaceAll(list.additional, '@findstringends', `%'${mBar.val()}'`);
          list.additional = parser.replaceAll(list.additional, '@findstringexact', `'${mBar.val()}'`);
          list.additional = parser.replaceAll(list.additional, '@findstring', `'%${mBar.val()}%'`);
        }
        else {
          list.params = ['%' + mBar.val() + '%'];
          list.additional = `\`${this.displayfield}\` like ? `;
        }
      }
      else {
        list.params = [];
        list.additional = null;
      }
      list.refresh(ev);
    });
    setTimeout(() => { mBar[0].setFocus(); }, 500);
    jquery(modal).find('ion-fab-button.close').on('click', () => {
      modal.dismiss();
    });
    jquery(modal).find('ion-fab-button.save').on('click', () => {
      let values = '', descrips = '';
      let input = jquery(this.me).find('ion-input');
      let selected = jquery(modal).find('ion-item.multiSelected'), divValues = `<div class="multiValues" style="width:${input.width()}px;">`;
      for (let i = 0; i < selected.length; i++) {
        const itm = selected[i];
        values += itm.getAttribute('value') + (i < selected.length - 1 ? this.separator : '');
        descrips += itm.getAttribute('text') + (i < selected.length - 1 ? this.separator : '');
        divValues += `<div class="multiValue">${itm.getAttribute('text')}</div>`;
      }
      this.value = values;
      this.text = descrips;
      input.find('div.multiValues').remove();
      input.prepend(divValues + '</div>');
      modal.dismiss();
    });
    jquery(document).off('cancelSelect').on('cancelSelect', (_ev) => {
      modal.dismiss();
      jquery(document).off('select');
      jquery(document).off('cancelSelect');
    });
    loadingSpinner.css('visibility', 'hidden');
  }
  render() {
    if (this.clearbutton == false) {
      return ([h("ion-input", { disabled: this.disabled, type: "text", readonly: true, onClick: () => { !this.disabled ? this.showItems() : null; } })]);
    }
    else {
      return ([h("ion-input", { disabled: this.disabled, type: "text", readonly: true, onClick: () => { !this.disabled ? this.showItems() : null; } }), h("ion-button", { disabled: this.disabled, onClick: () => { this.value = ''; this.text = null; jquery(this.me).trigger('change'); }, shape: "round", slot: "end", color: "light" }, "x")
      ]);
    }
  }
  get me() { return getElement(this); }
  static get watchers() { return {
    "sqlsentence": ["sqlsentenceHandler"],
    "sqlfilter": ["sqlfilterHandler"],
    "additional": ["additionalHandler"],
    "filter": ["filterlHandler"],
    "value": ["valueHandler"]
  }; }
};
FlxMulticombo.style = flxMulticomboCss;

export { FlxMulticombo as flx_multicombo };
