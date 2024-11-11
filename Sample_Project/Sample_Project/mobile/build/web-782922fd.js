import { y as WebPlugin } from './conftoken-89472368.js';
import './process-es6-cc264d03.js';
import './jquery-34624bb9.js';
import './_commonjsHelpers-2a12c1e6.js';
import './utils-224de961.js';
import './index-8e5b11cb.js';
import './animation-b4670628.js';
import './helpers-7ecb2fa5.js';
import './ios.transition-e14f38db.js';
import './index-c59a2c3f.js';
import './md.transition-8bd31aee.js';
import './cubic-bezier-ed243a9b.js';
import './index-d086042f.js';
import './ionic-global-6d118971.js';
import './index-cc97b114.js';
import './index-81d32235.js';
import './hardware-back-button-508e48cf.js';
import './overlays-cda44124.js';

class PreferencesWeb extends WebPlugin {
    constructor() {
        super(...arguments);
        this.group = 'CapacitorStorage';
    }
    async configure({ group }) {
        if (typeof group === 'string') {
            this.group = group;
        }
    }
    async get(options) {
        const value = this.impl.getItem(this.applyPrefix(options.key));
        return { value };
    }
    async set(options) {
        this.impl.setItem(this.applyPrefix(options.key), options.value);
    }
    async remove(options) {
        this.impl.removeItem(this.applyPrefix(options.key));
    }
    async keys() {
        const keys = this.rawKeys().map(k => k.substring(this.prefix.length));
        return { keys };
    }
    async clear() {
        for (const key of this.rawKeys()) {
            this.impl.removeItem(key);
        }
    }
    async migrate() {
        var _a;
        const migrated = [];
        const existing = [];
        const oldprefix = '_cap_';
        const keys = Object.keys(this.impl).filter(k => k.indexOf(oldprefix) === 0);
        for (const oldkey of keys) {
            const key = oldkey.substring(oldprefix.length);
            const value = (_a = this.impl.getItem(oldkey)) !== null && _a !== void 0 ? _a : '';
            const { value: currentValue } = await this.get({ key });
            if (typeof currentValue === 'string') {
                existing.push(key);
            }
            else {
                await this.set({ key, value });
                migrated.push(key);
            }
        }
        return { migrated, existing };
    }
    async removeOld() {
        const oldprefix = '_cap_';
        const keys = Object.keys(this.impl).filter(k => k.indexOf(oldprefix) === 0);
        for (const oldkey of keys) {
            this.impl.removeItem(oldkey);
        }
    }
    get impl() {
        return window.localStorage;
    }
    get prefix() {
        return this.group === 'NativeStorage' ? '' : `${this.group}.`;
    }
    rawKeys() {
        return Object.keys(this.impl).filter(k => k.indexOf(this.prefix) === 0);
    }
    applyPrefix(key) {
        return this.prefix + key;
    }
}

export { PreferencesWeb };
