import { r as registerInstance, k as h } from './index-d0d1673d.js';
import { k as flxSync, C as ConftokenProvider, s as sql, u as util, h as cam, m as msg, n as nav } from './conftoken-2c86328f.js';
import { j as jquery } from './jquery-eec92bf9.js';
import './process-es6-d973fab3.js';
import './utils-0a0c7da4.js';
import './animation-10ea33c3.js';
import './helpers-719f4c54.js';
import './ios.transition-62fdffc9.js';
import './index-06bb8825.js';
import './md.transition-f61d2286.js';
import './cubic-bezier-93f47170.js';
import './index-7fe827c3.js';
import './ionic-global-f9661584.js';
import './index-b40d441b.js';
import './index-07c2bb76.js';
import './hardware-back-button-aacf3d12.js';
import './overlays-177438ad.js';
import './_commonjsHelpers-148b4233.js';

const flxImagemanagerCss = "ion-slide{height:100%}";

const FlxImagemanager = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.alternativeCam = false;
    this.object = undefined;
    this.objectid = undefined;
    this.defaults = undefined;
    this.hasGallery = false;
    this.classDescription = undefined;
  }
  componentDidLoad() {
    jquery('#loadingSpinnerModule').css('visibility', 'hidden');
    flxSync.checkSendErrors();
  }
  async componentWillLoad() {
    jquery('#loadingSpinnerModule').css('visibility', 'visible');
    this.hasGallery = (navigator.camera ? true : false);
    this.objConf = (await ConftokenProvider.config()).objectConfig[this.object];
    this.objectGUID = await sql.getValue('select _rowguid from `' + this.objConf.tableName + '` where `' + this.objConf.imageConfig.objectPK + '`=?', [this.objectid]);
    this.lastOrder = await sql.getValue('select max(OrderNumber) from `flxImages` where ObjectName=\'' + this.object + '\' and ObjectId=\'' + this.objectid + '\'');
    this.defaults = (this.defaults) ? decodeURIComponent(this.defaults) : null;
    let def = null;
    if (this.defaults) {
      def = util.parseJSON(this.defaults);
      if (def.ImageClassId !== undefined) {
        this.imageClassId = def.ImageClassId;
        this.classDescription = await sql.getValue('select Descrip from `flxImagesClass` where ImageClassId=\'' + this.imageClassId + '\' and TypeId=\'' + this.objConf.imageConfig.typeId + '\'');
      }
      if (def.AlternativeCamera !== undefined) {
        this.alternativeCam = def.AlternativeCamera;
      }
    }
    if (!this.lastOrder) {
      this.lastOrder = 0;
    }
  }
  async refresh(ev) {
    let imgs = document.querySelector('flx-imagegallery');
    return imgs.refresh().then(() => { ev.target.complete(); });
  }
  getPicture(multi = false) {
    const compression = this.getCompression();
    cam.getPicture(compression.height, compression.width, compression.quality, null, this.alternativeCam).then((b64) => {
      let image = { "ImageId": util.GUID(), "ObjectName": this.object, "ObjectId": this.objectid, "ObjectGUID": this.objectGUID, "Name": this.object + ' ' + this.lastOrder, "Descrip": null, "ImageClassId": (this.imageClassId == null ? this.objConf.imageConfig.defaultCategoryId : this.imageClassId), "MainImage": (this.lastOrder == 0 ? true : false), "OrderNumber": this.lastOrder, "CreationDate": util.currentDateTime(), "URL": null, "B64": b64, "_isInserted": 1 };
      cam.savePicture(image).then(() => {
        let imgs = document.querySelector('flx-imagegallery');
        imgs.addImage(image);
        this.lastOrder++;
        if (multi) {
          this.getPicture(multi);
        }
      });
    }).catch((err) => {
      if (err.toString().toLowerCase() != 'user cancelled photos app' && err.toString().toLowerCase() != 'no image selected' && !window.cordova) {
        let image = { "ImageId": util.GUID(), "ObjectName": this.object, "ObjectId": this.objectid, "ObjectGUID": null, "Name": 'Sample.jpg', "Descrip": null, "ImageClassId": (this.imageClassId == null ? this.objConf.imageConfig.defaultCategoryId : this.imageClassId), "MainImage": false, "OrderNumber": null, "CreationDate": util.currentDateTime(), "URL": null, "B64": cam.getDefaultImage(), "_isInserted": 1 };
        cam.savePicture(image).then(() => {
          let imgs = document.querySelector('flx-imagegallery');
          imgs.addImage(image);
          msg.showError(err);
        });
      }
    });
  }
  async getGalleryPicturesPhone() {
    const compression = this.getCompression();
    let images64 = await cam.getGalleryPicture(compression.height, compression.width, compression.quality);
    if (images64 === "OK")
      return;
    for (var i = 0; i < images64.length; i++) {
      let image = { "ImageId": util.GUID(), "ObjectName": this.object, "ObjectId": this.objectid, "ObjectGUID": null, "Name": this.object + ' ' + this.lastOrder, "Descrip": null, "ImageClassId": (this.imageClassId == null ? this.objConf.imageConfig.defaultCategoryId : this.imageClassId), "MainImage": (this.lastOrder == 0 ? true : false), "OrderNumber": this.lastOrder, "CreationDate": util.currentDateTime(), "URL": null, "B64": 'data:image/jpeg;base64,' + images64[i], "_isInserted": 1 };
      cam.savePicture(image).then(() => {
        let imgs = document.querySelector('flx-imagegallery');
        imgs.addImage(image);
      });
    }
  }
  getCompression() {
    const imageCnf = this.objConf.imageConfig;
    let quality, width, height;
    width = (imageCnf.maxWidth ? imageCnf.maxWidth : 1000);
    height = (imageCnf.maxHeight ? imageCnf.maxHeight : 1000);
    switch (imageCnf.compression) {
      case 0:
        quality = 100;
        break;
      case 1:
        quality = 75;
        break;
      case 2:
        quality = 50;
        break;
      case 3:
        quality = 25;
        break;
      default:
        quality = 100;
        break;
    }
    return { quality, width, height };
  }
  render() {
    return [
      h("ion-header", null, h("ion-toolbar", { color: "header", class: "ion-text-center" }, h("ion-buttons", { slot: "start" }, h("ion-menu-button", { color: "outstanding" }), h("ion-icon", { name: "alert-circle", color: "danger", class: "stack sendError flx-hide" })), h("ion-buttons", { slot: "end" }, h("ion-button", { color: "outstanding", onClick: () => { nav.goBack(); } }, h("ion-icon", { slot: "icon-only", name: "arrow-undo-outline" }))), h("ion-title", null, h("span", { id: "menuTitle" }, (this.classDescription ? this.classDescription : util.translate('image.title')))))),
      h("ion-content", null, h("ion-refresher", { slot: "fixed", id: "refresher", onIonRefresh: (ev) => { this.refresh(ev); } }, h("ion-refresher-content", { "pulling-icon": "chevron-down-circle-outline", refreshingSpinner: "bubbles" })), h("flx-imagegallery", { object: this.object, filter: 'ObjectName=\'' + this.object + '\' and ObjectId=\'' + this.objectid + '\'' + (this.imageClassId == null ? '' : ' and ImageClassId=\'' + this.imageClassId + '\'') })),
      h("ion-fab", { vertical: "bottom", horizontal: "end", slot: "fixed" }, h("ion-fab-button", null, h("ion-icon", { name: "apps-outline" })), h("ion-fab-list", { side: "top" }, h("ion-fab-button", { color: "dark", onClick: () => { this.getPicture(false); } }, h("ion-icon", { name: "camera" })), window.cordova ?
        h("ion-fab-button", { color: "dark", onClick: () => { this.getPicture(true); } }, h("ion-icon", { title: "multi", name: "refresh-outline" }))
        :
          h("span", null)), window.cordova ?
        h("ion-fab-list", { side: "start" }, h("ion-fab-button", { color: "dark", onClick: () => { this.getGalleryPicturesPhone(); } }, h("ion-icon", { name: "image" })))
        :
          h("span", null))
    ];
  }
};
FlxImagemanager.style = flxImagemanagerCss;

export { FlxImagemanager as flx_imagemanager };
