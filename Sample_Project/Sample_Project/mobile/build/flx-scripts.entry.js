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
