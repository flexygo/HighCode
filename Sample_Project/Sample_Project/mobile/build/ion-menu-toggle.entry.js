import { r as registerInstance, j as h, n as Host } from './index-e5ff2de3.js';
import { g as getIonMode } from './ionic-global-e5feb32d.js';
import './helpers-d94a0dba.js';
import './animation-625503e5.js';
import './hardware-back-button-c2d005b0.js';
import { m as menuController } from './index-dbdc5ddf.js';
import { u as updateVisibility } from './menu-toggle-util-b07c353e.js';

const menuToggleCss = ":host(.menu-toggle-hidden){display:none}";

const MenuToggle = class {
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
};
MenuToggle.style = menuToggleCss;

export { MenuToggle as ion_menu_toggle };
