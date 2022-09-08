import { r as registerInstance, m as createEvent, j as h } from './index-86ac49ff.js';

const cameraModalCss = ":host{z-index:1000;position:fixed;top:0;left:0;width:100%;height:100%;display:flex;contain:strict}.wrapper{flex:1;display:flex;align-items:center;justify-content:center;background-color:rgba(0, 0, 0, 0.15)}.content{box-shadow:0px 0px 5px rgba(0, 0, 0, 0.2);width:600px;height:600px}";

const PWACameraModal = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.onPhoto = createEvent(this, "onPhoto", 7);
    }
    async present() {
        const camera = document.createElement('pwa-camera-modal-instance');
        camera.addEventListener('onPhoto', async (e) => {
            if (!this._modal) {
                return;
            }
            const photo = e.detail;
            this.onPhoto.emit(photo);
        });
        document.body.append(camera);
        this._modal = camera;
    }
    async dismiss() {
        if (!this._modal) {
            return;
        }
        this._modal && this._modal.parentNode.removeChild(this._modal);
        this._modal = null;
    }
    render() {
        return (h("div", null));
    }
};
PWACameraModal.style = cameraModalCss;

export { PWACameraModal as pwa_camera_modal };
