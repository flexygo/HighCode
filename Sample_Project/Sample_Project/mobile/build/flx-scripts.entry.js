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

const flxScriptsCss = "flx-scripts{}";

const FlxScripts = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    async componentWillLoad() {
        this.scripts = [];
        await this.load();
    }
    async load() {
        let cnfTok = await ConftokenProvider.config();
        if (cnfTok && cnfTok.scriptConfig) {
            this.scripts = cnfTok.scriptConfig;
        }
    }
    async refresh() {
        await this.load();
    }
    render() {
        return this.scripts.map((itm) => {
            return h("script", { id: itm.name, innerHTML: itm.jsCode + '\n\n' + '//# sourceURL=' + itm.name + '.js' });
        });
    }
};
FlxScripts.style = flxScriptsCss;

export { FlxScripts as flx_scripts };
