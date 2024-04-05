import { r as registerInstance, k as h } from './index-d0d1673d.js';
import { w as whiteboard } from './whiteboard-01f3e7c5.js';
import './jquery-eec92bf9.js';
import './_commonjsHelpers-148b4233.js';

const flxWhiteboardCss = "flx-whiteboard{width:100%}flx-whiteboard>div{width:100%;min-height:100px;margin-bottom:10px;background-repeat:no-repeat;background-size:contain;background-position:center;background-image:url('./assets/img/pencil.svg')}";

const FlxWhiteboard = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.value = undefined;
    this.text = undefined;
    this.name = undefined;
    this.placeHolder = undefined;
    this.disabled = undefined;
    this.required = undefined;
    this.dataMsgRequired = undefined;
    this.min = undefined;
    this.max = undefined;
    this.dataMsgMin = undefined;
    this.dataMsgMax = undefined;
    this.class = undefined;
    this.table = [];
  }
  componentWillLoad() {
    this.load();
  }
  load() {
  }
  open() {
    whiteboard.init().then((val) => {
      this.value = val;
    });
  }
  render() {
    return (h("div", { style: (this.value ? { "background-image": "url(" + this.value + ")" } : {}), onClick: () => { this.open(); } }));
  }
};
FlxWhiteboard.style = flxWhiteboardCss;

export { FlxWhiteboard as flx_whiteboard };
