import { r as registerInstance, h } from './index-1ad46950.js';
import { C as ConftokenProvider } from './messages-856fd5dd.js';

const flxStylesCss = "flx-styles{}";

class FlxStyles {
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
}
FlxStyles.style = flxStylesCss;

export { FlxStyles as flx_styles };
