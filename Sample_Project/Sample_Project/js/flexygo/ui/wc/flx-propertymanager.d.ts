/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxPropertyManagerElement web component.
    *
    * @class FlxPropertyManagerElement
    * @constructor
    * @return {FlxPropertyManagerElement}
    */
    class FlxPropertyManagerElement extends HTMLElement {
        constructor();
        /**
        * Set when component is attached to DOM
        * @property connected {boolean}
        */
        connected: boolean;
        objectname: string;
        reportName: string;
        processName: string;
        mode: string;
        data: any;
        tHeader: string;
        tBody: string;
        tFooter: string;
        properties: flexygo.api.ObjectPropertyCollection;
        propArr: flexygo.api.ObjectProperty[];
        connectedCallback(): void;
        static readonly observedAttributes: string[];
        attributeChangedCallback(attrName: string, oldVal: any, newVal: any): void;
        refresh(): void;
        onPropertyChanged(e: flexygo.events.FlexygoEvent): void;
        initEditMode(): void;
        initProcessMode(): void;
        initReportMode(): void;
        render(): void;
        toogleSortMode(btns: JQuery): void;
        _resizeGridProps(): void;
        private addConfigToolbar();
        addFields(fieldName: string, fieldType: string, fieldTable: string): void;
        addDetachedProperty(propertyName: string, propertyLabel: string): void;
        addProperties(checks: JQuery): void;
        refreshConfigMode(): void;
        getValue(row: flexygo.api.ObjectPropertyLoweredKey, tag: string): any;
        paintProperties(data: any, template: string): string;
        paintHeader(): string;
        paintFooter(): string;
        paintBody(): string;
        _getButton(btn: any): JQuery;
        insertSeparator(PropertyName: string, Above: number): void;
        insertPlaceHolder(PropertyName: string, Above: number): void;
        getExtendedTools(row: flexygo.api.ObjectProperty): JQuery;
        loadExtendedMenu(row: flexygo.api.ObjectProperty, btMenuId: string): void;
        getExtendedToolsMenu(row: flexygo.api.ObjectProperty, btMenuId?: string): JQuery;
        parseEditString(str: string): string;
        translate(str: string): string;
    }
}
