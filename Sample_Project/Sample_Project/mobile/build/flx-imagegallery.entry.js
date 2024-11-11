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

var imageEdit_canvas;
var imageEdit_context;
var imgData;
var slideId;
var imageEdit;
(function (imageEdit) {
  async function init(imgTbl, id) {
    const editImageModal = document.createElement('flx-imageedit');
    imgData = imgTbl;
    slideId = id;
    let html = `
        <div class="sliderContainer shadowed">
            <div style="display:none;">
                <input type="range"/>
            </div>
        </div>
        <ion-header fullscreen>
            <ion-toolbar class="applist shadowed" color="darkBlue">
                <ion-buttons slot="start">
                    <ion-button class="clear">
                        <ion-icon name="trash"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <ion-title>${imgData.Descrip ? imgData.Descrip : imgData.Name}</ion-title>
                <ion-buttons slot="end">
                    <ion-button onclick="$(this).closest('ion-modal')[0].dismiss()">
                        <ion-icon name="close"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content> 
            <div>
                <canvas/>
            </div>
        </ion-content>
        <ion-footer>
            <ion-toolbar class="shadowed" color="darkBlue">
                <div>
                    <div><ion-icon name="save"/></div>
                    <div id="colorPicker"><input type="color"/></div>
                    <div><ion-icon name="pencil"/></div>
                </div>
            </ion-toolbar>
        </ion-footer>
        `;
    editImageModal.innerHTML = html;
    configCanvas(editImageModal);
    configInputs(jquery(editImageModal));
    const modal = document.createElement('ion-modal');
    modal.id = 'imageEdit';
    modal.component = editImageModal;
    document.body.appendChild(modal);
    modal.present();
  }
  imageEdit.init = init;
  var ratio = 1;
  function configCanvas(modal) {
    imageEdit_canvas = modal.querySelector('canvas');
    imageEdit_context = imageEdit_canvas.getContext('2d');
    setDefaultImg(jquery(modal));
    imageEdit_canvas.addEventListener("mousedown", drawStart, false);
    imageEdit_canvas.addEventListener("mouseup", drawEnd, false);
    imageEdit_canvas.addEventListener("touchstart", drawStart, false);
    imageEdit_canvas.addEventListener("touchend", drawEnd, false);
    imageEdit_canvas.addEventListener("mouseout", drawEnd, false);
  }
  function configInputs(modal) {
    let colorInput = modal.find('input[type="color"]');
    let penInput = modal.find('input[type="range"]');
    let clearBtn = modal.find('ion-button.clear');
    let saveBtn = modal.find('ion-icon[name="save"]');
    let penSizeBtn = modal.find('ion-icon[name="pencil"]');
    colorInput.on('change', () => {
      imageEdit_context.strokeStyle = colorInput[0].value;
    });
    penInput.on('change', () => {
      imageEdit_context.lineWidth = parseInt(penInput[0].value) + 1;
    });
    clearBtn.on('click', () => {
      setDefaultImg(modal);
    });
    saveBtn.on('click', () => {
      save(modal);
    });
    penSizeBtn.on('click', () => {
      modal.find('.sliderContainer > div').toggle(400);
    });
    imageEdit_context.strokeStyle = colorInput[0].value = '#ff0000';
    imageEdit_context.lineWidth = penInput[0].value = '5';
  }
  var entra;
  function drawStart(e) {
    entra = 0;
    imageEdit_context.moveTo(e.clientX, e.clientY);
    imageEdit_context.beginPath();
    imageEdit_canvas.addEventListener("mousemove", draw, false);
    imageEdit_canvas.addEventListener("touchmove", draw, false);
  }
  imageEdit.drawStart = drawStart;
  function drawEnd(_e) {
    imageEdit_canvas.removeEventListener("mousemove", draw, false);
    imageEdit_canvas.removeEventListener("touchmove", draw, false);
    if (entra < 2) {
      imageEdit_context.beginPath();
      imageEdit_context.arc(lastX, lastY, 3, 0, 2 * Math.PI, true);
      imageEdit_context.fill();
    }
  }
  imageEdit.drawEnd = drawEnd;
  var lastX, lastY;
  function draw(e) {
    e.preventDefault();
    if (e.targetTouches && e.targetTouches[0].pageX) {
      lastX = e.targetTouches[0].pageX - jquery(imageEdit_canvas).offset().left;
      lastY = e.targetTouches[0].pageY - jquery(imageEdit_canvas).offset().top;
    }
    else {
      lastX = e.clientX - jquery(imageEdit_canvas).offset().left;
      lastY = e.clientY - jquery(imageEdit_canvas).offset().top;
    }
    imageEdit_context.lineTo(lastX / ratio, lastY / ratio);
    imageEdit_context.moveTo(lastX / ratio, lastY / ratio);
    imageEdit_context.stroke();
    if (entra < 200)
      entra++;
  }
  imageEdit.draw = draw;
  function setDefaultImg(modal) {
    var img = new Image();
    img.src = imgData.URL ? imgData.URL : imgData.B64;
    imageEdit_canvas.width = img.width;
    imageEdit_canvas.height = img.height;
    ratio = window.innerWidth / img.width;
    img.onload = () => {
      imageEdit_context.drawImage(img, 0, 0);
    };
    imageEdit_context.strokeStyle = modal.find('input[type="color"]')[0].value;
    imageEdit_context.lineWidth = parseInt(modal.find('input[type="range"]')[0].value) + 1;
  }
  function save(modal) {
    let newB64 = imageEdit_canvas.toDataURL();
    sql.execSQL('UPDATE flxImages SET B64 = ? WHERE ImageId = ?;', [newB64, imgData.ImageId]);
    jquery(`#${slideId}slide`).attr('src', newB64);
    jquery('flx-imagemanager')[0].refresh();
    modal.closest('ion-modal')[0].dismiss();
  }
  imageEdit.save = save;
})(imageEdit || (imageEdit = {}));

