import { r as registerInstance, j as h, k as getElement } from './index-76f52202.js';
import './ionic-global-53d785f3.js';
import { s as sql, u as util } from './messages-1e55a1f4.js';
import { j as jquery } from './jquery-4ed57fb2.js';
import './utils-30827fbd.js';
import './index-38aae3ff.js';
import './helpers-742de4f9.js';
import './animation-a90ce8fc.js';
import './index-a6178d25.js';
import './ios.transition-bfe5eada.js';
import './md.transition-e49d1536.js';
import './cubic-bezier-89113939.js';
import './index-9b41fcc6.js';
import './index-86d5f3ab.js';
import './hardware-back-button-b3b61715.js';
import './index-c940ddb6.js';
import { m as modalController } from './overlays-3fb58ad8.js';
import { p as parser } from './parser-8fd0ea5d.js';

const flxDbcomboCss = "flx-dbcombo{width:100%}flx-dbcombo ion-input{width:calc(100% - 60px);max-width:calc(100% - 60px);float:left;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}flx-dbcombo[clearbutton=\"false\"] ion-input{width:100%;max-width:100%;float:left}flx-dbcombo ion-button{width:30px;float:right}flx-dbcombo ion-button.ios{--padding-start:0px;--padding-end:0px}";

const FlxDbcombo = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.clearbutton = true;
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
        this.load();
    }
    load() {
        if (this.sqlsentence) {
            if (jquery(this.me).find('.comboTemplate').length > 0) {
                this.template = `<ion-item lines="full" onclick="$(document).trigger('select', ['{{${this.valuefield}|JS}}','{{${this.displayfield}|JS}}']);">${jquery('<div>' + jquery(this.me).find('.comboTemplate').html() + '</div>').html()}</ion-item>`;
            }
            else {
                this.template = `<ion-item lines="full"><ion-label onclick="$(document).trigger('select', ['{{${this.valuefield}|JS}}','{{${this.displayfield}|JS}}']);">{{${this.displayfield}}}</ion-label></ion-item>`;
            }
            if (this.value != null) {
                let sentence = sql.addWhere(this.sqlsentence, this.filter);
                sentence = sql.addWhere(sentence, this.additional);
                if (this.tablename != null) {
                    sentence = sql.addWhere(sentence, `\`${this.tablename}\`.\`${this.valuefield}\`=?`);
                }
                else {
                    sentence = sql.addWhere(sentence, `\`${this.valuefield}\`=?`);
                }
                sql.getTable(sentence, [this.value]).then((tbl) => {
                    if (tbl.rows.length > 0) {
                        this.text = sql.getRow(tbl, 0)[this.displayfield];
                    }
                    else {
                        this.text = this.value;
                    }
                });
            }
        }
    }
    async showItems() {
        let component = `
        <ion-fab vertical="top" horizontal="end" slot="fixed">
            <ion-fab-button color="dark" onclick="$(document).trigger('cancelSelect');">
                <ion-icon name="close"></ion-icon>
            </ion-fab-button>
        </ion-fab>
        <ion-content class="placeholder">
            <ion-header>
                <ion-searchbar cancel-button-text="${util.translate('msg.cancel')}" placeholder="${util.translate('list.search')}" mode="ios" autocomplete="off" animated="true" ></ion-searchbar>
            </ion-header>
        </ion-content>
        `;
        const modal = await modalController.create({
            component: 'ion-content'
        });
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
                    list.additional = parser.replaceAll(this.sqlfilter, '@FindString', '\'%' + mBar.val() + '%\'');
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
        jquery(document).off('select').on('select', (_ev, value, text) => {
            if (typeof this.value != 'undefined' && this.value != null) {
                jquery(this.me).closest('ion-item').addClass('item-has-value');
            }
            this.value = value;
            this.text = text;
            modal.dismiss();
            jquery(document).off('select');
            jquery(document).off('cancelSelect');
            jquery(this.me).trigger('change');
        });
        jquery(document).off('cancelSelect').on('cancelSelect', (_ev) => {
            modal.dismiss();
            jquery(document).off('select');
            jquery(document).off('cancelSelect');
        });
    }
    render() {
        if (this.clearbutton == false) {
            return ([h("ion-input", { type: "text", readonly: true, value: this.text, onClick: () => { this.showItems(); } })]);
        }
        else {
            return ([h("ion-input", { type: "text", readonly: true, value: this.text, onClick: () => { this.showItems(); } }),
                h("ion-button", { onClick: () => { this.value = null; this.text = null; jquery(this.me).trigger('change'); }, shape: "round", slot: "end", color: "light" }, "x")
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
FlxDbcombo.style = flxDbcomboCss;

export { FlxDbcombo as flx_dbcombo };
