import { r as registerInstance, h, d as getElement } from './index-1ad46950.js';
import './ionic-global-08321e45.js';
import { s as sql, u as util } from './messages-856fd5dd.js';
import './utils-ae5eb377.js';
import './index-9a467e52.js';
import './helpers-742de4f9.js';
import './animation-a90ce8fc.js';
import './index-59819519.js';
import './ios.transition-f27c75b3.js';
import './md.transition-0550681d.js';
import './cubic-bezier-89113939.js';
import './index-9b41fcc6.js';
import './index-86d5f3ab.js';
import './hardware-back-button-b3b61715.js';
import './index-626f3745.js';
import { m as modalController } from './overlays-af382aca.js';
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
            if (jquery(this.me).find('.comboTemplate').length > 0) {
                this.template = `<ion-item lines="full" onclick="$(document).trigger('select', ['{{${this.valuefield}|JS}}','{{${this.displayfield}|JS}}']);">${jquery(this.me).find('.comboTemplate').html()}</ion-item>`;
            }
            else {
                this.template = `<ion-item lines="full"><ion-label onclick="$(document).trigger('select', ['{{${this.valuefield}|JS}}','{{${this.displayfield}|JS}}']);">{{${this.displayfield}}}</ion-label></ion-item>`;
            }
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
