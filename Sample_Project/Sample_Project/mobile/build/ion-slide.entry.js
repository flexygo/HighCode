import { r as registerInstance, k as h, o as Host } from './index-8e5b11cb.js';
import { g as getIonMode } from './ionic-global-6d118971.js';

const slideCss = "ion-slide{display:block;width:100%;height:100%}.slide-zoom{display:block;width:100%;text-align:center}.swiper-slide{display:flex;position:relative;flex-shrink:0;align-items:center;justify-content:center;width:100%;height:100%;font-size:18px;text-align:center;box-sizing:border-box}.swiper-slide img{width:auto;max-width:100%;height:auto;max-height:100%}";

const Slide = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    const mode = getIonMode(this);
    return (h(Host, { class: {
        [mode]: true,
        'swiper-slide': true,
        'swiper-zoom-container': true
      } }));
  }
};
Slide.style = slideCss;

export { Slide as ion_slide };
