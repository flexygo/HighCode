import { B as WebPlugin, E as CapacitorException, H as ExceptionCode } from './conftoken-27a1d78d.js';
import './process-es6-cc264d03.js';
import './jquery-254bc370.js';
import './_commonjsHelpers-2a12c1e6.js';
import './utils-515e0805.js';
import './index-3f6ae35e.js';
import './animation-160b6d8d.js';
import './helpers-0fb1c204.js';
import './ios.transition-9f5405f1.js';
import './index-7e5eab7f.js';
import './md.transition-d5eeb7f8.js';
import './cubic-bezier-ed243a9b.js';
import './index-d086042f.js';
import './ionic-global-7b33f09f.js';
import './index-cc97b114.js';
import './index-f393b124.js';
import './hardware-back-button-508e48cf.js';
import './overlays-71eb67ef.js';

class BarcodeScannerWeb extends WebPlugin {
    async startScan(_options) {
        throw this.createUnavailableException();
    }
    async stopScan() {
        throw this.createUnavailableException();
    }
    async readBarcodesFromImage(_options) {
        throw this.createUnavailableException();
    }
    async scan() {
        throw this.createUnavailableException();
    }
    async isSupported() {
        throw this.createUnavailableException();
    }
    async enableTorch() {
        throw this.createUnavailableException();
    }
    async disableTorch() {
        throw this.createUnavailableException();
    }
    async toggleTorch() {
        throw this.createUnavailableException();
    }
    async isTorchEnabled() {
        throw this.createUnavailableException();
    }
    async isTorchAvailable() {
        throw this.createUnavailableException();
    }
    async setZoomRatio(_options) {
        throw this.createUnavailableException();
    }
    async getZoomRatio() {
        throw this.createUnavailableException();
    }
    async getMinZoomRatio() {
        throw this.createUnavailableException();
    }
    async getMaxZoomRatio() {
        throw this.createUnavailableException();
    }
    async openSettings() {
        throw this.createUnavailableException();
    }
    async isGoogleBarcodeScannerModuleAvailable() {
        throw this.createUnavailableException();
    }
    async installGoogleBarcodeScannerModule() {
        throw this.createUnavailableException();
    }
    async checkPermissions() {
        throw this.createUnavailableException();
    }
    async requestPermissions() {
        throw this.createUnavailableException();
    }
    createUnavailableException() {
        return new CapacitorException('This Barcode Scanner plugin method is not available on this platform.', ExceptionCode.Unavailable);
    }
}

export { BarcodeScannerWeb };
