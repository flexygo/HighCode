import { r as registerInstance, B as Build, h, H as Host, d as getElement } from './index-1ad46950.js';
import { a as isPlatform, c as config, g as getIonMode } from './ionic-global-08321e45.js';

const appCss = "html.plt-mobile ion-app{user-select:none}ion-app.force-statusbar-padding{--ion-safe-area-top:20px}";

class App {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    componentDidLoad() {
        if (Build.isBrowser) {
            rIC(() => {
                const isHybrid = isPlatform(window, 'hybrid');
                if (!config.getBoolean('_testing')) {
                    __sc_import_app('./tap-click-4e5957eb.js').then(module => module.startTapClick(config));
                }
                if (config.getBoolean('statusTap', isHybrid)) {
                    __sc_import_app('./status-tap-be38f430.js').then(module => module.startStatusTap());
                }
                if (config.getBoolean('inputShims', needInputShims())) {
                    __sc_import_app('./input-shims-68bc5c32.js').then(module => module.startInputShims(config));
                }
                if (config.getBoolean('hardwareBackButton', isHybrid)) {
                    __sc_import_app('./hardware-back-button-b3b61715.js').then(module => module.startHardwareBackButton());
                }
                if (typeof window !== 'undefined') {
                    __sc_import_app('./keyboard-6824528e.js').then(module => module.startKeyboardAssist(window));
                }
                __sc_import_app('./focus-visible-571e113e.js').then(module => module.startFocusVisible());
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
}
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
