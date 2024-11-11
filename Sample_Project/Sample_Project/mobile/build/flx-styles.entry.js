import { r as registerInstance, k as h } from './index-8e5b11cb.js';
import { C as ConftokenProvider } from './conftoken-89472368.js';
import './process-es6-cc264d03.js';
import './jquery-34624bb9.js';
import './_commonjsHelpers-2a12c1e6.js';
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

const flxStylesCss = "flx-styles{}";

const FlxStyles = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.style = undefined;
  }
  async componentWillLoad() {
    this.style = [];
    await this.load();
  }
  async load() {
    let cnfTok = await ConftokenProvider.config();
    if (cnfTok && cnfTok.resources) {
      this.resources = cnfTok.resources;
    }
    ;
    if (cnfTok && cnfTok.styleConfig) {
      this.style = cnfTok.styleConfig;
    }
  }
  async refresh() {
    await this.load();
  }
  render() {
    return this.style.map((itm) => {
      return h("style", { id: itm.name, innerHTML: this.escapeFiles(itm.cssCode) + '\n\n' + '/*@ sourceURL=' + itm.name + '.css */' });
    });
  }
  escapeFiles(htmlCode) {
    if (this.resources) {
      let reg = /{{([^]+)\|file}}/g;
      let matches = htmlCode.match(reg);
      if (matches != null) {
        for (let i = 0; i < matches.length; i++) {
          let marker = matches[i].substring(2, matches[i].length - 2).trim();
          let propFormat = marker.split('|')[0].toString().toLowerCase();
          let rValue = 'not found';
          for (let i = 0; i < this.resources.length; i++) {
            if (this.resources[i].FileName.toLowerCase() == propFormat) {
              rValue = 'data:' + this.resources[i].MimeType + ';base64,' + this.resources[i].B64;
              break;
            }
          }
          htmlCode = htmlCode.replace(matches[i], rValue);
        }
      }
    }
    return htmlCode;
  }
};
FlxStyles.style = flxStylesCss;

export { FlxStyles as flx_styles };
