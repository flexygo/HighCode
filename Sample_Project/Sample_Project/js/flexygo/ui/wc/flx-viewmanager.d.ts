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
        init(): void;
        refresh(): void;
        validateView(): void;
        saveView(): void;
        loadView(): void;
        setView(view: flexygo.api.ObjectView): void;
        loadObj(ObjectName: string, elm: JQuery, first: boolean): void;
        appendFields(): void;
        private getLabel(label);
        private createField(fld);
        private findPath(obj);
        /**
        *
        * @method openWizard
        */
        openWizard(e: any): void;
    }
}
