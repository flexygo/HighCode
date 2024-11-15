/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxViewManagerElement web component.
    *
    * @class FlxViewManagerElement
    * @constructor
    * @return {FlxViewManagerElement}
    */
    class FlxViewManagerElement extends HTMLElement {
        constructor();
        /**
        * Set when component is attached to DOM
        * @property connected {boolean}
        */
        connected: boolean;
        objectname: string;
        viewname: string;
        newValue: number;
        mode: string;
        tree: JQuery;
        cmb: JQuery;
        fields: JQuery;
        targetItem: JQuery;
        config: flexygo.api.entity.ObjBasicConfig;
        connectedCallback(): void;
        static readonly observedAttributes: any[];
        attributeChangedCallback(attrName: any, oldVal: any, newVal: any): void;
        init(): Promise<void>;
        refresh(): Promise<void>;
        validateView(): void;
        saveView(): void;
        loadView(): Promise<void>;
        setView(view: flexygo.api.ObjectView): void;
        loadObj(ObjectName: string, elm: JQuery, first: boolean): void;
        appendFields(): void;
        private getLabel;
        private createField;
        private findPath;
        /**
        *
        * @method openWizard
        */
        openWizard(e: any): void;
    }
}
