/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxObjectManagerElement web component.
    *
    * @class FlxObjectManagerElement
    * @constructor
    * @return {FlxObjectManagerElement}
    */
    class FlxObjectManagerElement extends HTMLElement {
        constructor();
        /**
        * Set when component is attached to DOM
        * @property connected {boolean}
        */
        connected: boolean;
        objectname: string;
        collectionname: string;
        offline: boolean;
        appName: string;
        wzButtons: JQuery;
        wzPanels: JQuery;
        connectedCallback(): void;
        static readonly observedAttributes: string[];
        attributeChangedCallback(attrName: string, oldVal: any, newVal: any): void;
        refresh(): void;
        onViewChanged(e: flexygo.events.FlexygoEvent): void;
        init(): void;
        basicInformationPane(): void;
        objectPropertiesPane(): void;
        listSettingsPane(): void;
        filterSettingsPane(): void;
        displaySettingsPane(): void;
        colPropertiesPane(): void;
        endPane(): void;
        addPane(index: string, name: string): JQuery;
        activeEditMode(): void;
        createEditForm(placeHolder: JQuery, ObjectName: string, ObjectWhere: string, Defaults: string): void;
        validateRequired(): boolean;
        createObject(): void;
    }
}
