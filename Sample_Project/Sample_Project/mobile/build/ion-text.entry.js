import { r as registerInstance, j as h, l as Host } from './index-76f52202.js';
import { g as getIonMode } from './ionic-global-53d785f3.js';
import { c as createColorClasses } from './theme-d8afa044.js';

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