const flxImagegalleryCss = "ion-thumbnail{--size:150px;display:inline-block}ion-grid{padding:0}.modalFullscreen .modal-wrapper{--width:100%;--height:100%}.swiper-container{height:100%;background-color:rgba(0, 0, 0, 0.75)}.slide{display:flex;flex-direction:column;justify-content:center;background-repeat:no-repeat;background-size:contain;width:100%;height:100%;background-position:center center}.image-text{position:absolute;right:0px;bottom:30px;left:0px;background:rgba(0, 0, 0, 0.75);padding:4px 8px;color:white;margin:0;font:14px Sans-Serif}.loading{background:transparent url(./assets/img/loading.gif) no-repeat center center;background-size:40px 40px}.center{position:absolute;display:grid;place-items:center;width:100%;height:100%}.noResults{text-align:center;display:flex;flex-direction:column;align-items:center;font-size:3em;color:#7d7d7d61}ion-fab{z-index:99}ion-slides{z-index:1}#imageEdit>div[role=\"dialog\"]{width:100%;height:100%}flx-imageedit ion-icon{color:white;font-size:40px;cursor:pointer}flx-imageedit .shadowed{box-shadow:rgba(0, 0, 0, 0.25) 0px 54px 55px, \r\n              rgba(0, 0, 0, 0.12) 0px -12px 30px, \r\n              rgba(0, 0, 0, 0.12) 0px 4px 6px, \r\n              rgba(0, 0, 0, 0.17) 0px 12px 13px, \r\n              rgba(0, 0, 0, 0.09) 0px -3px 5px}flx-imageedit .sliderContainer{display:flex;justify-content:center}flx-imageedit .sliderContainer>div{position:absolute;bottom:113px;display:flex;align-items:center;justify-content:center;width:95%;height:60px;background-color:white;border:1px solid black;border-radius:20px;z-index:1}flx-imageedit .sliderContainer input[type=\"range\"]{width:90%}flx-imageedit ion-toolbar{--ion-color-base:#003c6a !important}flx-imageedit ion-header ion-title{color:white;text-align:center}flx-imageedit ion-header ion-icon[name=\"trash\"]{font-size:30px}flx-imageedit ion-content>div{display:flex;align-items:center;justify-content:center;height:100%;background:#404040}flx-imageedit ion-content canvas{width:100%;cursor:crosshair}flx-imageedit ion-footer{background:#404040}flx-imageedit ion-footer ion-toolbar{padding-top:calc(var(--ion-safe-area-bottom, 0)/2);border-radius:20px 20px 0 0}flx-imageedit ion-footer ion-toolbar>div{display:grid;grid-template-columns:auto auto auto;justify-items:center;align-items:center;border-radius:20px 20px 0 0}flx-imageedit ion-footer ion-toolbar #colorPicker{width:100%;height:100%;display:flex;justify-content:center;align-items:center}flx-imageedit ion-footer ion-toolbar #colorPicker>input{width:60%;height:70%}flx-imageedit ion-footer ion-toolbar>div ion-icon[name=\"save\"]{font-size:40px;color:#003c6a;background:white;border-radius:10px;border:5px solid white}";

