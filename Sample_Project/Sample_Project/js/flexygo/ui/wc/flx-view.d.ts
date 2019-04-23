/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxViewElement web component.
    *
    * @class FlxViewElement
    * @constructor
    * @return {FlxViewElement}
    */
    class FlxViewElement extends HTMLElement {
        constructor();
        /**
       * Set when component is attached to DOM
       * @property connected {boolean}
       */
        connected: boolean;
        moduleName: string;
        objectname: string;
        templateKey: string;
        templateId: string;
        templateList: {
            [name: string]: string;
        };
        viewId: string;
        properties: {
            [name: string]: flexygo.api.ObjectProperty;
        };
        data: {
            [name: string]: flexygo.api.BasicProperty;
        };
        tHeader: string;
        tBody: string;
        tFooter: string;
        tEmpty: string;
        tCSSText: string;
        tScriptText: string;
        isNew: boolean;
        /**
        * Fires when element is attached to DOM
        * @method connectedCallback
        */
        connectedCallback(): void;
        /**
        * Array of observed attributes.
        * @property observedAttributes {Array}
        */
        static readonly observedAttributes: string[];
        /**
       * Fires when the attribute value of the element is changed.
       * @method attributeChangedCallback
       */
        attributeChangedCallback(attrName: string, oldVal: any, newVal: any): void;
        refresh(): void;
        init(): void;
        render(): void;
        processLoadDependencies(): void;
        refreshProperty(itm: flexygo.api.edit.DependencyAction, prop: JQuery, lblprop: JQuery, loadDependency: boolean): void;
        /**
    * Removes property from the gridstack control
    * @method removeStack
    * @param {JQuery} prop
    */
        removeStack(prop: JQuery): void;
        /**
        * Appends property from the gridstack control
        * @method appendStack
        * @param {JQuery} prop
        */
        appendStack(prop: JQuery): void;
        setFormValues(): void;
        getValue(row: flexygo.api.BasicPropertyLoweredKey, tag: string): any;
        configure(): void;
        paintProperties(data: any, template: string): string;
        parseEditString(str: string): string;
        translate(str: string): string;
        getModuleFullId(): string;
    }
}
