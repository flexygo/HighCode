import { r as registerInstance, h, H as Host } from './index-1ad46950.js';
import { g as getIonMode } from './ionic-global-08321e45.js';

const rowCss = ":host{display:flex;flex-wrap:wrap}";

class Row {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h(Host, { class: getIonMode(this) }, h("slot", null)));
    }
}
Row.style = rowCss;

export { Row as ion_row };
