import { r as registerInstance, k as h } from './index-3f6ae35e.js';
import { C as ConftokenProvider } from './conftoken-6a608b71.js';
import './process-es6-cc264d03.js';
import './jquery-254bc370.js';
import './_commonjsHelpers-2a12c1e6.js';
import './utils-515e0805.js';
import './animation-160b6d8d.js';
import './helpers-0fb1c204.js';
import './ios.transition-9f5405f1.js';
import './index-7e5eab7f.js';
import './md.transition-d5eeb7f8.js';
import './cubic-bezier-ed243a9b.js';
import './index-d086042f.js';
import './ionic-global-7b33f09f.js';
import './index-cc97b114.js';
import './index-f393b124.js';
import './hardware-back-button-508e48cf.js';
import './overlays-71eb67ef.js';

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
