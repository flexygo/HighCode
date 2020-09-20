import { r as registerInstance, j as h, n as Host } from './index-e5ff2de3.js';
import { g as getIonMode } from './ionic-global-e5feb32d.js';

const itemGroupIosCss = "ion-item-group{display:block}";

const itemGroupMdCss = "ion-item-group{display:block}";

const ItemGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        const mode = getIonMode(this);
        return (h(Host, { role: "group", class: {
                [mode]: true,
                // Used internally for styling
                [`item-group-${mode}`]: true,
                'item': true
            } }));
    }
};
ItemGroup.style = {
    ios: itemGroupIosCss,
    md: itemGroupMdCss
};

export { ItemGroup as ion_item_group };
