import { r as registerInstance, j as h, l as Host, k as getElement } from './index-76f52202.js';
import { g as getIonMode } from './ionic-global-53d785f3.js';

const selectOptionCss = ":host{display:none}";

const SelectOption = class {
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
};
let selectOptionIds = 0;
SelectOption.style = selectOptionCss;

export { SelectOption as ion_select_option };
