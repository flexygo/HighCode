import { r as registerInstance, h, H as Host, d as getElement } from './index-1ad46950.js';
import { g as getIonMode } from './ionic-global-d77af0d9.js';

const selectOptionCss = ":host{display:none}";

class SelectOption {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.inputId = `ion-selopt-${selectOptionIds++}`;
        /**
         * If `true`, the user cannot interact with the select option.
         */
        this.disabled = false;
    }
    render() {
        return (h(Host, { role: "option", id: this.inputId, class: getIonMode(this) }));
    }
    get el() { return getElement(this); }
}
let selectOptionIds = 0;
SelectOption.style = selectOptionCss;

export { SelectOption as ion_select_option };
