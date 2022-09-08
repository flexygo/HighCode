import { r as registerInstance, h as Build, j as h, l as Host, k as getElement } from './index-86ac49ff.js';
import { a as isPlatform, c as config, g as getIonMode } from './ionic-global-0f98fe97.js';

const appCss = "html.plt-mobile ion-app{user-select:none}html.plt-mobile ion-app [contenteditable]{user-select:text}ion-app.force-statusbar-padding{--ion-safe-area-top:20px}";

const App = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    componentDidLoad() {
        if (Build.isBrowser) {
            rIC(async () => {
                const isHybrid = isPlatform(window, 'hybrid');
                if (!config.getBoolean('_testing')) {
                    __sc_import_app('./tap-click-a7f9f959.js').then(module => module.startTapClick(config));
                }
                if (config.getBoolean('statusTap', isHybrid)) {
                    __sc_import_app('./status-tap-20d69e82.js').then(module => module.startStatusTap());
                }
                if (config.getBoolean('inputShims', needInputShims())) {
                    __sc_import_app('./input-shims-f3a88fc2.js').then(module => module.startInputShims(config));
                }
                const hardwareBackButtonModule = await __sc_import_app('./hardware-back-button-aacf3d12.js');
                if (config.getBoolean('hardwareBackButton', isHybrid)) {
                    hardwareBackButtonModule.startHardwareBackButton();
                }
                else {
                    hardwareBackButtonModule.blockHardwareBackButton();
                }
                if (typeof window !== 'undefined') {
                    __sc_import_app('./keyboard-df0208a2.js').then(module => module.startKeyboardAssist(window));
                }
                __sc_import_app('./focus-visible-30bfce36.js').then(module => module.startFocusVisible());
            });
        }
    }
    render() {
        const mode = getIonMode(this);
        return (h(Host, { class: {
                [mode]: true,
                'ion-page': true,
                'force-statusbar-padding': config.getBoolean('_forceStatusbarPadding'),
            } }));
    }
    get el() { return getElement(this); }
};
const needInputShims = () => {
    return isPlatform(window, 'ios') && isPlatform(window, 'mobile');
};
const rIC = (callback) => {
    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(callback);
    }
    else {
        setTimeout(callback, 32);
    }
};
App.style = appCss;

export { App as ion_app };
