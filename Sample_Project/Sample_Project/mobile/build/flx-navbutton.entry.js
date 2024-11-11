import { r as registerInstance } from './index-8e5b11cb.js';
import { n as nav } from './conftoken-89472368.js';
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

const flxNavigatorCss = "flx-navbutton{}";

const FlxNavigator = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.type = undefined;
    this.object = undefined;
    this.pagename = undefined;
    this.filter = undefined;
    this.defaults = undefined;
    this.transfer = undefined;
    this.root = undefined;
  }
  handleClick() {
    let direction = 'forward';
    if (this.root) {
      direction = 'root';
    }
    else if (this.transfer) {
      direction = 'back';
    }
    switch (this.type.toLowerCase()) {
      case 'home':
        nav.goHome();
        break;
      case 'sync':
        nav.goHome();
        break;
      case 'login':
        nav.goHome();
        break;
      case 'back':
        nav.goHome();
        break;
      case 'insert':
        this.filter = '';
        this.type = 'edit';
      default:
        nav.goPage(this.type, this.object, this.pagename, this.filter, this.defaults, direction);
    }
  }
  render() {
    return;
  }
};
FlxNavigator.style = flxNavigatorCss;

export { FlxNavigator as flx_navbutton };