const FlxImagegallery = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.table = undefined;
    this.object = undefined;
    this.filter = undefined;
    this.opening = false;
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
    const options = {
      id: (await LocalNotifications.getDeliveredNotifications()).notifications.length,
      title: util.translate('image.downloadedNoti').replace('%', fileName),
      body: util.translate('image.downloadedNoti').replace('%', fileName),
      attachments: [uri]
    };
    LocalNotifications.schedule({ notifications: [options] });
    LocalNotifications.addListener('localNotificationActionPerformed', () => {
      try {
        let foOptions = { filePath: uri, contentType: 'image/jpeg' };
        FileOpener.open(foOptions);
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
                        <ion-fab-button color="warning" class="changeDescrip ion-margin-top" id="editButton" ${this.table[currentSlide].URL ? 'style="display:none;"' : ''}>
                            <ion-icon name="pencil" color="white"></ion-icon>
                        </ion-fab-button>
                        <ion-fab-button color="medium" class="edit ion-margin-top" ${this.table[currentSlide].URL ? 'style="display:none;"' : ''}>
                            <ion-icon name="brush"></ion-icon>
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
    jquery(content).find('ion-fab-button.changeDescrip').on('click', async () => { this.msgEdit(await slider.getActiveIndex()); });
    jquery(content).find('ion-fab-button.edit').on('click', async () => {
      const activeIndex = await slider.getActiveIndex();
      const img = this.table[activeIndex];
      imageEdit.init(img, activeIndex);
    });
    jquery(content).find('ion-fab-button.download').on('click', async () => {
      this.downloadImg(await slider.getActiveIndex());
    });
    jquery(content).find('ion-fab-button.delete').on('click', async () => {
      msg.confirm(util.translate('image.delete'), util.translate('image.msg')).then(async () => { this.deleteImg(await slider.getActiveIndex()); });
    });
    document.body.appendChild(modalElement);
    modalElement.onDidDismiss().then(() => {
      this.opening = false;
    });
    return modalElement.present();
  }
  isOnlineImage(online) {
    const editBtn = document.getElementById("editButton");
    editBtn.style.display = (online ? "none" : "block");
  }
  async msgEdit(index) {
    const image_data = this.table[index];
    let content = jquery(`<div class="wrapper">
                            <h1>${util.translate('document.msgEdit')}</h1>
                            <form class="form" novalidate="novalidate">
                                <ion-list>
                               <ion-item>
                                    <ion-label color="header" position="floating">${util.translate('document.description')}</ion-label>
                                    <ion-input value="${image_data.Descrip ? image_data.Descrip : ""}" name="Descrip" property="Descrip" ></ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-label color="header" position="floating">${util.translate('document.category')}</ion-label>
                                    <flx-dbcombo container="body" class="input hydrated" value="${image_data.ImageClassId}" name="ImageClassId" property="ImageClassId" required="true" valuefield="ImageClassId" displayfield="Descrip" orderby="Descrip asc" sqlsentence="select ImageClassId, Descrip from flxImagesClass" clearbutton=""></flx-dbcombo>
                                </ion-item>
                            </ion-list>
                            </form>
                            <ion-toolbar>
                                <ion-buttons slot="end">
                                    <ion-button id="saveButton" onclick="$(document).trigger('saveEdit');" color="primary">${util.translate('msg.ok')}</ion-button>
                                    <ion-button id="cancelButton" onclick="$(document).trigger('cancelEdit');" color="primary">${util.translate('msg.cancel')}</ion-button>
                                </ion-buttons>
                            </ion-toolbar>
                        </div>`)[0];
    jquery(content).find('form').validate({
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
      component: content,
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
        sql.execSQL('UPDATE flxImages SET Descrip = ?,ImageClassId = ? WHERE ImageId = ?;', [properties["Descrip"], properties["ImageClassId"], image_data.ImageId]);
        image_data.Descrip = properties["Descrip"];
        image_data.ImageClassId = properties["ImageClassId"];
        document.getElementById(`imgDesc${image_data.ImageId}`).innerHTML = image_data.Descrip;
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
        return h("ion-col", { class: "ion-text-center" }, h("ion-thumbnail", { class: "container", onClick: () => {
            if (!this.opening) {
              this.opening = true;
              this.zoomGalery(i);
            }
          } }, h("img", { loading: "lazy", class: "img-wrapper loading", src: (row.URL ? row.URL : row.B64), id: i.toString(), onError: () => document.getElementById(i.toString()).setAttribute("src", "./assets/img/noWifi.png") })));
      })) :
        h("div", { class: "center" }, h("div", { class: "noResults" }, h("i", { class: "fa fa-image" }), util.translate('list.noresults'))))))
    ]);
  }
};
FlxImagegallery.style = flxImagegalleryCss;

export { FlxImagegallery as flx_imagegallery };
