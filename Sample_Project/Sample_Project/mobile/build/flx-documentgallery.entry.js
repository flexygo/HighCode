import { r as registerInstance, k as h } from './index-8e5b11cb.js';
import { s as sql, u as util, m as msg, L as LocalNotifications, F as FileOpener, C as ConftokenProvider, W as Webapi } from './conftoken-89472368.js';
import { j as jquery } from './jquery-34624bb9.js';
import './jquery-validate-flexygo-b272e167.js';
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

const flxDocumentgalleryCss = "ion-grid{padding:0}.file{font-size:50px!important}.textFile{width:90px;overflow:hidden;text-overflow:ellipsis;display:block;white-space:nowrap;margin:0 auto}.center{position:absolute;display:grid;place-items:center;width:100%;height:100%}.noResults{text-align:center;display:flex;flex-direction:column;align-items:center;font-size:3em;color:#7d7d7d61}.document:hover{background-color:#23383e47;border-radius:10px;color:white}.document{width:100px;padding:10px}.centerItems{display:grid;justify-content:center}";

const FlxDocumentgallery = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.id = 0;
    this.table = undefined;
    this.object = undefined;
    this.filter = undefined;
  }
  refresh() {
    return this.loadData();
  }
  async addDocument(row) {
    this.table = [...this.table, row];
    return;
  }
  componentWillLoad() {
    this.load();
  }
  load() {
    this.object = (this.object) ? decodeURIComponent(this.object) : null;
    return this.loadData();
  }
  loadData() {
    this.table = [];
    let sentence = 'select * from flxDocuments';
    if (this.filter) {
      sentence = sql.addWhere(sentence, this.filter);
    }
    sentence = sql.addWhere(sentence, '_isDeleted=0');
    sentence += ' order by CreationDate';
    return sql.getTable(sentence).then((table) => {
      let arr = [];
      for (let i = 0; i < table.rows.length; i++) {
        arr.push(sql.getRow(table, i));
      }
      this.table = arr;
    });
  }
  async downloadDoc(index) {
    let fileName = this.table[index].Name;
    if (this.table[index].B64) {
      if (window.cordova) {
        let dataBase64 = this.table[index].B64.substring(this.table[index].B64.indexOf(',') + 1);
        util.downloadByB64Phone(dataBase64, fileName)
          .then(async (uri) => {
          this.documentDownloadNotification(uri, util.getB64MIME(dataBase64), fileName);
        })
          .catch(() => msg.danger(util.translate('document.errDownload')));
      }
      else {
        util.downloadByB64Navigator(this.table[index].B64, fileName);
      }
    }
    else if (this.table[index].URL) {
      let url = await this.getFullUrl(this.table[index].URL);
      if (window.cordova) {
        util.downloadByUrlPhone(url, fileName)
          .then(async (uri) => {
          this.documentDownloadNotification(uri, util.getMIMEtype(fileName), fileName);
        })
          .catch(() => msg.danger(util.translate('document.errDownload')));
      }
      else {
        util.downloadByUrlNavigator(url, fileName);
      }
    }
  }
  async documentDownloadNotification(uri, mime, fileName) {
    const options = {
      id: (await LocalNotifications.getDeliveredNotifications()).notifications.length,
      title: util.translate('document.downloadedNoti').replace('%', fileName),
      body: util.translate('document.downloadedNoti').replace('%', fileName),
      attachments: [uri]
    };
    LocalNotifications.schedule({ notifications: [options] });
    LocalNotifications.addListener('localNotificationActionPerformed', () => {
      try {
        let foOptions = { filePath: uri, contentType: mime };
        FileOpener.open(foOptions);
      }
      catch (err) {
        msg.showError(err);
      }
    });
    msg.generic(util.translate('document.downloaded'), 'success', 1600);
  }
  getIcon(name) {
    try {
      let extension = name.substring(name.lastIndexOf('.')).toLocaleLowerCase();
      switch (extension) {
        case '.rar':
          return 'fa fa-file-archive-o';
        case '.mp3':
          return 'fa fa-file-audio-o';
        case '.cs':
        case '.css':
        case '.html':
        case '.js':
        case '.json':
        case '.less':
        case '.sql':
        case '.ts':
        case '.vb':
        case '.xml':
        case '.xsl':
        case '.xslt':
          return 'fa fa-file-code-o';
        case '.spread':
        case '.xls':
        case '.xlsx':
          return 'fa fa-file-excel-o';
        case '.gif':
        case '.ico':
        case '.jpeg':
        case '.jpg':
        case '.png':
        case '.tif':
        case '.tiff':
          return 'fa fa-file-image-o';
        case '.pdf':
          return 'fa fa-file-pdf-o';
        case '.ppt':
        case '.pptx':
          return 'fa fa-file-powerpoint-o';
        case '.txt':
          return 'fa fa-file-text-o';
        case '.avi':
        case '.mp4':
          return 'fa fa-file-video-o';
        case '.doc':
        case '.docx':
          return 'fa fa-file-word-o';
        case '.zip':
          return 'fa fa-file-zip-o';
        case '.folder':
          return 'fa fa-folder-o';
        default:
          return 'fa fa-file-o';
      }
    }
    catch (e) {
      return 'fa fa-file-o';
    }
  }
  async deleteDocument(index) {
    if (this.table[index]._isInserted == 1) {
      let sentence = 'delete from flxDocuments Where DocGuid = \'' + this.table[index].DocGuid + '\'';
      return sql.execSQL(sentence).then(() => { msg.success(util.translate('msg.deleted')); this.refresh(); }).catch(err => { throw err; });
    }
    else {
      const objConf = (await ConftokenProvider.config()).objectConfig[this.object];
      if (objConf.documentConfig.typeId !== "ahoraerp") {
        let sentence = 'update flxDocuments set _isDeleted=1 Where DocGuid = \'' + this.table[index].DocGuid + '\'';
        return sql.execSQL(sentence).then(() => { msg.success(util.translate('msg.deleted')); this.refresh(); }).catch(err => { throw err; });
      }
      else {
        return msg.warning(util.translate('image.warning'));
      }
    }
  }
  optionsGalery(doc) {
    let actionSheet = document.createElement('ion-action-sheet');
    actionSheet.header = this.table[doc].Name;
    actionSheet.subHeader = this.table[doc].Description;
    actionSheet.mode = 'ios';
    actionSheet.buttons = [{
        text: util.translate('document.download'),
        handler: () => {
          this.downloadDoc(doc);
        }
      }];
    if (!this.table[doc].URL) {
      actionSheet.buttons.push({
        text: util.translate('document.edit'),
        handler: async () => {
          this.msgEdit(doc);
        }
      });
    }
    actionSheet.buttons.push({
      text: util.translate('document.delete'),
      role: 'destructive',
      handler: () => {
        msg.confirm(util.translate('document.delete'), util.translate('document.msg')).then(async () => { this.deleteDocument(doc); });
      }
    });
    document.body.appendChild(actionSheet);
    return actionSheet.present();
  }
  async msgEdit(index) {
    const document_data = this.table[index];
    let content = jquery(`<div class="wrapper">
                            <h1>${util.translate('document.msgEdit')}</h1>
                            <form class="form" novalidate="novalidate">
                                <ion-list>
                               <ion-item>
                                    <ion-label color="header" position="floating">${util.translate('document.description')}</ion-label>
                                    <ion-input value="${document_data.Descrip ? document_data.Descrip : ""}" name="Descrip" property="Descrip" ></ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-label color="header" position="floating">${util.translate('document.category')}</ion-label>
                                    <flx-dbcombo container="body" class="input hydrated" value="${document_data.CategoryId}" name="CategoryId" property="CategoryId" required="true" valuefield="CategoryId" displayfield="Category" orderby="Category asc" sqlsentence="select CategoryId, Category from flxDocumentCategories" clearbutton=""></flx-dbcombo>
                                </ion-item>
                            </ion-list>
                            </form>
                            <ion-toolbar>
                                <ion-buttons slot="end">
                                    <ion-button id="saveButton" onclick="$(document).trigger('saveEdit');" color="primary">${util.translate('msg.ok')}</ion-button>
                                    <ion-button id="cancelButton" onclick="$(document).trigger('cancelEdit');" color="primary">${util.translate('msg.cancel')}</ion-button>
                                </ion-buttons>
                            </ion-toolbar>
                        </div>`);
    content.find('form').validate({
      ignore: '',
      unhighlight: (element, _errorClass, _validClass) => {
        jquery(element).parent().addClass('has-success').removeClass('has-error');
      },
      highlight: (element, _errorClass, _validClass) => {
        jquery(element).parent().removeClass('has-success').addClass('has-error');
      },
      errorPlacement: (error, element) => {
        if (jquery(element).closest('flx-radio').length > 0) {
          error.css("display", 'block');
          error.insertAfter(jquery(element).parent().parent()[0]);
        }
        else {
          error.insertAfter(jquery(element).parent()[0]);
        }
      },
      errorClass: 'error'
    });
    const modalElement = await modalController.create({
      component: content[0],
      backdropDismiss: false,
      cssClass: "editImage"
    });
    jquery(document).off('saveEdit').on('saveEdit', (_evm) => {
      if (jquery(modalElement).find('form').valid()) {
        let properties = {};
        jquery(modalElement).find('form [property]').each(function () {
          let key = jquery(this).attr('property');
          let value = jquery(this).val();
          properties[key] = value;
        });
        sql.execSQL('UPDATE flxDocuments SET Description = ?,CategoryId = ? WHERE DocGuid = ?;', [properties["Descrip"], properties["CategoryId"], document_data.DocGuid]);
        document_data.Description = properties["Descrip"];
        document_data.CategoryId = properties["CategoryId"];
        msg.success(util.translate('document.msgEditSuccess'));
        modalElement.dismiss();
        jquery(document).off('saveEdit');
      }
    });
    jquery(document).off('cancelEdit').on('cancelEdit', (_ev) => {
      modalElement.dismiss();
      jquery(document).off('cancelEdit');
    });
    document.body.appendChild(modalElement);
    modalElement.present();
  }
  async getFullUrl(url) {
    let api = new Webapi();
    let token = await api.connect();
    if (url.startsWith("~")) {
      let token = await api.getAuth();
      url = token.url + url.substring(1);
    }
    return url + '&access_token=' + token.bearerToken;
  }
  render() {
    return ([
      h("ion-grid", null, h("ion-row", null, (this.table.length > 0 ? (this.table.map((row, i) => {
        return h("ion-col", { class: "ion-text-center centerItems" }, h("div", { class: "document", onClick: () => { this.optionsGalery(i); } }, h("div", { style: { 'margin-bottom': '10px' } }, h("i", { class: 'file ' + this.getIcon(row.Name) })), h("span", { class: "textFile" }, row.Name)));
      })) :
        h("div", { class: "center" }, h("div", { class: "noResults" }, h("i", { class: "flx-icon icon-document" }), util.translate('list.noresults'))))))
    ]);
  }
};
FlxDocumentgallery.style = flxDocumentgalleryCss;

export { FlxDocumentgallery as flx_documentgallery };
