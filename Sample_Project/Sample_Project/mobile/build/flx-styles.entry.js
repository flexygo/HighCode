import { r as registerInstance, j as h } from './index-86ac49ff.js';
import './ionic-global-0f98fe97.js';
import './webapi-79a1d3db.js';
import { C as ConftokenProvider } from './conftoken-7e3c18eb.js';
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

const flxStylesCss = "flx-styles{}";

const FlxStyles = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
