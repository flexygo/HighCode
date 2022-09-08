import { r as registerInstance, j as h, l as Host } from './index-86ac49ff.js';
import { g as getIonMode } from './ionic-global-0f98fe97.js';
import { c as createColorClasses } from './theme-f934266c.js';

const textCss = ":host(.ion-color){color:var(--ion-color-base)}";

const Text = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        const mode = getIonMode(this);
        return (h(Host, { class: createColorClasses(this.color, {
                [mode]: true,
            }) }, h("slot", null)));
    }
};
Text.style = textCss;

export { Text as ion_text };
