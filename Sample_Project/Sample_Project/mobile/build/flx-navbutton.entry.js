import { r as registerInstance } from './index-1ad46950.js';
import './ionic-global-08321e45.js';
import './messages-856fd5dd.js';
import './utils-ae5eb377.js';
import './index-9a467e52.js';
import './helpers-742de4f9.js';
import './animation-a90ce8fc.js';
import './index-59819519.js';
import './ios.transition-f27c75b3.js';
import './md.transition-0550681d.js';
import './cubic-bezier-89113939.js';
import './index-9b41fcc6.js';
import './index-86d5f3ab.js';
import './hardware-back-button-b3b61715.js';
import './index-626f3745.js';
import './overlays-af382aca.js';
import './jquery-4ed57fb2.js';
import { n as nav } from './navigation-94cce689.js';

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
