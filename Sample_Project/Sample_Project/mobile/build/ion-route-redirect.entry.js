import { r as registerInstance, e as createEvent } from './index-1ad46950.js';

class RouteRedirect {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ionRouteRedirectChanged = createEvent(this, "ionRouteRedirectChanged", 7);
    }
    propDidChange() {
        this.ionRouteRedirectChanged.emit();
    }
    connectedCallback() {
        this.ionRouteRedirectChanged.emit();
    }
    static get watchers() { return {
        "from": ["propDidChange"],
        "to": ["propDidChange"]
    }; }
}

export { RouteRedirect as ion_route_redirect };
