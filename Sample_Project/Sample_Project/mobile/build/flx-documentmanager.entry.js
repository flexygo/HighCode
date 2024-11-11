import { r as registerInstance, k as h } from './index-8e5b11cb.js';
import { j as jquery } from './jquery-34624bb9.js';
import { k as flxSync, C as ConftokenProvider, s as sql, u as util, m as msg, n as nav } from './conftoken-89472368.js';
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

const flxDocumentmanagerCss = "flx-documentmanager{}";

const FlxDocumentmanager = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.object = undefined;
    this.objectid = undefined;
    this.defaults = undefined;
    this.categoryId = undefined;
  }
  componentDidLoad() {
    jquery('#loadingSpinnerModule').css('visibility', 'hidden');
    flxSync.checkSendErrors();
  }
  async componentWillLoad() {
    jquery('#loadingSpinnerModule').css('visibility', 'visible');
    this.objConf = (await ConftokenProvider.config()).objectConfig[this.object];
    this.objectGUID = await sql.getValue('select _rowguid from `' + this.objConf.tableName + '` where `' + this.objConf.documentConfig.objectPK + '`=?', [this.objectid]);
    this.defaults = (this.defaults) ? decodeURIComponent(this.defaults) : null;
    let def = null;
    if (this.defaults) {
      def = util.parseJSON(this.defaults);
      if (def.CategoryId != undefined) {
        this.categoryId = def.CategoryId;
      }
    }
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
        let doc = { "DocGuid": util.GUID(), "ObjectName": this.object, "ObjectId": this.objectid, "ObjectGUID": this.objectGUID, "Name": files[i].name, "Description": null, "CategoryId": (this.categoryId ? this.categoryId : (this.objConf.documentConfig.defaultCategoryId ? this.objConf.documentConfig.defaultCategoryId : 'sysdoc-generic')), "URL": null, "B64": null, "CreationDate": util.currentDateTime(), "_isInserted": 1 };
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
      h("ion-header", null, h("ion-toolbar", { color: "header", class: "ion-text-center" }, h("ion-buttons", { slot: "start" }, h("ion-menu-button", { color: "outstanding" }), h("ion-icon", { name: "alert-circle", color: "danger", class: "stack sendError flx-hide" })), h("ion-buttons", { slot: "end" }, h("ion-button", { color: "outstanding", onClick: () => { nav.goBack(); } }, h("ion-icon", { slot: "icon-only", name: "arrow-undo-outline" }))), h("ion-title", null, h("span", { id: "menuTitle" }, util.translate('document.title'))))),
      h("ion-content", null, h("ion-refresher", { slot: "fixed", id: "refresher", onIonRefresh: (ev) => { this.refresh(ev); } }, h("ion-refresher-content", { "pulling-icon": "chevron-down-circle-outline", refreshingSpinner: "bubbles" })), h("flx-documentgallery", { object: this.object, filter: 'ObjectName=\'' + this.object + '\' and ObjectId=\'' + this.objectid + '\'' + (this.categoryId == null ? '' : ' and CategoryId=\'' + this.categoryId + '\'') }), h("input", { id: "file-input", onChange: (ev) => { this.uploadDocument(ev); }, type: "file", multiple: true, style: { "display": "none" } })),
      h("ion-fab", { vertical: "bottom", horizontal: "end", slot: "fixed" }, h("ion-fab-button", { onClick: () => { jquery('#file-input').trigger('click'); } }, h("ion-icon", { name: "document" })))
    ];
  }
};
FlxDocumentmanager.style = flxDocumentmanagerCss;

export { FlxDocumentmanager as flx_documentmanager };
