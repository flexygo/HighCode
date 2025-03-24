import { r as registerInstance, k as h, n as Host } from './index-3f6ae35e.js';
import { g as getIonMode } from './ionic-global-7b33f09f.js';

const rowCss = ":host{display:flex;flex-wrap:wrap}";

const Row = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, { class: getIonMode(this) }, h("slot", null)));
  }
};
Row.style = rowCss;

export { Row as ion_row };
