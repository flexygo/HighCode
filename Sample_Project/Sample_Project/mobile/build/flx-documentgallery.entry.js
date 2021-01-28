import { r as registerInstance, j as h } from './index-76f52202.js';
import { s as sql, m as msg, u as util } from './messages-50a67881.js';
import './jquery-4ed57fb2.js';

const flxDocumentgalleryCss = ".file{font-size:50px!important}.textFile{width:100px;overflow:hidden;text-overflow:ellipsis;display:block;white-space:nowrap;margin:0 auto}";

const FlxDocumentgallery = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        sentence += ' order by CreationDate';
        return sql.getTable(sentence).then((table) => {
            let arr = [];
            for (let i = 0; i < table.rows.length; i++) {
                arr.push(sql.getRow(table, i));
            }
            this.table = arr;
        });
    }
    downloadImg(index) {
        if (this.table[index].B64) {
            const downloadLink = document.createElement("a");
            downloadLink.href = this.table[index].B64;
            downloadLink.download = this.table[index].Name;
            downloadLink.click();
        }
        else {
            alert('TODO');
        }
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
    deleteDocument(index) {
        if (this.table[index]._isInserted == 1) {
            let sentence = 'delete from flxDocuments Where DocGuid = \'' + this.table[index].DocGuid + '\'';
            return sql.execSQL(sentence).then(() => { msg.success(util.translate('msg.deleted')); this.refresh(); }).catch(err => { throw err; });
        }
        else {
            return msg.warning(util.translate('document.warning'));
        }
    }
    optionsGalery(doc) {
        let actionSheet = document.createElement('ion-action-sheet');
        actionSheet.mode = 'ios';
        actionSheet.buttons = [{
                text: util.translate('document.download'),
                handler: () => {
                    this.downloadImg(doc);
                }
            }, {
                text: util.translate('document.delete'),
                role: 'destructive',
                handler: () => {
                    msg.confirm(util.translate('document.delete'), util.translate('document.msg')).then(async () => { this.deleteDocument(doc); });
                }
            }];
        document.body.appendChild(actionSheet);
        return actionSheet.present();
    }
    render() {
        return ([
            h("ion-grid", null, h("ion-row", null, (this.table.length > 0 ? (this.table.map((row, i) => {
                return h("ion-col", { class: "ion-text-center" }, h("div", { style: { 'margin-bottom': '10px' } }, h("i", { onClick: () => { this.optionsGalery(i); }, class: 'file ' + this.getIcon(row.Name) })), h("span", { class: "textFile" }, row.Name));
            })) : util.translate('list.noresults'))))
        ]);
    }
};
FlxDocumentgallery.style = flxDocumentgalleryCss;

export { FlxDocumentgallery as flx_documentgallery };
