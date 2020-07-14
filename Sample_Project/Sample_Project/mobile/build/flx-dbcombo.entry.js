import { r as registerInstance, h, d as getElement } from './index-1ad46950.js';
import './ionic-global-d77af0d9.js';
import { s as sql, u as util } from './messages-65fb7542.js';
import './utils-30f0564d.js';
import './index-fb0d54fa.js';
import './helpers-d94a0dba.js';
import './animation-6c25f42e.js';
import './index-0cbc1957.js';
import './ios.transition-e8b1df9c.js';
import './md.transition-03140845.js';
import './cubic-bezier-92995175.js';
import './index-1da44cf3.js';
import './index-53f14fc6.js';
import './hardware-back-button-c2d005b0.js';
import './index-28dab2f8.js';
import { m as modalController } from './overlays-e769172f.js';
import { j as jquery } from './jquery-4ed57fb2.js';

const flxDbcomboCss = "flx-dbcombo{width:100%}flx-dbcombo ion-input{width:calc(100% - 60px);max-width:calc(100% - 60px);float:left}flx-dbcombo ion-button{width:30px;float:right}";

class FlxDbcombo {
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
    async open() {
        this.showItems();
    }
    valueHandler() {
        this.load();
    }
    load() {
        if (this.sqlsentence) {
            this.template = `<ion-item lines="full"><ion-label onclick="$(document).trigger('select', ['{{${this.valuefield}|JS}}','{{${this.displayfield}|JS}}']);">{{${this.displayfield}}}</ion-label></ion-item>`;
            if (this.value != null) {
                let sentence = sql.addWhere(this.sqlsentence, this.filter);
                sentence = sql.addWhere(sentence, this.additional);
                sentence = sql.addWhere(sentence, `\`${this.valuefield}\`=?`);
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
        await modal.present();
        jquery(modal).find('.ion-page').html(component);
        let list = document.createElement('flx-sqllist');
        let sentence = sql.addWhere(this.sqlsentence, this.filter);
        sentence = sql.addWhere(sentence, this.additional);
        list.setAttribute("sqlsentence", sentence);
        list.setAttribute("orderby", this.orderby);
        jquery(list).append(jquery('<script class="bodyTemplate" type="text/template"></script>').text(this.template));
        jquery(modal).find('.ion-page .placeholder').append(list);
        let mBar = jquery(modal).find('ion-searchbar');
        mBar.off('ionChange').on('ionChange', (ev) => {
            if (mBar.val()) {
                list.params = ['%' + mBar.val() + '%'];
                list.additional = `\`${this.displayfield}\` like ? `;
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
        return ([h("ion-input", { type: "text", readonly: true, value: this.text, onClick: () => { this.showItems(); } }),
            h("ion-button", { onClick: () => { this.value = null; this.text = null; }, shape: "round", slot: "end", color: "light" }, "x")
        ]);
    }
    get me() { return getElement(this); }
    static get watchers() { return {
        "sqlsentence": ["sqlsentenceHandler"],
        "additional": ["additionalHandler"],
        "filter": ["filterlHandler"],
        "value": ["valueHandler"]
    }; }
}
FlxDbcombo.style = flxDbcomboCss;

export { FlxDbcombo as flx_dbcombo };
