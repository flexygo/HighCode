import { r as registerInstance, n as createEvent, k as h, m as getElement } from './index-8e5b11cb.js';

const actionSheetCss = ":host{z-index:1000;position:fixed;top:0;left:0;width:100%;height:100%;display:flex;contain:strict;user-select:none;font-family:-apple-system, BlinkMacSystemFont, \"Helvetica Neue\", \"Roboto\", sans-serif}.wrapper{flex:1;display:flex;align-items:center;justify-content:center;background-color:rgba(0, 0, 0, 0);transition:400ms background-color cubic-bezier(.36,.66,.04,1)}.wrapper.open{background-color:rgba(0, 0, 0, 0.32)}.title{color:#999;height:23px;line-height:23px;padding-bottom:17px;padding-inline-end:16px;padding-inline-start:16px;padding-left:16px;padding-right:16px;padding-top:20px}.content{width:568px;align-self:flex-end;background-color:#fff;transition:400ms transform cubic-bezier(.36,.66,.04,1);transform:translateY(100%)}.wrapper.open .content{transform:translateY(0%)}@media only screen and (max-width: 568px){.content{width:100%}}.action-sheet-option{cursor:pointer;height:52px;line-height:52px}.action-sheet-button{color:rgb(38, 38, 38);font-size:16px;padding-inline-end:16px;padding-inline-start:16px;padding-left:16px;padding-right:16px;padding-top:0px}.action-sheet-button:hover{background-color:#F6F6F6}";

const PWAActionSheet = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.onSelection = createEvent(this, "onSelection", 7);
    this.cancelable = true;
    this.options = [];
    this.open = false;
  }
  componentDidLoad() {
    requestAnimationFrame(() => {
      this.open = true;
    });
  }
  dismiss() {
    if (this.cancelable) {
      this.close();
    }
  }
  close() {
    this.open = false;
    setTimeout(() => {
      this.el.parentNode.removeChild(this.el);
    }, 500);
  }
  handleOptionClick(e, i) {
    e.stopPropagation();
    this.onSelection.emit(i);
    this.close();
  }
  render() {
    return (h("div", { class: `wrapper${this.open ? ' open' : ''}`, onClick: () => this.dismiss() }, h("div", { class: "content" }, h("div", { class: "title" }, this.header), this.options.map((option, i) => h("div", { class: "action-sheet-option", onClick: (e) => this.handleOptionClick(e, i) }, h("div", { class: "action-sheet-button" }, option.title))))));
  }
  get el() { return getElement(this); }
};
PWAActionSheet.style = actionSheetCss;

export { PWAActionSheet as pwa_action_sheet };
