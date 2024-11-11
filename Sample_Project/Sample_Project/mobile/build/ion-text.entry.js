import { r as registerInstance, k as h, o as Host } from './index-8e5b11cb.js';
import { g as getIonMode } from './ionic-global-6d118971.js';
import { c as createColorClasses } from './theme-12606872.js';

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
