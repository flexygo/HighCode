import { r as registerInstance, k as h, o as Host } from './index-8e5b11cb.js';
import { g as getIonMode } from './ionic-global-6d118971.js';

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
