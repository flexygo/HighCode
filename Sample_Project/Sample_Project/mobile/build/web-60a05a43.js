import './index-86ac49ff.js';
import './ionic-global-0f98fe97.js';
import { q as WebPlugin } from './conftoken-38d23b50.js';
import './jquery-5df58adb.js';
import './utils-16079bfd.js';
import './helpers-719f4c54.js';
import './animation-10ea33c3.js';
import './index-7173f7a2.js';
import './ios.transition-95375ac9.js';
import './md.transition-6d74e584.js';
import './cubic-bezier-93f47170.js';
import './index-7fe827c3.js';
import './index-b40d441b.js';
import './hardware-back-button-aacf3d12.js';
import './index-50651ccc.js';
import './overlays-5302658e.js';

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
