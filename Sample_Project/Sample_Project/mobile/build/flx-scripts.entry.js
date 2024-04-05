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

const flxScriptsCss = "flx-scripts{}";

const FlxScripts = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.scripts = undefined;
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
