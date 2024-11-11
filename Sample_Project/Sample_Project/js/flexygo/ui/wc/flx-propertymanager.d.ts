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
        propertyWizard: FlxPropertyWizardElement;
        data: any;
        tHeader: string;
        tBody: string;
        tFooter: string;
        properties: flexygo.api.ObjectPropertyCollection;
        propArr: flexygo.api.ObjectProperty[];
        connectedCallback(): void;
        observedAttributes(): string[];
        attributeChangedCallback(attrName: string, oldVal: any, newVal: any): void;
        refresh(): Promise<void>;
        onPropertyChanged(e: flexygo.events.FlexygoEvent): void;
        initEditMode(): Promise<void>;
        initProcessMode(): Promise<void>;
        initReportMode(): Promise<void>;
        setProperties(response: any, objectname: string, objectwhere: string): void;
        updateQuickSettingString(current_property: string, new_value: string, setting_name: string): void;
        render(): void;
        toogleSortMode(btns: JQuery): void;
        _resizeGridProps(): void;
        private addConfigToolbar;
        addFields(fieldName: string, fieldType: string, fieldTable: string): void;
        addDetachedProperty(propertyName: string, propertyLabel: string): void;
        addProperties(checks: JQuery): void;
        filterProperties(e: JQuery): void;
        refreshConfigMode(): void;
        getValue(row: flexygo.api.ObjectPropertyLoweredKey, tag: string): any;
        paintProperties(data: any, template: string): string;
        getWizardOnClickEvent(propertyName: string): string;
        paintHeader(): string;
        paintFooter(): string;
        paintBody(): string;
        _getButton(btn: any): JQuery;
        insertSeparator(PropertyName: string, Above: number): void;
        insertPlaceHolder(PropertyName: string, Above: number): void;
        getExtendedTools(row: flexygo.api.ObjectProperty): JQuery;
        getExtendedToolsMenu(row: flexygo.api.ObjectProperty, btMenuId?: string): JQuery;
        parseEditString(str: string): string;
        flxTranslate(str: string): string;
    }
}
