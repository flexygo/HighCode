import { r as registerInstance } from './index-3f6ae35e.js';
import { n as nav } from './conftoken-6a608b71.js';
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
