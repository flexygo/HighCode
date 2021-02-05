import { r as registerInstance, j as h, l as Host } from './index-76f52202.js';
import { g as getIonMode } from './ionic-global-53d785f3.js';

const thumbnailCss = ":host{--size:48px;--border-radius:0;border-radius:var(--border-radius);display:block;width:var(--size);height:var(--size)}::slotted(ion-img),::slotted(img){border-radius:var(--border-radius);width:100%;height:100%;object-fit:cover;overflow:hidden}";

const Thumbnail = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h(Host, { class: getIonMode(this) }, h("slot", null)));
    }
};
Thumbnail.style = thumbnailCss;

export { Thumbnail as ion_thumbnail };
