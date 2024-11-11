import { y as WebPlugin } from './conftoken-89472368.js';
import './process-es6-cc264d03.js';
import './jquery-34624bb9.js';
import './_commonjsHelpers-2a12c1e6.js';
import './utils-224de961.js';
import './index-8e5b11cb.js';
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

class AppWeb extends WebPlugin {
    constructor() {
        super();
        this.handleVisibilityChange = () => {
            const data = {
                isActive: document.hidden !== true,
            };
            this.notifyListeners('appStateChange', data);
            if (document.hidden) {
                this.notifyListeners('pause', null);
            }
            else {
                this.notifyListeners('resume', null);
            }
        };
        document.addEventListener('visibilitychange', this.handleVisibilityChange, false);
    }
    exitApp() {
        throw this.unimplemented('Not implemented on web.');
    }
    async getInfo() {
        throw this.unimplemented('Not implemented on web.');
    }
    async getLaunchUrl() {
        return { url: '' };
    }
    async getState() {
        return { isActive: document.hidden !== true };
    }
    async minimizeApp() {
        throw this.unimplemented('Not implemented on web.');
    }
}

export { AppWeb };
