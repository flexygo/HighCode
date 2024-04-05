import { r as registerInstance, k as h, n as Host } from './index-d0d1673d.js';
import { g as getIonMode } from './ionic-global-f9661584.js';
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
