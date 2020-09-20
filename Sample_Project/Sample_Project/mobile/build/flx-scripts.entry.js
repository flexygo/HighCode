import { r as registerInstance, j as h } from './index-e5ff2de3.js';
import { C as ConftokenProvider } from './messages-cbb766b7.js';

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
