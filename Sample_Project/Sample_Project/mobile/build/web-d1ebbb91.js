import { q as WebPlugin } from './webapi-79a1d3db.js';

class BarcodeScannerWeb extends WebPlugin {
    async prepare() {
        throw this.unimplemented('Not implemented on web.');
    }
    async hideBackground() {
        throw this.unimplemented('Not implemented on web.');
    }
    async showBackground() {
        throw this.unimplemented('Not implemented on web.');
    }
    async startScan(_options) {
        throw this.unimplemented('Not implemented on web.');
    }
    async startScanning(_options, _callback) {
        throw this.unimplemented('Not implemented on web.');
    }
    async pauseScanning() {
        throw this.unimplemented('Not implemented on web.');
    }
    async resumeScanning() {
        throw this.unimplemented('Not implemented on web.');
    }
    async stopScan(_options) {
        throw this.unimplemented('Not implemented on web.');
    }
    async checkPermission(_options) {
        throw this.unimplemented('Not implemented on web.');
    }
    async openAppSettings() {
        throw this.unimplemented('Not implemented on web.');
    }
    async disableTorch() {
        throw this.unimplemented('Not implemented on web.');
    }
    async enableTorch() {
        throw this.unimplemented('Not implemented on web.');
    }
    async toggleTorch() {
        throw this.unimplemented('Not implemented on web.');
    }
    async getTorchState() {
        throw this.unimplemented('Not implemented on web.');
    }
}

export { BarcodeScannerWeb };
