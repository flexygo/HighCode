import { r as registerInstance, j as h } from './index-86ac49ff.js';
import './ionic-global-0f98fe97.js';
import { W as Webapi, b as storage } from './webapi-7959a2b6.js';
import { s as sql, u as util, m as msg, F as FileOpener, L as LocalNotifications, C as ConftokenProvider } from './conftoken-bd0cce07.js';
import { j as jquery } from './jquery-ad132f97.js';
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

const flxImagegalleryCss = "ion-thumbnail{--size:150px;display:inline-block}ion-grid{padding:0}.modalFullscreen .modal-wrapper{--width:100%;--height:100%}.swiper-container{height:100%;background-color:rgba(0, 0, 0, 0.75)}.slide{display:flex;flex-direction:column;justify-content:center;background-repeat:no-repeat;background-size:contain;width:100%;height:100%;background-position:center center}.image-text{position:absolute;right:0px;bottom:30px;left:0px;background:rgba(0, 0, 0, 0.75);padding:4px 8px;color:white;margin:0;font:14px Sans-Serif}.loading{background:transparent url(./assets/img/loading.gif) no-repeat center center;background-size:40px 40px}.center{position:absolute;display:grid;place-items:center;width:100%;height:100%}.noResults{text-align:center;display:flex;flex-direction:column;align-items:center;font-size:3em;color:#7d7d7d61}ion-fab{z-index:99}ion-slides{z-index:1}ion-fab[vertical=\"top\"]{margin-top:constant(safe-area-inset-top);margin-top:env(safe-area-inset-top)}";

