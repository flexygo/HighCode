import { r as registerInstance, k as h, o as Host } from './index-8e5b11cb.js';
import { g as getIonMode } from './ionic-global-6d118971.js';
import { c as createColorClasses } from './theme-12606872.js';

const noteIosCss = ":host{color:var(--color);font-family:var(--ion-font-family, inherit);box-sizing:border-box}:host(.ion-color){color:var(--ion-color-base)}:host{--color:var(--ion-color-step-350, #a6a6a6)}";

const noteMdCss = ":host{color:var(--color);font-family:var(--ion-font-family, inherit);box-sizing:border-box}:host(.ion-color){color:var(--ion-color-base)}:host{--color:var(--ion-color-step-600, #666666);font-size:14px}";

const Note = class {
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
Note.style = {
  ios: noteIosCss,
  md: noteMdCss
};

export { Note as ion_note };
