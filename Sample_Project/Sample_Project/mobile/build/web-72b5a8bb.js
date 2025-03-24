import { B as WebPlugin } from './conftoken-27a1d78d.js';
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

class TextToSpeechWeb extends WebPlugin {
    constructor() {
        super();
        this.speechSynthesis = null;
        if ('speechSynthesis' in window) {
            this.speechSynthesis = window.speechSynthesis;
            window.addEventListener('beforeunload', () => {
                this.stop();
            });
        }
    }
    async speak(options) {
        if (!this.speechSynthesis) {
            this.throwUnsupportedError();
        }
        await this.stop();
        const speechSynthesis = this.speechSynthesis;
        const utterance = this.createSpeechSynthesisUtterance(options);
        return new Promise((resolve, reject) => {
            utterance.onend = () => {
                resolve();
            };
            utterance.onerror = (event) => {
                reject(event);
            };
            speechSynthesis.speak(utterance);
        });
    }
    async stop() {
        if (!this.speechSynthesis) {
            this.throwUnsupportedError();
        }
        this.speechSynthesis.cancel();
    }
    async getSupportedLanguages() {
        const voices = this.getSpeechSynthesisVoices();
        const languages = voices.map(voice => voice.lang);
        const filteredLanguages = languages.filter((v, i, a) => a.indexOf(v) == i);
        return { languages: filteredLanguages };
    }
    async getSupportedVoices() {
        const voices = this.getSpeechSynthesisVoices();
        return { voices };
    }
    async isLanguageSupported(options) {
        const result = await this.getSupportedLanguages();
        const isLanguageSupported = result.languages.includes(options.lang);
        return { supported: isLanguageSupported };
    }
    async openInstall() {
        this.throwUnimplementedError();
    }
    createSpeechSynthesisUtterance(options) {
        const voices = this.getSpeechSynthesisVoices();
        const utterance = new SpeechSynthesisUtterance();
        const { text, lang, rate, pitch, volume, voice } = options;
        if (voice) {
            utterance.voice = voices[voice];
        }
        if (volume) {
            utterance.volume = volume >= 0 && volume <= 1 ? volume : 1;
        }
        if (rate) {
            utterance.rate = rate >= 0.1 && rate <= 10 ? rate : 1;
        }
        if (pitch) {
            utterance.pitch = pitch >= 0 && pitch <= 2 ? pitch : 2;
        }
        if (lang) {
            utterance.lang = lang;
        }
        utterance.text = text;
        return utterance;
    }
    getSpeechSynthesisVoices() {
        if (!this.speechSynthesis) {
            this.throwUnsupportedError();
        }
        if (!this.supportedVoices || this.supportedVoices.length < 1) {
            this.supportedVoices = this.speechSynthesis.getVoices();
        }
        return this.supportedVoices;
    }
    throwUnsupportedError() {
        throw this.unavailable('SpeechSynthesis API not available in this browser.');
    }
    throwUnimplementedError() {
        throw this.unimplemented('Not implemented on web.');
    }
}

export { TextToSpeechWeb };
