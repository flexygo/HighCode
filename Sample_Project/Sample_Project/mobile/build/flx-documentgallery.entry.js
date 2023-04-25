import { r as registerInstance, j as h } from './index-86ac49ff.js';
import './ionic-global-0f98fe97.js';
import { W as Webapi, b as storage } from './webapi-79a1d3db.js';
import { s as sql, u as util, m as msg, L as LocalNotifications, F as FileOpener, C as ConftokenProvider } from './conftoken-7e3c18eb.js';
import './jquery-5df58adb.js';
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
import './overlays-5302658e.js';

const flxDocumentgalleryCss = "ion-grid{padding:0}.file{font-size:50px!important}.textFile{width:90px;overflow:hidden;text-overflow:ellipsis;display:block;white-space:nowrap;margin:0 auto}.center{position:absolute;display:grid;place-items:center;width:100%;height:100%}.noResults{text-align:center;display:flex;flex-direction:column;align-items:center;font-size:3em;color:#7d7d7d61}.document:hover{background-color:#23383e47;border-radius:10px;color:white}.document{width:100px;padding:10px}.centerItems{display:grid;justify-content:center}";

const FlxDocumentgallery = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.id = 0;
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
    msgEdit(index) {
        const docu = this.table[index];
        const alert = document.createElement('ion-alert');
        alert.header = util.translate('document.msgEdit');
        alert.inputs = [
            {
                placeholder: util.translate('document.description'),
                name: 'description',
                type: 'text',
                value: docu.Description
            }
        ];
        alert.buttons = [
            {
                text: util.translate('msg.ok'),
                handler: (data) => {
                    sql.execSQL('UPDATE flxDocuments SET Description = ? WHERE DocGuid = ?;', [data.description, docu.DocGuid]);
                    docu.Description = data.description;
                    msg.success(util.translate('document.msgEditSuccess'));
                }
            }, {
                text: util.translate('msg.cancel'),
                role: 'cancel',
                cssClass: 'secondary',
            }
        ];
        document.body.appendChild(alert);
        alert.present();
    }
    async getFullUrl(url) {
        let api = new Webapi();
        let token = await api.connect();
        if (url.startsWith("~")) {
            let token = await storage.get("flexyAuth");
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
