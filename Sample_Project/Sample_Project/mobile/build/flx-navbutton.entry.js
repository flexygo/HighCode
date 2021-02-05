import { r as registerInstance } from './index-76f52202.js';
import './ionic-global-53d785f3.js';
import './messages-1e55a1f4.js';
import './jquery-4ed57fb2.js';
import './utils-30827fbd.js';
import './index-38aae3ff.js';
import './helpers-742de4f9.js';
import './animation-a90ce8fc.js';
import './index-a6178d25.js';
import './ios.transition-bfe5eada.js';
import './md.transition-e49d1536.js';
import './cubic-bezier-89113939.js';
import './index-9b41fcc6.js';
import './index-86d5f3ab.js';
import './hardware-back-button-b3b61715.js';
import './index-c940ddb6.js';
import './overlays-3fb58ad8.js';
import { n as nav } from './navigation-8af3d3e3.js';

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
