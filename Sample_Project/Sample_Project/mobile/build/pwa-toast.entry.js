import { r as registerInstance, j as h, k as getElement, l as Host } from './index-86ac49ff.js';

const toastCss = ":host{position:fixed;bottom:20px;left:0;right:0;display:flex;opacity:0}:host(.in){transition:opacity 300ms;opacity:1}:host(.out){transition:opacity 1s;opacity:0}.wrapper{flex:1;display:flex;align-items:center;justify-content:center}.toast{font-family:-apple-system, system-ui, \"Helvetica Neue\", Roboto, sans-serif;background-color:#eee;color:black;border-radius:5px;padding:10px 15px;font-size:14px;font-weight:500;box-shadow:0px 1px 2px rgba(0, 0, 0, 0.20)}";

const PWAToast = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.duration = 2000;
        this.closing = null;
    }
    hostData() {
        const classes = {
            out: !!this.closing
        };
        if (this.closing !== null) {
            classes['in'] = !this.closing;
        }
        return {
            class: classes
        };
    }
    componentDidLoad() {
        setTimeout(() => {
            this.closing = false;
        });
        setTimeout(() => {
            this.close();
        }, this.duration);
    }
    close() {
        this.closing = true;
        setTimeout(() => {
            this.el.parentNode.removeChild(this.el);
        }, 1000);
    }
    __stencil_render() {
        return (h("div", { class: "wrapper" }, h("div", { class: "toast" }, this.message)));
    }
    get el() { return getElement(this); }
    render() { return h(Host, this.hostData(), this.__stencil_render()); }
};
PWAToast.style = toastCss;

export { PWAToast as pwa_toast };
