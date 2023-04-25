import { r as registerInstance, j as h, k as getElement } from './index-86ac49ff.js';
import './ionic-global-0f98fe97.js';
import './webapi-79a1d3db.js';
import { s as sql, u as util } from './conftoken-7e3c18eb.js';
import { j as jquery } from './jquery-5df58adb.js';
import './utils-16079bfd.js';
import './helpers-719f4c54.js';
import './animation-10ea33c3.js';
import './index-7173f7a2.js';
import './ios.transition-95375ac9.js';
import './md.transition-6d74e584.js';
import './cubic-bezier-93f47170.js';
import './index-7fe827c3.js';
import './index-b40d441b.js';
import './hardware-back-button-aacf3d12.js';
import './index-50651ccc.js';
import { m as modalController } from './overlays-5302658e.js';
import { p as parser } from './parser-8aed96de.js';

const flxDbcomboCss = "flx-dbcombo{width:100%}flx-dbcombo ion-input{width:calc(100% - 60px);max-width:calc(100% - 60px);float:left;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}flx-dbcombo[clearbutton=\"false\"] ion-input{width:100%;max-width:100%;float:left}flx-dbcombo ion-button{width:30px;float:right}flx-dbcombo ion-button.ios{--padding-start:0px;--padding-end:0px}";

const FlxDbcombo = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.disabled = false;
        this.clearbutton = true;
        this.table = [];
    }
    componentWillLoad() {
        this.load(true);
    }
    sqlsentenceHandler() {
        this.load(false);
    }
    sqlfilterHandler() {
        this.load(false);
    }
    additionalHandler() {
        this.load(false);
    }
    filterlHandler() {
        this.load(false);
    }
    async open() {
        this.showItems();
    }
    async refresh() {
        return this.load(true);
    }
    valueHandler() {
        this.load(false);
        jquery(this.me).trigger('change');
    }
    load(firstTime) {
        if (this.sqlsentence) {
            const isNew = (window.location.href.toLowerCase().indexOf('/filter/') === -1 ? true : false);
            if (jquery(this.me).find('.comboTemplate').length > 0) {
                this.template = `<ion-item lines="full" onclick="$(document).trigger('select', ['{{${this.valuefield}|JS}}','{{${this.displayfield}|HTMLATTR}}']);">${jquery('<div>' + jquery(this.me).find('.comboTemplate').html() + '</div>').html()}</ion-item>`;
            }
            else {
                this.template = `<ion-item lines="full" onclick="$(document).trigger('select', ['{{${this.valuefield}|JS}}','{{${this.displayfield}|HTMLATTR}}']);"><ion-label>{{${this.displayfield}}}</ion-label></ion-item>`;
            }
            let autoselectLower = (this.autoselect ? this.autoselect.toLowerCase() : null);
            //Si la combo tiene valor calculamos su texto.
            let sentence = sql.addWhere(this.sqlsentence, this.filter);
            sentence = sql.addWhere(sentence, this.additional);
            if (this.value != null && this.value != "") {
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
            else {
                //Si no tiene valor pero hay un autoselect, calculamos su valor y su texto.
                if (((autoselectLower === "always") || (autoselectLower === "true" && isNew)) && firstTime) {
                    sql.getTable(sentence).then((tbl) => {
                        if (tbl.rows.length === 1) {
                            const row = sql.getRow(tbl, 0);
                            this.text = row[this.displayfield];
                            this.value = row[this.valuefield];
                        }
                    });
                }
                else if (this.value === '') {
                    //Si no tiene valor forzamos que el texto sea nulo para que la combo se vea vacia.
                    this.text = null;
                }
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
        jquery(document).off('select').on('select', (_ev, value, text) => {
            if (typeof this.value != 'undefined' && this.value != null) {
                jquery(this.me).closest('ion-item').addClass('item-has-value');
            }
            this.value = value;
            this.text = text;
            modal.dismiss();
            jquery(document).off('select');
            jquery(document).off('cancelSelect');
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
            return ([h("ion-input", { disabled: this.disabled, type: "text", readonly: true, value: this.text, onClick: () => { !this.disabled ? this.showItems() : null; } })]);
        }
        else {
            return ([h("ion-input", { disabled: this.disabled, type: "text", readonly: true, value: this.text, onClick: () => { !this.disabled ? this.showItems() : null; } }),
                h("ion-button", { disabled: this.disabled, onClick: () => { this.value = ''; this.text = null; jquery(this.me).trigger('change'); }, shape: "round", slot: "end", color: "light" }, "x")
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
