import { r as registerInstance, h } from './index-1ad46950.js';
import './ionic-global-d77af0d9.js';
import { C as ConftokenProvider, s as sql, m as msg, u as util } from './messages-65fb7542.js';
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
import './overlays-e769172f.js';
import { j as jquery } from './jquery-4ed57fb2.js';
import { n as nav } from './navigation-538e1aae.js';

const flxDocumentmanagerCss = "flx-documentmanager{}";

class FlxDocumentmanager {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    async componentWillLoad() {
        this.objConf = (await ConftokenProvider.config()).objectConfig[this.object];
        this.objectGUID = await sql.getValue('select _rowguid from `' + this.objConf.tableName + '` where `' + this.objConf.documentConfig.objectPK + '`=?', [this.objectid]);
    }
    async refresh(ev) {
        let imgs = document.querySelector('flx-documentgallery');
        return imgs.refresh().then(() => { ev.target.complete(); });
    }
    uploadDocument(ev) {
        let files = ev.currentTarget.files;
        for (let i = 0; i < files.length; i++) {
            if ((files[i].size / 1024 / 1024) > 10) {
                msg.danger('File ' + files[i].name + ' exceeds 10MB maxium size.');
            }
            else {
                let doc = { "DocGuid": util.GUID(), "ObjectName": this.object, "ObjectId": this.objectid, "ObjectGUID": this.objectGUID, "Name": files[i].name, "Description": null, "CategoryId": this.objConf.documentConfig.defaultCategoryId, "URL": null, "B64": null, "CreationDate": util.currentDateTime() };
                this.saveDocument(files[i], doc);
            }
        }
    }
    saveDocument(file, doc) {
        let mRead = new FileReader();
        mRead.onloadend = (event) => {
            doc.B64 = event.target.result;
            let tableName = 'flxDocuments';
            let values = [];
            let fields = [];
            for (let key in doc) {
                fields.push(key);
                values.push(doc[key]);
            }
            fields.push('_isInserted');
            values.push(1);
            fields.push('_insertDate');
            values.push(util.currentDateTime());
            fields.push('_rowguid');
            values.push(util.GUID());
            let InserScript = sql.getInsertScript(tableName, fields);
            return sql.execSQL(InserScript, values).then(() => {
                let docs = document.querySelector('flx-documentgallery');
                docs.addDocument(doc);
            }).catch(err => { msg.showError(err); });
        };
        mRead.readAsDataURL(file);
    }
    render() {
        return [
            h("ion-header", null, h("ion-toolbar", { color: "header", class: "ion-text-center" }, h("ion-buttons", { slot: "start" }, h("ion-menu-button", { color: "outstanding" })), h("ion-buttons", { slot: "end" }, h("ion-button", { color: "outstanding", onClick: () => { nav.goBack(); } }, h("ion-icon", { slot: "icon-only", name: "arrow-undo-outline" }))), h("ion-title", null, h("span", { id: "menuTitle" }, "Documents")))),
            h("ion-content", null, h("ion-refresher", { slot: "fixed", id: "refresher", onIonRefresh: (ev) => { this.refresh(ev); } }, h("ion-refresher-content", { "pulling-icon": "chevron-down-circle-outline", refreshingSpinner: "bubbles" })), h("flx-documentgallery", { object: this.object, filter: 'ObjectName=\'' + this.object + '\' and ObjectId=\'' + this.objectid + '\'' }), h("input", { id: "file-input", onChange: (ev) => { this.uploadDocument(ev); }, type: "file", multiple: true, style: { "display": "none" } })),
            h("ion-fab", { vertical: "bottom", horizontal: "end", slot: "fixed" }, h("ion-fab-button", { onClick: () => { jquery('#file-input').trigger('click'); } }, h("ion-icon", { name: "document" })))
        ];
    }
}
FlxDocumentmanager.style = flxDocumentmanagerCss;

export { FlxDocumentmanager as flx_documentmanager };
