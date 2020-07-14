import { r as registerInstance } from './index-1ad46950.js';
import './ionic-global-d77af0d9.js';
import './messages-65fb7542.js';
import './utils-30f0564d.js';
import './index-fb0d54fa.js';
import './helpers-d94a0dba.js';
import './animation-6c25f42e.js';
import './index-0cbc1957.js';
import './ios.transition-e8b1df9c.js';
import './md.transition-03140845.js';
import './cubic-bezier-92995175.js';
import './index-1da44cf3.js';
import './index-53f14fc6.js';
import './hardware-back-button-c2d005b0.js';
import './index-28dab2f8.js';
import './overlays-e769172f.js';
import './jquery-4ed57fb2.js';
import { n as nav } from './navigation-538e1aae.js';

const flxNavigatorCss = "flx-navbutton{}";

class FlxNavigator {
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
}
FlxNavigator.style = flxNavigatorCss;

export { FlxNavigator as flx_navbutton };
