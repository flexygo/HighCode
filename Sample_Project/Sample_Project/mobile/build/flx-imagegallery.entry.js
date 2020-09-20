import { r as registerInstance, j as h } from './index-e5ff2de3.js';
import { P as Plugins, s as sql, F as FilesystemDirectory, m as msg, u as util } from './messages-cbb766b7.js';
import { c as createCommonjsModule, a as commonjsGlobal, j as jquery } from './jquery-4ed57fb2.js';

var FileSaver_min = createCommonjsModule(function (module, exports) {
(function(a,b){if("function"==typeof undefined&&undefined.amd)undefined([],b);else if("undefined"!='object')b();else {b(),a.FileSaver={exports:{}}.exports;}})(commonjsGlobal,function(){"use strict";function b(a,b){return "undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(b,c,d){var e=new XMLHttpRequest;e.open("GET",b),e.responseType="blob",e.onload=function(){a(e.response,c,d);},e.onerror=function(){console.error("could not download file");},e.send();}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send();}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"));}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b);}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof commonjsGlobal&&commonjsGlobal.global===commonjsGlobal?commonjsGlobal:void 0,a=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href);},4E4),setTimeout(function(){e(j);},0));}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else {var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i);});}}:function(a,b,d,e){if(e=e||open("","_blank"),e&&(e.document.title=e.document.body.innerText="downloading..."),"string"==typeof a)return c(a,b,d);var g="application/octet-stream"===a.type,h=/constructor/i.test(f.HTMLElement)||f.safari,i=/CriOS\/[\d]+/.test(navigator.userAgent);if((i||g&&h)&&"object"==typeof FileReader){var j=new FileReader;j.onloadend=function(){var a=j.result;a=i?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),e?e.location.href=a:location=a,e=null;},j.readAsDataURL(a);}else {var k=f.URL||f.webkitURL,l=k.createObjectURL(a);e?e.location=l:location.href=l,e=null,setTimeout(function(){k.revokeObjectURL(l);},4E4);}});f.saveAs=a.saveAs=a,"undefined"!='object'&&(module.exports=a);});


});

const flxImagegalleryCss = "ion-thumbnail{--size:150px;display:inline-block}.modalFullscreen .modal-wrapper{--width:100%;--height:100%}.swiper-container{height:100%;background-color:rgba(0, 0, 0, 0.75)}.slide{background-repeat:no-repeat;background-size:contain;width:100%;height:100%;background-position:center center}.image-text{position:absolute;right:0px;bottom:30px;left:0px;background:rgba(0, 0, 0, 0.75);padding:4px 8px;color:white;margin:0;font:14px Sans-Serif}";

const { Filesystem } = Plugins;
const { Share } = Plugins;
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
        sentence += ' order by OrderNumber';
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
            let fileName = this.object + '_' + index + '.jpg';
            let dataBase64 = this.table[index].B64.substring(this.table[index].B64.indexOf(',') + 1);
            if (navigator.share) {
                Filesystem.writeFile({
                    path: fileName,
                    data: dataBase64,
                    directory: FilesystemDirectory.Documents,
                }).then(async (ret) => {
                    Share.share({
                        title: fileName,
                        text: this.table[index].Descrip,
                        url: ret.nativeURL,
                    });
                }).catch(error => {
                    msg.showError(error);
                });
            }
            else {
                var blob = util.b64toBlob(dataBase64, 'application/octet-stream');
                FileSaver_min.saveAs(blob, fileName);
            }
        }
    }
    zoomGalery(currentSlide) {
        let content = jquery('<ion-content fullscreen scroll-y="false"><ion-fab vertical="top" horizontal="start" slot="fixed"><ion-fab-button class="download"><ion-icon name="download"></ion-icon></ion-fab-button></ion-fab><ion-fab vertical="top" horizontal="end" slot="fixed"><ion-fab-button class="close"><ion-icon name="close"></ion-icon></ion-fab-button></ion-fab></ion-content>')[0];
        let slider = document.createElement('ion-slides');
        slider.pager = true;
        slider.options = {
            initialSlide: currentSlide
        };
        content.append(slider);
        for (let i = 0; i < this.table.length; i++) {
            let row = this.table[i];
            slider.innerHTML += `<ion-slide><div class="slide" style="background-image: url('${(row.URL ? row.URL : row.B64)}')"><div class="image-text"><h2>${(row.Name ? row.Name : '')}</h2><p>${(row.Descrip ? row.Descrip : '')}</p></div></ion-slide>`;
        }
        const modalElement = document.createElement('ion-modal');
        modalElement.component = content;
        modalElement.showBackdrop = false;
        modalElement.cssClass = 'modalFullscreen';
        jquery(content).find('ion-fab-button.close').on('click', () => { modalElement.dismiss(); });
        jquery(content).find('ion-fab-button.download').on('click', async () => {
            this.downloadImg(await slider.getActiveIndex());
        });
        document.body.appendChild(modalElement);
        return modalElement.present();
    }
    render() {
        return ([
            h("ion-grid", null, h("ion-row", null, (this.table.length > 0 ? (this.table.map((row, i) => {
                return h("ion-col", { class: "ion-text-center" }, h("ion-thumbnail", { onClick: () => { this.zoomGalery(i + 1); } }, h("ion-img", { class: "img-wrapper", src: (row.URL ? row.URL : row.B64) })));
            })) : util.translate('list.noresults'))))
        ]);
    }
};
FlxImagegallery.style = flxImagegalleryCss;

export { FlxImagegallery as flx_imagegallery };
