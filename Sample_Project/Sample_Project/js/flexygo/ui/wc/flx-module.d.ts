/**
 * @namespace flexygo.ui.wc
 */
declare var NProgress: any;
declare namespace flexygo.ui.wc {
    /**
   * Library for the FlxModuleElement web component.
   *
   * @class FlxModuleElement
   * @constructor
   * @return {FlxModuleElement}
   */
    class FlxModuleElement extends HTMLElement {
        constructor();
        uuid: string;
        moduleConfig: flexygo.api.pages.PageModule;
        moduleName: string;
        objectname: string;
        objectwhere: string;
        moduleTitle: string;
        icon: string;
        headerClass: string;
        moduleClass: string;
        canCollapse: boolean;
        canEnlarge: boolean;
        canRefresh: boolean;
        canConfig: boolean;
        objectdefaults: any;
        isClone: boolean;
        ManualInit: boolean;
        componentString: string;
        moduleInitClass: string;
        JSAfterLoad: string;
        mode: string;
        reportname: string;
        reportwhere: string;
        processname: string;
        emptyTop: boolean;
        emptyTimer: number;
        /**
       * Fires when element is attached to DOM
       * @method connectedCallback
       */
        connectedCallback(): void;
        /**
        * Init the webcomponent.
        * @method init
        */
        init(): void;
        /**
        * Loads module header.
        * @method loadHeader
        */
        loadHeader(): void;
        /**
      * Refresh module.
      * @method refresh
      */
        refresh(): void;
        moduleLoaded(wc: any): void;
        toggle(): void;
        setButtons(buttons: flexygo.api.Toolbar, objectname: string, objectwhere: string, reportname?: string, processname?: string, reportwhere?: string): void;
        refreshButtons(buttons: flexygo.api.Toolbar, objectname: string, objectwhere: string, reportname?: string, processname?: string): void;
        private addGroup(position, btnGroup);
        refreshButton(htmlBtn: JQuery, btn: flexygo.api.ToolbarButton, objectname: string, objectwhere: string, objectdefaults: string, reportname?: string, reportwhere?: string, processname?: string): void;
        getButton(btn: flexygo.api.ToolbarButton, objectname: string, objectwhere: string, objectdefaults: string, reportname?: string, reportwhere?: string, processname?: string): JQuery;
        changeTemplate(): void;
        closeWindow(): void;
        toggleFullScreen(): void;
        setObjectDescrip(objDescrip: string): void;
        toImage(): void;
        openConfig(): void;
        toggleBag(objectname: string, objectwhere: string, itm: JQuery): void;
        activeBagButtons(mod: JQuery): void;
        bagSelectionNone(objectName: string, objectWhere: string, module: JQuery, button: JQuery, cllbck?: any): void;
        bagSelectionAll(objectName: string, objectWhere: string, module: JQuery, button: JQuery, cllbck?: any): void;
        bagShowOnlySelected(objectName: string, objectWhere: string, module: JQuery, button: JQuery, cllbck?: any): void;
        deleteModule(objectName: string, objectWhere: string, module: JQuery, button: JQuery, cllbck?: any): void;
        saveModule(objectName: string, objectWhere: string, module: JQuery, button: JQuery): boolean;
        saveReportParams(reportname: string, reportwhere: string, objectname: string, objectwhere: string, objectdefaults: string, module: JQuery, button: JQuery): void;
        execProcessParams(processname: string, objectname: string, objectwhere: string, defaults: any, module: JQuery, button: JQuery): void;
        execSelectEntity(objectname: string, objectwhere: string, module: JQuery, button: JQuery): void;
        startLoading(): void;
        stopLoading(): void;
    }
}
