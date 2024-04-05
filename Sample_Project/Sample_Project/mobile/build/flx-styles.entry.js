import { r as registerInstance, k as h } from './index-d0d1673d.js';
import { C as ConftokenProvider } from './conftoken-2c86328f.js';
import './process-es6-d973fab3.js';
import './jquery-eec92bf9.js';
import './_commonjsHelpers-148b4233.js';
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
