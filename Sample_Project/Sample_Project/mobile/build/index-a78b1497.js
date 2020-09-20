import './ionic-global-e5feb32d.js';
import './utils-8c7561fa.js';
import './animation-625503e5.js';
import './index-77ad4b44.js';
import './ios.transition-5093371a.js';
import './md.transition-42e45fee.js';
import './cubic-bezier-92995175.js';
import './index-1da44cf3.js';
import './index-53f14fc6.js';
import './index-dbdc5ddf.js';
import './overlays-e386d27e.js';

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
