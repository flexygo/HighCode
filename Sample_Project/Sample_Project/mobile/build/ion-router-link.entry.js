import { r as registerInstance, j as h, l as Host } from './index-86ac49ff.js';
import { g as getIonMode } from './ionic-global-0f98fe97.js';
import { o as openURL, c as createColorClasses } from './theme-f934266c.js';

const routerLinkCss = ":host{--background:transparent;--color:var(--ion-color-primary, #3880ff);background:var(--background);color:var(--color)}:host(.ion-color){color:var(--ion-color-base)}a{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit}";

const RouterLink = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * When using a router, it specifies the transition direction when navigating to
         * another page using `href`.
         */
        this.routerDirection = 'forward';
        this.onClick = (ev) => {
            openURL(this.href, ev, this.routerDirection, this.routerAnimation);
        };
    }
    render() {
        const mode = getIonMode(this);
        const attrs = {
            href: this.href,
            rel: this.rel,
            target: this.target
        };
        return (h(Host, { onClick: this.onClick, class: createColorClasses(this.color, {
                [mode]: true,
                'ion-activatable': true
            }) }, h("a", Object.assign({}, attrs), h("slot", null))));
    }
};
RouterLink.style = routerLinkCss;

export { RouterLink as ion_router_link };
