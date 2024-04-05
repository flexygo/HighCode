import { r as registerInstance } from './index-d0d1673d.js';
import { n as nav } from './conftoken-2c86328f.js';
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
