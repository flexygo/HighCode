import { r as registerInstance } from './index-e5ff2de3.js';
import './ionic-global-e5feb32d.js';
import './messages-cbb766b7.js';
import './utils-8c7561fa.js';
import './index-a78b1497.js';
import './helpers-d94a0dba.js';
import './animation-625503e5.js';
import './index-77ad4b44.js';
import './ios.transition-5093371a.js';
import './md.transition-42e45fee.js';
import './cubic-bezier-92995175.js';
import './index-1da44cf3.js';
import './index-53f14fc6.js';
import './hardware-back-button-c2d005b0.js';
import './index-dbdc5ddf.js';
import './overlays-e386d27e.js';
import './jquery-4ed57fb2.js';
import { n as nav } from './navigation-b90acdd2.js';

const flxNavigatorCss = "flx-navbutton{}";

const FlxNavigator = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