const FlxImagegallery = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    refresh() {
        return this.loadData();
    }
    async addImage(row) {
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
        let sentence = 'select * from flxImages';
        if (this.filter) {
            sentence = sql.addWhere(sentence, this.filter);
        }
        sentence = sql.addWhere(sentence, '_isDeleted=0');
        sentence += ' order by OrderNumber';
        return sql.selectTableInBlocks(sentence).then(async (table) => {
            let arr = [];
            for (let i = 0; i < table.rows.length; i++) {
                let row = sql.getRow(table, i);
                if (row.URL)
                    row.URL = await this.getFullUrl(row.URL);
                arr.push(row);
            }
            this.table = arr;
        });
    }
    async downloadImg(index) {
        let fileName = this.object + '_' + index + '.jpg';
        if (this.table[index].B64) {
            if (window.cordova) {
                let dataBase64 = this.table[index].B64.substring(this.table[index].B64.indexOf(',') + 1);
                util.downloadByB64Phone(dataBase64, fileName)
                    .then(async (uri) => {
                    this.imageDownloadNotification(uri, fileName);
                })
                    .catch(() => msg.danger(util.translate('image.errDownload')));
            }
            else {
                util.downloadByUrlNavigator(this.table[index].B64, fileName);
            }
        }
        else if (this.table[index].URL) {
            if (window.cordova) {
                util.downloadByUrlPhone(this.table[index].URL, fileName)
                    .then(async (uri) => {
                    this.imageDownloadNotification(uri, fileName);
                })
                    .catch(() => msg.danger(util.translate('image.errDownload')));
            }
            else {
                util.downloadByUrlNavigator(this.table[index].URL, fileName);
            }
        }
    }
    async imageDownloadNotification(uri, fileName) {
        const fileOpener = new FileOpener;
        const notification = new LocalNotifications;
        const options = {
            id: (await notification.getAll()).length,
            text: util.translate('image.downloadedNoti').replace('%', fileName),
            attachments: [uri],
            foreground: true
        };
        notification.schedule(options);
        notification.on('click').subscribe((res) => {
            try {
                fileOpener.showOpenWithDialog(res.attachments[0], 'image/jpeg');
            }
            catch (err) {
                msg.showError(err);
            }
        });
        msg.generic(util.translate('image.downloaded'), 'success', 1600);
    }
    async deleteImg(index) {
        if (this.table[index]._isInserted == 1) {
            let sentence = 'delete from flxImages Where ImageId = \'' + this.table[index].ImageId + '\'';
            return sql.execSQL(sentence).then(() => { msg.success(util.translate('msg.deleted')); this.refresh(); jquery(document).find('ion-fab-button.close').click(); }).catch(err => { throw err; });
        }
        else {
            const objConf = (await ConftokenProvider.config()).objectConfig[this.object];
            if (objConf.imageConfig.typeId !== "ahoraerp") {
                let sentence = 'update flxImages set _isDeleted=1 Where ImageId = \'' + this.table[index].ImageId + '\'';
                return sql.execSQL(sentence).then(() => { msg.success(util.translate('msg.deleted')); this.refresh(); jquery(document).find('ion-fab-button.close').click(); }).catch(err => { throw err; });
            }
            else {
                return msg.warning(util.translate('image.warning'));
            }
        }
    }
    zoomGalery(currentSlide) {
        let contentStr = `
            <ion-content fullscreen scroll-y="false">
                <ion-fab vertical="top" horizontal="start" slot="fixed">
                    <div class="hideOnClick">
                        <ion-fab-button class="download">
                            <ion-icon name="download"></ion-icon>
                        </ion-fab-button>
                        <ion-fab-button color="warning" class="edit ion-margin-top" id="editButton" ${this.table[currentSlide].URL ? 'style="display:none;"' : ''}>
                            <ion-icon name="pencil" color="white"></ion-icon>
                        </ion-fab-button>
                        <ion-fab-button color="danger" class="delete ion-margin-top" id="deleteButton">
                            <ion-icon name="trash"></ion-icon>
                        </ion-fab-button>
                    </div>
                </ion-fab>
                <ion-fab vertical="top" horizontal="end" slot="fixed">
                    <ion-fab-button class="close hideOnClick">
                        <ion-icon name="close"></ion-icon>
                    </ion-fab-button>
                </ion-fab>
            </ion-content>`;
        let content = jquery(contentStr)[0];
        let slider = document.createElement('ion-slides');
        slider.pager = true;
        slider.options = {
            initialSlide: currentSlide,
            on: {
                activeIndexChange: async () => {
                    this.isOnlineImage((this.table[await slider.getActiveIndex()].B64 ? false : true));
                }
            }
        };
        content.append(slider);
        for (let i = 0; i < this.table.length; i++) {
            let row = this.table[i];
            slider.innerHTML += `
                <ion-slide>
                    <div class="slide">
                        <img loading="lazy" id="${i + 'slide'}" style="width: 100%;" class="slideImage loading" src="${(row.URL ? row.URL : row.B64)}"  onerror="() => {let interval = setInterval(() => if (document.getElementById('${i + 'slide'}').length === 1) {document.getElementById('${i + 'slide'}').setAttribute('src', './assets/img/noWifi.png'), 3000); clearInterval(interval)}, 100};"/>
                        <div class="image-text hideOnClick">
                            <h2>${(row.Name ? row.Name : '')}</h2>
                            <p id="imgDesc${this.table[i].ImageId}">${(row.Descrip ? row.Descrip : '')}</p>
                        </div>
                    </div>
                </ion-slide>`;
        }
        const modalElement = document.createElement('ion-modal');
        modalElement.component = content;
        modalElement.showBackdrop = false;
        modalElement.cssClass = 'modalFullscreen';
        jquery(content).find('ion-slides').on('click', () => {
            jquery(content).find('.hideOnClick').fadeToggle(350);
            jquery(content).find('.swiper-pagination.swiper-pagination-bullets').fadeToggle(350);
        });
        jquery(content).find('ion-fab-button.close').on('click', () => { modalElement.dismiss(); });
        jquery(content).find('ion-fab-button.edit').on('click', async () => { this.msgEdit(await slider.getActiveIndex()); });
        jquery(content).find('ion-fab-button.download').on('click', async () => {
            this.downloadImg(await slider.getActiveIndex());
        });
        jquery(content).find('ion-fab-button.delete').on('click', async () => {
            msg.confirm(util.translate('image.delete'), util.translate('image.msg')).then(async () => { this.deleteImg(await slider.getActiveIndex()); });
        });
        document.body.appendChild(modalElement);
        return modalElement.present();
    }
    isOnlineImage(online) {
        const editBtn = document.getElementById("editButton");
        editBtn.style.display = (online ? "none" : "block");
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
                value: docu.Descrip
            }
        ];
        alert.buttons = [
            {
                text: util.translate('msg.ok'),
                handler: (data) => {
                    sql.execSQL('UPDATE flxImages SET Descrip = ? WHERE ImageId = ?;', [data.description, docu.ImageId]);
                    docu.Descrip = data.description;
                    document.getElementById(`imgDesc${docu.ImageId}`).innerHTML = docu.Descrip;
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
                return h("ion-col", { class: "ion-text-center" }, h("ion-thumbnail", { class: "container", onClick: () => { this.zoomGalery(i); } }, h("img", { loading: "lazy", class: "img-wrapper loading", src: (row.URL ? row.URL : row.B64), id: i.toString(), onError: () => document.getElementById(i.toString()).setAttribute("src", "./assets/img/noWifi.png") })));
            })) :
                h("div", { class: "center" }, h("div", { class: "noResults" }, h("i", { class: "fa fa-image" }), util.translate('list.noresults'))))))
        ]);
    }
};
FlxImagegallery.style = flxImagegalleryCss;

export { FlxImagegallery as flx_imagegallery };
