/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxModuleManagerElement web component.
    *
    * @class FlxModuleManagerElement
    * @constructor
    * @return {FlxModuleManagerElement}
    */
    class FlxModuleManagerElement extends HTMLElement {
        constructor();
        /**
        * Set when component is attached to DOM
        * @property connected {boolean}
        */
        connected: boolean;
        pagename: string;
        objectname: string;
        layoutname: string;
        layouts: any[];
        modules: any[];
        modTemplate: string;
        targetItem: JQuery;
        connectedCallback(): void;
        static readonly observedAttributes: string[];
        disconnectedCallback(): void;
        attributeChangedCallback(attrName: string, oldVal: any, newVal: any): void;
        init(): void;
        onModuleChanged(e: flexygo.events.FlexygoEvent): void;
        refresh(): void;
        addTabModule(): void;
        updateModule(module: flexygo.obj.Entity, form?: string): void;
        saveModuleConfig(): void;
        loadCurrentPage(): void;
        private loadLayoutPanel();
        private loadNodes();
        private setSorting(itms);
        private setActionButtons(items);
        private getModulePosition(module);
    }
}
