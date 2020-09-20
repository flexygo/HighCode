import { r as registerInstance, j as h, n as Host } from './index-e5ff2de3.js';
import { g as getIonMode } from './ionic-global-e5feb32d.js';
import { c as createColorClasses } from './theme-86cb12f9.js';

const textCss = ":host(.ion-color){color:var(--ion-color-base)}";

const Text = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        const mode = getIonMode(this);
        return (h(Host, { class: Object.assign(Object.assign({}, createColorClasses(this.color)), { [mode]: true }) }, h("slot", null)));
    }
};
Text.style = textCss;

export { Text as ion_text };
