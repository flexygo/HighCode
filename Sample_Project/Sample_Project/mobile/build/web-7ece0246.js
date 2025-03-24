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

class TorchWeb extends WebPlugin {
    async enable(options) {
        const { available } = await this.isAvailable();
        if (!available) {
            throw this.createUnavailableException();
        }
        const { enabled } = await this.isEnabled(options);
        if (enabled) {
            return;
        }
        const stream = (options === null || options === void 0 ? void 0 : options.stream) || this.stream;
        if (stream) {
            const [videoTrack] = stream.getVideoTracks();
            await videoTrack.applyConstraints({
                torch: true,
            });
        }
        else {
            this.stream = await navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    facingMode: 'environment',
                    torch: true,
                },
            });
        }
    }
    async disable(options) {
        var _a;
        const { available } = await this.isAvailable();
        if (!available) {
            throw this.createUnavailableException();
        }
        if (options === null || options === void 0 ? void 0 : options.stream) {
            const [videoTrack] = options.stream.getVideoTracks();
            await videoTrack.applyConstraints({
                torch: false,
            });
        }
        else {
            (_a = this.stream) === null || _a === void 0 ? void 0 : _a.getTracks().forEach(track => track.stop());
            this.stream = undefined;
        }
    }
    async isAvailable() {
        const supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
        const available = !!supportedConstraints.torch;
        return {
            available,
        };
    }
    async isEnabled(options) {
        const { available } = await this.isAvailable();
        if (!available) {
            throw this.createUnavailableException();
        }
        const stream = (options === null || options === void 0 ? void 0 : options.stream) || this.stream;
        if (stream === null || stream === void 0 ? void 0 : stream.active) {
            const [videoTrack] = stream.getVideoTracks();
            const enabled = !!videoTrack.getSettings().torch;
            return {
                enabled,
            };
        }
        else {
            return {
                enabled: false,
            };
        }
    }
    async toggle(options) {
        const { available } = await this.isAvailable();
        if (!available) {
            throw this.createUnavailableException();
        }
        const { enabled } = await this.isEnabled(options);
        if (enabled) {
            return this.disable(options);
        }
        else {
            return this.enable(options);
        }
    }
    createUnavailableException() {
        return new CapacitorException('This plugin method is not available on this platform.', ExceptionCode.Unavailable);
    }
}

export { TorchWeb };
