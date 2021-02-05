import './ionic-global-53d785f3.js';
import './utils-30827fbd.js';
import './animation-a90ce8fc.js';
import './index-a6178d25.js';
import './ios.transition-bfe5eada.js';
import './md.transition-e49d1536.js';
import './cubic-bezier-89113939.js';
import './index-9b41fcc6.js';
import './index-86d5f3ab.js';
import './index-c940ddb6.js';
import './overlays-3fb58ad8.js';

const setupConfig = (config) => {
    const win = window;
    const Ionic = win.Ionic;
    if (Ionic && Ionic.config && Ionic.config.constructor.name !== 'Object') {
        console.error('ionic config was already initialized');
        return;
    }
    win.Ionic = win.Ionic || {};
    win.Ionic.config = Object.assign(Object.assign({}, win.Ionic.config), config);
    return win.Ionic.config;
};
const getMode = () => {
    const win = window;
    const config = win && win.Ionic && win.Ionic.config;
    if (config) {
        if (config.mode) {
            return config.mode;
        }
        else {
            return config.get('mode');
        }
    }
    return 'md';
};
