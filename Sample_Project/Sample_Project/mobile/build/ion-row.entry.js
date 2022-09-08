import { r as registerInstance, j as h, l as Host } from './index-86ac49ff.js';
import { g as getIonMode } from './ionic-global-0f98fe97.js';

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
