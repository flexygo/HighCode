import { r as registerInstance, h, H as Host } from './index-1ad46950.js';
import { g as getIonMode } from './ionic-global-08321e45.js';
import './helpers-742de4f9.js';
import './animation-a90ce8fc.js';
import './hardware-back-button-b3b61715.js';
import { m as menuController } from './index-626f3745.js';
import { u as updateVisibility } from './menu-toggle-util-d79fb804.js';

const menuToggleCss = ":host(.menu-toggle-hidden){display:none}";

class MenuToggle {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.visible = false;
        /**
         * Automatically hides the content when the corresponding menu is not active.
         *
         * By default, it's `true`. Change it to `false` in order to
         * keep `ion-menu-toggle` always visible regardless the state of the menu.
         */
        this.autoHide = true;
        this.onClick = () => {
            return menuController.toggle(this.menu);
        };
    }
    connectedCallback() {
        this.visibilityChanged();
    }
    async visibilityChanged() {
        this.visible = await updateVisibility(this.menu);
    }
    render() {
        const mode = getIonMode(this);
        const hidden = this.autoHide && !this.visible;
        return (h(Host, { onClick: this.onClick, "aria-hidden": hidden ? 'true' : null, class: {
                [mode]: true,
                'menu-toggle-hidden': hidden,
            } }, h("slot", null)));
    }
}
MenuToggle.style = menuToggleCss;

export { MenuToggle as ion_menu_toggle };
